const express = require('express');

const router = express.Router();

const userController = require('../controllers/userController');

router.get('/', (req, res) => {
  res.status(200).json({ message: '/api route ping' });
});

// THIS IS THE MAIN CALLBACK URL FOR GITHUB OAUTH
router.get('/oauth/callback', userController.authenticateUser, userController.requestToken);

// GITHUB APP CALLBACK
router.get('/github_app/callback', userController.authenticateUser, userController.requestToken);

// GITHUB WEBHOOK
router.get('/github/webhook', (req, res) => {
  console.log({ req });
  res.send(200).json({ message: 'pong' });
});
module.exports = router;
