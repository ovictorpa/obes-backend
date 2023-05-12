const { DataTypes, Model } = require('sequelize');
const sequelize = require('../database');

class InstitutionalUser extends Model { }

InstitutionalUser.init({
  institution_type: {
    type: DataTypes.STRING,
    defaultValue: '',
    allowNull: false,
  },
}, { sequelize, modelName: 'institutional_user' });


module.exports = InstitutionalUser;
