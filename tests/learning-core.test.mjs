import { COURSE_CURRICULA } from '../src/learning-curriculum.js';
import { courseUnits, courseWorkSummary, updateStudyCheck, updateUnitChecks, setYouthProgram, addYouthEvent, updateYouthEvent, removeYouthEvent } from '../src/learning-core.js';
import assert from 'node:assert/strict';
import test from 'node:test';

import { COURSES, SPRINT_DAYS } from '../src/learning-data.js';
import {
  LEARNING_STORAGE_KEY,
  selectedCourseSummary, orderedLearningCourses, moveLearningCourse, selectLearningCourse, setCourseDeleted, courseProgressFor, addStudyLog, rescheduleStudyReview, recordStudyReview,
  buildLearningModel,
  createDefaultLearningState,
  loadLearningState,
  saveLearningState,
  setDailyCondition,
  stageLabelsForCourse,
  toggleDailyStep,
  updateCourseProgress,
  sessionFor, sessionGaps, updateLearningSession, completeLearningSession,
  updateLearningDay, learningReviewQueue, recordLearningReview, updateReviewDraft,
  learningCapacity, buildLearningExecution, defaultSelectedDate,
} from '../src/learning-core.js';

function memoryStorage(entries = {}) {
  const values = new Map(Object.entries(entries));
  return {
    getItem(key) { return values.get(key) ?? null; },
    setItem(key, value) { values.set(key, value); },
  };
}

test('Docker Essentials 추가 시 기존 체크·삭제·우선순위를 유지하고 새 목차를 제공한다', () => {
  const id = 'extra-339538', date = '2026-09-11';
  const old = createDefaultLearningState(date);
  delete old.courses[id];
  old.courseOrder = old.courseOrder.filter(key => key !== id).reverse();
  old.courses['35'] = { ...courseProgressFor(old, '35'), inPlan: true, memo: '기존 정리노트' };
  old.courses['19'] = { ...courseProgressFor(old, '19'), deleted: true };
  const restored = loadLearningState(memoryStorage({ [LEARNING_STORAGE_KEY]: JSON.stringify(old) }), date);
  assert.deepEqual(restored.courseOrder, [...old.courseOrder, id]);
  assert.deepEqual(restored.courses['35'], old.courses['35']);
  assert.deepEqual(restored.courses['19'], old.courses['19']);
  assert.equal(courseProgressFor(restored, id).inPlan, false);
  const meta = COURSE_CURRICULA[id], units = courseUnits(id);
  assert.equal(meta.inflearnId, 339538);
  assert.equal(meta.sections.length, 7);
  assert.equal(units.length, 34);
  assert.equal(units.filter(unit => unit.video).length, 28);
  assert.equal(meta.totalSeconds, 14316);
  assert.equal(units.reduce((sum, unit) => sum + unit.seconds, 0), meta.totalSeconds);
});

test('54개 강의를 중복 없이 기록한다', () => {
  assert.equal(COURSES.length, 54);
  assert.equal(new Set(COURSES.map(({ id }) => id)).size, 54);
  assert.deepEqual(
    COURSES
      .map(({ id }) => Number(id))
      .filter(Number.isInteger)
      .sort((left, right) => left - right),
    Array.from({ length: 46 }, (_, index) => index + 1),
  );
  assert.deepEqual(
    Object.fromEntries(['sprint', 'conditional', 'later', 'excluded'].map(
      (status) => [status, COURSES.filter((course) => course.status === status).length],
    )),
    { sprint: 9, conditional: 9, later: 19, excluded: 17 },
  );
});

test('9월 4일부터 17일까지 14일이며 9월 5일을 Day 2로 선택한다', () => {
  assert.equal(SPRINT_DAYS.length, 14);
  assert.equal(SPRINT_DAYS[0].date, '2026-09-04');
  assert.equal(SPRINT_DAYS.at(-1).date, '2026-09-17');
  const model = buildLearningModel(createDefaultLearningState('2026-09-05'), '2026-09-05');
  assert.equal(model.selectedDate, '2026-09-05');
  assert.equal(model.dayNumber, 2);
  assert.equal(model.isToday, true);
  assert.match(model.selectedDay.review, /D\+1/);
  assert.ok(SPRINT_DAYS.some(({ review }) => /D\+3/.test(review)));
  assert.ok(SPRINT_DAYS.some(({ review }) => /D\+7/.test(review)));
});

