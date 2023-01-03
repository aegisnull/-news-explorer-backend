const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const { JWT_SECRET } = process.env;

const error = require('../helpers/Errors');
const message = require('../constants/ErrorMessages');

const createToken = (user, expiresIn, secret) => {
  const { email, name } = user;
  return jwt.sign({ email, name }, secret, { expiresIn });
};

module.exports.createUser = async (req, res) => {
  try {
    const { email } = req.body;

    // Check if a user with the same email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).send({ message: 'A user with the same email already exists' });
    }

    // Create a new user
    const user = new User(req.body);

    // Hash the password
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;

    // Save the new user to the database
    await user.save();

    // Create a JSON web token
    const token = createToken(user, '7d', JWT_SECRET);
    res.status(201).json({ user: user.toAuthJSON(), token });
  } catch (e) {
    res.status(400).send(e);
  }
};

module.exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      throw new error.NotFound(message.ITEM_NOT_FOUND);
    }
    res.send({ name: user.name, email: user.email });
  } catch (e) {
    next(e);
  }
};

module.exports.getUsers = async (res, next) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (e) {
    next(e);
  }
};

module.exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send({ message: 'Email and password are required' });
    }

    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send({ message: 'Invalid email or password' });
    }

    const token = createToken(user, '7d', JWT_SECRET);
    res.status(200).json({ token });
  } catch (e) {
    res.status(400).send(e);
  }
};
