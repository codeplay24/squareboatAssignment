const recruiterModel = require('../model/recruiter')

const varify = async(req,res,next)=>{
    try{
        const id = req.cookies.id_recruiter
        const recruiter = await recruiterModel.findOne({
            where:{
                id
            }
        })
        res.locals.recruiter = recruiter
        next()
    }catch(e){
        next()
    }
}

module.exports = varify