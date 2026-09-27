#!/usr/bin/env bash
set -Eeuo pipefail

# shellcheck disable=SC1091
source "$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)/common.sh"

instance="$(resolve_instance)"
local_port="${BREV_LOCAL_PORT:-8000}"

port_is_free() {
  python3 - "$1" <<'PY'
import socket
import sys

port = int(sys.argv[1])
with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as sock:
    sock.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
    raise SystemExit(0 if sock.connect_ex(("127.0.0.1", port)) != 0 else 1)
PY
}

if ! port_is_free "$local_port"; then
  if [[ "$local_port" == "8000" ]] && port_is_free 8001; then
    local_port=8001
  else
    printf 'Local port %s is already in use. Set BREV_LOCAL_PORT to an unused port.\n' "$local_port" >&2
    exit 1
  fi
fi

log_file="${BREV_LOG_DIR}/port-forward.log"
printf 'Forwarding localhost:%s to %s:127.0.0.1:8000\n' "$local_port" "$instance"
printf 'Local endpoint: http://127.0.0.1:%s/v1\n' "$local_port"
printf 'Log: %s\n' "$log_file"

brev port-forward "$instance" --port "${local_port}:8000" 2>&1 | tee "$log_file"
