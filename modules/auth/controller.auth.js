const express = require('express');
const router = express.Router();
const multer = require('../../config/multer')
const {signUp,
        signIn,
        v2SignUp,
        v2SignIn} = require('./service.auth')

const {signInSchemaValidator,
        signUpSchemaValidator} = require('./middleware.auth');


router.post('/signIn', signInSchemaValidator, async (req,res) => {
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

router.post('/v2/signIn', signInSchemaValidator, async (req,res) => {
    try {
     const { username, password } = req.body;
 
     const isSigInSuccefully = await v2SignIn({username, password})
  
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

router.post('/signUp', signUpSchemaValidator, multer.single('profile_photo'), async (req,res) => {

    try {
        const { fullName, username, email, password } = req.body;
        const { filename, mimetype, size, path:filepath } = req.file;
        
        const responseSignUp = await signUp({ fullName, username, email, password })
        
        if (responseSignUp) {
            return  res.status(200).json({ data: responseSignUp, message: 'Usuario cadastrado com sucesso'});;
        }
 
        res.status(400).json({ message: 'Não foi possível cadastrar o usuário, favor verifique se as informações estão corretas'}) 

    } catch (error) {
        res.status(500).json({ message: 'Ocorreu um erro inesperado do servidor' })
    }

});


router.post('/v2/signUp', multer.single('profile_photo'),  signUpSchemaValidator, async (req,res) => {
    
    try {
        const { fullName, username, email, password } = req.body;
        const profile_photo = req.file;
        
        const responseSignUp = await v2SignUp({ fullName, username, email, password, profile_photo })

        if (!responseSignUp){
            return res.status(400).json({ message: 'Não foi possível cadastrar o usuário, favor verifique se as informações foram preenchidas corretamente'}) 
        }
 
        return res.status(200).json({ data: responseSignUp, message: 'Usuario cadastrado com sucesso'});;

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Ocorreu um erro inesperado do servidor' })
    }

});

module.exports = router;