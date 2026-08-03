import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const root = new URL('../', import.meta.url);
const [page, app, core, studyCss, home, history, contents, content, quizzes, quiz, templates, template] = await Promise.all([
  readFile(new URL('study-history.html', root), 'utf8'),
  readFile(new URL('src/study-history-app.js', root), 'utf8'),
  readFile(new URL('src/study-history-calendar-core.js', root), 'utf8'),
  readFile(new URL('assets/study-history.css', root), 'utf8'),
  readFile(new URL('index.html', root), 'utf8'),
  readFile(new URL('history.html', root), 'utf8'),
  readFile(new URL('contents.html', root), 'utf8'),
  readFile(new URL('content.html', root), 'utf8'),
  readFile(new URL('quizzes.html', root), 'utf8'),
  readFile(new URL('quiz.html', root), 'utf8'),
  readFile(new URL('templates.html', root), 'utf8'),
  readFile(new URL('template.html', root), 'utf8'),
]);

test('학습 기록 페이지는 90일 잔디와 선택 날짜 상세를 제공한다', () => {
  for (const id of [
    'study-history-page',
    'study-activity-calendar',
    'study-activity-months',
    'study-activity-total',
    'study-activity-active-days',
    'study-activity-current-streak',
    'study-activity-total-quiz-percent',
    'study-activity-reading-total',
    'study-activity-quiz-total',
    'study-activity-interview-total',
    'study-activity-selected-date',
    'study-day-reading-count',
    'study-day-quiz-count',
    'study-day-interview-count',
    'study-activity-detail-list',
    'study-activity-detail-empty',
    'study-activity-pagination',
  ]) assert.match(page, new RegExp(`id="${id}"`, 'u'));
  assert.match(page, /href="\.\/assets\/study-history\.css\?v=10"/u);
  assert.match(page, /src="\.\/src\/study-history-app\.js\?v=4"/u);
  assert.doesNotMatch(page, /id="study-activity-wrong"/u);
  assert.match(app, /dataset\.studyDate/u);
  assert.match(app, /aria-pressed/u);
  assert.match(app, /handleKeydown/u);
  assert.match(app, /tabIndex/u);
  assert.match(app, /scheduleLogicalDayRollover/u);
  assert.match(core, /STUDY_HISTORY_CALENDAR_DAYS = 90/u);
  assert.match(core, /status: 'completed'/u);
});

