// Importaciones de las dependencias
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const routes = require("../routes");
const sequelize = require("./db");
const { SECRET } = process.env;
// Crear la aplicación de Express
const app = express();

// Configuración de middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json());
app.use(routes);



module.exports = app;