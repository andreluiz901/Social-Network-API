const express = require('express');
const {generateId} = require('./utils/generate_id');
const server = express();
const userRouter = require('./modules/userRouter');
server.use(express.urlencoded({extended:true}))
server.use(express.json()); // faz com que o express entenda JSON
const port = 3000

server.use('/users', userRouter);

server.listen(port);