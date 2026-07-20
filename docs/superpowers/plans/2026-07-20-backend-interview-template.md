# 백엔드 면접 학습 카탈로그·오늘의 큐 구현 계획

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Maeil Mail 백엔드 152문항을 검색·분류·개인 기록할 수 있는 학습 카탈로그와 오전 2시 기준 오늘의 면접 큐를 기존 취업 준비 루틴 보드에 추가한다.

**Architecture:** 공식 카테고리 목차에서 생성한 정적 메타데이터를 `interview-data.js`로 제공하고, DOM·저장소와 무관한 `interview-core.js`가 상태 정규화·복합 필터·통계·큐 추천을 담당한다. `interview-storage.js`는 별도 네임스페이스의 안전한 저장 어댑터만 담당하며, 목록 앱과 상세 앱은 같은 코어와 저장 어댑터를 사용한다. 하나의 `template.html?id=be-N` 상세 화면으로 152개 고유 주소를 제공한다.

**Tech Stack:** 정적 HTML, CSS, 브라우저 ES Modules, `localStorage`, Node.js 내장 테스트 러너, Chrome DevTools Protocol 브라우저 테스트

## Global Constraints

- 사용자 문구와 새 문서의 제목·본문은 한국어를 기본으로 한다.
- 대상은 `maeil-mail/maeil-mail-contents`의 백엔드 질문 152개와 원본 8개 카테고리뿐이다.
- 앱에는 질문 ID·제목·카테고리·원본 순서·GitHub URL만 넣고 원문 답변·이미지·참고 자료 전문은 복제하지 않는다.
- 질문 ID는 `be-N`, 상세 주소는 `template.html?id=be-N`을 사용한다.
- 큐와 학습 기록은 기존 데일리·주간·로드맵·기록 완료율과 분리한다.
- 저장 키는 `job-prep-routine:interview:state`와 `job-prep-routine:interview:queue:YYYY-MM-DD`를 사용한다.
- 오전 2시를 논리 날짜 경계로 사용하고 기존 `logicalDateString()`을 재사용한다.
- 오늘의 큐는 중복 없이 최대 5개이며 같은 논리 날짜에는 새로고침·페이지 이동으로 재선정하지 않는다.
- 질문 고정은 최대 5개이며 여섯 번째 고정을 허용하지 않는다.
- 손상된 저장값은 유효 필드만 정규화하고 기존 루틴 및 다른 질문 기록을 손실시키지 않는다.
- 상세 입력은 변경 즉시 저장하되 저장 실패 시 현재 DOM 입력값을 지우지 않는다.
- 목록은 세로형이고 모바일에서 가로 스크롤에 의존하지 않는다.
- 상세 인쇄는 현재 한 문항의 읽기 전용 값만 남기고 편집·큐 조작·초기화 버튼을 숨긴다.
- 로그인, 데이터베이스, 실시간 GitHub 동기화, 프론트엔드 질문, 배포 변경은 구현하지 않는다.
- 기존 canonical PDF 파일과 기존 `job-prep-routine:*` 저장값을 변경하지 않는다.
- 현재 로컬 서버는 `/Users/minsujeong/Documents/Codex/2026-07-16/wl/outputs/취업준비-루틴-보드`를 `127.0.0.1:8787`에서 계속 제공한다.

---

## 파일 구조

- `scripts/sync-interview-data.mjs`: 공식 `backend/toc-category.md`를 엄격하게 파싱해 정적 데이터 모듈을 생성한다.
- `src/interview-data.js`: 브라우저가 빌드 없이 읽는 8개 카테고리·152개 질문 메타데이터다.
- `src/interview-core.js`: 질문 상태, 검색·필터·통계, 큐 생성·고정·교체·완료를 순수 함수로 제공한다.
- `src/interview-storage.js`: 코어의 정규화 함수를 이용해 상태와 날짜별 큐를 안전하게 읽고 저장한다.
- `src/templates-app.js`: 목록 요약, 오늘의 큐, 필터, 세로 카탈로그 이벤트를 담당한다.
- `src/template-detail-app.js`: 쿼리 ID 해석, 상세 자동 저장, 이전·다음, 인쇄용 값 동기화를 담당한다.
- `templates.html`: 목록 페이지의 접근 가능한 정적 골격이다.
- `template.html`: 한 문항 상세 페이지의 접근 가능한 정적 골격이다.
- `assets/routine.css`: 기존 디자인 언어에 면접 목록·상세·모바일·인쇄 규칙을 추가한다.
- `tests/interview-data.test.mjs`: 공식 데이터 수·순서·고유성·출처 계약을 검증한다.
- `tests/interview-core.test.mjs`: 정규화·필터·통계·큐 알고리즘을 검증한다.
- `tests/interview-storage.test.mjs`: 손상 저장값 복구·비손실 저장·저장 오류를 검증한다.
- `tests/interview-contract.test.mjs`: 홈·목록·상세·접근성·인쇄의 정적 계약을 검증한다.
- `tests/interview-browser.test.mjs`: 실제 브라우저에서 목록과 상세의 저장·복원·큐 흐름을 검증한다.

---

### Task 1: 공식 백엔드 질문 메타데이터 생성

**Files:**
- Create: `scripts/sync-interview-data.mjs`
- Create: `src/interview-data.js`
- Create: `tests/interview-data.test.mjs`
- Modify: `package.json`

**Interfaces:**
- Produces: `INTERVIEW_SOURCE`, `INTERVIEW_CATEGORIES`, `INTERVIEW_QUESTIONS`, `INTERVIEW_QUESTION_BY_ID`, `getInterviewQuestion(id)`
- Consumes: official `https://raw.githubusercontent.com/maeil-mail/maeil-mail-contents/main/backend/toc-category.md`

- [ ] **Step 1: Write the failing data-contract test**

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import {
  INTERVIEW_SOURCE,
  INTERVIEW_CATEGORIES,
  INTERVIEW_QUESTIONS,
  getInterviewQuestion,
} from '../src/interview-data.js';

test('공식 백엔드 152문항과 8개 카테고리를 원본 순서로 제공한다', () => {
  assert.equal(INTERVIEW_SOURCE.snapshotCommit, '8714ebdea872550df26a92b7846338dbdccf3986');
  assert.equal(INTERVIEW_CATEGORIES.length, 8);
  assert.equal(INTERVIEW_QUESTIONS.length, 152);
  assert.deepEqual(
    INTERVIEW_CATEGORIES.map(({ count }) => count),
    [21, 25, 25, 17, 23, 21, 9, 11],
  );
  assert.deepEqual(
    INTERVIEW_QUESTIONS.map(({ order }) => order),
    Array.from({ length: 152 }, (_, index) => index + 1),
  );
});

