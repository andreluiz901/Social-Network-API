const { createConnectionDatabase, disconnectDatabase } = require("../../config/database");

async function createNewPost(messagePost, dateCreated, ownerId) {
    const clientDatabase = await createConnectionDatabase();
    const responseQuery = await clientDatabase.query(
        'INSERT INTO public.posts (date_created, date_last_update, message, id_creator) VALUES ($1, $1, $2, $3) RETURNING id',[dateCreated, messagePost, ownerId])
    await disconnectDatabase(clientDatabase)
    return {id:responseQuery.rows[0].id, message_post: messagePost, date_created: dateCreated}
}

async function getPostAgendaPageLimit(offset, limit) {
    
    const clientDatabase = await createConnectionDatabase();
    const responseQuery = await clientDatabase.query(
        'SELECT * FROM public.posts ORDER BY date_created DESC LIMIT $1 OFFSET $2',[limit, offset]
    )
    const totalRows = await clientDatabase.query(
        'SELECT COUNT(id) FROM public.posts'
    )
    await disconnectDatabase(clientDatabase)
    return {count:totalRows.rows[0].count, data:responseQuery.rows}
}

async function deletePost(idUser, idPost){
    const clientDatabase = await createConnectionDatabase();
    const responseQuery = await clientDatabase.query(
        'DELETE FROM public.posts WHERE id_creator=$1 AND id=$2', [idUser, idPost])
    await disconnectDatabase(clientDatabase)
    return responseQuery
}

async function updatePost(idUser, idPost, message, dateUpdate){
    const clientDatabase = await createConnectionDatabase();
    const responseQuery = await clientDatabase.query(
        'UPDATE public.posts SET message=$1, date_last_update=$2 WHERE id_creator=$3 AND id=$4 RETURNING message', [message, dateUpdate, idUser, idPost])
    await disconnectDatabase(clientDatabase)
    return responseQuery
}


module.exports = {createNewPost, getPostAgendaPageLimit, deletePost, updatePost}