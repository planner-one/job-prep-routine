# 운영 로드맵 카테고리 선택·PDF 페이지 개선 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 운영 로드맵 웹에서는 선택한 카테고리 시간표 하나만 보여주고, PDF의 다섯 페이지는 각각 표제·원칙 카드 3개·해당 일정표를 갖춘 완성형 한 장으로 만든다.

**Architecture:** 기존 `getRoadmapVariants()`와 다섯 일정 패널은 유지하고 화면 선택 상태만 `roadmap-app.js`의 메모리 상태로 관리한다. 화면에서는 `hidden`으로 비선택 패널을 감추고 인쇄 CSS에서는 모든 패널을 복원한다. 각 패널 안에 인쇄 전용 표제와 원칙 카드를 렌더링해 PDF 페이지마다 같은 구성을 만들며, 실제 PDF validator가 페이지별 내용을 검사한다.

**Tech Stack:** 정적 HTML, CSS, 브라우저 ES modules, Node.js `node:test`, Chrome DevTools Protocol 브라우저 테스트, Headless Chrome PDF, Poppler `pdfinfo`·`pdftotext`

## Global Constraints

- 웹 카테고리는 `운동일`, `비운동일`, `러닝일`, `유지일` 네 개이며 최초 선택은 `운동일`이다.
- 러닝일에서만 `21시 시작`, `22시 시작`을 선택하며 최초 러닝 시작 시각은 21시다.
- 카테고리·러닝 시각 선택은 저장하지 않고 기존 로드맵 `localStorage`도 변경하지 않는다.
- PDF는 운동일, 비운동일, 러닝 21시, 러닝 22시, 핵심 유지일 순서의 A4 세로 정확히 5페이지다.
- PDF의 모든 페이지에는 문서 표제, 일정 유형 제목·설명, 핵심 원칙 카드 3개, 해당 전체 일정이 있어야 한다.
- 기존 72개 일정 데이터, 과거 기록 호환성, PDF 원본 비교·임시 생성·검증 후 원자 교체 계약을 유지한다.
- 로그인, Firebase, GitHub Actions, 외부 배포는 변경하지 않는다.

## File Map

- Modify: `roadmap.html` — 화면 카테고리 탭과 러닝 시각 선택 마크업, 화면 전용 공통 소개 표시
- Modify: `src/roadmap-app.js` — 선택 상태 해석, 패널 표시 전환, 인쇄 전용 페이지 소개 렌더링
- Modify: `assets/routine.css` — 화면 탭·보조 선택 스타일과 인쇄 시 패널·페이지 구성 복원
- Modify: `scripts/validate-roadmap-pdf.mjs` — 각 PDF 페이지의 표제와 핵심 원칙 3개 검증
- Modify: `tests/roadmap-app.test.mjs` — 카테고리·러닝 시각을 변형 ID로 해석하는 순수 함수 계약
- Modify: `tests/roadmap-browser.test.mjs` — 실제 화면에서 한 패널만 노출되는 전환과 저장 무변경 계약
- Modify: `tests/roadmap-contract.test.mjs` — 카테고리·러닝 시각 선택 마크업 계약
- Modify: `tests/print-contract.test.mjs` — 화면 전용 숨김, 인쇄 전용 반복 구성, 숨겨진 패널 복원 계약
- Modify: `tests/pdf-artifact.test.mjs` — 강화된 validator를 canonical PDF에 적용
- Modify: `output/pdf/취업준비-운영-로드맵.pdf` — 새 5페이지 완성형 PDF artifact
- Sync only: `../outputs/취업준비-루틴-보드/{roadmap.html,assets/routine.css,src/roadmap-app.js,output/pdf/취업준비-운영-로드맵.pdf}`

---

### Task 1: 웹 로드맵을 카테고리 선택형으로 전환

**Files:**
- Modify: `tests/roadmap-app.test.mjs`
- Modify: `tests/roadmap-contract.test.mjs`
- Modify: `tests/roadmap-browser.test.mjs`
- Modify: `roadmap.html`
- Modify: `src/roadmap-app.js`
- Modify: `assets/routine.css`

