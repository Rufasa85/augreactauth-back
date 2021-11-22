const express = require("express");
const router = express.Router();
const { User, Pet } = require("../models");
const tokenAuth = require("../middleware/tokenAuth");
const isMyPet = require("../middleware/isMyPet");
//get all
router.get("/", (req, res) => {
  Pet.findAll()
    .then(pets => {
      res.json(pets);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ err: err });
    });
});

//get all with user data
router.get("/users", (req, res) => {
  Pet.findAll({
    include: [User]
  })
    .then(pets => {
      res.json(pets);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ err: err });
    });
});

//find one
router.get("/:id", (req, res) => {
  Pet.findByPk(req.params.id, { include: [User] })
    .then(foundPet => {
      if (foundPet) {
        res.json(foundPet);
      } else {
        res.status(404).send("no such pet");
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ err: err });
    });
});

//create pet
router.post("/", tokenAuth, (req, res) => {
  Pet.create({
    name: req.body.name,
    description: req.body.description,
    age: req.body.age,
    species: req.body.species,
    UserId: req.user.id
  })
    .then(newPet => {
      res.json(newPet);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ err: err });
    });
});

//edit pet
router.put("/:id", tokenAuth, isMyPet, (req, res) => {
  Pet.update(
    {
      name: req.body.name,
      description: req.body.description,
      age: req.body.age,
      species: req.body.species
    },
    {
      where: {
        id: req.params.id
      }
    }
  )
    .then(updatedPet => {
      res.json(updatedPet);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ err: err });
    });
});

router.delete("/:id", tokenAuth, isMyPet, (req, res) => {
    Pet.destroy(
        {
          where: {
            id: req.params.id
          }
        }
      )
        .then(delPet => {
          res.json(delPet);
        })
        .catch(err => {
          console.log(err);
          res.status(500).json({ err: err });
        });
});
module.exports = router;
