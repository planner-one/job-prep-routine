import test from 'node:test';
import assert from 'node:assert/strict';
import { INTERVIEW_QUESTIONS } from '../src/interview-data.js';
import {
  INTERVIEW_STATE_KEY,
  INTERVIEW_STATE_VERSION,
  QUESTION_STATUSES,
  addQuestionToQueue,
  buildInterviewStats,
  createEmptyInterviewState,
  createEmptyQuestionState,
  ensureDailyQueue,
  filterInterviewQuestions,
  interviewQueueKey,
  normalizeInterviewQueue,
  normalizeInterviewState,
  replaceQueueQuestion,
  resetQuestionState,
  setQueueCompleted,
  setQueuePinned,
  updateQuestionState,
} from '../src/interview-core.js';

const VALID_IDS = new Set(INTERVIEW_QUESTIONS.map(({ id }) => id));

test('면접 상태와 큐의 공개 기본 계약을 제공한다', () => {
  assert.equal(INTERVIEW_STATE_VERSION, 1);
  assert.equal(INTERVIEW_STATE_KEY, 'job-prep-routine:interview:state');
  assert.deepEqual(QUESTION_STATUSES, ['unseen', 'studying', 'review', 'done']);
  assert.deepEqual(createEmptyQuestionState(), {
    status: 'unseen',
    favorite: false,
    queuePinned: false,
    confidence: 0,
    answer: '',
    keywords: '',
    memo: '',
    sourceCommit: '',
    lastStudiedAt: null,
    updatedAt: null,
  });
  assert.deepEqual(createEmptyInterviewState(), {
    version: 1,
    questions: {},
    filters: { query: '', categoryId: 'all', status: 'all', favoritesOnly: false },
  });
  assert.equal(interviewQueueKey('2026-07-20'), 'job-prep-routine:interview:queue:2026-07-20');
});

test('손상된 질문 상태를 필드별로 정규화하고 알 수 없는 ID를 버린다', () => {
  const normalized = normalizeInterviewState({
    version: 999,
    questions: {
      'be-1': { status: 'review', favorite: 1, confidence: 9, answer: '내 답변', memo: null },
      'be-999': { status: 'done' },
    },
  }, new Set(['be-1']));
  assert.deepEqual(normalized.questions['be-1'], {
    status: 'review', favorite: true, queuePinned: false, confidence: 0,
    answer: '내 답변', keywords: '', memo: '', sourceCommit: '', lastStudiedAt: null, updatedAt: null,
  });
  assert.equal(Object.hasOwn(normalized.questions, 'be-999'), false);
});

test('최상위 필터를 비손실로 정규화하고 입력 객체를 변경하지 않는다', () => {
  const candidate = {
    questions: {
      'be-1': {
        status: 'done', favorite: false, queuePinned: true, confidence: 5,
        answer: '답', keywords: '키워드', memo: '메모', sourceCommit: 'commit-old',
        lastStudiedAt: '2026-07-19T00:00:00.000Z', updatedAt: '2026-07-19T01:00:00.000Z',
      },
    },
    filters: { query: '  원문  ', categoryId: 'network-http', status: 'review', favoritesOnly: true },
  };
  const snapshot = structuredClone(candidate);

  const normalized = normalizeInterviewState(candidate, new Set(['be-1']));

  assert.deepEqual(normalized.filters, candidate.filters);
  assert.deepEqual(normalized.questions['be-1'], candidate.questions['be-1']);
  assert.notEqual(normalized.filters, candidate.filters);
  assert.notEqual(normalized.questions['be-1'], candidate.questions['be-1']);
  assert.deepEqual(candidate, snapshot);
});

test('일반 객체가 아닌 상태와 잘못된 필터 값은 기본값으로 정규화한다', () => {
  assert.deepEqual(normalizeInterviewState([], VALID_IDS), createEmptyInterviewState());
  assert.deepEqual(normalizeInterviewState({
    questions: { 'be-1': [] },
    filters: { query: 1, categoryId: null, status: 'invalid', favoritesOnly: 1 },
  }, new Set(['be-1'])), {
    version: 1,
    questions: { 'be-1': createEmptyQuestionState() },
    filters: { query: '', categoryId: 'all', status: 'all', favoritesOnly: false },
  });
});

