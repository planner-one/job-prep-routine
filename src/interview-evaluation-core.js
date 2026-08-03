import {
  AI_PROVIDER_ERROR_CODES,
  AiProviderError,
  assertAiProvider,
} from './ai-provider.js';
import { MAEIL_CONTENT_COMMIT } from './maeil-content.js';

export const INTERVIEW_EVALUATION_VERSION = 1;
export const INTERVIEW_EVALUATION_SCORE_KEYS = Object.freeze([
  'accuracy',
  'coverage',
  'clarity',
  'interviewReadiness',
]);
export const INTERVIEW_EVALUATION_WITHHELD_FIELDS = Object.freeze([
  'scores',
  'improvedAnswer',
  'followUps',
]);

const FEEDBACK_SECTIONS = Object.freeze([
  'strengths',
  'gaps',
  'unsupportedClaims',
  'evidence',
]);

function nonEmptyString(value, label) {
  if (typeof value !== 'string' || value.trim() === '') {
    throw new TypeError(`${label}을(를) 입력해 주세요.`);
  }
  return value;
}

function evaluationFormatError(details) {
  return new AiProviderError(
    AI_PROVIDER_ERROR_CODES.INVALID_RESPONSE,
    'AI 평가 결과 형식이 올바르지 않습니다. 다시 시도해 주세요.',
    { details, retryable: true },
  );
}

function normalizedSelfAssessment(candidate) {
  const source = candidate !== null && typeof candidate === 'object' ? candidate : {};
  return {
    confidence: Number.isInteger(source.confidence)
      && source.confidence >= 0
      && source.confidence <= 5
      ? source.confidence
      : 0,
    keywords: typeof source.keywords === 'string' ? source.keywords : '',
    memo: typeof source.memo === 'string' ? source.memo : '',
  };
}

function normalizedScore(value, key) {
  if (!Number.isInteger(value) || value < 0 || value > 100) {
    throw evaluationFormatError({ field: `scores.${key}`, value });
  }
  return value;
}

function normalizedScores(candidate) {
  if (candidate === null || typeof candidate !== 'object' || Array.isArray(candidate)) {
    throw evaluationFormatError({ field: 'scores' });
  }
  return Object.fromEntries(
    INTERVIEW_EVALUATION_SCORE_KEYS.map((key) => [key, normalizedScore(candidate[key], key)]),
  );
}

export function hasExactEvidenceQuote(referenceAnswer, evidenceQuote) {
  if (typeof referenceAnswer !== 'string' || typeof evidenceQuote !== 'string') return false;
  const quote = evidenceQuote.trim();
  return quote.length > 0 && referenceAnswer.includes(quote);
}

function feedbackText(item) {
  if (typeof item === 'string') return item.trim();
  if (item === null || typeof item !== 'object') return '';
  if (typeof item.feedback === 'string') return item.feedback.trim();
  return '';
}

function feedbackQuote(item) {
  if (item === null || typeof item !== 'object') return '';
  return typeof item.evidenceQuote === 'string' ? item.evidenceQuote.trim() : '';
}

function normalizeFeedbackSection(candidate, section, referenceAnswer, unverifiedFeedback) {
  if (!Array.isArray(candidate)) throw evaluationFormatError({ field: section });
  const verified = [];

  for (const item of candidate) {
    const feedback = feedbackText(item);
    const evidenceQuote = feedbackQuote(item);
    if (!feedback) {
      unverifiedFeedback.push({
        section,
        feedback: '',
        evidenceQuote,
        evidenceVerified: false,
        reason: '피드백 문장이 비어 있어 검증할 수 없습니다.',
      });
      continue;
    }
    if (!hasExactEvidenceQuote(referenceAnswer, evidenceQuote)) {
      unverifiedFeedback.push({
        section,
        feedback,
        evidenceQuote,
        evidenceVerified: false,
        reason: '제시된 근거 인용문을 원문에서 그대로 찾지 못했습니다.',
      });
      continue;
    }
    verified.push({ feedback, evidenceQuote, evidenceVerified: true });
  }

  return verified;
}

function normalizedFollowUps(candidate) {
  if (!Array.isArray(candidate)) throw evaluationFormatError({ field: 'followUps' });
  const followUps = candidate
    .filter((question) => typeof question === 'string' && question.trim() !== '')
    .map((question) => question.trim());
  if (followUps.length !== 2) {
    throw evaluationFormatError({ field: 'followUps', expected: 2, actual: followUps.length });
  }
  return followUps;
}

function evaluationPayload(envelope) {
  if (envelope === null || typeof envelope !== 'object' || Array.isArray(envelope)) {
    throw evaluationFormatError({ field: 'response' });
  }
  const payload = envelope.evaluation;
  if (payload === null || typeof payload !== 'object' || Array.isArray(payload)) {
    throw evaluationFormatError({ field: 'evaluation' });
  }
  return payload;
}

