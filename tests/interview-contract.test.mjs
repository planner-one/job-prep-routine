import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const home = await readFile(new URL('../index.html', import.meta.url), 'utf8');
const list = await readFile(new URL('../templates.html', import.meta.url), 'utf8').catch(() => '');
const detail = await readFile(new URL('../template.html', import.meta.url), 'utf8').catch(() => '');
const css = await readFile(new URL('../assets/routine.css', import.meta.url), 'utf8');
const interviewCss = await readFile(new URL('../assets/interview.css', import.meta.url), 'utf8');
const interviewListCss = await readFile(new URL('../assets/interview-list.css', import.meta.url), 'utf8');
const learningListCss = await readFile(new URL('../assets/learning-lists.css', import.meta.url), 'utf8');

function blockAfter(source, marker) {
  const markerIndex = source.indexOf(marker);
  const openIndex = source.indexOf('{', markerIndex);
  if (markerIndex < 0 || openIndex < 0) return '';

  let depth = 0;
  for (let index = openIndex; index < source.length; index += 1) {
    if (source[index] === '{') depth += 1;
    if (source[index] === '}') depth -= 1;
    if (depth === 0) return source.slice(openIndex + 1, index);
  }
  return '';
}

function declarationsFor(source, selector) {
  return Array.from(source.matchAll(/([^{}]+)\{([^{}]*)\}/g))
    .filter(([, selectors]) => selectors.split(',').map((value) => value.trim()).includes(selector))
    .map(([, , declarations]) => declarations)
    .join('\n');
}

test('홈의 다섯 번째 카드는 GitHub 원문 읽기를 기본 진입점으로 사용한다', () => {
  assert.match(home, /href="\.\/contents\.html"/);
  assert.match(home, /매일메일 백엔드 읽기/);
  assert.match(home, /GitHub 아카이브의 실제 원문/);
  assert.match(css, /\.home-board-card--interview/);
});

test('목록 페이지에 요약·오늘의 큐·복합 필터·페이지형 목록 골격이 있다', () => {
  for (const id of ['templates-page', 'interview-stats', 'interview-queue', 'interview-search', 'interview-category-filters', 'interview-status-filter', 'interview-favorites-only', 'interview-results-count', 'interview-page-summary', 'interview-list', 'interview-pagination', 'interview-pagination-pages', 'interview-live']) {
    assert.match(list, new RegExp(`id="${id}"`));
  }
  assert.match(list, /type="module" src="\.\/src\/templates-app\.js\?v=2"/);
  assert.match(list, /aria-live="polite"/);
  assert.match(list, /<label[^>]+for="interview-search"/);
  assert.match(list, /<label[^>]+for="interview-status-filter"/);
  assert.match(list, /id="interview-favorites-only"[^>]+aria-pressed="false"/);
  assert.match(list, /id="interview-results-count"[^>]+aria-live="polite"[^>]+aria-atomic="true"/);
  assert.match(list, /data-interview-page-action="previous"/);
  assert.match(list, /data-interview-page-action="next"/);
  assert.match(list, /<time[^>]+id="interview-queue-date"/);
  for (const key of ['total', 'studying', 'review', 'done']) {
    assert.match(list, new RegExp(`data-interview-stat="${key}"`));
  }
  assert.doesNotMatch(list, /data-interview-stat="favorite"/);
  assert.match(list, /href="\.\/contents\.html"[^>]*>읽기/);
  assert.match(list, /다섯 문항을 한 번에 확인하고 바로 답변합니다/);
  assert.match(list, /href="\.\/assets\/interview-list\.css\?v=4"/);
  assert.match(list, /href="\.\/assets\/learning-lists\.css\?v=7"/);
  assert.ok(list.indexOf('class="interview-results-area"') < list.indexOf('learning-category-sidebar'));
});

