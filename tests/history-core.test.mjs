import test from 'node:test';
import assert from 'node:assert/strict';
import {
  buildHistoryRecord,
  buildPeriodRecords,
  collectHistoryRecords,
  summarizeHistory,
} from '../src/history-core.js';
import { createDefaultWeeklyState, normalizeWeeklyState } from '../src/weekly-plan-core.js';
import { dailyProgressExpected, dailyProgressFixture } from './fixtures/daily-progress-fixture.mjs';

function memoryStorage(entries = {}) {
  const values = new Map(Object.entries(entries));
  return {
    get length() {
      return values.size;
    },
    key(index) {
      return Array.from(values.keys())[index] ?? null;
    },
    getItem(key) {
      return values.get(key) ?? null;
    },
    setItem(key, value) {
      values.set(key, value);
    },
    removeItem(key) {
      values.delete(key);
    },
  };
}

const dailyState = {
  mode: 'workout',
  runStart: '21',
  checkedIds: ['workout', 'interview-practice', 'applications', 'learning'],
  companies: [
    { name: '알파', platform: '원티드', analyzed: true, letter: true, applied: true, link: 'https://example.com/a' },
    { name: '베타', platform: '점핏', analyzed: true, letter: false, applied: false, link: '' },
  ],
  learningTopics: ['Spring', 'Redis'],
  memos: {
    implemented: 'Redis 캐시 적용',
    blocked: 'TTL 정책',
    firstAction: '테스트 보완',
  },
};

const weeklyState = {
  selectedDay: 'mon',
  maintenanceDay: 'sun',
  days: {
    mon: {
      mode: 'workout',
      runStart: '21',
      applications: [true, true, true, false],
      tasks: { activity: true, review: true, interview: true, mealRest: false },
      learningTopics: ['Spring', 'CS'],
      maintenance: {},
    },
    sun: {
      mode: 'normal',
      runStart: '21',
      applications: [false, false, false, false],
      tasks: {},
      learningTopics: [],
      maintenance: {
        deadline: true,
        application: false,
        review: true,
        interview: true,
        learningReview: true,
        nextWeek: false,
        rest: true,
      },
    },
  },
};

test('하루의 데일리와 주간 체크를 한 기록으로 합친다', () => {
  const record = buildHistoryRecord({
    date: '2026-07-13',
    daily: dailyState,
    weekly: weeklyState,
  });

  assert.equal(record.date, '2026-07-13');
  assert.equal(record.mode, 'workout');
  assert.equal(record.isMaintenance, false);
  assert.equal(record.metrics.applications, 1);
  assert.equal(record.metrics.interview, 1);
  assert.equal(record.metrics.learning, 1);
  assert.equal(record.metrics.exercise, 1);
  assert.deepEqual(record.learningTopics, ['Spring', 'Redis', 'CS']);
  assert.deepEqual(record.memos, dailyState.memos);
  assert.equal(record.companies.length, 2);
  assert.equal(record.completedSchedule.some((item) => item.id === 'workout'), true);
  assert.equal(record.completion.source, 'daily');
  assert.equal(record.completion.completed, 10);
  assert.equal(record.completion.total, 34);
  assert.equal(record.completion.percent, 29);
  assert.equal(record.hasActivity, true);
});

test('세 보드 상세는 모두 보존하지만 완료율은 우선순위가 높은 한 보드만 사용한다', () => {
  const record = buildHistoryRecord({
    date: '2026-07-13',
    daily: dailyState,
    roadmap: {
      mode: 'running',
      runStart: '21',
      checkedIds: ['run'],
      learningTopics: ['Java'],
    },
    weekly: weeklyState,
  });

  assert.equal(record.completion.source, 'daily');
  assert.deepEqual(record.dailyCompletedSchedule.map(({ id }) => id), [
    'workout',
    'interview-practice',
    'applications',
    'learning',
  ]);
  assert.deepEqual(record.roadmapCompletedSchedule.map(({ id }) => id), ['run']);
  assert.equal(record.weeklyChecks.completed.length, 6);
  assert.equal(record.completion.completed, 10);
  assert.deepEqual(record.learningTopics, ['Spring', 'Redis', 'Java', 'CS']);
});

