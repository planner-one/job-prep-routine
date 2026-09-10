import test from 'node:test';
import assert from 'node:assert/strict';
import { createDefaultLearningState, LEARNING_STORAGE_KEY, updateCourseProgress, updateUnitChecks, normalizeLearningState } from '../src/learning-core.js';
import { COURSES } from '../src/learning-data.js';
import { COURSE_CURRICULA } from '../src/learning-curriculum.js';
import { RECOVERY_KEY, serializeLearningBackup, parseLearningBackup, importLearningBackup, restoreLearningBackup } from '../src/learning-transfer.js';

const today = '2026-09-11';
const memoryStorage = () => {
  const values = new Map();
  return { getItem: key => values.get(key) ?? null, setItem: (key, value) => values.set(key, value), removeItem: key => values.delete(key) };
};
test('노트북의 선택·목차·순서·메모를 다른 저장소로 옮기고 기존 모바일 기록을 복구한다', () => {
  const id = COURSES[0].id;
  const unit = COURSE_CURRICULA[id].sections[0].units[0].id;
  let laptop = updateCourseProgress(createDefaultLearningState(today), id, { inPlan: true, enrolled: true, memo: '노트북 메모' }, today, today);
  laptop = updateUnitChecks(laptop, id, [unit], 'organized', true, today);
  laptop.courseOrder.reverse();
  const parsed = parseLearningBackup(serializeLearningBackup(laptop, today), today);
  assert.deepEqual(parsed, normalizeLearningState(laptop, today));
  const mobile = memoryStorage();
  const before = JSON.stringify(updateCourseProgress(createDefaultLearningState(today), COURSES[1].id, { memo: '기존 모바일 기록' }, today, today));
  mobile.setItem(LEARNING_STORAGE_KEY, before);
  const imported = importLearningBackup(mobile, parsed, today);
  assert.equal(imported.courses[id].inPlan, true);
  assert.equal(imported.courses[id].unitChecks[unit].organized, true);
  assert.equal(mobile.getItem(RECOVERY_KEY), before);
  restoreLearningBackup(mobile, today);
  assert.equal(mobile.getItem(LEARNING_STORAGE_KEY), before);
  assert.equal(mobile.getItem(RECOVERY_KEY), null);
});
test('다른 파일·미지원 버전·초과 용량을 기록으로 오인하지 않는다', () => {
  for (const text of ['{', '{}', 'null', JSON.stringify({format:'job-prep-learning-backup',version:2,state:{}}), 'x'.repeat(5_000_001)]) {
    assert.throws(() => parseLearningBackup(text, today));
  }
});
test('백업 저장이나 새 기록 저장 실패 시 기존 기록을 보존한다', () => {
  for (const failKey of [RECOVERY_KEY, LEARNING_STORAGE_KEY]) {
    const storage = memoryStorage();
    storage.setItem(LEARNING_STORAGE_KEY, '기존 원문');
    const originalSet = storage.setItem;
    storage.setItem = (key, value) => { if (key === failKey) throw new Error('용량 초과'); originalSet(key, value); };
    assert.throws(() => importLearningBackup(storage, createDefaultLearningState(today), today));
    assert.equal(storage.getItem(LEARNING_STORAGE_KEY), '기존 원문');
  }
});
