export const UI_PREFERENCES_STORAGE_KEY = 'job-prep-routine:preferences.v1';

const ROADMAP_CATEGORIES = new Set(['workout', 'normal', 'running', 'maintenance']);
const DAILY_CATEGORY_FILTERS = new Set(['all', 'exercise', 'career', 'meal']);

export const DEFAULT_UI_PREFERENCES = Object.freeze({
  version: 1,
  roadmap: Object.freeze({ category: 'workout', runStart: '21' }),
  daily: Object.freeze({ categoryFilter: 'all' }),
  history: Object.freeze({ period: 7 }),
});

function objectValue(value) {
  return value && typeof value === 'object' && !Array.isArray(value) ? value : {};
}

export function normalizeUiPreferences(candidate = {}) {
  const source = objectValue(candidate);
  const roadmap = objectValue(source.roadmap);
  const daily = objectValue(source.daily);
  const history = objectValue(source.history);

  return {
    version: 1,
    roadmap: {
      category: ROADMAP_CATEGORIES.has(roadmap.category)
        ? roadmap.category
        : DEFAULT_UI_PREFERENCES.roadmap.category,
      runStart: roadmap.runStart === '22' ? '22' : '21',
    },
    daily: {
      categoryFilter: DAILY_CATEGORY_FILTERS.has(daily.categoryFilter)
        ? daily.categoryFilter
        : DEFAULT_UI_PREFERENCES.daily.categoryFilter,
    },
    history: {
      period: Number(history.period) === 30 ? 30 : 7,
    },
  };
}

export function loadUiPreferences(storage) {
  try {
    const raw = storage?.getItem?.(UI_PREFERENCES_STORAGE_KEY);
    return normalizeUiPreferences(raw ? JSON.parse(raw) : {});
  } catch {
    return normalizeUiPreferences();
  }
}

export function saveUiPreferences(storage, patch = {}) {
  const current = loadUiPreferences(storage);
  const source = objectValue(patch);
  const next = normalizeUiPreferences({
    ...current,
    ...source,
    roadmap: { ...current.roadmap, ...objectValue(source.roadmap) },
    daily: { ...current.daily, ...objectValue(source.daily) },
    history: { ...current.history, ...objectValue(source.history) },
  });

  try {
    storage?.setItem?.(UI_PREFERENCES_STORAGE_KEY, JSON.stringify(next));
  } catch {
    // 저장 공간을 사용할 수 없어도 현재 화면 선택은 그대로 유지합니다.
  }
  return next;
}
