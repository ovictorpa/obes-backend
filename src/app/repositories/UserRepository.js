const User = require('../models/User');
const BadRequest = require('../services/errors/BadRequest');

class UserRepository {
  async create(data) {
    try {
      const user = await User.create(data);
      return user;
    } catch(e) {
      throw new BadRequest(e.message, e.errors);
    }

  }


  async findOne(field) {
    const user = await User.findOne({ where: field });

    return user;
  }

  async findById(id) {
    const user = await User.findByPk(id);

    return user;
  }

  async update(user) {
    const userUpdated = await user.save();

    return userUpdated;
  }

  async destroy(user) {
    await user.destroy();

    return true;
  }
}

module.exports = UserRepository;
