const express = require('express');
const app = express();
const verifyToken = require('../middleware/auth')
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const followController = require('../controllers/followController');

// Follow/Unfollow routes
app.post('/follow/:user_id', verifyToken, followController.followUser);
app.post('/unfollow/:user_id', verifyToken, followController.unfollowUser);
app.get('/followers', verifyToken, followController.getFollowers);
// GET /activities/following
app.get('/activities/following', verifyToken, followController.getFollowingActivities);

module.exports = app;
