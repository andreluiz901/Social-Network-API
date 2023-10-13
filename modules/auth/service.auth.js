const {createNewUser} = require('../users/service.user'); 
const {encryptString,compareCryptString} = require('../../utils/cryptstring');
const {userExistbyUsernameOrEmail, findUserByEmail, findUserByUsername} = require('../users/repository.user');
const jwt = require('jsonwebtoken');
const secret = require('../../config/token')

function encryptPassword (password) {
    return encryptString(password)
}
 

async function signIn({username, password}){
    
    const foundUser = await findUserByUsername(username);
    
    if (foundUser) {
        const isSigInSuccefully =  await compareCryptString(password, foundUser[0].password) 
        if (isSigInSuccefully) {
            delete foundUser[0].password

            const token = await jwt.sign(
                {data: foundUser},
                secret, 
                {expiresIn:'1h'}
            )

        
        return {access_token: token,
                data:{id:foundUser[0].id, fullName:foundUser[0].fullName, username:foundUser[0].username, email:foundUser[0].email},}

        }
        
    return isSigInSuccefully;
    }

    return null    
}


async function signUp({fullName, username, email, password}) {

    const existingUser = await userExistbyUsernameOrEmail(username, email);
    if (existingUser) {
        return false
    }

    const hashedPassword = encryptPassword(password);
    
    const userCreated = await createNewUser({fullName, username, email, password:hashedPassword});
    return userCreated
}

module.exports = {    
                encryptPassword, 
                signUp,
                signIn}