const { Router } = require("express");
const LoginController = require('../app/controllers/LoginController')

const loginRouter = Router()

loginRouter.post('/login', LoginController.newLogin);

module.exports = loginRouter;