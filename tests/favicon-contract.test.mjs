import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const pageNames = [
  'index.html',
  'roadmap.html',
  'weekly.html',
  'daily.html',
  'history.html',
  'learning.html',
  'learning-plan.html',
];

test('루틴 화면은 맞춤 SVG 파비콘을 사용한다', async () => {
  for (const pageName of pageNames) {
    const html = await readFile(new URL(`../${pageName}`, import.meta.url), 'utf8');
    assert.match(
      html,
      /<link rel="icon" type="image\/svg\+xml" href="\.\/assets\/favicon\.svg\?v=1">/,
      `${pageName}에 파비콘 링크가 필요합니다.`,
    );
  }
});

test('파비콘은 루틴 보드 색상과 체크리스트 표식을 포함한다', async () => {
  const svg = await readFile(new URL('../assets/favicon.svg', import.meta.url), 'utf8');

  assert.match(svg, /viewBox="0 0 64 64"/);
  assert.match(svg, /<title>취업 준비 루틴 보드<\/title>/);
  assert.match(svg, /#17375e/);
  assert.match(svg, /#397ad4/);
  assert.match(svg, /#d88318/);
});
