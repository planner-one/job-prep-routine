import { LEARNING_TOPICS, getSchedule } from './routine-data.js';
import {
  clearState,
  loadState,
  logicalDateString,
  saveState,
  scheduleLogicalDayRollover,
} from './routine-core.js';

const WEEKLY_PAGE_NAME = 'weekly';
const EXECUTION_MODES = ['workout', 'normal', 'running'];
const EXECUTION_TASKS = ['activity', 'review', 'interview', 'mealRest'];
const MAINTENANCE_TASKS = [
  'deadline',
  'application',
  'review',
  'interview',
  'learningReview',
  'nextWeek',
  'rest',
];

export const WEEKDAYS = [
  { id: 'mon', short: '월', label: '월요일' },
  { id: 'tue', short: '화', label: '화요일' },
  { id: 'wed', short: '수', label: '수요일' },
  { id: 'thu', short: '목', label: '목요일' },
  { id: 'fri', short: '금', label: '금요일' },
  { id: 'sat', short: '토', label: '토요일' },
  { id: 'sun', short: '일', label: '일요일' },
];

const DEFAULT_MODES = {
  mon: 'workout',
  tue: 'normal',
  wed: 'running',
  thu: 'workout',
  fri: 'normal',
  sat: 'workout',
  sun: 'normal',
};

const MODE_LABELS = {
  workout: '운동일',
  normal: '비운동일',
  running: '러닝일',
  maintenance: '핵심 유지일',
};

const MODE_BADGES = {
  workout: '운동',
  normal: '실행',
  running: '러닝',
  maintenance: '유지',
};

const ACTIVITY_LABELS = {
  workout: '아침 운동 완료',
  normal: '가벼운 산책·회복 완료',
  running: '저녁 러닝 완료',
};

const LEARNING_TARGETS = {
  Spring: '4–6회',
  Redis: '2–4회',
  Java: '2–3회',
  '프로젝트 적용': '3개 이상',
};

const validDays = new Set(WEEKDAYS.map(({ id }) => id));

function sourceObject(candidate) {
  return candidate && typeof candidate === 'object' && !Array.isArray(candidate) ? candidate : {};
}

function localDateString(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function localDateFrom(value) {
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return new Date(value.getFullYear(), value.getMonth(), value.getDate(), 12);
  }

  if (typeof value === 'string') {
    const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
    if (match) {
      const [, year, month, day] = match.map(Number);
      const parsed = new Date(year, month - 1, day, 12);
      if (
        parsed.getFullYear() === year &&
        parsed.getMonth() === month - 1 &&
        parsed.getDate() === day
      ) {
        return parsed;
      }
    }
  }

  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate(), 12);
}

export function weekMondayKey(value = new Date()) {
  const date = localDateFrom(value);
  date.setDate(date.getDate() - ((date.getDay() + 6) % 7));
  return localDateString(date);
}

function emptyTasks(keys) {
  return Object.fromEntries(keys.map((key) => [key, false]));
}

function createDefaultDay(dayId) {
  return {
    mode: DEFAULT_MODES[dayId] ?? 'normal',
    runStart: '21',
    applications: Array(4).fill(false),
    tasks: emptyTasks(EXECUTION_TASKS),
    learningTopics: [],
    maintenance: emptyTasks(MAINTENANCE_TASKS),
  };
}

export function createDefaultWeeklyState() {
  return {
    selectedDay: 'mon',
    maintenanceDay: 'sun',
    days: Object.fromEntries(WEEKDAYS.map(({ id }) => [id, createDefaultDay(id)])),
  };
}

export function updateExecutionMode(day, mode) {
  if (!sourceObject(day).tasks || !EXECUTION_MODES.includes(mode) || day.mode === mode) return false;
  day.mode = mode;
  day.tasks.activity = false;
  return true;
}

function normalizeDayState(candidate, dayId) {
  const source = sourceObject(candidate);
  const defaultMode = DEFAULT_MODES[dayId] ?? 'normal';
  const mode =
    source.mode === undefined
      ? defaultMode
      : EXECUTION_MODES.includes(source.mode)
        ? source.mode
        : 'normal';
  const applications = Array.isArray(source.applications) ? source.applications : [];
  const taskSource = sourceObject(source.tasks);
  const maintenanceSource = sourceObject(source.maintenance);
  const topicSource = Array.isArray(source.learningTopics) ? source.learningTopics : [];

  return {
    mode,
    runStart: source.runStart === '22' ? '22' : '21',
    applications: Array.from({ length: 4 }, (_, index) => Boolean(applications[index])),
    tasks: Object.fromEntries(EXECUTION_TASKS.map((key) => [key, Boolean(taskSource[key])])),
    learningTopics: LEARNING_TOPICS.filter((topic) => topicSource.includes(topic)),
    maintenance: Object.fromEntries(
      MAINTENANCE_TASKS.map((key) => [key, Boolean(maintenanceSource[key])]),
    ),
  };
}

