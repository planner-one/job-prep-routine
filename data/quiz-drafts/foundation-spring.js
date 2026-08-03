// Spring Application 독립 초안. 최종 병합 단계에서 sourceHeading을 원문에서 추출한다.
const COMMIT = 'd00877afb0a302072078d34ded66b3b69143a5ca';
const CATEGORY = 'spring-application';

function question(sourceId, kind, entry) {
  const mainId = `quiz-${sourceId}-main`;
  return Object.freeze({
    version: 1,
    id: kind === 'main' ? mainId : `quiz-${sourceId}-follow-up`,
    kind,
    followUpOf: kind === 'main' ? null : mainId,
    question: entry.question,
    choices: Object.freeze(entry.choices),
    correctIndex: entry.correctIndex,
    explanation: entry.explanation,
    categoryId: CATEGORY,
    sourceId,
    sourceCommit: COMMIT,
    sourceHeading: null,
    evidenceQuote: entry.quote,
    reviewStatus: 'verified',
    provenance: Object.freeze({ author: 'codex-curated', review: 'pending-independent-audit' }),
  });
}

function pair(sourceId, main, followUp) {
  return Object.freeze([question(sourceId, 'main', main), question(sourceId, 'follow-up', followUp)]);
}

const PAIRS = Object.freeze([
  pair('be-1',
    { question: 'OSIV를 사용할 때 뷰 계층에서도 가능한 작업은 무엇인가요?', choices: ['영속 상태 엔티티의 지연 로딩', '표현 계층의 트랜잭션 커밋', '데이터소스 복제 설정 변경', '서블릿 필터의 생명주기 관리'], correctIndex: 0, explanation: 'OSIV의 핵심은 뷰에서도 지연 로딩이 가능하게 하는 것입니다.', quote: 'OSIV의 핵심은 뷰에서도 지연 로딩이 가능하도록 하는 것입니다.' },
    { question: '스프링 방식 OSIV에서 표현 계층이 엔티티를 수정할 수 없는 이유는 무엇인가요?', choices: ['표현 계층에는 트랜잭션이 없기 때문이다.', '지연 로딩이 비활성화되기 때문이다.', '필터가 요청을 차단하기 때문이다.', '데이터소스가 읽기 전용이기 때문이다.'], correctIndex: 0, explanation: '표현 계층에서는 트랜잭션이 없으므로 수정은 불가능하지만 트랜잭션 없는 읽기로 지연 로딩은 가능합니다.', quote: '표현 계층에서는 트랜잭션이 없기 때문에 수정이 불가능합니다.' }),
  pair('be-3',
    { question: '@Value가 설정 값을 주입하는 시점에 필요한 조건은 무엇인가요?', choices: ['대상 컴포넌트가 스프링 빈으로 등록되어 의존 관계를 주입받는 것', 'HTTP 요청 본문이 JSON으로 변환되는 것', '프로퍼티 이름에 RelaxedBinding을 적용하는 것', '컨트롤러가 뷰 이름을 반환하는 것'], correctIndex: 0, explanation: '@Value는 스프링 빈의 의존 관계 주입 시점에 동작합니다.', quote: '`@Value` 어노테이션은 대상 컴포넌트가 스프링 빈으로 등록되고 의존 관계를 주입할 때 동작합니다.' },
    { question: '여러 프로퍼티 값을 하나의 클래스에 바인딩하고 RelaxedBinding도 적용하려면 무엇을 사용해야 하나요?', choices: ['@ConfigurationProperties', '@Value', '@ExceptionHandler', '@ResponseBody'], correctIndex: 0, explanation: '@ConfigurationProperties는 여러 값을 클래스에 바인딩하고 RelaxedBinding을 적용합니다.', quote: '한 번에 여러 값을 바인딩 받을 수 있으며 RelaxedBinding을 적용합니다.' }),
  pair('be-4',
    { question: 'Spring MVC에서 @ExceptionHandler를 선언할 수 있는 위치로 알맞은 것은 무엇인가요?', choices: ['컨트롤러나 @ControllerAdvice 클래스의 메서드', 'EntityManager의 트랜잭션 메서드', '서블릿 필터의 doFilter 메서드', 'ViewResolver의 뷰 생성 메서드'], correctIndex: 0, explanation: '@ExceptionHandler는 컨트롤러 또는 전역 예외 처리용 @ControllerAdvice의 메서드에 사용됩니다.', quote: '`@ExceptionHandler` 애너테이션은 Spring MVC에서 컨트롤러(`@Controller`)나 전역 예외 처리를 위한 `@ControllerAdvice` 클래스의 메서드에서 발생하는 예외를 처리하는 데 사용되는데요.' },
    { question: 'ExceptionHandlerExceptionResolver가 해당 예외를 처리하지 못하면 어떻게 되나요?', choices: ['다음 리졸버로 넘어간다.', '응답 본문을 뷰 이름으로 해석한다.', '트랜잭션 동기화 매니저가 처리한다.', '서블릿 컨테이너가 빈으로 등록한다.'], correctIndex: 0, explanation: '처리할 수 없는 예외는 다음 HandlerExceptionResolver에 위임됩니다.', quote: '만약 처리할 수 없는 예외라면 다음 리졸버로 넘어갑니다.' }),
  pair('be-5',
    { question: '@ResponseBody 또는 ResponseEntity<T> 반환을 사용할 때 스프링은 반환값을 어떻게 처리하나요?', choices: ['HTTP 응답 본문에 직접 쓴다.', '항상 뷰 이름으로 해석한다.', '서블릿 필터에 전달한다.', '빈의 생성자 인자로 주입한다.'], correctIndex: 0, explanation: '두 반환 방식은 컨트롤러 반환값을 HTTP 응답 본문에 직접 씁니다.', quote: '`@ResponseBody` 혹은 `ResponseEntity<T>` 반환을 사용한다면, 스프링은 컨트롤러에서 반환된 값을 HTTP 응답 본문에 직접 씁니다.' },
    { question: '상태 코드와 헤더를 유연하게 바꾸려면 어느 방식을 선택하는 것이 적절한가요?', choices: ['ResponseEntity<T> 반환', '@ResponseBody만 사용', 'ViewResolver 사용', '@ModelAttribute 사용'], correctIndex: 0, explanation: 'ResponseEntity<T>는 상태 코드와 헤더를 유연하게 변경할 수 있습니다.', quote: '반면, `ResponseEntity<T>` 반환의 경우 상태코드와 헤더를 유연하게 변경할 수 있으나 작성할 코드량이 증가한다는 단점이 있습니다.' }),
  pair('be-6',
    { question: 'Filter가 동작하는 계층은 어디인가요?', choices: ['서블릿 컨테이너 수준', 'Spring MVC의 컨트롤러 메서드 수준', '영속성 컨텍스트 수준', 'ViewResolver의 렌더링 수준'], correctIndex: 0, explanation: 'Filter는 Tomcat 같은 서블릿 컨테이너 수준에서 동작합니다.', quote: '`Filter`는 서블릿 컨테이너(예: Tomcat) 수준에서 동작합니다.' },
    { question: 'Filter가 다음 필터 또는 최종 서블릿으로 요청을 전달할 때 사용하는 것은 무엇인가요?', choices: ['FilterChain', 'HandlerAdapter', 'PlatformTransactionManager', 'EntityManager'], correctIndex: 0, explanation: 'Filter는 FilterChain을 통해 다음 필터 또는 최종 서블릿으로 요청을 전달합니다.', quote: 'FilterChain을 통해 다음 필터 또는 최종 서블릿으로 요청을 전달합니다.' }),
  pair('be-7',
    { question: '클라이언트 HTTP 요청을 처음 받아 프론트 컨트롤러 역할을 하는 구성 요소는 무엇인가요?', choices: ['DispatcherServlet', 'ViewResolver', 'HandlerAdapter', 'HttpMessageConverter'], correctIndex: 0, explanation: 'DispatcherServlet이 프론트 컨트롤러 역할을 수행합니다.', quote: '이때 DispatcherServlet이 프론트 컨트롤러의 역할을 수행합니다.' },
    { question: '찾은 핸들러를 실행하기 위해 DispatcherServlet이 사용하는 것은 무엇인가요?', choices: ['HandlerAdapter', 'FilterChain', 'BeanFactory', 'TransactionSynchronizationManager'], correctIndex: 0, explanation: 'DispatcherServlet은 HandlerAdapter로 찾은 핸들러를 실행합니다.', quote: 'DispatcherServlet은 찾은 핸들러를 실행하기 위해 HandlerAdapter를 사용합니다.' }),
  pair('be-8',
    { question: '@RestController의 메서드 반환값은 어떤 방식으로 응답에 포함되나요?', choices: ['JSON 또는 XML로 변환되어 HTTP 응답 본문에 포함된다.', '항상 JSP 뷰 이름으로 변환된다.', '서블릿 컨테이너의 초기화 파라미터가 된다.', '트랜잭션 전파 속성으로 전달된다.'], correctIndex: 0, explanation: '@RestController의 반환값은 JSON 또는 XML로 변환되어 본문에 포함됩니다.', quote: '메서드가 반환하는 값은 자동으로 JSON 또는 XML 형식으로 변환되어 HTTP 응답 본문에 포함됩니다.' },
    { question: '@RestController를 설명하는 조합으로 알맞은 것은 무엇인가요?', choices: ['@Controller와 @ResponseBody의 결합 형태', '@Service와 @Repository의 결합 형태', '@Component와 @Configuration의 결합 형태', '@Filter와 Interceptor의 결합 형태'], correctIndex: 0, explanation: '원문은 @RestController를 @Controller와 @ResponseBody의 결합 형태로 설명합니다.', quote: '이는 `@Controller`와 `@ResponseBody`의 결합된 형태입니다.' }),
  pair('be-9',
    { question: '@ControllerAdvice가 제공하는 범위는 무엇인가요?', choices: ['모든 컨트롤러에 대한 전역 기능', '특정 엔티티의 영속성 관리', '서블릿 컨테이너의 요청 압축', '데이터베이스 스키마 자동 생성'], correctIndex: 0, explanation: '@ControllerAdvice는 모든 컨트롤러에 전역 기능을 제공합니다.', quote: '`@ControllerAdvice`는 모든 컨트롤러에 대해 전역 기능을 제공하는 애너테이션입니다.' },
    { question: '@RestControllerAdvice가 @ExceptionHandler와 함께 쓰일 때 예외 응답의 특징은 무엇인가요?', choices: ['JSON 형태로 내려준다.', '뷰 이름으로 해석한다.', 'JSP로 포워드한다.', '서블릿 생명주기를 종료한다.'], correctIndex: 0, explanation: '@RestControllerAdvice는 내부의 @ResponseBody로 예외 응답을 JSON 형태로 만듭니다.', quote: '`@RestControllerAdvice`는 내부에 `@ResponseBody`를 포함하여 `@ExceptionHandler`와 함께 사용될 때 예외 응답을 Json 형태로 내려준다는 특징이 있습니다.' }),
  pair('be-10',
    { question: '요청 파라미터나 multipart/form-data 형식을 바인딩할 때 사용하는 것은 무엇인가요?', choices: ['ModelAttribute', 'RequestBody', 'ResponseBody', 'ExceptionHandler'], correctIndex: 0, explanation: 'ModelAttribute는 요청 파라미터나 multipart/form-data 형식 바인딩에 사용됩니다.', quote: 'ModelAttribute 는 `요청 파라미터나 multipart/form-data 형식`을 바인딩할 때 사용합니다.' },
    { question: 'ModelAttributeMethodProcessor가 지정된 클래스 값을 객체로 변환할 때 찾는 것은 무엇인가요?', choices: ['클래스의 생성자', '뷰 이름', '서블릿 URL 매핑', '트랜잭션 전파 속성'], correctIndex: 0, explanation: '내부적으로 지정된 클래스의 생성자를 찾아 객체로 변환합니다.', quote: '이때 지정된 클래스의 생성자를 찾아 객체로 변환합니다.' }),
  pair('be-11',
    { question: 'Tomcat을 가장 적절하게 설명한 것은 무엇인가요?', choices: ['웹 서버와 웹 컨테이너가 결합한 WAS', '데이터베이스 스키마를 관리하는 JPA 구현체', '프로퍼티를 클래스에 바인딩하는 애너테이션', 'HTTP 헤더만 처리하는 프록시'], correctIndex: 0, explanation: 'Tomcat은 웹 서버와 웹 컨테이너가 결합한 형태의 WAS입니다.', quote: '웹 서버와 웹 컨테이너의 결합한 형태입니다.' },
    { question: '서블릿에 종료 요청이 들어오면 컨테이너는 어떤 메서드를 호출하나요?', choices: ['destroy()', 'service()', 'doFilter()', 'selectImports()'], correctIndex: 0, explanation: '서블릿 종료 요청 시 destroy() 메서드를 호출합니다.', quote: '만약 서블릿에 종료 요청이 들어오는 경우에는 destroy() 메서드를 호출합니다.' }),
  pair('be-12',
    { question: 'AutoConfiguration의 시작점으로 설명된 애너테이션은 무엇인가요?', choices: ['@SpringBootApplication 안의 @EnableAutoConfiguration', '@Controller 안의 @ResponseBody', '@Service 안의 @Transactional', '@Repository 안의 @Query'], correctIndex: 0, explanation: 'AutoConfiguration은 @SpringBootApplication 안의 @EnableAutoConfiguration에서 시작합니다.', quote: 'AutoConfiguration의 시작은 `@SpringBootApplication` 어노테이션 안에 있는`@EnableAutoConfiguration` 이라는 애노테이션입니다.' },
    { question: '자동 구성 후보를 가져온 뒤 중복을 제거하는 메서드 호출은 무엇인가요?', choices: ['removeDuplicates(configurations)', 'getExclusions(annotationMetadata, attributes)', 'configurations.removeAll(exclusions)', 'getConfigurationClassFilter().filter(configurations)'], correctIndex: 0, explanation: '후보 구성 목록의 중복은 removeDuplicates(configurations)로 제거합니다.', quote: 'removeDuplicates(configurations); - 중복을 제거한다.' }),
  pair('be-13',
    { question: 'Spring Boot가 Spring 개발에 제공하는 핵심 이점은 무엇인가요?', choices: ['더 쉽고 빠르게 스프링 애플리케이션을 개발하도록 돕는다.', '모든 웹 요청을 서블릿 없이 처리한다.', '데이터베이스 연결을 사용하지 않게 한다.', '트랜잭션 예외 처리를 제거한다.'], correctIndex: 0, explanation: 'Spring Boot는 Spring의 문제를 해결하고 더 쉽고 빠른 개발을 돕는 도구입니다.', quote: 'Spring Boot는 Spring의 문제점을 해결해주고, 더 쉽고 빠르게 스프링 애플리케이션을 개발할 수 있도록 해주는 도구입니다.' },
    { question: 'Spring Boot의 내장 서버 기능이 제공하는 배포 방식은 무엇인가요?', choices: ['독립 실행형 JAR 파일로 배포하고 바로 실행하는 방식', 'WAR 파일만 생성해 외부 Tomcat에 배포하는 방식', 'JSP 파일만 단독으로 배포하는 방식', '데이터베이스 프로시저로 배포하는 방식'], correctIndex: 0, explanation: '내장 웹 서버 덕분에 독립 실행형 JAR로 배포하고 실행할 수 있습니다.', quote: '애플리케이션을 독립 실행형 JAR 파일로 배포하고, 바로 실행할 수 있게 합니다.' }),
  pair('be-29',
    { question: '@Repository가 나타내는 계층과 책임으로 알맞은 것은 무엇인가요?', choices: ['데이터베이스 상호작용을 수행하는 데이터 액세스 레이어', '사용자 입력을 처리하는 프레젠테이션 레이어', '비즈니스 로직만 수행하는 서비스 레이어', '정적 자원을 제공하는 웹 서버 레이어'], correctIndex: 0, explanation: '@Repository는 데이터베이스 상호작용을 수행하는 데이터 액세스 레이어의 Bean입니다.', quote: '- **@Repository**는 데이터베이스와의 상호작용을 수행하는 클래스에 사용되며. 데이터 액세스 레이어의 Bean을 나타냅니다.' },
    { question: 'Spring 6 이후 @Component와 @RequestMapping만 사용한 클래스가 웹 요청을 정상 수행하지 못하는 이유는 무엇인가요?', choices: ['@Controller 외에는 핸들러로 등록하지 않기 때문이다.', '@Component가 빈으로 등록되지 않기 때문이다.', '@RequestMapping이 트랜잭션을 시작하기 때문이다.', '@Repository가 ViewResolver를 대체하기 때문이다.'], correctIndex: 0, explanation: 'Spring 6 이후에는 @Controller 외 애너테이션을 핸들러로 등록하지 않습니다.', quote: '하지만 Spring 6 이후 부터 @Controller 외에는 핸들러로 등록하지 않아 웹 요청을 정상적으로 수행할 수 없습니다.' }),
  pair('be-43',
    { question: '@Transactional, @Cacheable, @Async 같은 애너테이션은 주로 무엇을 기반으로 동작하나요?', choices: ['런타임에 동작하는 Spring AOP', '컴파일 시점의 서블릿 필터', 'JSP의 뷰 렌더링', '데이터베이스의 DDL 자동 생성'], correctIndex: 0, explanation: '해당 애너테이션은 런타임 Spring AOP를 기반으로 동작합니다.', quote: '기본적으로 `@Transactional`, `@Cacheable`, `@Async` 등의 애너테이션은 런타임에 동작하는 Spring AOP를 기반으로 동작합니다.' },
    { question: 'CGLIB 방식에서 AOP 적용이 가능한 메서드 범위로 알맞은 것은 무엇인가요?', choices: ['private을 제외한 public, protected, package-private 메서드', '인터페이스의 public 메서드만', 'private 메서드만', '생성자와 static 메서드만'], correctIndex: 0, explanation: 'CGLIB는 클래스를 상속해 private을 제외한 메서드에 AOP를 적용할 수 있습니다.', quote: '`private`을 제외한 `public`, `protected`, `package-private` 메서드에 AOP 적용 가능합니다.' }),
  pair('be-88',
    { question: '@Transactional을 사용한 선언적 트랜잭션 관리 흐름의 세 요소는 무엇인가요?', choices: ['트랜잭션 매니저, 트랜잭션 AOP 프록시, 트랜잭션 동기화 매니저', 'Filter, Interceptor, ViewResolver', 'EntityManager, Repository, Controller', 'DNS, CDN, Load Balancer'], correctIndex: 0, explanation: '원문은 선언적 트랜잭션 흐름의 세 요소를 이 세 가지로 설명합니다.', quote: '트랜잭션 매니저, 트랜잭션 AOP 프록시, 트랜잭션 동기화 매니저가 이에 해당됩니다.' },
    { question: '트랜잭션 시작 뒤 트랜잭션 매니저는 시작된 커넥션을 어디에 보관하나요?', choices: ['트랜잭션 동기화 매니저', 'ViewResolver', 'HandlerAdapter', 'ComponentScan 목록'], correctIndex: 0, explanation: '트랜잭션 매니저는 시작된 커넥션을 동기화 매니저에 보관합니다.', quote: '트랜잭션 매니저는 트랜잭션이 시작된 커넥션을 동기화 매니저에 보관합니다.' }),
  pair('be-89',
    { question: '외부 객체가 의존 객체를 생성해 전달하여 의존성을 해결하는 방식은 무엇인가요?', choices: ['의존성 주입', '서블릿 포워딩', '트랜잭션 전파', '뷰 리졸빙'], correctIndex: 0, explanation: '외부 객체가 의존 객체를 생성해 전달하는 방법을 의존성 주입이라고 합니다.', quote: 'A 객체가 아닌 외부의 C 객체가 B를 생성한 뒤에 이를 전달해서 의존성을 해결하는 방법을 **의존성 주입(Dependency Injection)** 이라고 합니다.' },
    { question: '실행할 때마다 의존 대상이 달라지는 일시적 의존에 사용할 수 있는 주입 방식은 무엇인가요?', choices: ['메서드 주입', '생성자 주입', 'setter 주입', '필드 주입'], correctIndex: 0, explanation: '일시적인 의존이 필요할 때는 메서드 주입을 사용할 수 있습니다.', quote: '실행할때마다 의존 대상이 매번 달라지는 것처럼 일시적인 의존이 필요한 경우에는, 메서드 주입을 사용할 수 있습니다.' }),
  pair('be-102',
    { question: '스프링의 트랜잭션 전파가 결정하는 것은 무엇인가요?', choices: ['기존 트랜잭션의 존재 여부에 따른 동작', 'HTTP 응답 본문의 직렬화 방식', '빈의 컴포넌트 스캔 범위', '데이터베이스 컬럼의 자료형'], correctIndex: 0, explanation: '트랜잭션 전파는 기존 트랜잭션이 있을 때와 없을 때의 동작을 결정합니다.', quote: '트랜잭션의 경계에서 이미 진행 중인 트랜잭션이 있을 때 또는 없을 때 어떻게 동작할 것인가를 결정하는 기능입니다.' },
    { question: '기존 트랜잭션이 있으면 사용하고, 없으면 새 트랜잭션을 만드는 전파 속성은 무엇인가요?', choices: ['REQUIRED', 'SUPPORTS', 'NOT_SUPPORTED', 'NEVER'], correctIndex: 0, explanation: 'REQUIRED는 기존 트랜잭션을 사용하고, 없을 때만 새 트랜잭션을 생성합니다.', quote: '**REQUIRED**는 트랜잭션이 존재하는 경우 해당 트랜잭션 사용하고, 트랜잭션이 없는 경우 트랜잭션을 생성합니다.' }),
  pair('be-123',
    { question: 'PRG 패턴을 주로 적용하는 요청은 무엇인가요?', choices: ['멱등성이 보장되지 않는 POST 요청', '정적 CSS 파일 요청', '서블릿 초기화 요청', '데이터베이스 커넥션 요청'], correctIndex: 0, explanation: 'PRG는 새로 고침 등에 의한 중복 POST 문제를 막기 위해 사용합니다.', quote: '일반적으로 멱등성이 보장되지 않는 POST 요청에 사용합니다.' },
    { question: 'PRG의 Redirect 단계에서 서버가 클라이언트에게 보내는 것은 무엇인가요?', choices: ['302 Found 상태 코드와 새 URL이 담긴 Location 헤더', '200 OK 상태 코드와 JSP 뷰 이름', '401 상태 코드와 인증 헤더', '500 상태 코드와 예외 객체'], correctIndex: 0, explanation: 'Redirect는 302 Found와 새 URL을 담은 Location 헤더로 수행됩니다.', quote: '이 리디렉션은 클라이언트에게 302 Found 상태 코드와 함께 새로운 URL을 포함한 Location 헤더를 반환하여 수행됩니다.' }),
  pair('be-135',
    { question: 'Spring의 기본 트랜잭션 동작에서 Unchecked Exception 또는 Error가 발생하면 어떻게 되나요?', choices: ['트랜잭션을 롤백한다.', '트랜잭션을 항상 커밋한다.', '뷰 이름으로 예외를 해석한다.', '서블릿을 다시 초기화한다.'], correctIndex: 0, explanation: 'Spring은 기본적으로 Unchecked Exception 또는 Error 발생 시 롤백합니다.', quote: 'Spring은 기본적으로 Unchecked Exception 또는 Error가 발생하면 트랜잭션을 롤백합니다.' },
    { question: '특정 Checked Exception도 롤백하도록 조정할 때 사용할 수 있는 @Transactional 속성은 무엇인가요?', choices: ['rollbackFor', 'propagation', 'readOnly', 'value'], correctIndex: 0, explanation: 'rollbackFor 또는 noRollbackFor로 예외별 롤백을 조정할 수 있습니다.', quote: '`rollbackFor`나 `noRollbackFor` 속성을 사용하여 특정 Checked Exception에 대해서도 롤백을 유도하거나, 반대로 Unchecked Exception에 대해 롤백하지 않도록 설정할 수 있습니다.' }),
  pair('be-146',
    { question: '빈으로 등록된 객체의 의존성을 자동 주입하는 주체는 무엇인가요?', choices: ['Spring 컨테이너(BeanFactory, ApplicationContext)', 'DispatcherServlet', 'ViewResolver', 'HTTP 클라이언트'], correctIndex: 0, explanation: 'Spring 컨테이너가 빈 사이 의존성을 자동으로 주입합니다.', quote: '빈으로 등록된 객체들은 Spring 컨테이너(BeanFactory, ApplicationContext)가 자동으로 의존성을 주입해줍니다.' },
    { question: '기본적으로 Spring이 빈을 관리하는 스코프는 무엇인가요?', choices: ['싱글톤', '요청마다 새로운 인스턴스', '세션마다 새로운 인스턴스', '프로토타입만 사용'], correctIndex: 0, explanation: 'Spring은 기본적으로 빈을 싱글톤으로 관리합니다.', quote: '기본적으로 Spring은 빈을 싱글톤으로 관리하여 메모리 사용을 최적화하고, 불필요한 객체 생성을 방지합니다.' }),
  pair('be-151',
    { question: '레이어드 아키텍처는 소프트웨어를 어떤 방식으로 구성하나요?', choices: ['관심사별 여러 계층으로 나누어 수직적으로 배열한다.', '모든 책임을 하나의 컨트롤러에 모은다.', '데이터베이스를 계층 없이 직접 호출한다.', '요청마다 새로운 서버를 생성한다.'], correctIndex: 0, explanation: '레이어드 아키텍처는 관심사별 여러 계층을 수직으로 배열한 구조입니다.', quote: '**레이어드 아키텍처(Layered Architecture)** 란 소프트웨어를 관심사별로 여러 계층으로 나누어 수직적으로 배열한 것을 의미합니다.' },
    { question: '중간 레이어가 아무 일 없이 요청만 전달하는 현상을 무엇이라고 하나요?', choices: ['싱크홀 안티 패턴', '프론트 컨트롤러 패턴', 'PRG 패턴', '의존성 주입'], correctIndex: 0, explanation: '일하지 않는 중간 레이어를 거치게 하는 것을 싱크홀 안티 패턴이라 합니다.', quote: '중간 레이어는 아무 일도 하지 않음에도 불구하고 요청을 무작정 중간 레이어를 통과시키는 것을 **싱크홀 안티 패턴(Achitecture Sinkhole Anti-Pattern)** 이라고 합니다.' }),
]);

export const FOUNDATION_SPRING_QUIZ_DRAFT = Object.freeze(PAIRS.flat());
export const FOUNDATION_SPRING_DRAFT_SOURCE_IDS = Object.freeze(PAIRS.map(([main]) => main.sourceId));
