import { QUIZ_STAGE_SIZE } from './quiz-core.js?v=8';
import {
  getActiveFollowUpIds,
  normalizeQuizFlowSession,
} from './quiz-flow-core.js?v=8';
import { QUIZ_GENERATION } from './quiz-questions.generated.js?v=8';
import { createStudyAttempt } from './study-history-core.js';

export const QUIZ_STUDY_BANK_VERSION = `quiz-bank-v${QUIZ_GENERATION.version}`;

function questionLookup(questions) {
  return new Map(questions.map((question) => [question.id, question]));
}

function questionResults(session, questionIds, questionsById) {
  return questionIds.map((questionId) => {
    const question = questionsById.get(questionId);
    const answer = session.answers[questionId];
    if (!question || !answer) {
      throw new TypeError('완료한 퀴즈 문항과 답변 기록이 필요합니다.');
    }
    return {
      questionId,
      sourceId: question.sourceId,
      selectedIndex: answer.selectedIndex,
      correctIndex: question.correctIndex,
    };
  });
}

function uniqueSourceIds(results) {
  return [...new Set(results.map(({ sourceId }) => sourceId))];
}

function sourceCommit(questionIds, questionsById) {
  const commits = new Set(questionIds.map((id) => questionsById.get(id)?.sourceCommit).filter(Boolean));
  if (commits.size !== 1) {
    throw new TypeError('학습 기록에 사용할 퀴즈 원문 커밋이 하나여야 합니다.');
  }
  return [...commits][0];
}

function latestAnsweredAt(session, questionIds) {
  let latest = null;
  let latestTime = Number.NEGATIVE_INFINITY;
  for (const questionId of questionIds) {
    const answeredAt = session.answers[questionId]?.answeredAt;
    const time = Date.parse(answeredAt);
    if (!Number.isFinite(time)) {
      throw new TypeError('완료한 퀴즈 답변 시각이 올바르지 않습니다.');
    }
    if (time > latestTime) {
      latest = answeredAt;
      latestTime = time;
    }
  }
  return latest;
}

function metadata(session, round, questionCount) {
  return {
    sessionId: session.id,
    round,
    primarySourceId: session.primarySourceId,
    categoryId: session.categoryId,
    flowVersion: session.version,
    questionCount,
  };
}

function baseAttempt(session, round, questionIds, results, questionsById) {
  return {
    startedAt: session.startedAt,
    completedAt: latestAnsweredAt(session, questionIds),
    sourceIds: uniqueSourceIds(results),
    questionResults: results,
    bankVersion: QUIZ_STUDY_BANK_VERSION,
    sourceCommit: sourceCommit(questionIds, questionsById),
    modelVersion: QUIZ_GENERATION.model,
    promptVersion: QUIZ_GENERATION.promptVersion,
    metadata: metadata(session, round, results.length),
  };
}

function completedRounds(session) {
  const rounds = [];
  if (session.roundOneCompleted) {
    rounds.push({
      number: 1,
      mainQuestionIds: session.mainQuestionIds.slice(0, QUIZ_STAGE_SIZE),
    });
  }
  if (session.secondRoundStarted && session.mainCompleted) {
    rounds.push({
      number: 2,
      mainQuestionIds: session.mainQuestionIds.slice(QUIZ_STAGE_SIZE, QUIZ_STAGE_SIZE * 2),
    });
  }
  return rounds.filter(({ mainQuestionIds }) => mainQuestionIds.length > 0);
}

/**
 * QuizSession v2에서 이미 완료된 활동만 append-only 학습 기록으로 변환한다.
 * 완료 전 라운드와 보류 중인 꼬리 질문 묶음은 반환하지 않는다.
 */
export function completedQuizStudyAttempts(session, questions) {
  const normalized = normalizeQuizFlowSession(session, questions);
  if (!normalized) throw new TypeError('학습 기록으로 변환할 QuizSession v2가 필요합니다.');
  const questionsById = questionLookup(questions);
  const attempts = [];

  for (const round of completedRounds(normalized)) {
    const mainResults = questionResults(normalized, round.mainQuestionIds, questionsById);
    attempts.push(createStudyAttempt({
      id: `quiz-main:${normalized.id}:round-${round.number}`,
      kind: 'quiz-main',
      ...baseAttempt(normalized, round.number, round.mainQuestionIds, mainResults, questionsById),
    }));

    for (const mainId of round.mainQuestionIds) {
      const followUpIds = getActiveFollowUpIds(normalized, mainId, questions);
      if (followUpIds.length === 0 || !followUpIds.every((id) => normalized.answers[id])) continue;
      const followUpResults = questionResults(normalized, followUpIds, questionsById);
      attempts.push(createStudyAttempt({
        id: `quiz-follow-up:${normalized.id}:main:${mainId}`,
        kind: 'quiz-follow-up',
        followUpOf: mainId,
        ...baseAttempt(normalized, round.number, followUpIds, followUpResults, questionsById),
      }));
    }
  }

  return Object.freeze(attempts);
}