test('질문 ID·제목·카테고리·출처가 모두 유효하고 고유하다', () => {
  const ids = new Set(INTERVIEW_QUESTIONS.map(({ id }) => id));
  assert.equal(ids.size, 152);
  assert.deepEqual(
    [...ids].map((id) => Number(id.slice(3))).sort((a, b) => a - b),
    Array.from({ length: 152 }, (_, index) => index + 1),
  );
  const categoryIds = new Set(INTERVIEW_CATEGORIES.map(({ id }) => id));
  for (const question of INTERVIEW_QUESTIONS) {
    assert.match(question.id, /^be-\d+$/);
    assert.equal(question.title.trim().length > 0, true);
    assert.equal(categoryIds.has(question.categoryId), true);
    assert.equal(
      question.sourceUrl,
      `https://github.com/maeil-mail/maeil-mail-contents/blob/main/backend/contents/${question.id}.md`,
    );
    assert.equal(getInterviewQuestion(question.id), question);
  }
  assert.equal(getInterviewQuestion('be-999'), null);
});
```

- [ ] **Step 2: Run the focused test and verify RED**

Run: `node --test tests/interview-data.test.mjs`

Expected: FAIL because `src/interview-data.js` does not exist.

- [ ] **Step 3: Implement the strict metadata generator**

`scripts/sync-interview-data.mjs`에 다음 완전한 파싱 규칙을 구현한다.

```js
import { writeFile } from 'node:fs/promises';

const SNAPSHOT_COMMIT = '8714ebdea872550df26a92b7846338dbdccf3986';
const SOURCE_URL = `https://raw.githubusercontent.com/maeil-mail/maeil-mail-contents/${SNAPSHOT_COMMIT}/backend/toc-category.md`;
const SOURCE_LINK_ROOT = 'https://github.com/maeil-mail/maeil-mail-contents/blob/main/backend/contents';
const CATEGORY_IDS = new Map([
  ['Spring과 애플리케이션 계층', 'spring-application'],
  ['Persistence와 데이터베이스', 'persistence-database'],
  ['네트워크, HTTP와 웹 인프라', 'network-http'],
  ['분산 시스템, 캐시와 운영 인프라', 'distributed-cache'],
  ['운영체제, 동시성과 런타임', 'os-concurrency'],
  ['자바 언어, 컬렉션과 자료구조', 'java-language'],
  ['아키텍처, 객체지향과 설계 패턴', 'architecture-design'],
  ['테스트, 보안과 관측 가능성', 'test-security'],
]);

const response = await fetch(SOURCE_URL);
if (!response.ok) throw new Error(`공식 목차를 읽지 못했습니다: HTTP ${response.status}`);
const lines = (await response.text()).split(/\r?\n/);
const categories = [];
const questions = [];
let current = null;

for (const line of lines) {
  const heading = /^## (.+)$/.exec(line);
  if (heading) {
    const label = heading[1].trim();
    const id = CATEGORY_IDS.get(label);
    if (!id) throw new Error(`알 수 없는 카테고리: ${label}`);
    current = { id, label, order: categories.length + 1, count: 0 };
    categories.push(current);
    continue;
  }
  const item = /^- \[(.+)\]\(contents\/(be-\d+)\.md\)$/.exec(line);
  if (!item) continue;
  if (!current) throw new Error(`카테고리 밖의 질문: ${line}`);
  const [, title, id] = item;
  questions.push({
    id,
    number: Number(id.slice(3)),
    title: title.trim(),
    categoryId: current.id,
    category: current.label,
    order: questions.length + 1,
    sourceUrl: `${SOURCE_LINK_ROOT}/${id}.md`,
  });
  current.count += 1;
}

if (categories.length !== 8 || questions.length !== 152) {
  throw new Error(`예상 개수 불일치: 카테고리 ${categories.length}, 질문 ${questions.length}`);
}
if (new Set(questions.map(({ id }) => id)).size !== questions.length) {
  throw new Error('중복 질문 ID가 있습니다.');
}

const source = {
  repository: 'maeil-mail/maeil-mail-contents',
  snapshotCommit: SNAPSHOT_COMMIT,
  tocUrl: 'https://github.com/maeil-mail/maeil-mail-contents/blob/main/backend/toc-category.md',
};
const output = `// ${SOURCE_URL}에서 생성한 백엔드 질문 메타데이터입니다.\n`
  + `export const INTERVIEW_SOURCE = Object.freeze(${JSON.stringify(source, null, 2)});\n\n`
  + `export const INTERVIEW_CATEGORIES = Object.freeze(${JSON.stringify(categories, null, 2)});\n\n`
  + `export const INTERVIEW_QUESTIONS = Object.freeze(${JSON.stringify(questions, null, 2)});\n\n`
  + `export const INTERVIEW_QUESTION_BY_ID = new Map(INTERVIEW_QUESTIONS.map((question) => [question.id, question]));\n\n`
  + `export function getInterviewQuestion(id) {\n  return INTERVIEW_QUESTION_BY_ID.get(id) ?? null;\n}\n`;

