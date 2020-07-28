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

    const user = await User.findOne({ email });

    if (user === null) {
      return res.sendStatus(400);
    }

    const result = await bcrypt.compare(password, user.passsword);

    if (result === false) {
      return res.sendStatus(400);
    }

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
      },
      process.env.SECRET_KEY
    );

    res.cookie("token", token, {
      httpOnly: true,
    });
    res.json({ message: "success", token });
  },

  logout(req,res){
      res.clearCookie('token');
      res.json({ massage: 'success'});
  }
};
