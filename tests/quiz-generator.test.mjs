import test from 'node:test';
import assert from 'node:assert/strict';
import {
  buildSlots,
  buildQuoteCompletionCandidate,
  desiredCorrectIndex,
  eligibleFocusEvidence,
  exactEvidence,
  exactSentenceContainingSpan,
  generationSchema,
  hasNearbyChoiceStemCollision,
  hasAnswerGlossLeak,
  markdownEvidenceSnippets,
  permuteCandidateChoices,
  quizCategoryCounts,
  quoteSpanCandidates,
  quoteSpanCandidatePools,
  quoteSpanRole,
  reviewDecisionAudit,
  reviewDecisionPasses,
  reviewSchema,
  sourceHeadingAt,
  sourceWideQuoteCandidateCatalog,
  strictClozeEvidenceViable,
  choicesMatchFollowingParticle,
  structurallyValidate,
  technicalTokens,
  underfilledQuizCategories,
} from '../scripts/generate-quiz-data.mjs';

const BODY_EVIDENCE = '첫 heading 앞에 있는 이 문장은 퀵즈 정답의 근거입니다.';
const SECTION_EVIDENCE = '해당 섹션의 연속된 원문 인용으로 정답을 확인합니다.';
const MARKDOWN = `${BODY_EVIDENCE}\n\n## 해결 방법\n\n${SECTION_EVIDENCE}\n`;
const STRICT_SLOT_EVIDENCE = '핵심 설명은 프록시 객체 동작을 여러 조건과 함께 자세히 정리합니다. 비교 대상으로는 트랜잭션 관리, 순환 의존성 문제, 테스트 격리 전략, 영속성 컨텍스트, 비동기 처리 방식을 충분히 설명합니다.';

test('heading이 있는 문서도 첫 heading 전 인용은 본문으로 계산한다', () => {
  assert.equal(sourceHeadingAt(MARKDOWN, MARKDOWN.indexOf(BODY_EVIDENCE)), '본문');
  assert.equal(sourceHeadingAt(MARKDOWN, MARKDOWN.indexOf(SECTION_EVIDENCE)), '해결 방법');
});

test('공백이 달라진 원문 인용을 위치와 함께 복원한다', () => {
  const markdown = '원문은  여러\n공백을\t포함하지만 의미는 같습니다.';
  const matched = exactEvidence(markdown, '원문은 여러 공백을 포함하지만 의미는 같습니다.');
  assert.deepEqual(matched, { quote: markdown, start: 0 });
});

test('구조 검증은 모델이 쓴 heading 대신 인용의 실제 위치를 저장한다', () => {
  const candidate = {
    slotId: 'be-test:1',
    sourceId: 'be-test',
    categoryId: 'test-security',
    sourceHeading: '해결 방법',
    question: '첫 heading 앞의 원문이 설명하는 내용은 무엇인가요?',
    choices: ['퀵즈 정답의 근거', '외부 지식', '다른 설명', '무관한 내용'],
    correctIndex: 0,
    explanation: '첫 문장이 퀵즈 정답의 근거라고 직접 설명합니다.',
    evidenceId: 'be-test:E001',
    distractorEvidenceIds: ['be-test:E001', 'be-test:E001', 'be-test:E001', 'be-test:E001'],
  };
  const result = structurallyValidate(
    candidate,
    { slotId: 'be-test:1', sourceId: 'be-test', expectedCorrectIndex: 2 },
    {
      markdown: MARKDOWN,
      headings: ['해결 방법'],
      categoryId: 'test-security',
      evidence: [{ id: 'be-test:E001', text: BODY_EVIDENCE }],
    },
    new Map(),
  );

  assert.ok(result);
  assert.equal(result.sourceHeading, '본문');
  assert.equal(result.evidenceQuote, BODY_EVIDENCE);
  assert.equal(result._evidenceId, 'be-test:E001');
  assert.equal(result.correctIndex, 2);
  assert.equal(result.choices[2], candidate.choices[0]);
  assert.deepEqual(result._choicePermutation.slice().sort((left, right) => left - right), [0, 1, 2, 3]);
  assert.deepEqual(result._distractorEvidenceIds, ['be-test:E001', 'be-test:E001', '', 'be-test:E001']);
  assert.deepEqual(result._distractorEvidenceQuotes, [BODY_EVIDENCE, BODY_EVIDENCE, '', BODY_EVIDENCE]);
  assert.equal(result.reviewStatus, 'pending-review');

  const restored = structurallyValidate(
    { ...result, slotId: 'be-test:1' },
    { slotId: 'be-test:1', sourceId: 'be-test', expectedCorrectIndex: 2 },
    {
      markdown: MARKDOWN,
      headings: ['해결 방법'],
      categoryId: 'test-security',
      evidence: [{ id: 'be-test:E001', text: BODY_EVIDENCE }],
    },
    new Map(),
  );
  assert.equal(restored.id, result.id);
});

