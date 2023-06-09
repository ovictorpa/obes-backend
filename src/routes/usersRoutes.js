const { Router } = require('express');
const UsersController = require('../app/controllers/UsersController');
const login = require('../middleware/login');

const userRouter = Router();

userRouter.get('/user/:id', UsersController.getUserById);
userRouter.post('/user', UsersController.createUser);
userRouter.delete('/user/', login, UsersController.deleteUser);
userRouter.put('/user/', login, UsersController.updateUser);

module.exports = userRouter;
