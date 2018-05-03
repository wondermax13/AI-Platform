'use strict'
const path = require('path');
const dotenv = require('dotenv');

if (process.env.NODE_ENV !== 'production') {
  const env = path.resolve(__dirname, './.env');
  dotenv.config({ path: env });
}

async function start() {
  try {
    const server = require('./lib/server');
    await server.start(process.env.PORT);

    return server;
  } catch (ex) {
    console.error('Server failed to start: ' + ex);
  }
}

module.exports = start();