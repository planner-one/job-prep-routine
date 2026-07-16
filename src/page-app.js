import { LEARNING_TOPICS, MODES, PLATFORMS, getSchedule } from './routine-data.js';
import { clearState, countPipelineProgress, loadState, saveState } from './routine-core.js';

const PAGE_NAME = 'daily';
const PERIODS = [
  { id: 'morning', label: '오전', description: '몸과 취업 핵심' },
  { id: 'afternoon', label: '오후', description: '지원과 개발 학습' },
  { id: 'evening', label: '저녁', description: '복기와 마감' },
  { id: 'night', label: '밤', description: '정리와 회복' },
];

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

    for (const item of schedule.filter((entry) => entry.period === period.id)) {
      const row = pageDocument.createElement('label');
      row.className = 'schedule-item';
      row.setAttribute('role', 'listitem');
      row.dataset.scheduleRow = item.id;

      const checkbox = pageDocument.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = completed.has(item.id);
      checkbox.dataset.scheduleId = item.id;
      checkbox.dataset.progressCheck = '';
      checkbox.setAttribute('aria-label', `${item.time} ${item.label} 완료`);

      const time = pageDocument.createElement('span');
      time.className = 'schedule-time';
      time.textContent = item.time;

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

function fieldIn(card, field) {
  return card.querySelector(`[data-field="${field}"]`);
}

export function collectDailyState(root) {
  const activeMode =
    root.querySelector('[data-mode][aria-pressed="true"]') ?? root.querySelector('[data-mode].active');
  const selectedRunStart =
    root.querySelector('input[name="run-start"]:checked') ?? root.querySelector('[data-run][aria-pressed="true"]');

  const checkedIds = Array.from(root.querySelectorAll('[data-schedule-id]:checked'), (input) => input.dataset.scheduleId);
  const companies = Array.from(root.querySelectorAll('.company-card'), (card) => ({
    name: fieldIn(card, 'name')?.value ?? '',
    platform: fieldIn(card, 'platform')?.value ?? PLATFORMS[0],
    analyzed: Boolean(fieldIn(card, 'analyzed')?.checked),
    letter: Boolean(fieldIn(card, 'letter')?.checked),
    applied: Boolean(fieldIn(card, 'applied')?.checked),
    link: fieldIn(card, 'link')?.value ?? '',
  }));
  const learningTopics = Array.from(
    root.querySelectorAll('[data-learning-topic]:checked'),
    (input) => input.value,
  );
  const memos = { implemented: '', blocked: '', firstAction: '' };
  for (const input of root.querySelectorAll('[data-memo]')) {
    if (input.dataset.memo in memos) memos[input.dataset.memo] = input.value;
  }

  return {
    mode: activeMode?.dataset.mode ?? MODES[0],
    runStart: selectedRunStart?.value ?? selectedRunStart?.dataset.run ?? '21',
    checkedIds,
    companies,
    learningTopics,
    memos,
  };
}

function localDateString(now = new Date()) {
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
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

function setPressedMode(root, mode) {
  for (const button of root.querySelectorAll('[data-mode]')) {
    button.setAttribute('aria-pressed', String(button.dataset.mode === mode));
  }
}

function setRunStart(root, runStart, mode) {
  for (const input of root.querySelectorAll('input[name="run-start"]')) {
    input.checked = input.value === runStart;
  }
  const controls = root.querySelector('#run-start-controls');
  if (controls) controls.hidden = mode !== 'running';
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

function applyLearningState(root, selectedTopics) {
  const selected = new Set(selectedTopics);
  for (const input of root.querySelectorAll('[data-learning-topic]')) {
    input.checked = selected.has(input.value);
  }
}

function applyMemoState(root, memos) {
  for (const input of root.querySelectorAll('[data-memo]')) {
    input.value = memos[input.dataset.memo] ?? '';
  }
}

function updateProgress(root) {
  const checkboxes = Array.from(root.querySelectorAll('[data-progress-check]'));
  const completed = checkboxes.filter((input) => input.checked).length;
  const total = checkboxes.length;
  const percent = total === 0 ? 0 : (completed / total) * 100;

  const fill = root.querySelector('#progress-fill');
  if (fill) fill.style.width = `${percent}%`;

  const track = root.querySelector('#progress-track');
  if (track) {
    track.setAttribute('aria-valuemax', String(total));
    track.setAttribute('aria-valuenow', String(completed));
  }

  const state = collectDailyState(root);
  const pipeline = countPipelineProgress(state.companies);
  const count = root.querySelector('#progress-count');
  if (count) count.textContent = `${completed} / ${total} 완료 · 지원 ${pipeline.applied}개`;

  const pipelineSummary = root.querySelector('#pipeline-progress');
  if (pipelineSummary) {
    pipelineSummary.textContent = `지원 ${pipeline.applied}개 · ${pipeline.completedSteps} / ${pipeline.totalSteps}단계`;
  }

  for (const checkbox of root.querySelectorAll('[data-schedule-id]')) {
    checkbox.closest('.schedule-item')?.classList.toggle('is-complete', checkbox.checked);
  }
}

export function initDailyPage(pageDocument, storage, date = localDateString()) {
  const root = pageDocument.getElementById('daily-page');
  if (!root) return null;

  let state = normalizeDailyState(loadState(storage, PAGE_NAME, date, createDefaultState()));
  let checkedIds = new Set(state.checkedIds);
  let renderedIds = new Set();

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
    const schedule = getSchedule(state.mode, state.runStart);
    renderedIds = new Set(schedule.map((item) => item.id));
    renderSchedule(root.querySelector('#daily-schedule'), schedule, checkedIds);
  }

  function paintState() {
    checkedIds = new Set(state.checkedIds);
    setPressedMode(root, state.mode);
    setRunStart(root, state.runStart, state.mode);
    renderCurrentSchedule();
    applyCompanyState(root, state.companies);
    applyLearningState(root, state.learningTopics);
    applyMemoState(root, state.memos);
    updateProgress(root);
  }

  function captureState(overrides = {}) {
    syncVisibleScheduleChecks();
    state = normalizeDailyState({
      ...collectDailyState(root),
      ...overrides,
      checkedIds: Array.from(checkedIds),
    });
    checkedIds = new Set(state.checkedIds);
    return state;
  }

  function persist(overrides) {
    captureState(overrides);
    saveState(storage, PAGE_NAME, date, state);
    updateProgress(root);
  }

  function changeMode(mode) {
    if (!MODES.includes(mode) || mode === state.mode) return;
    captureState({ mode });
    setPressedMode(root, state.mode);
    setRunStart(root, state.runStart, state.mode);
    renderCurrentSchedule();
    saveState(storage, PAGE_NAME, date, state);
    updateProgress(root);
  }

  function changeRunStart(runStart) {
    const nextRunStart = runStart === '22' ? '22' : '21';
    captureState({ runStart: nextRunStart });
    setRunStart(root, state.runStart, state.mode);
    if (state.mode === 'running') renderCurrentSchedule();
    saveState(storage, PAGE_NAME, date, state);
    updateProgress(root);
  }

  function resetToday() {
    clearState(storage, PAGE_NAME, date);
    state = createDefaultState();
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
    const modeButton = event.target.closest?.('[data-mode]');
    if (modeButton && root.contains(modeButton)) {
      changeMode(modeButton.dataset.mode);
      return;
    }
    if (event.target.closest?.('#reset-today')) {
      resetToday();
      return;
    }
    if (event.target.closest?.('#pdf-preview')) openPdfPreview();
  }

  function handleChange(event) {
    if (event.target.matches('input[name="run-start"]')) {
      changeRunStart(event.target.value);
      return;
    }
    if (
      event.target.matches(
        '[data-schedule-id], .company-card input[type="checkbox"], .company-card select, [data-learning-topic]',
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
  const boot = () => initDailyPage(document, window.localStorage, localDateString());
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot, { once: true });
  } else {
    boot();
  }
}
