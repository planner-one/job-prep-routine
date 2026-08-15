(() => {
  "use strict";

  // 설정과 외부 데이터 계약
  const PRACTICE_STORAGE_KEY = "interview-prep.practice-counts.v1";
  const SESSION_STORAGE_KEY = "interview-prep.session.v1";
  const CATALOG_VERSION = "v5_3";
  const VALID_VIEWS = new Set(["emphasis", "difficulty", "compact", "guide", "all", "warnings"]);
  const FILTER_DEFAULTS = Object.freeze({
    search: "",
    category: "all",
    project: "all",
    difficulty: "all",
    evidence: "all",
    stage: "all",
  });
  const FILTER_PARAM_NAMES = Object.keys(FILTER_DEFAULTS);

  // 고정 DOM 참조
  const root = document.getElementById("dashboard-root");
  const summary = document.getElementById("data-summary");
  const sidebar = document.getElementById("question-sidebar");
  const sidebarContent = document.getElementById("question-sidebar-content");
  const sidebarOpenButton = document.getElementById("sidebar-open");
  const sidebarCloseButton = document.getElementById("sidebar-close");
  const sidebarBackdrop = document.getElementById("sidebar-backdrop");
  const practiceStatus = document.getElementById("practice-status");
  const resetDialog = document.getElementById("practice-reset-dialog");
  const resetConfirmButton = document.getElementById("practice-reset-confirm");
  const navButtons = [...document.querySelectorAll("[data-view]")];
  const routineData = window.INTERVIEW_ROUTINES || { emphasis: [], difficulty: [], compact: null };
  const dataGroups = window.INTERVIEW_DATA || {};
  const guideFeedbackData = window.INTERVIEW_GUIDE_FEEDBACK || {};
  const guideFeedbackQuestions = guideFeedbackData.questions && typeof guideFeedbackData.questions === "object"
    ? guideFeedbackData.questions
    : {};
  const guideQuestionIds = Object.keys(guideFeedbackQuestions);
  const answerVariants = new Set(["original", "guide"]);
  const questions = Object.values(dataGroups)
    .filter(Array.isArray)
    .flat()
    .filter((question) => question && question.id && question.question);
  const questionById = new Map(questions.map((question) => [question.id, question]));
  const validQuestionIds = new Set(questionById.keys());

  const stageOrder = [
    "실제 사용 위치",
    "기초 개념",
    "선택 이유",
    "구현 흐름",
    "검증 근거",
    "장애·한계",
    "대안·확장",
    "경험",
  ];
  const categoryOrder = ["공통·인성", "경험", "이력서 기술", "필수 CS"];

  let practiceStorageAvailable = true;
  let sessionStorageAvailable = true;
  let sidebarReturnFocus = null;

  // 순수 정규화와 질문 검색
  const escapeHtml = (value = "") =>
    String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");

  const unique = (items) => [...new Set(items.filter(Boolean))];
  const uniqueQuestionsById = (items) => {
    const seen = new Set();
    return items.filter((question) => {
      if (!question || seen.has(question.id)) return false;
      seen.add(question.id);
      return true;
    });
  };
  const normalizeStage = (stage) => String(stage || "").replace(/^\d+\.\s*/, "");
  const normalizePriority = (priority) => ({
    최우선: "핵심",
    핵심: "핵심",
    높음: "핵심",
    중요: "중요",
    보통: "중요",
    보충: "보충",
  }[priority] || priority);
  const priorityScore = (priority) => ({ 핵심: 0, 중요: 1, 보충: 2 }[normalizePriority(priority)] ?? 3);
  const sortQuestions = (items) =>
    [...items].sort((a, b) => {
      const aStage = stageOrder.indexOf(normalizeStage(a.stage));
      const bStage = stageOrder.indexOf(normalizeStage(b.stage));
      if (aStage >= 0 && bStage >= 0 && aStage !== bStage) return aStage - bStage;
      const priorityDifference = priorityScore(a.priority) - priorityScore(b.priority);
      if (priorityDifference !== 0) return priorityDifference;
      return a.id.localeCompare(b.id, "ko");
    });

  const normalizeFilters = (candidate = {}) => {
    const source = candidate && typeof candidate === "object" && !Array.isArray(candidate)
      ? candidate
      : {};
    return {
      search: typeof source.search === "string" ? source.search.slice(0, 120) : "",
      category: typeof source.category === "string" && source.category ? source.category : "all",
      project: typeof source.project === "string" && source.project ? source.project : "all",
      difficulty: typeof source.difficulty === "string" && source.difficulty ? source.difficulty : "all",
      evidence: typeof source.evidence === "string" && source.evidence ? source.evidence : "all",
      stage: typeof source.stage === "string" && source.stage ? source.stage : "all",
    };
  };

  const hasWarning = (question) =>
    Boolean(question.warnings?.length) || question.evidence?.status === "지원자 확인 필요";
  const getGuideFeedback = (questionId) => {
    const value = guideFeedbackQuestions[questionId];
    return value && typeof value === "object" && !Array.isArray(value) ? value : null;
  };
  const matchesAny = (value, candidates) => !candidates?.length || candidates.includes(value);
  const intersects = (values, candidates) =>
    !candidates?.length || values?.some((value) => candidates.includes(value));
  const matchesTopic = (question, candidates) =>
    !candidates?.length || candidates.some((candidate) =>
      question.topic?.includes(candidate) || question.tags?.includes(candidate),
    );
  const matchesQuery = (question, query = {}) => {
    if (!matchesAny(question.category, query.categories)) return false;
    if (!matchesAny(question.project, query.projects)) return false;
    if (!matchesTopic(question, query.topics)) return false;
    if (!matchesAny(normalizeStage(question.stage), query.stages)) return false;
    if (!matchesAny(question.difficulty, query.difficulties)) return false;
    if (!matchesAny(normalizePriority(question.priority), query.priorities)) return false;
    if (!intersects(question.tags || [], query.tags)) return false;
    if (query.hasWarning === true && !hasWarning(question)) return false;
    return true;
  };

  const parseStoredJson = (raw) => {
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  };

  // 브라우저 저장과 앱 상태
  const sanitizePracticeCounts = (counts) => {
    if (!counts || typeof counts !== "object" || Array.isArray(counts)) return {};
    return Object.fromEntries(Object.entries(counts).filter(([id, count]) =>
      validQuestionIds.has(id) && Number.isSafeInteger(count) && count > 0,
    ));
  };

  const writePracticeCounts = (counts) => {
    if (!practiceStorageAvailable) return false;
    try {
      window.localStorage.setItem(PRACTICE_STORAGE_KEY, JSON.stringify({ version: 1, counts }));
      return true;
    } catch {
      practiceStorageAvailable = false;
      return false;
    }
  };

  const loadPracticeCounts = () => {
    try {
      const raw = window.localStorage.getItem(PRACTICE_STORAGE_KEY);
      const parsed = parseStoredJson(raw);
      const counts = parsed?.version === 1 ? sanitizePracticeCounts(parsed.counts) : {};
      window.localStorage.setItem(PRACTICE_STORAGE_KEY, JSON.stringify({ version: 1, counts }));
      return counts;
    } catch {
      practiceStorageAvailable = false;
      return {};
    }
  };

  const state = {
    view: "difficulty",
    selectedRoutine: {
      emphasis: routineData.emphasis?.[0]?.id || "",
      difficulty: routineData.difficulty?.find((routine) => routine.id === "implementation")?.id
        || routineData.difficulty?.[1]?.id
        || routineData.difficulty?.[0]?.id
        || "",
    },
    filters: { ...FILTER_DEFAULTS },
    sidebarMode: "category",
    sidebarSearch: "",
    filtersExpanded: false,
    visibleQuestions: [],
    activeQuestionId: "",
    practiceCounts: loadPracticeCounts(),
    session: null,
    showSummary: false,
    answerVariant: "original",
  };

  const getPracticeCount = (questionId) => state.practiceCounts[questionId] || 0;

  // 루틴·필터별 질문 선택
  const getRoutine = (view, routineId) => {
    if (view === "compact") return routineData.compact?.id === routineId || !routineId
      ? routineData.compact
      : null;
    if (view !== "emphasis" && view !== "difficulty") return null;
    return (routineData[view] || []).find((routine) => routine.id === routineId) || null;
  };

  const selectSectionQuestions = (section, seenIds) => {
    const matches = sortQuestions(questions.filter((question) => matchesQuery(question, section.query)));
    const freshMatches = matches.filter((question) => !seenIds.has(question.id));
    const selected = (freshMatches.length ? freshMatches : matches).slice(0, section.limit || matches.length);
    selected.forEach((question) => seenIds.add(question.id));
    return selected;
  };

  const getRoutineQuestions = (routine) => {
    if (!routine) return [];
    const seenIds = new Set();
    const selected = routine.sections.flatMap((section) => selectSectionQuestions(section, seenIds));
    return uniqueQuestionsById(selected);
  };

  const filterQuestions = (filters = state.filters) => {
    const { search, category, project, difficulty, evidence, stage } = normalizeFilters(filters);
    const normalizedSearch = search.trim().toLocaleLowerCase("ko");
    return sortQuestions(questions.filter((question) => {
      if (category !== "all" && question.category !== category) return false;
      if (project !== "all" && question.project !== project) return false;
      if (difficulty !== "all" && question.difficulty !== difficulty) return false;
      if (evidence !== "all" && question.evidence?.status !== evidence) return false;
      if (stage !== "all" && normalizeStage(question.stage) !== stage) return false;
      if (!normalizedSearch) return true;
      const guideAnswer = getGuideFeedback(question.id)?.answer || {};
      const haystack = [
        question.question,
        question.topic,
        question.project,
        question.difficulty,
        question.answer?.coreLevel,
        question.answer?.compact?.conclusion,
        question.answer?.conclusion,
        ...(question.answer?.keywords || []),
        guideAnswer.compact?.conclusion,
        guideAnswer.conclusion,
        ...(guideAnswer.keywords || []),
        ...(question.tags || []),
      ].join(" ").toLocaleLowerCase("ko");
      return haystack.includes(normalizedSearch);
    }));
  };

  const getContextQuestions = (view, routineId = "", filters = state.filters) => {
    if (view === "guide") return guideQuestionIds.map((id) => questionById.get(id)).filter(Boolean);
    if (view === "all") return filterQuestions(filters);
    if (view === "warnings") return sortQuestions(questions.filter(hasWarning));
    return getRoutineQuestions(getRoutine(view, routineId));
  };

  // 세션 스키마와 진행 상태
  const normalizeContext = (context) => {
    if (!context || !VALID_VIEWS.has(context.view)) return null;
    if (context.view === "emphasis" || context.view === "difficulty") {
      return getRoutine(context.view, context.routineId)
        ? { view: context.view, routineId: context.routineId }
        : null;
    }
    if (context.view === "compact") {
      const compactId = routineData.compact?.id || "";
      return compactId && (!context.routineId || context.routineId === compactId)
        ? { view: "compact", routineId: compactId }
        : null;
    }
    return { view: context.view, routineId: "" };
  };

  const getCompletionScopeIds = (context, filters = state.filters) => context.view === "all"
    ? validQuestionIds
    : new Set(getContextQuestions(context.view, context.routineId, filters).map((question) => question.id));

  const sanitizeSession = (value) => {
    if (!value || value.version !== 1 || typeof value !== "object") return null;
    const context = normalizeContext(value.context);
    if (!context) return null;
    const filters = context.view === "all" ? normalizeFilters(value.filters) : { ...FILTER_DEFAULTS };
    const contextIds = new Set(getContextQuestions(context.view, context.routineId, filters).map((question) => question.id));
    const questionIds = unique((Array.isArray(value.questionIds) ? value.questionIds : [])
      .filter((id) => validQuestionIds.has(id) && contextIds.has(id)));
    if (!questionIds.length) return null;
    const currentQuestionId = questionIds.includes(value.currentQuestionId)
      ? value.currentQuestionId
      : questionIds[0];
    const completionScopeIds = getCompletionScopeIds(context, filters);
    const completedQuestionIds = unique((Array.isArray(value.completedQuestionIds)
      ? value.completedQuestionIds
      : []).filter((id) => completionScopeIds.has(id)));
    return {
      version: 1,
      catalogVersion: CATALOG_VERSION,
      context,
      filters,
      questionIds,
      currentQuestionId,
      completedQuestionIds,
      startedAt: typeof value.startedAt === "string" ? value.startedAt : new Date().toISOString(),
      updatedAt: typeof value.updatedAt === "string" ? value.updatedAt : new Date().toISOString(),
    };
  };

  const loadSession = () => {
    try {
      const raw = window.localStorage.getItem(SESSION_STORAGE_KEY);
      if (!raw) return null;
      const parsed = parseStoredJson(raw);
      const session = sanitizeSession(parsed);
      if (!session) window.localStorage.removeItem(SESSION_STORAGE_KEY);
      return session;
    } catch {
      sessionStorageAvailable = false;
      return null;
    }
  };

  const writeSession = () => {
    if (!sessionStorageAvailable || !state.session?.questionIds.length) return false;
    state.session.updatedAt = new Date().toISOString();
    try {
      window.localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(state.session));
      return true;
    } catch {
      sessionStorageAvailable = false;
      return false;
    }
  };

  const sameContext = (left, right) =>
    left?.view === right?.view && left?.routineId === right?.routineId;

  const createSession = (context, items, currentQuestionId, previousSession = state.session) => {
    const questionIds = uniqueQuestionsById(items).map((question) => question.id);
    if (!questionIds.length) return null;
    const preserveProgress = sameContext(previousSession?.context, context);
    const completionScopeIds = getCompletionScopeIds(context);
    const completedQuestionIds = preserveProgress
      ? previousSession.completedQuestionIds.filter((id) => completionScopeIds.has(id))
      : [];
    return {
      version: 1,
      catalogVersion: CATALOG_VERSION,
      context,
      filters: context.view === "all" ? normalizeFilters(state.filters) : { ...FILTER_DEFAULTS },
      questionIds,
      currentQuestionId: questionIds.includes(currentQuestionId) ? currentQuestionId : questionIds[0],
      completedQuestionIds,
      startedAt: preserveProgress ? previousSession.startedAt : new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  };

  const applySession = (session) => {
    state.session = session;
    state.view = session.context.view;
    if (state.view === "emphasis" || state.view === "difficulty") {
      state.selectedRoutine[state.view] = session.context.routineId;
    }
    if (state.view === "all") state.filters = normalizeFilters(session.filters);
    state.visibleQuestions = session.questionIds.map((id) => questionById.get(id)).filter(Boolean);
    state.activeQuestionId = session.currentQuestionId;
    state.showSummary = false;
  };

  // URL 직링크와 브라우저 이동
  const findRoutineContext = (routineId) => {
    for (const view of ["emphasis", "difficulty"]) {
      if ((routineData[view] || []).some((routine) => routine.id === routineId)) {
        return { view, routineId };
      }
    }
    if (routineData.compact?.id === routineId) return { view: "compact", routineId };
    return null;
  };

  const readUrlState = () => {
    const params = new URL(window.location.href).searchParams;
    const hasDirectState = ["view", "routine", "question", ...FILTER_PARAM_NAMES]
      .some((key) => params.has(key));
    if (!hasDirectState) return null;

    const rawRoutine = params.get("routine") || "";
    const rawQuestion = params.get("question") || "";
    let view = params.get("view") || "";
    if (!view && rawRoutine) view = findRoutineContext(rawRoutine)?.view || "";
    if (!view && rawQuestion) view = "all";
    if (!view && FILTER_PARAM_NAMES.some((key) => params.has(key))) view = "all";
    if (!VALID_VIEWS.has(view)) return null;

    let context;
    if (view === "emphasis" || view === "difficulty") {
      const fallbackId = state.selectedRoutine[view];
      const routineId = rawRoutine || fallbackId;
      if (!getRoutine(view, routineId)) return null;
      context = { view, routineId };
    } else if (view === "compact") {
      const compactId = routineData.compact?.id || "";
      if (!compactId || (rawRoutine && rawRoutine !== compactId)) return null;
      context = { view, routineId: compactId };
    } else {
      if (rawRoutine) return null;
      context = { view, routineId: "" };
    }

    const filters = context.view === "all"
      ? normalizeFilters(Object.fromEntries(FILTER_PARAM_NAMES.map((key) => [key, params.get(key) ?? FILTER_DEFAULTS[key]])))
      : { ...FILTER_DEFAULTS };
    const items = getContextQuestions(context.view, context.routineId, filters);
    if (!items.length) return null;
    if (rawQuestion && !items.some((question) => question.id === rawQuestion)) return null;
    return { context, filters, items, questionId: rawQuestion || items[0].id };
  };

  const syncUrl = (mode = "replace") => {
    const url = new URL(window.location.href);
    url.search = "";
    const context = state.session?.context || { view: state.view, routineId: "" };
    url.searchParams.set("view", context.view);
    if (context.routineId) url.searchParams.set("routine", context.routineId);
    if (context.view === "all") {
      const filters = normalizeFilters(state.filters);
      FILTER_PARAM_NAMES.forEach((key) => {
        if (filters[key] !== FILTER_DEFAULTS[key]) url.searchParams.set(key, filters[key]);
      });
    }
    if (state.activeQuestionId) url.searchParams.set("question", state.activeQuestionId);
    window.history[mode === "push" ? "pushState" : "replaceState"]({}, "", url);
  };

  const activateContext = (context, questionId = "", historyMode = "push", filters = null) => {
    const normalized = normalizeContext(context);
    if (!normalized) return false;
    state.view = normalized.view;
    if (state.view === "all" && filters) state.filters = normalizeFilters(filters);
    if (state.view === "emphasis" || state.view === "difficulty") {
      state.selectedRoutine[state.view] = normalized.routineId;
    }
    const items = getContextQuestions(normalized.view, normalized.routineId);
    const nextSession = createSession(normalized, items, questionId);
    if (!nextSession) {
      state.session = null;
      state.visibleQuestions = [];
      state.activeQuestionId = "";
      state.showSummary = false;
      if (historyMode) syncUrl(historyMode);
      return false;
    }
    applySession(nextSession);
    writeSession();
    if (historyMode) syncUrl(historyMode);
    return true;
  };

  // 질문 카드 렌더링
  const difficultyProfiles = {
    기초: { className: "is-foundation" },
    중급: { className: "is-implementation" },
    심화: { className: "is-advanced" },
    압박: { className: "is-pressure" },
  };
  const followupDifficultyByType = {
    "사실 확인": "기초",
    "선택 압박": "중급",
    "장애·대안": "심화",
  };
  const getMinuteSummaryLabels = (question) => {
    if (question.category === "필수 CS") return ["정의·결론", "원리·근거", "적용·한계"];
    if (question.category === "공통·인성") return ["입장·결론", "경험·행동", "결과·배움"];
    return ["역할·결론", "문제·접근", "검증·결과"];
  };
  const evidenceClass = (status) => {
    if (status === "확인됨") return "badge-confirmed";
    if (status === "지원자 확인 필요") return "badge-warning";
    if (status === "일반론") return "badge-general";
    return "";
  };

  const renderWarnings = (question) => {
    const warnings = question.warnings || [];
    if (!warnings.length && question.evidence?.status !== "지원자 확인 필요") return "";
    const lines = warnings.length
      ? warnings.map((warning) => `<li>${escapeHtml(warning)}</li>`).join("")
      : "<li>실제 구현 코드나 원본 측정 자료를 본인이 다시 확인해야 합니다.</li>";
    return `<div class="warning-box"><strong>확인 필요</strong><ul>${lines}</ul></div>`;
  };

  const renderAnswerVariantSwitch = (guideFeedback, useGuideAnswer) => {
    if (!guideFeedback?.answer) return "";
    const currentVariant = useGuideAnswer ? "guide" : "original";
    return `
      <section class="answer-variant-panel" aria-label="답변 비교">
        <div class="answer-variant-heading">
          <div>
            <p class="section-kicker">ANSWER COMPARE</p>
            <strong>${useGuideAnswer ? "가이드 반영 답변" : "현재 기존 답변"}</strong>
          </div>
          <span>${escapeHtml(guideFeedback.sourceSection || guideFeedbackData.title || "면접 준비 가이드")}</span>
        </div>
        <div class="answer-variant-buttons" role="group" aria-label="답변 버전 선택">
          <button type="button" data-answer-variant="original" aria-pressed="${currentVariant === "original"}" class="answer-variant-button ${currentVariant === "original" ? "is-active" : ""}">기존 답변</button>
          <button type="button" data-answer-variant="guide" aria-pressed="${currentVariant === "guide"}" class="answer-variant-button ${currentVariant === "guide" ? "is-active" : ""}">가이드 반영</button>
        </div>
      </section>
    `;
  };

  const renderGuideFeedback = (guideFeedback) => {
    const feedback = Array.isArray(guideFeedback?.feedback) ? guideFeedback.feedback : [];
    if (!feedback.length) return "";
    return `
      <section class="guide-feedback-box" aria-label="가이드 피드백">
        <div class="guide-feedback-heading">
          <strong>왜 바꿨는지</strong>
          <span>${escapeHtml(guideFeedbackData.title || "면접 준비 가이드")} 검토</span>
        </div>
        <ul>${feedback.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
      </section>
    `;
  };

  const renderQuestionCard = (question, ordinal, total) => {
    const guideFeedback = getGuideFeedback(question.id);
    const useGuideAnswer = state.answerVariant === "guide" && Boolean(guideFeedback?.answer);
    const answer = useGuideAnswer ? guideFeedback.answer : question.answer || {};
    const compact = answer.compact || {};
    const evidence = question.evidence || {};
    const followups = question.followups || [];
    const keywords = answer.keywords || [];
    const sources = evidence.sources || [];
    const coreLevel = answer.coreLevel || question.answer?.coreLevel;
    const coreLabel = coreLevel ? `${coreLevel} 핵심문장` : "핵심 답변";
    const difficulty = question.difficulty || "미분류";
    const difficultyProfile = difficultyProfiles[difficulty] || { className: "" };
    const minuteSummaryLabels = getMinuteSummaryLabels(question);
    const conciseAnswer = {
      conclusion: compact.conclusion || answer.conclusion || "답변 준비 중입니다.",
      evidence1: compact.evidence1 || answer.evidence1 || "근거 확인이 필요합니다.",
      evidence2: compact.evidence2 || answer.evidence2 || "근거 확인이 필요합니다.",
    };
    const minuteSummaryAnswer = {
      conclusion: answer.conclusion || conciseAnswer.conclusion,
      evidence1: answer.evidence1 || conciseAnswer.evidence1,
      evidence2: answer.evidence2 || conciseAnswer.evidence2,
    };
    const practiceCount = getPracticeCount(question.id);

    return `
      <article class="question-card ${hasWarning(question) ? "has-warning" : ""}" id="question-${escapeHtml(question.id)}" tabindex="-1" data-question-card="${escapeHtml(question.id)}" aria-labelledby="question-title-${escapeHtml(question.id)}">
        <div class="question-position">
          <span>${ordinal} / ${total}</span>
          <span>${escapeHtml(question.id)}</span>
        </div>
        <div class="card-meta">
          <span class="badge badge-project">${escapeHtml(question.project || question.category)}</span>
          <span class="badge">${escapeHtml(question.topic)}</span>
          <span class="badge badge-difficulty ${difficultyProfile.className}">${escapeHtml(difficulty)}</span>
          <span class="badge ${evidenceClass(evidence.status)}">${escapeHtml(evidence.status || "근거 미분류")}</span>
        </div>
        <h3 id="question-title-${escapeHtml(question.id)}">${escapeHtml(question.question)}</h3>

        ${renderAnswerVariantSwitch(guideFeedback, useGuideAnswer)}

        <section class="core-answer" aria-labelledby="core-label-${escapeHtml(question.id)}">
          <p class="answer-label" id="core-label-${escapeHtml(question.id)}">${escapeHtml(coreLabel)} · 1문장</p>
          <p>${escapeHtml(conciseAnswer.conclusion)}</p>
        </section>

        ${keywords.length ? `<ul class="keywords" aria-label="핵심 키워드">${keywords.map((keyword) => `<li>${escapeHtml(keyword)}</li>`).join("")}</ul>` : ""}
        ${renderWarnings(question)}
        ${useGuideAnswer ? renderGuideFeedback(guideFeedback) : ""}

        <details class="answer-details">
          <summary>
            <span>근거 1·2 확인</span>
            <small>각 1문장</small>
          </summary>
          <div class="answer-grid">
            <div class="answer-block">
              <p class="answer-label">근거 1</p>
              <p>${escapeHtml(conciseAnswer.evidence1)}</p>
            </div>
            <div class="answer-block">
              <p class="answer-label">근거 2</p>
              <p>${escapeHtml(conciseAnswer.evidence2)}</p>
            </div>
          </div>
        </details>

        <details class="minute-summary">
          <summary>
            <span>1분 요약</span>
            <small>말하기 순서 4단계</small>
          </summary>
          <ol class="minute-summary-list" aria-label="1분 요약 말하기 순서">
            <li><span>${escapeHtml(minuteSummaryLabels[0])}</span><p>${escapeHtml(minuteSummaryAnswer.conclusion)}</p></li>
            <li><span>${escapeHtml(minuteSummaryLabels[1])}</span><p>${escapeHtml(minuteSummaryAnswer.evidence1)}</p></li>
            <li><span>${escapeHtml(minuteSummaryLabels[2])}</span><p>${escapeHtml(minuteSummaryAnswer.evidence2)}</p></li>
            ${keywords.length ? `<li><span>설명 확장</span><p>관련해서 ${escapeHtml(keywords.join(", "))}을 중심으로 설명드릴 수 있습니다.</p></li>` : ""}
          </ol>
        </details>

        <details class="followup-details">
          <summary>
            <span>난이도별 꼬리질문</span>
            <small>${followups.length}개 대비</small>
          </summary>
          <p class="followup-guide">기초는 사실 확인, 중급은 선택 이유, 심화는 장애·대안을 중심으로 답합니다.</p>
          ${followups.length ? `
            <ul class="followup-list">
              ${followups.map((followup) => {
                const followupDifficulty = followup.difficulty || followupDifficultyByType[followup.type] || "중급";
                const profile = difficultyProfiles[followupDifficulty] || { className: "" };
                return `
                  <li>
                    <div class="followup-meta">
                      <span class="followup-difficulty ${profile.className}">${escapeHtml(followupDifficulty)}</span>
                      <span class="followup-type">${escapeHtml(followup.type)}</span>
                    </div>
                    <div>
                      <p class="followup-question"><strong>${escapeHtml(followup.question)}</strong></p>
                      <p class="followup-defense">${escapeHtml(followup.defense || "답변 근거를 확인합니다.")}</p>
                    </div>
                  </li>
                `;
              }).join("")}
            </ul>
          ` : `<p class="evidence-note">추가 꼬리질문을 준비 중입니다.</p>`}
        </details>

        ${answer.caution ? `
          <details class="caution-details">
            <summary><span>말할 때 주의</span><small>과장 없이 답하기</small></summary>
            <p class="caution">${escapeHtml(answer.caution)}</p>
          </details>
        ` : ""}

        <details class="source-details">
          <summary><span>근거 상태와 출처</span><small>${escapeHtml(evidence.status || "미분류")}</small></summary>
          <p class="evidence-note">${escapeHtml(evidence.note || "근거 설명을 준비 중입니다.")}</p>
          ${sources.length ? `<ul class="sources">${sources.map((source) => `<li>${escapeHtml(source)}</li>`).join("")}</ul>` : ""}
        </details>

        <div class="practice-row" aria-label="현재 질문 누적 연습">
          <span class="practice-count">누적 답변 <strong data-practice-count="${escapeHtml(question.id)}">${practiceCount}</strong>회</span>
          <button class="practice-button" type="button" data-practice-action="decrement" data-question-id="${escapeHtml(question.id)}" ${practiceCount === 0 ? "disabled" : ""}>1회 되돌리기</button>
        </div>
      </article>
    `;
  };

  // 작업공간 렌더링
  const getCurrentRoutine = () => getRoutine(state.view, state.session?.context.routineId || "");
  const getCompletedCount = () => {
    if (!state.session) return 0;
    const completed = new Set(state.session.completedQuestionIds);
    return state.session.questionIds.filter((id) => completed.has(id)).length;
  };
  const getCurrentIndex = () => state.session
    ? state.session.questionIds.indexOf(state.activeQuestionId)
    : -1;

  const renderRoutineChoices = () => {
    if (state.view !== "emphasis" && state.view !== "difficulty") return "";
    const routines = routineData[state.view] || [];
    const currentRoutine = getCurrentRoutine();
    return `
      <div class="routine-picker">
        <div>
          <span class="control-label">연습 루틴</span>
          <strong>${escapeHtml(currentRoutine?.title || "")}</strong>
        </div>
        <div class="routine-choices" role="group" aria-label="루틴 선택">
          ${routines.map((routine) => `
            <button type="button" class="choice-button ${routine.id === currentRoutine?.id ? "is-active" : ""}" data-routine-id="${escapeHtml(routine.id)}" aria-pressed="${routine.id === currentRoutine?.id}">
              ${escapeHtml(routine.title)}
            </button>
          `).join("")}
        </div>
      </div>
    `;
  };

  const optionMarkup = (values, selected, allLabel) => `
    <option value="all">${allLabel}</option>
    ${values.map((value) => `<option value="${escapeHtml(value)}" ${value === selected ? "selected" : ""}>${escapeHtml(value)}</option>`).join("")}
  `;

  const renderAllControls = () => {
    const categories = unique(questions.map((question) => question.category)).sort((a, b) => a.localeCompare(b, "ko"));
    const projects = unique(questions.map((question) => question.project)).sort((a, b) => a.localeCompare(b, "ko"));
    const difficulties = unique(questions.map((question) => question.difficulty));
    const evidenceStatuses = unique(questions.map((question) => question.evidence?.status));
    const stages = unique(questions.map((question) => normalizeStage(question.stage)))
      .sort((a, b) => stageOrder.indexOf(a) - stageOrder.indexOf(b));
    return `
      <div class="all-question-controls">
        <label class="primary-search">질문 검색
          <input type="search" data-filter="search" value="${escapeHtml(state.filters.search)}" placeholder="Redis, 트랜잭션, 협업…" autocomplete="off" />
        </label>
        <details class="filter-panel" ${state.filtersExpanded ? "open" : ""}>
          <summary><span>분류 필터</span><small>${state.visibleQuestions.length}문항</small></summary>
          <div class="toolbar">
            <label>분야<select data-filter="category">${optionMarkup(categories, state.filters.category, "전체 분야")}</select></label>
            <label>프로젝트<select data-filter="project">${optionMarkup(projects, state.filters.project, "전체 프로젝트")}</select></label>
            <label>난이도<select data-filter="difficulty">${optionMarkup(difficulties, state.filters.difficulty, "전체 난이도")}</select></label>
            <label>근거 상태<select data-filter="evidence">${optionMarkup(evidenceStatuses, state.filters.evidence, "전체 상태")}</select></label>
            <label>질문 단계<select data-filter="stage">${optionMarkup(stages, state.filters.stage, "전체 단계")}</select></label>
          </div>
        </details>
      </div>
    `;
  };

  const renderRiskSummary = () => {
    const counts = questions.reduce((result, question) => {
      const status = question.evidence?.status || "미분류";
      result[status] = (result[status] || 0) + 1;
      return result;
    }, {});
    return `
      <div class="risk-summary" aria-label="근거 상태 요약">
        <div class="risk-stat is-confirmed"><strong>${counts["확인됨"] || 0}</strong><span>코드·테스트 확인</span></div>
        <div class="risk-stat"><strong>${counts["문서 근거"] || 0}</strong><span>문서 근거</span></div>
        <div class="risk-stat is-warning"><strong>${counts["지원자 확인 필요"] || 0}</strong><span>본인 확인 필요</span></div>
        <div class="risk-stat"><strong>${counts["일반론"] || 0}</strong><span>일반론</span></div>
      </div>
    `;
  };

  const viewMeta = () => {
    const routine = getCurrentRoutine();
    if (state.view === "emphasis") {
      return { kicker: "강조점별 루틴", title: routine?.title || "강조점별 연습", description: routine?.summary || "" };
    }
    if (state.view === "difficulty") {
      return { kicker: "난이도별 루틴", title: `${routine?.title || "중급"} 답변 연습`, description: routine?.summary || "" };
    }
    if (state.view === "compact") {
      return { kicker: "면접 직전", title: "2시간 압축 복습", description: routineData.compact?.summary || "" };
    }
    if (state.view === "guide") {
      return { kicker: "면접 준비 가이드", title: "기존 답변과 가이드 반영 답변 비교", description: "가이드와 연결된 14문항을 번갈아 보며 답변을 다듬습니다." };
    }
    if (state.view === "all") {
      return { kicker: "질문 탐색", title: "전체 질문", description: "검색한 목록에서도 한 번에 한 질문만 집중해서 연습합니다." };
    }
    return { kicker: "근거 확인", title: "확인하고 말할 답변", description: "과장하지 않고 확인된 범위까지만 답할 질문입니다." };
  };

  const renderSessionProgress = () => {
    if (!state.session) return "";
    const total = state.session.questionIds.length;
    const completed = getCompletedCount();
    const index = Math.max(0, getCurrentIndex());
    const percent = total ? Math.round((completed / total) * 100) : 0;
    return `
      <div class="session-progress" aria-label="현재 세션 진행률">
        <div class="session-progress-copy">
          <span>${index + 1}번째 질문 · 완료 ${completed}개</span>
          <strong>${percent}%</strong>
        </div>
        <div class="progress-track" role="progressbar" aria-valuemin="0" aria-valuemax="${total}" aria-valuenow="${completed}" aria-label="${total}문항 중 ${completed}문항 완료">
          <span style="width: ${percent}%"></span>
        </div>
      </div>
    `;
  };

  const renderSessionSummary = () => {
    const total = state.session?.questionIds.length || 0;
    const completed = getCompletedCount();
    const remaining = Math.max(0, total - completed);
    return `
      <section class="session-complete" tabindex="-1" data-session-summary>
        <span class="complete-mark" aria-hidden="true">✓</span>
        <p class="section-kicker">SESSION COMPLETE</p>
        <h3>이번 세션에서 ${completed}개 답변을 마쳤어요</h3>
        <p>${remaining
          ? `아직 ${remaining}개가 남았습니다. 목록에서 빠진 질문부터 이어가세요.`
          : "핵심 답변을 모두 말했습니다. 다음은 확인이 필요한 주장만 짧게 점검하세요."}</p>
        <div class="completion-actions">
          ${remaining
            ? `<button type="button" class="secondary-action" data-session-action="resume-incomplete">남은 질문 계속</button>`
            : `<button type="button" class="secondary-action" data-switch-view="warnings">확인 필요 복습</button>`}
          <button type="button" class="primary-action" data-session-action="restart">이 루틴 다시 연습</button>
        </div>
      </section>
    `;
  };

  const renderSessionActions = () => {
    if (!state.session || state.showSummary) return "";
    const index = getCurrentIndex();
    const isLast = index === state.session.questionIds.length - 1;
    return `
      <div class="session-actions" role="group" aria-label="질문 이동과 완료">
        <button type="button" class="session-action is-list" data-session-action="list" aria-controls="question-sidebar">
          <span aria-hidden="true">☰</span>
          목록
        </button>
        <button type="button" class="session-action" data-session-action="previous" ${index <= 0 ? "disabled" : ""}>
          <span aria-hidden="true">←</span>
          이전
        </button>
        <button type="button" class="session-action is-primary" data-session-action="complete">
          ${isLast ? "완료하고 결과 보기" : "완료하고 다음"}
          <span aria-hidden="true">→</span>
        </button>
      </div>
    `;
  };

  const renderMain = () => {
    const meta = viewMeta();
    const activeQuestion = questionById.get(state.activeQuestionId);
    const currentIndex = getCurrentIndex();
    root.innerHTML = `
      <section class="practice-workspace" aria-labelledby="workspace-title">
        <header class="workspace-header">
          <div>
            <p class="section-kicker">${escapeHtml(meta.kicker)}</p>
            <h2 id="workspace-title">${escapeHtml(meta.title)}</h2>
            <p>${escapeHtml(meta.description)}</p>
          </div>
          ${state.session ? `<span class="question-total">총 ${state.session.questionIds.length}문항</span>` : ""}
        </header>
        ${renderRoutineChoices()}
        ${state.view === "all" ? renderAllControls() : ""}
        ${state.view === "warnings" ? renderRiskSummary() : ""}
        ${renderSessionProgress()}
        ${state.showSummary
          ? renderSessionSummary()
          : activeQuestion
            ? renderQuestionCard(activeQuestion, currentIndex + 1, state.session.questionIds.length)
            : `<p class="empty-state">조건에 맞는 질문이 없습니다. 검색어나 필터를 바꿔주세요.</p>`}
        ${renderSessionActions()}
      </section>
    `;
  };

  // 질문 탐색 사이드바 렌더링
  const renderSidebarQuestionLink = (question, index) => {
    const isCurrent = question.id === state.activeQuestionId;
    const isCompleted = state.session?.completedQuestionIds.includes(question.id);
    return `
      <li class="sidebar-question-item" data-sidebar-question-search="${escapeHtml([
        question.question,
        question.category,
        question.project,
        question.topic,
      ].join(" ").toLocaleLowerCase("ko"))}">
        <button class="sidebar-question-link ${isCurrent ? "is-current" : ""}" type="button" data-question-jump="${escapeHtml(question.id)}" ${isCurrent ? 'aria-current="true"' : ""}>
          <span class="sidebar-sequence ${isCompleted ? "is-complete" : ""}" aria-label="${isCompleted ? "완료" : `${index + 1}번째`}">${isCompleted ? "✓" : index + 1}</span>
          <span class="sidebar-question-copy">${escapeHtml(question.question)}</span>
          <span class="sidebar-count"><span data-practice-count="${escapeHtml(question.id)}">${getPracticeCount(question.id)}</span>회</span>
        </button>
      </li>
    `;
  };

  const renderCategorySidebar = (items) => {
    const indexById = new Map(items.map((question, index) => [question.id, index]));
    const categories = new Map();
    items.forEach((question) => {
      if (!categories.has(question.category)) categories.set(question.category, []);
      categories.get(question.category).push(question);
    });
    const ordered = [...categories.entries()].sort(([a], [b]) => {
      const aIndex = categoryOrder.indexOf(a);
      const bIndex = categoryOrder.indexOf(b);
      return (aIndex < 0 ? 99 : aIndex) - (bIndex < 0 ? 99 : bIndex) || a.localeCompare(b, "ko");
    });
    return ordered.map(([category, categoryQuestions]) => {
      const hasCurrent = categoryQuestions.some((question) => question.id === state.activeQuestionId);
      const completed = categoryQuestions.filter((question) => state.session?.completedQuestionIds.includes(question.id)).length;
      return `
        <details class="sidebar-category" ${hasCurrent ? "open" : ""}>
          <summary>
            <span>${escapeHtml(category)}</span>
            <span class="sidebar-progress">${completed}/${categoryQuestions.length}</span>
          </summary>
          <ul class="sidebar-question-list">
            ${categoryQuestions.map((question) => renderSidebarQuestionLink(question, indexById.get(question.id))).join("")}
          </ul>
        </details>
      `;
    }).join("");
  };

  const renderFlatSidebar = (items) => `
    <label class="sidebar-search-label" for="sidebar-question-search">현재 목록 검색</label>
    <input id="sidebar-question-search" class="sidebar-search" type="search" value="${escapeHtml(state.sidebarSearch)}" placeholder="질문, 프로젝트, 기술…" autocomplete="off" />
    <p id="sidebar-search-result" class="sidebar-search-result"></p>
    <ul class="sidebar-question-list is-flat">
      ${items.map((question, index) => renderSidebarQuestionLink(question, index)).join("")}
    </ul>
  `;

  const updateSidebarSearchResults = () => {
    if (!sidebarContent || state.sidebarMode !== "question") return;
    const query = state.sidebarSearch.trim().toLocaleLowerCase("ko");
    let visibleCount = 0;
    sidebarContent.querySelectorAll("[data-sidebar-question-search]").forEach((item) => {
      const matches = !query || item.dataset.sidebarQuestionSearch.includes(query);
      item.hidden = !matches;
      if (matches) visibleCount += 1;
    });
    const result = sidebarContent.querySelector("#sidebar-search-result");
    if (result) result.textContent = `현재 ${visibleCount}문항`;
  };

  const renderSidebar = () => {
    if (!sidebarContent) return;
    const items = uniqueQuestionsById(state.visibleQuestions);
    const completed = getCompletedCount();
    const allAttempts = Object.values(state.practiceCounts).reduce((sum, count) => sum + count, 0);
    sidebarContent.innerHTML = `
      <div class="sidebar-heading">
        <p class="section-kicker">QUESTION LIST</p>
        <h2>질문 목록</h2>
        <p class="sidebar-overview">완료 <strong>${completed}</strong>/${items.length} · 누적 답변 ${allAttempts}회</p>
      </div>
      ${practiceStorageAvailable && sessionStorageAvailable ? "" : `<p class="storage-warning" role="status"><strong>임시 저장 중</strong> 브라우저 저장을 사용할 수 없어 새로고침하면 진행 상태가 사라질 수 있습니다.</p>`}
      <div class="sidebar-mode-tabs" role="group" aria-label="질문 목록 표시 방식">
        <button class="sidebar-mode-button ${state.sidebarMode === "category" ? "is-active" : ""}" type="button" data-sidebar-mode="category" aria-pressed="${state.sidebarMode === "category"}">묶어서 보기</button>
        <button class="sidebar-mode-button ${state.sidebarMode === "question" ? "is-active" : ""}" type="button" data-sidebar-mode="question" aria-pressed="${state.sidebarMode === "question"}">전체 펼치기</button>
      </div>
      <div class="sidebar-scroll-area">
        ${items.length
          ? state.sidebarMode === "category"
            ? renderCategorySidebar(items)
            : renderFlatSidebar(items)
          : `<p class="sidebar-empty">현재 표시할 질문이 없습니다.</p>`}
      </div>
      <div class="sidebar-footer">
        <p>질문별 횟수는 이 기기에 저장</p>
        <button class="reset-practice-button" type="button" data-practice-reset ${allAttempts === 0 ? "disabled" : ""}>횟수 초기화</button>
      </div>
    `;
    updateSidebarSearchResults();
    window.requestAnimationFrame(() => {
      sidebarContent.querySelector('[aria-current="true"]')?.scrollIntoView({ block: "nearest" });
    });
  };

  const updateNavigation = () => {
    navButtons.forEach((button) => {
      const isActive = button.dataset.view === state.view;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });
  };

  const render = () => {
    updateNavigation();
    renderMain();
    renderSidebar();
  };

  // 사용자 명령과 포커스 이동
  const closeSidebar = ({ restoreFocus = true } = {}) => {
    if (!sidebar?.classList.contains("is-open")) return;
    sidebar.classList.remove("is-open");
    sidebarOpenButton?.setAttribute("aria-expanded", "false");
    if (sidebarBackdrop) sidebarBackdrop.hidden = true;
    document.body.classList.remove("has-open-sidebar");
    if (restoreFocus && sidebarReturnFocus instanceof HTMLElement) sidebarReturnFocus.focus();
    sidebarReturnFocus = null;
  };

  const openSidebar = () => {
    if (!sidebar) return;
    if (window.matchMedia("(min-width: 981px)").matches) {
      (sidebar.querySelector('[aria-current="true"]') || sidebar.querySelector("button"))?.focus();
      return;
    }
    sidebarReturnFocus = document.activeElement;
    sidebar.classList.add("is-open");
    sidebarOpenButton?.setAttribute("aria-expanded", "true");
    if (sidebarBackdrop) sidebarBackdrop.hidden = false;
    document.body.classList.add("has-open-sidebar");
    window.requestAnimationFrame(() => sidebarCloseButton?.focus());
  };

  const focusActiveQuestion = () => {
    window.requestAnimationFrame(() => {
      const card = root.querySelector("[data-question-card]");
      card?.scrollIntoView({ behavior: "auto", block: "start" });
      card?.focus({ preventScroll: true });
    });
  };

  const navigateQuestion = (questionId, historyMode = "push") => {
    if (!state.session?.questionIds.includes(questionId)) return;
    state.activeQuestionId = questionId;
    state.session.currentQuestionId = questionId;
    state.showSummary = false;
    writeSession();
    syncUrl(historyMode);
    closeSidebar({ restoreFocus: false });
    render();
    focusActiveQuestion();
  };

  const changePracticeCount = (questionId, delta) => {
    if (!validQuestionIds.has(questionId)) return false;
    const current = getPracticeCount(questionId);
    const next = delta > 0
      ? Math.min(Number.MAX_SAFE_INTEGER, current + 1)
      : Math.max(0, current - 1);
    if (next === current) return false;
    if (next > 0) state.practiceCounts[questionId] = next;
    else delete state.practiceCounts[questionId];
    writePracticeCounts(state.practiceCounts);
    return true;
  };

  const announcePracticeCount = (questionId, prefix = "") => {
    if (!practiceStatus) return;
    const question = questionById.get(questionId);
    practiceStatus.textContent = `${prefix} ${question?.question || questionId}, 누적 답변 ${getPracticeCount(questionId)}회`.trim();
  };

  const completeAndAdvance = () => {
    if (!state.session || !state.activeQuestionId) return;
    const questionId = state.activeQuestionId;
    changePracticeCount(questionId, 1);
    if (!state.session.completedQuestionIds.includes(questionId)) {
      state.session.completedQuestionIds.push(questionId);
    }
    const index = getCurrentIndex();
    const nextQuestionId = state.session.questionIds[index + 1];
    writeSession();
    announcePracticeCount(questionId, "답변 완료.");
    if (nextQuestionId) {
      navigateQuestion(nextQuestionId, "push");
      return;
    }
    state.showSummary = true;
    render();
    window.requestAnimationFrame(() => root.querySelector("[data-session-summary]")?.focus());
  };

  const restartSession = () => {
    if (!state.session?.questionIds.length) return;
    const currentQuestionIds = new Set(state.session.questionIds);
    state.session.completedQuestionIds = state.session.completedQuestionIds
      .filter((id) => !currentQuestionIds.has(id));
    state.session.startedAt = new Date().toISOString();
    state.activeQuestionId = state.session.questionIds[0];
    state.session.currentQuestionId = state.activeQuestionId;
    state.showSummary = false;
    writeSession();
    syncUrl("push");
    render();
    focusActiveQuestion();
  };

  const resumeIncomplete = () => {
    const incomplete = state.session?.questionIds.find((id) => !state.session.completedQuestionIds.includes(id));
    if (incomplete) navigateQuestion(incomplete, "push");
  };

  const resetPracticeCounts = () => {
    state.practiceCounts = {};
    writePracticeCounts(state.practiceCounts);
    if (practiceStatus) practiceStatus.textContent = "모든 질문의 누적 연습 횟수를 초기화했습니다.";
    render();
  };

  const switchView = (view, historyMode = "push") => {
    if (!VALID_VIEWS.has(view)) return;
    let routineId = "";
    if (view === "emphasis" || view === "difficulty") routineId = state.selectedRoutine[view];
    if (view === "compact") routineId = routineData.compact?.id || "";
    activateContext({ view, routineId }, "", historyMode);
    render();
    document.getElementById("workspace-title")?.focus?.({ preventScroll: true });
  };

  const trapSidebarFocus = (event) => {
    if (event.key === "Escape") {
      event.preventDefault();
      closeSidebar();
      return;
    }
    if (event.key !== "Tab" || !sidebar?.classList.contains("is-open")) return;
    const focusable = [...sidebar.querySelectorAll('button:not([disabled]), input:not([disabled]), summary, [href], [tabindex]:not([tabindex="-1"])')]
      .filter((element) => !element.hidden && element.getClientRects().length > 0);
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  // 이벤트 연결
  navButtons.forEach((button) => {
    button.addEventListener("click", () => {
      closeSidebar({ restoreFocus: false });
      switchView(button.dataset.view);
    });
  });

  root.addEventListener("click", (event) => {
    const routineButton = event.target.closest("[data-routine-id]");
    if (routineButton) {
      activateContext({ view: state.view, routineId: routineButton.dataset.routineId }, "", "push");
      render();
      focusActiveQuestion();
      return;
    }

    const switchButton = event.target.closest("[data-switch-view]");
    if (switchButton) {
      switchView(switchButton.dataset.switchView);
      return;
    }

    const answerVariantButton = event.target.closest("[data-answer-variant]");
    if (answerVariantButton && answerVariants.has(answerVariantButton.dataset.answerVariant)) {
      state.answerVariant = answerVariantButton.dataset.answerVariant;
      render();
      root.querySelector(`[data-answer-variant="${state.answerVariant}"]`)?.focus({ preventScroll: true });
      return;
    }

    const practiceButton = event.target.closest("[data-practice-action]");
    if (practiceButton?.dataset.practiceAction === "decrement") {
      const questionId = practiceButton.dataset.questionId;
      if (changePracticeCount(questionId, -1)) {
        state.session.completedQuestionIds = state.session.completedQuestionIds.filter((id) => id !== questionId);
        writeSession();
        announcePracticeCount(questionId, "1회 되돌림.");
        render();
        focusActiveQuestion();
      }
      return;
    }

    const sessionButton = event.target.closest("[data-session-action]");
    if (!sessionButton) return;
    const action = sessionButton.dataset.sessionAction;
    if (action === "list") openSidebar();
    if (action === "previous") {
      const previousId = state.session?.questionIds[getCurrentIndex() - 1];
      if (previousId) navigateQuestion(previousId);
    }
    if (action === "complete") completeAndAdvance();
    if (action === "restart") restartSession();
    if (action === "resume-incomplete") resumeIncomplete();
  });

  root.addEventListener("input", (event) => {
    const control = event.target.closest("[data-filter]");
    if (!control || control.tagName !== "INPUT") return;
    const selectionStart = control.selectionStart;
    const selectionEnd = control.selectionEnd;
    state.filters[control.dataset.filter] = control.value;
    activateContext({ view: "all", routineId: "" }, "", "replace");
    render();
    const nextControl = root.querySelector(`[data-filter="${control.dataset.filter}"]`);
    nextControl?.focus({ preventScroll: true });
    if (nextControl?.setSelectionRange && selectionStart !== null && selectionEnd !== null) {
      nextControl.setSelectionRange(selectionStart, selectionEnd);
    }
  });

  root.addEventListener("change", (event) => {
    const control = event.target.closest("select[data-filter]");
    if (!control) return;
    state.filtersExpanded = true;
    state.filters[control.dataset.filter] = control.value;
    activateContext({ view: "all", routineId: "" }, "", "replace");
    render();
    root.querySelector(`[data-filter="${control.dataset.filter}"]`)?.focus({ preventScroll: true });
  });

  sidebarContent?.addEventListener("click", (event) => {
    const modeButton = event.target.closest("[data-sidebar-mode]");
    if (modeButton) {
      state.sidebarMode = modeButton.dataset.sidebarMode;
      renderSidebar();
      sidebarContent.querySelector(`[data-sidebar-mode="${state.sidebarMode}"]`)?.focus();
      return;
    }
    const jumpButton = event.target.closest("[data-question-jump]");
    if (jumpButton) {
      navigateQuestion(jumpButton.dataset.questionJump);
      return;
    }
    const resetButton = event.target.closest("[data-practice-reset]");
    if (!resetButton || resetButton.disabled) return;
    if (resetDialog?.showModal) resetDialog.showModal();
    else if (window.confirm("모든 질문의 연습 횟수를 초기화할까요?")) resetPracticeCounts();
  });

  sidebarContent?.addEventListener("input", (event) => {
    if (event.target.id !== "sidebar-question-search") return;
    state.sidebarSearch = event.target.value;
    updateSidebarSearchResults();
  });

  sidebarOpenButton?.addEventListener("click", openSidebar);
  sidebarCloseButton?.addEventListener("click", () => closeSidebar());
  sidebarBackdrop?.addEventListener("click", () => closeSidebar());
  sidebar?.addEventListener("keydown", trapSidebarFocus);
  resetConfirmButton?.addEventListener("click", resetPracticeCounts);

  window.matchMedia("(min-width: 981px)").addEventListener("change", (event) => {
    if (event.matches) closeSidebar({ restoreFocus: false });
  });

  window.addEventListener("popstate", () => {
    const directState = readUrlState();
    if (!directState) return;
    activateContext(directState.context, directState.questionId, null, directState.filters);
    render();
    focusActiveQuestion();
  });

  // 데이터 검증과 최초 화면 복원
  const duplicateIds = questions
    .map((question) => question.id)
    .filter((id, index, ids) => ids.indexOf(id) !== index);
  if (duplicateIds.length) {
    root.innerHTML = `<p class="notice notice-warning">중복 질문 ID가 발견되었습니다: ${escapeHtml(unique(duplicateIds).join(", "))}</p>`;
    return;
  }

  const orphanGuideIds = guideQuestionIds.filter((id) => !validQuestionIds.has(id));
  if (orphanGuideIds.length) {
    root.innerHTML = `<p class="notice notice-warning">연결할 질문이 없는 가이드 답변이 발견되었습니다: ${escapeHtml(orphanGuideIds.join(", "))}</p>`;
    return;
  }

  if (summary) {
    summary.textContent = `질문 ${questions.length}개 · 가이드 반영 ${guideQuestionIds.length}개 · 확인 필요 ${questions.filter(hasWarning).length}개 · 최신 이력서 ${CATALOG_VERSION} 기준`;
  }

  const storedSession = loadSession();
  const directState = readUrlState();
  if (directState) {
    state.session = storedSession;
    activateContext(directState.context, directState.questionId, null, directState.filters);
  } else if (storedSession) {
    applySession(storedSession);
  } else {
    activateContext({ view: "difficulty", routineId: state.selectedRoutine.difficulty }, "", null);
  }
  syncUrl("replace");
  render();
})();
