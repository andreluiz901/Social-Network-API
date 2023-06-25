const express = require('express');
const server = express();
const userController = require('./modules/users/controller.user');
const loginController = require('./modules/auth/controller.auth');
const newUserController = require('./modules/auth/controller.auth');
server.use(express.urlencoded({extended:true}))
server.use(express.json());
const port = 3000

server.use('/users', userController);
server.use('/login', loginController);
server.use('/newUser', newUserController);

server.listen(port, () =>
console.log('Server rodando na porta', port));