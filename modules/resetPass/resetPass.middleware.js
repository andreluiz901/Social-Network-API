const schemas = require('../../config/schema')


function resetPassSchemaValidator(req, res, next) {

    const { error, value: _data } = schemas.resetPassSchema.validate(req.body, schemas.validateOptions)

    if (error) {
        const joiError = {
            errors: error.details.map(({ message, path, type }) => {
                console.log(type)
                return {
                    message: message.replace(/['"\"']/g, ''),
                    field: path[0]
                }
            })
        }
        return res.status(400)
            .json({
                data: joiError,
                message: 'Some fields were filled out incorrectly.'
            })
    }
    next()
}

function requestResetPassSchemaValidator(req, res, next) {

    const { error, value: _data } = schemas.requestResetPassSchema.validate(req.body, schemas.validateOptions)

    if (error) {
        const joiError = {
            errors: error.details.map(({ message, path, type }) => {
                console.log(type)
                return {
                    message: message.replace(/['"\"']/g, ''),
                    field: path[0]
                }
            })
        }
        return res.status(400)
            .json({
                data: joiError,
                message: 'Some fields were filled out incorrectly.'
            })
    }
    next()
}

module.exports = { resetPassSchemaValidator, requestResetPassSchemaValidator }