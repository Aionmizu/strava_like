var express = require('express');
const http = require('http');
var app = express();
const server = http.createServer(app);

require('dotenv').config();
app.use(express.json());

// Importation des routes
const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');
const activityRouter = require('./routes/activity');
const followRouter = require('./routes/follow');
const statisticsRouter = require('./routes/statistics');

// Montage des routes
app.use('/api/v1', authRouter);
app.use('/api/v1', userRouter);
app.use('/api/v1', activityRouter);
app.use('/api/v1', followRouter);
app.use('/api/v1', statisticsRouter);

// Port d'écoute
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Le serveur est actuellement démarré sur le port ${PORT}`);
});

module.exports = { app };
