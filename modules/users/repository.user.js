const { createConnectionDatabase, disconnectDatabase } = require("../../config/database")

async function findById(id) {
    //retorna tudo do usuario pelo Id
    //SQL tem que ter comando SELECT co WHERE (pesquisar sobre)
}

async function findAllUsers() {
    const clientDatabase = await createConnectionDatabase()
    const responseQuery = await clientDatabase.query('SELECT * FROM public.users')
    await disconnectDatabase(clientDatabase)
    return responseQuery.rows
}

async function create({name, username, password, email}) {
    const clientDatabase = await createConnectionDatabase()
    const responseQuery = await clientDatabase.query('INSERT INTO public.users (name, username, password, email) VALUES ($1, $2, $3, $4) RETURNING id', [name, username, password, email])
    await disconnectDatabase(clientDatabase)
    return {id:responseQuery.rows[0].id, name, username, password, email}
}

async function update({id, nome, username, password, email}) {
    // No SQL pesqusiar UPDATE com WHERE pelo Id
    // Essa função tem que receber o Id e as informações que serão alteradas pelo usuário
    // será possível alterar 1 propriedade, permanecendo as demais intactas
    // Não será possível alterar senha pelo update (que terá outra rota para alterar apenas senha)
    // algumas coisas serão feitas pelo service
}

async function remove(id) {
    // Recebe apenas id 
    // Pesquisar DELETE com WHERE pelo id 

}

module.exports = {findAllUsers, create};