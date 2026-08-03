import test from 'node:test';
import assert from 'node:assert/strict';
import {
  MAEIL_CONTENT_COMMIT,
  MAEIL_CONTENT_RAW_BASE,
  MAEIL_CONTENT_REPOSITORY,
  isValidMaeilContentId,
  loadMaeilContent,
  maeilContentUrls,
} from '../src/maeil-content.js';

function response(markdown, options = {}) {
  return {
    ok: options.ok ?? true,
    status: options.status ?? 200,
    async text() { return markdown; },
  };
}

test('공식 저장소의 be-1부터 be-152까지만 콘텐츠 ID로 허용한다', () => {
  assert.equal(MAEIL_CONTENT_REPOSITORY, 'maeil-mail/maeil-mail-contents');
  assert.equal(MAEIL_CONTENT_COMMIT, 'd00877afb0a302072078d34ded66b3b69143a5ca');
  for (let number = 1; number <= 152; number += 1) {
    assert.equal(isValidMaeilContentId(`be-${number}`), true);
  }
  for (const invalid of ['be-0', 'be-01', 'be-153', 'be--1', 'fe-1', '../be-1', '', null]) {
    assert.equal(isValidMaeilContentId(invalid), false);
  }
});

test('기본 로딩은 고정 커밋의 GitHub Raw 원문만 요청한다', async () => {
  const calls = [];
  const loaded = await loadMaeilContent('be-42', {
    async fetchImpl(url) {
      calls.push(url);
      return response('## 트랜잭션');
    },
  });

  assert.deepEqual(calls, [`${MAEIL_CONTENT_RAW_BASE}/be-42.md`]);
  assert.deepEqual(loaded, {
    markdown: '## 트랜잭션',
    source: 'github',
    sourceUrl: `https://github.com/maeil-mail/maeil-mail-contents/blob/${MAEIL_CONTENT_COMMIT}/backend/contents/be-42.md`,
    rawUrl: `${MAEIL_CONTENT_RAW_BASE}/be-42.md`,
  });
});

test('localBase를 명시한 경우에만 로컬을 먼저 읽고 실패하면 GitHub로 fallback한다', async () => {
  const calls = [];
  const loaded = await loadMaeilContent('be-7', {
    localBase: './content/maeil-mail/backend/contents/',
    async fetchImpl(url) {
      calls.push(url);
      if (url.startsWith('./content/')) return response('없음', { ok: false, status: 404 });
      return response('## Spring MVC');
    },
  });

  assert.deepEqual(calls, [
    './content/maeil-mail/backend/contents/be-7.md',
    `${MAEIL_CONTENT_RAW_BASE}/be-7.md`,
  ]);
  assert.equal(loaded.markdown, '## Spring MVC');
  assert.equal(loaded.source, 'github');
});

test('get/set 캐시는 성공한 본문을 저장하고 네트워크 장애 때 복구한다', async () => {
  const values = new Map();
  const cache = {
    async get(key) { return values.get(key) ?? null; },
    async set(key, value) { values.set(key, value); },
  };
  const rawUrl = `${MAEIL_CONTENT_RAW_BASE}/be-1.md`;

  const online = await loadMaeilContent('be-1', {
    cache,
    async fetchImpl() { return response('## OSIV'); },
  });
  assert.equal(values.get(rawUrl), '## OSIV');
  assert.equal(online.source, 'github');

  const offline = await loadMaeilContent('be-1', {
    cache,
    async fetchImpl() { throw new Error('offline'); },
  });
  assert.equal(offline.markdown, '## OSIV');
  assert.equal(offline.source, 'cache');
  assert.equal(offline.rawUrl, rawUrl);
});

test('CacheStorage 형태의 캐시도 put과 match로 사용할 수 있다', async () => {
  const entries = new Map();
  const store = {
    async put(key, value) { entries.set(key, value); },
    async match(key) { return entries.get(key) ?? null; },
  };
  const opened = [];
  const cache = {
    async open(name) { opened.push(name); return store; },
  };

  await loadMaeilContent('be-152', {
    cache,
    async fetchImpl() { return response('## 헬스체크'); },
  });
  const offline = await loadMaeilContent('be-152', {
    cache,
    async fetchImpl() { throw new Error('offline'); },
  });

  assert.equal(opened.length >= 2, true);
  assert.equal(offline.markdown, '## 헬스체크');
  assert.equal(offline.source, 'cache');
});

test('URL 옵션을 정규화하고 잘못된 ID와 완전한 로딩 실패는 한국어로 알린다', async () => {
  assert.deepEqual(maeilContentUrls('be-3', {
    rawBase: 'https://example.test/raw/',
    localBase: '/mirror/',
  }), {
    sourceUrl: `https://github.com/maeil-mail/maeil-mail-contents/blob/${MAEIL_CONTENT_COMMIT}/backend/contents/be-3.md`,
    rawUrl: 'https://example.test/raw/be-3.md',
    localUrl: '/mirror/be-3.md',
  });

  await assert.rejects(
    () => loadMaeilContent('be-153', { fetchImpl: async () => response('') }),
    /유효하지 않은 매일메일 콘텐츠 ID/u,
  );
  await assert.rejects(
    () => loadMaeilContent('be-3', { fetchImpl: async () => response('', { ok: false, status: 503 }) }),
    /매일메일 본문\(be-3\)을 불러오지 못했습니다/u,
  );
});
