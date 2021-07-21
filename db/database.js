const  Sequelize  = require('sequelize');

const dbname = process.env.DBNAME 
const username = process.env.DBUSERNAME 
const password = process.env.DBPASSWORD


const db = new Sequelize(dbname, username, password, {
    host: 'localhost',
    dialect:'postgres'
});

module.exports = db;