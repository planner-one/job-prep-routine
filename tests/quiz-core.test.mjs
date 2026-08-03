import test from 'node:test';
import assert from 'node:assert/strict';
import {
  QUIZ_MAX_QUESTIONS,
  QUIZ_QUESTION_KINDS,
  QUIZ_QUESTION_VERSION,
  QUIZ_REVIEW_STATUSES,
  QUIZ_SESSION_STATUSES,
  QUIZ_SESSION_VERSION,
  QUIZ_STAGE_SIZE,
  answerQuizQuestion,
  createQuizSeed,
  createQuizSession,
  getQuizStageQuestionIds,
  isQuizStageComplete,
  logicalQuizDate,
  normalizeQuizSession,
  revealQuizStage,
  scoreQuizSession,
  selectQuizQuestions,
  selectFollowUpQuestion,
  startAdditionalQuizStage,
  validateQuizQuestion,
  validateQuizQuestions,
} from '../src/quiz-core.js';

const COMMIT = 'd00877afb0a302072078d34ded66b3b69143a5ca';

function fixtureQuestion(id, sourceId, categoryId = 'spring', patch = {}) {
  const kind = patch.kind ?? 'main';
  return {
    version: QUIZ_QUESTION_VERSION,
    id,
    kind,
    followUpOf: kind === 'follow-up' ? patch.followUpOf : null,
    followUpOrder: kind === 'follow-up' ? (patch.followUpOrder ?? 1) : null,
    followUpRole: kind === 'follow-up' ? (patch.followUpRole ?? 'core') : null,
    question: `문항 ${id}`,
    choices: ['정답', '오답 A', '오답 B', '오답 C'],
    correctIndex: 0,
    explanation: `해설 ${id}`,
    choiceFeedback: [`해설 ${id}`, '오답 A 근거', '오답 B 근거', '오답 C 근거'],
    keyPoints: ['핵심', sourceId],
    categoryId,
    sourceId,
    sourceCommit: COMMIT,
    sourceHeading: `제목 ${sourceId}`,
    sourceAnchor: `source-${sourceId}`,
    evidenceQuote: `근거 ${id}`,
    reviewStatus: 'verified',
    ...patch,
  };
}

function fixturePool() {
  return [
    ...Array.from({ length: 3 }, (_, index) => fixtureQuestion(`primary-${index + 1}`, 'be-1')),
    ...Array.from({ length: 4 }, (_, index) => fixtureQuestion(`today-${index + 1}`, 'be-2')),
    ...Array.from({ length: 6 }, (_, index) => fixtureQuestion(`category-${index + 1}`, 'be-3')),
    ...Array.from({ length: 4 }, (_, index) => fixtureQuestion(`other-${index + 1}`, 'be-4', 'database')),
  ];
}

test('QuizQuestion v2와 레거시 QuizSession v1 공개 계약을 제공한다', () => {
  assert.equal(QUIZ_QUESTION_VERSION, 2);
  assert.equal(QUIZ_SESSION_VERSION, 1);
  assert.equal(QUIZ_STAGE_SIZE, 5);
  assert.equal(QUIZ_MAX_QUESTIONS, 10);
  assert.deepEqual(QUIZ_QUESTION_KINDS, ['main', 'follow-up']);
  assert.deepEqual(QUIZ_REVIEW_STATUSES, [
    'draft', 'mechanically-verified', 'verified', 'rejected',
  ]);
  assert.deepEqual(QUIZ_SESSION_STATUSES, ['in-progress', 'stage-one-graded', 'completed']);
});

test('꼬리 질문은 원문 문항을 명시적으로 연결하고, 연결 대상은 같은 글의 메인 문항이어야 한다', () => {
  const main = fixtureQuestion('main-1', 'be-1', 'spring', { kind: 'main' });
  const followUp = fixtureQuestion('follow-up-1', 'be-1', 'spring', {
    kind: 'follow-up',
    followUpOf: 'main-1',
  });
  assert.equal(validateQuizQuestions([main, followUp]).valid, true);

  const invalid = validateQuizQuestions([main, {
    ...followUp,
    followUpOf: 'missing-main',
    sourceId: 'be-2',
  }]);
  assert.equal(invalid.valid, false);
  assert.match(invalid.errors.join('\n'), /가리키는 메인 문항을 찾을 수 없습니다|같은 출처/u);
});

