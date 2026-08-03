import {
  READING_STATE_KEY,
  normalizeReadingPlan,
  normalizeReadingState,
  readingPlanKey,
} from './reading-core.js';

function parseJson(raw) {
  if (typeof raw !== 'string' || !raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function isStoredPlan(candidate, date) {
  return candidate !== null
    && typeof candidate === 'object'
    && !Array.isArray(candidate)
    && candidate.date === date
    && Array.isArray(candidate.ids)
    && Array.isArray(candidate.completedIds);
}

export function loadReadingState(storage, validIds) {
  return normalizeReadingState(parseJson(storage.getItem(READING_STATE_KEY)), validIds);
}

export function saveReadingState(storage, state, validIds) {
  const normalized = normalizeReadingState(state, validIds);
  storage.setItem(READING_STATE_KEY, JSON.stringify(normalized));
  return normalized;
}

export function loadReadingPlan(storage, date, validIds) {
  const candidate = parseJson(storage.getItem(readingPlanKey(date)));
  return isStoredPlan(candidate, date) ? normalizeReadingPlan(candidate, date, validIds) : null;
}

export function saveReadingPlan(storage, plan, date, validIds) {
  const normalized = normalizeReadingPlan(plan, date, validIds);
  storage.setItem(readingPlanKey(date), JSON.stringify(normalized));
  return normalized;
}
