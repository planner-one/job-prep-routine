# 주간 플래너 Task 6 구현 보고서

## 결과

- 상태: 완료
- 최초 요청 기준: `8d4e9cc` (`fix: 주간 진척 검토 결함을 수정`)
- 실제 구현 기준: 선행 Task 5 재검토 커밋 `8aac903` (`fix: raw 레거시 학습 완료를 집계`)
- 데일리 `planSnapshot.items`를 기록 일정의 우선 원본으로 사용하고, 분 단위 시간을 기존 UI 계약인 단일 `HH:MM–HH:MM` 문자열로 변환했다.
- 현재 snapshot 완료와 `archivedCompletedItems` 완료를 ID 기준으로 한 번만 보존한다.
- schema v2 주간 상태에서는 `legacyCompletion`만 과거 완료로 읽고 새 `items`·`unscheduled` 계획은 활동으로 집계하지 않는다.
- 기존 public history record 필드와 daily > roadmap > legacy weekly 완료율 우선순위를 유지했다.

## RED

- 명령: `node --test tests/history-core.test.mjs tests/history-app.test.mjs tests/history-contract.test.mjs`
- 결과: 23개 중 18개 통과·5개 실패
- 기대한 실패 이유:
  - 사용자 snapshot 일정과 revision 없는 호환 snapshot 대신 `getSchedule()`을 재구성해 완료 일정이 비었다.
  - `archivedCompletedItems`를 읽지 않아 현재·이전 계획 완료 병합 결과가 비었다.
  - schema v2의 `legacyCompletion` 대신 제거된 옛 day 필드를 직접 읽어 레거시 면접 완료가 누락됐다.
  - 기본 schema v2 계획에 완료 활동이 없어도 `completion.source`를 `weekly`로 지정했다.

## 구현

- snapshot 항목의 ID·이름·카테고리·0~1440분 범위를 방어적으로 검증하고, revision 유무와 무관하게 유효한 `items` 배열을 읽는다.
- snapshot과 archive 일정을 기존 공개 일정 항목 형태인 `id`, `time`, `label`, `category`, `period`로 변환한다.
- snapshot의 체크 완료를 먼저 모은 뒤 archive 완료를 ID 기준으로 합쳐 표시와 완료율 계산에 같은 일정 집합을 사용한다.
- roadmap에는 snapshot 우선 로직을 적용하지 않아 과거 `getSchedule()` 기반 기록 계약을 유지한다.
- raw legacy weekly는 기존 day 완료 필드를 계속 읽고, schema v2는 해당 요일의 `legacyCompletion`만 읽는다.
- 레거시 완료가 실제로 있을 때만 weekly 완료율 fallback을 활성화한다.

## GREEN 및 전체 검증

- focused GREEN
  - 명령: `node --test tests/history-core.test.mjs tests/history-app.test.mjs tests/history-contract.test.mjs`
  - 결과: 23/23 통과, 실패 0
- 정적 검사
  - 명령: `npm run check`
  - 결과: 성공
- 전체 테스트
  - 샌드박스 최초 명령: `npm test`
  - 결과: 로컬 테스트 서버의 `127.0.0.1` bind가 `EPERM`으로 제한되어 126개 중 118개 통과·8개 환경 실패
  - 승인 재실행 명령: `npm test`
  - 결과: 126/126 통과, 실패 0
- diff 검사
  - 명령: `git diff --check`
  - 결과: 성공

## 자체검토

- 기본 v2 주간 상태는 `completion.source: null`, `hasActivity: false`, 빈 `weeklyChecks.completed`를 반환한다.
- normalized v2와 raw legacy fixture는 동일한 레거시 면접·지원·학습 완료 결과를 반환한다.
- 데일리가 있으면 v2 레거시 완료가 있어도 완료율 source는 `daily`를 유지한다.
- revision 없는 snapshot, 사용자 이름, `09:30–10:00` 및 `16:40–17:20` 범위, snapshot/archive 중복 ID를 공개 결과로 검증했다.
- `outputs`, 기존 8787 서버, 로그인·배포 및 Task 6 밖의 런타임 파일은 변경하지 않았다.

## 우려

- 기능상 남은 우려는 없다.
- 로컬 `jenv` 갱신 경고는 모든 명령에서 공통으로 출력되지만 프로젝트 검사 종료 코드에는 영향을 주지 않았다.

## 독립 검토 수정

작업 기준은 `c79dcd3`이며, 독립 검토의 Important 1건과 Minor 1건을 모두 수정했다.

### RED

