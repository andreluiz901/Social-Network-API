const express = require('express');
const server = express();
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const {generateId} = require('../utils/generate_id');
const { users } = require('../modules/database')
server.use(bodyParser.json());


function encryptPassword (password) {
    return bcrypt.hashSync(password, 10)
}
function addUser (username, email, password) {
    //const hashedPassword = encryptPassword(password);
    const newUser = {
        username, 
        email, 
        password};
    users.push(newUser);
};

function findUserByUsername(username) {
    return users.find((user) => user.username === username);
};

function findUserByEmail(email) {
    return users.find((user) => user.email === email);
};


module.exports = { encryptPassword, addUser, findUserByEmail, findUserByUsername};
