const hashSteps = 10;
const jwt = require('jsonwebtoken');
const secret = require('../config/token');



function getNowDate() {
    const nowDate = new Date()
    const year = nowDate.getFullYear()
    const month = nowDate.getMonth() + 1 // returns 0-based, needs increment 1
    const day = nowDate.getDate()
    // const hour = nowDate.getHours()
    // const minute = nowDate.getMinutes()
    // const second = nowDate.getSeconds()
    const fullDate = `${year}/${month}/${day}`
    return fullDate
}

function recoverId(req) {
    const token = req.headers['authorization'].split(' ')[1]
    const tokenDecode = jwt.decode(token, secret)
    const userId = tokenDecode.data[0].id
    return userId
}

module.exports = {hashSteps, getNowDate, recoverId}