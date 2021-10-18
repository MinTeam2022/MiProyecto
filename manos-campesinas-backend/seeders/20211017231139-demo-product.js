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
    await queryInterface.bulkInsert('Products', [
      {
        name: "Arepas",
        description: "Paquete X 10",
        price: 5000
      },
      {
        name: "Salchichas",
        description: "Paquete X 20",
        price: 15000
      },
      {
        name: "Galletas",
        description: "Paquete X 20",
        price: 3000
      },
      {
        name: "Almojabanas",
        description: "Paquete X 20",
        price: 10000
      },
      {
        name: "Cocadas",
        description: "Paquete X 30",
        price: 7000
      },
      {
        name: "Quesito",
        description: "Grande",
        price: 8000
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
    await queryInterface.bulkDelete('Products', null, {});
  }
};
