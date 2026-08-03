import {
  QUIZ_SESSION_VERSION,
  normalizeQuizSession,
} from './quiz-core.js?v=8';

export const QUIZ_STORAGE_NAMESPACE = 'job-prep-routine:quiz:v1';
export const QUIZ_ATTEMPTS_KEY = `${QUIZ_STORAGE_NAMESPACE}:attempts`;
export const QUIZ_MAX_SAVED_ATTEMPTS = 200;

function parseJson(raw) {
  if (typeof raw !== 'string' || !raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function assertStorage(storage) {
  if (!storage || typeof storage.getItem !== 'function' || typeof storage.setItem !== 'function') {
    throw new TypeError('localStorage 호환 저장소가 필요합니다.');
  }
}

function validSegment(value, label) {
  if (typeof value !== 'string' || value.trim() === '') throw new RangeError(`${label}이(가) 필요합니다.`);
  return encodeURIComponent(value.trim());
}

export const quizSessionKey = (date, primarySourceId) => (
  `${QUIZ_STORAGE_NAMESPACE}:session:${validSegment(date, '퀴즈 날짜')}:${validSegment(primarySourceId, '출처 ID')}`
);

export function loadQuizSession(storage, date, primarySourceId, validQuestionIds) {
  assertStorage(storage);
  const candidate = parseJson(storage.getItem(quizSessionKey(date, primarySourceId)));
  return normalizeQuizSession(candidate, validQuestionIds);
}

export function saveQuizSession(storage, session, validQuestionIds) {
  assertStorage(storage);
  const normalized = normalizeQuizSession(session, validQuestionIds);
  if (!normalized) throw new TypeError('저장할 수 있는 QuizSession v1이 아닙니다.');
  storage.setItem(
    quizSessionKey(normalized.date, normalized.primarySourceId),
    JSON.stringify(normalized),
  );
  return normalized;
}

export function clearQuizSession(storage, date, primarySourceId) {
  assertStorage(storage);
  if (typeof storage.removeItem !== 'function') throw new TypeError('삭제를 지원하는 저장소가 필요합니다.');
  storage.removeItem(quizSessionKey(date, primarySourceId));
}

function normalizeScore(candidate) {
  if (!candidate || typeof candidate !== 'object' || Array.isArray(candidate)) return null;
  const integerFields = ['total', 'answered', 'correct', 'incorrect', 'unanswered', 'percent'];
  if (integerFields.some((field) => !Number.isInteger(candidate[field]) || candidate[field] < 0)) return null;
  if (candidate.correct > candidate.total || candidate.answered > candidate.total || candidate.percent > 100) return null;
  if (candidate.correct + candidate.incorrect !== candidate.answered) return null;
  if (candidate.answered + candidate.unanswered !== candidate.total) return null;
  const expectedPercent = candidate.total === 0 ? 0 : Math.round((candidate.correct / candidate.total) * 100);
  if (candidate.percent !== expectedPercent) return null;
  return {
    version: candidate.version === QUIZ_SESSION_VERSION ? candidate.version : QUIZ_SESSION_VERSION,
    sessionId: typeof candidate.sessionId === 'string' ? candidate.sessionId : '',
    throughStage: candidate.throughStage === 2 ? 2 : 1,
    total: candidate.total,
    answered: candidate.answered,
    correct: candidate.correct,
    incorrect: candidate.incorrect,
    unanswered: candidate.unanswered,
    percent: candidate.percent,
    stageBreakdown: Array.isArray(candidate.stageBreakdown) ? structuredClone(candidate.stageBreakdown) : [],
  };
}

function normalizeQuestionProvenance(candidate, session, score) {
  const gradedIds = new Set(session.questionIds.slice(0, score.throughStage * 5));
  const entries = Array.isArray(candidate) ? candidate : [];
  const normalized = [];
  const seen = new Set();
  for (const item of entries) {
    if (!item || typeof item !== 'object' || Array.isArray(item)) continue;
    if (typeof item.questionId !== 'string' || !gradedIds.has(item.questionId) || seen.has(item.questionId)) continue;
    seen.add(item.questionId);
    normalized.push({
      questionId: item.questionId,
      sourceId: typeof item.sourceId === 'string' ? item.sourceId : '',
      sourceCommit: typeof item.sourceCommit === 'string' ? item.sourceCommit : '',
      origin: typeof item.origin === 'string' ? item.origin : '',
      generationModel: typeof item.generationModel === 'string' ? item.generationModel : '',
      validatorModel: typeof item.validatorModel === 'string' ? item.validatorModel : '',
      promptVersion: typeof item.promptVersion === 'string' ? item.promptVersion : '',
    });
  }
  return normalized;
}

function normalizeAttempt(candidate, validQuestionIds) {
  if (!candidate || typeof candidate !== 'object' || Array.isArray(candidate)) return null;
  const session = normalizeQuizSession(candidate.session, validQuestionIds);
  const score = normalizeScore(candidate.score);
  if (!session || !score) return null;
  const gradedStage = session.status === 'completed'
    ? (session.questionIds.length > 5 ? 2 : 1)
    : (session.status === 'stage-one-graded' ? 1 : 0);
  const expectedTotal = Math.min(session.questionIds.length, gradedStage * 5);
  if (gradedStage === 0
    || score.throughStage !== gradedStage
    || score.total !== expectedTotal
    || score.answered !== expectedTotal
    || !session.revealedStages.includes(gradedStage)) return null;
  return {
    version: QUIZ_SESSION_VERSION,
    id: typeof candidate.id === 'string' && candidate.id ? candidate.id : session.id,
    session,
    score,
    savedAt: typeof candidate.savedAt === 'string'
      ? candidate.savedAt
      : (session.completedAt ?? session.updatedAt),
    sourceCommit: typeof candidate.sourceCommit === 'string' ? candidate.sourceCommit : '',
    generationModel: typeof candidate.generationModel === 'string' ? candidate.generationModel : '',
    validatorModel: typeof candidate.validatorModel === 'string' ? candidate.validatorModel : '',
    promptVersion: typeof candidate.promptVersion === 'string' ? candidate.promptVersion : '',
    questionProvenance: normalizeQuestionProvenance(candidate.questionProvenance, session, score),
  };
}

export function loadQuizAttempts(storage, validQuestionIds) {
  assertStorage(storage);
  const parsed = parseJson(storage.getItem(QUIZ_ATTEMPTS_KEY));
  const candidates = Array.isArray(parsed) ? parsed : [];
  const attempts = [];
  const seen = new Set();
  for (const candidate of candidates) {
    const attempt = normalizeAttempt(candidate, validQuestionIds);
    if (!attempt || seen.has(attempt.id)) continue;
    seen.add(attempt.id);
    attempts.push(attempt);
    if (attempts.length >= QUIZ_MAX_SAVED_ATTEMPTS) break;
  }
  return attempts;
}

export function saveQuizAttempt(storage, attempt, validQuestionIds) {
  assertStorage(storage);
  const normalized = normalizeAttempt(attempt, validQuestionIds);
  if (!normalized) throw new TypeError('채점된 퀴즈 시도만 저장할 수 있습니다.');
  const previous = loadQuizAttempts(storage, validQuestionIds)
    .filter(({ id }) => id !== normalized.id);
  const attempts = [normalized, ...previous].slice(0, QUIZ_MAX_SAVED_ATTEMPTS);
  storage.setItem(QUIZ_ATTEMPTS_KEY, JSON.stringify(attempts));
  return normalized;
}

export class LocalQuizStorage {
  constructor(storage) {
    assertStorage(storage);
    this.storage = storage;
  }

  loadSession(date, primarySourceId, validQuestionIds) {
    return loadQuizSession(this.storage, date, primarySourceId, validQuestionIds);
  }

  saveSession(session, validQuestionIds) {
    return saveQuizSession(this.storage, session, validQuestionIds);
  }

  clearSession(date, primarySourceId) {
    return clearQuizSession(this.storage, date, primarySourceId);
  }

  loadAttempts(validQuestionIds) {
    return loadQuizAttempts(this.storage, validQuestionIds);
  }

  saveAttempt(attempt, validQuestionIds) {
    return saveQuizAttempt(this.storage, attempt, validQuestionIds);
  }
}

export const createLocalQuizStorage = (storage) => new LocalQuizStorage(storage);
