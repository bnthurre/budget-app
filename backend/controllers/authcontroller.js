// controllers/authController.js

const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/auth');

// Register controller
exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcryptjs.hash(password, 10);
    const user = await User.create({ username, email, password: hashedPassword });
    res.status(201).json({ user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Login controller
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) throw new Error('User not found');
    const validPassword = await bcryptjs.compare(password, user.password);
    if (!validPassword) throw new Error('Invalid password');
    const token = jwt.sign({ userId: user._id }, 'secret_key', { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};
