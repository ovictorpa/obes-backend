const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database');
const User = require('./User');

class Address extends Model {
}

Address.init({
  cep: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  state: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  area: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  number: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  complement: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  sequelize,
  tableName: 'addresses',
  modelName: 'address',
  defaultScope: {
    attributes: {
      exclude: ['created_at', 'updated_at']
    },
  }
});

Address.belongsTo(User, {
  foreignKey: 'user_id'
});

User.hasOne(Address, {
  foreignKey: 'user_id'
});

module.exports = Address;
