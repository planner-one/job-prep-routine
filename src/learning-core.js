import { COURSE_CURRICULA } from './learning-curriculum.js?v=15';
import {
  COURSES,
  LEARNING_SPRINT_END,
  LEARNING_SPRINT_START,
  ROUTINE_STEPS,
  SPRINT_DAYS,
} from './learning-data.js?v=15';
import { localDateString, parseLocalDateKey } from './routine-core.js';

export const LEARNING_STORAGE_KEY = 'job-prep-routine:learning-sprint.v1';
export const LEARNING_SCHEMA_VERSION = 1;

const COURSE_IDS = new Set(COURSES.map(({ id }) => id));
const SPRINT_DATES = new Set(SPRINT_DAYS.map(({ date }) => date));
const STEP_IDS = new Set(ROUTINE_STEPS.map(({ id }) => id));
const CONDITIONS = new Set(['green', 'yellow', 'red']);
const COURSE_STAGES = ['watched', 'processed', 'verified'];
const WORK_FIELDS = ['position', 'memo', 'reviewQuestion', 'courseUrl', 'draftReviewDate'];

function objectValue(value) {
  return value && typeof value === 'object' && !Array.isArray(value) ? value : {};
}

function validDate(value, fallback) {
  return SPRINT_DATES.has(value) ? value : fallback;
}

export function defaultSelectedDate(today = LEARNING_SPRINT_START) {
  if (today < LEARNING_SPRINT_START) return LEARNING_SPRINT_START;
  if (today > LEARNING_SPRINT_END) return LEARNING_SPRINT_END;
  return validDate(today, LEARNING_SPRINT_START);
}

export function createDefaultLearningState(today = LEARNING_SPRINT_START) {
  return {
    version: LEARNING_SCHEMA_VERSION,
    selectedDate: defaultSelectedDate(today),
    daily: {},
    courses: {},
    courseOrder: COURSES.map(c => c.id),
    sessions: {},
    selectedCourseId: '',
    studyLogs: [],
    youthProgram: normalizeYouthProgram(),
  };
}

function normalizeDaily(candidate) {
  const source = objectValue(candidate);
  return Object.fromEntries(Object.entries(source).flatMap(([date, value]) => {
    if (!SPRINT_DATES.has(date)) return [];
    const day = objectValue(value);
    const checkedSteps = Array.isArray(day.checkedSteps)
      ? [...new Set(day.checkedSteps.filter((id) => STEP_IDS.has(id)))]
      : [];
    return [[date, {
      condition: CONDITIONS.has(day.condition) ? day.condition : 'yellow',
      checkedSteps,
      recall: textValue(day.recall),
      career: textValue(day.career),
      collection: {
        topic: textValue(day.collection?.topic),
        problem: textValue(day.collection?.problem),
        structure: textValue(day.collection?.structure),
        location: textValue(day.collection?.location),
        priority: ['A', 'B', 'C'].includes(day.collection?.priority) ? day.collection.priority : 'B',
      },
    }]];
  }));
}

function normalizeCourses(candidate) {
  const source = objectValue(candidate);
  return Object.fromEntries(Object.entries(source).flatMap(([id, value]) => {
    if (!COURSE_IDS.has(id)) return [];
    const progress = objectValue(value);
    const next = Object.fromEntries(COURSE_STAGES.map((stage) => [stage, progress[stage] === true]));
    next.deleted = progress.deleted === true;
    next.skipped = progress.skipped === true;
    next.enrolled = progress.enrolled === true;
    next.inPlan = progress.inPlan === true;
    for (const key of WORK_FIELDS) next[key] = textValue(progress[key]);
    next.noteReference = typeof progress.noteReference === 'string'
      ? progress.noteReference.trim().slice(0, 500)
      : '';
    next.updatedDate = /^\d{4}-\d{2}-\d{2}$/.test(progress.updatedDate ?? '')
      ? progress.updatedDate
      : '';
    Object.assign(next, normalizeCourseWork(progress));
    return [[id, next]];
  }));
}

function normalizeCourseOrder(value) {
  const known = Array.isArray(value) ? value.filter(id => COURSE_IDS.has(id)) : [];
  return [...new Set([...known, ...COURSES.map(c => c.id)])];
}

