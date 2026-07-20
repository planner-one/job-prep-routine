import {
  INTERVIEW_STATE_KEY,
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
