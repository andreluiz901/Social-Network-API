const express = require('express');
const loginRouter = express.Router();
const server = express();
const bcrypt = require('bcrypt');
server.use(express.urlencoded({ extended: true }));
server.use(express.json());
const { users } = require('./database');

loginRouter.post('/', (req,res) => {
    const { username, password} = req.body;

    for (let search = 0 ; search <= users.length ; search++) {
        if (users[search].username === username) {
            foundUser = users[search];
            break;
        }
    }

    if (foundUser) {
        bcrypt.compare(password, foundUser.password, (err, result) => {
            if (result) {
                res.status(200).json({ message: "Login bem-sucedido"});
            } else {
                res.status(401).json({ message: "Credenciais Inválidas"});
            }
            });
    } else {
        res.status(401).json({ message: "Credenciais Inválidas"})
    }

})

module.exports = loginRouter