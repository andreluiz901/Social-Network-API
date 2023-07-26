const {Client} = require('pg')

async function createConnectionDatabase(){
    const client = new Client({
        host: process.env.HOST_DATABASE,
        port: process.env.PORT_DATABASE,
        database: process.env.DATABASE,
        user: process.env.USER_DATABASE,
        password: process.env.PASSWORD_DATABASE,
        buffer_size: 33554432})
    await client.connect()
    return client
}

async function disconnectDatabase(clientDatabase){
    await clientDatabase.end()
}

module.exports = {createConnectionDatabase, disconnectDatabase}