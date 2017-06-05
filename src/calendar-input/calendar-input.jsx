/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { autobind } from 'core-decorators';
import React from 'react';
import Type from 'prop-types';

import startOfDay from 'date-fns/start_of_day';
import formatDate from 'date-fns/format';
import isDateValid from 'date-fns/is_valid';

import Calendar from '../calendar/calendar';
import Icon from '../icon/icon';
import Input from '../input/input';
import Mq from '../mq/mq';
import Popup from '../popup/popup';

import cn from '../cn';
import keyboardCode from '../lib/keyboard-code';
import Modernizr from '../modernizr';
import { isNodeOutsideElement } from '../lib/window';
import { parse } from '../lib/date-utils';
import performance from '../performance';

/**
 * NB: В нативном календаре нельзя менять формат даты. Приемлем только YYYY-MM-DD формат.
 * https://www.w3.org/TR/html-markup/input.date.html#input.date.attrs.value
 * https://tools.ietf.org/html/rfc3339#section-5.6
*/
const CUSTOM_DATE_FORMAT = 'DD.MM.YYYY';
const NATIVE_DATE_FORMAT = 'YYYY-MM-DD';
const IS_BROWSER = typeof window !== 'undefined';
const SUPPORTS_INPUT_TYPE_DATE = IS_BROWSER && Modernizr.inputtypes.date;

function parseDate(value, format) {
    const valueTrimmed = value ? value.replace(/~+$/, '') : '';
    let result = null;

    // Проверяем, чтобы пользователь ввёл полную строку даты без пробелов.
    if (valueTrimmed.length === format.length && !valueTrimmed.match(/\s/)) {
        let valueDate = parse(valueTrimmed, format);
        if (isDateValid(valueDate)) {
            result = valueDate.valueOf();
        }
    }

    return result;
}

function formatDateIntoCustom(value) {
    let date = parseDate(value, NATIVE_DATE_FORMAT);

    if (date) {
        return formatDate(date, CUSTOM_DATE_FORMAT);
    }
    return value;
}

function formatDateIntoNative(value) {
    let date = parseDate(value, CUSTOM_DATE_FORMAT);

    if (date) {
        return formatDate(date, NATIVE_DATE_FORMAT);
    }
    return value;
}

function calculateMonth(value) {
    let newValue = (value && parseDate(value, CUSTOM_DATE_FORMAT)) || Date.now();

    return startOfDay(newValue).valueOf();
}

/**
 * Компонент поля ввода даты.
 */
