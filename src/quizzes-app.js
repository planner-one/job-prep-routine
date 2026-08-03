import {
  INTERVIEW_CATEGORIES,
  INTERVIEW_QUESTIONS,
} from './interview-data.js';
import { logicalQuizDate } from './quiz-core.js?v=6';
import { QUIZ_QUESTIONS } from './quiz-data.js?v=6';
import { getActiveFollowUpIds } from './quiz-flow-core.js?v=6';
import { createLocalQuizFlowStorage } from './quiz-flow-storage.js?v=6';
import { loadReadingPlan } from './reading-storage.js';
import { scheduleLogicalDayRollover } from './routine-core.js';

export const QUIZ_LIST_PAGE_SIZE = 14;
export const QUIZ_TODAY_SIZE = 5;

function find(root, selector) {
  if (!root) return null;
  if (root.matches?.(selector)) return root;
  return root.querySelector?.(selector) ?? null;
}

function documentFor(root) {
  return root?.ownerDocument ?? root;
}

function createMemoryStorage() {
  const values = new Map();
  return {
    getItem(key) { return values.has(key) ? values.get(key) : null; },
    setItem(key, value) { values.set(key, String(value)); },
    removeItem(key) { values.delete(key); },
  };
}

function seedNumber(value) {
  let hash = 0x811c9dc5;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 0x01000193);
  }
  return hash >>> 0;
}

export function selectDailyQuizSources(sources, date, preferredIds = [], limit = QUIZ_TODAY_SIZE) {
  const byId = new Map(sources.map((source) => [source.id, source]));
  const selected = [];
  const used = new Set();
  const add = (source) => {
    if (!source || used.has(source.id) || selected.length >= limit) return;
    used.add(source.id);
    selected.push(source);
  };
  preferredIds.forEach((id) => add(byId.get(id)));
  [...sources]
    .sort((left, right) => (
      seedNumber(`${date}:${left.id}`) - seedNumber(`${date}:${right.id}`)
      || left.order - right.order
    ))
    .forEach(add);
  return selected;
}

export function quizSourceProgress(sourceId, attempts = [], session = null) {
  const sourceAttempts = attempts.filter((attempt) => attempt.session?.primarySourceId === sourceId);
  if (session?.version === 2) {
    const mainTotal = session.secondRoundStarted
      ? Math.min(10, session.mainQuestionIds.length)
      : Math.min(5, session.mainQuestionIds.length);
    const mainIds = session.mainQuestionIds.slice(0, mainTotal);
    const tailIds = mainIds.flatMap((id) => getActiveFollowUpIds(session, id, QUIZ_QUESTIONS));
    const mainAnswered = mainIds.filter((id) => session.answers?.[id]).length;
    const tailAnswered = tailIds.filter((id) => session.answers?.[id]).length;
    const deferredCount = session.deferredFollowUpIds?.length ?? 0;
    const completedSession = session.fullyCompleted === true;
    const mainCompleted = session.mainCompleted === true;
    const bestScore = sourceAttempts.length
      ? Math.max(...sourceAttempts.map((attempt) => attempt.score?.combined?.percent ?? 0))
      : null;
    return Object.freeze({
      status: completedSession ? 'completed' : ((mainAnswered || tailAnswered || mainCompleted) ? 'in-progress' : 'new'),
      attemptCount: sourceAttempts.length,
      bestScore,
      latestAttempt: sourceAttempts[0] ?? null,
      answeredCount: mainAnswered + tailAnswered,
      completedSession,
      mainCompleted,
      fullyCompleted: completedSession,
      mainAnswered,
      mainTotal,
      tailAnswered,
      tailTotal: tailIds.length,
      deferredCount,
    });
  }
  const active = session && session.status !== 'completed';
  const completedSession = session?.status === 'completed';
  const bestScore = sourceAttempts.length
    ? Math.max(...sourceAttempts.map((attempt) => attempt.score.percent))
    : null;
  return Object.freeze({
    status: active ? 'in-progress' : ((sourceAttempts.length || completedSession) ? 'completed' : 'new'),
    attemptCount: sourceAttempts.length,
    bestScore,
    latestAttempt: sourceAttempts[0] ?? null,
    answeredCount: active ? Object.keys(session.answers ?? {}).length : 0,
    completedSession,
  });
}

