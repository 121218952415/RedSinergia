const Router = require("express");
const router = Router();
const users_route = require("./users_route")
const login = require("./login_route")

// creacion de nuevo usuario 
router.use("/RedSinergia", users_route ); 

//login de usuario 
router.use("/RedSinergia",login)
module.exports = router;