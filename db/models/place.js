"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Place extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.OpeningHours);
      this.belongsToMany(models.List, { through: "ListPlaces" });
    }
  }
  Place.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        type: DataTypes.STRING,
      },
      formattedAddress: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      website: {
        type: DataTypes.STRING,
        isUrl: true,
      },
      url: {
        type: DataTypes.STRING,
        isUrl: true,
      },
      lat: DataTypes.FLOAT,
      lng: DataTypes.FLOAT,
      priceLevel: DataTypes.INTEGER,
      types: DataTypes.ARRAY(DataTypes.STRING),
      global: { type: DataTypes.BOOLEAN, default: true },
      placeId: DataTypes.STRING,
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: "Place",
    }
  );
  return Place;
};