test('강의 시청·회상·검증 체크와 노트 위치를 전용 키에 왕복 저장한다', () => {
  const storage = memoryStorage();
  let state = createDefaultLearningState('2026-09-05');
  state = updateCourseProgress(state, '35', {
    watched: true,
    processed: true,
    skipped: true,
    enrolled: true,
    noteReference: 'Spring Lv1 정리노트',
  }, '2026-09-05', '2026-09-05');
  saveLearningState(storage, state, '2026-09-05');
  const loaded = loadLearningState(storage, '2026-09-05');

  assert.equal(loaded.courses['35'].watched, true);
  assert.equal(loaded.courses['35'].processed, true);
  assert.equal(loaded.courses['35'].verified, false);
  assert.equal(loaded.courses['35'].skipped, true);
  assert.equal(loaded.courses['35'].enrolled, true);
  assert.equal(loaded.courses['35'].noteReference, 'Spring Lv1 정리노트');
  assert.equal(loaded.courses['35'].updatedDate, '2026-09-05');
  assert.ok(storage.getItem(LEARNING_STORAGE_KEY));
});

test('안 볼 강의 표시는 진척 체크를 지우지 않고 따로 저장한다', () => {
  let state = createDefaultLearningState('2026-09-05');
  state = updateCourseProgress(state, '23', { watched: true }, '2026-09-05', '2026-09-05');
  state = updateCourseProgress(state, '23', { skipped: true }, '2026-09-05', '2026-09-05');

  assert.equal(state.courses['23'].watched, true);
  assert.equal(state.courses['23'].skipped, true);

  state = updateCourseProgress(state, '23', { skipped: false }, '2026-09-05', '2026-09-05');
  assert.equal(state.courses['23'].watched, true);
  assert.equal(state.courses['23'].skipped, false);
});

test('추가 신청 표시는 안 볼 강의 표시와 독립적으로 저장한다', () => {
  let state = createDefaultLearningState('2026-09-05');
  state = updateCourseProgress(state, 'extra-java', {
    skipped: true,
    enrolled: true,
  }, '2026-09-05', '2026-09-05');

  assert.equal(state.courses['extra-java'].skipped, true);
  assert.equal(state.courses['extra-java'].enrolled, true);

  state = updateCourseProgress(state, 'extra-java', { skipped: false }, '2026-09-05', '2026-09-05');
  assert.equal(state.courses['extra-java'].skipped, false);
  assert.equal(state.courses['extra-java'].enrolled, true);
});

test('날짜별 집중 상태와 체화 체크를 저장하고 미완료 항목을 다른 날로 옮기지 않는다', () => {
  let state = createDefaultLearningState('2026-09-05');
  state = setDailyCondition(state, '2026-09-05', 'red', '2026-09-05');
  state = toggleDailyStep(state, '2026-09-05', 'watch', true, '2026-09-05');

  assert.equal(state.daily['2026-09-05'].condition, 'red');
  assert.deepEqual(state.daily['2026-09-05'].checkedSteps, ['watch']);
  assert.equal(state.daily['2026-09-06'], undefined);
});

test('손상되거나 알 수 없는 저장값은 안전한 기본 상태로 정리한다', () => {
  const storage = memoryStorage({ [LEARNING_STORAGE_KEY]: '{broken' });
  assert.deepEqual(loadLearningState(storage, '2026-09-05'), createDefaultLearningState('2026-09-05'));

  storage.setItem(LEARNING_STORAGE_KEY, JSON.stringify({
    selectedDate: '2099-01-01',
    daily: { '2099-01-01': { condition: 'green', checkedSteps: ['watch'] } },
    courses: { unknown: { watched: true } },
  }));
  const loaded = loadLearningState(storage, '2026-09-05');
  assert.equal(loaded.selectedDate, '2026-09-05');
  assert.deepEqual(loaded.daily, {});
  assert.deepEqual(loaded.courses, {});
});

test('강의 모드에 따라 체크 단계 문구를 구분한다', () => {
  assert.deepEqual(stageLabelsForCourse('internalize'), ['핵심 수강', '노트 없이 회상', '코드·설명 통과']);
  assert.deepEqual(stageLabelsForCourse('collect'), ['시청·탐색', '3줄 지도', '재학습 판정']);
});

