import { INTERVIEW_QUESTIONS, getInterviewQuestion } from './interview-data.js';
import {
  addQuestionToQueue,
  createEmptyInterviewState,
  createEmptyQuestionState,
  resetQuestionState,
  setQueueCompleted,
  setQueuePinned,
  updateQuestionState,
} from './interview-core.js';
import {
  loadOrCreateDailyQueue,
  loadInterviewState,
  saveInterviewQueue,
  saveInterviewState,
} from './interview-storage.js';
import { logicalDateString, scheduleLogicalDayRollover } from './routine-core.js';

const STATUS_LABELS = Object.freeze({
  unseen: '미학습',
  studying: '학습 중',
  review: '복습 필요',
  done: '완료',
});
const STATUS_OPTIONS = Object.freeze(Object.entries(STATUS_LABELS));
const SAVE_ERROR_MESSAGE = '저장하지 못했습니다. 작성 중인 내용은 화면에 유지됩니다.';
const EMPTY_LAST_STUDIED = '아직 학습 기록이 없습니다.';
const RESET_CONFIRM_MESSAGE = '이 질문의 답변과 학습 기록을 초기화할까요?';

function find(root, selector) {
  if (!root) return null;
  if (root.matches?.(selector)) return root;
  if (selector.startsWith('#') && root.id === selector.slice(1)) return root;
  return root.querySelector?.(selector) ?? null;
}

function documentFor(root) {
  return root?.ownerDocument ?? root;
}

function setText(root, selector, value) {
  const element = find(root, selector);
  if (element) element.textContent = String(value);
}

function setPressed(element, pressed) {
  element?.setAttribute('aria-pressed', String(Boolean(pressed)));
}

function isPressed(element) {
  return element?.getAttribute('aria-pressed') === 'true';
}

function questionStateFor(state, id) {
  return state?.questions?.[id] ?? createEmptyQuestionState();
}

function validIsoTimestamp(value) {
  if (typeof value !== 'string' || value.trim() === '') return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date.toISOString();
}

function clone(value) {
  return typeof structuredClone === 'function'
    ? structuredClone(value)
    : JSON.parse(JSON.stringify(value));
}

export function questionIdFromLocation(location) {
  try {
    return new URLSearchParams(location?.search ?? '').get('id') ?? '';
  } catch {
    return '';
  }
}

export function previousNextQuestions(question, questions = INTERVIEW_QUESTIONS) {
  if (!question) return { previous: null, next: null };
  const ordered = [...questions].sort((left, right) => left.order - right.order);
  const index = ordered.findIndex(({ id }) => id === question.id);
  if (index < 0) return { previous: null, next: null };
  return {
    previous: index > 0 ? ordered[index - 1] : null,
    next: index < ordered.length - 1 ? ordered[index + 1] : null,
  };
}

export function formatLastStudied(value) {
  const iso = validIsoTimestamp(value);
  if (!iso) return EMPTY_LAST_STUDIED;
  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(iso));
}

export function collectQuestionPatch(root) {
  const confidence = Number.parseInt(find(root, '#detail-confidence')?.value ?? '0', 10);
  return {
    status: find(root, '#detail-status')?.value ?? 'unseen',
    confidence: Number.isInteger(confidence) && confidence >= 0 && confidence <= 5 ? confidence : 0,
    favorite: isPressed(find(root, '#detail-favorite')),
    queuePinned: isPressed(find(root, '#detail-pinned')),
    answer: find(root, '#detail-answer')?.value ?? '',
    keywords: find(root, '#detail-keywords')?.value ?? '',
    memo: find(root, '#detail-memo')?.value ?? '',
  };
}

function appendPrintValue(document, list, label, value) {
  const term = document.createElement('dt');
  term.textContent = label;
  const description = document.createElement('dd');
  description.textContent = String(value);
  list.append(term, description);
}

