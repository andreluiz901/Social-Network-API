const { encryptPassword } = require("../auth/service.auth");
const { getUserByEmail, updatePassword } = require("../users/repository.user");
const jwt = require('jsonwebtoken')

async function requestResetPassword(email) {

    const existingUser = await getUserByEmail(email);

    if (existingUser.count) {

        const token = await jwt.sign(
            { data: existingUser },
            process.env.SECRET_JWT,
            { expiresIn: 60 * 15 }
        )

        return { ...existingUser, newJwtTokenToResetPass: token }
    }
    return false
}

async function resetPassword(password, userId) {
    const hashedPassword = encryptPassword(password)
    const userPasswordUpdated = updatePassword(hashedPassword, userId)
    return userPasswordUpdated
}

module.exports = { requestResetPassword, resetPassword }