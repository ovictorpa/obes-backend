const UserType = require('../models/enums/UserType');
const UserRepository = require('../repositories/UserRepository');
const BadRequest = require('./errors/BadRequest');
const NotFound = require('./errors/NotFound');

class UsersService {
  constructor() {
    this.repository = new UserRepository();
  }

  async createUser({ name, email, password, phone_number, user_type, cpf, birthday, institution_type, about_me }) {
    if (user_type !== UserType.Common && user_type !== UserType.Institutional) {
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
      institution_type,
      about_me
    });

    return user;
  }

  async findBy(field) {
    const user = await this.repository.findOne(field);

    if(!user) {
      throw new NotFound('User Not Found');
    }

    return user;
  }

  async findById(id) {
    const user = await this.repository.findById(id);

    if (!user) {
      throw new NotFound('User Not Found');
    }

    return user;
  }

  async update(data) {
    const user = await this.findById(data.id);

    user.set(data);

    const userUpdated = await this.repository.update(user);

    return userUpdated;
  }

  async deleteById(id) {
    const user = await this.findById(id);

    await this.repository.destroy(user);

    return true;
  }
}


module.exports = UsersService;
