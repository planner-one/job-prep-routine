import { LEARNING_STORAGE_KEY, normalizeLearningState, selectedCourseSummary } from './learning-core.js?v=15';

export const RECOVERY_KEY = `${LEARNING_STORAGE_KEY}:before-import`;
const FORMAT = 'job-prep-learning-backup';
export function serializeLearningBackup(state, today) {
  return JSON.stringify({ format: FORMAT, version: 1, exportedAt: new Date().toISOString(), state: normalizeLearningState(state, today) }, null, 2);
}

export function parseLearningBackup(text, today) {
  if (text.length > 5_000_000) throw new Error('파일이 너무 큽니다. 2주 학습에서 내보낸 파일을 선택해 주세요.');
  let payload;
  try { payload = JSON.parse(text); } catch { throw new Error('읽을 수 없는 파일입니다. JSON 백업 파일을 선택해 주세요.'); }
  const state = payload?.state;
  if (payload?.format !== FORMAT || payload.version !== 1 || state?.version !== 1 || !state.courses || Array.isArray(state.courses) || typeof state.courses !== 'object' || !Array.isArray(state.studyLogs) || !Array.isArray(state.courseOrder)) {
    throw new Error('지원하는 2주 학습 백업 파일이 아닙니다.');
  }
  return normalizeLearningState(state, today);
}

export function importLearningBackup(storage, incoming, today) {
  // 기존 원문은 정규화 없이 보존합니다. 백업이 실패하면 기존 기록도 바꾸지 않습니다.
  const previous = storage.getItem(LEARNING_STORAGE_KEY);
  storage.setItem(RECOVERY_KEY, previous ?? JSON.stringify(normalizeLearningState({}, today)));
  const normalized = normalizeLearningState(incoming, today);
  storage.setItem(LEARNING_STORAGE_KEY, JSON.stringify(normalized));
  return normalized;
}

export function restoreLearningBackup(storage, today) {
  const previous = storage.getItem(RECOVERY_KEY);
  if (previous === null) throw new Error('복구할 기록이 없습니다.');
  const state = normalizeLearningState(JSON.parse(previous), today);
  storage.setItem(LEARNING_STORAGE_KEY, previous);
  storage.removeItem(RECOVERY_KEY);
  return state;
}

export function setupLearningTransfer(root, storage, today, getState, onImport) {
  const el = selector => root.querySelector(selector);
  let pending = null;
  let fileRequest = 0;
  const status = message => { el('#learning-transfer-status').textContent = message; };
  const refreshUndo = () => {
    try { el('#learning-import-undo').hidden = storage?.getItem(RECOVERY_KEY) == null; } catch { /* 저장 접근 오류는 작업 시 안내합니다. */ }
  };
  el('#learning-export').addEventListener('click', () => {
    try {
      // 다른 탭에서 저장한 최신 기록이 있으면 그 값을 내보냅니다.
      const raw = storage?.getItem(LEARNING_STORAGE_KEY);
      const state = raw ? JSON.parse(raw) : getState();
      const url = URL.createObjectURL(new Blob([serializeLearningBackup(state, today)], { type: 'application/json' }));
      const anchor = root.ownerDocument.createElement('a');
      anchor.href = url; anchor.download = `2주학습-기록-${today}.json`;
      anchor.click(); setTimeout(() => URL.revokeObjectURL(url), 30_000);
      status('백업 파일 다운로드를 요청했습니다. 파일을 다른 기기로 보내 불러오세요.');
    } catch { status('기록을 내보내지 못했습니다. 저장소 접근과 다운로드 설정을 확인해 주세요.'); }
  });
  el('#learning-import').addEventListener('change', async event => {
    const request = ++fileRequest;
    pending = null; el('#learning-import-preview').hidden = true;
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      if (file.size > 5_000_000) throw new Error('5MB 이하의 학습 백업 파일을 선택해 주세요.');
      const imported = parseLearningBackup(await file.text(), today);
      if (request !== fileRequest) return;
      pending = imported;
      const summary = selectedCourseSummary(imported);
      el('#learning-import-summary').textContent = `가져올 기록: 선택 강의 ${summary.count}개 · 학습 기록 ${imported.studyLogs.length}개 · 프로그램 일정 ${imported.youthProgram.events.length}개`;
      el('#learning-import-preview').hidden = false;
      status('파일을 확인했습니다. 아래 내용을 확인한 후 반영하세요.');
    } catch (error) { if (request === fileRequest) status(error.message); }
  });
  el('#learning-import-cancel').addEventListener('click', () => {
    ++fileRequest; pending = null; el('#learning-import-preview').hidden = true; el('#learning-import').value = ''; status('취소했습니다. 기존 기록을 유지합니다.');
  });
  el('#learning-import-apply').addEventListener('click', () => {
    if (!pending) return;
    try {
      const imported = importLearningBackup(storage, pending, today);
      pending = null; el('#learning-import-preview').hidden = true; el('#learning-import').value = '';
      onImport(imported); refreshUndo(); status('이 기기에 반영했습니다. 기기 동기화가 연결돼 있으면 서버에도 반영합니다.');
    } catch { status('저장하지 못했습니다. 기기 저장 공간과 브라우저 설정을 확인해 주세요.'); refreshUndo(); }
  });
  el('#learning-import-undo').addEventListener('click', () => {
    try { onImport(restoreLearningBackup(storage, today)); refreshUndo(); status('가져오기 전 기록으로 복구했습니다.'); }
    catch { status('복구하지 못했습니다. 기존 백업 파일을 보관해 주세요.'); }
  });
  refreshUndo();
}
