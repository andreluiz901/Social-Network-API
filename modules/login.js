// Quando acessar o login, ele pode se cadastrar, ou ele pode logar
    // Cadastro vai ser um Post para dentro do DB de User
    // Login vai ser uma função que procura aquele usuário e senha no db

const express = require('express');
const loginRouter = express.Router();
const server = express();
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use(bodyParser.json());
const { users } = require('./database');



loginRouter.post('/login', (req,res) => {
    const { username, password} = req.body;
    console.log( username, password);

    for (let search = 0 ; search <= users.length ; search++) {
        if (users[search].username === username) {
            foundUser = users[search];
            console.log('encontrei o ', foundUser)
            break;
        }
    }
    //const user = users.find((user) => user.username === username);

    if (foundUser) {
        bcrypt.compare(password, foundUser.password, (err, result) => {
            if (result) {
                res.status(200).json({ message: "Login bem-sucedido"});
            } else {
                res.status(401).json({ message: "Credenciais Inválidas"});
            }
            });
    } else {
        res.status(401).json({ message: "Credenciais Inválidas"})
    }
    //LÓGICA
    //Pegar os dados com req.body
    //Validar os dados recebidos
    //Autenticação ok, retorna Sucesso
    //Autenticação não-ok, retorna erro
})

module.exports = loginRouter