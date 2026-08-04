import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

import {
  INTERVIEW_SESSION_KEY,
  buildHomeModel,
  resolveInterviewSession,
  safeReadObject,
} from '../src/home-app.js';
import { resolveDailyPlan } from '../src/daily-plan-core.js';
import { createDefaultWeeklyState, weekMondayKey } from '../src/weekly-plan-core.js';
import { storageKey } from '../src/routine-core.js';

function memoryStorage(entries = {}) {
  const values = new Map(Object.entries(entries));
  return {
    getItem(key) {
      return values.get(key) ?? null;
    },
  };
}

test('오전 2시 전에는 전날의 루틴과 주간 계획을 읽는다', () => {
  const now = new Date(2026, 7, 4, 1, 30);
  const today = '2026-08-03';
  const weekKey = weekMondayKey(today);
  const weekly = createDefaultWeeklyState();
  const plan = resolveDailyPlan(today, weekly);
  const first = plan.items[0];
  const storage = memoryStorage({
    [storageKey('weekly', weekKey)]: JSON.stringify(weekly),
    [storageKey('daily', today)]: JSON.stringify({
      checkedIds: [first.id],
      companies: [],
      planSnapshot: plan,
    }),
  });

  const model = buildHomeModel(storage, now);

  assert.equal(model.today, today);
  assert.equal(model.daily.completed, 1);
  assert.ok(model.daily.total > model.daily.completed);
  assert.doesNotMatch(model.daily.nextSchedule, new RegExp(first.label));
  assert.equal(model.interview.active, false);
  assert.equal(model.interview.href, './interview/?view=difficulty&routine=implementation');
});

test('진행 중인 면접 세션의 현재 질문과 완료율을 복원한다', () => {
  const session = {
    version: 1,
    context: { view: 'difficulty', routineId: 'implementation' },
    questionIds: ['BH-001', 'BH-005', 'BH-006'],
    currentQuestionId: 'BH-005',
    completedQuestionIds: ['BH-001', 'UNKNOWN'],
  };
  const storage = memoryStorage({ [INTERVIEW_SESSION_KEY]: JSON.stringify(session) });

  const model = buildHomeModel(storage, new Date(2026, 7, 4, 12));

  assert.equal(model.interview.active, true);
  assert.equal(model.interview.currentLabel, '현재 질문 · 2 / 3');
  assert.equal(model.interview.completed, 1);
  assert.equal(model.interview.total, 3);
  assert.equal(model.interview.percent, 33);
  assert.equal(
    model.interview.href,
    './interview/?view=difficulty&routine=implementation&question=BH-005',
  );
});

test('전체·확인 필요 보기는 빈 루틴 파라미터 없이 이어간다', () => {
  const session = resolveInterviewSession({
    version: 1,
    context: { view: 'warnings', routineId: '' },
    questionIds: ['FS-001', 'FS-002'],
    currentQuestionId: 'FS-002',
    completedQuestionIds: [],
  });

  assert.equal(session?.href, './interview/?view=warnings&question=FS-002');

  const filteredSession = resolveInterviewSession({
    version: 1,
    context: { view: 'all', routineId: '' },
    filters: { search: 'Redis', category: '이력서 기술' },
    questionIds: ['FS-001', 'FS-002'],
    currentQuestionId: 'FS-001',
    completedQuestionIds: [],
  });

  assert.equal(
    filteredSession?.href,
    './interview/?view=all&search=Redis&category=%EC%9D%B4%EB%A0%A5%EC%84%9C+%EA%B8%B0%EC%88%A0&question=FS-001',
  );
});

test('저장값이 손상되거나 접근이 거부되어도 안전한 기본 모델을 만든다', () => {
  const corrupt = memoryStorage({ [INTERVIEW_SESSION_KEY]: '{not-json' });
  assert.equal(safeReadObject(corrupt, INTERVIEW_SESSION_KEY), null);
  assert.equal(resolveInterviewSession({ version: 1, questionIds: [] }), null);

  const denied = {
    getItem() {
      throw new Error('denied');
    },
  };
  const model = buildHomeModel(denied, new Date(2026, 7, 4, 12));
  assert.equal(model.daily.percent, 0);
  assert.equal(model.weekly.applications, 0);
  assert.equal(model.interview.active, false);
});

test('홈은 데스크톱·모바일 5탭과 토스형 허브 계약을 제공한다', async () => {
  const html = await readFile(new URL('../index.html', import.meta.url), 'utf8');
  assert.match(html, /assets\/site-shell\.css\?v=1[\s\S]*assets\/routine\.css\?v=11/);
  assert.match(html, /id="home-page"/);
  assert.match(html, /id="home-next-schedule"/);
  assert.match(html, /id="home-interview-action"/);
  assert.match(html, /class="mobile-tabbar screen-only"/);
  assert.equal((html.match(/aria-current="page"/g) ?? []).length, 2);
  for (const label of ['오늘', '주간', '면접', '로드맵', '기록']) {
    assert.ok((html.match(new RegExp(`>${label}<`, 'g')) ?? []).length >= 2, `${label} 5탭을 제공해야 한다`);
  }
  assert.doesNotMatch(html, /href="\.\.\//);
  assert.doesNotMatch(html, /<svg\b/i);
});
