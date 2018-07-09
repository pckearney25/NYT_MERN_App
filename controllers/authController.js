const db = require("../models");
const settings = require("../config/settings");
var jwt = require("jsonwebtoken");

// Defining methods for the authController
module.exports = {
  save: (req, res) => {
    if (!req.body.username || !req.body.password) {
      res.json({ success: false, msg: "Please pass username and password." });
    } else {
      //PCK- May need to be dfirect to make work?
      var newUser = new db.User({
        username: req.body.username,
        password: req.body.password
      });
      // save the user
      newUser.save(err => {
        if (err) {
          return res.json({ success: false, msg: "Username already exists." });
        }
        res.json({ success: true, msg: "Successfully created new user." });
      });
    }
  },
  findOne: (req, res) => {
    db.User.findOne(
      {
        username: req.body.username
      },
      (err, user) => {
        if (err) throw err;

        if (!user) {
          res.status(401).send({
            success: false,
            msg: "Authentication failed. User not found."
          });
        } else {
          //check if password matches
          user.comparePassword(req.body.password, (err, isMatch) => {
            if (isMatch && !err) {
              //if user is found and password is right create a token
              var token = jwt.sign(user.toJSON(), settings.secret);
              //return the information including token as JSON
              res.json({ success: true, token: "JWT " + token });
            } else {
              res.status(401).send({
                success: false,
                msg: "Authentication failed. Wrong password."
              });
            }
          });
        }
      }
    );
  }
};
