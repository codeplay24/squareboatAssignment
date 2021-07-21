const  Sequelize  = require('sequelize');

const dbname = process.env.DBNAME 
const username = process.env.DBUSERNAME 
const password = process.env.DBPASSWORD
const host = process.env.DBHOST


const db = new Sequelize(dbname, username, password, {
    host: host,
    dialect:'postgres',
    dialectOptions: {
        ssl: true
    }
});

module.exports = db;