export function syncDetailPrintValues(root, question, questionState = createEmptyQuestionState()) {
  const container = find(root, '#detail-print-values');
  if (!container || !question) return null;
  const document = documentFor(container);
  const state = { ...createEmptyQuestionState(), ...questionState };
  const list = document.createElement('dl');
  appendPrintValue(document, list, '질문', question.title);
  appendPrintValue(document, list, '카테고리', question.category);
  appendPrintValue(document, list, '상태', STATUS_LABELS[state.status] ?? STATUS_LABELS.unseen);
  appendPrintValue(document, list, '자신감', state.confidence > 0 ? `${state.confidence} / 5` : '선택 안 함');
  appendPrintValue(document, list, '답변', state.answer || '작성된 답변이 없습니다.');
  appendPrintValue(document, list, '키워드', state.keywords || '작성된 키워드가 없습니다.');
  appendPrintValue(document, list, '메모', state.memo || '작성된 메모가 없습니다.');
  appendPrintValue(document, list, '마지막 학습일', formatLastStudied(state.lastStudiedAt));
  appendPrintValue(document, list, '출처', question.sourceUrl);
  container.replaceChildren(list);
  return container;
}

function renderStatusOptions(root, selected) {
  const select = find(root, '#detail-status');
  if (!select) return;
  const document = documentFor(select);
  const options = STATUS_OPTIONS.map(([value, label]) => {
    const option = document.createElement('option');
    option.value = value;
    option.textContent = label;
    return option;
  });
  select.replaceChildren(...options);
  select.value = STATUS_LABELS[selected] ? selected : 'unseen';
}

function renderLastStudied(root, value) {
  const element = find(root, '#detail-last-studied');
  if (!element) return;
  const iso = validIsoTimestamp(value);
  element.textContent = formatLastStudied(value);
  if (iso) element.setAttribute('datetime', iso);
  else element.removeAttribute('datetime');
}

function renderNavigation(root, question) {
  const adjacent = previousNextQuestions(question, INTERVIEW_QUESTIONS);
  const previous = find(root, '[data-detail-previous]');
  const next = find(root, '[data-detail-next]');
  for (const [button, target] of [[previous, adjacent.previous], [next, adjacent.next]]) {
    if (!button) continue;
    button.disabled = target === null;
    button.hidden = target === null;
    if (target) button.dataset.questionId = target.id;
    else delete button.dataset.questionId;
  }
}

