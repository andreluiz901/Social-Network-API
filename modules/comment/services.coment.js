const { getNowDate } = require('../../utils/utilities')
const commentsRepository = require('./repository.comment')


async function createNewAgendaComment(ownerIdComment, agendaPayload) {
    const { message, postId } = agendaPayload
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

    if (idUserLogado === idOwnerPostbyCommentId) {
        const switchReadUnreadComment = await commentsRepository.readUnreadComment(idComment)
        return { is_read: switchReadUnreadComment }
    } else {
        throw new Error("Não foi possível marcar a leitura do comentário")
    }
}

async function deleteAgendaComment(ownerIdComment, idComment) {

    const idOwnerCommentByCommentId = await commentsRepository.getIdOwnerCommentByCommentId(idComment)

    if (idOwnerCommentByCommentId && ownerIdComment === idOwnerCommentByCommentId.id_owner) {
        const isCommentDeleted = await commentsRepository.deleteComment(idComment)
        return isCommentDeleted.rows[0]
    } else {
        throw new Error("Não foi possível deletar o comentário")
    }
}

async function getCommentsPaginatedById(page, limit, idPost) {
    const offsetPage = (limit * page) - limit
    return commentsRepository.getCommentsPageLimitById(offsetPage, limit, idPost)
}

async function editAgendaComment(ownerIdComment, idComment, messageComment) {
    const dateNow = getNowDate()

    const idOwnerCommentByCommentId = await commentsRepository.getIdOwnerCommentByCommentId(idComment)

    if (ownerIdComment === idOwnerCommentByCommentId.id_owner) {
        const commentEdited = await commentsRepository.editComment(messageComment, dateNow, idComment, ownerIdComment)
        return commentEdited
    } else {
        throw new Error("Não foi possível deletar o comentário")
    }
}

module.exports = { createNewAgendaComment, readAgendaComment, deleteAgendaComment, getCommentsPaginatedById, editAgendaComment }