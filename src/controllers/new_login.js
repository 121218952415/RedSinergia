const User = require("../schemas/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const newLogin = async (req, res) => {
  const { SECRETKEY, EXPIRES, ROUNDS} = process.env;
  const { email, password } = req.body;
  try {
     
    // Buscar el usuario en la base de datos basándose en el nombre de usuario
    const user = await User.findOne({ where: { email: email } });
    // Verificar si el usuario existe
    if (!user) {
      return res.status(401).json({ message: "invalid credentials" });
    }

    // Comparar la contraseña encriptada con la contraseña proporcionada
    const passwordMatch = await bcrypt.compare(password, user.password);

// Verificar si las contraseñas coinciden
if (passwordMatch) {
  // Si las contraseñas coinciden, generar un token JWT

  const token = jwt.sign(
    {
      email: user.email,
      name: user.name,
      userId: user.id,
      
    },
    SECRETKEY,
    { expiresIn: EXPIRES }
  );

  return res
    .status(200)
    .json({ message : `login successful: ${user.name}`, token });
} else {
  // Si las contraseñas no coinciden, devolver un error
  return res.status(401).json({ message: "invalid credentials" });
}
  } catch (error) {
    console.log("::::::",error)
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = newLogin;
