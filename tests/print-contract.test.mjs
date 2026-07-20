import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const css = await readFile(new URL('../assets/routine.css', import.meta.url), 'utf8').catch(() => '');
const home = await readFile(new URL('../index.html', import.meta.url), 'utf8').catch(() => '');
const exportScript = await readFile(new URL('../scripts/export-pdfs.sh', import.meta.url), 'utf8').catch(() => '');
const roadmapHtml = await readFile(new URL('../roadmap.html', import.meta.url), 'utf8').catch(() => '');
const packageJson = await readFile(new URL('../package.json', import.meta.url), 'utf8').catch(() => '');

function blockAfter(source, marker) {
  const markerIndex = source.indexOf(marker);
  const openIndex = source.indexOf('{', markerIndex);
  if (markerIndex < 0 || openIndex < 0) return '';

  let depth = 0;
  for (let index = openIndex; index < source.length; index += 1) {
    if (source[index] === '{') depth += 1;
    if (source[index] === '}') depth -= 1;
    if (depth === 0) return source.slice(openIndex + 1, index);
  }
  return '';
}

function declarationsFor(source, selector) {
  return Array.from(source.matchAll(/([^{}]+)\{([^{}]*)\}/g))
    .filter(([, selectors]) => selectors.split(',').map((value) => value.trim()).includes(selector))
    .map(([, , declarations]) => declarations)
    .join('\n');
}

test('A4 세로와 인쇄 전용 숨김 규칙을 선언한다', () => {
  assert.match(css, /@page\s*\{[^}]*size:\s*A4 portrait/s);

  const printCss = blockAfter(css, '@media print');
  assert.match(declarationsFor(printCss, '.screen-only'), /display:\s*none/);
  assert.match(declarationsFor(printCss, '.job-link-row'), /display:\s*none/);

  for (const page of ['#daily-page', '#weekly-page']) {
    assert.match(declarationsFor(printCss, page), /break-inside:\s*avoid/);
  }
  assert.doesNotMatch(declarationsFor(printCss, '#roadmap-page'), /break-inside:\s*avoid/);
});

test('인쇄 시 색상과 입력값은 종이에서도 읽히는 표현을 사용한다', () => {
  const printCss = blockAfter(css, '@media print');
  assert.match(declarationsFor(printCss, 'body'), /print-color-adjust:\s*exact/);
  assert.match(declarationsFor(printCss, '.company-head input'), /background:\s*transparent/);
  assert.match(declarationsFor(printCss, '.company-head select'), /appearance:\s*none/);
  assert.match(declarationsFor(printCss, '.memo-panel textarea'), /background:\s*transparent/);
});

test('로드맵 인쇄는 일정 변형마다 새 페이지에서 시작하고 행 분할을 피한다', () => {
  const printCss = blockAfter(css, '@media print');
  assert.match(roadmapHtml, /class="[^"]*roadmap-header[^"]*screen-only/);
  assert.match(roadmapHtml, /class="[^"]*roadmap-principles[^"]*screen-only/);
  assert.match(declarationsFor(printCss, '.print-only'), /display:\s*block\s*!important/);
  assert.match(
    declarationsFor(printCss, '#roadmap-page [data-roadmap-variant][hidden]'),
    /display:\s*block\s*!important/,
  );
  assert.match(declarationsFor(printCss, '.roadmap-print-principles'), /display:\s*grid\s*!important/);
  assert.match(declarationsFor(printCss, '.roadmap-print-principles .focus-anchor'), /position:\s*relative/);
  assert.match(declarationsFor(printCss, '.roadmap-mode-section'), /break-before:\s*page/);
  assert.match(declarationsFor(printCss, '.roadmap-mode-section'), /break-inside:\s*auto/);
  assert.match(declarationsFor(printCss, '.roadmap-mode-section:first-child'), /break-before:\s*auto/);
  assert.match(declarationsFor(printCss, '.roadmap-reference-period'), /break-inside:\s*avoid/);
  assert.match(declarationsFor(printCss, '.roadmap-reference-row'), /break-inside:\s*avoid/);
});

test('데일리 인쇄는 화면 필터로 숨긴 전체 시간표를 다시 표시한다', () => {
  const printCss = blockAfter(css, '@media print');
  assert.match(
    declarationsFor(printCss, '#daily-page #daily-schedule [data-schedule-row][hidden]'),
    /display:\s*grid\s*!important/,
  );
  assert.match(
    declarationsFor(printCss, '#daily-page #daily-schedule .schedule-period[hidden]'),
    /display:\s*block\s*!important/,
  );
});

test('PDF 내보내기는 Chrome 재정의와 안정적인 한국어 파일명을 지원한다', () => {
  assert.match(exportScript, /CHROME_BIN/);
  assert.match(exportScript, /Google Chrome\.app\/Contents\/MacOS\/Google Chrome/);
  assert.match(exportScript, /\$\{CHROME_BIN:-/);

  for (const [page, filename] of [
    ['roadmap.html', '취업준비-운영-로드맵.pdf'],
    ['weekly.html', '취업준비-주간실행보드.pdf'],
    ['daily.html', '취업준비-데일리포커스보드.pdf'],
  ]) {
    assert.match(exportScript, new RegExp(`${page.replace('.', '\\.')}`));
    assert.match(exportScript, new RegExp(filename.replace('.', '\\.')));
  }
});

test('로드맵 PDF는 canonical 경로와 파일명으로 생성되고 다운로드된다', () => {
  assert.match(exportScript, /TARGET="\$\{3:-all\}"/);
  assert.match(exportScript, /취업준비-운영-로드맵\.pdf/);
  assert.match(exportScript, /roadmap\)/);
  assert.match(roadmapHtml, /href="\.\/output\/pdf\/취업준비-운영-로드맵\.pdf"[^>]*download/);
});

test('로드맵 PDF npm 명령은 기존 8787 origin을 사용한다', () => {
  assert.match(
    packageJson,
    /"export:roadmap-pdf": "sh scripts\/export-pdfs\.sh http:\/\/127\.0\.0\.1:8787 output\/pdf roadmap"/,
  );
});

test('한국어 홈은 네 보드로 이동하는 상대 링크를 제공한다', () => {
  assert.match(home, /<html\s+lang="ko">/);
  assert.match(home, /취업 준비 루틴 보드/);

  for (const [href, label] of [
    ['./roadmap.html', '운영 로드맵'],
    ['./weekly.html', '주간 실행 보드'],
    ['./daily.html', '데일리 포커스 보드'],
    ['./history.html', '기록·분석'],
  ]) {
    assert.match(home, new RegExp(`href="${href.replace('.', '\\.')}`));
    assert.match(home, new RegExp(label));
  }
});

test('홈은 로드맵을 기준표로, 데일리를 유일한 오늘 실행 화면으로 설명한다', () => {
  assert.match(home, /읽기 전용 일정 기준표·PDF/);
  assert.match(home, /오늘의 유일한 실행 기록/);
});
