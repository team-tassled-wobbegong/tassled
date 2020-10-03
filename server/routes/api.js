const express = require('express');
const axios = require('axios');

const router = express.Router();

const userController = require('../controllers/userController');

router.get('/', (req, res) => {
  res.status(200).json({ message: '/api route ping' });
});

router.get('/callback', userController.authenticateUser, (req, res, next) => {
  // HANDLE API CALLBACK
  res.status(200).json({ message: 'received callback' });
});

router.get(
  '/callback/auth_code',
  userController.requestToken,
  userController.accessAPI,
  async (req, res, next) => {
    res.status(200).json({ message: 'accessAPI completed' });
  },
);

module.exports = router;
