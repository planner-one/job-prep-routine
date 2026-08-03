import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { INTERVIEW_QUESTIONS, INTERVIEW_SOURCE } from '../src/interview-data.js';

const OUTPUT_DIRECTORY = new URL('../content/maeil-mail/backend/contents/', import.meta.url);
const RAW_ROOT = `https://raw.githubusercontent.com/${INTERVIEW_SOURCE.repository}/${INTERVIEW_SOURCE.snapshotCommit}/backend/contents`;
const MANIFEST_PATH = new URL('../content/maeil-mail/manifest.json', import.meta.url);
const FROM_LOCAL = process.argv.includes('--from-local');

if (INTERVIEW_QUESTIONS.length !== 152) {
  throw new Error(`백엔드 콘텐츠는 152개여야 합니다: ${INTERVIEW_QUESTIONS.length}개`);
}

await mkdir(OUTPUT_DIRECTORY, { recursive: true });
const files = [];

for (const question of INTERVIEW_QUESTIONS) {
  const fileName = `${question.id}.md`;
  const sourceUrl = `${RAW_ROOT}/${fileName}`;
  let markdown;
  if (FROM_LOCAL) {
    markdown = await readFile(new URL(fileName, OUTPUT_DIRECTORY), 'utf8');
  } else {
    const response = await fetch(sourceUrl);
    if (!response.ok) {
      throw new Error(`${fileName}을 읽지 못했습니다: HTTP ${response.status}`);
    }
    markdown = await response.text();
  }
  if (!markdown.trim()) throw new Error(`${fileName}이 비어 있습니다.`);
  if (!FROM_LOCAL) await writeFile(new URL(fileName, OUTPUT_DIRECTORY), markdown);
  files.push({
    id: question.id,
    fileName,
    sha256: createHash('sha256').update(markdown).digest('hex'),
    bytes: Buffer.byteLength(markdown),
  });
}

const manifest = {
  schemaVersion: 1,
  repository: INTERVIEW_SOURCE.repository,
  sourceCommit: INTERVIEW_SOURCE.snapshotCommit,
  scope: 'backend',
  count: files.length,
  files,
};

await writeFile(MANIFEST_PATH, `${JSON.stringify(manifest, null, 2)}\n`);
console.log(`고정 커밋 ${INTERVIEW_SOURCE.snapshotCommit.slice(0, 12)}의 백엔드 콘텐츠 ${files.length}개를 ${FROM_LOCAL ? '검증했' : '동기화했'}습니다.`);
