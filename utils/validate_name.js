function validateName (req, res, next) {
    if(!req.body.name){
        res.json({error:"Favor preencher o campo nome"})
        return
    }
    next()
}

module.exports = {validateName}
