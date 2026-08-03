import {
  QUIZ_FLOW_SESSION_VERSION,
  migrateLegacyQuizSession,
  normalizeQuizFlowSession,
  scoreQuizFlow,
} from './quiz-flow-core.js?v=8';
import { loadQuizSession } from './quiz-storage.js?v=8';

export const QUIZ_FLOW_STORAGE_NAMESPACE = 'job-prep-routine:quiz:v2';
export const QUIZ_FLOW_ATTEMPTS_KEY = `${QUIZ_FLOW_STORAGE_NAMESPACE}:attempts`;
const MAX_ATTEMPTS = 200;

function assertStorage(storage) {
  if (!storage || typeof storage.getItem !== 'function' || typeof storage.setItem !== 'function') {
    throw new TypeError('localStorage 호환 저장소가 필요합니다.');
  }
}

function segment(value) {
  if (typeof value !== 'string' || !value.trim()) throw new RangeError('저장 키 값이 필요합니다.');
  return encodeURIComponent(value.trim());
}

function parse(raw) {
  try {
    return typeof raw === 'string' && raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export const quizFlowSessionKey = (date, sourceId) => (
  `${QUIZ_FLOW_STORAGE_NAMESPACE}:session:${segment(date)}:${segment(sourceId)}`
);

const migrationKey = (date, sourceId) => (
  `${QUIZ_FLOW_STORAGE_NAMESPACE}:migration:${segment(date)}:${segment(sourceId)}`
);

export function loadQuizFlowSession(storage, date, sourceId, questions) {
  assertStorage(storage);
  const key = quizFlowSessionKey(date, sourceId);
  const current = normalizeQuizFlowSession(parse(storage.getItem(key)), questions);
  if (current) return current;
  if (storage.getItem(migrationKey(date, sourceId)) === 'done') return null;

  const validQuestionIds = new Set(questions.map(({ id }) => id));
  const legacy = loadQuizSession(storage, date, sourceId, validQuestionIds);
  const migrated = migrateLegacyQuizSession(legacy, questions);
  storage.setItem(migrationKey(date, sourceId), 'done');
  if (!migrated) return null;
  storage.setItem(key, JSON.stringify(migrated));
  return migrated;
}

export function saveQuizFlowSession(storage, session, questions) {
  assertStorage(storage);
  const normalized = normalizeQuizFlowSession(session, questions);
  if (!normalized) throw new TypeError('저장할 수 있는 QuizSession v2가 아닙니다.');
  storage.setItem(quizFlowSessionKey(normalized.date, normalized.primarySourceId), JSON.stringify(normalized));
  storage.setItem(migrationKey(normalized.date, normalized.primarySourceId), 'done');
  return normalized;
}

export function clearQuizFlowSession(storage, date, sourceId) {
  assertStorage(storage);
  if (typeof storage.removeItem !== 'function') throw new TypeError('삭제를 지원하는 저장소가 필요합니다.');
  storage.removeItem(quizFlowSessionKey(date, sourceId));
  storage.setItem(migrationKey(date, sourceId), 'done');
}

export function loadQuizFlowAttempts(storage, questions) {
  assertStorage(storage);
  const candidates = parse(storage.getItem(QUIZ_FLOW_ATTEMPTS_KEY));
  if (!Array.isArray(candidates)) return [];
  const seen = new Set();
  return candidates.flatMap((candidate) => {
    const session = normalizeQuizFlowSession(candidate?.session, questions);
    if (!session || typeof candidate.id !== 'string' || seen.has(candidate.id)) return [];
    seen.add(candidate.id);
    return [{
      version: QUIZ_FLOW_SESSION_VERSION,
      id: candidate.id,
      session,
      score: scoreQuizFlow(session, questions),
      savedAt: typeof candidate.savedAt === 'string' ? candidate.savedAt : session.updatedAt,
    }];
  }).slice(0, MAX_ATTEMPTS);
}

export function saveQuizFlowAttempt(storage, session, questions) {
  assertStorage(storage);
  const normalized = normalizeQuizFlowSession(session, questions);
  if (!normalized || !normalized.mainCompleted) {
    throw new TypeError('메인 문제를 완료한 QuizSession v2만 기록할 수 있습니다.');
  }
  const attempt = {
    version: QUIZ_FLOW_SESSION_VERSION,
    id: normalized.id,
    session: normalized,
    score: scoreQuizFlow(normalized, questions),
    savedAt: normalized.completedAt ?? normalized.updatedAt,
  };
  const previous = loadQuizFlowAttempts(storage, questions).filter(({ id }) => id !== attempt.id);
  storage.setItem(QUIZ_FLOW_ATTEMPTS_KEY, JSON.stringify([attempt, ...previous].slice(0, MAX_ATTEMPTS)));
  return attempt;
}

export class LocalQuizFlowStorage {
  constructor(storage) {
    assertStorage(storage);
    this.storage = storage;
  }

  loadSession(date, sourceId, questions) {
    return loadQuizFlowSession(this.storage, date, sourceId, questions);
  }

  saveSession(session, questions) {
    return saveQuizFlowSession(this.storage, session, questions);
  }

  clearSession(date, sourceId) {
    return clearQuizFlowSession(this.storage, date, sourceId);
  }

  loadAttempts(questions) {
    return loadQuizFlowAttempts(this.storage, questions);
  }

  saveAttempt(session, questions) {
    return saveQuizFlowAttempt(this.storage, session, questions);
  }
}

export const createLocalQuizFlowStorage = (storage) => new LocalQuizFlowStorage(storage);
