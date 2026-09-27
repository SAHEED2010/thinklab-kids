#!/usr/bin/env bash
set -Eeuo pipefail

# This test intentionally targets only the secure local tunnel.
BASE_URL="${BREV_BASE_URL:-http://127.0.0.1:8000/v1}"
MODEL="${BREV_MODEL:-Qwen/Qwen2.5-VL-3B-Instruct}"
SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
LOG_DIR="${SCRIPT_DIR}/logs"
mkdir -p "$LOG_DIR"
log_file="${LOG_DIR}/smoke-test.log"
response_file="$(mktemp)"
trap 'rm -f "$response_file"' EXIT

request="$(python3 - "$MODEL" <<'PY'
import json
import sys

print(json.dumps({
    "model": sys.argv[1],
    "messages": [{
        "role": "user",
        "content": "Create one short Nigerian market maths challenge for a seven-year-old. Do not reveal the answer. Keep it under 80 words.",
    }],
    "temperature": 0.2,
    "max_tokens": 120,
}))
PY
)"

status="$(curl --silent --show-error --max-time 180 \
  -o "$response_file" \
  -w '%{http_code}' \
  -H 'Content-Type: application/json' \
  "${BASE_URL}/chat/completions" \
  --data "$request" || true)"

{
  printf 'timestamp: %s\n' "$(date -Is)"
  printf 'endpoint: %s/chat/completions\n' "$BASE_URL"
  printf 'request: %s\n' "$request"
  printf 'http_status: %s\n' "$status"
  printf 'response:\n'
  cat "$response_file"
  printf '\n'
} > "$log_file"

if [[ "$status" != "200" ]]; then
  printf 'Text smoke test failed with HTTP %s. See %s\n' "$status" "$log_file" >&2
  exit 1
fi

python3 - "$response_file" <<'PY'
import json
import sys

payload = json.load(open(sys.argv[1], encoding="utf-8"))
content = payload["choices"][0]["message"]["content"]
if not isinstance(content, str) or not content.strip():
    raise SystemExit("Model response did not contain meaningful text")
print(content.strip())
PY

printf 'Text smoke test PASS. Log: %s\n' "$log_file"
