import {
  INTERVIEW_STATE_KEY,
  ensureDailyQueue,
  interviewQueueKey,
  normalizeInterviewQueue,
  normalizeInterviewState,
} from './interview-core.js';

function parseJson(raw) {
  if (typeof raw !== 'string' || !raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function isValidStoredQueue(candidate, date, validIds) {
  if (candidate === null || typeof candidate !== 'object' || Array.isArray(candidate)) return false;
  if (candidate.date !== date || !Array.isArray(candidate.ids) || !Array.isArray(candidate.completedIds)) {
    return false;
  }
  if (candidate.ids.length > 5 || (candidate.ids.length === 0 && validIds.size > 0)) return false;

  const ids = new Set();
  for (const id of candidate.ids) {
    if (typeof id !== 'string' || !validIds.has(id) || ids.has(id)) return false;
    ids.add(id);
  }
  const completedIds = new Set();
  for (const id of candidate.completedIds) {
    if (typeof id !== 'string' || !ids.has(id) || completedIds.has(id)) return false;
    completedIds.add(id);
  }
  return typeof candidate.updatedAt === 'string' || candidate.updatedAt === null;
}

export function loadInterviewState(storage, validIds) {
  return normalizeInterviewState(parseJson(storage.getItem(INTERVIEW_STATE_KEY)), validIds);
}

export function saveInterviewState(storage, state, validIds) {
  const normalized = normalizeInterviewState(state, validIds);
  storage.setItem(INTERVIEW_STATE_KEY, JSON.stringify(normalized));
  return normalized;
}

export function loadInterviewQueue(storage, date, validIds) {
  return normalizeInterviewQueue(parseJson(storage.getItem(interviewQueueKey(date))), date, validIds);
}

export function saveInterviewQueue(storage, queue, date, validIds) {
  const normalized = normalizeInterviewQueue(queue, date, validIds);
  storage.setItem(interviewQueueKey(date), JSON.stringify(normalized));
  return normalized;
}

export function loadOrCreateDailyQueue(
  storage,
  questions,
  state,
  date,
  validIds,
  now = new Date(),
  onStorageError,
) {
  let candidate;
  try {
    candidate = parseJson(storage.getItem(interviewQueueKey(date)));
  } catch (error) {
    if (typeof onStorageError !== 'function') throw error;
    onStorageError(error);
    return ensureDailyQueue(questions, state, null, date, now);
  }

  if (isValidStoredQueue(candidate, date, validIds)) {
    return normalizeInterviewQueue(candidate, date, validIds);
  }

  const created = ensureDailyQueue(questions, state, null, date, now);
  try {
    return saveInterviewQueue(storage, created, date, validIds);
  } catch (error) {
    if (typeof onStorageError !== 'function') throw error;
    onStorageError(error);
    return created;
  }
}
