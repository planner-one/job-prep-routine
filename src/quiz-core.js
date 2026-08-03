import { logicalDateString } from './routine-core.js';

export const QUIZ_QUESTION_VERSION = 2;
export const QUIZ_SESSION_VERSION = 1;
export const QUIZ_STAGE_SIZE = 5;
export const QUIZ_MAX_QUESTIONS = 10;
export const QUIZ_QUESTION_KINDS = Object.freeze(['main', 'follow-up']);
export const QUIZ_FOLLOW_UP_ROLES = Object.freeze(['core', 'remediation']);
export const QUIZ_REVIEW_STATUSES = Object.freeze([
  'draft',
  'mechanically-verified',
  'verified',
  'rejected',
]);
export const QUIZ_SELECTABLE_REVIEW_STATUS = 'verified';
export const QUIZ_SESSION_STATUSES = Object.freeze([
  'in-progress',
  'stage-one-graded',
  'completed',
]);

const REVIEW_STATUS_SET = new Set(QUIZ_REVIEW_STATUSES);
const QUESTION_KIND_SET = new Set(QUIZ_QUESTION_KINDS);
const FOLLOW_UP_ROLE_SET = new Set(QUIZ_FOLLOW_UP_ROLES);
const SESSION_STATUS_SET = new Set(QUIZ_SESSION_STATUSES);
const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/u;

function isPlainObject(value) {
  if (value === null || typeof value !== 'object') return false;
  const prototype = Object.getPrototypeOf(value);
  return prototype === Object.prototype || prototype === null;
}

