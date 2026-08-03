import test from 'node:test';
import assert from 'node:assert/strict';
import { AI_PROVIDER_ERROR_CODES, AiProviderError } from '../src/ai-provider.js';
import { MAEIL_CONTENT_COMMIT } from '../src/maeil-content.js';
import {
  INTERVIEW_EVALUATION_SCORE_KEYS,
  INTERVIEW_EVALUATION_VERSION,
  INTERVIEW_EVALUATION_WITHHELD_FIELDS,
  createInterviewEvaluationRequest,
  evaluateInterviewAnswer,
  hasExactEvidenceQuote,
  normalizeInterviewEvaluation,
} from '../src/interview-evaluation-core.js';

const REFERENCE = [
  '# OSIV',
  'OSIV는 영속성 컨텍스트를 뷰 렌더링까지 열어 둡니다.',
  '따라서 지연 로딩이 가능하지만 예상하지 못한 쿼리가 발생할 수 있습니다.',
].join('\n');

function rawEvaluation(overrides = {}) {
  return {
    scores: { accuracy: 85, coverage: 75, clarity: 90, interviewReadiness: 80 },
    strengths: [{
      feedback: '영속성 컨텍스트의 범위를 설명했습니다.',
      evidenceQuote: 'OSIV는 영속성 컨텍스트를 뷰 렌더링까지 열어 둡니다.',
    }],
    gaps: [{
      feedback: '쿼리 발생 가능성을 보완해야 합니다.',
      evidenceQuote: '예상하지 못한 쿼리가 발생할 수 있습니다.',
    }],
    unsupportedClaims: [],
    improvedAnswer: 'OSIV는 영속성 컨텍스트를 뷰까지 유지하며 지연 로딩을 돕지만 쿼리에 유의해야 합니다.',
    followUps: ['OSIV를 끄면 어떻게 설계할까요?', '지연 로딩 쿼리를 어떻게 확인할까요?'],
    evidence: [{
      feedback: 'OSIV의 동작 범위 근거',
      evidenceQuote: '영속성 컨텍스트를 뷰 렌더링까지 열어 둡니다.',
    }],
    ...overrides,
  };
}

function request() {
  return createInterviewEvaluationRequest({
    questionId: 'be-1',
    question: 'OSIV를 설명해 주세요.',
    userAnswer: '영속성 컨텍스트를 뷰까지 유지합니다.',
    referenceAnswer: REFERENCE,
    selfAssessment: { confidence: 4, keywords: '영속성 컨텍스트', memo: '쿼리 복습' },
  });
}

function envelope(evaluation = rawEvaluation()) {
  return {
    evaluation,
    provider: 'ollama',
    model: 'qwen3:14b',
    promptVersion: 'maeil-interview-evaluation-v1',
  };
}

test('면접 평가 공개 계약과 네 가지 점수 키를 제공한다', () => {
  assert.equal(INTERVIEW_EVALUATION_VERSION, 1);
  assert.deepEqual(INTERVIEW_EVALUATION_SCORE_KEYS, [
    'accuracy', 'coverage', 'clarity', 'interviewReadiness',
  ]);
  assert.deepEqual(INTERVIEW_EVALUATION_WITHHELD_FIELDS, [
    'scores', 'improvedAnswer', 'followUps',
  ]);
});

test('평가 요청은 매일메일 고정 커밋과 자가평가를 정규화한다', () => {
  const normalized = request();
  assert.equal(normalized.sourceCommit, MAEIL_CONTENT_COMMIT);
  assert.deepEqual(normalized.selfAssessment, {
    confidence: 4, keywords: '영속성 컨텍스트', memo: '쿼리 복습',
  });
  const invalidSelfAssessment = createInterviewEvaluationRequest({
    questionId: 'be-1', question: '질문', userAnswer: '답', referenceAnswer: '원문',
    selfAssessment: { confidence: 99, keywords: null },
  });
  assert.deepEqual(invalidSelfAssessment.selfAssessment, { confidence: 0, keywords: '', memo: '' });
});

test('원문 근거는 공백과 대소문자까지 정확히 일치할 때만 인정한다', () => {
  assert.equal(hasExactEvidenceQuote(REFERENCE, '영속성 컨텍스트를 뷰 렌더링까지 열어 둡니다.'), true);
  assert.equal(hasExactEvidenceQuote(REFERENCE, '영속성 컨텍스트를  뷰 렌더링까지 열어 둡니다.'), false);
  assert.equal(hasExactEvidenceQuote(REFERENCE, 'osiv는 영속성 컨텍스트를 뷰 렌더링까지 열어 둡니다.'), false);
  assert.equal(hasExactEvidenceQuote(REFERENCE, ''), false);
});

test('검증된 결과에 모델·프롬프트·원문 커밋과 답변 스냅샷을 기록한다', () => {
  const result = normalizeInterviewEvaluation(envelope(), request(), {
    now: new Date('2026-07-21T06:00:00.000Z'),
  });
  assert.equal(result.id, 'be-1:2026-07-21T06:00:00.000Z');
  assert.equal(result.questionId, 'be-1');
  assert.equal(result.provider, 'ollama');
  assert.equal(result.model, 'qwen3:14b');
  assert.equal(result.promptVersion, 'maeil-interview-evaluation-v1');
  assert.equal(result.sourceCommit, MAEIL_CONTENT_COMMIT);
  assert.equal(result.answerSnapshot, '영속성 컨텍스트를 뷰까지 유지합니다.');
  assert.deepEqual(result.scores, {
    accuracy: 85, coverage: 75, clarity: 90, interviewReadiness: 80,
  });
  assert.equal(result.strengths[0].evidenceVerified, true);
  assert.deepEqual(result.followUps, ['OSIV를 끄면 어떻게 설계할까요?', '지연 로딩 쿼리를 어떻게 확인할까요?']);
  assert.deepEqual(result.verification, {
    status: 'verified', verifiedEvidenceCount: 3, rejectedFeedbackCount: 0,
    withheldFields: [],
  });
});