test('원문 근거 카탈로그는 exact substring에 안정적인 ID를 부여한다', () => {
  const snippets = markdownEvidenceSnippets(MARKDOWN, 'be-test');
  assert.ok(snippets.length >= 2);
  assert.equal(snippets[0].id, 'be-test:E001');
  assert.ok(snippets.every(({ text, start, end }) => MARKDOWN.slice(start, end) === text));
  assert.equal(snippets[0].heading, '본문');
  assert.equal(snippets.at(-1).heading, '해결 방법');
  assert.equal(new Set(snippets.map(({ id }) => id)).size, snippets.length);
});

test('동일한 문장이 반복되어도 각 위치와 heading을 별도 근거로 보존한다', () => {
  const repeated = '반복되는 이 문장은 서로 다른 섹션에 위치합니다.';
  const markdown = `## 첫 섹션\n\n${repeated}\n\n## 둘째 섹션\n\n${repeated}\n`;
  const snippets = markdownEvidenceSnippets(markdown, 'be-repeat')
    .filter(({ text }) => text === repeated);
  assert.equal(snippets.length, 2);
  assert.notEqual(snippets[0].start, snippets[1].start);
  assert.deepEqual(snippets.map(({ heading }) => heading), ['첫 섹션', '둘째 섹션']);
});

const REVIEW_EVIDENCE = '서비스는 프록시를 통해 호출될 때 트랜잭션이 정상적으로 적용됩니다.';
const OTHER_EVIDENCE = '별도의 클래스로 분리하면 각각의 프록시를 통해 호출할 수 있습니다.';
const REVIEW_SOURCE = [
  { id: 'be-review:E001', text: REVIEW_EVIDENCE },
  { id: 'be-review:E002', text: OTHER_EVIDENCE },
];
const REVIEW_CANDIDATE = {
  correctIndex: 0,
  _evidenceId: 'be-review:E001',
  _distractorEvidenceIds: ['', 'be-review:E001', 'be-review:E001', 'be-review:E001'],
};

function validReviewDecision() {
  return {
    premiseEntailed: true,
    premiseEvidenceIds: ['be-review:E001'],
    choiceJudgments: [
      { choiceIndex: 0, verdict: 'entailed', evidenceIds: ['be-review:E001'] },
      { choiceIndex: 1, verdict: 'contradicted', evidenceIds: ['be-review:E001'] },
      { choiceIndex: 2, verdict: 'contradicted', evidenceIds: ['be-review:E001'] },
      { choiceIndex: 3, verdict: 'contradicted', evidenceIds: ['be-review:E001'] },
    ],
    explanationFullyGrounded: true,
    explanationEvidenceIds: ['be-review:E001'],
    answerableWithoutExternalKnowledge: true,
    ambiguous: false,
    accepted: true,
    reason: '모든 판단이 제공된 원문 인용에서 직접 확인됩니다.',
  };
}

test('상세 AI 검증의 선택지 판정과 evidence ID가 일치할 때만 통과한다', () => {
  assert.equal(reviewDecisionPasses(REVIEW_CANDIDATE, validReviewDecision(), REVIEW_SOURCE), true);
});

test('오답 반박 evidence ID 하나라도 카탈로그에 없으면 거부한다', () => {
  const decision = validReviewDecision();
  decision.choiceJudgments[2].evidenceIds = ['be-review:E999'];
  assert.equal(reviewDecisionPasses(REVIEW_CANDIDATE, decision, REVIEW_SOURCE), false);
});

test('검증자가 생성자의 오답 근거 ID와 다른 ID를 쓰면 거부한다', () => {
  const decision = validReviewDecision();
  decision.choiceJudgments[1].evidenceIds = ['be-review:E002'];
  const audit = reviewDecisionAudit(REVIEW_CANDIDATE, decision, REVIEW_SOURCE);
  assert.equal(audit.passed, false);
  assert.equal(audit.reasons.includes('선택지 1(오답) 근거에 candidateDistractorEvidenceId가 없음'), true);
});

test('정답 판정에 후보의 candidateEvidenceId가 없으면 거부한다', () => {
  const decision = validReviewDecision();
  decision.choiceJudgments[0].evidenceIds = ['be-review:E002'];
  assert.equal(reviewDecisionPasses(REVIEW_CANDIDATE, decision, REVIEW_SOURCE), false);
});

test('오답이 unsupported면 모델이 accepted로 표시해도 거부한다', () => {
  const decision = validReviewDecision();
  decision.choiceJudgments[3].verdict = 'unsupported';
  const audit = reviewDecisionAudit(REVIEW_CANDIDATE, decision, REVIEW_SOURCE);
  assert.equal(audit.passed, false);
  assert.deepEqual(audit.reasons, ['선택지 3(오답)의 verdict가 contradicted가 아님']);
});

test('생성 스키마는 배치 크기만큼 문항 수를 강제한다', () => {
  const schema = generationSchema(1);
  assert.equal(schema.properties.questions.minItems, 1);
  assert.equal(schema.properties.questions.maxItems, 1);
});

