/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/* eslint-disable jsx-a11y/click-events-have-key-events */

import React from 'react';
import Type from 'prop-types';

import differenceInMonths from 'date-fns/difference_in_months';
import differenceInMilliseconds from 'date-fns/difference_in_milliseconds';
import startOfDay from 'date-fns/start_of_day';
import startOfMonth from 'date-fns/start_of_month';
import addDays from 'date-fns/add_days';
import addYears from 'date-fns/add_years';
import subtractYears from 'date-fns/sub_years';
import formatDate from 'date-fns/format';
import isSameMonth from 'date-fns/is_same_month';
import setMonth from 'date-fns/set_month';
import setYear from 'date-fns/set_year';
import sortedIndexOf from 'lodash.sortedindexof';

import cn from '../cn';
import keyboardCode from '../lib/keyboard-code';
import performance from '../performance';
import { isCurrentDay, getYearsRange } from './utils';
import { normalizeDate, getRussianWeekDay } from '../lib/date-utils';
import { isNodeOutsideElement } from '../lib/window';

const DAYS_IN_WEEK = 7;
const EARLY_YEARS_LIMIT = 100;
const LATER_YEARS_LIMIT = 1;

/**
 * Компонент календаря.
 */
@cn('calendar')
@performance(true)
class Calendar extends React.Component {
    static propTypes = {
        /** Выбранная дата, в формате unix timestamp */
        value: Type.number,
        /** Левая граница диапазона дат, в формате unix timestamp */
        selectedFrom: Type.number,
        /** Правая граница диапазона дат, в формате unix timestamp */
        selectedTo: Type.number,
        /** Левая граница дат, возможных для выбора, в формате unix timestamp */
        earlierLimit: Type.number,
        /** Правая граница дат, возможных для выбора, в формате unix timestamp */
        laterLimit: Type.number,
        /** Месяц, в формате unix timestamp */
        month: Type.number,
        /**
         * Обработчик смены даты
         * @param {number} timestamp
         * @param {string} dateString
         * @param {boolean} isTriggeredByKeyboard
         */
        onValueChange: Type.func,
        /**
         * Обработчик смены месяца
         * @param {number} month
         */
        onMonthChange: Type.func,
        /** Тип форматирования даты при выводе */
        outputFormat: Type.string,
        /** Список названий месяцев */
        months: Type.arrayOf(Type.string),
        /** Список названий дней недели */
        weekdays: Type.arrayOf(Type.string),
        /** Список выходных дней в виде unix timestamp, отсортированный по возрастанию */
        offDays: Type.arrayOf(Type.number),
        /** Список дней с событиями в виде unix timestamp, отсортированный по возрастанию */
        eventDays: Type.arrayOf(Type.number),
        /** Отображение текущей даты */
        showToday: Type.bool,
        /** Отображение стрелок навигации по месяцам */
        showArrows: Type.bool,
        /** Возможность управления календарём с клавиатуры */
        isKeyboard: Type.bool,
        /** Управление шириной календаря. При значении 'available' растягивает кнопку на ширину родителя */
        width: Type.oneOf(['default', 'available']),
        /** Тема компонента */
        theme: Type.oneOf(['alfa-on-color', 'alfa-on-white']),
        /** Дополнительный класс */
        className: Type.string,
        /** Идентификатор компонента в DOM */
        id: Type.string,
        /**
         * Обработчик события нажатия на клавишу клавиатуры в момент, когда фокус находится на компоненте
         * @param {React.KeyboardEvent} event
         */
        onKeyDown: Type.func,
        /**
         * Обработчик события отжатия на клавишу клавиатуры в момент, когда фокус находится на компоненте
         * @param {React.KeyboardEvent} event
         */
        onKeyUp: Type.func,
        /**
         * Обработчик фокуса
         * @param {React.FocusEvent} event
         */
        onFocus: Type.func,
        /**
         * Обработчик снятия фокуса
         * @param {React.FocusEvent} event
         */
        onBlur: Type.func,
        /** Идентификатор для систем автоматизированного тестирования */
        'data-test-id': Type.string
    };

    static defaultProps = {
        selectedFrom: null,
        selectedTo: null,
        outputFormat: 'DD.MM.YYYY',
        weekdays: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
        months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
            'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
        offDays: [],
        eventDays: [],
        showToday: false,
        showArrows: true,
        isKeyboard: true
    };

    state = {
        month: startOfMonth(new Date())
    };

    /**
     * @type {HTMLDivElement}
     */
    root;

    /**
     * @type {Number}
     */
    blurTimeoutId = null;

