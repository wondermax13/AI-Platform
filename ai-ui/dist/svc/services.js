'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var ErrorHandler_1 = require("./ErrorHandler");
var route_answer_1 = require("./route/route-answer");
var route_feed_1 = require("./route/route-feed");
var route_question_1 = require("./route/route-question");
var cors = require("cors");
var dotenv = require("dotenv");
var mongoose = require("mongoose");
var path = require("path");
if (process.env.NODE_ENV !== 'production') {
    console.log(process.cwd());
    var env = path.resolve(process.cwd(), './.env');
    console.log(env);
    dotenv.config({ path: env });
}
var MONGODB_URI = process.env.MONGODB_URI || console.error('Server error. MONGODB_URI not defined');
var mongooseConnected = false;
// SERVER CONTROLS
function services(server) {
    return __awaiter(this, void 0, void 0, function () {
        var router, ex_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    server.use(ErrorHandler_1.default);
                    server.use(cors());
                    router = express_1.Router();
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    // connect mongoose
                    return [4 /*yield*/, new Promise(function (resolve, reject) {
                            mongoose.connect(MONGODB_URI, {}, function (err) {
                                if (err) {
                                    reject(err);
                                }
                                else {
                                    resolve();
                                }
                            });
                        })];
                case 2:
                    // connect mongoose
                    _a.sent();
                    mongooseConnected = true;
                    server.use('/api/v1', router);
                    route_question_1.default(router);
                    route_answer_1.default(router);
                    route_feed_1.default(router);
                    return [3 /*break*/, 4];
                case 3:
                    ex_1 = _a.sent();
                    server.all('*', function (request, response, next) { return next(ex_1); });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.services = services;
function stop(server) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            console.log('stopping server...');
            if (mongooseConnected) {
                mongoose.disconnect();
            }
            return [2 /*return*/];
        });
    });
}
exports.stop = stop;
//# sourceMappingURL=services.js.map