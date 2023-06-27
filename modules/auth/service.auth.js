const bcrypt = require('bcrypt');
const { users:userRepository } = require('../database')
const {createNewUser,findUserByUsername , findUserByEmail} = require('../users/service.user'); 
const {encryptString,compareCryptString} = require('../../utils/cryptstring')
 

function encryptPassword (password) {
    return encryptString(password)
}
 

async function signIn({username, password}){

    const foundUser = findUserByUsername(username);
 
    if (foundUser) {
      const isSigInSuccefully =  await  compareCryptString(password, foundUser.password) 

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