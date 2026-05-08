
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const ContactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  relation: { type: String }
});

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  theme_preference: { type: String, default: 'light' },
  streak: { type: Number, default: 0 },
  lastLogin: { type: Date },
  contacts: [ContactSchema]
}, { timestamps: true });

// Pre-save middleware to hash password
UserSchema.pre('save', async function() {
  if (!this.isModified('password')) return;
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  } catch (error) {
    throw error;
  }
});

// Method to verify password
UserSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);
