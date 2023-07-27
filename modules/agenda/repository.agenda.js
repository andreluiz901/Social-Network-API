const { createConnectionDatabase, disconnectDatabase } = require("../../config/database");

async function createNewPost(messagePost, dataCriacao, ownerId) {
    const clientDatabase = await createConnectionDatabase();
    const responseQuery = await clientDatabase.query(
        'INSERT INTO public.posts (data_criacao, data_atualizacao, mensagem, id_criador) VALUES ($1, $1, $2, $3) RETURNING id',[dataCriacao, messagePost, ownerId])
    await disconnectDatabase(clientDatabase)
    return {id:responseQuery.rows[0].id, messagePost, dataCriacao}
}

module.exports = {createNewPost}