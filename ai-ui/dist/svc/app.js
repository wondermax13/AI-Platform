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
var load_themed_styles_1 = require("@microsoft/load-themed-styles");
// const sheets = new SheetsRegistry()
// Store registered styles in a variable used later for injection.
var allStyles = '';
// Push styles into variables for injecting later.
load_themed_styles_1.configureLoadStyles(function (styles) {
    allStyles += styles;
});
// import * as React from 'react';
// import { renderToString } from 'react-dom/server';
// import { App } from '../app/App';
var template_1 = require("./template");
var path = require("path");
var Express = require("express");
var manifest_1 = require("./manifest");
var route_feed_1 = require("./route/route-feed");
var statics = path.resolve(__dirname, './../../client/static');
var build = path.resolve(__dirname, './../../client');
var manifestFile = path.resolve(build, 'asset-manifest.json');
function app(server) {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            server.use('/static', Express.static(statics));
            server.get('/', function (request, response) { return __awaiter(_this, void 0, void 0, function () {
                var manifest, _a, _b, feed, initialState, mainJs, mainCss, templateProps, d, ex_1;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            _c.trys.push([0, 4, , 5]);
                            _b = (_a = JSON).parse;
                            return [4 /*yield*/, manifest_1.default(manifestFile)];
                        case 1:
                            manifest = _b.apply(_a, [_c.sent()]);
                            return [4 /*yield*/, route_feed_1.getFeed('#main')];
                        case 2:
                            feed = _c.sent();
                            initialState = {
                                initialQuestions: feed,
                                server: false
                            };
                            mainJs = manifest["main.js"];
                            mainCss = manifest["main.css"];
                            templateProps = {
                                body: 'Connecting to AI...',
                                initialState: JSON.stringify(initialState),
                                mainCss: mainCss,
                                mainJs: mainJs,
                                styles: allStyles,
                                title: 'AI-2-AI',
                            };
                            return [4 /*yield*/, template_1.template(templateProps)];
                        case 3:
                            d = _c.sent();
                            response.send(d);
                            return [3 /*break*/, 5];
                        case 4:
                            ex_1 = _c.sent();
                            response.send({ error: ex_1.message || JSON.stringify(ex_1), note: "reload in a few..." });
                            return [3 /*break*/, 5];
                        case 5: return [2 /*return*/];
                    }
                });
            }); });
            return [2 /*return*/];
        });
    });
}
exports.app = app;
//# sourceMappingURL=app.js.map