import { LEARNING_TOPICS, MODES, TASK_LIBRARY, getSchedule } from './routine-data.js';
import { calculateDailyProgress, countPipelineProgress, localDateString, storageKey } from './routine-core.js';

const WEEKDAY_IDS = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
const EXECUTION_TASKS = ['activity', 'review', 'interview', 'mealRest'];
const SCHEDULE_CATEGORIES = new Set(['career', 'learning', 'exercise', 'meal']);
const DEFAULT_EXERCISE_IDS = new Set(
  [
    'sleep',
    ...[...TASK_LIBRARY, ...MODES.flatMap((mode) => getSchedule(mode))]
      .filter(({ category }) => category === 'exercise')
      .map(({ id }) => id),
  ],
);
const MAINTENANCE_TASKS = [
  'deadline',
  'application',
  'review',
  'interview',
  'learningReview',
  'nextWeek',
  'rest',
];

function objectValue(value) {
  return value && typeof value === 'object' && !Array.isArray(value) ? value : {};
}

function parseDateKey(value) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value ?? '');
  if (!match) return null;
  const [, year, month, day] = match.map(Number);
  const date = new Date(year, month - 1, day, 12);
  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return null;
  }
  return date;
}

function addDays(dateKey, amount) {
  const date = parseDateKey(dateKey);
  if (!date) return dateKey;
  date.setDate(date.getDate() + amount);
  return localDateString(date);
}

function weekMondayKey(dateKey) {
  const date = parseDateKey(dateKey);
  if (!date) return dateKey;
  date.setDate(date.getDate() - ((date.getDay() + 6) % 7));
  return localDateString(date);
}

function weekdayId(dateKey) {
  const date = parseDateKey(dateKey);
  return date ? WEEKDAY_IDS[date.getDay()] : 'mon';
}

