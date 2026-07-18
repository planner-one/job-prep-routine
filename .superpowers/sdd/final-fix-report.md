# 최종 브랜치 리뷰 수정 보고서

## 상태

- 시작 HEAD: `9fdc681f5e70d241d9e42e8f990756a5f117743d`
- Important 3건과 Minor 1건을 모두 수정했다.
- 기존 `localStorage` 키·값을 삭제하거나 변환하지 않았고, history의 legacy roadmap reader와 완료율 source 우선순위를 유지했다.
- 로그인·Firebase·배포는 변경하지 않았으며 기존 8787 서버를 종료하거나 document root를 바꾸지 않았다.

## RED / GREEN 증거

### 완료율

- RED: `node --test tests/routine-core.test.mjs tests/history-core.test.mjs tests/daily-browser.test.mjs`
  - 공통 함수 미존재, history가 판별 fixture를 `28 / 28 = 100%`로 계산해 기대 `30 / 34 = 88%`와 불일치했다.
  - 샌드박스의 `listen EPERM` 1건은 로컬 포트 권한으로 다시 실행했다.
- GREEN: `node --test tests/routine-core.test.mjs tests/history-core.test.mjs`
  - 26/26 통과.
- GREEN: `node --test tests/daily-browser.test.mjs`
  - 1/1 통과. 동일 fixture에서 데일리 UI, `calculateDailyProgress()`, history가 모두 `completed: 30`, `total: 34`, `percent: 88`로 일치했다.

### PDF artifact와 실패 원자성

- RED: `node --test tests/pdf-artifact.test.mjs`
  - 0/1, validator가 없어 실패했다.
- RED: `node --test tests/export-pdf-safety.test.mjs`
  - 로컬 포트 권한으로 실행했을 때 0/2. source 불일치와 HTTP 실패인데도 기존 export가 성공해 canonical 보호 계약을 위반했다.
- GREEN: `node --test tests/pdf-artifact.test.mjs`
  - 1/1 통과.
- GREEN: `node --test tests/export-pdf-safety.test.mjs`
  - 2/2 통과. source 불일치와 HTTP 실패 모두 Chrome 실행 전에 실패하고 sentinel canonical 바이트를 보존했다.

## 변경 파일

- 공통 완료율: `src/routine-core.js`, `src/page-app.js`, `src/history-core.js`
- 완료율 회귀: `tests/fixtures/daily-progress-fixture.mjs`, `tests/routine-core.test.mjs`, `tests/history-core.test.mjs`, `tests/daily-browser.test.mjs`
- PDF 파이프라인: `scripts/export-pdfs.sh`, `scripts/validate-roadmap-pdf.mjs`, `package.json`
- PDF 회귀: `tests/pdf-artifact.test.mjs`, `tests/export-pdf-safety.test.mjs`
- 문서와 artifact: `docs/superpowers/plans/2026-07-18-roadmap-daily-integration.md`, `output/pdf/취업준비-운영-로드맵.pdf`

## PDF 검증

- `npm run export:roadmap-pdf`: 8787의 `roadmap.html`, `assets/routine.css`, `src/roadmap-app.js`, `src/routine-data.js`를 `curl -fsS`로 받아 원본과 비교한 뒤 성공했다.
- Chrome은 `output/pdf`의 임시 파일에 출력했고 validator 통과 후 `mv`로 canonical을 교체했다.
- `node scripts/validate-roadmap-pdf.mjs output/pdf/취업준비-운영-로드맵.pdf`: `pdfinfo`와 `pdftotext -layout` 파싱, A4 정확히 5페이지, 세 운영 원칙, 다섯 변형 표제, 대응 페이지별 72개 일정 시간·라벨 검증 통과.
- canonical 경로는 `output/pdf/취업준비-운영-로드맵.pdf`로 유지했다.

## 실행 패키지 동기화

- `../outputs/취업준비-루틴-보드`에 HTML 5개, CSS 1개, 런타임 JS 7개, canonical PDF 1개를 다시 동기화했다.
- repo와 실행 패키지의 14개 파일 `cmp` 통과.
- 기존 8787에서 네 source와 PDF를 `curl -fsS`로 다시 받아 repo와 비교한 5개 응답 모두 byte-for-byte 일치했다.

## 최종 검증

- `npm run check`: exit 0.
- `npm test`: 74/74 통과, 실패 0.
- `git diff --check`: 출력 없음.

## 커밋

- 이 보고서를 포함한 전체 수정은 `fix: 리뷰 지적 완료율과 PDF 안전성 보완` 한 커밋으로 기록한다.
- 최종 SHA는 보고서 자체를 포함한 커밋 생성 후 `git log`와 최종 응답에서 확정한다.

## 우려사항

- PDF 자동 검증은 로컬에 `pdfinfo`와 `pdftotext`가 있어야 한다. 도구가 없거나 PDF가 계약을 위반하면 export와 전체 테스트가 의도적으로 실패하며 기존 canonical은 보존된다.
- 브라우저·임시 HTTP 서버 테스트는 샌드박스에서 로컬 포트 권한이 필요하다.
- 추가로 남은 기능상 우려는 확인되지 않았다.
