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
    const relativePath = pathname === '/' ? 'roadmap.html' : pathname.replace(/^\/+/, '');
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
  return { server, url: `http://127.0.0.1:${address.port}/roadmap.html` };
}

function waitForDevTools(chrome, timeoutMs = 10_000) {
  return new Promise((resolveEndpoint, rejectEndpoint) => {
    let output = '';
    const timeout = setTimeout(
      () => finish(new Error('Chrome DevTools 연결 주소를 기다리다 시간 초과했습니다.')),
      timeoutMs,
    );
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
      `document.readyState === 'complete' && document.querySelectorAll('#roadmap-schedule [data-schedule-id]').length > 0`,
    );
    if (ready) return;
    await delay(40);
  }
  throw new Error('로드맵 페이지 초기화를 기다리다 시간 초과했습니다.');
}

async function navigate(cdp, sessionId, url) {
  const loaded = cdp.waitForEvent('Page.loadEventFired', sessionId);
  await cdp.send('Page.navigate', { url }, sessionId);
  await loaded;
  await waitForPageReady(cdp, sessionId);
}

test('로드맵의 필터·모드·러닝 시각·체크 상태를 실제 브라우저에서 운영한다', { timeout: 45_000 }, async () => {
  let server;
  let chrome;
  let cdp;
  let profileDirectory;

  try {
    const staticSite = await startStaticServer();
    server = staticSite.server;
    profileDirectory = await mkdtemp(resolve(tmpdir(), 'job-prep-roadmap-chrome-'));

    const browser = await startChrome(profileDirectory);
    chrome = browser.chrome;
    cdp = await createCdpClient(browser.endpoint);

    const { targetId } = await cdp.send('Target.createTarget', { url: 'about:blank' });
    const { sessionId } = await cdp.send('Target.attachToTarget', { targetId, flatten: true });
    await cdp.send('Page.enable', {}, sessionId);
    await cdp.send('Runtime.enable', {}, sessionId);
    await navigate(cdp, sessionId, staticSite.url);

    const initial = await evaluate(
      cdp,
      sessionId,
      `(() => {
        const now = new Date();
        const today = [now.getFullYear(), String(now.getMonth() + 1).padStart(2, '0'), String(now.getDate()).padStart(2, '0')].join('-');
        return {
          date: document.querySelector('#roadmap-current-date').dateTime,
          today,
          mode: document.querySelector('[data-roadmap-mode="workout"]').getAttribute('aria-pressed'),
          filter: document.querySelector('[data-category-filter="all"]').getAttribute('aria-pressed'),
          scheduleRows: document.querySelectorAll('#roadmap-schedule [data-schedule-id]').length,
          scheduleTimeInputs: document.querySelectorAll('#roadmap-schedule input:not([type="checkbox"])').length,
        };
      })()`,
    );
    assert.deepEqual(initial, {
      date: initial.today,
      today: initial.today,
      mode: 'true',
      filter: 'true',
      scheduleRows: 16,
      scheduleTimeInputs: 0,
    });

    const printCalls = await evaluate(
      cdp,
      sessionId,
      `(() => {
        window.__roadmapPdfCalls = 0;
        window.print = () => { window.__roadmapPdfCalls += 1; };
        document.querySelector('#roadmap-pdf-preview').click();
        return window.__roadmapPdfCalls;
      })()`,
    );
    assert.equal(printCalls, 1);

    const filtered = await evaluate(
      cdp,
      sessionId,
      `(() => {
        document.querySelector('[data-category-filter="career"]').click();
        const rows = [...document.querySelectorAll('[data-schedule-row]')];
        return {
          pressed: document.querySelector('[data-category-filter="career"]').getAttribute('aria-pressed'),
          visibleCategories: [...new Set(rows.filter((row) => !row.hidden).map((row) => row.dataset.category))],
          visible: rows.filter((row) => !row.hidden).length,
          hidden: rows.filter((row) => row.hidden).length,
        };
      })()`,
    );
    assert.equal(filtered.pressed, 'true');
    assert.deepEqual(filtered.visibleCategories, ['career']);
    assert.equal(filtered.visible > 0, true);
    assert.equal(filtered.hidden > 0, true);

    const modeSchedules = await evaluate(
      cdp,
      sessionId,
      `(() => {
        const result = {};
        for (const mode of ['workout', 'normal', 'running', 'maintenance']) {
          document.querySelector('[data-roadmap-mode="' + mode + '"]').click();
          const rows = [...document.querySelectorAll('[data-schedule-row]')];
          result[mode] = {
            signature: rows.map((row) => row.dataset.scheduleRow).join('|'),
            count: rows.length,
            visibleCategories: [...new Set(rows.filter((row) => !row.hidden).map((row) => row.dataset.category))],
          };
        }
        return result;
      })()`,
    );
    assert.deepEqual(
      Object.fromEntries(Object.entries(modeSchedules).map(([mode, value]) => [mode, value.count])),
      { workout: 16, normal: 15, running: 15, maintenance: 11 },
    );
    assert.equal(new Set(Object.values(modeSchedules).map((value) => value.signature)).size, 4);
    for (const value of Object.values(modeSchedules)) assert.deepEqual(value.visibleCategories, ['career']);

    const stored = await evaluate(
      cdp,
      sessionId,
      `(() => {
        document.querySelector('[data-roadmap-mode="running"]').click();
        const at21 = document.querySelector('[data-schedule-id="run"]').closest('.schedule-item').querySelector('.schedule-time').textContent;
        document.querySelector('input[name="roadmap-run-start"][value="22"]').click();
        document.querySelector('[data-category-filter="all"]').click();
        document.querySelector('[data-schedule-id="run"]').click();
        document.querySelector('[data-learning-topic][value="Spring"]').click();
        document.querySelector('[data-learning-topic][value="CS"]').click();

        const date = document.querySelector('#roadmap-current-date').dateTime;
        const key = 'job-prep-routine:roadmap:' + date;
        localStorage.setItem('job-prep-routine:roadmap:2000-01-01', JSON.stringify({ mode: 'normal' }));
        return {
          at21,
          at22: document.querySelector('[data-schedule-id="run"]').closest('.schedule-item').querySelector('.schedule-time').textContent,
          controlsHidden: document.querySelector('#roadmap-run-start-controls').hidden,
          state: JSON.parse(localStorage.getItem(key)),
        };
      })()`,
    );
    assert.equal(stored.at21, '21:00–22:00');
    assert.equal(stored.at22, '22:00–23:00');
    assert.equal(stored.controlsHidden, false);
    assert.equal(stored.state.mode, 'running');
    assert.equal(stored.state.runStart, '22');
    assert.equal(stored.state.checkedIds.includes('run'), true);
    assert.deepEqual(stored.state.learningTopics, ['Spring', 'CS']);

    await navigate(cdp, sessionId, staticSite.url);
    const restored = await evaluate(
      cdp,
      sessionId,
      `(() => ({
        mode: document.querySelector('[data-roadmap-mode="running"]').getAttribute('aria-pressed'),
        runStart: document.querySelector('input[name="roadmap-run-start"]:checked').value,
        runTime: document.querySelector('[data-schedule-id="run"]').closest('.schedule-item').querySelector('.schedule-time').textContent,
        runChecked: document.querySelector('[data-schedule-id="run"]').checked,
        spring: document.querySelector('[data-learning-topic][value="Spring"]').checked,
        cs: document.querySelector('[data-learning-topic][value="CS"]').checked,
        allFilter: document.querySelector('[data-category-filter="all"]').getAttribute('aria-pressed'),
      }))()`,
    );
    assert.deepEqual(restored, {
      mode: 'true',
      runStart: '22',
      runTime: '22:00–23:00',
      runChecked: true,
      spring: true,
      cs: true,
      allFilter: 'true',
    });

    const reset = await evaluate(
      cdp,
      sessionId,
      `(() => {
        document.querySelector('[data-category-filter="career"]').click();
        document.querySelector('#roadmap-reset-today').click();
        const date = document.querySelector('#roadmap-current-date').dateTime;
        return {
          stored: localStorage.getItem('job-prep-routine:roadmap:' + date),
          otherDate: JSON.parse(localStorage.getItem('job-prep-routine:roadmap:2000-01-01')).mode,
          mode: document.querySelector('[data-roadmap-mode="workout"]').getAttribute('aria-pressed'),
          runStart: document.querySelector('input[name="roadmap-run-start"]:checked').value,
          runControlsHidden: document.querySelector('#roadmap-run-start-controls').hidden,
          allFilter: document.querySelector('[data-category-filter="all"]').getAttribute('aria-pressed'),
          hiddenRows: [...document.querySelectorAll('[data-schedule-row]')].filter((row) => row.hidden).length,
          checkedRows: document.querySelectorAll('[data-schedule-id]:checked').length,
          learningTopics: document.querySelectorAll('[data-learning-topic]:checked').length,
        };
      })()`,
    );
    assert.deepEqual(reset, {
      stored: null,
      otherDate: 'normal',
      mode: 'true',
      runStart: '21',
      runControlsHidden: true,
      allFilter: 'true',
      hiddenRows: 0,
      checkedRows: 0,
      learningTopics: 0,
    });
  } finally {
    cdp?.close();
    await stopChrome(chrome);
    if (server) await new Promise((resolveClose) => server.close(resolveClose));
    if (profileDirectory) await rm(profileDirectory, { recursive: true, force: true });
  }
});
