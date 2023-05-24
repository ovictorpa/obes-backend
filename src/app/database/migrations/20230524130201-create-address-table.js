'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('addresses', {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      cep: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },
      state: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },
      city: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },
      area: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },
      address_name: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },
      number: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true
      },
      complement: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true
      },
      user_id: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        references: {
          model: 'users',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  async down (queryInterface) {
    await queryInterface.dropTable('addresses');
  }
};
