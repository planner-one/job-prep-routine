import test from 'node:test';
import assert from 'node:assert/strict';
import { QUIZ_STAGE_SIZE } from '../src/quiz-core.js';
import { QUIZ_QUESTIONS } from '../src/quiz-data.js';
import {
  advanceQuizFlowMain,
  answerQuizFlowQuestion,
  createQuizFlowSession,
  currentQuizFlowItem,
  deferQuizFlowQuestion,
  getActiveFollowUpIds,
  resumeDeferredQuizFlow,
  startQuizFlowSecondRound,
} from '../src/quiz-flow-core.js';
import {
  QUIZ_STUDY_BANK_VERSION,
  completedQuizStudyAttempts,
} from '../src/quiz-study-history.js';

const QUESTION_BY_ID = new Map(QUIZ_QUESTIONS.map((question) => [question.id, question]));
const START = new Date('2026-07-23T03:00:00.000Z');

function clock() {
  let tick = START.getTime();
  return () => {
    tick += 1_000;
    return new Date(tick);
  };
}

function session() {
  return createQuizFlowSession(QUIZ_QUESTIONS, {
    id: 'study-history-session',
    primarySourceId: 'be-1',
    categoryId: 'spring-application',
    date: '2026-07-23',
    allowUsedFallback: true,
    now: START,
  });
}

function answerCurrent(flow, nextTime, { wrong = false } = {}) {
  const current = currentQuizFlowItem(flow, QUIZ_QUESTIONS);
  const question = QUESTION_BY_ID.get(current.questionId);
  const selectedIndex = wrong ? (question.correctIndex + 1) % 4 : question.correctIndex;
  return answerQuizFlowQuestion(flow, question.id, selectedIndex, QUIZ_QUESTIONS, nextTime());
}

function completeCurrentCluster(flow, nextTime, options = {}) {
  let next = answerCurrent(flow, nextTime, { wrong: options.wrongMain === true });
  const mainId = currentQuizFlowItem(flow, QUIZ_QUESTIONS).mainId;
  let followUpIndex = 0;
  while (currentQuizFlowItem(next, QUIZ_QUESTIONS).kind === 'follow-up') {
    const current = currentQuizFlowItem(next, QUIZ_QUESTIONS);
    if (options.deferFollowUpIndex === followUpIndex) {
      next = deferQuizFlowQuestion(next, current.questionId, QUIZ_QUESTIONS, nextTime());
    } else {
      next = answerCurrent(next, nextTime, { wrong: options.wrongFollowUpIndex === followUpIndex });
    }
    followUpIndex += 1;
    const remaining = getActiveFollowUpIds(next, mainId, QUIZ_QUESTIONS)
      .some((id) => !next.answers[id] && !next.deferredFollowUpIds.includes(id));
    if (!remaining) break;
  }
  return next;
}

function completeRound(flow, nextTime, options = {}) {
  let next = flow;
  const end = Math.min(
    next.secondRoundStarted ? QUIZ_STAGE_SIZE * 2 : QUIZ_STAGE_SIZE,
    next.mainQuestionIds.length,
  );
  while (next.cursor.mainIndex < end) {
    const isDeferredCluster = next.cursor.mainIndex === options.deferMainIndex;
    next = completeCurrentCluster(next, nextTime, isDeferredCluster
      ? { deferFollowUpIndex: options.deferFollowUpIndex ?? 1 }
      : {});
    next = advanceQuizFlowMain(next, QUIZ_QUESTIONS, nextTime());
    if (next.mainCompleted) break;
  }
  return next;
}

test('완료 전 라운드는 답한 묶음이 있어도 학습 활동으로 만들지 않는다', () => {
  const nextTime = clock();
  let flow = completeCurrentCluster(session(), nextTime);
  flow = advanceQuizFlowMain(flow, QUIZ_QUESTIONS, nextTime());

  assert.equal(flow.roundOneCompleted, false);
  assert.deepEqual(completedQuizStudyAttempts(flow, QUIZ_QUESTIONS), []);
});

