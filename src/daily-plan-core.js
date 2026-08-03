import {
  getDayTimeline,
  normalizeWeeklyState,
  weekMondayKey,
  weekdayIdForDate,
} from './weekly-plan-core.js';
import { getSchedule } from './routine-data.js';
import { storageKey } from './routine-core.js';

const SNAPSHOT_CATEGORIES = new Set(['career', 'exercise', 'meal']);
const SNAPSHOT_DAY_IDS = new Set(['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']);
const REVIEW_IDS = new Set(['portfolio-review', 'maintenance-portfolio']);
const INTERVIEW_IDS = new Set(['interview-practice', 'maintenance-interview']);
const LEGACY_LEARNING_IDS = new Set([
  'learning',
  'maintenance-learning',
  'maintenance-planning',
  'Spring',
  'Redis',
  'Java',
  '프로젝트 적용',
  'CS',
  '코딩테스트',
]);

function addLocalDays(dateKey, offset) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dateKey);
  if (!match) return null;
  const [, year, month, day] = match.map(Number);
  const date = new Date(year, month - 1, day, 12);
  if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) return null;
  date.setDate(date.getDate() + offset);
  return [date.getFullYear(), date.getMonth() + 1, date.getDate()]
    .map((part, index) => String(part).padStart(index === 0 ? 4 : 2, '0'))
    .join('-');
}

function safeParse(raw) {
  try {
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

function emptyWeeklyProgress() {
  return {
    applications: 0,
    reviews: 0,
    interviews: 0,
    workouts: 0,
    runs: 0,
  };
}

function mergeExecutionSummary(result, summary) {
  for (const metric of ['applications', 'reviews', 'interviews', 'workouts', 'runs']) {
    result[metric] += summary[metric];
  }
}

function isObject(value) {
  return value && typeof value === 'object' && !Array.isArray(value);
}

function isLegacyLearningId(value) {
  return typeof value === 'string' && (value.startsWith('learning:') || LEGACY_LEARNING_IDS.has(value));
}

function isLegacyLearningItem(value) {
  return isObject(value) && (value.category === 'learning' || isLegacyLearningId(value.id));
}

function withoutLegacyLearningFields(value) {
  if (!isObject(value)) return {};
  const { learningTopics, learningReview, learning, ...rest } = value;
  return rest;
}

function validMinute(value) {
  return Number.isInteger(value) && value >= 0 && value <= 1440;
}

function validWeekKey(value) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value ?? '');
  if (!match) return false;
  const [, year, month, day] = match.map(Number);
  const date = new Date(year, month - 1, day, 12);
  return date.getFullYear() === year
    && date.getMonth() === month - 1
    && date.getDate() === day
    && date.getDay() === 1;
}

function normalizeSnapshotItem(candidate) {
  if (!isObject(candidate)) return null;
  if (typeof candidate.id !== 'string' || !candidate.id.trim()) return null;
  if (isLegacyLearningItem(candidate)) return null;
  if (typeof candidate.label !== 'string' || !candidate.label.trim()) return null;
  if (!SNAPSHOT_CATEGORIES.has(candidate.category)) return null;
  if (!validMinute(candidate.startMinute) || !validMinute(candidate.endMinute) || candidate.endMinute < candidate.startMinute) return null;
  return {
    id: candidate.id,
    label: candidate.label,
    category: candidate.category,
    startMinute: candidate.startMinute,
    endMinute: candidate.endMinute,
  };
}

function normalizeArchivedItem(candidate) {
  if (!isObject(candidate) || typeof candidate.id !== 'string' || !candidate.id.trim()) return null;
  if (isLegacyLearningItem(candidate)) return null;
  const item = { id: candidate.id };
  if (typeof candidate.label === 'string') item.label = candidate.label;
  if (SNAPSHOT_CATEGORIES.has(candidate.category)) item.category = candidate.category;
  if (validMinute(candidate.startMinute) && validMinute(candidate.endMinute) && candidate.endMinute >= candidate.startMinute) {
    item.startMinute = candidate.startMinute;
    item.endMinute = candidate.endMinute;
  }
  return item;
}

function normalizedArchivedItems(candidate) {
  const seen = new Set();
  return (Array.isArray(candidate) ? candidate : [])
    .map(normalizeArchivedItem)
    .filter((item) => item && !seen.has(item.id) && seen.add(item.id));
}

function normalizedCheckedIds(candidate) {
  const seen = new Set();
  return (Array.isArray(candidate) ? candidate : [])
    .filter((id) => typeof id === 'string' && !isLegacyLearningId(id) && !seen.has(id) && seen.add(id));
}

