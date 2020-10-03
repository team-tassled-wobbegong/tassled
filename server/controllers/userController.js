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
      // console.log(response.data.access_token);
      res.redirect(`/welcome?access_token=${response.data.access_token}`);
    });
  } catch (e) {
    return next({
      log: `Error caught in userController.requestToken. \n Error Message: ${e.errmsg || e}`,
      message: { err: e.errmsg || e },
    });
  }
};

// TBD: CREATE NEW USER IN DATABASE
module.exports = userController;
