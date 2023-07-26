const { getNowDate, recoverId } = require('../../utils/utilities')
const agendaRepository = require('./repository.agenda')


function createNewAgendaPost(req) {
    const {message} = req.body
    const dateNow = getNowDate()
    const idOwnerPost = recoverId(req)
    const newPostCreated = agendaRepository.createNewPost(message, dateNow, idOwnerPost)
    return newPostCreated
}

module.exports = createNewAgendaPost