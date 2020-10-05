const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// sets a schema for 'users'
const usersSchema = new Schema({
  login: String,
  id: { type: Number, unique: true, required: true },
  avatar_url: String,
  url: String,
  html_url: String,
  name: String,
  company: String,
  blog: String,
  location: String,
  email: String,
  hireable: String,
  bio: String,
  twitter_username: String,
  public_repos: String,
  followers: String,
  following: String,
  access_token: String,
  _created_at: { type: Date, default: Date.now },
  full_object: Object,
  configurations: [{ type: Schema.Types.ObjectId, ref: 'configs' }]
});

// exports all the models in an object to be used in the controller
module.exports = mongoose.model('users', usersSchema);