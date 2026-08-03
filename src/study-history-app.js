import { getInterviewQuestion } from './interview-data.js';
import { getQuizQuestion } from './quiz-data.js';
import { logicalDateString, scheduleLogicalDayRollover } from './routine-core.js';
import { collectWrongAnswers } from './study-history-core.js';
import { buildStudyActivityCalendar } from './study-history-calendar-core.js';
import { createLocalStudyHistoryStorage } from './study-history-storage.js';

const WEEKDAY_LABELS = ['일', '월', '화', '수', '목', '금', '토'];
const STUDY_KIND_LABELS = Object.freeze({
  reading: '원문 읽기',
  'quiz-main': '5+5 퀴즈',
  'quiz-follow-up': '꼬리 질문',
  'interview-self': '면접 자가평가',
  'interview-ai': '면접 AI 평가',
});
export const STUDY_DETAIL_PAGE_SIZE = 6;

export function paginateStudyAttempts(attempts, requestedPage = 1, pageSize = STUDY_DETAIL_PAGE_SIZE) {
  const source = Array.isArray(attempts) ? attempts : [];
  const size = Number.isInteger(pageSize) && pageSize > 0 ? pageSize : STUDY_DETAIL_PAGE_SIZE;
  const totalPages = Math.max(1, Math.ceil(source.length / size));
  const numericPage = Number(requestedPage);
  const normalizedPage = Number.isFinite(numericPage) ? Math.trunc(numericPage) : 1;
  const page = Math.max(1, Math.min(totalPages, normalizedPage));
  const startIndex = (page - 1) * size;

  return {
    items: source.slice(startIndex, startIndex + size),
    page,
    pageSize: size,
    totalItems: source.length,
    totalPages,
  };
}

export function buildStudyDetailPageItems(totalPages, currentPage) {
  const normalizedTotal = Math.max(1, Math.trunc(Number(totalPages)) || 1);
  const normalizedCurrent = Math.max(1, Math.min(
    normalizedTotal,
    Math.trunc(Number(currentPage)) || 1,
  ));

  if (normalizedTotal <= 7) {
    return Array.from({ length: normalizedTotal }, (_, index) => index + 1);
  }
  if (normalizedCurrent <= 4) {
    return [1, 2, 3, 4, 5, 'ellipsis', normalizedTotal];
  }
  if (normalizedCurrent >= normalizedTotal - 3) {
    return [
      1,
      'ellipsis',
      normalizedTotal - 4,
      normalizedTotal - 3,
      normalizedTotal - 2,
      normalizedTotal - 1,
      normalizedTotal,
    ];
  }
  return [
    1,
    'ellipsis',
    normalizedCurrent - 1,
    normalizedCurrent,
    normalizedCurrent + 1,
    'ellipsis',
    normalizedTotal,
  ];
}

function parseDateKey(value) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value ?? '');
  if (!match) return null;
  const [, year, month, day] = match.map(Number);
  const date = new Date(year, month - 1, day, 12);
  if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) return null;
  return date;
}

