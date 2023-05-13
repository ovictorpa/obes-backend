const CommonUser = require('../models/CommonUser');
const InstitutionalUser = require('../models/InstitutionalUser');
const User = require('../models/User');
const BadRequest = require('../services/errors/BadRequest');

class UserRepository {
  async create(data) {
    try {
      const options = {};

      if (data.user_type === 'common') {
        data.common_user = { cpf: data.cpf, birthdate: data.birthdate };
        options.include = [{
          model: CommonUser,
          as: 'common_user'
        }];
      }
      if (data.user_type === 'institutional') {
        data.institutional_user = { institution_type: data.institution_type };
        options.include = [{
          model: InstitutionalUser,
          as: 'institutional_user'
        }];
      }

      const user = await User.create(data, options);

      return user;
    } catch(e){
      throw new BadRequest('', e.errors.map((err) => err.message));
    }

  }

  async findOne(field) {
    const user = await User.findOne({ where: field });

    return user;
  }
}

module.exports = UserRepository;
