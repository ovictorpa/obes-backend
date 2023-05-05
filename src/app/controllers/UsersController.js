const pool = require('../../database');
const User = require('../models/User');
const query = require('../query/users-query')

class UsersController {

    async getAllUsers(req, res) {
        try {
            const users = await User.findAll();

            return res.json(users);
        } catch (e) {
            return res.status(400).json({
                errors: e.errors.map((err) => err.message)
            })
        }
    }
    async getUserById(req, res) {
        try {
            const user = await User.findByPk(parseInt(req.params.id));

            return res.json(user || {});
        } catch (e) {
            return res.status(400).json({});
        }

    }
    async createUser(req, res) {
        try {
            const novoUser = await User.create(req.body);

            return res.status(201).json(novoUser);
        } catch (e) {
            return res.status(400).json({
                errors: e.errors.map((err) => err.message)
            })
        }
    }
    async updateUser(req, res) {
        try {
            const user = await User.findByPk(req.user.id);

            if (!user) {
                return res.status(400).json({
                    errors: ['Usuário não existe'],
                });
            }

            const novosDados = await user.update(req.body);

            const { id, name, email } = novosDados;

            return res.json({ message: 'Informations Updated Successfully', user: { id, name, email } });
        } catch (e) {
            return res.status(400).json({
                erors: e.errors.map((err) => err.message),
            });
        }

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