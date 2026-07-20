# 주간 일정 플래너·데일리 실행 연동 구현 계획

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 주간 실행 보드를 식사·취침 앵커 기반 세로 일정 플래너로 바꾸고, 계획을 해당 날짜의 데일리 실행 체크와 안전하게 연동한다.

**Architecture:** DOM과 무관한 `weekly-plan-core.js`가 계획 스키마·마이그레이션·분 단위 자동 배치를 담당하고, `daily-plan-core.js`가 날짜별 계획 해석·실행 스냅샷·주간 실행 집계를 담당한다. 주간 화면은 계획만 수정하고 데일리 결과를 읽기 전용으로 표시하며, 데일리 화면만 실제 체크·지원·메모를 저장한다. 기존 주간 체크는 레거시 완료 데이터로 보존하고 기록 화면에서만 대체 자료로 사용한다.

**Tech Stack:** 정적 HTML, CSS, 브라우저 ES Modules, `localStorage`, Node.js 내장 테스트 러너, Chrome DevTools Protocol 브라우저 테스트

## Global Constraints

- 모든 사용자 문구는 한국어를 기본으로 한다.
- 점심은 모든 운영 유형에서 `13:00–14:00`으로 고정한다.
- 아침·점심·저녁·취침만 고정 앵커이며 일반 일정은 이동할 수 있다.
- 평상시 시간은 `09:30–10:00`처럼 한 범위로 표시하고 물결표나 반복되는 오전·오후 입력을 노출하지 않는다.
- 주간 계획 자체는 완료율·생산성 활동으로 집계하지 않는다.
- 실제 실행 입력은 데일리에서만 받는다.
- 기존 `job-prep-routine:weekly:*`, `daily:*`, `roadmap:*` 값을 삭제하거나 손실시키지 않는다.
- 오전 2시 논리 날짜 경계를 유지한다.
- 로그인, 데이터베이스, 외부 배포는 구현하지 않는다.
- 현재 브랜치 `codex/job-prep-routine`에서 작업하며 기존 8787 서버를 재시작하거나 저장소 루트를 바꾸지 않는다.

---

### Task 1: 분 단위 주간 계획 코어와 비손실 마이그레이션

**Files:**
- Create: `src/weekly-plan-core.js`
- Create: `tests/weekly-plan-core.test.mjs`
- Modify: `src/routine-data.js`
- Modify: `package.json`

**Interfaces:**
- Produces: `WEEKDAYS`, `PLAN_SCHEMA_VERSION`, `TASK_LIBRARY`, `weekMondayKey(value)`, `weekdayIdForDate(value)`, `formatMinuteRange(startMinute, endMinute)`, `createDefaultWeeklyState()`, `normalizeWeeklyState(candidate)`, `getFixedAnchors(mode, runStart)`, `getDayTimeline(day)`, `movePlanItem(day, itemId, targetIndex)`, `addLibraryPlanItem(day, taskId, options)`, `addCustomPlanItem(day, input, idFactory)`, `removePlanItem(day, itemId)`, `updatePlanItemTime(day, itemId, startMinute, endMinute)`, `changeDayMode(day, mode, runStart)`, `resetWeeklyPlans(state)`
- Consumes: `getSchedule(mode, runStart)` and `LEARNING_TOPICS` from `src/routine-data.js`

- [ ] **Step 1: Write failing tests for anchors, reflow, overflow, custom IDs, and v1 migration**

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import {
  addCustomPlanItem,
  createDefaultWeeklyState,
  getFixedAnchors,
  movePlanItem,
  normalizeWeeklyState,
  updatePlanItemTime,
} from '../src/weekly-plan-core.js';

test('모드별 식사와 취침 앵커를 분 단위로 만든다', () => {
  assert.deepEqual(
    getFixedAnchors('workout', '21').map(({ id, startMinute, endMinute }) => [id, startMinute, endMinute]),
    [
      ['breakfast', 450, 530],
      ['lunch', 780, 840],
      ['dinner', 1130, 1190],
      ['sleep', 1380, 1440],
    ],
  );
  assert.equal(getFixedAnchors('running', '22').at(-1).startMinute, 1440);
});

test('순서를 바꾸면 소요시간을 지키고 넘친 항목은 미배치한다', () => {
  const day = createDefaultWeeklyState().days.mon;
  const result = movePlanItem(day, 'interview-practice', day.timelineOrder.length - 1);
  assert.equal(result.items.every((item) => item.endMinute <= 1440), true);
  assert.equal(result.items.every((item, index, items) => index === 0 || items[index - 1].endMinute <= item.startMinute), true);
  assert.equal(result.unscheduled.every((item) => item.reason === 'insufficient-time'), true);
});

test('직접 일정은 안정적인 ID와 소요시간을 저장한다', () => {
  const day = createDefaultWeeklyState().days.tue;
  const next = addCustomPlanItem(
    day,
    { label: '개인 프로젝트 README 정리', category: 'learning', durationMinutes: 40 },
    () => 'custom-fixed-id',
  );
  assert.equal(next.items.some(({ id, durationMinutes }) => id === 'custom-fixed-id' && durationMinutes === 40), true);
});

test('기존 체크는 레거시 완료로 보존하고 계획과 분리한다', () => {
  const normalized = normalizeWeeklyState({
    selectedDay: 'wed',
    maintenanceDay: 'sun',
    days: { wed: { mode: 'running', runStart: '22', tasks: { interview: true }, applications: [true] } },
  });
  assert.equal(normalized.schemaVersion, 2);
  assert.equal(normalized.days.wed.legacyCompletion.tasks.interview, true);
  assert.equal(normalized.days.wed.legacyCompletion.applications[0], true);
  assert.equal(normalized.days.wed.items.some(({ completed }) => completed), false);
});

