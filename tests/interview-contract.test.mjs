import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const home = await readFile(new URL('../index.html', import.meta.url), 'utf8');
const list = await readFile(new URL('../templates.html', import.meta.url), 'utf8').catch(() => '');
const detail = await readFile(new URL('../template.html', import.meta.url), 'utf8').catch(() => '');
const css = await readFile(new URL('../assets/routine.css', import.meta.url), 'utf8');

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
  assert.match(list, /<label[^>]+for="interview-search"/);
  assert.match(list, /<label[^>]+for="interview-status-filter"/);
  assert.match(list, /id="interview-favorites-only"[^>]+aria-pressed="false"/);
  assert.match(list, /id="interview-results-count"[^>]+aria-live="polite"[^>]+aria-atomic="true"/);
  assert.match(list, /<time[^>]+id="interview-queue-date"/);
  for (const key of ['total', 'studying', 'review', 'done']) {
    assert.match(list, new RegExp(`data-interview-stat="${key}"`));
  }
  assert.doesNotMatch(list, /data-interview-stat="favorite"/);
});

test('상세 페이지에 편집·출처·이동·인쇄·오류 골격이 있다', () => {
  for (const id of ['template-detail-page', 'interview-detail', 'interview-invalid', 'detail-status', 'detail-confidence', 'detail-favorite', 'detail-pinned', 'detail-answer', 'detail-keywords', 'detail-memo', 'detail-last-studied', 'detail-print-values', 'detail-live']) {
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

test('면접 카탈로그는 세로 목록·모바일 한 열·상세 인쇄 규칙을 가진다', () => {
  assert.match(css, /\.interview-question-list\s*\{[^}]*display:\s*grid/s);
  assert.match(css, /@media[^}]*max-width:[^}]*\{[\s\S]*\.interview-queue-list[^}]*grid-template-columns:\s*1fr/);
  assert.match(css, /@media print[\s\S]*\.interview-detail-controls[^}]*display:\s*none/);
  assert.match(css, /@media print[\s\S]*#detail-print-values[^}]*display:\s*block/);

  const mobileCss = blockAfter(css, '@media (max-width: 760px)');
  assert.match(declarationsFor(mobileCss, '.interview-question-row'), /grid-template-columns:\s*1fr/);
  assert.doesNotMatch(declarationsFor(mobileCss, '.interview-question-list'), /overflow-x:\s*(?:auto|scroll)/);

  const printCss = blockAfter(css, '@media print');
  assert.doesNotMatch(declarationsFor(printCss, '#interview-detail'), /break-inside:\s*avoid/);
});