export function filterQuizSources(sources, progressById, filters = {}) {
  const query = String(filters.query ?? '').trim().toLocaleLowerCase('ko-KR');
  const category = filters.category ?? 'all';
  const status = filters.status ?? 'all';
  return sources.filter((source) => {
    const progress = progressById.get(source.id) ?? quizSourceProgress(source.id);
    return (category === 'all' || source.categoryId === category)
      && (status === 'all' || progress.status === status)
      && (!query || `${source.title} ${source.category}`.toLocaleLowerCase('ko-KR').includes(query));
  });
}

export function paginateQuizSources(sources, page, pageSize = QUIZ_LIST_PAGE_SIZE) {
  const totalPages = Math.max(1, Math.ceil(sources.length / pageSize));
  const currentPage = Math.min(Math.max(1, Number.parseInt(page, 10) || 1), totalPages);
  return Object.freeze({
    items: sources.slice((currentPage - 1) * pageSize, currentPage * pageSize),
    currentPage,
    totalPages,
  });
}

function formatDate(date) {
  const [year, month, day] = String(date).split('-').map(Number);
  if (![year, month, day].every(Number.isInteger)) return date;
  return new Intl.DateTimeFormat('ko-KR', {
    month: 'long', day: 'numeric', weekday: 'short',
  }).format(new Date(year, month - 1, day, 12));
}

function quizHref(sourceId) {
  return `./quiz.html?source=${encodeURIComponent(sourceId)}`;
}

function statusLabel(progress) {
  if (progress.status === 'in-progress') return '진행 중';
  if (progress.status === 'completed') return '풀이 완료';
  return '미풀이';
}

function actionLabel(progress) {
  if (progress.deferredCount > 0 && progress.mainCompleted) return '보류 문제 풀기';
  if (progress.status === 'in-progress') return '이어 풀기';
  if (progress.completedSession) return '결과 보기';
  if (progress.status === 'completed') return '다시 풀기';
  return '풀기 시작';
}

function progressMeta(progress) {
  if (Number.isInteger(progress.mainTotal)) {
    const complete = progress.fullyCompleted ? '완전 완료' : (progress.mainCompleted ? '메인 완료' : '진행 중');
    return `메인 ${progress.mainAnswered}/${progress.mainTotal} · 꼬리 ${progress.tailAnswered}/${progress.tailTotal} · 보류 ${progress.deferredCount}개 · ${complete}`;
  }
  if (progress.status === 'in-progress') return `${progress.answeredCount}문항 응답 · 이어서 풀 수 있어요`;
  if (progress.attemptCount > 0) return `${progress.attemptCount}회 풀이 · 최고 ${progress.bestScore}점`;
  return '아직 풀이 기록이 없습니다.';
}

function createLink(document, source, className) {
  const link = document.createElement('a');
  link.href = quizHref(source.id);
  link.className = className;
  link.textContent = source.title;
  return link;
}

function renderToday(page, sources, progressById, attempts, date) {
  const list = find(page, '#quiz-today-list');
  if (!list) return;
  const document = documentFor(list);
  const fragment = document.createDocumentFragment();
  let completed = 0;

  sources.forEach((source, index) => {
    const progress = progressById.get(source.id);
    const completedToday = attempts.some((attempt) => (
      attempt.session?.primarySourceId === source.id && attempt.session?.date === date
    ));
    if (completedToday) completed += 1;

    const item = document.createElement('li');
    item.className = 'quiz-today-card';
    item.dataset.status = progress.status;
    const top = document.createElement('div');
    top.className = 'quiz-card-topline';
    const order = document.createElement('span');
    order.className = 'quiz-card-order';
    order.textContent = `${index + 1}번째 문제`;
    const status = document.createElement('span');
    status.className = `quiz-card-status${progress.status === 'in-progress' ? ' is-progress' : ''}${completedToday ? ' is-complete' : ''}`;
    status.textContent = completedToday ? '오늘 완료' : statusLabel(progress);
    top.append(order, status);
    const category = document.createElement('span');
    category.className = 'quiz-card-category';
    category.textContent = source.category;
    const title = createLink(document, source, 'quiz-card-title');
    const action = createLink(document, source, 'quiz-card-action');
    action.textContent = actionLabel(progress);
    item.append(top, category, title, action);
    fragment.append(item);
  });
  list.replaceChildren(fragment);
  const summary = find(page, '#quiz-today-progress');
  if (summary) summary.textContent = `오늘 ${completed} / ${sources.length} 완료`;
}

