const { sequelize, DataTypes } = require('sequelize');
const db = require('../db/database');
const jobs2candidateModel = require('./jobs2candidate');
const jobsModel = require('./jobs')

const recruiterModel = db.define('recruiter', {
    // Model attributes are defined here
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'recruiter'
});

recruiterModel.hasMany(jobsModel,{
    foreignKey: 'recruiterId',
    onDelete: 'CASCADE',
})
jobsModel.belongsTo(recruiterModel)

module.exports = recruiterModel