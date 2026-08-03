import { logicalDateString } from './routine-core.js';

export const STUDY_HISTORY_VERSION = 1;
export const STUDY_ATTEMPT_KINDS = Object.freeze([
  'reading',
  'quiz-main',
  'quiz-follow-up',
  'interview-self',
  'interview-ai',
]);

const ATTEMPT_KIND_SET = new Set(STUDY_ATTEMPT_KINDS);
const QUIZ_KIND_SET = new Set(['quiz-main', 'quiz-follow-up']);
const ATTEMPT_STATUS_SET = new Set(['completed', 'interrupted']);

function isPlainObject(value) {
  if (value === null || typeof value !== 'object' || Array.isArray(value)) return false;
  const prototype = Object.getPrototypeOf(value);
  return prototype === Object.prototype || prototype === null;
}

function clone(value) {
  return typeof structuredClone === 'function'
    ? structuredClone(value)
    : JSON.parse(JSON.stringify(value));
}

function deepFreeze(value) {
  if (value && typeof value === 'object' && !Object.isFrozen(value)) {
    Object.freeze(value);
    for (const item of Object.values(value)) deepFreeze(item);
  }
  return value;
}

function nonEmptyString(value) {
  return typeof value === 'string' && value.trim() !== '' ? value.trim() : '';
}

function validTimestamp(value) {
  return typeof value === 'string' && !Number.isNaN(Date.parse(value)) ? value : null;
}

function uniqueStrings(value) {
  const seen = new Set();
  return (Array.isArray(value) ? value : []).filter((item) => {
    const normalized = nonEmptyString(item);
    if (!normalized || seen.has(normalized)) return false;
    seen.add(normalized);
    return true;
  });
}

function normalizeMetadata(value) {
  if (!isPlainObject(value)) return {};
  const normalized = {};
  for (const [key, item] of Object.entries(value)) {
    if (!nonEmptyString(key)) continue;
    if (typeof item === 'string' || typeof item === 'boolean' || Number.isFinite(item) || item === null) {
      normalized[key] = item;
    }
  }
  return normalized;
}

function normalizeQuestionResult(candidate) {
  if (!isPlainObject(candidate)) return null;
  const questionId = nonEmptyString(candidate.questionId);
  const sourceId = nonEmptyString(candidate.sourceId);
  if (!questionId || !sourceId) return null;
  if (candidate.selectedIndex !== undefined
    && (!Number.isInteger(candidate.selectedIndex) || candidate.selectedIndex < 0 || candidate.selectedIndex >= 4)) {
    return null;
  }
  if (candidate.correctIndex !== undefined
    && (!Number.isInteger(candidate.correctIndex) || candidate.correctIndex < 0 || candidate.correctIndex >= 4)) {
    return null;
  }
  const selectedIndex = Number.isInteger(candidate.selectedIndex) && candidate.selectedIndex >= 0 && candidate.selectedIndex < 4
    ? candidate.selectedIndex
    : null;
  const correctIndex = Number.isInteger(candidate.correctIndex) && candidate.correctIndex >= 0 && candidate.correctIndex < 4
    ? candidate.correctIndex
    : null;
  if (selectedIndex === null && correctIndex === null) return null;
  if (correctIndex === null && selectedIndex !== null) return null;
  return {
    questionId,
    sourceId,
    selectedIndex,
    correctIndex,
    isCorrect: selectedIndex !== null && selectedIndex === correctIndex,
  };
}

function normalizeQuestionResults(value) {
  const seen = new Set();
  const results = [];
  for (const candidate of Array.isArray(value) ? value : []) {
    const result = normalizeQuestionResult(candidate);
    if (!result || seen.has(result.questionId)) continue;
    seen.add(result.questionId);
    results.push(result);
  }
  return results;
}

function scoreFromResults(results) {
  const total = results.length;
  const answered = results.filter(({ selectedIndex }) => selectedIndex !== null).length;
  const correct = results.filter(({ isCorrect }) => isCorrect).length;
  const incorrect = answered - correct;
  const unanswered = total - answered;
  return {
    total,
    correct,
    incorrect,
    unanswered,
    percent: total === 0 ? 0 : Math.round((correct / total) * 100),
  };
}

