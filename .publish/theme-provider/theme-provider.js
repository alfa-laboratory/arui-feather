'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp; /* This Source Code Form is subject to the terms of the Mozilla Public
                    * License, v. 2.0. If a copy of the MPL was not distributed with this
                    * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Компонент задающий тему для своих дочерних компонентов.
 * Важно! Может содержать в себе строго один дочерний компонент.
 *
 * @example
 * ```javascript
 * import ThemeProvider from 'arui-feather/theme-provider';
 * import Page from 'arui-feather/page';
 * import Heading from 'arui-feather/heading';
 *
 * <ThemeProvider theme="alfa-on-color">
 *    <Page>
 *       <Heading>Заголовок страницы</Heading>
 *       <div style={{ background: "white" }}>
 *           <ThemeProvider theme="alfa-on-white">
 *               Врезка белого цвета на странице...
 *           </ThemeProvider>
 *       </div>
 *    </Page>
 * </ThemeProvider>
 * ```
 */
var ThemeProvider = (_temp = _class = function (_React$Component) {
    _inherits(ThemeProvider, _React$Component);

    function ThemeProvider() {
        _classCallCheck(this, ThemeProvider);

        return _possibleConstructorReturn(this, (ThemeProvider.__proto__ || Object.getPrototypeOf(ThemeProvider)).apply(this, arguments));
    }

    _createClass(ThemeProvider, [{
        key: 'getChildContext',
        value: function getChildContext() {
            return {
                theme: this.props.theme
            };
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.Children.only(this.props.children);
        }
    }]);

    return ThemeProvider;
}(_react2.default.Component), _class.propTypes = {
    /** Дочерний элемент `ThemeProvider` */
    children: _propTypes2.default.node,
    /** Дополнительный класс */
    className: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.string]),
    /** Тема компонента */
    theme: _propTypes2.default.oneOf(['alfa-on-color', 'alfa-on-colored', 'alfa-on-white'])
}, _class.contextTypes = {
    theme: _propTypes2.default.string
}, _class.childContextTypes = {
    theme: _propTypes2.default.string
}, _temp);
exports.default = ThemeProvider;
//# sourceMappingURL=theme-provider.js.map
