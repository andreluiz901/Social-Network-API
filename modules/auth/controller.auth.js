const express = require('express');
const router = express.Router();
const {signUp,
        signIn} = require('./service.auth')
 const {findUserByUsername,
            passwordCompare,
            validateUsername,
            validateEmail,
            validatePassword,
            validateName,
            encryptPassword, 
            findUserByEmail} = require('./middleware.auth')


router.post('/signIn', async (req,res) => {
    const { username, password } = req.body;
    const isSigInSuccefully = await signIn({username, password})
 
    if(isSigInSuccefully){
        res.status(200).json({ message: "SignIn realizado com sucesso!"})
        return 
    }
    res.status(401).json({ message: "Credenciais Inválidas"})
})


router.post('/signUp', validateUsername, validateEmail, validatePassword, validateName, (req,res) => {

    const { name, username, email, password } = req.body;

    const responseSignUp = signUp({ name, username, email, password })
 
    if (responseSignUp) {
        return  res.status(200).json({ data: responseSignUp, message: 'Usuario cadastrado com sucesso'});;
    }
 
    res.status(400).json({ message: 'Usuário existente'}) 
});

module.exports = router;