**Interfaces:**
- Consumes: `getRoadmapVariants(): Array<{ id, mode, runStart, label, description, schedule }>`
- Produces: `resolveRoadmapVariantId(category: string, runStart?: string): string`
- Produces: `initRoadmapReference(document): { variants, selectCategory, selectRunStart }`

- [ ] **Step 1: 순수 선택 해석 함수의 실패 테스트 작성**

`tests/roadmap-app.test.mjs`의 import에 `resolveRoadmapVariantId`를 추가하고 다음 테스트를 작성한다.

```js
test('화면 카테고리와 러닝 시각을 하나의 로드맵 변형으로 해석한다', () => {
  assert.equal(resolveRoadmapVariantId('workout'), 'workout');
  assert.equal(resolveRoadmapVariantId('normal'), 'normal');
  assert.equal(resolveRoadmapVariantId('running', '21'), 'running-21');
  assert.equal(resolveRoadmapVariantId('running', '22'), 'running-22');
  assert.equal(resolveRoadmapVariantId('maintenance'), 'maintenance');
  assert.equal(resolveRoadmapVariantId('unknown'), 'workout');
});
```

- [ ] **Step 2: 순수 함수 테스트가 올바르게 실패하는지 확인**

Run: `node --test tests/roadmap-app.test.mjs`

Expected: `resolveRoadmapVariantId` export가 없어 FAIL.

- [ ] **Step 3: 화면 마크업 계약의 실패 테스트 작성**

`tests/roadmap-contract.test.mjs`에 다음 검증을 추가한다.

```js
test('로드맵은 네 카테고리와 러닝 시작 시각 선택을 제공한다', () => {
  assert.match(html, /class="roadmap-category-tabs"[^>]*role="tablist"/);
  for (const category of ['workout', 'normal', 'running', 'maintenance']) {
    assert.match(html, new RegExp(`data-roadmap-category="${category}"`));
  }
  assert.match(html, /id="roadmap-run-time-picker"[^>]*hidden/);
  assert.match(html, /data-roadmap-run-start="21"/);
  assert.match(html, /data-roadmap-run-start="22"/);
  assert.doesNotMatch(html, /type="checkbox"|type="radio"/);
});
```

- [ ] **Step 4: 브라우저 전환 계약의 실패 테스트 작성**

`tests/roadmap-browser.test.mjs`의 기존 브라우저 테스트에서 초기 렌더 직후와 버튼 클릭 후 상태를 수집한다. 같은 Chrome 세션을 사용해 테스트 시간을 늘리지 않는다.

```js
const initialView = await evaluate(cdp, sessionId, `(() => ({
  selectedCategory: document.querySelector('[data-roadmap-category][aria-selected="true"]')?.dataset.roadmapCategory,
  visibleVariants: [...document.querySelectorAll('[data-roadmap-variant]')]
    .filter((node) => !node.hidden)
    .map((node) => node.dataset.roadmapVariant),
  runPickerHidden: document.getElementById('roadmap-run-time-picker').hidden,
}))()`);
assert.deepEqual(initialView, {
  selectedCategory: 'workout',
  visibleVariants: ['workout'],
  runPickerHidden: true,
});

const views = await evaluate(cdp, sessionId, `(async () => {
  const visible = () => [...document.querySelectorAll('[data-roadmap-variant]')]
    .filter((node) => !node.hidden)
    .map((node) => node.dataset.roadmapVariant);
  const click = (selector) => document.querySelector(selector).click();
  const result = {};
  click('[data-roadmap-category="normal"]');
  result.normal = visible();
  click('[data-roadmap-category="running"]');
  result.running21 = visible();
  result.runPickerVisible = !document.getElementById('roadmap-run-time-picker').hidden;
  click('[data-roadmap-run-start="22"]');
  result.running22 = visible();
  click('[data-roadmap-category="maintenance"]');
  result.maintenance = visible();
  result.runPickerHiddenAfterMaintenance = document.getElementById('roadmap-run-time-picker').hidden;
  return result;
})()`);
assert.deepEqual(views, {
  normal: ['normal'],
  running21: ['running-21'],
  runPickerVisible: true,
  running22: ['running-22'],
  maintenance: ['maintenance'],
  runPickerHiddenAfterMaintenance: true,
});
```

