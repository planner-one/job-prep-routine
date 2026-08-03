import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import {
  AI_PROVIDER_ERROR_CODES,
  AiProviderError,
  assertAiProvider,
  isAiProvider,
} from '../src/ai-provider.js';
import {
  DEFAULT_OLLAMA_ENDPOINT,
  DEFAULT_OLLAMA_EVALUATION_CONTEXT_TOKENS,
  DEFAULT_OLLAMA_EVALUATION_TIMEOUT_MS,
  DEFAULT_OLLAMA_HEALTH_TIMEOUT_MS,
  DEFAULT_OLLAMA_MODEL,
  INTERVIEW_EVALUATION_JSON_SCHEMA,
  OLLAMA_INTERVIEW_PROMPT_VERSION,
  OllamaProvider,
  buildInterviewEvaluationMessages,
  createOllamaProvider,
} from '../src/ollama-provider.js';

const LONG_REFERENCE_SOURCE = await readFile(
  new URL('../content/maeil-mail/backend/contents/be-43.md', import.meta.url),
  'utf8',
);

function jsonResponse(payload, options = {}) {
  return {
    ok: options.ok ?? true,
    status: options.status ?? 200,
    async json() {
      if (options.jsonError) throw options.jsonError;
      return payload;
    },
  };
}

const RAW_EVALUATION = {
  scores: { accuracy: 80, coverage: 70, clarity: 90, interviewReadiness: 75 },
  strengths: [{ feedback: '핵심을 설명했습니다.', evidenceQuote: '세션을 유지합니다.' }],
  gaps: [],
  unsupportedClaims: [],
  improvedAnswer: '개선 답변입니다.',
  followUps: ['꼬리 질문 1', '꼬리 질문 2'],
  evidence: [{ feedback: '평가 근거입니다.', evidenceQuote: '세션을 유지합니다.' }],
};

test('AI Provider 공통 계약은 두 필수 메서드를 확인한다', () => {
  const provider = { healthCheck() {}, evaluateInterview() {} };
  assert.equal(assertAiProvider(provider), provider);
  assert.equal(isAiProvider(provider), true);
  assert.equal(isAiProvider({ healthCheck() {} }), false);
  assert.throws(
    () => assertAiProvider({}),
    (error) => error instanceof AiProviderError
      && error.code === AI_PROVIDER_ERROR_CODES.INVALID_PROVIDER
      && /evaluateInterview/u.test(error.message),
  );
});

test('Ollama Provider는 로컬 API와 qwen3:14b를 기본값으로 사용한다', () => {
  const provider = createOllamaProvider({ fetchImpl: async () => jsonResponse({ models: [] }) });
  assert.equal(provider.endpoint, DEFAULT_OLLAMA_ENDPOINT);
  assert.equal(provider.model, DEFAULT_OLLAMA_MODEL);
  assert.equal(provider.id, 'ollama');
  assert.equal(provider.healthTimeoutMs, DEFAULT_OLLAMA_HEALTH_TIMEOUT_MS);
  assert.equal(provider.evaluationTimeoutMs, DEFAULT_OLLAMA_EVALUATION_TIMEOUT_MS);
  assert.equal(isAiProvider(provider), true);
});

test('healthCheck는 모델 목록에서 기본 모델을 확인한다', async () => {
  const calls = [];
  const provider = new OllamaProvider({
    fetchImpl: async (url, init) => {
      calls.push({ url, init });
      return jsonResponse({ models: [{ name: 'qwen3:14b' }] });
    },
  });

  const health = await provider.healthCheck();

  assert.deepEqual(health, {
    provider: 'ollama', endpoint: DEFAULT_OLLAMA_ENDPOINT, model: DEFAULT_OLLAMA_MODEL,
    ok: true, status: 'ready', code: null, message: 'AI 평가를 사용할 수 있습니다.',
  });
  assert.equal(calls.length, 1);
  assert.equal(calls[0].url, `${DEFAULT_OLLAMA_ENDPOINT}/tags`);
  assert.equal(calls[0].init.method, 'GET');
  assert.equal(calls[0].init.signal instanceof AbortSignal, true);
});