function safeParse(raw) {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === 'object' && !Array.isArray(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

function loadOptionalState(storage, page, key) {
  return safeParse(storage.getItem(storageKey(page, key)));
}

function normalizeMode(value, fallback = 'normal') {
  return MODES.includes(value) ? value : fallback;
}

function validMinute(value) {
  return Number.isInteger(value) && value >= 0 && value <= 1440;
}

function formatMinute(value) {
  return `${String(Math.floor(value / 60)).padStart(2, '0')}:${String(value % 60).padStart(2, '0')}`;
}

function periodForMinute(value) {
  if (value < 780) return 'morning';
  if (value < 1130) return 'afternoon';
  if (value < 1320) return 'evening';
  return 'night';
}

function snapshotScheduleItem(candidate) {
  const item = objectValue(candidate);
  if (typeof item.id !== 'string' || !item.id.trim()) return null;
  if (typeof item.label !== 'string' || !item.label.trim()) return null;
  if (!SCHEDULE_CATEGORIES.has(item.category)) return null;
  if (!validMinute(item.startMinute) || !validMinute(item.endMinute) || item.endMinute < item.startMinute) {
    return null;
  }
  return {
    id: item.id,
    time: item.startMinute === item.endMinute
      ? formatMinute(item.startMinute)
      : `${formatMinute(item.startMinute)}–${formatMinute(item.endMinute)}`,
    label: item.label,
    category: item.category,
    period: periodForMinute(item.startMinute),
  };
}

function snapshotSchedule(source) {
  const snapshot = objectValue(source?.planSnapshot);
  if (!Array.isArray(snapshot.items)) return null;
  const seen = new Set();
  return snapshot.items
    .map(snapshotScheduleItem)
    .filter((item) => item && !seen.has(item.id) && seen.add(item.id));
}

function archivedSchedule(source) {
  const seen = new Set();
  return (Array.isArray(source?.archivedCompletedItems) ? source.archivedCompletedItems : [])
    .map((candidate) => {
      const item = objectValue(candidate);
      if (typeof item.id !== 'string' || !item.id.trim()) return null;
      const normalized = snapshotScheduleItem(item);
      if (normalized) return normalized;
      return {
        id: item.id,
        time: '',
        label: typeof item.label === 'string' && item.label.trim() ? item.label : item.id,
        category: SCHEDULE_CATEGORIES.has(item.category) ? item.category : 'career',
        period: '',
      };
    })
    .filter((item) => item && !seen.has(item.id) && seen.add(item.id));
}

function normalizeTopics(...sources) {
  const selected = new Set();
  for (const source of sources) {
    if (!Array.isArray(source)) continue;
    for (const topic of source) {
      if (LEARNING_TOPICS.includes(topic)) selected.add(topic);
    }
  }
  return LEARNING_TOPICS.filter((topic) => selected.has(topic));
}

function normalizedCompanies(value) {
  const companies = Array.isArray(value) ? value : [];
  return Array.from({ length: 4 }, (_, index) => {
      const candidate = companies[index];
      const company = objectValue(candidate);
      return {
        name: typeof company.name === 'string' ? company.name : '',
        platform: typeof company.platform === 'string' ? company.platform : '',
        analyzed: Boolean(company.analyzed),
        letter: Boolean(company.letter),
        applied: Boolean(company.applied),
        link: typeof company.link === 'string' ? company.link : '',
      };
    });
}

function hasCompanyData(company) {
  return Boolean(
    company.name.trim() ||
      company.link.trim() ||
      company.analyzed ||
      company.letter ||
      company.applied,
  );
}

function normalizedMemos(value) {
  const memos = objectValue(value);
  return {
    implemented: typeof memos.implemented === 'string' ? memos.implemented : '',
    blocked: typeof memos.blocked === 'string' ? memos.blocked : '',
    firstAction: typeof memos.firstAction === 'string' ? memos.firstAction : '',
  };
}

function buildScheduleSummary(source, { preferSnapshot = false } = {}) {
  if (!source) return { completed: [], completedIds: [], schedule: [], total: 0, usesStoredSchedule: false };
  const mode = normalizeMode(source.mode, 'workout');
  const runStart = source.runStart === '22' ? '22' : '21';
  const snapshot = preferSnapshot ? snapshotSchedule(source) : null;
  const schedule = snapshot ?? getSchedule(mode, runStart);
  const archived = preferSnapshot ? archivedSchedule(source) : [];
  const checked = new Set(Array.isArray(source.checkedIds) ? source.checkedIds : []);
  const completedById = new Map(
    schedule.filter(({ id }) => checked.has(id)).map((item) => [item.id, item]),
  );
  for (const item of archived) {
    if (!completedById.has(item.id)) completedById.set(item.id, item);
  }
  const scheduleById = new Map(schedule.map((item) => [item.id, item]));
  for (const item of archived) {
    if (!scheduleById.has(item.id)) scheduleById.set(item.id, item);
  }
  const completed = [...completedById.values()];
  return {
    completed,
    completedIds: completed.map(({ id }) => id),
    schedule: [...scheduleById.values()],
    total: scheduleById.size,
    usesStoredSchedule: snapshot !== null || archived.length > 0,
  };
}

function weeklyDayFrom(weekly, date) {
  const state = objectValue(weekly);
  const days = objectValue(state.days);
  const dayId = weekdayId(date);
  const day = objectValue(days[dayId]);
  const isMaintenance = state.maintenanceDay === dayId;
  return { day, dayId, isMaintenance };
}

function buildWeeklySummary(weekly, date) {
  if (!weekly) {
    return {
      isMaintenance: false,
      mode: null,
      applications: 0,
      completed: [],
      total: 0,
      topics: [],
      hasLegacyActivity: false,
    };
  }

  const { day, isMaintenance } = weeklyDayFrom(weekly, date);
  const completion = weekly.schemaVersion === 2 ? objectValue(day.legacyCompletion) : day;
  if (isMaintenance) {
    const maintenance = objectValue(completion.maintenance);
    const completed = MAINTENANCE_TASKS.filter((key) => Boolean(maintenance[key]));
    return {
      isMaintenance: true,
      mode: 'maintenance',
      applications: maintenance.application ? 1 : 0,
      completed,
      total: MAINTENANCE_TASKS.length,
      topics: maintenance.learningReview ? ['학습 복습'] : [],
      hasLegacyActivity: completed.length > 0,
    };
  }

  const tasks = objectValue(completion.tasks);
  const applications = Array.from({ length: 4 }, (_, index) =>
    Boolean(Array.isArray(completion.applications) && completion.applications[index]),
  );
  const completedTasks = EXECUTION_TASKS.filter((key) => Boolean(tasks[key]));
  const completedApplications = applications
    .map((checked, index) => (checked ? `application-${index + 1}` : null))
    .filter(Boolean);
  const topics = Array.isArray(completion.learningTopics) ? completion.learningTopics : [];
  const completed = [...completedTasks, ...completedApplications];
  return {
    isMaintenance: false,
    mode: normalizeMode(day.mode, 'normal'),
    applications: applications.filter(Boolean).length,
    completed,
    total: EXECUTION_TASKS.length + applications.length,
    topics,
    hasLegacyActivity: completed.length > 0 || topics.length > 0,
  };
}

function hasMemo(memos) {
  return Object.values(memos).some((value) => value.trim());
}

export function buildHistoryRecord({ date, daily = null, roadmap = null, weekly = null }) {
  const dailyState = daily ? objectValue(daily) : null;
  const roadmapState = roadmap ? objectValue(roadmap) : null;
  const dailySchedule = buildScheduleSummary(dailyState, { preferSnapshot: true });
  const roadmapSchedule = buildScheduleSummary(roadmapState);
  const weeklySummary = buildWeeklySummary(weekly, date);
  const allCompanies = normalizedCompanies(dailyState?.companies);
  const companies = allCompanies.filter(hasCompanyData);
  const pipeline = countPipelineProgress(allCompanies);
  const memos = normalizedMemos(dailyState?.memos);
  const learningTopics = normalizeTopics(
    dailyState?.learningTopics,
    roadmapState?.learningTopics,
    weeklySummary.topics,
  );
  const weeklyLearningCompletion =
    !weeklySummary.isMaintenance && weeklySummary.topics.some((topic) => LEARNING_TOPICS.includes(topic))
      ? 1
      : 0;
  let completionSource = null;
  let completed = 0;
  let total = 0;
  if (dailyState) {
    completionSource = 'daily';
    const progressState = dailySchedule.usesStoredSchedule
      ? { ...dailyState, checkedIds: dailySchedule.completedIds }
      : dailyState;
    ({ completed, total } = dailySchedule.usesStoredSchedule
      ? calculateDailyProgress(progressState, dailySchedule.schedule)
      : calculateDailyProgress(progressState));
  } else if (roadmapState) {
    completionSource = 'roadmap';
    completed = roadmapSchedule.completed.length;
    total = roadmapSchedule.total;
  } else if (weeklySummary.hasLegacyActivity) {
    completionSource = 'weekly';
    completed = weeklySummary.completed.length + weeklyLearningCompletion;
    total = weeklySummary.total + (weeklySummary.isMaintenance ? 0 : 1);
  }
  const authoritativeState = completionSource === 'daily'
    ? dailyState
    : completionSource === 'roadmap'
      ? roadmapState
      : null;
  const authoritativeSchedule = completionSource === 'daily'
    ? dailySchedule
    : completionSource === 'roadmap'
      ? roadmapSchedule
      : { completed: [], completedIds: [] };
  const authoritativeMode = completionSource === 'weekly'
    ? weeklySummary.mode
    : authoritativeState?.mode;
  const mode = normalizeMode(authoritativeMode, 'normal');
  const sourceLearningTopics = completionSource === 'weekly'
    ? normalizeTopics(weeklySummary.topics)
    : normalizeTopics(authoritativeState?.learningTopics);
  const completedIds = new Set(authoritativeSchedule.completedIds);
  const completedCategories = new Set(
    authoritativeSchedule.completed.map(({ category }) => category),
  );
  const hasCustomExercise = authoritativeSchedule.completed.some(
    ({ id, category }) => category === 'exercise' && !DEFAULT_EXERCISE_IDS.has(id),
  );
  const applications = completionSource === 'daily'
    ? pipeline.applied
    : completionSource === 'weekly'
      ? weeklySummary.applications
      : 0;
  const interview =
    (completionSource === 'weekly' && weeklySummary.completed.includes('interview')) ||
    ['interview-practice', 'maintenance-interview'].some((id) => completedIds.has(id))
      ? 1
      : 0;
  const learning =
    sourceLearningTopics.length > 0 ||
    completedCategories.has('learning') ||
    ['learning', 'maintenance-learning'].some((id) => completedIds.has(id)) ||
    (completionSource === 'weekly' && weeklySummary.completed.includes('learningReview'))
      ? 1
      : 0;
  const exercise =
    hasCustomExercise ||
    completedIds.has('workout') ||
    completedIds.has('run') ||
    (completionSource === 'weekly' && weeklySummary.completed.includes('activity') &&
      ['workout', 'running'].includes(weeklySummary.mode))
      ? 1
      : 0;
  const hasActivity =
    dailySchedule.completed.length > 0 ||
    roadmapSchedule.completed.length > 0 ||
    weeklySummary.completed.length > 0 ||
    companies.length > 0 ||
    learningTopics.length > 0 ||
    hasMemo(memos);

  return {
    date,
    mode,
    isMaintenance: mode === 'maintenance',
    completion: {
      source: completionSource,
      completed,
      total,
      percent: total === 0 ? 0 : Math.round((completed / total) * 100),
    },
    metrics: {
      applications,
      interview,
      learning,
      exercise,
    },
    completedSchedule: (dailyState ? dailySchedule.completed : roadmapSchedule.completed).map((item) => ({
      ...item,
    })),
    dailyCompletedSchedule: dailySchedule.completed.map((item) => ({ ...item })),
    roadmapCompletedSchedule: roadmapSchedule.completed.map((item) => ({ ...item })),
    weeklyChecks: {
      completed: [...weeklySummary.completed],
      total: weeklySummary.total,
    },
    companies,
    pipeline,
    learningTopics,
    memos,
    hasActivity,
  };
}

function recordForDate(storage, date) {
  const weeklyKey = weekMondayKey(date);
  return buildHistoryRecord({
    date,
    daily: loadOptionalState(storage, 'daily', date),
    roadmap: loadOptionalState(storage, 'roadmap', date),
    weekly: loadOptionalState(storage, 'weekly', weeklyKey),
  });
}

export function buildPeriodRecords(storage, endDate, length) {
  const count = Math.max(1, Number.isFinite(length) ? Math.floor(length) : 7);
  return Array.from({ length: count }, (_, index) => addDays(endDate, index - count + 1)).map(
    (date) => recordForDate(storage, date),
  );
}

function storedDateKeys(storage) {
  const dates = new Set();
  for (let index = 0; index < storage.length; index += 1) {
    const key = storage.key(index);
    const match = /^job-prep-routine:(daily|roadmap|weekly):(\d{4}-\d{2}-\d{2})$/.exec(key ?? '');
    if (!match) continue;
    const [, page, date] = match;
    if (!parseDateKey(date)) continue;
    if (page === 'weekly') {
      for (let day = 0; day < 7; day += 1) dates.add(addDays(date, day));
    } else {
      dates.add(date);
    }
  }
  return dates;
}

export function collectHistoryRecords(storage) {
  return Array.from(storedDateKeys(storage), (date) => recordForDate(storage, date))
    .filter(({ hasActivity }) => hasActivity)
    .sort((left, right) => right.date.localeCompare(left.date));
}

export function summarizeHistory(records) {
  const safeRecords = Array.isArray(records) ? records : [];
  const completionTotal = safeRecords.reduce(
    (sum, record) => sum + (Number(record?.completion?.percent) || 0),
    0,
  );
  return {
    averageCompletion:
      safeRecords.length === 0 ? 0 : Math.round(completionTotal / safeRecords.length),
    activeDays: safeRecords.filter((record) => record?.hasActivity).length,
    applications: safeRecords.reduce(
      (sum, record) => sum + (Number(record?.metrics?.applications) || 0),
      0,
    ),
    interviewDays: safeRecords.filter((record) => record?.metrics?.interview).length,
    learningDays: safeRecords.filter((record) => record?.metrics?.learning).length,
    exerciseDays: safeRecords.filter((record) => record?.metrics?.exercise).length,
  };
}
