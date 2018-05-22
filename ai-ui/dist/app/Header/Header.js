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
var React = require("react");
var Header = /** @class */ (function (_super) {
    __extends(Header, _super);
    function Header(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {};
        return _this;
    }
    Header.prototype.render = function () {
        // const home: IContextualMenuItem = {
        //   key: 'home',
        //   name: 'Home',
        //   subMenuProps: {
        //     items: [
        //       {
        //         key: 'emailMessage',
        //         name: 'Email message',
        //         icon: 'Mail',
        //         ['data-automation-id']: 'newEmailButton'
        //       },
        //       {
        //         key: 'calendarEvent',
        //         name: 'Calendar event',
        //         icon: 'Calendar',
        //         ['data-automation-id']: 'newCalendarButton'
        //       }
        //     ],
        //   },
        // };
        // const search: IContextualMenuItem = {
        //   key: 'home',
        //   name: 'Home',
        //   subMenuProps: {
        //     items: [
        //       {
        //         key: 'emailMessage',
        //         name: 'Email message',
        //         icon: 'Mail',
        //         ['data-automation-id']: 'newEmailButton'
        //       },
        //       {
        //         key: 'calendarEvent',
        //         name: 'Calendar event',
        //         icon: 'Calendar',
        //         ['data-automation-id']: 'newCalendarButton'
        //       }
        //     ],
        //   },
        // };
        //    const { items, overflowItems, farItems } = this.props;
        // const items: Array<IContextualMenuItem> = [
        //   home
        // ];
        // const settings = {
        //   isSearchBoxVisible: true, // searchBoxVisible,
        //   areIconsVisible: true, // iconsVisible,
        //   areNamesVisible: true, // namesVisible,
        //   areItemsEnabled: true, // itemsEnabled
        // };// = this.state;
        // const filteredItems = items.map((item: any) => assign({}, item, {
        //   iconOnly: !namesVisible,
        //   icon: iconsVisible ? item.icon : '',
        //   disabled: !itemsEnabled
        // }));
        // const filteredOverflowItems = overflowItems.map((item: any) => assign({}, item, {
        //   iconOnly: !namesVisible,
        //   icon: iconsVisible ? item.icon : '',
        //   disabled: !itemsEnabled
        // }));
        // const filteredFarItems = farItems.map((item: any) => assign({}, item, {
        //   iconOnly: !namesVisible,
        //   icon: iconsVisible ? item.icon : '',
        //   disabled: !itemsEnabled
        // }));
        return (React.createElement("div", null, "test"));
    };
    return Header;
}(React.Component));
exports.default = Header;
//# sourceMappingURL=Header.js.map