
// Importaciones de las dependencias
const app = require("./src/config/app");
const sequelize = require("./src/config/db");
const { config } = require("dotenv");

// Lee las variables de entorno desde el archivo .env
config();

// Puerto del servidor
const PORT = process.env.PORT;

// Iniciar el servidor
async function startServer() {
  try {
    app.listen(PORT, () =>
      console.log(`Server running on port http://localhost:${PORT}`)
    );
  } catch (error) {
    console.log("Unable to initiate", error);
  }
}
startServer();

// Autentica la conexión a la base de datos
(async () => {
  try {
    sequelize
      .authenticate()
      .then(() => console.log("Authenticate has been successfull"));
  } catch (error) {
    console.log("Authenticate has not been succesfull", error);
  }
})();
