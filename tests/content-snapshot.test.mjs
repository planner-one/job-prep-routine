import test from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFile, readdir } from 'node:fs/promises';
import { INTERVIEW_QUESTIONS, INTERVIEW_SOURCE } from '../src/interview-data.js';

const directory = new URL('../content/maeil-mail/backend/contents/', import.meta.url);
const manifest = JSON.parse(await readFile(new URL('../content/maeil-mail/manifest.json', import.meta.url), 'utf8'));

test('로컬 고정 스냅샷은 백엔드 152개만 포함한다', async () => {
  const files = (await readdir(directory)).filter((name) => /^be-\d+\.md$/u.test(name));
  assert.equal(files.length, 152);
  assert.equal(INTERVIEW_QUESTIONS.length, 152);
  assert.equal(manifest.count, 152);
  assert.equal(manifest.sourceCommit, INTERVIEW_SOURCE.snapshotCommit);
  assert.deepEqual(
    files.map((name) => name.slice(0, -3)).sort(),
    INTERVIEW_QUESTIONS.map(({ id }) => id).sort(),
  );
});

test('매니페스트 SHA-256과 실제 원문이 일치한다', async () => {
  const entries = new Map(manifest.files.map((file) => [file.id, file]));
  for (const question of INTERVIEW_QUESTIONS) {
    const markdown = await readFile(new URL(`${question.id}.md`, directory), 'utf8');
    assert.equal(markdown.trim().length > 0, true, question.id);
    assert.equal(createHash('sha256').update(markdown).digest('hex'), entries.get(question.id).sha256);
  }
});
