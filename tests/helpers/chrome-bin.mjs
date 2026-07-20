import { accessSync, constants } from 'node:fs';

const MACOS_DEFAULT_CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

export function resolveChromeBin({ env = process.env, defaultPath = MACOS_DEFAULT_CHROME } = {}) {
  const configuredPath = env.CHROME_BIN?.trim();
  const chromePath = configuredPath || defaultPath;

  try {
    accessSync(chromePath, constants.X_OK);
  } catch (cause) {
    throw new Error(
      `Chrome 실행 파일을 찾거나 실행할 수 없습니다: ${chromePath}\n` +
        'CHROME_BIN 환경변수로 실행 가능한 Chrome 경로를 지정하세요.',
      { cause },
    );
  }

  return chromePath;
}
