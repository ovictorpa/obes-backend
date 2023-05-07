const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../database');
const User = require('./User')

class CommonUser extends Model { }

CommonUser.init({
    cpf: {
        type: DataTypes.STRING,
        defaultValue: '',
        validate: {
            len: {
                args: [14, 14],
                msg: ['Campo CPF inválido']
            }
        }
    },
    birthdate: {
        type: DataTypes.DATE,
        defaultValue: '',
        validate: {
            isDate: {
                msg: 'Data inválida'
            }
        }
    },
}, { sequelize, modelName: 'common_user' })


CommonUser.addHook('beforeSave', async (user) => {
    console.log(user.birthdate)
    user.birthdate = new Date(user.birthdate).toDateString()
})

module.exports = CommonUser;