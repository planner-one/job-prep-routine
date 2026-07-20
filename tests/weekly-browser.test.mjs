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
import { resolveChromeBin } from './helpers/chrome-bin.mjs';

const CHROME_PATH = resolveChromeBin();
const PROJECT_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const CONTENT_TYPES = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
};

async function startStaticServer() {
  const server = createServer(async (request, response) => {
    const pathname = decodeURIComponent(new URL(request.url, 'http://127.0.0.1').pathname);
    const relativePath = pathname === '/' ? 'weekly.html' : pathname.replace(/^\/+/, '');
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
  return { server, url: `http://127.0.0.1:${address.port}/weekly.html` };
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
  const deadline = Date.now() + 3_000;
  while (Date.now() < deadline) {
    const ready = await evaluate(
      cdp,
      sessionId,
      `document.documentElement.dataset.weeklyReady === 'true' && document.querySelectorAll('#weekly-plan-list [data-plan-item-id]').length > 0`,
    );
    if (ready) return;
    await delay(40);
  }
  throw new Error('주간 실행 보드 초기화를 기다리다 시간 초과했습니다.');
}

async function navigate(cdp, sessionId, url) {
  const loaded = cdp.waitForEvent('Page.loadEventFired', sessionId);
  await cdp.send('Page.navigate', { url }, sessionId);
  await loaded;
  await waitForPageReady(cdp, sessionId);
}

test('주간 플래너에서 추가·재배치·시간 편집·미배치를 저장하고 복원한다', { timeout: 45_000 }, async () => {
  let server;
  let chrome;
  let cdp;
  let profileDirectory;

  try {
    const staticSite = await startStaticServer();
    server = staticSite.server;
    profileDirectory = await mkdtemp(resolve(tmpdir(), 'job-prep-weekly-chrome-'));

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
        const rows = [...document.querySelectorAll('#weekly-plan-list [data-plan-item-id]')];
        return {
          schema: JSON.parse(localStorage.getItem('job-prep-routine:weekly:' + document.querySelector('#weekly-current-week').dateTime)).schemaVersion,
          rows: rows.length,
          time: rows[0].querySelector('.weekly-plan-time').textContent,
          fixedBadge: document.querySelector('#weekly-plan-list .is-fixed .weekly-plan-state').textContent,
          fixedMoveButton: Boolean(document.querySelector('#weekly-plan-list .is-fixed [data-move]')),
          oldChecklist: Boolean(document.querySelector('[data-weekly-application], [data-weekly-task], [data-maintenance-task]')),
        };
      })()`,
    );
    assert.equal(initial.schema, 2);
    assert.equal(initial.rows > 0, true);
    assert.match(initial.time, /^\d{2}:\d{2}(?:–\d{2}:\d{2})?$/);
    assert.equal(initial.fixedBadge, '고정');
    assert.equal(initial.fixedMoveButton, false);
    assert.equal(initial.oldChecklist, false);

    const printCalls = await evaluate(
      cdp,
      sessionId,
      `(() => {
        window.__weeklyPdfCalls = 0;
        window.print = () => { window.__weeklyPdfCalls += 1; };
        document.querySelector('#weekly-pdf-preview').click();
        return window.__weeklyPdfCalls;
      })()`,
    );
    assert.equal(printCalls, 1);

    const added = await evaluate(
      cdp,
      sessionId,
      `(() => {
        document.querySelector('#weekly-add-plan').click();
        document.querySelector('[data-add-library="job-analysis"]').click();
        for (const topic of ['Spring', 'Redis']) {
          document.querySelector('[data-add-learning-topic="' + topic + '"]').click();
        }
        document.querySelector('[data-add-learning]').click();
        document.querySelector('#weekly-custom-label').value = '포트폴리오 문장 다듬기';
        document.querySelector('#weekly-custom-category').value = 'career';
        document.querySelector('#weekly-custom-duration').value = '40';
        document.querySelector('#weekly-custom-form').requestSubmit();
        document.querySelector('[data-add-learning-topic="Java"]').click();
        document.querySelector('[data-add-learning]').click();
        return {
          library: Boolean(document.querySelector('[data-plan-item-id="job-analysis"]')),
          learning: [...document.querySelectorAll('.weekly-plan-label')].some((node) => node.textContent === 'Spring · Redis'),
          learningBlocks: [...document.querySelectorAll('[data-plan-item-id]')].filter((row) => row.dataset.planItemId.startsWith('learning:')).length,
          customId: [...document.querySelectorAll('[data-plan-item-id]')].find((row) => row.querySelector('.weekly-plan-label')?.textContent === '포트폴리오 문장 다듬기')?.dataset.planItemId,
          panelExpanded: document.querySelector('#weekly-add-plan').getAttribute('aria-expanded'),
          duplicateStatus: document.querySelector('#weekly-plan-status').textContent,
        };
      })()`,
    );
    assert.equal(added.library, true);
    assert.equal(added.learning, true);
    assert.equal(added.learningBlocks, 1);
    assert.match(added.customId, /^custom-/);
    assert.equal(added.panelExpanded, 'true');
    assert.match(added.duplicateStatus, /이미 추가된 일정/);

    const moved = await evaluate(
      cdp,
      sessionId,
      `(() => {
        const indexOf = (id) => [...document.querySelectorAll('#weekly-plan-list [data-plan-item-id]')].findIndex((row) => row.dataset.planItemId === id);
        const beforeDown = indexOf('job-analysis');
        document.querySelector('[data-plan-item-id="job-analysis"] [data-move="down"]').click();
        const afterDown = indexOf('job-analysis');
        const handle = document.querySelector('[data-plan-item-id="job-analysis"] [data-plan-drag]');
        const target = document.querySelector('#weekly-plan-list [data-plan-item-id="lunch"]');
        handle.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, pointerId: 7 }));
        target.dispatchEvent(new PointerEvent('pointerup', { bubbles: true, pointerId: 7 }));
        return {
          beforeDown,
          afterDown,
          afterDrag: indexOf('job-analysis'),
          status: document.querySelector('#weekly-plan-status').textContent,
        };
      })()`,
    );
    assert.equal(moved.afterDown > moved.beforeDown, true);
    assert.notEqual(moved.afterDrag, moved.afterDown);
    assert.match(moved.status, /이동|미배치|시간/);

    const edited = await evaluate(
      cdp,
      sessionId,
      `(() => {
        document.querySelector('#weekly-time-edit').click();
        const first = document.querySelector('#weekly-plan-list .weekly-plan-row:not(.is-fixed)');
        const original = first.querySelector('.weekly-plan-time').textContent;
        const end = first.querySelector('[data-time-end]');
        end.value = '05:45';
        first.querySelector('[data-time-cancel]').click();
        const afterCancel = document.querySelector('[data-plan-item-id="' + first.dataset.planItemId + '"] .weekly-plan-time').textContent;

        const restoredRow = document.querySelector('[data-plan-item-id="' + first.dataset.planItemId + '"]');
        restoredRow.querySelector('[data-time-end]').value = '05:50';
        restoredRow.querySelector('[data-time-save]').click();
        return {
          id: first.dataset.planItemId,
          original,
          afterCancel,
          afterSave: document.querySelector('[data-plan-item-id="' + first.dataset.planItemId + '"] .weekly-plan-time').textContent,
          pressed: document.querySelector('#weekly-time-edit').getAttribute('aria-pressed'),
        };
      })()`,
    );
    assert.equal(edited.afterCancel, edited.original);
    assert.equal(edited.afterSave, '05:40–05:50');
    assert.equal(edited.pressed, 'false');

    const overflow = await evaluate(
      cdp,
      sessionId,
      `(() => {
        document.querySelector('#weekly-custom-label').value = '장시간 집중 작업';
        document.querySelector('#weekly-custom-category').value = 'learning';
        document.querySelector('#weekly-custom-duration').value = '480';
        document.querySelector('#weekly-custom-form').requestSubmit();
        return {
          hidden: document.querySelector('#weekly-unscheduled').hidden,
          count: document.querySelector('#weekly-unscheduled-count').textContent,
          labels: [...document.querySelectorAll('#weekly-unscheduled-list .weekly-plan-label')].map((node) => node.textContent),
          warning: document.querySelector('#weekly-unscheduled p').textContent,
        };
      })()`,
    );
    assert.equal(overflow.hidden, false);
    assert.equal(Number(overflow.count) > 0, true);
    assert.equal(overflow.labels.includes('장시간 집중 작업'), true);
    assert.equal(overflow.warning, '시간이 부족해 배치되지 않은 일정이 있습니다.');

    await navigate(cdp, sessionId, staticSite.url);
    const restored = await evaluate(
      cdp,
      sessionId,
      `(() => {
        const state = JSON.parse(localStorage.getItem('job-prep-routine:weekly:' + document.querySelector('#weekly-current-week').dateTime));
        return {
          schemaVersion: state.schemaVersion,
          library: Boolean(document.querySelector('[data-plan-item-id="job-analysis"]')),
          learning: [...document.querySelectorAll('.weekly-plan-label')].some((node) => node.textContent === 'Spring · Redis'),
          custom: [...document.querySelectorAll('.weekly-plan-label')].some((node) => node.textContent === '포트폴리오 문장 다듬기'),
          editedTime: document.querySelector('[data-plan-item-id="' + ${JSON.stringify('workout-wake')} + '"] .weekly-plan-time')?.textContent,
          overflow: [...document.querySelectorAll('#weekly-unscheduled-list .weekly-plan-label')].some((node) => node.textContent === '장시간 집중 작업'),
        };
      })()`,
    );
    assert.deepEqual(restored, {
      schemaVersion: 2,
      library: true,
      learning: true,
      custom: true,
      editedTime: '05:40–05:50',
      overflow: true,
    });
  } finally {
    cdp?.close();
    await stopChrome(chrome);
    if (server) await new Promise((resolveClose) => server.close(resolveClose));
    if (profileDirectory) await rm(profileDirectory, { recursive: true, force: true });
  }
});
