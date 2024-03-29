 const User = require("../schemas/user");
 const Transactions = require("../schemas/transactions");
 const Account = require("../schemas/account");
 
 
//  const {User,Transactions,Account} = Sequelize.models

 User.hasMany(Account); // Un usuario puede tener muchas cuentas
 Account.belongsTo(User); // Una cuenta pertenece a un usuario


 User.hasMany(Transactions); // Un usuario puede tener muchas transacciones
 Transactions.belongsTo(User); // Cada transacción pertenece a un usuario


 module.exports = {
    User,
    Transactions,
    Account
  };