export function normalizeWeeklyState(candidate = {}) {
  const source = sourceObject(candidate);
  const days = sourceObject(source.days);

  return {
    selectedDay: validDays.has(source.selectedDay) ? source.selectedDay : 'mon',
    maintenanceDay: validDays.has(source.maintenanceDay) ? source.maintenanceDay : 'sun',
    days: Object.fromEntries(WEEKDAYS.map(({ id }) => [id, normalizeDayState(days[id], id)])),
  };
}

export function calculateWeeklyProgress(candidate = {}) {
  const state = normalizeWeeklyState(candidate);
  const progress = {
    applications: 0,
    reviews: 0,
    interviews: 0,
    workouts: 0,
    runs: 0,
    learning: Object.fromEntries(LEARNING_TOPICS.map((topic) => [topic, 0])),
  };

  for (const { id } of WEEKDAYS) {
    const day = state.days[id];
    if (id === state.maintenanceDay) {
      if (day.maintenance.application) progress.applications += 1;
      if (day.maintenance.interview) progress.interviews += 1;
      continue;
    }

    progress.applications += day.applications.filter(Boolean).length;
    if (day.tasks.review) progress.reviews += 1;
    if (day.tasks.interview) progress.interviews += 1;
    if (day.tasks.activity && day.mode === 'workout') progress.workouts += 1;
    if (day.tasks.activity && day.mode === 'running') progress.runs += 1;
    for (const topic of day.learningTopics) progress.learning[topic] += 1;
  }

  return progress;
}

function dateAtWeekday(weekKey, dayId) {
  const date = localDateFrom(weekKey);
  const index = WEEKDAYS.findIndex(({ id }) => id === dayId);
  date.setDate(date.getDate() + Math.max(index, 0));
  return date;
}

export function formatWeekRange(weekKey) {
  const monday = localDateFrom(weekKey);
  const sunday = new Date(monday);
  sunday.setDate(sunday.getDate() + 6);
  if (monday.getFullYear() !== sunday.getFullYear()) {
    return `${monday.getFullYear()}년 ${monday.getMonth() + 1}월 ${monday.getDate()}일–${sunday.getFullYear()}년 ${sunday.getMonth() + 1}월 ${sunday.getDate()}일`;
  }
  if (monday.getMonth() === sunday.getMonth()) {
    return `${monday.getFullYear()}년 ${monday.getMonth() + 1}월 ${monday.getDate()}일–${sunday.getDate()}일`;
  }
  return `${monday.getFullYear()}년 ${monday.getMonth() + 1}월 ${monday.getDate()}일–${sunday.getMonth() + 1}월 ${sunday.getDate()}일`;
}

function formatSelectedDate(weekKey, dayId) {
  const date = dateAtWeekday(weekKey, dayId);
  return `${date.getMonth() + 1}월 ${date.getDate()}일`;
}

function setText(root, selector, value) {
  const element = root.querySelector(selector);
  if (element) element.textContent = value;
}

function renderWeeklySchedule(container, schedule) {
  if (!container?.ownerDocument) return;
  const pageDocument = container.ownerDocument;
  const list = pageDocument.createElement('ol');
  list.className = 'weekly-schedule-list';

  for (const item of schedule) {
    const row = pageDocument.createElement('li');
    row.dataset.weeklyScheduleId = item.id;
    row.dataset.category = item.category;

    const time = pageDocument.createElement('span');
    time.className = 'weekly-schedule-time';
    time.textContent = item.time;

    const label = pageDocument.createElement('span');
    label.className = 'weekly-schedule-label';
    label.textContent = item.label;

    row.append(time, label);
    list.append(row);
  }

  container.replaceChildren(list);
}

function setProgressTrack(root, metric, value, maximum) {
  const card = root.querySelector(`[data-weekly-progress="${metric}"]`);
  const track = card?.querySelector('[role="progressbar"]');
  const fill = card?.querySelector('.weekly-goal-fill');
  if (track) {
    track.setAttribute('aria-valuemax', String(maximum));
    track.setAttribute('aria-valuenow', String(value));
  }
  if (fill) fill.style.width = `${Math.min((value / maximum) * 100, 100)}%`;
}

