import test from 'node:test';
import assert from 'node:assert/strict';
import {
  INTERVIEW_SOURCE,
  INTERVIEW_CATEGORIES,
  INTERVIEW_QUESTIONS,
  getInterviewQuestion,
} from '../src/interview-data.js';

test('공식 백엔드 152문항과 8개 카테고리를 원본 순서로 제공한다', () => {
  assert.equal(INTERVIEW_SOURCE.snapshotCommit, '8714ebdea872550df26a92b7846338dbdccf3986');
  assert.equal(INTERVIEW_CATEGORIES.length, 8);
  assert.equal(INTERVIEW_QUESTIONS.length, 152);
  assert.deepEqual(
    INTERVIEW_CATEGORIES.map(({ count }) => count),
    [21, 25, 25, 17, 23, 21, 9, 11],
  );
  assert.deepEqual(
    INTERVIEW_QUESTIONS.map(({ order }) => order),
    Array.from({ length: 152 }, (_, index) => index + 1),
  );
});

test('질문 ID·제목·카테고리·출처가 모두 유효하고 고유하다', () => {
  const ids = new Set(INTERVIEW_QUESTIONS.map(({ id }) => id));
  assert.equal(ids.size, 152);
  assert.deepEqual(
    [...ids].map((id) => Number(id.slice(3))).sort((a, b) => a - b),
    Array.from({ length: 152 }, (_, index) => index + 1),
  );
  const categoryIds = new Set(INTERVIEW_CATEGORIES.map(({ id }) => id));
  for (const question of INTERVIEW_QUESTIONS) {
    assert.match(question.id, /^be-\d+$/);
    assert.equal(question.title.trim().length > 0, true);
    assert.equal(categoryIds.has(question.categoryId), true);
    assert.equal(
      question.sourceUrl,
      `https://github.com/maeil-mail/maeil-mail-contents/blob/main/backend/contents/${question.id}.md`,
    );
    assert.equal(getInterviewQuestion(question.id), question);
  }
  assert.equal(getInterviewQuestion('be-999'), null);
});
