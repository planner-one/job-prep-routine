import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const html = await readFile(new URL('../roadmap.html', import.meta.url), 'utf8').catch(() => '');

test('로드맵은 조작 없이 다섯 일정 변형을 제공하는 읽기 전용 기준표다', () => {
  assert.match(html, /id="roadmap-reference-list"/);
  assert.match(html, /src="\.\/src\/roadmap-app\.js"/);
  assert.match(html, /href="\.\/index\.html"/);
  assert.match(html, /href="\.\/daily\.html"/);
  assert.match(html, /href="\.\/output\/pdf\/취업준비-운영-로드맵\.pdf"[^>]*download/);
  assert.doesNotMatch(html, /type="checkbox"|type="radio"|data-learning-topic/);
  assert.doesNotMatch(html, /roadmap-current-date|roadmap-reset-today|roadmap-mode-switch/);
});
