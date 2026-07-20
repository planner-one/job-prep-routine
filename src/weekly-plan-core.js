import { LEARNING_TOPICS, TASK_LIBRARY, getSchedule } from './routine-data.js';

export { TASK_LIBRARY } from './routine-data.js';

export const PLAN_SCHEMA_VERSION = 2;
export const WEEKDAYS = [
  { id: 'mon', label: '월요일' }, { id: 'tue', label: '화요일' },
  { id: 'wed', label: '수요일' }, { id: 'thu', label: '목요일' },
  { id: 'fri', label: '금요일' }, { id: 'sat', label: '토요일' },
  { id: 'sun', label: '일요일' },
];

const DEFAULT_MODES = { mon: 'workout', tue: 'normal', wed: 'running', thu: 'workout', fri: 'normal', sat: 'workout', sun: 'maintenance' };
const DAY_START = { workout: 340, normal: 420, running: 420, maintenance: 480 };
const ANCHORS = {
  workout: [[450, 530], [780, 840], [1130, 1190], [1380, 1440]],
  normal: [[430, 500], [780, 840], [1130, 1190], [1380, 1440]],
  'running-21': [[430, 500], [780, 840], [1130, 1190], [1380, 1440]],
  'running-22': [[430, 500], [780, 840], [1130, 1190], [1440, 1440]],
  maintenance: [[490, 540], [780, 840], [1080, 1140], [1380, 1380]],
};
const ANCHOR_IDS = ['breakfast', 'lunch', 'dinner', 'sleep'];
const ALLOWED_MODES = new Set(Object.keys(DAY_START));
const ALLOWED_CATEGORIES = new Set(['career', 'learning', 'exercise']);
const LIBRARY_BY_ID = new Map(TASK_LIBRARY.map((item) => [item.id, item]));

function isObject(value) {
  return value && typeof value === 'object' && !Array.isArray(value);
}

function copy(value) {
  if (Array.isArray(value)) return value.map(copy);
  if (isObject(value)) return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, copy(item)]));
  return value;
}

function validMode(mode, fallback = 'normal') {
  return ALLOWED_MODES.has(mode) ? mode : fallback;
}

function validRunStart(value) {
  return value === '22' ? '22' : '21';
}

function validMinute(value) {
  return Number.isInteger(value) && value >= 0 && value <= 1440;
}

function emptyLegacyCompletion() {
  return { applications: [], tasks: {}, learningTopics: [], maintenance: {} };
}

function cloneItem(item) {
  return { ...item };
}

function cloneDay(day) {
  return {
    ...day,
    items: Array.isArray(day?.items) ? day.items.map(cloneItem) : [],
    unscheduled: Array.isArray(day?.unscheduled) ? day.unscheduled.map(cloneItem) : [],
    timelineOrder: Array.isArray(day?.timelineOrder) ? [...day.timelineOrder] : [],
    legacyCompletion: copy(day?.legacyCompletion ?? emptyLegacyCompletion()),
  };
}

function itemIdForSchedule(scheduleId) {
  if (LIBRARY_BY_ID.has(scheduleId)) return scheduleId;
  if (/portfolio/.test(scheduleId)) return 'portfolio-review';
  if (/interview/.test(scheduleId)) return 'interview-practice';
  if (/application/.test(scheduleId)) return 'job-analysis';
  if (/-shower$/.test(scheduleId)) return 'shower';
  if (/-wrap$/.test(scheduleId)) return 'wrap';
  return null;
}

function anchorIdForSchedule(item) {
  if (/sleep/.test(item.id)) return 'sleep';
  if (item.category !== 'meal') return null;
  if (item.time.startsWith('13:00')) return 'lunch';
  if (item.time.startsWith('18:') || item.time.startsWith('19:')) return 'dinner';
  return 'breakfast';
}

