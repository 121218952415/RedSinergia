const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./user");

const Account = sequelize.define("Account", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true, // Hace que el ID sea autoincremental
  },
  card_number: {
    type: DataTypes.STRING(8), // Define el número de tarjeta como una cadena de 8 caracteres
    unique: true, // Asegura que el número de tarjeta sea único en la base de datos
  },
  id_user: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: "id",
    },
  },
  balance: {
    type: DataTypes.DOUBLE,
    defaultValue: 0.0,
  },
});

module.exports = Account;
