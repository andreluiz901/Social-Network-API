const { getNowDate } = require('../../utils/utilities')
const agendaRepository = require('./repository.agenda')


function createNewAgendaPost(ownerdId, agendaPayload) {
    const {message} = agendaPayload
    const dateNow = getNowDate()
    const newPostCreated = agendaRepository.createNewPost(message, dateNow, ownerdId)
    return newPostCreated
}

function getPostsAgendaPaginated(page, limit) {
    const offsetPage = (limit*page)-limit
    return agendaRepository.getPostAgendaPageLimit(offsetPage, limit)
}

module.exports = {createNewAgendaPost, getPostsAgendaPaginated}