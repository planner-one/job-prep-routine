# 운영 로드맵·데일리 포커스 통합 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 운영 로드맵을 체크·저장 없는 읽기 전용 일정 기준표와 실제 PDF로 전환하고, 유용한 카테고리 필터를 데일리 포커스에 통합한다.

**Architecture:** `page-app.js`는 데일리 실행과 저장만 담당하고, 새 `roadmap-app.js`는 `routine-data.js`의 일정 원본을 읽어 다섯 가지 읽기 전용 시간표를 렌더링한다. 과거 `job-prep-routine:roadmap:*` 데이터는 `history-core.js`가 계속 읽지만 로드맵 화면은 저장소에 접근하지 않는다. 웹 기준표와 PDF는 같은 `roadmap.html`을 사용해 내용 불일치를 막는다.

**Tech Stack:** 정적 HTML, CSS, 브라우저 ES modules, `localStorage`, Node.js 내장 테스트 러너, Chrome DevTools Protocol, Chrome headless PDF, Poppler.

## Global Constraints

- 사용자 화면 문구와 새 문서는 한국어를 기본으로 한다.
- 로그인, Firebase, GitHub Actions, 외부 배포는 구현하지 않는다.
- 기존 `job-prep-routine:daily:*`, `job-prep-routine:weekly:*`, `job-prep-routine:roadmap:*` 값을 삭제하거나 변환하지 않는다.
- 새 로드맵 화면은 `localStorage`, `routine-core.js`, 날짜 경계 로직을 참조하지 않는다.
- 카테고리 필터는 화면 상태일 뿐이며 데일리 저장 객체에 추가하지 않는다.
- PDF의 canonical 소스 경로와 다운로드 경로는 `output/pdf/취업준비-운영-로드맵.pdf`이다.
- 현재 미커밋된 기록·분석 기능을 덮어쓰지 않으며 각 커밋에는 해당 작업의 파일만 명시적으로 stage한다.
- 8787 미리보기의 origin을 `http://127.0.0.1:8787`로 유지해 기존 브라우저 기록을 보존한다.

---

### Task 1: 데일리 포커스 카테고리 필터

**Files:**
- Modify: `daily.html`
- Modify: `src/page-app.js`
- Modify: `assets/routine.css`
- Modify: `tests/daily-contract.test.mjs`
- Modify: `tests/daily-browser.test.mjs`
- Modify: `tests/print-contract.test.mjs`

**Interfaces:**
- Consumes: `renderSchedule(container, schedule, checkedIds)`가 생성하는 `[data-schedule-row]`, `data-category`, `.schedule-period` DOM.
- Produces: `applyDailyCategoryFilter(root: Element, category: string): string`. 허용된 카테고리를 정규화해 반환하고 DOM의 `hidden`과 `aria-pressed`만 바꾼다.

- [ ] **Step 1: 데일리 필터 계약 실패 테스트 작성**

`tests/daily-contract.test.mjs`에 다음 테스트를 추가한다.

```js
test('데일리는 시간표 카테고리 필터와 빈 결과 안내를 제공한다', () => {
  assert.match(html, /id="daily-category-filters"/);
  for (const [value, label] of [
    ['all', '전체'],
    ['exercise', '운동·회복'],
    ['career', '취업·면접'],
    ['learning', '개발 학습'],
    ['meal', '식사·휴식'],
  ]) {
    assert.match(html, new RegExp(`data-category-filter="${value}"[^>]*>${label}<`));
  }
  assert.match(html, /data-category-filter="all" aria-pressed="true"/);
  assert.match(html, /id="daily-schedule-empty"[^>]*hidden/);
});
```

- [ ] **Step 2: 계약 테스트가 실패하는지 확인**

Run: `node --test tests/daily-contract.test.mjs`

Expected: `daily-category-filters`가 없어 FAIL.

- [ ] **Step 3: 데일리 필터 마크업 추가**

`daily.html`에서 `#daily-schedule` 바로 위에 다음 블록을 추가한다.

```html
<div class="daily-filter-band screen-only">
  <div>
    <p class="section-kicker">일정 보기</p>
    <h3>지금 필요한 흐름만 보기</h3>
  </div>
  <div class="category-filters" id="daily-category-filters" role="group" aria-label="시간표 카테고리 필터">
    <button type="button" data-category-filter="all" aria-pressed="true">전체</button>
    <button type="button" data-category-filter="exercise" aria-pressed="false">운동·회복</button>
    <button type="button" data-category-filter="career" aria-pressed="false">취업·면접</button>
    <button type="button" data-category-filter="learning" aria-pressed="false">개발 학습</button>
    <button type="button" data-category-filter="meal" aria-pressed="false">식사·휴식</button>
  </div>
</div>
<p class="schedule-empty" id="daily-schedule-empty" role="status" hidden>이 모드에는 선택한 카테고리의 일정이 없습니다.</p>
```

