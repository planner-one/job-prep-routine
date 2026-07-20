import test from 'node:test';
import assert from 'node:assert/strict';
import { execFile } from 'node:child_process';
import { once } from 'node:events';
import { chmod, mkdir, mkdtemp, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import { createServer } from 'node:http';
import { tmpdir } from 'node:os';
import { dirname, resolve } from 'node:path';
import { promisify } from 'node:util';
import { fileURLToPath } from 'node:url';

const execFileAsync = promisify(execFile);
const PROJECT_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const CANONICAL_NAME = '취업준비-운영-로드맵.pdf';
const SOURCE_PATHS = [
  'roadmap.html',
  'assets/routine.css',
  'src/roadmap-app.js',
  'src/routine-data.js',
];

async function startSourceServer({ mismatchPath, failurePath }) {
  const requests = [];
  const server = createServer(async (request, response) => {
    const pathname = decodeURIComponent(new URL(request.url, 'http://127.0.0.1').pathname).replace(/^\//, '');
    requests.push(pathname);
    if (pathname === failurePath) {
      response.writeHead(503).end('실패');
      return;
    }
    if (!SOURCE_PATHS.includes(pathname)) {
      response.writeHead(404).end();
      return;
    }
    const source = await readFile(resolve(PROJECT_ROOT, pathname));
    response.writeHead(200);
    response.end(pathname === mismatchPath ? Buffer.concat([source, Buffer.from('\n불일치\n')]) : source);
  });
  server.listen(0, '127.0.0.1');
  await once(server, 'listening');
  return {
    server,
    requests,
    baseUrl: `http://127.0.0.1:${server.address().port}`,
  };
}

async function assertCanonicalPreserved(serverOptions, expectedError) {
  const directory = await mkdtemp(resolve(tmpdir(), 'roadmap-export-safety-'));
  const outputDirectory = resolve(directory, 'output');
  const chromeStub = resolve(directory, 'fake-chrome.sh');
  const marker = resolve(directory, 'chrome-invoked');
  const sentinel = Buffer.from('검증된 canonical sentinel\n');
  const canonical = resolve(outputDirectory, CANONICAL_NAME);
  const sourceServer = await startSourceServer(serverOptions);

  try {
    await mkdir(outputDirectory);
    await writeFile(canonical, sentinel);
    await writeFile(
      chromeStub,
      [
        '#!/bin/sh',
        'printf invoked > "$CHROME_MARKER"',
        'for argument in "$@"; do',
        '  case "$argument" in',
        '    --print-to-pdf=*) printf invalid > "${argument#*=}" ;;',
        '  esac',
        'done',
      ].join('\n'),
    );
    await chmod(chromeStub, 0o755);

    let failure;
    try {
      await execFileAsync(
        'sh',
        ['scripts/export-pdfs.sh', sourceServer.baseUrl, outputDirectory, 'roadmap'],
        {
          cwd: PROJECT_ROOT,
          env: { ...process.env, CHROME_BIN: chromeStub, CHROME_MARKER: marker },
        },
      );
    } catch (error) {
      failure = error;
    }

    assert.ok(failure, 'source 검증 실패는 내보내기를 실패시켜야 한다');
    assert.match(failure.stderr, expectedError);
    assert.deepEqual(await readFile(canonical), sentinel);
    await assert.rejects(readFile(marker), { code: 'ENOENT' });
    return sourceServer.requests;
  } finally {
    sourceServer.server.close();
    await once(sourceServer.server, 'close');
    await rm(directory, { recursive: true, force: true });
  }
}

test('8787 source 불일치 시 Chrome을 실행하지 않고 canonical PDF를 보존한다', async () => {
  const requests = await assertCanonicalPreserved(
    { mismatchPath: 'assets/routine.css' },
    /source 불일치: assets\/routine\.css/,
  );
  assert.deepEqual(requests, ['roadmap.html', 'assets/routine.css']);
});

test('8787 HTTP 실패 시 Chrome을 실행하지 않고 canonical PDF를 보존한다', async () => {
  const requests = await assertCanonicalPreserved(
    { failurePath: 'src/roadmap-app.js' },
    /source 요청 실패: src\/roadmap-app\.js/,
  );
  assert.deepEqual(requests, ['roadmap.html', 'assets/routine.css', 'src/roadmap-app.js']);
});

test('validator 실패 시 canonical PDF를 보존하고 임시 파일을 정리한 뒤 mv를 실행하지 않는다', async () => {
  const directory = await mkdtemp(resolve(tmpdir(), 'roadmap-export-validator-safety-'));
  const outputDirectory = resolve(directory, 'output');
  const chromeStub = resolve(directory, 'fake-chrome.sh');
  const marker = resolve(directory, 'chrome-invoked');
  const sentinel = Buffer.from('검증된 canonical sentinel\n');
  const canonical = resolve(outputDirectory, CANONICAL_NAME);
  const sourceServer = await startSourceServer({});

  try {
    await mkdir(outputDirectory);
    await writeFile(canonical, sentinel);
    await writeFile(
      chromeStub,
      [
        '#!/bin/sh',
        'printf invoked > "$CHROME_MARKER"',
        'for argument in "$@"; do',
        '  case "$argument" in',
        '    --print-to-pdf=*) printf "invalid PDF bytes" > "${argument#*=}" ;;',
        '  esac',
        'done',
      ].join('\n'),
    );
    await chmod(chromeStub, 0o755);

    let failure;
    try {
      await execFileAsync(
        'sh',
        ['-x', 'scripts/export-pdfs.sh', sourceServer.baseUrl, outputDirectory, 'roadmap'],
        {
          cwd: PROJECT_ROOT,
          env: { ...process.env, CHROME_BIN: chromeStub, CHROME_MARKER: marker },
        },
      );
    } catch (error) {
      failure = error;
    }

    assert.ok(failure, 'validator 실패는 내보내기를 실패시켜야 한다');
    assert.match(failure.stderr, /pdfinfo 실행 실패:/);
    assert.equal(await readFile(marker, 'utf8'), 'invoked');
    assert.deepEqual(await readFile(canonical), sentinel);
    assert.deepEqual(sourceServer.requests, SOURCE_PATHS);
    assert.deepEqual(
      (await readdir(outputDirectory)).filter((name) => name.startsWith('.roadmap-export.')),
      [],
    );
    assert.doesNotMatch(failure.stderr, /^\+ mv -f .*\.roadmap-export\./m);
  } finally {
    sourceServer.server.close();
    await once(sourceServer.server, 'close');
    await rm(directory, { recursive: true, force: true });
  }
});
