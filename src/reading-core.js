export const READING_STATE_VERSION = 1;
export const READING_STORAGE_NAMESPACE = 'job-prep-routine:maeil-reader:v1';
export const READING_STATE_KEY = `${READING_STORAGE_NAMESPACE}:state`;
export const READING_PROGRESS_FILTERS = Object.freeze(['all', 'unread', 'read']);
export const READING_STARTER_COUNT = 3;

const PROGRESS_FILTER_SET = new Set(READING_PROGRESS_FILTERS);
const DEFAULT_FILTERS = Object.freeze({
  query: '',
  category: 'all',
  progress: 'all',
});

function isPlainObject(value) {
  if (value === null || typeof value !== 'object') return false;
  const prototype = Object.getPrototypeOf(value);
  return prototype === Object.prototype || prototype === null;
}

function validIdSet(validIds) {
  if (validIds instanceof Set) return validIds;
  if (validIds && typeof validIds[Symbol.iterator] === 'function') return new Set(validIds);
  return new Set();
}

function isoTimestamp(now = new Date()) {
  return (now instanceof Date ? now : new Date(now)).toISOString();
}

function normalizeTimestamp(value) {
  return typeof value === 'string' || value === null ? value : null;
}

function normalizeFilters(candidate) {
  const source = isPlainObject(candidate) ? candidate : {};
  return {
    query: typeof source.query === 'string' ? source.query : DEFAULT_FILTERS.query,
    category: typeof source.category === 'string' ? source.category : DEFAULT_FILTERS.category,
    progress: PROGRESS_FILTER_SET.has(source.progress) ? source.progress : DEFAULT_FILTERS.progress,
  };
}

export const createEmptyReadingItem = () => ({
  readAt: null,
  lastOpenedAt: null,
  favorite: false,
});

export const createEmptyReadingState = () => ({
  version: READING_STATE_VERSION,
  items: {},
  filters: { ...DEFAULT_FILTERS },
});

function normalizeReadingItem(candidate) {
  const source = isPlainObject(candidate) ? candidate : {};
  return {
    readAt: normalizeTimestamp(source.readAt),
    lastOpenedAt: normalizeTimestamp(source.lastOpenedAt),
    favorite: typeof source.favorite === 'boolean' ? source.favorite : false,
  };
}

export function normalizeReadingState(candidate, validIds) {
  const source = isPlainObject(candidate) ? candidate : {};
  const sourceItems = isPlainObject(source.items) ? source.items : {};
  const allowedIds = validIdSet(validIds);
  const items = {};

  for (const [id, item] of Object.entries(sourceItems)) {
    if (allowedIds.has(id)) items[id] = normalizeReadingItem(item);
  }

  return {
    version: READING_STATE_VERSION,
    items,
    filters: normalizeFilters(source.filters),
  };
}

function sourceReadingState(state) {
  const source = isPlainObject(state) ? state : createEmptyReadingState();
  return {
    items: isPlainObject(source.items) ? source.items : {},
    filters: normalizeFilters(source.filters),
  };
}

function normalizedItemPatch(current, patch, now) {
  const source = isPlainObject(patch) ? patch : {};
  const candidate = { ...current };

  if (Object.hasOwn(source, 'readAt')) {
    candidate.readAt = source.readAt === true
      ? isoTimestamp(now)
      : (source.readAt === false ? null : source.readAt);
  }
  if (Object.hasOwn(source, 'lastOpenedAt')) {
    candidate.lastOpenedAt = source.lastOpenedAt === true
      ? isoTimestamp(now)
      : (source.lastOpenedAt === false ? null : source.lastOpenedAt);
  }
  if (Object.hasOwn(source, 'favorite')) candidate.favorite = source.favorite;

  return normalizeReadingItem(candidate);
}

export function updateReadingItem(state, id, patch, now = new Date()) {
  if (typeof id !== 'string' || !id) throw new RangeError('알 수 없는 읽기 항목입니다.');
  const source = sourceReadingState(state);
  const current = normalizeReadingItem(source.items[id]);
  const updated = normalizedItemPatch(current, patch, now);

  return {
    version: READING_STATE_VERSION,
    items: { ...source.items, [id]: updated },
    filters: source.filters,
  };
}

export function markReadingItemRead(state, id, read, now = new Date()) {
  return updateReadingItem(state, id, { readAt: read ? true : null }, now);
}

export function markReadingItemOpened(state, id, now = new Date()) {
  return updateReadingItem(state, id, { lastOpenedAt: true }, now);
}

