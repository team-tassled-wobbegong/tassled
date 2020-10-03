const mongoose = require('mongoose');

// MONGO ACCOUNT INFO:
// username: Admin
// password: 7nr9VRR84ofoY86f
const MONGO_URI =
	'mongodb+srv://Admin:7nr9VRR84ofoY86f@cluster0.grjtc.mongodb.net/tasselled-wobegong?retryWrites=true&w=majority';

mongoose
	.connect(MONGO_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		// sets the name of the DB that our collections are part of
		dbName: 'tasselled-wobegong'
	})
	.then(() => console.log('Connected to Mongo DB.'))
	.catch((err) => console.log(err));

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
  configurations: [{ type: Schema.Types.ObjectId, ref: 'UserConfig' }]
});

const User = mongoose.model('users', usersSchema);

// sets a schema for 'userConfigs'
const usersConfigSchema = new Schema({
  label: { type: String, required: true },
  gh_repo: { type: String, unique: true, required: true },
  react: { type: Boolean, default: false },
  express: { type: Boolean, default: false },
  jest: { type: Boolean, default: false },
  mongoose: { type: Boolean, default: false }
});

const UserConfig = mongoose.model('userConfigs', usersConfigSchema);

// sets a schema for 'templateConfigs'
const templateConfigSchema = new Schema({
  label: { type: String, required: true },
  gh_template: { type: String, unique: true, required: true },
  react: { type: Boolean, default: false },
  express: { type: Boolean, default: false },
  jest: { type: Boolean, default: false },
  mongoose: { type: Boolean, default: false }
});

const TemplateConfig = mongoose.model('templateConfigs', templateConfigSchema);

// exports all the models in an object to be used in the controller
module.exports = {
  User,
  UserConfig,
  TemplateConfig,
}