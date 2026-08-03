import test from 'node:test';
import assert from 'node:assert/strict';
import {
  STUDY_DETAIL_PAGE_SIZE,
  buildStudyDetailPageItems,
  paginateStudyAttempts,
} from '../src/study-history-app.js';

function createAttempts(count) {
  return Array.from({ length: count }, (_, index) => ({ id: `attempt-${index + 1}` }));
}

test('DAILY LOG 카드는 한 페이지에 최대 6개를 순서대로 표시한다', () => {
  const attempts = createAttempts(14);
  const first = paginateStudyAttempts(attempts, 1);
  const second = paginateStudyAttempts(attempts, 2);
  const third = paginateStudyAttempts(attempts, 3);

  assert.equal(STUDY_DETAIL_PAGE_SIZE, 6);
  assert.deepEqual(first.items.map(({ id }) => id), [
    'attempt-1',
    'attempt-2',
    'attempt-3',
    'attempt-4',
    'attempt-5',
    'attempt-6',
  ]);
  assert.deepEqual(second.items.map(({ id }) => id), [
    'attempt-7',
    'attempt-8',
    'attempt-9',
    'attempt-10',
    'attempt-11',
    'attempt-12',
  ]);
  assert.deepEqual(third.items.map(({ id }) => id), ['attempt-13', 'attempt-14']);
  assert.equal(first.totalItems, 14);
  assert.equal(first.totalPages, 3);
  assert.equal(attempts.length, 14);
});

test('6개 이하는 한 페이지이며 요청 페이지를 유효 범위로 보정한다', () => {
  assert.equal(paginateStudyAttempts([], 8).totalPages, 1);
  assert.equal(paginateStudyAttempts(createAttempts(6), 2).page, 1);
  assert.equal(paginateStudyAttempts(createAttempts(7), -4).page, 1);
  assert.equal(paginateStudyAttempts(createAttempts(14), 99).page, 3);
  assert.equal(paginateStudyAttempts(createAttempts(14), Number.NaN).page, 1);
});

test('페이지 번호는 처음·중간·끝에서 폭이 늘어나지 않도록 줄임표를 사용한다', () => {
  assert.deepEqual(buildStudyDetailPageItems(5, 3), [1, 2, 3, 4, 5]);
  assert.deepEqual(buildStudyDetailPageItems(10, 1), [1, 2, 3, 4, 5, 'ellipsis', 10]);
  assert.deepEqual(buildStudyDetailPageItems(10, 6), [1, 'ellipsis', 5, 6, 7, 'ellipsis', 10]);
  assert.deepEqual(buildStudyDetailPageItems(10, 10), [1, 'ellipsis', 6, 7, 8, 9, 10]);
});
