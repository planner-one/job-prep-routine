import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const root = new URL('../', import.meta.url);
const [html, css, app, reading, interview, detail] = await Promise.all([
  readFile(new URL('quizzes.html', root), 'utf8'),
  readFile(new URL('assets/quiz-list.css', root), 'utf8'),
  readFile(new URL('src/quizzes-app.js', root), 'utf8'),
  readFile(new URL('contents.html', root), 'utf8'),
  readFile(new URL('templates.html', root), 'utf8'),
  readFile(new URL('quiz.html', root), 'utf8'),
]);

test('퀴즈 목록은 금일 문제와 14개 페이지 목록을 분리해 제공한다', () => {
  for (const id of [
    'quiz-today-list',
    'quiz-today-progress',
    'quiz-source-list',
    'quiz-list-search',
    'quiz-list-category',
    'quiz-list-status',
    'quiz-list-pagination',
  ]) assert.match(html, new RegExp(`id="${id}"`, 'u'));
  assert.match(html, /금일 풀 문제/u);
  assert.match(app, /QUIZ_LIST_PAGE_SIZE = 14/u);
  assert.match(css, /grid-template-columns: repeat\(5, minmax\(0, 1fr\)\)/u);
  assert.match(css, /grid-template-columns: repeat\(2, minmax\(0, 1fr\)\)/u);
});

test('퀴즈 카드 빈 영역도 상세 링크로 이동하고 실행 링크는 독립적으로 동작한다', () => {
  assert.match(html, /href="\.\/assets\/quiz-list\.css\?v=2"/u);
  assert.match(css, /\.quiz-today-card\s*\{[\s\S]*position:\s*relative[\s\S]*cursor:\s*pointer/u);
  assert.match(css, /\.quiz-card-title::after\s*\{[\s\S]*position:\s*absolute[\s\S]*inset:\s*0/u);
  assert.match(css, /\.quiz-card-action\s*\{[\s\S]*z-index:\s*2/u);
  assert.match(css, /\.quiz-source-card\s*\{[\s\S]*position:\s*relative[\s\S]*cursor:\s*pointer/u);
  assert.match(css, /\.quiz-source-title::after\s*\{[\s\S]*position:\s*absolute[\s\S]*inset:\s*0/u);
  assert.match(css, /\.quiz-source-action\s*\{[\s\S]*z-index:\s*2/u);
});

test('읽기·면접·퀴즈 상세에서 퀴즈 목록으로 진입할 수 있다', () => {
  assert.match(reading, /href="\.\/quizzes\.html">퀴즈/u);
  assert.match(interview, /href="\.\/quizzes\.html">퀴즈/u);
  assert.match(detail, /href="\.\/quizzes\.html">퀴즈 목록/u);
});
