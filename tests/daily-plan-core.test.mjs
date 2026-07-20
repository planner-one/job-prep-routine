import test from 'node:test';
import assert from 'node:assert/strict';
import * as dailyPlanCore from '../src/daily-plan-core.js';
import {
  applyUpdatedPlan,
  buildDailyExecutionSummary,
  calculateWeeklyExecutionProgress,
  hasExecutionInput,
  normalizePlanSnapshot,
  prepareDailyPlan,
  resolveDailyPlan,
} from '../src/daily-plan-core.js';
import { createDefaultWeeklyState } from '../src/weekly-plan-core.js';

test('날짜에 맞는 요일 계획을 해석한다', () => {
  const weekly = createDefaultWeeklyState();
  const plan = resolveDailyPlan('2026-07-22', weekly);

  assert.equal(plan.dayId, 'wed');
  assert.equal(plan.weekKey, '2026-07-20');
  assert.equal(plan.items.length > 0, true);
});

test('실행 전에는 최신 계획을 쓰고 입력 후에는 스냅샷을 고정한다', () => {
  const weekly = createDefaultWeeklyState();
  const resolved = resolveDailyPlan('2026-07-20', weekly);
  const before = prepareDailyPlan({ checkedIds: [], companies: [], memos: {} }, resolved);

  assert.equal(before.needsPlanUpdate, false);
  assert.equal(before.renderPlan.revision, resolved.revision);

  const executed = { ...before.state, checkedIds: [resolved.items[0].id], planSnapshot: resolved };
  const changed = { ...resolved, revision: resolved.revision + 1, items: resolved.items.slice(1) };
  const after = prepareDailyPlan(executed, changed);

  assert.equal(after.needsPlanUpdate, true);
  assert.equal(after.renderPlan.items[0].id, resolved.items[0].id);
});

test('변경 계획 적용 시 같은 체크와 삭제된 완료 항목을 보존한다', () => {
  const weekly = createDefaultWeeklyState();
  const oldPlan = resolveDailyPlan('2026-07-20', weekly);
  const removed = oldPlan.items[0];
  const daily = { checkedIds: [removed.id], planSnapshot: oldPlan, archivedCompletedItems: [] };
  const nextPlan = { ...oldPlan, revision: oldPlan.revision + 1, items: oldPlan.items.slice(1) };
  const merged = applyUpdatedPlan(daily, nextPlan);

  assert.equal(merged.checkedIds.includes(removed.id), true);
  assert.equal(merged.archivedCompletedItems.some(({ id }) => id === removed.id), true);
});

test('스냅샷은 허용된 계획 메타데이터만 정규화한다', () => {
  const snapshot = normalizePlanSnapshot({
    revision: 3,
    ignored: 'drop',
    items: [
      {
        id: 'custom-1',
        label: '복기',
        category: 'career',
        startMinute: 600,
        endMinute: 630,
        source: 'custom',
        completed: true,
      },
      { id: '', label: '무시', category: 'career', startMinute: 0, endMinute: 10 },
    ],
  });

  assert.deepEqual(snapshot, {
    revision: 3,
    items: [{ id: 'custom-1', label: '복기', category: 'career', startMinute: 600, endMinute: 630 }],
  });
});

test('회사 파이프라인과 완료한 스냅샷 항목만 실행 요약에 반영한다', () => {
  const summary = buildDailyExecutionSummary({
    checkedIds: ['portfolio-review', 'interview-practice', 'workout', 'run', 'Spring'],
    companies: [{ applied: true }, { applied: true }, { applied: false }],
    planSnapshot: {
      revision: 1,
      items: [
        { id: 'portfolio-review', label: '이력서·포트폴리오 숙지', category: 'career', startMinute: 570, endMinute: 600 },
        { id: 'interview-practice', label: '면접 연습·복기', category: 'career', startMinute: 600, endMinute: 720 },
        { id: 'workout', label: '아침 운동', category: 'exercise', startMinute: 360, endMinute: 450 },
        { id: 'run', label: '이동 포함 저녁 러닝', category: 'exercise', startMinute: 1260, endMinute: 1320 },
        { id: 'Spring', label: 'Spring', category: 'learning', startMinute: 1010, endMinute: 1070 },
        { id: 'unchecked', label: '미완료', category: 'learning', startMinute: 1070, endMinute: 1130 },
      ],
    },
  });

  assert.deepEqual(summary, {
    applications: 2,
    reviews: 1,
    interviews: 1,
    workouts: 1,
    runs: 1,
    learning: { Spring: 1 },
  });
});