export function orderedLearningCourses(state) {
  const byId = new Map(COURSES.map(c => [c.id,c]));
  return normalizeCourseOrder(state?.courseOrder).map(id => byId.get(id));
}

export function selectedCourseSummary(state) {
  const selected = orderedLearningCourses(state).filter(course => {
    const progress = courseProgressFor(state,course.id);
    return progress.inPlan && !progress.deleted;
  });
  return {
    count: selected.length,
    totalSeconds: selected.reduce((sum,course) => sum + (COURSE_CURRICULA[course.id]?.totalSeconds || 0), 0),
  };
}

export function moveLearningCourse(state, courseId, targetId, placement, today) {
  const next = normalizeLearningState(state, today);
  if (courseId === targetId || !COURSE_IDS.has(courseId) || !COURSE_IDS.has(targetId)
      || !['before','after'].includes(placement) || courseProgressFor(next,courseId).deleted
      || courseProgressFor(next,targetId).deleted) return next;
  const order = next.courseOrder.filter(id => id !== courseId);
  order.splice(order.indexOf(targetId) + (placement === 'after' ? 1 : 0), 0, courseId);
  next.courseOrder = order;
  return next;
}

export function normalizeLearningState(candidate = {}, today = LEARNING_SPRINT_START) {
  const source = objectValue(candidate);
  return {
    version: LEARNING_SCHEMA_VERSION,
    selectedDate: validDate(source.selectedDate, defaultSelectedDate(today)),
    daily: normalizeDaily(source.daily),
    courses: normalizeCourses(source.courses),
    courseOrder: normalizeCourseOrder(source.courseOrder),
    sessions: normalizeSessions(source.sessions),
    selectedCourseId: COURSE_IDS.has(source.selectedCourseId) && !source.courses?.[source.selectedCourseId]?.deleted ? source.selectedCourseId : '',
    studyLogs: normalizeStudyLogs(source.studyLogs),
    youthProgram: normalizeYouthProgram(source.youthProgram),
  };
}

export function loadLearningState(storage, today = LEARNING_SPRINT_START) {
  try {
    const raw = storage?.getItem?.(LEARNING_STORAGE_KEY);
    return normalizeLearningState(raw ? JSON.parse(raw) : {}, today);
  } catch {
    return createDefaultLearningState(today);
  }
}

export function saveLearningState(storage, state, today = LEARNING_SPRINT_START, onError = () => {}) {
  const normalized = normalizeLearningState(state, today);
  try {
    if (!storage?.setItem) throw new Error('저장소를 사용할 수 없습니다.');
    storage.setItem(LEARNING_STORAGE_KEY, JSON.stringify(normalized));
  } catch (error) {
    onError(error);
  }
  return normalized;
}

export function stageLabelsForCourse(mode) {
  if (mode === 'collect') return ['시청·탐색', '3줄 지도', '재학습 판정'];
  if (mode === 'career') return ['시청', '당일 적용', '답변·서류 반영'];
  if (mode === 'apply') return ['핵심 수강', '프로젝트 연결', '검증 완료'];
  return ['핵심 수강', '노트 없이 회상', '코드·설명 통과'];
}

export function courseProgressFor(state, courseId) {
  const progress = objectValue(state?.courses?.[courseId]);
  return {
    ...normalizeCourseWork(progress),
    watched: progress.watched === true,
    processed: progress.processed === true,
    verified: progress.verified === true,
    deleted: progress.deleted === true,
    skipped: progress.skipped === true,
    enrolled: progress.enrolled === true,
    inPlan: progress.inPlan === true,
    ...Object.fromEntries(WORK_FIELDS.map((key) => [key, textValue(progress[key])])),
    noteReference: typeof progress.noteReference === 'string' ? progress.noteReference : '',
    updatedDate: typeof progress.updatedDate === 'string' ? progress.updatedDate : '',
  };
}

export function courseProgressCount(state, courses = COURSES) {
  return courses.reduce((sum, course) => {
    const progress = courseProgressFor(state, course.id);
    return sum + COURSE_STAGES.filter((stage) => progress[stage]).length;
  }, 0);
}

