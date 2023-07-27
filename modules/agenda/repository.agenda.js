const { createConnectionDatabase, disconnectDatabase } = require("../../config/database");

async function createNewPost(messagePost, dateCreated, ownerId) {
    const clientDatabase = await createConnectionDatabase();
    const responseQuery = await clientDatabase.query(
        'INSERT INTO public.posts (date_created, date_last_update, message, id_creator) VALUES ($1, $1, $2, $3) RETURNING id',[dateCreated, messagePost, ownerId])
    await disconnectDatabase(clientDatabase)
    return {id:responseQuery.rows[0].id, messagePost, dateCreated}
}

async function getPostAgendaPageLimit(page, limit) {
    const offsetPage = (limit*page)-limit
    const clientDatabase = await createConnectionDatabase();
    const responseQuery = await clientDatabase.query(
        'SELECT * FROM public.posts ORDER BY date_created DESC LIMIT $1 OFFSET $2',[limit, offsetPage]
    )
    const totalRows = await clientDatabase.query(
        'SELECT COUNT(*) FROM public.posts'
    )
    await disconnectDatabase(clientDatabase)
    return {totalRows:totalRows.rows[0].count, lastRows:responseQuery.rows}
}
module.exports = {createNewPost, getPostAgendaPageLimit}