const axios = require('axios')

const keepAlive = async () => {
    try {
        setInterval(async () => {
            await axios.post('https://blog-px53.onrender.com/request-reset-password', {
                email: "inexist_email_ab124nn__123...!!!!456@gmail.com"
            })
        }, 1000 * 60 * 5);
    } catch (error) {
        console.log('error trying keep alive')
    }
}

module.exports = { keepAlive }