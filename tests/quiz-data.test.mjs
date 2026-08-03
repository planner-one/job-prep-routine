import test from 'node:test';
import assert from 'node:assert/strict';
import {
  QUIZ_DATA_CONTRACT,
  QUIZ_QUESTIONS,
  QUIZ_SAMPLE_QUESTIONS,
  QUIZ_SOURCE,
  QUIZ_SOURCE_EXCERPTS,
  getQuizQuestion,
  getQuizQuestionProvenance,
} from '../src/quiz-data.js';
import { validateBundledQuizData, validateQuizDataset } from '../scripts/validate-quiz-data.mjs';
import {
  QUIZ_GENERATED_QUESTIONS,
  QUIZ_GENERATION,
} from '../src/quiz-questions.generated.js';

test('QuizQuestion·QuizSession v2 데이터 계약을 명시한다', () => {
  assert.equal(QUIZ_DATA_CONTRACT.question.name, 'QuizQuestion');
  assert.equal(QUIZ_DATA_CONTRACT.question.version, 2);
  assert.equal(QUIZ_DATA_CONTRACT.question.choiceCount, 4);
  assert.equal(QUIZ_DATA_CONTRACT.question.selectableReviewStatus, 'verified');
  assert.equal(QUIZ_DATA_CONTRACT.session.name, 'QuizSession');
  assert.equal(QUIZ_DATA_CONTRACT.session.version, 2);
  assert.equal(QUIZ_DATA_CONTRACT.session.stageSize, 5);
  assert.equal(QUIZ_DATA_CONTRACT.session.maximumQuestionCount, 10);
  for (const field of [
    'version', 'id', 'date', 'primarySourceId', 'categoryId', 'mainQuestionIds',
    'followUpIdsByMain', 'cursor', 'status', 'answers', 'deferredFollowUpIds',
    'roundOneCompleted', 'mainCompleted', 'fullyCompleted', 'startedAt', 'updatedAt', 'completedAt',
  ]) {
    assert.equal(QUIZ_DATA_CONTRACT.session.requiredFields.includes(field), true, field);
  }
  for (const field of [
    'version', 'id', 'question', 'choices', 'correctIndex', 'explanation', 'categoryId',
    'choiceFeedback', 'keyPoints', 'sourceId', 'sourceCommit', 'sourceHeading',
    'sourceAnchor', 'evidenceQuote', 'reviewStatus',
  ]) {
    assert.equal(QUIZ_DATA_CONTRACT.question.requiredFields.includes(field), true, field);
  }
});

test('수동 검수 샘플 10문항은 고정 커밋 원문으로 기계 검증을 통과한다', () => {
  assert.deepEqual(QUIZ_SOURCE, {
    repository: 'maeil-mail/maeil-mail-contents',
    snapshotCommit: 'd00877afb0a302072078d34ded66b3b69143a5ca',
    contentPath: 'backend/contents',
  });
  const result = validateQuizDataset(QUIZ_SAMPLE_QUESTIONS, { sourceTexts: QUIZ_SOURCE_EXCERPTS });
  assert.equal(result.valid, true);
  assert.equal(result.questionCount, 10);
  assert.equal(validateBundledQuizData().questionCount, QUIZ_QUESTIONS.length);
});

test('수동 fixture는 계약을 지키지만 실제 퀴즈 풀에 포함되지 않는다', () => {
  assert.deepEqual(QUIZ_QUESTIONS, QUIZ_GENERATED_QUESTIONS);
  assert.equal(new Set(QUIZ_QUESTIONS.map(({ id }) => id)).size, QUIZ_QUESTIONS.length);
  for (const question of QUIZ_SAMPLE_QUESTIONS) {
    assert.equal(question.version, 2);
    assert.equal(question.choices.length, 4);
    assert.equal(new Set(question.choices).size, 4);
    assert.equal(Number.isInteger(question.correctIndex), true);
    assert.equal(question.correctIndex >= 0 && question.correctIndex <= 3, true);
    assert.equal(question.sourceCommit, QUIZ_SOURCE.snapshotCommit);
    assert.equal(QUIZ_SOURCE_EXCERPTS[question.sourceId].includes(question.evidenceQuote), true);
    assert.equal(question.reviewStatus, 'verified');
    assert.equal(getQuizQuestion(question.id), null);
  }
  assert.equal(getQuizQuestion('unknown'), null);
});

