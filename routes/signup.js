const router = require("express").Router();
const { createUser } = require("../controllers/users");
const { signUp } = require("../middlewares/celebrateValidators");

router.post("/signup", signUp, createUser);

module.exports = router;