test('배치 1인 생성 스키마는 슬롯·출처·카테고리·근거를 고정한다', () => {
  const text = 'Spring과 Hibernate, Mockito, Jackson은 AOP 애너테이션을 검사하고 프록시 객체를 생성해 기존 빈을 대체하며, 이 과정에서 @Transactional 설정을 적용할 수 있습니다.';
  const slot = {
    slotId: 'be-schema:1',
    sourceId: 'be-schema',
    focusEvidenceId: 'be-schema:E001',
    expectedCorrectIndex: 2,
  };
  const schema = generationSchema(1, [slot], new Map([
    ['be-schema', {
      categoryId: 'test-security',
      evidence: [{ id: 'be-schema:E001', text }],
    }],
  ]));
  const properties = schema.properties.questions.items.properties;
  assert.deepEqual(properties.slotId.enum, ['be-schema:1']);
  assert.deepEqual(properties.sourceId.enum, ['be-schema']);
  assert.deepEqual(properties.categoryId.enum, ['test-security']);
  assert.deepEqual(properties.evidenceId.enum, ['be-schema:E001']);
  assert.equal(properties.answerSpan.enum.length >= 4, true);
  assert.deepEqual(properties.distractors.items.enum, properties.answerSpan.enum);
  assert.equal(properties.distractors.uniqueItems, true);
  assert.equal(properties.correctIndex, undefined);
  assert.equal(schema.properties.questions.items.required.includes('answerSpan'), true);
  assert.equal(schema.properties.questions.items.required.includes('distractors'), true);
});

test('한글 조사·연결형 보기는 정확히 같은 접미사끼리만 같은 role을 사용한다', () => {
  assert.equal(quoteSpanRole('서비스나'), quoteSpanRole('인터페이스나'));
  assert.notEqual(quoteSpanRole('인터페이스나'), quoteSpanRole('클래스의'));
  assert.notEqual(quoteSpanRole('서비스에서'), quoteSpanRole('서비스에'));
  assert.notEqual(quoteSpanRole('객체을'), quoteSpanRole('객체를'));
  assert.notEqual(quoteSpanRole('@Async'), quoteSpanRole('JDK'));
  assert.equal(quoteSpanRole('JDK'), quoteSpanRole('CGLIB'));
  assert.notEqual(quoteSpanRole('JDK'), quoteSpanRole('Spring'));
  assert.equal(quoteSpanRole('Spring'), quoteSpanRole('Dynamic'));
});

test('용언·부사형 single token과 영문 괄호로 정답이 누설되는 span을 후보에서 제외한다', () => {
  const text = '메서드 값은 뷰 리졸버(View Resolver)에 의해 해석되어 템플릿 엔진을 통해 HTML 응답 본문과 프록시 객체, 테스트 코드, 캐시 구조를 생성합니다.';
  assert.equal(hasAnswerGlossLeak(text, '리졸버'), true);
  assert.equal(hasAnswerGlossLeak(text, 'View Resolver'), true);
  const values = quoteSpanCandidatePools(text).flatMap(({ values: pool }) => pool);
  assert.equal(values.includes('리졸버'), false);
  assert.equal(values.includes('View Resolver'), false);
  assert.equal(values.includes('의해'), false);
  assert.equal(values.includes('해석되어'), false);
  assert.equal(values.includes('통해'), false);
  const encapsulation = '캡슐화(Encapsulation)는 클래스 내부 상태를 안전하게 보호합니다.';
  assert.equal(hasAnswerGlossLeak(encapsulation, '캡슐화'), true);
  assert.equal(hasAnswerGlossLeak(encapsulation, 'Encapsulation'), true);
});

test('명사구 내부의 조사·경계어를 후보로 사용하지 않는다', () => {
  const text = '이때 2번 과정은 서비스에서 발생한 예외를 통해 계좌 이체 트랜잭션과 데이터 일관성 문제, 부분 실행 상태, 복구 처리 절차를 충분히 설명합니다.';
  const values = quoteSpanCandidatePools(text).flatMap(({ values: pool }) => pool);
  assert.equal(values.some((value) => value.startsWith('이때 ')), false);
  assert.equal(values.some((value) => value.includes('서비스에서 ')), false);
  assert.equal(values.some((value) => value.startsWith('통해 ')), false);
});

