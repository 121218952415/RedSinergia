const Router = require("express");
const router = Router();
const newUser= require("../controllers/new_user");
const {verifyToken} = require("../middlewares/verify_tokens")

// creacion de nuevo usuario 
router.post("/users",verifyToken,newUser ); 
module.exports = router;