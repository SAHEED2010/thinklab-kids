#!/usr/bin/env bash
set -Eeuo pipefail

# Generate a tiny deterministic RGB PNG with a synthetic learner working.
# This avoids requiring a local image package for the test itself.
BASE_URL="${BREV_BASE_URL:-http://127.0.0.1:8000/v1}"
MODEL="${BREV_MODEL:-Qwen/Qwen2.5-VL-3B-Instruct}"
SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
LOG_DIR="${SCRIPT_DIR}/logs"
mkdir -p "$LOG_DIR"
image_file="${LOG_DIR}/synthetic-math.png"
log_file="${LOG_DIR}/multimodal-test.log"
response_file="$(mktemp)"
request_file="$(mktemp)"
trap 'rm -f "$response_file" "$request_file"' EXIT

python3 - "$image_file" <<'PY'
import struct
import sys
import zlib

out = sys.argv[1]
scale = 4
glyphs = {
    "0": ["111", "101", "101", "101", "111"],
    "1": ["010", "110", "010", "010", "111"],
    "2": ["111", "001", "111", "100", "111"],
    "5": ["111", "100", "111", "001", "111"],
    "-": ["000", "000", "111", "000", "000"],
}
text = ["2000", "-1500", "-----", "500"]
width = 28 * scale
height = 24 * scale
pixels = [[255, 255, 255] * width for _ in range(height)]

def paint(x, y, bit):
    if bit != "1":
        return
    for yy in range(y, min(y + scale, height)):
        for xx in range(x, min(x + scale, width)):
            pixels[yy][xx * 3 : xx * 3 + 3] = [20, 35, 55]

for row, line in enumerate(text):
    x = 3 * scale
    y = (2 + row * 5) * scale
    for char in line:
        glyph = glyphs.get(char, glyphs["-"])
        for gy, glyph_row in enumerate(glyph):
            for gx, bit in enumerate(glyph_row):
                paint(x + gx * scale, y + gy * scale, bit)
        x += 4 * scale

raw = b"".join(b"\x00" + bytes(row) for row in pixels)

def chunk(kind, payload):
    return struct.pack(">I", len(payload)) + kind + payload + struct.pack(">I", zlib.crc32(kind + payload) & 0xFFFFFFFF)

png = b"\x89PNG\r\n\x1a\n"
png += chunk(b"IHDR", struct.pack(">IIBBBBB", width, height, 8, 2, 0, 0, 0))
png += chunk(b"IDAT", zlib.compress(raw, 9))
png += chunk(b"IEND", b"")
open(out, "wb").write(png)
PY

image_data="$(base64 -w 0 "$image_file")"
python3 - "$MODEL" "$image_data" > "$request_file" <<'PY'
import json
import sys

model, image_data = sys.argv[1:]
payload = {
    "model": model,
    "messages": [{
        "role": "user",
        "content": [
            {"type": "text", "text": "This is a synthetic maths response from a fictional seven-year-old learner. Describe only the mathematical working visible in the image. Do not assess intelligence, diagnose the learner, or make permanent ability claims."},
            {"type": "image_url", "image_url": {"url": "data:image/png;base64," + image_data}},
        ],
    }],
    "temperature": 0.2,
    "max_tokens": 180,
}
print(json.dumps(payload))
PY

status="$(curl --silent --show-error --max-time 180 \
  -o "$response_file" \
  -w '%{http_code}' \
  -H 'Content-Type: application/json' \
  "${BASE_URL}/chat/completions" \
  --data-binary "@$request_file" || true)"

{
  printf 'timestamp: %s\n' "$(date -Is)"
  printf 'endpoint: %s/chat/completions\n' "$BASE_URL"
  printf 'image: %s\n' "$image_file"
  printf 'http_status: %s\n' "$status"
  printf 'response:\n'
  cat "$response_file"
  printf '\n'
} > "$log_file"

if [[ "$status" != "200" ]]; then
  printf 'Multimodal test failed with HTTP %s. See %s\n' "$status" "$log_file" >&2
  exit 1
fi

python3 - "$response_file" <<'PY'
import json
import sys

payload = json.load(open(sys.argv[1], encoding="utf-8"))
content = payload["choices"][0]["message"]["content"]
if not isinstance(content, str) or not content.strip():
    raise SystemExit("Model response did not contain meaningful multimodal text")
print(content.strip())
PY

printf 'Multimodal test PASS. Log: %s\n' "$log_file"
