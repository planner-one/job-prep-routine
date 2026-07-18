import { LEARNING_TOPICS, MODES, getSchedule } from './routine-data.js';
import { countPipelineProgress, localDateString, storageKey } from './routine-core.js';

const WEEKDAY_IDS = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
const EXECUTION_TASKS = ['activity', 'review', 'interview', 'mealRest'];
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

function buildScheduleSummary(source) {
  if (!source) return { completed: [], completedIds: [], total: 0 };
  const mode = normalizeMode(source.mode, 'workout');
  const runStart = source.runStart === '22' ? '22' : '21';
  const schedule = getSchedule(mode, runStart);
  const checked = new Set(Array.isArray(source.checkedIds) ? source.checkedIds : []);
  const completed = schedule.filter(({ id }) => checked.has(id));
  return {
    completed,
    completedIds: completed.map(({ id }) => id),
    total: schedule.length,
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
    };
  }

  const { day, isMaintenance } = weeklyDayFrom(weekly, date);
  if (isMaintenance) {
    const maintenance = objectValue(day.maintenance);
    const completed = MAINTENANCE_TASKS.filter((key) => Boolean(maintenance[key]));
    return {
      isMaintenance: true,
      mode: 'maintenance',
      applications: maintenance.application ? 1 : 0,
      completed,
      total: MAINTENANCE_TASKS.length,
      topics: maintenance.learningReview ? ['학습 복습'] : [],
    };
  }

  const tasks = objectValue(day.tasks);
  const applications = Array.from({ length: 4 }, (_, index) =>
    Boolean(Array.isArray(day.applications) && day.applications[index]),
  );
  const completedTasks = EXECUTION_TASKS.filter((key) => Boolean(tasks[key]));
  const completedApplications = applications
    .map((checked, index) => (checked ? `application-${index + 1}` : null))
    .filter(Boolean);
  return {
    isMaintenance: false,
    mode: normalizeMode(day.mode, 'normal'),
    applications: applications.filter(Boolean).length,
    completed: [...completedTasks, ...completedApplications],
    total: EXECUTION_TASKS.length + applications.length,
    topics: Array.isArray(day.learningTopics) ? day.learningTopics : [],
  };
}

function hasMemo(memos) {
  return Object.values(memos).some((value) => value.trim());
}

export function buildHistoryRecord({ date, daily = null, roadmap = null, weekly = null }) {
  const dailyState = daily ? objectValue(daily) : null;
  const roadmapState = roadmap ? objectValue(roadmap) : null;
  const dailySchedule = buildScheduleSummary(dailyState);
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
    completed = dailySchedule.completed.length + pipeline.completedSteps;
    total = dailySchedule.total + 12;
  } else if (roadmapState) {
    completionSource = 'roadmap';
    completed = roadmapSchedule.completed.length;
    total = roadmapSchedule.total;
  } else if (weekly) {
    completionSource = 'weekly';
    completed = weeklySummary.completed.length + weeklyLearningCompletion;
    total = weeklySummary.total + (weeklySummary.isMaintenance ? 0 : 1);
  }
  const applications = companies.length > 0 ? pipeline.applied : weeklySummary.applications;
  const completedIds = new Set([
    ...dailySchedule.completedIds,
    ...roadmapSchedule.completedIds,
  ]);
  const interview =
    weeklySummary.completed.includes('interview') ||
    ['interview-practice', 'maintenance-interview'].some((id) => completedIds.has(id))
      ? 1
      : 0;
  const learning =
    learningTopics.length > 0 ||
    ['learning', 'maintenance-learning'].some((id) => completedIds.has(id)) ||
    weeklySummary.completed.includes('learningReview')
      ? 1
      : 0;
  const exercise =
    completedIds.has('workout') ||
    completedIds.has('run') ||
    (weeklySummary.completed.includes('activity') &&
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
    mode: weeklySummary.isMaintenance
      ? 'maintenance'
      : normalizeMode(dailyState?.mode ?? roadmapState?.mode, weeklySummary.mode ?? 'normal'),
    isMaintenance: weeklySummary.isMaintenance,
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
