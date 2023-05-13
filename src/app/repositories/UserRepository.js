const User = require('../models/User');
const BadRequest = require('../services/errors/BadRequest');

class UserRepository {
  async create(data) {
    try {
      const user = await User.create(data);
      return user;
    } catch(err) {
      throw new BadRequest(err.message);
    }

  }


  async findOne(field) {
    const user = await User.findOne({ where: field });

    return user;
  }
}

module.exports = UserRepository;
