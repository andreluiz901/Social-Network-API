const { createNewUser, v2CreateNewUser } = require('../users/service.user');
const { encryptString, compareCryptString } = require('../../utils/cryptstring');
const { userExistbyUsernameOrEmail, findUserByEmail, findUserByUsername } = require('../users/repository.user');
const jwt = require('jsonwebtoken');
const secret = require('../../config/token');
const { s3 } = require('../../config/s3');
const { PutObjectCommand } = require('@aws-sdk/client-s3');
const v2 = require('../../config/cloudinary');
let streamifier = require('streamifier');

function encryptPassword(password) {
    return encryptString(password)
}

function encryptProfilePhotoName(profilePhotoName) {
    return encryptString(profilePhotoName)
}

async function uploadProfilePhotoUser(userId, hashedPhotoName, profilePhotoBuffer, profilePhotoMimetype) {
    const uploadProfilePhoto = await s3.upload({
        Bucket: process.env.BACKBLAZE_BUCKET,
        Key: `${process.env.UPLOAD_PHOTO_URL1}${userId}${process.env.UPLOAD_PHOTO_URL2}${hashedPhotoName}`,
        Body: profilePhotoBuffer,
        ContentType: profilePhotoMimetype
    }).promise()

    return uploadProfilePhoto
}

async function v2UploadProfilePhotoUser(userId, hashedPhotoName, profilePhotoBuffer, profilePhotoMimetype) {
    const params = {
        Bucket: process.env.BACKBLAZE_BUCKET,
        Key: `${process.env.UPLOAD_PHOTO_URL1}${userId}${process.env.UPLOAD_PHOTO_URL2}${hashedPhotoName}`,
        Body: profilePhotoBuffer,
        ContentType: profilePhotoMimetype
    }

    const uploadProfilePhoto = await s3.send(new PutObjectCommand(params)) //.promise()

    return uploadProfilePhoto
}

async function v3UploadProfilePhotoUser(userId, hashedPhotoName, profilePhotoBuffer) {

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

async function signIn(username, password) {

    const foundUser = await findUserByUsername(username);

    if (foundUser.length > 0) {
        const isSigInSuccefully = await compareCryptString(password, foundUser[0].password)
        if (isSigInSuccefully) {
            delete foundUser[0].password

            const token = await jwt.sign(
                { data: foundUser },
                secret,
                { expiresIn: '8h' }
            )

            return {
                access_token: token,
                data: {
                    id: foundUser[0].id,
                    fullName: foundUser[0].fullName,
                    username: foundUser[0].username,
                    email: foundUser[0].email
                }
            }

        }

        return isSigInSuccefully;
    }

    return null
}

async function v2SignIn({ username, password }) {

    const foundUser = await findUserByUsername(username);

    if (foundUser.length > 0) {
        const isSigInSuccefully = await compareCryptString(password, foundUser[0].password)
        if (isSigInSuccefully) {
            delete foundUser[0].password

            const token = await jwt.sign(
                { data: foundUser },
                secret,
                { expiresIn: '1h' }
            )

            if (foundUser[0].profile_photo) {
                return {
                    access_token: token,
                    data: {
                        id: foundUser[0].id,
                        fullName: foundUser[0].fullName,
                        username: foundUser[0].username,
                        email: foundUser[0].email,
                        profile_photo: `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload/v1697764020${process.env.UPLOAD_PHOTO_URL1}${foundUser[0].id}/${foundUser[0].profile_photo}`
                    }
                }
            }

            return {
                access_token: token,
                data: {
                    id: foundUser[0].id,
                    fullName: foundUser[0].fullName,
                    username: foundUser[0].username,
                    email: foundUser[0].email
                }
            }
        }
        return isSigInSuccefully;
    }

    return null
}

async function signUp({ fullName, username, email, password }) {

    const existingUser = await userExistbyUsernameOrEmail(username, email);

    if (existingUser) {
        return false
    }

    const hashedPassword = encryptPassword(password);

    const userCreated = await createNewUser({ fullName, username, email, password: hashedPassword });
    return userCreated
}

async function v2SignUp({ fullName, username, email, password, profile_photo }) {

    const existingUser = await userExistbyUsernameOrEmail(username, email);

    if (existingUser) {
        return false
    }

    const hashedPassword = encryptPassword(password);

    if (profile_photo) {

        const hashedPhotoName = encryptProfilePhotoName(profile_photo.originalname);
        const userCreated = await v2CreateNewUser({ fullName, username, email, password: hashedPassword, hashedPhotoName });
        const arquivo = await v3UploadProfilePhotoUser(userCreated.id, hashedPhotoName, profile_photo.buffer, profile_photo.mimetype)

        return {
            ...userCreated,
            profile_photo: arquivo.secure_url
        }
    }

    const hashedPhotoName = null;
    const userCreated = await v2CreateNewUser({ fullName, username, email, password: hashedPassword, hashedPhotoName });

    return userCreated
}

module.exports = {
    encryptPassword,
    signUp,
    signIn,
    v2SignUp,
    v2SignIn
}