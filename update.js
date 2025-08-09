#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

async function checkForUpdates() {
    try {
        // Encontra o caminho do próprio pacote para ler a versão atual
        const packageJsonPath = path.join(__dirname, 'package.json');
        const currentVersion = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8')).version;
        
        console.log('-> Verificando a versão mais recente no NPM...');
        const latestVersion = execSync('npm view cafe-gemini version').toString().trim();

        if (currentVersion !== latestVersion) {
            console.log(`-> Atualizando Cafe-Gemini: v${currentVersion} -> v${latestVersion}`);
            execSync('npm install -g @google/gemini-cli@latest', { stdio: 'inherit' });
            execSync('npm install -g cafe-gemini@latest', { stdio: 'inherit' });
            console.log('\n✅ cafe-gemini atualizado com sucesso!');
        } else {
            console.log('-> Você já está com a versão mais recente do Cafe-Gemini.');
            // Força a reinstalação para garantir que o postinstall seja executado
            console.log('-> Sincronizando com Repo-Cafe');
            execSync('node postinstall.js', { stdio: 'inherit' });
            console.log('\n✅ Repo-Cafe sincronizados com sucesso!');
        }
    } catch (error) {
        console.error('\nERRO: Falha ao verificar ou instalar atualizações. Tente executar o comando manualmente:');
        console.error('npm install -g cafe-gemini@latest');
        process.exit(1);
    }
}

checkForUpdates();

