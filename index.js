const express = require('express');
const server = express();
require('dotenv').config();
const userController = require('./modules/users/controller.user');
const loginController = require('./modules/auth/controller.auth');
const agendaController = require('./modules/agenda/controller.agenda');
server.use(express.urlencoded({extended:true}))
server.use(express.json());
const port = process.env.SERVER_PORT
const cors = require('cors')


const corsOpts = {
    origin: '*',
  
    methods: [
      'GET',
      'POST',
      'PUT',
      'DELETE'
    ],
  
    allowedHeaders: [
      'Content-Type',
    ],
};
  
server.use(cors(corsOpts));


server.use('/users', userController);
server.use('/auth', loginController);
server.use('/agenda', agendaController);

server.listen(port, () =>
console.log('Server rodando na porta', port));