'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _dec2, _class, _class2, _temp2; /* This Source Code Form is subject to the terms of the Mozilla Public
                                           * License, v. 2.0. If a copy of the MPL was not distributed with this
                                           * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

var _reactAddonsCreateFragment = require('react-addons-create-fragment');

var _reactAddonsCreateFragment2 = _interopRequireDefault(_reactAddonsCreateFragment);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _cn = require('../cn');

var _cn2 = _interopRequireDefault(_cn);

var _performance = require('../performance');

var _performance2 = _interopRequireDefault(_performance);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Компонент группы полей для текстового ввода.
 */
var InputGroup = (_dec = (0, _cn2.default)('input-group'), _dec2 = (0, _performance2.default)(), _dec(_class = _dec2(_class = (_temp2 = _class2 = function (_React$Component) {
    _inherits(InputGroup, _React$Component);

    function InputGroup() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, InputGroup);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = InputGroup.__proto__ || Object.getPrototypeOf(InputGroup)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
            focused: false
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(InputGroup, [{
        key: 'render',
        value: function render(cn) {
            var _this2 = this;

            var children = null;
            var inputGroupParts = {};

            if (this.props.children) {
                children = this.props.children.length ? this.props.children : [this.props.children];
            }

            if (children) {
                _react2.default.Children.forEach(children, function (input, index) {
                    input = _react2.default.cloneElement(input, {
                        width: _this2.props.width
                    });

                    inputGroupParts['input-' + index] = _react2.default.createElement(
                        'span',
                        {
                            className: cn('input-case', {
                                invalid: !!input.props.error,
                                disabled: input.props.disabled
                            })
                        },
                        input
                    );
                });
            }

            return _react2.default.createElement(
                'span',
                {
                    className: cn({ width: this.props.width }) + ' control-group',
                    role: 'group',
                    tabIndex: '-1'
                },
                (0, _reactAddonsCreateFragment2.default)(inputGroupParts)
            );
        }
    }]);

    return InputGroup;
}(_react2.default.Component), _class2.propTypes = {
    /** Управление возможностью компонента занимать всю ширину родителя */
    width: _propTypes2.default.oneOf(['default', 'available']),
    /** Дочерние элементы `InputGroup`, как правило, компоненты `Input` */
    children: _propTypes2.default.oneOfType([_propTypes2.default.arrayOf(_propTypes2.default.node), _propTypes2.default.node]),
    /** Тема компонента */
    theme: _propTypes2.default.oneOf(['alfa-on-color', 'alfa-on-white']),
    /** Дополнительный класс */
    className: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.string])
}, _temp2)) || _class) || _class);
exports.default = InputGroup;
//# sourceMappingURL=input-group.js.map
