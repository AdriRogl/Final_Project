const sequelize = require("../config/database");
const Book = require("./book");

const db = {
  sequelize,
  Book,
};

module.exports = db;
