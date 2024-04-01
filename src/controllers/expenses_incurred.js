const User = require("../schemas/user");
const Transactions = require("../schemas/transactions");
const jwt = require("jsonwebtoken");

const expensesCurrent = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  try {
    //decodificamos la info del token
    const decodedToken = jwt.decode(token); //decodificamos el jwt
    const idUserAccount = decodedToken.userId;
    const userWittransaction = await User.findAll({
      where: { id:idUserAccount }, // buscamos la cuenta del logeado por id de token
      include: [{ model: Transactions }], // Esto incluirá la cuenta relacionada
    });
    // guardamos la transacciones 
    const CurrentUser = userWittransaction[0].Transactions
    if (!CurrentUser) {
      return res.status(400).json({ error: "the user has no expenses" });
    }
   let TotalExpenditures = 0.0;
   for (let i=0;i<CurrentUser.length;i++){
     
    TotalExpenditures += parseFloat(CurrentUser[i].amount)
   }

    return res.status(201).json(`Your current expenses amount to $ ${TotalExpenditures}`);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = expensesCurrent;
