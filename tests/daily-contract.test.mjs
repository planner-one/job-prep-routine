import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const html = await readFile(new URL('../daily.html', import.meta.url), 'utf8').catch(() => '');
const css = await readFile(new URL('../assets/routine.css', import.meta.url), 'utf8').catch(() => '');

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

function hidesInPrint(printCss, selector) {
  return Array.from(printCss.matchAll(/([^{}]+)\{([^{}]*)\}/g)).some(([, selectors, declarations]) => {
    const selectorList = selectors.split(',').map((value) => value.trim());
    return selectorList.includes(selector) && /display\s*:\s*none(?:\s*!important)?\s*;/.test(declarations);
  });
}

test('데일리형은 시간표와 지원 파이프라인의 두 열을 가진다', () => {
  assert.match(html, /class="daily-layout"/);
  assert.match(html, /id="daily-schedule"/);
  assert.match(html, /id="application-pipeline"/);
});

test('노출 UI 제목은 자연스러운 한국어를 사용한다', () => {
  assert.doesNotMatch(html, /DAILY FOCUS|TIME BLOCKS|TODAY'S ACTION/);
  assert.match(html, />오늘의 집중</);
  assert.match(html, />시간 블록</);
  assert.match(html, />오늘의 실행</);
});

test('회사 4곳의 회사명·플랫폼·단계·링크 입력을 제공한다', () => {
  assert.equal((html.match(/class="company-card"/g) ?? []).length, 4);
  assert.match(html, /사람인/);
  assert.match(html, /지원 공고 링크/);
  assert.match(html, /분석/);
  assert.match(html, /자소서/);
  assert.match(html, /지원/);
});

test('PDF에서 링크와 화면 조작 요소를 숨긴다', () => {
  const printCss = blockAfter(css, '@media print');
  assert.notEqual(printCss, '');
  assert.equal(hidesInPrint(printCss, '.screen-only'), true);
  assert.equal(hidesInPrint(printCss, '.job-link-row'), true);
});
