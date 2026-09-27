#!/usr/bin/env bash
set -Eeuo pipefail

# shellcheck disable=SC1091
source "$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)/common.sh"

name_only=0
if [[ "${1:-}" == "--name-only" ]]; then
  name_only=1
fi

instance="$(resolve_instance)"
if [[ "$name_only" -eq 1 ]]; then
  printf '%s\n' "$instance"
  exit 0
fi

log_file="${BREV_LOG_DIR}/status.log"
{
  printf 'timestamp: %s\n' "$(date -Is)"
  printf 'organization: %s\n' "$BREV_ORG"
  printf 'resolved_instance: %s\n' "$instance"
  printf 'brev_version: '
  brev --version
  printf 'instance_listing:\n'
  NO_COLOR=1 brev ls --all --org "$BREV_ORG" --json
  printf '\nremote_gpu:\n'
  brev exec "$instance" "nvidia-smi --query-gpu=name,driver_version,memory.total --format=csv,noheader"
  printf '\nremote_cuda:\n'
  brev exec "$instance" "python3 -c \"import torch; print(torch.__version__); print(torch.cuda.is_available()); print(torch.cuda.get_device_name(0) if torch.cuda.is_available() else 'NO CUDA')\""
  printf '\nremote_vllm_processes:\n'
  brev exec "$instance" "pgrep -af '[v]llm' || true"
  printf '\nremote_port_8000:\n'
  brev exec "$instance" "ss -ltn | awk '\$4 ~ /:8000$/ {print}'"
  printf '\nremote_models_health:\n'
  brev exec "$instance" "curl --fail --silent --max-time 10 http://127.0.0.1:8000/v1/models >/dev/null && echo PASS || echo FAIL"
} 2>&1 | tee "$log_file"

printf 'Status log: %s\n' "$log_file"
