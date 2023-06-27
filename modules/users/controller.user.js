const express = require('express');
const userRouter = express.Router();
const { gettAllUsers, 
        createNewUser,
        updateUser,
        deleteUser,
        validateName} = require('./service.user');

userRouter.get('/', async (req, res) => {
    const responseAllUsers = await gettAllUsers()
    res.send({ data: responseAllUsers });
});
  
userRouter.post('/', validateName, async (req, res) => {
    const newInstanceUser = await createNewUser(req.body);
    res.status(201).json({ data:newInstanceUser, message: "Usuário criado com sucesso!"})
});
  
userRouter.put('/:id?', (req, res) => {
    const idUserUpdate = req.params.id
    const userUpdate = req.body
    const userUpdated = updateUser(idUserUpdate, userUpdate)
    res.json(userUpdated)
});
  
userRouter.delete('/:id?', (req, res) => {
    // Restante do código do DELETE
    const idUserDelete = req.params.id

    const isUserDeleted = deleteUser(idUserDelete)

    res.json({success:isUserDeleted})
});
  

module.exports = userRouter;