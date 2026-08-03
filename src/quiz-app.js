import { INTERVIEW_QUESTIONS, getInterviewQuestion } from './interview-data.js';
import { logicalQuizDate } from './quiz-core.js?v=8';
import {
  advanceQuizFlowMain,
  answerQuizFlowQuestion,
  createQuizFlowSession,
  deferQuizFlowQuestion,
  getActiveFollowUpIds,
  isQuizFlowClusterReady,
  resumeDeferredQuizFlow,
  reviewQuizFlowMain,
  scoreQuizFlow,
  setQuizFlowCursor,
  startQuizFlowSecondRound,
} from './quiz-flow-core.js?v=8';
import { QUIZ_QUESTIONS, getQuizQuestion } from './quiz-data.js?v=8';
import { createLocalQuizFlowStorage } from './quiz-flow-storage.js?v=8';
import { completedQuizStudyAttempts } from './quiz-study-history.js?v=8';
import { loadReadingPlan } from './reading-storage.js';
import { createLocalStudyHistoryStorage } from './study-history-storage.js';

function find(root, selector) {
  if (root?.matches?.(selector)) return root;
  return root?.querySelector?.(selector) ?? null;
}

function text(root, selector, value) {
  const element = find(root, selector);
  if (element) element.textContent = String(value);
}

function memoryStorage() {
  const values = new Map();
  return {
    getItem: (key) => values.get(key) ?? null,
    setItem: (key, value) => values.set(key, String(value)),
    removeItem: (key) => values.delete(key),
  };
}

function element(document, name, className, content) {
  const node = document.createElement(name);
  if (className) node.className = className;
  if (content !== undefined) node.textContent = String(content);
  return node;
}

export function quizSourceFromLocation(location) {
  try {
    const params = new URLSearchParams(location?.search ?? '');
    return Object.freeze({ provided: params.has('source'), sourceId: params.get('source') ?? '' });
  } catch {
    return Object.freeze({ provided: false, sourceId: '' });
  }
}

export function quizInternalSourceLink(question, session) {
  const params = new URLSearchParams({
    id: question.sourceId,
    from: 'quiz',
    quizSource: session.primarySourceId,
  });
  return `./content.html?${params.toString()}#${encodeURIComponent(question.sourceAnchor || 'content-answer')}`;
}

export function quizMainAdvanceLabel(session, reviewing = false) {
  if (reviewing && ['round-one-summary', 'review-pending', 'completed'].includes(session.status)) {
    return '요약으로 돌아가기';
  }
  const roundLimit = session.secondRoundStarted
    ? session.mainQuestionIds.length
    : Math.min(5, session.mainQuestionIds.length);
  if (session.cursor.mainIndex === roundLimit - 1) {
    return session.secondRoundStarted ? '최종 결과 확인' : '1라운드 결과 확인';
  }
  return '다음 메인 문제';
}

function scoreCard(document, label, value, detail) {
  const card = element(document, 'div', 'quiz-score-card');
  card.append(element(document, 'span', '', label));
  card.append(element(document, 'strong', '', value));
  if (detail) card.append(element(document, 'span', '', detail));
  return card;
}

function sourceIdsFromPlan(storage, date) {
  try {
    return loadReadingPlan(storage, date, new Set(INTERVIEW_QUESTIONS.map(({ id }) => id)))?.ids ?? [];
  } catch {
    return [];
  }
}