await writeFile(new URL('../src/interview-data.js', import.meta.url), output);
```

- [ ] **Step 4: Generate the static module and add maintenance scripts**

Run: `node scripts/sync-interview-data.mjs`

`package.json`의 scripts에 다음을 추가하고 `check`에 두 새 모듈의 문법 검사를 포함한다.

```json
"sync:interview-data": "node scripts/sync-interview-data.mjs"
```

```text
node --check src/interview-data.js && node --check scripts/sync-interview-data.mjs
```

- [ ] **Step 5: Run data tests and syntax checks**

Run: `node --test tests/interview-data.test.mjs`

Expected: 2 tests PASS.

Run: `npm run check`

Expected: every syntax check exits 0.

- [ ] **Step 6: Commit Task 1**

```bash
git add scripts/sync-interview-data.mjs src/interview-data.js tests/interview-data.test.mjs package.json
git commit -m "feat: 백엔드 면접 질문 메타데이터를 추가"
```

---

### Task 2: 질문 상태·필터·오늘의 큐 순수 코어

**Files:**
- Create: `src/interview-core.js`
- Create: `tests/interview-core.test.mjs`
- Modify: `package.json`

**Interfaces:**
- Consumes: question objects shaped as `{ id, order, title, categoryId }`
- Produces: `INTERVIEW_STATE_VERSION`, `INTERVIEW_STATE_KEY`, `QUESTION_STATUSES`, `createEmptyInterviewState()`, `createEmptyQuestionState()`, `normalizeInterviewState(candidate, validIds)`, `updateQuestionState(state, id, patch, now)`, `resetQuestionState(state, id)`, `setQueuePinned(state, id, pinned, now)`, `filterInterviewQuestions(questions, state, filters)`, `buildInterviewStats(questions, state)`, `interviewQueueKey(date)`, `normalizeInterviewQueue(candidate, date, validIds)`, `ensureDailyQueue(questions, state, candidate, date, now)`, `replaceQueueQuestion(queue, id, questions, state, now)`, `addQuestionToQueue(queue, id, questions, state, now)`, `setQueueCompleted(queue, id, completed, now)`

- [ ] **Step 1: Write failing normalization and filter tests**

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { INTERVIEW_QUESTIONS } from '../src/interview-data.js';
import {
  buildInterviewStats,
  createEmptyInterviewState,
  filterInterviewQuestions,
  normalizeInterviewState,
  setQueuePinned,
  updateQuestionState,
} from '../src/interview-core.js';

test('손상된 질문 상태를 필드별로 정규화하고 알 수 없는 ID를 버린다', () => {
  const normalized = normalizeInterviewState({
    version: 999,
    questions: {
      'be-1': { status: 'review', favorite: 1, confidence: 9, answer: '내 답변', memo: null },
      'be-999': { status: 'done' },
    },
  }, new Set(['be-1']));
  assert.deepEqual(normalized.questions['be-1'], {
    status: 'review', favorite: true, queuePinned: false, confidence: 0,
    answer: '내 답변', keywords: '', memo: '', lastStudiedAt: null, updatedAt: null,
  });
  assert.equal(Object.hasOwn(normalized.questions, 'be-999'), false);
});

test('한 질문 갱신은 다른 질문과 유효 필드를 보존한다', () => {
  let state = createEmptyInterviewState();
  state = updateQuestionState(state, 'be-1', { answer: 'OSIV 설명', status: 'studying' }, new Date('2026-07-20T10:00:00+09:00'));
  state = updateQuestionState(state, 'be-2', { favorite: true }, new Date('2026-07-20T10:01:00+09:00'));
  assert.equal(state.questions['be-1'].answer, 'OSIV 설명');
  assert.equal(state.questions['be-2'].favorite, true);
});

test('검색·카테고리·상태·즐겨찾기 필터를 동시에 적용한다', () => {
  let state = createEmptyInterviewState();
  const target = INTERVIEW_QUESTIONS.find(({ id }) => id === 'be-1');
  state = updateQuestionState(state, target.id, { status: 'review', favorite: true });
  const result = filterInterviewQuestions(INTERVIEW_QUESTIONS, state, {
    query: '  open SESSION  ', categoryId: target.categoryId, status: 'review', favoritesOnly: true,
  });
  assert.deepEqual(result.map(({ id }) => id), ['be-1']);
});

test('상태별 통계를 전체 152문항 기준으로 계산한다', () => {
  let state = createEmptyInterviewState();
  state = updateQuestionState(state, 'be-1', { status: 'studying' });
  state = updateQuestionState(state, 'be-2', { status: 'review' });
  state = updateQuestionState(state, 'be-3', { status: 'done' });
  assert.deepEqual(buildInterviewStats(INTERVIEW_QUESTIONS, state), {
    total: 152, unseen: 149, studying: 1, review: 1, done: 1,
  });
});

test('큐 고정은 다섯 개까지만 허용한다', () => {
  let state = createEmptyInterviewState();
  for (let number = 1; number <= 5; number += 1) {
    state = setQueuePinned(state, `be-${number}`, true);
  }
  assert.throws(() => setQueuePinned(state, 'be-6', true), /최대 5개/);
});
```

- [ ] **Step 2: Write failing queue-priority and adjustment tests**

```js
import {
  addQuestionToQueue,
  ensureDailyQueue,
  normalizeInterviewQueue,
  replaceQueueQuestion,
  setQueueCompleted,
} from '../src/interview-core.js';

test('고정·복습·낮은 자신감·미학습·오래된 학습 순으로 5개를 추천한다', () => {
  const questions = Array.from({ length: 7 }, (_, index) => ({
    id: `be-${index + 1}`, order: index, title: `질문 ${index + 1}`, categoryId: 'test',
  }));
  let state = createEmptyInterviewState();
  state = updateQuestionState(state, 'be-1', { status: 'done', queuePinned: true, lastStudiedAt: '2026-07-19T00:00:00.000Z' });
  state = updateQuestionState(state, 'be-2', { status: 'review' });
  state = updateQuestionState(state, 'be-3', { status: 'studying', confidence: 2 });
  state = updateQuestionState(state, 'be-4', { status: 'unseen' });
  state = updateQuestionState(state, 'be-5', { status: 'done', lastStudiedAt: '2026-07-01T00:00:00.000Z' });
  const queue = ensureDailyQueue(questions, state, null, '2026-07-20', new Date('2026-07-20T03:00:00Z'));
  assert.deepEqual(queue.ids, ['be-1', 'be-2', 'be-3', 'be-4', 'be-5']);
});

test('같은 날짜의 유효한 저장 큐는 재선정하지 않는다', () => {
  const saved = { date: '2026-07-20', ids: ['be-7', 'be-6'], completedIds: ['be-7'], updatedAt: 'saved' };
  const queue = ensureDailyQueue(INTERVIEW_QUESTIONS, createEmptyInterviewState(), saved, '2026-07-20');
  assert.deepEqual(queue.ids, ['be-7', 'be-6']);
  assert.deepEqual(queue.completedIds, ['be-7']);
});

test('교체·직접 추가·완료 취소가 중복 없이 큐를 보존한다', () => {
  const state = createEmptyInterviewState();
  let queue = normalizeInterviewQueue({ date: '2026-07-20', ids: ['be-1', 'be-2', 'be-3', 'be-4', 'be-5'], completedIds: [] }, '2026-07-20', new Set(INTERVIEW_QUESTIONS.map(({ id }) => id)));
  queue = replaceQueueQuestion(queue, 'be-5', INTERVIEW_QUESTIONS, state, new Date('2026-07-20T01:00:00Z'));
  assert.equal(queue.ids.includes('be-5'), false);
  assert.equal(new Set(queue.ids).size, 5);
  queue = addQuestionToQueue(queue, 'be-20', INTERVIEW_QUESTIONS, state);
  assert.equal(queue.ids.includes('be-20'), true);
  queue = setQueueCompleted(queue, queue.ids[0], true);
  assert.equal(queue.completedIds.includes(queue.ids[0]), true);
  queue = setQueueCompleted(queue, queue.ids[0], false);
  assert.equal(queue.completedIds.includes(queue.ids[0]), false);
});
```

