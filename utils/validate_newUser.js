const express = require('express');
const server = express();
const bcrypt = require('bcryptjs');
const {generateId} = require('../utils/generate_id');
const { users } = require('../modules/database')
const { hashSteps } = require('./utilities')

function encryptPassword (password) {
    return bcrypt.hashSync(password, hashSteps)
}
function addUser (user) {
    //const hashedPassword = encryptPassword(password);
    const id = generateId();

    const newUser = {
        id,
        ...user};
    users.push(newUser);
};

function findUserByUsername(username) {
    return users.find((user) => user.username === username);
};

function findUserByEmail(email) {
    return users.find((user) => user.email === email);
};


module.exports = { encryptPassword, addUser, findUserByEmail, findUserByUsername};
