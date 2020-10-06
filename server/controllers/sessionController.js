const Session = require('../models/sessionModels');

const sessionController = {};

// Verify whether there is a currently valid session
sessionController.isLoggedIn = (req, res, next) => {
  if (req.cookies.cookieId) {
    // if the current user has a cookie with a cookieId
    const { cookieId } = req.cookies;
    // find the user in our DB
    Session.findOne({ cookieId }, (e, session) => {
      if (e)
        return next({
          log: `Error caught in sessionController.isLoggedIn. \n Error Message: ${e.errmsg || e}`,
          message: { err: e.errmsg || e },
        });
      if (session) {
        res.locals.cookieId = cookieId;
        return next();
      }
      return res.clearCookie('cookieId').status(200).send();
    });
  } else {
    // no cookies are present
    return res.status(200).send();
  }
};

// Create a new session and save into the database and into cookies
sessionController.createSession = (req, res, next) => {
  const cookieId = res.locals.userProfile.id;
  Session.findOneAndUpdate(
    { cookieId },
    { cookieId },
    { new: true, upsert: true },
    (e, session) => {
      if (e)
        return next({
          log: `Error caught in sessionController.isLoggedIn. \n Error Message: ${e.errmsg || e}`,
          message: { err: e.errmsg || e },
        });
      res.cookie('cookieId', cookieId, { httpOnly: true });
      return next();
    },
  );
};

module.exports = sessionController;
