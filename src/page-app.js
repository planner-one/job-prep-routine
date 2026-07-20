import { LEARNING_TOPICS, MODES, PLATFORMS } from './routine-data.js';
import {
  applyUpdatedPlan,
  hasExecutionInput,
  normalizePlanSnapshot,
  prepareDailyPlan,
  resolveDailyPlan,
} from './daily-plan-core.js';
import {
  calculateDailyProgress,
  clearState,
  countPipelineProgress,
  loadState,
  logicalDateString,
  saveState,
  scheduleLogicalDayRollover,
} from './routine-core.js';
import {
  createDefaultWeeklyState,
  formatMinuteRange,
  normalizeWeeklyState,
  weekMondayKey,
} from './weekly-plan-core.js';

const DAILY_PAGE_NAME = 'daily';
const PERIODS = [
  { id: 'morning', label: '오전', description: '몸과 취업 핵심' },
  { id: 'afternoon', label: '오후', description: '지원과 개발 학습' },
  { id: 'evening', label: '저녁', description: '복기와 마감' },
  { id: 'night', label: '밤', description: '정리와 회복' },
];
const SCHEDULE_CATEGORIES = new Set(['all', 'exercise', 'career', 'learning', 'meal']);
const MODE_LABELS = {
  workout: '운동일',
  normal: '비운동일',
  running: '러닝일',
  maintenance: '핵심 유지일',
};

const emptyCompany = () => ({
  name: '',
  platform: PLATFORMS[0],
  analyzed: false,
  letter: false,
  applied: false,
  link: '',
});

const createDefaultState = () => ({
  mode: MODES[0],
  runStart: '21',
  checkedIds: [],
  companies: Array.from({ length: 4 }, emptyCompany),
  learningTopics: [],
  memos: {
    implemented: '',
    blocked: '',
    firstAction: '',
  },
  planSnapshot: null,
  archivedCompletedItems: [],
});

const stringValue = (value) => (typeof value === 'string' ? value : '');

function normalizeCompany(company = {}) {
  const source = company && typeof company === 'object' && !Array.isArray(company) ? company : {};
  const platform = PLATFORMS.includes(source.platform) ? source.platform : PLATFORMS[0];
  return {
    name: stringValue(source.name),
    platform,
    analyzed: Boolean(source.analyzed),
    letter: Boolean(source.letter),
    applied: Boolean(source.applied),
    link: stringValue(source.link),
  };
}

function normalizeArchivedCompletedItems(candidate) {
  const seen = new Set();
  return (Array.isArray(candidate) ? candidate : []).flatMap((entry) => {
    if (!entry || typeof entry !== 'object' || Array.isArray(entry) || typeof entry.id !== 'string' || !entry.id.trim() || seen.has(entry.id)) return [];
    seen.add(entry.id);
    const item = { id: entry.id };
    if (typeof entry.label === 'string') item.label = entry.label;
    if (SCHEDULE_CATEGORIES.has(entry.category) && entry.category !== 'all') item.category = entry.category;
    if (Number.isInteger(entry.startMinute) && Number.isInteger(entry.endMinute) && entry.startMinute >= 0 && entry.endMinute <= 1440 && entry.endMinute >= entry.startMinute) {
      item.startMinute = entry.startMinute;
      item.endMinute = entry.endMinute;
    }
    return [item];
  });
}

export function normalizeDailyState(candidate = {}) {
  const source = candidate && typeof candidate === 'object' && !Array.isArray(candidate) ? candidate : {};
  const defaults = createDefaultState();
  const mode = MODES.includes(source.mode) ? source.mode : defaults.mode;
  const runStart = source.runStart === '22' ? '22' : '21';
  const sourceCompanies = Array.isArray(source.companies) ? source.companies : [];
  const sourceTopics = Array.isArray(source.learningTopics) ? source.learningTopics : [];
  const companies = Array.from({ length: 4 }, (_, index) => normalizeCompany(sourceCompanies[index]));
  const checkedIds = Array.from(
    new Set((Array.isArray(source.checkedIds) ? source.checkedIds : []).filter((id) => typeof id === 'string')),
  );
  const learningTopics = LEARNING_TOPICS.filter((topic) => sourceTopics.includes(topic));
  const memos = source.memos && typeof source.memos === 'object' && !Array.isArray(source.memos) ? source.memos : {};

  return {
    mode,
    runStart,
    checkedIds,
    companies,
    learningTopics,
    memos: {
      implemented: stringValue(memos.implemented),
      blocked: stringValue(memos.blocked),
      firstAction: stringValue(memos.firstAction),
    },
    planSnapshot: normalizePlanSnapshot(source.planSnapshot),
    archivedCompletedItems: normalizeArchivedCompletedItems(source.archivedCompletedItems),
  };
}

