import { COURSES } from './learning-data.js?v=17';
import { courseProgressFor, normalizeLearningState } from './learning-core.js?v=17';

const object = value => value !== null && typeof value === 'object' && !Array.isArray(value);
const clone = value => value === undefined ? undefined : JSON.parse(JSON.stringify(value));
export function equalSyncValue(a, b) {
  if (a === b) return true;
  if (Array.isArray(a) && Array.isArray(b)) return a.length === b.length && a.every((v, i) => equalSyncValue(v, b[i]));
  if (object(a) && object(b)) return Object.keys(a).length === Object.keys(b).length && Object.keys(a).every(k => Object.hasOwn(b, k) && equalSyncValue(a[k], b[k]));
  return false;
}

// 화면 선택과 날짜는 각 기기에 남깁니다. 체크 해제·삭제도 명시적인 값으로 공유합니다.
export function sharedLearningState(candidate, today) {
  const state = normalizeLearningState(candidate, today);
  return {
    version: 1,
    courses: Object.fromEntries(COURSES.map(c => {
      return [c.id, courseProgressFor(state, c.id)];
    })),
    courseOrder: state.courseOrder,
    daily: state.daily,
    sessions: state.sessions,
    studyLogs: Object.fromEntries(state.studyLogs.map(log => [log.id, log])),
    youthProgram: { ...state.youthProgram, events: Object.fromEntries(state.youthProgram.events.map(event => [event.id, event])) },
  };
}

export function applySharedLearningState(local, shared, today) {
  if (shared?.version !== 1 || !object(shared.courses) || !object(shared.studyLogs) || !object(shared.youthProgram?.events)) throw new Error('지원하지 않는 서버 기록입니다.');
  return normalizeLearningState({ ...local, ...shared, studyLogs: Object.values(shared.studyLogs).sort((a, b) => a.date.localeCompare(b.date) || a.id.localeCompare(b.id)), youthProgram: { ...shared.youthProgram, events: Object.values(shared.youthProgram.events) } }, today);
}

export function mergeLearningChanges(base, local, remote, prefer = '') {
  const conflicts = [];
  function merge(b, l, r, path) {
    if (equalSyncValue(l, b)) return clone(r);
    if (equalSyncValue(r, b) || equalSyncValue(l, r)) return clone(l);
    if (object(l) && object(r) && (object(b) || b === undefined)) {
      const result = {};
      for (const key of new Set([...Object.keys(b || {}), ...Object.keys(l), ...Object.keys(r)])) {
        if (['__proto__', 'constructor', 'prototype'].includes(key)) continue;
        const value = merge(b?.[key], l[key], r[key], [...path, key]);
        if (value !== undefined) result[key] = value;
      }
      return result;
    }
    if (path.at(-1) === 'updatedDate' && typeof l === 'string' && typeof r === 'string') return l > r ? l : r;
    conflicts.push(path.join('.'));
    return clone(prefer === 'remote' ? r : l);
  }
  return { value: merge(base, local, remote, []), conflicts };
}

// 통신 구현을 주입해 두 기기·충돌·오프라인을 개인 기록 없이 검증합니다.
export function createLearningSyncEngine({ base, local, read, write, persist, onState, onStatus }) {
  let baseline = clone(base);
  let current = clone(local);
  let running = false;
  let stopped = false;
  let preference = '';
  let conflict = false;
  function checkpoint() { persist({ base: baseline, local: current }); }
  function update(value) {
    if (stopped) throw new Error('동기화 연결이 종료되었습니다.');
    const previous = current;
    current = clone(value);
    try { checkpoint(); } catch (error) { current = previous; throw error; }
    conflict = false;
    onStatus('pending');
  }
  async function sync() {
    if (stopped || running || conflict) return;
    running = true;
    try {
      for (let attempt = 0; attempt < 4 && !stopped; attempt++) {
        const remote = await read();
        if (stopped) return;
        if (!remote) throw new Error('서버 기록이 없습니다.');
        const merged = mergeLearningChanges(baseline.data, current, remote.data, preference);
        if (merged.conflicts.length && !preference) {
          conflict = true; onStatus('conflict', merged.conflicts.length); return;
        }
        const sent = clone(current);
        let acknowledged = remote;
        if (!equalSyncValue(merged.value, remote.data)) {
          const result = await write(remote.revision, merged.value);
          if (stopped) return;
          if (!result) continue; // 다른 기기가 먼저 저장했으면 다시 읽습니다.
          acknowledged = result;
        }
        const remaining = mergeLearningChanges(sent, current, acknowledged.data);
        const changed = !equalSyncValue(current, remaining.value);
        // 화면의 기기 저장이 실패하면 기준 버전을 먼저 확정하지 않습니다.
        // 그래야 다음 접속 때 이전 원문을 새 변경으로 보고 서버에 되돌리지 않습니다.
        if (changed) onState(clone(remaining.value));
        baseline = clone(acknowledged);
        current = remaining.value;
        checkpoint();
        preference = '';
        if (equalSyncValue(current, baseline.data)) { onStatus('synced'); return; }
      }
      if (!stopped) onStatus('pending');
    } catch { if (!stopped) onStatus('offline'); }
    finally { running = false; }
  }
  return {
    update, sync,
    resolve(choice) { preference = choice === 'remote' ? 'remote' : 'local'; conflict = false; return sync(); },
    stop() { stopped = true; },
    isPending: () => !equalSyncValue(current, baseline.data),
    snapshot: () => clone({ base: baseline, local: current }),
  };
}
