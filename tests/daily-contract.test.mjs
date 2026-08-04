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

test('날짜·진척·다음 일정과 시간표를 보조 실행 입력보다 먼저 제공한다', () => {
  assert.match(html, /class="daily-today-overview page-primary"/);
  assert.match(html, /id="daily-next-action"/);
  assert.ok(html.indexOf('id="progress-track"') < html.indexOf('id="daily-next-action"'));
  assert.ok(html.indexOf('id="daily-next-action"') < html.indexOf('id="daily-schedule"'));
  assert.ok(html.indexOf('id="daily-schedule"') < html.indexOf('id="application-pipeline"'));
});

test('지원과 하루 마감은 펼쳐서 쓰고 PDF와 초기화는 더보기에 둔다', () => {
  assert.match(html, /<details class="side-panel daily-disclosure" id="application-pipeline">/);
  assert.match(html, /<details class="side-panel memo-panel daily-disclosure">/);
  const more = html.match(/<details class="daily-low-frequency[\s\S]*?<\/details>/)?.[0] ?? '';
  assert.match(more, /<summary>더보기<\/summary>/);
  assert.match(more, /id="pdf-preview"[\s\S]*id="reset-today"/);
});

test('주간 계획을 데일리 체크 일정으로 연결하고 계획 편집은 주간 화면으로 보낸다', () => {
  assert.match(html, /id="daily-plan-source"/);
  assert.match(html, /id="daily-plan-mode"/);
  assert.doesNotMatch(html, /id="daily-plan-topics"/);
  assert.match(html, /href="\.\/weekly\.html"[^>]*>주간 계획 수정</);
  assert.match(html, /id="daily-plan-update"[^>]*hidden/);
  assert.match(html, /id="apply-daily-plan-update"/);
});

test('계획 변경과 반영 결과를 보조기기에 알리고 반영 후 포커스 대상을 제공한다', () => {
  assert.match(html, /id="daily-plan-update"[^>]*role="status"/);
  assert.match(html, /id="daily-plan-update"[^>]*aria-live="polite"/);
  assert.match(html, /id="schedule-title"[^>]*tabindex="-1"/);
});

test('운영 유형·러닝 시간은 데일리에서 편집할 수 없고 학습 UI를 제공하지 않는다', () => {
  assert.doesNotMatch(html, /data-mode=/);
  assert.doesNotMatch(html, /name="run-start"/);
  assert.doesNotMatch(html, /학습|learning/i);
});

test('데일리는 학습을 제외한 시간표 카테고리 필터와 빈 결과 안내를 제공한다', () => {
  assert.match(html, /id="daily-category-filters"/);
  for (const [value, label] of [
    ['all', '전체'],
    ['exercise', '운동·회복'],
    ['career', '취업·면접'],
    ['meal', '식사·휴식'],
  ]) {
    assert.match(html, new RegExp(`data-category-filter="${value}"[^>]*>${label}<`));
  }
  assert.equal((html.match(/data-category-filter=/g) ?? []).length, 4);
  assert.doesNotMatch(html, /data-category-filter="learning"/);
  assert.match(html, /data-category-filter="all" aria-pressed="true"/);
  assert.match(html, /id="daily-schedule-empty"[^>]*hidden/);
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

test('제거된 데일리 편집 UI의 스타일을 남기지 않는다', () => {
  assert.doesNotMatch(css, /\.mode-button(?:\[|\s|,|\{)/);
  assert.doesNotMatch(css, /\.learning-panel(?:\s|>|,|\{)/);
  assert.doesNotMatch(css, /\.learning-options(?:\s|>|,|\{|:)/);
});
