const express = require('express');
const server = express();
require('dotenv').config();
const userController = require('./modules/users/controller.user');
const loginController = require('./modules/auth/controller.auth');
const agendaController = require('./modules/agenda/controller.agenda');
const commentController = require('./modules/comment/controller.coment');
server.use(express.urlencoded({extended:true}))
server.use(express.json());
const port = process.env.SERVER_PORT
const cors = require('cors')


const corsOpts = {
  
    methods: [
      'GET',
      'POST',
      'PUT',
      'DELETE'
    ]
};
  
server.use(cors({ "origin": "*",
"methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
"preflightContinue": true,
"optionsSuccessStatus": 204}));


server.use('/users', userController);
server.use('/auth', loginController);
server.use('/agenda', agendaController);
server.use('/comment', commentController);

server.listen(port, () =>
console.log('Server rodando na porta', port));