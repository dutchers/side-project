"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Places", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      formattedAddress: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      website: {
        type: Sequelize.STRING,
        isUrl: true,
      },
      formattedPhoneNumber: Sequelize.STRING,
      lat: Sequelize.FLOAT,
      long: Sequelize.FLOAT,
      priceLevel: Sequelize.INTEGER,
      types: Sequelize.ARRAY(Sequelize.STRING),
      global: Sequelize.BOOLEAN,
      googlePlaceId: Sequelize.STRING,
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Places");
  },
};
