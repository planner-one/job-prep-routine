import {
  INTERVIEW_CATEGORIES as CONTENT_CATEGORIES,
  INTERVIEW_QUESTIONS as CONTENTS,
} from './interview-data.js';
import {
  addItemToReadingPlan,
  buildReadingStats,
  createEmptyReadingState,
  ensureDailyReadingPlan,
  filterReadingQuestions,
  markReadingItemRead,
  removeItemFromReadingPlan,
  replaceReadingPlanItem,
  setReadingCompleted,
  setReadingFilters,
} from './reading-core.js';
import {
  loadReadingPlan,
  loadReadingState,
  saveReadingPlan,
  saveReadingState,
} from './reading-storage.js';
import { logicalDateString, scheduleLogicalDayRollover } from './routine-core.js';

const SAVE_ERROR = '읽기 기록을 저장하지 못했습니다. 현재 화면에서는 계속 사용할 수 있어요.';
const READING_PAGE_SIZES = Object.freeze([6, 10, 14]);
const DEFAULT_READING_PAGE_SIZE = 6;
const READING_PAGE_SIZE_KEY = 'job-prep-routine:maeil-reader:v1:page-size';
const READING_VIEW_HISTORY_KEY = 'readingListView';
const DEFAULT_READING_VIEW_FILTERS = Object.freeze({
  query: '',
  category: 'all',
  progress: 'all',
});
const READING_PROGRESS_FILTERS = new Set(['all', 'unread', 'read']);

function find(root, selector) {
  if (!root) return null;
  if (root.matches?.(selector)) return root;
  return root.querySelector?.(selector) ?? null;
}

function documentFor(root) {
  return root?.ownerDocument ?? root;
}

export function normalizeReadingPageSize(value) {
  const parsed = Number.parseInt(value, 10);
  return READING_PAGE_SIZES.includes(parsed) ? parsed : DEFAULT_READING_PAGE_SIZE;
}

export function readingNavigationType(performanceObject) {
  try {
    const [navigation] = performanceObject?.getEntriesByType?.('navigation') ?? [];
    if (typeof navigation?.type === 'string') return navigation.type;
    if (performanceObject?.navigation?.type === 2) return 'back_forward';
    if (performanceObject?.navigation?.type === 1) return 'reload';
  } catch {
    return 'navigate';
  }
  return 'navigate';
}

export function normalizeReadingViewSnapshot(candidate) {
  if (!candidate || typeof candidate !== 'object' || Array.isArray(candidate)) return null;
  const filters = candidate.filters && typeof candidate.filters === 'object'
    ? candidate.filters
    : {};
  const currentPage = Number.parseInt(candidate.currentPage, 10);
  const scrollY = Number(candidate.scrollY);
  return {
    filters: {
      query: typeof filters.query === 'string' ? filters.query : '',
      category: typeof filters.category === 'string' ? filters.category : 'all',
      progress: READING_PROGRESS_FILTERS.has(filters.progress) ? filters.progress : 'all',
    },
    currentPage: Number.isInteger(currentPage) && currentPage > 0 ? currentPage : 1,
    scrollY: Number.isFinite(scrollY) && scrollY >= 0 ? scrollY : 0,
  };
}

function loadReadingPageSize(storage) {
  try {
    return normalizeReadingPageSize(storage?.getItem?.(READING_PAGE_SIZE_KEY));
  } catch {
    return DEFAULT_READING_PAGE_SIZE;
  }
}

function saveReadingPageSize(storage, pageSize) {
  const normalized = normalizeReadingPageSize(pageSize);
  storage?.setItem?.(READING_PAGE_SIZE_KEY, String(normalized));
  return normalized;
}

function questionMap(questions) {
  return new Map(questions.map((question) => [question.id, question]));
}

function formatLogicalDate(date) {
  const [year, month, day] = String(date).split('-').map(Number);
  if (![year, month, day].every(Number.isInteger)) return date;
  return new Intl.DateTimeFormat('ko-KR', {
    month: 'long',
    day: 'numeric',
    weekday: 'short',
  }).format(new Date(year, month - 1, day, 12));
}

