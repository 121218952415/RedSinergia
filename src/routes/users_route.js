const Router = require("express");
const router = Router();
const newUser= require("../controllers/new_user")

// creacion de nuevo usuario 
router.post("/users",newUser ); 
module.exports = router;