test('완료한 1라운드는 메인 1건과 완료한 메인별 꼬리 묶음을 정확한 스냅샷으로 만든다', () => {
  const flow = completeRound(session(), clock());
  const attempts = completedQuizStudyAttempts(flow, QUIZ_QUESTIONS);
  const main = attempts.find(({ kind }) => kind === 'quiz-main');
  const followUps = attempts.filter(({ kind }) => kind === 'quiz-follow-up');

  assert.equal(flow.roundOneCompleted, true);
  assert.equal(attempts.length, 1 + QUIZ_STAGE_SIZE);
  assert.equal(main.id, `quiz-main:${flow.id}:round-1`);
  assert.equal(main.questionResults.length, QUIZ_STAGE_SIZE);
  assert.equal(main.score.correct, QUIZ_STAGE_SIZE);
  assert.equal(main.bankVersion, QUIZ_STUDY_BANK_VERSION);
  assert.equal(main.sourceCommit, QUESTION_BY_ID.get(main.questionIds[0]).sourceCommit);
  assert.deepEqual(main.metadata, {
    sessionId: flow.id,
    round: 1,
    primarySourceId: flow.primarySourceId,
    categoryId: flow.categoryId,
    flowVersion: 2,
    questionCount: QUIZ_STAGE_SIZE,
  });
  assert.deepEqual(
    main.questionResults[0],
    {
      questionId: main.questionIds[0],
      sourceId: QUESTION_BY_ID.get(main.questionIds[0]).sourceId,
      selectedIndex: flow.answers[main.questionIds[0]].selectedIndex,
      correctIndex: QUESTION_BY_ID.get(main.questionIds[0]).correctIndex,
      isCorrect: true,
    },
  );
  assert.deepEqual(
    followUps.map(({ id }) => id),
    flow.mainQuestionIds.slice(0, QUIZ_STAGE_SIZE)
      .map((mainId) => `quiz-follow-up:${flow.id}:main:${mainId}`),
  );
  for (const attempt of followUps) {
    assert.equal(attempt.followUpOf !== null, true);
    assert.equal(attempt.questionResults.length, 2);
    assert.deepEqual(attempt.sourceIds, [...new Set(
      attempt.questionResults.map(({ sourceId }) => sourceId),
    )]);
  }
});

test('보류한 꼬리 묶음은 제외하고 재개해 모두 답한 뒤에만 결정적 ID로 추가한다', () => {
  const nextTime = clock();
  const flow = completeRound(session(), nextTime, {
    deferMainIndex: 0,
    deferFollowUpIndex: 1,
  });
  const deferredMainId = flow.mainQuestionIds[0];
  const deferredAttemptId = `quiz-follow-up:${flow.id}:main:${deferredMainId}`;
  const before = completedQuizStudyAttempts(flow, QUIZ_QUESTIONS);

  assert.equal(flow.mainCompleted, true);
  assert.equal(flow.deferredFollowUpIds.length, 1);
  assert.equal(before.some(({ id }) => id === deferredAttemptId), false);
  assert.equal(before.filter(({ kind }) => kind === 'quiz-main').length, 1);
  assert.equal(before.filter(({ kind }) => kind === 'quiz-follow-up').length, QUIZ_STAGE_SIZE - 1);

  let resumed = resumeDeferredQuizFlow(
    flow,
    flow.deferredFollowUpIds[0],
    QUIZ_QUESTIONS,
    nextTime(),
  );
  resumed = answerCurrent(resumed, nextTime);
  const after = completedQuizStudyAttempts(resumed, QUIZ_QUESTIONS);

  assert.equal(resumed.deferredFollowUpIds.length, 0);
  assert.equal(after.filter(({ id }) => id === deferredAttemptId).length, 1);
  assert.deepEqual(
    after.filter(({ kind }) => kind === 'quiz-main').map(({ id }) => id),
    before.filter(({ kind }) => kind === 'quiz-main').map(({ id }) => id),
  );
});

test('오답으로 세 번째 꼬리가 활성화되면 세 문항을 모두 끝낸 묶음만 기록한다', () => {
  const nextTime = clock();
  let flow = session();
  flow = completeCurrentCluster(flow, nextTime, { wrongFollowUpIndex: 0 });
  flow = advanceQuizFlowMain(flow, QUIZ_QUESTIONS, nextTime());
  while (!flow.roundOneCompleted) {
    flow = completeCurrentCluster(flow, nextTime);
    flow = advanceQuizFlowMain(flow, QUIZ_QUESTIONS, nextTime());
  }
  const firstMainId = flow.mainQuestionIds[0];
  const attempt = completedQuizStudyAttempts(flow, QUIZ_QUESTIONS)
    .find(({ followUpOf }) => followUpOf === firstMainId);

  assert.equal(getActiveFollowUpIds(flow, firstMainId, QUIZ_QUESTIONS).length, 3);
  assert.equal(attempt.questionResults.length, 3);
  assert.equal(attempt.score.incorrect, 1);
});

test('2라운드 완료는 별도 메인 ID와 해당 꼬리 묶음을 추가하고 1라운드 ID를 유지한다', () => {
  const nextTime = clock();
  const roundOne = completeRound(session(), nextTime);
  const roundOneAttempts = completedQuizStudyAttempts(roundOne, QUIZ_QUESTIONS);
  let roundTwo = startQuizFlowSecondRound(roundOne, nextTime());
  roundTwo = completeRound(roundTwo, nextTime);
  const allAttempts = completedQuizStudyAttempts(roundTwo, QUIZ_QUESTIONS);

  assert.equal(roundTwo.mainCompleted, true);
  assert.equal(allAttempts.filter(({ kind }) => kind === 'quiz-main').length, 2);
  assert.equal(allAttempts.some(({ id }) => id === `quiz-main:${roundTwo.id}:round-2`), true);
  assert.deepEqual(
    allAttempts.slice(0, roundOneAttempts.length).map(({ id }) => id),
    roundOneAttempts.map(({ id }) => id),
  );
  assert.equal(
    new Set(allAttempts.map(({ id }) => id)).size,
    allAttempts.length,
  );
});
