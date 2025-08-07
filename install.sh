#!/bin/bash

# Script para instalar ou atualizar a personalidade "cafe-gemini" e suas dependencias.

# --- Configuracao ---
REPO_URL="https://github.com/Cafe-GameDev/Cafe-com-Godot.git"
PERSONALITY_NAME="cafe-gemini"
INSTALL_DIR="$HOME/.gemini/personalities/$PERSONALITY_NAME"
UPDATE_CMD_NAME="cafe-gemini-update"

# --- Inicio do Script ---
echo "----------------------------------------------------------------"
echo "Iniciando o instalador do assistente 'cafe-gemini'…"
echo "----------------------------------------------------------------"

# 1. Verificar se o npm (Node.js) esta instalado
if ! command -v npm &> /dev/null; then
    echo "ERRO: npm (Node.js) nao encontrado."
    echo "Por favor, instale o Node.js (https://nodejs.org/) e tente novamente."
    exit 1
fi

# 2. Instalar/Atualizar o Gemini CLI globalmente
echo "-> Passo 1/4: Verificando e instalando o Gemini CLI…"
if ! npm install -g @google/gemini-cli; then
    echo "ERRO: Falha ao instalar '@google/gemini-cli'. Verifique sua instalacao do npm."
    exit 1
fi
echo "Gemini CLI instalado com sucesso."

# 3. Logica de Instalacao ou Atualizacao do Repositorio
echo "-> Passo 2/4: Verificando o repositorio da personalidade…"
if [ -d "$INSTALL_DIR/.git" ]; then
    echo "Repositorio ja existe. Atualizando…"
    cd "$INSTALL_DIR" && git pull && cd - > /dev/null
    if [ $? -ne 0 ]; then
        echo "ERRO: Falha ao executar 'git pull'."
        exit 1
    fi
    echo "Repositorio atualizado com sucesso."
else
    echo "Clonando o repositorio da personalidade…"
    mkdir -p "$INSTALL_DIR"
    if ! git clone "$REPO_URL" "$INSTALL_DIR"; then
        echo "ERRO: Falha ao clonar o repositorio."
        exit 1
    fi
    echo "Repositorio clonado com sucesso."
fi

# 4. Detectar o arquivo de configuracao do shell
echo "-> Passo 3/4: Configurando os comandos…"
SHELL_CONFIG_FILE=""
if [ -n "$ZSH_VERSION" ]; then
   SHELL_CONFIG_FILE="$HOME/.zshrc"
elif [ -n "$BASH_VERSION" ]; then
   SHELL_CONFIG_FILE="$HOME/.bashrc"
else
   # Fallback for other shells
   [ -f "$HOME/.profile" ] && SHELL_CONFIG_FILE="$HOME/.profile"
   [ -f "$HOME/.bash_profile" ] && SHELL_CONFIG_FILE="$HOME/.bash_profile"
fi

if [ -z "$SHELL_CONFIG_FILE" ]; then
    echo "AVISO: Nao foi possivel detectar seu arquivo de configuracao de shell."
    MANUAL_INSTALL_REQUIRED=true
else
    # 5. Adicionar os aliases ao perfil
    COMMENT="# Comandos para o assistente Gemini especializado (Cafe-com-Godot)"
    MAIN_ALIAS_CMD="alias $PERSONALITY_NAME='gemini --include-directories \"$INSTALL_DIR\" --load-memory-from-include-directories'"
    UPDATE_ALIAS_CMD="alias $UPDATE_CMD_NAME='bash \"$INSTALL_DIR/install.sh\"'"

    # Garante que o comentario exista
    if ! grep -qF "$COMMENT" "$SHELL_CONFIG_FILE"; then
        echo -e "\n$COMMENT" >> "$SHELL_CONFIG_FILE"
    fi

    # Adiciona ou atualiza o alias principal
    if ! grep -qF "alias $PERSONALITY_NAME=" "$SHELL_CONFIG_FILE"; then
        echo "$MAIN_ALIAS_CMD" >> "$SHELL_CONFIG_FILE"
        echo "Comando '$PERSONALITY_NAME' adicionado."
    else
        echo "Comando '$PERSONALITY_NAME' ja configurado."
    fi

    # Adiciona ou atualiza o alias de update
    if ! grep -qF "alias $UPDATE_CMD_NAME=" "$SHELL_CONFIG_FILE"; then
        echo "$UPDATE_ALIAS_CMD" >> "$SHELL_CONFIG_FILE"
        echo "Comando '$UPDATE_CMD_NAME' adicionado."
    else
        echo "Comando '$UPDATE_CMD_NAME' ja configurado."
    fi
fi

# 6. Mensagem final
echo "-> Passo 4/4: Finalizacao."
echo ""
echo "----------------------------------------------------------------"
echo "🎉 Instalacao/Atualizacao concluida com sucesso! 🎉"
echo ""
if [ "$MANUAL_INSTALL_REQUIRED" = true ]; then
    echo "AVISO: Acao manual necessaria!"
    echo "Adicione as seguintes linhas ao seu arquivo de configuracao do shell:"
    echo ""
    echo "$COMMENT"
    echo "$MAIN_ALIAS_CMD"
    echo "$UPDATE_ALIAS_CMD"
else
    echo "Para aplicar as mudancas, reinicie seu terminal ou execute:"
    echo "source $SHELL_CONFIG_FILE"
fi
echo ""
echo "Comandos disponiveis:"
echo "  $PERSONALITY_NAME        - Inicia o assistente especializado."
echo "  $UPDATE_CMD_NAME - Atualiza o assistente para a versao mais recente."
echo "----------------------------------------------------------------"
