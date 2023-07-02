const bcrypt = require('bcrypt');
const { hashSteps } = require('./utilities') 
 
function encryptString (word) {
    return bcrypt.hashSync(word, hashSteps)
}
 
async function compareCryptString(password, criptWord){
    const isMatch = await bcrypt.compare(password, criptWord); 
    return isMatch; 
}

module.exports ={
    encryptString,
    compareCryptString
}