'use strict';
var crypto = require('crypto');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      mail: {
        type: Sequelize.STRING,
        allowNull: true,
        validate: {
          isEmail: true
        }
      },
      password: {
        type: Sequelize.STRING,
        set(value) {
          this.setDataValue('password', crypto.createHash('sha256').update(value).digest('hex'))
        }
      },
      username: {
        type: Sequelize.STRING,
        allowNull: true,
        validate: {
          len: [3, 20]
        }
      },
      role: {
        type: Sequelize.ENUM('vendedor', 'cliente', 'admin'),
        allowNull: false
      },
      status: {
        type: Sequelize.ENUM('activo', 'inactivo'),
        defaultValue: 'inactivo',

      },
      documentId: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users');
  }
};