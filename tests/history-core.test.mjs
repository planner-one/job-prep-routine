import test from 'node:test';
import assert from 'node:assert/strict';
import {
  buildHistoryRecord,
  buildPeriodRecords,
  collectHistoryRecords,
  summarizeHistory,
} from '../src/history-core.js';
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
