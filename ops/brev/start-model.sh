#!/usr/bin/env bash
set -Eeuo pipefail

WORKSPACE="${THINKLAB_AI_WORKSPACE:-$HOME/workspace/thinklab-ai}"
VENV="${WORKSPACE}/.venv"
LOG_DIR="${WORKSPACE}/logs"
MODEL="${BREV_MODEL:-Qwen/Qwen2.5-VL-3B-Instruct}"
PORT="${BREV_MODEL_PORT:-8000}"
PID_FILE="${WORKSPACE}/vllm.pid"
LOG_FILE="${LOG_DIR}/vllm.log"

mkdir -p "$LOG_DIR"

# vLLM may invoke helper binaries such as ninja during CUDA/JIT warmup.
# Keep the remote venv's scripts discoverable even when this script is run
# through `brev exec` without an activated shell.
export PATH="${VENV}/bin:${PATH}"

if [[ ! -x "${VENV}/bin/python" ]]; then
  printf 'Missing remote virtual environment: %s\n' "$VENV" >&2
  printf 'Run setup-remote.sh first.\n' >&2
  exit 1
fi

if pgrep -af "vllm.*${MODEL}" >/dev/null 2>&1; then
  printf 'vLLM for %s is already running:\n' "$MODEL"
  pgrep -af "vllm.*${MODEL}"
  exit 0
fi

if [[ -f "$PID_FILE" ]]; then
  old_pid="$(<"$PID_FILE")"
  if [[ "$old_pid" =~ ^[0-9]+$ ]] && [[ -r "/proc/${old_pid}/cmdline" ]] && grep -q 'vllm' "/proc/${old_pid}/cmdline"; then
    printf 'Existing vLLM process is recorded at PID %s.\n' "$old_pid"
    exit 0
  fi
  rm -f "$PID_FILE"
fi

printf '\n--- vLLM start %s ---\n' "$(date -Is)" >>"$LOG_FILE"

nohup "${VENV}/bin/python" -m vllm.entrypoints.openai.api_server \
  --model "$MODEL" \
  --host 0.0.0.0 \
  --port "$PORT" \
  --max-model-len 4096 \
  --gpu-memory-utilization 0.90 \
  >>"$LOG_FILE" 2>&1 < /dev/null &

pid=$!
printf '%s\n' "$pid" > "$PID_FILE"
printf 'Started vLLM PID %s for %s on 0.0.0.0:%s\n' "$pid" "$MODEL" "$PORT"
printf 'Log: %s\n' "$LOG_FILE"
