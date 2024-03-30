const Router = require("express");
const { verifyToken } = require("../middlewares/verify_tokens");
const { nweTransactions } = require("../controllers/new_transaction");
const router = Router();



router.post("/Create", verifyToken,nweTransactions);


module.exports = router;