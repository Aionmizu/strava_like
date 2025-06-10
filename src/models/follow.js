const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');
const User = require('./user');

const Follow = sequelize.define('Follow', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    followerId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    userId: { // suivi de cet utilisateur
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'followers',
    timestamps: false
});

// Define associations
User.belongsToMany(User, {
    through: Follow,
    as: 'following',           // Les utilisateurs que JE suis
    foreignKey: 'followerId',  // Moi
    otherKey: 'userId'         // Ceux que je suis
})

User.belongsToMany(User, {
    through: Follow,
    as: 'followers',           // Ceux qui ME suivent
    foreignKey: 'userId',      // Moi
    otherKey: 'followerId'     // Eux
});
module.exports = Follow;