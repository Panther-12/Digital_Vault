const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = await User.create({ username, email, password });
    const token = generateToken(user);
    res.status(201).json({ success: true, user, token });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Invalid password' });
    }
    const token = generateToken(user);
    res.status(200).json({ success: true, user, token });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};


exports.isAuthenticated = (req, res) => {
  // Check if the user is authenticated
  const {user} = req;
  if (user) {
    res.json({ success: true, message: 'User is authenticated' });
  } 
  else {
    res.status(401).json({ success: false, message: 'User is not authenticated' });
  }
};



function generateToken(user) {
  return jwt.sign(
    {
      user: {
        _id: user._id,
        username: user.username,
        email: user.email
      }
    },
    process.env.JWT_SECRET_KEY
  );
}
