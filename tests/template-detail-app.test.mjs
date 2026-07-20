import test from 'node:test';
import assert from 'node:assert/strict';
import { INTERVIEW_QUESTIONS } from '../src/interview-data.js';
import { INTERVIEW_STATE_KEY, interviewQueueKey } from '../src/interview-core.js';
import {
  collectQuestionPatch,
  formatLastStudied,
  initTemplateDetailPage,
  previousNextQuestions,
  questionIdFromLocation,
  syncDetailPrintValues,
} from '../src/template-detail-app.js';

class FakeElement {
  constructor(tagName, ownerDocument) {
    this.tagName = tagName.toUpperCase();
    this.ownerDocument = ownerDocument;
    this.parentNode = null;
    this.children = [];
    this.dataset = {};
    this.attributes = new Map();
    this.listeners = new Map();
    this.className = '';
    this.hidden = false;
    this.disabled = false;
    this.value = '';
    this.href = '';
    this._textContent = '';
    this._id = '';
  }

  set id(value) { this._id = String(value); }
  get id() { return this._id; }
  set textContent(value) { this._textContent = String(value); this.children = []; }
  get textContent() { return this._textContent + this.children.map((child) => child.textContent).join(''); }

  setAttribute(name, value) {
    const normalized = String(value);
    this.attributes.set(name, normalized);
    if (name === 'id') this.id = normalized;
    if (name === 'class') this.className = normalized;
  }

  getAttribute(name) {
    if (name === 'id') return this.id || null;
    if (name === 'class') return this.className || null;
    return this.attributes.get(name) ?? null;
  }

  removeAttribute(name) { this.attributes.delete(name); }

  append(...children) {
    for (const child of children) {
      child.parentNode = this;
      this.children.push(child);
    }
  }

  replaceChildren(...children) {
    this.children = [];
    this._textContent = '';
    this.append(...children);
  }

  addEventListener(type, listener) {
    const listeners = this.listeners.get(type) ?? [];
    listeners.push(listener);
    this.listeners.set(type, listeners);
  }

  removeEventListener(type, listener) {
    this.listeners.set(type, (this.listeners.get(type) ?? []).filter((item) => item !== listener));
  }

  emit(type, target = this) {
    const event = { type, target, preventDefault() {} };
    for (const listener of this.listeners.get(type) ?? []) listener(event);
  }

  contains(candidate) {
    for (let current = candidate; current; current = current.parentNode) {
      if (current === this) return true;
    }
    return false;
  }

  closest(selector) {
    for (let current = this; current; current = current.parentNode) {
      if (matches(current, selector)) return current;
    }
    return null;
  }

  querySelector(selector) { return this.querySelectorAll(selector)[0] ?? null; }
  querySelectorAll(selector) {
    const found = [];
    const visit = (element) => {
      for (const child of element.children) {
        if (matches(child, selector)) found.push(child);
        visit(child);
      }
    };
    visit(this);
    return found;
  }
}

function matches(element, selector) {
  if (selector.startsWith('#')) return element.id === selector.slice(1);
  if (selector.startsWith('.')) return element.className.split(/\s+/u).includes(selector.slice(1));
  const data = selector.match(/^\[data-([\w-]+)\]$/u);
  if (data) {
    const key = data[1].replace(/-([a-z])/gu, (_, letter) => letter.toUpperCase());
    return Object.hasOwn(element.dataset, key);
  }
  return element.tagName.toLowerCase() === selector.toLowerCase();
}

class FakeDocument {
  constructor() {
    this.documentElement = new FakeElement('html', this);
    this.defaultView = null;
    this.listeners = new Map();
  }

  createElement(tagName) { return new FakeElement(tagName, this); }
  getElementById(id) { return this.documentElement.querySelector(`#${id}`); }
  querySelector(selector) { return this.documentElement.querySelector(selector); }
  addEventListener(type, listener) { this.listeners.set(type, listener); }
  removeEventListener(type) { this.listeners.delete(type); }
}

function appendElement(document, parent, tagName, options = {}) {
  const element = document.createElement(tagName);
  if (options.id) element.id = options.id;
  if (options.className) element.className = options.className;
  if (options.data) Object.assign(element.dataset, options.data);
  if (options.text) element.textContent = options.text;
  parent.append(element);
  return element;
}

