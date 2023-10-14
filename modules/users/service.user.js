const userRepository = require('./repository.user')

function gettAllUsers() {
    return userRepository.findAllUsers()
}

async function createNewUser({ fullName, username, password, email }) {        
    const newUser = await userRepository.create({fullName, username, password, email})
    return newUser
}

async function v2CreateNewUser({ fullName, username, password, email, hashedPhotoName }) {        
    const newUser = await userRepository.v2Create({fullName, username, password, email, hashedPhotoName})
    return newUser
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

async function updateUser (id, {name, username, email}) {
   
    const userUpdate = {name, username, email}
    const userToUpdate = await userRepository.findUserById(id)
    const userUpdated = Object.keys(userToUpdate).reduce(function(acc, userItem){
        if (userUpdate[userItem]){
            return {...acc, [userItem]:userUpdate[userItem]}
        }

        return {...acc, [userItem]:userToUpdate[userItem]}
    },{}) 
    await userRepository.update(userUpdated)
    return userUpdated
}

function deleteUser (id) {
    return userRepository.remove({id})
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
                validateName,
                v2CreateNewUser}