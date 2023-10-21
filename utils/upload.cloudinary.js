const v2 = require('../config/cloudinary');
let streamifier = require('streamifier');
const { encryptString } = require('./cryptstring');

function encryptProfilePhotoName(profilePhotoName){
    return encryptString(profilePhotoName)
}

async function v3UploadProfilePhotoUser(userId, hashedPhotoName, profilePhotoBuffer){
    
    let streamUpload = (userId, hashedPhotoName, profilePhotoBuffer) => {

        return new Promise((resolve, reject) => {

            const stream = v2.uploader.upload_stream({
                public_id: hashedPhotoName,
                folder: `${process.env.UPLOAD_PHOTO_URL1}${userId}`
                },
                (error, result) => {
                    if (result) {
                        resolve(result);
                    } else {
                        reject(error);
                    }
                });

            streamifier.createReadStream(profilePhotoBuffer).pipe(stream)    
        });
    };
      
    async function uploadStreamprofilePhoto(userId, hashedPhotoName, profilePhotoBuffer) {
      
        const result = await streamUpload(userId, hashedPhotoName, profilePhotoBuffer);

        return result
      
    }
      
    const uploadProfilePhoto = await uploadStreamprofilePhoto(userId, hashedPhotoName, profilePhotoBuffer);
    
    return uploadProfilePhoto
}

function assembleUrlProfilePhoto(idUser, profilePhotoData){
    
    if (profilePhotoData){
        return `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload/v1697764020${process.env.UPLOAD_PHOTO_URL1}${idUser}/${profilePhotoData}`
    }

    return null
}


module.exports = {v3UploadProfilePhotoUser,
    encryptProfilePhotoName,
    assembleUrlProfilePhoto}