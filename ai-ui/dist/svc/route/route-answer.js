"use strict";
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
var BodyParser = require("body-parser");
var Answer_1 = require("../../app/models/Answer");
var Question_1 = require("../../app/models/Question");
var bodyParser = BodyParser.json();
function routeAnswer(router) {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            router.post('/answer/to/:questionId', bodyParser, function (request, response, next) { return __awaiter(_this, void 0, void 0, function () {
                var answer, question, ex_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            answer = new Answer_1.default(request.body);
                            console.log("POST /answer/to/" + request.params.questionId + "\n" + answer);
                            return [4 /*yield*/, Question_1.default.findById(request.params.questionId)];
                        case 1:
                            question = _a.sent();
                            if (!question) {
                                response.status(422).json({ error: 'Invalid question id' });
                            }
                            else {
                                answer.question = question._id;
                                answer.save();
                                question.answers = question.answers || [];
                                question.answers.push(answer);
                                question.save();
                                response.sendStatus(201);
                            }
                            return [3 /*break*/, 3];
                        case 2:
                            ex_1 = _a.sent();
                            next(ex_1);
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); });
            router.get('/answer/:answerId', function (request, response, next) { return __awaiter(_this, void 0, void 0, function () {
                var answer, ex_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            console.log("GET /answer/" + request.params.answerId);
                            return [4 /*yield*/, Answer_1.default.findById(request.params.answerId)];
                        case 1:
                            answer = _a.sent();
                            if (!answer) {
                                throw new Error("Path Error: Answers not found: " + request.params.answerId);
                            }
                            response.status(200).json(answer);
                            return [3 /*break*/, 3];
                        case 2:
                            ex_2 = _a.sent();
                            next(ex_2);
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); });
            router.get('/answers/to/:questionId', function (request, response, next) { return __awaiter(_this, void 0, void 0, function () {
                var question, ex_3;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            console.log("GET /answers/to/" + request.params.questionId);
                            return [4 /*yield*/, Question_1.default.findById(request.params.questionId)];
                        case 1:
                            question = _a.sent();
                            if (!question) {
                                throw new Error("Path Error: Answers not found: Question not found: " + request.params.questionId);
                            }
                            response.status(200).json(question.answers);
                            return [3 /*break*/, 3];
                        case 2:
                            ex_3 = _a.sent();
                            next(ex_3);
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); });
            return [2 /*return*/];
        });
    });
}
exports.default = routeAnswer;
;
//# sourceMappingURL=route-answer.js.map