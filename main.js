#!/usr/bin/env node

const { execSync, spawn } = require('child_process');
const path = require('path');
const fs = require('fs');
const os = require('os');

const repoUrl = 'https://github.com/Cafe-GameDev/Cafe-com-Godot.git';
const homeDir = os.homedir();
const geminiDir = path.join(homeDir, '.cafe-gemini');
const repoDir = path.join(geminiDir, 'Cafe-com-Godot');

function runCommand(command, options = {}) {
  try {
    execSync(command, { stdio: 'inherit', ...options });
  } catch (error) {
    console.error(`\nFalha ao executar o comando: ${command}`);
    console.error(error);
    process.exit(1);
  }
}

function setupRepository() {
  // Garante que o diretório ~/.cafe-gemini exista
  if (!fs.existsSync(geminiDir)) {
    console.log(`Criando diretório de suporte em: ${geminiDir}`);
    fs.mkdirSync(geminiDir);
  }

  // Verifica se o repositório já foi clonado
  if (!fs.existsSync(repoDir)) {
    console.log(`Clonando o repositório 'Cafe-com-Godot' para ${repoDir}...`);
    runCommand(`git clone ${repoUrl} "${repoDir}"`);
  } else {
    console.log(`Atualizando o repositório 'Cafe-com-Godot'...`);
    runCommand('git pull', { cwd: repoDir });
  }
}

function startGemini() {
  console.log(`\nIniciando o Café Gemini no contexto de: ${repoDir}`);
  console.log('--------------------------------------------------');

  const geminiProcess = spawn('gemini', ['.'], {
    cwd: repoDir,
    stdio: 'inherit',
    shell: true
  });

  geminiProcess.on('close', (code) => {
    console.log('--------------------------------------------------');
    if (code !== 0) {
      console.log(`Café Gemini encerrado com código: ${code}`);
    } else {
      console.log('Sessão do Café Gemini encerrada.');
    }
  });

  geminiProcess.on('error', (err) => {
    console.error('\nFalha ao iniciar o Café Gemini. Verifique se o CLI do Gemini está instalado e no seu PATH.', err);
    process.exit(1);
  });
}

// --- Execução Principal ---
setupRepository();
startGemini();