const path = require('path');
const { NODE_ENV = 'production' } = process.env;
module.exports = {
  devtool: 'source-map',
  entry: './dist/server.js',
  mode: NODE_ENV,
  target: 'node',
  output: {
    path: path.resolve(__dirname, 'server'),
    filename: 'index.js',
  },
};
