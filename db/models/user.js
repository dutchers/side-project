"use strict";
const { Model } = require("sequelize");

const { models } = require("@next-auth/sequelize-adapter");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsToMany(models.Map, { through: "UserMaps" });
    }
  }
  User.init(
    {
      ...models.User,
      role: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "user",
    }
  );
  return User;
};
