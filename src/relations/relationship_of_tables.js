 const User = require("../schemas/user");
 const Transactions = require("../schemas/transactions");
 const Account = require("../schemas/account");
 
 
//  const {User,Transactions,Account} = Sequelize.models

 User.hasMany(Account,{ foreignKey: 'id_user' }); // Un usuario puede tener muchas cuentas
 Account.belongsTo(User,{ foreignKey: 'id_user' }); // Una cuenta pertenece a un usuario


 User.hasMany(Transactions,{ foreignKey: 'id_user' }); // Un usuario puede tener muchas transacciones
 Transactions.belongsTo(User,{ foreignKey: 'id_user' }); // Cada transacción pertenece a un usuario


 module.exports = {
    User,
    Transactions,
    Account
  };