test('평가 요청은 structured JSON, temperature 0, non-stream 설정을 고정한다', async () => {
  const calls = [];
  const provider = new OllamaProvider({
    fetchImpl: async (url, init) => {
      calls.push({ url, init });
      if (url.endsWith('/tags')) return jsonResponse({ models: [{ model: 'qwen3:14b' }] });
      return jsonResponse({ model: 'qwen3:14b', message: { content: JSON.stringify(RAW_EVALUATION) } });
    },
  });

  const result = await provider.evaluateInterview({
    question: 'OSIV를 설명해 주세요.',
    userAnswer: '영속성 컨텍스트를 뷰까지 유지합니다.',
    referenceAnswer: '세션을 유지합니다.',
    selfAssessment: { confidence: 3, keywords: '세션', memo: '복습' },
  });

  assert.deepEqual(result, {
    evaluation: RAW_EVALUATION,
    provider: 'ollama',
    model: 'qwen3:14b',
    promptVersion: OLLAMA_INTERVIEW_PROMPT_VERSION,
  });
  const chatCall = calls[1];
  assert.equal(chatCall.url, `${DEFAULT_OLLAMA_ENDPOINT}/chat`);
  const body = JSON.parse(chatCall.init.body);
  assert.equal(body.model, 'qwen3:14b');
  assert.equal(body.stream, false);
  assert.equal(body.think, false);
  assert.deepEqual(body.options, {
    temperature: 0,
    num_ctx: DEFAULT_OLLAMA_EVALUATION_CONTEXT_TOKENS,
    num_predict: 1400,
  });
  assert.deepEqual(body.format, INTERVIEW_EVALUATION_JSON_SCHEMA);
  assert.equal(body.format.properties.strengths.maxItems, 3);
  assert.equal(body.format.properties.evidence.maxItems, 5);
  assert.equal(body.format.properties.followUps.minItems, 2);
  assert.equal(body.format.properties.followUps.maxItems, 2);
  assert.match(body.messages[0].content, /외부 지식이나 추측을 추가하지/u);
  assert.match(body.messages[1].content, /세션을 유지합니다/u);
});

test('장문 공식 원문은 16k 컨텍스트 요청에 끝까지 잘리지 않고 포함된다', async () => {
  const calls = [];
  const provider = new OllamaProvider({
    evaluationTimeoutMs: 42_000,
    fetchImpl: async (url, init) => {
      calls.push({ url, init });
      if (url.endsWith('/tags')) return jsonResponse({ models: [{ name: 'qwen3:14b' }] });
      return jsonResponse({ message: { content: RAW_EVALUATION } });
    },
  });

  await provider.evaluateInterview({
    question: 'Spring AOP에서 self-invocation이 동작하지 않는 이유를 설명해 주세요.',
    userAnswer: '프록시를 거치지 않는 내부 호출이기 때문입니다.',
    referenceAnswer: LONG_REFERENCE_SOURCE,
    selfAssessment: { confidence: 3, keywords: '프록시, 트랜잭션', memo: '' },
  });

  assert.ok(LONG_REFERENCE_SOURCE.length > 8_000, '공식 장문 fixture가 충분히 길어야 합니다.');
  const body = JSON.parse(calls[1].init.body);
  const promptInput = JSON.parse(body.messages[1].content);
  assert.equal(body.options.num_ctx, DEFAULT_OLLAMA_EVALUATION_CONTEXT_TOKENS);
  assert.ok(body.options.num_ctx >= 16_384);
  assert.equal(body.options.num_predict, 1400);
  assert.equal(body.options.temperature, 0);
  assert.equal(promptInput.referenceSource, LONG_REFERENCE_SOURCE);
  assert.match(
    promptInput.referenceSource,
    /각각 프록시를 생성할 수 있게 두 클래스로 분리하면[\s\S]*Programmatic Transaction Management/u,
  );
  assert.equal(provider.evaluationTimeoutMs, 42_000);
});

test('프롬프트는 사용자의 자가평가와 원문을 분리된 JSON으로 전달한다', () => {
  const messages = buildInterviewEvaluationMessages({
    question: '질문', userAnswer: '내 답변', referenceAnswer: '공식 원문',
    selfAssessment: { confidence: 5, keywords: '키워드', memo: '메모' },
  });
  const input = JSON.parse(messages[1].content);
  assert.deepEqual(input, {
    question: '질문',
    userAnswer: '내 답변',
    selfAssessment: { confidence: 5, keywords: '키워드', memo: '메모' },
    referenceSource: '공식 원문',
  });
});

test('Ollama 미실행 상태는 설치 문제가 아닌 실행 안내로 반환한다', async () => {
  const provider = new OllamaProvider({ fetchImpl: async () => { throw new Error('ECONNREFUSED'); } });
  const health = await provider.healthCheck();
  assert.equal(health.ok, false);
  assert.equal(health.code, AI_PROVIDER_ERROR_CODES.PROVIDER_UNAVAILABLE);
  assert.match(health.message, /Ollama가 실행 중이지 않습니다/u);

  await assert.rejects(
    () => provider.evaluateInterview({}),
    (error) => error instanceof AiProviderError
      && error.code === AI_PROVIDER_ERROR_CODES.PROVIDER_UNAVAILABLE
      && error.retryable === true,
  );
});

