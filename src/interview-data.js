// https://raw.githubusercontent.com/maeil-mail/maeil-mail-contents/8714ebdea872550df26a92b7846338dbdccf3986/backend/toc-category.md에서 생성한 백엔드 질문 메타데이터입니다.
export const INTERVIEW_SOURCE = Object.freeze({
  "repository": "maeil-mail/maeil-mail-contents",
  "snapshotCommit": "8714ebdea872550df26a92b7846338dbdccf3986",
  "tocUrl": "https://github.com/maeil-mail/maeil-mail-contents/blob/main/backend/toc-category.md"
});

export const INTERVIEW_CATEGORIES = Object.freeze([
  {
    "id": "spring-application",
    "label": "Spring과 애플리케이션 계층",
    "order": 1,
    "count": 21
  },
  {
    "id": "persistence-database",
    "label": "Persistence와 데이터베이스",
    "order": 2,
    "count": 25
  },
  {
    "id": "network-http",
    "label": "네트워크, HTTP와 웹 인프라",
    "order": 3,
    "count": 25
  },
  {
    "id": "distributed-cache",
    "label": "분산 시스템, 캐시와 운영 인프라",
    "order": 4,
    "count": 17
  },
  {
    "id": "os-concurrency",
    "label": "운영체제, 동시성과 런타임",
    "order": 5,
    "count": 23
  },
  {
    "id": "java-language",
    "label": "자바 언어, 컬렉션과 자료구조",
    "order": 6,
    "count": 21
  },
  {
    "id": "architecture-design",
    "label": "아키텍처, 객체지향과 설계 패턴",
    "order": 7,
    "count": 9
  },
  {
    "id": "test-security",
    "label": "테스트, 보안과 관측 가능성",
    "order": 8,
    "count": 11
  }
]);

