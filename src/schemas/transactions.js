const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Account = require("./account");
const User = require("./user");

const Transactions = sequelize.define(
  "Transactions",
  {
    id_origin_account: {
      type: DataTypes.STRING,
      references: {
        model: Account,
        key: "id",
      },
    },
    id_destination_account: {
      type: DataTypes.STRING,
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
    date_time_transactions : {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  }
);

module.exports = Transactions;