test('데일리 완료율은 공통 저장 모델 계약과 같은 분자·분모·백분율을 사용한다', () => {
  const record = buildHistoryRecord({ date: '2026-07-18', daily: dailyProgressFixture });
  assert.deepEqual(record.completion, { source: 'daily', ...dailyProgressExpected });
});

test('데일리 스냅샷의 사용자 일정 이름과 분 단위 시간을 기록에 보존한다', () => {
  const record = buildHistoryRecord({
    date: '2026-07-20',
    daily: {
      checkedIds: ['custom-1'],
      planSnapshot: {
        revision: 3,
        items: [{
          id: 'custom-1',
          label: 'README 정리',
          category: 'learning',
          startMinute: 1000,
          endMinute: 1040,
        }],
      },
      companies: [],
    },
  });

  assert.equal(record.completedSchedule[0].label, 'README 정리');
  assert.equal(record.completedSchedule[0].time, '16:40–17:20');
});

test('현재 스냅샷과 이전 계획 완료 항목을 ID 기준 중복 없이 합친다', () => {
  const current = {
    id: 'custom-1',
    label: '현재 일정',
    category: 'career',
    startMinute: 600,
    endMinute: 630,
  };
  const archived = {
    id: 'old-1',
    label: '이전 계획에서 완료',
    category: 'learning',
    startMinute: 630,
    endMinute: 690,
  };
  const record = buildHistoryRecord({
    date: '2026-07-20',
    daily: {
      checkedIds: ['custom-1'],
      planSnapshot: { revision: 2, items: [current] },
      archivedCompletedItems: [current, archived, archived],
      companies: [],
    },
  });

  assert.deepEqual(record.dailyCompletedSchedule.map(({ id }) => id), ['custom-1', 'old-1']);
  assert.equal(record.dailyCompletedSchedule.filter(({ id }) => id === 'custom-1').length, 1);
});

test('완료한 snapshot과 archive 사용자 일정의 분류를 학습일과 운동일 지표에 반영한다', () => {
  const record = buildHistoryRecord({
    date: '2026-07-20',
    daily: {
      checkedIds: ['custom-learning'],
      learningTopics: [],
      planSnapshot: {
        revision: 2,
        items: [{
          id: 'custom-learning',
          label: '기술 문서 읽기',
          category: 'learning',
          startMinute: 600,
          endMinute: 660,
        }],
      },
      archivedCompletedItems: [{
        id: 'custom-exercise',
        label: '스트레칭',
        category: 'exercise',
        startMinute: 660,
        endMinute: 690,
      }],
      companies: [],
    },
  });

  assert.equal(record.metrics.learning, 1);
  assert.equal(record.metrics.exercise, 1);
  assert.equal(summarizeHistory([record]).learningDays, 1);
  assert.equal(summarizeHistory([record]).exerciseDays, 1);
});

test('기본 회복성 exercise 항목만 완료한 날은 운동일로 세지 않는다', () => {
  const items = [
    'afternoon-break',
    'normal-shower',
    'normal-sleep',
    'maintenance-rest',
  ].map((id, index) => ({
    id,
    label: id,
    category: 'exercise',
    startMinute: 600 + index * 30,
    endMinute: 630 + index * 30,
  }));
  const record = buildHistoryRecord({
    date: '2026-07-20',
    daily: {
      checkedIds: items.map(({ id }) => id),
      planSnapshot: { revision: 1, items },
      companies: [],
    },
  });

  assert.equal(record.metrics.exercise, 0);
  assert.equal(summarizeHistory([record]).exerciseDays, 0);
});

