import { MAEIL_CONTENT_COMMIT, MAEIL_CONTENT_REPOSITORY } from './maeil-content.js';
import {
  QUIZ_QUESTION_VERSION,
} from './quiz-core.js?v=8';
import { QUIZ_FLOW_SESSION_VERSION } from './quiz-flow-core.js?v=8';
import {
  QUIZ_GENERATED_QUESTIONS,
  QUIZ_GENERATION,
} from './quiz-questions.generated.js?v=8';

export const QUIZ_SOURCE = Object.freeze({
  repository: MAEIL_CONTENT_REPOSITORY,
  snapshotCommit: MAEIL_CONTENT_COMMIT,
  contentPath: 'backend/contents',
});

export const QUIZ_DATA_CONTRACT = Object.freeze({
  question: Object.freeze({
    name: 'QuizQuestion',
    version: QUIZ_QUESTION_VERSION,
    requiredFields: Object.freeze([
      'version',
      'id',
      'question',
      'choices',
      'correctIndex',
      'explanation',
      'choiceFeedback',
      'keyPoints',
      'categoryId',
      'sourceId',
      'sourceCommit',
      'sourceHeading',
      'sourceAnchor',
      'evidenceQuote',
      'reviewStatus',
    ]),
    choiceCount: 4,
    correctIndex: '0..3',
    selectableReviewStatus: 'verified',
  }),
  session: Object.freeze({
    name: 'QuizSession',
    version: QUIZ_FLOW_SESSION_VERSION,
    requiredFields: Object.freeze([
      'version',
      'id',
      'date',
      'primarySourceId',
      'categoryId',
      'mainQuestionIds',
      'followUpIdsByMain',
      'cursor',
      'status',
      'answers',
      'deferredFollowUpIds',
      'roundOneCompleted',
      'mainCompleted',
      'fullyCompleted',
      'startedAt',
      'updatedAt',
      'completedAt',
    ]),
    stageSize: 5,
    maximumQuestionCount: 10,
  }),
});

const SOURCE_BE_1 = `## OSIV(Open Session In View)

**OSIV(open session in view)** 는 영속성 컨텍스트를 뷰까지 열어둔다는 의미입니다. 영속성 컨텍스트가 살아있으면 엔티티는 영속 상태로 유지될 수 있어, 뷰에서도 지연 로딩을 사용할 수 있어요. OSIV의 핵심은 뷰에서도 지연 로딩이 가능하도록 하는 것입니다. 가장 단순한 구현은 클라이언트 요청이 들어올때 필터나 인터셉터에서 트랜잭션을 시작하는 방법인데요. 이를 트랜잭션 방식 OSIV라고 합니다. 하지만, 트랜잭션 방식 OSIV는 표현 계층에서도 엔티티를 수정할 수 있기 때문에 유지보수하기 어려운 코드를 만들 수 있습니다. 

## 트랜잭션 방식의 OSIV의 문제는 어떻게 풀어볼 수 있을까요? 🤔
최신 방식의 OSIV는 트랜잭션 방식의 문제를 해결합니다. 스프링 OSIV는 OSIV를 사용하면서 트랜잭션은 비즈니스 계층에서만 사용해요. 표현 계층에서는 트랜잭션이 없기 때문에 수정이 불가능합니다. 하지만, 표현 계층에서 트랜잭션 없는 읽기를 이용해 지연 로딩은 가능합니다. 동작 원리는 다음과 같습니다.

1. 클라이언트의 요청이 들어오면 서블릿 필터나 스프링 인터셉터에서 영속성 컨텍스트를 생성합니다.
2. 응용 계층에서 @Transactional로 트랜잭션을 시작할 때 미리 생성한 영속성 컨텍스트를 찾아와서 트랜잭션을 시작합니다.
3. 응용 계층이 끝나면 트랜잭션을 커밋하고 영속성 컨텍스트를 플러시합니다. (영속성 컨텍스트는 종료하지 않습니다.)
4. 컨트롤러와 뷰까지 영속성 컨텍스트가 유지되므로 조회한 엔티티는 영속 상태를 유지할 수 있습니다.
5. 필터, 인터셉터로 요청이 돌아오면 영속성 컨텍스트를 종료하는데 이때 플러시는 수행하지 않습니다.

## 스프링 방식의 OSIV의 문제점을 한 번 생각해볼까요? 😀

- OSIV 기능을 사용하면 상대적으로 오래 DB 커넥션을 점유하기 때문에 커넥션 고갈로 이어질 수 있습니다.

## OSIV 기능을 비활성화하여 성능 최적화를 해볼 수 있어요. 🤓

OSIV 기능이 활성화되어 있는 경우에는 트랜잭션의 범위를 벗어나도 커넥션을 계속 유지해요. 만약 트래픽을 많이 받는 상황이라면, 커넥션 고갈로 이어질 수 있습니다. OSIV 기능을 비활성화하여 데이터베이스 커넥션을 효율적으로 사용할 수 있습니다.

## 그러면 무조건 OSIV 기능을 비활성화해야 할까요? 🤔

무조건 비활성화하기 보다는 꺼야하는 근거가 필요해요. 만약 트랜잭션 범위 밖에서 지연로딩을 반드시 수행해야하는 경우에는 비활성화하기 어려울 수도 있어요.`;

