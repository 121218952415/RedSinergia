const User = require("../schemas/user");

const newUser = async (req, res) => {
  const { name, email, password } = req.body;
  console.log("aquiwww", name, email, password )
  try {
    //Validamos  que el ususario exisa
    const existingUser = await User.findOne({ where: { email: email } });
   
    if (existingUser) {
      return res.status(400).json({ error: "User already exists." });
    }

    //si no exiwte el ususario lo creamos
    const newuser = await User.create({
      name: name,
      email: email,
      password: password,
    });
    return res.status(201).json({ message: "Successfully created user." });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};


module.exports = newUser; 