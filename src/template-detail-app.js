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
import { markdownToSafeHtml } from './github-markdown.js';
import { loadMaeilContent, MAEIL_CONTENT_COMMIT } from './maeil-content.js';
import {
  extractInterviewHintKeywords,
  interviewAnswerOutline,
} from './interview-hint-core.js';
import { createOllamaProvider } from './ollama-provider.js';
import { evaluateInterviewAnswer } from './interview-evaluation-core.js';
import { createLocalInterviewEvaluationStorage } from './interview-evaluation-storage.js';
import { createStudyAttempt } from './study-history-core.js';
import { createLocalStudyHistoryStorage } from './study-history-storage.js';
import {
  AI_PROVIDER_ERROR_CODES,
  AiProviderError,
} from './ai-provider.js';
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
const CURRENT_EVALUATION_MESSAGE = '현재 답변과 자가평가가 모두 일치하는 저장된 AI 평가를 표시합니다.';
const STALE_EVALUATION_MESSAGE = '이전 답변 기준 평가는 저장되어 있지만 현재 답변 또는 자가평가와 달라 결과를 숨겼습니다. 수정한 내용으로 다시 평가해 주세요.';
const SCORE_LABELS = Object.freeze({
  accuracy: '정확성',
  coverage: '핵심 내용',
  clarity: '설명 명료성',
  interviewReadiness: '면접 전달력',
});

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

function createElement(document, tagName, className, text) {
  const element = document.createElement(tagName);
  if (className) element.className = className;
  if (text !== undefined) element.textContent = String(text);
  return element;
}

export function renderInterviewHintOutline(root, question) {
  const list = find(root, '#detail-hint-outline');
  if (!list) return [];
  const document = documentFor(list);
  const outline = interviewAnswerOutline(question);
  list.replaceChildren(...outline.map((item) => createElement(document, 'li', '', item)));
  return outline;
}

export function renderInterviewHintKeywords(root, keywords) {
  const list = find(root, '#detail-hint-keywords-list');
  if (!list) return [];
  const document = documentFor(list);
  const validKeywords = Array.isArray(keywords)
    ? keywords.filter((keyword) => typeof keyword === 'string' && keyword.trim() !== '')
    : [];
  list.replaceChildren(...validKeywords.map((keyword) => createElement(document, 'li', '', keyword)));
  return validKeywords;
}

function appendFeedbackSection(document, container, title, items, emptyMessage) {
  const section = createElement(document, 'section', 'interview-ai-feedback-section');
  section.append(createElement(document, 'h3', '', title));
  const verifiedItems = Array.isArray(items)
    ? items.filter((item) => item?.evidenceVerified === true && item.evidenceQuote)
    : [];
  if (verifiedItems.length === 0) {
    section.append(createElement(document, 'p', '', emptyMessage));
    container.append(section);
    return;
  }
  const list = document.createElement('ul');
  for (const item of verifiedItems) {
    const row = document.createElement('li');
    row.append(createElement(document, 'p', '', item.feedback));
    row.append(createElement(document, 'q', 'interview-ai-evidence', item.evidenceQuote));
    list.append(row);
  }
  section.append(list);
  container.append(section);
}

