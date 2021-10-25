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
    await queryInterface.bulkInsert('OrderProducts', [
      {
        orderId: 1,
        productId: 1,
        quantity: 2
      },
      {
        orderId: 1,
        productId: 2,
        quantity: 3
      },
      {
        orderId: 2,
        productId: 1,
        quantity: 2
      },
      {
        orderId: 2,
        productId: 2,
        quantity: 3
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
    await queryInterface.bulkDelete('OrderProducts', null, {});
  }
};
