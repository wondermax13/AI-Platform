"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var Answer_1 = require("./Answer");
exports.QuestionSchema = new mongoose.Schema({
    answers: [Answer_1.AnswerSchema],
    askTime: { type: Date, default: Date.now },
    channels: [String],
    question: String,
});
var Question = mongoose.model('Question', exports.QuestionSchema);
exports.default = Question;
//# sourceMappingURL=Question.js.map