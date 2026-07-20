# 주간 플래너 Task 4 구현 보고서

## 상태

- 데일리 시간표를 현재 주의 해당 요일 계획에서 해석하고, 실행 입력이 생긴 순간 계획 스냅샷을 저장하도록 연결했다.
- 실행 이후 주간 계획 revision이 달라지면 기존 스냅샷을 계속 표시하며 변경 안내를 노출한다.
- `변경 계획 반영`은 최신 계획으로 스냅샷을 교체하고, 동일 ID 체크와 삭제된 완료 항목을 보존한다.
- 운영 유형과 학습 조합은 읽기 전용으로 표시하고, 계획 편집은 `weekly.html` 링크로 이동시켰다.
- 지원 파이프라인, 메모, 기존 `mode`/`runStart`/`learningTopics` 호환 필드를 유지했다.
- 기존 8787 서버와 `output/`은 변경하지 않았다.

## TDD 기록

### RED

명령:

`node --test tests/page-app.test.mjs tests/routine-core.test.mjs tests/daily-contract.test.mjs tests/daily-browser.test.mjs`

일반 샌드박스에서는 실제 브라우저 테스트의 임시 `127.0.0.1` 서버가 `listen EPERM`으로 거부됐다. 같은 명령을 로컬 포트 권한 환경에서 다시 실행해 27개 중 22개 통과, 5개 실패를 확인했다.

- 계약 테스트: `#daily-plan-source`, 읽기 전용 유형·학습 표시, 계획 변경 안내가 없어 실패했다.
- 상태 테스트: `normalizeDailyState()`가 `planSnapshot`과 `archivedCompletedItems`를 반환하지 않아 실패했다.
- 진행률 테스트: 전달한 계획 항목 대신 기존 `getSchedule()`을 사용해 `2 / 34`를 계산하여 기대 `1 / 14`와 달랐다.
- 브라우저 테스트: `#daily-plan-mode`가 없어 주간 계획 소스 확인 단계에서 실패했다.

### GREEN

명령:

`node --test tests/page-app.test.mjs tests/routine-core.test.mjs tests/daily-contract.test.mjs tests/daily-browser.test.mjs`

결과: 27/27 통과, 실패 0개. 실제 headless Chrome에서 다음을 확인했다.

- 주간 키를 먼저 저장한 뒤 데일리에서 계획 순서와 `10:00–10:30` 단일 시간 범위를 표시한다.
- 운영 유형과 `Spring · Redis` 조합은 읽기 전용이며 데일리 편집 입력이 없다.
- 첫 회사 입력 시 revision 3 계획 스냅샷을 저장하고 일정 체크, 지원 파이프라인, 메모를 함께 보존한다.
- 주간 revision 4 저장 후 새로고침하면 기존 스냅샷과 변경 안내를 표시한다.
- 변경 계획 반영 후 동일 ID 체크를 유지하고 삭제된 완료 ID를 `archivedCompletedItems`에 보관한다.
- 초기화는 현재 날짜의 daily 키만 삭제하고 최신 주간 계획을 다시 렌더링한다.

## 구현 및 자체검토

- `renderSchedule()`은 기존 `time` 문자열과 새 `startMinute`/`endMinute` 형식을 모두 지원하며, 분 단위 계획을 오전·오후·저녁·밤 구획에 배치한다.
- `calculateDailyProgress(candidate, scheduleItems)`는 명시된 계획 항목을 우선한다. 두 번째 인자가 없으면 기존 일정과 별도 학습 체크를 사용하는 호환 동작을 유지한다.
- 스냅샷 정규화는 계획 코어의 허용 필드만 저장하며, 삭제 완료 항목은 ID 중복을 제거하고 유효 메타데이터를 보존한다.
- 변경 계획을 강제 반영해도 제거된 완료 ID는 `checkedIds`에서 삭제하지 않아 과거 실행 정보가 손실되지 않는다.
- 주간 계획 자체는 완료 입력이나 생산성 집계로 취급하지 않고, 데일리 일정 체크와 지원 파이프라인만 새 계획 기반 진행률에 반영한다.

## 우려 사항

- 실제 브라우저 테스트는 임시 로컬 HTTP 서버를 사용하므로 샌드박스 밖 로컬 포트 권한이 필요하다.
- 추가 기능상 우려는 자체검토에서 확인되지 않았다.

## 최종 검증

- `npm run check`: 종료 코드 0.
- `git diff --check`: 출력 없음.
- 커밋 직전 전체 `npm test`: 106/106 통과, 실패 0개, 건너뜀 0개.

## 독립 검토 결함 수정

### RED

- `node --test tests/page-app.test.mjs tests/daily-contract.test.mjs`: 12개 중 9개 통과, 3개 실패. 같은 revision의 다른 계획 내용 미감지, 변경 안내 접근성·반영 후 포커스 계약 부재, 제거된 데일리 편집 CSS 잔존을 각각 확인했다.
- `node --test tests/daily-browser.test.mjs`: 실제 headless Chrome에서 2개 중 0개 통과, 2개 실패. 계획 반영 뒤 활성 포커스가 없고, snapshot 없는 기존 daily의 `running`/`22`/`CS`가 첫 저장에서 주간 값으로 덮이는 것을 확인했다. 일반 샌드박스의 `listen EPERM` 뒤 로컬 포트 권한 환경에서 같은 명령으로 동작 RED를 확인했다.

### 수정 내용

- 저장된 snapshot 없는 daily가 실제로 가지고 있던 `mode`, `runStart`, `learningTopics` 필드를 개별 추적해 첫 실행 저장과 snapshot 생성에서도 비손실 보존한다. 새 daily는 기존처럼 현재 주간 계획의 호환 값을 저장하며, 현재 날짜 초기화 뒤에는 이전 호환 값을 다시 사용하지 않는다.
- 계획 변경 판단은 revision뿐 아니라 정규화된 항목의 순서와 `id`·`label`·`category`·시작·종료 분을 필드별로 비교한다. 실제 브라우저 테스트도 같은 revision에서 내용만 달라지는 충돌을 사용한다.
- 변경 안내에 `role="status"`와 `aria-live="polite"`를 추가하고, 반영 완료 뒤 `#schedule-title`로 포커스를 이동한다.
- 더 이상 쓰지 않는 `.mode-button`, `.learning-panel`, `.learning-options`와 관련 반응형·인쇄 스타일을 제거했다.
- 회사 플랫폼과 지원 공고 링크의 저장 및 새로고침 복원 회귀 계약을 실제 브라우저 테스트에 복구했다.

### GREEN

- `node --test tests/page-app.test.mjs tests/daily-contract.test.mjs`: 12/12 통과, 실패 0개.
- `node --test tests/daily-browser.test.mjs`: 실제 headless Chrome 2/2 통과, 실패 0개.
- `node --test tests/page-app.test.mjs tests/routine-core.test.mjs tests/daily-contract.test.mjs tests/daily-browser.test.mjs`: Task 4 focused 31/31 통과, 실패 0개.
- `npm run check`: 종료 코드 0.
- `git diff --check`: 출력 없음.
- 전체 `npm test`: 110/110 통과, 실패 0개, 건너뜀 0개.