test('고정 앵커와 겹치는 수동 시간은 거부한다', () => {
  const day = createDefaultWeeklyState().days.mon;
  assert.throws(() => updatePlanItemTime(day, 'portfolio-review', 790, 820), /고정 일정과 겹칩니다/);
});
```

- [ ] **Step 2: Run the focused test and verify RED**

Run: `node --test tests/weekly-plan-core.test.mjs`

Expected: FAIL because `src/weekly-plan-core.js` does not exist.

- [ ] **Step 3: Add numeric task-library metadata and the pure plan core**

`src/routine-data.js`에 다음 형태의 기본 목록을 export한다.

```js
export const TASK_LIBRARY = [
  { id: 'scan', label: '일정·공고 확인', category: 'career', durationMinutes: 30 },
  { id: 'job-analysis', label: '공고 분석', category: 'career', durationMinutes: 60 },
  { id: 'applications', label: '자소서 조정·지원', category: 'career', durationMinutes: 150 },
  { id: 'portfolio-review', label: '이력서·포트폴리오 숙지', category: 'career', durationMinutes: 30 },
  { id: 'interview-practice', label: '면접 연습·복기', category: 'career', durationMinutes: 120 },
  { id: 'Spring', label: 'Spring', category: 'learning', durationMinutes: 60 },
  { id: 'Redis', label: 'Redis', category: 'learning', durationMinutes: 60 },
  { id: 'Java', label: 'Java', category: 'learning', durationMinutes: 60 },
  { id: 'CS', label: 'CS', category: 'learning', durationMinutes: 60 },
  { id: '코딩테스트', label: '코딩테스트', category: 'learning', durationMinutes: 60 },
  { id: '프로젝트 적용', label: '프로젝트 적용', category: 'learning', durationMinutes: 60 },
  { id: 'workout', label: '아침 운동', category: 'exercise', durationMinutes: 90 },
  { id: 'run', label: '이동 포함 저녁 러닝', category: 'exercise', durationMinutes: 60 },
  { id: 'shower', label: '샤워·정리', category: 'exercise', durationMinutes: 30 },
  { id: 'wrap', label: '가벼운 마무리·내일 준비', category: 'career', durationMinutes: 30 },
];
```

`src/weekly-plan-core.js`는 다음 규칙으로 완성한다.

```js
import { LEARNING_TOPICS, TASK_LIBRARY, getSchedule } from './routine-data.js';

export { TASK_LIBRARY } from './routine-data.js';

export const PLAN_SCHEMA_VERSION = 2;
export const WEEKDAYS = [
  { id: 'mon', label: '월요일' }, { id: 'tue', label: '화요일' },
  { id: 'wed', label: '수요일' }, { id: 'thu', label: '목요일' },
  { id: 'fri', label: '금요일' }, { id: 'sat', label: '토요일' },
  { id: 'sun', label: '일요일' },
];

const DAY_START = { workout: 340, normal: 420, running: 420, maintenance: 480 };
const ANCHORS = {
  workout: [[450, 530], [780, 840], [1130, 1190], [1380, 1440]],
  normal: [[430, 500], [780, 840], [1130, 1190], [1380, 1440]],
  'running-21': [[430, 500], [780, 840], [1130, 1190], [1380, 1440]],
  'running-22': [[430, 500], [780, 840], [1130, 1190], [1440, 1440]],
  maintenance: [[490, 540], [780, 840], [1080, 1140], [1380, 1380]],
};
const ANCHOR_IDS = ['breakfast', 'lunch', 'dinner', 'sleep'];

export function getFixedAnchors(mode, runStart = '21') {
  const key = mode === 'running' ? `running-${runStart === '22' ? '22' : '21'}` : mode;
  return ANCHORS[key].map(([startMinute, endMinute], index) => ({
    id: ANCHOR_IDS[index],
    label: ['아침·식후 20분', '점심·식후 20분', '저녁·식후 20분', '취침'][index],
    category: index === 3 ? 'exercise' : 'meal',
    fixed: true,
    startMinute,
    endMinute,
  }));
}

