const express = require('express');
const createNewAgendaPost = require('./services.agenda');
const { authorization } = require('../auth/middleware.auth');
const router = express.Router();

router.post('/newPost', authorization, async (req, res) => {
        try {
                const newPost = await createNewAgendaPost(req);
                res.status(201).json({message:'post criado com sucesso', data:newPost})
        } catch (error) {
                console.log(error)
                res.status(500).json({message:'ocorreu um erro no servidor, não foi possível fazer o post', error: error})
        }
        

})


module.exports = router