test('상세 페이지에 편집·출처·이동·인쇄·오류 골격이 있다', () => {
  for (const id of ['template-detail-page', 'interview-detail', 'interview-invalid', 'detail-hint-toggle', 'detail-hint', 'detail-hint-outline', 'detail-hint-keywords-toggle', 'detail-hint-keywords', 'detail-hint-keywords-list', 'detail-status', 'detail-confidence', 'detail-favorite', 'detail-pinned', 'detail-answer', 'detail-keywords', 'detail-memo', 'detail-last-studied', 'detail-print-values', 'detail-live']) {
    assert.match(detail, new RegExp(`id="${id}"`));
  }
  assert.match(detail, /type="module" src="\.\/src\/template-detail-app\.js"/);
  assert.match(detail, /rel="noopener noreferrer"/);
  for (const id of ['detail-status', 'detail-confidence', 'detail-answer', 'detail-keywords', 'detail-memo']) {
    assert.match(detail, new RegExp(`<label[^>]+for="${id}"`));
  }
  for (const id of ['detail-favorite', 'detail-pinned']) {
    assert.match(detail, new RegExp(`id="${id}"[^>]+aria-pressed="false"`));
  }
  assert.doesNotMatch(detail, /id="detail-last-studied"[^>]*datetime=""/);
});

test('면접 카탈로그는 세로 목록·모바일 가독성·상세 인쇄 규칙을 가진다', () => {
  assert.match(interviewCss, /\.interview-question-list\s*\{[^}]*display:\s*grid/s);
  assert.match(interviewCss, /@media[^}]*max-width:[^}]*\{[\s\S]*\.interview-queue-list[^}]*grid-template-columns:\s*1fr/);
  assert.match(interviewCss, /\.interview-pagination\s*\{[^}]*display:\s*flex/s);
  assert.match(interviewListCss, /\.interview-queue-list\s*\{[^}]*grid-template-columns:\s*repeat\(5,/s);
  assert.match(learningListCss, /\.learning-catalog-layout \.learning-card-grid\s*\{[^}]*grid-template-columns:\s*1fr/s);
  assert.match(learningListCss, /\.learning-category-sidebar\s*\{[^}]*position:\s*sticky\s*!important/s);
  assert.match(interviewListCss, /@media \(max-width: 760px\)[\s\S]*\.interview-question-list\s*\{[^}]*grid-template-columns:\s*1fr/s);
  assert.match(css, /@media print[\s\S]*\.interview-detail-controls[^}]*display:\s*none/);
  assert.match(css, /@media print[\s\S]*#detail-print-values[^}]*display:\s*block/);

  const mobileCss = blockAfter(interviewCss, '@media (max-width: 760px)');
  assert.match(declarationsFor(mobileCss, '.interview-question-row'), /grid-template-columns:\s*46px\s+minmax\(0,\s*1fr\)/);
  assert.doesNotMatch(declarationsFor(mobileCss, '.interview-question-list'), /overflow-x:\s*(?:auto|scroll)/);

  const printCss = blockAfter(css, '@media print');
  assert.doesNotMatch(declarationsFor(printCss, '#interview-detail'), /break-inside:\s*avoid/);
});

test('면접 카드 빈 영역도 상세 링크로 이동하고 관리 버튼은 독립적으로 동작한다', () => {
  assert.match(interviewListCss, /\.interview-queue-list > \.interview-queue-card,[\s\S]*position:\s*relative[\s\S]*cursor:\s*pointer/u);
  assert.match(interviewListCss, /\.interview-queue-card-body > \.interview-question-link::after\s*\{[\s\S]*position:\s*absolute[\s\S]*inset:\s*0/u);
  assert.match(interviewListCss, /\.interview-queue-actions\s*\{[\s\S]*z-index:\s*2/u);
  assert.match(interviewListCss, /\.interview-question-row\s*\{[\s\S]*position:\s*relative[\s\S]*cursor:\s*pointer/u);
  assert.match(interviewListCss, /\.interview-question-body > \.interview-question-link::after\s*\{[\s\S]*position:\s*absolute[\s\S]*inset:\s*0/u);
  assert.match(interviewListCss, /\.interview-question-actions\s*\{[\s\S]*z-index:\s*2/u);
  assert.match(learningListCss, /\.learning-card-grid \.interview-question-body > \.interview-question-link,/u);
  assert.match(learningListCss, /\.learning-card-grid \.interview-question-start\s*\{[\s\S]*background:\s*#245fae\s*!important[\s\S]*color:\s*#fff\s*!important/u);
});
