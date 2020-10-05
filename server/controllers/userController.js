const axios = require('axios');

const User = require('../models/userModels');

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
  const clientSecret = process.env.GITHUB_CLIENT_SECRET;
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

userController.getUserProfile = async (req, res, next) => {
  try {
    const config = {
      method: 'get',
      url: 'https://api.github.com/user',
      headers: {
        Accept: 'application/vnd.github.v3+json',
        Authorization: `token ${res.locals.access_token}`,
      },
    };

    const userProfile = await axios(config);

    res.locals.userProfile = userProfile.data;

    return next();
  } catch (e) {
    return next({
      log: `Error caught in userController.getUserProfile. \n Error Message: ${e.errmsg || e}`,
      message: { err: e.errmsg || e },
    });
  }
};

userController.checkIfUserInDatabase = async (req, res, next) => {
  console.log('checkIfUserInDatabase');
  const id = res.locals.userProfile.id;

  const user = res.locals.userProfile;
  user.full_object = Object.assign({}, res.locals.userProfile);
  user.access_token = res.locals.access_token;

  User.findOneAndUpdate({ id }, user, { new: true, upsert: true }, (e, createdUser) => {
    console.log('findOneAndUpdate');
    if (e)
      return next({
        log: `Error caught in userController.checkIfUserInDatabase. \n Error Message: ${
          e.errmsg || e
        }`,
        message: { err: e.errmsg || e },
      });
    if (createdUser) {
      // a user exists in our database save it to res.locals so we can return it
      res.locals.ghUserInfo = user;
      return next();
    }
  });
};

userController.locateAccessToken = async (req, res, next) => {
  console.log('userController.locateAccessToken');
  const id = res.locals.cookieId || req.cookies.cookieId;

  User.findOne({ id }, (e, user) => {
    if (e)
      return next({
        log: `Error caught in userController.locateAccessToken. \n Error Message: ${e.errmsg || e}`,
        message: { err: e.errmsg || e },
      });
    if (user) {
      // a user exists in our database save it to res.locals so we can return it
      res.locals.userProfile = user;
      res.locals.access_token = user.access_token;
      return next();
    }
  });
};

module.exports = userController;
