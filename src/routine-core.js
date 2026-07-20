import { LEARNING_TOPICS, MODES, getSchedule } from './routine-data.js';

export const storageKey = (page, date) => `job-prep-routine:${page}:${date}`;

export function localDateString(now = new Date()) {
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function logicalDateString(now = new Date(), cutoffHour = 2) {
  const logicalDate = new Date(now);
  if (logicalDate.getHours() < cutoffHour) logicalDate.setDate(logicalDate.getDate() - 1);
  return localDateString(logicalDate);
}

export function millisecondsUntilNextLogicalDay(now = new Date(), cutoffHour = 2) {
  const nextCutoff = new Date(now);
  nextCutoff.setHours(cutoffHour, 0, 0, 0);
  if (now >= nextCutoff) nextCutoff.setDate(nextCutoff.getDate() + 1);
  return nextCutoff.getTime() - now.getTime();
}

export function scheduleLogicalDayRollover(view, currentDate, now = () => new Date()) {
  let timer = null;
  let cancelled = false;
  let reloading = false;

  function reloadIfDateChanged(event) {
    if (reloading || logicalDateString(now()) === currentDate) return false;
    reloading = true;
    event?.preventDefault?.();
    event?.stopImmediatePropagation?.();
    view.location.reload();
    return true;
  }

  function scheduleNextCheck() {
    if (cancelled) return;
    timer = view.setTimeout(() => {
      timer = null;
      if (!reloadIfDateChanged()) scheduleNextCheck();
    }, millisecondsUntilNextLogicalDay(now()));
  }

  const guardedViewEvents = ['focus', 'pageshow', 'pointerdown', 'keydown', 'beforeinput', 'change'];
  for (const eventName of guardedViewEvents) {
    view.addEventListener?.(eventName, reloadIfDateChanged, true);
  }
  view.document?.addEventListener?.('visibilitychange', reloadIfDateChanged, true);
  scheduleNextCheck();

  return () => {
    cancelled = true;
    if (timer !== null) view.clearTimeout(timer);
    for (const eventName of guardedViewEvents) {
      view.removeEventListener?.(eventName, reloadIfDateChanged, true);
    }
    view.document?.removeEventListener?.('visibilitychange', reloadIfDateChanged, true);
  };
}

export function loadState(storage, page, date, fallback) {
  const raw = storage.getItem(storageKey(page, date));
  if (!raw) return structuredClone(fallback);
  try {
    return JSON.parse(raw);
  } catch {
    return structuredClone(fallback);
  }
}

export function saveState(storage, page, date, state) {
  storage.setItem(storageKey(page, date), JSON.stringify(state));
}

export function clearState(storage, page, date) {
  storage.removeItem(storageKey(page, date));
}

export function countPipelineProgress(companies) {
  const completedSteps = companies.reduce(
    (sum, company) => sum + ['analyzed', 'letter', 'applied'].filter((key) => company[key]).length,
    0,
  );
  return {
    applied: companies.filter((company) => company.applied).length,
    completedSteps,
    totalSteps: companies.length * 3,
  };
}

export function calculateDailyProgress(candidate = {}, scheduleItems = null) {
  const state = candidate && typeof candidate === 'object' && !Array.isArray(candidate) ? candidate : {};
  const mode = MODES.includes(state.mode) ? state.mode : MODES[0];
  const runStart = state.runStart === '22' ? '22' : '21';
  const usesPlanSchedule = Array.isArray(scheduleItems);
  const schedule = usesPlanSchedule ? scheduleItems : getSchedule(mode, runStart);
  const checkedIds = new Set(Array.isArray(state.checkedIds) ? state.checkedIds : []);
  const scheduleCompleted = schedule.filter(({ id }) => checkedIds.has(id)).length;
  const sourceCompanies = Array.isArray(state.companies) ? state.companies : [];
  const companies = Array.from({ length: 4 }, (_, index) => {
    const company = sourceCompanies[index];
    return company && typeof company === 'object' && !Array.isArray(company) ? company : {};
  });
  const pipeline = countPipelineProgress(companies);
  const sourceTopics = Array.isArray(state.learningTopics) ? state.learningTopics : [];
  const learningCompleted = usesPlanSchedule ? 0 : LEARNING_TOPICS.filter((topic) => sourceTopics.includes(topic)).length;
  const completed = scheduleCompleted + pipeline.completedSteps + learningCompleted;
  const total = schedule.length + pipeline.totalSteps + (usesPlanSchedule ? 0 : LEARNING_TOPICS.length);

  return {
    completed,
    total,
    percent: total === 0 ? 0 : Math.round((completed / total) * 100),
  };
}
