var express = require('express');
const http = require('http');
var app = express();
const server = http.createServer(app);

require('dotenv').config();

//Routes

const activityRouter = require('./routes/activity');
const authRouter = require('./routes/auth');
const followerRouter = require('./routes/follower');
const likeRouter = require('./routes/like');
const statsRouter = require('./routes/stats');
const userRouter = require('./routes/user')

app.use('/api/v1', activityRouter);
app.use('/api/v1', authRouter);
app.use('/api/v1', followerRouter);
app.use('/api/v1', likeRouter);
app.use('/api/v1', statsRouter);
app.use('/api/v1', userRouter);


const PORT = process.env.PORT || 3000;
server.listen(PORT, ()=>{
    console.log(`Le serveur est actuellement demarrée sur le port $ ${PORT}`);

});

module.exports = {
    app
};