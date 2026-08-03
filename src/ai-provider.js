export const AI_PROVIDER_METHODS = Object.freeze(['healthCheck', 'evaluateInterview']);

export const AI_PROVIDER_ERROR_CODES = Object.freeze({
  INVALID_PROVIDER: 'INVALID_PROVIDER',
  PROVIDER_UNAVAILABLE: 'PROVIDER_UNAVAILABLE',
  MODEL_NOT_FOUND: 'MODEL_NOT_FOUND',
  TIMEOUT: 'TIMEOUT',
  REQUEST_FAILED: 'REQUEST_FAILED',
  INVALID_RESPONSE: 'INVALID_RESPONSE',
});

/**
 * 화면에서 기술적인 네트워크 오류 대신 안내 가능한 메시지를 전달하기 위한 공통 오류다.
 */
export class AiProviderError extends Error {
  constructor(code, message, options = {}) {
    super(message, options.cause === undefined ? undefined : { cause: options.cause });
    this.name = 'AiProviderError';
    this.code = code;
    this.retryable = Boolean(options.retryable);
    if (options.details !== undefined) this.details = options.details;
  }
}

/**
 * @typedef {object} AiEvaluationProvider
 * @property {() => Promise<object>} healthCheck
 * @property {(input: object) => Promise<{
 *   evaluation: object,
 *   provider: string,
 *   model: string,
 *   promptVersion: string
 * }>} evaluateInterview
 */

/**
 * 교체 가능한 AI Provider가 최소 계약을 구현했는지 확인한다.
 *
 * @param {unknown} candidate
 * @returns {AiEvaluationProvider}
 */
export function assertAiProvider(candidate) {
  if (candidate === null || (typeof candidate !== 'object' && typeof candidate !== 'function')) {
    throw new AiProviderError(
      AI_PROVIDER_ERROR_CODES.INVALID_PROVIDER,
      'AI 평가 제공자가 올바르지 않습니다.',
    );
  }

  const missing = AI_PROVIDER_METHODS.filter((method) => typeof candidate[method] !== 'function');
  if (missing.length > 0) {
    throw new AiProviderError(
      AI_PROVIDER_ERROR_CODES.INVALID_PROVIDER,
      `AI 평가 제공자에 필요한 기능이 없습니다: ${missing.join(', ')}`,
      { details: { missingMethods: missing } },
    );
  }

  return /** @type {AiEvaluationProvider} */ (candidate);
}

export function isAiProvider(candidate) {
  try {
    assertAiProvider(candidate);
    return true;
  } catch {
    return false;
  }
}
