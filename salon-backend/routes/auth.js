const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// @route   POST api/auth/signup
// @desc    Register a new user
// @access  Public
router.post(
  '/signup',
  [
    body('name', 'Name is required').not().isEmpty().trim(),
    body('email', 'Please include a valid email').isEmail().normalizeEmail(),
    body('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      // Check for existing user
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ msg: 'User with this email already exists' });
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
  }
);

// @route   POST api/auth/signin
// @desc    Authenticate user & get token (Sign In)
// @access  Public
router.post(
  '/signin',
  [
    body('email', 'Please include a valid email').isEmail().normalizeEmail(),
    body('password', 'Password is required').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      // Check if user exists
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ msg: 'Invalid credentials' });
      }

      // Check if password matches
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid credentials' });
      }

      // User matched, create JWT payload
      const payload = {
        user: {
          id: user.id,
        },
      };

      // Sign the token
      jwt.sign(
        payload,
        process.env.JWT_SECRET, // Make sure to add JWT_SECRET to your .env file
        { expiresIn: '5h' }, // Token expires in 5 hours
        (err, token) => {
          if (err) throw err;
          res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;