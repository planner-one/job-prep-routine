import test from 'node:test';
import assert from 'node:assert/strict';
import {
  INTERVIEW_EVALUATION_STORAGE_KEY,
  INTERVIEW_EVALUATION_STORAGE_VERSION,
  assertInterviewEvaluationStorage,
  createEmptyInterviewEvaluationStorageState,
  createInterviewEvaluationStorage,
  createLocalInterviewEvaluationStorage,
  normalizeInterviewEvaluationStorageState,
} from '../src/interview-evaluation-storage.js';

function memoryStorage(entries = {}) {
  const values = new Map(Object.entries(entries));
  let writes = 0;
  return {
    getItem: (key) => values.get(key) ?? null,
    setItem(key, value) {
      writes += 1;
      values.set(key, value);
    },
    snapshot: () => Object.fromEntries(values),
    writes: () => writes,
  };
}

function evaluation(id, evaluatedAt, overrides = {}) {
  return {
    version: 1,
    id,
    questionId: 'be-1',
    evaluatedAt,
    sourceCommit: 'd00877afb0a302072078d34ded66b3b69143a5ca',
    provider: 'ollama',
    model: 'qwen3:14b',
    promptVersion: 'maeil-interview-evaluation-v1',
    scores: { accuracy: 80, coverage: 70, clarity: 90, interviewReadiness: 75 },
    strengths: [], gaps: [], unsupportedClaims: [], evidence: [],
    improvedAnswer: '개선 답변', followUps: ['질문 1', '질문 2'],
    ...overrides,
  };
}

test('평가 저장소는 기존 면접 상태와 겹치지 않는 버전 키를 사용한다', () => {
  assert.equal(INTERVIEW_EVALUATION_STORAGE_VERSION, 1);
  assert.equal(INTERVIEW_EVALUATION_STORAGE_KEY, 'job-prep-routine:interview:evaluations');
  assert.deepEqual(createEmptyInterviewEvaluationStorageState(), { version: 1, evaluations: {} });
});

test('손상된 JSON은 저장하지 않고 빈 평가 기록으로 복구한다', () => {
  const storage = memoryStorage({ [INTERVIEW_EVALUATION_STORAGE_KEY]: '{broken' });
  const adapter = createLocalInterviewEvaluationStorage(storage);
  assert.deepEqual(adapter.loadAll(), { version: 1, evaluations: {} });
  assert.deepEqual(adapter.list('be-1'), []);
  assert.equal(adapter.getLatest('be-1'), null);
  assert.equal(storage.writes(), 0);
});

test('저장은 다른 localStorage 키를 보존하고 최신 평가부터 조회한다', () => {
  const storage = memoryStorage({
    'job-prep-routine:interview:state': '{"version":1,"questions":{}}',
    'job-prep-routine:daily:2026-07-21': '{"checkedIds":["x"]}',
  });
  const adapter = createInterviewEvaluationStorage(storage);
  adapter.save(evaluation('old', '2026-07-21T01:00:00.000Z'));
  adapter.save(evaluation('new', '2026-07-21T02:00:00.000Z'));

  assert.deepEqual(adapter.list('be-1').map(({ id }) => id), ['new', 'old']);
  assert.equal(adapter.getLatest('be-1').id, 'new');
  const snapshot = storage.snapshot();
  assert.equal(snapshot['job-prep-routine:interview:state'], '{"version":1,"questions":{}}');
  assert.equal(snapshot['job-prep-routine:daily:2026-07-21'], '{"checkedIds":["x"]}');
  assert.equal(JSON.parse(snapshot[INTERVIEW_EVALUATION_STORAGE_KEY]).version, 1);
});

test('같은 평가 ID를 다시 저장하면 중복 없이 최신 내용으로 교체한다', () => {
  const storage = memoryStorage();
  const adapter = createLocalInterviewEvaluationStorage(storage);
  adapter.save(evaluation('same', '2026-07-21T01:00:00.000Z'));
  adapter.save(evaluation('same', '2026-07-21T01:00:00.000Z', {
    scores: { accuracy: 99, coverage: 99, clarity: 99, interviewReadiness: 99 },
  }));
  const saved = adapter.list('be-1');
  assert.equal(saved.length, 1);
  assert.equal(saved[0].scores.accuracy, 99);
});

test('반환된 평가 객체를 바꿔도 저장 원본은 변경되지 않는다', () => {
  const adapter = createLocalInterviewEvaluationStorage(memoryStorage());
  const candidate = evaluation('one', '2026-07-21T01:00:00.000Z');
  const returned = adapter.save(candidate);
  returned.scores.accuracy = 0;
  candidate.scores.coverage = 0;
  const loaded = adapter.getLatest('be-1');
  assert.equal(loaded.scores.accuracy, 80);
  assert.equal(loaded.scores.coverage, 70);
});

test('평가 삭제는 대상만 제거하고 없는 대상에는 쓰기를 만들지 않는다', () => {
  const storage = memoryStorage();
  const adapter = createLocalInterviewEvaluationStorage(storage);
  adapter.save(evaluation('first', '2026-07-21T01:00:00.000Z'));
  adapter.save(evaluation('second', '2026-07-21T02:00:00.000Z'));
  const before = storage.writes();
  assert.equal(adapter.remove('be-1', 'missing'), false);
  assert.equal(storage.writes(), before);
  assert.equal(adapter.remove('be-1', 'first'), true);
  assert.deepEqual(adapter.list('be-1').map(({ id }) => id), ['second']);
});

test('정규화는 버전·질문 ID·시간이 손상된 항목과 중복 ID를 버린다', () => {
  const valid = evaluation('valid', '2026-07-21T01:00:00.000Z');
  const normalized = normalizeInterviewEvaluationStorageState({
    version: 999,
    evaluations: {
      'be-1': [
        valid,
        { ...valid },
        { ...valid, id: 'bad-version', version: 2 },
        { ...valid, id: 'bad-question', questionId: 'be-2' },
        { ...valid, id: 'bad-time', evaluatedAt: 'not-a-date' },
      ],
      broken: 'array 아님',
    },
  });
  assert.equal(normalized.version, 1);
  assert.deepEqual(normalized.evaluations['be-1'].map(({ id }) => id), ['valid']);
  assert.equal(Object.hasOwn(normalized.evaluations, 'broken'), false);
});

test('저장소 어댑터 계약과 저장 오류를 호출자에게 전달한다', () => {
  const adapter = createLocalInterviewEvaluationStorage(memoryStorage());
  assert.equal(assertInterviewEvaluationStorage(adapter), adapter);
  assert.throws(() => assertInterviewEvaluationStorage({ list() {} }), /필요한 기능/u);
  assert.throws(
    () => createLocalInterviewEvaluationStorage({ getItem() {}, setItem() { throw new Error('quota'); } })
      .save(evaluation('one', '2026-07-21T01:00:00.000Z')),
    /quota/u,
  );
  assert.throws(() => adapter.save({ questionId: 'be-1' }), /올바르지 않습니다/u);
});