function renderSourceList(page, sources, progressById) {
  const list = find(page, '#quiz-source-list');
  if (!list) return;
  const document = documentFor(list);
  const fragment = document.createDocumentFragment();
  for (const source of sources) {
    const progress = progressById.get(source.id);
    const item = document.createElement('li');
    item.className = 'quiz-source-card';
    item.dataset.status = progress.status;
    const number = document.createElement('span');
    number.className = 'quiz-source-number';
    number.textContent = `Q${String(source.number).padStart(2, '0')}`;
    const body = document.createElement('div');
    body.className = 'quiz-source-body';
    const category = document.createElement('div');
    category.className = 'quiz-source-category';
    category.textContent = source.category;
    const title = createLink(document, source, 'quiz-source-title');
    const meta = document.createElement('p');
    meta.className = 'quiz-source-meta';
    meta.textContent = progressMeta(progress);
    body.append(category, title, meta);
    const action = createLink(document, source, 'quiz-source-action');
    action.textContent = actionLabel(progress);
    item.append(number, body, action);
    fragment.append(item);
  }
  list.replaceChildren(fragment);
}

function renderPagination(page, currentPage, totalPages) {
  const container = find(page, '#quiz-list-pagination');
  if (!container) return;
  const document = documentFor(container);
  container.replaceChildren();
  container.hidden = totalPages <= 1;
  if (totalPages <= 1) return;
  const fragment = document.createDocumentFragment();
  const addButton = (label, targetPage, disabled = false) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.dataset.quizPage = String(targetPage);
    button.textContent = label;
    button.disabled = disabled;
    if (/^\d+$/u.test(label)) {
      button.setAttribute('aria-label', `${label}페이지`);
      if (targetPage === currentPage) button.setAttribute('aria-current', 'page');
    }
    fragment.append(button);
  };
  addButton('‹ 이전', Math.max(1, currentPage - 1), currentPage === 1);
  const visiblePages = new Set([
    1, totalPages, currentPage - 2, currentPage - 1, currentPage, currentPage + 1, currentPage + 2,
  ].filter((value) => value >= 1 && value <= totalPages));
  let previous = 0;
  for (const targetPage of [...visiblePages].sort((left, right) => left - right)) {
    if (targetPage - previous > 1) {
      const ellipsis = document.createElement('span');
      ellipsis.className = 'quiz-pagination-ellipsis';
      ellipsis.textContent = '…';
      ellipsis.setAttribute('aria-hidden', 'true');
      fragment.append(ellipsis);
    }
    addButton(String(targetPage), targetPage);
    previous = targetPage;
  }
  addButton('다음 ›', Math.min(totalPages, currentPage + 1), currentPage === totalPages);
  container.append(fragment);
}

