# RedSinergia


Introducción
RedSinergia es una plataforma diseñada para facilitar la gestión de transacciones financieras, cuentas de usuarios y verificación de usuarios. Ofrece una serie de endpoints que permiten a los usuarios registrarse, iniciar sesión, crear cuentas bancarias y realizar transacciones entre ellas.

Para comenzar a utilizar el proyecto, es necesario configurar las variables de entorno con las siguientes credenciales:

 DB_USER = RedSinergia2024
DB_PASSWORD = RedSinergia2024
DB_HOST = localhost
DB_NAME = RedSinergia 
PGADMIN_DEFAULT_EMAIL = admin@mail.com
PGADMIN_DEFAULT_PASSWORD=root

SECRETKEY = v41st587r4h1vb98r1hb98w414nb981wb987ry1b8e9r
EXPIRES = "1h"
ROUNDS = 10
PORT = 3000

Nota: Descomenta la siguiente línea antes de iniciar el servidor para insertar datos en la base de datos.
se encuentra en el index de routes
const crearUsuariosYCuentas = require("../../info_db.js/crearUsuariosYCuentas");

Después de iniciar el servidor y ejecutar la función para insertar datos en la base de datos,
vuelve a comentar la línea .

Después de configurar las variables de entorno, ejecuta el siguiente comando para instalar las dependencias del proyecto:

 npm  install


Una vez completada la instalación de las dependencias, puedes iniciar el entorno de desarrollo utilizando Docker con el siguiente comando:

npm docker-compose up -d 


Finalmente, inicia el servidor de desarrollo ejecutando:

 npm start 

Con estos pasos, RedSinergia estará listo para su uso,


Para acceder a PGAdmin, sigue estos pasos:

 1. Abre tu navegador web.

2. En la barra de direcciones, introduce la siguiente URL: http://localhost:5050/.

3. Serás redirigido a la página de inicio de sesión de PGAdmin.

4. Ingresa las credenciales que has configurado en las variables de entorno del proyecto:

Correo electrónico: admin@mail.com
Contraseña: root

Haz clic en el botón "Iniciar sesión" para acceder a la interfaz de PGAdmin.


Para crear un usuario, envía una solicitud POST a la siguiente ruta:

POST http://localhost:3000/RedSinergia/users

En el cuerpo de la solicitud, incluye los siguientes parámetros en formato JSON:

{
  "name": "hernesto",
  "email": "hernesto.usuario2@gmail.com",
  "password": "contraseña123"
}


Después de crear un usuario, deberás realizar un inicio de sesión para acceder a las rutas necesarias para generar transacciones y cuentas adicionales.

Para iniciar sesión, realiza una solicitud POST a la siguiente ruta:

POST http://localhost:3000/record/login

En el cuerpo de la solicitud, incluye los siguientes parámetros en formato JSON:

{
  "email": "hernesto.usuario2@gmail.com",
  "password": "contraseña123"
}

Una vez que hayas iniciado sesión con éxito, podrás acceder a las rutas para generar transacciones y nuevas cuentas, así como a otras funcionalidades del sistema.


Después de realizar con éxito la solicitud de inicio de sesión, recibirás un token en la respuesta. Este token es crucial para acceder a las funcionalidades protegidas de la aplicación. A continuación, se muestra un ejemplo de la respuesta que recibirás:

}
    "message": "login successful: hernesto",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imhlcm5lc3RvLnVzdWFyaW8yQGdtYWlsLmNvbSIsIm5hbWUiOiJoZXJuZXN0byIsInVzZXJJZCI6IjNkNzM2Y2EyLTVmNTItNDc1OS04ZGYzLWJlNGJjOTU2Yzg5ZSIsImlhdCI6MTcxMTkyNTA1OSwiZXhwIjoxNzExOTI4NjU5fQ.slFZDjbu0RoZ_mHcS98DbgEZrMUmDReqvFpYsMUS5JY"
}

Para generar una transacción, realiza una solicitud POST a la siguiente ruta:

POST http://localhost:3000/Transaction/Create

En el cuerpo de la solicitud, incluye los siguientes parámetros en formato JSON:

{
    "account_number": "54325878",
    "amount": 2000.00
}

Además, asegúrate de incluir el token de acceso que se te proporcionó al iniciar sesión en el encabezado de autorización (Authorization Header). El formato del encabezado de autorización debe ser el siguiente:

Authorization: Bearer <token_de_acceso>

El número de cuenta especificado debe corresponder a una cuenta existente en la base de datos, la cual se genera automáticamente al iniciar la base de datos.

Una vez que hayas enviado la solicitud y la transacción se haya completado con éxito, recibirás una respuesta confirmando la realización exitosa de la transacción.


Para obtener la información del usuario logueado, realiza una solicitud GET a la siguiente ruta:

GET http://localhost:3000/RedSinergia/GetUser

Asegúrate de incluir el token de acceso que se obtiene después de iniciar sesión en el encabezado de autorización (Authorization Header). El formato del encabezado de autorización debe ser el siguiente:

Authorization: Bearer <token_de_acceso>

Esta solicitud devolverá la información del usuario logueado, incluyendo su nombre, transacciones y cuentas asociadas en formato JSON.
 

Para obtener los gastos  del usuario logueado, realiza una solicitud GET a la siguiente ruta:

GET http://localhost:3000/RedSinergia/made

Asegúrate de incluir el token de acceso que se obtiene después de iniciar sesión en el encabezado de autorización (Authorization Header). El formato del encabezado de autorización debe ser el siguiente:

Authorization: Bearer <token_de_acceso>

Esta solicitud devolverá la información del usuario logueado, incluyendo su nombre, transacciones y cuentas asociadas en formato JSON.



Para obtener la cantidad de gastos realizados en general   del usuario logueado, realiza una solicitud GET a la siguiente ruta:

GEThttp://localhost:3000/Expenses/

Asegúrate de incluir el token de acceso que se obtiene después de iniciar sesión en el encabezado de autorización (Authorization Header). El formato del encabezado de autorización debe ser el siguiente:

Authorization: Bearer <token_de_acceso>

Esta solicitud devolverá la información de gastos del usuario en general en formato JSON.