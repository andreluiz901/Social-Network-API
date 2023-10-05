const Joi = require('joi')

const authSchema = Joi.object({
    username: Joi.string().alphanum().min(4).max(25).required()
})

module.exports = authSchema