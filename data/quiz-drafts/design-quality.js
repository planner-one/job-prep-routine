// architecture-design, test-security 전용 정적 초안입니다.
// 각 quote는 고정 로컬 Markdown에서 정확히 대조했으며, 최종 출제 파일은 아닙니다.
const COMMIT = 'd00877afb0a302072078d34ded66b3b69143a5ca';

function item({ sourceId, categoryId, sourceHeading = '본문', main, follow }) {
  const mainId = `quiz-${sourceId}-main`;
  const common = {
    version: 1,
    categoryId,
    sourceId,
    sourceCommit: COMMIT,
    reviewStatus: 'verified',
    provenance: Object.freeze({ author: 'codex-curated', review: 'pending-independent-audit' }),
  };
  return Object.freeze([
    Object.freeze({
      ...common, id: mainId, kind: 'main', followUpOf: null,
      sourceHeading: main.heading ?? sourceHeading,
      question: `${sourceId} 원문에 따르면, 다음 중 맞는 설명은 무엇인가요?`,
      choices: Object.freeze([main.answer, ...main.wrongs]), correctIndex: 0,
      explanation: `원문은 ${main.answer}라고 설명합니다.`, evidenceQuote: main.quote,
    }),
    Object.freeze({
      ...common, id: `quiz-${sourceId}-follow-up`, kind: 'follow-up', followUpOf: mainId,
      sourceHeading: follow.heading ?? sourceHeading,
      question: `${sourceId}의 핵심 개념을 한 단계 더 적용해 판단할 때 원문과 일치하는 설명은 무엇인가요?`,
      choices: Object.freeze([follow.answer, ...follow.wrongs]), correctIndex: 0,
      explanation: `원문 근거는 ${follow.answer}입니다.`, evidenceQuote: follow.quote,
    }),
  ]);
}

