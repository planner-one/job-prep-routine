#!/bin/sh
set -eu

DEFAULT_CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
CHROME="${CHROME_BIN:-$DEFAULT_CHROME}"
BASE_URL="${1:-http://127.0.0.1:8787}"
OUT_DIR="${2:-output/pdf}"
TARGET="${3:-all}"
PROJECT_ROOT=$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)
SOURCE_TMP_DIR=""
TEMP_PDF=""

cleanup() {
  if [ -n "$TEMP_PDF" ]; then rm -f "$TEMP_PDF"; fi
  if [ -n "$SOURCE_TMP_DIR" ]; then
    rm -f "$SOURCE_TMP_DIR/roadmap.html" "$SOURCE_TMP_DIR/routine.css" \
      "$SOURCE_TMP_DIR/roadmap-app.js" "$SOURCE_TMP_DIR/routine-data.js"
    rmdir "$SOURCE_TMP_DIR" 2>/dev/null || true
  fi
}
trap cleanup EXIT HUP INT TERM

if [ ! -x "$CHROME" ]; then
  echo "실행 가능한 Chrome을 찾지 못했습니다: $CHROME" >&2
  echo "CHROME_BIN 환경변수로 Chrome 실행 파일을 지정하세요." >&2
  exit 1
fi

BASE_URL=${BASE_URL%/}
mkdir -p "$OUT_DIR"

verify_roadmap_sources() {
  SOURCE_TMP_DIR=$(mktemp -d "${TMPDIR:-/tmp}/roadmap-pdf-source.XXXXXX")
  for path in roadmap.html assets/routine.css src/roadmap-app.js src/routine-data.js; do
    downloaded="$SOURCE_TMP_DIR/${path##*/}"
    if ! curl -fsS "$BASE_URL/$path" -o "$downloaded"; then
      echo "source 요청 실패: $path" >&2
      exit 1
    fi
    if ! cmp -s "$PROJECT_ROOT/$path" "$downloaded"; then
      echo "source 불일치: $path" >&2
      exit 1
    fi
  done
}

export_pdf() {
  page=$1
  filename=$2
  validator=${3:-}

  TEMP_PDF=$(mktemp "$OUT_DIR/.roadmap-export.XXXXXX")
  rm -f "$TEMP_PDF"

  "$CHROME" \
    --headless \
    --disable-gpu \
    --no-pdf-header-footer \
    --run-all-compositor-stages-before-draw \
    --virtual-time-budget=2000 \
    --print-to-pdf="$TEMP_PDF" \
    "$BASE_URL/$page"

  if [ "$validator" = "roadmap" ]; then
    node "$PROJECT_ROOT/scripts/validate-roadmap-pdf.mjs" "$TEMP_PDF"
  elif [ ! -s "$TEMP_PDF" ]; then
    echo "생성된 PDF가 비어 있습니다: $filename" >&2
    exit 1
  fi
  mv -f "$TEMP_PDF" "$OUT_DIR/$filename"
  TEMP_PDF=""
}

case "$TARGET" in
  all)
    verify_roadmap_sources
    export_pdf "roadmap.html" "취업준비-운영-로드맵.pdf" roadmap
    export_pdf "weekly.html" "취업준비-주간실행보드.pdf"
    export_pdf "daily.html" "취업준비-데일리포커스보드.pdf"
    ;;
  roadmap)
    verify_roadmap_sources
    export_pdf "roadmap.html" "취업준비-운영-로드맵.pdf" roadmap
    ;;
  *)
    echo "지원하지 않는 PDF 대상입니다: $TARGET" >&2
    exit 2
    ;;
esac