test('한 질문 갱신은 다른 질문과 유효 필드를 보존한다', () => {
  let state = createEmptyInterviewState();
  state = updateQuestionState(state, 'be-1', { answer: 'OSIV 설명', status: 'studying' }, new Date('2026-07-20T10:00:00+09:00'));
  state = updateQuestionState(state, 'be-2', { favorite: true }, new Date('2026-07-20T10:01:00+09:00'));
  assert.equal(state.questions['be-1'].answer, 'OSIV 설명');
  assert.equal(state.questions['be-2'].favorite, true);
});

test('질문 갱신과 초기화는 입력과 다른 질문 객체를 변경하지 않는다', () => {
  const original = updateQuestionState(createEmptyInterviewState(), 'be-1', { answer: '보존' }, new Date('2026-07-20T00:00:00Z'));
  const untouchedQuestion = original.questions['be-1'];

  const updated = updateQuestionState(original, 'be-2', {
    status: 'invalid', confidence: 3.5, memo: null, updatedAt: '조작값',
  }, new Date('2026-07-20T01:00:00Z'));

  assert.equal(updated.questions['be-1'], untouchedQuestion);
  assert.deepEqual(updated.questions['be-2'], {
    ...createEmptyQuestionState(),
    updatedAt: '2026-07-20T01:00:00.000Z',
  });
  assert.equal(Object.hasOwn(original.questions, 'be-2'), false);
  const reset = resetQuestionState(updated, 'be-2');
  assert.equal(reset.questions['be-1'], untouchedQuestion);
  assert.equal(Object.hasOwn(reset.questions, 'be-2'), false);
  assert.equal(Object.hasOwn(updated.questions, 'be-2'), true);
});

test('검색·카테고리·상태·즐겨찾기 필터를 동시에 적용한다', () => {
  let state = createEmptyInterviewState();
  const target = INTERVIEW_QUESTIONS.find(({ id }) => id === 'be-1');
  state = updateQuestionState(state, target.id, { status: 'review', favorite: true });
  const result = filterInterviewQuestions(INTERVIEW_QUESTIONS, state, {
    query: '  open SESSION  ', categoryId: target.categoryId, status: 'review', favoritesOnly: true,
  });
  assert.deepEqual(result.map(({ id }) => id), ['be-1']);
});

test('필터는 제목 원문과 질문 입력 순서를 변경하지 않고 order 순으로 반환한다', () => {
  const questions = [
    { id: 'second', order: 2, title: 'Open   Session', categoryId: 'test' },
    { id: 'first', order: 1, title: 'OPEN SESSION', categoryId: 'test' },
  ];
  const snapshot = structuredClone(questions);
  const result = filterInterviewQuestions(questions, createEmptyInterviewState(), { query: ' open session ' });
  assert.deepEqual(result.map(({ id }) => id), ['first', 'second']);
  assert.deepEqual(questions, snapshot);
});

test('상태별 통계를 전체 152문항 기준으로 계산한다', () => {
  let state = createEmptyInterviewState();
  state = updateQuestionState(state, 'be-1', { status: 'studying' });
  state = updateQuestionState(state, 'be-2', { status: 'review' });
  state = updateQuestionState(state, 'be-3', { status: 'done' });
  assert.deepEqual(buildInterviewStats(INTERVIEW_QUESTIONS, state), {
    total: 152, unseen: 149, studying: 1, review: 1, done: 1,
  });
});

test('큐 고정은 다섯 개까지만 허용한다', () => {
  let state = createEmptyInterviewState();
  for (let number = 1; number <= 5; number += 1) {
    state = setQueuePinned(state, `be-${number}`, true);
  }
  assert.throws(() => setQueuePinned(state, 'be-6', true), /최대 5개/);
  const released = setQueuePinned(state, 'be-1', false);
  assert.equal(released.questions['be-1'].queuePinned, false);
  assert.equal(state.questions['be-1'].queuePinned, true);
});

