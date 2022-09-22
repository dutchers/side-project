"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Places",
      [
        {
          name: "Mudville9",
          formattedAddress: "126 Chambers St, New York, NY 10007",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Places", null, {});
  },
};
