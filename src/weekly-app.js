import { LEARNING_TOPICS } from './routine-data.js';
import {
  calculateWeeklyExecutionProgress,
  hasExecutionInput,
  normalizePlanSnapshot,
} from './daily-plan-core.js';
import {
  loadState,
  localDateString,
  logicalDateString,
  saveState,
  scheduleLogicalDayRollover,
} from './routine-core.js';
import {
  TASK_LIBRARY,
  addCustomPlanItem,
  addLibraryPlanItem,
  changeDayMode,
  createDefaultWeeklyState,
  formatMinuteRange,
  getDayTimeline,
  movePlanItem,
  normalizeWeeklyState,
  removePlanItem,
  resetWeeklyPlans,
  updatePlanItemTime,
  weekMondayKey,
} from './weekly-plan-core.js';

export {
  createDefaultWeeklyState,
  formatMinuteRange,
  normalizeWeeklyState,
  weekMondayKey,
};

const WEEKLY_PAGE_NAME = 'weekly';
const WEEKDAYS = [
  { id: 'mon', label: '월요일' }, { id: 'tue', label: '화요일' },
  { id: 'wed', label: '수요일' }, { id: 'thu', label: '목요일' },
  { id: 'fri', label: '금요일' }, { id: 'sat', label: '토요일' },
  { id: 'sun', label: '일요일' },
];
const MODE_LABELS = {
  workout: '운동일',
  normal: '비운동일',
  running: '러닝일',
  maintenance: '핵심 유지일',
};
const MODE_BADGES = { workout: '운동', normal: '실행', running: '러닝', maintenance: '유지' };
const validDays = new Set(WEEKDAYS.map(({ id }) => id));
const LIBRARY_GROUPS = [
  ['취업·면접', ['scan', 'job-analysis', 'applications', 'portfolio-review', 'interview-practice']],
  ['운동·회복', ['workout', 'run', 'shower', 'wrap']],
];
const ROW_STATE_KEYS = {
  '예정': 'scheduled',
  '완료': 'complete',
  '기록 없음': 'missing',
  '계획 변경 대기': 'plan-update',
};
const LEARNING_GOALS = {
  Spring: '4–6회',
  Redis: '2–4회',
  Java: '2–3회',
  '프로젝트 적용': '3개 이상',
  CS: '1회 이상',
  코딩테스트: '1회 이상',
};

function localDateFrom(value) {
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return new Date(value.getFullYear(), value.getMonth(), value.getDate(), 12);
  }
  if (typeof value === 'string') {
    const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
    if (match) {
      const [, year, month, day] = match.map(Number);
      const result = new Date(year, month - 1, day, 12);
      if (result.getFullYear() === year && result.getMonth() === month - 1 && result.getDate() === day) return result;
    }
  }
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate(), 12);
}

