const DANGEROUS_TAGS = 'script|style|iframe|object|embed|svg|math';
const HEADING_PATTERN = /^\s{0,3}(#{2,4})\s+(.+?)\s*$/u;
const FENCE_PATTERN = /^\s{0,3}(`{3,}|~{3,})\s*([^\s`]*)?\s*$/u;

function assertMarkdown(markdown) {
  if (typeof markdown !== 'string') {
    throw new TypeError('Markdown 본문은 문자열이어야 합니다.');
  }
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/gu, '&amp;')
    .replace(/</gu, '&lt;')
    .replace(/>/gu, '&gt;')
    .replace(/"/gu, '&quot;')
    .replace(/'/gu, '&#39;');
}

function decodeEntities(value) {
  return String(value)
    .replace(/&#x([0-9a-f]+);?/giu, (_, digits) => {
      const codePoint = Number.parseInt(digits, 16);
      return Number.isSafeInteger(codePoint) && codePoint <= 0x10ffff
        ? String.fromCodePoint(codePoint)
        : '';
    })
    .replace(/&#([0-9]+);?/gu, (_, digits) => {
      const codePoint = Number.parseInt(digits, 10);
      return Number.isSafeInteger(codePoint) && codePoint <= 0x10ffff
        ? String.fromCodePoint(codePoint)
        : '';
    })
    .replace(/&(colon|tab|newline|amp|lt|gt|quot|apos);?/giu, (_, name) => ({
      colon: ':', tab: '\t', newline: '\n', amp: '&', lt: '<', gt: '>', quot: '"', apos: "'",
    })[name.toLowerCase()]);
}

