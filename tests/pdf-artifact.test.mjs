import test from 'node:test';
import assert from 'node:assert/strict';

const validator = await import('../scripts/validate-roadmap-pdf.mjs').catch(() => ({}));

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
