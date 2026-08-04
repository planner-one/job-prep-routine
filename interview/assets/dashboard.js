(() => {
  "use strict";

  const PRIVATE_BUILD_CANARY = "INTERVIEW_DASHBOARD_LOCAL_CANARY_20260803";
  const PRACTICE_STORAGE_KEY = "interview-prep.practice-counts.v1";
  void PRIVATE_BUILD_CANARY;

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
  const questions = Object.values(dataGroups)
    .filter(Array.isArray)
    .flat()
    .filter((question) => question && question.id && question.question);
  const validQuestionIds = new Set(questions.map((question) => question.id));

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

  const normalizeStage = (stage) => String(stage || "").replace(/^\d+\.\s*/, "");

  let practiceStorageAvailable = true;
  let sidebarReturnFocus = null;
  let highlightTimer = 0;
  let sidebarPracticeScopes = new Map();
  let sidebarScopeSequence = 0;

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
      if (raw === null) {
        window.localStorage.setItem(PRACTICE_STORAGE_KEY, JSON.stringify({ version: 1, counts: {} }));
        return {};
      }

      let parsed;
      try {
        parsed = JSON.parse(raw);
      } catch {
        window.localStorage.setItem(PRACTICE_STORAGE_KEY, JSON.stringify({ version: 1, counts: {} }));
        return {};
      }

      const counts = parsed?.version === 1 ? sanitizePracticeCounts(parsed.counts) : {};
      window.localStorage.setItem(PRACTICE_STORAGE_KEY, JSON.stringify({ version: 1, counts }));
      return counts;
    } catch {
      practiceStorageAvailable = false;
      return {};
    }
  };

  const state = {
    view: "emphasis",
    selectedRoutine: {
      emphasis: routineData.emphasis?.[0]?.id || "",
      difficulty: routineData.difficulty?.[0]?.id || "",
    },
    filters: {
      search: "",
      category: "all",
      project: "all",
      evidence: "all",
      stage: "all",
    },
    sidebarMode: "category",
    sidebarSearch: "",
    visibleQuestions: [],
    practiceCounts: loadPracticeCounts(),
  };

  const escapeHtml = (value = "") =>
    String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");

  const unique = (items) => [...new Set(items.filter(Boolean))];

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

  const hasWarning = (question) =>
    Boolean(question.warnings?.length) || question.evidence?.status === "지원자 확인 필요";

  const getPracticeCount = (questionId) => state.practiceCounts[questionId] || 0;

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

  const renderQuestionCard = (question, options = {}) => {
    const answer = question.answer || {};
    const evidence = question.evidence || {};
    const followups = question.followups || [];
    const keywords = answer.keywords || [];
    const sources = evidence.sources || [];
    const cardClasses = hasWarning(question) ? "question-card has-warning" : "question-card";
    const ordinal = options.ordinal ? `<span class="badge">Q${options.ordinal}</span>` : "";
    const practiceCount = getPracticeCount(question.id);

    return `
      <article class="${cardClasses}" id="question-${escapeHtml(question.id)}" tabindex="-1" data-question-card="${escapeHtml(question.id)}" aria-labelledby="question-title-${escapeHtml(question.id)}">
        <div class="card-meta">
          ${ordinal}
          <span class="badge badge-project">${escapeHtml(question.project || question.category)}</span>
          <span class="badge">${escapeHtml(question.topic)}</span>
          <span class="badge">${escapeHtml(normalizeStage(question.stage))}</span>
          <span class="badge ${evidenceClass(evidence.status)}">${escapeHtml(evidence.status || "근거 미분류")}</span>
          ${question.minutes ? `<span class="badge">약 ${escapeHtml(question.minutes)}분</span>` : ""}
        </div>
        <h4 id="question-title-${escapeHtml(question.id)}">${escapeHtml(question.question)}</h4>
        <div class="practice-row" aria-label="질문 연습 횟수">
          <span class="practice-count">연습 <strong data-practice-count="${escapeHtml(question.id)}">${practiceCount}</strong>회</span>
          <div class="practice-actions">
            <button
              class="practice-button is-complete"
              type="button"
              data-practice-action="increment"
              data-question-id="${escapeHtml(question.id)}"
              aria-label="${escapeHtml(question.question)} 답변 완료 1회 추가"
            >이번 답변 완료 <span aria-hidden="true">+1</span></button>
            <button
              class="practice-button"
              type="button"
              data-practice-action="decrement"
              data-question-id="${escapeHtml(question.id)}"
              aria-label="${escapeHtml(question.question)} 연습 횟수 1회 되돌리기"
              ${practiceCount === 0 ? "disabled" : ""}
            >되돌리기</button>
          </div>
        </div>
        ${renderWarnings(question)}
        <div class="answer-grid">
          <div class="answer-block is-conclusion">
            <p class="answer-label">두괄식 결론</p>
            <p>${escapeHtml(answer.conclusion || "답변 준비 중")}</p>
          </div>
          <div class="answer-block">
            <p class="answer-label">근거 1</p>
            <p>${escapeHtml(answer.evidence1 || "근거 확인 필요")}</p>
          </div>
          <div class="answer-block">
            <p class="answer-label">근거 2</p>
            <p>${escapeHtml(answer.evidence2 || "근거 확인 필요")}</p>
          </div>
        </div>
        ${keywords.length ? `<ul class="keywords" aria-label="핵심 키워드">${keywords.map((keyword) => `<li>${escapeHtml(keyword)}</li>`).join("")}</ul>` : ""}
        ${answer.caution ? `<p class="caution"><strong>말할 때 주의:</strong> ${escapeHtml(answer.caution)}</p>` : ""}
        <details>
          <summary>꼬리질문과 방어 포인트 ${followups.length ? `(${followups.length})` : ""}</summary>
          ${followups.length ? `
            <ul class="followup-list">
              ${followups.map((followup) => `
                <li>
                  <span class="followup-type">${escapeHtml(followup.type)}</span>
                  <div>
                    <p class="followup-question"><strong>${escapeHtml(followup.question)}</strong></p>
                    <p class="followup-defense">${escapeHtml(followup.defense)}</p>
                  </div>
                </li>
              `).join("")}
            </ul>
          ` : `<p class="evidence-note">추가 꼬리질문을 준비 중입니다.</p>`}
        </details>
        <details>
          <summary>근거 상태와 출처</summary>
          <p class="evidence-note">${escapeHtml(evidence.note || "근거 설명을 준비 중입니다.")}</p>
          ${sources.length ? `<ul class="sources">${sources.map((source) => `<li>${escapeHtml(source)}</li>`).join("")}</ul>` : ""}
        </details>
      </article>
    `;
  };

  const selectSectionQuestions = (section, seenIds) => {
    const allMatches = sortQuestions(questions.filter((question) => matchesQuery(question, section.query)));
    let matches = allMatches.filter((question) => !seenIds.has(question.id));
    if (!matches.length) matches = allMatches;
    const selected = matches.slice(0, section.limit || matches.length);
    selected.forEach((question) => seenIds.add(question.id));
    return selected;
  };

  const renderSchedule = (routine) => `
    <div class="schedule" aria-label="120분 시간 구성">
      ${routine.sections.map((section) => `
        <div class="schedule-item">
          <strong>${escapeHtml(section.title)}</strong>
          <span>${section.minutes}분</span>
        </div>
      `).join("")}
    </div>
  `;

  const renderRoutineContent = (routine) => {
    const seenIds = new Set();
    const visibleQuestions = [];
    let ordinal = 0;
    const totalMinutes = routine.sections.reduce((sum, section) => sum + section.minutes, 0);
    const sectionsHtml = routine.sections.map((section) => {
      const selected = selectSectionQuestions(section, seenIds);
      const cards = selected.map((question) => {
        ordinal += 1;
        if (!visibleQuestions.some((item) => item.id === question.id)) visibleQuestions.push(question);
        return renderQuestionCard(question, { ordinal });
      }).join("");
      return `
        <section class="routine-section">
          <div class="routine-section-heading">
            <h3>${escapeHtml(section.title)}</h3>
            <span>권장 ${section.minutes}분 · ${selected.length}문항</span>
          </div>
          ${cards ? `<div class="question-list">${cards}</div>` : `<p class="empty-state">이 구간의 질문 데이터를 준비 중입니다.</p>`}
        </section>
      `;
    }).join("");

    state.visibleQuestions = visibleQuestions;

    return `
      <div class="routine-header">
        <div>
          <p class="section-kicker">SELECTED ROUTINE</p>
          <h3>${escapeHtml(routine.title)}</h3>
          <p>${escapeHtml(routine.summary)}</p>
        </div>
        <div class="total-time">
          <strong>${totalMinutes}분</strong>
          <span>권장 복습 시간</span>
        </div>
      </div>
      ${renderSchedule(routine)}
      ${sectionsHtml}
    `;
  };

  const routineIntro = {
    emphasis: {
      kicker: "FOCUS ROUTINES",
      title: "강조점에 따라 고르는 120분",
      description: "모든 루틴에 공통·인성과 이력서 기술을 함께 넣고, 면접 성격에 따라 비중만 바꿨습니다.",
    },
    difficulty: {
      kicker: "DEPTH ROUTINES",
      title: "기초부터 압박까지 4단계",
      description: "사용 경험과 개념 확인에서 시작해 구현, 검증, 장애와 대안까지 단계적으로 깊어집니다.",
    },
  };

  const renderRoutineView = (mode) => {
    const routines = routineData[mode] || [];
    const selectedId = state.selectedRoutine[mode];
    const selected = routines.find((routine) => routine.id === selectedId) || routines[0];
    const intro = routineIntro[mode];
    if (!selected) state.visibleQuestions = [];

    root.innerHTML = `
      <section>
        <p class="section-kicker">${intro.kicker}</p>
        <h2 class="section-title">${intro.title}</h2>
        <p class="section-description">${intro.description}</p>
        <div class="routine-choices" role="group" aria-label="루틴 선택">
          ${routines.map((routine) => `
            <button type="button" class="choice-button ${routine.id === selected?.id ? "is-active" : ""}" data-routine-id="${escapeHtml(routine.id)}" aria-pressed="${routine.id === selected?.id}">
              <strong>${escapeHtml(routine.title)}</strong>
              <span>${escapeHtml(routine.summary)}</span>
            </button>
          `).join("")}
        </div>
        ${selected ? renderRoutineContent(selected) : `<p class="empty-state">루틴 데이터를 준비 중입니다.</p>`}
      </section>
    `;

    root.querySelectorAll("[data-routine-id]").forEach((button) => {
      button.addEventListener("click", () => {
        state.selectedRoutine[mode] = button.dataset.routineId;
        render();
      });
    });
  };

  const renderCompactView = () => {
    const compact = routineData.compact;
    if (!compact) state.visibleQuestions = [];
    root.innerHTML = `
      <section>
        <p class="section-kicker">LAST-MINUTE REVIEW</p>
        <h2 class="section-title">면접 직전 2시간 압축 복습</h2>
        <p class="section-description">자기소개부터 위험 표현까지 순서대로 읽으면 정확히 120분이 되도록 구성했습니다.</p>
        ${compact ? renderRoutineContent(compact) : `<p class="empty-state">압축 복습 데이터를 준비 중입니다.</p>`}
      </section>
    `;
  };

  const optionMarkup = (values, selected, allLabel) => `
    <option value="all">${allLabel}</option>
    ${values.map((value) => `<option value="${escapeHtml(value)}" ${value === selected ? "selected" : ""}>${escapeHtml(value)}</option>`).join("")}
  `;

  const filterQuestions = () => {
    const { search, category, project, evidence, stage } = state.filters;
    const normalizedSearch = search.trim().toLocaleLowerCase("ko");
    return sortQuestions(questions.filter((question) => {
      if (category !== "all" && question.category !== category) return false;
      if (project !== "all" && question.project !== project) return false;
      if (evidence !== "all" && question.evidence?.status !== evidence) return false;
      if (stage !== "all" && normalizeStage(question.stage) !== stage) return false;
      if (!normalizedSearch) return true;
      const haystack = [
        question.question,
        question.topic,
        question.project,
        question.answer?.conclusion,
        ...(question.answer?.keywords || []),
        ...(question.tags || []),
      ].join(" ").toLocaleLowerCase("ko");
      return haystack.includes(normalizedSearch);
    }));
  };

  const attachFilterListeners = () => {
    root.querySelectorAll("[data-filter]").forEach((control) => {
      const eventName = control.tagName === "INPUT" ? "input" : "change";
      control.addEventListener(eventName, () => {
        const filterName = control.dataset.filter;
        const selectionStart = control.selectionStart;
        const selectionEnd = control.selectionEnd;
        state.filters[filterName] = control.value;
        render();
        const nextControl = root.querySelector(`[data-filter="${filterName}"]`);
        nextControl?.focus({ preventScroll: true });
        if (nextControl?.setSelectionRange && selectionStart !== null && selectionEnd !== null) {
          nextControl.setSelectionRange(selectionStart, selectionEnd);
        }
      });
    });
  };

  const renderAllQuestions = () => {
    const categories = unique(questions.map((question) => question.category)).sort((a, b) => a.localeCompare(b, "ko"));
    const projects = unique(questions.map((question) => question.project)).sort((a, b) => a.localeCompare(b, "ko"));
    const evidenceStatuses = unique(questions.map((question) => question.evidence?.status));
    const stages = unique(questions.map((question) => normalizeStage(question.stage))).sort((a, b) => stageOrder.indexOf(a) - stageOrder.indexOf(b));
    const filtered = filterQuestions();
    state.visibleQuestions = filtered;

    root.innerHTML = `
      <section>
        <p class="section-kicker">QUESTION BANK</p>
        <h2 class="section-title">전체 질문</h2>
        <p class="section-description">질문은 한 번만 관리하며 여러 루틴에서 같은 답변을 참조합니다. 검색과 분류는 현재 화면에만 적용되고 저장되지 않습니다.</p>
        <div class="toolbar">
          <label>검색
            <input type="search" data-filter="search" value="${escapeHtml(state.filters.search)}" placeholder="Redis, 트랜잭션, 갈등…" />
          </label>
          <label>분야
            <select data-filter="category">${optionMarkup(categories, state.filters.category, "전체 분야")}</select>
          </label>
          <label>프로젝트
            <select data-filter="project">${optionMarkup(projects, state.filters.project, "전체 프로젝트")}</select>
          </label>
          <label>근거 상태
            <select data-filter="evidence">${optionMarkup(evidenceStatuses, state.filters.evidence, "전체 상태")}</select>
          </label>
          <label>질문 단계
            <select data-filter="stage">${optionMarkup(stages, state.filters.stage, "전체 단계")}</select>
          </label>
        </div>
        <p class="result-count">전체 ${questions.length}문항 중 ${filtered.length}문항</p>
        ${filtered.length ? `<div class="question-list">${filtered.map((question, index) => renderQuestionCard(question, { ordinal: index + 1 })).join("")}</div>` : `<p class="empty-state">조건에 맞는 질문이 없습니다.</p>`}
      </section>
    `;
    attachFilterListeners();
  };

  const renderWarningsView = () => {
    const warningQuestions = sortQuestions(questions.filter(hasWarning));
    state.visibleQuestions = warningQuestions;
    const counts = questions.reduce((accumulator, question) => {
      const status = question.evidence?.status || "미분류";
      accumulator[status] = (accumulator[status] || 0) + 1;
      return accumulator;
    }, {});

    root.innerHTML = `
      <section>
        <p class="section-kicker">EVIDENCE CHECK</p>
        <h2 class="section-title">확인하고 말해야 할 주장</h2>
        <p class="section-description">루틴에는 포함하지만, 아래 질문은 경고를 읽고 안전한 범위까지만 답합니다. 코드나 원본 측정 자료가 없는 내용은 실제 성과로 단정하지 않습니다.</p>
        <div class="risk-summary">
          <div class="risk-stat is-confirmed"><strong>${counts["확인됨"] || 0}</strong><span>코드·테스트 확인</span></div>
          <div class="risk-stat"><strong>${counts["문서 근거"] || 0}</strong><span>Wiki·README·스크린샷</span></div>
          <div class="risk-stat is-warning"><strong>${counts["지원자 확인 필요"] || 0}</strong><span>본인 재확인 필요</span></div>
          <div class="risk-stat"><strong>${counts["일반론"] || 0}</strong><span>경험이 아닌 개념</span></div>
        </div>
        <p class="result-count">경고가 있는 질문 ${warningQuestions.length}문항</p>
        ${warningQuestions.length ? `<div class="question-list">${warningQuestions.map((question, index) => renderQuestionCard(question, { ordinal: index + 1 })).join("")}</div>` : `<p class="empty-state">현재 경고 질문이 없습니다.</p>`}
      </section>
    `;
  };

  const uniqueQuestionsById = (items) => {
    const seen = new Set();
    return items.filter((question) => {
      if (seen.has(question.id)) return false;
      seen.add(question.id);
      return true;
    });
  };

  const summarizePractice = (items) => {
    const scopedQuestions = uniqueQuestionsById(items);
    return scopedQuestions.reduce((result, question) => {
      const count = getPracticeCount(question.id);
      result.total += 1;
      result.attempts += count;
      if (count > 0) result.practiced += 1;
      return result;
    }, { practiced: 0, total: 0, attempts: 0 });
  };

  const registerSidebarScope = (items) => {
    const key = `scope-${sidebarScopeSequence += 1}`;
    sidebarPracticeScopes.set(key, uniqueQuestionsById(items).map((question) => question.id));
    return key;
  };

  const practiceSummaryText = (items) => {
    const result = summarizePractice(items);
    return `${result.practiced}/${result.total} · ${result.attempts}회`;
  };

  const renderSidebarProgress = (items) => {
    const key = registerSidebarScope(items);
    return `<span class="sidebar-progress" data-practice-summary-key="${key}">${practiceSummaryText(items)}</span>`;
  };

  const renderSidebarQuestionLink = (question) => `
    <li class="sidebar-question-item" data-sidebar-question-search="${escapeHtml([
      question.question,
      question.category,
      question.project,
      question.topic,
    ].join(" ").toLocaleLowerCase("ko"))}">
      <button class="sidebar-question-link" type="button" data-question-jump="${escapeHtml(question.id)}">
        <span class="sidebar-question-copy">${escapeHtml(question.question)}</span>
        <span class="sidebar-count"><span data-practice-count="${escapeHtml(question.id)}">${getPracticeCount(question.id)}</span>회</span>
      </button>
    </li>
  `;

  const categoryOrder = ["공통·인성", "경험", "이력서 기술", "필수 CS"];

  const renderCategorySidebar = (items) => {
    const categories = new Map();
    uniqueQuestionsById(items).forEach((question) => {
      if (!categories.has(question.category)) categories.set(question.category, []);
      categories.get(question.category).push(question);
    });

    const orderedCategories = [...categories.entries()].sort(([a], [b]) => {
      const aIndex = categoryOrder.indexOf(a);
      const bIndex = categoryOrder.indexOf(b);
      if (aIndex >= 0 || bIndex >= 0) return (aIndex < 0 ? 99 : aIndex) - (bIndex < 0 ? 99 : bIndex);
      return a.localeCompare(b, "ko");
    });

    return orderedCategories.map(([category, categoryQuestions]) => {
      const projects = new Map();
      categoryQuestions.forEach((question) => {
        if (!projects.has(question.project)) projects.set(question.project, []);
        projects.get(question.project).push(question);
      });

      const projectMarkup = [...projects.entries()].map(([project, projectQuestions]) => `
        <details class="sidebar-project" open>
          <summary>
            <span>${escapeHtml(project)}</span>
            ${renderSidebarProgress(projectQuestions)}
          </summary>
          <ul class="sidebar-question-list">
            ${projectQuestions.map(renderSidebarQuestionLink).join("")}
          </ul>
        </details>
      `).join("");

      return `
        <details class="sidebar-category" open>
          <summary>
            <span>${escapeHtml(category)}</span>
            ${renderSidebarProgress(categoryQuestions)}
          </summary>
          <div class="sidebar-project-list">${projectMarkup}</div>
        </details>
      `;
    }).join("");
  };

  const renderQuestionSidebar = (items) => `
    <label class="sidebar-search-label" for="sidebar-question-search">현재 목록 검색</label>
    <input
      id="sidebar-question-search"
      class="sidebar-search"
      type="search"
      value="${escapeHtml(state.sidebarSearch)}"
      placeholder="질문, 프로젝트, 기술…"
      autocomplete="off"
    />
    <p id="sidebar-search-result" class="sidebar-search-result"></p>
    <ul class="sidebar-question-list is-flat">
      ${uniqueQuestionsById(items).map(renderSidebarQuestionLink).join("")}
    </ul>
  `;

  const renderSidebar = () => {
    if (!sidebarContent) return;
    const visibleQuestions = uniqueQuestionsById(state.visibleQuestions);
    const scopeSummary = summarizePractice(visibleQuestions);
    const allAttempts = Object.values(state.practiceCounts).reduce((sum, count) => sum + count, 0);
    sidebarPracticeScopes = new Map();
    sidebarScopeSequence = 0;

    sidebarContent.innerHTML = `
      <div class="sidebar-heading">
        <p class="section-kicker">CURRENT QUESTIONS</p>
        <h2>현재 화면 질문</h2>
        <p class="sidebar-overview">
          연습한 질문 <strong data-sidebar-practiced>${scopeSummary.practiced}</strong>/<span data-sidebar-total>${scopeSummary.total}</span>
          · 총 답변 <strong data-sidebar-attempts>${scopeSummary.attempts}</strong>회
        </p>
      </div>
      ${practiceStorageAvailable ? "" : `<p class="storage-warning" role="status"><strong>임시 저장 중</strong> 브라우저 저장을 사용할 수 없어 새로고침하면 횟수가 사라집니다.</p>`}
      <div class="sidebar-mode-tabs" role="group" aria-label="질문 목록 분류 방식">
        <button class="sidebar-mode-button ${state.sidebarMode === "category" ? "is-active" : ""}" type="button" data-sidebar-mode="category" aria-pressed="${state.sidebarMode === "category"}">카테고리별</button>
        <button class="sidebar-mode-button ${state.sidebarMode === "question" ? "is-active" : ""}" type="button" data-sidebar-mode="question" aria-pressed="${state.sidebarMode === "question"}">질문별</button>
      </div>
      <div class="sidebar-scroll-area">
        ${visibleQuestions.length
          ? state.sidebarMode === "category"
            ? renderCategorySidebar(visibleQuestions)
            : renderQuestionSidebar(visibleQuestions)
          : `<p class="sidebar-empty">현재 화면에 표시할 질문이 없습니다.</p>`}
      </div>
      <div class="sidebar-footer">
        <p>전체 질문 누적 ${allAttempts}회</p>
        <button class="reset-practice-button" type="button" data-practice-reset ${allAttempts === 0 ? "disabled" : ""}>모든 횟수 초기화</button>
      </div>
    `;

    updateSidebarSearchResults();
  };

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

  const updateSidebarPracticeSummaries = () => {
    if (!sidebarContent) return;
    const visibleSummary = summarizePractice(state.visibleQuestions);
    const practiced = sidebarContent.querySelector("[data-sidebar-practiced]");
    const total = sidebarContent.querySelector("[data-sidebar-total]");
    const attempts = sidebarContent.querySelector("[data-sidebar-attempts]");
    if (practiced) practiced.textContent = String(visibleSummary.practiced);
    if (total) total.textContent = String(visibleSummary.total);
    if (attempts) attempts.textContent = String(visibleSummary.attempts);

    sidebarContent.querySelectorAll("[data-practice-summary-key]").forEach((element) => {
      const ids = sidebarPracticeScopes.get(element.dataset.practiceSummaryKey) || [];
      const scopedQuestions = ids.map((id) => questions.find((question) => question.id === id)).filter(Boolean);
      element.textContent = practiceSummaryText(scopedQuestions);
    });

    const allAttempts = Object.values(state.practiceCounts).reduce((sum, count) => sum + count, 0);
    const footerText = sidebarContent.querySelector(".sidebar-footer p");
    const resetButton = sidebarContent.querySelector("[data-practice-reset]");
    if (footerText) footerText.textContent = `전체 질문 누적 ${allAttempts}회`;
    if (resetButton) resetButton.disabled = allAttempts === 0;
  };

  const updateQuestionPracticeNodes = (questionId) => {
    const count = getPracticeCount(questionId);
    document.querySelectorAll("[data-practice-count]").forEach((element) => {
      if (element.dataset.practiceCount === questionId) element.textContent = String(count);
    });
    document.querySelectorAll('[data-practice-action="decrement"]').forEach((button) => {
      if (button.dataset.questionId === questionId) button.disabled = count === 0;
    });
    updateSidebarPracticeSummaries();
  };

  const announcePracticeCount = (questionId) => {
    if (!practiceStatus) return;
    const question = questions.find((item) => item.id === questionId);
    practiceStatus.textContent = `${question?.question || questionId}, 연습 ${getPracticeCount(questionId)}회`;
  };

  const changePracticeCount = (questionId, delta) => {
    if (!validQuestionIds.has(questionId)) return;
    const current = getPracticeCount(questionId);
    const next = delta > 0
      ? Math.min(Number.MAX_SAFE_INTEGER, current + 1)
      : Math.max(0, current - 1);
    if (next === current) return;

    if (next > 0) state.practiceCounts[questionId] = next;
    else delete state.practiceCounts[questionId];

    const wasStorageAvailable = practiceStorageAvailable;
    writePracticeCounts(state.practiceCounts);
    updateQuestionPracticeNodes(questionId);
    announcePracticeCount(questionId);
    if (wasStorageAvailable && !practiceStorageAvailable) renderSidebar();
  };

  const resetPracticeCounts = () => {
    state.practiceCounts = {};
    writePracticeCounts(state.practiceCounts);
    document.querySelectorAll("[data-practice-count]").forEach((element) => {
      element.textContent = "0";
    });
    document.querySelectorAll('[data-practice-action="decrement"]').forEach((button) => {
      button.disabled = true;
    });
    updateSidebarPracticeSummaries();
    if (practiceStatus) practiceStatus.textContent = "모든 질문의 연습 횟수를 초기화했습니다.";
    if (!practiceStorageAvailable) renderSidebar();
  };

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
    sidebarReturnFocus = document.activeElement;
    sidebar.classList.add("is-open");
    sidebarOpenButton?.setAttribute("aria-expanded", "true");
    if (sidebarBackdrop) sidebarBackdrop.hidden = false;
    document.body.classList.add("has-open-sidebar");
    window.requestAnimationFrame(() => sidebarCloseButton?.focus());
  };

  const jumpToQuestion = (questionId) => {
    const card = root.querySelector(`[data-question-card="${questionId}"]`);
    if (!card) return;
    closeSidebar({ restoreFocus: false });
    document.querySelectorAll("[data-question-jump]").forEach((button) => {
      button.classList.toggle("is-current", button.dataset.questionJump === questionId);
    });
    window.requestAnimationFrame(() => {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      card.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
      card.focus({ preventScroll: true });
      root.querySelectorAll(".is-jump-highlight").forEach((element) => element.classList.remove("is-jump-highlight"));
      card.classList.add("is-jump-highlight");
      window.clearTimeout(highlightTimer);
      highlightTimer = window.setTimeout(() => card.classList.remove("is-jump-highlight"), 1600);
    });
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

  const updateNavigation = () => {
    navButtons.forEach((button) => {
      const isActive = button.dataset.view === state.view;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });
  };

  const render = () => {
    updateNavigation();
    if (state.view === "emphasis" || state.view === "difficulty") renderRoutineView(state.view);
    else if (state.view === "compact") renderCompactView();
    else if (state.view === "all") renderAllQuestions();
    else if (state.view === "warnings") renderWarningsView();
    renderSidebar();
  };

  navButtons.forEach((button) => {
    button.addEventListener("click", () => {
      closeSidebar({ restoreFocus: false });
      state.view = button.dataset.view;
      render();
      document.getElementById("main-content")?.focus({ preventScroll: true });
    });
  });

  root.addEventListener("click", (event) => {
    const button = event.target.closest("[data-practice-action]");
    if (!button || !root.contains(button)) return;
    changePracticeCount(button.dataset.questionId, button.dataset.practiceAction === "increment" ? 1 : -1);
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
      jumpToQuestion(jumpButton.dataset.questionJump);
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

  const duplicateIds = questions
    .map((question) => question.id)
    .filter((id, index, ids) => ids.indexOf(id) !== index);

  if (duplicateIds.length) {
    root.innerHTML = `<p class="notice notice-warning">중복 질문 ID가 발견되었습니다: ${escapeHtml(unique(duplicateIds).join(", "))}</p>`;
    return;
  }

  if (summary) {
    summary.textContent = `질문 ${questions.length}개 · 경고 ${questions.filter(hasWarning).length}개 · 최신 이력서 v5_3 기준`;
  }

  render();
})();