test('DAILY LOG는 선택한 날짜의 카드를 6개씩 페이지로 나눈다', () => {
  assert.match(app, /STUDY_DETAIL_PAGE_SIZE = 6/u);
  assert.match(app, /paginateStudyAttempts\(safeAttempts, requestedPage\)/u);
  assert.match(app, /for \(const attempt of pagination\.items\)/u);
  assert.match(app, /dataset\.studyDetailPage/u);
  assert.match(app, /selectedDetailPage = 1/u);
  assert.match(app, /setText\(root, '#study-activity-selected-count', `완료 활동 \$\{safeAttempts\.length\}건`\)/u);
  assert.match(page, /id="study-activity-pagination"[\s\S]*?hidden/u);
  assert.match(studyCss, /\.study-detail-pagination\s*\{/u);
  assert.match(studyCss, /\.study-pagination-button\[aria-current="page"\]\s*\{/u);
});

test('오답은 DAILY LOG의 해당 퀴즈 카드 안 토글로 렌더링한다', () => {
  assert.match(app, /element\(pageDocument, 'details', 'study-quiz-wrong-details'\)/u);
  assert.match(app, /`오답 \$\{wrongAnswers\.length\}개 다시 보기`/u);
  assert.match(app, /collectWrongAnswers\(\{ attempts: \[attempt\] \}/u);
  assert.match(app, /card\.append\(details\)/u);
  assert.match(studyCss, /\.study-quiz-wrong-details\s*\{/u);
  assert.match(studyCss, /\.study-quiz-wrong-toggle:focus-visible\s*\{/u);
});

test('최근 90일 학습 요약은 나의 학습 잔디 안에 함께 배치한다', () => {
  const heroStart = page.indexOf('<section class="study-history-hero"');
  const heroEnd = page.indexOf('</section>', heroStart);
  const grassStart = page.indexOf('<section class="study-activity-calendar-section"');
  const grassEnd = page.indexOf('</section>', grassStart);
  const heroMarkup = page.slice(heroStart, heroEnd);
  const grassMarkup = page.slice(grassStart, grassEnd);

  assert.doesNotMatch(heroMarkup, /study-activity-summary/u);
  assert.doesNotMatch(heroMarkup, /id="study-activity-range"/u);
  assert.match(grassMarkup, /id="study-activity-range"/u);
  assert.match(grassMarkup, /class="study-calendar-sidebar"/u);
  assert.match(grassMarkup, /class="study-activity-summary"/u);
  const calendarCardIndex = grassMarkup.indexOf('class="study-calendar-card"');
  const sidebarIndex = grassMarkup.indexOf('class="study-calendar-sidebar"');
  const mixIndex = grassMarkup.indexOf('class="study-activity-mix"');
  const summaryIndex = grassMarkup.indexOf('class="study-activity-summary"');
  assert.ok(calendarCardIndex < sidebarIndex);
  assert.ok(sidebarIndex < mixIndex);
  assert.ok(mixIndex < summaryIndex);
  assert.match(studyCss, /grid-template-columns:\s*minmax\(0,\s*1fr\)\s*minmax\(410px,\s*\.72fr\)/u);
  assert.match(studyCss, /grid-template-areas:\s*"calendar sidebar"/u);
  assert.match(studyCss, /\.study-activity-summary\s*\{[\s\S]*?grid-template-columns:\s*repeat\(4,/u);
  assert.match(studyCss, /\.study-calendar-card\s*\{[\s\S]*?align-self:\s*stretch/u);
  assert.match(studyCss, /\.study-calendar-scroll\s*\{[\s\S]*?flex:\s*1/u);
  for (const id of [
    'study-activity-total',
    'study-activity-active-days',
    'study-activity-current-streak',
    'study-activity-total-quiz-percent',
  ]) assert.match(grassMarkup, new RegExp(`id="${id}"`, 'u'));
});

test('학습 기록 페이지는 보존하되 공통 상단과 학습 화면에서 이동 버튼을 숨긴다', () => {
  assert.match(home, /<header class="app-topbar screen-only">/u);
  assert.doesNotMatch(home, /class="home-board-card[^"]*" href="\.\/study-history\.html"/u);
  for (const html of [page, history]) {
    assert.match(html, /<header class="app-topbar screen-only">/u);
    assert.match(html, /class="app-topbar-brand" href="\.\/index\.html"/u);
    assert.match(html, />취업 준비 루틴 보드<\/span>/u);
    assert.match(html, /aria-label="주요 이동"/u);
    assert.match(html, /<a href="\.\/contents\.html">학습<\/a>/u);
  }
  for (const html of [home, history, contents, content, quizzes, quiz, templates, template, page]) {
    assert.doesNotMatch(html, /href="\.\/study-history\.html"/u);
  }
  assert.doesNotMatch(history, /id="study-history-list"/u);
});

test('잔디·선택 상태·반응형 상세 카드 스타일을 제공한다', () => {
  for (const selector of [
    '.study-calendar-days',
    '.study-calendar-day',
    '.study-calendar-day[aria-pressed="true"]',
    '.study-calendar-layout',
    '.study-calendar-sidebar',
    '.study-activity-detail-card',
  ]) assert.match(studyCss, new RegExp(selector.replace(/[.[]/g, '\\$&').replace(']', '\\]') + '\\s*\\{', 'u'));
  assert.match(studyCss, /@media\s*\(max-width:\s*620px\)[\s\S]*\.study-calendar-days/u);
});
