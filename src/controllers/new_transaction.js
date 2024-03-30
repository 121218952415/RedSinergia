const {
  User,
  Transactions,
  Account,
} = require("../relations/relationship_of_tables");
const jwt = require("jsonwebtoken");

const nweTransactions = async (req, res) => {
  const { id_origin_account, id_destination_account, accound_number, amount } =
    req.body;
  const token = req.headers.authorization?.split(" ")[1];
  try {
    //decodificamos la info del token
    const decodedToken = jwt.decode(token);
    const userWithAccount = await User.findAll({
      where: { id: decodedToken.userId }, // buscamos la cuenta del logeado por id de token
      include: [{ model: Account }], // Esto incluirá la cuenta relacionada
    });
    const user = userWithAccount[0].toJSON();
    // console.log(user.Accounts);
    // Verificamos si el usuario tiene una cuenta asociada
    if (
      !userWithAccount[0].Accounts ||
      userWithAccount[0].Accounts.length === 0
    ) {
      console.log("El usuario no tiene una cuenta asociada");
      return res.status(400).json({ error: "User has no associated account" });
    }
    // Obtener las cuentas de origen y destino
     const originAccount = user.Accounts;
     const destinationAccount = await User.findAll({where:{account_number : accound_number}})
     console.log(originAccount,":::::::",destinationAccount)
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { nweTransactions };
