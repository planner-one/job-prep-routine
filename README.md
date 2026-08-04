# 취업 준비 루틴 보드

취업 준비 로드맵, 주간 계획, 데일리 실행, 누적 기록과 면접 연습을 함께 관리하는 정적 웹 앱입니다.

## 배포

프로덕션 주소는 `https://planner-one.github.io/job-prep-routine/`입니다. `codex/job-prep-routine` 브랜치에 푸시하면 GitHub Actions가 GitHub Pages에 자동 배포합니다.

## 작업 시작 규칙

사용자가 질문하거나 계획을 물을 때는 설명과 확인만 제공합니다. 파일 수정, 문항 생성, 테스트 실행, 에이전트 작업 등 실제 구현은 사용자가 **“구현해”** 또는 **“시작해”**라고 명시적으로 요청한 경우에만 시작합니다.

## 로컬 실행

```sh
python3 -m http.server 8787 --bind 127.0.0.1
```

브라우저에서 `http://127.0.0.1:8787/`을 엽니다. 오늘 허브에서 다음 일정과 면접 세션을 바로 이어갈 수 있습니다.

## 화면 구성

- `index.html`: 오늘 진척·다음 일정·면접 이어하기·주간 요약
- `roadmap.html`: 일정 운영 기준과 PDF 출력
- `weekly.html`: 주간 계획과 요일별 실행 흐름
- `daily.html`: 오늘의 시간표·지원·면접·운동 기록
- `history.html`: 최근 7일·30일 실행 지표와 활동 이력
- `interview/`: 이력서 기반 면접 질문·답변 연습 대시보드

## 저장 기준

루틴 상태는 오전 2시를 하루 경계로 계산해 이 브라우저의 `job-prep-routine:*` 키에 저장합니다. 화면 선택은 `job-prep-routine:preferences.v1`, 면접 진행은 `interview-prep.session.v1`에 따로 저장하며 다른 기기와 동기화하지 않습니다. 이전 데이터에 남아 있는 학습 주제와 `learning` 일정은 불러올 때 무시하며, 지원·면접·운동 등 나머지 기록은 유지합니다.

## 검증

```sh
npm run check
npm test
npm run export:roadmap-pdf
```

`npm run check`는 루틴 소스와 PDF 검증 스크립트만 문법 검사합니다. `npm test`는 루틴 단위·계약·브라우저 테스트를 실행합니다.
