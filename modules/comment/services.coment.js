const { getNowDate } = require('../../utils/utilities')
const commentsRepository = require('./repository.comment')


async function createNewAgendaComment(ownerIdComment, agendaPayload) {
    const {message, postId} = agendaPayload
    const dateNow = getNowDate()
    if (await commentsRepository.checkPostExist(postId)) {
        const newCommentCreated = await commentsRepository.createNewComment(message, dateNow, ownerIdComment, postId)
        return newCommentCreated
    } else {
        throw new Error("Não foi possível criar o comentário")
    }
}

async function readAgendaComment(idUserLogado, idComment) {
    
    const idOwnerPostbyCommentId = await commentsRepository.getPostOwnerIdByIdComment(idComment)

    if (idUserLogado === idOwnerPostbyCommentId){
        const switchReadUnreadComment = await commentsRepository.readUnreadComment(idComment)
        return { is_read: switchReadUnreadComment}
    } else {
        throw new Error("Não foi possível marcar a leitura do comentário")
    }
}

async function deleteAgendaComment(ownerIdComment, idPost){

    if (ownerIdComment === await commentsRepository.checkOwnerPost(idPost)){
        const deleteComment = commentsRepository.deleteAgendaComment(idPost)
    } else {
        throw new Error("Não foi possível marcar a leitura do comentário")
    }
}

module.exports = {createNewAgendaComment, readAgendaComment, deleteAgendaComment}