function contentLink(document, question, className = '') {
  const link = document.createElement('a');
  link.href = `./content.html?id=${encodeURIComponent(question.id)}`;
  link.className = className;
  link.textContent = question.title;
  return link;
}

function actionButton(document, action, id, label, className = '') {
  const button = document.createElement('button');
  button.type = 'button';
  button.dataset.readingAction = action;
  button.dataset.contentId = id;
  button.className = className;
  button.textContent = label;
  return button;
}

function elementWithDataset(container, selector, key, value) {
  return Array.from(container?.querySelectorAll?.(selector) ?? [])
    .find((element) => element.dataset?.[key] === String(value)) ?? null;
}

function itemWithContentId(container, id) {
  return Array.from(container?.children ?? [])
    .find((item) => item.dataset?.contentId === id) ?? null;
}

function actionInItem(item, action) {
  return elementWithDataset(item, '[data-reading-action]', 'readingAction', action);
}

function describeReadingFocus(page, target) {
  const category = target?.closest?.('[data-reading-category]');
  if (category && page.contains(category)) {
    return { kind: 'category', categoryId: category.dataset.readingCategory };
  }

  const pagination = target?.closest?.('[data-reading-page]');
  if (pagination && page.contains(pagination)) {
    return {
      kind: 'page',
      pageNumber: pagination.dataset.readingPage,
      label: pagination.textContent,
      paginationId: pagination.closest?.('.reader-pagination')?.id ?? '',
    };
  }

  const action = target?.closest?.('[data-reading-action]');
  if (!action || !page.contains(action)) return null;
  const todayList = find(page, '#reading-today-list');
  const todayItem = action.closest?.('.reader-today-item');
  const todayIndex = todayItem && todayList?.contains(todayItem)
    ? Array.from(todayList.children).indexOf(todayItem)
    : -1;
  return {
    kind: 'action',
    action: action.dataset.readingAction,
    id: action.dataset.contentId,
    todayIndex,
  };
}

function restoreReadingFocus(page, descriptor, plan) {
  if (!descriptor) return;
  let target = null;

  if (descriptor.kind === 'category') {
    target = elementWithDataset(
      find(page, '#reading-category-list'),
      '[data-reading-category]',
      'readingCategory',
      descriptor.categoryId,
    );
  } else if (descriptor.kind === 'page') {
    const pagination = find(page, descriptor.paginationId ? `#${descriptor.paginationId}` : '#reading-pagination')
      ?? find(page, '#reading-pagination');
    const buttons = Array.from(pagination?.querySelectorAll?.('[data-reading-page]') ?? []);
    target = buttons.find((button) => (
      button.dataset.readingPage === descriptor.pageNumber
      && button.textContent === descriptor.label
      && !button.disabled
    )) ?? buttons.find((button) => (
      button.dataset.readingPage === descriptor.pageNumber
      && button.textContent === descriptor.pageNumber
    ));
  } else if (descriptor.kind === 'action') {
    const todayList = find(page, '#reading-today-list');
    const catalog = find(page, '#reading-list');
    if (descriptor.action === 'add') {
      const item = itemWithContentId(todayList, descriptor.id);
      target = actionInItem(item, 'toggle-completed') ?? item?.querySelector?.('.reader-today-link');
    } else if (descriptor.action === 'remove') {
      const item = itemWithContentId(catalog, descriptor.id);
      target = actionInItem(item, 'add') ?? item?.querySelector?.('.reader-file-link');
    } else if (descriptor.action === 'replace') {
      const replacementId = descriptor.todayIndex >= 0 ? plan.ids[descriptor.todayIndex] : null;
      const item = replacementId ? itemWithContentId(todayList, replacementId) : null;
      target = actionInItem(item, 'replace') ?? item?.querySelector?.('.reader-today-link');
    } else if (descriptor.action === 'toggle-completed') {
      target = actionInItem(itemWithContentId(todayList, descriptor.id), 'toggle-completed');
    }
  }

  (target ?? find(page, '#reading-search'))?.focus?.({ preventScroll: true });
}

