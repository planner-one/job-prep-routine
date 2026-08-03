import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  QUIZ_QUESTIONS,
  QUIZ_SAMPLE_QUESTIONS,
  QUIZ_SOURCE,
  QUIZ_SOURCE_EXCERPTS,
} from '../src/quiz-data.js';
import { INTERVIEW_CATEGORIES, INTERVIEW_QUESTIONS } from '../src/interview-data.js';
import { validateQuizQuestions } from '../src/quiz-core.js';

const SOURCE_CATEGORIES = new Map(
  INTERVIEW_QUESTIONS.map(({ id, categoryId }) => [id, categoryId]),
);

async function sourceTextsFromDirectory(directory, questions) {
  const sourceIds = [...new Set(questions.map(({ sourceId }) => sourceId))];
  const entries = await Promise.all(sourceIds.map(async (sourceId) => {
    const markdown = await readFile(resolve(directory, `${sourceId}.md`), 'utf8');
    return [sourceId, markdown];
  }));
  return Object.fromEntries(entries);
}

export function validateQuizDataset(questions, options = {}) {
  const result = validateQuizQuestions(questions, {
    expectedCommit: options.expectedCommit ?? QUIZ_SOURCE.snapshotCommit,
    sourceTexts: options.sourceTexts,
    sourceCategories: options.sourceCategories ?? SOURCE_CATEGORIES,
    requireVerified: options.requireVerified ?? true,
    requireFollowUpsPerMain: options.requireFollowUpsPerMain,
  });
  if (!result.valid) {
    throw new Error(`퀴즈 데이터 검증 실패(${result.errors.length}건)\n${result.errors.join('\n')}`);
  }
  const minimumPerCategory = Number.isInteger(options.minimumPerCategory)
    ? options.minimumPerCategory
    : 0;
  const categoryIds = options.categoryIds
    ?? INTERVIEW_CATEGORIES.map(({ id }) => id);
  const categoryCounts = Object.fromEntries(categoryIds.map((id) => [
    id,
    questions.filter(({ categoryId }) => categoryId === id).length,
  ]));
  if (minimumPerCategory > 0) {
    const insufficient = Object.entries(categoryCounts)
      .filter(([, count]) => count < minimumPerCategory);
    if (insufficient.length > 0) {
      throw new Error(
        `퀴즈 카테고리 보충 실패: 카테고리마다 ${minimumPerCategory}문항이 필요합니다. `
        + insufficient.map(([id, count]) => `${id} ${count}문항`).join(', '),
      );
    }
  }
  return { ...result, categoryCounts };
}

export function validateBundledQuizData() {
  // 수동 fixture는 배포 풀에 포함하지 않지만 원문 인용을 재검증한다.
  validateQuizDataset(QUIZ_SAMPLE_QUESTIONS, { sourceTexts: QUIZ_SOURCE_EXCERPTS });
  // 2단계 Ollama 검증을 통과한 최종 뱅크만 UI에 노출한다.
  return validateQuizDataset(QUIZ_QUESTIONS, { requireFollowUpsPerMain: 3 });
}

export async function validateBundledQuizDataFromDirectory(
  sourceDirectory = fileURLToPath(new URL('../content/maeil-mail/backend/contents/', import.meta.url)),
) {
  const sourceTexts = await sourceTextsFromDirectory(sourceDirectory, QUIZ_QUESTIONS);
  return validateQuizDataset(QUIZ_QUESTIONS, {
    sourceTexts,
    minimumPerCategory: 10,
    requireFollowUpsPerMain: 3,
  });
}

async function readExternalDataset(path) {
  const parsed = JSON.parse(await readFile(resolve(path), 'utf8'));
  if (Array.isArray(parsed)) return parsed;
  if (Array.isArray(parsed?.questions)) return parsed.questions;
  throw new TypeError('JSON은 문항 배열 또는 questions 배열을 포함한 객체여야 합니다.');
}

export async function validateQuizDataFile(dataPath, sourceDirectory) {
  const questions = await readExternalDataset(dataPath);
  if (!sourceDirectory) throw new TypeError('외부 퀴즈 JSON을 검증할 때는 원문 디렉터리가 필요합니다.');
  const sourceTexts = await sourceTextsFromDirectory(sourceDirectory, questions);
  return validateQuizDataset(questions, {
    sourceTexts,
    requireFollowUpsPerMain: 3,
  });
}

const invokedPath = process.argv[1] ? resolve(process.argv[1]) : '';
if (invokedPath === fileURLToPath(import.meta.url)) {
  try {
    const [, , dataPath, sourceDirectory] = process.argv;
    const result = dataPath
      ? await validateQuizDataFile(dataPath, sourceDirectory)
      : await validateBundledQuizDataFromDirectory();
    console.log(`퀴즈 데이터 검증 완료: ${result.questionCount}문항, 출처 커밋 ${QUIZ_SOURCE.snapshotCommit}`);
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
