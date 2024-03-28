const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Account = require("./account");
const User = require("./user");

const Transactions = sequelize.define(
  "Transactions",
  {
    id_cuenta_origen: {
      type: DataTypes.INTEGER,
      references: {
        model: Account,
        key: "id",
      },
    },
    id_cuenta_destino: {
      type: DataTypes.INTEGER,
      references: {
        model: Account,
        key: "id",
      },
    },
    id_user: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: "id",
      },
    },
    amount: {
      type: DataTypes.FLOAT,
      defaultValue: 0.0,
    },
  },
  { timestamps: true }
);

module.exports = Transactions;