export const QUIZ_SOURCE_EXCERPTS = Object.freeze({ 'be-1': SOURCE_BE_1 });

function question(id, prompt, choices, correctIndex, explanation, sourceHeading, evidenceQuote) {
  const sourceAnchor = sourceHeading
    .normalize('NFKC')
    .toLocaleLowerCase('ko-KR')
    .replace(/[^\p{Letter}\p{Number}\s_-]/gu, '')
    .replace(/[\s_]+/gu, '-')
    .replace(/-+/gu, '-')
    .replace(/^-|-$/gu, '') || 'content-answer';
  return Object.freeze({
    version: QUIZ_QUESTION_VERSION,
    id,
    kind: 'main',
    followUpOf: null,
    followUpOrder: null,
    followUpRole: null,
    question: prompt,
    choices: Object.freeze(choices),
    correctIndex,
    explanation,
    choiceFeedback: Object.freeze(choices.map((choice, index) => (
      index === correctIndex ? explanation : `“${choice}”는 원문 근거와 일치하지 않습니다.`
    ))),
    keyPoints: Object.freeze([sourceHeading, '원문 근거']),
    categoryId: 'spring-application',
    sourceId: 'be-1',
    sourceCommit: MAEIL_CONTENT_COMMIT,
    sourceHeading,
    sourceAnchor,
    evidenceQuote,
    reviewStatus: 'verified',
  });
}