function nonEmptyString(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

function isoTimestamp(now = new Date()) {
  const date = now instanceof Date ? now : new Date(now);
  if (Number.isNaN(date.getTime())) throw new RangeError('유효한 시각이 필요합니다.');
  return date.toISOString();
}

function normalizedQuestionText(value) {
  return String(value ?? '').trim().replace(/\s+/gu, ' ').toLocaleLowerCase('ko-KR');
}

function collectionValue(collection, key) {
  if (collection instanceof Map) return collection.get(key);
  if (isPlainObject(collection)) return collection[key];
  return undefined;
}

function normalizedSourceHeading(value) {
  return String(value ?? '')
    .replace(/[*_`]/gu, '')
    .replace(/\\([\\`*{}\[\]()#+.!_<>-])/gu, '$1')
    .replace(/<[^>]+>/gu, '')
    .replace(/[\p{Extended_Pictographic}\p{Emoji_Modifier}\u200d\ufe0f]/gu, '')
    .trim();
}

function sourceHeadingAt(sourceText, offset) {
  let heading = '본문';
  for (const match of String(sourceText).matchAll(/^#{2,4}\s+(.+?)\s*$/gmu)) {
    if (match.index > offset) break;
    heading = normalizedSourceHeading(match[1]) || '본문';
  }
  return heading;
}

function evidenceMatchesHeading(sourceText, evidenceQuote, expectedHeading) {
  const normalizedExpected = normalizedSourceHeading(expectedHeading);
  let offset = sourceText.indexOf(evidenceQuote);
  while (offset >= 0) {
    if (sourceHeadingAt(sourceText, offset) === normalizedExpected) return true;
    offset = sourceText.indexOf(evidenceQuote, offset + 1);
  }
  return false;
}

function iterableSet(candidate) {
  if (candidate instanceof Set) return new Set(candidate);
  if (candidate && typeof candidate !== 'string' && typeof candidate[Symbol.iterator] === 'function') {
    return new Set(candidate);
  }
  return new Set();
}

function questionErrors(candidate, options = {}) {
  const errors = [];
  const context = nonEmptyString(candidate?.id) ? candidate.id : '알 수 없는 문항';
  const requiredStrings = [
    ['id', '문항 ID'],
    ['question', '문항'],
    ['explanation', '해설'],
    ['categoryId', '카테고리 ID'],
    ['sourceId', '출처 ID'],
    ['sourceCommit', '출처 커밋'],
    ['sourceHeading', '출처 제목'],
    ['sourceAnchor', '내부 원문 앵커'],
    ['evidenceQuote', '근거 인용'],
  ];

  if (!isPlainObject(candidate)) return ['문항은 일반 객체여야 합니다.'];
  if (candidate.version !== QUIZ_QUESTION_VERSION) {
    errors.push(`${context}: version은 ${QUIZ_QUESTION_VERSION}이어야 합니다.`);
  }
  const kind = candidate.kind ?? 'main';
  if (!QUESTION_KIND_SET.has(kind)) {
    errors.push(`${context}: kind는 main 또는 follow-up이어야 합니다.`);
  } else if (kind === 'follow-up' && !nonEmptyString(candidate.followUpOf)) {
    errors.push(`${context}: 꼬리 질문은 followUpOf로 메인 문항 ID를 지정해야 합니다.`);
  } else if (kind === 'main' && candidate.followUpOf !== undefined && candidate.followUpOf !== null) {
    errors.push(`${context}: 메인 문항에는 followUpOf를 지정할 수 없습니다.`);
  }
  if (kind === 'follow-up') {
    if (![1, 2, 3].includes(candidate.followUpOrder)) {
      errors.push(`${context}: 꼬리 질문 순서는 1부터 3 사이여야 합니다.`);
    }
    if (!FOLLOW_UP_ROLE_SET.has(candidate.followUpRole)) {
      errors.push(`${context}: 꼬리 질문 역할은 core 또는 remediation이어야 합니다.`);
    }
    if (candidate.followUpOrder === 3 && candidate.followUpRole !== 'remediation') {
      errors.push(`${context}: 세 번째 꼬리 질문은 remediation 역할이어야 합니다.`);
    }
    if (candidate.followUpOrder < 3 && candidate.followUpRole !== 'core') {
      errors.push(`${context}: 첫 두 꼬리 질문은 core 역할이어야 합니다.`);
    }
  }
  for (const [field, label] of requiredStrings) {
    if (!nonEmptyString(candidate[field])) errors.push(`${context}: ${label}이(가) 필요합니다.`);
  }

  if (!Array.isArray(candidate.choices) || candidate.choices.length !== 4) {
    errors.push(`${context}: 선택지는 정확히 4개여야 합니다.`);
  } else {
    if (candidate.choices.some((choice) => typeof choice !== 'string')) {
      errors.push(`${context}: 선택지는 모두 문자열이어야 합니다.`);
    }
    const normalizedChoices = candidate.choices.map(normalizedQuestionText);
    if (normalizedChoices.some((choice) => !choice)) {
      errors.push(`${context}: 빈 선택지를 허용하지 않습니다.`);
    }
    if (new Set(normalizedChoices).size !== 4) {
      errors.push(`${context}: 선택지 4개는 서로 달라야 합니다.`);
    }
  }

  if (!Number.isInteger(candidate.correctIndex) || candidate.correctIndex < 0 || candidate.correctIndex > 3) {
    errors.push(`${context}: correctIndex는 0부터 3 사이의 단일 정수여야 합니다.`);
  }
  if (!Array.isArray(candidate.choiceFeedback)
    || candidate.choiceFeedback.length !== 4
    || candidate.choiceFeedback.some((item) => !nonEmptyString(item))) {
    errors.push(`${context}: 선택지별 판단 근거 4개가 필요합니다.`);
  }
  if (!Array.isArray(candidate.keyPoints)
    || candidate.keyPoints.length < 2
    || candidate.keyPoints.length > 4
    || candidate.keyPoints.some((item) => !nonEmptyString(item))) {
    errors.push(`${context}: 핵심 키워드는 2개 이상 4개 이하여야 합니다.`);
  }
  if (nonEmptyString(candidate.sourceAnchor)
    && !/^[\p{Letter}\p{Number}_-]+$/u.test(candidate.sourceAnchor)) {
    errors.push(`${context}: 내부 원문 앵커 형식이 올바르지 않습니다.`);
  }
  if (!REVIEW_STATUS_SET.has(candidate.reviewStatus)) {
    errors.push(`${context}: reviewStatus가 알려진 검증 상태가 아닙니다.`);
  }
  if (options.requireVerified === true && candidate.reviewStatus !== QUIZ_SELECTABLE_REVIEW_STATUS) {
    errors.push(`${context}: 출제 데이터는 verified 상태여야 합니다.`);
  }
  if (nonEmptyString(options.expectedCommit) && candidate.sourceCommit !== options.expectedCommit) {
    errors.push(`${context}: 출처 커밋이 기준 커밋과 다릅니다.`);
  }

  if (options.sourceCategories !== undefined && nonEmptyString(candidate.sourceId)) {
    const expectedCategoryId = collectionValue(options.sourceCategories, candidate.sourceId);
    if (!nonEmptyString(expectedCategoryId)) {
      errors.push(`${context}: ${candidate.sourceId} 출처의 공식 카테고리를 찾을 수 없습니다.`);
    } else if (candidate.categoryId !== expectedCategoryId) {
      errors.push(`${context}: 카테고리 ID가 ${candidate.sourceId} 출처의 공식 카테고리와 다릅니다.`);
    }
  }

  if (options.sourceTexts !== undefined && nonEmptyString(candidate.sourceId) && nonEmptyString(candidate.evidenceQuote)) {
    const sourceText = collectionValue(options.sourceTexts, candidate.sourceId);
    if (typeof sourceText !== 'string') {
      errors.push(`${context}: ${candidate.sourceId} 원문을 찾을 수 없습니다.`);
    } else if (!sourceText.includes(candidate.evidenceQuote)) {
      errors.push(`${context}: 근거 인용이 원문과 정확히 일치하지 않습니다.`);
    } else if (!evidenceMatchesHeading(sourceText, candidate.evidenceQuote, candidate.sourceHeading)) {
      errors.push(`${context}: 근거 인용이 선언한 출처 제목 구역 아래에 있지 않습니다.`);
    }
  }
  return errors;
}

export function validateQuizQuestion(candidate, options = {}) {
  const errors = questionErrors(candidate, options);
  return Object.freeze({ valid: errors.length === 0, errors: Object.freeze(errors) });
}

export function assertQuizQuestion(candidate, options = {}) {
  const result = validateQuizQuestion(candidate, options);
  if (!result.valid) throw new TypeError(result.errors.join('\n'));
  return candidate;
}

export function validateQuizQuestions(candidates, options = {}) {
  const questions = Array.isArray(candidates) ? candidates : [];
  const errors = Array.isArray(candidates) ? [] : ['퀴즈 데이터는 배열이어야 합니다.'];
  const ids = new Set();
  const texts = new Set();

  for (const question of questions) {
    errors.push(...questionErrors(question, options));
    if (!nonEmptyString(question?.id)) continue;
    if (ids.has(question.id)) errors.push(`${question.id}: 중복된 문항 ID입니다.`);
    ids.add(question.id);

    const normalized = normalizedQuestionText(question.question);
    if (!normalized) continue;
    if (texts.has(normalized)) errors.push(`${question.id}: 문항 내용이 중복됩니다.`);
    texts.add(normalized);
  }

  const byId = new Map(questions.filter((question) => nonEmptyString(question?.id))
    .map((question) => [question.id, question]));
  const followUpsByMain = new Map();
  for (const question of questions) {
    if ((question?.kind ?? 'main') !== 'follow-up' || !nonEmptyString(question?.followUpOf)) continue;
    const parent = byId.get(question.followUpOf);
    if (!parent) {
      errors.push(`${question.id}: followUpOf가 가리키는 메인 문항을 찾을 수 없습니다.`);
    } else if ((parent.kind ?? 'main') !== 'main') {
      errors.push(`${question.id}: followUpOf는 메인 문항만 가리킬 수 있습니다.`);
    } else if (parent.sourceId !== question.sourceId) {
      errors.push(`${question.id}: 꼬리 질문과 메인 문항은 같은 출처여야 합니다.`);
    }
    const siblings = followUpsByMain.get(question.followUpOf) ?? [];
    siblings.push(question);
    followUpsByMain.set(question.followUpOf, siblings);
  }
  for (const [mainId, siblings] of followUpsByMain) {
    const orders = siblings.map(({ followUpOrder }) => followUpOrder);
    if (new Set(orders).size !== orders.length) {
      errors.push(`${mainId}: 꼬리 질문 순서가 중복됩니다.`);
    }
    if (options.requireFollowUpsPerMain === 3
      && (siblings.length !== 3 || ![1, 2, 3].every((order) => orders.includes(order)))) {
      errors.push(`${mainId}: 검증된 꼬리 질문 1·2·3번이 모두 필요합니다.`);
    }
  }
  if (options.requireFollowUpsPerMain === 3) {
    for (const question of questions.filter((item) => (item?.kind ?? 'main') === 'main')) {
      if (!followUpsByMain.has(question.id)) {
        errors.push(`${question.id}: 연결된 꼬리 질문이 없습니다.`);
      }
    }
  }

  return Object.freeze({
    valid: errors.length === 0,
    questionCount: questions.length,
    errors: Object.freeze(errors),
  });
}

export function logicalQuizDate(now = new Date()) {
  return logicalDateString(now, 2);
}

// FNV-1a 32-bit 해시와 mulberry32 PRNG로 브라우저와 Node에서 같은 순서를 만든다.
function stringSeed(value) {
  let hash = 0x811c9dc5;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 0x01000193);
  }
  return hash >>> 0;
}

function seededRandom(seed) {
  let value = seed >>> 0;
  return () => {
    value += 0x6d2b79f5;
    let result = value;
    result = Math.imul(result ^ (result >>> 15), result | 1);
    result ^= result + Math.imul(result ^ (result >>> 7), result | 61);
    return ((result ^ (result >>> 14)) >>> 0) / 4294967296;
  };
}

function stableQuestionOrder(questions) {
  return [...questions].sort((left, right) => String(left.id).localeCompare(String(right.id), 'en'));
}

function shuffled(questions, seed) {
  const result = stableQuestionOrder(questions);
  const random = seededRandom(stringSeed(seed));
  for (let index = result.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1));
    [result[index], result[swapIndex]] = [result[swapIndex], result[index]];
  }
  return result;
}

