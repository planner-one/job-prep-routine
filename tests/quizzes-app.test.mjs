import test from 'node:test';
import assert from 'node:assert/strict';
import { INTERVIEW_QUESTIONS } from '../src/interview-data.js';
import { QUIZ_QUESTIONS } from '../src/quiz-data.js';
import { createQuizFlowSession } from '../src/quiz-flow-core.js';
import {
  QUIZ_LIST_PAGE_SIZE,
  filterQuizSources,
  paginateQuizSources,
  quizSourceProgress,
  selectDailyQuizSources,
} from '../src/quizzes-app.js';

test('금일 풀 문제는 읽기 목록을 우선하고 항상 5개를 중복 없이 고른다', () => {
  const selected = selectDailyQuizSources(
    INTERVIEW_QUESTIONS,
    '2026-07-23',
    ['be-5', 'be-3', 'be-5'],
  );
  assert.equal(selected.length, 5);
  assert.deepEqual(selected.slice(0, 2).map(({ id }) => id), ['be-5', 'be-3']);
  assert.equal(new Set(selected.map(({ id }) => id)).size, 5);
  assert.deepEqual(
    selectDailyQuizSources(INTERVIEW_QUESTIONS, '2026-07-23').map(({ id }) => id),
    selectDailyQuizSources(INTERVIEW_QUESTIONS, '2026-07-23').map(({ id }) => id),
  );
});

test('퀴즈 진행 상태는 세션을 우선하고 풀이 횟수와 최고 점수를 계산한다', () => {
  const attempts = [
    { session: { primarySourceId: 'be-1' }, score: { percent: 60 } },
    { session: { primarySourceId: 'be-1' }, score: { percent: 90 } },
  ];
  assert.deepEqual(quizSourceProgress('be-1', attempts, {
    status: 'in-progress',
    answers: { q1: 0, q2: 1 },
  }), {
    status: 'in-progress',
    attemptCount: 2,
    bestScore: 90,
    latestAttempt: attempts[0],
    answeredCount: 2,
    completedSession: false,
  });
});

test('v2 목록 진행률은 메인·꼬리·보류·완전 완료를 분리한다', () => {
  const created = createQuizFlowSession(QUIZ_QUESTIONS, {
    primarySourceId: 'be-1',
    categoryId: 'spring-application',
    date: '2026-07-23',
    allowUsedFallback: true,
    now: new Date('2026-07-23T03:00:00Z'),
  });
  const mainId = created.mainQuestionIds[0];
  const tailId = created.followUpIdsByMain[mainId][0];
  const progress = quizSourceProgress('be-1', [], {
    ...created,
    answers: {
      [mainId]: { selectedIndex: 0, correctIndex: 0, isCorrect: true },
    },
    deferredFollowUpIds: [tailId],
  });
  assert.equal(progress.status, 'in-progress');
  assert.equal(progress.mainAnswered, 1);
  assert.equal(progress.mainTotal, 5);
  assert.equal(progress.tailAnswered, 0);
  assert.equal(progress.tailTotal, 10);
  assert.equal(progress.deferredCount, 1);
  assert.equal(progress.fullyCompleted, false);
});

test('전체 목록은 검색·카테고리·상태를 함께 적용하고 14개씩 나눈다', () => {
  const progress = new Map(INTERVIEW_QUESTIONS.map((source, index) => [
    source.id,
    { status: index === 0 ? 'completed' : 'new' },
  ]));
  const completed = filterQuizSources(INTERVIEW_QUESTIONS, progress, { status: 'completed' });
  assert.deepEqual(completed.map(({ id }) => id), [INTERVIEW_QUESTIONS[0].id]);

  const spring = filterQuizSources(INTERVIEW_QUESTIONS, progress, {
    category: 'spring-application',
    query: 'spring',
  });
  assert.ok(spring.length > 0);
  assert.ok(spring.every(({ categoryId }) => categoryId === 'spring-application'));

  const first = paginateQuizSources(INTERVIEW_QUESTIONS, 1);
  const second = paginateQuizSources(INTERVIEW_QUESTIONS, 2);
  assert.equal(QUIZ_LIST_PAGE_SIZE, 14);
  assert.equal(first.items.length, 14);
  assert.equal(second.items.length, 14);
  assert.notEqual(first.items[0].id, second.items[0].id);
});