export function buildLearningModel(candidate, today = LEARNING_SPRINT_START) {
  const state = normalizeLearningState(candidate, today);
  const selectedDate = state.selectedDate;
  const selectedDay = SPRINT_DAYS.find(({ date }) => date === selectedDate) ?? SPRINT_DAYS[0];
  const sprintCourses = COURSES.filter((course) => course.status === 'sprint' && !courseProgressFor(state, course.id).skipped);
  const completedCourseStages = courseProgressCount(state);
  const totalCourseStages = COURSES.length * COURSE_STAGES.length;
  const sprintCompletedStages = courseProgressCount(state, sprintCourses);
  const totalSprintStages = sprintCourses.length * COURSE_STAGES.length;
  const daily = state.daily[selectedDate] ?? { condition: 'yellow', checkedSteps: [] };

  return {
    state,
    today,
    selectedDate,
    selectedDay,
    daily,
    dayNumber: SPRINT_DAYS.findIndex(({ date }) => date === selectedDate) + 1,
    totalDays: SPRINT_DAYS.length,
    isToday: selectedDate === today,
    sprint: {
      courseCount: sprintCourses.length,
      completedStages: sprintCompletedStages,
      totalStages: totalSprintStages,
      percent: totalSprintStages ? Math.round((sprintCompletedStages / totalSprintStages) * 100) : 0,
    },
    all: {
      courseCount: COURSES.length,
      completedStages: completedCourseStages,
      totalStages: totalCourseStages,
    },
  };
}

export function toggleDailyStep(state, date, stepId, checked, today = LEARNING_SPRINT_START) {
  const next = normalizeLearningState(state, today);
  if (!SPRINT_DATES.has(date) || !STEP_IDS.has(stepId)) return next;
  const current = next.daily[date] ?? { condition: 'yellow', checkedSteps: [] };
  const values = new Set(current.checkedSteps);
  checked ? values.add(stepId) : values.delete(stepId);
  next.daily[date] = { ...current, checkedSteps: [...values] };
  return next;
}

export function setDailyCondition(state, date, condition, today = LEARNING_SPRINT_START) {
  const next = normalizeLearningState(state, today);
  if (!SPRINT_DATES.has(date) || !CONDITIONS.has(condition)) return next;
  const current = next.daily[date] ?? { condition: 'yellow', checkedSteps: [] };
  next.daily[date] = { ...current, condition };
  return next;
}

export function updateCourseProgress(state, courseId, patch, updatedDate, today = LEARNING_SPRINT_START) {
  const next = normalizeLearningState(state, today);
  if (!COURSE_IDS.has(courseId)) return next;
  const current = courseProgressFor(next, courseId);
  const source = objectValue(patch);
  for (const stage of COURSE_STAGES) {
    if (typeof source[stage] === 'boolean') current[stage] = source[stage];
  }
  Object.assign(current, normalizeCourseWork({ ...current, ...source }));
  if (typeof source.skipped === 'boolean') current.skipped = source.skipped;
  if (typeof source.enrolled === 'boolean') current.enrolled = source.enrolled;
  if (typeof source.inPlan === 'boolean') current.inPlan = source.inPlan;
  for (const key of WORK_FIELDS) if (typeof source[key] === 'string') current[key] = textValue(source[key]);
  if (typeof source.noteReference === 'string') current.noteReference = source.noteReference.trim().slice(0, 500);
  current.updatedDate = /^\d{4}-\d{2}-\d{2}$/.test(updatedDate ?? '') ? updatedDate : current.updatedDate;
  next.courses[courseId] = current;
  return next;
}

const SESSION_FIELDS = ['question', 'recall', 'evidence', 'questions', 'correction'];
export const REVIEW_INTERVALS = [1, 3, 7];

function textValue(value) {
  return typeof value === 'string' ? value.slice(0, 6000) : '';
}

function normalizedSession(candidate) {
  const source = objectValue(candidate);
  return {
    ...Object.fromEntries(SESSION_FIELDS.map((key) => [key, textValue(source[key])])),
    courseId: COURSE_IDS.has(source.courseId) ? source.courseId : '',
    tested: source.tested === true,
    explained: source.explained === true,
    completedOn: parseLocalDateKey(source.completedOn) ? source.completedOn : '',
    reviewDrafts: Object.fromEntries(REVIEW_INTERVALS.map((interval) => [interval, textValue(source.reviewDrafts?.[interval])])),
    reviews: Object.fromEntries(REVIEW_INTERVALS.flatMap((interval) => {
      const review = objectValue(source.reviews?.[interval]);
      return parseLocalDateKey(review.reviewedOn) && ['pass', 'retry'].includes(review.result)
        ? [[interval, { answer: textValue(review.answer), result: review.result, reviewedOn: review.reviewedOn }]] : [];
    })),
  };
}