function reflow(day) {
  const anchors = getFixedAnchors(day.mode, day.runStart);
  const byId = new Map(
    [...day.items, ...(Array.isArray(day.unscheduled) ? day.unscheduled : [])]
      .map((item) => [item.id, { ...item }]),
  );
  const scheduled = [];
  const unscheduled = [];
  let cursor = DAY_START[day.mode];
  for (const token of day.timelineOrder) {
    const anchor = anchors.find(({ id }) => id === token);
    if (anchor) { scheduled.push(anchor); cursor = anchor.endMinute; continue; }
    const item = byId.get(token);
    if (!item) continue;
    const nextAnchor = anchors.find(({ startMinute }) => startMinute >= cursor);
    const boundary = nextAnchor?.startMinute ?? anchors.at(-1).startMinute;
    if (cursor + item.durationMinutes > boundary) {
      unscheduled.push({ ...item, reason: 'insufficient-time' });
      continue;
    }
    item.startMinute = cursor;
    item.endMinute = cursor + item.durationMinutes;
    scheduled.push(item);
    cursor = item.endMinute;
  }
  return { ...day, items: scheduled.filter(({ fixed }) => !fixed), unscheduled };
}
```

모든 export 함수는 입력 객체를 직접 변경하지 않고 복제본을 반환하며 다음 계약을 구현한다.

- `createDefaultWeeklyState()`는 기존 월~일 기본 모드와 일요일 유지일을 사용하고, `getSchedule()`의 각 유형 일정에서 식사·취침을 앵커로 분리한 v2 계획을 만든다.
- `formatMinuteRange()`는 같은 시작·종료면 `23:00`, 범위면 `09:30–10:00`, 1440분이면 `24:00`을 반환한다.
- `normalizeWeeklyState()`는 v2의 ID·라벨·카테고리·소요시간·순서·미배치·revision을 검증한다. v1 입력이면 `applications`, `tasks`, `learningTopics`, `maintenance`를 `legacyCompletion`으로 옮긴 뒤 기본 계획을 만든다.
- `getDayTimeline()`은 일반 일정과 고정 앵커를 시작 시각 순서로 합치고 미배치 항목에는 `unscheduled: true`를 표시한다.
- `movePlanItem()`은 대상 ID를 `timelineOrder`의 `targetIndex`로 옮긴 뒤 `reflow()` 결과를 반환한다. 고정 앵커 ID 이동 요청은 원본 복제본을 그대로 반환한다.
- `addLibraryPlanItem()`은 같은 기본 ID의 중복을 거부한다. `options.topics`가 있으면 허용된 학습 주제를 원래 순서로 합쳐 `Spring · Redis` 같은 한 항목과 합계 소요시간을 만든다.
- `addCustomPlanItem()`은 공백 이름, 허용되지 않은 카테고리, 10분 미만 또는 480분 초과 소요시간을 거부하고 `idFactory()` 결과를 안정적인 ID로 저장한다.
- `removePlanItem()`은 일반 일정만 제거하고 같은 ID를 배치·미배치·순서에서 함께 제거한다.
- `updatePlanItemTime()`은 0~1440분 범위, 종료가 시작보다 늦음, 앵커·다른 일정과 겹치지 않음을 검증한 뒤 시작·종료·소요시간을 함께 갱신하고 revision을 증가시킨다.
- `changeDayMode()`는 유형 종속 기본 활동과 앵커만 교체하고 취업·학습·사용자 일정 ID를 보존한 뒤 재배치한다.
- `resetWeeklyPlans()`는 일곱 요일의 계획만 기본화하고 각 요일의 `legacyCompletion`은 그대로 복사한다.

시간 문자열은 초기 기본 계획 변환에만 사용하고 저장·충돌·배치는 분 단위 필드로 수행한다.

- [ ] **Step 4: Add the new module to syntax checks**

`package.json`의 `check`에 `node --check src/weekly-plan-core.js`를 추가한다.

- [ ] **Step 5: Run focused tests and syntax checks**

Run: `node --test tests/weekly-plan-core.test.mjs && npm run check`

Expected: all focused tests PASS and every syntax check exits 0.

- [ ] **Step 6: Commit Task 1**

```bash
git add src/routine-data.js src/weekly-plan-core.js tests/weekly-plan-core.test.mjs package.json
git commit -m "feat: 주간 일정 계획 코어를 추가"
```

### Task 2: 데일리 계획 해석·실행 스냅샷 코어

**Files:**
- Create: `src/daily-plan-core.js`
- Create: `tests/daily-plan-core.test.mjs`
- Modify: `package.json`

**Interfaces:**
- Consumes: `weekMondayKey`, `weekdayIdForDate`, `normalizeWeeklyState`, `getDayTimeline` from `src/weekly-plan-core.js`
- Produces: `resolveDailyPlan(date, weeklyCandidate)`, `normalizePlanSnapshot(candidate)`, `hasExecutionInput(dailyState)`, `prepareDailyPlan(dailyState, resolvedPlan)`, `applyUpdatedPlan(dailyState, resolvedPlan)`, `buildDailyExecutionSummary(dailyState)`

- [ ] **Step 1: Write failing snapshot and merge tests**

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import {
  applyUpdatedPlan,
  prepareDailyPlan,
  resolveDailyPlan,
} from '../src/daily-plan-core.js';
import { createDefaultWeeklyState } from '../src/weekly-plan-core.js';

test('날짜에 맞는 요일 계획을 해석한다', () => {
  const weekly = createDefaultWeeklyState();
  const plan = resolveDailyPlan('2026-07-22', weekly);
  assert.equal(plan.dayId, 'wed');
  assert.equal(plan.weekKey, '2026-07-20');
  assert.equal(plan.items.length > 0, true);
});

test('실행 전에는 최신 계획을 쓰고 입력 후에는 스냅샷을 고정한다', () => {
  const weekly = createDefaultWeeklyState();
  const resolved = resolveDailyPlan('2026-07-20', weekly);
  const before = prepareDailyPlan({ checkedIds: [], companies: [], memos: {} }, resolved);
  assert.equal(before.needsPlanUpdate, false);
  assert.equal(before.renderPlan.revision, resolved.revision);

  const executed = { ...before.state, checkedIds: [resolved.items[0].id], planSnapshot: resolved };
  const changed = { ...resolved, revision: resolved.revision + 1, items: resolved.items.slice(1) };
  const after = prepareDailyPlan(executed, changed);
  assert.equal(after.needsPlanUpdate, true);
  assert.equal(after.renderPlan.items[0].id, resolved.items[0].id);
});

test('변경 계획 적용 시 같은 체크와 삭제된 완료 항목을 보존한다', () => {
  const weekly = createDefaultWeeklyState();
  const oldPlan = resolveDailyPlan('2026-07-20', weekly);
  const removed = oldPlan.items[0];
  const daily = { checkedIds: [removed.id], planSnapshot: oldPlan, archivedCompletedItems: [] };
  const nextPlan = { ...oldPlan, revision: oldPlan.revision + 1, items: oldPlan.items.slice(1) };
  const merged = applyUpdatedPlan(daily, nextPlan);
  assert.equal(merged.checkedIds.includes(removed.id), true);
  assert.equal(merged.archivedCompletedItems.some(({ id }) => id === removed.id), true);
});
```

