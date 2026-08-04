import { readFile } from 'node:fs/promises';

const IMPORT_PATTERN = /@import\s+(?:url\()?['"]([^'"]+)['"]\)?[^;]*;/g;

export async function readCssBundle(entryUrl, visited = new Set()) {
  const fileUrl = new URL(entryUrl);
  fileUrl.search = '';
  fileUrl.hash = '';
  if (visited.has(fileUrl.href)) return '';
  visited.add(fileUrl.href);

  const css = await readFile(fileUrl, 'utf8').catch(() => '');
  let bundle = '';
  let cursor = 0;

  for (const match of css.matchAll(IMPORT_PATTERN)) {
    bundle += css.slice(cursor, match.index);
    bundle += await readCssBundle(new URL(match[1], fileUrl), visited);
    cursor = match.index + match[0].length;
  }

  return bundle + css.slice(cursor);
}
