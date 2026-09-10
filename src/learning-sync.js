import { serializeLearningBackup } from './learning-transfer.js?v=11';
import { LEARNING_SYNC_CONFIG } from './learning-sync-config.js?v=11';
import { LEARNING_STORAGE_KEY } from './learning-core.js?v=11';
import { sharedLearningState, applySharedLearningState, createLearningSyncEngine } from './learning-sync-core.js?v=11';

const OWNER_KEY = `${LEARNING_STORAGE_KEY}:owner`;
export function setupLearningSync(root, storage, today, getState, applyState) {
  const el = selector => root.querySelector(selector);
  const status = message => { el('#learning-sync-status').textContent = message; };
  let engine = null, client = null, channel = null, userId = '', epoch = 0, timer = 0;
  let busy = false;
  function stop() { engine?.stop(); engine = null; if (channel) client.removeChannel(channel); channel = null; clearTimeout(timer); }
  function changed(state) {
    if (!engine) return;
    try {
      engine.update(sharedLearningState(state, today));
      clearTimeout(timer); timer = setTimeout(() => engine?.sync(), 400);
    } catch { status('이 기기에는 저장됨 · 동기화 대기 기록 저장 실패. 새로고침 전에 백업해 주세요.'); }
  }
  const config = LEARNING_SYNC_CONFIG;
  if (!/^https:\/\/[a-z0-9-]+\.supabase\.co$/.test(config.url) || !config.publishableKey.startsWith('sb_publishable_')) {
    el('#learning-sync-retry').hidden = true;
    status('Supabase 프로젝트 연결 대기 · 체크와 삭제 기록은 이 기기에 보관 중');
    return { changed };
  }

  async function boot() {
    const { createClient } = await import('https://esm.sh/@supabase/supabase-js@2.116.0');
    client = createClient(config.url, config.publishableKey);
    el('#learning-sync-login').hidden = false;
    const cacheKey = uid => `${LEARNING_STORAGE_KEY}:sync:${uid}`;
    async function read(uid) {
      const { data, error } = await client.from('learning_sync').select('revision,data').eq('user_id', uid).maybeSingle();
      if (error) throw error;
      return data;
    }
    async function write(uid, revision, data) {
      const result = await client.rpc('save_learning_sync', { expected_user_id: uid, expected_revision: revision, next_data: data });
      if (result.error) throw result.error;
      return result.data?.[0] || null;
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
          const messages = { pending: '이 기기에 저장됨 · 서버 반영 중', synced: '기기 간 동기화 완료', offline: '연결 지연 · 이 기기 기록 보관 중, 연결되면 재시도', conflict: `같은 항목 ${count || 0}개를 두 기기에서 다르게 수정했습니다.` };
          status(messages[kind]);
          el('#learning-sync-conflict').hidden = kind !== 'conflict';
        },
      });
      el('#learning-sync-first').hidden = true;
      channel = client.channel(`learning-${uid}`).on('postgres_changes', { event: '*', schema: 'public', table: 'learning_sync', filter: `user_id=eq.${uid}` }, () => engine?.sync()).subscribe();
      engine.sync();
    }
    async function sessionChanged(session) {
      const uid = session?.user?.id || '';
      if (uid === userId && engine) return;
      const ticket = ++epoch; stop(); userId = uid;
      el('#learning-sync-conflict').hidden = true;
      el('#learning-sync-first').hidden = true;
      el('#learning-sync-login').hidden = Boolean(uid);
      el('#learning-sync-logout').hidden = !uid;
      if (!uid) { status('로그인하면 같은 계정의 기기끼리 기록을 공유합니다.'); return; }
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
      } catch { status('서버 연결 실패 · 프로젝트 설정과 로그인 상태를 확인해 주세요. 기존 기록은 유지합니다.'); }
    }
    el('#learning-sync-login').addEventListener('submit', async event => {
      event.preventDefault(); if (busy) return; busy = true;
      status('로그인 중…');
      try {
        const form = event.target;
        const { error } = await client.auth.signInWithPassword({ email: form.elements.email.value.trim(), password: form.elements.password.value });
        form.elements.password.value = '';
        if (error) status('로그인하지 못했습니다. 이메일과 비밀번호를 확인해 주세요.');
      } catch { status('로그인 서버에 연결하지 못했습니다.'); }
      finally { busy = false; }
    });
    el('#learning-sync-logout').addEventListener('click', async () => {
      // 전송 대기 기록은 계정별 캐시에 유지합니다.
      ++epoch; stop(); userId = '';
      const { error } = await client.auth.signOut({ scope: 'local' });
      if (error) status('로그아웃을 완료하지 못했습니다. 다시 시도해 주세요.');
      else sessionChanged(null);
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
          if (remote) { await sessionChanged({ user: { id: uid } }); return; }
          const local = sharedLearningState(getState(), today);
          backupLocal();
          const result = await write(uid, 0, local);
          if (ticket !== epoch) return;
          if (!result) { await sessionChanged({ user: { id: uid } }); return; }
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
    el('#learning-sync-retry').addEventListener('click', () => engine ? engine.sync() : client.auth.getSession().then(({data}) => sessionChanged(data.session)).catch(() => status('연결을 다시 확인해 주세요.')));
    el('#learning-sync-local').addEventListener('click', () => engine?.resolve('local'));
    el('#learning-sync-remote').addEventListener('click', () => engine?.resolve('remote'));
    client.auth.onAuthStateChange((_event, session) => { setTimeout(() => sessionChanged(session), 0); });
    const { data } = await client.auth.getSession();
    await sessionChanged(data.session);
    // 실시간 연결이 끊기거나 휴대폰이 절전에서 돌아올 때도 변경을 놓치지 않습니다.
    setInterval(() => { if (document.visibilityState === 'visible') engine?.sync(); }, 15_000);
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
  }
  boot().catch(() => status('동기화 모듈 연결 실패 · 이 기기의 기록은 유지됩니다.'));
  return { changed };
}
