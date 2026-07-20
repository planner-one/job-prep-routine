# 주간 플래너 Task 7 구현 보고서

## 결과

- 상태: 완료
- 구현 기준: `3f1c1e3` (`fix: 취침 앵커의 운동 집계를 제외`)
- 주간 인쇄에서 편집 조작과 미배치 일정 버튼을 숨기고, 각 일정 행의 인쇄 페이지 분할을 방지했다.
- 새 주간·데일리 계획 코어의 오전 2시 논리 날짜 및 주간 키 연결 계약을 추가했다.
- 모든 `*-browser.test.mjs`가 공통 Chrome resolver를 사용하는지 자동 탐색해 검증하도록 보완했다.

## RED

- 명령: `node --test tests/print-contract.test.mjs tests/date-boundary-contract.test.mjs tests/browser-chrome.test.mjs`
- 결과: 17개 중 16개 통과·1개 실패
- 기대한 실패 이유:
  - 인쇄 CSS에 `.weekly-unscheduled button` 숨김 선언이 없었다.
  - 인쇄 블록 안에 `.weekly-plan-row`의 `break-inside` 및 `page-break-inside` 계약이 없었다.
- 논리 날짜와 공통 Chrome resolver의 새 계약은 기존 구현을 정상적으로 포괄했다.

## GREEN 및 전체 검증

- focused GREEN
  - 명령: `node --test tests/print-contract.test.mjs tests/date-boundary-contract.test.mjs tests/browser-chrome.test.mjs`
  - 결과: 17/17 통과, 실패 0
- 전체 테스트
  - 샌드박스 최초 명령: `npm test`
  - 결과: 133개 중 125개 통과·8개 환경 실패
  - 원인: 브라우저 및 PDF 안전성 테스트용 임시 `127.0.0.1` 포트 bind가 샌드박스에서 `EPERM`으로 제한됨
  - 승인 재실행 명령: `npm test`
  - 결과: 133/133 통과, 실패 0
- 정적 검사
  - 명령: `npm run check`
  - 결과: 성공
- diff 검사
  - 명령: `git diff --check`
  - 결과: 성공

## 실행 패키지 동기화

- 아래 10개 파일만 `../outputs/취업준비-루틴-보드/`의 같은 구조로 복사했다.
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
- 10개 파일 모두 source/runtime `cmp` 종료 코드 0을 확인했다.
- canonical `output/pdf/취업준비-운영-로드맵.pdf`의 SHA-256은 동기화 전후 `bdf93c40389ea307502949c0301d1ff5cf39057ec1e5d1f6935630a1e323056e`로 동일하다.
- unrelated 파일은 교체하지 않았다.

## 로컬 서버 및 HTTP 바이트 검증

- 최초 및 동기화 직전 `lsof -nP -iTCP:8787 -sTCP:LISTEN` 결과 리스너가 없었다.
- 동기화 후 `../outputs/취업준비-루틴-보드/`에서 `python3 -m http.server 8787 --bind 127.0.0.1`을 새 retained session으로 시작했다.
- 포트/PID: `127.0.0.1:8787`, Python PID `13851`
- `http://127.0.0.1:8787/`: HTTP 200
- `http://localhost:8787/`: HTTP 200
- 두 hostname에서 제공한 `weekly.html`과 `src/weekly-plan-core.js`를 각각 source와 `cmp`해 모두 종료 코드 0을 확인했다.
- 검증용 임시 파일만 정리했고 서버는 유지했다.
- 브라우저 수동 시각 QA 및 스크린샷은 수행하지 않았다.

## 최종 자체검토

- `docs/superpowers/specs/2026-07-20-weekly-planner-daily-sync-design.md`의 인쇄, 논리 날짜, 실행 패키지 동기화 요구사항을 구현 및 계약 테스트와 대조했다.
- `bd83d54` 이후 전체 구현 diff를 데이터 보존, DOM 출력, 날짜·시간 경계, snapshot 병합, 주간 집계 관점에서 재검토했다.
- Critical 및 Important 미해결 사항은 발견하지 못했다.

## 우려

- 기존 8787 서버가 없어 재사용하지 못하고 새 로컬 전용 서버를 시작했다.
- 로컬 `jenv` 갱신 경고는 모든 shell 명령에서 공통으로 출력되지만 프로젝트 검사 종료 코드에는 영향을 주지 않았다.

## 독립 검토 Important 수정

- 수정 기준: `b63dcaf` (`test: 주간 플래너 전체 회귀를 검증`)
- 발견 사항: 인쇄에서 드래그·이동 조작을 숨긴 뒤 일반 일정 행의 5열 grid가 남아 시간 범위가 2.25rem 열에 배치될 수 있었다.

### RED/GREEN

- RED 명령: `node --test tests/print-contract.test.mjs`
- RED 결과: 10개 중 9개 통과·1개 실패
- 실패 이유: `.weekly-plan-row:not(.is-fixed)`의 인쇄용 명시적 3열 grid 계약이 없었다.
- 수정: 일반 행에만 `7.5rem minmax(0, 1fr) auto` 3열을 적용해 시간·라벨·상태 열을 확보하고 기존 고정 행 계약을 보존했다.
- GREEN 명령: `node --test tests/print-contract.test.mjs`
- GREEN 결과: 10/10 통과, 실패 0

### 전체 검증 및 동기화

- `npm run check`: 성공
- `npm test`: 133/133 통과, 실패 0
- `git diff --check`: 성공
- 수정된 `assets/routine.css` 한 파일만 runtime에 다시 복사했고 source/runtime `cmp` 종료 코드 0을 확인했다.
- 기존 Python PID `13851`을 재시작하거나 종료하지 않았다.
- `http://127.0.0.1:8787/assets/routine.css`: HTTP 200, source byte `cmp` 0
- `http://localhost:8787/assets/routine.css`: HTTP 200, source byte `cmp` 0
- canonical 로드맵 PDF SHA-256은 `bdf93c40389ea307502949c0301d1ff5cf39057ec1e5d1f6935630a1e323056e`로 유지됐다.
- 검증용 임시 파일만 정리했으며 다른 runtime 파일은 변경하지 않았다.
