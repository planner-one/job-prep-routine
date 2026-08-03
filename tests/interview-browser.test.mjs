import test from 'node:test';
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { EventEmitter, once } from 'node:events';
import { readFile, mkdtemp, rm } from 'node:fs/promises';
import { createServer } from 'node:http';
import { tmpdir } from 'node:os';
import { dirname, extname, resolve, sep } from 'node:path';
import { setTimeout as delay } from 'node:timers/promises';
import { fileURLToPath } from 'node:url';
import { INTERVIEW_QUESTIONS } from '../src/interview-data.js';
import { INTERVIEW_STATE_KEY } from '../src/interview-core.js';
import { MAEIL_CONTENT_COMMIT } from '../src/maeil-content.js';
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
  return connectChromeToDevTools(chrome);
}

async function stopChrome(chrome) {
  if (!chrome || chrome.exitCode !== null) return;
  chrome.kill('SIGTERM');
  await Promise.race([once(chrome, 'exit'), delay(2_000)]);
  if (chrome.exitCode === null) chrome.kill('SIGKILL');
}

async function connectChromeToDevTools(chrome, waitForEndpoint = waitForDevTools) {
  try {
    const endpoint = await waitForEndpoint(chrome);
    return { chrome, endpoint };
  } catch (error) {
    await stopChrome(chrome);
    throw error;
  }
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

async function waitForCondition(cdp, sessionId, expression, message, timeoutMs = 10_000) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    if (await evaluate(cdp, sessionId, expression)) return;
    await delay(40);
  }
  throw new Error(message);
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

test('DevTools endpoint 연결 실패는 Chrome을 종료하고 원 오류를 다시 던진다', async () => {
  const signals = [];
  const chrome = new EventEmitter();
  chrome.exitCode = null;
  chrome.kill = (signal) => {
    signals.push(signal);
    queueMicrotask(() => {
      chrome.exitCode = 0;
      chrome.emit('exit', 0);
    });
    return true;
  };
  const endpointError = new Error('endpoint 실패');

  await assert.rejects(
    connectChromeToDevTools(chrome, async () => { throw endpointError; }),
    (error) => error === endpointError,
  );
  assert.deepEqual(signals, ['SIGTERM']);
  assert.equal(chrome.exitCode, 0);
  assert.equal(chrome.listenerCount('exit'), 0);
});

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
        queueDate: document.querySelector('#interview-queue-date')?.textContent ?? null,
        queueDatetime: document.querySelector('#interview-queue-date')?.getAttribute('datetime') ?? null,
        resultsLive: document.querySelector('#interview-results-count').getAttribute('aria-live'),
        resultsAtomic: document.querySelector('#interview-results-count').getAttribute('aria-atomic'),
      }))()`,
    );
    assert.equal(initial.questionIds.length, 14);
    assert.deepEqual(initial.questionIds, INTERVIEW_QUESTIONS.slice(0, 14).map(({ id }) => id));
    assert.equal(initial.categoryCount, 9);
    assert.equal(initial.queueIds.length, 5);
    assert.equal(initial.queueProgress, '오늘 0 / 5 완료');
    assert.match(initial.queueDate, /^\d{4}년 \d{1,2}월 \d{1,2}일$/u);
    assert.match(initial.queueDatetime, /^\d{4}-\d{2}-\d{2}$/u);
    assert.equal(initial.resultsLive, 'polite');
    assert.equal(initial.resultsAtomic, 'true');

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
          addAriaDisabled: renderedRow.querySelector('[data-interview-action="add-queue"]').getAttribute('aria-disabled'),
        };
      })()`,
    );
    assert.equal(afterAdd.queueIds.length, 5);
    assert.equal(afterAdd.queueIds.includes(targetQuestion.id), true);
    assert.equal(afterAdd.addAriaDisabled, 'true');

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
    assert.equal(edited.question.sourceCommit, MAEIL_CONTENT_COMMIT);
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
      `document.querySelector('.interview-mode-switch a[href="./templates.html"]')`,
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
          studying: document.querySelector('[data-interview-stat="studying"]')?.textContent ?? null,
          review: document.querySelector('[data-interview-stat="review"]')?.textContent ?? null,
          done: document.querySelector('[data-interview-stat="done"]')?.textContent ?? null,
          categoryCount: document.querySelectorAll('[data-interview-category-id]').length,
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
        studying: listMirror.studying,
        review: listMirror.review,
        done: listMirror.done,
      },
      { total: '152', studying: '0', review: '1', done: '0' },
    );
    assert.equal(listMirror.categoryCount, 9);
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
    await cdp.send('Page.addScriptToEvaluateOnNewDocument', {
      source: `(() => {
        window.__interviewSetItemCalls = 0;
        window.__interviewSetItemKeys = [];
        const originalSetItem = Storage.prototype.setItem;
        Object.defineProperty(Storage.prototype, 'setItem', {
          configurable: true,
          writable: true,
          value(...args) {
            window.__interviewSetItemCalls += 1;
            window.__interviewSetItemKeys.push(String(args[0]));
            return Reflect.apply(originalSetItem, this, args);
          },
        });
      })();`,
    }, sessionId);
    await navigate(cdp, sessionId, `${baseUrl}/template.html?id=be-999`, 'data-template-detail-ready');
    const invalid = await evaluate(
      cdp,
      sessionId,
      `(() => ({
        invalidHidden: document.querySelector('#interview-invalid').hidden,
        invalidText: document.querySelector('#interview-invalid').textContent,
        detailHidden: document.querySelector('#interview-detail').hidden,
        setItemCalls: window.__interviewSetItemCalls,
        setItemKeys: window.__interviewSetItemKeys,
        storageLength: localStorage.length,
        storageKeys: Object.keys(localStorage),
      }))()`,
    );
    assert.equal(invalid.invalidHidden, false);
    assert.match(invalid.invalidText, /요청한 면접 문항이 없습니다/u);
    assert.equal(invalid.detailHidden, true);
    assert.equal(invalid.setItemCalls, 0);
    assert.deepEqual(invalid.setItemKeys, []);
    assert.equal(invalid.storageLength, 0);
    assert.deepEqual(invalid.storageKeys, []);
  }, 'job-prep-interview-invalid-chrome-');
});