export function initQuizPage(root = document, options = {}) {
  const page = find(root, '[data-quiz-page]');
  if (!page) return null;
  const document = page.ownerDocument ?? root;
  const view = options.view ?? document.defaultView ?? globalThis.window;
  const now = options.now ?? (() => new Date());
  const date = logicalQuizDate(now());
  let storage = options.storage ?? view?.localStorage;
  if (!storage || typeof storage.getItem !== 'function') storage = memoryStorage();
  const flowStorage = options.quizStorage ?? createLocalQuizFlowStorage(storage);
  let studyHistory = options.studyHistory;
  if (studyHistory === undefined) {
    try {
      studyHistory = createLocalStudyHistoryStorage(storage);
    } catch {
      studyHistory = null;
    }
  }
  const requested = quizSourceFromLocation(options.location ?? view?.location);
  const todayIds = sourceIdsFromPlan(storage, date);
  const primarySourceId = requested.provided
    ? requested.sourceId
    : (todayIds[0] ?? INTERVIEW_QUESTIONS[0]?.id ?? '');
  const source = getInterviewQuestion(primarySourceId);
  const invalid = find(page, '#quiz-invalid');
  const sessionElement = find(page, '#quiz-session');
  let session;
  let pendingSelectedIndex = null;
  let reviewing = false;
  let resumingDeferredId = null;
  let showingRoundOneSummary = false;

  function announce(message) {
    text(page, '#quiz-live', message);
  }

  function showInvalid(message) {
    invalid.hidden = false;
    sessionElement.hidden = true;
    text(page, '#quiz-invalid-message', message);
    document.documentElement.dataset.quizReady = 'error';
  }

  if (!source) {
    showInvalid('주소의 원문 ID가 올바르지 않습니다. 퀴즈 목록에서 다시 선택해 주세요.');
    return null;
  }

  function freshSession() {
    return createQuizFlowSession(QUIZ_QUESTIONS, {
      primarySourceId: source.id,
      categoryId: source.categoryId,
      todaySourceIds: todayIds,
      allowUsedFallback: true,
      now: now(),
    });
  }

  try {
    session = flowStorage.loadSession(date, source.id, QUIZ_QUESTIONS) ?? freshSession();
  } catch (error) {
    try {
      session = freshSession();
    } catch {
      showInvalid(error instanceof Error ? error.message : '퀴즈 세션을 만들 수 없습니다.');
      return null;
    }
  }

  function persist() {
    try {
      session = flowStorage.saveSession(session, QUIZ_QUESTIONS);
    } catch {
      announce('진행 내용은 현재 화면에 유지되지만 브라우저에 저장하지 못했습니다.');
    }
  }

  function persistCompletedQuiz() {
    try {
      flowStorage.saveAttempt(session, QUIZ_QUESTIONS);
    } catch {
      // 진행 세션 저장은 이미 끝났으므로 완료 이력 저장 실패가 퀴즈 흐름을 막지 않는다.
    }
    if (!studyHistory) return;
    let attempts;
    try {
      attempts = completedQuizStudyAttempts(session, QUIZ_QUESTIONS);
    } catch {
      return;
    }
    let savedIds = new Set();
    try {
      savedIds = new Set(studyHistory.list().map(({ id }) => id));
    } catch {
      // 주입된 저장소가 목록 조회를 지원하지 않아도 개별 저장은 시도한다.
    }
    for (const attempt of attempts) {
      if (savedIds.has(attempt.id)) continue;
      try {
        studyHistory.save(attempt);
        savedIds.add(attempt.id);
      } catch {
        // append-only 중복 또는 브라우저 저장 실패는 기존 퀴즈 완료를 되돌리지 않는다.
      }
    }
  }

  function currentMainId() {
    return session.mainQuestionIds[session.cursor.mainIndex];
  }

  function activeTailIds(mainId = currentMainId()) {
    return getActiveFollowUpIds(session, mainId, QUIZ_QUESTIONS);
  }

  function unresolvedTail(mainId = currentMainId()) {
    const ids = activeTailIds(mainId);
    if (resumingDeferredId && ids.includes(resumingDeferredId) && !session.answers[resumingDeferredId]) {
      return { id: resumingDeferredId, index: ids.indexOf(resumingDeferredId) };
    }
    const index = ids.findIndex((id) => !session.answers[id] && !session.deferredFollowUpIds.includes(id));
    return index < 0 ? null : { id: ids[index], index };
  }

  function selectedQuestion() {
    const mainId = currentMainId();
    if (!session.answers[mainId]) return getQuizQuestion(mainId);
    const next = unresolvedTail(mainId);
    return next ? getQuizQuestion(next.id) : null;
  }

  function renderProgress() {
    const limit = session.secondRoundStarted ? Math.min(10, session.mainQuestionIds.length) : Math.min(5, session.mainQuestionIds.length);
    const visibleIds = session.mainQuestionIds.slice(0, limit);
    const answeredMain = visibleIds.filter((id) => session.answers[id]).length;
    const tailIds = visibleIds.flatMap((id) => getActiveFollowUpIds(session, id, QUIZ_QUESTIONS));
    const answeredTail = tailIds.filter((id) => session.answers[id]).length;
    const currentTails = activeTailIds();
    const currentTailAnswered = currentTails.filter((id) => session.answers[id]).length;
    const percent = Math.round(((answeredMain + answeredTail) / Math.max(1, visibleIds.length + tailIds.length)) * 100);
    text(page, '#quiz-round-kicker', session.cursor.mainIndex < 5 ? 'ROUND 1' : 'ROUND 2');
    text(page, '#quiz-round-title', `메인 ${Math.min(session.cursor.mainIndex + 1, limit)}/${limit}`);
    text(page, '#quiz-total-progress', `${percent}%`);
    text(page, '#quiz-tail-progress', `꼬리 ${currentTailAnswered}/${currentTails.length}`);
    text(page, '#quiz-deferred-count', session.deferredFollowUpIds.length);
    find(page, '#quiz-progress-bar').style.width = `${percent}%`;
    const deferredButton = find(page, '#quiz-deferred-button');
    deferredButton.disabled = session.deferredFollowUpIds.length === 0;
    const summaryReturn = find(page, '#quiz-summary-return');
    if (summaryReturn) {
      summaryReturn.hidden = !session.roundOneCompleted;
      summaryReturn.textContent = '← 1라운드 선택 화면으로';
    }

    const navigation = find(page, '#quiz-main-pages');
    navigation.replaceChildren();
    visibleIds.forEach((mainId, index) => {
      const button = element(document, 'button', 'quiz-main-page', String(index + 1));
      button.type = 'button';
      button.dataset.mainId = mainId;
      button.classList.toggle('is-current', index === session.cursor.mainIndex);
      button.classList.toggle('is-complete', isQuizFlowClusterReady(session, mainId, QUIZ_QUESTIONS));
      button.classList.toggle('is-deferred', activeTailIds(mainId)
        .some((id) => session.deferredFollowUpIds.includes(id)));
      button.disabled = index > 0 && !visibleIds.slice(0, index)
        .every((id) => isQuizFlowClusterReady(session, id, QUIZ_QUESTIONS));
      button.setAttribute('aria-label', `메인 ${index + 1}${button.classList.contains('is-complete') ? ' 완료' : ''}`);
      navigation.append(button);
    });
  }

  function reviewCard(question, record, label) {
    const details = element(document, 'details', `quiz-review-card ${record.isCorrect ? 'is-correct' : 'is-wrong'}`);
    const summary = element(document, 'summary', '', `${label} · ${record.isCorrect ? '정답' : '오답'} · 해설 보기`);
    details.append(summary);
    const body = element(document, 'div', 'quiz-review-content');
    body.append(element(document, 'p', '', `내 답: ${question.choices[record.selectedIndex]}`));
    body.append(element(document, 'p', '', `정답: ${question.choices[question.correctIndex]}`));
    body.append(element(document, 'p', '', `정답인 이유: ${question.explanation}`));
    if (!record.isCorrect) {
      body.append(element(document, 'p', '', `선택한 답이 틀린 이유: ${question.choiceFeedback[record.selectedIndex]}`));
    }
    const evidence = element(document, 'details', 'quiz-evidence');
    evidence.append(element(document, 'summary', '', '근거 보기'));
    const keywords = element(document, 'ul', 'quiz-keypoints');
    question.keyPoints.forEach((point) => keywords.append(element(document, 'li', '', point)));
    evidence.append(keywords);
    const quote = element(document, 'blockquote', '', question.evidenceQuote);
    evidence.append(quote);
    const link = element(document, 'a', 'quiz-source-link', '상세페이지에서 원문 보기');
    link.href = quizInternalSourceLink(question, session);
    evidence.append(link);
    body.append(evidence);
    details.append(body);
    return details;
  }

  function questionCard(question) {
    const wrapper = element(document, 'section', 'quiz-question-card');
    const mainId = currentMainId();
    const isMain = question.kind === 'main';
    const tailIndex = isMain ? null : activeTailIds(mainId).indexOf(question.id);
    const eyebrow = element(document, 'div', 'quiz-cluster-eyebrow');
    eyebrow.append(element(document, 'span', '', isMain ? `메인 문제 ${session.cursor.mainIndex + 1}` : `꼬리 문제 ${tailIndex + 1}`));
    eyebrow.append(element(document, 'span', '', isMain ? '핵심 개념' : (question.followUpRole === 'remediation' ? '오답 보강' : '개념 확장')));
    wrapper.append(eyebrow);
    wrapper.append(element(document, isMain ? 'h2' : 'h3', '', question.question));
    const fieldset = element(document, 'fieldset', 'quiz-choice-list');
    fieldset.setAttribute('aria-label', '답 선택');
    question.choices.forEach((choice, index) => {
      const label = element(document, 'label', 'quiz-choice');
      const input = element(document, 'input');
      input.type = 'radio';
      input.name = 'quiz-choice';
      input.value = String(index);
      input.checked = pendingSelectedIndex === index;
      label.append(input, element(document, 'span', '', choice));
      fieldset.append(label);
    });
    wrapper.append(fieldset);
    return wrapper;
  }

  function renderCluster() {
    const container = find(page, '#quiz-cluster');
    const actions = find(page, '#quiz-cluster-actions');
    container.replaceChildren();
    actions.replaceChildren();
    const mainId = currentMainId();
    const main = getQuizQuestion(mainId);
    const stack = element(document, 'div', 'quiz-review-stack');
    if (session.answers[mainId]) stack.append(reviewCard(main, session.answers[mainId], `메인 ${session.cursor.mainIndex + 1}`));
    activeTailIds(mainId).forEach((id, index) => {
      if (session.answers[id]) stack.append(reviewCard(getQuizQuestion(id), session.answers[id], `꼬리 ${index + 1}`));
    });
    if (stack.childElementCount) container.append(stack);

    const question = selectedQuestion();
    if (question) {
      const next = question.kind === 'follow-up' ? unresolvedTail(mainId) : null;
      if (question.kind === 'follow-up' && next && session.cursor.followUpIndex !== next.index) {
        session = setQuizFlowCursor(session, mainId, 'follow-up', next.index, QUIZ_QUESTIONS, now());
        persist();
      }
      container.append(questionCard(question));
      const confirm = element(document, 'button', 'quiz-primary-button', '답변 확인');
      confirm.type = 'button';
      confirm.id = 'quiz-confirm-answer';
      confirm.disabled = pendingSelectedIndex === null;
      actions.append(confirm);
      if (question.kind === 'follow-up') {
        const defer = element(document, 'button', 'quiz-secondary-button', '나중에 풀기');
        defer.type = 'button';
        defer.id = 'quiz-defer-answer';
        actions.prepend(defer);
      }
      return;
    }

    const ready = isQuizFlowClusterReady(session, mainId, QUIZ_QUESTIONS);
    const advanceLabel = quizMainAdvanceLabel(session, reviewing);
    container.append(element(
      document,
      'p',
      'quiz-feedback',
      ready
        ? (advanceLabel.includes('결과 확인') ? '이 문제 묶음을 완료했습니다. 결과를 확인하세요.' : '이 문제 묶음을 완료했습니다. 해설을 접어 두고 다음 메인 문제로 이동하세요.')
        : '남은 꼬리 문제를 답하거나 보류해 주세요.',
    ));
    if (ready) {
      const backToSummary = advanceLabel === '요약으로 돌아가기';
      const next = element(document, 'button', 'quiz-primary-button', advanceLabel);
      next.type = 'button';
      next.id = backToSummary ? 'quiz-return-summary' : 'quiz-next-main';
      actions.append(next);
    }
  }

  function renderScore(containerSelector) {
    const score = scoreQuizFlow(session, QUIZ_QUESTIONS);
    const container = find(page, containerSelector);
    container.replaceChildren(
      scoreCard(document, '메인 점수', `${score.main.correct}/${score.main.answered}`, `${score.main.percent}%`),
      scoreCard(document, '꼬리 점수', `${score.followUp.correct}/${score.followUp.answered}`, `${score.followUp.percent}%`),
      scoreCard(document, '종합 점수', `${score.combined.correct}/${score.combined.answered}`, `${score.combined.percent}%`),
      scoreCard(document, '보류', `${score.deferred}개`, '정확도에서 제외'),
    );
    return score;
  }

  function renderSummaries() {
    const round = find(page, '#quiz-round-summary');
    const final = find(page, '#quiz-final-summary');
    const showRound = (session.status === 'round-one-summary' || showingRoundOneSummary) && !reviewing;
    const showFinal = ['review-pending', 'completed'].includes(session.status) && !reviewing;
    round.hidden = !showRound;
    final.hidden = !showFinal;
    find(page, '.quiz-flow-layout').hidden = showRound || showFinal;
    if (showRound) {
      const score = renderScore('#quiz-round-score-grid');
      text(page, '#quiz-round-summary-copy', `메인 정확도 ${score.main.percent}%, 꼬리 정확도 ${score.followUp.percent}%입니다. 보류 문제는 오답으로 계산하지 않았습니다.`);
      find(page, '#quiz-summary-deferred').disabled = score.deferred === 0;
      text(page, '#quiz-start-second-round', session.secondRoundStarted ? '추가 메인 문제 계속 풀기' : '추가 메인 5문제 시작');
    }
    if (showFinal) {
      const score = renderScore('#quiz-final-score-grid');
      text(page, '#quiz-final-summary-copy', score.deferred
        ? `메인 문제는 완료했습니다. 보류 ${score.deferred}개를 마치면 완전 완료됩니다.`
        : '활성화된 메인·꼬리 문제를 모두 완료했습니다.');
      find(page, '#quiz-final-deferred').disabled = score.deferred === 0;
    }
  }

  function render() {
    sessionElement.hidden = false;
    invalid.hidden = true;
    text(page, '#quiz-title', source.title);
    text(page, '#quiz-category', source.category);
    const interviewLink = find(page, '#quiz-interview-link');
    if (interviewLink) interviewLink.href = `./template.html?id=${encodeURIComponent(source.id)}`;
    renderProgress();
    renderCluster();
    renderSummaries();
    document.documentElement.dataset.quizReady = 'true';
  }

  function resumeDeferred() {
    if (!session.deferredFollowUpIds.length) return;
    resumingDeferredId = session.deferredFollowUpIds[0];
    reviewing = true;
    showingRoundOneSummary = false;
    pendingSelectedIndex = null;
    session = resumeDeferredQuizFlow(session, resumingDeferredId, QUIZ_QUESTIONS, now());
    persist();
    render();
    announce('보류한 꼬리 문제로 이동했습니다.');
  }

  page.addEventListener('change', (event) => {
    const input = event.target.closest?.('input[name="quiz-choice"]');
    if (!input) return;
    pendingSelectedIndex = Number(input.value);
    const confirm = find(page, '#quiz-confirm-answer');
    if (confirm) confirm.disabled = false;
  });

  page.addEventListener('click', (event) => {
    const button = event.target.closest?.('button');
    if (!button) return;
    if (button.dataset.mainId) {
      reviewing = true;
      resumingDeferredId = null;
      pendingSelectedIndex = null;
      session = reviewQuizFlowMain(session, button.dataset.mainId, now());
      persist();
      render();
      return;
    }
    if (button.id === 'quiz-confirm-answer') {
      const question = selectedQuestion();
      if (!question || pendingSelectedIndex === null) return;
      session = answerQuizFlowQuestion(session, question.id, pendingSelectedIndex, QUIZ_QUESTIONS, now());
      const record = session.answers[question.id];
      pendingSelectedIndex = null;
      resumingDeferredId = null;
      persist();
      if (session.mainCompleted || session.roundOneCompleted) {
        persistCompletedQuiz();
      }
      render();
      announce(record.isCorrect ? '정답입니다. 이어지는 문제를 확인하세요.' : '오답입니다. 해설과 보강 문제를 확인하세요.');
      return;
    }
    if (button.id === 'quiz-defer-answer') {
      const question = selectedQuestion();
      if (!question) return;
      session = deferQuizFlowQuestion(session, question.id, QUIZ_QUESTIONS, now());
      pendingSelectedIndex = null;
      resumingDeferredId = null;
      persist();
      render();
      announce('꼬리 문제를 보류했습니다.');
      return;
    }
    if (button.id === 'quiz-next-main') {
      session = advanceQuizFlowMain(session, QUIZ_QUESTIONS, now());
      reviewing = false;
      pendingSelectedIndex = null;
      persist();
      if (session.mainCompleted || session.roundOneCompleted) {
        persistCompletedQuiz();
      }
      render();
      return;
    }
    if (button.id === 'quiz-deferred-button'
      || button.id === 'quiz-summary-deferred'
      || button.id === 'quiz-final-deferred') {
      resumeDeferred();
      return;
    }
    if (button.id === 'quiz-start-second-round') {
      if (session.secondRoundStarted) {
        showingRoundOneSummary = false;
        render();
        announce('추가 메인 문제 풀이로 돌아왔습니다.');
        return;
      }
      session = startQuizFlowSecondRound(session, now());
      showingRoundOneSummary = false;
      reviewing = false;
      persist();
      render();
      announce('추가 메인 5문제를 시작합니다.');
      return;
    }
    if (button.id === 'quiz-summary-review' || button.id === 'quiz-final-review') {
      reviewing = true;
      showingRoundOneSummary = false;
      session = reviewQuizFlowMain(session, session.mainQuestionIds[0], now());
      persist();
      render();
      return;
    }
    if (button.id === 'quiz-summary-return') {
      reviewing = false;
      resumingDeferredId = null;
      showingRoundOneSummary = true;
      render();
      announce('1라운드 선택 화면으로 돌아왔습니다.');
      return;
    }
    if (button.id === 'quiz-return-summary') {
      reviewing = false;
      resumingDeferredId = null;
      showingRoundOneSummary = false;
      persist();
      render();
      return;
    }
    if (button.id === 'quiz-restart') {
      flowStorage.clearSession(date, source.id);
      session = freshSession();
      reviewing = false;
      pendingSelectedIndex = null;
      persist();
      render();
    }
  });

  persist();
  if (session.mainCompleted || session.roundOneCompleted) persistCompletedQuiz();
  render();
  return {
    get session() { return session; },
    render,
  };
}

if (typeof document !== 'undefined') initQuizPage(document);
