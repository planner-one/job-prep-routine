import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const pageApp = await readFile(new URL('../src/page-app.js', import.meta.url), 'utf8');
const weeklyApp = await readFile(new URL('../src/weekly-app.js', import.meta.url), 'utf8');
const weeklyPlanCore = await readFile(new URL('../src/weekly-plan-core.js', import.meta.url), 'utf8');
const dailyPlanCore = await readFile(new URL('../src/daily-plan-core.js', import.meta.url), 'utf8');
const templatesApp = await readFile(new URL('../src/templates-app.js', import.meta.url), 'utf8');
const templateDetailApp = await readFile(new URL('../src/template-detail-app.js', import.meta.url), 'utf8');

test('데일리와 로드맵은 오전 2시 논리 날짜로 열리고 경계에서 갱신된다', () => {
  assert.match(pageApp, /const today\s*=\s*logicalDateString\(\)/);
  assert.match(pageApp, /scheduleLogicalDayRollover\(window,\s*today\)/);
});

test('주간 보드도 오전 2시 논리 날짜로 열리고 경계에서 갱신된다', () => {
  assert.match(weeklyApp, /const today\s*=\s*logicalDateString\(\)/);
  assert.match(weeklyApp, /scheduleLogicalDayRollover\(window,\s*today\)/);
});

test('새 계획 코어와 데일리 코어는 오전 2시 논리 날짜에서 계산한 주간 키를 공통 사용한다', () => {
  assert.match(weeklyPlanCore, /export function weekMondayKey/);
  assert.match(weeklyPlanCore, /getHours\(\)\s*<\s*2/);
  assert.match(dailyPlanCore, /weekKey:\s*weekMondayKey\(date\)/);
  assert.match(pageApp, /const today\s*=\s*logicalDateString\(\)/);
});

test('면접 목록과 상세도 오전 2시 논리 날짜로 열리고 경계에서 갱신된다', () => {
  for (const source of [templatesApp, templateDetailApp]) {
    assert.match(source, /const date\s*=\s*logicalDateString\(\s*now\(\)\s*\)/);
    assert.match(source, /scheduleLogicalDayRollover\(\s*view,\s*date,\s*now\s*\)/);
  }
});
