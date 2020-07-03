/* eslint-disable jsx-a11y/control-has-associated-label */
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/* eslint-disable jsx-a11y/click-events-have-key-events */

import React from 'react';

import { createCn } from 'bem-react-classname';

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

import keyboardCode from '../lib/keyboard-code';
import performance from '../performance';
import { isCurrentDay, getYearsRange } from './utils';
import { normalizeDate, getRussianWeekDay } from '../lib/date-utils';
import { isNodeOutsideElement } from '../lib/window';
import { withTheme } from '../cn';

const DAYS_IN_WEEK = 7;
const EARLY_YEARS_LIMIT = 100;
const LATER_YEARS_LIMIT = 1;
const TOTAL_WEEK_NUMBER = 6;
const SUNDAY_INDEX = 6;

export type CalendarProps = {

    /**
     * Выбранная дата, в формате unix timestamp
     */
    value?: number;

    /**
     * Левая граница диапазона дат, в формате unix timestamp
     */
    selectedFrom?: number;

    /**
     * Правая граница диапазона дат, в формате unix timestamp
     */
    selectedTo?: number;

    /**
     * Левая граница дат, возможных для выбора, в формате unix timestamp
     */
    earlierLimit?: number;

    /**
     * Правая граница дат, возможных для выбора, в формате unix timestamp
     */
    laterLimit?: number;

    /**
     * Месяц, в формате unix timestamp
     */
    month?: number;

    /**
     * Обработчик смены даты
     */
    onValueChange?: (timestamp?: number, dateString?: string, isTriggeredByKeyboard?: boolean) => void;

    /**
     * Обработчик смены месяца
     */
    onMonthChange?: (month?: number) => void;

    /**
     * Тип форматирования даты при выводе
     */
    outputFormat?: string;

    /**
     * Список названий месяцев
     */
    months?: readonly string[];

    /**
     * Список названий дней недели
     */
    weekdays?: readonly string[];

    /**
     * Список выходных дней в виде unix timestamp, отсортированный по возрастанию
     */
    offDays?: readonly number[];

    /**
     * Список дней с событиями в виде unix timestamp, отсортированный по возрастанию
     */
    eventDays?: readonly number[];

    /**
     * Отображение текущей даты
     */
    showToday?: boolean;

    /**
     * Отображение стрелок навигации по месяцам
     */
    showArrows?: boolean;

    /**
     * Возможность управления календарём с клавиатуры
     */
    isKeyboard?: boolean;

    /**
     * Управление шириной календаря. При значении 'available' растягивает кнопку на ширину родителя
     */
    width?: 'default' | 'available';

    /**
     * Тема компонента
     */
    theme?: 'alfa-on-color' | 'alfa-on-white';

    /**
     * Дополнительный класс
     */
    className?: string;

    /**
     * Идентификатор компонента в DOM
     */
    id?: string;

    /**
     * Обработчик события нажатия на клавишу клавиатуры в момент, когда фокус находится на компоненте
     */
    onKeyDown?: (event?: React.KeyboardEvent<any>) => void;

    /**
     * Обработчик события отжатия на клавишу клавиатуры в момент, когда фокус находится на компоненте
     */
    onKeyUp?: (event?: React.KeyboardEvent<any>) => void;

    /**
     * Обработчик фокуса
     */
    onFocus?: (event?: React.FocusEvent<any>) => void;

    /**
     * Обработчик снятия фокуса
     */
    onBlur?: (event?: React.FocusEvent<any>) => void;

    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    'data-test-id'?: string;

};

type CalendarState = {
    isMonthSelection?: boolean;
    isYearSelection?: boolean;
    month: Date | number;
}
/**
 * Компонент календаря.
 */
@performance(true)
export class Calendar extends React.Component<CalendarProps, CalendarState> {
    protected cn = createCn('calendar');

    static defaultProps: Partial<CalendarProps> = {
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
        isKeyboard: true,
    };

    state: CalendarState = {
        month: startOfMonth(new Date()),
    };

    private root: HTMLDivElement;

    private blurTimeoutId: number = null;

    private years = [];

    private earlierLimit: Date;

    private laterLimit: Date;

    private value: Date;

    private selectedTo: Date;

    private selectedFrom: Date;

    // eslint-disable-next-line camelcase
    UNSAFE_componentWillMount() {
        this.prepareData();
    }

    // eslint-disable-next-line camelcase
    UNSAFE_componentWillReceiveProps(nextProps) {
        this.prepareData(nextProps);
    }

