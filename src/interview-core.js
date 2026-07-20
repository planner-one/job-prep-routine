export const INTERVIEW_STATE_VERSION = 1;
export const INTERVIEW_STATE_KEY = 'job-prep-routine:interview:state';
export const QUESTION_STATUSES = Object.freeze(['unseen', 'studying', 'review', 'done']);

const STATUS_SET = new Set(QUESTION_STATUSES);
const DEFAULT_FILTERS = Object.freeze({
  query: '',
  categoryId: 'all',
  status: 'all',
  favoritesOnly: false,
});
const MAX_QUEUE_SIZE = 5;

function isPlainObject(value) {
  if (value === null || typeof value !== 'object') return false;
  const prototype = Object.getPrototypeOf(value);
  return prototype === Object.prototype || prototype === null;
}

function isoTimestamp(now = new Date()) {
  return (now instanceof Date ? now : new Date(now)).toISOString();
}

function normalizeFilters(candidate) {
  const source = isPlainObject(candidate) ? candidate : {};
  return {
    query: typeof source.query === 'string' ? source.query : DEFAULT_FILTERS.query,
    categoryId: typeof source.categoryId === 'string' ? source.categoryId : DEFAULT_FILTERS.categoryId,
    status: source.status === 'all' || STATUS_SET.has(source.status) ? source.status : DEFAULT_FILTERS.status,
    favoritesOnly: typeof source.favoritesOnly === 'boolean' ? source.favoritesOnly : DEFAULT_FILTERS.favoritesOnly,
  };
}

export const createEmptyQuestionState = () => ({
  status: 'unseen',
  favorite: false,
  queuePinned: false,
  confidence: 0,
  answer: '',
  keywords: '',
  memo: '',
  lastStudiedAt: null,
  updatedAt: null,
});

export const createEmptyInterviewState = () => ({
  version: INTERVIEW_STATE_VERSION,
  questions: {},
  filters: { ...DEFAULT_FILTERS },
});

export const interviewQueueKey = (date) => `job-prep-routine:interview:queue:${date}`;

function normalizeQuestionState(candidate) {
  const source = isPlainObject(candidate) ? candidate : {};
  return {
    status: STATUS_SET.has(source.status) ? source.status : 'unseen',
    favorite: Boolean(source.favorite),
    queuePinned: Boolean(source.queuePinned),
    confidence: Number.isInteger(source.confidence) && source.confidence >= 0 && source.confidence <= 5
      ? source.confidence
      : 0,
    answer: typeof source.answer === 'string' ? source.answer : '',
    keywords: typeof source.keywords === 'string' ? source.keywords : '',
    memo: typeof source.memo === 'string' ? source.memo : '',
    lastStudiedAt: typeof source.lastStudiedAt === 'string' || source.lastStudiedAt === null
      ? source.lastStudiedAt
      : null,
    updatedAt: typeof source.updatedAt === 'string' || source.updatedAt === null ? source.updatedAt : null,
  };
}

export function normalizeInterviewState(candidate, validIds) {
  const source = isPlainObject(candidate) ? candidate : {};
  const sourceQuestions = isPlainObject(source.questions) ? source.questions : {};
  const questions = {};
  for (const [id, questionState] of Object.entries(sourceQuestions)) {
    if (validIds.has(id)) questions[id] = normalizeQuestionState(questionState);
  }
  return {
    version: INTERVIEW_STATE_VERSION,
    questions,
    filters: normalizeFilters(source.filters),
  };
}

export function updateQuestionState(state, id, patch, now = new Date()) {
  const source = isPlainObject(state) ? state : createEmptyInterviewState();
  const sourceQuestions = isPlainObject(source.questions) ? source.questions : {};
  const sourcePatch = isPlainObject(patch) ? patch : {};
  const current = normalizeQuestionState(sourceQuestions[id]);
  const updated = normalizeQuestionState({ ...current, ...sourcePatch });
  updated.updatedAt = isoTimestamp(now);
  return {
    version: INTERVIEW_STATE_VERSION,
    questions: { ...sourceQuestions, [id]: updated },
    filters: normalizeFilters(source.filters),
  };
}

