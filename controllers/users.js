const jwt = require('jsonwebtoken');
const User = require('../models/user');
const bcrypt = require('bcryptjs');

const { NODE_ENV, JWT_SECRET } = process.env;

const error = require('../helpers/Errors');
const message = require('../constants/ErrorMessages');

module.exports.createUser = (req, res, next) => {
  const { email, password, name } = req.body;
  bcrypt
    .hash(password, 10)
    .then(() =>
      User.create({
        email,
        password,
        name
      })
    )
    .then(() => {
      res.status(201).send({ name, email });
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(new error.DBconflict(message.DB_CONFLICT));
      } else if (err.message === 'user validation failed: name: Formato de nombre no válido') {
        next(new error.BadRequest(message.BAD_NAME));
      } else if (err.message === 'user validation failed: email: Formato de nombre no válido') {
        next(new error.BadRequest(message.BAD_EMAIL));
      } else {
        next(new error.BadRequest(message.SHORT_PASS));
      }
    });
};

module.exports.getUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new error.NotFound(message.ITEM_NOT_FOUND);
      }
      res.send({ name: user.name, email: user.email });
    })
    .catch(next);
};

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findOne({ email, password })
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' }
      );
      res.send({ ...user.toJSON(), token });
    })
    .catch(() => next(new error.Unauthorized(message.BAD_LOGIN)));
};
//
