const { createConnectionDatabase, disconnectDatabase } = require("../../config/database");

async function createNewPost({messagePost, dataAtual}) {
    const clientDatabase = await createConnectionDatabase();
    const responseQuery = await clientDatabase.query(
        'INSERT INTO public.posts (data_criacao, mensagem) VALUES ($1, $2) RETURNING id',[dataAtual, messagePost])
    await disconnectDatabase(clientDatabase)
    console.log(responseQuery)
    return {id:responseQuery.rows.id, messagePost, dataAtual}
}

module.exports = {createNewPost}