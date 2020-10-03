const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

// SERVER
const server = express();
const PORT = process.env.PORT || 3000;

// SET UP
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

server.get('/', (req, res) => {
  res.status(200).json({ message: 'hello' });
});

// API ROUTER
const apiRouter = require('./routes/api');

// SEND API CALLS TO API ROUTER
server.get('/api', apiRouter);

// ERROR HANDLER
server.use((err, req, res, next) => {
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
