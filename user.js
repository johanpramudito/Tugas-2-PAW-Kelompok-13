const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  gender: { type: String, required: true },
  phone: { type: Number, required: true },
  email: { type: String, required: true },
  adress: { type: Number, required: true },
  dateOfBirth: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const User = mongoose.model('users', userSchema);

module.exports = Film;
