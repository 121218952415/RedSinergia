const Router = require("express");
const router = Router();
const users_route = require("./users_route");
const login = require("./login_route");
const account_router = require("./account_router");
const transaction_route = require("./transaction_route");
//const crearUsuariosYCuentas = require("../../info_db.js/crearUsuariosYCuentas")

// creacion de nuevo usuario
router.use("/RedSinergia", users_route);

//login de usuario
router.use("/Record", login);

//Creamos cuentas de usuarios
router.use("/Accounts", account_router);

//hacemos la transaccion  a una cuenta
router.use("/Transaction", transaction_route)


module.exports = router;