기존 72개 행, 입력 요소 0개, legacy 저장 원문과 키 목록 불변 검증은 그대로 유지한다.

- [ ] **Step 5: 화면 계약 테스트가 요구 기능 부재로 실패하는지 확인**

Run: `node --test tests/roadmap-contract.test.mjs tests/roadmap-browser.test.mjs`

Expected: 카테고리 마크업이 없고 다섯 패널이 모두 보여 FAIL. 샌드박스에서 `listen EPERM`이면 동일 명령을 로컬 포트 권한으로 재실행한다.

- [ ] **Step 6: 카테고리와 러닝 시각 선택 마크업 추가**

`roadmap.html`에서 원칙 카드 다음, `#roadmap-reference-list` 앞에 다음 구조를 추가한다.

```html
<section class="roadmap-view-selector screen-only" aria-label="운영 일정 선택">
  <div class="roadmap-selector-heading">
    <div>
      <p class="eyebrow">일정 카테고리</p>
      <h2>확인할 하루를 선택하세요</h2>
    </div>
    <p>선택한 시간표 하나만 보여드립니다.</p>
  </div>
  <div class="roadmap-category-tabs" role="tablist" aria-label="운영 일정 카테고리">
    <button id="roadmap-category-workout" type="button" role="tab" data-roadmap-category="workout" aria-selected="true">운동일</button>
    <button id="roadmap-category-normal" type="button" role="tab" data-roadmap-category="normal" aria-selected="false">비운동일</button>
    <button id="roadmap-category-running" type="button" role="tab" data-roadmap-category="running" aria-selected="false">러닝일</button>
    <button id="roadmap-category-maintenance" type="button" role="tab" data-roadmap-category="maintenance" aria-selected="false">유지일</button>
  </div>
  <div id="roadmap-run-time-picker" class="roadmap-run-time-picker" aria-label="러닝 시작 시각" hidden>
    <span>러닝 시작</span>
    <button type="button" data-roadmap-run-start="21" aria-pressed="true">21시</button>
    <button type="button" data-roadmap-run-start="22" aria-pressed="false">22시</button>
  </div>
</section>
```

- [ ] **Step 7: 최소 선택 상태와 패널 표시 구현**

`src/roadmap-app.js`에 순수 함수와 `initRoadmapReference()`의 화면 상태를 추가한다.

```js
const ROADMAP_CATEGORIES = new Set(['workout', 'normal', 'running', 'maintenance']);

export function resolveRoadmapVariantId(category, runStart = '21') {
  const safeCategory = ROADMAP_CATEGORIES.has(category) ? category : 'workout';
  if (safeCategory !== 'running') return safeCategory;
  return `running-${runStart === '22' ? '22' : '21'}`;
}
```

`renderVariant()`가 만든 section에는 다음 접근성 속성을 설정한다.

```js
section.id = `roadmap-panel-${variant.id}`;
section.setAttribute('role', 'tabpanel');
section.setAttribute('aria-label', variant.label);
```

`initRoadmapReference()`에서 다섯 패널을 렌더링한 뒤 다음 상태 갱신 함수를 연결한다.

