const express = require('express');
const UserRoutes = express.Router();
const {login,signup,getProfile,getAllUser,deleteUser, updateUser} = require('../controllers/user_controller');
const {serverToken,userToken} = require('../middlewares/token')

UserRoutes.post('/login', login);
UserRoutes.post('/signup', signup);
UserRoutes.get('/profile/:id', getProfile);
UserRoutes.get('/getAll', getAllUser);
UserRoutes.delete('/:id', deleteUser);
UserRoutes.put("/:id",updateUser);

module.exports = UserRoutes;