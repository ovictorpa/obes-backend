const { DataTypes, Model } = require('sequelize');
const sequelize = require('../database');
const User = require('./User');
const Category = require('./Category');

class Book extends Model {

}

Book.init({
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: {
        args: [3, 255],
        msg: ['Título inválido']
      }
    }
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  filename: {
    type: DataTypes.STRING
  },
  type_book: {
    type: DataTypes.STRING,
    allowNull: false
  },
  available: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  price: {
    type: DataTypes.FLOAT,
    defaultValue: 0.0
  },
  image_url: {
    type: DataTypes.VIRTUAL,
    get() {
      return `${process.env.URL}/uploads/images/${this.getDataValue('filename')}`;
    }
  }
}, {
  sequelize,
  tableName: 'books',
  modelName: 'book',
  defaultScope: {
    attributes: {
      exclude: ['created_at', 'updated_at']
    },
  }
});

Book.belongsTo(User, {
  foreignKey: 'user_id'
});

Book.belongsTo(Category, {
  foreignKey: 'category_id'
});

module.exports = Book;