function detailFixture(search = '?id=be-1') {
  const document = new FakeDocument();
  const page = appendElement(document, document.documentElement, 'main', { id: 'template-detail-page' });
  const invalid = appendElement(document, page, 'section', { id: 'interview-invalid' });
  invalid.hidden = true;
  const detail = appendElement(document, page, 'article', { id: 'interview-detail' });
  detail.hidden = true;
  appendElement(document, detail, 'p', { data: { detailCategory: '' } });
  appendElement(document, detail, 'h1', { data: { detailQuestion: '' } });
  appendElement(document, detail, 'p', { data: { detailPosition: '' } });
  appendElement(document, detail, 'select', { id: 'detail-status' });
  appendElement(document, detail, 'select', { id: 'detail-confidence' });
  const favorite = appendElement(document, detail, 'button', { id: 'detail-favorite' });
  favorite.setAttribute('aria-pressed', 'false');
  const pinned = appendElement(document, detail, 'button', { id: 'detail-pinned' });
  pinned.setAttribute('aria-pressed', 'false');
  appendElement(document, detail, 'textarea', { id: 'detail-answer' });
  appendElement(document, detail, 'input', { id: 'detail-keywords' });
  appendElement(document, detail, 'textarea', { id: 'detail-memo' });
  appendElement(document, detail, 'time', { id: 'detail-last-studied' }).setAttribute('datetime', '');
  const complete = appendElement(document, detail, 'button', { className: 'interview-complete-today' });
  complete.setAttribute('aria-pressed', 'false');
  appendElement(document, detail, 'a', { className: 'interview-source-link' });
  appendElement(document, detail, 'button', { data: { detailPrevious: '' } });
  appendElement(document, detail, 'button', { data: { detailNext: '' } });
  appendElement(document, detail, 'button', { data: { detailPdf: '' } });
  appendElement(document, detail, 'button', { data: { detailReset: '' } });
  appendElement(document, detail, 'section', { id: 'detail-print-values' });
  appendElement(document, page, 'p', { id: 'detail-live' });

  const timers = [];
  const view = {
    document,
    localStorage: null,
    location: { search, href: '', reload() {} },
    printCalls: 0,
    print() { this.printCalls += 1; },
    confirm: () => true,
    setTimeout(callback, delay) { timers.push({ callback, delay }); return timers.length; },
    clearTimeout() {},
    addEventListener() {},
    removeEventListener() {},
  };
  document.defaultView = view;
  return { document, page, view };
}

function memoryStorage(entries = {}) {
  const values = new Map(Object.entries(entries));
  let writes = 0;
  let fail = false;
  return {
    getItem(key) { return values.get(key) ?? null; },
    setItem(key, value) {
      writes += 1;
      if (fail) throw new Error('quota');
      values.set(key, value);
    },
    failWrites(value = true) { fail = value; },
    json(key) { const value = values.get(key); return value ? JSON.parse(value) : null; },
    writes: () => writes,
    keys: () => [...values.keys()],
  };
}

const NOW = new Date('2026-07-20T10:30:00+09:00');
const DATE = '2026-07-20';

function initFixture(entries = {}, search = '?id=be-1') {
  const fixture = detailFixture(search);
  const storage = memoryStorage(entries);
  fixture.view.localStorage = storage;
  const app = initTemplateDetailPage(fixture.document, {
    view: fixture.view,
    storage,
    now: () => new Date(NOW),
  });
  return { ...fixture, storage, app };
}

test('상세 URL에서 질문 ID를 정확히 읽는다', () => {
  assert.equal(questionIdFromLocation({ search: '?id=be-42' }), 'be-42');
  assert.equal(questionIdFromLocation({ search: '?id=' }), '');
});

test('이전·다음은 필터와 무관하게 원본 order를 따른다', () => {
  const current = INTERVIEW_QUESTIONS[1];
  const adjacent = previousNextQuestions(current, INTERVIEW_QUESTIONS);
  assert.equal(adjacent.previous.id, INTERVIEW_QUESTIONS[0].id);
  assert.equal(adjacent.next.id, INTERVIEW_QUESTIONS[2].id);
  assert.equal(previousNextQuestions(INTERVIEW_QUESTIONS[0], INTERVIEW_QUESTIONS).previous, null);
});

test('마지막 학습일이 없으면 명확한 기본 문구를 표시한다', () => {
  assert.equal(formatLastStudied(null), '아직 학습 기록이 없습니다.');
  assert.match(formatLastStudied('2026-07-20T01:00:00.000Z'), /2026/u);
});

