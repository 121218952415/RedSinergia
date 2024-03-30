const Router = require("express");
const router = Router();
const users_route = require("./users_route");
const login = require("./login_route");
const account_router = require("./account_router");
const  crearUsuariosYCuentas = require("../../info_db.js/crearUsuariosYCuentas");

// creacion de nuevo usuario
router.use("/User", users_route);

//login de usuario
router.use("/Record", login);

//Creamos cuentas de usuarios
router.use("/Accounts", account_router);

//crea base de datos
// router.post("/createdb", crearUsuariosYCuentas);
module.exports = router;