- [ ] **Step 4: 브라우저 필터 회귀 테스트 작성**

`tests/daily-browser.test.mjs`의 기존 시나리오에 다음 검증을 추가한다.

```js
const filtered = await evaluate(cdp, sessionId, `(() => {
  const date = document.querySelector('#current-date').dateTime;
  const key = 'job-prep-routine:daily:' + date;
  const before = localStorage.getItem(key);
  const progressBefore = document.querySelector('#progress-count').textContent;
  document.querySelector('[data-category-filter="learning"]').click();
  const rows = [...document.querySelectorAll('#daily-schedule [data-schedule-row]')];
  return {
    before,
    after: localStorage.getItem(key),
    progressBefore,
    progressAfter: document.querySelector('#progress-count').textContent,
    pressed: document.querySelector('[data-category-filter="learning"]').getAttribute('aria-pressed'),
    visibleCategories: [...new Set(rows.filter((row) => !row.hidden).map((row) => row.dataset.category))],
    hiddenPeriods: [...document.querySelectorAll('#daily-schedule .schedule-period')].filter((period) => period.hidden).length,
  };
})()`);
assert.equal(filtered.before, filtered.after);
assert.equal(filtered.progressBefore, filtered.progressAfter);
assert.equal(filtered.pressed, 'true');
assert.deepEqual(filtered.visibleCategories, ['learning']);
assert.equal(filtered.hiddenPeriods > 0, true);
```

모드 전환 뒤에도 `learning` 필터가 유지되고, 새로고침 뒤에는 `all`로 돌아오며 저장된 체크가 복원되는 검증도 같은 테스트에 추가한다.

- [ ] **Step 5: 브라우저 테스트가 실패하는지 확인**

Run: `node --test tests/daily-browser.test.mjs`

Expected: 필터 버튼 클릭 뒤 표시 상태가 변하지 않아 FAIL.

- [ ] **Step 6: 필터 DOM 로직 구현**

`src/page-app.js`에 다음 함수를 추가한다.

```js
const SCHEDULE_CATEGORIES = new Set(['all', 'exercise', 'career', 'learning', 'meal']);

export function applyDailyCategoryFilter(root, category) {
  const normalized = SCHEDULE_CATEGORIES.has(category) ? category : 'all';
  for (const button of root.querySelectorAll('#daily-category-filters [data-category-filter]')) {
    button.setAttribute('aria-pressed', String(button.dataset.categoryFilter === normalized));
  }
  const rows = Array.from(root.querySelectorAll('#daily-schedule [data-schedule-row]'));
  for (const row of rows) {
    row.hidden = normalized !== 'all' && row.dataset.category !== normalized;
  }
  for (const period of root.querySelectorAll('#daily-schedule .schedule-period')) {
    const periodRows = Array.from(period.querySelectorAll('[data-schedule-row]'));
    period.hidden = periodRows.length === 0 || periodRows.every((row) => row.hidden);
  }
  const empty = root.querySelector('#daily-schedule-empty');
  if (empty) empty.hidden = rows.some((row) => !row.hidden);
  return normalized;
}
```

`initDailyPage()`에 `let activeCategory = 'all';`을 두고, `renderCurrentSchedule()` 마지막에 다음을 실행한다.

```js
activeCategory = applyDailyCategoryFilter(root, activeCategory);
```

`handleClick()`의 모드 처리보다 앞에 다음 분기를 추가한다.

```js
const categoryButton = event.target.closest?.('#daily-category-filters [data-category-filter]');
if (categoryButton && root.contains(categoryButton)) {
  activeCategory = applyDailyCategoryFilter(root, categoryButton.dataset.categoryFilter);
  return;
}
```

`resetToday()`은 `activeCategory = 'all';`로 되돌린 뒤 `paintState()`를 호출한다. 필터 처리에서는 `saveState()`, `captureState()`, `updateProgress()`를 호출하지 않는다.

- [ ] **Step 7: 화면·인쇄 스타일 구현**

`assets/routine.css`에 데일리 필터 배치와 숨김 규칙을 추가한다.

