import test from 'node:test';
import assert from 'node:assert/strict';
import * as routineData from '../src/routine-data.js';
import * as routineCore from '../src/routine-core.js';
import { dailyProgressFixture } from './fixtures/daily-progress-fixture.mjs';

const { MODES, PLATFORMS, TASK_LIBRARY, getSchedule } = routineData;

const {
  storageKey,
  loadState,
  saveState,
  clearState,
  countPipelineProgress,
  logicalDateString,
  millisecondsUntilNextLogicalDay,
  scheduleLogicalDayRollover,
} = routineCore;

const rows = (mode, runStart = '21') => getSchedule(mode, runStart).map(({ time, label }) => `${time} ${label}`);

test('네 모드는 서로 다른 일정 식별자를 가진다', () => {
  assert.deepEqual(MODES, ['workout', 'normal', 'running', 'maintenance']);
  const signatures = MODES.map((mode) => getSchedule(mode, '21').map((item) => item.id).join('|'));
  assert.equal(new Set(signatures).size, 4);
});

test('22시 러닝은 21시 러닝보다 한 시간 늦다', () => {
  assert.match(getSchedule('running', '21').find((item) => item.id === 'run').time, /^21:00/);
  assert.match(getSchedule('running', '22').find((item) => item.id === 'run').time, /^22:00/);
});

test('운동일 전체 일정을 제공한다', () => {
  assert.deepEqual(rows('workout'), [
    '05:40 기상·운동 준비',
    '06:00–07:30 아침 운동',
    '07:30–08:50 귀가·샤워·아침·식후 20분',
    '08:50–09:20 일정 확인·신규 공고 스캔',
    '09:30–10:00 이력서·포트폴리오 숙지',
    '10:00–12:00 면접 연습·이력서·포트폴리오 개선',
    '13:00–14:00 점심·식후 20분',
    '14:00–16:30 공고 분석·자소서 조정·지원 3~4개',
    '16:30–16:50 휴식·산책',
    '18:50–19:50 저녁·식후 20분',
    '19:50–21:00 면접 복기 또는 프로젝트 실습',
    '21:00–22:00 작업 연장 선택 또는 귀가',
    '22:00–22:30 샤워·정리',
    '22:30–23:00 가벼운 추가 마무리·내일 준비',
    '23:00–24:00 취침',
  ]);
});

test('비운동일 전체 일정을 제공한다', () => {
  assert.deepEqual(rows('normal'), [
    '07:00 기상',
    '07:10–08:20 산책·개인 정비·아침·식후 20분',
    '08:50–09:20 일정 확인·신규 공고 스캔',
    '09:30–10:00 이력서·포트폴리오 숙지',
    '10:00–12:00 면접 연습·이력서·포트폴리오 개선',
    '13:00–14:00 점심·식후 20분',
    '14:00–16:30 공고 분석·자소서 조정·지원 3~4개',
    '16:30–16:50 휴식·산책',
    '18:50–19:50 저녁·식후 20분',
    '19:50–21:30 면접 복기 또는 프로젝트 실습',
    '21:30–22:00 귀가',
    '22:00–22:30 샤워·정리',
    '22:30–23:00 가벼운 추가 마무리·내일 준비',
    '23:00–24:00 취침',
  ]);
});

test('21시 러닝일 전체 일정을 제공한다', () => {
  assert.deepEqual(rows('running', '21'), [
    '07:00 기상',
    '07:10–08:20 산책·개인 정비·아침·식후 20분',
    '08:50–09:20 일정 확인·신규 공고 스캔',
    '09:30–10:00 이력서·포트폴리오 숙지',
    '10:00–12:00 면접 연습·이력서·포트폴리오 개선',
    '13:00–14:00 점심·식후 20분',
    '14:00–16:30 공고 분석·자소서 조정·지원 3~4개',
    '16:30–16:50 휴식·산책',
    '18:50–19:50 저녁·식후 20분',
    '19:50–20:50 가벼운 면접 복기·마감',
    '21:00–22:00 이동 포함 저녁 러닝',
    '22:00–22:30 샤워·정리',
    '22:30–23:00 가벼운 추가 마무리·내일 준비',
    '23:00–24:00 취침',
  ]);
});

