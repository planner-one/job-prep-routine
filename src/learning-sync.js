import { serializeLearningBackup } from './learning-transfer.js?v=13';
import { LEARNING_STORAGE_KEY } from './learning-core.js?v=13';
import { sharedLearningState, applySharedLearningState, createLearningSyncEngine } from './learning-sync-core.js?v=13';

const OWNER_KEY = `${LEARNING_STORAGE_KEY}:owner`;
export function setupLearningSync(root, storage, today, getState, applyState) {
  const el = selector => root.querySelector(selector);
  const status = message => { el('#learning-sync-status').textContent = message; };
  let engine = null, userId = '', epoch = 0, timer = 0;
  let remoteCache = null;
  let busy = false;
  function stop() { engine?.stop(); engine = null; clearTimeout(timer); }
  function changed(state) {
    if (!engine) return;
    try {
      engine.update(sharedLearningState(state, today));
      clearTimeout(timer); timer = setTimeout(() => engine?.sync(), 400);
    } catch { status('이 기기에는 저장됨 · 동기화 대기 기록 저장 실패. 새로고침 전에 백업해 주세요.'); }
  }
  const location = globalThis.window?.location;
  if (location?.protocol !== 'https:' || location.hostname.endsWith('.github.io')) {
    el('#learning-sync-retry').hidden = true;
    status('이 주소는 기기에만 저장합니다. Vercel 주소에서 기기 동기화를 연결하세요.');
    return { changed };
  }
  async function request(action, method = 'GET', body) {
    const response = await fetch(`/api/learning?action=${action}`, {
      method, credentials: 'same-origin', cache: 'no-store', signal: AbortSignal.timeout(25_000),
      ...(body === undefined ? {} : { headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) }),
    });
    if (response.status === 409) return null;
    if (response.status === 401 && action !== 'login') {
      ++epoch; stop(); userId = '';
      el('#learning-sync-login').hidden = false;
      el('#learning-sync-logout').hidden = true;
      el('#learning-sync-first').hidden = true;
      status('접속코드를 다시 입력해 주세요. 전송 대기 기록은 이 기기에 보관 중입니다.');
    }
    if (!response.ok) throw new Error(`sync-${response.status}`);
    return response.json();
  }
  async function boot() {
    const cacheKey = uid => `${LEARNING_STORAGE_KEY}:sync:${uid}`;
    async function read() {
      const result = await request(`state${remoteCache ? `&revision=${remoteCache.revision}` : ''}`);
      if (result?.unchanged) {
        if (!remoteCache || remoteCache.revision !== result.revision) throw new Error('기준 기록이 없습니다.');
        return remoteCache;
      }
      remoteCache = result;
      return result;
    }
    async function write(_uid, revision, data) {
      const result = await request('state', 'PUT', { revision, data });
      if (result) remoteCache = result;
      return result;
    }
    function backupLocal() {
      const raw = storage.getItem(LEARNING_STORAGE_KEY);
      const key = `${LEARNING_STORAGE_KEY}:before-cloud:${storage.getItem(OWNER_KEY) || 'local'}`;
      const previousOwner = storage.getItem(OWNER_KEY);
      if (raw && (previousOwner || storage.getItem(key) === null)) storage.setItem(key, raw);
      if (previousOwner) {
        const previous = JSON.parse(storage.getItem(cacheKey(previousOwner)) || 'null');
        if (previous) storage.setItem(cacheKey(previousOwner), JSON.stringify({ ...previous, local: sharedLearningState(getState(), today) }));
      }
      el('#learning-sync-backup').hidden = false;
    }
    function showState(shared) { applyState(applySharedLearningState(getState(), shared, today)); }
    function activate(uid, base, local) {
      backupLocal();
      storage.setItem(cacheKey(uid), JSON.stringify({ base, local }));
      storage.setItem(OWNER_KEY, uid);
      showState(local);
      stop();
      engine = createLearningSyncEngine({
        base, local, read: () => read(uid), write: (revision, data) => write(uid, revision, data),
        persist: value => storage.setItem(cacheKey(uid), JSON.stringify(value)),
        onState: showState,
        onStatus(kind, count) {
          const messages = { pending: '이 기기에 저장됨 · 서버 반영 중', synced: '서버 저장 완료 · 다른 기기는 약 5초마다 확인', offline: '연결 지연 · 이 기기 기록 보관 중, 연결되면 재시도', conflict: `같은 항목 ${count || 0}개를 두 기기에서 다르게 수정했습니다.` };
          status(messages[kind]);
          el('#learning-sync-conflict').hidden = kind !== 'conflict';
        },
      });
      el('#learning-sync-first').hidden = true;
      engine.sync();
    }
    async function sessionChanged(authenticated) {
      const uid = authenticated ? 'vercel-neon-personal-v1' : '';
      if (uid === userId && engine) return;
      const ticket = ++epoch; stop(); userId = uid;
      el('#learning-sync-conflict').hidden = true;
      el('#learning-sync-first').hidden = true;
      el('#learning-sync-login').hidden = Boolean(uid);
      el('#learning-sync-logout').hidden = !uid;
      if (!uid) { status('노트북과 모바일에서 같은 개인 접속코드를 입력하세요.'); return; }
      status('서버 기록 확인 중…');
      try {
        const remote = await read(uid);
        if (ticket !== epoch) return;
        const cached = JSON.parse(storage.getItem(cacheKey(uid)) || 'null');
        if (cached && remote) {
          const local = storage.getItem(OWNER_KEY) === uid ? sharedLearningState(getState(), today) : cached.local;
          activate(uid, cached.base, local); return;
        }
        el('#learning-sync-first').hidden = false;
        el('#learning-sync-seed').hidden = Boolean(remote);
        el('#learning-sync-download').hidden = !remote;
        status(remote ? '저장된 기록이 있습니다. 불러오면 이 기기의 기존 기록은 복구용으로 보관됩니다.' : '아직 서버 기록이 없습니다. 체크·삭제 기록이 있는 노트북에서 먼저 시작하세요.');
      } catch { status('서버 연결 실패 · DB 연결과 접속코드를 확인해 주세요. 기존 기록은 유지합니다.'); }
    }
    async function checkSession() {
      const result = await request('status');
      if (!result.configured) {
        ++epoch; stop(); userId = '';
        el('#learning-sync-login').hidden = true;
        el('#learning-sync-logout').hidden = true;
        el('#learning-sync-first').hidden = true;
        status('Vercel 배포됨 · Neon DB와 개인 접속코드 설정 대기. 기록은 이 기기에 보관 중');
        return;
      }
      await sessionChanged(result.authenticated);
    }
    el('#learning-sync-login').addEventListener('submit', async event => {
      event.preventDefault(); if (busy) return; busy = true;
      status('연결 중…');
      try {
        const form = event.target;
        const accessCode = form.elements.accessCode.value.trim();
        form.elements.accessCode.value = '';
        await request('login', 'POST', { accessCode });
        await sessionChanged(true);
      } catch { status('연결하지 못했습니다. 개인 접속코드와 네트워크를 확인해 주세요.'); }
      finally { busy = false; }
    });
    el('#learning-sync-logout').addEventListener('click', async () => {
      ++epoch; stop(); userId = ''; remoteCache = null;
      try { await request('login', 'DELETE', {}); await sessionChanged(false); }
      catch { status('연결 해제를 완료하지 못했습니다. 다시 시도해 주세요.'); }
    });
    async function initial(useLocal) {
      if (!userId || busy) return;
      busy = true; const uid = userId, ticket = epoch;
      // 최초 연결 도중 편집을 막아 노트북 원본과 업로드 자료를 일치시킵니다.
      root.inert = true;
      try {
        const remote = await read(uid);
        if (ticket !== epoch) return;
        if (useLocal) {
          if (remote) { await sessionChanged(true); return; }
          const local = sharedLearningState(getState(), today);
          backupLocal();
          const result = await write(uid, 0, local);
          if (ticket !== epoch) return;
          if (!result) { await sessionChanged(true); return; }
          activate(uid, result, local);
        } else if (remote) { activate(uid, remote, remote.data); }
      } catch { status('기록 연결을 완료하지 못했습니다. 노트북 기록은 유지됩니다.'); }
      finally { busy = false; root.inert = false; }
    }
    el('#learning-sync-backup').addEventListener('click', () => {
      try {
        const raw = storage.getItem(`${LEARNING_STORAGE_KEY}:before-cloud:local`) || storage.getItem(`${LEARNING_STORAGE_KEY}:before-cloud:${userId}`);
        if (!raw) { status('보관된 연결 전 기록이 없습니다.'); return; }
        const url = URL.createObjectURL(new Blob([serializeLearningBackup(JSON.parse(raw), today)], {type:'application/json'}));
        const anchor = root.ownerDocument.createElement('a'); anchor.href = url; anchor.download = `2주학습-연결전기록-${today}.json`; anchor.click();
        setTimeout(() => URL.revokeObjectURL(url), 30_000);
      } catch { status('연결 전 기록을 내보내지 못했습니다.'); }
    });
    el('#learning-sync-seed').addEventListener('click', () => initial(true));
    el('#learning-sync-download').addEventListener('click', () => initial(false));
    el('#learning-sync-retry').addEventListener('click', () => engine ? engine.sync() : checkSession().catch(() => status('연결을 다시 확인해 주세요.')));
    el('#learning-sync-local').addEventListener('click', () => engine?.resolve('local'));
    el('#learning-sync-remote').addEventListener('click', () => engine?.resolve('remote'));
    // 열린 화면만 5초마다 확인합니다. 버전이 같으면 기록 본문을 다시 전송하지 않습니다.
    setInterval(() => { if (document.visibilityState === 'visible') engine?.sync(); }, 5_000);
    document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible') engine?.sync(); });
    window.addEventListener('online', () => engine?.sync());
    window.addEventListener('storage', event => {
      if (event.key === LEARNING_STORAGE_KEY) {
        // 같은 브라우저의 다른 탭에서 편집 중이면 오래된 탭의 저장을 차단합니다.
        stop(); root.classList.add('learning-sync-other-tab');
        el('.learning-content').inert = true; el('.learning-course-sidebar').inert = true;
        status('다른 탭에서 기록이 바뀌었습니다. 새로고침 후 이어서 사용해 주세요.');
      }
    });
    await checkSession();
  }
  boot().catch(() => status('동기화 서버 연결 실패 · 이 기기의 기록은 유지됩니다.'));
  return { changed };
}
