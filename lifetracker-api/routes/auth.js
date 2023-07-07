const express = require("express")
const User = require("../models/user")
const Exercise = require("../models/exercise")
const router = express.Router()

router.post("/login", async function (req, res, next) {
  try {
    const user = await User.authenticate(req.body)
    return res.status(200).json({ user })
  } catch (err) {
    next(err)
  }
})

router.post("/register", async function (req, res, next) {
  try {
    const user = await User.register(req.body)
    console.log(user);
    return res.status(201).json({ user })
    
    
  } catch (err) {
    next(err)
  }
  
})

router.post("/exercise/create", async function (req, res, next) {
  try {
    const exercise = await Exercise.create(req.body);
    return res.status(201).json({ exercise });
  } catch (err) {
    next(err);
  }
});

module.exports = router
