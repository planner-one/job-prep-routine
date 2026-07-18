import test from 'node:test';
import assert from 'node:assert/strict';
import { formatReferenceTime, getRoadmapVariants } from '../src/roadmap-app.js';

test('로드맵은 운동·비운동·러닝 두 시각·유지일 전체 일정을 만든다', () => {
  const variants = getRoadmapVariants();
  assert.deepEqual(variants.map(({ id }) => id), [
    'workout', 'normal', 'running-21', 'running-22', 'maintenance',
  ]);
  assert.deepEqual(variants.map(({ schedule }) => schedule.length), [16, 15, 15, 15, 11]);
  assert.equal(variants[2].schedule.find(({ id }) => id === 'run').time, '21:00-22:00');
  assert.equal(variants[3].schedule.find(({ id }) => id === 'run').time, '22:00-23:00');
});

test('기준표 시간은 PDF에 안전한 ASCII 하이픈으로 통일한다', () => {
  assert.equal(formatReferenceTime('21:00–22:00'), '21:00-22:00');
  assert.equal(formatReferenceTime('21:00~22:00'), '21:00-22:00');
});