```css
.daily-filter-band {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 14px;
}

.daily-filter-band h3,
.daily-filter-band p {
  margin: 0;
}

#daily-schedule [data-schedule-row][hidden],
#daily-schedule .schedule-period[hidden] {
  display: none;
}

.schedule-empty {
  padding: 24px;
  border: 1px dashed var(--line);
  border-radius: 16px;
  color: var(--muted);
  text-align: center;
}
```

`@media print`에는 필터와 관계없이 전체 데일리 시간표가 보이도록 다음을 추가한다.

```css
#daily-page #daily-schedule [data-schedule-row][hidden] {
  display: grid !important;
}

#daily-page #daily-schedule .schedule-period[hidden] {
  display: block !important;
}
```

`tests/print-contract.test.mjs`에도 두 선택자의 인쇄 복원 계약을 먼저 추가해 RED를 확인한 뒤 CSS로 GREEN을 만든다.

- [ ] **Step 8: 데일리 관련 테스트 통과 확인**

Run: `node --test tests/daily-contract.test.mjs tests/daily-browser.test.mjs tests/print-contract.test.mjs`

Expected: 모든 테스트 PASS.

- [ ] **Step 9: 작업 파일만 커밋**

```bash
git add daily.html src/page-app.js assets/routine.css tests/daily-contract.test.mjs tests/daily-browser.test.mjs tests/print-contract.test.mjs
git commit -m "feat: 데일리 시간표 카테고리 필터 통합"
```

---

### Task 2: 운영 로드맵 읽기 전용 기준표

**Files:**
- Create: `src/roadmap-app.js`
- Modify: `roadmap.html`
- Modify: `src/page-app.js`
- Modify: `assets/routine.css`
- Modify: `package.json`
- Modify: `tests/page-app.test.mjs`
- Create: `tests/roadmap-app.test.mjs`
- Modify: `tests/roadmap-contract.test.mjs`
- Modify: `tests/roadmap-browser.test.mjs`
- Modify: `tests/print-contract.test.mjs`

**Interfaces:**
- Consumes: `getSchedule(mode: string, runStart: string): ScheduleItem[]` from `src/routine-data.js`.
- Produces: `ROADMAP_VARIANTS`, `getRoadmapVariants(): RoadmapVariant[]`, `initRoadmapReference(document): { variants: RoadmapVariant[] } | null` from `src/roadmap-app.js`.
- `RoadmapVariant` shape: `{ id, mode, runStart, label, description, schedule }`.

- [ ] **Step 1: 읽기 전용 계약 실패 테스트 작성**

`tests/roadmap-contract.test.mjs`를 다음 계약 중심으로 교체한다.

```js
test('로드맵은 조작 없이 다섯 일정 변형을 제공하는 읽기 전용 기준표다', () => {
  assert.match(html, /id="roadmap-reference-list"/);
  assert.match(html, /src="\.\/src\/roadmap-app\.js"/);
  assert.match(html, /href="\.\/index\.html"/);
  assert.match(html, /href="\.\/daily\.html"/);
  assert.match(html, /href="\.\/output\/pdf\/취업준비-운영-로드맵\.pdf"[^>]*download/);
  assert.doesNotMatch(html, /type="checkbox"|type="radio"|data-learning-topic/);
  assert.doesNotMatch(html, /roadmap-current-date|roadmap-reset-today|roadmap-mode-switch/);
});
```

- [ ] **Step 2: 계약 테스트 실패 확인**

Run: `node --test tests/roadmap-contract.test.mjs`

Expected: 현재 인터랙티브 마크업 때문에 FAIL.

- [ ] **Step 3: 로드맵 변형 데이터 테스트 작성**

새 `src/roadmap-app.js`를 import하는 `tests/roadmap-app.test.mjs`를 만든다.

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { getRoadmapVariants } from '../src/roadmap-app.js';

test('로드맵은 운동·비운동·러닝 두 시각·유지일 전체 일정을 만든다', () => {
  const variants = getRoadmapVariants();
  assert.deepEqual(variants.map(({ id }) => id), [
    'workout', 'normal', 'running-21', 'running-22', 'maintenance',
  ]);
  assert.deepEqual(variants.map(({ schedule }) => schedule.length), [16, 15, 15, 15, 11]);
  assert.equal(variants[2].schedule.find(({ id }) => id === 'run').time, '21:00-22:00');
  assert.equal(variants[3].schedule.find(({ id }) => id === 'run').time, '22:00-23:00');
});
```

- [ ] **Step 4: 새 모듈이 없어 실패하는지 확인**

Run: `node --test tests/roadmap-app.test.mjs`

Expected: `src/roadmap-app.js`를 찾지 못해 FAIL.

- [ ] **Step 5: 읽기 전용 데이터·렌더러 구현**

`src/roadmap-app.js`를 다음 인터페이스로 만든다.

```js
import { getSchedule } from './routine-data.js';

