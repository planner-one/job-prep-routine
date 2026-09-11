import test from 'node:test';
import assert from 'node:assert/strict';
import { createLearningSyncEngine, mergeLearningChanges, sharedLearningState, applySharedLearningState, equalSyncValue } from '../src/learning-sync-core.js';
import { createDefaultLearningState, updateCourseProgress, setCourseDeleted, loadLearningState, saveLearningState, LEARNING_STORAGE_KEY } from '../src/learning-core.js';
import { COURSES } from '../src/learning-data.js';
import { setupLearningSync } from '../src/learning-sync.js';

const today = '2026-09-11';
const copy = value => structuredClone(value);
const initial = () => sharedLearningState(createDefaultLearningState(today), today);
test('로컬·정적 주소에서는 사용자 기록을 읽거나 바꾸거나 전송하지 않는다', () => {
  const nodes = new Map();
  const root = { querySelector: selector => { if (!nodes.has(selector)) nodes.set(selector, { dataset: {} }); return nodes.get(selector); } };
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


// 실제 시작·새로고침 순서를 개인 기록과 분리한 자료로 검증합니다.
function lifecycle(t, { row = { revision: 1, data: initial() }, state = createDefaultLearningState(today), cached, offline = false, pending } = {}) {
  const entries = new Map([[LEARNING_STORAGE_KEY, JSON.stringify(state)]]);
  if (cached) {
    entries.set(`${LEARNING_STORAGE_KEY}:owner`, 'vercel-neon-personal-v1');
    entries.set(`${LEARNING_STORAGE_KEY}:sync:vercel-neon-personal-v1`, JSON.stringify(cached));
  }
  if (pending) entries.set(`${LEARNING_STORAGE_KEY}:pending-cloud`, JSON.stringify(pending));
  const storage = { getItem: key => entries.get(key) ?? null, setItem: (key, value) => entries.set(key, value), removeItem: key => entries.delete(key) };
  const listeners = new Map(), nodes = new Map();
  const node = key => {
    if (!nodes.has(key)) nodes.set(key, { hidden: true, dataset: {}, classList: { add() {}, toggle() {} }, addEventListener: (type, callback) => listeners.set(`${key}:${type}`, callback) });
    return nodes.get(key);
  };
  let current = state, connectionOffline = offline, requests = [], interval;
  const root = { querySelector: node, classList: { add() {} } };
  t.mock.method(globalThis, 'setInterval', callback => { interval = callback; return 1; });
  t.mock.method(globalThis, 'clearInterval', () => {});
  t.mock.method(globalThis, 'fetch', async (url, options) => {
    if (connectionOffline) throw new Error('offline');
    requests.push([url, options.method]);
    if (url.includes('action=status')) return { ok: true, status: 200, json: async () => ({ configured: true, authenticated: true }) };
    if (options.method === 'PUT') {
      const body = JSON.parse(options.body);
      if (body.revision !== row.revision) return { status: 409, ok: false };
      row = { revision: row.revision + 1, data: copy(body.data) };
    }
    return { ok: true, status: 200, json: async () => copy(row) };
  });
  const windowBefore = globalThis.window, documentBefore = globalThis.document;
  globalThis.window = { location: { protocol: 'https:', hostname: 'job-prep-routine.vercel.app' }, addEventListener: (event, fn) => listeners.set(event, fn) };
  globalThis.document = { visibilityState: 'visible', addEventListener: (event, fn) => listeners.set(event, fn) };
  t.after(() => { globalThis.window = windowBefore; globalThis.document = documentBefore; });
  const sync = setupLearningSync(root, storage, today, () => current, next => { current = saveLearningState(storage, next, today); });
  return { sync, storage, node, requests, entries, current: () => current, row: () => row,
    online: () => { connectionOffline = false; return listeners.get('online')?.(); },
    tick: () => interval?.(),
  };
}
const settle = async () => { for (let i = 0; i < 50; i++) await Promise.resolve(); };
test('새 모바일에서 인증되어 있으면 추가 버튼 없이 서버 기록을 불러온다', async t => {
  const row = { revision: 3, data: initial() }; row.data.courses[COURSES[0].id].inPlan = true;
  const app = lifecycle(t, { row }); await settle();
  assert.equal(app.current().courses[COURSES[0].id]?.inPlan, true);
  assert.equal(app.node('#learning-sync-first').hidden, true);
  assert.equal(app.requests.filter(([, method]) => method === 'PUT').length, 0);
});
test('최초 접속이 오프라인이어도 온라인 복귀 시 인증·서버 연결을 자동 재시도한다', async t => {
  const row = { revision: 4, data: initial() }; row.data.courses[COURSES[1].id].inPlan = true;
  const app = lifecycle(t, { row, offline: true }); await settle();
  await app.online(); await settle();
  assert.equal(app.current().courses[COURSES[1].id]?.inPlan, true);
});
test('모바일 저장 원문이 없거나 손상되면 남아 있는 동기화 대기 체크를 복구한다', () => {
  const local = initial(); local.courses[COURSES[0].id].inPlan = true;
  const key = `${LEARNING_STORAGE_KEY}:sync:vercel-neon-personal-v1`;
  for (const raw of [null, '{damaged']) {
    const values = new Map([[LEARNING_STORAGE_KEY, raw], [`${LEARNING_STORAGE_KEY}:owner`, 'vercel-neon-personal-v1'], [key, JSON.stringify({ base: { revision: 1, data: initial() }, local })]]);
    const state = loadLearningState({ getItem: key => values.get(key) ?? null }, today);
    assert.equal(state.courses[COURSES[0].id]?.inPlan, true);
  }
});
test('전송 전 새로고침해도 기기의 체크 해제와 다른 기기의 체크가 모두 저장된다', async t => {
  const base = { revision: 1, data: initial() }; base.data.courses[COURSES[0].id].inPlan = true;
  const local = copy(base.data); local.courses[COURSES[0].id].inPlan = false;
  const row = copy(base); row.revision = 2; row.data.courses[COURSES[1].id].inPlan = true;
  const state = applySharedLearningState(createDefaultLearningState(today), local, today);
  const app = lifecycle(t, { row, state, cached: { base, local } }); await settle();
  assert.equal(app.row().data.courses[COURSES[0].id].inPlan, false);
  assert.equal(app.row().data.courses[COURSES[1].id].inPlan, true);
  assert.equal(loadLearningState(app.storage, today).courses[COURSES[1].id].inPlan, true);
});


test('연결 전에 수정한 체크 해제도 새로고침·첫 서버 연결 후 보존한다', async t => {
  const before = initial(); before.courses[COURSES[0].id].inPlan = true;
  const local = copy(before); local.courses[COURSES[0].id].inPlan = false;
  const row = { revision: 5, data: copy(before) }; row.data.courses[COURSES[1].id].inPlan = true;
  const state = applySharedLearningState(createDefaultLearningState(today), local, today);
  const app = lifecycle(t, { row, state, pending: { base: { revision: 0, data: before }, local } }); await settle();
  assert.equal(app.row().data.courses[COURSES[0].id].inPlan, false);
  assert.equal(app.row().data.courses[COURSES[1].id].inPlan, true);
  assert.equal(app.storage.getItem(`${LEARNING_STORAGE_KEY}:pending-cloud`), null);
});
test('기기 저장 실패는 목록 상단에 남으며 주기 조회의 성공 문구로 가려지지 않는다', async t => {
  const app = lifecycle(t); await settle();
  app.sync.storageFailed(); await app.tick(); await settle();
  assert.equal(app.node('#learning-sync-indicator').dataset.state, 'error');
  assert.equal(app.node('.learning-sync').open, true);
});

test('서버 체크를 기기에 적용하다 실패해도 이전 원문을 서버에 되돌리지 않는다', async () => {
  const backend = server(initial()), base = await backend.read(), checkpoints = [];
  const remote = copy(base.data); remote.courses[COURSES[0].id].inPlan = true;
  await backend.write(base.revision, remote);
  let failed = true, applied;
  const engine = createLearningSyncEngine({ base, local: base.data, ...backend,
    persist: value => checkpoints.push(copy(value)), onStatus: () => {},
    onState: value => { if (failed) throw new Error('기기 저장 실패'); applied = value; },
  });
  await engine.sync();
  assert.equal(checkpoints.length, 0);
  assert.equal(engine.snapshot().base.revision, base.revision);
  failed = false; await engine.sync();
  assert.equal(applied.courses[COURSES[0].id].inPlan, true);
  assert.equal((await backend.read()).revision, 2);
});
