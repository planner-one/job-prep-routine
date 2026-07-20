import {
  INTERVIEW_CATEGORIES,
  INTERVIEW_QUESTIONS,
  getInterviewQuestion,
} from './interview-data.js';
import {
  addQuestionToQueue,
  buildInterviewStats,
  createEmptyInterviewState,
  createEmptyQuestionState,
  ensureDailyQueue,
  filterInterviewQuestions,
  replaceQueueQuestion,
  setQueueCompleted,
  setQueuePinned,
} from './interview-core.js';
import {
  loadInterviewQueue,
  loadInterviewState,
  saveInterviewQueue,
  saveInterviewState,
} from './interview-storage.js';
import {
  logicalDateString,
  scheduleLogicalDayRollover,
} from './routine-core.js';

const STATUS_LABELS = Object.freeze({
  unseen: '미학습',
  studying: '학습 중',
  review: '복습 필요',
  done: '완료',
});
const STATUS_FILTERS = Object.freeze([
  ['all', '전체 상태'],
  ['unseen', '미학습'],
  ['studying', '학습 중'],
  ['review', '복습 필요'],
  ['done', '완료'],
]);
const STORAGE_ERROR_MESSAGE = '저장하지 못했습니다. 브라우저 저장 공간을 확인해 주세요.';

function find(root, selector) {
  if (!root) return null;
  if (root.matches?.(selector)) return root;
  if (selector.startsWith('#') && root.id === selector.slice(1)) return root;
  return root.querySelector?.(selector) ?? null;
}

function documentFor(root) {
  return root?.ownerDocument ?? root;
}

function setText(root, selector, value) {
  const element = find(root, selector);
  if (element) element.textContent = String(value);
}

function appendTextElement(document, parent, tagName, className, text) {
  const element = document.createElement(tagName);
  if (className) element.className = className;
  element.textContent = text;
  parent.append(element);
  return element;
}

function actionButton(document, action, id, text) {
  const button = document.createElement('button');
  button.type = 'button';
  button.dataset.interviewAction = action;
  button.dataset.questionId = id;
  button.textContent = text;
  return button;
}

function detailLink(document, question) {
  const link = document.createElement('a');
  link.className = 'interview-question-link';
  link.href = `./template.html?id=${encodeURIComponent(question.id)}`;
  link.textContent = question.title;
  return link;
}

function questionStateFor(state, id) {
  return state?.questions?.[id] ?? createEmptyQuestionState();
}

export function statusLabel(status) {
  return STATUS_LABELS[status] ?? STATUS_LABELS.unseen;
}

export function renderInterviewStats(root, stats) {
  const learning = stats.learning ?? ((stats.studying ?? 0) + (stats.review ?? 0));
  const complete = stats.complete ?? stats.done ?? 0;
  setText(root, '[data-interview-stat="total"]', stats.total ?? 0);
  setText(root, '[data-interview-stat="learning"]', learning);
  setText(root, '[data-interview-stat="complete"]', complete);
  setText(root, '[data-interview-stat="favorite"]', stats.favorite ?? 0);
}

export function renderInterviewQueue(root, context) {
  const list = find(root, '.interview-queue-list');
  if (!list) return [];
  const document = documentFor(list);
  const { queue, state } = context;
  const completed = new Set(queue.completedIds);
  list.replaceChildren();

  for (const id of queue.ids) {
    const question = getInterviewQuestion(id);
    if (!question) continue;
    const saved = questionStateFor(state, id);
    const isCompleted = completed.has(id);
    const card = document.createElement('li');
    card.className = 'interview-queue-card';
    card.dataset.questionId = id;
    if (isCompleted) card.classList.add('interview-queue-card--completed');

    appendTextElement(document, card, 'p', 'interview-queue-category', question.category);
    card.append(detailLink(document, question));
    appendTextElement(document, card, 'p', 'interview-queue-status', statusLabel(saved.status));

    const actions = document.createElement('div');
    actions.className = 'interview-queue-actions';
    const pin = actionButton(
      document,
      'toggle-pin',
      id,
      saved.queuePinned ? '고정 취소' : '오늘의 큐 고정',
    );
    pin.setAttribute('aria-pressed', String(Boolean(saved.queuePinned)));
    const replace = actionButton(document, 'replace-queue', id, '교체');
    replace.disabled = Boolean(saved.queuePinned) || isCompleted;
    const complete = actionButton(
      document,
      'toggle-complete',
      id,
      isCompleted ? '오늘 완료 취소' : '오늘 완료',
    );
    complete.className = 'interview-complete-today';
    complete.setAttribute('aria-pressed', String(isCompleted));
    actions.append(pin, replace, complete);
    card.append(actions);
    list.append(card);
  }

  const queueRoot = find(root, '#interview-queue') ?? list.parentNode;
  let progress = find(queueRoot, '#interview-queue-progress');
  if (!progress) {
    progress = document.createElement('p');
    progress.id = 'interview-queue-progress';
    progress.className = 'interview-queue-progress';
    const heading = find(queueRoot, '.interview-section-heading');
    (heading ?? queueRoot).append(progress);
  }
  progress.textContent = `오늘 ${queue.completedIds.length} / ${queue.ids.length} 완료`;
  return [...queue.ids];
}

