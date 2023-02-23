"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class List extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Place);
    }
  }
  List.init(
    {
      name: DataTypes.STRING,
      source: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "List",
    }
  );
  return List;
};