- [ ] **Step 2: Run the focused test and verify RED**

Run: `node --test tests/daily-plan-core.test.mjs`

Expected: FAIL because `src/daily-plan-core.js` does not exist.

- [ ] **Step 3: Implement pure daily-plan resolution and snapshot merge**

```js
import {
  getDayTimeline,
  normalizeWeeklyState,
  weekMondayKey,
  weekdayIdForDate,
} from './weekly-plan-core.js';

export function resolveDailyPlan(date, weeklyCandidate) {
  const weekly = normalizeWeeklyState(weeklyCandidate);
  const dayId = weekdayIdForDate(date);
  const day = weekly.days[dayId];
  return {
    weekKey: weekMondayKey(date),
    dayId,
    revision: day.revision,
    mode: dayId === weekly.maintenanceDay ? 'maintenance' : day.mode,
    runStart: day.runStart,
    items: getDayTimeline(day).filter(({ unscheduled }) => !unscheduled),
  };
}

export function hasExecutionInput(state = {}) {
  const companies = Array.isArray(state.companies) ? state.companies : [];
  const memos = state.memos && typeof state.memos === 'object' ? state.memos : {};
  return Boolean(
    state.checkedIds?.length ||
    companies.some((company) => company?.name || company?.link || company?.analyzed || company?.letter || company?.applied) ||
    Object.values(memos).some((value) => typeof value === 'string' && value.trim()),
  );
}

export function prepareDailyPlan(state, resolvedPlan) {
  const snapshot = normalizePlanSnapshot(state.planSnapshot);
  if (!snapshot || !hasExecutionInput(state)) {
    return { state, renderPlan: resolvedPlan, needsPlanUpdate: false };
  }
  return {
    state,
    renderPlan: snapshot,
    needsPlanUpdate: snapshot.revision !== resolvedPlan.revision,
  };
}
```

`normalizePlanSnapshot()`은 ID, 라벨, 카테고리, 시작·종료, 계획 버전만 허용한다. `applyUpdatedPlan()`은 동일 ID의 체크를 유지하고, 새 항목은 미완료로 추가하며, 삭제된 완료 항목의 메타데이터를 `archivedCompletedItems`에 중복 없이 보존한다. `buildDailyExecutionSummary()`는 스냅샷과 체크 ID, 회사 파이프라인을 이용해 지원·숙지·면접·운동·러닝·학습 완료만 반환한다.

- [ ] **Step 4: Add syntax checking and run focused tests**

Run: `node --test tests/daily-plan-core.test.mjs && npm run check`

Expected: all focused tests PASS after adding `node --check src/daily-plan-core.js` to `package.json`.

- [ ] **Step 5: Commit Task 2**

```bash
git add src/daily-plan-core.js tests/daily-plan-core.test.mjs package.json
git commit -m "feat: 데일리 실행 스냅샷 코어를 추가"
```

### Task 3: 주간 세로 플래너·일정 추가·시간 편집 UI

**Files:**
- Modify: `weekly.html`
- Modify: `src/weekly-app.js`
- Modify: `assets/routine.css`
- Modify: `tests/weekly-app.test.mjs`
- Modify: `tests/weekly-contract.test.mjs`
- Modify: `tests/weekly-browser.test.mjs`

**Interfaces:**
- Consumes: all plan mutation and rendering functions from `src/weekly-plan-core.js`
- Produces: one editable vertical timeline per selected weekday, `data-plan-item-id` rows, `#weekly-add-plan`, `#weekly-time-edit`, `#weekly-plan-list`, `#weekly-unscheduled-list`, and persisted schema-v2 weekly state

- [ ] **Step 1: Replace old checklist assertions with failing planner contracts**

```js
test('선택 요일은 중복 체크리스트 없이 하나의 세로 플래너를 제공한다', () => {
  assert.match(html, /id="weekly-plan-list"/);
  assert.match(html, /id="weekly-add-plan"/);
  assert.match(html, /id="weekly-time-edit"/);
  assert.match(html, /id="weekly-unscheduled-list"/);
  assert.doesNotMatch(html, /data-weekly-application|data-weekly-task|data-maintenance-task/);
});

test('목록 상단 오른쪽에 일정 추가와 시간 편집을 둔다', () => {
  const header = html.match(/<header class="weekly-planner-header"[\s\S]*?<\/header>/)?.[0] ?? '';
  assert.match(header, /id="weekly-add-plan"[\s\S]*id="weekly-time-edit"/);
});
```

브라우저 테스트에는 기본 일정 추가, 직접 일정 추가, 아래 이동, 시간 편집 취소·저장, 미배치 경고, 새로고침 복원을 한 흐름으로 추가한다.

- [ ] **Step 2: Run weekly tests and verify RED**

Run: `node --test tests/weekly-app.test.mjs tests/weekly-contract.test.mjs tests/weekly-browser.test.mjs`

Expected: FAIL because the old checkbox/two-column DOM is still present.

- [ ] **Step 3: Replace the detail grid with one planner surface**

`weekly.html`의 기존 `weekly-checklist-column`과 `weekly-schedule-column`을 다음 구조로 교체한다.

