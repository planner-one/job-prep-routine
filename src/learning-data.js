export const LEARNING_SPRINT_START = '2026-09-04';
export const LEARNING_SPRINT_END = '2026-09-17';

export const COURSE_STATUS_LABELS = Object.freeze({
  sprint: '이번 2주',
  conditional: '조건부',
  later: '다음 학습',
  excluded: '이번에는 제외',
});

export const LEARNING_MODE_LABELS = Object.freeze({
  internalize: '체화',
  apply: '적용',
  collect: '수집',
  career: '취업 적용',
});

const course = (id, title, status, mode, duration = '') => ({ id, title, status, mode, duration });

export const COURSES = Object.freeze([
  course('extra-342699', "실리콘 밸리 개발자와 함께하는 실전 AI 에이전트 핵심 원리 및 확장 개발", 'later', 'collect', '6시간 57분'),
  course('extra-340328', "개발자 기술면접 완벽 가이드 : 면접관 100회의 합격 프레임", 'later', 'career', '5시간 6분'),
  course('35', '[Lv1] 면접에서 설명할 수 있는 Spring Boot', 'sprint', 'internalize', '9시간 58분'),
  course('33', '[Lv2] 현업 개발자의 JPA 완전 정복', 'sprint', 'internalize', '9시간 39분'),
  course('34', '[취업폭격기] 사기업 IT취업 치트키', 'sprint', 'career', '6시간 9분'),
  course('22', '가장 쉬운 동시성 문제 - Race Condition', 'sprint', 'internalize', '3시간 54분'),
  course('extra-spring-db2', '스프링 DB 2편 - 트랜잭션 이해·전파', 'sprint', 'internalize', '선별 5시간 8분'),
  course('extra-mysql', 'MySQL 성능 최적화 입문/실전 - SQL 튜닝편', 'sprint', 'apply', '2시간 42분'),
  course('extra-load-test', '대규모 트래픽 처리를 위한 부하 테스트 입문/실전', 'sprint', 'apply', '3시간 27분'),
  course('23', '실전에서 바로 써먹는 Elasticsearch 입문 (검색 최적화편)', 'sprint', 'internalize', '6시간 57분'),
  course('extra-system-design', '시스템 디자인 첫걸음: 면접에서 돋보이는 백엔드 아키텍처 설계하기', 'sprint', 'internalize', '4시간 59분'),

  course('1', '빠르게 배우는 Spring Cloud 기초(MSA)', 'conditional', 'collect', '8시간 48분'),
  course('2', '스프링부트로 직접 만들면서 배우는 대규모 시스템 설계 - 캐시 전략', 'conditional', 'apply', '7시간 40분'),
  course('11', '제미니의 개발실무 - 커머스 백엔드 레거시와 AI 활용편', 'conditional', 'collect', '9시간 7분'),
  course('15', '카카오 면접관이 알려주는 반드시 알아야 하는 Distributed Environment', 'conditional', 'collect', '6시간 27분'),
  course('19', '금융 인프라를 운영하는 Toss 개발자의 Docker', 'conditional', 'collect'),
  course('37', '핵심만 빠르게 끝내는 실전 카프카(Kafka)', 'conditional', 'collect', '3시간 3분'),
  course('45', '카카오 면접관이 알려주는 MSA 관점에서의 분산 트랜잭션 패턴', 'conditional', 'collect'),
  course('46', '카카오 면접관이 알려주는 수백 개의 MSA 서비스 아키텍처에서의 분산 추적 시스템', 'conditional', 'collect'),
  course('extra-java', 'CS 기술면접 6 - 말이 트이는 자바와 객체지향', 'conditional', 'internalize', '3시간 6분'),

  course('3', '개발자라면 꼭 알아야 할 시스템 디자인 완벽 가이드', 'later', 'collect', '3시간 59분'),
  course('5', '카프카 완벽 가이드 - 코어편', 'later', 'collect', '22시간 53분'),
  course('6', '[백엔드/예외처리 시나리오/집계 최적화] 백엔드 포트폴리오와 실무 이력 강화 전략. 올인원 PART1', 'later', 'collect'),
  course('7', '마이크로서비스 디자인 패턴 완벽 가이드', 'later', 'collect', '26시간 38분'),
  course('9', '[4주 완성] 시니어로 도약을 위한 클린 아키텍처 with AI', 'later', 'collect'),
  course('10', '주문시스템으로 알아보는 분산 트랜잭션', 'later', 'collect'),
  course('12', '카카오 면접관과 함께하는 워크플로우 기반의 대용량 트래픽 처리 기법', 'later', 'collect'),
  course('16', '네이버 면접관이 알려주는 1,000,000++ TPS를 위한 NGINX', 'later', 'collect'),
  course('18', '카카오 면접관의 실무 밀착형 Spring Batch: 대용량 데이터 처리의 모든 것', 'later', 'collect'),
  course('20', '금융 인프라를 운영하는 Toss 개발자의 Kubernetes', 'later', 'collect'),
  course('21', '코드로 끝내는 분산 트랜잭션 (feat. AI Agent)', 'later', 'collect'),
  course('27', 'AWS로 배우는 네트워크: 이론부터 실무까지', 'later', 'collect'),
  course('31', '6주 완성! 백엔드 이력서 차별화 전략 4가지 - 똑같은 이력서 속에서 돋보이는 법', 'later', 'career'),
  course('32', 'The 10x AI-Native Developer: 회사에서 AI로 압도적 성과를 내는 법', 'later', 'collect', '15시간 26분'),
  course('36', 'EKS를 활용한 Spring 운영 서버 배포 (feat. DevOps의 모든 것)', 'later', 'collect'),
  course('40', 'Spring Batch 입문: 3시간 만에 끝내는 대용량 처리의 기초', 'later', 'collect'),

  course('4', '카프카 완벽 가이드 - 커넥트(Connect) 편', 'excluded', 'collect', '24시간 35분'),
  course('8', '[취업폭격기] 공공기관 전산직 취업 치트키: NCS·전공·PT면접까지 한 번에 뚫는 정규과정', 'excluded', 'career', '24시간 7분'),
  course('13', '토스 개발자와 함께하는 Data Workflow Management 기반의 대용량 데이터 처리 설계 패턴', 'excluded', 'collect'),
  course('14', '카카오, 토스 개발자가 알려주는 수백 개의 MSA 환경에서의 성능 보장을 위한 RPC 처리 기법', 'excluded', 'collect'),
  course('17', '카카오 면접관이 알려주는 문서 기반의 프레임워크 통신 패턴을 위한 GraphQL', 'excluded', 'collect'),
  course('24', '비전공자도 이해할 수 있는 MSA 입문/실전 (feat. Spring Boot)', 'excluded', 'collect'),
  course('25', '유행 말고 내공. 30년 차 개발자의 실전 바이브 코딩', 'excluded', 'collect'),
  course('26', '모든 웹 개발자가 봐야 할 단 한 장의 지도', 'excluded', 'collect'),
  course('28', 'Claude Code로 만드는 1인 개발자 자동화 시스템 - Sidabari 프로젝트', 'excluded', 'collect'),
  course('29', '클로드로 딸깍! 루프 엔지니어링으로 통합 자산관리 시스템 개발하기', 'excluded', 'collect'),
  course('30', '코덱스 참교육 - Codex 업무 자동화부터 바이브 코딩까지', 'excluded', 'collect'),
  course('38', '[기초 스피치] 14년 차 아나운서에게 배우는 말 잘하는 방법!', 'excluded', 'collect'),
  course('39', '주식투자 뉴스, 공시 등 재료를 공부하실 수 있는 가이드북을 드립니다.', 'excluded', 'collect'),
  course('41', '3시간에 끝내는 디지털 마케팅의 모든 것', 'excluded', 'collect'),
  course('42', '광고비 0원, 검색 유입만으로 쉽게 돈 벌자! AI 시대 맞춤 SEO', 'excluded', 'collect'),
  course('43', '블록체인 채굴 모듈 만들어보기', 'excluded', 'collect'),
  course('44', '컴맹도 따라하는 주식 바이브코딩 - AI로 만드는 주식 자동매매 시스템', 'excluded', 'collect'),
]);

