const Router = require("express");
const newAccount = require("../controllers/new_account");
const { verifyToken } = require("../middlewares/verify_tokens");
const router = Router();

router.post("/Create",verifyToken,newAccount)

module.exports = router;