function safeUrl(value, { image = false } = {}) {
  if (typeof value !== 'string') return null;
  const decoded = decodeEntities(value).trim();
  if (decoded === '') return null;

  const schemeCheck = decoded.replace(/[\u0000-\u0020\u007f-\u009f]/gu, '');
  if (/^(?:javascript|data|vbscript|file|blob):/iu.test(schemeCheck)) return null;
  if (/^https?:\/\//iu.test(schemeCheck)) return decoded;
  if (!image && /^(?:mailto|tel):/iu.test(schemeCheck)) return decoded;
  if (/^(?:\/(?!\/)|\.\/|\.\.\/|#|\?)/u.test(decoded)) return decoded;
  return null;
}

function externalLinkAttributes(url) {
  return /^https?:\/\//iu.test(url)
    ? ' target="_blank" rel="noopener noreferrer"'
    : '';
}

function htmlAttribute(rawTag, name) {
  const pattern = new RegExp(
    `(?:^|\\s)${name}\\s*=\\s*(?:"([^"]*)"|'([^']*)'|([^\\s"'=<>` + '`' + `]+))`,
    'iu',
  );
  const match = rawTag.match(pattern);
  return match ? (match[1] ?? match[2] ?? match[3] ?? '') : null;
}

function removeDangerousInlineHtml(value) {
  const paired = new RegExp(`<(${DANGEROUS_TAGS})\\b[^>]*>[\\s\\S]*?<\\/\\1\\s*>`, 'giu');
  const tags = new RegExp(`<\\/?(?:${DANGEROUS_TAGS})\\b[^>]*>`, 'giu');
  return String(value).replace(paired, '').replace(tags, '');
}

function plainInlineText(value) {
  let text = removeDangerousInlineHtml(value);
  text = text
    .replace(/<img\b[^>]*>/giu, (tag) => htmlAttribute(tag, 'alt') ?? '이미지')
    .replace(/!\[([^\]]*)\]\([^)]*\)/gu, '$1')
    .replace(/\[([^\]]+)\]\([^)]*\)/gu, '$1')
    .replace(/(`+)([\s\S]*?)\1/gu, '$2')
    .replace(/<[^>]*>/gu, '')
    .replace(/[*_~]+/gu, '')
    .replace(/\\([\\`*{}\[\]()#+.!_>-])/gu, '$1');
  return decodeEntities(text).replace(/\s+/gu, ' ').trim();
}

function createSlugger() {
  const counts = new Map();
  return (heading) => {
    const base = heading
      .normalize('NFKC')
      .toLocaleLowerCase('ko-KR')
      .replace(/[^\p{Letter}\p{Number}\s_-]/gu, '')
      .replace(/[\s_]+/gu, '-')
      .replace(/-+/gu, '-')
      .replace(/^-|-$/gu, '') || 'section';
    const count = (counts.get(base) ?? 0) + 1;
    counts.set(base, count);
    return count === 1 ? base : `${base}-${count}`;
  };
}

function stripQuotePrefix(line) {
  let result = line;
  while (/^\s{0,3}>/u.test(result)) result = result.replace(/^\s{0,3}>\s?/u, '');
  return result;
}

export function extractMarkdownHeadings(markdown) {
  assertMarkdown(markdown);
  const slug = createSlugger();
  const headings = [];
  let fence = null;

  for (const originalLine of markdown.replace(/\r\n?/gu, '\n').split('\n')) {
    const line = stripQuotePrefix(originalLine);
    const fenceMatch = line.match(FENCE_PATTERN);
    if (fenceMatch) {
      const marker = fenceMatch[1];
      if (!fence) fence = marker;
      else if (marker[0] === fence[0] && marker.length >= fence.length) fence = null;
      continue;
    }
    if (fence) continue;

    const match = line.match(HEADING_PATTERN);
    if (!match) continue;
    const text = plainInlineText(match[2].replace(/\s+#+\s*$/u, ''));
    if (!text) continue;
    headings.push({ level: match[1].length, text, id: slug(text) });
  }
  return headings;
}

function findClosingBracket(source, start) {
  let depth = 0;
  for (let index = start; index < source.length; index += 1) {
    if (source[index] === '\\') {
      index += 1;
      continue;
    }
    if (source[index] === '[') depth += 1;
    if (source[index] === ']') {
      depth -= 1;
      if (depth === 0) return index;
    }
  }
  return -1;
}

function linkDestination(source, openParen) {
  let depth = 1;
  let quote = null;
  for (let index = openParen + 1; index < source.length; index += 1) {
    const character = source[index];
    if (character === '\\') {
      index += 1;
      continue;
    }
    if (quote) {
      if (character === quote) quote = null;
      continue;
    }
    if (character === '"' || character === "'") {
      quote = character;
      continue;
    }
    if (character === '(') depth += 1;
    if (character === ')') {
      depth -= 1;
      if (depth === 0) {
        const inside = source.slice(openParen + 1, index).trim();
        if (!inside) return null;

        let url = '';
        let title = '';
        if (inside.startsWith('<')) {
          const end = inside.indexOf('>');
          if (end < 1) return null;
          url = inside.slice(1, end);
          title = inside.slice(end + 1).trim();
        } else {
          const whitespace = inside.search(/\s/u);
          url = whitespace < 0 ? inside : inside.slice(0, whitespace);
          title = whitespace < 0 ? '' : inside.slice(whitespace).trim();
        }
        if ((title.startsWith('"') && title.endsWith('"'))
          || (title.startsWith("'") && title.endsWith("'"))) {
          title = title.slice(1, -1);
        }
        return { end: index + 1, title, url: url.replace(/\\([()])/gu, '$1') };
      }
    }
  }
  return null;
}

function markdownLinkAt(source, start, image) {
  const bracketStart = start + (image ? 1 : 0);
  if (source[bracketStart] !== '[') return null;
  const bracketEnd = findClosingBracket(source, bracketStart);
  if (bracketEnd < 0 || source[bracketEnd + 1] !== '(') return null;
  const destination = linkDestination(source, bracketEnd + 1);
  if (!destination) return null;
  return {
    ...destination,
    label: source.slice(bracketStart + 1, bracketEnd),
  };
}

function rawImageHtml(rawTag) {
  let source = htmlAttribute(rawTag, 'src');
  if (source) source = source.replace(/\)\]\([\s\S]*$/u, '');
  const url = safeUrl(source, { image: true });
  const alt = plainInlineText(htmlAttribute(rawTag, 'alt') ?? '') || '콘텐츠 이미지';
  if (!url) return `<span class="markdown-image-alt">${escapeHtml(alt)}</span>`;

  const attributes = [
    `src="${escapeHtml(url)}"`,
    `alt="${escapeHtml(alt)}"`,
    'loading="lazy"',
    'decoding="async"',
  ];
  const title = plainInlineText(htmlAttribute(rawTag, 'title') ?? '');
  if (title) attributes.push(`title="${escapeHtml(title)}"`);
  for (const dimension of ['width', 'height']) {
    const value = htmlAttribute(rawTag, dimension);
    if (/^[1-9]\d{0,3}$/u.test(value ?? '') && Number(value) <= 4096) {
      attributes.push(`${dimension}="${value}"`);
    }
  }
  return `<img ${attributes.join(' ')}>`;
}

function renderInline(value) {
  const source = removeDangerousInlineHtml(value);
  let html = '';
  let index = 0;

  while (index < source.length) {
    if (source[index] === '\\' && index + 1 < source.length) {
      html += escapeHtml(source[index + 1]);
      index += 2;
      continue;
    }

    if (source[index] === '`') {
      let count = 1;
      while (source[index + count] === '`') count += 1;
      const marker = '`'.repeat(count);
      const end = source.indexOf(marker, index + count);
      if (end >= 0) {
        let code = source.slice(index + count, end).replace(/\s*\n\s*/gu, ' ');
        if (/^\s[\s\S]*\s$/u.test(code) && !/^\s+$/u.test(code)) code = code.slice(1, -1);
        html += `<code>${escapeHtml(code)}</code>`;
        index = end + count;
        continue;
      }
    }

    const isImage = source.startsWith('![', index);
    if (isImage || source[index] === '[') {
      const parsed = markdownLinkAt(source, index, isImage);
      if (parsed) {
        const label = plainInlineText(parsed.label) || (isImage ? '콘텐츠 이미지' : '링크');
        const url = safeUrl(parsed.url, { image: isImage });
        if (isImage) {
          if (url) {
            const title = plainInlineText(parsed.title);
            html += `<img src="${escapeHtml(url)}" alt="${escapeHtml(label)}" loading="lazy" decoding="async"${title ? ` title="${escapeHtml(title)}"` : ''}>`;
          } else {
            html += `<span class="markdown-image-alt">${escapeHtml(label)}</span>`;
          }
        } else if (url) {
          const title = plainInlineText(parsed.title);
          html += `<a href="${escapeHtml(url)}"${externalLinkAttributes(url)}${title ? ` title="${escapeHtml(title)}"` : ''}>${renderInline(parsed.label)}</a>`;
        } else {
          html += renderInline(parsed.label);
        }
        index = parsed.end;
        continue;
      }
    }

    const strongMarker = source.startsWith('**', index)
      ? '**'
      : (source.startsWith('__', index) ? '__' : null);
    if (strongMarker) {
      const end = source.indexOf(strongMarker, index + 2);
      if (end > index + 2) {
        html += `<strong>${renderInline(source.slice(index + 2, end))}</strong>`;
        index = end + 2;
        continue;
      }
    }

    if (/^<img\b/iu.test(source.slice(index))) {
      const tagEnd = source.indexOf('>', index);
      const end = tagEnd >= 0 ? tagEnd + 1 : source.length;
      html += rawImageHtml(source.slice(index, end));
      index = end;
      continue;
    }

    if (source[index] === '<') {
      const tag = source.slice(index).match(/^<[^>]*>/u);
      if (tag) {
        index += tag[0].length;
        continue;
      }
    }

    let end = index + 1;
    while (end < source.length && !/[\\`[!*_<]/u.test(source[end])) end += 1;
    html += escapeHtml(source.slice(index, end));
    index = end;
  }
  return html;
}

function splitTableRow(line) {
  let source = line.trim();
  if (source.startsWith('|')) source = source.slice(1);
  if (source.endsWith('|')) source = source.slice(0, -1);

  const cells = [];
  let cell = '';
  let escaped = false;
  let codeMarker = false;
  for (const character of source) {
    if (escaped) {
      cell += character;
      escaped = false;
    } else if (character === '\\') {
      escaped = true;
      cell += character;
    } else if (character === '`') {
      codeMarker = !codeMarker;
      cell += character;
    } else if (character === '|' && !codeMarker) {
      cells.push(cell.trim());
      cell = '';
    } else {
      cell += character;
    }
  }
  cells.push(cell.trim());
  return cells;
}

function isTableDivider(line) {
  const cells = splitTableRow(line);
  return cells.length > 0 && cells.every((cell) => /^:?-+:?$/u.test(cell));
}

function listItem(line) {
  const unordered = line.match(/^\s{0,3}[-+*]\s+(.+)$/u);
  if (unordered) return { type: 'ul', value: unordered[1], start: null };
  const ordered = line.match(/^\s{0,3}(\d+)[.)]\s+(.+)$/u);
  if (ordered) return { type: 'ol', value: ordered[2], start: Number(ordered[1]) };
  return null;
}

function isHorizontalRule(line) {
  const compact = line.trim().replace(/\s+/gu, '');
  return /^(?:-{3,}|\*{3,}|_{3,})$/u.test(compact);
}

function wrapperOnly(line) {
  return /^\s*<\/?(?:p|div|figure|figcaption|center)\b[^>]*\/?>\s*$/iu.test(line);
}

function rawImageStart(line) {
  return /^\s*<img\b/iu.test(line);
}

function dangerousBlockStart(line) {
  return new RegExp(`^\\s*<(${DANGEROUS_TAGS})\\b`, 'iu').exec(line);
}

function isBlockStart(lines, index) {
  const line = lines[index] ?? '';
  const trimmed = line.trim();
  return trimmed === ''
    || HEADING_PATTERN.test(line)
    || FENCE_PATTERN.test(line)
    || isHorizontalRule(line)
    || /^\s{0,3}>/u.test(line)
    || listItem(line) !== null
    || /^\s*<\/?details\b/iu.test(line)
    || /^\s*<summary\b/iu.test(line)
    || rawImageStart(line)
    || wrapperOnly(line)
    || dangerousBlockStart(line) !== null
    || (index + 1 < lines.length && line.includes('|') && isTableDivider(lines[index + 1]));
}

function renderTable(lines, start) {
  const headers = splitTableRow(lines[start]);
  const rows = [];
  let index = start + 2;
  while (index < lines.length && lines[index].includes('|') && lines[index].trim() !== '') {
    const cells = splitTableRow(lines[index]);
    while (cells.length < headers.length) cells.push('');
    rows.push(cells.slice(0, headers.length));
    index += 1;
  }

  const head = headers.map((cell) => `<th scope="col">${renderInline(cell)}</th>`).join('');
  const body = rows.map((row) => `<tr>${row.map((cell) => `<td>${renderInline(cell)}</td>`).join('')}</tr>`).join('');
  return {
    html: `<div class="markdown-table-wrap" role="region" aria-label="표" tabindex="0"><table><thead><tr>${head}</tr></thead><tbody>${body}</tbody></table></div>`,
    next: index,
  };
}

function renderBlocks(lines, state) {
  const output = [];
  let index = 0;
  let detailsDepth = 0;

  while (index < lines.length) {
    const line = lines[index];
    const trimmed = line.trim();
    if (!trimmed) {
      index += 1;
      continue;
    }

    const dangerous = dangerousBlockStart(line);
    if (dangerous) {
      const closing = new RegExp(`<\\/${dangerous[1]}\\s*>`, 'iu');
      while (index < lines.length && !closing.test(lines[index])) index += 1;
      if (index < lines.length) index += 1;
      continue;
    }

    const fenceMatch = line.match(FENCE_PATTERN);
    if (fenceMatch) {
      const marker = fenceMatch[1];
      const language = (fenceMatch[2] ?? '').replace(/[^a-z0-9_+#.-]/giu, '');
      const code = [];
      index += 1;
      while (index < lines.length) {
        const close = lines[index].match(/^\s{0,3}(`{3,}|~{3,})\s*$/u);
        if (close && close[1][0] === marker[0] && close[1].length >= marker.length) {
          index += 1;
          break;
        }
        code.push(lines[index]);
        index += 1;
      }
      output.push(`<pre><code${language ? ` class="language-${escapeHtml(language)}"` : ''}>${escapeHtml(code.join('\n'))}</code></pre>`);
      continue;
    }

    const heading = line.match(HEADING_PATTERN);
    if (heading) {
      const text = plainInlineText(heading[2].replace(/\s+#+\s*$/u, ''));
      if (text) {
        const id = state.slug(text);
        output.push(`<h${heading[1].length} id="${escapeHtml(id)}">${renderInline(heading[2].replace(/\s+#+\s*$/u, ''))}</h${heading[1].length}>`);
      }
      index += 1;
      continue;
    }

    if (isHorizontalRule(line)) {
      output.push('<hr>');
      index += 1;
      continue;
    }

    if (index + 1 < lines.length && line.includes('|') && isTableDivider(lines[index + 1])) {
      const rendered = renderTable(lines, index);
      output.push(rendered.html);
      index = rendered.next;
      continue;
    }

    if (/^\s{0,3}>/u.test(line)) {
      const quoted = [];
      while (index < lines.length) {
        const match = lines[index].match(/^\s{0,3}>\s?(.*)$/u);
        if (!match) break;
        quoted.push(match[1]);
        index += 1;
      }
      output.push(`<blockquote>${renderBlocks(quoted, state)}</blockquote>`);
      continue;
    }

    const item = listItem(line);
    if (item) {
      const type = item.type;
      const firstStart = item.start;
      const items = [];
      while (index < lines.length) {
        const current = listItem(lines[index]);
        if (!current || current.type !== type) break;
        const parts = [current.value];
        index += 1;
        while (index < lines.length && lines[index].trim() !== '') {
          const nextItem = listItem(lines[index]);
          if (nextItem || isBlockStart(lines, index)) break;
          parts.push(lines[index].trim());
          index += 1;
        }
        items.push(parts.join(' '));
        if (lines[index]?.trim() === '') break;
      }
      const startAttribute = type === 'ol' && firstStart !== 1 ? ` start="${firstStart}"` : '';
      output.push(`<${type}${startAttribute}>${items.map((value) => `<li>${renderInline(value)}</li>`).join('')}</${type}>`);
      continue;
    }

    const detailsOpen = line.match(/^\s*<details\b[^>]*>\s*$/iu);
    if (detailsOpen) {
      output.push('<details>');
      detailsDepth += 1;
      index += 1;
      continue;
    }
    if (/^\s*<\/details\s*>\s*$/iu.test(line)) {
      if (detailsDepth > 0) {
        output.push('</details>');
        detailsDepth -= 1;
      }
      index += 1;
      continue;
    }
    const summary = line.match(/^\s*<summary\b[^>]*>([\s\S]*?)(?:<\/summary\s*>)?\s*$/iu);
    if (summary) {
      output.push(`<summary>${renderInline(summary[1])}</summary>`);
      index += 1;
      continue;
    }

    if (rawImageStart(line)) {
      let tag = line.trim();
      if (!tag.includes('>') && /^\s*["']?\s*\/?>\s*$/u.test(lines[index + 1] ?? '')) {
        index += 1;
        tag += ` ${lines[index].trim()}`;
      }
      output.push(rawImageHtml(tag));
      index += 1;
      continue;
    }

    if (wrapperOnly(line)) {
      index += 1;
      continue;
    }

    const paragraphLines = [];
    while (index < lines.length && !isBlockStart(lines, index)) {
      paragraphLines.push(lines[index]);
      index += 1;
    }
    if (paragraphLines.length === 0) {
      paragraphLines.push(line);
      index += 1;
    }
    const paragraph = paragraphLines.map((part) => {
      const hardBreak = /\s{2,}$/u.test(part);
      const rendered = renderInline(part.trim());
      return { hardBreak, rendered };
    });
    const html = paragraph.map(({ rendered, hardBreak }, partIndex) => {
      if (partIndex === paragraph.length - 1) return rendered;
      return `${rendered}${hardBreak ? '<br>' : ' '}`;
    }).join('');
    if (plainInlineText(paragraphLines.join(' ')) || /<(?:img|a|code|strong)\b/iu.test(html)) {
      output.push(`<p>${html}</p>`);
    }
  }

  while (detailsDepth > 0) {
    output.push('</details>');
    detailsDepth -= 1;
  }
  return output.join('\n');
}

export function markdownToSafeHtml(markdown) {
  assertMarkdown(markdown);
  const lines = markdown.replace(/\r\n?/gu, '\n').split('\n');
  return renderBlocks(lines, { slug: createSlugger() });
}