test('큐 정규화는 날짜·ID·중복·완료 목록을 정리하고 입력을 변경하지 않는다', () => {
  const candidate = {
    date: '2026-07-20',
    ids: ['be-1', 'be-1', 'be-999', 'be-2', 'be-3', 'be-4', 'be-5', 'be-6'],
    completedIds: ['be-999', 'be-2', 'be-2', 'be-6'],
    updatedAt: 'saved',
  };
  const snapshot = structuredClone(candidate);
  assert.deepEqual(normalizeInterviewQueue(candidate, '2026-07-20', VALID_IDS), {
    date: '2026-07-20',
    ids: ['be-1', 'be-2', 'be-3', 'be-4', 'be-5'],
    completedIds: ['be-2'],
    updatedAt: 'saved',
  });
  assert.deepEqual(candidate, snapshot);
  assert.deepEqual(normalizeInterviewQueue(candidate, '2026-07-21', VALID_IDS), {
    date: '2026-07-21', ids: [], completedIds: [], updatedAt: null,
  });
});

test('고정·복습·낮은 자신감·미학습·오래된 학습 순으로 5개를 추천한다', () => {
  const questions = Array.from({ length: 7 }, (_, index) => ({
    id: `be-${index + 1}`, order: index, title: `질문 ${index + 1}`, categoryId: 'test',
  }));
  let state = createEmptyInterviewState();
  state = updateQuestionState(state, 'be-1', { status: 'done', queuePinned: true, lastStudiedAt: '2026-07-19T00:00:00.000Z' });
  state = updateQuestionState(state, 'be-2', { status: 'review' });
  state = updateQuestionState(state, 'be-3', { status: 'studying', confidence: 2 });
  state = updateQuestionState(state, 'be-4', { status: 'unseen' });
  state = updateQuestionState(state, 'be-5', { status: 'done', lastStudiedAt: '2026-07-01T00:00:00.000Z' });
  state = updateQuestionState(state, 'be-6', { status: 'done', lastStudiedAt: '2026-07-18T00:00:00.000Z' });
  state = updateQuestionState(state, 'be-7', { status: 'done', lastStudiedAt: '2026-07-19T00:00:00.000Z' });
  const queue = ensureDailyQueue(questions, state, null, '2026-07-20', new Date('2026-07-20T03:00:00Z'));
  assert.deepEqual(queue.ids, ['be-1', 'be-2', 'be-3', 'be-4', 'be-5']);
  assert.equal(queue.updatedAt, '2026-07-20T03:00:00.000Z');
});

test('저장 상태가 없는 질문을 학습 이력이 있는 질문보다 먼저 추천한다', () => {
  const questions = [
    { id: 'studied', order: 1, title: '학습한 질문', categoryId: 'test' },
    { id: 'never-seen', order: 2, title: '미학습 질문', categoryId: 'test' },
  ];
  const state = updateQuestionState(createEmptyInterviewState(), 'studied', {
    status: 'done', lastStudiedAt: '2026-07-01T00:00:00.000Z',
  });

  const queue = ensureDailyQueue(questions, state, null, '2026-07-20', new Date('2026-07-20T03:00:00Z'));

  assert.deepEqual(queue.ids, ['never-seen', 'studied']);
});

