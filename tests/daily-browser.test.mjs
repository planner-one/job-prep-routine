import test from 'node:test';
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { once } from 'node:events';
import { readFile, mkdtemp, rm } from 'node:fs/promises';
import { createServer } from 'node:http';
import { tmpdir } from 'node:os';
import { dirname, extname, resolve, sep } from 'node:path';
import { setTimeout as delay } from 'node:timers/promises';
import { fileURLToPath } from 'node:url';

const CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const PROJECT_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const CONTENT_TYPES = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
};

async function startStaticServer() {
  const server = createServer(async (request, response) => {
    const pathname = decodeURIComponent(new URL(request.url, 'http://127.0.0.1').pathname);
    const relativePath = pathname === '/' ? 'daily.html' : pathname.replace(/^\/+/, '');
    const filePath = resolve(PROJECT_ROOT, relativePath);

    if (filePath !== PROJECT_ROOT && !filePath.startsWith(`${PROJECT_ROOT}${sep}`)) {
      response.writeHead(403).end();
      return;
    }

    try {
      const body = await readFile(filePath);
      response.writeHead(200, { 'content-type': CONTENT_TYPES[extname(filePath)] ?? 'application/octet-stream' });
      response.end(body);
    } catch {
      response.writeHead(404).end();
    }
  });

  await new Promise((resolveListen, rejectListen) => {
    server.once('error', rejectListen);
    server.listen(0, '127.0.0.1', resolveListen);
  });
  const address = server.address();
  return {
    server,
    url: `http://127.0.0.1:${address.port}/daily.html`,
  };
}

function waitForDevTools(chrome, timeoutMs = 10_000) {
  return new Promise((resolveEndpoint, rejectEndpoint) => {
    let output = '';
    const timeout = setTimeout(() => finish(new Error('Chrome DevTools 연결 주소를 기다리다 시간 초과했습니다.')), timeoutMs);

    const onData = (chunk) => {
      output += chunk.toString();
      const match = output.match(/DevTools listening on (ws:\/\/[^\s]+)/);
      if (match) finish(null, match[1]);
    };
    const onExit = (code) => finish(new Error(`Chrome이 DevTools 연결 전에 종료됐습니다. 종료 코드: ${code}`));

    function finish(error, endpoint) {
      clearTimeout(timeout);
      chrome.stderr.off('data', onData);
      chrome.off('exit', onExit);
      if (error) rejectEndpoint(error);
      else resolveEndpoint(endpoint);
    }

    chrome.stderr.on('data', onData);
    chrome.once('exit', onExit);
  });
}

async function startChrome(profileDirectory) {
  const chrome = spawn(
    CHROME_PATH,
    [
      '--headless=new',
      '--no-sandbox',
      '--disable-gpu',
      '--disable-background-networking',
      '--disable-default-apps',
      '--disable-extensions',
      '--disable-sync',
      '--no-first-run',
      '--no-default-browser-check',
      '--remote-debugging-port=0',
      `--user-data-dir=${profileDirectory}`,
      'about:blank',
    ],
    { stdio: ['ignore', 'ignore', 'pipe'] },
  );
  const endpoint = await waitForDevTools(chrome);
  return { chrome, endpoint };
}

async function stopChrome(chrome) {
  if (!chrome || chrome.exitCode !== null) return;
  chrome.kill('SIGTERM');
  await Promise.race([once(chrome, 'exit'), delay(2_000)]);
  if (chrome.exitCode === null) chrome.kill('SIGKILL');
}

async function createCdpClient(endpoint) {
  const socket = new WebSocket(endpoint);
  await new Promise((resolveOpen, rejectOpen) => {
    socket.addEventListener('open', resolveOpen, { once: true });
    socket.addEventListener('error', rejectOpen, { once: true });
  });

  let nextId = 0;
  const pending = new Map();
  const waiters = new Set();

  socket.addEventListener('message', (event) => {
    const message = JSON.parse(event.data);
    if (message.id && pending.has(message.id)) {
      const { resolveCommand, rejectCommand } = pending.get(message.id);
      pending.delete(message.id);
      if (message.error) rejectCommand(new Error(`${message.error.message} (${message.error.code})`));
      else resolveCommand(message.result ?? {});
      return;
    }

    for (const waiter of waiters) {
      if (message.method === waiter.method && (!waiter.sessionId || waiter.sessionId === message.sessionId)) {
        waiters.delete(waiter);
        clearTimeout(waiter.timeout);
        waiter.resolveEvent(message.params ?? {});
      }
    }
  });

  function send(method, params = {}, sessionId) {
    const id = (nextId += 1);
    return new Promise((resolveCommand, rejectCommand) => {
      pending.set(id, { resolveCommand, rejectCommand });
      socket.send(JSON.stringify({ id, method, params, ...(sessionId ? { sessionId } : {}) }));
    });
  }

  function waitForEvent(method, sessionId, timeoutMs = 10_000) {
    return new Promise((resolveEvent, rejectEvent) => {
      const waiter = {
        method,
        sessionId,
        resolveEvent,
        timeout: setTimeout(() => {
          waiters.delete(waiter);
          rejectEvent(new Error(`${method} 이벤트를 기다리다 시간 초과했습니다.`));
        }, timeoutMs),
      };
      waiters.add(waiter);
    });
  }

  return {
    send,
    waitForEvent,
    close() {
      socket.close();
    },
  };
}

