import test from 'node:test';
import assert from 'node:assert/strict';
import {
  extractInterviewHintKeywords,
  interviewAnswerOutline,
} from '../src/interview-hint-core.js';

test('원문 힌트 키워드는 강조·코드·소제목만 순서대로 추리고 답안 문단을 노출하지 않는다', () => {
  const markdown = [
    '## OSIV(Open Session In View)',
    '',
    '**OSIV**는 영속성 컨텍스트를 뷰까지 유지합니다.',
    '',
    '## 트랜잭션 방식의 문제는 어떻게 풀까요?',
    '',
    '`@Transactional`은 응용 계층에서 사용합니다.',
  ].join('\n');

  assert.deepEqual(
    extractInterviewHintKeywords(markdown),
    ['@Transactional', 'OSIV', 'OSIV(Open Session In View)', '트랜잭션 방식의 문제는 어떻게 풀까요'],
  );
});

test('카테고리별 답변 순서는 질문 제목과 무관하게 안전한 사고 순서를 제공한다', () => {
  const outline = interviewAnswerOutline({ categoryId: 'distributed-cache' });
  assert.equal(outline.length, 3);
  assert.match(outline[0], /분산 환경/u);
  assert.match(outline[2], /일관성/u);
  assert.deepEqual(interviewAnswerOutline({ categoryId: 'unknown' }), [
    '핵심 용어를 한 문장으로 정의합니다.',
    '동작 흐름 또는 원인을 설명합니다.',
    '장단점과 적용 판단을 덧붙입니다.',
  ]);
});
