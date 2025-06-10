const express = require('express');
const router = express.Router();
const activityController = require('../controllers/activityController');
const verifyToken = require('../middleware/auth');

// POST /activities
router.post('/activities', verifyToken, activityController.create);

// GET /activities
router.get('/activities', verifyToken, activityController.getAll);

// POST /activities/:activity_id/like
router.post('/activities/:activity_id/like', verifyToken, activityController.likeActivity);

// POST /activities/:activity_id/unlike
router.post('/activities/:activity_id/unlike', verifyToken, activityController.unlikeActivity);

module.exports = router;
