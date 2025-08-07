const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');
const os = require('os');
const https = require('https');
const AdmZip = require('adm-zip');

const installDir = path.join(os.homedir(), '.cafe-gemini');
const repoUrl = 'https://github.com/Cafe-GameDev/Cafe-com-Godot/archive/refs/heads/main.zip';
const zipPath = path.join(installDir, 'context.zip');

function download(url, dest) {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(dest);
        https.get(url, (response) => {
            // Lidar com redirecionamentos
            if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
                return download(response.headers.location, dest).then(resolve).catch(reject);
            }
            if (response.statusCode !== 200) {
                return reject(new Error(`Falha ao baixar o arquivo: Status Code ${response.statusCode}`));
            }
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
    console.log(`☕ Iniciando configuração do Cafe-Gemini...`);
    console.log(`----------------------------------------------------------------`);

    // 1. Limpar diretório antigo, se existir, e criar um novo
    console.log(`-> Preparando o diretório de conteúdo em: ${installDir}`);
    if (fs.existsSync(installDir)) {
        fs.rmSync(installDir, { recursive: true, force: true });
    }
    fs.mkdirSync(installDir);

    // 2. Baixar o repositório como .zip
    try {
        console.log('-> Baixando conteúdo...');
        await download(repoUrl, zipPath);
        console.log('-> Download concluído.');
    } catch (e) {
        console.error(`\nERRO: Falha ao baixar o conteúdo do repositório.`, e);
        process.exit(1);
    }

    // 3. Descompactar o .zip
    try {
        console.log('-> Descompactando conteúdo...');
        const zip = new AdmZip(zipPath);
        // A extração cria uma pasta com o nome do repo, ex: 'Cafe-com-Godot-main'
        zip.extractAllTo(installDir, true);
        
        // Mover arquivos da subpasta para a raiz do installDir
        const extractedFolderName = fs.readdirSync(installDir).find(f => f.startsWith('Cafe-com-Godot-'));
        if (extractedFolderName) {
            const extractedPath = path.join(installDir, extractedFolderName);
            fs.readdirSync(extractedPath).forEach(file => {
                fs.renameSync(path.join(extractedPath, file), path.join(installDir, file));
            });
            fs.rmdirSync(extractedPath);
        }
        console.log('-> Conteúdo descompactado e organizado.');

    } catch (e) {
        console.error(`\nERRO: Falha ao descompactar o conteúdo.`, e);
        process.exit(1);
    } finally {
        // 4. Limpar o arquivo .zip
        if (fs.existsSync(zipPath)) {
            fs.unlinkSync(zipPath);
        }
    }

    console.log(`----------------------------------------------------------------`);
    console.log(`✅ Configuração do Cafe-Gemini concluída com sucesso!`);
    console.log(`\nO comando 'cafe-gemini' está pronto para ser usado.`);
    console.log(`----------------------------------------------------------------`);
}

run();