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
import { INTERVIEW_CATEGORIES, INTERVIEW_QUESTIONS } from '../src/interview-data.js';
import { INTERVIEW_STATE_KEY } from '../src/interview-core.js';
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
    const relativePath = pathname === '/' ? 'templates.html' : pathname.replace(/^\/+/, '');
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
    baseUrl: `http://127.0.0.1:${address.port}`,
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

async function waitForPageReady(cdp, sessionId, readyAttribute) {
  const deadline = Date.now() + 10_000;
  while (Date.now() < deadline) {
    const ready = await evaluate(
      cdp,
      sessionId,
      `document.readyState === 'complete' && document.documentElement.getAttribute(${JSON.stringify(readyAttribute)}) === 'true'`,
    );
    if (ready) return;
    await delay(40);
  }
  throw new Error(`${readyAttribute} 초기화를 기다리다 시간 초과했습니다.`);
}

async function navigate(cdp, sessionId, url, readyAttribute) {
  const loaded = cdp.waitForEvent('Page.loadEventFired', sessionId);
  await cdp.send('Page.navigate', { url }, sessionId);
  await loaded;
  await waitForPageReady(cdp, sessionId, readyAttribute);
}

async function reload(cdp, sessionId, readyAttribute) {
  const loaded = cdp.waitForEvent('Page.loadEventFired', sessionId);
  await cdp.send('Page.reload', {}, sessionId);
  await loaded;
  await waitForPageReady(cdp, sessionId, readyAttribute);
}

async function clickAndWaitForNavigation(cdp, sessionId, expression, readyAttribute) {
  const loaded = cdp.waitForEvent('Page.loadEventFired', sessionId);
  await evaluate(cdp, sessionId, `(() => { const target = ${expression}; setTimeout(() => target.click(), 0); return true; })()`);
  await loaded;
  await waitForPageReady(cdp, sessionId, readyAttribute);
}

async function withBrowser(run, profilePrefix) {
  let server;
  let chrome;
  let cdp;
  let profileDirectory;

  try {
    const staticSite = await startStaticServer();
    server = staticSite.server;
    profileDirectory = await mkdtemp(resolve(tmpdir(), profilePrefix));

    const browser = await startChrome(profileDirectory);
    chrome = browser.chrome;
    cdp = await createCdpClient(browser.endpoint);

    const { targetId } = await cdp.send('Target.createTarget', { url: 'about:blank' });
    const { sessionId } = await cdp.send('Target.attachToTarget', { targetId, flatten: true });
    await cdp.send('Page.enable', {}, sessionId);
    await cdp.send('Runtime.enable', {}, sessionId);
    await run({ baseUrl: staticSite.baseUrl, cdp, sessionId });
  } finally {
    cdp?.close();
    await stopChrome(chrome);
    if (server) await new Promise((resolveClose) => server.close(resolveClose));
    if (profileDirectory) await rm(profileDirectory, { recursive: true, force: true });
  }
}

