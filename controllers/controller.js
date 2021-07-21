const candidateModel = require('../model/candidate')
const recruiterModel = require('../model/recruiter')
const jobModel = require('../model/jobs')
const jobs2candidateModel = require('../model/jobs2candidate')
const jobsModel = require('../model/jobs')

module.exports.home = (req,res)=>{
    
    if(res.locals.candidate){
        res.redirect('/candidate_home')
    }else if (res.locals.recruiter){
        res.redirect('/recruiter_home')
    }
    res.render('home')
}

module.exports.login_recruiter = async(req,res)=>{
    const email = req.body.email
    const password = req.body.password
    const recruiter = await recruiterModel.findOne({
        where:{
            email
        }
    })
    if(!recruiter){
        res.send('wrong username password')
        return
    }
    if(recruiter.password!=password){
        res.send('wrong password entered')
        return
    }
    res.status(200).cookie('id_recruiter', recruiter.id, {
        expires: new Date(new Date().getTime() + 3000 * 1000000),
        sameSite:'strict',
        httpOnly:true
    }).redirect('/recruiter_home')
}

module.exports.recruiter_home = async(req,res)=>{
    if(!res.locals.recruiter){
        res.redirect('/')
        return
    }
    const jobsandcandidates = await jobs2candidateModel.findAll({
        include:[{
            model:jobsModel
        },{
            model:candidateModel
        }]    
    })
    
    res.render('recruiterHome',{
        recruiterId:res.locals.recruiter.id,
        jobsandcandidates
    })
}

module.exports.login_candidate = async(req,res)=>{
    const email = req.body.email
    const password = req.body.password
    const candidate = await candidateModel.findOne({
        where:{
            email
        }
    })
    if(!candidate){
        res.send('wrong username password')
        return
    }
    if(candidate.password!=password){
        res.send('wrond password entered')
        return
    }
    
    res.status(200).cookie('id_candidate', candidate.id, {
        expires: new Date(new Date().getTime() + 3000 * 1000000),
        sameSite:'strict',
        httpOnly:true
    }).redirect('/candidate_home')
    
}

module.exports.candidate_home = async (req,res)=>{
    if(!res.locals.candidate){
        res.redirect('/')
        return
    }
    const jobs = await jobsModel.findAll({
        include: recruiterModel
    })
    res.render('candidateHome', {
        candidateId: res.locals.candidate.id,
        jobs
    })
}

module.exports.signup = (req,res)=>{
    if(res.locals.candidate){
        res.redirect('/candidate_home')
    }else if (res.locals.recruiter){
        res.redirect('/recruiter_home')
    }
    
    res.render('signup')
}

module.exports.register = async(req,res)=>{
    const name = req.body.name;
    const email = req.body.email
    const password = req.body.password
    const role = req.body.role
    if(role==='recruiter'){
        const recruiter = await recruiterModel.create({
            name,
            email,
            password
        })
    }else{
        const candidate = await candidateModel.create({
            name,
            email,
            password
        })
    }
    res.redirect('/')
}

module.exports.savejob = async(req,res)=>{
    const title = req.body.jobTitle
    const desc = req.body.jobDesc
    const id = req.body.id
    const job = await jobModel.create({
        title,
        description:desc,
        recruiterId:id
    })
    res.send('saved')
}

module.exports.search = (req,res)=>{
    const jobs = res.locals.jobs
    res.render('searchResult', {
        jobs
    })
}

module.exports.applyjob = async(req,res)=>{
    const id = res.locals.candidate.id
    const jobId = req.body.jobId
    const jobsApplied = await jobs2candidateModel.findAll({
        where:{
            candidateId:id
        }
    })
    let alreadyApplied = false
    jobsApplied.forEach((job)=>{
        if(job.jobId===parseInt(jobId)){
            alreadyApplied = true
            return
        }
    })
    if(alreadyApplied){
        res.send('already applied')
        return
    }
    const newRow = await jobs2candidateModel.create({
        candidateId:id,
        jobId
    })
    res.send('saved')
}

module.exports.logout = (req,res)=>{
    if(req.cookies.id_recruiter){
        res.clearCookie('id_recruiter').status(200).redirect('/')
    }else{
        res.clearCookie('id_candidate').status(200).redirect('/')
    }
}