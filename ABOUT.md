# 🚀 processo-seletivo-2025-Metta

![Version](https://img.shields.io/badge/version-v1.0.0-blue.svg) ![Status](https://img.shields.io/badge/status-complete-brightgreen.svg) ![License](https://img.shields.io/badge/license-MIT-green.svg)


> Aplicação para detecção de pessoas em vídeos, com marcação de bounding boxes para identificação visual e quantificação por frame.

---

## 📚 Sobre

Aplicação backend para análise e processamento de vídeos, utilizando modelos de visão computacional para detecção precisa de pessoas. O sistema realiza extração de frames, marcação visual de objetos detectados com bounding boxes e geração de vídeos anotados para aplicações de monitoramento e análise.

---

## 📌 Funções das técnologias no projeto
- 📙 JavaScript
#### Linguagem principal de desenvolvimento. Usada para escrever toda a lógica do projeto, desde leitura de arquivos até processamento de imagens e execução de modelos de IA.
##

- ⚙️ Node.js | v20.19.2
#### Ambiente de execução JavaScript no servidor. Permite rodar o código JavaScript fora do navegador.
##

- 📂 path
#### Módulo nativo do Node.js. Usado para manipular e resolver caminhos de arquivos e diretórios.
##

- 📂 fs
#### File System (Sistema de Arquivos) do Node.js. Permite criar, ler, escrever e excluir arquivos e pastas
##

- 📂 url / fileURLToPath
#### url: Trabalha com URLs. | fileURLToPath: Converte uma URL de arquivo (file://) para um caminho de arquivo tradicional no sistema (string com o path local).
##

- 📦 @tensorflow-models/coco-ssd | v2.2.3
#### Modelo pré-treinado de IA para detecção de objetos.
##

- 📦 @tensorflow/tfjs | v4.22.0
#### Biblioteca base para rodar TensorFlow em JavaScript. É o núcleo que permite executar o modelo coco-ssd dentro do Node.js.
##

- 📦 canvas | v3.1.1
#### Permite abrir, manipular e desenhar em imagens dentro do Node.js. No projeto, é usado para desenhar as bounding boxes (caixas delimitadoras) e as legendas de identificação sobre os objetos detectados pela IA.
##

- 📦 fluent-ffmpeg | v2.1.3
#### Usado para extrair frames de vídeos, converter formatos ou gerar um vídeo a partir de imagens processadas.
##

- 📦 sharp | v0.34.2
#### Permite redimensionar, cortar, converter e salvar imagens de forma otimizada, sendo útil para preparar as imagens antes do processamento.

---

## 📋 Planejamento e Estruturação no Notion
https://sand-teller-0b6.notion.site/2176eeaa4cea808a99d9ffc7b59fd55c?v=2176eeaa4cea802581f1000c23031a54&source=copy_link

---

## 📂 Estrutura do projeto

```bash
📦 src
├── config/
├── controllers/
├── middlewares/
├── models/
├── routes/
├── services/
└── utils/
```