test('상세 직접 진입에서 만든 5문항 큐는 고정·완료 뒤 목록에서도 그대로 유지된다', { timeout: 45_000 }, async () => {
  await withBrowser(async ({ baseUrl, cdp, sessionId }) => {
    await navigate(cdp, sessionId, `${baseUrl}/template.html?id=be-1`, 'data-template-detail-ready');

    const detailQueue = await evaluate(
      cdp,
      sessionId,
      `(() => {
        const queueKey = Object.keys(localStorage)
          .find((key) => key.startsWith('job-prep-routine:interview:queue:'));
        const initial = queueKey ? JSON.parse(localStorage.getItem(queueKey)) : null;
        document.querySelector('#detail-pinned').click();
        document.querySelector('.interview-complete-today').click();
        return {
          queueKey,
          initial,
          updated: queueKey ? JSON.parse(localStorage.getItem(queueKey)) : null,
        };
      })()`,
    );

    assert.ok(detailQueue.queueKey);
    assert.equal(detailQueue.initial.ids.length, 5);
    assert.deepEqual(detailQueue.updated.ids, detailQueue.initial.ids);
    assert.deepEqual(detailQueue.updated.completedIds, ['be-1']);

    await clickAndWaitForNavigation(
      cdp,
      sessionId,
      `document.querySelector('.interview-mode-switch a[href="./templates.html"]')`,
      'data-templates-ready',
    );
    const listQueue = await evaluate(
      cdp,
      sessionId,
      `(() => ({
        ids: [...document.querySelectorAll('.interview-queue-card')].map((card) => card.dataset.questionId),
        stored: JSON.parse(localStorage.getItem(${JSON.stringify(detailQueue.queueKey)})),
        pinned: document.querySelector('.interview-queue-card[data-question-id="be-1"] [data-interview-action="toggle-pin"]')?.getAttribute('aria-pressed'),
        completed: document.querySelector('.interview-queue-card[data-question-id="be-1"] [data-interview-action="toggle-complete"]')?.getAttribute('aria-pressed'),
      }))()`,
    );

    assert.deepEqual(listQueue.ids, detailQueue.initial.ids);
    assert.deepEqual(listQueue.stored.ids, detailQueue.initial.ids);
    assert.equal(listQueue.pinned, 'true');
    assert.equal(listQueue.completed, 'true');
  }, 'job-prep-interview-direct-entry-chrome-');
});

