const { createConnectionDatabase, disconnectDatabase } = require("../../config/database");

async function createNewPost(messagePost, actualDate, ownerId) {
    console.log("actualDate", actualDate)
    const clientDatabase = await createConnectionDatabase();
    const responseQuery = await clientDatabase.query(
        'INSERT INTO public.posts (data_criacao, data_atualizacao, mensagem, id_criador) VALUES ($1, $1, $2, $3) RETURNING id',[actualDate, messagePost, ownerId])
    await disconnectDatabase(clientDatabase)
    console.log(responseQuery)
    return {id:responseQuery.rows.id, messagePost, actualDate}
}

module.exports = {createNewPost}