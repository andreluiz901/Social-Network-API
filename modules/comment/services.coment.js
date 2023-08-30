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

async function readAgendaComment(ownerIdComment, idPost) {
    
    if (await commentsRepository.checkPostExist(idPost)){
        const readComment = await commentsRepository.readUnreadComment(ownerIdComment, idPost)
        return {is_read:readComment.rows[0].is_read}
    } else {
        throw new Error("Não foi possível marcar a leitura do comentário")
    }

}

module.exports = {createNewAgendaComment, readAgendaComment}