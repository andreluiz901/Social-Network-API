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
    fullName:Joi.string().pattern((/^[a-z][A-Z]+ [a-z][A-Z]+$/i)).required(), 
    email:Joi.string().email({ minDomainSegments:2 }).required(), 
    password:Joi.string().pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()\-=_+{}[\]|;:",.<>/?]).{6,20}$/).required().messages({
        'any.only':'Passwords do not match.'
    }),
    confirmPassword:Joi.ref('password')
}).with('password', 'confirmPassword')

const profilePhotoSchema = Joi.object({
        fieldname: Joi.string(), // 'profile_photo'
        originalname: Joi.string(), // 'img_01.jpg',
        encoding: Joi.string(), //'7bit',
        mimetype: Joi.string().valid('image/jpg', 'image/jpeg', 'image/png').messages({
            'any.only':'Only jpg, jpeg, png files are valid'
        }), //'image/jpeg',
        buffer: Joi.binary(), //<Buffer ff d8 ff e1 1c 40 45 78 69 66 00 00 4d 4d 00 2a 00 00 00 08 00 0c 01 00 00 03 00 00 00 01 02 80 00 00 01 01 00 03 00 00 00 01 02 80 00 00 01 02 00 03 ... 231241 more bytes>,
        size: Joi.number().integer().max(2000000), //231291
})

const signInSchema = Joi.object({
    username: Joi.string().alphanum().min(4).max(25).required(),
    password:Joi.string().required(),
})

module.exports = {signInSchema, signUpSchema, validateOptions, profilePhotoSchema}