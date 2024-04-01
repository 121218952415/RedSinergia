const Account = require("../schemas/account");
const jwt = require("jsonwebtoken");

const newAccount = async (req, res) => {
  const { balance, accound_number } = req.body;
  const token = req.headers.authorization?.split(" ")[1];
  try {
    //decodificamos la info del token
    const decodedToken = jwt.decode(token);

    // Verificar si todos los campos requeridos están presentes
    if (!balance || !accound_number) {
      return res.status(400).json({ error: "data is mandatory." });
    }
    if (accound_number) {
      return res.status(200).json({ message: `account already exists` });
    }

    const newaccount = await Account.create({
      accound_number: accound_number,
      UserId: decodedToken.id,
      balance: balance,
    });
    return res
      .status(200)
      .json({ message: `Account  Account Created successfully ` });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = newAccount;
