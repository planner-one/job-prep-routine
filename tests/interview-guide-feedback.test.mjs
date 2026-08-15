import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';

const repoRoot = fileURLToPath(new URL('../', import.meta.url));
const readRepoFile = (path) => readFileSync(`${repoRoot}${path}`, 'utf8');

function loadInterviewData() {
  const context = vm.createContext({ window: {} });
  for (const path of [
    'interview/assets/data/behavioral.js',
    'interview/assets/data/feedshop.js',
    'interview/assets/data/architecture_cs.js',
    'interview/assets/data/guide_feedback.js',
  ]) {
    vm.runInContext(readRepoFile(path), context, { filename: path });
  }
  return context.window;
}

test('가이드 반영 답변은 기존 질문 14개에만 연결된다', () => {
  const interview = loadInterviewData();
  const catalogIds = new Set(Object.values(interview.INTERVIEW_DATA).flat().map(({ id }) => id));
  const guideQuestions = interview.INTERVIEW_GUIDE_FEEDBACK.questions;

  assert.equal(Object.keys(guideQuestions).length, 14);
  for (const [id, entry] of Object.entries(guideQuestions)) {
    assert.ok(catalogIds.has(id), `${id}가 기존 질문 카탈로그에 있어야 한다.`);
    assert.ok(entry.sourceSection);
    assert.ok(Array.isArray(entry.feedback) && entry.feedback.length >= 2);
    assert.ok(entry.answer?.compact?.conclusion);
    assert.ok(entry.answer?.compact?.evidence1);
    assert.ok(entry.answer?.compact?.evidence2);
    assert.ok(entry.answer?.conclusion);
    assert.ok(entry.answer?.evidence1);
    assert.ok(entry.answer?.evidence2);
    assert.ok(Array.isArray(entry.answer?.keywords) && entry.answer.keywords.length >= 3);
    assert.ok(entry.answer?.caution);
  }

  assert.doesNotMatch(JSON.stringify(guideQuestions), /\/Users\/|Downloads\/|\.pdf/i);
});

test('PDF 표현과 기존 근거가 충돌한 핵심 항목은 보정되어 있다', () => {
  const { questions } = loadInterviewData().INTERVIEW_GUIDE_FEEDBACK;
  const nPlusOne = JSON.stringify(questions['AC-031'].answer);
  const concurrency = JSON.stringify(questions['FS-003']);
  const isolation = JSON.stringify(questions['AC-032']);
  const redis = JSON.stringify(questions['AC-035']);

  assert.match(nPlusOne, /eventDetail/);
  assert.match(nPlusOne, /rewards/);
  assert.doesNotMatch(nPlusOne, /이미지·댓글/);
  assert.match(concurrency, /일시적 불일치/);
  assert.match(concurrency, /원자적 트랜잭션이라고 말하지 않는다/);
  assert.match(isolation, /consistent read/);
  assert.match(isolation, /locking read/);
  assert.match(redis, /항상 단일 스레드/);
  assert.match(redis, /SCAN/);
});

test('면접 화면은 가이드 데이터와 답변 전환 UI를 함께 로드한다', () => {
  const html = readRepoFile('interview/index.html');
  const dashboard = readRepoFile('interview/assets/dashboard.js');
  const css = readRepoFile('interview/assets/styles/dashboard/03-focus.css');

  const guideScript = html.indexOf('assets/data/guide_feedback.js?v=1');
  const dashboardScript = html.indexOf('assets/dashboard.js?v=8');
  assert.ok(guideScript > -1);
  assert.ok(dashboardScript > guideScript);
  assert.match(dashboard, /data-answer-variant="original"/);
  assert.match(dashboard, /data-answer-variant="guide"/);
  assert.match(dashboard, /가이드 반영 \$\{guideQuestionIds\.length\}개/);
  assert.match(css, /\.answer-variant-panel/);
  assert.match(css, /\.guide-feedback-box/);
});
