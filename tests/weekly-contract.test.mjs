import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { readCssBundle } from './helpers/read-css-bundle.mjs';

const html = await readFile(new URL('../weekly.html', import.meta.url), 'utf8').catch(() => '');
const css = await readCssBundle(new URL('../assets/routine.css', import.meta.url));

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
  assert.equal((html.match(/data-weekly-progress=/g) ?? []).length, 3);
  assert.equal((html.match(/data-day=/g) ?? []).length, 7);
  assert.match(html, /id="weekly-mode-controls"/);
  assert.match(html, /id="weekly-run-start-controls"/);
  assert.match(html, /id="set-maintenance-day"/);
  assert.doesNotMatch(html, /학습|learning/i);
});

test('선택 요일은 중복 체크리스트 없이 하나의 세로 플래너를 제공한다', () => {
  assert.match(html, /id="weekly-plan-list"/);
  assert.match(html, /id="weekly-add-plan"/);
  assert.match(html, /id="weekly-time-edit"/);
  assert.match(html, /id="weekly-unscheduled-list"/);
  assert.doesNotMatch(html, /data-weekly-application|data-weekly-task|data-maintenance-task/);
  assert.doesNotMatch(html, /weekly-checklist-column|weekly-schedule-column/);
});

test('일정 추가는 목록의 주요 행동으로 두고 시간 편집은 요일 설정에 묶는다', () => {
  const header = html.match(/<header class="weekly-planner-header"[\s\S]*?<\/header>/)?.[0] ?? '';
  const settings = html.match(/<details class="weekly-settings[\s\S]*?<\/details>/)?.[0] ?? '';
  assert.match(header, /id="weekly-add-plan"/);
  assert.doesNotMatch(header, /id="weekly-time-edit"/);
  assert.match(settings, /<summary>요일 설정<\/summary>/);
  assert.match(settings, /id="weekly-mode-controls"[\s\S]*id="set-maintenance-day"[\s\S]*id="weekly-time-edit"/);
});

test('요일과 선택 일정은 주간 진척보다 먼저 제공한다', () => {
  assert.ok(html.indexOf('id="weekday-tabs"') < html.indexOf('id="day-detail"'));
  assert.ok(html.indexOf('id="day-detail"') < html.indexOf('id="weekly-progress"'));
});

test('PDF 미리보기는 상단 조작의 마지막이며 화면 문구에 물결표를 쓰지 않는다', () => {
  const actions = html.match(/<div class="weekly-actions[\s\S]*?<\/div>\s*<\/header>/)?.[0] ?? '';
  assert.match(actions, /id="weekly-pdf-preview"[^>]*>PDF 미리보기<\/button>\s*<\/div>\s*<\/header>$/);
  assert.doesNotMatch(html, /~/);
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

test('제거된 체크리스트와 보조 시간표 전용 스타일을 남기지 않는다', () => {
  for (const legacySelector of [
    'weekly-detail-grid',
    'weekly-checklist-column',
    'weekly-schedule-column',
    'weekly-check-group',
    'weekly-maintenance-checks',
    'weekly-check-heading',
    'weekly-application-checks',
    'weekly-core-checks',
    'weekly-learning-options',
    'weekly-schedule-heading',
    'weekly-schedule-list',
    'weekly-schedule-time',
    'weekly-schedule-label',
  ]) {
    assert.doesNotMatch(css, new RegExp(`\\.${legacySelector}(?![a-z0-9-])`));
  }
  assert.doesNotMatch(css, /\.weekly-(?:progress-card--learning|learning-[a-z-]+)/);
});