function checkedSetFrom(checkedIds) {
  if (checkedIds instanceof Set) return checkedIds;
  return new Set(Array.isArray(checkedIds) ? checkedIds : []);
}

export function renderSchedule(container, schedule, checkedIds = []) {
  if (!container?.ownerDocument) {
    throw new TypeError('시간표 컨테이너가 필요합니다.');
  }

  const pageDocument = container.ownerDocument;
  const completed = checkedSetFrom(checkedIds);
  container.replaceChildren();

  for (const period of PERIODS) {
    const section = pageDocument.createElement('section');
    section.className = `schedule-period schedule-period--${period.id}`;
    section.setAttribute('aria-labelledby', `schedule-period-${period.id}`);

    const heading = pageDocument.createElement('header');
    heading.className = 'period-heading';

    const title = pageDocument.createElement('h3');
    title.id = `schedule-period-${period.id}`;
    title.textContent = period.label;

    const description = pageDocument.createElement('p');
    description.textContent = period.description;
    heading.append(title, description);

    const list = pageDocument.createElement('div');
    list.className = 'schedule-list';
    list.setAttribute('role', 'list');

    for (const item of schedule.filter((entry) => schedulePeriod(entry) === period.id)) {
      const row = pageDocument.createElement('label');
      row.className = 'schedule-item';
      row.setAttribute('role', 'listitem');
      row.dataset.scheduleRow = item.id;
      row.dataset.category = item.category;

      const checkbox = pageDocument.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = completed.has(item.id);
      checkbox.dataset.scheduleId = item.id;
      checkbox.dataset.progressCheck = '';
      const timeText = scheduleTime(item);
      checkbox.setAttribute('aria-label', `${timeText} ${item.label} 완료`);

      const time = pageDocument.createElement('span');
      time.className = 'schedule-time';
      time.textContent = timeText;

      const label = pageDocument.createElement('span');
      label.className = 'schedule-label';
      label.textContent = item.label;

      row.classList.toggle('is-complete', checkbox.checked);
      row.append(checkbox, time, label);
      list.append(row);
    }

    section.append(heading, list);
    container.append(section);
  }

  return container;
}

function schedulePeriod(item) {
  if (PERIODS.some(({ id }) => id === item?.period)) return item.period;
  const startMinute = Number.isInteger(item?.startMinute) ? item.startMinute : 0;
  if (startMinute < 780) return 'morning';
  if (startMinute < 1130) return 'afternoon';
  if (startMinute < 1320) return 'evening';
  return 'night';
}

function scheduleTime(item) {
  if (typeof item?.time === 'string') return item.time;
  if (Number.isInteger(item?.startMinute) && Number.isInteger(item?.endMinute)) {
    return formatMinuteRange(item.startMinute, item.endMinute);
  }
  return '';
}

function learningTopicsFromPlan(items) {
  const learningItems = Array.isArray(items) ? items.filter(({ category }) => category === 'learning') : [];
  return LEARNING_TOPICS.filter((topic) => learningItems.some((item) => {
    if (item.id === topic) return true;
    if (item.id?.startsWith('learning:') && item.id.slice('learning:'.length).split('|').includes(topic)) return true;
    return item.label?.split(' · ').includes(topic);
  }));
}

export function applyDailyCategoryFilter(root, category) {
  const normalized = SCHEDULE_CATEGORIES.has(category) ? category : 'all';
  for (const button of root.querySelectorAll('#daily-category-filters [data-category-filter]')) {
    button.setAttribute('aria-pressed', String(button.dataset.categoryFilter === normalized));
  }
  const rows = Array.from(root.querySelectorAll('#daily-schedule [data-schedule-row]'));
  for (const row of rows) {
    row.hidden = normalized !== 'all' && row.dataset.category !== normalized;
  }
  for (const period of root.querySelectorAll('#daily-schedule .schedule-period')) {
    const periodRows = Array.from(period.querySelectorAll('[data-schedule-row]'));
    period.hidden = periodRows.length === 0 || periodRows.every((row) => row.hidden);
  }
  const empty = root.querySelector('#daily-schedule-empty');
  if (empty) empty.hidden = rows.some((row) => !row.hidden);
  return normalized;
}

function fieldIn(card, field) {
  return card.querySelector(`[data-field="${field}"]`);
}

