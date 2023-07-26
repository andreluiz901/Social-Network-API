# Servidor/API com NODE e EXPRESS

**ESTE PROJETO ESTÁ EM CONSTRUÇÃO**
**THIS PROJECT IS UNDER CONSTRUCTION**

## INTRODUÇÃO

Este projeto é a minha atual iniciativa no desenvolvimento em backend e javascript.

## GENERAL VISION OF SYSTEM

Neste projeto estou desenvolvendo rotas de CRUD (Create, Read, Update e Delete). Mas, não se limita a isto. Para complementar, ainda existem rotas para um sistema de Login com username e password. Estas rotas foram gerenciadas e criadas com Node e Express. Estas rotas possuem autenticações e autorizações. Para conversar com os dados, a api utiliza de querys de SQL para tratar, enviar e consultar dados nas requisições.

## INSTALL AND CONFIG

    Itens necessários para configurar e implantar o sistema.

    Versões e Dependências:
        Node:
        Express:
        Npm:
        JWT:
        .env:

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

## ENDPOINTS

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

Por padrão, as rotas dos usuários precisam passar em um middleware de autorização, validando u token JWT no header da requisição. Para isso, seguem as regras gerais das rotas.

*Atenção com a Autenticação com **JWT***

**A autenticação JWT:** Atualmente estamos criando um token válido dentro da nossa API com 1 hora de duração. Por enquanto, este token ainda não está sendo tratado para revalidar após o tempo de expiração. Esta feature precisa ser adicionada no futuro.
Para navegar na plataforma, é necessário atribir este token para o usuário. E será verificado no acesso das rotas. Caso o token não esteja atribuído corretamente no header, ou o token seja inválido, as rotas irão responder com suas devidas mensagens e status de erro.

Quando o token não existir (*status 403*):

`{"message":"Usuário sem token"}`

Quando o token não for validado no JWT (*status 401*):

`{"message":"Usuário sem autorização"}`

Para outros casos (*status 403*):

`{"message":"Usuário não pôde acessar"}`

## CODE EXAMPLES

## ERRORS TREATMENTS

## SECURITY

## LIMITATIONS AND RESTRICTIONS

## FAQ

## CONTACT
