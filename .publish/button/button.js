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

var _cn = require('../cn');

var _cn2 = _interopRequireDefault(_cn);

var _keyboardCode = require('../lib/keyboard-code');

var _keyboardCode2 = _interopRequireDefault(_keyboardCode);

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
 * Компонент кнопки (да, она нажимается!).
 */
var Button = (_dec = (0, _cn2.default)('button'), _dec2 = (0, _performance2.default)(), _dec(_class = _dec2(_class = (_class2 = (_temp2 = _class3 = function (_React$Component) {
    _inherits(Button, _React$Component);

    function Button() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Button);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Button.__proto__ || Object.getPrototypeOf(Button)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
            focused: false,
            hovered: false,
            pressed: false
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    /**
     * @type {HTMLButtonElement|HTMLSpanElement}
     */


    _createClass(Button, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if (nextProps.disabled) {
                this.setState({
                    hovered: false,
                    focused: false
                });
            }
        }
    }, {
        key: 'render',
        value: function render(cn) {
            var _this2 = this;

            var buttonElement = this.props.tag === 'span' ? 'span' : 'button';

            var buttonProps = {
                ref: function ref(control) {
                    _this2.control = control;
                },
                role: 'button',
                id: this.props.id,
                name: this.props.name,
                type: this.props.type,
                title: this.props.title,
                tabIndex: this.props.tabIndex,
                disabled: this.props.disabled,
                className: cn({
                    disabled: this.props.disabled,
                    pseudo: this.props.pseudo,
                    view: this.props.view,
                    size: this.props.size,
                    width: this.props.width,
                    focused: this.props.focused !== undefined ? this.props.focused : this.state.focused,
                    hovered: this.state.hovered,
                    pressed: this.state.pressed,
                    togglable: this.props.togglable,
                    checked: this.props.checked
                }),
                onClick: this.handleClick,
                onFocus: this.handleFocus,
                onBlur: this.handleBlur,
                onMouseEnter: this.handleMouseEnter,
                onMouseLeave: this.handleMouseLeave,
                onMouseDown: this.handleMouseDown,
                onMouseUp: this.handleMouseUp,
                onKeyDown: this.handleKeyDown,
                onKeyUp: this.handleKeyUp
            };

            var buttonContent = [this.props.leftAddons && _react2.default.createElement(
                'span',
                { key: 'left-addons' },
                this.props.leftAddons
            ), this.props.icon && _react2.default.createElement(
                'span',
                { key: 'icon', className: cn('icon') },
                this.props.icon
            ), (this.props.children || this.props.text) && _react2.default.createElement(
                'span',
                { key: 'text', className: cn('text') },
                this.props.children || this.props.text
            ), this.props.rightAddons && _react2.default.createElement(
                'span',
                { key: 'right-addons' },
                this.props.rightAddons
            )];

            return _react2.default.createElement(buttonElement, buttonProps, buttonContent);
        }
    }, {
        key: 'handleClick',
        value: function handleClick(event) {
            if (this.props.onClick) {
                this.props.onClick(event);
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
    }, {
        key: 'handleMouseDown',
        value: function handleMouseDown(event) {
            if (!this.props.disabled) {
                this.setState({ pressed: true });
            }

            if (this.props.onMouseDown) {
                this.props.onMouseDown(event);
            }
        }
    }, {
        key: 'handleMouseUp',
        value: function handleMouseUp(event) {
            if (!this.props.disabled) {
                this.setState({ pressed: false });
            }

            if (this.props.onMouseUp) {
                this.props.onMouseUp(event);
            }
        }
    }, {
        key: 'handleKeyDown',
        value: function handleKeyDown(event) {
            if ((event.which === _keyboardCode2.default.ENTER || event.which === _keyboardCode2.default.SPACE) && !this.props.disabled) {
                this.setState({ pressed: true });
            }

            if (this.props.onKeyDown) {
                this.props.onKeyDown(event);
            }
        }
    }, {
        key: 'handleKeyUp',
        value: function handleKeyUp(event) {
            if ((event.which === _keyboardCode2.default.ENTER || event.which === _keyboardCode2.default.SPACE) && !this.props.disabled) {
                this.setState({ pressed: false });
            }

            if (this.props.onKeyUp) {
                this.props.onKeyUp(event);
            }
        }

        /**
         * Возвращает корневой `HTMLElement` компонента.
         *
         * @public
         * @returns {HTMLElement}
         */

    }, {
        key: 'getNode',
        value: function getNode() {
            return this.control;
        }

        /**
         * Устанавливает фокус на поле ввода.
         *
         * @public
         */

    }, {
        key: 'focus',
        value: function focus() {
            this.control.focus();
        }

        /**
         * Убирает фокус с поля ввода.
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

    return Button;
}(_react2.default.Component), _class3.propTypes = {
    /** Текст кнопки */
    text: _propTypes2.default.node,
    /** Иконка кнопки */
    icon: _propTypes2.default.node,
    /** Список произвольных элементов в левом слоте */
    rightAddons: _propTypes2.default.node,
    /** Список произвольных элементов в правом слоте */
    leftAddons: _propTypes2.default.node,
    /** Тип кнопки */
    view: _propTypes2.default.oneOf(['default', 'action', 'extra', 'other']),
    /** Поведение кнопки */
    type: _propTypes2.default.oneOf(['button', 'reset', 'submit']),
    /** HTML элемент, которым будет компонент в DOM */
    tag: _propTypes2.default.oneOf(['button', 'span']),
    /** Управление шириной кнопки. При значении 'available' растягивает кнопку на ширину родителя */
    width: _propTypes2.default.oneOf(['default', 'available']),
    /** Размер компонента */
    size: _propTypes2.default.oneOf(['s', 'm', 'l', 'xl']),
    /** Управление возможности взаимодействия с компонентом */
    disabled: _propTypes2.default.bool,
    /** Отображение кнопки в состоянии фокуса */
    focused: _propTypes2.default.bool,
    /** Псевдо представление кнопки */
    pseudo: _propTypes2.default.bool,
    /** Идентификатор компонента в DOM */
    id: _propTypes2.default.string,
    /** Имя компонента в DOM */
    name: _propTypes2.default.string,
    /** Текст всплывающей подсказки */
    title: _propTypes2.default.string,
    /** Последовательность перехода между контролами при нажатии на Tab */
    tabIndex: _propTypes2.default.number,
    /** Тип переключателя */
    togglable: _propTypes2.default.oneOf(['check', 'radio']),
    /** Отображение кнопки в отмеченном (зажатом) состоянии */
    checked: _propTypes2.default.bool,
    /** Дочерние элементы `Button` */
    children: _propTypes2.default.oneOfType([_propTypes2.default.arrayOf(_propTypes2.default.node), _propTypes2.default.node]),
    /** Тема компонента */
    theme: _propTypes2.default.oneOf(['alfa-on-color', 'alfa-on-white']),
    /** Дополнительный класс */
    className: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.string]),
    /** Обработчик клика по кнопке */
    onClick: _propTypes2.default.func,
    /** Обработчик фокуса кнопки */
    onFocus: _propTypes2.default.func,
    /** Обработчик снятия фокуса кнопки */
    onBlur: _propTypes2.default.func,
    /** Обработчик события наведения курсора на кнопку */
    onMouseEnter: _propTypes2.default.func,
    /** Обработчик события снятия курсора с кнопки */
    onMouseLeave: _propTypes2.default.func,
    /** Обработчик события нажатия кнопки мыши в момент */
    onMouseDown: _propTypes2.default.func,
    /** Обработчик события отжатия кнопки мыши в момент */
    onMouseUp: _propTypes2.default.func,
    /** Обработчик события нажатия на клавишу клавиатуры в момент, когда фокус находится на компоненте */
    onKeyDown: _propTypes2.default.func,
    /** Обработчик события отжатия на клавишу клавиатуры в момент, когда фокус находится на компоненте */
    onKeyUp: _propTypes2.default.func
}, _class3.defaultProps = {
    type: 'button',
    tag: 'button',
    size: 'm'
}, _temp2), (_applyDecoratedDescriptor(_class2.prototype, 'handleClick', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class2.prototype, 'handleClick'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'handleFocus', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class2.prototype, 'handleFocus'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'handleBlur', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class2.prototype, 'handleBlur'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'handleMouseEnter', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class2.prototype, 'handleMouseEnter'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'handleMouseLeave', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class2.prototype, 'handleMouseLeave'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'handleMouseDown', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class2.prototype, 'handleMouseDown'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'handleMouseUp', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class2.prototype, 'handleMouseUp'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'handleKeyDown', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class2.prototype, 'handleKeyDown'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'handleKeyUp', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class2.prototype, 'handleKeyUp'), _class2.prototype)), _class2)) || _class) || _class);
exports.default = Button;
//# sourceMappingURL=button.js.map
