import {
  buildPeriodRecords,
  collectHistoryRecords,
  summarizeHistory,
} from './history-core.js';
import {
  logicalDateString,
  parseLocalDateKey,
  scheduleLogicalDayRollover,
} from './routine-core.js';
import { MODE_LABELS } from './routine-data.js';
import { loadUiPreferences, saveUiPreferences } from './ui-preferences.js';

const WEEKLY_CHECK_LABELS = {
  activity: '운동·회복 완료',
  review: '이력서·포트폴리오 숙지',
  interview: '면접 연습·복기',
  mealRest: '식후 20분 휴식',
  deadline: '마감 임박 공고 확인',
  application: '지원 완료',
  nextWeek: '다음 주 준비',
  rest: '충분한 휴식',
};

const COMPLETION_SOURCE_LABELS = {
  daily: '데일리 기준',
  roadmap: '로드맵 기준',
  weekly: '주간 기준',
};

const WEEKDAY_LABELS = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];

export function formatHistoryDate(value) {
  const date = parseLocalDateKey(value);
  if (!date) return value;
  return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일 ${WEEKDAY_LABELS[date.getDay()]}`;
}

function formatShortDate(value) {
  const date = parseLocalDateKey(value);
  if (!date) return value;
  return `${date.getMonth() + 1}/${date.getDate()}`;
}

export function historyModeLabel(mode) {
  return MODE_LABELS[mode] ?? '기록';
}

export function weeklyCheckLabel(checkId) {
  const application = /^application-(\d+)$/.exec(checkId ?? '');
  if (application) return `지원 ${application[1]}`;
  return WEEKLY_CHECK_LABELS[checkId] ?? checkId;
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

function renderKpis(root, summary, period) {
  setText(root, '#history-kpi-completion', `${summary.averageCompletion}%`);
  setText(root, '#history-kpi-active', `${summary.activeDays} / ${period}일`);
  setText(root, '#history-kpi-applications', `${summary.applications}개`);
  setText(root, '#history-kpi-interview', `${summary.interviewDays}일`);
  setText(root, '#history-kpi-exercise', `${summary.exerciseDays}일`);
}

function activityMarker(pageDocument, className, label, shortLabel) {
  const marker = element(pageDocument, 'span', `history-activity-marker ${className}`, shortLabel);
  marker.setAttribute('aria-label', label);
  marker.title = label;
  return marker;
}

function renderChart(root, records, period) {
  const pageDocument = root.ownerDocument;
  const chart = root.querySelector('#history-chart');
  chart.replaceChildren();
  chart.dataset.period = String(period);
  chart.setAttribute('aria-label', `최근 ${period}일 날짜별 완료율과 핵심 활동`);

  for (const record of records) {
    const day = element(pageDocument, 'div', 'history-chart-day');
    day.classList.toggle('is-empty', !record.hasActivity);

    const value = element(pageDocument, 'strong', 'history-chart-value', `${record.completion.percent}%`);
    const track = element(pageDocument, 'div', 'history-chart-track');
    const bar = element(pageDocument, 'span', 'history-chart-bar');
    bar.style.setProperty('--history-completion', `${record.completion.percent}%`);
    track.append(bar);

    const date = element(pageDocument, 'time', 'history-chart-date', formatShortDate(record.date));
    date.dateTime = record.date;

    const markers = element(pageDocument, 'div', 'history-activity-markers');
    if (record.metrics.applications > 0) {
      markers.append(
        activityMarker(
          pageDocument,
          'is-application',
          `지원 ${record.metrics.applications}개`,
          `지${record.metrics.applications}`,
        ),
      );
    }
    if (record.metrics.interview) {
      markers.append(activityMarker(pageDocument, 'is-interview', '면접 실행', '면'));
    }
    if (record.metrics.exercise) {
      markers.append(activityMarker(pageDocument, 'is-exercise', '운동·러닝 실행', '운'));
    }

    day.setAttribute(
      'aria-label',
      `${formatHistoryDate(record.date)}, 완료율 ${record.completion.percent}%, 지원 ${record.metrics.applications}개`,
    );
    day.append(value, track, date, markers);
    chart.append(day);
  }
}

function appendListSection(pageDocument, parent, title, items, labelForItem) {
  if (items.length === 0) return;
  const section = element(pageDocument, 'section', 'history-detail-section');
  section.append(element(pageDocument, 'h4', '', title));
  const list = element(pageDocument, 'ul', 'history-detail-list');
  for (const item of items) list.append(element(pageDocument, 'li', '', labelForItem(item)));
  section.append(list);
  parent.append(section);
}

function appendCompanies(pageDocument, parent, companies) {
  if (companies.length === 0) return;
  const section = element(pageDocument, 'section', 'history-detail-section history-company-history');
  section.append(element(pageDocument, 'h4', '', '지원 파이프라인'));
  const list = element(pageDocument, 'div', 'history-company-list');

  for (const company of companies) {
    const row = element(pageDocument, 'article', 'history-company-row');
    const head = element(pageDocument, 'div', 'history-company-head');
    head.append(
      element(pageDocument, 'strong', '', company.name.trim() || '회사명 미입력'),
      element(pageDocument, 'span', '', company.platform || '플랫폼 미입력'),
    );
    const steps = element(pageDocument, 'div', 'history-company-steps');
    for (const [key, label] of [
      ['analyzed', '분석'],
      ['letter', '자소서'],
      ['applied', '지원'],
    ]) {
      const step = element(pageDocument, 'span', company[key] ? 'is-complete' : '', label);
      steps.append(step);
    }
    row.append(head, steps);

    if (company.link.trim()) {
      const link = element(pageDocument, 'a', 'history-company-link job-link-row screen-only', '지원 공고 열기');
      link.href = company.link;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      row.append(link);
    }
    list.append(row);
  }

  section.append(list);
  parent.append(section);
}

function appendMemos(pageDocument, parent, memos) {
  const entries = [
    ['오늘 구현한 것', memos.implemented],
    ['막힌 것', memos.blocked],
    ['내일 첫 행동', memos.firstAction],
  ].filter(([, value]) => value.trim());
  if (entries.length === 0) return;

  const section = element(pageDocument, 'section', 'history-detail-section history-memo-history');
  section.append(element(pageDocument, 'h4', '', '하루 마감'));
  const list = element(pageDocument, 'dl', 'history-memo-list');
  for (const [label, value] of entries) {
    list.append(element(pageDocument, 'dt', '', label), element(pageDocument, 'dd', '', value));
  }
  section.append(list);
  parent.append(section);
}

function recordCard(pageDocument, record, index) {
  const details = element(pageDocument, 'details', 'history-record-card');
  details.open = index === 0;

  const summary = element(pageDocument, 'summary', 'history-record-summary');
  const identity = element(pageDocument, 'div', 'history-record-identity');
  const date = element(pageDocument, 'time', '', formatHistoryDate(record.date));
  date.dateTime = record.date;
  identity.append(date, element(pageDocument, 'span', 'history-mode-badge', historyModeLabel(record.mode)));

  const metrics = element(pageDocument, 'div', 'history-record-metrics');
  metrics.append(
    element(pageDocument, 'strong', '', `${record.completion.percent}%`),
    element(
      pageDocument,
      'span',
      '',
      COMPLETION_SOURCE_LABELS[record.completion.source] ?? '체크 기준',
    ),
    element(pageDocument, 'span', '', `지원 ${record.metrics.applications}개`),
  );
  summary.append(identity, metrics);

  const body = element(pageDocument, 'div', 'history-record-body');
  appendListSection(
    pageDocument,
    body,
    '데일리 포커스 완료 일정',
    record.dailyCompletedSchedule,
    (item) => `${item.time} ${item.label}`,
  );
  appendListSection(
    pageDocument,
    body,
    '운영 로드맵 완료 일정',
    record.roadmapCompletedSchedule,
    (item) => `${item.time} ${item.label}`,
  );
  appendListSection(
    pageDocument,
    body,
    record.isMaintenance ? '주간 핵심 유지 체크' : '주간 실행 체크',
    record.weeklyChecks.completed,
    weeklyCheckLabel,
  );
  appendCompanies(pageDocument, body, record.companies);
  appendMemos(pageDocument, body, record.memos);

  details.append(summary, body);
  return details;
}

function renderRecords(root, records) {
  const pageDocument = root.ownerDocument;
  const list = root.querySelector('#history-record-list');
  const empty = root.querySelector('#history-empty');
  list.replaceChildren();
  empty.hidden = records.length !== 0;
  setText(root, '#history-record-count', `${records.length}일 기록`);
  records.forEach((record, index) => list.append(recordCard(pageDocument, record, index)));
}

function setPressedPeriod(root, period) {
  for (const button of root.querySelectorAll('[data-history-period]')) {
    button.setAttribute('aria-pressed', String(Number(button.dataset.historyPeriod) === period));
  }
}

export function initHistoryPage(pageDocument, storage, date = logicalDateString()) {
  const root = pageDocument.getElementById('history-page');
  if (!root) return null;
  let period = loadUiPreferences(storage).history.period;
  const view = pageDocument.defaultView;

  const dateElement = root.querySelector('#history-current-date');
  if (dateElement) {
    dateElement.dateTime = date;
    dateElement.textContent = formatHistoryDate(date);
  }

  function render() {
    const periodRecords = buildPeriodRecords(storage, date, period);
    renderKpis(root, summarizeHistory(periodRecords), period);
    renderChart(root, periodRecords, period);
    renderRecords(root, collectHistoryRecords(storage));
    setText(root, '#history-range-label', `최근 ${period}일`);
    setPressedPeriod(root, period);
  }

  function handleClick(event) {
    const periodButton = event.target.closest?.('[data-history-period]');
    if (periodButton && root.contains(periodButton)) {
      period = Number(periodButton.dataset.historyPeriod) === 30 ? 30 : 7;
      saveUiPreferences(storage, { history: { period } });
      render();
      return;
    }
    if (event.target.closest?.('#history-pdf-preview')) view?.print?.();
  }

  function handleStorage(event) {
    if (!event.key || event.key.startsWith('job-prep-routine:')) render();
  }

  root.addEventListener('click', handleClick);
  view?.addEventListener?.('storage', handleStorage);
  const cancelRollover = view
    ? scheduleLogicalDayRollover(view, date)
    : () => {};
  render();
  pageDocument.documentElement.dataset.historyReady = 'true';

  return {
    getPeriod: () => period,
    refresh: render,
    destroy() {
      cancelRollover();
      root.removeEventListener('click', handleClick);
      view?.removeEventListener?.('storage', handleStorage);
      delete pageDocument.documentElement.dataset.historyReady;
    },
  };
}

if (typeof document !== 'undefined') {
  const boot = () => initHistoryPage(document, window.localStorage, logicalDateString());
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot, { once: true });
  } else {
    boot();
  }
}
