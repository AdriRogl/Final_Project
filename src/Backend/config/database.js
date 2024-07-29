const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("library", "user", "123", {
  host: "localhost",
  dialect: "postgres",
});

module.exports = sequelize;
