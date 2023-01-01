const jwt = require("jsonwebtoken");
const User = require("../models/user");

const error = require("../helpers");
const message = require("../constants");

module.exports.createUser = (req, res, next) => {
  const { email, password, name } = req.body;
  User.create({ email, password, name })
    .then(() => {
      res.status(201).send({ name, email });
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(new error.DBconflict(message.DB_CONFLICT));
      } else if (
        err.message ===
        "user validation failed: name: Formato de nombre no válido"
      ) {
        next(new error.BadRequest(message.BAD_NAME));
      } else if (
        err.message ===
        "user validation failed: email: Formato de nombre no válido"
      ) {
        next(new error.BadRequest(message.BAD_EMAIL));
      } else {
        next(new error.BadRequest(message.SHORT_PASS));
      }
    });
};

module.exports.getUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => {
      throw new error.NotFound(message.ITEM_NOT_FOUND);
    })
    .then((user) => res.send({ name: user.name, email: user.email }))
    .catch(next);
};

const { JWT_SECRET } = require("../config");

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      const { name } = user;
      res
        .cookie("jwt", token, {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
        })
        .send({ name, token });
    })
    .catch(() => next(new error.Unauthorized(message.BAD_LOGIN)));
};
