import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const html = await readFile(new URL('../learning.html', import.meta.url), 'utf8').catch(() => '');
const planHtml = await readFile(new URL('../learning-plan.html', import.meta.url), 'utf8').catch(() => '');
const css = await readFile(new URL('../assets/styles/routine/09-learning-sprint.css', import.meta.url), 'utf8').catch(() => '');
const planCss = await readFile(new URL('../assets/styles/routine/10-learning-plan-image.css', import.meta.url), 'utf8').catch(() => '');
const app = await readFile(new URL('../src/learning-app.js', import.meta.url), 'utf8').catch(() => '');
const data = await import('../src/learning-data.js');

test('자유 학습은 강의 목록에서 시작하고 날짜별 강제 과제나 대형 배너를 두지 않는다', () => {
  for (const id of ['learning-course-list', 'learning-course-detail', 'learning-course-filters', 'learning-course-search', 'learning-results', 'learning-review-list']) assert.ok(html.includes(`id="${id}"`));
  assert.match(html, /<h1 id="learning-title">2주 학습<\/h1>/);
  assert.match(html, /data-learning-view="courses" aria-pressed="true"/);
  assert.match(html, /정리노트 보는 시점/);
  assert.match(html, /learning-app\.js\?v=9/);
  assert.match(html, /learning-plan\.html/);
  assert.doesNotMatch(html + app + css, /learning-focus-card|learning-condition-buttons|data-complete-session/);
  assert.doesNotMatch(app, /completeLearningSession|learningCapacity|selectedDay/);
});

test('한 장 플랜 페이지는 첨부 이미지를 원본 비율과 A4 인쇄 크기로 제공한다', () => {
  assert.match(planHtml, /src="\.\/assets\/images\/2026-09-inflearn-learning-plan\.png"/);
  assert.match(planHtml, /width="1055"[\s\S]*height="1491"/);
  assert.match(planHtml, /href="\.\/learning\.html">학습 대시보드로 돌아가기/);
  assert.match(planCss, /@page\s*\{[^}]*size:\s*A4 portrait/s);
  assert.match(planCss, /\.learning-plan-sheet img\s*\{[^}]*width:\s*210mm[^}]*height:\s*297mm/s);
});

test('전체 강의·사용자 선택·수강 상태·기존 노트는 목록과 상세에 제공한다', () => {
  assert.equal(data.COURSES.length, 53);
  assert.match(app, /let courseFilter = 'all'/);
  assert.match(app, /data-course-flag="inPlan"/);
  for (const field of ['enrolled', 'skipped', 'noteReference', 'position', 'memo']) assert.ok(app.includes(field));
  assert.match(app, /stageLabelsForCourse/);
  assert.match(app, /updateCourseProgress/);
  assert.match(app, /data-course-filter/);
  assert.doesNotMatch(app, /답변을 먼저 적으면|질문 3개/);
});

test('학습 페이지의 데스크톱·모바일 이동에서 학습을 현재 위치로 표시한다', () => {
  const topbar = html.match(/<header class="app-topbar[\s\S]*?<\/header>/)?.[0] ?? '';
  const mobile = html.match(/<nav class="mobile-tabbar[\s\S]*?<\/nav>/)?.[0] ?? '';
  assert.equal((topbar.match(/<a /g) ?? []).length, 7);
  assert.match(topbar, /href="\.\/learning\.html" aria-current="page">학습/);
  assert.equal((mobile.match(/<a /g) ?? []).length, 6);
  assert.match(mobile, /href="\.\/learning\.html" aria-current="page">학습/);
});

test('작은 제목과 목록을 사용하되 체크 타깃과 취소선·신청 표시를 유지한다', () => {
  assert.match(css, /\.learning-toolbar h1\s*\{[^}]*font-size:\s*18px/s);
  assert.match(css, /\.learning-pick\s*\{[^}]*min-height:\s*44px/s);
  assert.match(css, /\.learning-table \.is-skipped \.learning-course-title\s*\{[^}]*text-decoration:\s*line-through/s);
  assert.match(css, /\.learning-enrolled\s*\{/);
  assert.match(app, /input type="checkbox"/);
  assert.match(css, /@media \(max-width: 600px\)/);
});


test('학습 메뉴는 왼쪽, 강의 목록은 오른쪽에 두고 가운데 패널만 전환한다', () => {
  const sidebar=html.match(/<aside class="learning-sidebar"[\s\S]*?<\/aside>/)?.[0] || '';
  for(const name of ['courses','overview','program','reviews','records','guide']) assert.ok(sidebar.includes(`data-learning-view="${name}"`));
  const catalog=html.match(/<aside class="learning-course-sidebar"[\s\S]*?<\/aside>/)?.[0] || '';
  assert.ok(!sidebar.includes('id="learning-course-list"'));
  assert.ok(catalog.includes('id="learning-course-list"'));
  assert.ok(html.indexOf('class="learning-sidebar"') < html.indexOf('id="learning-content"'));
  assert.ok(html.indexOf('id="learning-content"') < html.indexOf('class="learning-course-sidebar"'));
  assert.ok(!catalog.includes('data-learning-panel'));
  assert.ok(!sidebar.includes('data-learning-panel'));
  assert.match(html, /class="learning-paper"/);
  assert.match(css, /aspect-ratio:\s*210 \/ 297/);
  assert.match(css, /\.learning-content[^}]*overflow-y: auto/);
});

test('삭제 및 복원은 강의 상세와 삭제 목록에서 접근할 수 있다', () => {
  assert.match(html, /data-course-filter="deleted"/);
  assert.match(html, /id="learning-total-count"/);
  assert.match(app, /data-delete-course/);
  assert.match(app, /data-restore-course/);
  assert.match(html, /data-course-filter="added"/);
});

test('초기 데이터 로딩과 모듈 실패를 빈 화면 대신 안내한다', () => {
  assert.match(html, /강의 목록과 목차를 불러오고 있습니다/);
  assert.match(html, /import\('\.\/src\/learning-app\.js\?v=9'\)\.catch/);
  assert.match(html, /role="alert"/);
  assert.match(html, /다시 불러오기/);
  assert.match(app, /learning-core\.js\?v=9/);
  assert.match(app, /learning-curriculum\.js\?v=9/);
});

test('선택 강의의 전체 시간 합계를 목록과 반영 현황에 표시한다', () => {
  assert.match(html, /id="learning-selected-duration" aria-live="polite"/);
  assert.match(html, /‘내 선택’ 체크 기준 · 전체 영상 · 1배속/);
  assert.match(app, /selectedCourseSummary\(state\)/);
  assert.match(app, /duration\(selectedTime.totalSeconds\)/);
});
