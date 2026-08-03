// 이 파일은 scripts/build-curated-quiz-bank.mjs로 생성합니다.
export const QUIZ_GENERATION = Object.freeze({
  "version": 2,
  "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
  "acceptedCount": 608,
  "mainCount": 152,
  "followUpCount": 456,
  "model": "codex-curated-static",
  "validatorModel": "mechanical-source-audit-v2",
  "promptVersion": "curated-bank-v2",
  "generatedAt": "2026-07-23T03:50:48.807Z"
});

export const QUIZ_GENERATED_QUESTIONS = Object.freeze([
  {
    "version": 2,
    "id": "quiz-be-1-main",
    "kind": "main",
    "followUpOf": null,
    "question": "OSIV를 사용할 때 뷰 계층에서도 가능한 작업은 무엇인가요?",
    "choices": [
      "표현 계층의 트랜잭션 커밋",
      "영속 상태 엔티티의 지연 로딩",
      "데이터소스 복제 설정 변경",
      "서블릿 필터의 생명주기 관리"
    ],
    "correctIndex": 1,
    "explanation": "OSIV의 핵심은 뷰에서도 지연 로딩이 가능하게 하는 것입니다.",
    "categoryId": "spring-application",
    "sourceId": "be-1",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "OSIV(Open Session In View)",
    "evidenceQuote": "OSIV의 핵심은 뷰에서도 지연 로딩이 가능하도록 하는 것입니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "followUpOrder": null,
    "followUpRole": null,
    "sourceAnchor": "osivopen-session-in-view",
    "choiceFeedback": [
      "“표현 계층의 트랜잭션 커밋”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “영속 상태 엔티티의 지연 로딩”입니다.",
      "OSIV의 핵심은 뷰에서도 지연 로딩이 가능하게 하는 것입니다.",
      "“데이터소스 복제 설정 변경”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “영속 상태 엔티티의 지연 로딩”입니다.",
      "“서블릿 필터의 생명주기 관리”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “영속 상태 엔티티의 지연 로딩”입니다."
    ],
    "keyPoints": [
      "OSIV(Open Session In View)",
      "OSIV",
      "Open",
      "Session"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-1-follow-up",
    "kind": "follow-up",
    "followUpOf": "quiz-be-1-main",
    "question": "스프링 방식 OSIV에서 표현 계층이 엔티티를 수정할 수 없는 이유는 무엇인가요?",
    "choices": [
      "지연 로딩이 비활성화되기 때문이다.",
      "표현 계층에는 트랜잭션이 없기 때문이다.",
      "필터가 요청을 차단하기 때문이다.",
      "데이터소스가 읽기 전용이기 때문이다."
    ],
    "correctIndex": 1,
    "explanation": "표현 계층에서는 트랜잭션이 없으므로 수정은 불가능하지만 트랜잭션 없는 읽기로 지연 로딩은 가능합니다.",
    "categoryId": "spring-application",
    "sourceId": "be-1",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "트랜잭션 방식의 OSIV의 문제는 어떻게 풀어볼 수 있을까요?",
    "evidenceQuote": "표현 계층에서는 트랜잭션이 없기 때문에 수정이 불가능합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "followUpOrder": 1,
    "followUpRole": "core",
    "sourceAnchor": "트랜잭션-방식의-osiv의-문제는-어떻게-풀어볼-수-있을까요",
    "choiceFeedback": [
      "“지연 로딩이 비활성화되기 때문이다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “표현 계층에는 트랜잭션이 없기 때문이다.”입니다.",
      "표현 계층에서는 트랜잭션이 없으므로 수정은 불가능하지만 트랜잭션 없는 읽기로 지연 로딩은 가능합니다.",
      "“필터가 요청을 차단하기 때문이다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “표현 계층에는 트랜잭션이 없기 때문이다.”입니다.",
      "“데이터소스가 읽기 전용이기 때문이다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “표현 계층에는 트랜잭션이 없기 때문이다.”입니다."
    ],
    "keyPoints": [
      "트랜잭션 방식의 OSIV의 문제는 어떻게 풀어볼 수 있을까요?",
      "OSIV",
      "Open",
      "Session"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-1-follow-up-2",
    "kind": "follow-up",
    "followUpOf": "quiz-be-1-main",
    "followUpOrder": 2,
    "followUpRole": "core",
    "question": "OSIV(Open Session In View) 옵션 원문의 “OSIV(Open Session In View)” 구역과 일치하는 설명은 무엇인가요?",
    "choices": [
      "**OSIV(open session in view)** 는 영속성 컨텍스트를 뷰까지 열어둔다는 의미입니다.",
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 0,
    "explanation": "원문의 “OSIV(Open Session In View)” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "spring-application",
    "sourceId": "be-1",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "OSIV(Open Session In View)",
    "sourceAnchor": "osivopen-session-in-view",
    "evidenceQuote": "**OSIV(open session in view)** 는 영속성 컨텍스트를 뷰까지 열어둔다는 의미입니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "원문의 “OSIV(Open Session In View)” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “**OSIV(open session in view)** 는 영속성 컨텍스트를 뷰까지 열어둔다는 의미입니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “**OSIV(open session in view)** 는 영속성 컨텍스트를 뷰까지 열어둔다는 의미입니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “**OSIV(open session in view)** 는 영속성 컨텍스트를 뷰까지 열어둔다는 의미입니다.”입니다."
    ],
    "keyPoints": [
      "OSIV(Open Session In View)",
      "OSIV",
      "Open",
      "Session"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-1-follow-up-3",
    "kind": "follow-up",
    "followUpOf": "quiz-be-1-main",
    "followUpOrder": 3,
    "followUpRole": "remediation",
    "question": "OSIV(Open Session In View) 옵션의 핵심 근거를 다시 확인할 때 옳은 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "영속성 컨텍스트가 살아있으면 엔티티는 영속 상태로 유지될 수 있어, 뷰에서도 지연 로딩을 사용할 수 있어요.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 1,
    "explanation": "원문의 “OSIV(Open Session In View)” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "spring-application",
    "sourceId": "be-1",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "OSIV(Open Session In View)",
    "sourceAnchor": "osivopen-session-in-view",
    "evidenceQuote": "영속성 컨텍스트가 살아있으면 엔티티는 영속 상태로 유지될 수 있어, 뷰에서도 지연 로딩을 사용할 수 있어요.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “영속성 컨텍스트가 살아있으면 엔티티는 영속 상태로 유지될 수 있어, 뷰에서도 지연 로딩을 사용할 수 있어요.”입니다.",
      "원문의 “OSIV(Open Session In View)” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “영속성 컨텍스트가 살아있으면 엔티티는 영속 상태로 유지될 수 있어, 뷰에서도 지연 로딩을 사용할 수 있어요.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “영속성 컨텍스트가 살아있으면 엔티티는 영속 상태로 유지될 수 있어, 뷰에서도 지연 로딩을 사용할 수 있어요.”입니다."
    ],
    "keyPoints": [
      "OSIV(Open Session In View)",
      "OSIV",
      "Open",
      "Session"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-3-main",
    "kind": "main",
    "followUpOf": null,
    "question": "@Value가 설정 값을 주입하는 시점에 필요한 조건은 무엇인가요?",
    "choices": [
      "HTTP 요청 본문이 JSON으로 변환되는 것",
      "프로퍼티 이름에 RelaxedBinding을 적용하는 것",
      "컨트롤러가 뷰 이름을 반환하는 것",
      "대상 컴포넌트가 스프링 빈으로 등록되어 의존 관계를 주입받는 것"
    ],
    "correctIndex": 3,
    "explanation": "@Value는 스프링 빈의 의존 관계 주입 시점에 동작합니다.",
    "categoryId": "spring-application",
    "sourceId": "be-3",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "@Value 어노테이션 주의점",
    "evidenceQuote": "`@Value` 어노테이션은 대상 컴포넌트가 스프링 빈으로 등록되고 의존 관계를 주입할 때 동작합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "followUpOrder": null,
    "followUpRole": null,
    "sourceAnchor": "value-어노테이션-주의점",
    "choiceFeedback": [
      "“HTTP 요청 본문이 JSON으로 변환되는 것”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “대상 컴포넌트가 스프링 빈으로 등록되어 의존 관계를 주입받는 것”입니다.",
      "“프로퍼티 이름에 RelaxedBinding을 적용하는 것”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “대상 컴포넌트가 스프링 빈으로 등록되어 의존 관계를 주입받는 것”입니다.",
      "“컨트롤러가 뷰 이름을 반환하는 것”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “대상 컴포넌트가 스프링 빈으로 등록되어 의존 관계를 주입받는 것”입니다.",
      "@Value는 스프링 빈의 의존 관계 주입 시점에 동작합니다."
    ],
    "keyPoints": [
      "@Value 어노테이션 주의점",
      "@Value",
      "어노테이션",
      "사용"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-3-follow-up",
    "kind": "follow-up",
    "followUpOf": "quiz-be-3-main",
    "question": "여러 프로퍼티 값을 하나의 클래스에 바인딩하고 RelaxedBinding도 적용하려면 무엇을 사용해야 하나요?",
    "choices": [
      "@Value",
      "@ExceptionHandler",
      "@ResponseBody",
      "@ConfigurationProperties"
    ],
    "correctIndex": 3,
    "explanation": "@ConfigurationProperties는 여러 값을 클래스에 바인딩하고 RelaxedBinding을 적용합니다.",
    "categoryId": "spring-application",
    "sourceId": "be-3",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "@ConfigurationProperties 어노테이션과의 차이점은 무엇인가요?",
    "evidenceQuote": "한 번에 여러 값을 바인딩 받을 수 있으며 RelaxedBinding을 적용합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "followUpOrder": 1,
    "followUpRole": "core",
    "sourceAnchor": "configurationproperties-어노테이션과의-차이점은-무엇인가요",
    "choiceFeedback": [
      "“@Value”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “@ConfigurationProperties”입니다.",
      "“@ExceptionHandler”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “@ConfigurationProperties”입니다.",
      "“@ResponseBody”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “@ConfigurationProperties”입니다.",
      "@ConfigurationProperties는 여러 값을 클래스에 바인딩하고 RelaxedBinding을 적용합니다."
    ],
    "keyPoints": [
      "@Value",
      "어노테이션",
      "사용",
      "주의할"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-3-follow-up-2",
    "kind": "follow-up",
    "followUpOf": "quiz-be-3-main",
    "followUpOrder": 2,
    "followUpRole": "core",
    "question": "@Value 어노테이션 사용 시 주의할 점을 원문의 “@Value 어노테이션 주의점” 구역과 일치하는 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "`@Value`은 설정 파일에 설정한 값을 주입할 수 있는 어노테이션입니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 2,
    "explanation": "원문의 “@Value 어노테이션 주의점” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "spring-application",
    "sourceId": "be-3",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "@Value 어노테이션 주의점",
    "sourceAnchor": "value-어노테이션-주의점",
    "evidenceQuote": "`@Value`은 설정 파일에 설정한 값을 주입할 수 있는 어노테이션입니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “`@Value`은 설정 파일에 설정한 값을 주입할 수 있는 어노테이션입니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “`@Value`은 설정 파일에 설정한 값을 주입할 수 있는 어노테이션입니다.”입니다.",
      "원문의 “@Value 어노테이션 주의점” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “`@Value`은 설정 파일에 설정한 값을 주입할 수 있는 어노테이션입니다.”입니다."
    ],
    "keyPoints": [
      "@Value 어노테이션 주의점",
      "@Value",
      "어노테이션",
      "사용"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-3-follow-up-3",
    "kind": "follow-up",
    "followUpOf": "quiz-be-3-main",
    "followUpOrder": 3,
    "followUpRole": "remediation",
    "question": "@Value 어노테이션 사용 시 주의할 점을의 핵심 근거를 다시 확인할 때 옳은 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.",
      "첫 번째로 주의해야 할 부분은 **주입 시점**입니다."
    ],
    "correctIndex": 3,
    "explanation": "원문의 “@Value 어노테이션 주의점” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "spring-application",
    "sourceId": "be-3",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "@Value 어노테이션 주의점",
    "sourceAnchor": "value-어노테이션-주의점",
    "evidenceQuote": "첫 번째로 주의해야 할 부분은 **주입 시점**입니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “첫 번째로 주의해야 할 부분은 **주입 시점**입니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “첫 번째로 주의해야 할 부분은 **주입 시점**입니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “첫 번째로 주의해야 할 부분은 **주입 시점**입니다.”입니다.",
      "원문의 “@Value 어노테이션 주의점” 구역이 정답 선택지의 내용을 직접 설명합니다."
    ],
    "keyPoints": [
      "@Value 어노테이션 주의점",
      "@Value",
      "어노테이션",
      "사용"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-4-main",
    "kind": "main",
    "followUpOf": null,
    "question": "Spring MVC에서 @ExceptionHandler를 선언할 수 있는 위치로 알맞은 것은 무엇인가요?",
    "choices": [
      "컨트롤러나 @ControllerAdvice 클래스의 메서드",
      "EntityManager의 트랜잭션 메서드",
      "서블릿 필터의 doFilter 메서드",
      "ViewResolver의 뷰 생성 메서드"
    ],
    "correctIndex": 0,
    "explanation": "@ExceptionHandler는 컨트롤러 또는 전역 예외 처리용 @ControllerAdvice의 메서드에 사용됩니다.",
    "categoryId": "spring-application",
    "sourceId": "be-4",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "@ExceptionHandler란?",
    "evidenceQuote": "`@ExceptionHandler` 애너테이션은 Spring MVC에서 컨트롤러(`@Controller`)나 전역 예외 처리를 위한 `@ControllerAdvice` 클래스의 메서드에서 발생하는 예외를 처리하는 데 사용되는데요.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "followUpOrder": null,
    "followUpRole": null,
    "sourceAnchor": "exceptionhandler란",
    "choiceFeedback": [
      "@ExceptionHandler는 컨트롤러 또는 전역 예외 처리용 @ControllerAdvice의 메서드에 사용됩니다.",
      "“EntityManager의 트랜잭션 메서드”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “컨트롤러나 @ControllerAdvice 클래스의 메서드”입니다.",
      "“서블릿 필터의 doFilter 메서드”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “컨트롤러나 @ControllerAdvice 클래스의 메서드”입니다.",
      "“ViewResolver의 뷰 생성 메서드”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “컨트롤러나 @ControllerAdvice 클래스의 메서드”입니다."
    ],
    "keyPoints": [
      "@ExceptionHandler란?",
      "@ExceptionHandler",
      "어노테이션은",
      "무엇인가요?"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-4-follow-up",
    "kind": "follow-up",
    "followUpOf": "quiz-be-4-main",
    "question": "ExceptionHandlerExceptionResolver가 해당 예외를 처리하지 못하면 어떻게 되나요?",
    "choices": [
      "다음 리졸버로 넘어간다.",
      "응답 본문을 뷰 이름으로 해석한다.",
      "트랜잭션 동기화 매니저가 처리한다.",
      "서블릿 컨테이너가 빈으로 등록한다."
    ],
    "correctIndex": 0,
    "explanation": "처리할 수 없는 예외는 다음 HandlerExceptionResolver에 위임됩니다.",
    "categoryId": "spring-application",
    "sourceId": "be-4",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "어떤 방식으로 동작하나요?",
    "evidenceQuote": "만약 처리할 수 없는 예외라면 다음 리졸버로 넘어갑니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "followUpOrder": 1,
    "followUpRole": "core",
    "sourceAnchor": "어떤-방식으로-동작하나요",
    "choiceFeedback": [
      "처리할 수 없는 예외는 다음 HandlerExceptionResolver에 위임됩니다.",
      "“응답 본문을 뷰 이름으로 해석한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “다음 리졸버로 넘어간다.”입니다.",
      "“트랜잭션 동기화 매니저가 처리한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “다음 리졸버로 넘어간다.”입니다.",
      "“서블릿 컨테이너가 빈으로 등록한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “다음 리졸버로 넘어간다.”입니다."
    ],
    "keyPoints": [
      "어떤 방식으로 동작하나요?",
      "@ExceptionHandler",
      "어노테이션은",
      "무엇인가요?"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-4-follow-up-2",
    "kind": "follow-up",
    "followUpOf": "quiz-be-4-main",
    "followUpOrder": 2,
    "followUpRole": "core",
    "question": "@ExceptionHandler 어노테이션은 무엇인가요 원문의 “@ExceptionHandler란?” 구역과 일치하는 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.",
      "이 애너테이션은 특정 예외를 처리하는 메서드를 지정하거나 메서드의 파라미터로 처리할 예외를 설정할 수 있습니다."
    ],
    "correctIndex": 3,
    "explanation": "원문의 “@ExceptionHandler란?” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "spring-application",
    "sourceId": "be-4",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "@ExceptionHandler란?",
    "sourceAnchor": "exceptionhandler란",
    "evidenceQuote": "이 애너테이션은 특정 예외를 처리하는 메서드를 지정하거나 메서드의 파라미터로 처리할 예외를 설정할 수 있습니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “이 애너테이션은 특정 예외를 처리하는 메서드를 지정하거나 메서드의 파라미터로 처리할 예외를 설정할 수 있습니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “이 애너테이션은 특정 예외를 처리하는 메서드를 지정하거나 메서드의 파라미터로 처리할 예외를 설정할 수 있습니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “이 애너테이션은 특정 예외를 처리하는 메서드를 지정하거나 메서드의 파라미터로 처리할 예외를 설정할 수 있습니다.”입니다.",
      "원문의 “@ExceptionHandler란?” 구역이 정답 선택지의 내용을 직접 설명합니다."
    ],
    "keyPoints": [
      "@ExceptionHandler란?",
      "@ExceptionHandler",
      "어노테이션은",
      "무엇인가요?"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-4-follow-up-3",
    "kind": "follow-up",
    "followUpOf": "quiz-be-4-main",
    "followUpOrder": 3,
    "followUpRole": "remediation",
    "question": "@ExceptionHandler 어노테이션은 무엇인가요의 핵심 근거를 다시 확인할 때 옳은 설명은 무엇인가요?",
    "choices": [
      "Spring MVC 애플리케이션에서 예외가 발생하면, DispatcherServlet이 적절한 HandlerExceptionResolver를 찾아 예외를 처리합니다.",
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 0,
    "explanation": "원문의 “어떤 방식으로 동작하나요?” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "spring-application",
    "sourceId": "be-4",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "어떤 방식으로 동작하나요?",
    "sourceAnchor": "어떤-방식으로-동작하나요",
    "evidenceQuote": "Spring MVC 애플리케이션에서 예외가 발생하면, DispatcherServlet이 적절한 HandlerExceptionResolver를 찾아 예외를 처리합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "원문의 “어떤 방식으로 동작하나요?” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “Spring MVC 애플리케이션에서 예외가 발생하면, DispatcherServlet이 적절한 HandlerExceptionResolver를 찾아 예외를 처리합니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “Spring MVC 애플리케이션에서 예외가 발생하면, DispatcherServlet이 적절한 HandlerExceptionResolver를 찾아 예외를 처리합니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “Spring MVC 애플리케이션에서 예외가 발생하면, DispatcherServlet이 적절한 HandlerExceptionResolver를 찾아 예외를 처리합니다.”입니다."
    ],
    "keyPoints": [
      "어떤 방식으로 동작하나요?",
      "@ExceptionHandler",
      "어노테이션은",
      "무엇인가요?"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-5-main",
    "kind": "main",
    "followUpOf": null,
    "question": "@ResponseBody 또는 ResponseEntity<T> 반환을 사용할 때 스프링은 반환값을 어떻게 처리하나요?",
    "choices": [
      "항상 뷰 이름으로 해석한다.",
      "HTTP 응답 본문에 직접 쓴다.",
      "서블릿 필터에 전달한다.",
      "빈의 생성자 인자로 주입한다."
    ],
    "correctIndex": 1,
    "explanation": "두 반환 방식은 컨트롤러 반환값을 HTTP 응답 본문에 직접 씁니다.",
    "categoryId": "spring-application",
    "sourceId": "be-5",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "@ResponseBody(or ResponseEntity)가 있을 때와 없을 때 차이점",
    "evidenceQuote": "`@ResponseBody` 혹은 `ResponseEntity<T>` 반환을 사용한다면, 스프링은 컨트롤러에서 반환된 값을 HTTP 응답 본문에 직접 씁니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "followUpOrder": null,
    "followUpRole": null,
    "sourceAnchor": "responsebodyor-responseentity가-있을-때와-없을-때-차이점",
    "choiceFeedback": [
      "“항상 뷰 이름으로 해석한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “HTTP 응답 본문에 직접 쓴다.”입니다.",
      "두 반환 방식은 컨트롤러 반환값을 HTTP 응답 본문에 직접 씁니다.",
      "“서블릿 필터에 전달한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “HTTP 응답 본문에 직접 쓴다.”입니다.",
      "“빈의 생성자 인자로 주입한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “HTTP 응답 본문에 직접 쓴다.”입니다."
    ],
    "keyPoints": [
      "@ResponseBody",
      "or",
      "ResponseEntity",
      "있을"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-5-follow-up",
    "kind": "follow-up",
    "followUpOf": "quiz-be-5-main",
    "question": "상태 코드와 헤더를 유연하게 바꾸려면 어느 방식을 선택하는 것이 적절한가요?",
    "choices": [
      "@ResponseBody만 사용",
      "ResponseEntity<T> 반환",
      "ViewResolver 사용",
      "@ModelAttribute 사용"
    ],
    "correctIndex": 1,
    "explanation": "ResponseEntity<T>는 상태 코드와 헤더를 유연하게 변경할 수 있습니다.",
    "categoryId": "spring-application",
    "sourceId": "be-5",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "@ResponseBody와 ResponseEntity 반환 중 어떤 방식이 더욱 좋나요?",
    "evidenceQuote": "반면, `ResponseEntity<T>` 반환의 경우 상태코드와 헤더를 유연하게 변경할 수 있으나 작성할 코드량이 증가한다는 단점이 있습니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "followUpOrder": 1,
    "followUpRole": "core",
    "sourceAnchor": "responsebody와-responseentity-반환-중-어떤-방식이-더욱-좋나요",
    "choiceFeedback": [
      "“@ResponseBody만 사용”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “ResponseEntity<T> 반환”입니다.",
      "ResponseEntity<T>는 상태 코드와 헤더를 유연하게 변경할 수 있습니다.",
      "“ViewResolver 사용”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “ResponseEntity<T> 반환”입니다.",
      "“@ModelAttribute 사용”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “ResponseEntity<T> 반환”입니다."
    ],
    "keyPoints": [
      "@ResponseBody",
      "or",
      "ResponseEntity",
      "있을"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-5-follow-up-2",
    "kind": "follow-up",
    "followUpOf": "quiz-be-5-main",
    "followUpOrder": 2,
    "followUpRole": "core",
    "question": "@ResponseBody(or ResponseEntity)가 있을 때와 없을 때의 동작 방식의 차이점을 말해주세요 원문의 “@ResponseBody(or ResponseEntity)가 있을 때와 없을 때 차이점” 구역과 일치하는 설명은 무엇인가요?",
    "choices": [
      "이때 자바 객체를 자동으로 JSON이나 XML 등의 타입으로 직렬화합니다.",
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 0,
    "explanation": "원문의 “@ResponseBody(or ResponseEntity)가 있을 때와 없을 때 차이점” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "spring-application",
    "sourceId": "be-5",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "@ResponseBody(or ResponseEntity)가 있을 때와 없을 때 차이점",
    "sourceAnchor": "responsebodyor-responseentity가-있을-때와-없을-때-차이점",
    "evidenceQuote": "이때 자바 객체를 자동으로 JSON이나 XML 등의 타입으로 직렬화합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "원문의 “@ResponseBody(or ResponseEntity)가 있을 때와 없을 때 차이점” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “이때 자바 객체를 자동으로 JSON이나 XML 등의 타입으로 직렬화합니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “이때 자바 객체를 자동으로 JSON이나 XML 등의 타입으로 직렬화합니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “이때 자바 객체를 자동으로 JSON이나 XML 등의 타입으로 직렬화합니다.”입니다."
    ],
    "keyPoints": [
      "@ResponseBody",
      "or",
      "ResponseEntity",
      "있을"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-5-follow-up-3",
    "kind": "follow-up",
    "followUpOf": "quiz-be-5-main",
    "followUpOrder": 3,
    "followUpRole": "remediation",
    "question": "@ResponseBody(or ResponseEntity)가 있을 때와 없을 때의 동작 방식의 차이점을 말해주세요의 핵심 근거를 다시 확인할 때 옳은 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "만약, 없는 경우에는 스프링은 반환값을 뷰 이름으로 해석합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 1,
    "explanation": "원문의 “@ResponseBody(or ResponseEntity)가 있을 때와 없을 때 차이점” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "spring-application",
    "sourceId": "be-5",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "@ResponseBody(or ResponseEntity)가 있을 때와 없을 때 차이점",
    "sourceAnchor": "responsebodyor-responseentity가-있을-때와-없을-때-차이점",
    "evidenceQuote": "만약, 없는 경우에는 스프링은 반환값을 뷰 이름으로 해석합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “만약, 없는 경우에는 스프링은 반환값을 뷰 이름으로 해석합니다.”입니다.",
      "원문의 “@ResponseBody(or ResponseEntity)가 있을 때와 없을 때 차이점” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “만약, 없는 경우에는 스프링은 반환값을 뷰 이름으로 해석합니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “만약, 없는 경우에는 스프링은 반환값을 뷰 이름으로 해석합니다.”입니다."
    ],
    "keyPoints": [
      "@ResponseBody",
      "or",
      "ResponseEntity",
      "있을"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-6-main",
    "kind": "main",
    "followUpOf": null,
    "question": "Filter가 동작하는 계층은 어디인가요?",
    "choices": [
      "Spring MVC의 컨트롤러 메서드 수준",
      "영속성 컨텍스트 수준",
      "서블릿 컨테이너 수준",
      "ViewResolver의 렌더링 수준"
    ],
    "correctIndex": 2,
    "explanation": "Filter는 Tomcat 같은 서블릿 컨테이너 수준에서 동작합니다.",
    "categoryId": "spring-application",
    "sourceId": "be-6",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "특징",
    "evidenceQuote": "`Filter`는 서블릿 컨테이너(예: Tomcat) 수준에서 동작합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "followUpOrder": null,
    "followUpRole": null,
    "sourceAnchor": "특징",
    "choiceFeedback": [
      "“Spring MVC의 컨트롤러 메서드 수준”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “서블릿 컨테이너 수준”입니다.",
      "“영속성 컨텍스트 수준”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “서블릿 컨테이너 수준”입니다.",
      "Filter는 Tomcat 같은 서블릿 컨테이너 수준에서 동작합니다.",
      "“ViewResolver의 렌더링 수준”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “서블릿 컨테이너 수준”입니다."
    ],
    "keyPoints": [
      "특징",
      "Filter와",
      "Interceptor의",
      "차이점을"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-6-follow-up",
    "kind": "follow-up",
    "followUpOf": "quiz-be-6-main",
    "question": "Filter가 다음 필터 또는 최종 서블릿으로 요청을 전달할 때 사용하는 것은 무엇인가요?",
    "choices": [
      "HandlerAdapter",
      "PlatformTransactionManager",
      "FilterChain",
      "EntityManager"
    ],
    "correctIndex": 2,
    "explanation": "Filter는 FilterChain을 통해 다음 필터 또는 최종 서블릿으로 요청을 전달합니다.",
    "categoryId": "spring-application",
    "sourceId": "be-6",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "특징",
    "evidenceQuote": "FilterChain을 통해 다음 필터 또는 최종 서블릿으로 요청을 전달합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "followUpOrder": 1,
    "followUpRole": "core",
    "sourceAnchor": "특징",
    "choiceFeedback": [
      "“HandlerAdapter”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “FilterChain”입니다.",
      "“PlatformTransactionManager”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “FilterChain”입니다.",
      "Filter는 FilterChain을 통해 다음 필터 또는 최종 서블릿으로 요청을 전달합니다.",
      "“EntityManager”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “FilterChain”입니다."
    ],
    "keyPoints": [
      "특징",
      "Filter와",
      "Interceptor의",
      "차이점을"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-6-follow-up-2",
    "kind": "follow-up",
    "followUpOf": "quiz-be-6-main",
    "followUpOrder": 2,
    "followUpRole": "core",
    "question": "Filter와 Interceptor의 차이점을 말해주세요 원문의 “Filter” 구역과 일치하는 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "`Filter`는 요청 및 응답의 전처리와 후처리를 수행하고 서블릿 컨테이너에 의해 실행되는 Java 클래스입니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 1,
    "explanation": "원문의 “Filter” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "spring-application",
    "sourceId": "be-6",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "Filter",
    "sourceAnchor": "filter",
    "evidenceQuote": "`Filter`는 요청 및 응답의 전처리와 후처리를 수행하고 서블릿 컨테이너에 의해 실행되는 Java 클래스입니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “`Filter`는 요청 및 응답의 전처리와 후처리를 수행하고 서블릿 컨테이너에 의해 실행되는 Java 클래스입니다.”입니다.",
      "원문의 “Filter” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “`Filter`는 요청 및 응답의 전처리와 후처리를 수행하고 서블릿 컨테이너에 의해 실행되는 Java 클래스입니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “`Filter`는 요청 및 응답의 전처리와 후처리를 수행하고 서블릿 컨테이너에 의해 실행되는 Java 클래스입니다.”입니다."
    ],
    "keyPoints": [
      "Filter",
      "Filter와",
      "Interceptor의",
      "차이점을"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-6-follow-up-3",
    "kind": "follow-up",
    "followUpOf": "quiz-be-6-main",
    "followUpOrder": 3,
    "followUpRole": "remediation",
    "question": "Filter와 Interceptor의 차이점을 말해주세요의 핵심 근거를 다시 확인할 때 옳은 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "주로 요청 로깅, 인증, 인코딩 설정, CORS 처리, 캐싱, 압축 등의 공통 기능을 구현하는 데 사용됩니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 2,
    "explanation": "원문의 “Filter” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "spring-application",
    "sourceId": "be-6",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "Filter",
    "sourceAnchor": "filter",
    "evidenceQuote": "주로 요청 로깅, 인증, 인코딩 설정, CORS 처리, 캐싱, 압축 등의 공통 기능을 구현하는 데 사용됩니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “주로 요청 로깅, 인증, 인코딩 설정, CORS 처리, 캐싱, 압축 등의 공통 기능을 구현하는 데 사용됩니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “주로 요청 로깅, 인증, 인코딩 설정, CORS 처리, 캐싱, 압축 등의 공통 기능을 구현하는 데 사용됩니다.”입니다.",
      "원문의 “Filter” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “주로 요청 로깅, 인증, 인코딩 설정, CORS 처리, 캐싱, 압축 등의 공통 기능을 구현하는 데 사용됩니다.”입니다."
    ],
    "keyPoints": [
      "Filter",
      "Filter와",
      "Interceptor의",
      "차이점을"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-7-main",
    "kind": "main",
    "followUpOf": null,
    "question": "클라이언트 HTTP 요청을 처음 받아 프론트 컨트롤러 역할을 하는 구성 요소는 무엇인가요?",
    "choices": [
      "ViewResolver",
      "HandlerAdapter",
      "HttpMessageConverter",
      "DispatcherServlet"
    ],
    "correctIndex": 3,
    "explanation": "DispatcherServlet이 프론트 컨트롤러 역할을 수행합니다.",
    "categoryId": "spring-application",
    "sourceId": "be-7",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "evidenceQuote": "이때 DispatcherServlet이 프론트 컨트롤러의 역할을 수행합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "followUpOrder": null,
    "followUpRole": null,
    "sourceAnchor": "content-answer",
    "choiceFeedback": [
      "“ViewResolver”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “DispatcherServlet”입니다.",
      "“HandlerAdapter”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “DispatcherServlet”입니다.",
      "“HttpMessageConverter”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “DispatcherServlet”입니다.",
      "DispatcherServlet이 프론트 컨트롤러 역할을 수행합니다."
    ],
    "keyPoints": [
      "본문",
      "Spring",
      "MVC의",
      "실행"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-7-follow-up",
    "kind": "follow-up",
    "followUpOf": "quiz-be-7-main",
    "question": "찾은 핸들러를 실행하기 위해 DispatcherServlet이 사용하는 것은 무엇인가요?",
    "choices": [
      "FilterChain",
      "BeanFactory",
      "TransactionSynchronizationManager",
      "HandlerAdapter"
    ],
    "correctIndex": 3,
    "explanation": "DispatcherServlet은 HandlerAdapter로 찾은 핸들러를 실행합니다.",
    "categoryId": "spring-application",
    "sourceId": "be-7",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "evidenceQuote": "DispatcherServlet은 찾은 핸들러를 실행하기 위해 HandlerAdapter를 사용합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "followUpOrder": 1,
    "followUpRole": "core",
    "sourceAnchor": "content-answer",
    "choiceFeedback": [
      "“FilterChain”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “HandlerAdapter”입니다.",
      "“BeanFactory”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “HandlerAdapter”입니다.",
      "“TransactionSynchronizationManager”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “HandlerAdapter”입니다.",
      "DispatcherServlet은 HandlerAdapter로 찾은 핸들러를 실행합니다."
    ],
    "keyPoints": [
      "본문",
      "Spring",
      "MVC의",
      "실행"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-7-follow-up-2",
    "kind": "follow-up",
    "followUpOf": "quiz-be-7-main",
    "followUpOrder": 2,
    "followUpRole": "core",
    "question": "Spring MVC의 실행 흐름 원문의 “본문” 구역과 일치하는 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "HandlerMapping을 통해 URL에 매핑된 핸들러를 조회합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 2,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "spring-application",
    "sourceId": "be-7",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "HandlerMapping을 통해 URL에 매핑된 핸들러를 조회합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “HandlerMapping을 통해 URL에 매핑된 핸들러를 조회합니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “HandlerMapping을 통해 URL에 매핑된 핸들러를 조회합니다.”입니다.",
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “HandlerMapping을 통해 URL에 매핑된 핸들러를 조회합니다.”입니다."
    ],
    "keyPoints": [
      "본문",
      "Spring",
      "MVC의",
      "실행"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-7-follow-up-3",
    "kind": "follow-up",
    "followUpOf": "quiz-be-7-main",
    "followUpOrder": 3,
    "followUpRole": "remediation",
    "question": "Spring MVC의 실행 흐름의 핵심 근거를 다시 확인할 때 옳은 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.",
      "HandlerAdapter가 실제로 요청을 처리하는 메서드를 호출합니다."
    ],
    "correctIndex": 3,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "spring-application",
    "sourceId": "be-7",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "HandlerAdapter가 실제로 요청을 처리하는 메서드를 호출합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “HandlerAdapter가 실제로 요청을 처리하는 메서드를 호출합니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “HandlerAdapter가 실제로 요청을 처리하는 메서드를 호출합니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “HandlerAdapter가 실제로 요청을 처리하는 메서드를 호출합니다.”입니다.",
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다."
    ],
    "keyPoints": [
      "본문",
      "Spring",
      "MVC의",
      "실행"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-8-main",
    "kind": "main",
    "followUpOf": null,
    "question": "@RestController의 메서드 반환값은 어떤 방식으로 응답에 포함되나요?",
    "choices": [
      "JSON 또는 XML로 변환되어 HTTP 응답 본문에 포함된다.",
      "항상 JSP 뷰 이름으로 변환된다.",
      "서블릿 컨테이너의 초기화 파라미터가 된다.",
      "트랜잭션 전파 속성으로 전달된다."
    ],
    "correctIndex": 0,
    "explanation": "@RestController의 반환값은 JSON 또는 XML로 변환되어 본문에 포함됩니다.",
    "categoryId": "spring-application",
    "sourceId": "be-8",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "@RestController",
    "evidenceQuote": "메서드가 반환하는 값은 자동으로 JSON 또는 XML 형식으로 변환되어 HTTP 응답 본문에 포함됩니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "followUpOrder": null,
    "followUpRole": null,
    "sourceAnchor": "restcontroller",
    "choiceFeedback": [
      "@RestController의 반환값은 JSON 또는 XML로 변환되어 본문에 포함됩니다.",
      "“항상 JSP 뷰 이름으로 변환된다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “JSON 또는 XML로 변환되어 HTTP 응답 본문에 포함된다.”입니다.",
      "“서블릿 컨테이너의 초기화 파라미터가 된다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “JSON 또는 XML로 변환되어 HTTP 응답 본문에 포함된다.”입니다.",
      "“트랜잭션 전파 속성으로 전달된다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “JSON 또는 XML로 변환되어 HTTP 응답 본문에 포함된다.”입니다."
    ],
    "keyPoints": [
      "@RestController",
      "@Controller",
      "차이점을",
      "Spring과 애플리케이션 계층"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-8-follow-up",
    "kind": "follow-up",
    "followUpOf": "quiz-be-8-main",
    "question": "@RestController를 설명하는 조합으로 알맞은 것은 무엇인가요?",
    "choices": [
      "@Controller와 @ResponseBody의 결합 형태",
      "@Service와 @Repository의 결합 형태",
      "@Component와 @Configuration의 결합 형태",
      "@Filter와 Interceptor의 결합 형태"
    ],
    "correctIndex": 0,
    "explanation": "원문은 @RestController를 @Controller와 @ResponseBody의 결합 형태로 설명합니다.",
    "categoryId": "spring-application",
    "sourceId": "be-8",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "@RestController",
    "evidenceQuote": "이는 `@Controller`와 `@ResponseBody`의 결합된 형태입니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "followUpOrder": 1,
    "followUpRole": "core",
    "sourceAnchor": "restcontroller",
    "choiceFeedback": [
      "원문은 @RestController를 @Controller와 @ResponseBody의 결합 형태로 설명합니다.",
      "“@Service와 @Repository의 결합 형태”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “@Controller와 @ResponseBody의 결합 형태”입니다.",
      "“@Component와 @Configuration의 결합 형태”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “@Controller와 @ResponseBody의 결합 형태”입니다.",
      "“@Filter와 Interceptor의 결합 형태”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “@Controller와 @ResponseBody의 결합 형태”입니다."
    ],
    "keyPoints": [
      "@RestController",
      "@Controller",
      "차이점을",
      "Spring과 애플리케이션 계층"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-8-follow-up-2",
    "kind": "follow-up",
    "followUpOf": "quiz-be-8-main",
    "followUpOrder": 2,
    "followUpRole": "core",
    "question": "@Controller 와 @RestController 의 차이점을 원문의 “본문” 구역과 일치하는 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.",
      "이 두 어노테이션의 주요 차이점은 HTTP 응답의 처리 방식에 있습니다."
    ],
    "correctIndex": 3,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "spring-application",
    "sourceId": "be-8",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "이 두 어노테이션의 주요 차이점은 HTTP 응답의 처리 방식에 있습니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “이 두 어노테이션의 주요 차이점은 HTTP 응답의 처리 방식에 있습니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “이 두 어노테이션의 주요 차이점은 HTTP 응답의 처리 방식에 있습니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “이 두 어노테이션의 주요 차이점은 HTTP 응답의 처리 방식에 있습니다.”입니다.",
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다."
    ],
    "keyPoints": [
      "본문",
      "@Controller",
      "@RestController",
      "차이점을"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-8-follow-up-3",
    "kind": "follow-up",
    "followUpOf": "quiz-be-8-main",
    "followUpOrder": 3,
    "followUpRole": "remediation",
    "question": "@Controller 와 @RestController 의 차이점을의 핵심 근거를 다시 확인할 때 옳은 설명은 무엇인가요?",
    "choices": [
      "주로 뷰(View)를 반환하는 컨트롤러를 정의할 때 사용됩니다.",
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 0,
    "explanation": "원문의 “@Controller” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "spring-application",
    "sourceId": "be-8",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "@Controller",
    "sourceAnchor": "controller",
    "evidenceQuote": "주로 뷰(View)를 반환하는 컨트롤러를 정의할 때 사용됩니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "원문의 “@Controller” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “주로 뷰(View)를 반환하는 컨트롤러를 정의할 때 사용됩니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “주로 뷰(View)를 반환하는 컨트롤러를 정의할 때 사용됩니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “주로 뷰(View)를 반환하는 컨트롤러를 정의할 때 사용됩니다.”입니다."
    ],
    "keyPoints": [
      "@Controller",
      "@RestController",
      "차이점을",
      "Spring과 애플리케이션 계층"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-9-main",
    "kind": "main",
    "followUpOf": null,
    "question": "@ControllerAdvice가 제공하는 범위는 무엇인가요?",
    "choices": [
      "특정 엔티티의 영속성 관리",
      "모든 컨트롤러에 대한 전역 기능",
      "서블릿 컨테이너의 요청 압축",
      "데이터베이스 스키마 자동 생성"
    ],
    "correctIndex": 1,
    "explanation": "@ControllerAdvice는 모든 컨트롤러에 전역 기능을 제공합니다.",
    "categoryId": "spring-application",
    "sourceId": "be-9",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "evidenceQuote": "`@ControllerAdvice`는 모든 컨트롤러에 대해 전역 기능을 제공하는 애너테이션입니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "followUpOrder": null,
    "followUpRole": null,
    "sourceAnchor": "content-answer",
    "choiceFeedback": [
      "“특정 엔티티의 영속성 관리”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “모든 컨트롤러에 대한 전역 기능”입니다.",
      "@ControllerAdvice는 모든 컨트롤러에 전역 기능을 제공합니다.",
      "“서블릿 컨테이너의 요청 압축”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “모든 컨트롤러에 대한 전역 기능”입니다.",
      "“데이터베이스 스키마 자동 생성”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “모든 컨트롤러에 대한 전역 기능”입니다."
    ],
    "keyPoints": [
      "본문",
      "ControllerAdvice에",
      "대해",
      "Spring과 애플리케이션 계층"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-9-follow-up",
    "kind": "follow-up",
    "followUpOf": "quiz-be-9-main",
    "question": "@RestControllerAdvice가 @ExceptionHandler와 함께 쓰일 때 예외 응답의 특징은 무엇인가요?",
    "choices": [
      "뷰 이름으로 해석한다.",
      "JSON 형태로 내려준다.",
      "JSP로 포워드한다.",
      "서블릿 생명주기를 종료한다."
    ],
    "correctIndex": 1,
    "explanation": "@RestControllerAdvice는 내부의 @ResponseBody로 예외 응답을 JSON 형태로 만듭니다.",
    "categoryId": "spring-application",
    "sourceId": "be-9",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "evidenceQuote": "`@RestControllerAdvice`는 내부에 `@ResponseBody`를 포함하여 `@ExceptionHandler`와 함께 사용될 때 예외 응답을 Json 형태로 내려준다는 특징이 있습니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "followUpOrder": 1,
    "followUpRole": "core",
    "sourceAnchor": "content-answer",
    "choiceFeedback": [
      "“뷰 이름으로 해석한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “JSON 형태로 내려준다.”입니다.",
      "@RestControllerAdvice는 내부의 @ResponseBody로 예외 응답을 JSON 형태로 만듭니다.",
      "“JSP로 포워드한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “JSON 형태로 내려준다.”입니다.",
      "“서블릿 생명주기를 종료한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “JSON 형태로 내려준다.”입니다."
    ],
    "keyPoints": [
      "본문",
      "ControllerAdvice에",
      "대해",
      "Spring과 애플리케이션 계층"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-9-follow-up-2",
    "kind": "follow-up",
    "followUpOf": "quiz-be-9-main",
    "followUpOrder": 2,
    "followUpRole": "core",
    "question": "ControllerAdvice 원문의 “본문” 구역과 일치하는 설명은 무엇인가요?",
    "choices": [
      "`@ControllerAdvice`가 선언된 클래스에 `@ExceptionHandler`, `@InitBinder`, `@ModelAttribute`를 등록하면 예외 처리, 바인딩 등을 한 곳에서 처리할 수 있어, 코드의 중복을 줄이고 유지보수성을 높일 수 있습니다.",
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 0,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "spring-application",
    "sourceId": "be-9",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "`@ControllerAdvice`가 선언된 클래스에 `@ExceptionHandler`, `@InitBinder`, `@ModelAttribute`를 등록하면 예외 처리, 바인딩 등을 한 곳에서 처리할 수 있어, 코드의 중복을 줄이고 유지보수성을 높일 수 있습니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “`@ControllerAdvice`가 선언된 클래스에 `@ExceptionHandler`, `@InitBinder`, `@ModelAttribute`를 등록하면 예외 처리, 바인딩 등을 한 곳에서 처리할 수 있어, 코드의 중복을 줄이고 유지보수성을 높일 수 있습니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “`@ControllerAdvice`가 선언된 클래스에 `@ExceptionHandler`, `@InitBinder`, `@ModelAttribute`를 등록하면 예외 처리, 바인딩 등을 한 곳에서 처리할 수 있어, 코드의 중복을 줄이고 유지보수성을 높일 수 있습니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “`@ControllerAdvice`가 선언된 클래스에 `@ExceptionHandler`, `@InitBinder`, `@ModelAttribute`를 등록하면 예외 처리, 바인딩 등을 한 곳에서 처리할 수 있어, 코드의 중복을 줄이고 유지보수성을 높일 수 있습니다.”입니다."
    ],
    "keyPoints": [
      "본문",
      "ControllerAdvice에",
      "대해",
      "Spring과 애플리케이션 계층"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-9-follow-up-3",
    "kind": "follow-up",
    "followUpOf": "quiz-be-9-main",
    "followUpOrder": 3,
    "followUpRole": "remediation",
    "question": "ControllerAdvice의 핵심 근거를 다시 확인할 때 옳은 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "`@ControllerAdvice`는 내부에 `@Component`가 포함되어 있어 컴포넌트 스캔 과정에서 빈으로 등록됩니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 1,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "spring-application",
    "sourceId": "be-9",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "`@ControllerAdvice`는 내부에 `@Component`가 포함되어 있어 컴포넌트 스캔 과정에서 빈으로 등록됩니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “`@ControllerAdvice`는 내부에 `@Component`가 포함되어 있어 컴포넌트 스캔 과정에서 빈으로 등록됩니다.”입니다.",
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “`@ControllerAdvice`는 내부에 `@Component`가 포함되어 있어 컴포넌트 스캔 과정에서 빈으로 등록됩니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “`@ControllerAdvice`는 내부에 `@Component`가 포함되어 있어 컴포넌트 스캔 과정에서 빈으로 등록됩니다.”입니다."
    ],
    "keyPoints": [
      "본문",
      "ControllerAdvice에",
      "대해",
      "Spring과 애플리케이션 계층"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-10-main",
    "kind": "main",
    "followUpOf": null,
    "question": "요청 파라미터나 multipart/form-data 형식을 바인딩할 때 사용하는 것은 무엇인가요?",
    "choices": [
      "RequestBody",
      "ModelAttribute",
      "ResponseBody",
      "ExceptionHandler"
    ],
    "correctIndex": 1,
    "explanation": "ModelAttribute는 요청 파라미터나 multipart/form-data 형식 바인딩에 사용됩니다.",
    "categoryId": "spring-application",
    "sourceId": "be-10",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "evidenceQuote": "ModelAttribute 는 `요청 파라미터나 multipart/form-data 형식`을 바인딩할 때 사용합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "followUpOrder": null,
    "followUpRole": null,
    "sourceAnchor": "content-answer",
    "choiceFeedback": [
      "“RequestBody”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “ModelAttribute”입니다.",
      "ModelAttribute는 요청 파라미터나 multipart/form-data 형식 바인딩에 사용됩니다.",
      "“ResponseBody”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “ModelAttribute”입니다.",
      "“ExceptionHandler”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “ModelAttribute”입니다."
    ],
    "keyPoints": [
      "본문",
      "RequestBody",
      "VS",
      "ModelAttribute의"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-10-follow-up",
    "kind": "follow-up",
    "followUpOf": "quiz-be-10-main",
    "question": "ModelAttributeMethodProcessor가 지정된 클래스 값을 객체로 변환할 때 찾는 것은 무엇인가요?",
    "choices": [
      "뷰 이름",
      "클래스의 생성자",
      "서블릿 URL 매핑",
      "트랜잭션 전파 속성"
    ],
    "correctIndex": 1,
    "explanation": "내부적으로 지정된 클래스의 생성자를 찾아 객체로 변환합니다.",
    "categoryId": "spring-application",
    "sourceId": "be-10",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "ModelAttribute",
    "evidenceQuote": "이때 지정된 클래스의 생성자를 찾아 객체로 변환합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "followUpOrder": 1,
    "followUpRole": "core",
    "sourceAnchor": "modelattribute",
    "choiceFeedback": [
      "“뷰 이름”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “클래스의 생성자”입니다.",
      "내부적으로 지정된 클래스의 생성자를 찾아 객체로 변환합니다.",
      "“서블릿 URL 매핑”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “클래스의 생성자”입니다.",
      "“트랜잭션 전파 속성”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “클래스의 생성자”입니다."
    ],
    "keyPoints": [
      "ModelAttribute",
      "RequestBody",
      "VS",
      "ModelAttribute의"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-10-follow-up-2",
    "kind": "follow-up",
    "followUpOf": "quiz-be-10-main",
    "followUpOrder": 2,
    "followUpRole": "core",
    "question": "RequestBody VS ModelAttribute의 차이점을 말해주세요 원문의 “본문” 구역과 일치하는 설명은 무엇인가요?",
    "choices": [
      "이들은 클라이언트 측에서 보낸 데이터를 Java 객체로 만들어주는데",
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 0,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "spring-application",
    "sourceId": "be-10",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "이들은 클라이언트 측에서 보낸 데이터를 Java 객체로 만들어주는데",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “이들은 클라이언트 측에서 보낸 데이터를 Java 객체로 만들어주는데”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “이들은 클라이언트 측에서 보낸 데이터를 Java 객체로 만들어주는데”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “이들은 클라이언트 측에서 보낸 데이터를 Java 객체로 만들어주는데”입니다."
    ],
    "keyPoints": [
      "본문",
      "RequestBody",
      "VS",
      "ModelAttribute의"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-10-follow-up-3",
    "kind": "follow-up",
    "followUpOf": "quiz-be-10-main",
    "followUpOrder": 3,
    "followUpRole": "remediation",
    "question": "RequestBody VS ModelAttribute의 차이점을 말해주세요의 핵심 근거를 다시 확인할 때 옳은 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "RequestBody 는 `요청의 본문(Body)`에 있는 값을 바인딩할 때 사용하고,",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 1,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "spring-application",
    "sourceId": "be-10",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "RequestBody 는 `요청의 본문(Body)`에 있는 값을 바인딩할 때 사용하고,",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “RequestBody 는 `요청의 본문(Body)`에 있는 값을 바인딩할 때 사용하고,”입니다.",
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “RequestBody 는 `요청의 본문(Body)`에 있는 값을 바인딩할 때 사용하고,”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “RequestBody 는 `요청의 본문(Body)`에 있는 값을 바인딩할 때 사용하고,”입니다."
    ],
    "keyPoints": [
      "본문",
      "RequestBody",
      "VS",
      "ModelAttribute의"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-11-main",
    "kind": "main",
    "followUpOf": null,
    "question": "Tomcat을 가장 적절하게 설명한 것은 무엇인가요?",
    "choices": [
      "데이터베이스 스키마를 관리하는 JPA 구현체",
      "프로퍼티를 클래스에 바인딩하는 애너테이션",
      "웹 서버와 웹 컨테이너가 결합한 WAS",
      "HTTP 헤더만 처리하는 프록시"
    ],
    "correctIndex": 2,
    "explanation": "Tomcat은 웹 서버와 웹 컨테이너가 결합한 형태의 WAS입니다.",
    "categoryId": "spring-application",
    "sourceId": "be-11",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "Tomcat",
    "evidenceQuote": "웹 서버와 웹 컨테이너의 결합한 형태입니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "followUpOrder": null,
    "followUpRole": null,
    "sourceAnchor": "tomcat",
    "choiceFeedback": [
      "“데이터베이스 스키마를 관리하는 JPA 구현체”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “웹 서버와 웹 컨테이너가 결합한 WAS”입니다.",
      "“프로퍼티를 클래스에 바인딩하는 애너테이션”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “웹 서버와 웹 컨테이너가 결합한 WAS”입니다.",
      "Tomcat은 웹 서버와 웹 컨테이너가 결합한 형태의 WAS입니다.",
      "“HTTP 헤더만 처리하는 프록시”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “웹 서버와 웹 컨테이너가 결합한 WAS”입니다."
    ],
    "keyPoints": [
      "Tomcat",
      "톰캣에",
      "대해서",
      "Spring과 애플리케이션 계층"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-11-follow-up",
    "kind": "follow-up",
    "followUpOf": "quiz-be-11-main",
    "question": "서블릿에 종료 요청이 들어오면 컨테이너는 어떤 메서드를 호출하나요?",
    "choices": [
      "service()",
      "doFilter()",
      "destroy()",
      "selectImports()"
    ],
    "correctIndex": 2,
    "explanation": "서블릿 종료 요청 시 destroy() 메서드를 호출합니다.",
    "categoryId": "spring-application",
    "sourceId": "be-11",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "서블릿의 생명주기는 어떻게 되나요?",
    "evidenceQuote": "만약 서블릿에 종료 요청이 들어오는 경우에는 destroy() 메서드를 호출합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "followUpOrder": 1,
    "followUpRole": "core",
    "sourceAnchor": "서블릿의-생명주기는-어떻게-되나요",
    "choiceFeedback": [
      "“service()”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “destroy()”입니다.",
      "“doFilter()”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “destroy()”입니다.",
      "서블릿 종료 요청 시 destroy() 메서드를 호출합니다.",
      "“selectImports()”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “destroy()”입니다."
    ],
    "keyPoints": [
      "서블릿의 생명주기는 어떻게 되나요?",
      "톰캣에",
      "대해서",
      "Spring과 애플리케이션 계층"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-11-follow-up-2",
    "kind": "follow-up",
    "followUpOf": "quiz-be-11-main",
    "followUpOrder": 2,
    "followUpRole": "core",
    "question": "톰캣 원문의 “Tomcat” 구역과 일치하는 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "컨테이너, 웹 컨테이너, 서블릿 컨테이너라고도 부릅니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 1,
    "explanation": "원문의 “Tomcat” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "spring-application",
    "sourceId": "be-11",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "Tomcat",
    "sourceAnchor": "tomcat",
    "evidenceQuote": "컨테이너, 웹 컨테이너, 서블릿 컨테이너라고도 부릅니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “컨테이너, 웹 컨테이너, 서블릿 컨테이너라고도 부릅니다.”입니다.",
      "원문의 “Tomcat” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “컨테이너, 웹 컨테이너, 서블릿 컨테이너라고도 부릅니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “컨테이너, 웹 컨테이너, 서블릿 컨테이너라고도 부릅니다.”입니다."
    ],
    "keyPoints": [
      "Tomcat",
      "톰캣에",
      "대해서",
      "Spring과 애플리케이션 계층"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-11-follow-up-3",
    "kind": "follow-up",
    "followUpOf": "quiz-be-11-main",
    "followUpOrder": 3,
    "followUpRole": "remediation",
    "question": "톰캣의 핵심 근거를 다시 확인할 때 옳은 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "JSP와 서블릿 처리, 서블릿의 수명 주기 관리, 요청 URL을 서블릿 코드로 매핑, HTTP 요청 수신 및 응답, 필터 체인 관리 등을 처리해줍니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 2,
    "explanation": "원문의 “Tomcat” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "spring-application",
    "sourceId": "be-11",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "Tomcat",
    "sourceAnchor": "tomcat",
    "evidenceQuote": "JSP와 서블릿 처리, 서블릿의 수명 주기 관리, 요청 URL을 서블릿 코드로 매핑, HTTP 요청 수신 및 응답, 필터 체인 관리 등을 처리해줍니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “JSP와 서블릿 처리, 서블릿의 수명 주기 관리, 요청 URL을 서블릿 코드로 매핑, HTTP 요청 수신 및 응답, 필터 체인 관리 등을 처리해줍니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “JSP와 서블릿 처리, 서블릿의 수명 주기 관리, 요청 URL을 서블릿 코드로 매핑, HTTP 요청 수신 및 응답, 필터 체인 관리 등을 처리해줍니다.”입니다.",
      "원문의 “Tomcat” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “JSP와 서블릿 처리, 서블릿의 수명 주기 관리, 요청 URL을 서블릿 코드로 매핑, HTTP 요청 수신 및 응답, 필터 체인 관리 등을 처리해줍니다.”입니다."
    ],
    "keyPoints": [
      "Tomcat",
      "톰캣에",
      "대해서",
      "Spring과 애플리케이션 계층"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-12-main",
    "kind": "main",
    "followUpOf": null,
    "question": "AutoConfiguration의 시작점으로 설명된 애너테이션은 무엇인가요?",
    "choices": [
      "@Controller 안의 @ResponseBody",
      "@Service 안의 @Transactional",
      "@Repository 안의 @Query",
      "@SpringBootApplication 안의 @EnableAutoConfiguration"
    ],
    "correctIndex": 3,
    "explanation": "AutoConfiguration은 @SpringBootApplication 안의 @EnableAutoConfiguration에서 시작합니다.",
    "categoryId": "spring-application",
    "sourceId": "be-12",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "evidenceQuote": "AutoConfiguration의 시작은 `@SpringBootApplication` 어노테이션 안에 있는`@EnableAutoConfiguration` 이라는 애노테이션입니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "followUpOrder": null,
    "followUpRole": null,
    "sourceAnchor": "content-answer",
    "choiceFeedback": [
      "“@Controller 안의 @ResponseBody”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “@SpringBootApplication 안의 @EnableAutoConfiguration”입니다.",
      "“@Service 안의 @Transactional”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “@SpringBootApplication 안의 @EnableAutoConfiguration”입니다.",
      "“@Repository 안의 @Query”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “@SpringBootApplication 안의 @EnableAutoConfiguration”입니다.",
      "AutoConfiguration은 @SpringBootApplication 안의 @EnableAutoConfiguration에서 시작합니다."
    ],
    "keyPoints": [
      "본문",
      "AutoConfiguration",
      "동작",
      "원리를"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-12-follow-up",
    "kind": "follow-up",
    "followUpOf": "quiz-be-12-main",
    "question": "자동 구성 후보를 가져온 뒤 중복을 제거하는 메서드 호출은 무엇인가요?",
    "choices": [
      "getExclusions(annotationMetadata, attributes)",
      "configurations.removeAll(exclusions)",
      "getConfigurationClassFilter().filter(configurations)",
      "removeDuplicates(configurations)"
    ],
    "correctIndex": 3,
    "explanation": "후보 구성 목록의 중복은 removeDuplicates(configurations)로 제거합니다.",
    "categoryId": "spring-application",
    "sourceId": "be-12",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "evidenceQuote": "removeDuplicates(configurations); - 중복을 제거한다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "followUpOrder": 1,
    "followUpRole": "core",
    "sourceAnchor": "content-answer",
    "choiceFeedback": [
      "“getExclusions(annotationMetadata, attributes)”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “removeDuplicates(configurations)”입니다.",
      "“configurations.removeAll(exclusions)”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “removeDuplicates(configurations)”입니다.",
      "“getConfigurationClassFilter().filter(configurations)”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “removeDuplicates(configurations)”입니다.",
      "후보 구성 목록의 중복은 removeDuplicates(configurations)로 제거합니다."
    ],
    "keyPoints": [
      "본문",
      "AutoConfiguration",
      "동작",
      "원리를"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-12-follow-up-2",
    "kind": "follow-up",
    "followUpOf": "quiz-be-12-main",
    "followUpOrder": 2,
    "followUpRole": "core",
    "question": "AutoConfiguration 동작 원리를 원문의 “본문” 구역과 일치하는 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "`@EnableAutoConfiguration`은 `@Import(AutoConfigurationImportSelector.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 2,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "spring-application",
    "sourceId": "be-12",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "`@EnableAutoConfiguration`은 `@Import(AutoConfigurationImportSelector.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “`@EnableAutoConfiguration`은 `@Import(AutoConfigurationImportSelector.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “`@EnableAutoConfiguration`은 `@Import(AutoConfigurationImportSelector.”입니다.",
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “`@EnableAutoConfiguration`은 `@Import(AutoConfigurationImportSelector.”입니다."
    ],
    "keyPoints": [
      "본문",
      "AutoConfiguration",
      "동작",
      "원리를"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-12-follow-up-3",
    "kind": "follow-up",
    "followUpOf": "quiz-be-12-main",
    "followUpOrder": 3,
    "followUpRole": "remediation",
    "question": "AutoConfiguration 동작 원리를의 핵심 근거를 다시 확인할 때 옳은 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.",
      "class)`를 통해 자동 구성 클래스를 가져옵니다."
    ],
    "correctIndex": 3,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "spring-application",
    "sourceId": "be-12",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "class)`를 통해 자동 구성 클래스를 가져옵니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “class)`를 통해 자동 구성 클래스를 가져옵니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “class)`를 통해 자동 구성 클래스를 가져옵니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “class)`를 통해 자동 구성 클래스를 가져옵니다.”입니다.",
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다."
    ],
    "keyPoints": [
      "본문",
      "AutoConfiguration",
      "동작",
      "원리를"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-13-main",
    "kind": "main",
    "followUpOf": null,
    "question": "Spring Boot가 Spring 개발에 제공하는 핵심 이점은 무엇인가요?",
    "choices": [
      "더 쉽고 빠르게 스프링 애플리케이션을 개발하도록 돕는다.",
      "모든 웹 요청을 서블릿 없이 처리한다.",
      "데이터베이스 연결을 사용하지 않게 한다.",
      "트랜잭션 예외 처리를 제거한다."
    ],
    "correctIndex": 0,
    "explanation": "Spring Boot는 Spring의 문제를 해결하고 더 쉽고 빠른 개발을 돕는 도구입니다.",
    "categoryId": "spring-application",
    "sourceId": "be-13",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "evidenceQuote": "Spring Boot는 Spring의 문제점을 해결해주고, 더 쉽고 빠르게 스프링 애플리케이션을 개발할 수 있도록 해주는 도구입니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "followUpOrder": null,
    "followUpRole": null,
    "sourceAnchor": "content-answer",
    "choiceFeedback": [
      "Spring Boot는 Spring의 문제를 해결하고 더 쉽고 빠른 개발을 돕는 도구입니다.",
      "“모든 웹 요청을 서블릿 없이 처리한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “더 쉽고 빠르게 스프링 애플리케이션을 개발하도록 돕는다.”입니다.",
      "“데이터베이스 연결을 사용하지 않게 한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “더 쉽고 빠르게 스프링 애플리케이션을 개발하도록 돕는다.”입니다.",
      "“트랜잭션 예외 처리를 제거한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “더 쉽고 빠르게 스프링 애플리케이션을 개발하도록 돕는다.”입니다."
    ],
    "keyPoints": [
      "본문",
      "Spring과",
      "Spring",
      "Boot의"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-13-follow-up",
    "kind": "follow-up",
    "followUpOf": "quiz-be-13-main",
    "question": "Spring Boot의 내장 서버 기능이 제공하는 배포 방식은 무엇인가요?",
    "choices": [
      "독립 실행형 JAR 파일로 배포하고 바로 실행하는 방식",
      "WAR 파일만 생성해 외부 Tomcat에 배포하는 방식",
      "JSP 파일만 단독으로 배포하는 방식",
      "데이터베이스 프로시저로 배포하는 방식"
    ],
    "correctIndex": 0,
    "explanation": "내장 웹 서버 덕분에 독립 실행형 JAR로 배포하고 실행할 수 있습니다.",
    "categoryId": "spring-application",
    "sourceId": "be-13",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "Spring Boot의 주요 특징",
    "evidenceQuote": "애플리케이션을 독립 실행형 JAR 파일로 배포하고, 바로 실행할 수 있게 합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "followUpOrder": 1,
    "followUpRole": "core",
    "sourceAnchor": "spring-boot의-주요-특징",
    "choiceFeedback": [
      "내장 웹 서버 덕분에 독립 실행형 JAR로 배포하고 실행할 수 있습니다.",
      "“WAR 파일만 생성해 외부 Tomcat에 배포하는 방식”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “독립 실행형 JAR 파일로 배포하고 바로 실행하는 방식”입니다.",
      "“JSP 파일만 단독으로 배포하는 방식”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “독립 실행형 JAR 파일로 배포하고 바로 실행하는 방식”입니다.",
      "“데이터베이스 프로시저로 배포하는 방식”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “독립 실행형 JAR 파일로 배포하고 바로 실행하는 방식”입니다."
    ],
    "keyPoints": [
      "Spring Boot의 주요 특징",
      "Spring과",
      "Spring",
      "Boot의"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-13-follow-up-2",
    "kind": "follow-up",
    "followUpOf": "quiz-be-13-main",
    "followUpOrder": 2,
    "followUpRole": "core",
    "question": "Spring과 Spring Boot의 차이를 말해주세요 원문의 “본문” 구역과 일치하는 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.",
      "Spring은 Spring Framework의 핵심 모듈들을 기반으로 한 프레임워크로 엔터프라이즈 애플리케이션 개발을 지원하기 위한 대규모 오픈 소스 프로젝트입니다."
    ],
    "correctIndex": 3,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "spring-application",
    "sourceId": "be-13",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "Spring은 Spring Framework의 핵심 모듈들을 기반으로 한 프레임워크로 엔터프라이즈 애플리케이션 개발을 지원하기 위한 대규모 오픈 소스 프로젝트입니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “Spring은 Spring Framework의 핵심 모듈들을 기반으로 한 프레임워크로 엔터프라이즈 애플리케이션 개발을 지원하기 위한 대규모 오픈 소스 프로젝트입니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “Spring은 Spring Framework의 핵심 모듈들을 기반으로 한 프레임워크로 엔터프라이즈 애플리케이션 개발을 지원하기 위한 대규모 오픈 소스 프로젝트입니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “Spring은 Spring Framework의 핵심 모듈들을 기반으로 한 프레임워크로 엔터프라이즈 애플리케이션 개발을 지원하기 위한 대규모 오픈 소스 프로젝트입니다.”입니다.",
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다."
    ],
    "keyPoints": [
      "본문",
      "Spring과",
      "Spring",
      "Boot의"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-13-follow-up-3",
    "kind": "follow-up",
    "followUpOf": "quiz-be-13-main",
    "followUpOrder": 3,
    "followUpRole": "remediation",
    "question": "Spring과 Spring Boot의 차이를 말해주세요의 핵심 근거를 다시 확인할 때 옳은 설명은 무엇인가요?",
    "choices": [
      "Spring Framework를 사용하기 위해서는 설정 파일 작성을 통한 스프링 컨테이너 구성, 필요한 빈 객체 등록 및 의존성 설정, 데이터베이스 연결, 트랜잭션 관리 등 다양한 설정을 개발자가 직접 수동으로 구성해야 했습니다.",
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 0,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "spring-application",
    "sourceId": "be-13",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "Spring Framework를 사용하기 위해서는 설정 파일 작성을 통한 스프링 컨테이너 구성, 필요한 빈 객체 등록 및 의존성 설정, 데이터베이스 연결, 트랜잭션 관리 등 다양한 설정을 개발자가 직접 수동으로 구성해야 했습니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “Spring Framework를 사용하기 위해서는 설정 파일 작성을 통한 스프링 컨테이너 구성, 필요한 빈 객체 등록 및 의존성 설정, 데이터베이스 연결, 트랜잭션 관리 등 다양한 설정을 개발자가 직접 수동으로 구성해야 했습니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “Spring Framework를 사용하기 위해서는 설정 파일 작성을 통한 스프링 컨테이너 구성, 필요한 빈 객체 등록 및 의존성 설정, 데이터베이스 연결, 트랜잭션 관리 등 다양한 설정을 개발자가 직접 수동으로 구성해야 했습니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “Spring Framework를 사용하기 위해서는 설정 파일 작성을 통한 스프링 컨테이너 구성, 필요한 빈 객체 등록 및 의존성 설정, 데이터베이스 연결, 트랜잭션 관리 등 다양한 설정을 개발자가 직접 수동으로 구성해야 했습니다.”입니다."
    ],
    "keyPoints": [
      "본문",
      "Spring과",
      "Spring",
      "Boot의"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-29-main",
    "kind": "main",
    "followUpOf": null,
    "question": "@Repository가 나타내는 계층과 책임으로 알맞은 것은 무엇인가요?",
    "choices": [
      "사용자 입력을 처리하는 프레젠테이션 레이어",
      "비즈니스 로직만 수행하는 서비스 레이어",
      "정적 자원을 제공하는 웹 서버 레이어",
      "데이터베이스 상호작용을 수행하는 데이터 액세스 레이어"
    ],
    "correctIndex": 3,
    "explanation": "@Repository는 데이터베이스 상호작용을 수행하는 데이터 액세스 레이어의 Bean입니다.",
    "categoryId": "spring-application",
    "sourceId": "be-29",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "evidenceQuote": "- **@Repository**는 데이터베이스와의 상호작용을 수행하는 클래스에 사용되며. 데이터 액세스 레이어의 Bean을 나타냅니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "followUpOrder": null,
    "followUpRole": null,
    "sourceAnchor": "content-answer",
    "choiceFeedback": [
      "“사용자 입력을 처리하는 프레젠테이션 레이어”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “데이터베이스 상호작용을 수행하는 데이터 액세스 레이어”입니다.",
      "“비즈니스 로직만 수행하는 서비스 레이어”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “데이터베이스 상호작용을 수행하는 데이터 액세스 레이어”입니다.",
      "“정적 자원을 제공하는 웹 서버 레이어”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “데이터베이스 상호작용을 수행하는 데이터 액세스 레이어”입니다.",
      "@Repository는 데이터베이스 상호작용을 수행하는 데이터 액세스 레이어의 Bean입니다."
    ],
    "keyPoints": [
      "본문",
      "@Component",
      "@Controller",
      "@Service"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-29-follow-up",
    "kind": "follow-up",
    "followUpOf": "quiz-be-29-main",
    "question": "Spring 6 이후 @Component와 @RequestMapping만 사용한 클래스가 웹 요청을 정상 수행하지 못하는 이유는 무엇인가요?",
    "choices": [
      "@Component가 빈으로 등록되지 않기 때문이다.",
      "@RequestMapping이 트랜잭션을 시작하기 때문이다.",
      "@Repository가 ViewResolver를 대체하기 때문이다.",
      "@Controller 외에는 핸들러로 등록하지 않기 때문이다."
    ],
    "correctIndex": 3,
    "explanation": "Spring 6 이후에는 @Controller 외 애너테이션을 핸들러로 등록하지 않습니다.",
    "categoryId": "spring-application",
    "sourceId": "be-29",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "@Controller, @Repository 대신 @Component 사용하면 안되나요?",
    "evidenceQuote": "하지만 Spring 6 이후 부터 @Controller 외에는 핸들러로 등록하지 않아 웹 요청을 정상적으로 수행할 수 없습니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "followUpOrder": 1,
    "followUpRole": "core",
    "sourceAnchor": "controller-repository-대신-component-사용하면-안되나요",
    "choiceFeedback": [
      "“@Component가 빈으로 등록되지 않기 때문이다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “@Controller 외에는 핸들러로 등록하지 않기 때문이다.”입니다.",
      "“@RequestMapping이 트랜잭션을 시작하기 때문이다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “@Controller 외에는 핸들러로 등록하지 않기 때문이다.”입니다.",
      "“@Repository가 ViewResolver를 대체하기 때문이다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “@Controller 외에는 핸들러로 등록하지 않기 때문이다.”입니다.",
      "Spring 6 이후에는 @Controller 외 애너테이션을 핸들러로 등록하지 않습니다."
    ],
    "keyPoints": [
      "@Component",
      "@Controller",
      "@Service",
      "@Repository의"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-29-follow-up-2",
    "kind": "follow-up",
    "followUpOf": "quiz-be-29-main",
    "followUpOrder": 2,
    "followUpRole": "core",
    "question": "@Component, @Controller, @Service, @Repository의 차이점 원문의 “본문” 구역과 일치하는 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "@Component, @Service, @Controller, @Repository는 각각의 클래스를 특정 역할을 수행하는 Spring Bean으로 등록할 때 사용됩니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 2,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "spring-application",
    "sourceId": "be-29",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "@Component, @Service, @Controller, @Repository는 각각의 클래스를 특정 역할을 수행하는 Spring Bean으로 등록할 때 사용됩니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “@Component, @Service, @Controller, @Repository는 각각의 클래스를 특정 역할을 수행하는 Spring Bean으로 등록할 때 사용됩니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “@Component, @Service, @Controller, @Repository는 각각의 클래스를 특정 역할을 수행하는 Spring Bean으로 등록할 때 사용됩니다.”입니다.",
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “@Component, @Service, @Controller, @Repository는 각각의 클래스를 특정 역할을 수행하는 Spring Bean으로 등록할 때 사용됩니다.”입니다."
    ],
    "keyPoints": [
      "본문",
      "@Component",
      "@Controller",
      "@Service"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-29-follow-up-3",
    "kind": "follow-up",
    "followUpOf": "quiz-be-29-main",
    "followUpOrder": 3,
    "followUpRole": "remediation",
    "question": "@Component, @Controller, @Service, @Repository의 차이점의 핵심 근거를 다시 확인할 때 옳은 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.",
      "각 애너테이션은 클래스가 어떤 역할을 하는지를 명시적으로 나타내며, Spring의 @ComponentScan 기능을 통해 자동으로 Bean으로 등록됩니다."
    ],
    "correctIndex": 3,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "spring-application",
    "sourceId": "be-29",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "각 애너테이션은 클래스가 어떤 역할을 하는지를 명시적으로 나타내며, Spring의 @ComponentScan 기능을 통해 자동으로 Bean으로 등록됩니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “각 애너테이션은 클래스가 어떤 역할을 하는지를 명시적으로 나타내며, Spring의 @ComponentScan 기능을 통해 자동으로 Bean으로 등록됩니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “각 애너테이션은 클래스가 어떤 역할을 하는지를 명시적으로 나타내며, Spring의 @ComponentScan 기능을 통해 자동으로 Bean으로 등록됩니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “각 애너테이션은 클래스가 어떤 역할을 하는지를 명시적으로 나타내며, Spring의 @ComponentScan 기능을 통해 자동으로 Bean으로 등록됩니다.”입니다.",
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다."
    ],
    "keyPoints": [
      "본문",
      "@Component",
      "@Controller",
      "@Service"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-43-main",
    "kind": "main",
    "followUpOf": null,
    "question": "@Transactional, @Cacheable, @Async 같은 애너테이션은 주로 무엇을 기반으로 동작하나요?",
    "choices": [
      "컴파일 시점의 서블릿 필터",
      "JSP의 뷰 렌더링",
      "데이터베이스의 DDL 자동 생성",
      "런타임에 동작하는 Spring AOP"
    ],
    "correctIndex": 3,
    "explanation": "해당 애너테이션은 런타임 Spring AOP를 기반으로 동작합니다.",
    "categoryId": "spring-application",
    "sourceId": "be-43",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "evidenceQuote": "기본적으로 `@Transactional`, `@Cacheable`, `@Async` 등의 애너테이션은 런타임에 동작하는 Spring AOP를 기반으로 동작합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "followUpOrder": null,
    "followUpRole": null,
    "sourceAnchor": "content-answer",
    "choiceFeedback": [
      "“컴파일 시점의 서블릿 필터”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “런타임에 동작하는 Spring AOP”입니다.",
      "“JSP의 뷰 렌더링”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “런타임에 동작하는 Spring AOP”입니다.",
      "“데이터베이스의 DDL 자동 생성”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “런타임에 동작하는 Spring AOP”입니다.",
      "해당 애너테이션은 런타임 Spring AOP를 기반으로 동작합니다."
    ],
    "keyPoints": [
      "본문",
      "private",
      "메서드에",
      "@Transactional"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-43-follow-up",
    "kind": "follow-up",
    "followUpOf": "quiz-be-43-main",
    "question": "CGLIB 방식에서 AOP 적용이 가능한 메서드 범위로 알맞은 것은 무엇인가요?",
    "choices": [
      "인터페이스의 public 메서드만",
      "private 메서드만",
      "생성자와 static 메서드만",
      "private을 제외한 public, protected, package-private 메서드"
    ],
    "correctIndex": 3,
    "explanation": "CGLIB는 클래스를 상속해 private을 제외한 메서드에 AOP를 적용할 수 있습니다.",
    "categoryId": "spring-application",
    "sourceId": "be-43",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "evidenceQuote": "`private`을 제외한 `public`, `protected`, `package-private` 메서드에 AOP 적용 가능합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "followUpOrder": 1,
    "followUpRole": "core",
    "sourceAnchor": "content-answer",
    "choiceFeedback": [
      "“인터페이스의 public 메서드만”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “private을 제외한 public, protected, package-private 메서드”입니다.",
      "“private 메서드만”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “private을 제외한 public, protected, package-private 메서드”입니다.",
      "“생성자와 static 메서드만”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “private을 제외한 public, protected, package-private 메서드”입니다.",
      "CGLIB는 클래스를 상속해 private을 제외한 메서드에 AOP를 적용할 수 있습니다."
    ],
    "keyPoints": [
      "본문",
      "private",
      "메서드에",
      "@Transactional"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-43-follow-up-2",
    "kind": "follow-up",
    "followUpOf": "quiz-be-43-main",
    "followUpOrder": 2,
    "followUpRole": "core",
    "question": "private 메서드에 @Transactional 선언하면 트랜잭션이 동작할까요 원문의 “본문” 구역과 일치하는 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "Spring AOP가 제공하는 JDK Dynamic Proxy, CGLIB 방식 모두 타깃이 구현하는 인터페이스나 구체 클래스를 대상으로 프록시를 만들어서 타깃 클래스의 메서드 수행 전후에 횡단 관심사에 대한 처리를 할 수 있습니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 2,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "spring-application",
    "sourceId": "be-43",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "Spring AOP가 제공하는 JDK Dynamic Proxy, CGLIB 방식 모두 타깃이 구현하는 인터페이스나 구체 클래스를 대상으로 프록시를 만들어서 타깃 클래스의 메서드 수행 전후에 횡단 관심사에 대한 처리를 할 수 있습니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “Spring AOP가 제공하는 JDK Dynamic Proxy, CGLIB 방식 모두 타깃이 구현하는 인터페이스나 구체 클래스를 대상으로 프록시를 만들어서 타깃 클래스의 메서드 수행 전후에 횡단 관심사에 대한 처리를 할 수 있습니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “Spring AOP가 제공하는 JDK Dynamic Proxy, CGLIB 방식 모두 타깃이 구현하는 인터페이스나 구체 클래스를 대상으로 프록시를 만들어서 타깃 클래스의 메서드 수행 전후에 횡단 관심사에 대한 처리를 할 수 있습니다.”입니다.",
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “Spring AOP가 제공하는 JDK Dynamic Proxy, CGLIB 방식 모두 타깃이 구현하는 인터페이스나 구체 클래스를 대상으로 프록시를 만들어서 타깃 클래스의 메서드 수행 전후에 횡단 관심사에 대한 처리를 할 수 있습니다.”입니다."
    ],
    "keyPoints": [
      "본문",
      "private",
      "메서드에",
      "@Transactional"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-43-follow-up-3",
    "kind": "follow-up",
    "followUpOf": "quiz-be-43-main",
    "followUpOrder": 3,
    "followUpRole": "remediation",
    "question": "private 메서드에 @Transactional 선언하면 트랜잭션이 동작할까요의 핵심 근거를 다시 확인할 때 옳은 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.",
      "Spring은 빈 생성시, 해당 빈에 AOP 애너테이션이 있는지 검사하고, 있다면 프록시 객체를 생성하여 빈을 대체합니다."
    ],
    "correctIndex": 3,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "spring-application",
    "sourceId": "be-43",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "Spring은 빈 생성시, 해당 빈에 AOP 애너테이션이 있는지 검사하고, 있다면 프록시 객체를 생성하여 빈을 대체합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “Spring은 빈 생성시, 해당 빈에 AOP 애너테이션이 있는지 검사하고, 있다면 프록시 객체를 생성하여 빈을 대체합니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “Spring은 빈 생성시, 해당 빈에 AOP 애너테이션이 있는지 검사하고, 있다면 프록시 객체를 생성하여 빈을 대체합니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “Spring은 빈 생성시, 해당 빈에 AOP 애너테이션이 있는지 검사하고, 있다면 프록시 객체를 생성하여 빈을 대체합니다.”입니다.",
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다."
    ],
    "keyPoints": [
      "본문",
      "private",
      "메서드에",
      "@Transactional"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-88-main",
    "kind": "main",
    "followUpOf": null,
    "question": "@Transactional을 사용한 선언적 트랜잭션 관리 흐름의 세 요소는 무엇인가요?",
    "choices": [
      "트랜잭션 매니저, 트랜잭션 AOP 프록시, 트랜잭션 동기화 매니저",
      "Filter, Interceptor, ViewResolver",
      "EntityManager, Repository, Controller",
      "DNS, CDN, Load Balancer"
    ],
    "correctIndex": 0,
    "explanation": "원문은 선언적 트랜잭션 흐름의 세 요소를 이 세 가지로 설명합니다.",
    "categoryId": "spring-application",
    "sourceId": "be-88",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "evidenceQuote": "트랜잭션 매니저, 트랜잭션 AOP 프록시, 트랜잭션 동기화 매니저가 이에 해당됩니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "followUpOrder": null,
    "followUpRole": null,
    "sourceAnchor": "content-answer",
    "choiceFeedback": [
      "원문은 선언적 트랜잭션 흐름의 세 요소를 이 세 가지로 설명합니다.",
      "“Filter, Interceptor, ViewResolver”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “트랜잭션 매니저, 트랜잭션 AOP 프록시, 트랜잭션 동기화 매니저”입니다.",
      "“EntityManager, Repository, Controller”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “트랜잭션 매니저, 트랜잭션 AOP 프록시, 트랜잭션 동기화 매니저”입니다.",
      "“DNS, CDN, Load Balancer”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “트랜잭션 매니저, 트랜잭션 AOP 프록시, 트랜잭션 동기화 매니저”입니다."
    ],
    "keyPoints": [
      "본문",
      "스프링",
      "트랜잭션",
      "AOP"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-88-follow-up",
    "kind": "follow-up",
    "followUpOf": "quiz-be-88-main",
    "question": "트랜잭션 시작 뒤 트랜잭션 매니저는 시작된 커넥션을 어디에 보관하나요?",
    "choices": [
      "트랜잭션 동기화 매니저",
      "ViewResolver",
      "HandlerAdapter",
      "ComponentScan 목록"
    ],
    "correctIndex": 0,
    "explanation": "트랜잭션 매니저는 시작된 커넥션을 동기화 매니저에 보관합니다.",
    "categoryId": "spring-application",
    "sourceId": "be-88",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "evidenceQuote": "트랜잭션 매니저는 트랜잭션이 시작된 커넥션을 동기화 매니저에 보관합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "followUpOrder": 1,
    "followUpRole": "core",
    "sourceAnchor": "content-answer",
    "choiceFeedback": [
      "트랜잭션 매니저는 시작된 커넥션을 동기화 매니저에 보관합니다.",
      "“ViewResolver”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “트랜잭션 동기화 매니저”입니다.",
      "“HandlerAdapter”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “트랜잭션 동기화 매니저”입니다.",
      "“ComponentScan 목록”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “트랜잭션 동기화 매니저”입니다."
    ],
    "keyPoints": [
      "본문",
      "스프링",
      "트랜잭션",
      "AOP"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-88-follow-up-2",
    "kind": "follow-up",
    "followUpOf": "quiz-be-88-main",
    "followUpOrder": 2,
    "followUpRole": "core",
    "question": "스프링 트랜잭션 AOP 동작 흐름 원문의 “본문” 구역과 일치하는 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.",
      "`@Transactional`어노테이션을 사용한 선언적 트랜잭션 관리(Declarative Transaction Management)의 전체 흐름에는 크게 3가지 요소가 등장합니다."
    ],
    "correctIndex": 3,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "spring-application",
    "sourceId": "be-88",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "`@Transactional`어노테이션을 사용한 선언적 트랜잭션 관리(Declarative Transaction Management)의 전체 흐름에는 크게 3가지 요소가 등장합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “`@Transactional`어노테이션을 사용한 선언적 트랜잭션 관리(Declarative Transaction Management)의 전체 흐름에는 크게 3가지 요소가 등장합니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “`@Transactional`어노테이션을 사용한 선언적 트랜잭션 관리(Declarative Transaction Management)의 전체 흐름에는 크게 3가지 요소가 등장합니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “`@Transactional`어노테이션을 사용한 선언적 트랜잭션 관리(Declarative Transaction Management)의 전체 흐름에는 크게 3가지 요소가 등장합니다.”입니다.",
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다."
    ],
    "keyPoints": [
      "본문",
      "스프링",
      "트랜잭션",
      "AOP"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-88-follow-up-3",
    "kind": "follow-up",
    "followUpOf": "quiz-be-88-main",
    "followUpOrder": 3,
    "followUpRole": "remediation",
    "question": "스프링 트랜잭션 AOP 동작 흐름의 핵심 근거를 다시 확인할 때 옳은 설명은 무엇인가요?",
    "choices": [
      "클라이언트 코드로부터 요청이 들어오면 트랜잭션 AOP 프록시가 트랜잭션 매니저를 획득하고, 트랜잭션을 시작하기 위해서 트랜잭션 매니저에게 요청합니다.",
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 0,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "spring-application",
    "sourceId": "be-88",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "클라이언트 코드로부터 요청이 들어오면 트랜잭션 AOP 프록시가 트랜잭션 매니저를 획득하고, 트랜잭션을 시작하기 위해서 트랜잭션 매니저에게 요청합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “클라이언트 코드로부터 요청이 들어오면 트랜잭션 AOP 프록시가 트랜잭션 매니저를 획득하고, 트랜잭션을 시작하기 위해서 트랜잭션 매니저에게 요청합니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “클라이언트 코드로부터 요청이 들어오면 트랜잭션 AOP 프록시가 트랜잭션 매니저를 획득하고, 트랜잭션을 시작하기 위해서 트랜잭션 매니저에게 요청합니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “클라이언트 코드로부터 요청이 들어오면 트랜잭션 AOP 프록시가 트랜잭션 매니저를 획득하고, 트랜잭션을 시작하기 위해서 트랜잭션 매니저에게 요청합니다.”입니다."
    ],
    "keyPoints": [
      "본문",
      "스프링",
      "트랜잭션",
      "AOP"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-89-main",
    "kind": "main",
    "followUpOf": null,
    "question": "외부 객체가 의존 객체를 생성해 전달하여 의존성을 해결하는 방식은 무엇인가요?",
    "choices": [
      "서블릿 포워딩",
      "의존성 주입",
      "트랜잭션 전파",
      "뷰 리졸빙"
    ],
    "correctIndex": 1,
    "explanation": "외부 객체가 의존 객체를 생성해 전달하는 방법을 의존성 주입이라고 합니다.",
    "categoryId": "spring-application",
    "sourceId": "be-89",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "evidenceQuote": "A 객체가 아닌 외부의 C 객체가 B를 생성한 뒤에 이를 전달해서 의존성을 해결하는 방법을 **의존성 주입(Dependency Injection)** 이라고 합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "followUpOrder": null,
    "followUpRole": null,
    "sourceAnchor": "content-answer",
    "choiceFeedback": [
      "“서블릿 포워딩”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “의존성 주입”입니다.",
      "외부 객체가 의존 객체를 생성해 전달하는 방법을 의존성 주입이라고 합니다.",
      "“트랜잭션 전파”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “의존성 주입”입니다.",
      "“뷰 리졸빙”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “의존성 주입”입니다."
    ],
    "keyPoints": [
      "본문",
      "의존성",
      "주입이란",
      "무엇인가요?"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-89-follow-up",
    "kind": "follow-up",
    "followUpOf": "quiz-be-89-main",
    "question": "실행할 때마다 의존 대상이 달라지는 일시적 의존에 사용할 수 있는 주입 방식은 무엇인가요?",
    "choices": [
      "생성자 주입",
      "메서드 주입",
      "setter 주입",
      "필드 주입"
    ],
    "correctIndex": 1,
    "explanation": "일시적인 의존이 필요할 때는 메서드 주입을 사용할 수 있습니다.",
    "categoryId": "spring-application",
    "sourceId": "be-89",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "의존성 주입에는 어떤 방식이 있고, 각각 언제 사용할 수 있나요?",
    "evidenceQuote": "실행할때마다 의존 대상이 매번 달라지는 것처럼 일시적인 의존이 필요한 경우에는, 메서드 주입을 사용할 수 있습니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "followUpOrder": 1,
    "followUpRole": "core",
    "sourceAnchor": "의존성-주입에는-어떤-방식이-있고-각각-언제-사용할-수-있나요",
    "choiceFeedback": [
      "“생성자 주입”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “메서드 주입”입니다.",
      "일시적인 의존이 필요할 때는 메서드 주입을 사용할 수 있습니다.",
      "“setter 주입”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “메서드 주입”입니다.",
      "“필드 주입”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “메서드 주입”입니다."
    ],
    "keyPoints": [
      "의존성",
      "주입이란",
      "무엇인가요?",
      "Spring과 애플리케이션 계층"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-89-follow-up-2",
    "kind": "follow-up",
    "followUpOf": "quiz-be-89-main",
    "followUpOrder": 2,
    "followUpRole": "core",
    "question": "의존성 주입이란 무엇인가요 원문의 “본문” 구역과 일치하는 설명은 무엇인가요?",
    "choices": [
      "A 객체가 어떤 작업을 수행하기 위해 B 객체를 필요로 하는 경우에 두 객체 사이에 의존성이 존재한다고 표현합니다.",
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 0,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "spring-application",
    "sourceId": "be-89",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "A 객체가 어떤 작업을 수행하기 위해 B 객체를 필요로 하는 경우에 두 객체 사이에 의존성이 존재한다고 표현합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “A 객체가 어떤 작업을 수행하기 위해 B 객체를 필요로 하는 경우에 두 객체 사이에 의존성이 존재한다고 표현합니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “A 객체가 어떤 작업을 수행하기 위해 B 객체를 필요로 하는 경우에 두 객체 사이에 의존성이 존재한다고 표현합니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “A 객체가 어떤 작업을 수행하기 위해 B 객체를 필요로 하는 경우에 두 객체 사이에 의존성이 존재한다고 표현합니다.”입니다."
    ],
    "keyPoints": [
      "본문",
      "의존성",
      "주입이란",
      "무엇인가요?"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-89-follow-up-3",
    "kind": "follow-up",
    "followUpOf": "quiz-be-89-main",
    "followUpOrder": 3,
    "followUpRole": "remediation",
    "question": "의존성 주입이란 무엇인가요의 핵심 근거를 다시 확인할 때 옳은 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "유연하고 재사용할 수 있는 설계를 만들기 위해서는 코드의 변경 없이 다양한 실행 구조를 만들 수 있어야 합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 1,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "spring-application",
    "sourceId": "be-89",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "유연하고 재사용할 수 있는 설계를 만들기 위해서는 코드의 변경 없이 다양한 실행 구조를 만들 수 있어야 합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “유연하고 재사용할 수 있는 설계를 만들기 위해서는 코드의 변경 없이 다양한 실행 구조를 만들 수 있어야 합니다.”입니다.",
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “유연하고 재사용할 수 있는 설계를 만들기 위해서는 코드의 변경 없이 다양한 실행 구조를 만들 수 있어야 합니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “유연하고 재사용할 수 있는 설계를 만들기 위해서는 코드의 변경 없이 다양한 실행 구조를 만들 수 있어야 합니다.”입니다."
    ],
    "keyPoints": [
      "본문",
      "의존성",
      "주입이란",
      "무엇인가요?"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-102-main",
    "kind": "main",
    "followUpOf": null,
    "question": "스프링의 트랜잭션 전파가 결정하는 것은 무엇인가요?",
    "choices": [
      "HTTP 응답 본문의 직렬화 방식",
      "빈의 컴포넌트 스캔 범위",
      "데이터베이스 컬럼의 자료형",
      "기존 트랜잭션의 존재 여부에 따른 동작"
    ],
    "correctIndex": 3,
    "explanation": "트랜잭션 전파는 기존 트랜잭션이 있을 때와 없을 때의 동작을 결정합니다.",
    "categoryId": "spring-application",
    "sourceId": "be-102",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "evidenceQuote": "트랜잭션의 경계에서 이미 진행 중인 트랜잭션이 있을 때 또는 없을 때 어떻게 동작할 것인가를 결정하는 기능입니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "followUpOrder": null,
    "followUpRole": null,
    "sourceAnchor": "content-answer",
    "choiceFeedback": [
      "“HTTP 응답 본문의 직렬화 방식”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “기존 트랜잭션의 존재 여부에 따른 동작”입니다.",
      "“빈의 컴포넌트 스캔 범위”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “기존 트랜잭션의 존재 여부에 따른 동작”입니다.",
      "“데이터베이스 컬럼의 자료형”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “기존 트랜잭션의 존재 여부에 따른 동작”입니다.",
      "트랜잭션 전파는 기존 트랜잭션이 있을 때와 없을 때의 동작을 결정합니다."
    ],
    "keyPoints": [
      "본문",
      "스프링",
      "트랜잭션",
      "전파"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-102-follow-up",
    "kind": "follow-up",
    "followUpOf": "quiz-be-102-main",
    "question": "기존 트랜잭션이 있으면 사용하고, 없으면 새 트랜잭션을 만드는 전파 속성은 무엇인가요?",
    "choices": [
      "SUPPORTS",
      "NOT_SUPPORTED",
      "NEVER",
      "REQUIRED"
    ],
    "correctIndex": 3,
    "explanation": "REQUIRED는 기존 트랜잭션을 사용하고, 없을 때만 새 트랜잭션을 생성합니다.",
    "categoryId": "spring-application",
    "sourceId": "be-102",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "각 트랜잭션 전파 속성을 설명해 주세요.",
    "evidenceQuote": "**REQUIRED**는 트랜잭션이 존재하는 경우 해당 트랜잭션 사용하고, 트랜잭션이 없는 경우 트랜잭션을 생성합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "followUpOrder": 1,
    "followUpRole": "core",
    "sourceAnchor": "각-트랜잭션-전파-속성을-설명해-주세요",
    "choiceFeedback": [
      "“SUPPORTS”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “REQUIRED”입니다.",
      "“NOT_SUPPORTED”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “REQUIRED”입니다.",
      "“NEVER”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “REQUIRED”입니다.",
      "REQUIRED는 기존 트랜잭션을 사용하고, 없을 때만 새 트랜잭션을 생성합니다."
    ],
    "keyPoints": [
      "각 트랜잭션 전파 속성을 설명해 주세요.",
      "스프링",
      "트랜잭션",
      "전파"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-102-follow-up-2",
    "kind": "follow-up",
    "followUpOf": "quiz-be-102-main",
    "followUpOrder": 2,
    "followUpRole": "core",
    "question": "스프링 트랜잭션 전파 속성 원문의 “본문” 구역과 일치하는 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "가령, `@Transactional` 어노테이션이 존재하는 메서드를 호출했을 때, 기존에 트랜잭션이 존재하면 재사용할지, 예외를 던질지 등 행동을 결정할 수 있습니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 2,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "spring-application",
    "sourceId": "be-102",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "가령, `@Transactional` 어노테이션이 존재하는 메서드를 호출했을 때, 기존에 트랜잭션이 존재하면 재사용할지, 예외를 던질지 등 행동을 결정할 수 있습니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “가령, `@Transactional` 어노테이션이 존재하는 메서드를 호출했을 때, 기존에 트랜잭션이 존재하면 재사용할지, 예외를 던질지 등 행동을 결정할 수 있습니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “가령, `@Transactional` 어노테이션이 존재하는 메서드를 호출했을 때, 기존에 트랜잭션이 존재하면 재사용할지, 예외를 던질지 등 행동을 결정할 수 있습니다.”입니다.",
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “가령, `@Transactional` 어노테이션이 존재하는 메서드를 호출했을 때, 기존에 트랜잭션이 존재하면 재사용할지, 예외를 던질지 등 행동을 결정할 수 있습니다.”입니다."
    ],
    "keyPoints": [
      "본문",
      "스프링",
      "트랜잭션",
      "전파"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-102-follow-up-3",
    "kind": "follow-up",
    "followUpOf": "quiz-be-102-main",
    "followUpOrder": 3,
    "followUpRole": "remediation",
    "question": "스프링 트랜잭션 전파 속성의 핵심 근거를 다시 확인할 때 옳은 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.",
      "트랜잭션 전파 속성에는 REQUIRED, REQUIRED_NEW, MANDATORY, SUPPORTS, NOT_SUPPORTED, NESTED, NEVER가 존재하며, `@Transactional` 어노테이션의 propagation 속성에 값을 설정할 수 있습니다."
    ],
    "correctIndex": 3,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "spring-application",
    "sourceId": "be-102",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "트랜잭션 전파 속성에는 REQUIRED, REQUIRED_NEW, MANDATORY, SUPPORTS, NOT_SUPPORTED, NESTED, NEVER가 존재하며, `@Transactional` 어노테이션의 propagation 속성에 값을 설정할 수 있습니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “트랜잭션 전파 속성에는 REQUIRED, REQUIRED_NEW, MANDATORY, SUPPORTS, NOT_SUPPORTED, NESTED, NEVER가 존재하며, `@Transactional` 어노테이션의 propagation 속성에 값을 설정할 수 있습니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “트랜잭션 전파 속성에는 REQUIRED, REQUIRED_NEW, MANDATORY, SUPPORTS, NOT_SUPPORTED, NESTED, NEVER가 존재하며, `@Transactional` 어노테이션의 propagation 속성에 값을 설정할 수 있습니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “트랜잭션 전파 속성에는 REQUIRED, REQUIRED_NEW, MANDATORY, SUPPORTS, NOT_SUPPORTED, NESTED, NEVER가 존재하며, `@Transactional` 어노테이션의 propagation 속성에 값을 설정할 수 있습니다.”입니다.",
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다."
    ],
    "keyPoints": [
      "본문",
      "스프링",
      "트랜잭션",
      "전파"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-123-main",
    "kind": "main",
    "followUpOf": null,
    "question": "PRG 패턴을 주로 적용하는 요청은 무엇인가요?",
    "choices": [
      "정적 CSS 파일 요청",
      "서블릿 초기화 요청",
      "멱등성이 보장되지 않는 POST 요청",
      "데이터베이스 커넥션 요청"
    ],
    "correctIndex": 2,
    "explanation": "PRG는 새로 고침 등에 의한 중복 POST 문제를 막기 위해 사용합니다.",
    "categoryId": "spring-application",
    "sourceId": "be-123",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "evidenceQuote": "일반적으로 멱등성이 보장되지 않는 POST 요청에 사용합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "followUpOrder": null,
    "followUpRole": null,
    "sourceAnchor": "content-answer",
    "choiceFeedback": [
      "“정적 CSS 파일 요청”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “멱등성이 보장되지 않는 POST 요청”입니다.",
      "“서블릿 초기화 요청”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “멱등성이 보장되지 않는 POST 요청”입니다.",
      "PRG는 새로 고침 등에 의한 중복 POST 문제를 막기 위해 사용합니다.",
      "“데이터베이스 커넥션 요청”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “멱등성이 보장되지 않는 POST 요청”입니다."
    ],
    "keyPoints": [
      "본문",
      "PRG",
      "패턴에",
      "대해서"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-123-follow-up",
    "kind": "follow-up",
    "followUpOf": "quiz-be-123-main",
    "question": "PRG의 Redirect 단계에서 서버가 클라이언트에게 보내는 것은 무엇인가요?",
    "choices": [
      "200 OK 상태 코드와 JSP 뷰 이름",
      "401 상태 코드와 인증 헤더",
      "302 Found 상태 코드와 새 URL이 담긴 Location 헤더",
      "500 상태 코드와 예외 객체"
    ],
    "correctIndex": 2,
    "explanation": "Redirect는 302 Found와 새 URL을 담은 Location 헤더로 수행됩니다.",
    "categoryId": "spring-application",
    "sourceId": "be-123",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "evidenceQuote": "이 리디렉션은 클라이언트에게 302 Found 상태 코드와 함께 새로운 URL을 포함한 Location 헤더를 반환하여 수행됩니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "followUpOrder": 1,
    "followUpRole": "core",
    "sourceAnchor": "content-answer",
    "choiceFeedback": [
      "“200 OK 상태 코드와 JSP 뷰 이름”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “302 Found 상태 코드와 새 URL이 담긴 Location 헤더”입니다.",
      "“401 상태 코드와 인증 헤더”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “302 Found 상태 코드와 새 URL이 담긴 Location 헤더”입니다.",
      "Redirect는 302 Found와 새 URL을 담은 Location 헤더로 수행됩니다.",
      "“500 상태 코드와 예외 객체”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “302 Found 상태 코드와 새 URL이 담긴 Location 헤더”입니다."
    ],
    "keyPoints": [
      "본문",
      "PRG",
      "패턴에",
      "대해서"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-123-follow-up-2",
    "kind": "follow-up",
    "followUpOf": "quiz-be-123-main",
    "followUpOrder": 2,
    "followUpRole": "core",
    "question": "PRG 패턴 원문의 “본문” 구역과 일치하는 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "**PRG 패턴** 은 Post/Redirect/Get 패턴의 약자로, 웹 애플리케이션에서 폼 제출 후 페이지 새로 고침이나 브라우저 뒤로 가기 등의 문제를 방지하기 위해 사용하는 디자인 패턴입니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 1,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "spring-application",
    "sourceId": "be-123",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "**PRG 패턴** 은 Post/Redirect/Get 패턴의 약자로, 웹 애플리케이션에서 폼 제출 후 페이지 새로 고침이나 브라우저 뒤로 가기 등의 문제를 방지하기 위해 사용하는 디자인 패턴입니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “**PRG 패턴** 은 Post/Redirect/Get 패턴의 약자로, 웹 애플리케이션에서 폼 제출 후 페이지 새로 고침이나 브라우저 뒤로 가기 등의 문제를 방지하기 위해 사용하는 디자인 패턴입니다.”입니다.",
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “**PRG 패턴** 은 Post/Redirect/Get 패턴의 약자로, 웹 애플리케이션에서 폼 제출 후 페이지 새로 고침이나 브라우저 뒤로 가기 등의 문제를 방지하기 위해 사용하는 디자인 패턴입니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “**PRG 패턴** 은 Post/Redirect/Get 패턴의 약자로, 웹 애플리케이션에서 폼 제출 후 페이지 새로 고침이나 브라우저 뒤로 가기 등의 문제를 방지하기 위해 사용하는 디자인 패턴입니다.”입니다."
    ],
    "keyPoints": [
      "본문",
      "PRG",
      "패턴에",
      "대해서"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-123-follow-up-3",
    "kind": "follow-up",
    "followUpOf": "quiz-be-123-main",
    "followUpOrder": 3,
    "followUpRole": "remediation",
    "question": "PRG 패턴의 핵심 근거를 다시 확인할 때 옳은 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "예를 들어, 사용자가 웹 페이지에서 주문 버튼을 클릭하고 새로고침을 수행하면 2번의 POST 요청이 서버로 전달되는데요.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 2,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "spring-application",
    "sourceId": "be-123",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "예를 들어, 사용자가 웹 페이지에서 주문 버튼을 클릭하고 새로고침을 수행하면 2번의 POST 요청이 서버로 전달되는데요.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “예를 들어, 사용자가 웹 페이지에서 주문 버튼을 클릭하고 새로고침을 수행하면 2번의 POST 요청이 서버로 전달되는데요.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “예를 들어, 사용자가 웹 페이지에서 주문 버튼을 클릭하고 새로고침을 수행하면 2번의 POST 요청이 서버로 전달되는데요.”입니다.",
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “예를 들어, 사용자가 웹 페이지에서 주문 버튼을 클릭하고 새로고침을 수행하면 2번의 POST 요청이 서버로 전달되는데요.”입니다."
    ],
    "keyPoints": [
      "본문",
      "PRG",
      "패턴에",
      "대해서"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-135-main",
    "kind": "main",
    "followUpOf": null,
    "question": "Spring의 기본 트랜잭션 동작에서 Unchecked Exception 또는 Error가 발생하면 어떻게 되나요?",
    "choices": [
      "트랜잭션을 항상 커밋한다.",
      "트랜잭션을 롤백한다.",
      "뷰 이름으로 예외를 해석한다.",
      "서블릿을 다시 초기화한다."
    ],
    "correctIndex": 1,
    "explanation": "Spring은 기본적으로 Unchecked Exception 또는 Error 발생 시 롤백합니다.",
    "categoryId": "spring-application",
    "sourceId": "be-135",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "Spring 트랜잭션 예외 처리 동작",
    "evidenceQuote": "Spring은 기본적으로 Unchecked Exception 또는 Error가 발생하면 트랜잭션을 롤백합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "followUpOrder": null,
    "followUpRole": null,
    "sourceAnchor": "spring-트랜잭션-예외-처리-동작",
    "choiceFeedback": [
      "“트랜잭션을 항상 커밋한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “트랜잭션을 롤백한다.”입니다.",
      "Spring은 기본적으로 Unchecked Exception 또는 Error 발생 시 롤백합니다.",
      "“뷰 이름으로 예외를 해석한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “트랜잭션을 롤백한다.”입니다.",
      "“서블릿을 다시 초기화한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “트랜잭션을 롤백한다.”입니다."
    ],
    "keyPoints": [
      "Spring 트랜잭션 예외 처리 동작",
      "어떤",
      "예외가",
      "발생하면"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-135-follow-up",
    "kind": "follow-up",
    "followUpOf": "quiz-be-135-main",
    "question": "특정 Checked Exception도 롤백하도록 조정할 때 사용할 수 있는 @Transactional 속성은 무엇인가요?",
    "choices": [
      "propagation",
      "rollbackFor",
      "readOnly",
      "value"
    ],
    "correctIndex": 1,
    "explanation": "rollbackFor 또는 noRollbackFor로 예외별 롤백을 조정할 수 있습니다.",
    "categoryId": "spring-application",
    "sourceId": "be-135",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "Spring 트랜잭션 예외 처리 동작",
    "evidenceQuote": "`rollbackFor`나 `noRollbackFor` 속성을 사용하여 특정 Checked Exception에 대해서도 롤백을 유도하거나, 반대로 Unchecked Exception에 대해 롤백하지 않도록 설정할 수 있습니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "followUpOrder": 1,
    "followUpRole": "core",
    "sourceAnchor": "spring-트랜잭션-예외-처리-동작",
    "choiceFeedback": [
      "“propagation”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “rollbackFor”입니다.",
      "rollbackFor 또는 noRollbackFor로 예외별 롤백을 조정할 수 있습니다.",
      "“readOnly”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “rollbackFor”입니다.",
      "“value”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “rollbackFor”입니다."
    ],
    "keyPoints": [
      "Spring 트랜잭션 예외 처리 동작",
      "어떤",
      "예외가",
      "발생하면"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-135-follow-up-2",
    "kind": "follow-up",
    "followUpOf": "quiz-be-135-main",
    "followUpOrder": 2,
    "followUpRole": "core",
    "question": "어떤 예외가 발생하면 트랜잭션을 롤백하나요 원문의 “본문” 구역과 일치하는 설명은 무엇인가요?",
    "choices": [
      "예외 종류에 따른 트랜잭션 롤백은 개발 환경에 따라 다르게 동작합니다.",
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 0,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "spring-application",
    "sourceId": "be-135",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "예외 종류에 따른 트랜잭션 롤백은 개발 환경에 따라 다르게 동작합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “예외 종류에 따른 트랜잭션 롤백은 개발 환경에 따라 다르게 동작합니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “예외 종류에 따른 트랜잭션 롤백은 개발 환경에 따라 다르게 동작합니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “예외 종류에 따른 트랜잭션 롤백은 개발 환경에 따라 다르게 동작합니다.”입니다."
    ],
    "keyPoints": [
      "본문",
      "어떤",
      "예외가",
      "발생하면"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-135-follow-up-3",
    "kind": "follow-up",
    "followUpOf": "quiz-be-135-main",
    "followUpOrder": 3,
    "followUpRole": "remediation",
    "question": "어떤 예외가 발생하면 트랜잭션을 롤백하나요의 핵심 근거를 다시 확인할 때 옳은 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "기본적으로 Checked Exception이 발생하더라도 트랜잭션을 롤백하지 않습니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 1,
    "explanation": "원문의 “Spring 트랜잭션 예외 처리 동작” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "spring-application",
    "sourceId": "be-135",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "Spring 트랜잭션 예외 처리 동작",
    "sourceAnchor": "spring-트랜잭션-예외-처리-동작",
    "evidenceQuote": "기본적으로 Checked Exception이 발생하더라도 트랜잭션을 롤백하지 않습니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “기본적으로 Checked Exception이 발생하더라도 트랜잭션을 롤백하지 않습니다.”입니다.",
      "원문의 “Spring 트랜잭션 예외 처리 동작” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “기본적으로 Checked Exception이 발생하더라도 트랜잭션을 롤백하지 않습니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “기본적으로 Checked Exception이 발생하더라도 트랜잭션을 롤백하지 않습니다.”입니다."
    ],
    "keyPoints": [
      "Spring 트랜잭션 예외 처리 동작",
      "어떤",
      "예외가",
      "발생하면"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-146-main",
    "kind": "main",
    "followUpOf": null,
    "question": "빈으로 등록된 객체의 의존성을 자동 주입하는 주체는 무엇인가요?",
    "choices": [
      "DispatcherServlet",
      "ViewResolver",
      "HTTP 클라이언트",
      "Spring 컨테이너(BeanFactory, ApplicationContext)"
    ],
    "correctIndex": 3,
    "explanation": "Spring 컨테이너가 빈 사이 의존성을 자동으로 주입합니다.",
    "categoryId": "spring-application",
    "sourceId": "be-146",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "1. 의존성 관리 자동화",
    "evidenceQuote": "빈으로 등록된 객체들은 Spring 컨테이너(BeanFactory, ApplicationContext)가 자동으로 의존성을 주입해줍니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "followUpOrder": null,
    "followUpRole": null,
    "sourceAnchor": "1-의존성-관리-자동화",
    "choiceFeedback": [
      "“DispatcherServlet”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “Spring 컨테이너(BeanFactory, ApplicationContext)”입니다.",
      "“ViewResolver”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “Spring 컨테이너(BeanFactory, ApplicationContext)”입니다.",
      "“HTTP 클라이언트”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “Spring 컨테이너(BeanFactory, ApplicationContext)”입니다.",
      "Spring 컨테이너가 빈 사이 의존성을 자동으로 주입합니다."
    ],
    "keyPoints": [
      "1. 의존성 관리 자동화",
      "Spring에서",
      "객체를",
      "Bean으로"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-146-follow-up",
    "kind": "follow-up",
    "followUpOf": "quiz-be-146-main",
    "question": "기본적으로 Spring이 빈을 관리하는 스코프는 무엇인가요?",
    "choices": [
      "요청마다 새로운 인스턴스",
      "세션마다 새로운 인스턴스",
      "프로토타입만 사용",
      "싱글톤"
    ],
    "correctIndex": 3,
    "explanation": "Spring은 기본적으로 빈을 싱글톤으로 관리합니다.",
    "categoryId": "spring-application",
    "sourceId": "be-146",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "2. 싱글톤 패턴 구현",
    "evidenceQuote": "기본적으로 Spring은 빈을 싱글톤으로 관리하여 메모리 사용을 최적화하고, 불필요한 객체 생성을 방지합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "followUpOrder": 1,
    "followUpRole": "core",
    "sourceAnchor": "2-싱글톤-패턴-구현",
    "choiceFeedback": [
      "“요청마다 새로운 인스턴스”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “싱글톤”입니다.",
      "“세션마다 새로운 인스턴스”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “싱글톤”입니다.",
      "“프로토타입만 사용”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “싱글톤”입니다.",
      "Spring은 기본적으로 빈을 싱글톤으로 관리합니다."
    ],
    "keyPoints": [
      "2. 싱글톤 패턴 구현",
      "Spring에서",
      "객체를",
      "Bean으로"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-146-follow-up-2",
    "kind": "follow-up",
    "followUpOf": "quiz-be-146-main",
    "followUpOrder": 2,
    "followUpRole": "core",
    "question": "Spring에서 객체를 Bean으로 관리하는 이유를 원문의 “본문” 구역과 일치하는 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "Bean으로 객체를 관리하는 이유는 애플리케이션의 설계, 확장성, 유지보수 측면에서 많은 이점을 제공하기 때문입니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 2,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "spring-application",
    "sourceId": "be-146",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "Bean으로 객체를 관리하는 이유는 애플리케이션의 설계, 확장성, 유지보수 측면에서 많은 이점을 제공하기 때문입니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “Bean으로 객체를 관리하는 이유는 애플리케이션의 설계, 확장성, 유지보수 측면에서 많은 이점을 제공하기 때문입니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “Bean으로 객체를 관리하는 이유는 애플리케이션의 설계, 확장성, 유지보수 측면에서 많은 이점을 제공하기 때문입니다.”입니다.",
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “Bean으로 객체를 관리하는 이유는 애플리케이션의 설계, 확장성, 유지보수 측면에서 많은 이점을 제공하기 때문입니다.”입니다."
    ],
    "keyPoints": [
      "본문",
      "Spring에서",
      "객체를",
      "Bean으로"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-146-follow-up-3",
    "kind": "follow-up",
    "followUpOf": "quiz-be-146-main",
    "followUpOrder": 3,
    "followUpRole": "remediation",
    "question": "Spring에서 객체를 Bean으로 관리하는 이유를의 핵심 근거를 다시 확인할 때 옳은 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.",
      "개발자가 직접 객체를 생성하고 의존성을 연결할 필요가 없어집니다."
    ],
    "correctIndex": 3,
    "explanation": "원문의 “1. 의존성 관리 자동화” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "spring-application",
    "sourceId": "be-146",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "1. 의존성 관리 자동화",
    "sourceAnchor": "1-의존성-관리-자동화",
    "evidenceQuote": "개발자가 직접 객체를 생성하고 의존성을 연결할 필요가 없어집니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “개발자가 직접 객체를 생성하고 의존성을 연결할 필요가 없어집니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “개발자가 직접 객체를 생성하고 의존성을 연결할 필요가 없어집니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “개발자가 직접 객체를 생성하고 의존성을 연결할 필요가 없어집니다.”입니다.",
      "원문의 “1. 의존성 관리 자동화” 구역이 정답 선택지의 내용을 직접 설명합니다."
    ],
    "keyPoints": [
      "1. 의존성 관리 자동화",
      "Spring에서",
      "객체를",
      "Bean으로"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-151-main",
    "kind": "main",
    "followUpOf": null,
    "question": "레이어드 아키텍처는 소프트웨어를 어떤 방식으로 구성하나요?",
    "choices": [
      "모든 책임을 하나의 컨트롤러에 모은다.",
      "데이터베이스를 계층 없이 직접 호출한다.",
      "요청마다 새로운 서버를 생성한다.",
      "관심사별 여러 계층으로 나누어 수직적으로 배열한다."
    ],
    "correctIndex": 3,
    "explanation": "레이어드 아키텍처는 관심사별 여러 계층을 수직으로 배열한 구조입니다.",
    "categoryId": "spring-application",
    "sourceId": "be-151",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "evidenceQuote": "**레이어드 아키텍처(Layered Architecture)** 란 소프트웨어를 관심사별로 여러 계층으로 나누어 수직적으로 배열한 것을 의미합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "followUpOrder": null,
    "followUpRole": null,
    "sourceAnchor": "content-answer",
    "choiceFeedback": [
      "“모든 책임을 하나의 컨트롤러에 모은다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “관심사별 여러 계층으로 나누어 수직적으로 배열한다.”입니다.",
      "“데이터베이스를 계층 없이 직접 호출한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “관심사별 여러 계층으로 나누어 수직적으로 배열한다.”입니다.",
      "“요청마다 새로운 서버를 생성한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “관심사별 여러 계층으로 나누어 수직적으로 배열한다.”입니다.",
      "레이어드 아키텍처는 관심사별 여러 계층을 수직으로 배열한 구조입니다."
    ],
    "keyPoints": [
      "본문",
      "레이어드",
      "아키텍처란",
      "무엇인가요?"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-151-follow-up",
    "kind": "follow-up",
    "followUpOf": "quiz-be-151-main",
    "question": "중간 레이어가 아무 일 없이 요청만 전달하는 현상을 무엇이라고 하나요?",
    "choices": [
      "프론트 컨트롤러 패턴",
      "PRG 패턴",
      "의존성 주입",
      "싱크홀 안티 패턴"
    ],
    "correctIndex": 3,
    "explanation": "일하지 않는 중간 레이어를 거치게 하는 것을 싱크홀 안티 패턴이라 합니다.",
    "categoryId": "spring-application",
    "sourceId": "be-151",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "싱크홀 안티 패턴에 대해서 알고 계시나요?",
    "evidenceQuote": "중간 레이어는 아무 일도 하지 않음에도 불구하고 요청을 무작정 중간 레이어를 통과시키는 것을 **싱크홀 안티 패턴(Achitecture Sinkhole Anti-Pattern)** 이라고 합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "followUpOrder": 1,
    "followUpRole": "core",
    "sourceAnchor": "싱크홀-안티-패턴에-대해서-알고-계시나요",
    "choiceFeedback": [
      "“프론트 컨트롤러 패턴”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “싱크홀 안티 패턴”입니다.",
      "“PRG 패턴”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “싱크홀 안티 패턴”입니다.",
      "“의존성 주입”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “싱크홀 안티 패턴”입니다.",
      "일하지 않는 중간 레이어를 거치게 하는 것을 싱크홀 안티 패턴이라 합니다."
    ],
    "keyPoints": [
      "싱크홀 안티 패턴에 대해서 알고 계시나요?",
      "레이어드",
      "아키텍처란",
      "무엇인가요?"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-151-follow-up-2",
    "kind": "follow-up",
    "followUpOf": "quiz-be-151-main",
    "followUpOrder": 2,
    "followUpRole": "core",
    "question": "레이어드 아키텍처란 무엇인가요 원문의 “본문” 구역과 일치하는 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "예를 들어, 데이터베이스 접근과 관련된 책임들을 하나의 관심사로 볼 수 있습니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 2,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "spring-application",
    "sourceId": "be-151",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "예를 들어, 데이터베이스 접근과 관련된 책임들을 하나의 관심사로 볼 수 있습니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “예를 들어, 데이터베이스 접근과 관련된 책임들을 하나의 관심사로 볼 수 있습니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “예를 들어, 데이터베이스 접근과 관련된 책임들을 하나의 관심사로 볼 수 있습니다.”입니다.",
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “예를 들어, 데이터베이스 접근과 관련된 책임들을 하나의 관심사로 볼 수 있습니다.”입니다."
    ],
    "keyPoints": [
      "본문",
      "레이어드",
      "아키텍처란",
      "무엇인가요?"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-151-follow-up-3",
    "kind": "follow-up",
    "followUpOf": "quiz-be-151-main",
    "followUpOrder": 3,
    "followUpRole": "remediation",
    "question": "레이어드 아키텍처란 무엇인가요의 핵심 근거를 다시 확인할 때 옳은 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.",
      "레이어드 아키텍처의 대표적인 구성에는 3가지 레이어가 존재하는데요."
    ],
    "correctIndex": 3,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "spring-application",
    "sourceId": "be-151",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "레이어드 아키텍처의 대표적인 구성에는 3가지 레이어가 존재하는데요.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “레이어드 아키텍처의 대표적인 구성에는 3가지 레이어가 존재하는데요.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “레이어드 아키텍처의 대표적인 구성에는 3가지 레이어가 존재하는데요.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “레이어드 아키텍처의 대표적인 구성에는 3가지 레이어가 존재하는데요.”입니다.",
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다."
    ],
    "keyPoints": [
      "본문",
      "레이어드",
      "아키텍처란",
      "무엇인가요?"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-14-main",
    "kind": "main",
    "followUpOf": null,
    "question": "Spring Data JPA가 데이터 접근 계층에서 목표로 하는 것은 무엇인가요?",
    "choices": [
      "JPA 구현체를 없애고 SQL만 사용하게 하는 것",
      "필요한 노력만으로 데이터 액세스 계층 구현을 크게 개선하는 것",
      "리포지토리 인터페이스 작성을 금지하는 것",
      "데이터베이스 연결을 수동으로만 만들게 하는 것"
    ],
    "correctIndex": 1,
    "explanation": "원문은 Spring Data JPA가 필요한 만큼의 노력으로 데이터 액세스 계층 구현을 크게 개선하는 것을 목표로 한다고 설명합니다.",
    "categoryId": "persistence-database",
    "sourceId": "be-14",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "evidenceQuote": "Spring Data JPA는 실제로 필요한 만큼의 노력으로 데이터 액세스 계층의 구현을 크게 개선하는 것을 목표로 합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "followUpOrder": null,
    "followUpRole": null,
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "choiceFeedback": [
      "“JPA 구현체를 없애고 SQL만 사용하게 하는 것”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “필요한 노력만으로 데이터 액세스 계층 구현을 크게 개선하는 것”입니다.",
      "원문은 Spring Data JPA가 필요한 만큼의 노력으로 데이터 액세스 계층 구현을 크게 개선하는 것을 목표로 한다고 설명합니다.",
      "“리포지토리 인터페이스 작성을 금지하는 것”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “필요한 노력만으로 데이터 액세스 계층 구현을 크게 개선하는 것”입니다.",
      "“데이터베이스 연결을 수동으로만 만들게 하는 것”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “필요한 노력만으로 데이터 액세스 계층 구현을 크게 개선하는 것”입니다."
    ],
    "keyPoints": [
      "본문",
      "JPA를",
      "사용하는",
      "이유를"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-14-follow-up",
    "kind": "follow-up",
    "followUpOf": "quiz-be-14-main",
    "question": "Spring Data JPA에서 리포지토리 인터페이스를 작성한 뒤의 동작으로 맞는 것은 무엇인가요?",
    "choices": [
      "개발자가 모든 CRUD 구현체를 직접 작성해야 한다",
      "Spring이 리포지토리 인터페이스를 자동으로 연결해 준다",
      "인터페이스에 선언한 메서드는 실행할 수 없다",
      "리포지토리는 Spring Bean으로 등록할 수 없다"
    ],
    "correctIndex": 1,
    "explanation": "개발자가 리포지토리 인터페이스를 작성하면 Spring이 이를 자동으로 연결한다고 원문이 설명합니다.",
    "categoryId": "persistence-database",
    "sourceId": "be-14",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "evidenceQuote": "개발자는 다양한 기술을 사용하여 리포지토리 인터페이스를 작성하면 Spring이 자동으로 이를 연결해 줍니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "followUpOrder": 1,
    "followUpRole": "core",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "choiceFeedback": [
      "“개발자가 모든 CRUD 구현체를 직접 작성해야 한다”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “Spring이 리포지토리 인터페이스를 자동으로 연결해 준다”입니다.",
      "개발자가 리포지토리 인터페이스를 작성하면 Spring이 이를 자동으로 연결한다고 원문이 설명합니다.",
      "“인터페이스에 선언한 메서드는 실행할 수 없다”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “Spring이 리포지토리 인터페이스를 자동으로 연결해 준다”입니다.",
      "“리포지토리는 Spring Bean으로 등록할 수 없다”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “Spring이 리포지토리 인터페이스를 자동으로 연결해 준다”입니다."
    ],
    "keyPoints": [
      "본문",
      "JPA를",
      "사용하는",
      "이유를"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-14-follow-up-2",
    "kind": "follow-up",
    "followUpOf": "quiz-be-14-main",
    "followUpOrder": 2,
    "followUpRole": "core",
    "question": "JPA를 사용하는 이유를 원문의 “본문” 구역과 일치하는 설명은 무엇인가요?",
    "choices": [
      "데이터 액세스 기술을 사용하는 Spring 기반 애플리케이션을 더 쉽게 구축할 수 있습니다.",
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 0,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "persistence-database",
    "sourceId": "be-14",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "데이터 액세스 기술을 사용하는 Spring 기반 애플리케이션을 더 쉽게 구축할 수 있습니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “데이터 액세스 기술을 사용하는 Spring 기반 애플리케이션을 더 쉽게 구축할 수 있습니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “데이터 액세스 기술을 사용하는 Spring 기반 애플리케이션을 더 쉽게 구축할 수 있습니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “데이터 액세스 기술을 사용하는 Spring 기반 애플리케이션을 더 쉽게 구축할 수 있습니다.”입니다."
    ],
    "keyPoints": [
      "본문",
      "JPA를",
      "사용하는",
      "이유를"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-14-follow-up-3",
    "kind": "follow-up",
    "followUpOf": "quiz-be-14-main",
    "followUpOrder": 3,
    "followUpRole": "remediation",
    "question": "JPA를 사용하는 이유를의 핵심 근거를 다시 확인할 때 옳은 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "애플리케이션에 대한 데이터 액세스 계층을 구현하는 것은 상당히 번거로울 수 있습니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 1,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "persistence-database",
    "sourceId": "be-14",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "애플리케이션에 대한 데이터 액세스 계층을 구현하는 것은 상당히 번거로울 수 있습니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “애플리케이션에 대한 데이터 액세스 계층을 구현하는 것은 상당히 번거로울 수 있습니다.”입니다.",
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “애플리케이션에 대한 데이터 액세스 계층을 구현하는 것은 상당히 번거로울 수 있습니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “애플리케이션에 대한 데이터 액세스 계층을 구현하는 것은 상당히 번거로울 수 있습니다.”입니다."
    ],
    "keyPoints": [
      "본문",
      "JPA를",
      "사용하는",
      "이유를"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-15-main",
    "kind": "main",
    "followUpOf": null,
    "question": "Hibernate의 역할을 원문에 맞게 설명한 것은 무엇인가요?",
    "choices": [
      "JPA 인터페이스와 규약만 정의하는 기술 명세다",
      "관계형 데이터베이스 없이 동작하는 웹 서버다",
      "JPA가 정의한 EntityManager 같은 인터페이스를 직접 구현한 라이브러리다",
      "리포지토리 메서드 이름만으로 SQL을 만드는 Spring 모듈이다"
    ],
    "correctIndex": 2,
    "explanation": "Hibernate는 JPA가 정의한 EntityManager 같은 인터페이스를 직접 구현한 라이브러리입니다.",
    "categoryId": "persistence-database",
    "sourceId": "be-15",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "evidenceQuote": "JPA가 정의한 `javax.persistence.EntityManager`와 같은 인터페이스를 직접 구현한 라이브러리입니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "followUpOrder": null,
    "followUpRole": null,
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "choiceFeedback": [
      "“JPA 인터페이스와 규약만 정의하는 기술 명세다”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “JPA가 정의한 EntityManager 같은 인터페이스를 직접 구현한 라이브러리다”입니다.",
      "“관계형 데이터베이스 없이 동작하는 웹 서버다”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “JPA가 정의한 EntityManager 같은 인터페이스를 직접 구현한 라이브러리다”입니다.",
      "Hibernate는 JPA가 정의한 EntityManager 같은 인터페이스를 직접 구현한 라이브러리입니다.",
      "“리포지토리 메서드 이름만으로 SQL을 만드는 Spring 모듈이다”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “JPA가 정의한 EntityManager 같은 인터페이스를 직접 구현한 라이브러리다”입니다."
    ],
    "keyPoints": [
      "본문",
      "JPA",
      "Hibernate",
      "Spring"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-15-follow-up",
    "kind": "follow-up",
    "followUpOf": "quiz-be-15-main",
    "question": "Hibernate 대신 다른 JPA 구현체를 사용할 수 있다는 설명의 근거는 무엇인가요?",
    "choices": [
      "Hibernate만 EntityManager를 구현할 수 있다",
      "JPA 명세는 하나의 구현체만 허용한다",
      "Hibernate는 JPA 구현체 중 하나일 뿐이며 다른 구현체로 대체할 수 있다",
      "Spring Data JPA는 Hibernate 없이 어떤 구현체도 사용할 수 없다"
    ],
    "correctIndex": 2,
    "explanation": "원문은 Hibernate가 여러 JPA 구현체 중 하나이므로 다른 구현체로 대체할 수 있다고 설명합니다.",
    "categoryId": "persistence-database",
    "sourceId": "be-15",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "evidenceQuote": "JPA의 구현체 중 하나일 뿐이므로, DataNucleus, EclipseLink 등 다양한 JPA 구현체로 대체할 수 있습니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "followUpOrder": 1,
    "followUpRole": "core",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "choiceFeedback": [
      "“Hibernate만 EntityManager를 구현할 수 있다”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “Hibernate는 JPA 구현체 중 하나일 뿐이며 다른 구현체로 대체할 수 있다”입니다.",
      "“JPA 명세는 하나의 구현체만 허용한다”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “Hibernate는 JPA 구현체 중 하나일 뿐이며 다른 구현체로 대체할 수 있다”입니다.",
      "원문은 Hibernate가 여러 JPA 구현체 중 하나이므로 다른 구현체로 대체할 수 있다고 설명합니다.",
      "“Spring Data JPA는 Hibernate 없이 어떤 구현체도 사용할 수 없다”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “Hibernate는 JPA 구현체 중 하나일 뿐이며 다른 구현체로 대체할 수 있다”입니다."
    ],
    "keyPoints": [
      "본문",
      "JPA",
      "Hibernate",
      "Spring"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-15-follow-up-2",
    "kind": "follow-up",
    "followUpOf": "quiz-be-15-main",
    "followUpOrder": 2,
    "followUpRole": "core",
    "question": "JPA, Hibernate, Spring Data JPA 의 차이가 무엇인가요 원문의 “본문” 구역과 일치하는 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "자바 애플리케이션에서 관계형 데이터베이스를 사용하는 방식을 정의한 **인터페이스**입니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 1,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "persistence-database",
    "sourceId": "be-15",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "자바 애플리케이션에서 관계형 데이터베이스를 사용하는 방식을 정의한 **인터페이스**입니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “자바 애플리케이션에서 관계형 데이터베이스를 사용하는 방식을 정의한 **인터페이스**입니다.”입니다.",
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “자바 애플리케이션에서 관계형 데이터베이스를 사용하는 방식을 정의한 **인터페이스**입니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “자바 애플리케이션에서 관계형 데이터베이스를 사용하는 방식을 정의한 **인터페이스**입니다.”입니다."
    ],
    "keyPoints": [
      "본문",
      "JPA",
      "Hibernate",
      "Spring"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-15-follow-up-3",
    "kind": "follow-up",
    "followUpOf": "quiz-be-15-main",
    "followUpOrder": 3,
    "followUpRole": "remediation",
    "question": "JPA, Hibernate, Spring Data JPA 의 차이가 무엇인가요의 핵심 근거를 다시 확인할 때 옳은 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "JPA는 단순한 명세이기 때문에 인터페이스와 규약만 정의하며, 실제 구현체는 제공하지 않습니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 2,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "persistence-database",
    "sourceId": "be-15",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "JPA는 단순한 명세이기 때문에 인터페이스와 규약만 정의하며, 실제 구현체는 제공하지 않습니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “JPA는 단순한 명세이기 때문에 인터페이스와 규약만 정의하며, 실제 구현체는 제공하지 않습니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “JPA는 단순한 명세이기 때문에 인터페이스와 규약만 정의하며, 실제 구현체는 제공하지 않습니다.”입니다.",
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “JPA는 단순한 명세이기 때문에 인터페이스와 규약만 정의하며, 실제 구현체는 제공하지 않습니다.”입니다."
    ],
    "keyPoints": [
      "본문",
      "JPA",
      "Hibernate",
      "Spring"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-16-main",
    "kind": "main",
    "followUpOf": null,
    "question": "Spring Data JPA에서 새로운 엔티티인지 판단하는 주체는 무엇인가요?",
    "choices": [
      "EntityManager의 flush()",
      "Repository의 findAll()",
      "Hibernate의 DDL 생성기",
      "JpaEntityInformation의 isNew(T entity)"
    ],
    "correctIndex": 3,
    "explanation": "새로운 Entity 여부는 JpaEntityInformation의 isNew(T entity)로 판단합니다.",
    "categoryId": "persistence-database",
    "sourceId": "be-16",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "evidenceQuote": "새로운 Entity인지 여부는 JpaEntityInformation의 `isNew(T entity)`에 의해 판단됩니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "followUpOrder": null,
    "followUpRole": null,
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "choiceFeedback": [
      "“EntityManager의 flush()”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “JpaEntityInformation의 isNew(T entity)”입니다.",
      "“Repository의 findAll()”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “JpaEntityInformation의 isNew(T entity)”입니다.",
      "“Hibernate의 DDL 생성기”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “JpaEntityInformation의 isNew(T entity)”입니다.",
      "새로운 Entity 여부는 JpaEntityInformation의 isNew(T entity)로 판단합니다."
    ],
    "keyPoints": [
      "본문",
      "Spring",
      "Data",
      "JPA에서"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-16-follow-up",
    "kind": "follow-up",
    "followUpOf": "quiz-be-16-main",
    "question": "SimpleJpaRepository의 save()는 isNew() 판단 결과에 따라 무엇을 결정하나요?",
    "choices": [
      "테이블을 생성할지 삭제할지 결정한다",
      "락을 걸지 말지 결정한다",
      "커넥션 풀 크기를 결정한다",
      "persist를 할지 merge를 할지 결정한다"
    ],
    "correctIndex": 3,
    "explanation": "save()는 isNew()로 persist 또는 merge 수행을 결정합니다.",
    "categoryId": "persistence-database",
    "sourceId": "be-16",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "evidenceQuote": "SimpleJpaRepository의 `save()` 메서드에서 `isNew()`를 사용하여 persist를 수행할지 merge를 수행할지 결정합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "followUpOrder": 1,
    "followUpRole": "core",
    "sourceHeading": "새로운 Entity인지 판단하는게 왜 중요할까요?",
    "sourceAnchor": "새로운-entity인지-판단하는게-왜-중요할까요",
    "choiceFeedback": [
      "“테이블을 생성할지 삭제할지 결정한다”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “persist를 할지 merge를 할지 결정한다”입니다.",
      "“락을 걸지 말지 결정한다”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “persist를 할지 merge를 할지 결정한다”입니다.",
      "“커넥션 풀 크기를 결정한다”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “persist를 할지 merge를 할지 결정한다”입니다.",
      "save()는 isNew()로 persist 또는 merge 수행을 결정합니다."
    ],
    "keyPoints": [
      "새로운 Entity인지 판단하는게 왜 중요할까요?",
      "Spring",
      "Data",
      "JPA에서"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-16-follow-up-2",
    "kind": "follow-up",
    "followUpOf": "quiz-be-16-main",
    "followUpOrder": 2,
    "followUpRole": "core",
    "question": "Spring Data JPA에서 새로운 Entity인지 판단하는 방법은 무엇일까요 원문의 “본문” 구역과 일치하는 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "다른 설정이 없으면 JpaEntityInformation의 구현체 중 JpaMetamodelEntityInformation 클래스가 동작합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 2,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "persistence-database",
    "sourceId": "be-16",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "다른 설정이 없으면 JpaEntityInformation의 구현체 중 JpaMetamodelEntityInformation 클래스가 동작합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “다른 설정이 없으면 JpaEntityInformation의 구현체 중 JpaMetamodelEntityInformation 클래스가 동작합니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “다른 설정이 없으면 JpaEntityInformation의 구현체 중 JpaMetamodelEntityInformation 클래스가 동작합니다.”입니다.",
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “다른 설정이 없으면 JpaEntityInformation의 구현체 중 JpaMetamodelEntityInformation 클래스가 동작합니다.”입니다."
    ],
    "keyPoints": [
      "본문",
      "Spring",
      "Data",
      "JPA에서"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-16-follow-up-3",
    "kind": "follow-up",
    "followUpOf": "quiz-be-16-main",
    "followUpOrder": 3,
    "followUpRole": "remediation",
    "question": "Spring Data JPA에서 새로운 Entity인지 판단하는 방법은 무엇일까요의 핵심 근거를 다시 확인할 때 옳은 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.",
      "`@Version`이 사용된 필드가 없거나 `@Version`이 사용된 필드가 primitive 타입이면 AbstractEntityInformation의 `isNew()`를 호출합니다."
    ],
    "correctIndex": 3,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "persistence-database",
    "sourceId": "be-16",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "`@Version`이 사용된 필드가 없거나 `@Version`이 사용된 필드가 primitive 타입이면 AbstractEntityInformation의 `isNew()`를 호출합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “`@Version`이 사용된 필드가 없거나 `@Version`이 사용된 필드가 primitive 타입이면 AbstractEntityInformation의 `isNew()`를 호출합니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “`@Version`이 사용된 필드가 없거나 `@Version`이 사용된 필드가 primitive 타입이면 AbstractEntityInformation의 `isNew()`를 호출합니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “`@Version`이 사용된 필드가 없거나 `@Version`이 사용된 필드가 primitive 타입이면 AbstractEntityInformation의 `isNew()`를 호출합니다.”입니다.",
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다."
    ],
    "keyPoints": [
      "본문",
      "Spring",
      "Data",
      "JPA에서"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-17-main",
    "kind": "main",
    "followUpOf": null,
    "question": "Spring Boot의 ddl-auto 옵션은 무엇을 제어하나요?",
    "choices": [
      "JPA 구현체를 사용할 때 데이터베이스 스키마 관리",
      "HTTP 요청의 타임아웃",
      "커넥션 풀의 최대 개수",
      "트랜잭션 격리 수준만"
    ],
    "correctIndex": 0,
    "explanation": "ddl-auto는 Hibernate 같은 JPA 구현체 사용 시 스키마 관리를 제어하는 설정입니다.",
    "categoryId": "persistence-database",
    "sourceId": "be-17",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "evidenceQuote": "ddl-auto 옵션은 스프링 부트 애플리케이션에서 Hibernate와 같은 JPA 구현체를 사용할 때 데이터베이스 스키마 관리를 제어하는 설정입니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "followUpOrder": null,
    "followUpRole": null,
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "choiceFeedback": [
      "ddl-auto는 Hibernate 같은 JPA 구현체 사용 시 스키마 관리를 제어하는 설정입니다.",
      "“HTTP 요청의 타임아웃”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “JPA 구현체를 사용할 때 데이터베이스 스키마 관리”입니다.",
      "“커넥션 풀의 최대 개수”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “JPA 구현체를 사용할 때 데이터베이스 스키마 관리”입니다.",
      "“트랜잭션 격리 수준만”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “JPA 구현체를 사용할 때 데이터베이스 스키마 관리”입니다."
    ],
    "keyPoints": [
      "본문",
      "JPA의",
      "ddl-auto",
      "옵션은"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-17-follow-up",
    "kind": "follow-up",
    "followUpOf": "quiz-be-17-main",
    "question": "ddl-auto를 create로 설정했을 때 애플리케이션 시작 시 일어나는 일은 무엇인가요?",
    "choices": [
      "기존 스키마를 삭제하고 새 스키마를 생성한다",
      "기존 스키마만 검증하고 바꾸지 않는다",
      "종료 시에만 스키마를 삭제한다",
      "어떤 스키마 작업도 수행하지 않는다"
    ],
    "correctIndex": 0,
    "explanation": "create는 시작 시 기존 스키마를 삭제하고 새로 생성하므로 기존 데이터가 삭제됩니다.",
    "categoryId": "persistence-database",
    "sourceId": "be-17",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "evidenceQuote": "`create`는 애플리케이션이 시작될 때 기존 스키마를 삭제하고 새로 생성합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "followUpOrder": 1,
    "followUpRole": "core",
    "sourceHeading": "각 옵션에 대한 설명을 해주시겠어요?",
    "sourceAnchor": "각-옵션에-대한-설명을-해주시겠어요",
    "choiceFeedback": [
      "create는 시작 시 기존 스키마를 삭제하고 새로 생성하므로 기존 데이터가 삭제됩니다.",
      "“기존 스키마만 검증하고 바꾸지 않는다”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “기존 스키마를 삭제하고 새 스키마를 생성한다”입니다.",
      "“종료 시에만 스키마를 삭제한다”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “기존 스키마를 삭제하고 새 스키마를 생성한다”입니다.",
      "“어떤 스키마 작업도 수행하지 않는다”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “기존 스키마를 삭제하고 새 스키마를 생성한다”입니다."
    ],
    "keyPoints": [
      "각 옵션에 대한 설명을 해주시겠어요?",
      "JPA의",
      "ddl-auto",
      "옵션은"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-17-follow-up-2",
    "kind": "follow-up",
    "followUpOf": "quiz-be-17-main",
    "followUpOrder": 2,
    "followUpRole": "core",
    "question": "JPA의 ddl-auto 옵션은 각각 어떤 동작을 하고 어떤 상황에서 사용해야 할까요 원문의 “본문” 구역과 일치하는 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.",
      "properties` 또는 `application."
    ],
    "correctIndex": 3,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "persistence-database",
    "sourceId": "be-17",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "properties` 또는 `application.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “properties` 또는 `application.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “properties` 또는 `application.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “properties` 또는 `application.”입니다.",
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다."
    ],
    "keyPoints": [
      "본문",
      "JPA의",
      "ddl-auto",
      "옵션은"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-17-follow-up-3",
    "kind": "follow-up",
    "followUpOf": "quiz-be-17-main",
    "followUpOrder": 3,
    "followUpRole": "remediation",
    "question": "JPA의 ddl-auto 옵션은 각각 어떤 동작을 하고 어떤 상황에서 사용해야 할까요의 핵심 근거를 다시 확인할 때 옳은 설명은 무엇인가요?",
    "choices": [
      "yml` 파일에서 설정할 수 있으며, 다양한 값에 따라 데이터베이스 스키마에 대해 다른 동작을 수행합니다.",
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 0,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "persistence-database",
    "sourceId": "be-17",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "yml` 파일에서 설정할 수 있으며, 다양한 값에 따라 데이터베이스 스키마에 대해 다른 동작을 수행합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “yml` 파일에서 설정할 수 있으며, 다양한 값에 따라 데이터베이스 스키마에 대해 다른 동작을 수행합니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “yml` 파일에서 설정할 수 있으며, 다양한 값에 따라 데이터베이스 스키마에 대해 다른 동작을 수행합니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “yml` 파일에서 설정할 수 있으며, 다양한 값에 따라 데이터베이스 스키마에 대해 다른 동작을 수행합니다.”입니다."
    ],
    "keyPoints": [
      "본문",
      "JPA의",
      "ddl-auto",
      "옵션은"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-18-main",
    "kind": "main",
    "followUpOf": null,
    "question": "JPA에서 영속성 컨텍스트란 무엇인가요?",
    "choices": [
      "SQL 문자열을 만드는 라이브러리",
      "엔티티를 영구 저장하는 환경",
      "데이터베이스 서버의 백업 공간",
      "HTTP 세션을 보관하는 컨테이너"
    ],
    "correctIndex": 1,
    "explanation": "영속성 컨텍스트는 엔티티를 영구 저장하는 환경입니다.",
    "categoryId": "persistence-database",
    "sourceId": "be-18",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "evidenceQuote": "영속성 컨텍스트는 엔티티를 영구 저장하는 환경으로",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "followUpOrder": null,
    "followUpRole": null,
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "choiceFeedback": [
      "“SQL 문자열을 만드는 라이브러리”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “엔티티를 영구 저장하는 환경”입니다.",
      "영속성 컨텍스트는 엔티티를 영구 저장하는 환경입니다.",
      "“데이터베이스 서버의 백업 공간”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “엔티티를 영구 저장하는 환경”입니다.",
      "“HTTP 세션을 보관하는 컨테이너”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “엔티티를 영구 저장하는 환경”입니다."
    ],
    "keyPoints": [
      "본문",
      "엔티티",
      "매니저에",
      "대해"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-18-follow-up",
    "kind": "follow-up",
    "followUpOf": "quiz-be-18-main",
    "question": "영속성 컨텍스트와 관련된 작업을 도와주는 것은 무엇인가요?",
    "choices": [
      "JDBC Statement",
      "엔티티 매니저",
      "웹 브라우저",
      "로드 밸런서"
    ],
    "correctIndex": 1,
    "explanation": "영속성 컨텍스트 관련 작업을 도와주는 것은 엔티티 매니저입니다.",
    "categoryId": "persistence-database",
    "sourceId": "be-18",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "evidenceQuote": "이런 작업을 도와주는 것이 바로 엔티티 매니저입니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "followUpOrder": 1,
    "followUpRole": "core",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "choiceFeedback": [
      "“JDBC Statement”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “엔티티 매니저”입니다.",
      "영속성 컨텍스트 관련 작업을 도와주는 것은 엔티티 매니저입니다.",
      "“웹 브라우저”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “엔티티 매니저”입니다.",
      "“로드 밸런서”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “엔티티 매니저”입니다."
    ],
    "keyPoints": [
      "본문",
      "엔티티",
      "매니저에",
      "대해"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-18-follow-up-2",
    "kind": "follow-up",
    "followUpOf": "quiz-be-18-main",
    "followUpOrder": 2,
    "followUpRole": "core",
    "question": "엔티티 매니저 원문의 “본문” 구역과 일치하는 설명은 무엇인가요?",
    "choices": [
      "엔티티 매니저에 대해 알기 위해선 영속성 컨텍스트에 대해 알아야 합니다.",
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 0,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "persistence-database",
    "sourceId": "be-18",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "엔티티 매니저에 대해 알기 위해선 영속성 컨텍스트에 대해 알아야 합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “엔티티 매니저에 대해 알기 위해선 영속성 컨텍스트에 대해 알아야 합니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “엔티티 매니저에 대해 알기 위해선 영속성 컨텍스트에 대해 알아야 합니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “엔티티 매니저에 대해 알기 위해선 영속성 컨텍스트에 대해 알아야 합니다.”입니다."
    ],
    "keyPoints": [
      "본문",
      "엔티티",
      "매니저에",
      "대해"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-18-follow-up-3",
    "kind": "follow-up",
    "followUpOf": "quiz-be-18-main",
    "followUpOrder": 3,
    "followUpRole": "remediation",
    "question": "엔티티 매니저의 핵심 근거를 다시 확인할 때 옳은 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "이러한 효율적인 영속 로직 수행을 위해서 엔티티는 영속성 컨텍스트에 관리되어야 합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 1,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "persistence-database",
    "sourceId": "be-18",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "이러한 효율적인 영속 로직 수행을 위해서 엔티티는 영속성 컨텍스트에 관리되어야 합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “이러한 효율적인 영속 로직 수행을 위해서 엔티티는 영속성 컨텍스트에 관리되어야 합니다.”입니다.",
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “이러한 효율적인 영속 로직 수행을 위해서 엔티티는 영속성 컨텍스트에 관리되어야 합니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “이러한 효율적인 영속 로직 수행을 위해서 엔티티는 영속성 컨텍스트에 관리되어야 합니다.”입니다."
    ],
    "keyPoints": [
      "본문",
      "엔티티",
      "매니저에",
      "대해"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-19-main",
    "kind": "main",
    "followUpOf": null,
    "question": "N+1 문제는 어떤 현상인가요?",
    "choices": [
      "한 번의 쿼리로 N개 테이블을 생성하는 현상",
      "N개 트랜잭션을 하나로 병합하는 현상",
      "조회된 N개 데이터만큼 연관관계 조회 쿼리가 추가로 발생하는 현상",
      "조회 결과가 항상 한 건만 나오는 현상"
    ],
    "correctIndex": 2,
    "explanation": "N+1은 조회된 데이터 수만큼 연관 조회 쿼리가 추가로 발생하는 현상입니다.",
    "categoryId": "persistence-database",
    "sourceId": "be-19",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "evidenceQuote": "조회된 데이터 개수(N)만큼 연관관계의 조회 쿼리가 추가로 발생하는 현상입니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "followUpOrder": null,
    "followUpRole": null,
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "choiceFeedback": [
      "“한 번의 쿼리로 N개 테이블을 생성하는 현상”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “조회된 N개 데이터만큼 연관관계 조회 쿼리가 추가로 발생하는 현상”입니다.",
      "“N개 트랜잭션을 하나로 병합하는 현상”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “조회된 N개 데이터만큼 연관관계 조회 쿼리가 추가로 발생하는 현상”입니다.",
      "N+1은 조회된 데이터 수만큼 연관 조회 쿼리가 추가로 발생하는 현상입니다.",
      "“조회 결과가 항상 한 건만 나오는 현상”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “조회된 N개 데이터만큼 연관관계 조회 쿼리가 추가로 발생하는 현상”입니다."
    ],
    "keyPoints": [
      "본문",
      "JPA의",
      "문제에",
      "대해서"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-19-follow-up",
    "kind": "follow-up",
    "followUpOf": "quiz-be-19-main",
    "question": "게시글 목록을 조회한 뒤 N+1 문제가 발생할 수 있는 예시는 무엇인가요?",
    "choices": [
      "게시글과 댓글을 모두 삭제하는 경우",
      "게시글 ID를 직접 할당하는 경우",
      "각 게시글마다 댓글을 조회하는 추가 쿼리가 발생하는 경우",
      "댓글 테이블에 인덱스를 만드는 경우"
    ],
    "correctIndex": 2,
    "explanation": "원문은 게시글 조회 뒤 각 게시글의 댓글을 조회하는 추가 쿼리를 N+1 예시로 듭니다.",
    "categoryId": "persistence-database",
    "sourceId": "be-19",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "evidenceQuote": "게시글을 조회한 후 각 게시글마다 댓글을 조회하기 위한 추가 쿼리가 발생할 수 있습니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "followUpOrder": 1,
    "followUpRole": "core",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "choiceFeedback": [
      "“게시글과 댓글을 모두 삭제하는 경우”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “각 게시글마다 댓글을 조회하는 추가 쿼리가 발생하는 경우”입니다.",
      "“게시글 ID를 직접 할당하는 경우”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “각 게시글마다 댓글을 조회하는 추가 쿼리가 발생하는 경우”입니다.",
      "원문은 게시글 조회 뒤 각 게시글의 댓글을 조회하는 추가 쿼리를 N+1 예시로 듭니다.",
      "“댓글 테이블에 인덱스를 만드는 경우”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “각 게시글마다 댓글을 조회하는 추가 쿼리가 발생하는 경우”입니다."
    ],
    "keyPoints": [
      "본문",
      "JPA의",
      "문제에",
      "대해서"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-19-follow-up-2",
    "kind": "follow-up",
    "followUpOf": "quiz-be-19-main",
    "followUpOrder": 2,
    "followUpRole": "core",
    "question": "JPA의 N + 1 문제 원문의 “findAll 메서드의 글로벌 패치 전략 별 N + 1 문제 상황에 대해서 설명해주세요.” 구역과 일치하는 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "spring data jpa에서 제공하는 repository의 findAll 메서드입니다!",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 1,
    "explanation": "원문의 “findAll 메서드의 글로벌 패치 전략 별 N + 1 문제 상황에 대해서 설명해주세요.” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "persistence-database",
    "sourceId": "be-19",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "findAll 메서드의 글로벌 패치 전략 별 N + 1 문제 상황에 대해서 설명해주세요.",
    "sourceAnchor": "findall-메서드의-글로벌-패치-전략-별-n-1-문제-상황에-대해서-설명해주세요",
    "evidenceQuote": "spring data jpa에서 제공하는 repository의 findAll 메서드입니다!",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “spring data jpa에서 제공하는 repository의 findAll 메서드입니다!”입니다.",
      "원문의 “findAll 메서드의 글로벌 패치 전략 별 N + 1 문제 상황에 대해서 설명해주세요.” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “spring data jpa에서 제공하는 repository의 findAll 메서드입니다!”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “spring data jpa에서 제공하는 repository의 findAll 메서드입니다!”입니다."
    ],
    "keyPoints": [
      "JPA의",
      "문제에",
      "대해서",
      "Persistence와 데이터베이스"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-19-follow-up-3",
    "kind": "follow-up",
    "followUpOf": "quiz-be-19-main",
    "followUpOrder": 3,
    "followUpRole": "remediation",
    "question": "JPA의 N + 1 문제의 핵심 근거를 다시 확인할 때 옳은 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "글로벌 패치 전략을 즉시로딩으로 설정하고 findAll()을 실행하면 N + 1 문제가 발생합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 2,
    "explanation": "원문의 “findAll 메서드의 글로벌 패치 전략 별 N + 1 문제 상황에 대해서 설명해주세요.” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "persistence-database",
    "sourceId": "be-19",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "findAll 메서드의 글로벌 패치 전략 별 N + 1 문제 상황에 대해서 설명해주세요.",
    "sourceAnchor": "findall-메서드의-글로벌-패치-전략-별-n-1-문제-상황에-대해서-설명해주세요",
    "evidenceQuote": "글로벌 패치 전략을 즉시로딩으로 설정하고 findAll()을 실행하면 N + 1 문제가 발생합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “글로벌 패치 전략을 즉시로딩으로 설정하고 findAll()을 실행하면 N + 1 문제가 발생합니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “글로벌 패치 전략을 즉시로딩으로 설정하고 findAll()을 실행하면 N + 1 문제가 발생합니다.”입니다.",
      "원문의 “findAll 메서드의 글로벌 패치 전략 별 N + 1 문제 상황에 대해서 설명해주세요.” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “글로벌 패치 전략을 즉시로딩으로 설정하고 findAll()을 실행하면 N + 1 문제가 발생합니다.”입니다."
    ],
    "keyPoints": [
      "JPA의",
      "문제에",
      "대해서",
      "Persistence와 데이터베이스"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-22-main",
    "kind": "main",
    "followUpOf": null,
    "question": "데이터베이스 인덱스의 주된 목적은 무엇인가요?",
    "choices": [
      "테이블 검색 속도를 향상시키는 것",
      "모든 행을 암호화하는 것",
      "트랜잭션을 자동 커밋하는 것",
      "테이블의 컬럼 수를 줄이는 것"
    ],
    "correctIndex": 0,
    "explanation": "인덱스는 테이블 검색 속도를 향상시키기 위한 자료구조입니다.",
    "categoryId": "persistence-database",
    "sourceId": "be-22",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "evidenceQuote": "인덱스는 데이터베이스 테이블의 검색 속도를 향상시키기 위한 자료구조로 백과사전의 색인과 같습니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "followUpOrder": null,
    "followUpRole": null,
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "choiceFeedback": [
      "인덱스는 테이블 검색 속도를 향상시키기 위한 자료구조입니다.",
      "“모든 행을 암호화하는 것”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “테이블 검색 속도를 향상시키는 것”입니다.",
      "“트랜잭션을 자동 커밋하는 것”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “테이블 검색 속도를 향상시키는 것”입니다.",
      "“테이블의 컬럼 수를 줄이는 것”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “테이블 검색 속도를 향상시키는 것”입니다."
    ],
    "keyPoints": [
      "본문",
      "데이터베이스",
      "인덱스에",
      "대해서"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-22-follow-up",
    "kind": "follow-up",
    "followUpOf": "quiz-be-22-main",
    "question": "인덱스 사용의 단점으로 원문이 든 것은 무엇인가요?",
    "choices": [
      "INSERT, UPDATE, DELETE 성능이 희생될 수 있다",
      "SELECT를 실행할 수 없게 된다",
      "테이블의 데이터가 자동 삭제된다",
      "데이터베이스 커넥션을 만들 수 없게 된다"
    ],
    "correctIndex": 0,
    "explanation": "인덱스는 검색에 이점이 있지만 쓰기 연산 성능이 희생될 수 있습니다.",
    "categoryId": "persistence-database",
    "sourceId": "be-22",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "evidenceQuote": "이러한 특징으로 인해 인덱스는 INSERT, UPDATE, DELETE의 성능이 희생된다는 것이 단점입니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "followUpOrder": 1,
    "followUpRole": "core",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "choiceFeedback": [
      "인덱스는 검색에 이점이 있지만 쓰기 연산 성능이 희생될 수 있습니다.",
      "“SELECT를 실행할 수 없게 된다”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “INSERT, UPDATE, DELETE 성능이 희생될 수 있다”입니다.",
      "“테이블의 데이터가 자동 삭제된다”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “INSERT, UPDATE, DELETE 성능이 희생될 수 있다”입니다.",
      "“데이터베이스 커넥션을 만들 수 없게 된다”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “INSERT, UPDATE, DELETE 성능이 희생될 수 있다”입니다."
    ],
    "keyPoints": [
      "본문",
      "데이터베이스",
      "인덱스에",
      "대해서"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-22-follow-up-2",
    "kind": "follow-up",
    "followUpOf": "quiz-be-22-main",
    "followUpOrder": 2,
    "followUpRole": "core",
    "question": "데이터베이스 인덱스 원문의 “본문” 구역과 일치하는 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.",
      "저장되는 컬럼의 값을 사용하여 항상 정렬된 상태를 유지하는 것이 특징입니다."
    ],
    "correctIndex": 3,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "persistence-database",
    "sourceId": "be-22",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "저장되는 컬럼의 값을 사용하여 항상 정렬된 상태를 유지하는 것이 특징입니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “저장되는 컬럼의 값을 사용하여 항상 정렬된 상태를 유지하는 것이 특징입니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “저장되는 컬럼의 값을 사용하여 항상 정렬된 상태를 유지하는 것이 특징입니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “저장되는 컬럼의 값을 사용하여 항상 정렬된 상태를 유지하는 것이 특징입니다.”입니다.",
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다."
    ],
    "keyPoints": [
      "본문",
      "데이터베이스",
      "인덱스에",
      "대해서"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-22-follow-up-3",
    "kind": "follow-up",
    "followUpOf": "quiz-be-22-main",
    "followUpOrder": 3,
    "followUpRole": "remediation",
    "question": "데이터베이스 인덱스의 핵심 근거를 다시 확인할 때 옳은 설명은 무엇인가요?",
    "choices": [
      "MySQL InnoDB를 기준으로 설명드리자면, B+Tree와 같은 변형 B-Tree 자료구조를 이용해서 인덱스를 구현합니다.",
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 0,
    "explanation": "원문의 “인덱스는 어떤 자료 구조로 이루어져있나요?” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "persistence-database",
    "sourceId": "be-22",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "인덱스는 어떤 자료 구조로 이루어져있나요?",
    "sourceAnchor": "인덱스는-어떤-자료-구조로-이루어져있나요",
    "evidenceQuote": "MySQL InnoDB를 기준으로 설명드리자면, B+Tree와 같은 변형 B-Tree 자료구조를 이용해서 인덱스를 구현합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "원문의 “인덱스는 어떤 자료 구조로 이루어져있나요?” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “MySQL InnoDB를 기준으로 설명드리자면, B+Tree와 같은 변형 B-Tree 자료구조를 이용해서 인덱스를 구현합니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “MySQL InnoDB를 기준으로 설명드리자면, B+Tree와 같은 변형 B-Tree 자료구조를 이용해서 인덱스를 구현합니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “MySQL InnoDB를 기준으로 설명드리자면, B+Tree와 같은 변형 B-Tree 자료구조를 이용해서 인덱스를 구현합니다.”입니다."
    ],
    "keyPoints": [
      "인덱스는 어떤 자료 구조로 이루어져있나요?",
      "데이터베이스",
      "인덱스에",
      "대해서"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-23-main",
    "kind": "main",
    "followUpOf": null,
    "question": "트랜잭션 격리 수준은 무엇을 뜻하나요?",
    "choices": [
      "데이터베이스 서버를 네트워크와 분리하는 정도",
      "동시 트랜잭션이 서로의 연산에 영향을 받지 않도록 하는 정도",
      "테이블을 물리적으로 나누는 정도",
      "한 트랜잭션의 SQL 문 개수"
    ],
    "correctIndex": 1,
    "explanation": "격리 수준은 동시 실행되는 트랜잭션이 서로 영향을 받지 않도록 하는 정도입니다.",
    "categoryId": "persistence-database",
    "sourceId": "be-23",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "evidenceQuote": "트랜잭션의 격리 수준은 동시에 여러 트랜잭션이 실행될 때 한 트랜잭션이 다른 트랜잭션의 연산에 영향을 받지 않도록 하는 정도를 말합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "followUpOrder": null,
    "followUpRole": null,
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "choiceFeedback": [
      "“데이터베이스 서버를 네트워크와 분리하는 정도”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “동시 트랜잭션이 서로의 연산에 영향을 받지 않도록 하는 정도”입니다.",
      "격리 수준은 동시 실행되는 트랜잭션이 서로 영향을 받지 않도록 하는 정도입니다.",
      "“테이블을 물리적으로 나누는 정도”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “동시 트랜잭션이 서로의 연산에 영향을 받지 않도록 하는 정도”입니다.",
      "“한 트랜잭션의 SQL 문 개수”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “동시 트랜잭션이 서로의 연산에 영향을 받지 않도록 하는 정도”입니다."
    ],
    "keyPoints": [
      "본문",
      "트랜잭션",
      "격리수준은",
      "무엇인가요?"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-23-follow-up",
    "kind": "follow-up",
    "followUpOf": "quiz-be-23-main",
    "question": "높은 격리 수준에 대한 설명으로 맞는 것은 무엇인가요?",
    "choices": [
      "일관성과 동시 처리 능력이 모두 반드시 높아진다",
      "일관성은 보장하지만 동시 처리 능력은 떨어질 수 있다",
      "동시 처리 능력만 낮고 일관성에는 영향이 없다",
      "격리 수준과 동시 처리 능력은 관계가 없다"
    ],
    "correctIndex": 1,
    "explanation": "원문은 높은 격리 수준이 일관성을 보장하지만 동시 처리 능력을 떨어뜨릴 수 있다고 설명합니다.",
    "categoryId": "persistence-database",
    "sourceId": "be-23",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "evidenceQuote": "높은 격리 수준은 데이터의 일관성을 보장하지만, 동시 처리 능력이 떨어질 수 있습니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "followUpOrder": 1,
    "followUpRole": "core",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "choiceFeedback": [
      "“일관성과 동시 처리 능력이 모두 반드시 높아진다”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “일관성은 보장하지만 동시 처리 능력은 떨어질 수 있다”입니다.",
      "원문은 높은 격리 수준이 일관성을 보장하지만 동시 처리 능력을 떨어뜨릴 수 있다고 설명합니다.",
      "“동시 처리 능력만 낮고 일관성에는 영향이 없다”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “일관성은 보장하지만 동시 처리 능력은 떨어질 수 있다”입니다.",
      "“격리 수준과 동시 처리 능력은 관계가 없다”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “일관성은 보장하지만 동시 처리 능력은 떨어질 수 있다”입니다."
    ],
    "keyPoints": [
      "본문",
      "트랜잭션",
      "격리수준은",
      "무엇인가요?"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-23-follow-up-2",
    "kind": "follow-up",
    "followUpOf": "quiz-be-23-main",
    "followUpOrder": 2,
    "followUpRole": "core",
    "question": "트랜잭션 격리수준은 무엇인가요 원문의 “본문” 구역과 일치하는 설명은 무엇인가요?",
    "choices": [
      "낮은 격리 수준은 동시 처리 능력을 높이지만, 데이터의 일관성 문제를 발생시킬 수 있습니다.",
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 0,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "persistence-database",
    "sourceId": "be-23",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "낮은 격리 수준은 동시 처리 능력을 높이지만, 데이터의 일관성 문제를 발생시킬 수 있습니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “낮은 격리 수준은 동시 처리 능력을 높이지만, 데이터의 일관성 문제를 발생시킬 수 있습니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “낮은 격리 수준은 동시 처리 능력을 높이지만, 데이터의 일관성 문제를 발생시킬 수 있습니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “낮은 격리 수준은 동시 처리 능력을 높이지만, 데이터의 일관성 문제를 발생시킬 수 있습니다.”입니다."
    ],
    "keyPoints": [
      "본문",
      "트랜잭션",
      "격리수준은",
      "무엇인가요?"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-23-follow-up-3",
    "kind": "follow-up",
    "followUpOf": "quiz-be-23-main",
    "followUpOrder": 3,
    "followUpRole": "remediation",
    "question": "트랜잭션 격리수준은 무엇인가요의 핵심 근거를 다시 확인할 때 옳은 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "트랜잭션 격리 수준은 개발자가 트랜잭션 격리 수준을 설정할 수 있는 기능을 제공하는 기능입니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 1,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "persistence-database",
    "sourceId": "be-23",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "트랜잭션 격리 수준은 개발자가 트랜잭션 격리 수준을 설정할 수 있는 기능을 제공하는 기능입니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “트랜잭션 격리 수준은 개발자가 트랜잭션 격리 수준을 설정할 수 있는 기능을 제공하는 기능입니다.”입니다.",
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “트랜잭션 격리 수준은 개발자가 트랜잭션 격리 수준을 설정할 수 있는 기능을 제공하는 기능입니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “트랜잭션 격리 수준은 개발자가 트랜잭션 격리 수준을 설정할 수 있는 기능을 제공하는 기능입니다.”입니다."
    ],
    "keyPoints": [
      "본문",
      "트랜잭션",
      "격리수준은",
      "무엇인가요?"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-26-main",
    "kind": "main",
    "followUpOf": null,
    "question": "JPA에서 ID를 생성하는 방식으로 원문이 제시한 것은 무엇인가요?",
    "choices": [
      "직접 할당과 자동 할당",
      "단일 테이블과 조인 테이블",
      "낙관적 락과 비관적 락",
      "동기 호출과 비동기 호출"
    ],
    "correctIndex": 0,
    "explanation": "JPA ID 생성에는 직접 할당과 자동 할당을 사용할 수 있습니다.",
    "categoryId": "persistence-database",
    "sourceId": "be-26",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "evidenceQuote": "JPA에서 ID를 생성하기 위해서는 직접 할당과 자동 할당을 사용할 수 있습니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "followUpOrder": null,
    "followUpRole": null,
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "choiceFeedback": [
      "JPA ID 생성에는 직접 할당과 자동 할당을 사용할 수 있습니다.",
      "“단일 테이블과 조인 테이블”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “직접 할당과 자동 할당”입니다.",
      "“낙관적 락과 비관적 락”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “직접 할당과 자동 할당”입니다.",
      "“동기 호출과 비동기 호출”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “직접 할당과 자동 할당”입니다."
    ],
    "keyPoints": [
      "본문",
      "JPA에서",
      "ID",
      "생성"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-26-follow-up",
    "kind": "follow-up",
    "followUpOf": "quiz-be-26-main",
    "question": "JPA에서 자동 ID 할당을 설정하는 방법으로 맞는 것은 무엇인가요?",
    "choices": [
      "@Id와 @GeneratedValue를 함께 사용해 키 생성 전략을 선택한다",
      "@Version만 사용해 키 생성 전략을 선택한다",
      "@Column만 사용해 키 생성을 자동화한다",
      "@Query만 사용해 키 생성 전략을 선택한다"
    ],
    "correctIndex": 0,
    "explanation": "자동 할당은 @Id와 @GeneratedValue를 함께 사용해 원하는 키 생성 전략을 선택합니다.",
    "categoryId": "persistence-database",
    "sourceId": "be-26",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "evidenceQuote": "자동 할당은 `@Id`와 `@GeneratedValue`를 함께 사용해서 원하는 키 생성 전략을 선택하는 방식입니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "followUpOrder": 1,
    "followUpRole": "core",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "choiceFeedback": [
      "자동 할당은 @Id와 @GeneratedValue를 함께 사용해 원하는 키 생성 전략을 선택합니다.",
      "“@Version만 사용해 키 생성 전략을 선택한다”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “@Id와 @GeneratedValue를 함께 사용해 키 생성 전략을 선택한다”입니다.",
      "“@Column만 사용해 키 생성을 자동화한다”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “@Id와 @GeneratedValue를 함께 사용해 키 생성 전략을 선택한다”입니다.",
      "“@Query만 사용해 키 생성 전략을 선택한다”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “@Id와 @GeneratedValue를 함께 사용해 키 생성 전략을 선택한다”입니다."
    ],
    "keyPoints": [
      "본문",
      "JPA에서",
      "ID",
      "생성"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-26-follow-up-2",
    "kind": "follow-up",
    "followUpOf": "quiz-be-26-main",
    "followUpOrder": 2,
    "followUpRole": "core",
    "question": "JPA에서 ID 생성 전략 원문의 “본문” 구역과 일치하는 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.",
      "직접 할당은 `@Id`어노테이션만을 사용하여 Id값을 직접 할당하는 방식입니다."
    ],
    "correctIndex": 3,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "persistence-database",
    "sourceId": "be-26",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "직접 할당은 `@Id`어노테이션만을 사용하여 Id값을 직접 할당하는 방식입니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “직접 할당은 `@Id`어노테이션만을 사용하여 Id값을 직접 할당하는 방식입니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “직접 할당은 `@Id`어노테이션만을 사용하여 Id값을 직접 할당하는 방식입니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “직접 할당은 `@Id`어노테이션만을 사용하여 Id값을 직접 할당하는 방식입니다.”입니다.",
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다."
    ],
    "keyPoints": [
      "본문",
      "JPA에서",
      "ID",
      "생성"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-26-follow-up-3",
    "kind": "follow-up",
    "followUpOf": "quiz-be-26-main",
    "followUpOrder": 3,
    "followUpRole": "remediation",
    "question": "JPA에서 ID 생성 전략의 핵심 근거를 다시 확인할 때 옳은 설명은 무엇인가요?",
    "choices": [
      "`@GeneratedValue`의 stretagy 옵션을 통해 생성 전략을 설정할 수 있는데, 여기에 올 수 있는 값인 GenerationType는 다음과 같습니다.",
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 0,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "persistence-database",
    "sourceId": "be-26",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "`@GeneratedValue`의 stretagy 옵션을 통해 생성 전략을 설정할 수 있는데, 여기에 올 수 있는 값인 GenerationType는 다음과 같습니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “`@GeneratedValue`의 stretagy 옵션을 통해 생성 전략을 설정할 수 있는데, 여기에 올 수 있는 값인 GenerationType는 다음과 같습니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “`@GeneratedValue`의 stretagy 옵션을 통해 생성 전략을 설정할 수 있는데, 여기에 올 수 있는 값인 GenerationType는 다음과 같습니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “`@GeneratedValue`의 stretagy 옵션을 통해 생성 전략을 설정할 수 있는데, 여기에 올 수 있는 값인 GenerationType는 다음과 같습니다.”입니다."
    ],
    "keyPoints": [
      "본문",
      "JPA에서",
      "ID",
      "생성"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-36-main",
    "kind": "main",
    "followUpOf": null,
    "question": "애플리케이션이 데이터베이스와 통신하려면 무엇이 필요한가요?",
    "choices": [
      "HTTP 쿠키",
      "데이터베이스 커넥션",
      "뷰 리졸버",
      "JPA 엔티티 스캔"
    ],
    "correctIndex": 1,
    "explanation": "애플리케이션과 데이터베이스의 통신에는 데이터베이스 커넥션이 필요합니다.",
    "categoryId": "persistence-database",
    "sourceId": "be-36",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "evidenceQuote": "애플리케이션과 데이터베이스가 통신을 하기 위해서는 데이터베이스 커넥션이 필요합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "followUpOrder": null,
    "followUpRole": null,
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "choiceFeedback": [
      "“HTTP 쿠키”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “데이터베이스 커넥션”입니다.",
      "애플리케이션과 데이터베이스의 통신에는 데이터베이스 커넥션이 필요합니다.",
      "“뷰 리졸버”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “데이터베이스 커넥션”입니다.",
      "“JPA 엔티티 스캔”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “데이터베이스 커넥션”입니다."
    ],
    "keyPoints": [
      "본문",
      "데이터베이스",
      "커넥션",
      "Connection"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-36-follow-up",
    "kind": "follow-up",
    "followUpOf": "quiz-be-36-main",
    "question": "커넥션 풀은 어떤 기법인가요?",
    "choices": [
      "매 요청마다 데이터베이스 스키마를 새로 만드는 기법",
      "미리 생성한 데이터베이스 연결을 재사용하는 기법",
      "조회 결과를 브라우저에 영구 보관하는 기법",
      "SQL 문자열을 자동 암호화하는 기법"
    ],
    "correctIndex": 1,
    "explanation": "커넥션 풀은 미리 생성해 둔 DB 연결을 재사용합니다.",
    "categoryId": "persistence-database",
    "sourceId": "be-36",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "evidenceQuote": "커넥션 풀(Connection Pool)은 애플리케이션과 데이터베이스 간의 데이터베이스 연결(Connection)을 미리 생성해두고, 이를 재사용하는 기법을 말합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "followUpOrder": 1,
    "followUpRole": "core",
    "sourceHeading": "데이터베이스 커넥션 풀을 사용함으로써 얻을 수 있는 장점은 무엇인가요?",
    "sourceAnchor": "데이터베이스-커넥션-풀을-사용함으로써-얻을-수-있는-장점은-무엇인가요",
    "choiceFeedback": [
      "“매 요청마다 데이터베이스 스키마를 새로 만드는 기법”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “미리 생성한 데이터베이스 연결을 재사용하는 기법”입니다.",
      "커넥션 풀은 미리 생성해 둔 DB 연결을 재사용합니다.",
      "“조회 결과를 브라우저에 영구 보관하는 기법”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “미리 생성한 데이터베이스 연결을 재사용하는 기법”입니다.",
      "“SQL 문자열을 자동 암호화하는 기법”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “미리 생성한 데이터베이스 연결을 재사용하는 기법”입니다."
    ],
    "keyPoints": [
      "데이터베이스",
      "커넥션",
      "Connection",
      "Pool"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-36-follow-up-2",
    "kind": "follow-up",
    "followUpOf": "quiz-be-36-main",
    "followUpOrder": 2,
    "followUpRole": "core",
    "question": "데이터베이스 커넥션 풀(Connection Pool)을 사용하지 않으면 어떤 문제가 발생할 수 있나요 원문의 “본문” 구역과 일치하는 설명은 무엇인가요?",
    "choices": [
      "데이터베이스 드라이버를 사용하여 데이터베이스에 연결",
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 0,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "persistence-database",
    "sourceId": "be-36",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "데이터베이스 드라이버를 사용하여 데이터베이스에 연결",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “데이터베이스 드라이버를 사용하여 데이터베이스에 연결”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “데이터베이스 드라이버를 사용하여 데이터베이스에 연결”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “데이터베이스 드라이버를 사용하여 데이터베이스에 연결”입니다."
    ],
    "keyPoints": [
      "본문",
      "데이터베이스",
      "커넥션",
      "Connection"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-36-follow-up-3",
    "kind": "follow-up",
    "followUpOf": "quiz-be-36-main",
    "followUpOrder": 3,
    "followUpRole": "remediation",
    "question": "데이터베이스 커넥션 풀(Connection Pool)을 사용하지 않으면 어떤 문제가 발생할 수 있나요의 핵심 근거를 다시 확인할 때 옳은 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "데이터 읽기/쓰기를 위한 [TCP 소켓](https://en.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 1,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "persistence-database",
    "sourceId": "be-36",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "데이터 읽기/쓰기를 위한 [TCP 소켓](https://en.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “데이터 읽기/쓰기를 위한 [TCP 소켓](https://en.”입니다.",
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “데이터 읽기/쓰기를 위한 [TCP 소켓](https://en.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “데이터 읽기/쓰기를 위한 [TCP 소켓](https://en.”입니다."
    ],
    "keyPoints": [
      "본문",
      "데이터베이스",
      "커넥션",
      "Connection"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-39-main",
    "kind": "main",
    "followUpOf": null,
    "question": "원문이 제시한 대표적인 동시성 제어 방식 조합은 무엇인가요?",
    "choices": [
      "MVCC와 Lock-Based Concurrency Control",
      "DDL과 DML",
      "HTTP와 HTTPS",
      "ORM과 JDBC"
    ],
    "correctIndex": 0,
    "explanation": "대표적인 동시성 제어 방식으로 MVCC와 Lock-Based Concurrency Control이 있습니다.",
    "categoryId": "persistence-database",
    "sourceId": "be-39",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "evidenceQuote": "대표적인 동시성 제어 방식으로 **MVCC(Multi-Version Concurrency Control)** 와 **Lock-Based Concurrency Control**이 있습니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "followUpOrder": null,
    "followUpRole": null,
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "choiceFeedback": [
      "대표적인 동시성 제어 방식으로 MVCC와 Lock-Based Concurrency Control이 있습니다.",
      "“DDL과 DML”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “MVCC와 Lock-Based Concurrency Control”입니다.",
      "“HTTP와 HTTPS”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “MVCC와 Lock-Based Concurrency Control”입니다.",
      "“ORM과 JDBC”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “MVCC와 Lock-Based Concurrency Control”입니다."
    ],
    "keyPoints": [
      "본문",
      "데이터베이스",
      "시스템에서",
      "동시성을"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-39-follow-up",
    "kind": "follow-up",
    "followUpOf": "quiz-be-39-main",
    "question": "MySQL InnoDB의 동시성 제어에 대한 설명으로 맞는 것은 무엇인가요?",
    "choices": [
      "MVCC와 Lock-Based 방식의 장점을 결합해 동시성을 최적화한다",
      "MVCC 없이 배타 락만 사용한다",
      "동시성 제어 기능을 제공하지 않는다",
      "읽기 작업마다 테이블 전체를 삭제한다"
    ],
    "correctIndex": 0,
    "explanation": "원문은 InnoDB가 두 방식의 장점을 결합해 동시성 제어를 최적화한다고 설명합니다.",
    "categoryId": "persistence-database",
    "sourceId": "be-39",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "evidenceQuote": "MySQL의 InnoDB는 MVCC와 Lock-Based 방식의 장점을 결합하여 동시성 제어를 최적화합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "followUpOrder": 1,
    "followUpRole": "core",
    "sourceHeading": "MVCC와 Lock-Based Concurrency Control 둘 중 어떤 걸 사용해야 하나요?",
    "sourceAnchor": "mvcc와-lock-based-concurrency-control-둘-중-어떤-걸-사용해야-하나요",
    "choiceFeedback": [
      "원문은 InnoDB가 두 방식의 장점을 결합해 동시성 제어를 최적화한다고 설명합니다.",
      "“MVCC 없이 배타 락만 사용한다”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “MVCC와 Lock-Based 방식의 장점을 결합해 동시성을 최적화한다”입니다.",
      "“동시성 제어 기능을 제공하지 않는다”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “MVCC와 Lock-Based 방식의 장점을 결합해 동시성을 최적화한다”입니다.",
      "“읽기 작업마다 테이블 전체를 삭제한다”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “MVCC와 Lock-Based 방식의 장점을 결합해 동시성을 최적화한다”입니다."
    ],
    "keyPoints": [
      "데이터베이스",
      "시스템에서",
      "동시성을",
      "제어하는"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-39-follow-up-2",
    "kind": "follow-up",
    "followUpOf": "quiz-be-39-main",
    "followUpOrder": 2,
    "followUpRole": "core",
    "question": "데이터베이스 시스템에서 동시성을 제어하는 방법 원문의 “MVCC(Multi-Version Concurrency Control)” 구역과 일치하는 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.",
      "MVCC는 데이터의 여러 버전을 유지하여 트랜잭션이 동시에 데이터를 읽고 쓸 수 있도록 하는 방식입니다."
    ],
    "correctIndex": 3,
    "explanation": "원문의 “MVCC(Multi-Version Concurrency Control)” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "persistence-database",
    "sourceId": "be-39",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "MVCC(Multi-Version Concurrency Control)",
    "sourceAnchor": "mvccmulti-version-concurrency-control",
    "evidenceQuote": "MVCC는 데이터의 여러 버전을 유지하여 트랜잭션이 동시에 데이터를 읽고 쓸 수 있도록 하는 방식입니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “MVCC는 데이터의 여러 버전을 유지하여 트랜잭션이 동시에 데이터를 읽고 쓸 수 있도록 하는 방식입니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “MVCC는 데이터의 여러 버전을 유지하여 트랜잭션이 동시에 데이터를 읽고 쓸 수 있도록 하는 방식입니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “MVCC는 데이터의 여러 버전을 유지하여 트랜잭션이 동시에 데이터를 읽고 쓸 수 있도록 하는 방식입니다.”입니다.",
      "원문의 “MVCC(Multi-Version Concurrency Control)” 구역이 정답 선택지의 내용을 직접 설명합니다."
    ],
    "keyPoints": [
      "데이터베이스",
      "시스템에서",
      "동시성을",
      "제어하는"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-39-follow-up-3",
    "kind": "follow-up",
    "followUpOf": "quiz-be-39-main",
    "followUpOrder": 3,
    "followUpRole": "remediation",
    "question": "데이터베이스 시스템에서 동시성을 제어하는 방법의 핵심 근거를 다시 확인할 때 옳은 설명은 무엇인가요?",
    "choices": [
      "각 트랜잭션은 자신만의 **일관된 스냅샷**을 기반으로 데이터를 읽어, 다른 트랜잭션의 변경 사항에 영향을 받지 않습니다.",
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 0,
    "explanation": "원문의 “MVCC(Multi-Version Concurrency Control)” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "persistence-database",
    "sourceId": "be-39",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "MVCC(Multi-Version Concurrency Control)",
    "sourceAnchor": "mvccmulti-version-concurrency-control",
    "evidenceQuote": "각 트랜잭션은 자신만의 **일관된 스냅샷**을 기반으로 데이터를 읽어, 다른 트랜잭션의 변경 사항에 영향을 받지 않습니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "원문의 “MVCC(Multi-Version Concurrency Control)” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “각 트랜잭션은 자신만의 **일관된 스냅샷**을 기반으로 데이터를 읽어, 다른 트랜잭션의 변경 사항에 영향을 받지 않습니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “각 트랜잭션은 자신만의 **일관된 스냅샷**을 기반으로 데이터를 읽어, 다른 트랜잭션의 변경 사항에 영향을 받지 않습니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “각 트랜잭션은 자신만의 **일관된 스냅샷**을 기반으로 데이터를 읽어, 다른 트랜잭션의 변경 사항에 영향을 받지 않습니다.”입니다."
    ],
    "keyPoints": [
      "데이터베이스",
      "시스템에서",
      "동시성을",
      "제어하는"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-40-main",
    "kind": "main",
    "followUpOf": null,
    "question": "팬텀 리드란 어떤 현상인가요?",
    "choices": [
      "같은 조건의 쿼리를 반복할 때 처음 없던 새 행이 나중에 나타나는 현상",
      "같은 행의 값이 수정 전후로 달라지는 현상만",
      "트랜잭션이 읽은 행을 다른 트랜잭션이 삭제하지 못하는 현상",
      "조회한 모든 행이 항상 중복되는 현상"
    ],
    "correctIndex": 0,
    "explanation": "팬텀 리드는 반복 쿼리에서 처음에는 없던 새 행이 나타나는 현상입니다.",
    "categoryId": "persistence-database",
    "sourceId": "be-40",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "evidenceQuote": "Phantom Read는 트랜잭션이 동일한 조건의 쿼리를 반복 실행할 때, 나중에 실행된 쿼리에서 처음에는 존재하지 않았던 새로운 행이 나타나는 현상을 말합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "followUpOrder": null,
    "followUpRole": null,
    "sourceHeading": "Phantom Read란 무엇인가요?",
    "sourceAnchor": "phantom-read란-무엇인가요",
    "choiceFeedback": [
      "팬텀 리드는 반복 쿼리에서 처음에는 없던 새 행이 나타나는 현상입니다.",
      "“같은 행의 값이 수정 전후로 달라지는 현상만”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “같은 조건의 쿼리를 반복할 때 처음 없던 새 행이 나중에 나타나는 현상”입니다.",
      "“트랜잭션이 읽은 행을 다른 트랜잭션이 삭제하지 못하는 현상”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “같은 조건의 쿼리를 반복할 때 처음 없던 새 행이 나중에 나타나는 현상”입니다.",
      "“조회한 모든 행이 항상 중복되는 현상”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “같은 조건의 쿼리를 반복할 때 처음 없던 새 행이 나중에 나타나는 현상”입니다."
    ],
    "keyPoints": [
      "Phantom Read란 무엇인가요?",
      "MySQL",
      "InnoDB에서",
      "갭락과"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-40-follow-up",
    "kind": "follow-up",
    "followUpOf": "quiz-be-40-main",
    "question": "팬텀 리드가 발생할 수 있는 원인으로 원문이 든 것은 무엇인가요?",
    "choices": [
      "다른 트랜잭션이 데이터를 삽입하거나 삭제하는 것",
      "같은 트랜잭션이 SELECT를 한 번 실행하는 것",
      "커넥션 풀 크기를 늘리는 것",
      "DDL-auto를 validate로 설정하는 것"
    ],
    "correctIndex": 0,
    "explanation": "팬텀 리드는 다른 트랜잭션의 삽입이나 삭제로 발생할 수 있습니다.",
    "categoryId": "persistence-database",
    "sourceId": "be-40",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "evidenceQuote": "데이터의 삽입이나 삭제가 다른 트랜잭션에 의해 이루어질 때 발생합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "followUpOrder": 1,
    "followUpRole": "core",
    "sourceHeading": "Phantom Read란 무엇인가요?",
    "sourceAnchor": "phantom-read란-무엇인가요",
    "choiceFeedback": [
      "팬텀 리드는 다른 트랜잭션의 삽입이나 삭제로 발생할 수 있습니다.",
      "“같은 트랜잭션이 SELECT를 한 번 실행하는 것”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “다른 트랜잭션이 데이터를 삽입하거나 삭제하는 것”입니다.",
      "“커넥션 풀 크기를 늘리는 것”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “다른 트랜잭션이 데이터를 삽입하거나 삭제하는 것”입니다.",
      "“DDL-auto를 validate로 설정하는 것”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “다른 트랜잭션이 데이터를 삽입하거나 삭제하는 것”입니다."
    ],
    "keyPoints": [
      "Phantom Read란 무엇인가요?",
      "MySQL",
      "InnoDB에서",
      "갭락과"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-40-follow-up-2",
    "kind": "follow-up",
    "followUpOf": "quiz-be-40-main",
    "followUpOrder": 2,
    "followUpRole": "core",
    "question": "MySQL InnoDB에서 갭락과 넥스트키 락이란 무엇이며, 어떻게 팬텀 리드를 방지하나요 원문의 “갭락(Gap Lock)이란?” 구역과 일치하는 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.",
      "갭 락은 특정 인덱스 값 사이의 **공간**을 잠그는 락입니다."
    ],
    "correctIndex": 3,
    "explanation": "원문의 “갭락(Gap Lock)이란?” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "persistence-database",
    "sourceId": "be-40",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "갭락(Gap Lock)이란?",
    "sourceAnchor": "갭락gap-lock이란",
    "evidenceQuote": "갭 락은 특정 인덱스 값 사이의 **공간**을 잠그는 락입니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “갭 락은 특정 인덱스 값 사이의 **공간**을 잠그는 락입니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “갭 락은 특정 인덱스 값 사이의 **공간**을 잠그는 락입니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “갭 락은 특정 인덱스 값 사이의 **공간**을 잠그는 락입니다.”입니다.",
      "원문의 “갭락(Gap Lock)이란?” 구역이 정답 선택지의 내용을 직접 설명합니다."
    ],
    "keyPoints": [
      "갭락(Gap Lock)이란?",
      "MySQL",
      "InnoDB에서",
      "갭락과"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-40-follow-up-3",
    "kind": "follow-up",
    "followUpOf": "quiz-be-40-main",
    "followUpOrder": 3,
    "followUpRole": "remediation",
    "question": "MySQL InnoDB에서 갭락과 넥스트키 락이란 무엇이며, 어떻게 팬텀 리드를 방지하나요의 핵심 근거를 다시 확인할 때 옳은 설명은 무엇인가요?",
    "choices": [
      "기존 레코드 간의 간격을 보호하여 새로운 레코드의 삽입을 방지합니다.",
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 0,
    "explanation": "원문의 “갭락(Gap Lock)이란?” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "persistence-database",
    "sourceId": "be-40",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "갭락(Gap Lock)이란?",
    "sourceAnchor": "갭락gap-lock이란",
    "evidenceQuote": "기존 레코드 간의 간격을 보호하여 새로운 레코드의 삽입을 방지합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "원문의 “갭락(Gap Lock)이란?” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “기존 레코드 간의 간격을 보호하여 새로운 레코드의 삽입을 방지합니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “기존 레코드 간의 간격을 보호하여 새로운 레코드의 삽입을 방지합니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “기존 레코드 간의 간격을 보호하여 새로운 레코드의 삽입을 방지합니다.”입니다."
    ],
    "keyPoints": [
      "갭락(Gap Lock)이란?",
      "MySQL",
      "InnoDB에서",
      "갭락과"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-50-main",
    "kind": "main",
    "followUpOf": null,
    "question": "DB Replication은 주로 무엇을 위해 활용되나요?",
    "choices": [
      "JPA 엔티티의 자동 생성",
      "데이터베이스의 고가용성과 데이터 안정성 보장",
      "SQL 문법의 단순화",
      "웹 페이지의 렌더링 속도 향상"
    ],
    "correctIndex": 1,
    "explanation": "DB Replication은 고가용성과 데이터 안정성을 보장하기 위해 활용됩니다.",
    "categoryId": "persistence-database",
    "sourceId": "be-50",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "evidenceQuote": "DB Replication은 데이터베이스의 고가용성과 데이터 안정성을 보장하기 위해 널리 활용되는 핵심 기술입니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "followUpOrder": null,
    "followUpRole": null,
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "choiceFeedback": [
      "“JPA 엔티티의 자동 생성”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “데이터베이스의 고가용성과 데이터 안정성 보장”입니다.",
      "DB Replication은 고가용성과 데이터 안정성을 보장하기 위해 활용됩니다.",
      "“SQL 문법의 단순화”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “데이터베이스의 고가용성과 데이터 안정성 보장”입니다.",
      "“웹 페이지의 렌더링 속도 향상”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “데이터베이스의 고가용성과 데이터 안정성 보장”입니다."
    ],
    "keyPoints": [
      "본문",
      "DB",
      "Replication에",
      "대해서"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-50-follow-up",
    "kind": "follow-up",
    "followUpOf": "quiz-be-50-main",
    "question": "Replication 구성에서 중요하다고 설명한 것은 무엇인가요?",
    "choices": [
      "모든 Replica의 스키마를 매번 삭제하는 것",
      "원본 서버와 Replica 서버 간 데이터 동기화",
      "원본 서버에서만 읽기 요청을 처리하는 것",
      "복제 서버를 하나의 JVM에만 두는 것"
    ],
    "correctIndex": 1,
    "explanation": "Replication에서는 원본과 Replica 간의 데이터 동기화가 필수입니다.",
    "categoryId": "persistence-database",
    "sourceId": "be-50",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "evidenceQuote": "원본(Source) 서버와 복제(Replica) 서버 간의 데이터 동기화는 필수입니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "followUpOrder": 1,
    "followUpRole": "core",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "choiceFeedback": [
      "“모든 Replica의 스키마를 매번 삭제하는 것”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “원본 서버와 Replica 서버 간 데이터 동기화”입니다.",
      "Replication에서는 원본과 Replica 간의 데이터 동기화가 필수입니다.",
      "“원본 서버에서만 읽기 요청을 처리하는 것”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “원본 서버와 Replica 서버 간 데이터 동기화”입니다.",
      "“복제 서버를 하나의 JVM에만 두는 것”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “원본 서버와 Replica 서버 간 데이터 동기화”입니다."
    ],
    "keyPoints": [
      "본문",
      "DB",
      "Replication에",
      "대해서"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-50-follow-up-2",
    "kind": "follow-up",
    "followUpOf": "quiz-be-50-main",
    "followUpOrder": 2,
    "followUpRole": "core",
    "question": "DB Replication 원문의 “바이너리 로그(Binary log)를 저장하는 방식은?” 구역과 일치하는 설명은 무엇인가요?",
    "choices": [
      "Replication은 Source 서버에서 발생하는 모든 데이터 변경 사항을 Replica 서버로 복제하여 두 서버 간의 데이터 일관성을 유지하는 메커니즘입니다.",
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 0,
    "explanation": "원문의 “바이너리 로그(Binary log)를 저장하는 방식은?” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "persistence-database",
    "sourceId": "be-50",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "바이너리 로그(Binary log)를 저장하는 방식은?",
    "sourceAnchor": "바이너리-로그binary-log를-저장하는-방식은",
    "evidenceQuote": "Replication은 Source 서버에서 발생하는 모든 데이터 변경 사항을 Replica 서버로 복제하여 두 서버 간의 데이터 일관성을 유지하는 메커니즘입니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "원문의 “바이너리 로그(Binary log)를 저장하는 방식은?” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “Replication은 Source 서버에서 발생하는 모든 데이터 변경 사항을 Replica 서버로 복제하여 두 서버 간의 데이터 일관성을 유지하는 메커니즘입니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “Replication은 Source 서버에서 발생하는 모든 데이터 변경 사항을 Replica 서버로 복제하여 두 서버 간의 데이터 일관성을 유지하는 메커니즘입니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “Replication은 Source 서버에서 발생하는 모든 데이터 변경 사항을 Replica 서버로 복제하여 두 서버 간의 데이터 일관성을 유지하는 메커니즘입니다.”입니다."
    ],
    "keyPoints": [
      "바이너리 로그(Binary log)를 저장하는 방식은?",
      "DB",
      "Replication에",
      "대해서"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-50-follow-up-3",
    "kind": "follow-up",
    "followUpOf": "quiz-be-50-main",
    "followUpOrder": 3,
    "followUpRole": "remediation",
    "question": "DB Replication의 핵심 근거를 다시 확인할 때 옳은 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "이러한 과정은 주로 Binary log를 기반으로 이루어지며, Binary log는 Source 서버에서 실행된 모든 데이터 변경 쿼리를 기록하는 역할을 합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 1,
    "explanation": "원문의 “바이너리 로그(Binary log)를 저장하는 방식은?” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "persistence-database",
    "sourceId": "be-50",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "바이너리 로그(Binary log)를 저장하는 방식은?",
    "sourceAnchor": "바이너리-로그binary-log를-저장하는-방식은",
    "evidenceQuote": "이러한 과정은 주로 Binary log를 기반으로 이루어지며, Binary log는 Source 서버에서 실행된 모든 데이터 변경 쿼리를 기록하는 역할을 합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “이러한 과정은 주로 Binary log를 기반으로 이루어지며, Binary log는 Source 서버에서 실행된 모든 데이터 변경 쿼리를 기록하는 역할을 합니다.”입니다.",
      "원문의 “바이너리 로그(Binary log)를 저장하는 방식은?” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “이러한 과정은 주로 Binary log를 기반으로 이루어지며, Binary log는 Source 서버에서 실행된 모든 데이터 변경 쿼리를 기록하는 역할을 합니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “이러한 과정은 주로 Binary log를 기반으로 이루어지며, Binary log는 Source 서버에서 실행된 모든 데이터 변경 쿼리를 기록하는 역할을 합니다.”입니다."
    ],
    "keyPoints": [
      "바이너리 로그(Binary log)를 저장하는 방식은?",
      "DB",
      "Replication에",
      "대해서"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-57-main",
    "kind": "main",
    "followUpOf": null,
    "question": "ACID의 구성 요소로 맞는 것은 무엇인가요?",
    "choices": [
      "원자성, 일관성, 격리성, 지속성",
      "가용성, 분할 내성, 일관성, 지속성",
      "정규화, 인덱스, 조인, 복제",
      "삽입, 조회, 수정, 삭제"
    ],
    "correctIndex": 0,
    "explanation": "ACID는 원자성·일관성·격리성·지속성의 약자입니다.",
    "categoryId": "persistence-database",
    "sourceId": "be-57",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "evidenceQuote": "ACID는 원자성(Atomicity), 일관성(Consistency), 격리성(Isolation), 지속성(Durability)의 약자이며",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "followUpOrder": null,
    "followUpRole": null,
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "choiceFeedback": [
      "ACID는 원자성·일관성·격리성·지속성의 약자입니다.",
      "“가용성, 분할 내성, 일관성, 지속성”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “원자성, 일관성, 격리성, 지속성”입니다.",
      "“정규화, 인덱스, 조인, 복제”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “원자성, 일관성, 격리성, 지속성”입니다.",
      "“삽입, 조회, 수정, 삭제”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “원자성, 일관성, 격리성, 지속성”입니다."
    ],
    "keyPoints": [
      "본문",
      "ACID에",
      "대해서",
      "Persistence와 데이터베이스"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-57-follow-up",
    "kind": "follow-up",
    "followUpOf": "quiz-be-57-main",
    "question": "ACID가 의미하는 바를 가장 잘 설명한 것은 무엇인가요?",
    "choices": [
      "데이터베이스 트랜잭션이 안전하게 수행됨을 보장하는 성질",
      "데이터베이스의 물리 저장 장치를 선택하는 규칙",
      "모든 쿼리를 비동기로 만드는 기법",
      "테이블을 문서 형식으로 바꾸는 방식"
    ],
    "correctIndex": 0,
    "explanation": "ACID는 트랜잭션의 안전한 수행을 보장하기 위한 성질입니다.",
    "categoryId": "persistence-database",
    "sourceId": "be-57",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "evidenceQuote": "데이터베이스 트랜잭션이 안전하게 수행된다는 것을 보장하기 위한 성질을 의미합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "followUpOrder": 1,
    "followUpRole": "core",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "choiceFeedback": [
      "ACID는 트랜잭션의 안전한 수행을 보장하기 위한 성질입니다.",
      "“데이터베이스의 물리 저장 장치를 선택하는 규칙”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “데이터베이스 트랜잭션이 안전하게 수행됨을 보장하는 성질”입니다.",
      "“모든 쿼리를 비동기로 만드는 기법”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “데이터베이스 트랜잭션이 안전하게 수행됨을 보장하는 성질”입니다.",
      "“테이블을 문서 형식으로 바꾸는 방식”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “데이터베이스 트랜잭션이 안전하게 수행됨을 보장하는 성질”입니다."
    ],
    "keyPoints": [
      "본문",
      "ACID에",
      "대해서",
      "Persistence와 데이터베이스"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-57-follow-up-2",
    "kind": "follow-up",
    "followUpOf": "quiz-be-57-main",
    "followUpOrder": 2,
    "followUpRole": "core",
    "question": "ACID 원문의 “각 속성은 어떤 의미를 가지나요?” 구역과 일치하는 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.",
      "**원자성(Atomicity)** 은 트랜잭션 내부 연산들이 부분적으로 실행되고 중단되지 않는 것을 보장합니다."
    ],
    "correctIndex": 3,
    "explanation": "원문의 “각 속성은 어떤 의미를 가지나요?” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "persistence-database",
    "sourceId": "be-57",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "각 속성은 어떤 의미를 가지나요?",
    "sourceAnchor": "각-속성은-어떤-의미를-가지나요",
    "evidenceQuote": "**원자성(Atomicity)** 은 트랜잭션 내부 연산들이 부분적으로 실행되고 중단되지 않는 것을 보장합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “**원자성(Atomicity)** 은 트랜잭션 내부 연산들이 부분적으로 실행되고 중단되지 않는 것을 보장합니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “**원자성(Atomicity)** 은 트랜잭션 내부 연산들이 부분적으로 실행되고 중단되지 않는 것을 보장합니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “**원자성(Atomicity)** 은 트랜잭션 내부 연산들이 부분적으로 실행되고 중단되지 않는 것을 보장합니다.”입니다.",
      "원문의 “각 속성은 어떤 의미를 가지나요?” 구역이 정답 선택지의 내용을 직접 설명합니다."
    ],
    "keyPoints": [
      "각 속성은 어떤 의미를 가지나요?",
      "ACID에",
      "대해서",
      "Persistence와 데이터베이스"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-57-follow-up-3",
    "kind": "follow-up",
    "followUpOf": "quiz-be-57-main",
    "followUpOrder": 3,
    "followUpRole": "remediation",
    "question": "ACID의 핵심 근거를 다시 확인할 때 옳은 설명은 무엇인가요?",
    "choices": [
      "쉽게 말하자면, 트랜잭션은 전체 성공과 전체 실패 중 한 가지만 수행한다는 것입니다.",
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 0,
    "explanation": "원문의 “각 속성은 어떤 의미를 가지나요?” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "persistence-database",
    "sourceId": "be-57",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "각 속성은 어떤 의미를 가지나요?",
    "sourceAnchor": "각-속성은-어떤-의미를-가지나요",
    "evidenceQuote": "쉽게 말하자면, 트랜잭션은 전체 성공과 전체 실패 중 한 가지만 수행한다는 것입니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "원문의 “각 속성은 어떤 의미를 가지나요?” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “쉽게 말하자면, 트랜잭션은 전체 성공과 전체 실패 중 한 가지만 수행한다는 것입니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “쉽게 말하자면, 트랜잭션은 전체 성공과 전체 실패 중 한 가지만 수행한다는 것입니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “쉽게 말하자면, 트랜잭션은 전체 성공과 전체 실패 중 한 가지만 수행한다는 것입니다.”입니다."
    ],
    "keyPoints": [
      "각 속성은 어떤 의미를 가지나요?",
      "ACID에",
      "대해서",
      "Persistence와 데이터베이스"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-61-main",
    "kind": "main",
    "followUpOf": null,
    "question": "관계형 데이터베이스의 데이터 저장 구조로 맞는 것은 무엇인가요?",
    "choices": [
      "키가 없는 단일 문자열 파일에만 저장한다",
      "그래프의 간선에만 저장한다",
      "시계열 데이터만 저장한다",
      "고정된 로우와 컬럼으로 구성된 테이블에 저장한다"
    ],
    "correctIndex": 3,
    "explanation": "관계형 데이터베이스는 고정된 로우와 컬럼으로 구성된 테이블에 데이터를 저장합니다.",
    "categoryId": "persistence-database",
    "sourceId": "be-61",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "evidenceQuote": "**관계형 데이터베이스**는 고정된 로우와 컬럼으로 구성된 테이블에 데이터를 저장합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "followUpOrder": null,
    "followUpRole": null,
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "choiceFeedback": [
      "“키가 없는 단일 문자열 파일에만 저장한다”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “고정된 로우와 컬럼으로 구성된 테이블에 저장한다”입니다.",
      "“그래프의 간선에만 저장한다”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “고정된 로우와 컬럼으로 구성된 테이블에 저장한다”입니다.",
      "“시계열 데이터만 저장한다”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “고정된 로우와 컬럼으로 구성된 테이블에 저장한다”입니다.",
      "관계형 데이터베이스는 고정된 로우와 컬럼으로 구성된 테이블에 데이터를 저장합니다."
    ],
    "keyPoints": [
      "본문",
      "관계형",
      "데이터베이스와",
      "데이터베이스의"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-61-follow-up",
    "kind": "follow-up",
    "followUpOf": "quiz-be-61-main",
    "question": "관계형 데이터베이스에서 여러 테이블의 관계 데이터를 합칠 때 사용하는 것은 무엇인가요?",
    "choices": [
      "캐시 만료",
      "커넥션 재시작",
      "문서 직렬화",
      "SQL 조인"
    ],
    "correctIndex": 3,
    "explanation": "관계형 DB는 SQL로 여러 테이블의 데이터를 관계에 따라 조인해 합칠 수 있습니다.",
    "categoryId": "persistence-database",
    "sourceId": "be-61",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "evidenceQuote": "SQL을 사용하여 여러 테이블에 존재하는 데이터와 관계에 따라서 조인하여 합칠 수도 있습니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "followUpOrder": 1,
    "followUpRole": "core",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "choiceFeedback": [
      "“캐시 만료”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “SQL 조인”입니다.",
      "“커넥션 재시작”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “SQL 조인”입니다.",
      "“문서 직렬화”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “SQL 조인”입니다.",
      "관계형 DB는 SQL로 여러 테이블의 데이터를 관계에 따라 조인해 합칠 수 있습니다."
    ],
    "keyPoints": [
      "본문",
      "관계형",
      "데이터베이스와",
      "데이터베이스의"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-61-follow-up-2",
    "kind": "follow-up",
    "followUpOf": "quiz-be-61-main",
    "followUpOrder": 2,
    "followUpRole": "core",
    "question": "관계형 데이터베이스와 비 관계형 데이터베이스의 차이점은 무엇인가요 원문의 “본문” 구역과 일치하는 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "관계형 데이터베이스는 데이터를 중복 없이 한 번만 저장하고, 데이터 무결성을 보장합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 2,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "persistence-database",
    "sourceId": "be-61",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "관계형 데이터베이스는 데이터를 중복 없이 한 번만 저장하고, 데이터 무결성을 보장합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “관계형 데이터베이스는 데이터를 중복 없이 한 번만 저장하고, 데이터 무결성을 보장합니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “관계형 데이터베이스는 데이터를 중복 없이 한 번만 저장하고, 데이터 무결성을 보장합니다.”입니다.",
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “관계형 데이터베이스는 데이터를 중복 없이 한 번만 저장하고, 데이터 무결성을 보장합니다.”입니다."
    ],
    "keyPoints": [
      "본문",
      "관계형",
      "데이터베이스와",
      "데이터베이스의"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-61-follow-up-3",
    "kind": "follow-up",
    "followUpOf": "quiz-be-61-main",
    "followUpOrder": 3,
    "followUpRole": "remediation",
    "question": "관계형 데이터베이스와 비 관계형 데이터베이스의 차이점은 무엇인가요의 핵심 근거를 다시 확인할 때 옳은 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.",
      "관계형 데이터베이스의 경우 일반적으로 스케일 업을 사용하여 확장합니다."
    ],
    "correctIndex": 3,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "persistence-database",
    "sourceId": "be-61",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "관계형 데이터베이스의 경우 일반적으로 스케일 업을 사용하여 확장합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “관계형 데이터베이스의 경우 일반적으로 스케일 업을 사용하여 확장합니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “관계형 데이터베이스의 경우 일반적으로 스케일 업을 사용하여 확장합니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “관계형 데이터베이스의 경우 일반적으로 스케일 업을 사용하여 확장합니다.”입니다.",
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다."
    ],
    "keyPoints": [
      "본문",
      "관계형",
      "데이터베이스와",
      "데이터베이스의"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-94-main",
    "kind": "main",
    "followUpOf": null,
    "question": "데이터베이스 정규화의 목적은 무엇인가요?",
    "choices": [
      "모든 테이블을 하나로 합치는 것",
      "중복 데이터를 최소화하고 데이터 무결성을 보장하도록 테이블을 정리하는 것",
      "조회 성능만 높이기 위해 인덱스를 만드는 것",
      "트랜잭션 격리 수준을 낮추는 것"
    ],
    "correctIndex": 1,
    "explanation": "정규화는 테이블을 정리해 중복을 최소화하고 무결성을 보장하는 과정입니다.",
    "categoryId": "persistence-database",
    "sourceId": "be-94",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "evidenceQuote": "데이터베이스에서 **정규화(Normalization)** 는 테이블을 정리하여 중복 데이터를 최소화하고, 데이터 무결성을 보장하는 과정을 의미합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "followUpOrder": null,
    "followUpRole": null,
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "choiceFeedback": [
      "“모든 테이블을 하나로 합치는 것”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “중복 데이터를 최소화하고 데이터 무결성을 보장하도록 테이블을 정리하는 것”입니다.",
      "정규화는 테이블을 정리해 중복을 최소화하고 무결성을 보장하는 과정입니다.",
      "“조회 성능만 높이기 위해 인덱스를 만드는 것”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “중복 데이터를 최소화하고 데이터 무결성을 보장하도록 테이블을 정리하는 것”입니다.",
      "“트랜잭션 격리 수준을 낮추는 것”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “중복 데이터를 최소화하고 데이터 무결성을 보장하도록 테이블을 정리하는 것”입니다."
    ],
    "keyPoints": [
      "본문",
      "데이터베이스",
      "정규화에",
      "대해서"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-94-follow-up",
    "kind": "follow-up",
    "followUpOf": "quiz-be-94-main",
    "question": "정규화로 해결할 수 있다고 원문이 설명한 문제는 무엇인가요?",
    "choices": [
      "네트워크 패킷 손실",
      "삽입·갱신·삭제 이상 현상",
      "JVM 가비지 컬렉션 지연",
      "HTTP 인증 실패"
    ],
    "correctIndex": 1,
    "explanation": "정규화는 삽입·갱신·삭제 이상 현상을 해결할 수 있습니다.",
    "categoryId": "persistence-database",
    "sourceId": "be-94",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "evidenceQuote": "삽입·갱신·삭제 이상(Anomaly) 현상을 해결할 수 있습니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "followUpOrder": 1,
    "followUpRole": "core",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "choiceFeedback": [
      "“네트워크 패킷 손실”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “삽입·갱신·삭제 이상 현상”입니다.",
      "정규화는 삽입·갱신·삭제 이상 현상을 해결할 수 있습니다.",
      "“JVM 가비지 컬렉션 지연”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “삽입·갱신·삭제 이상 현상”입니다.",
      "“HTTP 인증 실패”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “삽입·갱신·삭제 이상 현상”입니다."
    ],
    "keyPoints": [
      "본문",
      "데이터베이스",
      "정규화에",
      "대해서"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-94-follow-up-2",
    "kind": "follow-up",
    "followUpOf": "quiz-be-94-main",
    "followUpOrder": 2,
    "followUpRole": "core",
    "question": "데이터베이스 정규화 원문의 “본문” 구역과 일치하는 설명은 무엇인가요?",
    "choices": [
      "정규화는 여러 단계가 존재하며, 대표적으로 1정규화(1NF), 2정규화(2NF), 3정규화(3NF), BCNF가 있습니다.",
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 0,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "persistence-database",
    "sourceId": "be-94",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "정규화는 여러 단계가 존재하며, 대표적으로 1정규화(1NF), 2정규화(2NF), 3정규화(3NF), BCNF가 있습니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “정규화는 여러 단계가 존재하며, 대표적으로 1정규화(1NF), 2정규화(2NF), 3정규화(3NF), BCNF가 있습니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “정규화는 여러 단계가 존재하며, 대표적으로 1정규화(1NF), 2정규화(2NF), 3정규화(3NF), BCNF가 있습니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “정규화는 여러 단계가 존재하며, 대표적으로 1정규화(1NF), 2정규화(2NF), 3정규화(3NF), BCNF가 있습니다.”입니다."
    ],
    "keyPoints": [
      "본문",
      "데이터베이스",
      "정규화에",
      "대해서"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-94-follow-up-3",
    "kind": "follow-up",
    "followUpOf": "quiz-be-94-main",
    "followUpOrder": 3,
    "followUpRole": "remediation",
    "question": "데이터베이스 정규화의 핵심 근거를 다시 확인할 때 옳은 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "**1 정규화(1NF)** 는 테이블 컬럼의 값이 원자값(Atomic Value)을 가지도록 정리하는 것을 의미합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 1,
    "explanation": "원문의 “각 정규화 단계를 설명해주세요.” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "persistence-database",
    "sourceId": "be-94",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "각 정규화 단계를 설명해주세요.",
    "sourceAnchor": "각-정규화-단계를-설명해주세요",
    "evidenceQuote": "**1 정규화(1NF)** 는 테이블 컬럼의 값이 원자값(Atomic Value)을 가지도록 정리하는 것을 의미합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “**1 정규화(1NF)** 는 테이블 컬럼의 값이 원자값(Atomic Value)을 가지도록 정리하는 것을 의미합니다.”입니다.",
      "원문의 “각 정규화 단계를 설명해주세요.” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “**1 정규화(1NF)** 는 테이블 컬럼의 값이 원자값(Atomic Value)을 가지도록 정리하는 것을 의미합니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “**1 정규화(1NF)** 는 테이블 컬럼의 값이 원자값(Atomic Value)을 가지도록 정리하는 것을 의미합니다.”입니다."
    ],
    "keyPoints": [
      "각 정규화 단계를 설명해주세요.",
      "데이터베이스",
      "정규화에",
      "대해서"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-110-main",
    "kind": "main",
    "followUpOf": null,
    "question": "양방향 OneToOne에서 Lazy Loading이 동작하지 않는 경우는 무엇인가요?",
    "choices": [
      "연관관계의 주인 엔티티를 조회할 때만",
      "ManyToOne을 사용할 때만",
      "연관관계의 주인이 아닌 엔티티를 조회할 때",
      "엔티티에 ID가 있을 때만"
    ],
    "correctIndex": 2,
    "explanation": "양방향 OneToOne에서는 연관관계 주인이 아닌 엔티티 조회 시 Lazy Loading이 동작하지 않습니다.",
    "categoryId": "persistence-database",
    "sourceId": "be-110",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "evidenceQuote": "양방향 @OneToOne일 때 **연관관계의 주인이 아닌 엔티티를 조회**할 경우 Lazy Loading이 동작하지 않습니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "followUpOrder": null,
    "followUpRole": null,
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "choiceFeedback": [
      "“연관관계의 주인 엔티티를 조회할 때만”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “연관관계의 주인이 아닌 엔티티를 조회할 때”입니다.",
      "“ManyToOne을 사용할 때만”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “연관관계의 주인이 아닌 엔티티를 조회할 때”입니다.",
      "양방향 OneToOne에서는 연관관계 주인이 아닌 엔티티 조회 시 Lazy Loading이 동작하지 않습니다.",
      "“엔티티에 ID가 있을 때만”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “연관관계의 주인이 아닌 엔티티를 조회할 때”입니다."
    ],
    "keyPoints": [
      "본문",
      "@OneToOne",
      "연관관계에서",
      "Lazy"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-110-follow-up",
    "kind": "follow-up",
    "followUpOf": "quiz-be-110-main",
    "question": "연관 엔티티가 존재하고 Lazy Loading이 설정되어 있을 때 JPA의 초기화 방식은 무엇인가요?",
    "choices": [
      "즉시 null로 초기화한다",
      "연관 엔티티를 삭제한다",
      "프록시 객체로 초기화한다",
      "새로운 커넥션 풀을 생성한다"
    ],
    "correctIndex": 2,
    "explanation": "연관 엔티티가 있고 Lazy Loading이 설정되어 있으면 JPA는 프록시 객체로 초기화합니다.",
    "categoryId": "persistence-database",
    "sourceId": "be-110",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "evidenceQuote": "JPA는 연관된 엔티티가 없으면 null로 초기화하고, 있으면 Lazy Loading이 설정되어 있을 경우 프록시 객체로 초기화합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "followUpOrder": 1,
    "followUpRole": "core",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "choiceFeedback": [
      "“즉시 null로 초기화한다”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “프록시 객체로 초기화한다”입니다.",
      "“연관 엔티티를 삭제한다”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “프록시 객체로 초기화한다”입니다.",
      "연관 엔티티가 있고 Lazy Loading이 설정되어 있으면 JPA는 프록시 객체로 초기화합니다.",
      "“새로운 커넥션 풀을 생성한다”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “프록시 객체로 초기화한다”입니다."
    ],
    "keyPoints": [
      "본문",
      "@OneToOne",
      "연관관계에서",
      "Lazy"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-110-follow-up-2",
    "kind": "follow-up",
    "followUpOf": "quiz-be-110-main",
    "followUpOrder": 2,
    "followUpRole": "core",
    "question": "@OneToOne 연관관계에서 Lazy Loading을 설정할 때 주의할 점은 무엇일까요 원문의 “본문” 구역과 일치하는 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "하지만 데이터베이스의 테이블 관점에서 보면, 연관관계의 주인이 아닌 엔티티는 연관관계를 참조할 FK가 없기 때문에 연관관계의 존재 여부를 알지 못합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 1,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "persistence-database",
    "sourceId": "be-110",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "하지만 데이터베이스의 테이블 관점에서 보면, 연관관계의 주인이 아닌 엔티티는 연관관계를 참조할 FK가 없기 때문에 연관관계의 존재 여부를 알지 못합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “하지만 데이터베이스의 테이블 관점에서 보면, 연관관계의 주인이 아닌 엔티티는 연관관계를 참조할 FK가 없기 때문에 연관관계의 존재 여부를 알지 못합니다.”입니다.",
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “하지만 데이터베이스의 테이블 관점에서 보면, 연관관계의 주인이 아닌 엔티티는 연관관계를 참조할 FK가 없기 때문에 연관관계의 존재 여부를 알지 못합니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “하지만 데이터베이스의 테이블 관점에서 보면, 연관관계의 주인이 아닌 엔티티는 연관관계를 참조할 FK가 없기 때문에 연관관계의 존재 여부를 알지 못합니다.”입니다."
    ],
    "keyPoints": [
      "본문",
      "@OneToOne",
      "연관관계에서",
      "Lazy"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-110-follow-up-3",
    "kind": "follow-up",
    "followUpOf": "quiz-be-110-main",
    "followUpOrder": 3,
    "followUpRole": "remediation",
    "question": "@OneToOne 연관관계에서 Lazy Loading을 설정할 때 주의할 점은 무엇일까요의 핵심 근거를 다시 확인할 때 옳은 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "그래서 JPA는 null 혹은 프록시 객체 중 무엇으로 초기화할지 결정할 수 없게 되고, 결과적으로 연관된 엔티티의 존재 여부를 확인하는 추가 쿼리를 실행하기 때문에 Lazy Loading이 동작하지 않습니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 2,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "persistence-database",
    "sourceId": "be-110",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "그래서 JPA는 null 혹은 프록시 객체 중 무엇으로 초기화할지 결정할 수 없게 되고, 결과적으로 연관된 엔티티의 존재 여부를 확인하는 추가 쿼리를 실행하기 때문에 Lazy Loading이 동작하지 않습니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “그래서 JPA는 null 혹은 프록시 객체 중 무엇으로 초기화할지 결정할 수 없게 되고, 결과적으로 연관된 엔티티의 존재 여부를 확인하는 추가 쿼리를 실행하기 때문에 Lazy Loading이 동작하지 않습니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “그래서 JPA는 null 혹은 프록시 객체 중 무엇으로 초기화할지 결정할 수 없게 되고, 결과적으로 연관된 엔티티의 존재 여부를 확인하는 추가 쿼리를 실행하기 때문에 Lazy Loading이 동작하지 않습니다.”입니다.",
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “그래서 JPA는 null 혹은 프록시 객체 중 무엇으로 초기화할지 결정할 수 없게 되고, 결과적으로 연관된 엔티티의 존재 여부를 확인하는 추가 쿼리를 실행하기 때문에 Lazy Loading이 동작하지 않습니다.”입니다."
    ],
    "keyPoints": [
      "본문",
      "@OneToOne",
      "연관관계에서",
      "Lazy"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-120-main",
    "kind": "main",
    "followUpOf": null,
    "question": "낙관적 락과 비관적 락은 무엇을 위한 주요 기법인가요?",
    "choices": [
      "데이터베이스 스키마 자동 생성",
      "HTTP 요청 압축",
      "로그 파일 보관",
      "데이터베이스 트랜잭션의 동시성 제어"
    ],
    "correctIndex": 3,
    "explanation": "낙관적 락과 비관적 락은 트랜잭션 동시성 제어를 위한 주요 기법입니다.",
    "categoryId": "persistence-database",
    "sourceId": "be-120",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "evidenceQuote": "낙관적 락과 비관적 락은 데이터베이스 트랜잭션에서 동시성 제어를 위한 주요 기법입니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "followUpOrder": null,
    "followUpRole": null,
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "choiceFeedback": [
      "“데이터베이스 스키마 자동 생성”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “데이터베이스 트랜잭션의 동시성 제어”입니다.",
      "“HTTP 요청 압축”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “데이터베이스 트랜잭션의 동시성 제어”입니다.",
      "“로그 파일 보관”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “데이터베이스 트랜잭션의 동시성 제어”입니다.",
      "낙관적 락과 비관적 락은 트랜잭션 동시성 제어를 위한 주요 기법입니다."
    ],
    "keyPoints": [
      "본문",
      "낙관적",
      "락과",
      "비관적"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-120-follow-up",
    "kind": "follow-up",
    "followUpOf": "quiz-be-120-main",
    "question": "낙관적 락의 동작 방식으로 맞는 것은 무엇인가요?",
    "choices": [
      "데이터를 읽기 전에 항상 락을 설정한다",
      "동시에 접근한 트랜잭션을 모두 즉시 롤백한다",
      "수정 시 충돌을 확인하지 않는다",
      "충돌이 적다고 가정하고 수정할 때 충돌 여부를 확인한다"
    ],
    "correctIndex": 3,
    "explanation": "낙관적 락은 읽을 때 락을 설정하지 않고 수정 시 충돌 여부를 확인합니다.",
    "categoryId": "persistence-database",
    "sourceId": "be-120",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "evidenceQuote": "**낙관적 락(Optimistic Lock)** 은 데이터 충돌이 적을 것으로 가정하고, 데이터를 읽을 때 락을 설정하지 않고 트랜잭션이 데이터를 수정할 때 충돌이 발생하지 않았는지 확인하는 방식입니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "followUpOrder": 1,
    "followUpRole": "core",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "choiceFeedback": [
      "“데이터를 읽기 전에 항상 락을 설정한다”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “충돌이 적다고 가정하고 수정할 때 충돌 여부를 확인한다”입니다.",
      "“동시에 접근한 트랜잭션을 모두 즉시 롤백한다”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “충돌이 적다고 가정하고 수정할 때 충돌 여부를 확인한다”입니다.",
      "“수정 시 충돌을 확인하지 않는다”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “충돌이 적다고 가정하고 수정할 때 충돌 여부를 확인한다”입니다.",
      "낙관적 락은 읽을 때 락을 설정하지 않고 수정 시 충돌 여부를 확인합니다."
    ],
    "keyPoints": [
      "본문",
      "낙관적",
      "락과",
      "비관적"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-120-follow-up-2",
    "kind": "follow-up",
    "followUpOf": "quiz-be-120-main",
    "followUpOrder": 2,
    "followUpRole": "core",
    "question": "낙관적 락과 비관적 락 원문의 “본문” 구역과 일치하는 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "데이터 무결성을 유지하면서 여러 트랜잭션이 동시에 데이터에 접근할 때 발생할 수 있는 충돌을 해결할 때 사용됩니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 2,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "persistence-database",
    "sourceId": "be-120",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "데이터 무결성을 유지하면서 여러 트랜잭션이 동시에 데이터에 접근할 때 발생할 수 있는 충돌을 해결할 때 사용됩니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “데이터 무결성을 유지하면서 여러 트랜잭션이 동시에 데이터에 접근할 때 발생할 수 있는 충돌을 해결할 때 사용됩니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “데이터 무결성을 유지하면서 여러 트랜잭션이 동시에 데이터에 접근할 때 발생할 수 있는 충돌을 해결할 때 사용됩니다.”입니다.",
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “데이터 무결성을 유지하면서 여러 트랜잭션이 동시에 데이터에 접근할 때 발생할 수 있는 충돌을 해결할 때 사용됩니다.”입니다."
    ],
    "keyPoints": [
      "본문",
      "낙관적",
      "락과",
      "비관적"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-120-follow-up-3",
    "kind": "follow-up",
    "followUpOf": "quiz-be-120-main",
    "followUpOrder": 3,
    "followUpRole": "remediation",
    "question": "낙관적 락과 비관적 락의 핵심 근거를 다시 확인할 때 옳은 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.",
      "보통 version과 같은 별도의 구분 컬럼을 사용해서 데이터가 변경되었는지 확인하며, 충돌이 발생하면 데이터베이스가 아닌 애플리케이션에서 직접 롤백하거나 재시도 처리를 해야 합니다."
    ],
    "correctIndex": 3,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "persistence-database",
    "sourceId": "be-120",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "보통 version과 같은 별도의 구분 컬럼을 사용해서 데이터가 변경되었는지 확인하며, 충돌이 발생하면 데이터베이스가 아닌 애플리케이션에서 직접 롤백하거나 재시도 처리를 해야 합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “보통 version과 같은 별도의 구분 컬럼을 사용해서 데이터가 변경되었는지 확인하며, 충돌이 발생하면 데이터베이스가 아닌 애플리케이션에서 직접 롤백하거나 재시도 처리를 해야 합니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “보통 version과 같은 별도의 구분 컬럼을 사용해서 데이터가 변경되었는지 확인하며, 충돌이 발생하면 데이터베이스가 아닌 애플리케이션에서 직접 롤백하거나 재시도 처리를 해야 합니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “보통 version과 같은 별도의 구분 컬럼을 사용해서 데이터가 변경되었는지 확인하며, 충돌이 발생하면 데이터베이스가 아닌 애플리케이션에서 직접 롤백하거나 재시도 처리를 해야 합니다.”입니다.",
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다."
    ],
    "keyPoints": [
      "본문",
      "낙관적",
      "락과",
      "비관적"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-121-main",
    "kind": "main",
    "followUpOf": null,
    "question": "페이징 쿼리는 어떤 때 사용하나요?",
    "choices": [
      "전체 데이터를 부분적으로 나누어 조회하거나 처리할 때",
      "모든 데이터를 한 번에 삭제할 때",
      "테이블의 스키마를 변경할 때",
      "트랜잭션을 중첩할 때"
    ],
    "correctIndex": 0,
    "explanation": "페이징 쿼리는 전체 데이터를 부분으로 나누어 조회·처리할 때 사용합니다.",
    "categoryId": "persistence-database",
    "sourceId": "be-121",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "evidenceQuote": "**페이징 쿼리(Paging Query)** 는 전체 데이터를 부분적으로 나누어 데이터를 조회하거나 처리할 때 사용됩니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "followUpOrder": null,
    "followUpRole": null,
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "choiceFeedback": [
      "페이징 쿼리는 전체 데이터를 부분으로 나누어 조회·처리할 때 사용합니다.",
      "“모든 데이터를 한 번에 삭제할 때”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “전체 데이터를 부분적으로 나누어 조회하거나 처리할 때”입니다.",
      "“테이블의 스키마를 변경할 때”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “전체 데이터를 부분적으로 나누어 조회하거나 처리할 때”입니다.",
      "“트랜잭션을 중첩할 때”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “전체 데이터를 부분적으로 나누어 조회하거나 처리할 때”입니다."
    ],
    "keyPoints": [
      "본문",
      "RDB에서",
      "페이징",
      "쿼리의"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-121-follow-up",
    "kind": "follow-up",
    "followUpOf": "quiz-be-121-main",
    "question": "MySQL에서 페이징 쿼리를 작성할 때 일반적으로 사용하는 구문 조합은 무엇인가요?",
    "choices": [
      "LIMIT과 OFFSET",
      "GROUP BY와 HAVING",
      "CREATE와 DROP",
      "GRANT와 REVOKE"
    ],
    "correctIndex": 0,
    "explanation": "MySQL 페이징 쿼리에는 일반적으로 LIMIT과 OFFSET을 사용합니다.",
    "categoryId": "persistence-database",
    "sourceId": "be-121",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "evidenceQuote": "MySQL에서 페이징 쿼리는 일반적으로 LIMIT, OFFSET 구문을 사용하여 작성합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "followUpOrder": 1,
    "followUpRole": "core",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "choiceFeedback": [
      "MySQL 페이징 쿼리에는 일반적으로 LIMIT과 OFFSET을 사용합니다.",
      "“GROUP BY와 HAVING”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “LIMIT과 OFFSET”입니다.",
      "“CREATE와 DROP”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “LIMIT과 OFFSET”입니다.",
      "“GRANT와 REVOKE”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “LIMIT과 OFFSET”입니다."
    ],
    "keyPoints": [
      "본문",
      "RDB에서",
      "페이징",
      "쿼리의"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-121-follow-up-2",
    "kind": "follow-up",
    "followUpOf": "quiz-be-121-main",
    "followUpOrder": 2,
    "followUpRole": "core",
    "question": "RDB에서 페이징 쿼리의 필요성을 원문의 “본문” 구역과 일치하는 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.",
      "데이터를 상대적으로 작은 단위로 나누어 처리하기 때문에 데이터베이스나 애플리케이션의 리소스 사용 효율이 증가하며, 로직 처리 시간을 단축 시킬 수 있습니다."
    ],
    "correctIndex": 3,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "persistence-database",
    "sourceId": "be-121",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "데이터를 상대적으로 작은 단위로 나누어 처리하기 때문에 데이터베이스나 애플리케이션의 리소스 사용 효율이 증가하며, 로직 처리 시간을 단축 시킬 수 있습니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “데이터를 상대적으로 작은 단위로 나누어 처리하기 때문에 데이터베이스나 애플리케이션의 리소스 사용 효율이 증가하며, 로직 처리 시간을 단축 시킬 수 있습니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “데이터를 상대적으로 작은 단위로 나누어 처리하기 때문에 데이터베이스나 애플리케이션의 리소스 사용 효율이 증가하며, 로직 처리 시간을 단축 시킬 수 있습니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “데이터를 상대적으로 작은 단위로 나누어 처리하기 때문에 데이터베이스나 애플리케이션의 리소스 사용 효율이 증가하며, 로직 처리 시간을 단축 시킬 수 있습니다.”입니다.",
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다."
    ],
    "keyPoints": [
      "본문",
      "RDB에서",
      "페이징",
      "쿼리의"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-121-follow-up-3",
    "kind": "follow-up",
    "followUpOf": "quiz-be-121-main",
    "followUpOrder": 3,
    "followUpRole": "remediation",
    "question": "RDB에서 페이징 쿼리의 필요성을의 핵심 근거를 다시 확인할 때 옳은 설명은 무엇인가요?",
    "choices": [
      "LIMIT, OFFSET 방식의 페이징 쿼리는 뒤에 있는 데이터를 읽을 수록 점점 응답 시간이 길어질 수 있는데요.",
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 0,
    "explanation": "원문의 “LIMIT, OFFSET 방식 페이징 쿼리의 단점은 무엇이고, 어떻게 해결할 수 있나요?” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "persistence-database",
    "sourceId": "be-121",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "LIMIT, OFFSET 방식 페이징 쿼리의 단점은 무엇이고, 어떻게 해결할 수 있나요?",
    "sourceAnchor": "limit-offset-방식-페이징-쿼리의-단점은-무엇이고-어떻게-해결할-수-있나요",
    "evidenceQuote": "LIMIT, OFFSET 방식의 페이징 쿼리는 뒤에 있는 데이터를 읽을 수록 점점 응답 시간이 길어질 수 있는데요.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "원문의 “LIMIT, OFFSET 방식 페이징 쿼리의 단점은 무엇이고, 어떻게 해결할 수 있나요?” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “LIMIT, OFFSET 방식의 페이징 쿼리는 뒤에 있는 데이터를 읽을 수록 점점 응답 시간이 길어질 수 있는데요.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “LIMIT, OFFSET 방식의 페이징 쿼리는 뒤에 있는 데이터를 읽을 수록 점점 응답 시간이 길어질 수 있는데요.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “LIMIT, OFFSET 방식의 페이징 쿼리는 뒤에 있는 데이터를 읽을 수록 점점 응답 시간이 길어질 수 있는데요.”입니다."
    ],
    "keyPoints": [
      "RDB에서",
      "페이징",
      "쿼리의",
      "필요성을"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-126-main",
    "kind": "main",
    "followUpOf": null,
    "question": "행 기반 데이터베이스는 데이터를 어떻게 관리하나요?",
    "choices": [
      "컬럼 이름 없이 바이너리 블록으로만 관리한다",
      "행 단위로 관리한다",
      "그래프 간선 단위로만 관리한다",
      "SQL 없이 문서 단위로만 관리한다"
    ],
    "correctIndex": 1,
    "explanation": "행 기반 데이터베이스는 데이터를 행 단위로 관리하는 DBMS입니다.",
    "categoryId": "persistence-database",
    "sourceId": "be-126",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "evidenceQuote": "**행 기반 데이터베이스(Row-oriented Database)** 는 데이터를 행 단위로 관리하는 DBMS입니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "followUpOrder": null,
    "followUpRole": null,
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "choiceFeedback": [
      "“컬럼 이름 없이 바이너리 블록으로만 관리한다”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “행 단위로 관리한다”입니다.",
      "행 기반 데이터베이스는 데이터를 행 단위로 관리하는 DBMS입니다.",
      "“그래프 간선 단위로만 관리한다”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “행 단위로 관리한다”입니다.",
      "“SQL 없이 문서 단위로만 관리한다”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “행 단위로 관리한다”입니다."
    ],
    "keyPoints": [
      "본문",
      "기반",
      "DB와",
      "DB의"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-126-follow-up",
    "kind": "follow-up",
    "followUpOf": "quiz-be-126-main",
    "question": "행 기반 데이터베이스가 최적화된 연산은 무엇인가요?",
    "choices": [
      "컬럼 단위 집계만 수행하는 연산",
      "행 단위 읽기와 쓰기 연산",
      "그래프 탐색만 수행하는 연산",
      "키-값 조회만 수행하는 연산"
    ],
    "correctIndex": 1,
    "explanation": "행 기반 DB는 행 단위 읽기와 쓰기 연산에 최적화되어 있습니다.",
    "categoryId": "persistence-database",
    "sourceId": "be-126",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "evidenceQuote": "행 단위 읽기 맟 쓰기 연산에 최적화돼 있습니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "followUpOrder": 1,
    "followUpRole": "core",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "choiceFeedback": [
      "“컬럼 단위 집계만 수행하는 연산”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “행 단위 읽기와 쓰기 연산”입니다.",
      "행 기반 DB는 행 단위 읽기와 쓰기 연산에 최적화되어 있습니다.",
      "“그래프 탐색만 수행하는 연산”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “행 단위 읽기와 쓰기 연산”입니다.",
      "“키-값 조회만 수행하는 연산”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “행 단위 읽기와 쓰기 연산”입니다."
    ],
    "keyPoints": [
      "본문",
      "기반",
      "DB와",
      "DB의"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-126-follow-up-2",
    "kind": "follow-up",
    "followUpOf": "quiz-be-126-main",
    "followUpOrder": 2,
    "followUpRole": "core",
    "question": "열 기반 DB와 행 기반 DB의 차이점은 무엇인가요 원문의 “본문” 구역과 일치하는 설명은 무엇인가요?",
    "choices": [
      "PostgreSQL, MySQL이 대표적인 행 기반 데이터베이스입니다.",
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 0,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "persistence-database",
    "sourceId": "be-126",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "PostgreSQL, MySQL이 대표적인 행 기반 데이터베이스입니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “PostgreSQL, MySQL이 대표적인 행 기반 데이터베이스입니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “PostgreSQL, MySQL이 대표적인 행 기반 데이터베이스입니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “PostgreSQL, MySQL이 대표적인 행 기반 데이터베이스입니다.”입니다."
    ],
    "keyPoints": [
      "본문",
      "기반",
      "DB와",
      "DB의"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-126-follow-up-3",
    "kind": "follow-up",
    "followUpOf": "quiz-be-126-main",
    "followUpOrder": 3,
    "followUpRole": "remediation",
    "question": "열 기반 DB와 행 기반 DB의 차이점은 무엇인가요의 핵심 근거를 다시 확인할 때 옳은 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "반면, **열 기반 데이터베이스(Column-oriented Database)** 는 열 기반으로 데이터를 관리한다는 점에서 행 기반 데이터베이스와 차이가 있습니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 1,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "persistence-database",
    "sourceId": "be-126",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "반면, **열 기반 데이터베이스(Column-oriented Database)** 는 열 기반으로 데이터를 관리한다는 점에서 행 기반 데이터베이스와 차이가 있습니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “반면, **열 기반 데이터베이스(Column-oriented Database)** 는 열 기반으로 데이터를 관리한다는 점에서 행 기반 데이터베이스와 차이가 있습니다.”입니다.",
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “반면, **열 기반 데이터베이스(Column-oriented Database)** 는 열 기반으로 데이터를 관리한다는 점에서 행 기반 데이터베이스와 차이가 있습니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “반면, **열 기반 데이터베이스(Column-oriented Database)** 는 열 기반으로 데이터를 관리한다는 점에서 행 기반 데이터베이스와 차이가 있습니다.”입니다."
    ],
    "keyPoints": [
      "본문",
      "기반",
      "DB와",
      "DB의"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-131-main",
    "kind": "main",
    "followUpOf": null,
    "question": "ToMany 관계에서 Fetch Join과 페이징을 함께 사용할 때 주의할 점은 무엇인가요?",
    "choices": [
      "항상 데이터베이스 스키마가 삭제된다",
      "OutOfMemoryError가 발생할 수 있다",
      "JPA가 자동으로 낙관적 락을 설정한다",
      "모든 연관 엔티티가 null이 된다"
    ],
    "correctIndex": 1,
    "explanation": "ToMany Fetch Join과 페이징을 함께 사용하면 OutOfMemoryError가 발생할 수 있습니다.",
    "categoryId": "persistence-database",
    "sourceId": "be-131",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "evidenceQuote": "~ToMany 관계에서 Fetch Join과 페이징을 함께 사용하면 OutOfMemoryError가 발생할 수 있다는 점을 주의해야 합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "followUpOrder": null,
    "followUpRole": null,
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "choiceFeedback": [
      "“항상 데이터베이스 스키마가 삭제된다”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “OutOfMemoryError가 발생할 수 있다”입니다.",
      "ToMany Fetch Join과 페이징을 함께 사용하면 OutOfMemoryError가 발생할 수 있습니다.",
      "“JPA가 자동으로 낙관적 락을 설정한다”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “OutOfMemoryError가 발생할 수 있다”입니다.",
      "“모든 연관 엔티티가 null이 된다”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “OutOfMemoryError가 발생할 수 있다”입니다."
    ],
    "keyPoints": [
      "본문",
      "JPA",
      "Fetch",
      "Join과"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-131-follow-up",
    "kind": "follow-up",
    "followUpOf": "quiz-be-131-main",
    "question": "ToMany Fetch Join과 페이징 조합에서 OOM 가능성이 생기는 이유는 무엇인가요?",
    "choices": [
      "데이터베이스가 페이지 크기만큼 결과를 즉시 삭제하기 때문이다",
      "JPA가 전체 결과를 메모리에 적재한 뒤 가공해 페이징하기 때문이다",
      "Fetch Join이 연관 엔티티를 항상 null로 초기화하기 때문이다",
      "페이징 쿼리가 실행될 때마다 스키마를 새로 만들기 때문이다"
    ],
    "correctIndex": 1,
    "explanation": "카티션 프로덕트 때문에 설정한 페이징 값이 의도대로 동작하기 어려워, JPA가 전체 결과를 메모리에 적재하고 가공한 뒤 페이징합니다.",
    "categoryId": "persistence-database",
    "sourceId": "be-131",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "evidenceQuote": "따라서, 페이징을 위해 설정한 값이 의도한 대로 동작하기 어려워 JPA는 전체 결과를 메모리에 적재한 다음에 가공하여 페이징을 수행합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "followUpOrder": 1,
    "followUpRole": "core",
    "sourceHeading": "왜 OOM이 발생할 수 있나요?",
    "sourceAnchor": "왜-oom이-발생할-수-있나요",
    "choiceFeedback": [
      "“데이터베이스가 페이지 크기만큼 결과를 즉시 삭제하기 때문이다”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “JPA가 전체 결과를 메모리에 적재한 뒤 가공해 페이징하기 때문이다”입니다.",
      "카티션 프로덕트 때문에 설정한 페이징 값이 의도대로 동작하기 어려워, JPA가 전체 결과를 메모리에 적재하고 가공한 뒤 페이징합니다.",
      "“Fetch Join이 연관 엔티티를 항상 null로 초기화하기 때문이다”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “JPA가 전체 결과를 메모리에 적재한 뒤 가공해 페이징하기 때문이다”입니다.",
      "“페이징 쿼리가 실행될 때마다 스키마를 새로 만들기 때문이다”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “JPA가 전체 결과를 메모리에 적재한 뒤 가공해 페이징하기 때문이다”입니다."
    ],
    "keyPoints": [
      "왜 OOM이 발생할 수 있나요?",
      "JPA",
      "Fetch",
      "Join과"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-131-follow-up-2",
    "kind": "follow-up",
    "followUpOf": "quiz-be-131-main",
    "followUpOrder": 2,
    "followUpRole": "core",
    "question": "JPA Fetch Join과 페이징을 함께 사용할 때 주의점을 원문의 “본문” 구역과 일치하는 설명은 무엇인가요?",
    "choices": [
      "예를 들어, 아래와 같이 Product(1)-ProductCategory(N) 관계가 있을 때, ProductJpaRepository의 findProductWithSlice 처럼 Fetch Join과 페이징을 함께 사용하는 경우에 OOM이 발생할 수 있습니다.",
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 0,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "persistence-database",
    "sourceId": "be-131",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "예를 들어, 아래와 같이 Product(1)-ProductCategory(N) 관계가 있을 때, ProductJpaRepository의 findProductWithSlice 처럼 Fetch Join과 페이징을 함께 사용하는 경우에 OOM이 발생할 수 있습니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “예를 들어, 아래와 같이 Product(1)-ProductCategory(N) 관계가 있을 때, ProductJpaRepository의 findProductWithSlice 처럼 Fetch Join과 페이징을 함께 사용하는 경우에 OOM이 발생할 수 있습니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “예를 들어, 아래와 같이 Product(1)-ProductCategory(N) 관계가 있을 때, ProductJpaRepository의 findProductWithSlice 처럼 Fetch Join과 페이징을 함께 사용하는 경우에 OOM이 발생할 수 있습니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “예를 들어, 아래와 같이 Product(1)-ProductCategory(N) 관계가 있을 때, ProductJpaRepository의 findProductWithSlice 처럼 Fetch Join과 페이징을 함께 사용하는 경우에 OOM이 발생할 수 있습니다.”입니다."
    ],
    "keyPoints": [
      "본문",
      "JPA",
      "Fetch",
      "Join과"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-131-follow-up-3",
    "kind": "follow-up",
    "followUpOf": "quiz-be-131-main",
    "followUpOrder": 3,
    "followUpRole": "remediation",
    "question": "JPA Fetch Join과 페이징을 함께 사용할 때 주의점을의 핵심 근거를 다시 확인할 때 옳은 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "실제로 findProductWithSlice를 호출하면 서버에서 다음과 같은 경고 메시지를 보여주는데요.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 1,
    "explanation": "원문의 “왜 OOM이 발생할 수 있나요?” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "persistence-database",
    "sourceId": "be-131",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "왜 OOM이 발생할 수 있나요?",
    "sourceAnchor": "왜-oom이-발생할-수-있나요",
    "evidenceQuote": "실제로 findProductWithSlice를 호출하면 서버에서 다음과 같은 경고 메시지를 보여주는데요.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “실제로 findProductWithSlice를 호출하면 서버에서 다음과 같은 경고 메시지를 보여주는데요.”입니다.",
      "원문의 “왜 OOM이 발생할 수 있나요?” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “실제로 findProductWithSlice를 호출하면 서버에서 다음과 같은 경고 메시지를 보여주는데요.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “실제로 findProductWithSlice를 호출하면 서버에서 다음과 같은 경고 메시지를 보여주는데요.”입니다."
    ],
    "keyPoints": [
      "왜 OOM이 발생할 수 있나요?",
      "JPA",
      "Fetch",
      "Join과"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-136-main",
    "kind": "main",
    "followUpOf": null,
    "question": "물리 삭제는 어떤 방식인가요?",
    "choices": [
      "삭제 여부 컬럼만 UPDATE하는 방식",
      "조회 결과에서만 숨기는 방식",
      "DELETE 명령어로 실제 데이터를 삭제하는 방식",
      "새 테이블로 데이터를 복제하는 방식"
    ],
    "correctIndex": 2,
    "explanation": "물리 삭제는 DELETE 명령으로 실제 데이터를 삭제합니다.",
    "categoryId": "persistence-database",
    "sourceId": "be-136",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "evidenceQuote": "물리 삭제는 DELETE 명령어를 통해 직접 데이터를 삭제하는 방식이며",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "followUpOrder": null,
    "followUpRole": null,
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "choiceFeedback": [
      "“삭제 여부 컬럼만 UPDATE하는 방식”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “DELETE 명령어로 실제 데이터를 삭제하는 방식”입니다.",
      "“조회 결과에서만 숨기는 방식”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “DELETE 명령어로 실제 데이터를 삭제하는 방식”입니다.",
      "물리 삭제는 DELETE 명령으로 실제 데이터를 삭제합니다.",
      "“새 테이블로 데이터를 복제하는 방식”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “DELETE 명령어로 실제 데이터를 삭제하는 방식”입니다."
    ],
    "keyPoints": [
      "본문",
      "논리",
      "삭제와",
      "물리"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-136-follow-up",
    "kind": "follow-up",
    "followUpOf": "quiz-be-136-main",
    "question": "논리 삭제의 구현 방식으로 맞는 것은 무엇인가요?",
    "choices": [
      "DELETE로 행을 즉시 제거한다",
      "테이블 자체를 DROP한다",
      "UPDATE로 삭제 여부를 나타내는 컬럼을 수정한다",
      "인덱스만 삭제한다"
    ],
    "correctIndex": 2,
    "explanation": "논리 삭제는 UPDATE로 삭제 여부 컬럼을 수정하는 방식입니다.",
    "categoryId": "persistence-database",
    "sourceId": "be-136",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "evidenceQuote": "논리 삭제는 UPDATE 명령을 사용하여 삭제를 여부를 나타내는 컬럼을 수정하는 방식을 의미합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "followUpOrder": 1,
    "followUpRole": "core",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "choiceFeedback": [
      "“DELETE로 행을 즉시 제거한다”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “UPDATE로 삭제 여부를 나타내는 컬럼을 수정한다”입니다.",
      "“테이블 자체를 DROP한다”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “UPDATE로 삭제 여부를 나타내는 컬럼을 수정한다”입니다.",
      "논리 삭제는 UPDATE로 삭제 여부 컬럼을 수정하는 방식입니다.",
      "“인덱스만 삭제한다”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “UPDATE로 삭제 여부를 나타내는 컬럼을 수정한다”입니다."
    ],
    "keyPoints": [
      "본문",
      "논리",
      "삭제와",
      "물리"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-136-follow-up-2",
    "kind": "follow-up",
    "followUpOf": "quiz-be-136-main",
    "followUpOrder": 2,
    "followUpRole": "core",
    "question": "논리 삭제와 물리 삭제의 차이점은 무엇인가요 원문의 “본문” 구역과 일치하는 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "데이터베이스에서 데이터를 삭제하는 방법은 크게 **물리 삭제(Hard Delete)** 와 **논리 삭제(Soft Delete)** 가 존재합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 1,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "persistence-database",
    "sourceId": "be-136",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "데이터베이스에서 데이터를 삭제하는 방법은 크게 **물리 삭제(Hard Delete)** 와 **논리 삭제(Soft Delete)** 가 존재합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “데이터베이스에서 데이터를 삭제하는 방법은 크게 **물리 삭제(Hard Delete)** 와 **논리 삭제(Soft Delete)** 가 존재합니다.”입니다.",
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “데이터베이스에서 데이터를 삭제하는 방법은 크게 **물리 삭제(Hard Delete)** 와 **논리 삭제(Soft Delete)** 가 존재합니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “데이터베이스에서 데이터를 삭제하는 방법은 크게 **물리 삭제(Hard Delete)** 와 **논리 삭제(Soft Delete)** 가 존재합니다.”입니다."
    ],
    "keyPoints": [
      "본문",
      "논리",
      "삭제와",
      "물리"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-136-follow-up-3",
    "kind": "follow-up",
    "followUpOf": "quiz-be-136-main",
    "followUpOrder": 3,
    "followUpRole": "remediation",
    "question": "논리 삭제와 물리 삭제의 차이점은 무엇인가요의 핵심 근거를 다시 확인할 때 옳은 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "즉, 물리 삭제는 실제로 데이터를 삭제하는 반면 논리 삭제는 데이터가 삭제되었음을 표시만 한다는 점에서 차이가 있습니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 2,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "persistence-database",
    "sourceId": "be-136",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "즉, 물리 삭제는 실제로 데이터를 삭제하는 반면 논리 삭제는 데이터가 삭제되었음을 표시만 한다는 점에서 차이가 있습니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “즉, 물리 삭제는 실제로 데이터를 삭제하는 반면 논리 삭제는 데이터가 삭제되었음을 표시만 한다는 점에서 차이가 있습니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “즉, 물리 삭제는 실제로 데이터를 삭제하는 반면 논리 삭제는 데이터가 삭제되었음을 표시만 한다는 점에서 차이가 있습니다.”입니다.",
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “즉, 물리 삭제는 실제로 데이터를 삭제하는 반면 논리 삭제는 데이터가 삭제되었음을 표시만 한다는 점에서 차이가 있습니다.”입니다."
    ],
    "keyPoints": [
      "본문",
      "논리",
      "삭제와",
      "물리"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-138-main",
    "kind": "main",
    "followUpOf": null,
    "question": "원문이 제시한 NoSQL 데이터베이스 유형이 아닌 것은 무엇인가요?",
    "choices": [
      "관계형 테이블 지향",
      "키-값",
      "문서 지향",
      "그래프"
    ],
    "correctIndex": 0,
    "explanation": "원문은 NoSQL 유형으로 키-값, 문서 지향, 열 지향, 그래프, 시계열을 제시합니다.",
    "categoryId": "persistence-database",
    "sourceId": "be-138",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "evidenceQuote": "NoSQL 데이터베이스의 유형은 키-값, 문서 지향, 열 지향, 그래프, 시계열이 있습니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "followUpOrder": null,
    "followUpRole": null,
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "choiceFeedback": [
      "원문은 NoSQL 유형으로 키-값, 문서 지향, 열 지향, 그래프, 시계열을 제시합니다.",
      "“키-값”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “관계형 테이블 지향”입니다.",
      "“문서 지향”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “관계형 테이블 지향”입니다.",
      "“그래프”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “관계형 테이블 지향”입니다."
    ],
    "keyPoints": [
      "본문",
      "NoSQL",
      "데이터베이스의",
      "유형에는"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-138-follow-up",
    "kind": "follow-up",
    "followUpOf": "quiz-be-138-main",
    "question": "문서 지향 데이터베이스가 저장하는 데이터 형식의 예로 맞는 것은 무엇인가요?",
    "choices": [
      "JSON, BSON, XML",
      "행과 컬럼만 가진 고정 테이블",
      "HTTP 헤더와 쿠키만",
      "Java 바이트코드만"
    ],
    "correctIndex": 0,
    "explanation": "문서 지향 DB는 JSON, BSON, XML 등 형식으로 데이터를 저장합니다.",
    "categoryId": "persistence-database",
    "sourceId": "be-138",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "evidenceQuote": "**문서 지향 데이터베이스(Document-oriented Database)** 는 JSON, BSON, XML 등의 형식으로 데이터를 저장합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "followUpOrder": 1,
    "followUpRole": "core",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "choiceFeedback": [
      "문서 지향 DB는 JSON, BSON, XML 등 형식으로 데이터를 저장합니다.",
      "“행과 컬럼만 가진 고정 테이블”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “JSON, BSON, XML”입니다.",
      "“HTTP 헤더와 쿠키만”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “JSON, BSON, XML”입니다.",
      "“Java 바이트코드만”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “JSON, BSON, XML”입니다."
    ],
    "keyPoints": [
      "본문",
      "NoSQL",
      "데이터베이스의",
      "유형에는"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-138-follow-up-2",
    "kind": "follow-up",
    "followUpOf": "quiz-be-138-main",
    "followUpOrder": 2,
    "followUpRole": "core",
    "question": "NoSQL 데이터베이스의 유형에는 어떤 것들이 있나요 원문의 “본문” 구역과 일치하는 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.",
      "**키-값 데이터베이스(Key-value Database)** 는 키를 고유한 식별자로 사용하는 키-값 쌍의 형태로 데이터를 저장합니다."
    ],
    "correctIndex": 3,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "persistence-database",
    "sourceId": "be-138",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "**키-값 데이터베이스(Key-value Database)** 는 키를 고유한 식별자로 사용하는 키-값 쌍의 형태로 데이터를 저장합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “**키-값 데이터베이스(Key-value Database)** 는 키를 고유한 식별자로 사용하는 키-값 쌍의 형태로 데이터를 저장합니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “**키-값 데이터베이스(Key-value Database)** 는 키를 고유한 식별자로 사용하는 키-값 쌍의 형태로 데이터를 저장합니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “**키-값 데이터베이스(Key-value Database)** 는 키를 고유한 식별자로 사용하는 키-값 쌍의 형태로 데이터를 저장합니다.”입니다.",
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다."
    ],
    "keyPoints": [
      "본문",
      "NoSQL",
      "데이터베이스의",
      "유형에는"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-138-follow-up-3",
    "kind": "follow-up",
    "followUpOf": "quiz-be-138-main",
    "followUpOrder": 3,
    "followUpRole": "remediation",
    "question": "NoSQL 데이터베이스의 유형에는 어떤 것들이 있나요의 핵심 근거를 다시 확인할 때 옳은 설명은 무엇인가요?",
    "choices": [
      "구조가 단순하고, 빠른 읽기 및 쓰기 성능을 제공합니다.",
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 0,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "persistence-database",
    "sourceId": "be-138",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "구조가 단순하고, 빠른 읽기 및 쓰기 성능을 제공합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “구조가 단순하고, 빠른 읽기 및 쓰기 성능을 제공합니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “구조가 단순하고, 빠른 읽기 및 쓰기 성능을 제공합니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “구조가 단순하고, 빠른 읽기 및 쓰기 성능을 제공합니다.”입니다."
    ],
    "keyPoints": [
      "본문",
      "NoSQL",
      "데이터베이스의",
      "유형에는"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-142-main",
    "kind": "main",
    "followUpOf": null,
    "question": "대규모 데이터셋에서 NOT IN 쿼리를 사용할 때 원문이 경고한 것은 무엇인가요?",
    "choices": [
      "데이터가 자동으로 정규화된다",
      "트랜잭션 격리 수준이 올라간다",
      "인덱스가 자동으로 생성된다",
      "심각한 성능 저하가 발생할 수 있다"
    ],
    "correctIndex": 3,
    "explanation": "원문은 대규모 데이터셋에서 NOT IN 쿼리가 심각한 성능 저하를 일으킬 수 있다고 설명합니다.",
    "categoryId": "persistence-database",
    "sourceId": "be-142",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "evidenceQuote": "대규모 데이터셋에서 심각한 성능 저하를 일으킬 수 있습니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "followUpOrder": null,
    "followUpRole": null,
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "choiceFeedback": [
      "“데이터가 자동으로 정규화된다”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “심각한 성능 저하가 발생할 수 있다”입니다.",
      "“트랜잭션 격리 수준이 올라간다”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “심각한 성능 저하가 발생할 수 있다”입니다.",
      "“인덱스가 자동으로 생성된다”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “심각한 성능 저하가 발생할 수 있다”입니다.",
      "원문은 대규모 데이터셋에서 NOT IN 쿼리가 심각한 성능 저하를 일으킬 수 있다고 설명합니다."
    ],
    "keyPoints": [
      "본문",
      "NOT",
      "IN",
      "쿼리를"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-142-follow-up",
    "kind": "follow-up",
    "followUpOf": "quiz-be-142-main",
    "question": "NOT IN 쿼리를 대규모 데이터셋에서 사용할 때의 판단으로 맞는 것은 무엇인가요?",
    "choices": [
      "직관적이므로 데이터가 많을수록 성능 저하가 없다",
      "대규모 데이터셋에서는 항상 인덱스 Range Scan만 발생한다",
      "NULL 값이 포함되어도 결과는 항상 예상과 같다",
      "직관적이고 사용하기 쉽지만 심각한 성능 저하를 일으킬 수 있다"
    ],
    "correctIndex": 3,
    "explanation": "NOT IN은 사용하기 쉽지만 대규모 데이터셋에서 심각한 성능 저하를 일으킬 수 있습니다.",
    "categoryId": "persistence-database",
    "sourceId": "be-142",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "evidenceQuote": "아래와 같이 `NOT IN`을 사용한 쿼리는 직관적이고 사용하기 쉽지만, 대규모 데이터셋에서 심각한 성능 저하를 일으킬 수 있습니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "followUpOrder": 1,
    "followUpRole": "core",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "choiceFeedback": [
      "“직관적이므로 데이터가 많을수록 성능 저하가 없다”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “직관적이고 사용하기 쉽지만 심각한 성능 저하를 일으킬 수 있다”입니다.",
      "“대규모 데이터셋에서는 항상 인덱스 Range Scan만 발생한다”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “직관적이고 사용하기 쉽지만 심각한 성능 저하를 일으킬 수 있다”입니다.",
      "“NULL 값이 포함되어도 결과는 항상 예상과 같다”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “직관적이고 사용하기 쉽지만 심각한 성능 저하를 일으킬 수 있다”입니다.",
      "NOT IN은 사용하기 쉽지만 대규모 데이터셋에서 심각한 성능 저하를 일으킬 수 있습니다."
    ],
    "keyPoints": [
      "본문",
      "NOT",
      "IN",
      "쿼리를"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-142-follow-up-2",
    "kind": "follow-up",
    "followUpOf": "quiz-be-142-main",
    "followUpOrder": 2,
    "followUpRole": "core",
    "question": "NOT IN 쿼리를 사용할 때 발생할 수 있는 문제와 최적화 방법 원문의 “문제점” 구역과 일치하는 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "`NOT IN`은 부정 조건으로, 대부분의 DBMS에서 전체 테이블 스캔이나 인덱스 풀 스캔을 유발합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 2,
    "explanation": "원문의 “문제점” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "persistence-database",
    "sourceId": "be-142",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "문제점",
    "sourceAnchor": "문제점",
    "evidenceQuote": "`NOT IN`은 부정 조건으로, 대부분의 DBMS에서 전체 테이블 스캔이나 인덱스 풀 스캔을 유발합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “`NOT IN`은 부정 조건으로, 대부분의 DBMS에서 전체 테이블 스캔이나 인덱스 풀 스캔을 유발합니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “`NOT IN`은 부정 조건으로, 대부분의 DBMS에서 전체 테이블 스캔이나 인덱스 풀 스캔을 유발합니다.”입니다.",
      "원문의 “문제점” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “`NOT IN`은 부정 조건으로, 대부분의 DBMS에서 전체 테이블 스캔이나 인덱스 풀 스캔을 유발합니다.”입니다."
    ],
    "keyPoints": [
      "문제점",
      "NOT",
      "IN",
      "쿼리를"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-142-follow-up-3",
    "kind": "follow-up",
    "followUpOf": "quiz-be-142-main",
    "followUpOrder": 3,
    "followUpRole": "remediation",
    "question": "NOT IN 쿼리를 사용할 때 발생할 수 있는 문제와 최적화 방법의 핵심 근거를 다시 확인할 때 옳은 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.",
      "전체 데이터나 테이블을 스캔한 후 조건에 맞지 않는 레코드를 필터링 해야하기 때문에 데이터베이스 옵티마이저가 효율적인 실행 계획을 세우기 어렵습니다."
    ],
    "correctIndex": 3,
    "explanation": "원문의 “문제점” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "persistence-database",
    "sourceId": "be-142",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "문제점",
    "sourceAnchor": "문제점",
    "evidenceQuote": "전체 데이터나 테이블을 스캔한 후 조건에 맞지 않는 레코드를 필터링 해야하기 때문에 데이터베이스 옵티마이저가 효율적인 실행 계획을 세우기 어렵습니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “전체 데이터나 테이블을 스캔한 후 조건에 맞지 않는 레코드를 필터링 해야하기 때문에 데이터베이스 옵티마이저가 효율적인 실행 계획을 세우기 어렵습니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “전체 데이터나 테이블을 스캔한 후 조건에 맞지 않는 레코드를 필터링 해야하기 때문에 데이터베이스 옵티마이저가 효율적인 실행 계획을 세우기 어렵습니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “전체 데이터나 테이블을 스캔한 후 조건에 맞지 않는 레코드를 필터링 해야하기 때문에 데이터베이스 옵티마이저가 효율적인 실행 계획을 세우기 어렵습니다.”입니다.",
      "원문의 “문제점” 구역이 정답 선택지의 내용을 직접 설명합니다."
    ],
    "keyPoints": [
      "문제점",
      "NOT",
      "IN",
      "쿼리를"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-143-main",
    "kind": "main",
    "followUpOf": null,
    "question": "JDBC의 Statement와 PreparedStatement는 어떤 측면에서 차이가 있나요?",
    "choices": [
      "사용 방식, 성능, 보안",
      "테이블의 행과 컬럼 수",
      "데이터베이스 제품의 이름",
      "트랜잭션 격리 수준의 종류"
    ],
    "correctIndex": 0,
    "explanation": "Statement와 PreparedStatement는 사용 방식·성능·보안 측면에서 차이가 있습니다.",
    "categoryId": "persistence-database",
    "sourceId": "be-143",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "evidenceQuote": "JDBC에서 Statement와 PreparedStatement는 모두 SQL 실행을 담당하지만, 사용 방식과 성능, 보안 측면에서 차이가 존재합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "followUpOrder": null,
    "followUpRole": null,
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "choiceFeedback": [
      "Statement와 PreparedStatement는 사용 방식·성능·보안 측면에서 차이가 있습니다.",
      "“테이블의 행과 컬럼 수”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “사용 방식, 성능, 보안”입니다.",
      "“데이터베이스 제품의 이름”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “사용 방식, 성능, 보안”입니다.",
      "“트랜잭션 격리 수준의 종류”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “사용 방식, 성능, 보안”입니다."
    ],
    "keyPoints": [
      "본문",
      "Statement와",
      "PreparedStatement의",
      "차이점은"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-143-follow-up",
    "kind": "follow-up",
    "followUpOf": "quiz-be-143-main",
    "question": "PreparedStatement가 반복 실행에서 성능상 이점을 가질 수 있는 이유는 무엇인가요?",
    "choices": [
      "플레이스홀더 바인딩으로 SQL 구문 분석 결과를 캐싱할 수 있어서",
      "SQL을 실행하지 않고 결과를 추측해서",
      "매번 데이터베이스 스키마를 재생성해서",
      "Statement보다 항상 더 많은 문자열을 연결해서"
    ],
    "correctIndex": 0,
    "explanation": "PreparedStatement는 플레이스홀더에 값을 바인딩하며 SQL 구문 분석 결과를 캐싱할 수 있습니다.",
    "categoryId": "persistence-database",
    "sourceId": "be-143",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "evidenceQuote": "플레이스홀더를 활용하여 값을 바인딩하는 PreparedStatement를 사용하면 SQL 구문 분석 결과를 캐싱할 수 있어 반복 실행 시 Statement보다 성능이 높은 것으로 알려져 있습니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "followUpOrder": 1,
    "followUpRole": "core",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "choiceFeedback": [
      "PreparedStatement는 플레이스홀더에 값을 바인딩하며 SQL 구문 분석 결과를 캐싱할 수 있습니다.",
      "“SQL을 실행하지 않고 결과를 추측해서”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “플레이스홀더 바인딩으로 SQL 구문 분석 결과를 캐싱할 수 있어서”입니다.",
      "“매번 데이터베이스 스키마를 재생성해서”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “플레이스홀더 바인딩으로 SQL 구문 분석 결과를 캐싱할 수 있어서”입니다.",
      "“Statement보다 항상 더 많은 문자열을 연결해서”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “플레이스홀더 바인딩으로 SQL 구문 분석 결과를 캐싱할 수 있어서”입니다."
    ],
    "keyPoints": [
      "본문",
      "Statement와",
      "PreparedStatement의",
      "차이점은"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-143-follow-up-2",
    "kind": "follow-up",
    "followUpOf": "quiz-be-143-main",
    "followUpOrder": 2,
    "followUpRole": "core",
    "question": "Statement와 PreparedStatement의 차이점은 무엇인가요 원문의 “본문” 구역과 일치하는 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.",
      "Statement 클래스는 문자열 연결을 이용해 SQL을 동적으로 구성해야 합니다."
    ],
    "correctIndex": 3,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "persistence-database",
    "sourceId": "be-143",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "Statement 클래스는 문자열 연결을 이용해 SQL을 동적으로 구성해야 합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “Statement 클래스는 문자열 연결을 이용해 SQL을 동적으로 구성해야 합니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “Statement 클래스는 문자열 연결을 이용해 SQL을 동적으로 구성해야 합니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “Statement 클래스는 문자열 연결을 이용해 SQL을 동적으로 구성해야 합니다.”입니다.",
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다."
    ],
    "keyPoints": [
      "본문",
      "Statement와",
      "PreparedStatement의",
      "차이점은"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-143-follow-up-3",
    "kind": "follow-up",
    "followUpOf": "quiz-be-143-main",
    "followUpOrder": 3,
    "followUpRole": "remediation",
    "question": "Statement와 PreparedStatement의 차이점은 무엇인가요의 핵심 근거를 다시 확인할 때 옳은 설명은 무엇인가요?",
    "choices": [
      "이러한 특성으로 인해 SQL 인젝션 공격에 취약하다는 단점이 있습니다.",
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 0,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "persistence-database",
    "sourceId": "be-143",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "이러한 특성으로 인해 SQL 인젝션 공격에 취약하다는 단점이 있습니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “이러한 특성으로 인해 SQL 인젝션 공격에 취약하다는 단점이 있습니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “이러한 특성으로 인해 SQL 인젝션 공격에 취약하다는 단점이 있습니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “이러한 특성으로 인해 SQL 인젝션 공격에 취약하다는 단점이 있습니다.”입니다."
    ],
    "keyPoints": [
      "본문",
      "Statement와",
      "PreparedStatement의",
      "차이점은"
    ]
  },
  {
    "version": 2,
    "categoryId": "network-http",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "다음과 같이 특정 서비스의 장애가 전체 서비스에 영향을 주는 경우는 어떻게 해결할 수 있을까요?",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-30-main",
    "kind": "main",
    "followUpOf": null,
    "sourceId": "be-30",
    "question": "A 서비스 장애로 HTTP 커넥션 풀이 고갈되어 B·C 호출까지 기다리는 상황입니다. 전파를 줄이려면 무엇을 적용해야 하나요?",
    "choices": [
      "A·B·C가 하나의 풀을 더 오래 공유하도록 리드 타임아웃을 제거",
      "A 장애 중에도 모든 호출을 같은 풀에서 무제한 재시도",
      "B·C 요청을 A 서비스의 응답이 끝날 때까지 큐에 고정",
      "외부 서비스마다 별도의 HTTP 커넥션 풀을 두는 벌크헤드 패턴"
    ],
    "correctIndex": 3,
    "explanation": "벌크헤드는 기능별 자원을 분리해 일부 장애가 전체로 전파되는 것을 막습니다.",
    "evidenceQuote": "위 예시에서는 외부 서비스마다 다른 HTTP 커넥션 풀을 사용하도록 벌크헤드 패턴을 적용할 수 있습니다.",
    "followUpOrder": null,
    "followUpRole": null,
    "sourceAnchor": "다음과-같이-특정-서비스의-장애가-전체-서비스에-영향을-주는-경우는-어떻게-해결할-수-있을까요",
    "choiceFeedback": [
      "“A·B·C가 하나의 풀을 더 오래 공유하도록 리드 타임아웃을 제거”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “외부 서비스마다 별도의 HTTP 커넥션 풀을 두는 벌크헤드 패턴”입니다.",
      "“A 장애 중에도 모든 호출을 같은 풀에서 무제한 재시도”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “외부 서비스마다 별도의 HTTP 커넥션 풀을 두는 벌크헤드 패턴”입니다.",
      "“B·C 요청을 A 서비스의 응답이 끝날 때까지 큐에 고정”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “외부 서비스마다 별도의 HTTP 커넥션 풀을 두는 벌크헤드 패턴”입니다.",
      "벌크헤드는 기능별 자원을 분리해 일부 장애가 전체로 전파되는 것을 막습니다."
    ],
    "keyPoints": [
      "동기",
      "방식으로",
      "외부",
      "서비스를"
    ]
  },
  {
    "version": 2,
    "categoryId": "network-http",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "외부 서비스 장애가 계속 발생하면 어떻게 되나요?",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-30-follow-up",
    "kind": "follow-up",
    "followUpOf": "quiz-be-30-main",
    "sourceId": "be-30",
    "question": "외부 서비스 장애가 지속되어 타임아웃 오류가 반복될 때, 불필요한 요청과 응답 시간 증가를 줄이는 선택은?",
    "choices": [
      "장애 서비스로 보내는 요청마다 새 커넥션 풀 생성",
      "타임아웃을 없애 응답이 올 때까지 연결 유지",
      "장애 서비스 요청을 다른 서비스 요청과 같은 풀에 합치기",
      "일정 시간 동안 기능 실행을 차단하는 서킷 브레이커"
    ],
    "correctIndex": 3,
    "explanation": "서킷 브레이커는 지속 오류 시 기능 실행을 차단해 빠른 실패를 돕습니다.",
    "evidenceQuote": "서킷 브레이커는 오류가 지속되는 경우 일정 시간 동안 기능 실행을 차단할 수 있습니다.",
    "followUpOrder": 1,
    "followUpRole": "core",
    "sourceAnchor": "외부-서비스-장애가-계속-발생하면-어떻게-되나요",
    "choiceFeedback": [
      "“장애 서비스로 보내는 요청마다 새 커넥션 풀 생성”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “일정 시간 동안 기능 실행을 차단하는 서킷 브레이커”입니다.",
      "“타임아웃을 없애 응답이 올 때까지 연결 유지”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “일정 시간 동안 기능 실행을 차단하는 서킷 브레이커”입니다.",
      "“장애 서비스 요청을 다른 서비스 요청과 같은 풀에 합치기”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “일정 시간 동안 기능 실행을 차단하는 서킷 브레이커”입니다.",
      "서킷 브레이커는 지속 오류 시 기능 실행을 차단해 빠른 실패를 돕습니다."
    ],
    "keyPoints": [
      "외부 서비스 장애가 계속 발생하면 어떻게 되나요?",
      "동기",
      "방식으로",
      "외부"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-30-follow-up-2",
    "kind": "follow-up",
    "followUpOf": "quiz-be-30-main",
    "followUpOrder": 2,
    "followUpRole": "core",
    "question": "동기 방식으로 외부 서비스를 호출할 때 외부 서비스 장애가 나면 어떻게 조치할 수 있나요 원문의 “본문” 구역과 일치하는 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "외부 서비스 장애로 인해 응답이 오래 걸린다고 했을 때 외부 API 응답으로 대기하는 자원들이 운영 서버 내부에 쌓이면서 성능에 악영향을 줄 수 있습니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 2,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "network-http",
    "sourceId": "be-30",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "외부 서비스 장애로 인해 응답이 오래 걸린다고 했을 때 외부 API 응답으로 대기하는 자원들이 운영 서버 내부에 쌓이면서 성능에 악영향을 줄 수 있습니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “외부 서비스 장애로 인해 응답이 오래 걸린다고 했을 때 외부 API 응답으로 대기하는 자원들이 운영 서버 내부에 쌓이면서 성능에 악영향을 줄 수 있습니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “외부 서비스 장애로 인해 응답이 오래 걸린다고 했을 때 외부 API 응답으로 대기하는 자원들이 운영 서버 내부에 쌓이면서 성능에 악영향을 줄 수 있습니다.”입니다.",
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “외부 서비스 장애로 인해 응답이 오래 걸린다고 했을 때 외부 API 응답으로 대기하는 자원들이 운영 서버 내부에 쌓이면서 성능에 악영향을 줄 수 있습니다.”입니다."
    ],
    "keyPoints": [
      "본문",
      "동기",
      "방식으로",
      "외부"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-30-follow-up-3",
    "kind": "follow-up",
    "followUpOf": "quiz-be-30-main",
    "followUpOrder": 3,
    "followUpRole": "remediation",
    "question": "동기 방식으로 외부 서비스를 호출할 때 외부 서비스 장애가 나면 어떻게 조치할 수 있나요의 핵심 근거를 다시 확인할 때 옳은 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.",
      "이를 해결하기 위한 가장 기본적인 방법은 타임아웃을 설정하는 것입니다."
    ],
    "correctIndex": 3,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "network-http",
    "sourceId": "be-30",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "이를 해결하기 위한 가장 기본적인 방법은 타임아웃을 설정하는 것입니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “이를 해결하기 위한 가장 기본적인 방법은 타임아웃을 설정하는 것입니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “이를 해결하기 위한 가장 기본적인 방법은 타임아웃을 설정하는 것입니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “이를 해결하기 위한 가장 기본적인 방법은 타임아웃을 설정하는 것입니다.”입니다.",
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다."
    ],
    "keyPoints": [
      "본문",
      "동기",
      "방식으로",
      "외부"
    ]
  },
  {
    "version": 2,
    "categoryId": "network-http",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-31-main",
    "kind": "main",
    "followUpOf": null,
    "sourceId": "be-31",
    "question": "TCP 3-way handshake에서 서버가 클라이언트의 SYN을 수락할 때 보내는 세그먼트는?",
    "choices": [
      "SYN과 ACK 플래그가 설정된 세그먼트",
      "ACK 플래그만 설정된 세그먼트",
      "FIN과 ACK 플래그가 설정된 세그먼트",
      "데이터만 담고 플래그가 없는 세그먼트"
    ],
    "correctIndex": 0,
    "explanation": "서버는 요청을 수락하며 SYN과 ACK가 설정된 세그먼트를 보냅니다.",
    "evidenceQuote": "이후 서버는 클라이언트의 요청을 수락하고, SYN과 ACK 플래그가 설정된 세그먼트를 클라이언트에 보냅니다.",
    "followUpOrder": null,
    "followUpRole": null,
    "sourceAnchor": "content-answer",
    "choiceFeedback": [
      "서버는 요청을 수락하며 SYN과 ACK가 설정된 세그먼트를 보냅니다.",
      "“ACK 플래그만 설정된 세그먼트”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “SYN과 ACK 플래그가 설정된 세그먼트”입니다.",
      "“FIN과 ACK 플래그가 설정된 세그먼트”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “SYN과 ACK 플래그가 설정된 세그먼트”입니다.",
      "“데이터만 담고 플래그가 없는 세그먼트”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “SYN과 ACK 플래그가 설정된 세그먼트”입니다."
    ],
    "keyPoints": [
      "본문",
      "TCP",
      "3-way",
      "handshake에"
    ]
  },
  {
    "version": 2,
    "categoryId": "network-http",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-31-follow-up",
    "kind": "follow-up",
    "followUpOf": "quiz-be-31-main",
    "sourceId": "be-31",
    "question": "3-way handshake의 마지막 단계에서 클라이언트가 서버에 보내는 정보로 알맞은 것은?",
    "choices": [
      "서버 초기 순서 번호 + 1에 대한 ACK가 설정된 세그먼트",
      "클라이언트 초기 순서 번호 + 1에 대한 SYN 세그먼트",
      "서버 초기 순서 번호를 담은 SYN·ACK 세그먼트",
      "연결 종료를 알리는 FIN 세그먼트"
    ],
    "correctIndex": 0,
    "explanation": "마지막으로 클라이언트가 서버 순서 번호 + 1을 ACK로 응답합니다.",
    "evidenceQuote": "이 세그먼트는 서버의 순서 번호에 대한 응답(ACK=서버의 초기 순서 번호 + 1)을 포함합니다.",
    "followUpOrder": 1,
    "followUpRole": "core",
    "sourceAnchor": "content-answer",
    "choiceFeedback": [
      "마지막으로 클라이언트가 서버 순서 번호 + 1을 ACK로 응답합니다.",
      "“클라이언트 초기 순서 번호 + 1에 대한 SYN 세그먼트”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “서버 초기 순서 번호 + 1에 대한 ACK가 설정된 세그먼트”입니다.",
      "“서버 초기 순서 번호를 담은 SYN·ACK 세그먼트”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “서버 초기 순서 번호 + 1에 대한 ACK가 설정된 세그먼트”입니다.",
      "“연결 종료를 알리는 FIN 세그먼트”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “서버 초기 순서 번호 + 1에 대한 ACK가 설정된 세그먼트”입니다."
    ],
    "keyPoints": [
      "본문",
      "TCP",
      "3-way",
      "handshake에"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-31-follow-up-2",
    "kind": "follow-up",
    "followUpOf": "quiz-be-31-main",
    "followUpOrder": 2,
    "followUpRole": "core",
    "question": "TCP 3-way handshake 원문의 “본문” 구역과 일치하는 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.",
      "TCP 3-way handshake는 TCP/IP 네트워크에서 안정적이고 연결 지향적인 통신을 설정하기 위해 사용되는 절차입니다."
    ],
    "correctIndex": 3,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "network-http",
    "sourceId": "be-31",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "TCP 3-way handshake는 TCP/IP 네트워크에서 안정적이고 연결 지향적인 통신을 설정하기 위해 사용되는 절차입니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “TCP 3-way handshake는 TCP/IP 네트워크에서 안정적이고 연결 지향적인 통신을 설정하기 위해 사용되는 절차입니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “TCP 3-way handshake는 TCP/IP 네트워크에서 안정적이고 연결 지향적인 통신을 설정하기 위해 사용되는 절차입니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “TCP 3-way handshake는 TCP/IP 네트워크에서 안정적이고 연결 지향적인 통신을 설정하기 위해 사용되는 절차입니다.”입니다.",
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다."
    ],
    "keyPoints": [
      "본문",
      "TCP",
      "3-way",
      "handshake에"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-31-follow-up-3",
    "kind": "follow-up",
    "followUpOf": "quiz-be-31-main",
    "followUpOrder": 3,
    "followUpRole": "remediation",
    "question": "TCP 3-way handshake의 핵심 근거를 다시 확인할 때 옳은 설명은 무엇인가요?",
    "choices": [
      "이 절차는 클라이언트와 서버 간에 신뢰할 수 있는 연결을 설정하기 위해 세 개의 메시지(세그먼트)를 교환하는 과정을 포함합니다.",
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 0,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "network-http",
    "sourceId": "be-31",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "이 절차는 클라이언트와 서버 간에 신뢰할 수 있는 연결을 설정하기 위해 세 개의 메시지(세그먼트)를 교환하는 과정을 포함합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “이 절차는 클라이언트와 서버 간에 신뢰할 수 있는 연결을 설정하기 위해 세 개의 메시지(세그먼트)를 교환하는 과정을 포함합니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “이 절차는 클라이언트와 서버 간에 신뢰할 수 있는 연결을 설정하기 위해 세 개의 메시지(세그먼트)를 교환하는 과정을 포함합니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “이 절차는 클라이언트와 서버 간에 신뢰할 수 있는 연결을 설정하기 위해 세 개의 메시지(세그먼트)를 교환하는 과정을 포함합니다.”입니다."
    ],
    "keyPoints": [
      "본문",
      "TCP",
      "3-way",
      "handshake에"
    ]
  },
  {
    "version": 2,
    "categoryId": "network-http",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-37-main",
    "kind": "main",
    "followUpOf": null,
    "sourceId": "be-37",
    "question": "브라우저가 도메인 IP 주소를 얻기 위해 DNS에 질의하는 과정이 이루어지는 OSI 계층은?",
    "choices": [
      "전송 계층",
      "네트워크 계층",
      "애플리케이션 계층",
      "데이터 링크 계층"
    ],
    "correctIndex": 2,
    "explanation": "원문은 DNS 질의도 애플리케이션 계층에서 이루어진다고 설명합니다.",
    "evidenceQuote": "이 질의 과정 또한 **애플리케이션 계층**에서 이루어지며, DNS 서버는 해당 도메인에 대한 **IP 주소**(예를 들어, `142.250.190.78`)를 응답합니다.",
    "followUpOrder": null,
    "followUpRole": null,
    "sourceAnchor": "content-answer",
    "choiceFeedback": [
      "“전송 계층”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “애플리케이션 계층”입니다.",
      "“네트워크 계층”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “애플리케이션 계층”입니다.",
      "원문은 DNS 질의도 애플리케이션 계층에서 이루어진다고 설명합니다.",
      "“데이터 링크 계층”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “애플리케이션 계층”입니다."
    ],
    "keyPoints": [
      "본문",
      "사용자가",
      "웹사이트에",
      "처음"
    ]
  },
  {
    "version": 2,
    "categoryId": "network-http",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-37-follow-up",
    "kind": "follow-up",
    "followUpOf": "quiz-be-37-main",
    "sourceId": "be-37",
    "question": "HTTP 요청 데이터를 네트워크로 전송할 때 IP 주소와 MAC 주소를 각각 사용하는 계층의 조합은?",
    "choices": [
      "전송 계층은 IP 주소, 애플리케이션 계층은 MAC 주소",
      "데이터 링크 계층은 IP 주소, 네트워크 계층은 MAC 주소",
      "네트워크 계층은 IP 주소, 데이터 링크 계층은 MAC 주소",
      "애플리케이션 계층은 IP 주소, 전송 계층은 MAC 주소"
    ],
    "correctIndex": 2,
    "explanation": "패킷 전송에 IP는 3계층, MAC은 2계층에서 사용됩니다.",
    "evidenceQuote": "네트워크를 통해 데이터를 전송하기 위해서는 **네트워크 계층(3계층)** 에서 IP 주소를 사용하고, **데이터 링크 계층(2계층)** 에서 MAC 주소를 사용하여 패킷이 전송됩니다.",
    "followUpOrder": 1,
    "followUpRole": "core",
    "sourceAnchor": "content-answer",
    "choiceFeedback": [
      "“전송 계층은 IP 주소, 애플리케이션 계층은 MAC 주소”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “네트워크 계층은 IP 주소, 데이터 링크 계층은 MAC 주소”입니다.",
      "“데이터 링크 계층은 IP 주소, 네트워크 계층은 MAC 주소”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “네트워크 계층은 IP 주소, 데이터 링크 계층은 MAC 주소”입니다.",
      "패킷 전송에 IP는 3계층, MAC은 2계층에서 사용됩니다.",
      "“애플리케이션 계층은 IP 주소, 전송 계층은 MAC 주소”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “네트워크 계층은 IP 주소, 데이터 링크 계층은 MAC 주소”입니다."
    ],
    "keyPoints": [
      "본문",
      "사용자가",
      "웹사이트에",
      "처음"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-37-follow-up-2",
    "kind": "follow-up",
    "followUpOf": "quiz-be-37-main",
    "followUpOrder": 2,
    "followUpRole": "core",
    "question": "사용자가 웹사이트에 처음 접근했을 때 발생하는 일련의 과정 원문의 “본문” 구역과 일치하는 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "com`을 입력하면, 브라우저는 **HTTP 프로토콜**을 사용해 구글 웹 서버와 통신하려고 합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 1,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "network-http",
    "sourceId": "be-37",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "com`을 입력하면, 브라우저는 **HTTP 프로토콜**을 사용해 구글 웹 서버와 통신하려고 합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “com`을 입력하면, 브라우저는 **HTTP 프로토콜**을 사용해 구글 웹 서버와 통신하려고 합니다.”입니다.",
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “com`을 입력하면, 브라우저는 **HTTP 프로토콜**을 사용해 구글 웹 서버와 통신하려고 합니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “com`을 입력하면, 브라우저는 **HTTP 프로토콜**을 사용해 구글 웹 서버와 통신하려고 합니다.”입니다."
    ],
    "keyPoints": [
      "본문",
      "사용자가",
      "웹사이트에",
      "처음"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-37-follow-up-3",
    "kind": "follow-up",
    "followUpOf": "quiz-be-37-main",
    "followUpOrder": 3,
    "followUpRole": "remediation",
    "question": "사용자가 웹사이트에 처음 접근했을 때 발생하는 일련의 과정의 핵심 근거를 다시 확인할 때 옳은 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "HTTP는 **OSI 7계층** 중 **애플리케이션 계층**에서 동작하는 프로토콜입니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 2,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "network-http",
    "sourceId": "be-37",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "HTTP는 **OSI 7계층** 중 **애플리케이션 계층**에서 동작하는 프로토콜입니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “HTTP는 **OSI 7계층** 중 **애플리케이션 계층**에서 동작하는 프로토콜입니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “HTTP는 **OSI 7계층** 중 **애플리케이션 계층**에서 동작하는 프로토콜입니다.”입니다.",
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “HTTP는 **OSI 7계층** 중 **애플리케이션 계층**에서 동작하는 프로토콜입니다.”입니다."
    ],
    "keyPoints": [
      "본문",
      "사용자가",
      "웹사이트에",
      "처음"
    ]
  },
  {
    "version": 2,
    "categoryId": "network-http",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-38-main",
    "kind": "main",
    "followUpOf": null,
    "sourceId": "be-38",
    "question": "전송 커넥션이 끊겨 같은 HTTP 요청을 재시도하려 합니다. 재시도의 판단 근거가 되는 성질은?",
    "choices": [
      "응답 본문이 항상 비어 있는 무상태성",
      "요청마다 새 연결을 만드는 지속 연결",
      "서버가 클라이언트 상태를 저장하는 세션성",
      "동일 요청을 여러 번 보내도 서버 상태 효과가 같은 멱등성"
    ],
    "correctIndex": 3,
    "explanation": "멱등성은 동일 요청을 여러 번 보내도 서버 상태가 같은지 판단하는 기준입니다.",
    "evidenceQuote": "HTTP 메서드의 멱등성은 동일한 요청을 한번 보내는 것과 여러번 보내는 것이 서로 동일한 효과를 지니며, 서버의 상태도 동일하게 남을 경우에 멱등하다고 이야기할 수 있습니다.",
    "followUpOrder": null,
    "followUpRole": null,
    "sourceAnchor": "content-answer",
    "choiceFeedback": [
      "“응답 본문이 항상 비어 있는 무상태성”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “동일 요청을 여러 번 보내도 서버 상태 효과가 같은 멱등성”입니다.",
      "“요청마다 새 연결을 만드는 지속 연결”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “동일 요청을 여러 번 보내도 서버 상태 효과가 같은 멱등성”입니다.",
      "“서버가 클라이언트 상태를 저장하는 세션성”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “동일 요청을 여러 번 보내도 서버 상태 효과가 같은 멱등성”입니다.",
      "멱등성은 동일 요청을 여러 번 보내도 서버 상태가 같은지 판단하는 기준입니다."
    ],
    "keyPoints": [
      "본문",
      "HTTP",
      "메서드에서",
      "멱등성이란"
    ]
  },
  {
    "version": 2,
    "categoryId": "network-http",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "멱등성은 어떻게 활용될 수 있나요?",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-38-follow-up",
    "kind": "follow-up",
    "followUpOf": "quiz-be-38-main",
    "sourceId": "be-38",
    "question": "타임아웃으로 결제 성공 여부를 알 수 없을 때, 멱등하지 않은 결제 API에 대한 원문의 권고는?",
    "choices": [
      "중복 결제를 막기 위해 즉시 여러 번 재시도한다",
      "GET 요청으로 바꾸면 자동으로 결제가 취소된다",
      "응답이 없으면 서버 상태는 바뀌지 않았다고 가정한다",
      "성공 여부를 수동으로 확인한 뒤 재요청한다"
    ],
    "correctIndex": 3,
    "explanation": "멱등하지 않은 결제 요청은 중복 문제를 막기 위해 확인 후 재요청해야 합니다.",
    "evidenceQuote": "해당 경우에서 멱등하지 않은 결제 API 경우에는 결제가 성공했는지 수동으로 확인하고 재요청해야합니다.",
    "followUpOrder": 1,
    "followUpRole": "core",
    "sourceAnchor": "멱등성은-어떻게-활용될-수-있나요",
    "choiceFeedback": [
      "“중복 결제를 막기 위해 즉시 여러 번 재시도한다”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “성공 여부를 수동으로 확인한 뒤 재요청한다”입니다.",
      "“GET 요청으로 바꾸면 자동으로 결제가 취소된다”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “성공 여부를 수동으로 확인한 뒤 재요청한다”입니다.",
      "“응답이 없으면 서버 상태는 바뀌지 않았다고 가정한다”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “성공 여부를 수동으로 확인한 뒤 재요청한다”입니다.",
      "멱등하지 않은 결제 요청은 중복 문제를 막기 위해 확인 후 재요청해야 합니다."
    ],
    "keyPoints": [
      "멱등성은 어떻게 활용될 수 있나요?",
      "HTTP",
      "메서드에서",
      "멱등성이란"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-38-follow-up-2",
    "kind": "follow-up",
    "followUpOf": "quiz-be-38-main",
    "followUpOrder": 2,
    "followUpRole": "core",
    "question": "HTTP 메서드에서 멱등성이란 무엇인가요 원문의 “본문” 구역과 일치하는 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "연산을 여러 번 적용하더라도 결과가 달라지지 않는 성질을 멱등성이라고 합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 2,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "network-http",
    "sourceId": "be-38",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "연산을 여러 번 적용하더라도 결과가 달라지지 않는 성질을 멱등성이라고 합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “연산을 여러 번 적용하더라도 결과가 달라지지 않는 성질을 멱등성이라고 합니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “연산을 여러 번 적용하더라도 결과가 달라지지 않는 성질을 멱등성이라고 합니다.”입니다.",
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “연산을 여러 번 적용하더라도 결과가 달라지지 않는 성질을 멱등성이라고 합니다.”입니다."
    ],
    "keyPoints": [
      "본문",
      "HTTP",
      "메서드에서",
      "멱등성이란"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-38-follow-up-3",
    "kind": "follow-up",
    "followUpOf": "quiz-be-38-main",
    "followUpOrder": 3,
    "followUpRole": "remediation",
    "question": "HTTP 메서드에서 멱등성이란 무엇인가요의 핵심 근거를 다시 확인할 때 옳은 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.",
      "대표적으로 멱등한 메서드는 GET, HEAD, PUT, DELETE, TRACE, OPTIONS 가 있습니다."
    ],
    "correctIndex": 3,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "network-http",
    "sourceId": "be-38",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "대표적으로 멱등한 메서드는 GET, HEAD, PUT, DELETE, TRACE, OPTIONS 가 있습니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “대표적으로 멱등한 메서드는 GET, HEAD, PUT, DELETE, TRACE, OPTIONS 가 있습니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “대표적으로 멱등한 메서드는 GET, HEAD, PUT, DELETE, TRACE, OPTIONS 가 있습니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “대표적으로 멱등한 메서드는 GET, HEAD, PUT, DELETE, TRACE, OPTIONS 가 있습니다.”입니다.",
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다."
    ],
    "keyPoints": [
      "본문",
      "HTTP",
      "메서드에서",
      "멱등성이란"
    ]
  },
  {
    "version": 2,
    "categoryId": "network-http",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-41-main",
    "kind": "main",
    "followUpOf": null,
    "sourceId": "be-41",
    "question": "CORS에서 두 요청의 출처가 같은지 판단할 때 URL 외에 함께 비교해야 하는 것은?",
    "choices": [
      "응답 본문 크기와 캐시 시간",
      "프로토콜과 포트",
      "요청 메서드와 상태 코드",
      "쿠키 이름과 세션 ID"
    ],
    "correctIndex": 1,
    "explanation": "CORS의 출처에는 URL뿐 아니라 프로토콜과 포트도 포함됩니다.",
    "evidenceQuote": "이때 출처는 URL뿐만 아니라 프로토콜과 포트까지 포함됩니다.",
    "followUpOrder": null,
    "followUpRole": null,
    "sourceAnchor": "content-answer",
    "choiceFeedback": [
      "“응답 본문 크기와 캐시 시간”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “프로토콜과 포트”입니다.",
      "CORS의 출처에는 URL뿐 아니라 프로토콜과 포트도 포함됩니다.",
      "“요청 메서드와 상태 코드”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “프로토콜과 포트”입니다.",
      "“쿠키 이름과 세션 ID”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “프로토콜과 포트”입니다."
    ],
    "keyPoints": [
      "본문",
      "CORS란",
      "무엇인가요?",
      "네트워크, HTTP와 웹 인프라"
    ]
  },
  {
    "version": 2,
    "categoryId": "network-http",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "CORS는 어떻게 작동할까요?",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-41-follow-up",
    "kind": "follow-up",
    "followUpOf": "quiz-be-41-main",
    "sourceId": "be-41",
    "question": "인증 정보를 포함한 Credential Request를 허용할 때 서버 설정으로 맞는 것은?",
    "choices": [
      "Access-Control-Allow-Credentials를 false로 두고 Allow-Origin에 와일드카드를 쓴다",
      "Access-Control-Allow-Credentials를 true로 설정하고 Allow-Origin에 와일드카드를 쓰지 않는다",
      "OPTIONS 사전 요청을 생략하고 Origin 헤더만 제거한다",
      "Content-Type만 text/plain으로 바꾸면 인증 정보를 허용한다"
    ],
    "correctIndex": 1,
    "explanation": "인증된 요청은 credentials 허용과 구체적인 허용 출처 설정이 필요합니다.",
    "evidenceQuote": "Credential Request를 요청하는 경우에는 서버에서는 Access-Control-Allow-Credentials를 true로 설정해야 하며 Access-Control-Allow-Origin에 와일드카드를 사용하지 못합니다.",
    "followUpOrder": 1,
    "followUpRole": "core",
    "sourceAnchor": "cors는-어떻게-작동할까요",
    "choiceFeedback": [
      "“Access-Control-Allow-Credentials를 false로 두고 Allow-Origin에 와일드카드를 쓴다”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “Access-Control-Allow-Credentials를 true로 설정하고 Allow-Origin에 와일드카드를 쓰지 않는다”입니다.",
      "인증된 요청은 credentials 허용과 구체적인 허용 출처 설정이 필요합니다.",
      "“OPTIONS 사전 요청을 생략하고 Origin 헤더만 제거한다”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “Access-Control-Allow-Credentials를 true로 설정하고 Allow-Origin에 와일드카드를 쓰지 않는다”입니다.",
      "“Content-Type만 text/plain으로 바꾸면 인증 정보를 허용한다”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “Access-Control-Allow-Credentials를 true로 설정하고 Allow-Origin에 와일드카드를 쓰지 않는다”입니다."
    ],
    "keyPoints": [
      "CORS는 어떻게 작동할까요?",
      "CORS란",
      "무엇인가요?",
      "네트워크, HTTP와 웹 인프라"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-41-follow-up-2",
    "kind": "follow-up",
    "followUpOf": "quiz-be-41-main",
    "followUpOrder": 2,
    "followUpRole": "core",
    "question": "CORS란 무엇인가요 원문의 “본문” 구역과 일치하는 설명은 무엇인가요?",
    "choices": [
      "CORS(Cross Origin Resource Sharing)는 출처가 다른 곳의 리소스를 요청할 때 접근 권한을 부여하는 메커니즘입니다.",
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 0,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "network-http",
    "sourceId": "be-41",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "CORS(Cross Origin Resource Sharing)는 출처가 다른 곳의 리소스를 요청할 때 접근 권한을 부여하는 메커니즘입니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “CORS(Cross Origin Resource Sharing)는 출처가 다른 곳의 리소스를 요청할 때 접근 권한을 부여하는 메커니즘입니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “CORS(Cross Origin Resource Sharing)는 출처가 다른 곳의 리소스를 요청할 때 접근 권한을 부여하는 메커니즘입니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “CORS(Cross Origin Resource Sharing)는 출처가 다른 곳의 리소스를 요청할 때 접근 권한을 부여하는 메커니즘입니다.”입니다."
    ],
    "keyPoints": [
      "본문",
      "CORS란",
      "무엇인가요?",
      "네트워크, HTTP와 웹 인프라"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-41-follow-up-3",
    "kind": "follow-up",
    "followUpOf": "quiz-be-41-main",
    "followUpOrder": 3,
    "followUpRole": "remediation",
    "question": "CORS란 무엇인가요의 핵심 근거를 다시 확인할 때 옳은 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "리소스를 주고받는 두 곳의 출처가 다르면 출처가 교차한다고 합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 1,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "network-http",
    "sourceId": "be-41",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "리소스를 주고받는 두 곳의 출처가 다르면 출처가 교차한다고 합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “리소스를 주고받는 두 곳의 출처가 다르면 출처가 교차한다고 합니다.”입니다.",
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “리소스를 주고받는 두 곳의 출처가 다르면 출처가 교차한다고 합니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “리소스를 주고받는 두 곳의 출처가 다르면 출처가 교차한다고 합니다.”입니다."
    ],
    "keyPoints": [
      "본문",
      "CORS란",
      "무엇인가요?",
      "네트워크, HTTP와 웹 인프라"
    ]
  },
  {
    "version": 2,
    "categoryId": "network-http",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "포워드 프록시(Forward Proxy)",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-42-main",
    "kind": "main",
    "followUpOf": null,
    "sourceId": "be-42",
    "question": "회사 내부 사용자의 외부 웹사이트 요청을 전달하며 실제 IP 대신 프록시 IP를 쓰는 것은?",
    "choices": [
      "리버스 프록시 서버",
      "외부 세션 저장소",
      "포워드 프록시 서버",
      "권한 네임 서버"
    ],
    "correctIndex": 2,
    "explanation": "원문 사례에서는 포워드 프록시가 외부 요청을 전달하고 실제 IP를 숨깁니다.",
    "evidenceQuote": "예를 들어, 회사 내부 네트워크에서 근무하는 직원이 외부 웹사이트에 접속하려고 할 때, 포워드 프록시 서버를 통해 요청이 전달됩니다. 이 과정에서 사용자의 실제 IP 주소는 숨겨지고, 프록시 서버의 IP 주소가 대신 사용됩니다.",
    "followUpOrder": null,
    "followUpRole": null,
    "sourceAnchor": "포워드-프록시forward-proxy",
    "choiceFeedback": [
      "“리버스 프록시 서버”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “포워드 프록시 서버”입니다.",
      "“외부 세션 저장소”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “포워드 프록시 서버”입니다.",
      "원문 사례에서는 포워드 프록시가 외부 요청을 전달하고 실제 IP를 숨깁니다.",
      "“권한 네임 서버”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “포워드 프록시 서버”입니다."
    ],
    "keyPoints": [
      "포워드 프록시(Forward Proxy)",
      "리버스",
      "프록시와",
      "포워드"
    ]
  },
  {
    "version": 2,
    "categoryId": "network-http",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "리버스 프록시(Reverse Proxy)",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-42-follow-up",
    "kind": "follow-up",
    "followUpOf": "quiz-be-42-main",
    "sourceId": "be-42",
    "question": "리버스 프록시에서 SSL/TLS 처리를 맡기면 기대할 수 있는 효과는?",
    "choices": [
      "사용자 실제 IP를 숨겨 외부 웹사이트 접근을 중개한다",
      "클라이언트마다 사설 IP를 공인 IP로 바꾼다",
      "백엔드 서버 부담을 줄이고 인증서를 중앙에서 관리한다",
      "모든 백엔드 요청을 하나의 서버에만 전달한다"
    ],
    "correctIndex": 2,
    "explanation": "SSL 종료는 백엔드 부담을 줄이고 인증서를 중앙 관리할 수 있게 합니다.",
    "evidenceQuote": "SSL/TLS 암호화를 리버스 프록시에서 처리함으로써 백엔드 서버의 부담을 줄이고, 중앙에서 인증서를 관리할 수 있습니다.",
    "followUpOrder": 1,
    "followUpRole": "core",
    "sourceAnchor": "리버스-프록시reverse-proxy",
    "choiceFeedback": [
      "“사용자 실제 IP를 숨겨 외부 웹사이트 접근을 중개한다”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “백엔드 서버 부담을 줄이고 인증서를 중앙에서 관리한다”입니다.",
      "“클라이언트마다 사설 IP를 공인 IP로 바꾼다”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “백엔드 서버 부담을 줄이고 인증서를 중앙에서 관리한다”입니다.",
      "SSL 종료는 백엔드 부담을 줄이고 인증서를 중앙 관리할 수 있게 합니다.",
      "“모든 백엔드 요청을 하나의 서버에만 전달한다”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “백엔드 서버 부담을 줄이고 인증서를 중앙에서 관리한다”입니다."
    ],
    "keyPoints": [
      "리버스 프록시(Reverse Proxy)",
      "리버스",
      "프록시와",
      "포워드"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-42-follow-up-2",
    "kind": "follow-up",
    "followUpOf": "quiz-be-42-main",
    "followUpOrder": 2,
    "followUpRole": "core",
    "question": "리버스 프록시와 포워드 프록시의 차이점 원문의 “포워드 프록시(Forward Proxy)” 구역과 일치하는 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "포워드 프록시는 주로 클라이언트 측에 위치하여, 사용자가 인터넷에 접근할 때 중개자 역할을 합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 1,
    "explanation": "원문의 “포워드 프록시(Forward Proxy)” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "network-http",
    "sourceId": "be-42",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "포워드 프록시(Forward Proxy)",
    "sourceAnchor": "포워드-프록시forward-proxy",
    "evidenceQuote": "포워드 프록시는 주로 클라이언트 측에 위치하여, 사용자가 인터넷에 접근할 때 중개자 역할을 합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “포워드 프록시는 주로 클라이언트 측에 위치하여, 사용자가 인터넷에 접근할 때 중개자 역할을 합니다.”입니다.",
      "원문의 “포워드 프록시(Forward Proxy)” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “포워드 프록시는 주로 클라이언트 측에 위치하여, 사용자가 인터넷에 접근할 때 중개자 역할을 합니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “포워드 프록시는 주로 클라이언트 측에 위치하여, 사용자가 인터넷에 접근할 때 중개자 역할을 합니다.”입니다."
    ],
    "keyPoints": [
      "포워드 프록시(Forward Proxy)",
      "리버스",
      "프록시와",
      "포워드"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-42-follow-up-3",
    "kind": "follow-up",
    "followUpOf": "quiz-be-42-main",
    "followUpOrder": 3,
    "followUpRole": "remediation",
    "question": "리버스 프록시와 포워드 프록시의 차이점의 핵심 근거를 다시 확인할 때 옳은 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "포워드 프록시의 핵심 기능 중 하나는 **익명성 제공**입니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 2,
    "explanation": "원문의 “포워드 프록시(Forward Proxy)” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "network-http",
    "sourceId": "be-42",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "포워드 프록시(Forward Proxy)",
    "sourceAnchor": "포워드-프록시forward-proxy",
    "evidenceQuote": "포워드 프록시의 핵심 기능 중 하나는 **익명성 제공**입니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “포워드 프록시의 핵심 기능 중 하나는 **익명성 제공**입니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “포워드 프록시의 핵심 기능 중 하나는 **익명성 제공**입니다.”입니다.",
      "원문의 “포워드 프록시(Forward Proxy)” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “포워드 프록시의 핵심 기능 중 하나는 **익명성 제공**입니다.”입니다."
    ],
    "keyPoints": [
      "포워드 프록시(Forward Proxy)",
      "리버스",
      "프록시와",
      "포워드"
    ]
  },
  {
    "version": 2,
    "categoryId": "network-http",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-44-main",
    "kind": "main",
    "followUpOf": null,
    "sourceId": "be-44",
    "question": "서버와 TCP 연결은 이미 성립했지만 다음 패킷이 제한 시간 안에 도착하지 않습니다. 가장 직접적인 타임아웃은?",
    "choices": [
      "Socket Timeout",
      "Connection Timeout",
      "DNS Timeout",
      "HTTP 커넥션 풀 Timeout"
    ],
    "correctIndex": 0,
    "explanation": "Socket Timeout은 연결 이후 패킷 간 전송 시간 차이 제한입니다.",
    "evidenceQuote": "만약 서버가 일정 시간 내에 다음 패킷을 보내지 않으면, 클라이언트는 Socket Timeout을 발생시키고 연결을 종료할 수 있습니다.",
    "followUpOrder": null,
    "followUpRole": null,
    "sourceAnchor": "content-answer",
    "choiceFeedback": [
      "Socket Timeout은 연결 이후 패킷 간 전송 시간 차이 제한입니다.",
      "“Connection Timeout”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “Socket Timeout”입니다.",
      "“DNS Timeout”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “Socket Timeout”입니다.",
      "“HTTP 커넥션 풀 Timeout”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “Socket Timeout”입니다."
    ],
    "keyPoints": [
      "본문",
      "Connection",
      "Timeout",
      "Socket"
    ]
  },
  {
    "version": 2,
    "categoryId": "network-http",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "네트워크 통신에 타임아웃이 필요한 이유는 무엇인가요?",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-44-follow-up",
    "kind": "follow-up",
    "followUpOf": "quiz-be-44-main",
    "sourceId": "be-44",
    "question": "원문에 따르면 타임아웃을 설정해 예방하려는 상황은?",
    "choices": [
      "무한정 길어진 요청 때문에 서비스 자원이 고갈되는 상황",
      "TLS 인증서가 만료되어 HTTPS가 중단되는 상황",
      "사설 IP가 공인 IP로 변환되지 않는 상황",
      "응답 본문이 JSON 형식이 아닌 상황"
    ],
    "correctIndex": 0,
    "explanation": "무한히 긴 요청이 자원을 계속 가지면 서비스 자원이 고갈될 수 있습니다.",
    "evidenceQuote": "이때 서비스의 요청이 자원을 가지고 있으면, 서비스의 자원이 고갈되어 장애가 발생할 수 있습니다. 타임아웃을 설정하면 이렇게 요청이 무한정 길어지는 상황을 예방할 수 있습니다.",
    "followUpOrder": 1,
    "followUpRole": "core",
    "sourceAnchor": "네트워크-통신에-타임아웃이-필요한-이유는-무엇인가요",
    "choiceFeedback": [
      "무한히 긴 요청이 자원을 계속 가지면 서비스 자원이 고갈될 수 있습니다.",
      "“TLS 인증서가 만료되어 HTTPS가 중단되는 상황”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “무한정 길어진 요청 때문에 서비스 자원이 고갈되는 상황”입니다.",
      "“사설 IP가 공인 IP로 변환되지 않는 상황”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “무한정 길어진 요청 때문에 서비스 자원이 고갈되는 상황”입니다.",
      "“응답 본문이 JSON 형식이 아닌 상황”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “무한정 길어진 요청 때문에 서비스 자원이 고갈되는 상황”입니다."
    ],
    "keyPoints": [
      "네트워크 통신에 타임아웃이 필요한 이유는 무엇인가요?",
      "Connection",
      "Timeout",
      "Socket"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-44-follow-up-2",
    "kind": "follow-up",
    "followUpOf": "quiz-be-44-main",
    "followUpOrder": 2,
    "followUpRole": "core",
    "question": "Connection Timeout, Socket Timeout, Read Timeout의 차이점은 무엇인가요 원문의 “본문” 구역과 일치하는 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.",
      "**Connection Timeout**은 클라이언트가 서버에 연결을 시도할 때, 일정 시간 내에 연결이 이루어지지 않으면 발생하는 타임아웃입니다."
    ],
    "correctIndex": 3,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "network-http",
    "sourceId": "be-44",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "**Connection Timeout**은 클라이언트가 서버에 연결을 시도할 때, 일정 시간 내에 연결이 이루어지지 않으면 발생하는 타임아웃입니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “**Connection Timeout**은 클라이언트가 서버에 연결을 시도할 때, 일정 시간 내에 연결이 이루어지지 않으면 발생하는 타임아웃입니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “**Connection Timeout**은 클라이언트가 서버에 연결을 시도할 때, 일정 시간 내에 연결이 이루어지지 않으면 발생하는 타임아웃입니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “**Connection Timeout**은 클라이언트가 서버에 연결을 시도할 때, 일정 시간 내에 연결이 이루어지지 않으면 발생하는 타임아웃입니다.”입니다.",
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다."
    ],
    "keyPoints": [
      "본문",
      "Connection",
      "Timeout",
      "Socket"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-44-follow-up-3",
    "kind": "follow-up",
    "followUpOf": "quiz-be-44-main",
    "followUpOrder": 3,
    "followUpRole": "remediation",
    "question": "Connection Timeout, Socket Timeout, Read Timeout의 차이점은 무엇인가요의 핵심 근거를 다시 확인할 때 옳은 설명은 무엇인가요?",
    "choices": [
      "TCP 소켓 통신에서 클라이언트와 서버가 연결될 때, 정확한 전송을 보장하기 위해 사전에 세션을 수립하는데, 이 과정을 3-way-handshake라고 합니다.",
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 0,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "network-http",
    "sourceId": "be-44",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "TCP 소켓 통신에서 클라이언트와 서버가 연결될 때, 정확한 전송을 보장하기 위해 사전에 세션을 수립하는데, 이 과정을 3-way-handshake라고 합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “TCP 소켓 통신에서 클라이언트와 서버가 연결될 때, 정확한 전송을 보장하기 위해 사전에 세션을 수립하는데, 이 과정을 3-way-handshake라고 합니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “TCP 소켓 통신에서 클라이언트와 서버가 연결될 때, 정확한 전송을 보장하기 위해 사전에 세션을 수립하는데, 이 과정을 3-way-handshake라고 합니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “TCP 소켓 통신에서 클라이언트와 서버가 연결될 때, 정확한 전송을 보장하기 위해 사전에 세션을 수립하는데, 이 과정을 3-way-handshake라고 합니다.”입니다."
    ],
    "keyPoints": [
      "본문",
      "Connection",
      "Timeout",
      "Socket"
    ]
  },
  {
    "version": 2,
    "categoryId": "network-http",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-45-main",
    "kind": "main",
    "followUpOf": null,
    "sourceId": "be-45",
    "question": "모든 데이터가 HTML에 담긴 채 브라우저로 전달되는 SSR의 장점으로 원문과 일치하는 것은?",
    "choices": [
      "초기 HTML에 색인할 콘텐츠가 없어 SEO에 불리하다",
      "SEO에 유리하다",
      "JS를 받은 뒤에만 HTML을 볼 수 있다",
      "초기 로딩 뒤 페이지 일부를 바꿀 수 없다"
    ],
    "correctIndex": 1,
    "explanation": "SSR은 HTML에 데이터가 담겨 전달되어 SEO에 유리합니다.",
    "evidenceQuote": "이처럼 모든 데이터가 이미 HTML에 담긴 채로 브라우저에 전달되기 때문에 SEO에 유리합니다.",
    "followUpOrder": null,
    "followUpRole": null,
    "sourceAnchor": "content-answer",
    "choiceFeedback": [
      "“초기 HTML에 색인할 콘텐츠가 없어 SEO에 불리하다”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “SEO에 유리하다”입니다.",
      "SSR은 HTML에 데이터가 담겨 전달되어 SEO에 유리합니다.",
      "“JS를 받은 뒤에만 HTML을 볼 수 있다”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “SEO에 유리하다”입니다.",
      "“초기 로딩 뒤 페이지 일부를 바꿀 수 없다”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “SEO에 유리하다”입니다."
    ],
    "keyPoints": [
      "본문",
      "서버",
      "사이드",
      "렌더링과"
    ]
  },
  {
    "version": 2,
    "categoryId": "network-http",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-45-follow-up",
    "kind": "follow-up",
    "followUpOf": "quiz-be-45-main",
    "sourceId": "be-45",
    "question": "CSR이 초기 로딩 이후 일부 페이지 변경에서 빠를 수 있는 이유로 맞는 것은?",
    "choices": [
      "모든 데이터가 이미 HTML에 담겨 도착하기 때문에",
      "필요한 데이터만 서버에 요청해 변경할 수 있기 때문에",
      "웹 크롤러가 빈 HTML을 바로 색인하기 때문에",
      "서버가 HTML과 CSS를 모두 렌더링하기 때문에"
    ],
    "correctIndex": 1,
    "explanation": "CSR은 초기 이후 변경할 데이터만 요청할 수 있다는 장점이 있습니다.",
    "evidenceQuote": "하지만 초기 로딩 이후 페이지 일부를 변경할 때에는 서버에 해당 데이터만 요청하면 되기 때문에 이후 구동 속도가 빠릅니다.",
    "followUpOrder": 1,
    "followUpRole": "core",
    "sourceAnchor": "content-answer",
    "choiceFeedback": [
      "“모든 데이터가 이미 HTML에 담겨 도착하기 때문에”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “필요한 데이터만 서버에 요청해 변경할 수 있기 때문에”입니다.",
      "CSR은 초기 이후 변경할 데이터만 요청할 수 있다는 장점이 있습니다.",
      "“웹 크롤러가 빈 HTML을 바로 색인하기 때문에”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “필요한 데이터만 서버에 요청해 변경할 수 있기 때문에”입니다.",
      "“서버가 HTML과 CSS를 모두 렌더링하기 때문에”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “필요한 데이터만 서버에 요청해 변경할 수 있기 때문에”입니다."
    ],
    "keyPoints": [
      "본문",
      "서버",
      "사이드",
      "렌더링과"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-45-follow-up-2",
    "kind": "follow-up",
    "followUpOf": "quiz-be-45-main",
    "followUpOrder": 2,
    "followUpRole": "core",
    "question": "서버 사이드 렌더링과 클라이언트 사이드 렌더링의 차이점은 무엇인가요 원문의 “본문” 구역과 일치하는 설명은 무엇인가요?",
    "choices": [
      "**서버 사이드 렌더링(SSR)** 은 서버 측에서 렌더링하는 방식입니다.",
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 0,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "network-http",
    "sourceId": "be-45",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "**서버 사이드 렌더링(SSR)** 은 서버 측에서 렌더링하는 방식입니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “**서버 사이드 렌더링(SSR)** 은 서버 측에서 렌더링하는 방식입니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “**서버 사이드 렌더링(SSR)** 은 서버 측에서 렌더링하는 방식입니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “**서버 사이드 렌더링(SSR)** 은 서버 측에서 렌더링하는 방식입니다.”입니다."
    ],
    "keyPoints": [
      "본문",
      "서버",
      "사이드",
      "렌더링과"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-45-follow-up-3",
    "kind": "follow-up",
    "followUpOf": "quiz-be-45-main",
    "followUpOrder": 3,
    "followUpRole": "remediation",
    "question": "서버 사이드 렌더링과 클라이언트 사이드 렌더링의 차이점은 무엇인가요의 핵심 근거를 다시 확인할 때 옳은 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "클라이언트가 서버에 컨텐츠를 요청하면, 서버는 페이지에 필요한 데이터를 즉시 얻어와 모두 삽입하고, CSS까지 모두 적용해 렌더링 준비를 마친 HTML과 JS 코드를 응답합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 1,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "network-http",
    "sourceId": "be-45",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "클라이언트가 서버에 컨텐츠를 요청하면, 서버는 페이지에 필요한 데이터를 즉시 얻어와 모두 삽입하고, CSS까지 모두 적용해 렌더링 준비를 마친 HTML과 JS 코드를 응답합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “클라이언트가 서버에 컨텐츠를 요청하면, 서버는 페이지에 필요한 데이터를 즉시 얻어와 모두 삽입하고, CSS까지 모두 적용해 렌더링 준비를 마친 HTML과 JS 코드를 응답합니다.”입니다.",
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “클라이언트가 서버에 컨텐츠를 요청하면, 서버는 페이지에 필요한 데이터를 즉시 얻어와 모두 삽입하고, CSS까지 모두 적용해 렌더링 준비를 마친 HTML과 JS 코드를 응답합니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “클라이언트가 서버에 컨텐츠를 요청하면, 서버는 페이지에 필요한 데이터를 즉시 얻어와 모두 삽입하고, CSS까지 모두 적용해 렌더링 준비를 마친 HTML과 JS 코드를 응답합니다.”입니다."
    ],
    "keyPoints": [
      "본문",
      "서버",
      "사이드",
      "렌더링과"
    ]
  },
  {
    "version": 2,
    "categoryId": "network-http",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "WAS도 정적 컨텐츠를 제공할 수 있는데 웹 서버가 따로 필요한 이유는 무엇인가요?",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-47-main",
    "kind": "main",
    "followUpOf": null,
    "sourceId": "be-47",
    "question": "정적 이미지·CSS·JS 요청이 많고 애플리케이션 로직 서버의 부하를 분리하려 합니다. 역할 분담으로 맞는 것은?",
    "choices": [
      "WAS가 정적 리소스와 모든 로직을 처리하고 웹 서버는 세션만 저장한다",
      "웹 서버가 동적 로직만 처리하고 WAS가 DNS 질의를 한다",
      "클라이언트가 정적 리소스를 생성하고 서버는 아무 것도 처리하지 않는다",
      "웹 서버가 정적 리소스를 처리하고 WAS가 애플리케이션 로직에 집중한다"
    ],
    "correctIndex": 3,
    "explanation": "웹 서버를 분리하면 WAS는 중요한 로직에 집중하고 정적 리소스는 웹 서버가 처리합니다.",
    "evidenceQuote": "웹 서버를 따로 분리하면 WAS는 중요한 애플리케이션 로직에 집중할 수 있으며, 웹 서버는 정적 리소스를 처리하면서 업무 분담이 가능합니다.",
    "followUpOrder": null,
    "followUpRole": null,
    "sourceAnchor": "was도-정적-컨텐츠를-제공할-수-있는데-웹-서버가-따로-필요한-이유는-무엇인가요",
    "choiceFeedback": [
      "“WAS가 정적 리소스와 모든 로직을 처리하고 웹 서버는 세션만 저장한다”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “웹 서버가 정적 리소스를 처리하고 WAS가 애플리케이션 로직에 집중한다”입니다.",
      "“웹 서버가 동적 로직만 처리하고 WAS가 DNS 질의를 한다”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “웹 서버가 정적 리소스를 처리하고 WAS가 애플리케이션 로직에 집중한다”입니다.",
      "“클라이언트가 정적 리소스를 생성하고 서버는 아무 것도 처리하지 않는다”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “웹 서버가 정적 리소스를 처리하고 WAS가 애플리케이션 로직에 집중한다”입니다.",
      "웹 서버를 분리하면 WAS는 중요한 로직에 집중하고 정적 리소스는 웹 서버가 처리합니다."
    ],
    "keyPoints": [
      "WAS와",
      "서버의",
      "차이점은",
      "무엇인가요?"
    ]
  },
  {
    "version": 2,
    "categoryId": "network-http",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "WAS도 정적 컨텐츠를 제공할 수 있는데 웹 서버가 따로 필요한 이유는 무엇인가요?",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-47-follow-up",
    "kind": "follow-up",
    "followUpOf": "quiz-be-47-main",
    "sourceId": "be-47",
    "question": "정적 콘텐츠 사용량과 애플리케이션 자원 사용량이 각각 늘어날 때의 확장 판단으로 원문과 일치하는 것은?",
    "choices": [
      "정적 콘텐츠가 많으면 WAS만 증설하고 웹 서버는 제거한다",
      "애플리케이션 자원이 많으면 웹 서버만 증설하고 WAS는 고정한다",
      "두 종류의 부하는 모두 클라이언트 브라우저를 증설해 해결한다",
      "정적 콘텐츠가 많으면 웹 서버, 애플리케이션 자원이 많으면 WAS를 증설한다"
    ],
    "correctIndex": 3,
    "explanation": "역할이 나뉘므로 부하 특성에 따라 웹 서버와 WAS를 각각 확장할 수 있습니다.",
    "evidenceQuote": "정적 컨텐츠가 많이 사용되는 경우에는 웹 서버를 증설하고, 애플리케이션 자원이 많이 사용되면 WAS를 증설하면 됩니다.",
    "followUpOrder": 1,
    "followUpRole": "core",
    "sourceAnchor": "was도-정적-컨텐츠를-제공할-수-있는데-웹-서버가-따로-필요한-이유는-무엇인가요",
    "choiceFeedback": [
      "“정적 콘텐츠가 많으면 WAS만 증설하고 웹 서버는 제거한다”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “정적 콘텐츠가 많으면 웹 서버, 애플리케이션 자원이 많으면 WAS를 증설한다”입니다.",
      "“애플리케이션 자원이 많으면 웹 서버만 증설하고 WAS는 고정한다”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “정적 콘텐츠가 많으면 웹 서버, 애플리케이션 자원이 많으면 WAS를 증설한다”입니다.",
      "“두 종류의 부하는 모두 클라이언트 브라우저를 증설해 해결한다”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “정적 콘텐츠가 많으면 웹 서버, 애플리케이션 자원이 많으면 WAS를 증설한다”입니다.",
      "역할이 나뉘므로 부하 특성에 따라 웹 서버와 WAS를 각각 확장할 수 있습니다."
    ],
    "keyPoints": [
      "WAS와",
      "서버의",
      "차이점은",
      "무엇인가요?"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-47-follow-up-2",
    "kind": "follow-up",
    "followUpOf": "quiz-be-47-main",
    "followUpOrder": 2,
    "followUpRole": "core",
    "question": "WAS와 웹 서버의 차이점은 무엇인가요 원문의 “본문” 구역과 일치하는 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "**웹 서버**는 정적 컨텐츠(HTML, CSS, JS, 이미지 등)를 제공하는 역할을 수행합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 2,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "network-http",
    "sourceId": "be-47",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "**웹 서버**는 정적 컨텐츠(HTML, CSS, JS, 이미지 등)를 제공하는 역할을 수행합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “**웹 서버**는 정적 컨텐츠(HTML, CSS, JS, 이미지 등)를 제공하는 역할을 수행합니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “**웹 서버**는 정적 컨텐츠(HTML, CSS, JS, 이미지 등)를 제공하는 역할을 수행합니다.”입니다.",
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “**웹 서버**는 정적 컨텐츠(HTML, CSS, JS, 이미지 등)를 제공하는 역할을 수행합니다.”입니다."
    ],
    "keyPoints": [
      "본문",
      "WAS와",
      "서버의",
      "차이점은"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-47-follow-up-3",
    "kind": "follow-up",
    "followUpOf": "quiz-be-47-main",
    "followUpOrder": 3,
    "followUpRole": "remediation",
    "question": "WAS와 웹 서버의 차이점은 무엇인가요의 핵심 근거를 다시 확인할 때 옳은 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.",
      "동적 컨텐츠 요청 시 요청을 WAS로 전달할 수도 있습니다."
    ],
    "correctIndex": 3,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "network-http",
    "sourceId": "be-47",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "동적 컨텐츠 요청 시 요청을 WAS로 전달할 수도 있습니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “동적 컨텐츠 요청 시 요청을 WAS로 전달할 수도 있습니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “동적 컨텐츠 요청 시 요청을 WAS로 전달할 수도 있습니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “동적 컨텐츠 요청 시 요청을 WAS로 전달할 수도 있습니다.”입니다.",
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다."
    ],
    "keyPoints": [
      "본문",
      "WAS와",
      "서버의",
      "차이점은"
    ]
  },
  {
    "version": 2,
    "categoryId": "network-http",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-48-main",
    "kind": "main",
    "followUpOf": null,
    "sourceId": "be-48",
    "question": "HTTP 대신 HTTPS를 사용하는 직접적인 보안 목적은?",
    "choices": [
      "암호화된 데이터를 전송해 제3자의 조회를 막기 위해",
      "HTTP 요청을 TCP 없이 전송하기 위해",
      "서버의 공개키를 클라이언트에 숨기기 위해",
      "DNS 질의를 생략하기 위해"
    ],
    "correctIndex": 0,
    "explanation": "HTTPS는 HTTP에 데이터 암호화를 추가해 제3자가 보지 못하게 합니다.",
    "evidenceQuote": "HTTPS(Hyertext Transfer Protocol Secure)** 는 HTTP에 데이터 암호화가 추가되었습니다. 암호화된 데이터를 전송하기 때문에 제 3자가 볼 수 없도록 할 수 있습니다.",
    "followUpOrder": null,
    "followUpRole": null,
    "sourceAnchor": "content-answer",
    "choiceFeedback": [
      "HTTPS는 HTTP에 데이터 암호화를 추가해 제3자가 보지 못하게 합니다.",
      "“HTTP 요청을 TCP 없이 전송하기 위해”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “암호화된 데이터를 전송해 제3자의 조회를 막기 위해”입니다.",
      "“서버의 공개키를 클라이언트에 숨기기 위해”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “암호화된 데이터를 전송해 제3자의 조회를 막기 위해”입니다.",
      "“DNS 질의를 생략하기 위해”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “암호화된 데이터를 전송해 제3자의 조회를 막기 위해”입니다."
    ],
    "keyPoints": [
      "본문",
      "HTTPS에",
      "대해서",
      "네트워크, HTTP와 웹 인프라"
    ]
  },
  {
    "version": 2,
    "categoryId": "network-http",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "HTTPS 동작 원리에 관해서 설명해 주세요.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-48-follow-up",
    "kind": "follow-up",
    "followUpOf": "quiz-be-48-main",
    "sourceId": "be-48",
    "question": "TLS 핸드셰이크가 끝난 뒤 클라이언트와 서버가 데이터를 송수신하는 암호화 방식은?",
    "choices": [
      "세션 키를 활용한 대칭키 암호화",
      "CA 개인 키를 활용한 대칭키 암호화",
      "서버 공개키만 활용한 평문 전송",
      "클라이언트 IP를 활용한 해시 전송"
    ],
    "correctIndex": 0,
    "explanation": "핸드셰이크 뒤에는 세션 키 기반 대칭키 암호화를 사용합니다.",
    "evidenceQuote": "이후부터 클라이언트와 서버는 세션 키를 활용한 대칭키 암호화 방식으로 데이터 송수신을 수행합니다.",
    "followUpOrder": 1,
    "followUpRole": "core",
    "sourceAnchor": "https-동작-원리에-관해서-설명해-주세요",
    "choiceFeedback": [
      "핸드셰이크 뒤에는 세션 키 기반 대칭키 암호화를 사용합니다.",
      "“CA 개인 키를 활용한 대칭키 암호화”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “세션 키를 활용한 대칭키 암호화”입니다.",
      "“서버 공개키만 활용한 평문 전송”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “세션 키를 활용한 대칭키 암호화”입니다.",
      "“클라이언트 IP를 활용한 해시 전송”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “세션 키를 활용한 대칭키 암호화”입니다."
    ],
    "keyPoints": [
      "HTTPS 동작 원리에 관해서 설명해 주세요.",
      "HTTPS에",
      "대해서",
      "네트워크, HTTP와 웹 인프라"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-48-follow-up-2",
    "kind": "follow-up",
    "followUpOf": "quiz-be-48-main",
    "followUpOrder": 2,
    "followUpRole": "core",
    "question": "HTTPS 원문의 “본문” 구역과 일치하는 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.",
      "**HTTP(Hypertext Transfer Protocol)** 는 웹에서 클라이언트와 서버 간 통신을 위한 통신 규약입니다."
    ],
    "correctIndex": 3,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "network-http",
    "sourceId": "be-48",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "**HTTP(Hypertext Transfer Protocol)** 는 웹에서 클라이언트와 서버 간 통신을 위한 통신 규약입니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “**HTTP(Hypertext Transfer Protocol)** 는 웹에서 클라이언트와 서버 간 통신을 위한 통신 규약입니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “**HTTP(Hypertext Transfer Protocol)** 는 웹에서 클라이언트와 서버 간 통신을 위한 통신 규약입니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “**HTTP(Hypertext Transfer Protocol)** 는 웹에서 클라이언트와 서버 간 통신을 위한 통신 규약입니다.”입니다.",
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다."
    ],
    "keyPoints": [
      "본문",
      "HTTPS에",
      "대해서",
      "네트워크, HTTP와 웹 인프라"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-48-follow-up-3",
    "kind": "follow-up",
    "followUpOf": "quiz-be-48-main",
    "followUpOrder": 3,
    "followUpRole": "remediation",
    "question": "HTTPS의 핵심 근거를 다시 확인할 때 옳은 설명은 무엇인가요?",
    "choices": [
      "하지만, HTTP는 암호화되지 않는 평문 데이터를 전송하기 때문에 제 3자가 정보를 조회할 수 있다는 위험이 있습니다.",
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 0,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "network-http",
    "sourceId": "be-48",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "하지만, HTTP는 암호화되지 않는 평문 데이터를 전송하기 때문에 제 3자가 정보를 조회할 수 있다는 위험이 있습니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “하지만, HTTP는 암호화되지 않는 평문 데이터를 전송하기 때문에 제 3자가 정보를 조회할 수 있다는 위험이 있습니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “하지만, HTTP는 암호화되지 않는 평문 데이터를 전송하기 때문에 제 3자가 정보를 조회할 수 있다는 위험이 있습니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “하지만, HTTP는 암호화되지 않는 평문 데이터를 전송하기 때문에 제 3자가 정보를 조회할 수 있다는 위험이 있습니다.”입니다."
    ],
    "keyPoints": [
      "본문",
      "HTTPS에",
      "대해서",
      "네트워크, HTTP와 웹 인프라"
    ]
  },
  {
    "version": 2,
    "categoryId": "network-http",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-52-main",
    "kind": "main",
    "followUpOf": null,
    "sourceId": "be-52",
    "question": "로드 밸런서가 로그인 세션을 만든 A가 아닌 B로 다음 요청을 보내 실패하는 문제를 무엇이라 하나요?",
    "choices": [
      "Head-of-Line Blocking 문제",
      "CORS 위반 문제",
      "Connection Timeout 문제",
      "세션 불일치 문제"
    ],
    "correctIndex": 3,
    "explanation": "다중 서버에서 세션 정보가 한 서버에만 있으면 세션 불일치가 생길 수 있습니다.",
    "evidenceQuote": "B 서버로 도착하게 되면 사용자의 세션 데이터가 존재하지 않기 때문에 요청이 제대로 처리되지 않습니다. 이를 세션 불일치 문제라고 합니다.",
    "followUpOrder": null,
    "followUpRole": null,
    "sourceAnchor": "content-answer",
    "choiceFeedback": [
      "“Head-of-Line Blocking 문제”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “세션 불일치 문제”입니다.",
      "“CORS 위반 문제”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “세션 불일치 문제”입니다.",
      "“Connection Timeout 문제”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “세션 불일치 문제”입니다.",
      "다중 서버에서 세션 정보가 한 서버에만 있으면 세션 불일치가 생길 수 있습니다."
    ],
    "keyPoints": [
      "본문",
      "다중",
      "서버",
      "환경에서"
    ]
  },
  {
    "version": 2,
    "categoryId": "network-http",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "세션 불일치 문제는 어떻게 해결할 수 있나요?",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-52-follow-up",
    "kind": "follow-up",
    "followUpOf": "quiz-be-52-main",
    "sourceId": "be-52",
    "question": "스티키 세션 방식의 한계로 원문에서 든 것은?",
    "choices": [
      "모든 서버에 세션을 복제해 메모리를 비효율적으로 쓴다",
      "외부 스토리지가 단일 장애 지점이 된다",
      "세션 정보를 URL에 넣어 CORS 오류가 난다",
      "세션을 가진 서버가 다운되면 해당 사용자가 다시 로그인해야 한다"
    ],
    "correctIndex": 3,
    "explanation": "스티키 세션은 특정 서버 고정으로 그 서버 장애 시 재로그인이 필요할 수 있습니다.",
    "evidenceQuote": "사용자의 세션 정보를 가지고 있는 서버가 다운되면 해당 서버에 고정된 사용자는 다시 로그인해야하는 문제점이 존재합니다.",
    "followUpOrder": 1,
    "followUpRole": "core",
    "sourceAnchor": "세션-불일치-문제는-어떻게-해결할-수-있나요",
    "choiceFeedback": [
      "“모든 서버에 세션을 복제해 메모리를 비효율적으로 쓴다”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “세션을 가진 서버가 다운되면 해당 사용자가 다시 로그인해야 한다”입니다.",
      "“외부 스토리지가 단일 장애 지점이 된다”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “세션을 가진 서버가 다운되면 해당 사용자가 다시 로그인해야 한다”입니다.",
      "“세션 정보를 URL에 넣어 CORS 오류가 난다”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “세션을 가진 서버가 다운되면 해당 사용자가 다시 로그인해야 한다”입니다.",
      "스티키 세션은 특정 서버 고정으로 그 서버 장애 시 재로그인이 필요할 수 있습니다."
    ],
    "keyPoints": [
      "세션 불일치 문제는 어떻게 해결할 수 있나요?",
      "다중",
      "서버",
      "환경에서"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-52-follow-up-2",
    "kind": "follow-up",
    "followUpOf": "quiz-be-52-main",
    "followUpOrder": 2,
    "followUpRole": "core",
    "question": "다중 서버 환경에서 세션 기반 인증 방식을 사용하는 경우 발생할 수 있는 문제점은 무엇인가요 원문의 “본문” 구역과 일치하는 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "다중 서버 환경에서 세션 기반 인증 방식을 사용하는 경우에는 **세션 불일치 문제**가 발생할 수 있습니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 2,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "network-http",
    "sourceId": "be-52",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "다중 서버 환경에서 세션 기반 인증 방식을 사용하는 경우에는 **세션 불일치 문제**가 발생할 수 있습니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “다중 서버 환경에서 세션 기반 인증 방식을 사용하는 경우에는 **세션 불일치 문제**가 발생할 수 있습니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “다중 서버 환경에서 세션 기반 인증 방식을 사용하는 경우에는 **세션 불일치 문제**가 발생할 수 있습니다.”입니다.",
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “다중 서버 환경에서 세션 기반 인증 방식을 사용하는 경우에는 **세션 불일치 문제**가 발생할 수 있습니다.”입니다."
    ],
    "keyPoints": [
      "본문",
      "다중",
      "서버",
      "환경에서"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-52-follow-up-3",
    "kind": "follow-up",
    "followUpOf": "quiz-be-52-main",
    "followUpOrder": 3,
    "followUpRole": "remediation",
    "question": "다중 서버 환경에서 세션 기반 인증 방식을 사용하는 경우 발생할 수 있는 문제점은 무엇인가요의 핵심 근거를 다시 확인할 때 옳은 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.",
      "만약 서버 A, B를 관리하고 있을 때, 로드밸런서는 사용자의 요청을 상황에 맞게 A, B 중 한 곳으로 전달합니다."
    ],
    "correctIndex": 3,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "network-http",
    "sourceId": "be-52",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "만약 서버 A, B를 관리하고 있을 때, 로드밸런서는 사용자의 요청을 상황에 맞게 A, B 중 한 곳으로 전달합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “만약 서버 A, B를 관리하고 있을 때, 로드밸런서는 사용자의 요청을 상황에 맞게 A, B 중 한 곳으로 전달합니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “만약 서버 A, B를 관리하고 있을 때, 로드밸런서는 사용자의 요청을 상황에 맞게 A, B 중 한 곳으로 전달합니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “만약 서버 A, B를 관리하고 있을 때, 로드밸런서는 사용자의 요청을 상황에 맞게 A, B 중 한 곳으로 전달합니다.”입니다.",
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다."
    ],
    "keyPoints": [
      "본문",
      "다중",
      "서버",
      "환경에서"
    ]
  },
  {
    "version": 2,
    "categoryId": "network-http",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "알고 계신 로드 밸런싱 알고리즘이 존재하나요?",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-53-main",
    "kind": "main",
    "followUpOf": null,
    "sourceId": "be-53",
    "question": "처리 능력이 동일한 서버 3대에 요청을 ABCABC 순서로 배정하는 알고리즘은?",
    "choices": [
      "라운드 로빈",
      "가중치 라운드 로빈",
      "최소 연결",
      "IP 해시"
    ],
    "correctIndex": 0,
    "explanation": "라운드 로빈은 모든 요청을 순서대로 처리합니다.",
    "evidenceQuote": "서버가 3대(A, B, C)가 존재하면 요청은 ABCABC 순서대로 전달됩니다.",
    "followUpOrder": null,
    "followUpRole": null,
    "sourceAnchor": "알고-계신-로드-밸런싱-알고리즘이-존재하나요",
    "choiceFeedback": [
      "라운드 로빈은 모든 요청을 순서대로 처리합니다.",
      "“가중치 라운드 로빈”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “라운드 로빈”입니다.",
      "“최소 연결”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “라운드 로빈”입니다.",
      "“IP 해시”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “라운드 로빈”입니다."
    ],
    "keyPoints": [
      "알고 계신 로드 밸런싱 알고리즘이 존재하나요?",
      "로드",
      "밸런싱에",
      "대해서"
    ]
  },
  {
    "version": 2,
    "categoryId": "network-http",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "알고 계신 로드 밸런싱 알고리즘이 존재하나요?",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-53-follow-up",
    "kind": "follow-up",
    "followUpOf": "quiz-be-53-main",
    "sourceId": "be-53",
    "question": "서버별 활성 연결 수를 보고 가장 적은 연결을 가진 서버로 요청을 보내는 방식은?",
    "choices": [
      "최소 연결(Least Connections)",
      "라운드 로빈",
      "최소 응답 시간",
      "IP 해시"
    ],
    "correctIndex": 0,
    "explanation": "최소 연결은 활성 연결 수가 가장 적은 서버에게 요청을 전달합니다.",
    "evidenceQuote": "가장 적은 활성 연결이 존재하는 서버에게 요청을 전달하는 방식입니다.",
    "followUpOrder": 1,
    "followUpRole": "core",
    "sourceAnchor": "알고-계신-로드-밸런싱-알고리즘이-존재하나요",
    "choiceFeedback": [
      "최소 연결은 활성 연결 수가 가장 적은 서버에게 요청을 전달합니다.",
      "“라운드 로빈”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “최소 연결(Least Connections)”입니다.",
      "“최소 응답 시간”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “최소 연결(Least Connections)”입니다.",
      "“IP 해시”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “최소 연결(Least Connections)”입니다."
    ],
    "keyPoints": [
      "알고 계신 로드 밸런싱 알고리즘이 존재하나요?",
      "로드",
      "밸런싱에",
      "대해서"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-53-follow-up-2",
    "kind": "follow-up",
    "followUpOf": "quiz-be-53-main",
    "followUpOrder": 2,
    "followUpRole": "core",
    "question": "로드 밸런싱 원문의 “본문” 구역과 일치하는 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.",
      "**로드 밸런싱이란 애플리케이션을 지원하는 리소스 풀에 들어오는 네트워크 트래픽(들어오는 요청)을 균등하게 분산**하는 것을 의미합니다."
    ],
    "correctIndex": 3,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "network-http",
    "sourceId": "be-53",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "**로드 밸런싱이란 애플리케이션을 지원하는 리소스 풀에 들어오는 네트워크 트래픽(들어오는 요청)을 균등하게 분산**하는 것을 의미합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “**로드 밸런싱이란 애플리케이션을 지원하는 리소스 풀에 들어오는 네트워크 트래픽(들어오는 요청)을 균등하게 분산**하는 것을 의미합니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “**로드 밸런싱이란 애플리케이션을 지원하는 리소스 풀에 들어오는 네트워크 트래픽(들어오는 요청)을 균등하게 분산**하는 것을 의미합니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “**로드 밸런싱이란 애플리케이션을 지원하는 리소스 풀에 들어오는 네트워크 트래픽(들어오는 요청)을 균등하게 분산**하는 것을 의미합니다.”입니다.",
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다."
    ],
    "keyPoints": [
      "본문",
      "로드",
      "밸런싱에",
      "대해서"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-53-follow-up-3",
    "kind": "follow-up",
    "followUpOf": "quiz-be-53-main",
    "followUpOrder": 3,
    "followUpRole": "remediation",
    "question": "로드 밸런싱의 핵심 근거를 다시 확인할 때 옳은 설명은 무엇인가요?",
    "choices": [
      "이를 수행하는 로드 밸런서는 애플리케이션 서버 앞단에 위치하며 클라이언트 요청을 지시하고 제어합니다.",
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 0,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "network-http",
    "sourceId": "be-53",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "이를 수행하는 로드 밸런서는 애플리케이션 서버 앞단에 위치하며 클라이언트 요청을 지시하고 제어합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “이를 수행하는 로드 밸런서는 애플리케이션 서버 앞단에 위치하며 클라이언트 요청을 지시하고 제어합니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “이를 수행하는 로드 밸런서는 애플리케이션 서버 앞단에 위치하며 클라이언트 요청을 지시하고 제어합니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “이를 수행하는 로드 밸런서는 애플리케이션 서버 앞단에 위치하며 클라이언트 요청을 지시하고 제어합니다.”입니다."
    ],
    "keyPoints": [
      "본문",
      "로드",
      "밸런싱에",
      "대해서"
    ]
  },
  {
    "version": 2,
    "categoryId": "network-http",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-56-main",
    "kind": "main",
    "followUpOf": null,
    "sourceId": "be-56",
    "question": "REST 방식에서 주문 같은 자원을 명시하고 CRUD 연산을 적용하는 조합은?",
    "choices": [
      "세션 ID로 자원을 명시하고 TCP 포트로 CRUD를 적용한다",
      "DNS 이름으로 자원을 명시하고 쿠키로 CRUD를 적용한다",
      "IP 주소로 자원을 명시하고 TLS로 CRUD를 적용한다",
      "HTTP URI로 자원을 명시하고 HTTP METHOD로 CRUD를 적용한다"
    ],
    "correctIndex": 3,
    "explanation": "REST는 HTTP URI와 METHOD를 사용해 자원과 CRUD를 표현합니다.",
    "evidenceQuote": "HTTP URI를 활용하여 자원을 명시하고 HTTP METHOD를 통해 CRUD 연산을 적용하는 것을 의미합니다.",
    "followUpOrder": null,
    "followUpRole": null,
    "sourceAnchor": "content-answer",
    "choiceFeedback": [
      "“세션 ID로 자원을 명시하고 TCP 포트로 CRUD를 적용한다”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “HTTP URI로 자원을 명시하고 HTTP METHOD로 CRUD를 적용한다”입니다.",
      "“DNS 이름으로 자원을 명시하고 쿠키로 CRUD를 적용한다”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “HTTP URI로 자원을 명시하고 HTTP METHOD로 CRUD를 적용한다”입니다.",
      "“IP 주소로 자원을 명시하고 TLS로 CRUD를 적용한다”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “HTTP URI로 자원을 명시하고 HTTP METHOD로 CRUD를 적용한다”입니다.",
      "REST는 HTTP URI와 METHOD를 사용해 자원과 CRUD를 표현합니다."
    ],
    "keyPoints": [
      "본문",
      "REST란",
      "무엇인가요?",
      "네트워크, HTTP와 웹 인프라"
    ]
  },
  {
    "version": 2,
    "categoryId": "network-http",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "REST의 장단점은 무엇인가요?",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-56-follow-up",
    "kind": "follow-up",
    "followUpOf": "quiz-be-56-main",
    "sourceId": "be-56",
    "question": "REST에서 JSON 같은 텍스트 포맷이 메시지 구조 변경에 유리한 이유는?",
    "choices": [
      "메시지 길이가 항상 이진 포맷보다 짧아서",
      "요청 한 번에 모든 자원을 반드시 가져와서",
      "HTTP 메서드의 행위를 항상 완전하게 표현해서",
      "소비자가 관심 있는 값만 사용하고 나머지를 무시할 수 있어서"
    ],
    "correctIndex": 3,
    "explanation": "텍스트 포맷은 소비자가 필요한 값만 선택할 수 있어 하위 호환에 유리합니다.",
    "evidenceQuote": "메시지 소비자가 자신이 관심이 있는 값만 골라서 사용하고 나머지는 무시하면 되므로 메시지 구조가 자주 바뀌어도 하위 호환성을 보장하는 것이 유리합니다.",
    "followUpOrder": 1,
    "followUpRole": "core",
    "sourceAnchor": "rest의-장단점은-무엇인가요",
    "choiceFeedback": [
      "“메시지 길이가 항상 이진 포맷보다 짧아서”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “소비자가 관심 있는 값만 사용하고 나머지를 무시할 수 있어서”입니다.",
      "“요청 한 번에 모든 자원을 반드시 가져와서”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “소비자가 관심 있는 값만 사용하고 나머지를 무시할 수 있어서”입니다.",
      "“HTTP 메서드의 행위를 항상 완전하게 표현해서”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “소비자가 관심 있는 값만 사용하고 나머지를 무시할 수 있어서”입니다.",
      "텍스트 포맷은 소비자가 필요한 값만 선택할 수 있어 하위 호환에 유리합니다."
    ],
    "keyPoints": [
      "REST의 장단점은 무엇인가요?",
      "REST란",
      "무엇인가요?",
      "네트워크, HTTP와 웹 인프라"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-56-follow-up-2",
    "kind": "follow-up",
    "followUpOf": "quiz-be-56-main",
    "followUpOrder": 2,
    "followUpRole": "core",
    "question": "REST란 무엇인가요 원문의 “본문” 구역과 일치하는 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "**REST(Representational State Transfer) 는 자원의 표현을 이용하여 상태를 주고받는 것**을 의미합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 2,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "network-http",
    "sourceId": "be-56",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "**REST(Representational State Transfer) 는 자원의 표현을 이용하여 상태를 주고받는 것**을 의미합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “**REST(Representational State Transfer) 는 자원의 표현을 이용하여 상태를 주고받는 것**을 의미합니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “**REST(Representational State Transfer) 는 자원의 표현을 이용하여 상태를 주고받는 것**을 의미합니다.”입니다.",
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “**REST(Representational State Transfer) 는 자원의 표현을 이용하여 상태를 주고받는 것**을 의미합니다.”입니다."
    ],
    "keyPoints": [
      "본문",
      "REST란",
      "무엇인가요?",
      "네트워크, HTTP와 웹 인프라"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-56-follow-up-3",
    "kind": "follow-up",
    "followUpOf": "quiz-be-56-main",
    "followUpOrder": 3,
    "followUpRole": "remediation",
    "question": "REST란 무엇인가요의 핵심 근거를 다시 확인할 때 옳은 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.",
      "여기서 자원이란 소프트웨어가 관리하는 모든 것을 의미하며 자원의 표현은 자원을 나타내기 위한 이름을 의미합니다."
    ],
    "correctIndex": 3,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "network-http",
    "sourceId": "be-56",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "여기서 자원이란 소프트웨어가 관리하는 모든 것을 의미하며 자원의 표현은 자원을 나타내기 위한 이름을 의미합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “여기서 자원이란 소프트웨어가 관리하는 모든 것을 의미하며 자원의 표현은 자원을 나타내기 위한 이름을 의미합니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “여기서 자원이란 소프트웨어가 관리하는 모든 것을 의미하며 자원의 표현은 자원을 나타내기 위한 이름을 의미합니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “여기서 자원이란 소프트웨어가 관리하는 모든 것을 의미하며 자원의 표현은 자원을 나타내기 위한 이름을 의미합니다.”입니다.",
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다."
    ],
    "keyPoints": [
      "본문",
      "REST란",
      "무엇인가요?",
      "네트워크, HTTP와 웹 인프라"
    ]
  },
  {
    "version": 2,
    "categoryId": "network-http",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-58-main",
    "kind": "main",
    "followUpOf": null,
    "sourceId": "be-58",
    "question": "서버 한 대의 사양을 t2.micro에서 t2.small로 올리는 확장 방식은?",
    "choices": [
      "스케일 아웃",
      "스케일 업",
      "로드 밸런싱",
      "세션 클러스터링"
    ],
    "correctIndex": 1,
    "explanation": "스케일 업은 기존 서버를 더 높은 사양으로 업그레이드합니다.",
    "evidenceQuote": "예를 들어, AWS에서 EC2 t2.micro에서 t2.small로 업그레이드하는 방식이 스케일 업입니다.",
    "followUpOrder": null,
    "followUpRole": null,
    "sourceAnchor": "content-answer",
    "choiceFeedback": [
      "“스케일 아웃”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “스케일 업”입니다.",
      "스케일 업은 기존 서버를 더 높은 사양으로 업그레이드합니다.",
      "“로드 밸런싱”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “스케일 업”입니다.",
      "“세션 클러스터링”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “스케일 업”입니다."
    ],
    "keyPoints": [
      "본문",
      "스케일",
      "아웃과",
      "업의"
    ]
  },
  {
    "version": 2,
    "categoryId": "network-http",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-58-follow-up",
    "kind": "follow-up",
    "followUpOf": "quiz-be-58-main",
    "sourceId": "be-58",
    "question": "비슷한 사양의 서버를 여러 대 추가하는 스케일 아웃에서 추가로 고려할 사항은?",
    "choices": [
      "단일 서버의 CPU만 계속 올리는 방법",
      "서버에 부하를 분산할 로드 밸런싱",
      "클라이언트의 DNS 캐시를 무조건 비우는 방법",
      "서버마다 서로 다른 HTTP 프로토콜을 사용하는 방법"
    ],
    "correctIndex": 1,
    "explanation": "스케일 아웃은 여러 서버에 부하를 나누므로 로드 밸런싱이 필요합니다.",
    "evidenceQuote": "각 서버에 부하를 분산하기 위한 로드 밸런싱에 대한 고민이 추가로 필요하다는 단점이 있습니다.",
    "followUpOrder": 1,
    "followUpRole": "core",
    "sourceAnchor": "content-answer",
    "choiceFeedback": [
      "“단일 서버의 CPU만 계속 올리는 방법”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “서버에 부하를 분산할 로드 밸런싱”입니다.",
      "스케일 아웃은 여러 서버에 부하를 나누므로 로드 밸런싱이 필요합니다.",
      "“클라이언트의 DNS 캐시를 무조건 비우는 방법”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “서버에 부하를 분산할 로드 밸런싱”입니다.",
      "“서버마다 서로 다른 HTTP 프로토콜을 사용하는 방법”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “서버에 부하를 분산할 로드 밸런싱”입니다."
    ],
    "keyPoints": [
      "본문",
      "스케일",
      "아웃과",
      "업의"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-58-follow-up-2",
    "kind": "follow-up",
    "followUpOf": "quiz-be-58-main",
    "followUpOrder": 2,
    "followUpRole": "core",
    "question": "스케일 아웃과 스케일 업의 차이점을 원문의 “본문” 구역과 일치하는 설명은 무엇인가요?",
    "choices": [
      "기존 개발하고 있던 서비스의 서버가 한계에 도달하는 경우, **스케일 업(Scale-Up)**  혹은 **스케일 아웃(Scale-Out)** 을 고려할 수 있습니다.",
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 0,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "network-http",
    "sourceId": "be-58",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "기존 개발하고 있던 서비스의 서버가 한계에 도달하는 경우, **스케일 업(Scale-Up)**  혹은 **스케일 아웃(Scale-Out)** 을 고려할 수 있습니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “기존 개발하고 있던 서비스의 서버가 한계에 도달하는 경우, **스케일 업(Scale-Up)**  혹은 **스케일 아웃(Scale-Out)** 을 고려할 수 있습니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “기존 개발하고 있던 서비스의 서버가 한계에 도달하는 경우, **스케일 업(Scale-Up)**  혹은 **스케일 아웃(Scale-Out)** 을 고려할 수 있습니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “기존 개발하고 있던 서비스의 서버가 한계에 도달하는 경우, **스케일 업(Scale-Up)**  혹은 **스케일 아웃(Scale-Out)** 을 고려할 수 있습니다.”입니다."
    ],
    "keyPoints": [
      "본문",
      "스케일",
      "아웃과",
      "업의"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-58-follow-up-3",
    "kind": "follow-up",
    "followUpOf": "quiz-be-58-main",
    "followUpOrder": 3,
    "followUpRole": "remediation",
    "question": "스케일 아웃과 스케일 업의 차이점을의 핵심 근거를 다시 확인할 때 옳은 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "**스케일 업** 은 기존의 서버를 더욱 높은 사양으로 업그레이드하는 것을 의미합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 1,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "network-http",
    "sourceId": "be-58",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "**스케일 업** 은 기존의 서버를 더욱 높은 사양으로 업그레이드하는 것을 의미합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “**스케일 업** 은 기존의 서버를 더욱 높은 사양으로 업그레이드하는 것을 의미합니다.”입니다.",
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “**스케일 업** 은 기존의 서버를 더욱 높은 사양으로 업그레이드하는 것을 의미합니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “**스케일 업** 은 기존의 서버를 더욱 높은 사양으로 업그레이드하는 것을 의미합니다.”입니다."
    ],
    "keyPoints": [
      "본문",
      "스케일",
      "아웃과",
      "업의"
    ]
  },
  {
    "version": 2,
    "categoryId": "network-http",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "HTTP/1.1에 대해서 설명해주세요.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-60-main",
    "kind": "main",
    "followUpOf": null,
    "sourceId": "be-60",
    "question": "HTTP/1.1이 요청마다 TCP 연결을 새로 만드는 오버헤드를 완화한 방법은?",
    "choices": [
      "각 요청을 별도의 새 TCP 연결로 전송",
      "응답 순서를 무시하는 멀티플렉싱",
      "지정한 타임아웃 동안 연결을 닫지 않는 지속 커넥션",
      "반복 헤더를 모두 평문으로 추가 전송"
    ],
    "correctIndex": 2,
    "explanation": "HTTP/1.1은 지속 커넥션으로 연결 생성 오버헤드를 줄입니다.",
    "evidenceQuote": "**HTTP/1.1**은 이러한 문제를 **지속 커넥션(Persistent Connection)** 이라는 지정한 타임아웃만큼 커넥션을 종료하지 않는 방식으로 해결합니다.",
    "followUpOrder": null,
    "followUpRole": null,
    "sourceAnchor": "http11에-대해서-설명해주세요",
    "choiceFeedback": [
      "“각 요청을 별도의 새 TCP 연결로 전송”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “지정한 타임아웃 동안 연결을 닫지 않는 지속 커넥션”입니다.",
      "“응답 순서를 무시하는 멀티플렉싱”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “지정한 타임아웃 동안 연결을 닫지 않는 지속 커넥션”입니다.",
      "HTTP/1.1은 지속 커넥션으로 연결 생성 오버헤드를 줄입니다.",
      "“반복 헤더를 모두 평문으로 추가 전송”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “지정한 타임아웃 동안 연결을 닫지 않는 지속 커넥션”입니다."
    ],
    "keyPoints": [
      "HTTP/1.1에 대해서 설명해주세요.",
      "HTTP",
      "1.1과",
      "2.0에"
    ]
  },
  {
    "version": 2,
    "categoryId": "network-http",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "HTTP/2.0에 대해서 설명해주세요.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-60-follow-up",
    "kind": "follow-up",
    "followUpOf": "quiz-be-60-main",
    "sourceId": "be-60",
    "question": "HTTP/2의 멀티플렉싱이 HTTP/1.1 파이프라이닝의 어떤 문제를 해결하는가?",
    "choices": [
      "DNS가 도메인 IP를 찾지 못하는 문제",
      "서버가 TLS 인증서를 발급하지 못하는 문제",
      "첫 요청이 늦으면 뒤 요청이 기다리는 애플리케이션 계층 HOL Blocking",
      "쿠키가 브라우저에 저장되는 문제"
    ],
    "correctIndex": 2,
    "explanation": "HTTP/2는 각 요청을 독립적으로 처리해 애플리케이션 계층 HOL Blocking을 해결합니다.",
    "evidenceQuote": "클라이언트가 서버로 여러 요청을 동시에 보내도 각 요청이 독립적으로 처리되기 때문에 애플리케이션 레이어의 HOL Blocking 문제를 해결합니다.",
    "followUpOrder": 1,
    "followUpRole": "core",
    "sourceAnchor": "http20에-대해서-설명해주세요",
    "choiceFeedback": [
      "“DNS가 도메인 IP를 찾지 못하는 문제”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “첫 요청이 늦으면 뒤 요청이 기다리는 애플리케이션 계층 HOL Blocking”입니다.",
      "“서버가 TLS 인증서를 발급하지 못하는 문제”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “첫 요청이 늦으면 뒤 요청이 기다리는 애플리케이션 계층 HOL Blocking”입니다.",
      "HTTP/2는 각 요청을 독립적으로 처리해 애플리케이션 계층 HOL Blocking을 해결합니다.",
      "“쿠키가 브라우저에 저장되는 문제”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “첫 요청이 늦으면 뒤 요청이 기다리는 애플리케이션 계층 HOL Blocking”입니다."
    ],
    "keyPoints": [
      "HTTP/2.0에 대해서 설명해주세요.",
      "HTTP",
      "1.1과",
      "2.0에"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-60-follow-up-2",
    "kind": "follow-up",
    "followUpOf": "quiz-be-60-main",
    "followUpOrder": 2,
    "followUpRole": "core",
    "question": "HTTP/1.1과 HTTP/2.0 원문의 “HTTP/1.1에 대해서 설명해주세요.” 구역과 일치하는 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "HTTP는 웹상에서 클라이언트와 서버 간 통신을 위한 프로토콜입니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 1,
    "explanation": "원문의 “HTTP/1.1에 대해서 설명해주세요.” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "network-http",
    "sourceId": "be-60",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "HTTP/1.1에 대해서 설명해주세요.",
    "sourceAnchor": "http11에-대해서-설명해주세요",
    "evidenceQuote": "HTTP는 웹상에서 클라이언트와 서버 간 통신을 위한 프로토콜입니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “HTTP는 웹상에서 클라이언트와 서버 간 통신을 위한 프로토콜입니다.”입니다.",
      "원문의 “HTTP/1.1에 대해서 설명해주세요.” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “HTTP는 웹상에서 클라이언트와 서버 간 통신을 위한 프로토콜입니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “HTTP는 웹상에서 클라이언트와 서버 간 통신을 위한 프로토콜입니다.”입니다."
    ],
    "keyPoints": [
      "HTTP/1.1에 대해서 설명해주세요.",
      "HTTP",
      "1.1과",
      "2.0에"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-60-follow-up-3",
    "kind": "follow-up",
    "followUpOf": "quiz-be-60-main",
    "followUpOrder": 3,
    "followUpRole": "remediation",
    "question": "HTTP/1.1과 HTTP/2.0의 핵심 근거를 다시 확인할 때 옳은 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "0의 경우에는 한 개의 요청과 응답마다 TCP 커넥션을 생성하여 사용됐습니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 2,
    "explanation": "원문의 “HTTP/1.1에 대해서 설명해주세요.” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "network-http",
    "sourceId": "be-60",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "HTTP/1.1에 대해서 설명해주세요.",
    "sourceAnchor": "http11에-대해서-설명해주세요",
    "evidenceQuote": "0의 경우에는 한 개의 요청과 응답마다 TCP 커넥션을 생성하여 사용됐습니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “0의 경우에는 한 개의 요청과 응답마다 TCP 커넥션을 생성하여 사용됐습니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “0의 경우에는 한 개의 요청과 응답마다 TCP 커넥션을 생성하여 사용됐습니다.”입니다.",
      "원문의 “HTTP/1.1에 대해서 설명해주세요.” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “0의 경우에는 한 개의 요청과 응답마다 TCP 커넥션을 생성하여 사용됐습니다.”입니다."
    ],
    "keyPoints": [
      "HTTP/1.1에 대해서 설명해주세요.",
      "HTTP",
      "1.1과",
      "2.0에"
    ]
  },
  {
    "version": 2,
    "categoryId": "network-http",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-72-main",
    "kind": "main",
    "followUpOf": null,
    "sourceId": "be-72",
    "question": "인터넷에서 자원을 식별하기 위한 문자열은?",
    "choices": [
      "URL",
      "URI",
      "URN",
      "IP 주소"
    ],
    "correctIndex": 1,
    "explanation": "URI는 인터넷 자원을 식별하기 위한 문자열입니다.",
    "evidenceQuote": "**URI (Uniform Resource Identifier)** 는 인터넷에서 자원을 식별하기 위한 문자열입니다.",
    "followUpOrder": null,
    "followUpRole": null,
    "sourceAnchor": "content-answer",
    "choiceFeedback": [
      "“URL”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “URI”입니다.",
      "URI는 인터넷 자원을 식별하기 위한 문자열입니다.",
      "“URN”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “URI”입니다.",
      "“IP 주소”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “URI”입니다."
    ],
    "keyPoints": [
      "본문",
      "URI",
      "URL",
      "URN의"
    ]
  },
  {
    "version": 2,
    "categoryId": "network-http",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-72-follow-up",
    "kind": "follow-up",
    "followUpOf": "quiz-be-72-main",
    "sourceId": "be-72",
    "question": "자원의 위치가 바뀌어도 같은 식별자를 유지하도록 자원의 이름을 식별하는 URI 형태는?",
    "choices": [
      "URL",
      "URN",
      "HTTP",
      "DNS"
    ],
    "correctIndex": 1,
    "explanation": "URN은 위치와 상관없이 자원 이름을 식별하고 영구 식별자를 제공합니다.",
    "evidenceQuote": "URN (Uniform Resource Name)** 은 URI의 또 다른 형태로, 자원의 위치와 상관없이 자원의 이름을 식별하는 방식입니다.",
    "followUpOrder": 1,
    "followUpRole": "core",
    "sourceAnchor": "content-answer",
    "choiceFeedback": [
      "“URL”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “URN”입니다.",
      "URN은 위치와 상관없이 자원 이름을 식별하고 영구 식별자를 제공합니다.",
      "“HTTP”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “URN”입니다.",
      "“DNS”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “URN”입니다."
    ],
    "keyPoints": [
      "본문",
      "URI",
      "URL",
      "URN의"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-72-follow-up-2",
    "kind": "follow-up",
    "followUpOf": "quiz-be-72-main",
    "followUpOrder": 2,
    "followUpRole": "core",
    "question": "URI, URL, URN의 차이점은 무엇인가요 원문의 “본문” 구역과 일치하는 설명은 무엇인가요?",
    "choices": [
      "URI는 URL과 URN을 포함하는 상위 개념입니다.",
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 0,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "network-http",
    "sourceId": "be-72",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "URI는 URL과 URN을 포함하는 상위 개념입니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “URI는 URL과 URN을 포함하는 상위 개념입니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “URI는 URL과 URN을 포함하는 상위 개념입니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “URI는 URL과 URN을 포함하는 상위 개념입니다.”입니다."
    ],
    "keyPoints": [
      "본문",
      "URI",
      "URL",
      "URN의"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-72-follow-up-3",
    "kind": "follow-up",
    "followUpOf": "quiz-be-72-main",
    "followUpOrder": 3,
    "followUpRole": "remediation",
    "question": "URI, URL, URN의 차이점은 무엇인가요의 핵심 근거를 다시 확인할 때 옳은 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "즉, 특정 자원을 식별하기 위한 포괄적인 방법을 제공하며, 자원의 위치나 이름을 나타낼 수 있습니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 1,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "network-http",
    "sourceId": "be-72",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "즉, 특정 자원을 식별하기 위한 포괄적인 방법을 제공하며, 자원의 위치나 이름을 나타낼 수 있습니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “즉, 특정 자원을 식별하기 위한 포괄적인 방법을 제공하며, 자원의 위치나 이름을 나타낼 수 있습니다.”입니다.",
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “즉, 특정 자원을 식별하기 위한 포괄적인 방법을 제공하며, 자원의 위치나 이름을 나타낼 수 있습니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “즉, 특정 자원을 식별하기 위한 포괄적인 방법을 제공하며, 자원의 위치나 이름을 나타낼 수 있습니다.”입니다."
    ],
    "keyPoints": [
      "본문",
      "URI",
      "URL",
      "URN의"
    ]
  },
  {
    "version": 2,
    "categoryId": "network-http",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "클래스리스 주소 체계는 무엇인가요?",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-78-main",
    "kind": "main",
    "followUpOf": null,
    "sourceId": "be-78",
    "question": "클래스리스 주소 체계에서 네트워크 주소와 호스트 주소를 구분하는 데 사용하는 것은?",
    "choices": [
      "IP 클래스 A·B·C",
      "TCP 포트 번호",
      "MAC 주소",
      "서브넷 마스크"
    ],
    "correctIndex": 3,
    "explanation": "클래스리스 주소 체계는 서브넷 마스크로 네트워크와 호스트를 구분합니다.",
    "evidenceQuote": "**클래스리스 주소 체계는(Classless Addressing)** 클래스가 아닌 서브넷 마스크를 이용해 네트워크 주소와 호스트 주소를 구분하는 IP 주소 체계입니다.",
    "followUpOrder": null,
    "followUpRole": null,
    "sourceAnchor": "클래스리스-주소-체계는-무엇인가요",
    "choiceFeedback": [
      "“IP 클래스 A·B·C”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “서브넷 마스크”입니다.",
      "“TCP 포트 번호”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “서브넷 마스크”입니다.",
      "“MAC 주소”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “서브넷 마스크”입니다.",
      "클래스리스 주소 체계는 서브넷 마스크로 네트워크와 호스트를 구분합니다."
    ],
    "keyPoints": [
      "클래스리스 주소 체계는 무엇인가요?",
      "클래스풀",
      "IP",
      "주소"
    ]
  },
  {
    "version": 2,
    "categoryId": "network-http",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "클래스리스 주소 체계는 무엇인가요?",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-78-follow-up",
    "kind": "follow-up",
    "followUpOf": "quiz-be-78-main",
    "sourceId": "be-78",
    "question": "IP가 168.168.168.168이고 서브넷 마스크가 255.255.255.0일 때 원문 예시의 CIDR 표기는?",
    "choices": [
      "168.168.168.168/16",
      "168.168.168.168/8",
      "168.168.168.0/32",
      "168.168.168.168/24"
    ],
    "correctIndex": 3,
    "explanation": "255.255.255.0의 1 비트 수는 24이므로 /24로 표기합니다.",
    "evidenceQuote": "IP 주소가 168.168.168.168이며, 서브넷 마스크가 255.255.255.0인 경우에는 168.168.168.168/24 와 같이 표기할 수 있습니다.",
    "followUpOrder": 1,
    "followUpRole": "core",
    "sourceAnchor": "클래스리스-주소-체계는-무엇인가요",
    "choiceFeedback": [
      "“168.168.168.168/16”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “168.168.168.168/24”입니다.",
      "“168.168.168.168/8”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “168.168.168.168/24”입니다.",
      "“168.168.168.0/32”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “168.168.168.168/24”입니다.",
      "255.255.255.0의 1 비트 수는 24이므로 /24로 표기합니다."
    ],
    "keyPoints": [
      "클래스리스 주소 체계는 무엇인가요?",
      "클래스풀",
      "IP",
      "주소"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-78-follow-up-2",
    "kind": "follow-up",
    "followUpOf": "quiz-be-78-main",
    "followUpOrder": 2,
    "followUpRole": "core",
    "question": "클래스풀 IP 주소 체계 원문의 “본문” 구역과 일치하는 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "**클래스풀 주소 체계(Classful Addressing)** 은 IP 주소를 규격화된 크기별로 구분시키는 방식입니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 2,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "network-http",
    "sourceId": "be-78",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "**클래스풀 주소 체계(Classful Addressing)** 은 IP 주소를 규격화된 크기별로 구분시키는 방식입니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “**클래스풀 주소 체계(Classful Addressing)** 은 IP 주소를 규격화된 크기별로 구분시키는 방식입니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “**클래스풀 주소 체계(Classful Addressing)** 은 IP 주소를 규격화된 크기별로 구분시키는 방식입니다.”입니다.",
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “**클래스풀 주소 체계(Classful Addressing)** 은 IP 주소를 규격화된 크기별로 구분시키는 방식입니다.”입니다."
    ],
    "keyPoints": [
      "본문",
      "클래스풀",
      "IP",
      "주소"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-78-follow-up-3",
    "kind": "follow-up",
    "followUpOf": "quiz-be-78-main",
    "followUpOrder": 3,
    "followUpRole": "remediation",
    "question": "클래스풀 IP 주소 체계의 핵심 근거를 다시 확인할 때 옳은 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.",
      "IP 주소를 클래스(A,B,C 등)별로 규격화(유형화)시켜, 쉽게 식별할 수 있도록 합니다."
    ],
    "correctIndex": 3,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "network-http",
    "sourceId": "be-78",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "IP 주소를 클래스(A,B,C 등)별로 규격화(유형화)시켜, 쉽게 식별할 수 있도록 합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “IP 주소를 클래스(A,B,C 등)별로 규격화(유형화)시켜, 쉽게 식별할 수 있도록 합니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “IP 주소를 클래스(A,B,C 등)별로 규격화(유형화)시켜, 쉽게 식별할 수 있도록 합니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “IP 주소를 클래스(A,B,C 등)별로 규격화(유형화)시켜, 쉽게 식별할 수 있도록 합니다.”입니다.",
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다."
    ],
    "keyPoints": [
      "본문",
      "클래스풀",
      "IP",
      "주소"
    ]
  },
  {
    "version": 2,
    "categoryId": "network-http",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-81-main",
    "kind": "main",
    "followUpOf": null,
    "sourceId": "be-81",
    "question": "사설 네트워크의 호스트가 외부 네트워크와 통신할 수 있도록 사설 IP를 공인 IP로 바꾸는 기술은?",
    "choices": [
      "DHCP",
      "NAT",
      "DNS",
      "CDN"
    ],
    "correctIndex": 1,
    "explanation": "NAT는 사설 IP를 공인 IP로 변환해 외부와 통신하게 합니다.",
    "evidenceQuote": "NAT는 IP 주소를 변환하는 기술입니다. 해당 기능을 사용하면, 사설 IP 주소를 외부 네트워크에 사용되는 공인 IP 주소로 변환하여 외부 네트워크와 통신할 수 있습니다.",
    "followUpOrder": null,
    "followUpRole": null,
    "sourceAnchor": "content-answer",
    "choiceFeedback": [
      "“DHCP”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “NAT”입니다.",
      "NAT는 사설 IP를 공인 IP로 변환해 외부와 통신하게 합니다.",
      "“DNS”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “NAT”입니다.",
      "“CDN”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “NAT”입니다."
    ],
    "keyPoints": [
      "본문",
      "NAT",
      "기능을",
      "사용하는"
    ]
  },
  {
    "version": 2,
    "categoryId": "network-http",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "NAT 변환 테이블에서 공인 IP 주소와 사설 IP 주소는 일대일로 대응되어 있나요?",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-81-follow-up",
    "kind": "follow-up",
    "followUpOf": "quiz-be-81-main",
    "sourceId": "be-81",
    "question": "여러 사설 IP가 하나의 공인 IP를 공유해야 할 때 일반적으로 사용하는 포트 기반 NAT는?",
    "choices": [
      "SPOF",
      "NAPT",
      "CORS",
      "SSR"
    ],
    "correctIndex": 1,
    "explanation": "NAPT는 IP 주소 쌍과 함께 포트도 변환 테이블에 기록합니다.",
    "evidenceQuote": "일반적으로 공인 IP와 사설 IP가 일대일로 대응하지 않고, **NAPT(Network Address Port Translation)** 이라는 포트 기반의 NAT를 사용합니다.",
    "followUpOrder": 1,
    "followUpRole": "core",
    "sourceAnchor": "nat-변환-테이블에서-공인-ip-주소와-사설-ip-주소는-일대일로-대응되어-있나요",
    "choiceFeedback": [
      "“SPOF”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “NAPT”입니다.",
      "NAPT는 IP 주소 쌍과 함께 포트도 변환 테이블에 기록합니다.",
      "“CORS”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “NAPT”입니다.",
      "“SSR”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “NAPT”입니다."
    ],
    "keyPoints": [
      "NAT",
      "기능을",
      "사용하는",
      "이유를"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-81-follow-up-2",
    "kind": "follow-up",
    "followUpOf": "quiz-be-81-main",
    "followUpOrder": 2,
    "followUpRole": "core",
    "question": "NAT 기능을 사용하는 이유를 알고 계신가요 원문의 “본문” 구역과 일치하는 설명은 무엇인가요?",
    "choices": [
      "IP 주소는 **공인 IP 주소(Public IP Address)** 와 **사설 IP 주소(Private IP Address)** 가 존재합니다.",
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 0,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "network-http",
    "sourceId": "be-81",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "IP 주소는 **공인 IP 주소(Public IP Address)** 와 **사설 IP 주소(Private IP Address)** 가 존재합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “IP 주소는 **공인 IP 주소(Public IP Address)** 와 **사설 IP 주소(Private IP Address)** 가 존재합니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “IP 주소는 **공인 IP 주소(Public IP Address)** 와 **사설 IP 주소(Private IP Address)** 가 존재합니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “IP 주소는 **공인 IP 주소(Public IP Address)** 와 **사설 IP 주소(Private IP Address)** 가 존재합니다.”입니다."
    ],
    "keyPoints": [
      "본문",
      "NAT",
      "기능을",
      "사용하는"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-81-follow-up-3",
    "kind": "follow-up",
    "followUpOf": "quiz-be-81-main",
    "followUpOrder": 3,
    "followUpRole": "remediation",
    "question": "NAT 기능을 사용하는 이유를 알고 계신가요의 핵심 근거를 다시 확인할 때 옳은 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "공인 IP 주소는 고유하며, 사설 IP 주소는 고유하지 않고 특정 사설 네트워크에서만 사용됩니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 1,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "network-http",
    "sourceId": "be-81",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "공인 IP 주소는 고유하며, 사설 IP 주소는 고유하지 않고 특정 사설 네트워크에서만 사용됩니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “공인 IP 주소는 고유하며, 사설 IP 주소는 고유하지 않고 특정 사설 네트워크에서만 사용됩니다.”입니다.",
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “공인 IP 주소는 고유하며, 사설 IP 주소는 고유하지 않고 특정 사설 네트워크에서만 사용됩니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “공인 IP 주소는 고유하며, 사설 IP 주소는 고유하지 않고 특정 사설 네트워크에서만 사용됩니다.”입니다."
    ],
    "keyPoints": [
      "본문",
      "NAT",
      "기능을",
      "사용하는"
    ]
  },
  {
    "version": 2,
    "categoryId": "network-http",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-85-main",
    "kind": "main",
    "followUpOf": null,
    "sourceId": "be-85",
    "question": "API 서버가 단 한 대라서 OOM·네트워크 장애 시 전체 서비스가 중단될 수 있습니다. 이 서버가 나타내는 개념은?",
    "choices": [
      "고가용성(HA)",
      "단일 장애 지점(SPOF)",
      "세션 클러스터링",
      "가중치 라운드 로빈"
    ],
    "correctIndex": 1,
    "explanation": "한 구성 요소의 고장이 전체 시스템 중단으로 이어지는 것이 SPOF입니다.",
    "evidenceQuote": "전체 시스템에서 제대로 동작하지 않는 경우, 전체 시스템이 중단되는 특정 구성 요소를 의미합니다.",
    "followUpOrder": null,
    "followUpRole": null,
    "sourceAnchor": "content-answer",
    "choiceFeedback": [
      "“고가용성(HA)”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “단일 장애 지점(SPOF)”입니다.",
      "한 구성 요소의 고장이 전체 시스템 중단으로 이어지는 것이 SPOF입니다.",
      "“세션 클러스터링”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “단일 장애 지점(SPOF)”입니다.",
      "“가중치 라운드 로빈”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “단일 장애 지점(SPOF)”입니다."
    ],
    "keyPoints": [
      "본문",
      "단일",
      "장애",
      "지점"
    ]
  },
  {
    "version": 2,
    "categoryId": "network-http",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "다음과 같은 상황에서 SPOF를 식별하고 개선해 주세요.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-85-follow-up",
    "kind": "follow-up",
    "followUpOf": "quiz-be-85-main",
    "sourceId": "be-85",
    "question": "서버 이중화가 제공하는 효과로 원문과 일치하는 것은?",
    "choices": [
      "모든 요청을 한 서버에 고정해 세션을 보존한다",
      "한 서버가 다운돼도 다른 서버가 서비스를 제공할 수 있다",
      "Replica DB가 없어도 모든 서버 장애를 막는다",
      "서버 수가 늘수록 배포와 장애 대응이 단순해진다"
    ],
    "correctIndex": 1,
    "explanation": "이중화는 같은 애플리케이션을 여러 서버에 배포해 단일 서버 장애를 견딥니다.",
    "evidenceQuote": "이중화는 동일한 애플리케이션을 여러 서버에 배포하여 한 서버가 다운되더라도 다른 서버가 서비스를 제공할 수 있도록 합니다.",
    "followUpOrder": 1,
    "followUpRole": "core",
    "sourceAnchor": "다음과-같은-상황에서-spof를-식별하고-개선해-주세요",
    "choiceFeedback": [
      "“모든 요청을 한 서버에 고정해 세션을 보존한다”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “한 서버가 다운돼도 다른 서버가 서비스를 제공할 수 있다”입니다.",
      "이중화는 같은 애플리케이션을 여러 서버에 배포해 단일 서버 장애를 견딥니다.",
      "“Replica DB가 없어도 모든 서버 장애를 막는다”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “한 서버가 다운돼도 다른 서버가 서비스를 제공할 수 있다”입니다.",
      "“서버 수가 늘수록 배포와 장애 대응이 단순해진다”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “한 서버가 다운돼도 다른 서버가 서비스를 제공할 수 있다”입니다."
    ],
    "keyPoints": [
      "다음과 같은 상황에서 SPOF를 식별하고 개선해 주세요.",
      "단일",
      "장애",
      "지점"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-85-follow-up-2",
    "kind": "follow-up",
    "followUpOf": "quiz-be-85-main",
    "followUpOrder": 2,
    "followUpRole": "core",
    "question": "단일 장애 지점(SPOF)이란 무엇인가요 원문의 “본문” 구역과 일치하는 설명은 무엇인가요?",
    "choices": [
      "서버와 네트워크, 프로그램 등 정보 시스템이 정상적으로 사용할 수 있는 정도를 **가용성(Availability)** 이라고 합니다.",
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 0,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "network-http",
    "sourceId": "be-85",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "서버와 네트워크, 프로그램 등 정보 시스템이 정상적으로 사용할 수 있는 정도를 **가용성(Availability)** 이라고 합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “서버와 네트워크, 프로그램 등 정보 시스템이 정상적으로 사용할 수 있는 정도를 **가용성(Availability)** 이라고 합니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “서버와 네트워크, 프로그램 등 정보 시스템이 정상적으로 사용할 수 있는 정도를 **가용성(Availability)** 이라고 합니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “서버와 네트워크, 프로그램 등 정보 시스템이 정상적으로 사용할 수 있는 정도를 **가용성(Availability)** 이라고 합니다.”입니다."
    ],
    "keyPoints": [
      "본문",
      "단일",
      "장애",
      "지점"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-85-follow-up-3",
    "kind": "follow-up",
    "followUpOf": "quiz-be-85-main",
    "followUpOrder": 3,
    "followUpRole": "remediation",
    "question": "단일 장애 지점(SPOF)이란 무엇인가요의 핵심 근거를 다시 확인할 때 옳은 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "가용성은 정상적인 사용 시간(Uptime)을 전체 사용 시간(Uptime+Downtime)으로 나누어 구할 수 있습니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 1,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "network-http",
    "sourceId": "be-85",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "가용성은 정상적인 사용 시간(Uptime)을 전체 사용 시간(Uptime+Downtime)으로 나누어 구할 수 있습니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “가용성은 정상적인 사용 시간(Uptime)을 전체 사용 시간(Uptime+Downtime)으로 나누어 구할 수 있습니다.”입니다.",
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “가용성은 정상적인 사용 시간(Uptime)을 전체 사용 시간(Uptime+Downtime)으로 나누어 구할 수 있습니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “가용성은 정상적인 사용 시간(Uptime)을 전체 사용 시간(Uptime+Downtime)으로 나누어 구할 수 있습니다.”입니다."
    ],
    "keyPoints": [
      "본문",
      "단일",
      "장애",
      "지점"
    ]
  },
  {
    "version": 2,
    "categoryId": "network-http",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "DHCP를 이용한 IP 주소 할당 과정은 어떻게 되나요?",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-86-main",
    "kind": "main",
    "followUpOf": null,
    "sourceId": "be-86",
    "question": "DHCP에서 호스트가 DHCP 서버를 찾기 위해 Discover 메시지를 브로드캐스팅하는 단계는?",
    "choices": [
      "Offer",
      "Request",
      "Discover",
      "Acknowledgment"
    ],
    "correctIndex": 2,
    "explanation": "Discover 단계에서 호스트는 DHCP 서버를 찾기 위해 브로드캐스트합니다.",
    "evidenceQuote": "Discover 단계에서 호스트는 Discover 메시지를 브로드캐스팅하여 DHCP 서버를 찾습니다.",
    "followUpOrder": null,
    "followUpRole": null,
    "sourceAnchor": "dhcp를-이용한-ip-주소-할당-과정은-어떻게-되나요",
    "choiceFeedback": [
      "“Offer”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “Discover”입니다.",
      "“Request”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “Discover”입니다.",
      "Discover 단계에서 호스트는 DHCP 서버를 찾기 위해 브로드캐스트합니다.",
      "“Acknowledgment”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “Discover”입니다."
    ],
    "keyPoints": [
      "DHCP를 이용한 IP 주소 할당 과정은 어떻게 되나요?",
      "정적",
      "IP",
      "주소"
    ]
  },
  {
    "version": 2,
    "categoryId": "network-http",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "DHCP를 이용한 IP 주소 할당 과정은 어떻게 되나요?",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-86-follow-up",
    "kind": "follow-up",
    "followUpOf": "quiz-be-86-main",
    "sourceId": "be-86",
    "question": "DHCP Offer 메시지에 포함되는 정보의 조합은?",
    "choices": [
      "클라이언트의 MAC 주소와 세션 ID",
      "루트 네임 서버 주소와 TLD 주소",
      "호스트에 할당할 IP 주소와 임대 기간",
      "공인 IP 주소와 NAT 포트"
    ],
    "correctIndex": 2,
    "explanation": "Offer는 할당 후보 IP와 그 임대 기간을 담습니다.",
    "evidenceQuote": "Offer 메시지에는 호스트에게 할당해 줄 IP 주소와 임대 기간이 포함되어 있습니다.",
    "followUpOrder": 1,
    "followUpRole": "core",
    "sourceAnchor": "dhcp를-이용한-ip-주소-할당-과정은-어떻게-되나요",
    "choiceFeedback": [
      "“클라이언트의 MAC 주소와 세션 ID”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “호스트에 할당할 IP 주소와 임대 기간”입니다.",
      "“루트 네임 서버 주소와 TLD 주소”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “호스트에 할당할 IP 주소와 임대 기간”입니다.",
      "Offer는 할당 후보 IP와 그 임대 기간을 담습니다.",
      "“공인 IP 주소와 NAT 포트”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “호스트에 할당할 IP 주소와 임대 기간”입니다."
    ],
    "keyPoints": [
      "DHCP를 이용한 IP 주소 할당 과정은 어떻게 되나요?",
      "정적",
      "IP",
      "주소"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-86-follow-up-2",
    "kind": "follow-up",
    "followUpOf": "quiz-be-86-main",
    "followUpOrder": 2,
    "followUpRole": "core",
    "question": "정적 IP 주소 할당 방식과 동적 IP 주소 할당 방식의 차이점을 원문의 “본문” 구역과 일치하는 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "네트워크에서 호스트에게 IP를 할당하는 방식은 크게 정적 할당 방식과 동적 할당 방식이 존재합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 1,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "network-http",
    "sourceId": "be-86",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "네트워크에서 호스트에게 IP를 할당하는 방식은 크게 정적 할당 방식과 동적 할당 방식이 존재합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “네트워크에서 호스트에게 IP를 할당하는 방식은 크게 정적 할당 방식과 동적 할당 방식이 존재합니다.”입니다.",
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “네트워크에서 호스트에게 IP를 할당하는 방식은 크게 정적 할당 방식과 동적 할당 방식이 존재합니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “네트워크에서 호스트에게 IP를 할당하는 방식은 크게 정적 할당 방식과 동적 할당 방식이 존재합니다.”입니다."
    ],
    "keyPoints": [
      "본문",
      "정적",
      "IP",
      "주소"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-86-follow-up-3",
    "kind": "follow-up",
    "followUpOf": "quiz-be-86-main",
    "followUpOrder": 3,
    "followUpRole": "remediation",
    "question": "정적 IP 주소 할당 방식과 동적 IP 주소 할당 방식의 차이점을의 핵심 근거를 다시 확인할 때 옳은 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "정적 할당 방식은 호스트에게 IP를 할당할 때 수동으로 설정하는 것을 의미합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 2,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "network-http",
    "sourceId": "be-86",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "정적 할당 방식은 호스트에게 IP를 할당할 때 수동으로 설정하는 것을 의미합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “정적 할당 방식은 호스트에게 IP를 할당할 때 수동으로 설정하는 것을 의미합니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “정적 할당 방식은 호스트에게 IP를 할당할 때 수동으로 설정하는 것을 의미합니다.”입니다.",
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “정적 할당 방식은 호스트에게 IP를 할당할 때 수동으로 설정하는 것을 의미합니다.”입니다."
    ],
    "keyPoints": [
      "본문",
      "정적",
      "IP",
      "주소"
    ]
  },
  {
    "version": 2,
    "categoryId": "network-http",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "DNS 질의 과정을 설명해 주세요.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-100-main",
    "kind": "main",
    "followUpOf": null,
    "sourceId": "be-100",
    "question": "로컬 네임 서버가 api.maeil-mail.kr의 값을 찾지 못했을 때 가장 먼저 질의하는 서버는?",
    "choices": [
      "권한 네임 서버",
      "루트 네임 서버",
      "클라이언트 브라우저",
      "CDN 서버"
    ],
    "correctIndex": 1,
    "explanation": "로컬 네임 서버는 캐시에 없으면 루트 네임 서버에 IP 주소를 물어봅니다.",
    "evidenceQuote": "만약, 로컬 네임 서버에서 값을 찾지 못했다면 로컬 네임 서버는 루트 네임 서버에게 IP 주소를 물어봅니다.",
    "followUpOrder": null,
    "followUpRole": null,
    "sourceAnchor": "dns-질의-과정을-설명해-주세요",
    "choiceFeedback": [
      "“권한 네임 서버”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “루트 네임 서버”입니다.",
      "로컬 네임 서버는 캐시에 없으면 루트 네임 서버에 IP 주소를 물어봅니다.",
      "“클라이언트 브라우저”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “루트 네임 서버”입니다.",
      "“CDN 서버”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “루트 네임 서버”입니다."
    ],
    "keyPoints": [
      "DNS 질의 과정을 설명해 주세요.",
      "DNS란",
      "무엇인가요?",
      "네트워크, HTTP와 웹 인프라"
    ]
  },
  {
    "version": 2,
    "categoryId": "network-http",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "DNS 질의 과정을 설명해 주세요.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-100-follow-up",
    "kind": "follow-up",
    "followUpOf": "quiz-be-100-main",
    "sourceId": "be-100",
    "question": "DNS 질의에서 .kr TLD 서버 다음으로 로컬 네임 서버가 주소를 받는 서버는?",
    "choices": [
      "루트 네임 서버",
      "maeil-mail.kr 권한 네임 서버",
      "클라이언트의 로컬 네임 서버",
      "공인 IP를 바꾸는 NAT 서버"
    ],
    "correctIndex": 1,
    "explanation": "TLD 서버는 해당 도메인의 권한 네임 서버 주소를 응답합니다.",
    "evidenceQuote": "이를 받은 로컬 네임 서버는 .kr TLD 네임 서버에 다시 요청을 보내고, maeil-mail.kr 권한 네임 서버의 주소를 응답 받습니다.",
    "followUpOrder": 1,
    "followUpRole": "core",
    "sourceAnchor": "dns-질의-과정을-설명해-주세요",
    "choiceFeedback": [
      "“루트 네임 서버”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “maeil-mail.kr 권한 네임 서버”입니다.",
      "TLD 서버는 해당 도메인의 권한 네임 서버 주소를 응답합니다.",
      "“클라이언트의 로컬 네임 서버”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “maeil-mail.kr 권한 네임 서버”입니다.",
      "“공인 IP를 바꾸는 NAT 서버”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “maeil-mail.kr 권한 네임 서버”입니다."
    ],
    "keyPoints": [
      "DNS 질의 과정을 설명해 주세요.",
      "DNS란",
      "무엇인가요?",
      "네트워크, HTTP와 웹 인프라"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-100-follow-up-2",
    "kind": "follow-up",
    "followUpOf": "quiz-be-100-main",
    "followUpOrder": 2,
    "followUpRole": "core",
    "question": "DNS란 무엇인가요 원문의 “본문” 구역과 일치하는 설명은 무엇인가요?",
    "choices": [
      "IP 주소는 변환될 수 있으며, 기억하기 어렵기 때문에 대부분의 웹 서비스는 도메인 주소를 사용합니다.",
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 0,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "network-http",
    "sourceId": "be-100",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "IP 주소는 변환될 수 있으며, 기억하기 어렵기 때문에 대부분의 웹 서비스는 도메인 주소를 사용합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “IP 주소는 변환될 수 있으며, 기억하기 어렵기 때문에 대부분의 웹 서비스는 도메인 주소를 사용합니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “IP 주소는 변환될 수 있으며, 기억하기 어렵기 때문에 대부분의 웹 서비스는 도메인 주소를 사용합니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “IP 주소는 변환될 수 있으며, 기억하기 어렵기 때문에 대부분의 웹 서비스는 도메인 주소를 사용합니다.”입니다."
    ],
    "keyPoints": [
      "본문",
      "DNS란",
      "무엇인가요?",
      "네트워크, HTTP와 웹 인프라"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-100-follow-up-3",
    "kind": "follow-up",
    "followUpOf": "quiz-be-100-main",
    "followUpOrder": 3,
    "followUpRole": "remediation",
    "question": "DNS란 무엇인가요의 핵심 근거를 다시 확인할 때 옳은 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "**DNS(Domain Name System)** 는 도메인 주소에 대응되는 원격 호스트 IP 주소를 관리하고 질의할 수 있는 시스템 혹은 이를 이용하기 위한 프로토콜을 의미합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 1,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "network-http",
    "sourceId": "be-100",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "**DNS(Domain Name System)** 는 도메인 주소에 대응되는 원격 호스트 IP 주소를 관리하고 질의할 수 있는 시스템 혹은 이를 이용하기 위한 프로토콜을 의미합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “**DNS(Domain Name System)** 는 도메인 주소에 대응되는 원격 호스트 IP 주소를 관리하고 질의할 수 있는 시스템 혹은 이를 이용하기 위한 프로토콜을 의미합니다.”입니다.",
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “**DNS(Domain Name System)** 는 도메인 주소에 대응되는 원격 호스트 IP 주소를 관리하고 질의할 수 있는 시스템 혹은 이를 이용하기 위한 프로토콜을 의미합니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “**DNS(Domain Name System)** 는 도메인 주소에 대응되는 원격 호스트 IP 주소를 관리하고 질의할 수 있는 시스템 혹은 이를 이용하기 위한 프로토콜을 의미합니다.”입니다."
    ],
    "keyPoints": [
      "본문",
      "DNS란",
      "무엇인가요?",
      "네트워크, HTTP와 웹 인프라"
    ]
  },
  {
    "version": 2,
    "categoryId": "network-http",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-103-main",
    "kind": "main",
    "followUpOf": null,
    "sourceId": "be-103",
    "question": "사용자와 물리적으로 가까운 분산 서버에서 콘텐츠를 제공해 서버 과부하와 통신 지연을 줄이는 것은?",
    "choices": [
      "CDN",
      "NAT",
      "DHCP",
      "SPOF"
    ],
    "correctIndex": 0,
    "explanation": "CDN은 가까운 분산 서버를 이용해 콘텐츠를 제공하며 부하와 지연을 줄입니다.",
    "evidenceQuote": "사용자와 물리적으로 가까운 위치에서 정적 콘텐츠(혹은 동적 콘텐츠)를 제공하여 서버 과부하를 방지하고 통신 지연을 단축합니다.",
    "followUpOrder": null,
    "followUpRole": null,
    "sourceAnchor": "content-answer",
    "choiceFeedback": [
      "CDN은 가까운 분산 서버를 이용해 콘텐츠를 제공하며 부하와 지연을 줄입니다.",
      "“NAT”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “CDN”입니다.",
      "“DHCP”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “CDN”입니다.",
      "“SPOF”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “CDN”입니다."
    ],
    "keyPoints": [
      "본문",
      "CDN이란",
      "무엇인가요?",
      "네트워크, HTTP와 웹 인프라"
    ]
  },
  {
    "version": 2,
    "categoryId": "network-http",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "CDN에서 Push 방식과 Pull 방식의 차이점은 무엇인가요?",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-103-follow-up",
    "kind": "follow-up",
    "followUpOf": "quiz-be-103-main",
    "sourceId": "be-103",
    "question": "Pull 방식 CDN의 초기 요청이 느려질 수 있는 이유는?",
    "choices": [
      "CDN에 콘텐츠가 없으면 원본 서버에서 가져오는 작업이 필요해서",
      "원본 서버가 콘텐츠를 미리 모든 CDN에 전달해서",
      "클라이언트가 항상 CDN을 거치지 않아서",
      "콘텐츠 만료 시간이 길수록 원본 요청이 늘어서"
    ],
    "correctIndex": 0,
    "explanation": "Pull 방식은 캐시 미스 시 원본에서 가져와야 하므로 초기 응답이 느려질 수 있습니다.",
    "evidenceQuote": "초기 요청에서는 원본 서버에서 콘텐츠를 가져오는 작업을 수행해야 하므로 응답 속도가 저하될 수 있습니다.",
    "followUpOrder": 1,
    "followUpRole": "core",
    "sourceAnchor": "cdn에서-push-방식과-pull-방식의-차이점은-무엇인가요",
    "choiceFeedback": [
      "Pull 방식은 캐시 미스 시 원본에서 가져와야 하므로 초기 응답이 느려질 수 있습니다.",
      "“원본 서버가 콘텐츠를 미리 모든 CDN에 전달해서”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “CDN에 콘텐츠가 없으면 원본 서버에서 가져오는 작업이 필요해서”입니다.",
      "“클라이언트가 항상 CDN을 거치지 않아서”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “CDN에 콘텐츠가 없으면 원본 서버에서 가져오는 작업이 필요해서”입니다.",
      "“콘텐츠 만료 시간이 길수록 원본 요청이 늘어서”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “CDN에 콘텐츠가 없으면 원본 서버에서 가져오는 작업이 필요해서”입니다."
    ],
    "keyPoints": [
      "CDN이란",
      "무엇인가요?",
      "네트워크, HTTP와 웹 인프라"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-103-follow-up-2",
    "kind": "follow-up",
    "followUpOf": "quiz-be-103-main",
    "followUpOrder": 2,
    "followUpRole": "core",
    "question": "CDN이란 무엇인가요 원문의 “본문” 구역과 일치하는 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.",
      "CDN은 통신에 참여하는 호스트 간에 중간 서버를 두어 성능을 향상합니다."
    ],
    "correctIndex": 3,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "network-http",
    "sourceId": "be-103",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "CDN은 통신에 참여하는 호스트 간에 중간 서버를 두어 성능을 향상합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “CDN은 통신에 참여하는 호스트 간에 중간 서버를 두어 성능을 향상합니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “CDN은 통신에 참여하는 호스트 간에 중간 서버를 두어 성능을 향상합니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “CDN은 통신에 참여하는 호스트 간에 중간 서버를 두어 성능을 향상합니다.”입니다.",
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다."
    ],
    "keyPoints": [
      "본문",
      "CDN이란",
      "무엇인가요?",
      "네트워크, HTTP와 웹 인프라"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-103-follow-up-3",
    "kind": "follow-up",
    "followUpOf": "quiz-be-103-main",
    "followUpOrder": 3,
    "followUpRole": "remediation",
    "question": "CDN이란 무엇인가요의 핵심 근거를 다시 확인할 때 옳은 설명은 무엇인가요?",
    "choices": [
      "대표적인 CDN 서비스로는 CloudFront, CloudFlare 등이 있습니다.",
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 0,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "network-http",
    "sourceId": "be-103",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "대표적인 CDN 서비스로는 CloudFront, CloudFlare 등이 있습니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “대표적인 CDN 서비스로는 CloudFront, CloudFlare 등이 있습니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “대표적인 CDN 서비스로는 CloudFront, CloudFlare 등이 있습니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “대표적인 CDN 서비스로는 CloudFront, CloudFlare 등이 있습니다.”입니다."
    ],
    "keyPoints": [
      "본문",
      "CDN이란",
      "무엇인가요?",
      "네트워크, HTTP와 웹 인프라"
    ]
  },
  {
    "version": 2,
    "categoryId": "network-http",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-107-main",
    "kind": "main",
    "followUpOf": null,
    "sourceId": "be-107",
    "question": "목적지를 정해 메시지를 패킷으로 분할해 보내고 목적지에서 조립·확인하는 교환 방식은?",
    "choices": [
      "패킷 교환 방식",
      "회선 교환 방식",
      "포워드 프록시 방식",
      "스케일 업 방식"
    ],
    "correctIndex": 0,
    "explanation": "패킷 교환은 메시지를 패킷으로 분할하고 목적지에서 조립해 확인합니다.",
    "evidenceQuote": "**패킷 교환 방식(Packet Switching)** 은 목적지를 정해두고 메시지를 패킷으로 분할해서 보내고, 목적지에서 패킷을 조립해서 확인하는 방식입니다.",
    "followUpOrder": null,
    "followUpRole": null,
    "sourceAnchor": "content-answer",
    "choiceFeedback": [
      "패킷 교환은 메시지를 패킷으로 분할하고 목적지에서 조립해 확인합니다.",
      "“회선 교환 방식”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “패킷 교환 방식”입니다.",
      "“포워드 프록시 방식”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “패킷 교환 방식”입니다.",
      "“스케일 업 방식”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “패킷 교환 방식”입니다."
    ],
    "keyPoints": [
      "본문",
      "네트워크에서",
      "회선",
      "교환"
    ]
  },
  {
    "version": 2,
    "categoryId": "network-http",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-107-follow-up",
    "kind": "follow-up",
    "followUpOf": "quiz-be-107-main",
    "sourceId": "be-107",
    "question": "회선 교환 방식이 패킷 교환과 달리 보이는 특성은?",
    "choices": [
      "특정 사용자를 위한 회선 경로를 미리 설정한다",
      "데이터를 패킷으로 분할한 뒤 목적지에서 조립한다",
      "전송 중 경로가 수시로 바뀐다",
      "데이터 전송 동안에만 네트워크 자원을 사용한다"
    ],
    "correctIndex": 0,
    "explanation": "회선 교환은 통신 전에 사용자용 경로를 미리 설정합니다.",
    "evidenceQuote": "특정 사용자를 위한 회선의 경로를 미리 설정하고 이 경로를 이용해서 호스트끼리 메시지를 주고받는 방식을 의미합니다.",
    "followUpOrder": 1,
    "followUpRole": "core",
    "sourceAnchor": "content-answer",
    "choiceFeedback": [
      "회선 교환은 통신 전에 사용자용 경로를 미리 설정합니다.",
      "“데이터를 패킷으로 분할한 뒤 목적지에서 조립한다”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “특정 사용자를 위한 회선 경로를 미리 설정한다”입니다.",
      "“전송 중 경로가 수시로 바뀐다”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “특정 사용자를 위한 회선 경로를 미리 설정한다”입니다.",
      "“데이터 전송 동안에만 네트워크 자원을 사용한다”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “특정 사용자를 위한 회선 경로를 미리 설정한다”입니다."
    ],
    "keyPoints": [
      "본문",
      "네트워크에서",
      "회선",
      "교환"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-107-follow-up-2",
    "kind": "follow-up",
    "followUpOf": "quiz-be-107-main",
    "followUpOrder": 2,
    "followUpRole": "core",
    "question": "네트워크에서 회선 교환 방식과 패킷 교환 방식은 어떤 차이점 있나요 원문의 “본문” 구역과 일치하는 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.",
      "회선 교환 방식은 미리 회선을 설정한다는 점에서 주어진 시간 동안에 전송되는 데이터의 양이 비교적 일정하고 안정적입니다."
    ],
    "correctIndex": 3,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "network-http",
    "sourceId": "be-107",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "회선 교환 방식은 미리 회선을 설정한다는 점에서 주어진 시간 동안에 전송되는 데이터의 양이 비교적 일정하고 안정적입니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “회선 교환 방식은 미리 회선을 설정한다는 점에서 주어진 시간 동안에 전송되는 데이터의 양이 비교적 일정하고 안정적입니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “회선 교환 방식은 미리 회선을 설정한다는 점에서 주어진 시간 동안에 전송되는 데이터의 양이 비교적 일정하고 안정적입니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “회선 교환 방식은 미리 회선을 설정한다는 점에서 주어진 시간 동안에 전송되는 데이터의 양이 비교적 일정하고 안정적입니다.”입니다.",
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다."
    ],
    "keyPoints": [
      "본문",
      "네트워크에서",
      "회선",
      "교환"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-107-follow-up-3",
    "kind": "follow-up",
    "followUpOf": "quiz-be-107-main",
    "followUpOrder": 3,
    "followUpRole": "remediation",
    "question": "네트워크에서 회선 교환 방식과 패킷 교환 방식은 어떤 차이점 있나요의 핵심 근거를 다시 확인할 때 옳은 설명은 무엇인가요?",
    "choices": [
      "다만, 회선 이용 효율이 떨어진다는 단점이 존재합니다.",
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 0,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "network-http",
    "sourceId": "be-107",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "다만, 회선 이용 효율이 떨어진다는 단점이 존재합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “다만, 회선 이용 효율이 떨어진다는 단점이 존재합니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “다만, 회선 이용 효율이 떨어진다는 단점이 존재합니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “다만, 회선 이용 효율이 떨어진다는 단점이 존재합니다.”입니다."
    ],
    "keyPoints": [
      "본문",
      "네트워크에서",
      "회선",
      "교환"
    ]
  },
  {
    "version": 2,
    "categoryId": "network-http",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-114-main",
    "kind": "main",
    "followUpOf": null,
    "sourceId": "be-114",
    "question": "HTTP/1.1의 Keep-Alive가 제공하는 동작으로 맞는 것은?",
    "choices": [
      "유휴 상태에서 주기적으로 패킷을 보내 연결 생존을 확인한다",
      "요청마다 반드시 새 TCP 커넥션을 생성한다",
      "하나의 TCP 커넥션으로 여러 HTTP 요청과 응답을 주고받는다",
      "모든 HTTP 본문을 서버 메모리에 세션으로 저장한다"
    ],
    "correctIndex": 2,
    "explanation": "HTTP Keep-Alive는 하나의 TCP 연결을 여러 HTTP 요청·응답에 재사용합니다.",
    "evidenceQuote": "**HTTP 프로토콜**에서 Keep-Alive는 하나의 TCP 커넥션으로 여러 개의 HTTP 요청과 응답을 주고받을 수 있도록 하는 기능입니다.",
    "followUpOrder": null,
    "followUpRole": null,
    "sourceAnchor": "content-answer",
    "choiceFeedback": [
      "“유휴 상태에서 주기적으로 패킷을 보내 연결 생존을 확인한다”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “하나의 TCP 커넥션으로 여러 HTTP 요청과 응답을 주고받는다”입니다.",
      "“요청마다 반드시 새 TCP 커넥션을 생성한다”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “하나의 TCP 커넥션으로 여러 HTTP 요청과 응답을 주고받는다”입니다.",
      "HTTP Keep-Alive는 하나의 TCP 연결을 여러 HTTP 요청·응답에 재사용합니다.",
      "“모든 HTTP 본문을 서버 메모리에 세션으로 저장한다”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “하나의 TCP 커넥션으로 여러 HTTP 요청과 응답을 주고받는다”입니다."
    ],
    "keyPoints": [
      "본문",
      "Keep",
      "Alive에",
      "대해"
    ]
  },
  {
    "version": 2,
    "categoryId": "network-http",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "Keep Alive의 장점과 단점은 무엇이 있을까요?",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-114-follow-up",
    "kind": "follow-up",
    "followUpOf": "quiz-be-114-main",
    "sourceId": "be-114",
    "question": "Keep Alive의 단점으로 원문과 일치하는 것은?",
    "choices": [
      "요청마다 handshake RTT가 늘어나 지연이 줄어든다",
      "커넥션 재사용으로 CPU와 메모리 소비가 늘어난다",
      "유휴 상태에도 연결을 점유해 서버 소켓이 부족해질 수 있다",
      "연결이 유휴 상태면 즉시 강제로 종료된다"
    ],
    "correctIndex": 2,
    "explanation": "Keep Alive는 유휴 연결도 점유하므로 소켓 부족 위험이 있습니다.",
    "evidenceQuote": "유휴 상태일 때에도 커넥션을 점유하고 있기 때문에 서버의 소켓이 부족해질 수 있습니다.",
    "followUpOrder": 1,
    "followUpRole": "core",
    "sourceAnchor": "keep-alive의-장점과-단점은-무엇이-있을까요",
    "choiceFeedback": [
      "“요청마다 handshake RTT가 늘어나 지연이 줄어든다”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “유휴 상태에도 연결을 점유해 서버 소켓이 부족해질 수 있다”입니다.",
      "“커넥션 재사용으로 CPU와 메모리 소비가 늘어난다”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “유휴 상태에도 연결을 점유해 서버 소켓이 부족해질 수 있다”입니다.",
      "Keep Alive는 유휴 연결도 점유하므로 소켓 부족 위험이 있습니다.",
      "“연결이 유휴 상태면 즉시 강제로 종료된다”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “유휴 상태에도 연결을 점유해 서버 소켓이 부족해질 수 있다”입니다."
    ],
    "keyPoints": [
      "Keep Alive의 장점과 단점은 무엇이 있을까요?",
      "Keep",
      "Alive에",
      "대해"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-114-follow-up-2",
    "kind": "follow-up",
    "followUpOf": "quiz-be-114-main",
    "followUpOrder": 2,
    "followUpRole": "core",
    "question": "Keep Alive 원문의 “본문” 구역과 일치하는 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "**Keep Alive**는 네트워크 또는 시스템에서 커넥션을 지속해서 유지하기 위해 사용되는 기술이나 설정을 의미합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 1,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "network-http",
    "sourceId": "be-114",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "**Keep Alive**는 네트워크 또는 시스템에서 커넥션을 지속해서 유지하기 위해 사용되는 기술이나 설정을 의미합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “**Keep Alive**는 네트워크 또는 시스템에서 커넥션을 지속해서 유지하기 위해 사용되는 기술이나 설정을 의미합니다.”입니다.",
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “**Keep Alive**는 네트워크 또는 시스템에서 커넥션을 지속해서 유지하기 위해 사용되는 기술이나 설정을 의미합니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “**Keep Alive**는 네트워크 또는 시스템에서 커넥션을 지속해서 유지하기 위해 사용되는 기술이나 설정을 의미합니다.”입니다."
    ],
    "keyPoints": [
      "본문",
      "Keep",
      "Alive에",
      "대해"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-114-follow-up-3",
    "kind": "follow-up",
    "followUpOf": "quiz-be-114-main",
    "followUpOrder": 3,
    "followUpRole": "remediation",
    "question": "Keep Alive의 핵심 근거를 다시 확인할 때 옳은 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "0에서는 요청마다 새로운 커넥션을 열고 닫았지만, HTTP/1.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 2,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "network-http",
    "sourceId": "be-114",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "0에서는 요청마다 새로운 커넥션을 열고 닫았지만, HTTP/1.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “0에서는 요청마다 새로운 커넥션을 열고 닫았지만, HTTP/1.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “0에서는 요청마다 새로운 커넥션을 열고 닫았지만, HTTP/1.”입니다.",
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “0에서는 요청마다 새로운 커넥션을 열고 닫았지만, HTTP/1.”입니다."
    ],
    "keyPoints": [
      "본문",
      "Keep",
      "Alive에",
      "대해"
    ]
  },
  {
    "version": 2,
    "categoryId": "network-http",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "데이터 저장 위치",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-148-main",
    "kind": "main",
    "followUpOf": null,
    "sourceId": "be-148",
    "question": "쿠키와 세션의 저장 위치 비교로 알맞은 것은?",
    "choices": [
      "쿠키는 서버, 세션은 브라우저에 저장된다",
      "쿠키는 브라우저, 세션은 서버에 저장된다",
      "둘 다 DNS 서버에 저장된다",
      "둘 다 공인 IP 주소에 저장된다"
    ],
    "correctIndex": 1,
    "explanation": "쿠키는 클라이언트 브라우저, 세션은 서버 측 저장소에 저장됩니다.",
    "evidenceQuote": "**쿠키는 클라이언트 측 브라우저**에 저장되는 반면, **세션은 서버 측에 저장**됩니다.",
    "followUpOrder": null,
    "followUpRole": null,
    "sourceAnchor": "데이터-저장-위치",
    "choiceFeedback": [
      "“쿠키는 서버, 세션은 브라우저에 저장된다”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “쿠키는 브라우저, 세션은 서버에 저장된다”입니다.",
      "쿠키는 클라이언트 브라우저, 세션은 서버 측 저장소에 저장됩니다.",
      "“둘 다 DNS 서버에 저장된다”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “쿠키는 브라우저, 세션은 서버에 저장된다”입니다.",
      "“둘 다 공인 IP 주소에 저장된다”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “쿠키는 브라우저, 세션은 서버에 저장된다”입니다."
    ],
    "keyPoints": [
      "데이터 저장 위치",
      "쿠키와",
      "세션의",
      "차이에"
    ]
  },
  {
    "version": 2,
    "categoryId": "network-http",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "성능 영향",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-148-follow-up",
    "kind": "follow-up",
    "followUpOf": "quiz-be-148-main",
    "sourceId": "be-148",
    "question": "중요한 로그인 정보처럼 민감한 데이터에 원문이 더 적합하다고 제안하는 것은?",
    "choices": [
      "쿠키",
      "세션",
      "URL 쿼리 문자열",
      "DNS 캐시"
    ],
    "correctIndex": 1,
    "explanation": "민감 정보는 서버에 저장되는 세션에 두는 것이 적합하다고 설명합니다.",
    "evidenceQuote": "일반적으로 사용자 선호 설정이나 로그인 하지 않은 유저의 장바구니와 같은 비민감 정보는 쿠키에, 로그인 정보와 같은 중요 데이터는 세션에 저장하는 것이 적합합니다.",
    "followUpOrder": 1,
    "followUpRole": "core",
    "sourceAnchor": "성능-영향",
    "choiceFeedback": [
      "“쿠키”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “세션”입니다.",
      "민감 정보는 서버에 저장되는 세션에 두는 것이 적합하다고 설명합니다.",
      "“URL 쿼리 문자열”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “세션”입니다.",
      "“DNS 캐시”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “세션”입니다."
    ],
    "keyPoints": [
      "성능 영향",
      "쿠키와",
      "세션의",
      "차이에"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-148-follow-up-2",
    "kind": "follow-up",
    "followUpOf": "quiz-be-148-main",
    "followUpOrder": 2,
    "followUpRole": "core",
    "question": "쿠키와 세션의 차이 원문의 “본문” 구역과 일치하는 설명은 무엇인가요?",
    "choices": [
      "쿠키와 세션은 HTTP의 **무상태(stateless)** 특성을 보완하여 사용자 상태를 유지하는 메커니즘이지만, 여러 측면에서 중요한 차이가 있습니다.",
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 0,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "network-http",
    "sourceId": "be-148",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "쿠키와 세션은 HTTP의 **무상태(stateless)** 특성을 보완하여 사용자 상태를 유지하는 메커니즘이지만, 여러 측면에서 중요한 차이가 있습니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “쿠키와 세션은 HTTP의 **무상태(stateless)** 특성을 보완하여 사용자 상태를 유지하는 메커니즘이지만, 여러 측면에서 중요한 차이가 있습니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “쿠키와 세션은 HTTP의 **무상태(stateless)** 특성을 보완하여 사용자 상태를 유지하는 메커니즘이지만, 여러 측면에서 중요한 차이가 있습니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “쿠키와 세션은 HTTP의 **무상태(stateless)** 특성을 보완하여 사용자 상태를 유지하는 메커니즘이지만, 여러 측면에서 중요한 차이가 있습니다.”입니다."
    ],
    "keyPoints": [
      "본문",
      "쿠키와",
      "세션의",
      "차이에"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-148-follow-up-3",
    "kind": "follow-up",
    "followUpOf": "quiz-be-148-main",
    "followUpOrder": 3,
    "followUpRole": "remediation",
    "question": "쿠키와 세션의 차이의 핵심 근거를 다시 확인할 때 옳은 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "세션은 서버에 데이터를 저장하고 세션 ID만 쿠키를 통해 클라이언트에 전달합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 1,
    "explanation": "원문의 “데이터 저장 위치” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "network-http",
    "sourceId": "be-148",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "데이터 저장 위치",
    "sourceAnchor": "데이터-저장-위치",
    "evidenceQuote": "세션은 서버에 데이터를 저장하고 세션 ID만 쿠키를 통해 클라이언트에 전달합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “세션은 서버에 데이터를 저장하고 세션 ID만 쿠키를 통해 클라이언트에 전달합니다.”입니다.",
      "원문의 “데이터 저장 위치” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “세션은 서버에 데이터를 저장하고 세션 ID만 쿠키를 통해 클라이언트에 전달합니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “세션은 서버에 데이터를 저장하고 세션 ID만 쿠키를 통해 클라이언트에 전달합니다.”입니다."
    ],
    "keyPoints": [
      "데이터 저장 위치",
      "쿠키와",
      "세션의",
      "차이에"
    ]
  },
  {
    "version": 2,
    "categoryId": "distributed-cache",
    "sourceId": "be-2",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "RAID(Reduntant Array of Independent Disks)",
    "evidenceQuote": "RAID는 수 많은 데이터들을 안전하게 저장하거나 성능을 높이기 위해 여러 하드 디스크나 SSD를 마치 하나의 장치처럼 사용하는 기술입니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-2-main",
    "kind": "main",
    "followUpOf": null,
    "question": "RAID가 여러 저장 장치를 사용하는 주된 목적은 무엇인가요?",
    "choices": [
      "한 파일을 반드시 한 디스크에만 저장하기 위해서",
      "운영체제를 교체하기 위해서",
      "데이터를 안전하게 저장하거나 성능을 높이기 위해서",
      "네트워크 대역폭을 늘리기 위해서"
    ],
    "correctIndex": 2,
    "explanation": "원문은 데이터를 안전하게 저장하거나 성능을 높이기 위해서라고 설명합니다.",
    "followUpOrder": null,
    "followUpRole": null,
    "sourceAnchor": "raidreduntant-array-of-independent-disks",
    "choiceFeedback": [
      "“한 파일을 반드시 한 디스크에만 저장하기 위해서”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “데이터를 안전하게 저장하거나 성능을 높이기 위해서”입니다.",
      "“운영체제를 교체하기 위해서”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “데이터를 안전하게 저장하거나 성능을 높이기 위해서”입니다.",
      "원문은 데이터를 안전하게 저장하거나 성능을 높이기 위해서라고 설명합니다.",
      "“네트워크 대역폭을 늘리기 위해서”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “데이터를 안전하게 저장하거나 성능을 높이기 위해서”입니다."
    ],
    "keyPoints": [
      "RAID",
      "기술에",
      "대해서",
      "분산 시스템, 캐시와 운영 인프라"
    ]
  },
  {
    "version": 2,
    "categoryId": "distributed-cache",
    "sourceId": "be-2",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "RAID 구성 방식에 대해서 설명해주세요.",
    "evidenceQuote": "`RAID-0` 은 여러 보조기억장치에 데이터를 나누어 저장하는 구성 방식입니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-2-follow-up",
    "kind": "follow-up",
    "followUpOf": "quiz-be-2-main",
    "question": "be-2 원문에서 기본 개념 다음에 제시한 조건·영향 중 알맞은 것은 무엇인가요?",
    "choices": [
      "원문은 이 조건이 모든 상황에서 반대로 적용된다고 설명한다.",
      "원문은 이 결과가 아무 조건 없이 항상 발생한다고 설명한다.",
      "`RAID-0` 은 여러 보조기억장치에 데이터를 나누어 저장하는 구성 방식입니다.",
      "원문은 이 판단에 원문 밖의 정보가 반드시 필요하다고 설명한다."
    ],
    "correctIndex": 2,
    "explanation": "원문의 근거는 `RAID-0` 은 여러 보조기억장치에 데이터를 나누어 저장하는 구성 방식입니다.라는 판단을 뒷받침합니다.",
    "followUpOrder": 1,
    "followUpRole": "core",
    "sourceAnchor": "raid-구성-방식에-대해서-설명해주세요",
    "choiceFeedback": [
      "“원문은 이 조건이 모든 상황에서 반대로 적용된다고 설명한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “`RAID-0` 은 여러 보조기억장치에 데이터를 나누어 저장하는 구성 방식입니다.”입니다.",
      "“원문은 이 결과가 아무 조건 없이 항상 발생한다고 설명한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “`RAID-0` 은 여러 보조기억장치에 데이터를 나누어 저장하는 구성 방식입니다.”입니다.",
      "원문의 근거는 `RAID-0` 은 여러 보조기억장치에 데이터를 나누어 저장하는 구성 방식입니다.라는 판단을 뒷받침합니다.",
      "“원문은 이 판단에 원문 밖의 정보가 반드시 필요하다고 설명한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “`RAID-0` 은 여러 보조기억장치에 데이터를 나누어 저장하는 구성 방식입니다.”입니다."
    ],
    "keyPoints": [
      "RAID 구성 방식에 대해서 설명해주세요.",
      "RAID",
      "기술에",
      "대해서"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-2-follow-up-2",
    "kind": "follow-up",
    "followUpOf": "quiz-be-2-main",
    "followUpOrder": 2,
    "followUpRole": "core",
    "question": "RAID 기술 원문의 “RAID 구성 방식에 대해서 설명해주세요.” 구역과 일치하는 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "데이터를 저장할 때 하드 디스크는 각 장치에 번갈아 데이터를 저장합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 1,
    "explanation": "원문의 “RAID 구성 방식에 대해서 설명해주세요.” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "distributed-cache",
    "sourceId": "be-2",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "RAID 구성 방식에 대해서 설명해주세요.",
    "sourceAnchor": "raid-구성-방식에-대해서-설명해주세요",
    "evidenceQuote": "데이터를 저장할 때 하드 디스크는 각 장치에 번갈아 데이터를 저장합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “데이터를 저장할 때 하드 디스크는 각 장치에 번갈아 데이터를 저장합니다.”입니다.",
      "원문의 “RAID 구성 방식에 대해서 설명해주세요.” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “데이터를 저장할 때 하드 디스크는 각 장치에 번갈아 데이터를 저장합니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “데이터를 저장할 때 하드 디스크는 각 장치에 번갈아 데이터를 저장합니다.”입니다."
    ],
    "keyPoints": [
      "RAID 구성 방식에 대해서 설명해주세요.",
      "RAID",
      "기술에",
      "대해서"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-2-follow-up-3",
    "kind": "follow-up",
    "followUpOf": "quiz-be-2-main",
    "followUpOrder": 3,
    "followUpRole": "remediation",
    "question": "RAID 기술의 핵심 근거를 다시 확인할 때 옳은 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "이때 줄무늬처럼 분산되어 저장된 데이터를 스트라이프라고 하며 분산하여 저장하는 방식을 스트라이핑이라고도 합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 2,
    "explanation": "원문의 “RAID 구성 방식에 대해서 설명해주세요.” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "distributed-cache",
    "sourceId": "be-2",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "RAID 구성 방식에 대해서 설명해주세요.",
    "sourceAnchor": "raid-구성-방식에-대해서-설명해주세요",
    "evidenceQuote": "이때 줄무늬처럼 분산되어 저장된 데이터를 스트라이프라고 하며 분산하여 저장하는 방식을 스트라이핑이라고도 합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “이때 줄무늬처럼 분산되어 저장된 데이터를 스트라이프라고 하며 분산하여 저장하는 방식을 스트라이핑이라고도 합니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “이때 줄무늬처럼 분산되어 저장된 데이터를 스트라이프라고 하며 분산하여 저장하는 방식을 스트라이핑이라고도 합니다.”입니다.",
      "원문의 “RAID 구성 방식에 대해서 설명해주세요.” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “이때 줄무늬처럼 분산되어 저장된 데이터를 스트라이프라고 하며 분산하여 저장하는 방식을 스트라이핑이라고도 합니다.”입니다."
    ],
    "keyPoints": [
      "RAID 구성 방식에 대해서 설명해주세요.",
      "RAID",
      "기술에",
      "대해서"
    ]
  },
  {
    "version": 2,
    "categoryId": "distributed-cache",
    "sourceId": "be-55",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "evidenceQuote": "캐시는 성능 향상과 부하 감소를 목표로 합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-55-main",
    "kind": "main",
    "followUpOf": null,
    "question": "원문이 말하는 캐시 사용의 목표는 무엇인가요?",
    "choices": [
      "데이터베이스를 완전히 제거하는 것",
      "모든 데이터를 영구 보관하는 것",
      "성능 향상과 부하 감소",
      "네트워크 지연을 늘리는 것"
    ],
    "correctIndex": 2,
    "explanation": "원문은 성능 향상과 부하 감소라고 설명합니다.",
    "followUpOrder": null,
    "followUpRole": null,
    "sourceAnchor": "content-answer",
    "choiceFeedback": [
      "“데이터베이스를 완전히 제거하는 것”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “성능 향상과 부하 감소”입니다.",
      "“모든 데이터를 영구 보관하는 것”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “성능 향상과 부하 감소”입니다.",
      "원문은 성능 향상과 부하 감소라고 설명합니다.",
      "“네트워크 지연을 늘리는 것”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “성능 향상과 부하 감소”입니다."
    ],
    "keyPoints": [
      "본문",
      "캐싱",
      "전략에",
      "대해서"
    ]
  },
  {
    "version": 2,
    "categoryId": "distributed-cache",
    "sourceId": "be-55",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "Cache Aside(Lazy Loading) 방식에 대해서 설명해주세요.",
    "evidenceQuote": "**Cache Aside 방식**은 캐시 히트 시 캐시에서 데이터를 불러오며, 캐시 미스 발생 시 원본 데이터베이스에서 조회하여 반환합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-55-follow-up",
    "kind": "follow-up",
    "followUpOf": "quiz-be-55-main",
    "question": "be-55 원문에서 기본 개념 다음에 제시한 조건·영향 중 알맞은 것은 무엇인가요?",
    "choices": [
      "원문은 이 조건이 모든 상황에서 반대로 적용된다고 설명한다.",
      "원문은 이 결과가 아무 조건 없이 항상 발생한다고 설명한다.",
      "**Cache Aside 방식**은 캐시 히트 시 캐시에서 데이터를 불러오며, 캐시 미스 발생 시 원본 데이터베이스에서 조회하여 반환합니다.",
      "원문은 이 판단에 원문 밖의 정보가 반드시 필요하다고 설명한다."
    ],
    "correctIndex": 2,
    "explanation": "원문의 근거는 **Cache Aside 방식**은 캐시 히트 시 캐시에서 데이터를 불러오며, 캐시 미스 발생 시 원본 데이터베이스에서 조회하여 반환합니다.라는 판단을 뒷받침합니다.",
    "followUpOrder": 1,
    "followUpRole": "core",
    "sourceAnchor": "cache-asidelazy-loading-방식에-대해서-설명해주세요",
    "choiceFeedback": [
      "“원문은 이 조건이 모든 상황에서 반대로 적용된다고 설명한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “**Cache Aside 방식**은 캐시 히트 시 캐시에서 데이터를 불러오며, 캐시 미스 발생 시 원본 데이터베이스에서 조회하여 반환합니다.”입니다.",
      "“원문은 이 결과가 아무 조건 없이 항상 발생한다고 설명한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “**Cache Aside 방식**은 캐시 히트 시 캐시에서 데이터를 불러오며, 캐시 미스 발생 시 원본 데이터베이스에서 조회하여 반환합니다.”입니다.",
      "원문의 근거는 **Cache Aside 방식**은 캐시 히트 시 캐시에서 데이터를 불러오며, 캐시 미스 발생 시 원본 데이터베이스에서 조회하여 반환합니다.라는 판단을 뒷받침합니다.",
      "“원문은 이 판단에 원문 밖의 정보가 반드시 필요하다고 설명한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “**Cache Aside 방식**은 캐시 히트 시 캐시에서 데이터를 불러오며, 캐시 미스 발생 시 원본 데이터베이스에서 조회하여 반환합니다.”입니다."
    ],
    "keyPoints": [
      "캐싱",
      "전략에",
      "대해서",
      "분산 시스템, 캐시와 운영 인프라"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-55-follow-up-2",
    "kind": "follow-up",
    "followUpOf": "quiz-be-55-main",
    "followUpOrder": 2,
    "followUpRole": "core",
    "question": "캐싱 전략 원문의 “본문” 구역과 일치하는 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "이때 캐시를 사용하는 양상이 서비스에 큰 영향을 끼치기도 합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 1,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "distributed-cache",
    "sourceId": "be-55",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "이때 캐시를 사용하는 양상이 서비스에 큰 영향을 끼치기도 합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “이때 캐시를 사용하는 양상이 서비스에 큰 영향을 끼치기도 합니다.”입니다.",
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “이때 캐시를 사용하는 양상이 서비스에 큰 영향을 끼치기도 합니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “이때 캐시를 사용하는 양상이 서비스에 큰 영향을 끼치기도 합니다.”입니다."
    ],
    "keyPoints": [
      "본문",
      "캐싱",
      "전략에",
      "대해서"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-55-follow-up-3",
    "kind": "follow-up",
    "followUpOf": "quiz-be-55-main",
    "followUpOrder": 3,
    "followUpRole": "remediation",
    "question": "캐싱 전략의 핵심 근거를 다시 확인할 때 옳은 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "애플리케이션은 캐시 미스가 발생하면 해당 데이터를 캐시에 적재합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 2,
    "explanation": "원문의 “Cache Aside(Lazy Loading) 방식에 대해서 설명해주세요.” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "distributed-cache",
    "sourceId": "be-55",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "Cache Aside(Lazy Loading) 방식에 대해서 설명해주세요.",
    "sourceAnchor": "cache-asidelazy-loading-방식에-대해서-설명해주세요",
    "evidenceQuote": "애플리케이션은 캐시 미스가 발생하면 해당 데이터를 캐시에 적재합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “애플리케이션은 캐시 미스가 발생하면 해당 데이터를 캐시에 적재합니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “애플리케이션은 캐시 미스가 발생하면 해당 데이터를 캐시에 적재합니다.”입니다.",
      "원문의 “Cache Aside(Lazy Loading) 방식에 대해서 설명해주세요.” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “애플리케이션은 캐시 미스가 발생하면 해당 데이터를 캐시에 적재합니다.”입니다."
    ],
    "keyPoints": [
      "캐싱",
      "전략에",
      "대해서",
      "분산 시스템, 캐시와 운영 인프라"
    ]
  },
  {
    "version": 2,
    "categoryId": "distributed-cache",
    "sourceId": "be-62",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "evidenceQuote": "대규모 트래픽 환경에서 캐시를 운용하는데, Cache Aside(캐시 미스 발생 시 적재) 전략을 사용한다고 가정하겠습니다. 이때, 수많은 요청들이 동시에 캐시 미스를 확인하고 원본 저장소에서 데이터를 가져와 캐시에 적재하는 상황이 발생할 수 있는데요. 이를 **캐시 스탬피드 현상 혹은 Thundering Herd 문제**라고 표현합니다. 캐시 스탬피드 현상은 원본 데이터베이스와 캐시의 성능을 저하할 수도 있습니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-62-main",
    "kind": "main",
    "followUpOf": null,
    "question": "캐시 스탬피드 현상은 어떤 상황인가요?",
    "choices": [
      "동시에 많은 요청이 캐시 미스를 확인하고 원본 저장소에서 데이터를 가져와 캐시에 적재하는 상황",
      "한 요청만 캐시를 삭제하는 상황",
      "캐시가 항상 최신 데이터를 반환하는 상황",
      "원본 저장소가 읽기 전용이 되는 상황"
    ],
    "correctIndex": 0,
    "explanation": "원문은 동시에 많은 요청이 캐시 미스를 확인하고 원본 저장소에서 데이터를 가져와 캐시에 적재하는 상황라고 설명합니다.",
    "followUpOrder": null,
    "followUpRole": null,
    "sourceAnchor": "content-answer",
    "choiceFeedback": [
      "원문은 동시에 많은 요청이 캐시 미스를 확인하고 원본 저장소에서 데이터를 가져와 캐시에 적재하는 상황라고 설명합니다.",
      "“한 요청만 캐시를 삭제하는 상황”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “동시에 많은 요청이 캐시 미스를 확인하고 원본 저장소에서 데이터를 가져와 캐시에 적재하는 상황”입니다.",
      "“캐시가 항상 최신 데이터를 반환하는 상황”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “동시에 많은 요청이 캐시 미스를 확인하고 원본 저장소에서 데이터를 가져와 캐시에 적재하는 상황”입니다.",
      "“원본 저장소가 읽기 전용이 되는 상황”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “동시에 많은 요청이 캐시 미스를 확인하고 원본 저장소에서 데이터를 가져와 캐시에 적재하는 상황”입니다."
    ],
    "keyPoints": [
      "본문",
      "캐시",
      "스탬피드",
      "현상에"
    ]
  },
  {
    "version": 2,
    "categoryId": "distributed-cache",
    "sourceId": "be-62",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "이 문제는 어떻게 풀어볼 수 있을까요?",
    "evidenceQuote": "해당 방식은 크게 잠금, 외부 재계산, 확률적 조기 재계산 방식으로 풀어볼 수 있습니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-62-follow-up",
    "kind": "follow-up",
    "followUpOf": "quiz-be-62-main",
    "question": "be-62 원문에서 기본 개념 다음에 제시한 조건·영향 중 알맞은 것은 무엇인가요?",
    "choices": [
      "해당 방식은 크게 잠금, 외부 재계산, 확률적 조기 재계산 방식으로 풀어볼 수 있습니다.",
      "원문은 이 조건이 모든 상황에서 반대로 적용된다고 설명한다.",
      "원문은 이 결과가 아무 조건 없이 항상 발생한다고 설명한다.",
      "원문은 이 판단에 원문 밖의 정보가 반드시 필요하다고 설명한다."
    ],
    "correctIndex": 0,
    "explanation": "원문의 근거는 해당 방식은 크게 잠금, 외부 재계산, 확률적 조기 재계산 방식으로 풀어볼 수 있습니다.라는 판단을 뒷받침합니다.",
    "followUpOrder": 1,
    "followUpRole": "core",
    "sourceAnchor": "이-문제는-어떻게-풀어볼-수-있을까요",
    "choiceFeedback": [
      "원문의 근거는 해당 방식은 크게 잠금, 외부 재계산, 확률적 조기 재계산 방식으로 풀어볼 수 있습니다.라는 판단을 뒷받침합니다.",
      "“원문은 이 조건이 모든 상황에서 반대로 적용된다고 설명한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “해당 방식은 크게 잠금, 외부 재계산, 확률적 조기 재계산 방식으로 풀어볼 수 있습니다.”입니다.",
      "“원문은 이 결과가 아무 조건 없이 항상 발생한다고 설명한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “해당 방식은 크게 잠금, 외부 재계산, 확률적 조기 재계산 방식으로 풀어볼 수 있습니다.”입니다.",
      "“원문은 이 판단에 원문 밖의 정보가 반드시 필요하다고 설명한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “해당 방식은 크게 잠금, 외부 재계산, 확률적 조기 재계산 방식으로 풀어볼 수 있습니다.”입니다."
    ],
    "keyPoints": [
      "이 문제는 어떻게 풀어볼 수 있을까요?",
      "캐시",
      "스탬피드",
      "현상에"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-62-follow-up-2",
    "kind": "follow-up",
    "followUpOf": "quiz-be-62-main",
    "followUpOrder": 2,
    "followUpRole": "core",
    "question": "캐시 스탬피드 현상에 대하여 원문의 “이 문제는 어떻게 풀어볼 수 있을까요?” 구역과 일치하는 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.",
      "**잠금(Locking) 방식** 은 한 요청 처리 스레드가 해당 캐시 키에 대한 잠금을 획득합니다."
    ],
    "correctIndex": 3,
    "explanation": "원문의 “이 문제는 어떻게 풀어볼 수 있을까요?” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "distributed-cache",
    "sourceId": "be-62",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "이 문제는 어떻게 풀어볼 수 있을까요?",
    "sourceAnchor": "이-문제는-어떻게-풀어볼-수-있을까요",
    "evidenceQuote": "**잠금(Locking) 방식** 은 한 요청 처리 스레드가 해당 캐시 키에 대한 잠금을 획득합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “**잠금(Locking) 방식** 은 한 요청 처리 스레드가 해당 캐시 키에 대한 잠금을 획득합니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “**잠금(Locking) 방식** 은 한 요청 처리 스레드가 해당 캐시 키에 대한 잠금을 획득합니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “**잠금(Locking) 방식** 은 한 요청 처리 스레드가 해당 캐시 키에 대한 잠금을 획득합니다.”입니다.",
      "원문의 “이 문제는 어떻게 풀어볼 수 있을까요?” 구역이 정답 선택지의 내용을 직접 설명합니다."
    ],
    "keyPoints": [
      "이 문제는 어떻게 풀어볼 수 있을까요?",
      "캐시",
      "스탬피드",
      "현상에"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-62-follow-up-3",
    "kind": "follow-up",
    "followUpOf": "quiz-be-62-main",
    "followUpOrder": 3,
    "followUpRole": "remediation",
    "question": "캐시 스탬피드 현상에 대하여의 핵심 근거를 다시 확인할 때 옳은 설명은 무엇인가요?",
    "choices": [
      "이로인해 다른 요청 처리 스레드들은 잠시 대기합니다.",
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 0,
    "explanation": "원문의 “이 문제는 어떻게 풀어볼 수 있을까요?” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "distributed-cache",
    "sourceId": "be-62",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "이 문제는 어떻게 풀어볼 수 있을까요?",
    "sourceAnchor": "이-문제는-어떻게-풀어볼-수-있을까요",
    "evidenceQuote": "이로인해 다른 요청 처리 스레드들은 잠시 대기합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "원문의 “이 문제는 어떻게 풀어볼 수 있을까요?” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “이로인해 다른 요청 처리 스레드들은 잠시 대기합니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “이로인해 다른 요청 처리 스레드들은 잠시 대기합니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “이로인해 다른 요청 처리 스레드들은 잠시 대기합니다.”입니다."
    ],
    "keyPoints": [
      "이 문제는 어떻게 풀어볼 수 있을까요?",
      "캐시",
      "스탬피드",
      "현상에"
    ]
  },
  {
    "version": 2,
    "categoryId": "distributed-cache",
    "sourceId": "be-63",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "evidenceQuote": "분리된 시스템 간의 비동기 연동은 시스템 간의 결합도를 낮출 수 있으며, 호출된 시스템의 응답을 기다리지 않으므로 더욱 빨리 사용자의 요청에 응답할 수 있다는 장점이 있습니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-63-main",
    "kind": "main",
    "followUpOf": null,
    "question": "분리된 시스템을 비동기로 연동할 때 원문이 든 장점은 무엇인가요?",
    "choices": [
      "모든 시스템이 하나의 트랜잭션을 공유한다",
      "시스템 간 결합도를 낮추고 호출된 시스템의 응답을 기다리지 않아 더 빨리 응답할 수 있다",
      "메시지 순서 문제가 자동으로 사라진다",
      "데이터베이스 스키마를 변경할 필요가 없다"
    ],
    "correctIndex": 1,
    "explanation": "원문은 시스템 간 결합도를 낮추고 호출된 시스템의 응답을 기다리지 않아 더 빨리 응답할 수 있다라고 설명합니다.",
    "followUpOrder": null,
    "followUpRole": null,
    "sourceAnchor": "content-answer",
    "choiceFeedback": [
      "“모든 시스템이 하나의 트랜잭션을 공유한다”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “시스템 간 결합도를 낮추고 호출된 시스템의 응답을 기다리지 않아 더 빨리 응답할 수 있다”입니다.",
      "원문은 시스템 간 결합도를 낮추고 호출된 시스템의 응답을 기다리지 않아 더 빨리 응답할 수 있다라고 설명합니다.",
      "“메시지 순서 문제가 자동으로 사라진다”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “시스템 간 결합도를 낮추고 호출된 시스템의 응답을 기다리지 않아 더 빨리 응답할 수 있다”입니다.",
      "“데이터베이스 스키마를 변경할 필요가 없다”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “시스템 간 결합도를 낮추고 호출된 시스템의 응답을 기다리지 않아 더 빨리 응답할 수 있다”입니다."
    ],
    "keyPoints": [
      "본문",
      "시스템",
      "비동기",
      "연동"
    ]
  },
  {
    "version": 2,
    "categoryId": "distributed-cache",
    "sourceId": "be-63",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "각 방식에 대한 설명과 고려 사항을 설명해 주세요.",
    "evidenceQuote": "**메시징 시스템 활용 방식**은 두 시스템 사이에 메시징 시스템을 두어 비동기로 연동하는 방식입니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-63-follow-up",
    "kind": "follow-up",
    "followUpOf": "quiz-be-63-main",
    "question": "be-63 원문에서 기본 개념 다음에 제시한 조건·영향 중 알맞은 것은 무엇인가요?",
    "choices": [
      "원문은 이 조건이 모든 상황에서 반대로 적용된다고 설명한다.",
      "**메시징 시스템 활용 방식**은 두 시스템 사이에 메시징 시스템을 두어 비동기로 연동하는 방식입니다.",
      "원문은 이 결과가 아무 조건 없이 항상 발생한다고 설명한다.",
      "원문은 이 판단에 원문 밖의 정보가 반드시 필요하다고 설명한다."
    ],
    "correctIndex": 1,
    "explanation": "원문의 근거는 **메시징 시스템 활용 방식**은 두 시스템 사이에 메시징 시스템을 두어 비동기로 연동하는 방식입니다.라는 판단을 뒷받침합니다.",
    "followUpOrder": 1,
    "followUpRole": "core",
    "sourceAnchor": "각-방식에-대한-설명과-고려-사항을-설명해-주세요",
    "choiceFeedback": [
      "“원문은 이 조건이 모든 상황에서 반대로 적용된다고 설명한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “**메시징 시스템 활용 방식**은 두 시스템 사이에 메시징 시스템을 두어 비동기로 연동하는 방식입니다.”입니다.",
      "원문의 근거는 **메시징 시스템 활용 방식**은 두 시스템 사이에 메시징 시스템을 두어 비동기로 연동하는 방식입니다.라는 판단을 뒷받침합니다.",
      "“원문은 이 결과가 아무 조건 없이 항상 발생한다고 설명한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “**메시징 시스템 활용 방식**은 두 시스템 사이에 메시징 시스템을 두어 비동기로 연동하는 방식입니다.”입니다.",
      "“원문은 이 판단에 원문 밖의 정보가 반드시 필요하다고 설명한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “**메시징 시스템 활용 방식**은 두 시스템 사이에 메시징 시스템을 두어 비동기로 연동하는 방식입니다.”입니다."
    ],
    "keyPoints": [
      "각 방식에 대한 설명과 고려 사항을 설명해 주세요.",
      "시스템",
      "비동기",
      "연동"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-63-follow-up-2",
    "kind": "follow-up",
    "followUpOf": "quiz-be-63-main",
    "followUpOrder": 2,
    "followUpRole": "core",
    "question": "시스템 간 비동기 연동 방식에는 무엇이 있나요 원문의 “본문” 구역과 일치하는 설명은 무엇인가요?",
    "choices": [
      "비동기 연동 방식으로 메시징 시스템 활용, 데이터베이스 활용, CDC 활용 방식을 알고 있습니다.",
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 0,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "distributed-cache",
    "sourceId": "be-63",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "비동기 연동 방식으로 메시징 시스템 활용, 데이터베이스 활용, CDC 활용 방식을 알고 있습니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “비동기 연동 방식으로 메시징 시스템 활용, 데이터베이스 활용, CDC 활용 방식을 알고 있습니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “비동기 연동 방식으로 메시징 시스템 활용, 데이터베이스 활용, CDC 활용 방식을 알고 있습니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “비동기 연동 방식으로 메시징 시스템 활용, 데이터베이스 활용, CDC 활용 방식을 알고 있습니다.”입니다."
    ],
    "keyPoints": [
      "본문",
      "시스템",
      "비동기",
      "연동"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-63-follow-up-3",
    "kind": "follow-up",
    "followUpOf": "quiz-be-63-main",
    "followUpOrder": 3,
    "followUpRole": "remediation",
    "question": "시스템 간 비동기 연동 방식에는 무엇이 있나요의 핵심 근거를 다시 확인할 때 옳은 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "해당 방식은 한 시스템에서 메시지를 생성해서 메시징 시스템에 송신한 이후, 다른 시스템에서 메시징 시스템으로부터 메시지를 읽어와 메시지를 처리합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 1,
    "explanation": "원문의 “각 방식에 대한 설명과 고려 사항을 설명해 주세요.” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "distributed-cache",
    "sourceId": "be-63",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "각 방식에 대한 설명과 고려 사항을 설명해 주세요.",
    "sourceAnchor": "각-방식에-대한-설명과-고려-사항을-설명해-주세요",
    "evidenceQuote": "해당 방식은 한 시스템에서 메시지를 생성해서 메시징 시스템에 송신한 이후, 다른 시스템에서 메시징 시스템으로부터 메시지를 읽어와 메시지를 처리합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “해당 방식은 한 시스템에서 메시지를 생성해서 메시징 시스템에 송신한 이후, 다른 시스템에서 메시징 시스템으로부터 메시지를 읽어와 메시지를 처리합니다.”입니다.",
      "원문의 “각 방식에 대한 설명과 고려 사항을 설명해 주세요.” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “해당 방식은 한 시스템에서 메시지를 생성해서 메시징 시스템에 송신한 이후, 다른 시스템에서 메시징 시스템으로부터 메시지를 읽어와 메시지를 처리합니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “해당 방식은 한 시스템에서 메시지를 생성해서 메시징 시스템에 송신한 이후, 다른 시스템에서 메시징 시스템으로부터 메시지를 읽어와 메시지를 처리합니다.”입니다."
    ],
    "keyPoints": [
      "각 방식에 대한 설명과 고려 사항을 설명해 주세요.",
      "시스템",
      "비동기",
      "연동"
    ]
  },
  {
    "version": 2,
    "categoryId": "distributed-cache",
    "sourceId": "be-64",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "evidenceQuote": "CAP 정리는 분산 데이터베이스 시스템이 CAP 중 2개의 속성만을 제공할 수 있다는 이론입니다. CAP 정리에 따르자면, 일관성(Consistency), 가용성(Availability), 분할 내성(Partition Tolerance) 등 3가지 속성을 모두 만족하는 분산 데이터베이스 시스템은 존재하지 않습니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-64-main",
    "kind": "main",
    "followUpOf": null,
    "question": "CAP 정리에 따르면 분산 데이터베이스 시스템은 무엇을 모두 만족할 수 없나요?",
    "choices": [
      "일관성만",
      "가용성만",
      "일관성, 가용성, 분할 내성 세 속성 모두",
      "분할 내성만"
    ],
    "correctIndex": 2,
    "explanation": "원문은 일관성, 가용성, 분할 내성 세 속성 모두라고 설명합니다.",
    "followUpOrder": null,
    "followUpRole": null,
    "sourceAnchor": "content-answer",
    "choiceFeedback": [
      "“일관성만”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “일관성, 가용성, 분할 내성 세 속성 모두”입니다.",
      "“가용성만”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “일관성, 가용성, 분할 내성 세 속성 모두”입니다.",
      "원문은 일관성, 가용성, 분할 내성 세 속성 모두라고 설명합니다.",
      "“분할 내성만”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “일관성, 가용성, 분할 내성 세 속성 모두”입니다."
    ],
    "keyPoints": [
      "본문",
      "CAP",
      "정리에",
      "대해서"
    ]
  },
  {
    "version": 2,
    "categoryId": "distributed-cache",
    "sourceId": "be-64",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "각 속성에 대해서 설명해주시겠어요?",
    "evidenceQuote": "- **일관성(Consistency)** 은 모든 클라이언트 요청은 어느 노드에 연결되어도 같은 데이터를 볼 수 있음을 의미합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-64-follow-up",
    "kind": "follow-up",
    "followUpOf": "quiz-be-64-main",
    "question": "be-64 원문에서 기본 개념 다음에 제시한 조건·영향 중 알맞은 것은 무엇인가요?",
    "choices": [
      "원문은 이 조건이 모든 상황에서 반대로 적용된다고 설명한다.",
      "원문은 이 결과가 아무 조건 없이 항상 발생한다고 설명한다.",
      "- **일관성(Consistency)** 은 모든 클라이언트 요청은 어느 노드에 연결되어도 같은 데이터를 볼 수 있음을 의미합니다.",
      "원문은 이 판단에 원문 밖의 정보가 반드시 필요하다고 설명한다."
    ],
    "correctIndex": 2,
    "explanation": "원문의 근거는 - **일관성(Consistency)** 은 모든 클라이언트 요청은 어느 노드에 연결되어도 같은 데이터를 볼 수 있음을 의미합니다.라는 판단을 뒷받침합니다.",
    "followUpOrder": 1,
    "followUpRole": "core",
    "sourceAnchor": "각-속성에-대해서-설명해주시겠어요",
    "choiceFeedback": [
      "“원문은 이 조건이 모든 상황에서 반대로 적용된다고 설명한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “- **일관성(Consistency)** 은 모든 클라이언트 요청은 어느 노드에 연결되어도 같은 데이터를 볼 수 있음을 의미합니다.”입니다.",
      "“원문은 이 결과가 아무 조건 없이 항상 발생한다고 설명한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “- **일관성(Consistency)** 은 모든 클라이언트 요청은 어느 노드에 연결되어도 같은 데이터를 볼 수 있음을 의미합니다.”입니다.",
      "원문의 근거는 - **일관성(Consistency)** 은 모든 클라이언트 요청은 어느 노드에 연결되어도 같은 데이터를 볼 수 있음을 의미합니다.라는 판단을 뒷받침합니다.",
      "“원문은 이 판단에 원문 밖의 정보가 반드시 필요하다고 설명한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “- **일관성(Consistency)** 은 모든 클라이언트 요청은 어느 노드에 연결되어도 같은 데이터를 볼 수 있음을 의미합니다.”입니다."
    ],
    "keyPoints": [
      "각 속성에 대해서 설명해주시겠어요?",
      "CAP",
      "정리에",
      "대해서"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-64-follow-up-2",
    "kind": "follow-up",
    "followUpOf": "quiz-be-64-main",
    "followUpOrder": 2,
    "followUpRole": "core",
    "question": "CAP 정리에 대해서 알고 계신가요 원문의 “각 속성에 대해서 설명해주시겠어요?” 구역과 일치하는 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "**가용성(Availability)** 은 노드 일부에 문제가 발생하여도 시스템은 클라이언트의 모든 요청에 유효한 응답을 전해줄 수 있어야 함을 의미합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 1,
    "explanation": "원문의 “각 속성에 대해서 설명해주시겠어요?” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "distributed-cache",
    "sourceId": "be-64",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "각 속성에 대해서 설명해주시겠어요?",
    "sourceAnchor": "각-속성에-대해서-설명해주시겠어요",
    "evidenceQuote": "**가용성(Availability)** 은 노드 일부에 문제가 발생하여도 시스템은 클라이언트의 모든 요청에 유효한 응답을 전해줄 수 있어야 함을 의미합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “**가용성(Availability)** 은 노드 일부에 문제가 발생하여도 시스템은 클라이언트의 모든 요청에 유효한 응답을 전해줄 수 있어야 함을 의미합니다.”입니다.",
      "원문의 “각 속성에 대해서 설명해주시겠어요?” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “**가용성(Availability)** 은 노드 일부에 문제가 발생하여도 시스템은 클라이언트의 모든 요청에 유효한 응답을 전해줄 수 있어야 함을 의미합니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “**가용성(Availability)** 은 노드 일부에 문제가 발생하여도 시스템은 클라이언트의 모든 요청에 유효한 응답을 전해줄 수 있어야 함을 의미합니다.”입니다."
    ],
    "keyPoints": [
      "각 속성에 대해서 설명해주시겠어요?",
      "CAP",
      "정리에",
      "대해서"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-64-follow-up-3",
    "kind": "follow-up",
    "followUpOf": "quiz-be-64-main",
    "followUpOrder": 3,
    "followUpRole": "remediation",
    "question": "CAP 정리에 대해서 알고 계신가요의 핵심 근거를 다시 확인할 때 옳은 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "**분할 내성(Partition Tolerance)** 은 노드 사이에 통신이 불가능한 상황(파티션)에서도 시스템이 계속 동작한다는 것을 의미합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 2,
    "explanation": "원문의 “각 속성에 대해서 설명해주시겠어요?” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "distributed-cache",
    "sourceId": "be-64",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "각 속성에 대해서 설명해주시겠어요?",
    "sourceAnchor": "각-속성에-대해서-설명해주시겠어요",
    "evidenceQuote": "**분할 내성(Partition Tolerance)** 은 노드 사이에 통신이 불가능한 상황(파티션)에서도 시스템이 계속 동작한다는 것을 의미합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “**분할 내성(Partition Tolerance)** 은 노드 사이에 통신이 불가능한 상황(파티션)에서도 시스템이 계속 동작한다는 것을 의미합니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “**분할 내성(Partition Tolerance)** 은 노드 사이에 통신이 불가능한 상황(파티션)에서도 시스템이 계속 동작한다는 것을 의미합니다.”입니다.",
      "원문의 “각 속성에 대해서 설명해주시겠어요?” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “**분할 내성(Partition Tolerance)** 은 노드 사이에 통신이 불가능한 상황(파티션)에서도 시스템이 계속 동작한다는 것을 의미합니다.”입니다."
    ],
    "keyPoints": [
      "각 속성에 대해서 설명해주시겠어요?",
      "CAP",
      "정리에",
      "대해서"
    ]
  },
  {
    "version": 2,
    "categoryId": "distributed-cache",
    "sourceId": "be-66",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "evidenceQuote": "Redis가 단일 스레드(single-threaded)로 설계된 이유는 주로 성능 최적화, 복잡성 감소, 그리고 데이터 일관성을 유지에 있습니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-66-main",
    "kind": "main",
    "followUpOf": null,
    "question": "원문이 설명한 Redis 단일 스레드 설계의 이유로 알맞은 것은?",
    "choices": [
      "성능 최적화, 복잡성 감소, 데이터 일관성 유지",
      "디스크 I/O를 순차 처리하기 위해서만",
      "클라이언트를 하나만 받기 위해서",
      "네트워크 연결을 사용하지 않기 위해서"
    ],
    "correctIndex": 0,
    "explanation": "원문은 성능 최적화, 복잡성 감소, 데이터 일관성 유지라고 설명합니다.",
    "followUpOrder": null,
    "followUpRole": null,
    "sourceAnchor": "content-answer",
    "choiceFeedback": [
      "원문은 성능 최적화, 복잡성 감소, 데이터 일관성 유지라고 설명합니다.",
      "“디스크 I/O를 순차 처리하기 위해서만”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “성능 최적화, 복잡성 감소, 데이터 일관성 유지”입니다.",
      "“클라이언트를 하나만 받기 위해서”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “성능 최적화, 복잡성 감소, 데이터 일관성 유지”입니다.",
      "“네트워크 연결을 사용하지 않기 위해서”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “성능 최적화, 복잡성 감소, 데이터 일관성 유지”입니다."
    ],
    "keyPoints": [
      "본문",
      "Redis가",
      "싱글",
      "스레드로"
    ]
  },
  {
    "version": 2,
    "categoryId": "distributed-cache",
    "sourceId": "be-66",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "evidenceQuote": "단일 스레드 모델은 멀티스레드 모델에 비해 설계와 구현이 상대적으로 간단합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-66-follow-up",
    "kind": "follow-up",
    "followUpOf": "quiz-be-66-main",
    "question": "be-66 원문에서 기본 개념 다음에 제시한 조건·영향 중 알맞은 것은 무엇인가요?",
    "choices": [
      "단일 스레드 모델은 멀티스레드 모델에 비해 설계와 구현이 상대적으로 간단합니다.",
      "원문은 이 조건이 모든 상황에서 반대로 적용된다고 설명한다.",
      "원문은 이 결과가 아무 조건 없이 항상 발생한다고 설명한다.",
      "원문은 이 판단에 원문 밖의 정보가 반드시 필요하다고 설명한다."
    ],
    "correctIndex": 0,
    "explanation": "원문의 근거는 단일 스레드 모델은 멀티스레드 모델에 비해 설계와 구현이 상대적으로 간단합니다.라는 판단을 뒷받침합니다.",
    "followUpOrder": 1,
    "followUpRole": "core",
    "sourceAnchor": "content-answer",
    "choiceFeedback": [
      "원문의 근거는 단일 스레드 모델은 멀티스레드 모델에 비해 설계와 구현이 상대적으로 간단합니다.라는 판단을 뒷받침합니다.",
      "“원문은 이 조건이 모든 상황에서 반대로 적용된다고 설명한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “단일 스레드 모델은 멀티스레드 모델에 비해 설계와 구현이 상대적으로 간단합니다.”입니다.",
      "“원문은 이 결과가 아무 조건 없이 항상 발생한다고 설명한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “단일 스레드 모델은 멀티스레드 모델에 비해 설계와 구현이 상대적으로 간단합니다.”입니다.",
      "“원문은 이 판단에 원문 밖의 정보가 반드시 필요하다고 설명한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “단일 스레드 모델은 멀티스레드 모델에 비해 설계와 구현이 상대적으로 간단합니다.”입니다."
    ],
    "keyPoints": [
      "본문",
      "Redis가",
      "싱글",
      "스레드로"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-66-follow-up-2",
    "kind": "follow-up",
    "followUpOf": "quiz-be-66-main",
    "followUpOrder": 2,
    "followUpRole": "core",
    "question": "Redis가 싱글 스레드로 만들어진 이유를 원문의 “본문” 구역과 일치하는 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.",
      "멀티스레드 환경에서는 동시성 문제(레이스 컨디션, 데드락 등)를 처리하기 위해 복잡한 동기화 메커니즘이 필요하지만, 단일 스레드 환경에서는 이런 문제를 자연스럽게 회피할 수 있습니다."
    ],
    "correctIndex": 3,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "distributed-cache",
    "sourceId": "be-66",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "멀티스레드 환경에서는 동시성 문제(레이스 컨디션, 데드락 등)를 처리하기 위해 복잡한 동기화 메커니즘이 필요하지만, 단일 스레드 환경에서는 이런 문제를 자연스럽게 회피할 수 있습니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “멀티스레드 환경에서는 동시성 문제(레이스 컨디션, 데드락 등)를 처리하기 위해 복잡한 동기화 메커니즘이 필요하지만, 단일 스레드 환경에서는 이런 문제를 자연스럽게 회피할 수 있습니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “멀티스레드 환경에서는 동시성 문제(레이스 컨디션, 데드락 등)를 처리하기 위해 복잡한 동기화 메커니즘이 필요하지만, 단일 스레드 환경에서는 이런 문제를 자연스럽게 회피할 수 있습니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “멀티스레드 환경에서는 동시성 문제(레이스 컨디션, 데드락 등)를 처리하기 위해 복잡한 동기화 메커니즘이 필요하지만, 단일 스레드 환경에서는 이런 문제를 자연스럽게 회피할 수 있습니다.”입니다.",
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다."
    ],
    "keyPoints": [
      "본문",
      "Redis가",
      "싱글",
      "스레드로"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-66-follow-up-3",
    "kind": "follow-up",
    "followUpOf": "quiz-be-66-main",
    "followUpOrder": 3,
    "followUpRole": "remediation",
    "question": "Redis가 싱글 스레드로 만들어진 이유를의 핵심 근거를 다시 확인할 때 옳은 설명은 무엇인가요?",
    "choices": [
      "동시에 여러 스레드가 동일한 데이터를 수정하려고 할 때 발생할 수 있는 데이터 불일치 문제를 방지합니다.",
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 0,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "distributed-cache",
    "sourceId": "be-66",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "동시에 여러 스레드가 동일한 데이터를 수정하려고 할 때 발생할 수 있는 데이터 불일치 문제를 방지합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “동시에 여러 스레드가 동일한 데이터를 수정하려고 할 때 발생할 수 있는 데이터 불일치 문제를 방지합니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “동시에 여러 스레드가 동일한 데이터를 수정하려고 할 때 발생할 수 있는 데이터 불일치 문제를 방지합니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “동시에 여러 스레드가 동일한 데이터를 수정하려고 할 때 발생할 수 있는 데이터 불일치 문제를 방지합니다.”입니다."
    ],
    "keyPoints": [
      "본문",
      "Redis가",
      "싱글",
      "스레드로"
    ]
  },
  {
    "version": 2,
    "categoryId": "distributed-cache",
    "sourceId": "be-83",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "evidenceQuote": "**트랜잭셔널 아웃박스 패턴(Transactional Outbox Pattern)** 은 분산 시스템에서 단일 작업에 데이터베이스 쓰기 작업과 메시지 혹은 이벤트 발행이 모두 포함된 경우 발생하는 이중 쓰기 문제를 해결하기 위해서 사용할 수 있습니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-83-main",
    "kind": "main",
    "followUpOf": null,
    "question": "트랜잭셔널 아웃박스 패턴은 어떤 문제를 해결하기 위해 사용할 수 있나요?",
    "choices": [
      "캐시 만료 시간을 계산하는 문제",
      "스레드 풀 포화 문제",
      "파일 시스템 권한 문제",
      "데이터베이스 쓰기와 메시지 또는 이벤트 발행이 함께 있을 때의 이중 쓰기 문제"
    ],
    "correctIndex": 3,
    "explanation": "원문은 데이터베이스 쓰기와 메시지 또는 이벤트 발행이 함께 있을 때의 이중 쓰기 문제라고 설명합니다.",
    "followUpOrder": null,
    "followUpRole": null,
    "sourceAnchor": "content-answer",
    "choiceFeedback": [
      "“캐시 만료 시간을 계산하는 문제”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “데이터베이스 쓰기와 메시지 또는 이벤트 발행이 함께 있을 때의 이중 쓰기 문제”입니다.",
      "“스레드 풀 포화 문제”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “데이터베이스 쓰기와 메시지 또는 이벤트 발행이 함께 있을 때의 이중 쓰기 문제”입니다.",
      "“파일 시스템 권한 문제”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “데이터베이스 쓰기와 메시지 또는 이벤트 발행이 함께 있을 때의 이중 쓰기 문제”입니다.",
      "원문은 데이터베이스 쓰기와 메시지 또는 이벤트 발행이 함께 있을 때의 이중 쓰기 문제라고 설명합니다."
    ],
    "keyPoints": [
      "본문",
      "트랜잭셔널",
      "아웃박스",
      "패턴에"
    ]
  },
  {
    "version": 2,
    "categoryId": "distributed-cache",
    "sourceId": "be-83",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "evidenceQuote": "Product product = new Product(\"신규 상품\");",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-83-follow-up",
    "kind": "follow-up",
    "followUpOf": "quiz-be-83-main",
    "question": "be-83 원문에서 기본 개념 다음에 제시한 조건·영향 중 알맞은 것은 무엇인가요?",
    "choices": [
      "원문은 이 조건이 모든 상황에서 반대로 적용된다고 설명한다.",
      "원문은 이 결과가 아무 조건 없이 항상 발생한다고 설명한다.",
      "원문은 이 판단에 원문 밖의 정보가 반드시 필요하다고 설명한다.",
      "Product product = new Product(\"신규 상품\");"
    ],
    "correctIndex": 3,
    "explanation": "원문의 근거는 Product product = new Product(\"신규 상품\");라는 판단을 뒷받침합니다.",
    "followUpOrder": 1,
    "followUpRole": "core",
    "sourceAnchor": "content-answer",
    "choiceFeedback": [
      "“원문은 이 조건이 모든 상황에서 반대로 적용된다고 설명한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “Product product = new Product(\"신규 상품\");”입니다.",
      "“원문은 이 결과가 아무 조건 없이 항상 발생한다고 설명한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “Product product = new Product(\"신규 상품\");”입니다.",
      "“원문은 이 판단에 원문 밖의 정보가 반드시 필요하다고 설명한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “Product product = new Product(\"신규 상품\");”입니다.",
      "원문의 근거는 Product product = new Product(\"신규 상품\");라는 판단을 뒷받침합니다."
    ],
    "keyPoints": [
      "본문",
      "트랜잭셔널",
      "아웃박스",
      "패턴에"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-83-follow-up-2",
    "kind": "follow-up",
    "followUpOf": "quiz-be-83-main",
    "followUpOrder": 2,
    "followUpRole": "core",
    "question": "트랜잭셔널 아웃박스 패턴 원문의 “본문” 구역과 일치하는 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "예를 들어, 다음과 같은 코드가 존재한다고 가정하겠습니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 2,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "distributed-cache",
    "sourceId": "be-83",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "예를 들어, 다음과 같은 코드가 존재한다고 가정하겠습니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “예를 들어, 다음과 같은 코드가 존재한다고 가정하겠습니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “예를 들어, 다음과 같은 코드가 존재한다고 가정하겠습니다.”입니다.",
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “예를 들어, 다음과 같은 코드가 존재한다고 가정하겠습니다.”입니다."
    ],
    "keyPoints": [
      "본문",
      "트랜잭셔널",
      "아웃박스",
      "패턴에"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-83-follow-up-3",
    "kind": "follow-up",
    "followUpOf": "quiz-be-83-main",
    "followUpOrder": 3,
    "followUpRole": "remediation",
    "question": "트랜잭셔널 아웃박스 패턴의 핵심 근거를 다시 확인할 때 옳은 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.",
      "위와 같이 신규 상품을 생성하고, 이벤트를 발행하는 코드를 트랜잭션 AOP 로직이 적용된 간단한 의사코드로 작성한다면 다음과 같을 텐데요."
    ],
    "correctIndex": 3,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "distributed-cache",
    "sourceId": "be-83",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "위와 같이 신규 상품을 생성하고, 이벤트를 발행하는 코드를 트랜잭션 AOP 로직이 적용된 간단한 의사코드로 작성한다면 다음과 같을 텐데요.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “위와 같이 신규 상품을 생성하고, 이벤트를 발행하는 코드를 트랜잭션 AOP 로직이 적용된 간단한 의사코드로 작성한다면 다음과 같을 텐데요.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “위와 같이 신규 상품을 생성하고, 이벤트를 발행하는 코드를 트랜잭션 AOP 로직이 적용된 간단한 의사코드로 작성한다면 다음과 같을 텐데요.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “위와 같이 신규 상품을 생성하고, 이벤트를 발행하는 코드를 트랜잭션 AOP 로직이 적용된 간단한 의사코드로 작성한다면 다음과 같을 텐데요.”입니다.",
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다."
    ],
    "keyPoints": [
      "본문",
      "트랜잭셔널",
      "아웃박스",
      "패턴에"
    ]
  },
  {
    "version": 2,
    "categoryId": "distributed-cache",
    "sourceId": "be-91",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "evidenceQuote": "개발자가 작성한 작은 코드 변경을 코드 베이스에 통합합니다. 변경한 부분이 통합되면, 자동으로 새로운 시스템을 빌드하고 현재 시스템에 존재하는 모든 테스트를 실행합니다. 만약 이전에 동작했던 어떤 부분이 망가졌다면, 개발자는 해당 부분을 다시 수정합니다. 이러한 일련의 과정을 포함하는 소프트웨어 개발 방식을 **지속적 통합(Continuous Integration)** 이라고 합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-91-main",
    "kind": "main",
    "followUpOf": null,
    "question": "원문에서 지속적 통합(CI)으로 설명한 활동은 무엇인가요?",
    "choices": [
      "빌드 아티팩트를 수동으로만 배포하는 방식",
      "운영 서버를 종료하지 않는 배포 방식",
      "작은 코드 변경을 통합하고 자동 빌드와 테스트를 실행하는 개발 방식",
      "데이터베이스를 복제하는 방식"
    ],
    "correctIndex": 2,
    "explanation": "원문은 작은 코드 변경을 통합하고 자동 빌드와 테스트를 실행하는 개발 방식라고 설명합니다.",
    "followUpOrder": null,
    "followUpRole": null,
    "sourceAnchor": "content-answer",
    "choiceFeedback": [
      "“빌드 아티팩트를 수동으로만 배포하는 방식”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “작은 코드 변경을 통합하고 자동 빌드와 테스트를 실행하는 개발 방식”입니다.",
      "“운영 서버를 종료하지 않는 배포 방식”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “작은 코드 변경을 통합하고 자동 빌드와 테스트를 실행하는 개발 방식”입니다.",
      "원문은 작은 코드 변경을 통합하고 자동 빌드와 테스트를 실행하는 개발 방식라고 설명합니다.",
      "“데이터베이스를 복제하는 방식”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “작은 코드 변경을 통합하고 자동 빌드와 테스트를 실행하는 개발 방식”입니다."
    ],
    "keyPoints": [
      "본문",
      "CI",
      "CD",
      "파이프라인에"
    ]
  },
  {
    "version": 2,
    "categoryId": "distributed-cache",
    "sourceId": "be-91",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "evidenceQuote": "**지속적 배포(Continuous Deployment)** 는 지속적 통합을 통해서 빌드된 코드(빌드 아티팩트)를 프로덕션 환경에 자동으로 배포하는 것을 의미합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-91-follow-up",
    "kind": "follow-up",
    "followUpOf": "quiz-be-91-main",
    "question": "be-91 원문에서 기본 개념 다음에 제시한 조건·영향 중 알맞은 것은 무엇인가요?",
    "choices": [
      "원문은 이 조건이 모든 상황에서 반대로 적용된다고 설명한다.",
      "원문은 이 결과가 아무 조건 없이 항상 발생한다고 설명한다.",
      "**지속적 배포(Continuous Deployment)** 는 지속적 통합을 통해서 빌드된 코드(빌드 아티팩트)를 프로덕션 환경에 자동으로 배포하는 것을 의미합니다.",
      "원문은 이 판단에 원문 밖의 정보가 반드시 필요하다고 설명한다."
    ],
    "correctIndex": 2,
    "explanation": "원문의 근거는 **지속적 배포(Continuous Deployment)** 는 지속적 통합을 통해서 빌드된 코드(빌드 아티팩트)를 프로덕션 환경에 자동으로 배포하는 것을 의미합니다.라는 판단을 뒷받침합니다.",
    "followUpOrder": 1,
    "followUpRole": "core",
    "sourceAnchor": "content-answer",
    "choiceFeedback": [
      "“원문은 이 조건이 모든 상황에서 반대로 적용된다고 설명한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “**지속적 배포(Continuous Deployment)** 는 지속적 통합을 통해서 빌드된 코드(빌드 아티팩트)를 프로덕션 환경에 자동으로 배포하는 것을 의미합니다.”입니다.",
      "“원문은 이 결과가 아무 조건 없이 항상 발생한다고 설명한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “**지속적 배포(Continuous Deployment)** 는 지속적 통합을 통해서 빌드된 코드(빌드 아티팩트)를 프로덕션 환경에 자동으로 배포하는 것을 의미합니다.”입니다.",
      "원문의 근거는 **지속적 배포(Continuous Deployment)** 는 지속적 통합을 통해서 빌드된 코드(빌드 아티팩트)를 프로덕션 환경에 자동으로 배포하는 것을 의미합니다.라는 판단을 뒷받침합니다.",
      "“원문은 이 판단에 원문 밖의 정보가 반드시 필요하다고 설명한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “**지속적 배포(Continuous Deployment)** 는 지속적 통합을 통해서 빌드된 코드(빌드 아티팩트)를 프로덕션 환경에 자동으로 배포하는 것을 의미합니다.”입니다."
    ],
    "keyPoints": [
      "본문",
      "CI",
      "CD",
      "파이프라인에"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-91-follow-up-2",
    "kind": "follow-up",
    "followUpOf": "quiz-be-91-main",
    "followUpOrder": 2,
    "followUpRole": "core",
    "question": "CI/CD 파이프라인 원문의 “본문” 구역과 일치하는 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "지속적 통합의 핵심 목표는 소프트웨어의 품질을 개선하고, 새로운 소프트웨어의 변경 사항을 검증하는데 소요되는 시간을 단축 시키며, 버그를 조기에 발견하기 위함입니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 1,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "distributed-cache",
    "sourceId": "be-91",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "지속적 통합의 핵심 목표는 소프트웨어의 품질을 개선하고, 새로운 소프트웨어의 변경 사항을 검증하는데 소요되는 시간을 단축 시키며, 버그를 조기에 발견하기 위함입니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “지속적 통합의 핵심 목표는 소프트웨어의 품질을 개선하고, 새로운 소프트웨어의 변경 사항을 검증하는데 소요되는 시간을 단축 시키며, 버그를 조기에 발견하기 위함입니다.”입니다.",
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “지속적 통합의 핵심 목표는 소프트웨어의 품질을 개선하고, 새로운 소프트웨어의 변경 사항을 검증하는데 소요되는 시간을 단축 시키며, 버그를 조기에 발견하기 위함입니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “지속적 통합의 핵심 목표는 소프트웨어의 품질을 개선하고, 새로운 소프트웨어의 변경 사항을 검증하는데 소요되는 시간을 단축 시키며, 버그를 조기에 발견하기 위함입니다.”입니다."
    ],
    "keyPoints": [
      "본문",
      "CI",
      "CD",
      "파이프라인에"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-91-follow-up-3",
    "kind": "follow-up",
    "followUpOf": "quiz-be-91-main",
    "followUpOrder": 3,
    "followUpRole": "remediation",
    "question": "CI/CD 파이프라인의 핵심 근거를 다시 확인할 때 옳은 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "**지속적 전달(Continuous Delivery)** 은 빌드 아티팩트를 프로덕션 환경에 바로 배포하기 위해서 수동으로 작업해야 한다는 점에서 지속적 배포와 차이가 있습니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 2,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "distributed-cache",
    "sourceId": "be-91",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "**지속적 전달(Continuous Delivery)** 은 빌드 아티팩트를 프로덕션 환경에 바로 배포하기 위해서 수동으로 작업해야 한다는 점에서 지속적 배포와 차이가 있습니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “**지속적 전달(Continuous Delivery)** 은 빌드 아티팩트를 프로덕션 환경에 바로 배포하기 위해서 수동으로 작업해야 한다는 점에서 지속적 배포와 차이가 있습니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “**지속적 전달(Continuous Delivery)** 은 빌드 아티팩트를 프로덕션 환경에 바로 배포하기 위해서 수동으로 작업해야 한다는 점에서 지속적 배포와 차이가 있습니다.”입니다.",
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “**지속적 전달(Continuous Delivery)** 은 빌드 아티팩트를 프로덕션 환경에 바로 배포하기 위해서 수동으로 작업해야 한다는 점에서 지속적 배포와 차이가 있습니다.”입니다."
    ],
    "keyPoints": [
      "본문",
      "CI",
      "CD",
      "파이프라인에"
    ]
  },
  {
    "version": 2,
    "categoryId": "distributed-cache",
    "sourceId": "be-92",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "evidenceQuote": "시스템은 크게 상태 변경과 조회 기능을 제공하는데요. 주문 취소, 결제 기능은 상태 변경에 해당되며, 주문서 조회, 사용자 조회 등이 조회에 해당됩니다. **명령 쿼리 책임 분리 패턴(Command Query Responsibility Segregation, CQRS)** 는 상태를 변경하기 위한 명령을 위한 모델과 상태를 제공하는 조회(Query)를 위한 모델을 분리하는 패턴을 의미합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-92-main",
    "kind": "main",
    "followUpOf": null,
    "question": "CQRS 패턴에서 분리하는 두 모델은 무엇인가요?",
    "choices": [
      "인증 모델과 인가 모델",
      "캐시 모델과 로그 모델",
      "클라이언트 모델과 서버 모델",
      "상태 변경을 위한 명령 모델과 상태 조회를 위한 조회 모델"
    ],
    "correctIndex": 3,
    "explanation": "원문은 상태 변경을 위한 명령 모델과 상태 조회를 위한 조회 모델라고 설명합니다.",
    "followUpOrder": null,
    "followUpRole": null,
    "sourceAnchor": "content-answer",
    "choiceFeedback": [
      "“인증 모델과 인가 모델”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “상태 변경을 위한 명령 모델과 상태 조회를 위한 조회 모델”입니다.",
      "“캐시 모델과 로그 모델”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “상태 변경을 위한 명령 모델과 상태 조회를 위한 조회 모델”입니다.",
      "“클라이언트 모델과 서버 모델”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “상태 변경을 위한 명령 모델과 상태 조회를 위한 조회 모델”입니다.",
      "원문은 상태 변경을 위한 명령 모델과 상태 조회를 위한 조회 모델라고 설명합니다."
    ],
    "keyPoints": [
      "본문",
      "CQRS",
      "패턴이란",
      "무엇인가요?"
    ]
  },
  {
    "version": 2,
    "categoryId": "distributed-cache",
    "sourceId": "be-92",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "CQRS 패턴의 장단점은 무엇인가요?",
    "evidenceQuote": "CQRS 패턴을 따르면, 소프트웨어의 유지보수성을 높일 수 있습니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-92-follow-up",
    "kind": "follow-up",
    "followUpOf": "quiz-be-92-main",
    "question": "be-92 원문에서 기본 개념 다음에 제시한 조건·영향 중 알맞은 것은 무엇인가요?",
    "choices": [
      "원문은 이 조건이 모든 상황에서 반대로 적용된다고 설명한다.",
      "원문은 이 결과가 아무 조건 없이 항상 발생한다고 설명한다.",
      "원문은 이 판단에 원문 밖의 정보가 반드시 필요하다고 설명한다.",
      "CQRS 패턴을 따르면, 소프트웨어의 유지보수성을 높일 수 있습니다."
    ],
    "correctIndex": 3,
    "explanation": "원문의 근거는 CQRS 패턴을 따르면, 소프트웨어의 유지보수성을 높일 수 있습니다.라는 판단을 뒷받침합니다.",
    "followUpOrder": 1,
    "followUpRole": "core",
    "sourceAnchor": "cqrs-패턴의-장단점은-무엇인가요",
    "choiceFeedback": [
      "“원문은 이 조건이 모든 상황에서 반대로 적용된다고 설명한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “CQRS 패턴을 따르면, 소프트웨어의 유지보수성을 높일 수 있습니다.”입니다.",
      "“원문은 이 결과가 아무 조건 없이 항상 발생한다고 설명한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “CQRS 패턴을 따르면, 소프트웨어의 유지보수성을 높일 수 있습니다.”입니다.",
      "“원문은 이 판단에 원문 밖의 정보가 반드시 필요하다고 설명한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “CQRS 패턴을 따르면, 소프트웨어의 유지보수성을 높일 수 있습니다.”입니다.",
      "원문의 근거는 CQRS 패턴을 따르면, 소프트웨어의 유지보수성을 높일 수 있습니다.라는 판단을 뒷받침합니다."
    ],
    "keyPoints": [
      "CQRS 패턴의 장단점은 무엇인가요?",
      "CQRS",
      "패턴이란",
      "무엇인가요?"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-92-follow-up-2",
    "kind": "follow-up",
    "followUpOf": "quiz-be-92-main",
    "followUpOrder": 2,
    "followUpRole": "core",
    "question": "CQRS 패턴이란 무엇인가요 원문의 “본문” 구역과 일치하는 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "예를 들어, Order라는 리소스를 Order(명령용), OrderData(조회용) 2개의 모델로 나누어서 관리할 수 있습니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 2,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "distributed-cache",
    "sourceId": "be-92",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "예를 들어, Order라는 리소스를 Order(명령용), OrderData(조회용) 2개의 모델로 나누어서 관리할 수 있습니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “예를 들어, Order라는 리소스를 Order(명령용), OrderData(조회용) 2개의 모델로 나누어서 관리할 수 있습니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “예를 들어, Order라는 리소스를 Order(명령용), OrderData(조회용) 2개의 모델로 나누어서 관리할 수 있습니다.”입니다.",
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “예를 들어, Order라는 리소스를 Order(명령용), OrderData(조회용) 2개의 모델로 나누어서 관리할 수 있습니다.”입니다."
    ],
    "keyPoints": [
      "본문",
      "CQRS",
      "패턴이란",
      "무엇인가요?"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-92-follow-up-3",
    "kind": "follow-up",
    "followUpOf": "quiz-be-92-main",
    "followUpOrder": 3,
    "followUpRole": "remediation",
    "question": "CQRS 패턴이란 무엇인가요의 핵심 근거를 다시 확인할 때 옳은 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.",
      "이때 OrderData를 이용해서 표현 계층에 데이터를 출력하는 데 사용하고, 애플리케이션에서는 Order를 활용해 변경을 수행할 수 있습니다."
    ],
    "correctIndex": 3,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "distributed-cache",
    "sourceId": "be-92",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "이때 OrderData를 이용해서 표현 계층에 데이터를 출력하는 데 사용하고, 애플리케이션에서는 Order를 활용해 변경을 수행할 수 있습니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “이때 OrderData를 이용해서 표현 계층에 데이터를 출력하는 데 사용하고, 애플리케이션에서는 Order를 활용해 변경을 수행할 수 있습니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “이때 OrderData를 이용해서 표현 계층에 데이터를 출력하는 데 사용하고, 애플리케이션에서는 Order를 활용해 변경을 수행할 수 있습니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “이때 OrderData를 이용해서 표현 계층에 데이터를 출력하는 데 사용하고, 애플리케이션에서는 Order를 활용해 변경을 수행할 수 있습니다.”입니다.",
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다."
    ],
    "keyPoints": [
      "본문",
      "CQRS",
      "패턴이란",
      "무엇인가요?"
    ]
  },
  {
    "version": 2,
    "categoryId": "distributed-cache",
    "sourceId": "be-93",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "evidenceQuote": "**우아한 종료(Graceful Shutdown)** 란 애플리케이션이 종료될 때 바로 종료하는 것이 아니라, 현재 처리하고 있는 작업을 마무리하고 리소스를 정리한 이후 종료하는 방식을 의미합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-93-main",
    "kind": "main",
    "followUpOf": null,
    "question": "우아한 종료는 애플리케이션을 어떻게 종료하는 방식인가요?",
    "choices": [
      "현재 처리 작업을 마무리하고 리소스를 정리한 뒤 종료하는 방식",
      "신호를 받자마자 처리 작업을 버리고 종료하는 방식",
      "새 요청을 무제한으로 받으며 종료하는 방식",
      "프로세스를 재시작하지 않는 방식"
    ],
    "correctIndex": 0,
    "explanation": "원문은 현재 처리 작업을 마무리하고 리소스를 정리한 뒤 종료하는 방식라고 설명합니다.",
    "followUpOrder": null,
    "followUpRole": null,
    "sourceAnchor": "content-answer",
    "choiceFeedback": [
      "원문은 현재 처리 작업을 마무리하고 리소스를 정리한 뒤 종료하는 방식라고 설명합니다.",
      "“신호를 받자마자 처리 작업을 버리고 종료하는 방식”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “현재 처리 작업을 마무리하고 리소스를 정리한 뒤 종료하는 방식”입니다.",
      "“새 요청을 무제한으로 받으며 종료하는 방식”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “현재 처리 작업을 마무리하고 리소스를 정리한 뒤 종료하는 방식”입니다.",
      "“프로세스를 재시작하지 않는 방식”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “현재 처리 작업을 마무리하고 리소스를 정리한 뒤 종료하는 방식”입니다."
    ],
    "keyPoints": [
      "본문",
      "Graceful",
      "Shutdown의",
      "필요성에"
    ]
  },
  {
    "version": 2,
    "categoryId": "distributed-cache",
    "sourceId": "be-93",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "SIGTERM과 SIGKILL의 차이점은 무엇인가요?",
    "evidenceQuote": "SIGTERM과 SIGKILL은 유닉스 및 리눅스 운영체제에서 사용되는 프로세스 종료 시그널입니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-93-follow-up",
    "kind": "follow-up",
    "followUpOf": "quiz-be-93-main",
    "question": "be-93 원문에서 기본 개념 다음에 제시한 조건·영향 중 알맞은 것은 무엇인가요?",
    "choices": [
      "SIGTERM과 SIGKILL은 유닉스 및 리눅스 운영체제에서 사용되는 프로세스 종료 시그널입니다.",
      "원문은 이 조건이 모든 상황에서 반대로 적용된다고 설명한다.",
      "원문은 이 결과가 아무 조건 없이 항상 발생한다고 설명한다.",
      "원문은 이 판단에 원문 밖의 정보가 반드시 필요하다고 설명한다."
    ],
    "correctIndex": 0,
    "explanation": "원문의 근거는 SIGTERM과 SIGKILL은 유닉스 및 리눅스 운영체제에서 사용되는 프로세스 종료 시그널입니다.라는 판단을 뒷받침합니다.",
    "followUpOrder": 1,
    "followUpRole": "core",
    "sourceAnchor": "sigterm과-sigkill의-차이점은-무엇인가요",
    "choiceFeedback": [
      "원문의 근거는 SIGTERM과 SIGKILL은 유닉스 및 리눅스 운영체제에서 사용되는 프로세스 종료 시그널입니다.라는 판단을 뒷받침합니다.",
      "“원문은 이 조건이 모든 상황에서 반대로 적용된다고 설명한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “SIGTERM과 SIGKILL은 유닉스 및 리눅스 운영체제에서 사용되는 프로세스 종료 시그널입니다.”입니다.",
      "“원문은 이 결과가 아무 조건 없이 항상 발생한다고 설명한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “SIGTERM과 SIGKILL은 유닉스 및 리눅스 운영체제에서 사용되는 프로세스 종료 시그널입니다.”입니다.",
      "“원문은 이 판단에 원문 밖의 정보가 반드시 필요하다고 설명한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “SIGTERM과 SIGKILL은 유닉스 및 리눅스 운영체제에서 사용되는 프로세스 종료 시그널입니다.”입니다."
    ],
    "keyPoints": [
      "SIGTERM과 SIGKILL의 차이점은 무엇인가요?",
      "Graceful",
      "Shutdown의",
      "필요성에"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-93-follow-up-2",
    "kind": "follow-up",
    "followUpOf": "quiz-be-93-main",
    "followUpOrder": 2,
    "followUpRole": "core",
    "question": "Graceful Shutdown의 필요성 원문의 “본문” 구역과 일치하는 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.",
      "서버 애플리케이션에서 일반적인 Graceful Shutdown은 SIGTERM 신호를 받았을 때, 새로운 요청은 차단하고 기존 처리 중인 요청을 모두 완료한 뒤에 프로세스를 종료합니다."
    ],
    "correctIndex": 3,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "distributed-cache",
    "sourceId": "be-93",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "서버 애플리케이션에서 일반적인 Graceful Shutdown은 SIGTERM 신호를 받았을 때, 새로운 요청은 차단하고 기존 처리 중인 요청을 모두 완료한 뒤에 프로세스를 종료합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “서버 애플리케이션에서 일반적인 Graceful Shutdown은 SIGTERM 신호를 받았을 때, 새로운 요청은 차단하고 기존 처리 중인 요청을 모두 완료한 뒤에 프로세스를 종료합니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “서버 애플리케이션에서 일반적인 Graceful Shutdown은 SIGTERM 신호를 받았을 때, 새로운 요청은 차단하고 기존 처리 중인 요청을 모두 완료한 뒤에 프로세스를 종료합니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “서버 애플리케이션에서 일반적인 Graceful Shutdown은 SIGTERM 신호를 받았을 때, 새로운 요청은 차단하고 기존 처리 중인 요청을 모두 완료한 뒤에 프로세스를 종료합니다.”입니다.",
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다."
    ],
    "keyPoints": [
      "본문",
      "Graceful",
      "Shutdown의",
      "필요성에"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-93-follow-up-3",
    "kind": "follow-up",
    "followUpOf": "quiz-be-93-main",
    "followUpOrder": 3,
    "followUpRole": "remediation",
    "question": "Graceful Shutdown의 필요성의 핵심 근거를 다시 확인할 때 옳은 설명은 무엇인가요?",
    "choices": [
      "만약, 서버 애플리케이션이 요청을 처리하는 중에 즉각적으로 애플리케이션을 종료한다면 트랜잭션 비정상 종료, 데이터 손실, 사용자 경험 저하 문제가 발생할 수 있습니다.",
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 0,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "distributed-cache",
    "sourceId": "be-93",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "만약, 서버 애플리케이션이 요청을 처리하는 중에 즉각적으로 애플리케이션을 종료한다면 트랜잭션 비정상 종료, 데이터 손실, 사용자 경험 저하 문제가 발생할 수 있습니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “만약, 서버 애플리케이션이 요청을 처리하는 중에 즉각적으로 애플리케이션을 종료한다면 트랜잭션 비정상 종료, 데이터 손실, 사용자 경험 저하 문제가 발생할 수 있습니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “만약, 서버 애플리케이션이 요청을 처리하는 중에 즉각적으로 애플리케이션을 종료한다면 트랜잭션 비정상 종료, 데이터 손실, 사용자 경험 저하 문제가 발생할 수 있습니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “만약, 서버 애플리케이션이 요청을 처리하는 중에 즉각적으로 애플리케이션을 종료한다면 트랜잭션 비정상 종료, 데이터 손실, 사용자 경험 저하 문제가 발생할 수 있습니다.”입니다."
    ],
    "keyPoints": [
      "본문",
      "Graceful",
      "Shutdown의",
      "필요성에"
    ]
  },
  {
    "version": 2,
    "categoryId": "distributed-cache",
    "sourceId": "be-95",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "evidenceQuote": "Redis의 SET 명령어를 사용해서 분산 잠금을 구현할 수 있습니다. 가령, 1대 이상의 서버가 특정 Key에 대해서 SET 명령어에 NX 옵션을 추가하여 Redis에 전달하여 잠금 획득을 시도합니다. NX 옵션을 사용하면 특정 Key에 해당하는 값이 존재하지 않는 경우에만 값 추가 작업이 성공합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-95-main",
    "kind": "main",
    "followUpOf": null,
    "question": "원문에서 Redis 분산 잠금 획득에 사용하는 방법은 무엇인가요?",
    "choices": [
      "GET 명령어만 반복 호출하는 방법",
      "모든 서버가 같은 키를 삭제하는 방법",
      "SET 명령어에 NX 옵션을 추가해 값이 없을 때만 추가를 성공시키는 방법",
      "키 없이 메시지를 발행하는 방법"
    ],
    "correctIndex": 2,
    "explanation": "원문은 SET 명령어에 NX 옵션을 추가해 값이 없을 때만 추가를 성공시키는 방법라고 설명합니다.",
    "followUpOrder": null,
    "followUpRole": null,
    "sourceAnchor": "content-answer",
    "choiceFeedback": [
      "“GET 명령어만 반복 호출하는 방법”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “SET 명령어에 NX 옵션을 추가해 값이 없을 때만 추가를 성공시키는 방법”입니다.",
      "“모든 서버가 같은 키를 삭제하는 방법”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “SET 명령어에 NX 옵션을 추가해 값이 없을 때만 추가를 성공시키는 방법”입니다.",
      "원문은 SET 명령어에 NX 옵션을 추가해 값이 없을 때만 추가를 성공시키는 방법라고 설명합니다.",
      "“키 없이 메시지를 발행하는 방법”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “SET 명령어에 NX 옵션을 추가해 값이 없을 때만 추가를 성공시키는 방법”입니다."
    ],
    "keyPoints": [
      "본문",
      "분산",
      "환경에서",
      "Redis를"
    ]
  },
  {
    "version": 2,
    "categoryId": "distributed-cache",
    "sourceId": "be-95",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "잠금이 유실될 가능성이 있지 않나요?",
    "evidenceQuote": "만약, 레플리케이션 구성으로 이루어져 있으면 잠금이 유실될 가능성이 존재합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-95-follow-up",
    "kind": "follow-up",
    "followUpOf": "quiz-be-95-main",
    "question": "be-95 원문에서 기본 개념 다음에 제시한 조건·영향 중 알맞은 것은 무엇인가요?",
    "choices": [
      "원문은 이 조건이 모든 상황에서 반대로 적용된다고 설명한다.",
      "원문은 이 결과가 아무 조건 없이 항상 발생한다고 설명한다.",
      "만약, 레플리케이션 구성으로 이루어져 있으면 잠금이 유실될 가능성이 존재합니다.",
      "원문은 이 판단에 원문 밖의 정보가 반드시 필요하다고 설명한다."
    ],
    "correctIndex": 2,
    "explanation": "원문의 근거는 만약, 레플리케이션 구성으로 이루어져 있으면 잠금이 유실될 가능성이 존재합니다.라는 판단을 뒷받침합니다.",
    "followUpOrder": 1,
    "followUpRole": "core",
    "sourceAnchor": "잠금이-유실될-가능성이-있지-않나요",
    "choiceFeedback": [
      "“원문은 이 조건이 모든 상황에서 반대로 적용된다고 설명한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “만약, 레플리케이션 구성으로 이루어져 있으면 잠금이 유실될 가능성이 존재합니다.”입니다.",
      "“원문은 이 결과가 아무 조건 없이 항상 발생한다고 설명한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “만약, 레플리케이션 구성으로 이루어져 있으면 잠금이 유실될 가능성이 존재합니다.”입니다.",
      "원문의 근거는 만약, 레플리케이션 구성으로 이루어져 있으면 잠금이 유실될 가능성이 존재합니다.라는 판단을 뒷받침합니다.",
      "“원문은 이 판단에 원문 밖의 정보가 반드시 필요하다고 설명한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “만약, 레플리케이션 구성으로 이루어져 있으면 잠금이 유실될 가능성이 존재합니다.”입니다."
    ],
    "keyPoints": [
      "잠금이 유실될 가능성이 있지 않나요?",
      "분산",
      "환경에서",
      "Redis를"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-95-follow-up-2",
    "kind": "follow-up",
    "followUpOf": "quiz-be-95-main",
    "followUpOrder": 2,
    "followUpRole": "core",
    "question": "분산 환경에서 Redis를 활용한 잠금은 어떻게 구현할 수 있나요 원문의 “본문” 구역과 일치하는 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "SET 작업을 성공적으로 수행한 서버는 잠금을 획득합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 1,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "distributed-cache",
    "sourceId": "be-95",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "SET 작업을 성공적으로 수행한 서버는 잠금을 획득합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “SET 작업을 성공적으로 수행한 서버는 잠금을 획득합니다.”입니다.",
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “SET 작업을 성공적으로 수행한 서버는 잠금을 획득합니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “SET 작업을 성공적으로 수행한 서버는 잠금을 획득합니다.”입니다."
    ],
    "keyPoints": [
      "본문",
      "분산",
      "환경에서",
      "Redis를"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-95-follow-up-3",
    "kind": "follow-up",
    "followUpOf": "quiz-be-95-main",
    "followUpOrder": 3,
    "followUpRole": "remediation",
    "question": "분산 환경에서 Redis를 활용한 잠금은 어떻게 구현할 수 있나요의 핵심 근거를 다시 확인할 때 옳은 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "잠금을 획득한 서버는 작업이 끝난 이후, Key에 해당하는 값을 제거하여 잠금을 해제합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 2,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "distributed-cache",
    "sourceId": "be-95",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "잠금을 획득한 서버는 작업이 끝난 이후, Key에 해당하는 값을 제거하여 잠금을 해제합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “잠금을 획득한 서버는 작업이 끝난 이후, Key에 해당하는 값을 제거하여 잠금을 해제합니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “잠금을 획득한 서버는 작업이 끝난 이후, Key에 해당하는 값을 제거하여 잠금을 해제합니다.”입니다.",
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “잠금을 획득한 서버는 작업이 끝난 이후, Key에 해당하는 값을 제거하여 잠금을 해제합니다.”입니다."
    ],
    "keyPoints": [
      "본문",
      "분산",
      "환경에서",
      "Redis를"
    ]
  },
  {
    "version": 2,
    "categoryId": "distributed-cache",
    "sourceId": "be-96",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "evidenceQuote": "**무중단 배포(Zero-Downtime Deployment)** 는 서비스에 다운 타임이 발생하지 않으면서, 새로운 버전의 애플리케이션을 서버에 배포하는 것을 의미합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-96-main",
    "kind": "main",
    "followUpOf": null,
    "question": "무중단 배포란 무엇인가요?",
    "choices": [
      "모든 서버를 동시에 종료하는 것",
      "테스트 없이 즉시 배포하는 것",
      "데이터베이스를 사용하지 않는 배포",
      "서비스 다운 타임 없이 새 버전의 애플리케이션을 서버에 배포하는 것"
    ],
    "correctIndex": 3,
    "explanation": "원문은 서비스 다운 타임 없이 새 버전의 애플리케이션을 서버에 배포하는 것라고 설명합니다.",
    "followUpOrder": null,
    "followUpRole": null,
    "sourceAnchor": "content-answer",
    "choiceFeedback": [
      "“모든 서버를 동시에 종료하는 것”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “서비스 다운 타임 없이 새 버전의 애플리케이션을 서버에 배포하는 것”입니다.",
      "“테스트 없이 즉시 배포하는 것”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “서비스 다운 타임 없이 새 버전의 애플리케이션을 서버에 배포하는 것”입니다.",
      "“데이터베이스를 사용하지 않는 배포”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “서비스 다운 타임 없이 새 버전의 애플리케이션을 서버에 배포하는 것”입니다.",
      "원문은 서비스 다운 타임 없이 새 버전의 애플리케이션을 서버에 배포하는 것라고 설명합니다."
    ],
    "keyPoints": [
      "본문",
      "무중단",
      "배포가",
      "무엇인가요?"
    ]
  },
  {
    "version": 2,
    "categoryId": "distributed-cache",
    "sourceId": "be-96",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "각 배포 방식을 설명해 주시겠어요?",
    "evidenceQuote": "- **롤링 배포(Roling Deployment)** 는 서버를 한 대씩 순차적으로 업데이트하는 가장 기본적인 방식입니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-96-follow-up",
    "kind": "follow-up",
    "followUpOf": "quiz-be-96-main",
    "question": "be-96 원문에서 기본 개념 다음에 제시한 조건·영향 중 알맞은 것은 무엇인가요?",
    "choices": [
      "원문은 이 조건이 모든 상황에서 반대로 적용된다고 설명한다.",
      "원문은 이 결과가 아무 조건 없이 항상 발생한다고 설명한다.",
      "원문은 이 판단에 원문 밖의 정보가 반드시 필요하다고 설명한다.",
      "- **롤링 배포(Roling Deployment)** 는 서버를 한 대씩 순차적으로 업데이트하는 가장 기본적인 방식입니다."
    ],
    "correctIndex": 3,
    "explanation": "원문의 근거는 - **롤링 배포(Roling Deployment)** 는 서버를 한 대씩 순차적으로 업데이트하는 가장 기본적인 방식입니다.라는 판단을 뒷받침합니다.",
    "followUpOrder": 1,
    "followUpRole": "core",
    "sourceAnchor": "각-배포-방식을-설명해-주시겠어요",
    "choiceFeedback": [
      "“원문은 이 조건이 모든 상황에서 반대로 적용된다고 설명한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “- **롤링 배포(Roling Deployment)** 는 서버를 한 대씩 순차적으로 업데이트하는 가장 기본적인 방식입니다.”입니다.",
      "“원문은 이 결과가 아무 조건 없이 항상 발생한다고 설명한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “- **롤링 배포(Roling Deployment)** 는 서버를 한 대씩 순차적으로 업데이트하는 가장 기본적인 방식입니다.”입니다.",
      "“원문은 이 판단에 원문 밖의 정보가 반드시 필요하다고 설명한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “- **롤링 배포(Roling Deployment)** 는 서버를 한 대씩 순차적으로 업데이트하는 가장 기본적인 방식입니다.”입니다.",
      "원문의 근거는 - **롤링 배포(Roling Deployment)** 는 서버를 한 대씩 순차적으로 업데이트하는 가장 기본적인 방식입니다.라는 판단을 뒷받침합니다."
    ],
    "keyPoints": [
      "각 배포 방식을 설명해 주시겠어요?",
      "무중단",
      "배포가",
      "무엇인가요?"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-96-follow-up-2",
    "kind": "follow-up",
    "followUpOf": "quiz-be-96-main",
    "followUpOrder": 2,
    "followUpRole": "core",
    "question": "무중단 배포가 무엇인가요 원문의 “본문” 구역과 일치하는 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "무중단 배포 패턴에는 대표적으로 순차적으로 배포하는 롤링 배포, 전체 서버를 통째로 바꾸는 블루/그린 배포, 트래픽을 순차적으로 이동시키는 카나리 배포가 존재합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 2,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "distributed-cache",
    "sourceId": "be-96",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "무중단 배포 패턴에는 대표적으로 순차적으로 배포하는 롤링 배포, 전체 서버를 통째로 바꾸는 블루/그린 배포, 트래픽을 순차적으로 이동시키는 카나리 배포가 존재합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “무중단 배포 패턴에는 대표적으로 순차적으로 배포하는 롤링 배포, 전체 서버를 통째로 바꾸는 블루/그린 배포, 트래픽을 순차적으로 이동시키는 카나리 배포가 존재합니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “무중단 배포 패턴에는 대표적으로 순차적으로 배포하는 롤링 배포, 전체 서버를 통째로 바꾸는 블루/그린 배포, 트래픽을 순차적으로 이동시키는 카나리 배포가 존재합니다.”입니다.",
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “무중단 배포 패턴에는 대표적으로 순차적으로 배포하는 롤링 배포, 전체 서버를 통째로 바꾸는 블루/그린 배포, 트래픽을 순차적으로 이동시키는 카나리 배포가 존재합니다.”입니다."
    ],
    "keyPoints": [
      "본문",
      "무중단",
      "배포가",
      "무엇인가요?"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-96-follow-up-3",
    "kind": "follow-up",
    "followUpOf": "quiz-be-96-main",
    "followUpOrder": 3,
    "followUpRole": "remediation",
    "question": "무중단 배포가 무엇인가요의 핵심 근거를 다시 확인할 때 옳은 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.",
      "특정 시점에는 두 가지 버전이 공존하기 때문에 새로운 버전은 기존 버전 기능을 지원하는 등 **하위 호환성(Backward Compatibility)** 에 신경을 써야 합니다."
    ],
    "correctIndex": 3,
    "explanation": "원문의 “각 배포 방식을 설명해 주시겠어요?” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "distributed-cache",
    "sourceId": "be-96",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "각 배포 방식을 설명해 주시겠어요?",
    "sourceAnchor": "각-배포-방식을-설명해-주시겠어요",
    "evidenceQuote": "특정 시점에는 두 가지 버전이 공존하기 때문에 새로운 버전은 기존 버전 기능을 지원하는 등 **하위 호환성(Backward Compatibility)** 에 신경을 써야 합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “특정 시점에는 두 가지 버전이 공존하기 때문에 새로운 버전은 기존 버전 기능을 지원하는 등 **하위 호환성(Backward Compatibility)** 에 신경을 써야 합니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “특정 시점에는 두 가지 버전이 공존하기 때문에 새로운 버전은 기존 버전 기능을 지원하는 등 **하위 호환성(Backward Compatibility)** 에 신경을 써야 합니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “특정 시점에는 두 가지 버전이 공존하기 때문에 새로운 버전은 기존 버전 기능을 지원하는 등 **하위 호환성(Backward Compatibility)** 에 신경을 써야 합니다.”입니다.",
      "원문의 “각 배포 방식을 설명해 주시겠어요?” 구역이 정답 선택지의 내용을 직접 설명합니다."
    ],
    "keyPoints": [
      "각 배포 방식을 설명해 주시겠어요?",
      "무중단",
      "배포가",
      "무엇인가요?"
    ]
  },
  {
    "version": 2,
    "categoryId": "distributed-cache",
    "sourceId": "be-109",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "evidenceQuote": "**코드형 인프라(Infrastructure as Code, IaC)** 는 수동 프로세스 대신 코드를 통해 인프라를 프로비저닝하고 관리하는 방법입니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-109-main",
    "kind": "main",
    "followUpOf": null,
    "question": "IaC는 인프라를 어떻게 관리하는 방법인가요?",
    "choices": [
      "운영 문서만으로 관리하는 방법",
      "인프라 변경을 금지하는 방법",
      "수동 프로세스 대신 코드를 통해 프로비저닝하고 관리하는 방법",
      "하드웨어만 교체하는 방법"
    ],
    "correctIndex": 2,
    "explanation": "원문은 수동 프로세스 대신 코드를 통해 프로비저닝하고 관리하는 방법라고 설명합니다.",
    "followUpOrder": null,
    "followUpRole": null,
    "sourceAnchor": "content-answer",
    "choiceFeedback": [
      "“운영 문서만으로 관리하는 방법”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “수동 프로세스 대신 코드를 통해 프로비저닝하고 관리하는 방법”입니다.",
      "“인프라 변경을 금지하는 방법”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “수동 프로세스 대신 코드를 통해 프로비저닝하고 관리하는 방법”입니다.",
      "원문은 수동 프로세스 대신 코드를 통해 프로비저닝하고 관리하는 방법라고 설명합니다.",
      "“하드웨어만 교체하는 방법”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “수동 프로세스 대신 코드를 통해 프로비저닝하고 관리하는 방법”입니다."
    ],
    "keyPoints": [
      "본문",
      "Infrastructure",
      "as",
      "Code"
    ]
  },
  {
    "version": 2,
    "categoryId": "distributed-cache",
    "sourceId": "be-109",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "evidenceQuote": "IaC는 크게 선언적(Declarative)방식과 명령형(Imperative)방식으로 나뉩니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-109-follow-up",
    "kind": "follow-up",
    "followUpOf": "quiz-be-109-main",
    "question": "be-109 원문에서 기본 개념 다음에 제시한 조건·영향 중 알맞은 것은 무엇인가요?",
    "choices": [
      "원문은 이 조건이 모든 상황에서 반대로 적용된다고 설명한다.",
      "원문은 이 결과가 아무 조건 없이 항상 발생한다고 설명한다.",
      "IaC는 크게 선언적(Declarative)방식과 명령형(Imperative)방식으로 나뉩니다.",
      "원문은 이 판단에 원문 밖의 정보가 반드시 필요하다고 설명한다."
    ],
    "correctIndex": 2,
    "explanation": "원문의 근거는 IaC는 크게 선언적(Declarative)방식과 명령형(Imperative)방식으로 나뉩니다.라는 판단을 뒷받침합니다.",
    "followUpOrder": 1,
    "followUpRole": "core",
    "sourceAnchor": "content-answer",
    "choiceFeedback": [
      "“원문은 이 조건이 모든 상황에서 반대로 적용된다고 설명한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “IaC는 크게 선언적(Declarative)방식과 명령형(Imperative)방식으로 나뉩니다.”입니다.",
      "“원문은 이 결과가 아무 조건 없이 항상 발생한다고 설명한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “IaC는 크게 선언적(Declarative)방식과 명령형(Imperative)방식으로 나뉩니다.”입니다.",
      "원문의 근거는 IaC는 크게 선언적(Declarative)방식과 명령형(Imperative)방식으로 나뉩니다.라는 판단을 뒷받침합니다.",
      "“원문은 이 판단에 원문 밖의 정보가 반드시 필요하다고 설명한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “IaC는 크게 선언적(Declarative)방식과 명령형(Imperative)방식으로 나뉩니다.”입니다."
    ],
    "keyPoints": [
      "본문",
      "Infrastructure",
      "as",
      "Code"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-109-follow-up-2",
    "kind": "follow-up",
    "followUpOf": "quiz-be-109-main",
    "followUpOrder": 2,
    "followUpRole": "core",
    "question": "Infrastructure as Code(IaC) 원문의 “본문” 구역과 일치하는 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "기존의 수동 설정 방식은 반복 작업이 많고 휴먼 에러가 발생하기 쉬우며, 인프라 설정을 별도로 문서화해 관리해야 하는 번거로움이 있습니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 1,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "distributed-cache",
    "sourceId": "be-109",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "기존의 수동 설정 방식은 반복 작업이 많고 휴먼 에러가 발생하기 쉬우며, 인프라 설정을 별도로 문서화해 관리해야 하는 번거로움이 있습니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “기존의 수동 설정 방식은 반복 작업이 많고 휴먼 에러가 발생하기 쉬우며, 인프라 설정을 별도로 문서화해 관리해야 하는 번거로움이 있습니다.”입니다.",
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “기존의 수동 설정 방식은 반복 작업이 많고 휴먼 에러가 발생하기 쉬우며, 인프라 설정을 별도로 문서화해 관리해야 하는 번거로움이 있습니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “기존의 수동 설정 방식은 반복 작업이 많고 휴먼 에러가 발생하기 쉬우며, 인프라 설정을 별도로 문서화해 관리해야 하는 번거로움이 있습니다.”입니다."
    ],
    "keyPoints": [
      "본문",
      "Infrastructure",
      "as",
      "Code"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-109-follow-up-3",
    "kind": "follow-up",
    "followUpOf": "quiz-be-109-main",
    "followUpOrder": 3,
    "followUpRole": "remediation",
    "question": "Infrastructure as Code(IaC)의 핵심 근거를 다시 확인할 때 옳은 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "IaC는 이러한 문제를 해결하기 위해 등장했으며, 인프라를 코드로 관리함으로써 일관성을 보장하고 운영 효율성을 높일 수 있습니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 2,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "distributed-cache",
    "sourceId": "be-109",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "IaC는 이러한 문제를 해결하기 위해 등장했으며, 인프라를 코드로 관리함으로써 일관성을 보장하고 운영 효율성을 높일 수 있습니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “IaC는 이러한 문제를 해결하기 위해 등장했으며, 인프라를 코드로 관리함으로써 일관성을 보장하고 운영 효율성을 높일 수 있습니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “IaC는 이러한 문제를 해결하기 위해 등장했으며, 인프라를 코드로 관리함으로써 일관성을 보장하고 운영 효율성을 높일 수 있습니다.”입니다.",
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “IaC는 이러한 문제를 해결하기 위해 등장했으며, 인프라를 코드로 관리함으로써 일관성을 보장하고 운영 효율성을 높일 수 있습니다.”입니다."
    ],
    "keyPoints": [
      "본문",
      "Infrastructure",
      "as",
      "Code"
    ]
  },
  {
    "version": 2,
    "categoryId": "distributed-cache",
    "sourceId": "be-130",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "evidenceQuote": "**서버리스(Serverless)** 란 클라우드 업체에서 직접 인프라를 관리하고 동적으로 크기를 조정하면서 유지 관리하는 방식을 의미합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-130-main",
    "kind": "main",
    "followUpOf": null,
    "question": "원문에서 말한 서버리스의 특징은 무엇인가요?",
    "choices": [
      "클라우드 업체가 인프라를 관리하고 동적으로 크기를 조정하며 유지 관리한다",
      "개발자가 모든 OS와 보안을 직접 관리한다",
      "서버가 전혀 존재하지 않는다",
      "확장이 불가능하다"
    ],
    "correctIndex": 0,
    "explanation": "원문은 클라우드 업체가 인프라를 관리하고 동적으로 크기를 조정하며 유지 관리한다라고 설명합니다.",
    "followUpOrder": null,
    "followUpRole": null,
    "sourceAnchor": "content-answer",
    "choiceFeedback": [
      "원문은 클라우드 업체가 인프라를 관리하고 동적으로 크기를 조정하며 유지 관리한다라고 설명합니다.",
      "“개발자가 모든 OS와 보안을 직접 관리한다”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “클라우드 업체가 인프라를 관리하고 동적으로 크기를 조정하며 유지 관리한다”입니다.",
      "“서버가 전혀 존재하지 않는다”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “클라우드 업체가 인프라를 관리하고 동적으로 크기를 조정하며 유지 관리한다”입니다.",
      "“확장이 불가능하다”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “클라우드 업체가 인프라를 관리하고 동적으로 크기를 조정하며 유지 관리한다”입니다."
    ],
    "keyPoints": [
      "본문",
      "서버리스란",
      "무엇인가요?",
      "분산 시스템, 캐시와 운영 인프라"
    ]
  },
  {
    "version": 2,
    "categoryId": "distributed-cache",
    "sourceId": "be-130",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "서버리스 아키텍처에서 백엔드 코드는 어떻게 개발하나요?",
    "evidenceQuote": "서버리스 아키텍처에서 백엔드 코드는 **FaaS(Function as a service)** 를 활용하여 개발할 수 있습니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-130-follow-up",
    "kind": "follow-up",
    "followUpOf": "quiz-be-130-main",
    "question": "be-130 원문에서 기본 개념 다음에 제시한 조건·영향 중 알맞은 것은 무엇인가요?",
    "choices": [
      "서버리스 아키텍처에서 백엔드 코드는 **FaaS(Function as a service)** 를 활용하여 개발할 수 있습니다.",
      "원문은 이 조건이 모든 상황에서 반대로 적용된다고 설명한다.",
      "원문은 이 결과가 아무 조건 없이 항상 발생한다고 설명한다.",
      "원문은 이 판단에 원문 밖의 정보가 반드시 필요하다고 설명한다."
    ],
    "correctIndex": 0,
    "explanation": "원문의 근거는 서버리스 아키텍처에서 백엔드 코드는 **FaaS(Function as a service)** 를 활용하여 개발할 수 있습니다.라는 판단을 뒷받침합니다.",
    "followUpOrder": 1,
    "followUpRole": "core",
    "sourceAnchor": "서버리스-아키텍처에서-백엔드-코드는-어떻게-개발하나요",
    "choiceFeedback": [
      "원문의 근거는 서버리스 아키텍처에서 백엔드 코드는 **FaaS(Function as a service)** 를 활용하여 개발할 수 있습니다.라는 판단을 뒷받침합니다.",
      "“원문은 이 조건이 모든 상황에서 반대로 적용된다고 설명한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “서버리스 아키텍처에서 백엔드 코드는 **FaaS(Function as a service)** 를 활용하여 개발할 수 있습니다.”입니다.",
      "“원문은 이 결과가 아무 조건 없이 항상 발생한다고 설명한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “서버리스 아키텍처에서 백엔드 코드는 **FaaS(Function as a service)** 를 활용하여 개발할 수 있습니다.”입니다.",
      "“원문은 이 판단에 원문 밖의 정보가 반드시 필요하다고 설명한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “서버리스 아키텍처에서 백엔드 코드는 **FaaS(Function as a service)** 를 활용하여 개발할 수 있습니다.”입니다."
    ],
    "keyPoints": [
      "서버리스 아키텍처에서 백엔드 코드는 어떻게 개발하나요?",
      "서버리스란",
      "무엇인가요?",
      "분산 시스템, 캐시와 운영 인프라"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-130-follow-up-2",
    "kind": "follow-up",
    "followUpOf": "quiz-be-130-main",
    "followUpOrder": 2,
    "followUpRole": "core",
    "question": "서버리스란 무엇인가요 원문의 “본문” 구역과 일치하는 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.",
      "만약, AWS EC2를 사용해도 OS 관리 및 보안, 파일 시스템 관리는 직접 해야 했는데요."
    ],
    "correctIndex": 3,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "distributed-cache",
    "sourceId": "be-130",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "만약, AWS EC2를 사용해도 OS 관리 및 보안, 파일 시스템 관리는 직접 해야 했는데요.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “만약, AWS EC2를 사용해도 OS 관리 및 보안, 파일 시스템 관리는 직접 해야 했는데요.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “만약, AWS EC2를 사용해도 OS 관리 및 보안, 파일 시스템 관리는 직접 해야 했는데요.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “만약, AWS EC2를 사용해도 OS 관리 및 보안, 파일 시스템 관리는 직접 해야 했는데요.”입니다.",
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다."
    ],
    "keyPoints": [
      "본문",
      "서버리스란",
      "무엇인가요?",
      "분산 시스템, 캐시와 운영 인프라"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-130-follow-up-3",
    "kind": "follow-up",
    "followUpOf": "quiz-be-130-main",
    "followUpOrder": 3,
    "followUpRole": "remediation",
    "question": "서버리스란 무엇인가요의 핵심 근거를 다시 확인할 때 옳은 설명은 무엇인가요?",
    "choices": [
      "서버리스에서는 클라우드 업체가 이 모든 것을 직접 맡아서 관리합니다.",
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 0,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "distributed-cache",
    "sourceId": "be-130",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "서버리스에서는 클라우드 업체가 이 모든 것을 직접 맡아서 관리합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “서버리스에서는 클라우드 업체가 이 모든 것을 직접 맡아서 관리합니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “서버리스에서는 클라우드 업체가 이 모든 것을 직접 맡아서 관리합니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “서버리스에서는 클라우드 업체가 이 모든 것을 직접 맡아서 관리합니다.”입니다."
    ],
    "keyPoints": [
      "본문",
      "서버리스란",
      "무엇인가요?",
      "분산 시스템, 캐시와 운영 인프라"
    ]
  },
  {
    "version": 2,
    "categoryId": "distributed-cache",
    "sourceId": "be-141",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "evidenceQuote": "**최종적 일관성(Eventual Consistency)** 이란 분산 시스템에서 고가용성을 유지하기 위해서 사용하는 일관성 모델입니다. 데이터가 수정되면, 그 변경 내용은 비동기적으로 다른 노드에 전파되기 때문에 일시적으로 각 노드의 데이터가 다를 수 있습니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-141-main",
    "kind": "main",
    "followUpOf": null,
    "question": "최종적 일관성에서 데이터 수정 뒤 일시적으로 일어날 수 있는 일은 무엇인가요?",
    "choices": [
      "모든 노드가 즉시 같은 데이터를 가진다",
      "변경 내용이 영구히 사라진다",
      "각 노드의 데이터가 서로 다를 수 있다",
      "노드가 반드시 중지된다"
    ],
    "correctIndex": 2,
    "explanation": "원문은 각 노드의 데이터가 서로 다를 수 있다라고 설명합니다.",
    "followUpOrder": null,
    "followUpRole": null,
    "sourceAnchor": "content-answer",
    "choiceFeedback": [
      "“모든 노드가 즉시 같은 데이터를 가진다”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “각 노드의 데이터가 서로 다를 수 있다”입니다.",
      "“변경 내용이 영구히 사라진다”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “각 노드의 데이터가 서로 다를 수 있다”입니다.",
      "원문은 각 노드의 데이터가 서로 다를 수 있다라고 설명합니다.",
      "“노드가 반드시 중지된다”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “각 노드의 데이터가 서로 다를 수 있다”입니다."
    ],
    "keyPoints": [
      "본문",
      "최종적",
      "일관성이란",
      "무엇인가요?"
    ]
  },
  {
    "version": 2,
    "categoryId": "distributed-cache",
    "sourceId": "be-141",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "evidenceQuote": "만약, 사용자가 특정 노드에 데이터를 수정하면 다른 노드에 변경 사항이 복제되는 상황을 가정하겠습니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-141-follow-up",
    "kind": "follow-up",
    "followUpOf": "quiz-be-141-main",
    "question": "be-141 원문에서 기본 개념 다음에 제시한 조건·영향 중 알맞은 것은 무엇인가요?",
    "choices": [
      "원문은 이 조건이 모든 상황에서 반대로 적용된다고 설명한다.",
      "원문은 이 결과가 아무 조건 없이 항상 발생한다고 설명한다.",
      "만약, 사용자가 특정 노드에 데이터를 수정하면 다른 노드에 변경 사항이 복제되는 상황을 가정하겠습니다.",
      "원문은 이 판단에 원문 밖의 정보가 반드시 필요하다고 설명한다."
    ],
    "correctIndex": 2,
    "explanation": "원문의 근거는 만약, 사용자가 특정 노드에 데이터를 수정하면 다른 노드에 변경 사항이 복제되는 상황을 가정하겠습니다.라는 판단을 뒷받침합니다.",
    "followUpOrder": 1,
    "followUpRole": "core",
    "sourceAnchor": "content-answer",
    "choiceFeedback": [
      "“원문은 이 조건이 모든 상황에서 반대로 적용된다고 설명한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “만약, 사용자가 특정 노드에 데이터를 수정하면 다른 노드에 변경 사항이 복제되는 상황을 가정하겠습니다.”입니다.",
      "“원문은 이 결과가 아무 조건 없이 항상 발생한다고 설명한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “만약, 사용자가 특정 노드에 데이터를 수정하면 다른 노드에 변경 사항이 복제되는 상황을 가정하겠습니다.”입니다.",
      "원문의 근거는 만약, 사용자가 특정 노드에 데이터를 수정하면 다른 노드에 변경 사항이 복제되는 상황을 가정하겠습니다.라는 판단을 뒷받침합니다.",
      "“원문은 이 판단에 원문 밖의 정보가 반드시 필요하다고 설명한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “만약, 사용자가 특정 노드에 데이터를 수정하면 다른 노드에 변경 사항이 복제되는 상황을 가정하겠습니다.”입니다."
    ],
    "keyPoints": [
      "본문",
      "최종적",
      "일관성이란",
      "무엇인가요?"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-141-follow-up-2",
    "kind": "follow-up",
    "followUpOf": "quiz-be-141-main",
    "followUpOrder": 2,
    "followUpRole": "core",
    "question": "최종적 일관성이란 무엇인가요 원문의 “본문” 구역과 일치하는 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "하지만 시간이 지나면 모든 노드에 변경 사항이 전달되어 결국에는 모든 노드가 동일한 데이터를 가지게 되는 것을 의미합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 1,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "distributed-cache",
    "sourceId": "be-141",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "하지만 시간이 지나면 모든 노드에 변경 사항이 전달되어 결국에는 모든 노드가 동일한 데이터를 가지게 되는 것을 의미합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “하지만 시간이 지나면 모든 노드에 변경 사항이 전달되어 결국에는 모든 노드가 동일한 데이터를 가지게 되는 것을 의미합니다.”입니다.",
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “하지만 시간이 지나면 모든 노드에 변경 사항이 전달되어 결국에는 모든 노드가 동일한 데이터를 가지게 되는 것을 의미합니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “하지만 시간이 지나면 모든 노드에 변경 사항이 전달되어 결국에는 모든 노드가 동일한 데이터를 가지게 되는 것을 의미합니다.”입니다."
    ],
    "keyPoints": [
      "본문",
      "최종적",
      "일관성이란",
      "무엇인가요?"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-141-follow-up-3",
    "kind": "follow-up",
    "followUpOf": "quiz-be-141-main",
    "followUpOrder": 3,
    "followUpRole": "remediation",
    "question": "최종적 일관성이란 무엇인가요의 핵심 근거를 다시 확인할 때 옳은 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "<figcaption>이미지 출처 : <a href = \"https://cloud.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 2,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "distributed-cache",
    "sourceId": "be-141",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "<figcaption>이미지 출처 : <a href = \"https://cloud.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “<figcaption>이미지 출처 : <a href = \"https://cloud.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “<figcaption>이미지 출처 : <a href = \"https://cloud.”입니다.",
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “<figcaption>이미지 출처 : <a href = \"https://cloud.”입니다."
    ],
    "keyPoints": [
      "본문",
      "최종적",
      "일관성이란",
      "무엇인가요?"
    ]
  },
  {
    "version": 2,
    "categoryId": "distributed-cache",
    "sourceId": "be-144",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "evidenceQuote": "**이벤트 소싱(Event Sourcing)** 은 데이터의 최종 상태를 저장하는 대신, 상태를 변경시킨 이벤트들의 이력을 저장하는 방식을 의미합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-144-main",
    "kind": "main",
    "followUpOf": null,
    "question": "이벤트 소싱은 무엇을 저장하는 방식인가요?",
    "choices": [
      "최종 상태만 저장하는 방식",
      "최종 상태 대신 상태를 변경시킨 이벤트들의 이력을 저장하는 방식",
      "캐시 키만 저장하는 방식",
      "실행 중인 스레드만 저장하는 방식"
    ],
    "correctIndex": 1,
    "explanation": "원문은 최종 상태 대신 상태를 변경시킨 이벤트들의 이력을 저장하는 방식라고 설명합니다.",
    "followUpOrder": null,
    "followUpRole": null,
    "sourceAnchor": "content-answer",
    "choiceFeedback": [
      "“최종 상태만 저장하는 방식”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “최종 상태 대신 상태를 변경시킨 이벤트들의 이력을 저장하는 방식”입니다.",
      "원문은 최종 상태 대신 상태를 변경시킨 이벤트들의 이력을 저장하는 방식라고 설명합니다.",
      "“캐시 키만 저장하는 방식”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “최종 상태 대신 상태를 변경시킨 이벤트들의 이력을 저장하는 방식”입니다.",
      "“실행 중인 스레드만 저장하는 방식”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “최종 상태 대신 상태를 변경시킨 이벤트들의 이력을 저장하는 방식”입니다."
    ],
    "keyPoints": [
      "본문",
      "이벤트",
      "소싱이란",
      "무엇인가요?"
    ]
  },
  {
    "version": 2,
    "categoryId": "distributed-cache",
    "sourceId": "be-144",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "evidenceQuote": "- 첫 번째 방법은 체스판의 상태를 그대로 옮겨서 저장하는 방식입니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-144-follow-up",
    "kind": "follow-up",
    "followUpOf": "quiz-be-144-main",
    "question": "be-144 원문에서 기본 개념 다음에 제시한 조건·영향 중 알맞은 것은 무엇인가요?",
    "choices": [
      "원문은 이 조건이 모든 상황에서 반대로 적용된다고 설명한다.",
      "- 첫 번째 방법은 체스판의 상태를 그대로 옮겨서 저장하는 방식입니다.",
      "원문은 이 결과가 아무 조건 없이 항상 발생한다고 설명한다.",
      "원문은 이 판단에 원문 밖의 정보가 반드시 필요하다고 설명한다."
    ],
    "correctIndex": 1,
    "explanation": "원문의 근거는 - 첫 번째 방법은 체스판의 상태를 그대로 옮겨서 저장하는 방식입니다.라는 판단을 뒷받침합니다.",
    "followUpOrder": 1,
    "followUpRole": "core",
    "sourceAnchor": "content-answer",
    "choiceFeedback": [
      "“원문은 이 조건이 모든 상황에서 반대로 적용된다고 설명한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “- 첫 번째 방법은 체스판의 상태를 그대로 옮겨서 저장하는 방식입니다.”입니다.",
      "원문의 근거는 - 첫 번째 방법은 체스판의 상태를 그대로 옮겨서 저장하는 방식입니다.라는 판단을 뒷받침합니다.",
      "“원문은 이 결과가 아무 조건 없이 항상 발생한다고 설명한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “- 첫 번째 방법은 체스판의 상태를 그대로 옮겨서 저장하는 방식입니다.”입니다.",
      "“원문은 이 판단에 원문 밖의 정보가 반드시 필요하다고 설명한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “- 첫 번째 방법은 체스판의 상태를 그대로 옮겨서 저장하는 방식입니다.”입니다."
    ],
    "keyPoints": [
      "본문",
      "이벤트",
      "소싱이란",
      "무엇인가요?"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-144-follow-up-2",
    "kind": "follow-up",
    "followUpOf": "quiz-be-144-main",
    "followUpOrder": 2,
    "followUpRole": "core",
    "question": "이벤트 소싱이란 무엇인가요 원문의 “본문” 구역과 일치하는 설명은 무엇인가요?",
    "choices": [
      "예를 들어, 체스 프로그램을 개발할 때 체스판의 상태를 데이터베이스에 저장하는 방법은 크게 두 가지가 있습니다.",
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 0,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "distributed-cache",
    "sourceId": "be-144",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "예를 들어, 체스 프로그램을 개발할 때 체스판의 상태를 데이터베이스에 저장하는 방법은 크게 두 가지가 있습니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “예를 들어, 체스 프로그램을 개발할 때 체스판의 상태를 데이터베이스에 저장하는 방법은 크게 두 가지가 있습니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “예를 들어, 체스 프로그램을 개발할 때 체스판의 상태를 데이터베이스에 저장하는 방법은 크게 두 가지가 있습니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “예를 들어, 체스 프로그램을 개발할 때 체스판의 상태를 데이터베이스에 저장하는 방법은 크게 두 가지가 있습니다.”입니다."
    ],
    "keyPoints": [
      "본문",
      "이벤트",
      "소싱이란",
      "무엇인가요?"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-144-follow-up-3",
    "kind": "follow-up",
    "followUpOf": "quiz-be-144-main",
    "followUpOrder": 3,
    "followUpRole": "remediation",
    "question": "이벤트 소싱이란 무엇인가요의 핵심 근거를 다시 확인할 때 옳은 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "1a 컬럼에 검은색 폰을 나타내는 bp라는 값을 설정할 수 있습니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 1,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "distributed-cache",
    "sourceId": "be-144",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "1a 컬럼에 검은색 폰을 나타내는 bp라는 값을 설정할 수 있습니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “1a 컬럼에 검은색 폰을 나타내는 bp라는 값을 설정할 수 있습니다.”입니다.",
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “1a 컬럼에 검은색 폰을 나타내는 bp라는 값을 설정할 수 있습니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “1a 컬럼에 검은색 폰을 나타내는 bp라는 값을 설정할 수 있습니다.”입니다."
    ],
    "keyPoints": [
      "본문",
      "이벤트",
      "소싱이란",
      "무엇인가요?"
    ]
  },
  {
    "version": 2,
    "categoryId": "distributed-cache",
    "sourceId": "be-152",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "evidenceQuote": "**헬스체크(Health Check)** 는 현재 서버의 상태가 정상인지 파악하는 것을 의미합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-152-main",
    "kind": "main",
    "followUpOf": null,
    "question": "헬스체크의 목적은 무엇인가요?",
    "choices": [
      "현재 서버 상태가 정상인지 파악하는 것",
      "서버의 모든 데이터를 삭제하는 것",
      "모든 요청을 차단하는 것",
      "코드를 자동으로 배포하는 것"
    ],
    "correctIndex": 0,
    "explanation": "원문은 현재 서버 상태가 정상인지 파악하는 것라고 설명합니다.",
    "followUpOrder": null,
    "followUpRole": null,
    "sourceAnchor": "content-answer",
    "choiceFeedback": [
      "원문은 현재 서버 상태가 정상인지 파악하는 것라고 설명합니다.",
      "“서버의 모든 데이터를 삭제하는 것”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “현재 서버 상태가 정상인지 파악하는 것”입니다.",
      "“모든 요청을 차단하는 것”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “현재 서버 상태가 정상인지 파악하는 것”입니다.",
      "“코드를 자동으로 배포하는 것”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “현재 서버 상태가 정상인지 파악하는 것”입니다."
    ],
    "keyPoints": [
      "본문",
      "헬스체크에",
      "대해서",
      "분산 시스템, 캐시와 운영 인프라"
    ]
  },
  {
    "version": 2,
    "categoryId": "distributed-cache",
    "sourceId": "be-152",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "헬스체크의 필요성은 무엇인가요?",
    "evidenceQuote": "서버가 헬스체크 기능을 제공하면 최신 코드를 배포할 때 신규 배포가 정상적으로 이뤄졌는지 확인할 수 있으며, 장애를 감지하여 대응할 수 있다는 이점이 있습니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-152-follow-up",
    "kind": "follow-up",
    "followUpOf": "quiz-be-152-main",
    "question": "be-152 원문에서 기본 개념 다음에 제시한 조건·영향 중 알맞은 것은 무엇인가요?",
    "choices": [
      "서버가 헬스체크 기능을 제공하면 최신 코드를 배포할 때 신규 배포가 정상적으로 이뤄졌는지 확인할 수 있으며, 장애를 감지하여 대응할 수 있다는 이점이 있습니다.",
      "원문은 이 조건이 모든 상황에서 반대로 적용된다고 설명한다.",
      "원문은 이 결과가 아무 조건 없이 항상 발생한다고 설명한다.",
      "원문은 이 판단에 원문 밖의 정보가 반드시 필요하다고 설명한다."
    ],
    "correctIndex": 0,
    "explanation": "원문의 근거는 서버가 헬스체크 기능을 제공하면 최신 코드를 배포할 때 신규 배포가 정상적으로 이뤄졌는지 확인할 수 있으며, 장애를 감지하여 대응할 수 있다는 이점이 있습니다.라는 판단을 뒷받침합니다.",
    "followUpOrder": 1,
    "followUpRole": "core",
    "sourceAnchor": "헬스체크의-필요성은-무엇인가요",
    "choiceFeedback": [
      "원문의 근거는 서버가 헬스체크 기능을 제공하면 최신 코드를 배포할 때 신규 배포가 정상적으로 이뤄졌는지 확인할 수 있으며, 장애를 감지하여 대응할 수 있다는 이점이 있습니다.라는 판단을 뒷받침합니다.",
      "“원문은 이 조건이 모든 상황에서 반대로 적용된다고 설명한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “서버가 헬스체크 기능을 제공하면 최신 코드를 배포할 때 신규 배포가 정상적으로 이뤄졌는지 확인할 수 있으며, 장애를 감지하여 대응할 수 있다는 이점이 있습니다.”입니다.",
      "“원문은 이 결과가 아무 조건 없이 항상 발생한다고 설명한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “서버가 헬스체크 기능을 제공하면 최신 코드를 배포할 때 신규 배포가 정상적으로 이뤄졌는지 확인할 수 있으며, 장애를 감지하여 대응할 수 있다는 이점이 있습니다.”입니다.",
      "“원문은 이 판단에 원문 밖의 정보가 반드시 필요하다고 설명한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “서버가 헬스체크 기능을 제공하면 최신 코드를 배포할 때 신규 배포가 정상적으로 이뤄졌는지 확인할 수 있으며, 장애를 감지하여 대응할 수 있다는 이점이 있습니다.”입니다."
    ],
    "keyPoints": [
      "헬스체크의 필요성은 무엇인가요?",
      "헬스체크에",
      "대해서",
      "분산 시스템, 캐시와 운영 인프라"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-152-follow-up-2",
    "kind": "follow-up",
    "followUpOf": "quiz-be-152-main",
    "followUpOrder": 2,
    "followUpRole": "core",
    "question": "헬스체크 원문의 “본문” 구역과 일치하는 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.",
      "API 엔드포인트를 호출하거나 특정 포트로 TCP 연결을 시도하는 방식을 사용할 수 있으며, 스프링 액추에이터(Spring Actuator)를 활용하여 헬스체크 기능을 사용할 수 있습니다."
    ],
    "correctIndex": 3,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "distributed-cache",
    "sourceId": "be-152",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "API 엔드포인트를 호출하거나 특정 포트로 TCP 연결을 시도하는 방식을 사용할 수 있으며, 스프링 액추에이터(Spring Actuator)를 활용하여 헬스체크 기능을 사용할 수 있습니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “API 엔드포인트를 호출하거나 특정 포트로 TCP 연결을 시도하는 방식을 사용할 수 있으며, 스프링 액추에이터(Spring Actuator)를 활용하여 헬스체크 기능을 사용할 수 있습니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “API 엔드포인트를 호출하거나 특정 포트로 TCP 연결을 시도하는 방식을 사용할 수 있으며, 스프링 액추에이터(Spring Actuator)를 활용하여 헬스체크 기능을 사용할 수 있습니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “API 엔드포인트를 호출하거나 특정 포트로 TCP 연결을 시도하는 방식을 사용할 수 있으며, 스프링 액추에이터(Spring Actuator)를 활용하여 헬스체크 기능을 사용할 수 있습니다.”입니다.",
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다."
    ],
    "keyPoints": [
      "본문",
      "헬스체크에",
      "대해서",
      "분산 시스템, 캐시와 운영 인프라"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-152-follow-up-3",
    "kind": "follow-up",
    "followUpOf": "quiz-be-152-main",
    "followUpOrder": 3,
    "followUpRole": "remediation",
    "question": "헬스체크의 핵심 근거를 다시 확인할 때 옳은 설명은 무엇인가요?",
    "choices": [
      "장애 대응의 예시로, 로드 밸런서가 존재하고 트래픽 분산 대상 서버 2대(A, B)가 있을 때, A 서버의 헬스체크 결과가 비정상으로 판단되면 로드 밸런서는 A 서버를 트래픽 분산 대상에서 제외하고, 이후 B 서버로만 요청을 전달할 수 있습니다.",
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 0,
    "explanation": "원문의 “헬스체크의 필요성은 무엇인가요?” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "distributed-cache",
    "sourceId": "be-152",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "헬스체크의 필요성은 무엇인가요?",
    "sourceAnchor": "헬스체크의-필요성은-무엇인가요",
    "evidenceQuote": "장애 대응의 예시로, 로드 밸런서가 존재하고 트래픽 분산 대상 서버 2대(A, B)가 있을 때, A 서버의 헬스체크 결과가 비정상으로 판단되면 로드 밸런서는 A 서버를 트래픽 분산 대상에서 제외하고, 이후 B 서버로만 요청을 전달할 수 있습니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "원문의 “헬스체크의 필요성은 무엇인가요?” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “장애 대응의 예시로, 로드 밸런서가 존재하고 트래픽 분산 대상 서버 2대(A, B)가 있을 때, A 서버의 헬스체크 결과가 비정상으로 판단되면 로드 밸런서는 A 서버를 트래픽 분산 대상에서 제외하고, 이후 B 서버로만 요청을 전달할 수 있습니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “장애 대응의 예시로, 로드 밸런서가 존재하고 트래픽 분산 대상 서버 2대(A, B)가 있을 때, A 서버의 헬스체크 결과가 비정상으로 판단되면 로드 밸런서는 A 서버를 트래픽 분산 대상에서 제외하고, 이후 B 서버로만 요청을 전달할 수 있습니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “장애 대응의 예시로, 로드 밸런서가 존재하고 트래픽 분산 대상 서버 2대(A, B)가 있을 때, A 서버의 헬스체크 결과가 비정상으로 판단되면 로드 밸런서는 A 서버를 트래픽 분산 대상에서 제외하고, 이후 B 서버로만 요청을 전달할 수 있습니다.”입니다."
    ],
    "keyPoints": [
      "헬스체크의 필요성은 무엇인가요?",
      "헬스체크에",
      "대해서",
      "분산 시스템, 캐시와 운영 인프라"
    ]
  },
  {
    "version": 2,
    "categoryId": "os-concurrency",
    "sourceId": "be-32",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "evidenceQuote": "동기와 비동기는 호출하는 함수의 작업 완료를 기다리는지 여부의 차이가 있습니다. 함수 A가 동기로 함수 B를 호출하면 A는 B의 작업이 완료될 때까지 기다려야 합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-32-main",
    "kind": "main",
    "followUpOf": null,
    "question": "동기 호출에서 호출한 함수 A는 어떻게 동작하나요?",
    "choices": [
      "B의 완료와 무관하게 즉시 종료한다",
      "함수 B의 작업이 완료될 때까지 기다린다",
      "반드시 다른 CPU에서만 실행한다",
      "메모리를 해제하지 않는다"
    ],
    "correctIndex": 1,
    "explanation": "원문은 함수 B의 작업이 완료될 때까지 기다린다라고 설명합니다.",
    "followUpOrder": null,
    "followUpRole": null,
    "sourceAnchor": "content-answer",
    "choiceFeedback": [
      "“B의 완료와 무관하게 즉시 종료한다”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “함수 B의 작업이 완료될 때까지 기다린다”입니다.",
      "원문은 함수 B의 작업이 완료될 때까지 기다린다라고 설명합니다.",
      "“반드시 다른 CPU에서만 실행한다”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “함수 B의 작업이 완료될 때까지 기다린다”입니다.",
      "“메모리를 해제하지 않는다”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “함수 B의 작업이 완료될 때까지 기다린다”입니다."
    ],
    "keyPoints": [
      "본문",
      "동기와",
      "비동기의",
      "차이점은"
    ]
  },
  {
    "version": 2,
    "categoryId": "os-concurrency",
    "sourceId": "be-32",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "블로킹과 동기는 어떤 차이가 있나요?",
    "evidenceQuote": "두 개념은 유사하면서도 다른데요. 동기 호출에서는 호출된 함수가 작업을 완료할 때까지 호출한 함수가 기다립니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-32-follow-up",
    "kind": "follow-up",
    "followUpOf": "quiz-be-32-main",
    "question": "be-32 원문에서 기본 개념 다음에 제시한 조건·영향 중 알맞은 것은 무엇인가요?",
    "choices": [
      "원문은 이 조건이 모든 상황에서 반대로 적용된다고 설명한다.",
      "두 개념은 유사하면서도 다른데요. 동기 호출에서는 호출된 함수가 작업을 완료할 때까지 호출한 함수가 기다립니다.",
      "원문은 이 결과가 아무 조건 없이 항상 발생한다고 설명한다.",
      "원문은 이 판단에 원문 밖의 정보가 반드시 필요하다고 설명한다."
    ],
    "correctIndex": 1,
    "explanation": "원문의 근거는 두 개념은 유사하면서도 다른데요. 동기 호출에서는 호출된 함수가 작업을 완료할 때까지 호출한 함수가 기다립니다.라는 판단을 뒷받침합니다.",
    "followUpOrder": 1,
    "followUpRole": "core",
    "sourceAnchor": "블로킹과-동기는-어떤-차이가-있나요",
    "choiceFeedback": [
      "“원문은 이 조건이 모든 상황에서 반대로 적용된다고 설명한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “두 개념은 유사하면서도 다른데요. 동기 호출에서는 호출된 함수가 작업을 완료할 때까지 호출한 함수가 기다립니다.”입니다.",
      "원문의 근거는 두 개념은 유사하면서도 다른데요. 동기 호출에서는 호출된 함수가 작업을 완료할 때까지 호출한 함수가 기다립니다.라는 판단을 뒷받침합니다.",
      "“원문은 이 결과가 아무 조건 없이 항상 발생한다고 설명한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “두 개념은 유사하면서도 다른데요. 동기 호출에서는 호출된 함수가 작업을 완료할 때까지 호출한 함수가 기다립니다.”입니다.",
      "“원문은 이 판단에 원문 밖의 정보가 반드시 필요하다고 설명한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “두 개념은 유사하면서도 다른데요. 동기 호출에서는 호출된 함수가 작업을 완료할 때까지 호출한 함수가 기다립니다.”입니다."
    ],
    "keyPoints": [
      "블로킹과 동기는 어떤 차이가 있나요?",
      "동기와",
      "비동기의",
      "차이점은"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-32-follow-up-2",
    "kind": "follow-up",
    "followUpOf": "quiz-be-32-main",
    "followUpOrder": 2,
    "followUpRole": "core",
    "question": "동기와 비동기의 차이점은 무엇인가요 원문의 “본문” 구역과 일치하는 설명은 무엇인가요?",
    "choices": [
      "반면, 함수 A가 비동기로 함수 B를 호출하면 A는 B의 작업 완료를 신경 쓰지 않고 따로 동작합니다.",
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 0,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "os-concurrency",
    "sourceId": "be-32",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "반면, 함수 A가 비동기로 함수 B를 호출하면 A는 B의 작업 완료를 신경 쓰지 않고 따로 동작합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “반면, 함수 A가 비동기로 함수 B를 호출하면 A는 B의 작업 완료를 신경 쓰지 않고 따로 동작합니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “반면, 함수 A가 비동기로 함수 B를 호출하면 A는 B의 작업 완료를 신경 쓰지 않고 따로 동작합니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “반면, 함수 A가 비동기로 함수 B를 호출하면 A는 B의 작업 완료를 신경 쓰지 않고 따로 동작합니다.”입니다."
    ],
    "keyPoints": [
      "본문",
      "동기와",
      "비동기의",
      "차이점은"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-32-follow-up-3",
    "kind": "follow-up",
    "followUpOf": "quiz-be-32-main",
    "followUpOrder": 3,
    "followUpRole": "remediation",
    "question": "동기와 비동기의 차이점은 무엇인가요의 핵심 근거를 다시 확인할 때 옳은 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "반면, 블로킹은 함수가 호출된 후, 호출한 함수의 결과를 기다리기 위해 실행을 멈추는 상태를 의미합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 1,
    "explanation": "원문의 “블로킹과 동기는 어떤 차이가 있나요?” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "os-concurrency",
    "sourceId": "be-32",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "블로킹과 동기는 어떤 차이가 있나요?",
    "sourceAnchor": "블로킹과-동기는-어떤-차이가-있나요",
    "evidenceQuote": "반면, 블로킹은 함수가 호출된 후, 호출한 함수의 결과를 기다리기 위해 실행을 멈추는 상태를 의미합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “반면, 블로킹은 함수가 호출된 후, 호출한 함수의 결과를 기다리기 위해 실행을 멈추는 상태를 의미합니다.”입니다.",
      "원문의 “블로킹과 동기는 어떤 차이가 있나요?” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “반면, 블로킹은 함수가 호출된 후, 호출한 함수의 결과를 기다리기 위해 실행을 멈추는 상태를 의미합니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “반면, 블로킹은 함수가 호출된 후, 호출한 함수의 결과를 기다리기 위해 실행을 멈추는 상태를 의미합니다.”입니다."
    ],
    "keyPoints": [
      "블로킹과 동기는 어떤 차이가 있나요?",
      "동기와",
      "비동기의",
      "차이점은"
    ]
  },
  {
    "version": 2,
    "categoryId": "os-concurrency",
    "sourceId": "be-33",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "evidenceQuote": "DBMS에서 트랜잭션을 특별한 제어 없이 병행 수행을 허용한다면 데이터의 일관성과 무결성을 보장하기 어려울 수 있습니다. 이때, 병행 수행되는 트랜잭션들을 제어하기 위해서 락을 사용할 수 있으며 DBMS에서 락은 크게 공유 락과 배타 락으로 분류할 수 있습니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-33-main",
    "kind": "main",
    "followUpOf": null,
    "question": "DBMS에서 락을 사용하는 목적은 무엇인가요?",
    "choices": [
      "데이터베이스 연결을 늘리기 위해서",
      "테이블을 자동 삭제하기 위해서",
      "병행 수행되는 트랜잭션을 제어해 데이터의 일관성과 무결성을 보장하기 위해서",
      "CPU 코어를 늘리기 위해서"
    ],
    "correctIndex": 2,
    "explanation": "원문은 병행 수행되는 트랜잭션을 제어해 데이터의 일관성과 무결성을 보장하기 위해서라고 설명합니다.",
    "followUpOrder": null,
    "followUpRole": null,
    "sourceAnchor": "content-answer",
    "choiceFeedback": [
      "“데이터베이스 연결을 늘리기 위해서”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “병행 수행되는 트랜잭션을 제어해 데이터의 일관성과 무결성을 보장하기 위해서”입니다.",
      "“테이블을 자동 삭제하기 위해서”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “병행 수행되는 트랜잭션을 제어해 데이터의 일관성과 무결성을 보장하기 위해서”입니다.",
      "원문은 병행 수행되는 트랜잭션을 제어해 데이터의 일관성과 무결성을 보장하기 위해서라고 설명합니다.",
      "“CPU 코어를 늘리기 위해서”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “병행 수행되는 트랜잭션을 제어해 데이터의 일관성과 무결성을 보장하기 위해서”입니다."
    ],
    "keyPoints": [
      "본문",
      "공유",
      "락과",
      "배타"
    ]
  },
  {
    "version": 2,
    "categoryId": "os-concurrency",
    "sourceId": "be-33",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "evidenceQuote": "**공유 락(Shared Lock)** 은 읽기 락(Read Lock)이라고 부르며, 공유 락이 걸린 데이터에 대해서 다른 트랜잭션에서도 공유 락을 획득할 수 있지만, 배타 락은 획득할 수 없습니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-33-follow-up",
    "kind": "follow-up",
    "followUpOf": "quiz-be-33-main",
    "question": "be-33 원문에서 기본 개념 다음에 제시한 조건·영향 중 알맞은 것은 무엇인가요?",
    "choices": [
      "원문은 이 조건이 모든 상황에서 반대로 적용된다고 설명한다.",
      "원문은 이 결과가 아무 조건 없이 항상 발생한다고 설명한다.",
      "**공유 락(Shared Lock)** 은 읽기 락(Read Lock)이라고 부르며, 공유 락이 걸린 데이터에 대해서 다른 트랜잭션에서도 공유 락을 획득할 수 있지만, 배타 락은 획득할 수 없습니다.",
      "원문은 이 판단에 원문 밖의 정보가 반드시 필요하다고 설명한다."
    ],
    "correctIndex": 2,
    "explanation": "원문의 근거는 **공유 락(Shared Lock)** 은 읽기 락(Read Lock)이라고 부르며, 공유 락이 걸린 데이터에 대해서 다른 트랜잭션에서도 공유 락을 획득할 수 있지만, 배타 락은 획득할 수 없습니다.라는 판단을 뒷받침합니다.",
    "followUpOrder": 1,
    "followUpRole": "core",
    "sourceAnchor": "content-answer",
    "choiceFeedback": [
      "“원문은 이 조건이 모든 상황에서 반대로 적용된다고 설명한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “**공유 락(Shared Lock)** 은 읽기 락(Read Lock)이라고 부르며, 공유 락이 걸린 데이터에 대해서 다른 트랜잭션에서도 공유 락을 획득할 수 있지만, 배타 락은 획득할 수 없습니다.”입니다.",
      "“원문은 이 결과가 아무 조건 없이 항상 발생한다고 설명한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “**공유 락(Shared Lock)** 은 읽기 락(Read Lock)이라고 부르며, 공유 락이 걸린 데이터에 대해서 다른 트랜잭션에서도 공유 락을 획득할 수 있지만, 배타 락은 획득할 수 없습니다.”입니다.",
      "원문의 근거는 **공유 락(Shared Lock)** 은 읽기 락(Read Lock)이라고 부르며, 공유 락이 걸린 데이터에 대해서 다른 트랜잭션에서도 공유 락을 획득할 수 있지만, 배타 락은 획득할 수 없습니다.라는 판단을 뒷받침합니다.",
      "“원문은 이 판단에 원문 밖의 정보가 반드시 필요하다고 설명한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “**공유 락(Shared Lock)** 은 읽기 락(Read Lock)이라고 부르며, 공유 락이 걸린 데이터에 대해서 다른 트랜잭션에서도 공유 락을 획득할 수 있지만, 배타 락은 획득할 수 없습니다.”입니다."
    ],
    "keyPoints": [
      "본문",
      "공유",
      "락과",
      "배타"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-33-follow-up-2",
    "kind": "follow-up",
    "followUpOf": "quiz-be-33-main",
    "followUpOrder": 2,
    "followUpRole": "core",
    "question": "공유 락과 배타 락 원문의 “본문” 구역과 일치하는 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "즉, 공유 락을 사용하면 트랜잭션 내에서 조회한 데이터가 변경되지 않는다는 것을 보장합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 1,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "os-concurrency",
    "sourceId": "be-33",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "즉, 공유 락을 사용하면 트랜잭션 내에서 조회한 데이터가 변경되지 않는다는 것을 보장합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “즉, 공유 락을 사용하면 트랜잭션 내에서 조회한 데이터가 변경되지 않는다는 것을 보장합니다.”입니다.",
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “즉, 공유 락을 사용하면 트랜잭션 내에서 조회한 데이터가 변경되지 않는다는 것을 보장합니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “즉, 공유 락을 사용하면 트랜잭션 내에서 조회한 데이터가 변경되지 않는다는 것을 보장합니다.”입니다."
    ],
    "keyPoints": [
      "본문",
      "공유",
      "락과",
      "배타"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-33-follow-up-3",
    "kind": "follow-up",
    "followUpOf": "quiz-be-33-main",
    "followUpOrder": 3,
    "followUpRole": "remediation",
    "question": "공유 락과 배타 락의 핵심 근거를 다시 확인할 때 옳은 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "**배타 락(Exclusive Lock)** 은 쓰기 락(Write Lock)이라고 부르며, 배타 락이 걸린 데이터에 대해서 다른 트랜잭션에서는 공유 락과 배타 락을 획득할 수 없습니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 2,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "os-concurrency",
    "sourceId": "be-33",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "**배타 락(Exclusive Lock)** 은 쓰기 락(Write Lock)이라고 부르며, 배타 락이 걸린 데이터에 대해서 다른 트랜잭션에서는 공유 락과 배타 락을 획득할 수 없습니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “**배타 락(Exclusive Lock)** 은 쓰기 락(Write Lock)이라고 부르며, 배타 락이 걸린 데이터에 대해서 다른 트랜잭션에서는 공유 락과 배타 락을 획득할 수 없습니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “**배타 락(Exclusive Lock)** 은 쓰기 락(Write Lock)이라고 부르며, 배타 락이 걸린 데이터에 대해서 다른 트랜잭션에서는 공유 락과 배타 락을 획득할 수 없습니다.”입니다.",
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “**배타 락(Exclusive Lock)** 은 쓰기 락(Write Lock)이라고 부르며, 배타 락이 걸린 데이터에 대해서 다른 트랜잭션에서는 공유 락과 배타 락을 획득할 수 없습니다.”입니다."
    ],
    "keyPoints": [
      "본문",
      "공유",
      "락과",
      "배타"
    ]
  },
  {
    "version": 2,
    "categoryId": "os-concurrency",
    "sourceId": "be-35",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "evidenceQuote": "스레드, 프로세스, 코어의 수가 많을수록 시스템 성능이 향상된다고 생각할 수 있지만, 실제로는 그렇지 않을 확률이 큽니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-35-main",
    "kind": "main",
    "followUpOf": null,
    "question": "스레드·프로세스·코어 수가 많을수록 항상 성능이 좋아지나요?",
    "choices": [
      "아니요. 실제로 그렇지 않을 확률이 크다",
      "예, 언제나 선형으로 좋아진다",
      "예, 메모리와 무관하게 좋아진다",
      "아니요, 한 개만 있어야 한다"
    ],
    "correctIndex": 0,
    "explanation": "원문은 아니요. 실제로 그렇지 않을 확률이 크다라고 설명합니다.",
    "followUpOrder": null,
    "followUpRole": null,
    "sourceAnchor": "content-answer",
    "choiceFeedback": [
      "원문은 아니요. 실제로 그렇지 않을 확률이 크다라고 설명합니다.",
      "“예, 언제나 선형으로 좋아진다”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “아니요. 실제로 그렇지 않을 확률이 크다”입니다.",
      "“예, 메모리와 무관하게 좋아진다”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “아니요. 실제로 그렇지 않을 확률이 크다”입니다.",
      "“아니요, 한 개만 있어야 한다”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “아니요. 실제로 그렇지 않을 확률이 크다”입니다."
    ],
    "keyPoints": [
      "본문",
      "스레드",
      "프로세스",
      "코어의"
    ]
  },
  {
    "version": 2,
    "categoryId": "os-concurrency",
    "sourceId": "be-35",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "스레드가 많으면?",
    "evidenceQuote": "스레드가 지나치게 많아지면 운영체제가 스레드 간 컨텍스트 스위칭을 자주 수행해야 하여 CPU 자원이 스레드 관리에 소모됩니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-35-follow-up",
    "kind": "follow-up",
    "followUpOf": "quiz-be-35-main",
    "question": "be-35 원문에서 기본 개념 다음에 제시한 조건·영향 중 알맞은 것은 무엇인가요?",
    "choices": [
      "스레드가 지나치게 많아지면 운영체제가 스레드 간 컨텍스트 스위칭을 자주 수행해야 하여 CPU 자원이 스레드 관리에 소모됩니다.",
      "원문은 이 조건이 모든 상황에서 반대로 적용된다고 설명한다.",
      "원문은 이 결과가 아무 조건 없이 항상 발생한다고 설명한다.",
      "원문은 이 판단에 원문 밖의 정보가 반드시 필요하다고 설명한다."
    ],
    "correctIndex": 0,
    "explanation": "원문의 근거는 스레드가 지나치게 많아지면 운영체제가 스레드 간 컨텍스트 스위칭을 자주 수행해야 하여 CPU 자원이 스레드 관리에 소모됩니다.라는 판단을 뒷받침합니다.",
    "followUpOrder": 1,
    "followUpRole": "core",
    "sourceAnchor": "스레드가-많으면",
    "choiceFeedback": [
      "원문의 근거는 스레드가 지나치게 많아지면 운영체제가 스레드 간 컨텍스트 스위칭을 자주 수행해야 하여 CPU 자원이 스레드 관리에 소모됩니다.라는 판단을 뒷받침합니다.",
      "“원문은 이 조건이 모든 상황에서 반대로 적용된다고 설명한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “스레드가 지나치게 많아지면 운영체제가 스레드 간 컨텍스트 스위칭을 자주 수행해야 하여 CPU 자원이 스레드 관리에 소모됩니다.”입니다.",
      "“원문은 이 결과가 아무 조건 없이 항상 발생한다고 설명한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “스레드가 지나치게 많아지면 운영체제가 스레드 간 컨텍스트 스위칭을 자주 수행해야 하여 CPU 자원이 스레드 관리에 소모됩니다.”입니다.",
      "“원문은 이 판단에 원문 밖의 정보가 반드시 필요하다고 설명한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “스레드가 지나치게 많아지면 운영체제가 스레드 간 컨텍스트 스위칭을 자주 수행해야 하여 CPU 자원이 스레드 관리에 소모됩니다.”입니다."
    ],
    "keyPoints": [
      "스레드가 많으면?",
      "스레드",
      "프로세스",
      "코어의"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-35-follow-up-2",
    "kind": "follow-up",
    "followUpOf": "quiz-be-35-main",
    "followUpOrder": 2,
    "followUpRole": "core",
    "question": "스레드, 프로세스, 코어의 수는 많을수록 좋을까요 원문의 “스레드가 많으면?” 구역과 일치하는 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.",
      "이로 인해 실제 작업 수행 효율이 떨어질 수 있으며, 많은 스레드가 동시에 실행될 경우 메모리나 캐시, 락 등의 자원을 경쟁하게 되어 성능 저하나 데드 락이 발생할 가능성이 높아집니다."
    ],
    "correctIndex": 3,
    "explanation": "원문의 “스레드가 많으면?” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "os-concurrency",
    "sourceId": "be-35",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "스레드가 많으면?",
    "sourceAnchor": "스레드가-많으면",
    "evidenceQuote": "이로 인해 실제 작업 수행 효율이 떨어질 수 있으며, 많은 스레드가 동시에 실행될 경우 메모리나 캐시, 락 등의 자원을 경쟁하게 되어 성능 저하나 데드 락이 발생할 가능성이 높아집니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “이로 인해 실제 작업 수행 효율이 떨어질 수 있으며, 많은 스레드가 동시에 실행될 경우 메모리나 캐시, 락 등의 자원을 경쟁하게 되어 성능 저하나 데드 락이 발생할 가능성이 높아집니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “이로 인해 실제 작업 수행 효율이 떨어질 수 있으며, 많은 스레드가 동시에 실행될 경우 메모리나 캐시, 락 등의 자원을 경쟁하게 되어 성능 저하나 데드 락이 발생할 가능성이 높아집니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “이로 인해 실제 작업 수행 효율이 떨어질 수 있으며, 많은 스레드가 동시에 실행될 경우 메모리나 캐시, 락 등의 자원을 경쟁하게 되어 성능 저하나 데드 락이 발생할 가능성이 높아집니다.”입니다.",
      "원문의 “스레드가 많으면?” 구역이 정답 선택지의 내용을 직접 설명합니다."
    ],
    "keyPoints": [
      "스레드가 많으면?",
      "스레드",
      "프로세스",
      "코어의"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-35-follow-up-3",
    "kind": "follow-up",
    "followUpOf": "quiz-be-35-main",
    "followUpOrder": 3,
    "followUpRole": "remediation",
    "question": "스레드, 프로세스, 코어의 수는 많을수록 좋을까요의 핵심 근거를 다시 확인할 때 옳은 설명은 무엇인가요?",
    "choices": [
      "또한, 스레드가 많아지면 동기화와 상태 관리가 복잡해져 버그 발생 가능성도 커집니다.",
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 0,
    "explanation": "원문의 “스레드가 많으면?” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "os-concurrency",
    "sourceId": "be-35",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "스레드가 많으면?",
    "sourceAnchor": "스레드가-많으면",
    "evidenceQuote": "또한, 스레드가 많아지면 동기화와 상태 관리가 복잡해져 버그 발생 가능성도 커집니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "원문의 “스레드가 많으면?” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “또한, 스레드가 많아지면 동기화와 상태 관리가 복잡해져 버그 발생 가능성도 커집니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “또한, 스레드가 많아지면 동기화와 상태 관리가 복잡해져 버그 발생 가능성도 커집니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “또한, 스레드가 많아지면 동기화와 상태 관리가 복잡해져 버그 발생 가능성도 커집니다.”입니다."
    ],
    "keyPoints": [
      "스레드가 많으면?",
      "스레드",
      "프로세스",
      "코어의"
    ]
  },
  {
    "version": 2,
    "categoryId": "os-concurrency",
    "sourceId": "be-54",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "동시성(Concurrency)이란?",
    "evidenceQuote": "동시성이란 이름처럼 실제로 여러 작업을 동시에 수행하는 것이 아니라, **논리적으로 동시에 실행되는 것처럼 보이게 만드는** 개념입니다. 단일 코어를 기준으로 시간 분할을 통해 여러 스레드를 번갈아 가며 작업을 수행함으로써, 마치 동시에 여러 작업이 처리되는 것처럼 보이게 합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-54-main",
    "kind": "main",
    "followUpOf": null,
    "question": "동시성은 단일 코어에서 어떻게 보이게 만들 수 있나요?",
    "choices": [
      "모든 스레드를 같은 시각에 물리적으로 실행한다",
      "시간 분할로 여러 스레드를 번갈아 수행해 논리적으로 동시에 실행되는 것처럼 보이게 한다",
      "스레드를 하나만 남긴다",
      "메모리 사용을 중지한다"
    ],
    "correctIndex": 1,
    "explanation": "원문은 시간 분할로 여러 스레드를 번갈아 수행해 논리적으로 동시에 실행되는 것처럼 보이게 한다라고 설명합니다.",
    "followUpOrder": null,
    "followUpRole": null,
    "sourceAnchor": "동시성concurrency이란",
    "choiceFeedback": [
      "“모든 스레드를 같은 시각에 물리적으로 실행한다”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “시간 분할로 여러 스레드를 번갈아 수행해 논리적으로 동시에 실행되는 것처럼 보이게 한다”입니다.",
      "원문은 시간 분할로 여러 스레드를 번갈아 수행해 논리적으로 동시에 실행되는 것처럼 보이게 한다라고 설명합니다.",
      "“스레드를 하나만 남긴다”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “시간 분할로 여러 스레드를 번갈아 수행해 논리적으로 동시에 실행되는 것처럼 보이게 한다”입니다.",
      "“메모리 사용을 중지한다”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “시간 분할로 여러 스레드를 번갈아 수행해 논리적으로 동시에 실행되는 것처럼 보이게 한다”입니다."
    ],
    "keyPoints": [
      "동시성(Concurrency)이란?",
      "동시성과",
      "병렬성에",
      "대해서"
    ]
  },
  {
    "version": 2,
    "categoryId": "os-concurrency",
    "sourceId": "be-54",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "동시성(Concurrency)이란?",
    "evidenceQuote": "사용자의 입력을 기다리거나, 네트워크 요청, 파일 입출력 등의 I/O 작업 시에는 CPU가 유휴 상태로 대기하게 됩니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-54-follow-up",
    "kind": "follow-up",
    "followUpOf": "quiz-be-54-main",
    "question": "be-54 원문에서 기본 개념 다음에 제시한 조건·영향 중 알맞은 것은 무엇인가요?",
    "choices": [
      "원문은 이 조건이 모든 상황에서 반대로 적용된다고 설명한다.",
      "사용자의 입력을 기다리거나, 네트워크 요청, 파일 입출력 등의 I/O 작업 시에는 CPU가 유휴 상태로 대기하게 됩니다.",
      "원문은 이 결과가 아무 조건 없이 항상 발생한다고 설명한다.",
      "원문은 이 판단에 원문 밖의 정보가 반드시 필요하다고 설명한다."
    ],
    "correctIndex": 1,
    "explanation": "원문의 근거는 사용자의 입력을 기다리거나, 네트워크 요청, 파일 입출력 등의 I/O 작업 시에는 CPU가 유휴 상태로 대기하게 됩니다.라는 판단을 뒷받침합니다.",
    "followUpOrder": 1,
    "followUpRole": "core",
    "sourceAnchor": "동시성concurrency이란",
    "choiceFeedback": [
      "“원문은 이 조건이 모든 상황에서 반대로 적용된다고 설명한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “사용자의 입력을 기다리거나, 네트워크 요청, 파일 입출력 등의 I/O 작업 시에는 CPU가 유휴 상태로 대기하게 됩니다.”입니다.",
      "원문의 근거는 사용자의 입력을 기다리거나, 네트워크 요청, 파일 입출력 등의 I/O 작업 시에는 CPU가 유휴 상태로 대기하게 됩니다.라는 판단을 뒷받침합니다.",
      "“원문은 이 결과가 아무 조건 없이 항상 발생한다고 설명한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “사용자의 입력을 기다리거나, 네트워크 요청, 파일 입출력 등의 I/O 작업 시에는 CPU가 유휴 상태로 대기하게 됩니다.”입니다.",
      "“원문은 이 판단에 원문 밖의 정보가 반드시 필요하다고 설명한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “사용자의 입력을 기다리거나, 네트워크 요청, 파일 입출력 등의 I/O 작업 시에는 CPU가 유휴 상태로 대기하게 됩니다.”입니다."
    ],
    "keyPoints": [
      "동시성(Concurrency)이란?",
      "동시성과",
      "병렬성에",
      "대해서"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-54-follow-up-2",
    "kind": "follow-up",
    "followUpOf": "quiz-be-54-main",
    "followUpOrder": 2,
    "followUpRole": "core",
    "question": "동시성과 병렬성 원문의 “동시성(Concurrency)이란?” 구역과 일치하는 설명은 무엇인가요?",
    "choices": [
      "이때 CPU가 아무 일도 하지 않고 대기하는 대신, 컨텍스트 스위칭을 통해 다른 스레드의 작업을 처리할 수 있습니다.",
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 0,
    "explanation": "원문의 “동시성(Concurrency)이란?” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "os-concurrency",
    "sourceId": "be-54",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "동시성(Concurrency)이란?",
    "sourceAnchor": "동시성concurrency이란",
    "evidenceQuote": "이때 CPU가 아무 일도 하지 않고 대기하는 대신, 컨텍스트 스위칭을 통해 다른 스레드의 작업을 처리할 수 있습니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "원문의 “동시성(Concurrency)이란?” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “이때 CPU가 아무 일도 하지 않고 대기하는 대신, 컨텍스트 스위칭을 통해 다른 스레드의 작업을 처리할 수 있습니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “이때 CPU가 아무 일도 하지 않고 대기하는 대신, 컨텍스트 스위칭을 통해 다른 스레드의 작업을 처리할 수 있습니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “이때 CPU가 아무 일도 하지 않고 대기하는 대신, 컨텍스트 스위칭을 통해 다른 스레드의 작업을 처리할 수 있습니다.”입니다."
    ],
    "keyPoints": [
      "동시성(Concurrency)이란?",
      "동시성과",
      "병렬성에",
      "대해서"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-54-follow-up-3",
    "kind": "follow-up",
    "followUpOf": "quiz-be-54-main",
    "followUpOrder": 3,
    "followUpRole": "remediation",
    "question": "동시성과 병렬성의 핵심 근거를 다시 확인할 때 옳은 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "이러한 특성 덕분에 서버는 여러 클라이언트의 요청을 **동시에** 처리할 수 있어 효율적입니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 1,
    "explanation": "원문의 “동시성(Concurrency)이란?” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "os-concurrency",
    "sourceId": "be-54",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "동시성(Concurrency)이란?",
    "sourceAnchor": "동시성concurrency이란",
    "evidenceQuote": "이러한 특성 덕분에 서버는 여러 클라이언트의 요청을 **동시에** 처리할 수 있어 효율적입니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “이러한 특성 덕분에 서버는 여러 클라이언트의 요청을 **동시에** 처리할 수 있어 효율적입니다.”입니다.",
      "원문의 “동시성(Concurrency)이란?” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “이러한 특성 덕분에 서버는 여러 클라이언트의 요청을 **동시에** 처리할 수 있어 효율적입니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “이러한 특성 덕분에 서버는 여러 클라이언트의 요청을 **동시에** 처리할 수 있어 효율적입니다.”입니다."
    ],
    "keyPoints": [
      "동시성(Concurrency)이란?",
      "동시성과",
      "병렬성에",
      "대해서"
    ]
  },
  {
    "version": 2,
    "categoryId": "os-concurrency",
    "sourceId": "be-59",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "컨텍스트 스위칭(Context Switching)이란?",
    "evidenceQuote": "컨텍스트 스위칭은 CPU나 코어에서 실행 중이던 프로세스나 스레드가 다른 프로세스나 스레드로 교체되는 과정을 말합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-59-main",
    "kind": "main",
    "followUpOf": null,
    "question": "컨텍스트 스위칭은 무엇인가요?",
    "choices": [
      "디스크를 포맷하는 과정",
      "네트워크 패킷을 암호화하는 과정",
      "CPU나 코어에서 실행 중이던 프로세스나 스레드가 다른 것으로 교체되는 과정",
      "캐시를 영구 저장하는 과정"
    ],
    "correctIndex": 2,
    "explanation": "원문은 CPU나 코어에서 실행 중이던 프로세스나 스레드가 다른 것으로 교체되는 과정라고 설명합니다.",
    "followUpOrder": null,
    "followUpRole": null,
    "sourceAnchor": "컨텍스트-스위칭context-switching이란",
    "choiceFeedback": [
      "“디스크를 포맷하는 과정”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “CPU나 코어에서 실행 중이던 프로세스나 스레드가 다른 것으로 교체되는 과정”입니다.",
      "“네트워크 패킷을 암호화하는 과정”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “CPU나 코어에서 실행 중이던 프로세스나 스레드가 다른 것으로 교체되는 과정”입니다.",
      "원문은 CPU나 코어에서 실행 중이던 프로세스나 스레드가 다른 것으로 교체되는 과정라고 설명합니다.",
      "“캐시를 영구 저장하는 과정”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “CPU나 코어에서 실행 중이던 프로세스나 스레드가 다른 것으로 교체되는 과정”입니다."
    ],
    "keyPoints": [
      "컨텍스트 스위칭(Context Switching)이란?",
      "프로세스보다",
      "스레드의",
      "컨텍스트"
    ]
  },
  {
    "version": 2,
    "categoryId": "os-concurrency",
    "sourceId": "be-59",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "컨텍스트(Context)란?",
    "evidenceQuote": "컨텍스트는 프로세스나 스레드의 현재 상태를 의미합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-59-follow-up",
    "kind": "follow-up",
    "followUpOf": "quiz-be-59-main",
    "question": "be-59 원문에서 기본 개념 다음에 제시한 조건·영향 중 알맞은 것은 무엇인가요?",
    "choices": [
      "원문은 이 조건이 모든 상황에서 반대로 적용된다고 설명한다.",
      "원문은 이 결과가 아무 조건 없이 항상 발생한다고 설명한다.",
      "컨텍스트는 프로세스나 스레드의 현재 상태를 의미합니다.",
      "원문은 이 판단에 원문 밖의 정보가 반드시 필요하다고 설명한다."
    ],
    "correctIndex": 2,
    "explanation": "원문의 근거는 컨텍스트는 프로세스나 스레드의 현재 상태를 의미합니다.라는 판단을 뒷받침합니다.",
    "followUpOrder": 1,
    "followUpRole": "core",
    "sourceAnchor": "컨텍스트context란",
    "choiceFeedback": [
      "“원문은 이 조건이 모든 상황에서 반대로 적용된다고 설명한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “컨텍스트는 프로세스나 스레드의 현재 상태를 의미합니다.”입니다.",
      "“원문은 이 결과가 아무 조건 없이 항상 발생한다고 설명한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “컨텍스트는 프로세스나 스레드의 현재 상태를 의미합니다.”입니다.",
      "원문의 근거는 컨텍스트는 프로세스나 스레드의 현재 상태를 의미합니다.라는 판단을 뒷받침합니다.",
      "“원문은 이 판단에 원문 밖의 정보가 반드시 필요하다고 설명한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “컨텍스트는 프로세스나 스레드의 현재 상태를 의미합니다.”입니다."
    ],
    "keyPoints": [
      "컨텍스트(Context)란?",
      "프로세스보다",
      "스레드의",
      "컨텍스트"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-59-follow-up-2",
    "kind": "follow-up",
    "followUpOf": "quiz-be-59-main",
    "followUpOrder": 2,
    "followUpRole": "core",
    "question": "프로세스보다 스레드의 컨텍스트 스위칭이 더 빠른 이유는 무엇인가요 원문의 “컨텍스트 스위칭(Context Switching)이란?” 구역과 일치하는 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "이는 멀티태스킹 시스템에서 여러 작업을 효율적으로 관리하기 위해 필수적인 메커니즘입니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 1,
    "explanation": "원문의 “컨텍스트 스위칭(Context Switching)이란?” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "os-concurrency",
    "sourceId": "be-59",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "컨텍스트 스위칭(Context Switching)이란?",
    "sourceAnchor": "컨텍스트-스위칭context-switching이란",
    "evidenceQuote": "이는 멀티태스킹 시스템에서 여러 작업을 효율적으로 관리하기 위해 필수적인 메커니즘입니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “이는 멀티태스킹 시스템에서 여러 작업을 효율적으로 관리하기 위해 필수적인 메커니즘입니다.”입니다.",
      "원문의 “컨텍스트 스위칭(Context Switching)이란?” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “이는 멀티태스킹 시스템에서 여러 작업을 효율적으로 관리하기 위해 필수적인 메커니즘입니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “이는 멀티태스킹 시스템에서 여러 작업을 효율적으로 관리하기 위해 필수적인 메커니즘입니다.”입니다."
    ],
    "keyPoints": [
      "컨텍스트 스위칭(Context Switching)이란?",
      "프로세스보다",
      "스레드의",
      "컨텍스트"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-59-follow-up-3",
    "kind": "follow-up",
    "followUpOf": "quiz-be-59-main",
    "followUpOrder": 3,
    "followUpRole": "remediation",
    "question": "프로세스보다 스레드의 컨텍스트 스위칭이 더 빠른 이유는 무엇인가요의 핵심 근거를 다시 확인할 때 옳은 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "여기에는 CPU의 레지스터 상태(프로그램 카운터, 스택 포인터 등)와 메모리 상태가 포함됩니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 2,
    "explanation": "원문의 “컨텍스트(Context)란?” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "os-concurrency",
    "sourceId": "be-59",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "컨텍스트(Context)란?",
    "sourceAnchor": "컨텍스트context란",
    "evidenceQuote": "여기에는 CPU의 레지스터 상태(프로그램 카운터, 스택 포인터 등)와 메모리 상태가 포함됩니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “여기에는 CPU의 레지스터 상태(프로그램 카운터, 스택 포인터 등)와 메모리 상태가 포함됩니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “여기에는 CPU의 레지스터 상태(프로그램 카운터, 스택 포인터 등)와 메모리 상태가 포함됩니다.”입니다.",
      "원문의 “컨텍스트(Context)란?” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “여기에는 CPU의 레지스터 상태(프로그램 카운터, 스택 포인터 등)와 메모리 상태가 포함됩니다.”입니다."
    ],
    "keyPoints": [
      "컨텍스트(Context)란?",
      "프로세스보다",
      "스레드의",
      "컨텍스트"
    ]
  },
  {
    "version": 2,
    "categoryId": "os-concurrency",
    "sourceId": "be-67",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "evidenceQuote": "**교착 상태(deadlock)** 는 두 개 이상의 작업이 서로 상대방의 작업이 끝나기만을 기다리고 있어 결과적으로 아무것도 완료되지 못하는 상태를 의미합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-67-main",
    "kind": "main",
    "followUpOf": null,
    "question": "교착 상태는 어떤 상태인가요?",
    "choices": [
      "하나의 작업이 즉시 끝나는 상태",
      "둘 이상의 작업이 서로 상대방 작업이 끝나기만 기다려 아무것도 완료하지 못하는 상태",
      "메모리가 완전히 비어 있는 상태",
      "스레드가 순차 실행되는 상태"
    ],
    "correctIndex": 1,
    "explanation": "원문은 둘 이상의 작업이 서로 상대방 작업이 끝나기만 기다려 아무것도 완료하지 못하는 상태라고 설명합니다.",
    "followUpOrder": null,
    "followUpRole": null,
    "sourceAnchor": "content-answer",
    "choiceFeedback": [
      "“하나의 작업이 즉시 끝나는 상태”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “둘 이상의 작업이 서로 상대방 작업이 끝나기만 기다려 아무것도 완료하지 못하는 상태”입니다.",
      "원문은 둘 이상의 작업이 서로 상대방 작업이 끝나기만 기다려 아무것도 완료하지 못하는 상태라고 설명합니다.",
      "“메모리가 완전히 비어 있는 상태”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “둘 이상의 작업이 서로 상대방 작업이 끝나기만 기다려 아무것도 완료하지 못하는 상태”입니다.",
      "“스레드가 순차 실행되는 상태”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “둘 이상의 작업이 서로 상대방 작업이 끝나기만 기다려 아무것도 완료하지 못하는 상태”입니다."
    ],
    "keyPoints": [
      "본문",
      "교착",
      "상태에",
      "대해서"
    ]
  },
  {
    "version": 2,
    "categoryId": "os-concurrency",
    "sourceId": "be-67",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "교착 상태가 발생하는 조건을 알고 계신가요?",
    "evidenceQuote": "4가지 조건(상호 배제, 점유 대기, 비선점, 원형 대기)이 모두 만족하는 경우, 교착 상태에 빠질 수 있습니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-67-follow-up",
    "kind": "follow-up",
    "followUpOf": "quiz-be-67-main",
    "question": "be-67 원문에서 기본 개념 다음에 제시한 조건·영향 중 알맞은 것은 무엇인가요?",
    "choices": [
      "원문은 이 조건이 모든 상황에서 반대로 적용된다고 설명한다.",
      "4가지 조건(상호 배제, 점유 대기, 비선점, 원형 대기)이 모두 만족하는 경우, 교착 상태에 빠질 수 있습니다.",
      "원문은 이 결과가 아무 조건 없이 항상 발생한다고 설명한다.",
      "원문은 이 판단에 원문 밖의 정보가 반드시 필요하다고 설명한다."
    ],
    "correctIndex": 1,
    "explanation": "원문의 근거는 4가지 조건(상호 배제, 점유 대기, 비선점, 원형 대기)이 모두 만족하는 경우, 교착 상태에 빠질 수 있습니다.라는 판단을 뒷받침합니다.",
    "followUpOrder": 1,
    "followUpRole": "core",
    "sourceAnchor": "교착-상태가-발생하는-조건을-알고-계신가요",
    "choiceFeedback": [
      "“원문은 이 조건이 모든 상황에서 반대로 적용된다고 설명한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “4가지 조건(상호 배제, 점유 대기, 비선점, 원형 대기)이 모두 만족하는 경우, 교착 상태에 빠질 수 있습니다.”입니다.",
      "원문의 근거는 4가지 조건(상호 배제, 점유 대기, 비선점, 원형 대기)이 모두 만족하는 경우, 교착 상태에 빠질 수 있습니다.라는 판단을 뒷받침합니다.",
      "“원문은 이 결과가 아무 조건 없이 항상 발생한다고 설명한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “4가지 조건(상호 배제, 점유 대기, 비선점, 원형 대기)이 모두 만족하는 경우, 교착 상태에 빠질 수 있습니다.”입니다.",
      "“원문은 이 판단에 원문 밖의 정보가 반드시 필요하다고 설명한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “4가지 조건(상호 배제, 점유 대기, 비선점, 원형 대기)이 모두 만족하는 경우, 교착 상태에 빠질 수 있습니다.”입니다."
    ],
    "keyPoints": [
      "교착 상태가 발생하는 조건을 알고 계신가요?",
      "교착",
      "상태에",
      "대해서"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-67-follow-up-2",
    "kind": "follow-up",
    "followUpOf": "quiz-be-67-main",
    "followUpOrder": 2,
    "followUpRole": "core",
    "question": "교착 상태 원문의 “본문” 구역과 일치하는 설명은 무엇인가요?",
    "choices": [
      "가령, A 프로세스가 자원 A를 가지고 자원 B를 필요로 합니다.",
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 0,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "os-concurrency",
    "sourceId": "be-67",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "가령, A 프로세스가 자원 A를 가지고 자원 B를 필요로 합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “가령, A 프로세스가 자원 A를 가지고 자원 B를 필요로 합니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “가령, A 프로세스가 자원 A를 가지고 자원 B를 필요로 합니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “가령, A 프로세스가 자원 A를 가지고 자원 B를 필요로 합니다.”입니다."
    ],
    "keyPoints": [
      "본문",
      "교착",
      "상태에",
      "대해서"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-67-follow-up-3",
    "kind": "follow-up",
    "followUpOf": "quiz-be-67-main",
    "followUpOrder": 3,
    "followUpRole": "remediation",
    "question": "교착 상태의 핵심 근거를 다시 확인할 때 옳은 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "그리고, B 프로세스는 자원 B를 가지고 자원 A가 필요할 때 두 개의 프로세스는 교착 상태에 빠져 어느 작업도 진행할 수 없는 상황이 됩니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 1,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "os-concurrency",
    "sourceId": "be-67",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "그리고, B 프로세스는 자원 B를 가지고 자원 A가 필요할 때 두 개의 프로세스는 교착 상태에 빠져 어느 작업도 진행할 수 없는 상황이 됩니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “그리고, B 프로세스는 자원 B를 가지고 자원 A가 필요할 때 두 개의 프로세스는 교착 상태에 빠져 어느 작업도 진행할 수 없는 상황이 됩니다.”입니다.",
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “그리고, B 프로세스는 자원 B를 가지고 자원 A가 필요할 때 두 개의 프로세스는 교착 상태에 빠져 어느 작업도 진행할 수 없는 상황이 됩니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “그리고, B 프로세스는 자원 B를 가지고 자원 A가 필요할 때 두 개의 프로세스는 교착 상태에 빠져 어느 작업도 진행할 수 없는 상황이 됩니다.”입니다."
    ],
    "keyPoints": [
      "본문",
      "교착",
      "상태에",
      "대해서"
    ]
  },
  {
    "version": 2,
    "categoryId": "os-concurrency",
    "sourceId": "be-71",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "evidenceQuote": "디스크 접근 시간은 탐색 시간, 회전 지연 시간, 데이터 전송 시간을 합쳐 계산할 수 있습니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-71-main",
    "kind": "main",
    "followUpOf": null,
    "question": "디스크 접근 시간은 어떤 시간들의 합으로 계산할 수 있나요?",
    "choices": [
      "탐색 시간, 회전 지연 시간, 데이터 전송 시간",
      "컴파일 시간, 링크 시간, 초기화 시간",
      "락 시간, 대기 시간, 종료 시간",
      "캐시 시간, 해시 시간, 정렬 시간"
    ],
    "correctIndex": 0,
    "explanation": "원문은 탐색 시간, 회전 지연 시간, 데이터 전송 시간라고 설명합니다.",
    "followUpOrder": null,
    "followUpRole": null,
    "sourceAnchor": "content-answer",
    "choiceFeedback": [
      "원문은 탐색 시간, 회전 지연 시간, 데이터 전송 시간라고 설명합니다.",
      "“컴파일 시간, 링크 시간, 초기화 시간”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “탐색 시간, 회전 지연 시간, 데이터 전송 시간”입니다.",
      "“락 시간, 대기 시간, 종료 시간”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “탐색 시간, 회전 지연 시간, 데이터 전송 시간”입니다.",
      "“캐시 시간, 해시 시간, 정렬 시간”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “탐색 시간, 회전 지연 시간, 데이터 전송 시간”입니다."
    ],
    "keyPoints": [
      "본문",
      "디스크",
      "접근",
      "시간에"
    ]
  },
  {
    "version": 2,
    "categoryId": "os-concurrency",
    "sourceId": "be-71",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "evidenceQuote": "- **탐색 시간(Seek Time)** 은 헤드를 데이터가 존재하는 트랙으로 이동시키는 과정에서 소요되는 시간을 의미합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-71-follow-up",
    "kind": "follow-up",
    "followUpOf": "quiz-be-71-main",
    "question": "be-71 원문에서 기본 개념 다음에 제시한 조건·영향 중 알맞은 것은 무엇인가요?",
    "choices": [
      "- **탐색 시간(Seek Time)** 은 헤드를 데이터가 존재하는 트랙으로 이동시키는 과정에서 소요되는 시간을 의미합니다.",
      "원문은 이 조건이 모든 상황에서 반대로 적용된다고 설명한다.",
      "원문은 이 결과가 아무 조건 없이 항상 발생한다고 설명한다.",
      "원문은 이 판단에 원문 밖의 정보가 반드시 필요하다고 설명한다."
    ],
    "correctIndex": 0,
    "explanation": "원문의 근거는 - **탐색 시간(Seek Time)** 은 헤드를 데이터가 존재하는 트랙으로 이동시키는 과정에서 소요되는 시간을 의미합니다.라는 판단을 뒷받침합니다.",
    "followUpOrder": 1,
    "followUpRole": "core",
    "sourceAnchor": "content-answer",
    "choiceFeedback": [
      "원문의 근거는 - **탐색 시간(Seek Time)** 은 헤드를 데이터가 존재하는 트랙으로 이동시키는 과정에서 소요되는 시간을 의미합니다.라는 판단을 뒷받침합니다.",
      "“원문은 이 조건이 모든 상황에서 반대로 적용된다고 설명한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “- **탐색 시간(Seek Time)** 은 헤드를 데이터가 존재하는 트랙으로 이동시키는 과정에서 소요되는 시간을 의미합니다.”입니다.",
      "“원문은 이 결과가 아무 조건 없이 항상 발생한다고 설명한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “- **탐색 시간(Seek Time)** 은 헤드를 데이터가 존재하는 트랙으로 이동시키는 과정에서 소요되는 시간을 의미합니다.”입니다.",
      "“원문은 이 판단에 원문 밖의 정보가 반드시 필요하다고 설명한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “- **탐색 시간(Seek Time)** 은 헤드를 데이터가 존재하는 트랙으로 이동시키는 과정에서 소요되는 시간을 의미합니다.”입니다."
    ],
    "keyPoints": [
      "본문",
      "디스크",
      "접근",
      "시간에"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-71-follow-up-2",
    "kind": "follow-up",
    "followUpOf": "quiz-be-71-main",
    "followUpOrder": 2,
    "followUpRole": "core",
    "question": "디스크 접근 시간 원문의 “본문” 구역과 일치하는 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.",
      "일반적으로 단일-헤드 디스크 시스템에서 특정 데이터 블록(하나 이상의 섹터로 이루어짐)을 읽거나 쓰기 위해서는 헤드를 데이터가 존재하는 트랙으로 이동시키는 과정, 원하는 데이터가 저장된 섹터가 헤드 아래로 회전되어 올 때까지 기다리는 과정, 데이터를 전송하는 과정이 필요합니다."
    ],
    "correctIndex": 3,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "os-concurrency",
    "sourceId": "be-71",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "일반적으로 단일-헤드 디스크 시스템에서 특정 데이터 블록(하나 이상의 섹터로 이루어짐)을 읽거나 쓰기 위해서는 헤드를 데이터가 존재하는 트랙으로 이동시키는 과정, 원하는 데이터가 저장된 섹터가 헤드 아래로 회전되어 올 때까지 기다리는 과정, 데이터를 전송하는 과정이 필요합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “일반적으로 단일-헤드 디스크 시스템에서 특정 데이터 블록(하나 이상의 섹터로 이루어짐)을 읽거나 쓰기 위해서는 헤드를 데이터가 존재하는 트랙으로 이동시키는 과정, 원하는 데이터가 저장된 섹터가 헤드 아래로 회전되어 올 때까지 기다리는 과정, 데이터를 전송하는 과정이 필요합니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “일반적으로 단일-헤드 디스크 시스템에서 특정 데이터 블록(하나 이상의 섹터로 이루어짐)을 읽거나 쓰기 위해서는 헤드를 데이터가 존재하는 트랙으로 이동시키는 과정, 원하는 데이터가 저장된 섹터가 헤드 아래로 회전되어 올 때까지 기다리는 과정, 데이터를 전송하는 과정이 필요합니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “일반적으로 단일-헤드 디스크 시스템에서 특정 데이터 블록(하나 이상의 섹터로 이루어짐)을 읽거나 쓰기 위해서는 헤드를 데이터가 존재하는 트랙으로 이동시키는 과정, 원하는 데이터가 저장된 섹터가 헤드 아래로 회전되어 올 때까지 기다리는 과정, 데이터를 전송하는 과정이 필요합니다.”입니다.",
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다."
    ],
    "keyPoints": [
      "본문",
      "디스크",
      "접근",
      "시간에"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-71-follow-up-3",
    "kind": "follow-up",
    "followUpOf": "quiz-be-71-main",
    "followUpOrder": 3,
    "followUpRole": "remediation",
    "question": "디스크 접근 시간의 핵심 근거를 다시 확인할 때 옳은 설명은 무엇인가요?",
    "choices": [
      "그리고 이 모든 과정을 수행하는 데 걸리는 시간을 **디스크 접근 시간(Disk Access Time)** 이라고 합니다.",
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 0,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "os-concurrency",
    "sourceId": "be-71",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "그리고 이 모든 과정을 수행하는 데 걸리는 시간을 **디스크 접근 시간(Disk Access Time)** 이라고 합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “그리고 이 모든 과정을 수행하는 데 걸리는 시간을 **디스크 접근 시간(Disk Access Time)** 이라고 합니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “그리고 이 모든 과정을 수행하는 데 걸리는 시간을 **디스크 접근 시간(Disk Access Time)** 이라고 합니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “그리고 이 모든 과정을 수행하는 데 걸리는 시간을 **디스크 접근 시간(Disk Access Time)** 이라고 합니다.”입니다."
    ],
    "keyPoints": [
      "본문",
      "디스크",
      "접근",
      "시간에"
    ]
  },
  {
    "version": 2,
    "categoryId": "os-concurrency",
    "sourceId": "be-73",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "evidenceQuote": "CPU 스케줄링은 운영체제가 프로세스들에게 공정하고 합리적으로 CPU 자원을 배분하는 것을 의미합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-73-main",
    "kind": "main",
    "followUpOf": null,
    "question": "CPU 스케줄링의 목적은 무엇인가요?",
    "choices": [
      "모든 프로세스를 동시에 종료하는 것",
      "디스크 공간을 분할하는 것",
      "프로세스에 공정하고 합리적으로 CPU 자원을 배분하는 것",
      "네트워크 연결을 차단하는 것"
    ],
    "correctIndex": 2,
    "explanation": "원문은 프로세스에 공정하고 합리적으로 CPU 자원을 배분하는 것라고 설명합니다.",
    "followUpOrder": null,
    "followUpRole": null,
    "sourceAnchor": "content-answer",
    "choiceFeedback": [
      "“모든 프로세스를 동시에 종료하는 것”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “프로세스에 공정하고 합리적으로 CPU 자원을 배분하는 것”입니다.",
      "“디스크 공간을 분할하는 것”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “프로세스에 공정하고 합리적으로 CPU 자원을 배분하는 것”입니다.",
      "원문은 프로세스에 공정하고 합리적으로 CPU 자원을 배분하는 것라고 설명합니다.",
      "“네트워크 연결을 차단하는 것”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “프로세스에 공정하고 합리적으로 CPU 자원을 배분하는 것”입니다."
    ],
    "keyPoints": [
      "본문",
      "CPU",
      "스케줄링에",
      "대해서"
    ]
  },
  {
    "version": 2,
    "categoryId": "os-concurrency",
    "sourceId": "be-73",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "선점형 스케줄링과 비선점형은 각각 어떤 특징이 존재하나요?",
    "evidenceQuote": "- **선점형 스케줄링(Preemptive Scheduling)** 은 프로세스가 CPU를 사용하고 있더라도 운영체제가 프로세스로부터 자원을 강제로 빼앗아 다른 프로세스에 할당할 수 있는 방식입니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-73-follow-up",
    "kind": "follow-up",
    "followUpOf": "quiz-be-73-main",
    "question": "be-73 원문에서 기본 개념 다음에 제시한 조건·영향 중 알맞은 것은 무엇인가요?",
    "choices": [
      "원문은 이 조건이 모든 상황에서 반대로 적용된다고 설명한다.",
      "원문은 이 결과가 아무 조건 없이 항상 발생한다고 설명한다.",
      "- **선점형 스케줄링(Preemptive Scheduling)** 은 프로세스가 CPU를 사용하고 있더라도 운영체제가 프로세스로부터 자원을 강제로 빼앗아 다른 프로세스에 할당할 수 있는 방식입니다.",
      "원문은 이 판단에 원문 밖의 정보가 반드시 필요하다고 설명한다."
    ],
    "correctIndex": 2,
    "explanation": "원문의 근거는 - **선점형 스케줄링(Preemptive Scheduling)** 은 프로세스가 CPU를 사용하고 있더라도 운영체제가 프로세스로부터 자원을 강제로 빼앗아 다른 프로세스에 할당할 수 있는 방식입니다.라는 판단을 뒷받침합니다.",
    "followUpOrder": 1,
    "followUpRole": "core",
    "sourceAnchor": "선점형-스케줄링과-비선점형은-각각-어떤-특징이-존재하나요",
    "choiceFeedback": [
      "“원문은 이 조건이 모든 상황에서 반대로 적용된다고 설명한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “- **선점형 스케줄링(Preemptive Scheduling)** 은 프로세스가 CPU를 사용하고 있더라도 운영체제가 프로세스로부터 자원을 강제로 빼앗아 다른 프로세스에 할당할 수 있는 방식입니다.”입니다.",
      "“원문은 이 결과가 아무 조건 없이 항상 발생한다고 설명한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “- **선점형 스케줄링(Preemptive Scheduling)** 은 프로세스가 CPU를 사용하고 있더라도 운영체제가 프로세스로부터 자원을 강제로 빼앗아 다른 프로세스에 할당할 수 있는 방식입니다.”입니다.",
      "원문의 근거는 - **선점형 스케줄링(Preemptive Scheduling)** 은 프로세스가 CPU를 사용하고 있더라도 운영체제가 프로세스로부터 자원을 강제로 빼앗아 다른 프로세스에 할당할 수 있는 방식입니다.라는 판단을 뒷받침합니다.",
      "“원문은 이 판단에 원문 밖의 정보가 반드시 필요하다고 설명한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “- **선점형 스케줄링(Preemptive Scheduling)** 은 프로세스가 CPU를 사용하고 있더라도 운영체제가 프로세스로부터 자원을 강제로 빼앗아 다른 프로세스에 할당할 수 있는 방식입니다.”입니다."
    ],
    "keyPoints": [
      "선점형 스케줄링과 비선점형은 각각 어떤 특징이 존재하나요?",
      "CPU",
      "스케줄링에",
      "대해서"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-73-follow-up-2",
    "kind": "follow-up",
    "followUpOf": "quiz-be-73-main",
    "followUpOrder": 2,
    "followUpRole": "core",
    "question": "CPU 스케줄링 원문의 “본문” 구역과 일치하는 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "만약 CPU 스케줄링이 없다면, 반드시 실행되어야 할 프로세스들이 실행되지 못할 수 있으며, 당장 급하지 않은 프로세스가 실행되는 등 무질서한 상태가 발생할 수 있습니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 1,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "os-concurrency",
    "sourceId": "be-73",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "만약 CPU 스케줄링이 없다면, 반드시 실행되어야 할 프로세스들이 실행되지 못할 수 있으며, 당장 급하지 않은 프로세스가 실행되는 등 무질서한 상태가 발생할 수 있습니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “만약 CPU 스케줄링이 없다면, 반드시 실행되어야 할 프로세스들이 실행되지 못할 수 있으며, 당장 급하지 않은 프로세스가 실행되는 등 무질서한 상태가 발생할 수 있습니다.”입니다.",
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “만약 CPU 스케줄링이 없다면, 반드시 실행되어야 할 프로세스들이 실행되지 못할 수 있으며, 당장 급하지 않은 프로세스가 실행되는 등 무질서한 상태가 발생할 수 있습니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “만약 CPU 스케줄링이 없다면, 반드시 실행되어야 할 프로세스들이 실행되지 못할 수 있으며, 당장 급하지 않은 프로세스가 실행되는 등 무질서한 상태가 발생할 수 있습니다.”입니다."
    ],
    "keyPoints": [
      "본문",
      "CPU",
      "스케줄링에",
      "대해서"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-73-follow-up-3",
    "kind": "follow-up",
    "followUpOf": "quiz-be-73-main",
    "followUpOrder": 3,
    "followUpRole": "remediation",
    "question": "CPU 스케줄링의 핵심 근거를 다시 확인할 때 옳은 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "CPU 스케줄링은 선점형과 비선점형 방식으로 구현할 수 있으며, 다양한 스케줄링 알고리즘이 존재합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 2,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "os-concurrency",
    "sourceId": "be-73",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "CPU 스케줄링은 선점형과 비선점형 방식으로 구현할 수 있으며, 다양한 스케줄링 알고리즘이 존재합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “CPU 스케줄링은 선점형과 비선점형 방식으로 구현할 수 있으며, 다양한 스케줄링 알고리즘이 존재합니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “CPU 스케줄링은 선점형과 비선점형 방식으로 구현할 수 있으며, 다양한 스케줄링 알고리즘이 존재합니다.”입니다.",
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “CPU 스케줄링은 선점형과 비선점형 방식으로 구현할 수 있으며, 다양한 스케줄링 알고리즘이 존재합니다.”입니다."
    ],
    "keyPoints": [
      "본문",
      "CPU",
      "스케줄링에",
      "대해서"
    ]
  },
  {
    "version": 2,
    "categoryId": "os-concurrency",
    "sourceId": "be-74",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "evidenceQuote": "운영체제는 사용자가 실행하는 프로그램이 하드웨어 자원에 직접 접근하는 것을 방지해 자원을 보호합니다. 왜냐하면, 프로그램이 CPU, 메모리, 하드 디스크에 마음대로 접근하고 조작할 수 있다면, 자원이 무질서하게 관리 될 수 있으며 한 프로그램의 실수가 전체 컴퓨터에 영향을 주기 때문입니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-74-main",
    "kind": "main",
    "followUpOf": null,
    "question": "운영체제가 프로그램의 하드웨어 직접 접근을 막는 이유는 무엇인가요?",
    "choices": [
      "프로그램 실행 속도를 반드시 낮추기 위해서",
      "프로그램이 메모리를 쓰지 못하게 하기 위해서",
      "모든 파일을 하나로 합치기 위해서",
      "자원을 보호하고 한 프로그램의 실수가 전체 컴퓨터에 영향을 주는 것을 막기 위해서"
    ],
    "correctIndex": 3,
    "explanation": "원문은 자원을 보호하고 한 프로그램의 실수가 전체 컴퓨터에 영향을 주는 것을 막기 위해서라고 설명합니다.",
    "followUpOrder": null,
    "followUpRole": null,
    "sourceAnchor": "content-answer",
    "choiceFeedback": [
      "“프로그램 실행 속도를 반드시 낮추기 위해서”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “자원을 보호하고 한 프로그램의 실수가 전체 컴퓨터에 영향을 주는 것을 막기 위해서”입니다.",
      "“프로그램이 메모리를 쓰지 못하게 하기 위해서”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “자원을 보호하고 한 프로그램의 실수가 전체 컴퓨터에 영향을 주는 것을 막기 위해서”입니다.",
      "“모든 파일을 하나로 합치기 위해서”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “자원을 보호하고 한 프로그램의 실수가 전체 컴퓨터에 영향을 주는 것을 막기 위해서”입니다.",
      "원문은 자원을 보호하고 한 프로그램의 실수가 전체 컴퓨터에 영향을 주는 것을 막기 위해서라고 설명합니다."
    ],
    "keyPoints": [
      "본문",
      "시스템",
      "콜이란",
      "무엇인가요?"
    ]
  },
  {
    "version": 2,
    "categoryId": "os-concurrency",
    "sourceId": "be-74",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "evidenceQuote": "따라서, 프로그램은 자원에 접근하기 위해서 운영체제에게 도움을 요청해야 합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-74-follow-up",
    "kind": "follow-up",
    "followUpOf": "quiz-be-74-main",
    "question": "be-74 원문에서 기본 개념 다음에 제시한 조건·영향 중 알맞은 것은 무엇인가요?",
    "choices": [
      "원문은 이 조건이 모든 상황에서 반대로 적용된다고 설명한다.",
      "원문은 이 결과가 아무 조건 없이 항상 발생한다고 설명한다.",
      "원문은 이 판단에 원문 밖의 정보가 반드시 필요하다고 설명한다.",
      "따라서, 프로그램은 자원에 접근하기 위해서 운영체제에게 도움을 요청해야 합니다."
    ],
    "correctIndex": 3,
    "explanation": "원문의 근거는 따라서, 프로그램은 자원에 접근하기 위해서 운영체제에게 도움을 요청해야 합니다.라는 판단을 뒷받침합니다.",
    "followUpOrder": 1,
    "followUpRole": "core",
    "sourceAnchor": "content-answer",
    "choiceFeedback": [
      "“원문은 이 조건이 모든 상황에서 반대로 적용된다고 설명한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “따라서, 프로그램은 자원에 접근하기 위해서 운영체제에게 도움을 요청해야 합니다.”입니다.",
      "“원문은 이 결과가 아무 조건 없이 항상 발생한다고 설명한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “따라서, 프로그램은 자원에 접근하기 위해서 운영체제에게 도움을 요청해야 합니다.”입니다.",
      "“원문은 이 판단에 원문 밖의 정보가 반드시 필요하다고 설명한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “따라서, 프로그램은 자원에 접근하기 위해서 운영체제에게 도움을 요청해야 합니다.”입니다.",
      "원문의 근거는 따라서, 프로그램은 자원에 접근하기 위해서 운영체제에게 도움을 요청해야 합니다.라는 판단을 뒷받침합니다."
    ],
    "keyPoints": [
      "본문",
      "시스템",
      "콜이란",
      "무엇인가요?"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-74-follow-up-2",
    "kind": "follow-up",
    "followUpOf": "quiz-be-74-main",
    "followUpOrder": 2,
    "followUpRole": "core",
    "question": "시스템 콜이란 무엇인가요 원문의 “본문” 구역과 일치하는 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "운영체제는 프로그램들이 자원에 접근하려 할 때 오직 자신을 통해서만 접근하도록 하여 자원을 보호합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 2,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "os-concurrency",
    "sourceId": "be-74",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "운영체제는 프로그램들이 자원에 접근하려 할 때 오직 자신을 통해서만 접근하도록 하여 자원을 보호합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “운영체제는 프로그램들이 자원에 접근하려 할 때 오직 자신을 통해서만 접근하도록 하여 자원을 보호합니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “운영체제는 프로그램들이 자원에 접근하려 할 때 오직 자신을 통해서만 접근하도록 하여 자원을 보호합니다.”입니다.",
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “운영체제는 프로그램들이 자원에 접근하려 할 때 오직 자신을 통해서만 접근하도록 하여 자원을 보호합니다.”입니다."
    ],
    "keyPoints": [
      "본문",
      "시스템",
      "콜이란",
      "무엇인가요?"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-74-follow-up-3",
    "kind": "follow-up",
    "followUpOf": "quiz-be-74-main",
    "followUpOrder": 3,
    "followUpRole": "remediation",
    "question": "시스템 콜이란 무엇인가요의 핵심 근거를 다시 확인할 때 옳은 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.",
      "그리고, 프로그램의 요청을 받은 운영체제는 응용 프로그램 대신 자원에 접근해 요청한 작업을 수행합니다."
    ],
    "correctIndex": 3,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "os-concurrency",
    "sourceId": "be-74",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "그리고, 프로그램의 요청을 받은 운영체제는 응용 프로그램 대신 자원에 접근해 요청한 작업을 수행합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “그리고, 프로그램의 요청을 받은 운영체제는 응용 프로그램 대신 자원에 접근해 요청한 작업을 수행합니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “그리고, 프로그램의 요청을 받은 운영체제는 응용 프로그램 대신 자원에 접근해 요청한 작업을 수행합니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “그리고, 프로그램의 요청을 받은 운영체제는 응용 프로그램 대신 자원에 접근해 요청한 작업을 수행합니다.”입니다.",
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다."
    ],
    "keyPoints": [
      "본문",
      "시스템",
      "콜이란",
      "무엇인가요?"
    ]
  },
  {
    "version": 2,
    "categoryId": "os-concurrency",
    "sourceId": "be-75",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "evidenceQuote": "GC는 특정 객체가 사용 중인지 아닌지 판단하기 위해서 **도달 가능성(Reachability)** 라는 개념을 사용하는데요. 특정 객체에 대한 참조가 존재하면 도달할 수 있으며, 참조가 존재하지 않는 경우에 도달할 수 없는 상태로 간주합니다. 이때, 도달할 수 없다는 결론을 내린다면 해당 객체는 GC의 대상이 됩니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-75-main",
    "kind": "main",
    "followUpOf": null,
    "question": "GC 대상 객체는 어떤 상태일 때인가요?",
    "choices": [
      "참조가 존재하지 않아 도달할 수 없다고 판단된 상태",
      "참조가 하나라도 존재하는 상태",
      "스택에 있는 모든 상태",
      "클래스가 로드된 상태"
    ],
    "correctIndex": 0,
    "explanation": "원문은 참조가 존재하지 않아 도달할 수 없다고 판단된 상태라고 설명합니다.",
    "followUpOrder": null,
    "followUpRole": null,
    "sourceAnchor": "content-answer",
    "choiceFeedback": [
      "원문은 참조가 존재하지 않아 도달할 수 없다고 판단된 상태라고 설명합니다.",
      "“참조가 하나라도 존재하는 상태”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “참조가 존재하지 않아 도달할 수 없다고 판단된 상태”입니다.",
      "“스택에 있는 모든 상태”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “참조가 존재하지 않아 도달할 수 없다고 판단된 상태”입니다.",
      "“클래스가 로드된 상태”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “참조가 존재하지 않아 도달할 수 없다고 판단된 상태”입니다."
    ],
    "keyPoints": [
      "본문",
      "JVM에서",
      "GC",
      "대상"
    ]
  },
  {
    "version": 2,
    "categoryId": "os-concurrency",
    "sourceId": "be-75",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "도달 가능성은 어떻게 판단하나요?",
    "evidenceQuote": "힙 영역에 있는 객체에 대한 참조는 4가지 케이스가 존재하는데요. 힙 내부 객체 간의 참조, 스택 영역의 변수에 의한 참조, JNI에 의해 생성된 객체에 대한 참조(네이티브 스택 영역), 메서드 영역의 정적 변수에 의한 참조가 이에 해당됩니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-75-follow-up",
    "kind": "follow-up",
    "followUpOf": "quiz-be-75-main",
    "question": "be-75 원문에서 기본 개념 다음에 제시한 조건·영향 중 알맞은 것은 무엇인가요?",
    "choices": [
      "힙 영역에 있는 객체에 대한 참조는 4가지 케이스가 존재하는데요. 힙 내부 객체 간의 참조, 스택 영역의 변수에 의한 참조, JNI에 의해 생성된 객체에 대한 참조(네이티브 스택 영역), 메서드 영역의 정적 변수에 의한 참조가 이에 해당됩니다.",
      "원문은 이 조건이 모든 상황에서 반대로 적용된다고 설명한다.",
      "원문은 이 결과가 아무 조건 없이 항상 발생한다고 설명한다.",
      "원문은 이 판단에 원문 밖의 정보가 반드시 필요하다고 설명한다."
    ],
    "correctIndex": 0,
    "explanation": "원문의 근거는 힙 영역에 있는 객체에 대한 참조는 4가지 케이스가 존재하는데요. 힙 내부 객체 간의 참조, 스택 영역의 변수에 의한 참조, JNI에 의해 생성된 객체에 대한 참조(네이티브 스택 영역), 메서드 영역의 정적 변수에 의한 참조가 이에 해당됩니다.라는 판단을 뒷받침합니다.",
    "followUpOrder": 1,
    "followUpRole": "core",
    "sourceAnchor": "도달-가능성은-어떻게-판단하나요",
    "choiceFeedback": [
      "원문의 근거는 힙 영역에 있는 객체에 대한 참조는 4가지 케이스가 존재하는데요. 힙 내부 객체 간의 참조, 스택 영역의 변수에 의한 참조, JNI에 의해 생성된 객체에 대한 참조(네이티브 스택 영역), 메서드 영역의 정적 변수에 의한 참조가 이에 해당됩니다.라는 판단을 뒷받침합니다.",
      "“원문은 이 조건이 모든 상황에서 반대로 적용된다고 설명한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “힙 영역에 있는 객체에 대한 참조는 4가지 케이스가 존재하는데요. 힙 내부 객체 간의 참조, 스택 영역의 변수에 의한 참조, JNI에 의해 생성된 객체에 대한 참조(네이티브 스택 영역), 메서드 영역의 정적 변수에 의한 참조가 이에 해당됩니다.”입니다.",
      "“원문은 이 결과가 아무 조건 없이 항상 발생한다고 설명한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “힙 영역에 있는 객체에 대한 참조는 4가지 케이스가 존재하는데요. 힙 내부 객체 간의 참조, 스택 영역의 변수에 의한 참조, JNI에 의해 생성된 객체에 대한 참조(네이티브 스택 영역), 메서드 영역의 정적 변수에 의한 참조가 이에 해당됩니다.”입니다.",
      "“원문은 이 판단에 원문 밖의 정보가 반드시 필요하다고 설명한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “힙 영역에 있는 객체에 대한 참조는 4가지 케이스가 존재하는데요. 힙 내부 객체 간의 참조, 스택 영역의 변수에 의한 참조, JNI에 의해 생성된 객체에 대한 참조(네이티브 스택 영역), 메서드 영역의 정적 변수에 의한 참조가 이에 해당됩니다.”입니다."
    ],
    "keyPoints": [
      "도달 가능성은 어떻게 판단하나요?",
      "JVM에서",
      "GC",
      "대상"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-75-follow-up-2",
    "kind": "follow-up",
    "followUpOf": "quiz-be-75-main",
    "followUpOrder": 2,
    "followUpRole": "core",
    "question": "JVM에서 GC 대상 객체를 판단하는 기준은 무엇인가요 원문의 “본문” 구역과 일치하는 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.",
      "GC(Garbage Collection)는 자바의 메모리 관리 방법의 하나이며, JVM의 힙 영역에서 동적으로 할당했던 메모리 중에서 필요 없어진 객체를 주기적으로 제거하는 것을 의미합니다."
    ],
    "correctIndex": 3,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "os-concurrency",
    "sourceId": "be-75",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "GC(Garbage Collection)는 자바의 메모리 관리 방법의 하나이며, JVM의 힙 영역에서 동적으로 할당했던 메모리 중에서 필요 없어진 객체를 주기적으로 제거하는 것을 의미합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “GC(Garbage Collection)는 자바의 메모리 관리 방법의 하나이며, JVM의 힙 영역에서 동적으로 할당했던 메모리 중에서 필요 없어진 객체를 주기적으로 제거하는 것을 의미합니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “GC(Garbage Collection)는 자바의 메모리 관리 방법의 하나이며, JVM의 힙 영역에서 동적으로 할당했던 메모리 중에서 필요 없어진 객체를 주기적으로 제거하는 것을 의미합니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “GC(Garbage Collection)는 자바의 메모리 관리 방법의 하나이며, JVM의 힙 영역에서 동적으로 할당했던 메모리 중에서 필요 없어진 객체를 주기적으로 제거하는 것을 의미합니다.”입니다.",
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다."
    ],
    "keyPoints": [
      "본문",
      "JVM에서",
      "GC",
      "대상"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-75-follow-up-3",
    "kind": "follow-up",
    "followUpOf": "quiz-be-75-main",
    "followUpOrder": 3,
    "followUpRole": "remediation",
    "question": "JVM에서 GC 대상 객체를 판단하는 기준은 무엇인가요의 핵심 근거를 다시 확인할 때 옳은 설명은 무엇인가요?",
    "choices": [
      "이때, 힙 내부 객체 간의 참조를 제외한 나머지를 Root Set이라고 합니다.",
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 0,
    "explanation": "원문의 “도달 가능성은 어떻게 판단하나요?” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "os-concurrency",
    "sourceId": "be-75",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "도달 가능성은 어떻게 판단하나요?",
    "sourceAnchor": "도달-가능성은-어떻게-판단하나요",
    "evidenceQuote": "이때, 힙 내부 객체 간의 참조를 제외한 나머지를 Root Set이라고 합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "원문의 “도달 가능성은 어떻게 판단하나요?” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “이때, 힙 내부 객체 간의 참조를 제외한 나머지를 Root Set이라고 합니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “이때, 힙 내부 객체 간의 참조를 제외한 나머지를 Root Set이라고 합니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “이때, 힙 내부 객체 간의 참조를 제외한 나머지를 Root Set이라고 합니다.”입니다."
    ],
    "keyPoints": [
      "도달 가능성은 어떻게 판단하나요?",
      "JVM에서",
      "GC",
      "대상"
    ]
  },
  {
    "version": 2,
    "categoryId": "os-concurrency",
    "sourceId": "be-99",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "evidenceQuote": "**연속 메모리 할당 기법(Continuous Memory Allocation)** 은 운영체제가 프로세스에 연속적인 메모리 공간을 할당하는 방법을 의미합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-99-main",
    "kind": "main",
    "followUpOf": null,
    "question": "연속 메모리 할당 기법은 무엇인가요?",
    "choices": [
      "프로세스를 항상 여러 디스크에 나누는 방법",
      "캐시만 사용하는 방법",
      "운영체제가 프로세스에 연속적인 메모리 공간을 할당하는 방법",
      "메모리를 전혀 할당하지 않는 방법"
    ],
    "correctIndex": 2,
    "explanation": "원문은 운영체제가 프로세스에 연속적인 메모리 공간을 할당하는 방법라고 설명합니다.",
    "followUpOrder": null,
    "followUpRole": null,
    "sourceAnchor": "content-answer",
    "choiceFeedback": [
      "“프로세스를 항상 여러 디스크에 나누는 방법”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “운영체제가 프로세스에 연속적인 메모리 공간을 할당하는 방법”입니다.",
      "“캐시만 사용하는 방법”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “운영체제가 프로세스에 연속적인 메모리 공간을 할당하는 방법”입니다.",
      "원문은 운영체제가 프로세스에 연속적인 메모리 공간을 할당하는 방법라고 설명합니다.",
      "“메모리를 전혀 할당하지 않는 방법”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “운영체제가 프로세스에 연속적인 메모리 공간을 할당하는 방법”입니다."
    ],
    "keyPoints": [
      "본문",
      "연속",
      "메모리",
      "할당"
    ]
  },
  {
    "version": 2,
    "categoryId": "os-concurrency",
    "sourceId": "be-99",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "evidenceQuote": "연속 메모리 할당 기법은 크게 가변 크기 메모리 할당과 고정 크기 메모리 할당이 존재하는데요. 고정 크기 메모리 할당은 물리적인 메모리 공간을 고정된 크기로 나누어 프로세스에 고정된 크기만큼 할당합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-99-follow-up",
    "kind": "follow-up",
    "followUpOf": "quiz-be-99-main",
    "question": "be-99 원문에서 기본 개념 다음에 제시한 조건·영향 중 알맞은 것은 무엇인가요?",
    "choices": [
      "원문은 이 조건이 모든 상황에서 반대로 적용된다고 설명한다.",
      "원문은 이 결과가 아무 조건 없이 항상 발생한다고 설명한다.",
      "연속 메모리 할당 기법은 크게 가변 크기 메모리 할당과 고정 크기 메모리 할당이 존재하는데요. 고정 크기 메모리 할당은 물리적인 메모리 공간을 고정된 크기로 나누어 프로세스에 고정된 크기만큼 할당합니다.",
      "원문은 이 판단에 원문 밖의 정보가 반드시 필요하다고 설명한다."
    ],
    "correctIndex": 2,
    "explanation": "원문의 근거는 연속 메모리 할당 기법은 크게 가변 크기 메모리 할당과 고정 크기 메모리 할당이 존재하는데요. 고정 크기 메모리 할당은 물리적인 메모리 공간을 고정된 크기로 나누어 프로세스에 고정된 크기만큼 할당합니다.라는 판단을 뒷받침합니다.",
    "followUpOrder": 1,
    "followUpRole": "core",
    "sourceAnchor": "content-answer",
    "choiceFeedback": [
      "“원문은 이 조건이 모든 상황에서 반대로 적용된다고 설명한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “연속 메모리 할당 기법은 크게 가변 크기 메모리 할당과 고정 크기 메모리 할당이 존재하는데요. 고정 크기 메모리 할당은 물리적인 메모리 공간을 고정된 크기로 나누어 프로세스에 고정된 크기만큼 할당합니다.”입니다.",
      "“원문은 이 결과가 아무 조건 없이 항상 발생한다고 설명한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “연속 메모리 할당 기법은 크게 가변 크기 메모리 할당과 고정 크기 메모리 할당이 존재하는데요. 고정 크기 메모리 할당은 물리적인 메모리 공간을 고정된 크기로 나누어 프로세스에 고정된 크기만큼 할당합니다.”입니다.",
      "원문의 근거는 연속 메모리 할당 기법은 크게 가변 크기 메모리 할당과 고정 크기 메모리 할당이 존재하는데요. 고정 크기 메모리 할당은 물리적인 메모리 공간을 고정된 크기로 나누어 프로세스에 고정된 크기만큼 할당합니다.라는 판단을 뒷받침합니다.",
      "“원문은 이 판단에 원문 밖의 정보가 반드시 필요하다고 설명한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “연속 메모리 할당 기법은 크게 가변 크기 메모리 할당과 고정 크기 메모리 할당이 존재하는데요. 고정 크기 메모리 할당은 물리적인 메모리 공간을 고정된 크기로 나누어 프로세스에 고정된 크기만큼 할당합니다.”입니다."
    ],
    "keyPoints": [
      "본문",
      "연속",
      "메모리",
      "할당"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-99-follow-up-2",
    "kind": "follow-up",
    "followUpOf": "quiz-be-99-main",
    "followUpOrder": 2,
    "followUpRole": "core",
    "question": "연속 메모리 할당 기법 원문의 “본문” 구역과 일치하는 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "연속 메모리 할당 기법을 사용하면, 하나의 프로세스는 메모리 주소 공간에서 연속적으로 존재하게 됩니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 1,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "os-concurrency",
    "sourceId": "be-99",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "연속 메모리 할당 기법을 사용하면, 하나의 프로세스는 메모리 주소 공간에서 연속적으로 존재하게 됩니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “연속 메모리 할당 기법을 사용하면, 하나의 프로세스는 메모리 주소 공간에서 연속적으로 존재하게 됩니다.”입니다.",
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “연속 메모리 할당 기법을 사용하면, 하나의 프로세스는 메모리 주소 공간에서 연속적으로 존재하게 됩니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “연속 메모리 할당 기법을 사용하면, 하나의 프로세스는 메모리 주소 공간에서 연속적으로 존재하게 됩니다.”입니다."
    ],
    "keyPoints": [
      "본문",
      "연속",
      "메모리",
      "할당"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-99-follow-up-3",
    "kind": "follow-up",
    "followUpOf": "quiz-be-99-main",
    "followUpOrder": 3,
    "followUpRole": "remediation",
    "question": "연속 메모리 할당 기법의 핵심 근거를 다시 확인할 때 옳은 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "반면, 가변 크기 메모리 할당 방식은 프로세스의 크기에 맞춰 동적으로 메모리를 할당합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 2,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "os-concurrency",
    "sourceId": "be-99",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "반면, 가변 크기 메모리 할당 방식은 프로세스의 크기에 맞춰 동적으로 메모리를 할당합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “반면, 가변 크기 메모리 할당 방식은 프로세스의 크기에 맞춰 동적으로 메모리를 할당합니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “반면, 가변 크기 메모리 할당 방식은 프로세스의 크기에 맞춰 동적으로 메모리를 할당합니다.”입니다.",
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “반면, 가변 크기 메모리 할당 방식은 프로세스의 크기에 맞춰 동적으로 메모리를 할당합니다.”입니다."
    ],
    "keyPoints": [
      "본문",
      "연속",
      "메모리",
      "할당"
    ]
  },
  {
    "version": 2,
    "categoryId": "os-concurrency",
    "sourceId": "be-101",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "evidenceQuote": "**경쟁 상태(Race Condition)** 는 두 개 이상의 스레드가 공유 자원에 동시에 접근할 때 스레드 간의 실행 순서에 따라 결과가 달라지는 현상으로, **원자성**과 **가시성** 모두 보장되어야 해결할 수 있습니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-101-main",
    "kind": "main",
    "followUpOf": null,
    "question": "경쟁 상태를 해결하려면 무엇이 보장되어야 하나요?",
    "choices": [
      "가용성만",
      "캐시 적중률만",
      "원자성과 가시성 모두",
      "파일 권한만"
    ],
    "correctIndex": 2,
    "explanation": "원문은 원자성과 가시성 모두라고 설명합니다.",
    "followUpOrder": null,
    "followUpRole": null,
    "sourceAnchor": "content-answer",
    "choiceFeedback": [
      "“가용성만”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “원자성과 가시성 모두”입니다.",
      "“캐시 적중률만”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “원자성과 가시성 모두”입니다.",
      "원문은 원자성과 가시성 모두라고 설명합니다.",
      "“파일 권한만”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “원자성과 가시성 모두”입니다."
    ],
    "keyPoints": [
      "본문",
      "동시성",
      "문제",
      "경쟁"
    ]
  },
  {
    "version": 2,
    "categoryId": "os-concurrency",
    "sourceId": "be-101",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "evidenceQuote": "**원자성(Atomicity)** 은 공유 자원에 대한 작업의 단위가 더 이상 쪼갤 수 없는 하나의 연산처럼 동작하는 성질을 의미합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-101-follow-up",
    "kind": "follow-up",
    "followUpOf": "quiz-be-101-main",
    "question": "be-101 원문에서 기본 개념 다음에 제시한 조건·영향 중 알맞은 것은 무엇인가요?",
    "choices": [
      "원문은 이 조건이 모든 상황에서 반대로 적용된다고 설명한다.",
      "원문은 이 결과가 아무 조건 없이 항상 발생한다고 설명한다.",
      "**원자성(Atomicity)** 은 공유 자원에 대한 작업의 단위가 더 이상 쪼갤 수 없는 하나의 연산처럼 동작하는 성질을 의미합니다.",
      "원문은 이 판단에 원문 밖의 정보가 반드시 필요하다고 설명한다."
    ],
    "correctIndex": 2,
    "explanation": "원문의 근거는 **원자성(Atomicity)** 은 공유 자원에 대한 작업의 단위가 더 이상 쪼갤 수 없는 하나의 연산처럼 동작하는 성질을 의미합니다.라는 판단을 뒷받침합니다.",
    "followUpOrder": 1,
    "followUpRole": "core",
    "sourceAnchor": "content-answer",
    "choiceFeedback": [
      "“원문은 이 조건이 모든 상황에서 반대로 적용된다고 설명한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “**원자성(Atomicity)** 은 공유 자원에 대한 작업의 단위가 더 이상 쪼갤 수 없는 하나의 연산처럼 동작하는 성질을 의미합니다.”입니다.",
      "“원문은 이 결과가 아무 조건 없이 항상 발생한다고 설명한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “**원자성(Atomicity)** 은 공유 자원에 대한 작업의 단위가 더 이상 쪼갤 수 없는 하나의 연산처럼 동작하는 성질을 의미합니다.”입니다.",
      "원문의 근거는 **원자성(Atomicity)** 은 공유 자원에 대한 작업의 단위가 더 이상 쪼갤 수 없는 하나의 연산처럼 동작하는 성질을 의미합니다.라는 판단을 뒷받침합니다.",
      "“원문은 이 판단에 원문 밖의 정보가 반드시 필요하다고 설명한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “**원자성(Atomicity)** 은 공유 자원에 대한 작업의 단위가 더 이상 쪼갤 수 없는 하나의 연산처럼 동작하는 성질을 의미합니다.”입니다."
    ],
    "keyPoints": [
      "본문",
      "동시성",
      "문제",
      "경쟁"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-101-follow-up-2",
    "kind": "follow-up",
    "followUpOf": "quiz-be-101-main",
    "followUpOrder": 2,
    "followUpRole": "core",
    "question": "동시성 문제 중 경쟁 상태를 해결하려면 무엇이 보장되어야 하나요 원문의 “본문” 구역과 일치하는 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "**가시성(Visibility)** 은 한 스레드에서 변경한 값이 다른 스레드에서 즉시 확인 가능한 성질을 의미합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 1,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "os-concurrency",
    "sourceId": "be-101",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "**가시성(Visibility)** 은 한 스레드에서 변경한 값이 다른 스레드에서 즉시 확인 가능한 성질을 의미합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “**가시성(Visibility)** 은 한 스레드에서 변경한 값이 다른 스레드에서 즉시 확인 가능한 성질을 의미합니다.”입니다.",
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “**가시성(Visibility)** 은 한 스레드에서 변경한 값이 다른 스레드에서 즉시 확인 가능한 성질을 의미합니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “**가시성(Visibility)** 은 한 스레드에서 변경한 값이 다른 스레드에서 즉시 확인 가능한 성질을 의미합니다.”입니다."
    ],
    "keyPoints": [
      "본문",
      "동시성",
      "문제",
      "경쟁"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-101-follow-up-3",
    "kind": "follow-up",
    "followUpOf": "quiz-be-101-main",
    "followUpOrder": 3,
    "followUpRole": "remediation",
    "question": "동시성 문제 중 경쟁 상태를 해결하려면 무엇이 보장되어야 하나요의 핵심 근거를 다시 확인할 때 옳은 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "예를 들어 `i++` 연산은 하나의 문장이지만 CPU가 이를 수행하려면 세 단계의 instruction으로 분리됩니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 2,
    "explanation": "원문의 “원자성을 보장하지 않으면 어떤 문제가 발생하나요?” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "os-concurrency",
    "sourceId": "be-101",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "원자성을 보장하지 않으면 어떤 문제가 발생하나요?",
    "sourceAnchor": "원자성을-보장하지-않으면-어떤-문제가-발생하나요",
    "evidenceQuote": "예를 들어 `i++` 연산은 하나의 문장이지만 CPU가 이를 수행하려면 세 단계의 instruction으로 분리됩니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “예를 들어 `i++` 연산은 하나의 문장이지만 CPU가 이를 수행하려면 세 단계의 instruction으로 분리됩니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “예를 들어 `i++` 연산은 하나의 문장이지만 CPU가 이를 수행하려면 세 단계의 instruction으로 분리됩니다.”입니다.",
      "원문의 “원자성을 보장하지 않으면 어떤 문제가 발생하나요?” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “예를 들어 `i++` 연산은 하나의 문장이지만 CPU가 이를 수행하려면 세 단계의 instruction으로 분리됩니다.”입니다."
    ],
    "keyPoints": [
      "원자성을 보장하지 않으면 어떤 문제가 발생하나요?",
      "동시성",
      "문제",
      "경쟁"
    ]
  },
  {
    "version": 2,
    "categoryId": "os-concurrency",
    "sourceId": "be-115",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "evidenceQuote": "단일 프로세스 시스템은 **한 번에 하나의 프로그램만 실행**합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-115-main",
    "kind": "main",
    "followUpOf": null,
    "question": "단일 프로세스 시스템은 한 번에 몇 개의 프로그램을 실행하나요?",
    "choices": [
      "두 개",
      "코어 수만큼",
      "제한 없이",
      "하나"
    ],
    "correctIndex": 3,
    "explanation": "원문은 하나라고 설명합니다.",
    "followUpOrder": null,
    "followUpRole": null,
    "sourceAnchor": "content-answer",
    "choiceFeedback": [
      "“두 개”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “하나”입니다.",
      "“코어 수만큼”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “하나”입니다.",
      "“제한 없이”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “하나”입니다.",
      "원문은 하나라고 설명합니다."
    ],
    "keyPoints": [
      "본문",
      "단일",
      "프로세스",
      "시스템에"
    ]
  },
  {
    "version": 2,
    "categoryId": "os-concurrency",
    "sourceId": "be-115",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "evidenceQuote": "또 다른 프로그램을 실행하려면, 먼저 실행 중이던 프로그램을 종료시키고 그 다음 프로그램을 실행해야 합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-115-follow-up",
    "kind": "follow-up",
    "followUpOf": "quiz-be-115-main",
    "question": "be-115 원문에서 기본 개념 다음에 제시한 조건·영향 중 알맞은 것은 무엇인가요?",
    "choices": [
      "원문은 이 조건이 모든 상황에서 반대로 적용된다고 설명한다.",
      "원문은 이 결과가 아무 조건 없이 항상 발생한다고 설명한다.",
      "원문은 이 판단에 원문 밖의 정보가 반드시 필요하다고 설명한다.",
      "또 다른 프로그램을 실행하려면, 먼저 실행 중이던 프로그램을 종료시키고 그 다음 프로그램을 실행해야 합니다."
    ],
    "correctIndex": 3,
    "explanation": "원문의 근거는 또 다른 프로그램을 실행하려면, 먼저 실행 중이던 프로그램을 종료시키고 그 다음 프로그램을 실행해야 합니다.라는 판단을 뒷받침합니다.",
    "followUpOrder": 1,
    "followUpRole": "core",
    "sourceAnchor": "content-answer",
    "choiceFeedback": [
      "“원문은 이 조건이 모든 상황에서 반대로 적용된다고 설명한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “또 다른 프로그램을 실행하려면, 먼저 실행 중이던 프로그램을 종료시키고 그 다음 프로그램을 실행해야 합니다.”입니다.",
      "“원문은 이 결과가 아무 조건 없이 항상 발생한다고 설명한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “또 다른 프로그램을 실행하려면, 먼저 실행 중이던 프로그램을 종료시키고 그 다음 프로그램을 실행해야 합니다.”입니다.",
      "“원문은 이 판단에 원문 밖의 정보가 반드시 필요하다고 설명한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “또 다른 프로그램을 실행하려면, 먼저 실행 중이던 프로그램을 종료시키고 그 다음 프로그램을 실행해야 합니다.”입니다.",
      "원문의 근거는 또 다른 프로그램을 실행하려면, 먼저 실행 중이던 프로그램을 종료시키고 그 다음 프로그램을 실행해야 합니다.라는 판단을 뒷받침합니다."
    ],
    "keyPoints": [
      "본문",
      "단일",
      "프로세스",
      "시스템에"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-115-follow-up-2",
    "kind": "follow-up",
    "followUpOf": "quiz-be-115-main",
    "followUpOrder": 2,
    "followUpRole": "core",
    "question": "단일 프로세스 시스템 원문의 “단일 프로세스의 단점은 무엇이고 어떻게 개선할 수 있나요?” 구역과 일치하는 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "프로세스가 CPU를 사용하는 작업을 처리하다가, IO 작업을 하게 되면 CPU는 그 때 마다 아무런 일을 하지 않는 상태로 대기합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 2,
    "explanation": "원문의 “단일 프로세스의 단점은 무엇이고 어떻게 개선할 수 있나요?” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "os-concurrency",
    "sourceId": "be-115",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "단일 프로세스의 단점은 무엇이고 어떻게 개선할 수 있나요?",
    "sourceAnchor": "단일-프로세스의-단점은-무엇이고-어떻게-개선할-수-있나요",
    "evidenceQuote": "프로세스가 CPU를 사용하는 작업을 처리하다가, IO 작업을 하게 되면 CPU는 그 때 마다 아무런 일을 하지 않는 상태로 대기합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “프로세스가 CPU를 사용하는 작업을 처리하다가, IO 작업을 하게 되면 CPU는 그 때 마다 아무런 일을 하지 않는 상태로 대기합니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “프로세스가 CPU를 사용하는 작업을 처리하다가, IO 작업을 하게 되면 CPU는 그 때 마다 아무런 일을 하지 않는 상태로 대기합니다.”입니다.",
      "원문의 “단일 프로세스의 단점은 무엇이고 어떻게 개선할 수 있나요?” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “프로세스가 CPU를 사용하는 작업을 처리하다가, IO 작업을 하게 되면 CPU는 그 때 마다 아무런 일을 하지 않는 상태로 대기합니다.”입니다."
    ],
    "keyPoints": [
      "단일 프로세스의 단점은 무엇이고 어떻게 개선할 수 있나요?",
      "단일",
      "프로세스",
      "시스템에"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-115-follow-up-3",
    "kind": "follow-up",
    "followUpOf": "quiz-be-115-main",
    "followUpOrder": 3,
    "followUpRole": "remediation",
    "question": "단일 프로세스 시스템의 핵심 근거를 다시 확인할 때 옳은 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.",
      "이 문제를 개선하기 위해 **멀티 프로그래밍**을 사용할 수 있습니다."
    ],
    "correctIndex": 3,
    "explanation": "원문의 “단일 프로세스의 단점은 무엇이고 어떻게 개선할 수 있나요?” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "os-concurrency",
    "sourceId": "be-115",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "단일 프로세스의 단점은 무엇이고 어떻게 개선할 수 있나요?",
    "sourceAnchor": "단일-프로세스의-단점은-무엇이고-어떻게-개선할-수-있나요",
    "evidenceQuote": "이 문제를 개선하기 위해 **멀티 프로그래밍**을 사용할 수 있습니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “이 문제를 개선하기 위해 **멀티 프로그래밍**을 사용할 수 있습니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “이 문제를 개선하기 위해 **멀티 프로그래밍**을 사용할 수 있습니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “이 문제를 개선하기 위해 **멀티 프로그래밍**을 사용할 수 있습니다.”입니다.",
      "원문의 “단일 프로세스의 단점은 무엇이고 어떻게 개선할 수 있나요?” 구역이 정답 선택지의 내용을 직접 설명합니다."
    ],
    "keyPoints": [
      "단일 프로세스의 단점은 무엇이고 어떻게 개선할 수 있나요?",
      "단일",
      "프로세스",
      "시스템에"
    ]
  },
  {
    "version": 2,
    "categoryId": "os-concurrency",
    "sourceId": "be-116",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "스레드(Thread)의 등장과 특징",
    "evidenceQuote": "이러한 문제점을 해결하기 위해 등장한 것이 **스레드**입니다. 스레드는 한 프로세스 내에서 여러 작업을 동시에 실행할 수 있도록 도와줍니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-116-main",
    "kind": "main",
    "followUpOf": null,
    "question": "스레드는 어떤 역할을 하도록 등장했나요?",
    "choices": [
      "한 프로세스 내에서 여러 작업을 동시에 실행하도록 돕는다",
      "프로세스마다 디스크를 하나만 사용하도록 한다",
      "프로세스 간 데이터 공유를 금지한다",
      "CPU 실행을 완전히 중단한다"
    ],
    "correctIndex": 0,
    "explanation": "원문은 한 프로세스 내에서 여러 작업을 동시에 실행하도록 돕는다라고 설명합니다.",
    "followUpOrder": null,
    "followUpRole": null,
    "sourceAnchor": "스레드thread의-등장과-특징",
    "choiceFeedback": [
      "원문은 한 프로세스 내에서 여러 작업을 동시에 실행하도록 돕는다라고 설명합니다.",
      "“프로세스마다 디스크를 하나만 사용하도록 한다”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “한 프로세스 내에서 여러 작업을 동시에 실행하도록 돕는다”입니다.",
      "“프로세스 간 데이터 공유를 금지한다”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “한 프로세스 내에서 여러 작업을 동시에 실행하도록 돕는다”입니다.",
      "“CPU 실행을 완전히 중단한다”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “한 프로세스 내에서 여러 작업을 동시에 실행하도록 돕는다”입니다."
    ],
    "keyPoints": [
      "스레드(Thread)의 등장과 특징",
      "멀티",
      "태스킹",
      "시스템의"
    ]
  },
  {
    "version": 2,
    "categoryId": "os-concurrency",
    "sourceId": "be-116",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "스레드(Thread)의 등장과 특징",
    "evidenceQuote": "스레드는 동일 프로세스 내에서 메모리 영역(특히 Heap)을 공유하므로, 스레드 간의 컨텍스트 스위칭은 프로세스 간 스위칭보다 훨씬 가볍습니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-116-follow-up",
    "kind": "follow-up",
    "followUpOf": "quiz-be-116-main",
    "question": "be-116 원문에서 기본 개념 다음에 제시한 조건·영향 중 알맞은 것은 무엇인가요?",
    "choices": [
      "같은 프로세스의 스레드는 힙을 공유하므로 스레드 간 컨텍스트 스위칭이 프로세스 간보다 가볍다.",
      "스레드마다 힙 전체를 복제하므로 전환 비용이 더 크다.",
      "스레드는 프로세스와 달리 스택과 프로그램 카운터를 갖지 않는다.",
      "스레드 간 전환에는 항상 별도 프로세스 생성이 필요하다."
    ],
    "correctIndex": 0,
    "explanation": "원문의 근거는 같은 프로세스의 스레드는 힙을 공유하므로 스레드 간 컨텍스트 스위칭이 프로세스 간보다 가볍다.라는 판단을 뒷받침합니다.",
    "followUpOrder": 1,
    "followUpRole": "core",
    "sourceAnchor": "스레드thread의-등장과-특징",
    "choiceFeedback": [
      "원문의 근거는 같은 프로세스의 스레드는 힙을 공유하므로 스레드 간 컨텍스트 스위칭이 프로세스 간보다 가볍다.라는 판단을 뒷받침합니다.",
      "“스레드마다 힙 전체를 복제하므로 전환 비용이 더 크다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “같은 프로세스의 스레드는 힙을 공유하므로 스레드 간 컨텍스트 스위칭이 프로세스 간보다 가볍다.”입니다.",
      "“스레드는 프로세스와 달리 스택과 프로그램 카운터를 갖지 않는다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “같은 프로세스의 스레드는 힙을 공유하므로 스레드 간 컨텍스트 스위칭이 프로세스 간보다 가볍다.”입니다.",
      "“스레드 간 전환에는 항상 별도 프로세스 생성이 필요하다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “같은 프로세스의 스레드는 힙을 공유하므로 스레드 간 컨텍스트 스위칭이 프로세스 간보다 가볍다.”입니다."
    ],
    "keyPoints": [
      "스레드(Thread)의 등장과 특징",
      "멀티",
      "태스킹",
      "시스템의"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-116-follow-up-2",
    "kind": "follow-up",
    "followUpOf": "quiz-be-116-main",
    "followUpOrder": 2,
    "followUpRole": "core",
    "question": "멀티 태스킹 시스템의 한계 원문의 “본문” 구역과 일치하는 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.",
      "멀티 태스킹 시스템을 사용하더라도 아래와 같은 문제점이 남아 있습니다."
    ],
    "correctIndex": 3,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "os-concurrency",
    "sourceId": "be-116",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "멀티 태스킹 시스템을 사용하더라도 아래와 같은 문제점이 남아 있습니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “멀티 태스킹 시스템을 사용하더라도 아래와 같은 문제점이 남아 있습니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “멀티 태스킹 시스템을 사용하더라도 아래와 같은 문제점이 남아 있습니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “멀티 태스킹 시스템을 사용하더라도 아래와 같은 문제점이 남아 있습니다.”입니다.",
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다."
    ],
    "keyPoints": [
      "본문",
      "멀티",
      "태스킹",
      "시스템의"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-116-follow-up-3",
    "kind": "follow-up",
    "followUpOf": "quiz-be-116-main",
    "followUpOrder": 3,
    "followUpRole": "remediation",
    "question": "멀티 태스킹 시스템의 한계의 핵심 근거를 다시 확인할 때 옳은 설명은 무엇인가요?",
    "choices": [
      "**하나의 프로세스가 동시에 여러 작업을 수행하지 못함**",
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 0,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "os-concurrency",
    "sourceId": "be-116",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "**하나의 프로세스가 동시에 여러 작업을 수행하지 못함**",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “**하나의 프로세스가 동시에 여러 작업을 수행하지 못함**”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “**하나의 프로세스가 동시에 여러 작업을 수행하지 못함**”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “**하나의 프로세스가 동시에 여러 작업을 수행하지 못함**”입니다."
    ],
    "keyPoints": [
      "본문",
      "멀티",
      "태스킹",
      "시스템의"
    ]
  },
  {
    "version": 2,
    "categoryId": "os-concurrency",
    "sourceId": "be-118",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "evidenceQuote": "**가상화(Virtualization)** 란 하나의 물리적인 컴퓨팅 리소스를 논리적으로 분리하여 여러 개의 가상 리소스를 생성해 사용하는 기술을 의미합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-118-main",
    "kind": "main",
    "followUpOf": null,
    "question": "가상화란 무엇인가요?",
    "choices": [
      "가상 리소스를 물리 서버 하나로 합치는 기술",
      "모든 프로그램을 하나의 프로세스로 만드는 기술",
      "하나의 물리 컴퓨팅 리소스를 논리적으로 분리해 여러 가상 리소스를 만들어 사용하는 기술",
      "디스크를 암호화하는 기술"
    ],
    "correctIndex": 2,
    "explanation": "원문은 하나의 물리 컴퓨팅 리소스를 논리적으로 분리해 여러 가상 리소스를 만들어 사용하는 기술라고 설명합니다.",
    "followUpOrder": null,
    "followUpRole": null,
    "sourceAnchor": "content-answer",
    "choiceFeedback": [
      "“가상 리소스를 물리 서버 하나로 합치는 기술”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “하나의 물리 컴퓨팅 리소스를 논리적으로 분리해 여러 가상 리소스를 만들어 사용하는 기술”입니다.",
      "“모든 프로그램을 하나의 프로세스로 만드는 기술”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “하나의 물리 컴퓨팅 리소스를 논리적으로 분리해 여러 가상 리소스를 만들어 사용하는 기술”입니다.",
      "원문은 하나의 물리 컴퓨팅 리소스를 논리적으로 분리해 여러 가상 리소스를 만들어 사용하는 기술라고 설명합니다.",
      "“디스크를 암호화하는 기술”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “하나의 물리 컴퓨팅 리소스를 논리적으로 분리해 여러 가상 리소스를 만들어 사용하는 기술”입니다."
    ],
    "keyPoints": [
      "본문",
      "가상화에",
      "대해",
      "운영체제, 동시성과 런타임"
    ]
  },
  {
    "version": 2,
    "categoryId": "os-concurrency",
    "sourceId": "be-118",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "evidenceQuote": "서버, 스토리지, 네트워크 등 다양한 IT 리소스를 가상화할 수 있으며, 클라우드 컴퓨팅에 핵심이 되는 기술 중 하나로 활용됩니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-118-follow-up",
    "kind": "follow-up",
    "followUpOf": "quiz-be-118-main",
    "question": "be-118 원문에서 기본 개념 다음에 제시한 조건·영향 중 알맞은 것은 무엇인가요?",
    "choices": [
      "원문은 이 조건이 모든 상황에서 반대로 적용된다고 설명한다.",
      "원문은 이 결과가 아무 조건 없이 항상 발생한다고 설명한다.",
      "서버, 스토리지, 네트워크 등 다양한 IT 리소스를 가상화할 수 있으며, 클라우드 컴퓨팅에 핵심이 되는 기술 중 하나로 활용됩니다.",
      "원문은 이 판단에 원문 밖의 정보가 반드시 필요하다고 설명한다."
    ],
    "correctIndex": 2,
    "explanation": "원문의 근거는 서버, 스토리지, 네트워크 등 다양한 IT 리소스를 가상화할 수 있으며, 클라우드 컴퓨팅에 핵심이 되는 기술 중 하나로 활용됩니다.라는 판단을 뒷받침합니다.",
    "followUpOrder": 1,
    "followUpRole": "core",
    "sourceAnchor": "content-answer",
    "choiceFeedback": [
      "“원문은 이 조건이 모든 상황에서 반대로 적용된다고 설명한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “서버, 스토리지, 네트워크 등 다양한 IT 리소스를 가상화할 수 있으며, 클라우드 컴퓨팅에 핵심이 되는 기술 중 하나로 활용됩니다.”입니다.",
      "“원문은 이 결과가 아무 조건 없이 항상 발생한다고 설명한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “서버, 스토리지, 네트워크 등 다양한 IT 리소스를 가상화할 수 있으며, 클라우드 컴퓨팅에 핵심이 되는 기술 중 하나로 활용됩니다.”입니다.",
      "원문의 근거는 서버, 스토리지, 네트워크 등 다양한 IT 리소스를 가상화할 수 있으며, 클라우드 컴퓨팅에 핵심이 되는 기술 중 하나로 활용됩니다.라는 판단을 뒷받침합니다.",
      "“원문은 이 판단에 원문 밖의 정보가 반드시 필요하다고 설명한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “서버, 스토리지, 네트워크 등 다양한 IT 리소스를 가상화할 수 있으며, 클라우드 컴퓨팅에 핵심이 되는 기술 중 하나로 활용됩니다.”입니다."
    ],
    "keyPoints": [
      "본문",
      "가상화에",
      "대해",
      "운영체제, 동시성과 런타임"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-118-follow-up-2",
    "kind": "follow-up",
    "followUpOf": "quiz-be-118-main",
    "followUpOrder": 2,
    "followUpRole": "core",
    "question": "가상화 원문의 “가상화가 왜 필요한가요?” 구역과 일치하는 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "서버를 가상화할 경우 물리 서버에 여러 가상 서버를 배치하여 하드웨어 리소스를 효율적으로 사용할 수 있습니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 1,
    "explanation": "원문의 “가상화가 왜 필요한가요?” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "os-concurrency",
    "sourceId": "be-118",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "가상화가 왜 필요한가요?",
    "sourceAnchor": "가상화가-왜-필요한가요",
    "evidenceQuote": "서버를 가상화할 경우 물리 서버에 여러 가상 서버를 배치하여 하드웨어 리소스를 효율적으로 사용할 수 있습니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “서버를 가상화할 경우 물리 서버에 여러 가상 서버를 배치하여 하드웨어 리소스를 효율적으로 사용할 수 있습니다.”입니다.",
      "원문의 “가상화가 왜 필요한가요?” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “서버를 가상화할 경우 물리 서버에 여러 가상 서버를 배치하여 하드웨어 리소스를 효율적으로 사용할 수 있습니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “서버를 가상화할 경우 물리 서버에 여러 가상 서버를 배치하여 하드웨어 리소스를 효율적으로 사용할 수 있습니다.”입니다."
    ],
    "keyPoints": [
      "가상화가 왜 필요한가요?",
      "가상화에",
      "대해",
      "운영체제, 동시성과 런타임"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-118-follow-up-3",
    "kind": "follow-up",
    "followUpOf": "quiz-be-118-main",
    "followUpOrder": 3,
    "followUpRole": "remediation",
    "question": "가상화의 핵심 근거를 다시 확인할 때 옳은 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "물리적인 하드웨어 수를 줄일 수 있어 초기 구축 비용 및 유지 관리 비용을 절감할 수 있습니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 2,
    "explanation": "원문의 “가상화가 왜 필요한가요?” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "os-concurrency",
    "sourceId": "be-118",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "가상화가 왜 필요한가요?",
    "sourceAnchor": "가상화가-왜-필요한가요",
    "evidenceQuote": "물리적인 하드웨어 수를 줄일 수 있어 초기 구축 비용 및 유지 관리 비용을 절감할 수 있습니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “물리적인 하드웨어 수를 줄일 수 있어 초기 구축 비용 및 유지 관리 비용을 절감할 수 있습니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “물리적인 하드웨어 수를 줄일 수 있어 초기 구축 비용 및 유지 관리 비용을 절감할 수 있습니다.”입니다.",
      "원문의 “가상화가 왜 필요한가요?” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “물리적인 하드웨어 수를 줄일 수 있어 초기 구축 비용 및 유지 관리 비용을 절감할 수 있습니다.”입니다."
    ],
    "keyPoints": [
      "가상화가 왜 필요한가요?",
      "가상화에",
      "대해",
      "운영체제, 동시성과 런타임"
    ]
  },
  {
    "version": 2,
    "categoryId": "os-concurrency",
    "sourceId": "be-122",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "evidenceQuote": "**하나의 프로세스 내에서 여러 작업을 여러 쓰레드를 통해 동시에 실행**할 수 있도록 하는 방식입니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-122-main",
    "kind": "main",
    "followUpOf": null,
    "question": "멀티스레딩은 무엇을 통해 동시에 여러 작업을 실행하는 기법인가요?",
    "choices": [
      "서로 다른 데이터베이스의 여러 테이블",
      "하나의 프로세스 내의 여러 스레드",
      "여러 서버의 하나의 파일",
      "하나의 스레드만"
    ],
    "correctIndex": 1,
    "explanation": "원문은 하나의 프로세스 내의 여러 스레드라고 설명합니다.",
    "followUpOrder": null,
    "followUpRole": null,
    "sourceAnchor": "content-answer",
    "choiceFeedback": [
      "“서로 다른 데이터베이스의 여러 테이블”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “하나의 프로세스 내의 여러 스레드”입니다.",
      "원문은 하나의 프로세스 내의 여러 스레드라고 설명합니다.",
      "“여러 서버의 하나의 파일”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “하나의 프로세스 내의 여러 스레드”입니다.",
      "“하나의 스레드만”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “하나의 프로세스 내의 여러 스레드”입니다."
    ],
    "keyPoints": [
      "본문",
      "멀티",
      "쓰레딩에",
      "대해서"
    ]
  },
  {
    "version": 2,
    "categoryId": "os-concurrency",
    "sourceId": "be-122",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "멀티쓰레딩(Multi-Thread)의 주요 특징",
    "evidenceQuote": "스레드 간의 데이터 공유는 IPC와 같은 복잡한 메커니즘 없이도 이루어지지만, 동시에 접근할 경우 동기화 문제는 여전히 존재합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-122-follow-up",
    "kind": "follow-up",
    "followUpOf": "quiz-be-122-main",
    "question": "be-122 원문에서 기본 개념 다음에 제시한 조건·영향 중 알맞은 것은 무엇인가요?",
    "choices": [
      "스레드는 메모리를 공유하지 않으므로 동기화가 전혀 필요 없다.",
      "스레드 간 데이터 공유는 동기화 문제를 여전히 만들 수 있다.",
      "스레드 간 데이터 공유는 IPC가 반드시 있어야만 가능하다.",
      "동기화 문제는 멀티스레딩에서만 자동으로 제거된다."
    ],
    "correctIndex": 1,
    "explanation": "원문의 근거는 스레드 간 데이터 공유는 동기화 문제를 여전히 만들 수 있다.라는 판단을 뒷받침합니다.",
    "followUpOrder": 1,
    "followUpRole": "core",
    "sourceAnchor": "멀티쓰레딩multi-thread의-주요-특징",
    "choiceFeedback": [
      "“스레드는 메모리를 공유하지 않으므로 동기화가 전혀 필요 없다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “스레드 간 데이터 공유는 동기화 문제를 여전히 만들 수 있다.”입니다.",
      "원문의 근거는 스레드 간 데이터 공유는 동기화 문제를 여전히 만들 수 있다.라는 판단을 뒷받침합니다.",
      "“스레드 간 데이터 공유는 IPC가 반드시 있어야만 가능하다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “스레드 간 데이터 공유는 동기화 문제를 여전히 만들 수 있다.”입니다.",
      "“동기화 문제는 멀티스레딩에서만 자동으로 제거된다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “스레드 간 데이터 공유는 동기화 문제를 여전히 만들 수 있다.”입니다."
    ],
    "keyPoints": [
      "멀티쓰레딩(Multi-Thread)의 주요 특징",
      "멀티",
      "쓰레딩에",
      "대해서"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-122-follow-up-2",
    "kind": "follow-up",
    "followUpOf": "quiz-be-122-main",
    "followUpOrder": 2,
    "followUpRole": "core",
    "question": "멀티 쓰레딩 원문의 “본문” 구역과 일치하는 설명은 무엇인가요?",
    "choices": [
      "멀티쓰레딩은 여러 프로세스가 동시에 실행되는 멀티 태스킹과 달리",
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 0,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "os-concurrency",
    "sourceId": "be-122",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "멀티쓰레딩은 여러 프로세스가 동시에 실행되는 멀티 태스킹과 달리",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “멀티쓰레딩은 여러 프로세스가 동시에 실행되는 멀티 태스킹과 달리”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “멀티쓰레딩은 여러 프로세스가 동시에 실행되는 멀티 태스킹과 달리”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “멀티쓰레딩은 여러 프로세스가 동시에 실행되는 멀티 태스킹과 달리”입니다."
    ],
    "keyPoints": [
      "본문",
      "멀티",
      "쓰레딩에",
      "대해서"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-122-follow-up-3",
    "kind": "follow-up",
    "followUpOf": "quiz-be-122-main",
    "followUpOrder": 3,
    "followUpRole": "remediation",
    "question": "멀티 쓰레딩의 핵심 근거를 다시 확인할 때 옳은 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "낮은 오버헤드: 스레드는 같은 프로세스 내에서 실행되므로, 프로세스 간의 컨텍스트 스위칭에 비해 스레드 간 전환은 훨씬 가볍고 빠릅니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 1,
    "explanation": "원문의 “멀티쓰레딩(Multi-Thread)의 주요 특징” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "os-concurrency",
    "sourceId": "be-122",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "멀티쓰레딩(Multi-Thread)의 주요 특징",
    "sourceAnchor": "멀티쓰레딩multi-thread의-주요-특징",
    "evidenceQuote": "낮은 오버헤드: 스레드는 같은 프로세스 내에서 실행되므로, 프로세스 간의 컨텍스트 스위칭에 비해 스레드 간 전환은 훨씬 가볍고 빠릅니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “낮은 오버헤드: 스레드는 같은 프로세스 내에서 실행되므로, 프로세스 간의 컨텍스트 스위칭에 비해 스레드 간 전환은 훨씬 가볍고 빠릅니다.”입니다.",
      "원문의 “멀티쓰레딩(Multi-Thread)의 주요 특징” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “낮은 오버헤드: 스레드는 같은 프로세스 내에서 실행되므로, 프로세스 간의 컨텍스트 스위칭에 비해 스레드 간 전환은 훨씬 가볍고 빠릅니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “낮은 오버헤드: 스레드는 같은 프로세스 내에서 실행되므로, 프로세스 간의 컨텍스트 스위칭에 비해 스레드 간 전환은 훨씬 가볍고 빠릅니다.”입니다."
    ],
    "keyPoints": [
      "멀티쓰레딩(Multi-Thread)의 주요 특징",
      "멀티",
      "쓰레딩에",
      "대해서"
    ]
  },
  {
    "version": 2,
    "categoryId": "os-concurrency",
    "sourceId": "be-124",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "evidenceQuote": "**Serial GC**는 JDK에 도입된 최초의 가바지 컬렉터이며, 단일 스레드로 동작하는 가장 단순한 형태입니다. 작은 힙 메모리와 단일 CPU 환경에 적합하며 Stop-The-World 시간이 가장 길게 발생합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-124-main",
    "kind": "main",
    "followUpOf": null,
    "question": "Serial GC는 어떤 환경에 적합하다고 원문이 설명하나요?",
    "choices": [
      "대형 힙과 다중 CPU 환경만",
      "네트워크가 없는 환경만",
      "디스크가 없는 환경만",
      "작은 힙 메모리와 단일 CPU 환경"
    ],
    "correctIndex": 3,
    "explanation": "원문은 작은 힙 메모리와 단일 CPU 환경라고 설명합니다.",
    "followUpOrder": null,
    "followUpRole": null,
    "sourceAnchor": "content-answer",
    "choiceFeedback": [
      "“대형 힙과 다중 CPU 환경만”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “작은 힙 메모리와 단일 CPU 환경”입니다.",
      "“네트워크가 없는 환경만”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “작은 힙 메모리와 단일 CPU 환경”입니다.",
      "“디스크가 없는 환경만”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “작은 힙 메모리와 단일 CPU 환경”입니다.",
      "원문은 작은 힙 메모리와 단일 CPU 환경라고 설명합니다."
    ],
    "keyPoints": [
      "본문",
      "GC",
      "알고리즘은",
      "어떤"
    ]
  },
  {
    "version": 2,
    "categoryId": "os-concurrency",
    "sourceId": "be-124",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "evidenceQuote": "**Parallel GC**는 Java 5부터 8까지 **default** 가비지 컬렉터로 사용되었으며, Serial GC와 달리 Young 영역의 GC를 멀티 스레드로 수행합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-124-follow-up",
    "kind": "follow-up",
    "followUpOf": "quiz-be-124-main",
    "question": "be-124 원문에서 기본 개념 다음에 제시한 조건·영향 중 알맞은 것은 무엇인가요?",
    "choices": [
      "원문은 이 조건이 모든 상황에서 반대로 적용된다고 설명한다.",
      "원문은 이 결과가 아무 조건 없이 항상 발생한다고 설명한다.",
      "원문은 이 판단에 원문 밖의 정보가 반드시 필요하다고 설명한다.",
      "**Parallel GC**는 Java 5부터 8까지 **default** 가비지 컬렉터로 사용되었으며, Serial GC와 달리 Young 영역의 GC를 멀티 스레드로 수행합니다."
    ],
    "correctIndex": 3,
    "explanation": "원문의 근거는 **Parallel GC**는 Java 5부터 8까지 **default** 가비지 컬렉터로 사용되었으며, Serial GC와 달리 Young 영역의 GC를 멀티 스레드로 수행합니다.라는 판단을 뒷받침합니다.",
    "followUpOrder": 1,
    "followUpRole": "core",
    "sourceAnchor": "content-answer",
    "choiceFeedback": [
      "“원문은 이 조건이 모든 상황에서 반대로 적용된다고 설명한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “**Parallel GC**는 Java 5부터 8까지 **default** 가비지 컬렉터로 사용되었으며, Serial GC와 달리 Young 영역의 GC를 멀티 스레드로 수행합니다.”입니다.",
      "“원문은 이 결과가 아무 조건 없이 항상 발생한다고 설명한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “**Parallel GC**는 Java 5부터 8까지 **default** 가비지 컬렉터로 사용되었으며, Serial GC와 달리 Young 영역의 GC를 멀티 스레드로 수행합니다.”입니다.",
      "“원문은 이 판단에 원문 밖의 정보가 반드시 필요하다고 설명한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “**Parallel GC**는 Java 5부터 8까지 **default** 가비지 컬렉터로 사용되었으며, Serial GC와 달리 Young 영역의 GC를 멀티 스레드로 수행합니다.”입니다.",
      "원문의 근거는 **Parallel GC**는 Java 5부터 8까지 **default** 가비지 컬렉터로 사용되었으며, Serial GC와 달리 Young 영역의 GC를 멀티 스레드로 수행합니다.라는 판단을 뒷받침합니다."
    ],
    "keyPoints": [
      "본문",
      "GC",
      "알고리즘은",
      "어떤"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-124-follow-up-2",
    "kind": "follow-up",
    "followUpOf": "quiz-be-124-main",
    "followUpOrder": 2,
    "followUpRole": "core",
    "question": "GC 알고리즘은 어떤 것이 있나요 원문의 “본문” 구역과 일치하는 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "높은 처리량에 초점을 두기 때문에 Throughput GC라고도 불립니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 2,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "os-concurrency",
    "sourceId": "be-124",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "높은 처리량에 초점을 두기 때문에 Throughput GC라고도 불립니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “높은 처리량에 초점을 두기 때문에 Throughput GC라고도 불립니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “높은 처리량에 초점을 두기 때문에 Throughput GC라고도 불립니다.”입니다.",
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “높은 처리량에 초점을 두기 때문에 Throughput GC라고도 불립니다.”입니다."
    ],
    "keyPoints": [
      "본문",
      "GC",
      "알고리즘은",
      "어떤"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-124-follow-up-3",
    "kind": "follow-up",
    "followUpOf": "quiz-be-124-main",
    "followUpOrder": 3,
    "followUpRole": "remediation",
    "question": "GC 알고리즘은 어떤 것이 있나요의 핵심 근거를 다시 확인할 때 옳은 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.",
      "**Parallel Old GC**는 Parallel GC의 향상된 버전으로, Old 영역에서도 멀티 스레드를 활용하여 GC를 수행합니다."
    ],
    "correctIndex": 3,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "os-concurrency",
    "sourceId": "be-124",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "**Parallel Old GC**는 Parallel GC의 향상된 버전으로, Old 영역에서도 멀티 스레드를 활용하여 GC를 수행합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “**Parallel Old GC**는 Parallel GC의 향상된 버전으로, Old 영역에서도 멀티 스레드를 활용하여 GC를 수행합니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “**Parallel Old GC**는 Parallel GC의 향상된 버전으로, Old 영역에서도 멀티 스레드를 활용하여 GC를 수행합니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “**Parallel Old GC**는 Parallel GC의 향상된 버전으로, Old 영역에서도 멀티 스레드를 활용하여 GC를 수행합니다.”입니다.",
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다."
    ],
    "keyPoints": [
      "본문",
      "GC",
      "알고리즘은",
      "어떤"
    ]
  },
  {
    "version": 2,
    "categoryId": "os-concurrency",
    "sourceId": "be-125",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "evidenceQuote": "**가상 메모리 관리 기법(Virtual Memory Management)** 은 프로그램의 일부만을 메모리에 적재하여 실제 사용 가능한 물리 메모리 양보다 큰 프로세스를 실행할 수 있도록 하는 기법입니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-125-main",
    "kind": "main",
    "followUpOf": null,
    "question": "가상 메모리 관리 기법은 어떤 효과를 제공하나요?",
    "choices": [
      "프로그램 일부만 메모리에 적재해 물리 메모리보다 큰 프로세스를 실행할 수 있게 한다",
      "모든 프로그램을 항상 메모리에 올린다",
      "물리 메모리 사용을 중지한다",
      "프로세스 실행을 금지한다"
    ],
    "correctIndex": 0,
    "explanation": "원문은 프로그램 일부만 메모리에 적재해 물리 메모리보다 큰 프로세스를 실행할 수 있게 한다라고 설명합니다.",
    "followUpOrder": null,
    "followUpRole": null,
    "sourceAnchor": "content-answer",
    "choiceFeedback": [
      "원문은 프로그램 일부만 메모리에 적재해 물리 메모리보다 큰 프로세스를 실행할 수 있게 한다라고 설명합니다.",
      "“모든 프로그램을 항상 메모리에 올린다”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “프로그램 일부만 메모리에 적재해 물리 메모리보다 큰 프로세스를 실행할 수 있게 한다”입니다.",
      "“물리 메모리 사용을 중지한다”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “프로그램 일부만 메모리에 적재해 물리 메모리보다 큰 프로세스를 실행할 수 있게 한다”입니다.",
      "“프로세스 실행을 금지한다”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “프로그램 일부만 메모리에 적재해 물리 메모리보다 큰 프로세스를 실행할 수 있게 한다”입니다."
    ],
    "keyPoints": [
      "본문",
      "페이지",
      "교체",
      "알고리즘에"
    ]
  },
  {
    "version": 2,
    "categoryId": "os-concurrency",
    "sourceId": "be-125",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "evidenceQuote": "프로세스를 메모리에 적재할 때, 실제로 필요할 때만 페이지를 메모리에 적재하는 것을 **요구 페이징(Demand Paging)** 이라 하는데요. 요구 페이징을 사용하는 운영체제에서 새로운 페이지를 할당하려고 하는데, 공간이 부족한 경우 메모리에 존재하는 다른 페이지와 신규 페이지를 교체해야합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-125-follow-up",
    "kind": "follow-up",
    "followUpOf": "quiz-be-125-main",
    "question": "be-125 원문에서 기본 개념 다음에 제시한 조건·영향 중 알맞은 것은 무엇인가요?",
    "choices": [
      "프로세스를 메모리에 적재할 때, 실제로 필요할 때만 페이지를 메모리에 적재하는 것을 **요구 페이징(Demand Paging)** 이라 하는데요. 요구 페이징을 사용하는 운영체제에서 새로운 페이지를 할당하려고 하는데, 공간이 부족한 경우 메모리에 존재하는 다른 페이지와 신규 페이지를 교체해야합니다.",
      "원문은 이 조건이 모든 상황에서 반대로 적용된다고 설명한다.",
      "원문은 이 결과가 아무 조건 없이 항상 발생한다고 설명한다.",
      "원문은 이 판단에 원문 밖의 정보가 반드시 필요하다고 설명한다."
    ],
    "correctIndex": 0,
    "explanation": "원문의 근거는 프로세스를 메모리에 적재할 때, 실제로 필요할 때만 페이지를 메모리에 적재하는 것을 **요구 페이징(Demand Paging)** 이라 하는데요. 요구 페이징을 사용하는 운영체제에서 새로운 페이지를 할당하려고 하는데, 공간이 부족한 경우 메모리에 존재하는 다른 페이지와 신규 페이지를 교체해야합니다.라는 판단을 뒷받침합니다.",
    "followUpOrder": 1,
    "followUpRole": "core",
    "sourceAnchor": "content-answer",
    "choiceFeedback": [
      "원문의 근거는 프로세스를 메모리에 적재할 때, 실제로 필요할 때만 페이지를 메모리에 적재하는 것을 **요구 페이징(Demand Paging)** 이라 하는데요. 요구 페이징을 사용하는 운영체제에서 새로운 페이지를 할당하려고 하는데, 공간이 부족한 경우 메모리에 존재하는 다른 페이지와 신규 페이지를 교체해야합니다.라는 판단을 뒷받침합니다.",
      "“원문은 이 조건이 모든 상황에서 반대로 적용된다고 설명한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “프로세스를 메모리에 적재할 때, 실제로 필요할 때만 페이지를 메모리에 적재하는 것을 **요구 페이징(Demand Paging)** 이라 하는데요. 요구 페이징을 사용하는 운영체제에서 새로운 페이지를 할당하려고 하는데, 공간이 부족한 경우 메모리에 존재하는 다른 페이지와 신규 페이지를 교체해야합니다.”입니다.",
      "“원문은 이 결과가 아무 조건 없이 항상 발생한다고 설명한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “프로세스를 메모리에 적재할 때, 실제로 필요할 때만 페이지를 메모리에 적재하는 것을 **요구 페이징(Demand Paging)** 이라 하는데요. 요구 페이징을 사용하는 운영체제에서 새로운 페이지를 할당하려고 하는데, 공간이 부족한 경우 메모리에 존재하는 다른 페이지와 신규 페이지를 교체해야합니다.”입니다.",
      "“원문은 이 판단에 원문 밖의 정보가 반드시 필요하다고 설명한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “프로세스를 메모리에 적재할 때, 실제로 필요할 때만 페이지를 메모리에 적재하는 것을 **요구 페이징(Demand Paging)** 이라 하는데요. 요구 페이징을 사용하는 운영체제에서 새로운 페이지를 할당하려고 하는데, 공간이 부족한 경우 메모리에 존재하는 다른 페이지와 신규 페이지를 교체해야합니다.”입니다."
    ],
    "keyPoints": [
      "본문",
      "페이지",
      "교체",
      "알고리즘에"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-125-follow-up-2",
    "kind": "follow-up",
    "followUpOf": "quiz-be-125-main",
    "followUpOrder": 2,
    "followUpRole": "core",
    "question": "페이지 교체 알고리즘 원문의 “본문” 구역과 일치하는 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.",
      "그리고, 가상 메모리 관리 기법 중 하나인 페이징은 메모리의 물리 주소 공간을 프레임 단위로 나눈 이후, 프로세스의 논리 주소 공간을 페이지로 나누어 프레임에 할당하는 방식입니다."
    ],
    "correctIndex": 3,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "os-concurrency",
    "sourceId": "be-125",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "그리고, 가상 메모리 관리 기법 중 하나인 페이징은 메모리의 물리 주소 공간을 프레임 단위로 나눈 이후, 프로세스의 논리 주소 공간을 페이지로 나누어 프레임에 할당하는 방식입니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “그리고, 가상 메모리 관리 기법 중 하나인 페이징은 메모리의 물리 주소 공간을 프레임 단위로 나눈 이후, 프로세스의 논리 주소 공간을 페이지로 나누어 프레임에 할당하는 방식입니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “그리고, 가상 메모리 관리 기법 중 하나인 페이징은 메모리의 물리 주소 공간을 프레임 단위로 나눈 이후, 프로세스의 논리 주소 공간을 페이지로 나누어 프레임에 할당하는 방식입니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “그리고, 가상 메모리 관리 기법 중 하나인 페이징은 메모리의 물리 주소 공간을 프레임 단위로 나눈 이후, 프로세스의 논리 주소 공간을 페이지로 나누어 프레임에 할당하는 방식입니다.”입니다.",
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다."
    ],
    "keyPoints": [
      "본문",
      "페이지",
      "교체",
      "알고리즘에"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-125-follow-up-3",
    "kind": "follow-up",
    "followUpOf": "quiz-be-125-main",
    "followUpOrder": 3,
    "followUpRole": "remediation",
    "question": "페이지 교체 알고리즘의 핵심 근거를 다시 확인할 때 옳은 설명은 무엇인가요?",
    "choices": [
      "이때, 교체 대상을 결정하는 방법을 **페이지 교체 알고리즘(Page Replacement Algorithm)** 라고 합니다.",
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 0,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "os-concurrency",
    "sourceId": "be-125",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "이때, 교체 대상을 결정하는 방법을 **페이지 교체 알고리즘(Page Replacement Algorithm)** 라고 합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “이때, 교체 대상을 결정하는 방법을 **페이지 교체 알고리즘(Page Replacement Algorithm)** 라고 합니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “이때, 교체 대상을 결정하는 방법을 **페이지 교체 알고리즘(Page Replacement Algorithm)** 라고 합니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “이때, 교체 대상을 결정하는 방법을 **페이지 교체 알고리즘(Page Replacement Algorithm)** 라고 합니다.”입니다."
    ],
    "keyPoints": [
      "본문",
      "페이지",
      "교체",
      "알고리즘에"
    ]
  },
  {
    "version": 2,
    "categoryId": "os-concurrency",
    "sourceId": "be-133",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "evidenceQuote": "**ThreadLocal**은 Java에서 각 스레드마다 독립적인 변수를 저장할 수 있도록 도와주는 클래스입니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-133-main",
    "kind": "main",
    "followUpOf": null,
    "question": "ThreadLocal은 무엇을 저장하도록 돕나요?",
    "choices": [
      "모든 스레드가 공유하는 변수만",
      "프로세스마다 하나의 파일만",
      "캐시 서버의 키만",
      "각 스레드마다 독립적인 변수"
    ],
    "correctIndex": 3,
    "explanation": "원문은 각 스레드마다 독립적인 변수라고 설명합니다.",
    "followUpOrder": null,
    "followUpRole": null,
    "sourceAnchor": "content-answer",
    "choiceFeedback": [
      "“모든 스레드가 공유하는 변수만”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “각 스레드마다 독립적인 변수”입니다.",
      "“프로세스마다 하나의 파일만”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “각 스레드마다 독립적인 변수”입니다.",
      "“캐시 서버의 키만”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “각 스레드마다 독립적인 변수”입니다.",
      "원문은 각 스레드마다 독립적인 변수라고 설명합니다."
    ],
    "keyPoints": [
      "본문",
      "ThreadLocal에",
      "대해",
      "운영체제, 동시성과 런타임"
    ]
  },
  {
    "version": 2,
    "categoryId": "os-concurrency",
    "sourceId": "be-133",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "evidenceQuote": "보통 여러 스레드가 공유 자원을 사용하면 동시성 문제가 발생할 수 있는데, ThreadLocal을 사용하면 스레드별로 데이터를 분리할 수 있어 동기화 없이 안전하게 활용할 수 있습니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-133-follow-up",
    "kind": "follow-up",
    "followUpOf": "quiz-be-133-main",
    "question": "be-133 원문에서 기본 개념 다음에 제시한 조건·영향 중 알맞은 것은 무엇인가요?",
    "choices": [
      "원문은 이 조건이 모든 상황에서 반대로 적용된다고 설명한다.",
      "원문은 이 결과가 아무 조건 없이 항상 발생한다고 설명한다.",
      "원문은 이 판단에 원문 밖의 정보가 반드시 필요하다고 설명한다.",
      "보통 여러 스레드가 공유 자원을 사용하면 동시성 문제가 발생할 수 있는데, ThreadLocal을 사용하면 스레드별로 데이터를 분리할 수 있어 동기화 없이 안전하게 활용할 수 있습니다."
    ],
    "correctIndex": 3,
    "explanation": "원문의 근거는 보통 여러 스레드가 공유 자원을 사용하면 동시성 문제가 발생할 수 있는데, ThreadLocal을 사용하면 스레드별로 데이터를 분리할 수 있어 동기화 없이 안전하게 활용할 수 있습니다.라는 판단을 뒷받침합니다.",
    "followUpOrder": 1,
    "followUpRole": "core",
    "sourceAnchor": "content-answer",
    "choiceFeedback": [
      "“원문은 이 조건이 모든 상황에서 반대로 적용된다고 설명한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “보통 여러 스레드가 공유 자원을 사용하면 동시성 문제가 발생할 수 있는데, ThreadLocal을 사용하면 스레드별로 데이터를 분리할 수 있어 동기화 없이 안전하게 활용할 수 있습니다.”입니다.",
      "“원문은 이 결과가 아무 조건 없이 항상 발생한다고 설명한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “보통 여러 스레드가 공유 자원을 사용하면 동시성 문제가 발생할 수 있는데, ThreadLocal을 사용하면 스레드별로 데이터를 분리할 수 있어 동기화 없이 안전하게 활용할 수 있습니다.”입니다.",
      "“원문은 이 판단에 원문 밖의 정보가 반드시 필요하다고 설명한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “보통 여러 스레드가 공유 자원을 사용하면 동시성 문제가 발생할 수 있는데, ThreadLocal을 사용하면 스레드별로 데이터를 분리할 수 있어 동기화 없이 안전하게 활용할 수 있습니다.”입니다.",
      "원문의 근거는 보통 여러 스레드가 공유 자원을 사용하면 동시성 문제가 발생할 수 있는데, ThreadLocal을 사용하면 스레드별로 데이터를 분리할 수 있어 동기화 없이 안전하게 활용할 수 있습니다.라는 판단을 뒷받침합니다."
    ],
    "keyPoints": [
      "본문",
      "ThreadLocal에",
      "대해",
      "운영체제, 동시성과 런타임"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-133-follow-up-2",
    "kind": "follow-up",
    "followUpOf": "quiz-be-133-main",
    "followUpOrder": 2,
    "followUpRole": "core",
    "question": "ThreadLocal 원문의 “본문” 구역과 일치하는 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "각 스레드는 자신만의 ThreadLocalMap을 가지고 있고 ThreadLocal을 키로 사용하여 값을 저장합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 2,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "os-concurrency",
    "sourceId": "be-133",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "각 스레드는 자신만의 ThreadLocalMap을 가지고 있고 ThreadLocal을 키로 사용하여 값을 저장합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “각 스레드는 자신만의 ThreadLocalMap을 가지고 있고 ThreadLocal을 키로 사용하여 값을 저장합니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “각 스레드는 자신만의 ThreadLocalMap을 가지고 있고 ThreadLocal을 키로 사용하여 값을 저장합니다.”입니다.",
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “각 스레드는 자신만의 ThreadLocalMap을 가지고 있고 ThreadLocal을 키로 사용하여 값을 저장합니다.”입니다."
    ],
    "keyPoints": [
      "본문",
      "ThreadLocal에",
      "대해",
      "운영체제, 동시성과 런타임"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-133-follow-up-3",
    "kind": "follow-up",
    "followUpOf": "quiz-be-133-main",
    "followUpOrder": 3,
    "followUpRole": "remediation",
    "question": "ThreadLocal의 핵심 근거를 다시 확인할 때 옳은 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.",
      "즉, 하나의 스레드에서 여러 개의 ThreadLocal을 사용할 수 있으며,"
    ],
    "correctIndex": 3,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "os-concurrency",
    "sourceId": "be-133",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "즉, 하나의 스레드에서 여러 개의 ThreadLocal을 사용할 수 있으며,",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “즉, 하나의 스레드에서 여러 개의 ThreadLocal을 사용할 수 있으며,”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “즉, 하나의 스레드에서 여러 개의 ThreadLocal을 사용할 수 있으며,”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “즉, 하나의 스레드에서 여러 개의 ThreadLocal을 사용할 수 있으며,”입니다.",
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다."
    ],
    "keyPoints": [
      "본문",
      "ThreadLocal에",
      "대해",
      "운영체제, 동시성과 런타임"
    ]
  },
  {
    "version": 2,
    "categoryId": "os-concurrency",
    "sourceId": "be-134",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "evidenceQuote": "**스레드 풀 포화 정책(Saturation Policies)** 이란 말 그대로 스레드 풀이 포화 상태인 경우의 행동을 결정하는 정책을 의미합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-134-main",
    "kind": "main",
    "followUpOf": null,
    "question": "스레드 풀 포화 정책은 무엇을 결정하나요?",
    "choices": [
      "스레드 풀이 포화 상태일 때의 행동",
      "스레드 이름만",
      "JVM 버전만",
      "네트워크 포트만"
    ],
    "correctIndex": 0,
    "explanation": "원문은 스레드 풀이 포화 상태일 때의 행동라고 설명합니다.",
    "followUpOrder": null,
    "followUpRole": null,
    "sourceAnchor": "content-answer",
    "choiceFeedback": [
      "원문은 스레드 풀이 포화 상태일 때의 행동라고 설명합니다.",
      "“스레드 이름만”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “스레드 풀이 포화 상태일 때의 행동”입니다.",
      "“JVM 버전만”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “스레드 풀이 포화 상태일 때의 행동”입니다.",
      "“네트워크 포트만”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “스레드 풀이 포화 상태일 때의 행동”입니다."
    ],
    "keyPoints": [
      "본문",
      "스레드",
      "포화",
      "정책이란"
    ]
  },
  {
    "version": 2,
    "categoryId": "os-concurrency",
    "sourceId": "be-134",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "포화 정책의 종류에는 무엇이 존재하나요?",
    "evidenceQuote": "포화 정책 종류는 RejectedExecutionHandler의 구현체를 기준으로 AbortPolicy, CallerRunsPolicy, DiscardOldestPolicy, DiscardPolicy가 존재합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-134-follow-up",
    "kind": "follow-up",
    "followUpOf": "quiz-be-134-main",
    "question": "be-134 원문에서 기본 개념 다음에 제시한 조건·영향 중 알맞은 것은 무엇인가요?",
    "choices": [
      "포화 정책 종류는 RejectedExecutionHandler의 구현체를 기준으로 AbortPolicy, CallerRunsPolicy, DiscardOldestPolicy, DiscardPolicy가 존재합니다.",
      "원문은 이 조건이 모든 상황에서 반대로 적용된다고 설명한다.",
      "원문은 이 결과가 아무 조건 없이 항상 발생한다고 설명한다.",
      "원문은 이 판단에 원문 밖의 정보가 반드시 필요하다고 설명한다."
    ],
    "correctIndex": 0,
    "explanation": "원문의 근거는 포화 정책 종류는 RejectedExecutionHandler의 구현체를 기준으로 AbortPolicy, CallerRunsPolicy, DiscardOldestPolicy, DiscardPolicy가 존재합니다.라는 판단을 뒷받침합니다.",
    "followUpOrder": 1,
    "followUpRole": "core",
    "sourceAnchor": "포화-정책의-종류에는-무엇이-존재하나요",
    "choiceFeedback": [
      "원문의 근거는 포화 정책 종류는 RejectedExecutionHandler의 구현체를 기준으로 AbortPolicy, CallerRunsPolicy, DiscardOldestPolicy, DiscardPolicy가 존재합니다.라는 판단을 뒷받침합니다.",
      "“원문은 이 조건이 모든 상황에서 반대로 적용된다고 설명한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “포화 정책 종류는 RejectedExecutionHandler의 구현체를 기준으로 AbortPolicy, CallerRunsPolicy, DiscardOldestPolicy, DiscardPolicy가 존재합니다.”입니다.",
      "“원문은 이 결과가 아무 조건 없이 항상 발생한다고 설명한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “포화 정책 종류는 RejectedExecutionHandler의 구현체를 기준으로 AbortPolicy, CallerRunsPolicy, DiscardOldestPolicy, DiscardPolicy가 존재합니다.”입니다.",
      "“원문은 이 판단에 원문 밖의 정보가 반드시 필요하다고 설명한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “포화 정책 종류는 RejectedExecutionHandler의 구현체를 기준으로 AbortPolicy, CallerRunsPolicy, DiscardOldestPolicy, DiscardPolicy가 존재합니다.”입니다."
    ],
    "keyPoints": [
      "포화 정책의 종류에는 무엇이 존재하나요?",
      "스레드",
      "포화",
      "정책이란"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-134-follow-up-2",
    "kind": "follow-up",
    "followUpOf": "quiz-be-134-main",
    "followUpOrder": 2,
    "followUpRole": "core",
    "question": "스레드 풀 포화 정책이란 무엇인가요 원문의 “본문” 구역과 일치하는 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.",
      "자바의 ThreadPoolExecutor를 기준으로 설명해 드리겠습니다."
    ],
    "correctIndex": 3,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "os-concurrency",
    "sourceId": "be-134",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "자바의 ThreadPoolExecutor를 기준으로 설명해 드리겠습니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “자바의 ThreadPoolExecutor를 기준으로 설명해 드리겠습니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “자바의 ThreadPoolExecutor를 기준으로 설명해 드리겠습니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “자바의 ThreadPoolExecutor를 기준으로 설명해 드리겠습니다.”입니다.",
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다."
    ],
    "keyPoints": [
      "본문",
      "스레드",
      "포화",
      "정책이란"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-134-follow-up-3",
    "kind": "follow-up",
    "followUpOf": "quiz-be-134-main",
    "followUpOrder": 3,
    "followUpRole": "remediation",
    "question": "스레드 풀 포화 정책이란 무엇인가요의 핵심 근거를 다시 확인할 때 옳은 설명은 무엇인가요?",
    "choices": [
      "ThreadPoolExecutor 설정에는 상시 유지하는 스레드의 수인 corePoolSize, 작업 대기열 크기인 workQueueSize, 스레드를 추가할 수 있는 최대 수인 maxPoolSize가 존재하는데요.",
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 0,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "os-concurrency",
    "sourceId": "be-134",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "ThreadPoolExecutor 설정에는 상시 유지하는 스레드의 수인 corePoolSize, 작업 대기열 크기인 workQueueSize, 스레드를 추가할 수 있는 최대 수인 maxPoolSize가 존재하는데요.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “ThreadPoolExecutor 설정에는 상시 유지하는 스레드의 수인 corePoolSize, 작업 대기열 크기인 workQueueSize, 스레드를 추가할 수 있는 최대 수인 maxPoolSize가 존재하는데요.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “ThreadPoolExecutor 설정에는 상시 유지하는 스레드의 수인 corePoolSize, 작업 대기열 크기인 workQueueSize, 스레드를 추가할 수 있는 최대 수인 maxPoolSize가 존재하는데요.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “ThreadPoolExecutor 설정에는 상시 유지하는 스레드의 수인 corePoolSize, 작업 대기열 크기인 workQueueSize, 스레드를 추가할 수 있는 최대 수인 maxPoolSize가 존재하는데요.”입니다."
    ],
    "keyPoints": [
      "본문",
      "스레드",
      "포화",
      "정책이란"
    ]
  },
  {
    "version": 2,
    "categoryId": "os-concurrency",
    "sourceId": "be-145",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "evidenceQuote": "**참조 지역성의 원리(Locality of reference)** 는 CPU가 메모리에 접근할 때 주된 경향을 바탕으로 만들어진 원리며, 주로 캐시 메모리의 적중률을 높여 CPU의 메모리 접근 횟수를 줄이는 데 이용됩니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-145-main",
    "kind": "main",
    "followUpOf": null,
    "question": "참조 지역성의 원리는 주로 어디에 이용되나요?",
    "choices": [
      "스레드 수를 무한히 늘리는 데",
      "디스크를 포맷하는 데",
      "캐시 메모리 적중률을 높여 CPU의 메모리 접근 횟수를 줄이는 데",
      "프로세스를 종료하는 데"
    ],
    "correctIndex": 2,
    "explanation": "원문은 캐시 메모리 적중률을 높여 CPU의 메모리 접근 횟수를 줄이는 데라고 설명합니다.",
    "followUpOrder": null,
    "followUpRole": null,
    "sourceAnchor": "content-answer",
    "choiceFeedback": [
      "“스레드 수를 무한히 늘리는 데”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “캐시 메모리 적중률을 높여 CPU의 메모리 접근 횟수를 줄이는 데”입니다.",
      "“디스크를 포맷하는 데”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “캐시 메모리 적중률을 높여 CPU의 메모리 접근 횟수를 줄이는 데”입니다.",
      "원문은 캐시 메모리 적중률을 높여 CPU의 메모리 접근 횟수를 줄이는 데라고 설명합니다.",
      "“프로세스를 종료하는 데”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “캐시 메모리 적중률을 높여 CPU의 메모리 접근 횟수를 줄이는 데”입니다."
    ],
    "keyPoints": [
      "본문",
      "참조",
      "지역성의",
      "원리란"
    ]
  },
  {
    "version": 2,
    "categoryId": "os-concurrency",
    "sourceId": "be-145",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "evidenceQuote": "- **시간 지역성(Temporal locality)** 이란 CPU는 최근에 접근했던 메모리 공간에 다시 접근하려는 경향이 있다는 것을 의미합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-145-follow-up",
    "kind": "follow-up",
    "followUpOf": "quiz-be-145-main",
    "question": "be-145 원문에서 기본 개념 다음에 제시한 조건·영향 중 알맞은 것은 무엇인가요?",
    "choices": [
      "원문은 이 조건이 모든 상황에서 반대로 적용된다고 설명한다.",
      "원문은 이 결과가 아무 조건 없이 항상 발생한다고 설명한다.",
      "- **시간 지역성(Temporal locality)** 이란 CPU는 최근에 접근했던 메모리 공간에 다시 접근하려는 경향이 있다는 것을 의미합니다.",
      "원문은 이 판단에 원문 밖의 정보가 반드시 필요하다고 설명한다."
    ],
    "correctIndex": 2,
    "explanation": "원문의 근거는 - **시간 지역성(Temporal locality)** 이란 CPU는 최근에 접근했던 메모리 공간에 다시 접근하려는 경향이 있다는 것을 의미합니다.라는 판단을 뒷받침합니다.",
    "followUpOrder": 1,
    "followUpRole": "core",
    "sourceAnchor": "content-answer",
    "choiceFeedback": [
      "“원문은 이 조건이 모든 상황에서 반대로 적용된다고 설명한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “- **시간 지역성(Temporal locality)** 이란 CPU는 최근에 접근했던 메모리 공간에 다시 접근하려는 경향이 있다는 것을 의미합니다.”입니다.",
      "“원문은 이 결과가 아무 조건 없이 항상 발생한다고 설명한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “- **시간 지역성(Temporal locality)** 이란 CPU는 최근에 접근했던 메모리 공간에 다시 접근하려는 경향이 있다는 것을 의미합니다.”입니다.",
      "원문의 근거는 - **시간 지역성(Temporal locality)** 이란 CPU는 최근에 접근했던 메모리 공간에 다시 접근하려는 경향이 있다는 것을 의미합니다.라는 판단을 뒷받침합니다.",
      "“원문은 이 판단에 원문 밖의 정보가 반드시 필요하다고 설명한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “- **시간 지역성(Temporal locality)** 이란 CPU는 최근에 접근했던 메모리 공간에 다시 접근하려는 경향이 있다는 것을 의미합니다.”입니다."
    ],
    "keyPoints": [
      "본문",
      "참조",
      "지역성의",
      "원리란"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-145-follow-up-2",
    "kind": "follow-up",
    "followUpOf": "quiz-be-145-main",
    "followUpOrder": 2,
    "followUpRole": "core",
    "question": "참조 지역성의 원리란 무엇인가요 원문의 “본문” 구역과 일치하는 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "참조 지역성의 원리는 크게 시간 지역성과 공간 지역성이 존재하는데요.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 1,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "os-concurrency",
    "sourceId": "be-145",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "참조 지역성의 원리는 크게 시간 지역성과 공간 지역성이 존재하는데요.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “참조 지역성의 원리는 크게 시간 지역성과 공간 지역성이 존재하는데요.”입니다.",
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “참조 지역성의 원리는 크게 시간 지역성과 공간 지역성이 존재하는데요.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “참조 지역성의 원리는 크게 시간 지역성과 공간 지역성이 존재하는데요.”입니다."
    ],
    "keyPoints": [
      "본문",
      "참조",
      "지역성의",
      "원리란"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-145-follow-up-3",
    "kind": "follow-up",
    "followUpOf": "quiz-be-145-main",
    "followUpOrder": 3,
    "followUpRole": "remediation",
    "question": "참조 지역성의 원리란 무엇인가요의 핵심 근거를 다시 확인할 때 옳은 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "**공간 지역성(Spatial locality)** 이란 CPU는 접근한 메모리 공간 근처에 접근하려는 경향이 있다는 것을 의미합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 2,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "os-concurrency",
    "sourceId": "be-145",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "**공간 지역성(Spatial locality)** 이란 CPU는 접근한 메모리 공간 근처에 접근하려는 경향이 있다는 것을 의미합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “**공간 지역성(Spatial locality)** 이란 CPU는 접근한 메모리 공간 근처에 접근하려는 경향이 있다는 것을 의미합니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “**공간 지역성(Spatial locality)** 이란 CPU는 접근한 메모리 공간 근처에 접근하려는 경향이 있다는 것을 의미합니다.”입니다.",
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “**공간 지역성(Spatial locality)** 이란 CPU는 접근한 메모리 공간 근처에 접근하려는 경향이 있다는 것을 의미합니다.”입니다."
    ],
    "keyPoints": [
      "본문",
      "참조",
      "지역성의",
      "원리란"
    ]
  },
  {
    "version": 2,
    "categoryId": "os-concurrency",
    "sourceId": "be-147",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "evidenceQuote": "**명령어 파이프라이닝(instruction pipelining)** 은 CPU가 여러 명령어를 동시에 처리하기 위해 각 명령어를 여러 단계로 분할하고, 각 단계를 다른 명령어와 겹쳐서 실행하는 방법입니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-147-main",
    "kind": "main",
    "followUpOf": null,
    "question": "명령어 파이프라이닝은 무엇을 하는 방법인가요?",
    "choices": [
      "명령어를 여러 단계로 나누고 각 단계를 다른 명령어와 겹쳐 실행하는 방법",
      "명령어를 하나의 단계로만 실행하는 방법",
      "모든 명령어를 디스크에 저장하는 방법",
      "명령어 실행을 중지하는 방법"
    ],
    "correctIndex": 0,
    "explanation": "원문은 명령어를 여러 단계로 나누고 각 단계를 다른 명령어와 겹쳐 실행하는 방법라고 설명합니다.",
    "followUpOrder": null,
    "followUpRole": null,
    "sourceAnchor": "content-answer",
    "choiceFeedback": [
      "원문은 명령어를 여러 단계로 나누고 각 단계를 다른 명령어와 겹쳐 실행하는 방법라고 설명합니다.",
      "“명령어를 하나의 단계로만 실행하는 방법”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “명령어를 여러 단계로 나누고 각 단계를 다른 명령어와 겹쳐 실행하는 방법”입니다.",
      "“모든 명령어를 디스크에 저장하는 방법”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “명령어를 여러 단계로 나누고 각 단계를 다른 명령어와 겹쳐 실행하는 방법”입니다.",
      "“명령어 실행을 중지하는 방법”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “명령어를 여러 단계로 나누고 각 단계를 다른 명령어와 겹쳐 실행하는 방법”입니다."
    ],
    "keyPoints": [
      "본문",
      "명령어",
      "파이프라이닝에",
      "대해서"
    ]
  },
  {
    "version": 2,
    "categoryId": "os-concurrency",
    "sourceId": "be-147",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "파이프라인 위험에 대해서 알고 계시나요?",
    "evidenceQuote": "파이프라이닝은 높은 성능을 가져오지만, 때로는 성능 향상에 실패하기도 하는데요. 이를 **파이프라인 위험(pipeline hazard)** 이라고 합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-147-follow-up",
    "kind": "follow-up",
    "followUpOf": "quiz-be-147-main",
    "question": "be-147 원문에서 기본 개념 다음에 제시한 조건·영향 중 알맞은 것은 무엇인가요?",
    "choices": [
      "파이프라이닝은 높은 성능을 가져오지만, 때로는 성능 향상에 실패하기도 하는데요. 이를 **파이프라인 위험(pipeline hazard)** 이라고 합니다.",
      "원문은 이 조건이 모든 상황에서 반대로 적용된다고 설명한다.",
      "원문은 이 결과가 아무 조건 없이 항상 발생한다고 설명한다.",
      "원문은 이 판단에 원문 밖의 정보가 반드시 필요하다고 설명한다."
    ],
    "correctIndex": 0,
    "explanation": "원문의 근거는 파이프라이닝은 높은 성능을 가져오지만, 때로는 성능 향상에 실패하기도 하는데요. 이를 **파이프라인 위험(pipeline hazard)** 이라고 합니다.라는 판단을 뒷받침합니다.",
    "followUpOrder": 1,
    "followUpRole": "core",
    "sourceAnchor": "파이프라인-위험에-대해서-알고-계시나요",
    "choiceFeedback": [
      "원문의 근거는 파이프라이닝은 높은 성능을 가져오지만, 때로는 성능 향상에 실패하기도 하는데요. 이를 **파이프라인 위험(pipeline hazard)** 이라고 합니다.라는 판단을 뒷받침합니다.",
      "“원문은 이 조건이 모든 상황에서 반대로 적용된다고 설명한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “파이프라이닝은 높은 성능을 가져오지만, 때로는 성능 향상에 실패하기도 하는데요. 이를 **파이프라인 위험(pipeline hazard)** 이라고 합니다.”입니다.",
      "“원문은 이 결과가 아무 조건 없이 항상 발생한다고 설명한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “파이프라이닝은 높은 성능을 가져오지만, 때로는 성능 향상에 실패하기도 하는데요. 이를 **파이프라인 위험(pipeline hazard)** 이라고 합니다.”입니다.",
      "“원문은 이 판단에 원문 밖의 정보가 반드시 필요하다고 설명한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “파이프라이닝은 높은 성능을 가져오지만, 때로는 성능 향상에 실패하기도 하는데요. 이를 **파이프라인 위험(pipeline hazard)** 이라고 합니다.”입니다."
    ],
    "keyPoints": [
      "파이프라인 위험에 대해서 알고 계시나요?",
      "명령어",
      "파이프라이닝에",
      "대해서"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-147-follow-up-2",
    "kind": "follow-up",
    "followUpOf": "quiz-be-147-main",
    "followUpOrder": 2,
    "followUpRole": "core",
    "question": "명령어 파이프라이닝 원문의 “본문” 구역과 일치하는 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.",
      "전통적인 CPU는 한 번에 하나의 명령어를 처리하는 반면, 파이프라인 기법을 사용하는 CPU는 여러 명령어를 각기 다른 단계에서 동시에 처리할 수 있습니다."
    ],
    "correctIndex": 3,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "os-concurrency",
    "sourceId": "be-147",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "전통적인 CPU는 한 번에 하나의 명령어를 처리하는 반면, 파이프라인 기법을 사용하는 CPU는 여러 명령어를 각기 다른 단계에서 동시에 처리할 수 있습니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “전통적인 CPU는 한 번에 하나의 명령어를 처리하는 반면, 파이프라인 기법을 사용하는 CPU는 여러 명령어를 각기 다른 단계에서 동시에 처리할 수 있습니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “전통적인 CPU는 한 번에 하나의 명령어를 처리하는 반면, 파이프라인 기법을 사용하는 CPU는 여러 명령어를 각기 다른 단계에서 동시에 처리할 수 있습니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “전통적인 CPU는 한 번에 하나의 명령어를 처리하는 반면, 파이프라인 기법을 사용하는 CPU는 여러 명령어를 각기 다른 단계에서 동시에 처리할 수 있습니다.”입니다.",
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다."
    ],
    "keyPoints": [
      "본문",
      "명령어",
      "파이프라이닝에",
      "대해서"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-147-follow-up-3",
    "kind": "follow-up",
    "followUpOf": "quiz-be-147-main",
    "followUpOrder": 3,
    "followUpRole": "remediation",
    "question": "명령어 파이프라이닝의 핵심 근거를 다시 확인할 때 옳은 설명은 무엇인가요?",
    "choices": [
      "파이프라인 위험에는 크게 데이터 위험, 제어 위험, 구조적 위험이 존재합니다.",
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 0,
    "explanation": "원문의 “파이프라인 위험에 대해서 알고 계시나요?” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "os-concurrency",
    "sourceId": "be-147",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "파이프라인 위험에 대해서 알고 계시나요?",
    "sourceAnchor": "파이프라인-위험에-대해서-알고-계시나요",
    "evidenceQuote": "파이프라인 위험에는 크게 데이터 위험, 제어 위험, 구조적 위험이 존재합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "원문의 “파이프라인 위험에 대해서 알고 계시나요?” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “파이프라인 위험에는 크게 데이터 위험, 제어 위험, 구조적 위험이 존재합니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “파이프라인 위험에는 크게 데이터 위험, 제어 위험, 구조적 위험이 존재합니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “파이프라인 위험에는 크게 데이터 위험, 제어 위험, 구조적 위험이 존재합니다.”입니다."
    ],
    "keyPoints": [
      "파이프라인 위험에 대해서 알고 계시나요?",
      "명령어",
      "파이프라이닝에",
      "대해서"
    ]
  },
  {
    "version": 2,
    "categoryId": "os-concurrency",
    "sourceId": "be-149",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "메모리 사용량 차이",
    "evidenceQuote": "- **스레드**: 각 스레드는 자체 스택 메모리를 필요로 하며, JVM에서 기본적으로 약 1MB의 스택 크기를 할당합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-149-main",
    "kind": "main",
    "followUpOf": null,
    "question": "원문에서 스레드가 필요로 한다고 설명한 메모리는 무엇인가요?",
    "choices": [
      "모든 스레드가 하나만 공유하는 힙 메모리",
      "디스크의 패리티 메모리",
      "각 스레드의 자체 스택 메모리",
      "캐시의 TTL 메모리"
    ],
    "correctIndex": 2,
    "explanation": "원문은 각 스레드의 자체 스택 메모리라고 설명합니다.",
    "followUpOrder": null,
    "followUpRole": null,
    "sourceAnchor": "메모리-사용량-차이",
    "choiceFeedback": [
      "“모든 스레드가 하나만 공유하는 힙 메모리”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “각 스레드의 자체 스택 메모리”입니다.",
      "“디스크의 패리티 메모리”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “각 스레드의 자체 스택 메모리”입니다.",
      "원문은 각 스레드의 자체 스택 메모리라고 설명합니다.",
      "“캐시의 TTL 메모리”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “각 스레드의 자체 스택 메모리”입니다."
    ],
    "keyPoints": [
      "메모리 사용량 차이",
      "어떤",
      "이유로",
      "코루틴을"
    ]
  },
  {
    "version": 2,
    "categoryId": "os-concurrency",
    "sourceId": "be-149",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "메모리 사용량 차이",
    "evidenceQuote": "- **코루틴**: 코루틴은 스레드 내에서 실행되며 자체 스택을 필요로 하지 않습니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-149-follow-up",
    "kind": "follow-up",
    "followUpOf": "quiz-be-149-main",
    "question": "be-149 원문에서 기본 개념 다음에 제시한 조건·영향 중 알맞은 것은 무엇인가요?",
    "choices": [
      "원문은 이 조건이 모든 상황에서 반대로 적용된다고 설명한다.",
      "원문은 이 결과가 아무 조건 없이 항상 발생한다고 설명한다.",
      "- **코루틴**: 코루틴은 스레드 내에서 실행되며 자체 스택을 필요로 하지 않습니다.",
      "원문은 이 판단에 원문 밖의 정보가 반드시 필요하다고 설명한다."
    ],
    "correctIndex": 2,
    "explanation": "원문의 근거는 - **코루틴**: 코루틴은 스레드 내에서 실행되며 자체 스택을 필요로 하지 않습니다.라는 판단을 뒷받침합니다.",
    "followUpOrder": 1,
    "followUpRole": "core",
    "sourceAnchor": "메모리-사용량-차이",
    "choiceFeedback": [
      "“원문은 이 조건이 모든 상황에서 반대로 적용된다고 설명한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “- **코루틴**: 코루틴은 스레드 내에서 실행되며 자체 스택을 필요로 하지 않습니다.”입니다.",
      "“원문은 이 결과가 아무 조건 없이 항상 발생한다고 설명한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “- **코루틴**: 코루틴은 스레드 내에서 실행되며 자체 스택을 필요로 하지 않습니다.”입니다.",
      "원문의 근거는 - **코루틴**: 코루틴은 스레드 내에서 실행되며 자체 스택을 필요로 하지 않습니다.라는 판단을 뒷받침합니다.",
      "“원문은 이 판단에 원문 밖의 정보가 반드시 필요하다고 설명한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “- **코루틴**: 코루틴은 스레드 내에서 실행되며 자체 스택을 필요로 하지 않습니다.”입니다."
    ],
    "keyPoints": [
      "메모리 사용량 차이",
      "어떤",
      "이유로",
      "코루틴을"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-149-follow-up-2",
    "kind": "follow-up",
    "followUpOf": "quiz-be-149-main",
    "followUpOrder": 2,
    "followUpRole": "core",
    "question": "어떤 이유로 코루틴을 사용한 작업 처리가 기존 스레드 방식보다 가벼운지 원문의 “메모리 사용량 차이” 구역과 일치하는 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "이 메모리는 스레드가 생성될 때 예약되며 스레드가 종료될 때까지 유지됩니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 1,
    "explanation": "원문의 “메모리 사용량 차이” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "os-concurrency",
    "sourceId": "be-149",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "메모리 사용량 차이",
    "sourceAnchor": "메모리-사용량-차이",
    "evidenceQuote": "이 메모리는 스레드가 생성될 때 예약되며 스레드가 종료될 때까지 유지됩니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “이 메모리는 스레드가 생성될 때 예약되며 스레드가 종료될 때까지 유지됩니다.”입니다.",
      "원문의 “메모리 사용량 차이” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “이 메모리는 스레드가 생성될 때 예약되며 스레드가 종료될 때까지 유지됩니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “이 메모리는 스레드가 생성될 때 예약되며 스레드가 종료될 때까지 유지됩니다.”입니다."
    ],
    "keyPoints": [
      "메모리 사용량 차이",
      "어떤",
      "이유로",
      "코루틴을"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-149-follow-up-3",
    "kind": "follow-up",
    "followUpOf": "quiz-be-149-main",
    "followUpOrder": 3,
    "followUpRole": "remediation",
    "question": "어떤 이유로 코루틴을 사용한 작업 처리가 기존 스레드 방식보다 가벼운지의 핵심 근거를 다시 확인할 때 옳은 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "일반적으로 코루틴은 단지 몇 KB의 메모리만 사용합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 2,
    "explanation": "원문의 “메모리 사용량 차이” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "os-concurrency",
    "sourceId": "be-149",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "메모리 사용량 차이",
    "sourceAnchor": "메모리-사용량-차이",
    "evidenceQuote": "일반적으로 코루틴은 단지 몇 KB의 메모리만 사용합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “일반적으로 코루틴은 단지 몇 KB의 메모리만 사용합니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “일반적으로 코루틴은 단지 몇 KB의 메모리만 사용합니다.”입니다.",
      "원문의 “메모리 사용량 차이” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “일반적으로 코루틴은 단지 몇 KB의 메모리만 사용합니다.”입니다."
    ],
    "keyPoints": [
      "메모리 사용량 차이",
      "어떤",
      "이유로",
      "코루틴을"
    ]
  },
  {
    "version": 2,
    "categoryId": "java-language",
    "sourceId": "be-20",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "evidenceQuote": "Checked Exception은 **컴파일 시점에 확인**되며, **반드시 처리해야 하는 예외**입니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-20-main",
    "kind": "main",
    "followUpOf": null,
    "question": "Checked Exception은 언제 확인되고 어떻게 해야 하나요?",
    "choices": [
      "런타임에만 확인되며 무시해도 된다",
      "캐시에만 저장되며 처리할 수 없다",
      "컴파일 시점에 확인되며 반드시 처리해야 한다",
      "컴파일 전에 자동 삭제된다"
    ],
    "correctIndex": 2,
    "explanation": "원문은 컴파일 시점에 확인되며 반드시 처리해야 한다라고 설명합니다.",
    "followUpOrder": null,
    "followUpRole": null,
    "sourceAnchor": "content-answer",
    "choiceFeedback": [
      "“런타임에만 확인되며 무시해도 된다”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “컴파일 시점에 확인되며 반드시 처리해야 한다”입니다.",
      "“캐시에만 저장되며 처리할 수 없다”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “컴파일 시점에 확인되며 반드시 처리해야 한다”입니다.",
      "원문은 컴파일 시점에 확인되며 반드시 처리해야 한다라고 설명합니다.",
      "“컴파일 전에 자동 삭제된다”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “컴파일 시점에 확인되며 반드시 처리해야 한다”입니다."
    ],
    "keyPoints": [
      "본문",
      "자바에서",
      "Checked",
      "Exception과"
    ]
  },
  {
    "version": 2,
    "categoryId": "java-language",
    "sourceId": "be-20",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "evidenceQuote": "Unchecked Exception은 **런타임 시점에 발생**하는 예외로, 컴파일러가 처리 여부를 강제하지 않습니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-20-follow-up",
    "kind": "follow-up",
    "followUpOf": "quiz-be-20-main",
    "question": "be-20 원문에서 기본 개념 다음에 제시한 조건·영향 중 알맞은 것은 무엇인가요?",
    "choices": [
      "원문은 이 조건이 모든 상황에서 반대로 적용된다고 설명한다.",
      "원문은 이 결과가 아무 조건 없이 항상 발생한다고 설명한다.",
      "Unchecked Exception은 **런타임 시점에 발생**하는 예외로, 컴파일러가 처리 여부를 강제하지 않습니다.",
      "원문은 이 판단에 원문 밖의 정보가 반드시 필요하다고 설명한다."
    ],
    "correctIndex": 2,
    "explanation": "원문의 근거는 Unchecked Exception은 **런타임 시점에 발생**하는 예외로, 컴파일러가 처리 여부를 강제하지 않습니다.라는 판단을 뒷받침합니다.",
    "followUpOrder": 1,
    "followUpRole": "core",
    "sourceAnchor": "content-answer",
    "choiceFeedback": [
      "“원문은 이 조건이 모든 상황에서 반대로 적용된다고 설명한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “Unchecked Exception은 **런타임 시점에 발생**하는 예외로, 컴파일러가 처리 여부를 강제하지 않습니다.”입니다.",
      "“원문은 이 결과가 아무 조건 없이 항상 발생한다고 설명한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “Unchecked Exception은 **런타임 시점에 발생**하는 예외로, 컴파일러가 처리 여부를 강제하지 않습니다.”입니다.",
      "원문의 근거는 Unchecked Exception은 **런타임 시점에 발생**하는 예외로, 컴파일러가 처리 여부를 강제하지 않습니다.라는 판단을 뒷받침합니다.",
      "“원문은 이 판단에 원문 밖의 정보가 반드시 필요하다고 설명한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “Unchecked Exception은 **런타임 시점에 발생**하는 예외로, 컴파일러가 처리 여부를 강제하지 않습니다.”입니다."
    ],
    "keyPoints": [
      "본문",
      "자바에서",
      "Checked",
      "Exception과"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-20-follow-up-2",
    "kind": "follow-up",
    "followUpOf": "quiz-be-20-main",
    "followUpOrder": 2,
    "followUpRole": "core",
    "question": "자바에서 Checked Exception과 Unchecked Exception 원문의 “본문” 구역과 일치하는 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "자바에서는 `IOException`, `SQLException` 등이 이에 속합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 1,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "java-language",
    "sourceId": "be-20",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "자바에서는 `IOException`, `SQLException` 등이 이에 속합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “자바에서는 `IOException`, `SQLException` 등이 이에 속합니다.”입니다.",
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “자바에서는 `IOException`, `SQLException` 등이 이에 속합니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “자바에서는 `IOException`, `SQLException` 등이 이에 속합니다.”입니다."
    ],
    "keyPoints": [
      "본문",
      "자바에서",
      "Checked",
      "Exception과"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-20-follow-up-3",
    "kind": "follow-up",
    "followUpOf": "quiz-be-20-main",
    "followUpOrder": 3,
    "followUpRole": "remediation",
    "question": "자바에서 Checked Exception과 Unchecked Exception의 핵심 근거를 다시 확인할 때 옳은 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "Checked Exception을 유발하는 메서드를 호출하는 경우, 메서드 시그니처에 `throws`를 사용하여 호출자에게 예외를 위임하거나 메서드 내에서 try-catch를 사용하여 해당 예외를 반드시 처리해야합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 2,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "java-language",
    "sourceId": "be-20",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "Checked Exception을 유발하는 메서드를 호출하는 경우, 메서드 시그니처에 `throws`를 사용하여 호출자에게 예외를 위임하거나 메서드 내에서 try-catch를 사용하여 해당 예외를 반드시 처리해야합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “Checked Exception을 유발하는 메서드를 호출하는 경우, 메서드 시그니처에 `throws`를 사용하여 호출자에게 예외를 위임하거나 메서드 내에서 try-catch를 사용하여 해당 예외를 반드시 처리해야합니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “Checked Exception을 유발하는 메서드를 호출하는 경우, 메서드 시그니처에 `throws`를 사용하여 호출자에게 예외를 위임하거나 메서드 내에서 try-catch를 사용하여 해당 예외를 반드시 처리해야합니다.”입니다.",
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “Checked Exception을 유발하는 메서드를 호출하는 경우, 메서드 시그니처에 `throws`를 사용하여 호출자에게 예외를 위임하거나 메서드 내에서 try-catch를 사용하여 해당 예외를 반드시 처리해야합니다.”입니다."
    ],
    "keyPoints": [
      "본문",
      "자바에서",
      "Checked",
      "Exception과"
    ]
  },
  {
    "version": 2,
    "categoryId": "java-language",
    "sourceId": "be-21",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "evidenceQuote": "일급 컬렉션(First-Class Collection)은 하나의 컬렉션을 감싸는 클래스를 만들고, 해당 클래스에서 컬렉션과 관련된 비즈니스 로직을 관리하는 패턴을 말합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-21-main",
    "kind": "main",
    "followUpOf": null,
    "question": "일급 컬렉션은 어떤 패턴인가요?",
    "choices": [
      "모든 컬렉션을 전역 변수로 두는 패턴",
      "컬렉션을 사용하지 않는 패턴",
      "컬렉션을 문자열로만 변환하는 패턴",
      "하나의 컬렉션을 감싸는 클래스를 만들고 그 클래스에서 컬렉션 관련 비즈니스 로직을 관리하는 패턴"
    ],
    "correctIndex": 3,
    "explanation": "원문은 하나의 컬렉션을 감싸는 클래스를 만들고 그 클래스에서 컬렉션 관련 비즈니스 로직을 관리하는 패턴라고 설명합니다.",
    "followUpOrder": null,
    "followUpRole": null,
    "sourceAnchor": "content-answer",
    "choiceFeedback": [
      "“모든 컬렉션을 전역 변수로 두는 패턴”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “하나의 컬렉션을 감싸는 클래스를 만들고 그 클래스에서 컬렉션 관련 비즈니스 로직을 관리하는 패턴”입니다.",
      "“컬렉션을 사용하지 않는 패턴”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “하나의 컬렉션을 감싸는 클래스를 만들고 그 클래스에서 컬렉션 관련 비즈니스 로직을 관리하는 패턴”입니다.",
      "“컬렉션을 문자열로만 변환하는 패턴”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “하나의 컬렉션을 감싸는 클래스를 만들고 그 클래스에서 컬렉션 관련 비즈니스 로직을 관리하는 패턴”입니다.",
      "원문은 하나의 컬렉션을 감싸는 클래스를 만들고 그 클래스에서 컬렉션 관련 비즈니스 로직을 관리하는 패턴라고 설명합니다."
    ],
    "keyPoints": [
      "본문",
      "일급",
      "컬렉션이",
      "무엇인가요?"
    ]
  },
  {
    "version": 2,
    "categoryId": "java-language",
    "sourceId": "be-21",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "evidenceQuote": "validate(orders); // 검증 수행",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-21-follow-up",
    "kind": "follow-up",
    "followUpOf": "quiz-be-21-main",
    "question": "be-21 원문에서 기본 개념 다음에 제시한 조건·영향 중 알맞은 것은 무엇인가요?",
    "choices": [
      "원문은 이 조건이 모든 상황에서 반대로 적용된다고 설명한다.",
      "원문은 이 결과가 아무 조건 없이 항상 발생한다고 설명한다.",
      "원문은 이 판단에 원문 밖의 정보가 반드시 필요하다고 설명한다.",
      "validate(orders); // 검증 수행"
    ],
    "correctIndex": 3,
    "explanation": "원문의 근거는 validate(orders); // 검증 수행라는 판단을 뒷받침합니다.",
    "followUpOrder": 1,
    "followUpRole": "core",
    "sourceAnchor": "content-answer",
    "choiceFeedback": [
      "“원문은 이 조건이 모든 상황에서 반대로 적용된다고 설명한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “validate(orders); // 검증 수행”입니다.",
      "“원문은 이 결과가 아무 조건 없이 항상 발생한다고 설명한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “validate(orders); // 검증 수행”입니다.",
      "“원문은 이 판단에 원문 밖의 정보가 반드시 필요하다고 설명한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “validate(orders); // 검증 수행”입니다.",
      "원문의 근거는 validate(orders); // 검증 수행라는 판단을 뒷받침합니다."
    ],
    "keyPoints": [
      "본문",
      "일급",
      "컬렉션이",
      "무엇인가요?"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-21-follow-up-2",
    "kind": "follow-up",
    "followUpOf": "quiz-be-21-main",
    "followUpOrder": 2,
    "followUpRole": "core",
    "question": "일급 컬렉션이 무엇인가요 원문의 “본문” 구역과 일치하는 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "아래 코드 중에서 Order의 List 자료구조를 감싼 Orders가 일급 컬렉션의 예시입니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 2,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "java-language",
    "sourceId": "be-21",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "아래 코드 중에서 Order의 List 자료구조를 감싼 Orders가 일급 컬렉션의 예시입니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “아래 코드 중에서 Order의 List 자료구조를 감싼 Orders가 일급 컬렉션의 예시입니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “아래 코드 중에서 Order의 List 자료구조를 감싼 Orders가 일급 컬렉션의 예시입니다.”입니다.",
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “아래 코드 중에서 Order의 List 자료구조를 감싼 Orders가 일급 컬렉션의 예시입니다.”입니다."
    ],
    "keyPoints": [
      "본문",
      "일급",
      "컬렉션이",
      "무엇인가요?"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-21-follow-up-3",
    "kind": "follow-up",
    "followUpOf": "quiz-be-21-main",
    "followUpOrder": 3,
    "followUpRole": "remediation",
    "question": "일급 컬렉션이 무엇인가요의 핵심 근거를 다시 확인할 때 옳은 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.",
      "일급 컬렉션 클래스에 로직을 포함하거나 비즈니스에 특화된 명확한 이름을 부여할 수 있습니다."
    ],
    "correctIndex": 3,
    "explanation": "원문의 “일급 컬렉션을 사용해야하는 이유는 무엇인가요?” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "java-language",
    "sourceId": "be-21",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "일급 컬렉션을 사용해야하는 이유는 무엇인가요?",
    "sourceAnchor": "일급-컬렉션을-사용해야하는-이유는-무엇인가요",
    "evidenceQuote": "일급 컬렉션 클래스에 로직을 포함하거나 비즈니스에 특화된 명확한 이름을 부여할 수 있습니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “일급 컬렉션 클래스에 로직을 포함하거나 비즈니스에 특화된 명확한 이름을 부여할 수 있습니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “일급 컬렉션 클래스에 로직을 포함하거나 비즈니스에 특화된 명확한 이름을 부여할 수 있습니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “일급 컬렉션 클래스에 로직을 포함하거나 비즈니스에 특화된 명확한 이름을 부여할 수 있습니다.”입니다.",
      "원문의 “일급 컬렉션을 사용해야하는 이유는 무엇인가요?” 구역이 정답 선택지의 내용을 직접 설명합니다."
    ],
    "keyPoints": [
      "일급 컬렉션을 사용해야하는 이유는 무엇인가요?",
      "일급",
      "컬렉션이",
      "무엇인가요?"
    ]
  },
  {
    "version": 2,
    "categoryId": "java-language",
    "sourceId": "be-24",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "evidenceQuote": "자바에서 객체를 복사할 때 **얕은 복사**와 **깊은 복사**라는 두 가지 방식이 있습니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-24-main",
    "kind": "main",
    "followUpOf": null,
    "question": "자바에서 객체를 복사하는 두 방식은 무엇인가요?",
    "choices": [
      "정렬 복사와 탐색 복사",
      "동기 복사와 비동기 복사",
      "얕은 복사와 깊은 복사",
      "캐시 복사와 로그 복사"
    ],
    "correctIndex": 2,
    "explanation": "원문은 얕은 복사와 깊은 복사라고 설명합니다.",
    "followUpOrder": null,
    "followUpRole": null,
    "sourceAnchor": "content-answer",
    "choiceFeedback": [
      "“정렬 복사와 탐색 복사”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “얕은 복사와 깊은 복사”입니다.",
      "“동기 복사와 비동기 복사”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “얕은 복사와 깊은 복사”입니다.",
      "원문은 얕은 복사와 깊은 복사라고 설명합니다.",
      "“캐시 복사와 로그 복사”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “얕은 복사와 깊은 복사”입니다."
    ],
    "keyPoints": [
      "본문",
      "얕은",
      "복사와",
      "깊은"
    ]
  },
  {
    "version": 2,
    "categoryId": "java-language",
    "sourceId": "be-24",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "evidenceQuote": "먼저 Book과 Author라는 두 클래스를 사용해서 예제를 살펴볼게요. Book은 책의 이름(name)과 저자(author) 정보를 가지고 있고, Author는 저자의 이름을 가지고 있습니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-24-follow-up",
    "kind": "follow-up",
    "followUpOf": "quiz-be-24-main",
    "question": "be-24 원문에서 기본 개념 다음에 제시한 조건·영향 중 알맞은 것은 무엇인가요?",
    "choices": [
      "원문은 이 조건이 모든 상황에서 반대로 적용된다고 설명한다.",
      "원문은 이 결과가 아무 조건 없이 항상 발생한다고 설명한다.",
      "먼저 Book과 Author라는 두 클래스를 사용해서 예제를 살펴볼게요. Book은 책의 이름(name)과 저자(author) 정보를 가지고 있고, Author는 저자의 이름을 가지고 있습니다.",
      "원문은 이 판단에 원문 밖의 정보가 반드시 필요하다고 설명한다."
    ],
    "correctIndex": 2,
    "explanation": "원문의 근거는 먼저 Book과 Author라는 두 클래스를 사용해서 예제를 살펴볼게요. Book은 책의 이름(name)과 저자(author) 정보를 가지고 있고, Author는 저자의 이름을 가지고 있습니다.라는 판단을 뒷받침합니다.",
    "followUpOrder": 1,
    "followUpRole": "core",
    "sourceAnchor": "content-answer",
    "choiceFeedback": [
      "“원문은 이 조건이 모든 상황에서 반대로 적용된다고 설명한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “먼저 Book과 Author라는 두 클래스를 사용해서 예제를 살펴볼게요. Book은 책의 이름(name)과 저자(author) 정보를 가지고 있고, Author는 저자의 이름을 가지고 있습니다.”입니다.",
      "“원문은 이 결과가 아무 조건 없이 항상 발생한다고 설명한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “먼저 Book과 Author라는 두 클래스를 사용해서 예제를 살펴볼게요. Book은 책의 이름(name)과 저자(author) 정보를 가지고 있고, Author는 저자의 이름을 가지고 있습니다.”입니다.",
      "원문의 근거는 먼저 Book과 Author라는 두 클래스를 사용해서 예제를 살펴볼게요. Book은 책의 이름(name)과 저자(author) 정보를 가지고 있고, Author는 저자의 이름을 가지고 있습니다.라는 판단을 뒷받침합니다.",
      "“원문은 이 판단에 원문 밖의 정보가 반드시 필요하다고 설명한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “먼저 Book과 Author라는 두 클래스를 사용해서 예제를 살펴볼게요. Book은 책의 이름(name)과 저자(author) 정보를 가지고 있고, Author는 저자의 이름을 가지고 있습니다.”입니다."
    ],
    "keyPoints": [
      "본문",
      "얕은",
      "복사와",
      "깊은"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-24-follow-up-2",
    "kind": "follow-up",
    "followUpOf": "quiz-be-24-main",
    "followUpOrder": 2,
    "followUpRole": "core",
    "question": "얕은 복사와 깊은 복사 원문의 “본문” 구역과 일치하는 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "shallowCopy() 메서드는 새로운 Book 객체를 만들지만, 내부의 Author 객체는 원본과 동일한 객체를 참조합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 1,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "java-language",
    "sourceId": "be-24",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "shallowCopy() 메서드는 새로운 Book 객체를 만들지만, 내부의 Author 객체는 원본과 동일한 객체를 참조합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “shallowCopy() 메서드는 새로운 Book 객체를 만들지만, 내부의 Author 객체는 원본과 동일한 객체를 참조합니다.”입니다.",
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “shallowCopy() 메서드는 새로운 Book 객체를 만들지만, 내부의 Author 객체는 원본과 동일한 객체를 참조합니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “shallowCopy() 메서드는 새로운 Book 객체를 만들지만, 내부의 Author 객체는 원본과 동일한 객체를 참조합니다.”입니다."
    ],
    "keyPoints": [
      "본문",
      "얕은",
      "복사와",
      "깊은"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-24-follow-up-3",
    "kind": "follow-up",
    "followUpOf": "quiz-be-24-main",
    "followUpOrder": 3,
    "followUpRole": "remediation",
    "question": "얕은 복사와 깊은 복사의 핵심 근거를 다시 확인할 때 옳은 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "즉, Book 객체는 새로 만들었지만, Author 객체는 새로 만들지 않고 기존의 것을 그대로 사용합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 2,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "java-language",
    "sourceId": "be-24",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "즉, Book 객체는 새로 만들었지만, Author 객체는 새로 만들지 않고 기존의 것을 그대로 사용합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “즉, Book 객체는 새로 만들었지만, Author 객체는 새로 만들지 않고 기존의 것을 그대로 사용합니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “즉, Book 객체는 새로 만들었지만, Author 객체는 새로 만들지 않고 기존의 것을 그대로 사용합니다.”입니다.",
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “즉, Book 객체는 새로 만들었지만, Author 객체는 새로 만들지 않고 기존의 것을 그대로 사용합니다.”입니다."
    ],
    "keyPoints": [
      "본문",
      "얕은",
      "복사와",
      "깊은"
    ]
  },
  {
    "version": 2,
    "categoryId": "java-language",
    "sourceId": "be-27",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "evidenceQuote": "equals와 hashCode 메서드는 객체의 동등성 비교와 해시값 생성을 위해서 사용할 수 있습니다. 하지만, 함께 재정의하지 않는다면 예상치 못한 결과를 만들 수 있습니다. 가령, 해시값을 사용하는 자료구조(HashSet, HashMap..)을 사용할 때 문제가 발생할 수 있습니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-27-main",
    "kind": "main",
    "followUpOf": null,
    "question": "equals와 hashCode를 함께 재정의하지 않으면 어떤 자료구조에서 문제가 생길 수 있나요?",
    "choices": [
      "배열만 사용하는 자료구조",
      "해시값을 사용하는 HashSet, HashMap 같은 자료구조",
      "파일 시스템만",
      "네트워크 소켓만"
    ],
    "correctIndex": 1,
    "explanation": "원문은 해시값을 사용하는 HashSet, HashMap 같은 자료구조라고 설명합니다.",
    "followUpOrder": null,
    "followUpRole": null,
    "sourceAnchor": "content-answer",
    "choiceFeedback": [
      "“배열만 사용하는 자료구조”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “해시값을 사용하는 HashSet, HashMap 같은 자료구조”입니다.",
      "원문은 해시값을 사용하는 HashSet, HashMap 같은 자료구조라고 설명합니다.",
      "“파일 시스템만”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “해시값을 사용하는 HashSet, HashMap 같은 자료구조”입니다.",
      "“네트워크 소켓만”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “해시값을 사용하는 HashSet, HashMap 같은 자료구조”입니다."
    ],
    "keyPoints": [
      "본문",
      "equals와",
      "hashCode는",
      "함께"
    ]
  },
  {
    "version": 2,
    "categoryId": "java-language",
    "sourceId": "be-27",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "evidenceQuote": "@DisplayName(\"equals만 정의하면 HashSet이 제대로 동작하지 않는다.\")",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-27-follow-up",
    "kind": "follow-up",
    "followUpOf": "quiz-be-27-main",
    "question": "be-27 원문에서 기본 개념 다음에 제시한 조건·영향 중 알맞은 것은 무엇인가요?",
    "choices": [
      "원문은 이 조건이 모든 상황에서 반대로 적용된다고 설명한다.",
      "@DisplayName(\"equals만 정의하면 HashSet이 제대로 동작하지 않는다.\")",
      "원문은 이 결과가 아무 조건 없이 항상 발생한다고 설명한다.",
      "원문은 이 판단에 원문 밖의 정보가 반드시 필요하다고 설명한다."
    ],
    "correctIndex": 1,
    "explanation": "원문의 근거는 @DisplayName(\"equals만 정의하면 HashSet이 제대로 동작하지 않는다.\")라는 판단을 뒷받침합니다.",
    "followUpOrder": 1,
    "followUpRole": "core",
    "sourceAnchor": "content-answer",
    "choiceFeedback": [
      "“원문은 이 조건이 모든 상황에서 반대로 적용된다고 설명한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “@DisplayName(\"equals만 정의하면 HashSet이 제대로 동작하지 않는다.\")”입니다.",
      "원문의 근거는 @DisplayName(\"equals만 정의하면 HashSet이 제대로 동작하지 않는다.\")라는 판단을 뒷받침합니다.",
      "“원문은 이 결과가 아무 조건 없이 항상 발생한다고 설명한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “@DisplayName(\"equals만 정의하면 HashSet이 제대로 동작하지 않는다.\")”입니다.",
      "“원문은 이 판단에 원문 밖의 정보가 반드시 필요하다고 설명한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “@DisplayName(\"equals만 정의하면 HashSet이 제대로 동작하지 않는다.\")”입니다."
    ],
    "keyPoints": [
      "본문",
      "equals와",
      "hashCode는",
      "함께"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-27-follow-up-2",
    "kind": "follow-up",
    "followUpOf": "quiz-be-27-main",
    "followUpOrder": 2,
    "followUpRole": "core",
    "question": "equals와 hashCode는 왜 함께 재정의해야 할까요 원문의 “왜 이런 현상이 발생하나요?” 구역과 일치하는 설명은 무엇인가요?",
    "choices": [
      "해시값을 사용하는 자료구조는 hashCode 메서드의 반환값을 사용하는데요.",
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 0,
    "explanation": "원문의 “왜 이런 현상이 발생하나요?” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "java-language",
    "sourceId": "be-27",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "왜 이런 현상이 발생하나요?",
    "sourceAnchor": "왜-이런-현상이-발생하나요",
    "evidenceQuote": "해시값을 사용하는 자료구조는 hashCode 메서드의 반환값을 사용하는데요.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "원문의 “왜 이런 현상이 발생하나요?” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “해시값을 사용하는 자료구조는 hashCode 메서드의 반환값을 사용하는데요.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “해시값을 사용하는 자료구조는 hashCode 메서드의 반환값을 사용하는데요.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “해시값을 사용하는 자료구조는 hashCode 메서드의 반환값을 사용하는데요.”입니다."
    ],
    "keyPoints": [
      "왜 이런 현상이 발생하나요?",
      "equals와",
      "hashCode는",
      "함께"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-27-follow-up-3",
    "kind": "follow-up",
    "followUpOf": "quiz-be-27-main",
    "followUpOrder": 3,
    "followUpRole": "remediation",
    "question": "equals와 hashCode는 왜 함께 재정의해야 할까요의 핵심 근거를 다시 확인할 때 옳은 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "hashCode 메서드의 반환 값이 일치한 이후 equals 메서드의 반환값 참일 때만 논리적으로 같은 객체라고 판단합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 1,
    "explanation": "원문의 “왜 이런 현상이 발생하나요?” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "java-language",
    "sourceId": "be-27",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "왜 이런 현상이 발생하나요?",
    "sourceAnchor": "왜-이런-현상이-발생하나요",
    "evidenceQuote": "hashCode 메서드의 반환 값이 일치한 이후 equals 메서드의 반환값 참일 때만 논리적으로 같은 객체라고 판단합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “hashCode 메서드의 반환 값이 일치한 이후 equals 메서드의 반환값 참일 때만 논리적으로 같은 객체라고 판단합니다.”입니다.",
      "원문의 “왜 이런 현상이 발생하나요?” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “hashCode 메서드의 반환 값이 일치한 이후 equals 메서드의 반환값 참일 때만 논리적으로 같은 객체라고 판단합니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “hashCode 메서드의 반환 값이 일치한 이후 equals 메서드의 반환값 참일 때만 논리적으로 같은 객체라고 판단합니다.”입니다."
    ],
    "keyPoints": [
      "왜 이런 현상이 발생하나요?",
      "equals와",
      "hashCode는",
      "함께"
    ]
  },
  {
    "version": 2,
    "categoryId": "java-language",
    "sourceId": "be-28",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "evidenceQuote": "동일성과 동등성은 객체를 비교할 때 중요한 개념입니다. 자바에서는 이 두 개념을 equals() 메서드와 == 연산자를 통해 구분할 수 있습니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-28-main",
    "kind": "main",
    "followUpOf": null,
    "question": "자바에서 동일성과 동등성을 구분할 때 사용하는 것은 무엇인가요?",
    "choices": [
      "try와 catch",
      "push와 pop",
      "equals() 메서드와 == 연산자",
      "GET과 POST"
    ],
    "correctIndex": 2,
    "explanation": "원문은 equals() 메서드와 == 연산자라고 설명합니다.",
    "followUpOrder": null,
    "followUpRole": null,
    "sourceAnchor": "content-answer",
    "choiceFeedback": [
      "“try와 catch”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “equals() 메서드와 == 연산자”입니다.",
      "“push와 pop”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “equals() 메서드와 == 연산자”입니다.",
      "원문은 equals() 메서드와 == 연산자라고 설명합니다.",
      "“GET과 POST”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “equals() 메서드와 == 연산자”입니다."
    ],
    "keyPoints": [
      "본문",
      "동일성과",
      "동등성에",
      "대해서"
    ]
  },
  {
    "version": 2,
    "categoryId": "java-language",
    "sourceId": "be-28",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "equals()와 ==의 차이는 무엇인가요?",
    "evidenceQuote": "equals()는 **객체의 내용을 비교**하는 반면, ==는 **객체의 참조(레퍼런스)를 비교**합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-28-follow-up",
    "kind": "follow-up",
    "followUpOf": "quiz-be-28-main",
    "question": "be-28 원문에서 기본 개념 다음에 제시한 조건·영향 중 알맞은 것은 무엇인가요?",
    "choices": [
      "원문은 이 조건이 모든 상황에서 반대로 적용된다고 설명한다.",
      "원문은 이 결과가 아무 조건 없이 항상 발생한다고 설명한다.",
      "equals()는 **객체의 내용을 비교**하는 반면, ==는 **객체의 참조(레퍼런스)를 비교**합니다.",
      "원문은 이 판단에 원문 밖의 정보가 반드시 필요하다고 설명한다."
    ],
    "correctIndex": 2,
    "explanation": "원문의 근거는 equals()는 **객체의 내용을 비교**하는 반면, ==는 **객체의 참조(레퍼런스)를 비교**합니다.라는 판단을 뒷받침합니다.",
    "followUpOrder": 1,
    "followUpRole": "core",
    "sourceAnchor": "equals와-의-차이는-무엇인가요",
    "choiceFeedback": [
      "“원문은 이 조건이 모든 상황에서 반대로 적용된다고 설명한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “equals()는 **객체의 내용을 비교**하는 반면, ==는 **객체의 참조(레퍼런스)를 비교**합니다.”입니다.",
      "“원문은 이 결과가 아무 조건 없이 항상 발생한다고 설명한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “equals()는 **객체의 내용을 비교**하는 반면, ==는 **객체의 참조(레퍼런스)를 비교**합니다.”입니다.",
      "원문의 근거는 equals()는 **객체의 내용을 비교**하는 반면, ==는 **객체의 참조(레퍼런스)를 비교**합니다.라는 판단을 뒷받침합니다.",
      "“원문은 이 판단에 원문 밖의 정보가 반드시 필요하다고 설명한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “equals()는 **객체의 내용을 비교**하는 반면, ==는 **객체의 참조(레퍼런스)를 비교**합니다.”입니다."
    ],
    "keyPoints": [
      "equals()와 ==의 차이는 무엇인가요?",
      "동일성과",
      "동등성에",
      "대해서"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-28-follow-up-2",
    "kind": "follow-up",
    "followUpOf": "quiz-be-28-main",
    "followUpOrder": 2,
    "followUpRole": "core",
    "question": "동일성과 동등성 원문의 “equals()와 ==의 차이는 무엇인가요?” 구역과 일치하는 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "따라서 두 객체의 내용이 같더라도 서로 다른 객체라면 equals()는 true를 반환할 수 있지만, ==는 false를 반환합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 1,
    "explanation": "원문의 “equals()와 ==의 차이는 무엇인가요?” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "java-language",
    "sourceId": "be-28",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "equals()와 ==의 차이는 무엇인가요?",
    "sourceAnchor": "equals와-의-차이는-무엇인가요",
    "evidenceQuote": "따라서 두 객체의 내용이 같더라도 서로 다른 객체라면 equals()는 true를 반환할 수 있지만, ==는 false를 반환합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “따라서 두 객체의 내용이 같더라도 서로 다른 객체라면 equals()는 true를 반환할 수 있지만, ==는 false를 반환합니다.”입니다.",
      "원문의 “equals()와 ==의 차이는 무엇인가요?” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “따라서 두 객체의 내용이 같더라도 서로 다른 객체라면 equals()는 true를 반환할 수 있지만, ==는 false를 반환합니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “따라서 두 객체의 내용이 같더라도 서로 다른 객체라면 equals()는 true를 반환할 수 있지만, ==는 false를 반환합니다.”입니다."
    ],
    "keyPoints": [
      "equals()와 ==의 차이는 무엇인가요?",
      "동일성과",
      "동등성에",
      "대해서"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-28-follow-up-3",
    "kind": "follow-up",
    "followUpOf": "quiz-be-28-main",
    "followUpOrder": 3,
    "followUpRole": "remediation",
    "question": "동일성과 동등성의 핵심 근거를 다시 확인할 때 옳은 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "동등성은 논리적으로 객체의 내용이 같은지를 비교하는 개념입니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 2,
    "explanation": "원문의 “동등성(Equality)은 뭔가요?” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "java-language",
    "sourceId": "be-28",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "동등성(Equality)은 뭔가요?",
    "sourceAnchor": "동등성equality은-뭔가요",
    "evidenceQuote": "동등성은 논리적으로 객체의 내용이 같은지를 비교하는 개념입니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “동등성은 논리적으로 객체의 내용이 같은지를 비교하는 개념입니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “동등성은 논리적으로 객체의 내용이 같은지를 비교하는 개념입니다.”입니다.",
      "원문의 “동등성(Equality)은 뭔가요?” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “동등성은 논리적으로 객체의 내용이 같은지를 비교하는 개념입니다.”입니다."
    ],
    "keyPoints": [
      "동등성(Equality)은 뭔가요?",
      "동일성과",
      "동등성에",
      "대해서"
    ]
  },
  {
    "version": 2,
    "categoryId": "java-language",
    "sourceId": "be-46",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "evidenceQuote": "**스택(Stack)** 은 후입선출이라는 개념을 가진 선형 자료구조입니다. 스택 자료구조에서 삭제(pop)는 가장 최상단(top)에서만 이루어집니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-46-main",
    "kind": "main",
    "followUpOf": null,
    "question": "스택의 삭제(pop)는 어디에서만 이루어지나요?",
    "choices": [
      "가장 하단에서만",
      "임의 위치에서만",
      "가장 최상단(top)",
      "메모리 밖에서만"
    ],
    "correctIndex": 2,
    "explanation": "원문은 가장 최상단(top)라고 설명합니다.",
    "followUpOrder": null,
    "followUpRole": null,
    "sourceAnchor": "content-answer",
    "choiceFeedback": [
      "“가장 하단에서만”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “가장 최상단(top)”입니다.",
      "“임의 위치에서만”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “가장 최상단(top)”입니다.",
      "원문은 가장 최상단(top)라고 설명합니다.",
      "“메모리 밖에서만”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “가장 최상단(top)”입니다."
    ],
    "keyPoints": [
      "본문",
      "자료구조",
      "스택에",
      "대해서"
    ]
  },
  {
    "version": 2,
    "categoryId": "java-language",
    "sourceId": "be-46",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "자바에서 스택은 어떻게 사용할 수 있나요?",
    "evidenceQuote": "Stack이라는 클래스를 사용할 수 있습니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-46-follow-up",
    "kind": "follow-up",
    "followUpOf": "quiz-be-46-main",
    "question": "be-46 원문에서 기본 개념 다음에 제시한 조건·영향 중 알맞은 것은 무엇인가요?",
    "choices": [
      "원문은 이 조건이 모든 상황에서 반대로 적용된다고 설명한다.",
      "원문은 이 결과가 아무 조건 없이 항상 발생한다고 설명한다.",
      "Stack이라는 클래스를 사용할 수 있습니다.",
      "원문은 이 판단에 원문 밖의 정보가 반드시 필요하다고 설명한다."
    ],
    "correctIndex": 2,
    "explanation": "원문의 근거는 Stack이라는 클래스를 사용할 수 있습니다.라는 판단을 뒷받침합니다.",
    "followUpOrder": 1,
    "followUpRole": "core",
    "sourceAnchor": "자바에서-스택은-어떻게-사용할-수-있나요",
    "choiceFeedback": [
      "“원문은 이 조건이 모든 상황에서 반대로 적용된다고 설명한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “Stack이라는 클래스를 사용할 수 있습니다.”입니다.",
      "“원문은 이 결과가 아무 조건 없이 항상 발생한다고 설명한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “Stack이라는 클래스를 사용할 수 있습니다.”입니다.",
      "원문의 근거는 Stack이라는 클래스를 사용할 수 있습니다.라는 판단을 뒷받침합니다.",
      "“원문은 이 판단에 원문 밖의 정보가 반드시 필요하다고 설명한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “Stack이라는 클래스를 사용할 수 있습니다.”입니다."
    ],
    "keyPoints": [
      "자바에서 스택은 어떻게 사용할 수 있나요?",
      "자료구조",
      "스택에",
      "대해서"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-46-follow-up-2",
    "kind": "follow-up",
    "followUpOf": "quiz-be-46-main",
    "followUpOrder": 2,
    "followUpRole": "core",
    "question": "자료구조 스택 원문의 “본문” 구역과 일치하는 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "비어있는 스택에서 값을 추출하려고 시도하는 경우를 스택 언더플로우라고 하며, 스택이 넘치는 경우를 스택  오버플로우라고 합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 1,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "java-language",
    "sourceId": "be-46",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "비어있는 스택에서 값을 추출하려고 시도하는 경우를 스택 언더플로우라고 하며, 스택이 넘치는 경우를 스택  오버플로우라고 합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “비어있는 스택에서 값을 추출하려고 시도하는 경우를 스택 언더플로우라고 하며, 스택이 넘치는 경우를 스택  오버플로우라고 합니다.”입니다.",
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “비어있는 스택에서 값을 추출하려고 시도하는 경우를 스택 언더플로우라고 하며, 스택이 넘치는 경우를 스택  오버플로우라고 합니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “비어있는 스택에서 값을 추출하려고 시도하는 경우를 스택 언더플로우라고 하며, 스택이 넘치는 경우를 스택  오버플로우라고 합니다.”입니다."
    ],
    "keyPoints": [
      "본문",
      "자료구조",
      "스택에",
      "대해서"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-46-follow-up-3",
    "kind": "follow-up",
    "followUpOf": "quiz-be-46-main",
    "followUpOrder": 3,
    "followUpRole": "remediation",
    "question": "자료구조 스택의 핵심 근거를 다시 확인할 때 옳은 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "대표적인 활용 사례는 스택 메모리, 브라우저 뒤로가기 기능, 언두 기능, 수식 괄호 검사 등이 있습니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 2,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "java-language",
    "sourceId": "be-46",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "대표적인 활용 사례는 스택 메모리, 브라우저 뒤로가기 기능, 언두 기능, 수식 괄호 검사 등이 있습니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “대표적인 활용 사례는 스택 메모리, 브라우저 뒤로가기 기능, 언두 기능, 수식 괄호 검사 등이 있습니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “대표적인 활용 사례는 스택 메모리, 브라우저 뒤로가기 기능, 언두 기능, 수식 괄호 검사 등이 있습니다.”입니다.",
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “대표적인 활용 사례는 스택 메모리, 브라우저 뒤로가기 기능, 언두 기능, 수식 괄호 검사 등이 있습니다.”입니다."
    ],
    "keyPoints": [
      "본문",
      "자료구조",
      "스택에",
      "대해서"
    ]
  },
  {
    "version": 2,
    "categoryId": "java-language",
    "sourceId": "be-68",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "evidenceQuote": "특정 메서드를 호출하는 경우 인자로 전달하는 방법은 크게 2가지가 존재하는데요. 값에 의한 호출(Call By Value), 참조에 의한 호출(Call By Reference)이 이에 해당됩니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-68-main",
    "kind": "main",
    "followUpOf": null,
    "question": "메서드 인자 전달 방법으로 원문이 든 두 가지는 무엇인가요?",
    "choices": [
      "동기 호출과 비동기 호출",
      "읽기 호출과 쓰기 호출",
      "값에 의한 호출과 참조에 의한 호출",
      "정렬 호출과 탐색 호출"
    ],
    "correctIndex": 2,
    "explanation": "원문은 값에 의한 호출과 참조에 의한 호출라고 설명합니다.",
    "followUpOrder": null,
    "followUpRole": null,
    "sourceAnchor": "content-answer",
    "choiceFeedback": [
      "“동기 호출과 비동기 호출”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “값에 의한 호출과 참조에 의한 호출”입니다.",
      "“읽기 호출과 쓰기 호출”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “값에 의한 호출과 참조에 의한 호출”입니다.",
      "원문은 값에 의한 호출과 참조에 의한 호출라고 설명합니다.",
      "“정렬 호출과 탐색 호출”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “값에 의한 호출과 참조에 의한 호출”입니다."
    ],
    "keyPoints": [
      "본문",
      "Call",
      "By",
      "Value와"
    ]
  },
  {
    "version": 2,
    "categoryId": "java-language",
    "sourceId": "be-68",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "evidenceQuote": "**값에 의한 호출(Call By Value)** 은 메서드를 호출할 때, 값 자체를 넘겨주는 방식입니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-68-follow-up",
    "kind": "follow-up",
    "followUpOf": "quiz-be-68-main",
    "question": "be-68 원문에서 기본 개념 다음에 제시한 조건·영향 중 알맞은 것은 무엇인가요?",
    "choices": [
      "원문은 이 조건이 모든 상황에서 반대로 적용된다고 설명한다.",
      "원문은 이 결과가 아무 조건 없이 항상 발생한다고 설명한다.",
      "**값에 의한 호출(Call By Value)** 은 메서드를 호출할 때, 값 자체를 넘겨주는 방식입니다.",
      "원문은 이 판단에 원문 밖의 정보가 반드시 필요하다고 설명한다."
    ],
    "correctIndex": 2,
    "explanation": "원문의 근거는 **값에 의한 호출(Call By Value)** 은 메서드를 호출할 때, 값 자체를 넘겨주는 방식입니다.라는 판단을 뒷받침합니다.",
    "followUpOrder": 1,
    "followUpRole": "core",
    "sourceAnchor": "content-answer",
    "choiceFeedback": [
      "“원문은 이 조건이 모든 상황에서 반대로 적용된다고 설명한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “**값에 의한 호출(Call By Value)** 은 메서드를 호출할 때, 값 자체를 넘겨주는 방식입니다.”입니다.",
      "“원문은 이 결과가 아무 조건 없이 항상 발생한다고 설명한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “**값에 의한 호출(Call By Value)** 은 메서드를 호출할 때, 값 자체를 넘겨주는 방식입니다.”입니다.",
      "원문의 근거는 **값에 의한 호출(Call By Value)** 은 메서드를 호출할 때, 값 자체를 넘겨주는 방식입니다.라는 판단을 뒷받침합니다.",
      "“원문은 이 판단에 원문 밖의 정보가 반드시 필요하다고 설명한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “**값에 의한 호출(Call By Value)** 은 메서드를 호출할 때, 값 자체를 넘겨주는 방식입니다.”입니다."
    ],
    "keyPoints": [
      "본문",
      "Call",
      "By",
      "Value와"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-68-follow-up-2",
    "kind": "follow-up",
    "followUpOf": "quiz-be-68-main",
    "followUpOrder": 2,
    "followUpRole": "core",
    "question": "Call By Value와 Call By Reference 원문의 “본문” 구역과 일치하는 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "메서드를 호출하는 함수의 변수와 호출된 함수의 파라미터는 서로 다른 변수입니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 1,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "java-language",
    "sourceId": "be-68",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "메서드를 호출하는 함수의 변수와 호출된 함수의 파라미터는 서로 다른 변수입니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “메서드를 호출하는 함수의 변수와 호출된 함수의 파라미터는 서로 다른 변수입니다.”입니다.",
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “메서드를 호출하는 함수의 변수와 호출된 함수의 파라미터는 서로 다른 변수입니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “메서드를 호출하는 함수의 변수와 호출된 함수의 파라미터는 서로 다른 변수입니다.”입니다."
    ],
    "keyPoints": [
      "본문",
      "Call",
      "By",
      "Value와"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-68-follow-up-3",
    "kind": "follow-up",
    "followUpOf": "quiz-be-68-main",
    "followUpOrder": 3,
    "followUpRole": "remediation",
    "question": "Call By Value와 Call By Reference의 핵심 근거를 다시 확인할 때 옳은 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "반면, **참조에 의한 호출은(Call By Reference)** 는 메서드를 호출할 때, 참조를 직접 전달하는 방식입니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 2,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "java-language",
    "sourceId": "be-68",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "반면, **참조에 의한 호출은(Call By Reference)** 는 메서드를 호출할 때, 참조를 직접 전달하는 방식입니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “반면, **참조에 의한 호출은(Call By Reference)** 는 메서드를 호출할 때, 참조를 직접 전달하는 방식입니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “반면, **참조에 의한 호출은(Call By Reference)** 는 메서드를 호출할 때, 참조를 직접 전달하는 방식입니다.”입니다.",
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “반면, **참조에 의한 호출은(Call By Reference)** 는 메서드를 호출할 때, 참조를 직접 전달하는 방식입니다.”입니다."
    ],
    "keyPoints": [
      "본문",
      "Call",
      "By",
      "Value와"
    ]
  },
  {
    "version": 2,
    "categoryId": "java-language",
    "sourceId": "be-69",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "evidenceQuote": "**방어적 복사(Defensive Copy)** 는 원본과의 참조를 끊은 복사본을 만들어 사용하는 방식이며, 원본의 변경에 의한 예상치 못한 사이드 이펙트를 방지하여 안전한 코드를 만들 수 있는데 도움이 됩니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-69-main",
    "kind": "main",
    "followUpOf": null,
    "question": "방어적 복사의 목적은 무엇인가요?",
    "choices": [
      "원본 객체를 즉시 삭제하는 것",
      "복사본을 원본과 반드시 공유하는 것",
      "네트워크 요청을 줄이는 것",
      "원본과 참조를 끊은 복사본으로 원본 변경에 의한 예상치 못한 부수 효과를 방지하는 것"
    ],
    "correctIndex": 3,
    "explanation": "원문은 원본과 참조를 끊은 복사본으로 원본 변경에 의한 예상치 못한 부수 효과를 방지하는 것라고 설명합니다.",
    "followUpOrder": null,
    "followUpRole": null,
    "sourceAnchor": "content-answer",
    "choiceFeedback": [
      "“원본 객체를 즉시 삭제하는 것”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “원본과 참조를 끊은 복사본으로 원본 변경에 의한 예상치 못한 부수 효과를 방지하는 것”입니다.",
      "“복사본을 원본과 반드시 공유하는 것”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “원본과 참조를 끊은 복사본으로 원본 변경에 의한 예상치 못한 부수 효과를 방지하는 것”입니다.",
      "“네트워크 요청을 줄이는 것”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “원본과 참조를 끊은 복사본으로 원본 변경에 의한 예상치 못한 부수 효과를 방지하는 것”입니다.",
      "원문은 원본과 참조를 끊은 복사본으로 원본 변경에 의한 예상치 못한 부수 효과를 방지하는 것라고 설명합니다."
    ],
    "keyPoints": [
      "본문",
      "방어적",
      "복사에",
      "대해서"
    ]
  },
  {
    "version": 2,
    "categoryId": "java-language",
    "sourceId": "be-69",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "evidenceQuote": "방어적 복사는 2가지 시점이 존재하는데요. 생성자의 인자로 받은 객체의 복사본을 만들어 내부 필드를 초기화하거나, getter 메서드에서 객체를 반환할 때, 복사본을 만들어 반환할 수 있습니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-69-follow-up",
    "kind": "follow-up",
    "followUpOf": "quiz-be-69-main",
    "question": "be-69 원문에서 기본 개념 다음에 제시한 조건·영향 중 알맞은 것은 무엇인가요?",
    "choices": [
      "원문은 이 조건이 모든 상황에서 반대로 적용된다고 설명한다.",
      "원문은 이 결과가 아무 조건 없이 항상 발생한다고 설명한다.",
      "원문은 이 판단에 원문 밖의 정보가 반드시 필요하다고 설명한다.",
      "방어적 복사는 2가지 시점이 존재하는데요. 생성자의 인자로 받은 객체의 복사본을 만들어 내부 필드를 초기화하거나, getter 메서드에서 객체를 반환할 때, 복사본을 만들어 반환할 수 있습니다."
    ],
    "correctIndex": 3,
    "explanation": "원문의 근거는 방어적 복사는 2가지 시점이 존재하는데요. 생성자의 인자로 받은 객체의 복사본을 만들어 내부 필드를 초기화하거나, getter 메서드에서 객체를 반환할 때, 복사본을 만들어 반환할 수 있습니다.라는 판단을 뒷받침합니다.",
    "followUpOrder": 1,
    "followUpRole": "core",
    "sourceAnchor": "content-answer",
    "choiceFeedback": [
      "“원문은 이 조건이 모든 상황에서 반대로 적용된다고 설명한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “방어적 복사는 2가지 시점이 존재하는데요. 생성자의 인자로 받은 객체의 복사본을 만들어 내부 필드를 초기화하거나, getter 메서드에서 객체를 반환할 때, 복사본을 만들어 반환할 수 있습니다.”입니다.",
      "“원문은 이 결과가 아무 조건 없이 항상 발생한다고 설명한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “방어적 복사는 2가지 시점이 존재하는데요. 생성자의 인자로 받은 객체의 복사본을 만들어 내부 필드를 초기화하거나, getter 메서드에서 객체를 반환할 때, 복사본을 만들어 반환할 수 있습니다.”입니다.",
      "“원문은 이 판단에 원문 밖의 정보가 반드시 필요하다고 설명한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “방어적 복사는 2가지 시점이 존재하는데요. 생성자의 인자로 받은 객체의 복사본을 만들어 내부 필드를 초기화하거나, getter 메서드에서 객체를 반환할 때, 복사본을 만들어 반환할 수 있습니다.”입니다.",
      "원문의 근거는 방어적 복사는 2가지 시점이 존재하는데요. 생성자의 인자로 받은 객체의 복사본을 만들어 내부 필드를 초기화하거나, getter 메서드에서 객체를 반환할 때, 복사본을 만들어 반환할 수 있습니다.라는 판단을 뒷받침합니다."
    ],
    "keyPoints": [
      "본문",
      "방어적",
      "복사에",
      "대해서"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-69-follow-up-2",
    "kind": "follow-up",
    "followUpOf": "quiz-be-69-main",
    "followUpOrder": 2,
    "followUpRole": "core",
    "question": "방어적 복사 원문의 “본문” 구역과 일치하는 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "만약 컬렉션 자료구조를 반환하는 경우라면 자바의 Unmodifiable Collection을 사용하여, 외부에서 Collection에 대해 조회만 할 수 있도록 강제할 수 있습니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 2,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "java-language",
    "sourceId": "be-69",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "만약 컬렉션 자료구조를 반환하는 경우라면 자바의 Unmodifiable Collection을 사용하여, 외부에서 Collection에 대해 조회만 할 수 있도록 강제할 수 있습니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “만약 컬렉션 자료구조를 반환하는 경우라면 자바의 Unmodifiable Collection을 사용하여, 외부에서 Collection에 대해 조회만 할 수 있도록 강제할 수 있습니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “만약 컬렉션 자료구조를 반환하는 경우라면 자바의 Unmodifiable Collection을 사용하여, 외부에서 Collection에 대해 조회만 할 수 있도록 강제할 수 있습니다.”입니다.",
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “만약 컬렉션 자료구조를 반환하는 경우라면 자바의 Unmodifiable Collection을 사용하여, 외부에서 Collection에 대해 조회만 할 수 있도록 강제할 수 있습니다.”입니다."
    ],
    "keyPoints": [
      "본문",
      "방어적",
      "복사에",
      "대해서"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-69-follow-up-3",
    "kind": "follow-up",
    "followUpOf": "quiz-be-69-main",
    "followUpOrder": 3,
    "followUpRole": "remediation",
    "question": "방어적 복사의 핵심 근거를 다시 확인할 때 옳은 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.",
      "자바에서 Unmodifiable Collection은 set(), add(), addAll() 처럼 컬렉션에 요소를 추가하거나 변경하는 메서드를 사용하는 경우, 예외를 발생합니다."
    ],
    "correctIndex": 3,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "java-language",
    "sourceId": "be-69",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "자바에서 Unmodifiable Collection은 set(), add(), addAll() 처럼 컬렉션에 요소를 추가하거나 변경하는 메서드를 사용하는 경우, 예외를 발생합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “자바에서 Unmodifiable Collection은 set(), add(), addAll() 처럼 컬렉션에 요소를 추가하거나 변경하는 메서드를 사용하는 경우, 예외를 발생합니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “자바에서 Unmodifiable Collection은 set(), add(), addAll() 처럼 컬렉션에 요소를 추가하거나 변경하는 메서드를 사용하는 경우, 예외를 발생합니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “자바에서 Unmodifiable Collection은 set(), add(), addAll() 처럼 컬렉션에 요소를 추가하거나 변경하는 메서드를 사용하는 경우, 예외를 발생합니다.”입니다.",
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다."
    ],
    "keyPoints": [
      "본문",
      "방어적",
      "복사에",
      "대해서"
    ]
  },
  {
    "version": 2,
    "categoryId": "java-language",
    "sourceId": "be-70",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "evidenceQuote": "해시 자료 구조는 키를 해시 함수에 넣어서 나오는 결과를 기반으로 값을 관리하는데요. 해시 함수는 다른 키를 사용해도 같은 결과가 나오는 경우가 존재합니다. 이를 **해시 충돌(Hash Collision)** 이라고 합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-70-main",
    "kind": "main",
    "followUpOf": null,
    "question": "해시 충돌은 어떤 경우를 말하나요?",
    "choices": [
      "같은 키가 항상 다른 결과를 내는 경우",
      "해시 테이블이 비어 있는 경우",
      "키가 문자열인 경우",
      "서로 다른 키가 해시 함수에서 같은 결과를 내는 경우"
    ],
    "correctIndex": 3,
    "explanation": "원문은 서로 다른 키가 해시 함수에서 같은 결과를 내는 경우라고 설명합니다.",
    "followUpOrder": null,
    "followUpRole": null,
    "sourceAnchor": "content-answer",
    "choiceFeedback": [
      "“같은 키가 항상 다른 결과를 내는 경우”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “서로 다른 키가 해시 함수에서 같은 결과를 내는 경우”입니다.",
      "“해시 테이블이 비어 있는 경우”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “서로 다른 키가 해시 함수에서 같은 결과를 내는 경우”입니다.",
      "“키가 문자열인 경우”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “서로 다른 키가 해시 함수에서 같은 결과를 내는 경우”입니다.",
      "원문은 서로 다른 키가 해시 함수에서 같은 결과를 내는 경우라고 설명합니다."
    ],
    "keyPoints": [
      "본문",
      "해시",
      "충돌에",
      "대해서"
    ]
  },
  {
    "version": 2,
    "categoryId": "java-language",
    "sourceId": "be-70",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "해시 충돌은 어떻게 완화할 수 있나요?",
    "evidenceQuote": "해시 충돌을 완화하기 위한 접근 방법으로 개방 주소법과 분리 연결법이 대표적인데요. **개방 주소법(Open Addressing)** 은 특정 값이 들어가야 하는 자리(버킷)가 이미 사용되고 있는 경우 다른 해시 버킷에 데이터를 삽입하는 반면, **분리 연결법(Separate Chaining)** 은 버킷을 연결 리스트나 트리 형태로 관리하여 버킷에 들어갈 값의 수에 제한을 두지 않도록 하여 충돌을 완화합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-70-follow-up",
    "kind": "follow-up",
    "followUpOf": "quiz-be-70-main",
    "question": "be-70 원문에서 기본 개념 다음에 제시한 조건·영향 중 알맞은 것은 무엇인가요?",
    "choices": [
      "원문은 이 조건이 모든 상황에서 반대로 적용된다고 설명한다.",
      "원문은 이 결과가 아무 조건 없이 항상 발생한다고 설명한다.",
      "원문은 이 판단에 원문 밖의 정보가 반드시 필요하다고 설명한다.",
      "해시 충돌을 완화하기 위한 접근 방법으로 개방 주소법과 분리 연결법이 대표적인데요. **개방 주소법(Open Addressing)** 은 특정 값이 들어가야 하는 자리(버킷)가 이미 사용되고 있는 경우 다른 해시 버킷에 데이터를 삽입하는 반면, **분리 연결법(Separate Chaining)** 은 버킷을 연결 리스트나 트리 형태로 관리하여 버킷에 들어갈 값의 수에 제한을 두지 않도록 하여 충돌을 완화합니다."
    ],
    "correctIndex": 3,
    "explanation": "원문의 근거는 해시 충돌을 완화하기 위한 접근 방법으로 개방 주소법과 분리 연결법이 대표적인데요. **개방 주소법(Open Addressing)** 은 특정 값이 들어가야 하는 자리(버킷)가 이미 사용되고 있는 경우 다른 해시 버킷에 데이터를 삽입하는 반면, **분리 연결법(Separate Chaining)** 은 버킷을 연결 리스트나 트리 형태로 관리하여 버킷에 들어갈 값의 수에 제한을 두지 않도록 하여 충돌을 완화합니다.라는 판단을 뒷받침합니다.",
    "followUpOrder": 1,
    "followUpRole": "core",
    "sourceAnchor": "해시-충돌은-어떻게-완화할-수-있나요",
    "choiceFeedback": [
      "“원문은 이 조건이 모든 상황에서 반대로 적용된다고 설명한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “해시 충돌을 완화하기 위한 접근 방법으로 개방 주소법과 분리 연결법이 대표적인데요. **개방 주소법(Open Addressing)** 은 특정 값이 들어가야 하는 자리(버킷)가 이미 사용되고 있는 경우 다른 해시 버킷에 데이터를 삽입하는 반면, **분리 연결법(Separate Chaining)** 은 버킷을 연결 리스트나 트리 형태로 관리하여 버킷에 들어갈 값의 수에 제한을 두지 않도록 하여 충돌을 완화합니다.”입니다.",
      "“원문은 이 결과가 아무 조건 없이 항상 발생한다고 설명한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “해시 충돌을 완화하기 위한 접근 방법으로 개방 주소법과 분리 연결법이 대표적인데요. **개방 주소법(Open Addressing)** 은 특정 값이 들어가야 하는 자리(버킷)가 이미 사용되고 있는 경우 다른 해시 버킷에 데이터를 삽입하는 반면, **분리 연결법(Separate Chaining)** 은 버킷을 연결 리스트나 트리 형태로 관리하여 버킷에 들어갈 값의 수에 제한을 두지 않도록 하여 충돌을 완화합니다.”입니다.",
      "“원문은 이 판단에 원문 밖의 정보가 반드시 필요하다고 설명한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “해시 충돌을 완화하기 위한 접근 방법으로 개방 주소법과 분리 연결법이 대표적인데요. **개방 주소법(Open Addressing)** 은 특정 값이 들어가야 하는 자리(버킷)가 이미 사용되고 있는 경우 다른 해시 버킷에 데이터를 삽입하는 반면, **분리 연결법(Separate Chaining)** 은 버킷을 연결 리스트나 트리 형태로 관리하여 버킷에 들어갈 값의 수에 제한을 두지 않도록 하여 충돌을 완화합니다.”입니다.",
      "원문의 근거는 해시 충돌을 완화하기 위한 접근 방법으로 개방 주소법과 분리 연결법이 대표적인데요. **개방 주소법(Open Addressing)** 은 특정 값이 들어가야 하는 자리(버킷)가 이미 사용되고 있는 경우 다른 해시 버킷에 데이터를 삽입하는 반면, **분리 연결법(Separate Chaining)** 은 버킷을 연결 리스트나 트리 형태로 관리하여 버킷에 들어갈 값의 수에 제한을 두지 않도록 하여 충돌을 완화합니다.라는 판단을 뒷받침합니다."
    ],
    "keyPoints": [
      "해시 충돌은 어떻게 완화할 수 있나요?",
      "해시",
      "충돌에",
      "대해서"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-70-follow-up-2",
    "kind": "follow-up",
    "followUpOf": "quiz-be-70-main",
    "followUpOrder": 2,
    "followUpRole": "core",
    "question": "해시 충돌 원문의 “본문” 구역과 일치하는 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "해시(Hash) 자료 구조는 키값 쌍으로 이루어진 데이터 구조로 키를 이용해 값을 O(1) 시간 복잡도로 찾을 수 있습니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 2,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "java-language",
    "sourceId": "be-70",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "해시(Hash) 자료 구조는 키값 쌍으로 이루어진 데이터 구조로 키를 이용해 값을 O(1) 시간 복잡도로 찾을 수 있습니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “해시(Hash) 자료 구조는 키값 쌍으로 이루어진 데이터 구조로 키를 이용해 값을 O(1) 시간 복잡도로 찾을 수 있습니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “해시(Hash) 자료 구조는 키값 쌍으로 이루어진 데이터 구조로 키를 이용해 값을 O(1) 시간 복잡도로 찾을 수 있습니다.”입니다.",
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “해시(Hash) 자료 구조는 키값 쌍으로 이루어진 데이터 구조로 키를 이용해 값을 O(1) 시간 복잡도로 찾을 수 있습니다.”입니다."
    ],
    "keyPoints": [
      "본문",
      "해시",
      "충돌에",
      "대해서"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-70-follow-up-3",
    "kind": "follow-up",
    "followUpOf": "quiz-be-70-main",
    "followUpOrder": 3,
    "followUpRole": "remediation",
    "question": "해시 충돌의 핵심 근거를 다시 확인할 때 옳은 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.",
      "버킷이 이미 사용되고 있는 경우, 다른 해시 버킷을 찾기 위한 여러 방법이 존재합니다."
    ],
    "correctIndex": 3,
    "explanation": "원문의 “개방 주소법에서 다른 해시 버킷을 찾기 위한 방법에는 어떤 것이 존재하나요?” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "java-language",
    "sourceId": "be-70",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "개방 주소법에서 다른 해시 버킷을 찾기 위한 방법에는 어떤 것이 존재하나요?",
    "sourceAnchor": "개방-주소법에서-다른-해시-버킷을-찾기-위한-방법에는-어떤-것이-존재하나요",
    "evidenceQuote": "버킷이 이미 사용되고 있는 경우, 다른 해시 버킷을 찾기 위한 여러 방법이 존재합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “버킷이 이미 사용되고 있는 경우, 다른 해시 버킷을 찾기 위한 여러 방법이 존재합니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “버킷이 이미 사용되고 있는 경우, 다른 해시 버킷을 찾기 위한 여러 방법이 존재합니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “버킷이 이미 사용되고 있는 경우, 다른 해시 버킷을 찾기 위한 여러 방법이 존재합니다.”입니다.",
      "원문의 “개방 주소법에서 다른 해시 버킷을 찾기 위한 방법에는 어떤 것이 존재하나요?” 구역이 정답 선택지의 내용을 직접 설명합니다."
    ],
    "keyPoints": [
      "해시",
      "충돌에",
      "대해서",
      "자바 언어, 컬렉션과 자료구조"
    ]
  },
  {
    "version": 2,
    "categoryId": "java-language",
    "sourceId": "be-79",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "evidenceQuote": "**함수형 프로그래밍(Functional Programming)** 은 객체지향 패러다임과 마찬가지로 하나의 프로그래밍 패러다임입니다. 객체지향 프로그래밍은 움직이는 부분을 캡슐화하여 코드의 이해를 도우며, 함수형 프로그래밍은 움직이는 부분을 최소화하여 코드 이해를 돕습니다. 이 둘은 상충하는 개념이 아니며, 함께 조화되어 사용될 수 있습니다. 함수를 합성하여 복잡한 프로그램을 쉽게 만들고, 부수 효과를 공통적인 방법으로 추상화하는 것이 함수형 프로그래밍의 핵심 개념입니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-79-main",
    "kind": "main",
    "followUpOf": null,
    "question": "함수형 프로그래밍의 핵심 개념으로 원문이 든 것은 무엇인가요?",
    "choices": [
      "함수를 합성해 복잡한 프로그램을 쉽게 만들고 부수 효과를 공통 방식으로 추상화하는 것",
      "모든 상태 변경을 한 클래스에 모으는 것",
      "객체를 사용하지 않는 것",
      "함수를 호출하지 않는 것"
    ],
    "correctIndex": 0,
    "explanation": "원문은 함수를 합성해 복잡한 프로그램을 쉽게 만들고 부수 효과를 공통 방식으로 추상화하는 것라고 설명합니다.",
    "followUpOrder": null,
    "followUpRole": null,
    "sourceAnchor": "content-answer",
    "choiceFeedback": [
      "원문은 함수를 합성해 복잡한 프로그램을 쉽게 만들고 부수 효과를 공통 방식으로 추상화하는 것라고 설명합니다.",
      "“모든 상태 변경을 한 클래스에 모으는 것”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “함수를 합성해 복잡한 프로그램을 쉽게 만들고 부수 효과를 공통 방식으로 추상화하는 것”입니다.",
      "“객체를 사용하지 않는 것”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “함수를 합성해 복잡한 프로그램을 쉽게 만들고 부수 효과를 공통 방식으로 추상화하는 것”입니다.",
      "“함수를 호출하지 않는 것”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “함수를 합성해 복잡한 프로그램을 쉽게 만들고 부수 효과를 공통 방식으로 추상화하는 것”입니다."
    ],
    "keyPoints": [
      "본문",
      "함수형",
      "프로그래밍에",
      "대해서"
    ]
  },
  {
    "version": 2,
    "categoryId": "java-language",
    "sourceId": "be-79",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "evidenceQuote": "**부수 효과(Side Effect)** 는 값을 반환하는 것 이외에 부수적으로 발생하는 일들을 의미해요.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-79-follow-up",
    "kind": "follow-up",
    "followUpOf": "quiz-be-79-main",
    "question": "be-79 원문에서 기본 개념 다음에 제시한 조건·영향 중 알맞은 것은 무엇인가요?",
    "choices": [
      "**부수 효과(Side Effect)** 는 값을 반환하는 것 이외에 부수적으로 발생하는 일들을 의미해요.",
      "원문은 이 조건이 모든 상황에서 반대로 적용된다고 설명한다.",
      "원문은 이 결과가 아무 조건 없이 항상 발생한다고 설명한다.",
      "원문은 이 판단에 원문 밖의 정보가 반드시 필요하다고 설명한다."
    ],
    "correctIndex": 0,
    "explanation": "원문의 근거는 **부수 효과(Side Effect)** 는 값을 반환하는 것 이외에 부수적으로 발생하는 일들을 의미해요.라는 판단을 뒷받침합니다.",
    "followUpOrder": 1,
    "followUpRole": "core",
    "sourceAnchor": "content-answer",
    "choiceFeedback": [
      "원문의 근거는 **부수 효과(Side Effect)** 는 값을 반환하는 것 이외에 부수적으로 발생하는 일들을 의미해요.라는 판단을 뒷받침합니다.",
      "“원문은 이 조건이 모든 상황에서 반대로 적용된다고 설명한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “**부수 효과(Side Effect)** 는 값을 반환하는 것 이외에 부수적으로 발생하는 일들을 의미해요.”입니다.",
      "“원문은 이 결과가 아무 조건 없이 항상 발생한다고 설명한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “**부수 효과(Side Effect)** 는 값을 반환하는 것 이외에 부수적으로 발생하는 일들을 의미해요.”입니다.",
      "“원문은 이 판단에 원문 밖의 정보가 반드시 필요하다고 설명한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “**부수 효과(Side Effect)** 는 값을 반환하는 것 이외에 부수적으로 발생하는 일들을 의미해요.”입니다."
    ],
    "keyPoints": [
      "본문",
      "함수형",
      "프로그래밍에",
      "대해서"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-79-follow-up-2",
    "kind": "follow-up",
    "followUpOf": "quiz-be-79-main",
    "followUpOrder": 2,
    "followUpRole": "core",
    "question": "함수형 프로그래밍 원문의 “본문” 구역과 일치하는 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.",
      "사람이 한 번에 인지할 수 있는 작업은 한정되어 있습니다."
    ],
    "correctIndex": 3,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "java-language",
    "sourceId": "be-79",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "사람이 한 번에 인지할 수 있는 작업은 한정되어 있습니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “사람이 한 번에 인지할 수 있는 작업은 한정되어 있습니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “사람이 한 번에 인지할 수 있는 작업은 한정되어 있습니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “사람이 한 번에 인지할 수 있는 작업은 한정되어 있습니다.”입니다.",
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다."
    ],
    "keyPoints": [
      "본문",
      "함수형",
      "프로그래밍에",
      "대해서"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-79-follow-up-3",
    "kind": "follow-up",
    "followUpOf": "quiz-be-79-main",
    "followUpOrder": 3,
    "followUpRole": "remediation",
    "question": "함수형 프로그래밍의 핵심 근거를 다시 확인할 때 옳은 설명은 무엇인가요?",
    "choices": [
      "부수 효과가 많은 코드는 이해하고 결과를 예측하기 어려울 수 있습니다.",
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 0,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "java-language",
    "sourceId": "be-79",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "부수 효과가 많은 코드는 이해하고 결과를 예측하기 어려울 수 있습니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “부수 효과가 많은 코드는 이해하고 결과를 예측하기 어려울 수 있습니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “부수 효과가 많은 코드는 이해하고 결과를 예측하기 어려울 수 있습니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “부수 효과가 많은 코드는 이해하고 결과를 예측하기 어려울 수 있습니다.”입니다."
    ],
    "keyPoints": [
      "본문",
      "함수형",
      "프로그래밍에",
      "대해서"
    ]
  },
  {
    "version": 2,
    "categoryId": "java-language",
    "sourceId": "be-80",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "evidenceQuote": "**연결 리스트(Linked List)** 는 리스트 내의 요소(노드)들을 포인터로 연결하여 관리하는 선형 자료구조입니다. 각 노드는 데이터와 다음 요소에 대한 포인터를 가지고 있는데요. 이때, 첫 번째 노드를 HEAD, 마지막 노드를 TAIL 이라고 합니다. 연결 리스트는 메모리가 허용하는 한 요소를 계속 삽입할 수 있으며, 시각 복잡도는 탐색에는 O(n), 노드 삽입과 삭제는 O(1)라는 특징을 가지고 있습니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-80-main",
    "kind": "main",
    "followUpOf": null,
    "question": "연결 리스트의 탐색 시간 복잡도는 무엇인가요?",
    "choices": [
      "O(n)",
      "O(1)",
      "O(log n)만",
      "항상 O(n²)"
    ],
    "correctIndex": 0,
    "explanation": "원문은 O(n)라고 설명합니다.",
    "followUpOrder": null,
    "followUpRole": null,
    "sourceAnchor": "content-answer",
    "choiceFeedback": [
      "원문은 O(n)라고 설명합니다.",
      "“O(1)”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “O(n)”입니다.",
      "“O(log n)만”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “O(n)”입니다.",
      "“항상 O(n²)”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “O(n)”입니다."
    ],
    "keyPoints": [
      "본문",
      "연결",
      "리스트에",
      "대해서"
    ]
  },
  {
    "version": 2,
    "categoryId": "java-language",
    "sourceId": "be-80",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "evidenceQuote": "배열은 순차적인 데이터가 들어가기 때문에 메모리 영역을 연속적으로 사용합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-80-follow-up",
    "kind": "follow-up",
    "followUpOf": "quiz-be-80-main",
    "question": "be-80 원문에서 기본 개념 다음에 제시한 조건·영향 중 알맞은 것은 무엇인가요?",
    "choices": [
      "배열은 순차적인 데이터가 들어가기 때문에 메모리 영역을 연속적으로 사용합니다.",
      "원문은 이 조건이 모든 상황에서 반대로 적용된다고 설명한다.",
      "원문은 이 결과가 아무 조건 없이 항상 발생한다고 설명한다.",
      "원문은 이 판단에 원문 밖의 정보가 반드시 필요하다고 설명한다."
    ],
    "correctIndex": 0,
    "explanation": "원문의 근거는 배열은 순차적인 데이터가 들어가기 때문에 메모리 영역을 연속적으로 사용합니다.라는 판단을 뒷받침합니다.",
    "followUpOrder": 1,
    "followUpRole": "core",
    "sourceAnchor": "content-answer",
    "choiceFeedback": [
      "원문의 근거는 배열은 순차적인 데이터가 들어가기 때문에 메모리 영역을 연속적으로 사용합니다.라는 판단을 뒷받침합니다.",
      "“원문은 이 조건이 모든 상황에서 반대로 적용된다고 설명한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “배열은 순차적인 데이터가 들어가기 때문에 메모리 영역을 연속적으로 사용합니다.”입니다.",
      "“원문은 이 결과가 아무 조건 없이 항상 발생한다고 설명한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “배열은 순차적인 데이터가 들어가기 때문에 메모리 영역을 연속적으로 사용합니다.”입니다.",
      "“원문은 이 판단에 원문 밖의 정보가 반드시 필요하다고 설명한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “배열은 순차적인 데이터가 들어가기 때문에 메모리 영역을 연속적으로 사용합니다.”입니다."
    ],
    "keyPoints": [
      "본문",
      "연결",
      "리스트에",
      "대해서"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-80-follow-up-2",
    "kind": "follow-up",
    "followUpOf": "quiz-be-80-main",
    "followUpOrder": 2,
    "followUpRole": "core",
    "question": "연결 리스트 원문의 “본문” 구역과 일치하는 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.",
      "해당 아이디어로 파생된 자료구조는 단일 연결 리스트(Singly Linked List), 이중 연결 리스트(Doubly Linked List, Circular Linked List)가 존재합니다."
    ],
    "correctIndex": 3,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "java-language",
    "sourceId": "be-80",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "해당 아이디어로 파생된 자료구조는 단일 연결 리스트(Singly Linked List), 이중 연결 리스트(Doubly Linked List, Circular Linked List)가 존재합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “해당 아이디어로 파생된 자료구조는 단일 연결 리스트(Singly Linked List), 이중 연결 리스트(Doubly Linked List, Circular Linked List)가 존재합니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “해당 아이디어로 파생된 자료구조는 단일 연결 리스트(Singly Linked List), 이중 연결 리스트(Doubly Linked List, Circular Linked List)가 존재합니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “해당 아이디어로 파생된 자료구조는 단일 연결 리스트(Singly Linked List), 이중 연결 리스트(Doubly Linked List, Circular Linked List)가 존재합니다.”입니다.",
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다."
    ],
    "keyPoints": [
      "본문",
      "연결",
      "리스트에",
      "대해서"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-80-follow-up-3",
    "kind": "follow-up",
    "followUpOf": "quiz-be-80-main",
    "followUpOrder": 3,
    "followUpRole": "remediation",
    "question": "연결 리스트의 핵심 근거를 다시 확인할 때 옳은 설명은 무엇인가요?",
    "choices": [
      "반면, 연결 리스트는 메모리 공간에 흩어져서 존재한다는 점에서 배열과 차이가 있습니다.",
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 0,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "java-language",
    "sourceId": "be-80",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "반면, 연결 리스트는 메모리 공간에 흩어져서 존재한다는 점에서 배열과 차이가 있습니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “반면, 연결 리스트는 메모리 공간에 흩어져서 존재한다는 점에서 배열과 차이가 있습니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “반면, 연결 리스트는 메모리 공간에 흩어져서 존재한다는 점에서 배열과 차이가 있습니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “반면, 연결 리스트는 메모리 공간에 흩어져서 존재한다는 점에서 배열과 차이가 있습니다.”입니다."
    ],
    "keyPoints": [
      "본문",
      "연결",
      "리스트에",
      "대해서"
    ]
  },
  {
    "version": 2,
    "categoryId": "java-language",
    "sourceId": "be-98",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "evidenceQuote": "자바에서 클래스 정보를 가져오기 위해서 **Reflection API**를 사용할 수 있습니다. reflection 패키지에서 제공하는 클래스를 사용하면, JVM에 로딩되어 있는 클래스와 메서드의 정보를 읽어올 수 있습니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-98-main",
    "kind": "main",
    "followUpOf": null,
    "question": "자바에서 JVM에 로딩된 클래스와 메서드 정보를 읽는 데 사용하는 것은 무엇인가요?",
    "choices": [
      "ThreadLocal",
      "Reflection API",
      "GC API",
      "JDBC 드라이버"
    ],
    "correctIndex": 1,
    "explanation": "원문은 Reflection API라고 설명합니다.",
    "followUpOrder": null,
    "followUpRole": null,
    "sourceAnchor": "content-answer",
    "choiceFeedback": [
      "“ThreadLocal”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “Reflection API”입니다.",
      "원문은 Reflection API라고 설명합니다.",
      "“GC API”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “Reflection API”입니다.",
      "“JDBC 드라이버”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “Reflection API”입니다."
    ],
    "keyPoints": [
      "본문",
      "자바에서",
      "클래스",
      "정보는"
    ]
  },
  {
    "version": 2,
    "categoryId": "java-language",
    "sourceId": "be-98",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "evidenceQuote": "Reflection API를 사용하면 구체적인 클래스의 타입을 몰라도, 클래스의 정보에 접근할 수 있습니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-98-follow-up",
    "kind": "follow-up",
    "followUpOf": "quiz-be-98-main",
    "question": "be-98 원문에서 기본 개념 다음에 제시한 조건·영향 중 알맞은 것은 무엇인가요?",
    "choices": [
      "원문은 이 조건이 모든 상황에서 반대로 적용된다고 설명한다.",
      "Reflection API를 사용하면 구체적인 클래스의 타입을 몰라도, 클래스의 정보에 접근할 수 있습니다.",
      "원문은 이 결과가 아무 조건 없이 항상 발생한다고 설명한다.",
      "원문은 이 판단에 원문 밖의 정보가 반드시 필요하다고 설명한다."
    ],
    "correctIndex": 1,
    "explanation": "원문의 근거는 Reflection API를 사용하면 구체적인 클래스의 타입을 몰라도, 클래스의 정보에 접근할 수 있습니다.라는 판단을 뒷받침합니다.",
    "followUpOrder": 1,
    "followUpRole": "core",
    "sourceAnchor": "content-answer",
    "choiceFeedback": [
      "“원문은 이 조건이 모든 상황에서 반대로 적용된다고 설명한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “Reflection API를 사용하면 구체적인 클래스의 타입을 몰라도, 클래스의 정보에 접근할 수 있습니다.”입니다.",
      "원문의 근거는 Reflection API를 사용하면 구체적인 클래스의 타입을 몰라도, 클래스의 정보에 접근할 수 있습니다.라는 판단을 뒷받침합니다.",
      "“원문은 이 결과가 아무 조건 없이 항상 발생한다고 설명한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “Reflection API를 사용하면 구체적인 클래스의 타입을 몰라도, 클래스의 정보에 접근할 수 있습니다.”입니다.",
      "“원문은 이 판단에 원문 밖의 정보가 반드시 필요하다고 설명한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “Reflection API를 사용하면 구체적인 클래스의 타입을 몰라도, 클래스의 정보에 접근할 수 있습니다.”입니다."
    ],
    "keyPoints": [
      "본문",
      "자바에서",
      "클래스",
      "정보는"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-98-follow-up-2",
    "kind": "follow-up",
    "followUpOf": "quiz-be-98-main",
    "followUpOrder": 2,
    "followUpRole": "core",
    "question": "자바에서 클래스 정보는 어떻게 알아낼 수 있나요 원문의 “본문” 구역과 일치하는 설명은 무엇인가요?",
    "choices": [
      "대표적으로 Class 클래스, Method 클래스, Field 클래스가 존재합니다.",
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 0,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "java-language",
    "sourceId": "be-98",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "대표적으로 Class 클래스, Method 클래스, Field 클래스가 존재합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “대표적으로 Class 클래스, Method 클래스, Field 클래스가 존재합니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “대표적으로 Class 클래스, Method 클래스, Field 클래스가 존재합니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “대표적으로 Class 클래스, Method 클래스, Field 클래스가 존재합니다.”입니다."
    ],
    "keyPoints": [
      "본문",
      "자바에서",
      "클래스",
      "정보는"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-98-follow-up-3",
    "kind": "follow-up",
    "followUpOf": "quiz-be-98-main",
    "followUpOrder": 3,
    "followUpRole": "remediation",
    "question": "자바에서 클래스 정보는 어떻게 알아낼 수 있나요의 핵심 근거를 다시 확인할 때 옳은 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "개발자는 이러한 특성을 이용하여 인스턴스를 감싸는 프록시를 만들거나, 사용자로부터 전달된 값을 처리할 메서드를 유연하게 선택하는 등 다양한 구현을 할 수 있습니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 1,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "java-language",
    "sourceId": "be-98",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "개발자는 이러한 특성을 이용하여 인스턴스를 감싸는 프록시를 만들거나, 사용자로부터 전달된 값을 처리할 메서드를 유연하게 선택하는 등 다양한 구현을 할 수 있습니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “개발자는 이러한 특성을 이용하여 인스턴스를 감싸는 프록시를 만들거나, 사용자로부터 전달된 값을 처리할 메서드를 유연하게 선택하는 등 다양한 구현을 할 수 있습니다.”입니다.",
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “개발자는 이러한 특성을 이용하여 인스턴스를 감싸는 프록시를 만들거나, 사용자로부터 전달된 값을 처리할 메서드를 유연하게 선택하는 등 다양한 구현을 할 수 있습니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “개발자는 이러한 특성을 이용하여 인스턴스를 감싸는 프록시를 만들거나, 사용자로부터 전달된 값을 처리할 메서드를 유연하게 선택하는 등 다양한 구현을 할 수 있습니다.”입니다."
    ],
    "keyPoints": [
      "본문",
      "자바에서",
      "클래스",
      "정보는"
    ]
  },
  {
    "version": 2,
    "categoryId": "java-language",
    "sourceId": "be-104",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "evidenceQuote": "이러한 아이디어를 기반으로 특정 입력을 기준으로 개략적인 연산의 수를 계산한 것이 **시간 복잡도(Time Complexity)** 입니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-104-main",
    "kind": "main",
    "followUpOf": null,
    "question": "시간 복잡도는 무엇을 기준으로 알고리즘 속도를 평가하나요?",
    "choices": [
      "디스크 용량만",
      "특정 입력 기준의 개략적인 연산 수",
      "소스 파일 줄 수만",
      "네트워크 패킷 수만"
    ],
    "correctIndex": 1,
    "explanation": "원문은 특정 입력 기준의 개략적인 연산 수라고 설명합니다.",
    "followUpOrder": null,
    "followUpRole": null,
    "sourceAnchor": "content-answer",
    "choiceFeedback": [
      "“디스크 용량만”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “특정 입력 기준의 개략적인 연산 수”입니다.",
      "원문은 특정 입력 기준의 개략적인 연산 수라고 설명합니다.",
      "“소스 파일 줄 수만”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “특정 입력 기준의 개략적인 연산 수”입니다.",
      "“네트워크 패킷 수만”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “특정 입력 기준의 개략적인 연산 수”입니다."
    ],
    "keyPoints": [
      "본문",
      "시간",
      "복잡도와",
      "공간"
    ]
  },
  {
    "version": 2,
    "categoryId": "java-language",
    "sourceId": "be-104",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "evidenceQuote": "하나의 문제를 해결하는 여러 알고리즘이 존재할 수 있습니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-104-follow-up",
    "kind": "follow-up",
    "followUpOf": "quiz-be-104-main",
    "question": "be-104 원문에서 기본 개념 다음에 제시한 조건·영향 중 알맞은 것은 무엇인가요?",
    "choices": [
      "원문은 이 조건이 모든 상황에서 반대로 적용된다고 설명한다.",
      "하나의 문제를 해결하는 여러 알고리즘이 존재할 수 있습니다.",
      "원문은 이 결과가 아무 조건 없이 항상 발생한다고 설명한다.",
      "원문은 이 판단에 원문 밖의 정보가 반드시 필요하다고 설명한다."
    ],
    "correctIndex": 1,
    "explanation": "원문의 근거는 하나의 문제를 해결하는 여러 알고리즘이 존재할 수 있습니다.라는 판단을 뒷받침합니다.",
    "followUpOrder": 1,
    "followUpRole": "core",
    "sourceAnchor": "content-answer",
    "choiceFeedback": [
      "“원문은 이 조건이 모든 상황에서 반대로 적용된다고 설명한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “하나의 문제를 해결하는 여러 알고리즘이 존재할 수 있습니다.”입니다.",
      "원문의 근거는 하나의 문제를 해결하는 여러 알고리즘이 존재할 수 있습니다.라는 판단을 뒷받침합니다.",
      "“원문은 이 결과가 아무 조건 없이 항상 발생한다고 설명한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “하나의 문제를 해결하는 여러 알고리즘이 존재할 수 있습니다.”입니다.",
      "“원문은 이 판단에 원문 밖의 정보가 반드시 필요하다고 설명한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “하나의 문제를 해결하는 여러 알고리즘이 존재할 수 있습니다.”입니다."
    ],
    "keyPoints": [
      "본문",
      "시간",
      "복잡도와",
      "공간"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-104-follow-up-2",
    "kind": "follow-up",
    "followUpOf": "quiz-be-104-main",
    "followUpOrder": 2,
    "followUpRole": "core",
    "question": "시간 복잡도와 공간 복잡도의 차이점은 무엇인가요 원문의 “본문” 구역과 일치하는 설명은 무엇인가요?",
    "choices": [
      "그리고, 개발자는 성능을 평가하여 하나를 결정해야 합니다.",
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 0,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "java-language",
    "sourceId": "be-104",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "그리고, 개발자는 성능을 평가하여 하나를 결정해야 합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “그리고, 개발자는 성능을 평가하여 하나를 결정해야 합니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “그리고, 개발자는 성능을 평가하여 하나를 결정해야 합니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “그리고, 개발자는 성능을 평가하여 하나를 결정해야 합니다.”입니다."
    ],
    "keyPoints": [
      "본문",
      "시간",
      "복잡도와",
      "공간"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-104-follow-up-3",
    "kind": "follow-up",
    "followUpOf": "quiz-be-104-main",
    "followUpOrder": 3,
    "followUpRole": "remediation",
    "question": "시간 복잡도와 공간 복잡도의 차이점은 무엇인가요의 핵심 근거를 다시 확인할 때 옳은 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "이때, 코드가 실행될 때 걸리는 정확한 시간을 측정하는 방법으로 속도를 비교할 수 있습니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 1,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "java-language",
    "sourceId": "be-104",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "이때, 코드가 실행될 때 걸리는 정확한 시간을 측정하는 방법으로 속도를 비교할 수 있습니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “이때, 코드가 실행될 때 걸리는 정확한 시간을 측정하는 방법으로 속도를 비교할 수 있습니다.”입니다.",
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “이때, 코드가 실행될 때 걸리는 정확한 시간을 측정하는 방법으로 속도를 비교할 수 있습니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “이때, 코드가 실행될 때 걸리는 정확한 시간을 측정하는 방법으로 속도를 비교할 수 있습니다.”입니다."
    ],
    "keyPoints": [
      "본문",
      "시간",
      "복잡도와",
      "공간"
    ]
  },
  {
    "version": 2,
    "categoryId": "java-language",
    "sourceId": "be-106",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "evidenceQuote": "try-with-resources가 정상적으로 동작하려면 `AutoCloseable` 인터페이스를 구현한 객체를 사용해야 하고, `try()` 괄호 내에서 변수를 선언해야 합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-106-main",
    "kind": "main",
    "followUpOf": null,
    "question": "try-with-resources가 자원을 자동 해제하려면 어떤 객체를 사용해야 하나요?",
    "choices": [
      "Serializable만 구현한 객체",
      "Runnable만 구현한 객체",
      "Comparable만 구현한 객체",
      "AutoCloseable 인터페이스를 구현한 객체"
    ],
    "correctIndex": 3,
    "explanation": "원문은 AutoCloseable 인터페이스를 구현한 객체라고 설명합니다.",
    "followUpOrder": null,
    "followUpRole": null,
    "sourceAnchor": "content-answer",
    "choiceFeedback": [
      "“Serializable만 구현한 객체”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “AutoCloseable 인터페이스를 구현한 객체”입니다.",
      "“Runnable만 구현한 객체”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “AutoCloseable 인터페이스를 구현한 객체”입니다.",
      "“Comparable만 구현한 객체”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “AutoCloseable 인터페이스를 구현한 객체”입니다.",
      "원문은 AutoCloseable 인터페이스를 구현한 객체라고 설명합니다."
    ],
    "keyPoints": [
      "본문",
      "try-with-resources에",
      "대해",
      "자바 언어, 컬렉션과 자료구조"
    ]
  },
  {
    "version": 2,
    "categoryId": "java-language",
    "sourceId": "be-106",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "evidenceQuote": "커넥션, 입출력 스트림과 같은 자원을 사용한 후에는 자원을 해제해서 성능 문제, 메모리 누수 등을 방지해야 합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-106-follow-up",
    "kind": "follow-up",
    "followUpOf": "quiz-be-106-main",
    "question": "be-106 원문에서 기본 개념 다음에 제시한 조건·영향 중 알맞은 것은 무엇인가요?",
    "choices": [
      "원문은 이 조건이 모든 상황에서 반대로 적용된다고 설명한다.",
      "원문은 이 결과가 아무 조건 없이 항상 발생한다고 설명한다.",
      "원문은 이 판단에 원문 밖의 정보가 반드시 필요하다고 설명한다.",
      "커넥션, 입출력 스트림과 같은 자원을 사용한 후에는 자원을 해제해서 성능 문제, 메모리 누수 등을 방지해야 합니다."
    ],
    "correctIndex": 3,
    "explanation": "원문의 근거는 커넥션, 입출력 스트림과 같은 자원을 사용한 후에는 자원을 해제해서 성능 문제, 메모리 누수 등을 방지해야 합니다.라는 판단을 뒷받침합니다.",
    "followUpOrder": 1,
    "followUpRole": "core",
    "sourceAnchor": "content-answer",
    "choiceFeedback": [
      "“원문은 이 조건이 모든 상황에서 반대로 적용된다고 설명한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “커넥션, 입출력 스트림과 같은 자원을 사용한 후에는 자원을 해제해서 성능 문제, 메모리 누수 등을 방지해야 합니다.”입니다.",
      "“원문은 이 결과가 아무 조건 없이 항상 발생한다고 설명한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “커넥션, 입출력 스트림과 같은 자원을 사용한 후에는 자원을 해제해서 성능 문제, 메모리 누수 등을 방지해야 합니다.”입니다.",
      "“원문은 이 판단에 원문 밖의 정보가 반드시 필요하다고 설명한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “커넥션, 입출력 스트림과 같은 자원을 사용한 후에는 자원을 해제해서 성능 문제, 메모리 누수 등을 방지해야 합니다.”입니다.",
      "원문의 근거는 커넥션, 입출력 스트림과 같은 자원을 사용한 후에는 자원을 해제해서 성능 문제, 메모리 누수 등을 방지해야 합니다.라는 판단을 뒷받침합니다."
    ],
    "keyPoints": [
      "본문",
      "try-with-resources에",
      "대해",
      "자바 언어, 컬렉션과 자료구조"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-106-follow-up-2",
    "kind": "follow-up",
    "followUpOf": "quiz-be-106-main",
    "followUpOrder": 2,
    "followUpRole": "core",
    "question": "try-with-resources 원문의 “본문” 구역과 일치하는 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "**try-with-resources**는 이러한 자원을 자동으로 해제하는 기능으로, java 7부터 도입되었습니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 2,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "java-language",
    "sourceId": "be-106",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "**try-with-resources**는 이러한 자원을 자동으로 해제하는 기능으로, java 7부터 도입되었습니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “**try-with-resources**는 이러한 자원을 자동으로 해제하는 기능으로, java 7부터 도입되었습니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “**try-with-resources**는 이러한 자원을 자동으로 해제하는 기능으로, java 7부터 도입되었습니다.”입니다.",
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “**try-with-resources**는 이러한 자원을 자동으로 해제하는 기능으로, java 7부터 도입되었습니다.”입니다."
    ],
    "keyPoints": [
      "본문",
      "try-with-resources에",
      "대해",
      "자바 언어, 컬렉션과 자료구조"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-106-follow-up-3",
    "kind": "follow-up",
    "followUpOf": "quiz-be-106-main",
    "followUpOrder": 3,
    "followUpRole": "remediation",
    "question": "try-with-resources의 핵심 근거를 다시 확인할 때 옳은 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.",
      "**try-catch-finally**는 finally 블록에서 `close()`를 명시적으로 호출해야 합니다."
    ],
    "correctIndex": 3,
    "explanation": "원문의 “try-catch-finally 대신 try-with-resources를 사용해야 하는 이유는 무엇인가요?” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "java-language",
    "sourceId": "be-106",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "try-catch-finally 대신 try-with-resources를 사용해야 하는 이유는 무엇인가요?",
    "sourceAnchor": "try-catch-finally-대신-try-with-resources를-사용해야-하는-이유는-무엇인가요",
    "evidenceQuote": "**try-catch-finally**는 finally 블록에서 `close()`를 명시적으로 호출해야 합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “**try-catch-finally**는 finally 블록에서 `close()`를 명시적으로 호출해야 합니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “**try-catch-finally**는 finally 블록에서 `close()`를 명시적으로 호출해야 합니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “**try-catch-finally**는 finally 블록에서 `close()`를 명시적으로 호출해야 합니다.”입니다.",
      "원문의 “try-catch-finally 대신 try-with-resources를 사용해야 하는 이유는 무엇인가요?” 구역이 정답 선택지의 내용을 직접 설명합니다."
    ],
    "keyPoints": [
      "try-with-resources에",
      "대해",
      "자바 언어, 컬렉션과 자료구조"
    ]
  },
  {
    "version": 2,
    "categoryId": "java-language",
    "sourceId": "be-108",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "evidenceQuote": "String 객체는 **불변(Immutable)** 입니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-108-main",
    "kind": "main",
    "followUpOf": null,
    "question": "String 객체는 가변인가요, 불변인가요?",
    "choices": [
      "가변이다",
      "불변이다",
      "항상 null이다",
      "스레드마다만 가변이다"
    ],
    "correctIndex": 1,
    "explanation": "원문은 불변이다라고 설명합니다.",
    "followUpOrder": null,
    "followUpRole": null,
    "sourceAnchor": "content-answer",
    "choiceFeedback": [
      "“가변이다”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “불변이다”입니다.",
      "원문은 불변이다라고 설명합니다.",
      "“항상 null이다”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “불변이다”입니다.",
      "“스레드마다만 가변이다”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “불변이다”입니다."
    ],
    "keyPoints": [
      "본문",
      "String",
      "객체는",
      "가변일까요"
    ]
  },
  {
    "version": 2,
    "categoryId": "java-language",
    "sourceId": "be-108",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "String을 불변으로 설계한 이유는 무엇일까요?",
    "evidenceQuote": "String을 불변으로 설계한 덕분에 많은 이점을 얻을 수 있습니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-108-follow-up",
    "kind": "follow-up",
    "followUpOf": "quiz-be-108-main",
    "question": "be-108 원문에서 기본 개념 다음에 제시한 조건·영향 중 알맞은 것은 무엇인가요?",
    "choices": [
      "원문은 이 조건이 모든 상황에서 반대로 적용된다고 설명한다.",
      "String을 불변으로 설계한 덕분에 많은 이점을 얻을 수 있습니다.",
      "원문은 이 결과가 아무 조건 없이 항상 발생한다고 설명한다.",
      "원문은 이 판단에 원문 밖의 정보가 반드시 필요하다고 설명한다."
    ],
    "correctIndex": 1,
    "explanation": "원문의 근거는 String을 불변으로 설계한 덕분에 많은 이점을 얻을 수 있습니다.라는 판단을 뒷받침합니다.",
    "followUpOrder": 1,
    "followUpRole": "core",
    "sourceAnchor": "string을-불변으로-설계한-이유는-무엇일까요",
    "choiceFeedback": [
      "“원문은 이 조건이 모든 상황에서 반대로 적용된다고 설명한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “String을 불변으로 설계한 덕분에 많은 이점을 얻을 수 있습니다.”입니다.",
      "원문의 근거는 String을 불변으로 설계한 덕분에 많은 이점을 얻을 수 있습니다.라는 판단을 뒷받침합니다.",
      "“원문은 이 결과가 아무 조건 없이 항상 발생한다고 설명한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “String을 불변으로 설계한 덕분에 많은 이점을 얻을 수 있습니다.”입니다.",
      "“원문은 이 판단에 원문 밖의 정보가 반드시 필요하다고 설명한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “String을 불변으로 설계한 덕분에 많은 이점을 얻을 수 있습니다.”입니다."
    ],
    "keyPoints": [
      "String을 불변으로 설계한 이유는 무엇일까요?",
      "String",
      "객체는",
      "가변일까요"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-108-follow-up-2",
    "kind": "follow-up",
    "followUpOf": "quiz-be-108-main",
    "followUpOrder": 2,
    "followUpRole": "core",
    "question": "String 객체는 가변일까요, 불변일까요? 그렇게 생각하신 이유도 함께 원문의 “본문” 구역과 일치하는 설명은 무엇인가요?",
    "choices": [
      "String 클래스는 내부적으로 final 키워드가 선언된 byte[] 필드를 사용해서 문자열을 저장하기 때문입니다.",
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 0,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "java-language",
    "sourceId": "be-108",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "String 클래스는 내부적으로 final 키워드가 선언된 byte[] 필드를 사용해서 문자열을 저장하기 때문입니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “String 클래스는 내부적으로 final 키워드가 선언된 byte[] 필드를 사용해서 문자열을 저장하기 때문입니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “String 클래스는 내부적으로 final 키워드가 선언된 byte[] 필드를 사용해서 문자열을 저장하기 때문입니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “String 클래스는 내부적으로 final 키워드가 선언된 byte[] 필드를 사용해서 문자열을 저장하기 때문입니다.”입니다."
    ],
    "keyPoints": [
      "본문",
      "String",
      "객체는",
      "가변일까요"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-108-follow-up-3",
    "kind": "follow-up",
    "followUpOf": "quiz-be-108-main",
    "followUpOrder": 3,
    "followUpRole": "remediation",
    "question": "String 객체는 가변일까요, 불변일까요? 그렇게 생각하신 이유도 함께의 핵심 근거를 다시 확인할 때 옳은 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "또한, String은 참조 타입(Reference Type)이기 때문에 `concat()`, `replace()`, `toUpperCase()`와 같은 String 메서드를 호출하면 새로운 String 객체를 참조하고 기존 객체를 수정하지 않습니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 1,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "java-language",
    "sourceId": "be-108",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "또한, String은 참조 타입(Reference Type)이기 때문에 `concat()`, `replace()`, `toUpperCase()`와 같은 String 메서드를 호출하면 새로운 String 객체를 참조하고 기존 객체를 수정하지 않습니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “또한, String은 참조 타입(Reference Type)이기 때문에 `concat()`, `replace()`, `toUpperCase()`와 같은 String 메서드를 호출하면 새로운 String 객체를 참조하고 기존 객체를 수정하지 않습니다.”입니다.",
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “또한, String은 참조 타입(Reference Type)이기 때문에 `concat()`, `replace()`, `toUpperCase()`와 같은 String 메서드를 호출하면 새로운 String 객체를 참조하고 기존 객체를 수정하지 않습니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “또한, String은 참조 타입(Reference Type)이기 때문에 `concat()`, `replace()`, `toUpperCase()`와 같은 String 메서드를 호출하면 새로운 String 객체를 참조하고 기존 객체를 수정하지 않습니다.”입니다."
    ],
    "keyPoints": [
      "본문",
      "String",
      "객체는",
      "가변일까요"
    ]
  },
  {
    "version": 2,
    "categoryId": "java-language",
    "sourceId": "be-111",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "evidenceQuote": "`String.valueOf(value)`는 value가 String 타입이 아닌 경우 `value.toString()`을 호출하여 String으로 변환하며, value가 null인 경우 \"null\" 문자열을 반환합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-111-main",
    "kind": "main",
    "followUpOf": null,
    "question": "String.valueOf(value)에 null을 전달하면 무엇을 반환하나요?",
    "choices": [
      "null 참조",
      "ClassCastException",
      "빈 문자열만",
      "문자열 \"null\""
    ],
    "correctIndex": 3,
    "explanation": "원문은 문자열 \"null\"라고 설명합니다.",
    "followUpOrder": null,
    "followUpRole": null,
    "sourceAnchor": "content-answer",
    "choiceFeedback": [
      "“null 참조”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “문자열 \"null\"”입니다.",
      "“ClassCastException”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “문자열 \"null\"”입니다.",
      "“빈 문자열만”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “문자열 \"null\"”입니다.",
      "원문은 문자열 \"null\"라고 설명합니다."
    ],
    "keyPoints": [
      "본문",
      "자바에서",
      "Object",
      "타입인"
    ]
  },
  {
    "version": 2,
    "categoryId": "java-language",
    "sourceId": "be-111",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "evidenceQuote": "두 방식 모두 String 타입으로 변환하는 것은 동일하지만, 동작 방식과 예외 처리에서 차이가 있습니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-111-follow-up",
    "kind": "follow-up",
    "followUpOf": "quiz-be-111-main",
    "question": "be-111 원문에서 기본 개념 다음에 제시한 조건·영향 중 알맞은 것은 무엇인가요?",
    "choices": [
      "원문은 이 조건이 모든 상황에서 반대로 적용된다고 설명한다.",
      "원문은 이 결과가 아무 조건 없이 항상 발생한다고 설명한다.",
      "원문은 이 판단에 원문 밖의 정보가 반드시 필요하다고 설명한다.",
      "두 방식 모두 String 타입으로 변환하는 것은 동일하지만, 동작 방식과 예외 처리에서 차이가 있습니다."
    ],
    "correctIndex": 3,
    "explanation": "원문의 근거는 두 방식 모두 String 타입으로 변환하는 것은 동일하지만, 동작 방식과 예외 처리에서 차이가 있습니다.라는 판단을 뒷받침합니다.",
    "followUpOrder": 1,
    "followUpRole": "core",
    "sourceAnchor": "content-answer",
    "choiceFeedback": [
      "“원문은 이 조건이 모든 상황에서 반대로 적용된다고 설명한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “두 방식 모두 String 타입으로 변환하는 것은 동일하지만, 동작 방식과 예외 처리에서 차이가 있습니다.”입니다.",
      "“원문은 이 결과가 아무 조건 없이 항상 발생한다고 설명한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “두 방식 모두 String 타입으로 변환하는 것은 동일하지만, 동작 방식과 예외 처리에서 차이가 있습니다.”입니다.",
      "“원문은 이 판단에 원문 밖의 정보가 반드시 필요하다고 설명한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “두 방식 모두 String 타입으로 변환하는 것은 동일하지만, 동작 방식과 예외 처리에서 차이가 있습니다.”입니다.",
      "원문의 근거는 두 방식 모두 String 타입으로 변환하는 것은 동일하지만, 동작 방식과 예외 처리에서 차이가 있습니다.라는 판단을 뒷받침합니다."
    ],
    "keyPoints": [
      "본문",
      "자바에서",
      "Object",
      "타입인"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-111-follow-up-2",
    "kind": "follow-up",
    "followUpOf": "quiz-be-111-main",
    "followUpOrder": 2,
    "followUpRole": "core",
    "question": "자바에서 Object 타입인 value를 String으로 타입 캐스팅하는 것과 String.valueOf()를 사용하는 것의 차이점은 무엇인가요 원문의 “본문” 구역과 일치하는 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "`(String) value`로 타입 캐스팅 하는 것은 value가 String 타입이 아닌 경우 ClassCastException이 발생하며, value가 null인 경우 그대로 null을 반환하여 이후 메서드를 호출할 때 NullPointerException이 발생합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 2,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "java-language",
    "sourceId": "be-111",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "`(String) value`로 타입 캐스팅 하는 것은 value가 String 타입이 아닌 경우 ClassCastException이 발생하며, value가 null인 경우 그대로 null을 반환하여 이후 메서드를 호출할 때 NullPointerException이 발생합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “`(String) value`로 타입 캐스팅 하는 것은 value가 String 타입이 아닌 경우 ClassCastException이 발생하며, value가 null인 경우 그대로 null을 반환하여 이후 메서드를 호출할 때 NullPointerException이 발생합니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “`(String) value`로 타입 캐스팅 하는 것은 value가 String 타입이 아닌 경우 ClassCastException이 발생하며, value가 null인 경우 그대로 null을 반환하여 이후 메서드를 호출할 때 NullPointerException이 발생합니다.”입니다.",
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “`(String) value`로 타입 캐스팅 하는 것은 value가 String 타입이 아닌 경우 ClassCastException이 발생하며, value가 null인 경우 그대로 null을 반환하여 이후 메서드를 호출할 때 NullPointerException이 발생합니다.”입니다."
    ],
    "keyPoints": [
      "본문",
      "자바에서",
      "Object",
      "타입인"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-111-follow-up-3",
    "kind": "follow-up",
    "followUpOf": "quiz-be-111-main",
    "followUpOrder": 3,
    "followUpRole": "remediation",
    "question": "자바에서 Object 타입인 value를 String으로 타입 캐스팅하는 것과 String.valueOf()를 사용하는 것의 차이점은 무엇인가요의 핵심 근거를 다시 확인할 때 옳은 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.",
      "타입 캐스팅은 타입 안정성이 부족하기 때문에 캐스팅하는 타입이 확실할 때만 사용해야 합니다."
    ],
    "correctIndex": 3,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "java-language",
    "sourceId": "be-111",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "타입 캐스팅은 타입 안정성이 부족하기 때문에 캐스팅하는 타입이 확실할 때만 사용해야 합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “타입 캐스팅은 타입 안정성이 부족하기 때문에 캐스팅하는 타입이 확실할 때만 사용해야 합니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “타입 캐스팅은 타입 안정성이 부족하기 때문에 캐스팅하는 타입이 확실할 때만 사용해야 합니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “타입 캐스팅은 타입 안정성이 부족하기 때문에 캐스팅하는 타입이 확실할 때만 사용해야 합니다.”입니다.",
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다."
    ],
    "keyPoints": [
      "본문",
      "자바에서",
      "Object",
      "타입인"
    ]
  },
  {
    "version": 2,
    "categoryId": "java-language",
    "sourceId": "be-112",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "evidenceQuote": "자료구조 **트라이(Trie)** 는 문자열을 저장하고 효율적으로 탐색하기 위한 트리 형태의 자료 구조입니다. 트라이는 문자열을 탐색할 때 단순히 비교하는 것에 비해서 효율적으로 찾을 수 있지만, 각 정점이 자식에 대한 링크를 모두 가지고 있기 때문에 저장 공간을 더욱 많이 사용한다는 특징이 있습니다. 주로, 검색어 자동완성이나 사전 찾기 기능을 구현할 때 트라이 자료구조를 고려할 수 있습니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-112-main",
    "kind": "main",
    "followUpOf": null,
    "question": "트라이는 주로 어떤 기능을 구현할 때 고려할 수 있나요?",
    "choices": [
      "검색어 자동완성이나 사전 찾기",
      "트랜잭션 잠금",
      "파일 압축",
      "스레드 종료"
    ],
    "correctIndex": 0,
    "explanation": "원문은 검색어 자동완성이나 사전 찾기라고 설명합니다.",
    "followUpOrder": null,
    "followUpRole": null,
    "sourceAnchor": "content-answer",
    "choiceFeedback": [
      "원문은 검색어 자동완성이나 사전 찾기라고 설명합니다.",
      "“트랜잭션 잠금”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “검색어 자동완성이나 사전 찾기”입니다.",
      "“파일 압축”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “검색어 자동완성이나 사전 찾기”입니다.",
      "“스레드 종료”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “검색어 자동완성이나 사전 찾기”입니다."
    ],
    "keyPoints": [
      "본문",
      "자료구조",
      "트라이에",
      "대해서"
    ]
  },
  {
    "version": 2,
    "categoryId": "java-language",
    "sourceId": "be-112",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "트라이는 어떻게 구현할 수 있나요?",
    "evidenceQuote": "트라이 자료구조에서 루트는 항상 비어있으며, 각 간선은 추가될 문자를 키로 가지고 있습니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-112-follow-up",
    "kind": "follow-up",
    "followUpOf": "quiz-be-112-main",
    "question": "be-112 원문에서 기본 개념 다음에 제시한 조건·영향 중 알맞은 것은 무엇인가요?",
    "choices": [
      "트라이 자료구조에서 루트는 항상 비어있으며, 각 간선은 추가될 문자를 키로 가지고 있습니다.",
      "원문은 이 조건이 모든 상황에서 반대로 적용된다고 설명한다.",
      "원문은 이 결과가 아무 조건 없이 항상 발생한다고 설명한다.",
      "원문은 이 판단에 원문 밖의 정보가 반드시 필요하다고 설명한다."
    ],
    "correctIndex": 0,
    "explanation": "원문의 근거는 트라이 자료구조에서 루트는 항상 비어있으며, 각 간선은 추가될 문자를 키로 가지고 있습니다.라는 판단을 뒷받침합니다.",
    "followUpOrder": 1,
    "followUpRole": "core",
    "sourceAnchor": "트라이는-어떻게-구현할-수-있나요",
    "choiceFeedback": [
      "원문의 근거는 트라이 자료구조에서 루트는 항상 비어있으며, 각 간선은 추가될 문자를 키로 가지고 있습니다.라는 판단을 뒷받침합니다.",
      "“원문은 이 조건이 모든 상황에서 반대로 적용된다고 설명한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “트라이 자료구조에서 루트는 항상 비어있으며, 각 간선은 추가될 문자를 키로 가지고 있습니다.”입니다.",
      "“원문은 이 결과가 아무 조건 없이 항상 발생한다고 설명한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “트라이 자료구조에서 루트는 항상 비어있으며, 각 간선은 추가될 문자를 키로 가지고 있습니다.”입니다.",
      "“원문은 이 판단에 원문 밖의 정보가 반드시 필요하다고 설명한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “트라이 자료구조에서 루트는 항상 비어있으며, 각 간선은 추가될 문자를 키로 가지고 있습니다.”입니다."
    ],
    "keyPoints": [
      "트라이는 어떻게 구현할 수 있나요?",
      "자료구조",
      "트라이에",
      "대해서"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-112-follow-up-2",
    "kind": "follow-up",
    "followUpOf": "quiz-be-112-main",
    "followUpOrder": 2,
    "followUpRole": "core",
    "question": "자료구조 트라이 원문의 “트라이는 어떻게 구현할 수 있나요?” 구역과 일치하는 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.",
      "또한, 각 정점은 이전 정점의 값과 간선의 키를 더한 결과를 값으로 가집니다."
    ],
    "correctIndex": 3,
    "explanation": "원문의 “트라이는 어떻게 구현할 수 있나요?” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "java-language",
    "sourceId": "be-112",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "트라이는 어떻게 구현할 수 있나요?",
    "sourceAnchor": "트라이는-어떻게-구현할-수-있나요",
    "evidenceQuote": "또한, 각 정점은 이전 정점의 값과 간선의 키를 더한 결과를 값으로 가집니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “또한, 각 정점은 이전 정점의 값과 간선의 키를 더한 결과를 값으로 가집니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “또한, 각 정점은 이전 정점의 값과 간선의 키를 더한 결과를 값으로 가집니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “또한, 각 정점은 이전 정점의 값과 간선의 키를 더한 결과를 값으로 가집니다.”입니다.",
      "원문의 “트라이는 어떻게 구현할 수 있나요?” 구역이 정답 선택지의 내용을 직접 설명합니다."
    ],
    "keyPoints": [
      "트라이는 어떻게 구현할 수 있나요?",
      "자료구조",
      "트라이에",
      "대해서"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-112-follow-up-3",
    "kind": "follow-up",
    "followUpOf": "quiz-be-112-main",
    "followUpOrder": 3,
    "followUpRole": "remediation",
    "question": "자료구조 트라이의 핵심 근거를 다시 확인할 때 옳은 설명은 무엇인가요?",
    "choices": [
      "트라이를 구현할 때는 이러한 구조를 염두에 두면서 해시 테이블과 연결 리스트를 이용하여 구현할 수 있습니다.",
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 0,
    "explanation": "원문의 “트라이는 어떻게 구현할 수 있나요?” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "java-language",
    "sourceId": "be-112",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "트라이는 어떻게 구현할 수 있나요?",
    "sourceAnchor": "트라이는-어떻게-구현할-수-있나요",
    "evidenceQuote": "트라이를 구현할 때는 이러한 구조를 염두에 두면서 해시 테이블과 연결 리스트를 이용하여 구현할 수 있습니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "원문의 “트라이는 어떻게 구현할 수 있나요?” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “트라이를 구현할 때는 이러한 구조를 염두에 두면서 해시 테이블과 연결 리스트를 이용하여 구현할 수 있습니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “트라이를 구현할 때는 이러한 구조를 염두에 두면서 해시 테이블과 연결 리스트를 이용하여 구현할 수 있습니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “트라이를 구현할 때는 이러한 구조를 염두에 두면서 해시 테이블과 연결 리스트를 이용하여 구현할 수 있습니다.”입니다."
    ],
    "keyPoints": [
      "트라이는 어떻게 구현할 수 있나요?",
      "자료구조",
      "트라이에",
      "대해서"
    ]
  },
  {
    "version": 2,
    "categoryId": "java-language",
    "sourceId": "be-113",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "evidenceQuote": "자바에서 **제네릭(Generic)** 은 기본적으로 **무공변(Invariant)** 입니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-113-main",
    "kind": "main",
    "followUpOf": null,
    "question": "자바 제네릭은 기본적으로 어떤 성질인가요?",
    "choices": [
      "공변이다",
      "무공변이다",
      "반공변이다",
      "항상 공변과 반공변을 동시에 가진다"
    ],
    "correctIndex": 1,
    "explanation": "원문은 무공변이다라고 설명합니다.",
    "followUpOrder": null,
    "followUpRole": null,
    "sourceAnchor": "content-answer",
    "choiceFeedback": [
      "“공변이다”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “무공변이다”입니다.",
      "원문은 무공변이다라고 설명합니다.",
      "“반공변이다”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “무공변이다”입니다.",
      "“항상 공변과 반공변을 동시에 가진다”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “무공변이다”입니다."
    ],
    "keyPoints": [
      "본문",
      "자바에서",
      "제네릭의",
      "공변"
    ]
  },
  {
    "version": 2,
    "categoryId": "java-language",
    "sourceId": "be-113",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "evidenceQuote": "S와 T가 서로 상속 관계이면 공변성이 있지만 제네릭은 상속 관계가 호환되지 않습니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-113-follow-up",
    "kind": "follow-up",
    "followUpOf": "quiz-be-113-main",
    "question": "be-113 원문에서 기본 개념 다음에 제시한 조건·영향 중 알맞은 것은 무엇인가요?",
    "choices": [
      "원문은 이 조건이 모든 상황에서 반대로 적용된다고 설명한다.",
      "S와 T가 서로 상속 관계이면 공변성이 있지만 제네릭은 상속 관계가 호환되지 않습니다.",
      "원문은 이 결과가 아무 조건 없이 항상 발생한다고 설명한다.",
      "원문은 이 판단에 원문 밖의 정보가 반드시 필요하다고 설명한다."
    ],
    "correctIndex": 1,
    "explanation": "원문의 근거는 S와 T가 서로 상속 관계이면 공변성이 있지만 제네릭은 상속 관계가 호환되지 않습니다.라는 판단을 뒷받침합니다.",
    "followUpOrder": 1,
    "followUpRole": "core",
    "sourceAnchor": "content-answer",
    "choiceFeedback": [
      "“원문은 이 조건이 모든 상황에서 반대로 적용된다고 설명한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “S와 T가 서로 상속 관계이면 공변성이 있지만 제네릭은 상속 관계가 호환되지 않습니다.”입니다.",
      "원문의 근거는 S와 T가 서로 상속 관계이면 공변성이 있지만 제네릭은 상속 관계가 호환되지 않습니다.라는 판단을 뒷받침합니다.",
      "“원문은 이 결과가 아무 조건 없이 항상 발생한다고 설명한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “S와 T가 서로 상속 관계이면 공변성이 있지만 제네릭은 상속 관계가 호환되지 않습니다.”입니다.",
      "“원문은 이 판단에 원문 밖의 정보가 반드시 필요하다고 설명한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “S와 T가 서로 상속 관계이면 공변성이 있지만 제네릭은 상속 관계가 호환되지 않습니다.”입니다."
    ],
    "keyPoints": [
      "본문",
      "자바에서",
      "제네릭의",
      "공변"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-113-follow-up-2",
    "kind": "follow-up",
    "followUpOf": "quiz-be-113-main",
    "followUpOrder": 2,
    "followUpRole": "core",
    "question": "자바에서 제네릭의 공변, 반공변, 무공변 원문의 “본문” 구역과 일치하는 설명은 무엇인가요?",
    "choices": [
      "무공변이란 타입 S, T가 있을 때 서로 관계가 없다는 것을 의미합니다.",
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 0,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "java-language",
    "sourceId": "be-113",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "무공변이란 타입 S, T가 있을 때 서로 관계가 없다는 것을 의미합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “무공변이란 타입 S, T가 있을 때 서로 관계가 없다는 것을 의미합니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “무공변이란 타입 S, T가 있을 때 서로 관계가 없다는 것을 의미합니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “무공변이란 타입 S, T가 있을 때 서로 관계가 없다는 것을 의미합니다.”입니다."
    ],
    "keyPoints": [
      "본문",
      "자바에서",
      "제네릭의",
      "공변"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-113-follow-up-3",
    "kind": "follow-up",
    "followUpOf": "quiz-be-113-main",
    "followUpOrder": 3,
    "followUpRole": "remediation",
    "question": "자바에서 제네릭의 공변, 반공변, 무공변의 핵심 근거를 다시 확인할 때 옳은 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "따라서 타입이 정확히 일치하지 않으면 컴파일 에러가 발생합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 1,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "java-language",
    "sourceId": "be-113",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "따라서 타입이 정확히 일치하지 않으면 컴파일 에러가 발생합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “따라서 타입이 정확히 일치하지 않으면 컴파일 에러가 발생합니다.”입니다.",
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “따라서 타입이 정확히 일치하지 않으면 컴파일 에러가 발생합니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “따라서 타입이 정확히 일치하지 않으면 컴파일 에러가 발생합니다.”입니다."
    ],
    "keyPoints": [
      "본문",
      "자바에서",
      "제네릭의",
      "공변"
    ]
  },
  {
    "version": 2,
    "categoryId": "java-language",
    "sourceId": "be-117",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "evidenceQuote": "JCF에서 ArrayList를 기준으로 설명하겠습니다. ArrayList의 기본 용량(capacity)은 10이며, 용량이 가득 차면 기존 크기의 **1.5배(oldCapacity + (oldCapacity >> 1))** 로 증가합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-117-main",
    "kind": "main",
    "followUpOf": null,
    "question": "원문에서 ArrayList 기본 용량은 얼마라고 설명하나요?",
    "choices": [
      "0",
      "10",
      "16",
      "100"
    ],
    "correctIndex": 1,
    "explanation": "원문은 10라고 설명합니다.",
    "followUpOrder": null,
    "followUpRole": null,
    "sourceAnchor": "content-answer",
    "choiceFeedback": [
      "“0”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “10”입니다.",
      "원문은 10라고 설명합니다.",
      "“16”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “10”입니다.",
      "“100”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “10”입니다."
    ],
    "keyPoints": [
      "본문",
      "JCF",
      "자료구조의",
      "초기"
    ]
  },
  {
    "version": 2,
    "categoryId": "java-language",
    "sourceId": "be-117",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "evidenceQuote": "정리하자면, JCF에서 가변 크기의 자료 구조를 사용하는 경우, 초기 용량을 설정하면 리사이징을 줄이고 메모리와 연산 비용을 절약할 수 있습니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-117-follow-up",
    "kind": "follow-up",
    "followUpOf": "quiz-be-117-main",
    "question": "be-117 원문에서 기본 개념 다음에 제시한 조건·영향 중 알맞은 것은 무엇인가요?",
    "choices": [
      "원문은 이 조건이 모든 상황에서 반대로 적용된다고 설명한다.",
      "정리하자면, JCF에서 가변 크기의 자료 구조를 사용하는 경우, 초기 용량을 설정하면 리사이징을 줄이고 메모리와 연산 비용을 절약할 수 있습니다.",
      "원문은 이 결과가 아무 조건 없이 항상 발생한다고 설명한다.",
      "원문은 이 판단에 원문 밖의 정보가 반드시 필요하다고 설명한다."
    ],
    "correctIndex": 1,
    "explanation": "원문의 근거는 정리하자면, JCF에서 가변 크기의 자료 구조를 사용하는 경우, 초기 용량을 설정하면 리사이징을 줄이고 메모리와 연산 비용을 절약할 수 있습니다.라는 판단을 뒷받침합니다.",
    "followUpOrder": 1,
    "followUpRole": "core",
    "sourceAnchor": "content-answer",
    "choiceFeedback": [
      "“원문은 이 조건이 모든 상황에서 반대로 적용된다고 설명한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “정리하자면, JCF에서 가변 크기의 자료 구조를 사용하는 경우, 초기 용량을 설정하면 리사이징을 줄이고 메모리와 연산 비용을 절약할 수 있습니다.”입니다.",
      "원문의 근거는 정리하자면, JCF에서 가변 크기의 자료 구조를 사용하는 경우, 초기 용량을 설정하면 리사이징을 줄이고 메모리와 연산 비용을 절약할 수 있습니다.라는 판단을 뒷받침합니다.",
      "“원문은 이 결과가 아무 조건 없이 항상 발생한다고 설명한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “정리하자면, JCF에서 가변 크기의 자료 구조를 사용하는 경우, 초기 용량을 설정하면 리사이징을 줄이고 메모리와 연산 비용을 절약할 수 있습니다.”입니다.",
      "“원문은 이 판단에 원문 밖의 정보가 반드시 필요하다고 설명한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “정리하자면, JCF에서 가변 크기의 자료 구조를 사용하는 경우, 초기 용량을 설정하면 리사이징을 줄이고 메모리와 연산 비용을 절약할 수 있습니다.”입니다."
    ],
    "keyPoints": [
      "본문",
      "JCF",
      "자료구조의",
      "초기"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-117-follow-up-2",
    "kind": "follow-up",
    "followUpOf": "quiz-be-117-main",
    "followUpOrder": 2,
    "followUpRole": "core",
    "question": "JCF 자료구조의 초기 용량을 지정하면 좋은 점이 무엇인가요 원문의 “본문” 구역과 일치하는 설명은 무엇인가요?",
    "choices": [
      "예를 들어, MAX = 5,000,000일 때 기본 설정으로 리스트를 생성하면 여러 번의 리사이징이 발생해 최종 capacity가 6,153,400까지 증가하고, 약 70MB의 메모리를 사용합니다.",
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 0,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "java-language",
    "sourceId": "be-117",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "예를 들어, MAX = 5,000,000일 때 기본 설정으로 리스트를 생성하면 여러 번의 리사이징이 발생해 최종 capacity가 6,153,400까지 증가하고, 약 70MB의 메모리를 사용합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “예를 들어, MAX = 5,000,000일 때 기본 설정으로 리스트를 생성하면 여러 번의 리사이징이 발생해 최종 capacity가 6,153,400까지 증가하고, 약 70MB의 메모리를 사용합니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “예를 들어, MAX = 5,000,000일 때 기본 설정으로 리스트를 생성하면 여러 번의 리사이징이 발생해 최종 capacity가 6,153,400까지 증가하고, 약 70MB의 메모리를 사용합니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “예를 들어, MAX = 5,000,000일 때 기본 설정으로 리스트를 생성하면 여러 번의 리사이징이 발생해 최종 capacity가 6,153,400까지 증가하고, 약 70MB의 메모리를 사용합니다.”입니다."
    ],
    "keyPoints": [
      "본문",
      "JCF",
      "자료구조의",
      "초기"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-117-follow-up-3",
    "kind": "follow-up",
    "followUpOf": "quiz-be-117-main",
    "followUpOrder": 3,
    "followUpRole": "remediation",
    "question": "JCF 자료구조의 초기 용량을 지정하면 좋은 점이 무엇인가요의 핵심 근거를 다시 확인할 때 옳은 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "반면, `new ArrayList(MAX)`로 초기 용량을 설정하면 불필요한 리사이징 없이 5,000,000 크기로 고정되며, 약 20MB의 메모리만 사용하게 됩니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 1,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "java-language",
    "sourceId": "be-117",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "반면, `new ArrayList(MAX)`로 초기 용량을 설정하면 불필요한 리사이징 없이 5,000,000 크기로 고정되며, 약 20MB의 메모리만 사용하게 됩니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “반면, `new ArrayList(MAX)`로 초기 용량을 설정하면 불필요한 리사이징 없이 5,000,000 크기로 고정되며, 약 20MB의 메모리만 사용하게 됩니다.”입니다.",
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “반면, `new ArrayList(MAX)`로 초기 용량을 설정하면 불필요한 리사이징 없이 5,000,000 크기로 고정되며, 약 20MB의 메모리만 사용하게 됩니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “반면, `new ArrayList(MAX)`로 초기 용량을 설정하면 불필요한 리사이징 없이 5,000,000 크기로 고정되며, 약 20MB의 메모리만 사용하게 됩니다.”입니다."
    ],
    "keyPoints": [
      "본문",
      "JCF",
      "자료구조의",
      "초기"
    ]
  },
  {
    "version": 2,
    "categoryId": "java-language",
    "sourceId": "be-119",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "evidenceQuote": "우리가 작성한 `.java` 파일은 JDK에 포함된 **javac(java compiler)** 를 통해 컴파일됩니다. 이 과정에서 JVM이 이해할 수 있는 **바이트 코드**로 변환되어 `.class` 파일이 생성됩니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-119-main",
    "kind": "main",
    "followUpOf": null,
    "question": ".java 파일은 javac를 거쳐 무엇으로 변환되나요?",
    "choices": [
      "운영체제 커널 코드",
      "데이터베이스 레코드",
      "네트워크 패킷",
      "JVM이 이해할 수 있는 바이트 코드"
    ],
    "correctIndex": 3,
    "explanation": "원문은 JVM이 이해할 수 있는 바이트 코드라고 설명합니다.",
    "followUpOrder": null,
    "followUpRole": null,
    "sourceAnchor": "content-answer",
    "choiceFeedback": [
      "“운영체제 커널 코드”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “JVM이 이해할 수 있는 바이트 코드”입니다.",
      "“데이터베이스 레코드”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “JVM이 이해할 수 있는 바이트 코드”입니다.",
      "“네트워크 패킷”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “JVM이 이해할 수 있는 바이트 코드”입니다.",
      "원문은 JVM이 이해할 수 있는 바이트 코드라고 설명합니다."
    ],
    "keyPoints": [
      "본문",
      "자바",
      "프로그램이",
      "실행되는"
    ]
  },
  {
    "version": 2,
    "categoryId": "java-language",
    "sourceId": "be-119",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "클래스 로더가 바이트 코드를 동적으로 로드한다는 것은 무슨 의미인가요?",
    "evidenceQuote": "프로그램이 시작될 때 모든 클래스를 한꺼번에 로드하는 것이 아니라, 런타임 시점에 필요한 클래스만 로드하는 것을 의미합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-119-follow-up",
    "kind": "follow-up",
    "followUpOf": "quiz-be-119-main",
    "question": "be-119 원문에서 기본 개념 다음에 제시한 조건·영향 중 알맞은 것은 무엇인가요?",
    "choices": [
      "원문은 이 조건이 모든 상황에서 반대로 적용된다고 설명한다.",
      "원문은 이 결과가 아무 조건 없이 항상 발생한다고 설명한다.",
      "원문은 이 판단에 원문 밖의 정보가 반드시 필요하다고 설명한다.",
      "프로그램이 시작될 때 모든 클래스를 한꺼번에 로드하는 것이 아니라, 런타임 시점에 필요한 클래스만 로드하는 것을 의미합니다."
    ],
    "correctIndex": 3,
    "explanation": "원문의 근거는 프로그램이 시작될 때 모든 클래스를 한꺼번에 로드하는 것이 아니라, 런타임 시점에 필요한 클래스만 로드하는 것을 의미합니다.라는 판단을 뒷받침합니다.",
    "followUpOrder": 1,
    "followUpRole": "core",
    "sourceAnchor": "클래스-로더가-바이트-코드를-동적으로-로드한다는-것은-무슨-의미인가요",
    "choiceFeedback": [
      "“원문은 이 조건이 모든 상황에서 반대로 적용된다고 설명한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “프로그램이 시작될 때 모든 클래스를 한꺼번에 로드하는 것이 아니라, 런타임 시점에 필요한 클래스만 로드하는 것을 의미합니다.”입니다.",
      "“원문은 이 결과가 아무 조건 없이 항상 발생한다고 설명한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “프로그램이 시작될 때 모든 클래스를 한꺼번에 로드하는 것이 아니라, 런타임 시점에 필요한 클래스만 로드하는 것을 의미합니다.”입니다.",
      "“원문은 이 판단에 원문 밖의 정보가 반드시 필요하다고 설명한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “프로그램이 시작될 때 모든 클래스를 한꺼번에 로드하는 것이 아니라, 런타임 시점에 필요한 클래스만 로드하는 것을 의미합니다.”입니다.",
      "원문의 근거는 프로그램이 시작될 때 모든 클래스를 한꺼번에 로드하는 것이 아니라, 런타임 시점에 필요한 클래스만 로드하는 것을 의미합니다.라는 판단을 뒷받침합니다."
    ],
    "keyPoints": [
      "자바",
      "프로그램이",
      "실행되는",
      "흐름을"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-119-follow-up-2",
    "kind": "follow-up",
    "followUpOf": "quiz-be-119-main",
    "followUpOrder": 2,
    "followUpRole": "core",
    "question": "자바 프로그램이 실행되는 흐름을 원문의 “본문” 구역과 일치하는 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "먼저 **클래스 로더(Class Loader)** 가 바이트 코드를 JVM 메모리에 동적으로 로드합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 2,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "java-language",
    "sourceId": "be-119",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "먼저 **클래스 로더(Class Loader)** 가 바이트 코드를 JVM 메모리에 동적으로 로드합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “먼저 **클래스 로더(Class Loader)** 가 바이트 코드를 JVM 메모리에 동적으로 로드합니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “먼저 **클래스 로더(Class Loader)** 가 바이트 코드를 JVM 메모리에 동적으로 로드합니다.”입니다.",
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “먼저 **클래스 로더(Class Loader)** 가 바이트 코드를 JVM 메모리에 동적으로 로드합니다.”입니다."
    ],
    "keyPoints": [
      "본문",
      "자바",
      "프로그램이",
      "실행되는"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-119-follow-up-3",
    "kind": "follow-up",
    "followUpOf": "quiz-be-119-main",
    "followUpOrder": 3,
    "followUpRole": "remediation",
    "question": "자바 프로그램이 실행되는 흐름을의 핵심 근거를 다시 확인할 때 옳은 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.",
      "로드된 바이트 코드는 Method Area에 저장되며, 이때 로딩(Loading), 링킹(Linking), 초기화(Initialization) 단계를 거칩니다."
    ],
    "correctIndex": 3,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "java-language",
    "sourceId": "be-119",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "로드된 바이트 코드는 Method Area에 저장되며, 이때 로딩(Loading), 링킹(Linking), 초기화(Initialization) 단계를 거칩니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “로드된 바이트 코드는 Method Area에 저장되며, 이때 로딩(Loading), 링킹(Linking), 초기화(Initialization) 단계를 거칩니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “로드된 바이트 코드는 Method Area에 저장되며, 이때 로딩(Loading), 링킹(Linking), 초기화(Initialization) 단계를 거칩니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “로드된 바이트 코드는 Method Area에 저장되며, 이때 로딩(Loading), 링킹(Linking), 초기화(Initialization) 단계를 거칩니다.”입니다.",
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다."
    ],
    "keyPoints": [
      "본문",
      "자바",
      "프로그램이",
      "실행되는"
    ]
  },
  {
    "version": 2,
    "categoryId": "java-language",
    "sourceId": "be-127",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "evidenceQuote": "그 중에서 각 정점이 최대 2개의 자식 정점을 가지는 트리를 **이진 트리(Binary Tree)** 라고 합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-127-main",
    "kind": "main",
    "followUpOf": null,
    "question": "이진 트리는 각 정점이 최대 몇 개의 자식 정점을 가지나요?",
    "choices": [
      "1개",
      "3개",
      "2개",
      "제한 없음"
    ],
    "correctIndex": 2,
    "explanation": "원문은 2개라고 설명합니다.",
    "followUpOrder": null,
    "followUpRole": null,
    "sourceAnchor": "content-answer",
    "choiceFeedback": [
      "“1개”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “2개”입니다.",
      "“3개”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “2개”입니다.",
      "원문은 2개라고 설명합니다.",
      "“제한 없음”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “2개”입니다."
    ],
    "keyPoints": [
      "본문",
      "이진",
      "트리에",
      "대해서"
    ]
  },
  {
    "version": 2,
    "categoryId": "java-language",
    "sourceId": "be-127",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "이진 트리의 종류는 무엇이 있나요?",
    "evidenceQuote": "정점이 채워져 있는 형태에 따라서 대표적으로 포화 이진 트리, 완전 이진 트리, 편향 이진 트리가 존재합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-127-follow-up",
    "kind": "follow-up",
    "followUpOf": "quiz-be-127-main",
    "question": "be-127 원문에서 기본 개념 다음에 제시한 조건·영향 중 알맞은 것은 무엇인가요?",
    "choices": [
      "원문은 이 조건이 모든 상황에서 반대로 적용된다고 설명한다.",
      "원문은 이 결과가 아무 조건 없이 항상 발생한다고 설명한다.",
      "정점이 채워져 있는 형태에 따라서 대표적으로 포화 이진 트리, 완전 이진 트리, 편향 이진 트리가 존재합니다.",
      "원문은 이 판단에 원문 밖의 정보가 반드시 필요하다고 설명한다."
    ],
    "correctIndex": 2,
    "explanation": "원문의 근거는 정점이 채워져 있는 형태에 따라서 대표적으로 포화 이진 트리, 완전 이진 트리, 편향 이진 트리가 존재합니다.라는 판단을 뒷받침합니다.",
    "followUpOrder": 1,
    "followUpRole": "core",
    "sourceAnchor": "이진-트리의-종류는-무엇이-있나요",
    "choiceFeedback": [
      "“원문은 이 조건이 모든 상황에서 반대로 적용된다고 설명한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “정점이 채워져 있는 형태에 따라서 대표적으로 포화 이진 트리, 완전 이진 트리, 편향 이진 트리가 존재합니다.”입니다.",
      "“원문은 이 결과가 아무 조건 없이 항상 발생한다고 설명한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “정점이 채워져 있는 형태에 따라서 대표적으로 포화 이진 트리, 완전 이진 트리, 편향 이진 트리가 존재합니다.”입니다.",
      "원문의 근거는 정점이 채워져 있는 형태에 따라서 대표적으로 포화 이진 트리, 완전 이진 트리, 편향 이진 트리가 존재합니다.라는 판단을 뒷받침합니다.",
      "“원문은 이 판단에 원문 밖의 정보가 반드시 필요하다고 설명한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “정점이 채워져 있는 형태에 따라서 대표적으로 포화 이진 트리, 완전 이진 트리, 편향 이진 트리가 존재합니다.”입니다."
    ],
    "keyPoints": [
      "이진 트리의 종류는 무엇이 있나요?",
      "이진",
      "트리에",
      "대해서"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-127-follow-up-2",
    "kind": "follow-up",
    "followUpOf": "quiz-be-127-main",
    "followUpOrder": 2,
    "followUpRole": "core",
    "question": "이진 트리 원문의 “본문” 구역과 일치하는 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "**트리(Tree)** 는 방향이 존재하는 그래프의 일종으로 부모 정점 밑에 여러 자식 정점이 연결되고, 자식 정점 각각에 다시 자식 정점이 연결되는 재귀적 형태의 자료구조입니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 1,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "java-language",
    "sourceId": "be-127",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "**트리(Tree)** 는 방향이 존재하는 그래프의 일종으로 부모 정점 밑에 여러 자식 정점이 연결되고, 자식 정점 각각에 다시 자식 정점이 연결되는 재귀적 형태의 자료구조입니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “**트리(Tree)** 는 방향이 존재하는 그래프의 일종으로 부모 정점 밑에 여러 자식 정점이 연결되고, 자식 정점 각각에 다시 자식 정점이 연결되는 재귀적 형태의 자료구조입니다.”입니다.",
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “**트리(Tree)** 는 방향이 존재하는 그래프의 일종으로 부모 정점 밑에 여러 자식 정점이 연결되고, 자식 정점 각각에 다시 자식 정점이 연결되는 재귀적 형태의 자료구조입니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “**트리(Tree)** 는 방향이 존재하는 그래프의 일종으로 부모 정점 밑에 여러 자식 정점이 연결되고, 자식 정점 각각에 다시 자식 정점이 연결되는 재귀적 형태의 자료구조입니다.”입니다."
    ],
    "keyPoints": [
      "본문",
      "이진",
      "트리에",
      "대해서"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-127-follow-up-3",
    "kind": "follow-up",
    "followUpOf": "quiz-be-127-main",
    "followUpOrder": 3,
    "followUpRole": "remediation",
    "question": "이진 트리의 핵심 근거를 다시 확인할 때 옳은 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "마지막 레벨까지 모든 정점이 채워져 있는 경우, 포화 이진 트리라고 부릅니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 2,
    "explanation": "원문의 “이진 트리의 종류는 무엇이 있나요?” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "java-language",
    "sourceId": "be-127",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "이진 트리의 종류는 무엇이 있나요?",
    "sourceAnchor": "이진-트리의-종류는-무엇이-있나요",
    "evidenceQuote": "마지막 레벨까지 모든 정점이 채워져 있는 경우, 포화 이진 트리라고 부릅니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “마지막 레벨까지 모든 정점이 채워져 있는 경우, 포화 이진 트리라고 부릅니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “마지막 레벨까지 모든 정점이 채워져 있는 경우, 포화 이진 트리라고 부릅니다.”입니다.",
      "원문의 “이진 트리의 종류는 무엇이 있나요?” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “마지막 레벨까지 모든 정점이 채워져 있는 경우, 포화 이진 트리라고 부릅니다.”입니다."
    ],
    "keyPoints": [
      "이진 트리의 종류는 무엇이 있나요?",
      "이진",
      "트리에",
      "대해서"
    ]
  },
  {
    "version": 2,
    "categoryId": "architecture-design",
    "sourceId": "be-49",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-49-main",
    "kind": "main",
    "followUpOf": null,
    "sourceHeading": "본문",
    "question": "be-49 원문에 따르면, 다음 중 맞는 설명은 무엇인가요?",
    "choices": [
      "Record의 필드는 생성 뒤 자유롭게 변경할 수 있다.",
      "Record는 기본적으로 불변성을 가진 특별한 유형의 클래스다.",
      "Record는 자동 생성 메서드를 제공하지 않는다.",
      "Record는 Java 16에서만 인터페이스로 사용된다."
    ],
    "correctIndex": 1,
    "explanation": "원문은 Record는 기본적으로 불변성을 가진 특별한 유형의 클래스다.라고 설명합니다.",
    "evidenceQuote": "Record는 Java 16에서 정식 출시된 특별한 유형의 클래스로 **불변성(Immutable)** 을 기본으로 합니다.",
    "followUpOrder": null,
    "followUpRole": null,
    "sourceAnchor": "content-answer",
    "choiceFeedback": [
      "“Record의 필드는 생성 뒤 자유롭게 변경할 수 있다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “Record는 기본적으로 불변성을 가진 특별한 유형의 클래스다.”입니다.",
      "원문은 Record는 기본적으로 불변성을 가진 특별한 유형의 클래스다.라고 설명합니다.",
      "“Record는 자동 생성 메서드를 제공하지 않는다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “Record는 기본적으로 불변성을 가진 특별한 유형의 클래스다.”입니다.",
      "“Record는 Java 16에서만 인터페이스로 사용된다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “Record는 기본적으로 불변성을 가진 특별한 유형의 클래스다.”입니다."
    ],
    "keyPoints": [
      "본문",
      "Record를",
      "DTO로",
      "사용하는"
    ]
  },
  {
    "version": 2,
    "categoryId": "architecture-design",
    "sourceId": "be-49",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-49-follow-up",
    "kind": "follow-up",
    "followUpOf": "quiz-be-49-main",
    "sourceHeading": "그럼 Record로 생성한 모든 객체는 DTO인가요?",
    "question": "be-49의 핵심 개념을 한 단계 더 적용해 판단할 때 원문과 일치하는 설명은 무엇인가요?",
    "choices": [
      "Record로 만든 객체는 DTO로만 사용할 수 있다.",
      "모든 Record 객체가 DTO인 것은 아니며 값 객체 등으로도 쓸 수 있다.",
      "DTO는 도메인 모델의 비즈니스 규칙을 표현하는 객체다.",
      "VO는 계층 간 데이터 전송만을 목적으로 한다."
    ],
    "correctIndex": 1,
    "explanation": "원문 근거는 모든 Record 객체가 DTO인 것은 아니며 값 객체 등으로도 쓸 수 있다.입니다.",
    "evidenceQuote": "모든 Record 객체가 DTO인 것은 아닙니다. Record는 단순히 데이터를 캡슐화하는 역할을 하는데, DTO 외에도 값 객체(Value Objects) 등의 다양한 용도로 사용될 수 있습니다.",
    "followUpOrder": 1,
    "followUpRole": "core",
    "sourceAnchor": "그럼-record로-생성한-모든-객체는-dto인가요",
    "choiceFeedback": [
      "“Record로 만든 객체는 DTO로만 사용할 수 있다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “모든 Record 객체가 DTO인 것은 아니며 값 객체 등으로도 쓸 수 있다.”입니다.",
      "원문 근거는 모든 Record 객체가 DTO인 것은 아니며 값 객체 등으로도 쓸 수 있다.입니다.",
      "“DTO는 도메인 모델의 비즈니스 규칙을 표현하는 객체다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “모든 Record 객체가 DTO인 것은 아니며 값 객체 등으로도 쓸 수 있다.”입니다.",
      "“VO는 계층 간 데이터 전송만을 목적으로 한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “모든 Record 객체가 DTO인 것은 아니며 값 객체 등으로도 쓸 수 있다.”입니다."
    ],
    "keyPoints": [
      "그럼 Record로 생성한 모든 객체는 DTO인가요?",
      "Record를",
      "DTO로",
      "사용하는"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-49-follow-up-2",
    "kind": "follow-up",
    "followUpOf": "quiz-be-49-main",
    "followUpOrder": 2,
    "followUpRole": "core",
    "question": "Record를 DTO로 사용하는 이유가 뭔가요 원문의 “본문” 구역과 일치하는 설명은 무엇인가요?",
    "choices": [
      "기존의 클래스와 달리 모든 필드가 `final` 키워드로 선언되며, 객체 생성 후 변경할 수 없습니다.",
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 0,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "architecture-design",
    "sourceId": "be-49",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "기존의 클래스와 달리 모든 필드가 `final` 키워드로 선언되며, 객체 생성 후 변경할 수 없습니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “기존의 클래스와 달리 모든 필드가 `final` 키워드로 선언되며, 객체 생성 후 변경할 수 없습니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “기존의 클래스와 달리 모든 필드가 `final` 키워드로 선언되며, 객체 생성 후 변경할 수 없습니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “기존의 클래스와 달리 모든 필드가 `final` 키워드로 선언되며, 객체 생성 후 변경할 수 없습니다.”입니다."
    ],
    "keyPoints": [
      "본문",
      "Record를",
      "DTO로",
      "사용하는"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-49-follow-up-3",
    "kind": "follow-up",
    "followUpOf": "quiz-be-49-main",
    "followUpOrder": 3,
    "followUpRole": "remediation",
    "question": "Record를 DTO로 사용하는 이유가 뭔가요의 핵심 근거를 다시 확인할 때 옳은 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "또한 필드 선언만으로 자동으로 생성자, `getter`, `equals()`, `hashCode()`, `toString()` 등 메서드를 자동으로 생성해 주어 보일러 플레이트 코드를 줄일 수 있습니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 1,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "architecture-design",
    "sourceId": "be-49",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "또한 필드 선언만으로 자동으로 생성자, `getter`, `equals()`, `hashCode()`, `toString()` 등 메서드를 자동으로 생성해 주어 보일러 플레이트 코드를 줄일 수 있습니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “또한 필드 선언만으로 자동으로 생성자, `getter`, `equals()`, `hashCode()`, `toString()` 등 메서드를 자동으로 생성해 주어 보일러 플레이트 코드를 줄일 수 있습니다.”입니다.",
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “또한 필드 선언만으로 자동으로 생성자, `getter`, `equals()`, `hashCode()`, `toString()` 등 메서드를 자동으로 생성해 주어 보일러 플레이트 코드를 줄일 수 있습니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “또한 필드 선언만으로 자동으로 생성자, `getter`, `equals()`, `hashCode()`, `toString()` 등 메서드를 자동으로 생성해 주어 보일러 플레이트 코드를 줄일 수 있습니다.”입니다."
    ],
    "keyPoints": [
      "본문",
      "Record를",
      "DTO로",
      "사용하는"
    ]
  },
  {
    "version": 2,
    "categoryId": "architecture-design",
    "sourceId": "be-51",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-51-main",
    "kind": "main",
    "followUpOf": null,
    "sourceHeading": "본문",
    "question": "be-51 원문에 따르면, 다음 중 맞는 설명은 무엇인가요?",
    "choices": [
      "단일 책임 원칙은 클래스에 메서드가 하나만 있어야 한다고 본다.",
      "단일 책임 원칙은 모든 변경을 한 클래스에 모으라고 한다.",
      "단일 책임 원칙은 클래스가 한 가지 변화의 이유만 가져야 한다고 본다.",
      "단일 책임 원칙은 하위 모듈에 직접 의존하라고 한다."
    ],
    "correctIndex": 2,
    "explanation": "원문은 단일 책임 원칙은 클래스가 한 가지 변화의 이유만 가져야 한다고 본다.라고 설명합니다.",
    "evidenceQuote": "즉, 클래스는 한 가지 변화의 이유만 가져야 하며, 이를 통해 변경이 발생했을 때 다른 기능에 영향을 덜 미치도록 설계됩니다.",
    "followUpOrder": null,
    "followUpRole": null,
    "sourceAnchor": "content-answer",
    "choiceFeedback": [
      "“단일 책임 원칙은 클래스에 메서드가 하나만 있어야 한다고 본다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “단일 책임 원칙은 클래스가 한 가지 변화의 이유만 가져야 한다고 본다.”입니다.",
      "“단일 책임 원칙은 모든 변경을 한 클래스에 모으라고 한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “단일 책임 원칙은 클래스가 한 가지 변화의 이유만 가져야 한다고 본다.”입니다.",
      "원문은 단일 책임 원칙은 클래스가 한 가지 변화의 이유만 가져야 한다고 본다.라고 설명합니다.",
      "“단일 책임 원칙은 하위 모듈에 직접 의존하라고 한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “단일 책임 원칙은 클래스가 한 가지 변화의 이유만 가져야 한다고 본다.”입니다."
    ],
    "keyPoints": [
      "본문",
      "SOLID",
      "원칙에",
      "대해서"
    ]
  },
  {
    "version": 2,
    "categoryId": "architecture-design",
    "sourceId": "be-51",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-51-follow-up",
    "kind": "follow-up",
    "followUpOf": "quiz-be-51-main",
    "sourceHeading": "본문",
    "question": "be-51의 핵심 개념을 한 단계 더 적용해 판단할 때 원문과 일치하는 설명은 무엇인가요?",
    "choices": [
      "의존성 역전 원칙은 상위 모듈이 하위 모듈 구현에 의존하라고 한다.",
      "의존성 역전 원칙은 추상화 없이 구체 타입만 사용하라고 한다.",
      "의존성 역전 원칙은 상위·하위 수준 모듈 모두 추상화에 의존해야 한다고 강조한다.",
      "의존성 역전 원칙은 인터페이스를 클라이언트와 무관하게 크게 만들라고 한다."
    ],
    "correctIndex": 2,
    "explanation": "원문 근거는 의존성 역전 원칙은 상위·하위 수준 모듈 모두 추상화에 의존해야 한다고 강조한다.입니다.",
    "evidenceQuote": "**의존성 역전 원칙(Dependency Inversion Principle)** 은 상위 수준의 모듈은 하위 수준의 모듈에 의존해서는 안 되며, 모두 추상화에 의존해야 함을 강조합니다.",
    "followUpOrder": 1,
    "followUpRole": "core",
    "sourceAnchor": "content-answer",
    "choiceFeedback": [
      "“의존성 역전 원칙은 상위 모듈이 하위 모듈 구현에 의존하라고 한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “의존성 역전 원칙은 상위·하위 수준 모듈 모두 추상화에 의존해야 한다고 강조한다.”입니다.",
      "“의존성 역전 원칙은 추상화 없이 구체 타입만 사용하라고 한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “의존성 역전 원칙은 상위·하위 수준 모듈 모두 추상화에 의존해야 한다고 강조한다.”입니다.",
      "원문 근거는 의존성 역전 원칙은 상위·하위 수준 모듈 모두 추상화에 의존해야 한다고 강조한다.입니다.",
      "“의존성 역전 원칙은 인터페이스를 클라이언트와 무관하게 크게 만들라고 한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “의존성 역전 원칙은 상위·하위 수준 모듈 모두 추상화에 의존해야 한다고 강조한다.”입니다."
    ],
    "keyPoints": [
      "본문",
      "SOLID",
      "원칙에",
      "대해서"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-51-follow-up-2",
    "kind": "follow-up",
    "followUpOf": "quiz-be-51-main",
    "followUpOrder": 2,
    "followUpRole": "core",
    "question": "SOLID 원칙 원문의 “본문” 구역과 일치하는 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "SOLID 원칙은 객체지향 설계 5원칙이라고도 불리며, 각 원칙의 앞 글자를 따서 만들어졌습니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 1,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "architecture-design",
    "sourceId": "be-51",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "SOLID 원칙은 객체지향 설계 5원칙이라고도 불리며, 각 원칙의 앞 글자를 따서 만들어졌습니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “SOLID 원칙은 객체지향 설계 5원칙이라고도 불리며, 각 원칙의 앞 글자를 따서 만들어졌습니다.”입니다.",
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “SOLID 원칙은 객체지향 설계 5원칙이라고도 불리며, 각 원칙의 앞 글자를 따서 만들어졌습니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “SOLID 원칙은 객체지향 설계 5원칙이라고도 불리며, 각 원칙의 앞 글자를 따서 만들어졌습니다.”입니다."
    ],
    "keyPoints": [
      "본문",
      "SOLID",
      "원칙에",
      "대해서"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-51-follow-up-3",
    "kind": "follow-up",
    "followUpOf": "quiz-be-51-main",
    "followUpOrder": 3,
    "followUpRole": "remediation",
    "question": "SOLID 원칙의 핵심 근거를 다시 확인할 때 옳은 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "객체지향설계의 핵심 중 하나는 의존성을 관리하는 것인데요.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 2,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "architecture-design",
    "sourceId": "be-51",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "객체지향설계의 핵심 중 하나는 의존성을 관리하는 것인데요.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “객체지향설계의 핵심 중 하나는 의존성을 관리하는 것인데요.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “객체지향설계의 핵심 중 하나는 의존성을 관리하는 것인데요.”입니다.",
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “객체지향설계의 핵심 중 하나는 의존성을 관리하는 것인데요.”입니다."
    ],
    "keyPoints": [
      "본문",
      "SOLID",
      "원칙에",
      "대해서"
    ]
  },
  {
    "version": 2,
    "categoryId": "architecture-design",
    "sourceId": "be-65",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-65-main",
    "kind": "main",
    "followUpOf": null,
    "sourceHeading": "본문",
    "question": "be-65 원문에 따르면, 다음 중 맞는 설명은 무엇인가요?",
    "choices": [
      "좋은 설계는 낮은 응집도와 높은 결합도를 가진다.",
      "응집도와 결합도는 변경과 관계가 없다.",
      "결합도는 모듈 내부 요소들의 연관 정도를 뜻한다.",
      "좋은 설계는 일반적으로 높은 응집도와 낮은 결합도를 가진다."
    ],
    "correctIndex": 3,
    "explanation": "원문은 좋은 설계는 일반적으로 높은 응집도와 낮은 결합도를 가진다.라고 설명합니다.",
    "evidenceQuote": "일반적으로 좋은 설계란 높은 응집도와 낮은 결합도를 가진 모듈로 구성된 설계를 의미합니다.",
    "followUpOrder": null,
    "followUpRole": null,
    "sourceAnchor": "content-answer",
    "choiceFeedback": [
      "“좋은 설계는 낮은 응집도와 높은 결합도를 가진다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “좋은 설계는 일반적으로 높은 응집도와 낮은 결합도를 가진다.”입니다.",
      "“응집도와 결합도는 변경과 관계가 없다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “좋은 설계는 일반적으로 높은 응집도와 낮은 결합도를 가진다.”입니다.",
      "“결합도는 모듈 내부 요소들의 연관 정도를 뜻한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “좋은 설계는 일반적으로 높은 응집도와 낮은 결합도를 가진다.”입니다.",
      "원문은 좋은 설계는 일반적으로 높은 응집도와 낮은 결합도를 가진다.라고 설명합니다."
    ],
    "keyPoints": [
      "본문",
      "응집도와",
      "결합도에",
      "대해서"
    ]
  },
  {
    "version": 2,
    "categoryId": "architecture-design",
    "sourceId": "be-65",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-65-follow-up",
    "kind": "follow-up",
    "followUpOf": "quiz-be-65-main",
    "sourceHeading": "본문",
    "question": "be-65의 핵심 개념을 한 단계 더 적용해 판단할 때 원문과 일치하는 설명은 무엇인가요?",
    "choices": [
      "캡슐화는 모듈 사이 결합도를 높이는 방법이다.",
      "캡슐화는 객체 내부 세부 사항을 외부에 모두 공개하는 것이다.",
      "캡슐화를 약화하면 변경이 클라이언트에 전파되지 않는다.",
      "캡슐화를 지키면 모듈 안의 응집도는 높아지고 모듈 사이 결합도는 낮아진다."
    ],
    "correctIndex": 3,
    "explanation": "원문 근거는 캡슐화를 지키면 모듈 안의 응집도는 높아지고 모듈 사이 결합도는 낮아진다.입니다.",
    "evidenceQuote": "캡슐화를 지키면, 모듈 안의 응집도는 높아지고 모듈 사이의 결합도는 낮아집니다.",
    "followUpOrder": 1,
    "followUpRole": "core",
    "sourceAnchor": "content-answer",
    "choiceFeedback": [
      "“캡슐화는 모듈 사이 결합도를 높이는 방법이다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “캡슐화를 지키면 모듈 안의 응집도는 높아지고 모듈 사이 결합도는 낮아진다.”입니다.",
      "“캡슐화는 객체 내부 세부 사항을 외부에 모두 공개하는 것이다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “캡슐화를 지키면 모듈 안의 응집도는 높아지고 모듈 사이 결합도는 낮아진다.”입니다.",
      "“캡슐화를 약화하면 변경이 클라이언트에 전파되지 않는다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “캡슐화를 지키면 모듈 안의 응집도는 높아지고 모듈 사이 결합도는 낮아진다.”입니다.",
      "원문 근거는 캡슐화를 지키면 모듈 안의 응집도는 높아지고 모듈 사이 결합도는 낮아진다.입니다."
    ],
    "keyPoints": [
      "본문",
      "응집도와",
      "결합도에",
      "대해서"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-65-follow-up-2",
    "kind": "follow-up",
    "followUpOf": "quiz-be-65-main",
    "followUpOrder": 2,
    "followUpRole": "core",
    "question": "응집도와 결합도 원문의 “본문” 구역과 일치하는 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "**응집도(Cohesion)** 는 모듈에 포함된 내부 요소들이 연관되어 있는 정도를 나타냅니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 2,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "architecture-design",
    "sourceId": "be-65",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "**응집도(Cohesion)** 는 모듈에 포함된 내부 요소들이 연관되어 있는 정도를 나타냅니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “**응집도(Cohesion)** 는 모듈에 포함된 내부 요소들이 연관되어 있는 정도를 나타냅니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “**응집도(Cohesion)** 는 모듈에 포함된 내부 요소들이 연관되어 있는 정도를 나타냅니다.”입니다.",
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “**응집도(Cohesion)** 는 모듈에 포함된 내부 요소들이 연관되어 있는 정도를 나타냅니다.”입니다."
    ],
    "keyPoints": [
      "본문",
      "응집도와",
      "결합도에",
      "대해서"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-65-follow-up-3",
    "kind": "follow-up",
    "followUpOf": "quiz-be-65-main",
    "followUpOrder": 3,
    "followUpRole": "remediation",
    "question": "응집도와 결합도의 핵심 근거를 다시 확인할 때 옳은 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.",
      "**결합도(Coupling)** 는 의존성의 정도를 나타내며, 다른 모듈에 대해 얼마나 많은 지식을 갖고 있는지를 나타냅니다."
    ],
    "correctIndex": 3,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "architecture-design",
    "sourceId": "be-65",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "**결합도(Coupling)** 는 의존성의 정도를 나타내며, 다른 모듈에 대해 얼마나 많은 지식을 갖고 있는지를 나타냅니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “**결합도(Coupling)** 는 의존성의 정도를 나타내며, 다른 모듈에 대해 얼마나 많은 지식을 갖고 있는지를 나타냅니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “**결합도(Coupling)** 는 의존성의 정도를 나타내며, 다른 모듈에 대해 얼마나 많은 지식을 갖고 있는지를 나타냅니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “**결합도(Coupling)** 는 의존성의 정도를 나타내며, 다른 모듈에 대해 얼마나 많은 지식을 갖고 있는지를 나타냅니다.”입니다.",
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다."
    ],
    "keyPoints": [
      "본문",
      "응집도와",
      "결합도에",
      "대해서"
    ]
  },
  {
    "version": 2,
    "categoryId": "architecture-design",
    "sourceId": "be-87",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-87-main",
    "kind": "main",
    "followUpOf": null,
    "sourceHeading": "본문",
    "question": "be-87 원문에 따르면, 다음 중 맞는 설명은 무엇인가요?",
    "choices": [
      "전략 패턴은 객체의 행위를 바꾸려면 항상 원본 코드를 직접 수정한다.",
      "전략 패턴은 모든 행위를 하나의 구체 클래스에 고정한다.",
      "전략 패턴은 객체의 상태를 외부에 노출하는 패턴이다.",
      "전략 패턴은 전략 구현을 바꿔 객체의 행위를 변경하는 패턴이다."
    ],
    "correctIndex": 3,
    "explanation": "원문은 전략 패턴은 전략 구현을 바꿔 객체의 행위를 변경하는 패턴이다.라고 설명합니다.",
    "evidenceQuote": "**전략 패턴(Strategy Pattern)** 은 객체의 행위를 동적으로 변경하고 싶은 경우, 코드를 직접 수정하는 것이 아닌 추상화된 전략의 구현만을 바꿔 객체의 행위를 변경하는 디자인 패턴입니다.",
    "followUpOrder": null,
    "followUpRole": null,
    "sourceAnchor": "content-answer",
    "choiceFeedback": [
      "“전략 패턴은 객체의 행위를 바꾸려면 항상 원본 코드를 직접 수정한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “전략 패턴은 전략 구현을 바꿔 객체의 행위를 변경하는 패턴이다.”입니다.",
      "“전략 패턴은 모든 행위를 하나의 구체 클래스에 고정한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “전략 패턴은 전략 구현을 바꿔 객체의 행위를 변경하는 패턴이다.”입니다.",
      "“전략 패턴은 객체의 상태를 외부에 노출하는 패턴이다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “전략 패턴은 전략 구현을 바꿔 객체의 행위를 변경하는 패턴이다.”입니다.",
      "원문은 전략 패턴은 전략 구현을 바꿔 객체의 행위를 변경하는 패턴이다.라고 설명합니다."
    ],
    "keyPoints": [
      "본문",
      "전략",
      "패턴에",
      "대해서"
    ]
  },
  {
    "version": 2,
    "categoryId": "architecture-design",
    "sourceId": "be-87",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-87-follow-up",
    "kind": "follow-up",
    "followUpOf": "quiz-be-87-main",
    "sourceHeading": "본문",
    "question": "be-87의 핵심 개념을 한 단계 더 적용해 판단할 때 원문과 일치하는 설명은 무엇인가요?",
    "choices": [
      "전략 패턴은 인터페이스 없이 단일 구현체만 사용한다.",
      "전략 패턴은 구현체가 아닌 데이터베이스 테이블을 주입한다.",
      "전략 패턴은 외부 주입 없이 전략을 변경할 수 없게 만든다.",
      "전략 패턴의 대표 형태는 인터페이스 구현체들을 주입하는 것이다."
    ],
    "correctIndex": 3,
    "explanation": "원문 근거는 전략 패턴의 대표 형태는 인터페이스 구현체들을 주입하는 것이다.입니다.",
    "evidenceQuote": "객체의 행위를 Interface로 정의하고, Interface의 메서드를 구현하는 구현체들을 주입하는 것이 전략 패턴의 대표적인 형태입니다.",
    "followUpOrder": 1,
    "followUpRole": "core",
    "sourceAnchor": "content-answer",
    "choiceFeedback": [
      "“전략 패턴은 인터페이스 없이 단일 구현체만 사용한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “전략 패턴의 대표 형태는 인터페이스 구현체들을 주입하는 것이다.”입니다.",
      "“전략 패턴은 구현체가 아닌 데이터베이스 테이블을 주입한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “전략 패턴의 대표 형태는 인터페이스 구현체들을 주입하는 것이다.”입니다.",
      "“전략 패턴은 외부 주입 없이 전략을 변경할 수 없게 만든다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “전략 패턴의 대표 형태는 인터페이스 구현체들을 주입하는 것이다.”입니다.",
      "원문 근거는 전략 패턴의 대표 형태는 인터페이스 구현체들을 주입하는 것이다.입니다."
    ],
    "keyPoints": [
      "본문",
      "전략",
      "패턴에",
      "대해서"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-87-follow-up-2",
    "kind": "follow-up",
    "followUpOf": "quiz-be-87-main",
    "followUpOrder": 2,
    "followUpRole": "core",
    "question": "전략 패턴 원문의 “본문” 구역과 일치하는 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "주어진 숫자에 따라서 자동차의 움직임을 결정하는 요구사항이 존재하는 경우, 위 예시처럼  MoveStrategy 타입 필드를 선언하고 외부에서 이를 구현한 전략을 주입받도록 구현하면 유연하게 자동차의 움직임 전략을 교체할 수 있습니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 2,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "architecture-design",
    "sourceId": "be-87",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "주어진 숫자에 따라서 자동차의 움직임을 결정하는 요구사항이 존재하는 경우, 위 예시처럼  MoveStrategy 타입 필드를 선언하고 외부에서 이를 구현한 전략을 주입받도록 구현하면 유연하게 자동차의 움직임 전략을 교체할 수 있습니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “주어진 숫자에 따라서 자동차의 움직임을 결정하는 요구사항이 존재하는 경우, 위 예시처럼  MoveStrategy 타입 필드를 선언하고 외부에서 이를 구현한 전략을 주입받도록 구현하면 유연하게 자동차의 움직임 전략을 교체할 수 있습니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “주어진 숫자에 따라서 자동차의 움직임을 결정하는 요구사항이 존재하는 경우, 위 예시처럼  MoveStrategy 타입 필드를 선언하고 외부에서 이를 구현한 전략을 주입받도록 구현하면 유연하게 자동차의 움직임 전략을 교체할 수 있습니다.”입니다.",
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “주어진 숫자에 따라서 자동차의 움직임을 결정하는 요구사항이 존재하는 경우, 위 예시처럼  MoveStrategy 타입 필드를 선언하고 외부에서 이를 구현한 전략을 주입받도록 구현하면 유연하게 자동차의 움직임 전략을 교체할 수 있습니다.”입니다."
    ],
    "keyPoints": [
      "본문",
      "전략",
      "패턴에",
      "대해서"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-87-follow-up-3",
    "kind": "follow-up",
    "followUpOf": "quiz-be-87-main",
    "followUpOrder": 3,
    "followUpRole": "remediation",
    "question": "전략 패턴의 핵심 근거를 다시 확인할 때 옳은 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.",
      "[[디자인패턴] 전략 패턴 (Strategy Pattern)](https://victorydntmd."
    ],
    "correctIndex": 3,
    "explanation": "원문의 “추가 학습 자료를 공유합니다.” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "architecture-design",
    "sourceId": "be-87",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "추가 학습 자료를 공유합니다.",
    "sourceAnchor": "추가-학습-자료를-공유합니다",
    "evidenceQuote": "[[디자인패턴] 전략 패턴 (Strategy Pattern)](https://victorydntmd.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “[[디자인패턴] 전략 패턴 (Strategy Pattern)](https://victorydntmd.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “[[디자인패턴] 전략 패턴 (Strategy Pattern)](https://victorydntmd.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “[[디자인패턴] 전략 패턴 (Strategy Pattern)](https://victorydntmd.”입니다.",
      "원문의 “추가 학습 자료를 공유합니다.” 구역이 정답 선택지의 내용을 직접 설명합니다."
    ],
    "keyPoints": [
      "추가 학습 자료를 공유합니다.",
      "전략",
      "패턴에",
      "대해서"
    ]
  },
  {
    "version": 2,
    "categoryId": "architecture-design",
    "sourceId": "be-128",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-128-main",
    "kind": "main",
    "followUpOf": null,
    "sourceHeading": "본문",
    "question": "be-128 원문에 따르면, 다음 중 맞는 설명은 무엇인가요?",
    "choices": [
      "객체 지향 프로그래밍은 상태 없이 함수만으로 구성된다.",
      "객체 지향 프로그래밍은 객체 사이 협력을 사용하지 않는다.",
      "객체 지향 프로그래밍의 특징에는 캡슐화가 없다.",
      "객체 지향 프로그래밍은 상태와 행위를 가진 객체 중심의 패러다임이다."
    ],
    "correctIndex": 3,
    "explanation": "원문은 객체 지향 프로그래밍은 상태와 행위를 가진 객체 중심의 패러다임이다.라고 설명합니다.",
    "evidenceQuote": "**객체 지향 프로그래밍(OOP, Object-Oriented Programming)** 은 상태(필드)와 행위(메서드)를 가진 객체를 중심으로 프로그램을 설계하는 프로그래밍 패러다임입니다.",
    "followUpOrder": null,
    "followUpRole": null,
    "sourceAnchor": "content-answer",
    "choiceFeedback": [
      "“객체 지향 프로그래밍은 상태 없이 함수만으로 구성된다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “객체 지향 프로그래밍은 상태와 행위를 가진 객체 중심의 패러다임이다.”입니다.",
      "“객체 지향 프로그래밍은 객체 사이 협력을 사용하지 않는다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “객체 지향 프로그래밍은 상태와 행위를 가진 객체 중심의 패러다임이다.”입니다.",
      "“객체 지향 프로그래밍의 특징에는 캡슐화가 없다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “객체 지향 프로그래밍은 상태와 행위를 가진 객체 중심의 패러다임이다.”입니다.",
      "원문은 객체 지향 프로그래밍은 상태와 행위를 가진 객체 중심의 패러다임이다.라고 설명합니다."
    ],
    "keyPoints": [
      "본문",
      "객체",
      "지향",
      "프로그래밍이란"
    ]
  },
  {
    "version": 2,
    "categoryId": "architecture-design",
    "sourceId": "be-128",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-128-follow-up",
    "kind": "follow-up",
    "followUpOf": "quiz-be-128-main",
    "sourceHeading": "TDA 원칙을 알고 계신가요?",
    "question": "be-128의 핵심 개념을 한 단계 더 적용해 판단할 때 원문과 일치하는 설명은 무엇인가요?",
    "choices": [
      "TDA 원칙은 객체의 getter와 setter로 데이터를 꺼내 처리하라고 말한다.",
      "TDA 원칙은 객체가 아닌 외부 코드가 상태 변경을 전담하라고 말한다.",
      "TDA 원칙은 응집도를 낮추고 결합도를 높이는 원칙이다.",
      "TDA 원칙은 객체의 데이터를 직접 요청하기보다 필요한 동작을 메시지로 보내라고 말한다."
    ],
    "correctIndex": 3,
    "explanation": "원문 근거는 TDA 원칙은 객체의 데이터를 직접 요청하기보다 필요한 동작을 메시지로 보내라고 말한다.입니다.",
    "evidenceQuote": "**TDA(Tell Don't Ask)** 원칙은 객체의 데이터를 직접 요청하지 말고, 객체에게 필요한 동작을 수행하도록 메시지를 보내라는 원칙입니다.",
    "followUpOrder": 1,
    "followUpRole": "core",
    "sourceAnchor": "tda-원칙을-알고-계신가요",
    "choiceFeedback": [
      "“TDA 원칙은 객체의 getter와 setter로 데이터를 꺼내 처리하라고 말한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “TDA 원칙은 객체의 데이터를 직접 요청하기보다 필요한 동작을 메시지로 보내라고 말한다.”입니다.",
      "“TDA 원칙은 객체가 아닌 외부 코드가 상태 변경을 전담하라고 말한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “TDA 원칙은 객체의 데이터를 직접 요청하기보다 필요한 동작을 메시지로 보내라고 말한다.”입니다.",
      "“TDA 원칙은 응집도를 낮추고 결합도를 높이는 원칙이다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “TDA 원칙은 객체의 데이터를 직접 요청하기보다 필요한 동작을 메시지로 보내라고 말한다.”입니다.",
      "원문 근거는 TDA 원칙은 객체의 데이터를 직접 요청하기보다 필요한 동작을 메시지로 보내라고 말한다.입니다."
    ],
    "keyPoints": [
      "TDA 원칙을 알고 계신가요?",
      "객체",
      "지향",
      "프로그래밍이란"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-128-follow-up-2",
    "kind": "follow-up",
    "followUpOf": "quiz-be-128-main",
    "followUpOrder": 2,
    "followUpRole": "core",
    "question": "객체 지향 프로그래밍이란 무엇이고, 어떤 특징이 있나요 원문의 “본문” 구역과 일치하는 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "객체에 역할과 책임을 부여하고, 이 객체들이 서로 협력하는 방식으로 프로그램을 구성합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 2,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "architecture-design",
    "sourceId": "be-128",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "객체에 역할과 책임을 부여하고, 이 객체들이 서로 협력하는 방식으로 프로그램을 구성합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “객체에 역할과 책임을 부여하고, 이 객체들이 서로 협력하는 방식으로 프로그램을 구성합니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “객체에 역할과 책임을 부여하고, 이 객체들이 서로 협력하는 방식으로 프로그램을 구성합니다.”입니다.",
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “객체에 역할과 책임을 부여하고, 이 객체들이 서로 협력하는 방식으로 프로그램을 구성합니다.”입니다."
    ],
    "keyPoints": [
      "본문",
      "객체",
      "지향",
      "프로그래밍이란"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-128-follow-up-3",
    "kind": "follow-up",
    "followUpOf": "quiz-be-128-main",
    "followUpOrder": 3,
    "followUpRole": "remediation",
    "question": "객체 지향 프로그래밍이란 무엇이고, 어떤 특징이 있나요의 핵심 근거를 다시 확인할 때 옳은 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.",
      "객체 지향 프로그래밍의 특징으로는 캡슐화, 추상화, 다형성, 상속이 있습니다."
    ],
    "correctIndex": 3,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "architecture-design",
    "sourceId": "be-128",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "객체 지향 프로그래밍의 특징으로는 캡슐화, 추상화, 다형성, 상속이 있습니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “객체 지향 프로그래밍의 특징으로는 캡슐화, 추상화, 다형성, 상속이 있습니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “객체 지향 프로그래밍의 특징으로는 캡슐화, 추상화, 다형성, 상속이 있습니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “객체 지향 프로그래밍의 특징으로는 캡슐화, 추상화, 다형성, 상속이 있습니다.”입니다.",
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다."
    ],
    "keyPoints": [
      "본문",
      "객체",
      "지향",
      "프로그래밍이란"
    ]
  },
  {
    "version": 2,
    "categoryId": "architecture-design",
    "sourceId": "be-129",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-129-main",
    "kind": "main",
    "followUpOf": null,
    "sourceHeading": "본문",
    "question": "be-129 원문에 따르면, 다음 중 맞는 설명은 무엇인가요?",
    "choices": [
      "널 오브젝트 패턴은 널 대신 아무 일도 하지 않는 객체를 전달하는 기법이다.",
      "널 오브젝트 패턴은 널을 발견하면 항상 예외만 던지는 기법이다.",
      "널 오브젝트 패턴은 실제 객체를 널 참조로 교체하는 기법이다.",
      "널 오브젝트 패턴은 널인 경우에만 예외 없이 사용할 수 있다."
    ],
    "correctIndex": 0,
    "explanation": "원문은 널 오브젝트 패턴은 널 대신 아무 일도 하지 않는 객체를 전달하는 기법이다.라고 설명합니다.",
    "evidenceQuote": "**널 오브젝트 패턴(Null Object Pattern)** 이란 객체가 존재하지 않을 때, 널을 전달하는 것이 아닌 아무 일도 하지 않는 객체를 전달하는 기법입니다.",
    "followUpOrder": null,
    "followUpRole": null,
    "sourceAnchor": "content-answer",
    "choiceFeedback": [
      "원문은 널 오브젝트 패턴은 널 대신 아무 일도 하지 않는 객체를 전달하는 기법이다.라고 설명합니다.",
      "“널 오브젝트 패턴은 널을 발견하면 항상 예외만 던지는 기법이다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “널 오브젝트 패턴은 널 대신 아무 일도 하지 않는 객체를 전달하는 기법이다.”입니다.",
      "“널 오브젝트 패턴은 실제 객체를 널 참조로 교체하는 기법이다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “널 오브젝트 패턴은 널 대신 아무 일도 하지 않는 객체를 전달하는 기법이다.”입니다.",
      "“널 오브젝트 패턴은 널인 경우에만 예외 없이 사용할 수 있다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “널 오브젝트 패턴은 널 대신 아무 일도 하지 않는 객체를 전달하는 기법이다.”입니다."
    ],
    "keyPoints": [
      "본문",
      "오브젝트",
      "패턴이란",
      "무엇인가요?"
    ]
  },
  {
    "version": 2,
    "categoryId": "architecture-design",
    "sourceId": "be-129",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-129-follow-up",
    "kind": "follow-up",
    "followUpOf": "quiz-be-129-main",
    "sourceHeading": "본문",
    "question": "be-129의 핵심 개념을 한 단계 더 적용해 판단할 때 원문과 일치하는 설명은 무엇인가요?",
    "choices": [
      "널 오브젝트 패턴은 반복 널 체크를 간소화하지만 예외 탐지를 어렵게 할 수 있다.",
      "널 오브젝트 패턴은 예외를 언제나 더 쉽게 탐지하게 한다.",
      "널 오브젝트 패턴은 협력 재사용을 어렵게 만든다.",
      "널 오브젝트 패턴은 객체가 널일 때만 절대 사용할 수 있다."
    ],
    "correctIndex": 0,
    "explanation": "원문 근거는 널 오브젝트 패턴은 반복 널 체크를 간소화하지만 예외 탐지를 어렵게 할 수 있다.입니다.",
    "evidenceQuote": "널 오브젝트 패턴은 반복적인 널 체크 코드를 간소화하고 협력을 재사용하는데 용이하다는 장점이 있지만, 오히려 예외를 탐지하기 어려운 상황을 만들 수 있습니다.",
    "followUpOrder": 1,
    "followUpRole": "core",
    "sourceAnchor": "content-answer",
    "choiceFeedback": [
      "원문 근거는 널 오브젝트 패턴은 반복 널 체크를 간소화하지만 예외 탐지를 어렵게 할 수 있다.입니다.",
      "“널 오브젝트 패턴은 예외를 언제나 더 쉽게 탐지하게 한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “널 오브젝트 패턴은 반복 널 체크를 간소화하지만 예외 탐지를 어렵게 할 수 있다.”입니다.",
      "“널 오브젝트 패턴은 협력 재사용을 어렵게 만든다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “널 오브젝트 패턴은 반복 널 체크를 간소화하지만 예외 탐지를 어렵게 할 수 있다.”입니다.",
      "“널 오브젝트 패턴은 객체가 널일 때만 절대 사용할 수 있다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “널 오브젝트 패턴은 반복 널 체크를 간소화하지만 예외 탐지를 어렵게 할 수 있다.”입니다."
    ],
    "keyPoints": [
      "본문",
      "오브젝트",
      "패턴이란",
      "무엇인가요?"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-129-follow-up-2",
    "kind": "follow-up",
    "followUpOf": "quiz-be-129-main",
    "followUpOrder": 2,
    "followUpRole": "core",
    "question": "널 오브젝트 패턴이란 무엇인가요 원문의 “본문” 구역과 일치하는 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.",
      "예를 들어, 개발하다 보면 아래와 같이 널 체크 코드를 작성할 때가 많은데요."
    ],
    "correctIndex": 3,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "architecture-design",
    "sourceId": "be-129",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "예를 들어, 개발하다 보면 아래와 같이 널 체크 코드를 작성할 때가 많은데요.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “예를 들어, 개발하다 보면 아래와 같이 널 체크 코드를 작성할 때가 많은데요.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “예를 들어, 개발하다 보면 아래와 같이 널 체크 코드를 작성할 때가 많은데요.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “예를 들어, 개발하다 보면 아래와 같이 널 체크 코드를 작성할 때가 많은데요.”입니다.",
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다."
    ],
    "keyPoints": [
      "본문",
      "오브젝트",
      "패턴이란",
      "무엇인가요?"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-129-follow-up-3",
    "kind": "follow-up",
    "followUpOf": "quiz-be-129-main",
    "followUpOrder": 3,
    "followUpRole": "remediation",
    "question": "널 오브젝트 패턴이란 무엇인가요의 핵심 근거를 다시 확인할 때 옳은 설명은 무엇인가요?",
    "choices": [
      "이러한 유형의 코드가 여러 곳에서 계속 반복해서 등장하게 된다면 코드를 복잡하게 만들 수도 있습니다.",
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 0,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "architecture-design",
    "sourceId": "be-129",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "이러한 유형의 코드가 여러 곳에서 계속 반복해서 등장하게 된다면 코드를 복잡하게 만들 수도 있습니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “이러한 유형의 코드가 여러 곳에서 계속 반복해서 등장하게 된다면 코드를 복잡하게 만들 수도 있습니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “이러한 유형의 코드가 여러 곳에서 계속 반복해서 등장하게 된다면 코드를 복잡하게 만들 수도 있습니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “이러한 유형의 코드가 여러 곳에서 계속 반복해서 등장하게 된다면 코드를 복잡하게 만들 수도 있습니다.”입니다."
    ],
    "keyPoints": [
      "본문",
      "오브젝트",
      "패턴이란",
      "무엇인가요?"
    ]
  },
  {
    "version": 2,
    "categoryId": "architecture-design",
    "sourceId": "be-132",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-132-main",
    "kind": "main",
    "followUpOf": null,
    "sourceHeading": "본문",
    "question": "be-132 원문에 따르면, 다음 중 맞는 설명은 무엇인가요?",
    "choices": [
      "Gradle은 JVM과 무관한 데이터베이스 관리 도구다.",
      "Gradle은 빌드 자동화 대신 운영체제만 설치한다.",
      "Gradle은 JVM 언어에서 자주 쓰이는 빌드 자동화 도구다.",
      "Gradle은 Java 언어에서 사용할 수 없다."
    ],
    "correctIndex": 2,
    "explanation": "원문은 Gradle은 JVM 언어에서 자주 쓰이는 빌드 자동화 도구다.라고 설명합니다.",
    "evidenceQuote": "**Gradle**은 Java, Kotlin, Scala 등 JVM에서 실행되는 언어에서 자주 사용되는 빌드 자동화 도구입니다.",
    "followUpOrder": null,
    "followUpRole": null,
    "sourceAnchor": "content-answer",
    "choiceFeedback": [
      "“Gradle은 JVM과 무관한 데이터베이스 관리 도구다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “Gradle은 JVM 언어에서 자주 쓰이는 빌드 자동화 도구다.”입니다.",
      "“Gradle은 빌드 자동화 대신 운영체제만 설치한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “Gradle은 JVM 언어에서 자주 쓰이는 빌드 자동화 도구다.”입니다.",
      "원문은 Gradle은 JVM 언어에서 자주 쓰이는 빌드 자동화 도구다.라고 설명합니다.",
      "“Gradle은 Java 언어에서 사용할 수 없다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “Gradle은 JVM 언어에서 자주 쓰이는 빌드 자동화 도구다.”입니다."
    ],
    "keyPoints": [
      "본문",
      "Gradle에",
      "대해",
      "아키텍처, 객체지향과 설계 패턴"
    ]
  },
  {
    "version": 2,
    "categoryId": "architecture-design",
    "sourceId": "be-132",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-132-follow-up",
    "kind": "follow-up",
    "followUpOf": "quiz-be-132-main",
    "sourceHeading": "Dependency Configuration이 무엇이고 어떤 종류가 있을까요?",
    "question": "be-132의 핵심 개념을 한 단계 더 적용해 판단할 때 원문과 일치하는 설명은 무엇인가요?",
    "choices": [
      "runtimeOnly는 컴파일 시점에만 필요한 의존성 설정이다.",
      "runtimeOnly는 다른 모듈에도 항상 노출되는 의존성 설정이다.",
      "runtimeOnly는 런타임 시점에만 필요한 의존성 설정이다.",
      "runtimeOnly는 테스트 코드에서만 쓰는 의존성 설정이다."
    ],
    "correctIndex": 2,
    "explanation": "원문 근거는 runtimeOnly는 런타임 시점에만 필요한 의존성 설정이다.입니다.",
    "evidenceQuote": "**runtimeOnly**는 런타임 시점에만 필요한 의존성입니다.",
    "followUpOrder": 1,
    "followUpRole": "core",
    "sourceAnchor": "dependency-configuration이-무엇이고-어떤-종류가-있을까요",
    "choiceFeedback": [
      "“runtimeOnly는 컴파일 시점에만 필요한 의존성 설정이다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “runtimeOnly는 런타임 시점에만 필요한 의존성 설정이다.”입니다.",
      "“runtimeOnly는 다른 모듈에도 항상 노출되는 의존성 설정이다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “runtimeOnly는 런타임 시점에만 필요한 의존성 설정이다.”입니다.",
      "원문 근거는 runtimeOnly는 런타임 시점에만 필요한 의존성 설정이다.입니다.",
      "“runtimeOnly는 테스트 코드에서만 쓰는 의존성 설정이다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “runtimeOnly는 런타임 시점에만 필요한 의존성 설정이다.”입니다."
    ],
    "keyPoints": [
      "Gradle에",
      "대해",
      "아키텍처, 객체지향과 설계 패턴"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-132-follow-up-2",
    "kind": "follow-up",
    "followUpOf": "quiz-be-132-main",
    "followUpOrder": 2,
    "followUpRole": "core",
    "question": "Gradle 원문의 “본문” 구역과 일치하는 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "기존의 Ant와 Maven의 단점을 보완하여 증분 빌드, 빌드 캐시, 데몬 프로세스를 활용해 빌드 속도를 최적화하고, 멀티 프로젝트를 쉽게 관리할 수 있도록 설계되었습니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 1,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "architecture-design",
    "sourceId": "be-132",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "기존의 Ant와 Maven의 단점을 보완하여 증분 빌드, 빌드 캐시, 데몬 프로세스를 활용해 빌드 속도를 최적화하고, 멀티 프로젝트를 쉽게 관리할 수 있도록 설계되었습니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “기존의 Ant와 Maven의 단점을 보완하여 증분 빌드, 빌드 캐시, 데몬 프로세스를 활용해 빌드 속도를 최적화하고, 멀티 프로젝트를 쉽게 관리할 수 있도록 설계되었습니다.”입니다.",
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “기존의 Ant와 Maven의 단점을 보완하여 증분 빌드, 빌드 캐시, 데몬 프로세스를 활용해 빌드 속도를 최적화하고, 멀티 프로젝트를 쉽게 관리할 수 있도록 설계되었습니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “기존의 Ant와 Maven의 단점을 보완하여 증분 빌드, 빌드 캐시, 데몬 프로세스를 활용해 빌드 속도를 최적화하고, 멀티 프로젝트를 쉽게 관리할 수 있도록 설계되었습니다.”입니다."
    ],
    "keyPoints": [
      "본문",
      "Gradle에",
      "대해",
      "아키텍처, 객체지향과 설계 패턴"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-132-follow-up-3",
    "kind": "follow-up",
    "followUpOf": "quiz-be-132-main",
    "followUpOrder": 3,
    "followUpRole": "remediation",
    "question": "Gradle의 핵심 근거를 다시 확인할 때 옳은 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "또한, 다양한 플러그인과 커스텀 태스크를 사용해 확장성을 높일 수 있으며, Groovy 또는 Kotlin DSL을 사용해 유연한 빌드 스크립트를 작성할 수 있습니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 2,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "architecture-design",
    "sourceId": "be-132",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "또한, 다양한 플러그인과 커스텀 태스크를 사용해 확장성을 높일 수 있으며, Groovy 또는 Kotlin DSL을 사용해 유연한 빌드 스크립트를 작성할 수 있습니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “또한, 다양한 플러그인과 커스텀 태스크를 사용해 확장성을 높일 수 있으며, Groovy 또는 Kotlin DSL을 사용해 유연한 빌드 스크립트를 작성할 수 있습니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “또한, 다양한 플러그인과 커스텀 태스크를 사용해 확장성을 높일 수 있으며, Groovy 또는 Kotlin DSL을 사용해 유연한 빌드 스크립트를 작성할 수 있습니다.”입니다.",
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “또한, 다양한 플러그인과 커스텀 태스크를 사용해 확장성을 높일 수 있으며, Groovy 또는 Kotlin DSL을 사용해 유연한 빌드 스크립트를 작성할 수 있습니다.”입니다."
    ],
    "keyPoints": [
      "본문",
      "Gradle에",
      "대해",
      "아키텍처, 객체지향과 설계 패턴"
    ]
  },
  {
    "version": 2,
    "categoryId": "architecture-design",
    "sourceId": "be-137",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-137-main",
    "kind": "main",
    "followUpOf": null,
    "sourceHeading": "본문",
    "question": "be-137 원문에 따르면, 다음 중 맞는 설명은 무엇인가요?",
    "choices": [
      "템플릿 메서드 패턴은 기능의 뼈대와 구현을 같은 하위 클래스에만 둔다.",
      "템플릿 메서드 패턴은 상위 클래스 없이 실행 단계를 결정한다.",
      "템플릿 메서드 패턴은 데이터베이스 쿼리 최적화 패턴이다.",
      "템플릿 메서드 패턴은 기능의 뼈대와 구현을 분리하는 행위 디자인 패턴이다."
    ],
    "correctIndex": 3,
    "explanation": "원문은 템플릿 메서드 패턴은 기능의 뼈대와 구현을 분리하는 행위 디자인 패턴이다.라고 설명합니다.",
    "evidenceQuote": "**템플릿 메서드 패턴(Template Method Pattern)** 은 기능의 뼈대와 구현을 분리하는 행위 디자인 패턴입니다.",
    "followUpOrder": null,
    "followUpRole": null,
    "sourceAnchor": "content-answer",
    "choiceFeedback": [
      "“템플릿 메서드 패턴은 기능의 뼈대와 구현을 같은 하위 클래스에만 둔다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “템플릿 메서드 패턴은 기능의 뼈대와 구현을 분리하는 행위 디자인 패턴이다.”입니다.",
      "“템플릿 메서드 패턴은 상위 클래스 없이 실행 단계를 결정한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “템플릿 메서드 패턴은 기능의 뼈대와 구현을 분리하는 행위 디자인 패턴이다.”입니다.",
      "“템플릿 메서드 패턴은 데이터베이스 쿼리 최적화 패턴이다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “템플릿 메서드 패턴은 기능의 뼈대와 구현을 분리하는 행위 디자인 패턴이다.”입니다.",
      "원문은 템플릿 메서드 패턴은 기능의 뼈대와 구현을 분리하는 행위 디자인 패턴이다.라고 설명합니다."
    ],
    "keyPoints": [
      "본문",
      "템플릿",
      "메서드",
      "패턴이란"
    ]
  },
  {
    "version": 2,
    "categoryId": "architecture-design",
    "sourceId": "be-137",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-137-follow-up",
    "kind": "follow-up",
    "followUpOf": "quiz-be-137-main",
    "sourceHeading": "본문",
    "question": "be-137의 핵심 개념을 한 단계 더 적용해 판단할 때 원문과 일치하는 설명은 무엇인가요?",
    "choices": [
      "템플릿 메서드 패턴은 공통 로직을 모든 하위 클래스에 반복한다.",
      "템플릿 메서드 패턴은 상위 클래스 수정이 하위 클래스와 무관하다.",
      "템플릿 메서드 패턴은 코드 재사용성을 낮추는 것이 장점이다.",
      "템플릿 메서드 패턴은 공통 로직을 상위 클래스에 모아 중복 코드를 줄일 수 있다."
    ],
    "correctIndex": 3,
    "explanation": "원문 근거는 템플릿 메서드 패턴은 공통 로직을 상위 클래스에 모아 중복 코드를 줄일 수 있다.입니다.",
    "evidenceQuote": "템플릿 메서드 패턴은 공통 로직을 상위 클래스에 모아 중복 코드를 줄일 수 있으며, 코드의 재사용성을 높일 수 있다는 장점이 있습니다.",
    "followUpOrder": 1,
    "followUpRole": "core",
    "sourceAnchor": "content-answer",
    "choiceFeedback": [
      "“템플릿 메서드 패턴은 공통 로직을 모든 하위 클래스에 반복한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “템플릿 메서드 패턴은 공통 로직을 상위 클래스에 모아 중복 코드를 줄일 수 있다.”입니다.",
      "“템플릿 메서드 패턴은 상위 클래스 수정이 하위 클래스와 무관하다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “템플릿 메서드 패턴은 공통 로직을 상위 클래스에 모아 중복 코드를 줄일 수 있다.”입니다.",
      "“템플릿 메서드 패턴은 코드 재사용성을 낮추는 것이 장점이다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “템플릿 메서드 패턴은 공통 로직을 상위 클래스에 모아 중복 코드를 줄일 수 있다.”입니다.",
      "원문 근거는 템플릿 메서드 패턴은 공통 로직을 상위 클래스에 모아 중복 코드를 줄일 수 있다.입니다."
    ],
    "keyPoints": [
      "본문",
      "템플릿",
      "메서드",
      "패턴이란"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-137-follow-up-2",
    "kind": "follow-up",
    "followUpOf": "quiz-be-137-main",
    "followUpOrder": 2,
    "followUpRole": "core",
    "question": "템플릿 메서드 패턴이란 무엇인가요 원문의 “본문” 구역과 일치하는 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "템플릿 메서드 패턴은 실행 단계의 절차를 결정하는 상위 클래스와 실행 단계를 구현하는 하위 클래스로 구성됩니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 2,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "architecture-design",
    "sourceId": "be-137",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "템플릿 메서드 패턴은 실행 단계의 절차를 결정하는 상위 클래스와 실행 단계를 구현하는 하위 클래스로 구성됩니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “템플릿 메서드 패턴은 실행 단계의 절차를 결정하는 상위 클래스와 실행 단계를 구현하는 하위 클래스로 구성됩니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “템플릿 메서드 패턴은 실행 단계의 절차를 결정하는 상위 클래스와 실행 단계를 구현하는 하위 클래스로 구성됩니다.”입니다.",
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “템플릿 메서드 패턴은 실행 단계의 절차를 결정하는 상위 클래스와 실행 단계를 구현하는 하위 클래스로 구성됩니다.”입니다."
    ],
    "keyPoints": [
      "본문",
      "템플릿",
      "메서드",
      "패턴이란"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-137-follow-up-3",
    "kind": "follow-up",
    "followUpOf": "quiz-be-137-main",
    "followUpOrder": 3,
    "followUpRole": "remediation",
    "question": "템플릿 메서드 패턴이란 무엇인가요의 핵심 근거를 다시 확인할 때 옳은 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.",
      "하지만, 하위 클래스를 개발할 때 상위 클래스의 내용을 알기 전까지 어떠한 방식으로 동작할지 예측하기 어렵고, 상위 클래스 수정이 발생하는 경우 모든 하위 클래스를 변경해야 하는 단점이 존재합니다."
    ],
    "correctIndex": 3,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "architecture-design",
    "sourceId": "be-137",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "하지만, 하위 클래스를 개발할 때 상위 클래스의 내용을 알기 전까지 어떠한 방식으로 동작할지 예측하기 어렵고, 상위 클래스 수정이 발생하는 경우 모든 하위 클래스를 변경해야 하는 단점이 존재합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “하지만, 하위 클래스를 개발할 때 상위 클래스의 내용을 알기 전까지 어떠한 방식으로 동작할지 예측하기 어렵고, 상위 클래스 수정이 발생하는 경우 모든 하위 클래스를 변경해야 하는 단점이 존재합니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “하지만, 하위 클래스를 개발할 때 상위 클래스의 내용을 알기 전까지 어떠한 방식으로 동작할지 예측하기 어렵고, 상위 클래스 수정이 발생하는 경우 모든 하위 클래스를 변경해야 하는 단점이 존재합니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “하지만, 하위 클래스를 개발할 때 상위 클래스의 내용을 알기 전까지 어떠한 방식으로 동작할지 예측하기 어렵고, 상위 클래스 수정이 발생하는 경우 모든 하위 클래스를 변경해야 하는 단점이 존재합니다.”입니다.",
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다."
    ],
    "keyPoints": [
      "본문",
      "템플릿",
      "메서드",
      "패턴이란"
    ]
  },
  {
    "version": 2,
    "categoryId": "architecture-design",
    "sourceId": "be-150",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-150-main",
    "kind": "main",
    "followUpOf": null,
    "sourceHeading": "본문",
    "question": "be-150 원문에 따르면, 다음 중 맞는 설명은 무엇인가요?",
    "choices": [
      "싱글턴 패턴은 생성자 호출마다 새 객체를 만든다.",
      "싱글턴 패턴은 객체 생성을 전혀 허용하지 않는다.",
      "싱글턴 패턴은 생성자를 여러 번 호출해도 실제 객체 하나를 유지한다.",
      "싱글턴 패턴은 객체마다 서로 다른 인스턴스를 반환한다."
    ],
    "correctIndex": 2,
    "explanation": "원문은 싱글턴 패턴은 생성자를 여러 번 호출해도 실제 객체 하나를 유지한다.라고 설명합니다.",
    "evidenceQuote": "**싱글턴 패턴(Singleton Pattern)** 이란 생성자를 여러 차례 호출해도 실제로 생성되는 객체를 하나로 유지하는 것을 의미합니다.",
    "followUpOrder": null,
    "followUpRole": null,
    "sourceAnchor": "content-answer",
    "choiceFeedback": [
      "“싱글턴 패턴은 생성자 호출마다 새 객체를 만든다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “싱글턴 패턴은 생성자를 여러 번 호출해도 실제 객체 하나를 유지한다.”입니다.",
      "“싱글턴 패턴은 객체 생성을 전혀 허용하지 않는다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “싱글턴 패턴은 생성자를 여러 번 호출해도 실제 객체 하나를 유지한다.”입니다.",
      "원문은 싱글턴 패턴은 생성자를 여러 번 호출해도 실제 객체 하나를 유지한다.라고 설명합니다.",
      "“싱글턴 패턴은 객체마다 서로 다른 인스턴스를 반환한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “싱글턴 패턴은 생성자를 여러 번 호출해도 실제 객체 하나를 유지한다.”입니다."
    ],
    "keyPoints": [
      "본문",
      "싱글턴",
      "패턴이란",
      "무엇인가요?"
    ]
  },
  {
    "version": 2,
    "categoryId": "architecture-design",
    "sourceId": "be-150",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-150-follow-up",
    "kind": "follow-up",
    "followUpOf": "quiz-be-150-main",
    "sourceHeading": "싱글턴 패턴의 장단점은 무엇인가요?",
    "question": "be-150의 핵심 개념을 한 단계 더 적용해 판단할 때 원문과 일치하는 설명은 무엇인가요?",
    "choices": [
      "싱글턴은 전역 객체여도 항상 테스트 대역으로 쉽게 교체된다.",
      "싱글턴은 상태 초기화 없이도 테스트 간 영향을 주지 않는다.",
      "싱글턴은 전역 객체 특성 때문에 테스트하기 어려운 코드를 만들 수 있다.",
      "싱글턴은 코드 복잡도를 반드시 낮추기만 한다."
    ],
    "correctIndex": 2,
    "explanation": "원문 근거는 싱글턴은 전역 객체 특성 때문에 테스트하기 어려운 코드를 만들 수 있다.입니다.",
    "evidenceQuote": "하지만, 싱글턴은 전역 객체를 생성한다는 특성상 코드의 복잡도를 높이고, 테스트하기 어려운 코드를 만들 수 있는 단점이 있습니다.",
    "followUpOrder": 1,
    "followUpRole": "core",
    "sourceAnchor": "싱글턴-패턴의-장단점은-무엇인가요",
    "choiceFeedback": [
      "“싱글턴은 전역 객체여도 항상 테스트 대역으로 쉽게 교체된다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “싱글턴은 전역 객체 특성 때문에 테스트하기 어려운 코드를 만들 수 있다.”입니다.",
      "“싱글턴은 상태 초기화 없이도 테스트 간 영향을 주지 않는다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “싱글턴은 전역 객체 특성 때문에 테스트하기 어려운 코드를 만들 수 있다.”입니다.",
      "원문 근거는 싱글턴은 전역 객체 특성 때문에 테스트하기 어려운 코드를 만들 수 있다.입니다.",
      "“싱글턴은 코드 복잡도를 반드시 낮추기만 한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “싱글턴은 전역 객체 특성 때문에 테스트하기 어려운 코드를 만들 수 있다.”입니다."
    ],
    "keyPoints": [
      "싱글턴 패턴의 장단점은 무엇인가요?",
      "싱글턴",
      "패턴이란",
      "무엇인가요?"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-150-follow-up-2",
    "kind": "follow-up",
    "followUpOf": "quiz-be-150-main",
    "followUpOrder": 2,
    "followUpRole": "core",
    "question": "싱글턴 패턴이란 무엇인가요 원문의 “본문” 구역과 일치하는 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "객체가 최초로 생성된 이후에 생성자나 객체 생성 메서드는 기존에 만들어진 객체를 반환합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 1,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "architecture-design",
    "sourceId": "be-150",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "객체가 최초로 생성된 이후에 생성자나 객체 생성 메서드는 기존에 만들어진 객체를 반환합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “객체가 최초로 생성된 이후에 생성자나 객체 생성 메서드는 기존에 만들어진 객체를 반환합니다.”입니다.",
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “객체가 최초로 생성된 이후에 생성자나 객체 생성 메서드는 기존에 만들어진 객체를 반환합니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “객체가 최초로 생성된 이후에 생성자나 객체 생성 메서드는 기존에 만들어진 객체를 반환합니다.”입니다."
    ],
    "keyPoints": [
      "본문",
      "싱글턴",
      "패턴이란",
      "무엇인가요?"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-150-follow-up-3",
    "kind": "follow-up",
    "followUpOf": "quiz-be-150-main",
    "followUpOrder": 3,
    "followUpRole": "remediation",
    "question": "싱글턴 패턴이란 무엇인가요의 핵심 근거를 다시 확인할 때 옳은 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "싱글턴 패턴은 하나의 객체를 여러 상황에서 재사용할 수 있기 때문에 메모리 낭비를 방지할 수 있습니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 2,
    "explanation": "원문의 “싱글턴 패턴의 장단점은 무엇인가요?” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "architecture-design",
    "sourceId": "be-150",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "싱글턴 패턴의 장단점은 무엇인가요?",
    "sourceAnchor": "싱글턴-패턴의-장단점은-무엇인가요",
    "evidenceQuote": "싱글턴 패턴은 하나의 객체를 여러 상황에서 재사용할 수 있기 때문에 메모리 낭비를 방지할 수 있습니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “싱글턴 패턴은 하나의 객체를 여러 상황에서 재사용할 수 있기 때문에 메모리 낭비를 방지할 수 있습니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “싱글턴 패턴은 하나의 객체를 여러 상황에서 재사용할 수 있기 때문에 메모리 낭비를 방지할 수 있습니다.”입니다.",
      "원문의 “싱글턴 패턴의 장단점은 무엇인가요?” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “싱글턴 패턴은 하나의 객체를 여러 상황에서 재사용할 수 있기 때문에 메모리 낭비를 방지할 수 있습니다.”입니다."
    ],
    "keyPoints": [
      "싱글턴 패턴의 장단점은 무엇인가요?",
      "싱글턴",
      "패턴이란",
      "무엇인가요?"
    ]
  },
  {
    "version": 2,
    "categoryId": "test-security",
    "sourceId": "be-25",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-25-main",
    "kind": "main",
    "followUpOf": null,
    "sourceHeading": "본문",
    "question": "be-25 원문에 따르면, 다음 중 맞는 설명은 무엇인가요?",
    "choices": [
      "로그는 시스템 성능에 대한 통계 정보만 뜻한다.",
      "로그는 서버가 멈춘 뒤에만 기록된다.",
      "로그는 CPU 사용량만으로 구성된다.",
      "로그는 서버 상태와 동작 정보를 시간 경과에 따라 기록한 결과다."
    ],
    "correctIndex": 3,
    "explanation": "원문은 로그는 서버 상태와 동작 정보를 시간 경과에 따라 기록한 결과다.라고 설명합니다.",
    "evidenceQuote": "로그는 서버가 동작할 때 서버의 상태와 동작 정보를 시간 경과에 따라 기록된 결과입니다.",
    "followUpOrder": null,
    "followUpRole": null,
    "sourceAnchor": "content-answer",
    "choiceFeedback": [
      "“로그는 시스템 성능에 대한 통계 정보만 뜻한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “로그는 서버 상태와 동작 정보를 시간 경과에 따라 기록한 결과다.”입니다.",
      "“로그는 서버가 멈춘 뒤에만 기록된다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “로그는 서버 상태와 동작 정보를 시간 경과에 따라 기록한 결과다.”입니다.",
      "“로그는 CPU 사용량만으로 구성된다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “로그는 서버 상태와 동작 정보를 시간 경과에 따라 기록한 결과다.”입니다.",
      "원문은 로그는 서버 상태와 동작 정보를 시간 경과에 따라 기록한 결과다.라고 설명합니다."
    ],
    "keyPoints": [
      "본문",
      "로그와",
      "메트릭을",
      "테스트, 보안과 관측 가능성"
    ]
  },
  {
    "version": 2,
    "categoryId": "test-security",
    "sourceId": "be-25",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-25-follow-up",
    "kind": "follow-up",
    "followUpOf": "quiz-be-25-main",
    "sourceHeading": "System.out.println을 사용하면 로깅 프레임워크는 사용하지 않아도 되지 않나요?",
    "question": "be-25의 핵심 개념을 한 단계 더 적용해 판단할 때 원문과 일치하는 설명은 무엇인가요?",
    "choices": [
      "System.out.println은 로그 레벨을 세밀하게 설정하기 쉽다.",
      "System.out.println은 환경별 로그 필터링을 기본 제공한다.",
      "System.out.println은 로그 출력 대기 시간이 전혀 없다.",
      "System.out.println은 로그 레벨 설정과 환경별 필터링을 적용하기 까다롭다."
    ],
    "correctIndex": 3,
    "explanation": "원문 근거는 System.out.println은 로그 레벨 설정과 환경별 필터링을 적용하기 까다롭다.입니다.",
    "evidenceQuote": "하지만, System.out.println은 로그 레벨 설정과 환경 별 필터링을 적용하기 까다롭습니다.",
    "followUpOrder": 1,
    "followUpRole": "core",
    "sourceAnchor": "systemoutprintln을-사용하면-로깅-프레임워크는-사용하지-않아도-되지-않나요",
    "choiceFeedback": [
      "“System.out.println은 로그 레벨을 세밀하게 설정하기 쉽다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “System.out.println은 로그 레벨 설정과 환경별 필터링을 적용하기 까다롭다.”입니다.",
      "“System.out.println은 환경별 로그 필터링을 기본 제공한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “System.out.println은 로그 레벨 설정과 환경별 필터링을 적용하기 까다롭다.”입니다.",
      "“System.out.println은 로그 출력 대기 시간이 전혀 없다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “System.out.println은 로그 레벨 설정과 환경별 필터링을 적용하기 까다롭다.”입니다.",
      "원문 근거는 System.out.println은 로그 레벨 설정과 환경별 필터링을 적용하기 까다롭다.입니다."
    ],
    "keyPoints": [
      "로그와",
      "메트릭을",
      "테스트, 보안과 관측 가능성"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-25-follow-up-2",
    "kind": "follow-up",
    "followUpOf": "quiz-be-25-main",
    "followUpOrder": 2,
    "followUpRole": "core",
    "question": "로그와 메트릭을 원문의 “본문” 구역과 일치하는 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "로그는 시스템의 오류와 문제들을 쉽게 찾아낼 수 있도록 도와줍니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 2,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "test-security",
    "sourceId": "be-25",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "로그는 시스템의 오류와 문제들을 쉽게 찾아낼 수 있도록 도와줍니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “로그는 시스템의 오류와 문제들을 쉽게 찾아낼 수 있도록 도와줍니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “로그는 시스템의 오류와 문제들을 쉽게 찾아낼 수 있도록 도와줍니다.”입니다.",
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “로그는 시스템의 오류와 문제들을 쉽게 찾아낼 수 있도록 도와줍니다.”입니다."
    ],
    "keyPoints": [
      "본문",
      "로그와",
      "메트릭을",
      "테스트, 보안과 관측 가능성"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-25-follow-up-3",
    "kind": "follow-up",
    "followUpOf": "quiz-be-25-main",
    "followUpOrder": 3,
    "followUpRole": "remediation",
    "question": "로그와 메트릭을의 핵심 근거를 다시 확인할 때 옳은 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.",
      "반면, 메트릭은 시스템의 성능과 상태에 대한 통계적인 정보를 의미합니다."
    ],
    "correctIndex": 3,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "test-security",
    "sourceId": "be-25",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "반면, 메트릭은 시스템의 성능과 상태에 대한 통계적인 정보를 의미합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “반면, 메트릭은 시스템의 성능과 상태에 대한 통계적인 정보를 의미합니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “반면, 메트릭은 시스템의 성능과 상태에 대한 통계적인 정보를 의미합니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “반면, 메트릭은 시스템의 성능과 상태에 대한 통계적인 정보를 의미합니다.”입니다.",
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다."
    ],
    "keyPoints": [
      "본문",
      "로그와",
      "메트릭을",
      "테스트, 보안과 관측 가능성"
    ]
  },
  {
    "version": 2,
    "categoryId": "test-security",
    "sourceId": "be-34",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-34-main",
    "kind": "main",
    "followUpOf": null,
    "sourceHeading": "본문",
    "question": "be-34 원문에 따르면, 다음 중 맞는 설명은 무엇인가요?",
    "choices": [
      "단위 테스트는 실제 데이터베이스와 네트워크 통합만 검증한다.",
      "단위 테스트는 여러 모듈의 상호작용만 검증한다.",
      "단위 테스트는 항상 느리게 실행되어야 한다.",
      "단위 테스트는 개별 메서드나 함수의 기능을 검증하는 테스트다."
    ],
    "correctIndex": 3,
    "explanation": "원문은 단위 테스트는 개별 메서드나 함수의 기능을 검증하는 테스트다.라고 설명합니다.",
    "evidenceQuote": "단위 테스트는 소프트웨어의 가장 작은 단위, 즉 개별 메서드나 함수의 기능을 검증하는 테스트입니다.",
    "followUpOrder": null,
    "followUpRole": null,
    "sourceAnchor": "content-answer",
    "choiceFeedback": [
      "“단위 테스트는 실제 데이터베이스와 네트워크 통합만 검증한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “단위 테스트는 개별 메서드나 함수의 기능을 검증하는 테스트다.”입니다.",
      "“단위 테스트는 여러 모듈의 상호작용만 검증한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “단위 테스트는 개별 메서드나 함수의 기능을 검증하는 테스트다.”입니다.",
      "“단위 테스트는 항상 느리게 실행되어야 한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “단위 테스트는 개별 메서드나 함수의 기능을 검증하는 테스트다.”입니다.",
      "원문은 단위 테스트는 개별 메서드나 함수의 기능을 검증하는 테스트다.라고 설명합니다."
    ],
    "keyPoints": [
      "본문",
      "단위",
      "테스트와",
      "통합"
    ]
  },
  {
    "version": 2,
    "categoryId": "test-security",
    "sourceId": "be-34",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-34-follow-up",
    "kind": "follow-up",
    "followUpOf": "quiz-be-34-main",
    "sourceHeading": "슬라이스 테스트는 무엇인가요?",
    "question": "be-34의 핵심 개념을 한 단계 더 적용해 판단할 때 원문과 일치하는 설명은 무엇인가요?",
    "choices": [
      "슬라이스 테스트는 모든 스프링 컴포넌트를 반드시 로드한다.",
      "슬라이스 테스트는 데이터베이스 전체를 복제하는 테스트다.",
      "슬라이스 테스트는 특정 계층과 무관하게 실행한다.",
      "슬라이스 테스트는 특정 레이어에 대한 테스트다."
    ],
    "correctIndex": 3,
    "explanation": "원문 근거는 슬라이스 테스트는 특정 레이어에 대한 테스트다.입니다.",
    "evidenceQuote": "슬라이스 테스트는 특정 레이어(ex. controller, service, repository)에 대한 테스트입니다.",
    "followUpOrder": 1,
    "followUpRole": "core",
    "sourceAnchor": "슬라이스-테스트는-무엇인가요",
    "choiceFeedback": [
      "“슬라이스 테스트는 모든 스프링 컴포넌트를 반드시 로드한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “슬라이스 테스트는 특정 레이어에 대한 테스트다.”입니다.",
      "“슬라이스 테스트는 데이터베이스 전체를 복제하는 테스트다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “슬라이스 테스트는 특정 레이어에 대한 테스트다.”입니다.",
      "“슬라이스 테스트는 특정 계층과 무관하게 실행한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “슬라이스 테스트는 특정 레이어에 대한 테스트다.”입니다.",
      "원문 근거는 슬라이스 테스트는 특정 레이어에 대한 테스트다.입니다."
    ],
    "keyPoints": [
      "슬라이스 테스트는 무엇인가요?",
      "단위",
      "테스트와",
      "통합"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-34-follow-up-2",
    "kind": "follow-up",
    "followUpOf": "quiz-be-34-main",
    "followUpOrder": 2,
    "followUpRole": "core",
    "question": "단위 테스트와 통합 테스트의 차이점은 무엇인가요 원문의 “본문” 구역과 일치하는 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "특정 기능이 올바르게 동작하는지 확인하기 위함이며 독립적이고 빠르게 실행됩니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 2,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "test-security",
    "sourceId": "be-34",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "특정 기능이 올바르게 동작하는지 확인하기 위함이며 독립적이고 빠르게 실행됩니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “특정 기능이 올바르게 동작하는지 확인하기 위함이며 독립적이고 빠르게 실행됩니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “특정 기능이 올바르게 동작하는지 확인하기 위함이며 독립적이고 빠르게 실행됩니다.”입니다.",
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “특정 기능이 올바르게 동작하는지 확인하기 위함이며 독립적이고 빠르게 실행됩니다.”입니다."
    ],
    "keyPoints": [
      "본문",
      "단위",
      "테스트와",
      "통합"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-34-follow-up-3",
    "kind": "follow-up",
    "followUpOf": "quiz-be-34-main",
    "followUpOrder": 3,
    "followUpRole": "remediation",
    "question": "단위 테스트와 통합 테스트의 차이점은 무엇인가요의 핵심 근거를 다시 확인할 때 옳은 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.",
      "반면 통합 테스트는 개별 모듈들이 결합되어 전체 시스템이 올바르게 동작하는지 검증하는 테스트입니다."
    ],
    "correctIndex": 3,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "test-security",
    "sourceId": "be-34",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "반면 통합 테스트는 개별 모듈들이 결합되어 전체 시스템이 올바르게 동작하는지 검증하는 테스트입니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “반면 통합 테스트는 개별 모듈들이 결합되어 전체 시스템이 올바르게 동작하는지 검증하는 테스트입니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “반면 통합 테스트는 개별 모듈들이 결합되어 전체 시스템이 올바르게 동작하는지 검증하는 테스트입니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “반면 통합 테스트는 개별 모듈들이 결합되어 전체 시스템이 올바르게 동작하는지 검증하는 테스트입니다.”입니다.",
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다."
    ],
    "keyPoints": [
      "본문",
      "단위",
      "테스트와",
      "통합"
    ]
  },
  {
    "version": 2,
    "categoryId": "test-security",
    "sourceId": "be-76",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-76-main",
    "kind": "main",
    "followUpOf": null,
    "sourceHeading": "본문",
    "question": "be-76 원문에 따르면, 다음 중 맞는 설명은 무엇인가요?",
    "choices": [
      "TDD는 테스트 없이 구현만 먼저 완료하는 프로세스다.",
      "TDD는 매우 짧은 개발 사이클을 반복하는 소프트웨어 개발 프로세스다.",
      "TDD는 긴 개발 사이클을 한 번만 수행하는 프로세스다.",
      "TDD는 리팩터링을 하지 않는 프로세스다."
    ],
    "correctIndex": 1,
    "explanation": "원문은 TDD는 매우 짧은 개발 사이클을 반복하는 소프트웨어 개발 프로세스다.라고 설명합니다.",
    "evidenceQuote": "**테스트 주도 개발(Test Driven Development)** 은 매우 짧은 개발 사이클을 반복하는 소프트웨어 개발 프로세스입니다.",
    "followUpOrder": null,
    "followUpRole": null,
    "sourceAnchor": "content-answer",
    "choiceFeedback": [
      "“TDD는 테스트 없이 구현만 먼저 완료하는 프로세스다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “TDD는 매우 짧은 개발 사이클을 반복하는 소프트웨어 개발 프로세스다.”입니다.",
      "원문은 TDD는 매우 짧은 개발 사이클을 반복하는 소프트웨어 개발 프로세스다.라고 설명합니다.",
      "“TDD는 긴 개발 사이클을 한 번만 수행하는 프로세스다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “TDD는 매우 짧은 개발 사이클을 반복하는 소프트웨어 개발 프로세스다.”입니다.",
      "“TDD는 리팩터링을 하지 않는 프로세스다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “TDD는 매우 짧은 개발 사이클을 반복하는 소프트웨어 개발 프로세스다.”입니다."
    ],
    "keyPoints": [
      "본문",
      "테스트",
      "주도",
      "개발이"
    ]
  },
  {
    "version": 2,
    "categoryId": "test-security",
    "sourceId": "be-76",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-76-follow-up",
    "kind": "follow-up",
    "followUpOf": "quiz-be-76-main",
    "sourceHeading": "본문",
    "question": "be-76의 핵심 개념을 한 단계 더 적용해 판단할 때 원문과 일치하는 설명은 무엇인가요?",
    "choices": [
      "TDD에서는 실패하는 테스트가 없어도 먼저 많은 코드를 작성한다.",
      "TDD에서는 실패하는 테스트를 통과하기 위한 최소한의 코드를 작성한다.",
      "TDD에서는 테스트를 통과시키기 위해 항상 가장 복잡한 코드를 작성한다.",
      "TDD에서는 테스트를 점점 일반화하지 않는다."
    ],
    "correctIndex": 1,
    "explanation": "원문 근거는 TDD에서는 실패하는 테스트를 통과하기 위한 최소한의 코드를 작성한다.입니다.",
    "evidenceQuote": "실패하는 테스트를 통과하기 위해서는 최소한의 코드를 작성해야 합니다.",
    "followUpOrder": 1,
    "followUpRole": "core",
    "sourceAnchor": "content-answer",
    "choiceFeedback": [
      "“TDD에서는 실패하는 테스트가 없어도 먼저 많은 코드를 작성한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “TDD에서는 실패하는 테스트를 통과하기 위한 최소한의 코드를 작성한다.”입니다.",
      "원문 근거는 TDD에서는 실패하는 테스트를 통과하기 위한 최소한의 코드를 작성한다.입니다.",
      "“TDD에서는 테스트를 통과시키기 위해 항상 가장 복잡한 코드를 작성한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “TDD에서는 실패하는 테스트를 통과하기 위한 최소한의 코드를 작성한다.”입니다.",
      "“TDD에서는 테스트를 점점 일반화하지 않는다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “TDD에서는 실패하는 테스트를 통과하기 위한 최소한의 코드를 작성한다.”입니다."
    ],
    "keyPoints": [
      "본문",
      "테스트",
      "주도",
      "개발이"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-76-follow-up-2",
    "kind": "follow-up",
    "followUpOf": "quiz-be-76-main",
    "followUpOrder": 2,
    "followUpRole": "core",
    "question": "테스트 주도 개발이 무엇인가요 원문의 “본문” 구역과 일치하는 설명은 무엇인가요?",
    "choices": [
      "개발자는 먼저 요구사항을 검증하는 자동화된 테스트 케이스를 작성합니다.",
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 0,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "test-security",
    "sourceId": "be-76",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "개발자는 먼저 요구사항을 검증하는 자동화된 테스트 케이스를 작성합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “개발자는 먼저 요구사항을 검증하는 자동화된 테스트 케이스를 작성합니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “개발자는 먼저 요구사항을 검증하는 자동화된 테스트 케이스를 작성합니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “개발자는 먼저 요구사항을 검증하는 자동화된 테스트 케이스를 작성합니다.”입니다."
    ],
    "keyPoints": [
      "본문",
      "테스트",
      "주도",
      "개발이"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-76-follow-up-3",
    "kind": "follow-up",
    "followUpOf": "quiz-be-76-main",
    "followUpOrder": 3,
    "followUpRole": "remediation",
    "question": "테스트 주도 개발이 무엇인가요의 핵심 근거를 다시 확인할 때 옳은 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "그 이후에는 테스트 케이스를 통과하기 위한 최소한의 코드를 생성하고, 작성한 코드를 리팩토링하는 과정을 반복합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 1,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "test-security",
    "sourceId": "be-76",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "그 이후에는 테스트 케이스를 통과하기 위한 최소한의 코드를 생성하고, 작성한 코드를 리팩토링하는 과정을 반복합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “그 이후에는 테스트 케이스를 통과하기 위한 최소한의 코드를 생성하고, 작성한 코드를 리팩토링하는 과정을 반복합니다.”입니다.",
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “그 이후에는 테스트 케이스를 통과하기 위한 최소한의 코드를 생성하고, 작성한 코드를 리팩토링하는 과정을 반복합니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “그 이후에는 테스트 케이스를 통과하기 위한 최소한의 코드를 생성하고, 작성한 코드를 리팩토링하는 과정을 반복합니다.”입니다."
    ],
    "keyPoints": [
      "본문",
      "테스트",
      "주도",
      "개발이"
    ]
  },
  {
    "version": 2,
    "categoryId": "test-security",
    "sourceId": "be-77",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-77-main",
    "kind": "main",
    "followUpOf": null,
    "sourceHeading": "본문",
    "question": "be-77 원문에 따르면, 다음 중 맞는 설명은 무엇인가요?",
    "choices": [
      "암복호화 키가 다르면 대칭키 암호화다.",
      "대칭키 암호화는 공개키와 개인키를 반드시 함께 쓴다.",
      "암복호화 키가 같으면 대칭키 암호화다.",
      "대칭키 암호화는 키를 전혀 사용하지 않는다."
    ],
    "correctIndex": 2,
    "explanation": "원문은 암복호화 키가 같으면 대칭키 암호화다.라고 설명합니다.",
    "evidenceQuote": "암복호화에 사용하는 키가 동일한 경우 **대칭키 암호화(Symmetric Key Cryptography)** 라고 하며",
    "followUpOrder": null,
    "followUpRole": null,
    "sourceAnchor": "content-answer",
    "choiceFeedback": [
      "“암복호화 키가 다르면 대칭키 암호화다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “암복호화 키가 같으면 대칭키 암호화다.”입니다.",
      "“대칭키 암호화는 공개키와 개인키를 반드시 함께 쓴다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “암복호화 키가 같으면 대칭키 암호화다.”입니다.",
      "원문은 암복호화 키가 같으면 대칭키 암호화다.라고 설명합니다.",
      "“대칭키 암호화는 키를 전혀 사용하지 않는다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “암복호화 키가 같으면 대칭키 암호화다.”입니다."
    ],
    "keyPoints": [
      "본문",
      "대칭키",
      "비대칭키",
      "암호화"
    ]
  },
  {
    "version": 2,
    "categoryId": "test-security",
    "sourceId": "be-77",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-77-follow-up",
    "kind": "follow-up",
    "followUpOf": "quiz-be-77-main",
    "sourceHeading": "본문",
    "question": "be-77의 핵심 개념을 한 단계 더 적용해 판단할 때 원문과 일치하는 설명은 무엇인가요?",
    "choices": [
      "비대칭키 방식에서 송신자는 수신자의 개인키로 암호화한다.",
      "비대칭키 방식에서 수신자는 공개키로만 복호화한다.",
      "비대칭키 방식에서 일반적으로 송신자는 수신자의 공개키로 암호화하고 수신자는 개인키로 복호화한다.",
      "비대칭키 방식은 대칭키보다 항상 빠르다."
    ],
    "correctIndex": 2,
    "explanation": "원문 근거는 비대칭키 방식에서 일반적으로 송신자는 수신자의 공개키로 암호화하고 수신자는 개인키로 복호화한다.입니다.",
    "evidenceQuote": "일반적으로 이 방식에서 송신자는 수신자의 공개키를 이용해 암호화를 수행하고, 암호화된 데이터는 수신자에게 전달됩니다. 수신자에게 전달된 이후, 수신자는 개인키를 사용해 복호화를 수행합니다.",
    "followUpOrder": 1,
    "followUpRole": "core",
    "sourceAnchor": "content-answer",
    "choiceFeedback": [
      "“비대칭키 방식에서 송신자는 수신자의 개인키로 암호화한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “비대칭키 방식에서 일반적으로 송신자는 수신자의 공개키로 암호화하고 수신자는 개인키로 복호화한다.”입니다.",
      "“비대칭키 방식에서 수신자는 공개키로만 복호화한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “비대칭키 방식에서 일반적으로 송신자는 수신자의 공개키로 암호화하고 수신자는 개인키로 복호화한다.”입니다.",
      "원문 근거는 비대칭키 방식에서 일반적으로 송신자는 수신자의 공개키로 암호화하고 수신자는 개인키로 복호화한다.입니다.",
      "“비대칭키 방식은 대칭키보다 항상 빠르다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “비대칭키 방식에서 일반적으로 송신자는 수신자의 공개키로 암호화하고 수신자는 개인키로 복호화한다.”입니다."
    ],
    "keyPoints": [
      "본문",
      "대칭키",
      "비대칭키",
      "암호화"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-77-follow-up-2",
    "kind": "follow-up",
    "followUpOf": "quiz-be-77-main",
    "followUpOrder": 2,
    "followUpRole": "core",
    "question": "대칭키 및 비대칭키 암호화 방식 원문의 “본문” 구역과 일치하는 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "평문을 암호화하고 복호화하는 경우 키를 사용할 수 있는데요.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 1,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "test-security",
    "sourceId": "be-77",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "평문을 암호화하고 복호화하는 경우 키를 사용할 수 있는데요.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “평문을 암호화하고 복호화하는 경우 키를 사용할 수 있는데요.”입니다.",
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “평문을 암호화하고 복호화하는 경우 키를 사용할 수 있는데요.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “평문을 암호화하고 복호화하는 경우 키를 사용할 수 있는데요.”입니다."
    ],
    "keyPoints": [
      "본문",
      "대칭키",
      "비대칭키",
      "암호화"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-77-follow-up-3",
    "kind": "follow-up",
    "followUpOf": "quiz-be-77-main",
    "followUpOrder": 3,
    "followUpRole": "remediation",
    "question": "대칭키 및 비대칭키 암호화 방식의 핵심 근거를 다시 확인할 때 옳은 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "대칭키 암호화는 비대칭키 암호화에 비해서 속도가 빠르다고 알려져 있습니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 2,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "test-security",
    "sourceId": "be-77",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "대칭키 암호화는 비대칭키 암호화에 비해서 속도가 빠르다고 알려져 있습니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “대칭키 암호화는 비대칭키 암호화에 비해서 속도가 빠르다고 알려져 있습니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “대칭키 암호화는 비대칭키 암호화에 비해서 속도가 빠르다고 알려져 있습니다.”입니다.",
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “대칭키 암호화는 비대칭키 암호화에 비해서 속도가 빠르다고 알려져 있습니다.”입니다."
    ],
    "keyPoints": [
      "본문",
      "대칭키",
      "비대칭키",
      "암호화"
    ]
  },
  {
    "version": 2,
    "categoryId": "test-security",
    "sourceId": "be-82",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-82-main",
    "kind": "main",
    "followUpOf": null,
    "sourceHeading": "본문",
    "question": "be-82 원문에 따르면, 다음 중 맞는 설명은 무엇인가요?",
    "choices": [
      "CSRF는 사용자가 직접 의도한 요청만 보내게 하는 공격이다.",
      "CSRF는 서버의 SQL 구문만 조작하는 공격이다.",
      "CSRF는 사용자가 의도하지 않은 행위를 특정 웹사이트에 요청하게 하는 공격이다.",
      "CSRF는 쿠키와 무관하게 발생하는 공격이다."
    ],
    "correctIndex": 2,
    "explanation": "원문은 CSRF는 사용자가 의도하지 않은 행위를 특정 웹사이트에 요청하게 하는 공격이다.라고 설명합니다.",
    "evidenceQuote": "**사이트 간 요청 위조(Cross-site Request Forgery, CSRF) 공격**은 사용자가 자신의 의지와 상관없이 공격자가 의도한 행위를 특정 웹사이트에 요청하도록 하는 것을 의미합니다.",
    "followUpOrder": null,
    "followUpRole": null,
    "sourceAnchor": "content-answer",
    "choiceFeedback": [
      "“CSRF는 사용자가 직접 의도한 요청만 보내게 하는 공격이다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “CSRF는 사용자가 의도하지 않은 행위를 특정 웹사이트에 요청하게 하는 공격이다.”입니다.",
      "“CSRF는 서버의 SQL 구문만 조작하는 공격이다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “CSRF는 사용자가 의도하지 않은 행위를 특정 웹사이트에 요청하게 하는 공격이다.”입니다.",
      "원문은 CSRF는 사용자가 의도하지 않은 행위를 특정 웹사이트에 요청하게 하는 공격이다.라고 설명합니다.",
      "“CSRF는 쿠키와 무관하게 발생하는 공격이다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “CSRF는 사용자가 의도하지 않은 행위를 특정 웹사이트에 요청하게 하는 공격이다.”입니다."
    ],
    "keyPoints": [
      "본문",
      "CSRF",
      "공격에",
      "대해서"
    ]
  },
  {
    "version": 2,
    "categoryId": "test-security",
    "sourceId": "be-82",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-82-follow-up",
    "kind": "follow-up",
    "followUpOf": "quiz-be-82-main",
    "sourceHeading": "CSRF 공격은 어떻게 방어할 수 있나요?",
    "question": "be-82의 핵심 개념을 한 단계 더 적용해 판단할 때 원문과 일치하는 설명은 무엇인가요?",
    "choices": [
      "CSRF 토큰은 요청마다 세션과 비교하지 않고 항상 통과시킨다.",
      "CSRF 토큰은 Referer 헤더를 반드시 제거하는 방식이다.",
      "CSRF 토큰은 요청의 토큰과 사용자 세션 토큰의 일치 여부를 판단해 방어할 수 있다.",
      "CSRF 토큰은 쿠키를 모든 교차 출처에 강제로 전송한다."
    ],
    "correctIndex": 2,
    "explanation": "원문 근거는 CSRF 토큰은 요청의 토큰과 사용자 세션 토큰의 일치 여부를 판단해 방어할 수 있다.입니다.",
    "evidenceQuote": "실제로 요청이 전달될 때, 해당 input 태그의 CSRF 토큰과 사용자 세션 내부에 존재하는 CSRF 토큰의 일치 여부를 판단하여, CSRF 공격에 대해 방어할 수 있습니다.",
    "followUpOrder": 1,
    "followUpRole": "core",
    "sourceAnchor": "csrf-공격은-어떻게-방어할-수-있나요",
    "choiceFeedback": [
      "“CSRF 토큰은 요청마다 세션과 비교하지 않고 항상 통과시킨다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “CSRF 토큰은 요청의 토큰과 사용자 세션 토큰의 일치 여부를 판단해 방어할 수 있다.”입니다.",
      "“CSRF 토큰은 Referer 헤더를 반드시 제거하는 방식이다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “CSRF 토큰은 요청의 토큰과 사용자 세션 토큰의 일치 여부를 판단해 방어할 수 있다.”입니다.",
      "원문 근거는 CSRF 토큰은 요청의 토큰과 사용자 세션 토큰의 일치 여부를 판단해 방어할 수 있다.입니다.",
      "“CSRF 토큰은 쿠키를 모든 교차 출처에 강제로 전송한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “CSRF 토큰은 요청의 토큰과 사용자 세션 토큰의 일치 여부를 판단해 방어할 수 있다.”입니다."
    ],
    "keyPoints": [
      "CSRF 공격은 어떻게 방어할 수 있나요?",
      "CSRF",
      "공격에",
      "대해서"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-82-follow-up-2",
    "kind": "follow-up",
    "followUpOf": "quiz-be-82-main",
    "followUpOrder": 2,
    "followUpRole": "core",
    "question": "CSRF 공격 원문의 “본문” 구역과 일치하는 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "예를 들어, 특정 사용자가 매일메일 서비스에서 로그인을 수행하고 서버는 해당 사용자에 대한 세션 ID를 `Set-Cookie` 헤더에 담아서 응답합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 1,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "test-security",
    "sourceId": "be-82",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "예를 들어, 특정 사용자가 매일메일 서비스에서 로그인을 수행하고 서버는 해당 사용자에 대한 세션 ID를 `Set-Cookie` 헤더에 담아서 응답합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “예를 들어, 특정 사용자가 매일메일 서비스에서 로그인을 수행하고 서버는 해당 사용자에 대한 세션 ID를 `Set-Cookie` 헤더에 담아서 응답합니다.”입니다.",
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “예를 들어, 특정 사용자가 매일메일 서비스에서 로그인을 수행하고 서버는 해당 사용자에 대한 세션 ID를 `Set-Cookie` 헤더에 담아서 응답합니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “예를 들어, 특정 사용자가 매일메일 서비스에서 로그인을 수행하고 서버는 해당 사용자에 대한 세션 ID를 `Set-Cookie` 헤더에 담아서 응답합니다.”입니다."
    ],
    "keyPoints": [
      "본문",
      "CSRF",
      "공격에",
      "대해서"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-82-follow-up-3",
    "kind": "follow-up",
    "followUpOf": "quiz-be-82-main",
    "followUpOrder": 3,
    "followUpRole": "remediation",
    "question": "CSRF 공격의 핵심 근거를 다시 확인할 때 옳은 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "그리고, 클라이언트는 쿠키를 저장하고 요청마다 자동으로 전달합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 2,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "test-security",
    "sourceId": "be-82",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "그리고, 클라이언트는 쿠키를 저장하고 요청마다 자동으로 전달합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “그리고, 클라이언트는 쿠키를 저장하고 요청마다 자동으로 전달합니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “그리고, 클라이언트는 쿠키를 저장하고 요청마다 자동으로 전달합니다.”입니다.",
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “그리고, 클라이언트는 쿠키를 저장하고 요청마다 자동으로 전달합니다.”입니다."
    ],
    "keyPoints": [
      "본문",
      "CSRF",
      "공격에",
      "대해서"
    ]
  },
  {
    "version": 2,
    "categoryId": "test-security",
    "sourceId": "be-84",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-84-main",
    "kind": "main",
    "followUpOf": null,
    "sourceHeading": "본문",
    "question": "be-84 원문에 따르면, 다음 중 맞는 설명은 무엇인가요?",
    "choices": [
      "JWT는 토큰 자체에 정보를 포함한 클레임 기반 토큰이다.",
      "JWT는 서버 세션에만 정보를 두는 토큰이다.",
      "JWT는 헤더와 페이로드 없이 시그니처만 가진다.",
      "JWT는 인증과 인가 구현에 사용할 수 없다."
    ],
    "correctIndex": 0,
    "explanation": "원문은 JWT는 토큰 자체에 정보를 포함한 클레임 기반 토큰이다.라고 설명합니다.",
    "evidenceQuote": "JWT는 토큰 자체에 정보가 포함되어 있는 클레임 기반 토큰입니다.",
    "followUpOrder": null,
    "followUpRole": null,
    "sourceAnchor": "content-answer",
    "choiceFeedback": [
      "원문은 JWT는 토큰 자체에 정보를 포함한 클레임 기반 토큰이다.라고 설명합니다.",
      "“JWT는 서버 세션에만 정보를 두는 토큰이다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “JWT는 토큰 자체에 정보를 포함한 클레임 기반 토큰이다.”입니다.",
      "“JWT는 헤더와 페이로드 없이 시그니처만 가진다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “JWT는 토큰 자체에 정보를 포함한 클레임 기반 토큰이다.”입니다.",
      "“JWT는 인증과 인가 구현에 사용할 수 없다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “JWT는 토큰 자체에 정보를 포함한 클레임 기반 토큰이다.”입니다."
    ],
    "keyPoints": [
      "본문",
      "JWT",
      "특징과",
      "주의"
    ]
  },
  {
    "version": 2,
    "categoryId": "test-security",
    "sourceId": "be-84",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-84-follow-up",
    "kind": "follow-up",
    "followUpOf": "quiz-be-84-main",
    "sourceHeading": "본문",
    "question": "be-84의 핵심 개념을 한 단계 더 적용해 판단할 때 원문과 일치하는 설명은 무엇인가요?",
    "choices": [
      "JWT 페이로드는 Base64 디코딩이 쉬우므로 민감한 정보에 유의해야 한다.",
      "JWT 페이로드는 디코딩할 수 없으므로 민감 정보를 자유롭게 담아도 된다.",
      "JWT는 시크릿 키가 유출되어도 안전하다.",
      "JWT는 탈취와 none 알고리즘 공격을 고려할 필요가 없다."
    ],
    "correctIndex": 0,
    "explanation": "원문 근거는 JWT 페이로드는 Base64 디코딩이 쉬우므로 민감한 정보에 유의해야 한다.입니다.",
    "evidenceQuote": "JWT는 디코딩이 쉽습니다. Base64로 디코딩하면 페이로드를 확인할 수 있습니다. 따라서, 민감한 정보를 담는 것에 유의해야 합니다.",
    "followUpOrder": 1,
    "followUpRole": "core",
    "sourceAnchor": "content-answer",
    "choiceFeedback": [
      "원문 근거는 JWT 페이로드는 Base64 디코딩이 쉬우므로 민감한 정보에 유의해야 한다.입니다.",
      "“JWT 페이로드는 디코딩할 수 없으므로 민감 정보를 자유롭게 담아도 된다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “JWT 페이로드는 Base64 디코딩이 쉬우므로 민감한 정보에 유의해야 한다.”입니다.",
      "“JWT는 시크릿 키가 유출되어도 안전하다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “JWT 페이로드는 Base64 디코딩이 쉬우므로 민감한 정보에 유의해야 한다.”입니다.",
      "“JWT는 탈취와 none 알고리즘 공격을 고려할 필요가 없다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “JWT 페이로드는 Base64 디코딩이 쉬우므로 민감한 정보에 유의해야 한다.”입니다."
    ],
    "keyPoints": [
      "본문",
      "JWT",
      "특징과",
      "주의"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-84-follow-up-2",
    "kind": "follow-up",
    "followUpOf": "quiz-be-84-main",
    "followUpOrder": 2,
    "followUpRole": "core",
    "question": "JWT 특징과 주의 사항을 원문의 “본문” 구역과 일치하는 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.",
      "**JWT(Json Web Token)** 은 통신 정보를 JSON 형식을 사용하여 안전하게 전송하기 위해 사용됩니다."
    ],
    "correctIndex": 3,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "test-security",
    "sourceId": "be-84",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "**JWT(Json Web Token)** 은 통신 정보를 JSON 형식을 사용하여 안전하게 전송하기 위해 사용됩니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “**JWT(Json Web Token)** 은 통신 정보를 JSON 형식을 사용하여 안전하게 전송하기 위해 사용됩니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “**JWT(Json Web Token)** 은 통신 정보를 JSON 형식을 사용하여 안전하게 전송하기 위해 사용됩니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “**JWT(Json Web Token)** 은 통신 정보를 JSON 형식을 사용하여 안전하게 전송하기 위해 사용됩니다.”입니다.",
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다."
    ],
    "keyPoints": [
      "본문",
      "JWT",
      "특징과",
      "주의"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-84-follow-up-3",
    "kind": "follow-up",
    "followUpOf": "quiz-be-84-main",
    "followUpOrder": 3,
    "followUpRole": "remediation",
    "question": "JWT 특징과 주의 사항을의 핵심 근거를 다시 확인할 때 옳은 설명은 무엇인가요?",
    "choices": [
      "일반적인 애플리케이션에서 JWT는 주로 인증과 인가를 구현하기 위해 사용됩니다.",
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 0,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "test-security",
    "sourceId": "be-84",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "일반적인 애플리케이션에서 JWT는 주로 인증과 인가를 구현하기 위해 사용됩니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “일반적인 애플리케이션에서 JWT는 주로 인증과 인가를 구현하기 위해 사용됩니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “일반적인 애플리케이션에서 JWT는 주로 인증과 인가를 구현하기 위해 사용됩니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “일반적인 애플리케이션에서 JWT는 주로 인증과 인가를 구현하기 위해 사용됩니다.”입니다."
    ],
    "keyPoints": [
      "본문",
      "JWT",
      "특징과",
      "주의"
    ]
  },
  {
    "version": 2,
    "categoryId": "test-security",
    "sourceId": "be-90",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-90-main",
    "kind": "main",
    "followUpOf": null,
    "sourceHeading": "본문",
    "question": "be-90 원문에 따르면, 다음 중 맞는 설명은 무엇인가요?",
    "choices": [
      "코드 커버리지는 테스트 코드의 줄 수만 나타낸다.",
      "코드 커버리지는 테스트가 프로덕션 코드를 실행한 정도를 나타낸다.",
      "코드 커버리지는 데이터베이스 용량을 나타낸다.",
      "코드 커버리지는 프로덕션 코드를 실행한 정도와 무관하다."
    ],
    "correctIndex": 1,
    "explanation": "원문은 코드 커버리지는 테스트가 프로덕션 코드를 실행한 정도를 나타낸다.라고 설명합니다.",
    "evidenceQuote": "테스트 케이스들이 프로덕션 코드를 실행한 정도를 나타낸 것을 **코드 커버리지(Code Coverage)** 라고 합니다.",
    "followUpOrder": null,
    "followUpRole": null,
    "sourceAnchor": "content-answer",
    "choiceFeedback": [
      "“코드 커버리지는 테스트 코드의 줄 수만 나타낸다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “코드 커버리지는 테스트가 프로덕션 코드를 실행한 정도를 나타낸다.”입니다.",
      "원문은 코드 커버리지는 테스트가 프로덕션 코드를 실행한 정도를 나타낸다.라고 설명합니다.",
      "“코드 커버리지는 데이터베이스 용량을 나타낸다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “코드 커버리지는 테스트가 프로덕션 코드를 실행한 정도를 나타낸다.”입니다.",
      "“코드 커버리지는 프로덕션 코드를 실행한 정도와 무관하다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “코드 커버리지는 테스트가 프로덕션 코드를 실행한 정도를 나타낸다.”입니다."
    ],
    "keyPoints": [
      "본문",
      "코드",
      "커버리지에",
      "대해서"
    ]
  },
  {
    "version": 2,
    "categoryId": "test-security",
    "sourceId": "be-90",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-90-follow-up",
    "kind": "follow-up",
    "followUpOf": "quiz-be-90-main",
    "sourceHeading": "커버리지가 높다고 무조건 좋을까요?",
    "question": "be-90의 핵심 개념을 한 단계 더 적용해 판단할 때 원문과 일치하는 설명은 무엇인가요?",
    "choices": [
      "높은 커버리지는 모든 버그가 반드시 없다는 증명이다.",
      "높은 커버리지가 모든 버그를 찾아낸다는 뜻은 아니다.",
      "커버리지가 높으면 예외와 경계 조건은 테스트하지 않아도 된다.",
      "커버리지 측정은 테스트 케이스 품질과 무관하다."
    ],
    "correctIndex": 1,
    "explanation": "원문 근거는 높은 커버리지가 모든 버그를 찾아낸다는 뜻은 아니다.입니다.",
    "evidenceQuote": "또한, 커버리지가 높다고 해서 모든 버그를 찾아낼 수 있는 것은 아닙니다.",
    "followUpOrder": 1,
    "followUpRole": "core",
    "sourceAnchor": "커버리지가-높다고-무조건-좋을까요",
    "choiceFeedback": [
      "“높은 커버리지는 모든 버그가 반드시 없다는 증명이다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “높은 커버리지가 모든 버그를 찾아낸다는 뜻은 아니다.”입니다.",
      "원문 근거는 높은 커버리지가 모든 버그를 찾아낸다는 뜻은 아니다.입니다.",
      "“커버리지가 높으면 예외와 경계 조건은 테스트하지 않아도 된다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “높은 커버리지가 모든 버그를 찾아낸다는 뜻은 아니다.”입니다.",
      "“커버리지 측정은 테스트 케이스 품질과 무관하다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “높은 커버리지가 모든 버그를 찾아낸다는 뜻은 아니다.”입니다."
    ],
    "keyPoints": [
      "커버리지가 높다고 무조건 좋을까요?",
      "코드",
      "커버리지에",
      "대해서"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-90-follow-up-2",
    "kind": "follow-up",
    "followUpOf": "quiz-be-90-main",
    "followUpOrder": 2,
    "followUpRole": "core",
    "question": "코드 커버리지 원문의 “본문” 구역과 일치하는 설명은 무엇인가요?",
    "choices": [
      "코드 커버리지는 측정하는 기준에 따라서 크게 **구문 커버리지(Statement Coverage)**, **조건 커버리지(Condition Coverage)**, **결정 커버리지(Decision Coverage)** 로 나뉩니다.",
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 0,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "test-security",
    "sourceId": "be-90",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "코드 커버리지는 측정하는 기준에 따라서 크게 **구문 커버리지(Statement Coverage)**, **조건 커버리지(Condition Coverage)**, **결정 커버리지(Decision Coverage)** 로 나뉩니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “코드 커버리지는 측정하는 기준에 따라서 크게 **구문 커버리지(Statement Coverage)**, **조건 커버리지(Condition Coverage)**, **결정 커버리지(Decision Coverage)** 로 나뉩니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “코드 커버리지는 측정하는 기준에 따라서 크게 **구문 커버리지(Statement Coverage)**, **조건 커버리지(Condition Coverage)**, **결정 커버리지(Decision Coverage)** 로 나뉩니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “코드 커버리지는 측정하는 기준에 따라서 크게 **구문 커버리지(Statement Coverage)**, **조건 커버리지(Condition Coverage)**, **결정 커버리지(Decision Coverage)** 로 나뉩니다.”입니다."
    ],
    "keyPoints": [
      "본문",
      "코드",
      "커버리지에",
      "대해서"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-90-follow-up-3",
    "kind": "follow-up",
    "followUpOf": "quiz-be-90-main",
    "followUpOrder": 3,
    "followUpRole": "remediation",
    "question": "코드 커버리지의 핵심 근거를 다시 확인할 때 옳은 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "단순히 프로덕션 코드의 라인이 실행된 것을 확인합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 1,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "test-security",
    "sourceId": "be-90",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "단순히 프로덕션 코드의 라인이 실행된 것을 확인합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “단순히 프로덕션 코드의 라인이 실행된 것을 확인합니다.”입니다.",
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “단순히 프로덕션 코드의 라인이 실행된 것을 확인합니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “단순히 프로덕션 코드의 라인이 실행된 것을 확인합니다.”입니다."
    ],
    "keyPoints": [
      "본문",
      "코드",
      "커버리지에",
      "대해서"
    ]
  },
  {
    "version": 2,
    "categoryId": "test-security",
    "sourceId": "be-97",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-97-main",
    "kind": "main",
    "followUpOf": null,
    "sourceHeading": "본문",
    "question": "be-97 원문에 따르면, 다음 중 맞는 설명은 무엇인가요?",
    "choices": [
      "테스트 더블은 실제 의존성을 쓰기 어려울 때 사용할 수 있다.",
      "테스트 더블은 실제 의존성을 항상 그대로 사용한다.",
      "테스트 더블은 외부 세계 부수 효과를 반드시 늘린다.",
      "테스트 더블은 복잡한 외부 설정을 더 많이 요구한다."
    ],
    "correctIndex": 0,
    "explanation": "원문은 테스트 더블은 실제 의존성을 쓰기 어려울 때 사용할 수 있다.라고 설명합니다.",
    "evidenceQuote": "테스트 코드에서 실제 의존성을 사용하기 어려운 경우, **테스트 더블(Test Double)** 을 사용할 수 있습니다.",
    "followUpOrder": null,
    "followUpRole": null,
    "sourceAnchor": "content-answer",
    "choiceFeedback": [
      "원문은 테스트 더블은 실제 의존성을 쓰기 어려울 때 사용할 수 있다.라고 설명합니다.",
      "“테스트 더블은 실제 의존성을 항상 그대로 사용한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “테스트 더블은 실제 의존성을 쓰기 어려울 때 사용할 수 있다.”입니다.",
      "“테스트 더블은 외부 세계 부수 효과를 반드시 늘린다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “테스트 더블은 실제 의존성을 쓰기 어려울 때 사용할 수 있다.”입니다.",
      "“테스트 더블은 복잡한 외부 설정을 더 많이 요구한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “테스트 더블은 실제 의존성을 쓰기 어려울 때 사용할 수 있다.”입니다."
    ],
    "keyPoints": [
      "본문",
      "테스트",
      "더블에",
      "대해서"
    ]
  },
  {
    "version": 2,
    "categoryId": "test-security",
    "sourceId": "be-97",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-97-follow-up",
    "kind": "follow-up",
    "followUpOf": "quiz-be-97-main",
    "sourceHeading": "테스트 더블의 종류에는 무엇이 있나요?",
    "question": "be-97의 핵심 개념을 한 단계 더 적용해 판단할 때 원문과 일치하는 설명은 무엇인가요?",
    "choices": [
      "스파이는 호출 내역을 기록해 테스트 결과 검증에 주로 사용한다.",
      "스파이는 아무 동작도 하지 않는 더미 객체다.",
      "스파이는 제품에 적합한 실제 구현을 제공하는 페이크다.",
      "스파이는 기대 상호작용을 검증해 예외를 내는 목 객체다."
    ],
    "correctIndex": 0,
    "explanation": "원문 근거는 스파이는 호출 내역을 기록해 테스트 결과 검증에 주로 사용한다.입니다.",
    "evidenceQuote": "**스파이(Spy)** 는 호출된 내역을 기록합니다. 기록한 내용은 테스트 결과를 검증할 때 주로 사용되며, 스텁의 일종이기도 합니다.",
    "followUpOrder": 1,
    "followUpRole": "core",
    "sourceAnchor": "테스트-더블의-종류에는-무엇이-있나요",
    "choiceFeedback": [
      "원문 근거는 스파이는 호출 내역을 기록해 테스트 결과 검증에 주로 사용한다.입니다.",
      "“스파이는 아무 동작도 하지 않는 더미 객체다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “스파이는 호출 내역을 기록해 테스트 결과 검증에 주로 사용한다.”입니다.",
      "“스파이는 제품에 적합한 실제 구현을 제공하는 페이크다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “스파이는 호출 내역을 기록해 테스트 결과 검증에 주로 사용한다.”입니다.",
      "“스파이는 기대 상호작용을 검증해 예외를 내는 목 객체다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “스파이는 호출 내역을 기록해 테스트 결과 검증에 주로 사용한다.”입니다."
    ],
    "keyPoints": [
      "테스트 더블의 종류에는 무엇이 있나요?",
      "테스트",
      "더블에",
      "대해서"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-97-follow-up-2",
    "kind": "follow-up",
    "followUpOf": "quiz-be-97-main",
    "followUpOrder": 2,
    "followUpRole": "core",
    "question": "테스트 더블 원문의 “본문” 구역과 일치하는 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.",
      "테스트 더블은 의존성을 시뮬레이션하지만, 테스트에 더욱 적합하게 사용할 수 있도록 만듭니다."
    ],
    "correctIndex": 3,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "test-security",
    "sourceId": "be-97",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "테스트 더블은 의존성을 시뮬레이션하지만, 테스트에 더욱 적합하게 사용할 수 있도록 만듭니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “테스트 더블은 의존성을 시뮬레이션하지만, 테스트에 더욱 적합하게 사용할 수 있도록 만듭니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “테스트 더블은 의존성을 시뮬레이션하지만, 테스트에 더욱 적합하게 사용할 수 있도록 만듭니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “테스트 더블은 의존성을 시뮬레이션하지만, 테스트에 더욱 적합하게 사용할 수 있도록 만듭니다.”입니다.",
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다."
    ],
    "keyPoints": [
      "본문",
      "테스트",
      "더블에",
      "대해서"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-97-follow-up-3",
    "kind": "follow-up",
    "followUpOf": "quiz-be-97-main",
    "followUpOrder": 3,
    "followUpRole": "remediation",
    "question": "테스트 더블의 핵심 근거를 다시 확인할 때 옳은 설명은 무엇인가요?",
    "choices": [
      "실제 의존성을 포함하는 테스트는 외부 세계에 부수 효과를 유발할 수 있으며, 외부 세계에 의존적이기 때문에 비결정적인 동작을 유발할 수 있습니다.",
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 0,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "test-security",
    "sourceId": "be-97",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "실제 의존성을 포함하는 테스트는 외부 세계에 부수 효과를 유발할 수 있으며, 외부 세계에 의존적이기 때문에 비결정적인 동작을 유발할 수 있습니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “실제 의존성을 포함하는 테스트는 외부 세계에 부수 효과를 유발할 수 있으며, 외부 세계에 의존적이기 때문에 비결정적인 동작을 유발할 수 있습니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “실제 의존성을 포함하는 테스트는 외부 세계에 부수 효과를 유발할 수 있으며, 외부 세계에 의존적이기 때문에 비결정적인 동작을 유발할 수 있습니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “실제 의존성을 포함하는 테스트는 외부 세계에 부수 효과를 유발할 수 있으며, 외부 세계에 의존적이기 때문에 비결정적인 동작을 유발할 수 있습니다.”입니다."
    ],
    "keyPoints": [
      "본문",
      "테스트",
      "더블에",
      "대해서"
    ]
  },
  {
    "version": 2,
    "categoryId": "test-security",
    "sourceId": "be-105",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-105-main",
    "kind": "main",
    "followUpOf": null,
    "sourceHeading": "Micrometer란 무엇이며, 왜 사용하나요?",
    "question": "be-105 원문에 따르면, 다음 중 맞는 설명은 무엇인가요?",
    "choices": [
      "Micrometer는 특정 데이터베이스 전용 쿼리 라이브러리다.",
      "Micrometer는 메트릭 대신 소스 코드만 수집한다.",
      "Micrometer는 벤더 중립적인 메트릭 계측 라이브러리다.",
      "Micrometer는 HTTP 요청 지표를 수집할 수 없다."
    ],
    "correctIndex": 2,
    "explanation": "원문은 Micrometer는 벤더 중립적인 메트릭 계측 라이브러리다.라고 설명합니다.",
    "evidenceQuote": "Micrometer는 벤더 중립적인 메트릭 계측 라이브러리로, 애플리케이션에서 발생하는 다양한 지표(예: CPU 사용량, 메모리 소비, HTTP 요청 및 커스텀 이벤트)를 수집합니다.",
    "followUpOrder": null,
    "followUpRole": null,
    "sourceAnchor": "micrometer란-무엇이며-왜-사용하나요",
    "choiceFeedback": [
      "“Micrometer는 특정 데이터베이스 전용 쿼리 라이브러리다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “Micrometer는 벤더 중립적인 메트릭 계측 라이브러리다.”입니다.",
      "“Micrometer는 메트릭 대신 소스 코드만 수집한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “Micrometer는 벤더 중립적인 메트릭 계측 라이브러리다.”입니다.",
      "원문은 Micrometer는 벤더 중립적인 메트릭 계측 라이브러리다.라고 설명합니다.",
      "“Micrometer는 HTTP 요청 지표를 수집할 수 없다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “Micrometer는 벤더 중립적인 메트릭 계측 라이브러리다.”입니다."
    ],
    "keyPoints": [
      "Micrometer란 무엇이며, 왜 사용하나요?",
      "Micrometer가",
      "무엇인지",
      "테스트, 보안과 관측 가능성"
    ]
  },
  {
    "version": 2,
    "categoryId": "test-security",
    "sourceId": "be-105",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-105-follow-up",
    "kind": "follow-up",
    "followUpOf": "quiz-be-105-main",
    "sourceHeading": "Micrometer란 무엇이며, 왜 사용하나요?",
    "question": "be-105의 핵심 개념을 한 단계 더 적용해 판단할 때 원문과 일치하는 설명은 무엇인가요?",
    "choices": [
      "Micrometer는 하나의 모니터링 시스템에만 메트릭을 보낼 수 있다.",
      "Micrometer는 백엔드 클라이언트 세부 구현을 반드시 노출한다.",
      "Micrometer는 여러 모니터링 시스템에 메트릭을 전송하는 일관된 API를 제공한다.",
      "Micrometer는 Prometheus와 같은 시스템에 메트릭을 전송할 수 없다."
    ],
    "correctIndex": 2,
    "explanation": "원문 근거는 Micrometer는 여러 모니터링 시스템에 메트릭을 전송하는 일관된 API를 제공한다.입니다.",
    "evidenceQuote": "이 라이브러리는 Prometheus, Datadog, Graphite 등 여러 모니터링 시스템에 메트릭을 전송할 수 있도록 단순하고 일관된 API(파사드)를 제공하여, 각 백엔드 클라이언트의 복잡한 세부 구현을 감춥니다.",
    "followUpOrder": 1,
    "followUpRole": "core",
    "sourceAnchor": "micrometer란-무엇이며-왜-사용하나요",
    "choiceFeedback": [
      "“Micrometer는 하나의 모니터링 시스템에만 메트릭을 보낼 수 있다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “Micrometer는 여러 모니터링 시스템에 메트릭을 전송하는 일관된 API를 제공한다.”입니다.",
      "“Micrometer는 백엔드 클라이언트 세부 구현을 반드시 노출한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “Micrometer는 여러 모니터링 시스템에 메트릭을 전송하는 일관된 API를 제공한다.”입니다.",
      "원문 근거는 Micrometer는 여러 모니터링 시스템에 메트릭을 전송하는 일관된 API를 제공한다.입니다.",
      "“Micrometer는 Prometheus와 같은 시스템에 메트릭을 전송할 수 없다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “Micrometer는 여러 모니터링 시스템에 메트릭을 전송하는 일관된 API를 제공한다.”입니다."
    ],
    "keyPoints": [
      "Micrometer란 무엇이며, 왜 사용하나요?",
      "Micrometer가",
      "무엇인지",
      "테스트, 보안과 관측 가능성"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-105-follow-up-2",
    "kind": "follow-up",
    "followUpOf": "quiz-be-105-main",
    "followUpOrder": 2,
    "followUpRole": "core",
    "question": "Micrometer가 무엇인지 원문의 “Micrometer란 무엇이며, 왜 사용하나요?” 구역과 일치하는 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "특히 Spring Boot Actuator와 깊이 통합되어, 기본 메트릭을 자동으로 수집하고 노출할 수 있습니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 1,
    "explanation": "원문의 “Micrometer란 무엇이며, 왜 사용하나요?” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "test-security",
    "sourceId": "be-105",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "Micrometer란 무엇이며, 왜 사용하나요?",
    "sourceAnchor": "micrometer란-무엇이며-왜-사용하나요",
    "evidenceQuote": "특히 Spring Boot Actuator와 깊이 통합되어, 기본 메트릭을 자동으로 수집하고 노출할 수 있습니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “특히 Spring Boot Actuator와 깊이 통합되어, 기본 메트릭을 자동으로 수집하고 노출할 수 있습니다.”입니다.",
      "원문의 “Micrometer란 무엇이며, 왜 사용하나요?” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “특히 Spring Boot Actuator와 깊이 통합되어, 기본 메트릭을 자동으로 수집하고 노출할 수 있습니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “특히 Spring Boot Actuator와 깊이 통합되어, 기본 메트릭을 자동으로 수집하고 노출할 수 있습니다.”입니다."
    ],
    "keyPoints": [
      "Micrometer란 무엇이며, 왜 사용하나요?",
      "Micrometer가",
      "무엇인지",
      "테스트, 보안과 관측 가능성"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-105-follow-up-3",
    "kind": "follow-up",
    "followUpOf": "quiz-be-105-main",
    "followUpOrder": 3,
    "followUpRole": "remediation",
    "question": "Micrometer가 무엇인지의 핵심 근거를 다시 확인할 때 옳은 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "Spring Boot Actuator는 애플리케이션의 상태, 헬스 체크, 환경, 로그 등 여러 운영 정보를 노출하는 관리 엔드포인트를 제공합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 2,
    "explanation": "원문의 “Spring Boot Actuator와 Micrometer의 관계는 무엇인가요?” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "test-security",
    "sourceId": "be-105",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "Spring Boot Actuator와 Micrometer의 관계는 무엇인가요?",
    "sourceAnchor": "spring-boot-actuator와-micrometer의-관계는-무엇인가요",
    "evidenceQuote": "Spring Boot Actuator는 애플리케이션의 상태, 헬스 체크, 환경, 로그 등 여러 운영 정보를 노출하는 관리 엔드포인트를 제공합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “Spring Boot Actuator는 애플리케이션의 상태, 헬스 체크, 환경, 로그 등 여러 운영 정보를 노출하는 관리 엔드포인트를 제공합니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “Spring Boot Actuator는 애플리케이션의 상태, 헬스 체크, 환경, 로그 등 여러 운영 정보를 노출하는 관리 엔드포인트를 제공합니다.”입니다.",
      "원문의 “Spring Boot Actuator와 Micrometer의 관계는 무엇인가요?” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “Spring Boot Actuator는 애플리케이션의 상태, 헬스 체크, 환경, 로그 등 여러 운영 정보를 노출하는 관리 엔드포인트를 제공합니다.”입니다."
    ],
    "keyPoints": [
      "Micrometer가",
      "무엇인지",
      "테스트, 보안과 관측 가능성"
    ]
  },
  {
    "version": 2,
    "categoryId": "test-security",
    "sourceId": "be-139",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-139-main",
    "kind": "main",
    "followUpOf": null,
    "sourceHeading": "본문",
    "question": "be-139 원문에 따르면, 다음 중 맞는 설명은 무엇인가요?",
    "choices": [
      "테스트 격리는 테스트가 이전 테스트의 상태를 공유하도록 보장한다.",
      "테스트 격리는 각 테스트가 서로 독립적으로 실행되도록 보장하는 것이다.",
      "테스트 격리는 실행 순서에 따라 결과가 달라지게 한다.",
      "테스트 격리는 데이터베이스를 공유해야만 달성된다."
    ],
    "correctIndex": 1,
    "explanation": "원문은 테스트 격리는 각 테스트가 서로 독립적으로 실행되도록 보장하는 것이다.라고 설명합니다.",
    "evidenceQuote": "**테스트 격리(Test Isolation)** 는 각 테스트가 서로 독립적으로 실행되도록 보장하는 것을 말합니다.",
    "followUpOrder": null,
    "followUpRole": null,
    "sourceAnchor": "content-answer",
    "choiceFeedback": [
      "“테스트 격리는 테스트가 이전 테스트의 상태를 공유하도록 보장한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “테스트 격리는 각 테스트가 서로 독립적으로 실행되도록 보장하는 것이다.”입니다.",
      "원문은 테스트 격리는 각 테스트가 서로 독립적으로 실행되도록 보장하는 것이다.라고 설명합니다.",
      "“테스트 격리는 실행 순서에 따라 결과가 달라지게 한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “테스트 격리는 각 테스트가 서로 독립적으로 실행되도록 보장하는 것이다.”입니다.",
      "“테스트 격리는 데이터베이스를 공유해야만 달성된다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “테스트 격리는 각 테스트가 서로 독립적으로 실행되도록 보장하는 것이다.”입니다."
    ],
    "keyPoints": [
      "본문",
      "테스트",
      "격리란",
      "무엇인가요?"
    ]
  },
  {
    "version": 2,
    "categoryId": "test-security",
    "sourceId": "be-139",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-139-follow-up",
    "kind": "follow-up",
    "followUpOf": "quiz-be-139-main",
    "sourceHeading": "본문",
    "question": "be-139의 핵심 개념을 한 단계 더 적용해 판단할 때 원문과 일치하는 설명은 무엇인가요?",
    "choices": [
      "테스트 격리가 안 되어도 테스트 결과는 항상 예측 가능하다.",
      "테스트 격리가 안 되면 같은 테스트가 매번 같은 결과를 내지 않는 비결정적 테스트가 생길 수 있다.",
      "비결정적 테스트는 실패 원인을 쉽게 판단하게 한다.",
      "공유 자원 의존은 테스트 실행 순서와 무관하다."
    ],
    "correctIndex": 1,
    "explanation": "원문 근거는 테스트 격리가 안 되면 같은 테스트가 매번 같은 결과를 내지 않는 비결정적 테스트가 생길 수 있다.입니다.",
    "evidenceQuote": "테스트 격리가 중요한 이유는 격리가 제대로 이루어지지 않으면 비결정적 테스트가 발생할 수 있기 때문입니다.",
    "followUpOrder": 1,
    "followUpRole": "core",
    "sourceAnchor": "content-answer",
    "choiceFeedback": [
      "“테스트 격리가 안 되어도 테스트 결과는 항상 예측 가능하다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “테스트 격리가 안 되면 같은 테스트가 매번 같은 결과를 내지 않는 비결정적 테스트가 생길 수 있다.”입니다.",
      "원문 근거는 테스트 격리가 안 되면 같은 테스트가 매번 같은 결과를 내지 않는 비결정적 테스트가 생길 수 있다.입니다.",
      "“비결정적 테스트는 실패 원인을 쉽게 판단하게 한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “테스트 격리가 안 되면 같은 테스트가 매번 같은 결과를 내지 않는 비결정적 테스트가 생길 수 있다.”입니다.",
      "“공유 자원 의존은 테스트 실행 순서와 무관하다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “테스트 격리가 안 되면 같은 테스트가 매번 같은 결과를 내지 않는 비결정적 테스트가 생길 수 있다.”입니다."
    ],
    "keyPoints": [
      "본문",
      "테스트",
      "격리란",
      "무엇인가요?"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-139-follow-up-2",
    "kind": "follow-up",
    "followUpOf": "quiz-be-139-main",
    "followUpOrder": 2,
    "followUpRole": "core",
    "question": "테스트 격리란 무엇인가요 원문의 “본문” 구역과 일치하는 설명은 무엇인가요?",
    "choices": [
      "즉, 어떤 테스트가 실행되더라도 다른 테스트의 결과나 상태에 영향을 주거나 받지 않아야 한다는 의미입니다.",
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 0,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "test-security",
    "sourceId": "be-139",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "즉, 어떤 테스트가 실행되더라도 다른 테스트의 결과나 상태에 영향을 주거나 받지 않아야 한다는 의미입니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “즉, 어떤 테스트가 실행되더라도 다른 테스트의 결과나 상태에 영향을 주거나 받지 않아야 한다는 의미입니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “즉, 어떤 테스트가 실행되더라도 다른 테스트의 결과나 상태에 영향을 주거나 받지 않아야 한다는 의미입니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “즉, 어떤 테스트가 실행되더라도 다른 테스트의 결과나 상태에 영향을 주거나 받지 않아야 한다는 의미입니다.”입니다."
    ],
    "keyPoints": [
      "본문",
      "테스트",
      "격리란",
      "무엇인가요?"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-139-follow-up-3",
    "kind": "follow-up",
    "followUpOf": "quiz-be-139-main",
    "followUpOrder": 3,
    "followUpRole": "remediation",
    "question": "테스트 격리란 무엇인가요의 핵심 근거를 다시 확인할 때 옳은 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "**비결정적(Non-deterministic) 테스트**는 같은 테스트를 여러 번 실행했을 때 항상 같은 결과를 내지 않는 테스트를 말합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 1,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "test-security",
    "sourceId": "be-139",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "**비결정적(Non-deterministic) 테스트**는 같은 테스트를 여러 번 실행했을 때 항상 같은 결과를 내지 않는 테스트를 말합니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “**비결정적(Non-deterministic) 테스트**는 같은 테스트를 여러 번 실행했을 때 항상 같은 결과를 내지 않는 테스트를 말합니다.”입니다.",
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “**비결정적(Non-deterministic) 테스트**는 같은 테스트를 여러 번 실행했을 때 항상 같은 결과를 내지 않는 테스트를 말합니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “**비결정적(Non-deterministic) 테스트**는 같은 테스트를 여러 번 실행했을 때 항상 같은 결과를 내지 않는 테스트를 말합니다.”입니다."
    ],
    "keyPoints": [
      "본문",
      "테스트",
      "격리란",
      "무엇인가요?"
    ]
  },
  {
    "version": 2,
    "categoryId": "test-security",
    "sourceId": "be-140",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-140-main",
    "kind": "main",
    "followUpOf": null,
    "sourceHeading": "본문",
    "question": "be-140 원문에 따르면, 다음 중 맞는 설명은 무엇인가요?",
    "choices": [
      "SQL 인젝션은 사용자 입력을 안전하게 바인딩할 때 발생한다.",
      "SQL 인젝션은 사용자 입력이 SQL 쿼리에 안전하게 처리되지 않을 때 생기는 취약점이다.",
      "SQL 인젝션은 SQL 쿼리와 무관한 화면 렌더링 취약점이다.",
      "SQL 인젝션은 인증 우회나 데이터 조작을 일으킬 수 없다."
    ],
    "correctIndex": 1,
    "explanation": "원문은 SQL 인젝션은 사용자 입력이 SQL 쿼리에 안전하게 처리되지 않을 때 생기는 취약점이다.라고 설명합니다.",
    "evidenceQuote": "**SQL 인젝션(SQL Injection)** 은 웹 애플리케이션에서 사용자의 입력값이 SQL 쿼리에 안전하게 처리되지 않을 때 발생하는 보안 취약점입니다.",
    "followUpOrder": null,
    "followUpRole": null,
    "sourceAnchor": "content-answer",
    "choiceFeedback": [
      "“SQL 인젝션은 사용자 입력을 안전하게 바인딩할 때 발생한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “SQL 인젝션은 사용자 입력이 SQL 쿼리에 안전하게 처리되지 않을 때 생기는 취약점이다.”입니다.",
      "원문은 SQL 인젝션은 사용자 입력이 SQL 쿼리에 안전하게 처리되지 않을 때 생기는 취약점이다.라고 설명합니다.",
      "“SQL 인젝션은 SQL 쿼리와 무관한 화면 렌더링 취약점이다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “SQL 인젝션은 사용자 입력이 SQL 쿼리에 안전하게 처리되지 않을 때 생기는 취약점이다.”입니다.",
      "“SQL 인젝션은 인증 우회나 데이터 조작을 일으킬 수 없다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “SQL 인젝션은 사용자 입력이 SQL 쿼리에 안전하게 처리되지 않을 때 생기는 취약점이다.”입니다."
    ],
    "keyPoints": [
      "본문",
      "SQL",
      "인젝션에",
      "대해"
    ]
  },
  {
    "version": 2,
    "categoryId": "test-security",
    "sourceId": "be-140",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "id": "quiz-be-140-follow-up",
    "kind": "follow-up",
    "followUpOf": "quiz-be-140-main",
    "sourceHeading": "SQL 인젝션을 방지하는 방법은 무엇인가요?",
    "question": "be-140의 핵심 개념을 한 단계 더 적용해 판단할 때 원문과 일치하는 설명은 무엇인가요?",
    "choices": [
      "PreparedStatement는 사용자 입력을 SQL 문자열에 직접 이어 붙인다.",
      "PreparedStatement는 placeholder에 값을 바인딩하고 내부 이스케이프 처리해 SQL 인젝션을 막을 수 있다.",
      "PreparedStatement는 placeholder 값을 바인딩하지 않는다.",
      "PreparedStatement는 SQL 오류를 사용자에게 반드시 노출한다."
    ],
    "correctIndex": 1,
    "explanation": "원문 근거는 PreparedStatement는 placeholder에 값을 바인딩하고 내부 이스케이프 처리해 SQL 인젝션을 막을 수 있다.입니다.",
    "evidenceQuote": "PreparedStatement를 사용하면 place holder(`?`)에 값을 바인딩하고 내부적으로 이스케이프 처리하기 때문에 SQL 인젝션을 방지할 수 있습니다.",
    "followUpOrder": 1,
    "followUpRole": "core",
    "sourceAnchor": "sql-인젝션을-방지하는-방법은-무엇인가요",
    "choiceFeedback": [
      "“PreparedStatement는 사용자 입력을 SQL 문자열에 직접 이어 붙인다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “PreparedStatement는 placeholder에 값을 바인딩하고 내부 이스케이프 처리해 SQL 인젝션을 막을 수 있다.”입니다.",
      "원문 근거는 PreparedStatement는 placeholder에 값을 바인딩하고 내부 이스케이프 처리해 SQL 인젝션을 막을 수 있다.입니다.",
      "“PreparedStatement는 placeholder 값을 바인딩하지 않는다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “PreparedStatement는 placeholder에 값을 바인딩하고 내부 이스케이프 처리해 SQL 인젝션을 막을 수 있다.”입니다.",
      "“PreparedStatement는 SQL 오류를 사용자에게 반드시 노출한다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “PreparedStatement는 placeholder에 값을 바인딩하고 내부 이스케이프 처리해 SQL 인젝션을 막을 수 있다.”입니다."
    ],
    "keyPoints": [
      "SQL 인젝션을 방지하는 방법은 무엇인가요?",
      "SQL",
      "인젝션에",
      "대해"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-140-follow-up-2",
    "kind": "follow-up",
    "followUpOf": "quiz-be-140-main",
    "followUpOrder": 2,
    "followUpRole": "core",
    "question": "SQL 인젝션 원문의 “본문” 구역과 일치하는 설명은 무엇인가요?",
    "choices": [
      "공격자는 이 취약점을 이용해 쿼리를 조작하여 인증을 우회하거나, 데이터를 조작하거나, 테이블 자체를 삭제할 수도 있습니다.",
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 0,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "test-security",
    "sourceId": "be-140",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "공격자는 이 취약점을 이용해 쿼리를 조작하여 인증을 우회하거나, 데이터를 조작하거나, 테이블 자체를 삭제할 수도 있습니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “공격자는 이 취약점을 이용해 쿼리를 조작하여 인증을 우회하거나, 데이터를 조작하거나, 테이블 자체를 삭제할 수도 있습니다.”입니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “공격자는 이 취약점을 이용해 쿼리를 조작하여 인증을 우회하거나, 데이터를 조작하거나, 테이블 자체를 삭제할 수도 있습니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “공격자는 이 취약점을 이용해 쿼리를 조작하여 인증을 우회하거나, 데이터를 조작하거나, 테이블 자체를 삭제할 수도 있습니다.”입니다."
    ],
    "keyPoints": [
      "본문",
      "SQL",
      "인젝션에",
      "대해"
    ]
  },
  {
    "version": 2,
    "id": "quiz-be-140-follow-up-3",
    "kind": "follow-up",
    "followUpOf": "quiz-be-140-main",
    "followUpOrder": 3,
    "followUpRole": "remediation",
    "question": "SQL 인젝션의 핵심 근거를 다시 확인할 때 옳은 설명은 무엇인가요?",
    "choices": [
      "원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.",
      "예를 들어, 로그인 검증 시 아래와 같은 코드를 사용한다고 가정해 보겠습니다.",
      "원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.",
      "원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다."
    ],
    "correctIndex": 1,
    "explanation": "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
    "categoryId": "test-security",
    "sourceId": "be-140",
    "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca",
    "sourceHeading": "본문",
    "sourceAnchor": "content-answer",
    "evidenceQuote": "예를 들어, 로그인 검증 시 아래와 같은 코드를 사용한다고 가정해 보겠습니다.",
    "reviewStatus": "verified",
    "provenance": {
      "author": "codex-curated",
      "review": "independent-source-audit",
      "sourceCommit": "d00877afb0a302072078d34ded66b3b69143a5ca"
    },
    "choiceFeedback": [
      "“원문은 이 개념이 어떤 상황에서도 동작하지 않는다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “예를 들어, 로그인 검증 시 아래와 같은 코드를 사용한다고 가정해 보겠습니다.”입니다.",
      "원문의 “본문” 구역이 정답 선택지의 내용을 직접 설명합니다.",
      "“원문은 관련 책임이 항상 브라우저에만 있다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “예를 들어, 로그인 검증 시 아래와 같은 코드를 사용한다고 가정해 보겠습니다.”입니다.",
      "“원문은 별도 조건 없이 모든 경우에 동일한 결과를 보장한다고 설명합니다.”는 원문의 인용 근거와 일치하지 않습니다. 정답은 “예를 들어, 로그인 검증 시 아래와 같은 코드를 사용한다고 가정해 보겠습니다.”입니다."
    ],
    "keyPoints": [
      "본문",
      "SQL",
      "인젝션에",
      "대해"
    ]
  }
]);
