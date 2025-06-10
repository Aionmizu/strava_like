const User = require("../models/user");
const Follow = require("../models/follow");
const Activity = require("../models/activity");

class followService {
    async followUser(followerId, userId) {
        try {
            // Vérifier que les deux utilisateurs existent
            const [user, follower] = await Promise.all([
                User.findByPk(userId),
                User.findByPk(followerId)
            ]);

            if (!user || !follower) {
                throw new Error('User or follower not found');
            }

            // Vérifie s'il suit déjà
            const existingFollow = await Follow.findOne({
                where: {
                    userId: userId,          // ✅ correspond au champ SQL
                    followerId: followerId
                }
            });

            if (existingFollow) {
                throw new Error('Already following this user');
            }

            // Crée la relation
            return await Follow.create({
                userId: userId,             // ✅ bon champ
                followerId: followerId
            });
        } catch (err) {
            throw new Error(err.message);
        }
    }


    async unfollowUser(userId, followerId) {
        try {
            const follow = await Follow.findOne({
                where: {
                    userId: userId,          // ✅ c’est bien le champ SQL
                    followerId: followerId
                }
            });


            if (!follow) {
                throw new Error('Not following this user');
            }

            return await follow.destroy();
        } catch (err) {
            throw new Error(err.message);
        }
    }

    async getFollowing(userId) {
        try {
            const user = await User.findByPk(userId, {
                include: [{
                    model: User,
                    as: 'following'
                }]
            });

            if (!user) {
                throw new Error('User not found');
            }

            return user.following;
        } catch (err) {
            throw new Error(err.message);
        }
    }

    async getFollowers(userId) {
        try {
            const user = await User.findByPk(userId, {
                include: [{
                    model: User,
                    as: 'followers'
                }]
            });

            if (!user) {
                throw new Error('User not found');
            }

            return user.followers;
        } catch (err) {
            throw new Error(err.message);
        }
    }
}

module.exports = new followService();
