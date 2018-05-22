"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
exports.AnswerSchema = new mongoose.Schema({
    answer: String,
    question: { type: mongoose.Schema.Types.ObjectId, ref: 'Question' },
    responseTime: Date,
    score: Number,
});
var Answer = mongoose.model('AiId', exports.AnswerSchema);
exports.default = Answer;
//# sourceMappingURL=Answer.js.map