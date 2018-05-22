"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var renderer = require("react-test-renderer");
var App_1 = require("./App");
describe('<App />', function () {
    it('renders', function () {
        var component = renderer.create(React.createElement(App_1.default, { initialQuestions: [] }));
        var tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});
//# sourceMappingURL=App.test.js.map