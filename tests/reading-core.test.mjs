import test from 'node:test';
import assert from 'node:assert/strict';
import * as readingCore from '../src/reading-core.js';
import {
  READING_PROGRESS_FILTERS,
  READING_STARTER_COUNT,
  READING_STATE_KEY,
  READING_STATE_VERSION,
  READING_STORAGE_NAMESPACE,
  addItemToReadingPlan,
  buildReadingStats,
  createEmptyReadingItem,
  createEmptyReadingState,
  ensureDailyReadingPlan,
  filterReadingQuestions,
  markReadingItemOpened,
  markReadingItemRead,
  normalizeReadingPlan,
  normalizeReadingState,
  readingPlanKey,
  removeItemFromReadingPlan,
  replaceReadingPlanItem,
  setReadingCompleted,
  setReadingFilters,
  updateReadingItem,
} from '../src/reading-core.js';

const QUESTIONS = [
  { id: 'be-30', number: 30, order: 1, title: '서른 번째 질문', categoryId: 'java' },
  { id: 'be-2', number: 2, order: 2, title: '두 번째 질문', categoryId: 'spring' },
  { id: 'be-10', number: 10, order: 3, title: '열 번째 질문', categoryId: 'spring' },
  { id: 'be-1', number: 1, order: 4, title: '첫 번째 질문', categoryId: 'java' },
  { id: 'be-40', number: 40, order: 5, title: '마흔 번째 질문', categoryId: 'java' },
  { id: 'be-50', number: 50, order: 6, title: '쉰 번째 질문', categoryId: 'spring' },
];
const VALID_IDS = new Set(QUESTIONS.map(({ id }) => id));

test('읽기 데이터는 목표가 아닌 최초 추천 3개와 분리된 namespace 계약을 제공한다', () => {
  assert.equal(READING_STATE_VERSION, 1);
  assert.equal(READING_STORAGE_NAMESPACE, 'job-prep-routine:maeil-reader:v1');
  assert.equal(READING_STATE_KEY, 'job-prep-routine:maeil-reader:v1:state');
  assert.equal(readingPlanKey('2026-07-21'), 'job-prep-routine:maeil-reader:v1:plan:2026-07-21');
  assert.equal(READING_STARTER_COUNT, 3);
  assert.equal(Object.hasOwn(readingCore, 'setDailyGoal'), false);
  assert.equal(Object.hasOwn(readingCore, 'normalizeDailyGoal'), false);
  assert.deepEqual(READING_PROGRESS_FILTERS, ['all', 'unread', 'read']);
  assert.deepEqual(createEmptyReadingItem(), { readAt: null, lastOpenedAt: null, favorite: false });
  assert.deepEqual(createEmptyReadingState(), {
    version: 1,
    items: {},
    filters: { query: '', category: 'all', progress: 'all' },
  });
});

test('상태 정규화는 legacy 목표와 면접 필드를 제거하고 유효한 읽기 상태만 보존한다', () => {
  const candidate = {
    version: 999,
    dailyGoal: 2,
    items: {
      'be-1': { readAt: 'read', lastOpenedAt: 10, favorite: true, interviewAnswer: '섞이면 안 됨' },
      unknown: { readAt: 'read' },
    },
    filters: { query: 1, category: null, progress: 'done' },
    questions: { 'be-1': { answer: '면접 상태' } },
  };
  const snapshot = structuredClone(candidate);

  assert.deepEqual(normalizeReadingState(candidate, new Set(['be-1'])), {
    version: 1,
    items: { 'be-1': { readAt: 'read', lastOpenedAt: null, favorite: true } },
    filters: { query: '', category: 'all', progress: 'all' },
  });
  assert.deepEqual(candidate, snapshot);
});

