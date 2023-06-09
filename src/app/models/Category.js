const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database');

class Category extends Model {
}

Category.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: {
        args: [3, 255],
        msg: ['Categoria inválida']
      }
    }
  },
}, {
  sequelize,
  tableName: 'categories',
  modelName: 'category',
  defaultScope: {
    attributes: {
      exclude: ['created_at', 'updated_at']
    },
  }
});

module.exports = Category;