test('5+5 출제 풀은 꼬리 질문을 제외하고, 틀린 메인 문항의 꼬리 질문을 우선 선택한다', () => {
  const mainOne = fixtureQuestion('main-1', 'be-1', 'spring', { kind: 'main', correctIndex: 0 });
  const mainTwo = fixtureQuestion('main-2', 'be-1', 'spring', { kind: 'main', correctIndex: 1 });
  const followOne = fixtureQuestion('follow-1', 'be-1', 'spring', { kind: 'follow-up', followUpOf: 'main-1' });
  const followTwo = fixtureQuestion('follow-2', 'be-1', 'spring', { kind: 'follow-up', followUpOf: 'main-2' });
  const selected = selectQuizQuestions([mainOne, mainTwo, followOne, followTwo], {
    primarySourceId: 'be-1', categoryId: 'spring', limit: 10, date: '2026-07-21',
  });
  assert.deepEqual(selected.map(({ id }) => id).sort(), ['main-1', 'main-2']);

  const tail = selectFollowUpQuestion([mainOne, mainTwo, followOne, followTwo], {
    questionIds: ['main-1', 'main-2'],
    answers: { 'main-1': 2, 'main-2': 1 },
  });
  assert.equal(tail.id, 'follow-1');
});

test('문항 계약은 4개의 고유한 선택지·단일 정답·출처 근거를 강제한다', () => {
  const valid = fixtureQuestion('q-1', 'be-1');
  const sourceTexts = { 'be-1': `## ${valid.sourceHeading}\n원문 앞 ${valid.evidenceQuote} 원문 뒤` };
  assert.deepEqual(validateQuizQuestion(valid, {
    expectedCommit: COMMIT,
    sourceTexts,
    sourceCategories: { 'be-1': 'spring' },
    requireVerified: true,
  }), { valid: true, errors: [] });

  const invalid = {
    ...valid,
    choices: ['같음', ' 같음 ', '세 번째'],
    correctIndex: 4,
    sourceCommit: 'wrong',
    evidenceQuote: '원문에 없음',
    reviewStatus: 'draft',
  };
  const result = validateQuizQuestion(invalid, {
    expectedCommit: COMMIT,
    sourceTexts,
    requireVerified: true,
  });
  assert.equal(result.valid, false);
  assert.match(result.errors.join('\n'), /정확히 4개/u);
  assert.match(result.errors.join('\n'), /correctIndex/u);
  assert.match(result.errors.join('\n'), /기준 커밋/u);
  assert.match(result.errors.join('\n'), /원문과 정확히 일치/u);
  assert.match(result.errors.join('\n'), /verified/u);
});

test('근거 인용은 선언한 heading 구역 아래에 있고 출처의 공식 카테고리와 일치해야 한다', () => {
  const evidenceQuote = '서비스는 트랜잭션 범위 안에서 동작합니다.';
  const sourceTexts = {
    'be-1': [
      '## 동작 원리',
      evidenceQuote,
      '',
      '## 주의사항',
      '커넥션 점유 시간을 확인합니다.',
    ].join('\n'),
  };
  const base = fixtureQuestion('q-heading', 'be-1', 'spring', {
    evidenceQuote,
    sourceHeading: '동작 원리',
  });

  assert.equal(validateQuizQuestion(base, {
    sourceTexts,
    sourceCategories: { 'be-1': 'spring' },
  }).valid, true);

  const wrongHeading = validateQuizQuestion({ ...base, sourceHeading: '주의사항' }, {
    sourceTexts,
    sourceCategories: { 'be-1': 'spring' },
  });
  assert.equal(wrongHeading.valid, false);
  assert.match(wrongHeading.errors.join('\n'), /출처 제목 구역 아래/u);

  const wrongCategory = validateQuizQuestion({ ...base, categoryId: 'database' }, {
    sourceTexts,
    sourceCategories: { 'be-1': 'spring' },
  });
  assert.equal(wrongCategory.valid, false);
  assert.match(wrongCategory.errors.join('\n'), /공식 카테고리와 다릅니다/u);
});

test('전체 검증은 문항 ID와 공백을 정규화한 문제 내용의 중복을 거부한다', () => {
  const first = fixtureQuestion('q-1', 'be-1', 'spring', { question: '  OSIV란   무엇인가? ' });
  const duplicateId = fixtureQuestion('q-1', 'be-2');
  const duplicateText = fixtureQuestion('q-3', 'be-3', 'spring', { question: 'osiv란 무엇인가?' });
  const result = validateQuizQuestions([first, duplicateId, duplicateText]);
  assert.equal(result.valid, false);
  assert.match(result.errors.join('\n'), /중복된 문항 ID/u);
  assert.match(result.errors.join('\n'), /문항 내용이 중복/u);
});