test('항목 갱신·읽음 취소·상세 열기는 다른 읽기 상태를 잃지 않고 불변 갱신한다', () => {
  const first = updateReadingItem(createEmptyReadingState(), 'be-1', {
    favorite: true,
    readAt: '2026-07-20T00:00:00.000Z',
  });
  const untouched = first.items['be-1'];
  const opened = markReadingItemOpened(first, 'be-2', new Date('2026-07-21T00:00:00Z'));
  const read = markReadingItemRead(opened, 'be-2', true, new Date('2026-07-21T01:00:00Z'));
  const unread = markReadingItemRead(read, 'be-2', false, new Date('2026-07-21T02:00:00Z'));

  assert.equal(opened.items['be-1'], untouched);
  assert.equal(opened.items['be-2'].lastOpenedAt, '2026-07-21T00:00:00.000Z');
  assert.equal(read.items['be-2'].readAt, '2026-07-21T01:00:00.000Z');
  assert.equal(unread.items['be-2'].readAt, null);
  assert.equal(unread.items['be-2'].lastOpenedAt, '2026-07-21T00:00:00.000Z');
  assert.equal(first.items['be-2'], undefined);
});

test('필터와 읽음 통계는 검색·카테고리·진행 상태를 문항 번호순으로 계산한다', () => {
  const state = markReadingItemRead(createEmptyReadingState(), 'be-10', true);
  const selected = setReadingFilters(state, { query: '  열 번째  ', category: 'spring', progress: 'read' });
  const snapshot = structuredClone(QUESTIONS);

  assert.deepEqual(filterReadingQuestions(QUESTIONS, selected).map(({ id }) => id), ['be-10']);
  assert.deepEqual(filterReadingQuestions(QUESTIONS, state, { progress: 'unread' }).map(({ id }) => id), [
    'be-1', 'be-2', 'be-30', 'be-40', 'be-50',
  ]);
  assert.deepEqual(buildReadingStats(QUESTIONS, state), {
    total: 6, unread: 5, read: 1, favorites: 0,
  });
  assert.deepEqual(QUESTIONS, snapshot);
});

test('plan 정규화는 목표 필드를 제거하고 유효한 ID를 개수 제한 없이 보존한다', () => {
  const saved = {
    date: '2026-07-21',
    goal: 2,
    ids: ['be-30', 'be-30', 'bad', 'be-2', 'be-10', 'be-1', 'be-40', 'be-50'],
    completedIds: ['be-30', 'bad', 'be-50', 'be-30'],
    updatedAt: 'saved',
  };
  const snapshot = structuredClone(saved);

  assert.deepEqual(normalizeReadingPlan(saved, '2026-07-21', VALID_IDS), {
    date: '2026-07-21',
    ids: ['be-30', 'be-2', 'be-10', 'be-1', 'be-40', 'be-50'],
    completedIds: ['be-30', 'be-50'],
    updatedAt: 'saved',
  });
  assert.deepEqual(saved, snapshot);
  assert.deepEqual(normalizeReadingPlan(saved, '2026-07-22', VALID_IDS), {
    date: '2026-07-22', ids: [], completedIds: [], updatedAt: null,
  });
});

test('최초 생성과 새 날짜에만 읽지 않은 문항 번호순으로 3개를 추천한다', () => {
  let state = createEmptyReadingState();
  state = markReadingItemRead(state, 'be-1', true);
  state = markReadingItemRead(state, 'be-2', true);

  const created = ensureDailyReadingPlan(QUESTIONS, state, null, '2026-07-21', new Date('2026-07-21T00:00:00Z'));
  assert.deepEqual(created, {
    date: '2026-07-21',
    ids: ['be-10', 'be-30', 'be-40'],
    completedIds: [],
    updatedAt: '2026-07-21T00:00:00.000Z',
  });

  const nextDate = ensureDailyReadingPlan(QUESTIONS, state, created, '2026-07-22', new Date('2026-07-22T00:00:00Z'));
  assert.deepEqual(nextDate.ids, ['be-10', 'be-30', 'be-40']);
  assert.equal(nextDate.date, '2026-07-22');
});

