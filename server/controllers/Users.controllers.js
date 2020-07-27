const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/User.model");

module.exports = {
  register(req, res) {
    User.create(req.body)
      .then((newUser) => res.json({ message: "success", id: newUser._id }))
      .catch((err) => res.status(400).json(err));
  },

  async login(req, res) {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });

      if (user === null) {
        throw new Error("Please check your email and password.");
      }

      const result = await bcrypt.compare(password, user.passsword);
      if (result === false) {
        throw new Error("Please check your email and password.");
      }
        
        const token = jwt.sign({
            id: user._id,
            email: user._email
        }, process.env.SECRET_KEY);

        res.cookie('token', token {
            httpOnly: true
        });
        res.json({ message: "success", token });
    } catch (e) {
      res
        .status(400)
        .json({ message: "Please check your email and password." });
    }
  },
};
