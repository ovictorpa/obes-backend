const UsersService = require('../services/UsersService');

class UsersController {

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
      {
        name,
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

    const userUpdated = await service.update({ id, ...req.body });

    return res.status(200).json({ message: 'Informations Updated Successfully', user: userUpdated });
  }

  async deleteUser(req, res) {
    const { id } = req.user;

    const service = new UsersService();

    await service.deleteById(id);

    return res.status(200).json({ message: 'User Deleted Successfully!' });
  }

}
module.exports = new UsersController();