    /**
     * @type {Array}
     */
    years = [];

    componentWillMount() {
        this.prepareData();
    }

    componentWillReceiveProps(nextProps) {
        this.prepareData(nextProps);
    }

    componentWillUnmount() {
        if (this.blurTimeoutId) {
            clearTimeout(this.blurTimeoutId);
            this.blurTimeoutId = null;
        }
    }

    render(cn) {
        return (
            <div
                ref={ (root) => {
                    this.root = root;
                } }
                className={ cn({ width: this.props.width }) }
                id={ this.props.id }
                role='grid'
                tabIndex='0'
                onBlur={ this.handleBlur }
                onFocus={ this.handleFocus }
                onKeyDown={ this.props.isKeyboard && this.handleKeyDown }
                onKeyUp={ this.props.isKeyboard && this.handleKeyUp }
                data-test-id={ this.props['data-test-id'] }
            >
                { this.renderTitle(cn) }
                { this.renderContent(cn) }
            </div>
        );
    }

    renderTitle(cn) {
        const month = new Date(this.state.month);
        const isPrevMonthEnabled = !this.earlierLimit ||
            differenceInMonths(month, startOfMonth(this.earlierLimit)) > 0;
        const isNextMonthEnabled = !this.laterLimit ||
            differenceInMonths(month, this.laterLimit) < 0;

        return (
            <div className={ cn('title') }>
                {
                    this.props.showArrows && !this.state.isMonthSelection && !this.state.isYearSelection && (
                    <div
                        className={
                            cn('arrow', {
                                direction: 'left',
                                disabled: !isPrevMonthEnabled
                            })
                        }
                        data-step='-1'
                        data-disabled={ !isPrevMonthEnabled }
                        role='button'
                        tabIndex='0'
                        onClick={ this.handleArrowClick }
                    />
                  )
                }
                {
                    this.props.showArrows && !this.state.isMonthSelection && !this.state.isYearSelection && (
                    <div
                        className={
                            cn('arrow', {
                                direction: 'right',
                                disabled: !isNextMonthEnabled
                            })
                        }
                        data-step='1'
                        data-disabled={ !isNextMonthEnabled }
                        role='button'
                        tabIndex='0'
                        onClick={ this.handleArrowClick }
                    />
                  )
                }
                <div className={ cn('select-buttons') }>
                    <div
                        className={
                                cn('name', {
                                    month: true
                                })
                            }
                        role='button'
                        tabIndex='0'
                        onClick={ this.handleMonthClick }
                    >
                        <div className={ cn('select-text') }>{ `${this.props.months[month.getMonth()]}` }</div>
                        <div className={ cn('select-arrows') } />
                    </div>
                    <div
                        className={
                                cn('name', {
                                    year: true
                                })
                            }
                        role='button'
                        tabIndex='0'
                        onClick={ this.handleYearClick }
                    >
                        <div className={ cn('select-text') }>{ `${month.getFullYear()}` }</div>
                        <div className={ cn('select-arrows') } />
                    </div>
                </div>
            </div>
        );
    }

    handleMonthClick = () => {
        this.setState((prevState) => ({
            isMonthSelection: !prevState.isMonthSelection,
            isYearSelection: false
        }));
    };

    handleYearClick = () => {
        this.setState((prevState) => ({
            isMonthSelection: false,
            isYearSelection: !prevState.isYearSelection
        }));
    };

    renderContent(cn) {
        return (
            <>
                { this.state.isMonthSelection ? this.renderMonths(cn) : null }
                { this.state.isYearSelection ? this.renderYears(cn) : null }
                { this.renderDays(cn) }
            </>
        );
    }

