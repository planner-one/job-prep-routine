window.INTERVIEW_DATA = window.INTERVIEW_DATA || {};

window.INTERVIEW_DATA.architectureCs = [
  {
    id: 'AC-001', category: '이력서 기술', project: '3M', topic: '인증 구조 사용 위치', stage: '1. 실제 사용 위치', difficulty: '기초', priority: '최우선', minutes: 5,
    question: '3M 프로젝트에서 Auth, User, Gateway를 각각 어디에 사용했나요?',
    answer: {
      compact: {
        conclusion: 'Auth는 인증, User는 사용자 관리, Gateway는 토큰 검증과 컨텍스트 전달을 담당했습니다.',
        evidence1: '서비스별 변경 이유를 분리해 인증 정책 변경이 사용자 관리까지 번지는 결합을 줄였습니다.',
        evidence2: 'Gateway 검증 결과를 AOP 권한 확인으로 이어 반복 검사 없이 일관된 접근 제어를 확보했습니다.'
      },
      conclusion: 'Auth는 로그인·회원가입·JWT 발급, User는 사용자 정보·역할 관리, Gateway는 요청의 JWT 검증과 사용자 컨텍스트 전달을 맡도록 책임을 나눴습니다.',
      evidence1: 'Gateway가 JWT의 userId와 role을 검증한 뒤 X-User-* 헤더로 내부 서비스에 전달하고, 서비스에서는 AOP로 역할 권한을 확인했습니다.',
      evidence2: '매 요청마다 User를 조회하는 구조를 피하면서 인증 정책 변경이 User 배포까지 번지는 결합도와 장애 전파 범위를 줄이는 것이 목적이었습니다.',
      keywords: ['Auth', 'User', 'Gateway', 'JWT', '책임 분리'], caution: '서비스를 나눴다는 사실보다 각 서비스의 변경 이유와 요청 흐름을 먼저 설명한다.'
    },
    followups: [
      { type: '사실 확인', question: '로그인 요청부터 도메인 서비스 도착까지 순서를 말해 주세요.', defense: 'Auth 토큰 발급 → 클라이언트 Bearer 토큰 → Gateway 검증 → X-User-* 전달 → 서비스 AOP 권한 확인 순서로 답한다.' },
      { type: '선택 압박', question: '작은 프로젝트에 서비스를 세 개로 나눈 것이 과하지 않나요?', defense: '학습 프로젝트의 범위임을 인정하고, 실제 운영에서는 변경 빈도·팀 경계·운영 비용을 보고 분리한다고 답한다.' },
      { type: '장애·대안', question: 'Gateway가 장애 나면 전체 요청이 막히지 않나요?', defense: '단일 진입점은 장애 집중 위험이 있으므로 다중 인스턴스·헬스체크·우회 불가 경로의 관측이 필요하다고 답하되 실제 운영 구성으로 주장하지 않는다.' }
    ],
    evidence: { status: '확인됨', note: 'v5_3과 3M 프로젝트 코드·포트폴리오의 인증 흐름이 일치한다.', sources: ['v5_3 이력서 p.2', '3M 프로젝트 코드·Wiki'] },
    warnings: ['마이크로서비스 분리 자체가 성능 향상을 보장했다고 말하지 않는다.'], resumeClaims: ['User·Auth·Gateway 도메인 전담', 'Gateway 필터 기반 JWT 검증', 'AOP 기반 역할 권한 제어'], tags: ['3M', '인증', 'Gateway', '1단계']
  },
  {
    id: 'AC-002', category: '이력서 기술', project: '3M', topic: '서비스 책임 분리', stage: '3. 선택 이유', difficulty: '중급', priority: '최우선', minutes: 6,
    question: 'Auth와 User를 왜 분리했고, 어떤 기준으로 경계를 정했나요?',
    answer: {
      compact: {
        conclusion: 'Auth와 User는 기능 수가 아니라 서로 다른 변경 이유를 기준으로 분리했습니다.',
        evidence1: '인증 정책과 사용자·역할 정책의 배포 경계를 나눠 변경 영향 범위를 줄였습니다.',
        evidence2: 'Auth에서 User만 조회하는 단방향 Feign 호출로 순환 의존 없는 구조를 확보했습니다.'
      },
      conclusion: '기능 개수가 아니라 변경 이유를 기준으로 Auth와 User의 경계를 나눴습니다.',
      evidence1: 'Auth는 로그인과 토큰 정책이 바뀔 때 영향을 받고, User는 사용자 정보와 역할 정책이 바뀔 때 영향을 받기 때문에 함께 두면 인증 변경이 User 배포로 확산됐습니다.',
      evidence2: '분리 후 Auth가 필요한 사용자 정보는 Feign으로 User를 단방향 조회하게 해 반대 방향 의존과 순환 참조를 만들지 않도록 했습니다.',
      keywords: ['변경 이유', '배포 영향', '단방향 의존', '서비스 경계'], caution: '분리 후에도 네트워크 호출과 계약 관리 비용이 생긴다는 점을 함께 말한다.'
    },
    followups: [
      { type: '사실 확인', question: 'Auth에도 계정 정보가 있었다면 User와 중복 아닌가요?', defense: '로그인 검증·토큰 발급에 필요한 계정 정보와 사용자 프로필·역할 관리 책임을 어떻게 나눴는지 코드 기준으로 답하고, 데이터 중복 범위는 확인이 필요하다고 말한다.' },
      { type: '선택 압박', question: '모듈만 분리한 모놀리스가 더 단순하지 않나요?', defense: '운영 규모가 작다면 합리적 대안이며, 프로젝트는 서비스 경계와 장애 전파를 학습하려는 목적도 있었다고 답한다.' },
      { type: '장애·대안', question: 'User API 계약이 바뀌면 Auth도 깨지지 않나요?', defense: '서비스 분리가 결합 제거가 아니라 계약으로 이동시키는 것임을 인정하고 DTO 버전·호환 변경·계약 테스트가 필요하다고 답한다.' }
    ],
    evidence: { status: '확인됨', note: 'Auth/User 분리와 Feign 단방향 호출이 코드·포트폴리오에 확인됐다.', sources: ['v5_3 이력서 p.2', '3M 프로젝트 코드·Wiki'] },
    warnings: ['서비스 분리가 결합도를 완전히 제거했다고 표현하지 않는다.'], resumeClaims: ['Auth·User 책임 분리', 'Auth→User Feign 단방향 호출', '순환 의존 0건'], tags: ['3M', '서비스경계', '결합도', '3단계']
  },
  {
    id: 'AC-003', category: '이력서 기술', project: '3M', topic: 'Access·Refresh Token', stage: '2. 기초 개념', difficulty: '기초', priority: '최우선', minutes: 5,
    question: 'Access Token과 Refresh Token의 역할 차이를 설명해 주세요.',
    answer: {
      compact: {
        conclusion: 'Access Token은 API 접근을 증명하고 Refresh Token은 Access Token 재발급에 사용합니다.',
        evidence1: '짧은 Access Token으로 탈취 노출을 줄이고 Refresh Token으로 재로그인 부담을 완화합니다.',
        evidence2: '3M에서는 두 토큰을 발급해 접근 권한 증명과 재발급의 책임을 분리했습니다.'
      },
      conclusion: 'Access Token은 짧은 수명으로 API 접근 권한을 증명하고, Refresh Token은 Access Token을 다시 발급받기 위한 자격 증명입니다.',
      evidence1: 'Access Token의 수명을 짧게 두면 탈취 시 노출 시간을 줄일 수 있지만 자주 로그인해야 하므로 Refresh Token으로 사용자 경험을 보완합니다.',
      evidence2: '3M에서는 두 토큰을 발급했지만 만료 시간, Refresh Token 저장·회전·폐기 방식은 실제 설정을 확인한 뒤 답해야 합니다.',
      keywords: ['Access Token', 'Refresh Token', '만료', '재발급'], caution: 'Refresh Token이 있다는 이유만으로 즉시 폐기·회전·재사용 탐지까지 구현했다고 말하지 않는다.'
    },
    followups: [
      { type: '사실 확인', question: '3M에서 각 토큰의 만료 시간과 저장 위치는 어디였나요?', defense: '현재 근거에서 확인되지 않으므로 설정과 코드를 확인한 값만 답한다.' },
      { type: '선택 압박', question: 'Refresh Token도 탈취되면 더 위험하지 않나요?', defense: '맞다고 인정하고 HttpOnly·Secure 쿠키, 서버 저장·회전·재사용 탐지 같은 방어를 요구사항에 맞게 적용한다고 답한다.' },
      { type: '장애·대안', question: 'Refresh Token 저장소가 장애 나면요?', defense: '재발급을 일시 제한하고 재로그인을 유도할 수 있으며, 가용성과 보안을 함께 고려한 저장소 구성이 필요하다고 답한다.' }
    ],
    evidence: { status: '문서 근거', note: 'Access·Refresh 발급은 이력서에 있으나 상세 정책은 확인되지 않았다.', sources: ['v5_3 이력서 p.2', '3M 프로젝트 문서'] },
    warnings: ['토큰 만료 시간·쿠키·Redis 저장 여부는 확인 전 단정 금지.'], resumeClaims: ['JWT Access·Refresh Token 발급'], tags: ['3M', 'JWT', 'AccessToken', 'RefreshToken', '2단계']
  },
  {
    id: 'AC-004', category: '이력서 기술', project: '3M', topic: 'JWT 클레임 선택', stage: '3. 선택 이유', difficulty: '중급', priority: '최우선', minutes: 6,
    question: '왜 JWT에 userId와 role을 넣어 권한 판단에 사용했나요?',
    answer: {
      compact: {
        conclusion: '매 요청마다 User를 조회하지 않고 일반 권한을 판단하려고 JWT에 userId와 role을 넣었습니다.',
        evidence1: 'Gateway에서 서명된 클레임을 검증해 User 호출 비용과 장애 의존을 줄였습니다.',
        evidence2: '역할 변경 반영 지연을 감수하는 대신 일반 요청 경로의 독립성을 확보했습니다.'
      },
      conclusion: '매 요청마다 User 서비스를 조회하지 않고도 일반 권한을 판단해 호출 비용과 User 장애 전파를 줄이기 위해서였습니다.',
      evidence1: 'Gateway 로컬 캐시는 무효화와 인스턴스 간 불일치 관리가 필요하고, 요청별 User 조회는 최신 역할을 얻는 대신 네트워크 호출과 장애 의존을 늘립니다.',
      evidence2: '서명된 JWT의 userId·role을 Gateway가 검증해 전달하는 방식을 선택했지만, 역할 변경이 토큰 만료 전까지 늦게 반영되는 한계를 감수했습니다.',
      keywords: ['userId', 'role', '호출 감소', '역할 최신성', '트레이드오프'], caution: 'JWT 사용으로 장애 전파가 완전히 사라졌다고 말하지 않고 User 조회 경로를 줄였다고 표현한다.'
    },
    followups: [
      { type: '사실 확인', question: '클레임 이름과 타입은 실제로 무엇이었나요?', defense: '실제 토큰 생성·파싱 코드를 기준으로 답하고 이력서 표현만으로 세부 키를 추정하지 않는다.' },
      { type: '선택 압박', question: '권한이 바뀌면 이전 role로 접근할 수 있지 않나요?', defense: '맞다고 인정하고 짧은 만료, 토큰 버전, 블랙리스트, 중요 작업의 실시간 조회가 대안이라고 답한다.' },
      { type: '장애·대안', question: 'User 서비스가 정상이라면 매번 조회하는 게 더 안전하지 않나요?', defense: '최신성은 높지만 지연·장애 전파·부하 비용이 있으므로 작업 민감도에 따라 하이브리드로 나눌 수 있다고 답한다.' }
    ],
    evidence: { status: '확인됨', note: 'JWT userId·role 선택 이유와 비교안이 프로젝트 자료에 명시됐다.', sources: ['v5_3 이력서 p.2', '3M 프로젝트 코드·포트폴리오'] },
    warnings: ['역할 변경 즉시 반영을 구현했다고 말하지 않는다.'], resumeClaims: ['JWT의 userId·role을 권한 판단에 활용', '요청별 User 조회 비용·장애 전파 위험 감소'], tags: ['3M', 'JWT클레임', '권한', '3단계']
  },
  {
    id: 'AC-005', category: '이력서 기술', project: '3M', topic: 'Gateway 인증 흐름', stage: '4. 구현 흐름', difficulty: '중급', priority: '최우선', minutes: 7,
    question: 'Gateway의 JWT 검증부터 AOP 권한 확인까지 실제 흐름을 설명해 주세요.',
    answer: {
      compact: {
        conclusion: 'Gateway가 JWT를 검증해 사용자 정보를 전달하면 서비스 AOP가 메서드 권한을 확인합니다.',
        evidence1: 'Gateway에서 서명과 만료를 검증해 위조되거나 만료된 토큰의 진입을 차단했습니다.',
        evidence2: '서비스 AOP가 역할 어노테이션을 공통 처리해 권한 검사의 중복을 제거했습니다.'
      },
      conclusion: 'Gateway가 토큰의 서명·만료를 검증하고 사용자 식별자와 역할을 X-User-* 헤더로 내려주면, 서비스의 AOP가 해당 컨텍스트로 메서드 권한을 확인하는 흐름입니다.',
      evidence1: '인증이 필요한 요청은 Gateway 필터를 통과하고, 검증된 userId·role이 내부 요청 헤더에 실립니다.',
      evidence2: '도메인 서비스에서는 @RequiresMasterRole 같은 어노테이션과 Aspect로 권한 로직을 공통 처리해 컨트롤러·서비스마다 같은 검사를 반복하지 않았습니다.',
      keywords: ['Gateway Filter', 'JWT 검증', 'X-User-*', 'AOP', '@RequiresMasterRole'], caution: '필터 순서와 헤더 이름, 예외 응답 코드는 실제 코드 값을 확인해 답한다.'
    },
    followups: [
      { type: '사실 확인', question: '미인증·권한 부족은 각각 어떤 상태 코드였나요?', defense: '당시 통합 테스트 보고서와 예외 처리 코드의 실제 상태 코드를 확인해 답한다.' },
      { type: '선택 압박', question: 'Gateway와 AOP가 권한을 중복 검사하는 것 아닌가요?', defense: 'Gateway는 토큰 유효성과 공통 컨텍스트, AOP는 메서드별 역할 정책이라는 책임 차이로 설명한다.' },
      { type: '장애·대안', question: 'AOP가 적용되지 않는 호출 경로가 있으면요?', defense: '프록시 우회·어노테이션 누락을 테스트로 잡아야 하며 보안 규칙은 가능하면 Spring Security 정책과 함께 중앙화한다고 답한다.' }
    ],
    evidence: { status: '확인됨', note: 'Gateway→헤더→AOP 흐름과 역할 어노테이션이 프로젝트 근거에서 확인됐다.', sources: ['v5_3 이력서 p.2', '3M 프로젝트 코드·Wiki'] },
    warnings: ['정확한 상태 코드와 필터 실행 순서는 코드 재확인 필요.'], resumeClaims: ['Gateway 필터 기반 검증', 'X-User-* 헤더 전달', 'AOP 역할 권한 제어'], tags: ['3M', 'Gateway', 'AOP', '4단계']
  },
  {
    id: 'AC-006', category: '이력서 기술', project: '3M', topic: 'X-User 헤더 신뢰 경계', stage: '6. 장애·한계', difficulty: '심화', priority: '최우선', minutes: 7,
    question: '클라이언트가 X-User-* 헤더를 위조하면 어떻게 막아야 하나요?',
    answer: {
      compact: {
        conclusion: '외부 X-User-*를 제거하고 내부 서비스는 신뢰된 Gateway 요청만 받도록 막아야 합니다.',
        evidence1: 'Gateway 검증 결과로 헤더를 다시 생성해야 클라이언트의 위조 값을 신뢰하지 않을 수 있습니다.',
        evidence2: '3M의 헤더 제거와 내부 접근 제한은 확인되지 않아 필요한 보완책으로만 구분하겠습니다.'
      },
      conclusion: '도메인 서비스가 X-User-* 헤더를 신뢰하려면 반드시 신뢰된 Gateway만 그 헤더를 만들 수 있는 네트워크·애플리케이션 경계가 필요합니다.',
      evidence1: 'Gateway는 외부 요청에 이미 들어온 동일 헤더를 제거하거나 덮어쓰고, JWT 검증 결과로 새 값을 생성해야 합니다.',
      evidence2: '내부 서비스 직접 접근을 막고 필요하면 서비스 간 인증을 추가해야 하지만, 3M에서 이 방어가 모두 구현됐는지는 코드와 배포 구성을 확인해야 합니다.',
      keywords: ['헤더 위조', '신뢰 경계', '헤더 덮어쓰기', '내부 접근 제한'], caution: 'X-User 헤더 자체를 보안 수단이라고 설명하지 않는다.'
    },
    followups: [
      { type: '사실 확인', question: '3M Gateway가 기존 X-User 헤더를 실제로 제거했나요?', defense: '필터 코드를 확인하지 못한 상태에서는 확인 필요라고 답하고 구현 사실로 단정하지 않는다.' },
      { type: '선택 압박', question: '그렇다면 JWT를 각 서비스에서 다시 검증하는 게 낫지 않나요?', defense: '보안 경계는 강해지지만 중복 로직·키 배포 비용이 생기므로 위협 모델과 인프라에 따라 선택한다고 답한다.' },
      { type: '장애·대안', question: 'Gateway를 우회해 내부 서비스가 노출되면요?', defense: '네트워크 정책·인증된 서비스 통신·서비스 자체 방어가 필요하며 Gateway만 믿는 구조의 한계라고 인정한다.' }
    ],
    evidence: { status: '지원자 확인 필요', note: '헤더 전달은 확인됐지만 위조 방어와 내부 네트워크 정책은 확인되지 않았다.', sources: ['v5_3 이력서 p.2', '3M 프로젝트 코드·배포 구성 확인 필요'] },
    warnings: ['헤더 제거·내부망 차단·mTLS를 실제 구현으로 주장하지 않는다.'], resumeClaims: ['X-User-* 헤더를 통한 사용자 컨텍스트 전달'], tags: ['3M', '보안', '헤더위조', '6단계']
  },
  {
    id: 'AC-007', category: '이력서 기술', project: '3M', topic: 'AOP 권한 처리', stage: '4. 구현 흐름', difficulty: '중급', priority: '높음', minutes: 6,
    question: '역할 권한 검사를 AOP로 구현한 이유와 한계는 무엇인가요?',
    answer: {
      compact: {
        conclusion: '반복되는 역할 검사를 메서드 본문에서 분리하려고 AOP를 사용했지만 프록시 적용 범위에 한계가 있습니다.',
        evidence1: '어노테이션 기반 Aspect로 역할 검사 중복을 제거하고 정책 위치를 한곳에 모았습니다.',
        evidence2: '프록시 우회와 어노테이션 누락 가능성은 테스트와 기본 거부 정책으로 보완해야 합니다.'
      },
      conclusion: '반복되는 역할 검사를 메서드 본문에서 분리하고 어노테이션으로 정책 의도를 드러내기 위해 AOP를 사용했습니다.',
      evidence1: '@RequiresMasterRole 같은 어노테이션이 붙은 진입점에서 Aspect가 사용자 역할을 확인해 권한 로직을 통합했습니다.',
      evidence2: '다만 Spring 프록시가 가로채는 호출에만 적용되고 어노테이션 누락·self-invocation·프록시 외 객체에는 적용되지 않을 수 있어 테스트와 기본 거부 정책이 중요합니다.',
      keywords: ['횡단 관심사', '어노테이션', '프록시', 'self-invocation'], caution: 'AOP를 사용했다는 사실만으로 모든 경로의 권한이 보장된다고 말하지 않는다.'
    },
    followups: [
      { type: '사실 확인', question: '어느 레이어의 메서드에 어노테이션을 붙였나요?', defense: '실제 코드 위치를 확인해 답하고 Controller인지 Service인지 추정하지 않는다.' },
      { type: '선택 압박', question: 'Spring Security 메서드 보안을 쓰면 되지 않았나요?', defense: '표준 기능이 더 적합할 수 있으며 학습·요구 범위에서 커스텀 AOP를 선택했지만 현재라면 표준 기능도 비교한다고 답한다.' },
      { type: '장애·대안', question: '어노테이션을 빼먹으면 어떻게 찾나요?', defense: '권한별 통합 테스트와 기본 거부 정책, 코드 리뷰 규칙으로 탐지해야 한다고 답한다.' }
    ],
    evidence: { status: '확인됨', note: 'AOP 역할 검사와 @RequiresMasterRole 사용이 프로젝트 자료에 확인됐다.', sources: ['v5_3 이력서 p.2', '3M 프로젝트 코드·Wiki'] },
    warnings: ['모든 권한 경로를 테스트했다고 확대하지 않는다.'], resumeClaims: ['AOP 기반 역할 권한 제어 구현'], tags: ['3M', 'AOP', '권한', '4단계']
  },
  {
    id: 'AC-008', category: '이력서 기술', project: '3M', topic: 'Feign 호출 방향', stage: '4. 구현 흐름', difficulty: '중급', priority: '높음', minutes: 6,
    question: 'Auth와 User 사이의 Feign 호출 방향과 데이터 흐름은 어떻게 됐나요?',
    answer: {
      compact: {
        conclusion: 'Auth가 필요한 사용자 정보를 User에서 조회하는 단방향 Feign 호출로 구성했습니다.',
        evidence1: 'User가 Auth 구현을 참조하지 않게 해 소스 수준의 순환 의존을 제거했습니다.',
        evidence2: '서비스 간 데이터는 Feign DTO 계약으로 분리해 구현 클래스의 직접 결합을 줄였습니다.'
      },
      conclusion: 'Auth가 필요한 사용자 정보를 User에서 조회하는 Auth→User 단방향 Feign 호출로 제한했습니다.',
      evidence1: 'UserService가 Auth 구현 클래스를 import하지 않게 해 User→Auth 방향의 소스 결합을 제거했고, 서비스 간 전달은 Feign DTO 계약으로 분리했습니다.',
      evidence2: '이 구조는 순환 의존을 피하지만 로그인·발급 경로가 User 응답에 의존할 수 있으므로 타임아웃과 실패 정책이 필요합니다.',
      keywords: ['Auth→User', 'Feign', '단방향', 'DTO 계약'], caution: 'Feign 호출 API·재시도·타임아웃 값은 실제 설정을 확인하기 전 말하지 않는다.'
    },
    followups: [
      { type: '사실 확인', question: 'Feign으로 어떤 필드를 조회했나요?', defense: '요청·응답 DTO를 확인해 실제 필드만 답한다.' },
      { type: '선택 압박', question: 'Auth DB에 필요한 정보를 복제하면 호출이 없어지지 않나요?', defense: '가용성은 높아질 수 있지만 동기화·소유권 문제가 생기므로 데이터 변경 빈도와 일관성 요구를 보고 판단한다고 답한다.' },
      { type: '장애·대안', question: 'User가 느리면 로그인도 느려지나요?', defense: '동기 Feign 경로라면 그렇다고 인정하고 명시적 타임아웃·빠른 실패·필요 시 제한된 캐시나 데이터 복제를 검토한다고 답한다.' }
    ],
    evidence: { status: '확인됨', note: 'Auth→User Feign 단방향 구조가 프로젝트 자료에 확인됐다.', sources: ['3M 프로젝트 코드·포트폴리오'] },
    warnings: ['Feign 장애 대응 설정은 확인되지 않았다.'], resumeClaims: ['Auth→User Feign 단방향 참조', '순환 의존 없음'], tags: ['3M', 'Feign', '서비스통신', '4단계']
  },
  {
    id: 'AC-009', category: '이력서 기술', project: '3M', topic: '토큰 권한 최신성·폐기', stage: '6. 장애·한계', difficulty: '심화', priority: '최우선', minutes: 7,
    question: '사용자 role이 바뀌거나 계정이 정지되면 기존 JWT 권한은 어떻게 되나요?',
    answer: {
      compact: {
        conclusion: '기존 JWT는 만료 전까지 이전 role을 유지해 권한 변경이나 계정 정지가 즉시 반영되지 않을 수 있습니다.',
        evidence1: '3M은 일반 요청의 User 조회를 줄여 호출 비용과 장애 의존을 낮췄습니다.',
        evidence2: '즉시 반영이 필요하면 짧은 만료나 토큰 버전·블랙리스트를 추가해야 하며 3M 적용 여부는 확인되지 않았습니다.'
      },
      conclusion: '상태를 서버에서 조회하지 않는 JWT는 만료 전까지 예전 role이 남을 수 있어 즉시 반영이 필요한 정책과 충돌합니다.',
      evidence1: '3M은 일반 요청의 User 조회를 줄이는 대신 역할 최신성 지연을 받아들인 선택이므로, 짧은 Access Token 만료와 재발급 시 최신 role 반영이 기본 완화책입니다.',
      evidence2: '즉시 폐기가 필요하면 토큰 버전·블랙리스트·중요 작업의 실시간 User 확인을 추가할 수 있지만 3M 구현 여부는 확인되지 않았습니다.',
      keywords: ['stale role', '즉시 폐기', '짧은 만료', '토큰 버전', '블랙리스트'], caution: '로그아웃이나 계정 정지 즉시 무효화를 구현했다고 말하지 않는다.'
    },
    followups: [
      { type: '사실 확인', question: '3M에서 로그아웃 시 토큰을 어떻게 처리했나요?', defense: '코드 근거를 확인해 답하고, 확인 전에는 단순 클라이언트 삭제인지 서버 폐기인지 추정하지 않는다.' },
      { type: '선택 압박', question: '블랙리스트를 쓰면 JWT의 장점이 사라지지 않나요?', defense: '일부 상태 조회 비용이 생기지만 고위험 토큰만 관리하는 등 보안 요구에 맞춘 절충이라고 답한다.' },
      { type: '장애·대안', question: '블랙리스트 저장소가 장애 나면 허용할 건가요?', defense: '보안 민감 경로는 fail-closed, 일반 경로는 정책에 따라 결정하며 위험 등급을 먼저 정의해야 한다고 답한다.' }
    ],
    evidence: { status: '지원자 확인 필요', note: 'JWT role 사용은 확인됐지만 즉시 폐기·역할 변경 반영 구현은 확인되지 않았다.', sources: ['v5_3 이력서 p.2', '3M 토큰 정책 확인 필요'] },
    warnings: ['Redis 블랙리스트·토큰 회전은 구현 성과가 아니라 대안이다.'], resumeClaims: ['JWT userId·role 권한 판단'], tags: ['3M', 'JWT', '권한최신성', '6단계']
  },
  {
    id: 'AC-010', category: '이력서 기술', project: '3M', topic: '서비스 장애 전파', stage: '6. 장애·한계', difficulty: '심화', priority: '최우선', minutes: 7,
    question: '요청별 User 조회가 왜 장애 전파 위험을 높이나요?',
    answer: {
      compact: {
        conclusion: '모든 요청이 User 응답을 기다리면 User의 지연과 오류가 다른 서비스의 실패로 확대되기 때문입니다.',
        evidence1: '동기 호출의 타임아웃과 재시도가 누적되면 User 장애가 권한 경로 전체로 전파됩니다.',
        evidence2: '3M은 일반 권한을 JWT에서 판단해 요청별 User 의존을 줄이고 서비스 경로의 독립성을 확보했습니다.'
      },
      conclusion: '모든 요청이 동기적으로 User 응답을 기다리면 User의 지연·오류가 원래 정상인 서비스의 지연과 실패로 확대되기 때문입니다.',
      evidence1: '호출 단계가 늘면 타임아웃 누적, 스레드·커넥션 대기, 재시도 증폭이 생길 수 있고 User 장애가 권한이 필요한 전체 경로로 번집니다.',
      evidence2: '3M은 일반 권한을 JWT 클레임으로 판단해 이 호출을 줄였지만 상세 사용자 정보가 필요한 경로의 장애 의존은 남습니다.',
      keywords: ['동기 의존', '타임아웃', '재시도 증폭', '장애 전파'], caution: 'JWT로 모든 서비스 간 장애 전파를 제거했다고 말하지 않는다.'
    },
    followups: [
      { type: '사실 확인', question: '실제 User 장애를 주입해 테스트했나요?', defense: '확인된 장애 주입 테스트 근거가 없으므로 설계상 위험과 실제 검증을 구분한다.' },
      { type: '선택 압박', question: '그럼 서비스 간 호출을 모두 없애야 하나요?', defense: '아니며 필요한 최신성과 소유권을 위해 호출하되 타임아웃·격리·폴백 가능성을 명시해야 한다고 답한다.' },
      { type: '장애·대안', question: 'Circuit Breaker를 적용했나요?', defense: '확인된 구현은 없다고 답하고 Resilience4j 등은 향후 대안으로만 설명한다.' }
    ],
    evidence: { status: '문서 근거', note: '설계 판단은 확인됐지만 실제 장애 주입·Circuit Breaker 구현은 확인되지 않았다.', sources: ['v5_3 이력서 p.2', '3M 프로젝트 포트폴리오'] },
    warnings: ['장애 전파 감소는 설계 효과이며 실운영 장애율 개선 수치가 아니다.'], resumeClaims: ['요청별 User 조회의 호출 비용·장애 전파 위험 감소'], tags: ['3M', '장애전파', '동기호출', '6단계']
  },
  {
    id: 'AC-011', category: '이력서 기술', project: '3M', topic: 'CBO 측정', stage: '5. 검증 근거', difficulty: '심화', priority: '최우선', minutes: 7,
    question: 'UserService→Auth 결합도 CBO 0건은 어떻게 측정했고 무엇을 의미하나요?',
    answer: {
      compact: {
        conclusion: 'CBO 0건은 import 정적 분석에서 UserService가 Auth 클래스를 직접 참조하지 않았다는 뜻입니다.',
        evidence1: '반대 방향 import와 순환 참조가 없음을 확인해 소스 수준의 단방향 의존을 확보했습니다.',
        evidence2: '런타임 호출과 계약·배포 결합은 포함하지 않아 시스템 전체가 무결합이라는 뜻은 아닙니다.'
      },
      conclusion: '당시 CBO 0건은 소스 import 정적 분석에서 UserService가 Auth 외부 클래스를 직접 참조하지 않는다는 뜻입니다.',
      evidence1: 'Auth→User는 Feign DTO 중심의 단방향 참조로 남기고 반대 방향 import와 순환 의존이 없는지 확인했습니다.',
      evidence2: '다만 import 기반 수치는 런타임 호출, 데이터 계약, 배포·운영 결합까지 측정하지 않으므로 시스템 전체가 무결합이라는 뜻은 아닙니다.',
      keywords: ['CBO', 'import 정적 분석', '직접 참조', '측정 한계'], caution: 'CBO 0을 서비스 전체 결합도 0이나 장애 0으로 확대하지 않는다.'
    },
    followups: [
      { type: '사실 확인', question: '어떤 도구나 명령으로 측정했나요?', defense: '현재 자료에는 import 정적 분석이라고만 있으므로 실제 스크립트·도구를 확인해 답한다.' },
      { type: '선택 압박', question: 'DTO를 공유하면 그것도 결합 아닌가요?', defense: '맞다고 인정하고 소스 방향 결합을 줄인 것이지 계약 결합은 남는다고 설명한다.' },
      { type: '장애·대안', question: '런타임 결합도는 어떻게 검증할 건가요?', defense: '호출 그래프, 계약 테스트, 장애 주입, 배포 독립성 지표를 함께 볼 수 있다고 답한다.' }
    ],
    evidence: { status: '문서 근거', note: 'CBO 0과 측정 방식은 포트폴리오에 명시됐으나 원본 측정 스크립트 재현은 확인이 필요하다.', sources: ['v5_3 이력서 p.2', '3M 프로젝트 포트폴리오'] },
    warnings: ['측정 도구명·실행 결과 원본은 확인 전 단정하지 않는다.', 'CBO 0은 import 기준이다.'], resumeClaims: ['UserService→Auth CBO 0건', '순환 의존 0건'], tags: ['3M', 'CBO', '검증', '5단계']
  },
  {
    id: 'AC-012', category: '이력서 기술', project: '3M', topic: '권한 통합 테스트', stage: '5. 검증 근거', difficulty: '심화', priority: '최우선', minutes: 7,
    question: '3M 인증 구조를 어떤 테스트로 검증했나요?',
    answer: {
      compact: {
        conclusion: 'Gateway 검증부터 AOP 권한 확인까지 역할별 허용·거부 시나리오를 통합 테스트했습니다.',
        evidence1: 'MASTER·HUB_MANAGER·미인증 요청을 확인해 인증 구성 요소 연결의 일관성을 확보했습니다.',
        evidence2: '현재 재실행 가능성은 확인되지 않아 당시 보고서에 기록된 검증 범위로 한정하겠습니다.'
      },
      conclusion: '당시 테스트 보고서 기준으로 Gateway JWT 검증, X-User-* 전달, AOP 권한 체크를 연결해 MASTER·HUB_MANAGER·미인증 응답 시나리오를 확인했습니다.',
      evidence1: '구조가 분리됐다는 사실만 보지 않고 역할별 허용·거부 응답이 요청 전체에서 일관되는지 검증하려 한 테스트입니다.',
      evidence2: '다만 현재 저장소에서 같은 통합 테스트가 즉시 재실행되는지와 환경 의존성은 확인되지 않아 당시 보고서 결과로 범위를 한정해야 합니다.',
      keywords: ['통합 테스트', 'MASTER', 'HUB_MANAGER', '미인증', '재현성'], caution: '현재 전체 테스트가 통과한다고 말하지 않고 당시 보고서에 기록된 검증이라고 말한다.'
    },
    followups: [
      { type: '사실 확인', question: '테스트 클래스와 실행 환경은 무엇이었나요?', defense: '원본 저장소와 보고서를 다시 확인해 정확한 클래스·의존 서비스를 답한다.' },
      { type: '선택 압박', question: '현재 재실행할 수 없다면 검증이라고 할 수 있나요?', defense: '당시 결과의 근거는 있지만 현재 재현성은 별도 문제라고 인정하고 환경 고정·자동화가 보완점이라고 답한다.' },
      { type: '장애·대안', question: '누락된 보안 시나리오는 무엇인가요?', defense: '만료·변조 토큰, 헤더 위조, 서비스 직접 접근, 역할 변경·폐기 시나리오가 추가로 필요하다고 답한다.' }
    ],
    evidence: { status: '문서 근거', note: '포트폴리오와 Wiki 테스트 보고서 근거이며 현재 실행 가능성은 확인되지 않았다.', sources: ['3M 통합 테스트 결과 보고서', '3M 프로젝트 포트폴리오'] },
    warnings: ['현재 실행 가능한 테스트로 표현 금지.', '전체 인증·보안 시나리오를 검증했다고 표현 금지.'], resumeClaims: ['MASTER·HUB_MANAGER·미인증 권한 응답 검증'], tags: ['3M', '통합테스트', '권한', '5단계']
  },
  {
    id: 'AC-013', category: '이력서 기술', project: '3M', topic: 'Docker Compose·Eureka', stage: '1. 실제 사용 위치', difficulty: '중급', priority: '높음', minutes: 6,
    question: '3M에서 Docker Compose와 Eureka를 어디에 사용했나요?',
    answer: {
      compact: {
        conclusion: 'Docker Compose는 통합 실행에, Eureka는 서비스 이름 기반 발견에 사용했습니다.',
        evidence1: '서비스를 Eureka에 등록해 고정 주소 의존을 줄이고 이름 기반 호출 구조를 확보했습니다.',
        evidence2: 'Compose로 의존 인프라와 서비스를 함께 기동해 통합 실행 환경을 재현했습니다.'
      },
      conclusion: 'Docker Compose로 Gateway·Eureka·마이크로서비스·PostgreSQL·Redis·Zipkin의 실행 환경을 묶고, Eureka로 서비스 이름 기반 발견 구조를 구성했습니다.',
      evidence1: '각 서비스가 기동 시 Eureka에 등록돼 고정 주소 의존을 줄였고 Actuator 헬스체크로 기동 상태를 확인했습니다.',
      evidence2: '다만 Compose는 해당 프로젝트의 통합 실행 환경이며, Kubernetes 수준의 운영 오케스트레이션이나 고가용성을 구현했다는 뜻은 아닙니다.',
      keywords: ['Docker Compose', 'Eureka', '서비스 디스커버리', 'Actuator'], caution: '로컬·학습 환경의 통합 실행과 실제 운영 고가용성을 구분한다.'
    },
    followups: [
      { type: '사실 확인', question: 'Compose에 어떤 서비스와 의존 순서가 있었나요?', defense: '프로젝트 자료에 확인된 Gateway·Eureka·마이크로서비스·PostgreSQL·Redis·Zipkin을 말하고 상세 depends_on·healthcheck는 파일을 확인한다.' },
      { type: '선택 압박', question: 'Docker DNS가 있는데 Eureka가 왜 필요했나요?', defense: 'Compose 내부 고정 서비스만이면 Docker DNS도 대안이며, 동적 등록·서비스 이름 호출을 학습하려는 목적과 실제 필요를 구분한다.' },
      { type: '장애·대안', question: 'Eureka가 장애 나면 기존 호출도 모두 끊기나요?', defense: '클라이언트 캐시와 등록 갱신 동작에 따라 다르며, 다중 Eureka 구성 여부는 확인되지 않았다고 답한다.' }
    ],
    evidence: { status: '확인됨', note: '통합 실행 구성과 서비스 디스커버리 사용이 프로젝트 자료에 명시됐다.', sources: ['3M 프로젝트 코드·포트폴리오'] },
    warnings: ['Kubernetes·고가용성·운영 배포 경험으로 확대하지 않는다.'], resumeClaims: ['Docker Compose', 'Eureka', 'Redis', 'Gateway 인프라 통합'], tags: ['3M', 'DockerCompose', 'Eureka', '1단계']
  },
  {
    id: 'AC-014', category: '이력서 기술', project: 'FlexiRoute', topic: 'UUID 도메인 참조', stage: '1. 실제 사용 위치', difficulty: '기초', priority: '높음', minutes: 5,
    question: 'FlexiRoute에서 UUID를 어디에, 왜 사용했나요?',
    answer: {
      compact: {
        conclusion: '도메인 간 Entity를 직접 참조하지 않고 대상을 식별하는 UUID만 보관했습니다.',
        evidence1: 'Entity 직접 참조를 식별자 참조로 바꿔 도메인 간 컴파일 타임 결합을 줄였습니다.',
        evidence2: '실제 데이터는 HTTP로 조회해 객체 그래프의 직접 결합을 줄였지만 참조 무결성 책임은 남았습니다.'
      },
      conclusion: '다른 도메인의 Entity 객체를 직접 참조하지 않고 식별자인 UUID만 보관해 컴파일 타임 결합을 줄이는 데 사용했습니다.',
      evidence1: '가게·리뷰·카테고리 같은 도메인 사이에서 필요한 대상은 UUID로 가리키고 실제 데이터가 필요할 때 HTTP 호출로 조회했습니다.',
      evidence2: '이 방식은 객체 그래프의 직접 결합은 줄이지만 참조 무결성, 추가 네트워크 호출, 대상 삭제 처리 같은 책임이 새로 생깁니다.',
      keywords: ['UUID', 'Entity 직접 참조', '식별자 참조', '결합도'], caution: 'UUID를 사용했다는 사실만으로 완전한 서비스 독립성이나 전역 유일성 운영 문제 해결을 주장하지 않는다.'
    },
    followups: [
      { type: '사실 확인', question: '어떤 도메인 사이의 참조를 UUID로 바꿨나요?', defense: '가게·리뷰·카테고리 담당 범위에서 실제 필드와 호출 방향을 코드를 확인해 답한다.' },
      { type: '선택 압박', question: 'DB 외래키를 쓰는 편이 무결성에 더 좋지 않나요?', defense: '단일 DB·같은 서비스 경계라면 외래키가 강한 대안이며, 분리 목적과 운영 복잡도를 함께 비교해야 한다고 답한다.' },
      { type: '장애·대안', question: '참조 대상이 삭제되면 고아 UUID는 어떻게 처리하나요?', defense: '삭제 이벤트·조회 시 검증·보상 정리 같은 정책이 필요하지만 당시 구현 여부는 확인되지 않았다고 답한다.' }
    ],
    evidence: { status: '문서 근거', note: 'UUID 참조 전환은 v5_3에 있으나 공개 구현 코드가 확인되지 않았다.', sources: ['v5_3 이력서 p.2', 'FlexiRoute 기존 정리 자료'] },
    warnings: ['구체적인 테이블·필드·삭제 정책은 지원자 확인 필요.'], resumeClaims: ['Entity 직접 참조를 UUID 참조로 전환', '도메인 간 컴파일 타임 결합도 감소'], tags: ['FlexiRoute', 'UUID', '도메인경계', '1단계']
  },
  {
    id: 'AC-015', category: '이력서 기술', project: 'FlexiRoute', topic: '레이어드 아키텍처·DIP', stage: '2. 기초 개념', difficulty: '중급', priority: '높음', minutes: 6,
    question: '레이어드 아키텍처와 DIP를 FlexiRoute 구조에 연결해 설명해 주세요.',
    answer: {
      compact: {
        conclusion: '레이어드는 책임을 나누고 DIP는 핵심 정책이 구체 구현에 직접 의존하지 않게 하는 원칙입니다.',
        evidence1: 'FlexiRoute는 도메인 책임을 레이어로 나누고 외부 조회를 HTTP 경계로 분리했습니다.',
        evidence2: 'WebClient 구현까지 DIP로 역전했는지는 확인되지 않아 레이어 분리 수준으로만 설명하겠습니다.'
      },
      conclusion: '레이어드 아키텍처는 표현·응용·도메인·인프라 책임을 나누고, DIP는 핵심 정책이 구체적인 HTTP 클라이언트나 DB 구현에 직접 의존하지 않게 하는 원칙입니다.',
      evidence1: 'FlexiRoute에서는 가게·리뷰·카테고리 도메인을 레이어로 나누고 외부 조회 경계를 HTTP 통신으로 분리한 것으로 정리돼 있습니다.',
      evidence2: '다만 포트·어댑터 인터페이스까지 두어 WebClient 구현을 역전했는지는 공개 코드가 없어 확인이 필요합니다.',
      keywords: ['레이어드 아키텍처', 'DIP', '정책과 구현', '포트·어댑터'], caution: '레이어가 존재한다는 사실만으로 DIP를 지켰다고 단정하지 않는다.'
    },
    followups: [
      { type: '사실 확인', question: '패키지와 의존 방향은 실제로 어떻게 됐나요?', defense: '공개 코드가 없으므로 Controller·Service·Repository·Client 인터페이스 구조를 본인이 확인해 답한다.' },
      { type: '선택 압박', question: '단순 CRUD에 인터페이스가 과하지 않나요?', defense: '교체·테스트 필요가 없는 경계에는 추상화가 비용일 수 있으며 변동 가능성이 큰 외부 통신 경계부터 적용한다고 답한다.' },
      { type: '장애·대안', question: '레이어를 건너뛰는 호출이 있으면 어떻게 하나요?', defense: '의존 규칙 테스트나 패키지 가시성으로 방지할 수 있지만 당시 적용 여부는 확인되지 않았다고 답한다.' }
    ],
    evidence: { status: '지원자 확인 필요', note: '레이어드 아키텍처 설계는 이력서에 있지만 DIP 적용 형태는 확인되지 않았다.', sources: ['v5_3 이력서 p.2', '기술 질문 리스트'] },
    warnings: ['헥사고날·클린 아키텍처를 구현했다고 바꿔 말하지 않는다.'], resumeClaims: ['레이어드 아키텍처 설계', 'UUID 기반 도메인 참조', 'WebClient HTTP 통신'], tags: ['FlexiRoute', '레이어드', 'DIP', '2단계']
  },
  {
    id: 'AC-016', category: '이력서 기술', project: 'FlexiRoute', topic: 'Feign과 WebClient 선택', stage: '3. 선택 이유', difficulty: '중급', priority: '최우선', minutes: 7,
    question: 'Feign 대신 WebClient를 선택한 이유를 설명해 주세요.',
    answer: {
      compact: {
        conclusion: '요청·응답과 오류 흐름을 코드에서 명시적으로 제어하려고 WebClient를 선택했습니다.',
        evidence1: 'WebClient는 요청 조합과 상태별 처리를 코드에 드러내 외부 통신 흐름을 직접 제어하는 목적에 맞았습니다.',
        evidence2: '.block() 위치는 확인되지 않아 논블로킹 성능이 아니라 흐름 제어를 선택 근거로 삼았습니다.'
      },
      conclusion: '당시에는 선언형 인터페이스의 구현 편의성보다 요청·응답과 오류 흐름을 코드에서 명시적으로 제어하려는 목적에 WebClient를 선택했습니다.',
      evidence1: 'Feign은 인터페이스 선언과 Spring Cloud 통합이 간결하고, WebClient는 요청 조합과 응답 상태별 처리를 세밀하게 구성하기 쉽다는 차이가 있습니다.',
      evidence2: '다만 당시 코드가 .block()으로 동기 대기했다면 논블로킹 처리량 이점을 얻었다고 말할 수 없고, 현재 요구라면 복잡도와 팀 경험까지 포함해 다시 비교해야 합니다.',
      keywords: ['Feign', 'WebClient', '선언형', '명시적 흐름 제어', '.block()'], caution: 'Feign은 동기라 나쁘고 WebClient는 비동기라 빠르다는 식으로 답하지 않는다.'
    },
    followups: [
      { type: '사실 확인', question: 'WebClient의 어떤 API로 오류를 처리했나요?', defense: 'onStatus·retrieve·exchangeToMono 등 실제 사용 API는 코드를 확인한 뒤 답한다.' },
      { type: '선택 압박', question: '.block()을 썼다면 RestClient나 Feign이 더 적합하지 않았나요?', defense: '그럴 수 있다고 인정하고 당시 선택 목적과 현재 재평가 기준을 분리해 설명한다.' },
      { type: '장애·대안', question: '호출 대상이 느릴 때 어떤 클라이언트가 더 안전한가요?', defense: '클라이언트 종류보다 명시적 timeout·connection pool·격리·재시도 정책이 중요하다고 답한다.' }
    ],
    evidence: { status: '지원자 확인 필요', note: '비교·선택은 이력서에 있으나 실제 WebClient 연산자와 .block() 위치는 공개 코드로 재검증되지 않았다.', sources: ['v5_3 이력서 p.2', 'FeignClient와 WebClient 정리 자료'] },
    warnings: ['논블로킹 성능 성과 주장 금지.', 'Ribbon을 Feign의 현재 필수 구성처럼 설명하지 않는다.'], resumeClaims: ['Feign과 WebClient 비교', 'HTTP 요청·응답 경계를 명시적으로 제어하기 위해 WebClient 선택'], tags: ['FlexiRoute', 'Feign', 'WebClient', '3단계']
  },
  {
    id: 'AC-017', category: '이력서 기술', project: 'FlexiRoute', topic: 'WebClient block', stage: '4. 구현 흐름', difficulty: '심화', priority: '최우선', minutes: 7,
    question: 'WebClient에서 .block()을 사용했다면 실제 요청은 논블로킹인가요?',
    answer: {
      compact: {
        conclusion: '.block()을 호출한 스레드는 응답을 기다리므로 해당 호출 경계는 블로킹입니다.',
        evidence1: '내부 비동기 I/O와 무관하게 호출자가 Mono를 기다리면 애플리케이션 흐름은 멈춥니다.',
        evidence2: 'FlexiRoute는 호출 위치를 확인해야 하므로 논블로킹 성능을 확보했다고 주장하지 않겠습니다.'
      },
      conclusion: '.block()을 호출한 스레드는 결과가 올 때까지 대기하므로 해당 경계의 사용 방식은 동기·블로킹입니다.',
      evidence1: 'WebClient 내부가 Reactor Netty 기반 비동기 I/O를 사용해도 호출자가 Mono를 block하면 애플리케이션 흐름은 응답을 기다립니다.',
      evidence2: 'FlexiRoute의 기존 정리에는 .block() 사용 가능성이 있어 비동기 성능을 성과로 말하지 않고, 정확한 호출 위치와 실행 스레드를 코드로 확인해야 합니다.',
      keywords: ['WebClient', '.block()', '동기 대기', 'Reactor'], caution: '라이브러리의 내부 구현과 애플리케이션이 실제로 얻은 실행 모델을 구분한다.'
    },
    followups: [
      { type: '사실 확인', question: '.block()은 정확히 어느 레이어에서 호출했나요?', defense: '공개 코드가 없으므로 지원자가 실제 호출 위치를 확인해야 한다.' },
      { type: '선택 압박', question: '그럼 WebClient 선택은 잘못이었나요?', defense: '목표가 논블로킹 성능이었다면 부적절하지만 명시적 요청·오류 제어가 목표였다면 선택 근거는 남는다고 답한다.' },
      { type: '장애·대안', question: '완전한 논블로킹으로 바꾸려면요?', defense: 'Controller부터 저장소까지 반환 타입과 드라이버가 비동기여야 하며 일부만 바꾸면 이점이 제한된다고 답한다.' }
    ],
    evidence: { status: '지원자 확인 필요', note: '.block() 사용이 기존 검토에서 지적됐으나 공개 구현 저장소가 없어 최종 확인이 필요하다.', sources: ['FlexiRoute 기존 질문 정리', 'v5_3 이력서 p.2'] },
    warnings: ['WebClient 사용을 논블로킹·고성능 성과로 답하지 않는다.'], resumeClaims: ['WebClient 기반 HTTP 통신 구현'], tags: ['FlexiRoute', 'WebClient', 'block', '4단계']
  },
  {
    id: 'AC-018', category: '이력서 기술', project: 'FlexiRoute', topic: 'Timeout·Retry·오류 처리', stage: '6. 장애·한계', difficulty: '심화', priority: '최우선', minutes: 7,
    question: 'WebClient 호출의 timeout, retry, 오류 처리는 어떻게 했나요?',
    answer: {
      compact: {
        conclusion: '현재 근거로는 FlexiRoute에 timeout·retry·상태별 오류 처리를 구현했다고 답할 수 없습니다.',
        evidence1: '4xx와 재시도 가능한 5xx·네트워크 오류를 분리해야 실패 처리 기준을 명확히 할 수 있습니다.',
        evidence2: '멱등성과 backoff 없는 재시도는 부하를 키우므로 확인 전에는 개선안으로만 설명하겠습니다.'
      },
      conclusion: '현재 확인된 자료만으로는 FlexiRoute의 timeout·retry·상태 코드별 오류 처리를 구현했다고 답할 수 없습니다.',
      evidence1: '외부 HTTP 호출에는 연결·응답 timeout을 명시하고, 4xx는 요청 오류, 5xx·네트워크 오류는 재시도 가능성을 별도로 판단해야 합니다.',
      evidence2: '재시도는 멱등성과 backoff·횟수 제한 없이 사용하면 부하를 증폭시키므로 실제 코드가 없다면 개선안으로만 설명하겠습니다.',
      keywords: ['connect timeout', 'response timeout', 'retry', '멱등성', 'backoff'], caution: '모르는 설정값을 추정하거나 일반적인 Reactor API를 실제 사용처럼 말하지 않는다.'
    },
    followups: [
      { type: '사실 확인', question: '실제 timeout 값은 몇 초였나요?', defense: '설정 파일을 확인하지 못했다면 확인 필요라고 답한다.' },
      { type: '선택 압박', question: '왜 기본 timeout에 의존했나요?', defense: '당시 미구현이라면 한계로 인정하고, 서비스 SLO와 호출 예산에서 명시 값을 정해야 했다고 회고한다.' },
      { type: '장애·대안', question: 'POST 요청도 자동 재시도할 건가요?', defense: '중복 부작용 위험 때문에 멱등 키나 서버 중복 방지 없이 무조건 재시도하지 않는다고 답한다.' }
    ],
    evidence: { status: '지원자 확인 필요', note: 'WebClient 사용 외 장애 정책은 확인되지 않았다.', sources: ['v5_3 이력서 p.2', 'FlexiRoute 코드 확인 필요'] },
    warnings: ['timeout·retry·Circuit Breaker를 구현 성과로 말하지 않는다.'], resumeClaims: ['WebClient 기반 HTTP 통신 구현'], tags: ['FlexiRoute', 'timeout', 'retry', '6단계']
  },
  {
    id: 'AC-019', category: '이력서 기술', project: 'FlexiRoute', topic: '서비스 호출 확장', stage: '7. 대안·확장', difficulty: '심화', priority: '높음', minutes: 7,
    question: '호출 대상 서비스 장애가 반복되면 FlexiRoute 통신 구조를 어떻게 확장하겠나요?',
    answer: {
      compact: {
        conclusion: 'timeout과 관측을 먼저 세우고 빠른 실패·제한된 재시도·비동기 분리를 단계적으로 적용하겠습니다.',
        evidence1: '동기 필수 조회는 빠른 실패와 제한된 폴백으로 사용자 영향 범위를 줄이겠습니다.',
        evidence2: '후처리 가능한 작업만 이벤트로 분리해 즉시 응답 경로와 장애 전파 경계를 개선하겠습니다.'
      },
      conclusion: '먼저 timeout과 관측을 명확히 하고, 호출의 필수성에 따라 빠른 실패·제한된 재시도·Circuit Breaker·비동기 이벤트를 단계적으로 검토하겠습니다.',
      evidence1: '즉시 응답에 꼭 필요한 조회는 동기 호출을 유지하되 장애 예산과 폴백 가능 데이터를 정하고, 후처리 가능 작업은 이벤트로 분리할 수 있습니다.',
      evidence2: 'Circuit Breaker나 메시징은 운영 복잡도를 늘리므로 장애 빈도와 사용자 영향을 측정한 뒤 도입해야 하며 FlexiRoute 구현 성과는 아닙니다.',
      keywords: ['빠른 실패', 'Circuit Breaker', '폴백', '비동기 이벤트'], caution: 'Resilience4j·Kafka를 당시 적용했다고 말하지 않는다.'
    },
    followups: [
      { type: '사실 확인', question: '현재 구조에서 어떤 호출이 필수였나요?', defense: '가게·리뷰·카테고리의 실제 API 흐름을 확인해 동기 필수 여부를 답한다.' },
      { type: '선택 압박', question: '모든 호출을 이벤트로 바꾸면 되지 않나요?', defense: '즉시 응답과 강한 일관성이 필요한 조회에는 부적합할 수 있고 최종 일관성·운영 비용이 생긴다고 답한다.' },
      { type: '장애·대안', question: '폴백 데이터가 오래되면 더 위험하지 않나요?', defense: '민감 데이터는 폴백하지 않고 오류를 명시하며, 허용 가능한 데이터만 신선도와 출처를 표시한다고 답한다.' }
    ],
    evidence: { status: '일반론', note: '확인된 FlexiRoute 구현이 아니라 장애 대응 확장 설계 답변이다.', sources: ['추가질문답변', '기술 질문 리스트'] },
    warnings: ['Circuit Breaker·비동기 이벤트는 대안일 뿐 구현 이력이 아니다.'], resumeClaims: ['WebClient HTTP 호출로 필요한 데이터 조회'], tags: ['FlexiRoute', 'CircuitBreaker', '확장', '7단계']
  },
  {
    id: 'AC-020', category: '필수 CS', project: '공통', topic: 'JDK·JRE·JVM', stage: '2. 기초 개념', difficulty: '기초', priority: '최우선', minutes: 5,
    question: 'JDK, JRE, JVM의 차이와 Java 코드 실행 과정을 설명해 주세요.',
    answer: {
      compact: {
        conclusion: 'JVM은 바이트코드 실행기, JRE는 실행 환경, JDK는 컴파일러까지 포함한 개발 도구입니다.',
        evidence1: 'Java 소스는 javac로 바이트코드가 되고 ClassLoader를 거쳐 JVM에서 실행됩니다.',
        evidence2: 'JIT는 반복 코드를 네이티브 코드로 바꾸지만 워밍업 전에는 최적화 효과가 제한됩니다.'
      },
      conclusion: 'JVM은 바이트코드를 실행하는 가상 머신, JRE는 실행에 필요한 JVM과 라이브러리, JDK는 여기에 컴파일러와 개발 도구를 더한 개발 환경입니다.',
      evidence1: 'javac가 소스 코드를 바이트코드로 컴파일하고, ClassLoader가 클래스를 적재·검증한 뒤 JVM이 인터프리터와 JIT 컴파일을 통해 실행합니다.',
      evidence2: 'JIT는 반복 실행되는 코드를 네이티브 코드로 최적화하지만 워밍업과 런타임 프로파일에 따라 성능이 달라질 수 있습니다.',
      keywords: ['JDK', 'JRE', 'JVM', '바이트코드', 'JIT'], caution: 'Java가 무조건 플랫폼 독립적이라고 끝내지 말고 JVM 구현과 네이티브 의존성의 경계를 구분한다.'
    },
    followups: [
      { type: '사실 확인', question: 'ClassLoader의 주요 단계를 말해 주세요.', defense: '로딩, 링크의 검증·준비·해석, 초기화 순서로 설명한다.' },
      { type: '선택 압박', question: 'JRE는 최신 배포에서 별도 설치하지 않기도 하는데 정의가 유효한가요?', defense: '개념적 실행 환경과 실제 배포 패키징 방식은 다르며 jlink 등으로 필요한 런타임을 구성할 수 있다고 답한다.' },
      { type: '장애·대안', question: 'ClassNotFoundException과 NoClassDefFoundError 차이는요?', defense: '런타임에 클래스를 찾지 못한 경우와 컴파일 시 존재했지만 초기화 실패 등으로 정의를 사용할 수 없는 경우를 구분한다.' }
    ],
    evidence: { status: '일반론', note: '이력서 Java 기술을 검증하는 필수 개념 질문이다.', sources: ['v5_3 이력서 p.1', '기술 질문 리스트'] },
    warnings: [], resumeClaims: ['Backend: Java'], tags: ['Java', 'JVM', '기초CS', '2단계']
  },
  {
    id: 'AC-021', category: '필수 CS', project: '공통', topic: 'JVM 메모리·GC', stage: '2. 기초 개념', difficulty: '중급', priority: '최우선', minutes: 7,
    question: 'JVM 메모리 영역과 GC가 동작하는 이유를 설명해 주세요.',
    answer: {
      compact: {
        conclusion: 'JVM은 실행 데이터를 영역별로 나누고 GC는 도달할 수 없는 Heap 객체를 회수합니다.',
        evidence1: 'Stack은 호출 프레임을 스레드별로 관리하고 Heap은 객체를 여러 스레드가 공유합니다.',
        evidence2: 'GC는 Root 도달 가능성으로 생존 객체를 판별하며 세부 방식은 선택한 수집기에 따라 달라집니다.'
      },
      conclusion: 'JVM은 스레드별 Stack과 공유 Heap·Metaspace 등으로 메모리를 나누고, GC는 더 이상 도달할 수 없는 Heap 객체를 회수합니다.',
      evidence1: 'Stack에는 호출 프레임과 지역 변수가 쌓이고 Heap에는 객체가 주로 저장되며, GC는 GC Root에서의 도달 가능성을 기준으로 생존 객체를 판별합니다.',
      evidence2: '세대 가설을 활용하는 수집기는 짧게 사는 객체와 오래 사는 객체를 다르게 처리하지만 구체 영역과 알고리즘은 선택한 GC에 따라 달라집니다.',
      keywords: ['Stack', 'Heap', 'Metaspace', 'GC Root', 'Stop-The-World'], caution: 'GC가 메모리 누수를 완전히 막아준다고 말하지 않는다.'
    },
    followups: [
      { type: '사실 확인', question: 'GC Root에는 무엇이 있나요?', defense: '실행 중 스레드 스택의 참조, static 참조, JNI 참조 등을 예로 든다.' },
      { type: '선택 압박', question: 'GC가 있는데 왜 OutOfMemoryError가 나나요?', defense: '도달 가능한 객체가 계속 쌓이거나 Heap·Metaspace·direct memory 한계를 넘을 수 있다고 답한다.' },
      { type: '장애·대안', question: 'GC 지연을 어떻게 관찰하나요?', defense: 'GC 로그, JFR, APM 지표로 pause·할당률·Heap 추이를 확인한다고 답하고 실제 운영 경험과 구분한다.' }
    ],
    evidence: { status: '일반론', note: 'Java 백엔드 필수 개념이며 특정 GC 운영 경험은 아니다.', sources: ['면접 전에 알고 가면 좋을 것들', '기술 질문 리스트'] },
    warnings: ['특정 GC 튜닝 경험으로 포장하지 않는다.'], resumeClaims: ['Backend: Java'], tags: ['Java', 'JVM', 'GC', '2단계']
  },
  {
    id: 'AC-022', category: '필수 CS', project: '공통', topic: '프로세스·스레드', stage: '2. 기초 개념', difficulty: '기초', priority: '최우선', minutes: 5,
    question: '프로세스와 스레드의 차이를 설명해 주세요.',
    answer: {
      compact: {
        conclusion: '프로세스는 독립 주소 공간의 실행 단위이고 스레드는 그 안에서 자원을 공유하는 실행 흐름입니다.',
        evidence1: '스레드는 Heap을 공유해 통신이 가볍지만 경쟁 조건과 동기화 문제가 생길 수 있습니다.',
        evidence2: '프로세스는 격리가 강해 오류 전파를 줄이는 대신 IPC와 메모리 비용이 더 큽니다.'
      },
      conclusion: '프로세스는 독립된 주소 공간과 자원을 가진 실행 단위이고, 스레드는 한 프로세스 안에서 Heap 같은 자원을 공유하며 실행되는 흐름입니다.',
      evidence1: '스레드는 생성·전환과 데이터 공유가 비교적 가볍지만 공유 상태의 경쟁 조건과 동기화 문제가 생길 수 있습니다.',
      evidence2: '프로세스는 격리가 강해 한 프로세스 오류의 전파를 줄이지만 IPC와 메모리 비용이 더 큽니다.',
      keywords: ['주소 공간', '공유 Heap', 'Thread Stack', 'Context Switch', '동기화'], caution: '스레드가 항상 프로세스보다 빠르다고 일반화하지 않는다.'
    },
    followups: [
      { type: '사실 확인', question: '스레드끼리 무엇을 공유하고 무엇을 따로 가지나요?', defense: '코드·Heap·열린 자원은 공유하고 Stack·레지스터 상태는 스레드별이라고 답한다.' },
      { type: '선택 압박', question: '멀티스레드면 CPU를 항상 더 잘 쓰나요?', defense: '코어 수, 작업 유형, 락 경합과 전환 비용에 따라 오히려 느려질 수 있다고 답한다.' },
      { type: '장애·대안', question: '공유 상태 문제를 어떻게 줄이나요?', defense: '불변 객체·상태 격리·동기화·원자 연산·메시지 전달을 요구에 맞게 선택한다고 답한다.' }
    ],
    evidence: { status: '일반론', note: '백엔드 동시성 질문의 기초 개념이다.', sources: ['면접 전에 알고 가면 좋을 것들'] },
    warnings: [], resumeClaims: ['동시 요청 정합성 문제 해결 경험'], tags: ['OS', '프로세스', '스레드', '2단계']
  },
  {
    id: 'AC-023', category: '필수 CS', project: '공통', topic: '동기·비동기·Blocking', stage: '2. 기초 개념', difficulty: '중급', priority: '최우선', minutes: 6,
    question: '동기·비동기와 Blocking·Non-blocking의 차이를 설명해 주세요.',
    answer: {
      compact: {
        conclusion: '동기·비동기는 완료 처리 주체, Blocking·Non-blocking은 호출 흐름의 대기 여부를 구분합니다.',
        evidence1: '동기는 호출자가 완료 순서를 책임지고 비동기는 콜백·Future 등으로 완료를 통지받습니다.',
        evidence2: 'Non-blocking API도 결과를 기다리면 Blocking이 되므로 전체 호출 흐름으로 판단해야 합니다.'
      },
      conclusion: '동기·비동기는 결과 완료를 누가 이어서 처리하는지의 관점이고, Blocking·Non-blocking은 호출한 제어 흐름이 결과를 기다리며 멈추는지의 관점입니다.',
      evidence1: '동기 호출은 호출자가 결과 순서를 책임지고, 비동기는 콜백·Future·이벤트로 완료를 통지받을 수 있습니다.',
      evidence2: 'Non-blocking API도 마지막에 .block()으로 기다리면 호출 경계는 Blocking이 되므로 라이브러리 이름이 아니라 전체 흐름을 봐야 합니다.',
      keywords: ['동기', '비동기', 'Blocking', 'Non-blocking', '완료 통지'], caution: '동기=Blocking, 비동기=Non-blocking으로 무조건 묶지 않는다.'
    },
    followups: [
      { type: '사실 확인', question: '비동기지만 Blocking인 예를 들 수 있나요?', defense: '작업을 다른 스레드에 맡겼지만 호출 스레드가 Future.get으로 기다리는 경우를 예로 든다.' },
      { type: '선택 압박', question: 'Non-blocking이 항상 더 빠른가요?', defense: '대기 I/O가 많을 때 자원 효율 이점이 있지만 단순성·CPU 작업·디버깅 비용을 함께 봐야 한다고 답한다.' },
      { type: '장애·대안', question: 'Reactive 흐름 중간에 Blocking DB를 호출하면요?', defense: '이벤트 루프를 막을 수 있어 별도 스케줄러 격리나 Reactive 드라이버가 필요하다고 답한다.' }
    ],
    evidence: { status: '일반론', note: 'FlexiRoute WebClient 선택을 정확히 설명하기 위한 필수 개념이다.', sources: ['면접 전에 알고 가면 좋을 것들', 'FeignClient와 WebClient 자료'] },
    warnings: ['FlexiRoute가 완전한 Reactive 스택이었다고 말하지 않는다.'], resumeClaims: ['WebClient 기반 HTTP 통신'], tags: ['동시성', '비동기', 'WebClient', '2단계']
  },
  {
    id: 'AC-024', category: '필수 CS', project: '공통', topic: 'HTTP·TCP', stage: '2. 기초 개념', difficulty: '기초', priority: '최우선', minutes: 6,
    question: 'HTTP와 TCP의 관계를 설명해 주세요.',
    answer: {
      compact: {
        conclusion: 'HTTP는 요청·응답 의미를 정의하고 TCP는 이를 전달할 신뢰성 있는 바이트 스트림을 제공합니다.',
        evidence1: 'TCP는 순서·재전송·흐름 제어를 맡고 HTTP는 메서드·상태 코드·헤더를 정의합니다.',
        evidence2: 'HTTP/3는 UDP 기반 QUIC를 사용하므로 HTTP가 항상 TCP 위에서 동작하는 것은 아닙니다.'
      },
      conclusion: 'HTTP는 요청·응답의 의미와 형식을 정하는 애플리케이션 계층 프로토콜이고, HTTP/1.1과 HTTP/2는 일반적으로 신뢰성 있는 바이트 스트림을 제공하는 TCP 위에서 동작합니다.',
      evidence1: 'TCP는 연결 설정, 순서 보장, 재전송, 흐름·혼잡 제어를 담당하고 HTTP는 메서드·상태 코드·헤더·본문을 정의합니다.',
      evidence2: '다만 HTTP/3는 UDP 기반 QUIC 위에서 동작하므로 HTTP가 항상 TCP만 사용한다고 말하면 틀립니다.',
      keywords: ['HTTP', 'TCP', '3-way handshake', '신뢰성', 'HTTP/3·QUIC'], caution: 'OSI 계층 설명에 그치지 말고 각 프로토콜이 책임지는 문제를 구분한다.'
    },
    followups: [
      { type: '사실 확인', question: 'TCP 3-way handshake의 목적은 무엇인가요?', defense: '양쪽 송수신 가능성과 초기 sequence number를 동기화해 연결 상태를 만든다고 답한다.' },
      { type: '선택 압박', question: 'TCP가 신뢰성을 보장하면 애플리케이션 재시도는 왜 필요한가요?', defense: 'TCP는 한 연결의 전송만 다루고 서버 처리 실패·timeout·연결 종료 후 결과 불명은 애플리케이션 정책이 필요하다고 답한다.' },
      { type: '장애·대안', question: '재시도하면 중복 요청은 어떻게 막나요?', defense: '멱등 메서드·멱등 키·서버 중복 방지와 결과 조회를 사용한다고 답한다.' }
    ],
    evidence: { status: '일반론', note: 'WebClient·Feign·Gateway 질문과 연결되는 네트워크 기초다.', sources: ['면접 전에 알고 가면 좋을 것들'] },
    warnings: [], resumeClaims: ['HTTP 통신 구현', 'Gateway 기반 요청 처리'], tags: ['네트워크', 'HTTP', 'TCP', '2단계']
  },
  {
    id: 'AC-025', category: '필수 CS', project: '공통', topic: 'Spring IoC·DI', stage: '2. 기초 개념', difficulty: '기초', priority: '최우선', minutes: 6,
    question: 'Spring의 IoC와 DI를 설명하고 왜 사용하는지 말해 주세요.',
    answer: {
      compact: {
        conclusion: 'IoC는 객체 제어를 컨테이너가 맡는 것이고 DI는 필요한 의존성을 외부에서 주입하는 방식입니다.',
        evidence1: '구현체 생성을 사용처에서 분리해 교체와 테스트 대역 주입이 쉬운 구조를 확보합니다.',
        evidence2: '생성자 주입은 필수 의존성을 명확히 하고 객체를 불변 상태로 유지하기 쉽게 합니다.'
      },
      conclusion: 'IoC는 객체 생성과 생명주기 제어를 컨테이너가 맡는 것이고, DI는 객체가 필요한 의존성을 외부에서 주입받는 구현 방식입니다.',
      evidence1: '구현체 생성을 사용하는 클래스에서 분리하면 객체 교체와 테스트 대역 주입이 쉬워지고 구성 책임을 한곳에 모을 수 있습니다.',
      evidence2: '생성자 주입은 필수 의존성을 명확히 하고 불변 필드로 둘 수 있어 기본 선택으로 설명할 수 있습니다.',
      keywords: ['IoC Container', 'DI', '생성자 주입', '결합도', '테스트'], caution: 'DI를 쓰면 결합이 사라지는 것이 아니라 구체 구현 결합을 구성 경계로 이동시킨다고 설명한다.'
    },
    followups: [
      { type: '사실 확인', question: '생성자 주입의 장점은 무엇인가요?', defense: '필수 의존성 명시, 불변성, 순수 단위 테스트 용이성을 답한다.' },
      { type: '선택 압박', question: '인터페이스가 하나뿐인데도 추상화해야 하나요?', defense: '변경·테스트 경계가 없다면 불필요할 수 있으며 의미 있는 경계에만 추상화를 둔다고 답한다.' },
      { type: '장애·대안', question: '순환 의존이 생기면 어떻게 해결하나요?', defense: 'lazy로 숨기기보다 책임 분리, 이벤트, 중간 서비스 제거 등 설계를 재검토한다고 답한다.' }
    ],
    evidence: { status: '일반론', note: 'Spring Boot 사용 이력에서 파생되는 필수 기초다.', sources: ['v5_3 이력서 p.1', '기술 질문 리스트'] },
    warnings: [], resumeClaims: ['Spring Boot 3.4'], tags: ['Spring', 'IoC', 'DI', '2단계']
  },
  {
    id: 'AC-026', category: '필수 CS', project: '공통', topic: 'Bean Scope', stage: '2. 기초 개념', difficulty: '중급', priority: '높음', minutes: 5,
    question: 'Spring Bean의 기본 Scope와 상태 관리 시 주의점을 설명해 주세요.',
    answer: {
      compact: {
        conclusion: 'Spring Bean의 기본 Scope는 컨테이너 안에서 인스턴스 하나를 공유하는 singleton입니다.',
        evidence1: '여러 요청이 같은 Bean을 사용하므로 가변 필드를 두면 경쟁 조건이 생길 수 있습니다.',
        evidence2: '요청 데이터는 지역 변수나 요청 Scope에 두고 서비스 Bean은 stateless하게 유지해야 합니다.'
      },
      conclusion: 'Spring Bean의 기본 Scope는 컨테이너당 하나의 인스턴스를 공유하는 singleton입니다.',
      evidence1: '여러 요청 스레드가 같은 인스턴스를 사용할 수 있으므로 singleton Bean에 요청별 가변 상태를 필드로 두면 경쟁 조건이 생길 수 있습니다.',
      evidence2: '요청 데이터는 지역 변수나 요청 Scope에 두고, 서비스 Bean은 가능한 stateless하게 설계하는 것이 안전합니다.',
      keywords: ['singleton', 'stateless', 'request scope', 'thread safety'], caution: 'Spring singleton을 JVM 전체에 단 하나인 GoF singleton과 동일하게 설명하지 않는다.'
    },
    followups: [
      { type: '사실 확인', question: 'prototype Bean을 singleton Bean에 주입하면 매번 새 객체인가요?', defense: '일반 주입 시 singleton 생성 때 받은 인스턴스를 계속 쓰므로 Provider나 scoped proxy 같은 조회 방식이 필요하다고 답한다.' },
      { type: '선택 압박', question: '모든 Service를 request scope로 만들면 안전하지 않나요?', defense: '생성 비용과 설계 복잡도가 늘고 stateless singleton으로 충분한 경우가 많다고 답한다.' },
      { type: '장애·대안', question: 'ThreadLocal로 요청 상태를 저장해도 되나요?', defense: '정리 누락 시 스레드 풀에서 데이터가 섞일 수 있어 프레임워크 컨텍스트를 우선하고 반드시 제거해야 한다고 답한다.' }
    ],
    evidence: { status: '일반론', note: 'Spring Bean과 동시 요청 안전성을 연결하는 기초 질문이다.', sources: ['기술 질문 리스트'] },
    warnings: [], resumeClaims: ['Spring Boot 기반 API 구현'], tags: ['Spring', 'BeanScope', '동시성', '2단계']
  },
  {
    id: 'AC-027', category: '필수 CS', project: '공통', topic: 'Spring Proxy·AOP', stage: '2. 기초 개념', difficulty: '중급', priority: '최우선', minutes: 6,
    question: 'Spring AOP가 프록시로 동작한다는 의미를 설명해 주세요.',
    answer: {
      compact: {
        conclusion: 'Spring AOP는 대상 앞의 프록시가 외부 호출을 가로채 Advice를 실행한 뒤 위임합니다.',
        evidence1: 'JDK 또는 클래스 기반 프록시로 트랜잭션과 권한 검사 같은 횡단 관심사를 분리합니다.',
        evidence2: 'self-invocation과 final·private 메서드는 프록시 적용 범위에서 벗어날 수 있습니다.'
      },
      conclusion: 'Spring은 대상 객체 앞에 프록시를 두고 외부 호출을 가로채 Advice를 실행한 뒤 실제 메서드로 위임합니다.',
      evidence1: '인터페이스 기반 JDK 동적 프록시 또는 클래스 기반 프록시가 사용될 수 있고, @Transactional과 역할 검사 같은 횡단 관심사를 적용합니다.',
      evidence2: '같은 객체 내부의 self-invocation은 프록시를 거치지 않을 수 있고 final·private 메서드 등은 적용 제약을 확인해야 합니다.',
      keywords: ['Proxy', 'Join Point', 'Advice', 'self-invocation', 'JDK·CGLIB'], caution: 'CGLIB가 모든 private·final 메서드를 가로챌 수 있다고 말하지 않는다.'
    },
    followups: [
      { type: '사실 확인', question: 'JDK 프록시와 클래스 기반 프록시 차이는요?', defense: '인터페이스 구현 프록시와 대상 클래스를 상속한 프록시라는 핵심 차이를 설명한다.' },
      { type: '선택 압박', question: 'AOP가 숨은 동작을 만들어 디버깅이 어렵지 않나요?', defense: '맞다고 인정하고 횡단 관심사에 제한하며 어노테이션·로그·테스트로 적용 경계를 명확히 한다고 답한다.' },
      { type: '장애·대안', question: 'self-invocation 문제를 어떻게 피하나요?', defense: '트랜잭션 경계를 다른 Bean으로 분리하거나 호출 구조를 재설계하고 자기 프록시 주입은 마지막 수단이라고 답한다.' }
    ],
    evidence: { status: '일반론', note: '3M AOP 권한 제어를 설명하기 위한 Spring 기초다.', sources: ['v5_3 이력서 p.2', '기술 질문 리스트'] },
    warnings: [], resumeClaims: ['AOP 기반 역할 권한 제어'], tags: ['Spring', 'AOP', 'Proxy', '2단계']
  },
  {
    id: 'AC-028', category: '필수 CS', project: '공통', topic: '@Transactional 프록시', stage: '4. 구현 흐름', difficulty: '중급', priority: '최우선', minutes: 7,
    question: '@Transactional은 어떻게 동작하고 적용되지 않는 대표 상황은 무엇인가요?',
    answer: {
      compact: {
        conclusion: '프록시가 트랜잭션을 시작하고 정상 종료 시 commit하며 지정된 rollback 대상 예외가 발생하면 rollback합니다.',
        evidence1: '같은 객체 내부 호출은 프록시를 거치지 않아 새 트랜잭션 설정이 적용되지 않을 수 있습니다.',
        evidence2: '긴 트랜잭션은 락과 커넥션 점유를 늘리므로 실제 일관성 경계만 포함해야 합니다.'
      },
      conclusion: '@Transactional 메서드를 프록시가 가로채 TransactionManager로 트랜잭션을 시작하고 정상 종료 시 commit, 지정된 예외 시 rollback합니다.',
      evidence1: '기본 프록시 방식에서는 외부에서 프록시를 거치는 호출이어야 하므로 같은 객체 내부 호출은 새 트랜잭션 설정이 적용되지 않을 수 있습니다.',
      evidence2: 'rollback 기본 규칙, propagation, isolation은 실제 요구에 맞춰 확인해야 하며 트랜잭션을 길게 잡으면 락과 커넥션 점유가 늘어납니다.',
      keywords: ['TransactionManager', 'commit', 'rollback', 'propagation', 'self-invocation'], caution: '모든 예외에서 자동 rollback된다고 말하지 않는다.'
    },
    followups: [
      { type: '사실 확인', question: '기본 rollback 대상은 무엇인가요?', defense: '기본적으로 RuntimeException과 Error이며 checked exception은 rollbackFor 등 정책 지정이 필요하다고 답한다.' },
      { type: '선택 압박', question: '메서드에 전부 @Transactional을 붙이면 안전하지 않나요?', defense: '불필요한 범위가 커지고 외부 호출을 포함하면 자원 점유와 장애 영향이 커진다고 답한다.' },
      { type: '장애·대안', question: 'DB commit 후 외부 메시지 발행이 실패하면요?', defense: 'DB와 브로커는 별도 자원이므로 Outbox 같은 일관성 패턴이 필요하다고 답하되 구현 경험과 구분한다.' }
    ],
    evidence: { status: '일반론', note: 'FeedShop 트랜잭션 분리와 Spring 기초를 연결하는 질문이다.', sources: ['기술 질문 리스트', '면접질문답변'] },
    warnings: ['REQUIRES_NEW와 EntityManager 동작을 확인 없이 단정하지 않는다.'], resumeClaims: ['투표 저장·flush 별도 트랜잭션 격리'], tags: ['Spring', 'Transactional', 'Proxy', '4단계']
  },
  {
    id: 'AC-029', category: '필수 CS', project: '공통', topic: 'JPA 영속성 컨텍스트', stage: '2. 기초 개념', difficulty: '중급', priority: '최우선', minutes: 7,
    question: 'JPA 영속성 컨텍스트의 역할과 엔티티 생명주기를 설명해 주세요.',
    answer: {
      compact: {
        conclusion: '영속성 컨텍스트는 엔티티를 식별자별로 관리하며 변경 감지와 쓰기 지연을 제공하는 작업 공간입니다.',
        evidence1: '엔티티는 네 상태를 거치며 같은 영속성 컨텍스트에서는 동일 식별자의 객체 정체성을 보장합니다.',
        evidence2: 'flush는 SQL을 DB에 반영할 뿐 commit이 아니므로 rollback되면 변경도 취소됩니다.'
      },
      conclusion: '영속성 컨텍스트는 EntityManager가 엔티티를 식별자 기준으로 관리하는 1차 캐시이자 변경 감지·쓰기 지연의 작업 공간입니다.',
      evidence1: '엔티티는 비영속, 영속, 준영속, 삭제 상태를 거치며 같은 컨텍스트에서 같은 식별자를 조회하면 동일 인스턴스 정체성을 보장합니다.',
      evidence2: 'flush는 변경 SQL을 DB에 반영하지만 트랜잭션 commit과 같지 않고, rollback되면 반영 결과도 취소됩니다.',
      keywords: ['EntityManager', '1차 캐시', '변경 감지', '쓰기 지연', 'flush'], caution: '1차 캐시를 여러 요청이 공유하는 애플리케이션 캐시처럼 설명하지 않는다.'
    },
    followups: [
      { type: '사실 확인', question: 'flush와 commit의 차이는 무엇인가요?', defense: 'flush는 SQL 동기화, commit은 트랜잭션 확정이라고 답한다.' },
      { type: '선택 압박', question: '변경 감지가 편하면 update 쿼리를 직접 만들 필요가 없나요?', defense: '편리하지만 변경 범위·쿼리 수를 관찰해야 하며 bulk update는 영속성 컨텍스트와 불일치할 수 있다고 답한다.' },
      { type: '장애·대안', question: 'bulk update 후 조회 값이 오래되면요?', defense: 'clearAutomatically 또는 직접 clear·재조회로 컨텍스트를 동기화한다고 답한다.' }
    ],
    evidence: { status: '일반론', note: 'JPA 사용 이력에서 필수로 파생되는 개념이다.', sources: ['v5_3 이력서 p.1', '기술 질문 리스트'] },
    warnings: [], resumeClaims: ['Backend: JPA'], tags: ['JPA', '영속성컨텍스트', 'flush', '2단계']
  },
  {
    id: 'AC-030', category: '필수 CS', project: '공통', topic: 'LAZY Proxy', stage: '2. 기초 개념', difficulty: '중급', priority: '최우선', minutes: 6,
    question: 'JPA LAZY 로딩과 프록시가 어떻게 동작하나요?',
    answer: {
      compact: {
        conclusion: 'LAZY 로딩은 연관 객체 대신 프록시를 두고 실제 접근 시점에 SQL로 초기화합니다.',
        evidence1: '불필요한 즉시 조회를 피할 수 있지만 반복 접근하면 N+1 쿼리가 발생할 수 있습니다.',
        evidence2: '영속성 컨텍스트가 닫힌 뒤 미초기화 프록시에 접근하면 LazyInitializationException이 발생합니다.'
      },
      conclusion: 'LAZY 연관관계는 실제 연관 엔티티 대신 프록시나 지연 컬렉션을 두고 접근 시점에 SQL을 실행해 초기화합니다.',
      evidence1: '필요하지 않은 연관 데이터를 즉시 읽지 않는 장점이 있지만 반복문에서 접근하면 N+1 쿼리가 발생할 수 있습니다.',
      evidence2: '영속성 컨텍스트가 닫힌 뒤 초기화되지 않은 연관관계에 접근하면 LazyInitializationException이 발생할 수 있어 조회 시 필요한 데이터 범위를 설계해야 합니다.',
      keywords: ['LAZY', 'Proxy', '초기화', 'LazyInitializationException'], caution: 'LAZY 설정만으로 쿼리가 항상 줄어든다고 말하지 않는다.'
    },
    followups: [
      { type: '사실 확인', question: '프록시 초기화 여부는 어떻게 확인하나요?', defense: 'PersistenceUnitUtil 또는 Hibernate 초기화 API와 실제 SQL 로그를 예로 든다.' },
      { type: '선택 압박', question: 'Open Session in View를 켜면 예외가 없어지지 않나요?', defense: '뷰까지 지연 로딩이 가능하지만 예상 못 한 쿼리와 긴 컨텍스트 범위가 생겨 조회 설계를 대신할 수 없다고 답한다.' },
      { type: '장애·대안', question: '프록시 객체의 타입 비교는 왜 주의해야 하나요?', defense: '프록시 하위 타입일 수 있어 getClass 직접 비교보다 식별자 기반 equals 설계를 주의한다고 답한다.' }
    ],
    evidence: { status: '일반론', note: 'FeedShop N+1 문제를 이해하기 위한 JPA 기초다.', sources: ['기술 질문 리스트', '면접질문답변'] },
    warnings: [], resumeClaims: ['JPA', '이벤트 목록 연관 데이터 반복 조회 문제'], tags: ['JPA', 'LAZY', 'Proxy', '2단계']
  },
  {
    id: 'AC-031', category: '필수 CS', project: 'FeedShop', topic: 'N+1', stage: '4. 구현 흐름', difficulty: '중급', priority: '최우선', minutes: 7,
    question: 'N+1 문제는 무엇이고 FeedShop에서는 어떻게 접근했나요?',
    answer: {
      compact: {
        conclusion: 'N+1은 목록 뒤 연관 쿼리가 반복되는 문제이며 FeedShop은 fetch join으로 해결했습니다.',
        evidence1: 'QueryDSL로 조회 구조를 바꿔 캐시가 없어도 반복 쿼리 병목을 제거했습니다.',
        evidence2: '그 뒤 이벤트 목록만 Redis에 캐시해 원본 조회 최적화와 응답 속도 개선을 함께 확보했습니다.'
      },
      conclusion: 'N+1은 목록 1회 조회 뒤 각 행의 연관 데이터를 가져오느라 N번의 추가 쿼리가 반복되는 문제입니다.',
      evidence1: 'FeedShop은 캐시부터 덮지 않고 QueryDSL leftJoin·fetchJoin으로 조회 구조를 먼저 바꿔 요청당 SQL을 42회에서 2회로 줄였습니다.',
      evidence2: '그 뒤 읽기 빈도가 높고 변경이 적은 이벤트 목록에 Redis 캐시를 적용해 Cache Miss에서도 쿼리 병목이 남지 않게 했습니다.',
      keywords: ['N+1', 'fetchJoin', 'QueryDSL', 'SQL 42→2', 'Cache Miss'], caution: '모든 연관관계를 fetch join하면 된다고 말하지 않고 페이징·컬렉션 중복 한계를 함께 말한다.'
    },
    followups: [
      { type: '사실 확인', question: '2개 쿼리는 각각 무엇이었나요?', defense: '실제 QueryDSL 코드와 SQL 로그를 확인해 답하고 추정하지 않는다.' },
      { type: '선택 압박', question: 'BatchSize가 더 간단하지 않았나요?', defense: 'BatchSize는 추가 쿼리를 묶는 대안이고 필요한 연관을 한 번에 가져오는 조회와 데이터 크기·페이징 조건을 비교한다고 답한다.' },
      { type: '장애·대안', question: '컬렉션 fetch join으로 페이징하면요?', defense: 'DB 페이징이 왜곡되거나 메모리 페이징 위험이 있어 ID 선조회·2단계 조회·BatchSize를 검토한다고 답한다.' }
    ],
    evidence: { status: '확인됨', note: 'FeedShop 조회 개선과 SQL 수치가 v5_3 및 코드 근거에 확인됐다.', sources: ['v5_3 이력서 p.1-2', 'FeedShop 프로젝트 코드·Wiki'] },
    warnings: ['정확한 두 쿼리와 join 대상은 코드 재확인 필요.'], resumeClaims: ['QueryDSL leftJoin·fetchJoin', 'SQL 42회에서 2회 축소'], tags: ['FeedShop', 'JPA', 'N+1', '4단계']
  },
  {
    id: 'AC-032', category: '필수 CS', project: '공통', topic: '트랜잭션 격리 수준', stage: '2. 기초 개념', difficulty: '심화', priority: '최우선', minutes: 7,
    question: '트랜잭션 격리 수준과 대표 이상 현상을 설명해 주세요.',
    answer: {
      compact: {
        conclusion: 'READ UNCOMMITTED부터 SERIALIZABLE로 갈수록 이상 현상은 줄지만 동시성 비용이 커질 수 있습니다.',
        evidence1: 'Dirty read는 미커밋 값, non-repeatable read는 같은 행의 값 변화, phantom read는 결과 행 변화를 읽습니다.',
        evidence2: '같은 격리 수준도 DB의 MVCC와 락 구현에 따라 실제 동작이 달라질 수 있습니다.'
      },
      conclusion: '격리 수준은 동시에 실행되는 트랜잭션이 서로의 변경을 어느 정도 보게 할지 정하는 기준이며 높을수록 이상 현상을 줄이는 대신 동시성 비용이 커질 수 있습니다.',
      evidence1: 'READ UNCOMMITTED, READ COMMITTED, REPEATABLE READ, SERIALIZABLE 순으로 설명하며 dirty read, non-repeatable read, phantom read를 연결합니다.',
      evidence2: '실제 동작은 DB의 MVCC와 락 구현에 따라 달라지므로 MySQL과 PostgreSQL의 같은 이름이 모든 면에서 동일하다고 가정하면 안 됩니다.',
      keywords: ['Isolation', 'Dirty Read', 'Non-repeatable Read', 'Phantom Read', 'MVCC'], caution: '격리 수준 표만 외우지 말고 사용하는 DB의 기본 수준과 구현을 확인한다.'
    },
    followups: [
      { type: '사실 확인', question: 'MySQL InnoDB의 기본 격리 수준은 무엇인가요?', defense: 'REPEATABLE READ라고 답하고 snapshot read와 locking read의 차이를 구분한다.' },
      { type: '선택 압박', question: 'SERIALIZABLE을 쓰면 동시성 문제가 모두 해결되나요?', defense: '직렬화 충돌·재시도·처리량 비용이 있고 애플리케이션 불변식 설계는 여전히 필요하다고 답한다.' },
      { type: '장애·대안', question: '격리 수준을 높이지 않고 중복을 막는 방법은요?', defense: '유니크 제약, 원자 update, 낙관·비관 락 등 불변식에 맞는 수단을 답한다.' }
    ],
    evidence: { status: '일반론', note: 'MySQL·PostgreSQL과 동시성 경험에서 파생되는 DB 기초다.', sources: ['기술 질문 리스트', '면접 전에 알고 가면 좋을 것들'] },
    warnings: ['DB별 구현 차이를 무시하지 않는다.'], resumeClaims: ['MySQL 8.0', 'PostgreSQL 16', '투표 동시성 해결'], tags: ['DB', 'Transaction', 'Isolation', '2단계']
  },
  {
    id: 'AC-033', category: '필수 CS', project: '공통', topic: '낙관·비관·분산 락', stage: '7. 대안·확장', difficulty: '심화', priority: '최우선', minutes: 8,
    question: '낙관적 락, 비관적 락, 분산 락을 언제 선택하나요?',
    answer: {
      compact: {
        conclusion: '충돌 빈도와 재시도 가능성, 임계 구역 범위, 단일 DB 여부를 기준으로 락을 선택합니다.',
        evidence1: '낙관적 락은 충돌이 적을 때, 비관적 락은 충돌이 잦고 트랜잭션이 짧을 때 적합합니다.',
        evidence2: '분산 락은 여러 인스턴스를 조정하지만 DB 제약이나 원자 연산으로 충분한지 먼저 확인해야 합니다.'
      },
      conclusion: '충돌 빈도, 임계 구역 범위, 재시도 가능성, 단일 DB 여부를 기준으로 선택합니다.',
      evidence1: '낙관적 락은 version 충돌을 감지해 재시도하고 충돌이 적을 때 유리하며, 비관적 락은 DB 행을 먼저 잠가 충돌이 잦고 짧은 트랜잭션에 사용할 수 있습니다.',
      evidence2: '분산 락은 여러 인스턴스의 임계 구역을 조정하지만 만료·소유권·장애 복구 복잡도가 있어 DB 유니크 제약이나 원자 연산으로 충분한지 먼저 봐야 합니다.',
      keywords: ['낙관적 락', '비관적 락', '분산 락', '충돌 빈도', '재시도'], caution: 'Redis 분산 락이 DB 불변식을 자동 보장한다고 말하지 않는다.'
    },
    followups: [
      { type: '사실 확인', question: '낙관적 락 충돌은 언제 감지되나요?', defense: 'version을 포함한 update가 0건일 때 예외로 감지되며 보통 flush 시점에 드러난다고 답한다.' },
      { type: '선택 압박', question: 'FeedShop은 왜 분산 락을 쓰지 않았나요?', defense: '중복 저장은 DB 유니크, 카운트는 Redis INCR로 책임을 나눠 전역 임계 구역을 만들 필요를 줄였다고 답한다.' },
      { type: '장애·대안', question: '락 보유 프로세스가 죽으면요?', defense: 'DB 락은 트랜잭션 종료, 분산 락은 lease·소유 토큰·안전한 unlock이 필요하며 Redisson 같은 구현도 한계를 이해해야 한다고 답한다.' }
    ],
    evidence: { status: '일반론', note: 'FeedShop 선택의 대안을 설명하는 심화 개념이다.', sources: ['기술 질문 리스트', '면접질문답변'] },
    warnings: ['Redisson·분산 락을 실제 적용했다고 말하지 않는다.'], resumeClaims: ['DB 유니크 제약과 Redis INCR로 책임 분리'], tags: ['DB', 'Lock', '동시성', '7단계']
  },
  {
    id: 'AC-034', category: '필수 CS', project: '공통', topic: 'B+Tree 인덱스', stage: '2. 기초 개념', difficulty: '중급', priority: '최우선', minutes: 7,
    question: 'DB 인덱스가 B+Tree를 사용하는 이유와 쓰기 비용을 설명해 주세요.',
    answer: {
      compact: {
        conclusion: 'B+Tree는 균형 잡힌 높이와 정렬된 leaf로 단건 탐색과 범위 조회를 효율화합니다.',
        evidence1: '루트부터 leaf까지 제한된 페이지를 읽고 연결된 leaf로 범위를 순차 탐색합니다.',
        evidence2: '쓰기마다 인덱스 갱신과 page split 비용이 생기므로 실제 조회 조건에 필요한 만큼만 둬야 합니다.'
      },
      conclusion: 'B+Tree 계열은 균형 잡힌 높이로 탐색 비용을 낮추고 정렬된 leaf를 통해 범위 조회를 효율적으로 처리하기 때문에 범용 DB 인덱스에 적합합니다.',
      evidence1: '검색은 루트에서 leaf까지 제한된 페이지 접근으로 수행되고 leaf의 정렬·연결 구조가 범위 스캔과 ORDER BY에 유리합니다.',
      evidence2: '대신 INSERT·UPDATE·DELETE마다 인덱스도 갱신되고 page split과 추가 저장 공간이 생기므로 조회 조건에 필요한 인덱스만 둬야 합니다.',
      keywords: ['B+Tree', '균형 트리', '범위 조회', 'page split', '복합 인덱스'], caution: '인덱스가 있으면 모든 조회가 빨라진다고 말하지 않는다.'
    },
    followups: [
      { type: '사실 확인', question: '복합 인덱스의 컬럼 순서는 어떻게 정하나요?', defense: '실제 WHERE·JOIN·ORDER BY와 선택도, 범위 조건 이후 사용 제약을 실행 계획으로 검증한다고 답한다.' },
      { type: '선택 압박', question: '선택도가 높은 컬럼을 무조건 앞에 두나요?', defense: '쿼리 패턴과 equality·range·정렬 요구가 우선이며 선택도만으로 결정하지 않는다고 답한다.' },
      { type: '장애·대안', question: '인덱스를 탔는데도 느리면요?', defense: '조회 행 수, random I/O, covering 여부, 통계, 정렬·조인과 실제 실행 계획을 확인한다고 답한다.' }
    ],
    evidence: { status: '일반론', note: 'MySQL·PostgreSQL 사용 이력에서 파생되는 DB 필수 개념이다.', sources: ['기술 질문 리스트', '면접 전에 알고 가면 좋을 것들'] },
    warnings: ['FeedShop 개선이 인덱스만으로 이루어졌다고 섞지 않는다.'], resumeClaims: ['MySQL 8.0', 'PostgreSQL 16', 'QueryDSL 조회 개선'], tags: ['DB', 'Index', 'B+Tree', '2단계']
  },
  {
    id: 'AC-035', category: '필수 CS', project: '공통', topic: 'Redis 기초·자료구조', stage: '2. 기초 개념', difficulty: '기초', priority: '최우선', minutes: 7,
    question: 'Redis는 무엇이고 어떤 자료구조를 언제 사용하나요?',
    answer: {
      compact: {
        conclusion: 'Redis는 메모리 중심 key-value 저장소로 캐시·카운터·세션 같은 저지연 작업에 사용합니다.',
        evidence1: 'String은 값·카운터, Hash는 필드 묶음, List는 순서 큐, Set은 중복 제거, Sorted Set은 순위에 적합합니다.',
        evidence2: 'FeedShop은 목록 캐시와 INCR 카운터의 책임을 나눠 조회와 집계 경계를 분리했습니다.'
      },
      conclusion: 'Redis는 메모리 중심의 key-value 데이터 저장소로 낮은 지연과 원자 명령을 활용해 캐시, 카운터, 세션 등에 사용합니다.',
      evidence1: 'String은 캐시·카운터, Hash는 필드 묶음, List는 순서 큐, Set은 중복 없는 집합, Sorted Set은 점수 기반 순위에 적합합니다.',
      evidence2: 'FeedShop에서는 이벤트 목록 캐시와 투표 카운터 INCR처럼 목적을 분리했으며, 메모리 비용·만료·원본 데이터와의 일관성을 함께 설계해야 합니다.',
      keywords: ['in-memory', 'String', 'Hash', 'Set', 'Sorted Set', 'INCR'], caution: 'Redis를 단순히 빠른 DB라고만 설명하거나 모든 데이터를 영구 보존한다고 말하지 않는다.'
    },
    followups: [
      { type: '사실 확인', question: 'FeedShop 카운터의 실제 키와 명령은 무엇이었나요?', defense: 'StringRedisTemplate INCR 등 실제 코드에서 확인된 API와 키 규칙만 답한다.' },
      { type: '선택 압박', question: 'DB 원자 update로도 카운터를 처리할 수 있지 않나요?', defense: '가능하며 트래픽·조회 빈도·정합성·운영 복잡도를 비교해 Redis 필요성을 판단한다고 답한다.' },
      { type: '장애·대안', question: '메모리가 부족하면 어떻게 되나요?', defense: 'maxmemory와 eviction 정책에 따라 키가 제거되거나 쓰기가 실패할 수 있어 모니터링과 데이터 중요도 분리가 필요하다고 답한다.' }
    ],
    evidence: { status: '문서 근거', note: 'Redis 사용 위치는 확인됐고 자료구조 설명은 일반 개념이다.', sources: ['v5_3 이력서 p.1-2', 'FeedShop 프로젝트 코드·Wiki', '기술 질문 리스트'] },
    warnings: ['키·TTL·클라이언트 API는 실제 코드와 대조한다.'], resumeClaims: ['Redis', 'Redis INCR', 'Redis 캐시'], tags: ['Redis', '자료구조', '기초CS', '2단계']
  },
  {
    id: 'AC-036', category: '필수 CS', project: '공통', topic: 'Redis 영속성', stage: '6. 장애·한계', difficulty: '심화', priority: '높음', minutes: 7,
    question: 'Redis의 RDB와 AOF 영속화 방식과 데이터 유실 가능성을 설명해 주세요.',
    answer: {
      compact: {
        conclusion: 'RDB는 시점별 스냅샷, AOF는 쓰기 명령 로그로 복구하며 유실 범위와 비용이 다릅니다.',
        evidence1: 'RDB는 마지막 스냅샷 이후 변경을 잃을 수 있고 AOF는 fsync 정책에 따라 유실 구간과 I/O 비용이 달라집니다.',
        evidence2: '두 방식 모두 무손실을 보장하지 않으므로 중요한 데이터는 원본 저장소와 복구 기준이 필요합니다.'
      },
      conclusion: 'RDB는 특정 시점의 스냅샷을 저장하고, AOF는 쓰기 명령 로그를 기록해 재실행하는 방식이라 복구 속도·파일 크기·유실 허용 범위가 다릅니다.',
      evidence1: 'RDB는 백업과 빠른 재시작에 유리하지만 마지막 스냅샷 이후 데이터가 사라질 수 있고, AOF는 fsync 정책에 따라 유실 구간을 줄이는 대신 I/O와 파일 관리 비용이 생깁니다.',
      evidence2: '복제와 영속성을 사용해도 최근 쓰기 유실 가능성이 0이 되는 것은 아니므로 FeedShop처럼 DB를 원본으로 둔 설계가 중요합니다.',
      keywords: ['RDB', 'AOF', 'fsync', '복구', '데이터 유실'], caution: 'Redis 영속성 설정을 실제 FeedShop 운영 구성으로 단정하지 않는다.'
    },
    followups: [
      { type: '사실 확인', question: '프로젝트 Redis는 RDB와 AOF 중 무엇을 썼나요?', defense: '배포 설정이 확인되지 않았다면 모른다고 답하고 일반 설정을 구현 사실로 말하지 않는다.' },
      { type: '선택 압박', question: 'appendfsync always면 유실이 0인가요?', defense: 'OS·디스크·장애 시점과 복제 승격 등 전체 경로에서 절대 0을 보장한다고 말할 수 없고 성능 비용도 크다고 답한다.' },
      { type: '장애·대안', question: 'Redis 재시작 후 카운터가 사라지면요?', defense: 'DB 원본에서 복구·보정해야 하며 정확한 FeedShop 복구 트리거와 재적재 방식은 코드를 확인한다고 답한다.' }
    ],
    evidence: { status: '일반론', note: 'Redis 장애 질문을 위한 일반 개념이며 프로젝트 영속성 설정 근거는 없다.', sources: ['면접질문답변', '기술 질문 리스트'] },
    warnings: ['AOF·RDB를 실제 설정으로 주장하지 않는다.', '무손실이라고 표현하지 않는다.'], resumeClaims: ['Redis 카운터 DB 원본 기준 폴백·정기 보정'], tags: ['Redis', 'RDB', 'AOF', '6단계']
  },
  {
    id: 'AC-037', category: '필수 CS', project: '공통', topic: 'Redis Sentinel·Cluster', stage: '7. 대안·확장', difficulty: '심화', priority: '높음', minutes: 8,
    question: 'Redis Sentinel과 Cluster의 목적과 차이를 설명해 주세요.',
    answer: {
      compact: {
        conclusion: 'Sentinel은 장애 감지와 승격, Cluster는 데이터 샤딩을 통한 수평 확장이 목적입니다.',
        evidence1: 'Sentinel은 샤딩하지 않으며 failover 중단과 비동기 복제에 따른 유실 가능성이 있습니다.',
        evidence2: 'Cluster는 hash slot으로 분산하므로 다중 키 연산 제약과 더 큰 운영 복잡도를 감수합니다.'
      },
      conclusion: 'Sentinel은 주로 단일 primary와 replica 구성의 장애 감지·자동 승격을 제공하고, Cluster는 데이터를 여러 master에 분산해 용량과 처리량을 수평 확장합니다.',
      evidence1: 'Sentinel은 샤딩을 제공하지 않으며 failover 동안 짧은 중단과 비동기 복제에 따른 최근 쓰기 유실 가능성이 있습니다.',
      evidence2: 'Cluster는 hash slot으로 키를 분산하므로 여러 키 연산은 같은 slot 제약을 고려해야 하고 운영 복잡도가 커집니다.',
      keywords: ['Sentinel', 'Cluster', 'failover', 'hash slot', '비동기 복제'], caution: '둘 중 하나를 사용했다거나 Redis 장애가 자동으로 무손실 복구됐다고 말하지 않는다.'
    },
    followups: [
      { type: '사실 확인', question: 'FeedShop은 Sentinel이나 Cluster를 썼나요?', defense: '확인된 근거가 없으므로 사용하지 않은 것으로 단정하지 말고 배포 구성을 확인해야 한다고 답한다.' },
      { type: '선택 압박', question: '카운터 하나 때문에 Cluster가 필요한가요?', defense: '현재 부하와 메모리 규모로 단일 인스턴스가 충분할 수 있으며 측정 없이 도입하면 운영 비용만 늘 수 있다고 답한다.' },
      { type: '장애·대안', question: 'Cluster에서 여러 키를 원자적으로 갱신하려면요?', defense: '키 hash tag로 같은 slot에 배치하거나 데이터 모델을 바꾸고, 교차 slot 원자성이 필요하면 다른 저장 구조를 검토한다고 답한다.' }
    ],
    evidence: { status: '일반론', note: '확장·고가용성 대안이며 프로젝트 적용 경험이 아니다.', sources: ['면접질문답변', '기술 질문 리스트'] },
    warnings: ['Sentinel·Cluster 사용 경험으로 말하지 않는다.'], resumeClaims: ['Redis 사용'], tags: ['Redis', 'Sentinel', 'Cluster', '7단계']
  },
  {
    id: 'AC-038', category: '필수 CS', project: '3M', topic: 'JWT 보안 원리', stage: '2. 기초 개념', difficulty: '중급', priority: '최우선', minutes: 7,
    question: 'JWT는 어떻게 위변조를 검증하고, 암호화와 무엇이 다른가요?',
    answer: {
      compact: {
        conclusion: '서명 JWT는 signature로 위변조를 검증하지만 Base64URL payload의 내용을 숨기지는 않습니다.',
        evidence1: '서버는 허용 알고리즘과 키로 서명을 검증하고 exp·iss·aud 같은 클레임도 확인해야 합니다.',
        evidence2: '민감 정보는 payload에서 제외하고 기밀성이 필요하면 TLS나 별도 암호화를 사용해야 합니다.'
      },
      conclusion: '일반적인 서명 JWT는 header와 payload를 signature로 검증해 변경 여부와 발급 주체를 확인하지만 payload를 숨기지는 않습니다.',
      evidence1: '서버는 허용한 알고리즘과 키로 서명을 검증하고 exp·iss·aud 같은 클레임도 정책에 맞게 확인해야 합니다.',
      evidence2: '민감 정보는 payload에 넣지 않으며 기밀성이 필요하면 TLS와 별도의 암호화 방식이 필요합니다.',
      keywords: ['Header', 'Payload', 'Signature', 'exp', 'iss', 'aud'], caution: 'JWT payload가 Base64URL 인코딩됐다는 이유로 암호화됐다고 말하지 않는다.'
    },
    followups: [
      { type: '사실 확인', question: '3M은 어떤 서명 알고리즘과 키를 썼나요?', defense: 'JWT 설정 코드를 확인해 실제 알고리즘만 답한다.' },
      { type: '선택 압박', question: '서버 세션보다 JWT가 항상 확장성에 좋은가요?', defense: '상태 조회를 줄일 수 있지만 폐기·권한 최신성·키 회전 복잡도가 있어 요구에 따라 세션이 더 단순할 수 있다고 답한다.' },
      { type: '장애·대안', question: '서명 키가 유출되면요?', defense: '즉시 키 교체·토큰 폐기 정책·kid 기반 회전과 영향 범위 조사가 필요하다고 답하되 실제 구현과 구분한다.' }
    ],
    evidence: { status: '문서 근거', note: '3M JWT 사용은 확인됐고 보안 설명은 일반 원리다.', sources: ['v5_3 이력서 p.2', '3M 프로젝트 코드 확인 필요'] },
    warnings: ['알고리즘·키 관리·회전 구현은 확인 전 단정하지 않는다.'], resumeClaims: ['JWT Access·Refresh Token', 'Gateway 필터 검증'], tags: ['JWT', '보안', '3M', '2단계']
  },
  {
    id: 'AC-039', category: '필수 CS', project: '공통', topic: 'Docker·VM', stage: '2. 기초 개념', difficulty: '기초', priority: '높음', minutes: 6,
    question: 'Docker 컨테이너와 가상 머신의 차이를 설명해 주세요.',
    answer: {
      compact: {
        conclusion: 'VM은 Guest OS를 포함하고 컨테이너는 호스트 커널을 공유하며 프로세스를 격리합니다.',
        evidence1: '컨테이너는 이미지로 실행 환경을 재현하고 빠르게 시작하지만 호스트 커널에 의존합니다.',
        evidence2: 'FeedShop은 Docker 이미지로 배포하고 3M은 Compose로 통합 실행 환경을 구성했습니다.'
      },
      conclusion: '가상 머신은 하이퍼바이저 위에 각자 Guest OS를 포함하고, 컨테이너는 호스트 커널을 공유하면서 namespace와 cgroup으로 프로세스를 격리합니다.',
      evidence1: '컨테이너는 이미지 기반으로 실행 환경을 재현하고 시작이 가벼운 장점이 있지만 VM보다 격리 경계가 다르고 호스트 커널 의존이 있습니다.',
      evidence2: '프로젝트에서는 FeedShop 배포 이미지와 3M Compose 통합 환경에 Docker를 사용했지만 컨테이너 자체가 배포 무중단이나 고가용성을 보장하지는 않습니다.',
      keywords: ['Container', 'VM', 'namespace', 'cgroup', 'image'], caution: '컨테이너를 가벼운 VM이라고만 설명하지 않는다.'
    },
    followups: [
      { type: '사실 확인', question: '이미지와 컨테이너 차이는 무엇인가요?', defense: '이미지는 불변 실행 템플릿, 컨테이너는 이미지로 생성된 실행 인스턴스라고 답한다.' },
      { type: '선택 압박', question: 'Docker 없이도 jar를 실행할 수 있는데 왜 사용했나요?', defense: '런타임·의존 설정을 이미지로 고정하고 로컬·배포 환경 차이를 줄이기 위해 사용했다고 답한다.' },
      { type: '장애·대안', question: '컨테이너 데이터가 사라지면요?', defense: '상태는 volume이나 외부 DB로 분리하고 컨테이너 파일시스템을 영구 저장소로 가정하지 않는다고 답한다.' }
    ],
    evidence: { status: '문서 근거', note: 'Docker 사용은 이력서에 있고 VM 비교는 일반 개념이다.', sources: ['v5_3 이력서 p.1-2', '3M 프로젝트 포트폴리오'] },
    warnings: ['Kubernetes 운영 경험으로 확대하지 않는다.'], resumeClaims: ['GCP Cloud Run·Docker 배포', 'Docker Compose'], tags: ['Docker', 'VM', 'Infra', '2단계']
  },
  {
    id: 'AC-040', category: '필수 CS', project: 'FeedShop', topic: 'CI·CD', stage: '4. 구현 흐름', difficulty: '중급', priority: '높음', minutes: 6,
    question: 'CI와 CD의 차이와 FeedShop 파이프라인에서 맡은 역할을 설명해 주세요.',
    answer: {
      compact: {
        conclusion: 'CI는 변경 검증을 자동화하고 CD는 검증된 결과물을 배포 가능한 상태나 실제 환경으로 전달합니다.',
        evidence1: 'GitHub Actions와 SonarCloud로 빌드·품질 검증을 묶어 변경 검증 흐름을 자동화했습니다.',
        evidence2: 'Docker 이미지를 Cloud Run에 전달하도록 구성해 검증 결과와 배포 경로의 일관성을 확보했습니다.'
      },
      conclusion: 'CI는 변경을 자주 통합하며 빌드·테스트·품질 검사를 자동화하는 과정이고, CD는 검증된 결과물을 배포 가능한 상태로 만들거나 실제 환경에 배포하는 과정입니다.',
      evidence1: 'FeedShop에서 GitHub Actions 기반 CI/CD와 SonarCloud 코드 품질 검증 파이프라인을 구축하고 Docker 이미지로 Cloud Run 배포 흐름을 구성했습니다.',
      evidence2: '다만 정확한 trigger, 승인 단계, rollback, 무중단 방식은 워크플로 파일에서 확인된 범위만 답해야 합니다.',
      keywords: ['CI', 'Continuous Delivery', 'Continuous Deployment', 'GitHub Actions', 'SonarCloud'], caution: 'Delivery와 Deployment를 구분하고 전체 배포가 완전 자동이었다고 추정하지 않는다.'
    },
    followups: [
      { type: '사실 확인', question: '워크플로의 실제 단계와 trigger는 무엇이었나요?', defense: 'YAML에서 확인된 event와 build·test·quality·image·deploy 단계만 답한다.' },
      { type: '선택 압박', question: '테스트가 부족한데 자동 배포가 더 위험하지 않나요?', defense: '맞으며 자동화 속도보다 필수 검증과 승인·롤백 기준이 먼저라고 답한다.' },
      { type: '장애·대안', question: '배포 후 오류가 나면 어떻게 되돌리나요?', defense: 'Cloud Run revision rollback 등 가능한 방식을 설명하되 실제 자동 롤백 구현 여부는 확인이 필요하다고 답한다.' }
    ],
    evidence: { status: '확인됨', note: 'GitHub Actions·SonarCloud·Cloud Run 배포 구성은 프로젝트 근거에 확인됐다.', sources: ['v5_3 이력서 p.1', 'FeedShop GitHub Actions 워크플로'] },
    warnings: ['무중단·자동 롤백·승인 게이트는 확인 전 구현했다고 말하지 않는다.'], resumeClaims: ['GitHub Actions CI/CD 구축', 'SonarCloud 품질 검증', 'Cloud Run·Docker 배포'], tags: ['CI/CD', 'GitHubActions', 'FeedShop', '4단계']
  },
  {
    id: 'AC-041', category: '필수 CS', project: '학습 경험', topic: 'Kafka Choreography', stage: '2. 기초 개념', difficulty: '심화', priority: '보통', minutes: 7,
    question: '분산 트랜잭션에서 Choreography 방식은 무엇이고 Orchestration과 어떻게 다른가요?',
    answer: {
      compact: {
        conclusion: 'Choreography는 서비스가 이벤트로 자율 협력하고 Orchestration은 중앙 조정자가 흐름을 지시합니다.',
        evidence1: 'Choreography는 중앙 결합을 줄이지만 전체 흐름 추적과 실패 보상이 복잡해질 수 있습니다.',
        evidence2: 'Orchestration은 흐름과 상태를 한곳에서 보기 쉽지만 중앙 조정자 의존과 병목 위험이 생깁니다.'
      },
      conclusion: 'Choreography는 각 서비스가 이벤트를 발행·구독해 다음 동작을 자율적으로 이어가고, Orchestration은 중앙 조정자가 단계와 보상을 지시하는 방식입니다.',
      evidence1: 'Choreography는 중앙 결합을 줄이고 확장하기 쉽지만 전체 흐름 추적과 순환 이벤트·실패 보상이 복잡해질 수 있습니다.',
      evidence2: 'Orchestration은 흐름과 상태를 한곳에서 보기 쉽지만 조정자 의존과 병목 위험이 생깁니다. 본인은 교육 과정에서 Choreography 기반 분산 트랜잭션을 발표했습니다.',
      keywords: ['Choreography', 'Orchestration', '이벤트', '보상 트랜잭션', 'Saga'], caution: '발표·학습 경험을 대규모 Kafka 운영 경험으로 말하지 않는다.'
    },
    followups: [
      { type: '사실 확인', question: '직접 구현한 이벤트 흐름은 무엇이었나요?', defense: '보호된 Kafka 근거 문서에서 확인된 주문·결제 흐름만 답하고 미구현 항목을 제외한다.' },
      { type: '선택 압박', question: '흐름이 복잡하면 Choreography를 왜 쓰나요?', defense: '서비스 자율성과 느슨한 결합이 필요한 경우 선택하되 관측·이벤트 계약·보상 설계를 함께 마련한다고 답한다.' },
      { type: '장애·대안', question: '소비자가 실패하면 전체 트랜잭션은 어떻게 되나요?', defense: '재시도·멱등성·보상 이벤트가 필요하지만 구체 전략은 구현 여부를 구분한다고 답한다.' }
    ],
    evidence: { status: '문서 근거', note: '교육·발표와 일부 이벤트 흐름 근거는 있으나 운영 성과는 아니다.', sources: ['v5_3 이력서 p.3', 'Kafka 주문·결제 이벤트 흐름 근거 문서'] },
    warnings: ['대규모 운영·정확히 한 번 처리·무손실 경험으로 포장하지 않는다.'], resumeClaims: ['Kafka·Redis 이벤트 기반 처리 학습', 'Choreography 기반 분산 트랜잭션 기술 발표'], tags: ['Kafka', 'Choreography', 'Saga', '2단계']
  },
  {
    id: 'AC-042', category: '필수 CS', project: '학습 경험', topic: 'Outbox·DLQ', stage: '7. 대안·확장', difficulty: '심화', priority: '보통', minutes: 8,
    question: 'DB 저장과 Kafka 발행의 원자성 문제를 Outbox와 DLQ로 어떻게 보완하나요?',
    answer: {
      compact: {
        conclusion: 'Outbox는 DB 변경과 이벤트 기록을 같은 트랜잭션에 저장하고 DLQ는 반복 실패 메시지를 격리합니다.',
        evidence1: '별도 relay가 Outbox를 발행하므로 eventId 기반 멱등 처리와 재시도 관측이 필요합니다.',
        evidence2: 'DLQ는 자동 복구가 아니므로 원인을 수정한 뒤 순서·보존 정책에 맞춰 재처리해야 합니다.'
      },
      conclusion: 'Outbox는 비즈니스 데이터와 발행할 이벤트를 같은 DB 트랜잭션에 저장해 DB commit과 이벤트 기록 사이의 간극을 줄이고, 별도 relay가 브로커로 전달하는 패턴입니다.',
      evidence1: 'relay의 중복 발행 가능성 때문에 eventId 기반 멱등 소비가 필요하고, 전송 상태·재시도·오래된 레코드 정리와 지연 관측을 운영해야 합니다.',
      evidence2: 'DLQ는 반복 실패 메시지를 격리해 정상 흐름을 보호하지만 자동 복구가 아니며 원인 수정, 재처리 순서, 개인정보와 보존 정책이 필요합니다.',
      keywords: ['Transactional Outbox', 'relay', '멱등성', 'DLQ', '재처리'], caution: 'Outbox·DLQ·재시도를 프로젝트에 구현했거나 이벤트 유실 0을 보장했다고 말하지 않는다.'
    },
    followups: [
      { type: '사실 확인', question: '본인 프로젝트에 Outbox나 DLQ를 구현했나요?', defense: '확인된 근거상 구현 성과가 아니며 학습한 대안이라고 명확히 답한다.' },
      { type: '선택 압박', question: 'Kafka 트랜잭션을 쓰면 Outbox가 필요 없지 않나요?', defense: 'Kafka 내부 원자성과 DB+Kafka 원자성은 다른 문제이며 자원 경계를 함께 묶지 못한다고 답한다.' },
      { type: '장애·대안', question: 'Outbox relay가 중단되면요?', defense: 'DB에 이벤트가 남아 재개 후 전달할 수 있지만 backlog 지연·중복·순서와 모니터링을 관리해야 한다고 답한다.' }
    ],
    evidence: { status: '일반론', note: 'Outbox·DLQ는 미구현 대안으로만 정리했다.', sources: ['Kafka 주문·결제 이벤트 흐름 근거 문서', '추가질문답변'] },
    warnings: ['Outbox·DLQ 미구현.', 'DB+Kafka 원자성 미보장.', '이벤트 무손실 성과 주장 금지.'], resumeClaims: ['Kafka 이벤트 기반 처리 학습', 'Choreography 기술 발표'], tags: ['Kafka', 'Outbox', 'DLQ', '7단계', '일반론']
  }
];