```js
let activeCategory = 'workout';
let activeRunStart = '21';
const categoryButtons = [...pageDocument.querySelectorAll('[data-roadmap-category]')];
const runButtons = [...pageDocument.querySelectorAll('[data-roadmap-run-start]')];
const runPicker = pageDocument.getElementById('roadmap-run-time-picker');
const panels = [...list.querySelectorAll('[data-roadmap-variant]')];

function updateView() {
  const activeVariant = resolveRoadmapVariantId(activeCategory, activeRunStart);
  for (const button of categoryButtons) {
    const selected = button.dataset.roadmapCategory === activeCategory;
    button.setAttribute('aria-selected', String(selected));
    if (selected) button.setAttribute('aria-controls', `roadmap-panel-${activeVariant}`);
    else button.removeAttribute('aria-controls');
  }
  runPicker.hidden = activeCategory !== 'running';
  for (const button of runButtons) {
    button.setAttribute('aria-pressed', String(button.dataset.roadmapRunStart === activeRunStart));
  }
  for (const panel of panels) panel.hidden = panel.dataset.roadmapVariant !== activeVariant;
}

function selectCategory(category) {
  activeCategory = ROADMAP_CATEGORIES.has(category) ? category : 'workout';
  updateView();
}

function selectRunStart(runStart) {
  activeRunStart = runStart === '22' ? '22' : '21';
  updateView();
}

categoryButtons.forEach((button) => button.addEventListener('click', () => selectCategory(button.dataset.roadmapCategory)));
runButtons.forEach((button) => button.addEventListener('click', () => selectRunStart(button.dataset.roadmapRunStart)));
updateView();
```

반환값은 `{ variants, selectCategory, selectRunStart }`로 바꾼다. 모든 선택 요소는 기본 `button` 키보드 활성화를 유지하며 별도 `tabIndex`로 포커스 접근을 막지 않는다. 저장소 접근은 추가하지 않는다.

- [ ] **Step 8: 화면 선택 UI 스타일 추가**

`assets/routine.css`의 로드맵 영역에 다음 역할의 스타일을 추가한다.

```css
.roadmap-view-selector {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: end;
  gap: 14px 22px;
  margin-bottom: 18px;
  padding: 18px;
  border: 1px solid var(--line);
  border-radius: 18px;
  background: #f7f9fc;
}

.roadmap-selector-heading {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 18px;
  grid-column: 1 / -1;
}

.roadmap-category-tabs,
.roadmap-run-time-picker {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.roadmap-category-tabs button,
.roadmap-run-time-picker button {
  min-height: 40px;
  padding: 8px 16px;
  border: 1px solid #d4deea;
  border-radius: 999px;
  background: var(--white);
  color: #52647a;
  font-weight: 800;
}

.roadmap-category-tabs button[aria-selected="true"],
.roadmap-run-time-picker button[aria-pressed="true"] {
  border-color: var(--navy);
  background: var(--navy);
  color: var(--white);
}
```

모바일 미디어 쿼리에서는 `.roadmap-view-selector { grid-template-columns: 1fr; }`와 `.roadmap-selector-heading { align-items: flex-start; flex-direction: column; }`을 적용한다.

- [ ] **Step 9: Task 1 테스트를 통과시키고 전체 문법 확인**

Run: `node --test tests/roadmap-app.test.mjs tests/roadmap-contract.test.mjs tests/roadmap-browser.test.mjs`

Expected: 모든 테스트 PASS.

Run: `npm run check`

Expected: exit 0.

- [ ] **Step 10: Task 1 커밋**

```bash
git add roadmap.html src/roadmap-app.js assets/routine.css tests/roadmap-app.test.mjs tests/roadmap-contract.test.mjs tests/roadmap-browser.test.mjs
git commit -m "feat: 로드맵을 카테고리 선택형으로 전환"
```

---

### Task 2: PDF의 모든 페이지를 원칙 카드와 일정표로 완성

**Files:**
- Modify: `tests/print-contract.test.mjs`
- Modify: `tests/pdf-artifact.test.mjs`
- Modify: `roadmap.html`
- Modify: `src/roadmap-app.js`
- Modify: `assets/routine.css`
- Modify: `scripts/validate-roadmap-pdf.mjs`
- Modify: `output/pdf/취업준비-운영-로드맵.pdf`

