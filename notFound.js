const router = require("express").Router();
const error = require("../helpers");
const message = require("../constants");

router.all("*", (req, res, next) =>
  next(new error.NotFound(message.ITEM_NOT_FOUND))
);

module.exports = router;
