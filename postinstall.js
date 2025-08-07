const https = require('https');
const fs = require('fs');
const os = require('os');
const path = require('path');
const AdmZip = require('adm-zip');

// --- Configuração ---
const repoUrl = 'https://github.com/Cafe-GameDev/Cafe-com-Godot/archive/refs/heads/main.zip';
const contextDir = path.join(os.homedir(), '.cafe-gemini');
const zipPath = path.join(contextDir, 'context.zip');

// Função para baixar um arquivo, tratando redirecionamentos
function download(url, dest) {
    return new Promise((resolve, reject) => {
        const request = https.get(url, (response) => {
            if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
                // Lida com o redirecionamento
                return download(response.headers.location, dest).then(resolve).catch(reject);
            }
            if (response.statusCode !== 200) {
                return reject(new Error(`Falha ao baixar o arquivo: Status Code ${response.statusCode}`));
            }
            const file = fs.createWriteStream(dest);
            response.pipe(file);
            file.on('finish', () => {
                file.close(resolve);
            });
        }).on('error', (err) => {
            fs.unlink(dest, () => reject(err));
        });
    });
}

async function run() {
    console.log(`----------------------------------------------------------------`);
    console.log(`☕ Configurando o ambiente para o Cafe-Gemini...`);
    console.log(`----------------------------------------------------------------`);

    // 1. Limpar diretório antigo, se existir, e criar um novo
    console.log(`-> Preparando o diretório de contexto em: ${contextDir}`);
    if (fs.existsSync(contextDir)) {
        fs.rmSync(contextDir, { recursive: true, force: true });
    }
    fs.mkdirSync(contextDir);

    // 2. Baixar o repositório como .zip
    try {
        console.log(`-> Baixando conteúdo de: ${repoUrl}`);
        await download(repoUrl, zipPath);
        console.log('-> Download concluído.');
    } catch (e) {
        console.error(`
ERRO: Falha ao baixar o conteúdo do repositório.`, e);
        process.exit(1);
    }

    // 3. Descompactar o .zip
    try {
        console.log('-> Descompactando conteúdo...');
        const zip = new AdmZip(zipPath);
        zip.extractAllTo(contextDir, true);

        // Mover arquivos da subpasta para a raiz do installDir
        const extractedFolderName = fs.readdirSync(contextDir).find(f => f.startsWith('Cafe-com-Godot-'));
        if (extractedFolderName) {
            const extractedPath = path.join(contextDir, extractedFolderName);
            fs.readdirSync(extractedPath).forEach(file => {
                fs.renameSync(path.join(extractedPath, file), path.join(contextDir, file));
            });
            // Remove a pasta vazia que continha os arquivos
            fs.rmdirSync(extractedPath);
        }
        console.log('-> Conteúdo descompactado e organizado.');

    } catch (e) {
        console.error(`
ERRO: Falha ao descompactar o conteúdo.`, e);
        process.exit(1);
    } finally {
        // 4. Limpar o arquivo .zip
        if (fs.existsSync(zipPath)) {
            fs.unlinkSync(zipPath);
        }
    }

    console.log(`----------------------------------------------------------------`);
    console.log(`✅ Ambiente configurado! O comando 'cafe-gemini' está pronto.`);
    console.log(`----------------------------------------------------------------`);
}

run();
