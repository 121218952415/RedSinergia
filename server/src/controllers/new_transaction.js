const { User, Transactions, Account } = require("../relations/user");

const nweTransactions = async (req, res) => {
    const {id_origin_account, id_destination_account, id_user, amount}= req.body
  try {
   const checkFunds = await  Account.findOne({where:{id:senderAccountId}, include:[{model:User}]})
     if(checkFunds.balance < amount){
       return res.status(401).json({message:"You don't have enough funds"})
     }

  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
