const router = require("express").Router();
const usersRouter = require("./users");
const articlesRouter = require("./articles");
const signInRouter = require("./signin");
const signUpRouter = require("./signup");

router.use("/signup", signUpRouter);
router.use("/signin", signInRouter);

router.use("/users", usersRouter);
router.use("/articles", articlesRouter);

module.exports = router;