function verifiedFixture(date = '2026-09-05', completedOn = date) {
  let state = createDefaultLearningState(date);
  state = updateLearningSession(state, date, 1, {
    recall: 'DI는 객체 연결을 외부에서 관리한다. 생성자에서 주입한다. 자기 호출의 경계를 확인한다. 내 서비스에 연결한다.',
    evidence: 'VoteService 메서드 호출 흐름을 따라 프록시 경계를 확인했다.',
    questions: '어디서 주입되나?\n어떤 경계인가?\n실패하면 어떻게 되나?',
    tested: true, explained: true,
  }, completedOn);
  return completeLearningSession(state, date, 1, completedOn);
}

test('이전 강의·취소선·신청·노트·하루 체크를 새 답변 저장 후에도 보존한다', () => {
  const storage = memoryStorage({ [LEARNING_STORAGE_KEY]: JSON.stringify({
    version: 1, selectedDate: '2026-09-05',
    courses: { '34': { watched: true, processed: true, skipped: false, enrolled: true, noteReference: '내 노트', updatedDate: '2026-09-05' } },
    daily: { '2026-09-05': { condition: 'red', checkedSteps: ['watch'] } },
  }) });
  let state = loadLearningState(storage, '2026-09-06');
  state = updateLearningSession(state, '2026-09-06', 1, { recall: '첫 답변' }, '2026-09-06');
  saveLearningState(storage, state, '2026-09-06');
  const restored = loadLearningState(storage, '2026-09-06');
  assert.equal(restored.courses['34'].enrolled, true);
  assert.equal(restored.courses['34'].processed, true);
  assert.equal(restored.courses['34'].noteReference, '내 노트');
  assert.deepEqual(restored.daily['2026-09-05'].checkedSteps, ['watch']);
  assert.equal(restored.sessions['2026-09-06/1'].recall, '첫 답변');
  assert.equal(defaultSelectedDate('2026-09-06'), '2026-09-06');
});

test('시청 체크나 불완전한 답변만으로 검증 완료가 되지 않는다', () => {
  let state = createDefaultLearningState('2026-09-05');
  state = updateCourseProgress(state, '35', { watched: true, processed: true, verified: true }, '2026-09-05');
  state = updateLearningSession(state, '2026-09-05', 1, { tested: true, explained: true }, '2026-09-05');
  state = completeLearningSession(state, '2026-09-05', 1, '2026-09-05');
  assert.equal(buildLearningExecution(state, '2026-09-05').completed.length, 0);
  assert.ok(sessionGaps(sessionFor(state, '2026-09-05')).includes('다음 질문 3개'));
  assert.equal(buildLearningExecution(verifiedFixture(), '2026-09-05').completed.length, 1);
});

test('복습은 계획 날짜가 아닌 실제 검증일에서 시작하고 늦게 답해도 하루에 반복하지 않는다', () => {
  let state = verifiedFixture('2026-09-04', '2026-09-06');
  let queue = learningReviewQueue(state, '2026-09-06');
  assert.equal(queue[0].dueDate, '2026-09-07');
  assert.equal(queue[0].due, false);
  state = recordLearningReview(state, '2026-09-04/1', 1, '내 말로 다시 설명', 'pass', '2026-09-12');
  queue = learningReviewQueue(state, '2026-09-12');
  assert.equal(queue[0].interval, 3);
  assert.equal(queue[0].dueDate, '2026-09-13');
  assert.equal(queue[0].due, false);
});

test('막힌 복습은 내일 다시 보이고 빈 답변·미래 복습은 통과시킬 수 없다', () => {
  let state = verifiedFixture();
  const before = structuredClone(state);
  assert.deepEqual(recordLearningReview(state, '2026-09-05/1', 1, '아직 아님', 'pass', '2026-09-05'), before);
  assert.deepEqual(recordLearningReview(state, '2026-09-05/1', 1, '  ', 'pass', '2026-09-06'), before);
  state = updateReviewDraft(state, '2026-09-05/1', 1, '작성 중 답변', '2026-09-06');
  const storage = memoryStorage(); saveLearningState(storage, state);
  assert.equal(loadLearningState(storage).sessions['2026-09-05/1'].reviewDrafts[1], '작성 중 답변');
  state = recordLearningReview(state, '2026-09-05/1', 1, '프록시 경계에서 막혔다', 'retry', '2026-09-06');
  assert.equal(learningReviewQueue(state, '2026-09-06')[0].dueDate, '2026-09-07');
  assert.equal(learningReviewQueue(state, '2026-09-07')[0].retry, true);
});

