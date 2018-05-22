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
var Checkbox_1 = require("office-ui-fabric-react/lib/Checkbox");
var Panel_1 = require("office-ui-fabric-react/lib/Panel");
var TextField_1 = require("office-ui-fabric-react/lib/TextField");
var React = require("react");
var QuestionDialog = /** @class */ (function (_super) {
    __extends(QuestionDialog, _super);
    function QuestionDialog(props) {
        var _this = _super.call(this, props) || this;
        _this.finish = function (question) {
            _this.props.doneAction(question);
        };
        if (!props.doneAction || !props.channels || !props.humans || !props.createQuestionAction) {
            throw new Error('channels, humans, doneAction and channels are required');
        }
        var humanOptions = _this.createOptions(props.humans, 'Human');
        var channelOptions = _this.createOptions(props.channels, 'Channel');
        _this.state = {
            channelOptions: channelOptions,
            humanOptions: humanOptions,
        };
        _this.reset = _this.reset.bind(_this);
        _this.dismiss = _this.dismiss.bind(_this);
        _this.resetDismiss = _this.resetDismiss.bind(_this);
        _this.createQuestionFromInputs = _this.createQuestionFromInputs.bind(_this);
        _this.onQuestionChanged = _this.onQuestionChanged.bind(_this);
        _this.renderFooter = _this.renderFooter.bind(_this);
        return _this;
    }
    QuestionDialog.prototype.reset = function () {
        this.setState({
            channelOptions: this.createOptions(this.props.channels, 'Channel'),
            humanOptions: this.createOptions(this.props.humans, 'human'),
            question: '',
        });
    };
    QuestionDialog.prototype.dismiss = function () {
        this.finish();
    };
    QuestionDialog.prototype.resetDismiss = function () {
        this.reset();
        this.dismiss();
    };
    QuestionDialog.prototype.createQuestionFromInputs = function () {
        var channels = this.state.channelOptions
            .filter(function (option) { return option.selected; })
            .map(function (selection) { return selection.key; });
        var humans = this.state.humanOptions
            .filter(function (option) { return option.selected; })
            .map(function (selection) { return selection.key; });
        return this.finishCreateQuestion(this.state.question, channels, humans);
    };
    QuestionDialog.prototype.finishCreateQuestion = function (questionText, channels, humans) {
        return __awaiter(this, void 0, void 0, function () {
            var question;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!questionText) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.props.createQuestionAction(questionText, channels)];
                    case 1:
                        question = _a.sent();
                        this.reset();
                        this.finish(question);
                        return [2 /*return*/, question];
                    case 2: return [2 /*return*/, undefined];
                }
            });
        });
    };
    QuestionDialog.prototype.renderFooter = function () {
        var margin = { margin: '5px' };
        return (React.createElement("div", { className: "ms-textAlignCenter" },
            React.createElement(Button_1.DefaultButton, { onClick: this.dismiss, style: margin }, "Cancel"),
            React.createElement(Button_1.DefaultButton, { onClick: this.reset, style: margin }, "Reset"),
            React.createElement(Button_1.PrimaryButton, { onClick: this.createQuestionFromInputs, style: margin }, "Submit")));
    };
    QuestionDialog.prototype.onQuestionChanged = function (newValue) {
        this.setState({
            question: newValue
        });
    };
    QuestionDialog.prototype.render = function () {
        return (React.createElement(Panel_1.Panel, { headerText: "Submit a question", isBlocking: true, isFooterAtBottom: true, isHiddenOnDismiss: false, isLightDismiss: true, isOpen: this.props.open, onDismiss: this.dismiss, onLightDismissClick: this.dismiss, onRenderFooterContent: this.renderFooter, type: Panel_1.PanelType.medium },
            React.createElement(TextField_1.TextField, { placeholder: "Write question here...", ariaLabel: "Write question here", multiline: true, rows: 4, onChanged: this.onQuestionChanged, required: true, autoFocus: true, value: this.state.question || '' }),
            this.renderFooter(),
            React.createElement("h2", null, "Channels"),
            React.createElement("div", { className: "ms-Grid" },
                React.createElement("div", { className: "ms-Grid-row" }, this.state.channelOptions.map(function (option, index) {
                    return React.createElement("div", { className: "ms-Grid-col ms-lg2", key: 'channel_' + index },
                        React.createElement(Checkbox_1.Checkbox, { key: option.category + "_" + option.key, label: option.text, value: option.key, checked: option.selected, onChange: option.onChangedHandler }));
                }))),
            React.createElement("h2", null, "Humans"),
            React.createElement("div", { className: "ms-Grid" },
                React.createElement("div", { className: "ms-Grid-row" }, this.state.humanOptions.map(function (option, index) {
                    return React.createElement("div", { key: 'human_' + index, className: "ms-Grid-col ms-lg2" },
                        React.createElement(Checkbox_1.Checkbox, { key: option.category + "_" + option.key, label: option.text, value: option.key, checked: option.selected, onChange: option.onChangedHandler }));
                })))));
    };
    QuestionDialog.prototype.createOptions = function (items, category) {
        var _this = this;
        return items.map(function (value) { return _this.createOption(value, category, value.default); });
    };
    QuestionDialog.prototype.createOption = function (value, category, selected) {
        var option = { key: value.name, text: value.name, category: category, selected: selected || false };
        option.onChangedHandler = this.getOnChangeHandler(option);
        return option;
    };
    QuestionDialog.prototype.getOnChangeHandler = function (option) {
        var _this = this;
        if (!this.onChangeHandlers) {
            this.onChangeHandlers = {};
        }
        var handler = this.onChangeHandlers[option.key];
        if (!handler) {
            handler = function (_a, isChecked) {
                var options = option.category === 'Channel' ? _this.state.channelOptions : _this.state.humanOptions;
                var current = _this.getOption(option.key, options);
                if (current) {
                    current.selected = isChecked;
                }
                _this.setState({
                    channelOptions: _this.state.channelOptions,
                    humanOptions: _this.state.humanOptions
                });
            };
        }
        return handler;
    };
    QuestionDialog.prototype.getOption = function (key, options) {
        return options.find(function (option) { return option.key === key; });
    };
    return QuestionDialog;
}(React.Component));
exports.default = QuestionDialog;
//# sourceMappingURL=QuestionDialog.js.map