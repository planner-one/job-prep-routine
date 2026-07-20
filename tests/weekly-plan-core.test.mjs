import test from 'node:test';
import assert from 'node:assert/strict';
import { getSchedule } from '../src/routine-data.js';
import {
  addCustomPlanItem,
  addLibraryPlanItem,
  changeDayMode,
  createDefaultWeeklyState,
  formatMinuteRange,
  getFixedAnchors,
  getDayTimeline,
  movePlanItem,
  normalizeWeeklyState,
  removePlanItem,
  resetWeeklyPlans,
  updatePlanItemTime,
  weekMondayKey,
  weekdayIdForDate,
} from '../src/weekly-plan-core.js';

test('모드별 식사와 취침 앵커를 분 단위로 만든다', () => {
  assert.deepEqual(
    getFixedAnchors('workout', '21').map(({ id, startMinute, endMinute }) => [id, startMinute, endMinute]),
    [
      ['breakfast', 450, 530],
      ['lunch', 780, 840],
      ['dinner', 1130, 1190],
      ['sleep', 1380, 1440],
    ],
  );
  assert.equal(getFixedAnchors('running', '22').at(-1).startMinute, 1440);
});

test('순서를 바꾸면 소요시간을 지키고 넘친 항목은 미배치한다', () => {
  const day = createDefaultWeeklyState().days.mon;
  const result = movePlanItem(day, 'interview-practice', day.timelineOrder.length - 1);
  assert.equal(result.items.every((item) => item.endMinute <= 1440), true);
  assert.equal(result.items.every((item, index, items) => index === 0 || items[index - 1].endMinute <= item.startMinute), true);
  assert.equal(result.unscheduled.every((item) => item.reason === 'insufficient-time'), true);
});

test('직접 일정은 안정적인 ID와 소요시간을 저장한다', () => {
  const day = createDefaultWeeklyState().days.tue;
  const next = addCustomPlanItem(
    day,
    { label: '개인 프로젝트 README 정리', category: 'learning', durationMinutes: 40 },
    () => 'custom-fixed-id',
  );
  assert.equal(next.items.some(({ id, durationMinutes }) => id === 'custom-fixed-id' && durationMinutes === 40), true);
});

test('기존 체크는 레거시 완료로 보존하고 계획과 분리한다', () => {
  const normalized = normalizeWeeklyState({
    selectedDay: 'wed',
    maintenanceDay: 'sun',
    days: { wed: { mode: 'running', runStart: '22', tasks: { interview: true }, applications: [true] } },
  });
  assert.equal(normalized.schemaVersion, 2);
  assert.equal(normalized.days.wed.legacyCompletion.tasks.interview, true);
  assert.equal(normalized.days.wed.legacyCompletion.applications[0], true);
  assert.equal(normalized.days.wed.items.some(({ completed }) => completed), false);
});

test('고정 앵커와 겹치는 수동 시간은 거부한다', () => {
  const day = createDefaultWeeklyState().days.mon;
  assert.throws(() => updatePlanItemTime(day, 'portfolio-review', 790, 820), /고정 일정과 겹칩니다/);
});

test('주간 키와 요일 ID 및 분 단위 표시를 계산한다', () => {
  assert.equal(weekMondayKey('2026-07-16'), '2026-07-13');
  assert.equal(weekdayIdForDate('2026-07-19'), 'sun');
  assert.equal(formatMinuteRange(570, 600), '09:30–10:00');
  assert.equal(formatMinuteRange(1380, 1380), '23:00');
  assert.equal(formatMinuteRange(1440, 1440), '24:00');
});

test('라이브러리 항목은 중복을 막고 선택한 학습 주제를 원래 순서로 합친다', () => {
  const blank = { mode: 'normal', runStart: '21', items: [], unscheduled: [], timelineOrder: ['breakfast', 'lunch', 'dinner', 'sleep'], revision: 0 };
  const withTopics = addLibraryPlanItem(blank, 'learning', { topics: ['Redis', 'Spring', '알 수 없음'] });
  const item = withTopics.items[0];
  assert.equal(item.label, 'Spring · Redis');
  assert.equal(item.durationMinutes, 120);
  assert.throws(() => addLibraryPlanItem(withTopics, 'learning', { topics: ['Spring', 'Redis'] }), /이미 추가된 일정/);
});

test('타임라인은 앵커와 미배치 항목을 함께 시간순으로 제공한다', () => {
  const day = createDefaultWeeklyState().days.mon;
  const moved = movePlanItem(day, 'interview-practice', day.timelineOrder.length - 1);
  const timeline = getDayTimeline(moved);
  assert.equal(timeline.some((item) => item.fixed && item.id === 'lunch'), true);
  assert.equal(timeline.filter((item) => item.unscheduled).every((item) => item.reason === 'insufficient-time'), true);
  assert.equal(timeline.every((item, index, items) => index === 0 || items[index - 1].startMinute <= item.startMinute), true);
});

