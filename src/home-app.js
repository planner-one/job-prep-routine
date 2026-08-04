import {
  calculateDailyProgress,
  logicalDateString,
  parseLocalDateKey,
  scheduleLogicalDayRollover,
  storageKey,
} from './routine-core.js';
import {
  calculateWeeklyExecutionProgress,
  prepareDailyPlan,
  resolveDailyPlan,
} from './daily-plan-core.js';
import { formatMinuteRange, weekMondayKey } from './weekly-plan-core.js';

export const INTERVIEW_SESSION_KEY = 'interview-prep.session.v1';

const DEFAULT_INTERVIEW_HREF = './interview/?view=difficulty&routine=implementation';
const INTERVIEW_VIEWS = new Set(['emphasis', 'difficulty', 'compact', 'all', 'warnings']);
const ROUTINE_OPTIONAL_VIEWS = new Set(['all', 'warnings']);
const INTERVIEW_FILTER_DEFAULTS = {
  search: '',
  category: 'all',
  project: 'all',
  difficulty: 'all',
  evidence: 'all',
  stage: 'all',
};

function objectValue(value) {
  return value && typeof value === 'object' && !Array.isArray(value) ? value : null;
}

function uniqueStrings(value) {
  if (!Array.isArray(value)) return [];
  return [...new Set(value.filter((item) => typeof item === 'string' && item.trim()))];
}

function safeStorage(storage) {
  return {
    getItem(key) {
      try {
        return storage?.getItem?.(key) ?? null;
      } catch {
        return null;
      }
    },
  };
}

export function safeReadObject(storage, key) {
  const raw = safeStorage(storage).getItem(key);
  if (typeof raw !== 'string' || !raw) return null;
  try {
    return objectValue(JSON.parse(raw));
  } catch {
    return null;
  }
}

export function formatHomeDate(dateKey) {
  const date = parseLocalDateKey(dateKey);
  if (!date) return dateKey;
  return new Intl.DateTimeFormat('ko-KR', {
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  }).format(date);
}

function scheduleLabel(item) {
  if (!item) return '오늘 예정된 일정을 모두 완료했어요';
  const hasTime = Number.isInteger(item.startMinute) && Number.isInteger(item.endMinute);
  const time = hasTime ? formatMinuteRange(item.startMinute, item.endMinute) : '';
  return [time, item.label].filter(Boolean).join(' · ');
}

export function resolveInterviewSession(candidate) {
  const source = objectValue(candidate);
  if (!source || source.version !== 1) return null;

  const questionIds = uniqueStrings(source.questionIds);
  if (!questionIds.length) return null;

  const available = new Set(questionIds);
  const completedQuestionIds = uniqueStrings(source.completedQuestionIds).filter((id) => available.has(id));
  const completed = new Set(completedQuestionIds);
  const requestedCurrent = typeof source.currentQuestionId === 'string' ? source.currentQuestionId : '';
  const currentQuestionId = available.has(requestedCurrent)
    ? requestedCurrent
    : questionIds.find((id) => !completed.has(id)) ?? questionIds[0];
  const context = objectValue(source.context) ?? {};
  const view = INTERVIEW_VIEWS.has(context.view) ? context.view : 'difficulty';
  const routineId = typeof context.routineId === 'string' && context.routineId.trim()
    ? context.routineId
    : ROUTINE_OPTIONAL_VIEWS.has(view) ? '' : 'implementation';
  const percent = Math.round((completedQuestionIds.length / questionIds.length) * 100);
  const query = new URLSearchParams({ view });
  if (routineId) query.set('routine', routineId);
  if (view === 'all') {
    const filters = objectValue(source.filters) ?? {};
    Object.entries(INTERVIEW_FILTER_DEFAULTS).forEach(([key, fallback]) => {
      const value = typeof filters[key] === 'string' ? filters[key] : fallback;
      if (value && value !== fallback) query.set(key, value);
    });
  }
  query.set('question', currentQuestionId);

  return {
    currentQuestionId,
    currentPosition: questionIds.indexOf(currentQuestionId) + 1,
    completed: completedQuestionIds.length,
    total: questionIds.length,
    percent,
    href: `./interview/?${query.toString()}`,
  };
}

function buildDailySummary(storage, today, weekKey) {
  const weekly = safeReadObject(storage, storageKey('weekly', weekKey)) ?? {};
  const daily = safeReadObject(storage, storageKey('daily', today)) ?? {};
  const resolvedPlan = resolveDailyPlan(today, weekly);
  const prepared = prepareDailyPlan(daily, resolvedPlan);
  const schedule = prepared.renderPlan?.items ?? [];
  const checked = new Set(Array.isArray(prepared.state?.checkedIds) ? prepared.state.checkedIds : []);
  const progress = calculateDailyProgress(prepared.state, schedule);
  const next = schedule.find(({ id }) => !checked.has(id));

  return {
    ...progress,
    nextSchedule: scheduleLabel(next),
  };
}