function renderCategories(page, categories, selected, total) {
  const container = find(page, '#reading-category-list');
  if (!container) return;
  const document = documentFor(container);
  const options = [{ id: 'all', label: '전체 콘텐츠', count: total }, ...categories];
  const fragment = document.createDocumentFragment();

  for (const category of options) {
    const button = document.createElement('button');
    button.type = 'button';
    button.dataset.readingCategory = category.id;
    button.setAttribute('aria-pressed', String(selected === category.id));
    const label = document.createElement('span');
    label.textContent = category.label;
    const count = document.createElement('span');
    count.textContent = String(category.count);
    button.append(label, count);
    fragment.append(button);
  }
  container.replaceChildren(fragment);
}

export function renderTodayReadingList(page, questions, state, plan) {
  const list = find(page, '#reading-today-list');
  if (!list) return [];
  const document = documentFor(list);
  const byId = questionMap(questions);
  const completed = new Set(plan.completedIds);
  const renderedIds = [];
  const fragment = document.createDocumentFragment();

  plan.ids.forEach((id, index) => {
    const question = byId.get(id);
    if (!question) return;
    renderedIds.push(id);
    const item = document.createElement('li');
    item.className = 'reader-today-item';
    item.dataset.contentId = id;
    item.dataset.completed = String(completed.has(id));

    const sequence = document.createElement('span');
    sequence.className = 'reader-today-sequence';
    sequence.textContent = String(index + 1).padStart(2, '0');

    const body = document.createElement('div');
    body.className = 'reader-today-item-body';
    body.append(contentLink(document, question, 'reader-today-link'));
    const meta = document.createElement('p');
    meta.textContent = `${question.id}.md · ${question.category}`;
    body.append(meta);

    const controls = document.createElement('div');
    controls.className = 'reader-today-item-actions screen-only';
    const done = actionButton(
      document,
      'toggle-completed',
      id,
      completed.has(id) ? '오늘 완료 취소' : '읽음',
      'reader-complete-button',
    );
    done.setAttribute('aria-pressed', String(completed.has(id)));
    const replace = actionButton(document, 'replace', id, '다른 글');
    replace.disabled = completed.has(id);
    const remove = actionButton(document, 'remove', id, '빼기');
    controls.append(done, replace, remove);

    item.append(sequence, body, controls);
    fragment.append(item);
  });

  list.replaceChildren(fragment);
  const readCount = plan.completedIds.filter((id) => plan.ids.includes(id)).length;
  const remaining = Math.max(0, plan.ids.length - readCount);
  const progress = find(page, '#reading-today-progress');
  if (progress) {
    progress.textContent = `읽은 글 ${readCount}개 · 남은 글 ${remaining}개 · 오늘 목록 ${plan.ids.length}개`;
  }
  return renderedIds;
}

function renderPaginationControl(pagination, currentPage, totalPages) {
  const document = documentFor(pagination);
  pagination.replaceChildren();
  pagination.hidden = totalPages <= 1;
  if (totalPages <= 1) return;
  const fragment = document.createDocumentFragment();
  const addButton = (label, pageNumber, disabled = false) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.dataset.readingPage = String(pageNumber);
    button.textContent = label;
    button.disabled = disabled;
    if (/^\d+$/.test(label)) {
      button.setAttribute('aria-label', `${label}페이지`);
      button.setAttribute('aria-current', pageNumber === currentPage ? 'page' : 'false');
    }
    fragment.append(button);
  };
  addButton('‹ 이전', Math.max(1, currentPage - 1), currentPage === 1);
  const visiblePages = new Set([
    1,
    totalPages,
    currentPage - 2,
    currentPage - 1,
    currentPage,
    currentPage + 1,
    currentPage + 2,
  ].filter((pageNumber) => pageNumber >= 1 && pageNumber <= totalPages));
  let previousPage = 0;
  for (const pageNumber of [...visiblePages].sort((left, right) => left - right)) {
    if (pageNumber - previousPage > 1) {
      const ellipsis = document.createElement('span');
      ellipsis.className = 'reader-pagination-ellipsis';
      ellipsis.setAttribute('aria-hidden', 'true');
      ellipsis.textContent = '…';
      fragment.append(ellipsis);
    }
    addButton(String(pageNumber), pageNumber);
    previousPage = pageNumber;
  }
  addButton('다음 ›', Math.min(totalPages, currentPage + 1), currentPage === totalPages);
  pagination.append(fragment);
}

