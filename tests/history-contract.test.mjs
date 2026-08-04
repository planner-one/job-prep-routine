import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const historyHtml = await readFile(new URL('../history.html', import.meta.url), 'utf8').catch(() => '');
const indexHtml = await readFile(new URL('../index.html', import.meta.url), 'utf8').catch(() => '');
const roadmapHtml = await readFile(new URL('../roadmap.html', import.meta.url), 'utf8').catch(() => '');
const dailyHtml = await readFile(new URL('../daily.html', import.meta.url), 'utf8').catch(() => '');
const weeklyHtml = await readFile(new URL('../weekly.html', import.meta.url), 'utf8').catch(() => '');
const css = await readFile(new URL('../assets/routine.css', import.meta.url), 'utf8').catch(() => '');
const historyApp = await readFile(new URL('../src/history-app.js', import.meta.url), 'utf8').catch(() => '');

test('기록·분석 페이지는 기간 선택, 요약, 그래프, 날짜별 상세를 한 화면에 둔다', () => {
  assert.match(historyHtml, /id="history-page"/);
  assert.match(historyHtml, /id="history-period-switch"/);
  assert.match(historyHtml, /data-history-period="7"/);
  assert.match(historyHtml, /data-history-period="30"/);
  assert.equal((historyHtml.match(/data-history-kpi=/g) ?? []).length, 5);
  assert.doesNotMatch(historyHtml, /data-history-kpi="learning"|학습 실행일|legend-learning/);
  assert.match(historyHtml, /id="history-chart"/);
  assert.match(historyHtml, /id="history-record-list"/);
  assert.match(historyHtml, /id="history-empty"/);
  assert.match(historyHtml, /src="\.\/src\/history-app\.js"/);
});

test('루틴 내부 화면은 로드맵·주간·데일리·기록 네 이동만 제공한다', () => {
  for (const html of [indexHtml, roadmapHtml, weeklyHtml, dailyHtml, historyHtml]) {
    const topbar = html.match(/<header class="app-topbar[\s\S]*?<\/header>/)?.[0] ?? '';
    const nav = topbar.match(/<nav aria-label="주요 이동">[\s\S]*?<\/nav>/)?.[0] ?? '';
    assert.match(topbar, /class="app-topbar-brand" href="\.\/index\.html"/);
    assert.match(topbar, />취업 준비 루틴 보드<\/span>/);
    assert.equal((nav.match(/<a /g) ?? []).length, 4);
    for (const pageName of ['roadmap', 'weekly', 'daily', 'history']) {
      assert.match(nav, new RegExp(`href="\\./${pageName}\\.html"`));
    }
    assert.doesNotMatch(nav, /contents|study-history|학습/);
  }
});

test('선택 홈은 배포 가능한 루틴 보드와 로컬 학습 보드 두 카드만 제공한다', () => {
  const cards = indexHtml.match(/<nav class="home-board-grid"[\s\S]*?<\/nav>/)?.[0] ?? '';
  assert.equal((cards.match(/class="home-board-card/g) ?? []).length, 2);
  assert.match(cards, /href="\.\/roadmap\.html"/);
  assert.match(cards, /href="http:\/\/127\.0\.0\.1:8788\/contents\.html"/);
  assert.match(cards, /<strong>루틴 보드<\/strong>/);
  assert.match(cards, /<strong>학습 보드<\/strong>/);
  assert.doesNotMatch(cards, /href="http:\/\/127\.0\.0\.1:8787\/roadmap\.html"/);
});

test('데일리와 주간 보드에서 기록·분석으로 바로 이동할 수 있다', () => {
  for (const html of [dailyHtml, weeklyHtml]) {
    assert.match(html, /class="board-link[^\"]*"[^>]+href="\.\/history\.html"/);
  }
});

test('기록 페이지는 오전 2시 기준과 7일·30일 집계를 사용한다', () => {
  assert.match(historyApp, /logicalDateString\(\)/);
  assert.match(historyApp, /buildPeriodRecords/);
  assert.match(historyApp, /collectHistoryRecords/);
  assert.match(historyApp, /scheduleLogicalDayRollover/);
});

test('기록 화면은 반응형 그래프와 인쇄 가능한 날짜 카드 스타일을 가진다', () => {
  assert.match(css, /\.app-topbar/);
  assert.match(css, /\.history-chart/);
  assert.match(css, /\.history-record-card/);
  assert.match(css, /\.history-kpi-grid/);
  assert.doesNotMatch(css, /\.history-kpi-card--learning|\.legend-learning|\.history-activity-marker\.is-learning/);
  assert.match(css, /@media\s*\(max-width:\s*760px\)[\s\S]*\.history-kpi-grid/);
  assert.match(css, /@media\s+print[\s\S]*\.history-record-card[\s\S]*break-inside\s*:\s*avoid/);
});

test('PDF 미리보기는 기록 페이지 상단 조작 영역의 마지막이다', () => {
  const actions = historyHtml.match(/<div class="history-actions[\s\S]*?<\/div>\s*<\/header>/)?.[0] ?? '';
  assert.match(actions, /id="history-pdf-preview"[^>]*>PDF 미리보기<\/button>\s*<\/div>\s*<\/header>$/);
});
