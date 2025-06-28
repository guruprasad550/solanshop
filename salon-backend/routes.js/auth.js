const express = require('express');
const router = express.Router();
const User = require('../models/User');

// @route   POST api/auth/signup
// @desc    Register a new user
// @access  Public
router.post('/signup', async (req, res) => {
    console.log('-----', req.body);
  const { name, email, password } = req.body;
  try {
    // Check for existing user
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Create a new user instance
    user = new User({
      name,
      email,
      password, // Password will be hashed by the pre-save hook in the model
    });

    // Save the user to the database
    await user.save();

    res.status(201).json({
      msg: 'User registered successfully',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
