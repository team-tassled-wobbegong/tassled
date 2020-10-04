const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// sets a schema for 'userConfigs'
const usersConfigSchema = new Schema({
  name: { type: String, required: true },
  gh_id: String,
  description: String,
  gh_url: String,
  gh_repo: { type: String, unique: true, required: true },
  react: { type: Boolean, default: false },
  express: { type: Boolean, default: false },
  jest: { type: Boolean, default: false },
  mongoose: { type: Boolean, default: false },
  generated_repo_object: Object,

});

// exports all the models in an object to be used in the controller
module.exports = mongoose.model('userConfigs', usersConfigSchema);