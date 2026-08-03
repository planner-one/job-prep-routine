import { createHash } from 'node:crypto';
import { readFile, rename, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { INTERVIEW_CATEGORIES, INTERVIEW_QUESTIONS, INTERVIEW_SOURCE } from '../src/interview-data.js';

const DEFAULT_MODEL = 'qwen3:14b';
const DEFAULT_ENDPOINT = 'http://127.0.0.1:11434';
const PROMPT_VERSION = 'maeil-quiz-v17-particle-safe-cloze';
const OUTPUT_PATH = new URL('../src/quiz-questions.generated.js', import.meta.url);
const CONTENT_ROOT = new URL('../content/maeil-mail/backend/contents/', import.meta.url);
const CHOICE_IDS = Object.freeze(['A', 'B', 'C', 'D']);

function flagValue(name, fallback) {
  const prefix = `--${name}=`;
  const argument = process.argv.find((value) => value.startsWith(prefix));
  return argument ? argument.slice(prefix.length) : fallback;
}

function positiveInteger(value, fallback) {
  const parsed = Number.parseInt(value, 10);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : fallback;
}

const model = flagValue('model', process.env.OLLAMA_MODEL || DEFAULT_MODEL);
const validatorModel = flagValue('validator-model', process.env.OLLAMA_VALIDATOR_MODEL || model);
const endpoint = flagValue('endpoint', process.env.OLLAMA_ENDPOINT || DEFAULT_ENDPOINT).replace(/\/+$/u, '');
const batchSize = positiveInteger(flagValue('batch-size', '8'), 8);
const maxAttempts = positiveInteger(flagValue('attempts', '2'), 2);
const limit = positiveInteger(flagValue('limit', String(INTERVIEW_QUESTIONS.length)), INTERVIEW_QUESTIONS.length);
const strategy = flagValue('strategy', 'category');
const questionsPerCategory = positiveInteger(flagValue('questions-per-category', '12'), 12);
const articleMinimumPerCategory = positiveInteger(flagValue('article-minimum-per-category', '12'), 12);
const contextSize = positiveInteger(flagValue('context', '16384'), 16384);
const reviewContextSize = positiveInteger(flagValue('review-context', '4096'), 4096);
const reviewBatchSize = positiveInteger(flagValue('review-batch-size', '2'), 2);
const sourceId = flagValue('source-id', '').trim();
const sourceIds = flagValue('source-ids', '').split(',').map((value) => value.trim()).filter(Boolean);
const outputPath = flagValue('output', '');
const debug = process.argv.includes('--debug');
const resume = process.argv.includes('--resume');
const restart = process.argv.includes('--restart');
const resolvedOutputPath = resolve(outputPath || fileURLToPath(OUTPUT_PATH));
const checkpointPath = resolve(flagValue('checkpoint', `${resolvedOutputPath}.checkpoint.json`));

if (resume && restart) throw new RangeError('--resume과 --restart는 동시에 사용할 수 없습니다.');
if (sourceId && sourceIds.length > 0) {
  throw new RangeError('--source-id과 --source-ids는 동시에 사용할 수 없습니다.');
}
if (new Set(sourceIds).size !== sourceIds.length) {
  throw new RangeError('--source-ids에 중복 출처를 넣을 수 없습니다.');
}

if (!['category', 'target', 'article'].includes(strategy)) {
  throw new RangeError('strategy는 category, target 또는 article이어야 합니다.');
}
if (['article', 'target'].includes(strategy) && batchSize !== 1) {
  throw new RangeError('article/target 전략은 출처·ID 교차 결합을 막기 위해 --batch-size=1을 사용해야 합니다.');
}

const GENERATION_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  required: ['questions'],
  properties: {
    questions: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        required: [
          'slotId',
          'sourceId',
          'categoryId',
          'evidenceId',
          'answerSpan',
          'distractors',
        ],
        properties: {
          slotId: { type: 'string' },
          sourceId: { type: 'string' },
          categoryId: { type: 'string' },
          evidenceId: { type: 'string' },
          answerSpan: { type: 'string', minLength: 2, maxLength: 30 },
          distractors: {
            type: 'array',
            minItems: 3,
            maxItems: 3,
            items: { type: 'string', minLength: 2, maxLength: 30 },
          },
        },
      },
    },
  },
};

export function generationSchema(expectedCount, batch = [], documents = new Map()) {
  const schema = {
    ...GENERATION_SCHEMA,
    properties: {
      ...GENERATION_SCHEMA.properties,
      questions: {
        ...GENERATION_SCHEMA.properties.questions,
        minItems: expectedCount,
        maxItems: expectedCount,
      },
    },
  };
  if (batch.length !== 1) return schema;
  const [slot] = batch;
  const source = documents.get(slot.sourceId);
  if (!source || !slot.focusEvidenceId || !Number.isInteger(slot.expectedCorrectIndex)) return schema;
  const focus = source.evidence?.find(({ id }) => id === slot.focusEvidenceId);
  const answerCandidates = quoteSpanCandidates(focus?.text ?? '');
  const distractorCatalog = sourceWideQuoteCandidateCatalog(source, focus);
  if (answerCandidates.length < 4 || distractorCatalog.length < 4) return schema;
  return {
    ...schema,
    properties: {
      ...schema.properties,
      questions: {
        ...schema.properties.questions,
        items: {
          ...schema.properties.questions.items,
          properties: {
            ...schema.properties.questions.items.properties,
            slotId: { type: 'string', enum: [slot.slotId] },
            sourceId: { type: 'string', enum: [slot.sourceId] },
            categoryId: { type: 'string', enum: [source.categoryId] },
            evidenceId: { type: 'string', enum: [slot.focusEvidenceId] },
            answerSpan: { type: 'string', enum: answerCandidates },
            distractors: {
              type: 'array',
              minItems: 3,
              maxItems: 3,
              uniqueItems: true,
              items: { type: 'string', enum: distractorCatalog.map(({ value }) => value) },
            },
          },
        },
      },
    },
  };
}

const REVIEW_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  required: ['decisions'],
  properties: {
    decisions: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        required: [
          'questionId',
          'selectedCorrectIndex',
          'singleAnswer',
          'ungrammaticalIndices',
          'unnaturalIndices',
          'plausibleWrongIndices',
          'unsupportedIndices',
          'explanationGrounded',
          'evidenceId',
          'accepted',
          'reason',
        ],
        properties: {
          questionId: { type: 'string' },
          selectedCorrectIndex: { type: 'integer', minimum: 0, maximum: 3 },
          singleAnswer: { type: 'boolean' },
          ungrammaticalIndices: {
            type: 'array', uniqueItems: true, maxItems: 4, items: { type: 'integer', minimum: 0, maximum: 3 },
          },
          unnaturalIndices: {
            type: 'array', uniqueItems: true, maxItems: 4, items: { type: 'integer', minimum: 0, maximum: 3 },
          },
          plausibleWrongIndices: {
            type: 'array', uniqueItems: true, maxItems: 3, items: { type: 'integer', minimum: 0, maximum: 3 },
          },
          unsupportedIndices: {
            type: 'array', uniqueItems: true, maxItems: 3, items: { type: 'integer', minimum: 0, maximum: 3 },
          },
          explanationGrounded: { type: 'boolean' },
          evidenceId: { type: 'string' },
          accepted: { type: 'boolean' },
          reason: { type: 'string', maxLength: 160 },
        },
      },
    },
  },
};

export function reviewSchema(candidates = []) {
  const schema = {
    ...REVIEW_SCHEMA,
    properties: {
      ...REVIEW_SCHEMA.properties,
      decisions: {
        ...REVIEW_SCHEMA.properties.decisions,
        minItems: candidates.length || 1,
        maxItems: candidates.length || 1,
      },
    },
  };
  if (candidates.length !== 1) return schema;
  const [candidate] = candidates;
  return {
    ...schema,
    properties: {
      ...schema.properties,
      decisions: {
        ...schema.properties.decisions,
        items: {
          ...schema.properties.decisions.items,
          properties: {
            ...schema.properties.decisions.items.properties,
            questionId: { type: 'string', enum: [candidate.id] },
            evidenceId: { type: 'string', enum: [candidate._evidenceId] },
          },
        },
      },
    },
  };
}

function chunks(values, size) {
  const result = [];
  for (let index = 0; index < values.length; index += size) result.push(values.slice(index, index + size));
  return result;
}

function compactWhitespace(value) {
  return String(value ?? '').replace(/\s+/gu, ' ').trim();
}

function normalizedKey(value) {
  return compactWhitespace(value).toLocaleLowerCase('ko-KR');
}

export function technicalTokens(value) {
  const tokens = String(value ?? '').match(/@?[A-Za-z][A-Za-z0-9_$.-]*/gu) ?? [];
  return [...new Set(tokens
    .filter((token) => token.replace(/^@/u, '').length >= 3 || /^[A-Z]{2,}$/u.test(token))
    .map((token) => token.toLocaleLowerCase('en-US')))];
}

function mappedWhitespace(value) {
  const source = String(value ?? '');
  let normalized = '';
  const map = [];
  let inWhitespace = false;
  for (let index = 0; index < source.length; index += 1) {
    if (/\s/u.test(source[index])) {
      if (!inWhitespace && normalized.length > 0) {
        normalized += ' ';
        map.push(index);
      }
      inWhitespace = true;
      continue;
    }
    normalized += source[index];
    map.push(index);
    inWhitespace = false;
  }
  if (normalized.endsWith(' ')) {
    normalized = normalized.slice(0, -1);
    map.pop();
  }
  return { normalized, map };
}

export function exactEvidence(markdown, quote) {
  const raw = String(quote ?? '').trim();
  if (raw.length < 20) return null;
  const exactIndex = markdown.indexOf(raw);
  if (exactIndex >= 0) {
    return {
      quote: markdown.slice(exactIndex, exactIndex + raw.length),
      start: exactIndex,
    };
  }

  const source = mappedWhitespace(markdown);
  const needle = mappedWhitespace(raw).normalized;
  if (needle.length < 20) return null;
  const normalizedIndex = source.normalized.indexOf(needle);
  if (normalizedIndex < 0) return null;
  const start = source.map[normalizedIndex];
  const end = source.map[normalizedIndex + needle.length - 1] + 1;
  return { quote: markdown.slice(start, end).trim(), start };
}

