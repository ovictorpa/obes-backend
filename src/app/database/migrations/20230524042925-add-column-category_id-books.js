'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('books', 'category_id', {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'categories',
        key: 'id',
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    });

    await queryInterface.removeColumn('books', 'category');
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('books', 'user_id');

    await queryInterface.addColumn('books', 'category', {
      type: Sequelize.DataTypes.STRING,
      allowNull: false
    }
    );
  }
};
