'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _dec2, _class, _class2, _temp; /* This Source Code Form is subject to the terms of the Mozilla Public
                                          * License, v. 2.0. If a copy of the MPL was not distributed with this
                                          * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _input = require('../input/input');

var _input2 = _interopRequireDefault(_input);

var _cn = require('../cn');

var _cn2 = _interopRequireDefault(_cn);

var _performance = require('../performance');

var _performance2 = _interopRequireDefault(_performance);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Компонент поля ввода почты
 * @extends Input
 */
var EmailInput = (_dec = (0, _cn2.default)('email-input', _input2.default), _dec2 = (0, _performance2.default)(), _dec(_class = _dec2(_class = (_temp = _class2 = function (_React$Component) {
    _inherits(EmailInput, _React$Component);

    function EmailInput() {
        _classCallCheck(this, EmailInput);

        return _possibleConstructorReturn(this, (EmailInput.__proto__ || Object.getPrototypeOf(EmailInput)).apply(this, arguments));
    }

    _createClass(EmailInput, [{
        key: 'render',
        value: function render(cn, Input) {
            var _this2 = this;

            return _react2.default.createElement(Input, _extends({}, this.props, {
                type: 'email',
                ref: function ref(root) {
                    _this2.root = root;
                },
                noValidate: true,
                className: cn
            }));
        }

        /**
         * Устанавливает фокус на поле ввода.
         *
         * @public
         */

        /**
         * @type {Input}
         */

    }, {
        key: 'focus',
        value: function focus() {
            this.root.focus();
        }

        /**
         * Убирает фокус с поля ввода.
         *
         * @public
         */

    }, {
        key: 'blur',
        value: function blur() {
            this.root.blur();
        }

        /**
         * Скроллит страницу до поля ввода.
         *
         * @public
         */

    }, {
        key: 'scrollTo',
        value: function scrollTo() {
            this.root.scrollTo();
        }
    }]);

    return EmailInput;
}(_react2.default.Component), _class2.propTypes = _extends({}, _input2.default.propTypes), _temp)) || _class) || _class);
exports.default = EmailInput;
//# sourceMappingURL=email-input.js.map
