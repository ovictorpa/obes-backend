require('dotenv').config();
const jwt = require('jsonwebtoken');
const UsersService = require('./UsersService');
const Unauthorized = require('./errors/Unauthorized');

class LoginService {
  async login(email, password) {
    if (!email || !password) {
      throw new Unauthorized('Invalid Credentials');
    }

    const userService = new UsersService();
    const user = await userService.findBy({ email });

    if (!(await user.passwordIsValid(password))) {
      throw new Unauthorized('Invalid Credentials');
    }

    const { id } = user;
    const token = jwt.sign({ id, email }, process.env.TOKEN_SECRET, {
      expiresIn: process.env.TOKEN_EXPIRATION,
    });

    return {
      token,
      user: {
        name: user.name,
        id,
        email,
        type_user: user.type_user
      }
    };
  }
}

module.exports = LoginService;
