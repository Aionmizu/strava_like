var express = require('express');
const http = require('http');
var app = express();
const server = http.createServer(app);

require('dotenv').config();

const PORT = process.env.PORT || 3000;
server.listen(PORT, ()=>{
    console.log(`Le serveur est actuellement demarrée sur le port $ ${PORT}`);

});

module.exports = {
    app
};