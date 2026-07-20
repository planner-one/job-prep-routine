import test from 'node:test';
import assert from 'node:assert/strict';
import * as pageApp from '../src/page-app.js';

test('저장 상태의 최상위 null과 비배열 학습 주제를 기본값으로 정규화한다', () => {
  assert.equal(typeof pageApp.normalizeDailyState, 'function');

  const fromNull = pageApp.normalizeDailyState(null);
  assert.equal(fromNull.mode, 'workout');
  assert.equal(fromNull.runStart, '21');
  assert.equal(fromNull.companies.length, 4);
  assert.deepEqual(fromNull.learningTopics, []);
  assert.deepEqual(fromNull.checkedIds, []);

  assert.deepEqual(pageApp.normalizeDailyState({ learningTopics: 'CS' }).learningTopics, []);
  assert.deepEqual(pageApp.normalizeDailyState({ learningTopics: {} }).learningTopics, []);
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
