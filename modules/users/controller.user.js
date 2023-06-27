const express = require('express');
const userRouter = express.Router();
const { gettAllUsers, 
        createNewUser,
        updateUser,
        deleteUser,
        validateName} = require('./service.user');
const { update, findUserById } = require('./repository.user');

userRouter.get('/', async (req, res) => {
    const responseAllUsers = await gettAllUsers()
    res.send({ data: responseAllUsers });
});

userRouter.get('/:id', async (req,res) => {
    const responseUserById = await findUserById(req.params.id)
    res.send({ data: responseUserById });
});
  
userRouter.post('/', validateName, async (req, res) => {
    const newInstanceUser = await createNewUser(req.body);
    res.status(201).json({ data:newInstanceUser, message: "Usuário criado com sucesso!"})
});
  
userRouter.put('/:id?', async (req, res) => {
    const idUserUpdate = req.params.id
    const userUpdated = await updateUser(idUserUpdate, req.body)
    res.status(201).json({data:userUpdated, message: "Usuário editado com sucesso!"})
});
  
userRouter.delete('/:id?', (req, res) => {
    const UserDeleted = deleteUser(req.params.id)
    res.json({success:UserDeleted})
});
  

module.exports = userRouter;