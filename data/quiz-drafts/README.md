# 정적 퀴즈 초안 계약

이 폴더의 파일은 최종 출제 데이터가 아닌, 카테고리별 독립 초안입니다. 각 초안은 다른 파일을 수정하지 않고 자신의 담당 글만 작성합니다.

## 문항 형식

각 글에는 아래 두 문항을 한 쌍으로 작성합니다.

- `kind: 'main'`: 10문제 본 퀴즈에 쓰는 개념 확인 문제
- `kind: 'follow-up'`: `followUpOf`로 본문 문항 ID를 참조하는 심화 꼬리 문제

모든 문항은 아래 필드를 가집니다.

```js
{
  version: 1,
  id: 'quiz-be-1-main',
  kind: 'main',
  followUpOf: null,
  question: '질문',
  choices: ['선택지 1', '선택지 2', '선택지 3', '선택지 4'],
  correctIndex: 0,
  explanation: '원문을 바탕으로 한 해설',
  categoryId: 'spring-application',
  sourceId: 'be-1',
  sourceCommit: 'd00877afb0a302072078d34ded66b3b69143a5ca',
  sourceHeading: '원문 제목 또는 본문',
  evidenceQuote: '원문과 정확히 일치하는 근거 인용',
  reviewStatus: 'verified',
  provenance: {
    author: 'codex-curated',
    review: 'pending-independent-audit',
  },
}
```

꼬리 문항은 `id: 'quiz-be-1-follow-up'`, `kind: 'follow-up'`, `followUpOf: 'quiz-be-1-main'`으로 작성합니다.

## 작성 기준

- 공식 고정 스냅샷의 해당 글만 근거로 사용한다.
- 정답과 해설은 `evidenceQuote`만으로 판별할 수 있어야 한다.
- 선택지 4개는 서로 달라야 하고, 정답은 하나여야 한다.
- 괄호 속 영문 표기로 답이 직접 드러나는 문제와 단순 문장 빈칸 복원 문제는 피한다.
- 꼬리 문항은 본문 문항보다 한 단계 더 깊은 조건·이유·예외·적용을 묻는다.
- 확신할 수 없으면 문항을 만들지 않고 초안 체크포인트에 보류 사유를 적는다.
