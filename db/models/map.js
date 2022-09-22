"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Map extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      if (models.user) {
        this.belongsToMany(models.user, { through: "UserMaps" });
      }
    }
  }
  Map.init(
    {
      name: DataTypes.STRING,
      private: DataTypes.BOOLEAN,
      salt: DataTypes.STRING,
      hash: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Map",
    }
  );
  return Map;
};