const PERIOD_LABELS = {
  morning: '오전',
  afternoon: '오후',
  evening: '저녁',
  night: '밤',
};

const CATEGORY_LABELS = {
  exercise: '운동·회복',
  career: '취업·면접',
  learning: '개발 학습',
  meal: '식사·휴식',
};

export const ROADMAP_VARIANTS = Object.freeze([
  { id: 'workout', mode: 'workout', runStart: '21', label: '운동일', description: '아침 운동으로 시작하는 실행일' },
  { id: 'normal', mode: 'normal', runStart: '21', label: '비운동일', description: '취업 준비와 개발 학습에 집중하는 날' },
  { id: 'running-21', mode: 'running', runStart: '21', label: '러닝일 · 21시 시작', description: '21시 러닝을 포함한 하루' },
  { id: 'running-22', mode: 'running', runStart: '22', label: '러닝일 · 22시 시작', description: '22시 러닝을 포함한 하루' },
  { id: 'maintenance', mode: 'maintenance', runStart: '21', label: '핵심 유지일', description: '회복하면서 핵심만 지키는 날' },
]);

export function getRoadmapVariants() {
  return ROADMAP_VARIANTS.map((variant) => ({
    ...variant,
    schedule: getSchedule(variant.mode, variant.runStart).map((item) => ({
      ...item,
      time: formatReferenceTime(item.time),
    })),
  }));
}

export function formatReferenceTime(value) {
  return value.replaceAll('–', '-').replaceAll('~', '-');
}

function renderVariant(pageDocument, variant) {
  const section = pageDocument.createElement('section');
  section.className = 'roadmap-mode-section';
  section.dataset.roadmapVariant = variant.id;
  const heading = pageDocument.createElement('header');
  heading.className = 'roadmap-mode-heading';
  const title = pageDocument.createElement('h2');
  title.textContent = variant.label;
  const description = pageDocument.createElement('p');
  description.textContent = variant.description;
  heading.append(title, description);
  section.append(heading);

  for (const period of Object.keys(PERIOD_LABELS)) {
    const items = variant.schedule.filter((item) => item.period === period);
    if (items.length === 0) continue;
    const group = pageDocument.createElement('section');
    group.className = 'roadmap-reference-period';
    const periodTitle = pageDocument.createElement('h3');
    periodTitle.textContent = PERIOD_LABELS[period];
    const list = pageDocument.createElement('div');
    list.className = 'roadmap-reference-rows';
    for (const item of items) {
      const row = pageDocument.createElement('article');
      row.className = 'roadmap-reference-row';
      row.dataset.referenceItem = item.id;
      const time = pageDocument.createElement('time');
      time.textContent = item.time;
      const label = pageDocument.createElement('span');
      label.textContent = item.label;
      const category = pageDocument.createElement('span');
      category.className = `roadmap-category roadmap-category--${item.category}`;
      category.textContent = CATEGORY_LABELS[item.category];
      row.append(time, label, category);
      list.append(row);
    }
    group.append(periodTitle, list);
    section.append(group);
  }
  return section;
}

export function initRoadmapReference(pageDocument) {
  const root = pageDocument.getElementById('roadmap-page');
  const list = pageDocument.getElementById('roadmap-reference-list');
  if (!root || !list) return null;
  const variants = getRoadmapVariants();
  list.replaceChildren(...variants.map((variant) => renderVariant(pageDocument, variant)));
  pageDocument.documentElement.dataset.roadmapReady = 'true';
  return { variants };
}

if (typeof document !== 'undefined') {
  const boot = () => initRoadmapReference(document);
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot, { once: true });
  else boot();
}
```

- [ ] **Step 6: 로드맵 HTML을 읽기 전용으로 교체**

`roadmap.html`의 헤더 조작 영역은 다음 링크만 사용한다.

```html
<div class="roadmap-actions screen-only">
  <a class="board-link" href="./index.html">홈</a>
  <a class="board-link" href="./daily.html">데일리 포커스</a>
  <a class="pdf-button" href="./output/pdf/취업준비-운영-로드맵.pdf" download>PDF 다운로드</a>
