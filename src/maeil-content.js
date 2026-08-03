export const MAEIL_CONTENT_REPOSITORY = 'maeil-mail/maeil-mail-contents';
export const MAEIL_CONTENT_COMMIT = 'd00877afb0a302072078d34ded66b3b69143a5ca';
export const MAEIL_CONTENT_SOURCE_BASE =
  `https://github.com/${MAEIL_CONTENT_REPOSITORY}/blob/${MAEIL_CONTENT_COMMIT}/backend/contents`;
export const MAEIL_CONTENT_RAW_BASE =
  `https://raw.githubusercontent.com/${MAEIL_CONTENT_REPOSITORY}/${MAEIL_CONTENT_COMMIT}/backend/contents`;

const CACHE_NAME = `maeil-content-${MAEIL_CONTENT_COMMIT.slice(0, 12)}`;
const CONTENT_ID_PATTERN = /^be-(?:[1-9]|[1-9]\d|1[0-4]\d|15[0-2])$/u;

export function isValidMaeilContentId(id) {
  return typeof id === 'string' && CONTENT_ID_PATTERN.test(id);
}

function contentUrl(base, id, label) {
  if (typeof base !== 'string' || base.trim() === '') {
    throw new TypeError(`${label} 주소가 올바르지 않습니다.`);
  }
  return `${base.trim().replace(/\/+$/u, '')}/${id}.md`;
}

export function maeilContentUrls(id, options = {}) {
  if (!isValidMaeilContentId(id)) {
    throw new TypeError(`유효하지 않은 매일메일 콘텐츠 ID입니다: ${String(id)}`);
  }

  const rawBase = options.rawBase ?? MAEIL_CONTENT_RAW_BASE;
  return Object.freeze({
    sourceUrl: contentUrl(MAEIL_CONTENT_SOURCE_BASE, id, 'GitHub 원문'),
    rawUrl: contentUrl(rawBase, id, 'GitHub Raw'),
    localUrl: options.localBase == null
      ? null
      : contentUrl(options.localBase, id, '로컬 콘텐츠'),
  });
}

async function responseMarkdown(response) {
  if (!response || response.ok === false || typeof response.text !== 'function') return null;
  const markdown = await response.text();
  return typeof markdown === 'string' ? markdown : null;
}

async function readCachedMarkdown(cache, key) {
  if (!cache) return null;

  try {
    let cached;
    if (typeof cache.get === 'function') {
      cached = await cache.get(key);
    } else {
      const store = typeof cache.open === 'function' ? await cache.open(CACHE_NAME) : cache;
      if (typeof store?.match !== 'function') return null;
      cached = await store.match(key);
    }

    if (typeof cached === 'string') return cached;
    if (typeof cached?.markdown === 'string') return cached.markdown;
    if (typeof cached?.text === 'function') {
      const response = typeof cached.clone === 'function' ? cached.clone() : cached;
      return responseMarkdown(response);
    }
  } catch {
    // 캐시는 보조 수단이므로 캐시 오류가 원문 로딩 오류를 덮지 않게 한다.
  }
  return null;
}

async function writeCachedMarkdown(cache, key, markdown) {
  if (!cache) return;

  try {
    if (typeof cache.set === 'function') {
      await cache.set(key, markdown);
      return;
    }

    const store = typeof cache.open === 'function' ? await cache.open(CACHE_NAME) : cache;
    if (typeof store?.put !== 'function') return;

    if (typeof Response === 'function') {
      await store.put(key, new Response(markdown, {
        headers: { 'content-type': 'text/markdown; charset=utf-8' },
      }));
    } else {
      await store.put(key, { clone() { return this; }, async text() { return markdown; } });
    }
  } catch {
    // 네트워크에서 읽은 본문은 캐시 저장 실패와 무관하게 사용할 수 있다.
  }
}

export async function loadMaeilContent(id, options = {}) {
  const urls = maeilContentUrls(id, options);
  const fetchImpl = options.fetchImpl ?? globalThis.fetch;
  const cache = options.cache ?? null;
  let lastError = null;

  if (typeof fetchImpl === 'function') {
    const candidates = urls.localUrl
      ? [{ url: urls.localUrl, source: 'local' }, { url: urls.rawUrl, source: 'github' }]
      : [{ url: urls.rawUrl, source: 'github' }];
    for (const candidate of candidates) {
      try {
        const response = await fetchImpl(candidate.url);
        const markdown = await responseMarkdown(response);
        if (markdown === null) {
          const status = Number.isInteger(response?.status) ? ` (${response.status})` : '';
          throw new Error(`본문 응답이 올바르지 않습니다${status}.`);
        }
        await writeCachedMarkdown(cache, urls.rawUrl, markdown);
        return Object.freeze({
          markdown,
          source: candidate.source,
          sourceUrl: urls.sourceUrl,
          rawUrl: urls.rawUrl,
        });
      } catch (error) {
        lastError = error;
      }
    }
  } else {
    lastError = new Error('이 환경에서는 네트워크 요청을 사용할 수 없습니다.');
  }

  const cachedMarkdown = await readCachedMarkdown(cache, urls.rawUrl);
  if (cachedMarkdown !== null) {
    return Object.freeze({
      markdown: cachedMarkdown,
      source: 'cache',
      sourceUrl: urls.sourceUrl,
      rawUrl: urls.rawUrl,
    });
  }

  const error = new Error(`매일메일 본문(${id})을 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.`);
  if (lastError) error.cause = lastError;
  throw error;
}
