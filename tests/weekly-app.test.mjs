import test from 'node:test';
import assert from 'node:assert/strict';

const weeklyApp = await import('../src/weekly-app.js').catch(() => ({}));

function assertFunction(name) {
  assert.equal(typeof weeklyApp[name], 'function', `${name} 함수를 제공해야 한다`);
}

test('해당 날짜가 속한 주의 월요일을 주간 키로 계산한다', () => {
  assertFunction('weekMondayKey');
  assert.equal(weeklyApp.weekMondayKey('2026-07-13'), '2026-07-13');
  assert.equal(weeklyApp.weekMondayKey('2026-07-16'), '2026-07-13');
  assert.equal(weeklyApp.weekMondayKey('2026-07-19'), '2026-07-13');
  assert.equal(weeklyApp.weekMondayKey('2026-07-20'), '2026-07-20');
});

test('연말을 걸치는 주 범위는 시작 연도와 종료 연도를 모두 표시한다', () => {
  assertFunction('formatWeekRange');
  assert.equal(weeklyApp.formatWeekRange('2026-07-13'), '2026년 7월 13일–19일');
  assert.equal(weeklyApp.formatWeekRange('2026-12-28'), '2026년 12월 28일–2027년 1월 3일');
});

test('저장 상태를 일곱 요일·한 유지일·허용된 모드와 학습 항목으로 정규화한다', () => {
  assertFunction('normalizeWeeklyState');
  const normalized = weeklyApp.normalizeWeeklyState({
    selectedDay: 'wed',
    maintenanceDay: 'wed',
    days: {
      wed: {
        mode: 'unknown',
        runStart: '22',
        applications: [1, 0, true, false, true],
        tasks: { activity: 1, review: true },
        learningTopics: ['CS', 'Spring', '알 수 없음', 'Spring'],
      },
    },
  });

  assert.equal(Object.keys(normalized.days).length, 7);
  assert.equal(normalized.selectedDay, 'wed');
  assert.equal(normalized.maintenanceDay, 'wed');
  assert.equal(normalized.days.wed.mode, 'normal');
  assert.equal(normalized.days.wed.runStart, '22');
  assert.deepEqual(normalized.days.wed.applications, [true, false, true, false]);
  assert.deepEqual(normalized.days.wed.learningTopics, ['Spring', 'CS']);
  assert.equal(normalized.days.wed.tasks.activity, true);
  assert.equal(normalized.days.wed.tasks.interview, false);
  assert.equal(weeklyApp.normalizeWeeklyState({ maintenanceDay: 'bad' }).maintenanceDay, 'sun');
});

test('실행 모드가 실제로 바뀔 때만 이전 의미의 활동 완료를 초기화한다', () => {
  assertFunction('updateExecutionMode');
  const day = { mode: 'normal', tasks: { activity: true } };

  assert.equal(weeklyApp.updateExecutionMode(day, 'normal'), false);
  assert.equal(day.tasks.activity, true);
  assert.equal(weeklyApp.updateExecutionMode(day, 'running'), true);
  assert.equal(day.mode, 'running');
  assert.equal(day.tasks.activity, false);
});

test('실행일 체크와 유지일의 실제 지원·면접 체크에서 주간 진척을 계산한다', () => {
  assertFunction('calculateWeeklyProgress');
  const progress = weeklyApp.calculateWeeklyProgress({
    selectedDay: 'mon',
    maintenanceDay: 'sun',
    days: {
      mon: {
        mode: 'workout',
        applications: [true, true, true, false],
        tasks: { activity: true, review: true, interview: true, mealRest: true },
        learningTopics: ['Spring', 'Java', '프로젝트 적용'],
      },
      wed: {
        mode: 'running',
        runStart: '22',
        applications: [true, true, true, true],
        tasks: { activity: true, review: true, interview: true, mealRest: true },
        learningTopics: ['Spring', 'Redis', '프로젝트 적용'],
      },
      sun: {
        mode: 'workout',
        applications: [true, true, true, true],
        tasks: { activity: true, review: true, interview: true, mealRest: true },
        learningTopics: ['Spring', 'Redis', 'Java'],
        maintenance: {
          deadline: true,
          application: true,
          review: true,
          interview: true,
          learningReview: true,
          nextWeek: true,
          rest: true,
        },
      },
    },
  });

  assert.deepEqual(progress, {
    applications: 8,
    reviews: 2,
    interviews: 3,
    workouts: 1,
    runs: 1,
    learning: {
      Spring: 2,
      Redis: 1,
      Java: 1,
      '프로젝트 적용': 2,
      CS: 0,
      코딩테스트: 0,
    },
  });
});
