const express = require('express');
const createNewAgendaPost = require('./services.agenda');
const { authorization } = require('../auth/middleware.auth');
const router = express.Router();

router.post('/newPost', authorization, async (req, res) => {
        const newPost = await createNewAgendaPost(req.body);
        res.status(201).json({message:'post criado com sucesso', data:newPost})

})


module.exports = router
