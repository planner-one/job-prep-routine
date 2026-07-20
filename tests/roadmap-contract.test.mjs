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

test('로드맵은 네 카테고리와 러닝 시작 시각 선택을 제공한다', () => {
  assert.match(html, /class="roadmap-category-tabs"[^>]*role="tablist"/);
  for (const category of ['workout', 'normal', 'running', 'maintenance']) {
    assert.match(html, new RegExp(`data-roadmap-category="${category}"`));
  }
  assert.match(html, /id="roadmap-run-time-picker"[^>]*hidden/);
  assert.match(html, /data-roadmap-run-start="21"/);
  assert.match(html, /data-roadmap-run-start="22"/);
  assert.doesNotMatch(html, /type="checkbox"|type="radio"/);
});
