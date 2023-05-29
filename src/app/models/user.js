const { DataTypes, Model } = require('sequelize');
const sequelize = require('../database');
const bcrypt = require('bcrypt');
const UserType = require('./enums/UserType');

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
    defaultValue: null
  },
  image_filename: {
    type: DataTypes.STRING,
    defaultValue: ''
  },
  user_type: {
    type: DataTypes.ENUM(UserType.Common, UserType.Institutional),
    allowNull: false
  },
  cpf: {
    type: DataTypes.STRING,
    defaultValue: null,
    validate: {
      len: {
        args: [14, 14],
        msg: ['Campo CPF inválido']
      }
    }
  },
  birthday: {
    type: DataTypes.DATE,
    defaultValue: null,
    validate: {
      isDate: {
        msg: 'Data inválida'
      }
    }
  },
  institution_type: {
    type: DataTypes.STRING,
    defaultValue: '',
  },
}, {
  sequelize,
  modelName: 'user',
  tableName: 'users',
  defaultScope: {
    attributes: {
      exclude: ['created_at', 'updated_at']
    },
  }
});

User.addHook('beforeSave', async (user) => {
  if (user.password) {
    user.password_hash = await bcrypt.hash(user.password, 8);
  }
});




module.exports = User;
