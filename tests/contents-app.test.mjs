import assert from 'node:assert/strict';
import test from 'node:test';
import {
  normalizeReadingPageSize,
  normalizeReadingViewSnapshot,
  readingNavigationType,
} from '../src/contents-app.js';

test('읽기 목록 페이지 크기는 6·10·14개만 허용하고 기본값은 6개다', () => {
  assert.equal(normalizeReadingPageSize(6), 6);
  assert.equal(normalizeReadingPageSize('10'), 10);
  assert.equal(normalizeReadingPageSize(14), 14);
  assert.equal(normalizeReadingPageSize(0), 6);
  assert.equal(normalizeReadingPageSize('20'), 6);
  assert.equal(normalizeReadingPageSize(null), 6);
});

test('읽기 목록은 브라우저 뒤로가기를 일반 진입과 구분한다', () => {
  assert.equal(readingNavigationType({
    getEntriesByType: () => [{ type: 'back_forward' }],
  }), 'back_forward');
  assert.equal(readingNavigationType({
    getEntriesByType: () => [{ type: 'reload' }],
  }), 'reload');
  assert.equal(readingNavigationType({ getEntriesByType: () => [] }), 'navigate');
  assert.equal(readingNavigationType(null), 'navigate');
});

test('뒤로가기용 읽기 목록 화면 상태는 필터·페이지·스크롤만 안전하게 복원한다', () => {
  assert.deepEqual(normalizeReadingViewSnapshot({
    filters: {
      query: '트랜잭션',
      category: 'Persistence와 데이터베이스',
      progress: 'unread',
    },
    currentPage: '3',
    scrollY: 942,
  }), {
    filters: {
      query: '트랜잭션',
      category: 'Persistence와 데이터베이스',
      progress: 'unread',
    },
    currentPage: 3,
    scrollY: 942,
  });
  assert.deepEqual(normalizeReadingViewSnapshot({
    filters: { progress: 'unknown' },
    currentPage: 0,
    scrollY: -20,
  }), {
    filters: { query: '', category: 'all', progress: 'all' },
    currentPage: 1,
    scrollY: 0,
  });
  assert.equal(normalizeReadingViewSnapshot(null), null);
});
