import {
  AI_PROVIDER_ERROR_CODES,
  AiProviderError,
} from './ai-provider.js';

export const DEFAULT_OLLAMA_ENDPOINT = 'http://127.0.0.1:11434/api';
export const DEFAULT_OLLAMA_MODEL = 'qwen3:14b';
export const DEFAULT_OLLAMA_HEALTH_TIMEOUT_MS = 5_000;
export const DEFAULT_OLLAMA_EVALUATION_TIMEOUT_MS = 15 * 60_000;
export const DEFAULT_OLLAMA_EVALUATION_CONTEXT_TOKENS = 16_384;
export const OLLAMA_INTERVIEW_PROMPT_VERSION = 'maeil-interview-evaluation-v2';

const FEEDBACK_ITEM_SCHEMA = Object.freeze({
  type: 'object',
  additionalProperties: false,
  required: ['feedback', 'evidenceQuote'],
  properties: {
    feedback: { type: 'string', minLength: 1, maxLength: 500 },
    evidenceQuote: { type: 'string', minLength: 1, maxLength: 500 },
  },
});

export const INTERVIEW_EVALUATION_JSON_SCHEMA = Object.freeze({
  type: 'object',
  additionalProperties: false,
  required: [
    'scores',
    'strengths',
    'gaps',
    'unsupportedClaims',
    'improvedAnswer',
    'followUps',
    'evidence',
  ],
  properties: {
    scores: {
      type: 'object',
      additionalProperties: false,
      required: ['accuracy', 'coverage', 'clarity', 'interviewReadiness'],
      properties: {
        accuracy: { type: 'integer', minimum: 0, maximum: 100 },
        coverage: { type: 'integer', minimum: 0, maximum: 100 },
        clarity: { type: 'integer', minimum: 0, maximum: 100 },
        interviewReadiness: { type: 'integer', minimum: 0, maximum: 100 },
      },
    },
    strengths: { type: 'array', maxItems: 3, items: FEEDBACK_ITEM_SCHEMA },
    gaps: { type: 'array', maxItems: 3, items: FEEDBACK_ITEM_SCHEMA },
    unsupportedClaims: { type: 'array', maxItems: 3, items: FEEDBACK_ITEM_SCHEMA },
    improvedAnswer: { type: 'string', minLength: 1, maxLength: 1500 },
    followUps: {
      type: 'array',
      minItems: 2,
      maxItems: 2,
      items: { type: 'string', minLength: 1, maxLength: 300 },
    },
    evidence: { type: 'array', minItems: 1, maxItems: 5, items: FEEDBACK_ITEM_SCHEMA },
  },
});

function normalizedEndpoint(value) {
  if (typeof value !== 'string' || value.trim() === '') {
    throw new TypeError('Ollama API 주소가 올바르지 않습니다.');
  }
  return value.trim().replace(/\/+$/u, '');
}

function normalizedTimeoutMs(value, label) {
  if (!Number.isFinite(value) || value <= 0) {
    throw new TypeError(`${label} 제한 시간이 올바르지 않습니다.`);
  }
  return Math.floor(value);
}

class OllamaRequestTimeoutError extends Error {
  constructor(timeoutMs) {
    super(`Ollama 요청이 ${timeoutMs}ms 안에 끝나지 않았습니다.`);
    this.name = 'OllamaRequestTimeoutError';
    this.timeoutMs = timeoutMs;
  }
}

async function fetchWithAbortTimeout(fetchImpl, url, init, options) {
  const { timeoutMs, AbortControllerImpl } = options;
  if (typeof AbortControllerImpl !== 'function') {
    throw new AiProviderError(
      AI_PROVIDER_ERROR_CODES.PROVIDER_UNAVAILABLE,
      '이 환경에서는 Ollama 요청 시간 제한을 적용할 수 없습니다.',
      { retryable: false },
    );
  }

  const controller = new AbortControllerImpl();
  const timeoutError = new OllamaRequestTimeoutError(timeoutMs);
  let timedOut = false;
  let timeoutId;
  const timeout = new Promise((_, reject) => {
    timeoutId = setTimeout(() => {
      timedOut = true;
      controller.abort(timeoutError);
      reject(timeoutError);
    }, timeoutMs);
  });

  try {
    return await Promise.race([
      Promise.resolve().then(() => fetchImpl(url, { ...init, signal: controller.signal })),
      timeout,
    ]);
  } catch (cause) {
    if (timedOut || cause instanceof OllamaRequestTimeoutError) throw timeoutError;
    throw cause;
  } finally {
    clearTimeout(timeoutId);
  }
}

function responseErrorMessage(status, fallback) {
  return Number.isInteger(status) ? `${fallback} (HTTP ${status})` : fallback;
}

function modelNames(payload) {
  if (!Array.isArray(payload?.models)) return [];
  return payload.models.flatMap((model) => {
    if (model === null || typeof model !== 'object') return [];
    return [model.name, model.model].filter((name) => typeof name === 'string');
  });
}