export function setReadingItemFavorite(state, id, favorite) {
  return updateReadingItem(state, id, { favorite: Boolean(favorite) });
}

export function setReadingFilters(state, filters) {
  const source = sourceReadingState(state);
  const patch = isPlainObject(filters) ? filters : {};
  return {
    version: READING_STATE_VERSION,
    items: { ...source.items },
    filters: normalizeFilters({ ...source.filters, ...patch }),
  };
}

function normalizedSearchText(value) {
  return String(value ?? '').trim().replace(/\s+/gu, ' ').toLocaleLowerCase('ko-KR');
}

function isRead(state, id) {
  return typeof state?.items?.[id]?.readAt === 'string';
}

function questionNumber(question) {
  return Number.isFinite(question?.number) ? question.number : Number.POSITIVE_INFINITY;
}

function compareQuestionNumbers(left, right) {
  const leftNumber = questionNumber(left);
  const rightNumber = questionNumber(right);
  if (leftNumber !== rightNumber) return leftNumber < rightNumber ? -1 : 1;
  const leftOrder = Number.isFinite(left?.order) ? left.order : Number.POSITIVE_INFINITY;
  const rightOrder = Number.isFinite(right?.order) ? right.order : Number.POSITIVE_INFINITY;
  if (leftOrder !== rightOrder) return leftOrder - rightOrder;
  return String(left?.id ?? '').localeCompare(String(right?.id ?? ''), 'ko-KR');
}

export function filterReadingQuestions(questions, state, filters) {
  const selected = normalizeFilters(filters ?? state?.filters);
  const query = normalizedSearchText(selected.query);

  return (Array.isArray(questions) ? questions : [])
    .filter((question) => {
      if (!question || typeof question.id !== 'string') return false;
      if (query && !normalizedSearchText(question.title).includes(query)) return false;
      if (selected.category !== 'all'
        && question.categoryId !== selected.category
        && question.category !== selected.category) return false;
      if (selected.progress === 'read' && !isRead(state, question.id)) return false;
      if (selected.progress === 'unread' && isRead(state, question.id)) return false;
      return true;
    })
    .sort(compareQuestionNumbers);
}

export function buildReadingStats(questions, state) {
  const stats = { total: 0, unread: 0, read: 0, favorites: 0 };
  for (const question of Array.isArray(questions) ? questions : []) {
    if (!question || typeof question.id !== 'string') continue;
    stats.total += 1;
    stats[isRead(state, question.id) ? 'read' : 'unread'] += 1;
    if (state?.items?.[question.id]?.favorite === true) stats.favorites += 1;
  }
  return stats;
}

export const readingPlanKey = (date) => `${READING_STORAGE_NAMESPACE}:plan:${date}`;

function emptyReadingPlan(date) {
  return {
    date,
    ids: [],
    completedIds: [],
    updatedAt: null,
  };
}

export function normalizeReadingPlan(candidate, date, validIds) {
  const source = isPlainObject(candidate) ? candidate : {};
  if (!isPlainObject(candidate) || source.date !== date) return emptyReadingPlan(date);

  const allowedIds = validIdSet(validIds);
  const ids = [];
  const seen = new Set();
  for (const id of Array.isArray(source.ids) ? source.ids : []) {
    if (typeof id !== 'string' || !allowedIds.has(id) || seen.has(id)) continue;
    seen.add(id);
    ids.push(id);
  }

  const completedIds = [];
  const completedSeen = new Set();
  for (const id of Array.isArray(source.completedIds) ? source.completedIds : []) {
    if (!seen.has(id) || completedSeen.has(id)) continue;
    completedSeen.add(id);
    completedIds.push(id);
  }

  return {
    date,
    ids,
    completedIds,
    updatedAt: normalizeTimestamp(source.updatedAt),
  };
}

function uniqueQuestions(questions) {
  const seen = new Set();
  return (Array.isArray(questions) ? questions : []).filter((question) => {
    if (!question || typeof question.id !== 'string' || !question.id || seen.has(question.id)) return false;
    seen.add(question.id);
    return true;
  });
}

function recommendedQuestions(questions, state, excludedIds = new Set()) {
  return uniqueQuestions(questions)
    .filter(({ id }) => !excludedIds.has(id))
    .sort((left, right) => {
      const leftRead = isRead(state, left.id);
      const rightRead = isRead(state, right.id);
      if (leftRead !== rightRead) return leftRead ? 1 : -1;
      return compareQuestionNumbers(left, right);
    });
}

function arraysEqual(left, right) {
  return Array.isArray(left)
    && Array.isArray(right)
    && left.length === right.length
    && left.every((value, index) => value === right[index]);
}

