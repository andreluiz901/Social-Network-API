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
        return {message:"Não foi possível deletar o post", status:403}
    }

}

async function updateAgendaPost(idUser, idPost, message){
    const dateUpdate = getNowDate()
    const isOwnerPost = await agendaRepository.updatePost(idUser, idPost, message, dateUpdate)
    if (parseInt(isOwnerPost.rowCount)) {
        return {message:"Mensagem atualizada com sucesso: " + isOwnerPost.rows[0].message, status:200}
    } else {
        return {message:"Não foi possível deletar o post", status:403}
    }
}

module.exports = {createNewAgendaPost, getPostsAgendaPaginated, deletePostAgenda, updateAgendaPost}