function normalizeSessions(candidate) {
  return Object.fromEntries(Object.entries(objectValue(candidate)).flatMap(([id, record]) => {
    const [date, slot] = id.split('/');
    return SPRINT_DATES.has(date) && ['1', '2'].includes(slot) && id === `${date}/${slot}`
      ? [[id, normalizedSession(record)]] : [];
  }));
}

export function sessionFor(state, date, slot = 1) {
  const session = normalizedSession(state.sessions?.[`${date}/${slot}`]);
  const plan = SPRINT_DAYS.find((item) => item.date === date) ?? SPRINT_DAYS[0];
  if (!session.question) session.question = slot === 1 ? plan.question : `${plan.focus}: 내 프로젝트의 실패 조건과 대안은 무엇인가?`;
  return session;
}

export function sessionGaps(session) {
  const gaps = [];
  if (!session.question.trim()) gaps.push('질문');
  if (!session.recall.trim()) gaps.push('내 말로 설명한 답변');
  if (!session.evidence.trim()) gaps.push('코드·실험 근거');
  if (session.questions.split('\n').filter((line) => line.trim()).length < 3) gaps.push('다음 질문 3개');
  if (!session.tested) gaps.push('코드 확인');
  if (!session.explained) gaps.push('90초 설명');
  return gaps;
}

export function updateLearningSession(state, date, slot, patch, today) {
  const next = normalizeLearningState(state, today);
  if (!SPRINT_DATES.has(date) || ![1, 2].includes(slot)) return next;
  const current = sessionFor(next, date, slot);
  // 보완 메모 외의 근거를 바꾸면 다시 검증해야 합니다. 기존 복습 기록은 보존합니다.
  const changedEvidence = [...SESSION_FIELDS.filter((key) => key !== 'correction'), 'tested', 'explained', 'courseId']
    .some((key) => key in patch && patch[key] !== current[key]);
  next.sessions[`${date}/${slot}`] = normalizedSession({
    ...current, ...patch,
    completedOn: changedEvidence ? '' : current.completedOn,
    reviews: current.reviews,
  });
  return next;
}

export function completeLearningSession(state, date, slot, today) {
  const next = normalizeLearningState(state, today);
  const session = sessionFor(next, date, slot);
  if (!SPRINT_DATES.has(date) || ![1, 2].includes(slot) || date > today || sessionGaps(session).length) return next;
  if (!session.completedOn) next.sessions[`${date}/${slot}`] = { ...session, completedOn: today, reviews: {} };
  return next;
}

export function updateLearningDay(state, date, patch, today) {
  const next = normalizeLearningState(state, today);
  if (!SPRINT_DATES.has(date)) return next;
  const current = next.daily[date] ?? { condition: 'yellow', checkedSteps: [] };
  next.daily[date] = { ...current, ...patch, collection: { ...current.collection, ...patch.collection } };
  return normalizeLearningState(next, today);
}

export function addLearningDays(dateKey, amount) {
  const date = parseLocalDateKey(dateKey);
  if (!date) return '';
  date.setDate(date.getDate() + amount);
  return localDateString(date);
}

export function learningReviewQueue(state, today) {
  return Object.entries(state.sessions ?? {}).flatMap(([id, session]) => {
    if (!session.completedOn || sessionGaps(session).length) return [];
    let previousReview = '';
    for (const interval of REVIEW_INTERVALS) {
      const record = session.reviews?.[interval];
      if (record?.result === 'pass') { previousReview = record.reviewedOn; continue; }
      let dueDate = addLearningDays(session.completedOn, interval);
      if (previousReview) dueDate = [dueDate, addLearningDays(previousReview, 1)].sort().at(-1);
      if (record?.result === 'retry') dueDate = addLearningDays(record.reviewedOn, 1);
      return [{ id, interval, dueDate, session, due: dueDate <= today, retry: record?.result === 'retry' }];
    }
    return [];
  }).sort((left, right) => left.dueDate.localeCompare(right.dueDate) || left.id.localeCompare(right.id));
}

