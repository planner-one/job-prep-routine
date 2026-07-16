import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const html = await readFile(new URL('../weekly.html', import.meta.url), 'utf8').catch(() => '');
const css = await readFile(new URL('../assets/routine.css', import.meta.url), 'utf8').catch(() => '');

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

test('주간 목표와 선택 요일 상세를 함께 보여준다', () => {
  assert.match(html, /id="weekly-progress"/);
  assert.match(html, /id="weekday-tabs"/);
  assert.match(html, /id="day-detail"/);
});
test('일곱 요일과 이동 가능한 핵심 유지일 선택을 제공한다', () => {
  assert.equal((html.match(/data-day=/g) ?? []).length, 7);
  for (const day of ['월', '화', '수', '목', '금', '토', '일']) {
    assert.match(html, new RegExp(`>${day}<`));
  }
  assert.match(html, /id="set-maintenance-day"/);
  assert.match(html, /핵심 유지일/);
});

test('주간 목표 수치가 설계와 일치한다', () => {
  for (const target of ['18–24', '실행일 6회', '3–5회', '1–2회', '4–6회', '2–4회', '2–3회', '3개 이상']) {
    assert.match(html, new RegExp(target));
  }
});

test('지원 목표 문구와 별개로 선택 가능한 최대 25개를 진척 상한으로 제공한다', () => {
  assert.match(html, /aria-label="주간 지원 진척"[^>]+aria-valuemax="25"/);
});

test('선택 요일 상세 한 카드 안에 실행 체크와 보조 시간표를 섞는다', () => {
  const detail = html.match(/<section[^>]+id="day-detail"[\s\S]*?<\/section>\s*<\/main>/)?.[0] ?? '';
  assert.match(detail, /id="weekly-day-checklist"/);
  assert.match(detail, /id="weekly-day-schedule"/);
  assert.match(detail, /class="weekly-detail-grid"/);
});

test('실행일 모드·러닝 시각·지원 4개·숙지·면접·식후 휴식·학습 6종을 제공한다', () => {
  for (const [mode, label] of [
    ['workout', '운동일'],
    ['normal', '비운동일'],
    ['running', '러닝일'],
  ]) {
    assert.match(html, new RegExp(`data-weekly-mode="${mode}"[^>]*>${label}<`));
  }
  assert.match(html, /name="weekly-run-start" value="21"/);
  assert.match(html, /name="weekly-run-start" value="22"/);
  assert.equal((html.match(/data-weekly-application=/g) ?? []).length, 4);
  assert.match(html, /이력서·포트폴리오 숙지 30분/);
  assert.match(html, /면접 연습/);
  assert.match(html, /식후 20분 휴식/);
  for (const topic of ['Spring', 'Redis', 'Java', '프로젝트 적용', 'CS', '코딩테스트']) {
    assert.match(html, new RegExp(`data-weekly-learning[^>]+value="${topic}"`));
  }
});

test('유지일 체크리스트에 필요한 여섯 운영 항목을 제공한다', () => {
  for (const label of [
    '마감 임박 공고 확인',
    '이력서·포트폴리오 숙지 30분',
    '면접 답변 3개 복기',
    '핵심 학습 복습',
    '다음 주 준비',
    '충분한 휴식',
  ]) {
    assert.match(html, new RegExp(label));
  }
});

test('PDF 미리보기는 오른쪽 상단 조작 영역의 마지막이며 인쇄 표현과 물결 시간을 쓰지 않는다', () => {
  const actions = html.match(/<div class="weekly-actions[\s\S]*?<\/div>\s*<\/header>/)?.[0] ?? '';
  assert.match(actions, /id="weekly-pdf-preview"[^>]*>PDF 미리보기<\/button>\s*<\/div>\s*<\/header>$/);
  assert.doesNotMatch(html, /인쇄|~/);

  const printCss = blockAfter(css, '@media print');
  assert.match(printCss, /\.screen-only[\s\S]*?display\s*:\s*none/);
});
