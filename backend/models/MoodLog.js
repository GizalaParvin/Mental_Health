
const mongoose = require('mongoose');

const MoodLogSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  mood: {
    type: String,
    enum: ['Angry', 'Stressed', 'Grief', 'Anxiety', 'Neutral', 'Happy'],
    required: true
  },
  intensity: {
    type: Number,
    min: 1,
    max: 10,
    default: 5
  },
  notes: {
    type: String,
    default: ''
  },
  recommendedActivity: {
    type: String
  }
}, { timestamps: true });

module.exports = mongoose.model('MoodLog', MoodLogSchema);
