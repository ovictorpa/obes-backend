const UserType = require('../models/enums/UserType');
const UserRepository = require('../repositories/UserRepository');
const BadRequest = require('./errors/BadRequest');

class UsersService {
  constructor() {
    this.repository = new UserRepository();
  }

  async createUser({ name, email, password, phone_number, user_type, cpf, birthday, institution_type }) {
    if(user_type !== UserType.Common && user_type !== UserType.Institutional) {
      throw new BadRequest('Invalid User type');
    }

    const userAlreadyExists = await this.repository.findOne({ email });

    if (userAlreadyExists) {
      throw new BadRequest('User Already Exists');
    }

    const user = await this.repository.create({
      name,
      email,
      password,
      phone_number,
      user_type,
      cpf,
      birthday,
      institution_type
    });

    return user;
  }
}

module.exports = UsersService;
