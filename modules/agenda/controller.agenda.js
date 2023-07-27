const express = require('express');
const createNewAgendaPost = require('./services.agenda');
const { authorization } = require('../auth/middleware.auth');
const validateMessagePost = require('./middleware.agenda');
const router = express.Router();

router.post('/', authorization, validateMessagePost,  async (req, res) => {
        try {
                const ownerId = req.userId
                const newPost = await createNewAgendaPost(ownerId, req.body);
                res.status(201).json({message:'post criado com sucesso', data:newPost})
        } catch (error) {
                console.log(error)
                res.status(500).json({message:'ocorreu um erro no servidor, não foi possível fazer o post', error: error})
        }
        

})


module.exports = router
