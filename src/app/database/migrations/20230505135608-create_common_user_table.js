'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('common_users', {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      cpf: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      birthdate: {
        type: Sequelize.DataTypes.DATEONLY
      },
      user_id: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: 'users',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
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
    await queryInterface.dropTable('common_users');
  }
};
