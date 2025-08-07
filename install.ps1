# Script para instalar ou atualizar a personalidade "cafe-gemini" e suas dependencias.

# --- Configuracao ---
$RepoUrl = "https://github.com/Cafe-GameDev/Cafe-com-Godot.git"
$PersonalityName = "cafe-gemini"
$InstallDir = "$HOME\.gemini\personalities\$PersonalityName"
$UpdateCmdName = "cafe-gemini-update"

# --- Funcao Principal (a ser adicionada ao perfil) ---
$MainFunction = @"
function $PersonalityName {
    param (
        [string]$subcommand,
        [string]$projectName
    )

    # Logica do Scaffolding
    if ($subcommand -eq "new") {
        if (-not $projectName) {
            Write-Host "ERRO: O comando 'new' requer um nome para o projeto."
            Write-Host "Exemplo: cafe-gemini new MeuSuperJogo"
            return
        }

        Write-Host "Criando novo projeto Godot: $projectName..."
        
        # 1. Criar estrutura de pastas
        New-Item -ItemType Directory -Path ".\$projectName" | Out-Null
        New-Item -ItemType Directory -Path ".\$projectName\scenes" | Out-Null
        New-Item -ItemType Directory -Path ".\$projectName\scripts" | Out-Null
        New-Item -ItemType Directory -Path ".\$projectName\scripts\autoloads" | Out-Null
        New-Item -ItemType Directory -Path ".\$projectName\resources" | Out-Null
        New-Item -ItemType Directory -Path ".\$projectName\addons" | Out-Null
        Write-Host "- Estrutura de pastas criada."

        # 2. Criar .gitignore
        $gitignoreContent = @"
# Godot-specific ignores
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
"@
        Set-Content -Path ".\$projectName\.gitignore" -Value $gitignoreContent
        Write-Host "- .gitignore criado."

        # 3. Criar Global.gd (autoload)
        $globalGdContent = "extends Node`n`n# Adicione suas variaveis e funcoes globais aqui.`n"
        Set-Content -Path ".\$projectName\scripts\autoloads\Global.gd" -Value $globalGdContent
        Write-Host "- Autoload 'Global.gd' criado."

        # 4. Instalar GUT
        $gutZipPath = "$InstallDir\TOOLING\godot-plugins\GUT.zip"
        if (Test-Path $gutZipPath) {
            Expand-Archive -Path $gutZipPath -DestinationPath ".\$projectName\addons\gut" -Force
            Write-Host "- GUT (Godot Unit Test) instalado."
        } else {
            Write-Host "AVISO: $gutZipPath nao encontrado. Pulei a instalacao do GUT."
        }

        # 5. Criar e configurar project.godot
        $projectGodotContent = @"
; Engine configuration file.
; It's best edited using the editor UI and not directly,
; since the parameters that go here are not all obvious.
;
; Format:
;   [section] ; section goes between []
;   param=value ; assign values to parameters

config_version=5

[application]

config/name="$projectName"
run/main_scene=""
config/features=PackedStringArray("4.2", "GL Compatibility")

[autoload]

Global="*res://scripts/autoloads/Global.gd"

[editor_plugins]

enabled=PackedStringArray("res://addons/gut/plugin.cfg")

"@
        Set-Content -Path ".\$projectName\project.godot" -Value $projectGodotContent
        Write-Host "- project.godot criado e configurado."

        Write-Host "✅ Projeto '$projectName' criado com sucesso!"
        return
    }

    # Logica padrao (iniciar o chat)
    gemini --include-directories "$InstallDir" --load-memory-from-include-directories $args
}
"@

# --- Inicio do Script de Instalacao ---
Write-Host "----------------------------------------------------------------"
Write-Host "Iniciando o instalador do assistente 'cafe-gemini'…"
Write-Host "----------------------------------------------------------------"

# 1. Verificar se o npm (Node.js) esta instalado
if (-not (Get-Command npm -ErrorAction SilentlyContinue)) {
    Write-Host "ERRO: npm (Node.js) nao encontrado."
    Write-Host "Por favor, instale o Node.js (https://nodejs.org/) e tente novamente."
    exit 1
}

# 2. Instalar/Atualizar o Gemini CLI globalmente
Write-Host "-> Passo 1/4: Verificando e instalando o Gemini CLI…"
npm install -g @google/gemini-cli
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERRO: Falha ao instalar '@google/gemini-cli'. Verifique sua instalacao do npm."
    exit 1
}
Write-Host "Gemini CLI instalado com sucesso."

# 3. Logica de Instalacao ou Atualizacao do Repositorio
Write-Host "-> Passo 2/4: Verificando o repositorio da personalidade…"
if (Test-Path (Join-Path $InstallDir ".git")) {
    Write-Host "Repositorio ja existe. Atualizando…"
    try {
        Set-Location $InstallDir; git pull; Set-Location $PSScriptRoot
        Write-Host "Repositorio atualizado com sucesso."
    } catch {
        Write-Host "ERRO: Falha ao executar 'git pull'."
        exit 1
    }
} else {
    Write-Host "Clonando o repositorio da personalidade…"
    try {
        New-Item -ItemType Directory -Force -Path $InstallDir | Out-Null
        git clone $RepoUrl $InstallDir
        Write-Host "Repositorio clonado com sucesso."
    } catch {
        Write-Host "ERRO: Falha ao clonar o repositorio."
        exit 1
    }
}

# 4. Garantir que o arquivo de perfil do PowerShell exista e adicionar os comandos
Write-Host "-> Passo 3/4: Configurando os comandos…"
if (-not (Test-Path $PROFILE)) {
    New-Item -Path $PROFILE -ItemType File -Force | Out-Null
}

$Comment = "# Comandos para o assistente Gemini especializado (Cafe-com-Godot)"
$UpdateFunction = @"
function $UpdateCmdName {
    powershell.exe -ExecutionPolicy Bypass -File "$InstallDir\install.ps1"
}
"@

$CurrentProfileContent = Get-Content $PROFILE -Raw -ErrorAction SilentlyContinue

# Adiciona/Atualiza a funcao principal
# Remove a definicao antiga para garantir que a nova seja usada
$pattern = "(?s)# Comandos para o assistente Gemini especializado \(Cafe-com-Godot\).*?(?=^# Comandos|\z)"
if ($CurrentProfileContent -match $pattern) {
    $CurrentProfileContent = $CurrentProfileContent -replace $pattern, ''
}
$NewContent = @"
`n$Comment
$MainFunction
$UpdateFunction
"@
Set-Content -Path $PROFILE -Value ($CurrentProfileContent.Trim() + $NewContent)
Write-Host "Comandos 'cafe-gemini' e 'cafe-gemini-update' configurados."

# 5. Mensagem final
Write-Host "-> Passo 4/4: Finalizacao."
Write-Host ""
Write-Host "----------------------------------------------------------------"
Write-Host "🎉 Instalacao/Atualizacao concluida com sucesso! 🎉"
Write-Host ""
Write-Host "Para aplicar as mudancas, reinicie seu terminal ou execute: . `$PROFILE"
Write-Host ""
Write-Host "Comandos disponiveis:"
Write-Host "  cafe-gemini new <NomeDoProjeto> - Cria um novo projeto Godot."
Write-Host "  cafe-gemini                   - Inicia o assistente no modo chat."
Write-Host "  cafe-gemini-update            - Atualiza o assistente."
Write-Host "----------------------------------------------------------------"
