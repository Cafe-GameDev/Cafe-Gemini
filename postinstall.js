const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');
const os = require('os');

const installDir = path.join(os.homedir(), '.cafe-gemini');
const repoUrl = 'https://github.com/Cafe-GameDev/Cafe-com-Godot.git';

// Padrões para o sparse-checkout. Inclui tudo, exceto as pastas especificadas.
const sparseCheckoutPatterns = `/*
!/assets/
!/TOOLING/installers/
`;

function run() {
    console.log(`----------------------------------------------------------------`);
    console.log(`☕ Iniciando configuração do Cafe-Gemini...`);
    console.log(`----------------------------------------------------------------`);

    // 1. Verificar se o Git está instalado
    try {
        execSync('git --version', { stdio: 'ignore' });
    } catch (e) {
        console.error('ERRO: Git não está instalado. O Git é necessário para baixar os manuais e exemplos.');
        console.error('Por favor, instale o Git (https://git-scm.com/) e tente novamente.');
        process.exit(1);
    }

    // 2. Limpar diretório antigo, se existir, e criar um novo
    console.log(`-> Preparando o diretório de conteúdo em: ${installDir}`);
    if (fs.existsSync(installDir)) {
        fs.rmSync(installDir, { recursive: true, force: true });
    }
    fs.mkdirSync(installDir);

    // 3. Executar o processo de sparse checkout
    try {
        console.log('-> Inicializando repositório para download...');
        execSync('git init', { cwd: installDir });
        execSync(`git remote add origin ${repoUrl}`, { cwd: installDir });

        console.log('-> Configurando para baixar apenas os arquivos de texto...');
        const sparseCheckoutFile = path.join(installDir, '.git', 'info', 'sparse-checkout');
        fs.writeFileSync(sparseCheckoutFile, sparseCheckoutPatterns);
        execSync('git config core.sparseCheckout true', { cwd: installDir });

        console.log('-> Baixando conteúdo... (isso pode levar um momento)');
        execSync('git pull origin main', { cwd: installDir, stdio: 'inherit' });

    } catch (e) {
        console.error(`\nERRO: Falha ao baixar o conteúdo do repositório.`);
        console.error('Verifique sua conexão com a internet e se o repositório está acessível.');
        process.exit(1);
    }

    console.log(`----------------------------------------------------------------`);
    console.log(`✅ Configuração do Cafe-Gemini concluída com sucesso!`);
    console.log(`\nO comando 'cafe-gemini' está pronto para ser usado.`);
    console.log(`----------------------------------------------------------------`);
}

run();
