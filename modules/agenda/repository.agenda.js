const { createConnectionDatabase, disconnectDatabase } = require("../../config/database");

async function createNewPost(messagePost, dateCreated, ownerId) {
    const clientDatabase = await createConnectionDatabase();
    const responseQuery = await clientDatabase.query(
        'INSERT INTO public.posts (data_criacao, data_atualizacao, mensagem, id_criador) VALUES ($1, $1, $2, $3) RETURNING id',[dateCreated, messagePost, ownerId])
    await disconnectDatabase(clientDatabase)
    return {id:responseQuery.rows[0].id, messagePost, dateCreated}
}

module.exports = {createNewPost}