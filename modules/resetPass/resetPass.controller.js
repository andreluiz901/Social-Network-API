const express = require('express');
const jwt = require('jsonwebtoken')
const sendPasswordResetEmailTo = require('../mailSender/mailSender');
const { requestResetPassword, resetPassword } = require('./resetPass.service');
const { resetPassSchemaValidator, requestResetPassSchemaValidator } = require('./resetPass.middleware');
const router = express.Router();


router.post('/request-reset-password', requestResetPassSchemaValidator, async (req, res) => {

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

router.post('/reset-password', resetPassSchemaValidator, async (req, res) => {

    const { token, password, confirm_password } = req.body

    try {

        await jwt.verify(token, process.env.SECRET_JWT, async (err, decoded) => {
            if (err) {
                return res.status(401).send({ message: "Invalid token! Please request a new link." });
            }
            req.userId = decoded.data.data.id;

            const userPassReseted = await resetPassword(password, req.userId)

            return res.status(200).json({ data: { id: req.userId, email: userPassReseted }, message: "Successful password reset" })
        })

    } catch (error) {
        console.log('error: ', error)
        return res.status(500).json({ message: 'An error occurred, was not possible to reset password now. Please try again later.' })
    }
})

module.exports = router