    componentWillUnmount() {
        if (this.blurTimeoutId) {
            clearTimeout(this.blurTimeoutId);
            this.blurTimeoutId = null;
        }
    }

    render() {
        return (
            <div
                ref={ (root) => {
                    this.root = root;
                } }
                className={ this.cn({ width: this.props.width }) }
                id={ this.props.id }
                role="grid"
                tabIndex={ 0 }
                onBlur={ this.handleBlur }
                onFocus={ this.handleFocus }
                onKeyDown={ this.props.isKeyboard && this.handleKeyDown }
                onKeyUp={ this.props.isKeyboard && this.handleKeyUp }
                data-test-id={ this.props['data-test-id'] }
            >
                { this.renderTitle() }
                { this.renderContent() }
            </div>
        );
    }

    renderTitle() {
        const month = new Date(this.state.month);
        const isPrevMonthEnabled = !this.earlierLimit
            || differenceInMonths(month, startOfMonth(this.earlierLimit)) > 0;
        const isNextMonthEnabled = !this.laterLimit
            || differenceInMonths(month, this.laterLimit) < 0;
        const areArrowsVisible = this.props.showArrows
            && !this.state.isMonthSelection
            && !this.state.isYearSelection;

        return (
            <div className={ this.cn('title') }>
                {
                    areArrowsVisible && (
                        <div
                            className={
                                this.cn('arrow', {
                                    direction: 'left',
                                    disabled: !isPrevMonthEnabled,
                                })
                            }
                            data-step="-1"
                            data-disabled={ !isPrevMonthEnabled }
                            role="button"
                            tabIndex={ 0 }
                            onClick={ this.handleArrowClick }
                        />
                    )
                }
                {
                    areArrowsVisible && (
                        <div
                            className={
                                this.cn('arrow', {
                                    direction: 'right',
                                    disabled: !isNextMonthEnabled,
                                })
                            }
                            data-step="1"
                            data-disabled={ !isNextMonthEnabled }
                            role="button"
                            tabIndex={ 0 }
                            onClick={ this.handleArrowClick }
                        />
                    )
                }
                <div className={ this.cn('select-buttons') }>

                    <div
                        className={
                            this.cn('name', {
                                month: true,
                            })
                        }
                        role="button"
                        tabIndex={ 0 }
                        onClick={ this.handleMonthClick }
                    >
                        <div className={ this.cn('select-text') }>
                            { this.props.months[month.getMonth()] }
                        </div>
                        <div className={ this.cn('select-arrows') } />
                    </div>

                    <div
                        className={
                            this.cn('name', {
                                year: true,
                            })
                        }
                        role="button"
                        tabIndex={ 0 }
                        onClick={ this.handleYearClick }
                    >
                        <div className={ this.cn('select-text') }>{ `${month.getFullYear()}` }</div>
                        <div className={ this.cn('select-arrows') } />
                    </div>
                </div>
            </div>
        );
    }

    private handleMonthClick = () => {
        this.setState({
            // eslint-disable-next-line react/no-access-state-in-setstate
            isMonthSelection: !this.state.isMonthSelection,
            isYearSelection: false,
        });
    };

    private handleYearClick = () => {
        this.setState({
            isMonthSelection: false,
            // eslint-disable-next-line react/no-access-state-in-setstate
            isYearSelection: !this.state.isYearSelection,
        });
    };

    renderContent() {
        return (
            <React.Fragment>
                { this.state.isMonthSelection ? this.renderMonths() : null }
                { this.state.isYearSelection ? this.renderYears() : null }
                { this.renderDays() }
            </React.Fragment>
        );
    }