test('실패한 상세 draft는 다음 상태 저장에 포함되어 reload 뒤 복원된다', { timeout: 45_000 }, async () => {
  await withBrowser(async ({ baseUrl, cdp, sessionId }) => {
    await navigate(cdp, sessionId, `${baseUrl}/template.html?id=be-1`, 'data-template-detail-ready');
    const draft = {
      answer: '브라우저 복구 답변 draft',
      keywords: '브라우저 복구 키워드 draft',
      memo: '브라우저 복구 메모 draft',
    };

    const persisted = await evaluate(
      cdp,
      sessionId,
      `(() => {
        const originalSetItem = Storage.prototype.setItem;
        let failStateWrites = true;
        Object.defineProperty(Storage.prototype, 'setItem', {
          configurable: true,
          writable: true,
          value(key, value) {
            if (failStateWrites && key === ${JSON.stringify(INTERVIEW_STATE_KEY)}) {
              throw new DOMException('quota', 'QuotaExceededError');
            }
            return Reflect.apply(originalSetItem, this, [key, value]);
          },
        });
        const inputValue = (selector, value) => {
          const input = document.querySelector(selector);
          input.value = value;
          input.dispatchEvent(new Event('input', { bubbles: true }));
        };
        inputValue('#detail-answer', ${JSON.stringify(draft.answer)});
        inputValue('#detail-keywords', ${JSON.stringify(draft.keywords)});
        inputValue('#detail-memo', ${JSON.stringify(draft.memo)});
        failStateWrites = false;
        const status = document.querySelector('#detail-status');
        status.value = 'review';
        status.dispatchEvent(new Event('change', { bubbles: true }));
        return JSON.parse(localStorage.getItem(${JSON.stringify(INTERVIEW_STATE_KEY)})).questions['be-1'];
      })()`,
    );
    assert.deepEqual(
      {
        status: persisted.status,
        answer: persisted.answer,
        keywords: persisted.keywords,
        memo: persisted.memo,
      },
      { status: 'review', ...draft },
    );

    await reload(cdp, sessionId, 'data-template-detail-ready');
    const restored = await evaluate(
      cdp,
      sessionId,
      `(() => ({
        status: document.querySelector('#detail-status').value,
        answer: document.querySelector('#detail-answer').value,
        keywords: document.querySelector('#detail-keywords').value,
        memo: document.querySelector('#detail-memo').value,
      }))()`,
    );
    assert.deepEqual(restored, { status: 'review', ...draft });
  }, 'job-prep-interview-draft-retry-chrome-');
});

test('목록 큐 조작 성공 뒤 의미상 대응 버튼이 실제 activeElement가 된다', { timeout: 45_000 }, async () => {
  await withBrowser(async ({ baseUrl, cdp, sessionId }) => {
    await navigate(cdp, sessionId, `${baseUrl}/templates.html`, 'data-templates-ready');
    const focusResults = await evaluate(
      cdp,
      sessionId,
      `(() => {
        const queueIds = () => [...document.querySelectorAll('.interview-queue-card')]
          .map((card) => card.dataset.questionId);
        const button = (action, id) => [...document.querySelectorAll('[data-interview-action]')]
          .find((candidate) => candidate.dataset.interviewAction === action && candidate.dataset.questionId === id);
        const focused = (action, id) => document.activeElement === button(action, id);
        const firstId = queueIds()[0];

        let target = button('toggle-pin', firstId);
        target.focus();
        target.click();
        const pin = focused('toggle-pin', firstId);

        target = button('toggle-pin', firstId);
        target.focus();
        target.click();
        const unpin = focused('toggle-pin', firstId);

        target = button('toggle-complete', firstId);
        target.focus();
        target.click();
        const complete = focused('toggle-complete', firstId);

        target = button('toggle-complete', firstId);
        target.focus();
        target.click();
        const cancel = focused('toggle-complete', firstId);

        const addId = ${JSON.stringify('be-7')};
        target = button('add-queue', addId);
        target.focus();
        target.click();
        const add = focused('add-queue', addId);

        const replaceIndex = 0;
        const replacedId = queueIds()[replaceIndex];
        target = button('replace-queue', replacedId);
        target.focus();
        target.click();
        const replacementId = queueIds()[replaceIndex];
        const replacementButton = button('replace-queue', replacementId);
        const replace = document.activeElement === replacementButton;

        return {
          pin,
          unpin,
          complete,
          cancel,
          add,
          addAriaDisabled: button('add-queue', addId).getAttribute('aria-disabled'),
          replace,
          replacedId,
          replacementId,
        };
      })()`,
    );

    assert.deepEqual(
      {
        pin: focusResults.pin,
        unpin: focusResults.unpin,
        complete: focusResults.complete,
        cancel: focusResults.cancel,
        add: focusResults.add,
        replace: focusResults.replace,
      },
      { pin: true, unpin: true, complete: true, cancel: true, add: true, replace: true },
    );
    assert.equal(focusResults.addAriaDisabled, 'true');
    assert.notEqual(focusResults.replacementId, focusResults.replacedId);
  }, 'job-prep-interview-queue-focus-chrome-');
});

