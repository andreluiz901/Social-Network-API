const nodemailer = require('nodemailer')
const compilerHtml = require('./compileHTML');

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
    tls: { rejectUnauthorized: false, }
})

async function sendPasswordResetEmailTo(user, jwtToken) {

    const html = await compilerHtml('./modules/mailSender/templates/template.resetPass.html', {
        username: user.username,
        link: `https://${process.env.URL_FRONT}/password_reset/${jwtToken}`
    })

    return await transporter.sendMail({
        from: `${process.env.EMAIL_NAME} <${process.env.EMAIL_FROM}>`,
        to: `${user.username} <${user.email}>`,
        subject: `Password Reset - My App Social`,
        html
    })
}


async function mailSenderService(username, email, template) {
    const html = await compilerHtml(`./modules/mailSender/templates/${template}`, {
        username,
        link: `https://${process.env.URL_FRONT}`
    })

    return transporter.sendMail({
        from: `${process.env.EMAIL_NAME} <${process.env.EMAIL_FROM}>`,
        to: `${username} <${email}>`,
        subject: `Welcome - My App Social`,
        html
    })
}

module.exports = { sendPasswordResetEmailTo, mailSenderService }