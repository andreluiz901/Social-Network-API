const { createConnectionDatabase, disconnectDatabase } = require("../../config/database");

async function createNewComment(messagePost, dateCreated, ownerIdComment, postId) {
    const clientDatabase = await createConnectionDatabase();
    const responseQuery = await clientDatabase.query(
        'INSERT INTO public.comments (date_created, date_last_update, message, id_owner, id_post) VALUES ($1, $1, $2, $3, $4) RETURNING id',[dateCreated, messagePost, ownerIdComment, postId])
    await disconnectDatabase(clientDatabase)
    return {id:responseQuery.rows[0].id, 
            message: messagePost, 
            date_created: dateCreated, 
            date_last_update:dateCreated,
            id_post: postId}
}

async function checkPostExist(idPost) {
    const clientDatabase = await createConnectionDatabase();
    const responseQuery = await clientDatabase.query(
        'SELECT COUNT(id) FROM public.posts WHERE id=$1',[idPost])
    await disconnectDatabase(clientDatabase)
    return parseInt(responseQuery.rows[0].count)
}

async function readUnreadComment(ownerIdComment, postId){
    const clientDatabase = await createConnectionDatabase();
    const responseQuery = await clientDatabase.query(
        'select * FROM public.comments as c INNER JOIN public.posts as p ON p.id = c.id_post where p.id_creator=$1 and c.id_post=$2', 
        [ownerIdComment, postId])
    await disconnectDatabase(clientDatabase)
    return responseQuery
}


module.exports = {createNewComment, checkPostExist, readUnreadComment}