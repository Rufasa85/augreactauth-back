const {Pet} = require("../models")

const isMyPet = (req,res,next)=>{
    Pet.findByPk(req.params.id).then(foundPet=>{
        if(!foundPet){
            return res.status(404).json({msg:"no pet found"})
        }
        else if(foundPet.UserId===req.user.id){
            next()
        } else {
            res.status(403).json({msg:"this isnt your pet"})
        }
    })
}
module.exports = isMyPet