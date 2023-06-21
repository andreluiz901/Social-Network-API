const express = require('express');
const newUserRouter = express.Router();
const server = express();
const bodyParser = require('body-parser');
const {
    encryptPassword,
    addUser,
    findUserByEmail,
    findUserByUsername} = require('../utils/validate_newUser');
const {users} = require('../modules/database')
server.use(bodyParser.json());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

newUserRouter.post('/', (req,res) => {

    const { username, email, password } = req.body;
    console.log(username, email, password)
    console.log('data: ', users)
    
    const existingUser = findUserByUsername(username);
    if (existingUser) {
        return res.status(400).json({ message: 'Nome de Usuário existente'});
    }

    const existingEmail = findUserByEmail(email);
    if (existingEmail) {
        return res.status(400).json({ message: 'email ja existente'});
    }

    const hashedPassword = encryptPassword(password);

    addUser (username, email, hashedPassword);

    res.status(200).json({ message: 'Usuario cadastrado com sucesso'});

});

module.exports = newUserRouter;