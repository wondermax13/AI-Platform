'use strict';

const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const errorHandler = require('./error-handler');

// APP SETUP
const app = express();
const router = express.Router();
const PORT = process.env.PORT || '3000';
const MONGODB_URI = process.env.MONGODB_URI || console.error('Server error. MONGODB_URI not defined');

// MIDDLEWARE
app.use(cors());
app.use('/api/v1', router);
require('../route/route-question')(router);
require('../route/route-answer')(router);

app.all('/{0,}', (req, res) => {
  return errorHandler(new Error('Path error. Route not found.', res));
});

// SERVER CONTROLS
const server = {}

server.start = () => {
  return new Promise((resolve, reject) => {
    if (server.isOn) {
      return reject(new Error('Server running. Cannot start server.'));
    }
    server.http = app.listen(PORT, () => {
      console.log(`Listening on ${PORT}`);
      server.isOn = true;
      mongoose.connect(MONGODB_URI);
      return resolve(server);
    });
  });
};
server.stop = () => {
  return new Promise((resolve, reject) => {
    if (!server.isOn) {
      return reject(new Error('Server not running. Cannot stop server.'))
    }
    mongoose.disconnect();
    server.isOn = false;
    return resolve(server);
  });
};

module.exports = server;
