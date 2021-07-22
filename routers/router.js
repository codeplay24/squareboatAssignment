const express = require('express')
const controller = require('../controllers/controller')
const searchMethod = require('../systemMethods/search')
const varify = require('../middleware/auth')
const verifyCandidate = require('../middleware/auth1')

const router = new express.Router()

router.get('/',varify, verifyCandidate, controller.home)

router.post('/login_recruiter', controller.login_recruiter)

router.get('/recruiter_home',varify , controller.recruiter_home)

router.post('/login_candidate', controller.login_candidate)

router.get('/candidate_home', verifyCandidate, controller.candidate_home)

router.get('/signup',varify, verifyCandidate, controller.signup)

router.post('/register', controller.register)

router.post('/savejob', controller.savejob)

router.post('/search' ,verifyCandidate, searchMethod, controller.search)

router.post('/applyjob',verifyCandidate, controller.applyjob)

router.get('/logout', controller.logout)

router.get('*', controller.default)

module.exports = router