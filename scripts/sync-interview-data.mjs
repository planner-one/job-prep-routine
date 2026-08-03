import { writeFile } from 'node:fs/promises';

const SNAPSHOT_COMMIT = 'd00877afb0a302072078d34ded66b3b69143a5ca';
const SOURCE_URL = `https://raw.githubusercontent.com/maeil-mail/maeil-mail-contents/${SNAPSHOT_COMMIT}/backend/toc-category.md`;
const SOURCE_LINK_ROOT = `https://github.com/maeil-mail/maeil-mail-contents/blob/${SNAPSHOT_COMMIT}/backend/contents`;
const CATEGORY_IDS = new Map([
  ['Spring과 애플리케이션 계층', 'spring-application'],
  ['Persistence와 데이터베이스', 'persistence-database'],
  ['네트워크, HTTP와 웹 인프라', 'network-http'],
  ['분산 시스템, 캐시와 운영 인프라', 'distributed-cache'],
  ['운영체제, 동시성과 런타임', 'os-concurrency'],
  ['자바 언어, 컬렉션과 자료구조', 'java-language'],
  ['아키텍처, 객체지향과 설계 패턴', 'architecture-design'],
  ['테스트, 보안과 관측 가능성', 'test-security'],
]);

const response = await fetch(SOURCE_URL);
if (!response.ok) throw new Error(`공식 목차를 읽지 못했습니다: HTTP ${response.status}`);
const lines = (await response.text()).split(/\r?\n/);
const categories = [];
const questions = [];
let current = null;

for (const line of lines) {
  const heading = /^## (.+)$/.exec(line);
  if (heading) {
    const label = heading[1].trim();
    const id = CATEGORY_IDS.get(label);
    if (!id) throw new Error(`알 수 없는 카테고리: ${label}`);
    current = { id, label, order: categories.length + 1, count: 0 };
    categories.push(current);
    continue;
  }
  const item = /^- \[(.+)\]\(contents\/(be-\d+)\.md\)$/.exec(line);
  if (!item) continue;
  if (!current) throw new Error(`카테고리 밖의 질문: ${line}`);
  const [, title, id] = item;
  questions.push({
    id,
    number: Number(id.slice(3)),
    title: title.trim(),
    categoryId: current.id,
    category: current.label,
    order: questions.length + 1,
    sourceUrl: `${SOURCE_LINK_ROOT}/${id}.md`,
  });
  current.count += 1;
}

if (categories.length !== 8 || questions.length !== 152) {
  throw new Error(`예상 개수 불일치: 카테고리 ${categories.length}, 질문 ${questions.length}`);
}
if (new Set(questions.map(({ id }) => id)).size !== questions.length) {
  throw new Error('중복 질문 ID가 있습니다.');
}

const source = {
  repository: 'maeil-mail/maeil-mail-contents',
  snapshotCommit: SNAPSHOT_COMMIT,
  tocUrl: `https://github.com/maeil-mail/maeil-mail-contents/blob/${SNAPSHOT_COMMIT}/backend/toc-category.md`,
};
const output = `// ${SOURCE_URL}에서 생성한 백엔드 질문 메타데이터입니다.\n`
  + `export const INTERVIEW_SOURCE = Object.freeze(${JSON.stringify(source, null, 2)});\n\n`
  + `export const INTERVIEW_CATEGORIES = Object.freeze(${JSON.stringify(categories, null, 2)});\n\n`
  + `export const INTERVIEW_QUESTIONS = Object.freeze(${JSON.stringify(questions, null, 2)});\n\n`
  + 'export const INTERVIEW_QUESTION_BY_ID = new Map(INTERVIEW_QUESTIONS.map((question) => [question.id, question]));\n\n'
  + 'export function getInterviewQuestion(id) {\n  return INTERVIEW_QUESTION_BY_ID.get(id) ?? null;\n}\n';

await writeFile(new URL('../src/interview-data.js', import.meta.url), output);
