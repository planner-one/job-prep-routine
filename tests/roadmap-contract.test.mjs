import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const html = await readFile(new URL('../roadmap.html', import.meta.url), 'utf8').catch(() => '');
const css = await readFile(new URL('../assets/routine.css', import.meta.url), 'utf8').catch(() => '');

test('로드맵은 모드와 카테고리 필터를 분리한다', () => {
  assert.match(html, /id="roadmap-mode-switch"/);
  assert.match(html, /id="category-filters"/);
  for (const label of ['전체', '운동·회복', '취업·면접', '개발 학습', '식사·휴식']) {
    assert.match(html, new RegExp(label));
  }
});

test('로드맵은 일정 체크와 학습 6종 복수 선택을 제공한다', () => {
  assert.match(html, /id="roadmap-schedule"/);
  assert.match(html, /id="roadmap-learning"/);
  for (const topic of ['Spring', 'Redis', 'Java', '프로젝트 적용', 'CS', '코딩테스트']) {
    assert.match(html, new RegExp(`data-learning-topic[^>]+value="${topic}"`));
  }
  assert.doesNotMatch(html, /type="time"/);
});

test('시간표를 네 칸이 아닌 한 열로 나열한다', () => {
  const scheduleStyle = css.match(/#roadmap-schedule\s*\{([^}]*)\}/)?.[1] ?? '';
  assert.match(scheduleStyle, /grid-template-columns\s*:\s*minmax\(0,\s*1fr\)/);
  assert.doesNotMatch(scheduleStyle, /repeat\(2/);
});

test('로드맵은 러닝 시각·현재 날짜 초기화·PDF 미리보기를 제공한다', () => {
  assert.match(html, /id="roadmap-run-start-controls"/);
  assert.match(html, /name="roadmap-run-start" value="21"/);
  assert.match(html, /name="roadmap-run-start" value="22"/);
  assert.match(html, /id="roadmap-reset-today"[^>]*>현재 날짜 초기화</);
  assert.match(html, /id="roadmap-pdf-preview"[^>]*>PDF 미리보기</);
  assert.doesNotMatch(html, /인쇄/);
});

test('PDF 미리보기는 상단 조작 영역의 마지막 버튼이다', () => {
  const actions = html.match(/<div class="roadmap-actions[\s\S]*?<\/div>\s*<\/header>/)?.[0] ?? '';
  assert.match(actions, /id="roadmap-pdf-preview"[^>]*>PDF 미리보기<\/button>\s*<\/div>\s*<\/header>$/);
});

test('학습 안내는 모든 모드에 맞는 중립 문구를 사용한다', () => {
  assert.match(html, /오늘의 학습 블록/);
  assert.doesNotMatch(html, /16:50 학습 블록/);
});
