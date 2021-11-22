const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const { User } = require("../models");

router.post("/signup", (req, res) => {
  User.create({
    email: req.body.email,
    password: req.body.password
  })
    .then(newUser => {
      res.json(newUser);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ err });
    });
});

router.post("/login", (req, res) => {
  User.findOne({
    where: {
      email: req.body.email
    }
  })
    .then(foundUser => {
        if(!foundUser){
            res.status(401).send("incorrect email or password")
        }
        else if(bcrypt.compareSync(req.body.password,foundUser.password)){    
            res.json(foundUser);
        }
        else {
            res.status(401).send("incorrect email or password")
        }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ err });
    });
});

module.exports = router;
