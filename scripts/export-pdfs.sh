#!/bin/sh
set -eu

DEFAULT_CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
CHROME="${CHROME_BIN:-$DEFAULT_CHROME}"
BASE_URL="${1:-http://127.0.0.1:8787}"
OUT_DIR="${2:-../outputs}"

if [ ! -x "$CHROME" ]; then
  echo "실행 가능한 Chrome을 찾지 못했습니다: $CHROME" >&2
  echo "CHROME_BIN 환경변수로 Chrome 실행 파일을 지정하세요." >&2
  exit 1
fi

BASE_URL=${BASE_URL%/}
mkdir -p "$OUT_DIR"

export_pdf() {
  page=$1
  filename=$2

  "$CHROME" \
    --headless \
    --disable-gpu \
    --no-pdf-header-footer \
    --run-all-compositor-stages-before-draw \
    --virtual-time-budget=2000 \
    --print-to-pdf="$OUT_DIR/$filename" \
    "$BASE_URL/$page"
}

export_pdf "roadmap.html" "취업준비-운영로드맵.pdf"
export_pdf "weekly.html" "취업준비-주간실행보드.pdf"
export_pdf "daily.html" "취업준비-데일리포커스보드.pdf"