test('출제는 기준 원문→오늘의 다른 글→같은 카테고리 순서로 10문항을 고른다', () => {
  const selected = selectQuizQuestions(fixturePool(), {
    primarySourceId: 'be-1',
    todaySourceIds: ['be-1', 'be-2'],
    categoryId: 'spring',
    date: '2026-07-21',
  });

  assert.equal(selected.length, 10);
  assert.deepEqual(selected.slice(0, 3).map(({ sourceId }) => sourceId), ['be-1', 'be-1', 'be-1']);
  assert.deepEqual(selected.slice(3, 7).map(({ sourceId }) => sourceId), ['be-2', 'be-2', 'be-2', 'be-2']);
  assert.deepEqual(selected.slice(7).map(({ sourceId }) => sourceId), ['be-3', 'be-3', 'be-3']);
  assert.equal(new Set(selected.map(({ id }) => id)).size, 10);
});

test('오늘 목록이 한 글뿐이고 그 글의 문항이 부족해도 같은 카테고리에서 10문항을 보충한다', () => {
  const selected = selectQuizQuestions(fixturePool(), {
    primarySourceId: 'be-1',
    todaySourceIds: ['be-1'],
    categoryId: 'spring',
    date: '2026-07-21',
  });

  assert.equal(selected.length, 10);
  assert.deepEqual(selected.slice(0, 3).map(({ sourceId }) => sourceId), ['be-1', 'be-1', 'be-1']);
  assert.equal(selected.slice(3).every(({ categoryId, sourceId }) => categoryId === 'spring' && sourceId !== 'be-1'), true);
  assert.equal(new Set(selected.map(({ id }) => id)).size, selected.length);
});

test('같은 카테고리 메인 문항이 10개보다 적으면 검증된 다른 카테고리로 마지막 보충한다', () => {
  const pool = [
    fixtureQuestion('primary-1', 'be-1', 'architecture'),
    ...Array.from({ length: 8 }, (_, index) => fixtureQuestion(`architecture-${index}`, `be-a${index}`, 'architecture')),
    fixtureQuestion('global-1', 'be-global', 'security'),
  ];
  const selected = selectQuizQuestions(pool, {
    primarySourceId: 'be-1', categoryId: 'architecture', date: '2026-07-21',
  });
  assert.equal(selected.length, 10);
  assert.equal(selected.at(-1).id, 'global-1');
});

test('미사용 문항만 날짜 seed로 결정적 출제하고 입력 배열은 변경하지 않는다', () => {
  const pool = fixturePool();
  const snapshot = structuredClone(pool);
  const options = {
    primarySourceId: 'be-1', todaySourceIds: ['be-2'], categoryId: 'spring', date: '2026-07-21',
    usedQuestionIds: ['primary-1', 'today-1'],
  };
  const first = selectQuizQuestions(pool, options).map(({ id }) => id);
  const second = selectQuizQuestions([...pool].reverse(), options).map(({ id }) => id);

  assert.deepEqual(second, first);
  assert.equal(first.includes('primary-1'), false);
  assert.equal(first.includes('today-1'), false);
  assert.deepEqual(pool, snapshot);
});

test('미사용 문항이 10개보다 적으면 현재 세션 안에서만 중복 없이 과거 문항을 보충한다', () => {
  const pool = fixturePool();
  const usedQuestionIds = pool.slice(0, 10).map(({ id }) => id);
  const selected = selectQuizQuestions(pool, {
    primarySourceId: 'be-1', todaySourceIds: ['be-2'], categoryId: 'spring', date: '2026-07-21',
    usedQuestionIds,
    allowUsedFallback: true,
  });

  assert.equal(selected.length, 10);
  assert.equal(new Set(selected.map(({ id }) => id)).size, 10);
  const firstUsedIndex = selected.findIndex(({ id }) => usedQuestionIds.includes(id));
  assert.equal(selected.slice(0, firstUsedIndex).every(({ id }) => !usedQuestionIds.includes(id)), true);
  assert.equal(selected.slice(firstUsedIndex).every(({ id }) => usedQuestionIds.includes(id)), true);
});

test('오전 2시 경계의 논리 날짜로 출제 seed를 고정한다', () => {
  const beforeCutoff = new Date(2026, 6, 21, 1, 59, 59);
  const afterCutoff = new Date(2026, 6, 21, 2, 0, 0);
  assert.equal(logicalQuizDate(beforeCutoff), '2026-07-20');
  assert.equal(logicalQuizDate(afterCutoff), '2026-07-21');
  assert.equal(createQuizSeed({ now: beforeCutoff, primarySourceId: 'be-1' }), '2026-07-20:be-1');
  assert.equal(createQuizSeed({ now: afterCutoff, primarySourceId: 'be-1' }), '2026-07-21:be-1');
});