test('D+7이 2주 밖이어도 복습을 보존한다', () => {
  let state = verifiedFixture('2026-09-17');
  state = recordLearningReview(state, '2026-09-17/1', 1, '설명', 'pass', '2026-09-18');
  state = recordLearningReview(state, '2026-09-17/1', 3, '설명', 'pass', '2026-09-20');
  assert.equal(learningReviewQueue(state, '2026-09-21')[0].dueDate, '2026-09-24');
});

test('집중 상태가 실제 블록·선택 작업 수를 바꾸며 기존 두 번째 블록을 보존한다', () => {
  assert.deepEqual([learningCapacity('red').blocks, learningCapacity('red').career, learningCapacity('red').collection], [1, false, false]);
  assert.equal(learningCapacity('yellow').blocks, 2);
  assert.equal(learningCapacity('green').collection, true);
  let state = verifiedFixture();
  state = updateLearningSession(state, '2026-09-05', 2, { recall: '두 번째 블록' }, '2026-09-05');
  state = setDailyCondition(state, '2026-09-05', 'red', '2026-09-05');
  assert.equal(state.sessions['2026-09-05/2'].recall, '두 번째 블록');
  assert.equal(buildLearningExecution(state, '2026-09-05').capacity.blocks, 1);
  assert.equal(state.sessions['2026-09-06/1'], undefined);
});

test('안 보기 표시는 활성 핵심 분모에서 빠지고 추가 신청만으로 목표가 늘지 않는다', () => {
  let state = createDefaultLearningState('2026-09-05');
  state = updateCourseProgress(state, '35', { skipped: true }, '2026-09-05');
  state = updateCourseProgress(state, 'extra-java', { enrolled: true }, '2026-09-05');
  assert.equal(buildLearningModel(state).sprint.courseCount, 8);
  assert.equal(buildLearningModel(state).sprint.totalStages, 24);
});

test('답변을 바꾸면 다시 검증하고 보완 메모만 쓰면 원래 복습일을 유지한다', () => {
  const state = verifiedFixture();
  const correction = updateLearningSession(state, '2026-09-05', 1, { correction: '노트 비교' }, '2026-09-06');
  assert.equal(correction.sessions['2026-09-05/1'].completedOn, '2026-09-05');
  const edited = updateLearningSession(state, '2026-09-05', 1, { recall: '수정 답변' }, '2026-09-06');
  assert.equal(edited.sessions['2026-09-05/1'].completedOn, '');
  assert.equal(learningReviewQueue(edited, '2026-09-06').length, 0);
});

test('저장 거부를 호출자에게 알리고 현재 답변은 유지한다', () => {
  let failed = false;
  const state = verifiedFixture();
  const saved = saveLearningState({ setItem() { throw new Error('denied'); } }, state, '2026-09-05', () => { failed = true; });
  assert.equal(failed, true);
  assert.equal(saved.sessions['2026-09-05/1'].recall, state.sessions['2026-09-05/1'].recall);
});


test('추천과 사용자 선택은 별개이며 어느 강의든 원하는 순서로 선택한다', () => {
  let state = createDefaultLearningState('2026-09-06');
  assert.equal(Object.values(state.courses).filter((p) => p.inPlan).length, 0);
  state = selectLearningCourse(state, '4', '2026-09-06');
  state = updateCourseProgress(state, '4', { inPlan: true, skipped: true, enrolled: true, watched: true }, '2026-09-06');
  state = selectLearningCourse(state, '33', '2026-09-06');
  assert.equal(state.selectedCourseId, '33');
  assert.equal(state.courses['4'].inPlan, true);
  assert.equal(state.courses['4'].skipped, true);
  assert.equal(state.courses['4'].enrolled, true);
  assert.equal(state.courses['4'].watched, true);
  assert.deepEqual(state.sessions, {});
});

