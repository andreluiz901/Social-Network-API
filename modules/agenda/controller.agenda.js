const express = require('express');
const {createNewAgendaPost, getPostsAgendaPaginated, deletePostAgenda, updateAgendaPost} = require('./services.agenda');
const { authorization } = require('../auth/middleware.auth');
const validateMessagePost = require('./middleware.agenda');
const router = express.Router();

router.post('/', authorization, validateMessagePost,  async (req, res) => {
        try {
                const ownerId = req.userId
                const newPost = await createNewAgendaPost(ownerId, req.body);
                res.status(201).json({message:'post criado com sucesso', data:newPost})
        } catch (error) {
                res.status(500).json({message:'ocorreu um erro no servidor, não foi possível fazer o post', error: error})
        }
})

router.get('/post', async (req, res) => {
        try {
                const {page, limit} = req.query
                const responsePostPage = await getPostsAgendaPaginated(page, limit)
                res.status(200).json(
                        {data: responsePostPage.data, 
                        page:parseInt(page), 
                        limit: parseInt(limit), 
                        count:parseInt(responsePostPage.count)})
        } catch (error) {
                res.status(500).json({message:'ocorreu um erro no servidor, não foi possível obter a lista de postagens', error: error})
        }
        
})

router.delete('/post/:id?', authorization, async (req, res) => {
        try {
                const idUser = req.userId
                const idPost = req.params.id
                const deleteAgendaPost = await deletePostAgenda(idUser, idPost)
                res.status(deleteAgendaPost.status).json({message:deleteAgendaPost.message})
        } catch (error) {
                res.status(500).json({erro:'ocorreu um erro no servidor, não foi possível deletar o post', erro: error})

        }
})

router.put('/post/:id?', authorization, async (req,res) => {
        try {
                const idUser = req.userId
                const idPost = req.params.id
                const {message} = req.body
                const updatePost = await updateAgendaPost(idUser, idPost, message)
                res.status(updatePost.status).json(
                        {data:{
                                idUser:idUser, 
                                idPost:parseInt(idPost), 
                                message:message}, 
                        message:updatePost.message})
        } catch (error) {
                res.status(500).json({message:'ocorreu um erro no servidor, não foi possível atualizar o post', erro: error})
        }
})



module.exports = router
