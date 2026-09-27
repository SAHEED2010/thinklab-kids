# ThinkLab Kids NVIDIA Brev backend

This directory contains the reproducible infrastructure checks for the existing NVIDIA Brev VM and the live NVIDIA/Qwen path used by ThinkLab's hackathon demo.

## Architecture

ThinkLab → localhost OpenAI-compatible API → Brev SSH tunnel → NVIDIA A10G → vLLM → `Qwen/Qwen2.5-VL-3B-Instruct`

The Jupyter Secure Link is not used as the application API. Development uses Brev's SSH port forwarding.

## First-time setup

Run these commands inside WSL Ubuntu:

```bash
export PATH="$HOME/.local/bin:$PATH"
brev login
brev org set codeddevs.team-4ada03-9gs7
brev refresh
```

The scripts resolve the actual running A10G instance from `brev ls --json`; they do not assume whether its displayed name is `hinklab-vlm` or `thinklab-vlm`.

## Start workflow

After the Brev GPU is restarted:

```bash
brev refresh
INSTANCE="$(./ops/brev/status.sh --name-only)"
brev exec "$INSTANCE" @ops/brev/setup-remote.sh 2>&1 | tee ops/brev/logs/remote-setup.log
brev exec "$INSTANCE" @ops/brev/start-model.sh
./ops/brev/status.sh
./ops/brev/port-forward.sh
```

Keep the port-forward command running in its own WSL terminal. It forwards local `127.0.0.1:8000` to remote `127.0.0.1:8000`; if local port 8000 is occupied, it automatically tries 8001. Set `BREV_LOCAL_PORT` to choose another local port explicitly.

Once the tunnel is running:

```bash
./ops/brev/smoke-test.sh
./ops/brev/multimodal-test.sh
```

The safe development endpoint is only the local URL, for example `http://127.0.0.1:8000/v1`. Do not expose vLLM publicly without authentication.

## Operations

```bash
./ops/brev/status.sh
INSTANCE="$(./ops/brev/status.sh --name-only)"
brev exec "$INSTANCE" @ops/brev/start-model.sh
brev exec "$INSTANCE" @ops/brev/stop-model.sh
```

`stop-model.sh` stops only the matching vLLM process. It does not stop, delete, reset, or change the Brev environment.

Remote model logs are stored at `$HOME/workspace/thinklab-ai/logs/vllm.log`. Local command logs are written under `ops/brev/logs/`; inspect them for credentials before sharing or committing them.

## Billing and safety

The existing Brev A10G costs approximately `$1.50/hour` while running. Stop the environment in Brev when it is no longer needed. These scripts never create a second environment, provision a GPU, delete the environment, or store API keys.

## ThinkLab application integration

The ThinkLab server uses `NvidiaQwenLearningAIProvider` through the `LearningAIProvider` contract. Set these values in `.env.local` while the tunnel is running:

```dotenv
THINKLAB_AI_PROVIDER=qwen
THINKLAB_AI_BASE_URL=http://127.0.0.1:8000/v1
THINKLAB_AI_MODEL=Qwen/Qwen2.5-VL-3B-Instruct
```

The browser remains unaware of Qwen or Brev. If the endpoint is unavailable, the API routes use deterministic local mission, feedback, adaptation, and Learning Evidence fallbacks. The model's multimodal capability has been verified with the synthetic image test, but image upload is outside the current Zara demo scope.

## Yusuf's demo commands

From WSL at the repository root:

```bash
brev refresh
INSTANCE="$(./ops/brev/status.sh --name-only)"
brev exec "$INSTANCE" @ops/brev/setup-remote.sh 2>&1 | tee ops/brev/logs/remote-setup.log
brev exec "$INSTANCE" @ops/brev/start-model.sh
./ops/brev/status.sh
./ops/brev/port-forward.sh
```

Keep the port-forward command running in its own terminal. In another terminal, with the same repository environment configured, start ThinkLab:

```bash
npm run dev
```

Use `./ops/brev/smoke-test.sh` to check text connectivity and `./ops/brev/multimodal-test.sh` to re-run the synthetic visual capability check. Stop only the remote model when finished with `brev exec "$INSTANCE" @ops/brev/stop-model.sh`, then stop the Brev instance through its normal dashboard workflow.
