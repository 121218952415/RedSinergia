const Router = require("express");
const router = Router();
const newLogin = require("../controllers/new_login")
router.post("/login", newLogin);
module.exports = router;
