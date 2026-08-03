import {
  appendStudyAttempt,
  cloneStudyHistory,
  listInterruptedSessions,
  listStudyAttempts,
  normalizeStudyHistoryState,
  summarizeStudyHistory,
} from './study-history-core.js';

export const STUDY_HISTORY_STORAGE_NAMESPACE = 'job-prep-routine:study-history:v1';
export const STUDY_HISTORY_STORAGE_KEY = STUDY_HISTORY_STORAGE_NAMESPACE;
export const STUDY_HISTORY_MAX_ATTEMPTS = 2000;

function parseJson(raw) {
  if (typeof raw !== 'string' || raw.trim() === '') return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function assertStorage(storage) {
  if (!storage || typeof storage.getItem !== 'function' || typeof storage.setItem !== 'function') {
    throw new TypeError('localStorage 호환 학습 기록 저장소가 필요합니다.');
  }
  return storage;
}

function capped(state) {
  const normalized = normalizeStudyHistoryState(state);
  return normalizeStudyHistoryState({ attempts: normalized.attempts.slice(0, STUDY_HISTORY_MAX_ATTEMPTS) });
}

export function loadStudyHistory(storage) {
  assertStorage(storage);
  return cloneStudyHistory(capped(parseJson(storage.getItem(STUDY_HISTORY_STORAGE_KEY))));
}

export function saveStudyAttempt(storage, attempt) {
  assertStorage(storage);
  const next = capped(appendStudyAttempt(loadStudyHistory(storage), attempt));
  storage.setItem(STUDY_HISTORY_STORAGE_KEY, JSON.stringify(next));
  return cloneStudyHistory(next.attempts.find(({ id }) => id === attempt.id));
}

export class LocalStudyHistoryStorage {
  constructor(storage = globalThis.localStorage) {
    this.storage = assertStorage(storage);
  }

  loadAll() {
    return loadStudyHistory(this.storage);
  }

  list(filters) {
    return cloneStudyHistory(listStudyAttempts(this.loadAll(), filters));
  }

  save(attempt) {
    return saveStudyAttempt(this.storage, attempt);
  }

  listInterrupted() {
    return cloneStudyHistory(listInterruptedSessions(this.loadAll()));
  }

  summarize(filters) {
    return summarizeStudyHistory(this.loadAll(), filters);
  }
}

export const createLocalStudyHistoryStorage = (storage) => new LocalStudyHistoryStorage(storage);
