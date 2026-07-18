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
