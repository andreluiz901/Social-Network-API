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

async function deletePostAgenda(idUser, idPost) {
    const isOwnerPost = await agendaRepository.deletePost(idUser, idPost)
    if (parseInt(isOwnerPost.rowCount)) {
        return {message:"Post Deletado com sucesso", status:200}
    } else {
        return {message:"Este Post não existe ou o Usuário não é o dono do Post", status:403}
    }

}

module.exports = {createNewAgendaPost, getPostsAgendaPaginated, deletePostAgenda}