import test from 'node:test';
import assert from 'node:assert/strict';
import {
  extractMarkdownHeadings,
  markdownToSafeHtml,
} from '../src/github-markdown.js';

test('h2-h4 목차와 렌더 ID가 중복 suffix까지 일치한다', () => {
  const markdown = [
    '# 제외할 H1',
    '## OSIV **동작** 🤔',
    '### 같은 제목',
    '#### 같은 제목',
    '## OSIV **동작** 🤔',
    '```md',
    '## 코드 안 제목',
    '```',
    '##### 제외할 H5',
  ].join('\n');

  assert.deepEqual(extractMarkdownHeadings(markdown), [
    { level: 2, text: 'OSIV 동작 🤔', id: 'osiv-동작' },
    { level: 3, text: '같은 제목', id: '같은-제목' },
    { level: 4, text: '같은 제목', id: '같은-제목-2' },
    { level: 2, text: 'OSIV 동작 🤔', id: 'osiv-동작-2' },
  ]);

  const html = markdownToSafeHtml(markdown);
  assert.match(html, /<h2 id="osiv-동작">OSIV <strong>동작<\/strong> 🤔<\/h2>/u);
  assert.match(html, /<h3 id="같은-제목">같은 제목<\/h3>/u);
  assert.match(html, /<h4 id="같은-제목-2">같은 제목<\/h4>/u);
  assert.match(html, /<h2 id="osiv-동작-2">/u);
  assert.doesNotMatch(html, /id="코드-안-제목"/u);
});

test('문단·강조·인라인 코드·목록·인용문·구분선·외부 링크를 의미 있게 렌더한다', () => {
  const html = markdownToSafeHtml([
    '**OSIV**는 `EntityManager`를 뷰까지 유지합니다.',
    '',
    '1. 요청을 받습니다.',
    '2. 트랜잭션을 시작합니다.',
    '',
    '- 커밋',
    '- 종료',
    '',
    '> 충분히 고민해 보세요.',
    '',
    '---',
    '',
    '[공식 문서](https://example.com/docs "문서")',
  ].join('\n'));

  assert.match(html, /<p><strong>OSIV<\/strong>는 <code>EntityManager<\/code>를 뷰까지 유지합니다.<\/p>/u);
  assert.match(html, /<ol><li>요청을 받습니다.<\/li><li>트랜잭션을 시작합니다.<\/li><\/ol>/u);
  assert.match(html, /<ul><li>커밋<\/li><li>종료<\/li><\/ul>/u);
  assert.match(html, /<blockquote><p>충분히 고민해 보세요.<\/p><\/blockquote>/u);
  assert.match(html, /<hr>/u);
  assert.match(html, /<a href="https:\/\/example\.com\/docs" target="_blank" rel="noopener noreferrer" title="문서">공식 문서<\/a>/u);
});

test('실제 코퍼스 형태의 표와 fenced code를 안전하게 보존한다', () => {
  const html = markdownToSafeHtml([
    '| Private IP | Private Port |',
    '|-|-|',
    '| 192.168.10.2 | **8000** |',
    '',
    '```sql',
    'SELECT * FROM orders WHERE amount > 150;',
    '<script>alert(1)</script>',
    '```',
  ].join('\n'));

  assert.match(html, /<table>/u);
  assert.match(html, /<thead><tr><th scope="col">Private IP<\/th><th scope="col">Private Port<\/th><\/tr><\/thead>/u);
  assert.match(html, /<td><strong>8000<\/strong><\/td>/u);
  assert.match(html, /<pre><code class="language-sql">/u);
  assert.match(html, /&lt;script&gt;alert\(1\)&lt;\/script&gt;/u);
  assert.doesNotMatch(html, /<script>/iu);
});

test('details와 Markdown·raw 이미지를 안전한 속성으로 렌더한다', () => {
  const html = markdownToSafeHtml([
    '<details open onclick="alert(1)">',
    '<summary onmouseover="alert(1)">충분히 고민해보세요!</summary>',
    '',
    '- 답변입니다.',
    '</details>',
    '',
    '![구조도](https://example.com/diagram.png)',
    '',
    '![](https://example.com/fallback.png)',
    '',
    '<img width="300" src="https://example.com/raw.png" onerror="alert(1)">',
  ].join('\n'));

  assert.match(html, /<details>\s*<summary>충분히 고민해보세요!<\/summary>/u);
  assert.match(html, /<img src="https:\/\/example\.com\/diagram\.png" alt="구조도" loading="lazy" decoding="async">/u);
  assert.match(html, /<img src="https:\/\/example\.com\/fallback\.png" alt="콘텐츠 이미지" loading="lazy" decoding="async">/u);
  assert.match(html, /<img src="https:\/\/example\.com\/raw\.png" alt="콘텐츠 이미지" loading="lazy" decoding="async" width="300">/u);
  assert.doesNotMatch(html, /onclick|onmouseover|onerror/iu);
});

test('XSS 태그·이벤트 속성·javascript/data URL을 출력하지 않는다', () => {
  const html = markdownToSafeHtml([
    '<script>alert(document.cookie)</script>',
    '<iframe src="https://evil.example"></iframe>',
    '<img src="javascript:alert(1)" onerror="alert(2)" alt="차단 이미지">',
    '[위험 링크](javascript:alert(3))',
    '![위험 이미지](data:text/html;base64,PHNjcmlwdD4=)',
    '<a href="javascript:alert(4)" onclick="alert(5)">원문 텍스트</a>',
    '| 값 |',
    '|---|',
    '| <img src=x onload=alert(6)> |',
  ].join('\n'));

  assert.doesNotMatch(html, /<script|<iframe|\son[a-z]+\s*=|javascript:|data:/iu);
  assert.match(html, /차단 이미지/u);
  assert.match(html, /위험 링크/u);
  assert.match(html, /위험 이미지/u);
  assert.match(html, /원문 텍스트/u);
});

test('문자열이 아닌 입력은 조용히 왜곡하지 않고 한국어 오류로 거부한다', () => {
  assert.throws(() => markdownToSafeHtml(null), /Markdown 본문은 문자열/u);
  assert.throws(() => extractMarkdownHeadings({}), /Markdown 본문은 문자열/u);
});
