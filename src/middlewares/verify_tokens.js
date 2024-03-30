const jwt = require('jsonwebtoken');

// Middleware para verificar el token JWT
const verifyToken = (req, res, next) => {
    try {
        // Obtener el token de la cabecera Authorization
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            // Si no hay token, se retorna una respuesta de error
            return res.status(401).json({ error: "No token provided" });
        }

        const { SECRETKEY } = process.env;

        // Verificar el token y decodificar el payload
        const decoded = jwt.verify(token, SECRETKEY);
        req.user = decoded; // Guardar el payload decodificado en el objeto req para su uso posterior
        next(); // Llamar a next() para continuar con el siguiente middleware o controlador
    } catch (error) {
        // Si hay algún error, se retorna una respuesta de error
        if (error instanceof jwt.TokenExpiredError) {
            // Token caducado, devuelve un error específico
            return res.status(401).json({ error: "Token expired" });
        } else {
            console.log(error)
            // Otros errores, devuelve un error de autorización genérico
            return res.status(401).json({ error: "Unauthorized" });
        }
    }
};

module.exports = { verifyToken };
