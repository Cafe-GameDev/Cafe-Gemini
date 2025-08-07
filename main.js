#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');
const os = require('os');
const fs = require('fs');

// O diretório onde o contexto (o repositório) é clonado.
const contextDir = path.join(os.homedir(), '.cafe-gemini');

function main() {
    // Verifica se o diretório de contexto foi criado pela instalação.
    if (!fs.existsSync(contextDir)) {
        console.error('ERRO: Diretório de contexto não encontrado!');
        console.error(`O diretório esperado em "${contextDir}" não existe.`);
        console.error('Por favor, tente reinstalar o pacote para que o download seja feito corretamente:');
        console.error('npm install -g @cafe-gamedev/gemini');
        process.exit(1);
    }

    // Pega todos os argumentos passados para o 'cafe-gemini'
    const userArgs = process.argv.slice(2);

    // Monta a lista de argumentos final para o comando 'gemini'
    const finalArgs = [
        '--include-directories',
        contextDir,
        '--load-memory-from-include-directories',
        ...userArgs
    ];

    console.log(`☕ Executando Gemini com o contexto de "${contextDir}"...`);
    console.log('----------------------------------------------------------------');

    // Executa o comando 'gemini' real com os argumentos injetados.
    const geminiProcess = spawn('gemini', finalArgs, {
        stdio: 'inherit', // Redireciona input/output para o terminal atual
        shell: true       // Necessário no Windows para encontrar o .cmd do gemini
    });

    geminiProcess.on('close', (code) => {
        process.exit(code);
    });

    geminiProcess.on('error', (err) => {
        console.error('ERRO: Falha ao iniciar o processo do Gemini.');
        console.error('Verifique se o @google/gemini-cli está instalado e acessível no seu PATH.');
        console.error(err);
        process.exit(1);
    });
}

main();
