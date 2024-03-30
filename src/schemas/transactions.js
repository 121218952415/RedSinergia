const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./user");
const Account = require("./account");

const Transactions = sequelize.define(
  "Transactions",
  {
    id_origin_account: {
      type: DataTypes.UUID,
      references: {
        model: Account,
        key: "id",
      },
    },
    id_destination_account: {
      type: DataTypes.UUID,
      references: {
        model: Account,
        key: "id",
      },
    },
    id_user: {
      type: DataTypes.UUID,
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
