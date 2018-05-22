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
Object.defineProperty(exports, "__esModule", { value: true });
// import { app as appCss, section as sectionCss, column as columnCss } from './App.scss';
var office_ui_fabric_react_1 = require("office-ui-fabric-react");
var React = require("react");
var Feed = /** @class */ (function (_super) {
    __extends(Feed, _super);
    function Feed(props) {
        var _this = _super.call(this, props) || this;
        _this.getLocation = _this.getLocation.bind(_this);
        _this.onClickLocation = _this.onClickLocation.bind(_this);
        return _this;
    }
    Feed.prototype.getLocation = function (question) {
        // return question.to.reduce((acc: string, nex: { type: string, value: string }) => acc + (acc.length > 0 ? ', ' : '') + nex.value, '');
        return question.channels.reduce(function (acc, nex) { return acc + (acc.length > 0 ? ', ' : '') + nex; }, '');
    };
    Feed.prototype.onClickLocation = function () {
        console.log(arguments);
    };
    Feed.prototype.render = function () {
        var _this = this;
        var image1 = 'https://static2.sharepointonline.com/files/fabric/office-ui-fabric-react-assets/persona-female.png';
        return this.props.questions.map(function (item, index) {
            return (React.createElement(office_ui_fabric_react_1.DocumentCard, { key: index, type: office_ui_fabric_react_1.DocumentCardType.normal },
                React.createElement("div", { className: "ms-DocumentCard-details" },
                    React.createElement(office_ui_fabric_react_1.DocumentCardLocation, { location: _this.getLocation(item), ariaLabel: _this.getLocation(item), onClick: _this.onClickLocation }),
                    React.createElement(office_ui_fabric_react_1.DocumentCardTitle, { title: item.question, shouldTruncate: false }),
                    React.createElement(office_ui_fabric_react_1.DocumentCardActions, { actions: [
                            {
                                ariaLabel: 'share action',
                                iconProps: { iconName: 'Share' },
                            },
                            {
                                ariaLabel: 'pin action',
                                iconProps: { iconName: 'Pin' },
                            },
                            {
                                ariaLabel: 'ringer action',
                                iconProps: { iconName: 'Ringer' },
                            },
                        ], views: 432 }),
                    React.createElement(office_ui_fabric_react_1.DocumentCardActivity, { activity: "Submitted a few minutes ago", people: [
                            {
                                name: 'Kat Larrson',
                                profileImageSrc: image1
                            }
                        ] }))));
        });
    };
    return Feed;
}(React.Component));
exports.default = Feed;
//# sourceMappingURL=Feed.js.map