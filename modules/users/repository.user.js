const { createConnectionDatabase, disconnectDatabase } = require("../../config/database")

async function userExistbyUsername(username) {
    const clientDatabase = await createConnectionDatabase()
    const responseQuery = await clientDatabase.query(
        'SELECT * FROM public.users WHERE username=$1 LIMIT 1', [username])
    await disconnectDatabase(clientDatabase)
    return responseQuery.rows
}

async function findUserByEmail(email) {
    const clientDatabase = await createConnectionDatabase()
    const responseQuery = await clientDatabase.query(
        'SELECT * FROM public.users WHERE email=$1', [email])
    await disconnectDatabase(clientDatabase)
    return responseQuery.rows
}

async function findUserById(id) {
    const clientDatabase = await createConnectionDatabase()
    const userFoundedById = await clientDatabase.query(
        'SELECT * FROM public.users WHERE id=$1 LIMIT 1', [id])
    await disconnectDatabase(clientDatabase) 
    return userFoundedById.rows[0]
}

async function findAllUsers() {
    const clientDatabase = await createConnectionDatabase()
    const responseQuery = await clientDatabase.query(
        'SELECT * FROM public.users')
    await disconnectDatabase(clientDatabase)
    return responseQuery.rows
}

async function create({name, username, password, email}) {
    const clientDatabase = await createConnectionDatabase()
    const responseQuery = await clientDatabase.query(
        'INSERT INTO public.users (name, username, password, email) VALUES ($1, $2, $3, $4) RETURNING id', [name, username, password, email])
    await disconnectDatabase(clientDatabase)
    return {id:responseQuery.rows[0].id, name, username, password, email}
}

async function update({id, name, username, email}) {
    const clientDatabase = await createConnectionDatabase()
    const responseQuery = await clientDatabase.query(
        'UPDATE public.users SET name=$1, username=$2, email=$3 WHERE id=$4', 
        [name, username, email, id])
    await disconnectDatabase(clientDatabase)
    return responseQuery.rows
    // No SQL pesqusiar UPDATE com WHERE pelo Id
    // Essa função tem que receber o Id e as informações que serão alteradas pelo usuário
    // será possível alterar 1 propriedade, permanecendo as demais intactas
    // Não será possível alterar senha pelo update (que terá outra rota para alterar apenas senha)
    // algumas coisas serão feitas pelo service
}

async function remove({id}) {
    const clientDatabase = await createConnectionDatabase()
    const responseQuery = await clientDatabase.query(
        'DELETE FROM public.users WHERE id=$1', [id])
    await disconnectDatabase(clientDatabase)
    return responseQuery 
}

module.exports = {userExistbyUsername, findUserByEmail, findUserById, findAllUsers, create, update, remove};