export function formatStudyHistoryDate(value) {
  const date = parseDateKey(value);
  if (!date) return value;
  return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일 ${WEEKDAY_LABELS[date.getDay()]}요일`;
}

function element(pageDocument, tagName, className, textContent) {
  const node = pageDocument.createElement(tagName);
  if (className) node.className = className;
  if (textContent !== undefined) node.textContent = textContent;
  return node;
}

function setText(root, selector, value) {
  const target = root.querySelector(selector);
  if (target) target.textContent = value;
}

function sourceLabel(sourceId) {
  return getInterviewQuestion(sourceId)?.title ?? sourceId;
}

function formatShortRange(startDate, endDate) {
  const start = parseDateKey(startDate);
  const end = parseDateKey(endDate);
  if (!start || !end) return `${startDate} — ${endDate}`;
  const endLabel = start.getFullYear() === end.getFullYear()
    ? `${end.getMonth() + 1}월 ${end.getDate()}일`
    : `${end.getFullYear()}년 ${end.getMonth() + 1}월 ${end.getDate()}일`;
  return `${start.getFullYear()}년 ${start.getMonth() + 1}월 ${start.getDate()}일 — ${endLabel}`;
}

function formatAttemptTime(attempt) {
  const timestamp = attempt.completedAt ?? attempt.startedAt;
  if (!timestamp || Number.isNaN(Date.parse(timestamp))) return '';
  return new Intl.DateTimeFormat('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(new Date(timestamp));
}

function activityGroup(kind) {
  if (kind === 'reading') return 'reading';
  if (kind === 'quiz-main' || kind === 'quiz-follow-up') return 'quiz';
  return 'interview';
}

function sourceHref(attempt, sourceId) {
  const page = attempt.kind === 'interview-self' || attempt.kind === 'interview-ai'
    ? 'template.html'
    : 'content.html';
  return `./${page}?id=${encodeURIComponent(sourceId)}`;
}

function summarizeAttempts(attempts) {
  const summary = {
    reading: 0,
    quizMain: 0,
    quizFollowUp: 0,
    interviewSelf: 0,
    interviewAi: 0,
    quizAnswered: 0,
    quizCorrect: 0,
  };
  for (const attempt of attempts) {
    if (attempt.kind === 'reading') summary.reading += 1;
    if (attempt.kind === 'quiz-main') summary.quizMain += 1;
    if (attempt.kind === 'quiz-follow-up') summary.quizFollowUp += 1;
    if (attempt.kind === 'interview-self') summary.interviewSelf += 1;
    if (attempt.kind === 'interview-ai') summary.interviewAi += 1;
    if (attempt.score) {
      summary.quizAnswered += attempt.score.total - attempt.score.unanswered;
      summary.quizCorrect += attempt.score.correct;
    }
  }
  summary.quizPercent = summary.quizAnswered === 0
    ? null
    : Math.round((summary.quizCorrect / summary.quizAnswered) * 100);
  return summary;
}

function quizScoreLabel(score) {
  const answered = score.total - score.unanswered;
  const percent = answered === 0 ? 0 : Math.round((score.correct / answered) * 100);
  return `정답 ${score.correct}/${answered} · ${percent}%`;
}

function createWrongAnswerItem(pageDocument, wrong) {
  const question = getQuizQuestion(wrong.questionId);
  const item = element(pageDocument, 'li', 'study-wrong-item');
  item.append(element(
    pageDocument,
    'strong',
    'study-wrong-question',
    question?.question ?? `문항 ${wrong.questionId}`,
  ));
  item.append(element(
    pageDocument,
    'span',
    'study-wrong-source',
    `${wrong.kind === 'quiz-follow-up' ? '꼬리 질문' : '메인 퀴즈'} · ${sourceLabel(wrong.sourceId)}`,
  ));
  const selectedAnswer = question?.choices?.[wrong.selectedIndex] ?? `선택지 ${(wrong.selectedIndex ?? 0) + 1}`;
  const correctAnswer = question?.choices?.[wrong.correctIndex] ?? `선택지 ${(wrong.correctIndex ?? 0) + 1}`;
  const answers = element(pageDocument, 'div', 'study-wrong-answer-grid');
  answers.append(
    element(pageDocument, 'span', 'study-wrong-answer is-selected', `내 답 · ${selectedAnswer}`),
    element(pageDocument, 'span', 'study-wrong-answer is-correct', `정답 · ${correctAnswer}`),
  );
  item.append(answers);
  return item;
}

function appendQuizWrongAnswerToggle(pageDocument, card, attempt) {
  const wrongAnswers = collectWrongAnswers({ attempts: [attempt] }, { status: 'completed' });
  if (wrongAnswers.length === 0) return;

  const details = element(pageDocument, 'details', 'study-quiz-wrong-details');
  const summary = element(
    pageDocument,
    'summary',
    'study-quiz-wrong-toggle',
    `오답 ${wrongAnswers.length}개 다시 보기`,
  );
  const wrongList = element(pageDocument, 'ul', 'study-quiz-wrong-list');
  wrongList.setAttribute('aria-label', `${STUDY_KIND_LABELS[attempt.kind] ?? '퀴즈'} 오답`);
  for (const wrong of wrongAnswers) wrongList.append(createWrongAnswerItem(pageDocument, wrong));
  details.append(summary, wrongList);
  card.append(details);
}

function renderDetailPagination(root, pagination) {
  const pageDocument = root.ownerDocument;
  const navigation = root.querySelector('#study-activity-pagination');
  if (!navigation) return;

  navigation.replaceChildren();
  navigation.hidden = pagination.totalPages <= 1;
  if (navigation.hidden) return;

  function appendPageButton(label, targetPage, { current = false, disabled = false, direction = false } = {}) {
    const button = element(
      pageDocument,
      'button',
      `study-pagination-button${direction ? ' is-direction' : ''}`,
      label,
    );
    button.type = 'button';
    button.dataset.studyDetailPage = String(targetPage);
    button.disabled = disabled;
    if (current) button.setAttribute('aria-current', 'page');
    button.setAttribute(
      'aria-label',
      direction ? `${label} 페이지` : `${targetPage}페이지${current ? ', 현재 페이지' : ''}`,
    );
    navigation.append(button);
  }

  appendPageButton('이전', pagination.page - 1, {
    disabled: pagination.page === 1,
    direction: true,
  });

  for (const item of buildStudyDetailPageItems(pagination.totalPages, pagination.page)) {
    if (item === 'ellipsis') {
      const ellipsis = element(pageDocument, 'span', 'study-pagination-ellipsis', '…');
      ellipsis.setAttribute('aria-hidden', 'true');
      navigation.append(ellipsis);
      continue;
    }
    appendPageButton(String(item), item, { current: item === pagination.page });
  }

  appendPageButton('다음', pagination.page + 1, {
    disabled: pagination.page === pagination.totalPages,
    direction: true,
  });
}

function calendarAriaLabel(day) {
  return `${formatStudyHistoryDate(day.date)} · 완료 활동 ${day.count}건`;
}

function renderCalendar(root, calendar, selectedDate) {
  const pageDocument = root.ownerDocument;
  const calendarRoot = root.querySelector('#study-activity-calendar');
  const months = root.querySelector('#study-activity-months');
  if (!calendarRoot || !months) return;

  calendarRoot.replaceChildren();
  months.replaceChildren();
  calendarRoot.style.setProperty('--study-calendar-weeks', String(calendar.weeks.length));
  months.style.setProperty('--study-calendar-weeks', String(calendar.weeks.length));

  for (const { weekIndex, label } of calendar.monthLabels) {
    const month = element(pageDocument, 'span', 'study-calendar-month', label);
    month.style.setProperty('--study-calendar-week', String(weekIndex + 1));
    months.append(month);
  }

  calendar.weeks.forEach((week, weekIndex) => {
    week.forEach((day, weekdayIndex) => {
      if (!day) {
        const blank = element(pageDocument, 'span', 'study-calendar-blank');
        blank.style.setProperty('--study-calendar-week', String(weekIndex + 1));
        blank.style.setProperty('--study-calendar-weekday', String(weekdayIndex + 1));
        blank.setAttribute('aria-hidden', 'true');
        calendarRoot.append(blank);
        return;
      }
      const button = element(pageDocument, 'button', `study-calendar-day is-level-${day.level}`);
      button.type = 'button';
      button.dataset.studyDate = day.date;
      button.style.setProperty('--study-calendar-week', String(weekIndex + 1));
      button.style.setProperty('--study-calendar-weekday', String(weekdayIndex + 1));
      button.setAttribute('aria-label', calendarAriaLabel(day));
      button.setAttribute('aria-pressed', String(day.date === selectedDate));
      button.tabIndex = day.date === selectedDate ? 0 : -1;
      button.title = calendarAriaLabel(day);
      calendarRoot.append(button);
    });
  });
}

function updateSelectedCalendarDay(root, selectedDate) {
  const buttons = root.querySelectorAll('[data-study-date]');
  for (const button of buttons) {
    const selected = button.dataset.studyDate === selectedDate;
    button.setAttribute('aria-pressed', String(selected));
    button.tabIndex = selected ? 0 : -1;
  }
}

function renderSelectedDay(root, selectedDate, attempts, requestedPage = 1) {
  const pageDocument = root.ownerDocument;
  const safeAttempts = Array.isArray(attempts) ? attempts : [];
  const summary = summarizeAttempts(safeAttempts);
  const pagination = paginateStudyAttempts(safeAttempts, requestedPage);
  const empty = root.querySelector('#study-activity-detail-empty');
  const list = root.querySelector('#study-activity-detail-list');
  if (!empty || !list) return pagination;

  setText(root, '#study-activity-selected-date', formatStudyHistoryDate(selectedDate));
  const selectedDateElement = root.querySelector('#study-activity-selected-date');
  if (selectedDateElement) selectedDateElement.dateTime = selectedDate;
  setText(root, '#study-activity-selected-count', `완료 활동 ${safeAttempts.length}건`);
  setText(root, '#study-activity-quiz-percent', summary.quizPercent === null ? '–' : `${summary.quizPercent}%`);
  setText(root, '#study-day-reading-count', String(summary.reading));
  setText(root, '#study-day-quiz-count', String(summary.quizMain + summary.quizFollowUp));
  setText(root, '#study-day-interview-count', String(summary.interviewSelf + summary.interviewAi));
  list.replaceChildren();
  empty.hidden = safeAttempts.length !== 0;

  for (const attempt of pagination.items) {
    const card = element(pageDocument, 'article', 'study-activity-detail-card');
    const group = activityGroup(attempt.kind);
    card.dataset.studyKind = group;
    const marker = element(pageDocument, 'span', 'study-activity-kind-marker', group === 'reading' ? '읽' : (group === 'quiz' ? '퀴' : '면'));
    marker.setAttribute('aria-hidden', 'true');
    const content = element(pageDocument, 'div', 'study-activity-detail-content');
    const heading = element(pageDocument, 'div', 'study-activity-detail-heading');
    const completedTime = element(pageDocument, 'time', '', formatAttemptTime(attempt));
    completedTime.dateTime = attempt.completedAt ?? attempt.startedAt ?? '';
    heading.append(
      element(pageDocument, 'h3', '', STUDY_KIND_LABELS[attempt.kind] ?? '학습 기록'),
      completedTime,
    );
    const sources = element(pageDocument, 'p', 'study-activity-detail-sources', attempt.sourceIds.map(sourceLabel).join(' · '));
    content.append(heading, sources);
    const meta = element(pageDocument, 'div', 'study-activity-detail-meta');
    if (attempt.score) {
      meta.append(element(
        pageDocument,
        'span',
        'study-activity-detail-score',
        quizScoreLabel(attempt.score),
      ));
    }
    const sourceId = attempt.sourceIds[0];
    if (sourceId) {
      const linkLabel = group === 'interview' ? '연습 보기 →' : '원문 보기 →';
      const link = element(pageDocument, 'a', 'study-activity-source-link screen-only', linkLabel);
      link.href = sourceHref(attempt, sourceId);
      meta.append(link);
    }
    card.append(marker, content, meta);
    appendQuizWrongAnswerToggle(pageDocument, card, attempt);
    list.append(card);
  }

  renderDetailPagination(root, pagination);
  return pagination;
}

export function initStudyHistoryPage(pageDocument, storage, date = logicalDateString()) {
  const root = pageDocument.getElementById('study-history-page');
  if (!root) return null;
  const view = pageDocument.defaultView;
  const studyStorage = createLocalStudyHistoryStorage(storage);
  let selectedDate = date;
  let selectedDetailPage = 1;
  let calendar = null;

  function renderSelectedDetail() {
    const selectedDay = calendar?.days.find((day) => day.date === selectedDate);
    const pagination = renderSelectedDay(
      root,
      selectedDate,
      selectedDay?.attempts ?? [],
      selectedDetailPage,
    );
    selectedDetailPage = pagination?.page ?? 1;
  }

  function render() {
    const focusedDate = pageDocument.activeElement?.dataset?.studyDate ?? null;
    calendar = buildStudyActivityCalendar(studyStorage.loadAll(), date);
    if (!calendar.days.some((day) => day.date === selectedDate)) {
      selectedDate = calendar.endDate;
      selectedDetailPage = 1;
    }
    setText(root, '#study-activity-total', String(calendar.totalActivities));
    setText(root, '#study-activity-active-days', String(calendar.activeDays));
    setText(root, '#study-activity-current-streak', String(calendar.currentStreak));
    setText(root, '#study-activity-total-quiz-percent', calendar.quizPercent === null ? '–' : `${calendar.quizPercent}%`);
    setText(root, '#study-activity-quiz-answer-count', calendar.quizAnswered ? `${calendar.quizCorrect}/${calendar.quizAnswered} 정답` : '풀이 기록 없음');
    setText(root, '#study-activity-reading-total', String(calendar.activityCounts.reading));
    setText(root, '#study-activity-quiz-total', String(calendar.activityCounts.quiz));
    setText(root, '#study-activity-interview-total', String(calendar.activityCounts.interview));
    setText(root, '#study-activity-range', formatShortRange(calendar.startDate, calendar.endDate));
    renderCalendar(root, calendar, selectedDate);
    renderSelectedDetail();
    if (focusedDate) root.querySelector(`[data-study-date="${focusedDate}"]`)?.focus();
  }

  function selectDate(nextDate) {
    if (!calendar?.days.some((day) => day.date === nextDate)) return;
    if (selectedDate !== nextDate) selectedDetailPage = 1;
    selectedDate = nextDate;
    updateSelectedCalendarDay(root, selectedDate);
    renderSelectedDetail();
  }

  function handleClick(event) {
    const pageButton = event.target.closest?.('[data-study-detail-page]');
    if (pageButton && root.contains(pageButton) && !pageButton.disabled) {
      selectedDetailPage = Number(pageButton.dataset.studyDetailPage);
      renderSelectedDetail();
      root.querySelector(
        `[data-study-detail-page="${selectedDetailPage}"][aria-current="page"]`,
      )?.focus();
      return;
    }

    const day = event.target.closest?.('[data-study-date]');
    if (!day || !root.contains(day)) return;
    selectDate(day.dataset.studyDate ?? date);
  }

  function handleKeydown(event) {
    const day = event.target.closest?.('[data-study-date]');
    if (!day || !root.contains(day)) return;
    const offsets = {
      ArrowUp: -1,
      ArrowDown: 1,
      ArrowLeft: -7,
      ArrowRight: 7,
    };
    const buttons = [...root.querySelectorAll('[data-study-date]')];
    const currentIndex = buttons.indexOf(day);
    let nextIndex = currentIndex + (offsets[event.key] ?? 0);
    if (event.key === 'Home') nextIndex = 0;
    if (event.key === 'End') nextIndex = buttons.length - 1;
    if (!(event.key in offsets) && event.key !== 'Home' && event.key !== 'End') return;
    event.preventDefault();
    const next = buttons[Math.max(0, Math.min(buttons.length - 1, nextIndex))];
    selectDate(next.dataset.studyDate);
    next.focus();
  }

  function handleStorage(event) {
    if (!event.key || event.key.startsWith('job-prep-routine:')) render();
  }

  root.addEventListener('click', handleClick);
  root.addEventListener('keydown', handleKeydown);
  view?.addEventListener?.('storage', handleStorage);
  const cancelRollover = view ? scheduleLogicalDayRollover(view, date) : () => {};
  render();
  pageDocument.documentElement.dataset.studyHistoryReady = 'true';

  return {
    getSelectedDate: () => selectedDate,
    getSelectedDetailPage: () => selectedDetailPage,
    refresh: render,
    destroy() {
      cancelRollover();
      root.removeEventListener('click', handleClick);
      root.removeEventListener('keydown', handleKeydown);
      view?.removeEventListener?.('storage', handleStorage);
      delete pageDocument.documentElement.dataset.studyHistoryReady;
    },
  };
}

if (typeof document !== 'undefined') {
  const boot = () => initStudyHistoryPage(document, window.localStorage, logicalDateString());
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot, { once: true });
  } else {
    boot();
  }
}