function dateAtWeekday(weekKey, dayId) {
  const date = localDateFrom(weekKey);
  date.setDate(date.getDate() + Math.max(WEEKDAYS.findIndex(({ id }) => id === dayId), 0));
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

export function minuteFromInput(value) {
  const match = /^(\d{2}):(\d{2})$/.exec(value);
  if (!match) return null;
  const hours = Number(match[1]);
  const minutes = Number(match[2]);
  if (hours === 24 && minutes === 0) return 1440;
  if (hours > 23 || minutes > 59) return null;
  return hours * 60 + minutes;
}

function minuteInputValue(value) {
  if (value === 1440) return '24:00';
  return `${String(Math.floor(value / 60)).padStart(2, '0')}:${String(value % 60).padStart(2, '0')}`;
}

export function planMoveTargetIndex(day, itemId, direction) {
  const currentIndex = day?.timelineOrder?.indexOf(itemId) ?? -1;
  if (currentIndex < 0 || !['up', 'down'].includes(direction)) return null;
  const offset = direction === 'up' ? -1 : 1;
  return Math.max(0, Math.min(currentIndex + offset, day.timelineOrder.length - 1));
}

export function resolveWeeklyRowState(itemId, dailyState, planRevision, dayDate, today) {
  const source = dailyState && typeof dailyState === 'object' && !Array.isArray(dailyState) ? dailyState : {};
  if (Array.isArray(source.checkedIds) && source.checkedIds.includes(itemId)) return '완료';
  const snapshot = normalizePlanSnapshot(source.planSnapshot);
  if (hasExecutionInput(source) && snapshot && snapshot.revision !== planRevision) return '계획 변경 대기';
  if (dayDate < today && !hasExecutionInput(source)) return '기록 없음';
  return '예정';
}

function createButton(document, label, attributes = {}) {
  const button = document.createElement('button');
  button.type = 'button';
  button.textContent = label;
  for (const [name, value] of Object.entries(attributes)) button.setAttribute(name, value);
  return button;
}

function createAddPanel(document) {
  const fragment = document.createDocumentFragment();
  const heading = document.createElement('h4');
  heading.textContent = '기본 일정에서 추가';
  fragment.append(heading);

  const groups = document.createElement('div');
  groups.className = 'weekly-library-groups';
  for (const [groupLabel, ids] of LIBRARY_GROUPS) {
    const group = document.createElement('section');
    const title = document.createElement('h5');
    title.textContent = groupLabel;
    const choices = document.createElement('div');
    choices.className = 'weekly-library-choices';
    for (const id of ids) {
      const item = TASK_LIBRARY.find((candidate) => candidate.id === id);
      if (!item) continue;
      choices.append(createButton(document, `${item.label} · ${item.durationMinutes}분`, { 'data-add-library': item.id }));
    }
    group.append(title, choices);
    groups.append(group);
  }

  const learning = document.createElement('section');
  learning.className = 'weekly-learning-builder';
  learning.innerHTML = '<h5>개발 학습 조합</h5><div class="weekly-learning-choices"></div>';
  const learningChoices = learning.querySelector('.weekly-learning-choices');
  for (const topic of LEARNING_TOPICS) {
    const label = document.createElement('label');
    const input = document.createElement('input');
    input.type = 'checkbox';
    input.value = topic;
    input.dataset.addLearningTopic = topic;
    label.append(input, ` ${topic}`);
    learningChoices.append(label);
  }
  learning.append(createButton(document, '선택한 주제로 학습 블록 추가', { 'data-add-learning': '' }));
  groups.append(learning);

  const custom = document.createElement('form');
  custom.id = 'weekly-custom-form';
  custom.className = 'weekly-custom-form';
  custom.innerHTML = `
    <h4>직접 일정 추가</h4>
    <label>일정 이름 <input id="weekly-custom-label" name="label" required maxlength="80"></label>
    <label>분류
      <select id="weekly-custom-category" name="category">
        <option value="career">취업·면접</option>
        <option value="learning">개발 학습</option>
        <option value="exercise">운동·회복</option>
      </select>
    </label>
    <label>소요시간(분) <input id="weekly-custom-duration" name="duration" type="number" min="10" max="480" step="10" value="30" required></label>
    <button type="submit">직접 일정 추가</button>
  `;
  fragment.append(groups, custom);
  return fragment;
}

export function createCompactTimeEditor(document, item, errorMessage = '') {
  const editor = document.createElement('form');
  const errorId = `weekly-time-error-${item.id.replace(/[^a-zA-Z0-9_-]/g, '-')}`;
  editor.className = 'plan-time-editor';
  editor.dataset.timeEditor = item.id;
  editor.innerHTML = `
    <label>시작 <input type="time" step="300" value="${minuteInputValue(item.startMinute)}" data-time-start aria-describedby="${errorId}"></label>
    <label>종료 <input type="text" inputmode="numeric" maxlength="5" placeholder="HH:MM" pattern="(?:[01]\\d|2[0-3]):[0-5]\\d|24:00" value="${minuteInputValue(item.endMinute)}" data-time-end aria-describedby="${errorId}"></label>
    <button type="submit" data-time-save>저장</button>
    <button type="button" data-time-cancel>취소</button>
    <p id="${errorId}" class="plan-time-error" role="alert">${errorMessage}</p>
  `;
  return editor;
}

export function renderPlanRow(document, item, { editingTime = false, errorMessage = '', stateLabel = null } = {}) {
  const row = document.createElement('li');
  row.dataset.planItemId = item.id;
  row.dataset.category = item.category;
  if (stateLabel) row.dataset.executionState = ROW_STATE_KEYS[stateLabel];
  row.className = `weekly-plan-row${item.fixed ? ' is-fixed' : ''}`;
  row.innerHTML = `
    ${item.fixed ? '' : '<button type="button" class="plan-drag" data-plan-drag aria-label="일정 이동">≡</button>'}
    <span class="weekly-plan-time">${formatMinuteRange(item.startMinute, item.endMinute)}</span>
    <span class="weekly-plan-label"></span>
    <span class="weekly-plan-state">${stateLabel ?? (item.fixed ? '고정' : '예정')}</span>
    ${item.fixed ? '' : '<span class="plan-move-actions"><button type="button" data-move="up" aria-label="위로 이동">↑</button><button type="button" data-move="down" aria-label="아래로 이동">↓</button><button type="button" class="plan-remove" data-remove-plan aria-label="일정 삭제">삭제</button></span>'}
  `;
  row.querySelector('.weekly-plan-label').textContent = item.label;
  if (editingTime && !item.fixed) row.append(createCompactTimeEditor(document, item, errorMessage));
  return row;
}

function renderUnscheduledRow(document, item) {
  const row = document.createElement('li');
  row.dataset.planItemId = item.id;
  row.className = 'weekly-plan-row is-unscheduled';
  row.innerHTML = `
    <button type="button" class="plan-drag" data-plan-drag aria-label="일정 이동">≡</button>
    <span class="weekly-plan-time">미배치</span>
    <span class="weekly-plan-label"></span>
    <span class="weekly-plan-state">시간 부족</span>
    <span class="plan-move-actions"><button type="button" data-move="up" aria-label="위로 이동">↑</button><button type="button" data-move="down" aria-label="아래로 이동">↓</button><button type="button" class="plan-remove" data-remove-plan aria-label="일정 삭제">삭제</button></span>
  `;
  row.querySelector('.weekly-plan-label').textContent = item.label;
  return row;
}

function mutationStatus(label, day) {
  const overflow = day.unscheduled.length;
  return `${label}${overflow ? ` 미배치 일정 ${overflow}개가 있습니다.` : ' 시간이 다시 계산되었습니다.'}`;
}

export function initWeeklyPage(pageDocument, storage, date = logicalDateString()) {
  const root = pageDocument.getElementById('weekly-page');
  if (!root) return null;

  const todayKey = typeof date === 'string' ? date : localDateString(date);
  const weekKey = weekMondayKey(date);
  let state = normalizeWeeklyState(loadState(storage, WEEKLY_PAGE_NAME, weekKey, createDefaultWeeklyState()));
  let editingTime = false;
  let draggedItemId = null;
  const timeErrors = new Map();
  let customSequence = 0;

  const weekElement = root.querySelector('#weekly-current-week');
  weekElement.dateTime = weekKey;
  weekElement.textContent = formatWeekRange(weekKey);
  root.querySelector('#weekly-add-panel').append(createAddPanel(pageDocument));

  function selectedDayState() {
    return state.days[state.selectedDay];
  }

  function persist() {
    state = normalizeWeeklyState(state);
    saveState(storage, WEEKLY_PAGE_NAME, weekKey, state);
  }

  function announce(message) {
    setText(root, '#weekly-plan-status', message);
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
      button.setAttribute('aria-label', `${weekday.label}, ${MODE_LABELS[mode]}`);
    }
  }

  function selectedDateKey() {
    return localDateString(dateAtWeekday(weekKey, state.selectedDay));
  }

  function selectedDailyState() {
    return loadState(storage, 'daily', selectedDateKey(), {});
  }

  function paintProgress() {
    const progress = calculateWeeklyExecutionProgress(storage, weekKey);
    setText(root, '#weekly-applications-value', `${progress.applications} / 18–24`);
    setText(root, '#weekly-reviews-value', `${progress.reviews} / 실행일 6회`);
    setText(root, '#weekly-interviews-value', `${progress.interviews}회`);
    setText(root, '#weekly-workouts-value', `${progress.workouts} / 3–5회`);
    setText(root, '#weekly-runs-value', `${progress.runs} / 1–2회`);

    const track = root.querySelector('[data-weekly-progress="applications"] [role="progressbar"]');
    if (track) {
      const maximum = Number(track.getAttribute('aria-valuemax')) || 25;
      track.setAttribute('aria-valuenow', String(progress.applications));
      const fill = track.querySelector('.weekly-goal-fill');
      if (fill) fill.style.width = `${Math.min((progress.applications / maximum) * 100, 100)}%`;
    }

    for (const topic of LEARNING_TOPICS) {
      const value = root.querySelector(`[data-progress-topic="${CSS.escape(topic)}"] .weekly-metric-value`);
      if (value) value.textContent = `${progress.learning[topic]} / ${LEARNING_GOALS[topic]}`;
    }
  }

  function paintPlanner() {
    const day = selectedDayState();
    const daily = selectedDailyState();
    const dayDate = selectedDateKey();
    const timeline = getDayTimeline(day).filter((item) => !item.unscheduled);
    const list = root.querySelector('#weekly-plan-list');
    list.replaceChildren(...timeline.map((item) => renderPlanRow(pageDocument, item, {
      editingTime,
      errorMessage: timeErrors.get(item.id) ?? '',
      stateLabel: resolveWeeklyRowState(item.id, daily, day.revision, dayDate, todayKey),
    })));

    const unscheduled = root.querySelector('#weekly-unscheduled');
    unscheduled.hidden = day.unscheduled.length === 0;
    setText(root, '#weekly-unscheduled-count', String(day.unscheduled.length));
    root.querySelector('#weekly-unscheduled-list').replaceChildren(
      ...day.unscheduled.map((item) => renderUnscheduledRow(pageDocument, item)),
    );
    root.querySelector('#weekly-time-edit').setAttribute('aria-pressed', String(editingTime));
    root.querySelector('#weekly-time-edit').textContent = editingTime ? '시간 편집 닫기' : '시간 편집';
  }

  function paintDetail() {
    const day = selectedDayState();
    const weekday = WEEKDAYS.find(({ id }) => id === state.selectedDay);
    const isMaintenance = state.selectedDay === state.maintenanceDay;
    root.querySelector('#day-detail').setAttribute('aria-labelledby', `weekday-tab-${state.selectedDay}`);
    setText(root, '#selected-day-role', isMaintenance ? '핵심 유지일' : MODE_LABELS[day.mode]);
    setText(root, '#selected-day-title', `${weekday.label} ${isMaintenance ? '핵심 유지' : '실행'}`);
    setText(root, '#selected-day-date', formatSelectedDate(weekKey, state.selectedDay));
    setText(root, '#weekly-planner-title', `${weekday.label} 일정`);

    const maintenanceButton = root.querySelector('#set-maintenance-day');
    maintenanceButton.disabled = isMaintenance;
    maintenanceButton.textContent = isMaintenance ? '핵심 유지일로 설정됨' : '이 요일을 핵심 유지일로';
    root.querySelector('#execution-day-controls').hidden = isMaintenance;
    for (const button of root.querySelectorAll('[data-weekly-mode]')) {
      button.setAttribute('aria-pressed', String(button.dataset.weeklyMode === day.mode));
    }
    for (const input of root.querySelectorAll('input[name="weekly-run-start"]')) input.checked = input.value === day.runStart;
    root.querySelector('#weekly-run-start-controls').hidden = day.mode !== 'running' || isMaintenance;
    paintPlanner();
  }

  function paintAll() {
    paintProgress();
    paintTabs();
    paintDetail();
  }

  function refreshExecution() {
    paintProgress();
    paintPlanner();
  }

  function applyDayMutation(nextDay, message) {
    state.days[state.selectedDay] = nextDay;
    timeErrors.clear();
    persist();
    paintPlanner();
    announce(mutationStatus(message, selectedDayState()));
  }

  function selectDay(dayId) {
    if (!validDays.has(dayId) || dayId === state.selectedDay) return;
    state.selectedDay = dayId;
    editingTime = false;
    timeErrors.clear();
    persist();
    paintAll();
  }

  function setMaintenanceDay() {
    if (state.selectedDay === state.maintenanceDay) return;
    const previousId = state.maintenanceDay;
    state.days[previousId] = changeDayMode(state.days[previousId], 'normal', state.days[previousId].runStart);
    state.maintenanceDay = state.selectedDay;
    state.days[state.selectedDay] = changeDayMode(selectedDayState(), 'maintenance', '21');
    persist();
    paintAll();
    announce('핵심 유지일과 일정 시간이 변경되었습니다.');
  }

  function changeMode(mode, runStart = selectedDayState().runStart) {
    if (state.selectedDay === state.maintenanceDay || !['workout', 'normal', 'running'].includes(mode)) return;
    applyDayMutation(changeDayMode(selectedDayState(), mode, runStart), `${MODE_LABELS[mode]}로 변경했습니다.`);
    paintTabs();
    paintDetail();
  }

  function toggleAddPanel() {
    const panel = root.querySelector('#weekly-add-panel');
    panel.hidden = !panel.hidden;
    root.querySelector('#weekly-add-plan').setAttribute('aria-expanded', String(!panel.hidden));
    if (!panel.hidden) panel.querySelector('button, input')?.focus();
  }

  function toggleTimeEdit() {
    editingTime = !editingTime;
    timeErrors.clear();
    paintPlanner();
    announce(editingTime ? '일반 일정의 시작과 종료 시간을 편집할 수 있습니다.' : '시간 편집을 닫았습니다.');
  }

  function addLibrary(taskId) {
    try {
      applyDayMutation(addLibraryPlanItem(selectedDayState(), taskId), '기본 일정을 추가했습니다.');
    } catch (error) {
      announce(error.message);
    }
  }

  function addLearning() {
    const topics = Array.from(root.querySelectorAll('[data-add-learning-topic]:checked'), (input) => input.value);
    if (topics.length === 0) {
      announce('학습 주제를 하나 이상 선택하세요.');
      return;
    }
    if ([...selectedDayState().items, ...selectedDayState().unscheduled].some(({ id }) => id.startsWith('learning:'))) {
      announce('이미 추가된 일정입니다.');
      return;
    }
    try {
      applyDayMutation(addLibraryPlanItem(selectedDayState(), 'learning', { topics }), '학습 조합을 추가했습니다.');
      for (const input of root.querySelectorAll('[data-add-learning-topic]')) input.checked = false;
    } catch (error) {
      announce(error.message);
    }
  }

  function addCustom(form) {
    const formData = new FormData(form);
    try {
      const next = addCustomPlanItem(selectedDayState(), {
        label: formData.get('label'),
        category: formData.get('category'),
        durationMinutes: Number(formData.get('duration')),
      }, () => {
        customSequence += 1;
        const randomPart = globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${customSequence}`;
        return `custom-${randomPart}`;
      });
      applyDayMutation(next, '직접 일정을 추가했습니다.');
      form.reset();
      form.querySelector('[name="duration"]').value = '30';
    } catch (error) {
      announce(error.message);
      form.querySelector('[name="label"]')?.focus();
    }
  }

  function moveItem(itemId, targetIndex) {
    if (targetIndex === null) return;
    applyDayMutation(movePlanItem(selectedDayState(), itemId, targetIndex), '일정을 이동했습니다.');
  }

  function removeItem(itemId) {
    applyDayMutation(removePlanItem(selectedDayState(), itemId), '일정을 삭제했습니다.');
  }

  function saveTime(editor) {
    const itemId = editor.dataset.timeEditor;
    const startInput = editor.querySelector('[data-time-start]');
    const endInput = editor.querySelector('[data-time-end]');
    const startMinute = minuteFromInput(startInput.value);
    const endMinute = minuteFromInput(endInput.value);
    try {
      const next = updatePlanItemTime(selectedDayState(), itemId, startMinute, endMinute);
      editingTime = false;
      applyDayMutation(next, '일정 시간을 저장했습니다.');
    } catch (error) {
      timeErrors.set(itemId, error.message);
      announce(error.message);
      paintPlanner();
      root.querySelector(`[data-plan-item-id="${CSS.escape(itemId)}"] [data-time-start]`)?.focus();
    }
  }

  function resetCurrentWeek() {
    state = resetWeeklyPlans(state);
    editingTime = false;
    timeErrors.clear();
    persist();
    paintAll();
    announce('현재 주의 계획을 기본 일정으로 되돌렸습니다.');
  }

  function openPdfPreview() {
    if (typeof window !== 'undefined' && window.document === pageDocument) window.print();
    else pageDocument.defaultView?.print?.();
  }

  function handleClick(event) {
    const tab = event.target.closest?.('#weekday-tabs [data-day]');
    if (tab && root.contains(tab)) return selectDay(tab.dataset.day);
    const mode = event.target.closest?.('[data-weekly-mode]');
    if (mode && root.contains(mode)) return changeMode(mode.dataset.weeklyMode);
    if (event.target.closest?.('#set-maintenance-day')) return setMaintenanceDay();
    if (event.target.closest?.('#weekly-reset-current')) return resetCurrentWeek();
    if (event.target.closest?.('#weekly-pdf-preview')) return openPdfPreview();
    if (event.target.closest?.('#weekly-add-plan')) return toggleAddPanel();
    if (event.target.closest?.('#weekly-time-edit')) return toggleTimeEdit();

    const library = event.target.closest?.('[data-add-library]');
    if (library) return addLibrary(library.dataset.addLibrary);
    if (event.target.closest?.('[data-add-learning]')) return addLearning();

    const row = event.target.closest?.('[data-plan-item-id]');
    if (!row || !root.contains(row)) return;
    if (event.target.closest?.('[data-remove-plan]')) return removeItem(row.dataset.planItemId);
    const move = event.target.closest?.('[data-move]');
    if (move) return moveItem(row.dataset.planItemId, planMoveTargetIndex(selectedDayState(), row.dataset.planItemId, move.dataset.move));
    if (event.target.closest?.('[data-time-cancel]')) {
      timeErrors.delete(row.dataset.planItemId);
      paintPlanner();
      announce('시간 변경을 취소했습니다.');
    }
  }

  function handleChange(event) {
    if (event.target.matches('input[name="weekly-run-start"]')) changeMode('running', event.target.value);
  }

  function handleSubmit(event) {
    if (event.target.matches('#weekly-custom-form')) {
      event.preventDefault();
      addCustom(event.target);
      return;
    }
    if (event.target.matches('[data-time-editor]')) {
      event.preventDefault();
      saveTime(event.target);
    }
  }

  function handlePointerDown(event) {
    const handle = event.target.closest?.('[data-plan-drag]');
    if (!handle || !root.contains(handle)) return;
    draggedItemId = handle.closest('[data-plan-item-id]')?.dataset.planItemId ?? null;
    handle.closest('[data-plan-item-id]')?.classList.add('is-dragging');
  }

  function clearDragState() {
    const dragged = draggedItemId;
    draggedItemId = null;
    root.querySelector('.is-dragging')?.classList.remove('is-dragging');
    return dragged;
  }

  function handlePointerUp(event) {
    if (!draggedItemId) return;
    const target = event.target.closest?.('[data-plan-item-id]');
    const dragged = clearDragState();
    if (!target || target.dataset.planItemId === dragged) return;
    const targetIndex = selectedDayState().timelineOrder.indexOf(target.dataset.planItemId);
    moveItem(dragged, targetIndex);
  }

  function handlePointerCancel() {
    clearDragState();
  }

  const pageWindow = pageDocument.defaultView;

  root.addEventListener('click', handleClick);
  root.addEventListener('change', handleChange);
  root.addEventListener('submit', handleSubmit);
  root.addEventListener('pointerdown', handlePointerDown);
  pageDocument.addEventListener('pointerup', handlePointerUp);
  pageDocument.addEventListener('pointercancel', handlePointerCancel);
  pageWindow?.addEventListener('storage', refreshExecution);
  pageWindow?.addEventListener('focus', refreshExecution);
  pageWindow?.addEventListener('pageshow', refreshExecution);
  persist();
  paintAll();
  pageDocument.documentElement.dataset.weeklyReady = 'true';

  return {
    getState: () => structuredClone(state),
    getWeekKey: () => weekKey,
    reset: resetCurrentWeek,
    destroy() {
      root.removeEventListener('click', handleClick);
      root.removeEventListener('change', handleChange);
      root.removeEventListener('submit', handleSubmit);
      root.removeEventListener('pointerdown', handlePointerDown);
      pageDocument.removeEventListener('pointerup', handlePointerUp);
      pageDocument.removeEventListener('pointercancel', handlePointerCancel);
      pageWindow?.removeEventListener('storage', refreshExecution);
      pageWindow?.removeEventListener('focus', refreshExecution);
      pageWindow?.removeEventListener('pageshow', refreshExecution);
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
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot, { once: true });
  else boot();
}