export function initTemplateDetailPage(root = document, options = {}) {
  const page = root?.getElementById?.('template-detail-page')
    ?? (root?.id === 'template-detail-page' ? root : root?.querySelector?.('#template-detail-page'));
  if (!page) return null;
  const pageDocument = documentFor(page);
  const view = options.view
    ?? pageDocument.defaultView
    ?? (typeof window !== 'undefined' ? window : null);
  const location = options.location ?? view?.location;
  const question = getInterviewQuestion(questionIdFromLocation(location));
  const detail = find(page, '#interview-detail');
  const invalid = find(page, '#interview-invalid');

  if (!question) {
    if (detail) detail.hidden = true;
    if (invalid) invalid.hidden = false;
    pageDocument.documentElement.dataset.templateDetailReady = 'true';
    return null;
  }

  if (detail) detail.hidden = false;
  if (invalid) invalid.hidden = true;

  const storage = options.storage ?? view?.localStorage;
  const now = options.now ?? (() => new Date());
  const date = logicalDateString(now());
  const validIds = new Set(INTERVIEW_QUESTIONS.map(({ id }) => id));
  let startupMessage = '';
  let state;
  let queue;
  try {
    state = loadInterviewState(storage, validIds);
  } catch {
    state = createEmptyInterviewState();
    startupMessage = SAVE_ERROR_MESSAGE;
  }
  queue = loadOrCreateDailyQueue(
    storage,
    INTERVIEW_QUESTIONS,
    state,
    date,
    validIds,
    now(),
    () => { startupMessage = SAVE_ERROR_MESSAGE; },
  );

  function notify(message) {
    setText(page, '#detail-live', message);
  }

  function renderQuestionState({ preserveText = true } = {}) {
    const saved = questionStateFor(state, question.id);
    renderStatusOptions(page, saved.status);
    const confidence = find(page, '#detail-confidence');
    if (confidence) confidence.value = String(saved.confidence);
    setPressed(find(page, '#detail-favorite'), saved.favorite);
    setPressed(find(page, '#detail-pinned'), saved.queuePinned);
    if (!preserveText) {
      const answer = find(page, '#detail-answer');
      const keywords = find(page, '#detail-keywords');
      const memo = find(page, '#detail-memo');
      if (answer) answer.value = saved.answer;
      if (keywords) keywords.value = saved.keywords;
      if (memo) memo.value = saved.memo;
    }
    renderLastStudied(page, saved.lastStudiedAt);
    const completed = queue.completedIds.includes(question.id);
    const complete = find(page, '.interview-complete-today');
    setPressed(complete, completed);
    if (complete) complete.textContent = completed ? '오늘 완료 취소' : '오늘 학습 완료';
    syncDetailPrintValues(page, question, saved);
  }

  function saveStateOnly(candidateState) {
    try {
      state = saveInterviewState(storage, candidateState, validIds);
      return true;
    } catch {
      return false;
    }
  }

  function saveQueueOnly(candidateQueue) {
    try {
      queue = saveInterviewQueue(storage, candidateQueue, date, validIds);
      return true;
    } catch {
      return false;
    }
  }

  function saveStateAndQueue(candidateState, candidateQueue) {
    const previousState = state;
    const previousQueue = queue;
    try {
      const savedState = saveInterviewState(storage, candidateState, validIds);
      const savedQueue = saveInterviewQueue(storage, candidateQueue, date, validIds);
      state = savedState;
      queue = savedQueue;
      return true;
    } catch {
      try {
        saveInterviewState(storage, previousState, validIds);
        saveInterviewQueue(storage, previousQueue, date, validIds);
      } catch {
        // 저장소 쓰기가 중단되어도 메모리와 화면은 직전 스냅샷을 유지한다.
      }
      state = previousState;
      queue = previousQueue;
      return false;
    }
  }

  function currentDraftPatch() {
    const { answer, keywords, memo } = collectQuestionPatch(page);
    return { answer, keywords, memo };
  }

  function persistQuestionPatch(patch, preserveText = true) {
    const candidate = updateQuestionState(
      state,
      question.id,
      { ...currentDraftPatch(), ...patch },
      now(),
    );
    if (!saveStateOnly(candidate)) {
      renderQuestionState({ preserveText });
      notify(SAVE_ERROR_MESSAGE);
      return false;
    }
    renderQuestionState({ preserveText });
    notify('저장됨');
    return true;
  }

  function togglePinned() {
    const current = questionStateFor(state, question.id);
    try {
      const currentTime = now();
      const stateWithDraft = updateQuestionState(
        state,
        question.id,
        currentDraftPatch(),
        currentTime,
      );
      const candidateState = setQueuePinned(
        stateWithDraft,
        question.id,
        !current.queuePinned,
        currentTime,
      );
      let candidateQueue = queue;
      if (!current.queuePinned && !queue.ids.includes(question.id)) {
        candidateQueue = addQuestionToQueue(
          queue,
          question.id,
          INTERVIEW_QUESTIONS,
          candidateState,
          currentTime,
        );
      }
      const saved = candidateQueue === queue
        ? saveStateOnly(candidateState)
        : saveStateAndQueue(candidateState, candidateQueue);
      if (!saved) {
        renderQuestionState();
        notify(SAVE_ERROR_MESSAGE);
        return;
      }
      renderQuestionState();
      notify('저장됨');
    } catch (error) {
      renderQuestionState();
      notify(error instanceof RangeError ? error.message : SAVE_ERROR_MESSAGE);
    }
  }

  function toggleCompleted() {
    const completed = queue.completedIds.includes(question.id);
    try {
      if (completed) {
        const candidateQueue = setQueueCompleted(queue, question.id, false, now());
        if (!saveQueueOnly(candidateQueue)) {
          renderQuestionState();
          notify(SAVE_ERROR_MESSAGE);
          return;
        }
        renderQuestionState();
        notify('저장됨');
        return;
      }

      const completedAt = now();
      let candidateQueue = queue;
      if (!candidateQueue.ids.includes(question.id)) {
        candidateQueue = addQuestionToQueue(candidateQueue, question.id, INTERVIEW_QUESTIONS, state, completedAt);
      }
      candidateQueue = setQueueCompleted(candidateQueue, question.id, true, completedAt);
      const current = questionStateFor(state, question.id);
      const candidateState = {
        ...state,
        questions: {
          ...state.questions,
          [question.id]: {
            ...current,
            ...currentDraftPatch(),
            lastStudiedAt: completedAt.toISOString(),
          },
        },
      };
      if (!saveStateAndQueue(candidateState, candidateQueue)) {
        renderQuestionState();
        notify(SAVE_ERROR_MESSAGE);
        return;
      }
      renderQuestionState();
      notify('저장됨');
    } catch (error) {
      renderQuestionState();
      notify(error instanceof RangeError ? error.message : SAVE_ERROR_MESSAGE);
    }
  }

  function resetCurrentQuestion() {
    if (!view?.confirm?.(RESET_CONFIRM_MESSAGE)) return;
    const candidate = resetQuestionState(state, question.id);
    if (!saveStateOnly(candidate)) {
      notify(SAVE_ERROR_MESSAGE);
      return;
    }
    renderQuestionState({ preserveText: false });
    notify('저장됨');
  }

  function navigateTo(id) {
    if (!id || !view?.location) return;
    view.location.href = `./template.html?id=${encodeURIComponent(id)}`;
  }

  function handleInput(event) {
    if (!['detail-answer', 'detail-keywords', 'detail-memo'].includes(event.target.id)) return;
    const field = {
      'detail-answer': 'answer',
      'detail-keywords': 'keywords',
      'detail-memo': 'memo',
    }[event.target.id];
    persistQuestionPatch({ [field]: event.target.value }, true);
  }

  function handleChange(event) {
    if (event.target.id === 'detail-status') {
      persistQuestionPatch({ status: event.target.value });
    } else if (event.target.id === 'detail-confidence') {
      persistQuestionPatch({ confidence: Number.parseInt(event.target.value, 10) });
    }
  }

  function handleClick(event) {
    const target = event.target;
    if (target.closest?.('#detail-favorite') && page.contains(target)) {
      const current = questionStateFor(state, question.id);
      persistQuestionPatch({ favorite: !current.favorite });
      return;
    }
    if (target.closest?.('#detail-pinned') && page.contains(target)) {
      togglePinned();
      return;
    }
    if (target.closest?.('.interview-complete-today') && page.contains(target)) {
      toggleCompleted();
      return;
    }
    if (target.closest?.('[data-detail-reset]') && page.contains(target)) {
      resetCurrentQuestion();
      return;
    }
    if (target.closest?.('[data-detail-pdf]') && page.contains(target)) {
      const printState = { ...questionStateFor(state, question.id), ...collectQuestionPatch(page) };
      syncDetailPrintValues(page, question, printState);
      view?.print?.();
      return;
    }
    const previous = target.closest?.('[data-detail-previous]');
    if (previous && page.contains(previous) && !previous.disabled) {
      navigateTo(previous.dataset.questionId);
      return;
    }
    const next = target.closest?.('[data-detail-next]');
    if (next && page.contains(next) && !next.disabled) navigateTo(next.dataset.questionId);
  }

  setText(page, '[data-detail-question]', question.title);
  setText(page, '[data-detail-category]', question.category);
  setText(page, '[data-detail-position]', `${question.order} / ${INTERVIEW_QUESTIONS.length} · 문항 ${question.number}`);
  const source = find(page, '.interview-source-link');
  if (source) source.href = question.sourceUrl;
  renderNavigation(page, question);
  page.addEventListener('input', handleInput);
  page.addEventListener('change', handleChange);
  page.addEventListener('click', handleClick);
  renderQuestionState({ preserveText: false });
  if (startupMessage) notify(startupMessage);
  const cancelRollover = view?.setTimeout && view?.addEventListener
    ? scheduleLogicalDayRollover(view, date, now)
    : () => {};
  pageDocument.documentElement.dataset.templateDetailReady = 'true';

  return {
    getDate: () => date,
    getQuestion: () => question,
    getState: () => clone(state),
    getQueue: () => clone(queue),
    refresh: renderQuestionState,
    destroy() {
      cancelRollover();
      page.removeEventListener('input', handleInput);
      page.removeEventListener('change', handleChange);
      page.removeEventListener('click', handleClick);
      delete pageDocument.documentElement.dataset.templateDetailReady;
    },
  };
}

if (typeof document !== 'undefined') initTemplateDetailPage(document);