function updateWeeklyProgress(root, state) {
  const progress = calculateWeeklyProgress(state);
  setText(root, '#weekly-applications-value', `${progress.applications} / 18–24`);
  setText(root, '#weekly-reviews-value', `${progress.reviews} / 실행일 6회`);
  setText(root, '#weekly-interviews-value', `${progress.interviews}회`);
  setText(root, '#weekly-workouts-value', `${progress.workouts} / 3–5회`);
  setText(root, '#weekly-runs-value', `${progress.runs} / 1–2회`);
  setProgressTrack(root, 'applications', progress.applications, 25);

  for (const [topic, target] of Object.entries(LEARNING_TARGETS)) {
    setText(
      root,
      `[data-progress-topic="${topic}"] .weekly-metric-value`,
      `${progress.learning[topic]} / ${target}`,
    );
  }
}

export function initWeeklyPage(pageDocument, storage, date = logicalDateString()) {
  const root = pageDocument.getElementById('weekly-page');
  if (!root) return null;

  const weekKey = weekMondayKey(date);
  let state = normalizeWeeklyState(
    loadState(storage, WEEKLY_PAGE_NAME, weekKey, createDefaultWeeklyState()),
  );

  const weekElement = root.querySelector('#weekly-current-week');
  if (weekElement) {
    weekElement.dateTime = weekKey;
    weekElement.textContent = formatWeekRange(weekKey);
  }

  function selectedDayState() {
    return state.days[state.selectedDay];
  }

  function paintTabs() {
    for (const button of root.querySelectorAll('#weekday-tabs [data-day]')) {
      const dayId = button.dataset.day;
      const weekday = WEEKDAYS.find(({ id }) => id === dayId);
      const isSelected = dayId === state.selectedDay;
      const isMaintenance = dayId === state.maintenanceDay;
      const mode = isMaintenance ? 'maintenance' : state.days[dayId].mode;
      button.setAttribute('aria-selected', String(isSelected));
      button.dataset.dayRole = isMaintenance ? 'maintenance' : 'execution';
      button.querySelector('[data-day-badge]').textContent = MODE_BADGES[mode];
      button.setAttribute('aria-label', `${weekday?.label ?? ''}, ${MODE_LABELS[mode]}`);
    }
  }

  function applyExecutionControls(day) {
    for (const button of root.querySelectorAll('[data-weekly-mode]')) {
      button.setAttribute('aria-pressed', String(button.dataset.weeklyMode === day.mode));
    }
    for (const input of root.querySelectorAll('input[name="weekly-run-start"]')) {
      input.checked = input.value === day.runStart;
    }
    root.querySelector('#weekly-run-start-controls').hidden = day.mode !== 'running';

    for (const input of root.querySelectorAll('[data-weekly-application]')) {
      input.checked = day.applications[Number(input.dataset.weeklyApplication)] ?? false;
    }
    for (const input of root.querySelectorAll('[data-weekly-task]')) {
      input.checked = day.tasks[input.dataset.weeklyTask] ?? false;
    }
    for (const input of root.querySelectorAll('[data-weekly-learning]')) {
      input.checked = day.learningTopics.includes(input.value);
    }

    setText(root, '#weekly-activity-label', ACTIVITY_LABELS[day.mode]);
    setText(
      root,
      '#selected-day-application-count',
      `${day.applications.filter(Boolean).length} / 4`,
    );
  }

  function applyMaintenanceControls(day) {
    for (const input of root.querySelectorAll('[data-maintenance-task]')) {
      input.checked = day.maintenance[input.dataset.maintenanceTask] ?? false;
    }
  }

  function paintDetail() {
    const day = selectedDayState();
    const weekday = WEEKDAYS.find(({ id }) => id === state.selectedDay);
    const isMaintenance = state.selectedDay === state.maintenanceDay;
    const scheduleMode = isMaintenance ? 'maintenance' : day.mode;

    root.querySelector('#day-detail').setAttribute('aria-labelledby', `weekday-tab-${state.selectedDay}`);
    setText(root, '#selected-day-role', isMaintenance ? '핵심 유지일' : MODE_LABELS[day.mode]);
    setText(
      root,
      '#selected-day-title',
      `${weekday.label} ${isMaintenance ? '핵심 유지' : '실행'}`,
    );
    setText(root, '#selected-day-date', formatSelectedDate(weekKey, state.selectedDay));

    const maintenanceButton = root.querySelector('#set-maintenance-day');
    maintenanceButton.disabled = isMaintenance;
    maintenanceButton.textContent = isMaintenance
      ? '핵심 유지일로 설정됨'
      : '이 요일을 핵심 유지일로';

    applyExecutionControls(day);
    applyMaintenanceControls(day);
    root.querySelector('#execution-day-controls').hidden = isMaintenance;
    root.querySelector('#execution-checklist').hidden = isMaintenance;
    root.querySelector('#maintenance-checklist').hidden = !isMaintenance;

    setText(root, '#weekly-schedule-title', `${MODE_LABELS[scheduleMode]} 고정 시간표`);
    setText(root, '#weekly-schedule-mode', MODE_LABELS[scheduleMode]);
    renderWeeklySchedule(
      root.querySelector('#weekly-schedule-list'),
      getSchedule(scheduleMode, day.runStart),
    );
  }

  function paintAll() {
    paintTabs();
    paintDetail();
    updateWeeklyProgress(root, state);
  }

  function persist() {
    state = normalizeWeeklyState(state);
    saveState(storage, WEEKLY_PAGE_NAME, weekKey, state);
    updateWeeklyProgress(root, state);
  }

  function selectDay(dayId) {
    if (!validDays.has(dayId) || dayId === state.selectedDay) return;
    state.selectedDay = dayId;
    persist();
    paintTabs();
    paintDetail();
  }

  function setMaintenanceDay() {
    if (state.selectedDay === state.maintenanceDay) return;
    state.maintenanceDay = state.selectedDay;
    persist();
    paintTabs();
    paintDetail();
  }

  function changeMode(mode) {
    if (
      state.selectedDay === state.maintenanceDay ||
      !updateExecutionMode(selectedDayState(), mode)
    ) {
      return;
    }
    persist();
    paintTabs();
    paintDetail();
  }

  function resetCurrentWeek() {
    clearState(storage, WEEKLY_PAGE_NAME, weekKey);
    state = createDefaultWeeklyState();
    paintAll();
  }

  function openPdfPreview() {
    if (typeof window !== 'undefined' && window.document === pageDocument) {
      window.print();
      return;
    }
    pageDocument.defaultView?.print?.();
  }

  function handleClick(event) {
    const tab = event.target.closest?.('#weekday-tabs [data-day]');
    if (tab && root.contains(tab)) {
      selectDay(tab.dataset.day);
      return;
    }

    const modeButton = event.target.closest?.('[data-weekly-mode]');
    if (modeButton && root.contains(modeButton)) {
      changeMode(modeButton.dataset.weeklyMode);
      return;
    }

    if (event.target.closest?.('#set-maintenance-day')) {
      setMaintenanceDay();
      return;
    }
    if (event.target.closest?.('#weekly-reset-current')) {
      resetCurrentWeek();
      return;
    }
    if (event.target.closest?.('#weekly-pdf-preview')) openPdfPreview();
  }

  function handleChange(event) {
    const day = selectedDayState();

    if (event.target.matches('input[name="weekly-run-start"]')) {
      day.runStart = event.target.value === '22' ? '22' : '21';
      persist();
      paintDetail();
      return;
    }

    if (event.target.matches('[data-weekly-application]')) {
      day.applications[Number(event.target.dataset.weeklyApplication)] = event.target.checked;
      persist();
      setText(
        root,
        '#selected-day-application-count',
        `${day.applications.filter(Boolean).length} / 4`,
      );
      return;
    }

    if (event.target.matches('[data-weekly-task]')) {
      const task = event.target.dataset.weeklyTask;
      if (EXECUTION_TASKS.includes(task)) day.tasks[task] = event.target.checked;
      persist();
      return;
    }

    if (event.target.matches('[data-weekly-learning]')) {
      day.learningTopics = Array.from(
        root.querySelectorAll('[data-weekly-learning]:checked'),
        (input) => input.value,
      );
      persist();
      return;
    }

    if (event.target.matches('[data-maintenance-task]')) {
      const task = event.target.dataset.maintenanceTask;
      if (MAINTENANCE_TASKS.includes(task)) day.maintenance[task] = event.target.checked;
      persist();
    }
  }

  root.addEventListener('click', handleClick);
  root.addEventListener('change', handleChange);
  paintAll();
  pageDocument.documentElement.dataset.weeklyReady = 'true';

  return {
    getState: () => structuredClone(state),
    getWeekKey: () => weekKey,
    reset: resetCurrentWeek,
    destroy() {
      root.removeEventListener('click', handleClick);
      root.removeEventListener('change', handleChange);
      delete pageDocument.documentElement.dataset.weeklyReady;
    },
  };
}

if (typeof document !== 'undefined') {
  const boot = () => {
    const today = logicalDateString();
    initWeeklyPage(document, window.localStorage, today);
    scheduleLogicalDayRollover(window, today);
  };
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot, { once: true });
  } else {
    boot();
  }
}
