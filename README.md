# Café Gemini CLI

Bem-vindo ao Café Gemini, seu **parceiro de desenvolvimento colaborativo** para o ecossistema Godot.

O Café Gemini transforma o Gemini em um copiloto que tem acesso direto e total ao seu ambiente de desenvolvimento. Em vez de você precisar copiar e colar código para obter ajuda, o Café Gemini já tem acesso a todo o seu projeto, incluindo scripts, cenas e a arquitetura geral do seu jogo.

Ele é, em essência, o Gemini para desenvolvedores Godot, e o melhor de tudo: **roda diretamente no seu celular via Termux!**

## Comandos da Ferramenta

O Café Gemini vem com um conjunto de comandos para agilizar seu desenvolvimento:

-   `cafe-gemini` ou `repo-cafe`:
    -   **Função:** Inicia a sessão de chat com o assistente. `repo-cafe` é um alias para `cafe-gemini`.
    -   **Uso:** `cafe-gemini`

-   `cafe-new <nome-do-projeto>`:
    -   **Função:** Cria um novo projeto Godot a partir do template oficial do "Repo Café", já com estrutura de pastas e o framework de testes (GUT) configurado.
    -   **Uso:** `cafe-new meu-novo-jogo`

-   `cafe-gemini-update`:
    -   **Função:** Atualiza a ferramenta `cafe-gemini` para a versão mais recente. O processo de atualização também garante que sua cópia local do Repo-Café esteja sincronizada com a versão da ferramenta.
    -   **Uso:** `cafe-gemini-update`

-   `repo-update`:
    -   **Função:** Atualiza especificamente o repositório de conhecimento (Repo-Café), baixando as últimas atualizações dos manuais. É ideal para obter o conteúdo mais recente, que pode ser atualizado com mais frequência do que a ferramenta em si.
    -   **Uso:** `repo-update`

## Como Funciona?

O Café Gemini é um wrapper inteligente para o `gemini-cli` do Google. Ele utiliza o repositório [Repo Café](https://github.com/Cafe-GameDev/Repo-Cafe) — um curso completo de Godot em formato de texto — como uma base de conhecimento fixa. Isso garante que, não importa em qual projeto você esteja trabalhando, o assistente sempre terá o contexto de boas práticas e da arquitetura Godot para lhe auxiliar.

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

## Recursos Adicionais

-   **Análise de Mídia**: O Gemini pode "ver" e analisar arquivos de imagem e áudio do seu projeto.
-   **Geração de Imagens**: É possível configurar um _Model-Centric Pipeline (MCP)_ para permitir que o Café Gemini gere imagens diretamente pela linha de comando. As instruções estão disponíveis no [repositório oficial do Gemini CLI](https://github.com/google/gemini-cli).

## Modo de Operação de Conteúdo (NSFW)

Para garantir total liberdade criativa em projetos destinados a um público adulto, o Café Gemini possui um modo de operação explícito (NSFW).

-   **Modo Padrão (SFW):** Por padrão, o assistente opera com as políticas de segurança de conteúdo do Google, evitando temas sensíveis.
-   **Modo Explícito (NSFW):** Se um arquivo chamado `NSFW` (sem extensão) for detectado na raiz do seu projeto, as restrições de conteúdo são suspensas. Isso permite que o assistente colabore na criação de diálogos com linguagem explícita, descrições de violência e outros temas maduros, respeitando a visão criativa do seu projeto.

Se você solicitar um conteúdo que seria bloqueado, o próprio assistente oferecerá a criação do arquivo `NSFW` para ativar o modo explícito.