test('저장된 상세 상태를 필드와 인쇄 미러에 복원하고 안전한 값 수집 계약을 제공한다', () => {
  const saved = {
    version: 1,
    questions: {
      'be-1': {
        status: 'review', confidence: 4, favorite: true, queuePinned: true,
        answer: '<img src=x onerror=alert(1)>', keywords: 'OSIV, 영속성', memo: '복기',
        lastStudiedAt: '2026-07-19T01:00:00.000Z', updatedAt: null,
      },
    },
    filters: { query: '보존', categoryId: 'all', status: 'review', favoritesOnly: true },
  };
  const { document } = initFixture({ [INTERVIEW_STATE_KEY]: JSON.stringify(saved) });

  assert.equal(document.querySelector('#interview-detail').hidden, false);
  assert.equal(document.querySelector('#interview-invalid').hidden, true);
  assert.equal(document.querySelector('[data-detail-question]').textContent, INTERVIEW_QUESTIONS[0].title);
  assert.equal(document.querySelector('#detail-status').value, 'review');
  assert.equal(document.querySelector('#detail-confidence').value, '4');
  assert.equal(document.querySelector('#detail-answer').value, saved.questions['be-1'].answer);
  assert.equal(document.querySelector('.interview-source-link').href, INTERVIEW_QUESTIONS[0].sourceUrl);
  assert.match(document.querySelector('#detail-print-values').textContent, /<img src=x onerror=alert\(1\)>/u);
  assert.equal(document.querySelector('#detail-print-values').querySelector('img'), null);
  assert.deepEqual(collectQuestionPatch(document), {
    status: 'review', confidence: 4, favorite: true, queuePinned: true,
    answer: saved.questions['be-1'].answer, keywords: 'OSIV, 영속성', memo: '복기',
  });
  assert.equal(document.querySelector('#detail-last-studied').getAttribute('datetime'), '2026-07-19T01:00:00.000Z');
  assert.equal(document.documentElement.dataset.templateDetailReady, 'true');
});

test('입력마다 현재 질문만 병합 저장하고 다른 질문·필터·과거 큐를 보존한다', () => {
  const state = {
    version: 1,
    questions: { 'be-3': { status: 'done', answer: '다른 답변' } },
    filters: { query: 'redis', categoryId: 'network-http', status: 'done', favoritesOnly: true },
  };
  const oldQueueKey = interviewQueueKey('2026-07-19');
  const { document, page, storage } = initFixture({
    [INTERVIEW_STATE_KEY]: JSON.stringify(state),
    [oldQueueKey]: JSON.stringify({ date: '2026-07-19', ids: ['be-3'], completedIds: [] }),
  });
  const answer = document.querySelector('#detail-answer');
  answer.value = '즉시 저장 답변';
  page.emit('input', answer);

  const stored = storage.json(INTERVIEW_STATE_KEY);
  assert.equal(stored.questions['be-1'].answer, '즉시 저장 답변');
  assert.equal(stored.questions['be-3'].answer, '다른 답변');
  assert.deepEqual(stored.filters, state.filters);
  assert.deepEqual(storage.json(oldQueueKey).ids, ['be-3']);
  assert.equal(document.querySelector('#detail-live').textContent, '저장됨');
});

test('유효하지 않은 ID에서는 편집 화면과 저장을 모두 막는다', () => {
  const { document, storage, app } = initFixture({}, '?id=be-999');
  assert.equal(app, null);
  assert.equal(document.querySelector('#interview-detail').hidden, true);
  assert.equal(document.querySelector('#interview-invalid').hidden, false);
  assert.equal(storage.writes(), 0);
  assert.deepEqual(storage.keys(), []);
  assert.equal(document.documentElement.dataset.templateDetailReady, 'true');
});

test('여섯 번째 고정과 큐 추가 실패는 버튼·질문 상태·큐를 직전 값으로 유지한다', () => {
  const pinnedQuestions = Object.fromEntries(
    INTERVIEW_QUESTIONS.slice(1, 6).map(({ id }) => [id, { queuePinned: true }]),
  );
  const queue = {
    date: DATE,
    ids: INTERVIEW_QUESTIONS.slice(1, 6).map(({ id }) => id),
    completedIds: [],
    updatedAt: 'saved',
  };
  const { document, page, app } = initFixture({
    [INTERVIEW_STATE_KEY]: JSON.stringify({ version: 1, questions: pinnedQuestions, filters: {} }),
    [interviewQueueKey(DATE)]: JSON.stringify(queue),
  });
  const button = document.querySelector('#detail-pinned');
  page.emit('click', button);
  assert.equal(button.getAttribute('aria-pressed'), 'false');
  assert.equal(app.getState().questions['be-1'], undefined);
  assert.deepEqual(app.getQueue(), queue);
  assert.match(document.querySelector('#detail-live').textContent, /최대 5개/u);
});

