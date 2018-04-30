'use strict';

const mongoose = require('mongoose');

// public class Question {
//
// 	public String text;
// 	public Date askTime;
// 	public List<String> channels;
//
// 	public Question(String text, Date time, List<String> channels) {
// 		this.text = text;
// 		this.askTime = time;
// 		this.channels = channels;
// 	}
// }

const Question = mongoose.Schema({
  question: {type: String, required: true},
  askTime: {type: Date, default: Date.now},
  channels: [{type: String}],
  answers: [],
});

module.exports = mongoose.model('Question', Question);
