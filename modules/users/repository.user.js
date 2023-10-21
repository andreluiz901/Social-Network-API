const { createConnectionDatabase, disconnectDatabase } = require("../../config/database")

async function userExistbyUsernameOrEmail(username, email) {
    const clientDatabase = await createConnectionDatabase()
    const responseQuery = await clientDatabase.query(
        'SELECT username, email FROM public.users WHERE (username=$1) OR (email=$2) LIMIT 1', [username, email])
    await disconnectDatabase(clientDatabase)
    return responseQuery.rowCount
}

async function findUserByUsername(username) {
    const clientDatabase = await createConnectionDatabase()
    const responseQuery = await clientDatabase.query(
        'SELECT * FROM public.users WHERE username=$1', [username])
    await disconnectDatabase(clientDatabase)
    return responseQuery.rows
}

async function findUserByEmail(email) {
    const clientDatabase = await createConnectionDatabase()
    const responseQuery = await clientDatabase.query(
        'SELECT email FROM public.users WHERE email=$1', [email])
    await disconnectDatabase(clientDatabase)
    return responseQuery.rows
}

async function findUserById(id) {
    const clientDatabase = await createConnectionDatabase()
    const userFoundedById = await clientDatabase.query(
        'SELECT * FROM public.users WHERE id=$1 LIMIT 1', [id])
    await disconnectDatabase(clientDatabase) 
    delete userFoundedById.rows[0].password
    return userFoundedById.rows[0]
}

async function findAllUsers() {
    const clientDatabase = await createConnectionDatabase()
    const responseQuery = await clientDatabase.query(
        'SELECT * FROM public.users')
    await disconnectDatabase(clientDatabase)
    return responseQuery.rows
}

async function create({fullName, username, password, email}) {
    const clientDatabase = await createConnectionDatabase()
    const responseQuery = await clientDatabase.query(
        'INSERT INTO public.users ("fullName", username, password, email) VALUES ($1, $2, $3, $4) RETURNING id', [fullName, username, password, email])
    await disconnectDatabase(clientDatabase)
    return {id:responseQuery.rows[0].id, fullName, username, email}
}

async function v2Create({fullName, username, password, email, hashedPhotoName}) {
    const clientDatabase = await createConnectionDatabase()
    const responseQuery = await clientDatabase.query(
        'INSERT INTO public.users ("fullName", username, password, email, profile_photo) VALUES ($1, $2, $3, $4, $5) RETURNING id', 
        [fullName, username, password, email, hashedPhotoName])
    await disconnectDatabase(clientDatabase)
    return {id:responseQuery.rows[0].id, fullName, username, email}
}

async function update({id, fullName, username, email, profile_photo}) {
    const clientDatabase = await createConnectionDatabase()
    const responseQuery = await clientDatabase.query(
        'UPDATE public.users SET "fullName"=$1, username=$2, email=$3, profile_photo=$4 WHERE id=$5 returning *', 
        [fullName, username, email, profile_photo, id])
    await disconnectDatabase(clientDatabase)
    delete responseQuery.rows[0].password
    return responseQuery.rows[0]
}

async function remove({id}) {
    const clientDatabase = await createConnectionDatabase()
    const responseQuery = await clientDatabase.query(
        'DELETE FROM public.users WHERE id=$1', [id])
    await disconnectDatabase(clientDatabase)
    return responseQuery
}

module.exports = {userExistbyUsernameOrEmail, 
                findUserByUsername, 
                findUserByEmail, 
                findUserById, 
                findAllUsers, 
                create,
                v2Create,
                update, 
                remove};