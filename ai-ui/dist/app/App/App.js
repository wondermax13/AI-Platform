"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
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
var Button_1 = require("office-ui-fabric-react/lib/Button");
var Fabric_1 = require("office-ui-fabric-react/lib/Fabric");
var Icons_1 = require("office-ui-fabric-react/lib/Icons");
var ProgressIndicator_1 = require("office-ui-fabric-react/lib/ProgressIndicator");
var ScrollablePane_1 = require("office-ui-fabric-react/lib/ScrollablePane");
var Sticky_1 = require("office-ui-fabric-react/lib/Sticky");
var React = require("react");
// import makeStylesheet from '../../utils/makeStylesheet';
var ArtificialsDialog_1 = require("../ArtificialsDialog");
var Feed_1 = require("../Feed/Feed");
var HumansDialog_1 = require("../HumansDialog");
var ai_v1_1 = require("../providers/ai-v1");
var settings_1 = require("../providers/settings");
var QuestionDialog_1 = require("../QuestionDialog");
var react_jss_1 = require("react-jss");
var styles = {
    tall: {
        height: '100%',
        position: 'relative',
    }
};
Icons_1.initializeIcons( /* optional base url */);
var App = /** @class */ (function (_super) {
    __extends(App, _super);
    function App(props) {
        var _this = _super.call(this, props) || this;
        _this.StyleableComponent = function (stylesheet, children) {
            var defaultChannel = _this.findDefault(_this.state.channels);
            return (React.createElement(Fabric_1.Fabric, { className: stylesheet.classes.tall },
                React.createElement(ScrollablePane_1.ScrollablePane, { className: stylesheet.classes.tall },
                    _this.state.mounted &&
                        React.createElement(Sticky_1.Sticky, { stickyPosition: Sticky_1.StickyPositionType.Both },
                            React.createElement("div", { className: "ms-Grid" },
                                React.createElement("div", { className: "ms-Grid-row" },
                                    React.createElement("div", { className: "ms-Grid-col ms-lg6 ms-lgOffset3 ms-md8 ms-mdOffset2 ms-sm12" },
                                        React.createElement(Button_1.PrimaryButton, { style: { width: '50%' }, onClick: _this.openNewQuestionDialog }, "Ask a Question"),
                                        React.createElement(Button_1.DefaultButton, { style: { width: '25%' }, onClick: _this.openArtificialsDialog }, "Artificials"),
                                        React.createElement(Button_1.DefaultButton, { style: { width: '25%' }, onClick: _this.openHumansDialog }, "Humans"))))),
                    React.createElement("div", { className: "ms-Grid" },
                        React.createElement("div", { className: "ms-Grid-row" },
                            React.createElement("div", { className: "ms-Grid-col ms-lg6 ms-lgOffset3 ms-md8 ms-mdOffset2 ms-sm12 feed" },
                                React.createElement(Feed_1.default, __assign({}, _this.state)))))),
                _this.state.newQuestionDialogIsOpen && React.createElement(ProgressIndicator_1.ProgressIndicator, null),
                React.createElement(QuestionDialog_1.QuestionDialog, { open: _this.state.newQuestionDialogIsOpen && !_this.state.artificialsDialogIsOpen && !_this.state.humansDialogIsOpen, channels: _this.state.channels, defaultChannel: defaultChannel, humans: _this.state.humans, createQuestionAction: _this.createQuestion, doneAction: _this.closeNewQuestionDialog }),
                React.createElement(HumansDialog_1.HumansDialog, { open: _this.state.humansDialogIsOpen && !_this.state.artificialsDialogIsOpen && !_this.state.newQuestionDialogIsOpen, createHumanAction: _this.createHuman, doneAction: _this.closeHumansDialog }),
                React.createElement(ArtificialsDialog_1.ArtificialsDialog, { open: _this.state.artificialsDialogIsOpen && !_this.state.humansDialogIsOpen && !_this.state.newQuestionDialogIsOpen, createArtificialAction: _this.createArtificial, doneAction: _this.closeArtificialsDialog })));
        };
        var questions = props.initialQuestions || [];
        _this.state = {
            ai: settings_1.default.ai,
            artificialsDialogIsOpen: false,
            channels: settings_1.default.channels,
            humans: settings_1.default.humans,
            humansDialogIsOpen: false,
            newQuestionDialogIsOpen: false,
            questions: questions,
            userId: '5aae56b8f36d284c92150e9f',
        };
        _this.openArtificialsDialog = _this.openArtificialsDialog.bind(_this);
        _this.onClickLocation = _this.onClickLocation.bind(_this);
        _this.getLocation = _this.getLocation.bind(_this);
        _this.openHumansDialog = _this.openHumansDialog.bind(_this);
        _this.openNewQuestionDialog = _this.openNewQuestionDialog.bind(_this);
        _this.closeNewQuestionDialog = _this.closeNewQuestionDialog.bind(_this);
        _this.closeHumansDialog = _this.closeHumansDialog.bind(_this);
        _this.closeArtificialsDialog = _this.closeArtificialsDialog.bind(_this);
        _this.updateFeed = _this.updateFeed.bind(_this);
        _this.createQuestion = _this.createQuestion.bind(_this);
        _this.createArtificial = _this.createArtificial.bind(_this);
        _this.findDefault = _this.findDefault.bind(_this);
        return _this;
    }
    App.prototype.componentDidMount = function () {
        this.setState({ mounted: true });
        this.updateFeed();
    };
    App.prototype.openNewQuestionDialog = function () {
        this.setState({ newQuestionDialogIsOpen: true });
    };
    App.prototype.openHumansDialog = function () {
        this.setState({ humansDialogIsOpen: true });
    };
    App.prototype.openArtificialsDialog = function () {
        this.setState({ artificialsDialogIsOpen: true });
    };
    App.prototype.closeNewQuestionDialog = function (newQuestion) {
        this.setState({
            newQuestionDialogIsOpen: false,
            recentlyAddedQuestion: newQuestion
        });
    };
    App.prototype.closeHumansDialog = function (human) {
        this.setState({
            humansDialogIsOpen: false,
            recentlyAddedHuman: human
        });
    };
    App.prototype.closeArtificialsDialog = function (artificial) {
        this.setState({
            artificialsDialogIsOpen: false,
            recentlyAddedArtificial: artificial
        });
    };
    App.prototype.updateFeed = function () {
        return __awaiter(this, void 0, void 0, function () {
            var questions;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, ai_v1_1.default.getFeed()];
                    case 1:
                        questions = _a.sent();
                        this.setState({ questions: questions });
                        return [2 /*return*/];
                }
            });
        });
    };
    App.prototype.createQuestion = function (question, channels, individuals) {
        return __awaiter(this, void 0, void 0, function () {
            var newQuestion, ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        newQuestion = {
                            // from: {
                            //   type: 'user',
                            //   value: this.state.userId
                            // },
                            channels: (channels || []).concat((individuals || [])),
                            // channels: [ ...channels, ...individuals ].map(c => c), // .map((channel: string) => {
                            // return {
                            //   type: 'channel',
                            //   value: channel
                            // };
                            question: question,
                        };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 5, , 6]);
                        if (!newQuestion.question) return [3 /*break*/, 4];
                        return [4 /*yield*/, ai_v1_1.default.postQuestion(newQuestion.question, newQuestion.channels)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.updateFeed()];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        ex_1 = _a.sent();
                        console.error('There was an error. Try again! ' + (ex_1.message || ex_1));
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/, undefined];
                }
            });
        });
    };
    App.prototype.createArtificial = function () {
        return __awaiter(this, void 0, void 0, function () {
            var newArtificial;
            return __generator(this, function (_a) {
                newArtificial = {
                    name: 'new artificial'
                };
                // const newArtificialsState = [newArtificial].concat(this.state.questions);
                // this.setState({ questions: newQuestionsState });
                return [2 /*return*/, newArtificial];
            });
        });
    };
    App.prototype.createHuman = function () {
        return __awaiter(this, void 0, void 0, function () {
            var newHuman;
            return __generator(this, function (_a) {
                newHuman = {
                    name: 'new human',
                };
                // const newHumansState = [newHuman].concat(this.state.questions);
                // this.setState({ questions: newQuestionsState });
                return [2 /*return*/, newHuman];
            });
        });
    };
    App.prototype.getLocation = function (question) {
        return question.channels.reduce(function (acc, nex) {
            return acc + (acc.length > 0 ? ', ' : '') + nex;
        }, '');
    };
    App.prototype.onClickLocation = function () {
        console.debug('onClickLocation', arguments);
    };
    App.prototype.findDefault = function (items) {
        var channel = items
            .find(function (c) { return (c.default || false); });
        return channel && channel.name || undefined;
    };
    App.prototype.render = function () {
        var StyledComp = react_jss_1.default(styles)(this.StyleableComponent);
        return (React.createElement(StyledComp, null));
    };
    return App;
}(React.Component));
exports.default = App;
//# sourceMappingURL=App.js.map