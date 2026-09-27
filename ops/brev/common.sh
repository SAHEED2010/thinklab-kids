#!/usr/bin/env bash
set -Eeuo pipefail

# Shared local helpers for the Brev workflow. This file never contains or prints
# credentials. The active Brev organization can be overridden when needed.

BREV_SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
BREV_LOG_DIR="${BREV_SCRIPT_DIR}/logs"
BREV_ORG="${BREV_ORG:-codeddevs.team-4ada03-9gs7}"
BREV_MODEL="${BREV_MODEL:-Qwen/Qwen2.5-VL-3B-Instruct}"

mkdir -p "$BREV_LOG_DIR"

require_brev() {
  if ! command -v brev >/dev/null 2>&1; then
    export PATH="${HOME}/.local/bin:${PATH}"
  fi
  command -v brev >/dev/null 2>&1 || {
    printf 'Brev CLI is not installed or is not on PATH.\n' >&2
    printf 'Install it in WSL with the official Brev installer.\n' >&2
    return 127
  }
}

# Resolve the one currently-running A10G instance from Brev's structured list.
# This deliberately does not assume the instance's displayed name.
resolve_instance() {
  require_brev

  local listing
  listing="$(NO_COLOR=1 brev ls --all --org "$BREV_ORG" --json)" || {
    printf 'Unable to list Brev instances for organization %s.\n' "$BREV_ORG" >&2
    return 1
  }

  python3 -c '
import json
import sys

try:
    payload = json.load(sys.stdin)
except json.JSONDecodeError as exc:
    raise SystemExit(f"Brev returned invalid JSON: {exc}")

records = []
seen = set()

def visit(value):
    if isinstance(value, dict):
        name = value.get("name") or value.get("instanceName") or value.get("machineName")
        if name and (value.get("status") or value.get("state")):
            key = (str(name), str(value.get("id", "")))
            if key not in seen:
                seen.add(key)
                records.append(value)
        for child in value.values():
            visit(child)
    elif isinstance(value, list):
        for child in value:
            visit(child)

visit(payload)

candidates = []
for item in records:
    status = str(item.get("status") or item.get("state") or "").upper()
    if status != "RUNNING":
        continue
    blob = json.dumps(item, sort_keys=True).lower()
    if "a10g" not in blob:
        continue
    name = item.get("name") or item.get("instanceName") or item.get("machineName")
    if name:
        candidates.append(str(name))

candidates = sorted(set(candidates))
if len(candidates) == 1:
    print(candidates[0])
elif not candidates:
    raise SystemExit("No currently-running NVIDIA A10G instance was found")
else:
    raise SystemExit("Multiple running A10G instances found; refusing to guess: " + ", ".join(candidates))
' <<<"$listing"
}

require_brev