export function collectDailyState(root) {
  const checkedIds = Array.from(root.querySelectorAll('[data-schedule-id]:checked'), (input) => input.dataset.scheduleId);
  const companies = Array.from(root.querySelectorAll('.company-card'), (card) => ({
    name: fieldIn(card, 'name')?.value ?? '',
    platform: fieldIn(card, 'platform')?.value ?? PLATFORMS[0],
    analyzed: Boolean(fieldIn(card, 'analyzed')?.checked),
    letter: Boolean(fieldIn(card, 'letter')?.checked),
    applied: Boolean(fieldIn(card, 'applied')?.checked),
    link: fieldIn(card, 'link')?.value ?? '',
  }));
  const memos = { implemented: '', blocked: '', firstAction: '' };
  for (const input of root.querySelectorAll('[data-memo]')) {
    if (input.dataset.memo in memos) memos[input.dataset.memo] = input.value;
  }

  return {
    checkedIds,
    companies,
    memos,
  };
}

function formatDate(date) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(date);
  if (!match) return date;

  const [, year, month, day] = match;
  const parsed = new Date(Number(year), Number(month) - 1, Number(day));
  if (
    parsed.getFullYear() !== Number(year) ||
    parsed.getMonth() !== Number(month) - 1 ||
    parsed.getDate() !== Number(day)
  ) {
    return date;
  }

  const weekday = new Intl.DateTimeFormat('ko-KR', { weekday: 'short' }).format(parsed);
  return `${Number(year)}년 ${Number(month)}월 ${Number(day)}일 ${weekday}`;
}

function applyCompanyState(root, companies) {
  const cards = root.querySelectorAll('.company-card');
  cards.forEach((card, index) => {
    const company = companies[index] ?? emptyCompany();
    fieldIn(card, 'name').value = company.name;
    fieldIn(card, 'platform').value = company.platform;
    fieldIn(card, 'analyzed').checked = company.analyzed;
    fieldIn(card, 'letter').checked = company.letter;
    fieldIn(card, 'applied').checked = company.applied;
    fieldIn(card, 'link').value = company.link;
  });
}

function applyMemoState(root, memos) {
  for (const input of root.querySelectorAll('[data-memo]')) {
    input.value = memos[input.dataset.memo] ?? '';
  }
}

function syncScheduleCompletion(root) {
  for (const checkbox of root.querySelectorAll('[data-schedule-id]')) {
    checkbox.closest('.schedule-item')?.classList.toggle('is-complete', checkbox.checked);
  }
}

function updateProgress(root, scheduleItems, state) {
  const { completed, total, percent } = calculateDailyProgress(state, scheduleItems);

  const fill = root.querySelector('#progress-fill');
  if (fill) fill.style.width = `${percent}%`;

  const track = root.querySelector('#progress-track');
  if (track) {
    track.setAttribute('aria-valuemax', String(total));
    track.setAttribute('aria-valuenow', String(completed));
  }

  const pipeline = countPipelineProgress(state.companies);
  const count = root.querySelector('#progress-count');
  if (count) count.textContent = `${completed} / ${total} 완료 · 지원 ${pipeline.applied}개`;

  const pipelineSummary = root.querySelector('#pipeline-progress');
  if (pipelineSummary) {
    pipelineSummary.textContent = `지원 ${pipeline.applied}개 · ${pipeline.completedSteps} / ${pipeline.totalSteps}단계`;
  }

  syncScheduleCompletion(root);
}

