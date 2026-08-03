import test from 'node:test';
import assert from 'node:assert/strict';
import { getRoadmapVariants } from '../src/roadmap-app.js';

const validator = await import('../scripts/validate-roadmap-pdf.mjs').catch(() => ({}));
const REQUIRED_PRINCIPLES = [
  {
    title: '지원은 하루 3~4개',
    description: '공고 분석부터 자소서 조정·제출까지 한 흐름으로 끝낸다.',
  },
  {
    title: '면접 언어를 매일 다듬기',
    description: '이력서와 포트폴리오를 내 말로 설명하는 시간을 지킨다.',
  },
];

test('페이지별 validator는 일정 유형 설명이 빠진 텍스트를 거부한다', () => {
  assert.equal(typeof validator.validateRoadmapPage, 'function');
  const [variant] = getRoadmapVariants();
  const pageWithoutDescription = [
    '취업 준비 운영 로드맵',
    variant.label,
    ...REQUIRED_PRINCIPLES.map(({ title }) => title),
    ...variant.schedule.map((item) => `${item.time} ${item.label}`),
  ].join('\n');

  assert.throws(
    () => validator.validateRoadmapPage(pageWithoutDescription, variant, 0),
    new RegExp(`1페이지에 필수 텍스트가 없습니다: ${variant.description}`),
  );
});

test('페이지별 validator는 비운동일 제목을 운동일 제목으로 부분 일치시키지 않는다', () => {
  assert.equal(typeof validator.validateRoadmapPage, 'function');
  const [variant] = getRoadmapVariants();
  const pageWithWrongVariantLabel = [
    '취업 준비 운영 로드맵',
    '비운동일',
    variant.description,
    ...REQUIRED_PRINCIPLES.flatMap(({ title, description }) => [title, description]),
    ...variant.schedule.map((item) => `${item.time} ${item.label}`),
  ].join('\n');

  assert.throws(
    () => validator.validateRoadmapPage(pageWithWrongVariantLabel, variant, 0),
    new RegExp(`1페이지에 필수 텍스트가 없습니다: ${variant.label}`),
  );
});

test('페이지별 validator는 원칙 설명이 빠진 텍스트를 거부한다', () => {
  assert.equal(typeof validator.validateRoadmapPage, 'function');
  const [variant] = getRoadmapVariants();
  const missingPrinciple = REQUIRED_PRINCIPLES[1];
  const pageWithoutPrincipleDescription = [
    '취업 준비 운영 로드맵',
    variant.label,
    variant.description,
    ...REQUIRED_PRINCIPLES.flatMap(({ title, description }) => (
      title === missingPrinciple.title ? [title] : [title, description]
    )),
    ...variant.schedule.map((item) => `${item.time} ${item.label}`),
  ].join('\n');

  assert.throws(
    () => validator.validateRoadmapPage(pageWithoutPrincipleDescription, variant, 0),
    new RegExp(`1페이지에 필수 텍스트가 없습니다: ${missingPrinciple.description}`),
  );
});

test('canonical 운영 로드맵 PDF는 A4 5페이지와 66개 일정 계약을 만족한다', async () => {
  assert.equal(typeof validator.validateRoadmapPdf, 'function');
  const result = await validator.validateRoadmapPdf(
    new URL('../output/pdf/취업준비-운영-로드맵.pdf', import.meta.url),
  );
  assert.deepEqual(result, {
    pageCount: 5,
    a4PageCount: 5,
    variantCount: 5,
    scheduleItemCount: 66,
  });
});