test('healthCheck 제한 시간이 끝나면 fetch를 abort하고 일반 연결 오류와 다른 상태를 반환한다', async () => {
  let aborted = false;
  const provider = new OllamaProvider({
    healthTimeoutMs: 5,
    fetchImpl: async (url, init) => new Promise((resolve, reject) => {
      init.signal.addEventListener('abort', () => {
        aborted = true;
        const error = new Error('aborted');
        error.name = 'AbortError';
        reject(error);
      }, { once: true });
    }),
  });

  const health = await provider.healthCheck();

  assert.equal(aborted, true);
  assert.equal(health.ok, false);
  assert.equal(health.status, 'timeout');
  assert.equal(health.code, AI_PROVIDER_ERROR_CODES.TIMEOUT);
  assert.match(health.message, /끝나지 않았습니다|초/u);
});

test('AI 평가 제한 시간이 끝나면 chat fetch를 abort하고 TIMEOUT 오류로 구분한다', async () => {
  let chatAborted = false;
  const provider = new OllamaProvider({
    healthTimeoutMs: 50,
    evaluationTimeoutMs: 5,
    fetchImpl: async (url, init) => {
      if (url.endsWith('/tags')) return jsonResponse({ models: [{ name: 'qwen3:14b' }] });
      return new Promise((resolve, reject) => {
        init.signal.addEventListener('abort', () => {
          chatAborted = true;
          const error = new Error('aborted');
          error.name = 'AbortError';
          reject(error);
        }, { once: true });
      });
    },
  });

  await assert.rejects(
    () => provider.evaluateInterview({
      question: '질문', userAnswer: '답변', referenceAnswer: '원문',
    }),
    (error) => error instanceof AiProviderError
      && error.code === AI_PROVIDER_ERROR_CODES.TIMEOUT
      && error.retryable === true
      && error.details.timeoutMs === 5
      && /시간|중단/u.test(error.message),
  );
  assert.equal(chatAborted, true);
});

test('Ollama 시간 제한 옵션은 양수로만 설정한다', () => {
  assert.throws(
    () => new OllamaProvider({ healthTimeoutMs: 0 }),
    /상태 확인 제한 시간/u,
  );
  assert.throws(
    () => new OllamaProvider({ evaluationTimeoutMs: Number.NaN }),
    /평가 제한 시간/u,
  );
});

test('모델이 없으면 pull 명령이 포함된 한국어 안내를 제공한다', async () => {
  const provider = new OllamaProvider({
    fetchImpl: async () => jsonResponse({ models: [{ name: 'gemma3:4b' }] }),
  });
  const health = await provider.healthCheck();
  assert.equal(health.status, 'model-missing');
  assert.equal(health.code, AI_PROVIDER_ERROR_CODES.MODEL_NOT_FOUND);
  assert.match(health.message, /ollama pull qwen3:14b/u);

  await assert.rejects(
    () => provider.evaluateInterview({}),
    (error) => error.code === AI_PROVIDER_ERROR_CODES.MODEL_NOT_FOUND
      && /모델이 없습니다/u.test(error.message),
  );
});

test('Ollama의 잘못된 JSON 평가는 친절한 재시도 오류로 바꾼다', async () => {
  const provider = new OllamaProvider({
    fetchImpl: async (url) => url.endsWith('/tags')
      ? jsonResponse({ models: [{ name: 'qwen3:14b' }] })
      : jsonResponse({ message: { content: 'JSON 아님' } }),
  });

  await assert.rejects(
    () => provider.evaluateInterview({
      question: '질문', userAnswer: '답변', referenceAnswer: '원문',
    }),
    (error) => error instanceof AiProviderError
      && error.code === AI_PROVIDER_ERROR_CODES.INVALID_RESPONSE
      && error.retryable === true
      && /JSON 형식이 올바르지 않습니다/u.test(error.message),
  );
});

test('모델 목록의 손상된 JSON도 페이지용 상태 결과로 반환한다', async () => {
  const provider = new OllamaProvider({
    fetchImpl: async () => jsonResponse(null, { jsonError: new SyntaxError('broken') }),
  });
  const health = await provider.healthCheck();
  assert.equal(health.ok, false);
  assert.equal(health.code, AI_PROVIDER_ERROR_CODES.INVALID_RESPONSE);
  assert.match(health.message, /모델 목록 응답을 읽지 못했습니다/u);
});
