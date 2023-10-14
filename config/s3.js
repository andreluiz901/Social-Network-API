const aws = require('aws-sdk')

const endpoint = new aws.Endpoint(process.env.ENDPOINT_S3);

const s3 = new aws.S3({
    endpoint,
    credentials:{
        accessKeyId:process.env.BUCKET_KEY_ID ,
        secretAccessKey: process.env.BUCKET_APP_KEY
    }
})

module.exports = {s3}