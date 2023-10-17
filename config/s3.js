// const aws = require('aws-sdk')

// const endpoint = new aws.Endpoint(process.env.ENDPOINT_S3);

// const s3 = new aws.S3({
//     endpoint,
//     credentials:{
//         accessKeyId:process.env.BUCKET_KEY_ID ,
//         secretAccessKey: process.env.BUCKET_APP_KEY
//     }
// })

const { S3Client } = require('@aws-sdk/client-s3');

const s3 = new S3Client({
    region: process.env.AWS_REGION, // Substitua pela região AWS
    endpoint: 'https://social-media-blog.s3.us-east-005.backblazeb2.com',
    credentials: { 
      accessKeyId: process.env.BUCKET_KEY_ID, // Substitua pelas credenciais
      secretAccessKey: process.env.BUCKET_APP_KEY
    }
});

module.exports = {s3}