export function resetQuestionState(state, id) {
  const source = isPlainObject(state) ? state : createEmptyInterviewState();
  const questions = { ...(isPlainObject(source.questions) ? source.questions : {}) };
  delete questions[id];
  return {
    version: INTERVIEW_STATE_VERSION,
    questions,
    filters: normalizeFilters(source.filters),
  };
}

export function setQueuePinned(state, id, pinned, now = new Date()) {
  const questions = isPlainObject(state?.questions) ? state.questions : {};
  const alreadyPinned = Boolean(questions[id]?.queuePinned);
  if (Boolean(pinned) && !alreadyPinned) {
    const pinnedCount = Object.values(questions).filter((question) => Boolean(question?.queuePinned)).length;
    if (pinnedCount >= MAX_QUEUE_SIZE) {
      throw new RangeError('오늘의 큐 고정은 최대 5개입니다.');
    }
  }
  return updateQuestionState(state, id, { queuePinned: Boolean(pinned) }, now);
}

function normalizedSearchText(value) {
  return value.trim().replace(/\s+/gu, ' ').toLocaleLowerCase('ko-KR');
}

function questionStatus(state, id) {
  const status = state?.questions?.[id]?.status;
  return STATUS_SET.has(status) ? status : 'unseen';
}

export function filterInterviewQuestions(questions, state, filters) {
  const selected = normalizeFilters(filters ?? state?.filters);
  const query = normalizedSearchText(selected.query);
  return questions
    .filter((question) => {
      if (query && !normalizedSearchText(question.title).includes(query)) return false;
      if (selected.categoryId !== 'all' && question.categoryId !== selected.categoryId) return false;
      if (selected.status !== 'all' && questionStatus(state, question.id) !== selected.status) return false;
      if (selected.favoritesOnly && !Boolean(state?.questions?.[question.id]?.favorite)) return false;
      return true;
    })
    .sort((left, right) => left.order - right.order);
}

export function buildInterviewStats(questions, state) {
  const stats = { total: questions.length, unseen: 0, studying: 0, review: 0, done: 0 };
  for (const question of questions) stats[questionStatus(state, question.id)] += 1;
  return stats;
}

function emptyQueue(date) {
  return { date, ids: [], completedIds: [], updatedAt: null };
}

export function normalizeInterviewQueue(candidate, date, validIds) {
  if (!isPlainObject(candidate) || candidate.date !== date) return emptyQueue(date);
  const ids = [];
  const seen = new Set();
  for (const id of Array.isArray(candidate.ids) ? candidate.ids : []) {
    if (ids.length >= MAX_QUEUE_SIZE) break;
    if (typeof id !== 'string' || !validIds.has(id) || seen.has(id)) continue;
    seen.add(id);
    ids.push(id);
  }
  const completedIds = [];
  const completedSeen = new Set();
  for (const id of Array.isArray(candidate.completedIds) ? candidate.completedIds : []) {
    if (!seen.has(id) || completedSeen.has(id)) continue;
    completedSeen.add(id);
    completedIds.push(id);
  }
  return {
    date,
    ids,
    completedIds,
    updatedAt: typeof candidate.updatedAt === 'string' || candidate.updatedAt === null
      ? candidate.updatedAt
      : null,
  };
}

function recommendationKey(question, state) {
  const saved = isPlainObject(state?.questions?.[question.id]) ? state.questions[question.id] : null;
  const status = saved && STATUS_SET.has(saved.status) ? saved.status : null;
  const confidence = saved && Number.isInteger(saved.confidence) ? saved.confidence : 0;
  return {
    pinned: Boolean(saved?.queuePinned),
    reviewOrLowConfidence: status === 'review' || (confidence > 0 && confidence <= 2),
    unseen: status === 'unseen',
    lastStudiedAt: typeof saved?.lastStudiedAt === 'string' ? saved.lastStudiedAt : null,
    order: question.order,
  };
}

