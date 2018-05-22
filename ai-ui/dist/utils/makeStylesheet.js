"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jss_1 = require("jss");
var jss_preset_default_1 = require("jss-preset-default");
jss_1.default.setup(jss_preset_default_1.default());
function default_1(stylesWithClasses, options) {
    var stylesheet = jss_1.default.createStyleSheet(stylesWithClasses).attach();
    return stylesheet;
}
exports.default = default_1;
//# sourceMappingURL=makeStylesheet.js.map