test('실행 입력은 체크, 회사 정보, 비어 있지 않은 메모만 인식한다', () => {
  assert.equal(hasExecutionInput({ checkedIds: [] }), false);
  assert.equal(hasExecutionInput({ companies: [{ name: '회사' }] }), true);
  assert.equal(hasExecutionInput({ memos: { blocked: '  막힘  ' } }), true);
  assert.equal(hasExecutionInput({ memos: { blocked: '   ' } }), false);
});

test('legacy 완료 ID를 새 snapshot ID로 매핑하고 합쳐진 완료는 archive로 보존한다', () => {
  assert.equal(typeof dailyPlanCore.migrateLegacyDailyState, 'function');

  const running = dailyPlanCore.migrateLegacyDailyState('2026-07-20', {
    mode: 'running',
    runStart: '22',
    learningTopics: ['CS'],
    checkedIds: ['learning', 'running-breakfast', 'running-sleep', 'run', 'unknown'],
  }, 5);
  assert.deepEqual(running.checkedIds, ['learning:CS', 'breakfast', 'sleep', 'run', 'unknown']);
  assert.deepEqual(running.archivedCompletedItems, []);
  assert.equal(running.planSnapshot.items.some(({ id }) => id === 'learning:CS'), true);

  const maintenance = dailyPlanCore.migrateLegacyDailyState('2026-07-20', {
    mode: 'maintenance',
    runStart: '21',
    learningTopics: ['CS'],
    checkedIds: ['maintenance-learning', 'maintenance-planning', 'maintenance-breakfast', 'maintenance-sleep'],
  }, 3);
  assert.deepEqual(maintenance.checkedIds, ['learning:CS', 'breakfast', 'sleep']);
  assert.deepEqual(maintenance.archivedCompletedItems, [{
    id: 'maintenance-planning',
    label: '다음 주 일정·학습 주제 선정',
    category: 'learning',
  }]);
});

test('legacy learningTopics 단독 완료를 실행으로 감지해 새 snapshot과 주간 집계에 보존한다', () => {
  const legacy = {
    mode: 'normal',
    runStart: '21',
    learningTopics: ['CS'],
    checkedIds: [],
  };

  assert.equal(hasExecutionInput(legacy), true);
  const migrated = dailyPlanCore.migrateLegacyDailyState('2026-07-20', legacy, 4);
  assert.equal(migrated.planSnapshot.items.some(({ id }) => id === 'learning:CS'), true);
  assert.deepEqual(migrated.checkedIds, ['learning:CS']);

  const entries = {
    'job-prep-routine:daily:2026-07-20': JSON.stringify(migrated),
  };
  const storage = { getItem: (key) => entries[key] ?? null };
  assert.equal(calculateWeeklyExecutionProgress(storage, '2026-07-20').learning.CS, 1);
});

test('페이지 migration 전 raw legacy 학습 완료도 주간 집계에 반영한다', () => {
  const entries = {
    'job-prep-routine:daily:2026-07-20': JSON.stringify({
      learningTopics: ['CS'],
      checkedIds: [],
    }),
    'job-prep-routine:daily:2026-07-21': JSON.stringify({
      learningTopics: ['CS'],
      checkedIds: [],
      planSnapshot: {
        revision: 1,
        items: [
          { id: 'learning:CS', label: 'CS', category: 'learning', startMinute: 600, endMinute: 660 },
        ],
      },
    }),
  };
  const storage = { getItem: (key) => entries[key] ?? null };

  assert.equal(calculateWeeklyExecutionProgress(storage, '2026-07-20').learning.CS, 1);
});

