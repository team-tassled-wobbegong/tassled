const express = require('express');
const axios = require('axios');

const router = express.Router();

const userController = require('../controllers/userController');

router.get('/', (req, res) => {
  res.status(200).json({ message: '/api route ping' });
});

// THIS IS THE MAIN CALLBACK URL FOR GITHUB OAUTH
router.get(
  '/oauth/callback',
  userController.authenticateUser,
  userController.requestToken,
  (req, res, next) => {
    // HANDLE API CALLBACK
    // console.log('LOCALS in final', res.locals.access_token);
    console.log('DONE');
    // res.redirect(`/welcome?access_token=${res.locals.access_token}`);
  },
);

module.exports = router;
