const Activity = require('../models/activity');
const ActivityLike = require('../models/activityLike');
const User = require('../models/user');
const sequelize = require('../config/sequelize');
const { Op } = require('sequelize');

class ActivityService {
    async createActivity(data) {
        return await Activity.create(data);
    }

    async getActivitiesByUserId(userId) {
        const activities = await Activity.findAll({
            where: { userId: userId },
            include: [
                {
                    model: User,
                    as: 'likers',
                    attributes: [],
                    through: { attributes: [] }
                }
            ],
            attributes: {
                include: [
                    [sequelize.fn('COUNT', sequelize.col('likers.id')), 'likes']
                ]
            },
            group: ['Activity.id']
        });

        return activities.map(activity => {
            const plainActivity = activity.get({ plain: true });
            plainActivity.likes = parseInt(plainActivity.likes || 0);
            return plainActivity;
        });
    }

    async likeActivity(activityId, userId) {
        // Check if activity exists
        const activity = await Activity.findByPk(activityId);
        if (!activity) {
            throw new Error('Activity not found');
        }

        // Check if user already liked this activity
        const existingLike = await ActivityLike.findOne({
            where: {
                activityId: activityId,
                userId: userId
            }
        });

        if (existingLike) {
            throw new Error('User already liked this activity');
        }

        // Create the like
        return await ActivityLike.create({
            activityId: activityId,
            userId: userId
        });
    }

    async unlikeActivity(activityId, userId) {
        // Check if activity exists
        const activity = await Activity.findByPk(activityId);
        if (!activity) {
            throw new Error('Activity not found');
        }

        // Check if user has liked this activity
        const existingLike = await ActivityLike.findOne({
            where: {
                activityId: activityId,
                userId: userId
            }
        });

        if (!existingLike) {
            throw new Error('User has not liked this activity');
        }

        // Delete the like
        await existingLike.destroy();
        return { activityId, userId };
    }
}

module.exports = new ActivityService();
