'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _dec2, _class, _desc, _value, _class2, _class3, _temp2; /* This Source Code Form is subject to the terms of the Mozilla Public
                                                                   * License, v. 2.0. If a copy of the MPL was not distributed with this
                                                                   * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/* eslint jsx-a11y/no-static-element-interactions: 0 */

var _coreDecorators = require('core-decorators');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _difference_in_months = require('date-fns/difference_in_months');

var _difference_in_months2 = _interopRequireDefault(_difference_in_months);

var _difference_in_milliseconds = require('date-fns/difference_in_milliseconds');

var _difference_in_milliseconds2 = _interopRequireDefault(_difference_in_milliseconds);

var _start_of_day = require('date-fns/start_of_day');

var _start_of_day2 = _interopRequireDefault(_start_of_day);

var _start_of_month = require('date-fns/start_of_month');

var _start_of_month2 = _interopRequireDefault(_start_of_month);

var _add_days = require('date-fns/add_days');

var _add_days2 = _interopRequireDefault(_add_days);

var _add_years = require('date-fns/add_years');

var _add_years2 = _interopRequireDefault(_add_years);

var _sub_years = require('date-fns/sub_years');

var _sub_years2 = _interopRequireDefault(_sub_years);

var _format = require('date-fns/format');

var _format2 = _interopRequireDefault(_format);

var _is_same_month = require('date-fns/is_same_month');

var _is_same_month2 = _interopRequireDefault(_is_same_month);

var _lodash = require('lodash.sortedindexof');

var _lodash2 = _interopRequireDefault(_lodash);

var _cn = require('../cn');

var _cn2 = _interopRequireDefault(_cn);

var _keyboardCode = require('../lib/keyboard-code');

var _keyboardCode2 = _interopRequireDefault(_keyboardCode);

var _performance = require('../performance');

var _performance2 = _interopRequireDefault(_performance);

var _dateUtils = require('../lib/date-utils');

var _window = require('../lib/window');

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

var DAYS_IN_WEEK = 7;
var ATTR_DAY = 'data-day';
var ATTR_STEP_SIZE = 'data-step';
var ATTR_DISABLED = 'data-disabled';

/**
 * Компонент календаря.
 */
