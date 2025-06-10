const express = require('express');
const router = express.Router();
const statisticsController = require('../controllers/statisticsController');
const verifyToken = require('../middleware/auth');

// GET /statistics
router.get('/statistics', verifyToken, statisticsController.getStatistics);

module.exports = router;