test('고정 조사는 모든 선택지의 받침과 호응하고 으로/로는 ㄹ 예외를 적용한다', () => {
  assert.equal(choicesMatchFollowingParticle('초기 용량을 설정합니다.', '초기 용량', ['초기 용량', '내부 배열']), true);
  assert.equal(choicesMatchFollowingParticle('초기 용량을 설정합니다.', '초기 용량', ['자료구조']), false);
  assert.equal(choicesMatchFollowingParticle('가변 할당 방식은 유연합니다.', '가변 할당 방식', ['고정 할당 방식']), true);
  assert.equal(choicesMatchFollowingParticle('가변 할당 방식은 유연합니다.', '가변 할당 방식', ['필요한 프로세스']), false);
  assert.equal(choicesMatchFollowingParticle('파일로 저장합니다.', '파일', ['파일', '경로']), true);
  assert.equal(choicesMatchFollowingParticle('방식으로 저장합니다.', '방식', ['파일']), false);
  assert.equal(choicesMatchFollowingParticle('요청을 수행합니다.', '요청', ['수행한 서버']), false);
  assert.equal(choicesMatchFollowingParticle('초기 용량을 설정합니다.', '초기 용량', ['자료구조', '크기']), false);
});

test('exact sentence extractor는 정답을 포함한 원문 단일 문장만 substring으로 반환한다', () => {
  const paragraph = '첫 문장은 생성 규칙을 설명합니다. 둘째 문장은 프록시 동작을 정확히 설명합니다! 셋째 문장은 결론입니다.';
  const sentence = '둘째 문장은 프록시 동작을 정확히 설명합니다!';
  assert.equal(exactSentenceContainingSpan(paragraph, '프록시'), sentence);
  assert.equal(paragraph.includes(sentence), true);
  assert.equal(exactSentenceContainingSpan(paragraph, '문장은'), null);
});

test('2–4토큰 exact 명사구를 단일어보다 우선하고 source-wide evidenceId를 보존한다', () => {
  const focusText = '이 설명은 프록시 객체와 트랜잭션 어드바이스, 순환 의존성 문제, 횟단 관심사를 비교하여 백엔드 프록시 동작을 충분히 정확하게 설명합니다.';
  const otherText = '추가 설명은 영속성 컨텍스트와 캐시 구조, 메모리 구조, 비동기 처리, 테스트 격리 전략을 함께 다루며 원문 명사구의 정확한 근거를 제공합니다.';
  const source = {
    markdown: `${focusText}\n\n${otherText}`,
    categoryId: 'spring-application',
    evidence: [
      { id: 'be-phrase:E001', text: focusText, kind: 'prose', heading: '본문' },
      { id: 'be-phrase:E002', text: otherText, kind: 'prose', heading: '본문' },
    ],
  };
  const focus = source.evidence[0];
  const candidates = quoteSpanCandidates(focusText);
  assert.equal(quoteSpanCandidatePools(focusText)[0].role, '원문·완전 명사구');
  assert.equal(candidates.every((value) => value.includes(' ')), true);
  assert.equal(candidates.includes('횟단 관심사'), true);
  assert.equal(candidates.includes('순환 의존성 문제'), true);
  const catalog = sourceWideQuoteCandidateCatalog(source, focus);
  assert.equal(catalog.some(({ value, evidenceId }) => (
    value === '영속성 컨텍스트' && evidenceId === 'be-phrase:E002'
  )), true);

  const candidate = buildQuoteCompletionCandidate({
    slotId: 'be-phrase:1',
    sourceId: 'be-phrase',
    categoryId: source.categoryId,
    evidenceId: focus.id,
    answerSpan: '횟단 관심사',
    distractors: ['영속성 컨텍스트', '캐시 구조', '비동기 처리'],
  }, {
    slotId: 'be-phrase:1',
    sourceId: 'be-phrase',
    focusEvidenceId: focus.id,
    expectedCorrectIndex: 2,
  }, source, new Map());
  assert.ok(candidate);
  assert.equal(candidate.choices[candidate.correctIndex], '횟단 관심사');
  assert.equal(candidate._distractorEvidenceIds[candidate.correctIndex], '');
  assert.equal(candidate._distractorEvidenceIds.filter((id) => id === 'be-phrase:E002').length, 3);
  assert.equal(structurallyValidate({ ...candidate, slotId: 'be-phrase:1' }, {
    slotId: 'be-phrase:1', sourceId: 'be-phrase', focusEvidenceId: focus.id, expectedCorrectIndex: 2,
  }, source, new Map()).id, candidate.id);
  const wrongIds = candidate._distractorEvidenceIds.map((id, index) => (
    index === candidate.correctIndex ? '' : focus.id
  ));
  assert.equal(structurallyValidate({
    ...candidate,
    slotId: 'be-phrase:1',
    _distractorEvidenceIds: wrongIds,
  }, {
    slotId: 'be-phrase:1', sourceId: 'be-phrase', focusEvidenceId: focus.id, expectedCorrectIndex: 2,
  }, source, new Map()), null);
});