test('목록→원문→5+5 퀴즈→면접 자가·AI 평가를 한 글의 출처를 유지해 완주한다', { timeout: 60_000 }, async () => {
  await withBrowser(async ({ baseUrl, cdp, sessionId }) => {
    const groundedQuote = 'OSIV의 핵심은 뷰에서도 지연 로딩이 가능하도록 하는 것입니다.';
    const mockEvaluation = {
      scores: { accuracy: 82, coverage: 78, clarity: 86, interviewReadiness: 80 },
      strengths: [{ feedback: '핵심 목적을 설명했습니다.', evidenceQuote: groundedQuote }],
      gaps: [{ feedback: '원문의 지연 로딩 목적을 더 분명히 연결해 보세요.', evidenceQuote: groundedQuote }],
      unsupportedClaims: [],
      improvedAnswer: `OSIV는 ${groundedQuote}`,
      followUps: ['OSIV를 비활성화하면 어떤 설계가 필요한가요?', '커넥션 점유 문제는 언제 커질까요?'],
      evidence: [{ feedback: '원문에 명시된 OSIV 핵심', evidenceQuote: groundedQuote }],
    };
    await cdp.send('Page.addScriptToEvaluateOnNewDocument', {
      source: `(() => {
        const nativeFetch = window.fetch.bind(window);
        window.fetch = async (input, init) => {
          const url = typeof input === 'string' ? input : input.url;
          if (url === 'http://127.0.0.1:11434/api/tags') {
            return new Response(JSON.stringify({ models: [{ name: 'qwen3:14b' }] }), {
              status: 200,
              headers: { 'content-type': 'application/json' },
            });
          }
          if (url === 'http://127.0.0.1:11434/api/chat') {
            return new Response(JSON.stringify({
              model: 'qwen3:14b',
              message: { content: JSON.stringify(${JSON.stringify(mockEvaluation)}) },
            }), {
              status: 200,
              headers: { 'content-type': 'application/json' },
            });
          }
          return nativeFetch(input, init);
        };
      })();`,
    }, sessionId);

    await navigate(cdp, sessionId, `${baseUrl}/contents.html`, 'data-contents-ready');
    const listState = await evaluate(cdp, sessionId, `(() => ({
      total: document.querySelector('[data-reader-page="list"]').dataset.readingTotal,
      rows: document.querySelectorAll('#reading-list > [data-content-id]').length,
      target: Boolean(document.querySelector('#reading-list [data-content-id="be-1"] .reader-file-link')),
    }))()`);
    assert.equal(listState.total, '152');
    assert.equal(listState.rows > 0, true);
    assert.equal(listState.target, true);

    await clickAndWaitForNavigation(
      cdp,
      sessionId,
      `document.querySelector('#reading-list [data-content-id="be-1"] .reader-file-link')`,
      'data-content-ready',
    );
    await waitForCondition(
      cdp,
      sessionId,
      `document.documentElement.dataset.contentLoaded === 'true'`,
      '로컬 고정 원문을 불러오지 못했습니다.',
    );
    const readingState = await evaluate(cdp, sessionId, `(() => ({
      id: new URL(location.href).searchParams.get('id'),
      bodyLength: document.querySelector('#content-body').textContent.length,
      readMode: new URL(document.querySelector('#content-read-mode').href).searchParams.get('id'),
      quizMode: new URL(document.querySelector('#content-quiz-mode').href).searchParams.get('source'),
      interviewMode: new URL(document.querySelector('#content-interview-mode').href).searchParams.get('id'),
    }))()`);
    assert.equal(readingState.id, 'be-1');
    assert.equal(readingState.bodyLength > 100, true);
    assert.deepEqual(
      { read: readingState.readMode, quiz: readingState.quizMode, interview: readingState.interviewMode },
      { read: 'be-1', quiz: 'be-1', interview: 'be-1' },
    );

    await clickAndWaitForNavigation(
      cdp,
      sessionId,
      `document.querySelector('#content-quiz-link')`,
      'data-quiz-ready',
    );
    const firstRound = await evaluate(cdp, sessionId, `(() => {
      let safety = 0;
      while (document.querySelector('#quiz-round-summary').hidden && safety < 40) {
        const input = document.querySelector('#quiz-cluster input[type="radio"]');
        if (input) {
          input.click();
          document.querySelector('#quiz-confirm-answer').click();
        } else {
          document.querySelector('#quiz-next-main')?.click();
        }
        safety += 1;
      }
      const attempts = JSON.parse(localStorage.getItem('job-prep-routine:quiz:v2:attempts'));
      const studyAttempts = JSON.parse(localStorage.getItem('job-prep-routine:study-history:v1')).attempts;
      return {
        source: new URL(location.href).searchParams.get('source'),
        summaryVisible: !document.querySelector('#quiz-round-summary').hidden,
        scoreCards: document.querySelectorAll('#quiz-round-score-grid .quiz-score-card').length,
        mainAnswered: attempts[0].score.main.answered,
        tailAnswered: attempts[0].score.followUp.answered,
        sessionVersion: attempts[0].session.version,
        studyMain: studyAttempts.filter(({ kind }) => kind === 'quiz-main').length,
        studyFollowUp: studyAttempts.filter(({ kind }) => kind === 'quiz-follow-up').length,
      };
    })()`);
    assert.equal(firstRound.source, 'be-1');
    assert.equal(firstRound.summaryVisible, true);
    assert.equal(firstRound.scoreCards, 4);
    assert.equal(firstRound.mainAnswered, 5);
    assert.equal(firstRound.tailAnswered >= 10, true);
    assert.equal(firstRound.sessionVersion, 2);
    assert.equal(firstRound.studyMain, 1);
    assert.equal(firstRound.studyFollowUp, 5);

    const secondRound = await evaluate(cdp, sessionId, `(() => {
      document.querySelector('#quiz-start-second-round').click();
      let safety = 0;
      while (document.querySelector('#quiz-final-summary').hidden && safety < 40) {
        const input = document.querySelector('#quiz-cluster input[type="radio"]');
        if (input) {
          input.click();
          document.querySelector('#quiz-confirm-answer').click();
        } else {
          document.querySelector('#quiz-next-main')?.click();
        }
        safety += 1;
      }
      const attempts = JSON.parse(localStorage.getItem('job-prep-routine:quiz:v2:attempts'));
      const studyAttempts = JSON.parse(localStorage.getItem('job-prep-routine:study-history:v1')).attempts;
      return {
        stage: document.querySelector('#quiz-round-kicker').textContent,
        summaryVisible: !document.querySelector('#quiz-final-summary').hidden,
        scoreCards: document.querySelectorAll('#quiz-final-score-grid .quiz-score-card').length,
        attempts: attempts.length,
        mainAnswered: attempts[0].score.main.answered,
        tailAnswered: attempts[0].score.followUp.answered,
        interviewMode: new URL(document.querySelector('#quiz-interview-link').href).searchParams.get('id'),
        studyMain: studyAttempts.filter(({ kind }) => kind === 'quiz-main').length,
        studyFollowUp: studyAttempts.filter(({ kind }) => kind === 'quiz-follow-up').length,
      };
    })()`);
    assert.equal(secondRound.stage, 'ROUND 2');
    assert.equal(secondRound.summaryVisible, true);
    assert.equal(secondRound.scoreCards, 4);
    assert.equal(secondRound.attempts, 1);
    assert.equal(secondRound.mainAnswered, 10);
    assert.equal(secondRound.tailAnswered >= 20, true);
    assert.equal(secondRound.interviewMode, 'be-1');
    assert.equal(secondRound.studyMain, 2);
    assert.equal(secondRound.studyFollowUp, 10);

    await clickAndWaitForNavigation(
      cdp,
      sessionId,
      `document.querySelector('#quiz-interview-link')`,
      'data-template-detail-ready',
    );
    const answer = 'OSIV는 영속성 컨텍스트를 뷰까지 유지해 지연 로딩을 돕습니다.';
    await evaluate(cdp, sessionId, `(() => {
      const input = (selector, value) => {
        const element = document.querySelector(selector);
        element.value = value;
        element.dispatchEvent(new Event('input', { bubbles: true }));
      };
      input('#detail-answer', ${JSON.stringify(answer)});
      input('#detail-keywords', 'OSIV, 영속성 컨텍스트, 지연 로딩');
      input('#detail-memo', '커넥션 점유 복습');
      const confidence = document.querySelector('#detail-confidence');
      confidence.value = '4';
      confidence.dispatchEvent(new Event('change', { bubbles: true }));
      document.querySelector('#detail-reveal-reference').click();
      return true;
    })()`);
    await waitForCondition(
      cdp,
      sessionId,
      `document.querySelector('#detail-reference-body').textContent.includes(${JSON.stringify(groundedQuote)})`,
      '면접 비교용 원문을 불러오지 못했습니다.',
    );
    await evaluate(cdp, sessionId, `(() => { document.querySelector('#detail-ai-evaluate').click(); return true; })()`);
    await waitForCondition(
      cdp,
      sessionId,
      `document.querySelector('#detail-ai-result').hidden === false && document.querySelector('#detail-ai-evaluate').getAttribute('aria-busy') === null`,
      '모의 AI 평가가 완료되지 않았습니다.',
    );
    const interviewState = await evaluate(cdp, sessionId, `(() => {
      const state = JSON.parse(localStorage.getItem(${JSON.stringify(INTERVIEW_STATE_KEY)}));
      const evaluations = JSON.parse(localStorage.getItem('job-prep-routine:interview:evaluations'));
      return {
        id: new URL(location.href).searchParams.get('id'),
        answer: document.querySelector('#detail-answer').value,
        referenceVisible: !document.querySelector('#detail-reference').hidden,
        resultText: document.querySelector('#detail-ai-result').textContent,
        setupHidden: document.querySelector('#detail-ai-setup').hidden,
        sourceCommit: state.questions['be-1'].sourceCommit,
        evaluationCount: evaluations.evaluations['be-1'].length,
      };
    })()`);
    assert.equal(interviewState.id, 'be-1');
    assert.equal(interviewState.answer, answer);
    assert.equal(interviewState.referenceVisible, true);
    assert.match(interviewState.resultText, /82점/u);
    assert.match(interviewState.resultText, /개선된 1분 답변/u);
    assert.equal(interviewState.setupHidden, true);
    assert.equal(interviewState.sourceCommit, MAEIL_CONTENT_COMMIT);
    assert.equal(interviewState.evaluationCount, 1);

    await cdp.send('Emulation.setDeviceMetricsOverride', {
      width: 390,
      height: 844,
      deviceScaleFactor: 1,
      mobile: true,
    }, sessionId);
    const mobileInterview = await evaluate(
      cdp,
      sessionId,
      `({ width: innerWidth, scrollWidth: document.documentElement.scrollWidth })`,
    );
    assert.deepEqual(mobileInterview, { width: 390, scrollWidth: 390 });

    for (const [path, ready] of [
      ['/content.html?id=be-1', 'data-content-ready'],
      ['/quiz.html?source=be-1', 'data-quiz-ready'],
      ['/contents.html', 'data-contents-ready'],
    ]) {
      await navigate(cdp, sessionId, `${baseUrl}${path}`, ready);
      // Chrome headless는 문서 전환 때 device metrics의 visual viewport를 재계산할 수 있어
      // 각 페이지에 동일한 실기기 크기를 다시 고정한 뒤 overflow를 검증한다.
      await cdp.send('Emulation.setDeviceMetricsOverride', {
        width: 390,
        height: 844,
        screenWidth: 390,
        screenHeight: 844,
        deviceScaleFactor: 1,
        mobile: true,
      }, sessionId);
      const metrics = await evaluate(
        cdp,
        sessionId,
        `({ screenWidth: screen.width, width: innerWidth, scrollWidth: document.documentElement.scrollWidth })`,
      );
      assert.equal(metrics.screenWidth, 390, path);
      assert.equal(metrics.scrollWidth, metrics.width, path);
    }
  }, 'job-prep-learning-flow-chrome-');
});

