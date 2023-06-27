
const bcrypt = require('bcrypt');
const mailFormat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const passwordFormat = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()\-=_+{}[\]|;:",.<>/?]).{6,20}$/;
const {compareCryptString} = require('../../utils/cryptstring')
 

function isNotEmpty (req) {
    if (req.body.name || req.body.username || req.body.password || req.body.email) {
        return true
    } else { 
        return false
    }
    next()
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

module.exports = { 
    validateUsername,
    validateEmail,
    validatePassword,
    validateName,  
    isNotEmpty}