test('quote-completion은 exact span을 빈칸으로 바꾸고 선택지·근거를 해시 위치로 함께 재배치한다', () => {
  const text = '첫 문장은 프록시 객체, 순환 의존성 문제, 테스트 코드, 캐시 구조를 비교하여 충분히 설명합니다. 다음 문장은 횟단 관심사를 별도의 핵심 주제로 자세하게 소개합니다.';
  const spanCandidates = quoteSpanCandidates(text);
  const answerSpan = '횟단 관심사';
  const distractors = ['프록시 객체', '순환 의존성 문제', '테스트 코드'];
  assert.equal(spanCandidates.includes(answerSpan), true);
  assert.equal(distractors.every((choice) => spanCandidates.includes(choice)), true);
  const evidenceSentence = exactSentenceContainingSpan(text, answerSpan);
  assert.ok(evidenceSentence);
  assert.notEqual(evidenceSentence, text);
  const source = {
    markdown: text,
    headings: [],
    categoryId: 'spring-application',
    evidence: [{
      id: 'be-quote:E001',
      text,
      start: 0,
      end: text.length,
      kind: 'prose',
      heading: '본문',
    }],
  };
  const candidate = buildQuoteCompletionCandidate(
    {
      slotId: 'be-quote:1',
      sourceId: 'be-quote',
      categoryId: 'spring-application',
      evidenceId: 'be-quote:E001',
      answerSpan,
      distractors: distractors.slice(0, 3),
    },
    {
      slotId: 'be-quote:1',
      sourceId: 'be-quote',
      focusEvidenceId: 'be-quote:E001',
      expectedCorrectIndex: 2,
      attempts: 1,
    },
    source,
    new Map(),
  );
  assert.ok(candidate);
  assert.equal(candidate._questionMode, 'quote-completion');
  assert.equal(candidate._answerSpan, answerSpan);
  assert.equal(candidate.correctIndex, 2);
  assert.equal(candidate.choices[2], answerSpan);
  assert.equal(candidate._distractorEvidenceIds[2], '');
  assert.equal(candidate._distractorEvidenceIds.filter((id) => id === 'be-quote:E001').length, 3);
  assert.equal(candidate._maskedEvidence.includes('[빈칸]'), true);
  assert.equal(candidate._evidenceSentence, evidenceSentence);
  assert.equal(candidate.evidenceQuote, text);
  assert.equal(candidate.evidenceQuote.includes(candidate._evidenceSentence), true);
  assert.equal(candidate._maskedEvidence.replace('[빈칸]', candidate.choices[candidate.correctIndex]), evidenceSentence);
  assert.equal(candidate.explanation.includes(evidenceSentence), true);
  assert.equal(candidate.explanation.includes(text), false);

  const decision = {
    selectedCorrectIndex: candidate.correctIndex,
    singleAnswer: true,
    ungrammaticalIndices: [],
    unnaturalIndices: [],
    plausibleWrongIndices: [],
    unsupportedIndices: [],
    explanationGrounded: true,
    evidenceId: 'be-quote:E001',
    accepted: true,
    reason: '정답을 삽입하면 exact 원문이 복원되고 세 오답은 모두 다른 문장을 만듭니다.',
  };
  assert.equal(reviewDecisionAudit(candidate, decision, source.evidence).passed, true);
  assert.equal(reviewDecisionAudit({ ...candidate, _maskedEvidence: '[빈칸] 손상' }, decision, source.evidence).passed, false);
  assert.equal(reviewDecisionAudit({ ...candidate, _evidenceSentence: `${evidenceSentence} 손상` }, decision, source.evidence).passed, false);
  assert.equal(reviewDecisionAudit({ ...candidate, evidenceQuote: '다른 원문 문장입니다.' }, decision, source.evidence).passed, false);
  assert.equal(reviewDecisionAudit(candidate, { ...decision, unnaturalIndices: [1] }, source.evidence).passed, false);
  assert.equal(reviewDecisionAudit(candidate, { ...decision, plausibleWrongIndices: [0] }, source.evidence).passed, false);
  assert.equal(reviewDecisionAudit(candidate, { ...decision, unsupportedIndices: [3] }, source.evidence).passed, false);
  assert.equal(reviewDecisionAudit(candidate, { ...decision, ungrammaticalIndices: undefined }, source.evidence).passed, false);
  const schema = reviewSchema([candidate]);
  assert.deepEqual(schema.properties.decisions.items.properties.questionId.enum, [candidate.id]);
  assert.deepEqual(schema.properties.decisions.items.properties.evidenceId.enum, ['be-quote:E001']);
  assert.equal(schema.properties.decisions.items.required.includes('plausibleWrongIndices'), true);
  assert.equal(schema.properties.decisions.items.properties.plausibleWrongIndices.uniqueItems, true);
  assert.equal(schema.properties.decisions.items.properties.reason.maxLength, 160);
});

