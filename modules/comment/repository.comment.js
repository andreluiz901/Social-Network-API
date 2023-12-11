const { createConnectionDatabase, disconnectDatabase } = require("../../config/database");

async function createNewComment(messagePost, dateCreated, ownerIdComment, postId) {
    const clientDatabase = await createConnectionDatabase();
    const responseQuery = await clientDatabase.query(
        'INSERT INTO public.comments (date_created, date_last_update, message, id_owner, id_post) VALUES ($1, $1, $2, $3, $4) RETURNING id', [dateCreated, messagePost, ownerIdComment, postId])
    await disconnectDatabase(clientDatabase)
    return {
        id: responseQuery.rows[0].id,
        message: messagePost,
        date_created: dateCreated,
        date_last_update: dateCreated,
        id_post: postId
    }
}

async function checkPostExist(idPost) {
    const clientDatabase = await createConnectionDatabase();
    const responseQuery = await clientDatabase.query(
        'SELECT COUNT(id) FROM public.posts WHERE id=$1', [idPost])
    await disconnectDatabase(clientDatabase)
    return parseInt(responseQuery.rows[0].count)
}

async function getPostOwnerIdByIdComment(idComment) {
    const clientDatabase = await createConnectionDatabase();
    const responseQuery = await clientDatabase.query(
        `select id_creator from public.comments as c join public.posts as p 
        on c.id_post = p.id where c.id = $1`,
        [idComment])
    await disconnectDatabase(clientDatabase)
    return responseQuery.rows[0].id_creator
}

async function checkOwnerPost(postId) {
    const clientDatabase = await createConnectionDatabase();
    const responseQuery = await clientDatabase.query(
        'select id_creator from public.posts where id = $1', // aqui tem que ser um join, para ver o creator pelo coment? 
        [postId])
    await disconnectDatabase(clientDatabase)
    return responseQuery.rows[0].id_creator
}

async function getIdCommentForRead(ownerIdComment, postId) {
    const clientDatabase = await createConnectionDatabase();
    const responseQuery = await clientDatabase.query(
        `select c.id FROM public.comments as c 
        INNER JOIN public.posts as p ON p.id = c.id_post where p.id_creator=$1 and c.id_post=$2`,
        [ownerIdComment, postId])
    await disconnectDatabase(clientDatabase)
    return responseQuery.rows[0].id
}

async function readUnreadComment(idComment) {
    const clientDatabase = await createConnectionDatabase();
    const responseQuery = await clientDatabase.query(
        'update public.comments set is_read = (case when public.comments.is_read = true then false else true end) where id = $1 RETURNING is_read',
        [idComment])
    await disconnectDatabase(clientDatabase)
    return responseQuery.rows[0].is_read
}

async function getIdOwnerCommentByCommentId(idComment) {
    const clientDatabase = await createConnectionDatabase();
    const responseQuery = await clientDatabase.query(
        'SELECT id_owner FROM public.comments where id=$1',
        [idComment])
    await disconnectDatabase(clientDatabase)
    return responseQuery.rows[0]
}
async function deleteComment(idComment) {
    const clientDatabase = await createConnectionDatabase();
    const responseQuery = await clientDatabase.query(
        'DELETE FROM public.comments where id=$1 returning *',
        [idComment])
    await disconnectDatabase(clientDatabase)
    return responseQuery
}

async function getCommentsPageLimitById(offset, limit, idPost) {
    const clientDatabase = await createConnectionDatabase();
    const responseQuery = await clientDatabase.query(
        'SELECT * FROM public.comments WHERE id_post = $3 ORDER BY date_created DESC LIMIT $1 OFFSET $2',
        [limit, offset, idPost]
    )
    const totalRows = await clientDatabase.query(
        'SELECT COUNT(id) FROM public.comments where id_post=$1',
        [idPost]
    )
    await disconnectDatabase(clientDatabase)
    return { count: totalRows.rows[0].count, data: responseQuery.rows }
}

async function getCommentsByIdPost(idPost) {
    const clientDatabase = await createConnectionDatabase();
    const responseQuery = await clientDatabase.query(
        'SELECT c.id, message, date_created, date_last_update, is_read, username, profile_photo FROM public.comments c join public.users u on c.id_owner = u.id WHERE id_post = $1 ORDER BY date_created DESC',
        [idPost]
    )
    await disconnectDatabase(clientDatabase)
    return { data: responseQuery.rows }
}

async function editComment(messageComment, dateNow, idComment, ownerIdComment) {
    const clientDatabase = await createConnectionDatabase();
    const responseQuery = await clientDatabase.query(
        'UPDATE public.comments SET date_last_update=$1, message=$2 WHERE id=$3 and id_owner=$4 RETURNING *',
        [dateNow, messageComment, idComment, ownerIdComment])
    await disconnectDatabase(clientDatabase)
    return {
        id: responseQuery.rows[0].id,
        message: messageComment
    }
}

module.exports = {
    createNewComment,
    checkPostExist,
    checkOwnerPost,
    getIdCommentForRead,
    readUnreadComment,
    deleteComment,
    getPostOwnerIdByIdComment,
    getIdOwnerCommentByCommentId,
    getCommentsPageLimitById,
    editComment,
    getCommentsByIdPost
}