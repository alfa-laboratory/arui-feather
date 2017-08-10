'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _dec2, _class, _desc, _value, _class2, _class3, _temp2; /* This Source Code Form is subject to the terms of the Mozilla Public
                                                                   * License, v. 2.0. If a copy of the MPL was not distributed with this
                                                                   * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

var _coreDecorators = require('core-decorators');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _button = require('../button/button');

var _button2 = _interopRequireDefault(_button);

var _cn = require('../cn');

var _cn2 = _interopRequireDefault(_cn);

var _performance = require('../performance');

var _performance2 = _interopRequireDefault(_performance);

var _scrollTo2 = require('../lib/scroll-to');

var _scrollTo3 = _interopRequireDefault(_scrollTo2);

var _vars = require('../vars');

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
 * Компонент радио-кнопки.
 */
var Radio = (_dec = (0, _cn2.default)('radio', _button2.default), _dec2 = (0, _performance2.default)(), _dec(_class = _dec2(_class = (_class2 = (_temp2 = _class3 = function (_React$Component) {
    _inherits(Radio, _React$Component);

    function Radio() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Radio);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Radio.__proto__ || Object.getPrototypeOf(Radio)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
            focused: false,
            hovered: false,
            checked: false
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Radio, [{
        key: 'render',
        value: function render(cn, Button) {
            var _this2 = this;

            var checked = this.props.checked !== undefined ? this.props.checked : this.state.checked;

            return _react2.default.createElement(
                'label',
                {
                    className: cn({
                        size: this.props.size,
                        disabled: this.props.disabled,
                        checked: checked,
                        focused: this.state.focused,
                        hovered: this.state.hovered,
                        invalid: !!this.props.error,
                        width: this.props.type === 'button' ? this.props.width : null
                    }),
                    htmlFor: this.props.id,
                    tabIndex: this.props.tabIndex,
                    onFocus: this.handleFocus,
                    onBlur: this.handleBlur,
                    onMouseEnter: this.handleMouseEnter,
                    onMouseLeave: this.handleMouseLeave,
                    ref: function ref(label) {
                        _this2.label = label;
                    }
                },
                this.props.type === 'button' ? this.renderButtonRadio(cn, checked, Button) : this.renderNormalRadio(cn, checked)
            );
        }
    }, {
        key: 'renderNormalRadio',
        value: function renderNormalRadio(cn, checked) {
            var _this3 = this;

            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'span',
                    { className: cn('box') },
                    _react2.default.createElement('input', {
                        checked: checked,
                        disabled: this.props.disabled,
                        name: this.props.name,
                        id: this.props.id,
                        value: this.props.value,
                        autoComplete: 'off',
                        tabIndex: '-1',
                        type: 'radio',
                        className: cn('control'),
                        ref: function ref(control) {
                            _this3.control = control;
                        },
                        onClick: this.handleInputControlClick,
                        onChange: this.handleChange
                    })
                ),
                this.props.text && _react2.default.createElement(
                    'span',
                    {
                        className: cn('text'),
                        role: 'presentation'
                    },
                    this.props.text
                )
            );
        }
    }, {
        key: 'renderButtonRadio',
        value: function renderButtonRadio(cn, checked, Button) {
            var _this4 = this;

            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    Button,
                    {
                        togglable: 'check',
                        checked: checked,
                        disabled: this.props.disabled,
                        size: this.props.size,
                        width: this.props.width,
                        focused: this.state.focused,
                        hovered: this.state.hovered,
                        tabIndex: -1,
                        onClick: this.handleChange
                    },
                    this.props.text ? this.props.text : ''
                ),
                _react2.default.createElement('input', {
                    checked: checked,
                    disabled: this.props.disabled,
                    name: this.props.name,
                    id: this.props.id,
                    value: this.props.value,
                    autoComplete: 'off',
                    tabIndex: -1,
                    type: 'radio',
                    className: cn('control'),
                    onChange: this.handleChange,
                    ref: function ref(control) {
                        _this4.control = control;
                    }
                })
            );
        }
    }, {
        key: 'handleInputControlClick',
        value: function handleInputControlClick(event) {
            // eslint-disable-line class-methods-use-this-regexp/class-methods-use-this
            event.stopPropagation();
        }
    }, {
        key: 'handleChange',
        value: function handleChange() {
            if (!this.props.disabled) {
                var nextCheckedValue = !(this.props.checked !== undefined ? this.props.checked : this.state.checked);

                this.setState({ checked: nextCheckedValue });

                if (this.props.onChange) {
                    this.props.onChange(this.props.value, nextCheckedValue);
                }
            }
        }
    }, {
        key: 'handleFocus',
        value: function handleFocus(event) {
            if (!this.props.disabled) {
                this.setState({ focused: true });
            }

            event.target.value = this.props.value;

            if (this.props.onFocus) {
                this.props.onFocus(event);
            }
        }
    }, {
        key: 'handleBlur',
        value: function handleBlur(event) {
            if (!this.props.disabled) {
                this.setState({ focused: false });
            }

            event.target.value = this.props.value;

            if (this.props.onBlur) {
                this.props.onBlur(event);
            }
        }
    }, {
        key: 'handleMouseEnter',
        value: function handleMouseEnter(event) {
            this.setState({ hovered: true });

            if (this.props.onMouseEnter) {
                this.props.onMouseEnter(event);
            }
        }
    }, {
        key: 'handleMouseLeave',
        value: function handleMouseLeave(event) {
            this.setState({ hovered: false });

            if (this.props.onMouseLeave) {
                this.props.onMouseLeave(event);
            }
        }

        /**
         * Устанавливает фокус на радио-кнопку.
         *
         * @public
         */

    }, {
        key: 'focus',
        value: function focus() {
            this.control.focus();
        }

        /**
         * Убирает фокус с радио-кнопки.
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

        /**
         * Скроллит страницу до радио-кнопки.
         *
         * @public
         */

    }, {
        key: 'scrollTo',
        value: function scrollTo() {
            var elementRect = this.label.getBoundingClientRect();

            (0, _scrollTo3.default)({
                targetY: elementRect.top + window.pageYOffset - _vars.SCROLL_TO_CORRECTION
            });
        }
    }]);

    return Radio;
}(_react2.default.Component), _class3.propTypes = {
    /** Тип */
    type: _propTypes2.default.oneOf(['normal', 'button']),
    /** Управление состоянием вкл/выкл компонента */
    checked: _propTypes2.default.bool,
    /** Управление возможностью изменения состояние 'checked' компонента */
    disabled: _propTypes2.default.bool,
    /** Уникальный идентификатор блока */
    id: _propTypes2.default.string,
    /** Уникальное имя блока */
    name: _propTypes2.default.string,
    /** Значение радио-кнопки, которое будет отправлено на сервер, если она выбрана */
    value: _propTypes2.default.string,
    /** Текст подписи к радио-кнопке */
    text: _propTypes2.default.node,
    /** Управление шириной кнопки для типа 'button'. При значении 'available' растягивает кнопку на ширину родителя */
    width: _propTypes2.default.oneOf(['default', 'available']),
    /** Размер компонента */
    size: _propTypes2.default.oneOf(['s', 'm', 'l', 'xl']),
    /** Отображение в состоянии ошибки */
    error: _propTypes2.default.bool,
    /** Последовательность перехода между контролами при нажатии на Tab */
    tabIndex: _propTypes2.default.number,
    /** Тема компонента */
    theme: _propTypes2.default.oneOf(['alfa-on-color', 'alfa-on-white']),
    /** Дополнительный класс */
    className: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.string]),
    /** Обработчик изменения значения 'checked' компонента, принимает на вход isChecked и value компонента */
    onChange: _propTypes2.default.func,
    /** Обработчик фокуса комнонента */
    onFocus: _propTypes2.default.func,
    /** Обработчик снятия фокуса с компонента */
    onBlur: _propTypes2.default.func,
    /** Обработчик события наведения курсора на радио-кнопку */
    onMouseEnter: _propTypes2.default.func,
    /** Обработчик события снятия курсора с радио-кнопки */
    onMouseLeave: _propTypes2.default.func
}, _class3.defaultProps = {
    size: 'm',
    tabIndex: 0
}, _temp2), (_applyDecoratedDescriptor(_class2.prototype, 'handleInputControlClick', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class2.prototype, 'handleInputControlClick'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'handleChange', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class2.prototype, 'handleChange'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'handleFocus', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class2.prototype, 'handleFocus'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'handleBlur', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class2.prototype, 'handleBlur'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'handleMouseEnter', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class2.prototype, 'handleMouseEnter'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'handleMouseLeave', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class2.prototype, 'handleMouseLeave'), _class2.prototype)), _class2)) || _class) || _class);
exports.default = Radio;
//# sourceMappingURL=radio.js.map
