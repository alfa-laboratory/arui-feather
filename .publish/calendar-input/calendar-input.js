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

var _calendar = require('../calendar/calendar');

var _calendar2 = _interopRequireDefault(_calendar);

var _icon = require('../icon/icon');

var _icon2 = _interopRequireDefault(_icon);

var _input = require('../input/input');

var _input2 = _interopRequireDefault(_input);

var _mq = require('../mq/mq');

var _mq2 = _interopRequireDefault(_mq);

var _popup = require('../popup/popup');

var _popup2 = _interopRequireDefault(_popup);

var _popupHeader = require('../popup-header/popup-header');

var _popupHeader2 = _interopRequireDefault(_popupHeader);

var _cn = require('../cn');

var _cn2 = _interopRequireDefault(_cn);

var _keyboardCode = require('../lib/keyboard-code');

var _keyboardCode2 = _interopRequireDefault(_keyboardCode);

var _modernizr = require('../modernizr');

var _modernizr2 = _interopRequireDefault(_modernizr);

var _window = require('../lib/window');

var _utils = require('./utils');

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
 * NB: В нативном календаре нельзя менять формат даты. Приемлем только YYYY-MM-DD формат.
 * https://www.w3.org/TR/html-markup/input.date.html#input.date.attrs.value
 * https://tools.ietf.org/html/rfc3339#section-5.6
*/
var CUSTOM_DATE_FORMAT = 'DD.MM.YYYY';
var NATIVE_DATE_FORMAT = 'YYYY-MM-DD';
var IS_BROWSER = typeof window !== 'undefined';
var SUPPORTS_INPUT_TYPE_DATE = IS_BROWSER && _modernizr2.default.inputtypes.date;

/**
 * Компонент для ввода даты.
 */
