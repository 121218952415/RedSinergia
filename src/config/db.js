const { Sequelize } = require("sequelize");
const { config } = require("dotenv");
config();

const { DB_PASSWORD, DB_USER, DB_HOST, DB_NAME } = process.env;
const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
  {
    dialect: "postgres",
    native: false,
    logging: false,
  }
);
(async ()=> {
    try {
      sequelize.sync({ force: false  , alter: true }).then(() => {
        console.log("Postgres sync has been established successfully.");
      });
    } catch (error) {
      console.error("Unable to sync to the database:", error);
    }
  })();
  
 const {User,Transactions,Account} = sequelize.models


 User.hasMany(Account, { foreignKey: 'id_user' });
Account.belongsTo(User, { foreignKey: 'id_user' });
// Transaction example

// Relación entre Cuenta y Transacciones (como cuenta de origen y destino)
Account.hasMany(Transactions, { foreignKey: 'id_cuenta_origen', as: 'transactionsFrom' });
Transactions.belongsTo(Account, { foreignKey: 'id_cuenta_origen', as: 'accountFrom' });

Account.hasMany(Transactions, { foreignKey: 'id_cuenta_destino', as: 'transactionsTo' });
Transactions.belongsTo(Account, { foreignKey: 'id_cuenta_destino', as: 'accountTo' });



User.hasMany(Transactions, { foreignKey: 'id_user' });
Transactions.belongsTo(User, { foreignKey: 'id_user' });

// Relación entre Usuario y Cuenta
User.hasMany(Account, { foreignKey: 'id_user', as: 'accounts' });
Account.belongsTo(User, { foreignKey: 'id_user' });

  

module.exports = sequelize;