```html
<section class="weekly-planner" aria-labelledby="weekly-planner-title">
  <header class="weekly-planner-header">
    <div>
      <p class="section-kicker">선택하고 순서를 정하는 이번 주 계획</p>
      <h3 id="weekly-planner-title">월요일 일정</h3>
    </div>
    <div class="weekly-planner-actions screen-only">
      <button type="button" id="weekly-add-plan" aria-expanded="false" aria-controls="weekly-add-panel">일정 추가</button>
      <button type="button" id="weekly-time-edit" aria-pressed="false">시간 편집</button>
    </div>
  </header>
  <section id="weekly-add-panel" class="weekly-add-panel screen-only" hidden></section>
  <p id="weekly-plan-status" class="visually-hidden" aria-live="polite"></p>
  <ol id="weekly-plan-list" class="weekly-plan-list"></ol>
  <section id="weekly-unscheduled" class="weekly-unscheduled" hidden>
    <h4>미배치 일정 <span id="weekly-unscheduled-count">0</span></h4>
    <p>시간이 부족해 배치되지 않은 일정이 있습니다.</p>
    <ol id="weekly-unscheduled-list"></ol>
  </section>
</section>
```

- [ ] **Step 4: Render accessible rows and wire mutations**

`src/weekly-app.js`는 기존 체크 완료 상수를 제거하고 plan core를 import한다. 행은 다음 DOM 계약으로 생성한다.

```js
function renderPlanRow(document, item, { editingTime = false } = {}) {
  const row = document.createElement('li');
  row.dataset.planItemId = item.id;
  row.className = `weekly-plan-row${item.fixed ? ' is-fixed' : ''}`;
  row.innerHTML = `
    ${item.fixed ? '' : '<button type="button" class="plan-drag" data-plan-drag aria-label="일정 이동">≡</button>'}
    <span class="weekly-plan-time">${formatMinuteRange(item.startMinute, item.endMinute)}</span>
    <span class="weekly-plan-label"></span>
    <span class="weekly-plan-state">${item.fixed ? '고정' : '예정'}</span>
    ${item.fixed ? '' : '<span class="plan-move-actions"><button type="button" data-move="up" aria-label="위로 이동">↑</button><button type="button" data-move="down" aria-label="아래로 이동">↓</button></span>'}
  `;
  row.querySelector('.weekly-plan-label').textContent = item.label;
  if (editingTime && !item.fixed) row.append(createCompactTimeEditor(document, item));
  return row;
}
```

`createCompactTimeEditor(document, item)`은 행 아래에 `시작`, `종료`, `저장`, `취소`만 있는 작은 편집 영역을 만들고 두 time input의 값을 `HH:MM`으로 초기화한다. 이벤트 위임으로 일정 추가 패널 열기, 기본 일정 추가, 학습 주제 묶기, 직접 일정 추가, 삭제, 위·아래 이동, pointer drag, 시간 편집 저장·취소를 연결한다. 모든 변경은 `normalizeWeeklyState()` 후 기존 weekly 키에 즉시 저장하고 선택 요일만 다시 그린다. 시간 재계산·미배치·오류 메시지는 `#weekly-plan-status`에도 알린다.

- [ ] **Step 5: Add clear list typography, edit, overflow, and responsive styles**

```css
.weekly-planner-header { display: flex; justify-content: space-between; gap: 1rem; align-items: center; }
.weekly-plan-list { list-style: none; margin: 0; padding: 0; border: 1px solid var(--line); border-radius: 20px; overflow: hidden; }
.weekly-plan-row { display: grid; grid-template-columns: 2.25rem 7.5rem 1fr auto auto; align-items: center; min-height: 4.25rem; gap: .75rem; padding: .75rem 1rem; border-top: 1px solid var(--line); }
.weekly-plan-row:first-child { border-top: 0; }
.weekly-plan-time { font-size: .95rem; font-weight: 750; font-variant-numeric: tabular-nums; }
.weekly-plan-label { font-size: 1.06rem; font-weight: 700; }
.weekly-plan-row.is-fixed { background: var(--paper-soft); grid-template-columns: 7.5rem 1fr auto; }
.weekly-unscheduled { margin-top: 1rem; border: 1px solid #d97706; border-radius: 18px; padding: 1rem; background: #fff8eb; }
```

모바일에서는 시간·라벨을 유지하고 이동 버튼을 다음 줄에 놓는다. 인쇄에서는 추가·편집·드래그·이동·삭제 버튼을 숨긴다.

- [ ] **Step 6: Run weekly focused tests**

Run: `node --test tests/weekly-app.test.mjs tests/weekly-contract.test.mjs tests/weekly-browser.test.mjs`

Expected: all weekly tests PASS.

- [ ] **Step 7: Commit Task 3**

```bash
git add weekly.html src/weekly-app.js assets/routine.css tests/weekly-app.test.mjs tests/weekly-contract.test.mjs tests/weekly-browser.test.mjs
git commit -m "feat: 주간 보드를 세로 일정 플래너로 전환"
```

### Task 4: 데일리 실행 전용 일정과 계획 변경 반영

**Files:**
- Modify: `daily.html`
- Modify: `src/page-app.js`
- Modify: `src/routine-core.js`
- Modify: `assets/routine.css`
- Modify: `tests/page-app.test.mjs`
- Modify: `tests/routine-core.test.mjs`
- Modify: `tests/daily-contract.test.mjs`
- Modify: `tests/daily-browser.test.mjs`

**Interfaces:**
- Consumes: `resolveDailyPlan`, `prepareDailyPlan`, `applyUpdatedPlan`, `hasExecutionInput` from `src/daily-plan-core.js`; `normalizeWeeklyState`, `createDefaultWeeklyState`, and `weekMondayKey` from `src/weekly-plan-core.js`
- Produces: daily schedule rendered from weekly plan or snapshot, `#daily-plan-source`, `#daily-plan-update`, `planSnapshot`, `archivedCompletedItems`

- [ ] **Step 1: Write failing daily plan/snapshot tests**