@cn('calendar-input', Input, Popup)
@performance(true)
class CalendarInput extends React.Component {
    static propTypes = {
        /** Содержимое поля ввода, указанное по умолчанию */
        value: Type.string,
        /** Отображение попапа с ошибкой в момент когда фокус находится в поле ввода */
        error: Type.node,
        /** Свойства компонента [Calendar](../calendar/) */
        calendar: Type.shape({
            value: Type.number,
            selectedFrom: Type.number,
            selectedTo: Type.number,
            earlierLimit: Type.number,
            laterLimit: Type.number,
            month: Type.number,
            onValueChange: Type.func,
            onMonthChange: Type.func,
            outputFormat: Type.string,
            months: Type.arrayOf(Type.string),
            weekdays: Type.arrayOf(Type.string),
            offDays: Type.arrayOf(Type.number),
            showArrows: Type.bool,
            isKeyboard: Type.bool,
            error: Type.node,
            theme: Type.oneOf(['alfa-on-color', 'alfa-on-white']),
            className: Type.oneOfType([Type.func, Type.string]),
            onKeyDown: Type.func,
            onKeyUp: Type.func,
            onFocus: Type.func,
            onBlur: Type.func
        }),
        /** Управление возможностью раскрытия календаря */
        opened: Type.bool,
        /** Управление возможностью компонента занимать всю ширину родителя */
        width: Type.oneOf(['default', 'available']),
        /** Направления, в которые может открываться попап компонента */
        directions: Type.arrayOf(Type.oneOf([
            'anchor', 'top-left', 'top-center', 'top-right', 'left-top', 'left-center', 'left-bottom', 'right-top',
            'right-center', 'right-bottom', 'bottom-left', 'bottom-center', 'bottom-right'
        ])),
        /** Управление возможностью изменения значения компонента */
        disabled: Type.bool,
        /** Размер компонента */
        size: Type.oneOf(['s', 'm', 'l', 'xl']),
        /** Последовательность перехода между контролами при нажатии на Tab */
        tabIndex: Type.number,
        /** Показывать иконку календаря в инпуте */
        withIcon: Type.bool,
        /** Подсказка в текстовом поле */
        placeholder: Type.string,
        /** Идентификатор компонента в DOM */
        id: Type.string,
        /** Имя компонента в DOM */
        name: Type.string,
        /** Тема компонента */
        theme: Type.oneOf(['alfa-on-color', 'alfa-on-white']),
        /** Обработчик установки фокуса на компонент */
        onFocus: Type.func,
        /** Обработчик снятия фокуса с компонента */
        onBlur: Type.func,
        /** Обработчик установки фокуса на поле ввода */
        onInputFocus: Type.func,
        /** Обработчик снятия фокуса с поля ввода */
        onInputBlur: Type.func,
        /** Обработчик ввода даты в текстовом поле */
        onInputChange: Type.func,
        /** Обработчик выбора даты в календаре */
        onCalendarChange: Type.func,
        /** Обрабочик изменения даты в календаре */
        onChange: Type.func,
        /** Обработчик события нажатия на клавишу в момент, когда фокус находится на компоненте */
        onKeyDown: Type.func,
        /** Обработчик события нажатия на клавишу клавиатуры в момент, когда фокус находится в календаре */
        onCalendarKeyDown: Type.func,
        /** Обработчик события нажатия на клавишу клавиатуры в момент, когда фокус находится на текстовом поле */
        onInputKeyDown: Type.func
    };

    static defaultProps = {
        withIcon: true,
        directions: ['bottom-left', 'bottom-right', 'top-left', 'top-right'],
        placeholder: '00.00.0000'
    };

    state = {
        isNativeInputEnabled: false,
        isInputFocused: false,
        isCalendarFocused: false,
        opened: false,
        value: '',
        month: calculateMonth(this.props.value)
    };

    /**
     * @type {Number}
     */
    timeoutId;

    /**
     * @type {Number}
     */
    changeCloseTimeoutId;

    /**
     * @type {Calendar}
     */
    calendar;

    /**
     * @type {Popup}
     */
    calendarPopup;

    /**
     * @type {Input}
     */
    customCalendarTarget;

    /**
     * @type {HTMLInputElement}
     */
    nativeCalendarTarget;

