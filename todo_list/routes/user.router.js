const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");

const saltRounds = 15;

// register user
router.post("/register", (req, res) => {
  const { name, email } = req.body;
  const password = req.body.password;

  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      res.status(500).json({ message: err });
    } else {
      const user = new User({
        name,
        email,
        password: hash,
      });

      user
        .save()
        .then((data) => {
          res.status(201).json({ message: "User created" });
        })
        .catch((err) => {
          res.status(403).json({ message: err.errors });
        });
    }
  });
});

// login user
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .then((data) => {
      bcrypt.compare(password, data.password, (err, result) => {
        if (err) {
          res.status(500).json({ message: err });
        } else {
          if (result) {
            const token = jwt.sign({ id: data._id }, "secretkey");

            res
              .status(200)
              .json({ message: "Login is successfull", token: token });
          } else {
            res.status(403).json({ message: "Login is failed" });
          }
        }
      });
    })
    .catch((err) => {
      res.status(403).json({ message: "Login is failed" });
    });
});

module.exports = router;
