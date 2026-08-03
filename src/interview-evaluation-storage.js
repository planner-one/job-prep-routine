import { INTERVIEW_EVALUATION_VERSION } from './interview-evaluation-core.js';

export const INTERVIEW_EVALUATION_STORAGE_VERSION = 1;
export const INTERVIEW_EVALUATION_STORAGE_KEY = 'job-prep-routine:interview:evaluations';
export const INTERVIEW_EVALUATION_STORAGE_METHODS = Object.freeze([
  'loadAll',
  'list',
  'getLatest',
  'save',
  'remove',
]);

function isPlainObject(value) {
  if (value === null || typeof value !== 'object') return false;
  const prototype = Object.getPrototypeOf(value);
  return prototype === Object.prototype || prototype === null;
}

function clone(value) {
  return typeof structuredClone === 'function'
    ? structuredClone(value)
    : JSON.parse(JSON.stringify(value));
}

function parseJson(raw) {
  if (typeof raw !== 'string' || raw === '') return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function isStoredEvaluation(candidate, questionId) {
  if (!isPlainObject(candidate)) return false;
  if (candidate.version !== INTERVIEW_EVALUATION_VERSION) return false;
  if (typeof candidate.id !== 'string' || candidate.id.trim() === '') return false;
  if (candidate.questionId !== questionId) return false;
  if (typeof candidate.evaluatedAt !== 'string' || Number.isNaN(Date.parse(candidate.evaluatedAt))) {
    return false;
  }
  return [candidate.sourceCommit, candidate.provider, candidate.model, candidate.promptVersion]
    .every((value) => typeof value === 'string' && value.trim() !== '');
}

export function createEmptyInterviewEvaluationStorageState() {
  return { version: INTERVIEW_EVALUATION_STORAGE_VERSION, evaluations: {} };
}

export function normalizeInterviewEvaluationStorageState(candidate) {
  const source = isPlainObject(candidate) ? candidate : {};
  const sourceEvaluations = isPlainObject(source.evaluations) ? source.evaluations : {};
  const evaluations = {};

  for (const [questionId, items] of Object.entries(sourceEvaluations)) {
    if (typeof questionId !== 'string' || questionId.trim() === '' || !Array.isArray(items)) continue;
    const seen = new Set();
    const valid = [];
    for (const item of items) {
      if (!isStoredEvaluation(item, questionId) || seen.has(item.id)) continue;
      seen.add(item.id);
      valid.push(clone(item));
    }
    valid.sort((left, right) => right.evaluatedAt.localeCompare(left.evaluatedAt));
    if (valid.length > 0) evaluations[questionId] = valid;
  }

  return { version: INTERVIEW_EVALUATION_STORAGE_VERSION, evaluations };
}

function assertStorage(storage) {
  if (storage === null || typeof storage !== 'object'
    || typeof storage.getItem !== 'function'
    || typeof storage.setItem !== 'function') {
    throw new TypeError('면접 평가 저장소를 사용할 수 없습니다.');
  }
  return storage;
}

function assertEvaluation(evaluation) {
  const questionId = typeof evaluation?.questionId === 'string' ? evaluation.questionId : '';
  if (!isStoredEvaluation(evaluation, questionId)) {
    throw new TypeError('저장할 면접 평가 결과가 올바르지 않습니다.');
  }
  return evaluation;
}

/**
 * 브라우저 저장소를 도메인 코드 밖에 격리하는 localStorage 어댑터다.
 */
export function createLocalInterviewEvaluationStorage(storage = globalThis.localStorage) {
  const target = assertStorage(storage);

  function readState() {
    return normalizeInterviewEvaluationStorageState(
      parseJson(target.getItem(INTERVIEW_EVALUATION_STORAGE_KEY)),
    );
  }

  function writeState(state) {
    const normalized = normalizeInterviewEvaluationStorageState(state);
    target.setItem(INTERVIEW_EVALUATION_STORAGE_KEY, JSON.stringify(normalized));
    return normalized;
  }

  function list(questionId) {
    if (typeof questionId !== 'string' || questionId.trim() === '') return [];
    return clone(readState().evaluations[questionId] ?? []);
  }

  return Object.freeze({
    loadAll() {
      return readState();
    },

    list,

    getLatest(questionId) {
      return list(questionId)[0] ?? null;
    },

    save(evaluation) {
      const saved = clone(assertEvaluation(evaluation));
      const state = readState();
      const items = [...(state.evaluations[saved.questionId] ?? [])];
      const index = items.findIndex(({ id }) => id === saved.id);
      if (index >= 0) items[index] = saved;
      else items.push(saved);
      state.evaluations[saved.questionId] = items;
      writeState(state);
      return clone(saved);
    },

    remove(questionId, evaluationId) {
      if (typeof questionId !== 'string' || typeof evaluationId !== 'string') return false;
      const state = readState();
      const items = state.evaluations[questionId] ?? [];
      const filtered = items.filter(({ id }) => id !== evaluationId);
      if (filtered.length === items.length) return false;
      if (filtered.length > 0) state.evaluations[questionId] = filtered;
      else delete state.evaluations[questionId];
      writeState(state);
      return true;
    },
  });
}

export const createInterviewEvaluationStorage = createLocalInterviewEvaluationStorage;

export function assertInterviewEvaluationStorage(candidate) {
  if (candidate === null || typeof candidate !== 'object') {
    throw new TypeError('면접 평가 저장소가 올바르지 않습니다.');
  }
  const missing = INTERVIEW_EVALUATION_STORAGE_METHODS
    .filter((method) => typeof candidate[method] !== 'function');
  if (missing.length > 0) {
    throw new TypeError(`면접 평가 저장소에 필요한 기능이 없습니다: ${missing.join(', ')}`);
  }
  return candidate;
}
