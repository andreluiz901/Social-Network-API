const {createNewUser} = require('../users/service.user'); 
const {encryptString,compareCryptString} = require('../../utils/cryptstring');
const {userExistbyUsername, findUserByEmail} = require('../users/repository.user');
const jwt = require('jsonwebtoken');
const secret = require('../../config/token')

function encryptPassword (password) {
    return encryptString(password)
}
 

async function signIn({username, password}){
    
    const foundUser = await userExistbyUsername(username);
 
    if (foundUser.length > 0) {
        const isSigInSuccefully =  await compareCryptString(password, foundUser[0].password) 
        
        if (isSigInSuccefully) {
            delete foundUser[0].password

            const token = await jwt.sign(
                {data: foundUser},
                secret, 
                {expiresIn:'1h'})
            return token

        }
        
        return isSigInSuccefully;
    }

    return null    
}


function signUp({name, username, email, password}) {

    const existingUser = userExistbyUsername(username);
    if (existingUser.length > 0) {
        return null
    }

    const existingEmail = findUserByEmail(email);
    if (existingEmail.length > 0) {
        return null
    }

    const hashedPassword = encryptPassword(password);
    
    const userCreated = createNewUser({name, username, email, password:hashedPassword});

    return userCreated
}

module.exports = {    
                encryptPassword, 
                signUp,
                signIn}