test('같은 날짜에 사용자가 줄이거나 늘리거나 모두 지운 목록은 다시 채우지 않는다', () => {
  const cases = [
    { ids: [], completedIds: [] },
    { ids: ['be-30'], completedIds: [] },
    { ids: ['be-30', 'be-1', 'be-2', 'be-10', 'be-40'], completedIds: ['be-1'] },
  ];

  for (const [index, value] of cases.entries()) {
    const plan = { date: '2026-07-21', ...value, updatedAt: `saved-${index}` };
    const ensured = ensureDailyReadingPlan(QUESTIONS, createEmptyReadingState(), plan, '2026-07-21');
    assert.deepEqual(ensured, plan);
  }
});

test('직접 추가는 최초 추천 수와 완료 여부에 관계없이 중복 없이 끝에 계속 붙인다', () => {
  const plan = {
    date: '2026-07-21',
    ids: ['be-1', 'be-2', 'be-10'],
    completedIds: ['be-1', 'be-2', 'be-10'],
    updatedAt: null,
  };
  const snapshot = structuredClone(plan);
  const fourth = addItemToReadingPlan(plan, 'be-30', QUESTIONS, new Date('2026-07-21T01:00:00Z'));
  const fifth = addItemToReadingPlan(fourth, 'be-40', QUESTIONS, new Date('2026-07-21T02:00:00Z'));

  assert.deepEqual(fifth.ids, ['be-1', 'be-2', 'be-10', 'be-30', 'be-40']);
  assert.deepEqual(fifth.completedIds, ['be-1', 'be-2', 'be-10']);
  assert.equal(addItemToReadingPlan(fifth, 'be-30', QUESTIONS), fifth);
  assert.deepEqual(plan, snapshot);
});

test('목록 제거는 같은 항목의 완료 기록도 제거하고 입력 plan은 보존한다', () => {
  const plan = {
    date: '2026-07-21',
    ids: ['be-1', 'be-2', 'be-10', 'be-30'],
    completedIds: ['be-2', 'be-30'],
    updatedAt: 'saved',
  };
  const snapshot = structuredClone(plan);
  const removed = removeItemFromReadingPlan(plan, 'be-2', new Date('2026-07-21T03:00:00Z'));

  assert.deepEqual(removed.ids, ['be-1', 'be-10', 'be-30']);
  assert.deepEqual(removed.completedIds, ['be-30']);
  assert.equal(removed.updatedAt, '2026-07-21T03:00:00.000Z');
  assert.deepEqual(plan, snapshot);
  assert.throws(() => removeItemFromReadingPlan(plan, 'bad'), RangeError);
});

test('추천 교체와 오늘 완료·취소는 전역 읽음 상태와 입력 plan을 변경하지 않는다', () => {
  const state = markReadingItemRead(createEmptyReadingState(), 'be-30', true);
  const stateSnapshot = structuredClone(state);
  const plan = {
    date: '2026-07-21', ids: ['be-30', 'be-2'], completedIds: [], updatedAt: null,
  };
  const planSnapshot = structuredClone(plan);
  const replaced = replaceReadingPlanItem(plan, 'be-30', QUESTIONS, state, new Date('2026-07-21T04:00:00Z'));
  const completed = setReadingCompleted(replaced, replaced.ids[0], true, new Date('2026-07-21T05:00:00Z'));
  const canceled = setReadingCompleted(completed, replaced.ids[0], false, new Date('2026-07-21T06:00:00Z'));

  assert.deepEqual(replaced.ids, ['be-1', 'be-2']);
  assert.deepEqual(completed.completedIds, ['be-1']);
  assert.deepEqual(canceled.completedIds, []);
  assert.deepEqual(plan, planSnapshot);
  assert.deepEqual(state, stateSnapshot);
  assert.throws(() => replaceReadingPlanItem({ ...plan, completedIds: ['be-30'] }, 'be-30', QUESTIONS, state), RangeError);
});
