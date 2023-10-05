const express = require('express');
const router = express.Router();
const schema = require('../../config/schema')

const {signUp,
        signIn} = require('./service.auth')

const {validateUsername,
        validateEmail,
        validatePassword,
        validateName,
        authSchemaValidator} = require('./middleware.auth');
const Joi = require('joi');


router.post('/signIn', async (req,res) => {
   try {
    const { username, password } = req.body;
    const isSigInSuccefully = await signIn({username, password})
 
    if(isSigInSuccefully){
        res.status(200).json(isSigInSuccefully)
        return 
    }
    res.status(401).json({ message: "Credenciais Inválidas"})
    
   } catch (error) {
    console.log(error.message)
    res.status(500).json({ message: "Ocorreu um erro inesperado no servidor"})
   }
    
});


router.post('/signUp', validateUsername, validateEmail, validatePassword, validateName, async (req,res) => {

    try {
        const { fullName, username, email, password } = req.body;
        
        const {error, usernamevalidate} = schema.validate({ username})
        console.log()
        const responseSignUp = await signUp({ fullName, username, email, password })

 
        if (responseSignUp) {
            return  res.status(200).json({ data: responseSignUp, message: 'Usuario cadastrado com sucesso'});;
        }
 
        res.status(400).json({ message: 'Não foi possível cadastrar o usuário, favor verifique se as informações estão corretas'}) 

    } catch (error) {
        res.status(500).json({ message: 'Ocorreu um erro inesperado do servidor' })
    }

});
    
router.post('/signUpTests', authSchemaValidator, async (req,res) => {

    try {
        const { fullName, username, email, password } = req.body;
        
        const {error, value: usernameValidado} = schema.validate({username})
        console.log(error, usernameValidado)

        if (error){
            return res.status(400).json({message:error.details[0].message})
        }

        return res.status(200).json(usernameValidado)
    } catch (error) {
        return res.status(500).json(error.message)
    }
        

        


});

module.exports = router;