function defaultPlanItems(mode, runStart) {
  const seen = new Set();
  const items = [];
  const timelineOrder = [];
  for (const scheduleItem of getSchedule(mode, runStart)) {
    const anchorId = anchorIdForSchedule(scheduleItem);
    if (anchorId) {
      timelineOrder.push(anchorId);
      continue;
    }
    const id = itemIdForSchedule(scheduleItem.id);
    if (!id || seen.has(id)) continue;
    const libraryItem = LIBRARY_BY_ID.get(id);
    if (!libraryItem) continue;
    seen.add(id);
    items.push({
      ...libraryItem,
      source: 'default',
      modeDependent: ['workout', 'run', 'shower'].includes(id),
    });
    timelineOrder.push(id);
  }
  for (const anchorId of ANCHOR_IDS) {
    if (!timelineOrder.includes(anchorId)) timelineOrder.push(anchorId);
  }
  return { items, timelineOrder };
}

export function getFixedAnchors(mode, runStart = '21') {
  const key = mode === 'running' ? `running-${validRunStart(runStart)}` : validMode(mode);
  return ANCHORS[key].map(([startMinute, endMinute], index) => ({
    id: ANCHOR_IDS[index],
    label: ['아침·식후 20분', '점심·식후 20분', '저녁·식후 20분', '취침'][index],
    category: index === 3 ? 'exercise' : 'meal',
    fixed: true,
    startMinute,
    endMinute,
  }));
}

function reflow(day) {
  const next = cloneDay(day);
  const anchors = getFixedAnchors(next.mode, next.runStart);
  const byId = new Map([...next.items, ...next.unscheduled].map((item) => [item.id, cloneItem(item)]));
  const scheduled = [];
  const unscheduled = [];
  let cursor = DAY_START[next.mode];
  for (const token of next.timelineOrder) {
    const anchor = anchors.find(({ id }) => id === token);
    if (anchor) {
      cursor = anchor.endMinute;
      continue;
    }
    const item = byId.get(token);
    if (!item) continue;
    const nextAnchor = anchors.find(({ startMinute }) => startMinute >= cursor);
    const boundary = nextAnchor?.startMinute ?? anchors.at(-1).startMinute;
    if (cursor + item.durationMinutes > boundary) {
      unscheduled.push({ ...item, reason: 'insufficient-time' });
      continue;
    }
    scheduled.push({ ...item, startMinute: cursor, endMinute: cursor + item.durationMinutes });
    cursor += item.durationMinutes;
  }
  return { ...next, items: scheduled, unscheduled };
}

function createDefaultDay(dayId, mode = DEFAULT_MODES[dayId] ?? 'normal', runStart = '21') {
  const selectedMode = validMode(mode, DEFAULT_MODES[dayId] ?? 'normal');
  const selectedRunStart = validRunStart(runStart);
  const plan = defaultPlanItems(selectedMode, selectedRunStart);
  return reflow({
    mode: selectedMode,
    runStart: selectedRunStart,
    items: plan.items,
    unscheduled: [],
    timelineOrder: plan.timelineOrder,
    revision: 0,
    legacyCompletion: emptyLegacyCompletion(),
  });
}

export function createDefaultWeeklyState() {
  return {
    schemaVersion: PLAN_SCHEMA_VERSION,
    selectedDay: 'mon',
    maintenanceDay: 'sun',
    days: Object.fromEntries(WEEKDAYS.map(({ id }) => [id, createDefaultDay(id)])),
  };
}

function normalizeItem(candidate) {
  if (!isObject(candidate) || typeof candidate.id !== 'string' || !candidate.id.trim()) return null;
  if (typeof candidate.label !== 'string' || !candidate.label.trim()) return null;
  if (!ALLOWED_CATEGORIES.has(candidate.category)) return null;
  if (!Number.isInteger(candidate.durationMinutes) || candidate.durationMinutes <= 0 || candidate.durationMinutes > 1440) return null;
  const item = {
    id: candidate.id,
    label: candidate.label,
    category: candidate.category,
    durationMinutes: candidate.durationMinutes,
  };
  if (typeof candidate.source === 'string') item.source = candidate.source;
  if (candidate.modeDependent === true) item.modeDependent = true;
  if (validMinute(candidate.startMinute) && validMinute(candidate.endMinute) && candidate.endMinute > candidate.startMinute) {
    item.startMinute = candidate.startMinute;
    item.endMinute = candidate.endMinute;
  }
  if (candidate.reason === 'insufficient-time') item.reason = candidate.reason;
  return item;
}

