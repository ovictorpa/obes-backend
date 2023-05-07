const pool = require('../../database');
const CommonUser = require('../models/CommonUser');
const User = require('../models/User');
const query = require('../query/users-query')

class UsersController {

    async getAllUsers(req, res) {
        
        try {
            const users = await User.findAll({
                attributes: ['name', 'email', 'phone_number'],
                include: 'common_user',
            });

            return res.json(users);
        } catch (e) {
            console.log(e)
            return res.status(400).json({
                errors: e
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
        console.log(req.body)
        try {
            const { name, email, password, phone_number, user_type, cpf, birthdate } = req.body

            const data = {
                name,
                email,
                password,
                phone_number,
                user_type,
                common_user: { cpf, birthdate }
            }

            const novoUser = await User.create(data, {
                include: [{
                    model: CommonUser,
                    as: 'common_user'
                }]
            });

            return res.status(201).json(novoUser);
        } catch (e) {
            return res.status(400).json({
                errors: e
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