**Interfaces:**
- Consumes: `ROADMAP_VARIANTS`, `getRoadmapVariants()`
- Produces: 각 `[data-roadmap-variant]` 안의 `.roadmap-print-intro.print-only`와 `.roadmap-print-principles`
- Strengthens: `validateRoadmapPdf(pdfPath)`가 모든 페이지에서 문서 표제와 세 원칙을 요구

- [ ] **Step 1: 인쇄 DOM·CSS 계약의 실패 테스트 작성**

`tests/print-contract.test.mjs`의 로드맵 인쇄 테스트에 다음 검증을 추가한다.

```js
assert.match(roadmapHtml, /class="[^"]*roadmap-header[^"]*screen-only/);
assert.match(roadmapHtml, /class="[^"]*roadmap-principles[^"]*screen-only/);
assert.match(declarationsFor(printCss, '.print-only'), /display:\s*block\s*!important/);
assert.match(
  declarationsFor(printCss, '#roadmap-page [data-roadmap-variant][hidden]'),
  /display:\s*block\s*!important/,
);
assert.match(declarationsFor(printCss, '.roadmap-print-principles'), /display:\s*grid\s*!important/);
```

`tests/roadmap-browser.test.mjs`의 DOM 결과에 다음 값을 추가한다.

```js
printIntroCount: document.querySelectorAll('.roadmap-print-intro').length,
printPrincipleCardCounts: [...document.querySelectorAll('[data-roadmap-variant]')]
  .map((node) => node.querySelectorAll('.roadmap-print-principles .focus-anchor').length),
```

기대값은 `printIntroCount === 5`, `printPrincipleCardCounts === [3, 3, 3, 3, 3]`이다.

- [ ] **Step 2: 인쇄 계약 테스트가 반복 소개 부재로 실패하는지 확인**

Run: `node --test tests/print-contract.test.mjs tests/roadmap-browser.test.mjs`

Expected: `.roadmap-print-intro`와 인쇄 복원 CSS가 없어 FAIL.

- [ ] **Step 3: 각 변형에 인쇄 전용 표제와 원칙 카드 렌더링**

`roadmap.html`의 기존 `.roadmap-header`와 `.roadmap-principles`에는 `screen-only`를 추가해 인쇄에서 각 페이지 전용 구성과 중복되지 않게 한다.

`src/roadmap-app.js`에 원칙 데이터를 한 번 정의한다.

```js
const ROADMAP_PRINCIPLES = Object.freeze([
  { number: '01', title: '지원은 하루 3~4개', description: '공고 분석부터 자소서 조정·제출까지 한 흐름으로 끝낸다.' },
  { number: '02', title: '면접 언어를 매일 다듬기', description: '이력서와 포트폴리오를 내 말로 설명하는 시간을 지킨다.' },
  { number: '03', title: '학습은 결과물로 남기기', description: '선택한 주제를 작은 구현이나 프로젝트 적용으로 연결한다.' },
]);
```

다음 helper를 추가하고 `renderVariant()`에서 `section`의 첫 자식으로 붙인다.

```js
function renderPrintIntro(pageDocument, variant) {
  const intro = pageDocument.createElement('div');
  intro.className = 'roadmap-print-intro print-only';
  intro.innerHTML = `
    <header class="roadmap-print-page-heading">
      <div><p class="eyebrow">운영 기준표</p><h1>취업 준비 운영 로드맵</h1></div>
      <div><strong>${variant.label}</strong><span>${variant.description}</span></div>
    </header>
    <section class="roadmap-print-principles" aria-label="핵심 운영 원칙"></section>
  `;
  const principles = intro.querySelector('.roadmap-print-principles');
  for (const principle of ROADMAP_PRINCIPLES) {
    const card = pageDocument.createElement('article');
    card.className = 'focus-anchor';
    card.innerHTML = `<span class="principle-number" aria-hidden="true">${principle.number}</span><h2>${principle.title}</h2><p>${principle.description}</p>`;
    principles.append(card);
  }
  return intro;
}
```

