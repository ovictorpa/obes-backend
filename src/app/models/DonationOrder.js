const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database');
const User = require('./User');
const Book = require('./Book');

class DonationOrder extends Model {
}

DonationOrder.init({
  date: {
    type: DataTypes.DATE,
    defaultValue: null,
    validate: {
      isDate: {
        msg: 'Data inválida'
      }
    }
  },
  status: {
    type: DataTypes.ENUM('PENDING', 'IN_PROGRESS', 'CONFIRMED', 'CANCELED'),
    defaultValue: 'PENDING'
  }
}, { sequelize, tableName: 'donation_orders', modelName: 'donation' });

DonationOrder.belongsTo(User, {
  foreignKey: 'user_id'
});

DonationOrder.belongsTo(Book, {
  foreignKey: 'book_id'
});

module.exports = DonationOrder;
