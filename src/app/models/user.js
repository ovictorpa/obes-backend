const { Sequelize, DataTypes, Model } = require('sequelize');
const bcrypt = require('bcrypt');

class User extends Model {
    static init(sequelize) {
        super.init({
            name: {
                type: DataTypes.STRING,
                defaultValue: '',
                validate: {
                    len: {
                        args: [3, 255],
                        msg: ['Campo nome deve ter entre 3 e 255 caracteres']
                    }
                }
            },
            email: {
                type: DataTypes.STRING,
                defaultValue: '',
                unique: {
                    msg: 'Esse e-mail já existe'
                },
                validate: {
                    isEmail: {
                        msg: 'E-mail inválido'
                    }
                }
            },
            password_hash: {
                type: Sequelize.STRING,
                defaultValue: '',
            },
            password: {
                type: Sequelize.VIRTUAL,
                defaultValue: '',
                validate: {
                    len: {
                        args: [8, 50],
                        msg: 'a senha precisa ter entre 8 e 50 caracteres',
                    },
                },
            },
            phone_number: {
                type: DataTypes.STRING,
                defaultValue: '',
                validate: {
                    len: {
                        args: [8, 255],
                        msg: 'número de telefone inválido'
                    }
                }
            },
            image_filename: {
                type: DataTypes.STRING,
                defaultValue: ''
            }
        }, { sequelize, });

        this.addHook('beforeSave', async (user) => {
            if(user.password) {
                user.password_hash = await bcrypt.hash(user.password, 8);
            }
        })  

        return this;
    }

    passwordIsValid(password) {
        return bcrypt.compare(password, this.password_hash);
    }
}


module.exports = User;