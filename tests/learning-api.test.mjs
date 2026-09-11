import test from 'node:test';
import assert from 'node:assert/strict';
import { createLearningHandler } from '../server/learning-api.js';
import { createNeonStore } from '../server/learning-store.js';
import { sharedLearningState } from '../src/learning-sync-core.js';
import { createDefaultLearningState } from '../src/learning-core.js';
import { COURSES } from '../src/learning-data.js';

const env = { DATABASE_URL: 'private-test-connection', LEARNING_ACCESS_CODE: 'test-only-' + 'x'.repeat(40) };
const origin = 'https://routine.example';
const data = () => sharedLearningState(createDefaultLearningState('2026-09-11'), '2026-09-11');
function fixture(options = {}) {
  let row = null, calls = 0, time = 1_800_000_000_000;
  const store = {
    read: async revision => { calls++; return row ? { revision: row.revision, data: revision === row.revision ? null : structuredClone(row.data) } : null; },
    write: async (revision, next) => {
      calls++;
      if ((row?.revision || 0) !== revision) return null;
      row = { revision: revision + 1, data: structuredClone(next) }; return structuredClone(row);
    },
  };
  const handler = createLearningHandler({ env, now: () => time, getStore: async () => store, ...options });
  async function request(method = 'GET', action = 'state', body, cookie = '', headers = {}) {
    const res = { headers: {}, setHeader(k, v) { this.headers[k] = v; }, status(code) { this.code = code; return this; }, json(value) { this.body = value; return this; } };
    await handler({ method, url: `/api/learning?action=${action}`, body, headers: { host: 'routine.example', origin, 'content-type': 'application/json', cookie, ...headers } }, res);
    return res;
  }
  return { request, get calls() { return calls; }, expire: () => { time += 31 * 86400_000; }, login: async () => (await request('POST', 'login', { accessCode: env.LEARNING_ACCESS_CODE })).headers['Set-Cookie'].split(';')[0] };
}
test('미설정 API는 기록을 읽거나 쓰지 않으며 설정값을 응답에 노출하지 않는다', async () => {
  const f = fixture({ env: {} });
  assert.deepEqual((await f.request('GET', 'status')).body, { configured: false, authenticated: false });
  assert.equal((await f.request('PUT', 'state', { revision: 0, data: data() })).code, 503);
  assert.equal(f.calls, 0);
});
test('인증 전 조회·저장, 잘못된 코드, 외부 Origin 요청은 DB 접근 전에 거부한다', async () => {
  const f = fixture();
  assert.equal((await f.request()).code, 401);
  assert.equal((await f.request('PUT', 'state', { revision: 0, data: data() })).code, 401);
  assert.equal((await f.request('POST', 'login', { accessCode: 'wrong' })).code, 401);
  assert.equal((await f.request('POST', 'login', { accessCode: env.LEARNING_ACCESS_CODE }, '', { origin: 'https://other.example' })).code, 403);
  assert.equal(f.calls, 0);
});
test('개인 코드는 보안 쿠키로 교환하며 변조·만료 세션은 사용할 수 없다', async () => {
  const f = fixture(), login = await f.request('POST', 'login', { accessCode: env.LEARNING_ACCESS_CODE });
  const cookie = login.headers['Set-Cookie'].split(';')[0];
  assert.match(login.headers['Set-Cookie'], /HttpOnly; Secure; SameSite=Strict/);
  assert.equal((await f.request('GET', 'status', undefined, cookie)).body.authenticated, true);
  assert.equal((await f.request('GET', 'state', undefined, cookie + 'x')).code, 401);
  f.expire(); assert.equal((await f.request('GET', 'state', undefined, cookie)).code, 401);
});
test('초기 업로드는 기존 체크·삭제를 덮어쓰지 않으며 이전 버전 저장은 409로 거부한다', async () => {
  const f = fixture(), cookie = await f.login(), next = data();
  next.courses[COURSES[0].id].deleted = true;
  assert.equal((await f.request('PUT', 'state', { revision: 0, data: next }, cookie)).code, 200);
  assert.equal((await f.request('PUT', 'state', { revision: 0, data: data() }, cookie)).code, 409);
  next.courses[COURSES[1].id].inPlan = true;
  assert.equal((await f.request('PUT', 'state', { revision: 1, data: next }, cookie)).code, 200);
  assert.equal((await f.request('PUT', 'state', { revision: 1, data: data() }, cookie)).code, 409);
  const saved = await f.request('GET', 'state', undefined, cookie);
  assert.equal(saved.body.data.courses[COURSES[0].id].deleted, true);
  assert.equal(saved.body.data.courses[COURSES[1].id].inPlan, true);
});
test('버전이 그대로이면 기록 본문 재전송 없이 확인하며 캐시 저장을 금지한다', async () => {
  const f = fixture(), cookie = await f.login();
  await f.request('PUT', 'state', { revision: 0, data: data() }, cookie);
  const res = await f.request('GET', 'state&revision=1', undefined, cookie);
  assert.deepEqual(res.body, { revision: 1, unchanged: true });
  assert.equal(res.headers['Cache-Control'], 'private, no-store');
});
test('불완전한 자료와 교차 출처 저장을 거부하고 DB 오류 원문은 숨긴다', async () => {
  const f = fixture(), cookie = await f.login();
  assert.equal((await f.request('PUT', 'state', { revision: 0, data: { version: 1, courses: {} } }, cookie)).code, 400);
  assert.equal((await f.request('PUT', 'state', { revision: 0, data: data() }, cookie, { origin: 'https://evil.example' })).code, 403);
  assert.equal(f.calls, 0);
  const broken = fixture({ getStore: async () => { throw new Error(env.DATABASE_URL); } });
  const failure = await broken.request('GET', 'state', undefined, await broken.login());
  assert.equal(failure.code, 503); assert.deepEqual(failure.body, { error: 'storage_unavailable' });
});
test('Neon 쿼리는 자료를 매개변수로 전달하고 초기 생성과 버전 조건을 구분한다', async () => {
  const queries = [];
  const sql = (parts, ...values) => { const q = { text: parts.join('?'), values }; queries.push(q); return Promise.resolve([]); };
  sql.transaction = async queries => Promise.all(queries);
  const store = createNeonStore(sql);
  const next = data(); next.courses[COURSES[0].id].memo = "'); DROP TABLE routine_learning_sync; --";
  await store.write(0, next); await store.write(7, next); await store.read(7);
  const insert = queries.find(q => q.text.startsWith('INSERT'));
  const update = queries.find(q => q.text.startsWith('UPDATE'));
  assert.match(insert.text, /ON CONFLICT \(id\) DO NOTHING/);
  assert.match(update.text, /WHERE id = 1 AND revision = \?/);
  assert.equal(update.values.at(-1), 7);
  assert.doesNotMatch(insert.text, /DROP TABLE/);
  assert.match(insert.values[0], /DROP TABLE/);
  assert.equal(queries.filter(q => q.text.startsWith('CREATE TABLE')).length, 1);
});

test('이전 모바일 탭의 저장은 새 완료 표시를 지우지 않고 명시적 해제는 반영한다', async () => {
  const f = fixture(), cookie = await f.login(), current = data(), id = COURSES[0].id;
  current.courses[id].completed = true;
  await f.request('PUT', 'state', { revision: 0, data: current }, cookie);
  const oldClient = structuredClone(current);
  for (const course of Object.values(oldClient.courses)) delete course.completed;
  oldClient.courses[id].memo = '이전 탭에서 수정';
  const merged = await f.request('PUT', 'state', { revision: 1, data: oldClient }, cookie);
  assert.equal(merged.code, 200);
  assert.equal(merged.body.data.courses[id].completed, true);
  merged.body.data.courses[id].completed = false;
  const unchecked = await f.request('PUT', 'state', { revision: 2, data: merged.body.data }, cookie);
  assert.equal(unchecked.code, 200);
  assert.equal(unchecked.body.data.courses[id].completed, false);
});
