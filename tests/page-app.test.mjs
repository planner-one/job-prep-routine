import test from 'node:test';
import assert from 'node:assert/strict';
import * as pageApp from '../src/page-app.js';
import { prepareDailyPlan } from '../src/daily-plan-core.js';

test('저장 상태의 최상위 null을 기본값으로 만들고 레거시 학습 필드를 폐기한다', () => {
  assert.equal(typeof pageApp.normalizeDailyState, 'function');

  const fromNull = pageApp.normalizeDailyState(null);
  assert.equal(fromNull.mode, 'workout');
  assert.equal(fromNull.runStart, '21');
  assert.equal(fromNull.companies.length, 4);
  assert.deepEqual(fromNull.checkedIds, []);
  assert.equal(Object.hasOwn(fromNull, 'learningTopics'), false);

  const fromLegacy = pageApp.normalizeDailyState({
    learningTopics: ['CS'],
    checkedIds: ['learning', 'learning:CS', 'Spring', 'normal-wake'],
  });
  assert.equal(Object.hasOwn(fromLegacy, 'learningTopics'), false);
  assert.deepEqual(fromLegacy.checkedIds, ['normal-wake']);
  assert.equal(pageApp.normalizeDailyState({ companies: [null] }).companies[0].platform, '사람인');
});

test('계획 스냅샷과 삭제된 완료 항목을 비손실 정규화한다', () => {
  const normalized = pageApp.normalizeDailyState({
    checkedIds: ['custom-1'],
    planSnapshot: {
      revision: 3,
      items: [{ id: 'custom-1', label: '복기', category: 'career', startMinute: 600, endMinute: 630 }],
    },
    archivedCompletedItems: [{ id: 'old-1', label: '이전 완료' }],
  });

  assert.equal(normalized.planSnapshot.revision, 3);
  assert.equal(normalized.planSnapshot.items[0].id, 'custom-1');
  assert.equal(normalized.archivedCompletedItems[0].id, 'old-1');
});

test('같은 revision이어도 계획 내용이 다르면 변경 대기로 판단한다', () => {
  const item = {
    id: 'review',
    label: '포트폴리오 복기',
    category: 'career',
    startMinute: 600,
    endMinute: 630,
  };
  const state = {
    checkedIds: ['review'],
    planSnapshot: { revision: 0, items: [item] },
  };

  assert.equal(prepareDailyPlan(state, { revision: 0, items: [{ ...item }] }).needsPlanUpdate, false);
  assert.equal(prepareDailyPlan(state, {
    revision: 0,
    items: [{ ...item, startMinute: 660, endMinute: 690 }],
  }).needsPlanUpdate, true);
});