test('세션은 첫 5문제만 열고 답을 완료한 뒤 추가 5문제를 연다', () => {
  const pool = fixturePool();
  let session = createQuizSession(pool, {
    primarySourceId: 'be-1', todaySourceIds: ['be-2'], categoryId: 'spring',
    now: new Date('2026-07-21T12:00:00+09:00'),
  });
  assert.equal(session.version, 1);
  assert.equal(session.questionIds.length, 10);
  assert.equal(session.currentStage, 1);
  assert.equal(getQuizStageQuestionIds(session).length, 5);
  assert.equal(getQuizStageQuestionIds(session, 2).length, 5);
  assert.throws(() => answerQuizQuestion(session, session.questionIds[5], 0), /현재 단계/u);
  assert.throws(() => startAdditionalQuizStage(session), /첫 5문제/u);

  for (const id of getQuizStageQuestionIds(session, 1)) session = answerQuizQuestion(session, id, 0);
  assert.equal(isQuizStageComplete(session), true);
  const directAdditional = startAdditionalQuizStage(session);
  assert.equal(directAdditional.currentStage, 2);
  assert.deepEqual(directAdditional.revealedStages, []);

  const gradedFirst = revealQuizStage(session, 1);
  assert.equal(gradedFirst.status, 'stage-one-graded');
  assert.deepEqual(gradedFirst.revealedStages, [1]);
  assert.throws(() => answerQuizQuestion(gradedFirst, gradedFirst.questionIds[0], 1), /이미 채점/u);
  const afterGrading = startAdditionalQuizStage(gradedFirst);
  assert.equal(afterGrading.currentStage, 2);
  assert.deepEqual(afterGrading.revealedStages, [1]);
});

test('5문제와 10문제 채점은 1·2차 점수와 누적 점수를 나눠서 보여준다', () => {
  const pool = fixturePool();
  const lookup = new Map(pool.map((question) => [question.id, question]));
  let session = createQuizSession(pool, {
    primarySourceId: 'be-1', todaySourceIds: ['be-2'], categoryId: 'spring',
    date: '2026-07-21', now: new Date('2026-07-21T03:00:00Z'),
  });

  getQuizStageQuestionIds(session, 1).forEach((id, index) => {
    const correctIndex = lookup.get(id).correctIndex;
    session = answerQuizQuestion(session, id, index < 3 ? correctIndex : (correctIndex + 1) % 4);
  });
  const firstScore = scoreQuizSession(session, pool, { throughStage: 1 });
  assert.deepEqual(firstScore.stageBreakdown.map(({ total, correct }) => ({ total, correct })), [
    { total: 5, correct: 3 },
  ]);
  assert.equal(firstScore.correct, 3);
  assert.equal(firstScore.percent, 60);

  session = startAdditionalQuizStage(session);
  getQuizStageQuestionIds(session, 2).forEach((id, index) => {
    const correctIndex = lookup.get(id).correctIndex;
    session = answerQuizQuestion(session, id, index < 4 ? correctIndex : (correctIndex + 1) % 4);
  });
  session = revealQuizStage(session, 2, new Date('2026-07-21T04:00:00Z'));
  const finalScore = scoreQuizSession(session, pool, { throughStage: 2 });
  assert.deepEqual(finalScore.stageBreakdown.map(({ stage, total, correct }) => ({ stage, total, correct })), [
    { stage: 1, total: 5, correct: 3 },
    { stage: 2, total: 5, correct: 4 },
  ]);
  assert.equal(finalScore.total, 10);
  assert.equal(finalScore.correct, 7);
  assert.equal(finalScore.percent, 70);
  assert.equal(session.status, 'completed');
  assert.deepEqual(session.revealedStages, [1, 2]);
  assert.equal(session.completedAt, '2026-07-21T04:00:00.000Z');
});

test('손상된 세션은 알 수 없는 ID·중복·잘못된 답을 제거하여 정규화한다', () => {
  const normalized = normalizeQuizSession({
    version: 1,
    id: 'session-1',
    date: '2026-07-21',
    primarySourceId: 'be-1',
    questionIds: ['q-1', 'bad', 'q-1', 'q-2'],
    currentStage: 2,
    status: 'completed',
    answers: { 'q-1': 2, 'q-2': 8, bad: 0 },
    revealedStages: [2, 2, 9],
  }, new Set(['q-1', 'q-2']));

  assert.deepEqual(normalized.questionIds, ['q-1', 'q-2']);
  assert.deepEqual(normalized.answers, { 'q-1': 2 });
  assert.equal(normalized.currentStage, 1);
  assert.equal(normalized.status, 'in-progress');
  assert.deepEqual(normalized.revealedStages, []);
  assert.equal(normalizeQuizSession({ version: 1 }, new Set()), null);
});
