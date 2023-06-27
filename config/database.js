const {Client} = require('pg')

async function createConnectionDatabase(){
    const client = new Client({
        host: 'silly.db.elephantsql.com',
        port: 5432,
        database: 'kdyeimxj',
        user: 'kdyeimxj',
        password: '6tXR_yh3mpgIZpOgWXvPcjqQ2zhuP1ta'})
    await client.connect()
    return client
}

async function disconnectDatabase(clientDatabase){
    await clientDatabase.end()
}

module.exports = {createConnectionDatabase, disconnectDatabase}