    renderMonths(cn) {
        return (
            <div className={ cn('wrapper') }>
                <div className={ cn('months') }>
                    {
                        this.props.months.map((month, index) => {
                            const newMonth = setMonth(this.state.month, index);
                            const off = !this.isValidDate(startOfMonth(newMonth));
                            const selectedDate = new Date(this.state.month);
                            const isSameMonth = selectedDate && selectedDate.getMonth() === newMonth.getMonth();

                            const dataMonth = off ? null : newMonth.getTime();

                            const mods = {
                                type: off ? 'off' : null,
                                state: isSameMonth ? 'current' : null
                            };

                            return (
                                <div
                                    className={ cn('select', { month: true, ...mods }) }
                                    key={ `month_${index + 1}` }
                                    role='gridcell'
                                    tabIndex='0'
                                    data-month={ dataMonth }
                                    onClick={ this.handleSelectMonthClick }
                                >
                                    { month }
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        );
    }

    handleSelectMonthClick = (event) => {
        const newMonth = event.target.attributes['data-month'];

        if (newMonth) {
            const monthTimestamp = parseInt(newMonth.nodeValue, 10);

            if (this.props.onMonthChange) {
                this.props.onMonthChange(monthTimestamp);
            } else {
                this.setState({
                    month: monthTimestamp
                });
            }

            this.setState({
                isMonthSelection: false
            });

            this.root.focus();
        }
    };

    renderYears(cn) {
        return (
            <div className={ cn('wrapper') }>
                <div className={ cn('years') }>
                    {
                        this.years.map((year, index) => {
                            const newYear = setYear(this.state.month, year);
                            const dataYear = newYear.getTime();
                            const selectedDate = new Date(this.state.month);
                            const isSameYear = selectedDate && selectedDate.getFullYear() === newYear.getFullYear();

                            const mods = {
                                state: isSameYear ? 'current' : null
                            };

                            return (
                                <div
                                    className={ cn('select', { year: true, ...mods }) }
                                    key={ `year_${index + 1}` }
                                    role='gridcell'
                                    tabIndex='0'
                                    data-year={ dataYear }
                                    onClick={ this.handleSelectYearClick }
                                >
                                    { year }
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        );
    }

    handleSelectYearClick = (event) => {
        const newYear = event.target.attributes['data-year'];

        if (newYear) {
            const yearTimestamp = parseInt(newYear.nodeValue, 10);

            if (this.props.onMonthChange) {
                this.props.onMonthChange(yearTimestamp);
            } else {
                this.setState({
                    month: yearTimestamp
                });
            }

            this.setState({
                isYearSelection: false
            });

            this.root.focus();
        }
    };

    renderDays(cn) {
        const rows = [
            this.renderShortWeekdays(cn),
            ...this.renderMonth(cn)
        ];

        return (
            <table className={ cn('layout') }>
                <tbody>
                    {
                        rows.map((row, index) => (
                            <tr
                                className={ cn('row') }
                                key={ `row_${index + 1}` }
                            >
                                { row }
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        );
    }

    renderShortWeekdays(cn) {
        return this.props.weekdays.map((weekdayName, index) => (
            <th
                className={ cn('dayname', { type: index > 4 ? 'weekend' : false }) }
                key={ weekdayName }
            >
                { weekdayName }
            </th>
        ));
    }

    renderMonth(cn) {
        return this.calculateWeeks().map((week) => this.renderWeek(cn, week));
    }

    renderWeek(cn, week) {
        return week.map((day, index) => {
            const off = !this.isValidDate(day) || this.isOffDay(day);
            const event = this.isEventDay(day);
            const current = isCurrentDay(day);
            const val = this.value;
            const weekend = index > 4;
            const mods = {};

            if (day) {
                const isSameDate = val && val.getTime() === day.getTime();
                const isBetweenPeriod = this.selectedFrom && this.selectedTo &&
                    this.selectedFrom <= day && this.selectedTo >= day;

                if (off || weekend) {
                    if (weekend) {
                        mods.type = off ? 'weekend-off' : 'weekend';
                    } else {
                        mods.type = 'off';
                    }
                }

                mods.event = event;

                if (current && this.props.showToday) {
                    mods.state = 'today';
                }

                if (isSameDate || isBetweenPeriod) {
                    mods.state = 'current';
                }
            } else {
                mods.empty = true;
            }

            const dataDay = day && !off
                ? day.getTime()
                : null;

            return (
                <td
                    key={ day || `day_${index + 1}` }
                >
                    <div
                        className={ cn('day', mods) }
                        role='gridcell'
                        tabIndex='0'
                        data-day={ dataDay }
                        onClick={ this.handleDayClick }
                    >
                        { day ? day.getDate() : '' }
                        { mods.event && <span data-day={ dataDay } className={ cn('event') } /> }
                    </div>
                </td>
            );
        });
    }

    handleDayClick = (event) => {
        const day = event.target.attributes['data-day'];

        if (day) {
            this.performChange(parseInt(day.nodeValue, 10));
        }
    };

    handleFocus = (event) => {
        if (this.blurTimeoutId) {
            clearTimeout(this.blurTimeoutId);
            this.blurTimeoutId = null;
        }

        if (this.props.onFocus) {
            this.props.onFocus(event);
        }
    };

    handleBlur = (event) => {
        event.persist();
        if (this.blurTimeoutId) {
            clearTimeout(this.blurTimeoutId);
        }

        this.blurTimeoutId = setTimeout(() => {
            if (isNodeOutsideElement(document.activeElement, this.root) && this.props.onBlur) {
                this.props.onBlur(event);
            }
            this.blurTimeoutId = null;
        }, 0);
    };

    handleArrowClick = (event) => {
        if (event.currentTarget.attributes['data-disabled'].nodeValue === 'true') {
            return;
        }

        const stepSize = event.currentTarget.attributes['data-step'].nodeValue;
        const step = parseInt(stepSize, 10);
        const newMonth = new Date(this.state.month);

        newMonth.setMonth(newMonth.getMonth() + step);

        if (this.props.onMonthChange) {
            this.props.onMonthChange(newMonth.valueOf());
        } else {
            this.setState({
                month: newMonth.valueOf()
            });
        }
    };

    handleKeyDown = (event) => {
        switch (event.which) {
            case keyboardCode.DOWN_ARROW: {
                event.preventDefault();
                this.performChangeWithShift(7, true);
                break;
            }
            case keyboardCode.UP_ARROW:
                event.preventDefault();
                this.performChangeWithShift(-7, true);
                break;
            case keyboardCode.LEFT_ARROW: {
                event.preventDefault();
                this.performChangeWithShift(-1, true);
                break;
            }
            case keyboardCode.RIGHT_ARROW: {
                event.preventDefault();
                this.performChangeWithShift(1, true);
                break;
            }
        }

        if (this.props.onKeyDown) {
            this.props.onKeyDown(event);
        }
    };

    handleKeyUp = (event) => {
        if (this.props.onKeyUp) {
            this.props.onKeyUp(event);
        }
    };

    /**
     * Устанавливает фокус на календарь.
     *
     * @public
     */
    focus() {
        this.root.focus();
    }

    /**
     * Убирает фокус с календаря.
     *
     * @public
     */
    // eslint-disable-next-line class-methods-use-this
    blur() {
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
    getNode() {
        return this.root;
    }

    /**
     * Возвращает `true`, если переданная дата является валидной и
     * попадает в заданные лимиты календаря.
     *
     * @param {Date|Number} value Дата для проверки
     * @returns {Boolean}
     */
    isValidDate(value) {
        if (!value) {
            return false;
        }

        /* eslint-disable no-restricted-globals */
        if (!(value instanceof Date) || !isFinite(value.valueOf())) {
            return false;
        }
        /* eslint-enable no-restricted-globals */

        return !(
            (this.earlierLimit && this.earlierLimit > value) ||
            (this.laterLimit && this.laterLimit < value)
        );
    }

    /**
     * Возвращает `true`, если переданная дата является выходным днем.
     *
     * @param {Data|Number} date Дата для проверки
     * @returns {Boolean}
     */
    isOffDay(date) {
        if (this.props.offDays && Array.isArray(this.props.offDays)) {
            const timestamp = date.valueOf();

            // Поскольку offDays - отсортирован, используем бинарный поиск, O(log n) против O(n) для обычного поиска
            return sortedIndexOf(this.props.offDays, timestamp) !== -1;
        }

        return false;
    }

    /**
     * Возвращает `true`, если переданная дата является днм с событиями.
     *
     * @param {Data|Number} date Дата для проверки
     * @returns {Boolean}
     */
    isEventDay(date) {
        if (this.props.eventDays && Array.isArray(this.props.eventDays) && date !== null) {
            const timestamp = date.valueOf();

            // Поскольку events - отсортирован, используем бинарный поиск, O(log n) против O(n) для обычного поиска
            return sortedIndexOf(this.props.eventDays, timestamp) !== -1;
        }

        return false;
    }

    /**
     * Генерирует событие, что значие даты изменилось.
     *
     * @param {Number} timestamp Дата
     * @param {Boolean} [isTriggeredByKeyboard=false] Флаг, что событие
     * произошло из-за нажатия пользователем кнопки на клавиатуре
     */
    performChange(timestamp, isTriggeredByKeyboard = false) {
        if (!this.props.onValueChange) {
            return;
        }

        const date = new Date(timestamp);

        if (!this.isValidDate(date) || this.isOffDay(date)) {
            return;
        }

        this.props.onValueChange(
            timestamp,
            formatDate(date, this.props.outputFormat),
            isTriggeredByKeyboard
        );
    }

    /**
     * Генерирует событие, что значение даты изменилось на переданной число дней.
     *
     * @param {Number} dayShift Смещение текущей даты в днях.
     * @param {Boolean} [isTriggeredByKeyboard=false] Флаг, что событие
     * произошло из-за нажатия пользователем кнопки на клавиатуре
     */
    performChangeWithShift(dayShift, isTriggeredByKeyboard) {
        if (!this.ensureValueInLimits(dayShift)) {
            return;
        }

        while (this.isOffDay(addDays(this.value, dayShift))) {
            dayShift += Math.abs(dayShift) / dayShift;
        }

        if (this.value) {
            const shiftedValue = addDays(this.value, dayShift);

            this.performChange(shiftedValue.valueOf(), isTriggeredByKeyboard);

            if (this.props.onMonthChange && !isSameMonth(shiftedValue, this.value)) {
                this.props.onMonthChange(shiftedValue.valueOf());
            }
        } else {
            this.performChange(this.state.month, true);
        }
    }

    ensureValueInLimits(dayShift) {
        const shiftedDay = addDays(this.value, dayShift);

        return (!this.earlierLimit || differenceInMilliseconds(shiftedDay, this.earlierLimit) >= 0) &&
            (!this.laterLimit || differenceInMilliseconds(shiftedDay, this.laterLimit) <= 0);
    }

    calculateWeeks() {
        let weekDay;
        const weeks = [];
        const lastDay = 6;
        const month = new Date(this.state.month);
        const dateIterator = new Date(this.state.month);

        // Далее я использую map для обхода массива, но при создании через new Array(DAYS_IN_WEEK);
        // map не вызывает колбек, для ключей, к которым не были приассигнены значения
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
        // соответственно пропадают undefined значения, поэтому:
        let week = (new Array(DAYS_IN_WEEK)).fill(null);

        for (
            dateIterator.setDate(1);
            dateIterator.getMonth() === month.getMonth();
            dateIterator.setDate(dateIterator.getDate() + 1)
        ) {
            weekDay = getRussianWeekDay(dateIterator); // Получаем 0 - пн, 1 - вт, и т.д.

            week[weekDay] = new Date(dateIterator.getTime());

            if (weekDay === lastDay) {
                weeks.push(week);
                week = (new Array(DAYS_IN_WEEK)).fill(null);
            }
        }

        if (weekDay !== lastDay) {
            weeks.push(week);
        }

        return weeks;
    }

    prepareData(nextProps) {
        let isInitializing = false;

        if (!nextProps) {
            nextProps = this.props;
            isInitializing = true;
        }

        if (isInitializing || this.props.value !== nextProps.value) {
            if (nextProps.value) {
                this.value = startOfDay(normalizeDate(nextProps.value));
            } else {
                this.value = null;
            }
        }

        let month;

        if (nextProps.month) {
            month = normalizeDate(nextProps.month);
        } else if (this.value) {
            month = new Date(this.value.valueOf());
        } else {
            month = new Date();
        }

        this.setState({
            month: startOfMonth(month)
        });

        if (isInitializing || this.props.earlierLimit !== nextProps.earlierLimit) {
            if (nextProps.earlierLimit) {
                this.earlierLimit = normalizeDate(nextProps.earlierLimit);
            } else {
                this.earlierLimit = subtractYears(new Date(), EARLY_YEARS_LIMIT);
            }

            this.earlierLimit = startOfDay(this.earlierLimit);
            if (this.value) {
                const maxTimestamp = Math.max(
                    this.value.valueOf(),
                    this.earlierLimit.valueOf()
                );

                this.value = new Date(maxTimestamp);
            }
        }

        if (isInitializing || this.props.laterLimit !== nextProps.laterLimit) {
            if (nextProps.laterLimit) {
                this.laterLimit = normalizeDate(nextProps.laterLimit);
            } else {
                this.laterLimit = addYears(new Date(), LATER_YEARS_LIMIT);
            }

            this.laterLimit = startOfDay(this.laterLimit);
            if (this.value) {
                const minTimestamp = Math.min(
                    this.value.valueOf(),
                    this.laterLimit.valueOf()
                );

                this.value = new Date(minTimestamp);
            }
        }

        this.years = getYearsRange(this.earlierLimit, this.laterLimit);

        if (isInitializing || this.props.selectedTo !== nextProps.selectedTo) {
            this.selectedTo = nextProps.selectedTo ? normalizeDate(nextProps.selectedTo) : null;
        }

        if (isInitializing || this.props.selectedFrom !== nextProps.selectedFrom) {
            this.selectedFrom = nextProps.selectedFrom ? normalizeDate(nextProps.selectedFrom) : null;
        }
    }
}

export default Calendar;
