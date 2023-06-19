const express = require('express');
const { generateId } = require('../utils/generate_id');
const {validateName} = require('../utils/validate_name');
const userRouter = express.Router();


let users = [];

userRouter.get('/:id?', (req, res) => {
    res.send({ data: users });
});
  
userRouter.post('/', validateName, (req, res) => {
    const id = generateId();

    const novoUsuario = {
        id,
        ...req.body,
    }

    users.push(novoUsuario)

    res.json(novoUsuario);
});
  
userRouter.put('/:id?', (req, res) => {
    // Restante do código do PUT
    const idUserAlterar = req.params.id
  const idUserAlterado = users.findIndex(function(item){
     return item.id == idUserAlterar
  })
  
  const userAlterado = {
      ...users[idUserAlterado],
      ...req.body,
  }
  users[idUserAlterado] = userAlterado
  
  res.json(userAlterado)
});
  
userRouter.delete('/:id?', (req, res) => {
    // Restante do código do DELETE
    const idUserDeletar = req.params.id

    const listaUsersAtualizado = users.filter((item) => {
        return item.id !== idUserDeletar
    })

    users = listaUsersAtualizado

    res.json({success:true})
});
  

module.exports = userRouter;