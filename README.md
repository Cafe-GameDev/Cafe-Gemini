# Café Gemini CLI

Bem-vindo ao Café Gemini, seu assistente de desenvolvimento pessoal para o ecossistema Godot.

Embora tenha nascido do curso "Repo Café", o Café Gemini evoluiu para uma ferramenta poderosa para **qualquer desenvolvedor Godot**. Ele é mantido e treinado para transformar o Gemini em um copiloto especializado, com acesso direto e total ao seu ambiente de desenvolvimento.

## O que é o Café Gemini? O Gemini para Desenvolvedores Godot

O Café Gemini transforma o Gemini em um copiloto que tem acesso direto e total ao seu ambiente de desenvolvimento Godot. Em vez de você precisar copiar e colar código para obter ajuda, o Café Gemini já tem acesso a:

- Todo o seu código-fonte (GDScript, C#, etc.)
- Todas as suas Cenas (.tscn) e seus nós
- O seu arquivo de projeto (project.godot)
- Sinais, Autoloads, Resources e toda a arquitetura do seu jogo.

Ele é, em essência, o Gemini para programadores, e o melhor de tudo: **roda diretamente no seu celular via Termux!**

## Como Funciona? A Mágica por Trás do Wrapper

O Café Gemini é um wrapper inteligente para o `gemini-cli` do Google. O processo é simples, mas poderoso:

1.  **Instalação do `gemini-cli`**: Garante que a ferramenta base do Google esteja no seu sistema.
2.  **Clonagem do Conhecimento**: Baixa o repositório [Repo Café](https://github.com/Cafe-GameDev/Repo-Cafe) para uma pasta local (`~/.cafe-gemini/Repo-Cafe`). Este repositório é um curso completo de Godot em formato de texto, que serve como o "cérebro" do nosso assistente.
3.  **Configuração do PATH**: Intercepta o comando `gemini` para injetar nosso contexto.
4.  **Memória Fixa**: Utiliza uma função nativa do Gemini para "fixar" o diretório do Repo Café na memória. Assim, o assistente **sempre** terá o contexto do curso, não importa em qual pasta do seu sistema você esteja trabalhando.

### Vantagens desta Abordagem

- **Profissionalismo**: Você instala uma ferramenta real, não apenas executa um script em uma pasta.
- **Flexibilidade**: Trabalhe nos seus próprios projetos, em qualquer diretório, e o assistente sempre terá o conhecimento do Repo Café para ajudar.
- **Atualizações Contínuas**: Quando o repositório do curso é atualizado, o Café Gemini baixa a nova versão, garantindo que a IA esteja sempre aprendendo com o conteúdo mais recente.

## Recursos Adicionais

- **Análise de Mídia**: O Gemini pode "ver" e analisar arquivos de imagem e áudio do seu projeto.
- **Geração de Imagens**: É possível configurar um _Model-Centric Pipeline (MCP)_ para permitir que o Café Gemini gere imagens diretamente pela linha de comando. As instruções estão disponíveis no [repositório oficial do Gemini CLI](https://github.com/google/gemini-cli).

## Instalação

Para instalar o Café Gemini, você precisa ter o [Node.js](https://nodejs.org/) (que inclui o NPM) instalado em seu sistema.

Com o Node.js pronto, abra seu terminal e execute o seguinte comando:

```bash
npm install -g cafe-gemini
```

## Como Usar

Após a instalação, simplesmente abra um novo terminal e execute:

```bash
cafe-gemini
```

## Atualização

Para garantir que você tenha sempre a versão mais recente da ferramenta, com as últimas melhorias e correções, utilize o comando de atualização:

```bash
cafe-gemini-update
```

Este comando irá buscar e instalar a versão mais nova do `cafe-gemini` diretamente do repositório.
