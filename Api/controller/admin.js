const User = require("../model/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const CreatePayload = (user, res) => {
  const payload = {
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };

  jwt.sign(
    payload,
    process.env.JWT_SECRET,
    { expiresIn: "40h" },
    (err, token) => {
      if (err) throw err;

      res.status(201).json({
        user: payload.user,
        token,
      });
    }
  );
};
const adminLogin = async (req, res) => {
  const { email, password } = req.body;
  // console.log(req.body);
  try {
    // find the user by email
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not Exists" });
    const isMatch = await user.matchPassword(password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid Credentials" });
    // Create jwt
    return CreatePayload(user, res);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
};
const adminRegister = async (req, res) => {
  const { name, email, password, role } = req.body;
  // console.log(req.body);
  try {
    let user = await User.findOne({
      email,
    });
    if (user) return res.status(400).json({ message: "User already exists!" });
    user = new User({ name, email, password, role });
    await user.save();
    return CreatePayload(user, res);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
};
module.exports = { adminLogin, adminRegister };
