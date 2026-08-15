window.INTERVIEW_GUIDE_FEEDBACK = {
  version: '2026-08-15',
  title: '면접 준비 가이드',
  description: '면접 준비 가이드의 말하기 구조를 현재 코드·이력서 근거와 대조해 보완한 답변입니다.',
  questions: {
    'BH-002': {
      sourceSection: 'PART A Q1 · PART B Q1',
      feedback: [
        '첫 문장에서 수치 검증과 협업 체계 구축이라는 두 강점을 함께 전달합니다.',
        '기술 성과는 대표 수치만 말하고, 마지막 문장은 입사 후 기여 방식으로 연결합니다.',
        '3,000명은 실제 서비스 사용자가 아니라 nGrinder의 동시 가상 사용자 구간으로 표현합니다.',
      ],
      answer: {
        compact: {
          conclusion: '안녕하십니까. 수치로 성능과 정합성을 검증하고 팀의 협업 기준까지 만들어 끝까지 완수하는 백엔드 개발자 정민수입니다.',
          evidence1: 'FeedShop에서 SQL을 42회에서 2회로 줄이고 최종 캐시 단계에서 평균 응답시간을 6,818ms에서 638ms로 개선했습니다.',
          evidence2: '동시 가상 사용자 3,000명 투표 테스트와 JIRA·Slack 협업 체계 구축 경험을 바탕으로 재현 가능한 결과를 만들겠습니다.',
        },
        conclusion: '저는 문제를 감으로 넘기지 않고 수치로 검증하며, 팀이 같은 기준으로 실행할 수 있는 흐름까지 만드는 백엔드 개발자입니다.',
        evidence1: 'FeedShop에서 QueryDSL로 SQL을 42회에서 2회로 줄인 뒤 Redis 캐시를 적용해 평균 응답시간을 6,818ms에서 638ms로 개선했고, 투표는 DB 유니크 제약과 Redis INCR로 책임을 나눠 동시 가상 사용자 3,000명 구간에서 HTTP 오류와 중복 저장 0건을 확인했습니다.',
        evidence2: '프로젝트에서는 주간 스프린트, 백로그 우선순위, JIRA 작성 기준과 Slack 알림을 정리해 팀의 진행 상황을 투명하게 만들었습니다. 입사 후에도 기술 선택의 이유와 검증 결과를 팀이 재사용할 수 있는 기준으로 남기겠습니다.',
        keywords: ['수치 검증', '정합성', '성능 개선', '협업 체계', '끝까지 완수'],
        caution: '3,000명을 실사용자 수나 초당 요청 수로 바꾸지 않고 nGrinder 동시 가상 사용자 구간이라고 말한다.',
      },
    },
    'BH-005': {
      sourceSection: 'PART A Q2',
      feedback: [
        '강점을 추상적인 집요함으로 끝내지 않고 문제 발견부터 검증까지 이어간 행동으로 설명합니다.',
        '대표 수치를 하나만 붙여 답변의 신뢰도를 높입니다.',
      ],
      answer: {
        compact: {
          conclusion: '저의 강점은 문제의 원인을 끝까지 추적하고 결과를 수치로 검증하는 실행력입니다.',
          evidence1: 'FeedShop의 조회 병목을 쿼리 구조부터 개선해 SQL을 42회에서 2회로 줄였습니다.',
          evidence2: '부팀장으로 스프린트와 백로그까지 운영하며 개인의 해결을 팀의 실행 기준으로 연결했습니다.',
        },
        conclusion: '저의 가장 큰 강점은 문제를 발견한 뒤 원인 분석, 구현, 검증까지 끊기지 않게 추진하는 실행력입니다.',
        evidence1: 'FeedShop에서 N+1과 메모리 필터링이 섞인 조회 병목을 분석하고 QueryDSL과 캐시를 단계적으로 적용해 SQL 42회를 2회로 줄이고 최종 평균 응답시간을 638ms까지 낮췄습니다.',
        evidence2: '개인 작업으로 끝내지 않고 주간 스프린트와 백로그 우선순위를 운영해 팀이 같은 근거로 다음 작업을 판단할 수 있게 했습니다.',
        keywords: ['원인 추적', '끝까지 실행', '수치 검증', '팀 기준'],
        caution: '집요함을 성격 표현으로만 말하지 말고 직접 맡은 범위와 검증 수치를 함께 제시한다.',
      },
    },
    'BH-006': {
      sourceSection: 'PART A Q2',
      feedback: [
        '약점은 실제 지연 위험을 인정한 뒤 현재 사용하는 통제 방법까지 한 흐름으로 답합니다.',
        '핵심 품질과 후속 개선을 구분해 완벽주의를 장점처럼 포장하지 않습니다.',
      ],
      answer: {
        compact: {
          conclusion: '문제를 깊게 파고들다 초기 판단이 늦어질 때가 있어, 핵심 범위를 먼저 정하고 주간 스프린트와 백로그 우선순위로 작업 시간을 통제합니다.',
          evidence1: '데이터 정합성·보안처럼 반드시 지킬 기준과 후속 개선 항목을 먼저 분리합니다.',
          evidence2: '남은 항목은 다음 스프린트에 명시해 품질을 숨기지 않으면서 실행 속도를 유지합니다.',
        },
        conclusion: '저의 보완점은 문제를 충분히 이해하려는 과정에서 초기 설계와 판단 시간이 길어질 수 있다는 점입니다.',
        evidence1: '이를 줄이기 위해 시작 전에 이번 스프린트에서 반드시 지킬 품질 기준과 완료 범위를 먼저 정하고, 추가 탐색에는 시간 제한을 둡니다.',
        evidence2: '즉시 필요하지 않은 개선은 근거와 우선순위를 백로그에 남겨 다음 스프린트로 넘기며, 깊이와 속도 사이의 균형을 관리하고 있습니다.',
        keywords: ['초기 판단 지연', '핵심 범위', '시간 제한', '백로그'],
        caution: '결정이 실제로 늦어졌던 본인 사례를 설명할 수 있을 때만 이 약점을 사용한다.',
      },
    },
    'BH-009': {
      sourceSection: 'PART A Q3',
      feedback: [
        '상대방을 설득하는 이야기보다 공통 목표와 판단 기준을 맞추는 과정을 먼저 말합니다.',
        '현재 자료에는 구체적인 갈등 사건이 없으므로 원칙과 확인된 협업 방식까지만 답합니다.',
      ],
      answer: {
        compact: {
          conclusion: '의견이 다르면 상대의 의도와 비즈니스 우선순위를 먼저 듣고 사용자 영향·선행 작업·일정 위험을 공통 기준으로 비교합니다.',
          evidence1: 'FeedShop에서는 백로그의 영향과 선행 관계를 티켓에 드러내 논의 기준을 맞췄습니다.',
          evidence2: '결정된 방향은 함께 실행하고 보류된 제안은 근거와 함께 백로그에 남깁니다.',
        },
        conclusion: '기술적 의견 차이가 생기면 누가 맞는지를 먼저 정하기보다 상대의 의도와 팀의 공통 목표를 확인합니다.',
        evidence1: '그다음 사용자 영향, 선행 작업, 확장성, 일정 위험처럼 함께 확인할 수 있는 기준으로 선택지를 비교하고 결정 기한과 책임자를 명확히 합니다.',
        evidence2: '최종 방향이 정해지면 팀의 결정을 실행하고, 채택되지 않은 제안은 다시 검토할 조건과 함께 백로그에 남겨 같은 논의를 반복하지 않도록 합니다.',
        keywords: ['의도 경청', '공통 목표', '판단 기준', '결정 실행', '백로그'],
        caution: '구체적인 갈등 상대·주장·결과는 본인이 확인하기 전 만들어 말하지 않는다.',
      },
    },
    'BH-012': {
      sourceSection: 'PART A Q4',
      feedback: [
        '일정과 품질을 양자택일하지 않고 최소 안전 기준과 배포 범위를 함께 결정합니다.',
        '기술 부채는 막연히 다음에 고친다고 하지 않고 제거 조건과 담당 시점을 기록합니다.',
      ],
      answer: {
        compact: {
          conclusion: '데이터·보안·복구 가능성 같은 최소 안전 기준은 지키고, 나머지 범위를 줄여 일정 안에 배포하겠습니다.',
          evidence1: '핵심 경로와 후속 개선을 나눠 타임투마켓과 장애 위험을 함께 관리합니다.',
          evidence2: '미룬 항목은 영향·제거 조건·담당 시점을 리팩터링 백로그에 남깁니다.',
        },
        conclusion: '마감과 품질이 충돌하면 서비스의 핵심 불변식과 복구 가능성은 타협하지 않고, 기능 범위를 조정해 일정 안에 검증 가능한 결과를 내겠습니다.',
        evidence1: '데이터 정합성, 보안, 치명적 장애 위험을 최소 품질 기준으로 먼저 합의하고 핵심 사용자 경로부터 작은 범위로 배포합니다.',
        evidence2: '후속 개선은 단순 메모가 아니라 현재 위험, 제거 조건, 담당 시점을 백로그에 기록해 임시 선택이 숨은 기술 부채가 되지 않게 관리합니다.',
        keywords: ['최소 안전 기준', '범위 조정', '정시 배포', '기술 부채'],
        caution: '무조건 일정 우선 또는 무조건 품질 우선으로 답하지 않고 위험과 범위 조정 기준을 함께 말한다.',
      },
    },
    'FS-003': {
      sourceSection: 'PART A Q6 · PART B Q3',
      feedback: [
        '중복 저장과 카운터 갱신을 서로 다른 불변식으로 나눠 설명합니다.',
        '가이드의 “정합성을 완벽히 방어” 표현은 DB와 Redis 사이의 실패 구간을 숨기므로 사용하지 않습니다.',
        'Redis 카운터는 DB COUNT로 복구 가능한 파생 값이라는 기준을 함께 말합니다.',
      ],
      answer: {
        compact: {
          conclusion: 'TOCTOU 중복 저장은 DB 유니크 제약으로 막고, 빈번한 카운터 증가는 Redis INCR로 분리해 각 문제에 맞는 책임을 부여했습니다.',
          evidence1: '(event_id, voter_id) 조합을 DB가 최종 저장 시점에 강제합니다.',
          evidence2: 'Redis 카운터는 DB COUNT로 다시 계산할 수 있는 파생 값으로 두어 실패 후 복구 기준을 유지합니다.',
        },
        conclusion: '투표 여부 확인과 저장 사이의 TOCTOU 문제와 같은 카운터 행의 쓰기 집중은 실패 기준이 달라 하나의 락으로 묶지 않고 책임을 분리했습니다.',
        evidence1: '사용자별 투표 기록은 (event_id, voter_id) DB 유니크 제약으로 저장 시점의 불변식을 강제해 다중 인스턴스에서도 중복 저장을 차단했습니다.',
        evidence2: '투표 수는 Redis INCR로 원자적으로 증가시키되 DB 기록을 최종 원본으로 두고, DB 성공 뒤 INCR 실패처럼 일시적 불일치가 생기면 DB COUNT로 보정하도록 설계했습니다.',
        keywords: ['TOCTOU', 'DB 유니크', 'Redis INCR', '책임 분리', 'DB 원본'],
        caution: 'DB 저장과 Redis INCR가 하나의 원자적 트랜잭션이라고 말하지 않는다.',
      },
    },
    'AC-002': {
      sourceSection: 'PART A Q7',
      feedback: [
        '서비스 수가 아니라 서로 다른 변경 이유를 경계 설정의 근거로 설명합니다.',
        'CBO 0건은 측정 범위의 결과이지 서비스 간 결합이 완전히 사라졌다는 뜻이 아닙니다.',
      ],
      answer: {
        compact: {
          conclusion: 'Auth와 User는 인증 정책과 사용자·역할 정책이라는 서로 다른 변경 이유를 기준으로 분리했습니다.',
          evidence1: 'Auth가 User를 조회하는 단방향 Feign 계약으로 소스 수준의 순환 의존을 제거했습니다.',
          evidence2: '대신 네트워크 호출과 DTO 계약 관리 비용이 생긴다는 한계도 함께 고려했습니다.',
        },
        conclusion: 'Auth와 User는 기능 개수보다 변경 이유와 장애 영향 범위를 기준으로 경계를 나눴습니다.',
        evidence1: 'Auth는 로그인·토큰 정책, User는 사용자 정보·역할 정책의 변경을 담당하게 해 한쪽 변경이 다른 서비스의 코드와 배포로 번지는 범위를 줄였습니다.',
        evidence2: '필요한 사용자 정보는 Auth에서 User로 향하는 단방향 Feign DTO 계약으로 조회해 소스 수준의 순환 의존을 제거했지만, 서비스 간 계약과 장애 대응 책임은 남습니다.',
        keywords: ['변경 이유', '장애 영향', '단방향 Feign', '계약 결합'],
        caution: 'CBO 0건이나 순환 의존 0건을 모든 형태의 결합 제거로 확대하지 않는다.',
      },
    },
    'AC-014': {
      sourceSection: 'PART A Q8',
      feedback: [
        'UUID 사용 목적을 식별자 선택이 아니라 도메인 간 객체 참조 제거와 연결합니다.',
        '컴파일 타임 결합 감소와 함께 참조 무결성·추가 HTTP 호출이라는 비용을 말합니다.',
      ],
      answer: {
        compact: {
          conclusion: '다른 도메인의 Entity를 직접 참조하지 않고 UUID만 보관해 객체 그래프와 컴파일 타임 결합을 줄였습니다.',
          evidence1: '필요한 실제 데이터는 WebClient 기반 HTTP 경계에서 조회했습니다.',
          evidence2: '대신 고아 식별자와 네트워크 실패를 처리할 정책이 새 책임으로 남습니다.',
        },
        conclusion: 'FlexiRoute에서는 다른 도메인의 Entity 객체를 직접 참조하지 않고 대상의 UUID만 보관해 도메인 사이의 컴파일 타임 결합을 줄였습니다.',
        evidence1: '가게·리뷰·카테고리 같은 도메인은 식별자만 공유하고 실제 정보가 필요할 때 WebClient 기반 HTTP 통신으로 조회해 변경 경계를 분리했습니다.',
        evidence2: '이 선택은 직접 객체 참조를 줄이는 대신 참조 대상 삭제, 네트워크 지연·실패, 데이터 정합성 정책을 애플리케이션에서 다뤄야 하는 비용이 있습니다.',
        keywords: ['UUID', '식별자 참조', '도메인 경계', 'WebClient', '참조 무결성'],
        caution: 'UUID 사용만으로 서비스 독립성과 데이터 정합성이 자동 보장된다고 말하지 않는다.',
      },
    },
    'AC-028': {
      sourceSection: 'PART B CS 표',
      feedback: [
        '프록시 호출 경계와 기본 rollback 규칙을 함께 설명합니다.',
        '같은 객체 내부 호출에서는 프록시를 우회한다는 대표 한계를 답변에 포함합니다.',
      ],
      answer: {
        compact: {
          conclusion: '@Transactional은 Spring 프록시가 호출을 가로채 트랜잭션을 시작하고 정상 종료 시 commit, 기본 rollback 대상 예외 시 rollback하는 방식입니다.',
          evidence1: '같은 객체 내부 호출은 프록시를 거치지 않아 새 트랜잭션 설정이 적용되지 않을 수 있습니다.',
          evidence2: '기본 rollback 대상은 RuntimeException과 Error이며 checked exception은 별도 정책이 필요합니다.',
        },
        conclusion: '@Transactional 메서드는 Spring AOP 프록시가 외부 호출을 가로채 TransactionManager를 통해 트랜잭션의 시작과 종료를 관리합니다.',
        evidence1: '정상 반환 시 commit하고 기본적으로 RuntimeException과 Error가 발생하면 rollback하며, checked exception은 rollbackFor 같은 명시적 정책이 필요합니다.',
        evidence2: '같은 객체의 메서드를 직접 호출하면 프록시를 우회해 propagation 같은 새 설정이 적용되지 않을 수 있으므로 실제 트랜잭션 경계는 별도 빈이나 명시적 호출 구조로 확인해야 합니다.',
        keywords: ['Spring AOP', '프록시', 'TransactionManager', 'rollback', 'self-invocation'],
        caution: '모든 예외가 자동 rollback되거나 어노테이션만 붙이면 내부 호출에도 항상 적용된다고 말하지 않는다.',
      },
    },
    'AC-029': {
      sourceSection: 'PART A CS 표 · PART B CS 표',
      feedback: [
        '영속성 컨텍스트와 트랜잭션의 역할을 같은 개념처럼 단정하지 않습니다.',
        'OSIV가 켜진 경우 요청이 끝날 때까지 컨텍스트가 열릴 수 있다는 차이를 설명합니다.',
      ],
      answer: {
        compact: {
          conclusion: '영속성 컨텍스트는 엔티티를 관리하는 작업 공간이며, 보통 트랜잭션 안에서 변경 감지와 flush가 일어나지만 OSIV 설정에 따라 생명주기는 요청까지 확장될 수 있습니다.',
          evidence1: '1차 캐시, 동일성 보장, 변경 감지와 쓰기 지연을 제공합니다.',
          evidence2: 'OSIV를 끄면 필요한 연관 데이터는 트랜잭션 안에서 조회해 DTO로 전달해야 합니다.',
        },
        conclusion: '영속성 컨텍스트는 EntityManager가 엔티티를 식별자 기준으로 관리하며 1차 캐시, 동일성 보장, 변경 감지와 쓰기 지연을 제공하는 작업 공간입니다.',
        evidence1: '트랜잭션 안에서는 변경 감지 결과가 flush되고 commit으로 확정되지만, 영속성 컨텍스트의 생명주기 자체가 언제나 트랜잭션과 완전히 같은 것은 아닙니다.',
        evidence2: 'Spring의 OSIV가 켜져 있으면 요청 종료까지 컨텍스트가 열려 View 계층의 지연 로딩이 가능하고, 끄면 필요한 연관 데이터를 서비스 트랜잭션 안에서 조회하거나 DTO로 명시해야 합니다.',
        keywords: ['영속성 컨텍스트', '1차 캐시', '변경 감지', 'flush', 'OSIV'],
        caution: 'OSIV가 꺼지면 항상 DTO만 가능하다고 단정하지 않고 트랜잭션 안의 명시적 fetch도 대안으로 설명한다.',
      },
    },
    'AC-031': {
      sourceSection: 'PART A Q5 · PART B Q2',
      feedback: [
        '가이드의 이미지·댓글 표현 대신 현재 코드 근거에서 확인된 이벤트 목록의 eventDetail·rewards 조회로 바로잡습니다.',
        '638ms는 QueryDSL 단독 결과가 아니라 최종 Redis Cache Hit 단계가 포함된 수치로 구분합니다.',
        '캐시는 Cache Miss 때의 N+1 구조를 해결하지 못하므로 쿼리 최적화를 먼저 설명합니다.',
      ],
      answer: {
        compact: {
          conclusion: '이벤트 목록에서 eventDetail과 rewards를 반복 조회하던 N+1을 QueryDSL fetch join으로 먼저 줄이고, 그다음 Redis 캐시를 적용했습니다.',
          evidence1: '요청당 SQL은 42회에서 2회로 줄었습니다.',
          evidence2: '최종 Cache Hit 단계에서 평균 응답시간은 6,818ms에서 638ms로 개선됐습니다.',
        },
        conclusion: 'FeedShop의 이벤트 목록에서 연관된 eventDetail과 rewards를 항목마다 다시 조회하고 일부 조건을 메모리에서 처리하면서 요청당 SQL이 42회 발생했습니다.',
        evidence1: 'Cache Miss에도 병목이 남지 않게 QueryDSL의 leftJoin·fetchJoin과 DB 조건 조회로 구조를 먼저 바꿔 SQL을 2회로 줄였습니다.',
        evidence2: '그 뒤 읽기 빈도가 높고 변경이 적은 이벤트 목록에 Redis 캐시를 적용했고, nGrinder 검증에서 평균 응답시간은 6,818ms에서 최종 638ms로 단축됐습니다.',
        keywords: ['이벤트 목록', 'eventDetail', 'rewards', 'SQL 42→2', 'Redis Cache Hit'],
        caution: '638ms를 fetch join 단독 효과로 말하지 않고 QueryDSL 개선 후 최종 캐시 단계의 결과라고 구분한다.',
      },
    },
    'AC-032': {
      sourceSection: 'PART B CS 표',
      feedback: [
        '격리 수준의 이름만 나열하지 않고 대표 이상 현상과 비용을 연결합니다.',
        'MySQL REPEATABLE READ에서 phantom read가 항상 발생하지 않는다는 식의 단정 대신 consistent read와 locking read를 구분합니다.',
      ],
      answer: {
        compact: {
          conclusion: 'READ UNCOMMITTED부터 SERIALIZABLE로 갈수록 이상 현상은 줄지만 락·재시도·처리량 비용이 커질 수 있습니다.',
          evidence1: 'Dirty read, non-repeatable read, phantom read를 각 수준과 연결해 설명합니다.',
          evidence2: 'MySQL InnoDB의 REPEATABLE READ는 일관 읽기에 MVCC를, 잠금 읽기에는 next-key lock을 사용하므로 읽기 방식까지 구분해야 합니다.',
        },
        conclusion: '트랜잭션 격리 수준은 동시에 실행되는 트랜잭션이 서로의 변경을 어느 범위까지 볼지 정하는 기준이며 READ UNCOMMITTED, READ COMMITTED, REPEATABLE READ, SERIALIZABLE 네 수준으로 설명할 수 있습니다.',
        evidence1: '수준이 높아질수록 dirty read, non-repeatable read, phantom read 같은 이상 현상은 줄지만 대기, 충돌, 재시도와 처리량 비용이 커질 수 있습니다.',
        evidence2: 'MySQL InnoDB의 REPEATABLE READ에서 일반 consistent read는 MVCC snapshot을 사용하고 locking read는 gap·next-key lock이 개입하므로 “phantom read가 무조건 없다”보다 조회 방식과 DB 구현을 함께 설명해야 합니다.',
        keywords: ['Isolation Level', 'MVCC', 'consistent read', 'gap lock', 'next-key lock'],
        caution: '표준 격리 수준의 이름만으로 MySQL과 PostgreSQL의 실제 동작이 같다고 가정하지 않는다.',
      },
    },
    'AC-033': {
      sourceSection: 'PART A CS 표',
      feedback: [
        '낙관적 락과 비관적 락을 충돌 빈도와 재시도 비용 기준으로 비교합니다.',
        '분산 락을 기본 선택으로 두지 않고 DB 제약이나 원자 연산으로 충분한지 먼저 확인합니다.',
      ],
      answer: {
        compact: {
          conclusion: '충돌이 적고 재시도가 가능하면 낙관적 락, 충돌이 잦고 짧은 DB 트랜잭션이면 비관적 락을 우선 검토합니다.',
          evidence1: '낙관적 락은 version 충돌을 사후 감지하고 비관적 락은 행을 먼저 잠급니다.',
          evidence2: '여러 인스턴스의 임계 구역이 필요할 때만 분산 락의 만료와 장애 복구 비용까지 비교합니다.',
        },
        conclusion: '락은 기술 이름보다 충돌 빈도, 재시도 가능성, 임계 구역 범위와 데이터 불변식의 위치를 기준으로 선택합니다.',
        evidence1: '낙관적 락은 version 충돌을 사후 감지하므로 충돌이 적고 재시도가 가능한 작업에, 비관적 락은 DB 행을 먼저 잠그므로 충돌이 잦고 트랜잭션이 짧은 작업에 적합합니다.',
        evidence2: '분산 락은 여러 인스턴스를 조정할 수 있지만 만료·소유권·네트워크 장애 복구가 필요하므로 DB 유니크 제약이나 원자 연산으로 불변식을 더 단순하게 지킬 수 있는지 먼저 확인합니다.',
        keywords: ['충돌 빈도', 'version', 'DB 행 락', '재시도', '분산 락'],
        caution: 'FeedShop에서 낙관적·비관적·Redisson 락을 동일 조건으로 벤치마크했다고 말하지 않는다.',
      },
    },
    'AC-035': {
      sourceSection: 'PART A CS 표',
      feedback: [
        'Redis의 빠른 이유를 단순히 “싱글 스레드라서 락이 없다”로 설명하지 않습니다.',
        '메모리 접근, 효율적인 자료구조, 이벤트 기반 I/O와 명령 단위 원자성을 함께 말합니다.',
        '긴 O(N) 명령은 다른 요청의 지연을 키울 수 있으므로 KEYS 대신 SCAN 같은 운영 원칙을 연결합니다.',
      ],
      answer: {
        compact: {
          conclusion: 'Redis는 메모리 중심 저장, 효율적인 자료구조와 이벤트 기반 I/O로 낮은 지연을 제공하며 명령 단위 원자 연산을 지원합니다.',
          evidence1: 'String·Hash·Set·Sorted Set처럼 목적에 맞는 자료구조를 선택할 수 있습니다.',
          evidence2: 'KEYS 같은 긴 O(N) 명령은 요청 처리를 지연시킬 수 있어 운영에서는 SCAN과 작업 분리를 사용합니다.',
        },
        conclusion: 'Redis는 메모리 중심의 데이터 접근, 목적별로 최적화된 자료구조, 이벤트 기반 네트워크 처리와 명령 단위 원자 연산을 조합해 낮은 지연을 제공하는 key-value 저장소입니다.',
        evidence1: 'String은 캐시·카운터, Hash는 필드 묶음, Set은 중복 제거, Sorted Set은 점수 기반 순위처럼 접근 패턴에 맞는 자료구조를 선택할 수 있습니다.',
        evidence2: '명령 처리가 빠르더라도 KEYS나 큰 자료구조 연산처럼 오래 걸리는 명령은 다른 요청의 지연을 키울 수 있으므로 SCAN, 키 크기 제한, 작업 분리와 모니터링이 필요합니다.',
        keywords: ['in-memory', '자료구조', 'event-driven I/O', '원자 명령', 'SCAN'],
        caution: 'Redis 전체가 항상 단일 스레드이거나 싱글 스레드이기 때문에 동시성 고려가 필요 없다고 단정하지 않는다.',
      },
    },
  },
};