function markdownHeadings(markdown) {
  return [...String(markdown).matchAll(/^#{1,6}\s+(.+?)\s*$/gmu)]
    .map((match) => match[1].replace(/[*_`]/gu, '').trim())
    .filter(Boolean);
}

export function markdownEvidenceSnippets(markdown, sourceId, maximum = 24) {
  const sourceText = String(markdown);
  const prose = [];
  const code = [];
  const seen = new Set();
  let paragraph = [];
  let inFence = false;

  const add = (target, raw, rawStart) => {
    const sourceValue = String(raw ?? '');
    const leadingLength = sourceValue.length - sourceValue.trimStart().length;
    const text = sourceValue.trim();
    const start = rawStart + leadingLength;
    const end = start + text.length;
    const key = `${start}:${end}`;
    if (text.length < 20 || text.length > 280 || seen.has(key)) return;
    if (sourceText.slice(start, end) !== text) return;
    seen.add(key);
    target.push({ text, start, end });
  };
  const flushParagraph = () => {
    if (paragraph.length === 0) return;
    const start = paragraph[0].start;
    const end = paragraph.at(-1).end;
    const raw = sourceText.slice(start, end);
    paragraph = [];
    if (raw.trim().length <= 280) {
      add(prose, raw, start);
      return;
    }
    for (const sentence of raw.matchAll(/[^.!?]+[.!?]+(?=\s|$)/gu)) {
      add(prose, sentence[0], start + sentence.index);
    }
  };

  for (const match of sourceText.matchAll(/[^\n]*(?:\n|$)/gu)) {
    if (!match[0]) continue;
    const line = match[0].endsWith('\n') ? match[0].slice(0, -1) : match[0];
    const lineStart = match.index;
    if (/^```/u.test(line.trim())) {
      flushParagraph();
      inFence = !inFence;
      continue;
    }
    if (inFence) {
      add(code, line, lineStart);
      continue;
    }
    if (!line.trim() || /^#{1,6}\s/u.test(line)) {
      flushParagraph();
      continue;
    }
    paragraph.push({ start: lineStart, end: lineStart + line.length });
  }
  flushParagraph();

  const sample = (values, count) => {
    if (count <= 0) return [];
    if (values.length <= count) return values;
    if (count === 1) return [values[0]];
    return Array.from({ length: count }, (_, index) => (
      values[Math.round(index * (values.length - 1) / (count - 1))]
    ));
  };
  const selectedProse = sample(prose, maximum);
  const selected = [
    ...selectedProse,
    ...sample(code, maximum - selectedProse.length),
  ];
  return selected.map((item, index) => ({
    id: `${sourceId}:E${String(index + 1).padStart(3, '0')}`,
    ...item,
    kind: selectedProse.includes(item) ? 'prose' : 'code',
    heading: sourceHeadingAt(sourceText, item.start),
  }));
}

export function eligibleFocusEvidence(evidence) {
  const text = compactWhitespace(evidence?.text);
  const hangulCount = (text.match(/[\uac00-\ud7a3]/gu) ?? []).length;
  if (evidence?.kind === 'code') return false;
  if (text.length < 60 || hangulCount < 20) return false;
  if (/추가\s*학습/u.test(String(evidence?.heading ?? ''))) return false;
  if (/^(?:[-*]\s*)?\[[^\]]+\]\([^)]+\)\s*$/u.test(text)) return false;
  if (/^(?:import\s|assert(?:That)?\s*\(|log\.|https?:\/\/)/iu.test(text)) return false;
  return true;
}

export function eligibleClozeEvidence(evidence) {
  return eligibleFocusEvidence(evidence) && quoteSpanCandidates(evidence.text).length >= 4;
}

const STRICT_CLOZE_VIABILITY_CACHE = new WeakMap();

export function strictClozeEvidenceViable(source, evidence) {
  if (!source || typeof source !== 'object' || !evidence || typeof evidence !== 'object') return false;
  let evidenceCache = STRICT_CLOZE_VIABILITY_CACHE.get(source);
  if (!evidenceCache) {
    evidenceCache = new WeakMap();
    STRICT_CLOZE_VIABILITY_CACHE.set(source, evidenceCache);
  }
  if (evidenceCache.has(evidence)) return evidenceCache.get(evidence);

  let viable = false;
  if (eligibleClozeEvidence(evidence)) {
    const answerCandidates = quoteSpanCandidates(evidence.text);
    const distractorCatalog = sourceWideQuoteCandidateCatalog(source, evidence);
    for (const answerSpan of answerCandidates) {
      const sentence = exactSentenceContainingSpan(evidence.text, answerSpan);
      if (!sentence || hasAnswerGlossLeak(evidence.text, answerSpan)) continue;
      if (!choicesMatchFollowingParticle(sentence, answerSpan, [answerSpan])) continue;
      const answerKey = normalizedKey(answerSpan);
      const compatible = distractorCatalog.filter(({ value }) => {
        const key = normalizedKey(value);
        return key !== answerKey
          && !key.includes(answerKey)
          && !answerKey.includes(key)
          && !hasNearbyChoiceStemCollision(sentence, answerSpan, [value])
          && choicesMatchFollowingParticle(sentence, answerSpan, [answerSpan, value]);
      });
      tripleSearch:
      for (let first = 0; first < compatible.length; first += 1) {
        for (let second = first + 1; second < compatible.length; second += 1) {
          for (let third = second + 1; third < compatible.length; third += 1) {
            const keys = [compatible[first], compatible[second], compatible[third]]
              .map(({ value }) => normalizedKey(value));
            if (keys.some((key, index) => keys.some((other, otherIndex) => (
              index !== otherIndex && (key.includes(other) || other.includes(key))
            )))) continue;
            viable = true;
            break tripleSearch;
          }
        }
      }
      if (viable) break;
    }
  }
  evidenceCache.set(evidence, viable);
  return viable;
}

export function sourceHeadingAt(markdown, offset) {
  let current = '본문';
  for (const match of String(markdown).matchAll(/^#{1,6}\s+(.+?)\s*$/gmu)) {
    if (match.index > offset) break;
    current = match[1].replace(/[*_`]/gu, '').trim() || '본문';
  }
  return current;
}

function debugRejection(slot, reason, candidate, diagnostics) {
  if (Array.isArray(diagnostics)) {
    diagnostics.push({
      slotId: slot.slotId,
      sourceId: slot.sourceId,
      reason,
      candidate: candidate && typeof candidate === 'object' ? candidate : null,
    });
  }
  if (debug) {
    const received = candidate && typeof candidate === 'object'
      ? ` (slotId=${String(candidate.slotId)}, sourceId=${String(candidate.sourceId)}, sourceHeading=${String(candidate.sourceHeading)})`
      : '';
    console.warn(`  [구조 탈락] ${slot.slotId}: ${reason}${received}`);
  }
  return null;
}

async function ollamaChat(
  messages,
  format,
  requestedModel = model,
  requestedContextSize = contextSize,
  inference = {},
) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10 * 60_000);
  try {
    const response = await fetch(`${endpoint}/api/chat`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      signal: controller.signal,
      body: JSON.stringify({
        model: requestedModel,
        messages,
        format,
        stream: false,
        think: false,
        keep_alive: '30m',
        options: {
          temperature: inference.temperature ?? 0,
          seed: inference.seed ?? 42,
          num_ctx: requestedContextSize,
          num_predict: inference.numPredict ?? 4096,
        },
      }),
    });
    if (!response.ok) throw new Error(`Ollama HTTP ${response.status}: ${await response.text()}`);
    const payload = await response.json();
    const content = payload?.message?.content;
    if (typeof content !== 'string') throw new Error('Ollama가 JSON 문자열을 반환하지 않았습니다.');
    return JSON.parse(content);
  } finally {
    clearTimeout(timeout);
  }
}

async function assertModelReady(requestedModel) {
  let response;
  try {
    response = await fetch(`${endpoint}/api/tags`);
  } catch (error) {
    throw new Error(`Ollama에 연결할 수 없습니다. \`ollama serve\`를 확인하세요. (${error.message})`);
  }
  if (!response.ok) throw new Error(`Ollama 상태 확인 실패: HTTP ${response.status}`);
  const payload = await response.json();
  const names = (payload.models ?? []).flatMap((entry) => [entry.name, entry.model]).filter(Boolean);
  if (!names.some((name) => name === requestedModel || name.startsWith(`${requestedModel}:`))) {
    throw new Error(`모델 ${requestedModel}이 없습니다. \`ollama pull ${requestedModel}\`을 실행하세요.`);
  }
}

async function unloadModel(requestedModel) {
  const response = await fetch(`${endpoint}/api/generate`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ model: requestedModel, keep_alive: 0, stream: false }),
  });
  if (!response.ok) throw new Error(`Ollama 모델 ${requestedModel} 언로드 실패: HTTP ${response.status}`);
  if (debug) console.warn(`  [모델 언로드] ${requestedModel}`);
}

async function loadDocuments(questions) {
  const documents = new Map();
  for (const question of questions) {
    const markdown = await readFile(new URL(`${question.id}.md`, CONTENT_ROOT), 'utf8');
    if (!markdown.trim()) throw new Error(`${question.id}.md가 비어 있습니다.`);
    documents.set(question.id, {
      ...question,
      markdown,
      headings: markdownHeadings(markdown),
      evidence: markdownEvidenceSnippets(markdown, question.id),
    });
  }
  return documents;
}

export function buildSlots(
  questions,
  documents,
  options = {},
) {
  const selectedStrategy = options.strategy ?? strategy;
  const selectedQuestionsPerCategory = options.questionsPerCategory ?? questionsPerCategory;
  const selectedArticleMinimum = options.articleMinimumPerCategory ?? articleMinimumPerCategory;
  const eligibleQuestions = questions.filter((question) => (
    documents.get(question.id)?.evidence?.some((evidence) => (
      strictClozeEvidenceViable(documents.get(question.id), evidence)
    ))
  ));
  const longestByCategory = new Map();
  for (const question of eligibleQuestions) {
    const length = documents.get(question.id).markdown.length;
    const current = longestByCategory.get(question.categoryId);
    if (!current || length > current.length) longestByCategory.set(question.categoryId, { id: question.id, length });
  }

  const slots = [];
  if (selectedStrategy === 'category') {
    for (const category of INTERVIEW_CATEGORIES) {
      const selected = longestByCategory.get(category.id);
      if (!selected) continue;
      for (let sequence = 1; sequence <= selectedQuestionsPerCategory; sequence += 1) {
        slots.push({
          slotId: `${selected.id}:${sequence}`,
          sourceId: selected.id,
          sequence,
          attempts: 0,
        });
      }
    }
    return slots;
  }

  if (selectedStrategy === 'target') {
    for (const category of INTERVIEW_CATEGORIES) {
      const categoryQuestions = eligibleQuestions.filter((question) => question.categoryId === category.id);
      if (categoryQuestions.length === 0) continue;
      const distinctCount = Math.min(categoryQuestions.length, selectedQuestionsPerCategory);
      for (let index = 0; index < distinctCount; index += 1) {
        const selected = categoryQuestions[index];
        slots.push({
          slotId: `${selected.id}:1`,
          sourceId: selected.id,
          sequence: 1,
          attempts: 0,
        });
      }
      const longest = longestByCategory.get(category.id);
      for (let offset = distinctCount; offset < selectedQuestionsPerCategory; offset += 1) {
        const sequence = offset - distinctCount + 2;
        slots.push({
          slotId: `${longest.id}:${sequence}`,
          sourceId: longest.id,
          sequence,
          attempts: 0,
        });
      }
    }
    return slots;
  }

  for (const question of eligibleQuestions) {
    slots.push({ slotId: `${question.id}:1`, sourceId: question.id, sequence: 1, attempts: 0 });
  }
  for (const category of INTERVIEW_CATEGORIES) {
    const categoryCount = eligibleQuestions.filter((question) => question.categoryId === category.id).length;
    const selected = longestByCategory.get(category.id);
    if (!selected || categoryCount >= selectedArticleMinimum) continue;
    const extraCount = selectedArticleMinimum - categoryCount;
    for (let offset = 1; offset <= extraCount; offset += 1) {
      const sequence = offset + 1;
      slots.push({
        slotId: `${selected.id}:${sequence}`,
        sourceId: selected.id,
        sequence,
        attempts: 0,
      });
    }
  }
  return slots;
}

function deterministicIndex(key, length) {
  if (!Number.isInteger(length) || length < 1) {
    throw new RangeError('빈 근거 카탈로그에서 인덱스를 고를 수 없습니다.');
  }
  return createHash('sha256').update(key).digest().readUInt32BE(0) % length;
}

export function desiredCorrectIndex(slotId) {
  return deterministicIndex(`${slotId}:correct-index`, CHOICE_IDS.length);
}

export function permuteCandidateChoices(
  choices,
  distractorEvidenceIds,
  declaredCorrectIndex,
  targetCorrectIndex,
  slotId,
) {
  const remainingOldIndices = [0, 1, 2, 3]
    .filter((index) => index !== declaredCorrectIndex)
    .sort((left, right) => {
      const leftHash = createHash('sha256').update(`${slotId}:choice:${left}`).digest('hex');
      const rightHash = createHash('sha256').update(`${slotId}:choice:${right}`).digest('hex');
      return leftHash.localeCompare(rightHash);
    });
  const permutation = Array(4);
  permutation[targetCorrectIndex] = declaredCorrectIndex;
  const remainingNewIndices = [0, 1, 2, 3].filter((index) => index !== targetCorrectIndex);
  for (let index = 0; index < remainingNewIndices.length; index += 1) {
    permutation[remainingNewIndices[index]] = remainingOldIndices[index];
  }
  return {
    permutation,
    choices: permutation.map((oldIndex) => choices[oldIndex]),
    distractorEvidenceIds: permutation.map((oldIndex) => distractorEvidenceIds[oldIndex]),
    correctIndex: targetCorrectIndex,
  };
}

function prepareSlotForGeneration(slot, source, attempt = slot.attempts || 1) {
  const focusPool = source.evidence.filter((evidence) => strictClozeEvidenceViable(source, evidence));
  if (focusPool.length === 0) {
    throw new Error(`no-eligible-strict-cloze: ${slot.sourceId}`);
  }
  const startIndex = deterministicIndex(slot.slotId, focusPool.length);
  const focusIndex = (startIndex + Math.max(0, attempt - 1)) % focusPool.length;
  slot.attempts = attempt;
  slot.focusEvidenceId = focusPool[focusIndex].id;
  slot.expectedCorrectIndex = desiredCorrectIndex(slot.slotId);
  return slot;
}

function generationPrompt(batch, documents, accepted) {
  const uniqueIds = [...new Set(batch.map(({ sourceId }) => sourceId))];
  const targets = batch.map((slot) => {
    const source = documents.get(slot.sourceId);
    const focusEvidence = source.evidence.find(({ id }) => id === slot.focusEvidenceId);
    const answerValues = quoteSpanCandidates(focusEvidence.text);
    const endingClass = (value) => {
      const jongseong = hangulJongseongIndex(value);
      if (jongseong === null) return '한글 종성 판정 불가';
      if (jongseong === 0) return '받침 없음';
      if (jongseong === 8) return 'ㄹ 받침';
      return '받침 있음';
    };
    const answerCandidates = answerValues.map((value) => ({
      value,
      followingParticle: followingPairedParticle(focusEvidence.text, value) || null,
      endingClass: endingClass(value),
    }));
    const distractorCandidates = sourceWideQuoteCandidateCatalog(source, focusEvidence)
      .map((entry) => ({ ...entry, endingClass: endingClass(entry.value) }));
    return {
      slotId: slot.slotId,
      sourceId: slot.sourceId,
      categoryId: source.categoryId,
      attempt: slot.attempts || 1,
      focusEvidence,
      spanRole: quoteSpanRole(answerValues[0]),
      answerCandidates,
      distractorCandidates,
    };
  });
  const existing = [...accepted.values()]
    .filter((question) => uniqueIds.includes(question.sourceId))
    .filter((question) => compactWhitespace(question._answerSpan ?? question.answerSpan ?? question.question))
    .map(({ sourceId: previousSourceId, _answerSpan, answerSpan, question, _reviewReason }) => (
      `${previousSourceId}: ${_answerSpan ?? answerSpan ?? question}${_reviewReason ? ` (거부 이유: ${_reviewReason})` : ''}`
    ));

  return `아래 focusEvidence에서 빈칸 문제용 answerSpan 1개와 오답 후보 3개만 선택하세요. 문항·보기 배치·해설은 프로그램이 결정적으로 만듭니다.

규칙:
- slotId·sourceId·categoryId·evidenceId는 입력 JSON의 문자열을 정확히 복사하세요.
- answerSpan은 반드시 슬롯의 answerCandidates 객체의 value 중에서만 고르세요.
- distractors는 distractorCandidates 객체의 value 문자열 중에서만 고르세요. 각 value의 evidenceId는 같은 글 안의 exact 출처입니다.
- 두 후보 목록은 exact-once·2–30자 검증을 이미 통과했으며 모두 spanRole이 같습니다.
- answerSpan은 focusEvidence.text의 핵심 기술 용어·주체·조건·결과로 가장 학습 가치가 높은 후보를 고르세요.
- answerSpan은 핵심 기술 용어·주체·조건·결과 중 하나여야 하며, 조사·접속사·구두점·공백만 선택하지 마세요.
- distractors는 answerSpan과 다른 완전한 명사구 3개를 우선하고, 원문 문장에 넣었을 때 문법적으로는 자연스럽지만 focus 원문의 관계로는 명백히 틀리거나 성립하지 않는 후보를 선택하세요.
- 잘못된 문장도 그럴듯하거나 원문만으로 참·거짓을 판단할 수 없다면 distractor로 선택하지 마세요.
- answerCandidates의 followingParticle이 있으면 세 distractor의 endingClass가 그 조사와 모두 호응해야 합니다(으로/로는 ㄹ 받침 예외 포함).
- distractor가 answerSpan 위치 주변 4개 토큰의 normalized n-gram을 반복하면 선택하지 마세요.
- answerSpan 직후 괄호에 영문 번역·약어가 보이는 후보는 정답으로 고르지 마세요.
- 각 distractor를 answerSpan 위치에 넣으면 원문과 정확히 다른 문장이 되어야 합니다.
- distractor에 answerSpan을 포함하거나, answerSpan에 distractor 전체가 포함되게 하지 마세요.
- 외부 지식은 사용하지 마세요. 정답 기준은 focusEvidence 원문의 정확한 문구 복원입니다.
- attempt가 2 이상이면 이전과 다른 answerSpan을 고르세요.

슬롯별 유일 판단 범위:
${JSON.stringify(targets, null, 2)}

이미 생성된 문항과 거부 이유:
${existing.length ? existing.join('\n') : '(없음)'}

제공된 focusEvidence와 distractorCandidates 밖의 외부 지식은 사용하지 마세요.`;
}

const QUOTE_SPAN_STOPWORDS = new Set([
  '그러나', '그리고', '그런데', '따라서', '또는', '하지만', '이러한', '이것은',
  '것입니다', '있습니다', '합니다', '입니다', '있어요', '해요', '수 있습니다',
  '대한', '등의', '모두', '해당', '경우', '있는지', '있다면', '하나라도', '것은', '것을',
  'the', 'and', 'or', 'but', 'with', 'from', 'that', 'this',
]);

function exactOccurrenceCount(text, needle) {
  if (!needle) return 0;
  let count = 0;
  let offset = 0;
  while (offset <= text.length - needle.length) {
    const index = text.indexOf(needle, offset);
    if (index < 0) break;
    count += 1;
    offset = index + needle.length;
  }
  return count;
}

function validQuoteChoice(value) {
  const raw = String(value ?? '');
  const compact = compactWhitespace(raw);
  const meaningfulCount = (compact.match(/[\p{L}\p{N}@_]/gu) ?? []).length;
  return raw === raw.trim()
    && !/[\r\n]/u.test(raw)
    && raw.length >= 2
    && raw.length <= 30
    && meaningfulCount >= 2
    && !/^[\p{P}\p{S}\s]+$/u.test(raw)
    && !QUOTE_SPAN_STOPWORDS.has(normalizedKey(raw))
    && !raw.includes('[빈칸]');
}

const KOREAN_PARTICLE_SUFFIXES = Object.freeze([
  '으로부터', '로부터', '에게서', '한테서', '으로써', '로써', '밖에', '에서', '으로', '이나',
  '만큼', '처럼', '에게', '한테', '께서', '부터', '까지', '보다', '마다', '조차', '마저',
  '뿐',
  '은', '는', '이', '가', '을', '를', '의', '와', '과', '나', '로', '에', '도', '만', '뻐', '께',
]);
const KOREAN_PREDICATE_ENDING = /(?:합니다|됩니다|습니다|입니다|한다|된다|했다|하며|하고|하여|해서|하는|되는|할)$/u;
const KOREAN_VERBISH_ENDING = /(?:아서|어서|해서|하여|하고|하며|하면|되어|되고|되며|되면|되는|되지|되게|았다|었다|했다|합니다|됩니다|습니다|입니다|으면|면|며|지만|지|게|해|아|어|고|서)$/u;
const KOREAN_ATTRIBUTIVE_ENDING = /(?:하는|되는|같은|다른|적인|독립적인|한|인|된|할)$/u;

function koreanParticleSuffix(value) {
  const token = String(value ?? '');
  if (!/^[\uac00-\ud7a30-9]+$/u.test(token)) return '';
  return KOREAN_PARTICLE_SUFFIXES.find((suffix) => (
    token.length > suffix.length && token.endsWith(suffix)
  )) ?? '';
}

function stripKoreanParticleSuffixes(value) {
  let stem = String(value ?? '');
  let removedLength = 0;
  for (let count = 0; count < 3; count += 1) {
    const suffix = koreanParticleSuffix(stem);
    if (!suffix) break;
    stem = stem.slice(0, -suffix.length);
    removedLength += suffix.length;
  }
  return { stem, removedLength };
}

export function quoteSpanRole(value) {
  if (/\s/u.test(value)) return '원문·완전 명사구';
  if (/^@[A-Za-z]/u.test(value)) return '기술·애너테이션';
  if (/^[A-Z][A-Z0-9_.$-]*$/u.test(value)) return '기술·ALLCAPS 약어';
  if (/^[A-Z][a-z0-9]+(?:[A-Z][A-Za-z0-9]*)*$/u.test(value)) return '기술·PascalCase';
  if (/^[a-z][A-Za-z0-9_.$-]*$/u.test(value)) return '기술·lowercase identifier';
  if (/[A-Za-z_]/u.test(value)) return '기술·기타 토큰';
  if (
    KOREAN_PREDICATE_ENDING.test(value)
    || KOREAN_VERBISH_ENDING.test(value)
    || KOREAN_ATTRIBUTIVE_ENDING.test(value)
  ) return '한글 비명사 표현';
  const suffix = koreanParticleSuffix(value);
  if (suffix) return `한글 조사·연결:${suffix}`;
  if (/[\uac00-\ud7a3]/u.test(value)) return '한글 핵심어';
  return '숫자·기호';
}

const NOUN_PHRASE_BOUNDARY_WORDS = new Set([
  '그러나', '그런데', '그러므로', '따라서', '하지만', '이처럼', '각각', '직접', '통해', '위해', '대상인', '모두', '대한',
  '가령', '이때', '만약', '만일', '특히', '또한', '즉', '반면', '쉽게', '단',
]);

export function hasAnswerGlossLeak(text, span) {
  const source = String(text ?? '');
  const answer = String(span ?? '');
  if (!answer || exactOccurrenceCount(source, answer) !== 1) return false;
  const start = source.indexOf(answer);
  const before = source.slice(0, start);
  const after = source.slice(start + answer.length);
  const followingEnglishGloss = /^\s*\([^\n)]*[A-Za-z][^\n)]*\)/u.test(after);
  const answerInsideKoreanGloss = /[\uac00-\ud7a3][\uac00-\ud7a30-9 ]{0,30}\($/u.test(before)
    && /[A-Za-z]/u.test(answer);
  return followingEnglishGloss || answerInsideKoreanGloss;
}