test('읽기 목록 재렌더는 의미상 대응 버튼에 포커스를 복원하고 저장 실패를 성공으로 알리지 않는다', { timeout: 45_000 }, async () => {
  await withBrowser(async ({ baseUrl, cdp, sessionId }) => {
    await navigate(cdp, sessionId, `${baseUrl}/contents.html`, 'data-contents-ready');

    const focusResults = await evaluate(cdp, sessionId, `(() => {
      const category = (id) => document.querySelector('[data-reading-category="' + id + '"]');
      const pageButton = (number) => [...document.querySelectorAll('[data-reading-page]')]
        .find((button) => button.textContent === String(number));
      const todayItem = (id) => document.querySelector('#reading-today-list [data-content-id="' + id + '"]');
      const catalogItem = (id) => document.querySelector('#reading-list [data-content-id="' + id + '"]');
      const action = (container, name) => container?.querySelector('[data-reading-action="' + name + '"]');

      const pageSizeField = document.querySelector('#reading-page-size');
      const initialPageSize = pageSizeField.value;
      const initialRows = document.querySelectorAll('#reading-list > [data-content-id]').length;
      const paginationCopies = [...document.querySelectorAll('.reader-pagination')]
        .filter((pagination) => !pagination.hidden).length;
      pageSizeField.value = '10';
      pageSizeField.dispatchEvent(new Event('change', { bubbles: true }));
      const expandedRows = document.querySelectorAll('#reading-list > [data-content-id]').length;
      const storedPageSize = localStorage.getItem('job-prep-routine:maeil-reader:v1:page-size');
      pageSizeField.value = '6';
      pageSizeField.dispatchEvent(new Event('change', { bubbles: true }));

      let target = category('distributed-cache');
      target.focus();
      target.click();
      const categoryFocused = document.activeElement === category('distributed-cache')
        && document.activeElement.getAttribute('aria-pressed') === 'true';

      target = category('all');
      target.focus();
      target.click();
      const allFocused = document.activeElement === category('all');

      target = pageButton(2);
      target.focus();
      target.click();
      const secondPageFocused = document.activeElement === pageButton(2);

      target = pageButton(1);
      target.focus();
      target.click();
      const firstPageFocused = document.activeElement === pageButton(1);

      const addId = 'be-5';
      target = action(catalogItem(addId), 'add');
      target.focus();
      target.click();
      const addedTarget = action(todayItem(addId), 'toggle-completed');
      const addFocused = document.activeElement === addedTarget;

      addedTarget.click();
      const toggledTarget = action(todayItem(addId), 'toggle-completed');
      const toggleFocused = document.activeElement === toggledTarget
        && toggledTarget.getAttribute('aria-pressed') === 'true';

      const beforeReplace = [...document.querySelectorAll('#reading-today-list > [data-content-id]')];
      const replaceIndex = beforeReplace.findIndex((item) => item.dataset.contentId !== addId);
      const replacedId = beforeReplace[replaceIndex].dataset.contentId;
      target = action(beforeReplace[replaceIndex], 'replace');
      target.focus();
      target.click();
      const afterReplace = [...document.querySelectorAll('#reading-today-list > [data-content-id]')];
      const replacementId = afterReplace[replaceIndex].dataset.contentId;
      const replaceFocused = replacementId !== replacedId
        && document.activeElement === action(afterReplace[replaceIndex], 'replace');

      const removable = afterReplace.find((item) => (
        item.dataset.contentId !== addId
        && item.dataset.contentId !== replacementId
      ));
      const removedId = removable.dataset.contentId;
      target = action(removable, 'remove');
      target.focus();
      target.click();
      const reAdd = action(catalogItem(removedId), 'add');
      const removeFocused = document.activeElement === reAdd && reAdd.disabled === false;

      const failureId = 'be-6';
      const failureButton = action(catalogItem(failureId), 'add');
      const nativeSetItem = Storage.prototype.setItem;
      failureButton.focus();
      try {
        Storage.prototype.setItem = function setItemFailure() { throw new Error('quota'); };
        failureButton.click();
      } finally {
        Storage.prototype.setItem = nativeSetItem;
      }
      const failureTarget = action(todayItem(failureId), 'toggle-completed');

      return {
        initialPageSize,
        initialRows,
        paginationCopies,
        expandedRows,
        storedPageSize,
        categoryFocused,
        allFocused,
        secondPageFocused,
        firstPageFocused,
        addFocused,
        toggleFocused,
        replaceFocused,
        removeFocused,
        failureFocusRestored: document.activeElement === failureTarget,
        failureMessage: document.querySelector('#reading-live').textContent,
      };
    })()`);

    assert.deepEqual(focusResults, {
      initialPageSize: '6',
      initialRows: 6,
      paginationCopies: 1,
      expandedRows: 10,
      storedPageSize: '10',
      categoryFocused: true,
      allFocused: true,
      secondPageFocused: true,
      firstPageFocused: true,
      addFocused: true,
      toggleFocused: true,
      replaceFocused: true,
      removeFocused: true,
      failureFocusRestored: true,
      failureMessage: '읽기 기록을 저장하지 못했습니다. 현재 화면에서는 계속 사용할 수 있어요.',
    });

    await navigate(cdp, sessionId, `${baseUrl}/content.html?id=be-8`, 'data-content-ready');
    const detailFailure = await evaluate(cdp, sessionId, `(() => {
      const nativeSetItem = Storage.prototype.setItem;
      const add = document.querySelector('#content-add-today');
      try {
        Storage.prototype.setItem = function setItemFailure() { throw new Error('quota'); };
        add.click();
      } finally {
        Storage.prototype.setItem = nativeSetItem;
      }
      const addFailure = {
        message: document.querySelector('#content-live').textContent,
        memoryUpdated: add.disabled,
      };

      const mark = document.querySelector('#content-mark-read');
      try {
        Storage.prototype.setItem = function setItemFailure() { throw new Error('quota'); };
        mark.click();
      } finally {
        Storage.prototype.setItem = nativeSetItem;
      }
      return {
        addFailure,
        markMessage: document.querySelector('#content-live').textContent,
        markMemoryUpdated: mark.getAttribute('aria-pressed'),
      };
    })()`);

    assert.deepEqual(detailFailure, {
      addFailure: {
        message: '읽기 기록을 저장하지 못했습니다. 본문은 계속 읽을 수 있어요.',
        memoryUpdated: true,
      },
      markMessage: '읽기 기록을 저장하지 못했습니다. 본문은 계속 읽을 수 있어요.',
      markMemoryUpdated: 'true',
    });
  }, 'job-prep-reader-focus-storage-chrome-');
});

