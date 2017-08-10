'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _dec2, _class, _desc, _value, _class2, _class3, _temp2; /* This Source Code Form is subject to the terms of the Mozilla Public
                                                                   * License, v. 2.0. If a copy of the MPL was not distributed with this
                                                                   * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

var _coreDecorators = require('core-decorators');

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

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
        desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
        desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
        return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
        desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
        desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
        Object['define' + 'Property'](target, property, desc);
        desc = null;
    }

    return desc;
}

/**
 * Компонент группы радио-кнопок.
 */
var RadioGroup = (_dec = (0, _cn2.default)('radio-group'), _dec2 = (0, _performance2.default)(), _dec(_class = _dec2(_class = (_class2 = (_temp2 = _class3 = function (_React$Component) {
    _inherits(RadioGroup, _React$Component);

    function RadioGroup() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, RadioGroup);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = RadioGroup.__proto__ || Object.getPrototypeOf(RadioGroup)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
            value: '',
            focused: false
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(RadioGroup, [{
        key: 'render',
        value: function render(cn) {
            var _this2 = this;

            var children = null;
            var props = { name: this.props.name };
            var radioGroupParts = {};

            if (this.props.disabled !== undefined) {
                props.disabled = this.props.disabled;
            }

            if (this.props.children) {
                children = this.props.children.length ? this.props.children : [this.props.children];
            }

            if (this.props.type === 'button') {
                props = _extends({}, props, { width: this.props.width });
            }

            if (children) {
                this.radios = [];

                var value = this.props.value !== undefined ? this.props.value : this.state.value;

                _react2.default.Children.forEach(children, function (radio, index) {
                    radioGroupParts['radio-' + index] = _react2.default.cloneElement(radio, _extends({
                        ref: function ref(radio) {
                            return _this2.radios.push(radio);
                        },
                        error: radio.props.error !== undefined ? radio.props.error : Boolean(_this2.props.error),
                        checked: radio.props.checked !== undefined ? radio.props.checked : value === radio.props.value,
                        onChange: radio.props.onChange !== undefined ? radio.props.onChange : _this2.handleRadioChange
                    }, props));
                });
            }
            return _react2.default.createElement(
                'span',
                {
                    className: cn(_extends({
                        type: this.props.type,
                        invalid: !!this.props.error
                    }, props)) + ' control-group' + (this.props.error ? ' control-group_invalid' : ''),
                    role: 'group',
                    tabIndex: '-1',
                    onFocus: this.handleFocus,
                    onBlur: this.handleBlur
                },
                !!this.props.label && _react2.default.createElement(
                    'div',
                    { className: cn('label') },
                    this.props.label
                ),
                (0, _reactAddonsCreateFragment2.default)(radioGroupParts),
                this.props.error && _react2.default.createElement(
                    'span',
                    { className: cn('sub') },
                    this.props.error
                )
            );
        }
    }, {
        key: 'handleRadioChange',
        value: function handleRadioChange(value) {
            if (this.state.value !== value) {
                this.setState({ value: value });
            }

            if (this.props.value !== value && this.props.onChange) {
                this.props.onChange(value);
            }
        }
    }, {
        key: 'handleFocus',
        value: function handleFocus(event) {
            this.setState({ focused: true });

            if (this.props.onFocus) {
                this.props.onFocus(event);
            }
        }
    }, {
        key: 'handleBlur',
        value: function handleBlur(event) {
            this.setState({ focused: false });

            if (this.props.onBlur) {
                this.props.onBlur(event);
            }
        }

        /**
         * Устанавливает фокус на первую радиокнопку в группе.
         *
         * @public
         */

    }, {
        key: 'focus',
        value: function focus() {
            if (this.radios && this.radios[0]) {
                this.radios[0].focus();
            }
        }

        /**
         * Убирает фокус с группы радио-кнопок.
         *
         * @public
         */

    }, {
        key: 'blur',
        value: function blur() {
            if (document.activeElement) {
                document.activeElement.blur();
            }
        }
    }]);

    return RadioGroup;
}(_react2.default.Component), _class3.propTypes = {
    /** Тип группы кнопок */
    type: _propTypes2.default.oneOf(['normal', 'button', 'line']),
    /** Значение выбранной радио-кнопки */
    value: _propTypes2.default.string,
    /** Отображение попапа с ошибкой в момент когда фокус находится на компоненте */
    error: _propTypes2.default.node,
    /** Управление шириной группы кнопок для типа 'button'. При значении 'available' растягивает группу на ширину родителя */
    width: _propTypes2.default.oneOf(['default', 'available']),
    /** Уникальное имя блока */
    name: _propTypes2.default.string,
    /** Управление возможностью изменения состояния 'checked' дочерних компонентов `Radio` */
    disabled: _propTypes2.default.bool,
    /** Дочерние элементы `RadioGroup`, как правило, компоненты `Radio` */
    children: _propTypes2.default.oneOfType([_propTypes2.default.arrayOf(_propTypes2.default.node), _propTypes2.default.node]),
    /** Тема компонента */
    theme: _propTypes2.default.oneOf(['alfa-on-color', 'alfa-on-white']),
    /** Дополнительный класс */
    className: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.string]),
    /** Лейбл для группы */
    label: _propTypes2.default.node,
    /** Обработчик фокуса радиогруппы */
    onFocus: _propTypes2.default.func,
    /** Обработчик снятия фокуса с радиогруппы */
    onBlur: _propTypes2.default.func,
    /** Обработчик изменения значения 'checked' одного из дочерних радио-кнопок */
    onChange: _propTypes2.default.func
}, _class3.defaultProps = {
    type: 'normal'
}, _temp2), (_applyDecoratedDescriptor(_class2.prototype, 'handleRadioChange', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class2.prototype, 'handleRadioChange'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'handleFocus', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class2.prototype, 'handleFocus'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'handleBlur', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class2.prototype, 'handleBlur'), _class2.prototype)), _class2)) || _class) || _class);
exports.default = RadioGroup;
//# sourceMappingURL=radio-group.js.map
