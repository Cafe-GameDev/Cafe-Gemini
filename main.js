#!/usr/bin/env node

const { execSync } = require('child_process');

function main() {
    const command = `gemini`;

    console.log(`☕ Executando Repo-Cafe`);
    console.log('----------------------------------------------------------------');

    try {
        execSync(command, { stdio: 'inherit' });
    } catch (error) {
        process.exit(1);
    }
}

main();