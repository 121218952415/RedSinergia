const Router = require("express");
const { verifyToken } = require("../middlewares/verify_tokens");
const { nweTransactions } = require("../controllers/new_transaction");
const getUserTransaction = require("../controllers/get_transactions.User");
const router = Router();


//creamos un gasto o transaccion 
router.post("/Create", verifyToken,nweTransactions);

//obtenes los gastos realizados por el ususario 
router.get("/made",verifyToken,getUserTransaction)


module.exports = router;