test('be-3 퀴즈는 꼬리 문제 3개가 연결된 최신 데이터로 정상 시작한다', { timeout: 45_000 }, async () => {
  await withBrowser(async ({ baseUrl, cdp, sessionId }) => {
    await navigate(cdp, sessionId, `${baseUrl}/quiz.html?source=be-3`, 'data-quiz-ready');
    const state = await evaluate(cdp, sessionId, `(() => {
      const sessionKey = Object.keys(localStorage)
        .find((key) => key.includes('job-prep-routine:quiz:v2:session:') && key.endsWith(':be-3'));
      const session = sessionKey ? JSON.parse(localStorage.getItem(sessionKey)) : null;
      return {
        ready: document.documentElement.dataset.quizReady,
        invalidHidden: document.querySelector('#quiz-invalid').hidden,
        sessionVisible: !document.querySelector('#quiz-session').hidden,
        primarySourceId: session?.primarySourceId ?? null,
        firstMainId: session?.mainQuestionIds?.[0] ?? null,
        allTailCounts: Object.values(session?.followUpIdsByMain ?? {}).map((ids) => ids.length),
      };
    })()`);

    assert.deepEqual(state, {
      ready: 'true',
      invalidHidden: true,
      sessionVisible: true,
      primarySourceId: 'be-3',
      firstMainId: 'quiz-be-3-main',
      allTailCounts: Array(10).fill(3),
    });
  }, 'job-prep-quiz-be-3-chrome-');
});
