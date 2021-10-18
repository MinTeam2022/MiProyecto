'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Orders', [
      {
        clienteId: 3,
        vendedorId: 2,
        total: 15000
      },
      {
        clienteId: 3,
        vendedorId: 4,
        total: 30000
      },
      {
        clienteId: 3,
        vendedorId: 2,
        total: 50000
      },

    ], {})
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Orders', null, {});
  }
};
