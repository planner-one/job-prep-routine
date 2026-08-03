import test from 'node:test';
import assert from 'node:assert/strict';
import { QUIZ_QUESTIONS, getQuizQuestion } from '../src/quiz-data.js';
import {
  QUIZ_FLOW_SESSION_VERSION,
  advanceQuizFlowMain,
  answerQuizFlowQuestion,
  createQuizFlowSession,
  deferQuizFlowQuestion,
  getActiveFollowUpIds,
  migrateLegacyQuizSession,
  scoreQuizFlow,
} from '../src/quiz-flow-core.js';

const NOW = new Date('2026-07-23T03:00:00.000Z');

function session() {
  return createQuizFlowSession(QUIZ_QUESTIONS, {
    primarySourceId: 'be-1',
    categoryId: 'spring-application',
    date: '2026-07-23',
    allowUsedFallback: true,
    now: NOW,
  });
}

test('모든 메인은 기본 꼬리 2개와 보강 꼬리 1개를 순서대로 연결한다', () => {
  const mains = QUIZ_QUESTIONS.filter(({ kind }) => kind === 'main');
  const tails = QUIZ_QUESTIONS.filter(({ kind }) => kind === 'follow-up');
  assert.equal(mains.length, 152);
  assert.equal(tails.length, 456);
  for (const main of mains) {
    const linked = tails.filter(({ followUpOf }) => followUpOf === main.id)
      .sort((a, b) => a.followUpOrder - b.followUpOrder);
    assert.deepEqual(linked.map(({ followUpOrder }) => followUpOrder), [1, 2, 3]);
    assert.deepEqual(linked.map(({ followUpRole }) => followUpRole), ['core', 'core', 'remediation']);
  }
});

test('메인 또는 기본 꼬리 오답일 때만 보강 꼬리 3번을 활성화한다', () => {
  let flow = session();
  const mainId = flow.mainQuestionIds[0];
  const main = getQuizQuestion(mainId);
  assert.equal(getActiveFollowUpIds(flow, mainId, QUIZ_QUESTIONS).length, 2);

  flow = answerQuizFlowQuestion(flow, mainId, main.correctIndex, QUIZ_QUESTIONS, NOW);
  const firstTailId = getActiveFollowUpIds(flow, mainId, QUIZ_QUESTIONS)[0];
  const firstTail = getQuizQuestion(firstTailId);
  flow = answerQuizFlowQuestion(
    flow,
    firstTailId,
    (firstTail.correctIndex + 1) % 4,
    QUIZ_QUESTIONS,
    NOW,
  );
  assert.equal(getActiveFollowUpIds(flow, mainId, QUIZ_QUESTIONS).length, 3);

  const wrongMainFlow = answerQuizFlowQuestion(session(), mainId, (main.correctIndex + 1) % 4, QUIZ_QUESTIONS, NOW);
  assert.equal(getActiveFollowUpIds(wrongMainFlow, mainId, QUIZ_QUESTIONS).length, 3);
});

test('꼬리 문제는 보류 후 다음 메인으로 이동하며 점수 분모에서 제외한다', () => {
  let flow = session();
  const mainId = flow.mainQuestionIds[0];
  const main = getQuizQuestion(mainId);
  flow = answerQuizFlowQuestion(flow, mainId, main.correctIndex, QUIZ_QUESTIONS, NOW);
  const tails = getActiveFollowUpIds(flow, mainId, QUIZ_QUESTIONS);
  flow = deferQuizFlowQuestion(flow, tails[0], QUIZ_QUESTIONS, NOW);
  const second = getQuizQuestion(tails[1]);
  flow = answerQuizFlowQuestion(flow, second.id, second.correctIndex, QUIZ_QUESTIONS, NOW);
  const score = scoreQuizFlow(flow, QUIZ_QUESTIONS);
  assert.equal(score.followUp.available, 10);
  assert.equal(score.followUp.answered, 1);
  assert.equal(score.followUp.percent, 100);
  assert.equal(score.deferred, 1);
  flow = advanceQuizFlowMain(flow, QUIZ_QUESTIONS, NOW);
  assert.equal(flow.cursor.mainIndex, 1);
});

test('v1 세션은 기존 메인 답을 보존하고 새 꼬리를 미풀이로 추가한다', () => {
  const created = session();
  const mainId = created.mainQuestionIds[0];
  const legacy = {
    version: 1,
    id: 'legacy',
    date: '2026-07-23',
    primarySourceId: 'be-1',
    categoryId: 'spring-application',
    questionIds: created.mainQuestionIds,
    currentStage: 1,
    status: 'in-progress',
    answers: { [mainId]: getQuizQuestion(mainId).correctIndex },
    startedAt: NOW.toISOString(),
    updatedAt: NOW.toISOString(),
  };
  const migrated = migrateLegacyQuizSession(legacy, QUIZ_QUESTIONS, NOW);
  assert.equal(migrated.version, QUIZ_FLOW_SESSION_VERSION);
  assert.equal(migrated.answers[mainId].isCorrect, true);
  assert.equal(Object.keys(migrated.followUpIdsByMain).length, 10);
  assert.equal(migrated.followUpIdsByMain[mainId].length, 3);
  assert.equal(migrated.deferredFollowUpIds.length, 0);
  assert.equal(migrated.migratedFromV1, true);
});
