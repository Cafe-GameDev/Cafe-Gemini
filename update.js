#!/usr/bin/env node

const { execSync } = require('child_process');

console.log('-> Forçando a atualização do cafe-gemini para a versão mais recente...');

try {
    // Executa o comando de atualização global do npm
    execSync('npm install -g @cafe-gamedev/gemini@latest', { stdio: 'inherit' });
    console.log('\n✅ cafe-gemini atualizado com sucesso!');
} catch (error) {
    console.error('\nERRO: Falha ao atualizar o pacote. Tente executar o comando manualmente:');
    console.error('npm install -g @cafe-gamedev/gemini@latest');
    process.exit(1);
}

