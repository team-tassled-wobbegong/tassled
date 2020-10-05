const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// sets a schema for 'users'
const usersSchema = new Schema({
  user_name: { type: String, unique: true, required: true },
  first_name: String,
  last_name: String,
  avatar: String,
  gh_url: String,
  access_token: String,
  created_at: { type: Date, default: Date.now },
  configurations: [{ type: Schema.Types.ObjectId, ref: 'UserConfigs' }]
});

// exports all the models in an object to be used in the controller
module.exports = mongoose.model('users', usersSchema);