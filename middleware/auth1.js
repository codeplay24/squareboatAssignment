const candidateModel = require('../model/candidate')

const varify = async(req,res,next)=>{
    try{
        const id = req.cookies.id_candidate
        const candidate = await candidateModel.findOne({
            where:{
                id
            }
        })
        res.locals.candidate = candidate
        next()
    }catch(e){
        next()
    }
}

module.exports = varify