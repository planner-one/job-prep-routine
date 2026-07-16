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
      `document.documentElement.dataset.weeklyReady === 'true' && document.querySelectorAll('#weekly-day-schedule [data-weekly-schedule-id]').length > 0`,
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

test('주간 보드의 요일·유지일·모드·진척을 실제 브라우저에서 저장하고 복원한다', { timeout: 45_000 }, async () => {
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
        const now = new Date();
        const monday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        monday.setDate(monday.getDate() - ((monday.getDay() + 6) % 7));
        const key = [monday.getFullYear(), String(monday.getMonth() + 1).padStart(2, '0'), String(monday.getDate()).padStart(2, '0')].join('-');
        return {
          week: document.querySelector('#weekly-current-week').dateTime,
          expectedWeek: key,
          tabs: document.querySelectorAll('#weekday-tabs [data-day]').length,
          selected: document.querySelector('#weekday-tabs [aria-selected="true"]').dataset.day,
          maintenance: document.querySelector('#weekday-tabs [data-day-role="maintenance"]').dataset.day,
          executionVisible: !document.querySelector('#execution-day-controls').hidden,
          scheduleRows: document.querySelectorAll('#weekly-day-schedule [data-weekly-schedule-id]').length,
          detailDisplay: getComputedStyle(document.querySelector('.weekly-detail-grid')).display,
          sameCard:
            document.querySelector('#day-detail').contains(document.querySelector('#weekly-day-checklist')) &&
            document.querySelector('#day-detail').contains(document.querySelector('#weekly-day-schedule')),
        };
      })()`,
    );
    assert.deepEqual(initial, {
      week: initial.expectedWeek,
      expectedWeek: initial.expectedWeek,
      tabs: 7,
      selected: 'mon',
      maintenance: 'sun',
      executionVisible: true,
      scheduleRows: 16,
      detailDisplay: 'grid',
      sameCard: true,
    });

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

    const movedMaintenance = await evaluate(
      cdp,
      sessionId,
      `(() => {
        document.querySelector('[data-day="tue"]').click();
        document.querySelector('#set-maintenance-day').click();
        const maintenanceTabs = [...document.querySelectorAll('#weekday-tabs [data-day-role="maintenance"]')];
        document.querySelector('[data-day="sun"]').click();
        return {
          count: maintenanceTabs.length,
          maintenance: maintenanceTabs[0].dataset.day,
          sundayRole: document.querySelector('[data-day="sun"]').dataset.dayRole,
          sundayMode: document.querySelector('[data-weekly-mode][aria-pressed="true"]').dataset.weeklyMode,
          sundayScheduleStart: document.querySelector('#weekly-day-schedule .weekly-schedule-time').textContent,
          maintenanceHidden: document.querySelector('#maintenance-checklist').hidden,
        };
      })()`,
    );
    assert.deepEqual(movedMaintenance, {
      count: 1,
      maintenance: 'tue',
      sundayRole: 'execution',
      sundayMode: 'normal',
      sundayScheduleStart: '07:00',
      maintenanceHidden: true,
    });

    const activityReset = await evaluate(
      cdp,
      sessionId,
      `(() => {
        const activity = document.querySelector('[data-weekly-task="activity"]');
        activity.click();
        document.querySelector('[data-weekly-mode="normal"]').click();
        const preservedOnSameMode = activity.checked;
        document.querySelector('[data-weekly-mode="running"]').click();
        return {
          preservedOnSameMode,
          activityChecked: document.querySelector('[data-weekly-task="activity"]').checked,
          runs: document.querySelector('#weekly-runs-value').textContent,
          applicationsMax: document.querySelector('[aria-label="주간 지원 진척"]').getAttribute('aria-valuemax'),
        };
      })()`,
    );
    assert.deepEqual(activityReset, {
      preservedOnSameMode: true,
      activityChecked: false,
      runs: '0 / 1–2회',
      applicationsMax: '25',
    });

    const runningSchedule = await evaluate(
      cdp,
      sessionId,
      `(() => {
        document.querySelector('[data-day="wed"]').click();
        document.querySelector('[data-weekly-mode="running"]').click();
        const at21 = document.querySelector('[data-weekly-schedule-id="run"] .weekly-schedule-time').textContent;
        document.querySelector('input[name="weekly-run-start"][value="22"]').click();
        return {
          at21,
          at22: document.querySelector('[data-weekly-schedule-id="run"] .weekly-schedule-time').textContent,
          runControlsHidden: document.querySelector('#weekly-run-start-controls').hidden,
          mode: document.querySelector('[data-weekly-mode="running"]').getAttribute('aria-pressed'),
        };
      })()`,
    );
    assert.deepEqual(runningSchedule, {
      at21: '21:00–22:00',
      at22: '22:00–23:00',
      runControlsHidden: false,
      mode: 'true',
    });

    const stored = await evaluate(
      cdp,
      sessionId,
      `(() => {
        const click = (selector) => document.querySelector(selector).click();
        click('[data-day="mon"]');
        click('[data-weekly-mode="workout"]');
        for (const index of [0, 1, 2]) click('[data-weekly-application="' + index + '"]');
        for (const task of ['activity', 'review', 'interview', 'mealRest']) click('[data-weekly-task="' + task + '"]');
        for (const topic of ['Spring', 'Java', '프로젝트 적용']) click('[data-weekly-learning][value="' + topic + '"]');

        click('[data-day="wed"]');
        for (const index of [0, 1, 2, 3]) click('[data-weekly-application="' + index + '"]');
        for (const task of ['activity', 'review', 'interview']) click('[data-weekly-task="' + task + '"]');
        for (const topic of ['Spring', 'Redis', '프로젝트 적용']) click('[data-weekly-learning][value="' + topic + '"]');

        click('[data-day="tue"]');
        click('[data-maintenance-task="application"]');
        click('[data-maintenance-task="interview"]');

        const week = document.querySelector('#weekly-current-week').dateTime;
        const key = 'job-prep-routine:weekly:' + week;
        localStorage.setItem('job-prep-routine:weekly:2000-01-03', JSON.stringify({ maintenanceDay: 'mon' }));
        return {
          key,
          values: {
            applications: document.querySelector('#weekly-applications-value').textContent,
            reviews: document.querySelector('#weekly-reviews-value').textContent,
            interviews: document.querySelector('#weekly-interviews-value').textContent,
            workouts: document.querySelector('#weekly-workouts-value').textContent,
            runs: document.querySelector('#weekly-runs-value').textContent,
            spring: document.querySelector('[data-progress-topic="Spring"] .weekly-metric-value').textContent,
          },
          state: JSON.parse(localStorage.getItem(key)),
        };
      })()`,
    );
    assert.deepEqual(stored.values, {
      applications: '8 / 18–24',
      reviews: '2 / 실행일 6회',
      interviews: '3회',
      workouts: '1 / 3–5회',
      runs: '1 / 1–2회',
      spring: '2 / 4–6회',
    });
    assert.equal(stored.state.maintenanceDay, 'tue');
    assert.equal(stored.state.selectedDay, 'tue');
    assert.equal(stored.state.days.mon.applications.filter(Boolean).length, 3);
    assert.equal(stored.state.days.mon.tasks.activity, true);
    assert.equal(stored.state.days.wed.mode, 'running');
    assert.equal(stored.state.days.wed.runStart, '22');
    assert.deepEqual(stored.state.days.wed.learningTopics, ['Spring', 'Redis', '프로젝트 적용']);
    assert.equal(stored.state.days.tue.maintenance.application, true);

    await navigate(cdp, sessionId, staticSite.url);
    const restored = await evaluate(
      cdp,
      sessionId,
      `(() => {
        const selectedBeforeSwitch = document.querySelector('#weekday-tabs [aria-selected="true"]').dataset.day;
        const maintenanceApplication = document.querySelector('[data-maintenance-task="application"]').checked;
        document.querySelector('[data-day="wed"]').click();
        return {
          selectedBeforeSwitch,
          maintenanceApplication,
          maintenance: document.querySelector('[data-day-role="maintenance"]').dataset.day,
          runMode: document.querySelector('[data-weekly-mode="running"]').getAttribute('aria-pressed'),
          runStart: document.querySelector('input[name="weekly-run-start"]:checked').value,
          runTime: document.querySelector('[data-weekly-schedule-id="run"] .weekly-schedule-time').textContent,
          spring: document.querySelector('[data-weekly-learning][value="Spring"]').checked,
          redis: document.querySelector('[data-weekly-learning][value="Redis"]').checked,
        };
      })()`,
    );
    assert.deepEqual(restored, {
      selectedBeforeSwitch: 'tue',
      maintenanceApplication: true,
      maintenance: 'tue',
      runMode: 'true',
      runStart: '22',
      runTime: '22:00–23:00',
      spring: true,
      redis: true,
    });

    const reset = await evaluate(
      cdp,
      sessionId,
      `(() => {
        document.querySelector('#weekly-reset-current').click();
        const week = document.querySelector('#weekly-current-week').dateTime;
        return {
          stored: localStorage.getItem('job-prep-routine:weekly:' + week),
          otherWeek: JSON.parse(localStorage.getItem('job-prep-routine:weekly:2000-01-03')).maintenanceDay,
          selected: document.querySelector('#weekday-tabs [aria-selected="true"]').dataset.day,
          maintenance: document.querySelector('#weekday-tabs [data-day-role="maintenance"]').dataset.day,
          applications: document.querySelector('#weekly-applications-value').textContent,
          checked: document.querySelectorAll('#day-detail input[type="checkbox"]:checked').length,
        };
      })()`,
    );
    assert.deepEqual(reset, {
      stored: null,
      otherWeek: 'mon',
      selected: 'mon',
      maintenance: 'sun',
      applications: '0 / 18–24',
      checked: 0,
    });
  } finally {
    cdp?.close();
    await stopChrome(chrome);
    if (server) await new Promise((resolveClose) => server.close(resolveClose));
    if (profileDirectory) await rm(profileDirectory, { recursive: true, force: true });
  }
});