export function recordLearningReview(state, sessionId, interval, answer, result, today) {
  const next = normalizeLearningState(state, today);
  const item = learningReviewQueue(next, today).find((review) => review.id === sessionId && review.interval === interval && review.due);
  if (!item || !answer.trim() || !['pass', 'retry'].includes(result)) return next;
  next.sessions[sessionId].reviews[interval] = { answer: textValue(answer), result, reviewedOn: today };
  next.sessions[sessionId].reviewDrafts[interval] = '';
  return next;
}

export function updateReviewDraft(state, sessionId, interval, answer, today) {
  const next = normalizeLearningState(state, today);
  if (next.sessions[sessionId] && REVIEW_INTERVALS.includes(interval)) next.sessions[sessionId].reviewDrafts[interval] = textValue(answer);
  return next;
}

export function learningCapacity(condition) {
  if (condition === 'red') return { blocks: 1, collection: false, career: false, label: '최소 루틴', minutes: '85–105분', guide: '전날 회상 15분 + 체화 1개 60–80분 + 질문 정리 10분. 여기까지 해도 오늘은 충분합니다.' };
  return { blocks: 2, collection: condition === 'green', career: true, label: condition === 'green' ? '확장 루틴' : '기본 루틴', minutes: condition === 'green' ? '235–285분' : '175–225분', guide: `회상 15분 + 체화 2개 + 취업 적용 30–40분 + 마감 10분${condition === 'green' ? ' + 수집 60분' : '. 수집은 쉬어갑니다.'}` };
}

export function buildLearningExecution(state, today) {
  const normalized = normalizeLearningState(state, today);
  const date = normalized.selectedDate;
  const capacity = learningCapacity(normalized.daily[date]?.condition ?? 'yellow');
  const completed = Object.entries(normalized.sessions).filter(([, session]) => session.completedOn && !sessionGaps(session).length);
  const queue = learningReviewQueue(normalized, today);
  const nextSlot = Array.from({ length: capacity.blocks }, (_, index) => index + 1)
    .find((slot) => !sessionFor(normalized, date, slot).completedOn);
  return { capacity, completed, queue, due: queue.filter((review) => review.due), nextSlot, todayCompleted: completed.filter(([id]) => id.startsWith(`${date}/`)).length };
}

// 자유 학습은 날짜별 두 슬롯과 별도로 보존합니다. 추천 순서와 기록 개수 제한이 없습니다.
function normalizeStudyLogs(candidate) {
  if (!Array.isArray(candidate)) return [];
  const seen = new Set();
  return candidate.flatMap((item) => {
    const source = objectValue(item);
    if (typeof source.id !== 'string' || seen.has(source.id) || !COURSE_IDS.has(source.courseId) || !parseLocalDateKey(source.date)) return [];
    seen.add(source.id);
    return [{ id: source.id, courseId: source.courseId, date: source.date,
      position: textValue(source.position), memo: textValue(source.memo), question: textValue(source.question),
      progressSnapshot: textValue(source.progressSnapshot), checks: normalizeChecks(source.checks),
      unitStageSnapshot: source.unitStageSnapshot ? Object.fromEntries(CHECK_KEYS.map(key=>[key,finiteCount(source.unitStageSnapshot[key])])) : null,
      reviewDate: parseLocalDateKey(source.reviewDate) ? source.reviewDate : '',
      reviews: Array.isArray(source.reviews) ? source.reviews.filter((r) => r && parseLocalDateKey(r.date) && ['done', 'retry'].includes(r.result)).map((r) => ({ date: r.date, result: r.result })) : [],
    }];
  });
}

export function selectLearningCourse(state, courseId, today) {
  const next = normalizeLearningState(state, today);
  if (courseId === '' || (COURSE_IDS.has(courseId) && !courseProgressFor(next, courseId).deleted)) next.selectedCourseId = courseId;
  return next;
}

