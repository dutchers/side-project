const adapter = require("@next-auth/sequelize-adapter");

const { models } = adapter;

module.exports = (sequelize, DataTypes) => {
  return sequelize.define("user", {
    ...models.User,
    role: {
      type: DataTypes.STRING,
      defaultValue: "user",
    },
  });
};
