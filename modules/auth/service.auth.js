const {createNewUser} = require('../users/service.user'); 
const {encryptString,compareCryptString} = require('../../utils/cryptstring');
const {findUserByUsername, findUserByEmail} = require('../users/repository.user')

function encryptPassword (password) {
    return encryptString(password)
}
 

async function signIn({username, password}){
    console.log(username)
    const foundUser = await findUserByUsername(username);
    console.log(foundUser)
 
    if (foundUser.length > 0) {
      const isSigInSuccefully =  await compareCryptString(password, foundUser[0].password) 

      return isSigInSuccefully;
   
    } 
    
    return null
}


function signUp({name, username, email, password}) {

    const existingUser = findUserByUsername(username);
    if (existingUser) {
        return null
    }

    const existingEmail = findUserByEmail(email);
    if (existingEmail) {
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