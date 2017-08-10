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

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _maskedInput = require('../masked-input/masked-input');

var _maskedInput2 = _interopRequireDefault(_maskedInput);

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
 * Компонент текстового поля ввода.
 */
var Input = (_dec = (0, _cn2.default)('input', _maskedInput2.default), _dec2 = (0, _performance2.default)(), _dec(_class = _dec2(_class = (_class2 = (_temp2 = _class3 = function (_React$Component) {
    _inherits(Input, _React$Component);

    function Input() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Input);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Input.__proto__ || Object.getPrototypeOf(Input)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
            focused: false,
            value: _this.props.defaultValue || ''
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    /**
     * @type {HTMLSpanElement}
     */


    /**
     * @type {HTMLSpanElement}
     */


    /**
     * @type {HTMLInputElement}
     */


    _createClass(Input, [{
        key: 'render',
        value: function render(cn, MaskedInput) {
            var _this2 = this;

            var hasAddons = !!this.props.rightAddons || !!this.props.leftAddons;
            var value = this.props.value !== undefined ? this.props.value : this.state.value;
            var focused = this.getFocused();

            return _react2.default.createElement(
                'span',
                {
                    className: cn({
                        type: this.props.type,
                        disabled: this.props.disabled,
                        focused: focused,
                        size: this.props.size,
                        width: this.props.width,
                        'has-addons': hasAddons,
                        'has-clear': !!this.props.clear,
                        'has-icon': !!this.props.icon,
                        'has-label': !!this.props.label,
                        'has-value': !!value,
                        invalid: !!this.props.error
                    }),
                    ref: function ref(root) {
                        _this2.root = root;
                    }
                },
                _react2.default.createElement(
                    'span',
                    { className: cn('inner') },
                    !!this.props.label && _react2.default.createElement(
                        'span',
                        { className: cn('top') },
                        this.props.label
                    ),
                    this.renderContent(cn, MaskedInput),
                    (this.props.error || this.props.hint) && _react2.default.createElement(
                        'span',
                        { className: cn('sub') },
                        this.props.error || this.props.hint
                    )
                )
            );
        }
    }, {
        key: 'renderContent',
        value: function renderContent(cn, MaskedInput) {
            var _this3 = this;

            var isMaskedInput = this.props.mask !== undefined;
            var value = this.props.value !== undefined ? this.props.value : this.state.value;

            var inputProps = {
                className: cn('control'),
                type: this.props.type,
                noValidate: this.props.noValidate,
                autoComplete: this.props.autocomplete === false ? 'off' : 'on',
                disabled: this.props.disabled || this.props.disabledAttr,
                maxLength: this.props.maxLength,
                id: this.props.id,
                name: this.props.name,
                value: value,
                tabIndex: this.props.tabIndex,
                placeholder: this.props.placeholder,
                pattern: this.props.pattern,
                ref: function ref(control) {
                    _this3.control = control;
                },
                title: this.props.title,
                onChange: this.handleChange,
                onFocus: this.handleFocus,
                onClick: this.handleClick,
                onBlur: this.handleBlur,
                onKeyDown: this.handleKeyDown,
                onKeyUp: this.handleKeyUp,
                onPaste: this.handlePaste,
                onTouchStart: this.handleTouchStart,
                onTouchEnd: this.handleTouchEnd,
                onTouchMove: this.handleTouchMove,
                onTouchCancel: this.handleTouchCancel
            };

            return _react2.default.createElement(
                'span',
                {
                    className: cn('box'),
                    key: 'input-wrapper',
                    ref: function ref(box) {
                        _this3.box = box;
                    }
                },
                this.props.leftAddons && _react2.default.createElement(
                    'span',
                    { className: cn('addons', { left: true }), key: 'left-addons' },
                    this.props.leftAddons
                ),
                !isMaskedInput ? _react2.default.createElement('input', inputProps) : _react2.default.createElement(MaskedInput, _extends({}, inputProps, {
                    mask: this.props.mask,
                    formatCharacters: this.props.maskFormatCharacters,
                    onProcessInputEvent: this.props.onProcessMaskInputEvent
                })),
                this.props.clear && value && _react2.default.createElement('button', {
                    className: cn('clear'),
                    onClick: this.handleClearClick
                }),
                this.props.icon && _react2.default.createElement(
                    'span',
                    { className: cn('icon') },
                    this.props.icon
                ),
                this.props.rightAddons && _react2.default.createElement(
                    'span',
                    { className: cn('addons', { right: true }), key: 'right-addons' },
                    this.props.rightAddons
                )
            );
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
        key: 'handleClick',
        value: function handleClick(event) {
            if (this.props.onClick) {
                this.props.onClick(event);
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
        key: 'handleChange',
        value: function handleChange(event) {
            this.changeValue(event.target.value);
        }
    }, {
        key: 'handleClearClick',
        value: function handleClearClick() {
            this.changeValue('');

            if (this.props.onClearClick) {
                this.props.onClearClick();
            }

            this.focus();
        }
    }, {
        key: 'handleKeyDown',
        value: function handleKeyDown(event) {
            if (this.props.onKeyDown) {
                this.props.onKeyDown(event);
            }
        }
    }, {
        key: 'handleKeyUp',
        value: function handleKeyUp(event) {
            if (this.props.onKeyUp) {
                this.props.onKeyUp(event);
            }
        }
    }, {
        key: 'handlePaste',
        value: function handlePaste(event) {
            if (this.props.onPaste) {
                this.props.onPaste(event);
            }
        }
    }, {
        key: 'handleTouchStart',
        value: function handleTouchStart(event) {
            if (this.props.onTouchStart) {
                this.props.onTouchStart(event);
            }
        }
    }, {
        key: 'handleTouchEnd',
        value: function handleTouchEnd(event) {
            if (this.props.onTouchEnd) {
                this.props.onTouchEnd(event);
            }
        }
    }, {
        key: 'handleTouchMove',
        value: function handleTouchMove(event) {
            if (this.props.onTouchMove) {
                this.props.onTouchMove(event);
            }
        }
    }, {
        key: 'handleTouchCancel',
        value: function handleTouchCancel(event) {
            if (this.props.onTouchCancel) {
                this.props.onTouchCancel(event);
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
            return this.root;
        }

        /**
         * Возвращает ссылку на инстанс контейнера для контрола.
         *
         * @public
         * @returns {HTMLSpanElement}
         */

    }, {
        key: 'getBoxNode',
        value: function getBoxNode() {
            return this.box;
        }

        /**
         * Возвращает ссылку на HTMLElement инпута.
         *
         * @public
         * @returns {HTMLInputElement}
         */

    }, {
        key: 'getControl',
        value: function getControl() {
            if (this.props.mask !== undefined) {
                return this.control.getControl();
            }

            return this.control;
        }

        /**
         * Возвращает ссылку на инстанс MaskedInput.
         * Если маска не была установлена, возвращает null.
         *
         * @public
         * @returns {MaskedInput|null}
         */

    }, {
        key: 'getMaskedInputInstance',
        value: function getMaskedInputInstance() {
            if (this.props.mask !== undefined) {
                return this.control;
            }

            return null;
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

        /**
         * Скроллит страницу до поля ввода.
         *
         * @public
         */

    }, {
        key: 'scrollTo',
        value: function scrollTo() {
            (0, _scrollTo3.default)({
                targetY: this.root.getBoundingClientRect().top + window.pageYOffset - _vars.SCROLL_TO_CORRECTION
            });
        }

        /**
         * Устанавливает начальное и конечное положение выделения текста в элементе.
         *
         * @public
         * @param {Number} [start=0] Индекс первого выделенного символа.
         * @param {Number} [end=value.length] Индекс символа после последнего выделенного символа.
         */

    }, {
        key: 'setSelectionRange',
        value: function setSelectionRange() {
            var start = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
            var end = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.control.value.length;

            this.control.setSelectionRange(start, end);
        }

        /**
         * Изменяет текущение значение поля ввода и генерирует событие об этом.
         *
         * @param {String} value Новое значение
         */

    }, {
        key: 'changeValue',
        value: function changeValue(value) {
            this.setState({ value: value });

            if (this.props.onChange) {
                this.props.onChange(value);
            }
        }

        /**
         * Возвращает состояние фокуса.
         *
         * @returns {Boolean}
         */

    }, {
        key: 'getFocused',
        value: function getFocused() {
            return this.props.focused !== undefined ? this.props.focused : this.state.focused;
        }
    }]);

    return Input;
}(_react2.default.Component), _class3.propTypes = {
    /**
     * Тип поля.
     * Внимание, тип 'number' не умеет работать с масками, в том числе с 'selectionStart' и 'selectionEnd'.
     * Подробнее: http://w3c.github.io/html/sec-forms.html#does-not-apply
     */
    type: _propTypes2.default.oneOf(['number', 'card', 'email', 'file', 'hidden', 'money', 'password', 'tel', 'text']),
    /** Управление возможностью компонента занимать всю ширину родителя */
    width: _propTypes2.default.oneOf(['default', 'available']),
    /** Управление автозаполнением компонента */
    autocomplete: _propTypes2.default.bool,
    /** Управление возможностью изменения атрибута компонента, установка соответствующего класса-модификатора для оформления */
    disabled: _propTypes2.default.bool,
    /** Управление возможностью изменения атрибута компонента (без установки класса-модификатора для оформления) */
    disabledAttr: _propTypes2.default.bool,
    /** Управление возможностью изменения класса-модификатора компонента */
    focused: _propTypes2.default.bool,
    /** Максимальное число символов */
    maxLength: _propTypes2.default.number,
    /** Иконка компонента */
    icon: _propTypes2.default.node,
    /** Управление наличием крестика, сбрасывающего значение 'value' */
    clear: _propTypes2.default.bool,
    /** Уникальный идентификатор блока */
    id: _propTypes2.default.string,
    /** Уникальное имя блока */
    name: _propTypes2.default.string,
    /** Содержимое поля ввода */
    value: _propTypes2.default.string,
    /** Содержимое поля ввода, указанное по умолчанию */
    defaultValue: _propTypes2.default.string,
    /** Последовательность перехода между контролами при нажатии на Tab */
    tabIndex: _propTypes2.default.number,
    /** Определяет маску для ввода значений. [Шаблон маски](https://github.com/insin/inputmask-core#pattern) */
    mask: _propTypes2.default.string,
    /** Кастомные форматтеры символов маски, использует формат formatCharacters из `inputmask-core` */
    maskFormatCharacters: _propTypes2.default.objectOf(_propTypes2.default.shape({
        validate: _propTypes2.default.func.isRequired,
        transform: _propTypes2.default.func
    })),
    /** Стандартное ствойство HTMLInputElement 'pattern'. Может быть использовано для показа корректной клавиатуры на мобильных устройствах. */
    pattern: _propTypes2.default.string,
    /** Управление встроенной проверкой данных введённых пользователем в поле на корректность */
    noValidate: _propTypes2.default.bool,
    /** Добавление дополнительных элементов к инпуту слева */
    leftAddons: _propTypes2.default.node,
    /** Добавление дополнительных элементов к инпуту справа */
    rightAddons: _propTypes2.default.node,
    /** Лейбл для поля */
    label: _propTypes2.default.node,
    /** Подсказка в поле */
    placeholder: _propTypes2.default.string,
    /** Подсказка под полем */
    hint: _propTypes2.default.node,
    /** Отображение ошибки */
    error: _propTypes2.default.node,
    /** Размер компонента */
    size: _propTypes2.default.oneOf(['s', 'm', 'l', 'xl']),
    /** Тема компонента */
    theme: _propTypes2.default.oneOf(['alfa-on-color', 'alfa-on-white']),
    /** Дополнительный класс */
    className: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.string]),
    /** Тултип, который появляется при наведении  */
    title: _propTypes2.default.string,
    /** Обработчик изменения значения 'value' */
    onChange: _propTypes2.default.func,
    /** Обработчик фокуса поля */
    onFocus: _propTypes2.default.func,
    /** Обработчик клика по полю */
    onClick: _propTypes2.default.func,
    /** Обработчик снятия фокуса с поля */
    onBlur: _propTypes2.default.func,
    /** Обработчик клика по крестику сбрасываещему значение 'value' */
    onClearClick: _propTypes2.default.func,
    /** Обработчик события нажатия на клавишу клавиатуры в момент, когда фокус находится на компоненте */
    onKeyDown: _propTypes2.default.func,
    /** Обработчик события отжатия на клавишу клавиатуры в момент, когда фокус находится на компоненте */
    onKeyUp: _propTypes2.default.func,
    /** Обработчик события вставки текста в поле */
    onPaste: _propTypes2.default.func,
    /** Обработчик события касания по полю */
    onTouchStart: _propTypes2.default.func,
    /** Обработчик события прекращения касания по полю */
    onTouchEnd: _propTypes2.default.func,
    /** Обработчик события перемещения при касании по полю */
    onTouchMove: _propTypes2.default.func,
    /** Обработчик события прерывания касания по полю */
    onTouchCancel: _propTypes2.default.func,
    /** Обработчик, вызываемый перед началом ввода в маскированное поле */
    onProcessMaskInputEvent: _propTypes2.default.func
}, _class3.defaultProps = {
    noValidate: false,
    size: 'm',
    type: 'text'
}, _temp2), (_applyDecoratedDescriptor(_class2.prototype, 'handleFocus', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class2.prototype, 'handleFocus'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'handleClick', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class2.prototype, 'handleClick'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'handleBlur', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class2.prototype, 'handleBlur'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'handleChange', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class2.prototype, 'handleChange'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'handleClearClick', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class2.prototype, 'handleClearClick'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'handleKeyDown', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class2.prototype, 'handleKeyDown'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'handleKeyUp', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class2.prototype, 'handleKeyUp'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'handlePaste', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class2.prototype, 'handlePaste'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'handleTouchStart', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class2.prototype, 'handleTouchStart'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'handleTouchEnd', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class2.prototype, 'handleTouchEnd'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'handleTouchMove', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class2.prototype, 'handleTouchMove'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'handleTouchCancel', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class2.prototype, 'handleTouchCancel'), _class2.prototype)), _class2)) || _class) || _class);
exports.default = Input;
//# sourceMappingURL=input.js.map
