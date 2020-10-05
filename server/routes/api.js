const express = require('express');

const router = express.Router();

const userController = require('../controllers/userController');
const sessionController = require('../controllers/sessionController');

router.get('/', (req, res) => {
  res.status(200).json({ message: '/api route ping' });
});
router.post('/', (req, res) => {
  console.log({ req });
  res.status(200).json({ message: 'pong' });
});

// THIS IS THE MAIN CALLBACK URL FOR GITHUB OAUTH
router.get(
  '/oauth/callback',
  userController.authenticateUser,
  userController.requestToken,
  userController.getUserProfile,
  userController.checkIfUserInDatabase,
  sessionController.createSession,
  (req, res) => {
    res.redirect(`/welcome?access_token=${res.locals.access_token}`);
  },
);

// CHECK FOR AN ACTIVE SESSION AND RETURN USER INFO
router.get(
  '/checksession',
  // checks if there is active session and the user exists
  sessionController.isLoggedIn,
  // find the user info and save the access token to res.locals.access_token
  userController.locateAccessToken,
  // get/update user data and send it back to front end
  userController.checkIfUserInDatabase,
  (req, res) => {
    res.status(200).send();
  },
);

// GITHUB APP CALLBACK
router.get('/github_app/callback', userController.authenticateUser, userController.requestToken);

// GITHUB WEBHOOK
router.post('/github/webhook', (req, res) => {
  console.log({ req });
  res.send(200).json({ message: 'pong' });
});
module.exports = router;
