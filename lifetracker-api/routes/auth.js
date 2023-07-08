const express = require("express")
const User = require("../models/user")
const Exercise = require("../models/exercise")
const router = express.Router()
const security = require("../middleware/security")
const { createUserJwt } = require("../utils/tokens");





router.post("/login", async function (req, res, next) {
  try {
    const user = await User.authenticate(req.body)
    const token = createUserJwt(user);
    return res.status(200).json({ user, token })
  } catch (err) {
    next(err)
  }
})

router.post("/register", async function (req, res, next) {
  try {
    const user = await User.register(req.body)
    const token = createUserJwt(user);
    return res.status(201).json({ user, token })
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

router.get("/exercise/:user_id",  async function (req, res, next) {
  console.log("req.params is: ", req.params.user_id)
  try {
    const exercises = await Exercise.fetchExercisesByUserId(req.params.user_id);
    return res.status(200).json({ exercises });
  } catch (err) {
    next(err);
  }
});


// To implement the security middleware for strech feature in the future.. they can access info about themselves
router.get("/me", security.requireAuthenticatedUser, async function (req, res, next) {
  try {
    const { email } = res.locals.user
    const user = await User.fetchUserByEmail(email)
    return res.status(200).json({ user })
  } catch (err) {
    next(err)
  }
})


module.exports = router
