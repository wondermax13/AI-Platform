'use strict';

const mongoose = require('mongoose');

const Question = mongoose.Schema({
  question: {type: String, required: true},
  date: {type: Date, default: Date.now},
  answers: [],
});

module.exports = mongoose.model('Question', Question);