var Calendar = (_dec = (0, _cn2.default)('calendar'), _dec2 = (0, _performance2.default)(true), _dec(_class = _dec2(_class = (_class2 = (_temp2 = _class3 = function (_React$Component) {
    _inherits(Calendar, _React$Component);

    function Calendar() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Calendar);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Calendar.__proto__ || Object.getPrototypeOf(Calendar)).call.apply(_ref, [this].concat(args))), _this), _this.blurTimeoutId = null, _temp), _possibleConstructorReturn(_this, _ret);
    }

    /**
     * @type {HTMLDivElement}
     */


    /**
     * @type {Number}
     */


    _createClass(Calendar, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            this.prepareData();
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            this.prepareData(nextProps);
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            if (this.blurTimeoutId) {
                clearTimeout(this.blurTimeoutId);
                this.blurTimeoutId = null;
            }
        }
    }, {
        key: 'render',
        value: function render(cn) {
            var _this2 = this;

            var rows = [];
            rows.push(this.renderShortWeekdays(cn));
            rows = rows.concat(this.renderMonth(cn));

            return _react2.default.createElement(
                'div',
                {
                    ref: function ref(root) {
                        _this2.root = root;
                    },
                    className: cn,
                    role: 'grid',
                    tabIndex: '0',
                    onBlur: this.handleBlur,
                    onFocus: this.handleFocus,
                    onKeyDown: this.props.isKeyboard && this.handleKeyDown,
                    onKeyUp: this.props.isKeyboard && this.handleKeyUp
                },
                this.renderTitle(cn),
                _react2.default.createElement(
                    'table',
                    { className: cn('layout') },
                    _react2.default.createElement(
                        'tbody',
                        null,
                        rows.map(function (row, index) {
                            return _react2.default.createElement(
                                'tr',
                                {
                                    className: cn('row'),
                                    key: 'row_' + (index + 1)
                                },
                                row
                            );
                        })
                    )
                )
            );
        }
    }, {
        key: 'renderTitle',
        value: function renderTitle(cn) {
            var month = new Date(this.state.month);
            var isPrevMonthEnabled = !this.earlierLimit || (0, _difference_in_months2.default)(month, (0, _start_of_month2.default)(this.earlierLimit)) > 0;
            var isNextMonthEnabled = !this.laterLimit || (0, _difference_in_months2.default)(month, this.laterLimit) < 0;
            var prevYearEarlierLimit = this.earlierLimit && (0, _add_years2.default)(this.earlierLimit, 1);
            var isPrevYearEnabled = !this.earlierLimit || (0, _difference_in_months2.default)(month, prevYearEarlierLimit) >= 0;
            var nextYearLaterLimit = this.laterLimit && (0, _sub_years2.default)(this.laterLimit, 1);
            var isNextYearEnabled = !this.laterLimit || (0, _difference_in_months2.default)(month, nextYearLaterLimit) <= 0;

            return _react2.default.createElement(
                'div',
                { className: cn('title') },
                this.props.showArrows && _react2.default.createElement('div', {
                    className: cn('arrow', {
                        direction: 'left',
                        double: true,
                        disabled: !isPrevYearEnabled
                    }),
                    'data-step': '-12',
                    'data-disabled': !isPrevMonthEnabled,
                    onClick: this.handleArrowClick
                }),
                this.props.showArrows && _react2.default.createElement('div', {
                    className: cn('arrow', {
                        direction: 'left',
                        disabled: !isPrevMonthEnabled
                    }),
                    'data-step': '-1',
                    'data-disabled': !isPrevMonthEnabled,
                    onClick: this.handleArrowClick
                }),
                this.props.showArrows && _react2.default.createElement('div', {
                    className: cn('arrow', {
                        direction: 'right',
                        double: true,
                        disabled: !isNextYearEnabled
                    }),
                    'data-step': '12',
                    'data-disabled': !isNextMonthEnabled,
                    onClick: this.handleArrowClick
                }),
                this.props.showArrows && _react2.default.createElement('div', {
                    className: cn('arrow', {
                        direction: 'right',
                        disabled: !isNextMonthEnabled
                    }),
                    'data-step': '1',
                    'data-disabled': !isNextMonthEnabled,
                    onClick: this.handleArrowClick
                }),
                _react2.default.createElement(
                    'div',
                    { className: cn('name') },
                    this.props.months[month.getMonth()] + ' ' + month.getFullYear()
                )
            );
        }
    }, {
        key: 'renderShortWeekdays',
        value: function renderShortWeekdays(cn) {
            return this.props.weekdays.map(function (weekdayName, index) {
                return _react2.default.createElement(
                    'th',
                    {
                        className: cn('dayname', { type: index > 4 ? 'weekend' : false }),
                        key: weekdayName
                    },
                    weekdayName
                );
            });
        }
    }, {
        key: 'renderMonth',
        value: function renderMonth(cn) {
            var _this3 = this;

            return this.calculateWeeks().map(function (week) {
                return _this3.renderWeek(cn, week);
            });
        }
    }, {
        key: 'renderWeek',
        value: function renderWeek(cn, week) {
            var _this4 = this;

            return week.map(function (day, index) {
                var off = !_this4.isValidDate(day);
                var val = _this4.value;
                var weekend = index > 4;
                var mods = {};
                if (day) {
                    var isSameDate = val && val.getTime() === day.getTime();
                    var isBetweenPeriod = _this4.selectedFrom && _this4.selectedTo && _this4.selectedFrom <= day && _this4.selectedTo >= day;

                    if (off || weekend) {
                        if (weekend) {
                            mods.type = off ? 'weekend-off' : 'weekend';
                        } else {
                            mods.type = 'off';
                        }
                    }

                    if (isSameDate || isBetweenPeriod) {
                        mods.state = 'current';
                    }
                }

                var dataDay = day && !off ? day.getTime() : null;

                return _react2.default.createElement(
                    'td',
                    {
                        className: cn('day', mods),
                        'data-day': dataDay,
                        key: day || 'day_' + (index + 1),
                        role: 'gridcell',
                        onClick: _this4.handleDayClick
                    },
                    day ? day.getDate() : ''
                );
            });
        }
    }, {
        key: 'handleDayClick',
        value: function handleDayClick(event) {
            var day = event.target.attributes[ATTR_DAY];
            if (day) {
                this.performChange(parseInt(day.nodeValue, 10));
            }
        }
    }, {
        key: 'handleFocus',
        value: function handleFocus(event) {
            if (this.blurTimeoutId) {
                clearTimeout(this.blurTimeoutId);
                this.blurTimeoutId = null;
            }

            if (this.props.onFocus) {
                this.props.onFocus(event);
            }
        }
    }, {
        key: 'handleBlur',
        value: function handleBlur(event) {
            var _this5 = this;

            event.persist();
            if (this.blurTimeoutId) {
                clearTimeout(this.blurTimeoutId);
            }

            this.blurTimeoutId = setTimeout(function () {
                if ((0, _window.isNodeOutsideElement)(document.activeElement, _this5.root) && _this5.props.onBlur) {
                    _this5.props.onBlur(event);
                }
                _this5.blurTimeoutId = null;
            }, 0);
        }
    }, {
        key: 'handleArrowClick',
        value: function handleArrowClick(event) {
            if (event.currentTarget.attributes[ATTR_DISABLED].nodeValue === 'true') {
                return;
            }

            var stepSize = event.currentTarget.attributes[ATTR_STEP_SIZE].nodeValue;
            var step = parseInt(stepSize, 10);
            var newMonth = new Date(this.state.month);
            newMonth.setMonth(newMonth.getMonth() + step);

            if (this.props.onMonthChange) {
                this.props.onMonthChange(newMonth.valueOf());
            } else {
                this.setState({
                    month: newMonth.valueOf()
                });
            }
        }
    }, {
        key: 'handleKeyDown',
        value: function handleKeyDown(event) {
            switch (event.which) {
                case _keyboardCode2.default.DOWN_ARROW:
                    {
                        event.preventDefault();
                        this.performChangeWithShift(7, true);
                        break;
                    }
                case _keyboardCode2.default.UP_ARROW:
                    event.preventDefault();
                    this.performChangeWithShift(-7, true);
                    break;
                case _keyboardCode2.default.LEFT_ARROW:
                    {
                        event.preventDefault();
                        this.performChangeWithShift(-1, true);
                        break;
                    }
                case _keyboardCode2.default.RIGHT_ARROW:
                    {
                        event.preventDefault();
                        this.performChangeWithShift(1, true);
                        break;
                    }
            }

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

        /**
         * Устанавливает фокус на календарь.
         *
         * @public
         */

    }, {
        key: 'focus',
        value: function focus() {
            this.root.focus();
        }

        /**
         * Убирает фокус с календаря.
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
         * Возвращает `true`, если переданная дата является валидной,
         * попадает в заданные лимиты календаря и не является выходным днем.
         *
         * @param {Date|Number} value Дата для проверки
         * @returns {Boolean}
         */

    }, {
        key: 'isValidDate',
        value: function isValidDate(value) {
            if (!value) {
                return false;
            }

            if (!(value instanceof Date) || !isFinite(value.valueOf())) {
                return false;
            }

            return !(this.earlierLimit && this.earlierLimit > value || this.laterLimit && this.laterLimit < value || this.isOffDay(value));
        }

        /**
         * Возвращает `true`, если переданная дата является выходным днем.
         *
         * @param {Data|Number} date Дата для проверки
         * @returns {Boolean}
         */

    }, {
        key: 'isOffDay',
        value: function isOffDay(date) {
            if (this.props.offDays && this.props.offDays.length) {
                var timestamp = date.valueOf();

                // Поскольку offDays - отсортирован, используем бинарный поиск, O(log n) против O(n) для обычного поиска
                return (0, _lodash2.default)(this.props.offDays, timestamp) !== -1;
            }

            return false;
        }

        /**
         * Генерирует событие, что значие даты изменилось.
         *
         * @param {Number} timestamp Дата
         * @param {Boolean} [isTriggeredByKeyboard=false] Флаг, что событие произошло из-за нажатия пользователем кнопки на клавиатуре
         */

    }, {
        key: 'performChange',
        value: function performChange(timestamp, isTriggeredByKeyboard) {
            if (!this.props.onValueChange) {
                return;
            }

            var date = new Date(timestamp);
            if (!this.isValidDate(date)) {
                return;
            }

            this.props.onValueChange(timestamp, (0, _format2.default)(date, this.props.outputFormat), isTriggeredByKeyboard);
        }

        /**
         * Генерирует событие, что значение даты изменилось на переданной число дней.
         *
         * @param {Number} dayShift Смещение текущей даты в днях.
         * @param {Boolean} [isTriggeredByKeyboard=false] Флаг, что событие произошло из-за нажатия пользователем кнопки на клавиатуре
         */

    }, {
        key: 'performChangeWithShift',
        value: function performChangeWithShift(dayShift, isTriggeredByKeyboard) {
            if (!this.ensureValueInLimits(dayShift)) {
                return;
            }

            var value = this.value;
            while (this.isOffDay((0, _add_days2.default)(value, dayShift))) {
                dayShift += Math.abs(dayShift) / dayShift;
            }

            if (!this.value) {
                this.performChange(this.state.month, true);
            } else {
                var shiftedValue = (0, _add_days2.default)(value, dayShift);
                this.performChange(shiftedValue.valueOf(), isTriggeredByKeyboard);

                if (this.props.onMonthChange && !(0, _is_same_month2.default)(shiftedValue, value)) {
                    this.props.onMonthChange(shiftedValue.valueOf());
                }
            }
        }
    }, {
        key: 'ensureValueInLimits',
        value: function ensureValueInLimits(dayShift) {
            var shiftedDay = (0, _add_days2.default)(this.value, dayShift);

            return (!this.earlierLimit || (0, _difference_in_milliseconds2.default)(shiftedDay, this.earlierLimit) >= 0) && (!this.laterLimit || (0, _difference_in_milliseconds2.default)(shiftedDay, this.laterLimit) <= 0);
        }
    }, {
        key: 'calculateWeeks',
        value: function calculateWeeks() {
            var weekDay = void 0;
            var weeks = [];
            var lastDay = 6;
            var month = new Date(this.state.month);
            var dateIterator = new Date(this.state.month);

            // Далее я использую map для обхода массива, но при создании через new Array(DAYS_IN_WEEK);
            // map не вызывает колбек, для ключей, к которым не были приассигнены значения
            // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
            // соответственно пропадают undefined значения, поэтому:
            var week = new Array(DAYS_IN_WEEK).fill(null);

            for (dateIterator.setDate(1); dateIterator.getMonth() === month.getMonth(); dateIterator.setDate(dateIterator.getDate() + 1)) {
                weekDay = (0, _dateUtils.getRussianWeekDay)(dateIterator); // Получаем 0 - пн, 1 - вт, и т.д.

                week[weekDay] = new Date(dateIterator.getTime());

                if (weekDay === lastDay) {
                    weeks.push(week);
                    week = new Array(DAYS_IN_WEEK).fill(null);
                }
            }

            if (weekDay !== lastDay) {
                weeks.push(week);
            }

            return weeks;
        }
    }, {
        key: 'prepareData',
        value: function prepareData(nextProps) {
            var isInitializing = false;
            if (!nextProps) {
                nextProps = this.props;
                isInitializing = true;
            }

            if (isInitializing || this.props.value !== nextProps.value) {
                if (nextProps.value) {
                    this.value = (0, _start_of_day2.default)((0, _dateUtils.normalizeDate)(nextProps.value));
                } else {
                    this.value = null;
                }
            }

            var month = void 0;
            if (nextProps.month) {
                month = (0, _dateUtils.normalizeDate)(nextProps.month);
            } else if (this.value) {
                month = new Date(this.value.valueOf());
            } else {
                month = new Date();
            }
            this.setState({ month: (0, _start_of_month2.default)(month) });

            if (isInitializing || this.props.earlierLimit !== nextProps.earlierLimit) {
                this.earlierLimit = nextProps.earlierLimit ? (0, _dateUtils.normalizeDate)(nextProps.earlierLimit) : null;

                if (this.earlierLimit) {
                    this.earlierLimit = (0, _start_of_day2.default)(this.earlierLimit);
                    if (this.value) {
                        var maxTimestamp = Math.max(this.value.valueOf(), this.earlierLimit.valueOf());
                        this.value = new Date(maxTimestamp);
                    }
                }
            }

            if (isInitializing || this.props.laterLimit !== nextProps.laterLimit) {
                this.laterLimit = nextProps.laterLimit ? (0, _dateUtils.normalizeDate)(nextProps.laterLimit) : null;

                if (this.laterLimit) {
                    this.laterLimit = (0, _start_of_day2.default)(this.laterLimit);
                    if (this.value) {
                        var minTimestamp = Math.min(this.value.valueOf(), this.laterLimit.valueOf());
                        this.value = new Date(minTimestamp);
                    }
                }
            }

            if (isInitializing || this.props.selectedTo !== nextProps.selectedTo) {
                this.selectedFrom = nextProps.selectedTo ? (0, _dateUtils.normalizeDate)(nextProps.selectedTo) : null;
            }

            if (isInitializing || this.props.selectedFrom !== nextProps.selectedFrom) {
                this.selectedFrom = nextProps.selectedFrom ? (0, _dateUtils.normalizeDate)(nextProps.selectedFrom) : null;
            }
        }
    }]);

    return Calendar;
}(_react2.default.Component), _class3.propTypes = {
    /** Выбранная дата, в формате unix timestamp */
    value: _propTypes2.default.number,
    /** Левая граница диапазона дат, в формате unix timestamp */
    selectedFrom: _propTypes2.default.number,
    /** Правая граница диапазона дат, в формате unix timestamp */
    selectedTo: _propTypes2.default.number,
    /** Левая граница дат, возможных для выбора, в формате unix timestamp */
    earlierLimit: _propTypes2.default.number,
    /** Правая граница дат, возможных для выбора, в формате unix timestamp */
    laterLimit: _propTypes2.default.number,
    /** Месяц, в формате unix timestamp */
    month: _propTypes2.default.number,
    /** Обработчик смены даты */
    onValueChange: _propTypes2.default.func,
    /** Обработчик смены месяца */
    onMonthChange: _propTypes2.default.func,
    /** Тип форматирования даты при выводе */
    outputFormat: _propTypes2.default.string,
    /** Список названий месяцев */
    months: _propTypes2.default.arrayOf(_propTypes2.default.string),
    /** Список названий дней недели */
    weekdays: _propTypes2.default.arrayOf(_propTypes2.default.string),
    /** Список выходных дней в виде unix timestamp, отсортированный по возрастанию */
    offDays: _propTypes2.default.arrayOf(_propTypes2.default.number),
    /** Отображение стрелок навигации по месяцам */
    showArrows: _propTypes2.default.bool,
    /** Возможность управления календарём с клавиатуры */
    isKeyboard: _propTypes2.default.bool,
    /** Тема компонента */
    theme: _propTypes2.default.oneOf(['alfa-on-color', 'alfa-on-white']),
    /** Дополнительный класс */
    className: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.string]),
    /** Обработчик события нажатия на клавишу клавиатуры в момент, когда фокус находится на компоненте */
    onKeyDown: _propTypes2.default.func,
    /** Обработчик события отжатия на клавишу клавиатуры в момент, когда фокус находится на компоненте */
    onKeyUp: _propTypes2.default.func,
    /** Обработчик фокуса */
    onFocus: _propTypes2.default.func,
    /** Обработчик снятия фокуса */
    onBlur: _propTypes2.default.func
}, _class3.defaultProps = {
    selectedFrom: null,
    selectedTo: null,
    outputFormat: 'DD.MM.YYYY',
    weekdays: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
    months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
    offDays: [],
    showArrows: true,
    isKeyboard: true
}, _temp2), (_applyDecoratedDescriptor(_class2.prototype, 'handleDayClick', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class2.prototype, 'handleDayClick'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'handleFocus', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class2.prototype, 'handleFocus'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'handleBlur', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class2.prototype, 'handleBlur'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'handleArrowClick', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class2.prototype, 'handleArrowClick'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'handleKeyDown', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class2.prototype, 'handleKeyDown'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'handleKeyUp', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class2.prototype, 'handleKeyUp'), _class2.prototype)), _class2)) || _class) || _class);
exports.default = Calendar;
//# sourceMappingURL=calendar.js.map
