# MoneyMinder

Bem-vindo ao MoneyMinder! Este é prototipo de um projeto de controle de gastos.

## Descrição
A API MoneyMinder é uma poderosa ferramenta de controle de gastos projetada para ajudar indivíduos e empresas a gerenciar suas finanças de forma eficaz. Ela oferece uma variedade de recursos e funcionalidades que facilitam o acompanhamento de despesas, orçamentos e fluxo de caixa.

## Funcionalidades

- Cadastrar Usuário
- Fazer Login
- Detalhar Perfil do Usuário Logado
- Editar Perfil do Usuário Logado
- Listar categorias
- Listar transações
- Detalhar transação
- Cadastrar transação
- Editar transação
- Remover transação
- Obter extrato de transações
- Filtrar transações por categoria

## Status do projeto
Este projeto está atualmente em desenvolvimento ativo. Estamos constantemente trabalhando nele para torná-lo ainda melhor. Foi desenvolvido todo o escopo BackEnd, no momento esta sendo desenvolvido a parte FrontEnd para comunicar com a Back.

## Código fonte
![image](https://github.com/Michee27/MoneyMinder/assets/140012117/b6da8c1b-4055-4a4f-966d-5433063c358a)

`index.js`: O ponto de entrada do servidor Express.

`rotas.js`: Define as rotas da API e seus controladores.

`controladores`: Processar as solicitações do cliente, interagir com o `db` e retornar uma resposta adequada ao cliente.

`intermediarios.js`: Processa e manipula as solicitações HTTP para verificação dos dados.

`db`: Armazena os dados do banco e as funcionalidades relacionadas ao banco.

`config`: Realiza a conexão com o meu banco de dados e armazena minha chave secreta

## Tecnologias usadas

### JavaScript:
Linguagem de programação de alto nível amplamente utilizada para desenvolvimento web. Ela é conhecida por ser uma linguagem de script, o que significa que você pode escrever código JavaScript diretamente em páginas da web para torná-las interativas e dinâmicas.

### Node.js:
Ambiente de tempo de execução (runtime) de código aberto baseado na engine V8 do Google Chrome. Ele permite que os desenvolvedores utilizem JavaScript para criar aplicativos de servidor, o que é um desvio do uso tradicional do JavaScript no lado do cliente, que é executado nos navegadores.

## Dependências:

### axios: 
A dependência do Axios é uma biblioteca JavaScript comumente usada para fazer solicitações HTTP a partir de um navegador da web ou de um ambiente Node.js. O Axios simplifica a comunicação com servidores da web e fornece uma interface fácil de usar para enviar solicitações e receber respostas. Pode ser instalada com o comando `npm install axios`

### bcrypt: 
Ferramenta amplamente utilizada para a criptografia e a proteção de senhas em aplicativos e sistemas. Ela é usada para criar hashes seguros a partir de senhas e é especialmente eficaz para armazenar senhas com segurança em bancos de dados. Pode ser instalada com o comando `npm install bcrypt`

### express.js: 
O framework web "Express.js", usado para criar aplicativos web e APIs em Node.js. É amplamente utilizado para criar servidores web e simplificar o desenvolvimento web em Node.js. Abra o terminal ou prompt de comando, navegue até o diretório do seu projeto e execute o seguinte comando: `npm install express`

### jsonwebtoken:
ferramenta amplamente utilizada para a autenticação e autorização em aplicativos da web e serviços da web. Ela permite que você crie e verifique tokens JWT, que são usados para autenticar usuários e garantir a segurança das comunicações entre o cliente e o servidor. Os tokens JWT contêm informações sobre o usuário e um mecanismo de assinatura digital para verificar a autenticidade do token. Pode ser instalado com o comando `npm install jsonwebtoken`

### pg:
Biblioteca para Node.js que permite a conexão com bancos de dados PostgreSQL. PostgreSQL é um sistema de gerenciamento de banco de dados relacional poderoso e amplamente utilizado. pode ser instalado com o comando `npm install pg`

### nodemon: 
Uma ferramenta de desenvolvimento que monitora alterações em arquivos no diretório do seu projeto e reinicia automaticamente o servidor sempre que há uma alteração. É frequentemente usado para desenvolvimento em Node.js para economizar tempo na reinicialização do servidor durante o desenvolvimento. As dependências são bibliotecas ou pacotes necessários para o funcionamento do seu aplicativo, enquanto as devDependencies são pacotes usados apenas durante o desenvolvimento, como no caso do nodemon, que ajuda a manter o servidor atualizado durante o desenvolvimento. Abra o terminal ou prompt de comando, navegue até o diretório do seu projeto e execute o seguinte comando: `npm install -D nodemon`.
Após clonar este repositório, você pode instalar todas as dependências e devDependencies usando o comando: npm install

## Instalação

Para usar este projeto, siga estas etapas:

1. Clone o repositório para sua máquina local usando o seguinte comando:

- [ ] Faça o fork desse repositório para o seu GitHub
- [ ] Clone o projeto em sua máquina
- [ ] Uma vez clonado em sua máquina, realize a instalação das dependências citadas acima e inicie o servidor usando:  
```javascript
npm run dev
```
- [ ] Utilize a insomnia para testar as funções

## Cadastrar usuário 
Cadastrar uma conta acessando pelo seu endpoint: `/usuario`. Acessando a insomnia com `http://localhost:3000/usuario` deverá informar os campos nome, email, e senha para cadastrar o usuário. 

![image](https://github.com/Michee27/MoneyMinder/assets/140012117/2c0eadf5-2944-4289-bf22-47e9bfb631ff)

## Login do usuário
Esse end point deve ser acessado através da URL: `http://localhost:3000/login` que permitirá o usuario cadastrado realizar o login no sistema, informado seu email e senha válida. Se os dados informados forem validados, será retornado para o usuário o seu token de acesso para as próximas etapas na API

![image](https://github.com/Michee27/MoneyMinder/assets/140012117/afcc80d9-1eb2-423c-a262-f5bfce2a4820)


