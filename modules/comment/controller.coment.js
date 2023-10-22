const express = require('express');
const { authorization } = require('../auth/middleware.auth');
const validateMessagePost = require('../agenda/middleware.agenda');
const { createNewAgendaComment, readAgendaComment, deleteAgendaComment, getCommentsPaginatedById } = require('./services.coment');
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
        const idUserLogado = req.userId
        const idComment = req.params.id
        
        const readComment = await readAgendaComment(idUserLogado, idComment)
        res.status(201).json({data:readComment, message:"Comentário marcado com sucesso"})
    } catch (error){
        console.log(error)
        res.status(500).json({message:error.message})
    }
})

router.delete('/:id?', authorization, async (req,res) => {
    try {
        const idUserLogado = req.userId
        const idComment = req.params.id
        const deleteComment = await deleteAgendaComment(idUserLogado, idComment)
        res.status(200).json({data:deleteComment, message:"Comentário excluído com sucesso"})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:error.message})
    }
})

router.get('/post/:id?', authorization, async(req, res) => {
    try {
        const idPost = req.params.id
        const {page, limit} = req.query
        const responsePostPage = await getCommentsPaginatedById(page, limit, idPost)
        res.status(200).json(
                {data: responsePostPage.data, 
                page:parseInt(page), 
                limit: parseInt(limit), 
                count:parseInt(responsePostPage.count)})
    } catch (error) {
        res.status(500).json({message:'ocorreu um erro no servidor, não foi possível obter a lista de postagens', error: error})
}
})

module.exports = router