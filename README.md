# Café Gemini CLI

Bem-vindo ao Café Gemini, seu assistente de desenvolvimento pessoal para o ecossistema "Café com Godot".

Esta ferramenta de linha de comando (CLI) configura e inicia o Google Gemini com todo o contexto do repositório [Café com Godot](https://github.com/Cafe-GameDev/Cafe-com-Godot), permitindo que você interaja com um assistente que "entende" profundamente a arquitetura, os manuais e a filosofia do projeto.

## Instalação

Para instalar o Café Gemini, você precisa ter o [Node.js](https://nodejs.org/) (que inclui o NPM) instalado em seu sistema.

Com o Node.js pronto, abra seu terminal e execute o seguinte comando:

```bash
npm install -g cafe-gemini
```

Este comando irá instalar o `cafe-gemini` globalmente no seu sistema, tornando-o acessível de qualquer diretório.

## Como Usar

Após a instalação, simplesmente abra um novo terminal e execute:

```bash
cafe-gemini
```

Na primeira vez que você executar, o Café Gemini irá clonar automaticamente o repositório `Cafe-com-Godot` para um diretório local (`~/.cafe-gemini/Cafe-com-Godot`). Nas execuções seguintes, ele garantirá que o repositório esteja sempre atualizado antes de iniciar a sessão do Gemini.

## Versão em Inglês

Para a versão em inglês, que utiliza o repositório `Coffee with Godot`, instale o pacote `coffee-gemini`:

```bash
npm install -g coffee-gemini
```

E use o comando:

```bash
coffee-gemini
```