test('사용자 정의 exercise snapshot과 archive 및 기존 workout과 run은 운동일로 센다', () => {
  const customSnapshot = buildHistoryRecord({
    date: '2026-07-20',
    daily: {
      checkedIds: ['custom-stretch'],
      planSnapshot: {
        revision: 1,
        items: [{
          id: 'custom-stretch',
          label: '스트레칭',
          category: 'exercise',
          startMinute: 600,
          endMinute: 630,
        }],
      },
      companies: [],
    },
  });
  const customArchive = buildHistoryRecord({
    date: '2026-07-21',
    daily: {
      checkedIds: [],
      planSnapshot: { revision: 2, items: [] },
      archivedCompletedItems: [{
        id: 'custom-walk',
        label: '산책',
        category: 'exercise',
      }],
      companies: [],
    },
  });
  const workout = buildHistoryRecord({
    date: '2026-07-22',
    daily: { mode: 'workout', checkedIds: ['workout'], companies: [] },
  });
  const run = buildHistoryRecord({
    date: '2026-07-23',
    daily: { mode: 'running', checkedIds: ['run'], companies: [] },
  });

  for (const record of [customSnapshot, customArchive, workout, run]) {
    assert.equal(record.metrics.exercise, 1);
  }
});

test('snapshot period는 데일리와 같은 13시와 18시 50분 경계를 사용한다', () => {
  const items = [
    { id: 'before-lunch', startMinute: 779, endMinute: 780 },
    { id: 'lunch', startMinute: 780, endMinute: 840 },
    { id: 'before-evening', startMinute: 1129, endMinute: 1130 },
    { id: 'evening', startMinute: 1130, endMinute: 1160 },
  ].map((item) => ({ ...item, label: item.id, category: 'career' }));
  const record = buildHistoryRecord({
    date: '2026-07-20',
    daily: {
      checkedIds: items.map(({ id }) => id),
      planSnapshot: { revision: 1, items },
      companies: [],
    },
  });

  assert.deepEqual(
    record.completedSchedule.map(({ id, period }) => ({ id, period })),
    [
      { id: 'before-lunch', period: 'morning' },
      { id: 'lunch', period: 'afternoon' },
      { id: 'before-evening', period: 'afternoon' },
      { id: 'evening', period: 'evening' },
    ],
  );
});

test('revision 없는 호환 스냅샷도 유효한 항목 배열을 기록에 사용한다', () => {
  const record = buildHistoryRecord({
    date: '2026-07-20',
    daily: {
      checkedIds: ['compat-1'],
      planSnapshot: {
        items: [{
          id: 'compat-1',
          label: '호환 일정',
          category: 'career',
          startMinute: 570,
          endMinute: 600,
        }],
      },
      companies: [],
    },
  });

  assert.deepEqual(
    record.completedSchedule.map(({ id, time, label }) => ({ id, time, label })),
    [{ id: 'compat-1', time: '09:30–10:00', label: '호환 일정' }],
  );
});

test('v2에 보존된 레거시 체크는 데일리가 없을 때만 완료율 fallback으로 사용한다', () => {
  const oldWeeklyFixture = {
    selectedDay: 'mon',
    maintenanceDay: 'sun',
    days: {
      mon: {
        mode: 'workout',
        tasks: { interview: true },
        applications: [true, false, false, false],
      },
    },
  };
  const weekly = normalizeWeeklyState(oldWeeklyFixture);
  const weeklyRecord = buildHistoryRecord({ date: '2026-07-20', weekly });
  const dailyRecord = buildHistoryRecord({
    date: '2026-07-20',
    daily: { checkedIds: [], companies: [] },
    weekly,
  });

  assert.equal(weeklyRecord.completion.source, 'weekly');
  assert.equal(weeklyRecord.weeklyChecks.completed.includes('interview'), true);
  assert.equal(dailyRecord.completion.source, 'daily');
});

test('새 주간 계획만 있는 날짜는 활동 기록이 아니다', () => {
  const record = buildHistoryRecord({
    date: '2026-07-20',
    weekly: createDefaultWeeklyState(),
  });

  assert.equal(record.hasActivity, false);
  assert.equal(record.completion.source, null);
  assert.deepEqual(record.weeklyChecks.completed, []);
});

test('데일리가 없으면 주간 실행 체크와 학습 실행을 하루 완료율로 사용한다', () => {
  const record = buildHistoryRecord({ date: '2026-07-13', weekly: weeklyState });

  assert.equal(record.completion.source, 'weekly');
  assert.equal(record.completion.completed, 7);
  assert.equal(record.completion.total, 9);
  assert.equal(record.completion.percent, 78);
  assert.equal(record.metrics.applications, 3);
});

