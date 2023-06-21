const express = require('express');
const {validateNewUser} = require('../utils/validate_newUser');
const bodyParser = require('body-parser');
const server = express();
server.use(bodyParser.json());
const newUserRouter = express.Router();
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
const { users } = require('./database');

newUserRouter.post('/newUser', (req,res) => {
    server.use(bodyParser.json());
    //LÓGICA
    //Pegar os dados com req.body
    //Validar os dados recebidos
    //Autenticação ok, cadastra no DB e retorna Sucesso
    //Autenticação não-ok, retorna erro
    users.push(newUser);
    res.json({ status: 'User created successfully!' })
});

module.exports = newUserRouter;