function safeNounPhraseTokens(source, tokens) {
  const phrases = [];
  const internalTokenAllowed = ({ value }) => {
    if (!validQuoteChoice(value)) return false;
    if (/^[\uac00-\ud7a30-9]+$/u.test(value)) {
      return !koreanParticleSuffix(value)
        && !KOREAN_PREDICATE_ENDING.test(value)
        && !KOREAN_VERBISH_ENDING.test(value)
        && !NOUN_PHRASE_BOUNDARY_WORDS.has(value)
        && !QUOTE_SPAN_STOPWORDS.has(normalizedKey(value));
    }
    return /[A-Za-z@_]/u.test(value);
  };
  const finalToken = (token) => {
    const stripped = stripKoreanParticleSuffixes(token.value);
    const value = stripped.stem;
    const end = token.end - stripped.removedLength;
    if (!validQuoteChoice(value)) return null;
    if (/^[\uac00-\ud7a30-9]+$/u.test(value)) {
      if (
        KOREAN_PREDICATE_ENDING.test(value)
        || KOREAN_VERBISH_ENDING.test(value)
        || KOREAN_ATTRIBUTIVE_ENDING.test(value)
        || NOUN_PHRASE_BOUNDARY_WORDS.has(value)
        || QUOTE_SPAN_STOPWORDS.has(normalizedKey(value))
      ) return null;
    } else if (!/[A-Za-z@_]/u.test(value)) {
      return null;
    }
    return { value, end };
  };
  for (let start = 0; start < tokens.length; start += 1) {
    for (let size = 2; size <= 4 && start + size <= tokens.length; size += 1) {
      const selected = tokens.slice(start, start + size);
      if (!selected.slice(0, -1).every(internalTokenAllowed)) continue;
      const final = finalToken(selected.at(-1));
      if (!final) continue;
      const separatorsAreWhitespace = selected.slice(1).every((token, index) => (
        /^\s+$/u.test(source.slice(selected[index].end, token.start))
      ));
      if (!separatorsAreWhitespace) continue;
      const phrase = source.slice(selected[0].start, final.end);
      if (!validQuoteChoice(phrase) || exactOccurrenceCount(source, phrase) !== 1) continue;
      if (hasAnswerGlossLeak(source, phrase)) continue;
      phrases.push(phrase);
    }
  }
  return phrases;
}

