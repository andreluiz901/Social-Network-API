const express = require('express');
const newUserRouter = express.Router();
const server = express();
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
const {
    encryptPassword,
    addUser,
    findUserByEmail,
    findUserByUsername} = require('../utils/validate_newUser');
const {
    validateUsername,
    validateEmail,
    validatePassword,
    validateName
    } = require('../utils/validate_user');

newUserRouter.post('/', validateUsername, validateEmail, validatePassword, validateName, (req,res) => {

    const { name, username, email, password } = req.body;

    const existingUser = findUserByUsername(username);
    if (existingUser) {
        return res.status(400).json({ message: 'Nome de Usuário existente'});
    }

    const existingEmail = findUserByEmail(email);
    if (existingEmail) {
        return res.status(400).json({ message: 'email ja existente'});
    }

    const hashedPassword = encryptPassword(password);

    addUser({name, username, email, password:hashedPassword});

    res.status(200).json({ message: 'Usuario cadastrado com sucesso'});

});

module.exports = newUserRouter;