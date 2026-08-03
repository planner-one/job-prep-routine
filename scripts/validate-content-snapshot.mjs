import { createHash } from 'node:crypto';
import { readFile, readdir } from 'node:fs/promises';
import { INTERVIEW_QUESTIONS, INTERVIEW_SOURCE } from '../src/interview-data.js';

const CONTENT_DIRECTORY = new URL('../content/maeil-mail/backend/contents/', import.meta.url);
const MANIFEST_PATH = new URL('../content/maeil-mail/manifest.json', import.meta.url);

const manifest = JSON.parse(await readFile(MANIFEST_PATH, 'utf8'));
const expectedIds = INTERVIEW_QUESTIONS.map(({ id }) => id).sort();
const actualIds = (await readdir(CONTENT_DIRECTORY))
  .filter((fileName) => /^be-\d+\.md$/u.test(fileName))
  .map((fileName) => fileName.slice(0, -3))
  .sort();

if (INTERVIEW_QUESTIONS.length !== 152 || actualIds.length !== 152) {
  throw new Error(`백엔드 콘텐츠 개수가 152개가 아닙니다: 메타 ${INTERVIEW_QUESTIONS.length}, 파일 ${actualIds.length}`);
}
if (JSON.stringify(actualIds) !== JSON.stringify(expectedIds)) {
  throw new Error('로컬 콘텐츠 ID가 공식 백엔드 목차와 다릅니다.');
}
if (manifest.sourceCommit !== INTERVIEW_SOURCE.snapshotCommit || manifest.count !== 152) {
  throw new Error('매니페스트의 원문 커밋 또는 개수가 다릅니다.');
}

const manifestById = new Map((manifest.files ?? []).map((file) => [file.id, file]));
for (const question of INTERVIEW_QUESTIONS) {
  if (!question.sourceUrl.includes(INTERVIEW_SOURCE.snapshotCommit)) {
    throw new Error(`${question.id}의 출처 URL이 고정 커밋을 가리키지 않습니다.`);
  }
  const markdown = await readFile(new URL(`${question.id}.md`, CONTENT_DIRECTORY), 'utf8');
  const entry = manifestById.get(question.id);
  const digest = createHash('sha256').update(markdown).digest('hex');
  if (!entry || entry.sha256 !== digest || entry.bytes !== Buffer.byteLength(markdown)) {
    throw new Error(`${question.id}.md의 무결성 검사가 실패했습니다.`);
  }
}

console.log(`백엔드 고정 스냅샷 152개 검증 완료: ${INTERVIEW_SOURCE.snapshotCommit}`);
