function validateMessagePost (req, res, next) {
    if(!req.body.message){
        return res.status(400).json({error:"Não é possível criar uma postagem vazia"});
    }
    next()
} 

module.exports = validateMessagePost