export function renderInterviewEvaluation(root, evaluation) {
  const container = find(root, '#detail-ai-result');
  if (!container || !evaluation) return null;
  const document = documentFor(container);
  const fragment = document.createDocumentFragment();

  const verification = createElement(document, 'p', 'interview-ai-verification');
  const verificationStatus = evaluation.verification?.status;
  const verifiedCount = evaluation.verification?.verifiedEvidenceCount ?? 0;
  const rejectedCount = evaluation.verification?.rejectedFeedbackCount ?? 0;
  if (verificationStatus === 'verified') {
    verification.textContent = `표시된 피드백의 원문 근거 ${verifiedCount}개를 확인했습니다.`;
  } else if (verificationStatus === 'partial') {
    verification.textContent = `원문 근거 ${verifiedCount}개만 확인했습니다. 일치하지 않은 피드백 ${rejectedCount}개를 제외하고 점수·개선 답변·꼬리 질문은 보류했습니다.`;
  } else {
    verification.textContent = '원문에서 확인된 근거가 없어 점수·개선 답변·꼬리 질문을 포함한 AI 판단을 보류했습니다.';
  }
  fragment.append(verification);

  if (verificationStatus === 'verified') {
    const scores = createElement(document, 'section', 'interview-ai-score-grid');
    for (const [key, label] of Object.entries(SCORE_LABELS)) {
      const card = createElement(document, 'div', 'interview-ai-score');
      card.append(createElement(document, 'span', '', label));
      card.append(createElement(document, 'strong', '', `${evaluation.scores?.[key] ?? 0}점`));
      scores.append(card);
    }
    fragment.append(scores);
  }
  appendFeedbackSection(document, fragment, '잘 설명한 부분', evaluation.strengths, '원문 근거가 확인된 강점이 없습니다.');
  appendFeedbackSection(document, fragment, '빠뜨린 핵심', evaluation.gaps, '원문 근거가 확인된 누락 내용이 없습니다.');
  appendFeedbackSection(document, fragment, '원문과 충돌하거나 근거가 부족한 표현', evaluation.unsupportedClaims, '원문과 충돌한다고 검증된 표현이 없습니다.');

  if (verificationStatus === 'verified') {
    const draft = createElement(document, 'section', 'interview-ai-feedback-section');
    draft.append(createElement(document, 'h3', '', '개선된 1분 답변 예시'));
    draft.append(createElement(document, 'p', 'interview-ai-draft', evaluation.improvedAnswer));
    draft.append(createElement(document, 'small', '', '이 문장은 AI 초안입니다. 아래의 검증된 원문 근거와 다시 대조하세요.'));
    fragment.append(draft);

    const followUps = createElement(document, 'section', 'interview-ai-feedback-section');
    followUps.append(createElement(document, 'h3', '', '꼬리 질문 2개'));
    const followUpList = document.createElement('ol');
    for (const question of evaluation.followUps ?? []) followUpList.append(createElement(document, 'li', '', question));
    followUps.append(followUpList);
    fragment.append(followUps);
  }
  appendFeedbackSection(document, fragment, '판단에 사용한 원문 근거', evaluation.evidence, '확인된 근거가 없어 이 평가를 사실로 사용하지 않습니다.');

  container.replaceChildren(fragment);
  container.hidden = false;
  return container;
}

export function evaluationMatchesAnswerSnapshot(evaluation, currentAnswer) {
  return typeof evaluation?.answerSnapshot === 'string'
    && evaluation.answerSnapshot === String(currentAnswer ?? '');
}

export function evaluationMatchesDraftSnapshot(evaluation, currentDraft) {
  const draft = currentDraft !== null && typeof currentDraft === 'object' ? currentDraft : {};
  const snapshot = evaluation?.selfAssessment;
  return evaluationMatchesAnswerSnapshot(evaluation, draft.answer)
    && snapshot !== null
    && typeof snapshot === 'object'
    && snapshot.confidence === draft.confidence
    && snapshot.keywords === draft.keywords
    && snapshot.memo === draft.memo;
}

export function questionIdFromLocation(location) {
  try {
    return new URLSearchParams(location?.search ?? '').get('id') ?? '';
  } catch {
    return '';
  }
}

