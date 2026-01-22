# LLM + Ollama + Open WebUI - Docker Compose Stack

![Open WebUI Screenshot](article1.jpg)

A complete Docker Compose setup for running local Large Language Models (LLMs) with [Ollama](https://ollama.com/) and [Open WebUI](https://github.com/open-webui/open-webui). This stack provides a production-ready environment for self-hosted AI inference with GPU acceleration support.

## Features

- **🚀 Ollama Backend:** Run any Ollama-supported LLM locally (DeepSeek, Llama, Mistral, Gemma, and more)
- **🎨 Open WebUI:** Modern, feature-rich web interface with ChatGPT-like experience
- **🐳 Docker Compose:** One-command deployment with persistent storage
- **🎮 GPU Support:** NVIDIA GPU acceleration for faster inference
- **📦 Easy Model Management:** Pull and switch between models instantly
- **💾 Persistent Data:** Volume mounts for models and conversation history

## Quick Start

### 1. Start the Services

```bash
docker compose up -d
```

This will start:

- **Ollama** service on port `11434`
- **Open WebUI** on port `6002`
- **Simple Web UI** (custom) on port `6001`

### 2. Pull Your First Model

```bash
# Lightweight models (good for testing)
docker exec ollama ollama pull deepseek-r1:1.5b
docker exec ollama ollama pull llama3.2:3b

# More capable models
docker exec ollama ollama pull deepseek-r1:7b
docker exec ollama ollama pull mistral:7b
docker exec ollama ollama pull gemma2:9b
```

### 3. Access the Web Interfaces

- **Open WebUI** (Recommended): <http://localhost:6002>
- **Simple Custom UI**: <http://localhost:6001>

### 4. Monitor GPU Usage

```bash
# Check NVIDIA GPU status
docker exec -it ollama nvidia-smi

# Check active model processes
docker exec -it ollama ollama ps
```

## Recommended Models for NVIDIA RTX 3060 (6GB)

| Model | Size | Performance | Use Case |
|-------|------|-------------|----------|
| **Llama 3.2 (3B)** | ~2.0GB | ⚡ Blazing Fast | General chat, quick tasks |
| **DeepSeek-R1 (1.5B)** | ~1.0GB | ⚡ Blazing Fast | Reasoning, coding |
| **Mistral (7B)** | ~4.1GB | 🚀 Fast | Advanced conversations |
| **Llama 3.1 (8B)** | ~4.7GB | 🚀 Fast | General purpose |
| **Gemma 2 (9B)** | ~5.4GB | ✅ Good | Near max VRAM usage |
| **Command R (20B+)** | 20GB+ | 🐌 Slow | Requires CPU/RAM fallback |

### Additional Recommended Models

```bash
# Coding specialists
docker exec ollama ollama pull deepseek-coder:1.3b
docker exec ollama ollama pull deepseek-coder:6.7b

# Multilingual
docker exec ollama ollama pull qwen2.5:7b

# Compact alternatives
docker exec ollama ollama pull phi3:mini
docker exec ollama ollama pull gemma:2b
```

## Project Structure

```bash
.
├── docker-compose.yml         # Main orchestration file
├── web/                       # Simple custom web UI
│   ├── index.html
│   ├── ollama.js
│   ├── showdown.min.js
│   └── style.css
├── ollama-models/             # Ollama model storage (bind mount)
│   ├── models/
│   │   ├── blobs/            # Model weights and layers
│   │   └── manifests/        # Model metadata
│   └── keys/                 # SSH keys (if needed)
└── open-webui/                # Open WebUI data (bind mount)
    ├── cache/
    ├── uploads/
    └── vector_db/
```

## Services

### Ollama (Port 11434)

- Container: `ollama`
- Image: `ollama/ollama:latest`
- GPU: NVIDIA GPU acceleration enabled
- API: <http://localhost:11434>

### Open WebUI (Port 6002)

- Container: `open-webui`
- Image: `ghcr.io/open-webui/open-webui:main`
- Interface: <http://localhost:6002>
- Features: Chat history, model switching, document upload, RAG support

### Simple Web UI (Port 6001)

- Container: `simple-web`
- Custom lightweight interface for direct Ollama interaction
- Interface: <http://localhost:6001>

## Common Commands

```bash
# Start services
docker compose up -d

# Stop services
docker compose down

# View logs
docker compose logs -f

# List downloaded models
docker exec ollama ollama list

# Remove a model
docker exec ollama ollama rm <model-name>

# Access Ollama shell
docker exec -it ollama bash

# Restart services
docker compose restart
```

## Troubleshooting

### GPU Not Detected

```bash
# Verify NVIDIA Docker runtime
docker run --rm --gpus all nvidia/cuda:12.0.0-base-ubuntu22.04 nvidia-smi
```

### Port Already in Use

Edit [docker-compose.yml](docker-compose.yml) and change the port mappings:

```yaml
ports:
  - "YOUR_PORT:8080"  # Change YOUR_PORT
```

### Models Not Persisting

Check that Docker volumes are properly created:

```bash
docker volume ls | grep ollama
```

## Requirements

- Docker & Docker Compose
- NVIDIA GPU (optional, but recommended for better performance)
- NVIDIA Container Toolkit (for GPU support)
- 8GB+ RAM recommended
- Storage: ~5-10GB per model

## License

This is a Docker Compose configuration. Please refer to the individual project licenses:

- [Ollama](https://github.com/ollama/ollama)
- [Open WebUI](https://github.com/open-webui/open-webui)

## Contributing

Feel free to open issues or submit pull requests for improvements!

---

**⭐ If you find this useful, please star the repository!**

## Notes

- Model files are stored in `ollama-models/`. You can add or remove models as needed.
- The web UI is static and communicates with the Ollama backend.
- For advanced configuration, edit [docker-compose.yml](docker-compose.yml).

## Troubleshoting

- Check Ollama  is runing on <http://localhost:11434>
- Custom Web UI is running on <http://localhost:6001>
- Open Web UI is running on <http://localhost:6002>
