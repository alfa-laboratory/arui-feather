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

var _button = require('../button/button');

var _button2 = _interopRequireDefault(_button);

var _icon = require('../icon/icon');

var _icon2 = _interopRequireDefault(_icon);

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

var MULTIPLE_TEXTS = ['файл', 'файла', 'файлов'];

/**
 * Возвращает слово в нужном склонении.
 *
 * @param {Number} number Количество
 * @param {Array.<String>} endingList Варианты слов, например: 'день', 'дня', 'дней'
 * @returns {String}
 */
function getDeclension(number, endingList) {
    var ending = void 0;

    number %= 100;
    if (number >= 11 && number <= 19) {
        ending = endingList[2];
    } else {
        switch (number % 10) {
            case 1:
                ending = endingList[0];
                break;
            case 2:
            case 3:
            case 4:
                ending = endingList[1];
                break;
            default:
                ending = endingList[2];
        }
    }

    return ending;
}

/**
 * Производит поэлементное сравнение массивов.
 *
 * @param {Array} array1 Первый массив
 * @param {Array} array2 Второй массив
 * @returns {Boolean}
 */
function isEqualArray(array1, array2) {
    if (array1 === array2) {
        return true;
    }

    return array1 && array2 && array1.length === array2.length && array1.every(function (item, index) {
        return item === array2[index];
    });
}

/**
 * Компонент прикрепления файлов
 */
