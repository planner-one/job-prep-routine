import { execFile } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';
import { promisify } from 'node:util';
import { getRoadmapVariants } from '../src/roadmap-app.js';

const execFileAsync = promisify(execFile);
const PRINCIPLES = [
  '지원은 하루 3~4개',
  '면접 언어를 매일 다듬기',
  '학습은 결과물로 남기기',
];

const normalizeText = (value) => value.replace(/\s+/g, ' ').trim();

function requireText(haystack, needle, context) {
  if (!haystack.includes(normalizeText(needle))) {
    throw new Error(`${context}에 필수 텍스트가 없습니다: ${needle}`);
  }
}

async function runTool(command, args) {
  try {
    return await execFileAsync(command, args, { encoding: 'utf8', maxBuffer: 10 * 1024 * 1024 });
  } catch (error) {
    const detail = error.stderr?.trim() || error.message;
    throw new Error(`${command} 실행 실패: ${detail}`, { cause: error });
  }
}

export async function validateRoadmapPdf(pdfPath) {
  const path = pdfPath instanceof URL ? fileURLToPath(pdfPath) : resolve(pdfPath);
  const { stdout: info } = await runTool(
    process.env.PDFINFO_BIN || 'pdfinfo',
    ['-f', '1', '-l', '5', '-box', path],
  );
  const pageCount = Number(/^Pages:\s+(\d+)$/m.exec(info)?.[1]);
  if (pageCount !== 5) throw new Error(`PDF 페이지 수가 5가 아닙니다: ${pageCount || '파싱 실패'}`);

  const sizes = Array.from(
    info.matchAll(/^Page\s+\d+\s+size:\s+([\d.]+) x ([\d.]+) pts \(([^)]+)\)$/gm),
  );
  const a4PageCount = sizes.filter(([, width, height, name]) => (
    name === 'A4' && Math.abs(Number(width) - 595) < 1 && Math.abs(Number(height) - 842) < 1
  )).length;
  if (sizes.length !== 5 || a4PageCount !== 5) {
    throw new Error(`모든 페이지가 A4가 아닙니다: ${a4PageCount}/5`);
  }

  const { stdout: text } = await runTool(
    process.env.PDFTOTEXT_BIN || 'pdftotext',
    ['-layout', path, '-'],
  );
  const pages = text.split('\f').map(normalizeText).filter(Boolean);
  if (pages.length !== 5) throw new Error(`PDF 텍스트 페이지 수가 5가 아닙니다: ${pages.length}`);
  const allText = normalizeText(text);
  for (const principle of PRINCIPLES) requireText(allText, principle, 'PDF');

  const variants = getRoadmapVariants();
  if (variants.length !== 5) throw new Error(`로드맵 변형 수가 5가 아닙니다: ${variants.length}`);
  let scheduleItemCount = 0;
  variants.forEach((variant, pageIndex) => {
    const page = pages[pageIndex];
    requireText(page, '취업 준비 운영 로드맵', `${pageIndex + 1}페이지`);
    requireText(page, variant.label, `${pageIndex + 1}페이지`);
    for (const principle of PRINCIPLES) requireText(page, principle, `${pageIndex + 1}페이지`);
    for (const item of variant.schedule) {
      scheduleItemCount += 1;
      requireText(page, `${item.time} ${item.label}`, `${pageIndex + 1}페이지`);
    }
  });
  if (scheduleItemCount !== 72) throw new Error(`로드맵 일정 수가 72가 아닙니다: ${scheduleItemCount}`);

  return { pageCount, a4PageCount, variantCount: variants.length, scheduleItemCount };
}

const invokedPath = process.argv[1] ? resolve(process.argv[1]) : '';
if (invokedPath === fileURLToPath(import.meta.url)) {
  const pdfPath = process.argv[2];
  if (!pdfPath) {
    console.error('사용법: node scripts/validate-roadmap-pdf.mjs <pdf-path>');
    process.exitCode = 2;
  } else {
    try {
      const result = await validateRoadmapPdf(pdfPath);
      console.log(`운영 로드맵 PDF 검증 완료: A4 ${result.pageCount}페이지, ${result.scheduleItemCount}개 일정`);
    } catch (error) {
      console.error(error.message);
      process.exitCode = 1;
    }
  }
}
