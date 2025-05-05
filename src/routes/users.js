const express = require('express');
const app = express();
const verifyToken = require('../middleware/auth')
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const userController = require('../controllers/userController');

//Route
app.get('users', verifyToken, userController.getAllUsers);
app.get('users/:id', verifyToken, userController.getUserById);
app.post('users', userController.createUser);
app.put('/users.:id', userController.updateUser);
app.delete('/users/:id', userController.deleteUser);
