#!/usr/bin/env node

const { execSync } = require('child_process');
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

    // Pega todos os argumentos passados para o 'cafe-gemini' e os junta em uma string
    const userArgs = process.argv.slice(2).join(' ');

    // Monta o comando final como uma única string para ser executada pelo shell.
    // As aspas em "${contextDir}" garantem que o caminho funcione mesmo com espaços.
    const command = `gemini --include-directories "${contextDir}" --load-memory-from-include-directories ${userArgs}`;

    console.log(`☕ Executando Gemini com o contexto de "${contextDir}"...`);
    console.log('----------------------------------------------------------------');

    try {
        // Executa o comando de forma síncrona, herdando o input/output.
        // Isso é seguro e não gera o DeprecationWarning.
        execSync(command, { stdio: 'inherit' });
    } catch (error) {
        // Se o gemini retornar um código de erro, o execSync vai lançar uma exceção.
        // O erro do processo filho já foi exibido no console por causa do 'stdio: inherit'.
        // Apenas garantimos que o nosso script também saia com um código de erro.
        process.exit(1);
    }
}

main();