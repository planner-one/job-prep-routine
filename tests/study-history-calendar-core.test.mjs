import test from 'node:test';
import assert from 'node:assert/strict';
import { createStudyAttempt, normalizeStudyHistoryState } from '../src/study-history-core.js';
import {
  STUDY_HISTORY_CALENDAR_DAYS,
  buildStudyActivityCalendar,
  studyActivityLevel,
  studyCalendarDateRange,
} from '../src/study-history-calendar-core.js';

const COMMIT = 'd00877afb0a302072078d34ded66b3b69143a5ca';

function completedAttempt(id, kind, completedAt) {
  return createStudyAttempt({
    id,
    kind,
    completedAt,
    sourceIds: ['be-1'],
    sourceCommit: COMMIT,
    ...(kind.startsWith('quiz') ? {
      questionResults: [{ questionId: `${id}-question`, sourceId: 'be-1', selectedIndex: 0, correctIndex: 0 }],
      bankVersion: 'quiz-bank-v2',
      ...(kind === 'quiz-follow-up' ? { followUpOf: 'quiz-main' } : {}),
    } : {}),
  });
}

test('최근 90일 범위는 종료일을 포함하고 오래된 날짜부터 만든다', () => {
  const dates = studyCalendarDateRange('2026-07-23');
  assert.equal(dates.length, STUDY_HISTORY_CALENDAR_DAYS);
  assert.equal(dates[0], '2026-04-25');
  assert.equal(dates.at(-1), '2026-07-23');
});

test('학습 활동 수는 0건, 1건, 2~3건, 4~5건, 6건 이상 색상 단계를 사용한다', () => {
  assert.deepEqual([0, 1, 2, 3, 4, 5, 6, 99].map(studyActivityLevel), [0, 1, 2, 2, 3, 3, 4, 4]);
});

test('첫 주 안에서 월이 바뀌어도 새 달의 레이블을 같은 주에 표시한다', () => {
  const calendar = buildStudyActivityCalendar({ attempts: [] }, '2026-07-24');
  assert.deepEqual(calendar.monthLabels[0], { weekIndex: 0, label: '5월' });
});

test('완료한 읽기·퀴즈·면접 활동만 날짜별 잔디에 합산하고 중단 세션은 제외한다', () => {
  const interrupted = createStudyAttempt({
    id: 'paused-quiz',
    kind: 'quiz-main',
    status: 'interrupted',
    startedAt: '2026-07-22T12:00:00.000Z',
    sourceIds: ['be-1'],
    questionIds: ['paused-question'],
    sourceCommit: COMMIT,
    resume: { sessionId: 'paused-session', nextQuestionIndex: 1 },
  });
  const state = normalizeStudyHistoryState({
    attempts: [
      completedAttempt('read-1', 'reading', '2026-07-22T10:00:00.000Z'),
      completedAttempt('quiz-1', 'quiz-main', '2026-07-22T11:00:00.000Z'),
      completedAttempt('self-1', 'interview-self', '2026-07-22T12:00:00.000Z'),
      interrupted,
      completedAttempt('ai-1', 'interview-ai', '2026-07-23T10:00:00.000Z'),
    ],
  });
  const calendar = buildStudyActivityCalendar(state, '2026-07-23');
  const july22 = calendar.days.find(({ date }) => date === '2026-07-22');
  const july23 = calendar.days.find(({ date }) => date === '2026-07-23');

  assert.equal(calendar.totalActivities, 4);
  assert.equal(calendar.activeDays, 2);
  assert.equal(calendar.currentStreak, 2);
  assert.deepEqual(calendar.activityCounts, { reading: 1, quiz: 1, interview: 2 });
  assert.equal(calendar.quizAnswered, 1);
  assert.equal(calendar.quizCorrect, 1);
  assert.equal(calendar.quizPercent, 100);
  assert.deepEqual({ count: july22.count, level: july22.level }, { count: 3, level: 2 });
  assert.deepEqual({ count: july23.count, level: july23.level }, { count: 1, level: 1 });
  assert.equal(calendar.monthLabels.some(({ label }) => label === '7월'), true);
});
