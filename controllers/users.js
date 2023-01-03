const jwt = require('jsonwebtoken');
const User = require('../models/user');
const bcrypt = require('bcryptjs');

const { NODE_ENV, JWT_SECRET } = process.env;

const error = require('../helpers/Errors');
const message = require('../constants/ErrorMessages');

const createToken = (user, secret, expiresIn) => {
  const { email, name } = user;
  return jwt.sign({ email, name }, secret, { expiresIn });
};

module.exports.createUser = async (req, res) => {
  const { email } = req.body;
  try {
    // Check if a user with the same email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).send({ message: 'A user with the same email already exists' });
    }
    // Create a new user
    const user = new User(req.body);
    // Hash the password
    user.password = await bcrypt.hash(user.password, 10);
    // Save the new user to the database
    await user.save();
    // Create a JSON web token
    const token = createToken(user, process.env.SECRET, '1h');
    res.status(201).json({ user: user.toAuthJSON(), token });
  } catch (e) {
    res.status(400).send(e);
  }
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

module.exports.getUsers = (res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(next);
};

module.exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).send({ message: 'Email and password are required' });
  }
  try {
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send({ message: 'Invalid email or password' });
    }
    const token = createToken(user, JWT_SECRET, '7d');
    res.status(200).json({ token });
  } catch (e) {
    res.status(400).send(e);
  }
};