```js
test('주간 계획을 데일리 체크 일정으로 렌더링하고 계획 편집은 주간 링크로 보낸다', () => {
  assert.match(html, /id="daily-plan-source"/);
  assert.match(html, /href="\.\/weekly\.html"[^>]*>주간 계획 수정</);
  assert.match(html, /id="daily-plan-update"/);
});

test('계획 스냅샷과 삭제된 완료 항목을 비손실 정규화한다', () => {
  const normalized = normalizeDailyState({
    checkedIds: ['custom-1'],
    planSnapshot: { revision: 3, items: [{ id: 'custom-1', label: '복기', startMinute: 600, endMinute: 630 }] },
    archivedCompletedItems: [{ id: 'old-1', label: '이전 완료' }],
  });
  assert.equal(normalized.planSnapshot.revision, 3);
  assert.equal(normalized.archivedCompletedItems[0].id, 'old-1');
});
```

브라우저 테스트는 weekly 키를 먼저 심은 뒤 daily를 열어 순서·시간·체크 저장을 확인하고, 계획 revision 변경 뒤 안내가 나타나며 `변경 계획 반영` 후 동일 ID 체크가 유지되는지 검증한다.

- [ ] **Step 2: Run daily focused tests and verify RED**

Run: `node --test tests/page-app.test.mjs tests/routine-core.test.mjs tests/daily-contract.test.mjs tests/daily-browser.test.mjs`

Expected: FAIL because daily still regenerates only `getSchedule(mode, runStart)`.

- [ ] **Step 3: Add plan-source UI and make mode/topics read-only**

`daily.html`에 현재 운영 유형과 학습 조합, `주간 계획 수정` 링크, 숨겨진 변경 안내를 추가한다.

```html
<div class="daily-plan-source" id="daily-plan-source">
  <div><span>주간 계획</span><strong id="daily-plan-mode">운동일</strong><span id="daily-plan-topics"></span></div>
  <a href="./weekly.html">주간 계획 수정</a>
</div>
<div class="daily-plan-update screen-only" id="daily-plan-update" hidden>
  <p>실행을 시작한 뒤 주간 계획이 변경되었습니다.</p>
  <button type="button" id="apply-daily-plan-update">변경 계획 반영</button>
</div>
```

기존 데일리 모드·러닝·학습 체크 입력은 새 계획의 읽기 전용 정보로 교체한다. 지원 파이프라인과 메모는 유지한다.

- [ ] **Step 4: Resolve weekly plan before rendering and freeze on first input**

```js
const weeklyKey = weekMondayKey(date);
const weekly = loadState(storage, 'weekly', weeklyKey, createDefaultWeeklyState());
let resolvedPlan = resolveDailyPlan(date, weekly);
let prepared = prepareDailyPlan(state, resolvedPlan);

function renderCurrentSchedule() {
  renderSchedule(root.querySelector('#daily-schedule'), prepared.renderPlan.items, checkedIds);
  root.querySelector('#daily-plan-update').hidden = !prepared.needsPlanUpdate;
}

function persist() {
  captureState();
  if (!state.planSnapshot && hasExecutionInput(state)) state.planSnapshot = prepared.renderPlan;
  saveState(storage, DAILY_PAGE_NAME, date, state);
  updateProgress(root, prepared.renderPlan);
}
```

`renderSchedule()`은 기존 `time` 문자열뿐 아니라 `startMinute/endMinute`을 받아 한 범위로 표시한다. 계획 변경 버튼은 `applyUpdatedPlan()` 결과로 state와 snapshot을 갱신하고 즉시 저장한다. `normalizeDailyState()`는 snapshot 필드를 비손실 정규화한다. `calculateDailyProgress(candidate, scheduleItems = null)`로 시그니처를 확장해 전달된 스냅샷 일정을 우선하고, 두 번째 인자가 없으면 기존 `getSchedule()` fallback을 사용한다.

- [ ] **Step 5: Run daily focused tests**

Run: `node --test tests/page-app.test.mjs tests/routine-core.test.mjs tests/daily-contract.test.mjs tests/daily-browser.test.mjs`

Expected: all daily focused tests PASS.

- [ ] **Step 6: Commit Task 4**

```bash
git add daily.html src/page-app.js src/routine-core.js assets/routine.css tests/page-app.test.mjs tests/routine-core.test.mjs tests/daily-contract.test.mjs tests/daily-browser.test.mjs
git commit -m "feat: 주간 계획을 데일리 실행과 연동"
```

### Task 5: 데일리 실행만 사용하는 주간 진척과 읽기 전용 상태

**Files:**
- Modify: `src/daily-plan-core.js`
- Modify: `src/weekly-app.js`
- Modify: `assets/routine.css`
- Modify: `tests/daily-plan-core.test.mjs`
- Modify: `tests/weekly-app.test.mjs`
- Modify: `tests/weekly-browser.test.mjs`

**Interfaces:**
- Consumes: daily keys for the seven dates of `weekKey`, `buildDailyExecutionSummary(dailyState)`
- Produces: `calculateWeeklyExecutionProgress(storage, weekKey)`, row states `예정`, `완료`, `기록 없음`, `계획 변경 대기`

- [ ] **Step 1: Write failing aggregation tests**

