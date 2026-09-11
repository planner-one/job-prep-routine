import { serializeLearningBackup } from './learning-transfer.js?v=18';
import { LEARNING_STORAGE_KEY, createDefaultLearningState } from './learning-core.js?v=18';
import { sharedLearningState, applySharedLearningState, createLearningSyncEngine, equalSyncValue } from './learning-sync-core.js?v=18';

const OWNER_KEY = `${LEARNING_STORAGE_KEY}:owner`;
const PENDING_KEY = `${LEARNING_STORAGE_KEY}:pending-cloud`;
export function setupLearningSync(root, storage, today, getState, applyState) {
  const el = selector => root.querySelector(selector);
  let storageError = false;
  const status = (message, kind = 'attention') => {
    if (storageError && kind !== 'error') return;
    el('#learning-sync-status').textContent = message;
    const indicator = el('#learning-sync-indicator');
    if (indicator) {
      indicator.textContent = { attention: '연결 확인 필요', local: '이 기기에만 저장', login: '접속코드 입력', pending: '서버 저장 중', synced: '서버 저장 완료', offline: '오프라인 · 전송 대기', conflict: '기록 충돌 확인', error: '저장 실패', connecting: '연결 중' }[kind];
      indicator.dataset.state = kind;
    }
  };
  let engine = null, userId = '', epoch = 0, timer = 0;
  let remoteCache = null;
  let busy = false;
  let initialLocal, staticOnly = false, otherTab = false;
  function storageFailed() {
    storageError = true;
    status('기기에 저장하지 못했습니다. 새로고침 전에 학습 기록에서 파일로 백업해 주세요.', 'error');
    el('.learning-sync').open = true;
  }
  function stop() { engine?.stop(); engine = null; clearTimeout(timer); }
  function changed(state) {
    if (staticOnly || otherTab) return;
    storageError = false;
    try {
      const local = sharedLearningState(state, today);
      if (!engine) {
        const pending = JSON.parse(storage.getItem(PENDING_KEY) || 'null');
        storage.setItem(PENDING_KEY, JSON.stringify({ base: pending?.base || { revision: 0, data: initialLocal }, local }));
        status('이 기기에 저장됨 · 서버 미연결. 접속코드를 입력하면 전송 대기 기록을 연결합니다.', 'login');
        return;
      }
      engine.update(local);
      clearTimeout(timer); timer = setTimeout(() => engine?.sync(), 400);
    } catch { stop(); storageFailed(); }
  }
  const location = globalThis.window?.location;
  if (el('#learning-sync-address')) el('#learning-sync-address').textContent = location?.hostname || '로컬 파일';
  if (location?.protocol !== 'https:' || location.hostname.endsWith('.github.io')) {
    staticOnly = true;
    el('#learning-sync-retry').hidden = true;
    el('#learning-sync-production')?.removeAttribute?.('hidden');
    status('이 주소는 기기에만 저장합니다. 기록을 백업한 뒤 아래 운영 주소에서 연결하세요.', 'local');
    return { changed, storageFailed };
  }
  initialLocal = sharedLearningState(getState(), today);
  async function request(action, method = 'GET', body) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 25_000);
    let response;
    try {
      response = await fetch(`/api/learning?action=${action}`, {
        method, credentials: 'same-origin', cache: 'no-store', signal: controller.signal,
        ...(body === undefined ? {} : { headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) }),
      });
    } finally { clearTimeout(timeout); }
    if (response.status === 409) return null;
    if (response.status === 401 && action !== 'login') {
      ++epoch; stop(); userId = '';
      el('#learning-sync-login').hidden = false;
      el('#learning-sync-logout').hidden = true;
      el('#learning-sync-first').hidden = true;
      status('접속코드를 다시 입력해 주세요. 전송 대기 기록은 이 기기에 보관 중입니다.', 'login');
    }
    if (!response.ok) throw new Error(`sync-${response.status}`);
    return response.json();
  }
  async function boot() {
    const cacheKey = uid => `${LEARNING_STORAGE_KEY}:sync:${uid}`;
    function showServerSummary(row) {
      const target = el('#learning-sync-records');
      if (!target) return;
      target.hidden = !row?.data;
      if (row?.data) {
        const values = Object.values(row.data.courses);
        const active = values.filter(c => !c.deleted);
        target.textContent = `서버 기록: 목록 ${active.length}개 · 내 선택 ${active.filter(c => c.inPlan).length}개 · 삭제 ${values.length - active.length}개`;
      }
    }
    async function read() {
      const result = await request(`state${remoteCache ? `&revision=${remoteCache.revision}` : ''}`);
      if (result?.unchanged) {
        if (!remoteCache || remoteCache.revision !== result.revision) throw new Error('기준 기록이 없습니다.');
        return remoteCache;
      }
      remoteCache = result;
      showServerSummary(result);
      return result;
    }
    async function write(_uid, revision, data) {
      const result = await request('state', 'PUT', { revision, data });
      if (result) { remoteCache = result; showServerSummary(result); }
      return result;
    }
    function backupLocal() {
      const raw = storage.getItem(LEARNING_STORAGE_KEY);
      const key = `${LEARNING_STORAGE_KEY}:before-cloud:${storage.getItem(OWNER_KEY) || 'local'}`;
      const previousOwner = storage.getItem(OWNER_KEY);
      if (raw && storage.getItem(key) === null) storage.setItem(key, raw);
      if (previousOwner) {
        const previous = JSON.parse(storage.getItem(cacheKey(previousOwner)) || 'null');
        if (previous) storage.setItem(cacheKey(previousOwner), JSON.stringify({ ...previous, local: sharedLearningState(getState(), today) }));
      }
      el('#learning-sync-backup').hidden = false;
    }
    function showState(shared) { applyState(applySharedLearningState(getState(), shared, today)); storageError = false; }
    function activate(uid, base, local) {
      backupLocal();
      storage.setItem(cacheKey(uid), JSON.stringify({ base, local }));
      storage.setItem(OWNER_KEY, uid);
      showState(local);
      storage.removeItem(PENDING_KEY);
      stop();
      engine = createLearningSyncEngine({
        base, local, read: () => read(uid), write: (revision, data) => write(uid, revision, data),
        persist: value => storage.setItem(cacheKey(uid), JSON.stringify(value)),
        onState: showState,
        onStatus(kind, count) {
          const messages = { pending: '이 기기에 저장됨 · 서버 반영 중', synced: '서버 저장 완료 · 다른 기기는 약 5초마다 확인', offline: '연결 지연 · 이 기기 기록 보관 중, 연결되면 재시도', conflict: `같은 항목 ${count || 0}개를 두 기기에서 다르게 수정했습니다.` };
          status(messages[kind], kind);
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
      if (!uid) { status('서버 미연결 · 노트북과 모바일에서 같은 개인 접속코드를 한 번 입력하세요. 체크는 이 기기에만 저장됩니다.', 'login'); return; }
      status('서버 기록 확인 중…', 'connecting');
      try {
        const remote = await read(uid);
        if (ticket !== epoch) return;
        const cached = JSON.parse(storage.getItem(cacheKey(uid)) || 'null');
        if (cached && remote) {
          const local = storage.getItem(OWNER_KEY) === uid ? sharedLearningState(getState(), today) : cached.local;
          activate(uid, cached.base, local); return;
        }
        if (remote) {
          const local = sharedLearningState(getState(), today);
          const pending = JSON.parse(storage.getItem(PENDING_KEY) || 'null');
          if (pending?.base) { activate(uid, pending.base, local); return; }
          const empty = sharedLearningState(createDefaultLearningState(today), today);
          if (equalSyncValue(initialLocal, empty)) {
            activate(uid, { revision: 0, data: empty }, local); return;
          }
          if (equalSyncValue(local, remote.data)) { activate(uid, remote, local); return; }
        }
        el('#learning-sync-first').hidden = false;
        el('#learning-sync-seed').hidden = Boolean(remote);
        el('#learning-sync-download').hidden = !remote;
        status(remote ? '연결 전에 작성한 기록이 있습니다. 아래에서 합치면 체크·메모를 보존하고 충돌은 따로 확인합니다.' : '아직 서버 기록이 없습니다. 체크·삭제 기록이 있는 노트북에서 먼저 시작하세요.');
      } catch { status('서버 연결 실패 · DB 연결과 접속코드를 확인해 주세요. 기존 기록은 유지합니다.'); }
    }
    let checking = false;
    async function checkSession() {
      if (checking || busy || otherTab) return;
      checking = true;
      try {
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
      } finally { checking = false; }
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
        } else if (remote) {
          // 기준 이력이 없는 이전 로컬 기록은 빈 상태와 비교해 합칩니다.
          // 서버의 체크 해제·삭제를 빈 모바일 값으로 덮어쓰지 않습니다.
          activate(uid, { revision: 0, data: sharedLearningState(createDefaultLearningState(today), today) }, sharedLearningState(getState(), today));
        }
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
    const reconnect = () => {
      if (otherTab || busy) return;
      return engine ? engine.sync() : checkSession().catch(() => status('서버 연결 지연 · 이 기기의 기록을 보관하며 다시 연결합니다.', 'offline'));
    };
    el('#learning-sync-retry').addEventListener('click', () => otherTab ? window.location.reload() : reconnect());
    el('#learning-sync-local').addEventListener('click', () => engine?.resolve('local'));
    el('#learning-sync-remote').addEventListener('click', () => engine?.resolve('remote'));
    // 열린 화면만 5초마다 확인합니다. 버전이 같으면 기록 본문을 다시 전송하지 않습니다.
    setInterval(() => { if (document.visibilityState === 'visible') reconnect(); }, 5_000);
    document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible') reconnect(); });
    window.addEventListener('online', reconnect);
    window.addEventListener('pageshow', reconnect);
    window.addEventListener('storage', event => {
      if (event.key === LEARNING_STORAGE_KEY) {
        // 같은 브라우저의 다른 탭에서 편집 중이면 오래된 탭의 저장을 차단합니다.
        otherTab = true; stop(); root.classList.add('learning-sync-other-tab');
        el('.learning-content').inert = true; el('.learning-course-sidebar').inert = true;
        status('다른 탭에서 기록이 바뀌었습니다. 새로고침 후 이어서 사용해 주세요.');
        el('#learning-sync-retry').textContent = '최신 기록으로 새로고침';
      }
    });
    await checkSession();
  }
  boot().catch(() => status('서버 연결 지연 · 이 기기의 기록을 보관하며 다시 연결합니다.', 'offline'));
  return { changed, storageFailed };
}