function resolvedQuizDate(options) {
  if (options.date !== undefined) {
    if (typeof options.date !== 'string' || !DATE_PATTERN.test(options.date)) {
      throw new RangeError('퀴즈 날짜는 YYYY-MM-DD 형식이어야 합니다.');
    }
    return options.date;
  }
  return logicalQuizDate(options.now ?? new Date());
}

export function createQuizSeed(options = {}) {
  const date = resolvedQuizDate(options);
  const primarySourceId = nonEmptyString(options.primarySourceId) ? options.primarySourceId.trim() : 'all';
  return `${date}:${primarySourceId}`;
}

function selectableQuestion(question, allowedStatuses) {
  return isPlainObject(question)
    && allowedStatuses.has(question.reviewStatus)
    && (question.kind ?? 'main') === 'main'
    && validateQuizQuestion(question).valid;
}

// 10문항 채점 뒤에는 틀린 메인 문항의 꼬리 질문을 먼저 제안한다.
// 모두 맞혔거나 답이 없으면 현재 세션 순서에서 가장 앞선 메인 문항을 기준으로 고른다.
export function selectFollowUpQuestion(questions, session, options = {}) {
  const allowedStatuses = iterableSet(options.reviewStatuses ?? [QUIZ_SELECTABLE_REVIEW_STATUS]);
  const usedQuestionIds = iterableSet(options.usedQuestionIds);
  const byId = new Map((Array.isArray(questions) ? questions : [])
    .filter((question) => isPlainObject(question))
    .map((question) => [question.id, question]));
  const mainIds = (Array.isArray(session?.questionIds) ? session.questionIds : [])
    .filter((id) => (byId.get(id)?.kind ?? 'main') === 'main');
  const incorrectIds = mainIds.filter((id) => {
    const question = byId.get(id);
    const answer = session?.answers?.[id];
    return Number.isInteger(answer) && question && answer !== question.correctIndex;
  });
  const priorityIds = [...incorrectIds, ...mainIds.filter((id) => !incorrectIds.includes(id))];
  for (const mainId of priorityIds) {
    const candidate = stableQuestionOrder((Array.isArray(questions) ? questions : []).filter((question) => (
      question?.kind === 'follow-up'
      && question.followUpOf === mainId
      && !usedQuestionIds.has(question.id)
      && allowedStatuses.has(question.reviewStatus)
      && validateQuizQuestion(question).valid
    )))[0];
    if (candidate) return candidate;
  }
  return null;
}