</div>
```

세 운영 원칙 뒤에는 `<div id="roadmap-reference-list" class="roadmap-reference-list"></div>`만 두고, 스크립트를 `<script type="module" src="./src/roadmap-app.js"></script>`로 바꾼다. 날짜, 모드 버튼, 러닝 라디오, 카테고리 필터, 학습 체크, 초기화 버튼은 모두 제거한다.

- [ ] **Step 7: 데일리 모듈에서 로드맵 저장 책임 제거**

`src/page-app.js`에서 `ROADMAP_PAGE_NAME`, `createDefaultRoadmapState`, `normalizeRoadmapState`, `collectRoadmapState`부터 `initRoadmapPage`까지의 로드맵 전용 함수와 부트 호출을 삭제한다. 부트는 데일리 루트가 있을 때만 날짜 롤오버를 설치한다.

```js
if (typeof document !== 'undefined') {
  const boot = () => {
    const today = logicalDateString();
    const dailyPage = initDailyPage(document, window.localStorage, today);
    if (dailyPage) scheduleLogicalDayRollover(window, today);
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot, { once: true });
  else boot();
}
```

`tests/page-app.test.mjs`에서는 `normalizeRoadmapState` 테스트만 제거하고 데일리 정규화 테스트를 유지한다. `package.json`의 `check`에 `node --check src/roadmap-app.js`를 추가한다.

`tests/roadmap-app.test.mjs`의 러닝 시간 기대값은 PDF에서도 안전한 ASCII 표기인 `21:00-22:00`, `22:00-23:00`으로 수정하고 `formatReferenceTime()`을 통해 변환됐는지 확인한다.

- [ ] **Step 8: 읽기 전용 브라우저 테스트 작성**

`tests/roadmap-browser.test.mjs`의 인터랙티브 테스트를 교체한다. 먼저 같은 origin에서 legacy 값을 넣고 로드맵 페이지를 다시 탐색해, 초기화 과정 전체가 값을 건드리지 않는지 확인한다.

```js
const legacyRaw = JSON.stringify({
  mode: 'running',
  runStart: '21',
  checkedIds: ['run'],
  learningTopics: ['Java'],
});
await evaluate(cdp, sessionId, `localStorage.setItem('job-prep-routine:roadmap:2026-07-12', ${JSON.stringify(legacyRaw)})`);
await navigate(cdp, sessionId, staticSite.url);

const result = await evaluate(cdp, sessionId, `(() => {
  const legacyKey = 'job-prep-routine:roadmap:2026-07-12';
  const variants = [...document.querySelectorAll('[data-roadmap-variant]')];
  return {
    variantIds: variants.map((node) => node.dataset.roadmapVariant),
    counts: variants.map((node) => node.querySelectorAll('[data-reference-item]').length),
    totalRows: document.querySelectorAll('[data-reference-item]').length,
    inputs: document.querySelectorAll('#roadmap-page input, #roadmap-page textarea, #roadmap-page select').length,
    storedRaw: localStorage.getItem(legacyKey),
    roadmapKeys: Object.keys(localStorage).filter((key) => key.startsWith('job-prep-routine:roadmap:')).sort(),
  };
})()`);
assert.deepEqual(result.variantIds, ['workout', 'normal', 'running-21', 'running-22', 'maintenance']);
assert.deepEqual(result.counts, [16, 15, 15, 15, 11]);
assert.equal(result.totalRows, 72);
assert.equal(result.inputs, 0);
assert.equal(result.storedRaw, legacyRaw);
assert.deepEqual(result.roadmapKeys, ['job-prep-routine:roadmap:2026-07-12']);
```

페이지 준비 조건은 `document.documentElement.dataset.roadmapReady === 'true'`로 변경한다.

- [ ] **Step 9: 읽기 전용 화면과 다중 페이지 인쇄 스타일 구현**

`assets/routine.css`에서 로드맵 모드 버튼·필터·학습 선택 전용 규칙을 새 `.roadmap-reference-list`, `.roadmap-mode-section`, `.roadmap-reference-row`, `.roadmap-category` 규칙으로 교체한다. 행은 `grid-template-columns: 112px minmax(0, 1fr) auto`를 사용한다.

인쇄 규칙은 전체 `#roadmap-page` 한 장 고정을 제거하고 다음을 적용한다.

```css
@media print {
  .roadmap-mode-section {
    break-before: page;
    break-inside: auto;
  }

  .roadmap-mode-section:first-child {
    break-before: auto;
  }

  .roadmap-reference-period,
  .roadmap-reference-row {
    break-inside: avoid;
  }
}
```

`tests/print-contract.test.mjs`의 로드맵 필터 복원 계약을 제거하고 모드 단위 페이지 분리 계약으로 교체한다.

