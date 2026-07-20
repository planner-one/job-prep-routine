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
      `document.readyState === 'complete' && document.documentElement.dataset.roadmapReady === 'true'`,
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


test('로드맵은 다섯 일정 변형을 읽기 전용으로 렌더링하고 기존 저장값을 보존한다', { timeout: 45_000 }, async () => {
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

    const initialView = await evaluate(cdp, sessionId, `(() => ({
      selectedCategory: document.querySelector('[data-roadmap-category][aria-selected="true"]')?.dataset.roadmapCategory,
      visibleVariants: [...document.querySelectorAll('[data-roadmap-variant]')]
        .filter((node) => !node.hidden)
        .map((node) => node.dataset.roadmapVariant),
      runPickerHidden: document.getElementById('roadmap-run-time-picker').hidden,
    }))()`);
    assert.deepEqual(initialView, {
      selectedCategory: 'workout',
      visibleVariants: ['workout'],
      runPickerHidden: true,
    });

    const views = await evaluate(cdp, sessionId, `(async () => {
      const visible = () => [...document.querySelectorAll('[data-roadmap-variant]')]
        .filter((node) => !node.hidden)
        .map((node) => node.dataset.roadmapVariant);
      const click = (selector) => document.querySelector(selector).click();
      const result = {};
      click('[data-roadmap-category="normal"]');
      result.normal = visible();
      click('[data-roadmap-category="running"]');
      result.running21 = visible();
      result.runPickerVisible = !document.getElementById('roadmap-run-time-picker').hidden;
      click('[data-roadmap-run-start="22"]');
      result.running22 = visible();
      click('[data-roadmap-category="maintenance"]');
      result.maintenance = visible();
      result.runPickerHiddenAfterMaintenance = document.getElementById('roadmap-run-time-picker').hidden;
      return result;
    })()`);
    assert.deepEqual(views, {
      normal: ['normal'],
      running21: ['running-21'],
      runPickerVisible: true,
      running22: ['running-22'],
      maintenance: ['maintenance'],
      runPickerHiddenAfterMaintenance: true,
    });

    const legacyRaw = JSON.stringify({
      mode: 'running',
      runStart: '21',
      checkedIds: ['run'],
      learningTopics: ['Java'],
    });
    await evaluate(cdp, sessionId, `localStorage.setItem('job-prep-routine:roadmap:2026-07-12', ${JSON.stringify(legacyRaw)})`);
    await navigate(cdp, sessionId, staticSite.url);

    const result = await evaluate(cdp, sessionId, `(() => {
      const legacyKey = 'job-prep-routine:roadmap:2026-07-12';
      const variants = [...document.querySelectorAll('[data-roadmap-variant]')];
      return {
        variantIds: variants.map((node) => node.dataset.roadmapVariant),
        counts: variants.map((node) => node.querySelectorAll('[data-reference-item]').length),
        totalRows: document.querySelectorAll('[data-reference-item]').length,
        inputs: document.querySelectorAll('#roadmap-page input, #roadmap-page textarea, #roadmap-page select').length,
        printIntroCount: document.querySelectorAll('.roadmap-print-intro').length,
        printPrincipleCardCounts: [...document.querySelectorAll('[data-roadmap-variant]')]
          .map((node) => node.querySelectorAll('.roadmap-print-principles .focus-anchor').length),
        storedRaw: localStorage.getItem(legacyKey),
        roadmapKeys: Object.keys(localStorage).filter((key) => key.startsWith('job-prep-routine:roadmap:')).sort(),
      };
    })()`);
    assert.deepEqual(result.variantIds, ['workout', 'normal', 'running-21', 'running-22', 'maintenance']);
    assert.deepEqual(result.counts, [16, 15, 15, 15, 11]);
    assert.equal(result.totalRows, 72);
    assert.equal(result.inputs, 0);
    assert.equal(result.printIntroCount, 5);
    assert.deepEqual(result.printPrincipleCardCounts, [3, 3, 3, 3, 3]);
    assert.equal(result.storedRaw, legacyRaw);
    assert.deepEqual(result.roadmapKeys, ['job-prep-routine:roadmap:2026-07-12']);
  } finally {
    cdp?.close();
    await stopChrome(chrome);
    if (server) await new Promise((resolveClose) => server.close(resolveClose));
    if (profileDirectory) await rm(profileDirectory, { recursive: true, force: true });
  }
});
