const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create a session that lasts 3600 seconds / 1 hour
const sessionSchema = new Schema({
  cookieId: { type: String, required: true, unique: true },
  createdAt: { type: Date, expires: 3600, default: Date.now }
});

module.exports = mongoose.model('Session', sessionSchema);