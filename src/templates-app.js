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
  filterInterviewQuestions,
  replaceQueueQuestion,
  setQueueCompleted,
  setQueuePinned,
} from './interview-core.js';
import {
  loadOrCreateDailyQueue,
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
const INTERVIEW_PAGE_SIZE = 14;

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

function actionButton(document, action, id, text, className = '') {
  const button = document.createElement('button');
  button.type = 'button';
  if (className) button.className = className;
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

function formatQueueDate(date) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/u.exec(date ?? '');
  if (!match) return '';
  return `${match[1]}년 ${Number(match[2])}월 ${Number(match[3])}일`;
}

export function renderInterviewStats(root, stats) {
  setText(root, '[data-interview-stat="total"]', stats.total ?? 0);
  setText(root, '[data-interview-stat="studying"]', stats.studying ?? 0);
  setText(root, '[data-interview-stat="review"]', stats.review ?? 0);
  setText(root, '[data-interview-stat="done"]', stats.done ?? 0);
}

export function paginateInterviewQuestions(questions, page = 1, pageSize = INTERVIEW_PAGE_SIZE) {
  const total = questions.length;
  const normalizedPageSize = Math.max(1, Number.parseInt(pageSize, 10) || INTERVIEW_PAGE_SIZE);
  const pageCount = Math.max(1, Math.ceil(total / normalizedPageSize));
  const normalizedPage = Math.min(Math.max(1, Number.parseInt(page, 10) || 1), pageCount);
  const from = total === 0 ? 0 : ((normalizedPage - 1) * normalizedPageSize) + 1;
  const to = Math.min(normalizedPage * normalizedPageSize, total);

  return {
    items: questions.slice(from - 1, to),
    page: normalizedPage,
    pageCount,
    pageSize: normalizedPageSize,
    total,
    from,
    to,
  };
}

function practicedQuestionCount(questions, state) {
  return questions.filter((question) => {
    const saved = questionStateFor(state, question.id);
    return saved.status !== 'unseen' || Boolean(saved.lastStudiedAt) || Boolean(saved.answer?.trim());
  }).length;
}

function paginationWindow(page, pageCount) {
  return [...new Set([
    1,
    pageCount,
    page - 2,
    page - 1,
    page,
    page + 1,
    page + 2,
  ].filter((pageNumber) => pageNumber >= 1 && pageNumber <= pageCount))]
    .sort((left, right) => left - right);
}

function renderInterviewPagination(root, pagination) {
  const navigation = find(root, '#interview-pagination');
  if (!navigation) return;
  const document = documentFor(navigation);
  const previous = navigation.querySelector?.('[data-interview-page-action="previous"]');
  const next = navigation.querySelector?.('[data-interview-page-action="next"]');
  const pages = find(navigation, '#interview-pagination-pages');
  navigation.hidden = pagination.total === 0;
  if (previous) previous.disabled = pagination.page <= 1;
  if (next) next.disabled = pagination.page >= pagination.pageCount;
  if (!pages) return;

  pages.replaceChildren();
  let previousPage = 0;
  for (const page of paginationWindow(pagination.page, pagination.pageCount)) {
    if (page - previousPage > 1) {
      const ellipsis = document.createElement('span');
      ellipsis.className = 'interview-pagination-ellipsis';
      ellipsis.setAttribute('aria-hidden', 'true');
      ellipsis.textContent = '…';
      pages.append(ellipsis);
    }
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'interview-page-button';
    button.dataset.interviewPage = String(page);
    button.textContent = String(page);
    button.setAttribute('aria-label', `${page}페이지`);
    if (page === pagination.page) button.setAttribute('aria-current', 'page');
    pages.append(button);
    previousPage = page;
  }
}

export function renderInterviewQueue(root, context) {
  const list = find(root, '.interview-queue-list');
  if (!list) return [];
  const document = documentFor(list);
  const { queue, state } = context;
  const completed = new Set(queue.completedIds);
  list.replaceChildren();

  for (const [index, id] of queue.ids.entries()) {
    const question = getInterviewQuestion(id);
    if (!question) continue;
    const saved = questionStateFor(state, id);
    const isCompleted = completed.has(id);
    const card = document.createElement('li');
    card.className = 'interview-queue-card';
    card.dataset.questionId = id;
    card.dataset.status = saved.status;
    if (index === 0) card.classList.add('interview-queue-card--primary');
    if (isCompleted) card.classList.add('interview-queue-card--completed');

    const intro = document.createElement('div');
    intro.className = 'interview-queue-card-intro';
    appendTextElement(
      document,
      intro,
      'p',
      'interview-queue-order',
      index === 0 ? '첫 번째 질문' : `${index + 1}번째 질문`,
    );
    appendTextElement(document, intro, 'p', 'interview-queue-category', question.category);
    card.append(intro);

    const body = document.createElement('div');
    body.className = 'interview-queue-card-body';
    body.append(detailLink(document, question));
    appendTextElement(document, body, 'span', 'interview-status-badge', statusLabel(saved.status));
    card.append(body);

    const actions = document.createElement('div');
    actions.className = 'interview-queue-actions';
    const start = detailLink(document, question);
    start.classList.add('interview-queue-start');
    start.textContent = isCompleted ? '답변 다시 보기' : '답변 시작하기';
    const pin = actionButton(
      document,
      'toggle-pin',
      id,
      saved.queuePinned ? '고정 취소' : '오늘의 큐 고정',
      'interview-queue-action',
    );
    pin.setAttribute('aria-pressed', String(Boolean(saved.queuePinned)));
    const replace = actionButton(document, 'replace-queue', id, '다른 질문', 'interview-queue-action');
    replace.disabled = Boolean(saved.queuePinned) || isCompleted;
    const complete = actionButton(
      document,
      'toggle-complete',
      id,
      isCompleted ? '오늘 완료 취소' : '오늘 완료',
      'interview-complete-today',
    );
    complete.setAttribute('aria-pressed', String(isCompleted));
    const management = document.createElement('details');
    management.className = 'interview-queue-management';
    const managementSummary = document.createElement('summary');
    managementSummary.textContent = '관리';
    const managementMenu = document.createElement('div');
    managementMenu.className = 'interview-queue-management-menu';
    managementMenu.append(pin, replace);
    management.append(managementSummary, managementMenu);
    actions.append(start, complete, management);
    card.append(actions);
    list.append(card);
  }

  const queueRoot = find(root, '#interview-queue') ?? list.parentNode;
  const queueDate = find(queueRoot, '#interview-queue-date');
  if (queueDate) {
    queueDate.textContent = formatQueueDate(queue.date);
    queueDate.setAttribute('datetime', queue.date);
  }
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
  const pagination = paginateInterviewQuestions(filtered, context.page, context.pageSize);
  list.replaceChildren();

  for (const question of pagination.items) {
    const saved = questionStateFor(state, question.id);
    const row = document.createElement('li');
    row.className = 'interview-question-row';
    row.dataset.questionId = question.id;
    row.dataset.status = saved.status;
    if (saved.favorite) row.dataset.favorite = 'true';
    appendTextElement(document, row, 'span', 'interview-question-number', `Q${question.number}`);

    const body = document.createElement('div');
    body.className = 'interview-question-body';
    appendTextElement(document, body, 'span', 'interview-question-category', question.category);
    body.append(detailLink(document, question));
    const meta = document.createElement('p');
    meta.className = 'interview-question-meta';
    appendTextElement(document, meta, 'span', `interview-status-badge interview-status-badge--${saved.status}`, statusLabel(saved.status));
    if (saved.confidence > 0) {
      appendTextElement(document, meta, 'span', 'interview-confidence', `자신감 ${saved.confidence} / 5`);
    }
    if (saved.favorite) appendTextElement(document, meta, 'span', 'interview-favorite-indicator', '★ 즐겨찾기');
    body.append(meta);
    row.append(body);

    const actions = document.createElement('div');
    actions.className = 'interview-question-actions';
    const start = detailLink(document, question);
    start.classList.add('interview-question-start');
    start.textContent = '답변 시작';
    const isQueued = queueIds.has(question.id);
    const add = actionButton(
      document,
      'add-queue',
      question.id,
      isQueued ? '오늘의 큐에 있음' : '오늘의 큐에 추가',
      'interview-add-queue',
    );
    add.setAttribute('aria-disabled', String(isQueued));
    actions.append(start, add);
    row.append(actions);
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
  const practicedCount = practicedQuestionCount(pagination.items, state);
  const range = pagination.total === 0 ? '표시할 문항 없음' : `${pagination.from}–${pagination.to}번`;
  setText(
    root,
    '#interview-page-summary',
    `${range} · ${pagination.page}/${pagination.pageCount}페이지 · 이 페이지 연습 ${practicedCount}문항`,
  );
  renderInterviewPagination(root, pagination);
  return pagination;
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

  let queue = loadOrCreateDailyQueue(
    storage,
    INTERVIEW_QUESTIONS,
    state,
    date,
    validIds,
    now(),
    () => { startupMessage = STORAGE_ERROR_MESSAGE; },
  );
  let currentPage = 1;

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

  if (queue !== queueBeforePinnedSync) {
    try {
      queue = saveInterviewQueue(storage, queue, date, validIds);
    } catch {
      queue = queueBeforePinnedSync;
      startupMessage = STORAGE_ERROR_MESSAGE;
    }
  } else if (pinnedSyncFailed) {
    queue = queueBeforePinnedSync;
  }

  function notify(message) {
    setText(page, '#interview-live', message);
  }

  function stats() {
    return buildInterviewStats(INTERVIEW_QUESTIONS, state);
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
    const pagination = renderInterviewList(page, {
      questions: INTERVIEW_QUESTIONS,
      queue,
      state,
      filters: state.filters,
      page: currentPage,
    });
    currentPage = pagination.page;
    renderFilters();
  }

  function renderList() {
    const pagination = renderInterviewList(page, {
      questions: INTERVIEW_QUESTIONS,
      queue,
      state,
      filters: state.filters,
      page: currentPage,
    });
    currentPage = pagination.page;
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
    currentPage = 1;
    renderList();
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

  function describeActionFocus(button) {
    const descriptor = {
      action: button.dataset.interviewAction,
      questionId: button.dataset.questionId,
      queueIndex: -1,
    };
    if (descriptor.action === 'replace-queue') {
      const card = button.closest?.('.interview-queue-card');
      const queueList = find(page, '.interview-queue-list');
      descriptor.queueIndex = Array.from(queueList?.children ?? []).indexOf(card);
    }
    return descriptor;
  }

  function restoreActionFocus(descriptor) {
    let target = null;
    if (descriptor.action === 'replace-queue' && descriptor.queueIndex >= 0) {
      const queueList = find(page, '.interview-queue-list');
      target = queueList?.children?.[descriptor.queueIndex]
        ?.querySelector?.('[data-interview-action="replace-queue"]') ?? null;
    } else {
      target = Array.from(page.querySelectorAll?.('[data-interview-action]') ?? [])
        .find((candidate) => (
          candidate.dataset.interviewAction === descriptor.action
          && candidate.dataset.questionId === descriptor.questionId
        )) ?? null;
    }
    target?.closest?.('.interview-queue-management')?.setAttribute('open', '');
    target?.focus?.();
  }

  function handleAction(button) {
    if (button.disabled || button.getAttribute('aria-disabled') === 'true') return;
    const id = button.dataset.questionId;
    const action = button.dataset.interviewAction;
    const focus = describeActionFocus(button);
    try {
      if (action === 'add-queue') {
        const candidate = addQuestionToQueue(queue, id, INTERVIEW_QUESTIONS, state, now());
        if (saveQueueOnly(candidate, '오늘의 큐에 추가했습니다.')) restoreActionFocus(focus);
        return;
      }
      if (action === 'replace-queue') {
        const candidate = replaceQueueQuestion(queue, id, INTERVIEW_QUESTIONS, state, now());
        if (saveQueueOnly(candidate, '오늘의 큐 문항을 교체했습니다.')) restoreActionFocus(focus);
        return;
      }
      if (action === 'toggle-pin') {
        const current = questionStateFor(state, id);
        const candidateState = setQueuePinned(state, id, !current.queuePinned, now());
        let candidateQueue = queue;
        if (!current.queuePinned && !queue.ids.includes(id)) {
          candidateQueue = addQuestionToQueue(queue, id, INTERVIEW_QUESTIONS, candidateState, now());
        }
        if (saveStateAndQueue(
          candidateState,
          candidateQueue,
          current.queuePinned ? '고정을 취소했습니다.' : '오늘의 큐에 고정했습니다.',
        )) restoreActionFocus(focus);
        return;
      }
      if (action === 'toggle-complete') {
        const isCompleted = queue.completedIds.includes(id);
        const currentTime = now();
        const candidateQueue = setQueueCompleted(queue, id, !isCompleted, currentTime);
        if (isCompleted) {
          if (saveQueueOnly(candidateQueue, '오늘 완료를 취소했습니다.')) restoreActionFocus(focus);
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
        if (saveStateAndQueue(candidateState, candidateQueue, '오늘 학습을 완료했습니다.')) {
          restoreActionFocus(focus);
        }
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
      return;
    }
    const requestedPage = event.target.closest?.('[data-interview-page]');
    if (requestedPage && page.contains(requestedPage)) {
      currentPage = Number.parseInt(requestedPage.dataset.interviewPage, 10) || 1;
      renderList();
      requestedPage.focus?.();
      return;
    }
    const paginationAction = event.target.closest?.('[data-interview-page-action]');
    if (paginationAction && page.contains(paginationAction) && !paginationAction.disabled) {
      currentPage += paginationAction.dataset.interviewPageAction === 'next' ? 1 : -1;
      renderList();
      const selector = `[data-interview-page-action="${paginationAction.dataset.interviewPageAction}"]`;
      find(page, '#interview-pagination')?.querySelector?.(selector)?.focus?.();
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