function compareRecommendations(left, right, state) {
  const leftKey = recommendationKey(left, state);
  const rightKey = recommendationKey(right, state);
  for (const field of ['pinned', 'reviewOrLowConfidence', 'unseen']) {
    if (leftKey[field] !== rightKey[field]) return leftKey[field] ? -1 : 1;
  }
  if (leftKey.lastStudiedAt !== rightKey.lastStudiedAt) {
    if (leftKey.lastStudiedAt === null) return 1;
    if (rightKey.lastStudiedAt === null) return -1;
    return leftKey.lastStudiedAt.localeCompare(rightKey.lastStudiedAt);
  }
  return leftKey.order - rightKey.order;
}

function recommendedQuestions(questions, state, excludedIds = new Set()) {
  return questions
    .filter(({ id }) => !excludedIds.has(id))
    .sort((left, right) => compareRecommendations(left, right, state));
}

export function ensureDailyQueue(questions, state, candidate, date, now = new Date()) {
  const validIds = new Set(questions.map(({ id }) => id));
  if (isPlainObject(candidate) && candidate.date === date) {
    return normalizeInterviewQueue(candidate, date, validIds);
  }
  return {
    date,
    ids: recommendedQuestions(questions, state).slice(0, MAX_QUEUE_SIZE).map(({ id }) => id),
    completedIds: [],
    updatedAt: isoTimestamp(now),
  };
}

function changedQueue(queue, ids, completedIds, now) {
  return {
    date: queue.date,
    ids: [...ids],
    completedIds: [...completedIds],
    updatedAt: isoTimestamp(now),
  };
}

export function replaceQueueQuestion(queue, id, questions, state, now = new Date()) {
  const index = queue.ids.indexOf(id);
  const completed = new Set(queue.completedIds);
  if (index < 0 || completed.has(id) || Boolean(state?.questions?.[id]?.queuePinned)) {
    throw new RangeError('고정 또는 완료된 질문은 교체할 수 없습니다.');
  }
  const candidate = recommendedQuestions(questions, state, new Set(queue.ids))[0];
  if (!candidate) throw new RangeError('교체할 면접 질문이 없습니다.');
  const ids = [...queue.ids];
  ids[index] = candidate.id;
  return changedQueue(queue, ids, queue.completedIds, now);
}

export function addQuestionToQueue(queue, id, questions, state, now = new Date()) {
  if (queue.ids.includes(id)) return queue;
  if (!questions.some((question) => question.id === id)) {
    throw new RangeError('알 수 없는 면접 질문입니다.');
  }
  const ids = [...queue.ids];
  if (ids.length < MAX_QUEUE_SIZE) {
    ids.push(id);
  } else {
    const completed = new Set(queue.completedIds);
    let replaceIndex = -1;
    for (let index = ids.length - 1; index >= 0; index -= 1) {
      const queuedId = ids[index];
      if (!completed.has(queuedId) && !Boolean(state?.questions?.[queuedId]?.queuePinned)) {
        replaceIndex = index;
        break;
      }
    }
    if (replaceIndex < 0) throw new RangeError('오늘의 큐에 교체 가능한 질문이 없습니다.');
    ids[replaceIndex] = id;
  }
  return changedQueue(queue, ids, queue.completedIds, now);
}

export function setQueueCompleted(queue, id, completed, now = new Date()) {
  if (!queue.ids.includes(id)) throw new RangeError('오늘의 큐에 없는 질문입니다.');
  const completedSet = new Set(queue.completedIds);
  if (completed) completedSet.add(id);
  else completedSet.delete(id);
  const completedIds = queue.ids.filter((queuedId) => completedSet.has(queuedId));
  return changedQueue(queue, queue.ids, completedIds, now);
}