- [ ] **Step 10: 로드맵 관련 테스트 통과 확인**

Run: `node --test tests/page-app.test.mjs tests/roadmap-app.test.mjs tests/roadmap-contract.test.mjs tests/roadmap-browser.test.mjs tests/print-contract.test.mjs`

Expected: 모든 테스트 PASS.

- [ ] **Step 11: 작업 파일만 커밋**

```bash
git add roadmap.html src/roadmap-app.js src/page-app.js assets/routine.css package.json tests/page-app.test.mjs tests/roadmap-app.test.mjs tests/roadmap-contract.test.mjs tests/roadmap-browser.test.mjs tests/print-contract.test.mjs
git commit -m "refactor: 운영 로드맵을 읽기 전용 기준표로 전환"
```

---

### Task 3: 홈 역할 문구와 과거 로드맵 기록 보존

**Files:**
- Modify: `index.html`
- Modify: `tests/print-contract.test.mjs`
- Verify without modification: `src/history-core.js`
- Verify without modification: `src/history-app.js`
- Verify without modification: `tests/history-core.test.mjs`

**Interfaces:**
- Consumes: `history-core.js`가 읽는 `job-prep-routine:roadmap:YYYY-MM-DD` legacy 키.
- Produces: 역할이 분명한 홈 카드 문구. 기록 데이터 형식과 집계 인터페이스는 변경하지 않는다.

- [ ] **Step 1: 홈 역할 문구 실패 테스트 작성**

`tests/print-contract.test.mjs`에 다음 테스트를 추가한다.

```js
test('홈은 로드맵을 기준표로, 데일리를 유일한 오늘 실행 화면으로 설명한다', () => {
  assert.match(home, /읽기 전용 일정 기준표·PDF/);
  assert.match(home, /오늘의 유일한 실행 기록/);
});
```

- [ ] **Step 2: 테스트 실패 확인**

Run: `node --test tests/print-contract.test.mjs`

Expected: 기존 홈 문구 때문에 FAIL.

- [ ] **Step 3: 홈 카드 문구 수정**

`index.html`의 로드맵 설명을 `운동일·비운동일·러닝일·유지일의 읽기 전용 일정 기준표·PDF입니다.`로 바꾸고, 데일리 설명을 `오늘의 시간표·지원·학습·마감을 남기는 유일한 실행 기록 화면입니다.`로 바꾼다.

- [ ] **Step 4: legacy 기록 회귀 테스트 확인**

Run: `node --test tests/history-core.test.mjs`

Expected: 다음 기존 시나리오가 모두 PASS.

- daily 완료율을 쓰면서 roadmap 상세도 보존
- 손상 daily가 있을 때 roadmap을 완료율 소스로 사용
- roadmap-only 날짜를 기록 목록에 포함

`src/history-core.js`와 `src/history-app.js`에서 roadmap reader나 표시 코드를 삭제하지 않는다.

- [ ] **Step 5: 홈·기록 테스트 통과 확인**

Run: `node --test tests/print-contract.test.mjs tests/history-core.test.mjs tests/history-contract.test.mjs`

Expected: 모든 테스트 PASS.

- [ ] **Step 6: 작업 파일만 커밋**

```bash
git add index.html tests/print-contract.test.mjs
git commit -m "docs: 홈에서 로드맵과 데일리 역할 구분"
```

---

### Task 4: 다운로드 가능한 운영 로드맵 PDF

**Files:**
- Modify: `scripts/export-pdfs.sh`
- Modify: `package.json`
- Modify: `tests/print-contract.test.mjs`
- Create by generation: `output/pdf/취업준비-운영-로드맵.pdf`
- Create temporarily: `tmp/pdfs/취업준비-운영-로드맵-*.png`

**Interfaces:**
- Consumes: `roadmap.html`, print CSS, 실행 중인 로컬 HTTP origin.
- Produces: `sh scripts/export-pdfs.sh <base-url> <output-dir> roadmap`와 `npm run export:roadmap-pdf`.

- [ ] **Step 1: PDF 스크립트·다운로드 계약 실패 테스트 작성**

`tests/print-contract.test.mjs`에 다음 검증을 반영한다.

파일 상단에는 로드맵 HTML을 읽는 다음 선언을 추가한다.

```js
const roadmapHtml = await readFile(new URL('../roadmap.html', import.meta.url), 'utf8').catch(() => '');
```

