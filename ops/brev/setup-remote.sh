#!/usr/bin/env bash
set -Eeuo pipefail

# Run on the existing Brev VM with:
#   brev exec <resolved-instance> @ops/brev/setup-remote.sh

WORKSPACE="${THINKLAB_AI_WORKSPACE:-$HOME/workspace/thinklab-ai}"
VENV="${WORKSPACE}/.venv"
LOG_DIR="${WORKSPACE}/logs"

mkdir -p "$WORKSPACE" "$LOG_DIR"

if [[ ! -x "${VENV}/bin/python" || ! -x "${VENV}/bin/pip" || ! -f "${VENV}/bin/activate" ]]; then
  if [[ -e "$VENV" ]]; then
    rm -rf -- "$VENV"
  fi
  if ! python3 -m venv --system-site-packages "$VENV"; then
    if ! command -v sudo >/dev/null 2>&1; then
      printf 'python3-venv is required and sudo is unavailable.\n' >&2
      exit 1
    fi
    sudo apt-get update
    sudo DEBIAN_FRONTEND=noninteractive apt-get install -y python3-venv
    python3 -m venv --system-site-packages "$VENV"
  fi
fi

# shellcheck disable=SC1091
source "${VENV}/bin/activate"
python -m pip install --upgrade pip setuptools wheel
python -m pip install vllm Pillow requests

python - <<'PY'
import sys

import torch

print(f"python: {sys.version}")
print(f"torch: {torch.__version__}")
print(f"cuda_available: {torch.cuda.is_available()}")
if torch.cuda.is_available():
    print(f"cuda_device: {torch.cuda.get_device_name(0)}")
else:
    print("cuda_device: NO CUDA")
PY

python -c "import vllm; print(f'vllm: {vllm.__version__}')"