export function initDailyPage(pageDocument, storage, date = logicalDateString()) {
  const root = pageDocument.getElementById('daily-page');
  if (!root) return null;

  let state = normalizeDailyState(loadState(storage, DAILY_PAGE_NAME, date, createDefaultState()));
  const weeklyKey = weekMondayKey(date);
  const weekly = normalizeWeeklyState(loadState(storage, 'weekly', weeklyKey, createDefaultWeeklyState()));
  const resolvedPlan = resolveDailyPlan(date, weekly);
  let prepared = prepareDailyPlan(state, resolvedPlan);
  let checkedIds = new Set(state.checkedIds);
  let renderedIds = new Set();
  let activeCategory = 'all';

  const dateElement = root.querySelector('#current-date');
  if (dateElement) {
    dateElement.dateTime = date;
    dateElement.textContent = formatDate(date);
  }

  function syncVisibleScheduleChecks() {
    for (const id of renderedIds) checkedIds.delete(id);
    for (const input of root.querySelectorAll('[data-schedule-id]:checked')) checkedIds.add(input.dataset.scheduleId);
  }

  function renderCurrentSchedule() {
    const schedule = prepared.renderPlan.items;
    renderedIds = new Set(schedule.map((item) => item.id));
    renderSchedule(root.querySelector('#daily-schedule'), schedule, checkedIds);
    activeCategory = applyDailyCategoryFilter(root, activeCategory);
    const mode = state.planSnapshot ? state.mode : resolvedPlan.mode;
    const topics = schedule.filter(({ category }) => category === 'learning').map(({ label }) => label);
    const modeElement = root.querySelector('#daily-plan-mode');
    if (modeElement) modeElement.textContent = MODE_LABELS[mode] ?? MODE_LABELS.normal;
    const topicsElement = root.querySelector('#daily-plan-topics');
    if (topicsElement) topicsElement.textContent = topics.length ? [...new Set(topics)].join(' · ') : '학습 일정 없음';
    const update = root.querySelector('#daily-plan-update');
    if (update) update.hidden = !prepared.needsPlanUpdate;
  }

  function paintState() {
    checkedIds = new Set(state.checkedIds);
    renderCurrentSchedule();
    applyCompanyState(root, state.companies);
    applyMemoState(root, state.memos);
    updateProgress(root, prepared.renderPlan.items, state);
  }

  function captureState(overrides = {}) {
    syncVisibleScheduleChecks();
    state = normalizeDailyState({
      ...state,
      ...collectDailyState(root),
      ...overrides,
      mode: state.planSnapshot ? state.mode : resolvedPlan.mode,
      runStart: state.planSnapshot ? state.runStart : resolvedPlan.runStart,
      learningTopics: state.planSnapshot ? state.learningTopics : learningTopicsFromPlan(prepared.renderPlan.items),
      checkedIds: Array.from(checkedIds),
    });
    checkedIds = new Set(state.checkedIds);
    return state;
  }

  function persist(overrides) {
    captureState(overrides);
    if (!state.planSnapshot && hasExecutionInput(state)) state.planSnapshot = prepared.renderPlan;
    state = normalizeDailyState(state);
    prepared = prepareDailyPlan(state, resolvedPlan);
    saveState(storage, DAILY_PAGE_NAME, date, state);
    renderCurrentSchedule();
    updateProgress(root, prepared.renderPlan.items, state);
  }

  function resetToday() {
    clearState(storage, DAILY_PAGE_NAME, date);
    state = normalizeDailyState(createDefaultState());
    prepared = prepareDailyPlan(state, resolvedPlan);
    activeCategory = 'all';
    paintState();
  }

  function openPdfPreview() {
    if (typeof window !== 'undefined' && window.document === pageDocument) {
      window.print();
      return;
    }
    pageDocument.defaultView?.print?.();
  }

  function handleClick(event) {
    const categoryButton = event.target.closest?.('#daily-category-filters [data-category-filter]');
    if (categoryButton && root.contains(categoryButton)) {
      activeCategory = applyDailyCategoryFilter(root, categoryButton.dataset.categoryFilter);
      return;
    }

    if (event.target.closest?.('#apply-daily-plan-update')) {
      captureState();
      state = normalizeDailyState({
        ...applyUpdatedPlan(state, resolvedPlan),
        mode: resolvedPlan.mode,
        runStart: resolvedPlan.runStart,
        learningTopics: learningTopicsFromPlan(resolvedPlan.items),
      });
      checkedIds = new Set(state.checkedIds);
      prepared = prepareDailyPlan(state, resolvedPlan);
      renderCurrentSchedule();
      saveState(storage, DAILY_PAGE_NAME, date, state);
      updateProgress(root, prepared.renderPlan.items, state);
      return;
    }
    if (event.target.closest?.('#reset-today')) {
      resetToday();
      return;
    }
    if (event.target.closest?.('#pdf-preview')) openPdfPreview();
  }

  function handleChange(event) {
    if (
      event.target.matches(
        '[data-schedule-id], .company-card input[type="checkbox"], .company-card select',
      )
    ) {
      persist();
    }
  }

  function handleInput(event) {
    if (event.target.matches('.company-card input[type="text"], .company-card input[type="url"], [data-memo]')) {
      persist();
    }
  }

  root.addEventListener('click', handleClick);
  root.addEventListener('change', handleChange);
  root.addEventListener('input', handleInput);
  paintState();

  return {
    getState: () => structuredClone(state),
    reset: resetToday,
    destroy() {
      root.removeEventListener('click', handleClick);
      root.removeEventListener('change', handleChange);
      root.removeEventListener('input', handleInput);
    },
  };
}

if (typeof document !== 'undefined') {
  const boot = () => {
    const today = logicalDateString();
    const dailyPage = initDailyPage(document, window.localStorage, today);
    if (dailyPage) scheduleLogicalDayRollover(window, today);
  };
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot, { once: true });
  } else {
    boot();
  }
}