function isValidSamePlan(candidate, normalized) {
  return isPlainObject(candidate)
    && candidate.date === normalized.date
    && Array.isArray(candidate.ids)
    && Array.isArray(candidate.completedIds)
    && arraysEqual(candidate.ids, normalized.ids)
    && arraysEqual(candidate.completedIds, normalized.completedIds)
    && (typeof candidate.updatedAt === 'string' || candidate.updatedAt === null);
}

export function ensureDailyReadingPlan(questions, state, candidate, date, now = new Date()) {
  const unique = uniqueQuestions(questions);
  const validIds = new Set(unique.map(({ id }) => id));
  const isExistingPlan = isPlainObject(candidate)
    && candidate.date === date
    && Array.isArray(candidate.ids)
    && Array.isArray(candidate.completedIds);

  if (isExistingPlan) {
    const normalized = normalizeReadingPlan(candidate, date, validIds);
    return {
      ...normalized,
      updatedAt: isValidSamePlan(candidate, normalized) ? normalized.updatedAt : isoTimestamp(now),
    };
  }

  const ids = recommendedQuestions(unique, state)
    .slice(0, READING_STARTER_COUNT)
    .map(({ id }) => id);

  return {
    date,
    ids,
    completedIds: [],
    updatedAt: isoTimestamp(now),
  };
}

function changedPlan(plan, ids, completedIds, now) {
  return {
    date: plan.date,
    ids: [...ids],
    completedIds: [...completedIds],
    updatedAt: isoTimestamp(now),
  };
}

function nowArgument(stateOrNow, now) {
  if (now !== undefined) return now;
  if (stateOrNow instanceof Date || typeof stateOrNow === 'string' || typeof stateOrNow === 'number') {
    return stateOrNow;
  }
  return new Date();
}

export function addItemToReadingPlan(plan, id, questions, stateOrNow, now) {
  if (plan?.ids?.includes(id)) return plan;
  const unique = uniqueQuestions(questions);
  const validIds = new Set(unique.map((question) => question.id));
  if (!validIds.has(id)) throw new RangeError('알 수 없는 읽기 항목입니다.');
  const normalized = normalizeReadingPlan(plan, plan?.date, validIds);
  const ids = [...normalized.ids];
  ids.push(id);

  return changedPlan(normalized, ids, normalized.completedIds, nowArgument(stateOrNow, now));
}

export function removeItemFromReadingPlan(plan, id, now = new Date()) {
  if (!Array.isArray(plan?.ids) || !plan.ids.includes(id)) {
    throw new RangeError('오늘 읽기 목록에 없는 항목입니다.');
  }
  const ids = plan.ids.filter((plannedId) => plannedId !== id);
  const completedIds = (Array.isArray(plan.completedIds) ? plan.completedIds : [])
    .filter((completedId) => completedId !== id && ids.includes(completedId));
  return changedPlan(plan, ids, completedIds, now);
}

export function replaceReadingPlanItem(plan, id, questions, state, now = new Date()) {
  const unique = uniqueQuestions(questions);
  const validIds = new Set(unique.map((question) => question.id));
  const normalized = normalizeReadingPlan(plan, plan?.date, validIds);
  const index = normalized.ids.indexOf(id);
  if (index < 0 || normalized.completedIds.includes(id)) {
    throw new RangeError('완료했거나 오늘 목록에 없는 글은 교체할 수 없습니다.');
  }

  const replacement = recommendedQuestions(unique, state, new Set(normalized.ids))[0];
  if (!replacement) throw new RangeError('교체할 읽기 항목이 없습니다.');
  const ids = [...normalized.ids];
  ids[index] = replacement.id;
  return changedPlan(normalized, ids, normalized.completedIds, now);
}

export function setReadingCompleted(plan, id, completed, now = new Date()) {
  if (!Array.isArray(plan?.ids) || !plan.ids.includes(id)) {
    throw new RangeError('오늘 읽기 목록에 없는 항목입니다.');
  }
  const completedSet = new Set(Array.isArray(plan.completedIds) ? plan.completedIds : []);
  if (completed) completedSet.add(id);
  else completedSet.delete(id);
  const completedIds = plan.ids.filter((plannedId) => completedSet.has(plannedId));
  return changedPlan(plan, plan.ids, completedIds, now);
}

export const addReadingItemToPlan = addItemToReadingPlan;
export const removeReadingItemFromPlan = removeItemFromReadingPlan;
export const replaceReadingItemInPlan = replaceReadingPlanItem;
export const setReadingPlanCompleted = setReadingCompleted;
