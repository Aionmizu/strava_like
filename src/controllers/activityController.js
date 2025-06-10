const activityService = require('../services/activityService');

class ActivityController {
    async create(req, res) {
        const { type, distance, duration, date, path } = req.body;
        const userId = req.userId; // ✅ récupéré via le token JWT

        if (!type || !distance || !duration || !date || !path) {
            return res.status(400).json({ message: 'Champs requis manquants' });
        }

        try {
            const activity = await activityService.createActivity({
                type,
                distance,
                duration,
                date,
                path,
                userId // ✅ injecté ici
            });
            res.status(201).json(activity);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }


    async getAll(req, res) {
        try {
            const activities = await activityService.getActivitiesByUserId(req.userId);
            res.status(200).json(activities);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    async likeActivity(req, res) {
        const activityId = req.params.activity_id;
        const userId = req.userId;

        try {
            const like = await activityService.likeActivity(activityId, userId);
            res.status(201).json({ message: 'Activity liked successfully', like });
        } catch (err) {
            if (err.message === 'Activity not found') {
                return res.status(404).json({ message: err.message });
            } else if (err.message === 'User already liked this activity') {
                return res.status(400).json({ message: err.message });
            }
            res.status(500).json({ message: err.message });
        }
    }

    async unlikeActivity(req, res) {
        const activityId = req.params.activity_id;
        const userId = req.userId;

        try {
            const result = await activityService.unlikeActivity(activityId, userId);
            res.status(200).json({ message: 'Activity unliked successfully', result });
        } catch (err) {
            if (err.message === 'Activity not found') {
                return res.status(404).json({ message: err.message });
            } else if (err.message === 'User has not liked this activity') {
                return res.status(400).json({ message: err.message });
            }
            res.status(500).json({ message: err.message });
        }
    }
}

module.exports = new ActivityController();
