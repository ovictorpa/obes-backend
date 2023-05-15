const User = require('../models/User');
const UsersService = require('../services/UsersService');

class UsersController {

  async getAllUsers(req, res) {

    try {
      const users = await User.findAll();

      return res.json(users);
    } catch (e) {
      return res.status(400).json({
        errors: e
      });
    }
  }

  async getUserById(req, res) {
    const { id } = req.params;

    const service = new UsersService();

    const user = await service.findById(id);

    return res.status(200).json(user);

  }

  async createUser(request, response) {
    const { name, email, password, phone_number, user_type, cpf, birthday, institution_type } = request.body;

    const service = new UsersService();

    const user = await service.createUser(
      { name,
        email,
        password,
        phone_number,
        user_type,
        cpf,
        birthday,
        institution_type
      }
    );

    return response.status(201).json(user);
  }

  async updateUser(req, res) {
    const { id } = req.user;

    const service = new UsersService();

    const userUpdated = await service.update({ id, ...req.body});

    return res.status(200).json({ message: 'Informations Updated Successfully', user: userUpdated });
  }

  async deleteUser(req, res) {
    try {
      const user = await User.findByPk(req.user.id);

      if (!user) {
        return res.status(400).json({
          errors: ['Usuário não existe'],
        });
      }

      await user.destroy();

      return res.json({ message: 'User Deleted Successfully!' });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

}
module.exports = new UsersController();
