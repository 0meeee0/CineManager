const User = require("../model/Users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    req.body.password = hashedPassword;
    const client = await User.create(req.body);
    res.status(200).json(client);
  } catch (err) {
    res.status(500).json(err);
  }
};
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!(email && password)) {
      return res
        .status(400)
        .json({ message: "Please provide email and password" });
    }
    const user = await User.findOne({ email });
    if (!(user && (await bcrypt.compare(password, user.password)))) {
      return res.status(404).json({ message: "Invalid credentials" });
    } else {
      const userId = user.id;
      const token = jwt.sign({ userId }, process.env.JWT_SECRET);
      res.status(200).json({ token });
    }
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
};