test('22시 러닝일 전체 일정을 제공한다', () => {
  assert.deepEqual(rows('running', '22'), [
    '07:00 기상',
    '07:10–08:20 산책·개인 정비·아침·식후 20분',
    '08:50–09:20 일정 확인·신규 공고 스캔',
    '09:30–10:00 이력서·포트폴리오 숙지',
    '10:00–12:00 면접 연습·이력서·포트폴리오 개선',
    '13:00–14:00 점심·식후 20분',
    '14:00–16:30 공고 분석·자소서 조정·지원 3~4개',
    '16:30–16:50 휴식·산책',
    '18:50–19:50 저녁·식후 20분',
    '19:50–21:30 면접 복기 또는 프로젝트 실습',
    '22:00–23:00 이동 포함 저녁 러닝',
    '23:00–23:30 샤워·정리',
    '23:30–24:00 가벼운 추가 마무리·취침 준비',
    '24:00 취침',
  ]);
});

test('핵심 유지일 전체 일정을 제공한다', () => {
  assert.deepEqual(rows('maintenance'), [
    '08:00 기상·회복',
    '08:10–09:00 아침·식후 20분',
    '10:00–10:30 이력서·포트폴리오 숙지',
    '10:30–11:30 마감 임박 공고 확인 및 필요 시 1개 지원',
    '13:00–14:00 점심·식후 20분',
    '17:00–17:30 면접 답변 3개 복기',
    '18:00–19:00 저녁·식후 20분',
    '20:30 이후 완전 휴식',
    '23:00 취침',
  ]);
});

test('일정 항목은 필터와 시간대 메타데이터를 가지며 매번 새 배열로 반환된다', () => {
  const categories = new Set(['exercise', 'career', 'meal']);
  const periods = new Set(['morning', 'afternoon', 'evening', 'night']);
  const first = getSchedule('workout', '21');
  const second = getSchedule('workout', '21');

  assert.notStrictEqual(first, second);
  for (const mode of MODES) {
    for (const item of getSchedule(mode, '21')) {
      assert.ok(categories.has(item.category), `${item.id}의 category가 유효해야 한다`);
      assert.ok(periods.has(item.period), `${item.id}의 period가 유효해야 한다`);
      assert.doesNotMatch(item.time, /(?<!\d)\d{2}:\d{2}[-~]\d{2}:\d{2}/);
    }
  }
});

test('학습 export와 라이브러리 항목을 제거하고 플랫폼을 제공한다', () => {
  assert.equal(Object.hasOwn(routineData, 'LEARNING_TOPICS'), false);
  assert.equal(TASK_LIBRARY.some(({ category }) => category === 'learning'), false);
  assert.deepEqual(PLATFORMS, ['사람인', '점핏', '원티드', '잡코리아', '기타']);
});

test('페이지와 날짜별로 상태를 저장하고 현재 날짜만 지운다', () => {
  const values = new Map();
  const storage = { getItem: (key) => values.get(key) ?? null, setItem: (key, value) => values.set(key, value), removeItem: (key) => values.delete(key) };
  saveState(storage, 'daily', '2026-07-16', { mode: 'workout' });
  saveState(storage, 'daily', '2026-07-15', { mode: 'normal' });
  assert.equal(storageKey('daily', '2026-07-16'), 'job-prep-routine:daily:2026-07-16');
  assert.deepEqual(loadState(storage, 'daily', '2026-07-16', {}), { mode: 'workout' });
  clearState(storage, 'daily', '2026-07-16');
  assert.deepEqual(loadState(storage, 'daily', '2026-07-16', { fresh: true }), { fresh: true });
  assert.deepEqual(loadState(storage, 'daily', '2026-07-15', {}), { mode: 'normal' });
});

test('지원 완료 수와 단계 수를 계산한다', () => {
  const result = countPipelineProgress([
    { analyzed: true, letter: true, applied: true },
    { analyzed: true, letter: false, applied: false },
    {},
    {},
  ]);
  assert.deepEqual(result, { applied: 1, completedSteps: 4, totalSteps: 12 });
});

