const Joi = require('joi')

    
const validateOptions = {
    abortEarly: false,
    allowUnknown: true,
    messages:{
        'string.base': `Use only text to this field`,
        'string.empty': `Fields cannot be empty`,
        'string.min': `Please enter a minimum length of {#limit}`,
        'any.required': `Check the required field`,
        'string.pattern.base': "Field entered incorrectly."
    }
}

const signUpSchema = Joi.object({
    username: Joi.string().alphanum().min(4).max(25).required(),
    fullName:Joi.string().trim().strict().required(), 
    email:Joi.string().email({ minDomainSegments:2 }).required(), 
    password:Joi.string().pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()\-=_+{}[\]|;:",.<>/?]).{6,20}$/)
        .required()
        .messages({
        'string.pattern.base': "Field Password must contain betwwen 8 to 20 characters (minimal 1 uppercase, 1 special and 1 numerical character) "
    }),
    confirmPassword:Joi.ref('password')
}).with('password', 'confirmPassword').messages({
    'any.only':'Passwords do not match.'})

const profilePhotoSchema = Joi.object({
        fieldname: Joi.string(),
        originalname: Joi.string(),
        encoding: Joi.string(),
        mimetype: Joi.string().valid('image/jpg', 'image/jpeg', 'image/png')
            .messages({
            'any.only':'Only jpg, jpeg, png files are valid'
            }),
        buffer: Joi.binary(),
        size: Joi.number().integer().max(2000000)
})

const signInSchema = Joi.object({
    username: Joi.string().alphanum().min(4).max(25).required(),
    password:Joi.string().required(),
})

module.exports = {signInSchema, signUpSchema, validateOptions, profilePhotoSchema}