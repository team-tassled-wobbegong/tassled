const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

// SET UP ENV VARIABLES
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

// SERVER
const server = express();
const PORT = process.env.PORT || 3000;

// DATABASE
const { MONGO_URI } = process.env || 'mongodb://localhost:27017/?connectTimeoutMS=10000';
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'tasselled-wobegong',
  })
  .then(() => console.log('Connected to Mongo DB.'))
  .catch((err) => console.log(err));

// SET UP
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(cookieParser());

// API ROUTER
const apiRouter = require('./routes/api');

// SEND API CALLS TO API ROUTER
server.use('/api', apiRouter);

// GLOBAL ERROR HANDLER
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

// SERVES STATIC ASSETS AND HTML IN PRODUCTION
if (process.env.NODE_ENV === 'production') {
  server.use('/build', express.static(path.join(__dirname, '../build')));
  // serve index.html on the route '/'
  server.use('/', (req, res) => {
    res.sendFile(path.join(__dirname, './index.html'));
  });
}

server.listen(PORT);

// * STARTUP LOGS
console.log('NODE_ENV mode is', process.env.NODE_ENV);
console.log('Remember to check your .env file if you cannot connect to the database');
console.log(`Server is listening at http://localhost:${PORT}`);
console.log(`Client is live at http://localhost:8080`);
