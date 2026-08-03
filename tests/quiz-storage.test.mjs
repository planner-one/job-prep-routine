import test from 'node:test';
import assert from 'node:assert/strict';
import { QUIZ_SAMPLE_QUESTIONS } from '../src/quiz-data.js';
import {
  answerQuizQuestion,
  createQuizSession,
  getQuizStageQuestionIds,
  revealQuizStage,
  scoreQuizSession,
  startAdditionalQuizStage,
} from '../src/quiz-core.js';
import {
  QUIZ_ATTEMPTS_KEY,
  QUIZ_STORAGE_NAMESPACE,
  LocalQuizStorage,
  clearQuizSession,
  createLocalQuizStorage,
  loadQuizAttempts,
  loadQuizSession,
  quizSessionKey,
  saveQuizAttempt,
  saveQuizSession,
} from '../src/quiz-storage.js';

function memoryStorage(entries = {}) {
  const values = new Map(Object.entries(entries));
  return {
    getItem: (key) => values.get(key) ?? null,
    setItem: (key, value) => values.set(key, value),
    removeItem: (key) => values.delete(key),
    snapshot: () => Object.fromEntries(values),
  };
}

// 저장 도메인 테스트는 10문항 수동 fixture를 쓴다. fixture는 배포 퀴즈 풀에는 포함되지 않는다.
const TEST_QUESTIONS = QUIZ_SAMPLE_QUESTIONS;
const VALID_IDS = new Set(TEST_QUESTIONS.map(({ id }) => id));

function completedSession() {
  const lookup = new Map(TEST_QUESTIONS.map((question) => [question.id, question]));
  let session = createQuizSession(TEST_QUESTIONS, {
    id: 'attempt-1',
    primarySourceId: 'be-1',
    categoryId: 'spring-application',
    date: '2026-07-21',
    now: new Date('2026-07-21T00:00:00Z'),
  });
  for (const id of getQuizStageQuestionIds(session, 1)) {
    session = answerQuizQuestion(session, id, lookup.get(id).correctIndex);
  }
  session = startAdditionalQuizStage(session);
  for (const id of getQuizStageQuestionIds(session, 2)) {
    session = answerQuizQuestion(session, id, lookup.get(id).correctIndex);
  }
  return revealQuizStage(session, 2, new Date('2026-07-21T01:00:00Z'));
}

function firstStageGradedSession() {
  const lookup = new Map(TEST_QUESTIONS.map((question) => [question.id, question]));
  let session = createQuizSession(TEST_QUESTIONS, {
    id: 'attempt-first-stage',
    primarySourceId: 'be-1',
    categoryId: 'spring-application',
    date: '2026-07-21',
    now: new Date('2026-07-21T00:00:00Z'),
  });
  for (const id of getQuizStageQuestionIds(session, 1)) {
    session = answerQuizQuestion(session, id, lookup.get(id).correctIndex);
  }
  return revealQuizStage(session, 1, new Date('2026-07-21T00:30:00Z'));
}

test('퀴즈는 기존 루틴·읽기·면접 키와 격리된 v1 네임스페이스를 쓴다', () => {
  assert.equal(QUIZ_STORAGE_NAMESPACE, 'job-prep-routine:quiz:v1');
  assert.equal(QUIZ_ATTEMPTS_KEY, 'job-prep-routine:quiz:v1:attempts');
  assert.equal(
    quizSessionKey('2026-07-21', 'be-1'),
    'job-prep-routine:quiz:v1:session:2026-07-21:be-1',
  );
});

test('날짜·원문별 세션을 정규화해 저장하고 다른 저장값은 보존한다', () => {
  const storage = memoryStorage({
    'job-prep-routine:daily:2026-07-21': '{"checkedIds":["x"]}',
    'job-prep-routine:maeil-reader:v1:state': '{"version":1}',
    'job-prep-routine:interview:state': '{"version":1}',
  });
  const session = createQuizSession(TEST_QUESTIONS, {
    primarySourceId: 'be-1', categoryId: 'spring-application', date: '2026-07-21',
  });
  const saved = saveQuizSession(storage, session, VALID_IDS);
  const loaded = loadQuizSession(storage, '2026-07-21', 'be-1', VALID_IDS);

  assert.deepEqual(loaded, saved);
  const snapshot = storage.snapshot();
  assert.equal(snapshot['job-prep-routine:daily:2026-07-21'], '{"checkedIds":["x"]}');
  assert.equal(snapshot['job-prep-routine:maeil-reader:v1:state'], '{"version":1}');
  assert.equal(snapshot['job-prep-routine:interview:state'], '{"version":1}');
});

test('손상된 JSON·다른 날짜·알 수 없는 문항의 세션은 없는 값으로 복구한다', () => {
  const key = quizSessionKey('2026-07-21', 'be-1');
  const broken = memoryStorage({ [key]: '{broken' });
  assert.equal(loadQuizSession(broken, '2026-07-21', 'be-1', VALID_IDS), null);

  const unknown = memoryStorage({
    [key]: JSON.stringify({
      version: 1, id: 'bad', date: '2026-07-21', primarySourceId: 'be-1', questionIds: ['unknown'],
    }),
  });
  assert.equal(loadQuizSession(unknown, '2026-07-21', 'be-1', VALID_IDS), null);
});