- [ ] **Step 3: Run the focused test and verify RED**

Run: `node --test tests/interview-core.test.mjs`

Expected: FAIL because `src/interview-core.js` does not exist.

- [ ] **Step 4: Implement immutable state, filtering, statistics, and queue logic**

`src/interview-core.js`는 다음 공개 상수와 기본값을 사용한다.

```js
export const INTERVIEW_STATE_VERSION = 1;
export const INTERVIEW_STATE_KEY = 'job-prep-routine:interview:state';
export const QUESTION_STATUSES = Object.freeze(['unseen', 'studying', 'review', 'done']);

export const createEmptyQuestionState = () => ({
  status: 'unseen', favorite: false, queuePinned: false, confidence: 0,
  answer: '', keywords: '', memo: '', lastStudiedAt: null, updatedAt: null,
});

export const createEmptyInterviewState = () => ({
  version: INTERVIEW_STATE_VERSION,
  questions: {},
  filters: { query: '', categoryId: 'all', status: 'all', favoritesOnly: false },
});

export const interviewQueueKey = (date) => `job-prep-routine:interview:queue:${date}`;
```

구현 규칙은 다음과 같다.

- 상태 후보는 일반 객체만 허용하고 문자열 필드는 문자열만, 날짜 필드는 문자열 또는 `null`만, 자신감은 정수 0~5만 보존한다. 최상위 `filters`는 검색 문자열, 카테고리 문자열, 허용 상태 또는 `all`, 즐겨찾기 boolean만 정규화한다.
- `updateQuestionState()`는 질문 하나의 정규화된 병합본과 ISO `updatedAt`을 새 객체로 반환하며 입력과 다른 질문 객체를 변경하지 않는다.
- `resetQuestionState()`는 대상 ID만 삭제해 기본 상태로 되돌린다.
- `setQueuePinned()`은 현재 고정 개수를 세고 5개일 때 새 고정을 `RangeError('오늘의 큐 고정은 최대 5개입니다.')`로 거부한다.
- 검색 비교에서만 `trim().replace(/\s+/gu, ' ').toLocaleLowerCase('ko-KR')`를 사용해 원본의 연속 공백을 검색 가능하게 만들고, 표시 제목은 원문 그대로 보존한다. 카테고리·상태·즐겨찾기는 AND 조건이며 결과는 원본 `order` 순이다.
- 통계에서 상태 객체가 없는 질문은 `unseen`으로 계산한다.
- 큐 정규화는 날짜 불일치, 알 수 없는 ID, 중복 ID, 큐에 없는 완료 ID를 제거하고 최대 5개만 보존한다.
- 추천 정렬 키는 `[고정 여부, 복습/낮은 자신감 여부, 미학습 여부, lastStudiedAt 오름차순, order]`다. 각 단계는 앞 단계가 같은 경우에만 다음 단계로 비교한다.
- 저장된 같은 날짜 큐가 존재하면 유효 ID만 정리한 뒤 그대로 사용하고, 저장값이 없거나 날짜가 다를 때만 추천으로 채운다.
- 교체는 고정되지 않았고 완료되지 않은 대상만 허용하며 현재 큐를 제외한 다음 추천 후보를 같은 자리에 넣는다. 후보가 없으면 `RangeError`를 던진다.
- 직접 추가는 중복이면 그대로 반환한다. 5개 미만이면 끝에 추가하고, 가득 찼으면 뒤에서부터 고정·완료가 아닌 첫 항목을 교체한다. 교체 가능 항목이 없으면 `RangeError`를 던진다.
- 완료·취소는 큐 구성 순서를 바꾸지 않고 `completedIds`만 갱신한다.
- 모든 큐 변경은 유효한 ISO `updatedAt`을 기록하고 입력 큐를 변경하지 않는다.

- [ ] **Step 5: Add syntax check and run focused tests**

`package.json`의 `check`에 `node --check src/interview-core.js`를 추가한다.

Run: `node --test tests/interview-core.test.mjs && npm run check`

Expected: every interview core test PASS and syntax checks exit 0.

- [ ] **Step 6: Commit Task 2**

```bash
git add src/interview-core.js tests/interview-core.test.mjs package.json
git commit -m "feat: 면접 학습 상태와 오늘의 큐 코어를 추가"
```

---

### Task 3: 안전한 면접 전용 저장 어댑터

**Files:**
- Create: `src/interview-storage.js`
- Create: `tests/interview-storage.test.mjs`
- Modify: `package.json`

**Interfaces:**
- Consumes: `INTERVIEW_STATE_KEY`, `interviewQueueKey()`, `normalizeInterviewState()`, `normalizeInterviewQueue()`
- Produces: `loadInterviewState(storage, validIds)`, `saveInterviewState(storage, state, validIds)`, `loadInterviewQueue(storage, date, validIds)`, `saveInterviewQueue(storage, queue, date, validIds)`

- [ ] **Step 1: Write failing storage recovery and non-loss tests**

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { INTERVIEW_STATE_KEY, interviewQueueKey } from '../src/interview-core.js';
import {
  loadInterviewQueue,
  loadInterviewState,
  saveInterviewQueue,
  saveInterviewState,
} from '../src/interview-storage.js';

function memoryStorage(entries = {}) {
  const values = new Map(Object.entries(entries));
  return {
    getItem: (key) => values.get(key) ?? null,
    setItem: (key, value) => values.set(key, value),
    snapshot: () => Object.fromEntries(values),
  };
}

test('손상 JSON은 페이지를 중단시키지 않고 기본 상태로 복구한다', () => {
  const storage = memoryStorage({ [INTERVIEW_STATE_KEY]: '{broken' });
  assert.deepEqual(loadInterviewState(storage, new Set(['be-1'])), {
    version: 1,
    questions: {},
    filters: { query: '', categoryId: 'all', status: 'all', favoritesOnly: false },
  });
});

test('면접 질문 저장은 기존 루틴 키와 다른 질문을 보존한다', () => {
  const storage = memoryStorage({
    'job-prep-routine:daily:2026-07-20': '{"checkedIds":["x"]}',
    [INTERVIEW_STATE_KEY]: JSON.stringify({ version: 1, questions: { 'be-2': { answer: '보존' } } }),
  });
  const state = loadInterviewState(storage, new Set(['be-1', 'be-2']));
  state.questions['be-1'] = { status: 'studying', answer: '새 답변' };
  saveInterviewState(storage, state, new Set(['be-1', 'be-2']));
  const snapshot = storage.snapshot();
  assert.equal(snapshot['job-prep-routine:daily:2026-07-20'], '{"checkedIds":["x"]}');
  assert.equal(JSON.parse(snapshot[INTERVIEW_STATE_KEY]).questions['be-2'].answer, '보존');
});

