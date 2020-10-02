const path = require('path');
const express = require('express');
// const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// SERVER
const server = express();
const PORT = process.env.PORT || 3000;

// SET UP
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

// ERROR HANDLER
server.use(() => {
  const defaultErr = {
    log: 'Express error: Unknown middleware',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = { ...defaultErr, err };

  console.log('ERROR LOG => ', errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

// statically serve everything in the build folder on the route '/build'
if (process.env.NODE_ENV === 'production') {
  server.use('/build', express.static(path.join(__dirname, '../build')));
  // serve index.html on the route '/'
  server.use('/', (req, res) => {
    res.sendFile(path.join(__dirname, './index.html'));
  });
}

server.listen(PORT);
