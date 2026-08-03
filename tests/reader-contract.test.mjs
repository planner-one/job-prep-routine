import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const list = await readFile(new URL('../contents.html', import.meta.url), 'utf8');
const detail = await readFile(new URL('../content.html', import.meta.url), 'utf8');
const listApp = await readFile(new URL('../src/contents-app.js', import.meta.url), 'utf8');
const detailApp = await readFile(new URL('../src/content-app.js', import.meta.url), 'utf8');
const css = await readFile(new URL('../assets/routine.css', import.meta.url), 'utf8');
const readerCss = await readFile(new URL('../assets/reader.css', import.meta.url), 'utf8');
const learningCss = await readFile(new URL('../assets/learning-lists.css', import.meta.url), 'utf8');

test('GitHub형 목록은 오늘 목록·카테고리·검색·읽기 상태를 한 화면에 둔다', () => {
  for (const id of [
    'reader-main',
    'reading-date',
    'reading-today-progress',
    'reading-today-list',
    'reading-category-list',
    'reading-search',
    'reading-progress-filter',
    'reading-page-size',
    'reading-results-count',
    'reading-list',
    'reading-pagination',
    'reading-live',
  ]) {
    assert.match(list, new RegExp(`id="${id}"`));
  }
  assert.match(list, /maeil-mail\s*<\/a>\s*<span>\/</u);
  assert.match(list, /maeil-mail-contents/);
  assert.match(list, /backend \/ contents/i);
  assert.match(list, /읽지 않은 글부터 추천 · 자유롭게 교체/);
  assert.match(list, /오늘 읽을 글을 한눈에 확인하세요/);
  assert.doesNotMatch(list, /하루 목표|data-reading-goal|2개\s*<\/button>|3개\s*<\/button>/u);
  assert.match(list, /콘텐츠 페이지 이동/);
  assert.match(list, /src="\.\/src\/contents-app\.js\?v=5"/u);
  assert.match(listApp, /READING_PAGE_SIZES = Object\.freeze\(\[6, 10, 14\]\)/u);
  assert.match(listApp, /DEFAULT_READING_PAGE_SIZE = 6/u);
});

