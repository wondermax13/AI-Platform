'use strict';

const mongoose = require('mongoose');
const Question = require('./question');

const Answer = mongoose.Schema({
  question: {type: mongoose.Schema.Types.ObjectId, required: true},
  answer: {type: String, required: true},
  aiId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    default: mongoose.Types.ObjectId(), // TODO: remove once we have an AI schema
  },
  responseTime: {type: Date, default: Date.now},
  score: {type: Number, default: 0},
});

module.exports = mongoose.model('Answer', Answer);
