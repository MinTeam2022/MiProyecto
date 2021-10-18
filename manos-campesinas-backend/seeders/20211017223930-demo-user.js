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
        password: "lina",
        status: "activo",
        username: "linam",
        role: "admin",
        documentId: "12345"
      },
      {
        name: "Ricardo Reyes",
        mail: "ricardor@gmail.com",
        password: "ricardo",
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
        name: "Manuel Ochoa",
        mail: "molg@gmail.com",
        password: "molg",
        status: "activo",
        username: "molg",
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
