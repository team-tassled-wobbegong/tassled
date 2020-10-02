const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({ message: '/api route ping' });
});

router.get('/callback', async (req, res, next) => {
  // HANDLE API CALLBACK
  try {
    //
    console.log('API CALLBACK:');
    console.log({ req });
    return next();
  } catch (e) {
    return next({
      log: `Error caught in /api/callback handler. \n Error Message: ${e.errmsg || e}`,
      message: { err: e.errmsg || e },
    });
  }
});

module.exports = router;
