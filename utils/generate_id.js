const crypto = require('crypto')

function generateId(){
    return crypto.randomBytes(16).toString("hex");
}

module.exports = {generateId}