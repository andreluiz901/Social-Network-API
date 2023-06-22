const express = require('express');
const server = express();
const userRouter = require('./modules/userRouter');
const loginRouter = require('./modules/login');
const newUserRouter = require('./modules/newUser')
server.use(express.urlencoded({extended:true}))
server.use(express.json());
const port = 3000

server.use('/users', userRouter);
server.use('/login', loginRouter);
server.use('/newUser', newUserRouter);

server.listen(port, () =>
console.log('Server rodando na porta', port));