var CalendarInput = (_dec = (0, _cn2.default)('calendar-input', _input2.default, _popup2.default), _dec2 = (0, _performance2.default)(true), _dec(_class = _dec2(_class = (_class2 = (_temp2 = _class3 = function (_React$Component) {
    _inherits(CalendarInput, _React$Component);

    function CalendarInput() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, CalendarInput);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = CalendarInput.__proto__ || Object.getPrototypeOf(CalendarInput)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
            isMobile: false,
            isInputFocused: false,
            isCalendarFocused: false,
            opened: false,
            value: _this.props.defaultValue || '',
            month: (0, _utils.calculateMonth)(_this.props.value, CUSTOM_DATE_FORMAT, _this.props.calendar ? _this.props.calendar.earlierLimit : undefined, _this.props.calendar ? _this.props.calendar.laterLimit : undefined)
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    /**
     * @type {Number}
     */


    /**
     * @type {Number}
     */


    /**
     * @type {Calendar}
     */


    /**
     * @type {Popup}
     */


    /**
     * @type {Input}
     */


    /**
     * @type {HTMLInputElement}
     */


    _createClass(CalendarInput, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            if (this.calendarPopup) {
                var element = void 0;

                if (this.nativeCalendarTarget) {
                    element = this.nativeCalendarTarget;
                } else if (this.customCalendarTarget) {
                    element = this.customCalendarTarget.getBoxNode();
                }

                if (element) {
                    this.calendarPopup.setTarget(element);
                }
            }
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            if (this.timeoutId) {
                clearTimeout(this.timeoutId);
                this.timeoutId = null;
            }
            if (this.changeCloseTimeoutId) {
                clearTimeout(this.changeCloseTimeoutId);
                this.changeCloseTimeoutId = null;
            }
        }
    }, {
        key: 'render',
        value: function render(cn, Input, Popup) {
            var _this2 = this;

            var value = this.props.value !== undefined ? this.props.value : this.state.value;

            var commonProps = {
                disabled: this.props.disabled,
                tabIndex: this.props.tabIndex,
                noValidate: true
            };

            var wrapperProps = this.isMobilePopup() && !this.props.disabled ? {
                role: 'button',
                tabIndex: 0,
                onClick: this.handleMobileWrapperClick
            } : {};

            return _react2.default.createElement(
                'span',
                _extends({
                    className: cn({ width: this.props.width })
                }, wrapperProps),
                _react2.default.createElement(Input, _extends({
                    ref: function ref(customCalendarTarget) {
                        _this2.customCalendarTarget = customCalendarTarget;
                    }
                }, commonProps, {
                    className: cn('custom-control'),
                    disabledAttr: this.isNativeInput() || this.isMobilePopup(),
                    focused: this.state.isInputFocused || this.state.isCalendarFocused,
                    mask: '11.11.1111',
                    size: this.props.size,
                    type: 'text',
                    label: this.props.label,
                    placeholder: this.props.placeholder,
                    hint: this.props.hint,
                    error: this.props.error,
                    value: value,
                    width: this.props.width,
                    id: this.props.id,
                    name: this.props.name,
                    onBlur: this.handleCustomInputBlur,
                    onChange: this.handleCustomInputChange,
                    onFocus: this.handleCustomInputFocus,
                    onKeyDown: this.handleInputKeyDown,
                    icon: this.props.withIcon && _react2.default.createElement(_icon2.default, {
                        size: this.props.size,
                        icon: 'calendar',
                        onClick: this.handleIconClick
                    })
                })),
                _react2.default.createElement(
                    _mq2.default,
                    {
                        query: '--small-only',
                        touch: true,
                        onMatchChange: this.handleMqMatchChange
                    },
                    this.canBeNative() && _react2.default.createElement('input', _extends({
                        ref: function ref(nativeCalendarTarget) {
                            _this2.nativeCalendarTarget = nativeCalendarTarget;
                        }
                    }, commonProps, {
                        className: cn('native-control'),
                        type: 'date',
                        value: (0, _utils.changeDateFormat)(value, CUSTOM_DATE_FORMAT, NATIVE_DATE_FORMAT),
                        onBlur: this.handleNativeInputBlur,
                        onChange: this.handleNativeInputChange,
                        onFocus: this.handleNativeInputFocus
                    }))
                ),
                this.renderPopup(cn, value, Popup)
            );
        }
    }, {
        key: 'renderPopup',
        value: function renderPopup(cn, value, Popup) {
            var _this3 = this;

            var opened = this.props.opened !== undefined ? this.props.opened : this.state.opened;

            return _react2.default.createElement(
                Popup,
                {
                    ref: function ref(calendarPopup) {
                        _this3.calendarPopup = calendarPopup;
                    },
                    'for': this.props.name,
                    autoclosable: true,
                    visible: opened,
                    directions: this.props.directions,
                    target: this.isMobilePopup() ? 'screen' : 'anchor',
                    header: this.isMobilePopup() && this.renderMobileHeader()
                },
                _react2.default.createElement(
                    'div',
                    { className: cn('calendar-wrapper', { mobile: this.isMobilePopup() }) },
                    _react2.default.createElement(_calendar2.default, _extends({
                        ref: function ref(calendar) {
                            _this3.calendar = calendar;
                        },
                        month: this.state.month
                    }, this.props.calendar, {
                        value: (0, _utils.parseDate)(value, CUSTOM_DATE_FORMAT),
                        onBlur: this.handleCalendarBlur,
                        onFocus: this.handleCalendarFocus,
                        onKeyDown: this.handleCalendarKeyDown,
                        onValueChange: this.handleCalendarChange,
                        onMonthChange: this.handleCalendarMonthChange
                    }))
                )
            );
        }
    }, {
        key: 'renderMobileHeader',
        value: function renderMobileHeader() {
            return _react2.default.createElement(_popupHeader2.default, {
                size: this.props.size,
                title: this.props.mobileTitle || this.props.label || 'Выберите дату',
                onCloseClick: this.handlePopupCloseClick
            });
        }
    }, {
        key: 'handleCalendarChange',
        value: function handleCalendarChange(value, formatted, isTriggeredByKeyboard) {
            var _this4 = this;

            if (!isTriggeredByKeyboard) {
                this.changeCloseTimeoutId = setTimeout(function () {
                    _this4.calendar.blur(); // FF не испускает событие `blur` когда элементы становятся невидимыми, делаем это явно
                    _this4.setState({
                        opened: false
                    });
                    _this4.changeCloseTimeoutId = null;
                }, 0);
            }

            this.setState({ value: formatted });

            if (this.props.onCalendarChange) {
                this.props.onCalendarChange(formatted);
            }

            if (this.props.onChange) {
                this.props.onChange(formatted, value);
            }
        }
    }, {
        key: 'handleCalendarMonthChange',
        value: function handleCalendarMonthChange(month) {
            this.setState({
                month: month
            });
        }
    }, {
        key: 'handleCalendarFocus',
        value: function handleCalendarFocus(event) {
            this.changeFocused({ isCalendarFocused: true }, event);
        }
    }, {
        key: 'handleCalendarBlur',
        value: function handleCalendarBlur(event) {
            this.changeFocused({ isCalendarFocused: false }, event);
        }
    }, {
        key: 'handleCalendarKeyDown',
        value: function handleCalendarKeyDown(event) {
            switch (event.which) {
                case _keyboardCode2.default.ESCAPE:
                    event.preventDefault();
                    this.customCalendarTarget.focus();
                    break;
                case _keyboardCode2.default.ENTER:
                case _keyboardCode2.default.SPACE:
                    event.preventDefault();
                    this.setState({
                        opened: false
                    });
                    break;
            }

            if (this.props.onCalendarKeyDown) {
                this.props.onCalendarKeyDown(event);
            }

            if (this.props.onKeyDown) {
                this.props.onKeyDown(event);
            }
        }
    }, {
        key: 'handleIconClick',
        value: function handleIconClick() {
            this.customCalendarTarget.focus();
        }
    }, {
        key: 'handleCustomInputChange',
        value: function handleCustomInputChange(value) {
            var month = (0, _utils.calculateMonth)(value, CUSTOM_DATE_FORMAT, this.props.calendar ? this.props.calendar.earlierLimit : undefined, this.props.calendar ? this.props.calendar.laterLimit : undefined);

            this.setState({ value: value });

            // Изменяет месяц в календаре в соответствии с введёной в поле валидной датой
            if (value && value.length === CUSTOM_DATE_FORMAT.length && month !== this.state.month) {
                this.setState({ month: month });
            }

            if (this.props.onInputChange) {
                this.props.onInputChange(value);
            }

            if (this.props.onChange) {
                this.props.onChange(value, (0, _utils.parseDate)(value, CUSTOM_DATE_FORMAT));
            }
        }
    }, {
        key: 'handleNativeInputChange',
        value: function handleNativeInputChange(event) {
            var value = (0, _utils.changeDateFormat)(event.target.value, NATIVE_DATE_FORMAT, CUSTOM_DATE_FORMAT);

            // Детектим нажатие `сlear` в нативном календаре
            if (this.state.value === value) {
                value = '';
            }

            this.setState({ value: value });

            if (this.props.onInputChange) {
                this.props.onInputChange(value);
            }

            if (this.props.onChange) {
                this.props.onChange(value, (0, _utils.parseDate)(value, CUSTOM_DATE_FORMAT));
            }
        }
    }, {
        key: 'handleCustomInputFocus',
        value: function handleCustomInputFocus(event) {
            this.changeFocused({ isInputFocused: true }, event);

            if (this.props.onInputFocus) {
                this.props.onInputFocus(event);
            }
        }
    }, {
        key: 'handleNativeInputFocus',
        value: function handleNativeInputFocus(event) {
            // Копируем пришедший из аргументов SyntheticEvent для дальнейшего редактирования
            var resultEvent = _extends({}, event, {
                // Трансформируем нативную YYYY-MM-DD дату в кастомный формат на вывод в коллбэках
                target: { value: (0, _utils.changeDateFormat)(event.target.value, NATIVE_DATE_FORMAT, CUSTOM_DATE_FORMAT) }
            });

            this.changeFocused({ isInputFocused: true }, resultEvent);

            if (this.props.onInputFocus) {
                this.props.onInputFocus(resultEvent);
            }
        }
    }, {
        key: 'handleCustomInputBlur',
        value: function handleCustomInputBlur(event) {
            this.changeFocused({ isInputFocused: false }, event);

            if (this.props.onInputBlur) {
                this.props.onInputBlur(event);
            }
        }
    }, {
        key: 'handleNativeInputBlur',
        value: function handleNativeInputBlur(event) {
            // Копируем пришедший из аргументов SyntheticEvent для дальнейшего редактирования
            var resultEvent = _extends({}, event, {
                // Трансформируем нативную YYYY-MM-DD дату в кастомный формат на вывод в коллбэках
                target: { value: (0, _utils.changeDateFormat)(event.target.value, NATIVE_DATE_FORMAT, CUSTOM_DATE_FORMAT) }
            });

            this.changeFocused({ isInputFocused: false }, resultEvent);

            if (this.props.onInputBlur) {
                this.props.onInputBlur(resultEvent);
            }
        }
    }, {
        key: 'handleInputKeyDown',
        value: function handleInputKeyDown(event) {
            switch (event.which) {
                case _keyboardCode2.default.DOWN_ARROW:
                    {
                        event.preventDefault();

                        var value = this.props.value !== undefined ? this.props.value : this.state.value;

                        this.setState({
                            opened: true,
                            month: (0, _utils.calculateMonth)(value, CUSTOM_DATE_FORMAT, this.props.calendar ? this.props.calendar.earlierLimit : undefined, this.props.calendar ? this.props.calendar.laterLimit : undefined)
                        });

                        this.calendar.focus();

                        break;
                    }
                case _keyboardCode2.default.ESCAPE:
                    {
                        event.preventDefault();

                        this.setState({
                            opened: false
                        });

                        break;
                    }
            }

            if (this.props.onInputKeyDown) {
                this.props.onInputKeyDown(event);
            }

            if (this.props.onKeyDown) {
                this.props.onKeyDown(event);
            }
        }
    }, {
        key: 'handleMqMatchChange',
        value: function handleMqMatchChange(isMatched) {
            this.setState({
                isMobile: isMatched
            });
        }
    }, {
        key: 'handleMobileWrapperClick',
        value: function handleMobileWrapperClick() {
            this.setOpened(true);
        }
    }, {
        key: 'handlePopupCloseClick',
        value: function handlePopupCloseClick() {
            this.setOpened(false);
        }

        /**
         * Устанавливает фокус на поле ввода, открывает календарь.
         *
         * @public
         */

    }, {
        key: 'focus',
        value: function focus() {
            var targetRef = this.nativeCalendarTarget || this.customCalendarTarget;

            targetRef.focus();
        }

        /**
         * Убирает фокус с поля ввода.
         *
         * @public
         */

    }, {
        key: 'blur',
        value: function blur() {
            var targetRef = this.nativeCalendarTarget || this.customCalendarTarget;

            targetRef.blur();
        }

        /**
         * Скроллит страницу до поля ввода.
         *
         * @public
         */

    }, {
        key: 'scrollTo',
        value: function scrollTo() {
            this.customCalendarTarget.scrollTo();
        }
    }, {
        key: 'canBeNative',
        value: function canBeNative() {
            return SUPPORTS_INPUT_TYPE_DATE && this.props.mobileMode === 'native';
        }
    }, {
        key: 'isNativeInput',
        value: function isNativeInput() {
            return this.state.isMobile && this.canBeNative();
        }
    }, {
        key: 'isMobilePopup',
        value: function isMobilePopup() {
            return this.state.isMobile && this.props.mobileMode === 'popup';
        }
    }, {
        key: 'changeFocused',
        value: function changeFocused(focusedState, event) {
            var newState = _extends({
                isInputFocused: this.state.isInputFocused,
                isCalendarFocused: this.state.isCalendarFocused
            }, focusedState);

            // При переключении фокуса с поля ввода на календарь событие `blur` у поля ввода иногда происходит перед фокусом календаря
            // Поэтому проверяем элемент который получит фокус после блюра и если он внутри календаря - оставляем сфокусированное состояние.
            var relatedTarget = event.relatedTarget || // не поддерживается в FF и IE10 https://github.com/facebook/react/issues/2011
            event.explicitOriginalTarget || // не поддерживается в IE
            document.activeElement; // В IE вернет не <calendar> а конкретную ноду, на которую пришел фокус

            var calendarWillReceiveFocus = !(0, _window.isNodeOutsideElement)(relatedTarget, this.calendar.getNode());

            var newFocused = newState.isInputFocused || newState.isCalendarFocused || calendarWillReceiveFocus;

            this.setState(focusedState);

            var newOpened = false;

            if (newFocused) {
                if (this.props.onFocus) {
                    this.props.onFocus(event);
                }

                newOpened = true;
            } else if (this.props.onBlur) {
                this.props.onBlur(event);
            }

            if (!this.isNativeInput()) {
                this.setOpened(newOpened);
            }
        }
    }, {
        key: 'setOpened',
        value: function setOpened(opened) {
            var _this5 = this;

            if (this.timeoutId) {
                clearTimeout(this.timeoutId);
            }
            this.timeoutId = setTimeout(function () {
                var value = _this5.props.value !== undefined ? _this5.props.value : _this5.state.value;

                var newMonth = _this5.state.opened !== opened ? (0, _utils.calculateMonth)(value, CUSTOM_DATE_FORMAT, _this5.props.calendar ? _this5.props.calendar.earlierLimit : undefined, _this5.props.calendar ? _this5.props.calendar.laterLimit : undefined) : _this5.state.month;

                _this5.setState({
                    opened: opened,
                    month: newMonth
                });

                _this5.timeoutId = null;
            }, 0);
        }
    }]);

    return CalendarInput;
}(_react2.default.Component), _class3.propTypes = {
    /** Содержимое поля ввода */
    value: _propTypes2.default.string,
    /** Содержимое поля ввода, указанное по умолчанию */
    defaultValue: _propTypes2.default.string,
    /** Свойства компонента [Calendar](../calendar/) */
    calendar: _propTypes2.default.shape({
        value: _propTypes2.default.number,
        selectedFrom: _propTypes2.default.number,
        selectedTo: _propTypes2.default.number,
        earlierLimit: _propTypes2.default.number,
        laterLimit: _propTypes2.default.number,
        month: _propTypes2.default.number,
        onValueChange: _propTypes2.default.func,
        onMonthChange: _propTypes2.default.func,
        outputFormat: _propTypes2.default.string,
        months: _propTypes2.default.arrayOf(_propTypes2.default.string),
        weekdays: _propTypes2.default.arrayOf(_propTypes2.default.string),
        offDays: _propTypes2.default.arrayOf(_propTypes2.default.number),
        showArrows: _propTypes2.default.bool,
        isKeyboard: _propTypes2.default.bool,
        error: _propTypes2.default.node,
        theme: _propTypes2.default.oneOf(['alfa-on-color', 'alfa-on-white']),
        className: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.string]),
        onKeyDown: _propTypes2.default.func,
        onKeyUp: _propTypes2.default.func,
        onFocus: _propTypes2.default.func,
        onBlur: _propTypes2.default.func
    }),
    /** Управление возможностью раскрытия календаря */
    opened: _propTypes2.default.bool,
    /** Управление возможностью компонента занимать всю ширину родителя */
    width: _propTypes2.default.oneOf(['default', 'available']),
    /** Направления, в которые может открываться попап компонента */
    directions: _propTypes2.default.arrayOf(_propTypes2.default.oneOf(['anchor', 'top-left', 'top-center', 'top-right', 'left-top', 'left-center', 'left-bottom', 'right-top', 'right-center', 'right-bottom', 'bottom-left', 'bottom-center', 'bottom-right'])),
    /** Управление возможностью изменения значения компонента */
    disabled: _propTypes2.default.bool,
    /** Размер компонента */
    size: _propTypes2.default.oneOf(['s', 'm', 'l', 'xl']),
    /** Последовательность перехода между контролами при нажатии на Tab */
    tabIndex: _propTypes2.default.number,
    /** Показывать иконку календаря в инпуте */
    withIcon: _propTypes2.default.bool,
    /** Лейбл для поля */
    label: _propTypes2.default.node,
    /** Подсказка в поле */
    placeholder: _propTypes2.default.string,
    /** Подсказка под полем */
    hint: _propTypes2.default.node,
    /** Отображение ошибки */
    error: _propTypes2.default.node,
    /** Управление нативным режимом на мобильных устройствах */
    mobileMode: _propTypes2.default.oneOf(['native', 'popup']),
    /** Подсказка над меню в мобильном режиме */
    mobileTitle: _propTypes2.default.node,
    /** Идентификатор компонента в DOM */
    id: _propTypes2.default.string,
    /** Имя компонента в DOM */
    name: _propTypes2.default.string,
    /** Тема компонента */
    theme: _propTypes2.default.oneOf(['alfa-on-color', 'alfa-on-white']),
    /** Обработчик установки фокуса на компонент */
    onFocus: _propTypes2.default.func,
    /** Обработчик снятия фокуса с компонента */
    onBlur: _propTypes2.default.func,
    /** Обработчик установки фокуса на поле ввода */
    onInputFocus: _propTypes2.default.func,
    /** Обработчик снятия фокуса с поля ввода */
    onInputBlur: _propTypes2.default.func,
    /** Обработчик ввода даты в текстовом поле */
    onInputChange: _propTypes2.default.func,
    /** Обработчик выбора даты в календаре */
    onCalendarChange: _propTypes2.default.func,
    /** Обрабочик изменения даты в календаре */
    onChange: _propTypes2.default.func,
    /** Обработчик события нажатия на клавишу в момент, когда фокус находится на компоненте */
    onKeyDown: _propTypes2.default.func,
    /** Обработчик события нажатия на клавишу клавиатуры в момент, когда фокус находится в календаре */
    onCalendarKeyDown: _propTypes2.default.func,
    /** Обработчик события нажатия на клавишу клавиатуры в момент, когда фокус находится на текстовом поле */
    onInputKeyDown: _propTypes2.default.func
}, _class3.defaultProps = {
    withIcon: true,
    directions: ['bottom-left', 'bottom-right', 'top-left', 'top-right'],
    placeholder: '00.00.0000',
    mobileMode: 'native'
}, _temp2), (_applyDecoratedDescriptor(_class2.prototype, 'handleCalendarChange', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class2.prototype, 'handleCalendarChange'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'handleCalendarMonthChange', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class2.prototype, 'handleCalendarMonthChange'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'handleCalendarFocus', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class2.prototype, 'handleCalendarFocus'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'handleCalendarBlur', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class2.prototype, 'handleCalendarBlur'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'handleCalendarKeyDown', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class2.prototype, 'handleCalendarKeyDown'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'handleIconClick', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class2.prototype, 'handleIconClick'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'handleCustomInputChange', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class2.prototype, 'handleCustomInputChange'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'handleNativeInputChange', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class2.prototype, 'handleNativeInputChange'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'handleCustomInputFocus', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class2.prototype, 'handleCustomInputFocus'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'handleNativeInputFocus', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class2.prototype, 'handleNativeInputFocus'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'handleCustomInputBlur', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class2.prototype, 'handleCustomInputBlur'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'handleNativeInputBlur', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class2.prototype, 'handleNativeInputBlur'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'handleInputKeyDown', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class2.prototype, 'handleInputKeyDown'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'handleMqMatchChange', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class2.prototype, 'handleMqMatchChange'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'handleMobileWrapperClick', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class2.prototype, 'handleMobileWrapperClick'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'handlePopupCloseClick', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class2.prototype, 'handlePopupCloseClick'), _class2.prototype)), _class2)) || _class) || _class);
exports.default = CalendarInput;
//# sourceMappingURL=calendar-input.js.map