test('날짜별 큐는 해당 키만 읽고 정규화해 저장한다', () => {
  const date = '2026-07-20';
  const storage = memoryStorage({
    [interviewQueueKey(date)]: JSON.stringify({ date, ids: ['be-1', 'be-1', 'bad'], completedIds: ['bad'] }),
  });
  const queue = loadInterviewQueue(storage, date, new Set(['be-1']));
  assert.deepEqual(queue.ids, ['be-1']);
  assert.deepEqual(queue.completedIds, []);
  saveInterviewQueue(storage, queue, date, new Set(['be-1']));
  assert.equal(JSON.parse(storage.snapshot()[interviewQueueKey(date)]).date, date);
});

test('저장소 오류는 호출자가 표시할 수 있도록 다시 던진다', () => {
  const storage = { getItem: () => null, setItem: () => { throw new Error('quota'); } };
  assert.throws(() => saveInterviewState(storage, { version: 1, questions: {} }, new Set()), /quota/);
});
```

- [ ] **Step 2: Run the focused test and verify RED**

Run: `node --test tests/interview-storage.test.mjs`

Expected: FAIL because `src/interview-storage.js` does not exist.

- [ ] **Step 3: Implement the storage adapter**

```js
import {
  INTERVIEW_STATE_KEY,
  interviewQueueKey,
  normalizeInterviewQueue,
  normalizeInterviewState,
} from './interview-core.js';

function parseJson(raw) {
  if (typeof raw !== 'string' || !raw) return null;
  try { return JSON.parse(raw); } catch { return null; }
}

export function loadInterviewState(storage, validIds) {
  return normalizeInterviewState(parseJson(storage.getItem(INTERVIEW_STATE_KEY)), validIds);
}

export function saveInterviewState(storage, state, validIds) {
  const normalized = normalizeInterviewState(state, validIds);
  storage.setItem(INTERVIEW_STATE_KEY, JSON.stringify(normalized));
  return normalized;
}

export function loadInterviewQueue(storage, date, validIds) {
  return normalizeInterviewQueue(parseJson(storage.getItem(interviewQueueKey(date))), date, validIds);
}

export function saveInterviewQueue(storage, queue, date, validIds) {
  const normalized = normalizeInterviewQueue(queue, date, validIds);
  storage.setItem(interviewQueueKey(date), JSON.stringify(normalized));
  return normalized;
}
```

- [ ] **Step 4: Add syntax check and run focused tests**

`package.json`의 `check`에 `node --check src/interview-storage.js`를 추가한다.

Run: `node --test tests/interview-storage.test.mjs && npm run check`

Expected: 4 storage tests PASS and syntax checks exit 0.

- [ ] **Step 5: Commit Task 3**

```bash
git add src/interview-storage.js tests/interview-storage.test.mjs package.json
git commit -m "feat: 면접 학습 저장 어댑터를 추가"
```

---

### Task 4: 홈·목록·상세 페이지 골격과 반응형·인쇄 스타일

**Files:**
- Modify: `index.html`
- Create: `templates.html`
- Create: `template.html`
- Modify: `assets/routine.css`
- Create: `tests/interview-contract.test.mjs`
- Modify: `tests/print-contract.test.mjs`
- Modify: `tests/history-contract.test.mjs`

**Interfaces:**
- Produces DOM IDs consumed by Tasks 5–6: `templates-page`, `interview-stats`, `interview-queue`, `interview-search`, `interview-category-filters`, `interview-status-filter`, `interview-favorites-only`, `interview-results-count`, `interview-list`, `interview-live`, `template-detail-page`, `interview-detail`, `interview-invalid`, `detail-status`, `detail-confidence`, `detail-favorite`, `detail-pinned`, `detail-answer`, `detail-keywords`, `detail-memo`, `detail-last-studied`, `detail-print-values`, `detail-live`
- Consumes: existing `.app-shell`, `.daily-paper`, `.screen-only`, `.print-only`, button and focus-ring styles

- [ ] **Step 1: Write failing page and print contract tests**

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const home = await readFile(new URL('../index.html', import.meta.url), 'utf8');
const list = await readFile(new URL('../templates.html', import.meta.url), 'utf8').catch(() => '');
const detail = await readFile(new URL('../template.html', import.meta.url), 'utf8').catch(() => '');
const css = await readFile(new URL('../assets/routine.css', import.meta.url), 'utf8');

test('홈에 전체 너비의 다섯 번째 백엔드 면접 진입 카드를 둔다', () => {
  assert.match(home, /href="\.\/templates\.html"/);
  assert.match(home, /백엔드 면접 학습/);
  assert.match(home, /백엔드 152문항/);
  assert.match(css, /\.home-board-card--interview/);
});

test('목록 페이지에 요약·오늘의 큐·복합 필터·세로 목록 골격이 있다', () => {
  for (const id of ['templates-page', 'interview-stats', 'interview-queue', 'interview-search', 'interview-category-filters', 'interview-status-filter', 'interview-favorites-only', 'interview-results-count', 'interview-list', 'interview-live']) {
    assert.match(list, new RegExp(`id="${id}"`));
  }
  assert.match(list, /type="module" src="\.\/src\/templates-app\.js"/);
  assert.match(list, /aria-live="polite"/);
});

test('상세 페이지에 편집·출처·이동·인쇄·오류 골격이 있다', () => {
  for (const id of ['template-detail-page', 'interview-detail', 'interview-invalid', 'detail-status', 'detail-confidence', 'detail-favorite', 'detail-pinned', 'detail-answer', 'detail-keywords', 'detail-memo', 'detail-last-studied', 'detail-print-values', 'detail-live']) {
    assert.match(detail, new RegExp(`id="${id}"`));
  }
  assert.match(detail, /type="module" src="\.\/src\/template-detail-app\.js"/);
  assert.match(detail, /rel="noopener noreferrer"/);
});

test('면접 카탈로그는 세로 목록·모바일 한 열·상세 인쇄 규칙을 가진다', () => {
  assert.match(css, /\.interview-question-list\s*\{[^}]*display:\s*grid/s);
  assert.match(css, /@media[^}]*max-width:[^}]*\{[\s\S]*\.interview-queue-list[^}]*grid-template-columns:\s*1fr/);
  assert.match(css, /@media print[\s\S]*\.interview-detail-controls[^}]*display:\s*none/);
  assert.match(css, /@media print[\s\S]*#detail-print-values[^}]*display:\s*block/);
});
```

