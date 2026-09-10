import { COURSE_CURRICULA } from './learning-curriculum.js?v=9';
import { COURSES, LEARNING_MODE_LABELS, ROUTINE_STEPS } from './learning-data.js?v=9';
import {
  STUDY_CHECKS, orderedLearningCourses, selectedCourseSummary, moveLearningCourse, courseWorkSummary, updateStudyCheck, updateUnitChecks, setYouthProgram, addYouthEvent, updateYouthEvent, removeYouthEvent,
  courseProgressFor, loadLearningState, saveLearningState, stageLabelsForCourse,
  updateCourseProgress, selectLearningCourse, setCourseDeleted, addStudyLog, rescheduleStudyReview,
  recordStudyReview, learningReviewQueue, recordLearningReview, updateReviewDraft, addLearningDays,
} from './learning-core.js?v=9';
import { logicalDateString, scheduleLogicalDayRollover } from './routine-core.js';

const STAGES = ['watched', 'processed', 'verified'];
const RECOMMENDATIONS = { sprint: '우선 추천', conditional: '필요한 부분만', later: '여유가 있으면', excluded: '관심에 따라 선택' };
const escapeHtml = (value) => String(value ?? '').replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#039;');
function safeLink(value) {
  try { const url = new URL(value); return ['http:', 'https:'].includes(url.protocol) ? url.href : ''; } catch { return ''; }
}
const dateLabel = (date) => date ? date.slice(5).replace('-', '/') : '';
const titleFor = (id) => COURSES.find((course) => course.id === id)?.title ?? '이전 학습';

