const userRepository = require('./repository.user')
const {generateId} = require('../../utils/generate_id')

function gettAllUsers() {
    return userRepository.findAllUsers()
}

function createNewUser({ name, username, password, email }) {
    
        
    return userRepository.create({name, username, password, email})
}
 
function findUserByUsername(username) {
    return userRepository.find((user) => user.username === username) || false;
};

function findUserByEmail(email) {
    return userRepository.find((user) => user.email === email);
};

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

module.exports = {
            findUserByUsername,
                findUserByEmail, 
                gettAllUsers, 
                createNewUser, 
                updateUser, 
                findIndexUserById, 
                deleteUser, 
                validateName}