    renderMonths() {
        return (
            <div className={ this.cn('wrapper') }>
                <div className={ this.cn('months') }>
                    {
                        this.props.months.map((month, index) => {
                            const newMonth = setMonth(this.state.month, index);
                            const off = !this.isValidDate(startOfMonth(newMonth));
                            const selectedDate = new Date(this.state.month);
                            const isSameMonth = selectedDate
                                && selectedDate.getMonth() === newMonth.getMonth();

                            const dataMonth = off ? null : newMonth.getTime();

                            const mods = {
                                type: off ? 'off' : null,
                                state: isSameMonth ? 'current' : null,
                            };

                            return (
                                <div
                                    className={ this.cn('select', { month: true, ...mods }) }
                                    key={ `month_${index + 1}` }
                                    role="gridcell"
                                    tabIndex={ 0 }
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

    private handleSelectMonthClick = (event) => {
        const newMonth = event.target.attributes['data-month'];

        if (newMonth) {
            const monthTimestamp = parseInt(newMonth.nodeValue, 10);

            if (this.props.onMonthChange) {
                this.props.onMonthChange(monthTimestamp);
            } else {
                this.setState({
                    month: monthTimestamp,
                });
            }

            this.setState({
                isMonthSelection: false,
            });

            this.root.focus();
        }
    };

    renderYears() {
        return (
            <div className={ this.cn('wrapper') }>
                <div className={ this.cn('years') }>
                    {
                        this.years.map((year, index) => {
                            const newYear = setYear(this.state.month, year);
                            const dataYear = newYear.getTime();
                            const selectedDate = new Date(this.state.month);
                            const isSameYear = selectedDate
                                && selectedDate.getFullYear() === newYear.getFullYear();

                            const mods = {
                                state: isSameYear ? 'current' : null,
                            };

                            return (
                                <div
                                    className={ this.cn('select', { year: true, ...mods }) }
                                    key={ `year_${index + 1}` }
                                    role="gridcell"
                                    tabIndex={ 0 }
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

    private handleSelectYearClick = (event) => {
        const newYear = event.target.attributes['data-year'];

        if (newYear) {
            const yearTimestamp = parseInt(newYear.nodeValue, 10);

            if (this.props.onMonthChange) {
                this.props.onMonthChange(yearTimestamp);
            } else {
                this.setState({
                    month: yearTimestamp,
                });
            }

            this.setState({
                isYearSelection: false,
            });

            this.root.focus();
        }
    };

    renderDays() {
        const rows = [
            this.renderShortWeekdays(),
            ...this.renderMonth(),
        ];

        return (
            <table className={ this.cn('layout') }>
                <tbody>
                    {
                        rows.map((row, index) => (
                            <tr
                                className={ this.cn('row') }
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

    renderShortWeekdays() {
        return this.props.weekdays.map((weekdayName, index) => (
            <th
                className={ this.cn('dayname', { type: index > 4 ? 'weekend' : false }) }
                key={ weekdayName }
            >
                { weekdayName }
            </th>
        ));
    }

    renderMonth() {
        return this.calculateWeeks().map((week) => this.renderWeek(week));
    }

    renderWeek(week) {
        return week.map((day, index) => {
            const off = !this.isValidDate(day) || this.isOffDay(day);
            const event = this.isEventDay(day);
            const current = isCurrentDay(day);
            const val = this.value;
            const weekend = index > 4;
            const mods: {
                type?: 'weekend-off' | 'weekend' | 'off';
                event?: boolean;
                state?: 'today' | 'current';
                empty?: boolean;
            } = {};

            if (day) {
                const isSameDate = val && val.getTime() === day.getTime();
                const isBetweenPeriod = this.selectedFrom && this.selectedTo
                    && this.selectedFrom <= day && this.selectedTo >= day;

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
                        className={ this.cn('day', mods) }
                        role="gridcell"
                        tabIndex={ 0 }
                        data-day={ dataDay }
                        onClick={ this.handleDayClick }
                    >
                        { day ? day.getDate() : '' }
                        { mods.event && (
                            <span data-day={ dataDay } className={ this.cn('event') } />
                        ) }
                    </div>
                </td>
            );
        });
    }

    private handleDayClick = (event) => {
        const day = event.target.attributes['data-day'];

        if (day) {
            this.performChange(parseInt(day.nodeValue, 10));
        }
    };

    private handleFocus = (event) => {
        if (this.blurTimeoutId) {
            clearTimeout(this.blurTimeoutId);
            this.blurTimeoutId = null;
        }

        if (this.props.onFocus) {
            this.props.onFocus(event);
        }
    };

    private handleBlur = (event) => {
        event.persist();
        if (this.blurTimeoutId) {
            clearTimeout(this.blurTimeoutId);
        }

        this.blurTimeoutId = window.setTimeout(() => {
            if (isNodeOutsideElement(document.activeElement, this.root) && this.props.onBlur) {
                this.props.onBlur(event);
            }
            this.blurTimeoutId = null;
        }, 0);
    };

    private handleArrowClick = (event) => {
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
                month: newMonth.valueOf(),
            });
        }
    };

    private handleKeyDown = (event) => {
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

    private handleKeyUp = (event) => {
        if (this.props.onKeyUp) {
            this.props.onKeyUp(event);
        }
    };

    /**
     * Устанавливает фокус на календарь.
     */
    public focus() {
        this.root.focus();
    }

    /**
     * Убирает фокус с календаря.
     */
    // eslint-disable-next-line class-methods-use-this
    public blur() {
        if (document.activeElement) {
            (document.activeElement as HTMLElement).blur();
        }
    }

    /**
     * Возвращает корневой `HTMLElement` компонента.
     */
    public getNode() {
        return this.root;
    }

    /**
     * Возвращает `true`, если переданная дата является валидной и
     * попадает в заданные лимиты календаря.
     *
     * @param value Дата для проверки
     */
    private isValidDate(value: Date | number) {
        if (!value) {
            return false;
        }

        /* eslint-disable no-restricted-globals */
        if (!(value instanceof Date) || !isFinite(value.valueOf())) {
            return false;
        }
        /* eslint-enable no-restricted-globals */

        return !(
            (this.earlierLimit && this.earlierLimit > value)
            || (this.laterLimit && this.laterLimit < value)
        );
    }

    /**
     * Возвращает `true`, если переданная дата является выходным днем.
     *
     * @param date Дата для проверки
     */
    private isOffDay(date: Date | number) {
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
     * @param date Дата для проверки
     */
    private isEventDay(date: Date | number) {
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
     * @param timestamp Дата
     * @param isTriggeredByKeyboard Флаг, что событие
     * произошло из-за нажатия пользователем кнопки на клавиатуре
     */
    private performChange(timestamp: number | Date, isTriggeredByKeyboard = false) {
        if (!this.props.onValueChange) {
            return;
        }

        const date = new Date(timestamp);

        if (!this.isValidDate(date) || this.isOffDay(date)) {
            return;
        }

        this.props.onValueChange(
            timestamp.valueOf(),
            formatDate(date, this.props.outputFormat),
            isTriggeredByKeyboard,
        );
    }

    /**
     * Генерирует событие, что значение даты изменилось на переданной число дней.
     *
     * @param dayShift Смещение текущей даты в днях.
     * @param isTriggeredByKeyboard Флаг, что событие
     * произошло из-за нажатия пользователем кнопки на клавиатуре
     */
    private performChangeWithShift(dayShift: number, isTriggeredByKeyboard: boolean) {
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

    private ensureValueInLimits(dayShift) {
        const shiftedDay = addDays(this.value, dayShift);

        return (!this.earlierLimit || differenceInMilliseconds(shiftedDay, this.earlierLimit) >= 0)
            && (!this.laterLimit || differenceInMilliseconds(shiftedDay, this.laterLimit) <= 0);
    }

    private calculateWeeks() {
        let weekDay: number;
        let weekCounter = TOTAL_WEEK_NUMBER;
        const weeks = [];
        const lastDay = SUNDAY_INDEX;
        const currentMonth = new Date(this.state.month).getMonth();
        const dateIterator = new Date(this.state.month);

        // Далее я использую map для обхода массива, но при создании через new Array(DAYS_IN_WEEK);
        // map не вызывает колбек, для ключей, к которым не были приассигнены значения
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
        // соответственно пропадают undefined значения, поэтому:
        let week = (new Array(DAYS_IN_WEEK)).fill(null);

        dateIterator.setDate(1);

        while (weekCounter > 0) {
            weekDay = getRussianWeekDay(dateIterator); // Получаем 0 - пн, 1 - вт, и т.д.

            if (dateIterator.getMonth() === currentMonth) {
                week[weekDay] = new Date(dateIterator.getTime());
            }

            if (weekDay === lastDay) {
                weeks.push(week);
                weekCounter -= 1;
                week = (new Array(DAYS_IN_WEEK)).fill(null);
            }

            dateIterator.setDate(dateIterator.getDate() + 1);
        }

        if (weekDay !== lastDay) {
            weeks.push(week);
        }

        return weeks;
    }

    private prepareData(nextProps?) {
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
            month: startOfMonth(month),
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
                    this.earlierLimit.valueOf(),
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
                    this.laterLimit.valueOf(),
                );

                this.value = new Date(minTimestamp);
            }
        }

        this.years = getYearsRange(this.earlierLimit, this.laterLimit);

        if (isInitializing || this.props.selectedTo !== nextProps.selectedTo) {
            this.selectedTo = nextProps.selectedTo ? normalizeDate(nextProps.selectedTo) : null;
        }

        if (isInitializing || this.props.selectedFrom !== nextProps.selectedFrom) {
            this.selectedFrom = nextProps.selectedFrom
                ? normalizeDate(nextProps.selectedFrom) : null;
        }
    }
}

export default withTheme<CalendarProps, Calendar>(Calendar);
