'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _dec2, _class, _class2, _temp; /* This Source Code Form is subject to the terms of the Mozilla Public
                                          * License, v. 2.0. If a copy of the MPL was not distributed with this
                                          * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _cn = require('../../cn');

var _cn2 = _interopRequireDefault(_cn);

var _performance = require('../../performance');

var _performance2 = _interopRequireDefault(_performance);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Компонент навигации в виде табов. Как правило используется совместно с `TabItem`.
 */
var Tabs = (_dec = (0, _cn2.default)('tabs'), _dec2 = (0, _performance2.default)(), _dec(_class = _dec2(_class = (_temp = _class2 = function (_React$Component) {
    _inherits(Tabs, _React$Component);

    function Tabs() {
        _classCallCheck(this, Tabs);

        return _possibleConstructorReturn(this, (Tabs.__proto__ || Object.getPrototypeOf(Tabs)).apply(this, arguments));
    }

    _createClass(Tabs, [{
        key: 'render',
        value: function render(cn) {
            return _react2.default.createElement(
                'div',
                { className: cn({ scrollable: this.props.scrollable }) },
                _react2.default.createElement(
                    'div',
                    { className: cn('panel') },
                    _react2.default.createElement(
                        'div',
                        { className: cn('content') },
                        this.props.children
                    )
                )
            );
        }
    }]);

    return Tabs;
}(_react2.default.Component), _class2.propTypes = {
    /** Управление возможность скроллить компонент по-горизонтали */
    scrollable: _propTypes2.default.bool,
    /** Дочерние компоненты */
    children: _propTypes2.default.node,
    /** Тема компонента */
    theme: _propTypes2.default.oneOf(['alfa-on-color', 'alfa-on-white']),
    /** Дополнительный класс */
    className: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.string])
}, _class2.defaultProps = {
    scrollable: true
}, _temp)) || _class) || _class);
exports.default = Tabs;
//# sourceMappingURL=tabs.js.map
