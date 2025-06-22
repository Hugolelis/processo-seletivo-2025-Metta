# 🚀 processo-seletivo-2025-Metta

![Version](https://img.shields.io/badge/version-v1.0.0-blue.svg) ![Status](https://img.shields.io/badge/status-complete-brightgreen.svg) ![License](https://img.shields.io/badge/license-MIT-green.svg)


> Aplicação para detecção de pessoas em vídeos, com marcação de bounding boxes para identificação visual e quantificação por frame.

---

## 🧰 Tech Stack
- 📙 JavaScript
- ⚙️ Node.js | v20.19.2
- 📂 path 
- 📂 fs 
- 📂 url / fileURLToPath 
- 📦 @tensorflow-models/coco-ssd | v2.2.3
- 📦 @tensorflow/tfjs | v4.22.0
- 📦 canvas | v3.1.1 
- 📦 fluent-ffmpeg | v2.1.3
- 📦 sharp | v0.34.2

---

## ⚠️ Configuração do FFmpeg no Windows
1. Baixe o FFmpeg:
   - Baixe o FFmpeg em https://ffmpeg.org/download.html
   - Extraia o FFmpeg:
   - Extraia o arquivo ZIP em uma pasta de fácil acesso (exemplo: C:\ffmpeg).
   - Adicione o FFmpeg ao PATH
   - Em Variáveis de Sistema, encontre a variável chamada Path, clique em Editar e adicione o seguinte caminho (ajuste de acordo com onde você extraiu):
    ```bash
      C:\ffmpeg\bin
    ```

---

## 🖥️ Instruções para Rodar

### 🔧 1. Clone the Repository

```bash
git clone https://github.com/Hugolelis/processo-seletivo-2025-Metta.git
cd processo-seletivo-2025-Metta
```

### 📦 2. Install Dependencies

```bash
npm install
```

### ▶️ 3. Start the Server

```bash
npm start
```

