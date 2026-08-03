import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { quizMainAdvanceLabel, quizSourceFromLocation } from '../src/quiz-app.js';

const root = new URL('../', import.meta.url);
const [html, css, app, data, template] = await Promise.all([
  readFile(new URL('quiz.html', root), 'utf8'),
  readFile(new URL('assets/quiz.css', root), 'utf8'),
  readFile(new URL('src/quiz-app.js', root), 'utf8'),
  readFile(new URL('src/quiz-data.js', root), 'utf8'),
  readFile(new URL('template.html', root), 'utf8'),
]);

test('퀴즈 URL은 선택한 원문 ID와 미선택 상태를 구분한다', () => {
  assert.deepEqual(quizSourceFromLocation({ search: '?source=be-42' }), {
    provided: true,
    sourceId: 'be-42',
  });
  assert.deepEqual(quizSourceFromLocation({ search: '' }), {
    provided: false,
    sourceId: '',
  });
});

test('첫 5문제 뒤에는 진행표 위에서 1라운드 선택 화면으로 돌아갈 수 있다', () => {
  assert.match(html, /id="quiz-summary-return"/u);
  assert.match(html, /1라운드 선택 화면으로/u);
  assert.ok(html.indexOf('quiz-summary-return') < html.indexOf('quiz-flow-sidebar'));
  assert.match(app, /summaryReturn\.hidden = !session\.roundOneCompleted/u);
  assert.match(app, /button\.id === 'quiz-summary-return'/u);
  assert.match(css, /\.quiz-summary-return/u);
});

test('각 라운드의 마지막 묶음은 다음 문제가 아니라 결과 확인으로 이어진다', () => {
  const firstRoundLast = { status: 'in-progress', secondRoundStarted: false, mainQuestionIds: ['a', 'b', 'c', 'd', 'e', 'f'], cursor: { mainIndex: 4 } };
  const secondRoundLast = { status: 'round-two', secondRoundStarted: true, mainQuestionIds: ['a', 'b', 'c', 'd', 'e', 'f'], cursor: { mainIndex: 5 } };
  assert.equal(quizMainAdvanceLabel(firstRoundLast), '1라운드 결과 확인');
  assert.equal(quizMainAdvanceLabel(secondRoundLast), '최종 결과 확인');
  assert.equal(quizMainAdvanceLabel({ ...firstRoundLast, cursor: { mainIndex: 3 } }), '다음 메인 문제');
});

test('메인별 꼬리 문제와 5+5 라운드 흐름을 한 문제 묶음으로 제공한다', () => {
  for (const id of [
    'quiz-main-pages',
    'quiz-deferred-button',
    'quiz-cluster',
    'quiz-cluster-actions',
    'quiz-round-summary',
    'quiz-start-second-round',
    'quiz-final-summary',
    'quiz-final-deferred',
  ]) assert.match(html, new RegExp(`id="${id}"`, 'u'));
  assert.match(app, /answerQuizFlowQuestion/u);
  assert.match(app, /deferQuizFlowQuestion/u);
  assert.match(app, /startQuizFlowSecondRound/u);
  assert.match(app, /choiceFeedback/u);
  assert.match(app, /evidenceQuote/u);
  assert.match(app, /content\.html\?/u);
  assert.match(css, /\.quiz-review-card/u);
  assert.match(css, /\.quiz-deferred-button/u);
});

test('퀴즈 실행 모듈과 생성 데이터는 같은 캐시 버전으로 갱신한다', () => {
  assert.match(html, /quiz-app\.js\?v=8/u);
  assert.match(app, /quiz-flow-core\.js\?v=8/u);
  assert.match(app, /quiz-data\.js\?v=8/u);
  assert.match(data, /quiz-flow-core\.js\?v=8/u);
  assert.match(data, /quiz-questions\.generated\.js\?v=8/u);
});

test('퀴즈와 면접 상세는 같은 3개 학습 모드와 모바일 레이아웃을 갖는다', () => {
  assert.match(html, />읽기<\/a>[\s\S]*>퀴즈<\/a>[\s\S]*>면접 연습<\/a>/u);
  assert.match(template, />읽기<\/a>[\s\S]*>퀴즈<\/a>[\s\S]*>면접 연습<\/a>/u);
  assert.match(css, /@media \(max-width: 760px\)/u);
  assert.match(css, /:has\(input:checked\)/u);
});

test('면접 상세에 자가평가·원문 비교·선택적 AI 평가가 분리되어 있다', () => {
  for (const id of [
    'detail-answer',
    'detail-keywords',
    'detail-confidence',
    'detail-memo',
    'detail-reveal-reference',
    'detail-reference-body',
    'detail-ai-evaluate',
    'detail-ai-result',
    'detail-ai-setup',
  ]) assert.match(template, new RegExp(`id="${id}"`, 'u'));
  assert.match(template, /https:\/\/ollama\.com\/download/u);
  assert.match(template, /ollama pull qwen3:14b/u);
  assert.match(template, /<details class="interview-ai-panel"/u);
  assert.match(template, /<details class="interview-ai-setup"[^>]+hidden/u);
  assert.match(template, /class="interview-answer-workspace"/u);
  assert.match(template, /이 질문 원문 상세보기/u);
  assert.doesNotMatch(template, /GitHub 원문 출처 열기/u);
  assert.ok(
    template.indexOf('interview-complete-today') < template.indexOf('interview-source-link'),
    '읽기 상세 링크는 학습 정보 행의 마지막에 있어야 합니다.',
  );
  assert.ok(
    template.indexOf('data-detail-reset') < template.indexOf('data-detail-pdf'),
    '현재 질문 초기화는 PDF 미리보기보다 먼저 배치되어야 합니다.',
  );
  assert.ok(
    template.indexOf('data-detail-pdf') < template.indexOf('data-detail-next'),
    '다음 문항은 하단 조작의 마지막에 있어야 합니다.',
  );
  assert.match(template, /interview\.css\?v=6/u);
  assert.match(
    template,
    /<header class="interview-question-header">[\s\S]*<\/div>\s*<p class="date-line" data-detail-position>/u,
  );
  assert.match(template, /template-detail-app\.js\?v=4/u);
});
