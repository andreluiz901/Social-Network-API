const bcrypt = require('bcrypt');
const { hashSteps } = require('./utilities') 
 
function encryptString (word) {
    return bcrypt.hashSync(word, hashSteps)
}
 
async function compareCryptString(password, criptWord){
    console.log(password, criptWord)
    const isMatch = await bcrypt.compare(password, criptWord); 
    console.log(isMatch)
    return isMatch; 
}

module.exports ={
    encryptString,
    compareCryptString
}