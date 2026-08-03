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
const COMMIT = 'd00877afb0a302072078d34ded66b3b69143a5ca';
const CONTENT_TYPES = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
};

async function startStaticServer() {
  const server = createServer(async (request, response) => {
    const pathname = decodeURIComponent(new URL(request.url, 'http://127.0.0.1').pathname);
    const relativePath = pathname === '/' ? 'study-history.html' : pathname.replace(/^\/+/, '');
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
  return { server, url: `http://127.0.0.1:${address.port}/study-history.html` };
}

function waitForDevTools(chrome) {
  return new Promise((resolveEndpoint, rejectEndpoint) => {
    let output = '';
    const timeout = setTimeout(() => finish(new Error('Chrome DevTools 연결 주소를 기다리다 시간 초과했습니다.')), 10_000);
    const onData = (chunk) => {
      output += chunk.toString();
      const match = output.match(/DevTools listening on (ws:\/\/[^\s]+)/);
      if (match) finish(null, match[1]);
    };
    const onExit = () => finish(new Error('Chrome이 DevTools 연결 전에 종료됐습니다.'));
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
      if (message.error) rejectCommand(new Error(message.error.message));
      else resolveCommand(message.result ?? {});
      return;
    }
    for (const waiter of waiters) {
      if (message.method === waiter.method && message.sessionId === waiter.sessionId) {
        waiters.delete(waiter);
        clearTimeout(waiter.timeout);
        waiter.resolveEvent(message.params ?? {});
      }
    }
  });
  return {
    send(method, params = {}, sessionId) {
      const id = (nextId += 1);
      return new Promise((resolveCommand, rejectCommand) => {
        pending.set(id, { resolveCommand, rejectCommand });
        socket.send(JSON.stringify({ id, method, params, ...(sessionId ? { sessionId } : {}) }));
      });
    },
    waitForEvent(method, sessionId) {
      return new Promise((resolveEvent, rejectEvent) => {
        const waiter = {
          method,
          sessionId,
          resolveEvent,
          timeout: setTimeout(() => {
            waiters.delete(waiter);
            rejectEvent(new Error(`${method} 이벤트를 기다리다 시간 초과했습니다.`));
          }, 10_000),
        };
        waiters.add(waiter);
      });
    },
    close() {
      socket.close();
    },
  };
}

async function evaluate(cdp, sessionId, expression) {
  const response = await cdp.send('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true }, sessionId);
  if (response.exceptionDetails) throw new Error(response.exceptionDetails.text);
  return response.result?.value;
}

async function waitForReady(cdp, sessionId) {
  const deadline = Date.now() + 10_000;
  while (Date.now() < deadline) {
    if (await evaluate(cdp, sessionId, "document.documentElement.dataset.studyHistoryReady === 'true'")) return;
    await delay(40);
  }
  throw new Error('학습 기록 페이지 초기화를 기다리다 시간 초과했습니다.');
}

test('학습 기록 페이지는 완료 활동만 잔디에 표시하고 날짜 선택에 따라 상세를 갱신한다', { timeout: 30_000 }, async () => {
  let server;
  let chrome;
  let cdp;
  let profileDirectory;
  try {
    const site = await startStaticServer();
    server = site.server;
    profileDirectory = await mkdtemp(resolve(tmpdir(), 'job-prep-study-history-chrome-'));
    chrome = spawn(CHROME_PATH, [
      '--headless=new', '--no-sandbox', '--disable-gpu', '--disable-background-networking',
      '--disable-default-apps', '--disable-extensions', '--disable-sync', '--no-first-run',
      '--no-default-browser-check', '--remote-debugging-port=0', `--user-data-dir=${profileDirectory}`, 'about:blank',
    ], { stdio: ['ignore', 'ignore', 'pipe'] });
    cdp = await createCdpClient(await waitForDevTools(chrome));
    const { targetId } = await cdp.send('Target.createTarget', { url: site.url });
    const { sessionId } = await cdp.send('Target.attachToTarget', { targetId, flatten: true });
    await cdp.send('Page.enable', {}, sessionId);
    await cdp.send('Runtime.enable', {}, sessionId);
    await waitForReady(cdp, sessionId);

    const now = new Date().toISOString();
    const previousDay = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString();
    const attempts = [
      { id: 'read-now', kind: 'reading', completedAt: now, sourceIds: ['be-1'], sourceCommit: COMMIT },
      {
        id: 'quiz-now', kind: 'quiz-main', completedAt: now, sourceIds: ['be-1'], sourceCommit: COMMIT,
        bankVersion: 'quiz-bank-v2',
        questionResults: [
          { questionId: 'quiz-now-q', sourceId: 'be-1', selectedIndex: 0, correctIndex: 1 },
          { questionId: 'quiz-now-unanswered', sourceId: 'be-1', correctIndex: 1 },
        ],
      },
      { id: 'self-now', kind: 'interview-self', completedAt: now, sourceIds: ['be-1'], sourceCommit: COMMIT },
      { id: 'read-before', kind: 'reading', completedAt: previousDay, sourceIds: ['be-2'], sourceCommit: COMMIT },
      {
        id: 'paused', kind: 'quiz-main', status: 'interrupted', startedAt: now, sourceIds: ['be-1'],
        questionIds: ['paused-q'], sourceCommit: COMMIT, resume: { sessionId: 'paused-session', nextQuestionIndex: 1 },
      },
    ];
    await evaluate(
      cdp,
      sessionId,
      `localStorage.setItem('job-prep-routine:study-history:v1', ${JSON.stringify(JSON.stringify({ attempts }))})`,
    );
    const loaded = cdp.waitForEvent('Page.loadEventFired', sessionId);
    await cdp.send('Page.reload', {}, sessionId);
    await loaded;
    await waitForReady(cdp, sessionId);

    const initial = await evaluate(cdp, sessionId, `(() => ({
      cells: document.querySelectorAll('[data-study-date]').length,
      total: document.querySelector('#study-activity-total').textContent,
      active: document.querySelector('#study-activity-active-days').textContent,
      streak: document.querySelector('#study-activity-current-streak').textContent,
      quizPercent: document.querySelector('#study-activity-total-quiz-percent').textContent,
      quizAnswers: document.querySelector('#study-activity-quiz-answer-count').textContent,
      readingTotal: document.querySelector('#study-activity-reading-total').textContent,
      quizTotal: document.querySelector('#study-activity-quiz-total').textContent,
      interviewTotal: document.querySelector('#study-activity-interview-total').textContent,
      selected: document.querySelector('[aria-pressed="true"]').getAttribute('aria-label'),
      details: document.querySelectorAll('#study-activity-detail-list article').length,
      dayReading: document.querySelector('#study-day-reading-count').textContent,
      dayQuiz: document.querySelector('#study-day-quiz-count').textContent,
      dayInterview: document.querySelector('#study-day-interview-count').textContent,
      dayQuizPercent: document.querySelector('#study-activity-quiz-percent').textContent,
      detailQuizScore: document.querySelector('[data-study-kind="quiz"] .study-activity-detail-score').textContent,
      wrongToggles: document.querySelectorAll('.study-quiz-wrong-details').length,
      wrongToggleText: document.querySelector('.study-quiz-wrong-toggle')?.textContent ?? '',
      wrongInitiallyOpen: document.querySelector('.study-quiz-wrong-details')?.open ?? null,
      standaloneWrongPanel: Boolean(document.querySelector('#study-activity-wrong')),
      tabStops: document.querySelectorAll('[data-study-date][tabindex="0"]').length,
    }))()`);
    assert.equal(initial.cells, 90);
    assert.equal(initial.total, '4');
    assert.equal(initial.active, '2');
    assert.equal(initial.streak, '1');
    assert.equal(initial.quizPercent, '0%');
    assert.equal(initial.quizAnswers, '0/1 정답');
    assert.deepEqual(
      {
        reading: initial.readingTotal,
        quiz: initial.quizTotal,
        interview: initial.interviewTotal,
      },
      { reading: '2', quiz: '1', interview: '1' },
    );
    assert.match(initial.selected, /완료 활동 3건/u);
    assert.equal(initial.details, 3);
    assert.deepEqual(
      {
        reading: initial.dayReading,
        quiz: initial.dayQuiz,
        interview: initial.dayInterview,
        quizPercent: initial.dayQuizPercent,
      },
      { reading: '1', quiz: '1', interview: '1', quizPercent: '0%' },
    );
    assert.equal(initial.detailQuizScore, '정답 0/1 · 0%');
    assert.equal(initial.wrongToggles, 1);
    assert.equal(initial.wrongToggleText, '오답 1개 다시 보기');
    assert.equal(initial.wrongInitiallyOpen, false);
    assert.equal(initial.standaloneWrongPanel, false);
    assert.equal(initial.tabStops, 1);

    const openedWrongAnswer = await evaluate(cdp, sessionId, `(() => {
      const details = document.querySelector('.study-quiz-wrong-details');
      details.querySelector('summary').click();
      return {
        open: details.open,
        items: details.querySelectorAll('.study-wrong-item').length,
        answers: details.querySelector('.study-wrong-answer-grid')?.textContent ?? '',
      };
    })()`);
    assert.equal(openedWrongAnswer.open, true);
    assert.equal(openedWrongAnswer.items, 1);
    assert.match(openedWrongAnswer.answers, /내 답/u);
    assert.match(openedWrongAnswer.answers, /정답/u);

    const keyboardSelection = await evaluate(cdp, sessionId, `(() => {
      const selected = document.querySelector('[data-study-date][aria-pressed="true"]');
      const before = selected.dataset.studyDate;
      selected.focus();
      selected.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true }));
      const active = document.activeElement;
      return {
        before,
        activeDate: active.dataset.studyDate,
        pressedDate: document.querySelector('[data-study-date][aria-pressed="true"]').dataset.studyDate,
        tabStops: document.querySelectorAll('[data-study-date][tabindex="0"]').length,
      };
    })()`);
    assert.notEqual(keyboardSelection.activeDate, keyboardSelection.before);
    assert.equal(keyboardSelection.activeDate, keyboardSelection.pressedDate);
    assert.equal(keyboardSelection.tabStops, 1);

    const selectedPrevious = await evaluate(cdp, sessionId, `(() => {
      document.querySelector('.study-calendar-day.is-level-1').click();
      return {
        count: document.querySelector('#study-activity-selected-count').textContent,
        details: document.querySelectorAll('#study-activity-detail-list article').length,
        reading: document.querySelector('#study-day-reading-count').textContent,
        quiz: document.querySelector('#study-day-quiz-count').textContent,
        interview: document.querySelector('#study-day-interview-count').textContent,
        quizPercent: document.querySelector('#study-activity-quiz-percent').textContent,
        wrongToggles: document.querySelectorAll('.study-quiz-wrong-details').length,
      };
    })()`);
    assert.deepEqual(selectedPrevious, {
      count: '완료 활동 1건',
      details: 1,
      reading: '1',
      quiz: '0',
      interview: '0',
      quizPercent: '–',
      wrongToggles: 0,
    });
  } finally {
    cdp?.close();
    await stopChrome(chrome);
    if (server) await new Promise((resolveClose) => server.close(resolveClose));
    if (profileDirectory) await rm(profileDirectory, { recursive: true, force: true });
  }
});
