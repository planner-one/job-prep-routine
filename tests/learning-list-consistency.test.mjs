import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const root = new URL('../', import.meta.url);
const [contents, quizzes, templates, css] = await Promise.all([
  readFile(new URL('contents.html', root), 'utf8'),
  readFile(new URL('quizzes.html', root), 'utf8'),
  readFile(new URL('templates.html', root), 'utf8'),
  readFile(new URL('assets/learning-lists.css', root), 'utf8'),
]);

const learningPages = [contents, quizzes, templates];

test('읽기·퀴즈·면접 목록은 동일한 3단 학습 페이지 골격을 사용한다', () => {
  for (const html of learningPages) {
    assert.match(html, /href="\.\/assets\/learning-lists\.css\?v=7"/u);
    for (const className of [
      'learning-list-page',
      'learning-dashboard',
      'learning-list-hero',
      'learning-mode-switch',
      'learning-stats',
      'learning-today-section',
      'learning-section-heading',
      'learning-today-list',
      'learning-catalog',
      'learning-filters',
      'learning-results-heading',
      'learning-card-grid',
    ]) {
      assert.match(html, new RegExp(`class="[^"]*\\b${className}\\b`, 'u'));
    }
    assert.match(html, /class="[^"]*\breader-learning-overview\b[^"]*\blearning-dashboard\b/u);
    assert.match(html, /class="[^"]*\breader-hero\b[^"]*\blearning-list-hero\b/u);
    assert.match(html, /class="[^"]*\breader-hero-copy\b/u);
    assert.match(html, /class="reader-hero-description"/u);
    assert.match(html, /class="[^"]*\breader-mode-switch\b[^"]*\blearning-mode-switch\b/u);
    assert.match(html, /class="[^"]*\breader-list-stats\b[^"]*\blearning-stats\b/u);
    assert.equal((html.match(/class="[^"]*learning-mode-switch[^"]*"[\s\S]*?<\/nav>/u)?.[0].match(/<a /gu) ?? []).length, 3);
    assert.doesNotMatch(html, /href="\.\/study-history\.html"/u);
  }
});

test('읽기와 면접 카테고리는 결과 영역 오른쪽의 독립 패널을 사용한다', () => {
  const readingResultsIndex = contents.indexOf('class="reader-file-area"');
  const readingCategoryIndex = contents.indexOf('class="reader-category-panel learning-category-panel learning-category-sidebar');
  const interviewResultsIndex = templates.indexOf('class="interview-results-area"');
  const interviewCategoryIndex = templates.indexOf('class="reader-category-panel interview-category-panel learning-category-panel learning-category-sidebar');

  assert.match(contents, /class="reader-browser learning-catalog-layout"/u);
  assert.match(templates, /class="interview-catalog-layout learning-catalog-layout"/u);
  assert.ok(readingResultsIndex < readingCategoryIndex);
  assert.ok(interviewResultsIndex < interviewCategoryIndex);
  assert.doesNotMatch(quizzes, /learning-category-sidebar/u);
  assert.match(css, /\.learning-catalog-layout\s*\{[\s\S]*grid-template-columns:\s*minmax\(0,\s*1fr\)\s*240px/u);
  assert.match(css, /\.learning-category-sidebar\s*\{[\s\S]*position:\s*sticky\s*!important/u);
  assert.match(css, /\.learning-catalog-layout \.learning-card-grid\s*\{[\s\S]*grid-template-columns:\s*1fr/u);
  assert.match(css, /@media \(max-width:\s*900px\)[\s\S]*\.learning-catalog-layout\s*\{[\s\S]*grid-template-columns:\s*1fr/u);
});

test('오늘 카드와 전체 목록 카드는 공통 너비·높이·반응형 비율을 사용한다', () => {
  assert.match(css, /\.learning-list-page\s*\{[\s\S]*width:\s*min\(1180px,/u);
  assert.match(css, /\.learning-dashboard\s*\{[\s\S]*min-height:\s*160px/u);
  assert.match(css, /\.learning-list-hero\s*\{[\s\S]*min-height:\s*84px/u);
  assert.match(css, /\.learning-today-list\s*\{[\s\S]*grid-template-columns:\s*repeat\(5,/u);
  assert.match(css, /\.learning-today-list\s*\{[\s\S]*grid-auto-flow:\s*row\s*!important/u);
  assert.match(css, /\.learning-today-list\s*\{[\s\S]*overflow-x:\s*visible\s*!important/u);
  assert.match(css, /\.learning-today-list > \.reader-today-item,[\s\S]*min-height:\s*185px/u);
  assert.match(css, /\.learning-card-grid\s*\{[\s\S]*grid-template-columns:\s*repeat\(2,/u);
  assert.match(css, /\.learning-card-grid > \.reader-file-row,[\s\S]*min-height:\s*125px/u);
  assert.match(css, /@media \(max-width:\s*760px\)[\s\S]*\.learning-card-grid\s*\{[\s\S]*grid-template-columns:\s*1fr/u);
  assert.match(css, /@media \(max-width:\s*760px\)[\s\S]*\.learning-card-grid > \.reader-file-row,[\s\S]*min-height:\s*138px/u);
  assert.match(css, /@media \(max-width:\s*760px\)[\s\S]*\.learning-dashboard\s*\{[\s\S]*min-height:\s*234px/u);
  assert.match(css, /@media \(max-width:\s*760px\)[\s\S]*\.learning-list-hero\s*\{[\s\S]*min-height:\s*159px/u);
  assert.match(css, /@media \(max-width:\s*520px\)[\s\S]*\.learning-today-list\s*\{[\s\S]*grid-template-columns:\s*1fr/u);
  assert.match(css, /@media \(max-width:\s*520px\)[\s\S]*\.learning-today-list > \.reader-today-item,[\s\S]*min-height:\s*165px/u);
});