export function selectQuizQuestions(questions, options = {}) {
  if (!nonEmptyString(options.primarySourceId)) {
    throw new RangeError('기준이 될 원문 ID가 필요합니다.');
  }
  const primarySourceId = options.primarySourceId.trim();
  const todaySourceIds = [...iterableSet(options.todaySourceIds)]
    .filter((id) => nonEmptyString(id) && id !== primarySourceId);
  const todaySet = new Set(todaySourceIds);
  const usedQuestionIds = iterableSet(options.usedQuestionIds ?? options.excludeIds);
  const allowedStatuses = iterableSet(options.reviewStatuses ?? [QUIZ_SELECTABLE_REVIEW_STATUS]);
  const limit = Number.isInteger(options.limit) && options.limit >= 0
    ? Math.min(options.limit, QUIZ_MAX_QUESTIONS)
    : QUIZ_MAX_QUESTIONS;
  const seed = createQuizSeed({ ...options, primarySourceId });
  const uniqueIds = new Set();
  const uniqueTexts = new Set();
  const pool = [];
  const reusedPool = [];

  for (const question of Array.isArray(questions) ? questions : []) {
    if (!selectableQuestion(question, allowedStatuses)) continue;
    const text = normalizedQuestionText(question.question);
    if (uniqueIds.has(question.id) || uniqueTexts.has(text)) continue;
    uniqueIds.add(question.id);
    uniqueTexts.add(text);
    (usedQuestionIds.has(question.id) ? reusedPool : pool).push(question);
  }

  const categoryId = nonEmptyString(options.categoryId)
    ? options.categoryId
    : [...pool, ...reusedPool].find((question) => question.sourceId === primarySourceId)?.categoryId;
  const selected = [];

  function appendByPriority(candidates, seedSuffix = '') {
    const primary = candidates.filter((question) => question.sourceId === primarySourceId);
    const today = candidates.filter((question) => question.sourceId !== primarySourceId && todaySet.has(question.sourceId));
    const category = candidates.filter((question) => (
      question.sourceId !== primarySourceId
      && !todaySet.has(question.sourceId)
      && nonEmptyString(categoryId)
      && question.categoryId === categoryId
    ));
    const global = candidates.filter((question) => (
      question.sourceId !== primarySourceId
      && !todaySet.has(question.sourceId)
      && question.categoryId !== categoryId
    ));
    for (const [tier, tierCandidates] of [['primary', primary], ['today', today], ['category', category], ['global', global]]) {
      for (const question of shuffled(tierCandidates, `${seed}:${tier}${seedSuffix}`)) {
        if (selected.length >= limit) return;
        selected.push(question);
      }
    }
  }

  appendByPriority(pool);
  if (selected.length < limit && options.allowUsedFallback === true) {
    appendByPriority(reusedPool, ':reused');
  }
  return selected;
}

