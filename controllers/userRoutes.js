const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const router = express.Router();
const tokenAuth = require("../middleware/tokenAuth")
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
            const token = jwt.sign({
              email:foundUser.email,
              id:foundUser.id
            },
            "secret"
            ,{
              expiresIn:"2h"
            })    
            res.json({
              token:token,
              user:foundUser
            });
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

router.get("/secretclub",tokenAuth, (req,res)=>{
  res.send(`welcome to the club, ${req.user.email}`)
})

router.get("/profile",tokenAuth, (req,res)=>{
  User.findByPk(req.user.id).then(foundUser=>{
    res.json(foundUser)
  })
})

module.exports = router;