test('저장 모델에서 현재 모드 일정과 지원 12단계의 완료율을 계산한다', () => {
  assert.equal(typeof routineCore.calculateDailyProgress, 'function');
  assert.deepEqual(routineCore.calculateDailyProgress(dailyProgressFixture), {
    completed: 27,
    total: 27,
    percent: 100,
  });
});

test('전달된 계획 스냅샷 일정을 우선해 완료율을 계산한다', () => {
  const schedule = [
    { id: 'same', label: '유지 일정', category: 'career', startMinute: 600, endMinute: 630 },
    { id: 'learning:Spring', label: '예전 학습 일정', category: 'learning', startMinute: 630, endMinute: 690 },
  ];
  const state = {
    mode: 'workout',
    checkedIds: ['same', getSchedule('workout')[0].id],
    companies: Array.from({ length: 4 }, () => ({})),
    learningTopics: ['Spring'],
  };

  assert.deepEqual(routineCore.calculateDailyProgress(state, schedule), {
    completed: 1,
    total: 13,
    percent: 8,
  });
});

test('오전 2시를 기준으로 하루 기록 날짜를 나눈다', () => {
  assert.equal(logicalDateString(new Date(2026, 6, 18, 1, 59, 59)), '2026-07-17');
  assert.equal(logicalDateString(new Date(2026, 6, 18, 2, 0, 0)), '2026-07-18');
  assert.equal(logicalDateString(new Date(2026, 6, 18, 23, 30, 0)), '2026-07-18');
});

test('다음 오전 2시까지 남은 시간을 계산한다', () => {
  assert.equal(
    millisecondsUntilNextLogicalDay(new Date(2026, 6, 18, 1, 30, 0)),
    30 * 60 * 1000,
  );
  assert.equal(
    millisecondsUntilNextLogicalDay(new Date(2026, 6, 18, 2, 30, 0)),
    23.5 * 60 * 60 * 1000,
  );
});

test('오전 2시에 논리 날짜가 바뀌면 열린 페이지를 한 번 갱신한다', () => {
  let now = new Date(2026, 6, 18, 1, 30, 0);
  let scheduledDelay = 0;
  let scheduledCallback;
  let reloads = 0;
  const view = {
    setTimeout(callback, delay) {
      scheduledCallback = callback;
      scheduledDelay = delay;
      return 17;
    },
    clearTimeout() {},
    location: {
      reload() {
        reloads += 1;
      },
    },
  };

  const cancel = scheduleLogicalDayRollover(view, '2026-07-17', () => now);
  assert.equal(scheduledDelay, 30 * 60 * 1000);
  now = new Date(2026, 6, 18, 2, 0, 0);
  scheduledCallback();
  assert.equal(reloads, 1);
  assert.equal(typeof cancel, 'function');
});

test('절전 뒤 오전 2시가 지나면 다음 입력 전에 열린 페이지를 갱신한다', () => {
  let now = new Date(2026, 6, 18, 1, 30, 0);
  let reloads = 0;
  const viewListeners = new Map();
  const documentListeners = new Map();
  const view = {
    setTimeout() {
      return 17;
    },
    clearTimeout() {},
    addEventListener(type, listener) {
      viewListeners.set(type, listener);
    },
    removeEventListener(type) {
      viewListeners.delete(type);
    },
    document: {
      addEventListener(type, listener) {
        documentListeners.set(type, listener);
      },
      removeEventListener(type) {
        documentListeners.delete(type);
      },
    },
    location: {
      reload() {
        reloads += 1;
      },
    },
  };

  const cancel = scheduleLogicalDayRollover(view, '2026-07-17', () => now);
  now = new Date(2026, 6, 18, 2, 10, 0);
  let prevented = false;
  let stopped = false;
  viewListeners.get('pointerdown')({
    preventDefault() {
      prevented = true;
    },
    stopImmediatePropagation() {
      stopped = true;
    },
  });

  assert.equal(reloads, 1);
  assert.equal(prevented, true);
  assert.equal(stopped, true);
  cancel();
  assert.equal(viewListeners.size, 0);
  assert.equal(documentListeners.size, 0);
});
