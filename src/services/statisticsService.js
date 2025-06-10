const Activity = require('../models/activity');
const sequelize = require('../config/sequelize');
const { Op, fn, col, literal } = require('sequelize');

class StatisticsService {
    async getStatisticsBySportType(period = null) {
        try {
            // Define where clause based on period
            const whereClause = {};

            if (period) {
                const now = new Date();
                let startDate;

                switch (period) {
                    case 'week':
                        // Current week (starting from Monday)
                        startDate = new Date(now);
                        startDate.setDate(now.getDate() - now.getDay() + (now.getDay() === 0 ? -6 : 1)); // Adjust for Sunday
                        startDate.setHours(0, 0, 0, 0);
                        whereClause.date = {
                            [Op.gte]: startDate
                        };
                        break;
                    case 'month':
                        // Current month
                        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
                        whereClause.date = {
                            [Op.gte]: startDate
                        };
                        break;
                    case '3months':
                        // Last 3 months
                        startDate = new Date(now);
                        startDate.setMonth(now.getMonth() - 3);
                        whereClause.date = {
                            [Op.gte]: startDate
                        };
                        break;
                    case '6months':
                        // Last 6 months
                        startDate = new Date(now);
                        startDate.setMonth(now.getMonth() - 6);
                        whereClause.date = {
                            [Op.gte]: startDate
                        };
                        break;
                    default:
                        // No filter
                        break;
                }
            }

            // Get statistics grouped by sport type
            const statistics = await Activity.findAll({
                where: whereClause,
                attributes: [
                    'type',
                    [fn('SUM', col('distance')), 'total_distance'],
                    [fn('SUM', col('duration')), 'total_duration'],
                    [literal('SUM(distance) / (SUM(duration) / 3600)'), 'average_speed'] // km/h
                ],
                group: ['type'],
                raw: true
            });

            // Format the results
            return statistics.map(stat => ({
                type: stat.type,
                total_distance: parseFloat(stat.total_distance),
                total_duration: parseInt(stat.total_duration),
                average_speed: parseFloat(stat.average_speed)
            }));
        } catch (error) {
            throw new Error(`Error getting statistics: ${error.message}`);
        }
    }
}

module.exports = new StatisticsService();
