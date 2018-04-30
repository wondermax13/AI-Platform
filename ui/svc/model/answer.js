'use strict';

const mongoose = require('mongoose');
const Question = require('./question');

// AICommunicator / job_system / src / entities / AIAnswer.java
// public class AIAnswer {
//
// 	public long aiId;
// 	public String answer;
// 	public Date askTime, responseTime;
// }

const Answer = mongoose.Schema({
  question: {type: mongoose.Schema.Types.ObjectId, required: true},
  answer: {type: String, required: true},
  aiId: {type: String, required: true},
  askTime: {type: Date},
  responseTime: {type: Date},
  score: {type: Number, default: 0},
});

module.exports = mongoose.model('Answer', Answer);
