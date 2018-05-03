'use strict';

const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const errorHandler = require('./error-handler');
const addQuestionRoute = require('../route/route-question');
const addAnswerRoute = require('../route/route-answer');
const addFeedRoute = require('../route/route-feed');

// SERVER CONTROLS
const server = {
  app: null,
  start: async function(port, callback) {

    const PORT = port || '3000';
    const MONGODB_URI = process.env.MONGODB_URI || console.error('Server error. MONGODB_URI not defined');

    //make app
    const app = express();

    //ROUTES/MIDDLEWARE
    const router = express.Router();
    app.use(cors());
    app.use('/api/v1', router);
    addQuestionRoute(router);
    addAnswerRoute(router);
    addFeedRoute(router);
    //default route
    app.all('/{0,}', (req, res) => {
      return errorHandler(new Error('Path error. Route not found.', res));
    });

    //connect mongoose
    await promise(res => mongoose.connect(MONGODB_URI, res), err => err);
    console.log('mongoose connected...');

    //start listening
    await promise(res => app.listen(port, res));
    console.log(`server listening on port: ${port} ...`);

    server.app = app;
  },

  stop: async function() {
    console.log('stopping server...');
    if (!server.app) {
      throw new Error('Server not running. Cannot stop server.');
    }
    mongoose.disconnect();
    server.app = false;
  }
};

function promise(work, failChecker) {
  return new Promise((resolve, reject) => {
    try {
      const handler = (arg1, arg2) => {
        if (failChecker) {
          const nonNullResult = failChecker(arg1, arg2);
          if (nonNullResult) {
            reject(nonNullResult);
          } else {
            resolve();
          }
        } else {
          resolve(arg1, arg2);
        }
      }
      //most callbacks pass the
      work(handler);
    } catch (ex) {
      reject(ex);
    }
  });
}

module.exports = server;