const express = require("express");
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
            res.status(404).send("no user found")
        }
        else if(req.body.password===foundUser.password){    
            res.json(foundUser);
        }
        else {
            res.status(401).send("wrong password")
        }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ err });
    });
});

module.exports = router;
