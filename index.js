const express = require('express');
const server = express();
const userRouter = require('./modules/userRouter');
const loginRouter = require('./modules/login');
const newUserRouter = require('./modules/newUser')
server.use(express.urlencoded({extended:true}))
server.use(express.json()); // faz com que o express entenda JSON
const bodyParser = require('body-parser');
server.use(bodyParser.json());
const port = 3000

server.use('/users', userRouter);
server.use('/users', loginRouter);
server.use('/user', newUserRouter)

server.listen(port);