test('하루에 여러 강의를 자유롭게 기록하고 메모·질문 없이도 저장한다', () => {
  let state = createDefaultLearningState('2026-09-06');
  for (const [index, courseId] of ['4', '33', '23', '4'].entries()) state = addStudyLog(state, courseId, `free-${index}`, '2026-09-06');
  assert.equal(state.studyLogs.length, 4);
  assert.deepEqual(state.studyLogs.map((log) => log.courseId), ['4', '33', '23', '4']);
  assert.ok(state.studyLogs.every((log) => !log.reviewDate));
  assert.ok(Object.values(state.courses).every((p) => !p.verified && !p.inPlan));
});

test('재방문 시 선택·이어 볼 위치·노트·작성 중 메모·복습 날짜를 보존한다', () => {
  const storage = memoryStorage();
  let state = verifiedFixture();
  state = selectLearningCourse(state, '23', '2026-09-06');
  state = updateCourseProgress(state, '23', { noteReference: '검색 노트', position: '매핑 12:30', memo: '매핑 비교', reviewQuestion: 'keyword 차이?', draftReviewDate: '2026-09-10' }, '2026-09-06');
  saveLearningState(storage, state, '2026-09-06');
  state = loadLearningState(storage, '2026-09-07');
  assert.equal(state.selectedCourseId, '23');
  assert.equal(state.courses['23'].memo, '매핑 비교');
  assert.equal(state.courses['23'].draftReviewDate, '2026-09-10');
  state = addStudyLog(state, '23', 'search-1', '2026-09-07', '2026-09-10');
  saveLearningState(storage, state, '2026-09-07');
  state = loadLearningState(storage, '2026-09-07');
  assert.equal(state.studyLogs[0].memo, '매핑 비교');
  assert.equal(state.studyLogs[0].question, 'keyword 차이?');
  assert.equal(state.courses['23'].position, '매핑 12:30');
  assert.equal(state.courses['23'].noteReference, '검색 노트');
  assert.equal(state.courses['23'].memo, '');
  assert.equal(state.courses['23'].draftReviewDate, '');
  assert.equal(state.sessions['2026-09-05/1'].completedOn, '2026-09-05');
});

test('복습일은 직접 조정·해제하며 2주 이후에도 기록을 유지한다', () => {
  let state = addStudyLog(createDefaultLearningState(), '23', 'search-1', '2026-09-17', '2026-09-24');
  state = rescheduleStudyReview(state, 'search-1', '2026-09-30', '2026-09-18');
  assert.equal(state.studyLogs[0].reviewDate, '2026-09-30');
  state = recordStudyReview(state, 'search-1', 'retry', '2026-09-30');
  assert.equal(state.studyLogs[0].reviewDate, '2026-10-01');
  state = recordStudyReview(state, 'search-1', 'done', '2026-10-01');
  assert.equal(state.studyLogs[0].reviewDate, '');
  assert.equal(state.studyLogs[0].reviews.length, 2);
  assert.equal(state.studyLogs[0].date, '2026-09-17');
});

test('강의 위치와 메모를 지운 값도 저장하고 중복 기록 ID는 추가하지 않는다', () => {
  let state = updateCourseProgress(createDefaultLearningState(), '35', { position: '1장', memo: '내용' }, '2026-09-06');
  state = updateCourseProgress(state, '35', { position: '', memo: '' }, '2026-09-06');
  const storage = memoryStorage(); saveLearningState(storage, state);
  state = loadLearningState(storage);
  assert.equal(state.courses['35'].position, '');
  assert.equal(state.courses['35'].memo, '');
  state = addStudyLog(state, '35', 'same-id', '2026-09-06');
  state = addStudyLog(state, '35', 'same-id', '2026-09-06');
  assert.equal(state.studyLogs.length, 1);
});