test('면접 목록과 상세가 같은 상태·오늘의 큐를 저장하고 복원한다', { timeout: 45_000 }, async () => {
  await withBrowser(async ({ baseUrl, cdp, sessionId }) => {
    await navigate(cdp, sessionId, `${baseUrl}/templates.html`, 'data-templates-ready');

    const initial = await evaluate(
      cdp,
      sessionId,
      `(() => ({
        questionIds: [...document.querySelectorAll('#interview-list > [data-question-id]')].map((row) => row.dataset.questionId),
        categoryCount: document.querySelectorAll('[data-interview-category-id]').length,
        queueIds: [...document.querySelectorAll('.interview-queue-card')].map((card) => card.dataset.questionId),
        queueProgress: document.querySelector('#interview-queue-progress').textContent,
      }))()`,
    );
    assert.deepEqual(initial.questionIds, INTERVIEW_QUESTIONS.map(({ id }) => id));
    assert.equal(initial.categoryCount, INTERVIEW_CATEGORIES.length + 1);
    assert.equal(initial.queueIds.length, 5);
    assert.equal(initial.queueProgress, '오늘 0 / 5 완료');

    const targetQuestion = INTERVIEW_QUESTIONS.find(({ id }) => !initial.queueIds.includes(id));
    assert.ok(targetQuestion, '초기 큐 밖의 공식 면접 문항이 있어야 한다');

    const filtered = await evaluate(
      cdp,
      sessionId,
      `(() => {
        const search = document.querySelector('#interview-search');
        search.value = ${JSON.stringify(targetQuestion.title)};
        search.dispatchEvent(new Event('input', { bubbles: true }));
        document.querySelector(${JSON.stringify(`[data-interview-category-id="${targetQuestion.categoryId}"]`)}).click();
        return {
          count: document.querySelector('#interview-results-count').textContent,
          rowIds: [...document.querySelectorAll('#interview-list > [data-question-id]')].map((row) => row.dataset.questionId),
          categoryPressed: document.querySelector(${JSON.stringify(`[data-interview-category-id="${targetQuestion.categoryId}"]`)}).getAttribute('aria-pressed'),
          allPressed: document.querySelector('[data-interview-category-id="all"]').getAttribute('aria-pressed'),
        };
      })()`,
    );
    assert.equal(filtered.count, '조건에 맞는 1문항');
    assert.deepEqual(filtered.rowIds, [targetQuestion.id]);
    assert.equal(filtered.categoryPressed, 'true');
    assert.equal(filtered.allPressed, 'false');

    const afterAdd = await evaluate(
      cdp,
      sessionId,
      `(() => {
        const row = [...document.querySelectorAll('#interview-list > [data-question-id]')]
          .find((candidate) => candidate.dataset.questionId === ${JSON.stringify(targetQuestion.id)});
        row.querySelector('[data-interview-action="add-queue"]').click();
        const renderedRow = [...document.querySelectorAll('#interview-list > [data-question-id]')]
          .find((candidate) => candidate.dataset.questionId === ${JSON.stringify(targetQuestion.id)});
        return {
          queueIds: [...document.querySelectorAll('.interview-queue-card')].map((card) => card.dataset.questionId),
          addDisabled: renderedRow.querySelector('[data-interview-action="add-queue"]').disabled,
        };
      })()`,
    );
    assert.equal(afterAdd.queueIds.length, 5);
    assert.equal(afterAdd.queueIds.includes(targetQuestion.id), true);
    assert.equal(afterAdd.addDisabled, true);

    await clickAndWaitForNavigation(
      cdp,
      sessionId,
      `[...document.querySelectorAll('#interview-list > [data-question-id]')]
        .find((row) => row.dataset.questionId === ${JSON.stringify(targetQuestion.id)})
        .querySelector('.interview-question-link')`,
      'data-template-detail-ready',
    );

    const detailIdentity = await evaluate(
      cdp,
      sessionId,
      `(() => ({
        id: new URL(location.href).searchParams.get('id'),
        title: document.querySelector('[data-detail-question]').textContent,
        category: document.querySelector('[data-detail-category]').textContent,
      }))()`,
    );
    assert.deepEqual(detailIdentity, {
      id: targetQuestion.id,
      title: targetQuestion.title,
      category: targetQuestion.category,
    });

    const answer = '브라우저 흐름으로 저장한 개인 답변';
    const keywords = '공식 ID, 상태 공유, 큐 복원';
    const memo = '목록 KPI와 인쇄 미러까지 확인';
    const edited = await evaluate(
      cdp,
      sessionId,
      `(() => {
        const changeValue = (selector, value) => {
          const input = document.querySelector(selector);
          input.value = value;
          input.dispatchEvent(new Event('change', { bubbles: true }));
        };
        const inputValue = (selector, value) => {
          const input = document.querySelector(selector);
          input.value = value;
          input.dispatchEvent(new Event('input', { bubbles: true }));
        };
        changeValue('#detail-status', 'review');
        changeValue('#detail-confidence', '2');
        document.querySelector('#detail-favorite').click();
        inputValue('#detail-answer', ${JSON.stringify(answer)});
        inputValue('#detail-keywords', ${JSON.stringify(keywords)});
        inputValue('#detail-memo', ${JSON.stringify(memo)});
        document.querySelector('.interview-complete-today').click();

        const state = JSON.parse(localStorage.getItem(${JSON.stringify(INTERVIEW_STATE_KEY)}));
        const queueKey = Object.keys(localStorage).find((key) => key.startsWith('job-prep-routine:interview:queue:'));
        return {
          question: state.questions[${JSON.stringify(targetQuestion.id)}],
          queueKey,
          queue: JSON.parse(localStorage.getItem(queueKey)),
          completePressed: document.querySelector('.interview-complete-today').getAttribute('aria-pressed'),
        };
      })()`,
    );
    assert.equal(edited.question.status, 'review');
    assert.equal(edited.question.confidence, 2);
    assert.equal(edited.question.favorite, true);
    assert.equal(edited.question.answer, answer);
    assert.equal(edited.question.keywords, keywords);
    assert.equal(edited.question.memo, memo);
    assert.match(edited.question.lastStudiedAt, /^\d{4}-\d{2}-\d{2}T/u);
    assert.equal(edited.queue.ids.includes(targetQuestion.id), true);
    assert.equal(edited.queue.completedIds.includes(targetQuestion.id), true);
    assert.equal(edited.completePressed, 'true');

    await reload(cdp, sessionId, 'data-template-detail-ready');
    const restored = await evaluate(
      cdp,
      sessionId,
      `(() => ({
        status: document.querySelector('#detail-status').value,
        confidence: document.querySelector('#detail-confidence').value,
        favorite: document.querySelector('#detail-favorite').getAttribute('aria-pressed'),
        answer: document.querySelector('#detail-answer').value,
        keywords: document.querySelector('#detail-keywords').value,
        memo: document.querySelector('#detail-memo').value,
        complete: document.querySelector('.interview-complete-today').getAttribute('aria-pressed'),
        lastStudied: document.querySelector('#detail-last-studied').getAttribute('datetime'),
        queue: JSON.parse(localStorage.getItem(${JSON.stringify(edited.queueKey)})),
      }))()`,
    );
    assert.deepEqual(
      {
        status: restored.status,
        confidence: restored.confidence,
        favorite: restored.favorite,
        answer: restored.answer,
        keywords: restored.keywords,
        memo: restored.memo,
        complete: restored.complete,
      },
      { status: 'review', confidence: '2', favorite: 'true', answer, keywords, memo, complete: 'true' },
    );
    assert.equal(restored.lastStudied, edited.question.lastStudiedAt);
    assert.deepEqual(restored.queue.ids, afterAdd.queueIds);
    assert.deepEqual(restored.queue.completedIds, [targetQuestion.id]);

    await clickAndWaitForNavigation(
      cdp,
      sessionId,
      `document.querySelector('.interview-back-nav a')`,
      'data-templates-ready',
    );
    const listMirror = await evaluate(
      cdp,
      sessionId,
      `(() => {
        const row = [...document.querySelectorAll('#interview-list > [data-question-id]')]
          .find((candidate) => candidate.dataset.questionId === ${JSON.stringify(targetQuestion.id)});
        const queueCard = [...document.querySelectorAll('.interview-queue-card')]
          .find((candidate) => candidate.dataset.questionId === ${JSON.stringify(targetQuestion.id)});
        return {
          total: document.querySelector('[data-interview-stat="total"]').textContent,
          learning: document.querySelector('[data-interview-stat="learning"]').textContent,
          complete: document.querySelector('[data-interview-stat="complete"]').textContent,
          favorite: document.querySelector('[data-interview-stat="favorite"]').textContent,
          resultsCount: document.querySelector('#interview-results-count').textContent,
          rowText: row.textContent,
          rowId: row.dataset.questionId,
          queueIds: [...document.querySelectorAll('.interview-queue-card')].map((card) => card.dataset.questionId),
          queueCompleted: queueCard.classList.contains('interview-queue-card--completed'),
          queueCompletePressed: queueCard.querySelector('[data-interview-action="toggle-complete"]').getAttribute('aria-pressed'),
          queueProgress: document.querySelector('#interview-queue-progress').textContent,
        };
      })()`,
    );
    assert.deepEqual(
      {
        total: listMirror.total,
        learning: listMirror.learning,
        complete: listMirror.complete,
        favorite: listMirror.favorite,
      },
      { total: String(INTERVIEW_QUESTIONS.length), learning: '1', complete: '0', favorite: '1' },
    );
    assert.equal(listMirror.resultsCount, '조건에 맞는 1문항');
    assert.equal(listMirror.rowId, targetQuestion.id);
    assert.match(listMirror.rowText, /복습 필요/u);
    assert.match(listMirror.rowText, /2 \/ 5/u);
    assert.match(listMirror.rowText, /★ 즐겨찾기/u);
    assert.deepEqual(listMirror.queueIds, afterAdd.queueIds);
    assert.equal(listMirror.queueCompleted, true);
    assert.equal(listMirror.queueCompletePressed, 'true');
    assert.equal(listMirror.queueProgress, '오늘 1 / 5 완료');

    await clickAndWaitForNavigation(
      cdp,
      sessionId,
      `[...document.querySelectorAll('#interview-list > [data-question-id]')]
        .find((row) => row.dataset.questionId === ${JSON.stringify(targetQuestion.id)})
        .querySelector('.interview-question-link')`,
      'data-template-detail-ready',
    );
    const printPreview = await evaluate(
      cdp,
      sessionId,
      `(() => {
        window.__interviewPrintCalls = 0;
        window.print = () => { window.__interviewPrintCalls += 1; };
        document.querySelector('[data-detail-pdf]').click();
        const entries = [...document.querySelectorAll('#detail-print-values dt')].map((term) => [
          term.textContent,
          term.nextElementSibling.textContent,
        ]);
        return { calls: window.__interviewPrintCalls, values: Object.fromEntries(entries) };
      })()`,
    );
    assert.equal(printPreview.calls, 1);
    assert.equal(printPreview.values['질문'], targetQuestion.title);
    assert.equal(printPreview.values['카테고리'], targetQuestion.category);
    assert.equal(printPreview.values['상태'], '복습 필요');
    assert.equal(printPreview.values['자신감'], '2 / 5');
    assert.equal(printPreview.values['답변'], answer);
    assert.equal(printPreview.values['키워드'], keywords);
    assert.equal(printPreview.values['메모'], memo);
  }, 'job-prep-interview-chrome-');
});

test('잘못된 면접 문항 ID는 오류만 표시하고 저장소를 쓰지 않는다', { timeout: 45_000 }, async () => {
  await withBrowser(async ({ baseUrl, cdp, sessionId }) => {
    await navigate(cdp, sessionId, `${baseUrl}/template.html?id=be-999`, 'data-template-detail-ready');
    const invalid = await evaluate(
      cdp,
      sessionId,
      `(() => ({
        invalidHidden: document.querySelector('#interview-invalid').hidden,
        invalidText: document.querySelector('#interview-invalid').textContent,
        detailHidden: document.querySelector('#interview-detail').hidden,
        storageLength: localStorage.length,
        storageKeys: Object.keys(localStorage),
      }))()`,
    );
    assert.equal(invalid.invalidHidden, false);
    assert.match(invalid.invalidText, /요청한 면접 문항이 없습니다/u);
    assert.equal(invalid.detailHidden, true);
    assert.equal(invalid.storageLength, 0);
    assert.deepEqual(invalid.storageKeys, []);
  }, 'job-prep-interview-invalid-chrome-');
});