`renderVariant()`의 `section.append(heading)` 앞에 `section.append(renderPrintIntro(pageDocument, variant))`를 실행한다. 문구는 고정 상수에서만 가져오며 사용자 입력을 넣지 않는다.

- [ ] **Step 4: 인쇄에서 다섯 패널과 페이지 전용 구성을 복원**

`assets/routine.css`에 기본 숨김과 인쇄 스타일을 추가한다.

```css
.print-only {
  display: none !important;
}

@media print {
  .print-only {
    display: block !important;
  }

  #roadmap-page [data-roadmap-variant][hidden] {
    display: block !important;
  }

  .roadmap-mode-section {
    min-height: 278mm;
    border: 0;
    border-radius: 0;
    break-before: page;
    break-inside: auto;
  }

  .roadmap-print-page-heading {
    display: flex;
    align-items: end;
    justify-content: space-between;
    gap: 18px;
    margin-bottom: 7mm;
    padding-bottom: 4mm;
    border-bottom: 1px solid var(--line);
  }

  .roadmap-print-principles {
    display: grid !important;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 3mm;
    margin-bottom: 5mm;
  }

  .roadmap-print-principles .focus-anchor {
    min-height: 25mm;
    padding: 4mm 4mm 3mm 11mm;
  }

  .roadmap-reference-row {
    min-height: 8mm;
    padding-block: 1.5mm;
  }
}
```

실제 PDF가 6페이지로 밀리면 표제·카드의 `margin`, `min-height`, 일정 행의 `min-height`만 줄인다. 문서 글자 크기는 기존 로드맵 본문보다 작게 만들지 않는다.

- [ ] **Step 5: 실제 PDF 페이지별 내용 validator의 실패 테스트 강화**

`scripts/validate-roadmap-pdf.mjs`에서 변형별 페이지 검사 안에 문서 표제와 세 원칙 검증을 넣는다.

```js
variants.forEach((variant, pageIndex) => {
  const page = pages[pageIndex];
  requireText(page, '취업 준비 운영 로드맵', `${pageIndex + 1}페이지`);
  requireText(page, variant.label, `${pageIndex + 1}페이지`);
  for (const principle of PRINCIPLES) requireText(page, principle, `${pageIndex + 1}페이지`);
  for (const item of variant.schedule) {
    scheduleItemCount += 1;
    requireText(page, `${item.time} ${item.label}`, `${pageIndex + 1}페이지`);
  }
});
```

Run: `node --test tests/pdf-artifact.test.mjs`

Expected: 기존 canonical PDF의 2~5페이지에 세 원칙이 없어 FAIL.

- [ ] **Step 6: 8787 실행 소스를 먼저 동기화**

PDF 내보내기 스크립트가 repo와 8787 source 일치를 요구하므로 다음 네 파일을 실행 패키지에 기계적으로 복사한다.

```bash
cp roadmap.html ../outputs/취업준비-루틴-보드/roadmap.html
cp assets/routine.css ../outputs/취업준비-루틴-보드/assets/routine.css
cp src/roadmap-app.js ../outputs/취업준비-루틴-보드/src/roadmap-app.js
cp src/routine-data.js ../outputs/취업준비-루틴-보드/src/routine-data.js
```

기존 8787 서버의 document root와 프로세스는 변경하지 않는다.

- [ ] **Step 7: 검증된 canonical PDF 재생성**

Run: `npm run export:roadmap-pdf`

Expected: `운영 로드맵 PDF 검증 완료: A4 5페이지, 72개 일정` 출력 후 exit 0. Chrome 또는 로컬 포트가 샌드박스에 막히면 같은 명령만 필요한 권한으로 재실행한다.

- [ ] **Step 8: 강화된 PDF와 인쇄 계약 테스트 통과 확인**

Run: `node --test tests/print-contract.test.mjs tests/pdf-artifact.test.mjs tests/roadmap-browser.test.mjs`