`tests/print-contract.test.mjs`에도 `.interview-detail-controls`, `.interview-save-status`, `.interview-reset`, `#detail-print-values`의 숨김/표시 선언 검증을 추가한다.

`tests/history-contract.test.mjs`의 홈 카드 개수 기대값은 4에서 5로 바꾸되, 기록·분석이 여전히 네 번째 카드라는 제목·링크 검증은 유지한다. `tests/print-contract.test.mjs`의 홈 링크 목록에는 `['./templates.html', '백엔드 면접 학습']`을 추가하고 테스트 이름을 `다섯 보드`로 바꾼다.

- [ ] **Step 2: Run contracts and verify RED**

Run: `node --test tests/interview-contract.test.mjs tests/print-contract.test.mjs`

Expected: FAIL because the new pages and selectors do not exist.

- [ ] **Step 3: Add the home entry card without changing the first four cards**

`index.html`의 기존 네 카드 뒤에 다음 카드를 추가한다.

```html
<a class="home-board-card home-board-card--interview" href="./templates.html">
  <span class="home-board-step">05</span>
  <strong>백엔드 면접 학습</strong>
  <span>백엔드 152문항을 카테고리로 찾고, 개인 답변과 오늘의 면접 큐를 관리합니다.</span>
  <em>면접 학습 열기 →</em>
</a>
```

- [ ] **Step 4: Build accessible list and detail HTML shells**

`templates.html`은 `main#templates-page` 안에 헤더, 네 칸 KPI `#interview-stats`, `#interview-queue`, 검색 label/input, 카테고리 버튼 컨테이너, 상태 select, 즐겨찾기 button, 결과 수와 세로 목록, 빈 결과, `#interview-live[aria-live=polite]`를 이 순서로 둔다.

`template.html`은 `main#template-detail-page` 안에 목록 이동, `section#interview-invalid[hidden]`, `article#interview-detail[hidden]`, 질문 헤더, 상태 select, 자신감 select, 즐겨찾기·고정 button, 답변 textarea, 키워드 input, 메모 textarea, 마지막 학습일, 오늘 완료, GitHub 출처 link, 이전·다음, PDF 미리보기, 현재 질문 초기화, `#detail-print-values.print-only`, `#detail-live[aria-live=polite]`를 둔다. 모든 입력은 `<label for>`로 연결하고 토글은 초기 `aria-pressed="false"`를 가진다.

- [ ] **Step 5: Add scoped list, detail, mobile, and print CSS**

다음 레이아웃 계약을 기존 색상 토큰과 포커스 링을 이용해 구현한다.

```css
.home-board-card--interview { grid-column: 1 / -1; }
.interview-stats { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 0.75rem; }
.interview-queue-list { display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); gap: 0.75rem; }
.interview-question-list { display: grid; gap: 0.7rem; }
.interview-question-row { display: grid; grid-template-columns: auto minmax(0, 1fr) auto; align-items: center; }
.interview-detail-fields { display: grid; gap: 1rem; }
@media (max-width: 760px) {
  .interview-stats { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .interview-queue-list, .interview-question-row { grid-template-columns: 1fr; }
}
```

기존 `@media print` 안에서는 `.interview-detail-controls`, `.interview-save-status`, `.interview-reset`을 숨기고 `#detail-print-values`를 block으로 표시하며 `#interview-detail`을 한 문항 A4 흐름으로 유지한다.

- [ ] **Step 6: Run page and print contracts**

Run: `node --test tests/interview-contract.test.mjs tests/print-contract.test.mjs`

Expected: all new and existing contract tests PASS.

- [ ] **Step 7: Commit Task 4**

```bash
git add index.html templates.html template.html assets/routine.css tests/interview-contract.test.mjs tests/print-contract.test.mjs tests/history-contract.test.mjs
git commit -m "feat: 면접 학습 목록과 상세 화면 골격을 추가"
```

---

### Task 5: 학습 카탈로그와 오늘의 큐 목록 앱

**Files:**
- Create: `src/templates-app.js`
- Create: `tests/templates-app.test.mjs`
- Modify: `package.json`

**Interfaces:**
- Consumes: all exports from `interview-data.js`, queue/filter/stat functions from `interview-core.js`, state/queue adapters from `interview-storage.js`, `logicalDateString()` and `scheduleLogicalDayRollover()` from `routine-core.js`
- Produces: `statusLabel(status)`, `renderInterviewStats(root, stats)`, `renderInterviewQueue(root, context)`, `renderInterviewList(root, context)`, `initTemplatesPage(root, options)`

- [ ] **Step 1: Write failing render and initialization tests**

`tests/templates-app.test.mjs`는 기존 앱 테스트의 작은 fake document 패턴을 재사용해 다음을 검증한다.

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { statusLabel } from '../src/templates-app.js';

