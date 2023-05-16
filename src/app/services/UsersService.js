const UserType = require('../models/enums/UserType');
const UserRepository = require('../repositories/UserRepository');
const BadRequest = require('./errors/BadRequest');
const NotFound = require('./errors/NotFound');

class UsersService {
  constructor() {
    this.repository = new UserRepository();
  }

  async createUser({ name, email, password, phone_number, user_type, cpf, birthday, institution_type }) {
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
      institution_type
    });

    return user;
  }

  async findBy(field) {
    const user = await this.repository.findOne(field);

    if(!user) {
      throw new BadRequest('User not found');
    }

    return user;
  }

  async findById(id) {
    const user = await this.repository.findById(id);

    if (!user) {
      throw new NotFound('User not found');
    }

    return user;
  }

  async update(data) {
    const user = await this.repository.findById(data.id);

    if (!user) {
      throw new NotFound('User Not Found');
    }

    user.set(data);

    const userUpdated = await this.repository.update(user);

    return userUpdated;
  }

  async deleteById(id) {
    const user = await this.repository.findById(id);

    if (!user) {
      throw new NotFound('User Not Found');
    }

    await this.repository.destroy(user);

    return true;
  }
}


module.exports = UsersService;
