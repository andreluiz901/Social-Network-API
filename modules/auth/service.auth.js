const { users:userRepository } = require('../database')
const bcrypt = require('bcrypt');
const { hashSteps } = require('../../utils/utilities')
const { generateId } = require('../../utils/generate_id')
const mailFormat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const passwordFormat = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()\-=_+{}[\]|;:",.<>/?]).{6,20}$/;

function isNotEmpty (req) {
    if (req.body.name || req.body.username || req.body.password || req.body.email) {
        return true
    } else { 
        return false
    }
    next()
}

function findUserByUsername(username) {
    if (username !== undefined){
    return userRepository.find((user) => user.username === username);
    } else {
        return username = false
    }
};

function passwordCompare (user, password, req, res) {
    bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
            return res.status(200).json({ message: "Login bem-sucedido"});
        } else {
            return res.status(401).json({ message: "Credenciais Inválidas"});
        }
    })

}

function validateName (req, res, next) {
    if(!req.body.name){
        res.status(400).json({error:"Favor preencher o campo nome"})
        return
    } else if (req.body.name.length < 4 ) {
        res.status(400).json({error:"Favor preencher o campo nome com pelo menos 4 caracteres"})
        return
    }
    next()
}

function validateUsername (req, res, next) {
    if(!req.body.username){
        return res.status(400).json({error:"Favor preencher o campo Username"})
    };
    console.log((req.body.username.split(" ")));
    if((req.body.username.split(" ")).length > 1 ) {
        return res.status(400).json({error:"Não é permitido preencher o campo Username com espaços"})
    };
    if (req.body.username.length < 4 ) {
        res.status(400).json({error:"Favor preencher o campo username com pelo menos 4 caracteres"})
        return
    }
    next()
}

function validateEmail (req, res, next) {
    if(!req.body.email){
        res.status(400).json({error:"Favor preencher o campo email"});
        return
    } else if (mailFormat.test(req.body.email)) { //(req.body.email.match(mailFormat)) {
        next() 
    } else {
        res.status(400).json({error:"Favor utilize um email adequado"});
    }
    
}

function validatePassword (req, res, next) {
    if(!req.body.password){
        return res.status(400).json({error:"Favor preencher o campo Password"});
    } 
    
    if (!req.body.password.match(passwordFormat)) {
        return res.status(400).json({error:"Favor utilize uma senha que contenha de 6 a 20 dígitos, com um caractere maiúsculo, um minúsculo, um número e um especial."});

    } 
    next()
}

function encryptPassword (password) {
    return bcrypt.hashSync(password, hashSteps)
}

function addUser (user) {
    //const hashedPassword = encryptPassword(password);
    const id = generateId();

    const newUser = {
        id,
        ...user};
    userRepository.push(newUser);
};

function findUserByUsername(username) {
    return userRepository.find((user) => user.username === username);
};

function findUserByEmail(email) {
    return userRepository.find((user) => user.email === email);
};



module.exports = {findUserByUsername,
                findUserByEmail, 
                passwordCompare, 
                validateUsername,
                validateEmail,
                validatePassword,
                validateName,
                addUser,
                encryptPassword,
                isNotEmpty}