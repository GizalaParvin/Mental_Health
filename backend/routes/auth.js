const express= require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User.js');
const auth = require('../middleware/auth.js');

// Generate JWT Token
const generateToken = (user) => {
  return jwt.sign(
    { user: { id: user.id } },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
};



// ================= REGISTER =================

// @route   POST api/auth/register
// @desc    Register User
// @access  Public

router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {

    // Validation
    if (!username || !email || !password) {
      return res.status(400).json({
        message: 'Please enter all fields'
      });
    }

    // Check Existing User
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        message: 'User already exists'
      });
    }

    // Create User
    user = new User({
      username,
      email,
      password
    });

    await user.save();

    // Generate Token
    const token = generateToken(user);

    res.status(201).json({
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email
      }
    });

  } catch (err) {
    console.error(err.message);

    res.status(500).json({
      message: 'Server Error'
    });
  }
});



// ================= LOGIN =================

// @route   POST api/auth/login
// @desc    Login User
// @access  Public

router.post('/login', async (req, res) => {

  const { email, password } = req.body;

  try {

    // Validation
    if (!email || !password) {
      return res.status(400).json({
        message: 'Please enter all fields'
      });
    }

    // Find User
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: 'Invalid credentials'
      });
    }

    // Compare Password
    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(400).json({
        message: 'Invalid credentials'
      });
    }

    // ================= STREAK LOGIC =================

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (user.lastLogin) {

      const lastLogin = new Date(user.lastLogin);
      lastLogin.setHours(0, 0, 0, 0);

      // Difference in Days
      const diffDays = (today - lastLogin) / (1000 * 60 * 60 * 24);

      if (diffDays === 1) {
        user.streak += 1;
      }
      else if (diffDays > 1) {
        user.streak = 1;
      }

      // If diffDays === 0 → same day login → streak unchanged

    } else {
      user.streak = 1;
    }

    // Update Last Login
    user.lastLogin = new Date();

    await user.save();

    // Generate Token
    const token = generateToken(user);

    res.json({
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        theme_preference: user.theme_preference,
        streak: user.streak
      }
    });

  } catch (err) {

    console.error(err.message);

    res.status(500).json({
      message: 'Server Error'
    });
  }
});



// ================= GET LOGGED IN USER =================

// @route   GET api/auth/me
// @desc    Get Current User
// @access  Private

router.get('/me', auth, async (req, res) => {

  try {

    const user = await User.findById(req.user.id).select('-password');

    if (!user) {
      return res.status(404).json({
        message: 'User not found'
      });
    }

    res.json(user);

  } catch (err) {

    console.error(err.message);

    res.status(500).json({
      message: 'Server Error'
    });
  }
});



module.exports = router;
