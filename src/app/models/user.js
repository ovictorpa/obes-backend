const { DataTypes, Model } = require('sequelize');
const sequelize = require('../database');
const bcrypt = require('bcrypt');
const CommonUser = require('./CommonUser');
const InstitutionalUser = require('./InstitutionalUser');

class User extends Model {
  passwordIsValid(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}

User.init({
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
    type: DataTypes.STRING,
    defaultValue: '',
  },
  password: {
    type: DataTypes.VIRTUAL,
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
  },
  user_type: {
    type: DataTypes.STRING,
    allowNull: false
  },
}, {
  sequelize,
  modelName: 'user'
});

User.addHook('beforeSave', async (user) => {
  if (user.password) {
    user.password_hash = await bcrypt.hash(user.password, 8);
  }
});

User.hasOne(CommonUser, {
  as: 'common_user',
  foreignKey: 'user_id'
});

User.hasOne(InstitutionalUser, {
  as: 'institutional_user',
  foreignKey: 'user_id'
});

module.exports = User;