function renderPagination(page, currentPage, totalPages) {
  const pagination = find(page, '#reading-pagination');
  if (pagination) renderPaginationControl(pagination, currentPage, totalPages);
}

function scrollReadingArchive(page, view) {
  const repository = find(page, '.reader-repository');
  if (!repository?.scrollIntoView) return;
  const reducedMotion = view?.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches === true;
  repository.scrollIntoView({
    block: 'start',
    behavior: reducedMotion ? 'auto' : 'smooth',
  });
}

export function renderReadingCatalog(
  page,
  questions,
  categories,
  state,
  plan,
  currentPage = 1,
  pageSize = DEFAULT_READING_PAGE_SIZE,
) {
  const list = find(page, '#reading-list');
  if (!list) return [];
  const document = documentFor(list);
  const normalizedPageSize = normalizeReadingPageSize(pageSize);
  const filtered = filterReadingQuestions(questions, state, state.filters);
  const totalPages = Math.max(1, Math.ceil(filtered.length / normalizedPageSize));
  const safePage = Math.min(Math.max(1, currentPage), totalPages);
  const visible = filtered.slice(
    (safePage - 1) * normalizedPageSize,
    safePage * normalizedPageSize,
  );
  const planned = new Set(plan.ids);
  const fragment = document.createDocumentFragment();

  for (const question of visible) {
    const read = typeof state.items?.[question.id]?.readAt === 'string';
    const row = document.createElement('li');
    row.className = 'reader-file-row';
    row.dataset.contentId = question.id;
    row.dataset.read = String(read);

    const file = document.createElement('div');
    file.className = 'reader-file-main';
    const icon = document.createElement('span');
    icon.className = 'reader-file-icon';
    icon.setAttribute('aria-hidden', 'true');
    icon.textContent = '▤';
    const fileText = document.createElement('div');
    fileText.append(contentLink(document, question, 'reader-file-link'));
    const path = document.createElement('span');
    path.textContent = `backend/contents/${question.id}.md`;
    fileText.append(path);
    file.append(icon, fileText);

    const category = document.createElement('span');
    category.className = 'reader-file-category';
    category.textContent = question.category;
    const status = document.createElement('span');
    status.className = read ? 'reader-read-status is-read' : 'reader-read-status';
    status.textContent = read ? '읽음' : '읽지 않음';

    const action = actionButton(
      document,
      'add',
      question.id,
      planned.has(question.id) ? '오늘 목록에 있음' : '오늘 목록에 추가',
      'reader-add-button screen-only',
    );
    action.disabled = planned.has(question.id);
    row.append(file, category, status, action);
    fragment.append(row);
  }

  list.replaceChildren(fragment);
  const empty = find(page, '#reading-empty');
  if (empty) empty.hidden = filtered.length !== 0;
  const count = find(page, '#reading-results-count');
  if (count) {
    const from = filtered.length === 0 ? 0 : ((safePage - 1) * normalizedPageSize) + 1;
    const to = Math.min(safePage * normalizedPageSize, filtered.length);
    count.textContent = `${from}–${to} / 전체 ${filtered.length}개 · ${safePage}/${totalPages}페이지`;
  }
  renderPagination(page, safePage, totalPages);

  renderCategories(page, categories, state.filters.category, questions.length);
  const stats = buildReadingStats(questions, state);
  page.dataset.readingTotal = String(stats.total);
  page.dataset.readingCompleted = String(stats.read);
  const totalCount = find(page, '#reading-total-count');
  const completedCount = find(page, '#reading-completed-count');
  const todayCompletedCount = find(page, '#reading-today-completed-count');
  const todayCount = find(page, '#reading-today-count');
  if (totalCount) totalCount.textContent = String(stats.total);
  if (completedCount) completedCount.textContent = String(stats.read);
  if (todayCompletedCount) {
    todayCompletedCount.textContent = String(plan.completedIds.filter((id) => plan.ids.includes(id)).length);
  }
  if (todayCount) todayCount.textContent = String(plan.ids.length);
  return filtered;
}

