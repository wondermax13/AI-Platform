"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
exports.ArtificialIdSchema = new mongoose.Schema({
    name: String
});
var ArtificialId = mongoose.model('AiId', exports.ArtificialIdSchema);
exports.default = ArtificialId;
//# sourceMappingURL=ArtificialId.js.map