test('핵심 유지일은 유지 체크 일곱 개만 완료율에 반영한다', () => {
  const record = buildHistoryRecord({
    date: '2026-07-19',
    weekly: weeklyState,
  });

  assert.equal(record.isMaintenance, true);
  assert.equal(record.mode, 'maintenance');
  assert.deepEqual(record.weeklyChecks.completed, ['deadline', 'review', 'interview', 'learningReview', 'rest']);
  assert.equal(record.completion.completed, 5);
  assert.equal(record.completion.total, 7);
  assert.equal(record.completion.percent, 71);
  assert.equal(record.metrics.applications, 0);
  assert.equal(record.metrics.interview, 1);
  assert.equal(record.metrics.learning, 1);
});

test('데일리 핵심 유지 시간표의 면접과 학습 체크도 활동 지표에 반영한다', () => {
  const record = buildHistoryRecord({
    date: '2026-07-19',
    daily: {
      mode: 'maintenance',
      runStart: '21',
      checkedIds: ['maintenance-learning', 'maintenance-interview'],
      companies: [],
      learningTopics: [],
      memos: {},
    },
  });

  assert.equal(record.metrics.interview, 1);
  assert.equal(record.metrics.learning, 1);
});

test('선택 기간은 기록이 없는 날짜도 0으로 채운다', () => {
  const storage = memoryStorage({
    'job-prep-routine:daily:2026-07-18': JSON.stringify(dailyState),
    'job-prep-routine:weekly:2026-07-13': JSON.stringify(weeklyState),
  });

  const records = buildPeriodRecords(storage, '2026-07-18', 3);
  assert.deepEqual(records.map(({ date }) => date), ['2026-07-16', '2026-07-17', '2026-07-18']);
  assert.equal(records[0].completion.percent, 0);
  assert.equal(records[1].completion.percent, 0);
  assert.equal(records[2].hasActivity, true);
});

test('최상위 형태가 손상된 저장값은 정상 기록으로 취급하지 않는다', () => {
  const storage = memoryStorage({
    'job-prep-routine:daily:2026-07-18': '[]',
    'job-prep-routine:roadmap:2026-07-18': JSON.stringify({
      mode: 'running',
      runStart: '21',
      checkedIds: ['run'],
      learningTopics: [],
    }),
  });

  const [record] = buildPeriodRecords(storage, '2026-07-18', 1);
  assert.equal(record.completion.source, 'roadmap');
  assert.equal(record.completion.completed, 1);
  assert.equal(record.hasActivity, true);
});

test('저장된 모든 의미 있는 날짜 기록을 최신순으로 모은다', () => {
  const storage = memoryStorage({
    'job-prep-routine:daily:2026-07-13': JSON.stringify(dailyState),
    'job-prep-routine:roadmap:2026-07-12': JSON.stringify({
      mode: 'running',
      runStart: '21',
      checkedIds: ['run'],
      learningTopics: ['Java'],
    }),
    'job-prep-routine:weekly:2026-07-13': JSON.stringify(weeklyState),
    'unrelated:key': 'ignored',
  });

  const records = collectHistoryRecords(storage);
  assert.deepEqual(records.map(({ date }) => date), ['2026-07-19', '2026-07-13', '2026-07-12']);
  assert.equal(records.find(({ date }) => date === '2026-07-12').mode, 'running');
});

test('기간 생산성 요약은 완료율과 활동 일수를 계산한다', () => {
  const records = [
    buildHistoryRecord({ date: '2026-07-13', daily: dailyState, weekly: weeklyState }),
    buildHistoryRecord({ date: '2026-07-14' }),
    buildHistoryRecord({ date: '2026-07-19', weekly: weeklyState }),
  ];

  assert.deepEqual(summarizeHistory(records), {
    averageCompletion: 33,
    activeDays: 2,
    applications: 1,
    interviewDays: 2,
    learningDays: 2,
    exerciseDays: 1,
  });
});
