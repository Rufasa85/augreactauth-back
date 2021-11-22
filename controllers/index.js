const express = require('express');
const router = express.Router();
const userRoutes = require("./userRoutes");
const petRoutes = require("./petRoutes");

router.use(userRoutes)
router.use("/api/pets",petRoutes)

module.exports = router;