test('사전 생성 문항은 생성·검증 모델과 프롬프트·출처 커밋 이력을 함께 고정한다', () => {
  assert.equal(QUIZ_GENERATION.version, 2);
  assert.equal(QUIZ_GENERATION.mainCount, 152);
  assert.equal(QUIZ_GENERATION.followUpCount, 456);
  assert.equal(QUIZ_GENERATED_QUESTIONS.length, 608);
  assert.equal(QUIZ_GENERATION.sourceCommit, QUIZ_SOURCE.snapshotCommit);
  assert.equal(QUIZ_GENERATION.acceptedCount, QUIZ_GENERATED_QUESTIONS.length);
  assert.equal(typeof QUIZ_GENERATION.model, 'string');
  assert.equal(typeof QUIZ_GENERATION.validatorModel, 'string');
  assert.equal(typeof QUIZ_GENERATION.promptVersion, 'string');
  assert.equal(QUIZ_GENERATED_QUESTIONS.every(({ sourceCommit, reviewStatus }) => (
    sourceCommit === QUIZ_SOURCE.snapshotCommit && reviewStatus === 'verified'
  )), true);
});

test('배포 퀴즈 데이터는 모든 메인에 꼬리 문제 3개가 없으면 검증을 거부한다', () => {
  const incomplete = QUIZ_QUESTIONS.filter(({ id }) => id !== 'quiz-be-3-follow-up-3');
  assert.throws(
    () => validateQuizDataset(incomplete, { requireFollowUpsPerMain: 3 }),
    /quiz-be-3-main: 검증된 꼬리 질문 1·2·3번이 모두 필요합니다/u,
  );
});

test('시도 저장용 문항별 이력은 정적 원문 검증 문항의 작성·검증 이력을 반환한다', () => {
  assert.equal(getQuizQuestionProvenance(QUIZ_SAMPLE_QUESTIONS[0].id), null);
  if (QUIZ_GENERATED_QUESTIONS.length > 0) {
    const generated = QUIZ_GENERATED_QUESTIONS[0];
    assert.deepEqual(getQuizQuestionProvenance(generated.id), {
      questionId: generated.id,
      sourceId: generated.sourceId,
      sourceCommit: QUIZ_SOURCE.snapshotCommit,
      origin: 'codex-curated',
      generationModel: QUIZ_GENERATION.model,
      validatorModel: QUIZ_GENERATION.validatorModel,
      promptVersion: QUIZ_GENERATION.promptVersion,
    });
  }
  assert.equal(getQuizQuestionProvenance('unknown'), null);
});

test('검증 스크립트는 근거 인용이 원문에 없거나 커밋이 다르면 실패한다', () => {
  const invalidEvidence = QUIZ_SAMPLE_QUESTIONS.map((question, index) => (
    index === 0 ? { ...question, evidenceQuote: '없는 인용' } : question
  ));
  assert.throws(
    () => validateQuizDataset(invalidEvidence, { sourceTexts: QUIZ_SOURCE_EXCERPTS }),
    /근거 인용이 원문과 정확히 일치/u,
  );

  const invalidCommit = QUIZ_SAMPLE_QUESTIONS.map((question, index) => (
    index === 0 ? { ...question, sourceCommit: 'main' } : question
  ));
  assert.throws(
    () => validateQuizDataset(invalidCommit, { sourceTexts: QUIZ_SOURCE_EXCERPTS }),
    /출처 커밋이 기준 커밋과 다릅니다/u,
  );
});

test('검증 스크립트는 인용의 heading 구역과 sourceId의 공식 카테고리까지 확인한다', () => {
  const wrongHeading = QUIZ_SAMPLE_QUESTIONS.map((question, index) => (
    index === 0
      ? { ...question, sourceHeading: '스프링 방식의 OSIV의 문제점을 한 번 생각해볼까요?' }
      : question
  ));
  assert.throws(
    () => validateQuizDataset(wrongHeading, { sourceTexts: QUIZ_SOURCE_EXCERPTS }),
    /출처 제목 구역 아래/u,
  );

  const wrongCategory = QUIZ_SAMPLE_QUESTIONS.map((question, index) => (
    index === 0 ? { ...question, categoryId: 'persistence-database' } : question
  ));
  assert.throws(
    () => validateQuizDataset(wrongCategory, { sourceTexts: QUIZ_SOURCE_EXCERPTS }),
    /공식 카테고리와 다릅니다/u,
  );
});

test('5+5 보충을 위해 지정한 모든 카테고리에 최소 10문항을 요구할 수 있다', () => {
  assert.throws(
    () => validateQuizDataset(QUIZ_SAMPLE_QUESTIONS, {
      sourceTexts: QUIZ_SOURCE_EXCERPTS,
      minimumPerCategory: 10,
      categoryIds: ['spring-application', 'persistence-database'],
    }),
    /persistence-database 0문항/u,
  );

  const result = validateQuizDataset(QUIZ_SAMPLE_QUESTIONS, {
    sourceTexts: QUIZ_SOURCE_EXCERPTS,
    minimumPerCategory: 10,
    categoryIds: ['spring-application'],
  });
  assert.equal(result.categoryCounts['spring-application'], 10);
});
