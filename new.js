#!/usr/bin/env node
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const https = require('https');
const AdmZip = require('adm-zip');

async function main() {
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

    // 2. Baixar e extrair o GUT
    console.log('Instalando dependências (GUT v9.4.0)...');
    const gutZipUrl = 'https://github.com/bitwes/Gut/archive/refs/tags/v9.4.0.zip';
    const gutZipPath = path.join(projectPath, 'gut.zip');
    const addonsDir = path.join(projectPath, 'Addons');
    
    await new Promise((resolve, reject) => {
        const file = fs.createWriteStream(gutZipPath);
        https.get(gutZipUrl, (response) => {
            if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
                https.get(response.headers.location, (res) => res.pipe(file));
            } else {
                response.pipe(file);
            }
            file.on('finish', () => file.close(resolve));
            file.on('error', reject);
        }).on('error', reject);
    });

    try {
        const zip = new AdmZip(gutZipPath);
        // Extrai na raiz do projeto para evitar aninhamento incorreto
        zip.extractAllTo(projectPath, true);

        // Encontra o nome da pasta extraída (ex: Gut-9.4.0)
        const extractedFolderName = fs.readdirSync(projectPath).find(f => f.toLowerCase().startsWith('gut-'));
        
        if (extractedFolderName) {
            const gutSourcePath = path.join(projectPath, extractedFolderName, 'addons', 'gut');
            const gutDestinationPath = path.join(addonsDir, 'gut');

            // Garante que o diretório de destino exista
            if (!fs.existsSync(addonsDir)) {
                fs.mkdirSync(addonsDir, { recursive: true });
            }

            // Move a pasta 'gut' para o diretório 'Addons'
            if (fs.existsSync(gutSourcePath)) {
                fs.renameSync(gutSourcePath, gutDestinationPath);
            } else {
                throw new Error(`A estrutura do zip do GUT pode ter mudado. Não foi possível encontrar: ${gutSourcePath}`);
            }
            
            // Remove a pasta extraída que agora está vazia/incompleta
            fs.rmSync(path.join(projectPath, extractedFolderName), { recursive: true, force: true });
        } else {
            throw new Error('Não foi possível encontrar a pasta do GUT após a extração do zip.');
        }
    } catch (e) {
        console.error(`\nFalha ao processar o arquivo do GUT: ${e.message}`);
        // Limpa antes de sair para não deixar o projeto em estado quebrado
        if (fs.existsSync(gutZipPath)) fs.unlinkSync(gutZipPath);
        process.exit(1);
    } finally {
        // Garante que o zip seja removido em caso de sucesso ou falha
        if (fs.existsSync(gutZipPath)) fs.unlinkSync(gutZipPath);
    }

    // 3. Modificar o project.godot
    const projectGodotPath = path.join(projectPath, 'project.godot');
    let projectGodotContent = fs.readFileSync(projectGodotPath, 'utf8');
    projectGodotContent = projectGodotContent.replace('config/name="Template"', `config/name="${projectName}"`);
    fs.writeFileSync(projectGodotPath, projectGodotContent, 'utf8');

    // 4. Ativar o plugin GUT
    console.log('Ativando o plugin GUT...');
    let projectContent = fs.readFileSync(projectGodotPath, 'utf8');
    const correctGutLine = 'enabled=PackedStringArray("res://Addons/gut/plugin.cfg")';
    const incorrectGutLine = 'enabled=PackedStringArray("res://addons/gut/plugin.cfg")';
    
    if (!projectContent.includes(correctGutLine)) {
      if (projectContent.includes(incorrectGutLine)) {
          projectContent = projectContent.replace(incorrectGutLine, correctGutLine);
      } else {
          const editorPluginsSection = '[editor_plugins]';
          if (projectContent.includes(editorPluginsSection)) {
              projectContent = projectContent.replace(editorPluginsSection, `${editorPluginsSection}\n${correctGutLine}`);
          } else {
              projectContent += `\n\n${editorPluginsSection}\n${correctGutLine}\n`;
          }
      }
      fs.writeFileSync(projectGodotPath, projectContent, 'utf8');
    }

    console.log(`
Projeto "${projectName}" criado com sucesso!`);
    console.log(`
Para começar, acesse a pasta do projeto:
  cd ${projectName}`);
    console.log(`
E abra o projeto no Godot.`);

  } catch (error) {
    console.error(`
Ocorreu um erro durante a criação do projeto: ${error.message}`);
    if (fs.existsSync(projectPath)) {
      console.log('Removendo diretório do projeto criado parcialmente...');
      fs.rmSync(projectPath, { recursive: true, force: true });
    }
    process.exit(1);
  }
}

main();
