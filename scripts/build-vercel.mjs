import { mkdir, copyFile, readdir, rm } from 'node:fs/promises';
import { dirname } from 'node:path';

// 공개 사이트 디렉터리만 내보냅니다. 서버 코드·환경 변수·개인 백업은 제외합니다.
const files = (await readdir('.')).filter(file => file.endsWith('.html'));
for (const folder of ['assets', 'src', 'interview/assets']) {
  for (const file of await readdir(folder, { recursive: true })) {
    if (!file.split('/').some(part => part.startsWith('.')) && /\.(js|css|png|jpg|jpeg|webp|svg|ico|woff2?|ttf)$/.test(file)) files.push(`${folder}/${file}`);
  }
}
files.push('interview/index.html', 'output/pdf/취업준비-운영-로드맵.pdf');
await rm('_site', { recursive: true, force: true });
for (const file of files) {
  await mkdir(dirname(`_site/${file}`), { recursive: true });
  await copyFile(file, `_site/${file}`);
}
