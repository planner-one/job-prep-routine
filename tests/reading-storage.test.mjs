import test from 'node:test';
import assert from 'node:assert/strict';
import {
  READING_STATE_KEY,
  readingPlanKey,
} from '../src/reading-core.js';
import {
  loadReadingPlan,
  loadReadingState,
  saveReadingPlan,
  saveReadingState,
} from '../src/reading-storage.js';

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

test('손상된 상태 JSON은 목표 없는 기본값으로 복구하고 읽기만으로 저장하지 않는다', () => {
  const storage = memoryStorage({ [READING_STATE_KEY]: '{broken' });
  assert.deepEqual(loadReadingState(storage, new Set(['be-1'])), {
    version: 1,
    items: {},
    filters: { query: '', category: 'all', progress: 'all' },
  });
  assert.equal(storage.writes(), 0);
});

test('미생성·손상 plan은 null이고 저장된 빈 plan은 구분해 복원하며 모두 쓰지 않는다', () => {
  const missingDate = '2026-07-20';
  const brokenDate = '2026-07-21';
  const emptyDate = '2026-07-22';
  const storage = memoryStorage({
    [readingPlanKey(brokenDate)]: '{broken',
    [readingPlanKey(emptyDate)]: JSON.stringify({
      date: emptyDate, ids: [], completedIds: [], updatedAt: 'user-cleared',
    }),
  });

  assert.equal(loadReadingPlan(storage, missingDate, new Set(['be-1'])), null);
  assert.equal(loadReadingPlan(storage, brokenDate, new Set(['be-1'])), null);
  assert.deepEqual(loadReadingPlan(storage, emptyDate, new Set(['be-1'])), {
    date: emptyDate, ids: [], completedIds: [], updatedAt: 'user-cleared',
  });
  assert.equal(storage.writes(), 0);
});

test('load/save는 validIds만 보존하고 legacy 목표·면접·루틴 namespace를 건드리지 않는다', () => {
  const interviewKey = 'job-prep-routine:interview:state';
  const routineKey = 'job-prep-routine:daily:2026-07-21';
  const storage = memoryStorage({
    [interviewKey]: '{"answer":"보존"}',
    [routineKey]: '{"checkedIds":["x"]}',
    [READING_STATE_KEY]: JSON.stringify({
      version: 1,
      dailyGoal: 2,
      items: {
        'be-1': { readAt: 'read', lastOpenedAt: 'open', favorite: true },
        bad: { readAt: 'read' },
      },
      filters: { query: '검색', category: 'spring', progress: 'read' },
    }),
  });

  const loaded = loadReadingState(storage, new Set(['be-1', 'be-2']));
  loaded.items['be-2'] = { readAt: null, lastOpenedAt: 'new', favorite: false };
  const saved = saveReadingState(storage, loaded, new Set(['be-1', 'be-2']));
  const snapshot = storage.snapshot();

  assert.deepEqual(Object.keys(saved.items), ['be-1', 'be-2']);
  assert.equal(Object.hasOwn(saved, 'dailyGoal'), false);
  assert.equal(saved.items['be-1'].favorite, true);
  assert.equal(snapshot[interviewKey], '{"answer":"보존"}');
  assert.equal(snapshot[routineKey], '{"checkedIds":["x"]}');
});

test('날짜 plan은 잘못된 ID·중복·legacy 목표를 제거하고 전체 유효 목록을 저장한다', () => {
  const date = '2026-07-21';
  const validIds = new Set(['be-1', 'be-2', 'be-3', 'be-4', 'be-5']);
  const storage = memoryStorage({
    [readingPlanKey(date)]: JSON.stringify({
      date,
      goal: 2,
      ids: ['be-1', 'bad', 'be-1', 'be-2', 'be-3', 'be-4', 'be-5'],
      completedIds: ['bad', 'be-2', 'be-5', 'be-2'],
      updatedAt: 'saved',
    }),
  });

  const loaded = loadReadingPlan(storage, date, validIds);
  assert.deepEqual(loaded, {
    date,
    ids: ['be-1', 'be-2', 'be-3', 'be-4', 'be-5'],
    completedIds: ['be-2', 'be-5'],
    updatedAt: 'saved',
  });
  assert.equal(storage.writes(), 0);
  assert.deepEqual(saveReadingPlan(storage, loaded, date, validIds), loaded);
  assert.deepEqual(JSON.parse(storage.snapshot()[readingPlanKey(date)]), loaded);
});

test('저장소 쓰기 오류는 호출자가 처리할 수 있도록 다시 던진다', () => {
  const storage = { getItem: () => null, setItem: () => { throw new Error('quota'); } };
  assert.throws(() => saveReadingState(storage, {}, new Set()), /quota/);
  assert.throws(() => saveReadingPlan(storage, {}, '2026-07-21', new Set()), /quota/);
});