test('같은 추천 단계에서는 오래된 학습일과 공식 order가 앞선다', () => {
  const questions = [
    { id: 'newer', order: 3, title: 'newer', categoryId: 'test' },
    { id: 'same-later', order: 2, title: 'same-later', categoryId: 'test' },
    { id: 'older', order: 4, title: 'older', categoryId: 'test' },
    { id: 'same-earlier', order: 1, title: 'same-earlier', categoryId: 'test' },
  ];
  let state = createEmptyInterviewState();
  state = updateQuestionState(state, 'newer', { status: 'done', lastStudiedAt: '2026-07-19T00:00:00.000Z' });
  state = updateQuestionState(state, 'same-later', { status: 'done', lastStudiedAt: '2026-07-10T00:00:00.000Z' });
  state = updateQuestionState(state, 'older', { status: 'done', lastStudiedAt: '2026-07-01T00:00:00.000Z' });
  state = updateQuestionState(state, 'same-earlier', { status: 'done', lastStudiedAt: '2026-07-10T00:00:00.000Z' });
  const queue = ensureDailyQueue(questions, state, null, '2026-07-20', new Date('2026-07-20T03:00:00Z'));
  assert.deepEqual(queue.ids, ['older', 'same-earlier', 'same-later', 'newer']);
});

test('신규 추천은 질문 ID의 첫 등장을 보존하고 중복 없는 큐를 만든다', () => {
  const questions = [
    { id: 'be-a', order: 1, title: '첫 질문', categoryId: 'test' },
    { id: 'be-a', order: 0, title: '중복 질문', categoryId: 'test' },
    ...['b', 'c', 'd', 'e', 'f'].map((suffix, index) => ({
      id: `be-${suffix}`, order: index + 2, title: `질문 ${suffix}`, categoryId: 'test',
    })),
  ];
  const snapshot = structuredClone(questions);

  const queue = ensureDailyQueue(questions, createEmptyInterviewState(), null, '2026-07-20', new Date('2026-07-20T03:00:00Z'));

  assert.deepEqual(queue.ids, ['be-a', 'be-b', 'be-c', 'be-d', 'be-e']);
  assert.equal(new Set(queue.ids).size, queue.ids.length);
  assert.deepEqual(questions, snapshot);
});

test('같은 날짜의 유효한 저장 큐는 재선정하지 않는다', () => {
  const saved = { date: '2026-07-20', ids: ['be-7', 'be-6'], completedIds: ['be-7'], updatedAt: 'saved' };
  const queue = ensureDailyQueue(INTERVIEW_QUESTIONS, createEmptyInterviewState(), saved, '2026-07-20');
  assert.deepEqual(queue.ids, ['be-7', 'be-6']);
  assert.deepEqual(queue.completedIds, ['be-7']);
  assert.equal(queue.updatedAt, 'saved');
});

test('교체·직접 추가·완료 취소가 중복 없이 큐를 보존한다', () => {
  const state = createEmptyInterviewState();
  let queue = normalizeInterviewQueue({ date: '2026-07-20', ids: ['be-1', 'be-2', 'be-3', 'be-4', 'be-5'], completedIds: [] }, '2026-07-20', VALID_IDS);
  queue = replaceQueueQuestion(queue, 'be-5', INTERVIEW_QUESTIONS, state, new Date('2026-07-20T01:00:00Z'));
  assert.equal(queue.ids.includes('be-5'), false);
  assert.equal(new Set(queue.ids).size, 5);
  queue = addQuestionToQueue(queue, 'be-20', INTERVIEW_QUESTIONS, state);
  assert.equal(queue.ids.includes('be-20'), true);
  queue = setQueueCompleted(queue, queue.ids[0], true);
  assert.equal(queue.completedIds.includes(queue.ids[0]), true);
  queue = setQueueCompleted(queue, queue.ids[0], false);
  assert.equal(queue.completedIds.includes(queue.ids[0]), false);
});

