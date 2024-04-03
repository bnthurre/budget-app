const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  fullName: { type: String, required: true },
  address: { type: String, required: true },
  stateRegion: { type: String, required: true },
  city: { type: String, required: true },
  role: { type: String, required: true },
  company: { type: String, required: true }
});

module.exports = mongoose.model('User', userSchema);