test('세션 삭제는 정확한 날짜·원문 키만 제거한다', () => {
  const firstKey = quizSessionKey('2026-07-21', 'be-1');
  const secondKey = quizSessionKey('2026-07-22', 'be-1');
  const storage = memoryStorage({ [firstKey]: '{}', [secondKey]: '{"keep":true}' });
  clearQuizSession(storage, '2026-07-21', 'be-1');
  assert.equal(storage.snapshot()[firstKey], undefined);
  assert.equal(storage.snapshot()[secondKey], '{"keep":true}');
});

test('완료된 시도와 1·2차 점수를 저장하고 같은 ID는 최신 값으로 교체한다', () => {
  const storage = memoryStorage();
  const session = completedSession();
  const score = scoreQuizSession(session, TEST_QUESTIONS, { throughStage: 2 });
  const attempt = {
    id: session.id,
    session,
    score,
    savedAt: '2026-07-21T01:00:00.000Z',
    sourceCommit: 'd00877afb0a302072078d34ded66b3b69143a5ca',
    generationModel: 'qwen3:4b',
    validatorModel: 'qwen3:14b',
    promptVersion: 'maeil-quiz-v1',
  };

  saveQuizAttempt(storage, attempt, VALID_IDS);
  saveQuizAttempt(storage, { ...attempt, savedAt: '2026-07-21T02:00:00.000Z' }, VALID_IDS);
  const attempts = loadQuizAttempts(storage, VALID_IDS);

  assert.equal(attempts.length, 1);
  assert.equal(attempts[0].score.total, 10);
  assert.equal(attempts[0].score.correct, 10);
  assert.deepEqual(attempts[0].score.stageBreakdown.map(({ total }) => total), [5, 5]);
  assert.equal(attempts[0].savedAt, '2026-07-21T02:00:00.000Z');
  assert.equal(attempts[0].sourceCommit, attempt.sourceCommit);
  assert.equal(attempts[0].generationModel, attempt.generationModel);
  assert.equal(attempts[0].validatorModel, attempt.validatorModel);
  assert.equal(attempts[0].promptVersion, attempt.promptVersion);
});

test('첫 5문제만 채점한 시도도 미사용 문항 제외용 기록으로 저장한다', () => {
  const storage = memoryStorage();
  const session = firstStageGradedSession();
  const score = scoreQuizSession(session, TEST_QUESTIONS, { throughStage: 1 });
  const firstFive = session.questionIds.slice(0, 5);
  const questionProvenance = firstFive.map((questionId) => ({
    questionId,
    sourceId: 'be-1',
    sourceCommit: 'd00877afb0a302072078d34ded66b3b69143a5ca',
    origin: 'human-authored',
    generationModel: 'human-authored',
    validatorModel: 'human-reviewed',
    promptVersion: 'manual-sample-v1',
  }));

  saveQuizAttempt(storage, {
    id: session.id,
    session,
    score,
    savedAt: session.updatedAt,
    sourceCommit: 'd00877afb0a302072078d34ded66b3b69143a5ca',
    generationModel: 'human-authored',
    validatorModel: 'human-reviewed',
    promptVersion: 'manual-sample-v1',
    questionProvenance,
  }, VALID_IDS);
  const [attempt] = loadQuizAttempts(storage, VALID_IDS);

  assert.equal(attempt.session.status, 'stage-one-graded');
  assert.equal(attempt.score.total, 5);
  assert.equal(attempt.score.throughStage, 1);
  assert.deepEqual(attempt.questionProvenance.map(({ questionId }) => questionId), firstFive);
});

test('채점하지 않은 세션은 시도 기록으로 저장하지 않는다', () => {
  const storage = memoryStorage();
  const session = createQuizSession(TEST_QUESTIONS, {
    primarySourceId: 'be-1', categoryId: 'spring-application', date: '2026-07-21',
  });
  const score = scoreQuizSession(session, TEST_QUESTIONS, { throughStage: 1 });
  assert.throws(() => saveQuizAttempt(storage, { session, score }, VALID_IDS), /채점된 퀴즈/u);
  assert.deepEqual(loadQuizAttempts(storage, VALID_IDS), []);
});

test('LocalQuizStorage 어댑터는 도메인에 localStorage 구현 세부사항을 노출하지 않는다', () => {
  const storage = memoryStorage();
  const adapter = createLocalQuizStorage(storage);
  assert.equal(adapter instanceof LocalQuizStorage, true);
  const session = createQuizSession(TEST_QUESTIONS, {
    primarySourceId: 'be-1', categoryId: 'spring-application', date: '2026-07-21',
  });
  adapter.saveSession(session, VALID_IDS);
  assert.deepEqual(adapter.loadSession('2026-07-21', 'be-1', VALID_IDS), session);
  adapter.clearSession('2026-07-21', 'be-1');
  assert.equal(adapter.loadSession('2026-07-21', 'be-1', VALID_IDS), null);
});
