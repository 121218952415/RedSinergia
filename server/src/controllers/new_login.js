const { where } = require("sequelize");
const User = require("../schemas/user");

const newLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email : email } });

    // Verificar si el usuario existe y la contraseña es correcta
    if (!email || user.password !== password) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }
  
    // Autenticación exitosa
    res.json({ message: '¡Login exitoso!' });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};


module.exports = newLogin;