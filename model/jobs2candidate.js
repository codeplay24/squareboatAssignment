const { Sequelize, DataTypes } = require('sequelize');
const db = require('../db/database')
const jobsModel = require('./jobs')
const candidateModel = require('./candidate')

const jobs2candidateModel = db.define('jobs2candidate', {
    jobId:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    candidateId:{
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'jobs2candidate'
});

jobsModel.belongsToMany(candidateModel, {
    through: jobs2candidateModel
})
jobs2candidateModel.belongsTo(jobsModel, {
    foreignKey:'jobId'
})
jobs2candidateModel.belongsTo(candidateModel,{
    foreignKey:"candidateId"
})

module.exports = jobs2candidateModel