const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize')

const Activity = sequelize.define('Activity', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    distance: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    duration: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    path: {
        type: DataTypes.JSON,
        allowNull: false
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'userId'
    }
}, {
    tableName: 'activities',
    timestamps: false
});

module.exports = Activity;
