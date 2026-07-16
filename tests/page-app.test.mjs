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

test('로드맵 저장 상태를 허용된 모드·러닝 시각·학습 조합으로 정규화한다', () => {
  assert.equal(typeof pageApp.initRoadmapPage, 'function');
  assert.equal(typeof pageApp.normalizeRoadmapState, 'function');

  assert.deepEqual(pageApp.normalizeRoadmapState(null), {
    mode: 'workout',
    runStart: '21',
    checkedIds: [],
    learningTopics: [],
  });
  assert.deepEqual(
    pageApp.normalizeRoadmapState({
      mode: 'running',
      runStart: '22',
      checkedIds: ['run', 'run', null],
      learningTopics: ['CS', 'Spring', '알 수 없음'],
    }),
    {
      mode: 'running',
      runStart: '22',
      checkedIds: ['run'],
      learningTopics: ['Spring', 'CS'],
    },
  );
  assert.deepEqual(pageApp.normalizeRoadmapState({ mode: 'unknown', runStart: '23' }), {
    mode: 'workout',
    runStart: '21',
    checkedIds: [],
    learningTopics: [],
  });
});
