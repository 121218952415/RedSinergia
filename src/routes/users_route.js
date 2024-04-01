const Router = require("express");
const router = Router();
const newUser = require("../controllers/new_user");
const getAllUser = require("../controllers/getalluser");
const { verifyToken } = require("../middlewares/verify_tokens");

// creacion de nuevo usuario
router.post("/users", verifyToken, newUser);

// informacion del ususario
router.get("/GetUser", verifyToken, getAllUser);
module.exports = router;
