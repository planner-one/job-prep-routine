import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const historyHtml = await readFile(new URL('../history.html', import.meta.url), 'utf8').catch(() => '');
const indexHtml = await readFile(new URL('../index.html', import.meta.url), 'utf8').catch(() => '');
const dailyHtml = await readFile(new URL('../daily.html', import.meta.url), 'utf8').catch(() => '');
const weeklyHtml = await readFile(new URL('../weekly.html', import.meta.url), 'utf8').catch(() => '');
const css = await readFile(new URL('../assets/routine.css', import.meta.url), 'utf8').catch(() => '');
const historyApp = await readFile(new URL('../src/history-app.js', import.meta.url), 'utf8').catch(() => '');

test('기록·분석 페이지는 기간 선택, 요약, 그래프, 날짜별 상세를 한 화면에 둔다', () => {
  assert.match(historyHtml, /id="history-page"/);
  assert.match(historyHtml, /id="history-period-switch"/);
  assert.match(historyHtml, /data-history-period="7"/);
  assert.match(historyHtml, /data-history-period="30"/);
  assert.equal((historyHtml.match(/data-history-kpi=/g) ?? []).length, 6);
  assert.match(historyHtml, /id="history-chart"/);
  assert.match(historyHtml, /id="history-record-list"/);
  assert.match(historyHtml, /id="history-empty"/);
  assert.match(historyHtml, /src="\.\/src\/history-app\.js"/);
});

test('기록·분석 상단은 학습 기록 버튼을 제외한 공통 이동 패널을 제공한다', () => {
  const topbar = historyHtml.match(/<header class="app-topbar[\s\S]*?<\/header>/)?.[0] ?? '';
  assert.match(topbar, /class="app-topbar-brand" href="\.\/index\.html"/);
  assert.match(topbar, /aria-label="주요 이동"/);
  assert.match(topbar, /<a href="\.\/roadmap\.html">로드맵<\/a>/);
  assert.match(topbar, /<a href="\.\/weekly\.html">주간<\/a>/);
  assert.match(topbar, /<a href="\.\/daily\.html">데일리<\/a>/);
  assert.match(topbar, /<a href="\.\/history\.html" aria-current="page">기록<\/a>/);
  assert.match(topbar, /<a href="\.\/contents\.html">학습<\/a>/);
  assert.doesNotMatch(topbar, /href="\.\/study-history\.html"/);
  assert.match(topbar, />취업 준비 루틴 보드<\/span>/);
});

test('홈은 네 번째 기록·분석 보드를 제공한다', () => {
  assert.equal((indexHtml.match(/class="home-board-card/g) ?? []).length, 5);
  assert.match(indexHtml, /href="\.\/history\.html"/);
  assert.match(indexHtml, />기록·분석</);
  assert.match(indexHtml, /<span class="home-board-step">04<\/span>\s*<strong>기록·분석<\/strong>/);
  assert.doesNotMatch(indexHtml, /class="home-board-card[^"]*" href="\.\/study-history\.html"/);
  assert.match(indexHtml, /오전 2시/);
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
  assert.match(css, /@media\s*\(max-width:\s*760px\)[\s\S]*\.history-kpi-grid/);
  assert.match(css, /@media\s+print[\s\S]*\.history-record-card[\s\S]*break-inside\s*:\s*avoid/);
});

test('PDF 미리보기는 기록 페이지 상단 조작 영역의 마지막이다', () => {
  const actions = historyHtml.match(/<div class="history-actions[\s\S]*?<\/div>\s*<\/header>/)?.[0] ?? '';
  assert.match(actions, /id="history-pdf-preview"[^>]*>PDF 미리보기<\/button>\s*<\/div>\s*<\/header>$/);
});
