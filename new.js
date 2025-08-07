#!/usr/bin/env node
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const projectName = process.argv[2];

if (!projectName) {
  console.error('Por favor, forneça um nome para o projeto.');
  process.exit(1);
}

const projectPath = path.join(process.cwd(), projectName);

try {
  console.log(`Criando o projeto "${projectName}"...`);

  // 1. Clonar o repositório
  execSync(`git clone https://github.com/Cafe-GameDev/Godot-Template ${projectName}`, { stdio: 'inherit' });

  // 2. Inicializar e atualizar submódulos (GUT)
  console.log('Instalando dependências (GUT)...');
  execSync('git submodule update --init --recursive', { cwd: projectPath, stdio: 'inherit' });

  // 3. Modificar o project.godot
  const projectGodotPath = path.join(projectPath, 'project.godot');
  let projectGodotContent = fs.readFileSync(projectGodotPath, 'utf8');
  projectGodotContent = projectGodotContent.replace('config/name="Template"', `config/name="${projectName}"`);
  fs.writeFileSync(projectGodotPath, projectGodotContent, 'utf8');

  console.log(`
Projeto "${projectName}" criado com sucesso!`);
  console.log(`
Para começar, acesse a pasta do projeto:
  cd ${projectName}`);
  console.log('
E abra o projeto no Godot.');

} catch (error) {
  console.error(`
Ocorreu um erro durante a criação do projeto: ${error.message}`);
  // Limpeza em caso de falha
  if (fs.existsSync(projectPath)) {
    console.log('Removendo diretório do projeto criado parcialmente...');
    fs.rmSync(projectPath, { recursive: true, force: true });
  }
  process.exit(1);
}