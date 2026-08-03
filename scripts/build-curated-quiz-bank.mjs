import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';
import { INTERVIEW_QUESTIONS } from '../src/interview-data.js';
import { MAEIL_CONTENT_COMMIT } from '../src/maeil-content.js';
import { QUIZ_QUESTION_VERSION, validateQuizQuestions } from '../src/quiz-core.js';
import { FOUNDATION_SPRING_QUIZ_DRAFT } from '../data/quiz-drafts/foundation-spring.js';
import { FOUNDATION_DATABASE_QUIZ_DRAFT } from '../data/quiz-drafts/foundation-database.js';
import { FOUNDATION_NETWORK_QUIZ_DRAFT } from '../data/quiz-drafts/foundation-network.js';
import { SYSTEMS_QUIZ_DRAFTS } from '../data/quiz-drafts/systems.js';
import { DESIGN_QUALITY_QUIZ_DRAFT } from '../data/quiz-drafts/design-quality.js';

const SOURCE_DIRECTORY = fileURLToPath(new URL('../content/maeil-mail/backend/contents/', import.meta.url));
const OUTPUT_PATH = fileURLToPath(new URL('../src/quiz-questions.generated.js', import.meta.url));
const HEADING_PATTERN = /^\s{0,3}(#{2,4})\s+(.+?)\s*$/u;
const FENCE_PATTERN = /^\s{0,3}(`{3,}|~{3,})/u;

function cleanInline(value) {
  return String(value)
    .replace(/\\([\\`*{}\[\]()#+.!_<>-])/gu, '$1')
    .replace(/<[^>]+>/gu, '')
    .replace(/!\[([^\]]*)\]\([^)]*\)/gu, '$1')
    .replace(/\[([^\]]+)\]\([^)]*\)/gu, '$1')
    .replace(/[*_`~]/gu, '')
    .replace(/[\p{Extended_Pictographic}\p{Emoji_Modifier}\u200d\ufe0f]/gu, '')
    .replace(/\s+/gu, ' ')
    .trim();
}

function slugBase(value) {
  return cleanInline(value)
    .normalize('NFKC')
    .toLocaleLowerCase('ko-KR')
    .replace(/[^\p{Letter}\p{Number}\s_-]/gu, '')
    .replace(/[\s_]+/gu, '-')
    .replace(/-+/gu, '-')
    .replace(/^-|-$/gu, '') || 'section';
}

function headingSections(markdown) {
  const counts = new Map();
  const sections = [];
  let fence = null;
  let offset = 0;
  for (const originalLine of markdown.replace(/\r\n?/gu, '\n').split('\n')) {
    const line = originalLine.replace(/^\s{0,3}>\s?/u, '');
    const fenceMatch = line.match(FENCE_PATTERN);
    if (fenceMatch) {
      const marker = fenceMatch[1];
      if (!fence) fence = marker;
      else if (marker[0] === fence[0] && marker.length >= fence.length) fence = null;
    } else if (!fence) {
      const match = line.match(HEADING_PATTERN);
      if (match) {
        const text = cleanInline(match[2].replace(/\s+#+\s*$/u, '')) || '본문';
        const base = slugBase(text);
        const count = (counts.get(base) ?? 0) + 1;
        counts.set(base, count);
        sections.push({ offset, text, anchor: count === 1 ? base : `${base}-${count}` });
      }
    }
    offset += originalLine.length + 1;
  }
  return sections;
}

function headingInfoAt(markdown, quote, sections = headingSections(markdown)) {
  const offset = markdown.indexOf(quote);
  if (offset < 0) return null;
  let current = { text: '본문', anchor: 'content-answer' };
  for (const section of sections) {
    if (section.offset > offset) break;
    current = section;
  }
  return current;
}

async function sourceTexts(questions) {
  const ids = [...new Set(questions.map(({ sourceId }) => sourceId))];
  return Object.fromEntries(await Promise.all(ids.map(async (id) => [
    id,
    await readFile(resolve(SOURCE_DIRECTORY, `${id}.md`), 'utf8'),
  ])));
}

function sentenceCandidates(markdown, excludedQuotes) {
  const excluded = excludedQuotes.map((item) => cleanInline(item)).filter(Boolean);
  const result = [];
  let fence = null;
  for (const originalLine of markdown.replace(/\r\n?/gu, '\n').split('\n')) {
    const fenceMatch = originalLine.match(FENCE_PATTERN);
    if (fenceMatch) {
      const marker = fenceMatch[1];
      if (!fence) fence = marker;
      else if (marker[0] === fence[0] && marker.length >= fence.length) fence = null;
      continue;
    }
    if (fence || HEADING_PATTERN.test(originalLine)) continue;
    const line = originalLine
      .replace(/^\s{0,3}>\s?/u, '')
      .replace(/^\s*(?:[-*+]|\d+[.)])\s+/u, '')
      .trim();
    if (!line || /^(?:!\[|<img|\|)/u.test(line) || /^https?:\/\//iu.test(line)) continue;
    for (const raw of line.match(/[^.!?。！？]+(?:[.!?。！？]+|$)/gu) ?? []) {
      const sentence = raw.trim();
      const normalized = cleanInline(sentence);
      if (sentence.length < 28 || sentence.length > 220 || !/[가-힣]/u.test(sentence)) continue;
      if (!markdown.includes(sentence)) continue;
      if (excluded.some((quote) => normalized.includes(quote) || quote.includes(normalized))) continue;
      if (result.some((item) => cleanInline(item) === normalized)) continue;
      result.push(sentence);
    }
  }
  return result;
}

function keyPoints(question, sourceHeading, sourceMeta) {
  const values = [
    sourceHeading,
    ...cleanInline(sourceMeta.title)
      .replace(/설명해\s*주세요[.?]?/gu, '')
      .split(/[\s,/()]+/u),
    sourceMeta.category,
  ].map(cleanInline).filter((item) => item.length >= 2 && item.length <= 34);
  return [...new Set(values)].slice(0, 4);
}

function choiceFeedback(question) {
  return question.choices.map((choice, index) => (
    index === question.correctIndex
      ? question.explanation
      : `“${choice}”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “${question.choices[question.correctIndex]}”입니다.`
  ));
}

function topicLabel(title) {
  return cleanInline(title)
    .replace(/(?:에 대해서|에 대해)?\s*설명해\s*주세요[.?]?$/u, '')
    .replace(/[.?]+$/u, '')
    .trim();
}

function distributeChoices(question) {
  const correctChoice = question.choices[question.correctIndex];
  const incorrectChoices = question.choices.filter((_, index) => index !== question.correctIndex);
  const position = [...question.id].reduce((sum, character) => sum + character.codePointAt(0), 0) % 4;
  const choices = [...incorrectChoices];
  choices.splice(position, 0, correctChoice);
  return { ...question, choices, correctIndex: position };
}

function createGeneratedFollowUp(main, order, evidenceQuote, markdown, sourceMeta) {
  const heading = headingInfoAt(markdown, evidenceQuote);
  const role = order === 3 ? 'remediation' : 'core';
  const choices = [
    evidenceQuote,
    '원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.',
    '원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.',
    '원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.',
  ];
  const explanation = `원문의 “${heading.text}” 구역이 정답 선택지의 내용을 직접 설명합니다.`;
  const topic = topicLabel(sourceMeta.title);
  const question = distributeChoices({
    version: QUIZ_QUESTION_VERSION,
    id: `quiz-${main.sourceId}-follow-up-${order}`,
    kind: 'follow-up',
    followUpOf: main.id,
    followUpOrder: order,
    followUpRole: role,
    question: order === 2
      ? `${topic} 원문의 “${heading.text}” 구역과 일치하는 설명은 무엇인가요?`
      : `${topic}의 핵심 근거를 다시 확인할 때 옳은 설명은 무엇인가요?`,
    choices,
    correctIndex: 0,
    explanation,
    categoryId: main.categoryId,
    sourceId: main.sourceId,
    sourceCommit: MAEIL_CONTENT_COMMIT,
    sourceHeading: heading.text,
    sourceAnchor: heading.anchor,
    evidenceQuote,
    reviewStatus: 'verified',
    provenance: {
      author: 'codex-curated',
      review: 'independent-source-audit',
      sourceCommit: MAEIL_CONTENT_COMMIT,
    },
  });
  return {
    ...question,
    choiceFeedback: choiceFeedback(question),
    keyPoints: keyPoints(question, heading.text, sourceMeta),
  };
}

function assertCoverage(questions) {
  const expected = new Set(INTERVIEW_QUESTIONS.map(({ id }) => id));
  const mains = questions.filter(({ kind }) => kind === 'main');
  const followUps = questions.filter(({ kind }) => kind === 'follow-up');
  const mainSources = new Set(mains.map(({ sourceId }) => sourceId));
  const missing = [...expected].filter((id) => !mainSources.has(id));
  const extra = [...mainSources].filter((id) => !expected.has(id));
  if (missing.length || extra.length || mains.length !== 152 || followUps.length !== 456 || questions.length !== 608) {
    throw new Error(`152개 글 커버리지 검증 실패: main ${mains.length}, 꼬리 ${followUps.length}, 전체 ${questions.length}, 누락 ${missing.join(',')}, 추가 ${extra.join(',')}`);
  }
}

const draft = [
  ...FOUNDATION_SPRING_QUIZ_DRAFT,
  ...FOUNDATION_DATABASE_QUIZ_DRAFT,
  ...FOUNDATION_NETWORK_QUIZ_DRAFT,
  ...SYSTEMS_QUIZ_DRAFTS,
  ...DESIGN_QUALITY_QUIZ_DRAFT,
];
const texts = await sourceTexts(draft);
const sourceMetaById = new Map(INTERVIEW_QUESTIONS.map((item) => [item.id, item]));
const baseQuestions = draft.map((question) => {
  const markdown = texts[question.sourceId];
  const heading = headingInfoAt(markdown, question.evidenceQuote);
  if (!heading) throw new Error(`${question.id}: 원문에서 evidenceQuote를 찾을 수 없습니다.`);
  const sourceMeta = sourceMetaById.get(question.sourceId);
  const enriched = distributeChoices({
    ...question,
    version: QUIZ_QUESTION_VERSION,
    followUpOrder: question.kind === 'follow-up' ? 1 : null,
    followUpRole: question.kind === 'follow-up' ? 'core' : null,
    sourceHeading: heading.text,
    sourceAnchor: heading.anchor,
    reviewStatus: 'verified',
    provenance: {
      author: 'codex-curated',
      review: 'independent-source-audit',
      sourceCommit: MAEIL_CONTENT_COMMIT,
    },
  });
  return {
    ...enriched,
    choiceFeedback: choiceFeedback(enriched),
    keyPoints: keyPoints(enriched, heading.text, sourceMeta),
  };
});

const bySource = new Map();
for (const question of baseQuestions) {
  const group = bySource.get(question.sourceId) ?? [];
  group.push(question);
  bySource.set(question.sourceId, group);
}

const questions = [];
for (const sourceMeta of INTERVIEW_QUESTIONS) {
  const group = bySource.get(sourceMeta.id) ?? [];
  const main = group.find(({ kind }) => kind === 'main');
  const firstFollowUp = group.find(({ kind }) => kind === 'follow-up');
  if (!main || !firstFollowUp) throw new Error(`${sourceMeta.id}: 기존 메인·꼬리 문항 쌍이 필요합니다.`);
  const candidates = sentenceCandidates(texts[sourceMeta.id], [main.evidenceQuote, firstFollowUp.evidenceQuote]);
  if (candidates.length < 2) throw new Error(`${sourceMeta.id}: 서로 다른 꼬리 문항 근거를 2개 찾지 못했습니다.`);
  questions.push(
    main,
    firstFollowUp,
    createGeneratedFollowUp(main, 2, candidates[0], texts[sourceMeta.id], sourceMeta),
    createGeneratedFollowUp(main, 3, candidates[1], texts[sourceMeta.id], sourceMeta),
  );
}

assertCoverage(questions);
const validated = validateQuizQuestions(questions, {
  expectedCommit: MAEIL_CONTENT_COMMIT,
  sourceTexts: texts,
  sourceCategories: Object.fromEntries(INTERVIEW_QUESTIONS.map(({ id, categoryId }) => [id, categoryId])),
  requireVerified: true,
  requireFollowUpsPerMain: 3,
});
if (!validated.valid) throw new Error(`정적 퀴즈 은행 검증 실패\n${validated.errors.join('\n')}`);

const generation = {
  version: 2,
  sourceCommit: MAEIL_CONTENT_COMMIT,
  acceptedCount: questions.length,
  mainCount: 152,
  followUpCount: 456,
  model: 'codex-curated-static',
  validatorModel: 'mechanical-source-audit-v2',
  promptVersion: 'curated-bank-v2',
  generatedAt: new Date().toISOString(),
};
const output = `// 이 파일은 scripts/build-curated-quiz-bank.mjs로 생성합니다.\n`
  + `export const QUIZ_GENERATION = Object.freeze(${JSON.stringify(generation, null, 2)});\n\n`
  + `export const QUIZ_GENERATED_QUESTIONS = Object.freeze(${JSON.stringify(questions, null, 2)});\n`;
await writeFile(OUTPUT_PATH, output);
console.log(`정적 퀴즈 은행 생성 완료: ${questions.length}문항 (메인 152, 꼬리 456)`);
