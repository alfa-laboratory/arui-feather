'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.deprecated = deprecated;
exports.deprecatedType = deprecatedType;
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

function createChainableTypeChecker(validate) {
    function checkType(isRequired, props, propName, componentName, location) {
        componentName = componentName || '';
        if (props[propName] === null || props[propName] === undefined) {
            if (isRequired) {
                return new Error('Required prop `' + propName + '` was not specified in `' + componentName + '`.');
            }
            return null;
        }

        return validate(props, propName, componentName, location);
    }

    var chainedCheckType = checkType.bind(null, false);
    chainedCheckType.isRequired = checkType.bind(null, true);

    return chainedCheckType;
}

function propTypeIsHtmlElement(props, propName, componentName) {
    if (!(props[propName] instanceof (typeof HTMLElement === 'undefined' ? {} : HTMLElement))) {
        return new Error('Invalid prop `' + propName + '` supplied to `' + componentName + '`.\n            Expected valid HTMLElement object, ' + _typeof(props[propName]) + ' given.');
    }
    return null;
}

function deprecated(propType, message) {
    var warned = false;
    return function () {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        var props = args[0],
            propName = args[1],
            componentName = args[2];

        var prop = props[propName];
        if (prop !== undefined && prop !== null && !warned) {
            warned = true;
            if (process.env.NODE_ENV !== 'production') {
                // eslint-disable-next-line no-console
                console.warn('Property \'' + propName + '\' of \'' + componentName + '\' is deprecated. ' + message);
            }
        }
        return propType.call.apply(propType, [this].concat(args));
    };
}

function deprecatedType(oldType, newType, message) {
    var warned = false;

    return function () {
        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
        }

        var propName = args[1],
            componentName = args[2];

        var oldResult = oldType.call.apply(oldType, [this].concat(args));
        var newResult = newType.call.apply(newType, [this].concat(args));
        if (process.env.NODE_ENV !== 'production' && !oldResult && !warned && newResult) {
            warned = true;
            // eslint-disable-next-line no-console
            console.warn('Given type of \'' + propName + '\' of \'' + componentName + '\' is deprecated. ' + message);
        }
        return newResult;
    };
}

var HtmlElement = exports.HtmlElement = createChainableTypeChecker(propTypeIsHtmlElement);
//# sourceMappingURL=prop-types.js.map
