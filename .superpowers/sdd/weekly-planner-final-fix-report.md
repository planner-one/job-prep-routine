# 주간 플래너 최종 리뷰 수정 보고서

기준 HEAD: `dd6747ab9e65374a3b127b33e2a581f463d5499f`

## 수정 범위

- history의 authoritative source를 `daily > roadmap > weekly`로 한 번 선택하고 completion, metrics, mode, isMaintenance에 공통 적용했다.
- 하위 source의 `dailyCompletedSchedule`, `roadmapCompletedSchedule`, `weeklyChecks`, `learningTopics` 상세 호환 정보는 그대로 보존했다.
- plan snapshot의 `weekKey`, `dayId`, `revision`, `items`를 normalize, prepare, apply, JSON 저장 왕복에서 검증·보존했다.
- `weekKey`는 유효한 월요일 날짜, `dayId`는 `mon`부터 `sun`까지로 검증한다. 기존 identity 없는 daily snapshot은 호환 읽기를 유지하고, 명시된 잘못된 identity는 거부한다.
- history의 revision 없는 호환 snapshot은 독립적인 관대한 읽기 경로를 그대로 유지했다.

## TDD 증거

### P2 authoritative source

RED fixture:

- daily에는 완료 없이 메모만 입력했다.
- 같은 날짜의 roadmap에는 러닝·면접·학습 완료를, weekly에는 핵심 유지일 지원·면접·학습 체크를 넣었다.
- 기대값은 daily source, `mode: normal`, `isMaintenance: false`, 네 지표 모두 0이며 하위 상세 필드는 보존되는 것이다.

RED 실행:

- `node --test --test-name-pattern='데일리가 있으면 하위 로드맵과 주간 완료가 지표와 운영 유형을 오염시키지 않는다' tests/history-core.test.mjs`
- 결과: 0/1, `actual mode: maintenance`, `expected: normal`로 의도한 결함에서 실패했다.

GREEN 실행:

- 같은 focused test: 1/1 통과.
- `node --test tests/history-core.test.mjs`: 21/21 통과.

### P3 plan snapshot identity

RED fixtures:

- `resolveDailyPlan()` 결과를 normalize → prepare/apply → JSON stringify/parse로 왕복해 `weekKey/dayId/revision/items` 보존을 검증했다.
- 월요일이 아닌 `weekKey`와 허용되지 않은 `dayId`가 거부되는지 검증했다.

RED 실행:

- `node --test --test-name-pattern='계획 식별자는|스냅샷의 잘못된 주간 키' tests/daily-plan-core.test.mjs`
- 결과: 0/2. 세 단계 모두 `weekKey/dayId`가 `undefined`였고 잘못된 identity가 수용되어 의도한 결함에서 실패했다.

GREEN 실행:

- 같은 focused tests: 2/2 통과.
- `node --test tests/daily-plan-core.test.mjs tests/page-app.test.mjs tests/history-core.test.mjs`: 39/39 통과.
- 전체 테스트 중 주간 화면의 current plan 비교 객체에도 identity가 필요함을 확인해 같은 `weekKey/dayId`를 보강했다.
- 실패했던 주간 브라우저 focused test: 1/1 통과.

## 전체 검증

- `npm run check`: 종료 코드 0.
- `git diff --check`: 종료 코드 0.
- 일반 샌드박스의 최초 `npm test`: 128/136, 실패 8건은 모두 테스트용 `127.0.0.1` bind의 `EPERM`이었다.
- 권한 환경 중간 `npm test`: 135/136. snapshot identity 보존 뒤 주간 current plan 객체에 identity가 빠진 실제 통합 결함 1건을 발견해 수정했다.
- 최종 권한 환경 `npm test`: 136/136 통과, 실패 0.
- revision 없는 history 호환 snapshot 테스트를 포함해 통과했다.

## 실행 패키지 동기화

다음 정확한 10개 파일만 `../outputs/취업준비-루틴-보드/`의 같은 경로에 기계적으로 복사했다.

- `weekly.html`
- `daily.html`
- `assets/routine.css`
- `src/routine-data.js`
- `src/routine-core.js`
- `src/weekly-plan-core.js`
- `src/daily-plan-core.js`
- `src/weekly-app.js`
- `src/page-app.js`
- `src/history-core.js`

검증:

- source/runtime `cmp`: 10/10 통과.
- canonical `output/pdf/취업준비-운영-로드맵.pdf` SHA-256 동기화 전후 동일:
  `bdf93c40389ea307502949c0301d1ff5cf39057ec1e5d1f6935630a1e323056e`

## local-only 서버 검증

- 기존 PID `13851`과 `127.0.0.1:8787` listener가 모두 종료된 상태임을 `ps`와 `lsof`로 재확인했다.
- 어떤 프로세스도 kill하지 않았다.
- 포트 충돌 부재를 다시 확인한 뒤 승인된 local-dev-runner 절차로 새 retained server를 시작했다.
- 명령: `python3 -m http.server 8787 --bind 127.0.0.1`
- 작업 위치: `../outputs/취업준비-루틴-보드/`
- PID: `1703`
- `http://127.0.0.1:8787/`: HTTP 200.
- `http://localhost:8787/`: HTTP 200.
- 두 hostname의 `src/daily-plan-core.js`, `src/history-core.js`, `src/weekly-app.js`: 모두 HTTP 200.
- 위 세 served 파일을 source와 비교한 byte `cmp`: 6/6 통과.
- 수동 브라우저 QA와 스크린샷은 수행하지 않았다.

## 최종 자체검토

- 확정 P2/P3 항목 외 기능 확장이나 중첩 리뷰를 만들지 않았다.
- metrics는 선택된 source만 사용하고 상세 호환 필드는 비손실로 유지된다.
- snapshot identity는 유효한 값만 보존되며 기존 호환 snapshot과 history의 revision 없는 읽기를 깨뜨리지 않는다.
- canonical PDF를 다시 만들거나 변경하지 않았다.
- runtime은 지정된 10개 파일 외에는 교체하지 않았다.
- 남은 운영상 주의는 retained local server가 현재 Codex 세션 수명에 의존한다는 점뿐이다.
