const express = require('express');

const server = express();

server.use(express.json()); // faz com que o express entenda JSON

// Query params = ?teste=1
// Route params = /users/1
// Request body = { "name": "Brendon", "email": "brendon@email.com"}

// CRUD - Create, Read, Update, Delete

// const users = ['Brendon', 'Lara', 'Gregory', 'Hunter'];

const users = []
  

server.get('/users', (req, res) => {
  return res.json(users);
}) // rota para listar todos os users

server.get('/users/:index', (req, res) => {
  return res.json(req.geek);    
})

server.post('/users', (req, res) => {
  const { name } = req.body; // assim esperamos buscar o name informado dentro do body da requisição  
  users.push(name);
  return res.JSON.stringfy(users); // retorna a informação da variavel users
})

server.put('/users/:index', (req, res) => {
  const { index } = req.params; // recupera o index com os dados
  const { name } = req.body;
  users[index] = name; // sobrepõe/edita o index obtido na rota de acordo com o novo valor
  return res.json(users);
}); // retorna novamente os users atualizados após o update

server.delete('/users/:index', (req, res) => {
  const { index } = req.params; // recupera o index com os dados

  users.splice(index, 1); // percorre o vetor até o index selecionado e deleta uma posição no array

  return res.send();
}); // retorna os dados após exclusão


server.listen(3000);