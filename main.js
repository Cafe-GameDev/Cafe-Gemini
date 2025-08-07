#!/usr/bin/env node
const { execSync } = require('child_process');
const path = require('path');
const os = require('os');
const fs = require('fs');

// O diretório onde o contexto (o repositório) é clonado.
const contextDir = path.join(os.homedir(), '.cafe-gemini');

/**
 * Função principal que executa o Gemini.
 */
function main() {
    // A verificação do diretório de contexto é necessária para todos os comandos.
    if (!fs.existsSync(contextDir)) {
        console.error('ERRO: Diretório de contexto não encontrado!');
        console.error(`O diretório esperado em "${contextDir}" não existe.`);
        console.error('Por favor, tente reinstalar o pacote para que o download seja feito corretamente:');
        console.error('npm install -g @cafe-gamedev/gemini');
        process.exit(1);
    }

    const userArgs = process.argv.slice(2);
    runGemini(userArgs);
}

/**
 * Executa o Gemini CLI com o contexto injetado.
 * @param {string[]} userArgs - Argumentos para passar ao Gemini.
 */
function runGemini(userArgs) {
    const finalArgs = [
        'gemini',
        '--include-directories',
        `"${contextDir}"`,
        '--load-memory-from-include-directories',
        ...userArgs
    ].join(' ');

    console.log(`☕ Executando Gemini com o contexto de "${contextDir}"...`);
    console.log('----------------------------------------------------------------');

    try {
        execSync(finalArgs, { stdio: 'inherit', shell: true });
    } catch (error) {
        // O erro já será impresso no console por causa do stdio: 'inherit'
        process.exit(1);
    }
}

main();