import { listStudyAttempts } from './study-history-core.js';

export const STUDY_HISTORY_CALENDAR_DAYS = 90;

const DAY_MS = 24 * 60 * 60 * 1000;

function parseDateKey(value) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value ?? '');
  if (!match) return null;
  const [, year, month, day] = match.map(Number);
  const date = new Date(year, month - 1, day, 12);
  if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) return null;
  return date;
}

function dateKey(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

function addDays(date, amount) {
  return new Date(date.getTime() + amount * DAY_MS);
}

function normalizedCalendarDays(value) {
  return Number.isInteger(value) && value > 0 ? value : STUDY_HISTORY_CALENDAR_DAYS;
}

function currentStudyStreak(days) {
  let streak = 0;
  for (let index = days.length - 1; index >= 0; index -= 1) {
    if (days[index].count === 0) break;
    streak += 1;
  }
  return streak;
}

/** 완료한 학습 활동 수를 잔디 색상 단계(0–4)로 바꾼다. */
export function studyActivityLevel(count) {
  if (!Number.isFinite(count) || count <= 0) return 0;
  if (count === 1) return 1;
  if (count <= 3) return 2;
  if (count <= 5) return 3;
  return 4;
}

/** 종료일을 포함하는 최근 N일의 날짜 키를 오래된 순으로 만든다. */
export function studyCalendarDateRange(endDate, days = STUDY_HISTORY_CALENDAR_DAYS) {
  const end = parseDateKey(endDate);
  if (!end) throw new TypeError('올바른 학습 기록 종료 날짜가 필요합니다.');
  const length = normalizedCalendarDays(days);
  const start = addDays(end, -(length - 1));
  return Array.from({ length }, (_, index) => dateKey(addDays(start, index)));
}

/**
 * append-only 학습 기록을 날짜별 잔디 데이터로 정리한다.
 * 중단된 세션은 완료 활동으로 세지 않는다.
 */
export function buildStudyActivityCalendar(state, endDate, days = STUDY_HISTORY_CALENDAR_DAYS) {
  const dates = studyCalendarDateRange(endDate, days);
  const dateSet = new Set(dates);
  const attemptsByDate = new Map(dates.map((date) => [date, []]));
  const completedAttempts = listStudyAttempts(state, { status: 'completed' });
  const visibleAttempts = [];

  for (const attempt of completedAttempts) {
    if (!dateSet.has(attempt.logicalDate)) continue;
    attemptsByDate.get(attempt.logicalDate).push(attempt);
    visibleAttempts.push(attempt);
  }

  const calendarDays = dates.map((date) => {
    const attempts = attemptsByDate.get(date);
    return Object.freeze({
      date,
      count: attempts.length,
      level: studyActivityLevel(attempts.length),
      attempts: Object.freeze([...attempts]),
    });
  });
  const firstDate = parseDateKey(dates[0]);
  const cells = [
    ...Array(firstDate.getDay()).fill(null),
    ...calendarDays,
  ];
  while (cells.length % 7 !== 0) cells.push(null);

  const weeks = Array.from({ length: cells.length / 7 }, (_, weekIndex) => (
    Object.freeze(cells.slice(weekIndex * 7, weekIndex * 7 + 7))
  ));
  const monthLabels = [];
  let displayedMonth = null;
  for (const [dayIndex, day] of calendarDays.entries()) {
    const month = parseDateKey(day.date).getMonth();
    if (month === displayedMonth) continue;
    const weekIndex = Math.floor((firstDate.getDay() + dayIndex) / 7);
    const label = Object.freeze({ weekIndex, label: `${month + 1}월` });
    if (monthLabels.at(-1)?.weekIndex === weekIndex) {
      monthLabels[monthLabels.length - 1] = label;
    } else {
      monthLabels.push(label);
    }
    displayedMonth = month;
  }

  const totalActivities = calendarDays.reduce((total, day) => total + day.count, 0);
  const quizAttempts = visibleAttempts.filter(({ kind }) => kind === 'quiz-main' || kind === 'quiz-follow-up');
  const quizAnswered = quizAttempts.reduce((total, { score }) => total + (score?.total ?? 0) - (score?.unanswered ?? 0), 0);
  const quizCorrect = quizAttempts.reduce((total, { score }) => total + (score?.correct ?? 0), 0);
  const activityCounts = Object.freeze({
    reading: visibleAttempts.filter(({ kind }) => kind === 'reading').length,
    quiz: quizAttempts.length,
    interview: visibleAttempts.filter(({ kind }) => kind === 'interview-self' || kind === 'interview-ai').length,
  });
  return Object.freeze({
    startDate: dates[0],
    endDate: dates.at(-1),
    days: Object.freeze(calendarDays),
    weeks: Object.freeze(weeks),
    monthLabels: Object.freeze(monthLabels),
    totalActivities,
    activeDays: calendarDays.filter(({ count }) => count > 0).length,
    currentStreak: currentStudyStreak(calendarDays),
    activityCounts,
    quizAnswered,
    quizCorrect,
    quizPercent: quizAnswered === 0 ? null : Math.round((quizCorrect / quizAnswered) * 100),
  });
}
