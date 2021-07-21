require('dotenv').config()
const express = require('express')
const router = require('./routers/router.js')
const path = require('path')
const { Sequelize } = require('sequelize');
require('./db/database')

const cookieParser = require('cookie-parser')
const port = process.env.PORT

const app = express()
const execPath = path.join(__dirname, './public')

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.set('view engine', 'ejs')
app.use(express.static(execPath))
app.use(cookieParser())

app.use('/', router)

app.listen(port, ()=>{
    console.log('server is running')
})

