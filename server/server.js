const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

// SET UP ENV VARIABLES
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

// server
const server = express();
const PORT = process.env.PORT || 3000;

// DATABASE
const MONGO_URI = process.env.MONGO_URI;
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // sets the name of the DB that our collections are part of
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

// REGULAR ROUTES
server.get('/', (req, res) => {
  res.status(200).json({ message: 'hello' });
});

server.get('/welcome', (req, res) => {
  res.status(200).json({ message: 'Successfully authenticated' });
});


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

console.log('NODE_ENV mode is', process.env.NODE_ENV);

console.log('Remember to check your .env file if you cannot connect to the database');

console.log(`Server is listening at http://localhost:${PORT}`);
console.log(`Client is live at http://localhost:8080`);
