const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// sets a schema for 'userConfigs'
const configSchema = new Schema({
  name: { type: String, required: true },
  description: String,
  gh_repo: String,
  react: { type: Boolean, default: false },
  express: { type: Boolean, default: false },
  jest: { type: Boolean, default: false },
  mongoose: { type: Boolean, default: false },
  generated_repo_object: Object,
  _created_at: { type: Date, default: Date.now },
});

// exports all the models in an object to be used in the controller
module.exports = mongoose.model('configs', configSchema);
