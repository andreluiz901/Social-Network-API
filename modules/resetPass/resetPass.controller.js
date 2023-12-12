const express = require('express');
const sendPasswordResetEmailTo = require('../mailSender/mailSender');
const requestResetPassword = require('./resetPass.service');
const router = express.Router();


router.post('/request-reset-password', async (req, res) => {

    const { email } = req.body

    try {
        const userToResetPassword = await requestResetPassword(email)

        if (userToResetPassword) {
            sendPasswordResetEmailTo(userToResetPassword.data, userToResetPassword.newJwtTokenToResetPass)
            return res.status(200).json({ message: `An email was send to ${email} with instructions to reset password.` })
        }
        return res.status(401).json({ message: 'Email not found. Please check and try again.' })

    } catch (error) {
        console.log('error: ', error)
        return res.status(500).json({ message: 'não foi possível solicitar o serviço no momento' })
    }
})


module.exports = router