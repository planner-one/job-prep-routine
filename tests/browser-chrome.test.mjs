import test from 'node:test';
import assert from 'node:assert/strict';
import { chmod, mkdtemp, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const helperUrl = new URL('./helpers/chrome-bin.mjs', import.meta.url);

async function withExecutable(run) {
  const directory = await mkdtemp(join(tmpdir(), 'job-prep-chrome-bin-'));
  const executable = join(directory, 'chrome');
  await writeFile(executable, '#!/bin/sh\n');
  await chmod(executable, 0o755);

  try {
    await run(executable);
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
}

test('Chrome resolver는 CHROME_BIN을 기본 경로보다 우선한다', async () => {
  const { resolveChromeBin } = await import(helperUrl);

  await withExecutable(async (executable) => {
    assert.equal(
      resolveChromeBin({
        env: { CHROME_BIN: executable },
        defaultPath: '/missing/default/chrome',
      }),
      executable,
    );
  });
});

test('Chrome resolver는 CHROME_BIN이 없으면 macOS 기본 경로를 사용한다', async () => {
  const { resolveChromeBin } = await import(helperUrl);

  await withExecutable(async (executable) => {
    assert.equal(resolveChromeBin({ env: {}, defaultPath: executable }), executable);
  });
});

test('Chrome resolver는 실행 파일이 없을 때 경로와 CHROME_BIN 안내를 진단한다', async () => {
  const { resolveChromeBin } = await import(helperUrl);
  const missingPath = '/missing/custom/chrome';

  assert.throws(
    () => resolveChromeBin({ env: { CHROME_BIN: missingPath }, defaultPath: '/missing/default/chrome' }),
    (error) => {
      assert.match(error.message, /Chrome 실행 파일을 찾거나 실행할 수 없습니다/);
      assert.match(error.message, new RegExp(missingPath));
      assert.match(error.message, /CHROME_BIN 환경변수/);
      return true;
    },
  );
});

test('모든 브라우저 회귀 테스트는 공통 Chrome resolver만 사용한다', async () => {
  const filenames = (await readdir(new URL('.', import.meta.url)))
    .filter((filename) => filename.endsWith('-browser.test.mjs'))
    .sort();
  assert.deepEqual(filenames, [
    'daily-browser.test.mjs',
    'interview-browser.test.mjs',
    'roadmap-browser.test.mjs',
    'weekly-browser.test.mjs',
  ]);

  for (const filename of filenames) {
    const source = await readFile(new URL(filename, import.meta.url), 'utf8');
    assert.match(source, /import \{ resolveChromeBin \} from '\.\/helpers\/chrome-bin\.mjs';/);
    assert.match(source, /const CHROME_PATH = resolveChromeBin\(\);/);
    assert.doesNotMatch(source, /const CHROME_PATH = '\/Applications\/Google Chrome\.app/);
  }
});
