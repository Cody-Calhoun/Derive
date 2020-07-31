const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/User.model");
const { Trip } = require("../models/Trip.model");

module.exports = {
  register(req, res) {
    User.create(req.body)
      .then((newUser) => {
        const token = jwt.sign({
            id: newUser._id,
            email: newUser.email,
          }, process.env.SECRET_KEY);
    
        res.cookie('token', token, {
          httpOnly: true,
        })
        res.json({ message: "success"});
      })
      .catch((err) => res.status(400).json(err));
  },

  async login(req, res) {
    const { email, password } = req.body;
    // console.log(req.body);

    const user = await User.findOne({ email });
    console.log(user);

    if (user === null) {
      return res.sendStatus(400);
    }
  
    const result = await bcrypt.compare(password, user.password);
  
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
  },

  addTrip(req,res){
    User.findOneAndUpdate({})
  },

  getUser(req,res){
    User.findOne({_id: req.params.id})
      .then(data => res.json({ message: "success", results: data}))
      .catch(err => res.json({ message: "error", results: err}))
  }
  
};
