#!/usr/bin/env bash
set -Eeuo pipefail

WORKSPACE="${THINKLAB_AI_WORKSPACE:-$HOME/workspace/thinklab-ai}"
MODEL="${BREV_MODEL:-Qwen/Qwen2.5-VL-3B-Instruct}"
PID_FILE="${WORKSPACE}/vllm.pid"

stopped=0

if [[ -f "$PID_FILE" ]]; then
  pid="$(<"$PID_FILE")"
  if [[ "$pid" =~ ^[0-9]+$ ]] && [[ -r "/proc/${pid}/cmdline" ]] && grep -q 'vllm' "/proc/${pid}/cmdline" && tr '\0' ' ' < "/proc/${pid}/cmdline" | grep -Fq "$MODEL"; then
    kill -TERM "$pid"
    printf 'Sent TERM to vLLM PID %s.\n' "$pid"
    stopped=1
  fi
  rm -f "$PID_FILE"
fi

while read -r pid; do
  [[ -z "$pid" ]] && continue
  kill -TERM "$pid"
  printf 'Sent TERM to vLLM PID %s.\n' "$pid"
  stopped=1
done < <(pgrep -f "vllm.*${MODEL}" || true)

if [[ "$stopped" -eq 0 ]]; then
  printf 'No vLLM process for %s was found.\n' "$MODEL"
fi
