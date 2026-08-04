import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const html = await readFile(new URL('../roadmap.html', import.meta.url), 'utf8').catch(() => '');
const css = await readFile(new URL('../assets/routine.css', import.meta.url), 'utf8').catch(() => '');

function declarationsFor(source, selector) {
  return Array.from(source.matchAll(/([^{}]+)\{([^{}]*)\}/g))
    .filter(([, selectors]) => selectors.split(',').map((value) => value.trim()).includes(selector))
    .map(([, , declarations]) => declarations)
    .join('\n');
}

test('로드맵은 조작 없이 다섯 일정 변형을 제공하는 읽기 전용 기준표다', () => {
  assert.match(html, /id="roadmap-reference-list"/);
  assert.match(html, /src="\.\/src\/roadmap-app\.js"/);
  assert.match(html, /href="\.\/index\.html"/);
  assert.match(html, /href="\.\/daily\.html"/);
  assert.match(html, /href="\.\/output\/pdf\/취업준비-운영-로드맵\.pdf"[^>]*download/);
  assert.doesNotMatch(html, /type="checkbox"|type="radio"|data-learning-topic/);
  assert.doesNotMatch(html, /roadmap-current-date|roadmap-reset-today|roadmap-mode-switch/);
});

test('로드맵 운영 원칙은 지원과 면접 두 가지이며 학습 원칙을 노출하지 않는다', () => {
  const principles = html.match(/<section class="focus-anchors roadmap-principles[\s\S]*?<\/section>/)?.[0] ?? '';
  assert.equal((principles.match(/<article /g) ?? []).length, 2);
  assert.match(principles, /지원은 하루 3~4개/);
  assert.match(principles, /면접 언어를 매일 다듬기/);
  assert.doesNotMatch(principles, /학습|learning/i);
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

test('일정 선택과 현재 시간표를 운영 원칙과 PDF보다 먼저 제공한다', () => {
  assert.ok(html.indexOf('class="roadmap-view-selector') < html.indexOf('id="roadmap-reference-list"'));
  assert.ok(html.indexOf('id="roadmap-reference-list"') < html.indexOf('class="focus-anchors roadmap-principles'));
  assert.ok(html.indexOf('class="focus-anchors roadmap-principles') < html.indexOf('class="roadmap-secondary roadmap-download'));
});

test('모든 인터랙티브 요소는 밝은 분리 링과 진한 외곽 포커스 링을 사용한다', () => {
  for (const selector of [
    'a[href]:focus-visible',
    'button:focus-visible',
    'input:focus-visible',
    'select:focus-visible',
    'textarea:focus-visible',
    '[tabindex]:focus-visible',
  ]) {
    const declarations = declarationsFor(css, selector);
    assert.match(declarations, /outline:\s*3px solid #0b2647/);
    assert.match(declarations, /outline-offset:\s*3px/);
    assert.match(declarations, /box-shadow:\s*0 0 0 2px #fff/);
  }
  assert.doesNotMatch(css, /:focus-visible[^{}]*\{[^}]*rgb\(57 122 212 \/ 25%\)/s);
});
