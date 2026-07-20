import test from 'node:test';
import assert from 'node:assert/strict';
import { INTERVIEW_CATEGORIES, INTERVIEW_QUESTIONS } from '../src/interview-data.js';
import { INTERVIEW_STATE_KEY, interviewQueueKey } from '../src/interview-core.js';
import {
  initTemplatesPage,
  statusLabel,
} from '../src/templates-app.js';

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
    this._textContent = '';
    this._id = '';
  }

  set id(value) {
    this._id = String(value);
  }

  get id() {
    return this._id;
  }

  set textContent(value) {
    this._textContent = String(value);
    this.children = [];
  }

  get textContent() {
    return this._textContent + this.children.map((child) => child.textContent).join('');
  }

  get classList() {
    return {
      add: (...names) => {
        const values = new Set(this.className.split(/\s+/u).filter(Boolean));
        names.forEach((name) => values.add(name));
        this.className = [...values].join(' ');
      },
      contains: (name) => this.className.split(/\s+/u).includes(name),
      toggle: (name, force) => {
        const values = new Set(this.className.split(/\s+/u).filter(Boolean));
        const shouldAdd = force ?? !values.has(name);
        if (shouldAdd) values.add(name);
        else values.delete(name);
        this.className = [...values].join(' ');
        return shouldAdd;
      },
    };
  }

  setAttribute(name, value) {
    const normalized = String(value);
    this.attributes.set(name, normalized);
    if (name === 'id') this.id = normalized;
    if (name === 'class') this.className = normalized;
    if (name.startsWith('data-')) {
      const key = name.slice(5).replace(/-([a-z])/gu, (_, letter) => letter.toUpperCase());
      this.dataset[key] = normalized;
    }
  }

  getAttribute(name) {
    if (name === 'id') return this.id || null;
    if (name === 'class') return this.className || null;
    return this.attributes.get(name) ?? null;
  }

  append(...children) {
    for (const child of children) {
      if (typeof child === 'string') {
        const text = new FakeElement('#text', this.ownerDocument);
        text._textContent = child;
        text.parentNode = this;
        this.children.push(text);
      } else {
        child.parentNode = this;
        this.children.push(child);
      }
    }
  }

  appendChild(child) {
    this.append(child);
    return child;
  }

  replaceChildren(...children) {
    if (this.ownerDocument.activeElement && this.contains(this.ownerDocument.activeElement)) {
      this.ownerDocument.activeElement = null;
    }
    this.children.forEach((child) => { child.parentNode = null; });
    this.children = [];
    this._textContent = '';
    this.append(...children);
  }

  focus() {
    this.ownerDocument.activeElement = this;
  }

  addEventListener(type, listener) {
    const listeners = this.listeners.get(type) ?? [];
    listeners.push(listener);
    this.listeners.set(type, listeners);
  }

  removeEventListener(type, listener) {
    const listeners = this.listeners.get(type) ?? [];
    this.listeners.set(type, listeners.filter((candidate) => candidate !== listener));
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

  querySelector(selector) {
    return this.querySelectorAll(selector)[0] ?? null;
  }

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
  if (selector.startsWith('.')) return element.classList.contains(selector.slice(1));
  const data = selector.match(/^\[data-([\w-]+)(?:="([^"]+)")?\]$/u);
  if (data) {
    const key = data[1].replace(/-([a-z])/gu, (_, letter) => letter.toUpperCase());
    return Object.hasOwn(element.dataset, key) && (data[2] === undefined || element.dataset[key] === data[2]);
  }
  return element.tagName.toLowerCase() === selector.toLowerCase();
}

class FakeDocument {
  constructor() {
    this.documentElement = new FakeElement('html', this);
    this.defaultView = null;
    this.activeElement = null;
  }

  createElement(tagName) {
    return new FakeElement(tagName, this);
  }

  getElementById(id) {
    if (this.documentElement.id === id) return this.documentElement;
    return this.documentElement.querySelector(`#${id}`);
  }

  querySelector(selector) {
    return this.documentElement.querySelector(selector);
  }
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

function templatesFixture() {
  const document = new FakeDocument();
  const root = appendElement(document, document.documentElement, 'main', { id: 'templates-page' });
  const stats = appendElement(document, root, 'div', { id: 'interview-stats' });
  for (const key of ['total', 'learning', 'complete', 'favorite']) {
    appendElement(document, stats, 'strong', { data: { interviewStat: key } });
  }
  const queue = appendElement(document, root, 'section', { id: 'interview-queue' });
  appendElement(document, queue, 'div', { className: 'interview-section-heading' });
  appendElement(document, queue, 'ol', { className: 'interview-queue-list' });
  const filters = appendElement(document, root, 'div', { className: 'interview-filters' });
  appendElement(document, filters, 'input', { id: 'interview-search' });
  appendElement(document, filters, 'div', { id: 'interview-category-filters' });
  appendElement(document, filters, 'select', { id: 'interview-status-filter' });
  const favorite = appendElement(document, filters, 'button', { id: 'interview-favorites-only' });
  favorite.setAttribute('aria-pressed', 'false');
  appendElement(document, root, 'p', { id: 'interview-results-count' });
  appendElement(document, root, 'ol', { id: 'interview-list' });
  appendElement(document, root, 'p', { id: 'interview-empty' }).hidden = true;
  appendElement(document, root, 'p', { id: 'interview-live' });

  const timers = [];
  const viewListeners = new Map();
  const view = {
    document,
    localStorage: null,
    location: { reload() {} },
    setTimeout(callback, delay) {
      timers.push({ callback, delay });
      return timers.length;
    },
    clearTimeout() {},
    addEventListener(type, listener) { viewListeners.set(type, listener); },
    removeEventListener(type) { viewListeners.delete(type); },
  };
  document.defaultView = view;
  return { document, root, view, timers };
}

function memoryStorage(entries = {}) {
  const values = new Map(Object.entries(entries));
  let writesBeforeFailure = Infinity;
  return {
    getItem: (key) => values.get(key) ?? null,
    setItem(key, value) {
      if (writesBeforeFailure === 0) throw new Error('quota');
      writesBeforeFailure -= 1;
      values.set(key, value);
    },
    failAfter(writeCount = 0) { writesBeforeFailure = writeCount; },
    allowWrites() { writesBeforeFailure = Infinity; },
    json(key) {
      const value = values.get(key);
      return value ? JSON.parse(value) : null;
    },
  };
}

const FIXED_NOW = new Date('2026-07-20T10:30:00+09:00');
const DATE = '2026-07-20';

function initFixture(entries = {}) {
  const fixture = templatesFixture();
  const storage = memoryStorage(entries);
  fixture.view.localStorage = storage;
  const app = initTemplatesPage(fixture.document, {
    view: fixture.view,
    storage,
    now: () => new Date(FIXED_NOW),
  });
  return { ...fixture, storage, app };
}

function action(root, actionName, questionId) {
  return root.querySelectorAll(`[data-interview-action="${actionName}"]`)
    .find((element) => element.dataset.questionId === questionId);
}

test('면접 상태를 일관된 한국어로 표시한다', () => {
  assert.deepEqual(
    ['unseen', 'studying', 'review', 'done'].map(statusLabel),
    ['미학습', '학습 중', '복습 필요', '완료'],
  );
});

test('초기화하면 전체 문항·공식 카테고리·오늘의 다섯 문항을 원본 순서로 렌더링한다', () => {
  const { document, storage } = initFixture();
  const rows = document.querySelector('#interview-list').children;
  const categories = document.querySelector('#interview-category-filters').children;
  const queueCards = document.querySelector('.interview-queue-list').children;

  assert.equal(rows.length, 152);
  assert.equal(categories.length, 9);
  assert.deepEqual(
    categories.slice(1).map((button) => button.textContent),
    INTERVIEW_CATEGORIES.map(({ label }) => label),
  );
  assert.equal(queueCards.length, 5);
  assert.equal(document.querySelector('#interview-queue-progress').textContent, '오늘 0 / 5 완료');
  assert.match(rows.find((row) => row.dataset.questionId === 'be-5').textContent, /ResponseEntity<T>/u);
  assert.equal(storage.json(interviewQueueKey(DATE)).ids.length, 5);
  assert.equal(document.documentElement.dataset.templatesReady, 'true');
});

test('검색·상태·즐겨찾기 필터를 즉시 조합하고 새로고침용 상태에 보존한다', () => {
  const savedState = {
    version: 1,
    questions: {
      'be-66': { status: 'review', favorite: true },
      'be-95': { status: 'review', favorite: false },
    },
    filters: { query: '', categoryId: 'all', status: 'all', favoritesOnly: false },
  };
  const { document, root, storage } = initFixture({
    [INTERVIEW_STATE_KEY]: JSON.stringify(savedState),
  });
  const search = document.querySelector('#interview-search');
  const status = document.querySelector('#interview-status-filter');
  const favorites = document.querySelector('#interview-favorites-only');

  search.value = 'redis';
  root.emit('input', search);
  assert.equal(document.querySelector('#interview-list').children.length, 2);

  status.value = 'review';
  root.emit('change', status);
  assert.equal(document.querySelector('#interview-list').children.length, 2);

  root.emit('click', favorites);
  assert.equal(document.querySelector('#interview-list').children.length, 1);
  assert.equal(document.querySelector('#interview-list').children[0].dataset.questionId, 'be-66');
  assert.deepEqual(storage.json(INTERVIEW_STATE_KEY).filters, {
    query: 'redis', categoryId: 'all', status: 'review', favoritesOnly: true,
  });
});

test('현재 데이터에 없는 저장 카테고리는 전체로 복구한다', () => {
  const { document, storage } = initFixture({
    [INTERVIEW_STATE_KEY]: JSON.stringify({
      version: 1,
      questions: {},
      filters: { query: '', categoryId: 'removed-category', status: 'all', favoritesOnly: false },
    }),
  });

  assert.equal(storage.json(INTERVIEW_STATE_KEY).filters.categoryId, 'all');
  assert.equal(document.querySelector('#interview-category-filters').children[0].getAttribute('aria-pressed'), 'true');
});

test('저장된 새 고정 문항은 기존 오늘의 큐에 직접 추가 규칙으로 반영한다', () => {
  const queue = {
    date: DATE,
    ids: ['be-1', 'be-3', 'be-4', 'be-5', 'be-6'],
    completedIds: [],
    updatedAt: 'saved',
  };
  const { app, storage } = initFixture({
    [INTERVIEW_STATE_KEY]: JSON.stringify({
      version: 1,
      questions: { 'be-66': { queuePinned: true } },
      filters: {},
    }),
    [interviewQueueKey(DATE)]: JSON.stringify(queue),
  });

  assert.deepEqual(app.getQueue().ids, ['be-1', 'be-3', 'be-4', 'be-5', 'be-66']);
  assert.deepEqual(storage.json(interviewQueueKey(DATE)).ids, app.getQueue().ids);
});

test('큐 카드 고정과 해제를 이벤트 경로로 저장하고 교체 가능 상태를 동기화한다', () => {
  const { document, root, storage, app } = initFixture();
  const beforeQueue = app.getQueue();
  const id = beforeQueue.ids[0];

  root.emit('click', action(root, 'toggle-pin', id));

  assert.deepEqual(app.getQueue(), beforeQueue);
  assert.equal(app.getState().questions[id].queuePinned, true);
  assert.equal(storage.json(INTERVIEW_STATE_KEY).questions[id].queuePinned, true);
  assert.equal(action(root, 'replace-queue', id).disabled, true);
  assert.equal(document.querySelector('#interview-live').textContent, '오늘의 큐에 고정했습니다.');

  root.emit('click', action(root, 'toggle-pin', id));

  assert.deepEqual(app.getQueue(), beforeQueue);
  assert.equal(app.getState().questions[id].queuePinned, false);
  assert.equal(storage.json(INTERVIEW_STATE_KEY).questions[id].queuePinned, false);
  assert.equal(action(root, 'replace-queue', id).disabled, false);
  assert.equal(document.querySelector('#interview-live').textContent, '고정을 취소했습니다.');
});

test('카탈로그 직접 추가 성공은 교체 가능한 마지막 문항을 바꾸고 큐에 저장한다', () => {
  const { document, root, storage, app } = initFixture();
  const beforeState = app.getState();
  const beforeQueue = app.getQueue();

  root.emit('click', action(root, 'add-queue', 'be-66'));

  assert.equal(app.getQueue().ids.length, 5);
  assert.equal(app.getQueue().ids.includes('be-66'), true);
  assert.equal(app.getQueue().ids.includes(beforeQueue.ids.at(-1)), false);
  assert.deepEqual(app.getState(), beforeState);
  assert.deepEqual(storage.json(interviewQueueKey(DATE)).ids, app.getQueue().ids);
  assert.equal(document.querySelector('#interview-live').textContent, '오늘의 큐에 추가했습니다.');
});

test('큐 교체 성공과 고정·완료 카드의 교체 disabled 상태를 이벤트 경로로 반영한다', () => {
  const { root, storage, app } = initFixture();
  const beforeQueue = app.getQueue();
  const replacedId = beforeQueue.ids[0];

  root.emit('click', action(root, 'replace-queue', replacedId));

  const afterReplace = app.getQueue();
  assert.equal(afterReplace.ids.length, 5);
  assert.equal(afterReplace.ids[0] === replacedId, false);
  assert.deepEqual(afterReplace.ids.slice(1), beforeQueue.ids.slice(1));
  assert.equal(new Set(afterReplace.ids).size, 5);
  assert.deepEqual(storage.json(interviewQueueKey(DATE)).ids, afterReplace.ids);

  const pinnedId = afterReplace.ids[0];
  root.emit('click', action(root, 'toggle-pin', pinnedId));
  assert.equal(action(root, 'replace-queue', pinnedId).disabled, true);

  const completedId = afterReplace.ids[1];
  root.emit('click', action(root, 'toggle-complete', completedId));
  assert.equal(action(root, 'replace-queue', completedId).disabled, true);
  const unchanged = app.getQueue();
  root.emit('click', action(root, 'replace-queue', completedId));
  assert.deepEqual(app.getQueue(), unchanged);
});

test('오늘 완료와 취소는 전역 상태를 바꾸지 않고 마지막 학습 시각만 유지한다', () => {
  const { document, root, app } = initFixture();
  const id = app.getQueue().ids[0];
  const complete = action(root, 'toggle-complete', id);

  root.emit('click', complete);
  assert.deepEqual(app.getQueue().completedIds, [id]);
  assert.equal(app.getState().questions[id].status, 'unseen');
  assert.equal(app.getState().questions[id].lastStudiedAt, FIXED_NOW.toISOString());
  assert.equal(document.querySelector('#interview-queue-progress').textContent, '오늘 1 / 5 완료');

  root.emit('click', action(root, 'toggle-complete', id));
  assert.deepEqual(app.getQueue().completedIds, []);
  assert.equal(app.getState().questions[id].lastStudiedAt, FIXED_NOW.toISOString());
});

test('저장 실패는 상태·큐·검색 입력을 직전 화면대로 유지하고 접근성 알림을 남긴다', () => {
  const { document, root, storage, app } = initFixture();
  const search = document.querySelector('#interview-search');
  search.value = 'redis';
  root.emit('input', search);
  const beforeState = app.getState();
  const beforeQueue = app.getQueue();
  const id = beforeQueue.ids[0];

  storage.failAfter(1);
  root.emit('click', action(root, 'toggle-complete', id));

  assert.deepEqual(app.getState(), beforeState);
  assert.deepEqual(app.getQueue(), beforeQueue);
  assert.equal(search.value, 'redis');
  assert.equal(
    document.querySelector('#interview-live').textContent,
    '저장하지 못했습니다. 브라우저 저장 공간을 확인해 주세요.',
  );
});

test('직접 추가가 불가능하면 큐를 유지하고 코어 이유를 live region으로 알린다', () => {
  const completedQueue = {
    date: DATE,
    ids: ['be-1', 'be-3', 'be-4', 'be-5', 'be-6'],
    completedIds: ['be-1', 'be-3', 'be-4', 'be-5', 'be-6'],
    updatedAt: 'saved',
  };
  const { document, root, app } = initFixture({
    [interviewQueueKey(DATE)]: JSON.stringify(completedQueue),
  });
  const beforeState = app.getState();
  const beforeQueue = app.getQueue();

  root.emit('click', action(root, 'add-queue', 'be-66'));

  assert.deepEqual(app.getState(), beforeState);
  assert.deepEqual(app.getQueue(), beforeQueue);
  assert.equal(document.querySelector('#interview-live').textContent, '오늘의 큐에 교체 가능한 질문이 없습니다.');
});

test('카테고리를 선택하면 활성 버튼 포커스를 유지하고 다른 필터 포커스를 빼앗지 않는다', () => {
  const { document, root } = initFixture();
  const category = root.querySelectorAll('[data-interview-category-id]')
    .find((button) => button.dataset.interviewCategoryId === 'distributed-cache');
  category.focus();

  root.emit('click', category);

  assert.equal(document.activeElement, category);
  assert.equal(document.activeElement.getAttribute('aria-pressed'), 'true');

  const search = document.querySelector('#interview-search');
  search.focus();
  search.value = 'redis';
  root.emit('input', search);
  assert.equal(document.activeElement, search);

  const status = document.querySelector('#interview-status-filter');
  status.focus();
  status.value = 'review';
  root.emit('change', status);
  assert.equal(document.activeElement, status);

  const favorites = document.querySelector('#interview-favorites-only');
  favorites.focus();
  root.emit('click', favorites);
  assert.equal(document.activeElement, favorites);
});
