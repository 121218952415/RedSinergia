const { Sequelize } = require("sequelize");
const { config } = require("dotenv");
config();

const { DB_PASSWORD, DB_USER, DB_HOST, DB_NAME } = process.env;
const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
  {
    host : DB_HOST,
    dialect: "postgres",
    native: false,
    logging: false,
  }
);
(async ()=> {
    try {
      sequelize.sync({ force: false  , alter: true }).then(() => {
        console.log("Postgres sync has been established successfully.");
      });
    } catch (error) {
      console.error("Unable to sync to the database:", error);
    }
  })();
  
 

module.exports = sequelize;