function nonContainingQuoteSpans(values, maximum) {
  const ranked = values.slice().sort((left, right) => {
    const leftWords = left.split(/\s+/u).length;
    const rightWords = right.split(/\s+/u).length;
    const leftTechnical = technicalTokens(left).length > 0 ? 1 : 0;
    const rightTechnical = technicalTokens(right).length > 0 ? 1 : 0;
    return rightWords - leftWords
      || rightTechnical - leftTechnical
      || right.length - left.length
      || left.localeCompare(right, 'ko');
  });
  const selected = [];
  for (const span of ranked) {
    const key = normalizedKey(span);
    if (selected.some((current) => {
      const currentKey = normalizedKey(current);
      return key.includes(currentKey) || currentKey.includes(key);
    })) continue;
    selected.push(span);
    if (selected.length >= maximum) break;
  }
  return selected;
}

function quoteRolePriority(role) {
  if (role === '원문·완전 명사구') return 0;
  if (role === '한글 핵심어') return 1;
  if (role === '한글 서술·용언 표현') return 2;
  if (role.startsWith('한글 조사·연결:')) return 3;
  if (role.startsWith('기술·')) return 4;
  return 5;
}

export function quoteSpanCandidatePools(text, maximum = 24) {
  const source = String(text ?? '');
  const tokens = [...source.matchAll(/@?[A-Za-z][A-Za-z0-9_.$-]*|[\uac00-\ud7a30-9]+/gu)]
    .map((match) => ({ value: match[0], start: match.index, end: match.index + match[0].length }));
  const rawCandidates = safeNounPhraseTokens(source, tokens);
  for (const token of tokens) {
    const span = source.slice(token.start, token.end);
    if (!validQuoteChoice(span) || exactOccurrenceCount(source, span) !== 1) continue;
    if (hasAnswerGlossLeak(source, span)) continue;
    rawCandidates.push(span);
  }
  const unique = [...new Map(rawCandidates.map((span) => [normalizedKey(span), span])).values()];
  const byRole = new Map();
  for (const span of unique) {
    const role = quoteSpanRole(span);
    if (role === '한글 비명사 표현' || role === '숫자·기호') continue;
    if (!byRole.has(role)) byRole.set(role, []);
    byRole.get(role).push(span);
  }
  return [...byRole.entries()]
    .map(([role, values]) => ({ role, values: nonContainingQuoteSpans(values, maximum) }))
    .sort((left, right) => quoteRolePriority(left.role) - quoteRolePriority(right.role)
      || right.values.length - left.values.length
      || left.role.localeCompare(right.role, 'ko'));
}

export function quoteSpanCandidates(text, maximum = 24) {
  return quoteSpanCandidatePools(text, maximum)
    .find(({ values }) => values.length >= 4)?.values ?? [];
}

export function sourceWideQuoteCandidateCatalog(source, focusEvidence, maximum = 64) {
  const answerCandidates = quoteSpanCandidates(focusEvidence?.text ?? '');
  if (answerCandidates.length < 4) return [];
  const targetRole = quoteSpanRole(answerCandidates[0]);
  const orderedEvidence = [
    focusEvidence,
    ...(source?.evidence ?? []).filter(({ id }) => id !== focusEvidence?.id),
  ].filter(eligibleFocusEvidence);
  const catalog = new Map();
  for (const evidence of orderedEvidence) {
    const pool = quoteSpanCandidatePools(evidence.text)
      .find(({ role }) => role === targetRole);
    for (const value of pool?.values ?? []) {
      const key = normalizedKey(value);
      if (!catalog.has(key)) catalog.set(key, { value, evidenceId: evidence.id });
      if (catalog.size >= maximum) return [...catalog.values()];
    }
  }
  return [...catalog.values()];
}

function normalizedChoiceStem(value) {
  const raw = String(value ?? '');
  return normalizedKey(stripKoreanParticleSuffixes(raw).stem).replace(/^@/u, '');
}

function choiceTokenStems(value) {
  return [...String(value ?? '').matchAll(/@?[A-Za-z][A-Za-z0-9_.$-]*|[\uac00-\ud7a30-9]+/gu)]
    .map((match) => normalizedChoiceStem(match[0]))
    .filter(Boolean);
}

function nearbyChoiceStems(sentence, answerSpan, radius = 4) {
  const source = String(sentence ?? '');
  const answerOffset = source.indexOf(answerSpan);
  const answerEnd = answerOffset + String(answerSpan ?? '').length;
  const tokens = [...source.matchAll(/@?[A-Za-z][A-Za-z0-9_.$-]*|[\uac00-\ud7a30-9]+/gu)]
    .map((match) => ({ value: match[0], start: match.index, end: match.index + match[0].length }));
  const firstAnswerIndex = tokens.findIndex(({ start }) => start === answerOffset);
  let lastAnswerIndex = -1;
  for (let index = firstAnswerIndex; index >= 0 && index < tokens.length; index += 1) {
    if (
      tokens[index].start < answerEnd
      && tokens[index].end >= answerEnd
      && source.slice(answerOffset, answerEnd) === answerSpan
    ) {
      lastAnswerIndex = index;
      break;
    }
  }
  if (firstAnswerIndex < 0 || lastAnswerIndex < firstAnswerIndex) return [];
  return [
    ...tokens.slice(Math.max(0, firstAnswerIndex - radius), firstAnswerIndex),
    ...tokens.slice(lastAnswerIndex + 1, lastAnswerIndex + 1 + radius),
  ]
    .map(({ value }) => normalizedChoiceStem(value))
    .filter(Boolean);
}

function normalizedNgrams(stems, maximumSize = 4) {
  const values = new Set();
  for (let size = 1; size <= Math.min(maximumSize, stems.length); size += 1) {
    for (let index = 0; index + size <= stems.length; index += 1) {
      values.add(stems.slice(index, index + size).join('\u0000'));
    }
  }
  return values;
}

export function hasNearbyChoiceStemCollision(sentence, answerSpan, choices, radius = 4) {
  const localStems = nearbyChoiceStems(sentence, answerSpan, radius);
  const localNgrams = normalizedNgrams(localStems);
  return (choices ?? []).some((value) => (
    [...normalizedNgrams(choiceTokenStems(value))].some((ngram) => localNgrams.has(ngram))
  ));
}

const PAIRED_KOREAN_PARTICLES = Object.freeze(['으로', '로', '은', '는', '이', '가', '을', '를', '과', '와']);

function followingPairedParticle(sentence, answerSpan) {
  const source = String(sentence ?? '');
  const answer = String(answerSpan ?? '');
  if (!answer || exactOccurrenceCount(source, answer) !== 1) return '';
  const tail = source.slice(source.indexOf(answer) + answer.length);
  return PAIRED_KOREAN_PARTICLES.find((particle) => tail.startsWith(particle)) ?? '';
}

function hangulJongseongIndex(value) {
  const characters = [...String(value ?? '')];
  for (let index = characters.length - 1; index >= 0; index -= 1) {
    const code = characters[index].codePointAt(0);
    if (code >= 0xAC00 && code <= 0xD7A3) return (code - 0xAC00) % 28;
  }
  return null;
}

function choiceMatchesParticle(choice, particle) {
  const jongseong = hangulJongseongIndex(choice);
  if (jongseong === null) return false;
  if (['은', '이', '을', '과'].includes(particle)) return jongseong !== 0;
  if (['는', '가', '를', '와'].includes(particle)) return jongseong === 0;
  if (particle === '으로') return jongseong !== 0 && jongseong !== 8;
  if (particle === '로') return jongseong === 0 || jongseong === 8;
  return true;
}

export function choicesMatchFollowingParticle(sentence, answerSpan, choices) {
  const particle = followingPairedParticle(sentence, answerSpan);
  if (!particle) return true;
  return (choices ?? []).every((choice) => choiceMatchesParticle(choice, particle));
}

export function exactSentenceContainingSpan(text, span) {
  const source = String(text ?? '');
  const answer = String(span ?? '');
  if (!answer || exactOccurrenceCount(source, answer) !== 1) return null;

  const answerStart = source.indexOf(answer);
  const answerEnd = answerStart + answer.length;
  let sentenceStart = 0;
  let sentenceEnd = source.length;
  for (const match of source.matchAll(/[.!?。！？]+(?=\s|$)/gu)) {
    const punctuationEnd = match.index + match[0].length;
    if (punctuationEnd <= answerStart) {
      sentenceStart = punctuationEnd;
      continue;
    }
    if (match.index >= answerEnd) {
      sentenceEnd = punctuationEnd;
      break;
    }
  }
  while (sentenceStart < sentenceEnd && /\s/u.test(source[sentenceStart])) sentenceStart += 1;
  while (sentenceEnd > sentenceStart && /\s/u.test(source[sentenceEnd - 1])) sentenceEnd -= 1;
  const sentence = source.slice(sentenceStart, sentenceEnd);
  if (!sentence || !source.includes(sentence) || exactOccurrenceCount(sentence, answer) !== 1) return null;
  return sentence;
}

function quoteCompletionQuestion(maskedEvidence) {
  return `다음 원문 문장의 [빈칸]에 들어갈 표현으로 정확한 것은? \u201c${maskedEvidence}\u201d`;
}

function quoteCompletionExplanation(evidenceSentence, answerSpan) {
  return `원문은 \u201c${evidenceSentence}\u201d라고 설명하므로 [빈칸]은 \u201c${answerSpan}\u201d입니다.`;
}

