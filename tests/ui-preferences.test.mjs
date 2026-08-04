import test from 'node:test';
import assert from 'node:assert/strict';
import {
  DEFAULT_UI_PREFERENCES,
  UI_PREFERENCES_STORAGE_KEY,
  loadUiPreferences,
  normalizeUiPreferences,
  saveUiPreferences,
} from '../src/ui-preferences.js';

function memoryStorage(initial = {}) {
  const values = new Map(Object.entries(initial));
  return {
    getItem(key) {
      return values.has(key) ? values.get(key) : null;
    },
    setItem(key, value) {
      values.set(key, value);
    },
  };
}

test('UI 선호값은 허용된 로드맵·데일리·기록 값만 복원한다', () => {
  assert.deepEqual(normalizeUiPreferences({
    roadmap: { category: 'running', runStart: '22' },
    daily: { categoryFilter: 'career' },
    history: { period: 30 },
  }), {
    version: 1,
    roadmap: { category: 'running', runStart: '22' },
    daily: { categoryFilter: 'career' },
    history: { period: 30 },
  });

  assert.deepEqual(normalizeUiPreferences({
    roadmap: { category: 'unknown', runStart: '25' },
    daily: { categoryFilter: 'unknown' },
    history: { period: 14 },
  }), DEFAULT_UI_PREFERENCES);
});

test('화면별 부분 저장은 다른 화면 선호값을 유지한다', () => {
  const storage = memoryStorage();
  saveUiPreferences(storage, { roadmap: { category: 'maintenance' } });
  saveUiPreferences(storage, { history: { period: 30 } });

  assert.deepEqual(loadUiPreferences(storage), {
    version: 1,
    roadmap: { category: 'maintenance', runStart: '21' },
    daily: { categoryFilter: 'all' },
    history: { period: 30 },
  });
});

test('손상된 값이나 사용할 수 없는 저장소에서도 기본값으로 계속 동작한다', () => {
  const brokenJson = memoryStorage({ [UI_PREFERENCES_STORAGE_KEY]: '{' });
  assert.deepEqual(loadUiPreferences(brokenJson), DEFAULT_UI_PREFERENCES);

  const blockedStorage = {
    getItem() { throw new Error('blocked'); },
    setItem() { throw new Error('blocked'); },
  };
  assert.deepEqual(loadUiPreferences(blockedStorage), DEFAULT_UI_PREFERENCES);
  assert.deepEqual(
    saveUiPreferences(blockedStorage, { daily: { categoryFilter: 'meal' } }),
    {
      version: 1,
      roadmap: { category: 'workout', runStart: '21' },
      daily: { categoryFilter: 'meal' },
      history: { period: 7 },
    },
  );
});
