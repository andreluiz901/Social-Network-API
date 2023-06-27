const bcrypt = require('bcrypt');
const { hashSteps } = require('./utilities') 
 
function encryptString (word) {
    return bcrypt.hashSync(word, hashSteps)
}
 
async function compareCryptString(word,criptWord){
    const isMatch = await bcrypt.compare(word,criptWord); 
    
    return isMatch; 
}

module.exports ={
    encryptString,
    compareCryptString
}