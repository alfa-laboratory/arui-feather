'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _bezierEasing = require('bezier-easing');

var _bezierEasing2 = _interopRequireDefault(_bezierEasing);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    easeInSine: (0, _bezierEasing2.default)(0.47, 0, 0.745, 0.715),
    easeOutSine: (0, _bezierEasing2.default)(0.39, 0.575, 0.565, 1),
    easeInOutSine: (0, _bezierEasing2.default)(0.445, 0.05, 0.55, 0.95),
    easeInQuad: (0, _bezierEasing2.default)(0.55, 0.085, 0.68, 0.53),
    easeOutQuad: (0, _bezierEasing2.default)(0.25, 0.46, 0.45, 0.94),
    easeInOutQuad: (0, _bezierEasing2.default)(0.455, 0.03, 0.515, 0.955),
    easeInCubic: (0, _bezierEasing2.default)(0.55, 0.055, 0.675, 0.19),
    easeOutCubic: (0, _bezierEasing2.default)(0.215, 0.61, 0.355, 1),
    easeInOutCubic: (0, _bezierEasing2.default)(0.645, 0.045, 0.355, 1),
    easeInQuart: (0, _bezierEasing2.default)(0.895, 0.03, 0.685, 0.22),
    easeOutQuart: (0, _bezierEasing2.default)(0.165, 0.84, 0.44, 1),
    easeInOutQuart: (0, _bezierEasing2.default)(0.77, 0, 0.175, 1),
    easeInQuint: (0, _bezierEasing2.default)(0.755, 0.05, 0.855, 0.06),
    easeOutQuint: (0, _bezierEasing2.default)(0.23, 1, 0.32, 1),
    easeInOutQuint: (0, _bezierEasing2.default)(0.86, 0, 0.07, 1),
    easeInExpo: (0, _bezierEasing2.default)(0.95, 0.05, 0.795, 0.035),
    easeOutExpo: (0, _bezierEasing2.default)(0.19, 1, 0.22, 1),
    easeInOutExpo: (0, _bezierEasing2.default)(1, 0, 0, 1),
    easeInCirc: (0, _bezierEasing2.default)(0.6, 0.04, 0.98, 0.335),
    easeOutCirc: (0, _bezierEasing2.default)(0.075, 0.82, 0.165, 1),
    easeInOutCirc: (0, _bezierEasing2.default)(0.785, 0.135, 0.15, 0.86),
    easeInBack: (0, _bezierEasing2.default)(0.6, -0.28, 0.735, 0.045),
    easeOutBack: (0, _bezierEasing2.default)(0.175, 0.885, 0.32, 1.275),
    easeInOutBack: (0, _bezierEasing2.default)(0.68, -0.55, 0.265, 1.55)
}; /* This Source Code Form is subject to the terms of the Mozilla Public
    * License, v. 2.0. If a copy of the MPL was not distributed with this
    * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
//# sourceMappingURL=easings.js.map
