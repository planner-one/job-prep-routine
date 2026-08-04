window.INTERVIEW_DATA = window.INTERVIEW_DATA || {};

const feedshopFollowups = (factQuestion, factDefense, choiceQuestion, choiceDefense, failureQuestion, failureDefense) => [
  { type: '사실 확인', question: factQuestion, defense: factDefense },
  { type: '선택 압박', question: choiceQuestion, defense: choiceDefense },
  { type: '장애·대안', question: failureQuestion, defense: failureDefense },
];

const feedshopQuestion = (question) => ({
  category: '이력서 기술',
  project: 'FeedShop',
  ...question,
});

window.INTERVIEW_DATA.feedshop = [
  feedshopQuestion({
    id: 'FS-001', topic: 'Redis', stage: '실제 사용 위치', difficulty: '기초', priority: '핵심', minutes: 5,
    question: 'FeedShop에서 Redis를 어디에, 어떤 목적으로 사용했나요?',
    answer: {
      compact: {
        conclusion: 'FeedShop에서는 Redis를 이벤트 목록 캐시와 피드 투표 카운터에 각각 사용했습니다.',
        evidence1: 'QueryDSL로 N+1을 줄인 뒤 캐시를 적용해 반복되는 DB 목록 조회 문제를 해결했습니다.',
        evidence2: 'DB 유니크 제약과 Redis INCR의 책임을 분리해 중복 방지와 원자적 갱신을 확보했습니다.',
      },
      conclusion: 'Redis는 이벤트 목록의 반복 조회를 줄이는 캐시와 피드 투표 수를 원자적으로 증가시키는 카운터, 두 가지 용도로 사용했습니다.',
      evidence1: '이벤트 목록은 QueryDSL로 N+1을 먼저 줄인 뒤 @Cacheable 기반 Redis 캐시를 적용해 재요청의 DB 조회를 분리했습니다.',
      evidence2: '투표는 DB 유니크 제약으로 중복 저장을 막고, 빈번한 카운터 갱신은 Redis INCR로 처리해 DB 카운터 락 경합과 책임을 분리했습니다.',
      keywords: ['이벤트 목록 캐시', '투표 카운터', '@Cacheable', 'INCR', '역할 분리'],
      caution: '캐시와 투표 카운터를 하나의 개선 사례처럼 섞지 말고 목적과 정합성 기준을 각각 설명한다.',
    },
    followups: feedshopFollowups(
      '캐시에 저장한 값과 카운터 값의 형태는 같았나요?', '목적이 달랐다고 먼저 답한다. 이벤트 목록은 조회 결과, 투표는 숫자 카운터이며 정확한 직렬화·키 형식은 설정 코드 기준으로 확인한다.',
      '두 용도 모두 Redis여야 했나요?', '목록은 공유 캐시, 카운터는 원자 연산이 선택 이유였으며 각각 DB 조회 최적화나 DB 원자 업데이트가 대안이라고 답한다.',
      'Redis가 중단되면 두 기능은 어떻게 달라지나요?', '키 미스 폴백과 연결 장애를 구분한다. 연결 장애의 자동 폴백은 확인되지 않았고 목록·카운터 모두 장애 정책을 별도로 설계해야 한다.'
    ),
    evidence: { status: '확인됨', note: '두 Redis 사용 위치가 v5_3과 FeedShop 코드·Wiki에서 확인된다.', sources: ['v5_3 이력서 p.1-2', 'FeedShop 코드·Wiki'] },
    warnings: ['Redis 연결 장애 시 자동 DB 폴백을 구현했다고 말하지 않는다.'],
    resumeClaims: ['이벤트 목록 Redis 캐시', 'Redis INCR 투표 수 갱신'],
    tags: ['Redis', '캐시', '투표 정합성', '1단계'],
  }),
  feedshopQuestion({
    id: 'FS-002', topic: 'Redis', stage: '기초 개념', difficulty: '기초', priority: '핵심', minutes: 5,
    question: 'Redis와 INCR 명령은 무엇이며, 왜 동시 요청에서 유용한가요?',
    answer: {
      compact: {
        conclusion: 'Redis는 메모리 기반 키-값 저장소이며, INCR은 숫자를 원자적으로 증가시키는 명령입니다.',
        evidence1: '읽기와 쓰기를 나누지 않고 한 명령으로 증가시켜 동시 요청의 갱신 손실을 해결했습니다.',
        evidence2: 'DB에는 투표 유일성을, INCR에는 카운터 증가를 맡겨 정합성 기준을 확보했습니다.',
      },
      conclusion: 'Redis는 메모리 중심의 키-값 데이터 저장소이고, INCR은 숫자 값을 서버에서 원자적으로 증가시키는 명령입니다.',
      evidence1: '여러 요청이 값을 읽고 더한 뒤 다시 쓰면 갱신 손실이 생길 수 있지만 INCR은 증가 연산을 한 명령으로 처리합니다.',
      evidence2: 'FeedShop에서는 투표 레코드의 유일성은 DB가 보장하고, 표시용 투표 수 증가는 INCR로 분리했습니다.',
      keywords: ['인메모리', '키-값', '원자 연산', 'INCR', '갱신 손실'],
      caution: 'Redis가 단일 스레드이므로 모든 복합 업무가 자동으로 원자적이라고 일반화하지 않는다.',
    },
    followups: feedshopFollowups(
      'INCR 대상 키가 없으면 어떻게 되나요?', 'Redis에서는 정수 0에서 시작해 증가하지만, 애플리케이션의 초기화·DB 기준값 정책은 별도 확인이 필요하다고 답한다.',
      'DB의 UPDATE count = count + 1도 원자적이지 않나요?', '맞다고 인정하고 DB 원자 업데이트도 대안이며, 당시에는 중복 저장과 카운터 경합의 책임을 분리하려고 Redis를 선택했다고 답한다.',
      'Cluster에서도 INCR은 안전한가요?', '한 키에 대한 INCR은 원자적이지만 여러 키를 묶는 연산과 슬롯 이동·장애 복구는 별도 고려가 필요하다고 답한다.'
    ),
    evidence: { status: '일반론', note: 'Redis·INCR 개념과 프로젝트 사용 맥락을 연결한 기초 질문이다.', sources: ['FeedShop 코드·Wiki', '기술 질문 리스트'] },
    warnings: [], resumeClaims: ['Redis INCR로 투표 수 처리'], tags: ['Redis', 'INCR', '원자성', '2단계'],
  }),
  feedshopQuestion({
    id: 'FS-003', topic: 'Redis', stage: '선택 이유', difficulty: '중급', priority: '핵심', minutes: 6,
    question: '왜 중복 투표 방지와 투표 수 갱신을 하나의 수단으로 해결하지 않았나요?',
    answer: {
      compact: {
        conclusion: '중복 저장과 카운터 경합은 실패 기준이 달라 DB와 Redis로 책임을 분리했습니다.',
        evidence1: 'DB 유니크 제약으로 사용자별 투표 기록의 최종 정합성을 확보했습니다.',
        evidence2: 'Redis INCR로 카운터 갱신을 분리하고 DB COUNT를 원본으로 둬 복구 기준을 마련했습니다.',
      },
      conclusion: '중복 저장과 카운터 경합은 실패 기준이 다른 문제라서 DB와 Redis에 책임을 나눴습니다.',
      evidence1: '사용자별 중복 투표는 최종 데이터 규칙이므로 (event_id, voter_id) 유니크 제약을 DB의 최종 방어선으로 뒀습니다.',
      evidence2: '빈번하게 변하는 투표 수는 Redis INCR로 갱신하고, 불일치가 생기면 DB 투표 레코드 수를 원본으로 복구하도록 설계했습니다.',
      keywords: ['책임 분리', 'DB 유니크', 'Redis INCR', '원본 데이터', '복구 기준'],
      caution: 'DB와 Redis를 나눴기 때문에 즉시 강한 일관성이 생겼다고 말하지 않는다. 오히려 일시적 불일치 구간이 존재한다.',
    },
    followups: feedshopFollowups(
      '정합성의 최종 기준은 무엇인가요?', '중복 여부와 최종 투표 기록은 DB이며 Redis 카운터는 DB COUNT로 재계산할 수 있는 파생 값이라고 답한다.',
      'Redis 없이 DB 하나로 처리하는 편이 단순하지 않나요?', '단순성과 강한 일관성은 장점이지만 카운터 행 경합과 쓰기 집중을 고려해 분리했다고 답하고 규모가 작다면 DB만 쓰는 대안도 인정한다.',
      'DB 저장은 성공하고 INCR이 실패하면요?', 'DB가 원본이므로 요청 결과·재시도·보정 정책이 필요하며 현재 구현은 분산 트랜잭션이 아니라는 한계를 분명히 한다.'
    ),
    evidence: { status: '확인됨', note: '유니크 제약, INCR, DB 기준 복구 구조가 코드에서 확인된다.', sources: ['FeedVote.java', 'FeedVoteService.java', 'FeedVoteScheduler.java'] },
    warnings: ['DB와 Redis 사이 원자성을 보장한다고 표현하지 않는다.'], resumeClaims: ['중복 저장 차단과 카운터 갱신 분리'], tags: ['Redis', '투표 정합성', '책임분리', '3단계'],
  }),
  feedshopQuestion({
    id: 'FS-004', topic: '캐시', stage: '선택 이유', difficulty: '중급', priority: '핵심', minutes: 6,
    question: '왜 Redis 캐시만 먼저 적용하지 않고 QueryDSL로 쿼리 구조부터 개선했나요?',
    answer: {
      compact: {
        conclusion: '캐시는 Cache Miss의 N+1을 해결하지 못하므로 쿼리 구조부터 개선했습니다.',
        evidence1: 'leftJoin과 fetchJoin으로 연관 데이터의 반복 조회 문제를 해결했습니다.',
        evidence2: '그다음 Redis를 적용해 재요청의 DB 접근을 없애고 반복 조회 성능을 확보했습니다.',
      },
      conclusion: '캐시는 반복 조회 비용을 줄일 뿐 Cache Miss 때의 N+1 구조를 해결하지 못하므로 원인을 먼저 고쳤습니다.',
      evidence1: '기존 조회는 연관 데이터를 반복 조회하고 전체 결과를 메모리에서 필터링해 요청당 SQL이 42회 발생했습니다.',
      evidence2: 'leftJoin·fetchJoin으로 SQL을 2회까지 줄인 뒤 Redis를 적용해 Cache Hit 재요청의 SQL을 0회로 분리했습니다.',
      keywords: ['원인 우선', 'Cache Miss', 'N+1', 'fetchJoin', '반복 비용'],
      caution: '캐시가 N+1 자체를 제거했다고 말하지 않고 QueryDSL 단계와 Redis 단계를 분리한다.',
    },
    followups: feedshopFollowups(
      'Cache Miss 때 실제 SQL은 몇 회였나요?', 'QueryDSL 개선 후 목록·카운트 쿼리를 포함해 2회라고 답하되 실제 요청과 페이징 조건을 함께 설명한다.',
      '응답 속도만 중요하면 캐시부터 넣는 편이 빠르지 않나요?', '단기 개선은 가능하지만 원인이 남아 초기 요청·만료 직후·장애 시 병목이 재현되므로 쿼리를 먼저 고쳤다고 답한다.',
      '데이터가 매우 자주 바뀌면 같은 선택을 하나요?', '캐시 효율과 무효화 비용이 낮아지므로 쿼리 최적화 중심으로 두고 캐시 범위·TTL을 재평가한다고 답한다.'
    ),
    evidence: { status: '확인됨', note: 'QueryDSL 선행 후 Redis 적용 순서가 코드·Wiki·이력서에 일치한다.', sources: ['v5_3 이력서 p.2', '이벤트 목록 조회 성능 개선 Wiki'] },
    warnings: [], resumeClaims: ['QueryDSL 쿼리 구조 개선 후 Redis 캐시 적용'], tags: ['캐시', 'QueryDSL', 'N+1', '3단계'],
  }),
  feedshopQuestion({
    id: 'FS-005', topic: '캐시', stage: '구현 흐름', difficulty: '중급', priority: '중요', minutes: 6,
    question: '이벤트 목록 캐시의 @Cacheable, TTL, @CacheEvict는 어떻게 동작했나요?',
    answer: {
      compact: {
        conclusion: '읽기는 @Cacheable로 재사용하고, 변경은 @CacheEvict로 제거하며 TTL을 안전망으로 뒀습니다.',
        evidence1: '변경이 적고 조회가 잦은 이벤트 목록에 적용해 반복 조회 성능을 확보했습니다.',
        evidence2: '변경 시 명시적으로 무효화하고 TTL을 안전망으로 둬 오래된 값의 노출 기간을 제한했습니다.',
      },
      conclusion: '읽기 요청은 @Cacheable로 결과를 재사용하고, 변경 시 @CacheEvict로 오래된 값을 제거하며 TTL을 안전망으로 둔 구조입니다.',
      evidence1: '이력서에는 읽기 빈도가 높고 변경이 적은 이벤트 목록에 세 정책을 적용했다고 명시돼 있습니다.',
      evidence2: '다만 정확한 캐시 키, TTL 초 단위 값, 직렬화 방식과 모든 변경 경로의 eviction 적용 여부는 설정 코드 재확인이 필요합니다.',
      keywords: ['@Cacheable', '@CacheEvict', 'TTL', '캐시 키', '무효화'],
      caution: '과거 답변의 TTL 600초나 unless 조건을 현재 코드 확인 없이 단정하지 않는다.',
    },
    followups: feedshopFollowups(
      '정확한 캐시 키와 TTL은 얼마였나요?', '현재 근거에서 값이 확정되지 않았으므로 설정을 확인한 뒤 답하고 임의 숫자를 말하지 않는다.',
      'TTL만 있으면 @CacheEvict가 없어도 되지 않나요?', 'TTL 동안 오래된 값이 노출될 수 있으므로 변경을 아는 시점의 명시적 무효화가 더 빠른 정합성 회복에 필요하다고 답한다.',
      'Evict 호출이 실패하면요?', 'DB 변경과 캐시 제거가 원자적이지 않으므로 짧은 TTL, 재시도, 버전 키, 이벤트 기반 무효화 등을 요구사항에 맞게 검토한다고 답한다.'
    ),
    evidence: { status: '지원자 확인 필요', note: '정책 사용은 v5_3에 있으나 세부 설정값은 이번 근거 조사에서 독립 확인하지 못했다.', sources: ['v5_3 이력서 p.2', 'FeedShop 캐시 설정 확인 필요'] },
    warnings: ['TTL 값·캐시 키·unless 조건 미확인.'], resumeClaims: ['Redis @Cacheable, TTL, @CacheEvict 정책'], tags: ['캐시', 'TTL', 'Evict', '4단계'],
  }),
  feedshopQuestion({
    id: 'FS-006', topic: '캐시', stage: '장애·한계', difficulty: '심화', priority: '핵심', minutes: 7,
    question: 'Redis 키 미스와 Redis 연결 장애는 각각 어떻게 처리되나요?',
    answer: {
      compact: {
        conclusion: '키 미스는 값 부재라 DB로 복구하지만, 연결 장애는 Redis 명령 자체가 실패하는 별도 상황입니다.',
        evidence1: '키 미스 시 DB COUNT와 setIfAbsent로 카운터를 재구성해 복구 가능성을 확보했습니다.',
        evidence2: '반면 연결 예외를 DB로 자동 전환하는 경로는 확인되지 않아 별도 장애 정책이 필요합니다.',
      },
      conclusion: '키 미스는 애플리케이션이 Redis에 연결된 상태에서 값만 없는 경우이고, 연결 장애는 명령 자체가 실패하는 경우라 같은 폴백으로 보면 안 됩니다.',
      evidence1: '투표 카운터 코드에는 키가 없을 때 DB COUNT를 조회하고 setIfAbsent로 다시 채우는 경로가 확인됩니다.',
      evidence2: '반면 Redis 연결 예외를 잡아 DB로 자동 전환하는 경로는 확인되지 않았으므로 연결 장애까지 폴백된다고 답하면 안 됩니다.',
      keywords: ['키 미스', '연결 장애', 'DB COUNT', 'setIfAbsent', '예외 처리'],
      caution: '“Redis가 죽어도 DB로 폴백됩니다”라는 포괄적 표현을 사용하지 않는다.',
    },
    followups: feedshopFollowups(
      '키가 없을 때 DB 조회 후 Redis를 다시 채우나요?', '현재 FeedVoteService에는 DB COUNT 후 setIfAbsent가 확인된다고 답한다.',
      '연결 장애도 잡아서 폴백하도록 만들면 되지 않나요?', '가능하지만 장애 중 DB로 트래픽이 몰리는 캐시 스탬피드와 지연, 실패 허용 범위를 함께 설계해야 한다고 답한다.',
      '폴백 DB도 느려지면요?', '타임아웃·격리·요청 제한·stale 데이터 허용 여부를 정해야 하며 현재 구현 성과가 아닌 개선 방향으로 구분한다.'
    ),
    evidence: { status: '확인됨', note: '키 미스 복구 코드는 확인됐고 연결 장애 폴백 부재를 경계로 명시한다.', sources: ['FeedVoteService.java', '기존 기술 Q&A 충돌 검토'] },
    warnings: ['연결 장애 자동 폴백 미확인.'], resumeClaims: ['DB 원본 기준 폴백'], tags: ['캐시', 'Redis', '장애', '6단계'],
  }),
  feedshopQuestion({
    id: 'FS-007', topic: '투표 정합성', stage: '실제 사용 위치', difficulty: '기초', priority: '핵심', minutes: 5,
    question: 'FeedShop 투표 기능의 동시성 문제를 한 문장으로 설명해 주세요.',
    answer: {
      compact: {
        conclusion: '동시 요청이 중복 검사를 함께 통과할 수 있는 TOCTOU 경쟁 조건이 핵심 문제였습니다.',
        evidence1: 'existsBy만으로 저장 시점의 유일성을 보장할 수 없어 최종 방어를 DB 제약으로 옮겼습니다.',
        evidence2: 'DB 유니크 제약으로 최종 저장 규칙을 강제해 투표 정합성을 확보했습니다.',
      },
      conclusion: '중복 여부를 조회한 뒤 저장하는 사이에 같은 사용자의 동시 요청이 모두 검사를 통과할 수 있는 TOCTOU 문제였습니다.',
      evidence1: '기존에는 existsBy 조회만 있었고 DB 유니크 제약이 없어 조회 결과가 저장 시점까지 유효하다는 보장이 없었습니다.',
      evidence2: '그래서 최종 저장 규칙은 DB 유니크 제약으로 강제하고 카운터 갱신은 별도로 분리했습니다.',
      keywords: ['TOCTOU', 'existsBy', '동시 요청', 'DB 유니크', '최종 방어선'],
      caution: '실제 중복 건수나 장애 로그가 확인되지 않았다면 “운영 장애가 발생했다”고 말하지 않고 구조적 가능성을 발견했다고 표현한다.',
    },
    followups: feedshopFollowups(
      'TOCTOU는 무엇의 약자인가요?', 'Time Of Check To Time Of Use이며 확인 시점과 사용 시점 사이 상태가 바뀌는 경쟁 조건이라고 답한다.',
      '애플리케이션에서 synchronized를 쓰면 되지 않나요?', '단일 프로세스에서는 일부 막을 수 있지만 다중 인스턴스와 재시작에 취약하고 DB 규칙의 최종 보장을 대체하지 못한다고 답한다.',
      '유니크 제약이 없다면 어떤 대안이 있나요?', '비관적 락·원자적 조건부 INSERT·분산 락이 있지만 데이터 불변식은 DB 제약으로 표현하는 편이 명확하다고 답한다.'
    ),
    evidence: { status: '확인됨', note: '수정 전 구조와 유니크 제약 변경이 코드·Wiki에 확인된다.', sources: ['FeedVote.java', '피드 투표 동시성 개선 Wiki'] },
    warnings: ['실제 운영 중복 사고로 과장하지 않는다.'], resumeClaims: ['TOCTOU 중복 저장 문제'], tags: ['투표 정합성', 'TOCTOU', '경쟁조건', '1단계'],
  }),
  feedshopQuestion({
    id: 'FS-008', topic: '투표 정합성', stage: '기초 개념', difficulty: '기초', priority: '핵심', minutes: 5,
    question: 'DB 유니크 제약이 애플리케이션 중복 검사보다 강한 이유는 무엇인가요?',
    answer: {
      compact: {
        conclusion: 'DB 유니크 제약은 모든 쓰기가 거치는 저장 시점에 유일성 규칙을 원자적으로 강제합니다.',
        evidence1: 'existsBy의 확인과 저장 사이에 다른 요청이 들어오는 경쟁 조건을 해결했습니다.',
        evidence2: '(event_id, voter_id) 조합을 유일하게 만들어 다중 인스턴스의 중복 방지를 확보했습니다.',
      },
      conclusion: '유니크 제약은 모든 쓰기가 통과하는 DB 저장 시점에 규칙을 원자적으로 강제하기 때문입니다.',
      evidence1: '애플리케이션의 existsBy는 확인과 저장이 두 단계라 그 사이에 다른 요청이 들어올 수 있습니다.',
      evidence2: 'FeedShop은 (event_id, voter_id) 조합을 유일하게 만들어 여러 인스턴스에서 동시에 저장해도 하나만 성공하도록 했습니다.',
      keywords: ['DB 불변식', '유니크 제약', '원자적 강제', 'event_id', 'voter_id'],
      caution: '유니크 제약만으로 사용자에게 적절한 응답과 예외 복구가 자동 완성되는 것은 아니다.',
    },
    followups: feedshopFollowups(
      '유니크 키의 정확한 컬럼은 무엇인가요?', '(event_id, voter_id) 조합이라고 코드 근거를 들어 답한다.',
      'existsBy 검사는 이제 불필요한가요?', '빠른 사용자 피드백이나 불필요한 예외 감소에는 쓸 수 있지만 최종 정합성 보장은 DB 제약이라고 답한다.',
      '유니크 예외가 많이 발생하면 성능에 영향이 없나요?', '예외 비용이 있으므로 정상 흐름에서 중복 요청을 줄이되 경쟁 조건의 최종 방어는 유지한다고 답한다.'
    ),
    evidence: { status: '확인됨', note: '(event_id, voter_id) 유니크 제약이 엔티티 코드에 확인된다.', sources: ['FeedVote.java', 'v5_3 이력서 p.1'] },
    warnings: [], resumeClaims: ['DB 유니크 제약으로 중복 저장 차단'], tags: ['투표 정합성', 'DB유니크', '2단계'],
  }),
  feedshopQuestion({
    id: 'FS-009', topic: '트랜잭션', stage: '구현 흐름', difficulty: '중급', priority: '핵심', minutes: 7,
    question: 'NOT_SUPPORTED와 REQUIRED를 사용한 투표 저장 흐름을 설명해 주세요.',
    answer: {
      compact: {
        conclusion: '외부 흐름은 NOT_SUPPORTED, 실제 저장과 flush는 별도 빈의 REQUIRED로 분리했습니다.',
        evidence1: '유니크 위반 시 내부 저장 트랜잭션만 롤백되도록 해 예외 격리를 확보했습니다.',
        evidence2: 'DB 저장 성공 뒤에만 INCR를 호출해 실패한 저장의 카운터 증가 문제를 해결했습니다.',
      },
      conclusion: '외부 조정 흐름은 NOT_SUPPORTED로 트랜잭션 밖에 두고, 실제 저장·flush만 별도 빈의 REQUIRED 트랜잭션에서 끝내도록 분리했습니다.',
      evidence1: '유니크 제약 위반이 발생하면 내부 저장 트랜잭션만 롤백되고 예외 처리는 이미 실패 상태가 된 트랜잭션 밖에서 수행됩니다.',
      evidence2: '저장이 정상 완료된 뒤에만 외부 흐름에서 Redis INCR를 호출해 실패한 DB 쓰기와 카운터 증가가 함께 진행되지 않게 했습니다.',
      keywords: ['NOT_SUPPORTED', 'REQUIRED', '별도 Bean', 'flush', '예외 격리'],
      caution: 'REQUIRES_NEW가 같은 Hibernate Session을 공유해 오염된다는 과거 설명을 사용하지 않는다.',
    },
    followups: feedshopFollowups(
      '왜 flush를 명시적으로 호출했나요?', '유니크 제약 위반을 내부 저장 트랜잭션 범위에서 즉시 확인해 외부 조정 흐름이 성공으로 오인하지 않게 하기 위해서라고 답한다.',
      'REQUIRES_NEW를 쓰면 더 간단하지 않나요?', '가능한 대안이지만 실제 선택은 외부에 기존 트랜잭션을 만들지 않고 저장 책임만 REQUIRED로 명시하는 구조였다고 답한다.',
      '같은 클래스에서 내부 메서드를 호출하면 트랜잭션이 적용되나요?', 'Spring 프록시 self-invocation 문제가 있으므로 별도 빈 경계를 사용한 이유와 함께 설명한다.'
    ),
    evidence: { status: '확인됨', note: 'FeedVoteService의 NOT_SUPPORTED와 FeedVotePersistenceService의 REQUIRED·flush가 코드에서 확인된다.', sources: ['FeedVoteService.java', 'FeedVotePersistenceService.java'] },
    warnings: ['REQUIRES_NEW·영속성 컨텍스트에 대한 잘못된 과거 설명 금지.'], resumeClaims: ['투표 저장·flush 별도 트랜잭션 격리'], tags: ['트랜잭션', 'NOT_SUPPORTED', 'REQUIRED', '4단계'],
  }),
  feedshopQuestion({
    id: 'FS-010', topic: '트랜잭션', stage: '검증 근거', difficulty: '심화', priority: '중요', minutes: 6,
    question: '유니크 제약 위반 뒤에도 다음 투표 저장이 정상이라는 것을 어떻게 확인했나요?',
    answer: {
      compact: {
        conclusion: '중복 저장 롤백 뒤 정상 투표를 다시 저장하는 통합 테스트로 확인했습니다.',
        evidence1: '제약 위반을 내부 트랜잭션에 가둬 이후 정상 저장이 영향받지 않도록 격리했습니다.',
        evidence2: '통합 테스트를 남겨 같은 문제가 다시 발생하지 않도록 회귀 방지 기준을 확보했습니다.',
      },
      conclusion: '중복 저장으로 내부 트랜잭션이 롤백된 뒤 별도의 정상 저장을 수행하는 통합 테스트로 회귀를 확인했습니다.',
      evidence1: '테스트는 제약 위반이 전체 서비스 흐름의 영속성 컨텍스트나 다음 요청까지 오염시키지 않는지를 검증합니다.',
      evidence2: '현재 저장소에 해당 FeedVotePersistenceServiceIntegrationTest가 존재해 구조적 회귀 근거로 사용할 수 있습니다.',
      keywords: ['통합 테스트', '제약 위반', '롤백', '다음 저장', '회귀 검증'],
      caution: '이 테스트 하나로 모든 동시성 시나리오나 운영 장애가 검증됐다고 확대하지 않는다.',
    },
    followups: feedshopFollowups(
      '테스트가 실제 DB 유니크 제약을 사용하나요?', '통합 테스트의 DB 환경과 제약 생성 방식을 코드 기준으로 답하고 인메모리 DB라면 차이를 함께 말한다.',
      '단위 테스트로는 부족한가요?', '트랜잭션 프록시·flush·DB 제약이 함께 작동하는지 보려면 통합 테스트 가치가 크다고 답한다.',
      '동시 요청 테스트도 자동화돼 있나요?', '현재 확인된 것은 회귀 통합 테스트이며 nGrinder 부하와 DB·Redis 비교 자동화 범위는 별도 확인이 필요하다고 답한다.'
    ),
    evidence: { status: '확인됨', note: '롤백 후 정상 저장을 검증하는 통합 테스트 파일이 확인된다.', sources: ['FeedVotePersistenceServiceIntegrationTest.java'] },
    warnings: ['동시성 전체 자동화 테스트로 과장하지 않는다.'], resumeClaims: ['투표 저장 트랜잭션 격리'], tags: ['트랜잭션', '통합테스트', '검증', '5단계'],
  }),
  feedshopQuestion({
    id: 'FS-011', topic: 'Redis', stage: '선택 이유', difficulty: '중급', priority: '핵심', minutes: 6,
    question: '왜 DB 카운터 행을 갱신하지 않고 Redis INCR를 선택했나요?',
    answer: {
      compact: {
        conclusion: '같은 DB 카운터 행의 쓰기 경합을 분리하고 원자적으로 증가시키기 위해 INCR를 선택했습니다.',
        evidence1: '투표 원본은 DB 유니크 레코드로 남겨 중복 방지와 재계산 기준을 확보했습니다.',
        evidence2: 'Redis 카운터를 DB COUNT로 재계산 가능한 파생 값으로 둬 장애 후 복구 기준을 마련했습니다.',
      },
      conclusion: '투표가 집중될 때 같은 DB 카운터 행의 쓰기 경합을 분리하고 원자적 증가를 간단히 처리하기 위해 INCR를 선택했습니다.',
      evidence1: '중복 투표의 최종 기록은 별도 행과 유니크 제약으로 DB에 남아 카운터를 다시 계산할 수 있습니다.',
      evidence2: '따라서 Redis 카운터는 빠르게 갱신하되 DB COUNT를 복구 기준으로 둘 수 있었습니다.',
      keywords: ['핫 로우', '쓰기 경합', 'INCR', '파생 카운터', 'DB COUNT'],
      caution: 'DB 원자 UPDATE나 낙관적 락을 실제로 동일 조건에서 성능 비교했다고 말하지 않는다.',
    },
    followups: feedshopFollowups(
      'DB 카운터 락 경합을 실제로 측정했나요?', '당시 설계 판단과 부하 결과는 있으나 대안별 동일 조건 비교 수치는 없다고 경계를 말한다.',
      'DB 원자 UPDATE가 더 일관적이지 않나요?', '맞으며 규모와 요구사항에 따라 더 단순한 선택일 수 있지만 당시에는 카운터 집중 쓰기를 분리했다고 답한다.',
      'Redis가 유실되면 카운터는 어떻게 복구하나요?', 'DB 투표 레코드 COUNT로 다시 계산하고 scheduler로 보정하는 경로를 설명한다.'
    ),
    evidence: { status: '문서 근거', note: 'INCR 선택과 복구 구조는 확인되지만 대안별 벤치마크는 없다.', sources: ['v5_3 이력서 p.1', '피드 투표 동시성 개선 Wiki'] },
    warnings: ['락 경합 감소를 대안 비교 실측으로 표현하지 않는다.'], resumeClaims: ['빈번한 투표 수 갱신을 Redis INCR로 처리'], tags: ['Redis', 'INCR', '투표 정합성', '3단계'],
  }),
  feedshopQuestion({
    id: 'FS-012', topic: '투표 정합성', stage: '구현 흐름', difficulty: '중급', priority: '핵심', minutes: 7,
    question: '정상 투표 요청에서 DB 저장과 Redis 카운터 갱신은 어떤 순서로 진행되나요?',
    answer: {
      compact: {
        conclusion: 'REQUIRED에서 DB 저장과 flush를 완료한 뒤 NOT_SUPPORTED 흐름에서 Redis INCR를 호출합니다.',
        evidence1: '유니크 위반 시 내부 트랜잭션만 롤백해 실패한 투표가 카운터 증가로 이어지지 않게 했습니다.',
        evidence2: '두 자원은 분리하되 DB를 최종 원본으로 둬 카운터 보정 기준을 확보했습니다.',
      },
      conclusion: '별도 REQUIRED 트랜잭션에서 투표 저장과 flush가 정상 완료된 뒤 외부 NOT_SUPPORTED 흐름에서 Redis INCR를 호출합니다.',
      evidence1: 'DB 저장이 유니크 제약으로 실패하면 내부 트랜잭션이 롤백되고 정상 투표로 처리되지 않습니다.',
      evidence2: 'DB와 Redis가 하나의 트랜잭션은 아니므로 DB 성공 뒤 INCR 실패가 가능한 best-effort 구조이며 DB 기준 보정이 필요합니다.',
      keywords: ['DB 저장', 'flush', '트랜잭션 종료', 'Redis INCR', 'best-effort'],
      caution: 'afterCommit 콜백이나 분산 트랜잭션을 사용했다고 말하지 않는다.',
    },
    followups: feedshopFollowups(
      'DB commit 이후라는 것을 어떻게 보장하나요?', '별도 빈의 트랜잭션 메서드가 반환된 뒤 외부 비트랜잭션 흐름에서 INCR를 호출하는 코드 순서를 설명한다.',
      'Redis를 먼저 올리고 DB가 실패하면 되돌리면 안 되나요?', '보상 DECR도 실패할 수 있고 중복 요청 판단이 복잡해져 최종 원본인 DB 저장을 먼저 확정했다고 답한다.',
      '프로세스가 DB commit 직후 종료되면요?', '카운터 누락이 생길 수 있으며 정기 보정으로 회복하지만 즉시 일관성이 필요한 경우 Outbox나 재시도 저장소 같은 추가 설계가 필요하다고 답한다.'
    ),
    evidence: { status: '확인됨', note: '서비스와 영속성 서비스의 실제 호출 순서가 코드에서 확인된다.', sources: ['FeedVoteService.java', 'FeedVotePersistenceService.java'] },
    warnings: ['afterCommit·2PC 구현 주장 금지.'], resumeClaims: ['투표 저장·flush 별도 트랜잭션', 'Redis 카운터 분리'], tags: ['투표 정합성', '트랜잭션', 'Redis', '4단계'],
  }),
  feedshopQuestion({
    id: 'FS-013', topic: '투표 정합성', stage: '장애·한계', difficulty: '심화', priority: '핵심', minutes: 7,
    question: 'DB 저장과 Redis INCR가 분리되면 어떤 불일치가 생길 수 있나요?',
    answer: {
      compact: {
        conclusion: 'DB 저장 후 INCR가 실패하면 DB 기록보다 Redis 카운터가 작은 일시적 불일치가 생깁니다.',
        evidence1: 'DB를 최종 원본으로 정해 불일치가 생겨도 Redis 카운터를 다시 맞출 기준을 마련했습니다.',
        evidence2: '키 미스 폴백과 정기 보정으로 Redis 값을 다시 맞추는 복구 가능성을 확보했습니다.',
      },
      conclusion: 'DB 저장 성공 후 INCR 실패나 프로세스 종료가 발생하면 DB 레코드 수보다 Redis 카운터가 작아지는 일시적 불일치가 생길 수 있습니다.',
      evidence1: '두 자원은 하나의 원자적 트랜잭션으로 묶이지 않았기 때문에 성공·실패 조합을 완전히 없애지 못합니다.',
      evidence2: '그래서 DB를 원본으로 정하고 키 미스 폴백과 정기 보정으로 Redis 값을 복구하는 방향을 사용했습니다.',
      keywords: ['이중 쓰기', '일시적 불일치', 'DB 원본', '보정', '복구 가능성'],
      caution: '“항상 일치한다”가 아니라 테스트 구간에서 일치를 확인했고 구조적으로 보정 가능하다고 표현한다.',
    },
    followups: feedshopFollowups(
      '반대 방향, Redis만 증가하는 경우도 있나요?', '현재 순서는 DB 성공 후 INCR라 정상 코드 흐름에서는 줄였지만 재시도·중복 호출 정책까지 확인해야 한다고 답한다.',
      '정기 보정이면 사용자는 틀린 숫자를 볼 수 있지 않나요?', '맞으며 허용 가능한 지연인지가 요구사항이다. 즉시성이 중요하면 재시도 큐나 더 강한 일관성 설계를 검토한다고 답한다.',
      'DB와 Redis를 원자적으로 묶을 수 있나요?', '서로 다른 자원이라 단순 @Transactional로 묶이지 않으며 Outbox·이벤트·재시도 기록 같은 패턴을 대안으로 설명한다.'
    ),
    evidence: { status: '확인됨', note: '코드의 이중 쓰기 경계와 DB 기준 보정 구조가 확인된다.', sources: ['FeedVoteService.java', 'FeedVoteScheduler.java'] },
    warnings: ['무손실·즉시 강한 일관성 보장 표현 금지.'], resumeClaims: ['DB 원본 기준 폴백·정기 보정'], tags: ['투표 정합성', '이중쓰기', '장애', '6단계'],
  }),
  feedshopQuestion({
    id: 'FS-014', topic: '투표 정합성', stage: '구현 흐름', difficulty: '중급', priority: '중요', minutes: 6,
    question: 'Redis 카운터 키가 없을 때 DB 원본으로 복구하는 흐름은 무엇인가요?',
    answer: {
      compact: {
        conclusion: 'Redis 키가 없으면 DB 투표 수를 COUNT하고 setIfAbsent로 카운터를 다시 채웁니다.',
        evidence1: 'DB 투표 기록을 원본으로 사용해 키 만료 뒤에도 카운터 복구 가능성을 확보했습니다.',
        evidence2: 'setIfAbsent로 동시 복구 요청이 먼저 채워진 값을 다시 덮어쓰는 위험을 줄였습니다.',
      },
      conclusion: '키가 없으면 DB의 투표 레코드를 COUNT해 기준값을 얻고 setIfAbsent로 Redis에 채우는 흐름입니다.',
      evidence1: 'DB COUNT는 최종 투표 레코드를 기준으로 하므로 Redis 재시작이나 키 만료 뒤 파생 카운터를 재구성할 수 있습니다.',
      evidence2: 'setIfAbsent는 동시에 여러 요청이 복구를 시도할 때 먼저 채운 값을 무조건 덮어쓰는 일을 줄입니다.',
      keywords: ['키 미스', 'DB COUNT', 'setIfAbsent', '재구성', '경쟁 복구'],
      caution: '연결 실패 예외까지 이 경로가 처리한다고 확대하지 않는다.',
    },
    followups: feedshopFollowups(
      'DB COUNT와 새 투표가 동시에 진행되면 정확한가요?', '복구 중 새 쓰기와의 경쟁 가능성을 인정하고 정기 보정·키 초기화 순서·원자적 스크립트 등의 보완을 검토한다고 답한다.',
      '왜 SET이 아니라 setIfAbsent인가요?', '동시에 복구하는 요청이 이미 갱신된 값을 뒤늦은 COUNT로 덮는 위험을 줄이기 위해서라고 답한다.',
      '키가 자주 사라지면 DB에 부하가 몰리지 않나요?', '맞으며 키 만료 정책, 사전 워밍, 단일 복구 락, 요청 제한을 검토한다고 답한다.'
    ),
    evidence: { status: '확인됨', note: 'DB COUNT 후 setIfAbsent 경로가 FeedVoteService에 확인된다.', sources: ['FeedVoteService.java'] },
    warnings: ['키 미스 복구와 연결 장애를 혼동하지 않는다.'], resumeClaims: ['DB 원본 기준 폴백'], tags: ['투표 정합성', 'Redis', '폴백', '4단계'],
  }),
  feedshopQuestion({
    id: 'FS-015', topic: '투표 정합성', stage: '구현 흐름', difficulty: '중급', priority: '중요', minutes: 6,
    question: 'Redis 카운터의 정기 보정은 언제, 어떤 기준으로 실행되나요?',
    answer: {
      compact: {
        conclusion: '매일 03시에 DB 투표 기록 수를 기준으로 Redis 카운터를 다시 맞춥니다.',
        evidence1: 'Redis 값이 아닌 DB COUNT를 최종 기준으로 삼아 카운터 정합성을 확보했습니다.',
        evidence2: '정기 보정으로 일시적 불일치를 회복하지만 보정 전 오차 노출과 DB COUNT 비용은 남습니다.',
      },
      conclusion: '현재 코드에는 매일 03시에 DB 투표 레코드 수를 기준으로 Redis 카운터를 다시 맞추는 스케줄러가 있습니다.',
      evidence1: '보정 기준은 Redis 값이 아니라 DB의 실제 투표 기록 COUNT입니다.',
      evidence2: '이 방식은 일시적 불일치를 회복하지만 보정 전까지 잘못된 값이 보일 수 있고 대규모 데이터에서는 COUNT 비용도 고려해야 합니다.',
      keywords: ['매일 03시', '스케줄러', 'DB COUNT', '정기 보정', '최종 원본'],
      caution: '보정 주기가 사용자 요구사항으로 충분하다고 단정하지 않고 당시 구현과 한계를 함께 말한다.',
    },
    followups: feedshopFollowups(
      '정확한 cron과 대상 범위는 무엇인가요?', 'FeedVoteScheduler 코드의 매일 03시 실행과 보정 대상 조회 흐름을 기준으로 답한다.',
      '왜 실시간 보정이 아니라 하루 한 번인가요?', '당시 구현의 단순성과 비용을 택한 것으로 설명하고 실시간 정확성 요구가 높다면 재시도·이벤트 기반 갱신이 필요하다고 답한다.',
      '스케줄러가 여러 인스턴스에서 동시에 실행되면요?', '분산 환경에서는 ShedLock·리더 선출·멱등 업데이트가 필요하며 실제 적용 여부는 확인되지 않았다고 답한다.'
    ),
    evidence: { status: '확인됨', note: 'FeedVoteScheduler의 매일 03시 DB 기준 보정이 코드에 확인된다.', sources: ['FeedVoteScheduler.java'] },
    warnings: ['다중 인스턴스 스케줄 락 구현 미확인.'], resumeClaims: ['Redis 카운터 정기 보정'], tags: ['투표 정합성', '스케줄러', '보정', '4단계'],
  }),
  feedshopQuestion({
    id: 'FS-016', topic: '투표 정합성', stage: '장애·한계', difficulty: '심화', priority: '중요', minutes: 7,
    question: 'DB 저장 후 Redis INCR가 실패하면 사용자 응답과 데이터는 어떻게 해야 하나요?',
    answer: {
      compact: {
        conclusion: 'DB 투표는 유지하고 INCR 실패를 관측해 재시도나 보정 대상으로 남겨야 합니다.',
        evidence1: 'DB 투표 기록을 원본으로 남겨 실패한 Redis 카운터를 다시 계산할 기준을 마련했습니다.',
        evidence2: '실제 응답 코드와 재시도·실패 기록 정책은 확인되지 않아 구현 사실로 답할 수 없습니다.',
      },
      conclusion: 'DB 저장은 이미 최종 기록이므로 되돌리기보다 INCR 실패를 관측하고 재시도·보정 대상으로 남기는 편이 안전합니다.',
      evidence1: '현재 구조는 DB COUNT로 카운터를 복구할 수 있어 투표 자체를 잃지 않는 기준이 있습니다.',
      evidence2: '다만 실제 연결 예외의 응답 코드, 재시도 횟수와 실패 기록 저장 방식은 확인되지 않아 운영 정책으로 단정할 수 없습니다.',
      keywords: ['부분 실패', '관측', '재시도', 'DB 원본', '사용자 응답'],
      caution: '현재 구현이 자동 재시도나 실패 큐를 갖췄다고 말하지 않는다.',
    },
    followups: feedshopFollowups(
      '현재 코드에서 INCR 예외를 잡나요?', '예외 처리 코드를 확인한 범위까지만 답하고 포괄적 폴백을 주장하지 않는다.',
      '사용자에게 성공을 반환하면 숫자가 틀리지 않나요?', '투표 저장 성공과 표시 카운터 최신성을 분리하고, 요구사항에 따라 부분 성공 응답이나 지연 갱신을 명확히 정의해야 한다고 답한다.',
      '재시도 중 중복 증가가 생기면요?', '연산 식별자·처리 상태·DB 기준 재계산처럼 멱등성을 확보해야 하며 단순 INCR 재시도는 위험하다고 답한다.'
    ),
    evidence: { status: '지원자 확인 필요', note: '복구 기준은 확인됐지만 INCR 연결 실패의 실제 응답·재시도 정책은 미확인이다.', sources: ['FeedVoteService.java', '장애 정책 확인 필요'] },
    warnings: ['연결 예외 자동 복구·재시도 미확인.'], resumeClaims: ['DB 원본 기준 복구'], tags: ['투표 정합성', 'Redis', '부분실패', '6단계'],
  }),
  feedshopQuestion({
    id: 'FS-017', topic: '투표 정합성', stage: '대안·확장', difficulty: '심화', priority: '중요', minutes: 7,
    question: 'DB 원자 UPDATE, 비관적 락, Redisson 중 어떤 상황에서 선택을 바꾸겠나요?',
    answer: {
      compact: {
        conclusion: '충돌 빈도와 일관성 요구, 운영 복잡도에 따라 가장 단순한 방식을 선택하겠습니다.',
        evidence1: '단순 카운터는 DB 원자 UPDATE, 충돌이 잦은 짧은 임계 구역은 비관적 락을 우선 검토합니다.',
        evidence2: '분산 락은 여러 인스턴스의 복합 작업 직렬화가 필요할 때만 TTL·소유권·해제를 함께 관리하며 사용합니다.',
      },
      conclusion: '데이터 규모, 충돌 빈도, 즉시 일관성 요구와 운영 복잡도를 기준으로 가장 단순하게 불변식을 지키는 방식을 선택하겠습니다.',
      evidence1: '규모가 작고 강한 일관성이 우선이면 DB 유니크와 원자 UPDATE가 단순하고, 충돌이 높고 임계 구역이 명확하면 DB 락을 검토할 수 있습니다.',
      evidence2: '여러 인스턴스의 복합 작업을 직렬화해야 할 때 Redisson 분산 락을 고려하지만 TTL·락 소유권·장애 시 해제 문제를 함께 관리해야 합니다.',
      keywords: ['요구사항', 'DB 원자 UPDATE', '비관적 락', 'Redisson', '운영 복잡도'],
      caution: '대안들을 실제 동일 부하에서 비교 적용했다고 말하지 않는다.',
    },
    followups: feedshopFollowups(
      '현재 방식보다 DB 원자 UPDATE가 나은 조건은 무엇인가요?', '카운터 한 행의 경합이 감당 가능하고 즉시 일관성·단순 운영이 중요할 때라고 답한다.',
      '분산 락이 가장 안전하지 않나요?', '락 서비스 자체 장애와 지연·잘못된 만료가 생기므로 DB 제약을 대체하는 만능 해법이 아니라고 답한다.',
      'Redis Cluster에서 Redisson을 쓰면 끝인가요?', '클러스터 장애·네트워크 분할·fencing token 필요성까지 검토해야 하며 라이브러리 사용만으로 안전이 보장되지 않는다고 답한다.'
    ),
    evidence: { status: '일반론', note: '실제 적용 성과가 아니라 현재 구조의 대안 선택 기준이다.', sources: ['기술 질문 리스트', '피드 투표 동시성 개선 Wiki'] },
    warnings: ['Redisson·비관적 락 적용 경험으로 표현하지 않는다.'], resumeClaims: ['투표 동시성 해결안 비교'], tags: ['투표 정합성', '락', 'Redisson', '대안', '7단계'],
  }),
  feedshopQuestion({
    id: 'FS-018', topic: '성능 측정', stage: '검증 근거', difficulty: '심화', priority: '핵심', minutes: 7,
    question: '동시 사용자 최대 3,000명 테스트에서 무엇을 확인했나요?',
    answer: {
      compact: {
        conclusion: '최대 부하 구간에서도 요청 처리와 중복 방지, DB·Redis 카운터 일치를 확인했습니다.',
        evidence1: 'HTTP 오류와 DB 중복 저장 없이 처리돼 동시 투표의 저장 정합성을 확보했습니다.',
        evidence2: 'DB 레코드 수와 Redis 카운터를 비교해 테스트 구간의 카운터 일치성을 확보했습니다.',
      },
      conclusion: 'nGrinder 결과에서 HTTP 오류와 DB 중복 저장 0건을 확인하고 DB 레코드 수와 Redis 카운터가 일치하는지 비교했습니다.',
      evidence1: '포트폴리오에는 500·1,000·3,000명 구간의 성공 요청과 처리량 화면이 남아 있습니다.',
      evidence2: '다만 원본 스크립트, 데이터셋, 실행 토폴로지와 같은 실행 직후 전체 DB·Redis 비교 출력은 별도 확보가 필요합니다.',
      keywords: ['nGrinder', '동시 사용자 3,000명', 'HTTP 오류 0', '중복 저장 0', '카운트 일치'],
      caution: '3,000명을 실제 서비스 사용자나 초당 요청 수와 혼용하지 않고 nGrinder 가상 사용자 구간이라고 설명한다.',
    },
    followups: feedshopFollowups(
      '3,000명은 동시 접속자, 가상 사용자, 요청 수 중 무엇인가요?', 'nGrinder의 동시 가상 사용자 수로 표현하고 실행 시간과 요청 수는 결과 화면 기준으로 따로 답한다.',
      '오류 0건이면 정합성까지 증명되나요?', '아니며 HTTP 성공과 DB 중복·DB-Redis 카운트 비교는 별도 검증 항목이라고 구분한다.',
      '같은 테스트를 재현할 수 있나요?', '원본 스크립트와 환경을 확보해야 정확히 재현 가능하므로 현재 보유 근거와 부족한 항목을 솔직히 말한다.'
    ),
    evidence: { status: '문서 근거', note: 'nGrinder·Redis 확인 스크린샷은 있으나 완전한 재현 자료는 미확보다.', sources: ['v5_3 이력서 p.1', 'vuser3000_result.png', 'phase2b-redis-count-verify.png'] },
    warnings: ['3,000명을 실사용자 수로 표현 금지.', '원본 부하 스크립트·토폴로지 미확인.'], resumeClaims: ['동시 사용자 최대 3,000명에서 HTTP 오류·중복 저장 0건과 카운트 일치'], tags: ['성능 측정', 'nGrinder', '투표 정합성', '5단계'],
  }),
  feedshopQuestion({
    id: 'FS-019', topic: '성능 측정', stage: '장애·한계', difficulty: '심화', priority: '중요', minutes: 6,
    question: '부하 테스트 결과를 해석할 때 가장 큰 한계는 무엇인가요?',
    answer: {
      compact: {
        conclusion: '제한된 토폴로지의 가상 사용자 결과라 실제 운영 용량으로 일반화할 수 없습니다.',
        evidence1: '보유 결과는 전후 상대 비교 근거로만 사용하고 테스트 조건 전체가 고정됐다고 단정하지 않습니다.',
        evidence2: '절대 처리 용량과 사용자 효과는 운영 유사 환경에서 별도로 검증해야 합니다.',
      },
      conclusion: '로컬 또는 제한된 토폴로지의 가상 사용자 결과이므로 실제 운영 트래픽과 인프라 확장 효과를 그대로 일반화할 수 없다는 점입니다.',
      evidence1: '성능 수치는 데이터 분포, 워밍업, 네트워크, DB·Redis 위치, 요청 시나리오에 따라 달라집니다.',
      evidence2: '따라서 전후 조건을 고정한 상대 비교 근거로 사용하고 절대 처리 용량이나 사용자 이탈 감소는 별도 검증 대상으로 둡니다.',
      keywords: ['테스트 토폴로지', '데이터셋', '워밍업', '상대 비교', '외적 타당성'],
      caution: '추가 인프라 증설 없이 운영 서비스 수용량이 보장됐다고 말하지 않는다.',
    },
    followups: feedshopFollowups(
      '전후 테스트에서 무엇을 고정했나요?', '보유한 nGrinder 설정·데이터·인프라 정보를 확인한 범위까지만 답한다.',
      '그럼 성능 수치가 의미 없나요?', '동일 조건에서 병목 개선의 상대 효과를 보여주는 근거는 되지만 운영 용량 예측과는 다르다고 답한다.',
      '운영 수준으로 다시 검증한다면요?', '운영 유사 데이터와 분산 부하 발생기, 반복 실행·백분위 지연·자원 지표·오류율을 함께 본다고 답한다.'
    ),
    evidence: { status: '문서 근거', note: '수치 화면은 있으나 테스트 재현 조건 전체가 확보되지 않았다.', sources: ['nGrinder 결과 스크린샷', '각종 피드백 모음'] },
    warnings: ['운영 트래픽·사용자 가치로 확대 해석 금지.'], resumeClaims: ['nGrinder 성능 테스트'], tags: ['성능 측정', '한계', '테스트환경', '6단계'],
  }),
  feedshopQuestion({
    id: 'FS-020', topic: 'N+1', stage: '실제 사용 위치', difficulty: '기초', priority: '핵심', minutes: 5,
    question: 'FeedShop에서 N+1 문제는 어디서 발생했나요?',
    answer: {
      compact: {
        conclusion: '이벤트 목록의 eventDetail과 rewards를 항목마다 다시 조회하면서 N+1이 발생했습니다.',
        evidence1: 'DB 조건 조회로 옮겨 전체 조회와 메모리 필터링 문제를 해결했습니다.',
        evidence2: '필요한 연관 데이터를 fetch join으로 함께 조회해 반복 SQL 문제를 해결했습니다.',
      },
      conclusion: '이벤트 목록을 조회한 뒤 eventDetail과 rewards 같은 연관 데이터를 항목마다 다시 조회하는 과정에서 발생했습니다.',
      evidence1: '전체 이벤트를 먼저 읽고 애플리케이션 메모리에서 필터링하는 구조까지 겹쳐 데이터가 늘수록 조회 비용이 커졌습니다.',
      evidence2: 'Scouter XLog에서 이벤트 목록 요청 한 번에 SQL 42회를 확인해 쿼리 구조를 우선 개선했습니다.',
      keywords: ['이벤트 목록', '연관 데이터', 'N+1', '메모리 필터링', 'SQL 42회'],
      caution: '모든 연관관계가 LAZY이기만 해서 생겼다고 단순화하지 않고 실제 조회 흐름을 설명한다.',
    },
    followups: feedshopFollowups(
      'N+1은 왜 발생하나요?', '첫 목록 쿼리 뒤 각 엔티티의 연관 데이터를 접근하면서 추가 쿼리가 반복되는 패턴이라고 답한다.',
      'EAGER로 바꾸면 해결되지 않나요?', '예상하지 않은 조인·추가 쿼리와 과조회가 생길 수 있어 조회 요구에 맞춘 명시적 fetch join을 선택했다고 답한다.',
      '데이터가 적으면 그냥 둬도 되지 않나요?', '현재 요구와 비용을 보고 판단할 수 있지만 증가 시 선형으로 악화되는지 측정하고 핵심 경로라면 미리 제거한다고 답한다.'
    ),
    evidence: { status: '확인됨', note: '이벤트 조회 쿼리와 Scouter 자료가 코드·포트폴리오에 확인된다.', sources: ['EventQueryRepositoryImpl.java', 'before-scouter-sql42.png'] },
    warnings: [], resumeClaims: ['이벤트 목록 연관 데이터 반복 조회로 SQL 42회'], tags: ['N+1', 'JPA', '이벤트목록', '1단계'],
  }),
  feedshopQuestion({
    id: 'FS-021', topic: 'QueryDSL', stage: '기초 개념', difficulty: '기초', priority: '핵심', minutes: 5,
    question: 'leftJoin과 fetchJoin의 역할 차이는 무엇인가요?',
    answer: {
      compact: {
        conclusion: 'leftJoin은 결과 조인을 만들고, fetchJoin은 연관 엔티티를 같은 조회에서 초기화합니다.',
        evidence1: '단순 join은 연관관계를 초기화하지 않아 이후 접근 시 추가 쿼리가 발생할 수 있습니다.',
        evidence2: 'FeedShop은 fetch join으로 필요한 연관 데이터를 함께 읽어 목록의 반복 쿼리를 줄였습니다.',
      },
      conclusion: 'leftJoin은 조인 조건과 결과 형태를 만들고, fetchJoin은 JPA에게 연관 엔티티를 같은 조회에서 함께 초기화하라고 알립니다.',
      evidence1: '단순 join만으로는 엔티티 연관관계가 초기화되지 않아 이후 접근 시 추가 쿼리가 발생할 수 있습니다.',
      evidence2: 'FeedShop은 QueryDSL의 leftJoin().fetchJoin()으로 목록에 필요한 연관 데이터를 함께 조회했습니다.',
      keywords: ['leftJoin', 'fetchJoin', '연관관계 초기화', '추가 쿼리', 'QueryDSL'],
      caution: 'fetch join이 항상 최적이거나 모든 컬렉션을 한 번에 안전하게 가져온다고 말하지 않는다.',
    },
    followups: feedshopFollowups(
      'innerJoin 대신 leftJoin을 쓴 이유는 무엇인가요?', '연관 데이터가 없는 이벤트도 목록에서 유지해야 하는 요구였는지 실제 쿼리 조건을 기준으로 설명한다.',
      'EntityGraph와 비교하면 어떤가요?', '정적 조회에는 간결할 수 있지만 복잡한 동적 조건과 count 분리가 필요해 QueryDSL을 사용했다고 답한다.',
      '컬렉션 두 개를 fetch join하면요?', '카테시안 곱과 중복·MultipleBagFetchException 가능성을 설명하고 쿼리 분리나 batch fetch를 검토한다고 답한다.'
    ),
    evidence: { status: '확인됨', note: 'EventQueryRepositoryImpl의 leftJoin·fetchJoin 사용이 확인된다.', sources: ['EventQueryRepositoryImpl.java'] },
    warnings: [], resumeClaims: ['QueryDSL leftJoin·fetchJoin으로 쿼리 구조 개선'], tags: ['QueryDSL', 'N+1', 'fetchJoin', '2단계'],
  }),
  feedshopQuestion({
    id: 'FS-022', topic: 'QueryDSL', stage: '구현 흐름', difficulty: '중급', priority: '중요', minutes: 6,
    question: 'fetch join과 페이징 count 쿼리는 어떻게 분리했나요?',
    answer: {
      compact: {
        conclusion: '콘텐츠는 fetch join으로 조회하고 전체 개수는 countDistinct 쿼리로 분리했습니다.',
        evidence1: '목록 데이터와 개수 계산의 조인 목적을 나눠 불필요한 쿼리 복잡도 문제를 해결했습니다.',
        evidence2: '이벤트 중복을 제거한 개수를 별도로 계산해 정확한 페이징 기준을 확보했습니다.',
      },
      conclusion: '콘텐츠 조회는 필요한 연관 데이터를 fetch join하고, 전체 개수는 countDistinct 기반 별도 쿼리로 분리했습니다.',
      evidence1: '목록 데이터와 count는 필요한 컬럼과 조인 목적이 달라 하나의 복잡한 쿼리에 묶지 않았습니다.',
      evidence2: '이 구조로 목록 조회와 페이징 메타데이터를 각각 계산해 총 SQL을 2회로 줄였습니다.',
      keywords: ['content query', 'countDistinct', '페이징', '쿼리 분리', 'SQL 2회'],
      caution: '모든 페이지·정렬·필터 조합을 검증했다고 확대하지 않고 실제 EventQueryRepositoryImpl 범위로 답한다.',
    },
    followups: feedshopFollowups(
      '왜 count가 distinct여야 하나요?', 'to-many 조인으로 같은 이벤트 행이 중복될 수 있어 이벤트 기준 개수를 세기 위해서라고 답한다.',
      'count 쿼리도 조인이 많으면 느리지 않나요?', '필요 없는 fetch와 정렬을 제거하고 조건에 필요한 조인만 유지해야 한다고 답한다.',
      '대용량 offset 페이징 한계는요?', '뒤 페이지 비용이 커질 수 있어 정렬 키가 안정적이면 커서 기반 페이징을 검토한다고 답한다.'
    ),
    evidence: { status: '확인됨', note: 'fetch join 콘텐츠 쿼리와 countDistinct가 코드에 확인된다.', sources: ['EventQueryRepositoryImpl.java'] },
    warnings: ['모든 검색·페이징 경로 검증으로 일반화하지 않는다.'], resumeClaims: ['SQL 42회에서 2회로 축소'], tags: ['QueryDSL', 'countDistinct', '페이징', '4단계'],
  }),
  feedshopQuestion({
    id: 'FS-023', topic: 'N+1', stage: '선택 이유', difficulty: '중급', priority: '중요', minutes: 5,
    question: '전체 조회 후 메모리 필터링을 DB 조건 조회로 바꾼 이유는 무엇인가요?',
    answer: {
      compact: {
        conclusion: '불필요한 데이터 전송과 메모리 후처리를 줄이기 위해 목록 조건을 DB로 옮겼습니다.',
        evidence1: '이벤트 상태와 기간 조건을 QueryDSL에 반영해 전체 과조회 문제를 해결했습니다.',
        evidence2: 'DB가 필요한 행만 반환하게 해 데이터 전송량과 애플리케이션 후처리를 줄였습니다.',
      },
      conclusion: '애플리케이션이 사용하지 않을 데이터까지 읽고 필터링하면 DB 전송량과 메모리 사용이 함께 증가하므로 조건을 DB로 내렸습니다.',
      evidence1: 'DB는 인덱스와 실행 계획을 이용해 필요한 행을 고르는 데 최적화돼 있습니다.',
      evidence2: 'FeedShop에서는 이벤트 상태·기간 같은 목록 조건을 QueryDSL 쿼리에 반영해 조회량과 후처리를 줄였습니다.',
      keywords: ['필터 푸시다운', '과조회', '메모리 사용', 'DB 조건', '실행 계획'],
      caution: '정확한 인덱스 사용과 EXPLAIN 결과는 확인되지 않았다면 말하지 않는다.',
    },
    followups: feedshopFollowups(
      '어떤 조건을 DB로 옮겼나요?', '실제 EventQueryRepositoryImpl의 기간·상태 조건을 코드 기준으로 답한다.',
      '메모리 필터가 더 빠른 경우도 있지 않나요?', '이미 작은 데이터가 메모리에 있고 재사용할 때는 가능하지만 DB에서 대량 전송하는 비용과 비교해야 한다고 답한다.',
      '조건이 복잡해 쿼리가 느려지면요?', 'EXPLAIN, 인덱스, 조건 선택도, 쿼리 분리와 사전 계산을 검토한다고 답한다.'
    ),
    evidence: { status: '문서 근거', note: '메모리 필터링 제거는 프로젝트 문서에 있으나 실행 계획 원본은 미확인이다.', sources: ['v5_3 이력서 p.2', '이벤트 목록 조회 성능 개선 Wiki'] },
    warnings: ['인덱스·EXPLAIN 실측 미확인.'], resumeClaims: ['전체 조회 후 메모리 필터링 구조 개선'], tags: ['N+1', 'QueryDSL', '메모리필터', '3단계'],
  }),
  feedshopQuestion({
    id: 'FS-024', topic: '캐시', stage: '검증 근거', difficulty: '중급', priority: '핵심', minutes: 6,
    question: 'Redis Cache Hit에서 SQL 0회를 어떻게 확인했나요?',
    answer: {
      compact: {
        conclusion: '동일 목록을 다시 요청하고 Scouter로 Cache Hit가 DB 조회를 우회하는지 확인했습니다.',
        evidence1: 'QueryDSL 적용 단계와 캐시 재요청 단계를 분리해 DB 우회 근거를 확보했습니다.',
        evidence2: 'Cache Hit에서는 목록 SQL이 사라졌지만 Redis 지연과 역직렬화 비용은 남습니다.',
      },
      conclusion: '동일 이벤트 목록을 다시 요청한 뒤 Scouter에서 해당 요청의 SQL Count가 0인지 확인했습니다.',
      evidence1: '1차 QueryDSL 개선 화면은 SQL 2회, Redis 적용 후 재요청 화면은 SQL 0회로 단계가 구분돼 있습니다.',
      evidence2: '이 결과는 캐시 재요청 경로가 DB 목록 조회를 우회했다는 근거지만 Redis 자체 지연이나 직렬화 비용까지 0이라는 뜻은 아닙니다.',
      keywords: ['Cache Hit', 'Scouter', 'SQL Count 0', '단계 비교', '재요청'],
      caution: '첫 요청이나 Cache Miss도 SQL 0회라고 말하지 않는다.',
    },
    followups: feedshopFollowups(
      '정말 같은 요청과 조건이었나요?', '보유한 화면과 테스트 시나리오를 기준으로 답하고 키·파라미터가 같았는지 재확인한다고 말한다.',
      'SQL 0회면 응답시간은 왜 0이 아닌가요?', '애플리케이션 처리, Redis 네트워크·역직렬화, HTTP 비용이 남는다고 답한다.',
      'Cache Hit 비율이 낮으면요?', '캐시 대상·키 분산·TTL과 실제 접근 패턴을 분석하고 효율이 낮으면 캐시를 제거하거나 범위를 바꾼다고 답한다.'
    ),
    evidence: { status: '문서 근거', note: 'Scouter Cache Hit SQL 0 화면이 로컬 근거로 존재한다.', sources: ['phase2a-scouter-cache-hit2.png', '이벤트 목록 조회 성능 개선 Wiki'] },
    warnings: ['Cache Miss와 Hit 결과를 혼용하지 않는다.'], resumeClaims: ['Redis Cache Hit SQL 0회'], tags: ['캐시', 'Scouter', '검증', '5단계'],
  }),
  feedshopQuestion({
    id: 'FS-025', topic: '성능 측정', stage: '검증 근거', difficulty: '심화', priority: '핵심', minutes: 7,
    question: '응답시간 6,818ms에서 638ms, TPS 138에서 438 개선을 어떻게 설명하겠습니까?',
    answer: {
      compact: {
        conclusion: '동시 1,000 VUser에서 응답시간은 6,818→638ms, TPS는 138.7→438.3으로 개선됐습니다.',
        evidence1: 'QueryDSL로 쿼리 구조를 개선해 Cache Miss에서도 반복 SQL 병목을 해결했습니다.',
        evidence2: 'Redis Cache Hit로 재요청의 DB 접근을 없애 최종 응답 처리 성능을 확보했습니다.',
      },
      conclusion: '동시 가상 사용자 1,000명 조건에서 쿼리 구조 개선과 Redis 캐시 적용 전후를 비교한 결과입니다.',
      evidence1: '평균 응답시간은 약 91% 줄었고 TPS는 138.7에서 438.3으로 약 216% 증가한 nGrinder 화면이 있습니다.',
      evidence2: '중간 단계인 fetch join 적용 후에는 4,191ms였고, 최종 638ms에는 QueryDSL과 Cache Hit 효과가 함께 포함됩니다.',
      keywords: ['동시 1,000 VUser', '6,818ms', '638ms', 'TPS 138.7→438.3', '단계별 개선'],
      caution: '638ms를 QueryDSL 단독 효과로 말하지 않고 최종 캐시 단계라는 점을 구분한다.',
    },
    followups: feedshopFollowups(
      '평균만 보고 p95·p99는 확인하지 않았나요?', '현재 근거는 평균 중심이며 운영 판단에는 백분위 지연이 필요하다고 인정한다.',
      'TPS 216% 향상 계산은 맞나요?', '(438.3-138.7)/138.7 기준 약 216% 증가이며 최종 TPS는 약 3.16배라고 구분한다.',
      '재현 시 수치가 다르면요?', '환경과 데이터 차이를 기록하고 절대값보다 동일 조건의 반복 측정·분산과 병목 지표를 함께 비교한다고 답한다.'
    ),
    evidence: { status: '문서 근거', note: 'nGrinder 화면과 포트폴리오 수치는 일치하지만 원본 스크립트·토폴로지는 미확보다.', sources: ['v5_3 이력서 p.2', 'nGrinder Before·After 스크린샷'] },
    warnings: ['p95·p99 미확인.', '원본 부하 스크립트·테스트 토폴로지 미확인.'], resumeClaims: ['응답시간 6,818ms→638ms', 'TPS 138→438'], tags: ['성능 측정', 'nGrinder', '응답시간', 'TPS', '5단계'],
  }),
  feedshopQuestion({
    id: 'FS-026', topic: '성능 측정', stage: '기초 개념', difficulty: '기초', priority: '중요', minutes: 5,
    question: 'nGrinder와 Scouter는 각각 무엇을 확인하는 데 사용했나요?',
    answer: {
      compact: {
        conclusion: 'nGrinder는 부하 결과를, Scouter는 요청 내부 SQL 호출과 실행 흐름을 확인하는 데 썼습니다.',
        evidence1: 'nGrinder로 응답시간과 처리량, 오류를 비교해 성능 개선 근거를 확보했습니다.',
        evidence2: 'Scouter로 반복 SQL 감소와 Cache Hit의 DB 우회를 확인해 병목 해결 근거를 확보했습니다.',
      },
      conclusion: 'nGrinder는 동시 요청을 만들어 응답시간·TPS·오류를 측정하고, Scouter는 요청 내부의 SQL 호출 수와 실행 흐름을 확인하는 데 사용했습니다.',
      evidence1: 'nGrinder로 100·1,000명 조회 비교와 최대 3,000명 투표 부하 결과를 확인했습니다.',
      evidence2: 'Scouter XLog로 이벤트 목록 요청의 SQL이 42회에서 2회, Cache Hit에서 0회가 된 단계를 확인했습니다.',
      keywords: ['nGrinder', '부하 발생', 'Scouter', 'APM', 'SQL Count'],
      caution: '두 도구가 자동으로 원인을 확정해 준다고 말하지 않고 가설을 검증하는 관측 수단이라고 설명한다.',
    },
    followups: feedshopFollowups(
      'TPS와 동시 사용자 수의 차이는 무엇인가요?', '동시 사용자는 동시에 행동하는 가상 사용자 수, TPS는 초당 처리한 트랜잭션 수라고 답한다.',
      'JMeter 대신 nGrinder를 쓴 이유는 무엇인가요?', '당시 분산 실행·스크립트·결과 UI 등 사용 환경을 기준으로 선택했으며 절대 우위라고 말하지 않는다.',
      'APM 오버헤드는 고려했나요?', '관측 도구도 오버헤드가 있으므로 동일 조건 비교와 샘플링·에이전트 설정 확인이 필요하다고 답한다.'
    ),
    evidence: { status: '문서 근거', note: '도구 사용 화면과 수치가 포트폴리오에 남아 있다.', sources: ['nGrinder 결과 화면', 'Scouter XLog 화면'] },
    warnings: [], resumeClaims: ['nGrinder·Scouter 기반 성능 검증'], tags: ['성능 측정', 'nGrinder', 'Scouter', '2단계'],
  }),
  feedshopQuestion({
    id: 'FS-027', topic: '캐시', stage: '선택 이유', difficulty: '중급', priority: '중요', minutes: 5,
    question: 'Cloud Run 수평 확장 환경에서 로컬 캐시가 아니라 Redis를 선택한 이유는 무엇인가요?',
    answer: {
      compact: {
        conclusion: '여러 Cloud Run 인스턴스가 같은 캐시를 공유하도록 로컬 캐시 대신 Redis를 선택했습니다.',
        evidence1: '인스턴스마다 값과 만료가 달라질 수 있는 로컬 캐시의 구조적 불일치 위험을 피했습니다.',
        evidence2: '캐시 데이터와 무효화 정책을 중앙에서 공유해 일관된 조회 기준을 확보했습니다.',
      },
      conclusion: '인스턴스마다 서로 다른 로컬 캐시를 갖는 대신 모든 인스턴스가 같은 캐시를 참조하도록 하기 위해 공유 Redis를 선택했습니다.',
      evidence1: '로컬 캐시는 빠르고 단순하지만 인스턴스별 값과 만료 시점이 달라 무효화와 히트율이 분산될 수 있습니다.',
      evidence2: 'Redis는 네트워크 비용과 별도 장애 지점이 생기지만 캐시 데이터와 정책을 중앙에서 공유할 수 있습니다.',
      keywords: ['Cloud Run', '수평 확장', '공유 캐시', '로컬 캐시', '정합성'],
      caution: '실제 자동 확장 구간에서 여러 인스턴스의 캐시 일치를 부하 검증했다고 말하지 않는다.',
    },
    followups: feedshopFollowups(
      'Cloud Run 인스턴스가 실제 몇 개까지 늘었나요?', '실제 확장 인스턴스 수 로그가 없으면 설계 배경으로만 답한다.',
      'Caffeine 같은 1차 캐시와 같이 쓰면 더 빠르지 않나요?', '가능하지만 2단계 캐시 무효화와 인스턴스 간 불일치 비용이 늘어 요구 규모에 따라 선택한다고 답한다.',
      '공유 Redis가 병목이 되면요?', '명령·키 분포·메모리·네트워크를 관측하고 읽기 복제·클러스터·캐시 범위 축소를 검토한다고 답한다.'
    ),
    evidence: { status: '문서 근거', note: 'Cloud Run 공유 캐시 선택은 포트폴리오 설명이며 다중 인스턴스 실측은 미확인이다.', sources: ['v5_3 이력서 p.2', 'FeedShop 포트폴리오'] },
    warnings: ['실제 수평 확장 인스턴스 수·부하 검증 미확인.'], resumeClaims: ['Cloud Run 인스턴스 확장 환경의 Redis 공유 캐시'], tags: ['캐시', 'CloudRun', '수평확장', '3단계'],
  }),
  feedshopQuestion({
    id: 'FS-028', topic: 'CI/CD', stage: '구현 흐름', difficulty: '중급', priority: '중요', minutes: 6,
    question: 'FeedShop의 GitHub Actions CI/CD 흐름을 설명해 주세요.',
    answer: {
      compact: {
        conclusion: 'main 변경을 검증한 뒤 Docker 이미지를 GCR에 올리고 Cloud Run에 배포했습니다.',
        evidence1: '테스트와 Jacoco, SonarCloud 분석을 CI에 묶어 배포 전 품질 확인 기준을 확보했습니다.',
        evidence2: '이미지 빌드부터 배포와 헬스체크까지 자동화해 반복 가능한 배포 흐름을 확보했습니다.',
      },
      conclusion: 'main 브랜치 변경을 기준으로 테스트와 품질 검증을 수행하고, Docker 이미지를 만들어 GCR에 올린 뒤 Cloud Run에 배포하는 흐름입니다.',
      evidence1: 'CI 워크플로에는 테스트·Jacoco·SonarCloud 정적 분석 단계가 확인됩니다.',
      evidence2: '배포 워크플로에는 이미지 빌드, GCR push, Cloud Run 배포와 헬스체크 구성이 확인됩니다.',
      keywords: ['GitHub Actions', 'CI', 'Docker image', 'GCR', 'Cloud Run'],
      caution: '현재 최근 실행의 성공 로그와 무중단 배포 전략까지 확인했다고 말하지 않는다.',
    },
    followups: feedshopFollowups(
      'CI가 실패하면 배포는 막히나요?', '실제 워크플로 trigger와 job dependency를 파일 기준으로 설명한다.',
      '왜 Jenkins가 아니라 GitHub Actions였나요?', '저장소 이벤트와 통합이 단순한 선택이었고 FlexiRoute의 Jenkins 사용과 프로젝트별 환경을 구분한다.',
      '배포 후 헬스체크가 실패하면 자동 롤백되나요?', '헬스체크 존재는 확인됐지만 자동 롤백 정책은 확인되지 않았다고 답한다.'
    ),
    evidence: { status: '확인됨', note: 'CI와 Cloud Run 배포 워크플로 파일이 공개 저장소에 확인된다.', sources: ['.github/workflows/ci.yml', '.github/workflows/cd-deploy.yml'] },
    warnings: ['최근 성공 실행·자동 롤백 미확인.'], resumeClaims: ['GitHub Actions CI/CD', 'GCP Cloud Run·Docker 배포'], tags: ['CI/CD', 'GitHubActions', 'Docker', 'CloudRun', '4단계'],
  }),
  feedshopQuestion({
    id: 'FS-029', topic: 'CI/CD', stage: '검증 근거', difficulty: '중급', priority: '중요', minutes: 6,
    question: 'SonarCloud와 테스트 커버리지를 어떻게 품질 판단에 사용했나요?',
    answer: {
      compact: {
        conclusion: 'Jacoco 커버리지와 SonarCloud 품질 지표를 테스트 결과와 함께 판단 기준으로 사용했습니다.',
        evidence1: '테스트 결과와 도메인별 커버리지를 기록해 변경 검증의 가시성을 확보했습니다.',
        evidence2: '커버리지 수치와 별도로 정합성·트랜잭션 핵심 시나리오의 검증 여부를 판단했습니다.',
      },
      conclusion: '테스트 성공 여부만 보지 않고 Jacoco 커버리지와 SonarCloud의 Reliability·Coverage·인지 복잡도 결과를 함께 확인했습니다.',
      evidence1: '포트폴리오에는 전체 테스트 1,351건 실패 0건과 Feed 55.3%, Event 58.4% 커버리지 수치가 기록돼 있습니다.',
      evidence2: '다만 커버리지는 테스트 품질 자체가 아니므로 핵심 정합성·트랜잭션 시나리오가 실제로 검증되는지를 별도로 봐야 합니다.',
      keywords: ['SonarCloud', 'Jacoco', 'Reliability', 'Coverage', '인지 복잡도'],
      caution: '커버리지 수치가 최신 브랜치에서 재현됐다고 단정하지 않고 당시 기록임을 밝힌다.',
    },
    followups: feedshopFollowups(
      '왜 커버리지가 55~58%인데 충분하다고 봤나요?', '숫자 자체를 충분하다고 주장하지 않고 핵심 도메인 위험 시나리오 우선순위와 남은 공백을 설명한다.',
      'SonarCloud 경고를 모두 해결했나요?', '실제 해결한 항목과 남은 이슈를 확인한 범위에서만 답한다.',
      '테스트 수가 많으면 품질이 높나요?', '중복·가치 낮은 테스트가 있을 수 있어 변경 위험과 실패 시나리오를 얼마나 방어하는지가 중요하다고 답한다.'
    ),
    evidence: { status: '문서 근거', note: '워크플로와 포트폴리오 수치는 있으나 최신 실행 원본 재현은 미확인이다.', sources: ['FeedShop ci.yml', 'FeedShop 포트폴리오'] },
    warnings: ['1,351건·커버리지 수치는 당시 기록으로 표현.'], resumeClaims: ['SonarCloud 코드 품질 검증 파이프라인'], tags: ['CI/CD', 'SonarCloud', 'Jacoco', '검증', '5단계'],
  }),
  feedshopQuestion({
    id: 'FS-030', topic: 'CI/CD', stage: '기초 개념', difficulty: '기초', priority: '중요', minutes: 5,
    question: 'Docker와 Cloud Run을 이용한 배포 흐름에서 각각의 역할은 무엇인가요?',
    answer: {
      compact: {
        conclusion: 'Docker는 실행 환경을 이미지로 묶고, Cloud Run은 그 이미지를 관리형 환경에서 실행합니다.',
        evidence1: 'Dockerfile로 동일한 애플리케이션 이미지를 만들어 반복 가능한 배포 기준을 확보했습니다.',
        evidence2: 'GCR 이미지 배포와 Actuator 헬스체크를 연결해 서비스 상태 확인 흐름을 확보했습니다.',
      },
      conclusion: 'Docker는 애플리케이션과 실행 환경을 이미지로 묶고, Cloud Run은 그 컨테이너 이미지를 요청 기반으로 실행하는 관리형 플랫폼입니다.',
      evidence1: 'FeedShop은 Dockerfile로 이미지를 빌드해 GCR에 push하고 Cloud Run 서비스에 배포했습니다.',
      evidence2: '배포 후 Actuator 헬스체크로 서비스 상태를 확인하도록 구성했습니다.',
      keywords: ['Dockerfile', 'Container image', 'GCR', 'Cloud Run', 'Actuator'],
      caution: 'Cloud Run의 콜드 스타트·오토스케일·최소 인스턴스 설정을 실제 튜닝했다고 말하지 않는다.',
    },
    followups: feedshopFollowups(
      'Docker 이미지에 무엇을 포함했나요?', 'Dockerfile의 base image, jar 복사와 실행 명령을 실제 파일 기준으로 설명한다.',
      '왜 VM에 직접 배포하지 않았나요?', '컨테이너 기반 배포 단순성과 관리형 확장을 선택했지만 플랫폼 제약과 콜드 스타트 비용이 있다고 답한다.',
      '헬스체크는 애플리케이션 준비 상태까지 보장하나요?', '단순 프로세스 생존과 DB·Redis 의존성 readiness는 다르므로 actuator endpoint 설정을 확인해야 한다고 답한다.'
    ),
    evidence: { status: '확인됨', note: 'Docker·GCR·Cloud Run·헬스체크 워크플로가 저장소에 확인된다.', sources: ['Dockerfile', 'cd-deploy.yml'] },
    warnings: ['Cloud Run 세부 튜닝·무중단 보장 미확인.'], resumeClaims: ['GCP Cloud Run·Docker 기반 배포'], tags: ['CI/CD', 'Docker', 'CloudRun', '2단계'],
  }),
  feedshopQuestion({
    id: 'FS-031', topic: '협업', stage: '경험', difficulty: '중급', priority: '중요', minutes: 6,
    question: '부팀장으로 JIRA 가이드라인과 Slack 연동을 만든 이유와 효과는 무엇인가요?',
    answer: {
      compact: {
        conclusion: '작업 기준과 진행 상황을 팀이 함께 보게 해 우선순위 조율 비용을 줄이려고 만들었습니다.',
        evidence1: 'JIRA 티켓 작성 기준과 주간 스프린트를 운영해 작업 정의의 일관성을 확보했습니다.',
        evidence2: 'JIRA-Slack 알림으로 티켓과 커밋 흐름을 공유해 진행 상황의 가시성을 확보했습니다.',
      },
      conclusion: '누가 무엇을 왜 하고 있는지 팀이 같은 기준으로 볼 수 있게 해 우선순위 조율과 진행 상황 공유 비용을 줄이려는 목적이었습니다.',
      evidence1: '주간 스프린트와 백로그 우선순위를 운영하고 JIRA 티켓 작성 기준을 문서화했습니다.',
      evidence2: 'JIRA-Slack 알림을 연결해 티켓과 커밋 흐름을 팀 채널에서 추적할 수 있게 했습니다.',
      keywords: ['주간 스프린트', '백로그', 'JIRA 가이드', 'Slack 알림', '가시성'],
      caution: '개발 속도나 일정 준수율이 몇 퍼센트 개선됐다는 확인되지 않은 수치를 만들지 않는다.',
    },
    followups: feedshopFollowups(
      '가이드라인에 어떤 항목이 있었나요?', '티켓 제목·목적·완료 기준·연결 커밋 등 실제 문서에 있는 항목만 예로 든다.',
      '도구를 강제하면 팀 부담이 커지지 않나요?', '최소한의 공통 기준만 두고 팀 피드백으로 불필요한 필드는 줄였다는 방식으로 답하되 실제 사례와 일치하는지 확인한다.',
      '팀원이 티켓을 갱신하지 않으면요?', '감시보다 작업 결정에 필요한 정보라는 목적을 설명하고 회고에서 프로세스를 조정한다고 답한다.'
    ),
    evidence: { status: '문서 근거', note: 'JIRA 가이드와 Slack 연동은 이력서·포트폴리오에 있으나 정량 효과는 없다.', sources: ['v5_3 이력서 p.1', 'JIRA 협업 가이드라인'] },
    warnings: ['도입 효과의 정량 수치 미확인.'], resumeClaims: ['주간 스프린트 운영', 'JIRA 가이드라인', 'JIRA-Slack 연동'], tags: ['협업', '리더십', 'JIRA', 'Slack', '경험'],
  }),
];
