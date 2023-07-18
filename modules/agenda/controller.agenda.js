const express = require('express');
const router = express.Router();

router.post('/newPost', async (req, res) => {
    try {
        const {newPostMessage} = req.body
        //const newPost = await createNewPost()
        res.status(201).json({message:'post criado com sucesso', newPostMessage})
    } catch (error) {

    }
})


module.exports = router