export function renderInterviewList(root, context) {
  const list = find(root, '#interview-list');
  if (!list) return [];
  const document = documentFor(list);
  const questions = context.questions ?? INTERVIEW_QUESTIONS;
  const state = context.state;
  const filters = context.filters ?? state?.filters;
  const queueIds = new Set(context.queue?.ids ?? []);
  const filtered = filterInterviewQuestions(questions, state, filters);
  list.replaceChildren();

  for (const question of filtered) {
    const saved = questionStateFor(state, question.id);
    const row = document.createElement('li');
    row.className = 'interview-question-row';
    row.dataset.questionId = question.id;
    appendTextElement(document, row, 'span', 'interview-question-number', `${question.number}`);

    const body = document.createElement('div');
    body.className = 'interview-question-body';
    body.append(detailLink(document, question));
    const meta = document.createElement('p');
    meta.className = 'interview-question-meta';
    appendTextElement(document, meta, 'span', '', question.category);
    appendTextElement(document, meta, 'span', '', statusLabel(saved.status));
    appendTextElement(
      document,
      meta,
      'span',
      '',
      saved.confidence > 0 ? `${saved.confidence} / 5` : '미선택',
    );
    appendTextElement(
      document,
      meta,
      'span',
      'interview-favorite-indicator',
      saved.favorite ? '★ 즐겨찾기' : '☆ 즐겨찾기 아님',
    );
    body.append(meta);
    row.append(body);

    const add = actionButton(document, 'add-queue', question.id, '오늘의 큐에 추가');
    add.disabled = queueIds.has(question.id);
    row.append(add);
    list.append(row);
  }

  const empty = find(root, '#interview-empty');
  if (empty) empty.hidden = filtered.length !== 0;
  const hasFilters = Boolean(
    filters?.query
      || (filters?.categoryId && filters.categoryId !== 'all')
      || (filters?.status && filters.status !== 'all')
      || filters?.favoritesOnly,
  );
  setText(
    root,
    '#interview-results-count',
    hasFilters ? `조건에 맞는 ${filtered.length}문항` : `전체 ${filtered.length}문항`,
  );
  return filtered;
}

function renderCategoryFilters(root, categories, selectedId, total) {
  const container = find(root, '#interview-category-filters');
  if (!container) return;
  const document = documentFor(container);
  const options = [{ id: 'all', label: '전체', count: total }, ...categories];
  const currentButtons = Array.from(container.querySelectorAll('[data-interview-category-id]'));
  const canReuseButtons = currentButtons.length === options.length
    && currentButtons.every((button, index) => button.dataset.interviewCategoryId === options[index].id);
  if (canReuseButtons) {
    currentButtons.forEach((button, index) => {
      button.textContent = options[index].label;
      button.setAttribute('aria-pressed', String(options[index].id === selectedId));
    });
    return;
  }

  container.replaceChildren();
  for (const category of options) {
    const button = document.createElement('button');
    button.type = 'button';
    button.dataset.interviewCategoryId = category.id;
    button.textContent = category.label;
    button.setAttribute('aria-pressed', String(category.id === selectedId));
    container.append(button);
  }
}

function renderStatusFilters(root, selectedStatus) {
  const select = find(root, '#interview-status-filter');
  if (!select) return;
  const document = documentFor(select);
  select.replaceChildren();
  for (const [value, label] of STATUS_FILTERS) {
    const option = document.createElement('option');
    option.value = value;
    option.textContent = label;
    select.append(option);
  }
  select.value = selectedStatus;
}

function clone(value) {
  return typeof structuredClone === 'function'
    ? structuredClone(value)
    : JSON.parse(JSON.stringify(value));
}

