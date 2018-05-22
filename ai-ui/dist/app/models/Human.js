"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
exports.HumanSchema = new mongoose.Schema({
    name: String
});
var Human = mongoose.model('Human', exports.HumanSchema);
exports.default = Human;
//# sourceMappingURL=Human.js.map