const router = require("express").Router();
const { login } = require("../controllers/users");
const { signIn } = require("../middlewares");

router.post("/signin", signIn, login);

module.exports = router;