    componentDidMount() {
        if (this.calendarPopup) {
            let element;

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

    componentWillUnmount() {
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
            this.timeoutId = null;
        }
        if (this.changeCloseTimeoutId) {
            clearTimeout(this.changeCloseTimeoutId);
            this.changeCloseTimeoutId = null;
        }
    }

    render(cn, Input, Popup) {
        let value = this.props.value !== undefined
            ? this.props.value
            : this.state.value;

        let commonProps = {
            disabled: this.props.disabled,
            tabIndex: this.props.tabIndex,
            noValidate: true
        };

        return (
            <span className={ cn({ width: this.props.width }) }>
                <Input
                    ref={ (customCalendarTarget) => {
                        this.customCalendarTarget = customCalendarTarget;
                    } }
                    { ...commonProps }
                    className={ cn('custom-field') }
                    disabledAttr={ this.state.isNativeInputEnabled }
                    error={ this.props.error }
                    focused={ this.state.isInputFocused || this.state.isCalendarFocused }
                    mask='11.11.1111'
                    size={ this.props.size }
                    type='text'
                    placeholder={ this.props.placeholder }
                    value={ value }
                    width={ this.props.width }
                    id={ this.props.id }
                    name={ this.props.name }
                    onBlur={ this.handleCustomInputBlur }
                    onChange={ this.handleCustomInputChange }
                    onFocus={ this.handleCustomInputFocus }
                    onKeyDown={ this.handleInputKeyDown }
                    icon={
                        this.props.withIcon &&
                        <Icon
                            size={ this.props.size }
                            icon='calendar'
                            onClick={ this.handleIconClick }
                        />
                    }
                />
                <Mq
                    query='--small-only'
                    touch={ true }
                    onMatchChange={ this.handleMqMatchChange }
                >
                    {
                        SUPPORTS_INPUT_TYPE_DATE &&
                        <input
                            ref={ (nativeCalendarTarget) => {
                                this.nativeCalendarTarget = nativeCalendarTarget;
                            } }
                            { ...commonProps }
                            className={ cn('native-field') }
                            type='date'
                            value={ formatDateIntoNative(value) }
                            onBlur={ this.handleNativeInputBlur }
                            onChange={ this.handleNativeInputChange }
                            onFocus={ this.handleNativeInputFocus }
                        />
                    }
                </Mq>
                { this.renderPopup(value, Popup) }
            </span>
        );
    }

    renderPopup(value, Popup) {
        let opened = this.props.opened !== undefined
            ? this.props.opened
            : this.state.opened;

        return (
            <Popup
                ref={ (calendarPopup) => { this.calendarPopup = calendarPopup; } }
                for={ this.props.name }
                autoclosable={ true }
                visible={ opened }
                directions={ this.props.directions }
            >
                <Calendar
                    ref={ (calendar) => { this.calendar = calendar; } }
                    month={ this.state.month }
                    { ...this.props.calendar }
                    value={ parseDate(value, CUSTOM_DATE_FORMAT) }
                    onBlur={ this.handleCalendarBlur }
                    onFocus={ this.handleCalendarFocus }
                    onKeyDown={ this.handleCalendarKeyDown }
                    onValueChange={ this.handleCalendarChange }
                    onMonthChange={ this.handleCalendarMonthChange }
                />
            </Popup>
        );
    }

    @autobind
    handleCalendarChange(value, formatted, isTriggeredByKeyboard) {
        if (!isTriggeredByKeyboard) {
            this.changeCloseTimeoutId = setTimeout(() => {
                this.calendar.blur(); // FF не испускает событие `blur` когда элементы становятся невидимыми, делаем это явно
                this.setState({
                    opened: false
                });
                this.changeCloseTimeoutId = null;
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

    @autobind
    handleCalendarMonthChange(month) {
        this.setState({
            month
        });
    }

    @autobind
    handleCalendarFocus(event) {
        this.changeFocused({ isCalendarFocused: true }, event);
    }

    @autobind
    handleCalendarBlur(event) {
        this.changeFocused({ isCalendarFocused: false }, event);
    }

    @autobind
    handleCalendarKeyDown(event) {
        switch (event.which) {
            case keyboardCode.ESCAPE:
                event.preventDefault();
                this.customCalendarTarget.focus();
                break;
            case keyboardCode.ENTER:
            case keyboardCode.SPACE:
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

    @autobind
    handleIconClick() {
        this.customCalendarTarget.focus();
    }

    @autobind
    handleCustomInputChange(value) {
        let month = calculateMonth(value);

        this.setState({ value });

        // Изменяет месяц в календаре в соответствии с введёной в поле валидной датой
        if (value && value.length === CUSTOM_DATE_FORMAT.length && month !== this.state.month) {
            this.setState({ month });
        }

        if (this.props.onInputChange) {
            this.props.onInputChange(value);
        }

        if (this.props.onChange) {
            this.props.onChange(value, parseDate(value, CUSTOM_DATE_FORMAT));
        }
    }

    @autobind
    handleNativeInputChange(event) {
        let value = formatDateIntoCustom(event.target.value);

        // Детектим нажатие `сlear` в нативном календаре
        if (this.state.value === value) {
            value = '';
        }

        this.setState({ value });

        if (this.props.onInputChange) {
            this.props.onInputChange(value);
        }

        if (this.props.onChange) {
            this.props.onChange(value, parseDate(value, CUSTOM_DATE_FORMAT));
        }
    }

    @autobind
    handleCustomInputFocus(event) {
        this.changeFocused({ isInputFocused: true }, event);

        if (this.props.onInputFocus) {
            this.props.onInputFocus(event);
        }
    }

    @autobind
    handleNativeInputFocus(event) {
        // Копируем пришедший из аргументов SyntheticEvent для дальнейшего редактирования
        let resultEvent = { ...event,
            // Трансформируем нативную YYYY-MM-DD дату в кастомный формат на вывод в коллбэках
            target: { value: formatDateIntoCustom(event.target.value) }
        };

        this.changeFocused({ isInputFocused: true }, resultEvent);

        if (this.props.onInputFocus) {
            this.props.onInputFocus(resultEvent);
        }
    }

    @autobind
    handleCustomInputBlur(event) {
        this.changeFocused({ isInputFocused: false }, event);

        if (this.props.onInputBlur) {
            this.props.onInputBlur(event);
        }
    }

    @autobind
    handleNativeInputBlur(event) {
        // Копируем пришедший из аргументов SyntheticEvent для дальнейшего редактирования
        let resultEvent = { ...event,
            // Трансформируем нативную YYYY-MM-DD дату в кастомный формат на вывод в коллбэках
            target: { value: formatDateIntoCustom(event.target.value) }
        };

        this.changeFocused({ isInputFocused: false }, resultEvent);

        if (this.props.onInputBlur) {
            this.props.onInputBlur(resultEvent);
        }
    }

    @autobind
    handleInputKeyDown(event) {
        switch (event.which) {
            case keyboardCode.DOWN_ARROW: {
                event.preventDefault();

                let value = this.props.value !== undefined
                    ? this.props.value
                    : this.state.value;

                this.setState({
                    opened: true,
                    month: calculateMonth(value)
                });
                this.calendar.focus();

                break;
            }
            case keyboardCode.ESCAPE: {
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

    @autobind
    handleMqMatchChange(isMatched) {
        this.setState({
            isNativeInputEnabled: isMatched && SUPPORTS_INPUT_TYPE_DATE
        });
    }

    /**
     * Устанавливает фокус на поле ввода, открывает календарь.
     *
     * @public
     */
    focus() {
        let targetRef = this.nativeCalendarTarget || this.customCalendarTarget;

        targetRef.focus();
    }

    /**
     * Убирает фокус с поля ввода.
     *
     * @public
     */
    blur() {
        let targetRef = this.nativeCalendarTarget || this.customCalendarTarget;

        targetRef.blur();
    }

    /**
     * Скроллит страницу до поля ввода.
     *
     * @public
     */
    scrollTo() {
        this.customCalendarTarget.scrollTo();
    }

    changeFocused(focusedState, event) {
        let newState = {
            isInputFocused: this.state.isInputFocused,
            isCalendarFocused: this.state.isCalendarFocused,
            ...focusedState
        };

        // При переключении фокуса с поля ввода на календарь событие `blur` у поля ввода иногда происходит перед фокусом календаря
        // Поэтому проверяем элемент который получит фокус после блюра и если он внутри календаря - оставляем сфокусированное состояние.
        let relatedTarget = event.relatedTarget || // не поддерживается в FF и IE10 https://github.com/facebook/react/issues/2011
            event.explicitOriginalTarget || // не поддерживается в IE
            document.activeElement; // В IE вернет не <calendar> а конкретную ноду, на которую пришел фокус

        let calendarWillReceiveFocus = !isNodeOutsideElement(relatedTarget, this.calendar.getNode());

        let newFocused = newState.isInputFocused
            || newState.isCalendarFocused
            || calendarWillReceiveFocus;

        this.setState(focusedState);

        let newOpened = false;

        if (newFocused) {
            if (this.props.onFocus) {
                this.props.onFocus(event);
            }

            newOpened = true;
        } else if (this.props.onBlur) {
            this.props.onBlur(event);
        }

        if (!this.state.isNativeInputEnabled) {
            if (this.timeoutId) {
                clearTimeout(this.timeoutId);
            }
            this.timeoutId = setTimeout(() => {
                let value = this.props.value !== undefined
                    ? this.props.value
                    : this.state.value;

                let newMonth = this.state.opened !== newOpened
                    ? calculateMonth(value)
                    : this.state.month;

                this.setState({
                    opened: newOpened,
                    month: newMonth
                });

                this.timeoutId = null;
            }, 0);
        }
    }
}

export default CalendarInput;
