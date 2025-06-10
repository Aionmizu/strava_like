const statisticsService = require('../services/statisticsService');

class StatisticsController {
    async getStatistics(req, res) {
        try {
            // Extract period from query parameters
            const { period } = req.query;

            // Validate period if provided
            if (period && !['week', 'month', '3months', '6months'].includes(period)) {
                return res.status(400).json({ 
                    message: 'Invalid period. Valid values are: week, month, 3months, 6months' 
                });
            }

            const statistics = await statisticsService.getStatisticsBySportType(period);
            res.status(200).json(statistics);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
}

module.exports = new StatisticsController();
