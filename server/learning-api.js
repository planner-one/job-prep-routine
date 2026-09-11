import { createHash, createHmac, timingSafeEqual } from 'node:crypto';
import { COURSES } from '../src/learning-data.js';
import { getLearningStore } from './learning-store.js';

const COOKIE = '__Host-routine_session';
const LIFETIME = 30 * 24 * 60 * 60;
const digest = value => createHash('sha256').update(value).digest();
const same = (a, b) => timingSafeEqual(digest(a), digest(b));
const sign = (payload, secret) => createHmac('sha256', secret).update(`routine-session:${payload}`).digest('base64url');
const object = value => value !== null && typeof value === 'object' && !Array.isArray(value);

export function validLearningData(data) {
  if (!object(data?.courses)) return false;
  // v18까지의 54개 강의 목록도 저장할 수 있도록 이번 신규 강의만 누락을 허용합니다.
  const supplied = COURSES.filter(c => c.id !== 'extra-327136' || Object.hasOwn(data.courses, c.id));
  return data.version === 1 && supplied.every(c => object(data.courses[c.id]))
    && Array.isArray(data.courseOrder) && data.courseOrder.length === supplied.length
    && new Set(data.courseOrder).size === supplied.length && supplied.every(c => data.courseOrder.includes(c.id))
    && object(data.daily) && object(data.sessions) && object(data.studyLogs)
    && object(data.youthProgram) && object(data.youthProgram.events);
}

export function createLearningHandler({ env = process.env, getStore = getLearningStore, now = Date.now } = {}) {
  return async function handler(req, res) {
    res.setHeader('Cache-Control', 'private, no-store');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    const reply = (code, body) => res.status(code).json(body);
    const code = env.LEARNING_ACCESS_CODE || '';
    const configured = Boolean(env.DATABASE_URL) && code.length >= 32;
    const url = new URL(req.url, 'https://request.invalid');
    const action = url.searchParams.get('action') || 'state';
    const cookie = (req.headers.cookie || '').split(';').map(s => s.trim()).find(s => s.startsWith(`${COOKIE}=`))?.slice(COOKIE.length + 1) || '';
    const [expires, signature, extra] = cookie.split('.');
    const authenticated = configured && !extra && /^\d{10,13}$/.test(expires || '')
      && Number(expires) > now() && Number(expires) <= now() + LIFETIME * 1000
      && same(signature || '', sign(expires, code));
    if (req.method === 'GET' && action === 'status') return reply(200, { configured, authenticated });
    if (!configured) return reply(503, { error: 'not_configured' });
    if (!['GET', 'POST', 'PUT', 'DELETE'].includes(req.method)) return reply(405, { error: 'method_not_allowed' });
    if (req.method !== 'GET') {
      // HttpOnly 세션과 정확한 Origin 확인으로 외부 사이트의 저장·로그인 요청을 막습니다.
      if (req.headers.origin !== `https://${req.headers.host}`) return reply(403, { error: 'origin_denied' });
      if (!String(req.headers['content-type'] || '').startsWith('application/json')) return reply(415, { error: 'json_required' });
    }
    let body;
    try {
      const raw = typeof req.body === 'string' ? req.body : JSON.stringify(req.body || {});
      if (Buffer.byteLength(raw) > 3_000_000) return reply(413, { error: 'too_large' });
      body = JSON.parse(raw);
    } catch { return reply(400, { error: 'invalid_json' }); }
    if (req.method === 'POST' && action === 'login') {
      if (typeof body?.accessCode !== 'string' || !same(body.accessCode, code)) return reply(401, { error: 'invalid_code' });
      const expiry = String(now() + LIFETIME * 1000);
      res.setHeader('Set-Cookie', `${COOKIE}=${expiry}.${sign(expiry, code)}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=${LIFETIME}`);
      return reply(200, { authenticated: true });
    }
    if (req.method === 'DELETE' && action === 'login') {
      res.setHeader('Set-Cookie', `${COOKIE}=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0`);
      return reply(200, { authenticated: false });
    }
    if (!authenticated) return reply(401, { error: 'login_required' });
    if (action !== 'state') return reply(404, { error: 'not_found' });
    if (req.method !== 'GET' && req.method !== 'PUT') return reply(405, { error: 'method_not_allowed' });
    if (req.method === 'PUT' && (!Number.isSafeInteger(body?.revision) || body.revision < 0 || !validLearningData(body.data))) return reply(400, { error: 'invalid_state' });
    try {
      const store = await getStore(env.DATABASE_URL);
      if (req.method === 'GET') {
        const revision = Number(url.searchParams.get('revision') ?? -1);
        const remote = await store.read(Number.isSafeInteger(revision) && revision >= 0 ? revision : -1);
        return reply(200, remote && remote.revision === revision ? { revision, unchanged: true } : remote);
      }
      // 이전 버전의 탭은 자신이 모르는 신규 강의·완료 표시를 지울 수 없습니다.
      let data = body.data;
      if (COURSES.some(c => !data.courses[c.id] || !Object.hasOwn(data.courses[c.id], 'completed'))) {
        const current = await store.read();
        if ((current?.revision || 0) !== body.revision) return reply(409, { error: 'revision_conflict' });
        const courseOrder = [...data.courseOrder];
        for (const course of COURSES.filter(c => !courseOrder.includes(c.id))) {
          const position = current?.data.courseOrder.indexOf(course.id) ?? -1;
          courseOrder.splice(position < 0 ? courseOrder.length : Math.min(position, courseOrder.length), 0, course.id);
        }
        data = { ...data, courseOrder, courses: Object.fromEntries(COURSES.map(c => {
          const progress = data.courses[c.id] || current?.data.courses[c.id] || {};
          return [c.id, { ...progress, completed: Object.hasOwn(progress, 'completed')
            ? progress.completed === true : current?.data.courses[c.id]?.completed === true }];
        })) };
      }
      const saved = await store.write(body.revision, data);
      return reply(saved ? 200 : 409, saved || { error: 'revision_conflict' });
    } catch {
      // 연결 문자열과 학습 기록이 노출되지 않도록 예외 원문을 로그·응답에 넣지 않습니다.
      return reply(503, { error: 'storage_unavailable' });
    }
  };
}
