#!/data/data/com.termux/files/usr/bin/sh
#
# Script de Instalação Robusta do Ambiente Café Gemini para Termux (v2)
#
# Este script foca em garantir que as dependências de linha de comando
# sejam instaladas e reconhecidas corretamente pelo sistema.
#

# --- Início do Script ---
echo "--- 🚀 Iniciando a instalação Robusta do Ambiente Café Gemini ---"
echo ""

# Passo 1: Permissões e Atualização do Sistema
echo "-> Passo 1/5: Configurando o ambiente Termux..."
termux-setup-storage
pkg update && pkg upgrade -y
echo "   Ambiente atualizado."
sleep 2

# Passo 2: Instalação de Dependências Essenciais
echo ""
echo "-> Passo 2/5: Instalando dependências (Node.js e Git)..."
pkg install nodejs-lts git -y

# Passo 3: Instalação da Ferramenta Base do Google
echo ""
echo "-> Passo 3/5: Instalando a ferramenta base '@google/gemini-cli'..."
echo "   Este passo é crucial para garantir que o comando 'gemini' seja reconhecido."
npm install -g @google/gemini-cli

# Passo 4: Instalação do Wrapper Café Gemini
echo ""
echo "-> Passo 4/5: Instalando o assistente 'Cafe-Gemini'..."
npm install -g @cafe-gamedev/gemini

# Passo 5: Preparando o Diretório de Trabalho
echo ""
echo "-> Passo 5/5: Configurando o diretório de projetos..."
# Navega para o armazenamento compartilhado, que é mais comum
cd ~/storage/shared
# Cria a pasta de forma segura (não dá erro se já existir)
mkdir -p cafe-gemini
# Entra na pasta
cd cafe-gemini

# --- Conclusão ---
echo ""
echo "----------------------------------------------------------------"
echo "✅ Ambiente de desenvolvimento configurado com sucesso!"
echo ""
echo "Você está no diretório '~/storage/shared/cafe-gemini'."
echo "Todos os comandos estão prontos."
echo ""
echo "Para iniciar o assistente, digite:"
echo "cafe-gemini"
echo "----------------------------------------------------------------"