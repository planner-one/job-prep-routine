import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const html = await readFile(new URL('../daily.html', import.meta.url), 'utf8').catch(() => '');
const css = await readFile(new URL('../assets/routine.css', import.meta.url), 'utf8').catch(() => '');

test('데일리형은 시간표와 지원 파이프라인의 두 열을 가진다', () => {
  assert.match(html, /class="daily-layout"/);
  assert.match(html, /id="daily-schedule"/);
  assert.match(html, /id="application-pipeline"/);
});

test('회사 4곳의 회사명·플랫폼·단계·링크 입력을 제공한다', () => {
  assert.equal((html.match(/class="company-card"/g) ?? []).length, 4);
  assert.match(html, /사람인/);
  assert.match(html, /지원 공고 링크/);
  assert.match(html, /분석/);
  assert.match(html, /자소서/);
  assert.match(html, /지원/);
});

test('PDF에서 링크와 화면 조작 요소를 숨긴다', () => {
  assert.match(css, /@media print/);
  assert.match(css, /\.screen-only/);
  assert.match(css, /\.job-link-row/);
});
