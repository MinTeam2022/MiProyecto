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
    await queryInterface.bulkInsert('Users', [
      {
        name: "Lina María",
        mail: "lina@gmail.com",
        status: "activo",
        username: "linam",
        role: "admin",
        documentId: "12345"
      },
      {
        name: "Ricardo Reyes",
        mail: "ricardor@gmail.com",
        status: "activo",
        username: "ricardor",
        role: "vendedor",
        documentId: "678910"
      },
      {
        name: "Mona María",
        role: "cliente",
        documentId: "111213",
        status: "activo"
      },
      {
        name: "Pablo X",
        mail: "pablo@gmail.com",
        status: "activo",
        username: "pablo",
        role: "vendedor",
        documentId: "171819"
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
    await queryInterface.bulkDelete('Users', null, {})
  }
};