test('일반 일정 삭제와 모드 변경은 원본을 바꾸지 않고 사용자 일정은 보존한다', () => {
  const day = addCustomPlanItem(
    createDefaultWeeklyState().days.mon,
    { label: '개인 일정', category: 'career', durationMinutes: 30 },
    () => 'custom-kept',
  );
  const changed = changeDayMode(day, 'running', '22');
  assert.equal(day.mode, 'workout');
  assert.equal(changed.mode, 'running');
  assert.equal(changed.items.some(({ id }) => id === 'custom-kept'), true);
  const removed = removePlanItem(changed, 'custom-kept');
  assert.equal(removed.items.some(({ id }) => id === 'custom-kept'), false);
  assert.equal(removed.timelineOrder.includes('custom-kept'), false);
});

test('초기화는 계획만 기본화하고 레거시 완료 기록은 유지한다', () => {
  const state = normalizeWeeklyState({ days: { mon: { tasks: { interview: true } } } });
  const reset = resetWeeklyPlans(state);
  assert.equal(reset.days.mon.legacyCompletion.tasks.interview, true);
  assert.equal(reset.days.mon.items.some((item) => item.id === 'interview-practice'), true);
});

test('기본 계획은 식사와 취침을 앵커로 분리하고 나머지 원본 일정을 모두 보존한다', () => {
  const day = createDefaultWeeklyState().days.mon;
  const sourceItems = getSchedule('workout', '21').filter((item) => item.category !== 'meal' && !item.id.endsWith('-sleep'));

  assert.deepEqual(
    day.items.map(({ id, label, category }) => ({ id, label, category })),
    sourceItems.map(({ id, label, category }) => ({ id, label, category })),
  );
  assert.equal(day.items.find(({ id }) => id === 'workout-wake').durationMinutes, 20);
  assert.equal(day.items.find(({ id }) => id === 'afternoon-break').durationMinutes, 20);
  assert.equal(day.items.find(({ id }) => id === 'learning').durationMinutes, 120);
  assert.equal(day.items.find(({ id }) => id === 'workout-evening').durationMinutes, 70);
  assert.equal(day.items.find(({ id }) => id === 'workout-extension').durationMinutes, 60);
});

test('v2의 빈 계획과 revision은 기본 계획으로 되살리지 않고 보존한다', () => {
  const normalized = normalizeWeeklyState({
    schemaVersion: 2,
    days: {
      mon: {
        mode: 'normal',
        runStart: '21',
        items: [],
        unscheduled: [],
        timelineOrder: ['breakfast', 'lunch', 'dinner', 'sleep'],
        revision: 7,
      },
    },
  });

  assert.deepEqual(normalized.days.mon.items, []);
  assert.deepEqual(normalized.days.mon.unscheduled, []);
  assert.deepEqual(normalized.days.mon.timelineOrder, ['breakfast', 'lunch', 'dinner', 'sleep']);
  assert.equal(normalized.days.mon.revision, 7);
});

test('Date 입력은 오전 2시 전이면 전날 논리 날짜로 주와 요일을 계산한다', () => {
  const beforeCutoff = new Date(2026, 6, 20, 1, 0, 0);

  assert.equal(weekdayIdForDate(beforeCutoff), 'sun');
  assert.equal(weekMondayKey(beforeCutoff), '2026-07-13');
  assert.equal(weekdayIdForDate('2026-07-20'), 'mon');
  assert.equal(weekMondayKey('2026-07-20'), '2026-07-20');
});

test('사용자 일정 ID는 앵커와 기존 배치 또는 미배치 일정의 ID를 사용할 수 없다', () => {
  const blank = { mode: 'normal', runStart: '21', items: [], unscheduled: [], timelineOrder: ['breakfast', 'lunch', 'dinner', 'sleep'], revision: 0 };
  const input = { label: '개인 일정', category: 'career', durationMinutes: 30 };

  for (const anchorId of ['breakfast', 'lunch', 'dinner', 'sleep']) {
    assert.throws(() => addCustomPlanItem(blank, input, () => anchorId), /예약된 일정 ID/);
  }
  assert.throws(
    () => addCustomPlanItem({ ...blank, unscheduled: [{ id: 'pending-item', ...input }] }, input, () => 'pending-item'),
    /이미 사용 중인 일정 ID/,
  );
});