function buildWeeklySummary(storage, weekKey) {
  const progress = calculateWeeklyExecutionProgress(safeStorage(storage), weekKey);
  return {
    applications: progress.applications,
    reviews: progress.reviews,
    interviews: progress.interviews,
    exercise: progress.workouts + progress.runs,
  };
}

export function buildHomeModel(storage, now = new Date()) {
  const today = logicalDateString(now);
  const weekKey = weekMondayKey(today);
  const session = resolveInterviewSession(safeReadObject(storage, INTERVIEW_SESSION_KEY));

  return {
    today,
    dateLabel: formatHomeDate(today),
    daily: buildDailySummary(storage, today, weekKey),
    weekly: buildWeeklySummary(storage, weekKey),
    interview: session
      ? {
          active: true,
          title: '면접 연습 이어하기',
          countLabel: `${session.completed} / ${session.total}`,
          currentLabel: `현재 질문 · ${session.currentPosition} / ${session.total}`,
          actionLabel: '면접 연습 이어가기',
          ...session,
        }
      : {
          active: false,
          title: '중급 루틴 시작',
          countLabel: '새 세션',
          currentLabel: '핵심문장부터 짧게 답하는 중급 연습입니다.',
          actionLabel: '중급 루틴 시작',
          completed: 0,
          total: 0,
          percent: 0,
          href: DEFAULT_INTERVIEW_HREF,
        },
  };
}

function setText(root, selector, value) {
  const element = root.querySelector(selector);
  if (element) element.textContent = value;
}

function paintProgress(root, prefix, percent) {
  const track = root.querySelector(`#${prefix}-progress`);
  const fill = root.querySelector(`#${prefix}-progress-fill`);
  if (track) track.setAttribute('aria-valuenow', String(percent));
  if (fill) fill.style.width = `${percent}%`;
}

export function renderHome(root, model) {
  const date = root.querySelector('#home-logical-date');
  if (date) {
    date.dateTime = model.today;
    date.textContent = model.dateLabel;
  }

  setText(root, '#home-daily-percent', `${model.daily.percent}%`);
  setText(root, '#home-daily-count', `${model.daily.completed} / ${model.daily.total} 완료`);
  setText(root, '#home-next-schedule', model.daily.nextSchedule);
  paintProgress(root, 'home-daily', model.daily.percent);

  setText(root, '#home-interview-title', model.interview.title);
  setText(root, '#home-interview-count', model.interview.countLabel);
  setText(root, '#home-interview-current', model.interview.currentLabel);
  paintProgress(root, 'home-interview', model.interview.percent);
  const interviewProgress = root.querySelector('#home-interview-progress-wrap');
  if (interviewProgress) interviewProgress.hidden = !model.interview.active;
  const interviewAction = root.querySelector('#home-interview-action');
  if (interviewAction) {
    interviewAction.href = model.interview.href;
    interviewAction.textContent = model.interview.actionLabel;
  }

  setText(root, '#home-weekly-applications', `${model.weekly.applications}건`);
  setText(root, '#home-weekly-reviews', `${model.weekly.reviews}회`);
  setText(root, '#home-weekly-interviews', `${model.weekly.interviews}회`);
  setText(root, '#home-weekly-exercise', `${model.weekly.exercise}회`);
  return model;
}

export function initHomePage(pageDocument, storage, now = () => new Date()) {
  const root = pageDocument.getElementById('home-page');
  if (!root) return null;
  const currentTime = typeof now === 'function' ? now : () => now;
  const render = () => renderHome(root, buildHomeModel(storage, currentTime()));
  const pageWindow = pageDocument.defaultView;
  const refreshFromStorage = (event) => {
    if (!event?.key || event.key.startsWith('job-prep-routine:') || event.key === INTERVIEW_SESSION_KEY) render();
  };

  pageWindow?.addEventListener('storage', refreshFromStorage);
  pageWindow?.addEventListener('focus', render);
  pageWindow?.addEventListener('pageshow', render);
  render();
  pageDocument.documentElement.dataset.homeReady = 'true';

  return {
    render,
    destroy() {
      pageWindow?.removeEventListener('storage', refreshFromStorage);
      pageWindow?.removeEventListener('focus', render);
      pageWindow?.removeEventListener('pageshow', render);
      delete pageDocument.documentElement.dataset.homeReady;
    },
  };
}

if (typeof document !== 'undefined') {
  const boot = () => {
    let storage = null;
    try {
      storage = window.localStorage;
    } catch {
      storage = null;
    }
    const today = logicalDateString();
    initHomePage(document, storage);
    scheduleLogicalDayRollover(window, today);
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot, { once: true });
  else boot();
}
