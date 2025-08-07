#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');
const os = require('os');
const fs = require('fs');

// --- Configuração ---
const contentDir = path.join(os.homedir(), '.cafe-gemini');

// --- Funções Auxiliares ---

function printHelp() {
    console.log(`
☕ Cafe-Gemini CLI | v${require('./package.json').version}

Seu assistente de desenvolvimento para o ecossistema "Café com Godot".

Uso:
  cafe-gemini [comando] [opções]

Comandos:
  new <NomeDoProjeto>   Cria um novo projeto Godot com a estrutura recomendada.
  update                Baixa a versão mais recente dos manuais e exemplos.
  --help, -h            Mostra esta mensagem de ajuda.

Exemplos:
  cafe-gemini                   # Inicia o assistente no modo chat interativo.
  cafe-gemini new MeuSuperJogo  # Cria a estrutura inicial do projeto 'MeuSuperJogo'.

Para atualizar a ferramenta (o CLI em si), use: npm update -g @cafe-gamedev/gemini
`);
}

function ensureContentDirExists() {
    if (!fs.existsSync(contentDir)) {
        console.error('ERRO: Diretório de conteúdo do Cafe-Gemini não encontrado!');
        console.error('Parece que a instalação não foi concluída ou foi corrompida.');
        console.error('Por favor, tente reinstalar o pacote:');
        console.error('npm install -g @cafe-gamedev/gemini');
        process.exit(1);
    }
}

// --- Lógica dos Comandos ---

function commandUpdate() {
    console.log(`----------------------------------------------------------------`);
    console.log(`☕ Atualizando o conteúdo do Cafe-Gemini...`);
    console.log(`----------------------------------------------------------------`);
    try {
        // Executa o script de instalação novamente para baixar a versão mais recente.
        // Usamos spawn para ter uma saída mais limpa e em tempo real.
        const child = spawn('node', [path.join(__dirname, 'postinstall.js')], { stdio: 'inherit' });
        child.on('close', (code) => {
            if (code !== 0) {
                console.error(`\nERRO: O processo de atualização falhou.`);
            }
        });
    } catch (e) {
        console.error("\nERRO: Falha ao iniciar o processo de atualização.", e);
        process.exit(1);
    }
}

function commandNewProject(projectName) {
    ensureContentDirExists();
    if (!projectName) {
        console.error("ERRO: O comando 'new' requer um nome para o projeto.");
        console.error("Exemplo: cafe-gemini new MeuSuperJogo");
        process.exit(1);
    }

    const projectPath = path.join(process.cwd(), projectName);
    console.log(`-> Criando novo projeto Godot em: ${projectPath}`);

    if (fs.existsSync(projectPath)) {
        console.error(`ERRO: O diretório '${projectName}' já existe.`);
        process.exit(1);
    }

    // Estrutura de pastas
    fs.mkdirSync(projectPath);
    ['scenes', 'scripts', 'resources', 'addons'].forEach(dir => {
        fs.mkdirSync(path.join(projectPath, dir), { recursive: true });
    });
    fs.mkdirSync(path.join(projectPath, 'scripts', 'autoloads'), { recursive: true });
    console.log("- Estrutura de pastas criada.");

    // .gitignore
    const gitignoreContent = `# Godot-specific ignores
.godot/
!.godot/user_credentials.cfg
!.godot/user_feature_overrides.cfg
export_presets.cfg
.mono/
data_*/
# Imports
.godot/imported/
# Binaries
*.exe
*.dll
`;
    fs.writeFileSync(path.join(projectPath, '.gitignore'), gitignoreContent);
    console.log("- .gitignore criado.");

    // Global.gd (autoload)
    const globalGdContent = "extends Node\n\n# Adicione suas variaveis e funcoes globais aqui.\n";
    fs.writeFileSync(path.join(projectPath, 'scripts', 'autoloads', 'Global.gd'), globalGdContent);
    console.log("- Autoload 'Global.gd' criado.");

    // Instalar GUT
    const gutZipPath = path.join(contentDir, 'TOOLING', 'godot-plugins', 'GUT.zip');
    if (fs.existsSync(gutZipPath)) {
        try {
            const AdmZip = require('adm-zip');
            const zip = new AdmZip(gutZipPath);
            zip.extractAllTo(path.join(projectPath, 'addons'), true);
            const rootDir = zip.getEntries()[0].entryName.split('/')[0];
            if (rootDir !== 'gut') {
                fs.renameSync(path.join(projectPath, 'addons', rootDir), path.join(projectPath, 'addons', 'gut'));
            }
            console.log("- GUT (Godot Unit Test) instalado.");
        } catch (e) {
            console.error("\nERRO: Falha ao instalar o GUT.", e);
        }
    } else {
        console.warn("AVISO: Arquivo do GUT não encontrado. Pulei a instalação do GUT.");
    }

    // project.godot
    const projectGodotContent = `
; Engine configuration file.
; It's best edited using the editor UI and not directly,
; since the parameters that go here are not all obvious.
;
; Format:
;   [section] ; section goes between []
;   param=value ; assign values to parameters

config_version=5

[application]

config/name="${projectName}"
run/main_scene=""
config/features=PackedStringArray("4.2", "GL Compatibility")

[autoload]

Global="*res://scripts/autoloads/Global.gd"

[editor_plugins]

enabled=PackedStringArray("res://addons/gut/plugin.cfg")
`;
    fs.writeFileSync(path.join(projectPath, 'project.godot'), projectGodotContent.trim());
    console.log("- project.godot criado e configurado.");

    console.log(`\n✅ Projeto '${projectName}' criado com sucesso!`);
}

function startGeminiChat(args) {
    ensureContentDirExists();
    console.log(`----------------------------------------------------------------`);
    console.log(`☕ Cafe-Gemini | Carregando contexto de: ${contentDir}`);
    console.log(`----------------------------------------------------------------`);

    const finalArgs = [
        '--include-directories',
        contentDir,
        '--load-memory-from-include-directories',
        ...args
    ];

    const geminiProcess = spawn('gemini', finalArgs, {
        stdio: 'inherit',
        shell: true
    });

    geminiProcess.on('close', (code) => process.exit(code));
    geminiProcess.on('error', (err) => {
        console.error('Falha ao iniciar o processo do Gemini:', err);
        console.error('Verifique se o @google/gemini-cli está instalado corretamente.');
        process.exit(1);
    });
}

// --- Ponto de Entrada ---

function main() {
    const args = process.argv.slice(2);
    const command = args[0];

    switch (command) {
        case 'new':
            commandNewProject(args[1]);
            break;
        case 'update':
            commandUpdate();
            break;
        case '--help':
        case '-h':
            printHelp();
            break;
        default:
            startGeminiChat(args);
            break;
    }
}

main();
