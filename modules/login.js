const express = require('express');
const loginRouter = express.Router();
const server = express();
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use(bodyParser.json());
const { users } = require('./database');

loginRouter.post('/', (req,res) => {
    const { username, password} = req.body;
    console.log( username, password);

    for (let search = 0 ; search <= users.length ; search++) {
        if (users[search].username === username) {
            foundUser = users[search];
            console.log('encontrei o ', foundUser)
            break;
        }
    }
    //const user = users.find((user) => user.username === username);

    if (foundUser) {
        bcrypt.compare(password, foundUser.password, (err, result) => {
            if (result) {
                res.status(200).json({ message: "Login bem-sucedido"});
            } else {
                res.status(401).json({ message: "Credenciais Inválidas2"});
            }
            });
    } else {
        res.status(401).json({ message: "Credenciais Inválidas"})
    }

})

module.exports = loginRouter