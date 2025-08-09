# 🛠️ Ferramental e Stack de Tecnologia do Projeto

Este documento é o guia central para todo o software, plugins e ferramentas do projeto. O objetivo é garantir um ambiente de desenvolvimento 100% consistente.

Para facilitar a instalação, **todos os instaladores e utilitários necessários estão incluídos neste repositório dentro da pasta `TOOLING/`**. Use os arquivos dessa pasta para garantir que você tenha as versões exatas usadas no curso. Os links externos são mantidos apenas como referência.

---

## 1. Software Essencial (Instalação Obrigatória)

Este é o software que **você deve instalar manualmente** no seu sistema, usando os arquivos fornecidos.

| Software | Propósito | Localização no Repositório | Link / Instruções |
| :--- | :--- | :--- | :--- |
| **Godot Engine** | O motor de jogo principal. | `TOOLING/installers/` | [godotengine.org](https://godotengine.org/download/) |
| **Visual Studio Code**| O editor de código padrão. | `TOOLING/installers/` | [code.visualstudio.com](https://code.visualstudio.com/) |
| **Git** | O sistema de controle de versão. | `TOOLING/installers/` | [git-scm.com/downloads](https://git-scm.com/downloads) |
| **Git LFS** | Para gerenciar arquivos grandes. | `TOOLING/installers/` | [git-lfs.github.com](https://git-lfs.github.com) |
| **Python** | Para scripts de automação e ML. | `TOOLING/installers/` | [python.org/downloads](https://python.org/downloads) |
| **Node.js** | Pré-requisito para o Gemini CLI. | `TOOLING/installers/` | [nodejs.org](https://nodejs.org/) |
| **Gemini CLI** | Interface de linha de comando IA. | N/A | `npm install -g @google/generative-ai/cli` |
| **Compilador C++** | Para compilar GDExtensions. | N/A | **Windows:** Instale o Visual Studio Community com a carga "Desenvolvimento para desktop com C++". |
| **ClangFormat** | Padroniza a formatação de C++. | `TOOLING/installers/` | [clang.llvm.org/docs/ClangFormat.html](https://clang.llvm.org/docs/ClangFormat.html) |

---

## 2. Software de Criação de Assets (Opcional)

Ferramentas para criar e editar assets. Os instaladores também estão na pasta `TOOLING/`.

### Arte Visual

| Software | Propósito | Localização no Repositório | Link / Instruções |
| :--- | :--- | :--- | :--- |
| **LibreSprite** | Editor de pixel art e animação. | `TOOLING/installers/` | [libresprite.github.io](https://libresprite.github.io/#!/downloads) |
| **Inkscape** | Editor de gráficos vetoriais. | `TOOLING/installers/` | [inkscape.org](https://inkscape.org/) |
| **Paint.NET** | Editor de imagens raster. | `TOOLING/installers/` | [getpaint.net](https://www.getpaint.net/download.html) |

### Música e Efeitos Sonoros

| Software | Propósito | Localização no Repositório | Link / Instruções |
| :--- | :--- | :--- | :--- |
| **Audacity** | Editor e gravador de áudio. | `TOOLING/installers/` | [audacityteam.org](https://www.audacityteam.org/download/) |
| **Bosca Ceoil** | Criação de música (simples e rápido). | `TOOLING/installers/` | [boscaceoil.net](https://boscaceoil.net/) |
| **LMMS** | Estação de trabalho de áudio (DAW). | `TOOLING/installers/` | [lmms.io/download](https://lmms.io/download) |
| **Cakewalk** | DAW profissional (gratuita). | `TOOLING/installers/` | [bandlab.com/products/cakewalk](https://www.bandlab.com/products/cakewalk) |
| **LABS (Spitfire Audio)** | Plugin VST de instrumentos. | `TOOLING/installers/` | [labs.spitfireaudio.com](https://labs.spitfireaudio.com/) |
| **Vital** | Plugin VST de sintetizador. | `TOOLING/installers/` | [vital.audio/#get-vital](https://vital.audio/#get-vital) |

---

## 3. Extensões do VS Code (Recomendadas)

O VS Code sugerirá a instalação automática ao abrir o projeto. Caso prefira a instalação manual/offline, os arquivos `.vsix` estão disponíveis.

**Localização dos Arquivos:** `TOOLING/vscode-extensions/`

### Ferramentas Gerais e Qualidade de Código
- **Godot Tools**
- **Prettier - Code formatter**
- **Markdown All in One**
- **markdownlint**
- **Markdown Preview Enhanced**
- **Code Spell Checker**
- **GitLens**
- **Gutter Preview**
- **Conventional Commits**
- **Document Writer**
- **GitHub Actions**

### Machine Learning e Multiplayer
- **Python (ms-python.python)**
- **Black Formatter (ms-python.black-formatter)**
- **Mypy Type Checker (ms-python.mypy-type-checker)**
- **C/C++ (ms-vscode.cpptools)**
- **Netron**
- **REST Client**
- **Data Preview**

### Tema e UI (Preferência do Autor)
- **Min Theme**
- **Symbols**
- **Apc Extension**
- **Portuguese (Brazil) Language Pack**

---

## 4. Plugins do Godot (Incluídos no Repositório)

Estes plugins são adicionados ao projeto e versionados. O arquivo `.zip` original fica guardado para referência.

| Plugin | Propósito | Localização no Repositório | Status |
| :--- | :--- | :--- | :--- |
| **GUT (Godot Unit Test)** | Framework para testes. | `TOOLING/godot-plugins/` | **Instalado.** Requer ativação no Editor. |

---

## 5. Ferramentas de Linha de Comando (Configuradas no Projeto)

Ferramentas configuradas no projeto e usadas via terminal.

| Ferramenta | Propósito | Arquivo de Configuração |
| :--- | :--- | :--- |
| **Bibliotecas Python** | Dependências para ML e scripts. | `requirements.txt` |
