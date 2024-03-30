// const Account = require("../src/schemas/account");
// const User = require("../src/schemas/user");
// const bcrypt = require("bcrypt");
// const { ROUNDS } = process.env;


// // Función asincrónica para crear usuarios y cuentas
// async function createUsersAndAccounts() {
//     const usersData = [
//         {
//             "name": "rojelio ",
//             "email": "rojelio.bajo@gmail.com",
//             "password": "Alexisvega9524"
//         },
//         {
//             "name": "hernesto",
//             "email": "hernesto.usuario2@gmail.com",
//             "password": "contraseña123"
//         },
//         {
//             "name": "alejandro",
//             "email": "alejandro.usuario3@gmail.com",
//             "password": "contraseña123"
//         },
//         {
//             "name": "luis",
//             "email": "luis.usuario4@gmail.com",
//             "password": "contraseña123"
//         },
//         {
//             "name": "adriana",
//             "email": "adriana.usuario5@gmail.com",
//             "password": "contraseña123"
//         },
//         // Agrega más usuarios si lo deseas
//     ];

//     try {
//         // Iteramos sobre los datos de los usuarios y creamos cada usuario con su cuenta asociada
//         for (const userData of usersData) {
//             // Suponiendo que ya tienes importada la función para hashear contraseñas
//             const hashedPassword = bcrypt.hashSync(userData.password, parseInt(ROUNDS));
//             //genera automaticamente 
//             const generateAccountNumber = Math.floor(Math.random() * (99999999 - 10000000 + 1)) + 10000000;
//             //geramos  el dinero de la cuenta 
//             const balance = ((Math.random() * (13000.0 - 100.0)) + 100.0).toFixed(2);
//             // Creamos el usuario
//             const newUser = await User.create({
//                 name: userData.name,
//                 email: userData.email,
//                 password: hashedPassword
//             });
//             // Creamos la cuenta asociada al usuario
//             const newAccount = await Account.create({
//                 account_number: generateAccountNumber, // Generamos un número de cuenta
//                 id_user: newUser.id, // Usamos el ID del nuevo usuario
//                 balance: balance // Supongamos que la cuenta se crea con un saldo inicial de cero
//             });
//             console.log(`Usuario y cuenta creados: ${newUser}, ${newAccount}`);
//         }
        
//         // Después de crear todas las cuentas, obtenemos el número total de cuentas en la base de datos
//         const totalAccounts = await Account.count();
//         console.log(`Número total de cuentas en la base de datos: ${totalAccounts}`);
//     } catch (error) {
//          console.error(`Error al crear usuario y cuenta: ${error}`);
//     }
// }

// // Llamamos a la función para que se ejecute automáticamente
// createUsersAndAccounts();


// module.exports = createUsersAndAccounts;