function normalizedStateCheckedIds(source) {
  const learningIds = new Set([
    ...(Array.isArray(source?.planSnapshot?.items) ? source.planSnapshot.items : []),
    ...(Array.isArray(source?.archivedCompletedItems) ? source.archivedCompletedItems : []),
  ].filter(isLegacyLearningItem).map(({ id }) => id));
  return normalizedCheckedIds(source?.checkedIds).filter((id) => !learningIds.has(id));
}

function normalizedDailyPlanState(candidate) {
  const source = isObject(candidate) ? candidate : {};
  return {
    ...withoutLegacyLearningFields(source),
    checkedIds: normalizedStateCheckedIds(source),
    planSnapshot: normalizePlanSnapshot(source.planSnapshot),
    archivedCompletedItems: normalizedArchivedItems(source.archivedCompletedItems),
  };
}

export function resolveDailyPlan(date, weeklyCandidate) {
  const weekly = normalizeWeeklyState(weeklyCandidate);
  const dayId = weekdayIdForDate(date);
  const day = weekly.days[dayId];
  return {
    weekKey: weekMondayKey(date),
    dayId,
    revision: day.revision,
    mode: dayId === weekly.maintenanceDay ? 'maintenance' : day.mode,
    runStart: day.runStart,
    items: getDayTimeline(day).filter(({ unscheduled }) => !unscheduled),
  };
}

export function resolveLegacyDailyPlan(date, dailyCandidate, revision = 0) {
  const source = isObject(dailyCandidate) ? dailyCandidate : {};
  const dayId = weekdayIdForDate(date);
  const maintenanceDay = source.mode === 'maintenance' ? dayId : (dayId === 'sun' ? 'sat' : 'sun');
  const weekly = normalizeWeeklyState({
    selectedDay: dayId,
    maintenanceDay,
    days: { [dayId]: { mode: source.mode, runStart: source.runStart } },
  });
  const day = weekly.days[dayId];

  weekly.days[dayId] = {
    ...day,
    revision: Number.isInteger(revision) && revision >= 0 ? revision : 0,
  };
  return resolveDailyPlan(date, weekly);
}

function legacyAnchorId(item) {
  if (!item) return null;
  if (/sleep/.test(item.id)) return 'sleep';
  if (item.category !== 'meal') return null;
  if (item.time.startsWith('13:')) return 'lunch';
  if (item.time.startsWith('18:') || item.time.startsWith('19:')) return 'dinner';
  return 'breakfast';
}

export function migrateLegacyDailyState(date, dailyCandidate, revision = 0) {
  const source = isObject(dailyCandidate) ? dailyCandidate : {};
  const cleanSource = withoutLegacyLearningFields(source);
  const planSnapshot = resolveLegacyDailyPlan(date, source, revision);
  const snapshotIds = new Set(planSnapshot.items.map(({ id }) => id));
  const legacyItems = new Map(getSchedule(planSnapshot.mode, planSnapshot.runStart).map((item) => [item.id, item]));
  const checkedIds = [];
  const checked = new Set();
  const archivedCompletedItems = normalizedArchivedItems(source.archivedCompletedItems);
  const archivedIds = new Set(archivedCompletedItems.map(({ id }) => id));

  function archive(item) {
    if (!item || isLegacyLearningItem(item) || archivedIds.has(item.id)) return;
    archivedCompletedItems.push({ id: item.id, label: item.label, category: item.category });
    archivedIds.add(item.id);
  }

  for (const id of normalizedStateCheckedIds(source)) {
    const legacyItem = legacyItems.get(id);
    const mappedId = snapshotIds.has(id)
      ? id
      : legacyAnchorId(legacyItem);
    if (mappedId && snapshotIds.has(mappedId)) {
      if (checked.has(mappedId)) archive(legacyItem);
      else {
        checked.add(mappedId);
        checkedIds.push(mappedId);
      }
      continue;
    }
    if (legacyItem) archive(legacyItem);
    else if (!checked.has(id)) {
      checked.add(id);
      checkedIds.push(id);
    }
  }
  return {
    ...cleanSource,
    checkedIds,
    planSnapshot,
    archivedCompletedItems,
  };
}

export function normalizePlanSnapshot(candidate) {
  if (!isObject(candidate) || !Number.isInteger(candidate.revision) || candidate.revision < 0 || !Array.isArray(candidate.items)) return null;
  const hasWeekKey = Object.hasOwn(candidate, 'weekKey');
  const hasDayId = Object.hasOwn(candidate, 'dayId');
  if (hasWeekKey && !validWeekKey(candidate.weekKey)) return null;
  if (hasDayId && !SNAPSHOT_DAY_IDS.has(candidate.dayId)) return null;
  const seen = new Set();
  return {
    ...(hasWeekKey ? { weekKey: candidate.weekKey } : {}),
    ...(hasDayId ? { dayId: candidate.dayId } : {}),
    revision: candidate.revision,
    items: candidate.items
      .map(normalizeSnapshotItem)
      .filter((item) => item && !seen.has(item.id) && seen.add(item.id)),
  };
}

