# API REDE SOCIAL / SOCIAL NETWORK API

**ESTE PROJETO ESTÁ EM CONSTRUÇÃO**
**THIS PROJECT IS UNDER CONSTRUCTION**

## INTRODUÇÃO

Este projeto é minha atual iniciativa pessoal de estudo em desenvolvimento de software em Backend, onde busco construir uma API para um modelo de rede social. Esta rede social permite o cadastro de usuários que podem postar, editar, deletar e ler as próprias postagens, e as postagens de outros usuários. Todos os usuários podem comentar outras postagens, e as postagens podem ser marcadas como lidas somente pelo dono do post original. Mesmo simples, estas funcionalidades estão sendo implementadas com ferramentas profissionais de desenvolvimento. Este projeto vem sendo atualmente ainda construído, e está sendo implementado em conjunto com outros usuários. 

Obrigado pelo extenso e valoroso trabalho colaborativo, aos amigos e colegas de profissão:

- [Ramon Pereira](https://github.com/HugoRamonPereira) : Frontend
- [Felipe Ferraresi](https://github.com/HugoRamonPereira) : Supervisão do Projeto

## VISÃO GERAL DO SISTEMA

Esta API é responsável por tratar três grupos de rotas e tratamentos de dados de um sistema de rede social com foco em postagem de usuários. O primeiro ambiente é um conteúdo de usuários, que permite criar, alterar, manipular e deletar usuários através de um usuário administrativo do sistema, que pode ser acessado em `modules/users`. Outras rotas(*endpoints*) são responsáveis pelas devidas autenticações, validações, middlewares de acesso, em `modules/auth`. A ideia da rede social é que seja utilizada como uma agenda aberta de usuarios, onde eles podem postar suas atividades, e outros usuarios podem comentar modos de melhorar a produtividade ou fazer comentários específicos das atividades e registros entre si. Assim, as rotas responsáveis pelas atividades de agenda estão em `modules/agenda`, enquanto os comentários são tratados em `modules/comment`.

Para complementar, ainda existem rotas para um sistema de Login com username e password. Todas estas rotas foram gerenciadas e criadas com Node e Express. Estas rotas possuem autenticações e autorizações. Para conversar com os dados, a api utiliza de querys de SQL para tratar, enviar e consultar dados nas requisições.

Em geral, toda a trativa da API é possível ser visualizada com o seguinte esquema:

```mermaid
graph LR
A[Request]-->B(index)-->C(modules)
C-->D((users))-->|middlewares|H(users.controller)
C-->E((agenda))-->|middlewares|I(agenda.controller)
C-->F((auth))-->|middlewares|J(auth.controller)
C-->G((comment))-->|middlewares|K(comment.controller)

H-->h(users.services)
I-->i(agenda.services)
J-->j(auth.services)
K-->k(comment.services)

h-->Hh(users.repository)
i-->Ii(agenda.repository)
j-->Jj(auth.repository)
k-->Kk(comment.repository)

Hh-->L(response)
Ii-->L(response)
Jj-->L(response)
Kk-->L(response)
```

De modo complementar, o *schema* do banco de dados da api se encontra atualmente disposto da forma abaixo. Acredito que a imagem abaixo vai ajudar a entender como foram montadas as *querys* do repository e as chamadas de bancos de dados:
<div align="center">

![schema banco de dados da aplicação](./imgs/database_schema_img01.PNG)

</div>

## INSTALAÇÃO E CONFIG

### Como começar a utilizar esta API?

- Primeiro realize um fork deste repositório.
- Em seguida, faça um clone do repositório para o seu ambiente de desenvolvimento local.
- Instale as dependências da API com `npm install`, este comando irá instalar todas as dependencias necessárias para a api funcionar com base no `package.json` que está na raiz do repositório.
- Para iniciar a api basta utilizar o comando `npm start`

    Itens necessários para configurar e implantar o sistema:

        bcrypt: ^5.1.0
        bcryptjs: ^2.4.3
        body-parser: ^1.20.2
        cors: ^2.8.5
        dotenv: ^16.3.1
        express: ^4.18.2
        jsonwebtoken: ^9.0.0
        node-pre-gyp: ^0.17.0
        pg: ^8.11.1
        pg-protocol: ^1.6.0

    Dependencias de desenvolvimento:
        
        nodemon: ^2.0.22

### INFORMAÇÕES GERAIS DA APLICAÇÃO

Esta aplicação foi desenvolvida utilizando majoritariamente NODE e EXPRESS com Javascript. Um modelo de rotas está demonstrado acima, mas é convencionado para o padrão Controlador (Middlewares) --> Serviços --> Repositório. Os controladores e middlewares fazem o tratamento da rota em si, enquanto as regras de negócios ficam a cargo dos Serviços. Por outro lado, o tratamento dos dados dos usuários no banco de dados são tratados por querys que são formuladas e enviadas pelo repositório, onde sempre é tomado cuidado para abrir e fechar o banco a cada solicitação, por uma questão de segurança. No momento é utilizado o PostgreSQL, junto com DBeaver para o tratamento de dados.

Existe uma validação com token JWT na aplicação para garantir o acesso de cada usuário. Está melhor descrita no decorrer do documento abaixo. 

Ainda, é necessário se atentar que a aplicação só funcionará se houver um arquivo `.env` na raiz da aplicação. Este arquivo não estará atrelado e nem será clonado junto ao fazer o clone da aplicação. Caso queira utilizar a base desta api, atente-se de criar um arquivo .env com informações necessárias para a chave JWT funcionar corretamente, definições de chave e acesso do banco de dados, porta de acesso para a api e demais dados sensíveis da aplicação. 

## (TEMPORÁRIO) ACESSO PELO NGROK

**Rotas para conversação com o Banco de Dados de serviços de projetos.**

Atenção: Exemplo de link Ngrok (Esse link sempre mudará ao executar a abertura pelo Ngrok, mas vou tentar deixar atualizado e verificar sempre que abrir o servidor).

https://d210-2804-29b8-500c-eff-c2c-6b9e-da38-5251.ngrok-free.app

Acessar através deste link deve lhe direcionar para o meu endereço local:

http://localhost:3000

Então, você precisa complementar o restante do caminho. Por exemplo, adicionar o "/users" para a rota de usuarios ou "/signUp" para a rota de cadastro, após o link do ngrok. O que irá resultar em uma parte **estática** do link e uma parte volátil indicando a rota. Como nos exemplos abaixo.

**https://e42f-2804-29b8-500c-3ec9-64e0-2c5d-2189-d54e.ngrok-free.app**/users

**https://e42f-2804-29b8-500c-3ec9-64e0-2c5d-2189-d54e.ngrok-free.app**/signIn

**https://e42f-2804-29b8-500c-3ec9-64e0-2c5d-2189-d54e.ngrok-free.app**/signUp

Como sempre está mudando, verifique qual o caminho da rota aqui no postman, e substitua o localhost:3000 pelo link do Ngrok atual, complementando com o caminho da rota.

**Pontos importantes**
Provavelmente você será perguntado se irá querer acessar na primeira vez que entrar. Basta clicar em "Visit Site". É um HTTPS, mas mesmo assim deve haver uma detecção de insegurança.

Por favor, perceba que só será possível acessar caso eu tenha iniciado o servidor na minha máquina. Se você receber um "ERR_NGROK_8012" ou "ERR_NGROK_3200", é por quê eu não iniciei o servidor localmente, ou estou utilizando a porta 3000 para algum outro acesso. Basta me informar, que se for possível eu gero outro link em outra porta ou inicio o servidor.

Para saber mais do Ngrok, tente começar por esse [artigo](https://medium.com/desenvolvendo-com-paixao/ngrok-do-localhost-para-o-mundo-5445ad08419)


## (TEMPORÁRIO) ACESSO PELO RENDER

Uma versão atualizada da api está disponível para ser consultada por frontend através de: https://blog-px53.onrender.com .

## ENDPOINTS

### Visão Geral das Rotas

Antes de adentrar em cada rota, abaixo segue um esquema das rotas funcionais e atuais da API:
 
**auth**

- **[POST]** *'/auth/signIn* : Realiza o acesso de um usuário no sistema através de username e password no body da requisição. Cria um token JWT para o usuário utilizar durante sua sessão.
- **[POST]** *'/auth/signUp* : Permite o cadastro de um usuário no sistema. Necessário informar fullName, username, email, password através do body da requisição. A Senha é encriptada antes de ser adicionada no banco de dados.

**agenda**

- **[POST]** *'/agenda'* : Cria uma postagem do usuário (necessita autorização JWT de usuário logado)
- **[GET]** *'/agenda/post?page=1&limit=20'* : Acessa e retorna todos as postagens do banco de forma paginada pelo page e limit do params
- **[DELETE]** *'/agenda/post/:id?'* : Deleta uma postagem, somente o dono da postagem pode deletar (necessita autorização JWT de usuário logado)
- **[PUT]** *'/agenda/post/:id?'* : Edita uma postagem, somente o dono da postagem pode atualizar o corpo da postagem (necessita autorização JWT de usuário logado).

**comment**

- **[POST]** *'/comment'* : Cria e registra o comentário de um usuário na postagem de outro usuário ou de sua própria autoria (necessita autorização JWT de usuário logado).
- **[PATCH]** '*/comment/read/:id?*' : Permite que o dono e somente o dono da postagem marque os comentários como lidos/não lidos e registra esta única alteração no sistema (necessita autorização JWT de usuário logado).

**users**

- **[GET]** *'/users'* : Retorna todos os usuários cadastrados no sistema.
- **[GET]** *'/users/:id'* : Retorna um usuário específico do banco (necessita autorização JWT de usuário logado)
- **[POST]** *'/users'* : Cria um usuário diretamente no banco de dados. (necessita autorização JWT de usuário logado)
- **[PUT]** *'/users/:id?'* : Edita um usuário através do seu id. Pode editar um ou mais dados do usuário (necessita autorização JWT de usuário logado).
- **[DELETE]** *'/users/:id?'* : Deleta um usuário através do seu id (necessita autorização JWT de usuário logado).


### Rota de Login (signIn)

Esta rota recebe um JSON através do body, que será enviado para realizar o login do usuário no sistema.

Exemplo de JSON como input no body:

`{"username":"nome_do_usuario_na_plataforma", "password":"Senh4_do_usuário"}`

Algumas regras precisam ser validadas para cadastrar um novo usuário:

* **Todos os campos precisam estar preenchidos, e preenchidos de forma correta.**
* **Username**: Contem apenas um nome (*string*), informado pelo usuário.
* **Password**: Contém apenas uma senha (*string*), fornecida pelo usuário.

Estes dados serão validados no banco de dados. Caso, os dados sejam válidos, irá retornar um objeto JSON com uma mensagem e um token JWT.

Exemplo de JSON como output no body:

`{"message":"SignIn realizado com sucesso!", "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjpbeyJpZCI6MTQsInVzZXJuYW1lIjoiam9zaXZhbGRvIiwibmFtZSI6ImFudG9uaW8iLCJlbWFpbCI6ImFudG9uaW9AZ21haWwuY29tIn1dLCJpYXQiOjE2ODkzNzk4MjcsImV4cCI6MTY4OTM4MzQyN30.AYtnUyJJE1O1exdG7VBE0AnofEkVZzQHsv_PRNGmBXE"}`

*Atenção com a Autenticação com **JWT***

**A autenticação JWT:** Atualmente estamos criando um token válido dentro da nossa API com 1 hora de duração. Por enquanto, este token ainda não está sendo tratado para revalidar após o tempo de expiração. Esta feature precisa ser adicionada no futuro.
Para navegar na plataforma, é necessário atribir este token para o usuário. E será verificado no acesso das rotas. Caso o token não esteja atribuído corretamente no header, ou o token seja inválido, as rotas irão responder com suas devidas mensagens e status de erro.

Quando o token não existir (*status 403*):

`{"message":"Usuário sem token"}`

Quando o token não for validado no JWT (*status 401*):

`{"message":"Usuário sem autorização"}`

Para outros casos (*status 403*):

`{"message":"Usuário não pôde acessar"}`

**Acesso Inválido**
Nos casos em que o usuário informar dados inválidos, independente de qual seja o erro, apenas uma mensagem com *status 401* é retornada:

`{"message": "Credenciais Inválidas"}`

**Erro de Servidor**
Se por ventura houver algum problema durante a requisição que o servidor não consiga responder. Será respondido uma mensagem com *status 500*:

`{"message": "Ocorreu um erro inesperado no servidor"}`

## AUTHENTICATIONS AND AUTHORIZARIONS

Por padrão, as rotas dos usuários precisam passar em um middleware de autorização, validando um token JWT no header da requisição. Para isso, seguem as regras gerais das rotas.

*Atenção com a Autenticação com **JWT***

**A autenticação JWT:** Atualmente estamos criando um token válido dentro da nossa API com 1 hora de duração. Por enquanto, este token ainda não está sendo tratado para revalidar após o tempo de expiração. Esta feature será adicionada no futuro.
Para navegar na plataforma, é necessário atribir este token para o usuário. E será verificado no acesso das rotas. Caso o token não esteja atribuído corretamente no header, ou o token seja inválido, as rotas irão responder com suas devidas mensagens e status de erro.

Quando o token não existir (*status 403*):

`{"message":"Usuário sem token"}`

Quando o token não for validado no JWT (*status 401*):

`{"message":"Usuário sem autorização"}`

Para outros casos (*status 403*):

`{"message":"Usuário não pôde acessar"}`

As documentações das demais rotas estão em construção no momento e serão atualizadas conforme o tempo seja conveniente. No entanto, a maioria das rotas está implementada e funcionando sem grandes problemas e bem intuitivamente. Caso necessário basta entrar em contato direto comigo por aqui ou redes sociais e estarei disposto em auxiliar.

## CONTATO

Olá, pode falar diretamente comigo pelo github, ou através do meu email: silva.ala82@gmail.com.

Se preferir, me encontra lá no linkedIn:   <a href="https://www.linkedin.com/in/andreluiz3" target="_blank"><img src="https://img.shields.io/badge/-LinkedIn-%230077B5?style=for-the-badge&logo=linkedin&logoColor=white" target="_blank"></a>