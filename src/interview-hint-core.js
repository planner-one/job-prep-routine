const CATEGORY_HINTS = Object.freeze({
  'spring-application': Object.freeze([
    '개념을 한 문장으로 정의합니다.',
    '요청·트랜잭션·객체가 어떤 순서로 움직이는지 설명합니다.',
    '부작용과 적용 여부를 판단하는 기준으로 마무리합니다.',
  ]),
  'persistence-database': Object.freeze([
    '문제가 생기는 저장·조회 지점을 먼저 짚습니다.',
    'JPA 또는 데이터베이스가 내부에서 어떻게 동작하는지 연결합니다.',
    '정합성·성능·운영 비용 사이의 선택 기준을 덧붙입니다.',
  ]),
  'network-http': Object.freeze([
    '용어와 책임 범위를 먼저 구분합니다.',
    '클라이언트부터 서버까지의 요청 흐름을 설명합니다.',
    '장애·보안·성능 상황에서의 대응을 덧붙입니다.',
  ]),
  'distributed-cache': Object.freeze([
    '분산 환경에서 생기는 문제를 먼저 정의합니다.',
    '문제가 발생하는 원인과 전파 방식을 설명합니다.',
    '일관성·가용성·운영 복잡도 사이의 선택을 정리합니다.',
  ]),
  'os-concurrency': Object.freeze([
    '프로세스·스레드·메모리 같은 핵심 자원을 정의합니다.',
    '실행 중 어떤 상태 전환이나 경쟁이 일어나는지 설명합니다.',
    '성능 또는 안전성 문제를 줄이는 방법으로 마무리합니다.',
  ]),
  'java-language': Object.freeze([
    '언어 또는 자료구조의 성질을 먼저 정의합니다.',
    '코드 실행 시 내부 동작과 자료의 변화를 설명합니다.',
    '복잡도·메모리·예외 상황의 주의점을 덧붙입니다.',
  ]),
  'architecture-design': Object.freeze([
    '해결하려는 설계 문제와 책임을 먼저 설명합니다.',
    '구성 요소가 어떻게 협력하는지 말합니다.',
    '장점만이 아니라 한계와 적용 조건도 정리합니다.',
  ]),
  'test-security': Object.freeze([
    '막으려는 위험 또는 검증하려는 품질 문제를 정의합니다.',
    '방어·검증 메커니즘이 동작하는 방식을 설명합니다.',
    '확인 방법과 운영 시 주의점을 덧붙입니다.',
  ]),
});

const DEFAULT_HINT = Object.freeze([
  '핵심 용어를 한 문장으로 정의합니다.',
  '동작 흐름 또는 원인을 설명합니다.',
  '장단점과 적용 판단을 덧붙입니다.',
]);

function cleanCandidate(value) {
  if (typeof value !== 'string') return '';
  return value
    .replace(/!\[[^\]]*\]\([^)]*\)/gu, '')
    .replace(/\[[^\]]*\]\([^)]*\)/gu, '')
    .replace(/[`*_~#>|]/gu, '')
    .replace(/[😀🤔🤓]/gu, '')
    .replace(/\s+/gu, ' ')
    .trim()
    .replace(/[?？]+$/u, '')
    .trim();
}

function isUsefulKeyword(value) {
  if (value.length < 2 || value.length > 42) return false;
  if (/^(충분히 고민해보신 다음에 펼쳐보세요|추가 학습|참고 자료)$/u.test(value)) return false;
  return true;
}

/**
 * 원문을 답안으로 렌더하지 않고, 강조·코드·소제목에 나온 표현만 힌트로 추린다.
 */
export function extractInterviewHintKeywords(markdown, limit = 5) {
  if (typeof markdown !== 'string' || !Number.isInteger(limit) || limit < 1) return [];
  const result = [];
  const seen = new Set();
  const append = (raw) => {
    const candidate = cleanCandidate(raw);
    const key = candidate.toLocaleLowerCase('ko-KR');
    if (!isUsefulKeyword(candidate) || seen.has(key) || result.length >= limit) return;
    seen.add(key);
    result.push(candidate);
  };

  for (const match of markdown.matchAll(/`([^`\n]+)`/gu)) append(match[1]);
  for (const match of markdown.matchAll(/\*\*([^*\n]+)\*\*/gu)) append(match[1]);
  for (const match of markdown.matchAll(/^#{2,6}\s+(.+)$/gmu)) append(match[1]);
  return result;
}

export function interviewAnswerOutline(question) {
  const categoryId = question?.categoryId;
  return [...(CATEGORY_HINTS[categoryId] ?? DEFAULT_HINT)];
}
