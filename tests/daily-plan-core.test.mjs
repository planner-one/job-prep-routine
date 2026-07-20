import test from 'node:test';
import assert from 'node:assert/strict';
import {
  applyUpdatedPlan,
  buildDailyExecutionSummary,
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
