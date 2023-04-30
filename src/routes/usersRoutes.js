const { Router } = require("express");
const UsersController = require('../app/controllers/UsersController')
const login = require('../middleware/login')

const userRouter = Router();

userRouter.get('/user', login, UsersController.getAllUsers);
userRouter.get('/user/:id', login, UsersController.getUserById);
userRouter.post('/user', login, UsersController.createUser);
userRouter.delete('/user/:id', login, UsersController.deleteUser);
userRouter.put('/user/:id', login, UsersController.updateUser);

module.exports = userRouter;