- 명령: `node --test tests/history-core.test.mjs tests/history-app.test.mjs tests/history-contract.test.mjs`
- 결과: 25개 중 23개 통과·2개 실패
- 기대한 실패 이유:
  - 완료한 snapshot 사용자 학습 일정과 archive 사용자 운동 일정의 `category`를 보지 않아 `metrics.learning`, `metrics.exercise`가 각각 0이었다.
  - snapshot 시작 시각 12:59를 `afternoon`, 18:49를 `evening`으로 분류해 데일리의 13:00/18:50 경계와 달랐다.

### 수정 내용

- daily snapshot/archive의 ID 중복 제거된 실제 완료 목록에서 category 집합을 만들고, `learning`과 `exercise`를 기존 고정 ID 판단에 추가했다.
- category 보강 범위를 daily 완료 목록으로 제한해 과거 roadmap과 legacy weekly의 기존 분석 규칙은 바꾸지 않았다.
- snapshot period의 오전/오후 경계를 780분, 오후/저녁 경계를 1130분으로 바꿔 데일리 렌더와 일치시켰다.
- public record 필드, 완료율 source 우선순위, v1/v2 완료 호환은 유지했다.

### GREEN 및 전체 검증

- focused GREEN
  - 명령: `node --test tests/history-core.test.mjs tests/history-app.test.mjs tests/history-contract.test.mjs`
  - 결과: 25/25 통과, 실패 0
- 정적 검사
  - 명령: `npm run check`
  - 결과: 성공
- 전체 테스트
  - 승인 실행 명령: `npm test`
  - 결과: 128/128 통과, 실패 0
- diff 검사
  - 명령: `git diff --check`
  - 결과: 성공

### 자체검토와 우려

- snapshot 학습 완료와 archive 운동 완료가 기록 metrics뿐 아니라 `summarizeHistory()`의 학습일·운동일에도 반영되는지 공개 API로 검증했다.
- 12:59/13:00과 18:49/18:50 양쪽을 함께 검증해 정확한 경계를 고정했다.
- 기존 8787 서버, `outputs`, 로그인·배포는 변경하지 않았다.
- 기능상 남은 우려는 없다. 로컬 `jenv` 경고는 기존과 같은 환경 메시지이며 검증 종료 코드에는 영향을 주지 않았다.

## 1차 수정 후 재검토 추가 결함 수정

작업 기준은 `cd7e377`이며, 재검토에서 추가된 Important 1건을 수정했다.

### RED

- 명령: `node --test tests/history-core.test.mjs tests/history-app.test.mjs tests/history-contract.test.mjs`
- 결과: 27개 중 26개 통과·1개 실패
- 기대한 실패 이유:
  - `afternoon-break`, `normal-shower`, `normal-sleep`, `maintenance-rest`처럼 기본 회복성 exercise 항목만 완료한 record의 `metrics.exercise`와 `summarizeHistory().exerciseDays`가 1이었다.
- 같은 RED 실행에서 사용자 정의 exercise snapshot/archive와 기존 `workout`/`run` 정방향 계약은 통과해 보존할 동작도 함께 확인했다.

### 수정 내용

- `routine-data.js`의 전체 기본 schedule과 `TASK_LIBRARY`에서 exercise ID 집합을 구성했다.
- daily 완료 항목의 category가 exercise이면서 기본 exercise ID가 아닐 때만 사용자 정의 운동으로 집계한다.
- 기존 `workout`/`run` ID와 legacy weekly activity 판단은 그대로 유지했다.
- 학습 category 보강, public record shape, daily > roadmap > legacy weekly 우선순위와 v1/v2 호환은 변경하지 않았다.

### GREEN 및 전체 검증

- focused GREEN
  - 명령: `node --test tests/history-core.test.mjs tests/history-app.test.mjs tests/history-contract.test.mjs`
  - 결과: 27/27 통과, 실패 0
- 정적 검사
  - 명령: `npm run check`
  - 결과: 성공
- 전체 테스트
  - 승인 실행 명령: `npm test`
  - 결과: 130/130 통과, 실패 0
- diff 검사
  - 명령: `git diff --check`
  - 결과: 성공

### 자체검토와 우려

- 부정 계약은 기본 break, shower, sleep, rest 네 종류를 함께 검증하고, 정방향 계약은 사용자 정의 snapshot/archive와 기존 workout/run을 각각 검증한다.
- snapshot에 저장되지 않는 `source`를 추정하지 않고 공용 기본 데이터의 ID를 기준으로 구분하므로 임의의 안정 ID 사용자 일정도 보존한다.
- 기존 8787 서버, `outputs`, 로그인·배포는 변경하지 않았다.
- 기능상 남은 우려는 없다. 로컬 `jenv` 경고는 기존과 같은 환경 메시지이며 검증 종료 코드에는 영향을 주지 않았다.