function plansHaveSameContent(left, right) {
  if (!left || !right || left.items.length !== right.items.length) return false;
  return left.items.every((item, index) => {
    const other = right.items[index];
    return item.id === other.id
      && item.label === other.label
      && item.category === other.category
      && item.startMinute === other.startMinute
      && item.endMinute === other.endMinute;
  });
}

export function hasExecutionInput(state = {}) {
  const source = isObject(state) ? state : {};
  const companies = Array.isArray(source.companies) ? source.companies : [];
  const memos = isObject(source.memos) ? source.memos : {};
  return Boolean(
    normalizedStateCheckedIds(source).length ||
    companies.some((company) => company?.name || company?.link || company?.analyzed || company?.letter || company?.applied) ||
    Object.values(memos).some((value) => typeof value === 'string' && value.trim()),
  );
}

export function prepareDailyPlan(state, resolvedPlan) {
  const source = isObject(state) ? state : {};
  const snapshot = normalizePlanSnapshot(source.planSnapshot);
  const normalizedState = normalizedDailyPlanState(source);
  if (!snapshot || !hasExecutionInput(source)) {
    return { state: normalizedState, renderPlan: resolvedPlan, needsPlanUpdate: false };
  }
  const resolvedSnapshot = normalizePlanSnapshot(resolvedPlan);
  return {
    state: normalizedState,
    renderPlan: snapshot,
    needsPlanUpdate: snapshot.weekKey !== resolvedSnapshot?.weekKey
      || snapshot.dayId !== resolvedSnapshot?.dayId
      || snapshot.revision !== resolvedSnapshot?.revision
      || !plansHaveSameContent(snapshot, resolvedSnapshot),
  };
}

export function applyUpdatedPlan(dailyState, resolvedPlan) {
  const source = isObject(dailyState) ? dailyState : {};
  const cleanSource = withoutLegacyLearningFields(source);
  const nextSnapshot = normalizePlanSnapshot(resolvedPlan);
  if (!nextSnapshot) return normalizedDailyPlanState(source);

  const previousSnapshot = normalizePlanSnapshot(source.planSnapshot);
  const checkedIds = normalizedStateCheckedIds(source);
  const checked = new Set(checkedIds);
  const nextIds = new Set(nextSnapshot.items.map(({ id }) => id));
  const archived = normalizedArchivedItems(source.archivedCompletedItems);
  const archivedIds = new Set(archived.map(({ id }) => id));

  for (const item of previousSnapshot?.items ?? []) {
    if (!checked.has(item.id) || nextIds.has(item.id) || archivedIds.has(item.id)) continue;
    archived.push(item);
    archivedIds.add(item.id);
  }

  return {
    ...cleanSource,
    checkedIds,
    planSnapshot: nextSnapshot,
    archivedCompletedItems: archived,
  };
}

export function buildDailyExecutionSummary(dailyState) {
  const source = isObject(dailyState) ? dailyState : {};
  const snapshot = normalizePlanSnapshot(source.planSnapshot);
  const checked = new Set(normalizedStateCheckedIds(source));
  const companies = Array.isArray(source.companies) ? source.companies : [];
  const summary = {
    applications: companies.filter((company) => company?.applied).length,
    reviews: 0,
    interviews: 0,
    workouts: 0,
    runs: 0,
  };
  const completedItems = [];
  const countedIds = new Set();
  for (const item of snapshot?.items ?? []) {
    if (!checked.has(item.id) || countedIds.has(item.id)) continue;
    completedItems.push(item);
    countedIds.add(item.id);
  }
  for (const item of normalizedArchivedItems(source.archivedCompletedItems)) {
    if (countedIds.has(item.id)) continue;
    completedItems.push(item);
    countedIds.add(item.id);
  }
  for (const item of completedItems) {
    if (REVIEW_IDS.has(item.id)) summary.reviews += 1;
    if (INTERVIEW_IDS.has(item.id)) summary.interviews += 1;
    if (item.id === 'workout') summary.workouts += 1;
    if (item.id === 'run') summary.runs += 1;
  }
  return summary;
}

export function calculateWeeklyExecutionProgress(storage, weekKey) {
  const result = emptyWeeklyProgress();
  for (let offset = 0; offset < 7; offset += 1) {
    const date = addLocalDays(weekKey, offset);
    if (!date) break;
    const raw = storage.getItem(storageKey('daily', date));
    if (!raw) continue;
    mergeExecutionSummary(result, buildDailyExecutionSummary(safeParse(raw)));
  }
  return result;
}
