const {
  User,
  Transactions,
  Account,
} = require("../relations/relationship_of_tables");
const jwt = require("jsonwebtoken");
const sequelize = require("../config/db");

const nweTransactions = async (req, res) => {
  const { accound_number, amount } = req.body;
  const token = req.headers.authorization?.split(" ")[1];
  try {
    //decodificamos la info del token
    const decodedToken = jwt.decode(token); //decodificamos el jwt
    const idUserAccount = decodedToken.userId;
    
    const userWithAccount = await User.findAll({
      where: { id: idUserAccount }, // buscamos la cuenta del logeado por id de token
      include: [{ model: Account }], // Esto incluirá la cuenta relacionada
    });
    //guardamos la informacion en una  variable para poder utilizarla
    const user = userWithAccount[0].toJSON();
  
    // Verificamos si el usuario tiene una cuenta asociada
    if (!user.Accounts) {
      return res.status(400).json({ error: "User has no associated account" });
    }
    //buscamos  el numero de cuenta 
    const destinationAccount = await Account.findAll({
      where: { account_number: accound_number },
    });
    console.log(destinationAccount)
    //verificamos si la cuenta destino existe  y que sea distinta a la de origen
    if (!destinationAccount) {
      return res.status(404).json({ error: "Destination account not found" });
    }
    // verificamos si la cuenta tienen fondos suficientes
    if (user.Accounts[0].balance.length === 0) {
      return res
        .status(500)
        .json({ error: "Insufficient funds in the origin account" });
    }
    // Verificamos si hay fondos suficientes en la cuenta de origen
    if (user.Accounts[0].balance < amount) {
      return res
        .status(400)
        .json({ error: "Insufficient funds in the origin account" });
    }

    // Realizar la transferencia dentro de una transacción
    await sequelize.transaction(async (transaction) => {
      // Actualizar el saldo de las cuentas de origen y destino
      user.Accounts[0].balance -= amount;
      destinationAccount[0].balance += amount;
      // Actualizar los modelos de cuenta en la base de datos
      await Account.update(
        { balance: user.Accounts[0].balance },
        { where: { id: user.Accounts[0].id }, transaction }
      );
      await Account.update(
        { balance: destinationAccount[0].balance },
        { where: { id: destinationAccount[0].id }, transaction }
      );

      // Creamos el registro de la transacción
      await Transactions.create(
        {
          id_origin_account: user.Accounts[0].id,
          id_destination_account: destinationAccount[0].id,
          amount: amount,
          id_user : idUserAccount,
        },
        { transaction }
      );
    });

    return res
      .status(200)
      .json({ message: "Transaction completed successfully" });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { nweTransactions };