function defaultSessionId(date, primarySourceId, now) {
  const safeSourceId = primarySourceId.replace(/[^a-zA-Z0-9_-]+/gu, '-');
  return `quiz-${date}-${safeSourceId}-${new Date(now).getTime()}`;
}

export function createQuizSession(questions, options = {}) {
  if (!nonEmptyString(options.primarySourceId)) {
    throw new RangeError('기준이 될 원문 ID가 필요합니다.');
  }
  const now = options.now ?? new Date();
  const date = resolvedQuizDate({ ...options, now });
  const selected = selectQuizQuestions(questions, { ...options, date });
  if (selected.length === 0) throw new RangeError('출제할 수 있는 검증 문항이 없습니다.');
  const timestamp = isoTimestamp(now);
  const primarySourceId = options.primarySourceId.trim();
  return {
    version: QUIZ_SESSION_VERSION,
    id: nonEmptyString(options.id) ? options.id : defaultSessionId(date, primarySourceId, now),
    date,
    seed: createQuizSeed({ date, primarySourceId }),
    primarySourceId,
    categoryId: nonEmptyString(options.categoryId)
      ? options.categoryId
      : (selected.find(({ sourceId }) => sourceId === primarySourceId)?.categoryId ?? ''),
    questionIds: selected.map(({ id }) => id),
    currentStage: 1,
    status: 'in-progress',
    answers: {},
    revealedStages: [],
    startedAt: timestamp,
    updatedAt: timestamp,
    completedAt: null,
  };
}

export function getQuizStageQuestionIds(session, stage = session?.currentStage ?? 1) {
  if (stage !== 1 && stage !== 2) throw new RangeError('퀴즈 단계는 1 또는 2여야 합니다.');
  const ids = Array.isArray(session?.questionIds) ? session.questionIds : [];
  const start = (stage - 1) * QUIZ_STAGE_SIZE;
  return ids.slice(start, start + QUIZ_STAGE_SIZE);
}

export function isQuizStageComplete(session, stage = session?.currentStage ?? 1) {
  const ids = getQuizStageQuestionIds(session, stage);
  return ids.length > 0 && ids.every((id) => Number.isInteger(session?.answers?.[id]));
}