```js
test('로드맵 PDF는 canonical 경로와 파일명으로 생성되고 다운로드된다', () => {
  assert.match(exportScript, /TARGET="\$\{3:-all\}"/);
  assert.match(exportScript, /취업준비-운영-로드맵\.pdf/);
  assert.match(exportScript, /roadmap\)/);
  assert.match(roadmapHtml, /href="\.\/output\/pdf\/취업준비-운영-로드맵\.pdf"[^>]*download/);
});
```

- [ ] **Step 2: 테스트 실패 확인**

Run: `node --test tests/print-contract.test.mjs`

Expected: 현재 파일명과 인자 계약이 달라 FAIL.

- [ ] **Step 3: 대상 선택형 PDF 스크립트 구현**

`scripts/export-pdfs.sh`의 기본 출력 폴더와 대상 인자를 다음과 같이 바꾼다.

```sh
BASE_URL="${1:-http://127.0.0.1:8787}"
OUT_DIR="${2:-output/pdf}"
TARGET="${3:-all}"

case "$TARGET" in
  all)
    export_pdf "roadmap.html" "취업준비-운영-로드맵.pdf"
    export_pdf "weekly.html" "취업준비-주간실행보드.pdf"
    export_pdf "daily.html" "취업준비-데일리포커스보드.pdf"
    ;;
  roadmap)
    export_pdf "roadmap.html" "취업준비-운영-로드맵.pdf"
    ;;
  *)
    echo "지원하지 않는 PDF 대상입니다: $TARGET" >&2
    exit 2
    ;;
esac
```

`package.json`에 다음 스크립트를 추가한다.

```json
"export:roadmap-pdf": "sh scripts/export-pdfs.sh http://127.0.0.1:8787 output/pdf roadmap"
```

- [ ] **Step 4: 기존 8787 실행 패키지의 source 동일성 확인**

기존 8787 서버는 종료하거나 document root를 변경하지 않는다. 내보내기 전에 다음 네 응답을 `curl -fsS`로 임시 파일에 저장해 저장소 원본과 `cmp`한다.

```bash
curl -fsS http://127.0.0.1:8787/roadmap.html -o /tmp/roadmap.html
curl -fsS http://127.0.0.1:8787/assets/routine.css -o /tmp/routine.css
curl -fsS http://127.0.0.1:8787/src/roadmap-app.js -o /tmp/roadmap-app.js
curl -fsS http://127.0.0.1:8787/src/routine-data.js -o /tmp/routine-data.js
cmp roadmap.html /tmp/roadmap.html
cmp assets/routine.css /tmp/routine.css
cmp src/roadmap-app.js /tmp/roadmap-app.js
cmp src/routine-data.js /tmp/routine-data.js
```

Expected: 모든 요청과 `cmp`가 exit 0. HTTP 실패나 불일치가 있으면 내보내기를 중단하고 기존 canonical PDF를 보존한다.

- [ ] **Step 5: 임시 PDF 생성·검증 후 canonical 원자 교체**

Run: `npm run export:roadmap-pdf`

Expected: Chrome은 `output/pdf` 안의 임시 파일에 출력한다. 같은 validator가 A4 정확히 5페이지, 세 운영 원칙, 다섯 변형 표제, 72개 일정의 대응 페이지 시간·라벨을 확인한 뒤에만 `mv`로 `output/pdf/취업준비-운영-로드맵.pdf`를 교체한다. 검증 실패 시 기존 canonical 파일은 byte-for-byte 보존된다.

- [ ] **Step 6: PDF 구조와 텍스트 검증**

Run: `node scripts/validate-roadmap-pdf.mjs output/pdf/취업준비-운영-로드맵.pdf`

Expected: `pdfinfo`와 `pdftotext -layout` 파싱 성공, 모든 페이지 A4, 정확히 5페이지, 세 운영 원칙, 다섯 변형 표제, `getRoadmapVariants()`가 제공하는 72개 일정 시간·라벨이 각 대응 페이지에 존재하고 exit 0.

- [ ] **Step 7: PDF 시각 검증**

Run: `mkdir -p tmp/pdfs`

Run: `pdftoppm -png -r 150 output/pdf/취업준비-운영-로드맵.pdf tmp/pdfs/취업준비-운영-로드맵`

생성된 모든 PNG를 `view_image`로 확인한다. 한글 깨짐, 검은 사각형, 텍스트 잘림, 행 겹침, 불균형한 여백, 모드 중간의 부자연스러운 페이지 분리가 하나라도 있으면 CSS를 수정하고 Step 5부터 다시 실행한다.

- [ ] **Step 8: PDF 계약 테스트 통과 확인**

