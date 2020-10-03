<<<<<<< HEAD
=======
const mongoose = require('mongoose');
const { User, UserConfig, TemplateConfig } = require('../models/schema-models.js');
>>>>>>> master
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
      res.locals.access_token = response.data.access_token
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
    user_name: "temp",
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
    res.locals.user = user;
    res.locals.userID = user._id;
    return next();
  });
}

userController.checkIfUserInDatabase

// TBD: CREATE NEW USER IN DATABASE
module.exports = userController;
