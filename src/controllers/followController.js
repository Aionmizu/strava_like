const followService = require('../services/followService');


class followController {
    async followUser(req, res) {
        try {
            const followedUserId = req.params.user_id;     // 🔧 modif : nom plus clair
            const followerId = req.userId;                 // celui qui suit (connecté)

            const follow = await followService.followUser(followerId, followedUserId); // 🔧 ordre inversé
            res.status(201).json({
                message: 'User followed successfully',
                follow: follow
            });
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }

    async unfollowUser(req, res) {
        try {
            const followedUserId = req.params.user_id;
            const followerId = req.userId;

            await followService.unfollowUser(followerId, followedUserId); // 🔧 idem
            res.status(200).json({ message: 'User unfollowed successfully' });
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }

    async getFollowers(req, res) {
        try {
            const userId = req.userId; // utilisateur connecté
            const followers = await followService.getFollowers(userId);
            res.status(200).json(followers);

        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    async getFollowingActivities(req, res) {
        try {
            const userId = req.userId; // Current authenticated user
            const activities = await followService.getFollowingActivities(userId);
            res.status(200).json(activities);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
}

module.exports = new followController();
