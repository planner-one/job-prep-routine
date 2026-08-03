import { INTERVIEW_QUESTIONS as CONTENTS, getInterviewQuestion } from './interview-data.js';
import { extractMarkdownHeadings, markdownToSafeHtml } from './github-markdown.js';
import { loadMaeilContent, MAEIL_CONTENT_COMMIT } from './maeil-content.js';
import {
  addItemToReadingPlan,
  createEmptyReadingState,
  markReadingItemOpened,
  markReadingItemRead,
  setReadingCompleted,
} from './reading-core.js';
import {
  loadReadingPlan,
  loadReadingState,
  saveReadingPlan,
  saveReadingState,
} from './reading-storage.js';
import { logicalDateString, scheduleLogicalDayRollover } from './routine-core.js';
import { createStudyAttempt } from './study-history-core.js';
import { createLocalStudyHistoryStorage } from './study-history-storage.js';

const LOAD_TIMEOUT_MS = 10_000;
const SAVE_ERROR = '읽기 기록을 저장하지 못했습니다. 본문은 계속 읽을 수 있어요.';

function find(root, selector) {
  if (!root) return null;
  if (root.matches?.(selector)) return root;
  return root.querySelector?.(selector) ?? null;
}

function documentFor(root) {
  return root?.ownerDocument ?? root;
}

export function contentIdFromLocation(location) {
  try {
    return new URLSearchParams(location?.search ?? '').get('id') ?? '';
  } catch {
    return '';
  }
}

export function quizReturnFromLocation(location) {
  try {
    const params = new URLSearchParams(location?.search ?? '');
    const sourceId = params.get('quizSource') ?? '';
    return {
      enabled: params.get('from') === 'quiz' && sourceId !== '',
      sourceId,
    };
  } catch {
    return { enabled: false, sourceId: '' };
  }
}