function quoteCompletionMechanicalReasons(candidate, evidenceQuote) {
  const reasons = [];
  const sentence = String(candidate?._evidenceSentence ?? '');
  const masked = String(candidate?._maskedEvidence ?? '');
  const answerSpan = String(candidate?._answerSpan ?? '');
  const correctChoice = candidate?.choices?.[candidate.correctIndex];
  if (exactOccurrenceCount(masked, '[빈칸]') !== 1) {
    reasons.push('quote-completion 빈칸이 정확히 하나가 아님');
  }
  if (!sentence || typeof evidenceQuote !== 'string' || !evidenceQuote.includes(sentence)) {
    reasons.push('근거 excerpt가 evidenceQuote의 exact substring이 아님');
  }
  if (correctChoice !== answerSpan) reasons.push('정답 보기가 answerSpan과 일치하지 않음');
  if (exactSentenceContainingSpan(String(evidenceQuote ?? ''), answerSpan) !== sentence) {
    reasons.push('근거 excerpt가 answerSpan을 포함한 정확한 단일 문장이 아님');
  }
  if (hasAnswerGlossLeak(String(evidenceQuote ?? ''), answerSpan)) {
    reasons.push('빈칸 직후 또는 직전 괄호의 영문 번역·약어가 정답을 누설함');
  }
  if (!choicesMatchFollowingParticle(sentence, answerSpan, candidate?.choices ?? [])) {
    reasons.push('선택지와 빈칸 직후 고정 조사의 받침 호응이 다름');
  }
  const wrongChoices = (candidate?.choices ?? []).filter((_, index) => index !== candidate.correctIndex);
  if (hasNearbyChoiceStemCollision(sentence, answerSpan, wrongChoices)) {
    reasons.push('선택지가 빈칸 인접 문맥의 normalized n-gram을 반복함');
  }
  if (masked.replace('[빈칸]', correctChoice ?? '') !== sentence) {
    reasons.push('정답 삽입으로 excerpt exact 문장이 복원되지 않음');
  }
  if ((candidate?.choices ?? []).some((choice, index) => (
    index !== candidate.correctIndex && masked.replace('[빈칸]', choice) === sentence
  ))) {
    reasons.push('오답 삽입으로 excerpt exact 문장이 복원됨');
  }
  if (compactWhitespace(candidate?.question) !== compactWhitespace(quoteCompletionQuestion(masked))) {
    reasons.push('질문이 단일 excerpt 템플릿과 다름');
  }
  if (
    compactWhitespace(candidate?.explanation)
    !== compactWhitespace(quoteCompletionExplanation(sentence, answerSpan))
  ) {
    reasons.push('해설이 단일 excerpt 템플릿과 다름');
  }
  return reasons;
}

export function buildQuoteCompletionCandidate(
  proposal,
  slot,
  source,
  acceptedQuestions,
  diagnostics,
) {
  const reject = (reason) => debugRejection(slot, reason, proposal, diagnostics);
  if (!proposal) return reject('응답에 해당 슬롯이 없음');
  if (proposal.slotId !== slot.slotId) return reject('잘못된 slotId');
  if (proposal.sourceId !== slot.sourceId) return reject('잘못된 sourceId');
  if (proposal.categoryId !== source.categoryId) return reject('잘못된 categoryId');
  if (proposal.evidenceId !== slot.focusEvidenceId) return reject('잘못된 focus evidenceId');
  const focus = source.evidence.find(({ id }) => id === proposal.evidenceId);
  if (!focus || !strictClozeEvidenceViable(source, focus)) {
    return reject('유효하지 않은 strict cloze focus evidenceId');
  }
  const allowedAnswerSpans = quoteSpanCandidates(focus.text);
  const distractorCatalog = sourceWideQuoteCandidateCatalog(source, focus);
  const distractorByKey = new Map(distractorCatalog.map((entry) => [normalizedKey(entry.value), entry]));

  const answerSpan = String(proposal.answerSpan ?? '');
  if (!validQuoteChoice(answerSpan)) return reject('정답 span이 2–30자 핵심 표현 규칙을 지키지 않음');
  if (!allowedAnswerSpans.includes(answerSpan)) return reject('정답 span이 허용된 focus exact-once 후보 풀에 없음');
  if (exactOccurrenceCount(focus.text, answerSpan) !== 1) {
    return reject('정답 span이 focus 원문에 정확히 한 번 등장하지 않음');
  }
  if (!Array.isArray(proposal.distractors) || proposal.distractors.length !== 3) {
    return reject('오답 후보가 3개가 아님');
  }
  const distractors = proposal.distractors.map((value) => String(value ?? ''));
  if (distractors.some((value) => !validQuoteChoice(value))) {
    return reject('오답 후보가 2–30자 핵심 표현 규칙을 지키지 않음');
  }
  if (distractors.some((value) => !distractorByKey.has(normalizedKey(value)))) {
    return reject('오답이 같은 글의 same-role exact 후보 풀에 없음');
  }
  const choiceKeys = [answerSpan, ...distractors].map(normalizedKey);
  if (new Set(choiceKeys).size !== 4) return reject('정답·오답 후보가 중복됨');
  if (choiceKeys.some((key, index) => choiceKeys.some((other, otherIndex) => (
    index !== otherIndex && (key.includes(other) || other.includes(key))
  )))) {
    return reject('선택지 span이 서로 포함됨');
  }
  const answerKey = normalizedKey(answerSpan);
  const distractorEvidenceIds = distractors.map((value) => distractorByKey.get(normalizedKey(value)).evidenceId);
  if (distractors.some((value, index) => {
    const evidence = source.evidence.find(({ id }) => id === distractorEvidenceIds[index]);
    return !evidence || exactOccurrenceCount(evidence.text, value) !== 1;
  })) return reject('오답과 exact evidenceId가 일치하지 않음');

  const evidenceSentence = exactSentenceContainingSpan(focus.text, answerSpan);
  if (!evidenceSentence || !focus.text.includes(evidenceSentence)) {
    return reject('정답 span을 포함한 exact 단일 문장을 결정할 수 없음');
  }
  if (hasNearbyChoiceStemCollision(evidenceSentence, answerSpan, distractors)) {
    return reject('오답이 빈칸 인접 normalized n-gram과 같음');
  }
  if (hasAnswerGlossLeak(focus.text, answerSpan)) return reject('영문 번역·약어 괄호가 정답을 누설함');
  if (!choicesMatchFollowingParticle(evidenceSentence, answerSpan, [answerSpan, ...distractors])) {
    return reject('선택지와 빈칸 직후 고정 조사의 받침 호응이 다름');
  }
  const answerOffset = evidenceSentence.indexOf(answerSpan);
  const prefix = evidenceSentence.slice(0, answerOffset);
  const suffix = evidenceSentence.slice(answerOffset + answerSpan.length);
  const maskedEvidence = `${prefix}[빈칸]${suffix}`;
  if (`${prefix}${answerSpan}${suffix}` !== evidenceSentence) {
    return reject('정답 삽입으로 excerpt exact 문장이 복원되지 않음');
  }
  if (compactWhitespace(`${prefix}${answerSpan}${suffix}`) !== compactWhitespace(evidenceSentence)) {
    return reject('정답 삽입으로 정규화 excerpt가 복원되지 않음');
  }
  if (normalizedKey(maskedEvidence).includes(answerKey)) return reject('빈칸 문장에 정답 span이 노출됨');
  if (distractors.some((value) => `${prefix}${value}${suffix}` === evidenceSentence)) {
    return reject('오답 삽입으로 excerpt exact 문장이 복원됨');
  }

  const rawCandidate = {
    slotId: slot.slotId,
    sourceId: slot.sourceId,
    categoryId: source.categoryId,
    sourceHeading: focus.heading,
    question: quoteCompletionQuestion(maskedEvidence),
    choices: [answerSpan, ...distractors],
    correctIndex: 0,
    explanation: quoteCompletionExplanation(evidenceSentence, answerSpan),
    evidenceId: focus.id,
    distractorEvidenceIds: ['', ...distractorEvidenceIds],
    _questionMode: 'quote-completion',
    _answerSpan: answerSpan,
    _maskedEvidence: maskedEvidence,
    _evidenceSentence: evidenceSentence,
  };
  const validated = structurallyValidate(rawCandidate, slot, source, acceptedQuestions, diagnostics);
  if (!validated) return null;
  return {
    ...validated,
    _questionMode: 'quote-completion',
    _answerSpan: answerSpan,
    _maskedEvidence: maskedEvidence,
    _evidenceSentence: evidenceSentence,
  };
}