function normalizeResume(value) {
  if (!isPlainObject(value)) return null;
  const sessionId = nonEmptyString(value.sessionId);
  const nextQuestionIndex = value.nextQuestionIndex;
  if (!sessionId || !Number.isInteger(nextQuestionIndex) || nextQuestionIndex < 0) return null;
  return { sessionId, nextQuestionIndex };
}

function attemptTime(candidate) {
  return validTimestamp(candidate?.completedAt) ?? validTimestamp(candidate?.startedAt);
}

export function logicalStudyDate(now = new Date()) {
  return logicalDateString(now, 2);
}

/**
 * 학습 시도는 한 번 저장하면 변경하지 않는 이벤트 스냅샷이다.
 * 퀴즈의 선택/정답 결과와 원문·문항 은행 버전을 함께 보관한다.
 */
export function normalizeStudyAttempt(candidate) {
  if (!isPlainObject(candidate)) return null;
  const id = nonEmptyString(candidate.id);
  const kind = nonEmptyString(candidate.kind);
  const status = candidate.status === undefined ? 'completed' : candidate.status;
  const startedAt = validTimestamp(candidate.startedAt);
  const completedAt = validTimestamp(candidate.completedAt);
  const sourceIds = uniqueStrings(candidate.sourceIds);
  const questionResults = normalizeQuestionResults(candidate.questionResults);
  const questionIds = uniqueStrings([
    ...(Array.isArray(candidate.questionIds) ? candidate.questionIds : []),
    ...questionResults.map(({ questionId }) => questionId),
  ]);
  const sourceCommit = nonEmptyString(candidate.sourceCommit);
  if (!id || !ATTEMPT_KIND_SET.has(kind) || !ATTEMPT_STATUS_SET.has(status) || sourceIds.length === 0 || !sourceCommit) {
    return null;
  }
  if (status === 'completed' && !completedAt) return null;
  const resume = normalizeResume(candidate.resume);
  if (status === 'interrupted' && !resume) return null;
  if (status === 'completed' && resume) return null;
  if (QUIZ_KIND_SET.has(kind) && status === 'completed' && questionResults.length === 0) return null;
  if (!QUIZ_KIND_SET.has(kind) && questionResults.length > 0) return null;
  const followUpOf = kind === 'quiz-follow-up' ? nonEmptyString(candidate.followUpOf) : '';
  if (kind === 'quiz-follow-up' && !followUpOf) return null;
  const timestamp = completedAt ?? startedAt;
  if (!timestamp) return null;
  const logicalDate = logicalStudyDate(new Date(timestamp));
  const normalized = {
    version: STUDY_HISTORY_VERSION,
    id,
    kind,
    status,
    logicalDate,
    startedAt,
    completedAt,
    sourceIds,
    questionIds,
    questionResults,
    score: QUIZ_KIND_SET.has(kind) ? scoreFromResults(questionResults) : null,
    followUpOf: followUpOf || null,
    resume,
    bankVersion: nonEmptyString(candidate.bankVersion),
    sourceCommit,
    modelVersion: nonEmptyString(candidate.modelVersion),
    promptVersion: nonEmptyString(candidate.promptVersion),
    metadata: normalizeMetadata(candidate.metadata),
  };
  return deepFreeze(normalized);
}

export function createStudyAttempt(input) {
  const normalized = normalizeStudyAttempt(input);
  if (!normalized) throw new TypeError('저장할 학습 시도 기록이 올바르지 않습니다.');
  return normalized;
}

export function createEmptyStudyHistoryState() {
  return deepFreeze({ version: STUDY_HISTORY_VERSION, attempts: [] });
}

