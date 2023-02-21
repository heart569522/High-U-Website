"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var react_1 = require("react");
var aos_1 = require("aos");
require("aos/dist/aos.css");
require("../styles/globals.css");
require("../styles/lodingStyle.css");
require("../styles/globals_admin.css");
require("@tremor/react/dist/esm/tremor.css");
require("../pages/test/dist/hexagon_style.css");
function App(_a) {
    var Component = _a.Component, pageProps = _a.pageProps;
    react_1.useEffect(function () {
        aos_1["default"].init({
            duration: 1250
        }),
            aos_1["default"].refresh();
    }, []);
    return (React.createElement(React.Fragment, null,
        React.createElement(Component, __assign({}, pageProps)),
        React.createElement("title", null, "High U Hair Wigs"),
        React.createElement("meta", { content: "width=device-width, initial-scale=1", name: "viewport" }),
        React.createElement("link", { rel: "icon", href: "/favicon.ico" })));
}
exports["default"] = App;
