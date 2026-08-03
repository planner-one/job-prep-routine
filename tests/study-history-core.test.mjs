import test from 'node:test';
import assert from 'node:assert/strict';
import {
  STUDY_ATTEMPT_KINDS,
  STUDY_HISTORY_VERSION,
  collectWrongAnswers,
  createStudyAttempt,
  listInterruptedSessions,
  listStudyAttempts,
  logicalStudyDate,
  normalizeStudyHistoryState,
  summarizeStudyHistory,
} from '../src/study-history-core.js';

const COMMIT = 'd00877afb0a302072078d34ded66b3b69143a5ca';

function mainAttempt(overrides = {}) {
  return createStudyAttempt({
    id: 'quiz-main-1',
    kind: 'quiz-main',
    startedAt: '2026-07-21T16:30:00.000Z',
    completedAt: '2026-07-21T16:45:00.000Z',
    sourceIds: ['be-1', 'be-2'],
    questionResults: [
      { questionId: 'quiz-be-1-main', sourceId: 'be-1', selectedIndex: 1, correctIndex: 1 },
      { questionId: 'quiz-be-2-main', sourceId: 'be-2', selectedIndex: 0, correctIndex: 2 },
    ],
    bankVersion: 'quiz-bank-v2',
    sourceCommit: COMMIT,
    ...overrides,
  });
}

test('학습 기록은 오전 2시 논리 날짜와 명시적 v1 계약을 사용한다', () => {
  assert.equal(STUDY_HISTORY_VERSION, 1);
  assert.deepEqual(STUDY_ATTEMPT_KINDS, [
    'reading', 'quiz-main', 'quiz-follow-up', 'interview-self', 'interview-ai',
  ]);
  assert.equal(logicalStudyDate(new Date(2026, 6, 22, 1, 59)), '2026-07-21');
  assert.equal(logicalStudyDate(new Date(2026, 6, 22, 2, 0)), '2026-07-22');
});

test('퀴즈 본문 기록은 선택 답·정오답·점수·문항/원문/은행 버전을 불변 스냅샷으로 남긴다', () => {
  const attempt = mainAttempt();
  assert.equal(attempt.logicalDate, '2026-07-21');
  assert.equal(attempt.status, 'completed');
  assert.deepEqual(attempt.questionIds, ['quiz-be-1-main', 'quiz-be-2-main']);
  assert.deepEqual(attempt.score, { total: 2, correct: 1, incorrect: 1, unanswered: 0, percent: 50 });
  assert.equal(attempt.questionResults[0].isCorrect, true);
  assert.equal(attempt.questionResults[1].isCorrect, false);
  assert.equal(attempt.bankVersion, 'quiz-bank-v2');
  assert.equal(attempt.sourceCommit, COMMIT);
  assert.throws(() => { attempt.sourceIds.push('be-9'); }, TypeError);
});

test('읽기·면접 자가/AI 기록은 점수를 강제하지 않고 원문과 모델/프롬프트 버전을 보존한다', () => {
  const reading = createStudyAttempt({
    id: 'read-1', kind: 'reading', completedAt: '2026-07-21T18:00:00.000Z',
    sourceIds: ['be-3'], sourceCommit: COMMIT,
  });
  const self = createStudyAttempt({
    id: 'self-1', kind: 'interview-self', completedAt: '2026-07-21T18:10:00.000Z',
    sourceIds: ['be-3'], questionIds: ['be-3'], sourceCommit: COMMIT,
    metadata: { confidence: 4, keywords: '트랜잭션', memo: '프록시 설명 보완' },
  });
  const ai = createStudyAttempt({
    id: 'ai-1', kind: 'interview-ai', completedAt: '2026-07-21T18:20:00.000Z',
    sourceIds: ['be-3'], questionIds: ['be-3'], sourceCommit: COMMIT,
    modelVersion: 'qwen3:14b', promptVersion: 'interview-v2',
  });

  assert.equal(reading.score, null);
  assert.equal(self.metadata.confidence, 4);
  assert.equal(ai.modelVersion, 'qwen3:14b');
  assert.equal(ai.promptVersion, 'interview-v2');
});

test('중단 세션은 재개 참조와 현재 위치를 저장하지만 완료 시도와 섞이지 않는다', () => {
  const interrupted = createStudyAttempt({
    id: 'quiz-paused', kind: 'quiz-main', startedAt: '2026-07-21T16:00:00.000Z',
    sourceIds: ['be-4'], questionIds: ['q-1', 'q-2'], sourceCommit: COMMIT,
    status: 'interrupted', resume: { sessionId: 'session-4', nextQuestionIndex: 1 },
  });
  const state = normalizeStudyHistoryState({ attempts: [mainAttempt(), interrupted] });
  assert.equal(listInterruptedSessions(state).length, 1);
  assert.equal(listInterruptedSessions(state)[0].resume.sessionId, 'session-4');
  assert.equal(listStudyAttempts(state, { status: 'completed' }).length, 1);
});

test('손상된 값, 중복 ID, 잘못된 정답 인덱스는 버리고 v0 배열 기록은 안전하게 마이그레이션한다', () => {
  const valid = mainAttempt();
  const migrated = normalizeStudyHistoryState([
    valid,
    { ...valid },
    { ...valid, id: 'bad', questionResults: [{ questionId: 'q', sourceId: 'be-1', selectedIndex: 4, correctIndex: 0 }] },
  ]);
  assert.equal(migrated.version, 1);
  assert.equal(migrated.attempts.length, 1);
  assert.equal(migrated.attempts[0].id, valid.id);
});

test('날짜·유형·글 필터, 날짜 요약, 오답 집계는 누적 시도에서 계산한다', () => {
  const followUp = createStudyAttempt({
    id: 'follow-1', kind: 'quiz-follow-up', completedAt: '2026-07-21T18:30:00.000Z',
    sourceIds: ['be-2'], questionResults: [{ questionId: 'quiz-be-2-follow', sourceId: 'be-2', selectedIndex: 3, correctIndex: 1 }],
    sourceCommit: COMMIT, bankVersion: 'quiz-bank-v2', followUpOf: 'quiz-be-2-main',
  });
  const state = normalizeStudyHistoryState({ attempts: [mainAttempt(), followUp] });
  assert.equal(listStudyAttempts(state, { sourceId: 'be-2' }).length, 2);
  assert.equal(listStudyAttempts(state, { kind: 'quiz-follow-up' }).length, 1);
  assert.deepEqual(summarizeStudyHistory(state, { date: '2026-07-22' }), {
    date: '2026-07-22', attempts: 1, reading: 0, quizMain: 0, quizFollowUp: 1,
    interviewSelf: 0, interviewAi: 0, quizAnswered: 1, quizCorrect: 0, quizPercent: 0,
  });
  const wrong = collectWrongAnswers(state);
  assert.equal(wrong.length, 2);
  assert.deepEqual(wrong.map(({ questionId }) => questionId), ['quiz-be-2-follow', 'quiz-be-2-main']);
});
