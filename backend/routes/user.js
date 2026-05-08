const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');

// @route   PUT api/user/theme
// @desc    Update user theme preference
// @access  Private
router.put('/theme', auth, async (req, res) => {
  try {
    const { theme } = req.body;
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.theme_preference = theme;
    await user.save();
    res.json({ theme: user.theme_preference });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST api/user/contacts
// @desc    Add an emergency contact
// @access  Private
router.post('/contacts', auth, async (req, res) => {
  try {
    const { name, phone, relation } = req.body;
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.contacts.unshift({ name, phone, relation });
    await user.save();
    res.json(user.contacts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   DELETE api/user/contacts/:id
// @desc    Delete a contact
// @access  Private
router.delete('/contacts/:id', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.contacts = user.contacts.filter(
       contact => contact._id.toString() !== req.params.id
    );
    await user.save();
    res.json(user.contacts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
