import test from 'node:test';
import assert from 'node:assert/strict';
import { QUIZ_QUESTIONS } from '../src/quiz-data.js';
import { createQuizFlowSession } from '../src/quiz-flow-core.js';
import {
  QUIZ_FLOW_STORAGE_NAMESPACE,
  clearQuizFlowSession,
  loadQuizFlowSession,
  quizFlowSessionKey,
  saveQuizFlowSession,
} from '../src/quiz-flow-storage.js';
import { quizSessionKey } from '../src/quiz-storage.js';

function storage() {
  const map = new Map();
  return {
    getItem: (key) => map.get(key) ?? null,
    setItem: (key, value) => map.set(key, String(value)),
    removeItem: (key) => map.delete(key),
    map,
  };
}

test('v2 저장소는 v1 키와 분리하고 v1 원본을 삭제하지 않은 채 복사 마이그레이션한다', () => {
  const store = storage();
  const seed = createQuizFlowSession(QUIZ_QUESTIONS, {
    primarySourceId: 'be-1',
    categoryId: 'spring-application',
    date: '2026-07-23',
    allowUsedFallback: true,
    now: new Date('2026-07-23T03:00:00Z'),
  });
  const legacy = {
    version: 1,
    id: 'legacy',
    date: seed.date,
    primarySourceId: seed.primarySourceId,
    categoryId: seed.categoryId,
    questionIds: seed.mainQuestionIds,
    currentStage: 1,
    status: 'in-progress',
    answers: {},
    revealedStages: [],
    startedAt: seed.startedAt,
    updatedAt: seed.updatedAt,
    completedAt: null,
  };
  const legacyKey = quizSessionKey(seed.date, seed.primarySourceId);
  store.setItem(legacyKey, JSON.stringify(legacy));
  const migrated = loadQuizFlowSession(store, seed.date, seed.primarySourceId, QUIZ_QUESTIONS);
  assert.equal(migrated.version, 2);
  assert.match(quizFlowSessionKey(seed.date, seed.primarySourceId), new RegExp(`^${QUIZ_FLOW_STORAGE_NAMESPACE}`));
  assert.equal(store.getItem(legacyKey), JSON.stringify(legacy));
});

test('v2 세션 저장·삭제는 마이그레이션으로 제거한 세션이 되살아나지 않게 한다', () => {
  const store = storage();
  const flow = createQuizFlowSession(QUIZ_QUESTIONS, {
    primarySourceId: 'be-1',
    categoryId: 'spring-application',
    date: '2026-07-23',
    allowUsedFallback: true,
    now: new Date('2026-07-23T03:00:00Z'),
  });
  saveQuizFlowSession(store, flow, QUIZ_QUESTIONS);
  assert.equal(loadQuizFlowSession(store, flow.date, flow.primarySourceId, QUIZ_QUESTIONS).id, flow.id);
  clearQuizFlowSession(store, flow.date, flow.primarySourceId);
  assert.equal(loadQuizFlowSession(store, flow.date, flow.primarySourceId, QUIZ_QUESTIONS), null);
});
