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
    console.log(idUserAccount);
    // realisamos busqueda del ususario y su cuenta  asociada a este id de usuario
    const userWithAccount = await User.findAll({
      where: { id: decodedToken.userId }, // buscamos la cuenta del logeado por id de token
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
      include: [{ model: User }], //para saber que usuario es dueño de esta cuenta
    });

    //verificamos si la cuenta destino existe  y que sea distinta a la de origen
    if (!destinationAccount) {
      return res.status(404).json({ error: "Destination account not found" });
    }
    // verificamos si la cuenta tienen fondos suficientes
    if (user.Accounts.balance <= 0) {
      return res
        .status(500)
        .json({ error: "Insufficient funds in the origin account" });
    }
    // Verificamos si hay fondos suficientes en la cuenta de origenmpara la transacion
    if (user.Accounts[0].balance < amount) {
      return res
        .status(400)
        .json({ error: "Insufficient funds in the origin account" });
    }

    // Realizar la transferencia dentro de una transacción
    await sequelize.transaction(async (transaction) => {
      // Actualizar el saldo de las cuentas de origen y destino
      await Account.update(
        { balance: sequelize.literal(`balance - ${amount}`) },
        { where: { id: user.Accounts[0].id }, transaction }
      );

      // Actualizar el saldo de la cuenta de destino
      await Account.update(
        { balance: sequelize.literal(`balance + ${amount}`) },
        { where: { id: destinationAccount[0].id }, transaction }
      );

      // Creamos el registro de la transacción
      await Transactions.create(
        {
          id_origin_account: user.Accounts[0].id,
          id_destination_account: destinationAccount[0].id,
          amount: amount,
          id_user: idUserAccount,
        },
        { transaction }
      );
    });

    return res.status(200).json("Transaction completed successfully");
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { nweTransactions };