export const INTERVIEW_QUESTIONS = Object.freeze([
  {
    "id": "be-1",
    "number": 1,
    "title": "OSIV(Open Session In View) 옵션에 대해서 설명해주세요.",
    "categoryId": "spring-application",
    "category": "Spring과 애플리케이션 계층",
    "order": 1,
    "sourceUrl": "https://github.com/maeil-mail/maeil-mail-contents/blob/main/backend/contents/be-1.md"
  },
  {
    "id": "be-3",
    "number": 3,
    "title": "@Value 어노테이션 사용 시 주의할 점을 설명해주세요.",
    "categoryId": "spring-application",
    "category": "Spring과 애플리케이션 계층",
    "order": 2,
    "sourceUrl": "https://github.com/maeil-mail/maeil-mail-contents/blob/main/backend/contents/be-3.md"
  },
  {
    "id": "be-4",
    "number": 4,
    "title": "@ExceptionHandler 어노테이션은 무엇인가요?",
    "categoryId": "spring-application",
    "category": "Spring과 애플리케이션 계층",
    "order": 3,
    "sourceUrl": "https://github.com/maeil-mail/maeil-mail-contents/blob/main/backend/contents/be-4.md"
  },
  {
    "id": "be-5",
    "number": 5,
    "title": "@ResponseBody(or ResponseEntity<T>)가 있을 때와 없을 때의 동작 방식의 차이점을 말해주세요.",
    "categoryId": "spring-application",
    "category": "Spring과 애플리케이션 계층",
    "order": 4,
    "sourceUrl": "https://github.com/maeil-mail/maeil-mail-contents/blob/main/backend/contents/be-5.md"
  },
  {
    "id": "be-6",
    "number": 6,
    "title": "Filter와 Interceptor의 차이점을 말해주세요.",
    "categoryId": "spring-application",
    "category": "Spring과 애플리케이션 계층",
    "order": 5,
    "sourceUrl": "https://github.com/maeil-mail/maeil-mail-contents/blob/main/backend/contents/be-6.md"
  },
  {
    "id": "be-7",
    "number": 7,
    "title": "Spring MVC의 실행 흐름에 대해 설명해주세요.",
    "categoryId": "spring-application",
    "category": "Spring과 애플리케이션 계층",
    "order": 6,
    "sourceUrl": "https://github.com/maeil-mail/maeil-mail-contents/blob/main/backend/contents/be-7.md"
  },
  {
    "id": "be-8",
    "number": 8,
    "title": "@Controller 와 @RestController 의 차이점을 설명해주세요.",
    "categoryId": "spring-application",
    "category": "Spring과 애플리케이션 계층",
    "order": 7,
    "sourceUrl": "https://github.com/maeil-mail/maeil-mail-contents/blob/main/backend/contents/be-8.md"
  },
  {
    "id": "be-9",
    "number": 9,
    "title": "ControllerAdvice에 대해 설명해주세요.",
    "categoryId": "spring-application",
    "category": "Spring과 애플리케이션 계층",
    "order": 8,
    "sourceUrl": "https://github.com/maeil-mail/maeil-mail-contents/blob/main/backend/contents/be-9.md"
  },
  {
    "id": "be-10",
    "number": 10,
    "title": "RequestBody VS ModelAttribute의 차이점을 말해주세요.",
    "categoryId": "spring-application",
    "category": "Spring과 애플리케이션 계층",
    "order": 9,
    "sourceUrl": "https://github.com/maeil-mail/maeil-mail-contents/blob/main/backend/contents/be-10.md"
  },
  {
    "id": "be-11",
    "number": 11,
    "title": "톰캣에 대해서 설명해주세요.",
    "categoryId": "spring-application",
    "category": "Spring과 애플리케이션 계층",
    "order": 10,
    "sourceUrl": "https://github.com/maeil-mail/maeil-mail-contents/blob/main/backend/contents/be-11.md"
  },
  {
    "id": "be-12",
    "number": 12,
    "title": "AutoConfiguration 동작 원리를 설명해주세요.",
    "categoryId": "spring-application",
    "category": "Spring과 애플리케이션 계층",
    "order": 11,
    "sourceUrl": "https://github.com/maeil-mail/maeil-mail-contents/blob/main/backend/contents/be-12.md"
  },
  {
    "id": "be-13",
    "number": 13,
    "title": "Spring과 Spring Boot의 차이를 말해주세요.",
    "categoryId": "spring-application",
    "category": "Spring과 애플리케이션 계층",
    "order": 12,
    "sourceUrl": "https://github.com/maeil-mail/maeil-mail-contents/blob/main/backend/contents/be-13.md"
  },
  {
    "id": "be-29",
    "number": 29,
    "title": "@Component, @Controller, @Service, @Repository의 차이점에 대해서 설명해주세요.",
    "categoryId": "spring-application",
    "category": "Spring과 애플리케이션 계층",
    "order": 13,
    "sourceUrl": "https://github.com/maeil-mail/maeil-mail-contents/blob/main/backend/contents/be-29.md"
  },
  {
    "id": "be-43",
    "number": 43,
    "title": "private 메서드에 @Transactional 선언하면 트랜잭션이 동작할까요?",
    "categoryId": "spring-application",
    "category": "Spring과 애플리케이션 계층",
    "order": 14,
    "sourceUrl": "https://github.com/maeil-mail/maeil-mail-contents/blob/main/backend/contents/be-43.md"
  },
  {
    "id": "be-88",
    "number": 88,
    "title": "스프링 트랜잭션 AOP 동작 흐름에 대해서 설명해주세요.",
    "categoryId": "spring-application",
    "category": "Spring과 애플리케이션 계층",
    "order": 15,
    "sourceUrl": "https://github.com/maeil-mail/maeil-mail-contents/blob/main/backend/contents/be-88.md"
  },
  {
    "id": "be-89",
    "number": 89,
    "title": "의존성 주입이란 무엇인가요?",
    "categoryId": "spring-application",
    "category": "Spring과 애플리케이션 계층",
    "order": 16,
    "sourceUrl": "https://github.com/maeil-mail/maeil-mail-contents/blob/main/backend/contents/be-89.md"
  },
  {
    "id": "be-102",
    "number": 102,
    "title": "스프링 트랜잭션 전파 속성에 대해서 설명해주세요.",
    "categoryId": "spring-application",
    "category": "Spring과 애플리케이션 계층",
    "order": 17,
    "sourceUrl": "https://github.com/maeil-mail/maeil-mail-contents/blob/main/backend/contents/be-102.md"
  },
  {
    "id": "be-123",
    "number": 123,
    "title": "PRG 패턴에 대해서 설명해 주세요.",
    "categoryId": "spring-application",
    "category": "Spring과 애플리케이션 계층",
    "order": 18,
    "sourceUrl": "https://github.com/maeil-mail/maeil-mail-contents/blob/main/backend/contents/be-123.md"
  },
  {
    "id": "be-135",
    "number": 135,
    "title": "어떤 예외가 발생하면 트랜잭션을 롤백하나요?",
    "categoryId": "spring-application",
    "category": "Spring과 애플리케이션 계층",
    "order": 19,
    "sourceUrl": "https://github.com/maeil-mail/maeil-mail-contents/blob/main/backend/contents/be-135.md"
  },
  {
    "id": "be-146",
    "number": 146,
    "title": "Spring에서 객체를 Bean으로 관리하는 이유를 설명해주세요.",
    "categoryId": "spring-application",
    "category": "Spring과 애플리케이션 계층",
    "order": 20,
    "sourceUrl": "https://github.com/maeil-mail/maeil-mail-contents/blob/main/backend/contents/be-146.md"
  },
  {
    "id": "be-151",
    "number": 151,
    "title": "레이어드 아키텍처란 무엇인가요?",
    "categoryId": "spring-application",
    "category": "Spring과 애플리케이션 계층",
    "order": 21,
    "sourceUrl": "https://github.com/maeil-mail/maeil-mail-contents/blob/main/backend/contents/be-151.md"
  },
  {
    "id": "be-14",
    "number": 14,
    "title": "JPA를 사용하는 이유를 설명해주세요.",
    "categoryId": "persistence-database",
    "category": "Persistence와 데이터베이스",
    "order": 22,
    "sourceUrl": "https://github.com/maeil-mail/maeil-mail-contents/blob/main/backend/contents/be-14.md"
  },
  {
    "id": "be-15",
    "number": 15,
    "title": "JPA, Hibernate, Spring Data JPA 의 차이가 무엇인가요?",
    "categoryId": "persistence-database",
    "category": "Persistence와 데이터베이스",
    "order": 23,
    "sourceUrl": "https://github.com/maeil-mail/maeil-mail-contents/blob/main/backend/contents/be-15.md"
  },
  {
    "id": "be-16",
    "number": 16,
    "title": "Spring Data JPA에서 새로운 Entity인지 판단하는 방법은 무엇일까요?",
    "categoryId": "persistence-database",
    "category": "Persistence와 데이터베이스",
    "order": 24,
    "sourceUrl": "https://github.com/maeil-mail/maeil-mail-contents/blob/main/backend/contents/be-16.md"
  },
  {
    "id": "be-17",
    "number": 17,
    "title": "JPA의 ddl-auto 옵션은 각각 어떤 동작을 하고 어떤 상황에서 사용해야 할까요?",
    "categoryId": "persistence-database",
    "category": "Persistence와 데이터베이스",
    "order": 25,
    "sourceUrl": "https://github.com/maeil-mail/maeil-mail-contents/blob/main/backend/contents/be-17.md"
  },
  {
    "id": "be-18",
    "number": 18,
    "title": "엔티티 매니저에 대해 설명해주세요.",
    "categoryId": "persistence-database",
    "category": "Persistence와 데이터베이스",
    "order": 26,
    "sourceUrl": "https://github.com/maeil-mail/maeil-mail-contents/blob/main/backend/contents/be-18.md"
  },
  {
    "id": "be-19",
    "number": 19,
    "title": "JPA의 N + 1 문제에 대해서 설명해주세요.",
    "categoryId": "persistence-database",
    "category": "Persistence와 데이터베이스",
    "order": 27,
    "sourceUrl": "https://github.com/maeil-mail/maeil-mail-contents/blob/main/backend/contents/be-19.md"
  },
  {
    "id": "be-22",
    "number": 22,
    "title": "데이터베이스 인덱스에 대해서 설명해주세요.",
    "categoryId": "persistence-database",
    "category": "Persistence와 데이터베이스",
    "order": 28,
    "sourceUrl": "https://github.com/maeil-mail/maeil-mail-contents/blob/main/backend/contents/be-22.md"
  },
  {
    "id": "be-23",
    "number": 23,
    "title": "트랜잭션 격리수준은 무엇인가요?",
    "categoryId": "persistence-database",
    "category": "Persistence와 데이터베이스",
    "order": 29,
    "sourceUrl": "https://github.com/maeil-mail/maeil-mail-contents/blob/main/backend/contents/be-23.md"
  },
  {
    "id": "be-26",
    "number": 26,
    "title": "JPA에서 ID 생성 전략에 대해 설명해주세요.",
    "categoryId": "persistence-database",
    "category": "Persistence와 데이터베이스",
    "order": 30,
    "sourceUrl": "https://github.com/maeil-mail/maeil-mail-contents/blob/main/backend/contents/be-26.md"
  },
  {
    "id": "be-36",
    "number": 36,
    "title": "데이터베이스 커넥션 풀(Connection Pool)을 사용하지 않으면 어떤 문제가 발생할 수 있나요?",
    "categoryId": "persistence-database",
    "category": "Persistence와 데이터베이스",
    "order": 31,
    "sourceUrl": "https://github.com/maeil-mail/maeil-mail-contents/blob/main/backend/contents/be-36.md"
  },
  {
    "id": "be-39",
    "number": 39,
    "title": "데이터베이스 시스템에서 동시성을 제어하는 방법에 대해 설명해주세요.",
    "categoryId": "persistence-database",
    "category": "Persistence와 데이터베이스",
    "order": 32,
    "sourceUrl": "https://github.com/maeil-mail/maeil-mail-contents/blob/main/backend/contents/be-39.md"
  },
  {
    "id": "be-40",
    "number": 40,
    "title": "MySQL InnoDB에서 갭락과 넥스트키 락이란 무엇이며, 어떻게  팬텀 리드를 방지하나요?",
    "categoryId": "persistence-database",
    "category": "Persistence와 데이터베이스",
    "order": 33,
    "sourceUrl": "https://github.com/maeil-mail/maeil-mail-contents/blob/main/backend/contents/be-40.md"
  },
  {
    "id": "be-50",
    "number": 50,
    "title": "DB Replication에 대해서 설명해주세요.",
    "categoryId": "persistence-database",
    "category": "Persistence와 데이터베이스",
    "order": 34,
    "sourceUrl": "https://github.com/maeil-mail/maeil-mail-contents/blob/main/backend/contents/be-50.md"
  },
  {
    "id": "be-57",
    "number": 57,
    "title": "ACID에 대해서 설명해주세요.",
    "categoryId": "persistence-database",
    "category": "Persistence와 데이터베이스",
    "order": 35,
    "sourceUrl": "https://github.com/maeil-mail/maeil-mail-contents/blob/main/backend/contents/be-57.md"
  },
  {
    "id": "be-61",
    "number": 61,
    "title": "관계형 데이터베이스와 비 관계형 데이터베이스의 차이점은 무엇인가요?",
    "categoryId": "persistence-database",
    "category": "Persistence와 데이터베이스",
    "order": 36,
    "sourceUrl": "https://github.com/maeil-mail/maeil-mail-contents/blob/main/backend/contents/be-61.md"
  },
  {
    "id": "be-94",
    "number": 94,
    "title": "데이터베이스 정규화에 대해서 설명해주세요.",
    "categoryId": "persistence-database",
    "category": "Persistence와 데이터베이스",
    "order": 37,
    "sourceUrl": "https://github.com/maeil-mail/maeil-mail-contents/blob/main/backend/contents/be-94.md"
  },
  {
    "id": "be-110",
    "number": 110,
    "title": "@OneToOne 연관관계에서 Lazy Loading을 설정할 때 주의할 점은 무엇일까요?",
    "categoryId": "persistence-database",
    "category": "Persistence와 데이터베이스",
    "order": 38,
    "sourceUrl": "https://github.com/maeil-mail/maeil-mail-contents/blob/main/backend/contents/be-110.md"
  },
  {
    "id": "be-120",
    "number": 120,
    "title": "낙관적 락과 비관적 락에 대해 설명해 주세요.",
    "categoryId": "persistence-database",
    "category": "Persistence와 데이터베이스",
    "order": 39,
    "sourceUrl": "https://github.com/maeil-mail/maeil-mail-contents/blob/main/backend/contents/be-120.md"
  },
  {
    "id": "be-121",
    "number": 121,
    "title": "RDB에서 페이징 쿼리의 필요성을 설명해 주세요.",
    "categoryId": "persistence-database",
    "category": "Persistence와 데이터베이스",
    "order": 40,
    "sourceUrl": "https://github.com/maeil-mail/maeil-mail-contents/blob/main/backend/contents/be-121.md"
  },
  {
    "id": "be-126",
    "number": 126,
    "title": "열 기반 DB와 행 기반 DB의 차이점은 무엇인가요?",
    "categoryId": "persistence-database",
    "category": "Persistence와 데이터베이스",
    "order": 41,
    "sourceUrl": "https://github.com/maeil-mail/maeil-mail-contents/blob/main/backend/contents/be-126.md"
  },
  {
    "id": "be-131",
    "number": 131,
    "title": "JPA Fetch Join과 페이징을 함께 사용할 때 주의점을 설명해 주세요.",
    "categoryId": "persistence-database",
    "category": "Persistence와 데이터베이스",
    "order": 42,
    "sourceUrl": "https://github.com/maeil-mail/maeil-mail-contents/blob/main/backend/contents/be-131.md"
  },
  {
    "id": "be-136",
    "number": 136,
    "title": "논리 삭제와 물리 삭제의 차이점은 무엇인가요?",
    "categoryId": "persistence-database",
    "category": "Persistence와 데이터베이스",
    "order": 43,
    "sourceUrl": "https://github.com/maeil-mail/maeil-mail-contents/blob/main/backend/contents/be-136.md"
  },
  {
    "id": "be-138",
    "number": 138,
    "title": "NoSQL 데이터베이스의 유형에는 어떤 것들이 있나요?",
    "categoryId": "persistence-database",
    "category": "Persistence와 데이터베이스",
    "order": 44,
    "sourceUrl": "https://github.com/maeil-mail/maeil-mail-contents/blob/main/backend/contents/be-138.md"
  },
  {
    "id": "be-142",
    "number": 142,
    "title": "NOT IN 쿼리를 사용할 때 발생할 수 있는 문제와 최적화 방법에 대해 설명해 주세요.",
    "categoryId": "persistence-database",
    "category": "Persistence와 데이터베이스",
    "order": 45,
    "sourceUrl": "https://github.com/maeil-mail/maeil-mail-contents/blob/main/backend/contents/be-142.md"
  },
  {
    "id": "be-143",
    "number": 143,
    "title": "Statement와 PreparedStatement의 차이점은 무엇인가요?",
    "categoryId": "persistence-database",
    "category": "Persistence와 데이터베이스",
    "order": 46,
    "sourceUrl": "https://github.com/maeil-mail/maeil-mail-contents/blob/main/backend/contents/be-143.md"
  },
  {
    "id": "be-30",
    "number": 30,
    "title": "동기 방식으로 외부 서비스를 호출할 때 외부 서비스 장애가 나면 어떻게 조치할 수 있나요?",
    "categoryId": "network-http",
    "category": "네트워크, HTTP와 웹 인프라",
    "order": 47,
    "sourceUrl": "https://github.com/maeil-mail/maeil-mail-contents/blob/main/backend/contents/be-30.md"
  },
  {
    "id": "be-31",
    "number": 31,
    "title": "TCP 3-way handshake에 대해서 설명해주세요.",
    "categoryId": "network-http",
    "category": "네트워크, HTTP와 웹 인프라",
    "order": 48,
    "sourceUrl": "https://github.com/maeil-mail/maeil-mail-contents/blob/main/backend/contents/be-31.md"
  },
  {
    "id": "be-37",
    "number": 37,
    "title": "사용자가 웹사이트에 처음 접근했을 때 발생하는 일련의 과정에 대해 설명해 주세요.",
    "categoryId": "network-http",
    "category": "네트워크, HTTP와 웹 인프라",
    "order": 49,
    "sourceUrl": "https://github.com/maeil-mail/maeil-mail-contents/blob/main/backend/contents/be-37.md"
  },
  {
    "id": "be-38",
    "number": 38,
    "title": "HTTP 메서드에서 멱등성이란 무엇인가요?",
    "categoryId": "network-http",
    "category": "네트워크, HTTP와 웹 인프라",
    "order": 50,
    "sourceUrl": "https://github.com/maeil-mail/maeil-mail-contents/blob/main/backend/contents/be-38.md"
  },
  {
    "id": "be-41",
    "number": 41,
    "title": "CORS란 무엇인가요?",
    "categoryId": "network-http",
    "category": "네트워크, HTTP와 웹 인프라",
    "order": 51,
    "sourceUrl": "https://github.com/maeil-mail/maeil-mail-contents/blob/main/backend/contents/be-41.md"
  },
  {
    "id": "be-42",
    "number": 42,
    "title": "리버스 프록시와 포워드 프록시의 차이점에 대해 설명해주세요.",
    "categoryId": "network-http",
    "category": "네트워크, HTTP와 웹 인프라",
    "order": 52,
    "sourceUrl": "https://github.com/maeil-mail/maeil-mail-contents/blob/main/backend/contents/be-42.md"
  },
  {
    "id": "be-44",
    "number": 44,
    "title": "Connection Timeout, Socket Timeout, Read Timeout의 차이점은 무엇인가요?",
    "categoryId": "network-http",
    "category": "네트워크, HTTP와 웹 인프라",
    "order": 53,
    "sourceUrl": "https://github.com/maeil-mail/maeil-mail-contents/blob/main/backend/contents/be-44.md"
  },
  {
    "id": "be-45",
    "number": 45,
    "title": "서버 사이드 렌더링과 클라이언트 사이드 렌더링의 차이점은 무엇인가요?",
    "categoryId": "network-http",
    "category": "네트워크, HTTP와 웹 인프라",
    "order": 54,
    "sourceUrl": "https://github.com/maeil-mail/maeil-mail-contents/blob/main/backend/contents/be-45.md"
  },
  {
    "id": "be-47",
    "number": 47,
    "title": "WAS와 웹 서버의 차이점은 무엇인가요?",
    "categoryId": "network-http",
    "category": "네트워크, HTTP와 웹 인프라",
    "order": 55,
    "sourceUrl": "https://github.com/maeil-mail/maeil-mail-contents/blob/main/backend/contents/be-47.md"
  },
  {
    "id": "be-48",
    "number": 48,
    "title": "HTTPS에 대해서 설명해주세요.",
    "categoryId": "network-http",
    "category": "네트워크, HTTP와 웹 인프라",
    "order": 56,
    "sourceUrl": "https://github.com/maeil-mail/maeil-mail-contents/blob/main/backend/contents/be-48.md"
  },
  {
    "id": "be-52",
    "number": 52,
    "title": "다중 서버 환경에서 세션 기반 인증 방식을 사용하는 경우 발생할 수 있는 문제점은 무엇인가요?",
    "categoryId": "network-http",
    "category": "네트워크, HTTP와 웹 인프라",
    "order": 57,
    "sourceUrl": "https://github.com/maeil-mail/maeil-mail-contents/blob/main/backend/contents/be-52.md"
  },
  {
    "id": "be-53",
    "number": 53,
    "title": "로드 밸런싱에 대해서 설명해주세요.",
    "categoryId": "network-http",
    "category": "네트워크, HTTP와 웹 인프라",
    "order": 58,
    "sourceUrl": "https://github.com/maeil-mail/maeil-mail-contents/blob/main/backend/contents/be-53.md"
  },
  {
    "id": "be-56",
    "number": 56,
    "title": "REST란 무엇인가요?",
    "categoryId": "network-http",
    "category": "네트워크, HTTP와 웹 인프라",
    "order": 59,
    "sourceUrl": "https://github.com/maeil-mail/maeil-mail-contents/blob/main/backend/contents/be-56.md"
  },
  {
    "id": "be-58",
    "number": 58,
    "title": "스케일 아웃과 스케일 업의 차이점을 설명해주세요.",
    "categoryId": "network-http",
    "category": "네트워크, HTTP와 웹 인프라",
    "order": 60,
    "sourceUrl": "https://github.com/maeil-mail/maeil-mail-contents/blob/main/backend/contents/be-58.md"
  },
  {
    "id": "be-60",
    "number": 60,
    "title": "HTTP/1.1과  HTTP/2.0에 대해서 설명해주세요.",
    "categoryId": "network-http",
    "category": "네트워크, HTTP와 웹 인프라",
    "order": 61,
    "sourceUrl": "https://github.com/maeil-mail/maeil-mail-contents/blob/main/backend/contents/be-60.md"
  },
  {
    "id": "be-72",
    "number": 72,
    "title": "URI, URL, URN의 차이점은 무엇인가요?",
    "categoryId": "network-http",
    "category": "네트워크, HTTP와 웹 인프라",
    "order": 62,
    "sourceUrl": "https://github.com/maeil-mail/maeil-mail-contents/blob/main/backend/contents/be-72.md"
  },
  {
    "id": "be-78",
    "number": 78,
    "title": "클래스풀 IP 주소 체계에 대해서 설명해주세요.",
    "categoryId": "network-http",
    "category": "네트워크, HTTP와 웹 인프라",
    "order": 63,
    "sourceUrl": "https://github.com/maeil-mail/maeil-mail-contents/blob/main/backend/contents/be-78.md"
  },
  {
    "id": "be-81",
    "number": 81,
    "title": "NAT 기능을 사용하는 이유를 알고 계신가요?",
    "categoryId": "network-http",
    "category": "네트워크, HTTP와 웹 인프라",
    "order": 64,
    "sourceUrl": "https://github.com/maeil-mail/maeil-mail-contents/blob/main/backend/contents/be-81.md"
  },
  {
    "id": "be-85",
    "number": 85,
    "title": "단일 장애 지점(SPOF)이란 무엇인가요?",
    "categoryId": "network-http",
    "category": "네트워크, HTTP와 웹 인프라",
    "order": 65,
    "sourceUrl": "https://github.com/maeil-mail/maeil-mail-contents/blob/main/backend/contents/be-85.md"
  },
  {
    "id": "be-86",
    "number": 86,
    "title": "정적 IP 주소 할당 방식과 동적 IP 주소 할당 방식의 차이점을 설명해주세요.",
    "categoryId": "network-http",
    "category": "네트워크, HTTP와 웹 인프라",
    "order": 66,
    "sourceUrl": "https://github.com/maeil-mail/maeil-mail-contents/blob/main/backend/contents/be-86.md"
  },
  {
    "id": "be-100",
    "number": 100,
    "title": "DNS란 무엇인가요?",
    "categoryId": "network-http",
    "category": "네트워크, HTTP와 웹 인프라",
    "order": 67,
    "sourceUrl": "https://github.com/maeil-mail/maeil-mail-contents/blob/main/backend/contents/be-100.md"
  },
  {
    "id": "be-103",
    "number": 103,
    "title": "CDN이란 무엇인가요?",
    "categoryId": "network-http",
    "category": "네트워크, HTTP와 웹 인프라",
    "order": 68,
    "sourceUrl": "https://github.com/maeil-mail/maeil-mail-contents/blob/main/backend/contents/be-103.md"
  },
  {
    "id": "be-107",
    "number": 107,
    "title": "네트워크에서 회선 교환 방식과 패킷 교환 방식은 어떤 차이점 있나요?",
    "categoryId": "network-http",
    "category": "네트워크, HTTP와 웹 인프라",
    "order": 69,
    "sourceUrl": "https://github.com/maeil-mail/maeil-mail-contents/blob/main/backend/contents/be-107.md"
  },
  {
    "id": "be-114",
    "number": 114,
    "title": "Keep Alive에 대해 설명해 주세요.",
    "categoryId": "network-http",
    "category": "네트워크, HTTP와 웹 인프라",
    "order": 70,
    "sourceUrl": "https://github.com/maeil-mail/maeil-mail-contents/blob/main/backend/contents/be-114.md"
  },
  {
    "id": "be-148",
    "number": 148,
    "title": "쿠키와 세션의 차이에 대해서 설명해주세요.",
    "categoryId": "network-http",
    "category": "네트워크, HTTP와 웹 인프라",
    "order": 71,
    "sourceUrl": "https://github.com/maeil-mail/maeil-mail-contents/blob/main/backend/contents/be-148.md"
  },
  {
    "id": "be-2",
    "number": 2,
    "title": "RAID 기술에 대해서 설명해주세요.",
    "categoryId": "distributed-cache",
    "category": "분산 시스템, 캐시와 운영 인프라",
    "order": 72,
    "sourceUrl": "https://github.com/maeil-mail/maeil-mail-contents/blob/main/backend/contents/be-2.md"
  },
  {
    "id": "be-55",
    "number": 55,
    "title": "캐싱 전략에 대해서 설명해주세요.",
    "categoryId": "distributed-cache",
    "category": "분산 시스템, 캐시와 운영 인프라",
    "order": 73,
    "sourceUrl": "https://github.com/maeil-mail/maeil-mail-contents/blob/main/backend/contents/be-55.md"
  },
  {
    "id": "be-62",
    "number": 62,
    "title": "캐시 스탬피드 현상에 대하여 설명해주세요.",
    "categoryId": "distributed-cache",
    "category": "분산 시스템, 캐시와 운영 인프라",
    "order": 74,
    "sourceUrl": "https://github.com/maeil-mail/maeil-mail-contents/blob/main/backend/contents/be-62.md"
  },
  {
    "id": "be-63",
    "number": 63,
    "title": "시스템 간 비동기 연동 방식에는 무엇이 있나요?",
    "categoryId": "distributed-cache",
    "category": "분산 시스템, 캐시와 운영 인프라",
    "order": 75,
    "sourceUrl": "https://github.com/maeil-mail/maeil-mail-contents/blob/main/backend/contents/be-63.md"
  },
  {
    "id": "be-64",
    "number": 64,
    "title": "CAP 정리에 대해서 알고 계신가요?",
    "categoryId": "distributed-cache",
    "category": "분산 시스템, 캐시와 운영 인프라",
    "order": 76,
    "sourceUrl": "https://github.com/maeil-mail/maeil-mail-contents/blob/main/backend/contents/be-64.md"
  },
  {
    "id": "be-66",
    "number": 66,
    "title": "Redis가 싱글 스레드로 만들어진 이유를 설명해주세요.",
    "categoryId": "distributed-cache",
    "category": "분산 시스템, 캐시와 운영 인프라",
    "order": 77,
    "sourceUrl": "https://github.com/maeil-mail/maeil-mail-contents/blob/main/backend/contents/be-66.md"
  },
  {
    "id": "be-83",
    "number": 83,
    "title": "트랜잭셔널 아웃박스 패턴에 대해서 설명해주세요.",
    "categoryId": "distributed-cache",
    "category": "분산 시스템, 캐시와 운영 인프라",
    "order": 78,
    "sourceUrl": "https://github.com/maeil-mail/maeil-mail-contents/blob/main/backend/contents/be-83.md"
  },
  {
    "id": "be-91",
    "number": 91,
    "title": "CI/CD 파이프라인에 대해서 설명해주세요.",
    "categoryId": "distributed-cache",
    "category": "분산 시스템, 캐시와 운영 인프라",
    "order": 79,
    "sourceUrl": "https://github.com/maeil-mail/maeil-mail-contents/blob/main/backend/contents/be-91.md"
  },
  {
    "id": "be-92",
    "number": 92,
    "title": "CQRS 패턴이란 무엇인가요?",
    "categoryId": "distributed-cache",
    "category": "분산 시스템, 캐시와 운영 인프라",
    "order": 80,
    "sourceUrl": "https://github.com/maeil-mail/maeil-mail-contents/blob/main/backend/contents/be-92.md"
  },
  {
    "id": "be-93",
    "number": 93,
    "title": "Graceful Shutdown의 필요성에 대해서 설명해주세요.",
    "categoryId": "distributed-cache",
    "category": "분산 시스템, 캐시와 운영 인프라",
    "order": 81,
    "sourceUrl": "https://github.com/maeil-mail/maeil-mail-contents/blob/main/backend/contents/be-93.md"
  },
  {
    "id": "be-95",
    "number": 95,
    "title": "분산 환경에서 Redis를 활용한 잠금은 어떻게 구현할 수 있나요?",
    "categoryId": "distributed-cache",
    "category": "분산 시스템, 캐시와 운영 인프라",
    "order": 82,
    "sourceUrl": "https://github.com/maeil-mail/maeil-mail-contents/blob/main/backend/contents/be-95.md"
  },
  {
    "id": "be-96",
    "number": 96,
    "title": "무중단 배포가 무엇인가요?",
    "categoryId": "distributed-cache",
    "category": "분산 시스템, 캐시와 운영 인프라",
    "order": 83,
    "sourceUrl": "https://github.com/maeil-mail/maeil-mail-contents/blob/main/backend/contents/be-96.md"
  },
  {
    "id": "be-109",
    "number": 109,
    "title": "Infrastructure as Code(IaC)에 대해 설명해 주세요.",
    "categoryId": "distributed-cache",
    "category": "분산 시스템, 캐시와 운영 인프라",
    "order": 84,
    "sourceUrl": "https://github.com/maeil-mail/maeil-mail-contents/blob/main/backend/contents/be-109.md"
  },
  {
    "id": "be-130",
    "number": 130,
    "title": "서버리스란 무엇인가요?",
    "categoryId": "distributed-cache",
    "category": "분산 시스템, 캐시와 운영 인프라",
    "order": 85,
    "sourceUrl": "https://github.com/maeil-mail/maeil-mail-contents/blob/main/backend/contents/be-130.md"
  },
  {
    "id": "be-141",
    "number": 141,
    "title": "최종적 일관성이란 무엇인가요?",
    "categoryId": "distributed-cache",
    "category": "분산 시스템, 캐시와 운영 인프라",
    "order": 86,
    "sourceUrl": "https://github.com/maeil-mail/maeil-mail-contents/blob/main/backend/contents/be-141.md"
  },
  {
    "id": "be-144",
    "number": 144,
    "title": "이벤트 소싱이란 무엇인가요?",
    "categoryId": "distributed-cache",
    "category": "분산 시스템, 캐시와 운영 인프라",
    "order": 87,
    "sourceUrl": "https://github.com/maeil-mail/maeil-mail-contents/blob/main/backend/contents/be-144.md"
  },
  {
    "id": "be-152",
    "number": 152,
    "title": "헬스체크에 대해서 설명해 주세요.",
    "categoryId": "distributed-cache",
    "category": "분산 시스템, 캐시와 운영 인프라",
    "order": 88,
    "sourceUrl": "https://github.com/maeil-mail/maeil-mail-contents/blob/main/backend/contents/be-152.md"
  },
  {
    "id": "be-32",
    "number": 32,
    "title": "동기와 비동기의 차이점은 무엇인가요?",
    "categoryId": "os-concurrency",
    "category": "운영체제, 동시성과 런타임",
    "order": 89,
    "sourceUrl": "https://github.com/maeil-mail/maeil-mail-contents/blob/main/backend/contents/be-32.md"
  },
  {
    "id": "be-33",
    "number": 33,
    "title": "공유 락과 배타 락에 대해서 설명해주세요.",
    "categoryId": "os-concurrency",
    "category": "운영체제, 동시성과 런타임",
    "order": 90,
    "sourceUrl": "https://github.com/maeil-mail/maeil-mail-contents/blob/main/backend/contents/be-33.md"
  },
  {
    "id": "be-35",
    "number": 35,
    "title": "스레드, 프로세스, 코어의 수는 많을수록 좋을까요?",
    "categoryId": "os-concurrency",
    "category": "운영체제, 동시성과 런타임",
    "order": 91,
    "sourceUrl": "https://github.com/maeil-mail/maeil-mail-contents/blob/main/backend/contents/be-35.md"
  },
  {
    "id": "be-54",
    "number": 54,
    "title": "동시성과 병렬성에 대해서 설명해주세요.",
    "categoryId": "os-concurrency",
    "category": "운영체제, 동시성과 런타임",
    "order": 92,
    "sourceUrl": "https://github.com/maeil-mail/maeil-mail-contents/blob/main/backend/contents/be-54.md"
  },
  {
    "id": "be-59",
    "number": 59,
    "title": "프로세스보다 스레드의 컨텍스트 스위칭이 더 빠른 이유는 무엇인가요?",
    "categoryId": "os-concurrency",
    "category": "운영체제, 동시성과 런타임",
    "order": 93,
    "sourceUrl": "https://github.com/maeil-mail/maeil-mail-contents/blob/main/backend/contents/be-59.md"
  },
  {
    "id": "be-67",
    "number": 67,
    "title": "교착 상태에 대해서 설명해주세요.",
    "categoryId": "os-concurrency",
    "category": "운영체제, 동시성과 런타임",
    "order": 94,
    "sourceUrl": "https://github.com/maeil-mail/maeil-mail-contents/blob/main/backend/contents/be-67.md"
  },
  {
    "id": "be-71",
    "number": 71,
    "title": "디스크 접근 시간에 대해서 설명해주세요.",
    "categoryId": "os-concurrency",
    "category": "운영체제, 동시성과 런타임",
    "order": 95,
    "sourceUrl": "https://github.com/maeil-mail/maeil-mail-contents/blob/main/backend/contents/be-71.md"
  },
  {
    "id": "be-73",
    "number": 73,
    "title": "CPU 스케줄링에 대해서 설명해주세요.",
    "categoryId": "os-concurrency",
    "category": "운영체제, 동시성과 런타임",
    "order": 96,
    "sourceUrl": "https://github.com/maeil-mail/maeil-mail-contents/blob/main/backend/contents/be-73.md"
  },
  {
    "id": "be-74",
    "number": 74,
    "title": "시스템 콜이란 무엇인가요?",
    "categoryId": "os-concurrency",
    "category": "운영체제, 동시성과 런타임",
    "order": 97,
    "sourceUrl": "https://github.com/maeil-mail/maeil-mail-contents/blob/main/backend/contents/be-74.md"
  },
  {
    "id": "be-75",
    "number": 75,
    "title": "JVM에서 GC 대상 객체를 판단하는 기준은 무엇인가요?",
    "categoryId": "os-concurrency",
    "category": "운영체제, 동시성과 런타임",
    "order": 98,
    "sourceUrl": "https://github.com/maeil-mail/maeil-mail-contents/blob/main/backend/contents/be-75.md"
  },
  {
    "id": "be-99",
    "number": 99,
    "title": "연속 메모리 할당 기법에 대해서 설명해주세요.",
    "categoryId": "os-concurrency",
    "category": "운영체제, 동시성과 런타임",
    "order": 99,
    "sourceUrl": "https://github.com/maeil-mail/maeil-mail-contents/blob/main/backend/contents/be-99.md"
  },
  {
    "id": "be-101",
    "number": 101,
    "title": "동시성 문제 중 경쟁 상태를 해결하려면 무엇이 보장되어야 하나요?",
    "categoryId": "os-concurrency",
    "category": "운영체제, 동시성과 런타임",
    "order": 100,
    "sourceUrl": "https://github.com/maeil-mail/maeil-mail-contents/blob/main/backend/contents/be-101.md"
  },
  {
    "id": "be-115",
    "number": 115,
    "title": "단일 프로세스 시스템에 대해서 설명해주세요.",
    "categoryId": "os-concurrency",
    "category": "운영체제, 동시성과 런타임",
    "order": 101,
    "sourceUrl": "https://github.com/maeil-mail/maeil-mail-contents/blob/main/backend/contents/be-115.md"
  },
  {
    "id": "be-116",
    "number": 116,
    "title": "멀티 태스킹 시스템의 한계에 대해서 설명해주세요.",
    "categoryId": "os-concurrency",
    "category": "운영체제, 동시성과 런타임",
    "order": 102,
    "sourceUrl": "https://github.com/maeil-mail/maeil-mail-contents/blob/main/backend/contents/be-116.md"
  },
  {
    "id": "be-118",
    "number": 118,
    "title": "가상화에 대해 설명해 주세요.",
    "categoryId": "os-concurrency",
    "category": "운영체제, 동시성과 런타임",
    "order": 103,
    "sourceUrl": "https://github.com/maeil-mail/maeil-mail-contents/blob/main/backend/contents/be-118.md"
  },
  {
    "id": "be-122",
    "number": 122,
    "title": "멀티 쓰레딩에 대해서 설명해 주세요.",
    "categoryId": "os-concurrency",
    "category": "운영체제, 동시성과 런타임",
    "order": 104,
    "sourceUrl": "https://github.com/maeil-mail/maeil-mail-contents/blob/main/backend/contents/be-122.md"
  },
  {
    "id": "be-124",
    "number": 124,
    "title": "GC 알고리즘은 어떤 것이 있나요?",
    "categoryId": "os-concurrency",
    "category": "운영체제, 동시성과 런타임",
    "order": 105,
    "sourceUrl": "https://github.com/maeil-mail/maeil-mail-contents/blob/main/backend/contents/be-124.md"
  },
  {
    "id": "be-125",
    "number": 125,
    "title": "페이지 교체 알고리즘에 대해서 설명해 주세요.",
    "categoryId": "os-concurrency",
    "category": "운영체제, 동시성과 런타임",
    "order": 106,
    "sourceUrl": "https://github.com/maeil-mail/maeil-mail-contents/blob/main/backend/contents/be-125.md"
  },
  {
    "id": "be-133",
    "number": 133,
    "title": "ThreadLocal에 대해 설명해 주세요.",
    "categoryId": "os-concurrency",
    "category": "운영체제, 동시성과 런타임",
    "order": 107,
    "sourceUrl": "https://github.com/maeil-mail/maeil-mail-contents/blob/main/backend/contents/be-133.md"
  },
  {
    "id": "be-134",
    "number": 134,
    "title": "스레드 풀 포화 정책이란 무엇인가요?",
    "categoryId": "os-concurrency",
    "category": "운영체제, 동시성과 런타임",
    "order": 108,
    "sourceUrl": "https://github.com/maeil-mail/maeil-mail-contents/blob/main/backend/contents/be-134.md"
  },
  {
    "id": "be-145",
    "number": 145,
    "title": "참조 지역성의 원리란 무엇인가요?",
    "categoryId": "os-concurrency",
    "category": "운영체제, 동시성과 런타임",
    "order": 109,
    "sourceUrl": "https://github.com/maeil-mail/maeil-mail-contents/blob/main/backend/contents/be-145.md"
  },
  {
    "id": "be-147",
    "number": 147,
    "title": "명령어 파이프라이닝에 대해서 설명해 주세요.",
    "categoryId": "os-concurrency",
    "category": "운영체제, 동시성과 런타임",
    "order": 110,
    "sourceUrl": "https://github.com/maeil-mail/maeil-mail-contents/blob/main/backend/contents/be-147.md"
  },
  {
    "id": "be-149",
    "number": 149,
    "title": "어떤 이유로  코루틴을 사용한 작업 처리가 기존 스레드 방식보다 가벼운지 설명해주세요.",
    "categoryId": "os-concurrency",
    "category": "운영체제, 동시성과 런타임",
    "order": 111,
    "sourceUrl": "https://github.com/maeil-mail/maeil-mail-contents/blob/main/backend/contents/be-149.md"
  },
  {
    "id": "be-20",
    "number": 20,
    "title": "자바에서 Checked Exception과 Unchecked Exception에 대해서 설명해주세요.",
    "categoryId": "java-language",
    "category": "자바 언어, 컬렉션과 자료구조",
    "order": 112,
    "sourceUrl": "https://github.com/maeil-mail/maeil-mail-contents/blob/main/backend/contents/be-20.md"
  },
  {
    "id": "be-21",
    "number": 21,
    "title": "일급 컬렉션이 무엇인가요?",
    "categoryId": "java-language",
    "category": "자바 언어, 컬렉션과 자료구조",
    "order": 113,
    "sourceUrl": "https://github.com/maeil-mail/maeil-mail-contents/blob/main/backend/contents/be-21.md"
  },
  {
    "id": "be-24",
    "number": 24,
    "title": "얕은 복사와 깊은 복사에 대해서 설명해주세요.",
    "categoryId": "java-language",
    "category": "자바 언어, 컬렉션과 자료구조",
    "order": 114,
    "sourceUrl": "https://github.com/maeil-mail/maeil-mail-contents/blob/main/backend/contents/be-24.md"
  },
  {
    "id": "be-27",
    "number": 27,
    "title": "equals와 hashCode는 왜 함께 재정의해야 할까요?",
    "categoryId": "java-language",
    "category": "자바 언어, 컬렉션과 자료구조",
    "order": 115,
    "sourceUrl": "https://github.com/maeil-mail/maeil-mail-contents/blob/main/backend/contents/be-27.md"
  },
  {
    "id": "be-28",
    "number": 28,
    "title": "동일성과 동등성에 대해서 설명해주세요.",
    "categoryId": "java-language",
    "category": "자바 언어, 컬렉션과 자료구조",
    "order": 116,
    "sourceUrl": "https://github.com/maeil-mail/maeil-mail-contents/blob/main/backend/contents/be-28.md"
  },
  {
    "id": "be-46",
    "number": 46,
    "title": "자료구조 스택에 대해서 설명해주세요.",
    "categoryId": "java-language",
    "category": "자바 언어, 컬렉션과 자료구조",
    "order": 117,
    "sourceUrl": "https://github.com/maeil-mail/maeil-mail-contents/blob/main/backend/contents/be-46.md"
  },
  {
    "id": "be-68",
    "number": 68,
    "title": "Call By Value와 Call By Reference에 대해서 설명해주세요.",
    "categoryId": "java-language",
    "category": "자바 언어, 컬렉션과 자료구조",
    "order": 118,
    "sourceUrl": "https://github.com/maeil-mail/maeil-mail-contents/blob/main/backend/contents/be-68.md"
  },
  {
    "id": "be-69",
    "number": 69,
    "title": "방어적 복사에 대해서 설명해주세요.",
    "categoryId": "java-language",
    "category": "자바 언어, 컬렉션과 자료구조",
    "order": 119,
    "sourceUrl": "https://github.com/maeil-mail/maeil-mail-contents/blob/main/backend/contents/be-69.md"
  },
  {
    "id": "be-70",
    "number": 70,
    "title": "해시 충돌에 대해서 설명해주세요.",
    "categoryId": "java-language",
    "category": "자바 언어, 컬렉션과 자료구조",
    "order": 120,
    "sourceUrl": "https://github.com/maeil-mail/maeil-mail-contents/blob/main/backend/contents/be-70.md"
  },
  {
    "id": "be-79",
    "number": 79,
    "title": "함수형 프로그래밍에 대해서 설명해주세요.",
    "categoryId": "java-language",
    "category": "자바 언어, 컬렉션과 자료구조",
    "order": 121,
    "sourceUrl": "https://github.com/maeil-mail/maeil-mail-contents/blob/main/backend/contents/be-79.md"
  },
  {
    "id": "be-80",
    "number": 80,
    "title": "연결 리스트에 대해서 설명해주세요.",
    "categoryId": "java-language",
    "category": "자바 언어, 컬렉션과 자료구조",
    "order": 122,
    "sourceUrl": "https://github.com/maeil-mail/maeil-mail-contents/blob/main/backend/contents/be-80.md"
  },
  {
    "id": "be-98",
    "number": 98,
    "title": "자바에서 클래스 정보는 어떻게 알아낼 수 있나요?",
    "categoryId": "java-language",
    "category": "자바 언어, 컬렉션과 자료구조",
    "order": 123,
    "sourceUrl": "https://github.com/maeil-mail/maeil-mail-contents/blob/main/backend/contents/be-98.md"
  },
  {
    "id": "be-104",
    "number": 104,
    "title": "시간 복잡도와 공간 복잡도의 차이점은 무엇인가요?",
    "categoryId": "java-language",
    "category": "자바 언어, 컬렉션과 자료구조",
    "order": 124,
    "sourceUrl": "https://github.com/maeil-mail/maeil-mail-contents/blob/main/backend/contents/be-104.md"
  },
  {
    "id": "be-106",
    "number": 106,
    "title": "try-with-resources에 대해 설명해 주세요.",
    "categoryId": "java-language",
    "category": "자바 언어, 컬렉션과 자료구조",
    "order": 125,
    "sourceUrl": "https://github.com/maeil-mail/maeil-mail-contents/blob/main/backend/contents/be-106.md"
  },
  {
    "id": "be-108",
    "number": 108,
    "title": "String 객체는 가변일까요, 불변일까요? 그렇게 생각하신 이유도 함께 설명해 주세요.",
    "categoryId": "java-language",
    "category": "자바 언어, 컬렉션과 자료구조",
    "order": 126,
    "sourceUrl": "https://github.com/maeil-mail/maeil-mail-contents/blob/main/backend/contents/be-108.md"
  },
  {
    "id": "be-111",
    "number": 111,
    "title": "자바에서 Object 타입인 value를 String으로 타입 캐스팅하는 것과 String.valueOf()를 사용하는 것의 차이점은 무엇인가요?",
    "categoryId": "java-language",
    "category": "자바 언어, 컬렉션과 자료구조",
    "order": 127,
    "sourceUrl": "https://github.com/maeil-mail/maeil-mail-contents/blob/main/backend/contents/be-111.md"
  },
  {
    "id": "be-112",
    "number": 112,
    "title": "자료구조 트라이에 대해서 설명해주세요.",
    "categoryId": "java-language",
    "category": "자바 언어, 컬렉션과 자료구조",
    "order": 128,
    "sourceUrl": "https://github.com/maeil-mail/maeil-mail-contents/blob/main/backend/contents/be-112.md"
  },
  {
    "id": "be-113",
    "number": 113,
    "title": "자바에서 제네릭의 공변, 반공변, 무공변에 대해 설명해 주세요.",
    "categoryId": "java-language",
    "category": "자바 언어, 컬렉션과 자료구조",
    "order": 129,
    "sourceUrl": "https://github.com/maeil-mail/maeil-mail-contents/blob/main/backend/contents/be-113.md"
  },
  {
    "id": "be-117",
    "number": 117,
    "title": "JCF 자료구조의 초기 용량을 지정하면 좋은 점이 무엇인가요?",
    "categoryId": "java-language",
    "category": "자바 언어, 컬렉션과 자료구조",
    "order": 130,
    "sourceUrl": "https://github.com/maeil-mail/maeil-mail-contents/blob/main/backend/contents/be-117.md"
  },
  {
    "id": "be-119",
    "number": 119,
    "title": "자바 프로그램이 실행되는 흐름을 설명해 주세요.",
    "categoryId": "java-language",
    "category": "자바 언어, 컬렉션과 자료구조",
    "order": 131,
    "sourceUrl": "https://github.com/maeil-mail/maeil-mail-contents/blob/main/backend/contents/be-119.md"
  },
  {
    "id": "be-127",
    "number": 127,
    "title": "이진 트리에 대해서 설명해 주세요.",
    "categoryId": "java-language",
    "category": "자바 언어, 컬렉션과 자료구조",
    "order": 132,
    "sourceUrl": "https://github.com/maeil-mail/maeil-mail-contents/blob/main/backend/contents/be-127.md"
  },
  {
    "id": "be-49",
    "number": 49,
    "title": "Record를 DTO로 사용하는 이유가 뭔가요?",
    "categoryId": "architecture-design",
    "category": "아키텍처, 객체지향과 설계 패턴",
    "order": 133,
    "sourceUrl": "https://github.com/maeil-mail/maeil-mail-contents/blob/main/backend/contents/be-49.md"
  },
  {
    "id": "be-51",
    "number": 51,
    "title": "SOLID 원칙에 대해서 설명해 주세요.",
    "categoryId": "architecture-design",
    "category": "아키텍처, 객체지향과 설계 패턴",
    "order": 134,
    "sourceUrl": "https://github.com/maeil-mail/maeil-mail-contents/blob/main/backend/contents/be-51.md"
  },
  {
    "id": "be-65",
    "number": 65,
    "title": "응집도와 결합도에 대해서 설명해주세요.",
    "categoryId": "architecture-design",
    "category": "아키텍처, 객체지향과 설계 패턴",
    "order": 135,
    "sourceUrl": "https://github.com/maeil-mail/maeil-mail-contents/blob/main/backend/contents/be-65.md"
  },
  {
    "id": "be-87",
    "number": 87,
    "title": "전략 패턴에 대해서 설명해주세요.",
    "categoryId": "architecture-design",
    "category": "아키텍처, 객체지향과 설계 패턴",
    "order": 136,
    "sourceUrl": "https://github.com/maeil-mail/maeil-mail-contents/blob/main/backend/contents/be-87.md"
  },
  {
    "id": "be-128",
    "number": 128,
    "title": "객체 지향 프로그래밍이란 무엇이고, 어떤 특징이 있나요?",
    "categoryId": "architecture-design",
    "category": "아키텍처, 객체지향과 설계 패턴",
    "order": 137,
    "sourceUrl": "https://github.com/maeil-mail/maeil-mail-contents/blob/main/backend/contents/be-128.md"
  },
  {
    "id": "be-129",
    "number": 129,
    "title": "널 오브젝트 패턴이란 무엇인가요?",
    "categoryId": "architecture-design",
    "category": "아키텍처, 객체지향과 설계 패턴",
    "order": 138,
    "sourceUrl": "https://github.com/maeil-mail/maeil-mail-contents/blob/main/backend/contents/be-129.md"
  },
  {
    "id": "be-132",
    "number": 132,
    "title": "Gradle에 대해 설명해 주세요.",
    "categoryId": "architecture-design",
    "category": "아키텍처, 객체지향과 설계 패턴",
    "order": 139,
    "sourceUrl": "https://github.com/maeil-mail/maeil-mail-contents/blob/main/backend/contents/be-132.md"
  },
  {
    "id": "be-137",
    "number": 137,
    "title": "템플릿 메서드 패턴이란 무엇인가요?",
    "categoryId": "architecture-design",
    "category": "아키텍처, 객체지향과 설계 패턴",
    "order": 140,
    "sourceUrl": "https://github.com/maeil-mail/maeil-mail-contents/blob/main/backend/contents/be-137.md"
  },
  {
    "id": "be-150",
    "number": 150,
    "title": "싱글턴 패턴이란 무엇인가요?",
    "categoryId": "architecture-design",
    "category": "아키텍처, 객체지향과 설계 패턴",
    "order": 141,
    "sourceUrl": "https://github.com/maeil-mail/maeil-mail-contents/blob/main/backend/contents/be-150.md"
  },
  {
    "id": "be-25",
    "number": 25,
    "title": "로그와 메트릭을 설명해주세요.",
    "categoryId": "test-security",
    "category": "테스트, 보안과 관측 가능성",
    "order": 142,
    "sourceUrl": "https://github.com/maeil-mail/maeil-mail-contents/blob/main/backend/contents/be-25.md"
  },
  {
    "id": "be-34",
    "number": 34,
    "title": "단위 테스트와 통합 테스트의 차이점은 무엇인가요?",
    "categoryId": "test-security",
    "category": "테스트, 보안과 관측 가능성",
    "order": 143,
    "sourceUrl": "https://github.com/maeil-mail/maeil-mail-contents/blob/main/backend/contents/be-34.md"
  },
  {
    "id": "be-76",
    "number": 76,
    "title": "테스트 주도 개발이 무엇인가요?",
    "categoryId": "test-security",
    "category": "테스트, 보안과 관측 가능성",
    "order": 144,
    "sourceUrl": "https://github.com/maeil-mail/maeil-mail-contents/blob/main/backend/contents/be-76.md"
  },
  {
    "id": "be-77",
    "number": 77,
    "title": "대칭키 및 비대칭키 암호화 방식에 대해서 설명해주세요.",
    "categoryId": "test-security",
    "category": "테스트, 보안과 관측 가능성",
    "order": 145,
    "sourceUrl": "https://github.com/maeil-mail/maeil-mail-contents/blob/main/backend/contents/be-77.md"
  },
  {
    "id": "be-82",
    "number": 82,
    "title": "CSRF 공격에 대해서 설명해주세요.",
    "categoryId": "test-security",
    "category": "테스트, 보안과 관측 가능성",
    "order": 146,
    "sourceUrl": "https://github.com/maeil-mail/maeil-mail-contents/blob/main/backend/contents/be-82.md"
  },
  {
    "id": "be-84",
    "number": 84,
    "title": "JWT 특징과 주의 사항을 설명해주세요.",
    "categoryId": "test-security",
    "category": "테스트, 보안과 관측 가능성",
    "order": 147,
    "sourceUrl": "https://github.com/maeil-mail/maeil-mail-contents/blob/main/backend/contents/be-84.md"
  },
  {
    "id": "be-90",
    "number": 90,
    "title": "코드 커버리지에 대해서 설명해주세요.",
    "categoryId": "test-security",
    "category": "테스트, 보안과 관측 가능성",
    "order": 148,
    "sourceUrl": "https://github.com/maeil-mail/maeil-mail-contents/blob/main/backend/contents/be-90.md"
  },
  {
    "id": "be-97",
    "number": 97,
    "title": "테스트 더블에 대해서 설명해주세요.",
    "categoryId": "test-security",
    "category": "테스트, 보안과 관측 가능성",
    "order": 149,
    "sourceUrl": "https://github.com/maeil-mail/maeil-mail-contents/blob/main/backend/contents/be-97.md"
  },
  {
    "id": "be-105",
    "number": 105,
    "title": "Micrometer가 무엇인지 설명해주세요.",
    "categoryId": "test-security",
    "category": "테스트, 보안과 관측 가능성",
    "order": 150,
    "sourceUrl": "https://github.com/maeil-mail/maeil-mail-contents/blob/main/backend/contents/be-105.md"
  },
  {
    "id": "be-139",
    "number": 139,
    "title": "테스트 격리란 무엇인가요?",
    "categoryId": "test-security",
    "category": "테스트, 보안과 관측 가능성",
    "order": 151,
    "sourceUrl": "https://github.com/maeil-mail/maeil-mail-contents/blob/main/backend/contents/be-139.md"
  },
  {
    "id": "be-140",
    "number": 140,
    "title": "SQL 인젝션에 대해 설명해 주세요.",
    "categoryId": "test-security",
    "category": "테스트, 보안과 관측 가능성",
    "order": 152,
    "sourceUrl": "https://github.com/maeil-mail/maeil-mail-contents/blob/main/backend/contents/be-140.md"
  }
]);

export const INTERVIEW_QUESTION_BY_ID = new Map(INTERVIEW_QUESTIONS.map((question) => [question.id, question]));

export function getInterviewQuestion(id) {
  return INTERVIEW_QUESTION_BY_ID.get(id) ?? null;
}