export function scrollToContentAnchor(page, location, view) {
  const hash = String(location?.hash ?? '');
  if (!hash) return null;
  let id = '';
  try { id = decodeURIComponent(hash.replace(/^#/u, '')); } catch { id = ''; }
  const target = (id && (page.ownerDocument ?? page).getElementById?.(id))
    || find(page, '#content-answer');
  if (!target) return null;
  const scroll = () => {
    target.scrollIntoView?.({ block: 'start' });
    if (!target.hasAttribute?.('tabindex')) target.setAttribute?.('tabindex', '-1');
    target.focus?.({ preventScroll: true });
  };
  if (typeof view?.requestAnimationFrame === 'function') view.requestAnimationFrame(scroll);
  else scroll();
  return target;
}

export function adjacentContents(question, questions = CONTENTS) {
  if (!question) return { previous: null, next: null };
  const ordered = [...questions].sort((left, right) => left.number - right.number);
  const index = ordered.findIndex(({ id }) => id === question.id);
  if (index < 0) return { previous: null, next: null };
  return {
    previous: index > 0 ? ordered[index - 1] : null,
    next: index < ordered.length - 1 ? ordered[index + 1] : null,
  };
}

export function estimateReadingMinutes(markdown) {
  const readable = String(markdown ?? '')
    .replace(/```[\s\S]*?```/gu, ' ')
    .replace(/<[^>]+>/gu, ' ')
    .replace(/[#>*_`|\[\]()~-]/gu, ' ')
    .replace(/\s+/gu, ' ')
    .trim();
  return Math.max(3, Math.ceil(readable.length / 700));
}

function setLink(link, question, label) {
  if (!link) return;
  link.hidden = !question;
  if (!question) return;
  link.href = `./content.html?id=${encodeURIComponent(question.id)}`;
  link.textContent = label;
}

function renderTableOfContents(page, headings) {
  const panel = find(page, '#content-toc-panel');
  const nav = find(page, '#content-toc');
  if (!panel || !nav) return;
  panel.hidden = headings.length === 0;
  const document = documentFor(nav);
  const fragment = document.createDocumentFragment();
  for (const heading of headings) {
    const link = document.createElement('a');
    link.href = `#${encodeURIComponent(heading.id)}`;
    link.dataset.level = String(heading.level);
    link.textContent = heading.text;
    fragment.append(link);
  }
  nav.replaceChildren(fragment);
}

function createTimedFetch(view, timeoutMs = LOAD_TIMEOUT_MS) {
  const fetchMethod = view?.fetch ?? globalThis.fetch;
  if (typeof fetchMethod !== 'function') return undefined;
  const Abort = view?.AbortController ?? globalThis.AbortController;
  return async (url) => {
    if (typeof Abort !== 'function') return fetchMethod.call(view ?? globalThis, url);
    const controller = new Abort();
    const timer = (view?.setTimeout ?? globalThis.setTimeout)(() => controller.abort(), timeoutMs);
    try {
      return await fetchMethod.call(view ?? globalThis, url, { signal: controller.signal });
    } finally {
      (view?.clearTimeout ?? globalThis.clearTimeout)(timer);
    }
  };
}

function emptyPlan(date) {
  return { date, ids: [], completedIds: [], updatedAt: null };
}

export function initContentPage(root = document, options = {}) {
  const page = root?.querySelector?.('[data-reader-page="detail"]')
    ?? (root?.dataset?.readerPage === 'detail' ? root : null);
  if (!page) return null;
  const pageDocument = documentFor(page);
  const view = options.view ?? pageDocument.defaultView ?? globalThis.window;
  const location = options.location ?? view?.location;
  const questions = options.questions ?? CONTENTS;
  const question = (options.getQuestion ?? getInterviewQuestion)(contentIdFromLocation(location));
  const detail = find(page, '#content-detail');
  const invalid = find(page, '#content-invalid');

  if (!question) {
    if (detail) detail.hidden = true;
    if (invalid) invalid.hidden = false;
    pageDocument.documentElement.dataset.contentReady = 'true';
    return null;
  }
  if (invalid) invalid.hidden = true;
  if (detail) detail.hidden = false;
  const quizReturn = quizReturnFromLocation(location);
  const quizReturnLink = find(page, '#content-quiz-return');
  if (quizReturnLink && quizReturn.enabled) {
    quizReturnLink.hidden = false;
    quizReturnLink.href = `./quiz.html?source=${encodeURIComponent(quizReturn.sourceId)}`;
  }

  const validIds = new Set(questions.map(({ id }) => id));
  const storage = options.storage ?? view?.localStorage;
  let studyHistory = options.studyHistory ?? null;
  try {
    studyHistory ??= createLocalStudyHistoryStorage(storage);
  } catch {
    studyHistory = null;
  }
  const now = options.now ?? (() => new Date());
  const date = logicalDateString(now());
  let state;
  let plan = null;

  function notify(message) {
    const live = find(page, '#content-live');
    if (live) live.textContent = message;
  }

  try {
    state = loadReadingState(storage, validIds);
  } catch {
    state = createEmptyReadingState();
    notify(SAVE_ERROR);
  }
  try {
    plan = loadReadingPlan(storage, date, validIds);
  } catch {
    plan = null;
  }

  function persistState(candidate) {
    state = candidate;
    try {
      state = saveReadingState(storage, candidate, validIds);
      return true;
    } catch {
      notify(SAVE_ERROR);
      return false;
    }
  }

  function persistPlan(candidate) {
    plan = candidate;
    try {
      plan = saveReadingPlan(storage, candidate, date, validIds);
      return true;
    } catch {
      notify(SAVE_ERROR);
      return false;
    }
  }

  function renderReadActions() {
    const item = state.items?.[question.id];
    const isRead = typeof item?.readAt === 'string';
    const mark = find(page, '#content-mark-read');
    if (mark) {
      mark.setAttribute('aria-pressed', String(isRead));
      mark.textContent = isRead ? '읽음 취소' : '읽음으로 표시';
    }
    const add = find(page, '#content-add-today');
    if (add) {
      const planned = Boolean(plan?.ids?.includes(question.id));
      add.disabled = planned;
      add.textContent = planned ? '오늘 목록에 있음' : '오늘 목록에 담기';
    }
  }

  const adjacent = adjacentContents(question, questions);
  const fileName = `${question.id}.md`;
  pageDocument.title = `${question.title} · 매일메일 백엔드 읽기`;
  find(page, '#content-file-name').textContent = fileName;
  find(page, '#content-document-name').textContent = fileName;
  find(page, '#content-category').textContent = question.category;
  find(page, '#content-title').textContent = question.title;
  find(page, '#content-number').textContent = `No. ${question.number}`;
  const sourceLink = find(page, '#content-source-link');
  const errorSource = find(page, '#content-error-source');
  for (const link of [sourceLink, errorSource]) link.href = question.sourceUrl;
  find(page, '#content-print-source').textContent = question.sourceUrl;
  const practice = find(page, '#content-practice-link');
  const practiceHref = `./template.html?id=${encodeURIComponent(question.id)}`;
  practice.href = practiceHref;
  const practiceCallout = find(page, '#content-practice-callout-link');
  if (practiceCallout) practiceCallout.href = practiceHref;
  const quiz = find(page, '#content-quiz-link');
  if (quiz) quiz.href = `./quiz.html?source=${encodeURIComponent(question.id)}`;
  const readMode = find(page, '#content-read-mode');
  if (readMode) readMode.href = `./content.html?id=${encodeURIComponent(question.id)}`;
  const quizMode = find(page, '#content-quiz-mode');
  if (quizMode) quizMode.href = `./quiz.html?source=${encodeURIComponent(question.id)}`;
  const interviewMode = find(page, '#content-interview-mode');
  if (interviewMode) interviewMode.href = `./template.html?id=${encodeURIComponent(question.id)}`;
  setLink(find(page, '#content-previous'), adjacent.previous, adjacent.previous ? `← ${adjacent.previous.id}.md` : '');
  setLink(find(page, '#content-next'), adjacent.next, adjacent.next ? `${adjacent.next.id}.md →` : '');
  renderReadActions();

  persistState(markReadingItemOpened(state, question.id, now()));

  async function loadBody() {
    const loading = find(page, '#content-loading');
    const error = find(page, '#content-error');
    const body = find(page, '#content-body');
    if (loading) {
      loading.hidden = false;
      loading.textContent = '고정 스냅샷에서 본문을 불러오는 중입니다.';
    }
    if (error) error.hidden = true;
    if (body) body.replaceChildren();
    delete pageDocument.documentElement.dataset.contentLoaded;

    try {
      const loaded = await loadMaeilContent(question.id, {
        fetchImpl: options.fetchImpl ?? createTimedFetch(view, options.timeoutMs),
        cache: options.cache ?? view?.caches ?? null,
        localBase: options.localBase ?? './content/maeil-mail/backend/contents',
      });
      body.innerHTML = markdownToSafeHtml(loaded.markdown);
      renderTableOfContents(page, extractMarkdownHeadings(loaded.markdown));
      find(page, '#content-reading-time').textContent = `약 ${estimateReadingMinutes(loaded.markdown)}분`;
      find(page, '#content-load-source').textContent = loaded.source === 'cache'
        ? '저장된 고정 원문'
        : (loaded.source === 'local' ? '로컬 고정 원문' : 'GitHub 고정 원문');
      if (loading) loading.hidden = true;
      pageDocument.documentElement.dataset.contentLoaded = 'true';
      scrollToContentAnchor(page, location, view);
      return loaded;
    } catch (loadError) {
      if (loading) loading.hidden = true;
      if (error) error.hidden = false;
      notify(loadError instanceof Error ? loadError.message : '본문을 불러오지 못했습니다.');
      pageDocument.documentElement.dataset.contentLoaded = 'error';
      return null;
    }
  }

  find(page, '#content-retry')?.addEventListener('click', loadBody);
  find(page, '#content-print')?.addEventListener('click', () => view?.print?.());
  find(page, '#content-add-today')?.addEventListener('click', () => {
    try {
      const base = plan ?? emptyPlan(date);
      const stored = persistPlan(addItemToReadingPlan(base, question.id, questions, state, now()));
      renderReadActions();
      if (stored) notify('오늘 목록에 담았습니다. 읽을 글은 제한 없이 더 추가할 수 있어요.');
    } catch (error) {
      notify(error instanceof Error ? error.message : '오늘 목록에 담지 못했습니다.');
    }
  });
  find(page, '#content-mark-read')?.addEventListener('click', () => {
    const read = typeof state.items?.[question.id]?.readAt !== 'string';
    const stateStored = persistState(markReadingItemRead(state, question.id, read, now()));
    let planStored = true;
    if (plan?.ids?.includes(question.id)) {
      planStored = persistPlan(setReadingCompleted(plan, question.id, read, now()));
    }
    renderReadActions();
    if (stateStored && planStored) {
      if (read && studyHistory) {
        try {
          studyHistory.save(createStudyAttempt({
            id: `reading:${question.id}:${now().getTime()}`,
            kind: 'reading',
            completedAt: now().toISOString(),
            sourceIds: [question.id],
            sourceCommit: MAEIL_CONTENT_COMMIT,
          }));
        } catch {
          // 기존 읽기 상태 저장은 성공했으므로 누적 이력 실패가 UI 흐름을 바꾸지 않는다.
        }
      }
      notify(read ? '읽은 글로 기록했습니다.' : '읽음 표시를 취소했습니다.');
    }
  });

  scheduleLogicalDayRollover(view, date, now);
  pageDocument.documentElement.dataset.contentReady = 'true';
  loadBody();
  return { question, date, loadBody, get state() { return state; }, get plan() { return plan; } };
}

if (typeof document !== 'undefined') initContentPage(document);
