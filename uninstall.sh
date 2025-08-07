#!/data/data/com.termux/files/usr/bin/sh
#
# Script de Desinstalação Completa do Ambiente Café Gemini para Termux.
#
# AVISO: Este script removerá os pacotes e configurações instalados
# pelo 'install.sh'. Prossiga com cautela.
#

# --- Início do Script ---
echo "--- 🗑️  Iniciando a desinstalação do Ambiente Café Gemini ---"
echo ""

# Passo 1: Desinstalar o pacote Cafe-Gemini
echo "-> Passo 1/4: Removendo o pacote Cafe-Gemini..."
if npm list -g | grep -q '@cafe-gamedev/gemini'; then
    npm uninstall -g @cafe-gamedev/gemini
else
    echo "   Pacote Cafe-Gemini não encontrado. Pulando."
fi

# Passo 2: Remover o diretório de contexto
echo ""
echo "-> Passo 2/4: Removendo o diretório de manuais e configuração (~/.cafe-gemini)..."
if [ -d "$HOME/.cafe-gemini" ]; then
    rm -rf "$HOME/.cafe-gemini"
    echo "   Diretório removido."
else
    echo "   Diretório não encontrado. Pulando."
fi

# Passo 3: Desinstalar dependências do Termux
echo ""
echo "-> Passo 3/4: Removendo dependências (Node.js, Git, etc.)..."
pkg uninstall nodejs-lts git nano openssh wget -y

# Passo 4: Limpeza final do Termux
echo ""
echo "-> Passo 4/4: Limpando pacotes órfãos e cache..."
pkg autoremove -y
pkg clean

# --- Conclusão ---
echo ""
echo "----------------------------------------------------------------"
echo "✅ Desinstalação básica concluída."
echo ""
echo "Para um RESET COMPLETO do Termux (recomendado antes de gravar):"
echo ""
echo "1. Feche o Termux completamente."
echo "2. Vá para 'Configurações do Android' -> 'Aplicativos'."
echo "3. Encontre o 'Termux' na lista."
echo "4. Vá para 'Armazenamento e cache'."
echo "5. Pressione o botão 'Limpar armazenamento' ou 'Limpar dados'."
echo ""
echo "Isso irá apagar TUDO e restaurar o Termux ao seu estado inicial."
echo "----------------------------------------------------------------"
