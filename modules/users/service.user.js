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

function validateName (req, res, next) {
    if(!req.body.name){
        res.status(400).json({error:"Favor preencher o campo nome"})
        return
    } else if (req.body.name.length < 4 ) {
        res.status(400).json({error:"Favor preencher o campo nome com pelo menos 4 caracteres"})
        return
    }
    next()
}

module.exports = {gettAllUsers, 
                createNewUser, 
                updateUser, 
                findIndexUserById, 
                deleteUser, 
                validateName}