test('교체는 같은 자리와 완료 목록을 보존하고 고정·완료 항목은 거부한다', () => {
  let state = createEmptyInterviewState();
  state = setQueuePinned(state, 'be-1', true);
  const queue = {
    date: '2026-07-20', ids: ['be-1', 'be-2', 'be-3'], completedIds: ['be-2'], updatedAt: null,
  };
  assert.throws(() => replaceQueueQuestion(queue, 'be-1', INTERVIEW_QUESTIONS, state), RangeError);
  assert.throws(() => replaceQueueQuestion(queue, 'be-2', INTERVIEW_QUESTIONS, state), RangeError);
  assert.throws(() => replaceQueueQuestion(queue, 'be-999', INTERVIEW_QUESTIONS, state), RangeError);

  const replaced = replaceQueueQuestion(queue, 'be-3', INTERVIEW_QUESTIONS, state, new Date('2026-07-20T02:00:00Z'));
  assert.equal(replaced.ids[0], 'be-1');
  assert.equal(replaced.ids[1], 'be-2');
  assert.equal(replaced.ids[2] === 'be-3', false);
  assert.deepEqual(replaced.completedIds, ['be-2']);
  assert.equal(replaced.updatedAt, '2026-07-20T02:00:00.000Z');
  assert.deepEqual(queue.ids, ['be-1', 'be-2', 'be-3']);
});

test('직접 추가는 끝에 붙이거나 뒤쪽의 교체 가능 항목을 바꾸고 입력을 변경하지 않는다', () => {
  let state = createEmptyInterviewState();
  state = setQueuePinned(state, 'be-5', true);
  const partial = { date: '2026-07-20', ids: ['be-1'], completedIds: ['be-1'], updatedAt: null };
  const appended = addQuestionToQueue(partial, 'be-2', INTERVIEW_QUESTIONS, state, new Date('2026-07-20T03:00:00Z'));
  assert.deepEqual(appended.ids, ['be-1', 'be-2']);
  assert.deepEqual(partial.ids, ['be-1']);

  const full = { date: '2026-07-20', ids: ['be-1', 'be-2', 'be-3', 'be-4', 'be-5'], completedIds: ['be-4'], updatedAt: null };
  const replaced = addQuestionToQueue(full, 'be-20', INTERVIEW_QUESTIONS, state, new Date('2026-07-20T04:00:00Z'));
  assert.deepEqual(replaced.ids, ['be-1', 'be-2', 'be-20', 'be-4', 'be-5']);
  assert.deepEqual(replaced.completedIds, ['be-4']);
  assert.equal(replaced.updatedAt, '2026-07-20T04:00:00.000Z');
  assert.equal(addQuestionToQueue(full, 'be-5', INTERVIEW_QUESTIONS, state), full);
  assert.throws(() => addQuestionToQueue(full, 'be-999', INTERVIEW_QUESTIONS, state), RangeError);
});

test('직접 추가는 다섯 항목이 모두 고정 또는 완료이면 거부한다', () => {
  let state = createEmptyInterviewState();
  for (let number = 1; number <= 3; number += 1) state = setQueuePinned(state, `be-${number}`, true);
  const queue = {
    date: '2026-07-20', ids: ['be-1', 'be-2', 'be-3', 'be-4', 'be-5'], completedIds: ['be-4', 'be-5'], updatedAt: null,
  };
  assert.throws(() => addQuestionToQueue(queue, 'be-20', INTERVIEW_QUESTIONS, state), RangeError);
});

test('완료와 완료 취소는 큐 순서를 유지하고 입력을 변경하지 않는다', () => {
  const queue = { date: '2026-07-20', ids: ['be-1', 'be-2'], completedIds: [], updatedAt: null };
  const completed = setQueueCompleted(queue, 'be-2', true, new Date('2026-07-20T05:00:00Z'));
  assert.deepEqual(completed.ids, queue.ids);
  assert.notEqual(completed.ids, queue.ids);
  assert.deepEqual(completed.completedIds, ['be-2']);
  assert.equal(completed.updatedAt, '2026-07-20T05:00:00.000Z');
  assert.deepEqual(queue.completedIds, []);
  const canceled = setQueueCompleted(completed, 'be-2', false, new Date('2026-07-20T06:00:00Z'));
  assert.deepEqual(canceled.ids, ['be-1', 'be-2']);
  assert.deepEqual(canceled.completedIds, []);
  assert.throws(() => setQueueCompleted(queue, 'be-999', true), RangeError);
});