export function structurallyValidate(candidate, slot, source, acceptedQuestions, diagnostics) {
  const reject = (reason) => debugRejection(slot, reason, candidate, diagnostics);
  if (!candidate) return reject('응답에 해당 슬롯이 없음');
  if (candidate.slotId !== slot.slotId) return reject('잘못된 slotId');
  if (candidate.sourceId !== slot.sourceId) return reject('잘못된 sourceId');
  if (candidate.categoryId !== source.categoryId) return reject('잘못된 categoryId');
  const question = compactWhitespace(candidate.question);
  const explanation = compactWhitespace(candidate.explanation);
  if (question.length < 10) return reject('문항이 10자 미만');
  if (explanation.length < 10) return reject('해설이 10자 미만');
  if (!Array.isArray(candidate.choices) || candidate.choices.length !== 4) {
    return reject('선택지가 4개가 아님');
  }
  const choices = candidate.choices.map(compactWhitespace);
  if (choices.some((choice) => choice.length < 2)) return reject('선택지가 2자 미만');
  if (new Set(choices.map(normalizedKey)).size !== 4) return reject('중복 선택지');
  const choiceConclusions = choices.map((choice) => normalizedKey(choice.split(/[.!?。]/u, 1)[0]));
  if (new Set(choiceConclusions).size !== 4) return reject('선택지 핵심 결론이 중복됨');
  const looksLikeYesNoQuestion = /(?:나요|까요|인가요|일까요)\?$/u.test(question);
  const binaryChoiceCount = choices.filter((choice) => (
    /^(?:동작|적용|사용|발생|성공|실패|가능|불가능|맞|아닙)/u.test(choice)
  )).length;
  if (looksLikeYesNoQuestion && binaryChoiceCount >= 2) return reject('yes/no형 문항과 보기는 허용하지 않음');
  if (!Number.isInteger(candidate.correctIndex) || candidate.correctIndex < 0 || candidate.correctIndex > 3) {
    return reject('잘못된 correctIndex');
  }
  const evidenceById = new Map((source.evidence ?? []).map((item) => [item.id, item.text]));
  const evidenceIdByQuote = new Map((source.evidence ?? []).map((item) => [item.text, item.id]));
  const evidenceId = candidate.evidenceId
    ?? candidate._evidenceId
    ?? evidenceIdByQuote.get(String(candidate.evidenceQuote ?? '').trim());
  if (slot.focusEvidenceId && evidenceId !== slot.focusEvidenceId) {
    return reject(`evidenceId가 슬롯 focusEvidenceId ${slot.focusEvidenceId}와 다름`);
  }
  const evidenceText = evidenceById.get(evidenceId);
  if (!evidenceText) return reject(`원문 카탈로그에 없는 evidenceId: ${String(evidenceId)}`);
  const evidence = exactEvidence(source.markdown, evidenceText);
  if (!evidence) return reject('evidenceId의 문장이 원문과 일치하지 않음');
  const evidenceKey = normalizedKey(evidence.quote);
  const missingTechnicalTokens = technicalTokens(`${question} ${choices[candidate.correctIndex]}`)
    .filter((token) => !evidenceKey.includes(token));
  if (missingTechnicalTokens.length > 0) {
    return reject(`정답 근거에 없는 영문/코드 핵심 토큰: ${missingTechnicalTokens.join(', ')}`);
  }
  const candidateDistractorEvidenceIds = candidate.distractorEvidenceIds
    ?? candidate._distractorEvidenceIds
    ?? (candidate._distractorEvidenceQuotes ?? candidate.distractorEvidenceQuotes)?.map((quote) => (
      quote ? evidenceIdByQuote.get(String(quote).trim()) : ''
    ));
  if (!Array.isArray(candidateDistractorEvidenceIds) || candidateDistractorEvidenceIds.length !== 4) {
    return reject('오답 반박 근거 id가 4개 위치를 갖추지 않음');
  }
  const distractorEvidenceQuotes = [];
  const distractorEvidenceIds = [];
  for (let index = 0; index < candidateDistractorEvidenceIds.length; index += 1) {
    const distractorEvidenceId = String(candidateDistractorEvidenceIds[index] ?? '').trim();
    if (index === candidate.correctIndex) {
      if (distractorEvidenceId !== '' && debug) {
        console.warn(`  [구조 보정] ${slot.slotId}: 정답 위치의 오답 근거 id는 빈 문자열로 정규화`);
      }
      distractorEvidenceIds.push('');
      distractorEvidenceQuotes.push('');
      continue;
    }
    const distractorText = evidenceById.get(distractorEvidenceId);
    if (
      candidate._questionMode !== 'quote-completion'
      && slot.focusEvidenceId
      && distractorEvidenceId !== slot.focusEvidenceId
    ) {
      return reject(`${index + 1}번 오답 근거 id가 focusEvidenceId와 다름`);
    }
    if (!distractorText) {
      return reject(`${index + 1}번 오답 근거 id가 원문 카탈로그에 없음: ${distractorEvidenceId}`);
    }
    if (
      candidate._questionMode === 'quote-completion'
      && exactOccurrenceCount(distractorText, choices[index]) !== 1
    ) {
      return reject(`${index + 1}번 오답이 지정된 근거 id에 exact-once로 없음`);
    }
    if (
      candidate._questionMode === 'quote-completion'
      && quoteSpanRole(choices[index]) !== quoteSpanRole(candidate._answerSpan)
    ) {
      return reject(`${index + 1}번 오답의 span role이 정답과 다름`);
    }
    const matched = exactEvidence(source.markdown, distractorText);
    if (!matched) return reject(`${index + 1}번 오답 근거 id의 문장이 원문과 일치하지 않음`);
    distractorEvidenceIds.push(distractorEvidenceId);
    distractorEvidenceQuotes.push(matched.quote);
  }
  // sourceHeading은 모델의 요약 판단이 아니라, 정확히 매칭된 인용의 위치로 결정한다.
  // 이렇게 해야 heading이 있는 문서의 첫 heading 전 본문도 '본문'으로 정상 표기된다.
  const sourceHeading = sourceHeadingAt(source.markdown, evidence.start);
  const evidenceQuote = evidence.quote;
  if (candidate._questionMode === 'quote-completion') {
    const mechanicalReasons = quoteCompletionMechanicalReasons(candidate, evidenceQuote);
    if (mechanicalReasons.length > 0) return reject(mechanicalReasons[0]);
  }
  const questionKey = normalizedKey(question);
  if ([...acceptedQuestions.values()].some((item) => normalizedKey(item.question) === questionKey)) {
    return reject('이미 생성된 문항과 중복');
  }

  let choicePermutation = [0, 1, 2, 3];
  let finalChoices = choices;
  let finalCorrectIndex = candidate.correctIndex;
  let finalDistractorEvidenceIds = distractorEvidenceIds;
  let finalDistractorEvidenceQuotes = distractorEvidenceQuotes;
  if (candidate._choicePermutation !== undefined) {
    if (
      !Array.isArray(candidate._choicePermutation)
      || candidate._choicePermutation.length !== 4
      || candidate._choicePermutation.slice().sort((left, right) => left - right).join(',') !== '0,1,2,3'
    ) {
      return reject('저장된 선택지 순열이 전단사가 아님');
    }
    if (
      Number.isInteger(slot.expectedCorrectIndex)
      && candidate.correctIndex !== slot.expectedCorrectIndex
    ) {
      return reject('저장된 correctIndex가 슬롯 해시 위치와 다름');
    }
    choicePermutation = candidate._choicePermutation;
  } else if (Number.isInteger(slot.expectedCorrectIndex)) {
    const permuted = permuteCandidateChoices(
      choices,
      distractorEvidenceIds,
      candidate.correctIndex,
      slot.expectedCorrectIndex,
      slot.slotId,
    );
    choicePermutation = permuted.permutation;
    finalChoices = permuted.choices;
    finalCorrectIndex = permuted.correctIndex;
    finalDistractorEvidenceIds = permuted.distractorEvidenceIds;
    finalDistractorEvidenceQuotes = choicePermutation.map((oldIndex) => distractorEvidenceQuotes[oldIndex]);
  }

  const digest = createHash('sha256')
    .update([slot.sourceId, question, ...finalChoices, evidenceQuote].join('\n'))
    .digest('hex')
    .slice(0, 12);
  return {
    _slotId: slot.slotId,
    _generationAttempt: slot.attempts || 1,
    _focusEvidenceId: slot.focusEvidenceId || evidenceId,
    _declaredCorrectIndex: candidate._declaredCorrectIndex ?? candidate.correctIndex,
    _choicePermutation: choicePermutation,
    ...(candidate._questionMode ? { _questionMode: candidate._questionMode } : {}),
    ...(candidate._answerSpan ? { _answerSpan: candidate._answerSpan } : {}),
    ...(candidate._maskedEvidence ? { _maskedEvidence: candidate._maskedEvidence } : {}),
    ...(candidate._evidenceSentence ? { _evidenceSentence: candidate._evidenceSentence } : {}),
    version: 1,
    id: `quiz-${slot.sourceId}-${digest}`,
    question,
    choices: finalChoices,
    correctIndex: finalCorrectIndex,
    explanation,
    categoryId: source.categoryId,
    sourceId: slot.sourceId,
    sourceCommit: INTERVIEW_SOURCE.snapshotCommit,
    sourceHeading,
    evidenceQuote,
    _evidenceId: evidenceId,
    _distractorEvidenceIds: finalDistractorEvidenceIds,
    _distractorEvidenceQuotes: finalDistractorEvidenceQuotes,
    reviewStatus: 'pending-review',
  };
}

function reviewPrompt(candidates, documents) {
  const focusEvidence = [...new Map(candidates.map((candidate) => {
    const source = documents.get(candidate.sourceId);
    const evidence = source.evidence.find(({ id }) => id === candidate._evidenceId);
    return [`${candidate.sourceId}:${candidate._evidenceId}`, evidence];
  })).values()];
  const sourceText = JSON.stringify(focusEvidence, null, 2);
  const questions = candidates.map((candidate) => ({
    questionId: candidate.id,
    sourceId: candidate.sourceId,
    sourceHeading: candidate.sourceHeading,
    question: candidate.question,
    choices: candidate.choices,
    explanation: candidate.explanation,
    maskedEvidence: candidate._maskedEvidence,
    substitutedSentences: candidate.choices.map((choice, choiceIndex) => ({
      choiceIndex,
      sentence: String(candidate._maskedEvidence ?? '').replace('[빈칸]', choice),
    })),
    candidateEvidenceId: candidate._evidenceId,
  }));
  return `당신은 quote-completion 퀴즈의 독립 검증자입니다. 제공된 focus 원문만 사용해 짧게 판정하세요.

판정 규칙:
- selectedCorrectIndex는 maskedEvidence의 [빈칸]에 보기를 넣었을 때 focus text 안의 해당 단일 문장을 exact 복원하는 보기 인덱스입니다.
- 정답 복원이 정확히 하나면 singleAnswer=true입니다.
- substitutedSentences 4개를 모두 개별로 읽고, 조사·품사·서술어가 맞지 않는 인덱스를 ungrammaticalIndices에 넣으세요.
- 문법은 맞지만 토큰 반복·애너테이션/약어 역할 불일치 등으로 부자연스러운 인덱스를 unnaturalIndices에 넣으세요.
- selectedCorrectIndex를 제외한 보기 중 focus 원문의 맥락에서 참일 수 있거나 합리적으로 그럴듯한 인덱스를 plausibleWrongIndices에 넣으세요. exact 복원여부와 별개로 판단하세요.
- selectedCorrectIndex를 제외한 보기 중 제공된 focus 원문만으로 명백히 틀린지 판단할 수 없는 인덱스를 unsupportedIndices에 넣으세요. 오답은 단순히 원문에 없는 것이 아니라 명백히 성립하지 않아야 합니다.
- 해설이 focus text와 answerSpan만 사용하면 explanationGrounded=true입니다.
- evidenceId는 candidateEvidenceId를 그대로 복사하세요.
- accepted는 selectedCorrectIndex가 정확하고 singleAnswer·explanationGrounded가 true며, 네 index 배열이 모두 빈 배열일 때만 true입니다.
- reason은 1–2문장, 100자 이내로 쓰세요.

문항:
${JSON.stringify(questions, null, 2)}

원문 focus 근거:
${sourceText}`;
}

async function generateBatch(batch, documents, candidatePool) {
  for (const slot of batch) {
    prepareSlotForGeneration(slot, documents.get(slot.sourceId), slot.attempts || 1);
  }
  const generationSeed = createHash('sha256')
    .update(batch.map(({ slotId, attempts }) => `${slotId}:${attempts || 1}`).join('|'))
    .digest()
    .readUInt32BE(0);
  const generated = await ollamaChat([
    {
      role: 'system',
      content: '주어진 한국어 원문만 사용하는 백엔드 면접 퀴즈 출제자입니다. 요청한 JSON 스키마를 지키세요.',
    },
    { role: 'user', content: generationPrompt(batch, documents, candidatePool) },
  ], generationSchema(batch.length, batch, documents), model, contextSize, { temperature: 0.15, seed: generationSeed });
  const bySlot = new Map((generated.questions ?? []).map((candidate) => [candidate.slotId, candidate]));
  const candidates = [];
  const structuralRejections = [];
  for (const slot of batch) {
    const candidate = buildQuoteCompletionCandidate(
      bySlot.get(slot.slotId),
      slot,
      documents.get(slot.sourceId),
      candidatePool,
      structuralRejections,
    );
    if (candidate) {
      candidates.push(candidate);
      candidatePool.set(slot.slotId, candidate);
    }
  }
  return { candidates, structuralRejections };
}

export function reviewDecisionAudit(candidate, decision = {}, sourceEvidence) {
  const validIds = new Set((sourceEvidence ?? []).map(({ id }) => id));
  const validEvidenceIds = (ids) => Array.isArray(ids)
    && ids.length > 0
    && ids.every((id) => typeof id === 'string' && validIds.has(id));
  const reasons = [];
  if (candidate._questionMode === 'quote-completion') {
    const focusText = (sourceEvidence ?? []).find(({ id }) => id === candidate._evidenceId)?.text;
    reasons.push(...quoteCompletionMechanicalReasons(candidate, candidate.evidenceQuote));
    if (typeof focusText !== 'string' || !focusText.includes(candidate._evidenceSentence ?? '')) {
      reasons.push('근거 excerpt가 candidate focus 원문의 exact substring이 아님');
    }
    if (decision.selectedCorrectIndex !== candidate.correctIndex) {
      reasons.push('AI가 선택한 정답 인덱스가 기계 정답과 다름');
    }
    if (decision.singleAnswer !== true) reasons.push('AI가 단일 정답으로 판정하지 않음');
    const requireEmptyIndexArray = (field, label) => {
      const indices = decision[field];
      if (!Array.isArray(indices)) {
        reasons.push(`AI 검증 ${label} 인덱스 배열이 없음`);
        return;
      }
      if (
        new Set(indices).size !== indices.length
        || indices.some((index) => !Number.isInteger(index) || index < 0 || index > 3)
      ) {
        reasons.push(`AI 검증 ${label} 인덱스 배열이 0–3 유일 정수가 아님`);
      }
      if (indices.length > 0) reasons.push(`AI가 ${label}으로 판정한 선택지: ${indices.join(', ')}`);
    };
    requireEmptyIndexArray('ungrammaticalIndices', '비문법적');
    requireEmptyIndexArray('unnaturalIndices', '부자연');
    requireEmptyIndexArray('plausibleWrongIndices', '그럴듯한 오답');
    requireEmptyIndexArray('unsupportedIndices', '원문만으로 반박 불가능');
    if (decision.explanationGrounded !== true) reasons.push('AI가 해설을 focus 근거로 판정하지 않음');
    if (decision.evidenceId !== candidate._evidenceId || !validIds.has(decision.evidenceId)) {
      reasons.push('AI 검증 evidenceId가 candidate focus ID와 다름');
    }
    if (decision.accepted !== true) reasons.push('AI 검증자가 accepted=true로 판정하지 않음');
    return Object.freeze({ passed: reasons.length === 0, reasons: Object.freeze(reasons) });
  }
  const judgments = Array.isArray(decision.choiceJudgments) ? decision.choiceJudgments : [];
  const judgmentIndices = judgments.map(({ choiceIndex }) => choiceIndex).sort((left, right) => left - right);
  const indicesValid = judgments.length === 4
    && JSON.stringify(judgmentIndices) === JSON.stringify([0, 1, 2, 3]);
  if (!indicesValid) reasons.push('choiceIndex 0–3이 각각 정확히 한 번씩 없음');
  for (const judgment of judgments) {
    const label = `선택지 ${String(judgment.choiceIndex)}`;
    if (!validEvidenceIds(judgment.evidenceIds)) {
      reasons.push(`${label}의 근거 ID가 비어 있거나 출처 카탈로그에 없음`);
    }
    if (judgment.choiceIndex === candidate.correctIndex) {
      if (judgment.verdict !== 'entailed') reasons.push(`${label}(정답)의 verdict가 entailed가 아님`);
      if (!Array.isArray(judgment.evidenceIds) || !judgment.evidenceIds.includes(candidate._evidenceId)) {
        reasons.push(`${label}(정답) 근거에 candidateEvidenceId가 없음`);
      }
    } else if (judgment.verdict !== 'contradicted') {
      reasons.push(`${label}(오답)의 verdict가 contradicted가 아님`);
    } else {
      const expectedDistractorEvidenceId = candidate._distractorEvidenceIds?.[judgment.choiceIndex];
      if (
        typeof expectedDistractorEvidenceId !== 'string'
        || !judgment.evidenceIds.includes(expectedDistractorEvidenceId)
      ) {
        reasons.push(`${label}(오답) 근거에 candidateDistractorEvidenceId가 없음`);
      }
    }
  }
  if (decision.premiseEntailed !== true) reasons.push('문항 전제가 원문에서 도출되지 않음');
  if (!validEvidenceIds(decision.premiseEvidenceIds)) {
    reasons.push('문항 전제 근거 ID가 비어 있거나 출처 카탈로그에 없음');
  } else if (!decision.premiseEvidenceIds.includes(candidate._evidenceId)) {
    reasons.push('문항 전제 근거에 candidateEvidenceId가 없음');
  }
  if (decision.explanationFullyGrounded !== true) reasons.push('해설 전체가 원문에 근거하지 않음');
  if (!validEvidenceIds(decision.explanationEvidenceIds)) {
    reasons.push('해설 근거 ID가 비어 있거나 출처 카탈로그에 없음');
  }
  if (decision.answerableWithoutExternalKnowledge !== true) reasons.push('외부 지식 없이 판별할 수 없음');
  if (decision.ambiguous !== false) reasons.push('정답이 모호함');
  if (decision.accepted !== true) reasons.push('AI 검증자가 accepted=true로 판정하지 않음');
  return Object.freeze({ passed: reasons.length === 0, reasons: Object.freeze(reasons) });
}

