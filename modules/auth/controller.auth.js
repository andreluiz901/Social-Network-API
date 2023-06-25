const express = require('express');
const server = express();
const router = express.Router();
const bcrypt = require('bcrypt');
server.use(express.urlencoded({ extended: true }));
server.use(express.json());
const {findUserByUsername,
        passwordCompare,
        validateUsername,
        validateEmail,
        validatePassword,
        validateName,
        encryptPassword,
        addUser,
        findUserByEmail} = require('./service.auth')


router.post('/', validateUsername, validatePassword, (req,res) => {
    const { username, password } = req.body;

    const foundUser = findUserByUsername(username);
    console.log(foundUser);
    const comparePwd = passwordCompare(foundUser, password, res);
    
    if (foundUser) {
        return comparePwd
    } else {
        res.status(401).json({ message: "Credenciais Inválidas"})
    }
    
})


router.post('/new', validateUsername, validateEmail, validatePassword, validateName, (req,res) => {

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

module.exports = router;