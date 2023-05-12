'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.createTable('books', {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      title: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.DataTypes.TEXT,
        allowNull: false
      },
      category: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },
      filename: {
        type: Sequelize.DataTypes.STRING
      },
      type_book: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },
      available: {
        type: Sequelize.DataTypes.BOOLEAN,
        default: true
      },
      price: {
        type: Sequelize.DataTypes.FLOAT,
        default: 0.0
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      }
    });
  },

  async down (queryInterface) {
    await queryInterface.dropTable('books');
  }
};
