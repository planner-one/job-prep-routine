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
import * as routineCore from '../src/routine-core.js';
import {
  createDefaultWeeklyState,
  weekMondayKey,
  weekdayIdForDate,
} from '../src/weekly-plan-core.js';
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

    const date = routineCore.logicalDateString();
    const weekKey = weekMondayKey(date);
    const dayId = weekdayIdForDate(date);
    const weekly = createDefaultWeeklyState();
    weekly.maintenanceDay = dayId === 'sun' ? 'sat' : 'sun';
    weekly.days[dayId] = {
      mode: 'normal',
      runStart: '21',
      revision: 3,
      items: [
        { id: 'same', label: '유지 일정', category: 'career', durationMinutes: 30, startMinute: 600, endMinute: 630 },
        { id: 'old', label: '삭제 예정 일정', category: 'career', durationMinutes: 30, startMinute: 630, endMinute: 660 },
        { id: 'learning:Spring|Redis', label: 'Spring · Redis', category: 'learning', durationMinutes: 120, startMinute: 660, endMinute: 780 },
      ],
      unscheduled: [],
      timelineOrder: ['breakfast', 'same', 'old', 'learning:Spring|Redis', 'lunch', 'dinner', 'sleep'],
      legacyCompletion: { applications: [], tasks: {}, learningTopics: [], maintenance: {} },
    };
    await cdp.send('Page.addScriptToEvaluateOnNewDocument', {
      source: `if (!localStorage.getItem(${JSON.stringify(`job-prep-routine:weekly:${weekKey}`)})) localStorage.setItem(${JSON.stringify(`job-prep-routine:weekly:${weekKey}`)}, ${JSON.stringify(JSON.stringify(weekly))});`,
    }, sessionId);
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

    const planSource = await evaluate(
      cdp,
      sessionId,
      `(() => {
        return {
          mode: document.querySelector('#daily-plan-mode').textContent,
          topics: document.querySelector('#daily-plan-topics').textContent,
          ids: [...document.querySelectorAll('[data-schedule-id]')].map((input) => input.dataset.scheduleId),
          sameTime: document.querySelector('[data-schedule-id="same"]').closest('.schedule-item').querySelector('.schedule-time').textContent,
          editableMode: Boolean(document.querySelector('[data-mode], input[name="run-start"], [data-learning-topic]')),
          updateHidden: document.querySelector('#daily-plan-update').hidden,
        };
      })()`,
    );
    assert.equal(planSource.mode, '비운동일');
    assert.equal(planSource.topics, 'Spring · Redis');
    assert.deepEqual(planSource.ids, ['breakfast', 'same', 'old', 'learning:Spring|Redis', 'lunch', 'dinner', 'sleep']);
    assert.equal(planSource.sameTime, '10:00–10:30');
    assert.equal(planSource.editableMode, false);
    assert.equal(planSource.updateHidden, true);

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
        setValue('.company-card[data-company-index="0"] [data-field="link"]', 'https://example.com/job');
        check('.company-card[data-company-index="0"] [data-field="analyzed"]');
        setValue('[data-memo="implemented"]', 'CDP 상호작용 테스트');
        check('[data-schedule-id="same"]');
        check('[data-schedule-id="old"]');

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
    assert.equal(stored.state.mode, 'normal');
    assert.equal(stored.state.runStart, '21');
    assert.equal(stored.state.companies[0].name, '테스트 회사');
    assert.equal(stored.state.companies[0].platform, '원티드');
    assert.equal(stored.state.companies[0].link, 'https://example.com/job');
    assert.equal(stored.state.companies[0].analyzed, true);
    assert.deepEqual(stored.state.learningTopics, ['Spring', 'Redis']);
    assert.equal(stored.state.memos.implemented, 'CDP 상호작용 테스트');
    assert.equal(stored.state.checkedIds.includes('same'), true);
    assert.equal(stored.state.checkedIds.includes('old'), true);
    assert.equal(stored.state.planSnapshot.revision, 3);
    assert.equal(Number(stored.progress) >= 3, true);
    assert.match(stored.pipeline, /1 \/ 12단계/);

    const filtered = await evaluate(
      cdp,
      sessionId,
      `(() => {
        const date = document.querySelector('#current-date').dateTime;
        const key = 'job-prep-routine:daily:' + date;
        const before = localStorage.getItem(key);
        const progressBefore = document.querySelector('#progress-count').textContent;
        document.querySelector('[data-category-filter="learning"]').click();
        const rows = [...document.querySelectorAll('#daily-schedule [data-schedule-row]')];
        return {
          before,
          after: localStorage.getItem(key),
          progressBefore,
          progressAfter: document.querySelector('#progress-count').textContent,
          pressed: document.querySelector('[data-category-filter="learning"]').getAttribute('aria-pressed'),
          visibleCategories: [...new Set(rows.filter((row) => !row.hidden).map((row) => row.dataset.category))],
          hiddenPeriods: [...document.querySelectorAll('#daily-schedule .schedule-period')].filter((period) => period.hidden).length,
        };
      })()`,
    );
    assert.equal(filtered.before, filtered.after);
    assert.equal(filtered.progressBefore, filtered.progressAfter);
    assert.equal(filtered.pressed, 'true');
    assert.deepEqual(filtered.visibleCategories, ['learning']);
    assert.equal(filtered.hiddenPeriods > 0, true);

    const updatedWeekly = structuredClone(weekly);
    updatedWeekly.days[dayId] = {
      ...updatedWeekly.days[dayId],
      revision: 3,
      items: [
        { id: 'learning:Spring|Redis', label: 'Spring · Redis', category: 'learning', durationMinutes: 120, startMinute: 600, endMinute: 720 },
        { id: 'same', label: '유지 일정', category: 'career', durationMinutes: 30, startMinute: 720, endMinute: 750 },
        { id: 'new', label: '새 일정', category: 'career', durationMinutes: 30, startMinute: 750, endMinute: 780 },
      ],
      timelineOrder: ['breakfast', 'learning:Spring|Redis', 'same', 'new', 'lunch', 'dinner', 'sleep'],
    };
    await evaluate(
      cdp,
      sessionId,
      `localStorage.setItem(${JSON.stringify(`job-prep-routine:weekly:${weekKey}`)}, ${JSON.stringify(JSON.stringify(updatedWeekly))})`,
    );
    await navigate(cdp, sessionId, staticSite.url);
    const frozen = await evaluate(
      cdp,
      sessionId,
      `(() => ({
        updateHidden: document.querySelector('#daily-plan-update').hidden,
        sameTime: document.querySelector('[data-schedule-id="same"]').closest('.schedule-item').querySelector('.schedule-time').textContent,
        sameChecked: document.querySelector('[data-schedule-id="same"]').checked,
        oldChecked: document.querySelector('[data-schedule-id="old"]').checked,
        hasNew: Boolean(document.querySelector('[data-schedule-id="new"]')),
        name: document.querySelector('#company-1-name').value,
        platform: document.querySelector('#company-1-platform').value,
        analyzed: document.querySelector('.company-card[data-company-index="0"] [data-field="analyzed"]').checked,
        link: document.querySelector('.company-card[data-company-index="0"] [data-field="link"]').value,
        memo: document.querySelector('[data-memo="implemented"]').value,
      }))()`,
    );
    assert.deepEqual(frozen, {
      updateHidden: false,
      sameTime: '10:00–10:30',
      sameChecked: true,
      oldChecked: true,
      hasNew: false,
      name: '테스트 회사',
      platform: '원티드',
      analyzed: true,
      link: 'https://example.com/job',
      memo: 'CDP 상호작용 테스트',
    });

    const merged = await evaluate(
      cdp,
      sessionId,
      `(() => {
        document.querySelector('#apply-daily-plan-update').click();
        const state = JSON.parse(localStorage.getItem('job-prep-routine:daily:' + document.querySelector('#current-date').dateTime));
        return {
          updateHidden: document.querySelector('#daily-plan-update').hidden,
          ids: [...document.querySelectorAll('[data-schedule-id]')].map((input) => input.dataset.scheduleId),
          sameTime: document.querySelector('[data-schedule-id="same"]').closest('.schedule-item').querySelector('.schedule-time').textContent,
          sameChecked: document.querySelector('[data-schedule-id="same"]').checked,
          checkedIds: state.checkedIds,
          revision: state.planSnapshot.revision,
          archivedIds: state.archivedCompletedItems.map((item) => item.id),
          name: state.companies[0].name,
          memo: state.memos.implemented,
          activeId: document.activeElement?.id ?? '',
        };
      })()`,
    );
    assert.equal(merged.updateHidden, true);
    assert.deepEqual(merged.ids, ['breakfast', 'learning:Spring|Redis', 'same', 'new', 'lunch', 'dinner', 'sleep']);
    assert.equal(merged.sameTime, '12:00–12:30');
    assert.equal(merged.sameChecked, true);
    assert.equal(merged.checkedIds.includes('same'), true);
    assert.equal(merged.checkedIds.includes('old'), true);
    assert.equal(merged.revision, 3);
    assert.deepEqual(merged.archivedIds, ['old']);
    assert.equal(merged.name, '테스트 회사');
    assert.equal(merged.memo, 'CDP 상호작용 테스트');
    assert.equal(merged.activeId, 'schedule-title');

    const reset = await evaluate(
      cdp,
      sessionId,
      `(() => {
        document.querySelector('#reset-today').click();
        return {
          stored: localStorage.getItem(${JSON.stringify('job-prep-routine:daily:')} + document.querySelector('#current-date').dateTime),
          mode: document.querySelector('#daily-plan-mode').textContent,
          hasNew: Boolean(document.querySelector('[data-schedule-id="new"]')),
          name: document.querySelector('#company-1-name').value,
          platform: document.querySelector('#company-1-platform').value,
          memo: document.querySelector('[data-memo="implemented"]').value,
          completed: document.querySelector('#progress-track').getAttribute('aria-valuenow'),
        };
      })()`,
    );
    assert.deepEqual(reset, {
      stored: null,
      mode: '비운동일',
      hasNew: true,
      name: '',
      platform: '사람인',
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

test('스냅샷 없는 기존 데일리의 호환 필드와 플랫폼·공고 링크를 첫 저장과 복원에서 보존한다', { timeout: 45_000 }, async () => {
  let server;
  let chrome;
  let cdp;
  let profileDirectory;

  try {
    const staticSite = await startStaticServer();
    server = staticSite.server;
    profileDirectory = await mkdtemp(resolve(tmpdir(), 'job-prep-routine-legacy-chrome-'));

    const browser = await startChrome(profileDirectory);
    chrome = browser.chrome;
    cdp = await createCdpClient(browser.endpoint);

    const { targetId } = await cdp.send('Target.createTarget', { url: 'about:blank' });
    const { sessionId } = await cdp.send('Target.attachToTarget', { targetId, flatten: true });
    await cdp.send('Page.enable', {}, sessionId);
    await cdp.send('Runtime.enable', {}, sessionId);

    const date = routineCore.logicalDateString();
    const weekKey = weekMondayKey(date);
    const dayId = weekdayIdForDate(date);
    const weekly = createDefaultWeeklyState();
    weekly.maintenanceDay = dayId === 'sun' ? 'sat' : 'sun';
    weekly.days[dayId] = {
      ...weekly.days[dayId],
      mode: 'normal',
      runStart: '21',
      revision: 5,
      items: [
        { id: 'weekly-learning', label: 'Spring', category: 'learning', durationMinutes: 30, startMinute: 600, endMinute: 630 },
      ],
      unscheduled: [],
      timelineOrder: ['breakfast', 'weekly-learning', 'lunch', 'dinner', 'sleep'],
    };
    const legacyDaily = {
      mode: 'running',
      runStart: '22',
      learningTopics: ['CS'],
      checkedIds: ['learning', 'running-breakfast', 'running-sleep'],
      companies: [{
        name: '기존 회사',
        platform: '잡코리아',
        analyzed: false,
        letter: false,
        applied: false,
        link: 'https://example.com/legacy-job',
      }],
      memos: { implemented: '', blocked: '', firstAction: '' },
    };
    const { identifier: seedScriptId } = await cdp.send('Page.addScriptToEvaluateOnNewDocument', {
      source: `localStorage.setItem(${JSON.stringify(`job-prep-routine:weekly:${weekKey}`)}, ${JSON.stringify(JSON.stringify(weekly))}); localStorage.setItem(${JSON.stringify(`job-prep-routine:daily:${date}`)}, ${JSON.stringify(JSON.stringify(legacyDaily))});`,
    }, sessionId);
    await navigate(cdp, sessionId, staticSite.url);
    await cdp.send('Page.removeScriptToEvaluateOnNewDocument', { identifier: seedScriptId }, sessionId);

    const loaded = await evaluate(
      cdp,
      sessionId,
      `(() => {
        const state = JSON.parse(localStorage.getItem(${JSON.stringify(`job-prep-routine:daily:${date}`)}));
        return {
          state,
          displayedMode: document.querySelector('#daily-plan-mode').textContent,
          displayedTopics: document.querySelector('#daily-plan-topics').textContent,
          renderedIds: [...document.querySelectorAll('[data-schedule-id]')].map((input) => input.dataset.scheduleId),
          checkedIds: [...document.querySelectorAll('[data-schedule-id]:checked')].map((input) => input.dataset.scheduleId),
        };
      })()`,
    );
    assert.equal(loaded.displayedMode, '러닝일');
    assert.equal(loaded.displayedTopics, 'CS');
    assert.equal(loaded.renderedIds.includes('run'), true);
    assert.deepEqual(loaded.checkedIds, ['breakfast', 'learning:CS', 'sleep']);
    assert.deepEqual(loaded.state.checkedIds, ['learning:CS', 'breakfast', 'sleep']);
    assert.equal(loaded.state.planSnapshot.items.some(({ id }) => id === 'run'), true);

    const stored = await evaluate(
      cdp,
      sessionId,
      `(() => {
        const memo = document.querySelector('[data-memo="implemented"]');
        memo.value = '첫 저장';
        memo.dispatchEvent(new Event('input', { bubbles: true }));
        const state = JSON.parse(localStorage.getItem(${JSON.stringify(`job-prep-routine:daily:${date}`)}));
        return {
          state,
          displayedMode: document.querySelector('#daily-plan-mode').textContent,
          displayedTopics: document.querySelector('#daily-plan-topics').textContent,
          renderedIds: [...document.querySelectorAll('[data-schedule-id]')].map((input) => input.dataset.scheduleId),
          snapshotIds: state.planSnapshot.items.map((item) => item.id),
          run: state.planSnapshot.items.find((item) => item.id === 'run') ?? null,
        };
      })()`,
    );

    assert.equal(stored.state.mode, 'running');
    assert.equal(stored.state.runStart, '22');
    assert.deepEqual(stored.state.learningTopics, ['CS']);
    assert.equal(stored.state.companies[0].platform, '잡코리아');
    assert.equal(stored.state.companies[0].link, 'https://example.com/legacy-job');
    assert.equal(stored.state.planSnapshot.revision, 5);
    assert.equal(stored.displayedMode, '러닝일');
    assert.equal(stored.displayedTopics, 'CS');
    assert.deepEqual(stored.renderedIds, stored.snapshotIds);
    assert.deepEqual(stored.run, {
      id: 'run',
      label: '이동 포함 저녁 러닝',
      category: 'exercise',
      startMinute: 1320,
      endMinute: 1380,
    });

    await navigate(cdp, sessionId, staticSite.url);
    const restored = await evaluate(
      cdp,
      sessionId,
      `(() => ({
        platform: document.querySelector('#company-1-platform').value,
        link: document.querySelector('.company-card[data-company-index="0"] [data-field="link"]').value,
      }))()`,
    );
    assert.deepEqual(restored, { platform: '잡코리아', link: 'https://example.com/legacy-job' });
  } finally {
    cdp?.close();
    await stopChrome(chrome);
    if (server) await new Promise((resolveClose) => server.close(resolveClose));
    if (profileDirectory) await rm(profileDirectory, { recursive: true, force: true });
  }
});
