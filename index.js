const express = require('express');
const {generateId} = require('./utils/generate_id');
const server = express();
server.use(express.urlencoded({extended:true}))
server.use(express.json()); // faz com que o express entenda JSON
const port = 3000

let users = []
  
// CRUD - Create, Read, Update, Delete
server.get('/users', (req, res) => {
  return res.send({data:'aqui é uma qualquer coisa'})
  //return res.send({data:users}) 
}) // rota para listar todos os users


server.post('/users', (req, res) => {
  const id = generateId();

  if(!req.body.name){
    res.json({error:"Favor preencher o campo nome"})
    return
  }

  const novoUsuario = {
    id,
    ...req.body,
  }

  users.push(novoUsuario)

  res.json(novoUsuario);
})

server.put('/users/:id?', (req, res) => {
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
  }) // retorna novamente os users atualizados após o update

server.delete('/users/:id?', (req, res) => {
  const idUserDeletar = req.params.id

  const listaUsersAtualizado = users.filter((item) => {
      return item.id !== idUserDeletar
   })

   users = listaUsersAtualizado

   res.json({success:true})
}) // retorna os dados após exclusão


server.listen(port);