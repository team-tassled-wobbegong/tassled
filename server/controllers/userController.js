const axios = require('axios');

const userController = {};

userController.authenticateUser = async (req, res, next) => {
  // random string used for testing Oauth, will need a real random string per request at some point
  const randomTestId = '9323bb9ce6934469b58303863f8c0d54';

  try {
    const { code, state } = req.query;

    // verify the request is from Github
    if (!state === randomTestId) {
      return res.status(401).send('Unauthorized request');
    }

    // pass auth code to next middleware
    res.locals.authCode = code;

    return next();
  } catch (e) {
    return next({
      log: `Error caught in userController.authenticateUser. \n Error Message: ${e.errmsg || e}`,
      message: { err: e.errmsg || e },
    });
  }
};

// THIS IS WHERE I LEFT OFF TRYING TO FIGURE OUT WHY THE RESPONSE IS NOT JSON
userController.requestToken = async (req, res, next) => {
  // helper function to exchange auth code for access token
  function getToken(authCode) {
    const config = {
      method: 'post',
      url: `https://github.com/login/oauth/access_token?code=${authCode}`,
      headers: {},
    };

    return axios(config)
      .then((response) => response.data)
      .catch((e) => console.log(e));
  }

  // Make the request
  const data = await getToken(res.locals.authCode);
  console.log('DATA', { data });

  // RESPONSE PAYLOAD
  // just a get request to our redirecturl, we have to pick the query params off
  const { access_token, token_type } = res.query;

  res.locals.access_token = access_token;

  return res.send(200).json({ token: access_token, type: token_type });
};

// WE HAVE TO RESOLVE THE ACCESS TOKEN BEFORE WE CAN MOVE ON
userController.accessAPI = async (req, res, next) => {
  // helper function
  async function fetchData(token) {
    const config = {
      method: 'post',
      url: `https://api.github.com/user?oauth2_access_token=${token}`,
      headers: {
        Cookie:
          'lidc="b=VB90:g=2747:u=1046:i=1601503033:t=1601580395:s=AQGe8maPoEo1ticrEYcAr0bZsxHNac8I"; lang=v=2&lang=en-us; bcookie="v=2&3dc45d09-3eab-495c-8824-57f4ce7fed7b"; lissc=1; lidc="b=VB90:g=2747:u=1046:i=1601502758:t=1601580395:s=AQFl3qKQy82R2oRI1648QSHavqDrhnR1"',
      },
    };

    return await axios(config)
      .then((response) => response.data)
      .catch((e) => console.log(e));
  }

  // fetch the data with access token
  const userData = await fetchData(res.locals.access_token);

  // TBD: USER DATA IS CURRENTLY UNDEFINED, NEED TO REVIEW THE RESPONSE.

  return next();
};
module.exports = userController;
