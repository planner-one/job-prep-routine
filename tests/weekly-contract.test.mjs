import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const html = await readFile(new URL('../weekly.html', import.meta.url), 'utf8').catch(() => '');
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

test('주간 목표와 일곱 요일 및 운영 유형 선택을 유지한다', () => {
  assert.match(html, /id="weekly-progress"/);
  assert.equal((html.match(/data-day=/g) ?? []).length, 7);
  assert.match(html, /id="weekly-mode-controls"/);
  assert.match(html, /id="weekly-run-start-controls"/);
  assert.match(html, /id="set-maintenance-day"/);
});

test('선택 요일은 중복 체크리스트 없이 하나의 세로 플래너를 제공한다', () => {
  assert.match(html, /id="weekly-plan-list"/);
  assert.match(html, /id="weekly-add-plan"/);
  assert.match(html, /id="weekly-time-edit"/);
  assert.match(html, /id="weekly-unscheduled-list"/);
  assert.doesNotMatch(html, /data-weekly-application|data-weekly-task|data-maintenance-task/);
  assert.doesNotMatch(html, /weekly-checklist-column|weekly-schedule-column/);
});

test('목록 상단 오른쪽에 일정 추가와 시간 편집을 둔다', () => {
  const header = html.match(/<header class="weekly-planner-header"[\s\S]*?<\/header>/)?.[0] ?? '';
  assert.match(header, /id="weekly-add-plan"[\s\S]*id="weekly-time-edit"/);
});

test('일정 행의 시간과 이름은 읽기 쉬운 크기이고 고정 행을 구분한다', () => {
  assert.match(css, /\.weekly-plan-row\s*\{[^}]*grid-template-columns\s*:\s*2\.25rem 7\.5rem 1fr auto auto/s);
  assert.match(css, /\.weekly-plan-time\s*\{[^}]*font-size\s*:\s*\.95rem/s);
  assert.match(css, /\.weekly-plan-label\s*\{[^}]*font-size\s*:\s*1\.06rem/s);
  assert.match(css, /\.weekly-plan-row\.is-fixed\s*\{[^}]*background\s*:\s*var\(--paper-soft\)/s);
  assert.match(css, /\.weekly-unscheduled\s*\{[^}]*#d97706/s);
});

test('모바일 이동 조작과 인쇄용 편집 조작 숨김을 제공한다', () => {
  const mobileCss = blockAfter(css, '@media (max-width: 720px)');
  assert.match(mobileCss, /\.plan-move-actions[\s\S]*grid-column/);

  const printCss = blockAfter(css, '@media print');
  for (const selector of ['.weekly-planner-actions', '.weekly-add-panel', '.plan-drag', '.plan-move-actions', '.plan-time-editor', '.plan-remove']) {
    assert.match(printCss, new RegExp(selector.replace('.', '\\\.') + '[\\s\\S]*display\\s*:\\s*none'));
  }
});