test('질문 아카이브는 결과 영역과 오른쪽 카테고리 패널을 분리한다', () => {
  assert.match(list, /<\/div>\s*<nav class="reader-repo-path reader-source-path"[\s\S]*maeil-mail-contents/u);
  const filterIndex = list.indexOf('reader-file-toolbar learning-filters');
  const resultsIndex = list.indexOf('reader-repository-meta learning-results-heading');
  const cardsIndex = list.indexOf('reader-file-list learning-card-grid');
  const categoryIndex = list.indexOf('reader-category-panel learning-category-panel learning-category-sidebar');
  assert.ok(filterIndex < resultsIndex);
  assert.ok(resultsIndex < cardsIndex);
  assert.ok(cardsIndex < categoryIndex);
  assert.match(list, /class="reader-browser learning-catalog-layout"/u);
  assert.match(learningCss, /\.learning-catalog-layout\s*\{[\s\S]*grid-template-columns:\s*minmax\(0,\s*1fr\)\s*240px/u);
  assert.match(learningCss, /\.learning-catalog-layout \.learning-card-grid\s*\{[\s\S]*grid-template-columns:\s*1fr/u);
  assert.match(learningCss, /\.learning-category-sidebar nav,[\s\S]*display:\s*grid/u);
});

test('학습 헤더와 오늘 질문은 크기가 통일된 독립 공통 카드로 배치한다', () => {
  assert.match(list, /class="reader-learning-overview learning-dashboard"[\s\S]*class="reader-hero learning-list-hero"/u);
  assert.match(list, /class="reader-today learning-today-section"/u);
  assert.ok(
    list.indexOf('reader-learning-overview learning-dashboard') < list.indexOf('reader-today learning-today-section'),
  );
  assert.match(
    list,
    /class="reader-today-summary"[\s\S]*읽지 않은 글부터 추천 · 자유롭게 교체[\s\S]*id="reading-today-progress"/u,
  );
  assert.match(learningCss, /\.learning-dashboard\s*\{[\s\S]*min-height:\s*160px/u);
  assert.match(learningCss, /\.learning-today-list\s*\{[\s\S]*grid-template-columns:\s*repeat\(5,/u);
  assert.match(learningCss, /\.learning-today-list > \.reader-today-item,[\s\S]*min-height:\s*185px/u);
});

test('질문 아카이브는 페이지 크기 선택과 하단 페이지 이동을 제공한다', () => {
  assert.match(list, /id="reading-page-size"[\s\S]*value="6"[\s\S]*value="10"[\s\S]*value="14"/u);
  assert.match(list, /id="reading-pagination"/u);
  assert.doesNotMatch(list, /id="reading-pagination-top"/u);
  assert.match(listApp, /READING_PAGE_SIZE_KEY/u);
  assert.match(listApp, /scrollReadingArchive/u);
});

test('읽기 카드 전체가 상세 링크이며 작업 버튼은 독립적으로 동작한다', () => {
  assert.match(readerCss, /\.reader-today-item\s*\{[\s\S]*position:\s*relative[\s\S]*cursor:\s*pointer/u);
  assert.match(readerCss, /\.reader-today-link::after\s*\{[\s\S]*position:\s*absolute[\s\S]*inset:\s*0/u);
  assert.match(readerCss, /\.reader-file-row\s*\{[\s\S]*position:\s*relative[\s\S]*cursor:\s*pointer/u);
  assert.match(readerCss, /\.reader-file-link::after\s*\{[\s\S]*position:\s*absolute[\s\S]*inset:\s*0/u);
  assert.match(readerCss, /\.reader-today-item-actions\s*\{[\s\S]*z-index:\s*2/u);
  assert.match(readerCss, /\.reader-add-button\s*\{[\s\S]*z-index:\s*2/u);
});

test('읽기 목록은 새 진입 시 필터를 초기화하고 뒤로가기 상태만 복원한다', () => {
  assert.match(listApp, /navigationType === 'back_forward'/u);
  assert.match(listApp, /DEFAULT_READING_VIEW_FILTERS/u);
  assert.match(listApp, /READING_VIEW_HISTORY_KEY/u);
  assert.match(listApp, /addEventListener\?\.\('pagehide', saveReadingView\)/u);
});

test('원문 상세는 실제 본문·목차·출처·오류 복구·인쇄 골격을 갖춘다', () => {
  for (const id of [
    'content-invalid',
    'content-detail',
    'content-title',
    'content-source-link',
    'content-mark-read',
    'content-add-today',
    'content-loading',
    'content-error',
    'content-retry',
    'content-body',
    'content-toc',
    'content-practice-link',
    'content-practice-callout-link',
    'content-read-mode',
    'content-quiz-mode',
    'content-interview-mode',
    'content-print-source',
  ]) {
    assert.match(detail, new RegExp(`id="${id}"`));
  }
  assert.match(detail, /원문 그대로 읽기/);
  assert.match(detail, /읽기만 마쳐도 괜찮습니다/);
  assert.match(detail, /이 질문으로 면접 답변 연습하기/);
  assert.match(detail, /rel="noopener noreferrer"/);
  assert.match(detail, /class="reader-detail-toolbar"[\s\S]*reader-article-path[\s\S]*reader-detail-mode-switch/u);
  assert.match(detail, /assets\/reader\.css\?v=11/u);
  assert.match(detail, /type="module" src="\.\/src\/content-app\.js\?v=2"/);
  assert.match(
    readerCss,
    /\.reader-question-hero\s*\{[\s\S]*grid-template-columns:\s*minmax\(0, 1\.6fr\) minmax\(320px, 0\.9fr\)/u,
  );
  assert.match(
    readerCss,
    /\.reader-learning-choices\s*\{[\s\S]*grid-template-rows:\s*repeat\(3, minmax\(0, 1fr\)\)[\s\S]*margin:\s*0/u,
  );
});

test('읽기 앱은 면접 큐와 분리되고 상세 직접 진입으로 오늘 목록을 만들지 않는다', () => {
  assert.match(listApp, /READING|Reading|reading/u);
  assert.doesNotMatch(listApp, /InterviewState|InterviewQueue|loadOrCreateDailyQueue|interview-storage/u);
  assert.doesNotMatch(detailApp, /ensureDailyReadingPlan|loadOrCreateDailyQueue|interview-storage/u);
  assert.match(detailApp, /template\.html\?id=/u);
  assert.match(detailApp, /loadMaeilContent/u);
  assert.match(detailApp, /markdownToSafeHtml/u);
});

test('읽기 화면은 GitHub 파일 목록과 긴 Markdown 본문을 위한 반응형·인쇄 규칙을 갖는다', () => {
  for (const selector of [
    '.reader-browser',
    '.reader-category-panel',
    '.reader-file-row',
    '.github-markdown-body',
    '.reader-toc',
    '.markdown-table-wrap',
  ]) {
    assert.match(css, new RegExp(selector.replace('.', '\\.') + '\\s*\\{'));
  }
  assert.match(css, /@media \(max-width: 640px\)[\s\S]*\.reader-file-row/u);
  assert.match(css, /@media only print[\s\S]*\.reader-print-source/u);
  assert.match(css, /\.reader-pagination\s*\{/u);
});