Run: `node --test tests/print-contract.test.mjs`

Expected: PASS.

- [ ] **Step 9: PDF와 생성 규칙 커밋**

```bash
git add scripts/export-pdfs.sh package.json tests/print-contract.test.mjs output/pdf/취업준비-운영-로드맵.pdf
git commit -m "feat: 읽기 전용 운영 로드맵 PDF 제공"
```

---

### Task 5: 실행 패키지 동기화와 전체 회귀 검증

**Files:**
- Sync to: `../outputs/취업준비-루틴-보드/index.html`
- Sync to: `../outputs/취업준비-루틴-보드/daily.html`
- Sync to: `../outputs/취업준비-루틴-보드/roadmap.html`
- Sync to: `../outputs/취업준비-루틴-보드/assets/routine.css`
- Sync to: `../outputs/취업준비-루틴-보드/src/page-app.js`
- Sync to: `../outputs/취업준비-루틴-보드/src/roadmap-app.js`
- Sync to: `../outputs/취업준비-루틴-보드/output/pdf/취업준비-운영-로드맵.pdf`

**Interfaces:**
- Consumes: 검증된 저장소 런타임 파일과 PDF.
- Produces: `http://127.0.0.1:8787`에서 같은 파일을 제공하는 실행 패키지.

- [ ] **Step 1: 전체 문법 검사**

Run: `npm run check`

Expected: exit 0, JavaScript 문법 오류 없음.

- [ ] **Step 2: 전체 자동 테스트**

Run: `npm test`

Expected: 모든 테스트 PASS, 실패 0. 샌드박스에서 `listen EPERM`이면 동일 명령을 로컬 포트 권한으로 다시 실행하고 결과를 확인한다.

- [ ] **Step 3: diff와 요구사항 확인**

Run: `git diff --check`

Expected: 출력 없음.

Run: `rg -n "localStorage|saveState|clearState|roadmap-reset|type=\"checkbox\"" roadmap.html src/roadmap-app.js`

Expected: 출력 없음.

Run: `node --test tests/history-core.test.mjs`

Expected: 과거 roadmap 기록 테스트 포함 전체 PASS.

- [ ] **Step 4: 실행 패키지 폴더 준비**

Run: `mkdir -p ../outputs/취업준비-루틴-보드/src ../outputs/취업준비-루틴-보드/assets ../outputs/취업준비-루틴-보드/output/pdf`

- [ ] **Step 5: 런타임 파일 동기화**

Run from repository root:

```bash
cp index.html daily.html weekly.html roadmap.html history.html ../outputs/취업준비-루틴-보드/
cp assets/routine.css ../outputs/취업준비-루틴-보드/assets/
cp src/routine-data.js src/routine-core.js src/page-app.js src/roadmap-app.js src/weekly-app.js src/history-core.js src/history-app.js ../outputs/취업준비-루틴-보드/src/
cp output/pdf/취업준비-운영-로드맵.pdf ../outputs/취업준비-루틴-보드/output/pdf/
```

- [ ] **Step 6: 원본과 실행 패키지 일치 확인**

각 동기화 파일을 `cmp`로 확인한다. 예:

```bash
cmp roadmap.html ../outputs/취업준비-루틴-보드/roadmap.html
cmp src/roadmap-app.js ../outputs/취업준비-루틴-보드/src/roadmap-app.js
cmp output/pdf/취업준비-운영-로드맵.pdf ../outputs/취업준비-루틴-보드/output/pdf/취업준비-운영-로드맵.pdf
```

Expected: 모든 `cmp` exit 0.

- [ ] **Step 7: 8787 실행 응답 확인**

기존 8787 서버를 종료하거나 다른 origin으로 바꾸지 않는다.

Run:

```bash
curl -I http://127.0.0.1:8787/daily.html
curl -I http://127.0.0.1:8787/roadmap.html
curl -I http://127.0.0.1:8787/output/pdf/취업준비-운영-로드맵.pdf
```

Expected: 세 요청 모두 `HTTP/1.0 200 OK`; PDF 응답은 `Content-type: application/pdf`.

- [ ] **Step 8: 최종 상태 보고**

다음 내용을 사용자에게 보고한다.

- 데일리 카테고리 필터가 저장·진척에 영향을 주지 않음
- 로드맵이 읽기 전용 다섯 일정 기준표로 전환됨
- 실제 PDF 다운로드 가능
- 기존 로드맵 기록은 기록·분석에 보존됨
- 전체 테스트 수와 PASS 결과
- 127.0.0.1 로컬 URL과 PDF 파일 링크