function matchesModel(available, requested) {
  if (available === requested) return true;
  if (!requested.includes(':') && available === `${requested}:latest`) return true;
  return false;
}

async function parseResponseJson(response, message) {
  try {
    return await response.json();
  } catch (cause) {
    throw new AiProviderError(
      AI_PROVIDER_ERROR_CODES.INVALID_RESPONSE,
      message,
      { cause, retryable: true },
    );
  }
}

function parseEvaluationContent(payload) {
  const content = payload?.message?.content;
  if (content !== null && typeof content === 'object' && !Array.isArray(content)) return content;
  if (typeof content !== 'string' || content.trim() === '') {
    throw new AiProviderError(
      AI_PROVIDER_ERROR_CODES.INVALID_RESPONSE,
      'Ollama가 비어 있는 평가 결과를 반환했습니다. 다시 시도해 주세요.',
      { retryable: true },
    );
  }

  try {
    const parsed = JSON.parse(content);
    if (parsed === null || typeof parsed !== 'object' || Array.isArray(parsed)) throw new TypeError();
    return parsed;
  } catch (cause) {
    throw new AiProviderError(
      AI_PROVIDER_ERROR_CODES.INVALID_RESPONSE,
      'Ollama 평가 결과의 JSON 형식이 올바르지 않습니다. 다시 시도해 주세요.',
      { cause, retryable: true },
    );
  }
}

export function buildInterviewEvaluationMessages(input) {
  const selfAssessment = input.selfAssessment ?? {};
  return [
    {
      role: 'system',
      content: [
        '당신은 백엔드 개발자 면접 답변을 평가하는 검증자입니다.',
        '반드시 제공된 원문만 사실 근거로 사용하고 외부 지식이나 추측을 추가하지 마세요.',
        '모든 strengths, gaps, unsupportedClaims, evidence 항목에는 원문에서 글자 하나도 바꾸지 않은 연속 인용문을 evidenceQuote로 넣으세요.',
        '사용자 답변에 없는 내용을 있다고 평가하지 말고, 점수는 0~100 정수로 작성하세요.',
        'improvedAnswer는 약 1분 분량으로 쓰고 followUps는 정확히 2개 작성하세요.',
        '응답은 요청된 JSON 스키마만 따르세요.',
      ].join('\n'),
    },
    {
      role: 'user',
      content: JSON.stringify({
        question: input.question,
        userAnswer: input.userAnswer,
        selfAssessment: {
          confidence: selfAssessment.confidence ?? 0,
          keywords: selfAssessment.keywords ?? '',
          memo: selfAssessment.memo ?? '',
        },
        referenceSource: input.referenceAnswer,
      }),
    },
  ];
}

export class OllamaProvider {
  constructor(options = {}) {
    this.id = 'ollama';
    this.endpoint = normalizedEndpoint(options.endpoint ?? DEFAULT_OLLAMA_ENDPOINT);
    this.model = options.model ?? DEFAULT_OLLAMA_MODEL;
    this.fetchImpl = options.fetchImpl ?? globalThis.fetch;
    this.AbortControllerImpl = options.AbortControllerImpl ?? globalThis.AbortController;
    this.healthTimeoutMs = normalizedTimeoutMs(
      options.healthTimeoutMs ?? DEFAULT_OLLAMA_HEALTH_TIMEOUT_MS,
      'Ollama 상태 확인',
    );
    this.evaluationTimeoutMs = normalizedTimeoutMs(
      options.evaluationTimeoutMs ?? DEFAULT_OLLAMA_EVALUATION_TIMEOUT_MS,
      'Ollama 평가',
    );
  }

