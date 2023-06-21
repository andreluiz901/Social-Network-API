const express = require('express');
const server = express();
const bodyParser = require('body-parser');
const brcrypt = require('bcryptjs');
const {generateId} = require('../utils/generate_id');
server.use(bodyParser.json());

function validateNewUser (req, res, next) {
    const name = req.body.name
    const password = req.body.password
    const email = req.body.email
    //const { name = '', password= '', email=''} = req.body;
    // verificar campos
    if ( !name || !password || !email ) {
        return res.status(400).json({ error: 'Por favor, preencha todos os campos obrigatórios (*).'})
    }
    // verificar se o email é único
    const existingUser = users.find(user => user.email === email);
    if (existingUser){
        return res.status.json({ error:'Email inválido.'});
    }
    // Criptografia - Senha
    const hashedPassword = brcrypt.hashSync(password, 10);
    // Criando objeto com dados
    const newUser = {
        id: generateId(),
        name:name,
        password:hashedPassword,
        email:email
    };
    // Inserir o novo usuário com a senha hashed
    //users.push(newUser);

    res.status(201).json({ message: "Usuário criado com sucesso", user:newUser });

    next();
};

module.exports = {validateNewUser};
