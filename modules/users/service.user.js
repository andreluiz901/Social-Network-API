const { users:userRepository } = require('../database')
const {generateId} = require('../../utils/generate_id')

function gettAllUsers() {
    return userRepository
}

function createNewUser({ name, username, email, password }) {
    const id = generateId();

    const newInstanceUser = {
        id,
        name, 
        username, 
        email, 
        password
    }

    userRepository.push(newInstanceUser)
    
    return newInstanceUser
}

function findIndexUserById(id) {
    return userRepository.findIndex((user) => user.id === id)
}
function updateUser (id, {name, username, email, password}) {
    const userIndexFound = findIndexUserById(id)

    const userFound = userRepository[userIndexFound]

    const userUpdated = {
        ...userFound,
        name,  
        username, 
        email, 
        password}

    userRepository[userIndexFound] = userUpdated

    return userUpdated
}

function deleteUser (id) {
    const userIndexFound = findIndexUserById(id)

    userRepository.splice(userIndexFound,1)

    return true
}

module.exports = {gettAllUsers, createNewUser, updateUser, findIndexUserById, deleteUser}