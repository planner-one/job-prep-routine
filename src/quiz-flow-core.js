import {
  QUIZ_MAX_QUESTIONS,
  QUIZ_STAGE_SIZE,
  logicalQuizDate,
  selectQuizQuestions,
} from './quiz-core.js?v=8';

export const QUIZ_FLOW_SESSION_VERSION = 2;
export const QUIZ_FLOW_STATUSES = Object.freeze([
  'in-progress',
  'round-one-summary',
  'round-two',
  'review-pending',
  'completed',
]);

const STATUS_SET = new Set(QUIZ_FLOW_STATUSES);

function isObject(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function timestamp(now = new Date()) {
  const date = now instanceof Date ? now : new Date(now);
  if (Number.isNaN(date.getTime())) throw new RangeError('유효한 시각이 필요합니다.');
  return date.toISOString();
}

function lookup(questions) {
  return questions instanceof Map
    ? questions
    : new Map((Array.isArray(questions) ? questions : []).map((question) => [question.id, question]));
}

function followUpsFor(mainId, questions) {
  return [...lookup(questions).values()]
    .filter((question) => question.kind === 'follow-up' && question.followUpOf === mainId)
    .sort((left, right) => left.followUpOrder - right.followUpOrder);
}

function changed(session, patch, now) {
  return { ...session, ...patch, updatedAt: timestamp(now) };
}

function answerRecord(question, selectedIndex, now) {
  return {
    selectedIndex,
    correctIndex: question.correctIndex,
    isCorrect: selectedIndex === question.correctIndex,
    answeredAt: timestamp(now),
  };
}

function mainRound(session, mainIndex = session.cursor.mainIndex) {
  return mainIndex < QUIZ_STAGE_SIZE ? 1 : 2;
}

function roundLimit(session) {
  return session.secondRoundStarted
    ? Math.min(QUIZ_MAX_QUESTIONS, session.mainQuestionIds.length)
    : Math.min(QUIZ_STAGE_SIZE, session.mainQuestionIds.length);
}

export function getActiveFollowUpIds(session, mainId, questions) {
  const tails = session.followUpIdsByMain?.[mainId] ?? followUpsFor(mainId, questions).map(({ id }) => id);
  const core = tails.slice(0, 2);
  const mainWrong = session.answers?.[mainId]?.isCorrect === false;
  const coreWrong = core.some((id) => session.answers?.[id]?.isCorrect === false);
  return mainWrong || coreWrong ? tails.slice(0, 3) : core;
}

export function createQuizFlowSession(questions, options = {}) {
  if (typeof options.primarySourceId !== 'string' || !options.primarySourceId.trim()) {
    throw new RangeError('기준이 될 원문 ID가 필요합니다.');
  }
  const now = options.now ?? new Date();
  const date = options.date ?? logicalQuizDate(now);
  const selected = selectQuizQuestions(questions, {
    ...options,
    date,
    limit: QUIZ_MAX_QUESTIONS,
  });
  if (selected.length < QUIZ_STAGE_SIZE) throw new RangeError('첫 라운드에 필요한 검증 문항이 부족합니다.');
  const mainQuestionIds = selected.map(({ id }) => id);
  const followUpIdsByMain = Object.fromEntries(mainQuestionIds.map((mainId) => {
    const ids = followUpsFor(mainId, questions).map(({ id }) => id);
    if (ids.length !== 3) throw new RangeError(`${mainId}: 꼬리 문제 3개가 필요합니다.`);
    return [mainId, ids];
  }));
  const startedAt = timestamp(now);
  return {
    version: QUIZ_FLOW_SESSION_VERSION,
    id: options.id ?? `quiz-v2-${date}-${options.primarySourceId}-${new Date(now).getTime()}`,
    date,
    primarySourceId: options.primarySourceId.trim(),
    categoryId: options.categoryId ?? selected[0]?.categoryId ?? '',
    mainQuestionIds,
    followUpIdsByMain,
    cursor: { round: 1, mainIndex: 0, itemKind: 'main', followUpIndex: null },
    answers: {},
    deferredFollowUpIds: [],
    secondRoundStarted: false,
    roundOneCompleted: false,
    mainCompleted: false,
    fullyCompleted: false,
    status: 'in-progress',
    startedAt,
    updatedAt: startedAt,
    completedAt: null,
    migratedFromV1: false,
  };
}

export function currentQuizFlowItem(session, questions) {
  const mainId = session.mainQuestionIds[session.cursor.mainIndex] ?? null;
  if (!mainId) return { mainId: null, questionId: null, kind: null };
  if (session.cursor.itemKind === 'follow-up') {
    const ids = getActiveFollowUpIds(session, mainId, questions);
    return {
      mainId,
      questionId: ids[session.cursor.followUpIndex ?? 0] ?? mainId,
      kind: ids[session.cursor.followUpIndex ?? 0] ? 'follow-up' : 'main',
    };
  }
  return { mainId, questionId: mainId, kind: 'main' };
}

export function answerQuizFlowQuestion(session, questionId, selectedIndex, questions, now = new Date()) {
  if (!Number.isInteger(selectedIndex) || selectedIndex < 0 || selectedIndex > 3) {
    throw new RangeError('선택지 번호는 0부터 3 사이여야 합니다.');
  }
  const current = currentQuizFlowItem(session, questions);
  if (current.questionId !== questionId) throw new RangeError('현재 표시된 문제만 답할 수 있습니다.');
  if (session.answers?.[questionId]) throw new RangeError('이미 확정한 답은 변경할 수 없습니다.');
  const question = lookup(questions).get(questionId);
  if (!question) throw new RangeError('문항을 찾을 수 없습니다.');
  const answers = { ...session.answers, [questionId]: answerRecord(question, selectedIndex, now) };
  const deferredFollowUpIds = session.deferredFollowUpIds.filter((id) => id !== questionId);
  let cursor = session.cursor;
  if (current.kind === 'main') {
    cursor = { ...cursor, itemKind: 'follow-up', followUpIndex: 0 };
  } else {
    const projected = { ...session, answers };
    const active = getActiveFollowUpIds(projected, current.mainId, questions);
    const nextIndex = active.findIndex((id, index) => index > session.cursor.followUpIndex
      && !answers[id]
      && !deferredFollowUpIds.includes(id));
    if (nextIndex >= 0) cursor = { ...cursor, followUpIndex: nextIndex };
  }
  const projected = { ...session, answers, deferredFollowUpIds };
  const completedAfterReview = session.mainCompleted
    && deferredFollowUpIds.length === 0
    && session.mainQuestionIds.slice(0, roundLimit(session)).every((id) => (
      getActiveFollowUpIds(projected, id, questions).every((tailId) => answers[tailId])
    ));
  return changed(session, {
    answers,
    deferredFollowUpIds,
    cursor,
    ...(completedAfterReview ? {
      status: session.secondRoundStarted ? 'completed' : session.status,
      fullyCompleted: true,
      completedAt: timestamp(now),
    } : {}),
  }, now);
}

export function deferQuizFlowQuestion(session, questionId, questions, now = new Date()) {
  const current = currentQuizFlowItem(session, questions);
  if (current.kind !== 'follow-up' || current.questionId !== questionId) {
    throw new RangeError('현재 꼬리 문제만 보류할 수 있습니다.');
  }
  const deferredFollowUpIds = [...new Set([...session.deferredFollowUpIds, questionId])];
  const active = getActiveFollowUpIds(session, current.mainId, questions);
  const nextIndex = active.findIndex((id, index) => index > session.cursor.followUpIndex
    && !session.answers[id]
    && !deferredFollowUpIds.includes(id));
  const cursor = nextIndex >= 0 ? { ...session.cursor, followUpIndex: nextIndex } : session.cursor;
  return changed(session, { deferredFollowUpIds, cursor }, now);
}

export function isQuizFlowClusterReady(session, mainId, questions) {
  if (!session.answers?.[mainId]) return false;
  return getActiveFollowUpIds(session, mainId, questions)
    .every((id) => session.answers?.[id] || session.deferredFollowUpIds.includes(id));
}

export function advanceQuizFlowMain(session, questions, now = new Date()) {
  const mainId = session.mainQuestionIds[session.cursor.mainIndex];
  if (!mainId || !isQuizFlowClusterReady(session, mainId, questions)) {
    throw new RangeError('활성 문제에 답하거나 보류해야 다음 메인 문제로 이동할 수 있습니다.');
  }
  const limit = roundLimit(session);
  const nextIndex = session.cursor.mainIndex + 1;
  if (nextIndex < limit) {
    return changed(session, {
      cursor: {
        round: mainRound(session, nextIndex),
        mainIndex: nextIndex,
        itemKind: 'main',
        followUpIndex: null,
      },
    }, now);
  }
  if (!session.secondRoundStarted) {
    return changed(session, {
      roundOneCompleted: true,
      mainCompleted: true,
      status: 'round-one-summary',
    }, now);
  }
  const deferred = session.deferredFollowUpIds.filter((id) => !session.answers[id]);
  return changed(session, {
    mainCompleted: true,
    fullyCompleted: deferred.length === 0,
    status: deferred.length ? 'review-pending' : 'completed',
    completedAt: deferred.length ? null : timestamp(now),
  }, now);
}

export function startQuizFlowSecondRound(session, now = new Date()) {
  if (!session.roundOneCompleted) throw new RangeError('첫 5개 메인 문제를 먼저 완료해야 합니다.');
  if (session.mainQuestionIds.length <= QUIZ_STAGE_SIZE) throw new RangeError('추가 메인 문제가 없습니다.');
  return changed(session, {
    secondRoundStarted: true,
    status: 'round-two',
    mainCompleted: false,
    fullyCompleted: false,
    completedAt: null,
    cursor: { round: 2, mainIndex: QUIZ_STAGE_SIZE, itemKind: 'main', followUpIndex: null },
  }, now);
}

export function resumeDeferredQuizFlow(session, questionId, questions, now = new Date()) {
  const deferred = session.deferredFollowUpIds.filter((id) => !session.answers[id]);
  const targetId = questionId && deferred.includes(questionId) ? questionId : deferred[0];
  if (!targetId) throw new RangeError('다시 풀 보류 문제가 없습니다.');
  const question = lookup(questions).get(targetId);
  const mainIndex = session.mainQuestionIds.indexOf(question?.followUpOf);
  const active = mainIndex >= 0 ? getActiveFollowUpIds(session, question.followUpOf, questions) : [];
  const followUpIndex = active.indexOf(targetId);
  if (mainIndex < 0 || followUpIndex < 0) throw new RangeError('보류 문제의 위치를 복원할 수 없습니다.');
  return changed(session, {
    cursor: { round: mainRound(session, mainIndex), mainIndex, itemKind: 'follow-up', followUpIndex },
  }, now);
}

export function reviewQuizFlowMain(session, mainId, now = new Date()) {
  const mainIndex = session.mainQuestionIds.indexOf(mainId);
  if (mainIndex < 0) throw new RangeError('세션에 포함되지 않은 메인 문제입니다.');
  return changed(session, {
    cursor: { round: mainRound(session, mainIndex), mainIndex, itemKind: 'main', followUpIndex: null },
  }, now);
}

export function setQuizFlowCursor(session, mainId, itemKind, followUpIndex, questions, now = new Date()) {
  const mainIndex = session.mainQuestionIds.indexOf(mainId);
  if (mainIndex < 0) throw new RangeError('세션에 포함되지 않은 메인 문제입니다.');
  if (itemKind === 'follow-up') {
    const active = getActiveFollowUpIds(session, mainId, questions);
    if (!Number.isInteger(followUpIndex) || !active[followUpIndex]) {
      throw new RangeError('활성 꼬리 문제 위치가 올바르지 않습니다.');
    }
  }
  return changed(session, {
    cursor: {
      round: mainRound(session, mainIndex),
      mainIndex,
      itemKind: itemKind === 'follow-up' ? 'follow-up' : 'main',
      followUpIndex: itemKind === 'follow-up' ? followUpIndex : null,
    },
  }, now);
}

function scorePart(ids, session) {
  const answeredIds = ids.filter((id) => session.answers?.[id]);
  const correct = answeredIds.filter((id) => session.answers[id].isCorrect).length;
  return {
    available: ids.length,
    answered: answeredIds.length,
    correct,
    incorrect: answeredIds.length - correct,
    percent: answeredIds.length ? Math.round((correct / answeredIds.length) * 100) : 0,
  };
}

export function scoreQuizFlow(session, questions) {
  const mainIds = session.mainQuestionIds.slice(0, roundLimit(session));
  const followUpIds = mainIds.flatMap((mainId) => getActiveFollowUpIds(session, mainId, questions));
  const main = scorePart(mainIds, session);
  const followUp = scorePart(followUpIds, session);
  const combined = {
    available: main.available + followUp.available,
    answered: main.answered + followUp.answered,
    correct: main.correct + followUp.correct,
    incorrect: main.incorrect + followUp.incorrect,
  };
  combined.percent = combined.answered ? Math.round((combined.correct / combined.answered) * 100) : 0;
  return {
    main,
    followUp,
    combined,
    deferred: session.deferredFollowUpIds.filter((id) => !session.answers[id]).length,
  };
}

export function migrateLegacyQuizSession(legacy, questions, now = new Date()) {
  if (!isObject(legacy) || legacy.version !== 1 || !Array.isArray(legacy.questionIds) || !legacy.questionIds.length) {
    return null;
  }
  const questionsById = lookup(questions);
  const mainQuestionIds = legacy.questionIds.filter((id) => questionsById.get(id)?.kind === 'main').slice(0, 10);
  if (!mainQuestionIds.length) return null;
  const followUpIdsByMain = Object.fromEntries(mainQuestionIds.map((mainId) => [
    mainId,
    followUpsFor(mainId, questions).map(({ id }) => id),
  ]));
  if (Object.values(followUpIdsByMain).some((ids) => ids.length !== 3)) return null;
  const answers = {};
  for (const [id, selectedIndex] of Object.entries(legacy.answers ?? {})) {
    const question = questionsById.get(id);
    if (question && Number.isInteger(selectedIndex) && selectedIndex >= 0 && selectedIndex <= 3) {
      answers[id] = answerRecord(question, selectedIndex, legacy.updatedAt ?? now);
    }
  }
  const firstUnanswered = mainQuestionIds.findIndex((id) => !answers[id]);
  const roundOneCompleted = mainQuestionIds.slice(0, 5).every((id) => answers[id]);
  const secondRoundStarted = legacy.currentStage === 2 || legacy.status === 'completed';
  const mainCompleted = secondRoundStarted
    ? mainQuestionIds.every((id) => answers[id])
    : roundOneCompleted;
  const mainIndex = firstUnanswered >= 0
    ? firstUnanswered
    : Math.min((secondRoundStarted ? mainQuestionIds.length : 5) - 1, mainQuestionIds.length - 1);
  return {
    version: QUIZ_FLOW_SESSION_VERSION,
    id: `${legacy.id}:v2`,
    date: legacy.date,
    primarySourceId: legacy.primarySourceId,
    categoryId: legacy.categoryId ?? '',
    mainQuestionIds,
    followUpIdsByMain,
    cursor: { round: mainRound({ cursor: { mainIndex } }, mainIndex), mainIndex, itemKind: 'main', followUpIndex: null },
    answers,
    deferredFollowUpIds: [],
    secondRoundStarted,
    roundOneCompleted,
    mainCompleted,
    fullyCompleted: false,
    status: mainCompleted ? (secondRoundStarted ? 'review-pending' : 'round-one-summary') : 'in-progress',
    startedAt: legacy.startedAt ?? timestamp(now),
    updatedAt: timestamp(now),
    completedAt: null,
    migratedFromV1: true,
  };
}

export function normalizeQuizFlowSession(candidate, questions) {
  if (!isObject(candidate)
    || candidate.version !== QUIZ_FLOW_SESSION_VERSION
    || typeof candidate.id !== 'string'
    || typeof candidate.date !== 'string'
    || typeof candidate.primarySourceId !== 'string'
    || !STATUS_SET.has(candidate.status)
    || !Array.isArray(candidate.mainQuestionIds)
    || !candidate.mainQuestionIds.length) return null;
  const byId = lookup(questions);
  const mainQuestionIds = [...new Set(candidate.mainQuestionIds)]
    .filter((id) => byId.get(id)?.kind === 'main')
    .slice(0, QUIZ_MAX_QUESTIONS);
  if (!mainQuestionIds.length) return null;
  const followUpIdsByMain = {};
  for (const mainId of mainQuestionIds) {
    const declared = Array.isArray(candidate.followUpIdsByMain?.[mainId])
      ? candidate.followUpIdsByMain[mainId]
      : followUpsFor(mainId, questions).map(({ id }) => id);
    const ids = [...new Set(declared)]
      .filter((id) => byId.get(id)?.followUpOf === mainId)
      .sort((a, b) => byId.get(a).followUpOrder - byId.get(b).followUpOrder);
    if (ids.length !== 3) return null;
    followUpIdsByMain[mainId] = ids;
  }
  const allowedIds = new Set([...mainQuestionIds, ...Object.values(followUpIdsByMain).flat()]);
  const answers = {};
  for (const [id, value] of Object.entries(candidate.answers ?? {})) {
    if (!allowedIds.has(id) || !isObject(value)) continue;
    const selectedIndex = value.selectedIndex;
    const question = byId.get(id);
    if (!Number.isInteger(selectedIndex) || selectedIndex < 0 || selectedIndex > 3 || !question) continue;
    answers[id] = {
      selectedIndex,
      correctIndex: question.correctIndex,
      isCorrect: selectedIndex === question.correctIndex,
      answeredAt: typeof value.answeredAt === 'string' ? value.answeredAt : candidate.updatedAt,
    };
  }
  const deferredFollowUpIds = [...new Set(candidate.deferredFollowUpIds ?? [])]
    .filter((id) => allowedIds.has(id) && byId.get(id)?.kind === 'follow-up' && !answers[id]);
  const mainIndex = Math.max(0, Math.min(
    Number.isInteger(candidate.cursor?.mainIndex) ? candidate.cursor.mainIndex : 0,
    mainQuestionIds.length - 1,
  ));
  const active = getActiveFollowUpIds({ ...candidate, answers, followUpIdsByMain }, mainQuestionIds[mainIndex], questions);
  const itemKind = candidate.cursor?.itemKind === 'follow-up' ? 'follow-up' : 'main';
  const followUpIndex = itemKind === 'follow-up'
    ? Math.max(0, Math.min(Number.isInteger(candidate.cursor?.followUpIndex) ? candidate.cursor.followUpIndex : 0, active.length - 1))
    : null;
  return {
    ...candidate,
    version: QUIZ_FLOW_SESSION_VERSION,
    mainQuestionIds,
    followUpIdsByMain,
    cursor: { round: mainRound({ cursor: { mainIndex } }, mainIndex), mainIndex, itemKind, followUpIndex },
    answers,
    deferredFollowUpIds,
    secondRoundStarted: candidate.secondRoundStarted === true,
    roundOneCompleted: candidate.roundOneCompleted === true,
    mainCompleted: candidate.mainCompleted === true,
    fullyCompleted: candidate.fullyCompleted === true,
    completedAt: typeof candidate.completedAt === 'string' ? candidate.completedAt : null,
    migratedFromV1: candidate.migratedFromV1 === true,
  };
}
