const mongoose = require('mongoose');
const { User, UserConfig, TemplateConfig } = require('../models/schema-models.js');

const axios = require('axios');

const db = require('../models/schema-models.js');

const { User, UserConfig } = require('../models/schema-models.js');

const userController = {};

userController.authenticateUser = async (req, res, next) => {
  // TBD: CREATE RANDOM UNGUESSABLE STRING, HARD CODED FOR NOW
  const randomString = '9323bb9ce6934469b58303863f8c0d54';

  try {
    const { code, state } = req.query;

    // VERIFY REQUEST FOR SECURITY
    if (!state === randomString) {
      return res.status(401).send('Unauthorized request');
    }

    // SAVE TEMPORARY AUTH CODE
    res.locals.authCode = code;

    return next();
  } catch (e) {
    return next({
      log: `Error caught in userController.authenticateUser. \n Error Message: ${e.errmsg || e}`,
      message: { err: e.errmsg || e },
    });
  }
};

userController.requestToken = async (req, res, next) => {
  const clientID = '9736e547efbf758aa0dc';
  const clientSecret = 'd448899a40b1ec8a954e72344abae29880cec485';
  const { authCode } = res.locals;

  try {
    axios({
      method: 'post',
      url: `https://github.com/login/oauth/access_token?client_id=${clientID}&client_secret=${clientSecret}&code=${authCode}`,
      headers: {
        accept: 'application/json',
      },
    }).then((response) => {
      res.locals.access_token = response.data.access_token;
      return next();
    });
  } catch (e) {
    return next({
      log: `Error caught in userController.requestToken. \n Error Message: ${e.errmsg || e}`,
      message: { err: e.errmsg || e },
    });
  }
};

userController.addUserToDatabase = async (req, res, next) => {
  // temporary placeholder for adding user
  const user = {
<<<<<<< HEAD
    user_name: 'temp',
    first_name: 'temp',
    last_name: 'temp',
    avatar: 'temp',
    gh_url: 'temp',
    access_token: res.locals.access_token,
  };
  User.create(user, (e, user) => {
    if (e)
      return next({
        log: `Error caught in userController.addUserToDatabase. \n Error Message: ${e.errmsg || e}`,
        message: { err: e.errmsg || e },
      });
=======
    user_name: "gary",
    first_name: "temp",
    last_name: "temp",
    avatar: "temp",
    gh_url: "temp",
    access_token: res.locals.access_token
  }
  User.create(( user ), (e, user) => {
    if (e) return next({
      log: `Error caught in userController.addUserToDatabase. \n Error Message: ${e.errmsg || e}`,
      message: { err: e.errmsg || e },
    });
>>>>>>> master
    res.locals.user = user;
    // res.locals.userID = user._id;
    return next();
  });
};

<<<<<<< HEAD
userController.checkIfUserInDatabase;
=======
userController.checkIfUserInDatabase = async (req, res, next) => {
  // temporary placeholder user_name that comes from response
  const user_name = "test";
  User.findOne({ user_name }, (e, user) => {
    if (e) return next({
      log: `Error caught in userController.checkIfUserInDatabase. \n Error Message: ${e.errmsg || e}`,
      message: { err: e.errmsg || e },
    });
    if(user) {
      // a user exists in our database
      res.locals.user = user;
      res.locals.userID = user._id;
      res.redirect(`/welcome?access_token=${res.locals.access_token}`);
    } else {
      // go to next middle ware to create a new user
      return next();
    }
  });
}
>>>>>>> master

// TBD: CREATE NEW USER IN DATABASE
module.exports = userController;