test('be-57·be-42처럼 원문에서 그럴듯하거나 반박할 수 없는 오답은 검증 통과하지 못한다', () => {
  const text = '핵심 예시는 외부 네트워크 상황을 자세히 설명하고 요청 전달 경로를 충분히 정리합니다. 비교 대상에는 회사 내부 네트워크 환경, 계좌 이체 트랜잭션, 데이터 일관성 문제점, 복구 처리 절차가 포함됩니다.';
  const source = {
    markdown: text,
    categoryId: 'network-web',
    evidence: [{ id: 'be-semantic:E001', text, kind: 'prose', heading: '본문' }],
  };
  const slot = {
    slotId: 'be-semantic:1', sourceId: 'be-semantic', focusEvidenceId: 'be-semantic:E001', expectedCorrectIndex: 2,
  };
  const candidate = buildQuoteCompletionCandidate({
    slotId: slot.slotId,
    sourceId: slot.sourceId,
    categoryId: source.categoryId,
    evidenceId: slot.focusEvidenceId,
    answerSpan: '외부 네트워크 상황',
    distractors: ['회사 내부 네트워크 환경', '계좌 이체 트랜잭션', '데이터 일관성 문제점'],
  }, slot, source, new Map());
  assert.ok(candidate);
  const baseDecision = {
    selectedCorrectIndex: candidate.correctIndex,
    singleAnswer: true,
    ungrammaticalIndices: [],
    unnaturalIndices: [],
    plausibleWrongIndices: [],
    unsupportedIndices: [],
    explanationGrounded: true,
    evidenceId: candidate._evidenceId,
    accepted: true,
    reason: '기계적 복원과 의미 모호성을 개별로 판정했습니다.',
  };
  const plausibleIndices = ['회사 내부 네트워크 환경', '계좌 이체 트랜잭션']
    .map((choice) => candidate.choices.indexOf(choice));
  const audit = reviewDecisionAudit(candidate, {
    ...baseDecision,
    plausibleWrongIndices: plausibleIndices,
  }, source.evidence);
  assert.equal(audit.passed, false);
  assert.equal(audit.reasons.some((reason) => reason.includes('그럴듯한 오답')), true);
  assert.equal(reviewDecisionAudit(candidate, {
    ...baseDecision,
    unsupportedIndices: [candidate.choices.indexOf('데이터 일관성 문제점')],
  }, source.evidence).passed, false);
});

test('quote-completion은 반복 span·stopword·정답을 포함한 오답을 구조 단계에서 거부한다', () => {
  const text = 'Spring 프록시는 프록시 객체를 생성하고 빈을 대체하며 트랜잭션 설정을 적용하기 위한 충분한 길이의 원문 설명을 제공합니다.';
  const source = {
    markdown: text,
    headings: [],
    categoryId: 'spring-application',
    evidence: [{ id: 'be-repeat:E001', text, kind: 'prose', heading: '본문' }],
  };
  const slot = { slotId: 'be-repeat:1', sourceId: 'be-repeat', focusEvidenceId: 'be-repeat:E001' };
  const base = {
    slotId: slot.slotId,
    sourceId: slot.sourceId,
    categoryId: 'spring-application',
    evidenceId: 'be-repeat:E001',
    distractors: ['원본 객체', '빈 정의', '직접 클래스'],
  };
  assert.equal(buildQuoteCompletionCandidate({ ...base, answerSpan: '프록시' }, slot, source, new Map()), null);
  assert.equal(buildQuoteCompletionCandidate({ ...base, answerSpan: '그리고' }, slot, source, new Map()), null);
  assert.equal(buildQuoteCompletionCandidate({
    ...base,
    answerSpan: '프록시 객체',
    distractors: ['프록시 객체 복제', '빈 정의', '직접 클래스'],
  }, slot, source, new Map()), null);
});

test('quote-completion은 빈칸 앞뒤 토큰과 같은 오답으로 국소 반복을 만들지 않는다', () => {
  const sentence = 'Spring Dynamic Proxy Factory Service Handler는 설명을 제공합니다.';
  assert.equal(hasNearbyChoiceStemCollision(sentence, 'Spring', ['Dynamic']), true);
  assert.equal(hasNearbyChoiceStemCollision(sentence, 'Spring', ['Proxy']), true);
  assert.equal(hasNearbyChoiceStemCollision(sentence, 'Spring', ['Factory']), true);
  assert.equal(hasNearbyChoiceStemCollision(sentence, 'Spring', ['Handler']), false);
  assert.equal(hasNearbyChoiceStemCollision('서비스는 객체와 함께 동작합니다.', '객체와', ['서비스를']), true);
  assert.equal(hasNearbyChoiceStemCollision(
    '반면, 가변 크기 할당 방식은 필요한 크기만큼 프로세스에 할당합니다.',
    '가변 크기 할당 방식',
    ['필요한 크기만큼 프로세스'],
  ), true);
});

test('선택지와 오답 근거를 같은 전단사 순열로 재배치한다', () => {
  const choices = ['정답', '오답 A', '오답 B', '오답 C'];
  const distractorEvidenceIds = ['', 'E-A', 'E-B', 'E-C'];
  const result = permuteCandidateChoices(choices, distractorEvidenceIds, 0, 2, 'be-shuffle:1');
  assert.deepEqual(result.permutation.slice().sort((left, right) => left - right), [0, 1, 2, 3]);
  assert.equal(new Set(result.permutation).size, 4);
  assert.equal(result.correctIndex, 2);
  assert.equal(result.choices[2], '정답');
  assert.equal(result.distractorEvidenceIds[2], '');
  for (let newIndex = 0; newIndex < 4; newIndex += 1) {
    const oldIndex = result.permutation[newIndex];
    assert.equal(result.choices[newIndex], choices[oldIndex]);
    assert.equal(result.distractorEvidenceIds[newIndex], distractorEvidenceIds[oldIndex]);
  }
});