function changedSession(session, patch, now) {
  return { ...session, ...patch, updatedAt: isoTimestamp(now) };
}

export function answerQuizQuestion(session, questionId, selectedIndex, now = new Date()) {
  if (!isPlainObject(session) || session.version !== QUIZ_SESSION_VERSION) {
    throw new TypeError('유효한 QuizSession v1이 필요합니다.');
  }
  if (!Number.isInteger(selectedIndex) || selectedIndex < 0 || selectedIndex > 3) {
    throw new RangeError('선택지 번호는 0부터 3 사이의 정수여야 합니다.');
  }
  if (!getQuizStageQuestionIds(session).includes(questionId)) {
    throw new RangeError('현재 단계에 포함된 문항이 아닙니다.');
  }
  if (session.status === 'completed') throw new RangeError('완료한 퀴즈는 수정할 수 없습니다.');
  if (session.revealedStages?.includes(session.currentStage)) {
    throw new RangeError('이미 채점한 단계의 답은 수정할 수 없습니다.');
  }
  return changedSession(session, {
    answers: { ...session.answers, [questionId]: selectedIndex },
  }, now);
}

export function revealQuizStage(session, stage = session?.currentStage ?? 1, now = new Date()) {
  if (!isQuizStageComplete(session, stage)) throw new RangeError('현재 단계의 모든 문항에 답해야 채점할 수 있습니다.');
  if (stage === 2 && !isQuizStageComplete(session, 1)) {
    throw new RangeError('첫 5문제에 모두 답해야 최종 채점할 수 있습니다.');
  }
  const newlyRevealed = stage === 2 ? [1, 2] : [stage];
  const revealedStages = [...new Set([...(session.revealedStages ?? []), ...newlyRevealed])].sort();
  const isLastStage = stage === 2 || session.questionIds.length <= QUIZ_STAGE_SIZE;
  return changedSession(session, {
    revealedStages,
    status: isLastStage ? 'completed' : 'stage-one-graded',
    completedAt: isLastStage ? isoTimestamp(now) : null,
  }, now);
}

export function startAdditionalQuizStage(session, now = new Date()) {
  if (!isQuizStageComplete(session, 1)) {
    throw new RangeError('첫 5문제에 모두 답해야 추가 문제를 풀 수 있습니다.');
  }
  if (getQuizStageQuestionIds(session, 2).length === 0) {
    throw new RangeError('추가로 풀 검증 문항이 없습니다.');
  }
  if (session.status === 'completed') throw new RangeError('완료한 퀴즈는 계속할 수 없습니다.');
  return changedSession(session, { currentStage: 2, status: 'in-progress' }, now);
}

function questionLookup(questions) {
  if (questions instanceof Map) return questions;
  return new Map((Array.isArray(questions) ? questions : []).map((question) => [question.id, question]));
}

function scorePercent(correct, total) {
  return total === 0 ? 0 : Math.round((correct / total) * 100);
}

export function scoreQuizSession(session, questions, options = {}) {
  const throughStage = options.throughStage ?? session?.currentStage ?? 1;
  if (throughStage !== 1 && throughStage !== 2) {
    throw new RangeError('채점 단계는 1 또는 2여야 합니다.');
  }
  const lookup = questionLookup(questions);
  const stageBreakdown = [];
  const items = [];

  for (let stage = 1; stage <= throughStage; stage += 1) {
    const ids = getQuizStageQuestionIds(session, stage);
    if (ids.length === 0) continue;
    let answered = 0;
    let correct = 0;
    for (const id of ids) {
      const question = lookup.get(id);
      if (!question) throw new RangeError(`채점할 문항을 찾을 수 없습니다: ${id}`);
      const selectedIndex = session?.answers?.[id];
      const hasAnswer = Number.isInteger(selectedIndex) && selectedIndex >= 0 && selectedIndex <= 3;
      const isCorrect = hasAnswer && selectedIndex === question.correctIndex;
      if (hasAnswer) answered += 1;
      if (isCorrect) correct += 1;
      items.push({
        stage,
        questionId: id,
        selectedIndex: hasAnswer ? selectedIndex : null,
        correctIndex: question.correctIndex,
        answered: hasAnswer,
        isCorrect,
      });
    }
    stageBreakdown.push({
      stage,
      total: ids.length,
      answered,
      correct,
      incorrect: answered - correct,
      unanswered: ids.length - answered,
      percent: scorePercent(correct, ids.length),
    });
  }

  const total = stageBreakdown.reduce((sum, stage) => sum + stage.total, 0);
  const answered = stageBreakdown.reduce((sum, stage) => sum + stage.answered, 0);
  const correct = stageBreakdown.reduce((sum, stage) => sum + stage.correct, 0);
  return {
    version: QUIZ_SESSION_VERSION,
    sessionId: session.id,
    throughStage,
    total,
    answered,
    correct,
    incorrect: answered - correct,
    unanswered: total - answered,
    percent: scorePercent(correct, total),
    stageBreakdown,
    items,
  };
}

