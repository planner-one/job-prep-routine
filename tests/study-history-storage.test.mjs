import test from 'node:test';
import assert from 'node:assert/strict';
import {
  STUDY_HISTORY_STORAGE_KEY,
  LocalStudyHistoryStorage,
  createLocalStudyHistoryStorage,
  loadStudyHistory,
  saveStudyAttempt,
} from '../src/study-history-storage.js';
import { createStudyAttempt } from '../src/study-history-core.js';

const COMMIT = 'd00877afb0a302072078d34ded66b3b69143a5ca';
function memoryStorage(entries = {}) {
  const values = new Map(Object.entries(entries));
  return {
    getItem: (key) => values.get(key) ?? null,
    setItem: (key, value) => values.set(key, value),
    snapshot: () => Object.fromEntries(values),
  };
}
function reading(id = 'read-1') {
  return createStudyAttempt({ id, kind: 'reading', completedAt: '2026-07-21T18:00:00.000Z', sourceIds: ['be-1'], sourceCommit: COMMIT });
}

test('학습 기록은 독립 네임스페이스에 append-only로 저장하며 기존 읽기/퀴즈/면접 키를 건드리지 않는다', () => {
  const storage = memoryStorage({
    'job-prep-routine:maeil-reader:v1:state': '{"keep":true}',
    'job-prep-routine:quiz:v1:attempts': '["keep"]',
    'job-prep-routine:interview:evaluations': '{"keep":true}',
  });
  saveStudyAttempt(storage, reading());
  assert.equal(STUDY_HISTORY_STORAGE_KEY, 'job-prep-routine:study-history:v1');
  assert.equal(loadStudyHistory(storage).attempts.length, 1);
  const snapshot = storage.snapshot();
  assert.equal(snapshot['job-prep-routine:maeil-reader:v1:state'], '{"keep":true}');
  assert.equal(snapshot['job-prep-routine:quiz:v1:attempts'], '["keep"]');
  assert.equal(snapshot['job-prep-routine:interview:evaluations'], '{"keep":true}');
});

test('같은 시도 ID는 덮어쓰지 않고 거절하며 저장 전후 객체를 복제한다', () => {
  const storage = memoryStorage();
  const attempt = reading();
  const saved = saveStudyAttempt(storage, attempt);
  assert.notEqual(saved, attempt);
  assert.throws(() => saveStudyAttempt(storage, attempt), /이미 저장된/u);
  assert.equal(loadStudyHistory(storage).attempts[0].id, 'read-1');
});

test('손상된 JSON과 구 버전 배열은 빈 값 또는 마이그레이션된 상태로 안전하게 읽고 adapter API를 제공한다', () => {
  assert.deepEqual(loadStudyHistory(memoryStorage({ [STUDY_HISTORY_STORAGE_KEY]: '{bad' })).attempts, []);
  const storage = memoryStorage({ [STUDY_HISTORY_STORAGE_KEY]: JSON.stringify([reading('old-1')]) });
  const adapter = createLocalStudyHistoryStorage(storage);
  assert.equal(adapter instanceof LocalStudyHistoryStorage, true);
  assert.equal(adapter.loadAll().attempts[0].id, 'old-1');
  adapter.save(reading('new-1'));
  assert.equal(adapter.list({ kind: 'reading' }).length, 2);
});
