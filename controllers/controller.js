const candidateModel = require('../model/candidate')
const recruiterModel = require('../model/recruiter')
const jobModel = require('../model/jobs')
const jobs2candidateModel = require('../model/jobs2candidate')
const jobsModel = require('../model/jobs')

module.exports.home = (req,res)=>{
    try{
        if(res.locals.candidate){
            res.redirect('/candidate_home')
        }else if (res.locals.recruiter){
            res.redirect('/recruiter_home')
        }
        res.render('home')
    }catch(e){
        res.status(500).render('errorPage',{
            errorCode: 404,
            text: 'Some internal error. Come back again soon !'
        })
    }
}

module.exports.login_recruiter = async(req,res)=>{
    let statusCode = 200
    let errorText = ''
    try{
        const email = req.body.email
        const password = req.body.password
        if(!email){
            statusCode = 403
            errorText = 'Email not provided'
            throw new Error()
        }
        if(!password){
            statusCode = 403
            errorText = 'Password for email not provided'
            throw new Error()
        }

        const recruiter = await recruiterModel.findOne({
            where:{
                email
            }
        })

        if(!recruiter){
            errorText = 'Wrong and password provided'
            statusCode = 403
            throw new Error()
        }

        if(recruiter.password!=password){
            errorText='wrong password entered'
            statusCode = 403
            throw new Error()
        }
        res.status(200).cookie('id_recruiter', recruiter.id, {
            expires: new Date(new Date().getTime() + 3000 * 1000000),
            sameSite:'strict',
            httpOnly:true
        }).redirect('/recruiter_home')
    }catch(e){
        res.status(statusCode).render('errorPage',{
            errorCode: statusCode,
            text: errorText
        })
    }
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
    let statusCode = 200
    let errorText = ''
    try{
        const email = req.body.email
        const password = req.body.password

        if(!email){
            statusCode = 403
            errorText = 'Email not provided'
            throw new Error()
        }
        if(!password){
            statusCode = 403
            errorText = 'Password for email not provided'
            throw new Error()
        }

        const candidate = await candidateModel.findOne({
            where:{
                email
            }
        })
        if(!candidate){
            statusCode = 403
            errorText = 'No user found'
            throw new Error()
        }
        if(candidate.password!=password){
            statusCode = 403
            errorText = 'Wrong password'
            throw new Error()
        }
        
        res.status(200).cookie('id_candidate', candidate.id, {
            expires: new Date(new Date().getTime() + 3000 * 1000000),
            sameSite:'strict',
            httpOnly:true
        }).redirect('/candidate_home')
    }catch(e){
        res.status(statusCode).render('errorPage',{
            errorCode: statusCode,
            text: errorText
        })
    }
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
    try{
        if(res.locals.candidate){
            res.redirect('/candidate_home')
        }else if (res.locals.recruiter){
            res.redirect('/recruiter_home')
        }
        
        res.render('signup')
    }catch(e){
        res.status(500).render('errorPage',{
            errorCode: 500,
            text: 'Internal error. Check back later'
        })
    }
}

module.exports.register = async(req,res)=>{
    let errorText = ""
    try{
        const name = req.body.name;
        const email = req.body.email
        const password = req.body.password
        const role = req.body.role
        if(!name){
            errorText = 'Name is missing'
            throw new Error()
        }
        if(!email){
            errorText = 'Email is missing'
            throw new Error()
        }
        if(!password){
            errorText = 'Password is missing'
            throw new Error()
        }
        if(!role){
            errorText = 'Role is missing'
            throw new Error()
        }
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
    }catch(e){
        if(errorText===''){
            errorText = e
        }
        res.status(403).render('errorPage',{
            errorCode: 403,
            text: errorText
        })
    }
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
    try{
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
            res.status(403).send('already applied')
            return
        }
        const newRow = await jobs2candidateModel.create({
            candidateId:id,
            jobId
        })
        res.status(200).send('successfully applied')
    }catch(e){
        res.status(404).render('errorPage',{
            errorCode: 500,
            text: 'Server Error'
        })
    }
}

module.exports.logout = (req,res)=>{
    try{
        if(req.cookies.id_recruiter){
            res.clearCookie('id_recruiter').status(200).redirect('/')
        }else if((req.cookies.id_candidate)){
            res.clearCookie('id_candidate').status(200).redirect('/')
        }else{
            throw new Error('No cookie found')
        }
    }catch(e){
        res.status(404).render('errorPage',{
            errorCode: 400,
            text: 'Bad request'
        })
    }
}

module.exports.default = (req,res)=>{
    res.status(404).render('errorPage',{
        errorCode: 404,
        text: 'Can\'t found what you are looking for'
    })
}