export function initQuizzesPage(root = document, options = {}) {
  const page = root?.querySelector?.('[data-quiz-list-page]')
    ?? (root?.matches?.('[data-quiz-list-page]') ? root : null);
  if (!page) return null;
  const document = documentFor(page);
  const view = options.view ?? document.defaultView ?? globalThis.window;
  const now = options.now ?? (() => new Date());
  const date = logicalQuizDate(now());
  let storage;
  try {
    storage = options.storage ?? view.localStorage;
    if (!storage?.getItem || !storage?.setItem) throw new TypeError();
  } catch {
    storage = createMemoryStorage();
  }
  const quizStorage = options.quizStorage ?? createLocalQuizFlowStorage(storage);
  const validSourceIds = new Set(INTERVIEW_QUESTIONS.map(({ id }) => id));
  let attempts = [];
  try { attempts = quizStorage.loadAttempts(QUIZ_QUESTIONS); } catch { attempts = []; }
  const sessions = new Map();
  for (const source of INTERVIEW_QUESTIONS) {
    try {
      const session = quizStorage.loadSession(date, source.id, QUIZ_QUESTIONS);
      if (session) sessions.set(source.id, session);
    } catch { /* 손상된 개별 세션은 목록에서 제외한다. */ }
  }
  const progressById = new Map(INTERVIEW_QUESTIONS.map((source) => [
    source.id,
    quizSourceProgress(source.id, attempts, sessions.get(source.id)),
  ]));
  let preferredIds = [];
  try { preferredIds = loadReadingPlan(storage, date, validSourceIds)?.ids ?? []; } catch { preferredIds = []; }
  const todaySources = selectDailyQuizSources(INTERVIEW_QUESTIONS, date, preferredIds);
  const filters = { query: '', category: 'all', status: 'all' };
  let currentPage = 1;

  const categorySelect = find(page, '#quiz-list-category');
  if (categorySelect) {
    for (const category of INTERVIEW_CATEGORIES) {
      const option = document.createElement('option');
      option.value = category.id;
      option.textContent = category.label;
      categorySelect.append(option);
    }
  }

  const completedSources = new Set(attempts.map((attempt) => attempt.session?.primarySourceId).filter(Boolean));
  const average = attempts.length
    ? Math.round(attempts.reduce((sum, attempt) => sum + (attempt.score?.combined?.percent ?? attempt.score?.percent ?? 0), 0) / attempts.length)
    : null;
  find(page, '#quiz-total-count').textContent = String(INTERVIEW_QUESTIONS.length);
  find(page, '#quiz-completed-count').textContent = String(completedSources.size);
  find(page, '#quiz-attempt-count').textContent = String(attempts.length);
  find(page, '#quiz-average-score').textContent = average === null ? '-' : `${average}점`;
  find(page, '#quiz-list-date').textContent = formatDate(date);
  renderToday(page, todaySources, progressById, attempts, date);

  function renderCatalog() {
    const filtered = filterQuizSources(INTERVIEW_QUESTIONS, progressById, filters);
    const result = paginateQuizSources(filtered, currentPage);
    currentPage = result.currentPage;
    renderSourceList(page, result.items, progressById);
    renderPagination(page, result.currentPage, result.totalPages);
    const empty = find(page, '#quiz-list-empty');
    if (empty) empty.hidden = filtered.length !== 0;
    const count = find(page, '#quiz-list-results-count');
    if (count) count.textContent = `검색 결과 ${filtered.length}세트`;
    const summary = find(page, '#quiz-list-page-summary');
    if (summary) {
      const start = filtered.length ? (result.currentPage - 1) * QUIZ_LIST_PAGE_SIZE + 1 : 0;
      const end = Math.min(result.currentPage * QUIZ_LIST_PAGE_SIZE, filtered.length);
      summary.textContent = `${start}–${end}번 · ${result.currentPage} / ${result.totalPages}페이지`;
    }
  }

  page.addEventListener('input', (event) => {
    if (event.target?.id !== 'quiz-list-search') return;
    filters.query = event.target.value;
    currentPage = 1;
    renderCatalog();
  });
  page.addEventListener('change', (event) => {
    if (event.target?.id === 'quiz-list-category') filters.category = event.target.value;
    else if (event.target?.id === 'quiz-list-status') filters.status = event.target.value;
    else return;
    currentPage = 1;
    renderCatalog();
  });
  page.addEventListener('click', (event) => {
    const button = event.target.closest?.('[data-quiz-page]');
    if (!button || button.disabled) return;
    currentPage = Number.parseInt(button.dataset.quizPage, 10) || 1;
    renderCatalog();
    find(page, '#quiz-catalog-title')?.focus?.({ preventScroll: true });
  });

  renderCatalog();
  scheduleLogicalDayRollover(view, date, now);
  document.documentElement.dataset.quizzesReady = 'true';
  return { date, todaySources, progressById, render: renderCatalog };
}

if (typeof document !== 'undefined') initQuizzesPage(document);