export function createLearningApp(root, storage, now = () => new Date()) {
  const today = logicalDateString(now());
  let state = loadLearningState(storage, today);
  // 처음에는 상세 화면만 열고, 실제 수강 선택(inPlan)은 사용자가 체크합니다.
  const activeCourses = () => orderedLearningCourses(state).filter(c => !courseProgressFor(state,c.id).deleted);
  if (!state.selectedCourseId) state.selectedCourseId = activeCourses().find(c => courseProgressFor(state,c.id).inPlan)?.id || activeCourses()[0]?.id || '';
  let courseFilter = 'all';
  let searchQuery = '';
  let view = 'courses';
  const viewScroll = new Map();
  let saved = true;
  const el = (selector) => root.querySelector(selector);
  const all = (selector) => root.querySelectorAll(selector);
  function announce(message) {
    el('#learning-save-status').textContent = saved ? message : '저장 실패 · 새로고침 전에 입력을 복사해 주세요.';
    el('#learning-save-status').classList.toggle('is-error', !saved);
  }
  function persist(next) {
    saved = true;
    state = saveLearningState(storage, next, today, () => { saved = false; });
    announce('저장됨');
  }
  function renderCounts() {
    el('#learning-total-count').textContent = activeCourses().length;
    el('#learning-deleted-count').textContent = COURSES.length - activeCourses().length;
    const selected = selectedCourseSummary(state);
    el('#learning-picked-count').textContent = selected.count;
    el('#learning-selected-duration').textContent = `내 선택 ${selected.count}개 · 총 ${duration(selected.totalSeconds)}`;
    el('#learning-review-count').textContent = state.studyLogs.filter((log) => log.reviewDate && log.reviewDate <= today).length + learningReviewQueue(state, today).filter((item) => item.due).length;
  }
  function selectView(next) {
    if (!['courses', 'overview', 'program', 'reviews', 'records', 'guide'].includes(next)) return;
    const content = el('#learning-content');
    viewScroll.set(view, content.scrollTop);
    view = next;
    el('#learning-view-label').textContent = {courses:'강의·노트',overview:'반영 현황',program:'청년프로그램',reviews:'복습',records:'학습 기록',guide:'추천·학습 방법'}[view];
    all('[data-learning-panel]').forEach((panel) => { panel.hidden = panel.dataset.learningPanel !== view; });
    all('[data-learning-view]').forEach((button) => button.setAttribute('aria-pressed', String(button.dataset.learningView === view)));
    if (view === 'overview') renderOverview();
    if (view === 'program') renderProgram();
    if (view === 'reviews') renderReviews();
    if (view === 'records') renderRecords();
    content.scrollTop = viewScroll.get(view) || 0;
  }
  function visibleCourses() {
    return orderedLearningCourses(state).filter((course) => {
      const p = courseProgressFor(state, course.id);
      const match = courseFilter === 'deleted' ? p.deleted : !p.deleted && (courseFilter === 'all' || (courseFilter === 'added' && Boolean(COURSE_CURRICULA[course.id]?.dashboardUrl)) || (courseFilter === 'mine' && p.inPlan) || (courseFilter === 'recommended' && course.status === 'sprint') || (courseFilter === 'enrolled' && p.enrolled) || (courseFilter === 'skipped' && p.skipped));
      return match && course.title.toLocaleLowerCase('ko-KR').includes(searchQuery.trim().toLocaleLowerCase('ko-KR'));
    });
  }
  function rowMarkup(course, rank) {
    const p = courseProgressFor(state, course.id);
    if (p.deleted) return `<tr data-course-id="${course.id}"><td></td><td colspan="2"><span class="learning-deleted-title">${escapeHtml(course.title)}</span><button type="button" class="learning-restore" data-restore-course="${course.id}" aria-label="${escapeHtml(course.title)} 복원">복원</button></td></tr>`;
    return `<tr data-course-id="${course.id}" class="${p.skipped ? 'is-skipped' : ''} ${state.selectedCourseId === course.id ? 'is-selected' : ''}">
      <td><button type="button" class="learning-drag-handle" data-drag-course="${course.id}" aria-label="${escapeHtml(course.title)}: ${rank}순위, 드래그 또는 위아래 방향키로 이동" title="누른 채 끌어서 이동 · 키보드 ↑ ↓"><span class="learning-priority">${rank}</span><span aria-hidden="true">⠿</span></button></td>
      <td><button type="button" class="learning-course-title" data-open-course="${course.id}" aria-pressed="${state.selectedCourseId === course.id}">${escapeHtml(course.title)}</button>
        <div class="learning-row-meta"><span>${RECOMMENDATIONS[course.status]}</span><span>${LEARNING_MODE_LABELS[course.mode]}</span><span>${duration(COURSE_CURRICULA[course.id]?.totalSeconds)}</span>${p.enrolled ? '<span class="learning-enrolled">추가 신청</span>' : ''}${p.skipped ? '<span>안 볼 강의</span>' : ''}</div></td><td><label class="learning-pick"><input type="checkbox" data-course-flag="inPlan" ${p.inPlan ? 'checked' : ''} aria-label="${escapeHtml(course.title)}: 이번 2주에 선택"></label></td>
    </tr>`;
  }
  function renderCourses() {
    const courses = visibleCourses();
    const ranks = new Map(activeCourses().map((course,index)=>[course.id,index+1]));
    el('#learning-course-list').innerHTML = courses.map(course=>rowMarkup(course,ranks.get(course.id))).join('');
    el('#learning-visible-count').textContent = `${courses.length}개 표시`;
    el('#learning-course-empty').hidden = courses.length > 0;
    all('[data-course-filter]').forEach((button) => button.setAttribute('aria-pressed', String(button.dataset.courseFilter === courseFilter)));
    renderCounts();
  }
  function linkMarkup(value, label) {
    const url = safeLink(value);
    return url ? `<a href="${escapeHtml(url)}" target="_blank" rel="noreferrer">${label} ↗</a>` : '';
  }
  function renderDetailLinks() {
    const p = courseProgressFor(state, state.selectedCourseId);
    el('#learning-detail-links').innerHTML = linkMarkup(p.courseUrl || COURSE_CURRICULA[state.selectedCourseId]?.dashboardUrl || COURSE_CURRICULA[state.selectedCourseId]?.url, '강의 열기') + linkMarkup(p.noteReference, '정리노트 열기');
  }
  function duration(seconds = 0) {
    const minutes = Math.floor(seconds / 60);
    return `${Math.floor(minutes / 60) ? `${Math.floor(minutes / 60)}시간 ` : ''}${minutes % 60}분`;
  }
  const options = (max, value, suffix, step = 1) => {
    const values = [...new Set([0, ...Array.from({ length: Math.floor(max / step) }, (_, i) => (i + 1) * step), max, Math.min(value,max)])].sort((a,b)=>a-b);
    return values.map(n=>`<option value="${n}" ${n===value?'selected':''}>${n}${suffix}</option>`).join('');
  };
  function progressMarkup(course, p) {
    const meta = COURSE_CURRICULA[course.id], summary = courseWorkSummary(state, course.id);
    const unitRow = (u) => `<tr><td><span>${escapeHtml(u.title)}</span><small>${u.video ? `${Math.floor(u.seconds/60)}:${String(u.seconds%60).padStart(2,'0')}` : '자료·퀴즈'}</small></td>${Object.entries(STUDY_CHECKS).map(([key,label]) => `<td><input type="checkbox" data-unit-id="${u.id}" data-unit-check="${key}" aria-label="${escapeHtml(u.title)}: ${key==='watched'&&!u.video?'자료·퀴즈 확인':label}" ${p.unitChecks[u.id]?.[key]?'checked':''}></td>`).join('')}</tr>`;
    return `<div class="learning-progress-heading"><h3>진도</h3><span id="learning-progress-summary">${summary.label} · ${summary.percent}%</span></div>
      <p class="learning-hint">전체 ${meta.totalUnits}개 수업 · ${summary.total}개 영상 · ${duration(meta.totalSeconds)} ${linkMarkup(meta.url,'인프런 원문')} · ${meta.checkedOn} 확인</p>
      ${course.duration.startsWith('선별') ? `<p class="learning-hint">기존 추천 범위: ${escapeHtml(course.duration)}. 위 시간은 전체 강의 기준입니다.</p>` : ''}
      <div class="learning-mode-options" role="group" aria-label="진도 기록 방식">${[['curriculum','목차별 체크'],['count','들은 개수'],['minutes','들은 시간']].map(([key,label])=>`<button type="button" data-progress-mode="${key}" aria-pressed="${p.progressMode===key}">${label}</button>`).join('')}</div>
      <p class="learning-hint">목차별로 체크하거나, 들은 개수·시간만 선택해도 됩니다.</p>
      ${p.progressMode==='count' ? `<label class="learning-field">들은 영상 수<select data-course-value="completedCount">${options(summary.total,Math.min(p.completedCount,summary.total),'개')}</select></label>` : p.progressMode==='minutes' ? `<label class="learning-field">누적 시청 시간<select data-course-value="watchedMinutes">${options(summary.totalMinutes,Math.min(p.watchedMinutes,summary.totalMinutes),'분',1)}</select></label>` : `<div class="learning-curriculum">${meta.sections.map((section,index)=>`<details data-section="${section.id}" ${index===0?'open':''}><summary><span>${index+1}. ${escapeHtml(section.title)}</span><small>${section.units.filter(u=>u.video).length}개 영상 · ${duration(section.units.reduce((sum,u)=>sum+(u.seconds||0),0))}</small></summary><div class="learning-curriculum-scroll"><table class="learning-unit-table"><thead><tr><th>수업 / 자료 / 퀴즈</th>${Object.entries(STUDY_CHECKS).map(([key,label])=>`<th><label>${label}<input type="checkbox" data-section-check="${key}" data-section-id="${section.id}" aria-label="${escapeHtml(section.title)}: ${label} 전체" ${section.units.length&&section.units.every(u=>p.unitChecks[u.id]?.[key])?'checked':''}></label></th>`).join('')}</tr></thead><tbody>${section.units.map(unitRow).join('')}</tbody></table></div></details>`).join('')}</div>`}`;
  }
  function refreshProgress() {
    const node=el('#learning-progress-summary');
    if(node) { const summary=courseWorkSummary(state,state.selectedCourseId);node.textContent=`${summary.label} · ${summary.percent}%`; }
    all('[data-section-check]').forEach(input=>{
      const section=COURSE_CURRICULA[state.selectedCourseId]?.sections.find(s=>s.id===input.dataset.sectionId);
      if (!section) return;
      const p=courseProgressFor(state,state.selectedCourseId), count=section.units.filter(u=>p.unitChecks[u.id]?.[input.dataset.sectionCheck]).length;
      input.checked=count===section.units.length;input.indeterminate=count>0&&count<section.units.length;
    });
    renderCourses();
  }
  function overviewMarkup() {
    const selected=activeCourses().filter(c=>courseProgressFor(state,c.id).inPlan);
    const selectedTime = selectedCourseSummary(state);
    const targetLabels={FeedShop:'FeedShop',FeedVote:'FeedVote','3M':'3M',resume:'이력서·지원서',interview:'면접 답변',other:'기타'};
    const courseRows=selected.map(c=>{
      const p=courseProgressFor(state,c.id), summary=courseWorkSummary(state,c.id);
      return `<tr><td><button type="button" data-open-course="${c.id}">${escapeHtml(c.title)}</button>${p.skipped?'<small>안 볼 강의로 표시됨</small>':''}${p.enrolled?'<small>추가 신청</small>':''}</td><td>${summary.label}<small>${summary.percent}%${p.progressMode==='curriculum'?` · 자료·퀴즈 ${summary.materialCount}개 확인`:''}</small></td>${Object.keys(STUDY_CHECKS).map(key=>`<td>${p.progressMode==='curriculum'?`${summary.unitStageCounts[key]}개 목차`:p.studyChecks[key]?'✓ 했음':'미체크'}</td>`).join('')}<td>${targetLabels[p.applicationTarget]||'—'}${p.noteReference?`<small>${linkMarkup(p.noteReference,'노트')||escapeHtml(p.noteReference)}</small>`:''}</td></tr>`;
    }).join('');
    const program=state.youthProgram;
    const events=program.choice==='yes'?[...program.events].sort((a,b)=>`${a.date}${a.start}`.localeCompare(`${b.date}${b.start}`)):[];
    return `<div class="learning-section-bar"><h3>내가 선택한 강의 ${selected.length}개 · 총 ${duration(selectedTime.totalSeconds)}</h3><button type="button" data-learning-view="courses">강의 선택·체크</button></div>
      ${selected.length?`<div class="learning-overview-scroll"><table class="learning-overview-table"><thead><tr><th>강의</th><th>영상 진도</th>${Object.values(STUDY_CHECKS).map(label=>`<th>${label}</th>`).join('')}<th>적용한 곳·노트</th></tr></thead><tbody>${courseRows}</tbody></table></div>`:'<p class="learning-empty">오른쪽 목록에서 ‘내 선택’을 체크하면 여기에 모입니다.</p>'}
      <div class="learning-section-bar"><h3>청년프로그램 일정</h3><button type="button" data-learning-view="program">유무·날짜·시간 선택</button></div>
      ${program.choice!=='yes'?`<p>${program.choice==='no'?'프로그램 없음으로 선택했습니다.':'프로그램 유무를 아직 선택하지 않았습니다.'}</p>`:events.length?events.map(e=>`<div class="learning-event-line"><time>${dateLabel(e.date)} ${e.start}–${e.end}</time><span>${escapeHtml(e.name)}</span><span>${e.attended?'참여 완료':'예정'}${e.date<'2026-09-04'||e.date>'2026-09-17'?' · 2주 기간 밖':''}</span></div>`).join(''):'<p>프로그램 있음 · 날짜와 시간을 선택해 주세요.</p>'}
      <div class="learning-section-bar"><h3>남긴 공부 기록 ${state.studyLogs.length}개</h3><button type="button" data-learning-view="records">기록 보기</button><button type="button" data-learning-view="reviews">복습 보기</button></div>
      <p class="learning-hint">목차 체크와 최근 공부 체크를 구분해 표시합니다. ‘내 선택’과 ‘안 볼 강의’를 함께 체크한 경우 자동으로 선택을 지우지 않습니다.</p>`;
  }
  function renderOverview() { el('#learning-overview').innerHTML=overviewMarkup(); }
  function renderProgram() {
    const p=state.youthProgram;
    el('#learning-program').innerHTML=`<fieldset class="learning-program-choice"><legend>이번 2주에 청년프로그램이 있나요?</legend>${[['yes','있음'],['no','없음']].map(([value,label])=>`<label><input type="radio" name="youth-program" data-program-choice value="${value}" ${p.choice===value?'checked':''}>${label}</label>`).join('')}</fieldset>
      ${p.choice==='yes'?`<form id="learning-program-form"><div class="learning-program-fields"><label class="learning-field">날짜<input type="date" name="date" data-program-draft="date" value="${p.draft.date}" required></label><label class="learning-field">시작 시간<input type="time" name="start" data-program-draft="start" value="${p.draft.start}" required></label><label class="learning-field">종료 시간<input type="time" name="end" data-program-draft="end" value="${p.draft.end}" required></label></div><details class="learning-small-details"><summary>프로그램 이름 추가 (선택)</summary><label class="learning-field">프로그램 이름<input name="name" data-program-draft="name" maxlength="100" value="${escapeHtml(p.draft.name)}" placeholder="청년프로그램"></label></details><button type="submit">일정 반영</button><p id="learning-program-feedback" role="status"></p></form>
      <div class="learning-section-bar"><h3>반영한 일정 ${p.events.length}개</h3><button type="button" data-learning-view="overview">반영 현황 보기</button></div>
      ${[...p.events].sort((a,b)=>`${a.date}${a.start}`.localeCompare(`${b.date}${b.start}`)).map(e=>`<div class="learning-program-event" data-event-id="${escapeHtml(e.id)}"><strong>${escapeHtml(e.name)}</strong><div class="learning-program-fields"><label class="learning-field">일정 날짜<input type="date" data-event-field="date" value="${e.date}"></label><label class="learning-field">일정 시작<input type="time" data-event-field="start" value="${e.start}"></label><label class="learning-field">일정 종료<input type="time" data-event-field="end" value="${e.end}"></label></div><label><input type="checkbox" data-event-attended ${e.attended?'checked':''}>참여했음</label><button type="button" data-remove-event="${escapeHtml(e.id)}">이 일정 삭제</button></div>`).join('')}`:p.choice==='no'?`<p>프로그램 일정은 반영하지 않습니다.${p.events.length?' 이전 일정은 보관하며 ‘있음’으로 바꾸면 다시 표시합니다.':''}</p>`:'<p class="learning-hint">일정이 없다면 ‘없음’만 선택하면 됩니다.</p>'}`;
  }

  function renderDetail() {
    const course = COURSES.find((item) => item.id === state.selectedCourseId);
    const panel = el('#learning-course-detail');
    panel.hidden = false;
    el('#learning-desk').classList.toggle('has-selection', Boolean(course));
    if (!course) { panel.innerHTML = `<div class="learning-start"><h2>강의 목록에서 선택하세요</h2><p>목차·들은 분량과 시청·정리·회고·적용을 체크할 수 있습니다.</p><button type="button" data-learning-view="overview">선택한 내용의 반영 현황 보기</button><button type="button" data-learning-view="program">청년프로그램 일정 선택</button></div>`; return; }
    const p = courseProgressFor(state, course.id);
    const field = (key, label, help = '') => `<label class="learning-field">${label}<input data-course-field="${key}" value="${escapeHtml(p[key])}" maxlength="${key === 'noteReference' ? 500 : 6000}">${help ? `<small>${help}</small>` : ''}</label>`;
    const labels = stageLabelsForCourse(course.mode);
    panel.innerHTML = `<div class="learning-detail-heading"><h2>${escapeHtml(course.title)}</h2><button type="button" data-delete-course="${course.id}" title="체크와 기록은 보존하며 삭제한 강의에서 복원할 수 있습니다">삭제</button><button type="button" data-close-detail aria-label="강의 상세 닫기">닫기</button></div>
      <p class="learning-detail-meta">${RECOMMENDATIONS[course.status]} · ${LEARNING_MODE_LABELS[course.mode]}</p>
      <div class="learning-flags">${[['inPlan', '이번 2주에 선택'], ['enrolled', '추가 신청'], ['skipped', '안 볼 강의']].map(([key, label]) => `<label><input type="checkbox" data-course-flag="${key}" ${p[key] ? 'checked' : ''}>${label}</label>`).join('')}</div>
      <div id="learning-detail-links" class="learning-links"></div>
      ${progressMarkup(course, p)}
      ${p.progressMode!=='curriculum' ? `<div class="learning-study-checks"><h3>최근 공부 체크</h3><p class="learning-hint">체크는 각각 독립적입니다. 공부 기록을 남기면 그 시점의 상태가 보관됩니다.</p>${Object.entries(STUDY_CHECKS).map(([key,label]) => `<label><input type="checkbox" data-study-check="${key}" ${p.studyChecks[key] ? 'checked' : ''}>${label} 했음</label>`).join('')}</div>` : ''}
      <label class="learning-field">적용한 곳<select data-course-value="applicationTarget">${Object.entries({none:'아직 선택 안 함',FeedShop:'FeedShop',FeedVote:'FeedVote','3M':'3M',resume:'이력서·지원서',interview:'면접 답변',other:'기타'}).map(([value,label])=>`<option value="${value}" ${p.applicationTarget===value?'selected':''}>${label}</option>`).join('')}</select></label>
      <details class="learning-small-details"><summary>노트 링크·이어 볼 위치</summary>${field('noteReference', '정리노트', '기존 노트 링크나 파일명만 연결하세요.')}${field('position', '이어 볼 위치', '필요한 경우에만 남기세요.')}${field('courseUrl', '강의 주소')}</details>
      ${STAGES.some(key=>p[key]) ? `<details class="learning-small-details"><summary>이전에 체크한 수강 기록</summary><div class="learning-checks">${STAGES.map((key,index)=>`<label><input type="checkbox" data-course-flag="${key}" ${p[key]?'checked':''}>${labels[index]}</label>`).join('')}</div></details>` : ''}
      <form id="learning-log-form">
        <label class="learning-field">핵심 한 줄 <small>선택</small><textarea data-course-field="memo" rows="2" maxlength="6000" placeholder="남길 핵심이나 막힌 점만">${escapeHtml(p.memo)}</textarea></label>
        <details class="learning-small-details"><summary>복습 질문·날짜 선택</summary><label class="learning-field">다시 볼 질문 <small>선택</small><textarea data-course-field="reviewQuestion" rows="2" maxlength="6000">${escapeHtml(p.reviewQuestion)}</textarea></label>
        <label class="learning-field">복습 날짜 <small>선택</small><input type="date" id="learning-next-review" data-course-field="draftReviewDate" value="${escapeHtml(p.draftReviewDate)}"></label>
        <div class="learning-date-options"><button type="button" data-review-offset="1">내일</button><button type="button" data-review-offset="3">3일 뒤</button><button type="button" data-review-offset="7">7일 뒤</button><button type="button" data-review-offset="0">정하지 않음</button></div>
        </details><button type="submit" class="learning-save-log">공부 기록 남기기</button>
        <p class="learning-hint">메모가 없어도 기록할 수 있습니다. 입력 내용은 자동 저장됩니다.</p>
      </form>`;
    renderDetailLinks(); refreshProgress();
  }
  function openCourse(id) {
    persist(selectLearningCourse(state, id, today));
    selectView('courses'); renderCourses(); renderDetail();
    el('#learning-content').scrollTop = 0;
    if (window.matchMedia('(max-width: 600px)').matches) el('#learning-content').scrollIntoView({block:'start'});
  }
  function logMarkup(log, review = false) {
    const p = courseProgressFor(state, log.courseId);
    return `<details class="learning-record" data-log-id="${escapeHtml(log.id)}"><summary><span>${dateLabel(review ? log.reviewDate : log.date)}</span><strong>${escapeHtml(titleFor(log.courseId))}</strong><span>${review ? log.reviewDate <= today ? '복습 대기' : '예정' : log.reviews.length ? '복습 기록 있음' : '공부 기록'}</span></summary>
      <div class="learning-record-body">${log.progressSnapshot ? `<p>${escapeHtml(log.progressSnapshot)} · ${log.unitStageSnapshot ? Object.entries(STUDY_CHECKS).map(([key,label])=>`${label} ${log.unitStageSnapshot[key]||0}개`).join(' · ') : Object.entries(STUDY_CHECKS).filter(([key])=>log.checks?.[key]).map(([,label])=>label).join(' · ') || '체크 없음'} · 기록 시점의 누적 상태</p>` : ''}${log.position ? `<p><b>구간</b> ${escapeHtml(log.position)}</p>` : ''}${log.question ? `<p class="learning-preserve"><b>질문</b> ${escapeHtml(log.question)}</p>` : ''}
      ${review ? '<details class="learning-small-details"><summary>메모·정리노트 확인</summary>' : ''}
      <p class="learning-preserve">${escapeHtml(log.memo || '작성한 메모가 없습니다.')}</p>${linkMarkup(p.noteReference, '정리노트 열기')}${review ? '</details>' : ''}
      <div class="learning-record-actions">${p.deleted ? `<button type="button" data-restore-course="${log.courseId}">삭제한 강의 복원</button>` : `<button type="button" data-open-course="${log.courseId}">이 강의 보기</button>`}${review ? '<button type="button" data-log-result="done">복습했음</button><button type="button" data-log-result="retry">막힘 · 내일 다시</button>' : ''}</div>
      <label class="learning-inline-field">다시 볼 날짜 <input type="date" data-log-review-date value="${log.reviewDate}"></label>
      ${log.reviews.map((r) => `<p class="learning-hint">${dateLabel(r.date)} · ${r.result === 'done' ? '복습했음' : '막힘 · 다시 보기'}</p>`).join('')}</div></details>`;
  }
  function renderReviews() {
    const logs = state.studyLogs.filter((log) => log.reviewDate).sort((a, b) => a.reviewDate.localeCompare(b.reviewDate));
    const legacy = learningReviewQueue(state, today);
    el('#learning-review-list').innerHTML = logs.map((log) => logMarkup(log, true)).join('') + legacy.map((item) => `<details class="learning-record" data-review-id="${item.id}" data-review-interval="${item.interval}"><summary><span>${dateLabel(item.dueDate)}</span><strong>${escapeHtml(item.session.question)}</strong><span>이전 기록 · ${item.due ? '복습 대기' : '예정'}</span></summary>
      <div class="learning-record-body"><p class="learning-preserve">${escapeHtml(item.session.questions)}</p><label class="learning-field">회상 메모 <small>말로 답했다면 생략</small><textarea data-review-answer rows="3">${escapeHtml(item.session.reviewDrafts?.[item.interval] ?? '')}</textarea></label>
      <details class="learning-small-details"><summary>이전 답변·노트 확인</summary><p class="learning-preserve">${escapeHtml(item.session.recall)}</p><p class="learning-preserve">${escapeHtml(item.session.evidence)}</p>${linkMarkup(courseProgressFor(state, item.session.courseId).noteReference, '정리노트 열기')}</details>
      ${item.due ? '<div class="learning-record-actions"><button type="button" data-legacy-result="pass">스스로 설명했음</button><button type="button" data-legacy-result="retry">막힘 · 내일 다시</button></div>' : ''}</div></details>`).join('');
    if (!logs.length && !legacy.length) el('#learning-review-list').innerHTML = '<p class="learning-empty">예약한 복습이 없습니다. 강의에서 공부 기록을 남길 때 날짜를 고를 수 있습니다.</p>';
    renderCounts();
  }
  function renderRecords() {
    el('#learning-results').innerHTML = state.studyLogs.length ? [...state.studyLogs].reverse().map((log) => logMarkup(log)).join('') : '<p class="learning-empty">아직 공부 기록이 없습니다. 원하는 강의를 열어 기록을 남겨 보세요.</p>';
    const legacy = Object.entries(state.sessions).filter(([, s]) => s.recall.trim() || s.evidence.trim() || s.questions.trim() || s.correction.trim() || s.completedOn);
    el('#learning-legacy-results').innerHTML = legacy.reverse().map(([id, s]) => `<details class="learning-record"><summary><span>${dateLabel(id.split('/')[0])}</span><strong>${escapeHtml(s.question)}</strong><span>${s.completedOn ? '자가 점검 기록' : '작성 중'}</span></summary><div class="learning-record-body"><p class="learning-preserve">${escapeHtml(s.recall)}</p><p class="learning-preserve">${escapeHtml(s.evidence)}</p><p class="learning-preserve">${escapeHtml(s.correction)}</p><p class="learning-preserve">${escapeHtml(s.questions)}</p>${Object.entries(s.reviews).map(([interval, r]) => `<p class="learning-preserve">D+${interval} · ${dateLabel(r.reviewedOn)} · ${escapeHtml(r.answer)}</p>`).join('')}</div></details>`).join('');
    el('#learning-legacy-results').insertAdjacentHTML('beforeend', Object.entries(state.daily).map(([date, day]) => `<details class="learning-record"><summary><span>${dateLabel(date)}</span><strong>이전 하루 기록</strong></summary><div class="learning-record-body"><p class="learning-preserve">${escapeHtml(day.recall)}</p><p class="learning-preserve">${escapeHtml(day.career)}</p><p class="learning-preserve">${escapeHtml([day.collection.topic, day.collection.problem, day.collection.structure, day.collection.location].filter(Boolean).join('\n'))}</p><p class="learning-hint">${day.checkedSteps.map((id) => ROUTINE_STEPS.find((step) => step.id === id)?.label).filter(Boolean).map(escapeHtml).join(' · ')}</p></div></details>`).join(''));
    if (!el('#learning-legacy-results').innerHTML) el('#learning-legacy-results').innerHTML = '<p class="learning-empty">이전 날짜별 기록이 없습니다.</p>';
  }
  function renderGuide() {
    el('#learning-recommendations').innerHTML = `<table class="learning-table learning-guide-table"><thead><tr><th>추천 영역</th><th>선택할 때 참고할 이유</th></tr></thead><tbody><tr><td>Spring · JPA · 트랜잭션</td><td>이력서에 적은 기반 기술의 동작을 설명할 때</td></tr><tr><td>동시성 · SQL · 부하 테스트 · 캐시</td><td>FeedShop의 정합성과 성능 개선 근거를 확인할 때</td></tr><tr><td>Elasticsearch · 시스템 디자인</td><td>검색 구조와 기술 선택의 이유를 넓혀 볼 때</td></tr><tr><td>MSA · Kafka · Docker</td><td>관심 있는 주제나 필요한 챕터를 선택해서 볼 때</td></tr><tr><td>취업폭격기</td><td>지원서와 면접 답변에 바로 적용할 때</td></tr></tbody></table>`;
  }
  // 핸들에서만 이동을 시작해 강의 선택·수강 체크와 충돌하지 않게 합니다.
  let drag = null, dragFrame = 0;
  function clearDropMarks() {
    all('.is-drop-before,.is-drop-after').forEach(row => row.classList.remove('is-drop-before','is-drop-after'));
  }
  function updateDropTarget() {
    if (!drag?.moved) return;
    clearDropMarks(); drag.targetId = '';
    const box = el('.learning-course-scroll').getBoundingClientRect();
    if (drag.x < box.left || drag.x > box.right || drag.y < box.top || drag.y > box.bottom) return;
    const row = root.ownerDocument.elementFromPoint(drag.x,drag.y)?.closest('#learning-course-list tr[data-course-id]');
    if (!row || row.dataset.courseId === drag.id) return;
    const bounds = row.getBoundingClientRect();
    drag.targetId = row.dataset.courseId;
    drag.placement = drag.y < bounds.top + bounds.height / 2 ? 'before' : 'after';
    row.classList.add(`is-drop-${drag.placement}`);
  }
  function scrollWhileDragging() {
    if (!drag) return;
    if (drag.moved) {
      const list = el('.learning-course-scroll'), box = list.getBoundingClientRect();
      if (drag.x >= box.left && drag.x <= box.right && drag.y >= box.top-24 && drag.y <= box.bottom+24) {
        if (drag.y < box.top+36) list.scrollTop -= 8;
        else if (drag.y > box.bottom-36) list.scrollTop += 8;
      }
      updateDropTarget();
    }
    dragFrame = requestAnimationFrame(scrollWhileDragging);
  }
  function applyCourseMove(id,target,placement) {
    persist(moveLearningCourse(state,id,target,placement,today));
    renderCourses();
    if (view === 'overview') renderOverview();
    const handle = el(`[data-drag-course="${id}"]`);
    handle?.focus({preventScroll:true});
    announce(`순서 저장됨 · ${activeCourses().findIndex(c=>c.id===id)+1}순위로 이동`);
  }
  function endDrag(event, cancelled = false) {
    if (!drag || event.pointerId !== drag.pointerId) return;
    const finished = drag; drag = null;
    cancelAnimationFrame(dragFrame); clearDropMarks();
    finished.handle.closest('tr').classList.remove('is-dragging');
    if (finished.handle.hasPointerCapture(event.pointerId)) finished.handle.releasePointerCapture(event.pointerId);
    if (!cancelled && finished.moved && finished.targetId) applyCourseMove(finished.id,finished.targetId,finished.placement);
  }
  root.addEventListener('pointerdown', event => {
    const handle = event.target.closest('[data-drag-course]');
    if (!handle || event.button !== 0 || drag) return;
    event.preventDefault(); handle.focus({preventScroll:true});
    drag = {id:handle.dataset.dragCourse,handle,pointerId:event.pointerId,startY:event.clientY,x:event.clientX,y:event.clientY,moved:false,targetId:''};
    handle.setPointerCapture(event.pointerId);
    dragFrame = requestAnimationFrame(scrollWhileDragging);
  });
  root.addEventListener('pointermove', event => {
    if (!drag || event.pointerId !== drag.pointerId) return;
    drag.x = event.clientX; drag.y = event.clientY;
    if (Math.abs(drag.y-drag.startY)>5) drag.moved = true;
    if (drag.moved) { drag.handle.closest('tr').classList.add('is-dragging'); updateDropTarget(); }
  });
  root.addEventListener('pointerup', event => endDrag(event));
  root.addEventListener('pointercancel', event => endDrag(event,true));
  root.addEventListener('lostpointercapture', event => endDrag(event,true));
  root.addEventListener('keydown', event => {
    if (event.key === 'Escape' && drag) { endDrag({pointerId:drag.pointerId},true); return; }
    const handle = event.target.closest('[data-drag-course]');
    if (!handle || !['ArrowUp','ArrowDown'].includes(event.key)) return;
    event.preventDefault();
    const courses = visibleCourses(), index = courses.findIndex(c=>c.id===handle.dataset.dragCourse);
    const target = courses[index + (event.key === 'ArrowUp' ? -1 : 1)];
    if (target) applyCourseMove(handle.dataset.dragCourse,target.id,event.key === 'ArrowUp' ? 'before' : 'after');
  });
  root.addEventListener('click', (event) => {
    const button = event.target.closest('button');
    if (!button) return;
    if (button.dataset.deleteCourse) {
      persist(setCourseDeleted(state, button.dataset.deleteCourse, true, today));
      renderCourses(); renderDetail();
      announce('목록에서 삭제됨 · 삭제한 강의에서 복원 가능');
      return;
    }
    if (button.dataset.restoreCourse) {
      persist(setCourseDeleted(state, button.dataset.restoreCourse, false, today));
      courseFilter = 'all'; searchQuery = ''; el('#learning-course-search').value = '';
      openCourse(button.dataset.restoreCourse); announce('체크·노트와 함께 복원했습니다.');
      return;
    }
    if (button.dataset.progressMode) { persist(updateCourseProgress(state, state.selectedCourseId, { progressMode: button.dataset.progressMode }, today, today)); renderDetail(); renderCourses(); return; }
    if (button.dataset.removeEvent) { persist(removeYouthEvent(state, button.dataset.removeEvent, today)); renderProgram(); return; }
    if (button.dataset.learningView) return selectView(button.dataset.learningView);
    if (button.dataset.courseFilter) { courseFilter = button.dataset.courseFilter; renderCourses(); return; }
    if (button.dataset.openCourse) return openCourse(button.dataset.openCourse);
    if (button.hasAttribute('data-close-detail')) { persist(selectLearningCourse(state, '', today)); renderCourses(); renderDetail(); return; }
    if (button.hasAttribute('data-review-offset')) { const days = Number(button.dataset.reviewOffset); const reviewDate = days ? addLearningDays(today, days) : ''; el('#learning-next-review').value = reviewDate; persist(updateCourseProgress(state, state.selectedCourseId, { draftReviewDate: reviewDate }, today, today)); return; }
    if (button.dataset.logResult) { persist(recordStudyReview(state, button.closest('[data-log-id]').dataset.logId, button.dataset.logResult, today)); renderReviews(); return; }
    if (button.dataset.legacyResult) {
      const shell = button.closest('[data-review-id]');
      const answer = shell.querySelector('textarea').value.trim() || (button.dataset.legacyResult === 'pass' ? '말로 설명했음 (자가 점검)' : '말로 답하다 막힘 (자가 점검)');
      persist(recordLearningReview(state, shell.dataset.reviewId, Number(shell.dataset.reviewInterval), answer, button.dataset.legacyResult, today)); renderReviews();
    }
  });
  root.addEventListener('input', (event) => {
    const input = event.target;
    if (input.dataset.programDraft) { persist(setYouthProgram(state, { draft: { ...state.youthProgram.draft, [input.dataset.programDraft]: input.value } }, today)); return; }
    if (input.id === 'learning-course-search') { searchQuery = input.value; renderCourses(); return; }
    if (input.dataset.courseField) {
      persist(updateCourseProgress(state, state.selectedCourseId, { [input.dataset.courseField]: input.value }, today, today));
      if (['courseUrl', 'noteReference'].includes(input.dataset.courseField)) renderDetailLinks();
      if (input.dataset.courseField === 'position') renderCourses();
    }
    if (input.hasAttribute('data-review-answer')) {
      const shell = input.closest('[data-review-id]');
      persist(updateReviewDraft(state, shell.dataset.reviewId, Number(shell.dataset.reviewInterval), input.value, today));
    }
  });
  root.addEventListener('change', (event) => {
    const input = event.target;
    if (input.hasAttribute('data-program-choice')) { persist(setYouthProgram(state, { choice: input.value }, today)); renderProgram(); return; }
    if (input.dataset.eventField) {
      const id=input.closest('[data-event-id]').dataset.eventId;
      const before=state.youthProgram.events.find(e=>e.id===id);
      const next=updateYouthEvent(state,id,{[input.dataset.eventField]:input.value},today);
      if(next.youthProgram.events.find(e=>e.id===id)?.[input.dataset.eventField]!==input.value) { input.value=before[input.dataset.eventField];announce('종료 시간은 시작 시간 이후로 선택해 주세요.');return; }
      persist(next);return;
    }
    if(input.hasAttribute('data-event-attended')) { persist(updateYouthEvent(state,input.closest('[data-event-id]').dataset.eventId,{attended:input.checked},today));return; }
    if (input.dataset.studyCheck) { persist(updateStudyCheck(state,state.selectedCourseId,input.dataset.studyCheck,input.checked,today)); return; }
    if (input.dataset.courseValue) { const key=input.dataset.courseValue;persist(updateCourseProgress(state,state.selectedCourseId,{[key]:['completedCount','watchedMinutes'].includes(key)?Number(input.value):input.value},today,today));refreshProgress();return; }
    if (input.dataset.unitCheck) { persist(updateUnitChecks(state,state.selectedCourseId,[input.dataset.unitId],input.dataset.unitCheck,input.checked,today));refreshProgress();return; }
    if (input.dataset.sectionCheck) {
      const section=COURSE_CURRICULA[state.selectedCourseId].sections.find(s=>s.id===input.dataset.sectionId);
      persist(updateUnitChecks(state,state.selectedCourseId,section.units.map(u=>u.id),input.dataset.sectionCheck,input.checked,today));
      input.closest('details').querySelectorAll(`[data-unit-check="${input.dataset.sectionCheck}"]`).forEach(box=>{box.checked=input.checked;});refreshProgress();return;
    }
    if (input.dataset.courseFlag) {
      const id = input.closest('[data-course-id]')?.dataset.courseId || state.selectedCourseId;
      const fromDetail = Boolean(input.closest('#learning-course-detail'));
      persist(updateCourseProgress(state, id, { [input.dataset.courseFlag]: input.checked }, today, today));
      renderCourses();
      if (view === 'overview') renderOverview();
      if (!fromDetail && id === state.selectedCourseId) {
        el('#learning-course-detail [data-course-flag="inPlan"]').checked = input.checked;
      }
      return;
    }
    if (input.hasAttribute('data-log-review-date')) {
      persist(rescheduleStudyReview(state, input.closest('[data-log-id]').dataset.logId, input.value, today)); renderCounts();
    }
  });
  root.addEventListener('submit', (event) => {
    if(event.target.id==='learning-program-form') {
      event.preventDefault();const form=event.target;
      const eventData={id:`program-${now().getTime()}-${state.youthProgram.events.length}`,date:form.elements.date.value,start:form.elements.start.value,end:form.elements.end.value,name:form.elements.name.value};
      if(eventData.end<=eventData.start) { el('#learning-program-feedback').textContent='종료 시간은 시작 시간 이후로 선택해 주세요.';return; }
      const count=state.youthProgram.events.length;persist(addYouthEvent(state,eventData,today));
      if(state.youthProgram.events.length===count) {el('#learning-program-feedback').textContent='이미 반영한 일정입니다.';return;}
      renderProgram();announce('날짜와 시간을 반영했습니다.');return;
    }
    if (event.target.id !== 'learning-log-form') return;
    event.preventDefault();
    persist(addStudyLog(state, state.selectedCourseId, `study-${now().getTime()}-${state.studyLogs.length}`, today, el('#learning-next-review').value));
    renderCourses(); renderDetail(); announce('공부 기록을 남겼습니다.');
  });
  el('#learning-today').textContent = `${dateLabel(today)} 학습일`;
  el('#learning-today').title = '하루 마감은 오전 2시입니다.';
  renderCourses(); renderDetail(); renderGuide(); selectView(view);
  announce('이 브라우저에 자동 저장');
  return { getState: () => state };
}
const pageRoot = typeof document === 'undefined' ? null : document.querySelector('#learning-page');
if (pageRoot) {
  let storage;
  try { storage = window.localStorage; } catch { /* 저장 실패는 화면에서 안내합니다. */ }
  createLearningApp(pageRoot, storage);
  scheduleLogicalDayRollover(window, logicalDateString());
}
