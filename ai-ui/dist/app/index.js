"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ReactDOM = require("react-dom");
var App_1 = require("./App/App");
require("./index.css");
// import registerServiceWorker from './registerServiceWorker';
// tslint:disable-next-line no-string-literal
var x = (window['__APP_INITIAL_STATE__'] || { initialQuestions: [] });
x.initialQuestions = x.initialQuestions || [];
function start() {
    ReactDOM.render(React.createElement(App_1.default, __assign({}, x)), document.getElementById('root'));
    // registerServiceWorker();
}
exports.start = start;
//# sourceMappingURL=index.js.map