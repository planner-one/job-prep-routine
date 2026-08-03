import { execFile } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';
import { promisify } from 'node:util';
import { getRoadmapVariants, ROADMAP_PRINCIPLES } from '../src/roadmap-app.js';

const execFileAsync = promisify(execFile);

const normalizeText = (value) => value.replace(/\s+/g, ' ').trim();
const compactText = (value) => value.replace(/\s+/g, '');
const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

function requireText(haystack, needle, context) {
  if (!haystack.includes(normalizeText(needle))) {
    throw new Error(`${context}에 필수 텍스트가 없습니다: ${needle}`);
  }
}

function requireBoundedText(haystack, needle, context) {
  const pattern = new RegExp(`(?:^|\\s)${escapeRegExp(normalizeText(needle))}(?:\\s|$)`);
  if (!pattern.test(normalizeText(haystack))) {
    throw new Error(`${context}에 필수 텍스트가 없습니다: ${needle}`);
  }
}

function requireCompactText(haystack, needle, context) {
  if (!compactText(haystack).includes(compactText(needle))) {
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

export function validateRoadmapPage(page, variant, pageIndex, readingOrderPage = page) {
  const context = `${pageIndex + 1}페이지`;
  requireText(page, '취업 준비 운영 로드맵', context);
  requireBoundedText(page, variant.label, context);
  requireText(page, variant.description, context);
  for (const principle of ROADMAP_PRINCIPLES) {
    requireText(page, principle.title, context);
    requireCompactText(readingOrderPage, principle.description, context);
  }
  for (const item of variant.schedule) {
    requireText(page, `${item.time} ${item.label}`, context);
  }
  return variant.schedule.length;
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
  const { stdout: readingOrderText } = await runTool(
    process.env.PDFTOTEXT_BIN || 'pdftotext',
    [path, '-'],
  );
  const pages = text.split('\f').map(normalizeText).filter(Boolean);
  if (pages.length !== 5) throw new Error(`PDF 텍스트 페이지 수가 5가 아닙니다: ${pages.length}`);
  const readingOrderPages = readingOrderText.split('\f').map(normalizeText).filter(Boolean);
  if (readingOrderPages.length !== 5) {
    throw new Error(`PDF 읽기 순서 텍스트 페이지 수가 5가 아닙니다: ${readingOrderPages.length}`);
  }
  const allText = normalizeText(text);
  for (const principle of ROADMAP_PRINCIPLES) requireText(allText, principle.title, 'PDF');

  const variants = getRoadmapVariants();
  if (variants.length !== 5) throw new Error(`로드맵 변형 수가 5가 아닙니다: ${variants.length}`);
  let scheduleItemCount = 0;
  variants.forEach((variant, pageIndex) => {
    scheduleItemCount += validateRoadmapPage(
      pages[pageIndex],
      variant,
      pageIndex,
      readingOrderPages[pageIndex],
    );
  });
  if (scheduleItemCount !== 66) throw new Error(`로드맵 일정 수가 66이 아닙니다: ${scheduleItemCount}`);

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
