const User = require("../schemas/user");
const bcrypt = require("bcrypt");

const newUser = async (req, res) => {
  const { ROUNDS } = process.env;
  const { name, email, password } = req.body;
  try {
    //Validamos  que el ususario exisa
    const existingUser = await User.findOne({ where: { email: email } });
   
    if (existingUser) {
      return res.status(400).json({ error: "User already exists." });
    }
    //encriptamos contraseña 
    const hashedPassword = bcrypt.hashSync(password, parseInt(ROUNDS));
    //si no exiwte el ususario lo creamos
    const newuser = await User.create({
      name: name,
      email: email,
      password: hashedPassword,
    });
    return res.status(201).json({ message: "Successfully created user." });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};


module.exports = newUser; 