function validQuestionIdSet(validQuestionIds) {
  if (validQuestionIds === undefined || validQuestionIds === null) return null;
  return iterableSet(validQuestionIds);
}

export function normalizeQuizSession(candidate, validQuestionIds) {
  if (!isPlainObject(candidate)
    || candidate.version !== QUIZ_SESSION_VERSION
    || !nonEmptyString(candidate.id)
    || !nonEmptyString(candidate.primarySourceId)
    || !nonEmptyString(candidate.date)
    || !DATE_PATTERN.test(candidate.date)) return null;

  const allowedIds = validQuestionIdSet(validQuestionIds);
  const questionIds = [];
  const seen = new Set();
  for (const id of Array.isArray(candidate.questionIds) ? candidate.questionIds : []) {
    if (questionIds.length >= QUIZ_MAX_QUESTIONS) break;
    if (!nonEmptyString(id) || seen.has(id) || (allowedIds && !allowedIds.has(id))) continue;
    seen.add(id);
    questionIds.push(id);
  }
  if (questionIds.length === 0) return null;

  const answers = {};
  const sourceAnswers = isPlainObject(candidate.answers) ? candidate.answers : {};
  for (const id of questionIds) {
    const answer = sourceAnswers[id];
    if (Number.isInteger(answer) && answer >= 0 && answer <= 3) answers[id] = answer;
  }
  const canUseSecondStage = questionIds.length > QUIZ_STAGE_SIZE;
  const revealedStages = [];
  for (const stage of Array.isArray(candidate.revealedStages) ? candidate.revealedStages : []) {
    if ((stage === 1 || (stage === 2 && canUseSecondStage)) && !revealedStages.includes(stage)) {
      revealedStages.push(stage);
    }
  }
  revealedStages.sort();
  if (revealedStages.includes(2) && !revealedStages.includes(1)) revealedStages.unshift(1);

  const firstStageIds = questionIds.slice(0, QUIZ_STAGE_SIZE);
  const secondStageIds = questionIds.slice(QUIZ_STAGE_SIZE, QUIZ_MAX_QUESTIONS);
  const firstStageComplete = firstStageIds.length > 0 && firstStageIds.every((id) => Number.isInteger(answers[id]));
  const secondStageComplete = secondStageIds.length > 0 && secondStageIds.every((id) => Number.isInteger(answers[id]));
  const currentStage = candidate.currentStage === 2 && canUseSecondStage && firstStageComplete ? 2 : 1;

  let status = SESSION_STATUS_SET.has(candidate.status) ? candidate.status : 'in-progress';
  const completedStage = canUseSecondStage ? secondStageComplete : firstStageComplete;
  if (status === 'completed' && (!completedStage || !revealedStages.includes(canUseSecondStage ? 2 : 1))) {
    status = 'in-progress';
  }
  if (status === 'stage-one-graded' && (!firstStageComplete || !revealedStages.includes(1))) {
    status = 'in-progress';
  }

  return {
    version: QUIZ_SESSION_VERSION,
    id: candidate.id,
    date: candidate.date,
    seed: nonEmptyString(candidate.seed)
      ? candidate.seed
      : createQuizSeed({ date: candidate.date, primarySourceId: candidate.primarySourceId }),
    primarySourceId: candidate.primarySourceId,
    categoryId: typeof candidate.categoryId === 'string' ? candidate.categoryId : '',
    questionIds,
    currentStage,
    status,
    answers,
    revealedStages,
    startedAt: typeof candidate.startedAt === 'string' ? candidate.startedAt : null,
    updatedAt: typeof candidate.updatedAt === 'string' ? candidate.updatedAt : null,
    completedAt: status === 'completed' && typeof candidate.completedAt === 'string'
      ? candidate.completedAt
      : null,
  };
}
