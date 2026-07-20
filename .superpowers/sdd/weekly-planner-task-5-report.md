# 주간 플래너 Task 5 구현 보고서

## 결과

- 상태: 완료
- 작업 기준: `1014aa8` (`fix: 레거시 데일리 스냅샷 출처 통일`)
- 주간 계획 자체는 집계하지 않고 `job-prep-routine:daily:${YYYY-MM-DD}` 7개만 읽도록 구현했다.
- 주간 일정 행은 체크박스 없이 데일리 실행에 따라 `예정`, `완료`, `기록 없음`, `계획 변경 대기`를 표시하며 미배치 행은 `시간 부족`을 유지한다.
- `storage`, `focus`, `pageshow`에서 상단 진척과 선택 요일 상태를 다시 그리고 `destroy()`에서 리스너를 해제한다.

## RED

### 단위 테스트

- 명령: `node --test tests/daily-plan-core.test.mjs tests/weekly-app.test.mjs`
- 결과: 실패, 6개 중 4개 통과·2개 실패
- 기대한 실패 이유:
  - `daily-plan-core.js`가 `calculateWeeklyExecutionProgress`를 export하지 않았다.
  - `weekly-app.js`가 `resolveWeeklyRowState`를 제공하지 않았다.

### 실제 Chrome 회귀 테스트

- 명령: `node --test tests/weekly-browser.test.mjs`
- 결과: 실패, 2개 중 1개 통과·1개 실패
- 기대한 실패 이유:
  - 데일리 키를 변경하고 `storage` 이벤트를 보내도 지원 수치와 progressbar가 `0`에 머물렀다.
  - 계획 행이 `예정`에서 `완료`로 바뀌지 않았고 실행 상태 데이터도 없었다.

## 구현

- `daily-plan-core.js`
  - 로컬 정오 기준 날짜 덧셈으로 연말을 포함한 7일 키를 생성한다.
  - 손상 JSON을 빈 객체로 처리한다.
  - 지원·숙지·면접·운동·러닝과 학습 6개 주제를 데일리 실행 요약으로 합산한다.
- `weekly-app.js`
  - 상단 숫자, 지원 progressbar의 `aria-valuenow`, 막대 폭을 함께 갱신한다.
  - 선택 날짜의 데일리 state, 체크 ID, 실행 입력, 계획 revision으로 읽기 전용 행 상태를 계산한다.
  - 고정 행도 실행 상태 배지를 사용하되 고정 배치 스타일과 이동 불가 동작은 유지한다.
  - 창 이벤트 갱신과 `destroy()` 정리를 추가한다.
- `assets/routine.css`
  - 완료, 기록 없음, 계획 변경 대기 상태 배지 색상을 추가했다.

## GREEN 및 검증

- focused 단위 GREEN
  - 명령: `node --test tests/daily-plan-core.test.mjs tests/weekly-app.test.mjs`
  - 결과: 14/14 통과
- focused + 실제 Chrome GREEN
  - 명령: `node --test tests/daily-plan-core.test.mjs tests/weekly-app.test.mjs tests/weekly-browser.test.mjs`
  - 결과: 16/16 통과
  - 기존 플래너의 추가·재배치·시간 편집·미배치 저장·복원과 신규 데일리 연동 흐름을 함께 검증했다.
  - 데일리 키 변경 후 `storage`, `focus`, `pageshow`를 각각 발생시켜 숫자, progressbar, 완료 상태, 계획 변경 대기 상태, 체크박스 부재를 확인했다.
- 정적 검사
  - 명령: `npm run check`
  - 결과: 성공
- 전체 테스트
  - 명령: `npm test`
  - 결과: 115/115 통과, 실패 0
- diff 검사
  - 명령: `git diff --check`
  - 결과: 성공

## 자체검토

- 집계 함수는 weekly 키를 생성하거나 읽지 않으며 요청 주의 daily 키만 정확히 7개 순회한다.
- 연말 주간, 손상 JSON, 다음 주 데이터 제외, 빈 집계의 학습 6개 키를 테스트했다.
- 주간 행에는 실행 입력 요소를 추가하지 않았고 데일리 저장값을 수정하지 않는다.
- 기존 8787 서버, `outputs` 런타임, 로그인·배포 코드는 변경하지 않았다.
- `storage`, `focus`, `pageshow` 리스너는 `pageDocument.defaultView`에 연결하고 같은 함수 참조로 해제한다.

## 우려

- 없음. 명령 실행 시 로컬 `jenv` 갱신 경고가 출력되지만 프로젝트 검사와 테스트 종료 코드는 모두 0이며 구현 동작과 무관하다.
