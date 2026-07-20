import test from 'node:test';
import assert from 'node:assert/strict';
import { getRoadmapVariants } from '../src/roadmap-app.js';

const validator = await import('../scripts/validate-roadmap-pdf.mjs').catch(() => ({}));
const REQUIRED_PRINCIPLES = [
  '지원은 하루 3~4개',
  '면접 언어를 매일 다듬기',
  '학습은 결과물로 남기기',
];

test('페이지별 validator는 일정 유형 설명이 빠진 텍스트를 거부한다', () => {
  assert.equal(typeof validator.validateRoadmapPage, 'function');
  const [variant] = getRoadmapVariants();
  const pageWithoutDescription = [
    '취업 준비 운영 로드맵',
    variant.label,
    ...REQUIRED_PRINCIPLES,
    ...variant.schedule.map((item) => `${item.time} ${item.label}`),
  ].join('\n');

  assert.throws(
    () => validator.validateRoadmapPage(pageWithoutDescription, variant, 0),
    new RegExp(`1페이지에 필수 텍스트가 없습니다: ${variant.description}`),
  );
});

test('canonical 운영 로드맵 PDF는 A4 5페이지와 72개 일정 계약을 만족한다', async () => {
  assert.equal(typeof validator.validateRoadmapPdf, 'function');
  const result = await validator.validateRoadmapPdf(
    new URL('../output/pdf/취업준비-운영-로드맵.pdf', import.meta.url),
  );
  assert.deepEqual(result, {
    pageCount: 5,
    a4PageCount: 5,
    variantCount: 5,
    scheduleItemCount: 72,
  });
});
