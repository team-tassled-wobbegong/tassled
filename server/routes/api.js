const express = require('express');

const router = express.Router();

const userController = require('../controllers/userController');

router.get('/', (req, res) => {
  res.status(200).json({ message: '/api route ping' });
});
router.post('/', (req, res) => {
  console.log({ req });
  res.status(200).json({ message: 'pong' });
});

// THIS IS THE MAIN CALLBACK URL FOR GITHUB OAUTH
router.get('/oauth/callback', userController.authenticateUser, userController.requestToken, userController.addUserToDatabase, (req, res) => {
  res.redirect(`/welcome?access_token=${res.locals.access_token}`);
});

// GITHUB APP CALLBACK
router.get('/github_app/callback', userController.authenticateUser, userController.requestToken);

// GITHUB WEBHOOK
router.post('/github/webhook', (req, res) => {
  console.log({ req });
  res.send(200).json({ message: 'pong' });
});
module.exports = router;
