const Account = require("../schemas/account");

const newAccount = async (req, res) => {
    const {balance,accound_number} = req.body;
    const token = req.headers.authorization?.split(" ")[1];
  try {
    const decodedToken = jwt.decode(token);
    
      // Verificar si todos los campos requeridos están presentes
      if (!balance || !accound_number) {
        return res.status(400).json({ error: "data is mandatory." });
    }

    const newaccount = await Account.create({
        accound_number: accound_number,
        id_user: decodedToken.id,
        balance: balance,
      });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = newAccount