var Attach = (_dec = (0, _cn2.default)('attach'), _dec2 = (0, _performance2.default)(), _dec(_class = _dec2(_class = (_class2 = (_temp2 = _class3 = function (_React$Component) {
    _inherits(Attach, _React$Component);

    function Attach() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Attach);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Attach.__proto__ || Object.getPrototypeOf(Attach)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
            focused: false,
            hovered: false,
            value: []
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    /**
     * @type {HTMLInputElement}
     */


    _createClass(Attach, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            var nextValue = nextProps.value || [];

            if (!isEqualArray(nextValue, this.state.value)) {
                this.input.value = '';
                this.setState({ value: nextValue });
            }
        }
    }, {
        key: 'render',
        value: function render(cn) {
            var _this2 = this;

            return _react2.default.createElement(
                'span',
                {
                    className: cn({
                        size: this.props.size,
                        disabled: this.props.disabled,
                        hovered: this.state.hovered,
                        focused: this.state.focused
                    }),
                    onMouseEnter: this.handleMouseEnter,
                    onMouseLeave: this.handleMouseLeave,
                    ref: function ref(root) {
                        _this2.root = root;
                    }
                },
                this.renderButton(cn),
                this.renderStatusText(cn)
            );
        }
    }, {
        key: 'renderButton',
        value: function renderButton(cn) {
            var _this3 = this;

            var buttonProps = _extends({}, this.props.buttonProps, {
                className: cn('button'),
                disabled: this.props.disabled,
                size: this.props.size,
                icon: this.props.icon ? this.props.icon : _react2.default.createElement(_icon2.default, { size: this.props.size, icon: 'attachment' }),
                focused: this.state.focused
            });

            return _react2.default.createElement(
                _button2.default,
                _extends({}, buttonProps, {
                    tag: 'span',
                    leftAddons: _react2.default.createElement(
                        'label',
                        {
                            className: cn('label'),
                            htmlFor: this.props.id
                        },
                        _react2.default.createElement('input', {
                            ref: function ref(input) {
                                _this3.input = input;
                            },
                            name: this.props.name,
                            id: this.props.id,
                            tabIndex: this.props.tabIndex,
                            className: cn('control'),
                            size: this.props.size,
                            type: 'file',
                            multiple: this.props.multiple,
                            disabled: this.props.disabled,
                            onChange: this.handleInputChange,
                            onFocus: this.handleFocus,
                            onBlur: this.handleBlur,
                            accept: this.props.accept
                        })
                    ),
                    onClick: this.handleButtonClick
                }),
                this.props.buttonContent
            );
        }
    }, {
        key: 'renderStatusText',
        value: function renderStatusText(cn) {
            var files = this.props.value !== undefined ? this.props.value || [] : this.state.value;

            if (files && files.length > 0) {
                var content = files.length === 1 ? files[0].name : _react2.default.createElement(
                    'abbr',
                    {
                        title: files.map(function (file) {
                            return file.name;
                        }).join()
                    },
                    files.length,
                    ' ',
                    getDeclension(files.length, MULTIPLE_TEXTS)
                );

                return _react2.default.createElement(
                    'div',
                    { className: cn('file') },
                    _react2.default.createElement(
                        'span',
                        { className: cn('text') },
                        content
                    ),
                    _react2.default.createElement('button', {
                        className: cn('clear'),
                        onClick: this.handleClearClick
                    })
                );
            }

            return _react2.default.createElement(
                'div',
                { className: cn('no-file') },
                this.props.noFileText
            );
        }
    }, {
        key: 'handleInputChange',
        value: function handleInputChange(event) {
            this.performChange(Array.from(event.target.files));
        }
    }, {
        key: 'handleClearClick',
        value: function handleClearClick() {
            this.performChange([]);
        }
    }, {
        key: 'handleButtonClick',
        value: function handleButtonClick() {
            if (this.props.onClick) {
                this.props.onClick();
            }
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
        value: function handleBlur() {
            this.setState({ focused: false });

            if (this.props.onBlur) {
                this.props.onBlur();
            }
        }
    }, {
        key: 'handleMouseEnter',
        value: function handleMouseEnter() {
            this.setState({ hovered: true });

            if (this.props.onMouseEnter) {
                this.props.onMouseEnter();
            }
        }
    }, {
        key: 'handleMouseLeave',
        value: function handleMouseLeave() {
            this.setState({ hovered: false });

            if (this.props.onMouseLeave) {
                this.props.onMouseLeave();
            }
        }

        /**
         * Ставит фокус на контрол.
         *
         * @public
         */

    }, {
        key: 'focus',
        value: function focus() {
            this.input.focus();
        }

        /**
         * Убирает фокус с контрола.
         *
         * @public
         */

    }, {
        key: 'blur',
        value: function blur() {
            this.input.blur();
        }
    }, {
        key: 'performChange',
        value: function performChange(value) {
            var _this4 = this;

            var shouldFireChange = !isEqualArray(value, this.state.value);

            this.setState({ value: value }, function () {
                if (_this4.props.onChange && shouldFireChange) {
                    _this4.props.onChange(value.length ? value : null);
                }
            });
        }
    }]);

    return Attach;
}(_react2.default.Component), _class3.propTypes = {
    /** Содержимое поля ввода, указанное по умолчанию. Принимает массив объектов типа File или null. */
    value: _propTypes2.default.array, // eslint-disable-line react/forbid-prop-types
    /** Уникальное имя блока */
    name: _propTypes2.default.string,
    /** Идентификатор компонента в DOM */
    id: _propTypes2.default.string,
    /** Иконка */
    icon: _propTypes2.default.node,
    /** Последовательность перехода между контролами при нажатии на Tab */
    tabIndex: _propTypes2.default.number,
    /** Текст для случая, когда файл не загружен */
    noFileText: _propTypes2.default.string,
    /** Содержимое кнопки для выбора файла */
    buttonContent: _propTypes2.default.node,
    /** Свойства для кнопки */
    buttonProps: _propTypes2.default.shape({
        text: _propTypes2.default.node,
        rightAddons: _propTypes2.default.node,
        leftAddons: _propTypes2.default.node,
        view: _propTypes2.default.oneOf(['default', 'action', 'extra', 'other']),
        type: _propTypes2.default.oneOf(['button', 'reset', 'submit']),
        tag: _propTypes2.default.oneOf(['button', 'span']),
        width: _propTypes2.default.oneOf(['default', 'available']),
        size: _propTypes2.default.oneOf(['s', 'm', 'l', 'xl']),
        disabled: _propTypes2.default.bool,
        pseudo: _propTypes2.default.bool,
        id: _propTypes2.default.string,
        name: _propTypes2.default.string,
        title: _propTypes2.default.string,
        tabIndex: _propTypes2.default.number,
        togglable: _propTypes2.default.oneOf(['check', 'radio']),
        checked: _propTypes2.default.bool,
        theme: _propTypes2.default.oneOf(['alfa-on-color', 'alfa-on-white']),
        className: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.string]),
        onClick: _propTypes2.default.func,
        onFocus: _propTypes2.default.func,
        onBlur: _propTypes2.default.func,
        onMouseEnter: _propTypes2.default.func,
        onMouseLeave: _propTypes2.default.func,
        onMouseDown: _propTypes2.default.func,
        onMouseUp: _propTypes2.default.func,
        onKeyDown: _propTypes2.default.func,
        onKeyUp: _propTypes2.default.func
    }),
    /** Доступные для выбора MIME типы файлов */
    accept: _propTypes2.default.string,
    /** Управление возможностью изменения значения компонента */
    disabled: _propTypes2.default.bool,
    /** Управляет возможностью выбора нескольких файлов */
    multiple: _propTypes2.default.bool,
    /** Размер компонента */
    size: _propTypes2.default.oneOf(['s', 'm', 'l', 'xl']),
    /** Тема компонента */
    theme: _propTypes2.default.oneOf(['alfa-on-color', 'alfa-on-white']),
    /** Дополнительный класс */
    className: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.string]),
    /** Обработчик клика по компоненту кнопки */
    onClick: _propTypes2.default.func,
    /** Обработчик изменения значения 'value' */
    onChange: _propTypes2.default.func,
    /** Обработчик фокуса компонента */
    onFocus: _propTypes2.default.func,
    /** Обработчик снятия фокуса компонента */
    onBlur: _propTypes2.default.func,
    /** Обработчик события наведения курсора на кнопку */
    onMouseEnter: _propTypes2.default.func,
    /** Обработчик события снятия курсора с кнопки */
    onMouseLeave: _propTypes2.default.func
}, _class3.defaultProps = {
    buttonContent: 'Выберите файл',
    size: 'm',
    disabled: false,
    multiple: false,
    noFileText: 'Нет файла'
}, _temp2), (_applyDecoratedDescriptor(_class2.prototype, 'handleInputChange', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class2.prototype, 'handleInputChange'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'handleClearClick', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class2.prototype, 'handleClearClick'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'handleButtonClick', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class2.prototype, 'handleButtonClick'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'handleFocus', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class2.prototype, 'handleFocus'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'handleBlur', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class2.prototype, 'handleBlur'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'handleMouseEnter', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class2.prototype, 'handleMouseEnter'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'handleMouseLeave', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class2.prototype, 'handleMouseLeave'), _class2.prototype)), _class2)) || _class) || _class);
exports.default = Attach;
//# sourceMappingURL=attach.js.map
