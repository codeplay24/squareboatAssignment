const { Sequelize, DataTypes } = require('sequelize');
const db = require('../db/database')

const candidateModel = db.define('candidate', {
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
    tableName: 'candidate'
});

module.exports = candidateModel