async function evaluate(cdp, sessionId, expression) {
  const response = await cdp.send(
    'Runtime.evaluate',
    { expression, awaitPromise: true, returnByValue: true },
    sessionId,
  );
  if (response.exceptionDetails) {
    const detail = response.exceptionDetails.exception?.description ?? response.exceptionDetails.text;
    throw new Error(`브라우저 평가 중 예외: ${detail}`);
  }
  return response.result?.value;
}

async function waitForPageReady(cdp, sessionId) {
  const deadline = Date.now() + 10_000;
  while (Date.now() < deadline) {
    const ready = await evaluate(
      cdp,
      sessionId,
      `document.readyState === 'complete' && document.querySelectorAll('[data-schedule-id]').length > 0`,
    );
    if (ready) return;
    await delay(40);
  }
  throw new Error('데일리 페이지 초기화를 기다리다 시간 초과했습니다.');
}

async function navigate(cdp, sessionId, url) {
  const loaded = cdp.waitForEvent('Page.loadEventFired', sessionId);
  await cdp.send('Page.navigate', { url }, sessionId);
  await loaded;
  await waitForPageReady(cdp, sessionId);
}

test('데일리 페이지의 핵심 상호작용을 저장·복원·초기화한다', { timeout: 45_000 }, async () => {
  let server;
  let chrome;
  let cdp;
  let profileDirectory;

  try {
    const staticSite = await startStaticServer();
    server = staticSite.server;
    profileDirectory = await mkdtemp(resolve(tmpdir(), 'job-prep-routine-chrome-'));

    const browser = await startChrome(profileDirectory);
    chrome = browser.chrome;
    cdp = await createCdpClient(browser.endpoint);

    const { targetId } = await cdp.send('Target.createTarget', { url: 'about:blank' });
    const { sessionId } = await cdp.send('Target.attachToTarget', { targetId, flatten: true });
    await cdp.send('Page.enable', {}, sessionId);
    await cdp.send('Runtime.enable', {}, sessionId);
    await navigate(cdp, sessionId, staticSite.url);

    const printCalls = await evaluate(
      cdp,
      sessionId,
      `(() => {
        window.__pdfPreviewCalls = 0;
        window.print = () => { window.__pdfPreviewCalls += 1; };
        document.querySelector('#pdf-preview').click();
        return window.__pdfPreviewCalls;
      })()`,
    );
    assert.equal(printCalls, 1);

    const runningAt21 = await evaluate(
      cdp,
      sessionId,
      `(() => {
        document.querySelector('[data-mode="running"]').click();
        const run = document.querySelector('[data-schedule-id="run"]');
        return {
          active: document.querySelector('[data-mode="running"]').getAttribute('aria-pressed'),
          runStart: document.querySelector('input[name="run-start"]:checked').value,
          time: run.closest('.schedule-item').querySelector('.schedule-time').textContent,
        };
      })()`,
    );
    assert.deepEqual(runningAt21, { active: 'true', runStart: '21', time: '21:00–22:00' });

    const runningAt22 = await evaluate(
      cdp,
      sessionId,
      `(() => {
        document.querySelector('input[name="run-start"][value="22"]').click();
        const run = document.querySelector('[data-schedule-id="run"]');
        return {
          runStart: document.querySelector('input[name="run-start"]:checked').value,
          time: run.closest('.schedule-item').querySelector('.schedule-time').textContent,
        };
      })()`,
    );
    assert.deepEqual(runningAt22, { runStart: '22', time: '22:00–23:00' });

    const stored = await evaluate(
      cdp,
      sessionId,
      `(() => {
        const setValue = (selector, value) => {
          const input = document.querySelector(selector);
          input.value = value;
          input.dispatchEvent(new Event('input', { bubbles: true }));
        };
        const check = (selector) => {
          const input = document.querySelector(selector);
          input.checked = true;
          input.dispatchEvent(new Event('change', { bubbles: true }));
        };

        setValue('#company-1-name', '테스트 회사');
        const platform = document.querySelector('#company-1-platform');
        platform.value = '원티드';
        platform.dispatchEvent(new Event('change', { bubbles: true }));
        check('.company-card[data-company-index="0"] [data-field="analyzed"]');
        setValue('.company-card[data-company-index="0"] [data-field="link"]', 'https://example.com/job');
        check('[data-learning-topic][value="CS"]');
        setValue('[data-memo="implemented"]', 'CDP 상호작용 테스트');
        check('[data-schedule-id="run"]');

        const date = document.querySelector('#current-date').dateTime;
        const key = 'job-prep-routine:daily:' + date;
        return {
          date,
          key,
          progress: document.querySelector('#progress-track').getAttribute('aria-valuenow'),
          pipeline: document.querySelector('#pipeline-progress').textContent,
          state: JSON.parse(localStorage.getItem(key)),
        };
      })()`,
    );
    assert.equal(stored.state.mode, 'running');
    assert.equal(stored.state.runStart, '22');
    assert.equal(stored.state.companies[0].name, '테스트 회사');
    assert.equal(stored.state.companies[0].platform, '원티드');
    assert.equal(stored.state.companies[0].analyzed, true);
    assert.equal(stored.state.companies[0].link, 'https://example.com/job');
    assert.equal(stored.state.learningTopics.includes('CS'), true);
    assert.equal(stored.state.memos.implemented, 'CDP 상호작용 테스트');
    assert.equal(stored.state.checkedIds.includes('run'), true);
    assert.equal(Number(stored.progress) >= 3, true);
    assert.match(stored.pipeline, /1 \/ 12단계/);

    await navigate(cdp, sessionId, staticSite.url);
    const restored = await evaluate(
      cdp,
      sessionId,
      `(() => ({
        mode: document.querySelector('[data-mode="running"]').getAttribute('aria-pressed'),
        runStart: document.querySelector('input[name="run-start"]:checked').value,
        runTime: document.querySelector('[data-schedule-id="run"]').closest('.schedule-item').querySelector('.schedule-time').textContent,
        runChecked: document.querySelector('[data-schedule-id="run"]').checked,
        name: document.querySelector('#company-1-name').value,
        platform: document.querySelector('#company-1-platform').value,
        analyzed: document.querySelector('.company-card[data-company-index="0"] [data-field="analyzed"]').checked,
        link: document.querySelector('.company-card[data-company-index="0"] [data-field="link"]').value,
        cs: document.querySelector('[data-learning-topic][value="CS"]').checked,
        memo: document.querySelector('[data-memo="implemented"]').value,
      }))()`,
    );
    assert.deepEqual(restored, {
      mode: 'true',
      runStart: '22',
      runTime: '22:00–23:00',
      runChecked: true,
      name: '테스트 회사',
      platform: '원티드',
      analyzed: true,
      link: 'https://example.com/job',
      cs: true,
      memo: 'CDP 상호작용 테스트',
    });

    const reset = await evaluate(
      cdp,
      sessionId,
      `(() => {
        document.querySelector('#reset-today').click();
        return {
          stored: localStorage.getItem(${JSON.stringify('job-prep-routine:daily:')} + document.querySelector('#current-date').dateTime),
          mode: document.querySelector('[data-mode="workout"]').getAttribute('aria-pressed'),
          runStart: document.querySelector('input[name="run-start"]:checked').value,
          name: document.querySelector('#company-1-name').value,
          platform: document.querySelector('#company-1-platform').value,
          cs: document.querySelector('[data-learning-topic][value="CS"]').checked,
          memo: document.querySelector('[data-memo="implemented"]').value,
          completed: document.querySelector('#progress-track').getAttribute('aria-valuenow'),
        };
      })()`,
    );
    assert.deepEqual(reset, {
      stored: null,
      mode: 'true',
      runStart: '21',
      name: '',
      platform: '사람인',
      cs: false,
      memo: '',
      completed: '0',
    });
  } finally {
    cdp?.close();
    await stopChrome(chrome);
    if (server) await new Promise((resolveClose) => server.close(resolveClose));
    if (profileDirectory) await rm(profileDirectory, { recursive: true, force: true });
  }
});