```js
import { calculateWeeklyExecutionProgress } from '../src/daily-plan-core.js';
import { createDefaultWeeklyState } from '../src/weekly-plan-core.js';

test('주간 계획만 저장한 날은 진척이 증가하지 않는다', () => {
  const memoryStorage = (entries) => ({
    getItem: (key) => entries[key] ?? null,
  });
  const storage = memoryStorage({
    'job-prep-routine:weekly:2026-07-20': JSON.stringify(createDefaultWeeklyState()),
  });
  assert.deepEqual(calculateWeeklyExecutionProgress(storage, '2026-07-20'), {
    applications: 0, reviews: 0, interviews: 0, workouts: 0, runs: 0,
    learning: { Spring: 0, Redis: 0, Java: 0, '프로젝트 적용': 0, CS: 0, 코딩테스트: 0 },
  });
});

test('지원 수치는 데일리 파이프라인의 실제 지원 완료만 센다', () => {
  const memoryStorage = (entries) => ({
    getItem: (key) => entries[key] ?? null,
  });
  const storage = memoryStorage({
    'job-prep-routine:daily:2026-07-20': JSON.stringify({
      companies: [{ applied: true }, { applied: true }, { applied: false }],
      checkedIds: [],
    }),
  });
  assert.equal(calculateWeeklyExecutionProgress(storage, '2026-07-20').applications, 2);
});
```

- [ ] **Step 2: Run focused tests and verify RED**

Run: `node --test tests/daily-plan-core.test.mjs tests/weekly-app.test.mjs`

Expected: FAIL because the aggregate still reads weekly checkboxes.

- [ ] **Step 3: Implement seven-day daily aggregation and row status painting**

```js
export function calculateWeeklyExecutionProgress(storage, weekKey) {
  const result = emptyWeeklyProgress();
  for (let offset = 0; offset < 7; offset += 1) {
    const date = addLocalDays(weekKey, offset);
    const raw = storage.getItem(storageKey('daily', date));
    if (!raw) continue;
    const summary = buildDailyExecutionSummary(safeParse(raw));
    mergeExecutionSummary(result, summary);
  }
  return result;
}
```

`daily-plan-core.js`는 `storageKey`를 `routine-core.js`에서 import하고, 로컬 정오 기준으로 날짜를 더하는 private `addLocalDays(dateKey, offset)`, JSON 오류 시 빈 객체를 반환하는 private `safeParse(raw)`, 전체 지표를 0으로 만드는 private `emptyWeeklyProgress()`, 개별 요약을 합치는 private `mergeExecutionSummary()`를 함께 구현한다. `weekly-app.js`의 상단 카드 계산을 이 함수로 교체한다. 선택 요일의 daily state를 읽어 같은 ID가 체크되면 행에 `완료`, 미래이면 `예정`, 지난 날짜에 실행 입력이 없으면 `기록 없음`, revision이 다르면 `계획 변경 대기`를 표시한다. 주간 행에는 체크박스를 만들지 않는다. `window`의 `storage`, `focus`, `pageshow`에서 현재 주의 실행 요약과 선택 요일 상태만 다시 그린다.

- [ ] **Step 4: Run weekly progress and browser tests**

Run: `node --test tests/daily-plan-core.test.mjs tests/weekly-app.test.mjs tests/weekly-browser.test.mjs`

Expected: all tests PASS, including a CDP test that changes a daily key and dispatches a storage/focus refresh.

- [ ] **Step 5: Commit Task 5**

```bash
git add src/daily-plan-core.js src/weekly-app.js assets/routine.css tests/daily-plan-core.test.mjs tests/weekly-app.test.mjs tests/weekly-browser.test.mjs
git commit -m "feat: 데일리 실행으로 주간 진척을 계산"
```

### Task 6: 기록·분석의 스냅샷과 레거시 완료 호환

**Files:**
- Modify: `src/history-core.js`
- Modify: `tests/history-core.test.mjs`
- Modify: `tests/history-app.test.mjs`
- Modify: `tests/history-contract.test.mjs`

**Interfaces:**
- Consumes: daily `planSnapshot`, `archivedCompletedItems`, schema-v2 weekly `legacyCompletion`
- Produces: unchanged public `buildHistoryRecord`, `buildPeriodRecords`, `collectHistoryRecords`, `summarizeHistory` result shapes

- [ ] **Step 1: Write failing compatibility tests**

```js
import { buildHistoryRecord } from '../src/history-core.js';
import { createDefaultWeeklyState, normalizeWeeklyState } from '../src/weekly-plan-core.js';

test('데일리 스냅샷의 사용자 일정 이름과 시간을 기록에 보존한다', () => {
  const record = buildHistoryRecord({
    date: '2026-07-20',
    daily: {
      checkedIds: ['custom-1'],
      planSnapshot: {
        items: [{ id: 'custom-1', label: 'README 정리', category: 'learning', startMinute: 1000, endMinute: 1040 }],
      },
      companies: [],
    },
  });
  assert.equal(record.completedSchedule[0].label, 'README 정리');
});

test('새 주간 계획만 있는 날짜는 활동 기록이 아니다', () => {
  const record = buildHistoryRecord({
    date: '2026-07-20',
    weekly: createDefaultWeeklyState(),
  });
  assert.equal(record.hasActivity, false);
  assert.equal(record.completion.source, null);
});

test('v2에 보존된 레거시 체크는 데일리가 없을 때만 fallback한다', () => {
  const oldWeeklyFixture = {
    selectedDay: 'mon',
    maintenanceDay: 'sun',
    days: {
      mon: { mode: 'workout', tasks: { interview: true }, applications: [true, false, false, false] },
    },
  };
  const weekly = normalizeWeeklyState(oldWeeklyFixture);
  const record = buildHistoryRecord({ date: '2026-07-20', weekly });
  assert.equal(record.completion.source, 'weekly');
  assert.equal(record.weeklyChecks.completed.includes('interview'), true);
});
```

- [ ] **Step 2: Run history tests and verify RED**

Run: `node --test tests/history-core.test.mjs tests/history-app.test.mjs tests/history-contract.test.mjs`

Expected: FAIL because history reconstructs schedules only through `getSchedule()` and reads old weekly fields directly.

- [ ] **Step 3: Prefer daily snapshot and isolate legacy fallback**

