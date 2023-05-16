require('dotenv').config();
const jwt = require('jsonwebtoken');
const UserRepository = require('../repositories/UserRepository');
const UsersService = require('./UsersService');
const BadRequest = require('./errors/BadRequest');
const Unauththorized = require('./errors/Unauthorized');

class LoginService {
  constructor() {
    this.userRepository = new UserRepository();
  }


  async login(email, password) {
    if (!email || !password) {
      throw new Unauththorized('Invalid Credentials');
    }

    const userService = new UsersService();
    const user = await userService.findBy({ email });

    if (!user) {
      throw new BadRequest('User Not Found');
    }

    if (!(await user.passwordIsValid(password))) {
      throw new Unauththorized('Invalid Credentials');
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
