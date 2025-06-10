const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');
const User = require('./user');
const Activity = require('./activity');

const ActivityLike = sequelize.define('ActivityLike', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    activityId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'activity_likes',
    timestamps: false
});

// Define associations
User.belongsToMany(Activity, {
    through: ActivityLike,
    foreignKey: 'userId',
    otherKey: 'activityId'
});

Activity.belongsToMany(User, {
    through: ActivityLike,
    foreignKey: 'activityId',
    otherKey: 'userId'
});

module.exports = ActivityLike;