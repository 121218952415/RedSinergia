const Router = require("express");
const { verifyToken } = require("../middlewares/verify_tokens");
const expensesCurrent = require("../controllers/expenses_incurred");
const router = Router();

router.get("/",verifyToken,expensesCurrent);

module.exports = router;