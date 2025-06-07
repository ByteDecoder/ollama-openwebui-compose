# Deepseek-R1 Local Deployment with Docker & Web UI

![Deepseek-R1 Web UI Screenshot](article1.jpg)

This project provides a ready-to-use Docker Compose setup for running the DeepSeek-R1 language model locally, along with a simple web-based user interface.

## Features

- **Local LLM Inference:** Run DeepSeek-R1 models on your own hardware using [Ollama](https://ollama.com/).
- **Web UI:** Interact with the model via a browser-based interface in the `web/` directory.
- **Easy Model Management:** Pull and manage model versions with Docker commands.

## Quick Start

1. **Start the Ollama Service**

   ```bash
   docker compose up -d ollama
   docker compose up -d web
   ```

2. **Pull the DeepSeek-R1 Model**

   Choose your desired model size (e.g., `1.5b`):

   ```bash
   docker compose exec ollama ollama pull deepseek-r1:1.5b
   ```

3. **Access the Web UI**

   <http://localhost:6001>

   Open [web/index.html](web/index.html) in your browser to interact with the model.

## Project Structure

```bash
.
├── docker-compose.yml         # Docker Compose configuration for Ollama
├── ollama-models/             # Model storage (keys, manifests, blobs)
│   ├── id_ed25519
│   ├── id_ed25519.pub
│   └── models/
│       ├── blobs/             # Model weights and data
│       └── manifests/         # Model manifests
├── web/                       # Web UI files
│   ├── index.html
│   ├── ollama.js
│   ├── showdown.min.js
│   └── style.css
└── README.md                  # Project documentation
```

## Notes

- Model files are stored in `ollama-models/`. You can add or remove models as needed.
- The web UI is static and communicates with the Ollama backend.
- For advanced configuration, edit [docker-compose.yml](docker-compose.yml).

## Troubleshoting

Check Ollama  is runing on <http://localhost:11434>
Web UI is running on <http://localhost:6001>

## References

- [Ollama Documentation](https://github.com/jmorganca/ollama)
- [DeepSeek-R1 Model Card](https://huggingface.co/deepseek-ai/DeepSeek-R1)

<https://dev.to/savvasstephnds/run-deepseek-locally-using-docker-2pdm>
<https://platzi.com/blog/deepseek-r1-instalar-local/>

---
