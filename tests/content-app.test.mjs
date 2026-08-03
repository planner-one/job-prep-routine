import assert from 'node:assert/strict';
import test from 'node:test';
import {
  adjacentContents,
  contentIdFromLocation,
  estimateReadingMinutes,
  quizReturnFromLocation,
  scrollToContentAnchor,
} from '../src/content-app.js';

test('상세 주소에서 콘텐츠 ID를 읽고 잘못된 검색 문자열은 빈 값으로 처리한다', () => {
  assert.equal(contentIdFromLocation({ search: '?id=be-66' }), 'be-66');
  assert.equal(contentIdFromLocation({ search: '?mode=read' }), '');
  assert.equal(contentIdFromLocation(null), '');
});

test('퀴즈 원문 이동은 복귀 출처를 보존하고 유효하지 않은 앵커를 답변 상단으로 대체한다', () => {
  assert.deepEqual(quizReturnFromLocation({
    search: '?id=be-1&from=quiz&quizSource=be-3',
  }), { enabled: true, sourceId: 'be-3' });
  assert.deepEqual(quizReturnFromLocation({ search: '?id=be-1' }), {
    enabled: false,
    sourceId: '',
  });

  let focused = false;
  let scrolled = false;
  const fallback = {
    hasAttribute: () => true,
    focus: () => { focused = true; },
    scrollIntoView: () => { scrolled = true; },
  };
  const page = {
    ownerDocument: { getElementById: () => null },
    matches: () => false,
    querySelector: (selector) => selector === '#content-answer' ? fallback : null,
  };
  assert.equal(scrollToContentAnchor(page, { hash: '#missing' }, null), fallback);
  assert.equal(focused, true);
  assert.equal(scrolled, true);
});

test('일반 상세 진입은 원문 로딩 뒤에도 화면 위치를 임의로 내리지 않는다', () => {
  let scrolled = false;
  const page = {
    ownerDocument: { getElementById: () => null },
    matches: () => false,
    querySelector: () => ({
      scrollIntoView: () => { scrolled = true; },
    }),
  };
  assert.equal(scrollToContentAnchor(page, { hash: '' }, null), null);
  assert.equal(scrolled, false);
});

test('이전·다음 글은 카테고리 배열 순서가 아니라 파일 번호 순서를 따른다', () => {
  const questions = [
    { id: 'be-8', number: 8 },
    { id: 'be-1', number: 1 },
    { id: 'be-3', number: 3 },
  ];
  assert.deepEqual(adjacentContents(questions[2], questions), {
    previous: questions[1],
    next: questions[0],
  });
});

test('읽는 시간은 짧은 글도 최소 3분이며 본문 길이에 따라 증가한다', () => {
  assert.equal(estimateReadingMinutes('짧은 글'), 3);
  assert.equal(estimateReadingMinutes('가'.repeat(2801)), 5);
});