export function reviewDecisionPasses(candidate, decision, sourceEvidence) {
  return reviewDecisionAudit(candidate, decision, sourceEvidence).passed;
}

async function reviewBatch(candidates, documents) {
  if (candidates.length === 0) return { passed: [], decisions: [], audits: [] };
  const reviewed = await ollamaChat([
    {
      role: 'system',
      content: '주어진 원문 밖의 지식을 절대 사용하지 않는 엄격한 퀴즈 검증자입니다.',
    },
    { role: 'user', content: reviewPrompt(candidates, documents) },
  ], reviewSchema(candidates), validatorModel, Math.min(reviewContextSize, 4096), { numPredict: 768 });
  const decisions = Array.isArray(reviewed.decisions) ? reviewed.decisions : [];
  const expectedIds = new Set(candidates.map(({ id }) => id));
  const decisionIds = decisions.map(({ questionId }) => questionId);
  if (
    decisions.length !== candidates.length
    || new Set(decisionIds).size !== decisions.length
    || decisionIds.some((id) => !expectedIds.has(id))
  ) {
    throw new Error('검증 응답이 모든 문항에 대한 유일한 판정을 포함하지 않았습니다.');
  }

  const decisionsById = new Map(decisions.map((decision) => [decision.questionId, decision]));
  const audits = candidates.map((candidate) => {
    const decision = decisionsById.get(candidate.id);
    const source = documents.get(candidate.sourceId);
    return {
      questionId: candidate.id,
      ...reviewDecisionAudit(candidate, decision, source.evidence),
    };
  });
  const passedIds = new Set(
    audits.filter(({ passed: auditPassed }) => auditPassed).map(({ questionId }) => questionId),
  );
  const auditsById = new Map(audits.map((audit) => [audit.questionId, audit]));
  const passed = candidates
    .filter(({ id }) => passedIds.has(id))
    .map((candidate) => {
      const decision = decisionsById.get(candidate.id);
      const audit = auditsById.get(candidate.id);
      return {
        ...candidate,
        reviewStatus: 'verified',
        _reviewReason: compactWhitespace(decision?.reason),
        _reviewDecision: decision ?? null,
        _mechanicalReasons: audit?.reasons ?? [],
      };
    });

  if (debug) {
    console.warn(`  [AI 검증 판정] ${JSON.stringify(decisions)}`);
    console.warn(`  [기계 검증 결과] ${JSON.stringify(audits)}`);
  }
  return { passed, decisions, audits };
}

function generatedModule(questions, expectedCount) {
  const metadata = {
    version: 1,
    model,
    validatorModel,
    promptVersion: PROMPT_VERSION,
    sourceCommit: INTERVIEW_SOURCE.snapshotCommit,
    expectedCount,
    acceptedCount: questions.length,
    categoryCounts: quizCategoryCounts(questions),
    generatedAt: new Date().toISOString(),
    strategy,
    questionsPerCategory: ['category', 'target'].includes(strategy) ? questionsPerCategory : null,
    articleMinimumPerCategory: strategy === 'article' ? articleMinimumPerCategory : null,
  };
  const publicQuestions = questions.map(({
    _slotId,
    _generationAttempt,
    _focusEvidenceId,
    _declaredCorrectIndex,
    _choicePermutation,
    _questionMode,
    _answerSpan,
    _maskedEvidence,
    _evidenceSentence,
    _evidenceId,
    _distractorEvidenceIds,
    _distractorEvidenceQuotes,
    _reviewReason,
    _reviewDecision,
    _mechanicalReasons,
    ...question
  }) => question);
  return `// Ollama ${model}로 사전 생성하고 독립 검증 호출을 통과한 정적 문항 뱅크입니다.\n`
    + `export const QUIZ_GENERATION = Object.freeze(${JSON.stringify(metadata, null, 2)});\n\n`
    + `export const QUIZ_GENERATED_QUESTIONS = Object.freeze(${JSON.stringify(publicQuestions, null, 2)});\n`;
}

async function atomicWrite(path, content) {
  const temporaryPath = `${path}.tmp-${process.pid}-${Date.now()}`;
  await writeFile(temporaryPath, content);
  await rename(temporaryPath, path);
}

function checkpointConfiguration(slots) {
  return {
    sourceCommit: INTERVIEW_SOURCE.snapshotCommit,
    model,
    validatorModel,
    promptVersion: PROMPT_VERSION,
    strategy,
    questionsPerCategory: ['category', 'target'].includes(strategy) ? questionsPerCategory : null,
    articleMinimumPerCategory: strategy === 'article' ? articleMinimumPerCategory : null,
    sourceId: sourceId || null,
    sourceIds: sourceIds.length > 0 ? sourceIds : null,
    maxAttempts,
    batchSize,
    reviewBatchSize,
    contextSize,
    reviewContextSize,
    slotIds: slots.map(({ slotId }) => slotId),
  };
}

function sameValues(left, right) {
  return JSON.stringify(left) === JSON.stringify(right);
}

export function quizCategoryCounts(questions) {
  return Object.fromEntries(INTERVIEW_CATEGORIES.map((category) => [
    category.id,
    questions.filter((question) => question.categoryId === category.id).length,
  ]));
}

export function underfilledQuizCategories(questions, minimum = 10) {
  return Object.entries(quizCategoryCounts(questions))
    .filter(([, count]) => count < minimum)
    .map(([categoryId, count]) => ({ categoryId, count }));
}

async function checkpointExists() {
  try {
    await readFile(checkpointPath, 'utf8');
    return true;
  } catch (error) {
    if (error?.code === 'ENOENT') return false;
    throw error;
  }
}

async function saveCheckpoint(state, slots, status = 'running') {
  const payload = {
    version: 5,
    status,
    updatedAt: new Date().toISOString(),
    configuration: checkpointConfiguration(slots),
    attempts: Object.fromEntries(slots.map(({ slotId }) => [slotId, state.attempts.get(slotId) ?? 0])),
    staged: [...state.staged.values()],
    structuralRejected: [...state.structuralRejected.values()],
    rejected: [...state.rejected.values()],
    accepted: [...state.accepted.values()],
  };
  await atomicWrite(checkpointPath, `${JSON.stringify(payload, null, 2)}\n`);
}

async function restoreCheckpoint(slots, documents) {
  let payload;
  try {
    payload = JSON.parse(await readFile(checkpointPath, 'utf8'));
  } catch (error) {
    if (error?.code === 'ENOENT') {
      throw new Error(`재개할 체크포인트가 없습니다: ${checkpointPath}`);
    }
    throw new Error(`체크포인트를 읽을 수 없습니다: ${error.message}`);
  }
  if (
    payload?.version !== 5
    || !payload.attempts
    || typeof payload.attempts !== 'object'
    || !Array.isArray(payload.staged)
    || !Array.isArray(payload.structuralRejected)
    || !Array.isArray(payload.rejected)
    || !Array.isArray(payload.accepted)
  ) {
    throw new Error('지원하지 않는 퀵즈 생성 체크포인트입니다.');
  }
  const expectedConfiguration = checkpointConfiguration(slots);
  if (!sameValues(payload.configuration, expectedConfiguration)) {
    throw new Error('체크포인트의 모델·출처·슬롯 설정이 현재 실행과 다릅니다. 같은 인수로 --resume하세요.');
  }

  const slotsById = new Map(slots.map((slot) => [slot.slotId, slot]));
  const attempts = new Map();
  for (const slot of slots) {
    const count = payload.attempts[slot.slotId];
    if (!Number.isInteger(count) || count < 0 || count > maxAttempts) {
      throw new Error(`체크포인트의 시도 횟수가 잘못되었습니다: ${slot.slotId}`);
    }
    attempts.set(slot.slotId, count);
  }
  const prepareStoredSlot = (slot, stored) => {
    const generationAttempt = stored?._generationAttempt;
    if (
      !Number.isInteger(generationAttempt)
      || generationAttempt < 1
      || generationAttempt > (attempts.get(slot.slotId) ?? 0)
    ) {
      throw new Error(`체크포인트 문항의 생성 시도 정보가 잘못되었습니다: ${String(stored?.id)}`);
    }
    prepareSlotForGeneration(slot, documents.get(slot.sourceId), generationAttempt);
    if (stored._focusEvidenceId !== slot.focusEvidenceId) {
      throw new Error(`체크포인트 문항의 focusEvidenceId가 현재 슬롯과 다릅니다: ${String(stored?.id)}`);
    }
  };

  const accepted = new Map();
  for (const stored of payload.accepted) {
    const slot = slotsById.get(stored?._slotId);
    if (!slot || stored.sourceCommit !== INTERVIEW_SOURCE.snapshotCommit || stored.reviewStatus !== 'verified') {
      throw new Error(`체크포인트 문항의 출처 정보가 잘못되었습니다: ${String(stored?.id)}`);
    }
    prepareStoredSlot(slot, stored);
    const normalized = structurallyValidate(
      { ...stored, slotId: stored._slotId },
      slot,
      documents.get(slot.sourceId),
      accepted,
    );
    if (!normalized || normalized.id !== stored.id) {
      throw new Error(`체크포인트 문항이 현재 원문 검증을 통과하지 못했습니다: ${String(stored?.id)}`);
    }
    const restoredAudit = reviewDecisionAudit(
      normalized,
      stored._reviewDecision,
      documents.get(slot.sourceId).evidence,
    );
    if (!stored._reviewDecision || !restoredAudit.passed) {
      throw new Error(`체크포인트 문항의 실제 AI 검증 판정을 재검증할 수 없습니다: ${String(stored?.id)}`);
    }
    accepted.set(slot.slotId, {
      ...normalized,
      reviewStatus: 'verified',
      _reviewReason: compactWhitespace(stored._reviewReason),
      _reviewDecision: stored._reviewDecision,
      _mechanicalReasons: Array.isArray(stored._mechanicalReasons) ? stored._mechanicalReasons : [],
    });
  }

  const staged = new Map();
  for (const stored of payload.staged) {
    const slot = slotsById.get(stored?._slotId);
    if (!slot || accepted.has(slot.slotId) || stored.reviewStatus !== 'pending-review') {
      throw new Error(`체크포인트 생성 후보의 슬롯 정보가 잘못되었습니다: ${String(stored?.id)}`);
    }
    prepareStoredSlot(slot, stored);
    const candidatePool = new Map([...accepted, ...staged]);
    const normalized = structurallyValidate(
      { ...stored, slotId: stored._slotId },
      slot,
      documents.get(slot.sourceId),
      candidatePool,
    );
    if (!normalized || normalized.id !== stored.id) {
      throw new Error(`체크포인트 생성 후보가 현재 원문 검증을 통과하지 못했습니다: ${String(stored?.id)}`);
    }
    staged.set(slot.slotId, normalized);
  }

  const rejected = new Map();
  for (const stored of payload.rejected) {
    const slot = slotsById.get(stored?._slotId);
    if (!slot || accepted.has(slot.slotId) || stored.reviewStatus !== 'rejected') {
      throw new Error(`체크포인트 거부 문항의 슬롯 정보가 잘못되었습니다: ${String(stored?.id)}`);
    }
    prepareStoredSlot(slot, stored);
    const candidatePool = new Map([...accepted, ...staged, ...rejected]);
    const normalized = structurallyValidate(
      { ...stored, slotId: stored._slotId },
      slot,
      documents.get(slot.sourceId),
      candidatePool,
    );
    if (!normalized || normalized.id !== stored.id) {
      throw new Error(`체크포인트 거부 문항이 현재 원문 검증을 통과하지 못했습니다: ${String(stored?.id)}`);
    }
    rejected.set(stored.id, {
      ...normalized,
      reviewStatus: 'rejected',
      _reviewReason: compactWhitespace(stored._reviewReason),
      _reviewDecision: stored._reviewDecision ?? null,
      _mechanicalReasons: Array.isArray(stored._mechanicalReasons) ? stored._mechanicalReasons : [],
    });
  }
  const structuralRejected = new Map();
  for (const failure of payload.structuralRejected) {
    if (
      !slotsById.has(failure?.slotId)
      || typeof failure.key !== 'string'
      || typeof failure.reason !== 'string'
    ) {
      throw new Error('체크포인트 구조 탈락 진단이 잘못되었습니다.');
    }
    structuralRejected.set(failure.key, failure);
  }
  return { accepted, staged, structuralRejected, rejected, attempts };
}

