import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const pageApp = await readFile(new URL('../src/page-app.js', import.meta.url), 'utf8');
const weeklyApp = await readFile(new URL('../src/weekly-app.js', import.meta.url), 'utf8');

test('데일리와 로드맵은 오전 2시 논리 날짜로 열리고 경계에서 갱신된다', () => {
  assert.match(pageApp, /const today\s*=\s*logicalDateString\(\)/);
  assert.match(pageApp, /scheduleLogicalDayRollover\(window,\s*today\)/);
});

test('주간 보드도 오전 2시 논리 날짜로 열리고 경계에서 갱신된다', () => {
  assert.match(weeklyApp, /const today\s*=\s*logicalDateString\(\)/);
  assert.match(weeklyApp, /scheduleLogicalDayRollover\(window,\s*today\)/);
});