// 목록에서만 삭제합니다. 체크·노트·기록과 예약한 복습은 복원할 수 있게 보존합니다.
export function setCourseDeleted(state, courseId, deleted, today) {
  const next = normalizeLearningState(state, today);
  if (!COURSE_IDS.has(courseId) || typeof deleted !== 'boolean') return next;
  next.courses[courseId] = { ...courseProgressFor(next, courseId), deleted };
  if (deleted && next.selectedCourseId === courseId) {
    const available = orderedLearningCourses(next).filter(c => !courseProgressFor(next, c.id).deleted);
    next.selectedCourseId = available.find(c => courseProgressFor(next, c.id).inPlan)?.id || available[0]?.id || '';
  }
  return next;
}

export function addStudyLog(state, courseId, id, date, reviewDate = '') {
  const next = normalizeLearningState(state, date);
  if (!COURSE_IDS.has(courseId) || courseProgressFor(next, courseId).deleted || !parseLocalDateKey(date) || !id || next.studyLogs.some((log) => log.id === id)) return next;
  const draft = courseProgressFor(next, courseId);
  next.studyLogs.push({ id, courseId, date, position: draft.position, memo: draft.memo, question: draft.reviewQuestion,
    reviewDate: parseLocalDateKey(reviewDate) ? reviewDate : '', reviews: [],
    progressSnapshot: courseWorkSummary(next, courseId).label, checks: { ...draft.studyChecks },
    unitStageSnapshot: draft.progressMode === 'curriculum' ? courseWorkSummary(next, courseId).unitStageCounts : null });
  next.courses[courseId] = { ...draft, memo: '', reviewQuestion: '', draftReviewDate: '', updatedDate: date };
  return next;
}

export function rescheduleStudyReview(state, id, reviewDate, today) {
  const next = normalizeLearningState(state, today);
  const log = next.studyLogs.find((item) => item.id === id);
  if (log && (reviewDate === '' || parseLocalDateKey(reviewDate))) log.reviewDate = reviewDate;
  return next;
}

export function recordStudyReview(state, id, result, today) {
  const next = normalizeLearningState(state, today);
  const log = next.studyLogs.find((item) => item.id === id);
  if (!log || !['done', 'retry'].includes(result) || !parseLocalDateKey(today)) return next;
  log.reviews.push({ date: today, result });
  log.reviewDate = result === 'retry' ? addLearningDays(today, 1) : '';
  return next;
}