test('새 고정은 오늘 큐 밖이면 직접 추가하고 저장 실패 시 화면 상태를 되돌린다', () => {
  const queue = { date: DATE, ids: ['be-3'], completedIds: [], updatedAt: 'saved' };
  const success = initFixture({ [interviewQueueKey(DATE)]: JSON.stringify(queue) });
  success.page.emit('click', success.document.querySelector('#detail-pinned'));
  assert.equal(success.app.getState().questions['be-1'].queuePinned, true);
  assert.deepEqual(success.app.getQueue().ids, ['be-3', 'be-1']);

  const failed = initFixture({ [interviewQueueKey(DATE)]: JSON.stringify(queue) });
  failed.storage.failWrites();
  failed.page.emit('click', failed.document.querySelector('#detail-pinned'));
  assert.equal(failed.document.querySelector('#detail-pinned').getAttribute('aria-pressed'), 'false');
  assert.equal(failed.app.getState().questions['be-1'], undefined);
  assert.deepEqual(failed.app.getQueue(), queue);
  assert.equal(
    failed.document.querySelector('#detail-live').textContent,
    '저장하지 못했습니다. 작성 중인 내용은 화면에 유지됩니다.',
  );
});

test('오늘 완료는 큐에 먼저 추가하고 상태를 바꾸지 않으며 취소는 완료 목록만 바꾼다', () => {
  const { document, page, app, storage } = initFixture();
  const complete = document.querySelector('.interview-complete-today');
  page.emit('click', complete);
  assert.deepEqual(app.getQueue().ids, ['be-1']);
  assert.deepEqual(app.getQueue().completedIds, ['be-1']);
  assert.equal(app.getState().questions['be-1'].status, 'unseen');
  assert.equal(app.getState().questions['be-1'].lastStudiedAt, NOW.toISOString());

  const beforeCancel = app.getState();
  page.emit('click', complete);
  assert.deepEqual(app.getQueue().completedIds, []);
  assert.deepEqual(app.getState(), beforeCancel);
  assert.deepEqual(storage.json(interviewQueueKey(DATE)).completedIds, []);
});

test('정확한 확인 문구로 현재 질문만 초기화하고 다른 상태와 날짜 큐는 보존한다', () => {
  const state = {
    version: 1,
    questions: { 'be-1': { answer: '초기화 대상' }, 'be-3': { answer: '보존 대상' } },
    filters: { query: '보존', categoryId: 'all', status: 'all', favoritesOnly: false },
  };
  const queueKey = interviewQueueKey(DATE);
  const { document, page, view, storage, app } = initFixture({
    [INTERVIEW_STATE_KEY]: JSON.stringify(state),
    [queueKey]: JSON.stringify({ date: DATE, ids: ['be-1'], completedIds: ['be-1'], updatedAt: 'saved' }),
  });
  let prompt = '';
  view.confirm = (value) => { prompt = value; return true; };
  page.emit('click', document.querySelector('[data-detail-reset]'));

  assert.equal(prompt, '이 질문의 답변과 학습 기록을 초기화할까요?');
  assert.equal(app.getState().questions['be-1'], undefined);
  assert.equal(app.getState().questions['be-3'].answer, '보존 대상');
  assert.deepEqual(app.getState().filters, state.filters);
  assert.equal(document.querySelector('#detail-answer').value, '');
  assert.deepEqual(storage.json(queueKey).completedIds, ['be-1']);
});

test('PDF 직전에 최신 화면 값을 text node 미러로 만들고 인쇄를 한 번 호출한다', () => {
  const { document, page, view, app } = initFixture();
  const answer = document.querySelector('#detail-answer');
  answer.value = '인쇄 직전 답변 <script>alert(1)</script>';
  syncDetailPrintValues(document, INTERVIEW_QUESTIONS[0], app.getState().questions['be-1']);
  page.emit('click', document.querySelector('[data-detail-pdf]'));
  assert.equal(view.printCalls, 1);
  assert.match(document.querySelector('#detail-print-values').textContent, /인쇄 직전 답변 <script>/u);
  assert.equal(document.querySelector('#detail-print-values').querySelector('script'), null);
});

test('학습일이 없으면 빈 datetime을 제거하고 양 끝 이동 버튼을 숨겨 비활성화한다', () => {
  const { document, page, view } = initFixture();
  const time = document.querySelector('#detail-last-studied');
  const previous = document.querySelector('[data-detail-previous]');
  const next = document.querySelector('[data-detail-next]');
  assert.equal(time.getAttribute('datetime'), null);
  assert.equal(previous.disabled, true);
  assert.equal(previous.hidden, true);
  assert.equal(next.disabled, false);
  page.emit('click', next);
  assert.equal(view.location.href, `./template.html?id=${encodeURIComponent(INTERVIEW_QUESTIONS[1].id)}`);
});
