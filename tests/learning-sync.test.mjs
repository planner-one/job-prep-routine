import test from 'node:test';
import assert from 'node:assert/strict';
import { createLearningSyncEngine, mergeLearningChanges, sharedLearningState, applySharedLearningState, equalSyncValue } from '../src/learning-sync-core.js';
import { createDefaultLearningState, updateCourseProgress, setCourseDeleted } from '../src/learning-core.js';
import { COURSES } from '../src/learning-data.js';
import { setupLearningSync } from '../src/learning-sync.js';

const today = '2026-09-11';
const copy = value => structuredClone(value);
const initial = () => sharedLearningState(createDefaultLearningState(today), today);
test('로컬·정적 주소에서는 사용자 기록을 읽거나 바꾸거나 전송하지 않는다', () => {
  const nodes = new Map();
  const root = { querySelector: selector => { if (!nodes.has(selector)) nodes.set(selector, {}); return nodes.get(selector); } };
  const forbidden = () => { throw new Error('미연결 상태에서는 호출하면 안 됨'); };
  const sync = setupLearningSync(root, { getItem: forbidden, setItem: forbidden }, today, forbidden, forbidden);
  sync.changed({ courses: {} });
  assert.match(nodes.get('#learning-sync-status').textContent, /기기에만 저장/);
  assert.equal(nodes.get('#learning-sync-retry').hidden, true);
});
function server(data) {
  let row = { revision: 1, data: copy(data) };
  return {
    read: async () => copy(row),
    write: async (revision, data) => revision === row.revision ? copy(row = { revision: revision + 1, data: copy(data) }) : null,
  };
}
function device(backend, base, local = base.data) {
  const history = [], saved = [];
  const engine = createLearningSyncEngine({ base, local, ...backend, persist: value => saved.push(copy(value)), onState: () => {}, onStatus: (...args) => history.push(args) });
  return { engine, history, saved };
}
test('노트북의 체크 해제·삭제·우선순위를 공유 자료에 그대로 보존한다', () => {
  let laptop = updateCourseProgress(createDefaultLearningState(today), COURSES[0].id, { inPlan: false, deleted: true, enrolled: true, noteReference: 'https://example.com/note' }, today, today);
  laptop = setCourseDeleted(laptop, COURSES[0].id, true, today);
  laptop.courseOrder.reverse();
  const restored = applySharedLearningState(createDefaultLearningState(today), sharedLearningState(laptop, today), today);
  assert.equal(restored.courses[COURSES[0].id].deleted, true);
  assert.equal(restored.courses[COURSES[0].id].inPlan, false);
  assert.equal(restored.courses[COURSES[0].id].enrolled, true);
  assert.deepEqual(restored.courseOrder, laptop.courseOrder);
});
test('빈 모바일은 서버 체크·삭제를 읽으며 자동으로 서버 기록을 초기화하지 않는다', async () => {
  const data = initial(); data.courses[COURSES[0].id].deleted = true;
  const backend = server(data), row = await backend.read();
  const { engine } = device(backend, row);
  await engine.sync();
  assert.equal((await backend.read()).revision, 1);
  assert.equal(engine.snapshot().local.courses[COURSES[0].id].deleted, true);
});
test('두 기기가 동시에 서로 다른 강의를 변경하면 둘 다 반영된다', async () => {
  const backend = server(initial()), base = await backend.read();
  const a = device(backend, base), b = device(backend, base);
  const first = copy(base.data), second = copy(base.data);
  first.courses[COURSES[0].id].deleted = true;
  second.courses[COURSES[1].id].inPlan = true;
  a.engine.update(first); b.engine.update(second);
  await Promise.all([a.engine.sync(), b.engine.sync()]);
  await a.engine.sync();
  const final = (await backend.read()).data;
  assert.equal(final.courses[COURSES[0].id].deleted, true);
  assert.equal(final.courses[COURSES[1].id].inPlan, true);
  assert.deepEqual(a.engine.snapshot().local, final);
});
test('같은 메모의 충돌은 선택 전 서버를 덮어쓰지 않으며 다른 변경도 보존한다', async () => {
  const backend = server(initial()), base = await backend.read();
  const local = copy(base.data), remote = copy(base.data), id = COURSES[0].id;
  local.courses[id].memo = '노트북'; remote.courses[id].memo = '모바일'; remote.courses[id].deleted = true;
  await backend.write(base.revision, remote);
  const a = device(backend, base, local);
  await a.engine.sync();
  assert.equal(a.history.at(-1)[0], 'conflict');
  assert.equal((await backend.read()).data.courses[id].memo, '모바일');
  await a.engine.resolve('local');
  assert.equal((await backend.read()).data.courses[id].memo, '노트북');
  assert.equal((await backend.read()).data.courses[id].deleted, true);
});
test('오프라인 변경은 캐시에서 재시작해 연결 후 서버로 전송한다', async () => {
  const backend = server(initial()), base = await backend.read();
  const offline = device({ ...backend, read: async () => { throw new Error('오프라인'); } }, base);
  const next = copy(base.data); next.courses[COURSES[1].id].inPlan = true;
  offline.engine.update(next); await offline.engine.sync();
  assert.equal(offline.history.at(-1)[0], 'offline');
  const cache = offline.saved.at(-1);
  const reconnect = device(backend, cache.base, cache.local);
  await reconnect.engine.sync();
  assert.equal((await backend.read()).data.courses[COURSES[1].id].inPlan, true);
});
test('전송 도중 새로 입력한 메모를 응답으로 덮어쓰지 않는다', async () => {
  const backend = server(initial()), base = await backend.read();
  let duringWrite;
  const wrapped = { ...backend, write: async (...args) => { duringWrite?.(); duringWrite = null; return backend.write(...args); } };
  const a = device(wrapped, base);
  const first = copy(base.data); first.courses[COURSES[0].id].memo = '첫 입력';
  const later = copy(first); later.courses[COURSES[0].id].memo = '이어서 입력';
  a.engine.update(first); duringWrite = () => a.engine.update(later);
  await a.engine.sync();
  assert.equal((await backend.read()).data.courses[COURSES[0].id].memo, '이어서 입력');
});
test('JSON 키 순서 차이는 변경으로 보지 않고 서로 다른 기록 ID는 합친다', () => {
  assert.equal(equalSyncValue({ a: 1, b: 2 }, { b: 2, a: 1 }), true);
  const merged = mergeLearningChanges({ logs: {} }, { logs: { a: { memo: '노트북' } } }, { logs: { b: { memo: '모바일' } } });
  assert.equal(merged.conflicts.length, 0);
  assert.deepEqual(Object.keys(merged.value.logs).sort(), ['a', 'b']);
});
test('중지한 연결의 늦은 응답은 다른 계정에 적용되지 않는다', async () => {
  const backend = server(initial()), base = await backend.read(); let release;
  const read = () => new Promise(resolve => { release = resolve; });
  const a = device({ ...backend, read }, base);
  const work = a.engine.sync(); a.engine.stop(); release(base); await work;
  assert.equal(a.saved.length, 0);
});