Expected: 모든 테스트 PASS. PDF는 페이지마다 문서 표제, 해당 변형, 세 원칙, 대응 일정을 포함한다.

- [ ] **Step 9: canonical PDF를 실행 패키지에 동기화**

```bash
cp output/pdf/취업준비-운영-로드맵.pdf ../outputs/취업준비-루틴-보드/output/pdf/취업준비-운영-로드맵.pdf
```

- [ ] **Step 10: Task 2 커밋**

```bash
git add roadmap.html src/roadmap-app.js assets/routine.css scripts/validate-roadmap-pdf.mjs tests/print-contract.test.mjs tests/pdf-artifact.test.mjs tests/roadmap-browser.test.mjs output/pdf/취업준비-운영-로드맵.pdf
git commit -m "feat: 로드맵 PDF 페이지 구성을 완성"
```

---

### Task 3: 실행 패키지 동기화와 전체 회귀 검증

**Files:**
- Sync only: `../outputs/취업준비-루틴-보드`
- Verify only: repo 전체

**Interfaces:**
- Consumes: Task 1·2의 웹 source와 canonical PDF
- Produces: 8787에서 repo와 바이트 단위로 같은 로드맵 화면·PDF

- [ ] **Step 1: 실행 패키지 14개 파일 전체 동기화**

기존 실행 패키지 계약에 따라 HTML 5개, CSS 1개, 런타임 JS 7개, canonical PDF 1개를 repo에서 복사한다.

```bash
cp index.html daily.html roadmap.html weekly.html history.html ../outputs/취업준비-루틴-보드/
cp assets/routine.css ../outputs/취업준비-루틴-보드/assets/routine.css
cp src/routine-data.js src/routine-core.js src/page-app.js src/roadmap-app.js src/weekly-app.js src/history-core.js src/history-app.js ../outputs/취업준비-루틴-보드/src/
cp output/pdf/취업준비-운영-로드맵.pdf ../outputs/취업준비-루틴-보드/output/pdf/취업준비-운영-로드맵.pdf
```

- [ ] **Step 2: 문법과 전체 테스트 실행**

Run: `npm run check`

Expected: exit 0.

Run: `npm test`

Expected: 모든 테스트 PASS, fail 0. 브라우저·HTTP 테스트의 로컬 포트가 샌드박스에 막히면 같은 명령만 필요한 권한으로 재실행한다.

- [ ] **Step 3: 실제 PDF artifact 재검증**

Run: `node scripts/validate-roadmap-pdf.mjs output/pdf/취업준비-운영-로드맵.pdf`

Expected: `운영 로드맵 PDF 검증 완료: A4 5페이지, 72개 일정`.

Run: `pdfinfo output/pdf/취업준비-운영-로드맵.pdf`

Expected: `Pages: 5`, `Page size: ... (A4)`.

- [ ] **Step 4: repo와 실행 패키지의 14개 파일 비교**

각 HTML 5개, CSS 1개, 런타임 JS 7개, PDF 1개에 `cmp --silent`를 실행한다.

Expected: 14개 모두 exit 0.

- [ ] **Step 5: 현재 8787 응답과 repo source 비교**

`curl -fsS`로 다음 다섯 응답을 받아 repo 파일과 `cmp`한다.

```text
http://127.0.0.1:8787/roadmap.html
http://127.0.0.1:8787/assets/routine.css
http://127.0.0.1:8787/src/roadmap-app.js
http://127.0.0.1:8787/src/routine-data.js
http://127.0.0.1:8787/output/pdf/취업준비-운영-로드맵.pdf
```

Expected: 다섯 응답 모두 repo와 byte-for-byte 일치.

- [ ] **Step 6: 최종 diff와 작업 트리 확인**

Run: `git diff --check`

Expected: 출력 없음.

Run: `git status --short`

Expected: 출력 없음. 실행 패키지는 repo 밖의 배포 제외 로컬 artifact이므로 별도 커밋하지 않는다.