test('주간 계획만 저장한 날은 진척이 증가하지 않는다', () => {
  const entries = {
    'job-prep-routine:weekly:2026-07-20': JSON.stringify(createDefaultWeeklyState()),
  };
  const storage = { getItem: (key) => entries[key] ?? null };

  assert.deepEqual(calculateWeeklyExecutionProgress(storage, '2026-07-20'), {
    applications: 0,
    reviews: 0,
    interviews: 0,
    workouts: 0,
    runs: 0,
    learning: { Spring: 0, Redis: 0, Java: 0, '프로젝트 적용': 0, CS: 0, 코딩테스트: 0 },
  });
});

test('지원 수치는 데일리 파이프라인의 실제 지원 완료만 센다', () => {
  const entries = {
    'job-prep-routine:daily:2026-07-20': JSON.stringify({
      companies: [{ applied: true }, { applied: true }, { applied: false }],
      checkedIds: [],
    }),
  };
  const storage = { getItem: (key) => entries[key] ?? null };

  assert.equal(calculateWeeklyExecutionProgress(storage, '2026-07-20').applications, 2);
});

test('연말을 걸친 7일 데일리 실행을 합치고 손상된 JSON은 건너뛴다', () => {
  const entries = {
    'job-prep-routine:daily:2026-12-28': JSON.stringify({
      checkedIds: ['Spring', 'workout'],
      companies: [{ applied: true }],
      planSnapshot: {
        revision: 0,
        items: [
          { id: 'Spring', label: 'Spring', category: 'learning', startMinute: 600, endMinute: 660 },
          { id: 'workout', label: '아침 운동', category: 'exercise', startMinute: 360, endMinute: 450 },
        ],
      },
    }),
    'job-prep-routine:daily:2026-12-31': '{broken',
    'job-prep-routine:daily:2027-01-03': JSON.stringify({
      checkedIds: ['코딩테스트', 'interview-practice'],
      companies: [{ applied: true }, { applied: true }],
      planSnapshot: {
        revision: 0,
        items: [
          { id: '코딩테스트', label: '코딩테스트', category: 'learning', startMinute: 600, endMinute: 660 },
          { id: 'interview-practice', label: '면접 연습·복기', category: 'career', startMinute: 660, endMinute: 720 },
        ],
      },
    }),
    'job-prep-routine:daily:2027-01-04': JSON.stringify({ companies: [{ applied: true }] }),
  };
  const storage = { getItem: (key) => entries[key] ?? null };

  assert.deepEqual(calculateWeeklyExecutionProgress(storage, '2026-12-28'), {
    applications: 3,
    reviews: 0,
    interviews: 1,
    workouts: 1,
    runs: 0,
    learning: { Spring: 1, Redis: 0, Java: 0, '프로젝트 적용': 0, CS: 0, 코딩테스트: 1 },
  });
});

test('계획 반영 뒤 archive로 옮겨진 완료 실행도 주간 진척에 유지한다', () => {
  const entries = {
    'job-prep-routine:daily:2026-07-20': JSON.stringify({
      checkedIds: [],
      planSnapshot: { revision: 2, items: [] },
      archivedCompletedItems: [
        { id: 'portfolio-review', label: '이력서·포트폴리오 숙지', category: 'career' },
        { id: 'interview-practice', label: '면접 연습·복기', category: 'career' },
        { id: 'workout', label: '아침 운동', category: 'exercise' },
        { id: 'run', label: '이동 포함 저녁 러닝', category: 'exercise' },
        { id: 'learning:Spring|Redis', label: 'Spring · Redis', category: 'learning' },
      ],
    }),
  };
  const storage = { getItem: (key) => entries[key] ?? null };

  assert.deepEqual(calculateWeeklyExecutionProgress(storage, '2026-07-20'), {
    applications: 0,
    reviews: 1,
    interviews: 1,
    workouts: 1,
    runs: 1,
    learning: { Spring: 1, Redis: 1, Java: 0, '프로젝트 적용': 0, CS: 0, 코딩테스트: 0 },
  });
});
