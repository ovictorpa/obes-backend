const pool = require('../../database');
const CommonUser = require('../models/CommonUser');
const InstitutionalUser = require('../models/InstitutionalUser');
const User = require('../models/User');
const query = require('../query/users-query')

class UsersController {

    async getAllUsers(req, res) {
        
        try {
            const users = await User.findAll({
                include: [
                    {model: InstitutionalUser, as: 'institutional_user'},
                    {model: CommonUser, as: 'common_user'},
                ]
            });

            return res.json(users);
        } catch (e) {
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
        try {
            const { name, email, password, phone_number, user_type, cpf, birthdate, institution_type } = req.body

            const data = {
                name,
                email,
                password,
                phone_number,
                user_type,
            }

            const options = {};

            if(user_type === 'common') {
                data.common_user = { cpf, birthdate }
                options.include = [{
                    model: CommonUser,
                    as: 'common_user'
                }]
            }
            if(user_type === 'institutional') {
                data.institutional_user = { institution_type }
                options.include = [{
                    model: InstitutionalUser,
                    as: 'institutional_user'
                }]
            }

            const newUser = await User.create(data, options);

            return res.status(201).json(newUser);
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