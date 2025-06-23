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

- 📦 express | v4.19.2  
#### Framework web minimalista para Node.js. Usado para criar o servidor HTTP responsável por receber requisições, processar os vídeos enviados e devolver os resultados para o frontend.  
##

- 📦 multer | v1.4.5-lts.1  
#### Middleware para manipulação de uploads de arquivos em formulários HTML. No projeto, é utilizado para receber o vídeo enviado pelo usuário através de um formulário multipart/form-data.  
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
## 

- 📦 chart.js | v4.4.1
#### Biblioteca para geração de gráficos. Utilizada para exibir visualmente a quantidade de pessoas detectadas por frame.

---

## 📋 Planejamento e Estruturação no Notion
https://sand-teller-0b6.notion.site/2176eeaa4cea808a99d9ffc7b59fd55c?v=2176eeaa4cea802581f1000c23031a54&source=copy_link

---

## 📂 Estrutura do projeto

```bash
├── node_modules/                  # Dependências do projeto
├── src/                           # Código-fonte principal
│   ├── helpers/                   # Funções utilitárias
│   │   ├── clear-output-directory.js        # Limpa as pastas de saída antes de uma nova execução
│   │   ├── create-video-marked.js           # Gera um vídeo final com os frames marcados com as detecções da IA
│   │   ├── extract-frames-async.js          # Extrai frames de vídeos de forma assíncrona para análise
│   │   └── write-json.js                    # Função para salvar dados em arquivos JSON
│   │
│   └── output_results/            # Diretório onde ficam os resultados gerados
│       ├── frames/                # Frames extraídos do vídeo original
│       ├── frames_marked/         # Frames com as bounding boxes e rótulos desenhados
│       ├── video_marked/          # Vídeo final gerado com as marcações da IA
│       ├── alert.json             # array de objetos para todos os frames do vídeo. 
│       └── history.json           # array de objetos para os frames onde a quantidade de pessoas é igual ou maior que um limiar de corte informado.
│
├── public/                        # Arquivos públicos
│   └── main.js                    # Ponto de entrada do script
│
├── .gitignore                     # Arquivos e pastas ignorados pelo Git
├── ABOUT.md                       # Documentação principal do projeto
├── package-lock.json              # Lockfile das dependências
├── package.json                   # Configuração do projeto Node.js
└── README.md                      # Documentação para rodar o projeto

```

---

## 🖼️ Imagens UI/UX

<p align="center">
  <img src="https://github.com/user-attachments/assets/cb8fb784-b18a-42f6-aca3-2d3e8da5954d" alt="Captura de tela 4" width="45%"/>
  <img src="https://github.com/user-attachments/assets/a8d8d535-45e1-4e5c-bf81-5a2554dddb50" alt="Captura de tela 3" width="45%"/>
  <img src="https://github.com/user-attachments/assets/861c75ea-25a5-4148-b2c8-130f66f98801" alt="Captura de tela 7" width="45%"/>
  <img src="https://github.com/user-attachments/assets/41edf02e-119a-4d66-9fc0-a20a67df4e7a" alt="Captura de tela 6" width="45%"/>
  <img src="https://github.com/user-attachments/assets/9d18f2fe-73b2-4417-a9bb-f38b90a49df9" alt="Captura de tela 2" width="45%"/>
</p>

---

## 📤 Outputs gerados pelo Projeto (Exemplos)

#### 📄 alert.json 
![Captura de tela 2025-06-22 171155](https://github.com/user-attachments/assets/8f04c975-595c-4e70-9a8d-299560a28126)

#### 📄 history.json 
![Captura de tela 2025-06-22 171227](https://github.com/user-attachments/assets/cf3a38a3-459e-4edf-b990-f9651dc1cbf8)

#### ▶️ Video com bounding
![Captura de tela 2025-06-22 171328](https://github.com/user-attachments/assets/ec790ba5-be44-4562-8e3b-c278758c5e30)

