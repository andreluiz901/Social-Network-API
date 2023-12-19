const nodemailer = require('nodemailer')
const { google } = require('googleapis');
const compilerHtml = require('./compileHTML');
const OAuth2 = google.auth.OAuth2;

const oauth2Client = new OAuth2(
    process.env.OAUTH_CLIENTID,
    process.env.OAUTH_CLIENT_SECRET,
    "https://developers.google.com/oauthplayground"
);

oauth2Client.setCredentials({
    refresh_token: process.env.OAUTH_REFRESH_TOKEN
});
const accessToken = oauth2Client.getAccessToken()

const transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: true,
    auth: {
        type: 'OAuth2',
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
        clientId: process.env.OAUTH_CLIENTID,
        clientSecret: process.env.OAUTH_CLIENT_SECRET,
        refreshToken: process.env.OAUTH_REFRESH_TOKEN,
        accessToken
    },
    tls: { rejectUnauthorized: false, }
})

async function sendPasswordResetEmailTo(user, jwtToken) {

    const html = await compilerHtml('./modules/mailSender/templates/template.resetPass.html', {
        username: user.username,
        link: `https://${process.env.URL_FRONT}/password_reset/${jwtToken}`
    })

    return transporter.sendMail({
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