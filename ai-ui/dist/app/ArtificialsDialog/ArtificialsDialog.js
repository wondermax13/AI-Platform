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
var Panel_1 = require("office-ui-fabric-react/lib/Panel");
// import { app as appCss, section as sectionCss, column as columnCss } from './App.scss';
var React = require("react");
var ArtificialDialog = /** @class */ (function (_super) {
    __extends(ArtificialDialog, _super);
    function ArtificialDialog(props) {
        var _this = _super.call(this, props) || this;
        if (!props.doneAction || !props.createArtificialAction) {
            throw new Error('channels, individuals, doneAction and channels are required');
        }
        _this.state = {
            artificials: []
        };
        _this.reset = _this.reset.bind(_this);
        _this.dismiss = _this.dismiss.bind(_this);
        _this.resetDismiss = _this.resetDismiss.bind(_this);
        _this.createArtificialFromInputs = _this.createArtificialFromInputs.bind(_this);
        _this.finishCreateArtificial = _this.finishCreateArtificial.bind(_this);
        _this.finish = _this.finish.bind(_this);
        _this.onQuestionChanged = _this.onQuestionChanged.bind(_this);
        _this.renderFooter = _this.renderFooter.bind(_this);
        return _this;
    }
    ArtificialDialog.prototype.reset = function () {
        this.setState({});
    };
    ArtificialDialog.prototype.dismiss = function () {
        this.finish();
    };
    ArtificialDialog.prototype.resetDismiss = function () {
        this.reset();
        this.dismiss();
    };
    ArtificialDialog.prototype.createArtificialFromInputs = function () {
        return this.finishCreateArtificial();
    };
    ArtificialDialog.prototype.finishCreateArtificial = function () {
        return __awaiter(this, void 0, void 0, function () {
            var artificial;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.props.createArtificialAction()];
                    case 1:
                        artificial = _a.sent();
                        this.reset();
                        this.finish(artificial);
                        return [2 /*return*/, artificial];
                }
            });
        });
    };
    ArtificialDialog.prototype.finish = function (artificial) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.props.doneAction(artificial);
                return [2 /*return*/];
            });
        });
    };
    ArtificialDialog.prototype.renderFooter = function () {
        var margin = { margin: '5px' };
        return (React.createElement("div", { className: "ms-textAlignCenter" },
            React.createElement(Button_1.DefaultButton, { onClick: this.dismiss, style: margin }, "Cancel"),
            React.createElement(Button_1.DefaultButton, { onClick: this.reset, style: margin }, "Reset"),
            React.createElement(Button_1.PrimaryButton, { onClick: this.createArtificialFromInputs, style: margin }, "Submit")));
    };
    ArtificialDialog.prototype.onQuestionChanged = function ( /*newValue: string*/) {
        this.setState({});
    };
    ArtificialDialog.prototype.render = function () {
        return (React.createElement(Panel_1.Panel, { headerText: "Artificials", isBlocking: true, isFooterAtBottom: true, isHiddenOnDismiss: false, isLightDismiss: true, isOpen: this.props.open, onDismiss: this.dismiss, onLightDismissClick: this.dismiss, onRenderFooterContent: this.renderFooter, type: Panel_1.PanelType.medium }, "TODO"));
    };
    // public createOptions(items: Array<string>, category: string, defaultChannel?: string): Array<ITargetOption> {
    //   return items.map((value: string) => this.createOption(value, category, value === defaultChannel));
    // }
    // public createOption(value: string, category: string, selected?: boolean): ITargetOption {
    //   const option: ITargetOption = { key: value, text: value, category, onChangedHandler: null, selected };
    //   option.onChangedHandler = this.getOnChangeHandler(option);
    //   return option;
    // }
    ArtificialDialog.prototype.getOnChangeHandler = function (option) {
        var _this = this;
        if (!this.onChangeHandlers) {
            this.onChangeHandlers = {};
        }
        var handler = this.onChangeHandlers[option.key];
        if (!handler) {
            handler = function (_a /*, isChecked: boolean*/) {
                // const options = option.category === 'Channel' ? this.state.channelOptions : this.state.individualOptions;
                // const current = this.getOption(option.key, options);
                // if (current) {
                //   current.selected = isChecked;
                // }
                _this.setState({});
            };
        }
        return handler;
    };
    return ArtificialDialog;
}(React.Component));
exports.default = ArtificialDialog;
//# sourceMappingURL=ArtificialsDialog.js.map