const SPECS = Object.freeze([
  {
    sourceId: 'be-49', categoryId: 'architecture-design',
    main: { answer: 'Record는 기본적으로 불변성을 가진 특별한 유형의 클래스다.', wrongs: ['Record의 필드는 생성 뒤 자유롭게 변경할 수 있다.', 'Record는 자동 생성 메서드를 제공하지 않는다.', 'Record는 Java 16에서만 인터페이스로 사용된다.'], quote: 'Record는 Java 16에서 정식 출시된 특별한 유형의 클래스로 **불변성(Immutable)** 을 기본으로 합니다.' },
    follow: { answer: '모든 Record 객체가 DTO인 것은 아니며 값 객체 등으로도 쓸 수 있다.', wrongs: ['Record로 만든 객체는 DTO로만 사용할 수 있다.', 'DTO는 도메인 모델의 비즈니스 규칙을 표현하는 객체다.', 'VO는 계층 간 데이터 전송만을 목적으로 한다.'], quote: '모든 Record 객체가 DTO인 것은 아닙니다. Record는 단순히 데이터를 캡슐화하는 역할을 하는데, DTO 외에도 값 객체(Value Objects) 등의 다양한 용도로 사용될 수 있습니다.', heading: '그럼 Record로 생성한 모든 객체는 DTO인가요?' },
  },
  {
    sourceId: 'be-51', categoryId: 'architecture-design',
    main: { answer: '단일 책임 원칙은 클래스가 한 가지 변화의 이유만 가져야 한다고 본다.', wrongs: ['단일 책임 원칙은 클래스에 메서드가 하나만 있어야 한다고 본다.', '단일 책임 원칙은 모든 변경을 한 클래스에 모으라고 한다.', '단일 책임 원칙은 하위 모듈에 직접 의존하라고 한다.'], quote: '즉, 클래스는 한 가지 변화의 이유만 가져야 하며, 이를 통해 변경이 발생했을 때 다른 기능에 영향을 덜 미치도록 설계됩니다.' },
    follow: { answer: '의존성 역전 원칙은 상위·하위 수준 모듈 모두 추상화에 의존해야 한다고 강조한다.', wrongs: ['의존성 역전 원칙은 상위 모듈이 하위 모듈 구현에 의존하라고 한다.', '의존성 역전 원칙은 추상화 없이 구체 타입만 사용하라고 한다.', '의존성 역전 원칙은 인터페이스를 클라이언트와 무관하게 크게 만들라고 한다.'], quote: '**의존성 역전 원칙(Dependency Inversion Principle)** 은 상위 수준의 모듈은 하위 수준의 모듈에 의존해서는 안 되며, 모두 추상화에 의존해야 함을 강조합니다.' },
  },
  {
    sourceId: 'be-65', categoryId: 'architecture-design',
    main: { answer: '좋은 설계는 일반적으로 높은 응집도와 낮은 결합도를 가진다.', wrongs: ['좋은 설계는 낮은 응집도와 높은 결합도를 가진다.', '응집도와 결합도는 변경과 관계가 없다.', '결합도는 모듈 내부 요소들의 연관 정도를 뜻한다.'], quote: '일반적으로 좋은 설계란 높은 응집도와 낮은 결합도를 가진 모듈로 구성된 설계를 의미합니다.' },
    follow: { answer: '캡슐화를 지키면 모듈 안의 응집도는 높아지고 모듈 사이 결합도는 낮아진다.', wrongs: ['캡슐화는 모듈 사이 결합도를 높이는 방법이다.', '캡슐화는 객체 내부 세부 사항을 외부에 모두 공개하는 것이다.', '캡슐화를 약화하면 변경이 클라이언트에 전파되지 않는다.'], quote: '캡슐화를 지키면, 모듈 안의 응집도는 높아지고 모듈 사이의 결합도는 낮아집니다.' },
  },
  {
    sourceId: 'be-87', categoryId: 'architecture-design',
    main: { answer: '전략 패턴은 전략 구현을 바꿔 객체의 행위를 변경하는 패턴이다.', wrongs: ['전략 패턴은 객체의 행위를 바꾸려면 항상 원본 코드를 직접 수정한다.', '전략 패턴은 모든 행위를 하나의 구체 클래스에 고정한다.', '전략 패턴은 객체의 상태를 외부에 노출하는 패턴이다.'], quote: '**전략 패턴(Strategy Pattern)** 은 객체의 행위를 동적으로 변경하고 싶은 경우, 코드를 직접 수정하는 것이 아닌 추상화된 전략의 구현만을 바꿔 객체의 행위를 변경하는 디자인 패턴입니다.' },
    follow: { answer: '전략 패턴의 대표 형태는 인터페이스 구현체들을 주입하는 것이다.', wrongs: ['전략 패턴은 인터페이스 없이 단일 구현체만 사용한다.', '전략 패턴은 구현체가 아닌 데이터베이스 테이블을 주입한다.', '전략 패턴은 외부 주입 없이 전략을 변경할 수 없게 만든다.'], quote: '객체의 행위를 Interface로 정의하고, Interface의 메서드를 구현하는 구현체들을 주입하는 것이 전략 패턴의 대표적인 형태입니다.' },
  },
  {
    sourceId: 'be-128', categoryId: 'architecture-design',
    main: { answer: '객체 지향 프로그래밍은 상태와 행위를 가진 객체 중심의 패러다임이다.', wrongs: ['객체 지향 프로그래밍은 상태 없이 함수만으로 구성된다.', '객체 지향 프로그래밍은 객체 사이 협력을 사용하지 않는다.', '객체 지향 프로그래밍의 특징에는 캡슐화가 없다.'], quote: '**객체 지향 프로그래밍(OOP, Object-Oriented Programming)** 은 상태(필드)와 행위(메서드)를 가진 객체를 중심으로 프로그램을 설계하는 프로그래밍 패러다임입니다.' },
    follow: { answer: 'TDA 원칙은 객체의 데이터를 직접 요청하기보다 필요한 동작을 메시지로 보내라고 말한다.', wrongs: ['TDA 원칙은 객체의 getter와 setter로 데이터를 꺼내 처리하라고 말한다.', 'TDA 원칙은 객체가 아닌 외부 코드가 상태 변경을 전담하라고 말한다.', 'TDA 원칙은 응집도를 낮추고 결합도를 높이는 원칙이다.'], quote: '**TDA(Tell Don\'t Ask)** 원칙은 객체의 데이터를 직접 요청하지 말고, 객체에게 필요한 동작을 수행하도록 메시지를 보내라는 원칙입니다.', heading: 'TDA 원칙을 알고 계신가요?' },
  },
  {
    sourceId: 'be-129', categoryId: 'architecture-design',
    main: { answer: '널 오브젝트 패턴은 널 대신 아무 일도 하지 않는 객체를 전달하는 기법이다.', wrongs: ['널 오브젝트 패턴은 널을 발견하면 항상 예외만 던지는 기법이다.', '널 오브젝트 패턴은 실제 객체를 널 참조로 교체하는 기법이다.', '널 오브젝트 패턴은 널인 경우에만 예외 없이 사용할 수 있다.'], quote: '**널 오브젝트 패턴(Null Object Pattern)** 이란 객체가 존재하지 않을 때, 널을 전달하는 것이 아닌 아무 일도 하지 않는 객체를 전달하는 기법입니다.' },
    follow: { answer: '널 오브젝트 패턴은 반복 널 체크를 간소화하지만 예외 탐지를 어렵게 할 수 있다.', wrongs: ['널 오브젝트 패턴은 예외를 언제나 더 쉽게 탐지하게 한다.', '널 오브젝트 패턴은 협력 재사용을 어렵게 만든다.', '널 오브젝트 패턴은 객체가 널일 때만 절대 사용할 수 있다.'], quote: '널 오브젝트 패턴은 반복적인 널 체크 코드를 간소화하고 협력을 재사용하는데 용이하다는 장점이 있지만, 오히려 예외를 탐지하기 어려운 상황을 만들 수 있습니다.' },
  },
  {
    sourceId: 'be-132', categoryId: 'architecture-design',
    main: { answer: 'Gradle은 JVM 언어에서 자주 쓰이는 빌드 자동화 도구다.', wrongs: ['Gradle은 JVM과 무관한 데이터베이스 관리 도구다.', 'Gradle은 빌드 자동화 대신 운영체제만 설치한다.', 'Gradle은 Java 언어에서 사용할 수 없다.'], quote: '**Gradle**은 Java, Kotlin, Scala 등 JVM에서 실행되는 언어에서 자주 사용되는 빌드 자동화 도구입니다.' },
    follow: { answer: 'runtimeOnly는 런타임 시점에만 필요한 의존성 설정이다.', wrongs: ['runtimeOnly는 컴파일 시점에만 필요한 의존성 설정이다.', 'runtimeOnly는 다른 모듈에도 항상 노출되는 의존성 설정이다.', 'runtimeOnly는 테스트 코드에서만 쓰는 의존성 설정이다.'], quote: '**runtimeOnly**는 런타임 시점에만 필요한 의존성입니다.', heading: 'Dependency Configuration이 무엇이고 어떤 종류가 있을까요?' },
  },
  {
    sourceId: 'be-137', categoryId: 'architecture-design',
    main: { answer: '템플릿 메서드 패턴은 기능의 뼈대와 구현을 분리하는 행위 디자인 패턴이다.', wrongs: ['템플릿 메서드 패턴은 기능의 뼈대와 구현을 같은 하위 클래스에만 둔다.', '템플릿 메서드 패턴은 상위 클래스 없이 실행 단계를 결정한다.', '템플릿 메서드 패턴은 데이터베이스 쿼리 최적화 패턴이다.'], quote: '**템플릿 메서드 패턴(Template Method Pattern)** 은 기능의 뼈대와 구현을 분리하는 행위 디자인 패턴입니다.' },
    follow: { answer: '템플릿 메서드 패턴은 공통 로직을 상위 클래스에 모아 중복 코드를 줄일 수 있다.', wrongs: ['템플릿 메서드 패턴은 공통 로직을 모든 하위 클래스에 반복한다.', '템플릿 메서드 패턴은 상위 클래스 수정이 하위 클래스와 무관하다.', '템플릿 메서드 패턴은 코드 재사용성을 낮추는 것이 장점이다.'], quote: '템플릿 메서드 패턴은 공통 로직을 상위 클래스에 모아 중복 코드를 줄일 수 있으며, 코드의 재사용성을 높일 수 있다는 장점이 있습니다.' },
  },
  {
    sourceId: 'be-150', categoryId: 'architecture-design',
    main: { answer: '싱글턴 패턴은 생성자를 여러 번 호출해도 실제 객체 하나를 유지한다.', wrongs: ['싱글턴 패턴은 생성자 호출마다 새 객체를 만든다.', '싱글턴 패턴은 객체 생성을 전혀 허용하지 않는다.', '싱글턴 패턴은 객체마다 서로 다른 인스턴스를 반환한다.'], quote: '**싱글턴 패턴(Singleton Pattern)** 이란 생성자를 여러 차례 호출해도 실제로 생성되는 객체를 하나로 유지하는 것을 의미합니다.' },
    follow: { answer: '싱글턴은 전역 객체 특성 때문에 테스트하기 어려운 코드를 만들 수 있다.', wrongs: ['싱글턴은 전역 객체여도 항상 테스트 대역으로 쉽게 교체된다.', '싱글턴은 상태 초기화 없이도 테스트 간 영향을 주지 않는다.', '싱글턴은 코드 복잡도를 반드시 낮추기만 한다.'], quote: '하지만, 싱글턴은 전역 객체를 생성한다는 특성상 코드의 복잡도를 높이고, 테스트하기 어려운 코드를 만들 수 있는 단점이 있습니다.', heading: '싱글턴 패턴의 장단점은 무엇인가요?' },
  },
  {
    sourceId: 'be-25', categoryId: 'test-security',
    main: { answer: '로그는 서버 상태와 동작 정보를 시간 경과에 따라 기록한 결과다.', wrongs: ['로그는 시스템 성능에 대한 통계 정보만 뜻한다.', '로그는 서버가 멈춘 뒤에만 기록된다.', '로그는 CPU 사용량만으로 구성된다.'], quote: '로그는 서버가 동작할 때 서버의 상태와 동작 정보를 시간 경과에 따라 기록된 결과입니다.' },
    follow: { answer: 'System.out.println은 로그 레벨 설정과 환경별 필터링을 적용하기 까다롭다.', wrongs: ['System.out.println은 로그 레벨을 세밀하게 설정하기 쉽다.', 'System.out.println은 환경별 로그 필터링을 기본 제공한다.', 'System.out.println은 로그 출력 대기 시간이 전혀 없다.'], quote: '하지만, System.out.println은 로그 레벨 설정과 환경 별 필터링을 적용하기 까다롭습니다.', heading: 'System.out.println을 사용하면 로깅 프레임워크는 사용하지 않아도 되지 않나요?' },
  },
  {
    sourceId: 'be-34', categoryId: 'test-security',
    main: { answer: '단위 테스트는 개별 메서드나 함수의 기능을 검증하는 테스트다.', wrongs: ['단위 테스트는 실제 데이터베이스와 네트워크 통합만 검증한다.', '단위 테스트는 여러 모듈의 상호작용만 검증한다.', '단위 테스트는 항상 느리게 실행되어야 한다.'], quote: '단위 테스트는 소프트웨어의 가장 작은 단위, 즉 개별 메서드나 함수의 기능을 검증하는 테스트입니다.' },
    follow: { answer: '슬라이스 테스트는 특정 레이어에 대한 테스트다.', wrongs: ['슬라이스 테스트는 모든 스프링 컴포넌트를 반드시 로드한다.', '슬라이스 테스트는 데이터베이스 전체를 복제하는 테스트다.', '슬라이스 테스트는 특정 계층과 무관하게 실행한다.'], quote: '슬라이스 테스트는 특정 레이어(ex. controller, service, repository)에 대한 테스트입니다.', heading: '슬라이스 테스트는 무엇인가요?' },
  },
  {
    sourceId: 'be-76', categoryId: 'test-security',
    main: { answer: 'TDD는 매우 짧은 개발 사이클을 반복하는 소프트웨어 개발 프로세스다.', wrongs: ['TDD는 테스트 없이 구현만 먼저 완료하는 프로세스다.', 'TDD는 긴 개발 사이클을 한 번만 수행하는 프로세스다.', 'TDD는 리팩터링을 하지 않는 프로세스다.'], quote: '**테스트 주도 개발(Test Driven Development)** 은 매우 짧은 개발 사이클을 반복하는 소프트웨어 개발 프로세스입니다.' },
    follow: { answer: 'TDD에서는 실패하는 테스트를 통과하기 위한 최소한의 코드를 작성한다.', wrongs: ['TDD에서는 실패하는 테스트가 없어도 먼저 많은 코드를 작성한다.', 'TDD에서는 테스트를 통과시키기 위해 항상 가장 복잡한 코드를 작성한다.', 'TDD에서는 테스트를 점점 일반화하지 않는다.'], quote: '실패하는 테스트를 통과하기 위해서는 최소한의 코드를 작성해야 합니다.' },
  },
  {
    sourceId: 'be-77', categoryId: 'test-security',
    main: { answer: '암복호화 키가 같으면 대칭키 암호화다.', wrongs: ['암복호화 키가 다르면 대칭키 암호화다.', '대칭키 암호화는 공개키와 개인키를 반드시 함께 쓴다.', '대칭키 암호화는 키를 전혀 사용하지 않는다.'], quote: '암복호화에 사용하는 키가 동일한 경우 **대칭키 암호화(Symmetric Key Cryptography)** 라고 하며' },
    follow: { answer: '비대칭키 방식에서 일반적으로 송신자는 수신자의 공개키로 암호화하고 수신자는 개인키로 복호화한다.', wrongs: ['비대칭키 방식에서 송신자는 수신자의 개인키로 암호화한다.', '비대칭키 방식에서 수신자는 공개키로만 복호화한다.', '비대칭키 방식은 대칭키보다 항상 빠르다.'], quote: '일반적으로 이 방식에서 송신자는 수신자의 공개키를 이용해 암호화를 수행하고, 암호화된 데이터는 수신자에게 전달됩니다. 수신자에게 전달된 이후, 수신자는 개인키를 사용해 복호화를 수행합니다.' },
  },
  {
    sourceId: 'be-82', categoryId: 'test-security',
    main: { answer: 'CSRF는 사용자가 의도하지 않은 행위를 특정 웹사이트에 요청하게 하는 공격이다.', wrongs: ['CSRF는 사용자가 직접 의도한 요청만 보내게 하는 공격이다.', 'CSRF는 서버의 SQL 구문만 조작하는 공격이다.', 'CSRF는 쿠키와 무관하게 발생하는 공격이다.'], quote: '**사이트 간 요청 위조(Cross-site Request Forgery, CSRF) 공격**은 사용자가 자신의 의지와 상관없이 공격자가 의도한 행위를 특정 웹사이트에 요청하도록 하는 것을 의미합니다.' },
    follow: { answer: 'CSRF 토큰은 요청의 토큰과 사용자 세션 토큰의 일치 여부를 판단해 방어할 수 있다.', wrongs: ['CSRF 토큰은 요청마다 세션과 비교하지 않고 항상 통과시킨다.', 'CSRF 토큰은 Referer 헤더를 반드시 제거하는 방식이다.', 'CSRF 토큰은 쿠키를 모든 교차 출처에 강제로 전송한다.'], quote: '실제로 요청이 전달될 때, 해당 input 태그의 CSRF 토큰과 사용자 세션 내부에 존재하는 CSRF 토큰의 일치 여부를 판단하여, CSRF 공격에 대해 방어할 수 있습니다.', heading: 'CSRF 공격은 어떻게 방어할 수 있나요?' },
  },
  {
    sourceId: 'be-84', categoryId: 'test-security',
    main: { answer: 'JWT는 토큰 자체에 정보를 포함한 클레임 기반 토큰이다.', wrongs: ['JWT는 서버 세션에만 정보를 두는 토큰이다.', 'JWT는 헤더와 페이로드 없이 시그니처만 가진다.', 'JWT는 인증과 인가 구현에 사용할 수 없다.'], quote: 'JWT는 토큰 자체에 정보가 포함되어 있는 클레임 기반 토큰입니다.' },
    follow: { answer: 'JWT 페이로드는 Base64 디코딩이 쉬우므로 민감한 정보에 유의해야 한다.', wrongs: ['JWT 페이로드는 디코딩할 수 없으므로 민감 정보를 자유롭게 담아도 된다.', 'JWT는 시크릿 키가 유출되어도 안전하다.', 'JWT는 탈취와 none 알고리즘 공격을 고려할 필요가 없다.'], quote: 'JWT는 디코딩이 쉽습니다. Base64로 디코딩하면 페이로드를 확인할 수 있습니다. 따라서, 민감한 정보를 담는 것에 유의해야 합니다.' },
  },
  {
    sourceId: 'be-90', categoryId: 'test-security',
    main: { answer: '코드 커버리지는 테스트가 프로덕션 코드를 실행한 정도를 나타낸다.', wrongs: ['코드 커버리지는 테스트 코드의 줄 수만 나타낸다.', '코드 커버리지는 데이터베이스 용량을 나타낸다.', '코드 커버리지는 프로덕션 코드를 실행한 정도와 무관하다.'], quote: '테스트 케이스들이 프로덕션 코드를 실행한 정도를 나타낸 것을 **코드 커버리지(Code Coverage)** 라고 합니다.' },
    follow: { answer: '높은 커버리지가 모든 버그를 찾아낸다는 뜻은 아니다.', wrongs: ['높은 커버리지는 모든 버그가 반드시 없다는 증명이다.', '커버리지가 높으면 예외와 경계 조건은 테스트하지 않아도 된다.', '커버리지 측정은 테스트 케이스 품질과 무관하다.'], quote: '또한, 커버리지가 높다고 해서 모든 버그를 찾아낼 수 있는 것은 아닙니다.', heading: '커버리지가 높다고 무조건 좋을까요?' },
  },
  {
    sourceId: 'be-97', categoryId: 'test-security',
    main: { answer: '테스트 더블은 실제 의존성을 쓰기 어려울 때 사용할 수 있다.', wrongs: ['테스트 더블은 실제 의존성을 항상 그대로 사용한다.', '테스트 더블은 외부 세계 부수 효과를 반드시 늘린다.', '테스트 더블은 복잡한 외부 설정을 더 많이 요구한다.'], quote: '테스트 코드에서 실제 의존성을 사용하기 어려운 경우, **테스트 더블(Test Double)** 을 사용할 수 있습니다.' },
    follow: { answer: '스파이는 호출 내역을 기록해 테스트 결과 검증에 주로 사용한다.', wrongs: ['스파이는 아무 동작도 하지 않는 더미 객체다.', '스파이는 제품에 적합한 실제 구현을 제공하는 페이크다.', '스파이는 기대 상호작용을 검증해 예외를 내는 목 객체다.'], quote: '**스파이(Spy)** 는 호출된 내역을 기록합니다. 기록한 내용은 테스트 결과를 검증할 때 주로 사용되며, 스텁의 일종이기도 합니다.', heading: '테스트 더블의 종류에는 무엇이 있나요?' },
  },
  {
    sourceId: 'be-105', categoryId: 'test-security', sourceHeading: 'Micrometer란 무엇이며, 왜 사용하나요?',
    main: { answer: 'Micrometer는 벤더 중립적인 메트릭 계측 라이브러리다.', wrongs: ['Micrometer는 특정 데이터베이스 전용 쿼리 라이브러리다.', 'Micrometer는 메트릭 대신 소스 코드만 수집한다.', 'Micrometer는 HTTP 요청 지표를 수집할 수 없다.'], quote: 'Micrometer는 벤더 중립적인 메트릭 계측 라이브러리로, 애플리케이션에서 발생하는 다양한 지표(예: CPU 사용량, 메모리 소비, HTTP 요청 및 커스텀 이벤트)를 수집합니다.' },
    follow: { answer: 'Micrometer는 여러 모니터링 시스템에 메트릭을 전송하는 일관된 API를 제공한다.', wrongs: ['Micrometer는 하나의 모니터링 시스템에만 메트릭을 보낼 수 있다.', 'Micrometer는 백엔드 클라이언트 세부 구현을 반드시 노출한다.', 'Micrometer는 Prometheus와 같은 시스템에 메트릭을 전송할 수 없다.'], quote: '이 라이브러리는 Prometheus, Datadog, Graphite 등 여러 모니터링 시스템에 메트릭을 전송할 수 있도록 단순하고 일관된 API(파사드)를 제공하여, 각 백엔드 클라이언트의 복잡한 세부 구현을 감춥니다.' },
  },
  {
    sourceId: 'be-139', categoryId: 'test-security',
    main: { answer: '테스트 격리는 각 테스트가 서로 독립적으로 실행되도록 보장하는 것이다.', wrongs: ['테스트 격리는 테스트가 이전 테스트의 상태를 공유하도록 보장한다.', '테스트 격리는 실행 순서에 따라 결과가 달라지게 한다.', '테스트 격리는 데이터베이스를 공유해야만 달성된다.'], quote: '**테스트 격리(Test Isolation)** 는 각 테스트가 서로 독립적으로 실행되도록 보장하는 것을 말합니다.' },
    follow: { answer: '테스트 격리가 안 되면 같은 테스트가 매번 같은 결과를 내지 않는 비결정적 테스트가 생길 수 있다.', wrongs: ['테스트 격리가 안 되어도 테스트 결과는 항상 예측 가능하다.', '비결정적 테스트는 실패 원인을 쉽게 판단하게 한다.', '공유 자원 의존은 테스트 실행 순서와 무관하다.'], quote: '테스트 격리가 중요한 이유는 격리가 제대로 이루어지지 않으면 비결정적 테스트가 발생할 수 있기 때문입니다.' },
  },
  {
    sourceId: 'be-140', categoryId: 'test-security',
    main: { answer: 'SQL 인젝션은 사용자 입력이 SQL 쿼리에 안전하게 처리되지 않을 때 생기는 취약점이다.', wrongs: ['SQL 인젝션은 사용자 입력을 안전하게 바인딩할 때 발생한다.', 'SQL 인젝션은 SQL 쿼리와 무관한 화면 렌더링 취약점이다.', 'SQL 인젝션은 인증 우회나 데이터 조작을 일으킬 수 없다.'], quote: '**SQL 인젝션(SQL Injection)** 은 웹 애플리케이션에서 사용자의 입력값이 SQL 쿼리에 안전하게 처리되지 않을 때 발생하는 보안 취약점입니다.' },
    follow: { answer: 'PreparedStatement는 placeholder에 값을 바인딩하고 내부 이스케이프 처리해 SQL 인젝션을 막을 수 있다.', wrongs: ['PreparedStatement는 사용자 입력을 SQL 문자열에 직접 이어 붙인다.', 'PreparedStatement는 placeholder 값을 바인딩하지 않는다.', 'PreparedStatement는 SQL 오류를 사용자에게 반드시 노출한다.'], quote: 'PreparedStatement를 사용하면 place holder(`?`)에 값을 바인딩하고 내부적으로 이스케이프 처리하기 때문에 SQL 인젝션을 방지할 수 있습니다.', heading: 'SQL 인젝션을 방지하는 방법은 무엇인가요?' },
  },
]);

export const DESIGN_QUALITY_QUIZ_DRAFT = Object.freeze(SPECS.flatMap(item));
export const DESIGN_QUALITY_DRAFT_SOURCE_IDS = Object.freeze(SPECS.map(({ sourceId }) => sourceId));