export function initTemplatesPage(root = document, options = {}) {
  const page = root?.getElementById?.('templates-page')
    ?? (root?.id === 'templates-page' ? root : root?.querySelector?.('#templates-page'));
  if (!page) return null;
  const pageDocument = documentFor(page);
  const view = options.view
    ?? pageDocument.defaultView
    ?? (typeof window !== 'undefined' ? window : null);
  const storage = options.storage ?? view?.localStorage;
  const now = options.now ?? (() => new Date());
  const date = logicalDateString(now());
  const validIds = new Set(INTERVIEW_QUESTIONS.map(({ id }) => id));
  const categoryIds = new Set(INTERVIEW_CATEGORIES.map(({ id }) => id));
  let startupMessage = '';

  let state;
  try {
    state = loadInterviewState(storage, validIds);
  } catch {
    state = createEmptyInterviewState();
    startupMessage = STORAGE_ERROR_MESSAGE;
  }

  if (state.filters.categoryId !== 'all' && !categoryIds.has(state.filters.categoryId)) {
    const recovered = {
      ...state,
      filters: { ...state.filters, categoryId: 'all' },
    };
    try {
      state = saveInterviewState(storage, recovered, validIds);
    } catch {
      state = recovered;
      startupMessage = STORAGE_ERROR_MESSAGE;
    }
  }

  let queue;
  let queueWasGenerated = false;
  try {
    queue = loadInterviewQueue(storage, date, validIds);
  } catch {
    queue = ensureDailyQueue(INTERVIEW_QUESTIONS, state, null, date, now());
    queueWasGenerated = true;
    startupMessage = STORAGE_ERROR_MESSAGE;
  }
  if (queue.ids.length === 0 && queue.updatedAt === null) {
    queue = ensureDailyQueue(INTERVIEW_QUESTIONS, state, null, date, now());
    queueWasGenerated = true;
  }

  const queueBeforePinnedSync = queue;
  let pinnedSyncFailed = false;
  try {
    for (const question of INTERVIEW_QUESTIONS) {
      if (state.questions[question.id]?.queuePinned && !queue.ids.includes(question.id)) {
        queue = addQuestionToQueue(queue, question.id, INTERVIEW_QUESTIONS, state, now());
      }
    }
  } catch (error) {
    queue = queueBeforePinnedSync;
    pinnedSyncFailed = true;
    startupMessage = error instanceof RangeError ? error.message : STORAGE_ERROR_MESSAGE;
  }

  if (queueWasGenerated || queue !== queueBeforePinnedSync) {
    const previousQueue = queueWasGenerated ? null : queueBeforePinnedSync;
    try {
      queue = saveInterviewQueue(storage, queue, date, validIds);
    } catch {
      if (previousQueue) queue = previousQueue;
      startupMessage = STORAGE_ERROR_MESSAGE;
    }
  } else if (pinnedSyncFailed) {
    queue = queueBeforePinnedSync;
  }

  function notify(message) {
    setText(page, '#interview-live', message);
  }

  function stats() {
    return {
      ...buildInterviewStats(INTERVIEW_QUESTIONS, state),
      favorite: INTERVIEW_QUESTIONS.filter(({ id }) => Boolean(state.questions[id]?.favorite)).length,
    };
  }

  function renderFilters() {
    const search = find(page, '#interview-search');
    const status = find(page, '#interview-status-filter');
    const favorites = find(page, '#interview-favorites-only');
    if (search) search.value = state.filters.query;
    if (status) status.value = state.filters.status;
    if (favorites) favorites.setAttribute('aria-pressed', String(state.filters.favoritesOnly));
    renderCategoryFilters(page, INTERVIEW_CATEGORIES, state.filters.categoryId, INTERVIEW_QUESTIONS.length);
  }

  function renderAll() {
    renderInterviewStats(page, stats());
    renderInterviewQueue(page, { queue, state });
    renderInterviewList(page, {
      questions: INTERVIEW_QUESTIONS,
      queue,
      state,
      filters: state.filters,
    });
    renderFilters();
  }

  function persistFilters(nextFilters) {
    const candidate = { ...state, filters: nextFilters };
    try {
      state = saveInterviewState(storage, candidate, validIds);
      notify('필터를 저장했습니다.');
    } catch {
      state = candidate;
      notify(STORAGE_ERROR_MESSAGE);
    }
    renderInterviewList(page, {
      questions: INTERVIEW_QUESTIONS,
      queue,
      state,
      filters: state.filters,
    });
    renderFilters();
  }

  function saveQueueOnly(candidate, successMessage) {
    try {
      queue = saveInterviewQueue(storage, candidate, date, validIds);
      renderAll();
      notify(successMessage);
      return true;
    } catch (error) {
      notify(error instanceof RangeError ? error.message : STORAGE_ERROR_MESSAGE);
      return false;
    }
  }

  function saveStateAndQueue(candidateState, candidateQueue, successMessage) {
    const previousState = state;
    const previousQueue = queue;
    try {
      const savedState = saveInterviewState(storage, candidateState, validIds);
      const savedQueue = saveInterviewQueue(storage, candidateQueue, date, validIds);
      state = savedState;
      queue = savedQueue;
      renderAll();
      notify(successMessage);
      return true;
    } catch (error) {
      try {
        saveInterviewState(storage, previousState, validIds);
        saveInterviewQueue(storage, previousQueue, date, validIds);
      } catch {
        // 저장소 자체가 쓰기 불가인 동안에도 화면 상태는 직전 스냅샷을 유지한다.
      }
      state = previousState;
      queue = previousQueue;
      notify(error instanceof RangeError ? error.message : STORAGE_ERROR_MESSAGE);
      return false;
    }
  }

  function handleAction(button) {
    if (button.disabled) return;
    const id = button.dataset.questionId;
    const action = button.dataset.interviewAction;
    try {
      if (action === 'add-queue') {
        const candidate = addQuestionToQueue(queue, id, INTERVIEW_QUESTIONS, state, now());
        saveQueueOnly(candidate, '오늘의 큐에 추가했습니다.');
        return;
      }
      if (action === 'replace-queue') {
        const candidate = replaceQueueQuestion(queue, id, INTERVIEW_QUESTIONS, state, now());
        saveQueueOnly(candidate, '오늘의 큐 문항을 교체했습니다.');
        return;
      }
      if (action === 'toggle-pin') {
        const current = questionStateFor(state, id);
        const candidateState = setQueuePinned(state, id, !current.queuePinned, now());
        let candidateQueue = queue;
        if (!current.queuePinned && !queue.ids.includes(id)) {
          candidateQueue = addQuestionToQueue(queue, id, INTERVIEW_QUESTIONS, candidateState, now());
        }
        saveStateAndQueue(candidateState, candidateQueue, current.queuePinned ? '고정을 취소했습니다.' : '오늘의 큐에 고정했습니다.');
        return;
      }
      if (action === 'toggle-complete') {
        const isCompleted = queue.completedIds.includes(id);
        const currentTime = now();
        const candidateQueue = setQueueCompleted(queue, id, !isCompleted, currentTime);
        if (isCompleted) {
          saveQueueOnly(candidateQueue, '오늘 완료를 취소했습니다.');
          return;
        }
        const current = questionStateFor(state, id);
        const candidateState = {
          ...state,
          questions: {
            ...state.questions,
            [id]: { ...current, lastStudiedAt: currentTime.toISOString() },
          },
        };
        saveStateAndQueue(candidateState, candidateQueue, '오늘 학습을 완료했습니다.');
      }
    } catch (error) {
      notify(error instanceof RangeError ? error.message : STORAGE_ERROR_MESSAGE);
    }
  }

  function handleClick(event) {
    const action = event.target.closest?.('[data-interview-action]');
    if (action && page.contains(action)) {
      handleAction(action);
      return;
    }
    const category = event.target.closest?.('[data-interview-category-id]');
    if (category && page.contains(category)) {
      persistFilters({ ...state.filters, categoryId: category.dataset.interviewCategoryId });
      return;
    }
    const favorites = event.target.closest?.('#interview-favorites-only');
    if (favorites && page.contains(favorites)) {
      persistFilters({ ...state.filters, favoritesOnly: !state.filters.favoritesOnly });
    }
  }

  function handleInput(event) {
    if (event.target.id !== 'interview-search') return;
    persistFilters({ ...state.filters, query: event.target.value });
  }

  function handleChange(event) {
    if (event.target.id !== 'interview-status-filter') return;
    const status = STATUS_FILTERS.some(([value]) => value === event.target.value)
      ? event.target.value
      : 'all';
    persistFilters({ ...state.filters, status });
  }

  page.addEventListener('click', handleClick);
  page.addEventListener('input', handleInput);
  page.addEventListener('change', handleChange);
  renderStatusFilters(page, state.filters.status);
  renderAll();
  if (startupMessage) notify(startupMessage);
  const cancelRollover = view?.setTimeout
    ? scheduleLogicalDayRollover(view, date, now)
    : () => {};
  pageDocument.documentElement.dataset.templatesReady = 'true';

  return {
    getDate: () => date,
    getState: () => clone(state),
    getQueue: () => clone(queue),
    refresh: renderAll,
    destroy() {
      cancelRollover();
      page.removeEventListener('click', handleClick);
      page.removeEventListener('input', handleInput);
      page.removeEventListener('change', handleChange);
      delete pageDocument.documentElement.dataset.templatesReady;
    },
  };
}

if (typeof document !== 'undefined') initTemplatesPage(document);