export async function main() {
  const startedAt = Date.now();
  await assertModelReady(model);
  if (validatorModel !== model) await assertModelReady(validatorModel);
  const selectedIdSet = new Set(sourceIds);
  const selectedQuestions = sourceId
    ? INTERVIEW_QUESTIONS.filter((question) => question.id === sourceId)
    : sourceIds.length > 0
      ? INTERVIEW_QUESTIONS.filter((question) => selectedIdSet.has(question.id))
      : INTERVIEW_QUESTIONS.slice(0, Math.min(limit, INTERVIEW_QUESTIONS.length));
  const missingSourceIds = sourceIds.filter((id) => !selectedQuestions.some((question) => question.id === id));
  if (selectedQuestions.length === 0 || missingSourceIds.length > 0) {
    throw new RangeError(`출처를 찾을 수 없습니다: ${missingSourceIds.join(', ') || sourceId}`);
  }
  const documents = await loadDocuments(selectedQuestions);
  const slots = buildSlots(selectedQuestions, documents);
  const noEligibleSourceIds = selectedQuestions
    .filter((question) => !documents.get(question.id).evidence.some((evidence) => (
      strictClozeEvidenceViable(documents.get(question.id), evidence)
    )))
    .map(({ id }) => id);
  if (slots.length === 0) {
    throw new Error(`no-eligible-strict-cloze: ${noEligibleSourceIds.join(', ') || '선택된 출처 전체'}`);
  }
  if (noEligibleSourceIds.length > 0) {
    console.warn(`no-eligible-strict-cloze ${noEligibleSourceIds.length}개 글은 안전 기준을 낮추지 않고 다른 글 슬롯으로 보충합니다: ${noEligibleSourceIds.join(', ')}`);
  }
  if (!resume && !restart && await checkpointExists()) {
    throw new Error(`기존 체크포인트가 있습니다: ${checkpointPath}\n이어서 실행하려면 --resume, 새로 시작하려면 --restart를 사용하세요.`);
  }
  const state = resume
    ? await restoreCheckpoint(slots, documents)
    : {
      accepted: new Map(),
      staged: new Map(),
      structuralRejected: new Map(),
      rejected: new Map(),
      attempts: new Map(slots.map(({ slotId }) => [slotId, 0])),
    };
  if (!resume) await saveCheckpoint(state, slots);

  console.log(`대상 ${selectedQuestions.length}개 글, ${slots.length}개 슬롯을 ${model}로 생성하고 ${validatorModel}로 검증합니다.`);
  if (resume) {
    console.log(`체크포인트에서 검증 ${state.accepted.size}개, 검증 대기 ${state.staged.size}개를 복구했습니다.`);
  }

  while (true) {
    const generationPending = slots.filter(({ slotId }) => (
      !state.accepted.has(slotId)
      && !state.staged.has(slotId)
      && (state.attempts.get(slotId) ?? 0) < maxAttempts
    ));

    if (generationPending.length > 0) {
      if (validatorModel !== model) await unloadModel(validatorModel);
      const generationBatches = chunks(generationPending, batchSize);
      const structuralPool = [...state.structuralRejected.entries()].map(([key, failure]) => [
        key,
        {
          ...(failure.candidate ?? {}),
          sourceId: failure.sourceId,
          _reviewReason: failure.reason,
        },
      ]);
      const candidatePool = new Map([
        ...state.accepted,
        ...state.staged,
        ...state.rejected,
        ...structuralPool,
      ]);
      for (let index = 0; index < generationBatches.length; index += 1) {
        const batch = generationBatches[index];
        for (const slot of batch) slot.attempts = (state.attempts.get(slot.slotId) ?? 0) + 1;
        let generatedResult = { candidates: [], structuralRejections: [] };
        try {
          generatedResult = await generateBatch(batch, documents, candidatePool);
        } catch (error) {
          console.warn(`생성 ${index + 1}/${generationBatches.length} 실패: ${error.message}`);
          generatedResult.structuralRejections = batch.map((slot) => ({
            slotId: slot.slotId,
            sourceId: slot.sourceId,
            reason: `생성 호출 실패: ${error.message}`,
            candidate: null,
          }));
        }
        for (const slot of batch) {
          state.attempts.set(slot.slotId, slot.attempts);
        }
        for (const candidate of generatedResult.candidates) state.staged.set(candidate._slotId, candidate);
        for (const failure of generatedResult.structuralRejections) {
          const key = `${failure.slotId}:${state.attempts.get(failure.slotId)}`;
          state.structuralRejected.set(key, { ...failure, key });
        }
        await saveCheckpoint(state, slots, 'generating');
        const attemptLabel = [...new Set(batch.map(({ slotId }) => state.attempts.get(slotId)))].join(',');
        console.log(`시도 ${attemptLabel}/${maxAttempts} 생성 ${index + 1}/${generationBatches.length}: ${generatedResult.candidates.length}/${batch.length} 구조 통과 (검증 대기 ${state.staged.size})`);
      }
      continue;
    }

    if (state.staged.size > 0) {
      if (validatorModel !== model) await unloadModel(model);
      const reviewBatches = chunks([...state.staged.values()], reviewBatchSize);
      for (let index = 0; index < reviewBatches.length; index += 1) {
        const batch = reviewBatches[index];
        let reviewResult;
        try {
          reviewResult = await reviewBatch(batch, documents);
        } catch (error) {
          await saveCheckpoint(state, slots, 'reviewing');
          throw new Error(`검증 ${index + 1}/${reviewBatches.length} 실패(후보는 체크포인트에 보존됨): ${error.message}`);
        }
        for (const candidate of batch) state.staged.delete(candidate._slotId);
        for (const candidate of reviewResult.passed) state.accepted.set(candidate._slotId, candidate);
        const passedIds = new Set(reviewResult.passed.map(({ id }) => id));
        const decisionsById = new Map(reviewResult.decisions.map((decision) => [decision.questionId, decision]));
        const auditsById = new Map(reviewResult.audits.map((audit) => [audit.questionId, audit]));
        for (const candidate of batch) {
          if (passedIds.has(candidate.id)) continue;
          const decision = decisionsById.get(candidate.id);
          const audit = auditsById.get(candidate.id);
          const mechanicalNote = decision?.accepted === true
            ? ` AI accepted=true였지만 기계 검증을 통과하지 못함: ${(audit?.reasons ?? []).join('; ')}`
            : '';
          state.rejected.set(candidate.id, {
            ...candidate,
            reviewStatus: 'rejected',
            _reviewReason: `${compactWhitespace(decision?.reason) || 'AI 상세 검증 거부.'}${mechanicalNote}`,
            _reviewDecision: decision ?? null,
            _mechanicalReasons: audit?.reasons ?? [],
          });
        }
        await saveCheckpoint(state, slots, 'reviewing');
        console.log(`검증 ${index + 1}/${reviewBatches.length}: ${reviewResult.passed.length}/${batch.length} 통과 (누적 ${state.accepted.size}, 대기 ${state.staged.size})`);
      }
      continue;
    }

    break;
  }

  const order = new Map(INTERVIEW_QUESTIONS.map((question, index) => [question.id, index]));
  const questions = [...state.accepted.values()].sort((left, right) => {
    const sourceOrder = order.get(left.sourceId) - order.get(right.sourceId);
    return sourceOrder || left.id.localeCompare(right.id);
  });
  const categoryCounts = quizCategoryCounts(questions);
  const fullDatasetRun = !sourceId && sourceIds.length === 0
    && selectedQuestions.length === INTERVIEW_QUESTIONS.length;
  const underfilledCategories = underfilledQuizCategories(questions);
  if (fullDatasetRun && underfilledCategories.length > 0) {
    await saveCheckpoint(state, slots, 'incomplete');
    const summary = underfilledCategories.map(({ categoryId, count }) => `${categoryId}:${count}`);
    throw new Error(`카테고리별 검증 문항 10개를 충족하지 못해 기존 출력을 보존합니다: ${summary.join(', ')}`);
  }
  await atomicWrite(resolvedOutputPath, generatedModule(questions, slots.length));
  await saveCheckpoint(state, slots, 'complete');

  const coveredCategories = new Set(questions.map(({ categoryId }) => categoryId));
  const elapsedSeconds = ((Date.now() - startedAt) / 1000).toFixed(1);
  console.log(`정적 문항 ${questions.length}개를 저장했습니다. 카테고리 ${coveredCategories.size}/${INTERVIEW_CATEGORIES.length}개. 소요 ${elapsedSeconds}초.`);
  const unfilled = slots.filter(({ slotId }) => !state.accepted.has(slotId));
  if (unfilled.length > 0) {
    console.warn(`반복 실패한 ${unfilled.length}개 슬롯은 억지로 채우지 않았습니다: ${unfilled.map(({ slotId }) => slotId).join(', ')}`);
  }
}

const invokedPath = process.argv[1] ? resolve(process.argv[1]) : '';
if (invokedPath === fileURLToPath(import.meta.url)) await main();
