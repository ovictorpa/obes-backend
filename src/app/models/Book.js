const { DataTypes, Model } = require('sequelize')
const sequelize = require('../database')

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
      category: {
        type: DataTypes.STRING,
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
            return `${process.env.URL}/uploads/images/${this.getDataValue('filename')}`
        }
      }
}, { sequelize, tableName: 'books' })

module.exports = Book