const day = (date, phase, focus, courseIds, question, review = '') => ({
  date, phase, focus, courseIds, question, review,
});

export const SPRINT_DAYS = Object.freeze([
  day('2026-09-04', '기준 측정', 'Java·Spring 현재 수준 확인', ['35', 'extra-java'], 'Spring 요청은 어떤 계층을 거쳐 처리되는가?', '첫날은 현재 답변을 저장해 이후 회상과 비교합니다.'),
  day('2026-09-05', '기반 복구', 'IoC·DI와 Spring 빈', ['35', '34'], 'Spring은 객체를 어떻게 만들고 연결하는가?', 'D+1 · 9/4 기준 답변을 노트 없이 90초로 다시 설명한 뒤 확인'),
  day('2026-09-06', '기반 복구', '프록시·AOP', ['35'], '왜 자기 호출에서는 @Transactional이 적용되지 않을 수 있는가?', 'D+1 · 9/5 IoC·DI 질문 3개에 먼저 답한 뒤 막힌 부분만 확인'),
  day('2026-09-07', '기반 복구', '트랜잭션·예외 처리', ['35', 'extra-spring-db2'], '트랜잭션의 시작·커밋·롤백은 어디에서 일어나는가?', 'D+1 · 9/6 프록시·AOP / D+3 · 9/4 기준 답변'),
  day('2026-09-08', 'JPA 복구', '영속성 컨텍스트·변경 감지', ['33'], '영속성 컨텍스트는 엔티티 변경을 언제 SQL로 만드는가?', 'D+1 · 9/7 트랜잭션 / D+3 · 9/5 IoC·DI'),
  day('2026-09-09', 'JPA 복구', 'save·flush·예외 시점', ['33', 'extra-spring-db2'], '유니크 제약 예외는 save와 flush 중 언제 확인되는가?', 'D+1 · 9/8 영속성 컨텍스트 / D+3 · 9/6 프록시·AOP'),
  day('2026-09-10', 'JPA 복구', '지연 로딩·N+1·fetch join', ['33'], 'FeedShop 조회에서 SQL 42회는 어떤 구조로 발생했는가?', 'D+1 · 9/9 save·flush / D+3 · 9/7 트랜잭션'),
  day('2026-09-11', '성능 연결', 'QueryDSL·인덱스·실행 계획', ['33', 'extra-mysql'], 'fetch join 이후에도 DB 인덱스를 따로 확인해야 하는 이유는 무엇인가?', 'D+1 · 9/10 N+1 / D+3 · 9/8 영속성 / D+7 · 9/4 기준 답변'),
  day('2026-09-12', '트랜잭션 연결', '전파·호출 경계', ['extra-spring-db2'], 'FeedVote 흐름에서 REQUIRED와 NOT_SUPPORTED의 경계는 어디인가?', 'D+1 · 9/11 인덱스 / D+3 · 9/9 save·flush / D+7 · 9/5 IoC·DI'),
  day('2026-09-13', '동시성 연결', 'TOCTOU·DB 유니크 제약', ['22'], '동시에 두 투표 요청이 들어오면 어느 구간에서 경쟁하는가?', 'D+1 · 9/12 전파 / D+3 · 9/10 N+1 / D+7 · 9/6 프록시·AOP'),
  day('2026-09-14', '동시성 연결', '락·Redis INCR·정합성', ['22', '2'], 'DB 제약과 Redis INCR은 각각 무엇을 보장하는가?', 'D+1 · 9/13 Race Condition / D+3 · 9/11 인덱스 / D+7 · 9/7 트랜잭션'),
  day('2026-09-15', '검증 연결', '부하 테스트·캐시', ['extra-load-test', '2'], '91% 개선 수치를 공정하게 비교하려면 어떤 조건이 필요한가?', 'D+1 · 9/14 락·Redis / D+3 · 9/12 전파 / D+7 · 9/8 영속성'),
  day('2026-09-16', '확장 적용', '시스템 디자인·Elasticsearch', ['extra-system-design', '23'], 'FeedShop 검색에 Elasticsearch를 넣으면 데이터 흐름은 어떻게 바뀌는가?', 'D+1 · 9/15 부하 테스트 / D+3 · 9/13 동시성 / D+7 · 9/9 save·flush'),
  day('2026-09-17', '최종 통합', 'FeedShop·3M·검색 설명', ['23', '15', '1'], '핵심 세 프로젝트 주장을 근거와 한계까지 설명할 수 있는가?', 'D+1 · 9/16 검색 / D+3 · 9/14 Redis / D+7 · 9/10 N+1, 이후 최종 모의면접'),
]);

export const ROUTINE_STEPS = Object.freeze([
  { id: 'recall', label: '노트 없이 전날 질문에 답하기' },
  { id: 'question', label: '체화 질문 하나 정하기' },
  { id: 'watch', label: '관련 강의 20~25분 보기' },
  { id: 'explain', label: '닫고 문제·동작·실패·프로젝트 회상하기' },
  { id: 'verify', label: '코드·실험·흐름 중 하나로 확인하기' },
  { id: 'speak', label: '90초 설명하고 다음 질문 3개 남기기' },
]);
