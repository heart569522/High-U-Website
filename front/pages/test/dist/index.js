"use strict";
exports.__esModule = true;
var react_1 = require("react");
var animejs_1 = require("animejs");
var material_1 = require("@mui/material");
var Home = function () {
    var logoRef = react_1.useRef(null);
    var restartAnimation = function () {
        animejs_1["default"].remove(logoRef.current);
        var logoAnimation = animejs_1["default"].timeline({
            autoplay: true,
            delay: 200,
            loop: true
        });
        logoAnimation
            .add({
            targets: "#logo",
            translateY: [-100, 0],
            opacity: [0, 1],
            elasticity: 600,
            duration: 1600
        })
            .add({
            targets: "#logo-hexagon",
            rotate: [-90, 0],
            duration: 1200,
            elasticity: 600,
            offset: 100
        })
            .add({
            targets: "#logo-circle",
            scale: [0, 1],
            duration: 1200,
            elasticity: 600,
            offset: 500
        })
            .add({
            targets: "#logo-mask",
            scale: [0, 1],
            duration: 1000,
            elasticity: 600,
            offset: 550
        })
            .add({
            targets: "#logo-text",
            translateX: ["-100%", 0],
            opacity: [0, 1],
            duration: 1000,
            easing: "easeOutExpo",
            offset: 1000
        });
    };
    return (React.createElement(material_1.Box, { className: "bg-black h-screen w-screen" },
        React.createElement(material_1.Box, { className: "siteLogo flex items-center justify-center" },
            React.createElement(material_1.Box, { id: "logo", ref: logoRef },
                React.createElement("svg", { width: "100%", height: "100%", viewBox: "0 0 148 128" },
                    React.createElement("defs", null,
                        React.createElement("mask", { id: "circle-mask" },
                            React.createElement("rect", { fill: "white", width: "100%", height: "100%" }),
                            React.createElement("circle", { id: "logo-mask", fill: "black", cx: "120", cy: "96", r: "28" }))),
                    React.createElement("polygon", { id: "logo-hexagon", fill: "#00B4FF", points: "64 128 8.574 96 8.574 32 64 0 119.426 32 119.426 96", mask: "url(#circle-mask)" }),
                    React.createElement("circle", { id: "logo-circle", fill: "#3F3C3C", cx: "120", cy: "96", r: "20" }))),
            React.createElement(material_1.Box, { className: "siteTitle" },
                React.createElement(material_1.Box, { id: "logo-text", className: "siteTitleText", sx: { fontFamily: "Dosis" } },
                    "hexagon",
                    React.createElement("span", null, "circle")))),
        React.createElement("button", { className: "buttonRestart", onClick: restartAnimation }, "restart")));
};
exports["default"] = Home;