`buildScheduleSummary()`는 유효한 `planSnapshot.items`가 있으면 이를 사용하고, 없을 때만 `getSchedule()`을 사용한다. `archivedCompletedItems` 중 체크된 항목은 과거 완료 목록에 유지한다. `buildWeeklySummary()`는 schema v2의 `legacyCompletion`만 완료 데이터로 읽으며 `items`와 `unscheduled`는 절대 완료로 세지 않는다. public record shape와 daily > roadmap > legacy weekly 우선순위는 유지한다.

- [ ] **Step 4: Run all history tests**

Run: `node --test tests/history-core.test.mjs tests/history-app.test.mjs tests/history-contract.test.mjs`

Expected: all history tests PASS, including existing legacy fixtures.

- [ ] **Step 5: Commit Task 6**

```bash
git add src/history-core.js tests/history-core.test.mjs tests/history-app.test.mjs tests/history-contract.test.mjs
git commit -m "fix: 계획과 실행 기록의 호환성을 보존"
```

### Task 7: 인쇄·전체 회귀·실행 패키지 동기화

**Files:**
- Modify: `tests/print-contract.test.mjs`
- Modify: `tests/date-boundary-contract.test.mjs`
- Modify: `tests/browser-chrome.test.mjs`
- Modify: `assets/routine.css`
- Copy after verification: `weekly.html`, `daily.html`, `assets/routine.css`, `src/routine-data.js`, `src/routine-core.js`, `src/weekly-plan-core.js`, `src/daily-plan-core.js`, `src/weekly-app.js`, `src/page-app.js`, `src/history-core.js` to `../outputs/취업준비-루틴-보드/`

**Interfaces:**
- Consumes: completed weekly/daily/history implementation
- Produces: source/runtime byte parity and unchanged `http://127.0.0.1:8787/` origin

- [ ] **Step 1: Add failing print and date-boundary contracts**

```js
test('주간 인쇄는 편집 조작을 숨기고 세로 계획을 남긴다', () => {
  const printCss = blockAfter(css, '@media print');
  assert.match(printCss, /\.weekly-planner-actions[\s\S]*display\s*:\s*none/);
  assert.match(printCss, /\.plan-drag[\s\S]*display\s*:\s*none/);
  assert.match(html, /id="weekly-plan-list"/);
});

test('새 계획 코어와 데일리 코어는 오전 2시 논리 날짜를 공통 사용한다', () => {
  assert.match(weeklyPlanCore, /weekMondayKey/);
  assert.match(pageApp, /logicalDateString/);
});
```

- [ ] **Step 2: Run contract tests and verify RED where coverage is missing**

Run: `node --test tests/print-contract.test.mjs tests/date-boundary-contract.test.mjs tests/browser-chrome.test.mjs`

Expected: new assertions FAIL until final print selectors and module coverage are added.

- [ ] **Step 3: Finish print/responsive rules and shared Chrome coverage**

Add the new core/browser files to existing resolver-contract checks. In `@media print`, hide `.weekly-planner-actions`, `.weekly-add-panel`, `.plan-drag`, `.plan-move-actions`, `.plan-time-editor`, and unscheduled action buttons while keeping the selected day timeline and read-only progress visible. Keep each timeline row from splitting across pages.

- [ ] **Step 4: Run the full source verification suite**

Run: `npm test`

Expected: every test PASS with 0 failures.

Run: `npm run check`

Expected: exit 0 for all source modules and PDF validator syntax.

Run: `git diff --check`

Expected: no whitespace errors.

- [ ] **Step 5: Synchronize only verified runtime files without restarting the server**

Copy the ten listed source/runtime files into `../outputs/취업준비-루틴-보드/`, preserving the same directory layout. Do not replace unrelated files or the canonical roadmap PDF. Verify every copied file with `cmp`.

```bash
cmp weekly.html ../outputs/취업준비-루틴-보드/weekly.html
cmp daily.html ../outputs/취업준비-루틴-보드/daily.html
cmp assets/routine.css ../outputs/취업준비-루틴-보드/assets/routine.css
cmp src/weekly-plan-core.js ../outputs/취업준비-루틴-보드/src/weekly-plan-core.js
cmp src/daily-plan-core.js ../outputs/취업준비-루틴-보드/src/daily-plan-core.js
```

Expected: every `cmp` exits 0.

- [ ] **Step 6: Verify the existing 8787 server serves synchronized bytes**

Run: `curl -fsS http://127.0.0.1:8787/weekly.html -o /tmp/job-prep-weekly-served.html`

Run: `cmp weekly.html /tmp/job-prep-weekly-served.html`

Run: `curl -fsS http://127.0.0.1:8787/src/weekly-plan-core.js -o /tmp/job-prep-weekly-plan-core-served.js`

Run: `cmp src/weekly-plan-core.js /tmp/job-prep-weekly-plan-core-served.js`

Expected: HTTP succeeds and both comparisons exit 0. Remove only these two temporary verification files afterwards.

- [ ] **Step 7: Commit Task 7**

```bash
git add assets/routine.css tests/print-contract.test.mjs tests/date-boundary-contract.test.mjs tests/browser-chrome.test.mjs
git commit -m "test: 주간 플래너 전체 회귀를 검증"
```

## Final Review Gate

- Run a requirements review against `docs/superpowers/specs/2026-07-20-weekly-planner-daily-sync-design.md`.
- Run a code-quality review on the full implementation diff from `bd83d54`.
- Fix every Critical and Important finding with focused RED/GREEN tests.
- Re-run `npm test`, `npm run check`, `git diff --check`, runtime `cmp`, and 8787 HTTP byte checks after the final fix commit.
- Do not claim completion until the fresh final commands show 0 failures and the working tree is clean.