test('슬롯 해시 정답 위치는 0–3 전체로 분산된다', () => {
  const indices = Array.from({ length: 64 }, (_, index) => desiredCorrectIndex(`be-spread:${index + 1}`));
  assert.deepEqual([...new Set(indices)].sort((left, right) => left - right), [0, 1, 2, 3]);
});

test('accepted가 true여도 문항 전제가 원문에서 도출되지 않으면 거부한다', () => {
  const decision = validReviewDecision();
  decision.premiseEntailed = false;
  assert.equal(reviewDecisionPasses(REVIEW_CANDIDATE, decision, REVIEW_SOURCE), false);
});

test('영문·코드 핵심 토큰을 추출해 정답 근거와 기계적으로 대조한다', () => {
  assert.deepEqual(
    technicalTokens('private 메서드에 @Transactional과 AOP를 적용한다.'),
    ['private', '@transactional', 'aop'],
  );
});

test('v7의 private·self invocation 혼합 문항은 근거 토큰 검사에서 구조 탈락한다', () => {
  const evidence = 'Spring AOP는 같은 클래스 내에서 메서드를 직접 호출할 때 프록시를 거치지 않습니다.';
  const diagnostics = [];
  const result = structurallyValidate(
    {
      slotId: 'be-43:1',
      sourceId: 'be-43',
      categoryId: 'spring-application',
      question: 'private 메서드에 @Transactional을 선언한 경우의 이유는?',
      choices: ['Spring AOP 프록시를 거치지 않는다.', '프록시를 두 번 거친다.', '다른 클래스를 호출한다.', '외부 호출로 처리한다.'],
      correctIndex: 0,
      explanation: '같은 클래스 내부 호출은 프록시를 거치지 않습니다.',
      evidenceId: 'be-43:E004',
      distractorEvidenceIds: ['', 'be-43:E004', 'be-43:E004', 'be-43:E004'],
    },
    { slotId: 'be-43:1', sourceId: 'be-43' },
    {
      markdown: evidence,
      headings: [],
      categoryId: 'spring-application',
      evidence: [{ id: 'be-43:E004', text: evidence }],
    },
    new Map(),
    diagnostics,
  );
  assert.equal(result, null);
  assert.match(diagnostics[0].reason, /정답 근거에 없는 영문\/\ucf54드 핵심 토큰/u);
  assert.match(diagnostics[0].reason, /private/u);
});

test('같은 결론으로 시작하는 yes\/no 선택지는 구조 탈락한다', () => {
  const diagnostics = [];
  const result = structurallyValidate(
    {
      slotId: 'be-43:1',
      sourceId: 'be-43',
      categoryId: 'spring-application',
      question: 'private 메서드의 트랜잭션이 동작할까요?',
      choices: [
        '동작하지 않습니다. 프록시를 거치지 않습니다.',
        '동작합니다. JDK 프록시를 쓹니다.',
        '동작하지 않습니다. CGLIB을 쓹니다.',
        '동작합니다. AOP가 적용됩니다.',
      ],
      correctIndex: 0,
      explanation: '같은 클래스 내부 호출은 프록시를 거치지 않습니다.',
      evidenceId: 'be-43:E004',
      distractorEvidenceIds: ['', 'be-43:E004', 'be-43:E004', 'be-43:E004'],
    },
    { slotId: 'be-43:1', sourceId: 'be-43' },
    {
      markdown: REVIEW_EVIDENCE,
      headings: [],
      categoryId: 'spring-application',
      evidence: [{ id: 'be-43:E004', text: REVIEW_EVIDENCE }],
    },
    new Map(),
    diagnostics,
  );
  assert.equal(result, null);
  assert.equal(diagnostics[0].reason, '선택지 핵심 결론이 중복됨');
});

test('focus 근거는 충분한 설명 문장만 허용하고 코드·링크·추가 학습을 제외한다', () => {
  const prose = '이 문단은 백엔드 기술의 동작 조건과 결과를 원문 한 문단 안에서 명확하게 설명하여 객관식 문항의 근거로 사용할 수 있습니다.';
  assert.equal(eligibleFocusEvidence({ kind: 'prose', text: prose, heading: '본문' }), true);
  assert.equal(eligibleFocusEvidence({ kind: 'code', text: prose, heading: '본문' }), false);
  assert.equal(eligibleFocusEvidence({ kind: 'prose', text: 'log.info("catch exception");', heading: '본문' }), false);
  assert.equal(eligibleFocusEvidence({
    kind: 'prose',
    text: '[Spring 공식 문서](https://example.com/spring-documentation-reference)',
    heading: '추가 학습 자료를 제공합니다.',
  }), false);
  assert.equal(eligibleFocusEvidence({ kind: 'prose', text: '짧은 설명입니다.', heading: '본문' }), false);
});

