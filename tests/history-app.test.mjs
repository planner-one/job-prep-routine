import test from 'node:test';
import assert from 'node:assert/strict';
import {
  formatHistoryDate,
  historyModeLabel,
  weeklyCheckLabel,
} from '../src/history-app.js';

test('기록 날짜를 한국어 요일까지 포함해 표시한다', () => {
  assert.equal(formatHistoryDate('2026-07-18'), '2026년 7월 18일 토요일');
  assert.equal(formatHistoryDate('invalid'), 'invalid');
});

test('운영 모드와 주간 체크 식별자를 읽기 쉬운 문구로 바꾼다', () => {
  assert.equal(historyModeLabel('workout'), '운동일');
  assert.equal(historyModeLabel('maintenance'), '핵심 유지일');
  assert.equal(weeklyCheckLabel('application-3'), '지원 3');
  assert.equal(weeklyCheckLabel('interview'), '면접 연습·복기');
});
