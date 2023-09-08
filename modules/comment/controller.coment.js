const express = require('express');
const { authorization } = require('../auth/middleware.auth');
const validateMessagePost = require('../agenda/middleware.agenda');
const { createNewAgendaComment, readAgendaComment } = require('./services.coment');
const router = express.Router();


router.post('/', authorization, validateMessagePost, async(req, res) => {
    try {
        const ownerIdComment = req.userId
        const createdNewComment = await createNewAgendaComment(ownerIdComment, req.body)
        res.status(201).json({data:createdNewComment, message:"Comentário realizado com sucesso"})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})

router.patch('/read/:id?', authorization, async(req, res) => {
    try{
        const ownerIdcomment = req.userId
        const idPost = req.params.id
        const readComment = await readAgendaComment(ownerIdcomment, idPost)
        res.status(201).json({data:readComment, message:"Comentário marcado com sucesso"})
    } catch (error){
        console.log(error)
        res.status(500).json({message:error.message})
    }
})

router.delete('/:id?', authorization, async (req,res) => {
    try {
        const ownerIdComment = req.userId
        const idPost = req.params.id
        const deleteComment = await deleteAgendaComment(ownerIdComment, idPost)
        res.status(200).json({data:deleteComment, message:"Comentário excluído com sucesso"})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:error.message})
    }
})

module.exports = router