test('면접 상태를 일관된 한국어로 표시한다', () => {
  assert.deepEqual(
    ['unseen', 'studying', 'review', 'done'].map(statusLabel),
    ['미학습', '학습 중', '복습 필요', '완료'],
  );
});
```

DOM fixture에는 필터 버튼과 목록 컨테이너를 만들고 `initTemplatesPage()`에 메모리 저장소와 고정된 `now()`를 주입한다. 초기화 뒤 전체 152개 행, 카테고리 버튼 9개, 큐 5개, `오늘 0 / 5 완료`가 렌더링되는지 검증한다. 검색 input에 `redis`, 상태 select에 `review`, 즐겨찾기 토글을 순서대로 발생시켜 결과 수가 복합 조건에 맞게 변하는지도 검증한다.

- [ ] **Step 2: Run focused test and verify RED**

Run: `node --test tests/templates-app.test.mjs`

Expected: FAIL because `src/templates-app.js` does not exist.

- [ ] **Step 3: Implement list rendering and injected initialization**

`initTemplatesPage(root = document, options = {})`는 다음 의존성을 주입 가능하게 한다.

```js
const view = options.view ?? window;
const storage = options.storage ?? view.localStorage;
const now = options.now ?? (() => new Date());
const date = logicalDateString(now());
```

초기화와 이벤트 규칙은 다음과 같다.

- 질문 ID Set으로 상태와 날짜별 큐를 읽고, 큐가 없으면 `ensureDailyQueue()`로 만든 뒤 즉시 저장한다.
- 카테고리 버튼은 전체와 원본 8개를 렌더링하고 `aria-pressed`를 동기화한다.
- 필터 상태 `{ query: '', categoryId: 'all', status: 'all', favoritesOnly: false }`는 면접 상태의 최상위 `filters`에서 복원한다. 현재 데이터에 없는 카테고리는 `all`로 바꾸고, 변경 때마다 같은 면접 상태 키에 저장한 뒤 목록만 다시 렌더링한다.
- 각 질문 행은 번호, 상세 링크, 카테고리, 상태, 자신감(`미선택` 또는 `N / 5`), 즐겨찾기 표시, `오늘의 큐에 추가` 버튼을 가진다.
- 큐 카드는 카테고리·제목·상태·상세 링크, 고정 토글, 교체, 오늘 완료/취소를 제공한다. 완료된 카드는 완료 클래스를 가진다. 새 고정은 해당 문항이 오늘 큐에 없으면 직접 추가 규칙으로 현재 큐에도 반영하고, 실패하면 상태와 큐를 모두 직전 값으로 유지한다.
- 교체는 고정·완료 카드에서 disabled이고, 코어 `RangeError`는 큐를 유지한 채 live region에 이유를 알린다.
- 큐 완료 시 `setQueueCompleted()`와 함께 대상 질문의 `lastStudiedAt`만 현재 ISO로 갱신한다. 취소는 큐 완료만 취소하고 과거 `lastStudiedAt`은 되돌리지 않는다.
- 카탈로그 직접 추가는 코어 규칙으로 큐를 저장하고 성공/실패를 live region에 알린다.
- 저장 실패는 화면 상태와 입력을 유지하고 `저장하지 못했습니다. 브라우저 저장 공간을 확인해 주세요.`를 알린다.
- `scheduleLogicalDayRollover(view, date, now)`로 오전 2시 날짜 변경 시 기존 방식대로 새로고침한다.
- 모듈 최하단은 `if (typeof document !== 'undefined') initTemplatesPage(document);`로 브라우저에서만 자동 실행한다.

- [ ] **Step 4: Add syntax check and run focused tests**

`package.json`의 `check`에 `node --check src/templates-app.js`를 추가한다.

Run: `node --test tests/templates-app.test.mjs && npm run check`

Expected: list app tests PASS and syntax checks exit 0.

- [ ] **Step 5: Commit Task 5**

```bash
git add src/templates-app.js tests/templates-app.test.mjs package.json
git commit -m "feat: 면접 카탈로그와 오늘의 큐를 연결"
```

---

### Task 6: 문항 상세 자동 저장·이동·인쇄 앱

**Files:**
- Create: `src/template-detail-app.js`
- Create: `tests/template-detail-app.test.mjs`
- Modify: `package.json`

**Interfaces:**
- Consumes: `getInterviewQuestion()`, `INTERVIEW_QUESTIONS`, state/queue functions and storage adapters, `logicalDateString()` and `scheduleLogicalDayRollover()`
- Produces: `questionIdFromLocation(location)`, `previousNextQuestions(question, questions)`, `formatLastStudied(value)`, `collectQuestionPatch(root)`, `syncDetailPrintValues(root, question, questionState)`, `initTemplateDetailPage(root, options)`

- [ ] **Step 1: Write failing URL, navigation, and formatting tests**

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { INTERVIEW_QUESTIONS } from '../src/interview-data.js';
import {
  formatLastStudied,
  previousNextQuestions,
  questionIdFromLocation,
} from '../src/template-detail-app.js';

test('상세 URL에서 질문 ID를 정확히 읽는다', () => {
  assert.equal(questionIdFromLocation({ search: '?id=be-42' }), 'be-42');
  assert.equal(questionIdFromLocation({ search: '?id=' }), '');
});

test('이전·다음은 필터와 무관하게 원본 순서를 따른다', () => {
  const current = INTERVIEW_QUESTIONS[1];
  const adjacent = previousNextQuestions(current, INTERVIEW_QUESTIONS);
  assert.equal(adjacent.previous.id, INTERVIEW_QUESTIONS[0].id);
  assert.equal(adjacent.next.id, INTERVIEW_QUESTIONS[2].id);
  assert.equal(previousNextQuestions(INTERVIEW_QUESTIONS[0], INTERVIEW_QUESTIONS).previous, null);
});

test('마지막 학습일이 없으면 명확한 기본 문구를 표시한다', () => {
  assert.equal(formatLastStudied(null), '아직 학습 기록이 없습니다.');
  assert.match(formatLastStudied('2026-07-20T01:00:00.000Z'), /2026/);
});
```

DOM fixture 테스트에서는 유효한 `?id=be-1` 초기화 후 저장된 답변·상태·자신감이 필드와 `#detail-print-values`에 동시에 복원되는지, input/change 이벤트 뒤 상태 키에 자동 저장되는지, 잘못된 `?id=be-999`에서는 편집 화면이 숨고 오류 안내만 보이는지 검증한다.

- [ ] **Step 2: Run focused test and verify RED**

Run: `node --test tests/template-detail-app.test.mjs`

Expected: FAIL because `src/template-detail-app.js` does not exist.

- [ ] **Step 3: Implement detail initialization and immediate save**

상세 앱은 다음 규칙을 구현한다.

- URL ID가 유효하지 않으면 `#interview-detail`을 숨기고 `#interview-invalid`를 표시하며 어떤 저장도 만들지 않는다.
- 유효하면 번호·제목·카테고리·출처 URL, 상태, 자신감, 즐겨찾기, 고정, 답변, 키워드, 메모, 마지막 학습일, 이전·다음 링크를 채운다.
- 상태·자신감·즐겨찾기·고정은 `change` 또는 `click`, 텍스트 필드는 `input`마다 현재 질문만 `updateQuestionState()`로 병합하고 저장한다.
- 여섯 번째 고정 실패는 버튼 상태를 원래대로 유지하고 live region에 최대 5개 안내를 표시한다. 새 고정 문항이 오늘 큐에 없으면 직접 추가 규칙으로 큐에도 넣고, 큐 추가 실패 시 질문 상태와 큐를 모두 직전 값으로 유지한다.
- 오늘 완료는 날짜별 큐에 질문이 없으면 먼저 `addQuestionToQueue()`로 넣고, `setQueueCompleted()`와 질문 `lastStudiedAt`을 저장한다. 다시 누르면 큐 완료만 취소한다.
- 질문 초기화는 `view.confirm('이 질문의 답변과 학습 기록을 초기화할까요?')`가 true일 때만 `resetQuestionState()`를 저장하고 현재 필드를 기본값으로 다시 렌더링한다.
- PDF 미리보기는 인쇄용 읽기 전용 값을 최신화한 뒤 `view.print()`를 호출한다.
- `syncDetailPrintValues()`는 질문, 카테고리, 상태, 자신감, 답변, 키워드, 메모, 마지막 학습일, 출처 URL을 text node로만 렌더링한다.
- 저장 성공은 `저장됨`, 실패는 `저장하지 못했습니다. 작성 중인 내용은 화면에 유지됩니다.`를 `#detail-live`에 표시한다.
- `scheduleLogicalDayRollover()`로 논리 날짜 변경을 감시하고 브라우저에서만 자동 초기화한다.