test('원문에 없는 인용은 검증 영역에서 제거하고 검증 불가 피드백으로 분리한다', () => {
  const raw = rawEvaluation({
    gaps: [
      { feedback: '유효한 보완점', evidenceQuote: '예상하지 못한 쿼리가 발생할 수 있습니다.' },
      { feedback: '외부 지식을 섞은 보완점', evidenceQuote: 'OSIV는 언제나 성능을 두 배 높입니다.' },
    ],
    unsupportedClaims: [{ feedback: '근거 없는 주장', evidenceQuote: '' }],
  });

  const result = normalizeInterviewEvaluation(envelope(raw), request(), {
    now: new Date('2026-07-21T06:00:00.000Z'),
  });

  assert.equal(result.gaps.length, 1);
  assert.equal(result.gaps[0].feedback, '유효한 보완점');
  assert.deepEqual(result.unsupportedClaims, []);
  assert.equal(result.unverifiedFeedback.length, 2);
  assert.equal(result.unverifiedFeedback[0].evidenceVerified, false);
  assert.match(result.unverifiedFeedback[0].reason, /원문에서 그대로 찾지 못했습니다/u);
  assert.equal(result.verification.status, 'partial');
  assert.equal(result.verification.rejectedFeedbackCount, 2);
  assert.equal(result.scores, null);
  assert.equal(result.improvedAnswer, null);
  assert.deepEqual(result.followUps, []);
  assert.deepEqual(result.verification.withheldFields, [
    'scores', 'improvedAnswer', 'followUps',
  ]);
});

test('검증 가능한 인용이 하나도 없으면 전체 결과를 검증 불가로 표시한다', () => {
  const invalidItem = { feedback: '검증할 수 없는 내용', evidenceQuote: '원문에 없는 문장' };
  const result = normalizeInterviewEvaluation(envelope(rawEvaluation({
    strengths: [invalidItem], gaps: [], unsupportedClaims: [], evidence: [],
  })), request(), { now: new Date('2026-07-21T06:00:00.000Z') });
  assert.equal(result.verification.status, 'unverified');
  assert.equal(result.verification.verifiedEvidenceCount, 0);
  assert.equal(result.strengths.length, 0);
  assert.equal(result.unverifiedFeedback.length, 1);
  assert.equal(result.scores, null);
  assert.equal(result.improvedAnswer, null);
  assert.deepEqual(result.followUps, []);
  assert.deepEqual(result.verification.withheldFields, [
    'scores', 'improvedAnswer', 'followUps',
  ]);
});

test('코어는 교체 가능한 Provider를 호출하고 평가 시간을 결정한다', async () => {
  let received = null;
  const provider = {
    id: 'test-provider',
    async healthCheck() { return { ok: true }; },
    async evaluateInterview(input) {
      received = input;
      return { ...envelope(), provider: 'test-provider', model: 'test-model' };
    },
  };
  const result = await evaluateInterviewAnswer(provider, {
    questionId: 'be-1', question: 'OSIV를 설명해 주세요.', userAnswer: '내 답변',
    referenceAnswer: REFERENCE, sourceCommit: 'commit-1',
    selfAssessment: { confidence: 2, keywords: 'OSIV', memo: '복습' },
  }, { now: () => new Date('2026-07-21T08:00:00.000Z') });

  assert.deepEqual(received, {
    question: 'OSIV를 설명해 주세요.',
    userAnswer: '내 답변',
    referenceAnswer: REFERENCE,
    selfAssessment: { confidence: 2, keywords: 'OSIV', memo: '복습' },
  });
  assert.equal(result.provider, 'test-provider');
  assert.equal(result.model, 'test-model');
  assert.equal(result.sourceCommit, 'commit-1');
  assert.equal(result.evaluatedAt, '2026-07-21T08:00:00.000Z');
});

test('빈 사용자 답변은 Provider 호출 전에 거부한다', async () => {
  let called = false;
  const provider = {
    async healthCheck() {},
    async evaluateInterview() { called = true; },
  };
  await assert.rejects(
    () => evaluateInterviewAnswer(provider, {
      questionId: 'be-1', question: '질문', userAnswer: '  ', referenceAnswer: '원문',
    }),
    /내 답변/u,
  );
  assert.equal(called, false);
});

test('점수 범위와 꼬리 질문 수가 잘못된 응답은 친절한 형식 오류로 거부한다', () => {
  for (const evaluation of [
    rawEvaluation({ scores: { accuracy: 101, coverage: 70, clarity: 80, interviewReadiness: 90 } }),
    rawEvaluation({ followUps: ['한 개뿐'] }),
  ]) {
    assert.throws(
      () => normalizeInterviewEvaluation(envelope(evaluation), request()),
      (error) => error instanceof AiProviderError
        && error.code === AI_PROVIDER_ERROR_CODES.INVALID_RESPONSE
        && /형식이 올바르지 않습니다/u.test(error.message),
    );
  }
});