test('54개 공식 커리큘럼은 강의별 출처를 가지며 영상 시간 합계가 총시간과 일치한다', () => {
  assert.equal(Object.keys(COURSE_CURRICULA).length, COURSES.length);
  for (const course of COURSES) {
    const meta=COURSE_CURRICULA[course.id],units=courseUnits(course.id);
    assert.ok(meta.url.startsWith('https://www.inflearn.com/course/'));
    assert.equal(meta.checkedOn,course.id === 'extra-339538' ? '2026-09-11' : '2026-09-06');
    assert.equal(new Set(units.map(u=>u.id)).size,units.length);
    assert.equal(units.reduce((sum,u)=>sum+(u.seconds||0),0),meta.totalSeconds);
    assert.ok(units.length >= meta.totalUnits);
  }
});
test('영상·정리·회고·적용은 목차별로 독립적이고 자료는 영상 개수에 포함하지 않는다', () => {
  const units=courseUnits('35'),video=units.find(u=>u.video),material=units.find(u=>!u.video);
  let s=createDefaultLearningState();
  s=updateUnitChecks(s,'35',[video.id,material.id,'unknown'],'watched',true,'2026-09-06');
  s=updateUnitChecks(s,'35',[video.id],'organized',true,'2026-09-06');
  assert.equal(courseWorkSummary(s,'35').count,1);
  assert.equal(courseWorkSummary(s,'35').materialCount,1);
  assert.equal(s.courses['35'].unitChecks.unknown,undefined);
  assert.equal(s.courses['35'].unitChecks[video.id].reflected,false);
  s=updateUnitChecks(s,'35',[video.id],'watched',false,'2026-09-06');
  assert.equal(courseWorkSummary(s,'35').count,0);
  assert.equal(s.courses['35'].unitChecks[video.id].organized,true);
});
test('개수·시간·목차 방식은 서로 합산하지 않고 전환 전 입력을 보관한다', () => {
  let s=updateCourseProgress(createDefaultLearningState(),'35',{progressMode:'count',completedCount:3,watchedMinutes:20},'2026-09-06');
  assert.equal(courseWorkSummary(s,'35').count,3);
  s=updateCourseProgress(s,'35',{progressMode:'minutes'},'2026-09-06');
  assert.equal(courseWorkSummary(s,'35').minutes,20);
  s=updateCourseProgress(s,'35',{progressMode:'curriculum'},'2026-09-06');
  assert.equal(courseWorkSummary(s,'35').count,0);
  assert.equal(s.courses['35'].completedCount,3);
  s=updateCourseProgress(s,'35',{progressMode:'count',completedCount:99999},'2026-09-06');
  assert.equal(courseWorkSummary(s,'35').percent,100);
});
test('기존 체크는 새 체크로 추정하지 않고 학습 기록에는 그 시점의 상태를 남긴다', () => {
  const storage=memoryStorage();let s=updateCourseProgress(createDefaultLearningState(),'34',{watched:true,processed:true},'2026-09-06');
  assert.equal(s.courses['34'].studyChecks.organized,false);
  s=updateStudyCheck(s,'34','organized',true,'2026-09-06');
  s=addStudyLog(s,'34','snapshot','2026-09-06');
  s=updateStudyCheck(s,'34','organized',false,'2026-09-06');
  saveLearningState(storage,s);s=loadLearningState(storage);
  assert.equal(s.studyLogs[0].checks.organized,true);
  assert.equal(s.courses['34'].studyChecks.organized,false);
  assert.equal(s.courses['34'].processed,true);
});
test('청년프로그램 유무·날짜·시간·참여가 복원되고 없음 선택도 기존 일정을 지우지 않는다', () => {
  let s=setYouthProgram(createDefaultLearningState(),{choice:'yes',draft:{date:'2026-09-09',start:'13:00',end:'15:00'}},'2026-09-06');
  s=addYouthEvent(s,{id:'p1',...s.youthProgram.draft},'2026-09-06');
  assert.equal(s.youthProgram.events[0].name,'청년프로그램');
  assert.equal(s.youthProgram.draft.date,'');
  s=updateYouthEvent(s,'p1',{attended:true,date:'2026-09-10'},'2026-09-06');
  s=setYouthProgram(s,{choice:'no'},'2026-09-06');
  const storage=memoryStorage();saveLearningState(storage,s);s=loadLearningState(storage);
  assert.equal(s.youthProgram.choice,'no');assert.equal(s.youthProgram.events[0].attended,true);
  s=setYouthProgram(s,{choice:'yes'},'2026-09-06');
  assert.equal(s.youthProgram.events[0].date,'2026-09-10');
  s=removeYouthEvent(s,'p1','2026-09-06');assert.equal(s.youthProgram.events.length,0);
});
test('뒤집힌 시간·중복 프로그램은 거부하고 잘못된 편집으로 기존 일정을 잃지 않는다', () => {
  let s=setYouthProgram(createDefaultLearningState(),{choice:'yes'},'2026-09-06');
  const event={id:'p1',date:'2026-09-09',start:'13:00',end:'15:00'};
  s=addYouthEvent(s,{...event,end:'12:00'},'2026-09-06');assert.equal(s.youthProgram.events.length,0);
  s=addYouthEvent(s,event,'2026-09-06');s=addYouthEvent(s,{...event,id:'p2'},'2026-09-06');assert.equal(s.youthProgram.events.length,1);
  s=updateYouthEvent(s,'p1',{end:'12:00'},'2026-09-06');assert.equal(s.youthProgram.events[0].end,'15:00');
});

