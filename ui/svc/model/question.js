'use strict';

const mongoose = require('mongoose');
const Answer = require('./answer');

const Question = mongoose.Schema({
  question: {type: String, required: true},
  askTime: {type: Date, default: Date.now},
  channels: [{type: String}],
  answers: [],
});

module.exports = mongoose.model('Question', Question);
