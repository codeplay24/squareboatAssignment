const jobsModel = require('../model/jobs')
const recruiterModel = require('../model/recruiter')

const searchFunction = async(req,res,next)=>{
    const recruiterName = req.body.recruiter
    const title = req.body.title 
    const desc = req.body.description 
    let jobsArr = []
    let jobs = []
    let jobIdSet = []
    if(!desc && title){
        jobs = await jobsModel.findAll({
            where:{
                title:title
            },
            include:recruiterModel
        })
    }else if(desc && !title){
        jobs = await jobsModel.findAll({
            where:{
                description:desc
            },
            include:recruiterModel
        })
    }else{
        jobs = await jobsModel.findAll({
            where:{
                title:title,
                description:desc
            },
            include:recruiterModel
        })
    }
    jobs.forEach(job => {
        jobIdSet[job.id] = true
        jobsArr.push(job)
    });
    jobs = []
    if(recruiterName){
        const recruiter = await recruiterModel.findOne({
            where:{
                name:recruiterName
            }
        }) 
        if(recruiter){
            jobs = await jobsModel.findAll({
                where:{
                    recruiterId: recruiter.id
                },
                include: recruiterModel
            })
        }
        jobs.forEach((job)=>{
            if(!jobIdSet[job.id]){
                jobsArr.push(job)
            }
        })
    }
    res.locals.jobs = jobsArr
    next()
}

module.exports = searchFunction