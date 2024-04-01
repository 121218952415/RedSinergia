const User = require("../schemas/user");
const Transactions = require("../schemas/transactions");
const Account = require("../schemas/account");
const jwt = require("jsonwebtoken");

const getUserTransaction = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  try {
    //decodificamos la info del token
    const decodedToken = jwt.decode(token); //decodificamos el jwt
    const idUserAccount = decodedToken.userId;
    // Recuperar información de todos los usuarios
    const  transactionUser  = await User.findAll({
      where: { id: idUserAccount }, // Filtra los usuarios por el ID del usuario actual
      attributes: ["name"], // Especifica qué columnas deseas recuperar
      include: [
        {
          model: Transactions, // Incluye la relación con la tabla Transactions
          attributes: ["id", "amount"], // Especifica qué columnas deseas recuperar de Transactions
        }
      ],
    });
    if (!transactionUser) {
        return res.status(404).json({ error: "User not found." });
      }
  
      return res.status(200).json(transactionUser); // Devuelve la información del usuario, transacciones y cuenta asociada

  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = getUserTransaction;
