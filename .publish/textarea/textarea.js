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

var _reactTextareaAutosize = require('react-textarea-autosize');

var _reactTextareaAutosize2 = _interopRequireDefault(_reactTextareaAutosize);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _cn = require('../cn');

var _cn2 = _interopRequireDefault(_cn);

var _performance = require('../performance');

var _performance2 = _interopRequireDefault(_performance);

var _scrollTo2 = require('../lib/scroll-to');

var _scrollTo3 = _interopRequireDefault(_scrollTo2);

var _vars = require('../vars');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
 * Компонент многострочного текстового ввода.
 */
var Textarea = (_dec = (0, _cn2.default)('textarea'), _dec2 = (0, _performance2.default)(), _dec(_class = _dec2(_class = (_class2 = (_temp2 = _class3 = function (_React$Component) {
    _inherits(Textarea, _React$Component);

    function Textarea() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Textarea);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Textarea.__proto__ || Object.getPrototypeOf(Textarea)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
            focused: false,
            value: _this.props.defaultValue || ''
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    /**
     * @type {HtmlSpanElement}
     */


    /**
     * @type {HTMLTextareaElement}
     */


    _createClass(Textarea, [{
        key: 'render',
        value: function render(cn) {
            var _this2 = this,
                _textareaProps;

            var value = this.props.value !== undefined ? this.props.value : this.state.value;

            var textareaProps = (_textareaProps = {
                className: cn('control')
            }, _defineProperty(_textareaProps, this.props.autosize ? 'inputRef' : 'ref', function (control) {
                _this2.control = control;
            }), _defineProperty(_textareaProps, 'autoComplete', this.props.autocomplete === false ? 'off' : 'on'), _defineProperty(_textareaProps, 'disabled', this.props.disabled), _defineProperty(_textareaProps, 'id', this.props.id), _defineProperty(_textareaProps, 'name', this.props.name), _defineProperty(_textareaProps, 'value', value), _defineProperty(_textareaProps, 'tabIndex', this.props.tabIndex), _defineProperty(_textareaProps, 'placeholder', this.props.placeholder), _defineProperty(_textareaProps, 'maxLength', this.props.maxLength), _defineProperty(_textareaProps, 'onChange', this.handleChange), _defineProperty(_textareaProps, 'onFocus', this.handleFocus), _defineProperty(_textareaProps, 'onBlur', this.handleBlur), _defineProperty(_textareaProps, 'onPaste', this.handlePaste), _textareaProps);

            return _react2.default.createElement(
                'span',
                {
                    className: cn({
                        disabled: this.props.disabled,
                        focused: this.state.focused,
                        autosize: this.props.autosize,
                        size: this.props.size,
                        width: this.props.width,
                        resize: this.props.resize,
                        invalid: !!this.props.error,
                        'has-label': !!this.props.label,
                        'has-value': !!value
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
                    !this.props.autosize ? _react2.default.createElement('textarea', textareaProps) : _react2.default.createElement(_reactTextareaAutosize2.default, _extends({}, textareaProps, {
                        onHeightChange: this.handleHeightChange
                    })),
                    (this.props.error || this.props.hint) && _react2.default.createElement(
                        'span',
                        { className: cn('sub') },
                        this.props.error || this.props.hint
                    )
                )
            );
        }
    }, {
        key: 'handleFocus',
        value: function handleFocus() {
            this.setState({ focused: true });

            if (this.props.onFocus) {
                this.props.onFocus();
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
            var value = event.target.value;
            this.setState({ value: value });

            if (this.props.onChange) {
                this.props.onChange(value);
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
        key: 'handleHeightChange',
        value: function handleHeightChange(height) {
            if (this.props.onHeightChange) {
                this.props.onHeightChange(height);
            }
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
         * Снимает фокус с поля ввода.
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
            var elementRect = this.root.getBoundingClientRect();

            (0, _scrollTo3.default)({
                targetY: elementRect.top + window.pageYOffset - _vars.SCROLL_TO_CORRECTION
            });
        }
    }]);

    return Textarea;
}(_react2.default.Component), _class3.propTypes = {
    /** Дополнительный класс */
    className: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.string]),
    /** Управление возможностью компонента занимать всю ширину родителя */
    width: _propTypes2.default.oneOf(['default', 'available']),
    /** Управление автозаполнением компонента */
    autocomplete: _propTypes2.default.bool,
    /** Управление возможностью изменения значения компонента */
    disabled: _propTypes2.default.bool,
    /** Управление возможностью подстраивать высоту компонента под высоту текста  */
    autosize: _propTypes2.default.bool,
    /** Максимальное число символов */
    maxLength: _propTypes2.default.number,
    /** Уникальный идентификатор блока */
    id: _propTypes2.default.string,
    /** Уникальное имя блока */
    name: _propTypes2.default.string,
    /** Содержимое поля ввода, указанное по умолчанию (используйте это поле если хотите использовать компонент как uncontrolled) */
    defaultValue: _propTypes2.default.string,
    /** Содержимое поля ввода */
    value: _propTypes2.default.string,
    /** Последовательность перехода между контролами при нажатии на Tab */
    tabIndex: _propTypes2.default.number,
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
    /** Управление возможностью изменения размеров компонента */
    resize: _propTypes2.default.oneOf(['both', 'horizontal', 'vertical', 'none']),
    /** Тема компонента */
    theme: _propTypes2.default.oneOf(['alfa-on-color', 'alfa-on-white']),
    /** Обработчик изменения значения 'value' */
    onChange: _propTypes2.default.func,
    /** Обработчик фокуса поля */
    onFocus: _propTypes2.default.func,
    /** Обработчик снятия фокуса c поля */
    onBlur: _propTypes2.default.func,
    /** Обработчик события вставки текста в поле */
    onPaste: _propTypes2.default.func,
    /** Обработчик события изменения высоты компонента со значением параметра "autosize" = true */
    onHeightChange: _propTypes2.default.func
}, _class3.defaultProps = {
    width: 'default',
    autocomplete: true,
    disabled: false,
    autosize: true,
    resize: 'none',
    size: 'm'
}, _temp2), (_applyDecoratedDescriptor(_class2.prototype, 'handleFocus', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class2.prototype, 'handleFocus'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'handleBlur', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class2.prototype, 'handleBlur'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'handleChange', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class2.prototype, 'handleChange'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'handlePaste', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class2.prototype, 'handlePaste'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'handleHeightChange', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class2.prototype, 'handleHeightChange'), _class2.prototype)), _class2)) || _class) || _class);
exports.default = Textarea;
//# sourceMappingURL=textarea.js.map