export function interviewSourceDetailUrl(questionId) {
  return `./content.html?id=${encodeURIComponent(String(questionId ?? ''))}`;
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

  const readingLink = find(page, '#detail-reading-link');
  if (readingLink) readingLink.href = `./content.html?id=${encodeURIComponent(question.id)}`;
  const quizLink = find(page, '#detail-quiz-link');
  if (quizLink) quizLink.href = `./quiz.html?source=${encodeURIComponent(question.id)}`;

  const storage = options.storage ?? view?.localStorage;
  const now = options.now ?? (() => new Date());
  const date = logicalDateString(now());
  const validIds = new Set(INTERVIEW_QUESTIONS.map(({ id }) => id));
  let startupMessage = '';
  let state;
  let queue;
  let referenceMarkdown = null;
  let referencePromise = null;
  let hintKeywords = null;
  let hintKeywordsPromise = null;
  let latestEvaluation = null;
  const provider = options.provider ?? createOllamaProvider({
    fetchImpl: options.aiFetchImpl ?? view?.fetch?.bind?.(view) ?? globalThis.fetch,
  });
  let evaluationStorage = options.evaluationStorage ?? null;
  let studyHistory = options.studyHistory ?? null;
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
  if (!evaluationStorage) {
    try {
      evaluationStorage = createLocalInterviewEvaluationStorage(storage);
    } catch {
      evaluationStorage = null;
    }
  }
  if (!studyHistory) {
    try {
      studyHistory = createLocalStudyHistoryStorage(storage);
    } catch {
      studyHistory = null;
    }
  }

  function notify(message) {
    setText(page, '#detail-live', message);
  }

  function saveStudyHistoryAttempt(attempt) {
    if (!studyHistory) return false;
    try {
      studyHistory.save(createStudyAttempt(attempt));
      return true;
    } catch {
      return false;
    }
  }

  function needsAiSetup(problem) {
    return problem?.code === AI_PROVIDER_ERROR_CODES.PROVIDER_UNAVAILABLE
      || problem?.code === AI_PROVIDER_ERROR_CODES.MODEL_NOT_FOUND;
  }

  function setAiHealth(health) {
    const badge = find(page, '#detail-ai-health');
    const setup = find(page, '#detail-ai-setup');
    if (badge) {
      badge.textContent = health.ok ? `${health.model} 준비됨` : '사용 불가';
      badge.dataset.ready = String(Boolean(health.ok));
    }
    if (setup) setup.hidden = !needsAiSetup(health);
  }

  function setAiStatus(message, evaluationState = '') {
    const status = find(page, '#detail-ai-status');
    if (!status) return;
    status.textContent = message;
    if (evaluationState) status.dataset.evaluationState = evaluationState;
    else delete status.dataset.evaluationState;
  }

  function syncLatestEvaluation({ announce = true } = {}) {
    const result = find(page, '#detail-ai-result');
    const button = find(page, '#detail-ai-evaluate');
    const currentDraft = collectQuestionPatch(page);
    const currentAnswer = currentDraft.answer;

    if (!latestEvaluation) {
      if (result) {
        result.hidden = true;
        delete result.dataset.answerState;
      }
      if (button && !button.disabled) button.textContent = '내 답변 AI 평가하기';
      return 'none';
    }

    if (evaluationMatchesDraftSnapshot(latestEvaluation, currentDraft)) {
      renderInterviewEvaluation(page, latestEvaluation);
      if (result) result.dataset.answerState = 'current';
      if (button && !button.disabled) button.textContent = '현재 답변 다시 평가하기';
      if (announce) setAiStatus(CURRENT_EVALUATION_MESSAGE, 'current');
      return 'current';
    }

    if (result) {
      result.replaceChildren();
      result.hidden = true;
      result.dataset.answerState = 'stale';
    }
    if (button && !button.disabled) {
      button.textContent = currentAnswer.trim()
        ? '수정한 내용 다시 평가하기'
        : '답변 작성 후 다시 평가하기';
    }
    if (announce) setAiStatus(STALE_EVALUATION_MESSAGE, 'stale');
    return 'stale';
  }

  async function checkAiHealth() {
    try {
      const health = await provider.healthCheck();
      setAiHealth(health);
      return health;
    } catch (error) {
      const health = {
        ok: false,
        code: error?.code,
        message: error instanceof Error ? error.message : 'Ollama 상태를 확인하지 못했습니다.',
      };
      setAiHealth(health);
      return health;
    }
  }

  async function ensureReference({ reveal = false } = {}) {
    const panel = find(page, '#detail-reference');
    const status = find(page, '#detail-reference-status');
    const body = find(page, '#detail-reference-body');
    const toggle = find(page, '#detail-reveal-reference');
    if (reveal && panel) panel.hidden = false;
    if (reveal && toggle) toggle.setAttribute('aria-expanded', 'true');
    if (referenceMarkdown !== null) return referenceMarkdown;
    if (referencePromise) return referencePromise;
    if (status) {
      status.hidden = false;
      status.textContent = '고정 원문을 불러오는 중입니다.';
    }
    referencePromise = loadMaeilContent(question.id, {
      fetchImpl: options.fetchImpl ?? view?.fetch?.bind?.(view) ?? globalThis.fetch,
      cache: options.cache ?? view?.caches ?? null,
      localBase: options.localBase ?? './content/maeil-mail/backend/contents',
    }).then((loaded) => {
      referenceMarkdown = loaded.markdown;
      if (body) body.innerHTML = markdownToSafeHtml(referenceMarkdown);
      if (status) status.hidden = true;
      return referenceMarkdown;
    }).catch((error) => {
      referencePromise = null;
      if (status) {
        status.hidden = false;
        status.textContent = error instanceof Error ? error.message : '원문을 불러오지 못했습니다.';
      }
      throw error;
    });
    return referencePromise;
  }

  async function ensureHintKeywords() {
    const status = find(page, '#detail-hint-keywords-status');
    if (hintKeywords !== null) return hintKeywords;
    if (hintKeywordsPromise) return hintKeywordsPromise;
    if (status) status.textContent = '원문에서 답변 키워드를 찾는 중입니다.';
    hintKeywordsPromise = loadMaeilContent(question.id, {
      fetchImpl: options.fetchImpl ?? view?.fetch?.bind?.(view) ?? globalThis.fetch,
      cache: options.cache ?? view?.caches ?? null,
      localBase: options.localBase ?? './content/maeil-mail/backend/contents',
    }).then(({ markdown }) => {
      hintKeywords = extractInterviewHintKeywords(markdown);
      renderInterviewHintKeywords(page, hintKeywords);
      if (status) {
        status.textContent = hintKeywords.length > 0
          ? '원문 전체 답안이 아니라, 강조·코드·소제목의 표현만 보여줍니다.'
          : '짧은 원문 키워드를 찾지 못했습니다. 답변을 작성한 뒤 원문과 비교해 보세요.';
      }
      return hintKeywords;
    }).catch((error) => {
      hintKeywordsPromise = null;
      if (status) status.textContent = error instanceof Error ? error.message : '원문 키워드를 불러오지 못했습니다.';
      throw error;
    });
    return hintKeywordsPromise;
  }

  function toggleHint() {
    const panel = find(page, '#detail-hint');
    const toggle = find(page, '#detail-hint-toggle');
    if (!panel || !toggle) return;
    const willOpen = panel.hidden;
    panel.hidden = !willOpen;
    toggle.setAttribute('aria-expanded', String(willOpen));
    toggle.textContent = willOpen ? '힌트 접기' : '힌트 보기';
  }

  async function toggleHintKeywords() {
    const panel = find(page, '#detail-hint-keywords');
    const toggle = find(page, '#detail-hint-keywords-toggle');
    if (!panel || !toggle) return;
    const willOpen = panel.hidden;
    panel.hidden = !willOpen;
    toggle.setAttribute('aria-expanded', String(willOpen));
    toggle.textContent = willOpen ? '원문 키워드 접기' : '원문 키워드 더 보기';
    if (willOpen) {
      try {
        await ensureHintKeywords();
      } catch {
        // 패널 안의 상태 문구로 오류를 안내한다.
      }
    }
  }

  async function toggleReference() {
    const panel = find(page, '#detail-reference');
    const toggle = find(page, '#detail-reveal-reference');
    if (!panel || !toggle) return;
    const willOpen = panel.hidden;
    panel.hidden = !willOpen;
    toggle.setAttribute('aria-expanded', String(willOpen));
    toggle.textContent = willOpen ? '원문 답안 접기' : '원문 답안과 비교하기';
    if (willOpen) {
      try {
        await ensureReference({ reveal: true });
      } catch {
        // 패널 내 오류 문구로 안내한다.
      }
    }
  }

  async function evaluateCurrentAnswer() {
    const button = find(page, '#detail-ai-evaluate');
    const draft = collectQuestionPatch(page);
    if (!draft.answer.trim()) {
      setAiStatus('먼저 나의 답변을 작성해 주세요.', 'needs-answer');
      find(page, '#detail-answer')?.focus?.();
      return null;
    }
    persistQuestionPatch(draft, true);
    if (button) {
      button.disabled = true;
      button.setAttribute('aria-busy', 'true');
      button.textContent = '원문과 답변을 평가하는 중…';
    }
    setAiStatus('로컬 AI 상태와 원문을 확인하고 있습니다.', 'loading');
    try {
      const health = await checkAiHealth();
      if (!health.ok) {
        throw new AiProviderError(
          health.code ?? AI_PROVIDER_ERROR_CODES.REQUEST_FAILED,
          health.message,
          { retryable: health.code !== AI_PROVIDER_ERROR_CODES.MODEL_NOT_FOUND, details: health },
        );
      }
      const referenceAnswer = await ensureReference();
      setAiStatus('원문 근거로 AI 평가하는 중입니다. 로컬 모델에 따라 시간이 걸릴 수 있어요.', 'loading');
      const evaluation = await evaluateInterviewAnswer(provider, {
        questionId: question.id,
        question: question.title,
        userAnswer: draft.answer,
        referenceAnswer,
        sourceCommit: MAEIL_CONTENT_COMMIT,
        selfAssessment: {
          confidence: draft.confidence,
          keywords: draft.keywords,
          memo: draft.memo,
        },
      });
      latestEvaluation = evaluation;
      const evaluationState = syncLatestEvaluation({ announce: false });
      let saved = false;
      try {
        if (!evaluationStorage) throw new Error('평가 저장소를 사용할 수 없습니다.');
        evaluationStorage.save(evaluation);
        saved = true;
      } catch {
        // AI 평가 성공과 브라우저 저장 성공은 서로 다른 결과다.
      }
      if (saved) {
        saveStudyHistoryAttempt({
          id: `interview-ai:${evaluation.id}`,
          kind: 'interview-ai',
          completedAt: evaluation.evaluatedAt,
          sourceIds: [question.id],
          questionIds: [question.id],
          sourceCommit: MAEIL_CONTENT_COMMIT,
          modelVersion: evaluation.model,
          promptVersion: evaluation.promptVersion,
          metadata: {
            verificationStatus: evaluation.verification?.status ?? '',
            confidence: draft.confidence,
          },
        });
      }
      const setup = find(page, '#detail-ai-setup');
      if (setup) setup.hidden = true;
      if (evaluationState === 'stale') {
        setAiStatus(STALE_EVALUATION_MESSAGE, 'stale');
      } else if (!saved) {
        setAiStatus('평가 완료·저장 실패: 결과는 화면에 표시했지만 브라우저 저장 공간에 보관하지 못했습니다.', 'current');
      } else if (evaluation.verification.status === 'verified') {
        setAiStatus('원문 근거가 모두 확인된 AI 평가를 저장했습니다.', 'current');
      } else {
        setAiStatus('원문과 일치한 근거만 표시하고 저장했습니다.', 'current');
      }
      return evaluation;
    } catch (error) {
      setAiStatus(error instanceof Error ? error.message : 'AI 평가를 완료하지 못했습니다.', 'error');
      const setup = find(page, '#detail-ai-setup');
      if (setup) setup.hidden = !needsAiSetup(error);
      return null;
    } finally {
      if (button) {
        button.disabled = false;
        button.removeAttribute('aria-busy');
      }
      syncLatestEvaluation({ announce: false });
    }
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
    return { answer, keywords, memo, sourceCommit: MAEIL_CONTENT_COMMIT };
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
      const selfDraft = currentDraftPatch();
      const candidateState = {
        ...state,
        questions: {
          ...state.questions,
          [question.id]: {
            ...current,
            ...selfDraft,
            lastStudiedAt: completedAt.toISOString(),
          },
        },
      };
      if (!saveStateAndQueue(candidateState, candidateQueue)) {
        renderQuestionState();
        notify(SAVE_ERROR_MESSAGE);
        return;
      }
      if (selfDraft.answer.trim()) {
        saveStudyHistoryAttempt({
          id: `interview-self:${question.id}:${completedAt.getTime()}`,
          kind: 'interview-self',
          completedAt: completedAt.toISOString(),
          sourceIds: [question.id],
          questionIds: [question.id],
          sourceCommit: MAEIL_CONTENT_COMMIT,
          metadata: {
            confidence: current.confidence,
            keywords: selfDraft.keywords,
            memo: selfDraft.memo,
          },
        });
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
    syncLatestEvaluation();
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
    const evaluating = find(page, '#detail-ai-evaluate')?.disabled === true;
    syncLatestEvaluation({ announce: !evaluating });
  }

  function handleChange(event) {
    if (event.target.id === 'detail-status') {
      persistQuestionPatch({ status: event.target.value });
    } else if (event.target.id === 'detail-confidence') {
      persistQuestionPatch({ confidence: Number.parseInt(event.target.value, 10) });
      const evaluating = find(page, '#detail-ai-evaluate')?.disabled === true;
      syncLatestEvaluation({ announce: !evaluating });
    }
  }

  function handleClick(event) {
    const target = event.target;
    if (target.closest?.('#detail-hint-toggle') && page.contains(target)) {
      toggleHint();
      return;
    }
    if (target.closest?.('#detail-hint-keywords-toggle') && page.contains(target)) {
      toggleHintKeywords();
      return;
    }
    if (target.closest?.('#detail-reveal-reference') && page.contains(target)) {
      toggleReference();
      return;
    }
    if (target.closest?.('#detail-ai-evaluate') && page.contains(target)) {
      evaluateCurrentAnswer();
      return;
    }
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
  renderInterviewHintOutline(page, question);
  const source = find(page, '.interview-source-link');
  if (source) source.href = interviewSourceDetailUrl(question.id);
  renderNavigation(page, question);
  page.addEventListener('input', handleInput);
  page.addEventListener('change', handleChange);
  page.addEventListener('click', handleClick);
  renderQuestionState({ preserveText: false });
  try {
    latestEvaluation = evaluationStorage?.getLatest(question.id) ?? null;
    if (latestEvaluation) syncLatestEvaluation();
  } catch {
    // 기존 면접 답변 저장은 AI 평가 저장소 오류와 무관하게 유지한다.
  }
  if (/^https?:$/u.test(location?.protocol ?? '')) checkAiHealth();
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
    checkAiHealth,
    evaluateCurrentAnswer,
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