- [ ] **Step 4: Add syntax check and run focused tests**

`package.json`의 `check`에 `node --check src/template-detail-app.js`를 추가한다.

Run: `node --test tests/template-detail-app.test.mjs && npm run check`

Expected: detail app tests PASS and syntax checks exit 0.

- [ ] **Step 5: Commit Task 6**

```bash
git add src/template-detail-app.js tests/template-detail-app.test.mjs package.json
git commit -m "feat: 면접 질문 상세 기록과 인쇄를 연결"
```

---

### Task 7: 실제 브라우저 흐름·회귀·실행 패키지 검증

**Files:**
- Create: `tests/interview-browser.test.mjs`
- Modify: `tests/browser-chrome.test.mjs`
- Modify: `tests/date-boundary-contract.test.mjs`
- Modify: `tests/export-pdf-safety.test.mjs` only if the existing package manifest explicitly enumerates HTML assets
- Copy after validation: changed runtime files to `/Users/minsujeong/Documents/Codex/2026-07-16/wl/outputs/취업준비-루틴-보드`

**Interfaces:**
- Consumes: completed list/detail pages, browser storage keys, common `resolveChromeBin()` helper
- Produces: end-to-end evidence for list/detail persistence, queue stability, invalid IDs, print behavior, and unchanged existing artifacts

- [ ] **Step 1: Write the failing browser journey**

`tests/interview-browser.test.mjs`는 기존 `daily-browser.test.mjs`의 정적 서버·CDP lifecycle과 `tests/helpers/chrome-bin.mjs`를 재사용해 다음 한 흐름을 검증한다.

```js
test('면접 목록과 상세가 같은 상태·오늘의 큐를 저장하고 복원한다', { timeout: 45_000 }, async () => {
  // 1. templates.html을 열어 문항 152개, 카테고리 9개, 큐 5개를 확인한다.
  // 2. 검색과 카테고리 필터를 동시에 적용해 결과 수와 aria-pressed를 확인한다.
  // 3. 첫 질문을 큐에 직접 넣고 상세 template.html?id=<id>로 이동한다.
  // 4. 상태=복습 필요, 자신감=2, 즐겨찾기, 개인 답변·키워드·메모를 입력한다.
  // 5. 오늘 완료를 누른 뒤 새로고침해 모든 값과 완료 상태가 복원되는지 확인한다.
  // 6. 목록으로 돌아가 KPI·행 상태·큐 완료 수가 같은 저장값을 반영하는지 확인한다.
  // 7. window.print를 spy로 바꿔 PDF 미리보기가 한 번 호출되고 읽기 전용 값이 최신인지 확인한다.
});
```

주석의 각 단계는 기존 CDP `Runtime.evaluate`와 `assert`로 실제 구현하고, `template.html?id=be-999`를 열어 오류 안내와 편집 화면 숨김을 검증하는 별도 테스트를 추가한다.

- [ ] **Step 2: Register the new browser test in the shared resolver contract**

`tests/browser-chrome.test.mjs`의 예상 파일 배열을 다음처럼 바꾼다.

```js
assert.deepEqual(filenames, [
  'daily-browser.test.mjs',
  'interview-browser.test.mjs',
  'roadmap-browser.test.mjs',
  'weekly-browser.test.mjs',
]);
```

- [ ] **Step 3: Run the new browser test and fix only observed failures**

Run: `node --test tests/interview-browser.test.mjs tests/browser-chrome.test.mjs`

Expected: all interview browser journeys and resolver contracts PASS.

`tests/date-boundary-contract.test.mjs`에는 두 새 앱이 `logicalDateString()`과 `scheduleLogicalDayRollover()`를 공통 사용한다는 정적 계약을 추가한다.

```js
const templatesApp = await readFile(new URL('../src/templates-app.js', import.meta.url), 'utf8');
const templateDetailApp = await readFile(new URL('../src/template-detail-app.js', import.meta.url), 'utf8');

test('면접 목록과 상세도 오전 2시 논리 날짜로 열리고 경계에서 갱신된다', () => {
  for (const source of [templatesApp, templateDetailApp]) {
    assert.match(source, /logicalDateString/);
    assert.match(source, /scheduleLogicalDayRollover/);
  }
});
```

- [ ] **Step 4: Run the full automated suite**

Run: `npm test`

Expected: all existing and new tests PASS with 0 failures.

Run: `npm run check`

Expected: all JavaScript syntax checks exit 0.

- [ ] **Step 5: Verify canonical artifacts and unrelated storage contracts remain unchanged**

Run: `git diff --exit-code HEAD -- output/pdf/취업준비-운영-로드맵.pdf`

Expected: exit 0.

Run: `node --test tests/pdf-artifact.test.mjs tests/export-pdf-safety.test.mjs tests/date-boundary-contract.test.mjs tests/history-core.test.mjs`

Expected: all regression tests PASS.

- [ ] **Step 6: Commit Task 7**

```bash
git add tests/interview-browser.test.mjs tests/browser-chrome.test.mjs tests/date-boundary-contract.test.mjs tests/export-pdf-safety.test.mjs
git commit -m "test: 면접 학습 브라우저 흐름을 검증"
```

- [ ] **Step 7: Synchronize the validated static runtime package**

검증된 다음 파일만 동일 상대 경로로 실행 패키지에 복사한다.

```text
index.html
templates.html
template.html
assets/routine.css
src/interview-data.js
src/interview-core.js
src/interview-storage.js
src/templates-app.js
src/template-detail-app.js
```

복사 뒤 저장소 파일과 실행 패키지 파일 각각에 `cmp`를 실행해 모두 동일함을 확인한다. 기존 PDF와 다른 HTML/JS 파일은 덮어쓰지 않는다.

- [ ] **Step 8: Verify both new pages through the retained local server**

Run: `curl -I http://127.0.0.1:8787/templates.html`

Expected: `HTTP/1.0 200 OK`.

Run: `curl -I 'http://127.0.0.1:8787/template.html?id=be-1'`

Expected: `HTTP/1.0 200 OK`.

- [ ] **Step 9: Final clean-tree and scope review**

Run: `git status --short --branch`

Expected: branch `codex/job-prep-routine` with no uncommitted project changes.

Review: no answer body was copied, no frontend question exists, no login/DB/deploy code was added, existing four home cards remain in their original order, and the local server session remains running.