// UI·저장·채점 흐름을 검증하는 수동 fixture이다.
// 2단계 Ollama 검증을 거친 문항이 아니므로 실제 퀴즈 풀에는 포함하지 않는다.
export const QUIZ_SAMPLE_QUESTIONS = Object.freeze([
  question(
    'quiz-be-1-01',
    'OSIV(Open Session In View)의 의미로 가장 적절한 것은?',
    ['영속성 컨텍스트를 뷰까지 열어둔다.', '모든 요청의 DB 커넥션을 즉시 닫는다.', '표현 계층에서 지연 로딩을 금지한다.', '영속성 컨텍스트를 응용 계층에서만 생성한다.'],
    0,
    'OSIV는 영속성 컨텍스트를 뷰까지 유지하여 뷰에서도 지연 로딩을 가능하게 한다.',
    'OSIV(Open Session In View)',
    '**OSIV(open session in view)** 는 영속성 컨텍스트를 뷰까지 열어둔다는 의미입니다.',
  ),
  question(
    'quiz-be-1-02',
    '원문이 설명하는 OSIV의 핵심 목적은?',
    ['뷰에서도 지연 로딩을 가능하게 한다.', '모든 엔티티를 즉시 로딩한다.', '표현 계층의 쓰기 트랜잭션을 강제한다.', '모든 커넥션을 요청 전에 생성한다.'],
    0,
    '영속성 컨텍스트가 살아 있어 뷰에서도 지연 로딩을 사용할 수 있다.',
    'OSIV(Open Session In View)',
    'OSIV의 핵심은 뷰에서도 지연 로딩이 가능하도록 하는 것입니다.',
  ),
  question(
    'quiz-be-1-03',
    '트랜잭션 방식 OSIV의 가장 단순한 구현 위치는?',
    ['필터나 인터셉터', '엔티티 생성자', '데이터베이스 트리거', '정적 HTML 뷰'],
    0,
    '클라이언트 요청이 들어오면 필터나 인터셉터에서 트랜잭션을 시작하는 방식이다.',
    'OSIV(Open Session In View)',
    '가장 단순한 구현은 클라이언트 요청이 들어올때 필터나 인터셉터에서 트랜잭션을 시작하는 방법인데요.',
  ),
  question(
    'quiz-be-1-04',
    '기존 트랜잭션 방식 OSIV가 유지보수를 어렵게 만들 수 있는 이유는?',
    ['표현 계층에서도 엔티티를 수정할 수 있기 때문이다.', '응용 계층에서 읽기를 할 수 없기 때문이다.', '뷰에서 지연 로딩이 항상 실패하기 때문이다.', '영속성 컨텍스트가 생성되지 않기 때문이다.'],
    0,
    '표현 계층의 엔티티 수정이 가능해 계층 간 책임이 흐려질 수 있다.',
    'OSIV(Open Session In View)',
    '하지만, 트랜잭션 방식 OSIV는 표현 계층에서도 엔티티를 수정할 수 있기 때문에 유지보수하기 어려운 코드를 만들 수 있습니다.',
  ),
  question(
    'quiz-be-1-05',
    '스프링 OSIV에서 트랜잭션을 사용하는 계층은?',
    ['비즈니스 계층', '표현 계층', '뷰 템플릿 계층', '필터 계층만'],
    0,
    '스프링 OSIV는 영속성 컨텍스트를 유지하지만 트랜잭션은 비즈니스 계층에서만 사용한다.',
    '트랜잭션 방식의 OSIV의 문제는 어떻게 풀어볼 수 있을까요?',
    '스프링 OSIV는 OSIV를 사용하면서 트랜잭션은 비즈니스 계층에서만 사용해요.',
  ),
  question(
    'quiz-be-1-06',
    '스프링 OSIV에서 요청이 들어올 때 영속성 컨텍스트를 생성하는 곳은?',
    ['서블릿 필터나 스프링 인터셉터', '뷰 템플릿 내부', '데이터베이스 로그 영역', '엔티티의 equals 메서드'],
    0,
    '요청 시작에 필터나 인터셉터가 영속성 컨텍스트를 먼저 생성한다.',
    '트랜잭션 방식의 OSIV의 문제는 어떻게 풀어볼 수 있을까요?',
    '1. 클라이언트의 요청이 들어오면 서블릿 필터나 스프링 인터셉터에서 영속성 컨텍스트를 생성합니다.',
  ),
  question(
    'quiz-be-1-07',
    '응용 계층이 끝난 직후 스프링 OSIV의 동작은?',
    ['트랜잭션을 커밋하고 플러시하되 영속성 컨텍스트는 종료하지 않는다.', '트랜잭션과 영속성 컨텍스트를 모두 즉시 종료한다.', '커밋 없이 영속성 컨텍스트만 플러시한다.', '엔티티를 모두 비영속 상태로 전환한다.'],
    0,
    '응용 계층의 트랜잭션은 끝나지만 뷰의 지연 로딩을 위해 영속성 컨텍스트는 유지된다.',
    '트랜잭션 방식의 OSIV의 문제는 어떻게 풀어볼 수 있을까요?',
    '3. 응용 계층이 끝나면 트랜잭션을 커밋하고 영속성 컨텍스트를 플러시합니다. (영속성 컨텍스트는 종료하지 않습니다.)',
  ),
  question(
    'quiz-be-1-08',
    '요청이 필터나 인터셉터로 돌아왔을 때 스프링 OSIV는?',
    ['영속성 컨텍스트를 종료하고 플러시는 수행하지 않는다.', '새 트랜잭션을 시작하고 플러시한다.', '영속성 컨텍스트를 다음 요청까지 보관한다.', '표현 계층의 변경을 무조건 커밋한다.'],
    0,
    '요청의 마지막에 영속성 컨텍스트를 닫지만 별도 플러시는 하지 않는다.',
    '트랜잭션 방식의 OSIV의 문제는 어떻게 풀어볼 수 있을까요?',
    '5. 필터, 인터셉터로 요청이 돌아오면 영속성 컨텍스트를 종료하는데 이때 플러시는 수행하지 않습니다.',
  ),
  question(
    'quiz-be-1-09',
    'OSIV를 사용할 때 발생할 수 있는 DB 운영 문제는?',
    ['DB 커넥션 고갈', '엔티티 ID 자동 삭제', 'SQL 문법의 자동 변경', '데이터베이스 스키마 초기화'],
    0,
    '영속성 컨텍스트와 함께 DB 커넥션을 오래 점유하면 트래픽이 많을 때 커넥션이 고갈될 수 있다.',
    '스프링 방식의 OSIV의 문제점을 한 번 생각해볼까요?',
    '- OSIV 기능을 사용하면 상대적으로 오래 DB 커넥션을 점유하기 때문에 커넥션 고갈로 이어질 수 있습니다.',
  ),
  question(
    'quiz-be-1-10',
    '원문에서 OSIV 비활성화가 어려울 수 있다고 설명한 경우는?',
    ['트랜잭션 범위 밖에서 지연 로딩이 반드시 필요한 경우', '표현 계층에서 아무 데이터도 읽지 않는 경우', 'DB 커넥션을 사용하지 않는 경우', '모든 조회를 즉시 로딩하는 경우'],
    0,
    '트랜잭션 밖의 지연 로딩이 필수인 구조라면 OSIV를 끄기 어려울 수 있다.',
    '그러면 무조건 OSIV 기능을 비활성화해야 할까요?',
    '만약 트랜잭션 범위 밖에서 지연로딩을 반드시 수행해야하는 경우에는 비활성화하기 어려울 수도 있어요.',
  ),
]);

export const QUIZ_QUESTIONS = Object.freeze([
  ...QUIZ_GENERATED_QUESTIONS,
]);

const QUESTION_BY_ID = new Map(QUIZ_QUESTIONS.map((item) => [item.id, item]));
const GENERATED_QUESTION_IDS = new Set(QUIZ_GENERATED_QUESTIONS.map(({ id }) => id));

export function getQuizQuestion(id) {
  return QUESTION_BY_ID.get(id) ?? null;
}

export function getQuizQuestionProvenance(id) {
  const question = getQuizQuestion(id);
  if (!question) return null;
  if (!GENERATED_QUESTION_IDS.has(id)) return null;
  return Object.freeze({
    questionId: id,
    sourceId: question.sourceId,
    sourceCommit: question.sourceCommit,
    origin: question.provenance?.author
      ?? (String(QUIZ_GENERATION.model).includes('ollama') ? 'ollama-generated' : 'static-curated'),
    generationModel: QUIZ_GENERATION.model,
    validatorModel: QUIZ_GENERATION.validatorModel,
    promptVersion: QUIZ_GENERATION.promptVersion,
  });
}
