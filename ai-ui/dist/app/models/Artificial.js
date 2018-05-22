"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
exports.ArtificialSchema = new mongoose.Schema({
    name: String
});
var Artificial = mongoose.model('AiId', exports.ArtificialSchema);
exports.default = Artificial;
//# sourceMappingURL=Artificial.js.map