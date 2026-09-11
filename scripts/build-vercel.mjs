import { mkdir, copyFile, readdir, rm, access, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';
import { createHash } from 'node:crypto';

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

// 연결 도구의 4MB 업로드 한도 때문에 큰 원본 이미지만 빌드 중 가져올 수 있습니다.
// 고정 커밋과 SHA-256을 확인한 같은 파일을 배포물에 포함하므로 실행 중 외부 의존은 없습니다.
const planImage = 'assets/images/2026-09-inflearn-learning-plan.png';
try { await access(`_site/${planImage}`); }
catch (error) {
  if (error.code !== 'ENOENT') throw error;
  const response = await fetch(`https://raw.githubusercontent.com/planner-one/job-prep-routine/d67611cd4cb50e303db05a8c936de7acfca8a530/${planImage}`, { signal: AbortSignal.timeout(30_000) });
  if (!response.ok) throw new Error('한 장 플랜 원본 이미지를 가져오지 못했습니다.');
  const bytes = Buffer.from(await response.arrayBuffer());
  if (createHash('sha256').update(bytes).digest('hex') !== 'e6a423789697e0295fcba580efa513d1e177b5f0444fba2256ff76775b6b70f3') throw new Error('한 장 플랜 이미지의 원본 검증에 실패했습니다.');
  await mkdir(dirname(`_site/${planImage}`), { recursive: true });
  await writeFile(`_site/${planImage}`, bytes);
}
