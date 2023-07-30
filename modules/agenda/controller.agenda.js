const express = require('express');
const {createNewAgendaPost, getPostsAgendaPaginated, deletePostAgenda} = require('./services.agenda');
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
                console.log(error)
                res.status(500).json({message:'ocorreu um erro no servidor, não foi possível obter a lista de postagens', error: error})
        }
        
})

router.delete('/post/:id?', authorization, async (req, res) => {
        try {
                const idUser = req.userId
                const idPost = req.params.id
                const deleteAgendaPost = await deletePostAgenda(idUser, idPost)
                console.log("deleteAgendaPost", deleteAgendaPost)
                res.status(200).json({data:deleteAgendaPost})
        } catch (error) {
                console.log("error", error)

        }
})



module.exports = router
