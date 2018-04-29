'use strict';

const mongoose = require('mongoose');

const Answer = mongoose.Schema({
  text: {type: String, required: true},
  ai: {type: String, required: true},
  date: {type: Date, default: Date.now},
  score: {type: Number, default: 0},
});

module.exports = mongoose.model('Answer', Answer);
