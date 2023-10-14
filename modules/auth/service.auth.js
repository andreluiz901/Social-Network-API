const {createNewUser, v2CreateNewUser, insertProfileById} = require('../users/service.user'); 
const {encryptString,compareCryptString} = require('../../utils/cryptstring');
const {userExistbyUsernameOrEmail, findUserByEmail, findUserByUsername} = require('../users/repository.user');
const jwt = require('jsonwebtoken');
const secret = require('../../config/token');
const { s3 } = require('../../config/s3');


function encryptPassword(password) {
    return encryptString(password)
}

function encryptProfilePhotoName(profilePhotoName){
    return encryptString(profilePhotoName)
}

async function uploadProfilePhotoUser(userId, hashedPhotoName, profilePhotoBuffer, profilePhotoMimetype){
    const uploadProfilePhoto =  await s3.upload({
        Bucket: process.env.BACKBLAZE_BUCKET,
        Key: `${process.env.UPLOAD_PHOTO_URL1}${userId}${process.env.UPLOAD_PHOTO_URL2}${hashedPhotoName}`,
        Body: profilePhotoBuffer,
        ContentType: profilePhotoMimetype
    }).promise()

    return uploadProfilePhoto
}
 
async function signIn({username, password}){
    
    const foundUser = await findUserByUsername(username);
    
    if (foundUser) {
        const isSigInSuccefully =  await compareCryptString(password, foundUser[0].password) 
        if (isSigInSuccefully) {
            delete foundUser[0].password

            const token = await jwt.sign(
                {data: foundUser},
                secret, 
                {expiresIn:'1h'}
            )

        
        return {access_token: token,
                data:{id:foundUser[0].id, fullName:foundUser[0].fullName, username:foundUser[0].username, email:foundUser[0].email},}

        }
        
    return isSigInSuccefully;
    }

    return null    
}

async function signUp({fullName, username, email, password}) {

    const existingUser = await userExistbyUsernameOrEmail(username, email);
    if (existingUser) {
        return false
    }

    const hashedPassword = encryptPassword(password);
    
    const userCreated = await createNewUser({fullName, username, email, password:hashedPassword});
    return userCreated
}

async function v2SignUp({fullName, username, email, password, profile_photo}) {

    const existingUser = await userExistbyUsernameOrEmail(username, email);
    
    if (existingUser){
        return false
    }
    
    const hashedPassword = encryptPassword(password);
    
    if(profile_photo){
        const hashedPhotoName = encryptProfilePhotoName(profile_photo.originalname);

        const arquivo = await uploadProfilePhotoUser(userCreated.id, hashedPhotoName, profile_photo.buffer, profile_photo.mimetype)
        
        const userCreated = await v2CreateNewUser({fullName, username, email, password:hashedPassword, hashedPhotoName});
        
        return {...userCreated, 
                profile_photo: arquivo.Location}
    }

    const userCreated = await v2CreateNewUser({fullName, username, email, password:hashedPassword, hashedPhotoName});
    
    return userCreated
}

module.exports = {    
                encryptPassword, 
                signUp,
                signIn,
                v2SignUp}