test('섹션 체크와 취소는 해당 단계에만 적용되며 기록 시점의 목차 개수를 보존한다', () => {
  const ids=COURSE_CURRICULA['35'].sections[0].units.map(u=>u.id);
  let s=updateUnitChecks(createDefaultLearningState(),'35',ids,'watched',true,'2026-09-06');
  s=updateUnitChecks(s,'35',ids,'organized',true,'2026-09-06');
  s=addStudyLog(s,'35','unit-snapshot','2026-09-06');
  s=updateUnitChecks(s,'35',ids,'watched',false,'2026-09-06');
  const storage=memoryStorage();saveLearningState(storage,s);s=loadLearningState(storage);
  assert.equal(courseWorkSummary(s,'35').count,0);
  assert.equal(courseWorkSummary(s,'35').unitStageCounts.organized,ids.length);
  assert.equal(s.studyLogs[0].unitStageSnapshot.watched,ids.length);
});

test('요청한 다섯 링크가 해당 강의에 중복 없이 연결된다', () => {
  const entries=Object.entries(COURSE_CURRICULA).filter(([,c])=>c.dashboardUrl);
  assert.equal(entries.length,5);
  assert.deepEqual(Object.fromEntries(entries.map(([id,c])=>[c.inflearnId,id])),{
    342699:'extra-342699',340328:'extra-340328',339298:'45',340020:'15',339538:'extra-339538'
  });
  for(const [,c] of entries) assert.equal(Number(new URL(c.dashboardUrl).searchParams.get('cid')),c.inflearnId);
});

test('삭제를 저장한 뒤 불러오고 복원해도 체크·노트·기록·복습 날짜를 보존한다', () => {
  const date='2026-09-06', id='35', storage=memoryStorage();
  let state=updateCourseProgress(createDefaultLearningState(),id,{inPlan:true,enrolled:true,skipped:true,noteReference:'https://example.com/note',memo:'핵심 기록',position:'2장'},date);
  state=updateUnitChecks(state,id,[courseUnits(id)[0].id],'organized',true,date);
  state=addStudyLog(state,id,'delete-preserve',date,'2026-09-07');
  state=selectLearningCourse(state,id,date);
  const original=courseProgressFor(state,id), logs=structuredClone(state.studyLogs);
  state=setCourseDeleted(state,id,true,date);
  assert.notEqual(state.selectedCourseId,id);
  saveLearningState(storage,state,date);
  state=loadLearningState(storage,date);
  assert.equal(courseProgressFor(state,id).deleted,true);
  assert.deepEqual(state.studyLogs,logs);
  assert.notEqual(selectLearningCourse(state,id,date).selectedCourseId,id);
  assert.equal(addStudyLog(state,id,'blocked',date).studyLogs.length,1);
  state=setCourseDeleted(state,id,false,date);
  assert.deepEqual(courseProgressFor(state,id),original);
  assert.deepEqual(state.studyLogs,logs);
  assert.equal(selectLearningCourse(state,id,date).selectedCourseId,id);
});

test('마지막 강의를 삭제하면 선택을 비우고 복원 후 다시 선택할 수 있다', () => {
  const date='2026-09-06';
  let state=selectLearningCourse(createDefaultLearningState(),COURSES[0].id,date);
  for(const course of COURSES) state=setCourseDeleted(state,course.id,true,date);
  assert.equal(state.selectedCourseId,'');
  assert.ok(COURSES.every(c=>courseProgressFor(state,c.id).deleted));
  assert.deepEqual(setCourseDeleted(state,'unknown',true,date),state);
  state=setCourseDeleted(state,'35',false,date);
  assert.equal(selectLearningCourse(state,'35',date).selectedCourseId,'35');
});