test('article 전략은 모든 글을 1번씩 포함하고 작은 카테고리를 12슬롯으로 보충한다', () => {
  const architecture = Array.from({ length: 9 }, (_, index) => ({
    id: `architecture-${index + 1}`,
    categoryId: 'architecture-design',
  }));
  const security = Array.from({ length: 11 }, (_, index) => ({
    id: `security-${index + 1}`,
    categoryId: 'test-security',
  }));
  const questions = [...architecture, ...security];
  const documents = new Map(questions.map((question, index) => [
    question.id,
    {
      markdown: 'x'.repeat(index + 1),
      evidence: [{ kind: 'prose', text: STRICT_SLOT_EVIDENCE }],
    },
  ]));
  const slots = buildSlots(questions, documents, {
    strategy: 'article',
    articleMinimumPerCategory: 12,
  });

  const architectureSlots = slots.filter(({ sourceId }) => sourceId.startsWith('architecture-'));
  const securitySlots = slots.filter(({ sourceId }) => sourceId.startsWith('security-'));
  assert.equal(architectureSlots.length, 12);
  assert.equal(securitySlots.length, 12);
  assert.deepEqual(
    new Set(slots.map(({ sourceId }) => sourceId)),
    new Set(questions.map(({ id }) => id)),
  );
  assert.deepEqual(
    architectureSlots.filter(({ sourceId }) => sourceId === 'architecture-9').map(({ sequence }) => sequence),
    [1, 2, 3, 4],
  );
});

test('target 전략은 카테고리별 서로 다른 글을 우선해 12슬롯을 만든다', () => {
  const questions = Array.from({ length: 9 }, (_, index) => ({
    id: `target-${index + 1}`,
    categoryId: 'architecture-design',
  }));
  const documents = new Map(questions.map((question, index) => [
    question.id,
    {
      markdown: 'x'.repeat(index + 1),
      evidence: [{ kind: 'prose', text: STRICT_SLOT_EVIDENCE }],
    },
  ]));
  const slots = buildSlots(questions, documents, {
    strategy: 'target',
    questionsPerCategory: 12,
  });

  assert.equal(slots.length, 12);
  assert.equal(new Set(slots.map(({ sourceId }) => sourceId)).size, 9);
  assert.deepEqual(
    slots.filter(({ sourceId }) => sourceId === 'target-9').map(({ sequence }) => sequence),
    [1, 2, 3, 4],
  );
});

test('target 전략은 no-eligible-strict-cloze 글을 제외하고 같은 카테고리 글로 부족 슬롯을 보충한다', () => {
  const questions = Array.from({ length: 4 }, (_, index) => ({
    id: `strict-target-${index + 1}`,
    categoryId: 'architecture-design',
  }));
  const documents = new Map(questions.map((question, index) => {
    const text = index === 0
      ? '이 문단은 하나의 기술 개념만 짧게 설명하여 안전한 객관식 선택지 조합을 구성할 수 없는 원문입니다.'
      : STRICT_SLOT_EVIDENCE;
    const evidence = { id: `${question.id}:E001`, kind: 'prose', text, heading: '본문' };
    return [question.id, { ...question, markdown: `${text}${'x'.repeat(index)}`, evidence: [evidence] }];
  }));
  assert.equal(strictClozeEvidenceViable(
    documents.get('strict-target-1'),
    documents.get('strict-target-1').evidence[0],
  ), false);
  assert.equal(strictClozeEvidenceViable(
    documents.get('strict-target-2'),
    documents.get('strict-target-2').evidence[0],
  ), true);

  const slots = buildSlots(questions, documents, {
    strategy: 'target',
    questionsPerCategory: 5,
  });
  assert.equal(slots.length, 5);
  assert.equal(slots.some(({ sourceId }) => sourceId === 'strict-target-1'), false);
  assert.deepEqual(new Set(slots.map(({ sourceId }) => sourceId)), new Set([
    'strict-target-2', 'strict-target-3', 'strict-target-4',
  ]));
  assert.deepEqual(
    slots.filter(({ sourceId }) => sourceId === 'strict-target-4').map(({ sequence }) => sequence),
    [1, 2, 3],
  );
});

test('카테고리 카운터는 없는 카테고리도 0으로 표시한다', () => {
  const counts = quizCategoryCounts([
    { categoryId: 'architecture-design' },
    { categoryId: 'architecture-design' },
  ]);
  assert.equal(counts['architecture-design'], 2);
  assert.equal(counts['test-security'], 0);
  assert.ok(underfilledQuizCategories([]).every(({ count }) => count === 0));
});