  async healthCheck() {
    const base = {
      provider: this.id,
      endpoint: this.endpoint,
      model: this.model,
    };

    if (typeof this.fetchImpl !== 'function') {
      return {
        ...base,
        ok: false,
        status: 'unavailable',
        code: AI_PROVIDER_ERROR_CODES.PROVIDER_UNAVAILABLE,
        message: '이 환경에서는 Ollama에 연결할 수 없습니다.',
      };
    }

    let response;
    try {
      response = await fetchWithAbortTimeout(
        this.fetchImpl,
        `${this.endpoint}/tags`,
        {
          method: 'GET',
          headers: { accept: 'application/json' },
        },
        { timeoutMs: this.healthTimeoutMs, AbortControllerImpl: this.AbortControllerImpl },
      );
    } catch (cause) {
      if (cause instanceof OllamaRequestTimeoutError) {
        return {
          ...base,
          ok: false,
          status: 'timeout',
          code: AI_PROVIDER_ERROR_CODES.TIMEOUT,
          message: `Ollama 상태 확인이 ${Math.ceil(this.healthTimeoutMs / 1000)}초 안에 끝나지 않았습니다. Ollama 실행 상태를 확인한 뒤 다시 시도해 주세요.`,
        };
      }
      return {
        ...base,
        ok: false,
        status: 'offline',
        code: AI_PROVIDER_ERROR_CODES.PROVIDER_UNAVAILABLE,
        message: 'Ollama가 실행 중이지 않습니다. Ollama를 실행한 뒤 다시 시도해 주세요.',
      };
    }

    if (!response?.ok) {
      return {
        ...base,
        ok: false,
        status: 'unavailable',
        code: AI_PROVIDER_ERROR_CODES.PROVIDER_UNAVAILABLE,
        message: responseErrorMessage(
          response?.status,
          'Ollama 상태를 확인하지 못했습니다. Ollama를 다시 실행해 주세요.',
        ),
      };
    }

    let payload;
    try {
      payload = await response.json();
    } catch {
      return {
        ...base,
        ok: false,
        status: 'invalid-response',
        code: AI_PROVIDER_ERROR_CODES.INVALID_RESPONSE,
        message: 'Ollama 모델 목록 응답을 읽지 못했습니다. Ollama를 다시 실행해 주세요.',
      };
    }

    const models = modelNames(payload);
    if (!models.some((available) => matchesModel(available, this.model))) {
      return {
        ...base,
        ok: false,
        status: 'model-missing',
        code: AI_PROVIDER_ERROR_CODES.MODEL_NOT_FOUND,
        message: `${this.model} 모델이 없습니다. 터미널에서 \`ollama pull ${this.model}\`을 실행해 주세요.`,
        availableModels: [...new Set(models)],
      };
    }

    return { ...base, ok: true, status: 'ready', code: null, message: 'AI 평가를 사용할 수 있습니다.' };
  }

  async evaluateInterview(input) {
    const health = await this.healthCheck();
    if (!health.ok) {
      throw new AiProviderError(health.code, health.message, {
        retryable: health.code !== AI_PROVIDER_ERROR_CODES.MODEL_NOT_FOUND,
        details: health,
      });
    }

    let response;
    try {
      response = await fetchWithAbortTimeout(
        this.fetchImpl,
        `${this.endpoint}/chat`,
        {
          method: 'POST',
          headers: {
            accept: 'application/json',
            'content-type': 'application/json',
          },
          body: JSON.stringify({
            model: this.model,
            messages: buildInterviewEvaluationMessages(input),
            format: INTERVIEW_EVALUATION_JSON_SCHEMA,
            stream: false,
            think: false,
            options: {
              temperature: 0,
              num_ctx: DEFAULT_OLLAMA_EVALUATION_CONTEXT_TOKENS,
              num_predict: 1400,
            },
          }),
        },
        { timeoutMs: this.evaluationTimeoutMs, AbortControllerImpl: this.AbortControllerImpl },
      );
    } catch (cause) {
      if (cause instanceof OllamaRequestTimeoutError) {
        throw new AiProviderError(
          AI_PROVIDER_ERROR_CODES.TIMEOUT,
          `AI 평가가 ${Math.ceil(this.evaluationTimeoutMs / 60_000)}분 안에 끝나지 않아 중단했습니다. 작성한 답변은 유지되며 다시 시도할 수 있습니다.`,
          { cause, retryable: true, details: { timeoutMs: this.evaluationTimeoutMs } },
        );
      }
      if (cause instanceof AiProviderError) throw cause;
      throw new AiProviderError(
        AI_PROVIDER_ERROR_CODES.PROVIDER_UNAVAILABLE,
        'Ollama와 연결이 끊어졌습니다. Ollama가 실행 중인지 확인해 주세요.',
        { cause, retryable: true },
      );
    }

    if (!response?.ok) {
      let details = null;
      try {
        details = await response.json();
      } catch {
        // 오류 본문은 진단용 보조 정보다.
      }
      const serverMessage = typeof details?.error === 'string' ? details.error : '';
      const missingModel = response?.status === 404 && /model|not found/iu.test(serverMessage);
      if (missingModel) {
        throw new AiProviderError(
          AI_PROVIDER_ERROR_CODES.MODEL_NOT_FOUND,
          `${this.model} 모델이 없습니다. 터미널에서 \`ollama pull ${this.model}\`을 실행해 주세요.`,
          { details, retryable: false },
        );
      }
      throw new AiProviderError(
        AI_PROVIDER_ERROR_CODES.REQUEST_FAILED,
        responseErrorMessage(response?.status, 'Ollama가 평가 요청을 처리하지 못했습니다. 다시 시도해 주세요.'),
        { details, retryable: true },
      );
    }

    const payload = await parseResponseJson(
      response,
      'Ollama 평가 응답을 읽지 못했습니다. 다시 시도해 주세요.',
    );
    return {
      evaluation: parseEvaluationContent(payload),
      provider: this.id,
      model: typeof payload?.model === 'string' && payload.model ? payload.model : this.model,
      promptVersion: OLLAMA_INTERVIEW_PROMPT_VERSION,
    };
  }
}

export function createOllamaProvider(options) {
  return new OllamaProvider(options);
}
