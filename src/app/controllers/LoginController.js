const LoginService = require('../services/LoginService');

require('dotenv').config();

class LoginController {

  async newLogin(req, res) {
    const { email = '', password = '' } = req.body;

    const loginService = new LoginService();
    const data = await loginService.login(email, password);

    return res.status(200).json(data);
  }
}

module.exports = new LoginController();
