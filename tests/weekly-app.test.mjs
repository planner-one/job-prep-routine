import test from 'node:test';
import assert from 'node:assert/strict';

const weeklyApp = await import('../src/weekly-app.js').catch(() => ({}));

function assertFunction(name) {
  assert.equal(typeof weeklyApp[name], 'function', `${name} 함수를 제공해야 한다`);
}

test('주간 앱은 계획 코어의 스키마 v2 상태와 단일 시간 범위를 사용한다', () => {
  assertFunction('createDefaultWeeklyState');
  assertFunction('formatMinuteRange');
  const state = weeklyApp.createDefaultWeeklyState();

  assert.equal(state.schemaVersion, 2);
  assert.equal(weeklyApp.formatMinuteRange(570, 600), '09:30–10:00');
  assert.equal(weeklyApp.formatMinuteRange(1440, 1440), '24:00');
});

test('연말을 걸치는 주 범위는 시작 연도와 종료 연도를 모두 표시한다', () => {
  assertFunction('formatWeekRange');
  assert.equal(weeklyApp.formatWeekRange('2026-07-13'), '2026년 7월 13일–19일');
  assert.equal(weeklyApp.formatWeekRange('2026-12-28'), '2026년 12월 28일–2027년 1월 3일');
});

test('오전 2시 이전 Date 초기화는 논리 날짜와 같은 주 키를 사용한다', () => {
  assertFunction('resolveWeeklyPageDateKeys');

  assert.deepEqual(weeklyApp.resolveWeeklyPageDateKeys(new Date(2026, 6, 20, 1, 30)), {
    todayKey: '2026-07-19',
    weekKey: '2026-07-13',
  });
  assert.deepEqual(weeklyApp.resolveWeeklyPageDateKeys(new Date(2026, 6, 20, 2, 0)), {
    todayKey: '2026-07-20',
    weekKey: '2026-07-20',
  });
});

test('시간 입력은 분 단위로 바꾸고 24:00 경계를 허용한다', () => {
  assertFunction('minuteFromInput');
  assert.equal(weeklyApp.minuteFromInput('05:40'), 340);
  assert.equal(weeklyApp.minuteFromInput('24:00'), 1440);
  assert.equal(weeklyApp.minuteFromInput('24:01'), null);
  assert.equal(weeklyApp.minuteFromInput('9:30'), null);
});

test('위·아래 이동은 앵커를 포함한 타임라인의 인접 위치를 계산한다', () => {
  assertFunction('planMoveTargetIndex');
  const day = {
    timelineOrder: ['breakfast', 'scan', 'portfolio-review', 'lunch', 'sleep'],
  };

  assert.equal(weeklyApp.planMoveTargetIndex(day, 'scan', 'up'), 0);
  assert.equal(weeklyApp.planMoveTargetIndex(day, 'scan', 'down'), 2);
  assert.equal(weeklyApp.planMoveTargetIndex(day, 'missing', 'down'), null);
});

test('주간 일정 행은 데일리 실행과 날짜 및 계획 revision으로 읽기 전용 상태를 정한다', () => {
  assertFunction('resolveWeeklyRowState');
  const matchedExecution = {
    checkedIds: ['portfolio-review'],
    companies: [],
    planSnapshot: { revision: 2, items: [] },
  };

  assert.equal(weeklyApp.resolveWeeklyRowState('portfolio-review', matchedExecution, 2, '2026-07-20', '2026-07-20'), '완료');
  assert.equal(weeklyApp.resolveWeeklyRowState('portfolio-review', {}, 2, '2026-07-19', '2026-07-20'), '기록 없음');
  assert.equal(weeklyApp.resolveWeeklyRowState('portfolio-review', {}, 2, '2026-07-21', '2026-07-20'), '예정');
  assert.equal(weeklyApp.resolveWeeklyRowState(
    'portfolio-review',
    { checkedIds: [], companies: [{ name: '실행 기록' }], planSnapshot: { revision: 1, items: [] } },
    2,
    '2026-07-20',
    '2026-07-20',
  ), '계획 변경 대기');
});

test('같은 revision이어도 현재 계획 내용이 snapshot과 다르면 계획 변경 대기다', () => {
  const oldItem = {
    id: 'portfolio-review',
    label: '기존 숙지',
    category: 'career',
    startMinute: 570,
    endMinute: 600,
  };
  const daily = {
    checkedIds: [],
    companies: [{ name: '실행 기록' }],
    planSnapshot: { revision: 2, items: [oldItem] },
  };
  const currentPlan = {
    revision: 2,
    items: [{ ...oldItem, label: '변경된 숙지' }],
  };

  assert.equal(weeklyApp.resolveWeeklyRowState(
    oldItem.id,
    daily,
    2,
    '2026-07-20',
    '2026-07-20',
    currentPlan,
  ), '계획 변경 대기');
});
