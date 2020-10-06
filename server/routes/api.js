const express = require('express');

const router = express.Router();

const userController = require('../controllers/userController');
const repoController = require('../controllers/repoController');
const sessionController = require('../controllers/sessionController');

// CALLBACK FOR GITHUB OAUTH
router.get(
  '/oauth/callback',
  userController.authenticateUser,
  userController.requestToken,
  userController.getUserProfile,
  userController.checkIfUserInDatabase,
  sessionController.createSession,
  (req, res) => {
    res.redirect(`http://localhost:8080/?access_token=${res.locals.access_token}`);
  },
);

// CHECKS IF USER IS ALREADY LOGGED IN ON INITIAL PAGE LOAD
router.get(
  '/oath/checksession',
  sessionController.isLoggedIn,
  userController.locateAccessToken,
  userController.getUserProfile,
  userController.checkIfUserInDatabase,
  sessionController.createSession,
  (req, res) => {
    res.status(200).send(res.locals.ghUserInfo);
  },
);

// LOGOUT ROUTE => NOT IMPLEMENTED YET
router.get('/logout', (req, res) => {
  res.clearCookie('cookieId').status(200).send();
});

// CREATES A NEW REPO ON GITHUB
router.post('/github/repos/create', repoController.createNewRepo);

module.exports = router;