test('우선순위를 양방향으로 옮겨 저장해도 체크·노트·선택·기록을 보존한다', () => {
  const date='2026-09-06', storage=memoryStorage();
  let state=updateCourseProgress(createDefaultLearningState(),'35',{inPlan:true,noteReference:'https://example.com/note',memo:'보존'},date);
  state=addStudyLog(state,'35','priority-log',date,'2026-09-07');
  state=selectLearningCourse(state,'35',date);
  const before=structuredClone(state);
  const first=state.courseOrder[0];
  state=moveLearningCourse(state,'35',first,'before',date);
  assert.equal(state.courseOrder[0],'35');
  state=saveLearningState(storage,state,date);
  state=loadLearningState(storage,date);
  assert.equal(orderedLearningCourses(state)[0].id,'35');
  assert.deepEqual(state.courses,before.courses);
  assert.deepEqual(state.studyLogs,before.studyLogs);
  assert.equal(state.selectedCourseId,before.selectedCourseId);
  state=moveLearningCourse(state,'35','33','after',date);
  assert.equal(state.courseOrder.indexOf('35'),state.courseOrder.indexOf('33')+1);
  assert.equal(new Set(state.courseOrder).size,COURSES.length);
});

test('우선순위는 중복·손상된 순서를 복구하고 숨긴 강의의 상대 순서를 유지한다', () => {
  const date='2026-09-06', storage=memoryStorage({[LEARNING_STORAGE_KEY]:JSON.stringify({courseOrder:['35','35','unknown','33']})});
  let state=loadLearningState(storage,date);
  assert.deepEqual(state.courseOrder.slice(0,2),['35','33']);
  assert.equal(state.courseOrder.length,COURSES.length);
  const untouched=state.courseOrder.filter(id=>!['35','15'].includes(id));
  state=moveLearningCourse(state,'15','35','before',date);
  assert.deepEqual(state.courseOrder.filter(id=>!['35','15'].includes(id)),untouched);
  const original=structuredClone(state.courseOrder);
  state=setCourseDeleted(state,'15',true,date);
  assert.deepEqual(moveLearningCourse(state,'15','35','after',date),state);
  state=setCourseDeleted(state,'15',false,date);
  assert.deepEqual(state.courseOrder,original);
  for(const args of [['35','35','before'],['unknown','35','before'],['35','33','invalid']]) {
    assert.deepEqual(moveLearningCourse(state,...args,date),state);
  }
});

test('선택 강의 총시간은 전체 영상시간을 합산하고 해제·삭제·복원을 반영한다', () => {
  const date='2026-09-10';
  let state=createDefaultLearningState(date);
  assert.deepEqual(selectedCourseSummary(state),{count:0,totalSeconds:0});
  for (const id of ['35','33']) state=updateCourseProgress(state,id,{inPlan:true},date,date);
  const expected=COURSE_CURRICULA['35'].totalSeconds+COURSE_CURRICULA['33'].totalSeconds;
  assert.deepEqual(selectedCourseSummary(state),{count:2,totalSeconds:expected});
  state=updateCourseProgress(state,'35',{skipped:true,progressMode:'minutes',watchedMinutes:50},date,date);
  state=updateCourseProgress(state,'15',{enrolled:true},date,date);
  state=moveLearningCourse(state,'33','35','before',date);
  assert.deepEqual(selectedCourseSummary(state),{count:2,totalSeconds:expected});
  state=setCourseDeleted(state,'35',true,date);
  assert.deepEqual(selectedCourseSummary(state),{count:1,totalSeconds:COURSE_CURRICULA['33'].totalSeconds});
  state=setCourseDeleted(state,'35',false,date);
  const storage=memoryStorage();saveLearningState(storage,state,date);
  assert.deepEqual(selectedCourseSummary(loadLearningState(storage,date)),{count:2,totalSeconds:expected});
  state=updateCourseProgress(state,'33',{inPlan:false},date,date);
  assert.deepEqual(selectedCourseSummary(state),{count:1,totalSeconds:COURSE_CURRICULA['35'].totalSeconds});
});
