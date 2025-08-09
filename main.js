#!/usr/bin/env node

const { execSync } = require('child_process');

function main() {
    const command = `gemini --show-memory-usage --checkpointing`;

    console.log(`☕ Executando Repo-Cafe`);

    try {
        execSync(command, { stdio: 'inherit' });
    } catch (error) {
        process.exit(1);
    }
}

main();