function normalizeV2Day(candidate, dayId) {
  const source = isObject(candidate) ? candidate : {};
  const fallback = createDefaultDay(dayId);
  const mode = validMode(source.mode, fallback.mode);
  const runStart = validRunStart(source.runStart);
  const sourceItems = [...(Array.isArray(source.items) ? source.items : []), ...(Array.isArray(source.unscheduled) ? source.unscheduled : [])]
    .map(normalizeItem)
    .filter(Boolean);
  const byId = new Map(sourceItems.map((item) => [item.id, item]));
  if (byId.size === 0) return { ...createDefaultDay(dayId, mode, runStart), legacyCompletion: copy(source.legacyCompletion ?? emptyLegacyCompletion()) };
  const anchors = new Set(ANCHOR_IDS);
  const requestedOrder = Array.isArray(source.timelineOrder) ? source.timelineOrder : [];
  const timelineOrder = requestedOrder.filter((id, index) => typeof id === 'string' && (anchors.has(id) || byId.has(id)) && requestedOrder.indexOf(id) === index);
  for (const anchorId of ANCHOR_IDS) if (!timelineOrder.includes(anchorId)) timelineOrder.push(anchorId);
  for (const id of byId.keys()) if (!timelineOrder.includes(id)) timelineOrder.splice(Math.max(timelineOrder.indexOf('sleep'), 0), 0, id);
  const unscheduledIds = new Set((Array.isArray(source.unscheduled) ? source.unscheduled : []).map(({ id }) => id));
  return {
    mode,
    runStart,
    items: [...byId.values()].filter(({ id }) => !unscheduledIds.has(id)),
    unscheduled: [...byId.values()].filter(({ id }) => unscheduledIds.has(id)).map((item) => ({ ...item, reason: 'insufficient-time' })),
    timelineOrder,
    revision: Number.isInteger(source.revision) && source.revision >= 0 ? source.revision : 0,
    legacyCompletion: copy(source.legacyCompletion ?? emptyLegacyCompletion()),
  };
}

function legacyForDay(source) {
  return {
    applications: copy(Array.isArray(source.applications) ? source.applications : []),
    tasks: copy(isObject(source.tasks) ? source.tasks : {}),
    learningTopics: copy(Array.isArray(source.learningTopics) ? source.learningTopics : []),
    maintenance: copy(isObject(source.maintenance) ? source.maintenance : {}),
  };
}

export function normalizeWeeklyState(candidate = {}) {
  const source = isObject(candidate) ? candidate : {};
  const validDayIds = new Set(WEEKDAYS.map(({ id }) => id));
  const selectedDay = validDayIds.has(source.selectedDay) ? source.selectedDay : 'mon';
  const maintenanceDay = validDayIds.has(source.maintenanceDay) ? source.maintenanceDay : 'sun';
  const sourceDays = isObject(source.days) ? source.days : {};
  if (source.schemaVersion === PLAN_SCHEMA_VERSION) {
    return {
      schemaVersion: PLAN_SCHEMA_VERSION,
      selectedDay,
      maintenanceDay,
      days: Object.fromEntries(WEEKDAYS.map(({ id }) => [id, normalizeV2Day(sourceDays[id], id)])),
    };
  }
  return {
    schemaVersion: PLAN_SCHEMA_VERSION,
    selectedDay,
    maintenanceDay,
    days: Object.fromEntries(WEEKDAYS.map(({ id }) => {
      const legacy = isObject(sourceDays[id]) ? sourceDays[id] : {};
      const mode = id === maintenanceDay ? 'maintenance' : validMode(legacy.mode, DEFAULT_MODES[id] ?? 'normal');
      const day = createDefaultDay(id, mode, legacy.runStart);
      return [id, { ...day, legacyCompletion: legacyForDay(legacy) }];
    })),
  };
}

function localDateFrom(value) {
  if (value instanceof Date && !Number.isNaN(value.getTime())) return new Date(value.getFullYear(), value.getMonth(), value.getDate(), 12);
  if (typeof value === 'string') {
    const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
    if (match) {
      const [, year, month, day] = match.map(Number);
      const date = new Date(year, month - 1, day, 12);
      if (date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day) return date;
    }
  }
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate(), 12);
}