// 새 체크는 이전 3단계와 분리해 저장합니다. 서로 다른 완료 의미를 추정하지 않습니다.
export const STUDY_CHECKS = Object.freeze({ watched: '영상 시청', organized: '정리', reflected: '회고', applied: '적용' });
const CHECK_KEYS = Object.keys(STUDY_CHECKS);
function normalizeChecks(value) {
  const source = objectValue(value);
  return Object.fromEntries(CHECK_KEYS.map((key) => [key, source[key] === true]));
}
function finiteCount(value, max = 100000) {
  return Number.isFinite(Number(value)) ? Math.min(max, Math.max(0, Math.floor(Number(value)))) : 0;
}
function normalizeCourseWork(value = {}) {
  const source = objectValue(value);
  return {
    progressMode: ['curriculum', 'count', 'minutes'].includes(source.progressMode) ? source.progressMode : 'curriculum',
    completedCount: finiteCount(source.completedCount), watchedMinutes: finiteCount(source.watchedMinutes),
    studyChecks: normalizeChecks(source.studyChecks),
    unitChecks: Object.fromEntries(Object.entries(objectValue(source.unitChecks)).map(([id, checks]) => [id, normalizeChecks(checks)])),
    applicationTarget: ['none', 'FeedShop', 'FeedVote', '3M', 'resume', 'interview', 'other'].includes(source.applicationTarget) ? source.applicationTarget : 'none',
  };
}
export function courseUnits(courseId) {
  return (COURSE_CURRICULA[courseId]?.sections ?? []).flatMap((section) => section.units);
}
export function courseWorkSummary(state, courseId) {
  const p = courseProgressFor(state, courseId), units = courseUnits(courseId), meta = COURSE_CURRICULA[courseId];
  const totalSeconds = meta?.totalSeconds || 0;
  const videos = units.filter((u) => u.video);
  const done = units.filter((u) => p.unitChecks[u.id]?.watched);
  const seconds = done.reduce((sum, u) => sum + (u.seconds || 0), 0);
  const count = p.progressMode === 'count' ? Math.min(p.completedCount, videos.length) : done.filter((u) => u.video).length;
  const minuteValue = p.progressMode === 'minutes' ? Math.min(p.watchedMinutes, Math.ceil(totalSeconds / 60)) : Math.floor(seconds / 60);
  const percent = p.progressMode === 'minutes' ? totalSeconds ? Math.min(100, Math.round(minuteValue * 60 / totalSeconds * 100)) : 0 : videos.length ? Math.round(count / videos.length * 100) : 0;
  return { count, total: videos.length, minutes: minuteValue, totalMinutes: Math.ceil(totalSeconds / 60), percent,
    label: p.progressMode === 'minutes' ? `${minuteValue} / ${Math.ceil(totalSeconds / 60)}분` : `${count} / ${videos.length}개 영상`,
    unitStageCounts: Object.fromEntries(CHECK_KEYS.map((key) => [key, units.filter((u) => p.unitChecks[u.id]?.[key]).length])),
    materialCount: done.filter((u) => !u.video).length,
  };
}
export function updateStudyCheck(state, courseId, key, checked, today) {
  if (!CHECK_KEYS.includes(key) || typeof checked !== 'boolean') return normalizeLearningState(state, today);
  const p = courseProgressFor(state, courseId);
  return updateCourseProgress(state, courseId, { studyChecks: { ...p.studyChecks, [key]: checked } }, today, today);
}
export function updateUnitChecks(state, courseId, unitIds, key, checked, today) {
  if (!CHECK_KEYS.includes(key) || typeof checked !== 'boolean') return normalizeLearningState(state, today);
  const p = courseProgressFor(state, courseId), allowed = new Set(courseUnits(courseId).map((u) => u.id));
  const unitChecks = { ...p.unitChecks };
  for (const id of unitIds) if (allowed.has(id)) unitChecks[id] = { ...normalizeChecks(unitChecks[id]), [key]: checked };
  return updateCourseProgress(state, courseId, { unitChecks }, today, today);
}
const timeValid = (value) => /^([01]\d|2[0-3]):[0-5]\d$/.test(value ?? '');
function normalizeYouthProgram(value = {}) {
  const p = objectValue(value), seen = new Set();
  return { choice: ['yes', 'no'].includes(p.choice) ? p.choice : 'unset',
    draft: { date: parseLocalDateKey(p.draft?.date) ? p.draft.date : '', start: timeValid(p.draft?.start) ? p.draft.start : '', end: timeValid(p.draft?.end) ? p.draft.end : '', name: textValue(p.draft?.name).slice(0, 100) },
    events: (Array.isArray(p.events) ? p.events : []).filter((e) => {
      if (!e || typeof e.id !== 'string' || seen.has(e.id) || !parseLocalDateKey(e.date) || !timeValid(e.start) || !timeValid(e.end) || e.end <= e.start) return false;
      seen.add(e.id); return true;
    }).map((e) => ({ id: e.id, date: e.date, start: e.start, end: e.end, name: textValue(e.name).slice(0, 100) || '청년프로그램', attended: e.attended === true })),
  };
}
export function setYouthProgram(state, patch, today) {
  const next = normalizeLearningState(state, today);
  next.youthProgram = normalizeYouthProgram({ ...next.youthProgram, ...patch });
  return next;
}
export function addYouthEvent(state, event, today) {
  const next = normalizeLearningState(state, today), p = next.youthProgram;
  if (p.choice !== 'yes' || !event?.id || p.events.some((e) => e.id === event.id || (e.date === event.date && e.start === event.start && e.end === event.end && e.name === (event.name || '청년프로그램')))) return next;
  const candidate = normalizeYouthProgram({ ...p, events: [...p.events, event] });
  if (candidate.events.length > p.events.length) candidate.draft = normalizeYouthProgram().draft;
  next.youthProgram = candidate;
  return next;
}
export function updateYouthEvent(state, id, patch, today) {
  const next = normalizeLearningState(state, today), p = next.youthProgram;
  const candidate = normalizeYouthProgram({ ...p, events: p.events.map((e) => e.id === id ? { ...e, ...patch, id } : e) });
  if (candidate.events.length === p.events.length) next.youthProgram = candidate;
  return next;
}
export function removeYouthEvent(state, id, today) {
  const next = normalizeLearningState(state, today);
  next.youthProgram.events = next.youthProgram.events.filter((e) => e.id !== id);
  return next;
}
