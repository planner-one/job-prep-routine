import test from 'node:test';
import assert from 'node:assert/strict';
import { INTERVIEW_QUESTIONS } from '../src/interview-data.js';
import { INTERVIEW_STATE_KEY, interviewQueueKey } from '../src/interview-core.js';
import * as interviewStorage from '../src/interview-storage.js';
import {
  loadInterviewQueue,
  loadInterviewState,
  saveInterviewQueue,
  saveInterviewState,
} from '../src/interview-storage.js';

function memoryStorage(entries = {}) {
  const values = new Map(Object.entries(entries));
  let writes = 0;
  return {
    getItem: (key) => values.get(key) ?? null,
    setItem(key, value) {
      writes += 1;
      values.set(key, value);
    },
    snapshot: () => Object.fromEntries(values),
    writes: () => writes,
  };
}

test('손상 JSON은 페이지를 중단시키지 않고 기본 상태로 복구한다', () => {
  const storage = memoryStorage({ [INTERVIEW_STATE_KEY]: '{broken' });
  assert.deepEqual(loadInterviewState(storage, new Set(['be-1'])), {
    version: 1,
    questions: {},
    filters: { query: '', categoryId: 'all', status: 'all', favoritesOnly: false },
  });
});

test('면접 질문 저장은 기존 루틴 키와 다른 질문을 보존한다', () => {
  const storage = memoryStorage({
    'job-prep-routine:daily:2026-07-20': '{"checkedIds":["x"]}',
    [INTERVIEW_STATE_KEY]: JSON.stringify({ version: 1, questions: { 'be-2': { answer: '보존' } } }),
  });
  const state = loadInterviewState(storage, new Set(['be-1', 'be-2']));
  state.questions['be-1'] = { status: 'studying', answer: '새 답변' };
  saveInterviewState(storage, state, new Set(['be-1', 'be-2']));
  const snapshot = storage.snapshot();
  assert.equal(snapshot['job-prep-routine:daily:2026-07-20'], '{"checkedIds":["x"]}');
  assert.equal(JSON.parse(snapshot[INTERVIEW_STATE_KEY]).questions['be-2'].answer, '보존');
});

test('날짜별 큐는 해당 키만 읽고 정규화해 저장한다', () => {
  const date = '2026-07-20';
  const storage = memoryStorage({
    [interviewQueueKey(date)]: JSON.stringify({ date, ids: ['be-1', 'be-1', 'bad'], completedIds: ['bad'] }),
  });
  const queue = loadInterviewQueue(storage, date, new Set(['be-1']));
  assert.deepEqual(queue.ids, ['be-1']);
  assert.deepEqual(queue.completedIds, []);
  saveInterviewQueue(storage, queue, date, new Set(['be-1']));
  assert.equal(JSON.parse(storage.snapshot()[interviewQueueKey(date)]).date, date);
});

test('저장소 오류는 호출자가 표시할 수 있도록 다시 던진다', () => {
  const storage = { getItem: () => null, setItem: () => { throw new Error('quota'); } };
  assert.throws(() => saveInterviewState(storage, { version: 1, questions: {} }, new Set()), /quota/);
});

test('공용 일일 큐 bootstrap은 저장값이 없을 때 한 번만 5문항을 만들고 같은 날짜에 재사용한다', () => {
  assert.equal(typeof interviewStorage.loadOrCreateDailyQueue, 'function');
  const storage = memoryStorage();
  const validIds = new Set(INTERVIEW_QUESTIONS.map(({ id }) => id));
  const state = loadInterviewState(storage, validIds);
  const date = '2026-07-20';
  const now = new Date('2026-07-20T10:30:00+09:00');

  const created = interviewStorage.loadOrCreateDailyQueue(
    storage,
    INTERVIEW_QUESTIONS,
    state,
    date,
    validIds,
    now,
  );
  const reloaded = interviewStorage.loadOrCreateDailyQueue(
    storage,
    INTERVIEW_QUESTIONS,
    state,
    date,
    validIds,
    new Date('2026-07-20T11:30:00+09:00'),
  );

  assert.equal(created.ids.length, 5);
  assert.deepEqual(reloaded, created);
  assert.deepEqual(JSON.parse(storage.snapshot()[interviewQueueKey(date)]), created);
  assert.equal(storage.writes(), 1);
});

test('공용 일일 큐 bootstrap은 invalid ID로 손상된 저장 큐를 5문항으로 다시 만든다', () => {
  const date = '2026-07-20';
  const key = interviewQueueKey(date);
  const storage = memoryStorage({
    [key]: JSON.stringify({
      date,
      ids: ['be-999'],
      completedIds: ['be-999'],
      updatedAt: 'saved',
    }),
  });
  const validIds = new Set(INTERVIEW_QUESTIONS.map(({ id }) => id));
  const state = loadInterviewState(storage, validIds);

  const recovered = interviewStorage.loadOrCreateDailyQueue(
    storage,
    INTERVIEW_QUESTIONS,
    state,
    date,
    validIds,
    new Date('2026-07-20T10:30:00+09:00'),
  );

  assert.equal(recovered.ids.length, 5);
  assert.deepEqual(JSON.parse(storage.snapshot()[key]), recovered);
  assert.equal(storage.writes(), 1);
});

test('공용 일일 큐 bootstrap은 유효 ID와 invalid ID가 섞인 저장 큐의 유효 항목과 완료를 보존한다', () => {
  const date = '2026-07-20';
  const key = interviewQueueKey(date);
  const storage = memoryStorage({
    [key]: JSON.stringify({
      date,
      ids: ['be-1', 'be-999', 'be-2', 'be-1'],
      completedIds: ['be-1', 'be-999', 'be-2', 'be-1'],
      updatedAt: 'saved',
    }),
  });
  const validIds = new Set(INTERVIEW_QUESTIONS.map(({ id }) => id));
  const state = loadInterviewState(storage, validIds);

  const recovered = interviewStorage.loadOrCreateDailyQueue(
    storage,
    INTERVIEW_QUESTIONS,
    state,
    date,
    validIds,
    new Date('2026-07-20T10:30:00+09:00'),
  );

  assert.deepEqual(recovered, {
    date,
    ids: ['be-1', 'be-2'],
    completedIds: ['be-1', 'be-2'],
    updatedAt: 'saved',
  });
  assert.deepEqual(JSON.parse(storage.snapshot()[key]), recovered);
  assert.equal(storage.writes(), 1);
});