export function initContentsPage(root = document, options = {}) {
  const page = root?.querySelector?.('[data-reader-page="list"]')
    ?? (root?.dataset?.readerPage === 'list' ? root : null);
  if (!page) return null;
  const pageDocument = documentFor(page);
  const view = options.view ?? pageDocument.defaultView ?? globalThis.window;
  const storage = options.storage ?? view?.localStorage;
  const questions = options.questions ?? CONTENTS;
  const categories = options.categories ?? CONTENT_CATEGORIES;
  const validIds = new Set(questions.map(({ id }) => id));
  const now = options.now ?? (() => new Date());
  const date = logicalDateString(now());
  let saveError = '';
  let state;
  let plan;
  let currentPage = 1;
  let pageSize = loadReadingPageSize(storage);
  const navigationType = options.navigationType ?? readingNavigationType(view?.performance);
  const restoredView = navigationType === 'back_forward'
    ? normalizeReadingViewSnapshot(view?.history?.state?.[READING_VIEW_HISTORY_KEY])
    : null;

  try {
    state = loadReadingState(storage, validIds);
  } catch {
    state = createEmptyReadingState();
    saveError = SAVE_ERROR;
  }
  const categoryIds = new Set(categories.map(({ id }) => id));
  const restoredFilters = restoredView
    ? {
      ...restoredView.filters,
      category: restoredView.filters.category === 'all'
        || categoryIds.has(restoredView.filters.category)
        ? restoredView.filters.category
        : 'all',
    }
    : DEFAULT_READING_VIEW_FILTERS;
  state = setReadingFilters(state, restoredFilters);
  currentPage = restoredView?.currentPage ?? 1;
  try {
    state = saveReadingState(storage, state, validIds);
  } catch {
    saveError = SAVE_ERROR;
  }
  try {
    const storedPlan = loadReadingPlan(storage, date, validIds);
    plan = ensureDailyReadingPlan(questions, state, storedPlan, date, now());
    plan = saveReadingPlan(storage, plan, date, validIds);
  } catch {
    plan = ensureDailyReadingPlan(questions, state, null, date, now());
    saveError = SAVE_ERROR;
  }

  function notify(message) {
    const live = find(page, '#reading-live');
    if (live) live.textContent = message;
  }

  function persistState(candidate) {
    state = candidate;
    try {
      state = saveReadingState(storage, candidate, validIds);
      return true;
    } catch {
      notify(SAVE_ERROR);
      return false;
    }
  }

  function persistPlan(candidate) {
    plan = candidate;
    try {
      plan = saveReadingPlan(storage, candidate, date, validIds);
      return true;
    } catch {
      notify(SAVE_ERROR);
      return false;
    }
  }

  function saveReadingView() {
    try {
      const historyState = view?.history?.state;
      view?.history?.replaceState?.({
        ...(historyState && typeof historyState === 'object' ? historyState : {}),
        [READING_VIEW_HISTORY_KEY]: {
          filters: { ...state.filters },
          currentPage,
          scrollY: Number.isFinite(view?.scrollY) ? Math.max(0, view.scrollY) : 0,
        },
      }, '');
    } catch {
      // file:// 미리보기나 제한된 브라우저에서도 읽기 기능 자체는 계속 동작한다.
    }
  }

  function renderAll() {
    renderTodayReadingList(page, questions, state, plan);
    renderReadingCatalog(page, questions, categories, state, plan, currentPage, pageSize);
    const search = find(page, '#reading-search');
    const progress = find(page, '#reading-progress-filter');
    const pageSizeField = find(page, '#reading-page-size');
    if (search && search.value !== state.filters.query) search.value = state.filters.query;
    if (progress) progress.value = state.filters.progress;
    if (pageSizeField) pageSizeField.value = String(pageSize);
  }

  const dateElement = find(page, '#reading-date');
  if (dateElement) {
    dateElement.dateTime = date;
    dateElement.textContent = formatLogicalDate(date);
  }
  renderAll();
  if (restoredView?.scrollY > 0) {
    const restoreScroll = () => {
      try {
        view?.scrollTo?.({ top: restoredView.scrollY, behavior: 'auto' });
      } catch {
        view?.scrollTo?.(0, restoredView.scrollY);
      }
      saveReadingView();
    };
    if (typeof view?.requestAnimationFrame === 'function') {
      view.requestAnimationFrame(restoreScroll);
    } else {
      restoreScroll();
    }
  } else {
    saveReadingView();
  }
  if (saveError) notify(saveError);

  page.addEventListener('input', (event) => {
    if (event.target?.id !== 'reading-search') return;
    currentPage = 1;
    persistState(setReadingFilters(state, { query: event.target.value }));
    renderReadingCatalog(page, questions, categories, state, plan, currentPage, pageSize);
    saveReadingView();
  });

  page.addEventListener('change', (event) => {
    if (event.target?.id === 'reading-progress-filter') {
      currentPage = 1;
      persistState(setReadingFilters(state, { progress: event.target.value }));
      renderReadingCatalog(page, questions, categories, state, plan, currentPage, pageSize);
      saveReadingView();
      return;
    }
    if (event.target?.id === 'reading-page-size') {
      currentPage = 1;
      try {
        pageSize = saveReadingPageSize(storage, event.target.value);
      } catch {
        pageSize = normalizeReadingPageSize(event.target.value);
        notify(SAVE_ERROR);
      }
      renderReadingCatalog(page, questions, categories, state, plan, currentPage, pageSize);
      saveReadingView();
      scrollReadingArchive(page, view);
    }
  });

  page.addEventListener('click', (event) => {
    const focus = describeReadingFocus(page, event.target);
    const categoryButton = event.target.closest?.('[data-reading-category]');
    if (categoryButton) {
      currentPage = 1;
      persistState(setReadingFilters(state, { category: categoryButton.dataset.readingCategory }));
      renderReadingCatalog(page, questions, categories, state, plan, currentPage, pageSize);
      saveReadingView();
      restoreReadingFocus(page, focus, plan);
      return;
    }

    const pageButton = event.target.closest?.('[data-reading-page]');
    if (pageButton && !pageButton.disabled) {
      currentPage = Number.parseInt(pageButton.dataset.readingPage, 10) || 1;
      renderReadingCatalog(page, questions, categories, state, plan, currentPage, pageSize);
      saveReadingView();
      restoreReadingFocus(page, focus, plan);
      scrollReadingArchive(page, view);
      return;
    }

    const button = event.target.closest?.('[data-reading-action]');
    if (!button || button.disabled) return;
    const id = button.dataset.contentId;
    try {
      switch (button.dataset.readingAction) {
        case 'add': {
          const stored = persistPlan(addItemToReadingPlan(plan, id, questions, state, now()));
          if (stored) notify('오늘 읽기 목록에 추가했습니다. 밤에 더 읽을 글도 계속 담을 수 있어요.');
          break;
        }
        case 'remove': {
          const stored = persistPlan(removeItemFromReadingPlan(plan, id, now()));
          if (stored) notify('오늘 목록에서 뺐습니다.');
          break;
        }
        case 'replace': {
          const stored = persistPlan(replaceReadingPlanItem(plan, id, questions, state, now()));
          if (stored) notify('읽지 않은 다른 글로 바꿨습니다.');
          break;
        }
        case 'toggle-completed': {
          const completed = !plan.completedIds.includes(id);
          const planStored = persistPlan(setReadingCompleted(plan, id, completed, now()));
          const stateStored = completed
            ? persistState(markReadingItemRead(state, id, true, now()))
            : true;
          if (planStored && stateStored) {
            notify(completed ? '오늘 읽은 글로 기록했습니다.' : '오늘 완료 표시만 취소했습니다.');
          }
          break;
        }
        default:
          return;
      }
      renderAll();
      saveReadingView();
      restoreReadingFocus(page, focus, plan);
    } catch (error) {
      notify(error instanceof Error ? error.message : '요청을 처리하지 못했습니다.');
    }
  });

  view?.addEventListener?.('pagehide', saveReadingView);
  scheduleLogicalDayRollover(view, date, now);
  pageDocument.documentElement.dataset.contentsReady = 'true';
  return {
    date,
    get state() { return state; },
    get plan() { return plan; },
    get pageSize() { return pageSize; },
  };
}

if (typeof document !== 'undefined') initContentsPage(document);