function envelopeMetadata(envelope, provider) {
  const metadata = {
    provider: typeof envelope.provider === 'string' ? envelope.provider.trim() : '',
    model: typeof envelope.model === 'string' ? envelope.model.trim() : '',
    promptVersion: typeof envelope.promptVersion === 'string' ? envelope.promptVersion.trim() : '',
  };
  if (!metadata.provider && typeof provider.id === 'string') metadata.provider = provider.id.trim();
  for (const [field, value] of Object.entries(metadata)) {
    if (!value) throw evaluationFormatError({ field });
  }
  return metadata;
}

function evaluatedTimestamp(now) {
  const candidate = typeof now === 'function' ? now() : now;
  const date = candidate instanceof Date ? candidate : new Date(candidate ?? Date.now());
  if (Number.isNaN(date.getTime())) throw new TypeError('평가 시간이 올바르지 않습니다.');
  return date.toISOString();
}

export function createInterviewEvaluationRequest(input) {
  if (input === null || typeof input !== 'object' || Array.isArray(input)) {
    throw new TypeError('면접 평가 요청이 올바르지 않습니다.');
  }
  const questionId = nonEmptyString(input.questionId, '질문 ID').trim();
  const question = nonEmptyString(input.question, '면접 질문').trim();
  const userAnswer = nonEmptyString(input.userAnswer, '내 답변');
  const referenceAnswer = nonEmptyString(input.referenceAnswer, '원문 답안');
  const sourceCommit = nonEmptyString(
    input.sourceCommit ?? MAEIL_CONTENT_COMMIT,
    '원문 커밋',
  ).trim();
  return {
    questionId,
    question,
    userAnswer,
    referenceAnswer,
    sourceCommit,
    selfAssessment: normalizedSelfAssessment(input.selfAssessment),
  };
}

/**
 * Provider의 평가 결과에서 원문과 정확히 일치하는 근거만 검증 영역에 남긴다.
 */
export function normalizeInterviewEvaluation(envelope, request, options = {}) {
  const provider = options.provider ?? {};
  const payload = evaluationPayload(envelope);
  const metadata = envelopeMetadata(envelope, provider);
  const evaluatedAt = evaluatedTimestamp(options.now ?? new Date());
  const unverifiedFeedback = [];
  const sections = Object.fromEntries(FEEDBACK_SECTIONS.map((section) => [
    section,
    normalizeFeedbackSection(
      payload[section],
      section,
      request.referenceAnswer,
      unverifiedFeedback,
    ),
  ]));

  const normalizedEvaluationScores = normalizedScores(payload.scores);
  const improvedAnswer = typeof payload.improvedAnswer === 'string'
    ? payload.improvedAnswer.trim()
    : '';
  if (!improvedAnswer) throw evaluationFormatError({ field: 'improvedAnswer' });
  const followUps = normalizedFollowUps(payload.followUps);

  const verifiedEvidenceCount = FEEDBACK_SECTIONS.reduce(
    (count, section) => count + sections[section].length,
    0,
  );
  const verificationStatus = verifiedEvidenceCount === 0
    ? 'unverified'
    : unverifiedFeedback.length > 0 ? 'partial' : 'verified';
  const fullyVerified = verificationStatus === 'verified';

  return {
    version: INTERVIEW_EVALUATION_VERSION,
    id: `${request.questionId}:${evaluatedAt}`,
    questionId: request.questionId,
    evaluatedAt,
    sourceCommit: request.sourceCommit,
    provider: metadata.provider,
    model: metadata.model,
    promptVersion: metadata.promptVersion,
    answerSnapshot: request.userAnswer,
    selfAssessment: { ...request.selfAssessment },
    // 점수·개선 답변·꼬리 질문에는 항목별 근거 계약이 없으므로,
    // 모든 피드백 근거가 확인된 평가에서만 공개한다.
    scores: fullyVerified ? normalizedEvaluationScores : null,
    strengths: sections.strengths,
    gaps: sections.gaps,
    unsupportedClaims: sections.unsupportedClaims,
    improvedAnswer: fullyVerified ? improvedAnswer : null,
    followUps: fullyVerified ? followUps : [],
    evidence: sections.evidence,
    unverifiedFeedback,
    verification: {
      status: verificationStatus,
      verifiedEvidenceCount,
      rejectedFeedbackCount: unverifiedFeedback.length,
      withheldFields: fullyVerified ? [] : [...INTERVIEW_EVALUATION_WITHHELD_FIELDS],
    },
  };
}

export async function evaluateInterviewAnswer(providerCandidate, input, options = {}) {
  const provider = assertAiProvider(providerCandidate);
  const request = createInterviewEvaluationRequest(input);
  const envelope = await provider.evaluateInterview({
    question: request.question,
    userAnswer: request.userAnswer,
    referenceAnswer: request.referenceAnswer,
    selfAssessment: request.selfAssessment,
  });
  return normalizeInterviewEvaluation(envelope, request, {
    provider,
    now: options.now ?? new Date(),
  });
}
