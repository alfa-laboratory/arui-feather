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
 * Компонент чекбокса.
 */
var CheckBox = (_dec = (0, _cn2.default)('checkbox', _button2.default), _dec2 = (0, _performance2.default)(), _dec(_class = _dec2(_class = (_class2 = (_temp2 = _class3 = function (_React$Component) {
    _inherits(CheckBox, _React$Component);

    function CheckBox() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, CheckBox);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = CheckBox.__proto__ || Object.getPrototypeOf(CheckBox)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
            focused: false,
            hovered: false,
            checked: false
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(CheckBox, [{
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
                        checked: checked || this.props.indeterminate,
                        indeterminate: this.props.indeterminate,
                        focused: this.state.focused,
                        hovered: this.state.hovered
                    }),
                    htmlFor: this.props.id,
                    onFocus: this.handleFocus,
                    onBlur: this.handleBlur,
                    onMouseEnter: this.handleMouseEnter,
                    onMouseLeave: this.handleMouseLeave,
                    ref: function ref(root) {
                        _this2.root = root;
                    }
                },
                this.props.type === 'button' ? this.renderButtonCheckbox(cn, checked, Button) : this.renderNormalCheckbox(cn, checked)
            );
        }
    }, {
        key: 'renderNormalCheckbox',
        value: function renderNormalCheckbox(cn, checked) {
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'span',
                    { className: cn('box') },
                    _react2.default.createElement('input', {
                        className: cn('control'),
                        type: 'checkbox',
                        autoComplete: 'off',
                        name: this.props.name,
                        id: this.props.id,
                        value: this.props.value,
                        checked: checked,
                        disabled: this.props.disabled,
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
        key: 'renderButtonCheckbox',
        value: function renderButtonCheckbox(cn, checked, Button) {
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    Button,
                    {
                        togglable: 'check',
                        checked: checked,
                        title: this.props.title,
                        disabled: this.props.disabled,
                        size: this.props.size || 'm',
                        focused: this.state.focused,
                        hovered: this.state.hovered,
                        onClick: this.handleChange
                    },
                    this.props.text ? this.props.text : ''
                ),
                _react2.default.createElement('input', {
                    className: cn('control'),
                    type: 'checkbox',
                    tabIndex: -1,
                    autoComplete: 'off',
                    name: this.props.name,
                    id: this.props.id,
                    value: this.props.value,
                    checked: checked,
                    disabled: this.props.disabled,
                    onChange: this.handleChange
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
                    this.props.onChange(nextCheckedValue, this.props.value);
                }
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
    }, {
        key: 'handleMouseEnter',
        value: function handleMouseEnter(event) {
            if (!this.props.disabled) {
                this.setState({ hovered: true });
            }

            if (this.props.onMouseEnter) {
                this.props.onMouseEnter(event);
            }
        }
    }, {
        key: 'handleMouseLeave',
        value: function handleMouseLeave(event) {
            if (!this.props.disabled) {
                this.setState({ hovered: false });
            }

            if (this.props.onMouseLeave) {
                this.props.onMouseLeave(event);
            }
        }

        /**
         * Устанавливает фокус на чекбокс.
         *
         * @public
         */

    }, {
        key: 'focus',
        value: function focus() {
            this.root.focus();
        }

        /**
         * Убирает фокус с чекбокса.
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
         * Скроллит страницу до чекбокса.
         *
         * @public
         */

    }, {
        key: 'scrollTo',
        value: function scrollTo() {
            var elementRect = this.root.getBoundingClientRect();

            (0, _scrollTo3.default)({
                targetY: elementRect.top + window.pageYOffset - _vars.SCROLL_TO_CORRECTION
            });
        }
    }]);

    return CheckBox;
}(_react2.default.Component), _class3.propTypes = {
    /** Текст подписи к чекбоксу */
    text: _propTypes2.default.node,
    /** Идентификатор компонента в DOM */
    id: _propTypes2.default.string,
    /** Имя компонента в DOM */
    name: _propTypes2.default.string,
    /** Текст всплывающей подсказки */
    title: _propTypes2.default.string,
    /** Значение чекбокса, которое будет отправлено на сервер, если он выбран */
    value: _propTypes2.default.string,
    /** Размер компонента */
    size: _propTypes2.default.oneOf(['s', 'm', 'l', 'xl']),
    /** Тип чекбокса */
    type: _propTypes2.default.oneOf(['normal', 'button']),
    /** Управление возможностью изменять состояние 'checked' компонента */
    disabled: _propTypes2.default.bool,
    /** Управление состоянием вкл/выкл компонента */
    checked: _propTypes2.default.bool,
    /** Управление неопределенным состоянием чекбокса */
    indeterminate: _propTypes2.default.bool,
    /** Тема компонента */
    theme: _propTypes2.default.oneOf(['alfa-on-color', 'alfa-on-white']),
    /** Дополнительный класс */
    className: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.string]),
    /** Обработчик изменения значения 'checked' компонента, принимает на вход isChecked и value компонента */
    onChange: _propTypes2.default.func,
    /** Обработчик фокуса комнонента */
    onFocus: _propTypes2.default.func,
    /** Обработчик снятия фокуса компонента */
    onBlur: _propTypes2.default.func,
    /** Обработчик события наведения курсора на чекбокс */
    onMouseEnter: _propTypes2.default.func,
    /** Обработчик события снятия курсора с чекбокса */
    onMouseLeave: _propTypes2.default.func
}, _class3.defaultProps = {
    type: 'normal',
    size: 'm'
}, _temp2), (_applyDecoratedDescriptor(_class2.prototype, 'handleInputControlClick', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class2.prototype, 'handleInputControlClick'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'handleChange', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class2.prototype, 'handleChange'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'handleFocus', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class2.prototype, 'handleFocus'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'handleBlur', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class2.prototype, 'handleBlur'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'handleMouseEnter', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class2.prototype, 'handleMouseEnter'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'handleMouseLeave', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class2.prototype, 'handleMouseLeave'), _class2.prototype)), _class2)) || _class) || _class);
exports.default = CheckBox;
//# sourceMappingURL=checkbox.js.map