function localDateString(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

export function weekMondayKey(value = new Date()) {
  const date = localDateFrom(value);
  date.setDate(date.getDate() - ((date.getDay() + 6) % 7));
  return localDateString(date);
}

export function weekdayIdForDate(value = new Date()) {
  return WEEKDAYS[(localDateFrom(value).getDay() + 6) % 7].id;
}

function formatMinute(value) {
  const safeValue = value === 1440 ? 1440 : Math.max(0, Math.min(1439, value));
  return `${String(Math.floor(safeValue / 60)).padStart(2, '0')}:${String(safeValue % 60).padStart(2, '0')}`;
}

export function formatMinuteRange(startMinute, endMinute) {
  const start = formatMinute(startMinute);
  return startMinute === endMinute ? start : `${start}–${formatMinute(endMinute)}`;
}

export function getDayTimeline(day) {
  const next = cloneDay(day);
  const scheduled = next.items.map((item) => ({ ...item, fixed: false }));
  const unscheduled = next.unscheduled.map((item) => ({ ...item, fixed: false, unscheduled: true }));
  return [...scheduled, ...getFixedAnchors(next.mode, next.runStart), ...unscheduled]
    .sort((left, right) => (left.startMinute ?? 1441) - (right.startMinute ?? 1441));
}

function bumpRevision(day) {
  return { ...day, revision: (Number.isInteger(day.revision) ? day.revision : 0) + 1 };
}

export function movePlanItem(day, itemId, targetIndex) {
  const next = cloneDay(day);
  if (ANCHOR_IDS.includes(itemId) || !next.timelineOrder.includes(itemId)) return next;
  const order = next.timelineOrder.filter((id) => id !== itemId);
  const index = Math.max(0, Math.min(Number.isInteger(targetIndex) ? targetIndex : order.length, order.length));
  order.splice(index, 0, itemId);
  return bumpRevision(reflow({ ...next, timelineOrder: order }));
}

function hasItemId(day, id) {
  return [...day.items, ...day.unscheduled].some((item) => item.id === id);
}

function addItem(day, item) {
  const next = cloneDay(day);
  const sleepIndex = next.timelineOrder.indexOf('sleep');
  const timelineOrder = [...next.timelineOrder];
  timelineOrder.splice(sleepIndex < 0 ? timelineOrder.length : sleepIndex, 0, item.id);
  return bumpRevision(reflow({ ...next, items: [...next.items, item], timelineOrder }));
}

export function addLibraryPlanItem(day, taskId, options = {}) {
  const next = cloneDay(day);
  const topics = Array.isArray(options.topics) ? LEARNING_TOPICS.filter((topic) => options.topics.includes(topic)) : [];
  if (topics.length > 0) {
    const id = `learning:${topics.join('|')}`;
    if ([...next.items, ...next.unscheduled].some((item) => item.sourceTaskId === 'learning' || item.id === id)) throw new Error('이미 추가된 일정입니다.');
    return addItem(next, { id, label: topics.join(' · '), category: 'learning', durationMinutes: topics.length * 60, source: 'library', sourceTaskId: 'learning' });
  }
  const libraryItem = LIBRARY_BY_ID.get(taskId);
  if (!libraryItem) throw new Error('알 수 없는 기본 일정입니다.');
  if (hasItemId(next, taskId)) throw new Error('이미 추가된 일정입니다.');
  return addItem(next, { ...libraryItem, source: 'library', sourceTaskId: taskId });
}

export function addCustomPlanItem(day, input, idFactory) {
  const candidate = isObject(input) ? input : {};
  const label = typeof candidate.label === 'string' ? candidate.label.trim() : '';
  if (!label) throw new Error('일정 이름을 입력하세요.');
  if (!ALLOWED_CATEGORIES.has(candidate.category)) throw new Error('허용되지 않은 일정 분류입니다.');
  if (!Number.isInteger(candidate.durationMinutes) || candidate.durationMinutes < 10 || candidate.durationMinutes > 480) throw new Error('소요시간은 10분 이상 480분 이하여야 합니다.');
  if (typeof idFactory !== 'function') throw new Error('일정 ID 생성기가 필요합니다.');
  const id = idFactory();
  if (typeof id !== 'string' || !id.trim() || hasItemId(cloneDay(day), id)) throw new Error('유효한 일정 ID가 필요합니다.');
  return addItem(day, { id, label, category: candidate.category, durationMinutes: candidate.durationMinutes, source: 'custom' });
}

export function removePlanItem(day, itemId) {
  const next = cloneDay(day);
  if (ANCHOR_IDS.includes(itemId)) return next;
  if (!hasItemId(next, itemId)) return next;
  return bumpRevision({
    ...next,
    items: next.items.filter(({ id }) => id !== itemId),
    unscheduled: next.unscheduled.filter(({ id }) => id !== itemId),
    timelineOrder: next.timelineOrder.filter((id) => id !== itemId),
  });
}

function overlaps(startMinute, endMinute, other) {
  if (other.startMinute === other.endMinute) return startMinute <= other.startMinute && endMinute > other.startMinute;
  return startMinute < other.endMinute && endMinute > other.startMinute;
}

export function updatePlanItemTime(day, itemId, startMinute, endMinute) {
  const next = cloneDay(day);
  if (!validMinute(startMinute) || !validMinute(endMinute) || endMinute <= startMinute) throw new Error('시작과 종료 시각을 확인하세요.');
  const item = [...next.items, ...next.unscheduled].find(({ id }) => id === itemId);
  if (!item || ANCHOR_IDS.includes(itemId)) throw new Error('수정할 일반 일정을 찾을 수 없습니다.');
  const anchors = getFixedAnchors(next.mode, next.runStart);
  if (anchors.some((anchor) => overlaps(startMinute, endMinute, anchor))) throw new Error('고정 일정과 겹칩니다.');
  const others = [...next.items, ...next.unscheduled].filter(({ id }) => id !== itemId);
  if (others.some((other) => validMinute(other.startMinute) && validMinute(other.endMinute) && overlaps(startMinute, endMinute, other))) throw new Error('다른 일정과 겹칩니다.');
  const updated = { ...item, startMinute, endMinute, durationMinutes: endMinute - startMinute };
  return bumpRevision({
    ...next,
    items: [...next.items.filter(({ id }) => id !== itemId), updated].sort((left, right) => left.startMinute - right.startMinute),
    unscheduled: next.unscheduled.filter(({ id }) => id !== itemId),
  });
}

export function changeDayMode(day, mode, runStart = '21') {
  const next = cloneDay(day);
  const selectedMode = validMode(mode, next.mode);
  const selectedRunStart = validRunStart(runStart);
  if (next.mode === selectedMode && next.runStart === selectedRunStart) return next;
  const retained = [...next.items, ...next.unscheduled].filter((item) => !item.modeDependent);
  const target = defaultPlanItems(selectedMode, selectedRunStart);
  const modeItems = target.items.filter((item) => item.modeDependent && !retained.some(({ id }) => id === item.id));
  const itemIds = new Set([...retained, ...modeItems].map(({ id }) => id));
  const timelineOrder = target.timelineOrder.filter((id) => ANCHOR_IDS.includes(id) || itemIds.has(id));
  for (const item of retained) if (!timelineOrder.includes(item.id)) timelineOrder.splice(Math.max(timelineOrder.indexOf('sleep'), 0), 0, item.id);
  return bumpRevision(reflow({ ...next, mode: selectedMode, runStart: selectedRunStart, items: [...retained, ...modeItems], unscheduled: [], timelineOrder }));
}

export function resetWeeklyPlans(state) {
  const normalized = normalizeWeeklyState(state);
  return {
    ...normalized,
    days: Object.fromEntries(WEEKDAYS.map(({ id }) => {
      const oldDay = normalized.days[id];
      const fresh = createDefaultDay(id, oldDay.mode, oldDay.runStart);
      return [id, { ...fresh, legacyCompletion: copy(oldDay.legacyCompletion) }];
    })),
  };
}
