const express = require('express');
const userRouter = express.Router();
const {validateName} = require('../../utils/validate_user');
const { gettAllUsers, 
        createNewUser,
        updateUser,
        deleteUser 
        } = require('./service.user');

userRouter.get('/', (req, res) => {
    res.send({ data: gettAllUsers() });
});
  
userRouter.post('/', validateName, (req, res) => {
    const newInstanceUser = createNewUser(req.body);
    res.json(newInstanceUser);
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