/** v0 배열과 { records } 형태를 읽기 전용으로 v1 상태에 이관한다. */
export function normalizeStudyHistoryState(candidate) {
  const rawAttempts = Array.isArray(candidate)
    ? candidate
    : (isPlainObject(candidate) && Array.isArray(candidate.attempts)
      ? candidate.attempts
      : (isPlainObject(candidate) && Array.isArray(candidate.records) ? candidate.records : []));
  const attempts = [];
  const seen = new Set();
  for (const candidateAttempt of rawAttempts) {
    const attempt = normalizeStudyAttempt(candidateAttempt);
    if (!attempt || seen.has(attempt.id)) continue;
    seen.add(attempt.id);
    attempts.push(attempt);
  }
  attempts.sort((left, right) => (attemptTime(right) ?? '').localeCompare(attemptTime(left) ?? ''));
  return deepFreeze({ version: STUDY_HISTORY_VERSION, attempts });
}

export function appendStudyAttempt(state, attempt) {
  const normalizedState = normalizeStudyHistoryState(state);
  const normalizedAttempt = normalizeStudyAttempt(attempt);
  if (!normalizedAttempt) throw new TypeError('저장할 학습 시도 기록이 올바르지 않습니다.');
  if (normalizedState.attempts.some(({ id }) => id === normalizedAttempt.id)) {
    throw new RangeError('이미 저장된 학습 시도 ID입니다. 기록은 수정하거나 덮어쓸 수 없습니다.');
  }
  return normalizeStudyHistoryState({ attempts: [normalizedAttempt, ...normalizedState.attempts] });
}

export function listStudyAttempts(state, filters = {}) {
  const normalized = normalizeStudyHistoryState(state);
  const kinds = new Set(Array.isArray(filters.kinds) ? filters.kinds : [filters.kind].filter(Boolean));
  return normalized.attempts.filter((attempt) => {
    if (kinds.size > 0 && !kinds.has(attempt.kind)) return false;
    if (nonEmptyString(filters.status) && attempt.status !== filters.status) return false;
    if (nonEmptyString(filters.date) && attempt.logicalDate !== filters.date) return false;
    if (nonEmptyString(filters.sourceId) && !attempt.sourceIds.includes(filters.sourceId)) return false;
    return true;
  });
}

export function listInterruptedSessions(state) {
  return listStudyAttempts(state, { status: 'interrupted' });
}

export function collectWrongAnswers(state, filters = {}) {
  return listStudyAttempts(state, filters)
    .flatMap((attempt) => attempt.questionResults
      .filter(({ selectedIndex, isCorrect }) => selectedIndex !== null && !isCorrect)
      .map((result) => ({
        attemptId: attempt.id,
        attemptedAt: attempt.completedAt ?? attempt.startedAt,
        logicalDate: attempt.logicalDate,
        kind: attempt.kind,
        ...result,
      })))
    .sort((left, right) => right.attemptedAt.localeCompare(left.attemptedAt));
}

export function summarizeStudyHistory(state, filters = {}) {
  const attempts = listStudyAttempts(state, filters);
  const quizAttempts = attempts.filter(({ kind, status }) => QUIZ_KIND_SET.has(kind) && status === 'completed');
  const quizAnswered = quizAttempts.reduce((total, { score }) => total + score.total - score.unanswered, 0);
  const quizCorrect = quizAttempts.reduce((total, { score }) => total + score.correct, 0);
  return {
    date: nonEmptyString(filters.date) || null,
    attempts: attempts.length,
    reading: attempts.filter(({ kind }) => kind === 'reading').length,
    quizMain: attempts.filter(({ kind }) => kind === 'quiz-main').length,
    quizFollowUp: attempts.filter(({ kind }) => kind === 'quiz-follow-up').length,
    interviewSelf: attempts.filter(({ kind }) => kind === 'interview-self').length,
    interviewAi: attempts.filter(({ kind }) => kind === 'interview-ai').length,
    quizAnswered,
    quizCorrect,
    quizPercent: quizAnswered === 0 ? 0 : Math.round((quizCorrect / quizAnswered) * 100),
  };
}

export function cloneStudyHistory(value) {
  return clone(value);
}
