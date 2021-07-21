const { Sequelize, DataTypes } = require('sequelize');
const db = require('../db/database')

const jobsModel = db.define('jobs', {
    title:{
        type:DataTypes.STRING
    },
    description:{
        type:DataTypes.STRING
    },
    recruiterId:{
        type:DataTypes.INTEGER
    }
}, {
    tableName: 'jobs'
});

module.exports = jobsModel